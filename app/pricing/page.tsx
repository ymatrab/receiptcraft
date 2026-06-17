import type { Metadata } from "next";
import Link from "next/link";
import { PLANS } from "@/lib/plans";
import { getPaymentLinks } from "@/lib/settings";
import { absoluteUrl, SITE } from "@/lib/site";
import PricingCta from "./PricingCta";

export const metadata: Metadata = {
  title: `Pricing — Remove the Watermark with ${SITE.name} Pro`,
  description:
    "Create receipts free with a watermark, or go Pro for watermark-free HD downloads, unlimited AI receipt generation and saved history. Monthly or yearly.",
  alternates: { canonical: "/pricing" },
};

const FAQ = [
  {
    q: "What's the difference between Free and Pro?",
    a: "Free gives you every template and unlimited preview, with a small watermark on downloads and 3 AI generations per day. Pro removes the watermark, unlocks HD exports, unlimited AI generation and saved receipt history.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Manage or cancel your subscription anytime from your account page — you keep Pro until the end of the billing period.",
  },
  {
    q: "Do I need an account to use the free tier?",
    a: "No. The free, watermarked builder works with no sign-up. You only create an account when you upgrade to Pro.",
  },
];

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const monthly = PLANS.pro_monthly;
  const yearly = PLANS.pro_yearly;
  // Payment links come from the admin panel (DB), falling back to env.
  const links = await getPaymentLinks();

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Simple, honest pricing
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Start free. Upgrade when you need watermark-free, professional receipts.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {/* Free */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Free</h2>
          <p className="mt-2 text-4xl font-bold text-slate-900">
            $0<span className="text-base font-medium text-slate-500">/forever</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {PLANS.free.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-slate-400">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/create"
            className="mt-8 block rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Start free
          </Link>
        </div>

        {/* Pro Monthly */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{monthly.name}</h2>
          <p className="mt-2 text-4xl font-bold text-slate-900">
            ${monthly.price}
            <span className="text-base font-medium text-slate-500">/mo</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {monthly.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-indigo-500">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <PricingCta
            planId="pro_monthly"
            paymentLink={links.monthly}
            className="mt-8 block rounded-full border border-indigo-200 bg-indigo-50 px-5 py-3 text-center text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
            label="Go Pro Monthly"
          />
        </div>

        {/* Pro Yearly (highlighted) */}
        <div className="relative rounded-3xl border-2 border-indigo-600 bg-white p-8 shadow-lg">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
            Best value · Save ~60%
          </span>
          <h2 className="text-lg font-semibold text-slate-900">{yearly.name}</h2>
          <p className="mt-2 text-4xl font-bold text-slate-900">
            ${yearly.price}
            <span className="text-base font-medium text-slate-500">/yr</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {yearly.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-indigo-500">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <PricingCta
            planId="pro_yearly"
            paymentLink={links.yearly}
            className="mt-8 block rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            label="Go Pro Yearly"
          />
        </div>
      </div>

      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-slate-900">Pricing FAQ</h2>
        <dl className="mt-8 space-y-6">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-6">
              <dt className="font-semibold text-slate-900">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* FAQ structured data for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
            url: absoluteUrl("/pricing"),
          }),
        }}
      />
    </main>
  );
}
