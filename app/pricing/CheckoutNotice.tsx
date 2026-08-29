"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * Shown when /api/checkout sent someone back here because no payment link is
 * configured for the plan they picked, or the one saved in the admin panel is
 * malformed.
 *
 * This replaces the inline error PricingCta used to render. The check now
 * happens on the server, at click time, so the message has to survive a
 * redirect — and it must not cost the page its static rendering to do it.
 *
 * Read from window.location rather than useSearchParams, the same as
 * NewAccountBanner: taking searchParams on the page would make /pricing dynamic
 * again, which is exactly what this page spent two commits getting away from.
 */
export default function CheckoutNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("checkout") !== "unavailable") return;
    setShow(true);
    // Drop the flag so a refresh or a shared link doesn't show this to someone
    // who never hit the problem.
    url.searchParams.delete("checkout");
    window.history.replaceState({}, "", url.toString());
  }, []);

  if (!show) return null;

  return (
    <p role="alert" className="mb-10 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-800">
      <strong className="font-semibold">Checkout isn&apos;t available right now.</strong>{" "}
      Nothing was charged. Email{" "}
      <a href={`mailto:${SITE.email}`} className="font-medium underline">
        {SITE.email}
      </a>{" "}
      and we&apos;ll get you set up by hand — usually within one business day.
    </p>
  );
}
