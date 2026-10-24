/**
 * Subscription plan + entitlement config. Single source of truth for what a
 * free vs Pro user can do. The watermark (Phase 1), AI generator limits
 * (Phase 6) and admin views all read from here.
 *
 * Stripe price IDs are injected via env so the same code works in test and live.
 */

export type PlanId = "free" | "pro_weekly" | "pro_monthly" | "pro_yearly";

export interface Plan {
  id: PlanId;
  name: string;
  /** Display price, USD. */
  price: number;
  interval: "week" | "month" | "year" | null;
  /** Stripe Price ID — null for the free plan. */
  stripePriceId: string | null;
  /** Stripe Payment Link URL (dashboard-created). Used until API checkout lands. */
  paymentLink: string | null;
  /** Marketing bullet points. */
  features: string[];
}

/** Free-tier limits. Adjust here as the only place these numbers live. */
export const FREE_LIMITS = {
  /**
   * AI generations a free account gets per calendar month.
   *
   * This was 3 *a day*, which compounds to ~90 a month — three times what
   * ReceiptBaker's cheapest paying customer gets for $8.75. A daily allowance is
   * not a trial, it is a free product. Monthly is the window the limiter and the
   * account page both read, via startOfUsageMonth() in lib/usage.ts.
   */
  aiGenerationsPerMonth: 3,
  // There is no free watermark-free download any more (owner decision,
  // 2026-10-24): every non-Pro export carries the watermark, logged in or not.
  // The old free-download allowance and its phrase helpers are gone on
  // purpose; copy names the $3 pass instead, via formatPlanPrice(PLANS.pro_weekly).
} as const;

/**
 * Fonts a free account can choose from, out of the 32 in the builder.
 *
 * A gate on *switching*, not on rendering: brand templates carry their own
 * `fontFamily`, and forcing a free user's Starbucks receipt onto a different
 * face would break the one thing the brand pages exist to provide.
 */
export const FREE_FONTS = ["mono", "sans", "courier"] as const;

/** Paper style a free account is limited to. Same rule — the template's own
 *  style still renders; this only limits manual switching. */
export const FREE_PAPER_STYLE = "thermal" as const;

/**
 * "3 AI receipt generations a month" / "1 AI receipt generation a month".
 *
 * The allowance was 3 *a day* until it became 3 a month, and pages went on
 * saying "a day" long afterwards — lib/comparisons.ts was still claiming it in
 * September, on a page whose whole purpose is being believed about what
 * competitors offer.
 */
export function freeAiPhrase(): string {
  const n = FREE_LIMITS.aiGenerationsPerMonth;
  return `${n} AI receipt generation${n === 1 ? "" : "s"} a month`;
}

/** "3 fonts · 1 paper style" — counted, not typed out. */
export function freeStylingPhrase(): string {
  const f = FREE_FONTS.length;
  return `${f} font${f === 1 ? "" : "s"} · 1 paper style`;
}

/**
 * The three Pro prices, named once.
 *
 * Extracted out of PLANS because two of the yearly plan's own selling points
 * are arithmetic on the other two — "save ~49%" and "$4.08/mo" are the yearly
 * price measured against the monthly one — and a bullet point that has to be
 * recomputed by hand when a price moves is a bullet point that will be wrong.
 * It already had been: /pricing advertised $39 a year after the price became
 * $49.
 */
const PRICE = { weekly: 3, monthly: 7.99, yearly: 49 } as const;

/** What the yearly plan works out to per month, e.g. 4.08. */
export function yearlyMonthlyEquivalent(): number {
  return PRICE.yearly / 12;
}

/** How much cheaper a year of yearly is than a year of monthly, in whole %. */
export function annualSavingsPercent(): number {
  return Math.round((1 - PRICE.yearly / (PRICE.monthly * 12)) * 100);
}

/**
 * A price as it is written on the page: "$3", "$7.99", "$49".
 *
 * Trailing ".00" is dropped, because "$49.00/year" next to "$7.99/month" reads
 * as a precision the yearly price does not have.
 */
export function formatPlanPrice(plan: Plan): string {
  return plan.price % 1 === 0 ? `$${plan.price}` : `$${plan.price.toFixed(2)}`;
}

/**
 * What a plan costs per month, so three intervals can be compared on one scale.
 *
 * /pricing listed $3, $7.99 and $39 side by side, which reads as a rising ladder
 * — the cheapest *number* on the page was also the worst value, at $13/mo
 * equivalent. Derived rather than written out so the comparison cannot go stale
 * when a price changes.
 *
 * 52/12 weeks per month rather than 4, which would understate the weekly pass
 * by about 8%.
 */
export function monthlyEquivalent(plan: Plan): number | null {
  switch (plan.interval) {
    case "week":
      return (plan.price * 52) / 12;
    case "month":
      return plan.price;
    case "year":
      return plan.price / 12;
    default:
      return null;
  }
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    interval: null,
    stripePriceId: null,
    paymentLink: null,
    features: [
      "All receipt templates & brands",
      "Live preview",
      "Watermarked PDF & PNG downloads, no account needed",
      // Derived rather than typed: the AI allowance went from 3 a day to 3 a
      // month once and half the site kept quoting the old number.
      `${freeAiPhrase()} with a free account`,
      freeStylingPhrase(),
    ],
  },
  pro_weekly: {
    id: "pro_weekly",
    name: "Pro Weekly",
    price: PRICE.weekly,
    interval: "week",
    stripePriceId: process.env.STRIPE_PRICE_PRO_WEEKLY ?? null,
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_LINK_WEEKLY ?? null,
    features: [
      "Watermark-free downloads",
      "HD exports",
      "Unlimited AI receipt generation",
      "Saved receipt history",
      "Priority support",
      "7 days of full Pro access",
    ],
  },
  pro_monthly: {
    id: "pro_monthly",
    name: "Pro Monthly",
    price: PRICE.monthly,
    interval: "month",
    stripePriceId: process.env.STRIPE_PRICE_PRO_MONTHLY ?? null,
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_LINK_MONTHLY ?? null,
    features: [
      "Watermark-free downloads",
      "Everything in Free",
      "HD exports",
      "Unlimited AI receipt generation",
      "Saved receipt history",
      "Priority support",
    ],
  },
  pro_yearly: {
    id: "pro_yearly",
    name: "Pro Yearly",
    price: PRICE.yearly,
    interval: "year",
    stripePriceId: process.env.STRIPE_PRICE_PRO_YEARLY ?? null,
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_LINK_YEARLY ?? null,
    features: [
      "Everything in Pro Monthly",
      // Both derived: these are the monthly price and the yearly price doing
      // arithmetic on each other, and a hand-typed "~49%" survives exactly one
      // price change before it is a false advertising claim on the page whose
      // entire job is comparing the two.
      `Save ~${annualSavingsPercent()}% vs monthly`,
      `Just $${yearlyMonthlyEquivalent().toFixed(2)}/mo, billed yearly`,
    ],
  },
};

/** The three plans a buyer can pay for — everything in PLANS except free. */
export type PaidPlanId = Exclude<PlanId, "free">;

export function isPaidPlan(value: unknown): value is PaidPlanId {
  return value === "pro_weekly" || value === "pro_monthly" || value === "pro_yearly";
}

/**
 * What buying `target` means for someone currently on `current`.
 *
 * Passes are prepaid, so the rules are about time, never about refunds:
 *  - new       — not on Pro: an ordinary purchase.
 *  - extend    — same plan: another period, added after the current one.
 *  - upgrade   — a longer plan: they are on it from now, and every unused day
 *                of the pass they hold is carried over on top.
 *  - downgrade — a shorter plan while a longer one is still running. Not sold:
 *                it would buy nothing they don't already have. Any plan is
 *                open again once the current pass ends.
 *
 * Upgrade and extend are the same arithmetic — the new period is added to the
 * end of whatever is left (passEndsAt) — so nobody loses a day they paid for,
 * and the newest pass, being the one that ends last, is the plan shown.
 */
export type PlanChange = "new" | "extend" | "upgrade" | "downgrade";

const PLAN_RANK: Record<PaidPlanId, number> = { pro_weekly: 1, pro_monthly: 2, pro_yearly: 3 };

export function planChange(current: string | null | undefined, target: PaidPlanId): PlanChange {
  if (!isPaidPlan(current)) return "new";
  const diff = PLAN_RANK[target] - PLAN_RANK[current];
  return diff === 0 ? "extend" : diff > 0 ? "upgrade" : "downgrade";
}

/**
 * When a pass bought now runs out.
 *
 * `from` is the later of now and the end of any pass the buyer already holds,
 * so buying a second week on day three adds a week rather than overlapping the
 * one they paid for.
 */
export function passEndsAt(plan: PaidPlanId, from: Date): Date {
  const end = new Date(from);
  switch (PLANS[plan].interval) {
    case "week":
      end.setDate(end.getDate() + 7);
      break;
    case "month":
      end.setMonth(end.getMonth() + 1);
      break;
    case "year":
      end.setFullYear(end.getFullYear() + 1);
      break;
  }
  return end;
}

/** A user is "Pro" when they hold any active, non-free subscription. */
export function isProStatus(status: string | null | undefined): boolean {
  return status === "active" || status === "trialing";
}

/**
 * Statuses that can still entitle the holder, given an unexpired period.
 *
 * `canceled` belongs here, and that is the whole point. Nothing on this product
 * auto-renews: every plan is a pass bought for a period. A row is marked
 * cancelled so the buyer can see for themselves that they will not be charged
 * again — it is a trust signal about *billing*, not a revocation of *access*.
 *
 * Treating it as a revocation is what the code did, and it cost a real
 * customer: someone bought a month on 2026-08-28 running to 2026-09-28, the row
 * was marked cancelled the same day so no charge could recur, and they lost
 * three weeks of the month they had paid for. Silently — the account page had
 * no state for it and simply showed them as Free.
 *
 * This is the same rule Stripe applies to `cancel_at_period_end`: cancelling
 * stops the next charge and nothing else.
 */
export function canEntitle(status: string | null | undefined): boolean {
  return isProStatus(status) || status === "canceled";
}

/**
 * Whether a subscription row still entitles the holder to Pro *right now*.
 *
 * Status alone is not enough: on a Shopify-only rail every customer is a manual
 * grant that stays `status: "active"` forever, so a $3 weekly pass used to buy
 * Pro for life. The period end is what makes a grant expire, so every
 * server-side entitlement check must go through here rather than isProStatus.
 *
 * A row with no period end never expires — Stripe rows can legitimately land
 * without one, and locking out a real payer is worse than a rare open-ended
 * grant. Manual grants always set it.
 */
export function isProEntitled(
  status: string | null | undefined,
  currentPeriodEnd: string | null | undefined
): boolean {
  if (!canEntitle(status)) return false;

  // true / false when there is a usable date, null when there is not — an
  // absent date and an unparseable one are the same thing here: we cannot say
  // when this ends.
  const unexpired = (() => {
    if (!currentPeriodEnd) return null;
    const endsAt = new Date(currentPeriodEnd).getTime();
    return Number.isNaN(endsAt) ? null : endsAt > Date.now();
  })();

  // A cancelled pass entitles only while the period it paid for is still
  // running, and only when we can actually see that period. No end date on a
  // cancelled row means the thing ended at an unknown time — the one case where
  // refusing is right, since granting would make cancellation meaningless.
  if (!isProStatus(status)) return unexpired === true;

  // An active row with no period end never expires. Stripe rows can legitimately
  // land without one, and locking out a real payer is worse than a rare
  // open-ended grant. Manual grants always set it.
  return unexpired === null || unexpired;
}
