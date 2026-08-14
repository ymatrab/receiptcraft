import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { isProStatus, PLANS } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Your Account",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!supabaseConfigured) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">Accounts coming soon</h1>
        <p className="mt-3 text-ink-soft">
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
    .select("status, plan, current_period_end, cancel_at_period_end")
    .eq("user_id", user.id)
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();

  const isPro = isProStatus(sub?.status);
  const planName = sub?.plan ? PLANS[sub.plan as keyof typeof PLANS]?.name ?? sub.plan : "Free";

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">Your account</h1>
      <p className="mt-1 text-ink-soft">{user.email}</p>

      <div className="mt-8 rounded-[3px] border border-rule bg-card p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-soft">Current plan</p>
            <p className="text-2xl font-bold text-ink">{planName}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isPro ? "bg-greenbar text-ledger-deep" : "bg-rule/45 text-ink-soft"
            }`}
          >
            {isPro ? "Pro · active" : "Free"}
          </span>
        </div>

        {isPro && sub?.current_period_end && (
          <p className="mt-4 text-sm text-ink-soft">
            {sub.cancel_at_period_end ? "Cancels" : "Renews"} on{" "}
            {new Date(sub.current_period_end).toLocaleDateString()}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {isPro ? (
            <form action="/api/stripe/portal" method="post">
              <button
                type="submit"
                className="rounded-full bg-ledger px-5 py-2.5 text-sm font-semibold text-white hover:bg-ledger-deep"
              >
                Manage billing
              </button>
            </form>
          ) : (
            <Link
              href="/pricing"
              className="rounded-full bg-ledger px-5 py-2.5 text-sm font-semibold text-white hover:bg-ledger-deep"
            >
              Upgrade to Pro
            </Link>
          )}
          <Link
            href="/account/receipts"
            className="rounded-full border border-rule px-5 py-2.5 text-sm font-semibold text-ink hover:bg-greenbar"
          >
            Saved receipts
          </Link>
        </div>
      </div>

      <form action="/auth/signout" method="post" className="mt-6">
        <button type="submit" className="text-sm font-medium text-ink-soft hover:text-ink">
          Sign out
        </button>
      </form>
    </main>
  );
}
