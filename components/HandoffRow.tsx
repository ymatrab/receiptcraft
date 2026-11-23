"use client";

import Link from "next/link";
import { analytics } from "@/lib/analytics";

/**
 * The receipt-help offer under the answer, on phones: one tappable row with a
 * small receipt picture, in place of a sentence with a link inside it.
 *
 * Nov 6–23, 2026: 636 phone sessions landed on receipt-help and 21% opened the
 * builder. 45 of the 136 who did never scrolled, so they used the line under
 * the answer, which on a phone was four lines of small grey text with an
 * inline link. The row keeps the same place and the same offer. The answer
 * still comes first (settled 2026-09-01); this only makes the offer a target.
 *
 * The picture is drawn, not a rendered receipt: a real one would put a sample
 * receipt's address and items into the text of ~1,400 guide pages. It uses
 * the brand's logo when its template has one and its initial otherwise.
 *
 * `data-offer-cta` keeps OfferBar down while the row is on screen.
 */
export default function HandoffRow({
  href,
  title,
  sub,
  brandName,
  logo,
  className = "",
}: {
  href: string;
  title: string;
  sub: string;
  brandName: string;
  /** The template's logo (a data URL), or "" for none. */
  logo: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-offer-cta=""
      onClick={() => analytics.handoffClick("receipt_help_row")}
      className={`flex items-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-2.5 pr-3 transition-colors hover:border-indigo-300 hover:bg-indigo-50 ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex h-16 w-[52px] shrink-0 flex-col items-center gap-[3px] overflow-hidden rounded-md bg-white px-1.5 pt-1.5 shadow"
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" className="h-3.5 w-auto max-w-[38px] object-contain" />
        ) : (
          // The letter comes from CSS, not a text node: as text it joined the
          // link's anchor text ("MMake a McDonald's-style receipt").
          <span
            data-initial={brandName.replace(/^The\s+/i, "").charAt(0).toUpperCase()}
            className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-800 text-[8px] font-bold leading-none text-white before:content-[attr(data-initial)]"
          />
        )}
        <span className="mt-0.5 h-[2px] w-8 rounded bg-slate-300" />
        <span className="h-[2px] w-6 rounded bg-slate-300" />
        <span className="mt-0.5 flex w-full justify-between"><span className="h-[2px] w-5 rounded bg-slate-300" /><span className="h-[2px] w-2 rounded bg-slate-300" /></span>
        <span className="flex w-full justify-between"><span className="h-[2px] w-6 rounded bg-slate-300" /><span className="h-[2px] w-2 rounded bg-slate-300" /></span>
        <span className="flex w-full justify-between"><span className="h-[2px] w-4 rounded bg-slate-300" /><span className="h-[2px] w-2 rounded bg-slate-300" /></span>
        <span className="w-full border-t border-dashed border-slate-300" />
        <span className="flex w-full justify-between"><span className="h-[3px] w-4 rounded bg-slate-500" /><span className="h-[3px] w-3 rounded bg-slate-500" /></span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold leading-snug text-slate-900">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug text-slate-600">{sub}</span>
      </span>
      <span aria-hidden="true" className="text-xl text-indigo-600">›</span>
    </Link>
  );
}
