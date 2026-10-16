import Stripe from "stripe";

/** True once a Stripe secret key is configured. */
export const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

/**
 * True once a Stripe *test* key is configured.
 *
 * Admin-only test mode: with STRIPE_TEST_SECRET_KEY set, an admin's buy button
 * opens a sandbox Checkout (card 4242 4242 4242 4242) on the live site, while
 * every other visitor keeps the normal rail. It lets the owner rehearse a
 * purchase end to end on the real domain — previews cannot, because login and
 * the return from Checkout both land on www. Remove the variable when done.
 */
export const stripeTestConfigured = Boolean(process.env.STRIPE_TEST_SECRET_KEY);

const cached: { live?: Stripe; test?: Stripe } = {};

/**
 * Lazily constructs the server-side Stripe client. Lazy so the build never
 * instantiates Stripe without a key (which would throw). Never import the
 * resulting client into a Client Component — the secret key stays on the server.
 */
export function getStripe(mode: "live" | "test" = "live"): Stripe {
  if (!cached[mode]) {
    const key = mode === "test" ? process.env.STRIPE_TEST_SECRET_KEY : process.env.STRIPE_SECRET_KEY;
    cached[mode] = new Stripe(key!, {
      // Pin the API version so dashboard upgrades never silently change behavior.
      apiVersion: "2026-05-27.dahlia",
      typescript: true,
    });
  }
  return cached[mode]!;
}

/** Which client can read a Checkout Session, from its id (`cs_test_…` / `cs_live_…`). */
export function stripeModeForSession(sessionId: string): "live" | "test" {
  return sessionId.startsWith("cs_test_") ? "test" : "live";
}

/** Map a Stripe price id back to our internal plan id. */
export function planFromPriceId(priceId: string | null | undefined): string | null {
  if (!priceId) return null;
  if (priceId === process.env.STRIPE_PRICE_PRO_WEEKLY) return "pro_weekly";
  if (priceId === process.env.STRIPE_PRICE_PRO_MONTHLY) return "pro_monthly";
  if (priceId === process.env.STRIPE_PRICE_PRO_YEARLY) return "pro_yearly";
  return null;
}
