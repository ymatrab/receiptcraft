"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

/**
 * Fires `login` / `sign_up` for the flows that finish on the server.
 *
 * Password auth resolves in the browser, so LoginForm fires directly. Google and
 * email-confirmation links resolve in app/auth/callback/route.ts, which has no
 * client to fire from — so it marks its redirect with `ev` and `ev_method`, and
 * this reads them off the destination.
 *
 * Two things were wrong before this existed. A Google sign-up fired no `sign_up`
 * at all, so an entire acquisition channel produced accounts that never appeared
 * in the funnel. And `login` was fired at the click for Google but at the
 * session for a password, so it counted people who abandoned at Google's account
 * chooser and the two methods could not be compared. Both now fire once, from
 * the same place, only on a real session.
 *
 * Lives in the root layout because `next` can be any page. Reads
 * window.location rather than useSearchParams: the hook would put every page on
 * the site inside a Suspense boundary.
 */
export default function AuthEventBeacon() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const ev = url.searchParams.get("ev");
    if (ev !== "signup" && ev !== "login") return;

    const method = url.searchParams.get("ev_method") === "google" ? "google" : "email";
    if (ev === "signup") analytics.signUp(method);
    else analytics.signIn(method);

    // Drop the flags so a refresh, a back navigation or a shared link cannot
    // record a second account that never happened.
    url.searchParams.delete("ev");
    url.searchParams.delete("ev_method");
    window.history.replaceState({}, "", url.toString());
  }, []);

  return null;
}
