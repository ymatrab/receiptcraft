/**
 * Where a brand-new account lands after sign-up or email verification.
 *
 * Every new account now goes to the plans. Until this change, only someone with
 * nowhere to return to saw them: a sign-up that started at a gate (the download
 * wall, a stashed AI prompt) went back to /create with the welcome sheet
 * instead, on the reasoning that finishing the job beats being sold to. The
 * owner's call on 2026-09-01 is that everyone sees the plans first.
 *
 * `next` is carried along so the banner on /pricing can still offer a real way
 * back to whatever the person was doing — being shown the price list should not
 * cost them the receipt they were halfway through.
 *
 * Shared because three places have to agree on it: the password sign-up in
 * app/login/LoginForm.tsx, the email/Google route in app/auth/callback, and the
 * banner that reads the result. When they disagreed, one path showed the plans
 * and another didn't, and nothing on the dashboard could tell you which.
 */

/** The plans, flagged so app/pricing/NewAccountBanner.tsx greets the new account. */
const NEW_ACCOUNT_PATH = "/pricing?new=1";

/** Where a sign-up returns to when it has no destination of its own. */
export const DEFAULT_NEXT = "/create";

/**
 * A redirect target we are willing to send someone to, or null.
 *
 * Only same-origin paths: `next` reaches us from the query string, so anything
 * that could name another host is an open redirect. "//evil.com" is a
 * protocol-relative URL and a backslash is treated as a slash by some parsers,
 * so both are refused along with anything not starting with a single "/".
 */
export function safeInternalPath(dest: string | null | undefined): string | null {
  if (!dest || typeof dest !== "string") return null;
  if (!dest.startsWith("/")) return null;
  if (dest.startsWith("//") || dest.startsWith("/\\")) return null;
  if (dest.includes("\\")) return null;
  return dest;
}

/**
 * Is this destination a purchase already in progress?
 *
 * app/api/checkout redirects a logged-out buyer to /login?next=/api/checkout,
 * so someone who clicked "Get Pro" and then made an account arrives here with
 * the checkout as their `next`. They have already seen the plans and picked
 * one; showing them the price list again would make them choose twice at the
 * highest-intent moment in the funnel, which is the opposite of what sending
 * new accounts to pricing is for.
 */
function isCheckoutBound(path: string): boolean {
  return path === "/api/checkout" || path.startsWith("/api/checkout?");
}

/**
 * The destination for a newly created account.
 *
 * A `next` worth returning to is appended; the default builder path is not,
 * since the banner already falls back to it and a redundant parameter in the
 * address bar of a brand-new user is just noise.
 */
export function newAccountDestination(next?: string | null): string {
  const safe = safeInternalPath(next);
  if (!safe) return NEW_ACCOUNT_PATH;
  // The one exemption: they are mid-purchase, so let them finish.
  if (isCheckoutBound(safe)) return safe;
  if (safe === DEFAULT_NEXT || safe === "/") return NEW_ACCOUNT_PATH;
  return `${NEW_ACCOUNT_PATH}&next=${encodeURIComponent(safe)}`;
}
