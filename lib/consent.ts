"use client";

import { useEffect, useState } from "react";

export type Consent = "granted" | "denied" | "unset";

export const CONSENT_KEY = "rc_cookie_consent";

/**
 * Dispatched on the window when a choice is made, so components that are not
 * the banner can react without a provider. `storage` covers other tabs; it does
 * not fire in the tab that wrote the value, which is what this is for.
 */
const CONSENT_EVENT = "rc:consent";

export function readConsent(): Consent {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored === "granted" || stored === "denied" ? stored : "unset";
  } catch {
    // Private mode or storage disabled — treat as undecided rather than
    // silently granting.
    return "unset";
  }
}

export function writeConsent(value: "granted" | "denied"): void {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable — the in-memory state below still updates */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/**
 * The visitor's cookie choice. `null` until localStorage has been read on the
 * client, so nothing renders differently between the server HTML and the first
 * paint.
 *
 * Two components need this: the banner itself, and anything that would collide
 * with the banner while it is on screen. The chat launcher sits at
 * `bottom-5 right-5` and the banner at `inset-x-4 bottom-4`, both `z-50` — on a
 * 375px viewport that put roughly 36px of the 146px Decline button underneath
 * the launcher, across its full height, with paint order deciding which one got
 * the tap.
 */
export function useConsent(): Consent | null {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const sync = () => setConsent(readConsent());
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return consent;
}
