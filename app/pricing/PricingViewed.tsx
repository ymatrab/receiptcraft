"use client";

import { useEffect } from "react";
import { analytics, eventIdentity } from "@/lib/analytics";

/** Session that has already been counted as having seen the plans. */
const SEEN_KEY = "mkc_pricing_seen";

/**
 * Records that the plans were seen, once per session.
 *
 * /pricing had no event of its own in our own table. begin_checkout counted the
 * people who chose a plan and select_free_plan now counts those who chose Free,
 * but the largest group on the page — arrived, read it, chose nothing — could
 * only be estimated, and every estimate silently included people who never
 * reached the page at all. With every new account landing here since
 * 2026-09-01, that group is most of the sign-up funnel.
 *
 * Once per session, not per pageview: it is a denominator, and a denominator
 * that counts refreshes makes the conversion rate below it drift down on its
 * own. The session is the same 30-minute one every other event is stamped with
 * (lib/analytics.ts), so "sessions that saw pricing" divides cleanly into
 * "sessions that did anything else".
 *
 * Renders nothing. Reads window.location rather than useSearchParams, like
 * NewAccountBanner and FreePlanCta — taking searchParams on the page itself
 * would make /pricing dynamic and undo the work that stopped it hitting the
 * database on every view.
 */
export default function PricingViewed() {
  useEffect(() => {
    const { session_id } = eventIdentity();
    try {
      if (localStorage.getItem(SEEN_KEY) === session_id) return;
      localStorage.setItem(SEEN_KEY, session_id);
    } catch {
      // Storage blocked (private mode). Fire anyway and accept the duplicate:
      // an over-count in a browser that cannot be tracked at all is a smaller
      // error than dropping the whole cohort from the denominator.
    }

    // How they got here, because the answer changes what the page is for. A
    // brand-new account was *sent* here and is being sold to; someone arriving
    // from search chose to look at prices. Averaging the two hides both.
    const params = new URL(window.location.href).searchParams;
    const source = params.get("new") === "1" ? "new_account" : internalReferrer() ? "internal" : "external";

    analytics.pricingViewed(source);
  }, []);

  return null;
}

/** Did this view come from elsewhere on our own site? */
function internalReferrer(): boolean {
  try {
    return Boolean(document.referrer) && new URL(document.referrer).origin === window.location.origin;
  } catch {
    return false;
  }
}
