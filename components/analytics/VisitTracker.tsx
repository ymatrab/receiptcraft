"use client";

import { useEffect } from "react";
import { recordVisit } from "@/lib/analytics";

/**
 * Records one `visit` per browser session — the "visits" line on the admin
 * dashboard and the step between a search click and everything after it.
 *
 * Lives in the root layout so every landing page counts, blog posts included.
 * Runs once on mount; recordVisit itself makes later pages in the same tab a
 * no-op. Reads window.location rather than usePathname so it never puts the
 * layout behind a Suspense boundary.
 */
export default function VisitTracker() {
  useEffect(() => {
    recordVisit(window.location.pathname);
  }, []);

  return null;
}
