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
 * who already pays. A member can buy any plan again — the new pass starts when
 * their current one ends — so for them the button says exactly that.
 */
export default function PricingCta({ planId, label, className }: Props) {
  const { account } = useAccount();
  // Set on click and never cleared: the browser is leaving the page. Navigating
  // to Stripe is not instant on a slow connection, and silence at the highest-
  // intent click in the funnel reads as a broken button and invites a second.
  const [busy, setBusy] = useState(false);

  const planLabel =
    planId === "pro_yearly" ? "yearly" : planId === "pro_weekly" ? "weekly" : "monthly";

  // What a member's click adds, said plainly: passes stack, they don't swap.
  const extendLabel =
    planId === "pro_yearly" ? "Add a year" : planId === "pro_weekly" ? "Add a week" : "Add a month";

  return (
    <a
      href={`/api/checkout?plan=${planId}`}
      onClick={() => {
        analytics.beginCheckout(planLabel, "pricing");
        setBusy(true);
      }}
      aria-busy={busy}
      className={`${className ?? ""} cursor-pointer transition-opacity`}
      data-plan={planId}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {busy && <SpinnerIcon className="h-4 w-4" />}
        {busy ? "Taking you to checkout…" : account.isPro ? extendLabel : label}
      </span>
    </a>
  );
}
