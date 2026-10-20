import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Which cookies ${SITE.name} uses and why: essential cookies for login and free-plan limits, plus anonymous analytics you can turn off anytime.`,
  alternates: { canonical: "/cookies" },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="pt-4 text-2xl font-bold text-slate-900">{children}</h2>;
}

const ESSENTIAL = [
  {
    name: "sb-*-auth-token (Supabase)",
    purpose: "Keeps you signed in to your account.",
    duration: "Session / up to 1 year",
  },
  {
    name: "rc_cookie_consent (local storage)",
    purpose: "Remembers whether you accepted or declined analytics cookies.",
    duration: "Until you clear browser data",
  },
  {
    name: "Draft & template storage (local storage)",
    purpose: "Autosaves your receipt draft and saved templates in your own browser.",
    duration: "Until you clear browser data",
  },
];

const ANALYTICS = [
  {
    name: "_ga, _ga_* (Google Analytics)",
    purpose: "Anonymous usage statistics: which pages and features are used.",
    duration: "Up to 2 years",
  },
  {
    name: "_clck, _clsk, CLID (Microsoft Clarity)",
    purpose: "Anonymous session insights (heatmaps, where the interface confuses people).",
    duration: "Up to 1 year",
  },
];

const MEASUREMENT = [
  {
    name: "mkc_aid, mkc_sid (local storage)",
    purpose:
      "Two random ids — one for this browser, one for the current visit — so our own records count people rather than clicks. Nothing about you is in them.",
    duration: "Browser id until you clear browser data; visit id ends after 30 minutes idle",
  },
  {
    name: "mkc_src, mkc_last_src, mkc_visited (local storage)",
    purpose:
      "Which kind of site sent you (e.g. Google, Bing, direct) and whether this visit has been counted, so we can see where visitors come from and where they leave.",
    duration: "Source remembered for 7 days",
  },
  {
    name: "mkc_ai_source (session storage)",
    purpose: "Whether an AI assistant (ChatGPT, Perplexity…) sent you to us.",
    duration: "Until you close the tab",
  },
];

function CookieTable({ rows }: { rows: typeof ESSENTIAL }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-semibold">Cookie</th>
            <th className="px-4 py-3 font-semibold">Purpose</th>
            <th className="px-4 py-3 font-semibold">Duration</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-600">
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
              <td className="px-4 py-3">{row.purpose}</td>
              <td className="px-4 py-3">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Cookie Policy</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: October 20, 2026</p>

      <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
        <p>
          This page lists every cookie and browser-storage item {SITE.name} uses, what it does,
          and how long it lives. We use no advertising cookies and no cross-site tracking —
          only what&apos;s needed to run the product, plus anonymous analytics. In the EEA, the
          UK and Switzerland analytics cookies are set only if you accept them; elsewhere
          they are on by default and you can turn them off with Decline.
        </p>

        <H2>Essential cookies &amp; storage (always on)</H2>
        <p>
          These are required for the site to function — signing in, enforcing free-plan limits,
          and keeping your draft receipts safe in your own browser. They can&apos;t be switched off.
        </p>
        <CookieTable rows={ESSENTIAL} />

        <H2>Analytics cookies</H2>
        <p>
          <strong>In the EEA, the UK and Switzerland</strong>, Google Analytics runs in{" "}
          <strong>consent mode</strong>: until you click Accept it sends only cookieless,
          anonymous pings — no cookies are set and you are not identified. Clicking{" "}
          <strong>Accept</strong> switches it to full measurement (setting the cookies below).
        </p>
        <p>
          <strong>Everywhere else</strong>, Google Analytics measures visits by default and sets
          the cookies below from your first page. Clicking <strong>Decline</strong> in the
          banner turns it back to cookieless pings and deletes the Google Analytics cookies
          already set.
        </p>
        <p>
          In every country, Microsoft Clarity loads only after you click Accept, and no
          advertising features of Google Analytics are ever enabled. We also use Vercel
          Analytics, which is{" "}
          <strong>cookieless</strong> — it counts page views in aggregate without storing
          anything on your device or identifying you.
        </p>
        <CookieTable rows={ANALYTICS} />

        <H2>Our own visit counter (no cookies)</H2>
        <p>
          To count visits and see which step of the site people leave at, we keep a small
          first-party record in our own database — never shared with a third party. It uses the
          browser-storage items below rather than cookies, and they hold random ids and a source
          label, not anything about who you are.
        </p>
        <CookieTable rows={MEASUREMENT} />

        <H2>Changing your choice</H2>
        <p>
          Your consent choice is stored in your browser. To change it, clear this site&apos;s
          browsing data (cookies and site data) in your browser settings — the banner will
          appear again on your next visit. Declining analytics never limits any feature, and
          once you decline, analytics cookies stay off wherever you are.
        </p>

        <H2>More information</H2>
        <p>
          How we handle personal data more broadly is covered in our{" "}
          <Link href="/privacy" className="text-indigo-600 underline">Privacy Policy</Link>.
          Questions? Contact{" "}
          <a href={`mailto:${SITE.email}`} className="text-indigo-600 underline">{SITE.email}</a>.
        </p>
      </div>
    </div>
  );
}
