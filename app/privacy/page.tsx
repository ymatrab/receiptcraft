import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles your data: receipt contents never leave your browser, no account required, minimal analytics.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Privacy Policy</h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: June 12, 2026</p>

      <div className="mt-8 space-y-6 leading-relaxed text-slate-600">
        <h2 className="text-2xl font-bold text-slate-900">The short version</h2>
        <p>
          Everything you type into the receipt builder stays on your device. We
          do not collect, transmit, store or see your receipt data. We do not
          require an account, an email address or any personal information.
        </p>

        <h2 className="pt-4 text-2xl font-bold text-slate-900">Receipt data</h2>
        <p>
          The receipt builder is a client-side application. Business names,
          items, prices, dates and every other detail you enter are processed
          entirely in your browser. PDF and PNG files are generated locally on
          your device. This data is never sent to our servers and disappears
          when you close or reload the page.
        </p>

        <h2 className="pt-4 text-2xl font-bold text-slate-900">Analytics</h2>
        <p>
          We may use privacy-respecting, aggregate analytics (such as page view
          counts) to understand which templates are popular and improve the
          product. This data is anonymous and never linked to receipt contents
          or to you as an individual.
        </p>

        <h2 className="pt-4 text-2xl font-bold text-slate-900">Cookies</h2>
        <p>
          {SITE.name} does not use advertising or tracking cookies. Any storage
          used is strictly functional (for example, remembering an interface
          preference).
        </p>

        <h2 className="pt-4 text-2xl font-bold text-slate-900">Contact</h2>
        <p>
          Questions about this policy? Contact us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-indigo-600 underline">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
