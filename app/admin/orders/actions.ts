"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { periodEndFor } from "@/lib/shopify";
import type { PlanId } from "@/lib/plans";

/**
 * Attach a parked Shopify order to an account and grant the access it paid for.
 *
 * Used when the webhook could not match the buyer — usually because they checked
 * out with a different email than they registered with, or registered only after
 * paying. The grant is written exactly as the webhook would have written it, so
 * a later redelivery of the same order is still recognised as fulfilled.
 */
export async function fulfilPendingOrder(formData: FormData) {
  const actor = await requireAdmin();
  const orderId = String(formData.get("shopifyOrderId") || "");
  const email = String(formData.get("email") || "").trim();
  const plan = String(formData.get("plan") || "") as PlanId;
  if (!orderId || !email || !plan) return;

  const admin = createAdminClient();

  const { data: profile } = await admin
    .from("profiles")
    .select("id")
    .ilike("email", email)
    .maybeSingle();

  if (!profile?.id) {
    await admin
      .from("pending_orders")
      .update({ reason: `no account found for ${email}` })
      .eq("shopify_order_id", orderId);
    revalidatePath("/admin/orders");
    return;
  }

  const { data: current } = await admin
    .from("subscriptions")
    .select("current_period_end")
    .eq("user_id", profile.id)
    .eq("status", "active")
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();

  const periodEnd = periodEndFor(plan, current?.current_period_end);

  await admin.from("subscriptions").upsert(
    {
      id: `shopify_${orderId}`,
      user_id: profile.id,
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

  await admin
    .from("pending_orders")
    .update({ resolved_at: new Date().toISOString(), resolved_by: actor.userId })
    .eq("shopify_order_id", orderId);

  await admin.from("events").insert({
    user_id: profile.id,
    name: "pro_activated",
    props: { source: "shopify_manual", plan, order_id: orderId, until: periodEnd.toISOString() },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/admin/members");
}

/** Dismiss an order that needs no action (a test order, or already refunded). */
export async function dismissPendingOrder(formData: FormData) {
  const actor = await requireAdmin();
  const orderId = String(formData.get("shopifyOrderId") || "");
  if (!orderId) return;

  await createAdminClient()
    .from("pending_orders")
    .update({ resolved_at: new Date().toISOString(), resolved_by: actor.userId })
    .eq("shopify_order_id", orderId);

  revalidatePath("/admin/orders");
}
