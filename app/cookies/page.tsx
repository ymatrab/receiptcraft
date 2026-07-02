import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Which cookies ${SITE.name} uses and why: essential cookies for login and free-plan limits, and optional analytics cookies you can accept or decline.`,
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
    name: "ai_free_usage",
    purpose: "Counts free AI generations per day so limits work without an account.",
    duration: "1 day (resets daily)",
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
      <p className="mt-3 text-sm text-slate-500">Last updated: July 2, 2026</p>

      <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
        <p>
          This page lists every cookie and browser-storage item {SITE.name} uses, what it does,
          and how long it lives. We use no advertising cookies and no cross-site tracking —
          only what's needed to run the product, plus optional anonymous analytics that load
          only if you accept them in the cookie banner.
        </p>

        <H2>Essential cookies &amp; storage (always on)</H2>
        <p>
          These are required for the site to function — signing in, enforcing free-plan limits,
          and keeping your draft receipts safe in your own browser. They can&apos;t be switched off.
        </p>
        <CookieTable rows={ESSENTIAL} />

        <H2>Analytics cookies (only with your consent)</H2>
        <p>
          When you click <strong>Accept</strong> in the cookie banner, we load Google Analytics
          and Microsoft Clarity to understand which features are used and where the interface
          can improve. If you decline, these never load and no analytics cookies are set. We
          also use Vercel Analytics, which is <strong>cookieless</strong> — it counts page views
          in aggregate without storing anything on your device or identifying you.
        </p>
        <CookieTable rows={ANALYTICS} />

        <H2>Changing your choice</H2>
        <p>
          Your consent choice is stored in your browser. To change it, clear this site&apos;s
          browsing data (cookies and site data) in your browser settings — the banner will
          appear again on your next visit. Declining analytics never limits any feature.
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
