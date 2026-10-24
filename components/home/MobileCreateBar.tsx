"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Phone-only sticky CTA for the homepage.
 *
 * The homepage is long, and on a phone the hero's "Create Your Receipt" button
 * is gone after the first swipe — every section below it ends in a link, but
 * none of them is the builder. This bar appears once the hero has scrolled out
 * of view and stays in thumb reach. Hidden from lg up, where the header's own
 * Create Receipt button is always visible.
 */
export default function MobileCreateBar({ watchId }: { watchId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target || typeof IntersectionObserver === "undefined") return;
    // Only once the CTA has gone off the TOP of the screen. On a short phone it
    // can start below the fold, and a bar duplicating it there is just noise.
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.bottom < 0),
      { threshold: 0 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pt-2 backdrop-blur-lg transition-transform duration-200 lg:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/create"
        tabIndex={show ? undefined : -1}
        className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-full bg-indigo-600 px-6 text-base font-semibold text-white shadow-lg shadow-indigo-600/25"
      >
        Create Your Receipt — Free
      </Link>
    </div>
  );
}
