import Stripe from "stripe";

/** True once a Stripe secret key is configured. */
export const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

let cached: Stripe | null = null;

/**
 * Lazily constructs the server-side Stripe client. Lazy so the build never
 * instantiates Stripe without a key (which would throw). Never import the
 * resulting client into a Client Component — the secret key stays on the server.
 */
export function getStripe(): Stripe {
  if (!cached) {
    cached = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      // Pin the API version so dashboard upgrades never silently change behavior.
      apiVersion: "2026-05-27.dahlia",
      typescript: true,
    });
  }
  return cached;
}

/** Map a Stripe price id back to our internal plan id. */
export function planFromPriceId(priceId: string | null | undefined): string | null {
  if (!priceId) return null;
  if (priceId === process.env.STRIPE_PRICE_PRO_WEEKLY) return "pro_weekly";
  if (priceId === process.env.STRIPE_PRICE_PRO_MONTHLY) return "pro_monthly";
  if (priceId === process.env.STRIPE_PRICE_PRO_YEARLY) return "pro_yearly";
  return null;
}
