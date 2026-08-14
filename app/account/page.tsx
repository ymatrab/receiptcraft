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
    .select("status, plan, current_period_end, cancel_at_period_end")
    .eq("user_id", user.id)
    .order("current_period_end", { ascending: false })
    .limit(1)
    .maybeSingle();

  const isPro = isProStatus(sub?.status);
  const planName = sub?.plan ? PLANS[sub.plan as keyof typeof PLANS]?.name ?? sub.plan : "Free";

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

        {isPro && sub?.current_period_end && (
          <p className="mt-4 text-sm text-slate-500">
            {sub.cancel_at_period_end ? "Cancels" : "Renews"} on{" "}
            {new Date(sub.current_period_end).toLocaleDateString()}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {isPro ? (
            <form action="/api/stripe/portal" method="post">
              <button
                type="submit"
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Manage billing
              </button>
            </form>
          ) : (
            <Link
              href="/pricing"
              className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Upgrade to Pro
            </Link>
          )}
          <Link
            href="/account/receipts"
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Saved receipts
          </Link>
        </div>
      </div>

      <form action="/auth/signout" method="post" className="mt-6">
        <button type="submit" className="text-sm font-medium text-slate-500 hover:text-slate-700">
          Sign out
        </button>
      </form>
    </main>
  );
}
