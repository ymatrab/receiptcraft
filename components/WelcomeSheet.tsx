"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { FREE_LIMITS, PLANS, freeDownloadsPhrase } from "@/lib/plans";

/**
 * Shown once, immediately after a new account is created *at a gate* — the
 * download wall, or a stashed AI prompt. Those signups have work waiting, so
 * they return to it and this sheet rides along.
 *
 * An ungated signup no longer reaches this: it lands on /pricing, which renders
 * app/pricing/NewAccountBanner.tsx instead. The reasoning below still governs
 * this surface, and shaped that one — the banner leads with the free account
 * and keeps a visible way out for the same reason.
 *
 * Deliberately not a price list. Someone who has just signed up did so because
 * we promised a free account, and has not yet made a receipt, hit the watermark
 * or run out of generations — so nothing about Pro means anything to them yet,
 * and a paywall in that slot reads as a bait-and-switch. It sits between "I did
 * what you asked" and "I get my thing", the highest drop-off point available.
 *
 * So this leads with what they actually unlocked, names Pro once as the next
 * step, and makes the primary button continue to whatever they came to do. The
 * moments that genuinely sell Pro are already built and fire on a real limit:
 * the watermark modal and the AI daily cap.
 *
 * Triggered by ?welcome=1.
 *
 * Nothing sets that flag today: since 2026-09-01 every new account is sent to
 * /pricing instead (lib/new-account.ts), so this sheet does not currently
 * appear and `welcome_shown` reads zero by design. It stays mounted so the
 * decision can be reversed in one line if the plans-first funnel converts worse.
 * Read from window.location rather than useSearchParams so mounting this in the
 * root layout does not force the whole tree into a client-side bailout.
 */
export default function WelcomeSheet() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("welcome") !== "1") return;
    setOpen(true);
    analytics.welcomeShown();
    // Strip the flag immediately so a refresh, a shared link or a back
    // navigation cannot show this a second time.
    url.searchParams.delete("welcome");
    window.history.replaceState({}, "", url.toString());
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={close}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="welcome-title" className="text-xl font-bold text-slate-900">
          You&apos;re in — here&apos;s what your free account gives you
        </h2>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <Item>
            <strong>{FREE_LIMITS.aiGenerationsPerMonth} AI receipt generations</strong> a month
          </Item>
          <Item>
            <strong>{freeDownloadsPhrase("watermark-free HD download")}</strong> — PDF,
            PNG or JPG
          </Item>
          <Item>Every template and brand layout, and your saved receipts</Item>
        </ul>

        <p className="mt-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
          Later, when you want no watermark at all and unlimited AI, Pro starts at $
          {PLANS.pro_weekly.price} a week.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/pricing"
            onClick={() => analytics.upgradeClick("welcome_sheet")}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            See plans
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="cursor-pointer rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Start making receipts
          </button>
        </div>
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
