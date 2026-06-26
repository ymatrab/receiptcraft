"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

/**
 * Fires a `scroll_depth` event once per threshold (25/50/75/100%) per page.
 * Resets on route change. GA4 enhanced measurement also tracks a coarse 90%
 * scroll; this adds the finer breakpoints for funnel analysis.
 */
export default function ScrollDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const fired = new Set<number>();
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 0) return;
      const pct = (el.scrollTop / scrollable) * 100;
      for (const t of THRESHOLDS) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          analytics.scrollDepth(t);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
