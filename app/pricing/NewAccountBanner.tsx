"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { DEFAULT_NEXT, safeInternalPath } from "@/lib/new-account";
import { FREE_LIMITS, freeDownloadsPhrase } from "@/lib/plans";

/**
 * Shown once at the top of /pricing, immediately after a new account is created.
 *
 * Every sign-up lands here now — see lib/new-account.ts. That includes one that
 * started at a gate (the download wall, a stashed AI prompt), so the way out
 * has to return to whatever was waiting rather than always to the builder: the
 * `next` parameter carries it, and the button below uses it.
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
  const [back, setBack] = useState(DEFAULT_NEXT);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("new") !== "1") return;
    setShow(true);
    // Sanitised, because `next` arrives in the query string and this becomes a
    // link — an unchecked value here is an open redirect off our own pricing
    // page.
    setBack(safeInternalPath(url.searchParams.get("next")) ?? DEFAULT_NEXT);
    analytics.newAccountPricingShown();
    // Drop `new` so a refresh, a back navigation or a shared link cannot show
    // this to someone who did not just sign up. `next` deliberately stays: the
    // Free plan button reads it too, and it mounts independently of this —
    // stripping it here would win that race often enough to send people to the
    // builder instead of back to what they were doing, at random.
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
          <strong>{FREE_LIMITS.aiGenerationsPerMonth} AI generations</strong> a month
        </Item>
        <Item>
          <strong>{freeDownloadsPhrase("watermark-free HD download")}</strong>
        </Item>
        <Item>Every template, and your saved receipts</Item>
      </ul>

      <div className="mt-5 flex flex-col gap-3 border-t border-emerald-200/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-emerald-900">
          Want no watermark at all and unlimited AI? The plans are below.
        </p>
        {/* Declining the plans is not an upgrade click. This fired
            upgrade_click{new_account_pricing_skip}, which put every new account
            that walked past the price list into the count of people who showed
            buying intent — inflating the one number that says whether pricing
            works. It has its own event now. */}
        <Link
          href={back}
          onClick={() => analytics.newAccountPricingSkip(back)}
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
