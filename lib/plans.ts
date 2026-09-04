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
  /**
   * Watermark-free receipt downloads a logged-in free account gets before
   * downloads fall back to watermarked. Counted per unique receipt (re-downloads
   * and multiple formats of the same receipt don't consume extra credits).
   *
   * Was 3, which is more than any competitor gives away and close enough to the
   * $3 pass that a one-off buyer had no reason to reach the paid ladder at all.
   */
  freeReceiptDownloads: 1,
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
 * "1 watermark-free download" / "3 watermark-free downloads".
 *
 * The number appears in about thirty places across the site and the surrounding
 * grammar changes with it. Centralised so a future change to FREE_LIMITS cannot
 * leave half the site saying "your first 1 downloads".
 */
export function freeDownloadsPhrase(noun = "download"): string {
  const n = FREE_LIMITS.freeReceiptDownloads;
  return n === 1 ? `1 ${noun}` : `${n} ${noun}s`;
}

/**
 * Just the noun, pluralised to agree with the allowance: "watermark-free
 * download" / "watermark-free downloads".
 *
 * For the places that render the number separately — /pricing bolds the
 * quantity and sets the noun beside it — where freeDownloadsPhrase would
 * supply the number twice, or (as it did) leave a hardcoded plural next to a
 * singular count: the live page read "1 watermark-free downloads".
 */
export function freeDownloadsNoun(noun = "download"): string {
  return FREE_LIMITS.freeReceiptDownloads === 1 ? noun : `${noun}s`;
}

/**
 * The same count for the "your first …" construction, where the number is
 * implicit when it is one.
 *
 * "your first download" / "your first 3 downloads" — never "your first 1
 * download", which is what freeDownloadsPhrase produces there and what shipped
 * to /create and /pricing before anyone read the rendered sentence.
 */
export function firstDownloadsPhrase(noun = "download"): string {
  const n = FREE_LIMITS.freeReceiptDownloads;
  return n === 1 ? noun : `${n} ${noun}s`;
}

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
      // Written out by the helpers below rather than typed as literals. Every
      // one of these sentences was wrong at some point after a limit changed:
      // the AI allowance went from 3 a day to 3 a month and the download
      // allowance from 3 to 1, and each time a handful of places on the site
      // kept quoting the old number. A features array is exactly the kind of
      // copy nobody re-reads.
      `${freeDownloadsPhrase("free HD receipt download")}, then watermarked`,
      freeAiPhrase(),
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
      "No watermark",
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
      "Everything in Free",
      "No watermark",
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

/** A user is "Pro" when they hold any active, non-free subscription. */
export function isProStatus(status: string | null | undefined): boolean {
  return status === "active" || status === "trialing";
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
  if (!isProStatus(status)) return false;
  if (!currentPeriodEnd) return true;
  const endsAt = new Date(currentPeriodEnd).getTime();
  // An unparseable date is treated as non-expiring, matching the null case.
  return Number.isNaN(endsAt) || endsAt > Date.now();
}
