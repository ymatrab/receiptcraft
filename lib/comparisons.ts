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

export const LAST_UPDATED = "2026-07-31"; // ISO — shown as the page "last reviewed" date
export const PRICING_AS_OF = "July 2026"; // human-readable disclaimer on pricing tables

/* -------------------------------------------------------------------------- */
/*  Feature matrix                                                            */
/* -------------------------------------------------------------------------- */

export type CellState = "yes" | "no" | "partial";

export interface Cell {
  state: CellState;
  /** Short qualifier shown under the icon, e.g. "350+ brands" or "Pro only". */
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
    free_start: yes("Build + first 3 HD downloads free"),
    no_signup: yes("Build & preview, no signup"),
    live_preview: yes(),
    brand_templates: yes("350+ brands"),
    pdf_export: yes(),
    image_export: yes("PNG at 3× resolution"),
    ai_generator: yes("3/day free, unlimited on Pro"),
    saved_history: yes("Pro"),
    watermark_free: partial("3 free, then Pro from $3/wk"),
    transparent_pricing: yes("$3/wk · $7.99/mo · $39/yr"),
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
    tagline: "The long-established, membership-based receipt maker",
    seoTitle: "Makecepeit vs MakeReceipt: Which Receipt Maker Wins in 2026?",
    seoDescription:
      "Makecepeit vs MakeReceipt compared: pricing, templates, AI generation, PDF & PNG export and watermarks. See which free receipt maker fits your needs in 2026.",
    h1: "Makecepeit vs MakeReceipt",
    intro:
      "MakeReceipt is one of the oldest online receipt makers, with a broad template library and a membership model that removes watermarks. Makecepeit is a newer, AI-powered receipt maker with 350+ named-brand templates, transparent low pricing, and no signup to start building. Here is an honest, field-by-field comparison.",
    overview:
      "MakeReceipt bills itself as the original online receipt maker. It offers 60+ category templates (restaurant, retail, gas, pharmacy, parking, taxi and more), multi-currency and multi-language support, and lets you create free receipts that carry a watermark until you join a paid membership. Its Standard, Pro and Enterprise tiers are referenced on the site but exact prices are not published publicly.",
    strengths: [
      "One of the longest-running receipt makers, with strong brand recognition",
      "Multi-currency and multi-language (English, Spanish, Chinese, Hindi, Portuguese, French, Italian, German)",
      "Wide range of category templates with logo, font and detail editing",
    ],
    gaps: [
      "No AI receipt generator — every field is filled in by hand",
      "Fewer named-brand templates (Walmart, Target, CVS…) than Makecepeit's 350+",
      "Exact membership prices are not listed publicly; Makecepeit publishes $3/wk, $7.99/mo, $39/yr",
    ],
    pricing: {
      free: "Free receipts available, but they carry a watermark until you upgrade.",
      paid: "Standard / Pro / Enterprise membership removes the watermark. Exact tier prices are not published publicly on the site (membership required to view).",
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
      transparent_pricing: no("Tiers not listed publicly"),
    },
    verdict:
      "If you want a long-established tool with deep multi-language support, MakeReceipt is a proven option. But if you want AI-assisted receipts, 350+ specific brand templates, both PDF and PNG export, and pricing you can see before you commit, Makecepeit is the stronger, more transparent choice — and you can build a full receipt for free before spending anything.",
    chooseUs: [
      "You want an AI generator to draft a receipt from a plain-text description",
      "You need a specific store's look (Walmart, Target, CVS, Starbucks…)",
      "You want to see exact prices up front and start free with no signup",
    ],
    chooseThem: [
      "You need eight-language localization out of the box",
      "You specifically want the oldest, most recognized receipt-maker brand",
    ],
    faqs: [
      {
        question: "Is Makecepeit a free alternative to MakeReceipt?",
        answer:
          "Yes. You can build and preview a receipt on Makecepeit with no signup, and your first three HD downloads are free. MakeReceipt lets you make free receipts too, but they stay watermarked until you buy a membership.",
      },
      {
        question: "How much does MakeReceipt cost?",
        answer:
          "MakeReceipt offers Standard, Pro and Enterprise memberships that remove the watermark, but it does not publish exact tier prices publicly on its site (as of July 2026). Makecepeit's Pro is publicly listed at $3/week, $7.99/month or $39/year.",
      },
      {
        question: "Does MakeReceipt have an AI receipt generator?",
        answer:
          "No. MakeReceipt receipts are filled in by hand. Makecepeit includes an AI generator that drafts a receipt from a short text description — free for three receipts a day, unlimited on Pro.",
      },
    ],
    updated: LAST_UPDATED,
  },
  {
    slug: "receiptfaker",
    name: "ReceiptFaker",
    domain: "receiptfaker.com",
    url: "https://www.receiptfaker.com",
    tagline: "A free, no-signup receipt maker with retailer templates",
    seoTitle: "Makecepeit vs ReceiptFaker: Best Free Receipt Maker in 2026?",
    seoDescription:
      "Makecepeit vs ReceiptFaker compared: free tiers, brand templates, AI generation, PDF & PNG export and legitimacy. Find the best free receipt maker for 2026.",
    h1: "Makecepeit vs ReceiptFaker",
    intro:
      "ReceiptFaker is a free, browser-based receipt maker with 100+ retailer templates and no signup to use. Makecepeit covers the same free, fast use case but adds an AI generator, saved receipt history, PDF and PNG export, and a record-keeping-first stance. Here is how the two compare, honestly.",
    overview:
      "ReceiptFaker offers 100+ templates for major retailers (Walmart, Target, CVS and more), works in the browser with no download, and is mobile-friendly. It presents itself as free to use with no paid tiers listed, and carries prominent disclaimers that receipts are for legitimate business, creative and educational use only.",
    strengths: [
      "Genuinely free with no paid tiers listed",
      "100+ recognizable retailer templates",
      "No signup required and mobile-friendly",
    ],
    gaps: [
      "No AI receipt generator",
      "No saved receipt history or account features are stated",
      "Export formats (PDF vs image) are not clearly specified on the site",
    ],
    pricing: {
      free: "Free to use, with no paid tiers listed on the site.",
      paid: "No paid plans are publicly listed (as of July 2026).",
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
      watermark_free: yes("No watermark stated"),
      transparent_pricing: partial("Free; no paid tiers listed"),
    },
    verdict:
      "For a quick, free receipt with no account, both tools do the job. Makecepeit pulls ahead when you want to draft receipts with AI, save and re-open your history, export as both PDF and PNG, or work from a library of 350+ specific brands. Makecepeit also leads with a legitimate record-keeping and design-mockup positioning rather than a 'fake' framing.",
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
          "They overlap on the free, no-signup basics. Makecepeit adds an AI generator, saved history, PDF plus PNG export, and 350+ named-brand templates, so it's the better fit if you need more than a single quick receipt.",
      },
      {
        question: "Is ReceiptFaker free?",
        answer:
          "Yes, ReceiptFaker is free to use with no paid tiers listed on its site as of July 2026. Makecepeit is also free to build and preview, with your first three HD downloads free before Pro.",
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
    tagline: "An AI-enabled receipt generator with a content blog",
    seoTitle: "Makecepeit vs ReceiptBaker: AI Receipt Maker Comparison 2026",
    seoDescription:
      "Makecepeit vs ReceiptBaker compared: AI receipt generation, templates, pricing transparency, PDF & PNG export. See which receipt maker to pick in 2026.",
    h1: "Makecepeit vs ReceiptBaker",
    intro:
      "ReceiptBaker is a receipt generator that offers an AI receipt tool, a custom receipt maker and a content blog covering topics like rental receipts. Makecepeit also offers AI generation, plus 350+ named-brand templates and pricing you can see before you buy. Here is a fair, side-by-side look.",
    overview:
      "ReceiptBaker provides a receipt generator, an AI receipt generator, a custom receipt maker and a template library, alongside an active blog (how-to guides, rental payment receipts and more). Its pricing is not publicly retrievable — the site blocks automated access and its pricing page did not load during our review — so we mark paid tiers as not publicly available rather than guessing.",
    strengths: [
      "Offers an AI receipt generator and a custom receipt maker",
      "Active blog with practical guides (e.g. rental receipts for landlords and tenants)",
      "Covers niche receipt types such as rent and rental receipts",
    ],
    gaps: [
      "Pricing is not transparent — we could not retrieve tier prices publicly",
      "Fewer named-brand template pages than Makecepeit's 350+",
      "Export formats are not clearly specified",
    ],
    pricing: {
      free: "A free tier is referenced but could not be confirmed publicly.",
      paid: "Not publicly available — the pricing page did not load during our review (as of July 2026).",
    },
    cells: {
      free_start: partial("Not confirmed"),
      no_signup: partial("Not confirmed"),
      live_preview: yes(),
      brand_templates: yes("Template library + blog"),
      pdf_export: partial("Format not specified"),
      image_export: partial("Format not specified"),
      ai_generator: yes("AI receipt generator"),
      saved_history: partial("Not stated"),
      watermark_free: partial("Not confirmed"),
      transparent_pricing: no("Not publicly available"),
    },
    verdict:
      "Both Makecepeit and ReceiptBaker offer AI receipt generation, so this comes down to transparency and breadth. Makecepeit publishes its pricing ($3/wk, $7.99/mo, $39/yr), lets you start free with no signup, offers 350+ specific brand templates and exports to both PDF and PNG. If those matter to you, Makecepeit is the safer pick; ReceiptBaker is worth a look if its blog and rental-receipt templates match your niche.",
    chooseUs: [
      "You want AI generation and pricing you can see before committing",
      "You need a specific brand's receipt from a 350+ template library",
      "You want to start free with no signup",
    ],
    chooseThem: [
      "You specifically want its rental/rent-receipt guides and templates",
      "You rely on its blog content for how-to guidance",
    ],
    faqs: [
      {
        question: "Do both Makecepeit and ReceiptBaker have AI receipt generators?",
        answer:
          "Yes. Both offer AI-assisted receipt generation. Makecepeit's AI is free for three receipts per day and unlimited on Pro, with prices published on the pricing page.",
      },
      {
        question: "How much does ReceiptBaker cost?",
        answer:
          "We could not retrieve ReceiptBaker's pricing publicly as of July 2026, so we don't list a figure rather than guess. Makecepeit's Pro is publicly listed at $3/week, $7.99/month or $39/year.",
      },
      {
        question: "Which has more brand templates?",
        answer:
          "Makecepeit offers 350+ named-brand templates. ReceiptBaker has a template library and blog but does not appear to match that breadth of specific brands.",
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
    pricing: "Free format + 3-day trial; membership approx. $9–$49/mo",
    bestFor: "Users who want native mobile apps alongside the web tool.",
  },
];
