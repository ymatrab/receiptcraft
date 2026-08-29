import { NextResponse } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { getPaymentLinks } from "@/lib/settings";
import { absoluteUrl } from "@/lib/site";

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

export async function GET(request: Request) {
  const plan = new URL(request.url).searchParams.get("plan");
  if (!isPlan(plan)) return go(absoluteUrl("/pricing"));

  const account = await getAccountStatus();

  // Already paid — there is nothing to buy, so show them what they have.
  if (account.isPro) return go(absoluteUrl("/account"));

  if (!account.isLoggedIn) {
    // Come straight back here afterwards, so one click stays one click: the
    // login page honours an internal `next`, and so does the auth callback.
    const next = encodeURIComponent(`/api/checkout?plan=${plan}`);
    return go(absoluteUrl(`/login?next=${next}`));
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

  if (url.hostname.includes("stripe.com")) {
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

  return go(url.toString());
}
