import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import { BRAND_COUNT, TEMPLATE_COUNT, SITE_DESCRIPTION } from "@/lib/counts";
import HomeAiGenerator from "@/components/HomeAiGenerator";
import { TEMPLATES } from "@/lib/templates";
import { BRAND_LIST } from "@/lib/brands";
import { HOMEPAGE_FAQS } from "@/lib/faqs";
import type { PaperFinish, ReceiptData } from "@/lib/types";
import { docFromReceiptData } from "@/lib/sections";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import ReceiptAnatomy from "@/components/home/ReceiptAnatomy";
import ComparisonTable from "@/components/comparison/ComparisonTable";
import { MAKECEPEIT, COMPETITORS, PRICING_AS_OF } from "@/lib/comparisons";

const DEMO_RECEIPT: ReceiptData = {
  businessName: "Daily Grind Coffee Co.",
  logoDataUrl: "",
  addressLine1: "412 Oak Street",
  addressLine2: "Austin, TX 78701",
  phone: "(512) 555-0177",
  website: "",
  receiptNumber: "482916",
  date: "2026-06-12",
  time: "09:41",
  cashier: "Cashier: Maya",
  register: "Register 2",
  items: [
    { id: "d1", name: "Caffe Latte (Grande)", quantity: 1, price: 5.25 },
    { id: "d2", name: "Cappuccino (Tall)", quantity: 1, price: 4.5 },
    { id: "d3", name: "Butter Croissant", quantity: 2, price: 3.75 },
  ],
  currency: "USD",
  taxLabel: "Sales Tax",
  taxRate: 8.25,
  discount: 0,
  tip: 0,
  paymentMethod: "Credit Card",
  cardLastFour: "4821",
  amountTendered: 0,
  footerMessage: "Fuel your day. See you tomorrow!",
  showBarcode: true,
  paperStyle: "thermal",
};

// The same receipt rendered on each stock, so the row shows the difference the
// finish makes rather than the difference the content makes.
const PAPER_STYLES: { finish: PaperFinish; name: string; blurb: string }[] = [
  { finish: "thermal", name: "Thermal", blurb: "The classic till roll — narrow, monospaced, torn edges." },
  { finish: "clean", name: "Clean", blurb: "Crisp white stock for a tidier modern counter receipt." },
  { finish: "invoice", name: "Invoice", blurb: "A wider bordered sheet that reads as a business document." },
  { finish: "email", name: "Digital", blurb: "The emailed order-confirmation look, with soft chrome." },
];

const PAPER_DEMOS = PAPER_STYLES.map((style) => {
  const doc = docFromReceiptData(DEMO_RECEIPT);
  return {
    ...style,
    doc: {
      ...doc,
      settings: {
        ...doc.settings,
        paper: style.finish,
        widthPx: 250,
        // The digital finish is the only one that carries the coloured accent
        // bar, and that bar comes from the card chrome. Without it, "email"
        // renders almost identically to "clean" and the row loses a column.
        style: style.finish === "email" ? ("card" as const) : doc.settings.style,
      },
    },
  };
});

// Definitional, self-contained answers — each one states what a zone is and why
// it matters, so a passage still makes sense quoted on its own.
const ANATOMY_ZONES = [
  {
    n: 1,
    title: "Header",
    body: "The merchant name, address and phone identify who issued the receipt and which branch handled the sale. This is what a returns desk or an expense reviewer looks at first.",
  },
  {
    n: 2,
    title: "Transaction identifiers",
    body: "Receipt number, date, time, register and cashier. The receipt number is what you quote to look the sale up again, and the timestamp is what ties it to a line on a card statement.",
  },
  {
    n: 3,
    title: "Line items",
    body: "Each product or service with its quantity and unit price. Itemization is the part expense policies care about, because it shows what was bought rather than only what was spent.",
  },
  {
    n: 4,
    title: "Totals",
    body: "Subtotal first, then tax, discounts and tips, then the grand total. Tax has to appear on its own line for a receipt to support a sales-tax, VAT or GST claim.",
  },
  {
    n: 5,
    title: "Payment",
    body: "The method used, the last four digits of the card, and any change given. This is what matches a receipt to one specific bank or card transaction.",
  },
  {
    n: 6,
    title: "Footer",
    body: "Barcode, return policy and thank-you message. The barcode encodes the transaction so staff can scan it back up at the counter during a return.",
  },
];

const FEATURES = [
  {
    icon: "⚡",
    tint: "bg-indigo-50 ring-indigo-100",
    title: "Live preview as you type",
    description:
      "Every field updates the receipt instantly. What you see is exactly what you download — no surprises.",
  },
  {
    icon: "📄",
    tint: "bg-violet-50 ring-violet-100",
    title: "PDF & PNG export",
    description:
      "Download print-ready PDFs or crisp 3x-resolution PNG images. Perfect for expense reports and records.",
  },
  {
    icon: "🎨",
    tint: "bg-sky-50 ring-sky-100",
    title: "4 paper styles",
    description:
      "Thermal paper, clean white, invoice or digital email look — switch styles with one click to match any business.",
  },
  {
    icon: "🔒",
    tint: "bg-emerald-50 ring-emerald-100",
    title: "Private by design",
    description:
      "The builder runs in your browser, so what you type stays on your device. Only the optional AI generator and account saving send data.",
  },
  {
    icon: "🌍",
    tint: "bg-amber-50 ring-amber-100",
    title: "10 currencies & any tax",
    description:
      "USD, EUR, GBP, INR and more. Custom tax labels (VAT, GST), rates, discounts and tips — calculated automatically.",
  },
  {
    icon: "🆓",
    tint: "bg-rose-50 ring-rose-100",
    title: "Free to build — account to download",
    description:
      "Build and preview receipts with no account. Create a free account to download — your first is watermark-free — then go Pro for unlimited HD, watermark-free exports.",
  },
];

const STEPS = [
  {
    title: "Pick a template",
    description:
      `Choose from ${TEMPLATE_COUNT} receipt templates and ${BRAND_COUNT} named-brand layouts — grocery, restaurant, gas station, taxi, hotel and more — each pre-filled with sample details.`,
  },
  {
    title: "Customize everything",
    description:
      "Edit the business info, items, prices, tax, tip and payment method. The live preview updates with every keystroke.",
  },
  {
    title: "Sign in & download",
    description:
      "Create a free account and export your receipt as a PDF or high-resolution PNG. Your first download is watermark-free HD — upgrade to Pro for unlimited watermark-free exports.",
  },
];

// The brand pages carry the highest commercial intent ("walmart receipt") but
// GSC has most of /brands sitting in "Discovered – currently not indexed", so
// these also exist to push internal links at the cluster from the homepage.
// Resolved against BRAND_LIST rather than hard-coded, so a renamed or removed
// brand drops out of the row instead of shipping a dead link.
const POPULAR_BRAND_SLUGS = [
  "walmart",
  "target",
  "amazon",
  "starbucks",
  "mcdonalds",
  "uber",
  "costco",
  "home-depot",
  "best-buy",
  "cvs-pharmacy",
  "doordash",
  "chick-fil-a",
];

const POPULAR_BRANDS = POPULAR_BRAND_SLUGS.flatMap((slug) => {
  const brand = BRAND_LIST.find((b) => b.slug === slug);
  return brand ? [brand] : [];
});

// Mirrors the four legitimate uses named on /about, so the homepage and the
// responsible-use policy describe the same product.
//
// `image` is an optional path under /public. When one is set the card leads
// with the photo; until then it falls back to the tinted icon tile, so the
// section is complete either way and artwork can land one file at a time.
const USE_CASES: {
  icon: string;
  tint: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image?: string;
}[] = [
  {
    icon: "🔎",
    tint: "bg-indigo-50 ring-indigo-100",
    title: "You lost the original",
    description:
      "Thermal paper fades within months and pump printers run out. Rebuild the record of a purchase you actually made.",
    href: "/receipt-help",
    cta: "Store receipt help",
  },
  {
    icon: "🧾",
    tint: "bg-violet-50 ring-violet-100",
    title: "You need it for an expense report",
    description:
      "Itemized totals, tax lines and payment method in a layout finance teams accept — exported as a clean PDF.",
    href: "/templates",
    cta: "Browse templates",
  },
  {
    icon: "🏪",
    tint: "bg-emerald-50 ring-emerald-100",
    title: "You're issuing one to a customer",
    description:
      "No point-of-sale system? Hand over something professional with your own business details, logo and tax label.",
    href: "/create",
    cta: "Open the builder",
  },
  {
    icon: "🎬",
    tint: "bg-amber-50 ring-amber-100",
    title: "You need a prop or a mockup",
    description:
      "Design comps, film and stage props, and app screenshots that need a receipt which reads as the real thing.",
    href: "/examples",
    cta: "See examples",
  },
];

const TOOLS = [
  {
    title: "Receipt Total Calculator",
    description:
      "Work out subtotal, tax, tip and change before you build — useful when you only have the line items and the final total.",
    href: "/tools/receipt-calculator",
  },
  {
    title: "Split-Payment Checker",
    description:
      "Reconcile a bill paid across several cards or people and confirm every share adds back up to the total.",
    href: "/tools/split-payment-checker",
  },
];

// Directory listings that carry a badge on our homepage. Add a new object here
// to display its badge — `width` is optional (omit for auto-width badges).
const DIRECTORIES: {
  name: string;
  href: string;
  badge: string;
  width?: number;
  height: number;
}[] = [
  {
    name: "Fazier",
    href: "https://fazier.com/launches/www.makecepeit.com",
    badge:
      "https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=neutral",
    width: 120,
    height: 51,
  },
  {
    name: "Findly.tools",
    href: "https://findly.tools/makecepeit?utm_source=makecepeit",
    badge: "https://findly.tools/badges/findly-tools-badge-light.svg",
    width: 175,
    height: 55,
  },
  {
    name: "Turbo0",
    href: "https://turbo0.com/item/makecepeit",
    badge: "https://img.turbo0.com/badge-listed-light.svg",
    width: 162,
    height: 54,
  },
  {
    name: "Startup Fame",
    href: "https://startupfa.me/s/makecepeit?utm_source=www.makecepeit.com",
    badge: "https://startupfa.me/images/logo-dark.webp",
    width: 208,
    height: 36,
  },
  {
    name: "FrogDR",
    href: "https://frogdr.com/makecepeit.com?utm_source=makecepeit.com",
    badge: "https://frogdr.com/makecepeit.com/badge-white.svg",
    width: 250,
    height: 54,
  },
  {
    name: "Twelve Tools",
    href: "https://twelve.tools",
    badge: "https://twelve.tools/badge2-light.svg",
    width: 200,
    height: 54,
  },
  {
    name: "Wired Business",
    href: "https://wired.business",
    badge: "https://wired.business/badge2-light.svg",
    width: 200,
    height: 54,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOMEPAGE_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

// Each anatomy zone as a defined term — the section is written to be quotable,
// and this states the same definitions in a form a machine can lift cleanly.
const definedTermsJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Parts of a receipt",
  url: absoluteUrl("/#anatomy"),
  hasDefinedTerm: ANATOMY_ZONES.map((zone) => ({
    "@type": "DefinedTerm",
    name: zone.title,
    description: zone.body,
  })),
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE.name,
  url: SITE.url,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description: SITE_DESCRIPTION,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    // Derived so the structured data can't drift from what the page shows.
    `${TEMPLATE_COUNT} receipt templates and ${BRAND_COUNT} brand-style layouts`,
    "Live receipt preview",
    "PDF and PNG download",
    "Custom tax, discount and tip",
    "10 currencies",
    "No sign-up to build — free account to download",
    "AI receipt generator",
  ],
};

/**
 * HowTo markup for the three steps already rendered below.
 *
 * Google retired the HowTo rich result, so this earns no SERP decoration —
 * models still parse the markup, and it makes each step individually
 * extractable rather than something an engine has to infer from prose. Built
 * from the same STEPS array the page renders, so the markup cannot describe a
 * flow the page no longer shows.
 */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to make a receipt online",
  description: `Build a receipt with ${SITE.name} in three steps: pick a template, customize the details, then download it as a PDF or PNG.`,
  totalTime: "PT1M",
  supply: [],
  tool: [{ "@type": "HowToTool", name: `${SITE.name} receipt builder` }],
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.description,
    url: `${SITE.url}/#how-it-works`,
  })),
};

/** Small label above a section heading. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">{children}</p>
  );
}

export default function HomePage() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="bg-grid relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-150 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200/40 to-violet-200/40 blur-3xl" />
        {/* grid-cols-[minmax(0,1fr)] is load-bearing below lg. The single
            implicit track is `auto`-sized, so the 380px hero receipt stretched
            it to 380px inside a 343px container — dragging the text column, and
            with it the primary CTA, off the right edge on every phone under
            412px. scrollWidth === clientWidth, so it could not even be scrolled
            to. Capping the track lets the decorative receipt clip against the
            section's existing overflow-hidden instead. */}
        <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Free to build · {BRAND_COUNT} brand templates · Free account to
              download
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Free receipt maker — build yours in{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                60 seconds
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              The fastest free receipt maker online. Pick a template, customize
              items, tax and payment details with a live preview, then download
              your receipt as a PDF or PNG — instantly.
            </p>

            <HomeAiGenerator />

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/create"
                className="w-full rounded-full bg-indigo-600 px-7 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30 sm:w-auto"
              >
                Create Your Receipt — Free
              </Link>
              <Link
                href="/templates"
                className="w-full rounded-full border border-slate-300 bg-white px-7 py-3.5 text-center text-base font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
              >
                Browse Templates
              </Link>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Free to build &amp; preview — no sign-up. A free account is needed
              to download or to use the AI generator, and your first download
              are watermark-free.{" "}
              <Link
                href="/pricing"
                className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-700"
              >
                See pricing
              </Link>
            </p>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              <div>
                <dt className="text-2xl font-bold text-slate-900">{BRAND_COUNT}</dt>
                <dd className="mt-0.5 text-sm text-slate-500">Brand templates</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-slate-900">60s</dt>
                <dd className="mt-0.5 text-sm text-slate-500">Average time</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-slate-900">$0</dt>
                <dd className="mt-0.5 text-sm text-slate-500">Free to build</dd>
              </div>
            </dl>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="receipt-shadow origin-top scale-90 rotate-2 transition-transform duration-300 hover:rotate-0 sm:scale-100">
              <ReceiptDocPaper doc={docFromReceiptData(DEMO_RECEIPT)} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAPER STYLES ===== */}
      <section
        className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-20"
        aria-labelledby="styles-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>Paper styles</Eyebrow>
            <h2
              id="styles-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900"
            >
              One receipt, four kinds of paper
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              The same coffee-shop sale rendered on each stock. Switch between
              them with one click — the layout, spacing and edges all change
              with the finish.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PAPER_DEMOS.map((demo) => (
              <li
                key={demo.finish}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
              >
                {/* Fixed height with a fade at the base: receipt height varies
                    with the finish (invoice and digital add chrome), so the
                    tray crops to a consistent size and the crop reads as the
                    roll continuing rather than as a mistake. */}
                <div className="relative flex h-[330px] items-start justify-center overflow-hidden rounded-xl bg-gradient-to-b from-slate-100 to-slate-50 p-4">
                  <div className="origin-top scale-[0.75]">
                    <ReceiptDocPaper doc={demo.doc} />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{demo.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{demo.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-14 sm:py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2
              id="how-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900"
            >
              How to make a receipt in 3 steps
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              From blank page to downloaded PDF in under a minute.
            </p>
          </div>

          <ol className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                {/* Each step is illustrated with the interface it describes,
                    drawn in markup so it stays sharp and needs no asset. */}
                <div className="flex h-40 items-center justify-center border-b border-slate-100 bg-gradient-to-br from-indigo-50/70 to-violet-50/70 px-6">
                  {i === 0 && (
                    <div aria-hidden="true" className="flex flex-wrap justify-center gap-2">
                      {TEMPLATES.slice(0, 6).map((t, j) => (
                        <span
                          key={t.slug}
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium shadow-sm ${
                            j === 1
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-200 bg-white text-slate-600"
                          }`}
                        >
                          <span>{t.icon}</span>
                          {t.shortName}
                        </span>
                      ))}
                    </div>
                  )}
                  {i === 1 && (
                    <div aria-hidden="true" className="w-full max-w-[220px] space-y-2.5">
                      {[
                        { w: "w-1/3", bar: "w-full" },
                        { w: "w-1/4", bar: "w-4/5" },
                        { w: "w-2/5", bar: "w-2/3" },
                      ].map((row, k) => (
                        <div key={k}>
                          <div className={`h-1.5 ${row.w} rounded-full bg-slate-300`} />
                          <div
                            className={`mt-1.5 h-7 ${row.bar} rounded-lg border bg-white ${
                              k === 1 ? "border-indigo-400 ring-2 ring-indigo-100" : "border-slate-200"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 2 && (
                    <div aria-hidden="true" className="flex items-center gap-3">
                      {["PDF", "PNG", "JPG"].map((fmt, k) => (
                        <span
                          key={fmt}
                          className={`flex h-16 w-[3.25rem] flex-col items-center justify-center rounded-lg border text-[10px] font-bold shadow-sm ${
                            k === 0
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-200 bg-white text-slate-500"
                          }`}
                        >
                          <svg
                            className="mb-1 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
                            />
                          </svg>
                          {fmt}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <Link
              href="/create"
              className="inline-block rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
            >
              Start Building Now
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ANATOMY ===== */}
      <section
        id="anatomy"
        className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-20"
        aria-labelledby="anatomy-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>Anatomy</Eyebrow>
            <h2
              id="anatomy-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900"
            >
              What every receipt has to contain
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              A receipt is a record of one completed transaction, and it is built
              from six zones. Miss one and the receipt stops being useful for
              returns, expense claims or tax.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
            <ReceiptAnatomy />

            <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {ANATOMY_ZONES.map((zone) => (
                <div key={zone.n}>
                  <dt className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">
                      {zone.n}
                    </span>
                    <span className="font-semibold text-slate-900">{zone.title}</span>
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600">{zone.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <Link
              href="/guides/receipt-anatomy"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
            >
              Read the full field-by-field guide
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BRAND RECEIPTS ===== */}
      <section className="py-14 sm:py-20" aria-labelledby="brands-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>Brand templates</Eyebrow>
            <h2
              id="brands-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900"
            >
              Need a receipt from a specific store?
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              {BRAND_LIST.length} brand layouts match the real thing — logo
              placement, item formatting, tax lines and footer text. Pick a
              store and change the details to yours.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {POPULAR_BRANDS.map((brand) => (
              <li key={brand.slug}>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
                >
                  {brand.logo ? (
                    // Decorative: the brand name is in the adjacent label, so
                    // alt text here would just repeat it to a screen reader.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.logo}
                      alt=""
                      width={72}
                      height={28}
                      loading="lazy"
                      className="h-7 w-auto max-w-[72px] object-contain"
                    />
                  ) : (
                    <span className="text-2xl" aria-hidden="true">
                      {brand.icon}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                    {brand.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/brands"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
            >
              Browse all {BRAND_LIST.length} brand templates
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TEMPLATES ===== */}
      <section
        className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-20"
        aria-labelledby="templates-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>By business type</Eyebrow>
            <h2
              id="templates-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900"
            >
              Which receipt template do you need?
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Every template comes pre-filled with sample items and tax rates
              for its business type — so you only change what you need to.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {TEMPLATES.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/templates/${t.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-2xl ring-1 ring-indigo-100">
                    <span aria-hidden="true">{t.icon}</span>
                  </span>
                  <span className="mt-3 font-semibold text-slate-900 group-hover:text-indigo-700">
                    {t.name}
                  </span>
                  <span className="mt-1 text-sm text-slate-500">
                    {t.defaults.items.length} sample items included
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== USE CASES ===== */}
      <section className="py-14 sm:py-20" aria-labelledby="use-cases-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>Use cases</Eyebrow>
            <h2
              id="use-cases-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900"
            >
              What are you making a receipt for?
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Most people arrive with one of these four jobs. Each one starts in
              a slightly different place.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {USE_CASES.map((useCase) => (
              <li key={useCase.title}>
                <Link
                  href={useCase.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
                >
                  {useCase.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={useCase.image}
                      alt=""
                      width={640}
                      height={360}
                      loading="lazy"
                      className="h-44 w-full border-b border-slate-100 object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {!useCase.image && (
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ring-1 ${useCase.tint}`}
                      >
                        <span aria-hidden="true">{useCase.icon}</span>
                      </span>
                    )}
                    <h3
                      className={`font-semibold text-slate-900 group-hover:text-indigo-700 ${
                        useCase.image ? "" : "mt-4"
                      }`}
                    >
                      {useCase.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {useCase.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                      {useCase.cta}
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== COMPARISON ===== */}
      <section
        className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-20"
        aria-labelledby="compare-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>Compared</Eyebrow>
            <h2
              id="compare-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900"
            >
              How {SITE.name} compares to other receipt makers
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              The three most-searched alternatives, on the ten things people
              actually choose between. ✓ = yes, ~ = partial, ✕ = no.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <ComparisonTable
              columns={[
                { name: `${MAKECEPEIT.name} (us)`, cells: MAKECEPEIT.cells, highlight: true },
                ...COMPETITORS.slice(0, 3).map((c) => ({ name: c.name, cells: c.cells })),
              ]}
            />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Feature and pricing details verified as of {PRICING_AS_OF}. Competitor
            plans change — check their sites for current terms.
          </p>

          <div className="mt-8">
            <Link
              href="/alternatives"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
            >
              See the full comparison of 7 receipt generators
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-14 sm:py-20" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>Features</Eyebrow>
            <h2
              id="features-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900"
            >
              What do you get with {SITE.name}?
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Built to be the fastest, cleanest way to create a professional receipt online.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <li
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ring-1 ${feature.tint}`}
                >
                  <span aria-hidden="true">{feature.icon}</span>
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== FREE TOOLS ===== */}
      <section
        className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-20"
        aria-labelledby="tools-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow>Free tools</Eyebrow>
            <h2
              id="tools-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900"
            >
              Free receipt tools
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Two calculators for the maths that comes before the receipt — no
              account, nothing to install. The{" "}
              <Link href="/tools" className="font-medium text-indigo-600 hover:underline">
                tools hub
              </Link>{" "}
              also explains how a receipt total is calculated, step by step.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {TOOLS.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
                >
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700">
                    {tool.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                    Open the tool
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== FEATURED ON / DIRECTORIES ===== */}
      {DIRECTORIES.length > 0 && (
        <section
          className="border-t border-slate-100 py-14 sm:py-16"
          aria-labelledby="directories-heading"
        >
          <h2
            id="directories-heading"
            className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500"
          >
            Featured on
          </h2>
          {/* Single auto-scrolling row. The list is rendered twice so the
              animation can loop seamlessly; the second copy is decorative
              (hidden from assistive tech). Pauses on hover; wraps statically
              under prefers-reduced-motion. */}
          <div className="marquee mt-8">
            <ul className="marquee-track">
              {[...DIRECTORIES, ...DIRECTORIES].map((d, i) => {
                const dup = i >= DIRECTORIES.length;
                return (
                  <li key={`${d.name}-${i}`} className={`marquee-item ${dup ? "marquee-dup" : ""}`}>
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${SITE.name} on ${d.name}`}
                      aria-hidden={dup || undefined}
                      tabIndex={dup ? -1 : undefined}
                      className="inline-block opacity-90 transition-opacity hover:opacity-100"
                    >
                      {/* Third-party badges from many domains — plain img avoids
                          whitelisting every directory in next.config. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={d.badge}
                        alt={`${SITE.name} featured on ${d.name}`}
                        width={d.width}
                        height={d.height}
                        loading="lazy"
                        style={{ height: d.height, width: d.width ?? "auto", maxWidth: "none" }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-14 sm:py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="text-center text-3xl font-bold tracking-tight text-slate-900"
          >
            Frequently asked questions
          </h2>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6">
            {HOMEPAGE_FAQS.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-16 text-center sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"
          />
          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your receipt is 60 seconds away
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            No sign-up to build. {TEMPLATE_COUNT} business templates and{" "}
            {BRAND_COUNT} brand layouts. A free account downloads your first one
            watermark-free.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/create"
              className="inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-indigo-700 shadow-xl transition-transform hover:scale-105"
            >
              Create Your Free Receipt
            </Link>
            <Link
              href="/pricing"
              className="inline-block rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              See Pro pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
