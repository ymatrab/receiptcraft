import { getAllPosts, type BlogPostStub } from "./sanity/queries";
import { CONSOLIDATED_POSTS } from "./consolidated-posts";

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
    { slug: "how-to-make-a-receipt-of-payment", title: "How to Make a Receipt of Payment" },
    { slug: "photography-receipt-generator", title: "Photography Receipt Generator" },
    { slug: "veterinary-receipt-generator", title: "Veterinary Receipt Generator" },
    { slug: "florist-receipt-generator-custom-logo", title: "Florist Receipt Generator" },
    { slug: "food-truck-receipt-generator-tax-tip", title: "Food Truck Receipt Generator" },
    { slug: "gym-membership-receipt-generator", title: "Gym Membership Receipt Generator" },
    { slug: "dry-cleaning-receipt-generator", title: "Dry Cleaning Receipt Generator" },
    { slug: "towing-service-receipt-generator", title: "Towing Service Receipt Generator" },
    { slug: "pet-grooming-receipt-generator", title: "Pet Grooming Receipt Generator" },
    { slug: "electronics-store-receipt-generator-sku", title: "Electronics Store Receipt Generator" },
    { slug: "clothing-store-receipt-generator-discount", title: "Clothing Store Receipt Generator" },
    { slug: "hardware-store-receipt-generator-itemized-materials", title: "Hardware Store Receipt Generator" },
    { slug: "pharmacy-receipt-generator-itemized-products", title: "Pharmacy Receipt Generator" },
    { slug: "receipts-ui-ux-mockups", title: "Using Realistic Receipts in UI/UX Mockups" },
    { slug: "how-to-make-a-receipt-online", title: "How to Make a Receipt Online" },
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
