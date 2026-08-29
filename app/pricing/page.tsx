import type { Metadata } from "next";
import Link from "next/link";
import { PLANS, FREE_LIMITS } from "@/lib/plans";
import { docFromReceiptData } from "@/lib/sections";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import Watermark from "@/components/receipt/Watermark";
import type { ReceiptData } from "@/lib/types";
import { absoluteUrl, SITE } from "@/lib/site";
import ProPlanCard from "./ProPlanCard";
import NewAccountBanner from "./NewAccountBanner";
import CheckoutNotice from "./CheckoutNotice";

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

// Narrowed so the pair reads comfortably without either panel being scaled down
// to the point the watermark stops being legible — which would defeat the whole
// section. Note they stack on a phone rather than sitting side by side: the grid
// below is `sm:grid-cols-2`, and two 260px receipts do not fit in the ~343px a
// 375px viewport leaves. Stacking is the right call there; making them narrow
// enough to pair would cost the legibility this width exists to protect.
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

// This page reads nothing per-request any more, so it is plain static HTML.
//
// It was force-dynamic once, re-rendering on every visit and making three
// Supabase round-trips for the payment links: a cold request took 3.0s and a
// warm one ~0.9s, against 0.68s for the cached homepage at four times the HTML.
// It then became `revalidate = 300` to cache that. Now /api/checkout resolves
// the links at click time instead, so there is nothing left to revalidate — and
// an admin editing a link takes effect on the next click rather than after a
// five-minute window.

export default function PricingPage() {
  const weekly = PLANS.pro_weekly;
  const monthly = PLANS.pro_monthly;
  const yearly = PLANS.pro_yearly;

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
      {/* Renders nothing unless /api/checkout bounced someone back here. */}
      <CheckoutNotice />
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

      {/* Two cards, not four.
          At 1440px the old lg:grid-cols-4 row gave each card 222px — 158px of
          content inside p-8, enough to wrap "Unlimited AI receipt generation"
          onto three lines — and the CTAs did not align because the feature
          lists differed in length. The three Pro prices also read left to right
          as a rising ladder ($3, $7.99, $39) when per month they fall
          ($13.00, $7.99, $3.25). The interval is a choice inside one card now,
          which puts those numbers on a single scale. */}
      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {/* Free */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Free</h2>
          <p className="mt-1 text-sm text-slate-600">
            Every template, and your first {FREE_LIMITS.freeReceiptDownloads} downloads clean.
          </p>
          <p className="mt-6 text-4xl font-bold text-slate-900">
            $0<span className="ml-1 text-base font-medium text-slate-500">forever</span>
          </p>
          <p className="mt-1 text-sm text-slate-600">No card, no trial</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {PLANS.free.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden className="text-slate-400">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/create"
            className="mt-8 block rounded-full border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Start free
          </Link>
        </div>

        <ProPlanCard />
      </div>

      <p className="mx-auto mt-8 max-w-xl rounded-xl bg-amber-50 px-4 py-3 text-center text-sm text-amber-800">
        💡 Please check out using the <strong>same email you sign in with</strong> — that&apos;s how
        we match your payment and activate Pro on your account.
      </p>

      {/* The watermark is the single asset the whole Free -> Pro decision turns
          on, and the page described it in words without ever showing it. Both
          panels render the same receipt through the same components the builder
          uses, with the real Watermark overlay on the left — so this is the
          actual artefact, not an illustration of one.

          It sits *below* the price table, which is the whole reason this block
          moved. Measured on a 375px phone it ran 594px to 2,024px and pushed the
          first price to 2,105px — 2.6 screens before anyone saw a number. It
          answers "is it worth it?", and that is a question people ask after
          seeing the price, not before. */}
      <section className="mx-auto mt-20 max-w-3xl" aria-labelledby="watermark-heading">
        <h2 id="watermark-heading" className="text-center text-2xl font-bold text-slate-900">
          This is what Pro removes
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          {/* Not "the one on the left": the pair stacks below 640px, where left
              and right do not exist. The figcaptions already name each panel, so
              point at those instead of at a position. */}
          Your first {FREE_LIMITS.freeReceiptDownloads} downloads are watermark-free either way.
          After that, a free download carries the watermark below.
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
