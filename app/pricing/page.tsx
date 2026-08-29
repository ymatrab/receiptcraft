import type { Metadata } from "next";
import Link from "next/link";
import { PLANS, FREE_LIMITS } from "@/lib/plans";
import { docFromReceiptData } from "@/lib/sections";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import Watermark from "@/components/receipt/Watermark";
import type { ReceiptData } from "@/lib/types";
import { getPaymentLinks } from "@/lib/settings";
import { absoluteUrl, SITE } from "@/lib/site";
import PricingCta from "./PricingCta";
import NewAccountBanner from "./NewAccountBanner";

const PRICING_TITLE = `Pricing — Remove the Watermark with ${SITE.name} Pro`;
const PRICING_DESCRIPTION =
  "Create receipts free with a watermark, or go Pro for watermark-free HD downloads, unlimited AI receipt generation and saved history. Monthly or yearly.";

export const metadata: Metadata = {
  title: PRICING_TITLE,
  description: PRICING_DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: PRICING_TITLE,
    description: PRICING_DESCRIPTION,
    url: absoluteUrl("/pricing"),
    siteName: SITE.name,
    type: "website",
    // Setting openGraph explicitly drops the default opengraph-image, so
    // re-add it — otherwise social previews render with no image.
    images: [absoluteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title: PRICING_TITLE,
    description: PRICING_DESCRIPTION,
    images: [absoluteUrl("/opengraph-image")],
  },
};

// Small, deliberately ordinary receipt: the panels are about the watermark, so
// the content should not compete with it.
const WATERMARK_DEMO = docFromReceiptData({
  businessName: "Corner Market",
  logoDataUrl: "",
  addressLine1: "18 Mill Lane",
  addressLine2: "Portland, OR 97204",
  phone: "(503) 555-0142",
  website: "",
  receiptNumber: "104822",
  date: "2026-08-14",
  time: "17:26",
  cashier: "Cashier: Dan",
  register: "Register 1",
  items: [
    { id: "w1", name: "Sourdough Loaf", quantity: 1, price: 4.5 },
    { id: "w2", name: "Orange Juice 1L", quantity: 1, price: 3.2 },
    { id: "w3", name: "Free-Range Eggs (6)", quantity: 1, price: 3.95 },
  ],
  currency: "USD",
  taxLabel: "Sales Tax",
  taxRate: 0,
  discount: 0,
  tip: 0,
  paymentMethod: "Credit Card",
  cardLastFour: "4821",
  amountTendered: 0,
  footerMessage: "Thanks for shopping local!",
  showBarcode: true,
  paperStyle: "thermal",
} as ReceiptData);

// Narrowed so both panels sit side by side on a phone without either being
// scaled down to the point the watermark stops being legible — which would
// defeat the whole section.
const WATERMARK_DEMO_DOC = {
  ...WATERMARK_DEMO,
  settings: { ...WATERMARK_DEMO.settings, widthPx: 260 },
};

const FAQ = [
  {
    q: "What's the difference between Free and Pro?",
    a: "Free gives you every template and unlimited preview. On a free account your first 3 downloads are watermark-free HD; after that downloads carry a small watermark, and you get 3 AI generations per day. Pro removes the watermark on every download, unlocks unlimited HD exports, unlimited AI generation and saved receipt history.",
  },
  {
    q: "Can I cancel anytime?",
    a: `Pro is a pass that runs for the period you bought, and your access ends on the date shown on your account page — so there's nothing to cancel to stay in control. There's no self-serve billing portal yet: to cancel, stop any future charge or ask for a refund, email ${SITE.email} and we'll sort it within one business day.`,
  },
  {
    q: "Do I need an account to use the free tier?",
    a: "You can build and preview with no sign-up. Downloading uses a free account: your first 3 receipts are watermark-free, then downloads are watermarked until you upgrade to Pro.",
  },
];

// Was force-dynamic, which meant every visit re-rendered the page AND made three
// Supabase round-trips for the payment links. Measured against production: a cold
// request took 3.0s and a warm one ~0.9s, while the cached homepage — four times
// the HTML — served in 0.68s. Paying a database round-trip per view on the page
// that asks for money is the worst place to spend it.
//
// The links change only when an admin edits them, and saveLinksAction revalidates
// this path on save, so the cache is corrected immediately rather than after the
// window. The 5-minute window is just the backstop.
export const revalidate = 300;

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
      {/* Renders nothing unless ?new=1, so the static HTML crawlers and every
          other visitor get is byte-for-byte what it was. */}
      <NewAccountBanner />
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Simple, honest pricing
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Start free. Upgrade when you need watermark-free, professional receipts.
        </p>
      </div>

      {/* The free tier has four distinct states and they were previously only
          explained in prose scattered across the hero, /create and the FAQ.
          Stating them once, in order, is what lets those places stop. */}
      <ol className="mx-auto mt-10 max-w-2xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {[
          { step: "Build and preview", detail: "No account needed", free: true },
          { step: "Your first 3 downloads", detail: "Watermark-free HD", free: true },
          { step: "Downloads after that", detail: "Include a small watermark", free: false },
          { step: "Pro", detail: "Unlimited watermark-free HD exports", free: true },
        ].map((row) => (
          <li key={row.step} className="flex items-center justify-between gap-4 px-5 py-3.5">
            <span className="text-sm font-medium text-slate-900">{row.step}</span>
            <span
              className={`text-sm ${row.free ? "font-medium text-indigo-600" : "text-slate-500"}`}
            >
              {row.detail}
            </span>
          </li>
        ))}
      </ol>

      {/* The watermark is the single asset the whole Free -> Pro decision turns
          on, and the page described it in words without ever showing it. Both
          panels render the same receipt through the same components the builder
          uses, with the real Watermark overlay on the left — so this is the
          actual artefact, not an illustration of one. */}
      <section className="mx-auto mt-14 max-w-3xl" aria-labelledby="watermark-heading">
        <h2 id="watermark-heading" className="text-center text-2xl font-bold text-slate-900">
          This is what Pro removes
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          Your first {FREE_LIMITS.freeReceiptDownloads} downloads are watermark-free either way.
          After that, a free download looks like the one on the left.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <figure>
            <div className="relative mx-auto w-fit overflow-hidden rounded-xl">
              <ReceiptDocPaper doc={WATERMARK_DEMO_DOC} />
              <Watermark />
            </div>
            <figcaption className="mt-3 text-center text-sm text-slate-500">
              Free download, after your first {FREE_LIMITS.freeReceiptDownloads}
            </figcaption>
          </figure>
          <figure>
            <div className="mx-auto w-fit overflow-hidden rounded-xl">
              <ReceiptDocPaper doc={WATERMARK_DEMO_DOC} />
            </div>
            <figcaption className="mt-3 text-center text-sm font-medium text-indigo-600">
              Every Pro download
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Free */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Free</h2>
          <p className="mt-2 text-4xl font-bold text-slate-900">
            $0<span className="text-base font-medium text-slate-500">/forever</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {PLANS.free.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-slate-500">✓</span>
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

        {/* Pro Weekly */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">{weekly.name}</h2>
          <p className="mt-2 text-4xl font-bold text-slate-900">
            ${weekly.price}
            <span className="text-base font-medium text-slate-500">/wk</span>
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">7-day full Pro pass</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {weekly.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-indigo-500">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <PricingCta
            planId="pro_weekly"
            paymentLink={links.weekly}
            className="mt-8 block rounded-full border border-indigo-200 bg-indigo-50 px-5 py-3 text-center text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
            label="Get 7-day Pro"
          />
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

      <p className="mx-auto mt-8 max-w-xl rounded-xl bg-amber-50 px-4 py-3 text-center text-sm text-amber-800">
        💡 Please check out using the <strong>same email you sign in with</strong> — that&apos;s how
        we match your payment and activate Pro on your account.
      </p>

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
