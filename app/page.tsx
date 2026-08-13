import Link from "next/link";
import { SITE } from "@/lib/site";
import HomeAiGenerator from "@/components/HomeAiGenerator";
import { TEMPLATES } from "@/lib/templates";
import { HOMEPAGE_FAQS } from "@/lib/faqs";
import type { ReceiptData } from "@/lib/types";
import { docFromReceiptData } from "@/lib/sections";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import { btn } from "@/components/ui/Button";
import Perforation from "@/components/ui/Perforation";
import Eyebrow from "@/components/ui/Eyebrow";
import LeaderRow from "@/components/ui/LeaderRow";

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
    title: "Live preview as you type",
    description:
      "Every field updates the receipt instantly. What you see is exactly what you download — no surprises.",
  },
  {
    title: "PDF & PNG export",
    description:
      "Download print-ready PDFs or crisp 3x-resolution PNG images. Perfect for expense reports and records.",
  },
  {
    title: "4 paper styles",
    description:
      "Thermal paper, clean white, invoice or digital email look — switch styles with one click to match any business.",
  },
  {
    title: "Private by design",
    description:
      "The builder runs in your browser, so what you type stays on your device. Only the optional AI generator and account saving send data.",
  },
  {
    title: "10 currencies & any tax",
    description:
      "USD, EUR, GBP, INR and more. Custom tax labels (VAT, GST), rates, discounts and tips — calculated automatically.",
  },
  {
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
    "40+ receipt templates and 350+ brand-style layouts",
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

      {/* ===== HERO =====
          The thesis: the product's own output, printing. The receipt feeds out
          of a terminal slot on load — the one animated moment on the page. */}
      <section className="stock-tooth relative overflow-hidden">
        <div className="relative mx-auto grid max-w-7xl items-start gap-14 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.05fr_auto] lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">
          <div>
            <Eyebrow>Free receipt maker</Eyebrow>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Make a receipt in{" "}
              <span className="bg-greenbar px-1.5 text-ledger">60 seconds</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Pick a template, edit the items, tax and payment details with a
              live preview, then download it as a PDF or PNG.
            </p>

            <HomeAiGenerator />

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/create" className={btn({ size: "lg", className: "w-full sm:w-auto" })}>
                Create your receipt
              </Link>
              <Link
                href="/templates"
                className={btn({ variant: "secondary", size: "lg", className: "w-full sm:w-auto" })}
              >
                Browse templates
              </Link>
            </div>

            <p className="mt-3 font-data text-xs text-ink-soft">
              Free to build and preview — no sign-up.
            </p>

            {/* The stats as a receipt subtotal block rather than three big
                numbers: same facts, stated in the product's own format. */}
            {/* `div` wrappers keep this a valid `dl` while letting each row use
                the leader layout. */}
            <dl className="mt-10 max-w-sm space-y-2.5 border-t border-rule pt-6 font-data text-sm text-ink-soft">
              <div className="leader">
                <dt>Templates</dt>
                <dd className="tabular-nums">100+</dd>
              </div>
              <div className="leader">
                <dt>Average build</dt>
                <dd className="tabular-nums">60 sec</dd>
              </div>
              <div className="leader">
                <dt>Price to start</dt>
                <dd className="tabular-nums text-ledger">$0.00</dd>
              </div>
            </dl>
          </div>

          {/* Printer: housing, slot, then the paper feeding out. */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-fit">
              <div aria-hidden="true" className="rounded-t-[4px] bg-ink px-3 py-2.5 shadow-md">
                <div className="h-[3px] w-full rounded-full bg-ground/30" />
              </div>
              <div className="paper-feed receipt-shadow origin-top">
                <ReceiptDocPaper doc={docFromReceiptData(DEMO_RECEIPT)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Perforation />

      {/* ===== TEMPLATES ===== */}
      <section className="bg-card py-16 sm:py-20" aria-labelledby="templates-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>Templates</Eyebrow>
          <div className="mt-5 max-w-2xl">
            <h2
              id="templates-heading"
              className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
            >
              Which receipt template do you need?
            </h2>
            <p className="mt-3 text-lg text-ink-soft">
              Every template comes pre-filled with realistic items and tax rates
              for its business type — so you only change what you need to.
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {TEMPLATES.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/templates/${t.slug}`}
                  className="group flex h-full flex-col rounded-[3px] border border-rule bg-ground p-5 transition-colors hover:border-ledger/45 hover:bg-greenbar/40"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {t.icon}
                  </span>
                  <span className="mt-3 font-medium text-ink group-hover:text-ledger">
                    {t.name}
                  </span>
                  <span className="mt-1 font-data text-xs text-ink-soft">
                    {t.defaults.items.length} sample items
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Perforation />

      {/* ===== HOW IT WORKS =====
          A real sequence, so the numbering carries information. Set as receipt
          line numbers rather than decorative circles. */}
      <section id="how-it-works" className="py-16 sm:py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>How it works</Eyebrow>
          <h2
            id="how-heading"
            className="mt-5 max-w-2xl font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            How to make a receipt in 3 steps
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">
            From blank page to downloaded PDF in under a minute.
          </p>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[3px] border border-rule bg-rule md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="bg-card p-6">
                <span className="font-data text-xs font-medium tracking-[0.2em] text-ledger">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Link href="/create" className={btn({ size: "lg" })}>
              Start building
            </Link>
          </div>
        </div>
      </section>

      <Perforation />

      {/* ===== FEATURES ===== */}
      <section className="bg-card py-16 sm:py-20" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Eyebrow>What you get</Eyebrow>
          <div className="mt-5 max-w-2xl">
            <h2
              id="features-heading"
              className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
            >
              What do you get with {SITE.name}?
            </h2>
            <p className="mt-3 text-lg text-ink-soft">
              Built to be the fastest, cleanest way to create a professional receipt online.
            </p>
          </div>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[3px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="bg-ground p-6">
                <h3 className="font-display text-base font-bold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Perforation />

      {/* ===== FEATURED ON / DIRECTORIES ===== */}
      {DIRECTORIES.length > 0 && (
        <section className="py-14 sm:py-16" aria-labelledby="directories-heading">
          <h2
            id="directories-heading"
            className="text-center font-display text-[11px] font-bold uppercase tracking-[0.22em] text-ink-soft"
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
                      className="inline-block opacity-80 transition-opacity hover:opacity-100"
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

      <Perforation />

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-16 sm:py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-rule border-y border-rule">
            {HOMEPAGE_FAQS.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-ink transition-colors hover:text-ledger [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-ink-soft transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA =====
          Closed like the bottom of a receipt: the price stated as a total line,
          then the action. The strongest argument this page has is "$0.00". */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-xl rounded-[3px] border border-rule bg-card p-8 text-center shadow-sm sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Your receipt is 60 seconds away
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">
            100+ templates, a live preview, and a PDF or PNG at the end of it.
          </p>

          <div className="mt-8 space-y-2 border-t border-rule pt-6 text-left font-data text-sm text-ink-soft">
            <LeaderRow label="Build and preview" value="$0.00" />
            <LeaderRow label="Templates" value="$0.00" />
            <LeaderRow
              label={<span className="font-bold uppercase tracking-wider text-ink">Total due</span>}
              value={<span className="font-bold text-ledger">$0.00</span>}
            />
          </div>

          <Link
            href="/create"
            className={btn({ size: "lg", className: "mt-8 w-full" })}
          >
            Create your receipt
          </Link>
          <p className="mt-3 font-data text-xs text-ink-soft">
            No sign-up to start building.
          </p>
        </div>
      </section>
    </>
  );
}
</content>
