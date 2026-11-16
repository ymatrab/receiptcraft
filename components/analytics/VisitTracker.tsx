"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordSellReached, recordVisit } from "@/lib/analytics";

/**
 * Records one `visit` per session — the "visits" line on the admin dashboard
 * and the step between a search click and everything after it.
 *
 * Lives in the root layout so every landing page counts, blog posts included.
 * Re-checked on each navigation because a session can end mid-tab (30 minutes
 * idle); recordVisit itself makes every other call in the same session a no-op.
 *
 * Also records `sell_reached`, once per session, when a navigation reaches a
 * sell page other than the landing page — the hand-off the landings metric
 * measures (lib/landing-paths.ts).
 */
export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordVisit(pathname);
    recordSellReached(pathname);
  }, [pathname]);

  return null;
}
