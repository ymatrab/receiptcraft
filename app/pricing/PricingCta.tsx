"use client";

import { useState } from "react";
import { useAccount } from "@/lib/useAccount";
import { analytics } from "@/lib/analytics";
import { SpinnerIcon } from "@/components/Icons";
import { PLANS, planChange } from "@/lib/plans";

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
 * who already pays: extend the same plan, switch up to a longer one, or — for
 * a shorter plan while a longer pass runs — nothing to buy. The rules live in
 * planChange (lib/plans.ts), and /api/checkout enforces the same ones.
 */
export default function PricingCta({ planId, label, className }: Props) {
  const { account } = useAccount();
  // Set on click and never cleared: the browser is leaving the page. Navigating
  // to Stripe is not instant on a slow connection, and silence at the highest-
  // intent click in the funnel reads as a broken button and invites a second.
  const [busy, setBusy] = useState(false);

  const planLabel =
    planId === "pro_yearly" ? "yearly" : planId === "pro_weekly" ? "weekly" : "monthly";

  const change = account.isPro ? planChange(account.plan, planId) : "new";
  const name = PLANS[planId].name.replace("Pro ", "");

  // A shorter plan buys nothing while a longer pass is running. Said in place
  // of the button, so the card still reads as a plan rather than a dead link.
  if (change === "downgrade") {
    return (
      <span
        className={`${className ?? ""} cursor-default opacity-60`}
        data-plan={planId}
        aria-disabled="true"
      >
        Included in your plan
      </span>
    );
  }

  const memberLabel =
    change === "upgrade" ? `Switch to ${name}` : change === "extend" ? `Extend ${name}` : label;

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
        {busy ? "Taking you to checkout…" : memberLabel}
      </span>
    </a>
  );
}
