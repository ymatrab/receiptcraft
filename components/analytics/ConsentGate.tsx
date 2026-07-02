"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { SITE } from "@/lib/site";

type Consent = "granted" | "denied" | "unset";
const CONSENT_KEY = "rc_cookie_consent";

/**
 * Cookie consent banner + analytics loader. GA4 and Microsoft Clarity set
 * cookies, so they only load after the visitor accepts; declining (or not
 * answering yet) keeps the page completely free of analytics cookies.
 * Vercel Analytics is cookieless and lives in the layout, outside this gate.
 */
export default function ConsentGate() {
  // null until we've read localStorage, so SSR/first paint renders nothing
  // and the banner never flashes for returning visitors.
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    setConsent(stored === "granted" || stored === "denied" ? stored : "unset");
  }, []);

  const decide = (value: "granted" | "denied") => {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          {SITE.gaId ? (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${SITE.gaId}');`}
              </Script>
            </>
          ) : null}
          {SITE.clarityId ? (
            <Script id="clarity-init" strategy="afterInteractive">
              {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${SITE.clarityId}");`}
            </Script>
          ) : null}
        </>
      )}

      {consent === "unset" && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
        >
          <p className="text-sm leading-relaxed text-slate-600">
            🍪 We use anonymous analytics cookies (Google Analytics, Microsoft
            Clarity) to understand what to improve — no ads, no cross-site
            tracking. Essential cookies (login, free-plan limits) are always on.{" "}
            <Link href="/cookies" className="font-medium text-indigo-600 underline">
              Cookie policy
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="flex-1 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="flex-1 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
