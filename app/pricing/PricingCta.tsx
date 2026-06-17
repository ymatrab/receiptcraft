"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "@/lib/useAccount";

interface Props {
  planId: "pro_monthly" | "pro_yearly";
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
    url.searchParams.set("client_reference_id", account.userId!);
    window.location.href = url.toString();
  }

  return (
    <button type="button" onClick={handleClick} className={className} data-plan={planId}>
      {account.isPro ? "Manage subscription" : label}
    </button>
  );
}
