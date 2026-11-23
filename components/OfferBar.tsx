"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { useConsent } from "@/lib/consent";

/**
 * A slim offer bar at the bottom of blog posts and receipt-help guides.
 *
 * WHY A BAR AND NOT A POPUP
 *
 * The owner asked for a timed popup. These pages live on search traffic, and
 * Google demotes mobile pages that cover their content with an interstitial.
 * A bar this size covers nothing the visitor is reading, so it gets the same
 * second chance at the offer without that risk.
 *
 * WHEN IT SHOWS (all must hold)
 *   - the cookie choice is made (the consent banner owns the bottom edge
 *     until then, the same rule the chat launcher follows)
 *   - the visitor has scrolled 40% of the page: they are reading, not bouncing
 *   - no offer is already on screen: any [data-offer-cta] element (the
 *     in-article card, the closing banner) or the footer hides it
 *   - it has not been dismissed in this browser
 *
 * Dismissal is permanent for the browser and fails CLOSED, like ReviewPrompt:
 * if storage throws, we never show it, rather than showing it on every page
 * to exactly the visitors whose browser cannot remember the close.
 *
 * LAYOUT
 *
 * The chat launcher sits at bottom-5 right-5 (56px wide, z-50). Below `md` the
 * bar stops at right-24 so the two never overlap; from `md` it is centred and
 * narrow enough to clear the launcher. z-40 keeps it under the launcher, the
 * consent banner and every modal.
 */

const CLOSED_KEY = "mkc_offer_bar_closed";
const SHOW_AT_PERCENT = 40;

function alreadyClosed(): boolean {
  try {
    return localStorage.getItem(CLOSED_KEY) === "1";
  } catch {
    return true;
  }
}

export default function OfferBar({
  href,
  text,
  label,
  shortLabel,
  location,
  showAtPercent = SHOW_AT_PERCENT,
  phonesOnly = false,
}: {
  href: string;
  /** The question, shown from `md` up, beside the button. */
  text: string;
  /** Button text from `md` up. */
  label: string;
  /** The whole bar below `md`, where there is room for one short line. */
  shortLabel: string;
  /** "blog", "receipt_help" or "brand", for the events. */
  location: string;
  /**
   * How far down the page before it may show. Brand pages pass 0: there the
   * bar only has to wait for the hero button to scroll away, and that button
   * carries data-offer-cta.
   */
  showAtPercent?: number;
  /** Hide from lg up, where the page keeps its own button in view. */
  phonesOnly?: boolean;
}) {
  const consent = useConsent();
  const [closed, setClosed] = useState(true);
  const [deepEnough, setDeepEnough] = useState(false);
  const [offerOnScreen, setOfferOnScreen] = useState(false);
  // phonesOnly: wide enough that the bar is hidden. Tracked here, not left to
  // CSS alone, so a bar nobody can see never records offer_bar_shown.
  const [wide, setWide] = useState(false);
  const reported = useRef(false);

  useEffect(() => setClosed(alreadyClosed()), []);

  useEffect(() => {
    if (!phonesOnly) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [phonesOnly]);

  useEffect(() => {
    if (closed) return;
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 0) return;
      setDeepEnough((el.scrollTop / scrollable) * 100 >= showAtPercent);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [closed, showAtPercent]);

  useEffect(() => {
    if (closed || typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setOfferOnScreen(visible.size > 0);
    });
    document.querySelectorAll("[data-offer-cta], footer").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [closed]);

  const ready = consent === "granted" || consent === "denied";
  const show = ready && !closed && deepEnough && !offerOnScreen && !(phonesOnly && wide);

  useEffect(() => {
    if (show && !reported.current) {
      reported.current = true;
      analytics.offerBarShown(location);
    }
  }, [show, location]);

  if (!show) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(CLOSED_KEY, "1");
    } catch {
      /* storage unavailable — it still closes for this page view */
    }
    setClosed(true);
    analytics.offerBarDismissed(location);
  };

  return (
    <div
      role="complementary"
      aria-label="Receipt maker"
      data-nosnippet=""
      className={`fixed bottom-5 left-4 right-24 z-40 ${phonesOnly ? "lg:hidden" : ""} flex h-14 items-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-700 pl-5 pr-1.5 text-white shadow-xl md:left-1/2 md:right-auto md:w-max md:max-w-[36rem] md:-translate-x-1/2 md:gap-4 md:pl-6`}
    >
      {/* Below md: the bar is one link. */}
      <Link
        href={href}
        onClick={() => analytics.offerBarClick(location)}
        className="min-w-0 flex-1 truncate text-sm font-semibold md:hidden"
      >
        {shortLabel} <span aria-hidden="true">→</span>
      </Link>
      {/* From md: the question, then a button. */}
      <p className="hidden min-w-0 truncate text-sm font-medium md:block">{text}</p>
      <Link
        href={href}
        onClick={() => analytics.offerBarClick(location)}
        className="hidden shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 md:inline-block"
      >
        {label}
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg leading-none text-indigo-100 hover:bg-white/15 hover:text-white"
      >
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
}
