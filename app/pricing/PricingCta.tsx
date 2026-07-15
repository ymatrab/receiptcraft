"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "@/lib/useAccount";
import { analytics } from "@/lib/analytics";

interface Props {
  planId: "pro_weekly" | "pro_monthly" | "pro_yearly";
  paymentLink: string | null;
  label: string;
  className?: string;
}

/**
 * Pricing button. Requires login first (so the Stripe subscription maps to a
 * user), then forwards to the Stripe Payment Link with the user id as
 * client_reference_id and their email prefilled — the webhook uses these to
 * attach the subscription to the right account.
 */
export default function PricingCta({ planId, paymentLink, label, className }: Props) {
  const router = useRouter();
  const { account, loading } = useAccount();

  function handleClick() {
    if (loading) return;

    if (account.isPro) {
      router.push("/account");
      return;
    }

    if (!account.isLoggedIn) {
      router.push(`/login?next=${encodeURIComponent("/pricing")}`);
      return;
    }

    if (!paymentLink) {
      alert("Checkout isn't configured yet. Please add the Stripe payment link.");
      return;
    }

    const url = new URL(paymentLink);
    // Stripe links use client_reference_id to map the payment to the user via
    // webhook. Other providers (e.g. Shopify) are reconciled manually by email,
    // so we only add the param for Stripe to keep their URLs clean.
    if (url.hostname.includes("stripe.com")) {
      url.searchParams.set("client_reference_id", account.userId!);
    } else {
      // Manual flow: orders are matched to accounts by email, so prefill the
      // buyer's account email at checkout (Shopify cart permalinks support
      // checkout[email]) and remind them not to change it.
      if (account.email) {
        url.searchParams.set("checkout[email]", account.email);
      }
      const ok = window.confirm(
        `Please use the same email you're signed in with at checkout` +
          `${account.email ? ` — ${account.email}` : ""} — so we can activate your Pro account.\n\nContinue to checkout?`
      );
      if (!ok) return;
    }
    const planLabel = planId === "pro_yearly" ? "yearly" : planId === "pro_weekly" ? "weekly" : "monthly";
    analytics.beginCheckout(planLabel, "pricing");
    window.location.href = url.toString();
  }

  return (
    <button type="button" onClick={handleClick} className={className} data-plan={planId}>
      {account.isPro ? "Manage subscription" : label}
    </button>
  );
}
