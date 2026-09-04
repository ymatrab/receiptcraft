import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { isProEntitled, isProStatus, PLANS, FREE_LIMITS } from "@/lib/plans";
import { getAccountUsage } from "@/lib/usage";
import { SITE } from "@/lib/site";
import { FREE_BRAND_SLUGS } from "@/lib/brand-access";
import { BRAND_TEMPLATES } from "@/lib/brands";
import LocalDate from "@/components/LocalDate";
import BillingNotice from "./BillingNotice";
import { deleteReceiptAction } from "./actions";

export const metadata: Metadata = {
  title: "Your Account",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/** How many saved receipts to show inline before sending people to the full list. */
const RECENT_LIMIT = 5;

/**
 * A usage figure, sized so the number is the thing you read first.
 *
 * `tabular-nums` because these sit in a row and change between renders — a
 * proportional "1" is narrower than a "3" and makes the row twitch.
 */
function Stat({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "neutral" | "good" | "spent";
}) {
  const valueTone =
    tone === "good" ? "text-emerald-700" : tone === "spent" ? "text-amber-700" : "text-slate-900";
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-1 text-3xl font-bold tabular-nums ${valueTone}`}>{value}</p>
      {hint && <p className="mt-1 text-xs leading-relaxed text-slate-500">{hint}</p>}
    </div>
  );
}

export default async function AccountPage() {
  if (!supabaseConfigured) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Accounts coming soon</h1>
        <p className="mt-3 text-slate-600">
          The backend isn&apos;t connected yet. Add your Supabase keys to enable accounts.
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  // The subscription decides what the rest of the page says, but nothing here
  // depends on anything else here — so pay for one round trip, not four.
  const [{ data: sub }, usage, { data: recentReceipts }] = await Promise.all([
    supabase
      .from("subscriptions")
      .select("status, plan, current_period_end, cancel_at_period_end, stripe_customer_id")
      .eq("user_id", user.id)
      .order("current_period_end", { ascending: false })
      .limit(1)
      .maybeSingle(),
    getAccountUsage(supabase, user.id),
    supabase
      .from("receipts")
      .select("id, title, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(RECENT_LIMIT),
  ]);

  const isPro = isProEntitled(sub?.status, sub?.current_period_end);
  // A grant that has run out: still marked active in the table, but past its
  // period end. Worth naming on the page rather than silently showing "Free".
  const hasLapsed = !isPro && isProStatus(sub?.status) && Boolean(sub?.current_period_end);
  const plan = isPro && sub?.plan ? PLANS[sub.plan as keyof typeof PLANS] : null;
  const planName = plan?.name ?? (isPro ? sub?.plan ?? "Pro" : "Free");

  // Shopify and admin grants are one-off purchases that simply end. Only a real
  // Stripe customer has a subscription that renews — and a billing portal to
  // manage it.
  const isSelfServeBilling = Boolean(
    sub?.stripe_customer_id && sub.stripe_customer_id !== "manual"
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Your account</h1>
      <p className="mt-1 text-slate-600">
        {user.email}
        {user.created_at && (
          <>
            {" · "}
            <span className="text-slate-500">
              member since <LocalDate iso={user.created_at} />
            </span>
          </>
        )}
      </p>

      {/* Renders nothing unless the billing portal bounced someone back here. */}
      <BillingNotice />

      {/* ---------------------------------------------------------------- plan */}
      <section aria-labelledby="plan-heading" className="mt-8">
        <h2 id="plan-heading" className="sr-only">
          Your plan
        </h2>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Current plan</p>
              <p className="mt-0.5 text-2xl font-bold text-slate-900">{planName}</p>
              {plan && (
                <p className="mt-1 text-sm text-slate-500">
                  ${plan.price}
                  {plan.interval ? ` per ${plan.interval}` : ""}
                </p>
              )}
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isPro ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
              }`}
            >
              {isPro ? "Pro · active" : hasLapsed ? "Pro · ended" : "Free"}
            </span>
          </div>

          {isPro && sub?.current_period_end && (
            <p className="mt-4 text-sm text-slate-600">
              {isSelfServeBilling
                ? `${sub.cancel_at_period_end ? "Cancels" : "Renews"} on `
                : "Pro access until "}
              <LocalDate iso={sub.current_period_end} className="font-medium text-slate-900" />
            </p>
          )}

          {hasLapsed && sub?.current_period_end && (
            <p className="mt-4 text-sm text-slate-600">
              Your Pro access ended on{" "}
              <LocalDate iso={sub.current_period_end} className="font-medium text-slate-900" />.
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {/* The portal only exists for real Stripe customers; a manual grant
                has no subscription to manage, and posting one used to 500. */}
            {isPro && isSelfServeBilling && (
              <form action="/api/stripe/portal" method="post">
                <button
                  type="submit"
                  className="cursor-pointer rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  Manage billing
                </button>
              </form>
            )}
            {!isPro && (
              <Link
                href="/pricing"
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {hasLapsed ? "Renew Pro" : "Upgrade to Pro"}
              </Link>
            )}
            <Link
              href="/create"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Make a receipt
            </Link>
          </div>

          {isPro && !isSelfServeBilling && (
            <p className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-600">
              Need to cancel or get a refund? Email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-indigo-600 hover:underline"
              >
                {SITE.email}
              </a>{" "}
              and we&apos;ll sort it within one business day.
            </p>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------------- usage */}
      {/* These numbers were already being counted to enforce the limits — they
          were simply never shown to the person they were about. A free user's
          whole relationship with this product is "how much have I got left". */}
      <section aria-labelledby="usage-heading" className="mt-10">
        <h2 id="usage-heading" className="text-lg font-semibold text-slate-900">
          {isPro ? "Your usage" : "What's left"}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Each of these three reads can come back null, meaning the count
              failed rather than that it was zero — see lib/usage.ts. "—" is the
              honest answer there. The previous version printed `null ?? 0`
              dressed up as a real figure, which is how an account page went on
              telling free users their allowance was untouched for months while
              the table behind it did not exist. */}
          <Stat
            label="Watermark-free downloads"
            value={
              isPro
                ? "Unlimited"
                : usage.downloadsLeft === null
                  ? "—"
                  : `${usage.downloadsLeft} of ${FREE_LIMITS.freeReceiptDownloads}`
            }
            tone={isPro ? "good" : usage.downloadsLeft === 0 ? "spent" : "neutral"}
            hint={
              isPro
                ? "Every download exports clean"
                : usage.downloadsLeft === null
                  ? "We couldn't load this just now — refresh to try again"
                  : usage.downloadsLeft === 0
                    ? "New downloads carry a watermark"
                    : "Counted per receipt — re-downloading one is free"
            }
          />
          <Stat
            label="AI generations this month"
            value={
              isPro
                ? "Unlimited"
                : usage.aiLeftThisMonth === null
                  ? "—"
                  : `${usage.aiLeftThisMonth} of ${FREE_LIMITS.aiGenerationsPerMonth}`
            }
            tone={isPro ? "good" : usage.aiLeftThisMonth === 0 ? "spent" : "neutral"}
            hint={
              isPro
                ? "No monthly cap"
                : usage.aiLeftThisMonth === null
                  ? "We couldn't load this just now — refresh to try again"
                  : usage.aiLeftThisMonth === 0
                    ? "Resets on the 1st"
                    : `Used ${usage.aiUsedThisMonth} this month`
            }
          />
          <Stat
            label="Brand templates"
            value={isPro ? `All ${BRAND_TEMPLATES.length}` : `${FREE_BRAND_SLUGS.size} of ${BRAND_TEMPLATES.length}`}
            tone={isPro ? "good" : "neutral"}
            hint={
              isPro
                ? "Every brand template is yours"
                : `${BRAND_TEMPLATES.length - FREE_BRAND_SLUGS.size} more with Pro`
            }
          />
          <Stat
            label="Saved receipts"
            value={usage.receiptCount === null ? "—" : String(usage.receiptCount)}
            hint={
              usage.receiptCount === null
                ? "We couldn't load this just now — refresh to try again"
                : usage.receiptCount === 0
                  ? "Nothing saved yet"
                  : "Stored on your account"
            }
          />
        </div>

        {/* Free users saw an "Upgrade to Pro" button and no statement anywhere
            of what Pro actually gives them. */}
        {!isPro && (
          <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
            <h3 className="text-sm font-semibold text-indigo-950">Pro removes all three limits</h3>
            <ul className="mt-3 grid gap-2 text-sm text-indigo-900 sm:grid-cols-2">
              {[`All ${BRAND_TEMPLATES.length} brand templates`, "All 32 fonts and paper styles"]
                .concat(PLANS.pro_monthly.features.filter((f) => f !== "Everything in Free"))
                .map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden className="font-bold text-indigo-500">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
            </ul>
            <p className="mt-4 text-sm text-indigo-900">
              From <strong>${PLANS.pro_weekly.price} for 7 days</strong>, or $
              {PLANS.pro_yearly.price} a year.{" "}
              <Link href="/pricing" className="font-semibold underline hover:no-underline">
                See the plans
              </Link>
            </p>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------ receipts */}
      <section aria-labelledby="receipts-heading" className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="receipts-heading" className="text-lg font-semibold text-slate-900">
            Recent receipts
          </h2>
          {usage.receiptCount !== null && usage.receiptCount > RECENT_LIMIT && (
            <Link
              href="/account/receipts"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              See all {usage.receiptCount}
            </Link>
          )}
        </div>

        {!recentReceipts || recentReceipts.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <p className="text-slate-600">Nothing saved yet.</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
              Receipts you save from the builder appear here, so you can reopen or re-download them
              later.
            </p>
            <Link
              href="/create"
              className="mt-5 inline-block rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Make your first receipt
            </Link>
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {recentReceipts.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-800">
                    {r.title ?? "Untitled receipt"}
                  </p>
                  <LocalDate iso={r.created_at} withTime className="text-xs text-slate-500" />
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={`/create?receipt=${r.id}`}
                    className="flex h-11 items-center rounded-full px-4 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
                  >
                    Open
                  </Link>
                  <form action={deleteReceiptAction}>
                    <input type="hidden" name="id" value={r.id} />
                    <button
                      type="submit"
                      className="flex h-11 cursor-pointer items-center rounded-full px-4 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* -------------------------------------------------------------- signout */}
      {/* Separated from everything above, and given a real tap target — it was a
          ~60x20px text link, well under the 44x44 minimum. */}
      <div className="mt-12 border-t border-slate-200 pt-6">
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="flex h-11 cursor-pointer items-center rounded-full px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
