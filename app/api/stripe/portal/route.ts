import { NextResponse } from "next/server";
import { getStripe, stripeConfigured } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { absoluteUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Opens the Stripe customer billing portal for the logged-in user. */
export async function POST() {
  if (!stripeConfigured || !supabaseConfigured) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!sub?.stripe_customer_id) {
    return NextResponse.json({ error: "no subscription" }, { status: 404 });
  }

  const session = await getStripe().billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: absoluteUrl("/account"),
  });

  return NextResponse.redirect(session.url, { status: 303 });
}
