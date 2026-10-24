import type { Metadata } from "next";
import {
  PLANS,
  FREE_LIMITS,
  monthlyEquivalent,
  formatPlanPrice,
  freeAiPhrase,
  freeStylingPhrase,
} from "@/lib/plans";
import { BRAND_TEMPLATES } from "@/lib/brands";
import { docFromReceiptData } from "@/lib/sections";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import Watermark from "@/components/receipt/Watermark";
import type { ReceiptData } from "@/lib/types";
import { absoluteUrl, SITE } from "@/lib/site";
import { stripeConfigured } from "@/lib/stripe";
import PricingCta from "./PricingCta";
import FreePlanCta from "./FreePlanCta";
import Link from "next/link";
import NewAccountBanner from "./NewAccountBanner";
import PricingViewed from "./PricingViewed";
import CheckoutNotice from "./CheckoutNotice";

const PRICING_TITLE = `Pricing — Remove the Watermark with ${SITE.name} Pro`;
const PRICING_DESCRIPTION =
  "Create receipts free with a watermark, or go Pro for watermark-free HD downloads, unlimited AI receipt generation and saved history. Weekly, monthly or yearly.";

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

/**
 * The plan grid, described once as data.
 *
 * Every card carries its full feature list rather than the four shared lines
 * sitting in a band underneath — comparing what you get is the job of this page,
 * and a buyer should not have to scroll past the cards to find out.
 *
 * `has` is the truth table. It is deliberately explicit per plan rather than
 * inherited ("everything in Free, plus…"), because inheritance is what let the
 * old feature arrays drift: lib/plans.ts still gives priority support to
 * monthly and yearly but not weekly, and a chain of cross-references hid that
 * instead of showing it.
 */
type PlanRow = {
  id: "free" | "pro_weekly" | "pro_monthly" | "pro_yearly";
  label: string;
  unit: string;
  access: string;
  cta: string;
  /** Free-tier caps read as text; unlimited plans say so. */
  /** The bolded quantity: "1", "Unlimited". */
  downloads: string;
  /** The noun after it, already singular or plural to match. */
  downloadsNoun: string;
  /** Watermark-free downloads, for the comparison table. */
  clean: string;
  ai: string;
  brands: string;
  styling: string;
  saveTemplates: boolean;
  support: boolean;
};

/**
 * Brand-template wording. Every brand template is on every plan, free
 * included (2026-10-24): the only thing Pro changes about a download is the
 * watermark.
 *
 * The real count, read from the catalogue, so it cannot go stale. It used to be
 * "300+" for that reason, which undersold the 350-odd templates every other
 * page names.
 */
const BRANDS_LABEL = `${BRAND_TEMPLATES.length} brand templates`;



const PLAN_ROWS: PlanRow[] = [
  {
    id: "free",
    label: "Free",
    unit: "forever",
    access: "Forever",
    cta: "Start free",
    // Every free download is watermarked, logged in or not; there is no
    // watermark-free allowance. The table's "Watermark-free downloads" row
    // reads `clean`, not this.
    downloads: "Unlimited",
    downloadsNoun: "watermarked downloads",
    clean: "None",
    ai: `${FREE_LIMITS.aiGenerationsPerMonth} a month`,
    brands: BRANDS_LABEL,
    styling: freeStylingPhrase(),
    saveTemplates: false,
    support: false,
  },
  {
    id: "pro_weekly",
    label: "7-day pass",
    unit: "one week",
    access: "7 days",
    cta: "Get 7 days",
    downloads: "Unlimited",
    downloadsNoun: "watermark-free downloads",
    clean: "Unlimited",
    ai: "Unlimited",
    brands: BRANDS_LABEL,
    styling: "All 32 fonts · 3 paper styles",
    saveTemplates: true,
    support: false,
  },
  {
    id: "pro_monthly",
    label: "Monthly",
    unit: "per month",
    access: "30 days",
    cta: "Go monthly",
    downloads: "Unlimited",
    downloadsNoun: "watermark-free downloads",
    clean: "Unlimited",
    ai: "Unlimited",
    brands: BRANDS_LABEL,
    styling: "All 32 fonts · 3 paper styles",
    saveTemplates: true,
    support: true,
  },
  {
    id: "pro_yearly",
    label: "Yearly",
    unit: "per year",
    access: "12 months",
    cta: "Go yearly",
    downloads: "Unlimited",
    downloadsNoun: "watermark-free downloads",
    clean: "Unlimited",
    ai: "Unlimited",
    brands: BRANDS_LABEL,
    styling: "All 32 fonts · 3 paper styles",
    saveTemplates: true,
    support: true,
  },
];

/**
 * The paid plans, which are the cards. Free stays a column in the comparison
 * table and gets its own line under it: building and watermarked downloads need
 * no plan at all since 2026-10-24, so a Free card only competed with the choice
 * the page exists for.
 */
const PAID_ROWS = PLAN_ROWS.filter((r) => r.id !== "free");

/** Most checkout starts pick the 7-day pass (36 of 44, Sep–Oct 2026). */
const MOST_POPULAR = "pro_weekly";

/** Rows every plan shares. Brand templates, fonts and paper styles moved out —
 *  they differ by plan now, so they are columns in the table rather than a
 *  shared list. */
const SHARED_FEATURES = [
  "PNG, JPG, PDF, print-PDF",
  "Logo, barcode, custom sections",
] as const;

const FAQ = [
  {
    q: "What's the difference between Free and Pro?",
    // Every number here is read from the same constants the plan table reads,
    // rather than typed out. The old version said "3 AI generations a month, 3
    // fonts and one paper style, and 50 of the brand templates; the other 298
    // need Pro" — four counts hand-written into one sentence, in the answer
    // that exists specifically to state them accurately.
    a: `Free gives you the whole receipt builder and all ${BRAND_TEMPLATES.length} brand templates with no sign-up, and you can download as PDF, PNG or JPG with a small watermark. A free account adds ${freeAiPhrase()}; free styling is ${freeStylingPhrase().replace(" · ", " and ")}. Pro removes the watermark on every download and unlocks HD exports, unlimited AI generation, all 32 fonts, all three paper styles, saved receipt history and your own saved templates, from ${formatPlanPrice(PLANS.pro_weekly)} for 7 days.`,
  },
  {
    q: "Can I cancel anytime?",
    a: `Yes — and in most cases there is nothing to cancel. Pro is a pass that runs for the period you bought and then stops on its own: there is no auto-renewal and no recurring charge, so you are never locked in. Your end date is shown on your account page. If you subscribed through a card subscription rather than a one-off pass, Manage billing on that page opens the billing portal, where you can end it yourself at any time. For anything else — stopping a future charge or asking for a refund — email ${SITE.email} and we'll sort it within one business day.`,
  },
  // Only while Stripe is the rail: the Shopify fallback takes different
  // methods and is fulfilled by hand, so these answers would be wrong for it.
  ...(stripeConfigured
    ? [
        {
          q: "How do I pay, and how fast does Pro switch on?",
          a: "Checkout is handled by Stripe. You can pay by card (Visa, Mastercard, American Express) or with Apple Pay, Google Pay or Link where your device supports them. Pro switches on automatically within seconds of the payment going through. If you are signed in, it attaches to that account. You do not need an account to buy: Pro goes on the email you enter at checkout, and if that email already has an account the pass is added to it. We never see or store your card details.",
        },
        {
          q: "Can I switch plans?",
          a: "Yes. Moving to a longer plan — weekly to monthly or yearly, or monthly to yearly — starts it straight away and keeps every day left on your current pass. Buying the same plan again adds another period after the current one ends. A shorter plan becomes available again once your current pass ends.",
        },
      ]
    : []),
  {
    q: "Do I need an account?",
    a: `No. Building, previewing and downloading with a watermark need no account, and neither does buying Pro. A free account adds ${freeAiPhrase()}.`,
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

/** A ✓ / ✗ mark. aria-hidden — the row label already carries the meaning, and
 *  the sr-only word is what a screen reader should hear instead of "check mark". */
function Tick({ yes }: { yes: boolean }) {
  return (
    <>
      <span aria-hidden className={yes ? "font-bold text-emerald-600" : "text-slate-300"}>
        {yes ? "✓" : "✗"}
      </span>
      <span className="sr-only">{yes ? "Included" : "Not included"}</span>
    </>
  );
}

/** One line in a plan card. */
function Feature({ yes = true, children }: { yes?: boolean; children: React.ReactNode }) {
  return (
    <li className={`flex gap-2 ${yes ? "" : "text-slate-400"}`}>
      <span aria-hidden className={yes ? "text-emerald-600" : "text-slate-300"}>
        {yes ? "✓" : "✗"}
      </span>
      <span>
        {children}
        <span className="sr-only">{yes ? " — included" : " — not included"}</span>
      </span>
    </li>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      {/* Sticky so the feature name stays on screen while a phone scrolls the
          plan columns sideways — otherwise every tick loses its label. */}
      <th
        scope="row"
        className="sticky left-0 z-10 max-w-[9.5rem] bg-white px-4 py-2.5 text-left font-normal text-slate-600 sm:max-w-none"
      >
        {label}
      </th>
      {children}
    </tr>
  );
}

function Cell({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <td
      className={`px-4 py-2.5 tabular-nums ${strong ? "font-semibold text-slate-900" : "text-slate-700"}`}
    >
      {children}
    </td>
  );
}

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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <PricingViewed />
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
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Simple, honest pricing
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          Start free. Upgrade when you need watermark-free, professional receipts.
        </p>
      </div>

      {/* The free tier has four distinct states and they were previously only
          explained in prose scattered across the hero, /create and the FAQ.
          Stating them once, in order, is what lets those places stop. */}
      <ol className="mx-auto mt-10 max-w-2xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {[
          { step: "Build and preview", detail: "No account needed", free: true },
          { step: "Download", detail: "Free with a small watermark, no account", free: false },
          { step: "Free account", detail: freeAiPhrase(), free: true },
          {
            step: "Pro",
            detail: `Watermark-free HD downloads, from ${formatPlanPrice(PLANS.pro_weekly)}`,
            free: true,
          },
        ].map((row) => (
          <li
            key={row.step}
            className="flex flex-col gap-0.5 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3.5"
          >
            <span className="text-sm font-medium text-slate-900">{row.step}</span>
            <span
              className={`text-sm sm:text-right ${row.free ? "font-medium text-indigo-600" : "text-slate-500"}`}
            >
              {row.detail}
            </span>
          </li>
        ))}
      </ol>

      {/* Three paid passes. Free is not a card any more (2026-10-24): building
          and watermarked downloads need no plan, so it is explained in the
          steps above and offered again under the comparison table.

          Each card carries the whole feature list even though the three are
          nearly identical. Tried once as a single shared list above the cards
          (2026-10-24) and reverted the same day at the owner's call: a buyer
          reads what they get on the card they click, and the repeated lines are
          also what search engines and AI answers quote about each plan. Every
          price carries its monthly equivalent, so $3 / $7.99 / $49 do not read
          as a rising ladder when per month they fall. */}
      {/* Three columns from md, not sm: at 640px each card got ~190px for a
          dozen feature lines and the CTA labels wrapped. Stacked cards get a
          wider gap so the "Best value" badge clears the card above it. */}
      <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:mt-12 md:grid-cols-3 md:gap-4">
        {PAID_ROWS.map((row) => {
          const plan = PLANS[row.id as Exclude<PlanRow["id"], "free">];
          const perMonth = monthlyEquivalent(plan);
          const best = row.id === "pro_yearly";
          const popular = row.id === MOST_POPULAR;
          return (
            <div
              key={row.id}
              className={`relative flex flex-col rounded-2xl bg-white p-6 ${
                best ? "border-2 border-indigo-600 shadow-md" : "border border-slate-200"
              }`}
            >
              {best && (
                <span className="absolute -top-3 left-6 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  Best value
                </span>
              )}
              {popular && (
                <span className="absolute -top-3 left-6 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  Most popular
                </span>
              )}
              <h2 className="text-base font-semibold text-slate-900">{row.label}</h2>
              <p className="mt-3 text-3xl font-bold tabular-nums text-slate-900">${plan.price}</p>
              <p className="text-sm text-slate-500">{row.unit}</p>
              <p className="mt-1 min-h-5 text-xs text-slate-600">
                {perMonth !== null && (
                  <>
                    <span className="font-semibold tabular-nums text-slate-900">
                      ${perMonth.toFixed(2)}
                    </span>{" "}
                    a month
                  </>
                )}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-slate-600">
                <Feature yes>
                  <strong className="font-semibold text-slate-900">{row.downloads}</strong>{" "}
                  {row.downloadsNoun}
                </Feature>
                <Feature yes>
                  <strong className="font-semibold text-slate-900">{row.ai}</strong> AI generations
                </Feature>
                <Feature yes>{row.brands}</Feature>
                <Feature yes>{row.styling}</Feature>
                <Feature yes={row.saveTemplates}>Save your own templates</Feature>
                <Feature yes={row.saveTemplates}>Saved receipt history</Feature>
                {SHARED_FEATURES.map((f) => (
                  <Feature key={f} yes>
                    {f}
                  </Feature>
                ))}
                <Feature yes={row.support}>Priority support</Feature>
              </ul>

              <PricingCta
                planId={row.id as Exclude<PlanRow["id"], "free">}
                className={`mt-6 flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors ${
                  best
                    ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                    : "border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
                label={row.cta}
              />

              {/* Under the CTA because that is where "am I locking myself in?"
                  gets asked. A pass runs for the period bought and stops on its
                  own; app/terms/page.tsx says the same. */}
              <p className="mt-3 text-center text-xs text-slate-500">
                {stripeConfigured
                  ? "Secure payment by Stripe · no auto-renewal"
                  : "Cancel anytime — no auto-renewal"}
              </p>
            </div>
          );
        })}
      </div>

      {/* The same information as a grid. Cards are for deciding; a table is the
          fastest way to read four options against each other, which is what a
          pricing page is actually for. Scrolls horizontally rather than letting
          the page do it. */}
      <section aria-labelledby="compare-heading" className="mt-10">
        <h2 id="compare-heading" className="text-lg font-semibold text-slate-900">
          Compare every plan
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <caption className="sr-only">
              Feature comparison across the free plan and the three Pro periods
            </caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-900"
                >
                  Feature
                </th>
                {PLAN_ROWS.map((r) => (
                  <th
                    key={r.id}
                    scope="col"
                    className={`px-4 py-3 text-left font-semibold ${
                      r.id === "pro_yearly" ? "text-indigo-700" : "text-slate-900"
                    }`}
                  >
                    {r.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <Row label="Price">
                {PLAN_ROWS.map((r) => {
                  const plan = r.id === "free" ? PLANS.free : PLANS[r.id];
                  return (
                    <Cell key={r.id} strong>
                      ${plan.price}
                    </Cell>
                  );
                })}
              </Row>
              <Row label="Per month">
                {PLAN_ROWS.map((r) => {
                  const plan = r.id === "free" ? PLANS.free : PLANS[r.id];
                  const pm = monthlyEquivalent(plan);
                  return <Cell key={r.id}>{pm === null ? "—" : `$${pm.toFixed(2)}`}</Cell>;
                })}
              </Row>
              <Row label="Access">
                {PLAN_ROWS.map((r) => (
                  <Cell key={r.id}>{r.access}</Cell>
                ))}
              </Row>
              <Row label="Watermark-free downloads">
                {PLAN_ROWS.map((r) => (
                  <Cell key={r.id}>{r.clean}</Cell>
                ))}
              </Row>
              <Row label="AI generations">
                {PLAN_ROWS.map((r) => (
                  <Cell key={r.id}>{r.ai}</Cell>
                ))}
              </Row>
              <Row label="Brand templates">
                {PLAN_ROWS.map((r) => (
                  <Cell key={r.id}>{r.brands}</Cell>
                ))}
              </Row>
              <Row label="Fonts &amp; paper styles">
                {PLAN_ROWS.map((r) => (
                  <Cell key={r.id}>{r.styling}</Cell>
                ))}
              </Row>
              <Row label="Save your own templates">
                {PLAN_ROWS.map((r) => (
                  <Cell key={r.id}>
                    <Tick yes={r.saveTemplates} />
                  </Cell>
                ))}
              </Row>
              <Row label="Saved receipt history">
                {PLAN_ROWS.map((r) => (
                  <Cell key={r.id}>
                    <Tick yes={r.saveTemplates} />
                  </Cell>
                ))}
              </Row>
              {SHARED_FEATURES.map((f) => (
                <Row key={f} label={f}>
                  {PLAN_ROWS.map((r) => (
                    <Cell key={r.id}>
                      <Tick yes />
                    </Cell>
                  ))}
                </Row>
              ))}
              <Row label="Priority support">
                {PLAN_ROWS.map((r) => (
                  <Cell key={r.id}>
                    <Tick yes={r.support} />
                  </Cell>
                ))}
              </Row>
            </tbody>
          </table>
        </div>
      </section>

      {/* The free offer, after the table rather than as a card: it is not a
          plan anyone has to pick. Two ways in — straight to the builder, which
          needs nothing, or a free account for the AI allowance. */}
      <section
        aria-labelledby="free-heading"
        className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 text-center"
      >
        <h2 id="free-heading" className="text-base font-semibold text-slate-900">
          Not ready for Pro?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Building, previewing and watermarked downloads are free, with no account. Want AI? A free
          account gives you {freeAiPhrase()}.
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login?signup=1&next=/create"
            className="flex min-h-11 items-center justify-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Sign up free
          </Link>
          <FreePlanCta
            label="Open the receipt maker"
            className="flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          />
        </div>
      </section>

      {/* With Stripe a signed-in buyer's account is attached to the checkout
          itself, and a guest's pass goes on the checkout email; either way Pro
          switches on by itself. The old "use the same email" warning is only true of the
          Shopify fallback, which is matched by hand. */}
      {stripeConfigured ? (
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center">
          <p className="text-sm font-semibold text-slate-900">
            <span aria-hidden="true">🔒 </span>Secure checkout by Stripe
          </p>
          <ul
            aria-label="Accepted payment methods"
            className="mt-3 flex flex-wrap justify-center gap-2 text-xs font-medium text-slate-700"
          >
            {["Visa", "Mastercard", "American Express", "Apple Pay", "Google Pay", "Link"].map(
              (method) => (
                <li key={method} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">
                  {method}
                </li>
              )
            )}
          </ul>
          <p className="mt-3 text-sm text-slate-600">
            Pro switches on automatically the moment your payment goes through. One-time
            payment — nothing renews, and we never see your card details.
          </p>
        </div>
      ) : (
        <p className="mx-auto mt-8 max-w-xl rounded-xl bg-amber-50 px-4 py-3 text-center text-sm text-amber-800">
          💡 Please check out using the <strong>same email you sign in with</strong> — that&apos;s how
          we match your payment and activate Pro on your account.
        </p>
      )}

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
          Every free download carries the watermark below. Pro downloads are clean.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <figure>
            <div className="relative mx-auto w-fit overflow-hidden rounded-xl">
              <ReceiptDocPaper doc={WATERMARK_DEMO_DOC} />
              <Watermark />
            </div>
            <figcaption className="mt-3 text-center text-sm text-slate-500">
              A free download
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
    </div>
  );
}
