import type { ReceiptTemplate } from "./types";
import { getTemplate, sourcedFigure } from "./templates";
import { BRAND_SPECS } from "./brand-specs";
import { BRAND_DEPTH } from "./brand-depth";
import { BRAND_TEMPLATES, brandCategoryFor } from "./brands";
import { hubTemplateForBrand } from "./topic-clusters";
import { hasHandoff, hasOfficialSource, INTENT_PAGES } from "./intent-pages";
import { COMPETITORS, LAST_UPDATED } from "./comparisons";
import { examplesForBrand, examplesForTemplate } from "./example-links";
import { contextLinksFor } from "./contextual-links";

/**
 * When each section of the site was last genuinely reviewed.
 *
 * These used to live only in `app/sitemap.ts`. They moved here so the date a
 * reader sees on the page and the date the sitemap reports to crawlers come
 * from one constant — if they were maintained separately they would drift, and
 * a page claiming to be fresher than its own <lastmod> is worse than showing no
 * date at all.
 *
 * The rule from the sitemap carries over unchanged: bump a constant only when
 * the page's visible content actually changed, and move a page onto a new
 * constant rather than restamping one that also covers untouched pages. A
 * cosmetic restamp is what crawlers learn to ignore.
 */

// 2026-08-31: the free tier changed — one watermark-free download instead of
// three, 3 AI generations a month instead of 3 a day, 3 fonts and one paper
// style, and saving your own templates is now Pro. Every page that stated the
// old numbers changed with it.
export const STATIC_UPDATED = "2026-08-31";
// 2026-11-20: /contact shows the company name and postal address. Its own
// constant because STATIC_UPDATED also stamps pages that did not change.
export const CONTACT_UPDATED = "2026-11-20";
// 2026-10-24: /about stopped saying a free account is needed to download and
// that the first receipt is watermark-free (paywall change). Its own constant
// because STATIC_UPDATED also stamps /blog, /contact and /authors, which did
// not change.
// 2026-11-20: names the operating company and says templates are reviewed for accurate fields, not "for realism".
export const ABOUT_UPDATED = "2026-11-20";
// 2026-10-24: the calculator's footer note said an account is needed to
// download; downloading no longer needs one. /tools/receipt-calculator only —
// CONTENT_UPDATED also stamps the split-payment checker, which did not change.
export const RECEIPT_CALCULATOR_UPDATED = "2026-10-24";
// 2026-08-29: /tools/receipt-calculator stopped saying an account is needed
// "only to download" — the AI generator needs one too. /tools and the other
// calculator did not change, but they share this constant and the text sits in
// a shared footer note, so one date covers the set honestly.
export const CONTENT_UPDATED = "2026-08-29";
// 2026-08-31: /tools alone got a shorter title (the old one rendered at 74
// chars with the " | Makecepeit" template and was truncated in the SERP). Its
// own constant because CONTENT_UPDATED also stamps the two calculators, and
// neither of them changed.
export const TOOLS_INDEX_UPDATED = "2026-08-31";
// 2026-09-01: /privacy gained a paragraph on first-party product analytics —
// the events the site now records in our own database (sign-ups, downloads, AI
// generations) and links to a signed-in account. Its own constant because
// STATIC_UPDATED also stamps /about, /contact, /terms and /blog, none of which
// changed; a policy page is the last place to be vague about when it changed.
// 2026-09-04: the analytics section now discloses the two random identifiers
// kept in local storage — one per browser, one per 30-minute visit — that let
// product events be counted as people instead of as clicks, plus the random
// receipt id events carry. Stating what is stored is the whole point of the
// page; adding an identifier without saying so is the thing it exists to
// prevent.
// 2026-10-13: also discloses the visit counter — traffic source, landing page
// and device stored against the visit id.
// 2026-10-20: Google Analytics is now on by default outside the EEA, UK and
// Switzerland (opt-out via Decline); opt-in there is unchanged.
// 2026-10-27: the AI generator section now says the prompt, the result's
// business name and the matched template are stored, and the prompt is deleted
// after 90 days.
// 2026-11-20: names the seller (YUMA TECHNOLOGIES LLC) and every processor — Stripe, Resend, Telegram alerts, each AI provider, the directory badges — adds a children section and drops the AI-limit cookie that no longer exists.
export const PRIVACY_UPDATED = "2026-11-20";
// 2026-09-04: sections 3 and 4 now describe the billing model that actually
// runs. The old text said a plan "continues for successive periods until
// cancelled" and that you "authorize the recurring charge until you cancel",
// which describes a subscription; a Pro pass is bought for a period and then
// stops on its own. Section 3 also said plans are "monthly or yearly" when a
// weekly pass has been on sale throughout. Its own constant for the same reason
// as PRIVACY_UPDATED: STATIC_UPDATED also stamps /about, /contact, /authors and
// /blog, none of which changed, and a terms page is the last place to be vague
// about when it changed.
// 2026-10-24: section 2 — watermarked downloads and buying a Pro pass need no
// account; the AI generator, saving and support chat still do.
// 2026-11-20: names YUMA TECHNOLOGIES LLC as the party, adds a 13+ account age, indemnity, New Mexico governing law and a trademark-notice contact, and says prices are final (no tax added).
export const TERMS_UPDATED = "2026-11-20";
export const TEMPLATES_UPDATED = "2026-07-20";
export const TEMPLATES_CITED_UPDATED = "2026-08-20";
export const TEMPLATES_FIGURE_UPDATED = "2026-08-21";
// 2026-08-31: the Aug 2026 external audit flagged "realistic" as a promise to
// reproduce someone else's document. The word left every title, description,
// intro, use case and FAQ on the site — but only 19 of the 42 generic templates
// actually carried it. Listing those 19 rather than restamping the three
// constants above keeps the other 23 on their real review dates; a template
// whose copy did not change must not claim it did.
export const TEMPLATES_COPY_UPDATED = "2026-08-31";

/**
 * The five templates whose seoDescription promised "watermark-free on your
 * first three" when the free allowance had been 1 since 2026-08-31. The claim was
 * live on /templates/bar and four others; three of them were also long enough
 * that fitSeoDescription truncated the promise mid-clause ("watermark-free
 * on…"). Their own constant so the corrected pages are submitted without
 * restamping the other 37 templates, which did not change.
 */
const TEMPLATES_DOWNLOAD_CLAIM_FIXED: ReadonlySet<string> = new Set([
  "bar",
  "handyman-receipt",
  "electronics-store-receipt",
  "airline-receipt",
  "spa-receipt",
]);
export const TEMPLATES_CLAIM_UPDATED = "2026-09-01";
const TEMPLATES_DEREALISTICISED: ReadonlySet<string> = new Set([
  "airline-receipt", "barber-receipt", "car-rental-receipt", "catering-receipt",
  "clothing-store-receipt", "dental-receipt", "dry-cleaning-receipt",
  "electronics-store-receipt", "fast-food-receipt", "florist-receipt",
  "grocery-store", "gym-membership-receipt", "hardware-store-receipt",
  "liquor-store-receipt", "pet-store-receipt", "pizza-receipt", "spa-receipt",
  "towing-receipt", "veterinary-receipt",
]);
// 2026-08-23: all 348 brand pages got a new meta description — the five
// SEO_DESC_VARIANTS that promised "no sign-up to start" one clause after
// promising a download now say an account is needed.
// 2026-08-31: free-tier limits changed — see STATIC_UPDATED above.
// 2026-08-31 (2): 50 brand templates are free to use; the other 298 need Pro to
// open. That makes the page TITLE change for those 298 — nine of the ten title
// variants say "Free", which stopped being true — so they move to a Pro variant
// that keeps "{Brand} Receipt Generator" and drops the word "Free". The seo
// description and the two FAQ answers that promised free access change with it.
// 2026-08-31 (3): the free fifty were re-cut on combined /receipt-help + /brands
// click data. The first cut used /brands alone and kept only 29% of
// brand-attributable traffic free; this keeps 74%. 31 brands swapped, so titles
// and descriptions move on 62 pages.
export const BRANDS_UPDATED = "2026-08-31";
// 2026-08-31: free-tier limits changed — see STATIC_UPDATED above.
// 2026-08-31 (2): the explorer marks Pro templates, and the brand page CTA no
// longer says "Use This Template — Free" on templates that need Pro.
// 2026-10-24: the "Pro" badges are gone from the explorer, and the intro, meta
// description and watermark FAQ (page + FAQPage JSON-LD) state the new paywall.
// 2026-10-28: Ralph Lauren joins the list.
// 2026-11-03: Krispy Kreme joins the list.
// 2026-11-16: a "Most used" line under the intro links eight brand pages by the
// query each one owns ("Starbucks receipt template", "Chipotle receipt
// generator"). The hub's title and H1 did not change.
export const BRANDS_INDEX_UPDATED = "2026-11-16";

/**
 * The 36 brands whose visible copy changed with the article fix on 2026-09-01.
 *
 * The generated intro, use-cases and FAQ answers all said "a ${name}", which is
 * wrong for any brand starting with a vowel or "The": "Make a Applebee's
 * receipt", "a ASDA", "a Olive Garden", "a The Cheesecake Factory receipt". The
 * helpers in lib/brands.ts now pick the article, so only these pages' text
 * moved — the other 312 render byte-identical copy and keep their old date.
 *
 * Listed rather than computed because the sitemap must not import the article
 * rule: this is the set that changed on one day, not a rule that re-derives.
 */
const BRANDS_ARTICLE_FIXED: ReadonlySet<string> = new Set([
  "el-pollo-loco",
  "applebees",
  "outback-steakhouse",
  "cheesecake-factory",
  "ihop",
  "olive-garden",
  "the-coffee-bean",
  "einstein-bros-bagels",
  "albertsons",
  "asda",
  "edeka",
  "albert-heijn",
  "old-navy",
  "urban-outfitters",
  "american-eagle",
  "adidas",
  "ace-hardware",
  "office-depot",
  "academy-sports",
  "advance-auto-parts",
  "arco",
  "alaska-airlines",
  "emirates",
  "air-canada",
  "ritz-carlton",
  "alamo",
  "ola",
  "apple-tv-plus",
  "amazon-prime",
  "audible",
  "epic-games",
  "vitamin-shoppe",
  "the-ups-store",
  "equinox",
  "orangetheory",
  "anytime-fitness",
]);
export const BRANDS_ARTICLE_UPDATED = "2026-09-01";

/**
 * The 69 brands whose title changed when TITLE_MAX dropped to 60 on 2026-09-11.
 *
 * fitBrandTitle() only trims a title that exceeds the ceiling, so raising the
 * bar from 70 to 60 pulled a new band of titles into the cut: 90 of the 348
 * assembled titles were over 60 and truncating in the SERP, and 69 of them had
 * a redundant second brand mention to drop. "Free Burger King Receipt Generator
 * — Burger King Receipt Maker" (62) became "Free Burger King Receipt Generator
 * — Receipt Maker" (50).
 *
 * The title is the page's visible content in the one place that decides a
 * click, so these move; the other 279 render the same title as before and keep
 * their old date.
 *
 * Listed rather than computed, for the same reason as BRANDS_ARTICLE_FIXED: the
 * sitemap must not import the length rule. This is the set that changed on one
 * day, not a rule that re-derives on every build — and it must not silently
 * re-stamp pages the next time a variant is edited.
 */
const BRANDS_TITLE_TRIMMED: ReadonlySet<string> = new Set([
  "air-canada",
  "alaska-airlines",
  "american-eagle",
  "anytime-fitness",
  "apple-store",
  "apple-tv-plus",
  "audible",
  "balenciaga",
  "barnes-noble",
  "bass-pro-shops",
  "bath-body-works",
  "bed-bath-beyond",
  "burger-king",
  "burlington",
  "caffe-nero",
  "caribou-coffee",
  "carrefour",
  "chanel",
  "checkers",
  "chick-fil-a",
  "church-s-chicken",
  "comfort-inn",
  "culvers",
  "enterprise",
  "epic-games",
  "food-lion",
  "giant-food",
  "godaddy",
  "golden-corral",
  "holiday-inn",
  "hollister",
  "jack-in-the-box",
  "jimmy-john-s",
  "just-eat",
  "kate-spade",
  "kwik-trip",
  "la-fitness",
  "la-quinta",
  "little-caesars",
  "lululemon",
  "marco-s-pizza",
  "marriott",
  "michael-kors",
  "microsoft-365",
  "mod-pizza",
  "morrisons",
  "nintendo-eshop",
  "noodles-company",
  "office-depot",
  "old-navy",
  "olive-garden",
  "panda-express",
  "paramount-plus",
  "party-city",
  "peet-s-coffee",
  "phillips-66",
  "potbelly",
  "priceline",
  "red-robin",
  "sheraton",
  "tgi-fridays",
  "tim-hortons",
  "trader-joe-s",
  "walmart",
  "whataburger",
  "whole-foods",
  "winco-foods",
  "youtube-premium",
  "youtube-tv",
]);
export const BRANDS_TITLE_UPDATED = "2026-09-11";

// 2026-10-04: "Other brand templates" lists four same-category neighbours
// instead of the same first four brands on every page, so every brand page's
// visible links changed.
export const BRANDS_LINKS_UPDATED = "2026-10-04";

/**
 * The 53 brands whose title lost its bare head-term clause on 2026-10-18.
 *
 * fitBrandTitle() dropped the brand's second mention from overlong titles, and
 * when that mention sat in "Free Food Lion Receipt Generator" what was left —
 * "Free Receipt Generator", "Receipt Maker" — was /create's head term, not the
 * brand's. These pages rotated with /create for "receipt maker" and "receipt
 * generator"; they now keep the clause that pairs the brand with the term
 * ("Free Food Lion Receipt Generator"). Listed from the live titles that day,
 * for the same reason as BRANDS_TITLE_TRIMMED.
 */
const BRANDS_HEAD_TERM_FIXED: ReadonlySet<string> = new Set([
  "american-eagle", "apple-store", "apple-tv-plus", "banana-republic",
  "barnes-noble", "bed-bath-beyond", "blue-bottle-coffee", "british-airways",
  "burger-king", "burlington", "caribou-coffee", "checkers",
  "cheesecake-factory", "chick-fil-a", "comfort-inn", "cracker-barrel",
  "culvers", "dollar-general", "einstein-bros-bagels", "family-dollar",
  "firehouse-subs", "food-lion", "frontier-airlines", "giant-eagle",
  "golden-corral", "hollister", "jack-in-the-box", "jimmy-john-s", "just-eat",
  "kate-spade", "kwik-trip", "little-caesars", "longhorn-steakhouse",
  "michael-kors", "napa-auto-parts", "nintendo-eshop", "office-depot",
  "orangetheory", "panda-express", "paramount-plus", "party-city",
  "peet-s-coffee", "potbelly", "quest-diagnostics", "sheraton",
  "texas-roadhouse", "tgi-fridays", "tim-hortons", "trader-joe-s",
  "whataburger", "whole-foods", "williams-sonoma", "youtube-tv",
]);
export const BRANDS_HEAD_TERM_UPDATED = "2026-10-18";

// 2026-10-19: every brand page links up to its generic template(s) and the
// receipt maker (lib/topic-clusters.ts), so every page's visible links changed.
export const BRANDS_HUB_LINK_UPDATED = "2026-10-19";

// 2026-10-24: paywall change — every template builds free with no account,
// free downloads are watermarked and need no account, and a watermark-free
// download is a Pro pass bought at checkout without one.
// Every brand page changed: the how-to step and CTA no longer split brands into
// free and Pro, the generated FAQs (and their JSON-LD) and two intro variants
// stopped saying an account is needed to download, and the 298 former Pro
// brands lost their "A Makecepeit Pro template" meta description.
export const BRANDS_PAYWALL_UPDATED = "2026-10-24";

// 2026-10-27: every brand page gains a "What is the {brand} receipt
// generator?" answer passage under the hero.
export const BRANDS_ANSWER_UPDATED = "2026-10-27";

// 2026-11-03: the 15 brands with the most commercial search demand gain a
// "How to read a {brand} receipt" section (lib/brand-depth.ts).
// Only those pages move; the other ~338 keep their date.
export const BRANDS_DEPTH_UPDATED = "2026-11-03";

// 2026-11-17: a fresh URL Inspection of every sitemap URL found 23 more brand
// pages "Crawled – currently not indexed" (last crawled Jun–Aug), none of which
// had the section yet. Cartier stays without one, as on 11-09.
const BRANDS_DEPTH_DROPPED_2_UPDATED = "2026-11-17";
const BRANDS_DEPTH_DROPPED_2: ReadonlySet<string> = new Set([
  "wendy-s", "tim-hortons", "nordstrom", "playstation-store",
  "southwest-airlines", "h-m", "jimmy-john-s", "white-castle",
  "church-s-chicken", "h-e-b", "banana-republic", "adidas", "academy-sports",
  "tiffany-co", "kay-jewelers", "jetblue", "ritz-carlton", "alamo", "sixt",
  "roblox", "gnc", "quest-diagnostics", "regal-cinemas",
]);

// 2026-11-09: the 37 brand pages Search Console reported as "Crawled –
// currently not indexed" gain the same section. They get their own date so the
// 15 pages above keep 11-03.
export const BRANDS_DEPTH_DROPPED_UPDATED = "2026-11-09";
const BRANDS_DEPTH_DROPPED: ReadonlySet<string> = new Set([
  "chipotle", "pizza-hut", "dunkin", "jamba-juice", "boba-guys", "sam-s-club",
  "lowe-s", "autozone", "marriott", "hilton", "hyatt", "avis", "joann",
  "raising-canes", "applebees", "red-lobster", "portillos", "noodles-company",
  "blue-bottle-coffee", "pret-a-manger", "caffe-nero", "winco-foods",
  "mercadona", "kohls", "williams-sonoma", "rei", "arco", "spirit-airlines",
  "bolt", "just-eat", "gopuff", "slack", "notion", "canva", "patreon", "ups",
  "cinemark",
]);

// 2026-11-16: /brands/home-depot loses its only "How to read" source link (the
// Hunker article now 404s and has no archive copy).
const BRANDS_SOURCE_FIXED_UPDATED = "2026-11-16";
const BRANDS_SOURCE_FIXED: ReadonlySet<string> = new Set(["home-depot"]);

// Brand pages added after the shared dates above. Without its own date a new
// page inherits BRANDS_LINKS_UPDATED and looks older than it is.
const BRANDS_ADDED: Readonly<Record<string, string>> = {
  stockx: "2026-10-05",
  goat: "2026-10-05",
  "cash-app": "2026-10-19",
  zelle: "2026-10-19",
  "ralph-lauren": "2026-10-28",
  "krispy-kreme": "2026-11-03",
};

/**
 * When a brand page was last reviewed.
 *
 * Newest change wins: a page whose title moved on 09-11 reports that date even
 * if its body copy also moved on 09-01, because <lastmod> answers "when did
 * this page last change", not "when did each part of it change".
 */
// 2026-10-27: the receipt preview on brand pages changed. The researched brands
// (lib/brand-specs.ts) were rebuilt to match their real receipts; on the rest,
// the generic "SALES RECEIPT"-style heading that printed when a template had no
// greeting is gone, a template's own register/cashier line now prints, and a
// wordmark that spells the store name no longer has the name repeated under it.
// Computed from exactly those conditions, so a page whose preview did not move
// keeps its date.
const BRANDS_RECEIPT_UPDATED = "2026-10-27";
function brandReceiptChanged(slug: string): boolean {
  const d = getTemplate(slug)?.defaults;
  const named = (s?: string) => s?.trim().toLowerCase();
  return (
    !!d &&
    (slug in BRAND_SPECS || !d.greeting || !!d.register || !!d.cashier ||
      (!!d.logoText && named(d.logoText) === named(d.businessName)))
  );
}

// 2026-11-16: sell-page pass. Titles, H1s, intros and meta descriptions on
// these brand pages changed (template wording, watermark stated, misuse-prone
// use cases removed), Lyft and Planet Fitness gained sections and FAQs, and
// Sunoco and the three gyms gained a hand-off link (lib/sell-links.ts).
const BRANDS_SELL_PAGES: ReadonlySet<string> = new Set([
  "walmart", "paypal", "starbucks", "chipotle", "cvs-pharmacy", "home-depot",
  "lyft", "planet-fitness", "sunoco", "la-fitness", "crunch-fitness", "anytime-fitness",
  // "Resale authentication" use case replaced (misuse review).
  "gucci", "louis-vuitton",
]);
const BRANDS_SELL_PAGES_UPDATED = "2026-11-16";

// Same date: the shared copy pools in lib/brands.ts lost their misuse wording
// ("real-looking", "reads as authentic", "matches the real thing", "proof of
// purchase"). Derived from the text those pages now carry, so only the brands
// that drew one of the rewritten variants move.
function brandPoolCopyChanged(slug: string): boolean {
  const t = BRAND_TEMPLATES.find((b) => b.slug === slug);
  if (!t) return false;
  return (
    t.useCases.includes("Design comps and mockups that need a sample receipt") ||
    t.useCases.includes("Keep an itemized record of a purchase") ||
    t.faqs.some((f) => / receipt template include\?$/.test(f.question)) ||
    /^Lay out an? .+-style receipt complete with /.test(t.intro) ||
    /^Generate an? .+-style receipt with /.test(t.intro)
  );
}

// 2026-11-20: copy guardrails on every brand page. The "Common uses" list no
// longer offers to replace a lost receipt (for returns, warranty or claims),
// the FAQ says the template is not proof of purchase, and the shared headings
// use a/an properly ("an Apple Store receipt", not "a Apple Store receipt").
// The headings sit on all ~354 brand pages, so all of them move.
// Same day, same guardrails: brand use cases and intros no longer offer the receipt
// for reimbursement, expense claims or per-diem, and the generated FAQ no longer
// says to attach it to an expense report.
export const BRANDS_COPY_GUARDRAILS_UPDATED = "2026-11-20";

// 2026-11-21: phone layout on every brand page — the receipt comes straight
// after the button, a line under the button says what is free, and a "these
// items are already in the template" card follows the sample items. The card
// and the line are in every page's HTML, so all ~354 brand pages move.
export const BRANDS_PHONE_LAYOUT_UPDATED = "2026-11-21";

export function brandReviewedAt(slug: string): string {
  return newest(
    BRANDS_PHONE_LAYOUT_UPDATED,
    BRANDS_COPY_GUARDRAILS_UPDATED,
    BRANDS_SELL_PAGES.has(slug) || brandPoolCopyChanged(slug) ? BRANDS_SELL_PAGES_UPDATED : null,
    brandReceiptChanged(slug) ? BRANDS_RECEIPT_UPDATED : null,
    BRANDS_UPDATED,
    BRANDS_ARTICLE_FIXED.has(slug) ? BRANDS_ARTICLE_UPDATED : null,
    BRANDS_TITLE_TRIMMED.has(slug) ? BRANDS_TITLE_UPDATED : null,
    BRANDS_LINKS_UPDATED,
    BRANDS_HEAD_TERM_FIXED.has(slug) ? BRANDS_HEAD_TERM_UPDATED : null,
    BRANDS_HUB_LINK_UPDATED,
    BRANDS_ADDED[slug] ?? null,
    BRANDS_PAYWALL_UPDATED,
    BRANDS_ANSWER_UPDATED,
    slug in BRAND_DEPTH
      ? BRANDS_DEPTH_DROPPED_2.has(slug) ? BRANDS_DEPTH_DROPPED_2_UPDATED
        : BRANDS_DEPTH_DROPPED.has(slug) ? BRANDS_DEPTH_DROPPED_UPDATED : BRANDS_DEPTH_UPDATED
      : null,
    linksChangedNov16(`/brands/${slug}`) || examplesForBrand(slug).length > 0 ? LINKS_NOV16_UPDATED : null,
    BRANDS_SOURCE_FIXED.has(slug) ? BRANDS_SOURCE_FIXED_UPDATED : null,
    BRANDS_WITH_HELP_SECTION.has(slug) ? BRANDS_HELP_REMOVED_UPDATED : null,
    brandMetaSaysWatermarked(slug) ? META_WATERMARK_UPDATED : null,
  );
}

// 2026-11-16: meta descriptions that promised a "free PDF" now say the free
// download is watermarked. Brands are derived from the text: every brand page
// whose description says "watermarked" either changed today or was already on
// today's sell-page date, so none is restamped falsely.
const META_WATERMARK_UPDATED = "2026-11-16";
function brandMetaSaysWatermarked(slug: string): boolean {
  return BRAND_TEMPLATES.find((b) => b.slug === slug)?.seoDescription.includes("watermarked") ?? false;
}
const TEMPLATES_META_WATERMARK: ReadonlySet<string> = new Set([
  "cash-receipt", "childcare-receipt", "cleaning-service-receipt", "donation-receipt", "gas-station", "hotel", "itemized-receipt", "parking", "proof-of-purchase", "sales-receipt", "salon", "taxi",
]);

// 2026-11-16: the "{Brand} receipt help" section (links to the brand's
// /receipt-help guides) came off the brand pages. Only brands that had guides
// showed the section, so only they move.
const BRANDS_HELP_REMOVED_UPDATED = "2026-11-16";
const BRANDS_WITH_HELP_SECTION = new Set(INTENT_PAGES.map((p) => p.brandSlug));

// 2026-11-16: internal-links pass. Brand pages link their worked examples
// (lib/example-links.ts) and some sell pages gained a hand-written hand-off
// sentence (lib/contextual-links.ts). Derived from those two files rather than
// listed, so the date moves on exactly the pages whose body changed.
const LINKS_NOV16_UPDATED = "2026-11-16";
const linksChangedNov16 = (path: string) => contextLinksFor(path).length > 0;

// Same date: these examples gained a hand-written scenario and notes (four were
// crawled and not indexed), or now link their brand page because the name match
// ignores a leading "The" and knows "Costco Wholesale" and "Whole Foods Market".
const EXAMPLES_NOV16: ReadonlySet<string> = new Set([
  "marriott-receipt-weekend", "panera-receipt-soup-sandwich", "panera-receipt-you-pick-two",
  "carrefour-receipt-france",
  "home-depot-receipt-hardware", "home-depot-receipt-paint-project",
  "costco-receipt-bulk-haul", "costco-receipt-monthly-stockup",
  "whole-foods-receipt-organic", "whole-foods-receipt-prepared-foods",
]);


// 2026-11-16: /authors links /about from its body. Its own constant because
// STATIC_UPDATED also stamps /blog and /contact, which did not change.
export const AUTHORS_UPDATED = "2026-11-16";
// 2026-08-31: the CTA names a Pro template before the click.
// 2026-09-01: the 73 policy guides are restored after a day away. They go back
// with their original content, so this is the date the URL became reachable
// again rather than a content review — the rewrite is queued separately.
export const INTENT_UPDATED = "2026-09-01";

// 2026-11-20: the /receipt-help index intro says "make one for your own records"
// instead of "recreate one". Only the index moves onto this date.
export const INTENT_INDEX_UPDATED = "2026-11-20";
// 2026-08-31: the CTA names a Pro template before the click.
// 2026-09-01: the builder offer moves up under the first answer on every guide
// — it previously appeared only in the closing CTA, ~650 words down.
export const INTENT_CITED_UPDATED = "2026-09-01";
// 2026-08-31: every example page's meta description changed with the
// "realistic" removal, and a third of them use the intro variant that carried
// the word in visible copy. All 293 plus the paginated index genuinely moved,
// so one date covers the set honestly.
// 2026-10-08: every example's related links rotate per page, non-US examples
// show their own currency, tax label and date order, examples link their
// brand page, and the first batch gained hand-written scenarios and notes.
export const EXAMPLES_UPDATED = "2026-10-08";

// 2026-11-16: the Starbucks and Home Depot paint examples' main button opens
// the brand page, and both Home Depot examples now link it at all (the
// "The Home Depot" name never matched the brand page before).
const EXAMPLES_BRAND_LINKED: ReadonlySet<string> = new Set([
  "starbucks-receipt-two-lattes-muffin",
  "home-depot-receipt-paint-project",
  "home-depot-receipt-hardware",
]);
const EXAMPLES_BRAND_LINKED_UPDATED = "2026-11-16";

// 2026-11-17: the example pages Search Console reported as "Crawled –
// currently not indexed" (URL Inspection of the whole sitemap, 11-17) and had
// no scenario gained their own scenario and notes. The 11 dropped examples that
// already had them are left on their old date: nothing on them changed.
const EXAMPLES_DROPPED_UPDATED = "2026-11-17";
const EXAMPLES_DROPPED: ReadonlySet<string> = new Set([
  "costco-receipt-bulk-haul", "best-buy-receipt-headphones",
  "cvs-pharmacy-receipt-essentials", "walgreens-receipt-pharmacy",
  "chevron-receipt-gas", "caribou-coffee-receipt-mocha",
  "ihop-receipt-pancakes", "mercadona-receipt-spain", "boots-receipt-uk",
  "exxon-receipt-fuel", "mobil-receipt-gas", "city-garage-parking-receipt",
  "greggs-receipt-uk", "microsoft-store-receipt",
  "walgreens-receipt-photo-order", "sheetz-receipt-mto", "math-tutor-receipt",
  "plumber-receipt-repair", "freelance-invoice-example", "car-wash-receipt",
  "chick-fil-a-receipt-breakfast", "texas-roadhouse-receipt-family-pack",
  "arbys-receipt-meat-mountain", "sonic-receipt-happy-hour",
  "tim-hortons-receipt-timbits", "costco-receipt-monthly-stockup",
  "meijer-receipt-grocery", "heb-receipt-texas-run", "wegmans-receipt-shop",
  "sprouts-receipt-organic-haul", "apple-store-receipt-iphone",
  "sephora-receipt-skincare", "planet-fitness-receipt-membership",
  "florist-receipt-anniversary-bouquet", "dry-cleaning-receipt-suits",
  "liquor-store-receipt-party", "catering-receipt-office-lunch",
  "veterinary-receipt-annual-checkup", "childcare-receipt-monthly",
  "food-truck-receipt-tacos", "bookstore-receipt-summer-reads",
  "cleaning-receipt-move-out",
]);

// 2026-11-17: grocery examples stop charging sales tax on food where the state
// exempts it (OH, TX, CA, NY, MI, and Ontario's zero-rated basics go to 0%; WA
// and FL exempt only the food lines; NC taxes food at its 2% local rate, Idaho
// at 6%). Totals on these pages changed.
const EXAMPLES_GROCERY_TAX_UPDATED = "2026-11-17";
const EXAMPLES_GROCERY_TAX: ReadonlySet<string> = new Set([
  "kroger-receipt-weekly-groceries", "kroger-receipt-bulk-shop",
  "heb-receipt-groceries", "heb-receipt-texas-run", "trader-joes-receipt-snacks",
  "safeway-receipt-groceries", "vons-receipt-groceries",
  "wegmans-receipt-groceries", "wegmans-receipt-shop", "meijer-receipt-groceries",
  "meijer-receipt-grocery", "loblaws-receipt-canada", "food-lion-receipt-groceries",
  "albertsons-receipt-groceries", "costco-receipt-bulk-haul",
  "costco-receipt-monthly-stockup", "publix-receipt-groceries",
]);

/** When one example page was last reviewed. */
export function exampleReviewedAt(slug: string): string {
  return newest(
    EXAMPLES_UPDATED,
    EXAMPLES_NOV16.has(slug) ? LINKS_NOV16_UPDATED : null,
    EXAMPLES_BRAND_LINKED.has(slug) ? EXAMPLES_BRAND_LINKED_UPDATED : null,
    slug === "kroger-receipt-weekly-groceries" ? EXAMPLE_TEMPLATE_TITLE_UPDATED : null,
    EXAMPLES_DROPPED.has(slug) ? EXAMPLES_DROPPED_UPDATED : null,
    EXAMPLES_GROCERY_TAX.has(slug) ? EXAMPLES_GROCERY_TAX_UPDATED : null,
  );
}

// 2026-11-16: the Kroger weekly-groceries example took "Template" into its
// title and H1 (it owns "kroger receipt template"; app/examples/[slug]).
const EXAMPLE_TEMPLATE_TITLE_UPDATED = "2026-11-16";
export const GUIDES_UPDATED = "2026-08-20";
// /guides/receipt-legality — new on 2026-08-21. Its own constant so the new URL
// carries a date newer than the IndexNow cron's last run and is actually
// submitted, without restamping /guides/receipt-anatomy, which did not change.
// 2026-11-20: recreating a receipt is described as for your own files, no longer for an expense claim.
export const GUIDES_LEGALITY_UPDATED = "2026-11-20";
// 2026-08-31: free-tier limits changed — see STATIC_UPDATED above.
export const POLICY_UPDATED = "2026-08-31";
// /create and /cookies both sat on STATIC_UPDATED, which also stamps /login,
// /blog, /about, /contact, /authors, /privacy and /terms. Both changed on
// 2026-08-29 — /create renders the homepage FAQ, and /cookies listed the
// ai_free_usage cookie that no longer exists — so they get their own constants
// rather than dragging seven untouched pages into an IndexNow submission.
// 2026-08-31: free-tier limits changed — see STATIC_UPDATED above.
// 2026-08-31 (2): the free-download sentence on /create was left ungrammatical
// by the bulk copy sweep ("Your first downloads are watermark-free").
// 2026-08-31 (3): the builder's AI panel now counts the remaining monthly
// allowance out loud instead of saying "limited per month".
// 2026-10-08: related posts on /create now include how-to-make-a-receipt-online.
// 2026-10-13: the builder's header gains a "Document heading" field, so a
// receipt or invoice can be headed PURCHASE ORDER, QUOTE, CREDIT MEMO, etc.
// 2026-10-18: ~750 words of reference copy under the builder (receipt types
// linking their templates, what a receipt must contain, a 3-step how-to, paper
// styles and widths, receipt vs invoice), so /create can own "receipt maker"
// and "receipt generator" instead of rotating with up to eight other URLs.
// 2026-10-19: a definition-first opening sentence and five builder FAQs (logo,
// tax rate, currency, PDF download, phone), mirrored in the FAQPage JSON-LD.
// CREATE_UPDATED stamps /create alone, so this moves no other page.
// 2026-10-24: paywall change — the builder, its download copy and the FAQs it
// renders (lib/faqs.ts, ReceiptMakerGuide) no longer say a free account is
// needed to download or that the first download is watermark-free.
// 2026-11-16: title and H1 become "Free Receipt Maker & Generator" so the page
// names both head terms it owns.
// 2026-11-19: the builder gains a "Start from a store" row of brand templates.
// 2026-11-20: phone layout — intro after the builder on phones, and the
// "make a receipt on my phone" FAQ answer rewritten for the new bottom bar.
export const CREATE_UPDATED = "2026-11-20";
// 2026-10-13: lists the first-party measurement storage (mkc_* keys).
// 2026-10-20: analytics section split by region — opt-in in the EEA/UK/CH,
// on by default with Decline as the opt-out everywhere else.
// 2026-11-20: lists every storage key in use (drafts, pending download, AI hand-off, guest chat, offer bar, visit counters) and points to Cookie settings in the footer.
export const COOKIES_UPDATED = "2026-11-20";
// 2026-08-29: /login now leads with the log-in form instead of "Create your
// free account" — the heading, the sub-heading and the form itself all change
// for anyone arriving with a ?next=. Its own constant for the same reason as
// the two above: STATIC_UPDATED also covers /blog, /about, /contact, /authors,
// /privacy and /terms, none of which changed.
// 2026-08-30: "Continue with Google" moved above the email form, so the visible
// order of the page's controls changed.
// 2026-08-31: free-tier limits changed — see STATIC_UPDATED above.
export const LOGIN_UPDATED = "2026-08-31";
// 2026-08-21: /pricing now shows the watermark it asks people to pay to remove.
// 2026-08-29: the price table moved above that watermark comparison. Measured on
// a 375px phone, the comparison ran 594px to 2,024px and pushed the first price
// to 2,105px — 2.6 screens before anyone saw a number. The page's whole reading
// order changes, which is as visible as a change gets.
// 2026-08-30: four plan cards became two — Free, and one Pro card with the
// billing period as a choice. Every price on the page now also states its
// monthly equivalent, so $3 / $7.99 / $39 stop reading as a rising ladder when
// per month they fall. Different prices, different structure, visible either way.
// 2026-08-30, later the same day: reverted to all four plans on screen at once,
// at the owner's call — comparing them is the point of the page and a selector
// hides two thirds of the options behind a click. The monthly equivalents stay,
// and the entitlements are now stated once beneath the row instead of repeated
// in four columns, which is what keeps the cards uncramped.
// 2026-08-30, third revision: every plan card now carries its full feature list
// rather than sharing one band underneath, and a comparison table sits below the
// cards. Comparing what you get is the job of this page and a buyer should not
// have to scroll past the cards to find out what they are buying.
// 2026-08-31: free-tier limits changed — see STATIC_UPDATED above.
// 2026-08-31 (2): yearly is $49, and the 7-day pass now lists priority support —
// it was the only plan without it, which was copy drift rather than a real
// distinction.
// 2026-09-04: every Pro card now carries "Cancel anytime — no auto-renewal"
// under its CTA. The answer existed only as the ninth FAQ entry, which is long
// past the point where the question gets asked. The FAQ answer itself was
// rewritten to lead with the answer and to name Manage billing for the card
// subscriptions that do renew.
// 2026-09-04 (2): the free plan row read "1 watermark-free downloads" — the
// count is singular and the noun was hardcoded plural. The "difference between
// Free and Pro" answer now derives its four counts from lib/plans.ts and
// lib/brands.ts instead of stating them by hand, and the meta description names
// the weekly pass, which has been on sale throughout and was not mentioned.
// 2026-10-16: Stripe checkout — accepted payment methods, automatic activation,
// and plan switching explained; the "use the same email" warning removed.
// 2026-10-24: paywall change — no free watermark-free download, no Pro brand
// templates, and Pro can be bought at checkout without an account.
// 2026-10-27: the watermark demo receipt now prints its register and cashier
// line, which the renderer had been dropping.
// 2026-10-27: a one-sentence price answer under the hero.
// 2026-11-20: a Terms and Privacy line under the plan cards; not-included features readable (contrast).
export const PRICING_UPDATED = "2026-11-20";
// 2026-08-23: the hero grid no longer stretches to the 380px receipt, so the
// primary CTA is reachable again on phones under 412px — a visible change to
// the page's most important element.
// 2026-08-28: the "Is Makecepeit free?" FAQ — rendered on the page and in its
// FAQPage JSON-LD — no longer says the AI generator gives 3 generations a day
// with no account. Signed-out visitors now get one; three needs a free account.
// 2026-08-29: superseded the same day — AI now requires an account outright, so
// that FAQ answer changed again. Both the visible copy and the JSON-LD move.
// Also 2026-08-29: the hero carries worked AI examples, so a signed-out visitor
// can still see what the generator does now that using it needs an account.
// 2026-08-31: free-tier limits changed — see STATIC_UPDATED above.
// 2026-09-01: the H1 and title stop duplicating /create. Google was showing
// both pages for "receipt maker" at position ~89 apiece; /create now owns the
// head term and the homepage leads on the brand catalogue, linking to the
// builder with exact-match anchor text. Also fixes "your first download are
// watermark-free", left ungrammatical when the free allowance dropped to one.
// 2026-10-22: title and H1 lead with "receipt maker"; "recreate any store
// receipt" wording removed.
// 2026-10-24: paywall change — the hero note, feature card, steps (and their
// HowTo JSON-LD), closing CTA and the two download FAQs (and FAQPage JSON-LD)
// say downloading needs no account and Pro removes the watermark.
// 2026-10-27: the hero receipt now prints its "Register 2 · Cashier: Maya"
// line — the renderer dropped it, though the anatomy copy beside it names both.
// 2026-11-03: title, H1 and meta description move to "receipt templates" and
// store receipt generators; the hero links /create as "receipt maker".
// 2026-11-20: the expense-report card is now a small-business card, and the export card no longer pitches expense reports.
export const HOME_UPDATED = "2026-11-20";
// 2026-08-31: free-tier limits changed — see STATIC_UPDATED above.
// 2026-10-11: links to the new Google Docs templates page from under the intro.
// 2026-10-18: lists the new pro forma invoice and credit note templates.
// 2026-10-19: lists the new payment receipt, estimate and bill format templates.
// 2026-10-24: the intro no longer says downloading needs a free account or that
// the first download is watermark-free.
// 2026-11-16: three new cards (billing statement, missing receipt form, superbill).
// 2026-11-20: new card (email receipt).
export const TEMPLATES_INDEX_UPDATED = "2026-11-20";
// /templates/google-docs — new on 2026-10-11. Lists the free templates
// published as public Google Docs (lib/google-docs-templates.ts).
// 2026-10-21: "Preview" became "Open in Google Docs", linking each Doc's /edit
// address so Google can index the Docs (none were indexed on 2026-10-21).
// 2026-10-24: the receipt-maker paragraph and its FAQ answer (and JSON-LD) no
// longer say downloading needs a free account or the first is watermark-free.
export const GOOGLE_DOCS_TEMPLATES_UPDATED = "2026-10-24";
export const COMPARISONS_UPDATED = LAST_UPDATED;

/**
 * When one comparison page was last reviewed.
 *
 * Read off the entry itself rather than kept in step by hand: re-checking a
 * single competitor should move that one page's sitemap date and no other, and
 * a shared constant cannot express that — it either restamps every comparison
 * or leaves the re-read one looking untouched. See brandReviewedAt, same rule.
 */
export function compareReviewedAt(slug: string): string {
  return newest(
    COMPETITORS.find((c) => c.slug === slug)?.updated ?? COMPARISONS_UPDATED,
    COMPARE_COPY_UPDATED,
    COMPARE_PREVIEW_UPDATED,
    linksChangedNov16(`/compare/${slug}`) ? LINKS_NOV16_UPDATED : null,
    // 2026-11-20: /compare/receiptbaker links the two other comparisons.
    slug === "receiptbaker" ? "2026-11-20" : null,
  );
}

// 2026-10-27: the Starbucks receipt preview on every comparison page lost its
// generic heading and now prints its "Barista" line (see BRANDS_RECEIPT_UPDATED).
const COMPARE_PREVIEW_UPDATED = "2026-10-27";

// 2026-10-24: our own column, pricing card, closing CTA and FAQ answers on every
// comparison page state the new paywall (watermarked download with no account,
// watermark-free via Pro). Our copy, not a competitor re-check, so the visible
// "Last reviewed" date does not move — only the sitemap date does.
const COMPARE_COPY_UPDATED = "2026-10-24";

/**
 * /alternatives renders every competitor's overview and pricing, so it is as
 * fresh as the most recently reviewed entry on it.
 */
export function alternativesUpdated(): string {
  // ISO dates sort lexicographically, so the last one is the newest.
  const reviewed = COMPETITORS.map((c) => c.updated).sort();
  return newest(
    reviewed[reviewed.length - 1] ?? COMPARISONS_UPDATED,
    ALTERNATIVES_COPY_UPDATED,
    ALTERNATIVES_LINKS_UPDATED,
  );
}

// 2026-11-16: our own entry links the Walmart brand page and the restaurant,
// pharmacy and gas station templates by name. Our copy, not a competitor
// re-check, so the visible "Last reviewed" date (LAST_UPDATED) does not move.
const ALTERNATIVES_LINKS_UPDATED = "2026-11-16";

// 2026-10-18: our own entry links "receipt maker" and the closing CTA "online
// receipt maker" to /create, so the roundup keeps "best receipt generators"
// and hands the head terms to the builder; the first-download line now says it
// is a free account's watermark-free download. Our copy, not a competitor
// re-check, so the visible "Last reviewed" date (LAST_UPDATED) does not move.
// 2026-10-24: our entry and the closing CTA state the new paywall (download
// with no account; Pro removes the watermark).
const ALTERNATIVES_COPY_UPDATED = "2026-10-24";

/**
 * When a template page was last reviewed.
 *
 * Mirrors the sitemap's precedence exactly: a template citing its own rules is
 * the most recently worked, then one carrying a sourced figure, then the rest.
 */
// 2026-10-19: template gaps from SEO.md §8 — new payment receipt (P3),
// estimate and GST bill format (P8) pages.
const TEMPLATE_GAPS_ADDED = "2026-10-19";

// 2026-10-19: gas-station gained a field list, the gallons × price maths and a
// how-to (P4); rent-receipt was retitled to own "rent receipt template" and
// gained landlord fields, a how-to and a balance-due section (P5).
const TEMPLATES_DEEPENED: ReadonlySet<string> = new Set(["gas-station", "rent-receipt"]);
const TEMPLATES_DEEPENED_UPDATED = "2026-10-19";

// 2026-10-05: templates added in the October re-plan. A new page has to carry
// its own date: falling back to TEMPLATES_UPDATED would stamp it July, and the
// IndexNow cron only submits URLs newer than its last run.
const TEMPLATES_ADDED: Readonly<Record<string, string>> = {
  "oil-change-receipt": "2026-10-05",
  "plumbing-invoice": "2026-10-05",
  "hvac-invoice": "2026-10-05",
  "rent-receipt-india": "2026-10-05",
  "fuel-bill": "2026-10-05",
  "vat-receipt": "2026-10-05",
  "tax-invoice-australia": "2026-10-05",
  "rent-receipt-ontario": "2026-10-05",
  // 2026-10-11: rebuilt from a paid "invoice receipt" into a real invoice.
  invoice: "2026-10-11",
  // 2026-10-18: new pages for two Bing Topic Portfolio gaps, where Copilot
  // cites other sites for "proformainvoice" and "credit note" and never us.
  "proforma-invoice": "2026-10-18",
  "credit-note": "2026-10-18",
  // 2026-11-16: template pages for creation demand that landed on blog posts
  // (strategy: billing statement, missing receipt form, superbill welcome).
  "billing-statement": "2026-11-16",
  // 2026-11-20: "email receipt generator" / "digital receipt maker" had no owner.
  "email-receipt": "2026-11-20",
  "missing-receipt-form": "2026-11-16",
  superbill: "2026-11-16",
  "payment-receipt": TEMPLATE_GAPS_ADDED,
  estimate: TEMPLATE_GAPS_ADDED,
  "bill-format": TEMPLATE_GAPS_ADDED,
};

// 2026-10-05: visible title or H1 changed — "daycare" on childcare, "mechanic
// receipt" on auto repair, "fuel" and "cab" in the gas-station and taxi H1s.
const TEMPLATES_RETITLED: ReadonlySet<string> = new Set([
  "childcare-receipt", "auto-repair", "gas-station", "taxi",
]);
const TEMPLATES_RETITLED_UPDATED = "2026-10-05";

// 2026-10-08: every template page now lists related posts (curated, then a
// topical rotation); before, 50 of 51 linked to none. Supersedes older dates.
const TEMPLATES_RELATED_UPDATED = "2026-10-08";

// 2026-10-11: section headings fixed — "a airline receipt" read "an", and the
// invoice templates said "plumbing receipt" where they mean "plumbing invoice".
const TEMPLATES_HEADINGS_FIXED: ReadonlySet<string> = new Set([
  "auto-repair", "oil-change-receipt", "invoice", "plumbing-invoice", "hvac-invoice",
  "itemized-receipt", "electronics-store-receipt", "airline-receipt",
]);
const TEMPLATES_HEADINGS_UPDATED = "2026-10-11";

// 2026-10-19: "Related templates" lists same-topic neighbours instead of the
// same first four templates on every page, and templates link the brands they
// are the hub for (lib/topic-clusters.ts). Every template's links changed.
const TEMPLATES_CLUSTER_UPDATED = "2026-10-19";

// 2026-10-21: templates with a Google Docs twin link it ("Prefer Google Docs?").
const TEMPLATES_GDOC_LINKED: ReadonlySet<string> = new Set([
  "invoice", "sales-receipt", "rent-receipt", "proof-of-purchase",
]);
const TEMPLATES_GDOC_UPDATED = "2026-10-21";

// 2026-10-22: sample receipts fixed — the restaurant sample no longer borrows a
// chain's name, invoices show a real due date, the rent receipt's blocks no
// longer run into its item line, and grocery counts a weighed line as one item.
const TEMPLATES_SAMPLE_FIXED: ReadonlySet<string> = new Set([
  "restaurant", "invoice", "plumbing-invoice", "hvac-invoice", "rent-receipt", "grocery-store",
]);
const TEMPLATES_SAMPLE_UPDATED = "2026-10-22";

// 2026-10-24: templates whose description or how-to said "free account
// required" or "watermark-free on your first one" (lib/templates.ts, fixed with
// the paywall change). Listed from the copy that day, like the sets above.
const TEMPLATES_PAYWALL_FIXED: ReadonlySet<string> = new Set([
  "restaurant", "coffee-shop", "gas-station", "bar", "rent-receipt",
  "payment-receipt", "estimate", "bill-format", "proforma-invoice", "credit-note",
  "medical-receipt", "handyman-receipt", "clothing-store-receipt",
  "electronics-store-receipt", "car-rental-receipt", "airline-receipt",
  "veterinary-receipt", "spa-receipt", "florist-receipt",
]);
const TEMPLATES_PAYWALL_UPDATED = "2026-10-24";

// 2026-10-27: a template's own register/cashier line ("Table 12", "Stylist:
// Ana") now prints on its preview — it was read nowhere before.
const TEMPLATES_STAFF_LINE_UPDATED = "2026-10-27";

// 2026-10-27: these pages gained a related post moved off /create
// (lib/related-posts.ts), and payment-receipt became the hub of the payment-app
// brands, which left invoice's brand list (lib/topic-clusters.ts).
const TEMPLATES_HUB_FIXED: ReadonlySet<string> = new Set([
  "payment-receipt", "invoice", "veterinary-receipt", "florist-receipt", "gym-membership-receipt",
  "dry-cleaning-receipt", "towing-receipt", "electronics-store-receipt", "clothing-store-receipt",
  "hardware-store-receipt", "pharmacy",
]);
const TEMPLATES_HUB_UPDATED = "2026-10-27";

// Same date: templates with more than eight brands now list the rest as links
// under the brand cards (app/templates/[slug]/page.tsx). Derived, not listed,
// so it matches exactly the pages whose content changed.
const hasMoreThanEightBrands = (slug: string) =>
  BRAND_TEMPLATES.filter((b) => hubTemplateForBrand(b.slug, brandCategoryFor(b.slug)) === slug).length > 8;

// 2026-11-03: the templates nearest page 1 gained a field list, a how-to and
// worked guidance (grocery, pharmacy, clothing, retail, childcare), and
// restaurant's title and H1 now say "template". Gas station was already
// deepened on 10-19 and is unchanged, so it keeps its date.
const TEMPLATES_NOV_DEPTH: ReadonlySet<string> = new Set([
  "grocery-store", "pharmacy", "clothing-store-receipt", "retail-store", "childcare-receipt", "restaurant",
]);
const TEMPLATES_NOV_DEPTH_UPDATED = "2026-11-03";

// Same date: /templates/invoice became the hub of the invoice group
// (lib/topic-clusters.ts GROUP_HUBS). It now lists every invoice page, each of
// them lists it first, and the hub, estimate and pro forma list new posts.
const TEMPLATES_INVOICE_HUB: ReadonlySet<string> = new Set([
  "invoice", "estimate", "proforma-invoice", "credit-note", "bill-format",
  "tax-invoice-australia", "plumbing-invoice", "hvac-invoice",
]);

// 2026-11-16: sell-page pass — new titles, H1s and sections (pharmacy Rx/OTC,
// retail "store receipt", auto repair "mechanic receipt", house cleaning), and
// hand-off links between sell pages (lib/sell-links.ts) on these templates.
const TEMPLATES_SELL_PAGES: ReadonlySet<string> = new Set([
  "pharmacy", "retail-store", "cleaning-service-receipt", "dry-cleaning-receipt",
  "auto-repair", "taxi", "coffee-shop",
]);
const TEMPLATES_SELL_PAGES_UPDATED = "2026-11-16";

// 2026-11-16: these pages' "related templates" links changed when the three
// new templates joined their groups (lib/topic-clusters.ts). Worked out from
// relatedTemplateSlugs before and after, so pages whose links did not move
// keep their dates.
const TEMPLATES_NEW_NEIGHBOURS: ReadonlySet<string> = new Set([
  "pharmacy", "medical-receipt", "dental-receipt", "veterinary-receipt",
  "rent-receipt", "rent-receipt-india", "rent-receipt-ontario", "vat-receipt",
  "invoice", "tax-invoice-australia", "plumbing-invoice", "hvac-invoice",
]);
const TEMPLATES_NEW_NEIGHBOURS_UPDATED = "2026-11-16";

// 2026-11-18: titles and H1s lead with "[Category] Receipt Template" on the
// templates sitting at positions 7–12, the intro states the watermark and the
// pass, and restaurant gained a format section with a filled sample (and a
// sample tax fix: it was 8% in Oregon, which has no sales tax).
const TEMPLATES_CATEGORY_TITLES: ReadonlySet<string> = new Set([
  "grocery-store", "clothing-store-receipt", "childcare-receipt", "bar", "hardware-store-receipt", "restaurant",
]);
const TEMPLATES_CATEGORY_TITLES_UPDATED = "2026-11-18";

// 2026-11-19: same pass for gas station and airline (title, H1, intro, meta).
const TEMPLATES_CATEGORY_TITLES_2: ReadonlySet<string> = new Set(["gas-station", "airline-receipt"]);
const TEMPLATES_CATEGORY_TITLES_2_UPDATED = "2026-11-19";

// 2026-11-20: copy guardrails. "Replace a lost … receipt" uses are rewritten
// as record-keeping, business or mockup uses, and the insurance-claim FAQs
// (electronics, veterinary) now say a made receipt is not proof of purchase.
const TEMPLATES_COPY_GUARDRAILS: ReadonlySet<string> = new Set([
  "airline-receipt", "bar", "car-rental-receipt", "dry-cleaning-receipt", "electronics-store-receipt",
  "fast-food-receipt", "hardware-store-receipt", "hotel", "pet-store-receipt", "pizza-receipt",
  "restaurant", "spa-receipt", "veterinary-receipt",
]);
const TEMPLATES_COPY_GUARDRAILS_UPDATED = "2026-11-20";

// 2026-11-20: SEOZONE batch. Grocery (meta, intro, itemized section), payment
// receipt (title, H1, meta, payment-methods section) and taxi (three sections,
// one FAQ) changed; retail store and electronics gained a brand hand-off; the
// new email receipt template joined the payments group, which moved the
// related-template links of the four pages before it in that ring.
const TEMPLATES_NOV20_BATCH: ReadonlySet<string> = new Set([
  "grocery-store", "payment-receipt", "taxi", "retail-store", "electronics-store-receipt",
  "email-receipt", "cash-receipt", "sales-receipt", "itemized-receipt",
]);
const TEMPLATES_NOV20_BATCH_UPDATED = "2026-11-20";

export function templateReviewedAt(t: ReceiptTemplate): string {
  if (TEMPLATES_NOV20_BATCH.has(t.slug)) return TEMPLATES_NOV20_BATCH_UPDATED;
  if (TEMPLATES_COPY_GUARDRAILS.has(t.slug)) return TEMPLATES_COPY_GUARDRAILS_UPDATED;
  if (TEMPLATES_CATEGORY_TITLES_2.has(t.slug)) return TEMPLATES_CATEGORY_TITLES_2_UPDATED;
  if (TEMPLATES_CATEGORY_TITLES.has(t.slug)) return TEMPLATES_CATEGORY_TITLES_UPDATED;
  if (TEMPLATES_SELL_PAGES.has(t.slug)) return TEMPLATES_SELL_PAGES_UPDATED;
  if (TEMPLATES_NEW_NEIGHBOURS.has(t.slug)) return TEMPLATES_NEW_NEIGHBOURS_UPDATED;
  if (TEMPLATES_META_WATERMARK.has(t.slug)) return META_WATERMARK_UPDATED;
  return templateReviewedAtNov(t);
}

function templateReviewedAtNov(t: ReceiptTemplate): string {
  const latest = templateReviewedAtSamples(t);
  const paywall = TEMPLATES_PAYWALL_FIXED.has(t.slug) && TEMPLATES_PAYWALL_UPDATED > latest ? TEMPLATES_PAYWALL_UPDATED : latest;
  const staffed = (t.defaults.register || t.defaults.cashier) && TEMPLATES_STAFF_LINE_UPDATED > paywall ? TEMPLATES_STAFF_LINE_UPDATED : paywall;
  const hubbed = TEMPLATES_HUB_FIXED.has(t.slug) || hasMoreThanEightBrands(t.slug);
  const hub = hubbed && TEMPLATES_HUB_UPDATED > staffed ? TEMPLATES_HUB_UPDATED : staffed;
  const changed = TEMPLATES_NOV_DEPTH.has(t.slug) || TEMPLATES_INVOICE_HUB.has(t.slug);
  const deepened = changed && TEMPLATES_NOV_DEPTH_UPDATED > hub ? TEMPLATES_NOV_DEPTH_UPDATED : hub;
  const linked = linksChangedNov16(`/templates/${t.slug}`) || examplesForTemplate(t.slug).length > 0;
  return newest(deepened, linked ? LINKS_NOV16_UPDATED : null);
}

function templateReviewedAtSamples(t: ReceiptTemplate): string {
  const reviewed = TEMPLATES_RELATED_UPDATED > templateReviewedAtBefore(t) ? TEMPLATES_RELATED_UPDATED : templateReviewedAtBefore(t);
  const headed = TEMPLATES_HEADINGS_FIXED.has(t.slug) && TEMPLATES_HEADINGS_UPDATED > reviewed ? TEMPLATES_HEADINGS_UPDATED : reviewed;
  const clustered = TEMPLATES_CLUSTER_UPDATED > headed ? TEMPLATES_CLUSTER_UPDATED : headed;
  const linked = TEMPLATES_GDOC_LINKED.has(t.slug) && TEMPLATES_GDOC_UPDATED > clustered ? TEMPLATES_GDOC_UPDATED : clustered;
  return TEMPLATES_SAMPLE_FIXED.has(t.slug) && TEMPLATES_SAMPLE_UPDATED > linked ? TEMPLATES_SAMPLE_UPDATED : linked;
}

function templateReviewedAtBefore(t: ReceiptTemplate): string {
  if (TEMPLATES_DEEPENED.has(t.slug)) return TEMPLATES_DEEPENED_UPDATED;
  if (TEMPLATES_ADDED[t.slug]) return TEMPLATES_ADDED[t.slug];
  if (TEMPLATES_RETITLED.has(t.slug)) return TEMPLATES_RETITLED_UPDATED;
  if (TEMPLATES_DOWNLOAD_CLAIM_FIXED.has(t.slug)) return TEMPLATES_CLAIM_UPDATED;
  if (TEMPLATES_DEREALISTICISED.has(t.slug)) return TEMPLATES_COPY_UPDATED;
  if (t.sources?.length) return TEMPLATES_CITED_UPDATED;
  if (sourcedFigure(t)) return TEMPLATES_FIGURE_UPDATED;
  return TEMPLATES_UPDATED;
}

// 2026-10-04: every guide links its brand's template page in the body
// ("{Brand} receipt generator"), and the brand chip no longer disappears on
// brands with a single guide. The /receipt-help index keeps INTENT_UPDATED.
export const INTENT_LINKS_UPDATED = "2026-10-04";

// 2026-10-22: every guide gains a "make one for your records instead" link to
// its brand template directly under the lead, above the fold.
export const INTENT_TOP_LINK_UPDATED = "2026-10-22";

// 2026-10-24: the closing CTA on every guide states the download terms (free,
// no sign-up, watermarked; Pro removes it) instead of naming 298 brands' "Pro
// layouts", and the rebuild step no longer says to sign in to download.
export const INTENT_PAYWALL_UPDATED = "2026-10-24";

// 2026-10-27: the mid-guide box links the brand page and the brand's category
// template instead of /create, and every guide gains a "Can I make a
// replacement receipt?" FAQ (visible and in the FAQ JSON-LD).
export const INTENT_HUB_LINK_UPDATED = "2026-10-27";

// 2026-11-16: guides for 18 brands (HANDOFF in lib/intent-pages.ts) hand the
// reader to the brand's sell page above the fold and again at the end, with
// the download terms; several of them were also retitled around the queries
// they rank for (CONTENT_OVERRIDES). Every guide of those brands changed, so
// the date is per brand; all other guides keep their older dates.
export const INTENT_HANDOFF_UPDATED = "2026-11-16";

/** When a receipt-help guide was last reviewed. */
export function intentReviewedAt(brandSlug: string): string {
  return newest(
    hasOfficialSource(brandSlug) ? INTENT_CITED_UPDATED : INTENT_UPDATED,
    INTENT_LINKS_UPDATED,
    INTENT_TOP_LINK_UPDATED,
    INTENT_PAYWALL_UPDATED,
    INTENT_HUB_LINK_UPDATED,
    hasHandoff(brandSlug) ? INTENT_HANDOFF_UPDATED : null,
    INTENT_FAQ_EXPENSE_UPDATED,
    INTENT_RECORDS_WORDING_UPDATED,
    INTENT_PHONE_LAYOUT_UPDATED,
  );
}

// 2026-11-16: the shared "Can I make a replacement … receipt?" FAQ on every
// guide dropped "or claim an expense", which contradicted the guides' own
// "handy for an expense report" section. Every guide carries that FAQ.
const INTENT_FAQ_EXPENSE_UPDATED = "2026-11-16";

// 2026-11-20: every guide's builder hand-off stopped offering to "recreate" a
// lost receipt for an expense report or reimbursement. The sections, CTAs and
// the shared FAQ now say "make a receipt for your records" and that it is not
// proof of purchase. Nike and KFC also got their own rewrites the same day.
const INTENT_RECORDS_WORDING_UPDATED = "2026-11-20";

// 2026-11-23: phone layout on every guide — the offer under the answer is a
// tappable row with new wording ("Make a {brand}-style receipt · for your own
// records · free with a watermark"), and the card after the first answer drops
// its hub-template sentence on phones. Visible text changed on all of them.
const INTENT_PHONE_LAYOUT_UPDATED = "2026-11-23";

/** Latest of several ISO dates (YYYY-MM-DD sorts as text); nulls are skipped. */
function newest(...dates: (string | null)[]): string {
  return dates.filter((d): d is string => d !== null).sort().pop()!;
}

/** Human-readable form for the visible line. */
export function formatReviewed(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
