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
    a: "Free gives you every template and unlimited preview. On a free account your first 3 downloads are watermark-free HD; after that downloads carry a small watermark, and you get 3 AI generations per day. Pro removes the watermark on every download, unlocks unlimited HD exports, unlimited AI generation and saved receipt history.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Manage or cancel your subscription anytime from your account page — you keep Pro until the end of the billing period.",
  },
  {
    q: "Do I need an account to use the free tier?",
    a: "You can build and preview with no sign-up. Downloading uses a free account: your first 3 receipts are watermark-free, then downloads are watermarked until you upgrade to Pro.",
  },
];

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const weekly = PLANS.pro_weekly;
  const monthly = PLANS.pro_monthly;
  const yearly = PLANS.pro_yearly;
  // Payment links come from the admin panel (DB), falling back to env.
  const links = await getPaymentLinks();

  const isoDuration: Record<string, string> = { week: "P7D", month: "P1M", year: "P1Y" };
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    url: absoluteUrl("/pricing"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    description:
      "Makecepeit Pro removes the watermark and unlocks unlimited HD exports, unlimited AI receipt generation and saved receipt history.",
    offers: [weekly, monthly, yearly].map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price.toFixed(2),
      priceCurrency: "USD",
      url: absoluteUrl("/pricing"),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.price.toFixed(2),
        priceCurrency: "USD",
        ...(p.interval ? { billingDuration: isoDuration[p.interval] } : {}),
      },
    })),
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Simple, honest pricing
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
          Start free. Upgrade when you need watermark-free, professional receipts.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Free */}
        <div className="rounded-[3px] border border-rule bg-card p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Free</h2>
          <p className="mt-2 text-4xl font-bold text-ink">
            $0<span className="text-base font-medium text-ink-soft">/forever</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink-soft">
            {PLANS.free.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-ink-soft/70">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/create"
            className="mt-8 block rounded-full border border-rule bg-card px-5 py-3 text-center text-sm font-semibold text-ink hover:bg-greenbar"
          >
            Start free
          </Link>
        </div>

        {/* Pro Weekly */}
        <div className="rounded-[3px] border border-rule bg-card p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">{weekly.name}</h2>
          <p className="mt-2 text-4xl font-bold text-ink">
            ${weekly.price}
            <span className="text-base font-medium text-ink-soft">/wk</span>
          </p>
          <p className="mt-1 text-xs font-medium text-ink-soft/70">7-day full Pro pass</p>
          <ul className="mt-6 space-y-3 text-sm text-ink-soft">
            {weekly.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-ledger">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <PricingCta
            planId="pro_weekly"
            paymentLink={links.weekly}
            className="mt-8 block rounded-full border border-rule bg-card px-5 py-3 text-center text-sm font-semibold text-ledger-deep transition-colors hover:border-ledger/45 hover:bg-greenbar"
            label="Get 7-day Pro"
          />
        </div>

        {/* Pro Monthly */}
        <div className="rounded-[3px] border border-rule bg-card p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">{monthly.name}</h2>
          <p className="mt-2 text-4xl font-bold text-ink">
            ${monthly.price}
            <span className="text-base font-medium text-ink-soft">/mo</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink-soft">
            {monthly.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-ledger">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <PricingCta
            planId="pro_monthly"
            paymentLink={links.monthly}
            className="mt-8 block rounded-full border border-rule bg-card px-5 py-3 text-center text-sm font-semibold text-ledger-deep transition-colors hover:border-ledger/45 hover:bg-greenbar"
            label="Go Pro Monthly"
          />
        </div>

        {/* Pro Yearly (highlighted) */}
        <div className="relative rounded-[3px] border-2 border-ledger bg-card p-8 shadow-lg">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ledger px-3 py-1 text-xs font-semibold text-white">
            Best value · Save ~60%
          </span>
          <h2 className="text-lg font-semibold text-ink">{yearly.name}</h2>
          <p className="mt-2 text-4xl font-bold text-ink">
            ${yearly.price}
            <span className="text-base font-medium text-ink-soft">/yr</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink-soft">
            {yearly.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-ledger">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <PricingCta
            planId="pro_yearly"
            paymentLink={links.yearly}
            className="mt-8 block rounded-full bg-ledger px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-ledger-deep"
            label="Go Pro Yearly"
          />
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-xl rounded-[3px] bg-amber-50 px-4 py-3 text-center text-sm text-amber-800">
        💡 Please check out using the <strong>same email you sign in with</strong> — that&apos;s how
        we match your payment and activate Pro on your account.
      </p>

      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-ink">Pricing FAQ</h2>
        <dl className="mt-8 space-y-6">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-[3px] border border-rule bg-card p-6">
              <dt className="font-semibold text-ink">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.a}</dd>
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
