/**
 * Data for the competitor comparison pages (/compare/[slug]) and the
 * alternatives roundup (/alternatives).
 *
 * FAIRNESS / ACCURACY RULES (read before editing):
 *  - Every claim about a competitor must be verifiable from their public site.
 *  - Where a competitor hides its prices behind a login or membership wall we
 *    say "membership; tiers not publicly listed" or "Not publicly available"
 *    rather than inventing a number.
 *  - Competitor pricing/features were verified as of PRICING_AS_OF. Re-check
 *    quarterly (skill: seo-competitor-pages) and bump LAST_UPDATED + the per
 *    competitor `updated` date when copy materially changes.
 *  - Acknowledge competitor strengths honestly; never make defamatory claims.
 */

import { SITE } from "./site";
import { BRAND_COUNT } from "./counts";
import { FREE_LIMITS, PLANS, formatPlanPrice, freeDownloadsPhrase } from "./plans";

// Rivals re-fetched live and the table re-verified on 2026-08-22 — ReceiptBaker's
// named-brand and no-signup rows were both wrong, and the ExpressExpense price
// was unsourced. A genuine review of the whole set, so the shared date moves
// rather than a per-competitor one. Stamped 08-23, the day the copy shipped.
// 2026-09-04: the Makecepeit row now reads its own figures from lib/plans.ts.
// It had been claiming "3/day free" AI generations since the allowance became
// 3 a month — a visible, wrong claim about our own free tier on the pages that
// exist to be trusted about who offers what.
export const LAST_UPDATED = "2026-09-04"; // ISO — shown as the page "last reviewed" date

/**
 * A per-entry review date, for when one competitor is re-checked on its own.
 *
 * MakeReceipt, 2026-09-05: this entry said its membership prices were not
 * published while the same page's FAQ quoted them, dated and sourced — so the
 * page contradicted itself, and five blog posts repeated the wrong half. The
 * prices now appear in the overview, the pricing block and the gaps list.
 * Nothing else on the page changed, so only this entry moves: restamping the
 * comparisons that were not re-read is what IndexNow reads as spam.
 */
const MAKERECEIPT_UPDATED = "2026-09-05";
export const PRICING_AS_OF = "August 2026"; // human-readable disclaimer on pricing tables

/* -------------------------------------------------------------------------- */
/*  Feature matrix                                                            */
/* -------------------------------------------------------------------------- */

export type CellState = "yes" | "no" | "partial";

export interface Cell {
  state: CellState;
  /** Short qualifier shown under the icon, e.g. "348 brands" or "Pro only". */
  note?: string;
}

const yes = (note?: string): Cell => ({ state: "yes", note });
const no = (note?: string): Cell => ({ state: "no", note });
const partial = (note?: string): Cell => ({ state: "partial", note });

export interface FeatureRow {
  id: string;
  label: string;
}

/** Row order of the feature matrix, shared by every comparison table. */
export const FEATURE_ROWS: FeatureRow[] = [
  { id: "free_start", label: "Free to start" },
  { id: "no_signup", label: "Build without an account" },
  { id: "live_preview", label: "Live preview while editing" },
  { id: "brand_templates", label: "Named-brand templates (Walmart, Target…)" },
  { id: "pdf_export", label: "PDF download" },
  { id: "image_export", label: "PNG / image download" },
  { id: "ai_generator", label: "AI receipt generator" },
  { id: "saved_history", label: "Saved receipt history" },
  { id: "watermark_free", label: "Watermark-free downloads" },
  { id: "transparent_pricing", label: "Public, transparent pricing" },
];

export type Cells = Record<string, Cell>;

/** The "us" column — Makecepeit. Kept accurate to lib/plans.ts. */
export const MAKECEPEIT = {
  name: SITE.name,
  domain: "makecepeit.com",
  url: SITE.url,
  startingPrice: "Free · Pro from $3/wk",
  cells: {
    free_start: yes("Build + first HD download free"),
    no_signup: yes("Build & preview, no signup"),
    live_preview: yes(),
    // Exact, not "350+": this is the dimension we win outright (348 vs their
    // 100+), and a rounded-up range read as a tie with ReceiptFaker.
    brand_templates: yes(`${BRAND_COUNT} brands`),
    pdf_export: yes(),
    image_export: yes("PNG at 3× resolution"),
    // Derived, not typed. This said "3/day free" for weeks after the free
    // allowance became 3 a *month* — an overstatement of our own free tier by
    // roughly thirty times, on the one page whose value depends entirely on
    // being accurate about who offers what.
    ai_generator: yes(`${FREE_LIMITS.aiGenerationsPerMonth}/month free, unlimited on Pro`),
    saved_history: yes("Pro"),
    watermark_free: partial(`${freeDownloadsPhrase()} free, then Pro from $${PLANS.pro_weekly.price}/wk`),
    transparent_pricing: yes(
      `${formatPlanPrice(PLANS.pro_weekly)}/wk · ${formatPlanPrice(PLANS.pro_monthly)}/mo · ${formatPlanPrice(PLANS.pro_yearly)}/yr`
    ),
  } as Cells,
} as const;

/* -------------------------------------------------------------------------- */
/*  Competitors with full "vs" pages                                          */
/* -------------------------------------------------------------------------- */

export interface Competitor {
  slug: string;
  name: string;
  domain: string;
  url: string;
  /** Direct link to the page a pricing claim came from, so a reader can check
   *  it. Null when the tool publishes no pricing page — itself a finding. */
  pricingUrl: string | null;
  /** One-line descriptor used in cards and the hub table. */
  tagline: string;

  // SEO
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** Unique intro paragraph — never boilerplate across pages. */
  intro: string;

  /** Fair 2–3 sentence overview of the competitor. */
  overview: string;
  /** Honest competitor strengths. */
  strengths: string[];
  /** Factual points where Makecepeit is stronger. */
  gaps: string[];

  pricing: {
    free: string;
    paid: string;
  };

  cells: Cells;

  /** Balanced recommendation. */
  verdict: string;
  chooseUs: string[];
  chooseThem: string[];

  faqs: { question: string; answer: string }[];
  updated: string; // ISO
}

export const COMPETITORS: Competitor[] = [
  {
    slug: "makereceipt",
    name: "MakeReceipt",
    domain: "makereceipt.com",
    url: "https://makereceipt.com",
    pricingUrl: null, // /pricing and /membership both 302 to the homepage
    tagline: "The long-established, membership-based receipt maker",
    seoTitle: "Makecepeit vs MakeReceipt: Which Receipt Maker Wins in 2026?",
    seoDescription:
      "Makecepeit vs MakeReceipt compared: pricing, templates, AI generation, PDF & PNG export and watermarks. See which free receipt maker fits your needs in 2026.",
    h1: "Makecepeit vs MakeReceipt",
    intro:
      `MakeReceipt is one of the oldest online receipt makers, with a broad template library and a membership model that removes watermarks. Makecepeit is a newer, AI-powered receipt maker with ${BRAND_COUNT} named-brand templates, transparent low pricing, and no signup to start building. Here is an honest, field-by-field comparison.`,
    overview:
      "MakeReceipt bills itself as the original online receipt maker. It offers 60+ category templates (restaurant, retail, gas, pharmacy, parking, taxi and more), multi-currency and multi-language support, and lets you create free receipts that carry a watermark until you join a paid membership. Its Standard, Pro and Enterprise tiers are priced on its sign-up page rather than a pricing page — $7.99, $12.79 and $39.99 a month when we read it on 2026-08-30.",
    strengths: [
      "One of the longest-running receipt makers, with strong brand recognition",
      "Multi-currency and multi-language (English, Spanish, Chinese, Hindi, Portuguese, French, Italian, German)",
      "Wide range of category templates with logo, font and detail editing",
    ],
    gaps: [
      "No AI receipt generator — every field is filled in by hand",
      `Fewer named-brand templates (Walmart, Target, CVS…) than Makecepeit's ${BRAND_COUNT}`,
      "Membership prices sit on the sign-up page, not a pricing page — its /pricing redirects away; Makecepeit publishes $3/wk, $7.99/mo, $49/yr up front",
    ],
    pricing: {
      free: "Free receipts available, but they carry a watermark until you upgrade.",
      paid: "Standard / Pro / Enterprise membership removes the watermark. Read on its sign-up page 2026-08-30: $7.99, $12.79 and $39.99 a month (list $9.99, $15.99, $49.99), with annual billing about 38% cheaper. Its /pricing and /membership paths redirect to the homepage.",
    },
    cells: {
      free_start: yes("Free, watermarked"),
      no_signup: partial("Account needed for membership"),
      live_preview: yes(),
      brand_templates: partial("60+ category templates"),
      pdf_export: yes("Download / print"),
      image_export: partial("Format not specified"),
      ai_generator: no(),
      saved_history: partial("Not stated"),
      watermark_free: partial("Paid membership only"),
      transparent_pricing: partial("Priced on the sign-up page, not a pricing page"),
    },
    verdict:
      `If you want a long-established tool with deep multi-language support, MakeReceipt is a proven option. But if you want AI-assisted receipts, ${BRAND_COUNT} specific brand templates, both PDF and PNG export, and pricing you can see before you commit, Makecepeit is the stronger, more transparent choice — and you can build a full receipt for free before spending anything.`,
    chooseUs: [
      "You want an AI generator to draft a receipt from a plain-text description",
      "You need a specific store's look (Walmart, Target, CVS, Starbucks…)",
      "You want to see exact prices up front and build without an account",
    ],
    chooseThem: [
      "You need eight-language localization out of the box",
      "You specifically want the oldest, most recognized receipt-maker brand",
    ],
    faqs: [
      {
        question: "Is Makecepeit a free alternative to MakeReceipt?",
        answer:
          "Yes. Building and previewing a receipt on Makecepeit needs no account at all, and a free account then gets your first HD download clean. MakeReceipt lets you make free receipts too, but they stay watermarked until you buy a membership.",
      },
      {
        question: "How much does MakeReceipt cost?",
        answer:
          "MakeReceipt sells Standard, Pro and Enterprise memberships. Its /pricing path redirects to the homepage, but the prices are public on its sign-up page — read there on 2026-08-30: $7.99, $12.79 and $39.99 a month, discounted from $9.99, $15.99 and $49.99, with annual billing about 38% cheaper. Standard is limited to basic receipt styles; all 60+ styles need Pro, and API and QuickBooks access need Enterprise. Makecepeit's Pro is $3/week, $7.99/month or $49/year with every template included.",
      },
      {
        question: "Does MakeReceipt have an AI receipt generator?",
        answer:
          "No. MakeReceipt receipts are filled in by hand. Makecepeit includes an AI generator that drafts a receipt from a short text description — three a month on a free account, unlimited on Pro.",
      },
    ],
    updated: MAKERECEIPT_UPDATED,
  },
  {
    slug: "receiptfaker",
    name: "ReceiptFaker",
    domain: "receiptfaker.com",
    url: "https://www.receiptfaker.com",
    pricingUrl: "https://www.receiptfaker.com/pricing",
    tagline: "A free, no-signup receipt maker with retailer templates",
    seoTitle: "Makecepeit vs ReceiptFaker: Best Free Receipt Maker in 2026?",
    seoDescription:
      "Makecepeit vs ReceiptFaker compared: free tiers, brand templates, AI generation, PDF & PNG export and legitimacy. Find the best free receipt maker for 2026.",
    h1: "Makecepeit vs ReceiptFaker",
    intro:
      "ReceiptFaker is a free, browser-based receipt maker with 100+ retailer templates and no signup to use. Makecepeit covers the same free, fast use case but adds an AI generator, saved receipt history, PDF and PNG export, and a record-keeping-first stance. Here is how the two compare, honestly.",
    overview:
      "ReceiptFaker offers 100+ templates for major retailers (Walmart, Target, CVS and more), works in the browser with no download, and is mobile-friendly. It is still free to use without an account, and since our July 2026 review it has also added weekly, monthly and yearly subscriptions whose selling points are removing watermarks and unlimited downloads. It carries prominent disclaimers that receipts are for legitimate business, creative and educational use only.",
    strengths: [
      "Free to use without an account",
      "100+ recognizable retailer templates",
      "No signup required and mobile-friendly",
    ],
    gaps: [
      "No AI receipt generator",
      "No saved receipt history or account features are stated",
      "Export formats (PDF vs image) are not clearly specified on the site",
    ],
    pricing: {
      free: "Still free to use without an account — the site markets itself as a free receipt generator.",
      paid: "Paid plans have appeared since our previous review: $6.50/week, $13.50/month or $60/year (list prices $9, $20 and $100), sold on removing watermarks and unlimited downloads.",
    },
    cells: {
      free_start: yes("Free to use"),
      no_signup: yes("No signup required"),
      live_preview: yes(),
      brand_templates: yes("100+ retailers"),
      pdf_export: partial("Format not specified"),
      image_export: partial("Format not specified"),
      ai_generator: no(),
      saved_history: no("Not stated"),
      watermark_free: partial("Paid plans sell watermark removal"),
      transparent_pricing: yes("Weekly, monthly and yearly prices listed"),
    },
    verdict:
      `For a quick, free receipt with no account, both tools do the job. Makecepeit pulls ahead when you want to draft receipts with AI, save and re-open your history, export as both PDF and PNG, or work from a library of ${BRAND_COUNT} specific brands. Makecepeit also leads with a legitimate record-keeping and design-mockup positioning rather than a 'fake' framing.`,
    chooseUs: [
      "You want an AI generator and saved receipt history",
      "You need reliable PDF and high-resolution PNG export",
      "You prefer a tool positioned around legitimate record-keeping",
    ],
    chooseThem: [
      "You only need a one-off free receipt and nothing else",
      "You want the simplest possible no-signup form",
    ],
    faqs: [
      {
        question: "Is Makecepeit better than ReceiptFaker?",
        answer:
          `They overlap on the free, no-signup basics. Makecepeit adds an AI generator, saved history, PDF plus PNG export, and ${BRAND_COUNT} named-brand templates, so it's the better fit if you need more than a single quick receipt.`,
      },
      {
        question: "Is ReceiptFaker free?",
        answer:
          "Yes for basic use — it still offers a free generator with no sign-up. Since our previous review it has also added subscriptions ($6.50/week, $13.50/month or $60/year) whose selling points are removing watermarks and unlimited downloads. Makecepeit is also free to build and preview, with your first HD download free before Pro.",
      },
      {
        question: "Are these receipts legal?",
        answer:
          "Making a receipt is legal for legitimate purposes such as replacing a lost receipt, expense records, bookkeeping and design mockups. Using any receipt maker to defraud a business or person is illegal. Both tools state legitimate-use-only terms.",
      },
    ],
    updated: LAST_UPDATED,
  },
  {
    slug: "receiptbaker",
    name: "ReceiptBaker",
    domain: "receiptbaker.com",
    url: "https://receiptbaker.com",
    pricingUrl: "https://receiptbaker.com/pricing",
    tagline: "An AI-enabled receipt generator with a content blog",
    seoTitle: "Makecepeit vs ReceiptBaker: AI Receipt Maker Comparison 2026",
    seoDescription:
      "Makecepeit vs ReceiptBaker compared: AI receipt generation, templates, pricing transparency, PDF & PNG export. See which receipt maker to pick in 2026.",
    h1: "Makecepeit vs ReceiptBaker",
    intro:
      `ReceiptBaker is a receipt generator that offers an AI receipt tool, a custom receipt maker and a content blog covering topics like rental receipts. Makecepeit also offers AI generation, plus ${BRAND_COUNT} named-brand templates and pricing you can see before you buy. Here is a fair, side-by-side look.`,
    overview:
      "ReceiptBaker provides a receipt generator, an AI receipt generator, a custom receipt maker and a template library, alongside an active blog (how-to guides, rental payment receipts and more). Its pricing page renders prices in the browser rather than in the served HTML, which is why an earlier automated check came back empty; read in a browser on 2026-08-30 it lists three tiers — Basic, Pro and Studio — on a weekly or monthly period, each metering how many AI generations and photorealistic renders you get.",
    strengths: [
      "Offers an AI receipt generator and a custom receipt maker",
      "Active blog with practical guides (e.g. rental receipts for landlords and tenants)",
      "Covers niche receipt types such as rent and rental receipts",
    ],
    gaps: [
      "Every paid tier meters AI — 30, 45 or 50 generations a month, and Basic gets no photorealistic renders at all",
      `No named-brand template pages — category templates only, against Makecepeit's ${BRAND_COUNT}`,
      "Export formats are not clearly specified",
    ],
    pricing: {
      free: "No free tier appears on the pricing page. Paid plans are sold on removing the watermark, which implies free generation carries one.",
      paid: "Three tiers, weekly or monthly. Monthly: Basic $8.75, Pro $14.70, Studio $22.40 (list $12.50, $21.00, $32.00 — a 30% discount was running when we checked). Weekly: $3.50, $5.95, $8.75 (list $5.00, $8.50, $12.50). Every tier caps AI generation — 30, 45 and 50 a month, or 8, 10 and 15 a week — and Basic includes no photorealistic renders; Pro gets 25 a month and Studio 45.",
    },
    cells: {
      free_start: partial("No free tier on pricing page"),
      // Both corrected 2026-08-22 against their live site. "Not confirmed" was
      // wrong — their homepage states "No signup required". And they carry no
      // named-brand templates at all, only category ones, so marking this row
      // yes gave away the one row we win outright.
      no_signup: yes("No signup required"),
      live_preview: yes(),
      brand_templates: no("Category templates only, no named brands"),
      pdf_export: partial("Format not specified"),
      image_export: partial("Format not specified"),
      ai_generator: yes("AI receipt generator"),
      saved_history: partial("Not stated"),
      watermark_free: partial("Paid plans remove it"),
      transparent_pricing: yes("Three tiers listed, weekly or monthly"),
    },
    verdict:
      `Both Makecepeit and ReceiptBaker offer AI receipt generation, so this comes down to how much you get and what it costs. ReceiptBaker meters every tier — its cheapest, Basic at $8.75 a month, allows 30 AI generations and no photorealistic renders. Makecepeit is $7.99 a month for unlimited AI generation, is free to build and preview without an account, and offers ${BRAND_COUNT} specific brand templates with PDF and PNG export. ReceiptBaker is worth a look if its blog, rental-receipt templates or photorealistic renders match your niche.`,
    chooseUs: [
      "You want AI generation and pricing you can see before committing",
      `You need a specific brand's receipt from a ${BRAND_COUNT}-template library`,
      "You want unlimited AI generation rather than a monthly quota",
    ],
    chooseThem: [
      "You specifically want its rental/rent-receipt guides and templates",
      "You rely on its blog content for how-to guidance",
    ],
    faqs: [
      {
        question: "Do both Makecepeit and ReceiptBaker have AI receipt generators?",
        answer:
          "Yes. Both offer AI-assisted receipt generation. Makecepeit's AI is free for three receipts a month and unlimited on Pro, with prices published on the pricing page.",
      },
      {
        question: "How much does ReceiptBaker cost?",
        answer:
          "Read on 2026-08-30, it runs three tiers on a weekly or monthly period, with no free tier shown. Monthly: Basic $8.75, Pro $14.70, Studio $22.40 (list $12.50, $21.00 and $32.00 — a 30% discount was running). Every tier caps AI generation at 30, 45 or 50 a month, and Basic includes no photorealistic renders. Makecepeit's Pro is $3/week, $7.99/month or $49/year with unlimited AI generation.",
      },
      {
        question: "Which has more brand templates?",
        answer:
          `Makecepeit offers ${BRAND_COUNT} named-brand templates. ReceiptBaker's library is organised by receipt category rather than by retailer, so it carries no named-brand templates — checked against their live site on 22 August 2026.`,
      },
    ],
    updated: LAST_UPDATED,
  },
];

export function competitorBySlug(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

/* -------------------------------------------------------------------------- */
/*  Other well-known alternatives — lighter cards on the /alternatives hub    */
/*  (no full "vs" page yet). Kept factual, with public pricing where known.   */
/* -------------------------------------------------------------------------- */

export interface OtherAlternative {
  name: string;
  url: string;
  blurb: string;
  pricing: string;
  bestFor: string;
}

export const OTHER_ALTERNATIVES: OtherAlternative[] = [
  {
    name: "Receiptmakerly",
    url: "https://receiptmakerly.com",
    blurb:
      "A polished receipt maker with custom fonts and a wide style library. Subscription-only — there is no free tier listed.",
    pricing: "$8.90/mo or $47/yr (no free tier)",
    bestFor: "Users who want custom fonts and don't mind a paid-only tool.",
  },
  {
    name: "ExpressExpense",
    url: "https://expressexpense.com",
    blurb:
      "A receipt maker with iOS and Android apps and a free receipt format. Full access is a membership after a short free trial.",
    // The "$9–$49/mo" range that used to sit here had no source, on a page that
    // promises every figure links to one. Rechecked 2026-08-22: their /pricing
    // and /membership both 302 to the homepage, so no price is publicly
    // quotable. Say that, rather than repeat an unsourced number.
    pricing: "Free receipt format + 3-day trial; membership price not published (checked 22 Aug 2026)",
    bestFor: "Users who want native mobile apps alongside the web tool.",
  },
];
