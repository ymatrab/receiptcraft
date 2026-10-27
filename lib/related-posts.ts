import { getAllPosts, type BlogPostStub } from "./sanity/queries";
import { CONSOLIDATED_POSTS } from "./consolidated-posts";
import { BRAND_TEMPLATES } from "./brands";
import { TEMPLATES } from "./templates";

export interface RelatedPost {
  slug: string;
  title: string;
}

/**
 * Hub pages had zero links back down to their own blog spokes (link equity
 * only flowed spoke -> hub). Sourced from docs/content-ledger.md's Hub column
 * (published posts only) — update this alongside the ledger when a new post
 * ships and its Hub is one of the keys below.
 */
const POSTS_BY_HUB: Record<string, RelatedPost[]> = {
  "/create": [
    { slug: "how-to-make-a-receipt", title: "How to Make a Receipt" },
    { slug: "photography-receipt-generator", title: "Photography Receipt Generator" },
    { slug: "food-truck-receipt-generator-tax-tip", title: "Food Truck Receipt Generator" },
    { slug: "pet-grooming-receipt-generator", title: "Pet Grooming Receipt Generator" },
    { slug: "receipts-ui-ux-mockups", title: "Using Realistic Receipts in UI/UX Mockups" },
    { slug: "how-to-make-a-receipt-online", title: "How to Make a Receipt Online" },
  ],
  // 2026-10-27: these posts were spokes of /create from before their subjects
  // had template pages. /create already has ~1,160 internal links; the
  // template page is the one that should rank for "{x} receipt generator", and
  // GSC showed the pharmacy post splitting that query with /templates/pharmacy.
  "/templates/payment-receipt": [
    { slug: "how-to-make-a-receipt-of-payment", title: "How to Make a Receipt of Payment" },
  ],
  "/templates/veterinary-receipt": [
    { slug: "veterinary-receipt-generator", title: "Veterinary Receipt Generator" },
  ],
  "/templates/florist-receipt": [
    { slug: "florist-receipt-generator-custom-logo", title: "Florist Receipt Generator" },
  ],
  "/templates/gym-membership-receipt": [
    { slug: "gym-membership-receipt-generator", title: "Gym Membership Receipt Generator" },
  ],
  "/templates/dry-cleaning-receipt": [
    { slug: "dry-cleaning-receipt-generator", title: "Dry Cleaning Receipt Generator" },
  ],
  "/templates/towing-receipt": [
    { slug: "towing-service-receipt-generator", title: "Towing Service Receipt Generator" },
  ],
  "/templates/electronics-store-receipt": [
    { slug: "electronics-store-receipt-generator-sku", title: "Electronics Store Receipt Generator" },
  ],
  "/templates/clothing-store-receipt": [
    { slug: "clothing-store-receipt-generator-discount", title: "Clothing Store Receipt Generator" },
  ],
  "/templates/hardware-store-receipt": [
    { slug: "hardware-store-receipt-generator-itemized-materials", title: "Hardware Store Receipt Generator" },
  ],
  "/templates/pharmacy": [
    { slug: "pharmacy-receipt-generator-itemized-products", title: "Pharmacy Receipt Generator" },
  ],
  "/alternatives": [
    { slug: "best-free-receipt-generator", title: "Best Free Receipt Generator" },
    { slug: "receiptmakerly-alternative", title: "Receiptmakerly Alternative" },
    { slug: "expressexpense-alternative", title: "ExpressExpense Alternative" },
  ],
  "/templates/restaurant": [
    { slug: "how-to-write-tip-on-receipt", title: "How to Write a Tip on a Receipt" },
    { slug: "meal-receipts-business-expenses", title: "Receipt Rules for Business Meals" },
  ],
  // 2026-10-08: posts Google had never discovered (URL Inspection: "URL is
  // unknown to Google") or had dropped, given a link from the template page on
  // their subject. Template pages are crawled and mostly indexed but linked to
  // no posts at all. The curated list renders newest-last, up to four.
  "/templates/proof-of-purchase": [
    { slug: "audit-without-receipts-cohan-rule", title: "What Happens If You're Audited Without Receipts?" },
    { slug: "warranty-claim-without-receipt", title: "Can You Claim a Warranty Without a Receipt?" },
    { slug: "how-stores-verify-receipts", title: "How Do Stores Verify Receipts?" },
    { slug: "how-to-spot-a-fake-receipt", title: "How Do Businesses Detect Fake Receipts?" },
  ],
  "/templates/donation-receipt": [
    { slug: "goodwill-donation-receipt-template", title: "Goodwill Donation Receipt Template" },
    { slug: "donation-receipt-requirements", title: "What Must a 501(c)(3) Donation Receipt Include?" },
  ],
  "/templates/gas-station": [
    { slug: "gas-station-receipt-copy", title: "How to Get a Gas Station Receipt After Driving Off" },
  ],
  "/templates/retail-store": [
    { slug: "faded-receipt-fix-reddit", title: "Why Do Receipts Fade?" },
    { slug: "gift-receipt-explained", title: "How Do Gift Receipts Work?" },
  ],
  "/templates/itemized-receipt": [
    { slug: "how-receipt-ocr-works", title: "How Does Receipt OCR Work?" },
    { slug: "organize-receipts-expense-reports", title: "How to Organize Receipts for Expense Reports" },
    { slug: "itemized-receipt-guide", title: "What Is an Itemized Receipt?" },
  ],
  "/templates/hotel": [
    { slug: "how-to-make-a-hotel-receipt", title: "How to Make a Hotel Receipt" },
  ],
  "/templates/cash-receipt": [
    { slug: "partial-payment-receipt", title: "How to Write a Deposit or Partial Payment Receipt" },
  ],
  "/templates/sales-receipt": [
    { slug: "receipt-organization-systems", title: "7 Ways to Organize Receipts, Compared" },
    { slug: "recording-receipts-bookkeeping", title: "How to Record Receipts in Bookkeeping" },
    { slug: "what-is-a-receipt-number", title: "What Is a Receipt Number?" },
    { slug: "how-to-write-a-receipt", title: "How to Write a Receipt" },
  ],
  "/templates/vat-receipt": [
    { slug: "receipt-requirements-by-country", title: "Receipt Requirements in the US, UK, EU, Canada and Australia" },
  ],
  "/templates/grocery-store": [
    { slug: "receipt-rewards-apps-reddit", title: "Are Receipt Rewards Apps Worth It?" },
  ],
  "/templates/rent-receipt": [
    { slug: "security-deposit-receipt", title: "What Must a Security Deposit Receipt Include?" },
  ],
  "/templates/invoice": [
    { slug: "switch-to-digital-receipts", title: "How to Switch Your Business to Digital Receipts" },
    { slug: "home-office-deduction-receipts", title: "Receipts for the Home Office Deduction" },
    { slug: "small-business-deductions-receipts", title: "Which Small-Business Deductions Need Receipts?" },
  ],
  "/compare/makereceipt": [{ slug: "makereceipt-alternative", title: "MakeReceipt Alternative" }],
  "/compare/receiptfaker": [{ slug: "receiptfaker-alternative", title: "ReceiptFaker Alternative" }],
  "/compare/receiptbaker": [{ slug: "receiptbaker-alternative", title: "ReceiptBaker Alternative" }],
  "/brands/cvs-pharmacy": [{ slug: "cvs-pharmacy-receipt", title: "CVS Pharmacy Receipt" }],
  "/brands/louis-vuitton": [{ slug: "louis-vuitton-receipt", title: "Louis Vuitton Receipt" }],
  "/brands/doordash": [{ slug: "doordash-receipt", title: "DoorDash Receipt" }],
  "/brands/burger-king": [{ slug: "burger-king-receipt", title: "Burger King Receipt" }],
};

const MAX_RELATED = 4;

/**
 * The curated map above is hand-maintained from the ledger, which only covers
 * the August sprint — so it will never reach the 349 brand pages and 220
 * receipt-help guides, and those two groups are where all the site's traffic
 * actually lands. For brand hubs we therefore fall back to matching posts by
 * the brand's own slug, which means a new brand post links itself up with no
 * ledger edit at all.
 */
const BRAND_HUB = /^\/brands\/([a-z0-9-]+)$/;

/** One Sanity round-trip per build worker instead of one per page. */
let postsOnce: Promise<BlogPostStub[]> | null = null;
function allPosts(): Promise<BlogPostStub[]> {
  if (!postsOnce) postsOnce = getAllPosts();
  return postsOnce;
}

/**
 * Match the brand slug as a whole hyphen-delimited run, so `kfc` finds
 * `kfc-receipt` but never the middle of an unrelated word. Short brand slugs
 * are safe under this rule, which is why there is no minimum length.
 */
function derivedForBrand(brandSlug: string, posts: BlogPostStub[]): RelatedPost[] {
  const escaped = brandSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const boundary = new RegExp(`(^|-)${escaped}(-|$)`);
  return posts
    .filter((p) => p.slug && boundary.test(p.slug))
    .map((p) => ({ slug: p.slug, title: p.title }));
}

/**
 * Brand-slug matching only reaches the ~12 brands that have a post named after
 * them, because that is all the brand-specific posts there are. The other 337
 * brands and every lost-receipt guide still need somewhere to go, so the last
 * resort is topical: a guide about a lost Walmart receipt is genuinely served
 * by "How Do You Prove a Purchase Without a Receipt?" even though neither
 * mentions the other.
 *
 * The list is rotated by hub rather than sliced from the top, so 220 guides do
 * not all render the same four links — same reasoning as the variant pools in
 * lib/brands.ts.
 */
function hashHub(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function derivedForCategories(
  categories: readonly string[],
  posts: BlogPostStub[],
  hub: string
): RelatedPost[] {
  const pool = posts.filter((p) => p.category && categories.includes(p.category));
  if (pool.length === 0) return [];
  const start = hashHub(hub) % pool.length;
  return [...pool.slice(start), ...pool.slice(0, start)].map((p) => ({
    slug: p.slug,
    title: p.title,
  }));
}

/**
 * Three tiers, most specific first: the hand-curated map, then posts named
 * after the brand, then topically relevant posts for the page's subject.
 * Deduped and capped so an overloaded hub — /create has 19 posts pointing at
 * it — doesn't dump its whole list onto the page.
 *
 * Sanity is only consulted when a hub can actually use it (a brand hub, or a
 * caller that passed categories); everything else is served from the map with
 * no round-trip. If Sanity is unreachable `getAllPosts` returns an empty list,
 * so the section degrades to curated-only rather than failing the page.
 */
export async function relatedPostsForHub(
  hub: string,
  categories: readonly string[] = []
): Promise<RelatedPost[]> {
  // The curated map is hand-maintained alongside the ledger, so a consolidated
  // post can be re-added to it by accident. Filtering here means the widget
  // cannot link at a URL that 301s away; the derived lists come from
  // getAllPosts, which already excludes them.
  const curated = (POSTS_BY_HUB[hub] ?? [])
    .filter((p) => !CONSOLIDATED_POSTS.has(p.slug))
    .slice(-MAX_RELATED)
    .reverse();
  const brand = BRAND_HUB.exec(hub);

  let brandPosts: RelatedPost[] = [];
  let topicPosts: RelatedPost[] = [];
  if (brand || categories.length > 0) {
    const posts = await allPosts();
    if (brand) brandPosts = derivedForBrand(brand[1], posts);
    if (categories.length > 0) topicPosts = derivedForCategories(categories, posts, hub);
  }

  const out: RelatedPost[] = [];
  const seen = new Set<string>();
  for (const post of [...curated, ...brandPosts, ...topicPosts]) {
    if (out.length >= MAX_RELATED) break;
    if (seen.has(post.slug)) continue;
    seen.add(post.slug);
    out.push(post);
  }
  return out;
}

export interface HubLink {
  href: string;
  label: string;
}

/**
 * Posts whose slug names a template by accident: "cash back" is not a cash
 * receipt. Checked against all 230 published slugs on 2026-10-27.
 */
const NO_HUB: ReadonlySet<string> = new Set(["cash-back-receipt-meaning"]);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Index of the first hyphen-delimited occurrence of `term` in `slug`, or -1. */
function termAt(slug: string, term: string): number {
  const m = new RegExp(`(^|-)${escapeRe(term)}(?=-|$)`).exec(slug);
  return m ? m.index + (m[1] ? 1 : 0) : -1;
}

/** The term that appears earliest in the slug wins: "dental-payment-receipt" is a dental receipt. */
function earliest<T>(slug: string, items: T[], term: (t: T) => string): T | undefined {
  let best: T | undefined;
  let bestAt = Infinity;
  for (const t of items) {
    const at = termAt(slug, term(t));
    if (at >= 0 && at < bestAt) {
      best = t;
      bestAt = at;
    }
  }
  return best;
}

const brandLabel = (name: string) => `${name} receipt generator`;
const templateLabel = (name: string) => `${name.toLowerCase()} template`;

/**
 * The page a post should hand its authority to: the brand or template page
 * that owns the post's subject.
 *
 * Until Oct 2026 links only ran hub → post (the map above), and every post's
 * own links went to /create. 230 posts linked brand pages 22 times in total,
 * and the Walmart posts ranked p29–37 for "walmart receipt generator" beside
 * /brands/walmart at p7, splitting the query instead of feeding it. One link
 * up, with the owner page's own keyword as the anchor, tells Google which of
 * the pages is the main one.
 *
 * Three tiers: the curated map (reversed), then a brand named in the slug,
 * then a template named in the slug. A brand counts only when "-receipt",
 * "-invoice" or "-bill" follows it, so "coach" never matches a life-coach
 * receipt. Posts with no owner page (definitions, "amount tendered") get null
 * and keep only the /create CTA.
 */
export function hubForPost(slug: string): HubLink | null {
  if (NO_HUB.has(slug)) return null;

  for (const [hub, posts] of Object.entries(POSTS_BY_HUB)) {
    if (!posts.some((p) => p.slug === slug)) continue;
    const [, kind, key] = hub.split("/");
    if (kind === "brands") {
      const b = BRAND_TEMPLATES.find((t) => t.slug === key);
      if (b) return { href: hub, label: brandLabel(b.shortName) };
    }
    if (kind === "templates") {
      const t = TEMPLATES.find((x) => x.slug === key);
      if (t) return { href: hub, label: templateLabel(t.name) };
    }
  }

  const brand = earliest(
    slug,
    BRAND_TEMPLATES.filter((b) => new RegExp(`(^|-)${escapeRe(b.slug)}-(receipt|invoice|bill)`).test(slug)),
    (b) => b.slug
  );
  if (brand) return { href: `/brands/${brand.slug}`, label: brandLabel(brand.shortName) };

  const template = earliest(slug, TEMPLATES, (t) => t.slug.replace(/-receipt$/, ""));
  if (template) return { href: `/templates/${template.slug}`, label: templateLabel(template.name) };

  return null;
}
