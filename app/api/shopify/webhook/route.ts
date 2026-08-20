import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getShopifyVariantPlans } from "@/lib/settings";
import { sendPurchase } from "@/lib/ga4";
import {
  emailFromOrder,
  orderAttribute,
  periodEndFor,
  planFromOrder,
  shopifyConfigured,
  userIdFromOrder,
  verifyShopifyHmac,
  type ShopifyOrder,
} from "@/lib/shopify";

// The HMAC is computed over the raw bytes Shopify sent, so this must run on
// Node (not edge) and read the body as text before parsing.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Record an order we could not turn into access, so a human can finish it. */
async function parkOrder(
  order: ShopifyOrder,
  reason: string,
  plan: string | null
): Promise<void> {
  await createAdminClient().from("pending_orders").upsert(
    {
      shopify_order_id: String(order.id),
      order_number: order.order_number != null ? String(order.order_number) : null,
      email: emailFromOrder(order),
      plan,
      reason,
      payload: order as unknown as Record<string, unknown>,
    },
    { onConflict: "shopify_order_id" }
  );
  console.warn(`[shopify] order ${order.id} parked: ${reason}`);
}

/**
 * Find the account that should receive the grant.
 *
 * The cart permalink carries the signed-in user's id, which is exact. Email is
 * the fallback for buyers who checked out before registering, or who edited the
 * address at checkout — it is matched case-insensitively against profiles.
 */
async function resolveUserId(order: ShopifyOrder): Promise<string | null> {
  const fromAttribute = userIdFromOrder(order);
  if (fromAttribute) {
    // Confirm it is a real profile: the attribute is buyer-visible in the cart
    // and could be edited or stale.
    const { data } = await createAdminClient()
      .from("profiles")
      .select("id")
      .eq("id", fromAttribute)
      .maybeSingle();
    if (data?.id) return data.id;
  }

  const email = emailFromOrder(order);
  if (!email) return null;
  const { data } = await createAdminClient()
    .from("profiles")
    .select("id")
    .ilike("email", email)
    .maybeSingle();
  return data?.id ?? null;
}

/** orders/paid — grant Pro. */
async function handleOrderPaid(order: ShopifyOrder): Promise<void> {
  const admin = createAdminClient();
  const orderId = String(order.id);

  // Idempotency: a redelivered webhook must change nothing. Shopify retries on
  // any non-2xx, so this path runs more than once in normal operation.
  const { data: existing } = await admin
    .from("subscriptions")
    .select("id")
    .eq("shopify_order_id", orderId)
    .maybeSingle();
  if (existing) {
    console.info(`[shopify] order ${orderId} already fulfilled; ignoring replay`);
    return;
  }

  const plan = planFromOrder(order, await getShopifyVariantPlans());
  if (!plan) {
    await parkOrder(order, "no line item matched a plan", null);
    return;
  }

  const userId = await resolveUserId(order);
  if (!userId) {
    await parkOrder(order, "no account matches the buyer's user_id or email", plan);
    return;
  }

  // Stack onto any unexpired access rather than overwriting it, so a renewal
  // bought early adds time instead of throwing it away.
  const { data: current } = await admin
    .from("subscriptions")
    .select("current_period_end")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();

  const periodEnd = periodEndFor(plan, current?.current_period_end);

  await admin.from("subscriptions").upsert(
    {
      id: `shopify_${orderId}`,
      user_id: userId,
      source: "shopify",
      shopify_order_id: orderId,
      stripe_customer_id: null,
      status: "active",
      plan,
      current_period_end: periodEnd.toISOString(),
      cancel_at_period_end: false,
    },
    { onConflict: "id" }
  );

  // If this order had been parked by an earlier delivery (e.g. the buyer
  // registered afterwards), close it out rather than leaving stale admin work.
  await admin
    .from("pending_orders")
    .update({ resolved_at: new Date().toISOString() })
    .eq("shopify_order_id", orderId)
    .is("resolved_at", null);

  await admin.from("events").insert({
    user_id: userId,
    name: "pro_activated",
    props: { source: "shopify", plan, order_id: orderId, until: periodEnd.toISOString() },
  });

  // Report the sale to GA4 server-side. Payment completes on Shopify's domain,
  // so nothing in the browser can fire this — without it, checkout→paid
  // conversion is unknowable. Deliberately awaited *after* the grant is
  // committed and deliberately non-throwing: analytics must never be able to
  // fail a webhook that already gave someone access.
  await sendPurchase({
    clientId: orderAttribute(order, "ga_client_id") ?? "",
    transactionId: orderId,
    value: Number(order.total_price ?? 0) || 0,
    currency: order.currency ?? "USD",
    plan,
  });

  console.info(`[shopify] order ${orderId} granted ${plan} to ${userId} until ${periodEnd.toISOString()}`);
}

/**
 * refunds/create — end access.
 *
 * Refunds were previously invisible to the app: money went back and Pro stayed
 * on indefinitely. The grant is cancelled and back-dated so the expiry guard in
 * lib/plans.ts drops the entitlement immediately.
 */
async function handleRefundCreated(refund: { order_id?: number | string | null }): Promise<void> {
  const orderId = refund.order_id != null ? String(refund.order_id) : null;
  if (!orderId) return;

  const admin = createAdminClient();
  const { data: sub } = await admin
    .from("subscriptions")
    .select("id, user_id")
    .eq("shopify_order_id", orderId)
    .maybeSingle();

  if (!sub) {
    console.warn(`[shopify] refund for order ${orderId} has no subscription row`);
    return;
  }

  await admin
    .from("subscriptions")
    .update({
      status: "canceled",
      cancel_at_period_end: true,
      current_period_end: new Date().toISOString(),
    })
    .eq("id", sub.id);

  await admin.from("events").insert({
    user_id: sub.user_id,
    name: "pro_refunded",
    props: { source: "shopify", order_id: orderId },
  });

  console.info(`[shopify] order ${orderId} refunded; access ended`);
}

export async function POST(req: Request) {
  if (!shopifyConfigured || !supabaseConfigured) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const raw = await req.text();
  if (!verifyShopifyHmac(raw, req.headers.get("x-shopify-hmac-sha256"))) {
    // Deliberately terse: a 401 with no detail gives a forger nothing to work
    // with, and Shopify does not retry on 401.
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const topic = req.headers.get("x-shopify-topic") ?? "";

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  try {
    switch (topic) {
      case "orders/paid": {
        const order = payload as ShopifyOrder;
        if (order?.id == null) {
          return NextResponse.json({ error: "order missing id" }, { status: 400 });
        }
        await handleOrderPaid(order);
        break;
      }
      case "refunds/create": {
        await handleRefundCreated(payload as { order_id?: number | string | null });
        break;
      }
      default:
        // Unsubscribed topics are acknowledged so Shopify stops retrying them.
        console.info(`[shopify] ignoring topic ${topic}`);
    }
  } catch (err) {
    // 500 makes Shopify retry with backoff — the right outcome for a transient
    // database failure, since the handler above is idempotent.
    console.error(`[shopify] handler error for ${topic}`, err);
    return NextResponse.json({ error: "handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
