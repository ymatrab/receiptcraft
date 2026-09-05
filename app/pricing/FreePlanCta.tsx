"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { DEFAULT_NEXT, safeInternalPath } from "@/lib/new-account";

/**
 * The Free plan's button on /pricing.
 *
 * A client component for two reasons, neither cosmetic:
 *
 * 1. **It has to be counted.** The three Pro buttons fire `begin_checkout`;
 *    this one fired nothing, so choosing the free plan left no trace at all.
 *    With every new account now landing on /pricing, "saw the plans and picked
 *    free" is half of what that page does, and it was the half we could not
 *    see. `new_account_pricing_shown` minus `begin_checkout` was the only
 *    estimate available, and it silently counted everyone who closed the tab.
 *
 * 2. **It has to know where the person came from.** A sign-up that started at a
 *    gate carries its origin in `next`; sending them to the builder instead
 *    would drop them a step away from the download or the AI prompt they were
 *    already committed to.
 *
 * Reads window.location rather than useSearchParams, the same as
 * NewAccountBanner — taking searchParams on the page would make /pricing
 * dynamic and undo 1990d75, which stopped it hitting the database on every view.
 */
export default function FreePlanCta({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const [href, setHref] = useState(DEFAULT_NEXT);

  useEffect(() => {
    const next = new URL(window.location.href).searchParams.get("next");
    // Sanitised: `next` is attacker-controllable query text and this is a link.
    setHref(safeInternalPath(next) ?? DEFAULT_NEXT);
  }, []);

  return (
    <Link href={href} onClick={() => analytics.selectFreePlan(href)} className={className}>
      {label}
    </Link>
  );
}
