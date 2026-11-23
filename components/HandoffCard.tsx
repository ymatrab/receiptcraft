"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { analytics } from "@/lib/analytics";

/**
 * The in-article offer on blog posts and receipt-help guides, as a card with a
 * real button.
 *
 * Until 2026-11-20 this offer was a sentence with a text link inside it. In the
 * week to 2026-11-19 the blog took 356 sessions and produced 13 builder opens
 * and no downloads; receipt-help took 688 and produced 100 opens. The only
 * button on either page type was the closing banner, below everything else.
 *
 * It sits after the first answer, not before it: these pages answer the query
 * first and offer the builder second (settled 2026-09-01, see the pages).
 *
 * `data-offer-cta` tells OfferBar that an offer is already on screen, so the
 * bar never shows on top of one.
 *
 * A client component only for the click event. It is still server-rendered, so
 * the link and its anchor text are in the HTML.
 */
export default function HandoffCard({
  heading,
  children,
  href,
  label,
  location,
}: {
  heading: string;
  /** The line under the heading. May hold a secondary text link. */
  children: ReactNode;
  href: string;
  /** Button text. Keep the sell page's keyword in it: it is the anchor text. */
  label: string;
  /** Where the card sits, for the click event: "blog_card", "receipt_help_card". */
  location: string;
}) {
  return (
    <aside
      data-offer-cta=""
      className="not-prose my-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 px-5 py-6 sm:px-6 sm:flex sm:items-center sm:justify-between sm:gap-6"
    >
      <div className="min-w-0">
        <p className="text-lg font-bold text-white">{heading}</p>
        <p className="mt-1 text-sm leading-relaxed text-indigo-100">{children}</p>
      </div>
      <Link
        href={href}
        onClick={() => analytics.handoffClick(location)}
        className="mt-4 inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full bg-white px-4 py-3 text-center sm:px-6 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50 sm:mt-0 sm:w-auto sm:max-w-[16rem]"
      >
        {label}
      </Link>
    </aside>
  );
}
