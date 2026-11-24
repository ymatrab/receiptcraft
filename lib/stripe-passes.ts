import type Stripe from "stripe";
import { getStripe, stripeConfigured, stripeTestConfigured, stripeModeForSession } from "@/lib/stripe";
import { recordServerEvent, errorText } from "@/lib/server-events";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  PLANS,
  isPaidPlan,
  passEndsAt,
  renewalPhrase,
  type PaidPlanId,
  type PlanChange,
} from "@/lib/plans";
import { absoluteUrl } from "@/lib/site";
import { subscriptionFields } from "@/lib/stripe-subscriptions";
import { notify } from "@/lib/telegram";

/**
 * Pro passes sold through Stripe Checkout.
 *
 * Two kinds of sale go through here:
 *
 *  - an auto-renewing plan — Checkout in `subscription` mode — for buyers with
 *    no purchase history. Owner decision 2026-11-24; see
 *    lib/stripe-subscriptions.ts.
 *  - a one-time pass for a fixed period — Checkout in `payment` mode — for
 *    everyone who bought before that, who was promised a pass that never
 *    renews and keeps that promise.
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
  /**
   * The buyer's account, or null for a guest checkout. A guest pays without
   * an account: Stripe collects the email, and fulfilment attaches the pass to
   * the account with that email, creating one if there is none (see
   * resolveGuestBuyer).
   */
  userId: string | null;
  email: string | null;
  /** Sandbox checkout — admin-only test mode, see stripeTestConfigured. */
  test?: boolean;
  /** How this purchase relates to the buyer's current pass. */
  change: PlanChange;
  /** Sell an auto-renewing plan instead of a one-time pass. */
  renew?: boolean;
}): Promise<string> {
  if (opts.renew) {
    // A refused renewing checkout must not cost the sale: fall back to the
    // one-time pass, which charges less than the buyer agreed to, never more.
    try {
      return await createRenewingCheckout(opts);
    } catch (err) {
      console.error("[stripe] renewing checkout failed; selling a one-time pass instead", err);
      await notify("⚠️ Renewing checkout failed — sold a one-time pass instead", {
        Plan: PLANS[opts.plan].name,
        Error: errorText(err),
      });
    }
  }

  const plan = PLANS[opts.plan];
  const guest = opts.userId === null;
  const metadata: Record<string, string> = guest
    ? { plan: opts.plan, change: "new", guest: "1" }
    : { user_id: opts.userId!, plan: opts.plan, change: opts.change };

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
    // For a signed-in buyer the webhook and the success page map the payment
    // back to the account through these — never through the email, which a
    // buyer can edit. A guest has no account yet, so the email Stripe collects
    // is the only identity there is.
    ...(guest ? {} : { client_reference_id: opts.userId! }),
    metadata,
    payment_intent_data: { metadata },
    customer_creation: "always",
    ...(opts.email ? { customer_email: opts.email } : {}),
    // /pro-activating grants the pass on arrival and records the funnel's
    // "came back" and "Pro active" steps.
    success_url: absoluteUrl("/pro-activating?session_id={CHECKOUT_SESSION_ID}"),
    // A guest left from the builder's download paywall; /create restores the
    // autosaved draft, so backing out of checkout loses nothing.
    cancel_url: absoluteUrl(guest ? "/create" : "/pricing"),
  });

  if (!session.url) throw new Error(`checkout session ${session.id} has no url`);
  return session.url;
}

/**
 * Checkout for an auto-renewing plan.
 *
 * What the law on auto-renewal asks for (ROSCA; California's Automatic Renewal
 * Law is the strictest US version) and where it is met:
 *  - the price, the interval and that it continues until cancelled, next to
 *    the button — the submit text below, and the line under every buy button;
 *  - the buyer's express consent — Stripe's required Terms checkbox, whose
 *    label restates the renewal;
 *  - a simple way to cancel online — "Cancel renewal" on /account.
 *
 * The checkbox only works once a Terms URL is saved in the Stripe Dashboard
 * (Settings → Public details). Without it Stripe refuses the session, so this
 * retries without the checkbox rather than lose the sale, and says so in the
 * logs; the submit text still states the renewal and the Terms.
 */
async function createRenewingCheckout(opts: {
  plan: PaidPlanId;
  userId: string | null;
  email: string | null;
  test?: boolean;
}): Promise<string> {
  const plan = PLANS[opts.plan];
  const guest = opts.userId === null;
  const metadata: Record<string, string> = guest
    ? { plan: opts.plan, change: "new", guest: "1", renews: "1" }
    : { user_id: opts.userId!, plan: opts.plan, change: "new", renews: "1" };
  const terms = absoluteUrl("/terms");
  const renewal = `${renewalPhrase(plan)}. Cancel anytime from your account page; you keep Pro until the end of the period you paid for.`;
  // Pro starts the moment payment goes through, which ends the 14-day right of
  // withdrawal that EU and UK law gives online buyers — but only if the buyer
  // asked for that, in so many words, before paying.
  const waiver = "I ask for Pro to start now, so I give up the 14-day right of withdrawal some countries (including the EU and UK) give for online purchases.";

  const base = {
    mode: "subscription" as const,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(plan.price * 100),
          recurring: { interval: plan.interval! },
          // One product name for every plan: a plan switch reuses the product,
          // and the interval already says which plan it is.
          product_data: { name: "Makecepeit Pro", description: renewal },
        },
      },
    ],
    ...(guest ? {} : { client_reference_id: opts.userId! }),
    metadata,
    subscription_data: { metadata },
    ...(opts.email ? { customer_email: opts.email } : {}),
    success_url: absoluteUrl("/pro-activating?session_id={CHECKOUT_SESSION_ID}"),
    cancel_url: absoluteUrl(guest ? "/create" : "/pricing"),
  };

  const stripe = getStripe(opts.test ? "test" : "live");
  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.create({
      ...base,
      consent_collection: { terms_of_service: "required" },
      custom_text: {
        submit: { message: renewal },
        terms_of_service_acceptance: {
          message: `I agree to the [Terms of Service](${terms}), including the automatic renewal above. ${waiver}`,
        },
      },
    });
  } catch (err) {
    if (!/terms of service/i.test((err as Error)?.message ?? "")) throw err;
    console.warn("[stripe] Terms URL not set in the Stripe Dashboard; checkout opened without the Terms checkbox");
    session = await stripe.checkout.sessions.create({
      ...base,
      custom_text: {
        submit: {
          message: `${renewal} By subscribing you agree to the Terms of Service at ${terms}. ${waiver}`,
        },
      },
    });
  }

  if (!session.url) throw new Error(`checkout session ${session.id} has no url`);
  return session.url;
}

/** Was this session opened by someone who was not signed in? */
export function isGuestSession(session: Stripe.Checkout.Session): boolean {
  return session.metadata?.guest === "1" && !session.client_reference_id;
}

type Admin = ReturnType<typeof createAdminClient>;

/** The account whose profile carries this email, or null. Throws on DB errors. */
async function findAccountByEmail(admin: Admin, email: string): Promise<string | null> {
  // ilike so a profile stored with different casing still matches; the LIKE
  // wildcards are escaped because "_" is legal in an address.
  const pattern = email.replace(/[\\%_]/g, (c) => `\\${c}`);
  const { data, error } = await admin
    .from("profiles")
    .select("id")
    .ilike("email", pattern)
    .order("created_at", { ascending: true })
    .limit(1);
  if (error) throw error;
  return (data?.[0]?.id as string | undefined) ?? null;
}

function isAlreadyRegistered(error: { message?: string; code?: string }): boolean {
  return (
    error.code === "email_exists" ||
    error.code === "user_already_exists" ||
    /already (been )?registered|already exists/i.test(error.message ?? "")
  );
}

/**
 * The account a guest purchase belongs to: the one with the email the buyer
 * gave Stripe, or a new one created for it.
 *
 * This is how "the pass stays on your checkout email and is there when you
 * sign up" works without a schema change: the account exists from the moment
 * of payment, with no password, and the buyer reaches it later through Google,
 * "Forgot password", or the sign-in on the return page.
 *
 * A new account is stamped in app_metadata (only the service role can write
 * it) with the session that created it, so the return page can tell "created
 * by this purchase" from "someone's existing account".
 *
 * The webhook and the return page can both get here for the same session at
 * once. Whichever loses the race to create sees "already registered" and looks
 * the account up again.
 */
async function resolveGuestBuyer(admin: Admin, session: Stripe.Checkout.Session): Promise<string> {
  const raw = session.customer_details?.email ?? session.customer_email ?? null;
  const email = raw?.trim().toLowerCase();
  if (!email) throw new Error(`guest session ${session.id} is paid but has no email`);

  const existing = await findAccountByEmail(admin, email);
  if (existing) return existing;

  const { data, error } = await admin.auth.admin.createUser({
    email,
    // Confirmed so the buyer can reach it later by Google or a reset link
    // without a separate verification step. createUser sends no email.
    email_confirm: true,
    app_metadata: { created_by_checkout: session.id },
  });
  if (error) {
    if (isAlreadyRegistered(error)) {
      const again = await findAccountByEmail(admin, email);
      if (again) return again;
    }
    throw error;
  }
  if (!data.user) throw new Error(`createUser returned no user for session ${session.id}`);
  return data.user.id;
}

/**
 * Grant the pass a paid Checkout Session bought. Safe to call more than once.
 *
 * Called from the webhook (the reliable path) and from the return page when the
 * buyer lands back on the site (the fast path, so they never see "Free" for the
 * second before the webhook arrives). The row id is the session id, so the
 * second caller finds the first one's row and stops.
 *
 * Returns the plan granted and the account it went to, or null when the
 * session grants nothing — not paid yet, not a pass, or no account attached.
 */
export async function fulfillPassCheckout(
  session: Stripe.Checkout.Session
): Promise<{ plan: PaidPlanId; userId: string } | null> {
  if (session.mode === "subscription") return fulfillSubscriptionCheckout(session);
  if (session.mode !== "payment" || session.payment_status !== "paid") return null;

  const plan = session.metadata?.plan;
  if (!isPaidPlan(plan)) {
    console.warn(`[stripe] session ${session.id} has no plan; nothing granted`);
    return null;
  }

  const admin = createAdminClient();

  // Every database error throws: the webhook then answers 500 and Stripe
  // retries, instead of a 200 that marks a paid order done with nothing granted.
  const { data: existing, error: readError } = await admin
    .from("subscriptions")
    .select("id, user_id")
    .eq("id", session.id)
    .maybeSingle();
  if (readError) throw readError;
  if (existing) return { plan, userId: existing.user_id as string };

  const guest = isGuestSession(session);
  const userId = guest
    ? await resolveGuestBuyer(admin, session)
    : session.client_reference_id ?? session.metadata?.user_id ?? null;
  if (!userId) {
    console.warn(`[stripe] session ${session.id} has no user; nothing granted`);
    return null;
  }

  // A buyer who already holds a pass gets the new one added to the end of it.
  const now = new Date();
  const { data: latest, error: latestError } = await admin
    .from("subscriptions")
    .select("current_period_end")
    .eq("user_id", userId)
    // Not this session's own row: when the webhook and the return page run at
    // once, the slower one would otherwise stack this same pass on itself.
    .neq("id", session.id)
    .gt("current_period_end", now.toISOString())
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (latestError) throw latestError;
  const from = latest?.current_period_end ? new Date(latest.current_period_end) : now;

  const { data: inserted, error: writeError } = await admin.from("subscriptions").upsert(
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
    // Insert-or-nothing: whichever caller loses the race leaves the winner's
    // row untouched and gets no row back.
    { onConflict: "id", ignoreDuplicates: true }
  )
    .select("id");
  if (writeError) throw writeError;
  // Only the caller that wrote the row records the sale, so /admin revenue
  // counts each payment once.
  if (!inserted || inserted.length === 0) return { plan, userId };

  await recordServerEvent("pass_purchased", userId, {
    plan,
    change: session.metadata?.change ?? null,
    session: session.id,
    amount: session.amount_total,
    livemode: session.livemode,
    guest,
  });

  return { plan, userId };
}

/**
 * Record the auto-renewing plan a paid Checkout Session started. Safe to call
 * more than once, like the pass grant above: the row id is the subscription id.
 *
 * This is the only place a subscription row is created — the subscription
 * events that follow update it (syncSubscriptionRow) but cannot create it,
 * because for a guest only the checkout knows which account it belongs to.
 */
async function fulfillSubscriptionCheckout(
  session: Stripe.Checkout.Session
): Promise<{ plan: PaidPlanId; userId: string } | null> {
  if (session.status !== "complete") return null;
  if (session.payment_status !== "paid" && session.payment_status !== "no_payment_required") return null;
  const plan = session.metadata?.plan;
  if (!isPaidPlan(plan) || !session.subscription) {
    console.warn(`[stripe] subscription session ${session.id} has no plan or subscription; nothing granted`);
    return null;
  }
  const subscriptionId =
    typeof session.subscription === "string" ? session.subscription : session.subscription.id;

  const admin = createAdminClient();
  const { data: existing, error: readError } = await admin
    .from("subscriptions")
    .select("user_id")
    .eq("id", subscriptionId)
    .maybeSingle();
  if (readError) throw readError;
  if (existing) return { plan, userId: existing.user_id as string };

  const guest = isGuestSession(session);
  const userId = guest
    ? await resolveGuestBuyer(admin, session)
    : session.client_reference_id ?? session.metadata?.user_id ?? null;
  if (!userId) {
    console.warn(`[stripe] session ${session.id} has no user; nothing granted`);
    return null;
  }

  const sub = await getStripe(session.livemode ? "live" : "test").subscriptions.retrieve(subscriptionId);
  const fields = subscriptionFields(sub);
  const { data: inserted, error: writeError } = await admin
    .from("subscriptions")
    .upsert(
      { id: subscriptionId, user_id: userId, ...fields, plan: fields.plan ?? plan },
      { onConflict: "id", ignoreDuplicates: true }
    )
    .select("id");
  if (writeError) throw writeError;
  if (!inserted || inserted.length === 0) return { plan, userId };

  // `session` is the row id, which is what /admin revenue matches the amount
  // to (lib/metrics-api.ts); the Checkout Session is kept alongside it.
  await recordServerEvent("pass_purchased", userId, {
    plan,
    change: "new",
    session: subscriptionId,
    checkout: session.id,
    amount: session.amount_total,
    livemode: session.livemode,
    guest,
    renews: true,
  });

  return { plan, userId };
}

/** The Checkout Session behind a return URL, or null if it cannot be read. */
export async function retrieveCheckoutSession(
  sessionId: string | undefined
): Promise<Stripe.Checkout.Session | null> {
  if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return null;
  const mode = stripeModeForSession(sessionId);
  if (mode === "live" ? !stripeConfigured : !stripeTestConfigured) return null;
  try {
    return await getStripe(mode).checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error("[stripe] could not retrieve checkout session", err);
    return null;
  }
}

/**
 * Grant the pass a buyer just paid for, as they land back from Stripe.
 *
 * The webhook does this too and is the path to rely on, but it can trail the
 * redirect by a second or two — long enough for a buyer who has just paid to
 * read "Free". Both paths share one idempotent grant, so whichever runs second
 * does nothing.
 *
 * Only for the signed-in owner of the session: a session id is not a secret
 * once it has sat in a URL, and it must not hand Pro to whoever pastes it.
 * Records what it found, so a buyer stuck after paying can be traced.
 */
export async function fulfilReturningBuyer(sessionId: string | undefined, userId: string) {
  if (!sessionId) return;
  const mode = stripeModeForSession(sessionId);
  if (mode === "live" ? !stripeConfigured : !stripeTestConfigured) return;
  try {
    const session = await getStripe(mode).checkout.sessions.retrieve(sessionId);
    if (session.client_reference_id !== userId) {
      await recordServerEvent("checkout_returned", userId, { status: "not_owner", session: sessionId });
      return;
    }
    await recordServerEvent("checkout_returned", userId, {
      status: session.payment_status,
      plan: session.metadata?.plan ?? null,
      session: sessionId,
    });
    await fulfillPassCheckout(session);
  } catch (err) {
    // The webhook will still grant it; the page must not fail over this.
    console.error("[stripe] could not fulfil returning checkout", err);
    await recordServerEvent("pass_grant_failed", userId, {
      where: "return",
      session: sessionId,
      error: errorText(err),
    });
  }
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
