/**
 * Hand-off links from one sell page to another, shown directly under the intro.
 *
 * Search Console splits some creation queries between two of our own sell
 * pages: "costco receipt generator" lands on /brands/sunoco as well as
 * /brands/costco, "uber receipt generator" on /templates/taxi as well as
 * /brands/uber. Each page keeps its own angle; a one-line link with the query
 * as its anchor tells the reader, and Google, which page owns the query.
 *
 * Sell page → sell page only (/brands, /templates, /examples). Never point one
 * of these at a /receipt-help or definition page: those are retrieval pages and
 * a sell page must not hand its visitors to them.
 */
export type SellLinkPart = string | { href: string; anchor: string };

/** One sentence, rendered as a single paragraph. */
export type SellLink = SellLinkPart[];

/** Keyed by brand slug (/brands/[slug]). Sunoco → Costco and taxi → Uber
 *  live in lib/contextual-links.ts. */
export const BRAND_SELL_LINKS: Readonly<Record<string, readonly SellLink[]>> = {
  "planet-fitness": [
    ["See a filled-in sample first: ", { href: "/examples/planet-fitness-receipt-membership", anchor: "Planet Fitness membership receipt example" }, "."],
  ],
  "la-fitness": [
    ["Other gym receipts: the ", { href: "/brands/planet-fitness", anchor: "Planet Fitness receipt generator" }, "."],
  ],
  "crunch-fitness": [
    ["Other gym receipts: the ", { href: "/brands/planet-fitness", anchor: "Planet Fitness receipt generator" }, "."],
  ],
  "anytime-fitness": [
    ["Other gym receipts: the ", { href: "/brands/planet-fitness", anchor: "Planet Fitness receipt generator" }, "."],
  ],
};

/** Keyed by template slug (/templates/[slug]). */
export const TEMPLATE_SELL_LINKS: Readonly<Record<string, readonly SellLink[]>> = {
  "coffee-shop": [
    ["Want the Starbucks layout? Start from the ", { href: "/brands/starbucks", anchor: "Starbucks receipt template" }, "."],
  ],
  pharmacy: [
    [
      "Prefer a brand-styled layout? Start from the ",
      { href: "/brands/cvs-pharmacy", anchor: "CVS receipt generator" },
      " or the ",
      { href: "/brands/walgreens", anchor: "Walgreens receipt generator" },
      ".",
    ],
  ],
  "retail-store": [
    [
      "Selling something specific? Use a store template made for it: ",
      { href: "/templates/clothing-store-receipt", anchor: "clothing store receipt" },
      ", ",
      { href: "/templates/hardware-store-receipt", anchor: "hardware store receipt" },
      ", ",
      { href: "/templates/electronics-store-receipt", anchor: "electronics store receipt" },
      ", ",
      { href: "/templates/pet-store-receipt", anchor: "pet store receipt" },
      " or ",
      { href: "/templates/liquor-store-receipt", anchor: "liquor store receipt" },
      ".",
    ],
  ],
  "cleaning-service-receipt": [
    ["Looking for a dry-cleaning ticket? Use the ", { href: "/templates/dry-cleaning-receipt", anchor: "dry cleaning receipt template" }, "."],
  ],
  "dry-cleaning-receipt": [
    ["Running a house-cleaning service? Use the ", { href: "/templates/cleaning-service-receipt", anchor: "house cleaning receipt template" }, "."],
  ],
};
