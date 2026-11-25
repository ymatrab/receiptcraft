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
const PROBLEMS: Record<string, string> = {
  unavailable: "Billing isn't reachable right now.",
  none: "There's no self-serve subscription on this account — your Pro access is a pass that runs for a fixed period.",
  failed: "We couldn't make that change just now.",
  switch_declined: "Your card was declined, so your plan was not changed.",
};

/** Plan changes that went through — said in green, and briefly. */
const DONE: Record<string, string> = {
  cancelled: "Renewal cancelled. You keep Pro until the end of the period you paid for, and you won't be charged again.",
  resumed: "Renewal is back on. Your plan continues as before.",
  switched: "Plan switched. The unused part of your old plan was credited.",
};

export default function BillingNotice() {
  const [reason, setReason] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const value = url.searchParams.get("billing");
    if (!value || !(value in PROBLEMS || value in DONE || value === "cancel_failed")) return;
    setReason(value);
    // Drop the flag so a refresh doesn't re-show a resolved problem.
    url.searchParams.delete("billing");
    window.history.replaceState({}, "", url.toString());
  }, []);

  if (!reason) return null;

  if (reason in DONE) {
    return (
      <p role="status" className="mt-6 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-900">
        {DONE[reason]}
      </p>
    );
  }

  // The one failure that must never turn into a charge: the member asked to
  // stop and Stripe refused. The owner has been alerted to cancel it by hand.
  if (reason === "cancel_failed") {
    return (
      <p role="alert" className="mt-6 rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-900">
        <strong className="font-semibold">We couldn&apos;t cancel online just now, so we&apos;ll do it for you.</strong>{" "}
        Our team has been told and will cancel it today — you won&apos;t be charged again. Questions?{" "}
        <a href={`mailto:${SITE.email}`} className="font-medium underline">
          {SITE.email}
        </a>
      </p>
    );
  }

  return (
    <p role="alert" className="mt-6 rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-900">
      <strong className="font-semibold">{PROBLEMS[reason]}</strong> Nothing has changed on your
      account. Email{" "}
      <a href={`mailto:${SITE.email}`} className="font-medium underline">
        {SITE.email}
      </a>{" "}
      and we&apos;ll sort it within one business day.
    </p>
  );
}
