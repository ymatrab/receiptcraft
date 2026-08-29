"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { FREE_LIMITS } from "@/lib/plans";

/**
 * Shown once at the top of /pricing, immediately after a new account is created.
 *
 * Sign-up sends people here when nothing was waiting for them — see
 * NEW_ACCOUNT_DESTINATION in app/login/LoginForm.tsx. A gated sign-up (the
 * download wall, a stashed AI prompt) never reaches this page; it goes back to
 * finish the job, with the welcome sheet.
 *
 * Why a banner and not the welcome sheet: the sheet is a modal, and a modal
 * covering the price table is the opposite of showing someone the plans. It
 * fires on `welcome=1`; this reads `new=1`, so the two can never both appear.
 *
 * The free account is named first, and the "start making receipts" link is a
 * real way out. Landing a fresh sign-up on a price list is otherwise the
 * bait-and-switch the welcome sheet was written to avoid: they joined on the
 * promise of a free account and have not yet hit a watermark or a limit, so
 * being sold to before being thanked is how you lose them at the exact point
 * they have already said yes.
 *
 * Read from window.location rather than useSearchParams, the same as
 * WelcomeSheet: taking searchParams on the page would make /pricing dynamic and
 * undo 1990d75, which stopped it hitting the database on every view.
 */
export default function NewAccountBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("new") !== "1") return;
    setShow(true);
    analytics.newAccountPricingShown();
    // Drop the flag so a refresh, a back navigation or a shared link cannot
    // show this to someone who did not just sign up.
    url.searchParams.delete("new");
    window.history.replaceState({}, "", url.toString());
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      className="mb-10 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-7"
    >
      <h2 className="text-lg font-bold text-emerald-950 sm:text-xl">
        You&apos;re in — your free account is ready
      </h2>

      <p className="mt-2 text-sm text-emerald-900">It already includes:</p>
      <ul className="mt-3 grid gap-2 text-sm text-emerald-900 sm:grid-cols-3">
        <Item>
          <strong>{FREE_LIMITS.aiGenerationsPerDay} AI generations</strong> a day
        </Item>
        <Item>
          <strong>{FREE_LIMITS.freeReceiptDownloads} watermark-free</strong> HD downloads
        </Item>
        <Item>Every template, and your saved receipts</Item>
      </ul>

      <div className="mt-5 flex flex-col gap-3 border-t border-emerald-200/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-emerald-900">
          Want no watermark at all and unlimited AI? The plans are below.
        </p>
        <Link
          href="/create"
          onClick={() => analytics.upgradeClick("new_account_pricing_skip")}
          className="shrink-0 rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-300 transition-colors hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          Skip — start making receipts
        </Link>
      </div>
    </div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span aria-hidden className="mt-0.5 font-bold text-emerald-600">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}
