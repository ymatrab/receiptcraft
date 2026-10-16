import { NextResponse, after } from "next/server";
import type Stripe from "stripe";
import { getStripe, stripeConfigured, planFromPriceId } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { notify } from "@/lib/telegram";
import { recordServerEvent, errorText } from "@/lib/server-events";
import { fulfillPassCheckout, endRefundedPass, endDisputedPass } from "@/lib/stripe-passes";
import { PLANS } from "@/lib/plans";

// Stripe needs the raw body for signature verification — force the Node runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Upsert a subscription row from a Stripe Subscription object. */
async function syncSubscription(
  sub: Stripe.Subscription,
  userId: string | null
) {
  const admin = createAdminClient();
  const item = sub.items.data[0];
  const priceId = item?.price.id ?? null;

  // Resolve the user: prefer the explicit id (from checkout), else look up by the
  // existing row (subscription updates don't carry our client_reference_id).
  let resolvedUserId = userId;
  if (!resolvedUserId) {
    const { data } = await admin
      .from("subscriptions")
      .select("user_id")
      .eq("id", sub.id)
      .maybeSingle();
    resolvedUserId = data?.user_id ?? null;
  }
  if (!resolvedUserId) {
    console.warn(`[stripe] no user for subscription ${sub.id}; skipping`);
    return;
  }

  const periodEnd = item?.current_period_end ?? null;

  await admin.from("subscriptions").upsert(
    {
      id: sub.id,
      user_id: resolvedUserId,
      stripe_customer_id: String(sub.customer),
      status: sub.status,
      price_id: priceId,
      plan: planFromPriceId(priceId),
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      cancel_at_period_end: sub.cancel_at_period_end,
    },
    { onConflict: "id" }
  );

  await admin.from("events").insert({
    user_id: resolvedUserId,
    name: "subscription_synced",
    props: { status: sub.status, plan: planFromPriceId(priceId) },
  });
}

export async function POST(req: Request) {
  if (!stripeConfigured || !supabaseConfigured) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const stripe = getStripe();
  const signature = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("[stripe] signature verification failed", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // Bank debits and other delayed methods complete the session unpaid and
      // pay later, so fulfilment listens for both and grants only once paid.
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        if (session.subscription) {
          // Legacy: subscriptions bought before passes moved to one-time Checkout.
          const sub = await stripe.subscriptions.retrieve(String(session.subscription));
          await syncSubscription(sub, userId);
        } else {
          const plan = await fulfillPassCheckout(session);
          if (!plan) break;
        }
        if (session.payment_status !== "paid") break;
        // Money actually arrived. Stripe has already verified the signature
        // above, so unlike the client-side funnel events this one cannot be
        // faked — it is the most trustworthy alert the site sends.
        after(() =>
          notify("💰 Payment received", {
            Email: session.customer_details?.email ?? session.customer_email,
            Amount: session.amount_total
              ? `${(session.amount_total / 100).toFixed(2)} ${(
                  session.currency ?? ""
                ).toUpperCase()}`
              : null,
            Plan: PLANS[session.metadata?.plan as keyof typeof PLANS]?.name ?? null,
            User: userId,
          })
        );
        break;
      }
      case "charge.refunded": {
        const userId = await endRefundedPass(event.data.object as Stripe.Charge);
        if (userId) {
          await recordServerEvent("pass_refunded", userId);
          after(() => notify("↩️ Refund — Pro pass ended", { User: userId }));
        }
        break;
      }
      case "charge.dispute.created": {
        const dispute = event.data.object as Stripe.Dispute;
        const userId = await endDisputedPass(dispute);
        await recordServerEvent("pass_disputed", userId, { reason: dispute.reason });
        // Always alert, pass or not: a dispute has a response deadline and
        // costs a fee whether or not anything is done about it.
        after(() =>
          notify("🚨 Chargeback opened — respond in Stripe", {
            Amount: `${(dispute.amount / 100).toFixed(2)} ${dispute.currency.toUpperCase()}`,
            Reason: dispute.reason,
            User: userId,
          })
        );
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await syncSubscription(event.data.object as Stripe.Subscription, null);
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await syncSubscription(sub, null);
        // A cancellation is the one piece of bad news worth pushing: it is the
        // only chance to ask why while the person still remembers.
        after(() =>
          notify("⚠️ Subscription cancelled", {
            Subscription: sub.id,
            Plan: planFromPriceId(sub.items.data[0]?.price.id ?? null),
          })
        );
        break;
      }
    }
  } catch (err) {
    console.error(`[stripe] handler error for ${event.type}`, err);
    // A paid order that could not be granted is the failure that matters most:
    // Stripe will retry, but say so now rather than when the buyer writes in.
    if (event.type.startsWith("checkout.session.")) {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id ?? null;
      await recordServerEvent("pass_grant_failed", userId, {
        where: "webhook",
        session: session.id,
        error: errorText(err),
      });
      after(() =>
        notify("❌ Paid but Pro not granted — Stripe will retry", {
          Session: session.id,
          User: userId,
          Error: errorText(err),
        })
      );
    }
    return NextResponse.json({ error: "handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
