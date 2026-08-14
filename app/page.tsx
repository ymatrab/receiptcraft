import Link from "next/link";
import { SITE } from "@/lib/site";
import HomeAiGenerator from "@/components/HomeAiGenerator";
import { TEMPLATES } from "@/lib/templates";
import { BRAND_LIST } from "@/lib/brands";
import { HOMEPAGE_FAQS } from "@/lib/faqs";
import type { ReceiptData } from "@/lib/types";
import { docFromReceiptData } from "@/lib/sections";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";

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

const FEATURES = [
  {
    icon: "⚡",
    title: "Live preview as you type",
    description:
      "Every field updates the receipt instantly. What you see is exactly what you download — no surprises.",
  },
  {
    icon: "📄",
    title: "PDF & PNG export",
    description:
      "Download print-ready PDFs or crisp 3x-resolution PNG images. Perfect for expense reports and records.",
  },
  {
    icon: "🎨",
    title: "4 paper styles",
    description:
      "Thermal paper, clean white, invoice or digital email look — switch styles with one click to match any business.",
  },
  {
    icon: "🔒",
    title: "Private by design",
    description:
      "The builder runs in your browser, so what you type stays on your device. Only the optional AI generator and account saving send data.",
  },
  {
    icon: "🌍",
    title: "10 currencies & any tax",
    description:
      "USD, EUR, GBP, INR and more. Custom tax labels (VAT, GST), rates, discounts and tips — calculated automatically.",
  },
  {
    icon: "🆓",
    title: "Free to start, no sign-up",
    description:
      "Build and preview receipts with no account. Create a free account to download — your first 3 are watermark-free — then go Pro for unlimited HD, watermark-free exports.",
  },
];

const STEPS = [
  {
    title: "Pick a template",
    description:
      "Choose from 40+ receipt templates — grocery, restaurant, gas station, taxi, hotel and more — each pre-filled with realistic details.",
  },
  {
    title: "Customize everything",
    description:
      "Edit the business info, items, prices, tax, tip and payment method. The live preview updates with every keystroke.",
  },
  {
    title: "Sign in & download",
    description:
      "Create a free account and export your receipt as a PDF or high-resolution PNG. Your first 3 downloads are watermark-free HD — upgrade to Pro for unlimited watermark-free exports.",
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
const USE_CASES = [
  {
    title: "You lost the original",
    description:
      "Thermal paper fades within months and pump printers run out. Rebuild the record of a purchase you actually made.",
    href: "/receipt-help",
    cta: "Store receipt help",
  },
  {
    title: "You need it for an expense report",
    description:
      "Itemized totals, tax lines and payment method in a layout finance teams accept — exported as a clean PDF.",
    href: "/templates",
    cta: "Browse templates",
  },
  {
    title: "You're issuing one to a customer",
    description:
      "No point-of-sale system? Hand over something professional with your own business details, logo and tax label.",
    href: "/create",
    cta: "Open the builder",
  },
  {
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

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE.name,
  url: SITE.url,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description: SITE.description,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    // Derived so the structured data can't drift from what the page shows.
    `${TEMPLATES.length}+ receipt templates and ${BRAND_LIST.length} brand-style layouts`,
    "Live receipt preview",
    "PDF and PNG download",
    "Custom tax, discount and tip",
    "10 currencies",
    "No sign-up to start building",
    "AI receipt generator",
  ],
};

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

      {/* ===== HERO ===== */}
      <section className="bg-grid relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-150 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200/40 to-violet-200/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Free to use · No sign-up to start · 100+ templates
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Make a receipt in{" "}
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
              only to download, and your first 3 downloads are watermark-free.
            </p>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              <div>
                <dt className="text-2xl font-bold text-slate-900">100+</dt>
                <dd className="mt-0.5 text-sm text-slate-500">Templates</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-slate-900">60s</dt>
                <dd className="mt-0.5 text-sm text-slate-500">Average time</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-slate-900">$0</dt>
                <dd className="mt-0.5 text-sm text-slate-500">Always free</dd>
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

      {/* ===== BRAND RECEIPTS ===== */}
      <section className="border-t border-slate-100 py-14 sm:py-20" aria-labelledby="brands-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="brands-heading" className="text-3xl font-bold tracking-tight text-slate-900">
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
      <section className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-20" aria-labelledby="templates-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="templates-heading" className="text-3xl font-bold tracking-tight text-slate-900">
              Which receipt template do you need?
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Every template comes pre-filled with realistic items and tax rates
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
                  <span className="text-3xl" aria-hidden="true">
                    {t.icon}
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

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-14 sm:py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="how-heading" className="text-3xl font-bold tracking-tight text-slate-900">
              How to make a receipt in 3 steps
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              From blank page to downloaded PDF in under a minute.
            </p>
          </div>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-base font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
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

      {/* ===== FEATURES ===== */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-20" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-slate-900">
              What do you get with {SITE.name}?
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Built to be the fastest, cleanest way to create a professional receipt online.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="text-2xl" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3 className="mt-3 font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== USE CASES ===== */}
      <section className="border-t border-slate-100 py-14 sm:py-20" aria-labelledby="use-cases-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="use-cases-heading" className="text-3xl font-bold tracking-tight text-slate-900">
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
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
                >
                  <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700">
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
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== FREE TOOLS ===== */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-14 sm:py-20" aria-labelledby="tools-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="tools-heading" className="text-3xl font-bold tracking-tight text-slate-900">
              Free receipt tools
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Two calculators for the maths that comes before the receipt — no
              account, nothing to install.
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
          <h2 id="faq-heading" className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-6">
            {HOMEPAGE_FAQS.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
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
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Your receipt is 60 seconds away
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            No sign-up to start. 100+ templates. Just a clean, professional
            receipt ready to download.
          </p>
          <Link
            href="/create"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-indigo-700 shadow-xl transition-transform hover:scale-105"
          >
            Create Your Free Receipt
          </Link>
        </div>
      </section>
    </>
  );
}
