"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * Shown when the Stripe billing portal could not be opened.
 *
 * "Manage billing" is a form POST, and a form POST navigates — so when the
 * route answered a failure with `NextResponse.json({ error }, { status })`, the
 * customer's browser left the site and rendered `{"error":"no stripe
 * subscription"}` as a web page. That was the failure mode of the one button
 * only paying customers press.
 *
 * The route now redirects back here with a flag instead, and this says
 * something a person can act on.
 *
 * Reads window.location rather than useSearchParams, matching NewAccountBanner
 * and CheckoutNotice: the hook would force a Suspense boundary around the page.
 */
const REASONS: Record<string, string> = {
  unavailable: "Billing isn't reachable right now.",
  none: "There's no self-serve subscription on this account — your Pro access is a pass that runs for a fixed period.",
  failed: "We couldn't open the billing portal.",
};

export default function BillingNotice() {
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const value = url.searchParams.get("billing");
    if (!value || !(value in REASONS)) return;
    setReason(value);
    // Drop the flag so a refresh doesn't re-show a resolved problem.
    url.searchParams.delete("billing");
    window.history.replaceState({}, "", url.toString());
  }, []);

  if (!reason) return null;

  return (
    <p role="alert" className="mt-6 rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-900">
      <strong className="font-semibold">{REASONS[reason]}</strong> Nothing has changed on your
      account. Email{" "}
      <a href={`mailto:${SITE.email}`} className="font-medium underline">
        {SITE.email}
      </a>{" "}
      and we&apos;ll sort it within one business day.
    </p>
  );
}
