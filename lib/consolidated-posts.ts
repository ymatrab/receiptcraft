/**
 * Blog posts folded into the page that should own their query.
 *
 * The August 2026 sprint published several posts against variants of the same
 * intent, and the content ledger flagged the overlap at the time ("overlaps
 * #13/#16"). Search Console for 1–30 Aug 2026 shows what it cost: seven posts
 * covering roughly 8,900 searches a month between them returned
 *
 *   902 impressions and 2 clicks
 *
 * with the head terms going to /create and the homepage, which sat at position
 * 88–90 apiece because the signal was split eight ways. Three of the posts hold
 * good positions on nothing at all — receipt-maker-free ranks 6th and takes six
 * impressions a month.
 *
 * Consolidating passes their links and topical signal to one owner instead of
 * splitting it. Redirects are permanent (301).
 *
 * These are entries in a map, not deletions: the Sanity documents are untouched
 * and still hold their bodies and images, so reversing a call here is deleting
 * a line. Removing the line restores the post everywhere, because every blog
 * surface reads the same two query helpers.
 *
 * What is deliberately NOT here:
 *
 *  - how-to-make-a-receipt — kept as the canonical how-to. Informational intent
 *    a guide can legitimately own, and the strongest of that group.
 *  - how-to-make-a-receipt-of-payment — a genuinely distinct sub-intent
 *    ("receipt of payment" is its own query with its own volume), not a
 *    rephrasing of the one above.
 *  - best-free-receipt-generator — comparison intent, hub /alternatives. It
 *    takes 543 impressions, the most of the group, and outranks /create for
 *    "receipt maker" (67.8 vs 88.9). That ranking is incidental to what the
 *    page is for; folding a roundup into a tool page would lose the comparison
 *    intent rather than consolidate it.
 */
export const CONSOLIDATED_POSTS: ReadonlyMap<string, string> = new Map([
  // Commercial duplicates of the builder. /create owns "receipt maker" and
  // "create a receipt" as of 2026-09-01.
  ["create-a-receipt", "/create"],
  ["receipt-maker-free", "/create"],
  ["receipt-generator-free", "/create"],
  ["online-receipt-maker", "/create"],
  // Same how-to, different phrasing. The ledger already marked these as
  // overlapping each other.
  ["make-a-receipt", "/blog/how-to-make-a-receipt"],
  // The Amazon retrieval pair. Measured on the Semrush positions export of
  // 2026-09-09: four queries worth 3,220 searches a month where both pages
  // rank, and the guide wins every head-to-head.
  //
  //                                        help   blog
  //   how to get a receipt from amazon       52     61   (1,900/mo)
  //   how do i get a receipt from amazon     39     45   (1,000/mo)
  //   how to get receipts from amazon        50     60   (  210/mo)
  //   where to find amazon receipt           35      -   (  110/mo)
  //
  // Worth being clear about what this does and does not buy. These are
  // retrieval queries — someone wants their own Amazon receipt, which we cannot
  // give them — so consolidating earns no revenue. It is here because two of
  // our pages were splitting one signal for free, not because the traffic
  // converts. The guide is the right owner: it answers with Amazon's own
  // invoice route, which is what the searcher actually needs.
  ["amazon-receipt-download", "/receipt-help/amazon-receipt-copy"],
]);

/** Where a consolidated post's URL should send readers, or null if it is live. */
export function consolidationTarget(slug: string): string | null {
  return CONSOLIDATED_POSTS.get(slug) ?? null;
}

/** Drop consolidated posts from any list of slugs or post stubs. */
export function withoutConsolidated<T extends { slug: string }>(posts: T[]): T[] {
  return posts.filter((p) => !CONSOLIDATED_POSTS.has(p.slug));
}
