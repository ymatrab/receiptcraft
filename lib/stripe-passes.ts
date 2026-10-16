import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { PLANS, isPaidPlan, passEndsAt, type PaidPlanId, type PlanChange } from "@/lib/plans";
import { absoluteUrl } from "@/lib/site";

/**
 * Pro passes sold through Stripe Checkout.
 *
 * Every plan is a one-time payment for a fixed period — nothing auto-renews,
 * which is the owner's standing rule and a trust signal on the pricing page.
 * So this is Checkout in `payment` mode, not Billing: no Stripe subscription,
 * no renewal, no portal to cancel from.
 *
 * Prices come from lib/plans.ts as inline `price_data`, not dashboard Price
 * ids. /pricing renders from the same PLANS, so the figure a buyer reads is the
 * figure Stripe charges, and a price change is one edit rather than an edit plus
 * a dashboard change that someone forgets.
 *
 * Server-only: getStripe() holds the secret key.
 */

/**
 * Tags every session in the Dashboard (Payments → filter by integration), so
 * this flow can be told apart from anything added later. Fixed, not per-call.
 */
const INTEGRATION_IDENTIFIER = "makecepeit_pro_pass_qhtwzkmr";

/** Opens a Checkout Session for one pass and returns the URL to send the buyer to. */
export async function createPassCheckout(opts: {
  plan: PaidPlanId;
  userId: string;
  email: string | null;
  /** Sandbox checkout — admin-only test mode, see stripeTestConfigured. */
  test?: boolean;
  /** How this purchase relates to the buyer's current pass. */
  change: PlanChange;
}): Promise<string> {
  const plan = PLANS[opts.plan];
  const metadata = { user_id: opts.userId, plan: opts.plan, change: opts.change };

  const session = await getStripe(opts.test ? "test" : "live").checkout.sessions.create({
    mode: "payment",
    integration_identifier: INTEGRATION_IDENTIFIER,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(plan.price * 100),
          product_data: {
            name: `Makecepeit ${plan.name}`,
            // Shown on the Checkout page under the product name — the place a
            // buyer looks for "will this charge me again?".
            description:
              opts.change === "upgrade"
                ? `One-time payment for 1 ${plan.interval} of Pro, starting now. Days left on your current pass are added on top. Does not renew.`
                : opts.change === "extend"
                  ? `One-time payment adding 1 ${plan.interval} of Pro after your current pass ends. Does not renew.`
                  : `One-time payment for 1 ${plan.interval} of Pro. Does not renew.`,
          },
        },
      },
    ],
    // The webhook and the success page both map the payment back to the
    // account through these — never through the email, which a buyer can edit.
    client_reference_id: opts.userId,
    metadata,
    payment_intent_data: { metadata },
    customer_creation: "always",
    ...(opts.email ? { customer_email: opts.email } : {}),
    success_url: absoluteUrl("/account?checkout=success&session_id={CHECKOUT_SESSION_ID}"),
    cancel_url: absoluteUrl("/pricing"),
  });

  if (!session.url) throw new Error(`checkout session ${session.id} has no url`);
  return session.url;
}

/**
 * Grant the pass a paid Checkout Session bought. Safe to call more than once.
 *
 * Called from the webhook (the reliable path) and from /account when the buyer
 * lands back on the site (the fast path, so they never see "Free" for the
 * second before the webhook arrives). The row id is the session id, so the
 * second caller finds the first one's row and stops.
 *
 * Returns the plan granted, or null when the session grants nothing — not
 * paid yet, not a pass, or no account attached.
 */
export async function fulfillPassCheckout(
  session: Stripe.Checkout.Session
): Promise<PaidPlanId | null> {
  if (session.mode !== "payment" || session.payment_status !== "paid") return null;

  const plan = session.metadata?.plan;
  const userId = session.client_reference_id ?? session.metadata?.user_id ?? null;
  if (!isPaidPlan(plan) || !userId) {
    console.warn(`[stripe] session ${session.id} has no plan or user; nothing granted`);
    return null;
  }

  const admin = createAdminClient();

  // Every database error throws: the webhook then answers 500 and Stripe
  // retries, instead of a 200 that marks a paid order done with nothing granted.
  const { data: existing, error: readError } = await admin
    .from("subscriptions")
    .select("id")
    .eq("id", session.id)
    .maybeSingle();
  if (readError) throw readError;
  if (existing) return plan;

  // A buyer who already holds a pass gets the new one added to the end of it.
  const now = new Date();
  const { data: latest, error: latestError } = await admin
    .from("subscriptions")
    .select("current_period_end")
    .eq("user_id", userId)
    .gt("current_period_end", now.toISOString())
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (latestError) throw latestError;
  const from = latest?.current_period_end ? new Date(latest.current_period_end) : now;

  const { error: writeError } = await admin.from("subscriptions").upsert(
    {
      id: session.id,
      user_id: userId,
      stripe_customer_id: session.customer ? String(session.customer) : "manual",
      status: "active",
      price_id: null,
      plan,
      current_period_end: passEndsAt(plan, from).toISOString(),
      // Nothing will be charged again — the account page reads this.
      cancel_at_period_end: true,
    },
    { onConflict: "id" }
  );
  if (writeError) throw writeError;

  await admin.from("events").insert({
    user_id: userId,
    name: "pass_purchased",
    props: {
      plan,
      change: session.metadata?.change ?? null,
      session: session.id,
      amount: session.amount_total,
      livemode: session.livemode,
    },
  });

  return plan;
}

/**
 * End the pass a payment bought, now. Returns the user it belonged to, or null
 * when the payment was not a pass sold here.
 */
async function endPassForPayment(paymentIntentId: string): Promise<string | null> {
  const sessions = await getStripe().checkout.sessions.list({
    payment_intent: paymentIntentId,
    limit: 1,
  });
  const session = sessions.data[0];
  if (!session) return null;

  const { data, error } = await createAdminClient()
    .from("subscriptions")
    .update({ status: "canceled", current_period_end: new Date().toISOString() })
    .eq("id", session.id)
    .select("user_id")
    .maybeSingle();
  if (error) throw error;

  return data?.user_id ?? null;
}

/** A full refund ends the pass. A partial one — a goodwill credit — keeps it. */
export async function endRefundedPass(charge: Stripe.Charge): Promise<string | null> {
  if (!charge.refunded || !charge.payment_intent) return null;
  return endPassForPayment(String(charge.payment_intent));
}

/**
 * A chargeback ends the pass at once: the money is already held by the bank,
 * and Pro should not keep running on a payment the buyer is contesting.
 */
export async function endDisputedPass(dispute: Stripe.Dispute): Promise<string | null> {
  if (!dispute.payment_intent) return null;
  return endPassForPayment(String(dispute.payment_intent));
}
