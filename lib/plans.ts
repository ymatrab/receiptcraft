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
      "1 free HD receipt download, then watermarked",
      "3 AI receipt generations a month",
      "3 fonts · 1 paper style",
    ],
  },
  pro_weekly: {
    id: "pro_weekly",
    name: "Pro Weekly",
    price: 3,
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
    price: 7.99,
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
    price: 49,
    interval: "year",
    stripePriceId: process.env.STRIPE_PRICE_PRO_YEARLY ?? null,
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_LINK_YEARLY ?? null,
    features: [
      "Everything in Pro Monthly",
      "Save ~49% vs monthly",
      "Just $4.08/mo, billed yearly",
    ],
  },
};

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
