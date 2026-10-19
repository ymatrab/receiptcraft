import type { BrandCategory } from "./brand-categories";

// Topic clusters: which template pages and brand pages belong together.
//
// Until Oct 2026 every template page listed the same first four templates as
// "related" (grocery, restaurant, coffee shop, gas station), and no template
// linked a single brand. The site read as one flat list. Grouping the links
// by topic lets each hub (a template) and its spokes (the brands of that
// kind) pass authority to each other, the way brand pages already do with
// their same-category neighbours.

/** Template slugs grouped by topic. Every template in lib/templates.ts sits in exactly one group. */
const TEMPLATE_GROUPS: string[][] = [
  // Food & drink
  ["restaurant", "fast-food-receipt", "pizza-receipt", "coffee-shop", "bar", "catering-receipt"],
  // Shops
  [
    "grocery-store", "retail-store", "clothing-store-receipt", "electronics-store-receipt",
    "hardware-store-receipt", "pet-store-receipt", "liquor-store-receipt", "florist-receipt",
  ],
  // Car & travel
  [
    "gas-station", "fuel-bill", "taxi", "parking", "car-rental-receipt", "airline-receipt",
    "hotel", "auto-repair", "oil-change-receipt", "towing-receipt",
  ],
  // Health
  ["pharmacy", "medical-receipt", "dental-receipt", "veterinary-receipt"],
  // Personal & home services
  [
    "salon", "barber-receipt", "spa-receipt", "gym-membership-receipt", "dry-cleaning-receipt",
    "cleaning-service-receipt", "handyman-receipt", "tutoring-receipt", "childcare-receipt",
  ],
  // Payments & rent
  [
    "payment-receipt", "cash-receipt", "sales-receipt", "itemized-receipt", "proof-of-purchase",
    "donation-receipt", "rent-receipt", "rent-receipt-india", "rent-receipt-ontario", "vat-receipt",
  ],
  // Invoices. Order matters: relatedTemplateSlugs takes the next four, so the
  // /templates/invoice hub links the four document types (estimate, pro forma,
  // credit note, GST bill) and the trade invoices are linked from the rest.
  [
    "invoice", "estimate", "proforma-invoice", "credit-note", "bill-format",
    "tax-invoice-australia", "plumbing-invoice", "hvac-invoice",
  ],
];

/**
 * The next `n` templates in the same group, wrapping round, so each page links
 * different neighbours instead of every page linking the same few.
 */
export function relatedTemplateSlugs(slug: string, n = 4): string[] {
  const group = TEMPLATE_GROUPS.find((g) => g.includes(slug));
  if (!group) return [];
  const at = group.indexOf(slug);
  return Array.from({ length: Math.min(n, group.length - 1) }, (_, i) => group[(at + 1 + i) % group.length]);
}

/** The template a brand of each category is closest to, when the brand has no override below. */
const CATEGORY_TEMPLATE: Record<BrandCategory, string> = {
  Restaurants: "restaurant",
  "Coffee & Cafés": "coffee-shop",
  Grocery: "grocery-store",
  Retail: "retail-store",
  "Gas & Convenience": "gas-station",
  Travel: "hotel",
  "Rideshare & Delivery": "taxi",
  "Digital & Subscriptions": "sales-receipt",
  "Health & Pharmacy": "pharmacy",
  "Services & Other": "sales-receipt",
};

const each = (slugs: string[], templates: string[]) =>
  Object.fromEntries(slugs.map((s) => [s, templates]));

/**
 * Brands whose category is too broad for one template ("Retail" covers Gucci
 * and Home Depot). The first template listed is the brand's hub.
 */
const BRAND_TEMPLATES_OVERRIDE: Record<string, string[]> = {
  ...each(
    [
      "mcdonalds", "burger-king", "wendy-s", "taco-bell", "kfc", "chick-fil-a", "sonic-drive-in",
      "jack-in-the-box", "arby-s", "popeyes", "five-guys", "in-n-out-burger", "shake-shack",
      "dairy-queen", "white-castle", "checkers", "carl-s-jr", "hardees", "del-taco", "whataburger",
      "raising-canes", "bojangles", "zaxbys", "church-s-chicken", "culvers", "steak-n-shake",
    ],
    ["fast-food-receipt"],
  ),
  ...each(
    ["domino-s-pizza", "pizza-hut", "papa-john-s", "little-caesars", "marco-s-pizza", "blaze-pizza", "mod-pizza"],
    ["pizza-receipt"],
  ),
  ...each(["doordash", "uber-eats", "grubhub", "postmates", "deliveroo", "just-eat", "caviar"], ["restaurant"]),
  ...each(["instacart", "gopuff", "shipt"], ["grocery-store"]),
  ...each(
    [
      "delta-airlines", "american-airlines", "united-airlines", "southwest-airlines", "jetblue",
      "alaska-airlines", "spirit-airlines", "frontier-airlines", "british-airways", "emirates", "air-canada",
    ],
    ["airline-receipt"],
  ),
  ...each(
    ["hertz", "enterprise", "avis", "budget-car-rental", "national-car-rental", "alamo", "sixt"],
    ["car-rental-receipt"],
  ),
  ...each(
    [
      "macy-s", "nordstrom", "zara", "h-m", "gucci", "louis-vuitton", "tj-maxx", "marshalls", "kohls",
      "jcpenney", "ross-dress-for-less", "burlington", "old-navy", "gap", "banana-republic", "j-crew",
      "uniqlo", "forever-21", "urban-outfitters", "american-eagle", "hollister", "victorias-secret",
      "lululemon", "nike", "adidas", "foot-locker", "dsw", "coach", "michael-kors", "kate-spade",
      "burberry", "prada", "chanel", "hermes", "dior", "versace", "balenciaga",
    ],
    ["clothing-store-receipt"],
  ),
  ...each(
    ["best-buy", "apple-store", "gamestop", "microsoft-store", "micro-center", "newegg"],
    ["electronics-store-receipt"],
  ),
  ...each(
    ["home-depot", "lowe-s", "ace-hardware", "harbor-freight", "menards", "tractor-supply"],
    ["hardware-store-receipt"],
  ),
  ...each(["petco", "petsmart"], ["pet-store-receipt"]),
  ...each(
    ["autozone", "o-reilly-auto-parts", "advance-auto-parts", "pep-boys", "napa-auto-parts"],
    ["auto-repair"],
  ),
  ...each(["total-wine"], ["liquor-store-receipt"]),
  ...each(
    ["planet-fitness", "la-fitness", "equinox", "orangetheory", "crunch-fitness", "anytime-fitness"],
    ["gym-membership-receipt"],
  ),
  // Payment apps record a payment between two parties, so they sit with the
  // invoice and payment-receipt pages rather than with a kind of shop.
  ...each(["paypal", "venmo"], ["invoice", "sales-receipt", "proof-of-purchase"]),
};

/** The template pages a brand page should link, hub first. */
export function templatesForBrand(slug: string, category: BrandCategory): string[] {
  return BRAND_TEMPLATES_OVERRIDE[slug] ?? [CATEGORY_TEMPLATE[category]];
}

/** The template a brand counts towards as a spoke: the first entry of templatesForBrand. */
export function hubTemplateForBrand(slug: string, category: BrandCategory): string {
  return templatesForBrand(slug, category)[0];
}
