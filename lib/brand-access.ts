/**
 * Brand templates a free account can download watermark-free.
 *
 * Every one of the 348 brands stays free to *build and preview* — that is
 * what the brand pages promise in their titles ("Free Motel 6 Receipt
 * Generator") and their FAQs, and it is what brings the traffic. The gate is on
 * the clean download: outside this list, a free account's export always carries
 * the watermark.
 *
 * The fifty were chosen by measured click volume over 180 days of Search
 * Console, not by guesswork or by impressions. Impressions are concentrated at
 * the head while clicks are not — a top-50 chosen by impressions would have kept
 * only 44% of brand clicks, where this one keeps 68%.
 *
 * That still leaves roughly a third of brand clicks arriving on a page whose
 * clean download is now paid, which is the cost the owner accepted knowingly.
 * If this list is ever re-cut, re-cut it on clicks.
 */
export const FREE_BRAND_SLUGS: ReadonlySet<string> = new Set([
  "albert-heijn",
  "amazon",
  "amc-theatres",
  "apple-store",
  "asda",
  "avis",
  "balenciaga",
  "careem",
  "chanel",
  "chevron",
  "coles",
  "deliveroo",
  "dhl",
  "dick-s-sporting-goods",
  "epic-games",
  "five-guys",
  "food-lion",
  "fred-meyer",
  "giant-eagle",
  "google-play",
  "grab",
  "grammarly",
  "gucci",
  "guitar-center",
  "harbor-freight",
  "hermes",
  "hertz",
  "hy-vee",
  "instacart",
  "jersey-mike-s",
  "just-eat",
  "lululemon",
  "lyft",
  "micro-center",
  "morrisons",
  "napa-auto-parts",
  "panera-bread",
  "paypal",
  "petsmart",
  "planet-fitness",
  "prada",
  "priceline",
  "speedway",
  "tgi-fridays",
  "uber",
  "ulta-beauty",
  "versace",
  "vitamin-shoppe",
  "walmart",
  "xbox-store",
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
