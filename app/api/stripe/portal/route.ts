import { NextResponse } from "next/server";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { absoluteUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Send the customer back to their account with a reason, rather than answering
 * with JSON.
 *
 * This is reached by a form POST, and a form POST *navigates*. Returning
 * `NextResponse.json({ error }, { status })` therefore took the customer off the
 * site and rendered `{"error":"no stripe subscription"}` as a web page — the
 * failure mode of the one button only paying customers press.
 *
 * 303 so the browser follows with GET; a 307 would replay the POST at /account.
 */
function back(reason: "unavailable" | "none" | "failed") {
  return NextResponse.redirect(absoluteUrl(`/account?billing=${reason}`), {
    status: 303,
    headers: { "Cache-Control": "no-store" },
  });
}

/** Opens the Stripe customer billing portal for the logged-in user. */
export async function POST() {
  if (!stripeConfigured || !supabaseConfigured) {
    return back("unavailable");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    // Session gone stale mid-session. /account will bounce them to log in.
    return NextResponse.redirect(absoluteUrl("/account"), { status: 303 });
  }

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();

  // "manual" is the placeholder written by admin grants and Shopify orders —
  // it is not a Stripe customer, and passing it to the portal throws a 500.
  // Those members cancel by emailing support; /account tells them so.
  if (!sub?.stripe_customer_id || sub.stripe_customer_id === "manual") {
    return back("none");
  }

  // Stripe can refuse a customer that was deleted on their side, and it can
  // simply be down. Either way the customer must not see a stack trace.
  try {
    const session = await getStripe().billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: absoluteUrl("/account"),
    });
    return NextResponse.redirect(session.url, { status: 303 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[stripe:portal]", err);
    return back("failed");
  }
}
