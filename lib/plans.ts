/**
 * Subscription plan + entitlement config. Single source of truth for what a
 * free vs Pro user can do. The watermark (Phase 1), AI generator limits
 * (Phase 6) and admin views all read from here.
 *
 * Stripe price IDs are injected via env so the same code works in test and live.
 */

export type PlanId = "free" | "pro_monthly" | "pro_yearly";

export interface Plan {
  id: PlanId;
  name: string;
  /** Display price, USD. */
  price: number;
  interval: "month" | "year" | null;
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
      "PDF & PNG download (with watermark)",
      "3 AI receipt generations per day",
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
    price: 39,
    interval: "year",
    stripePriceId: process.env.STRIPE_PRICE_PRO_YEARLY ?? null,
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_LINK_YEARLY ?? null,
    features: [
      "Everything in Pro Monthly",
      "Save ~60% vs monthly",
      "2 months free",
    ],
  },
};

/** Free-tier limits. Adjust here as the only place these numbers live. */
export const FREE_LIMITS = {
  aiGenerationsPerDay: 3,
} as const;

/** A user is "Pro" when they hold any active, non-free subscription. */
export function isProStatus(status: string | null | undefined): boolean {
  return status === "active" || status === "trialing";
}
