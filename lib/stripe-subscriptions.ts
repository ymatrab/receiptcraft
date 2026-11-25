import type Stripe from "stripe";
import { getStripe, planFromPriceId, stripeConfigured, stripeTestConfigured } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { PLANS, isPaidPlan, type PaidPlanId } from "@/lib/plans";

/**
 * Auto-renewing Pro plans — sold to new buyers from 2026-11-24.
 *
 * Until then every plan was a one-time pass (lib/stripe-passes.ts), and the
 * people who bought one were promised it would never renew. They keep that:
 * an account that has ever held a pass still buys passes (see hasPassHistory),
 * and only accounts with no purchase history are sold a Stripe subscription.
 *
 * A subscription is stored in the same `subscriptions` table as a pass, under
 * its Stripe id (`sub_…`), so every entitlement check, the account page and
 * /admin read it without knowing which kind it is. The checkout that creates it
 * inserts the row (fulfillPassCheckout); every later change — a renewal, a
 * cancel, a failed card, a plan switch — only updates it (syncSubscriptionRow).
 *
 * Server-only: getStripe() holds the secret key.
 */

type Admin = ReturnType<typeof createAdminClient>;

/** Statuses in which Stripe will still try to charge the card. */
const CHARGEABLE: Stripe.Subscription.Status[] = ["active", "trialing", "past_due", "unpaid", "incomplete"];

/**
 * The plan a subscription is on. The checkout and every plan switch write it
 * to the subscription's metadata; the price and interval are the fallbacks.
 */
export function planOfSubscription(sub: Stripe.Subscription): PaidPlanId | null {
  const meta = sub.metadata?.plan;
  if (isPaidPlan(meta)) return meta;
  const item = sub.items.data[0];
  const fromEnv = planFromPriceId(item?.price.id);
  if (isPaidPlan(fromEnv)) return fromEnv;
  switch (item?.price.recurring?.interval) {
    case "week":
      return "pro_weekly";
    case "month":
      return "pro_monthly";
    case "year":
      return "pro_yearly";
    default:
      return null;
  }
}

/** Will this subscription stop at the end of the current period? */
export function isCancelling(sub: Stripe.Subscription): boolean {
  return sub.cancel_at_period_end || Boolean(sub.cancel_at);
}

/** The columns of a `subscriptions` row that Stripe owns. */
export function subscriptionFields(sub: Stripe.Subscription) {
  const item = sub.items.data[0];
  let endMs = item?.current_period_end ? item.current_period_end * 1000 : null;
  // Ended early — a refund, a chargeback, an immediate cancel. Access stops when
  // it ended, not when the period it had paid for would have: a cancelled row
  // still entitles until current_period_end (see canEntitle in lib/plans.ts).
  if (sub.status === "canceled" && sub.ended_at) {
    endMs = endMs ? Math.min(endMs, sub.ended_at * 1000) : sub.ended_at * 1000;
  }
  return {
    stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
    status: sub.status,
    price_id: item?.price.id ?? null,
    plan: planOfSubscription(sub),
    current_period_end: endMs ? new Date(endMs).toISOString() : null,
    cancel_at_period_end: isCancelling(sub),
  };
}

/**
 * Bring the row for this subscription up to date. Never inserts: the checkout
 * that sold it creates the row, with the account it belongs to, which a
 * subscription event on its own cannot know for a guest buyer.
 *
 * Returns the account the row belongs to, or null when there is no row.
 */
export async function syncSubscriptionRow(sub: Stripe.Subscription, admin: Admin = createAdminClient()) {
  const fields = subscriptionFields(sub);
  const { data, error } = await admin
    .from("subscriptions")
    .update({ ...fields, plan: fields.plan ?? undefined })
    .eq("id", sub.id)
    .select("user_id")
    .maybeSingle();
  if (error) throw error;
  return (data?.user_id as string | undefined) ?? null;
}

/**
 * Stop every subscription a Stripe customer still pays for, now.
 *
 * For a full refund and for a chargeback: the money has gone back, so the plan
 * must not charge the same card again next week — a second charge after a
 * dispute is how one dispute becomes two. The `customer.subscription.deleted`
 * event that follows updates the row; this updates it too, so access ends
 * even if that event is slow.
 */
export async function cancelCustomerSubscriptions(
  customerId: string | null | undefined,
  stripe: Stripe = getStripe()
): Promise<{ ids: string[]; userId: string | null }> {
  if (!customerId) return { ids: [], userId: null };
  const list = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 20 });
  const ids: string[] = [];
  let userId: string | null = null;
  for (const sub of list.data) {
    if (!CHARGEABLE.includes(sub.status)) continue;
    const ended = await stripe.subscriptions.cancel(sub.id);
    ids.push(sub.id);
    userId = (await syncSubscriptionRow(ended)) ?? userId;
  }
  return { ids, userId };
}

/**
 * Has this account ever bought a one-time pass, or been given one by hand?
 *
 * Those buyers were sold Pro as "a pass that never renews", and the owner's
 * decision (2026-11-24) is that auto-renewal is for new buyers only — so they
 * keep buying passes. Only `sub_` rows are subscriptions; everything else
 * (`cs_…` Checkout passes, `manual…` grants and Shopify orders) is a pass.
 */
export async function hasPassHistory(userId: string, admin: Admin = createAdminClient()): Promise<boolean> {
  const { data, error } = await admin
    .from("subscriptions")
    .select("id")
    .eq("user_id", userId)
    .not("id", "like", "sub_%")
    .limit(1);
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

/** The account's newest subscription row, or null when it has never had one. */
export async function memberSubscriptionRow(userId: string, admin: Admin = createAdminClient()) {
  const { data, error } = await admin
    .from("subscriptions")
    .select("id, status, plan, current_period_end, cancel_at_period_end, stripe_customer_id")
    .eq("user_id", userId)
    .like("id", "sub_%")
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/**
 * A subscription and the client that can act on it. An admin's sandbox
 * purchase lives in Stripe's test mode, so a live lookup that misses is tried
 * there before giving up.
 */
export async function retrieveSubscription(
  id: string
): Promise<{ stripe: Stripe; sub: Stripe.Subscription } | null> {
  const modes: ("live" | "test")[] = [];
  if (stripeConfigured) modes.push("live");
  if (stripeTestConfigured) modes.push("test");
  for (const mode of modes) {
    const stripe = getStripe(mode);
    try {
      return { stripe, sub: await stripe.subscriptions.retrieve(id) };
    } catch (err) {
      if ((err as { code?: string }).code !== "resource_missing") throw err;
    }
  }
  return null;
}

/** Stop or restart the renewal. Access to the end of the paid period is unaffected. */
export async function setRenewal(id: string, renew: boolean): Promise<Stripe.Subscription | null> {
  const found = await retrieveSubscription(id);
  if (!found) return null;
  const { stripe, sub } = found;
  const updated = await stripe.subscriptions.update(id, {
    cancel_at_period_end: !renew,
    // A cancel made in the Stripe portal may set a date rather than the flag;
    // resuming has to clear that too or the plan still ends.
    ...(renew && sub.cancel_at ? { cancel_at: "" as const } : {}),
  });
  await syncSubscriptionRow(updated);
  return updated;
}

/**
 * Move a subscription to another plan, from today.
 *
 * Stripe credits the unused part of the current period and charges the new
 * plan at once (`always_invoice`). Moving to a cheaper plan therefore usually
 * charges nothing today: the credit sits on the customer's balance and pays the
 * next renewals. `error_if_incomplete` means a declined card changes nothing.
 */
export async function switchPlan(id: string, target: PaidPlanId): Promise<Stripe.Subscription | null> {
  const found = await retrieveSubscription(id);
  if (!found) return null;
  const { stripe, sub } = found;
  const item = sub.items.data[0];
  if (!item) throw new Error(`subscription ${id} has no item`);
  const product = typeof item.price.product === "string" ? item.price.product : item.price.product.id;
  const plan = PLANS[target];
  const updated = await stripe.subscriptions.update(id, {
    items: [
      {
        id: item.id,
        price_data: {
          currency: "usd",
          product,
          unit_amount: Math.round(plan.price * 100),
          recurring: { interval: plan.interval! },
        },
      },
    ],
    proration_behavior: "always_invoice",
    payment_behavior: "error_if_incomplete",
    metadata: { ...sub.metadata, plan: target },
  });
  await syncSubscriptionRow(updated);
  return updated;
}

/** The subscription an invoice bills, or null for any other invoice. */
export function invoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const ref = invoice.parent?.subscription_details?.subscription ?? null;
  if (!ref) return null;
  return typeof ref === "string" ? ref : ref.id;
}
