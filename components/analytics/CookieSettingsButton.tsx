"use client";

import { resetConsent } from "@/lib/consent";

/**
 * Re-opens the cookie banner so a visitor can change an earlier choice.
 *
 * Without it, Accept or Decline was permanent short of clearing site data —
 * withdrawing consent has to be as easy as giving it.
 */
export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={resetConsent} className={className}>
      Cookie settings
    </button>
  );
}
