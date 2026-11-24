"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { analytics } from "@/lib/analytics";

const SideReceiptPreview = dynamic(() => import("./SideReceiptPreview"), { ssr: false });

/**
 * The receipt-help offer beside the article, on screens 1280px and wider.
 *
 * 2026-11-24. On desktop these guides are a 768px column with ~300px of empty
 * page either side. Nov 6–23: 732 desktop sessions landed on receipt-help, 207
 * opened the builder, and 272 of the 525 who didn't had scrolled. The bottom
 * OfferBar never reached them: some offer box was on screen at every depth, so
 * it stayed hidden (2 shows in 18 days). This card stays in view while they
 * read and covers nothing; the answer still comes first in the column.
 *
 * The whole card is server-rendered except the sample receipt, which
 * SideReceiptPreview fetches in the browser (see why there).
 */
export default function SideOfferCard({
  href,
  brandName,
  label,
  previewSlug,
  passPrice,
}: {
  /** The guide's hand-off: the brand page, or the page that owns its query. */
  href: string;
  brandName: string;
  /** Button text; keeps the hand-off's keyword, it is the anchor text. */
  label: string;
  /** The template whose sample receipt to show, or null for none. */
  previewSlug: string | null;
  passPrice: string;
}) {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const click = () => analytics.handoffClick("receipt_help_side");

  return (
    <aside
      data-nosnippet=""
      className="hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-900/5 xl:sticky xl:top-24 xl:block"
    >
      <p className="text-sm font-bold text-slate-900">Make one for your own records</p>
      <p className="mt-0.5 text-xs text-slate-500">Edit this {brandName} receipt</p>
      {previewSlug && (
        <div className="relative mt-3 flex max-h-[330px] justify-center overflow-hidden rounded-xl bg-gradient-to-b from-slate-100 to-slate-200 py-2.5">
          {wide && <SideReceiptPreview slug={previewSlug} />}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-200 to-transparent" />
          {/* The whole sample opens the hand-off. Empty and out of the tab
              order: the button below is the keyboard route. */}
          <Link
            href={href}
            tabIndex={-1}
            aria-label={label}
            onClick={click}
            className="absolute inset-0"
          />
        </div>
      )}
      <Link
        href={href}
        onClick={click}
        className="mt-3 flex min-h-11 items-center justify-center rounded-full bg-indigo-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-700"
      >
        {label} →
      </Link>
      <p className="mt-2 text-center text-xs text-slate-500">
        Free with a watermark · {passPrice} removes it
      </p>
    </aside>
  );
}
