/**
 * Hand-written link sentences for sell pages, keyed by the page they appear on.
 *
 * Template, brand and comparison pages are rendered from data, and none of that
 * data can carry a link, so the only internal links in their body copy were the
 * generated ones (hub template, neighbouring brands, related cards). These are
 * the ones a person would write: a hand-off to the page that owns a query, or a
 * pointer to the closer template, placed under the intro where a reader decides.
 *
 * Each entry is one short paragraph. Mark the link as `{link:/path|anchor}`;
 * it renders through CitedText (components/Sources.tsx), which also accepts
 * `{cite:…}` markers.
 *
 * Rules, because these are sell pages:
 *  - link to other sell pages (templates, brands, examples) only — never to
 *    /receipt-help/* or a definition post;
 *  - no links to /create, which has more than it needs;
 *  - state nothing about a brand that is not already true of our template or
 *    common knowledge about the company.
 *
 * Adding or changing an entry changes that page's visible content, so it also
 * moves the page's sitemap date (LINKS_NOV16_UPDATED in lib/content-dates.ts
 * reads this map). A later batch should get its own constant there.
 */
export const CONTEXT_LINKS: Readonly<Record<string, readonly string[]>> = {
  // "walmart receipt generator" → /brands/walmart (ranks 6.5, 2026-11-13).
  "/templates/retail-store": [
    "Rebuilding a supercenter receipt? The {link:/brands/walmart|Walmart receipt generator} opens with a Walmart-style layout, items and tax already filled in.",
  ],
  "/templates/grocery-store": [
    "Did the grocery run happen at Walmart? Start from the {link:/brands/walmart|Walmart receipt generator}, which already has the store fields and a grocery-and-household basket in place.",
  ],
  "/brands/target": [
    "Bought it at Walmart instead? Use the {link:/brands/walmart|Walmart receipt generator}.",
  ],
  "/compare/receiptbaker": [
    "ReceiptBaker's templates are organised by category. Makecepeit adds named brands on top of those: the {link:/brands/walmart|Walmart receipt generator}, for example, opens with a Walmart-style layout already filled in.",
  ],

  // "restaurant receipt" → /templates/restaurant (ranks 27.2).
  "/brands/mcdonalds": [
    "Need a receipt for a sit-down meal with a server, a table number and a tip line rather than a counter order? Start from the {link:/templates/restaurant|restaurant receipt} template.",
  ],
  "/templates/fast-food-receipt": [
    "Table service with a server and a tip line? Use the {link:/templates/restaurant|restaurant receipt} template instead.",
  ],
  "/templates/catering-receipt": [
    "Serving the meal at your own tables rather than catering an event? The {link:/templates/restaurant|restaurant receipt} template has the server, table and tip lines.",
  ],

  // "pharmacy receipt" → /templates/pharmacy (ranks 11.2).
  "/templates/medical-receipt": [
    "Paying for over-the-counter medicine rather than a visit? Use the {link:/templates/pharmacy|pharmacy receipt} template.",
  ],

  // "gas receipts" → /templates/gas-station (ranks 25.5).
  "/templates/car-rental-receipt": [
    "Refuelled before returning the car? Keep the fill-up off the rental receipt and make {link:/templates/gas-station|gas receipts} for it instead, with gallons, price per gallon and pump number.",
  ],
  "/templates/fuel-bill": [
    "For U.S.-style {link:/templates/gas-station|gas receipts} in gallons and dollars, with a pump number and price per gallon, use the gas station template.",
  ],

  // "store receipt" → /templates/retail-store: the related-template line the
  // task asked for on the three specialist store templates.
  "/templates/clothing-store-receipt": [
    "Need a general store receipt? Use the {link:/templates/retail-store|retail store receipt} template.",
  ],
  "/templates/electronics-store-receipt": [
    "Need a general store receipt? Use the {link:/templates/retail-store|retail store receipt} template.",
  ],
  "/templates/hardware-store-receipt": [
    "Need a general store receipt? Use the {link:/templates/retail-store|retail store receipt} template.",
  ],

  // Hand-offs to the sell page that owns a split query (keyword map, 2026-11-16).
  "/templates/taxi": [
    "Riding with Uber? The {link:/brands/uber|Uber receipt generator} lays out an Uber-style trip receipt; this template is for taxis, cabs and other car services.",
  ],
  "/brands/sunoco": [
    "Filled up at a Costco warehouse instead? Use the {link:/brands/costco|Costco receipt generator}.",
  ],

  // Crawled, not indexed (2026-11-13): /brands/avis and /brands/ups had no
  // body link from a related brand.
  "/brands/hertz": [
    "Rented from Avis instead? Use the {link:/brands/avis|Avis receipt generator}.",
  ],
  "/brands/budget-car-rental": [
    "Rented from Avis instead? Use the {link:/brands/avis|Avis receipt generator}.",
  ],
  "/brands/the-ups-store": [
    "Shipped directly with UPS rather than through a UPS Store location? Use the {link:/brands/ups|UPS receipt generator}.",
  ],
  "/brands/fedex": [
    "Sent it with UPS instead? Use the {link:/brands/ups|UPS receipt generator}.",
  ],
};

/** The link paragraphs for one page path, or an empty list. */
export function contextLinksFor(path: string): readonly string[] {
  return CONTEXT_LINKS[path] ?? [];
}
