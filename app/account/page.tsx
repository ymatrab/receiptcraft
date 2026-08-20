import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { isProEntitled, isProStatus, PLANS } from "@/lib/plans";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your Account",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!supabaseConfigured) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Accounts coming soon</h1>
        <p className="mt-3 text-slate-600">
          The backend isn&apos;t connected yet. Add your Supabase keys to enable accounts.
        </p>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  const { data: sub } = await supabase
    .from("subscriptions")
    // `*` rather than a column list on purpose: `source` only exists once
    // migration 0005 has run, and naming a missing column makes the whole query
    // error — which would render every Pro member as Free until the migration
    // lands. Selecting everything degrades to the old sentinel instead.
    .select("*")
    .eq("user_id", user.id)
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();

  const isPro = isProEntitled(sub?.status, sub?.current_period_end);
  // A grant that has run out: still marked active in the table, but past its
  // period end. Worth naming on the page rather than silently showing "Free".
  const hasLapsed = !isPro && isProStatus(sub?.status) && Boolean(sub?.current_period_end);
  const planName =
    isPro && sub?.plan ? PLANS[sub.plan as keyof typeof PLANS]?.name ?? sub.plan : "Free";

  // Shopify and admin grants are one-off purchases that simply end. Only a real
  // Stripe subscription renews — and only it has a billing portal to manage.
  //
  // Falls back to the pre-0005 sentinel so this page is correct on either
  // schema: before the migration a grant is identified by stripe_customer_id
  // being the literal "manual", after it by source.
  const source =
    sub?.source ??
    (sub?.stripe_customer_id
      ? sub.stripe_customer_id === "manual"
        ? "manual"
        : "stripe"
      : null);
  const isSelfServeBilling = source === "stripe";
  const endDate = sub?.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString()
    : null;

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Your account</h1>
      <p className="mt-1 text-slate-500">{user.email}</p>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Current plan</p>
            <p className="text-2xl font-bold text-slate-900">{planName}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isPro ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
            }`}
          >
            {isPro ? "Pro · active" : "Free"}
          </span>
        </div>

        {isPro && endDate && (
          <p className="mt-4 text-sm text-slate-500">
            {isSelfServeBilling
              ? `${sub?.cancel_at_period_end ? "Cancels" : "Renews"} on ${endDate}`
              : `Pro access until ${endDate}`}
          </p>
        )}

        {hasLapsed && endDate && (
          <p className="mt-4 text-sm text-slate-500">
            Your Pro access ended on {endDate}.
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {/* The portal only exists for real Stripe customers; a manual grant
              has no subscription to manage, and posting one used to 500. */}
          {isPro && isSelfServeBilling && (
            <form action="/api/stripe/portal" method="post">
              <button
                type="submit"
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Manage billing
              </button>
            </form>
          )}
          {!isPro && (
            <Link
              href="/pricing"
              className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              {hasLapsed ? "Renew Pro" : "Upgrade to Pro"}
            </Link>
          )}
          <Link
            href="/account/receipts"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Saved receipts
          </Link>
        </div>

        {isPro && !isSelfServeBilling && (
          <p className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-500">
            Need to cancel or get a refund? Email{" "}
            <a href={`mailto:${SITE.email}`} className="font-medium text-indigo-600 hover:underline">
              {SITE.email}
            </a>{" "}
            and we&apos;ll sort it within one business day.
          </p>
        )}
      </div>

      <form action="/auth/signout" method="post" className="mt-6">
        <button type="submit" className="text-sm font-medium text-slate-500 hover:text-slate-700">
          Sign out
        </button>
      </form>
    </main>
  );
}
