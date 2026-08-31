/**
 * Brand templates a free account can use.
 *
 * Every one of the 348 brands stays free to *build and preview* — that is
 * what the brand pages promise in their titles ("Free Motel 6 Receipt
 * Generator") and their FAQs, and it is what brings the traffic. The gate is on
 * the clean download: outside this list, a free account's export always carries
 * the watermark.
 *
 * The fifty are chosen by measured click volume over 180 days of Search
 * Console, counted across BOTH page types that lead here.
 *
 * The first cut used /brands/* clicks alone and kept only 29% of
 * brand-attributable traffic free. That was the wrong denominator: 51% of all
 * site traffic lands on /receipt-help/*, and every one of those pages links to
 * a brand template via /create?template={brandSlug}. Chipotle, McDonald's,
 * Dunkin and Domino's — the actual top drivers — were all behind the gate, and
 * 97% of receipt-help clicks met a paywall.
 *
 * Counting both sources together, this list keeps 74% of brand clicks free.
 *
 * If it is ever re-cut: rank on CLICKS, summed across /receipt-help and
 * /brands. Impressions concentrate at the head and clicks do not, and /brands
 * alone is under a third of the picture.
 */
export const FREE_BRAND_SLUGS: ReadonlySet<string> = new Set([
  "7-eleven",
  "albert-heijn",
  "aldi",
  "amazon",
  "apple-store",
  "autozone",
  "barnes-noble",
  "bp",
  "burger-king",
  "chanel",
  "chick-fil-a",
  "chipotle",
  "deliveroo",
  "dhl",
  "dick-s-sporting-goods",
  "dollar-tree",
  "domino-s-pizza",
  "dunkin",
  "exxon",
  "food-lion",
  "gamestop",
  "giant-eagle",
  "grab",
  "gucci",
  "guitar-center",
  "h-m",
  "harbor-freight",
  "jersey-mike-s",
  "kfc",
  "kroger",
  "marriott",
  "mcdonalds",
  "nordstrom",
  "panda-express",
  "paypal",
  "petsmart",
  "pizza-hut",
  "planet-fitness",
  "publix",
  "safeway",
  "sephora",
  "subway",
  "taco-bell",
  "tgi-fridays",
  "tim-hortons",
  "trader-joe-s",
  "united-airlines",
  "walmart",
  "whole-foods",
  "zara",
]);

/**
 * Whether this BRAND is one of the free fifty.
 *
 * Only call this when the slug is already known to be a brand — a brand page,
 * or brand data. For "does this template need Pro?" use templateNeedsPro() in
 * lib/templates.ts instead.
 *
 * The difference is not cosmetic. This function returns false for every generic
 * template too (grocery-store, restaurant, taxi…), because they are not in the
 * set — so using it as a paywall check locks the entire free builder. That
 * shipped once.
 */
export function isFreeBrand(slug: string | null | undefined): boolean {
  if (!slug) return true; // not a brand template at all — the generic builder stays free
  return FREE_BRAND_SLUGS.has(slug);
}
