"use client";

import { useEffect, useState } from "react";

/**
 * A date formatted in the *reader's* locale and timezone.
 *
 * `toLocaleDateString()` called inside a server component formats with the
 * server's locale and timezone — UTC on Vercel — not the visitor's. A receipt
 * saved at 10pm therefore displayed as the next day, and a Pro end date was off
 * by one for everyone west of UTC. It reads like a data bug and generates
 * support mail.
 *
 * The server renders an unambiguous UTC fallback so the markup is never empty
 * and no-JS readers still get a correct-if-blunt answer; the browser then
 * replaces it with the local rendering on mount. `suppressHydrationWarning`
 * because those two strings are legitimately different — that difference is the
 * entire point.
 */
export default function LocalDate({
  iso,
  withTime = false,
  className,
}: {
  /** ISO-8601 timestamp. */
  iso: string;
  /** Include the time as well as the date. */
  withTime?: boolean;
  className?: string;
}) {
  const date = new Date(iso);
  const valid = !Number.isNaN(date.getTime());

  // Explicitly UTC-labelled, so the pre-hydration text is never quietly wrong
  // about which day it means.
  const fallback = valid
    ? new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        ...(withTime ? { timeStyle: "short" } : {}),
        timeZone: "UTC",
      }).format(date)
    : "";

  const [text, setText] = useState(fallback);

  useEffect(() => {
    if (!valid) return;
    setText(
      new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        ...(withTime ? { timeStyle: "short" } : {}),
      }).format(date)
    );
    // `iso` is the real input; date is derived from it each render.
  }, [iso, withTime, valid]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!valid) return null;

  return (
    <time dateTime={iso} className={className} suppressHydrationWarning>
      {text}
    </time>
  );
}
