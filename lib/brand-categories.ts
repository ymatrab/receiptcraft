import type { LineItem } from "./types";

/** User-facing brand categories for the /brands filter. */
export const BRAND_CATEGORIES = [
  "Restaurants",
  "Coffee & Cafés",
  "Grocery",
  "Retail",
  "Gas & Convenience",
  "Travel",
  "Rideshare & Delivery",
  "Digital & Subscriptions",
  "Health & Pharmacy",
  "Services & Other",
] as const;

export type BrandCategory = (typeof BRAND_CATEGORIES)[number];

/** Categories for the original hand-written brands (by slug). */
const GROUPED: Record<BrandCategory, string[]> = {
  Restaurants: [
    "mcdonalds", "burger-king", "wendy-s", "subway", "taco-bell", "kfc", "chipotle",
    "domino-s-pizza", "pizza-hut", "papa-john-s", "chick-fil-a", "panera-bread", "five-guys",
    "in-n-out-burger", "shake-shack", "panda-express", "sonic-drive-in", "dairy-queen",
    "arby-s", "jack-in-the-box", "popeyes",
  ],
  "Coffee & Cafés": [
    "starbucks", "dunkin", "tim-hortons", "peet-s-coffee", "caribou-coffee", "dutch-bros",
    "jamba-juice", "boba-guys",
  ],
  Grocery: [
    "costco", "sam-s-club", "whole-foods", "trader-joe-s", "kroger", "publix", "safeway",
    "aldi", "lidl",
  ],
  Retail: [
    "walmart", "target", "home-depot", "lowe-s", "ikea", "best-buy", "macy-s", "nordstrom",
    "sephora", "ulta-beauty", "gamestop", "apple-store", "tj-maxx", "marshalls",
    "dick-s-sporting-goods", "petco", "petsmart", "autozone", "o-reilly-auto-parts",
    "barnes-noble", "michaels", "joann", "zara", "h-m", "gucci", "rolex", "louis-vuitton",
    "dollar-tree", "microsoft-store", "amazon", "ebay",
  ],
  "Gas & Convenience": [
    "7-eleven", "shell", "chevron", "exxon", "mobil", "bp", "speedway", "wawa", "quiktrip",
    "sheetz",
  ],
  Travel: [
    "airbnb", "expedia", "booking-com", "delta-airlines", "american-airlines",
    "united-airlines", "southwest-airlines", "marriott", "hilton", "hyatt", "hertz",
    "enterprise", "avis",
  ],
  "Rideshare & Delivery": [
    "uber", "lyft", "doordash", "uber-eats", "grubhub", "postmates", "instacart",
  ],
  "Digital & Subscriptions": [
    "netflix", "spotify", "hulu", "disney", "apple-services", "google-play", "steam",
    "playstation-store", "xbox-store", "adobe", "zoom",
  ],
  "Health & Pharmacy": ["walgreens", "cvs-pharmacy"],
  "Services & Other": ["fedex", "paypal", "venmo", "planet-fitness", "amc-theatres"],
};

/** Flattened slug → category map for the original brands. */
export const EXISTING_BRAND_CATEGORY: Record<string, BrandCategory> = {};
for (const cat of BRAND_CATEGORIES) {
  for (const slug of GROUPED[cat]) EXISTING_BRAND_CATEGORY[slug] = cat;
}

/** Default emoji per category (used by generated brands without a custom icon). */
export const CATEGORY_ICON: Record<BrandCategory, string> = {
  Restaurants: "🍔",
  "Coffee & Cafés": "☕",
  Grocery: "🛒",
  Retail: "🛍️",
  "Gas & Convenience": "⛽",
  Travel: "✈️",
  "Rideshare & Delivery": "🚗",
  "Digital & Subscriptions": "💳",
  "Health & Pharmacy": "💊",
  "Services & Other": "🧾",
};

/** Intro phrasing per category, injected into generated copy. */
export const CATEGORY_NOUN: Record<BrandCategory, string> = {
  Restaurants: "menu items, combos, tax and tip",
  "Coffee & Cafés": "drinks, pastries and tax",
  Grocery: "itemized products, quantities and sales tax",
  Retail: "items, quantities, discounts and sales tax",
  "Gas & Convenience": "fuel, snacks and tax",
  Travel: "fares or nightly rates, taxes and fees",
  "Rideshare & Delivery": "trip or order charges, fees and tip",
  "Digital & Subscriptions": "subscription or order charges and tax",
  "Health & Pharmacy": "prescriptions, items and co-pays",
  "Services & Other": "services, fees and tax",
};

/** Fallback items when a generated brand seed doesn't specify its own. */
export const CATEGORY_DEFAULT_ITEMS: Record<BrandCategory, Omit<LineItem, "id">[]> = {
  Restaurants: [
    { name: "Combo Meal", quantity: 1, price: 9.99 },
    { name: "Side Order", quantity: 1, price: 3.49 },
    { name: "Soft Drink", quantity: 1, price: 2.29 },
  ],
  "Coffee & Cafés": [
    { name: "Specialty Coffee (L)", quantity: 1, price: 4.45 },
    { name: "Pastry", quantity: 1, price: 3.25 },
  ],
  Grocery: [
    { name: "Milk 1 Gal", quantity: 1, price: 3.99 },
    { name: "Bread Loaf", quantity: 1, price: 2.79 },
    { name: "Eggs 12 ct", quantity: 1, price: 3.49 },
    { name: "Bananas (lb)", quantity: 2, price: 0.59 },
  ],
  Retail: [
    { name: "Merchandise", quantity: 1, price: 24.99 },
    { name: "Accessory", quantity: 1, price: 9.99 },
  ],
  "Gas & Convenience": [
    { name: "Regular Unleaded (gal)", quantity: 10, price: 3.39 },
    { name: "Bottled Water", quantity: 1, price: 1.99 },
  ],
  Travel: [
    { name: "Reservation", quantity: 1, price: 189.0 },
    { name: "Taxes & Fees", quantity: 1, price: 32.4 },
  ],
  "Rideshare & Delivery": [
    { name: "Trip / Order", quantity: 1, price: 18.5 },
    { name: "Service Fee", quantity: 1, price: 2.75 },
  ],
  "Digital & Subscriptions": [{ name: "Monthly Subscription", quantity: 1, price: 12.99 }],
  "Health & Pharmacy": [
    { name: "Prescription Co-Pay", quantity: 1, price: 10.0 },
    { name: "Pharmacy Item", quantity: 1, price: 8.99 },
  ],
  "Services & Other": [{ name: "Service", quantity: 1, price: 25.0 }],
};
