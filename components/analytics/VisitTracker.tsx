"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { recordVisit } from "@/lib/analytics";

/**
 * Records one `visit` per session — the "visits" line on the admin dashboard
 * and the step between a search click and everything after it.
 *
 * Lives in the root layout so every landing page counts, blog posts included.
 * Re-checked on each navigation because a session can end mid-tab (30 minutes
 * idle); recordVisit itself makes every other call in the same session a no-op.
 */
export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    recordVisit(pathname);
  }, [pathname]);

  return null;
}
