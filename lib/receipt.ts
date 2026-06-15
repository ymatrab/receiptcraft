import type { LayoutVariant, ReceiptData, ReceiptProfile, ReceiptTemplate } from "./types";
import { randomReceiptNumber, todayISO, nowHHMM, uid } from "./format";
import { BRAND_TEMPLATES } from "./brands";

const PROFILE_BY_SLUG: Record<string, ReceiptProfile> = {
  uber: "ride",
  lyft: "ride",
  doordash: "delivery",
  "uber-eats": "delivery",
  grubhub: "delivery",
  postmates: "delivery",
  instacart: "delivery",
  amazon: "digital",
  ebay: "digital",
  netflix: "digital",
  spotify: "digital",
  hulu: "digital",
  disney: "digital",
  "apple-services": "digital",
  "google-play": "digital",
  "microsoft-store": "digital",
  steam: "digital",
  "playstation-store": "digital",
  "xbox-store": "digital",
  adobe: "digital",
  zoom: "digital",
  airbnb: "travel",
  expedia: "travel",
  "booking-com": "travel",
  "delta-airlines": "airline",
  "american-airlines": "airline",
  "united-airlines": "airline",
  "southwest-airlines": "airline",
  marriott: "hotel",
  hilton: "hotel",
  hyatt: "hotel",
  hertz: "rental",
  enterprise: "rental",
  avis: "rental",
  "7-eleven": "fuel",
  shell: "fuel",
  chevron: "fuel",
  exxon: "fuel",
  mobil: "fuel",
  bp: "fuel",
  speedway: "fuel",
  wawa: "fuel",
  quiktrip: "fuel",
  sheetz: "fuel",
  costco: "warehouse",
  "sam-s-club": "warehouse",
  // Grocery
  kroger: "grocery",
  publix: "grocery",
  safeway: "grocery",
  aldi: "grocery",
  "whole-foods": "grocery",
  "trader-joe-s": "grocery",
  // Pharmacy
  walgreens: "pharmacy",
  "cvs-pharmacy": "pharmacy",
  // Electronics
  "best-buy": "electronics",
  gamestop: "electronics",
  "apple-store": "electronics",
  // Beauty
  sephora: "beauty",
  "ulta-beauty": "beauty",
  // Home & improvement
  "home-depot": "home",
  "lowe-s": "home",
  ikea: "home",
  michaels: "home",
  joann: "home",
  // Pet
  petco: "pet",
  petsmart: "pet",
  // Auto parts
  autozone: "auto",
  "o-reilly-auto-parts": "auto",
  // Sporting goods
  "dick-s-sporting-goods": "sporting",
  zara: "fashion",
  "h-m": "fashion",
  "tj-maxx": "fashion",
  marshalls: "fashion",
  "macy-s": "fashion",
  nordstrom: "fashion",
};

const COFFEE_SLUGS = new Set([
  "starbucks",
  "dunkin",
  "tim-hortons",
  "peet-s-coffee",
  "caribou-coffee",
  "dutch-bros",
  "jamba-juice",
  "boba-guys",
]);

const RESTAURANT_SLUGS = new Set([
  "mcdonalds",
  "burger-king",
  "wendy-s",
  "subway",
  "taco-bell",
  "kfc",
  "chipotle",
  "domino-s-pizza",
  "pizza-hut",
  "papa-john-s",
  "chick-fil-a",
  "panera-bread",
  "five-guys",
  "in-n-out-burger",
  "shake-shack",
  "panda-express",
  "sonic-drive-in",
  "dairy-queen",
  "arby-s",
  "jack-in-the-box",
  "popeyes",
]);

const BRAND_ACCENTS: Record<string, string> = {
  walmart: "#0071ce",
  target: "#cc0000",
  uber: "#111827",
  starbucks: "#006241",
  mcdonalds: "#ffbc0d",
  "burger-king": "#d62300",
  "taco-bell": "#702082",
  kfc: "#e4002b",
  chipotle: "#a81612",
  costco: "#005daa",
  "sam-s-club": "#0067a0",
  "whole-foods": "#00674b",
  "trader-joe-s": "#c8102e",
  shell: "#fbd000",
  chevron: "#0054a6",
  bp: "#509e2f",
  "7-eleven": "#008061",
  amazon: "#ff9900",
  ebay: "#e53238",
  netflix: "#e50914",
  spotify: "#1db954",
  airbnb: "#ff385c",
  "delta-airlines": "#c8102e",
  "american-airlines": "#0078d2",
  "united-airlines": "#005daa",
  marriott: "#8b1d41",
  hilton: "#104c97",
  hyatt: "#6d6e71",
  hertz: "#ffd100",
  enterprise: "#169a5a",
  avis: "#d71920",
  zara: "#111111",
  "h-m": "#cc071e",
};

// Per-brand logo size tweaks (multiplier). Most logos look right at the
// profile's default height; these are the exceptions whose wordmark reads too
// large or too small at that height.
const LOGO_SCALE: Record<string, number> = {
  walmart: 1.15,
  target: 0.85, // square bullseye
  amazon: 1.1,
  ebay: 1.1,
  netflix: 1.15,
  spotify: 1.1,
  mcdonalds: 0.8, // tall arches
  starbucks: 0.85,
  shell: 0.85,
  "in-n-out-burger": 1.2,
  subway: 1.15,
  costco: 1.1,
  "best-buy": 0.9,
  ikea: 1.1,
  lyft: 1.1,
  uber: 1.1,
  "burger-king": 0.85,
  kfc: 0.85,
};

function hashSlug(slug: string): number {
  return [...slug].reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function inferProfile(template: ReceiptTemplate): ReceiptProfile {
  if (PROFILE_BY_SLUG[template.slug]) return PROFILE_BY_SLUG[template.slug];
  if (COFFEE_SLUGS.has(template.slug)) return "coffee";
  if (RESTAURANT_SLUGS.has(template.slug)) return "restaurant";
  return "retail";
}

// Spread layout templates across brands so two stores in the same category
// don't render the same way. Round-robin within each profile group.
const VARIANT_ORDER: LayoutVariant[] = [
  "classic",
  "modern",
  "pos",
  "euro",
  "compact",
  "elegant",
];
const VARIANT_BY_SLUG: Record<string, LayoutVariant> = (() => {
  const seen: Partial<Record<ReceiptProfile, number>> = {};
  const map: Record<string, LayoutVariant> = {};
  for (const t of BRAND_TEMPLATES) {
    const p = inferProfile(t);
    const i = seen[p] ?? 0;
    seen[p] = i + 1;
    map[t.slug] = VARIANT_ORDER[i % VARIANT_ORDER.length];
  }
  return map;
})();

function brandMetadata(template: ReceiptTemplate) {
  return {
    receiptProfile: inferProfile(template),
    brandAccent: BRAND_ACCENTS[template.slug] ?? "#4f46e5",
    logoScale: LOGO_SCALE[template.slug] ?? 1,
    layoutSeed: hashSlug(template.slug),
    layoutVariant: VARIANT_BY_SLUG[template.slug] ?? "classic",
  };
}

export function baseReceipt(): ReceiptData {
  return {
    businessName: "Your Business Name",
    logoDataUrl: "",
    addressLine1: "123 Main Street",
    addressLine2: "City, State 00000",
    phone: "(555) 000-0000",
    website: "",
    receiptNumber: randomReceiptNumber(),
    date: todayISO(),
    time: nowHHMM(),
    cashier: "",
    register: "",
    items: [{ id: uid(), name: "Item name", quantity: 1, price: 9.99 }],
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 0,
    discount: 0,
    tip: 0,
    paymentMethod: "Credit Card",
    cardLastFour: "4821",
    amountTendered: 0,
    footerMessage: "Thank you for your business!",
    showBarcode: true,
    paperStyle: "thermal",
  };
}

export function receiptFromTemplate(template: ReceiptTemplate): ReceiptData {
  const base = baseReceipt();
  return {
    ...base,
    ...template.defaults,
    ...brandMetadata(template),
    items: template.defaults.items.map((item) => ({ ...item, id: uid() })),
    receiptNumber: randomReceiptNumber(),
    date: todayISO(),
    time: nowHHMM(),
  };
}

/** Deterministic version for statically rendered template previews. */
export function previewFromTemplate(template: ReceiptTemplate): ReceiptData {
  const base = baseReceipt();
  const hash = hashSlug(template.slug);
  return {
    ...base,
    ...template.defaults,
    ...brandMetadata(template),
    items: template.defaults.items,
    receiptNumber: String(280000 + hash).slice(0, 6),
    date: `2026-06-${String((hash % 20) + 1).padStart(2, "0")}`,
    time: `${String(8 + (hash % 12)).padStart(2, "0")}:${String((hash * 7) % 60).padStart(2, "0")}`,
  };
}
