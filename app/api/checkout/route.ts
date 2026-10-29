import { NextResponse, after } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { notify } from "@/lib/telegram";
import { getPaymentLinks } from "@/lib/settings";
import { PLANS, formatPlanPrice, planChange } from "@/lib/plans";
import { absoluteUrl } from "@/lib/site";
import { stripeConfigured, stripeTestConfigured } from "@/lib/stripe";
import { createPassCheckout } from "@/lib/stripe-passes";
import { recordServerEvent, errorText } from "@/lib/server-events";
import { BOT_UA } from "@/lib/analytics-events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The buy button, as a server route.
 *
 * /pricing used to do this work in the browser: a client component waited for
 * /api/me, then built the payment link and assigned window.location. That meant
 * the three CTAs shipped from the server carrying `disabled` and stayed inert
 * until hydration finished *and* that request came back — measured at 0.5s on a
 * normal connection — and never worked at all if hydration failed. They were
 * the only controls on the page that took money and the only ones that could be
 * dead.
 *
 * Resolving the account here instead makes the CTA an ordinary link: it works
 * before hydration, without JavaScript, and from a bot or a copied URL. It also
 * fixes attribution, because `client_reference_id` is now attached server-side
 * where the user id is known for certain, rather than depending on a client
 * fetch having landed first.
 *
 * A side effect worth having: /pricing no longer reads the payment links at
 * render, so an admin edit takes effect on the next click instead of after the
 * page's 5-minute revalidation window.
 */

/** Query value → the key it has in PaymentLinks. */
const PLAN_LINK = {
  pro_weekly: "weekly",
  pro_monthly: "monthly",
  pro_yearly: "yearly",
} as const;

type PlanParam = keyof typeof PLAN_LINK;

function isPlan(value: string | null): value is PlanParam {
  return value === "pro_weekly" || value === "pro_monthly" || value === "pro_yearly";
}

/** Redirects out of here are per-user decisions — never let one be cached. */
function go(url: string, status: 302 | 303 = 303) {
  return NextResponse.redirect(url, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/**
 * A request that no person made: a crawler, a link checker, or a browser
 * prefetching the link ahead of a click that may never come.
 *
 * Because the CTA is a plain link, anything that walks /pricing hits all three
 * plans in a row — on 2026-10-29 two such bursts opened weekly, monthly and
 * yearly inside a second, with no click recorded, and each one created three
 * live Stripe sessions and three "Checkout started" alerts. Only clear signals
 * count here: a missed bot costs one false alert, a misjudged buyer costs a sale.
 */
function isAutomated(request: Request): boolean {
  const h = request.headers;
  const ua = h.get("user-agent") ?? "";
  if (!ua || BOT_UA.test(ua)) return true;
  const purpose = `${h.get("sec-purpose") ?? ""} ${h.get("purpose") ?? ""} ${h.get("x-moz") ?? ""}`;
  if (/prefetch|prerender/i.test(purpose)) return true;
  // A click or a typed URL is a navigation; a fetch(), an <img> or a scanner's
  // no-cors probe is not. Browsers that send no Sec-Fetch-Mode are let through.
  const mode = h.get("sec-fetch-mode");
  return mode !== null && mode !== "navigate";
}

export async function GET(request: Request) {
  const plan = new URL(request.url).searchParams.get("plan");
  if (!isPlan(plan)) return go(absoluteUrl("/pricing"));
  // No session, no alert, no event. A person who somehow lands here is sent to
  // /pricing, one click from trying again.
  if (isAutomated(request)) return go(absoluteUrl("/pricing"));

  const account = await getAccountStatus();

  const chosen = PLANS[plan];

  if (!account.isLoggedIn) {
    /**
     * Guest checkout. Paying needs no account: Stripe collects the email, and
     * fulfilment (lib/stripe-passes.ts) attaches the pass to the account with
     * that email, creating one when there is none. Sending a buyer to a login
     * form first was losing most of the people who clicked "remove the
     * watermark".
     *
     * Live Stripe only. Admin test mode needs a signed-in admin, and the saved
     * payment links below need an account id to attribute the order, so
     * without Stripe a guest still signs in first.
     */
    if (stripeConfigured) {
      try {
        const url = await createPassCheckout({ plan, userId: null, email: null, change: "new" });
        after(() =>
          notify("🛒 Checkout started", {
            Plan: `${chosen.name} (${formatPlanPrice(chosen)})`,
            Email: null,
            Rail: "Stripe",
            User: "guest",
          })
        );
        after(() =>
          recordServerEvent("checkout_opened", null, { plan, change: "new", rail: "stripe", guest: true })
        );
        return go(url);
      } catch (err) {
        console.error("[checkout] guest stripe session failed", err);
        after(() =>
          recordServerEvent("checkout_failed", null, { plan, guest: true, error: errorText(err) })
        );
        return go(absoluteUrl("/pricing?checkout=unavailable"));
      }
    }

    // Come straight back here afterwards, so one click stays one click: the
    // login page honours an internal `next`, and so does the auth callback.
    const next = encodeURIComponent(`/api/checkout?plan=${plan}`);
    return go(absoluteUrl(`/login?next=${next}`));
  }

  // A member may extend or move to a longer plan, never to a shorter one while
  // the longer pass is still running — see planChange in lib/plans.ts.
  const change = planChange(account.plan, plan);
  if (change === "downgrade") return go(absoluteUrl("/account"));

  /**
   * Stripe, when a key is configured: a Checkout Session for a one-time pass,
   * granted automatically by the webhook. The saved payment links below are
   * the fallback rail — Shopify, fulfilled by hand — for as long as Stripe is
   * not set up, or if it refuses to open a session.
   */
  // Admin-only test mode wins for admins, so the owner can rehearse a sandbox
  // purchase on the live site without touching anyone else's checkout.
  const stripeTest = account.isAdmin && stripeTestConfigured;
  if (stripeConfigured || stripeTest) {
    try {
      const url = await createPassCheckout({
        plan,
        userId: account.userId!,
        email: account.email ?? null,
        test: stripeTest,
        change,
      });
      after(() =>
        notify("🛒 Checkout started", {
          Plan: `${chosen.name} (${formatPlanPrice(chosen)})`,
          Email: account.email,
          Rail: stripeTest ? "Stripe (test)" : "Stripe",
          Change: change === "new" ? null : `${change} from ${PLANS[account.plan as keyof typeof PLANS]?.name}`,
          User: account.userId,
        })
      );
      after(() =>
        recordServerEvent("checkout_opened", account.userId, {
          plan,
          change,
          rail: stripeTest ? "stripe_test" : "stripe",
        })
      );
      return go(url);
    } catch (err) {
      console.error("[checkout] stripe session failed", err);
      after(() =>
        recordServerEvent("checkout_failed", account.userId, { plan, error: errorText(err) })
      );
      return go(absoluteUrl("/pricing?checkout=unavailable"));
    }
  }

  const links = await getPaymentLinks();
  const link = links[PLAN_LINK[plan]];
  if (!link) return go(absoluteUrl("/pricing?checkout=unavailable"));

  let url: URL;
  try {
    url = new URL(link);
  } catch {
    // A malformed link saved in the admin panel. Say so on /pricing rather
    // than throwing a 500 at someone who was trying to pay us.
    return go(absoluteUrl("/pricing?checkout=unavailable"));
  }

  const rail = url.hostname.includes("stripe.com") ? "Stripe" : "Shopify";

  if (rail === "Stripe") {
    // Stripe maps the payment to the account via webhook on this field.
    url.searchParams.set("client_reference_id", account.userId!);
  } else {
    // Shopify: fulfilment is by hand, so carry the account id as a cart
    // attribute. Email is only the fallback — it breaks the moment a buyer
    // edits the address at checkout, which is exactly when a grant would
    // silently go missing.
    url.searchParams.set("attributes[user_id]", account.userId!);
    if (account.email) url.searchParams.set("checkout[email]", account.email);
  }

  /**
   * Tell the owner someone is buying, in `after()` so the redirect is not held
   * up by Telegram. This is the alert that pays for the others: with Shopify
   * the grant is manual (Members tab), so an order that nobody is told about
   * sits unfulfilled until the buyer complains.
   */
  after(() =>
    notify("🛒 Checkout started", {
      // Named the way it is named on /pricing, with the price the buyer just
      // saw — "Pro Monthly ($7.99)", not the `pro_monthly` query param. The
      // point of the alert is to be readable on a phone in one glance, and
      // both halves come from lib/plans.ts so a price change cannot leave the
      // alert quoting a figure the site no longer charges.
      Plan: `${chosen.name} (${formatPlanPrice(chosen)})`,
      Email: account.email,
      Rail: rail,
      User: account.userId,
    })
  );

  return go(url.toString());
}
