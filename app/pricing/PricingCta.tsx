"use client";

import { useState } from "react";
import { useAccount } from "@/lib/useAccount";
import { analytics } from "@/lib/analytics";
import { SpinnerIcon } from "@/components/Icons";

interface Props {
  planId: "pro_weekly" | "pro_monthly" | "pro_yearly";
  label: string;
  className?: string;
}

/**
 * Pricing button. An anchor, not a button, and that is the whole point.
 *
 * This used to wait on /api/me before it would do anything, which meant it
 * shipped `disabled` from the server and stayed inert for the half-second that
 * request took — on the one page where a dead control costs a sale. All of that
 * work now happens in app/api/checkout/route.ts, which resolves the account
 * server-side and redirects to the payment link with the user id attached. So
 * the href alone is sufficient: it works before hydration, and without it.
 *
 * The account is still read here, but only to relabel the button for someone
 * who already pays. If that read is slow or never lands, the link still points
 * at the checkout route, which sends a Pro user to /account anyway.
 */
export default function PricingCta({ planId, label, className }: Props) {
  const { account } = useAccount();
  // Set on click and never cleared: the browser is leaving the page. Navigating
  // to Stripe is not instant on a slow connection, and silence at the highest-
  // intent click in the funnel reads as a broken button and invites a second.
  const [busy, setBusy] = useState(false);

  const planLabel =
    planId === "pro_yearly" ? "yearly" : planId === "pro_weekly" ? "weekly" : "monthly";

  return (
    <a
      href={account.isPro ? "/account" : `/api/checkout?plan=${planId}`}
      onClick={() => {
        // "Manage subscription" once promised self-serve billing that does not
        // exist — a pass simply runs out — so a Pro click is a visit, not a
        // checkout, and must not be counted as one.
        if (!account.isPro) analytics.beginCheckout(planLabel, "pricing");
        setBusy(true);
      }}
      aria-busy={busy}
      className={`${className ?? ""} cursor-pointer transition-opacity`}
      data-plan={planId}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {busy && <SpinnerIcon className="h-4 w-4" />}
        {busy
          ? account.isPro
            ? "Opening your account…"
            : "Taking you to checkout…"
          : account.isPro
            ? "View your account"
            : label}
      </span>
    </a>
  );
}
