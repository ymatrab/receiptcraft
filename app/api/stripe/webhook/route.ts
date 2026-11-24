import { NextResponse, after } from "next/server";
import type Stripe from "stripe";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { supabaseConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { notify } from "@/lib/telegram";
import { recordServerEvent, errorText } from "@/lib/server-events";
import { fulfillPassCheckout, endRefundedPass, endDisputedPass } from "@/lib/stripe-passes";
import {
  cancelCustomerSubscriptions,
  invoiceSubscriptionId,
  isCancelling,
  planOfSubscription,
  syncSubscriptionRow,
} from "@/lib/stripe-subscriptions";
import { PLANS } from "@/lib/plans";

// Stripe needs the raw body for signature verification — force the Node runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** "$3.00 USD" from an amount in cents. */
function money(cents: number | null | undefined, currency: string | null | undefined): string | null {
  if (cents === null || cents === undefined) return null;
  return `${(cents / 100).toFixed(2)} ${(currency ?? "").toUpperCase()}`;
}

/**
 * Has this renewal invoice already been recorded? Stripe delivers an event at
 * least once, and a repeat must not count the same renewal twice in revenue.
 */
async function renewalRecorded(invoiceId: string): Promise<boolean> {
  const { data, error } = await createAdminClient()
    .from("events")
    .select("id")
    .eq("name", "subscription_renewed")
    .eq("props->>invoice", invoiceId)
    .limit(1);
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

/** A plan's display name, or null. */
function planName(plan: string | null | undefined): string | null {
  return PLANS[plan as keyof typeof PLANS]?.name ?? null;
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
        // A pass or an auto-renewing plan — fulfilment handles both. A guest
        // checkout has no client_reference_id; fulfilment resolves (or
        // creates) the account from the checkout email and says which.
        const granted = await fulfillPassCheckout(session);
        if (!granted) break;
        const userId = granted.userId;
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
            Plan: planName(session.metadata?.plan),
            Renews: session.mode === "subscription" ? "yes, until cancelled" : null,
            User: userId,
            Guest: session.metadata?.guest === "1" ? "yes" : null,
          })
        );
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        let userId = await endRefundedPass(charge);
        let stopped: string[] = [];
        // Not a pass: a full refund of a plan charge also stops the plan, so
        // the card is not charged again at the next renewal.
        if (!userId && charge.refunded) {
          const customer = typeof charge.customer === "string" ? charge.customer : charge.customer?.id;
          const result = await cancelCustomerSubscriptions(customer, stripe);
          userId = result.userId;
          stopped = result.ids;
        }
        if (userId) {
          await recordServerEvent("pass_refunded", userId, stopped.length ? { subscriptions: stopped.join(", ") } : undefined);
          after(() =>
            notify(stopped.length ? "↩️ Refund — plan stopped, Pro ended" : "↩️ Refund — Pro pass ended", {
              User: userId,
              Amount: money(charge.amount_refunded, charge.currency),
            })
          );
        }
        break;
      }
      case "charge.dispute.created": {
        const dispute = event.data.object as Stripe.Dispute;
        let userId = await endDisputedPass(dispute);
        // Stop any plan on the same card at once: renewing after a chargeback
        // is how one dispute becomes two.
        const chargeId = typeof dispute.charge === "string" ? dispute.charge : dispute.charge?.id;
        let stopped: string[] = [];
        let stopFailed: string | null = null;
        if (chargeId) {
          // Never let this stop the alert below: the dispute has a deadline.
          try {
            const charge = await stripe.charges.retrieve(chargeId);
            const customer = typeof charge.customer === "string" ? charge.customer : charge.customer?.id;
            const result = await cancelCustomerSubscriptions(customer, stripe);
            userId = userId ?? result.userId;
            stopped = result.ids;
          } catch (err) {
            console.error("[stripe] could not stop plans after dispute", err);
            stopFailed = errorText(err);
          }
        }
        await recordServerEvent("pass_disputed", userId, {
          reason: dispute.reason,
          ...(stopped.length ? { subscriptions: stopped.join(", ") } : {}),
        });
        // Always alert, pass or not: a dispute has a response deadline and
        // costs a fee whether or not anything is done about it.
        after(() =>
          notify("🚨 Chargeback opened — respond in Stripe", {
            Amount: `${(dispute.amount / 100).toFixed(2)} ${dispute.currency.toUpperCase()}`,
            Reason: dispute.reason,
            User: userId,
            "Plan stopped": stopped.length ? stopped.join(", ") : null,
            "Could not stop plan — cancel it in Stripe": stopFailed,
          })
        );
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = await syncSubscriptionRow(sub);
        // A renewal switched off — from /account or the Stripe portal. Worth
        // knowing while the person still remembers why.
        const before = (event.data.previous_attributes ?? {}) as unknown as Partial<Stripe.Subscription>;
        const wasCancelling =
          before.cancel_at_period_end !== undefined || before.cancel_at !== undefined
            ? Boolean(before.cancel_at_period_end) || Boolean(before.cancel_at)
            : isCancelling(sub);
        if (event.type === "customer.subscription.updated" && isCancelling(sub) && !wasCancelling) {
          after(() =>
            notify("🔕 Renewal cancelled", { Plan: planName(planOfSubscription(sub)), User: userId })
          );
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = await syncSubscriptionRow(sub);
        after(() =>
          notify("⚠️ Plan ended", {
            Plan: planName(planOfSubscription(sub)),
            User: userId,
            Subscription: sub.id,
          })
        );
        break;
      }
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoiceSubscriptionId(invoice);
        // The first charge is the checkout's, already counted and alerted above.
        if (!subscriptionId || invoice.billing_reason !== "subscription_cycle") break;
        if (invoice.id && (await renewalRecorded(invoice.id))) break;
        const found = await stripe.subscriptions.retrieve(subscriptionId);
        const userId = await syncSubscriptionRow(found);
        const plan = planOfSubscription(found);
        await recordServerEvent("subscription_renewed", userId, {
          plan,
          subscription: subscriptionId,
          invoice: invoice.id,
          amount: invoice.amount_paid,
          livemode: invoice.livemode,
        });
        after(() =>
          notify("🔁 Renewal paid", {
            Plan: planName(plan),
            Amount: money(invoice.amount_paid, invoice.currency),
            Email: invoice.customer_email,
            User: userId,
          })
        );
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoiceSubscriptionId(invoice);
        if (!subscriptionId) break;
        const found = await stripe.subscriptions.retrieve(subscriptionId);
        const userId = await syncSubscriptionRow(found);
        await recordServerEvent("renewal_failed", userId, {
          subscription: subscriptionId,
          invoice: invoice.id,
          attempt: invoice.attempt_count,
        });
        after(() =>
          notify("💳 Plan payment failed", {
            Plan: planName(planOfSubscription(found)),
            Amount: money(invoice.amount_due, invoice.currency),
            Attempt: invoice.attempt_count,
            Email: invoice.customer_email,
            User: userId,
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
