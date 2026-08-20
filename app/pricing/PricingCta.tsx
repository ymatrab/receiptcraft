"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@/lib/useAccount";
import { analytics } from "@/lib/analytics";
import { SpinnerIcon } from "@/components/Icons";

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
  // Set from the click until the browser actually leaves the page. Navigating
  // to Stripe isn't instant on a slow connection, and this is the highest-intent
  // click in the funnel — silence here reads as a broken button and invites
  // double-clicks.
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (loading || busy) return;
    setError(null);

    if (account.isPro) {
      setBusy("Opening your account…");
      router.push("/account");
      return;
    }

    if (!account.isLoggedIn) {
      setBusy("Taking you to sign in…");
      router.push(`/login?next=${encodeURIComponent("/pricing")}`);
      return;
    }

    if (!paymentLink) {
      setError("Checkout isn't available right now. Please contact support and we'll get you sorted.");
      return;
    }

    const url = new URL(paymentLink);
    // Stripe links use client_reference_id to map the payment to the user via
    // webhook. Other providers (e.g. Shopify) are reconciled manually by email,
    // so we only add the param for Stripe to keep their URLs clean.
    if (url.hostname.includes("stripe.com")) {
      url.searchParams.set("client_reference_id", account.userId!);
    } else {
      // Shopify flow: carry the account id as a cart attribute so the
      // orders/paid webhook can match the order to an account exactly. Email is
      // only the fallback — it breaks the moment a buyer edits the address at
      // checkout, which is exactly when a grant would silently go missing.
      url.searchParams.set("attributes[user_id]", account.userId!);
      // Still prefill the email: it makes the fallback work and saves typing.
      // The "use the same email" instruction is shown statically on /pricing, so
      // a window.confirm() here was redundant — and it interrupted the
      // highest-intent moment in the funnel while running *before*
      // analytics.beginCheckout(), which made its drop-off invisible.
      if (account.email) {
        url.searchParams.set("checkout[email]", account.email);
      }
    }
    const planLabel = planId === "pro_yearly" ? "yearly" : planId === "pro_weekly" ? "weekly" : "monthly";
    analytics.beginCheckout(planLabel, "pricing");
    setBusy("Taking you to checkout…");
    window.location.href = url.toString();
  }

  // Disabled while the account state is still resolving: a button that looks
  // live but silently no-ops is worse than one that visibly isn't ready yet.
  const disabled = loading || busy !== null;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-busy={busy !== null}
        className={`${className ?? ""} cursor-pointer transition-opacity disabled:cursor-not-allowed disabled:opacity-60`}
        data-plan={planId}
      >
        <span className="inline-flex items-center justify-center gap-2">
          {busy && <SpinnerIcon className="h-4 w-4" />}
          {/* "Manage subscription" promised self-serve billing that doesn't
              exist — a pass just runs out. The destination is unchanged. */}
          {busy ?? (account.isPro ? "View your account" : label)}
        </span>
      </button>
      {error && (
        <p role="alert" className="mt-2 text-center text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </>
  );
}
