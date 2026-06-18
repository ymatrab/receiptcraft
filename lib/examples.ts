import type { ReceiptData, PaymentMethod } from "./types";
import { getTemplate } from "./templates";

/**
 * Programmatic "example receipt" pages (/examples/[slug]). Each example renders a
 * real, unique receipt — specific business + specific items + a real total — so
 * every page has genuine content (not a thin keyword swap). Grow the catalogue
 * by appending entries to EXAMPLES; the engine, pages and sitemap pick them up.
 */

export interface ExampleItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Example {
  slug: string;
  /** Business/brand name shown on the receipt. */
  brand: string;
  /** Which template's defaults to base the look + tax on. */
  base: string;
  /** Optional city line override. */
  city?: string;
  items: ExampleItem[];
  taxRate?: number;
  payment?: PaymentMethod;
  footer?: string;
}

/** Deterministic 6-digit receipt number from the slug (stable across builds). */
function stableNumber(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return String(100000 + (h % 900000));
}

export function receiptFromExample(ex: Example): ReceiptData {
  const d = getTemplate(ex.base)?.defaults ?? ({} as Record<string, unknown>);
  const def = d as {
    addressLine1?: string;
    addressLine2?: string;
    phone?: string;
    currency?: string;
    taxLabel?: string;
    taxRate?: number;
    footerMessage?: string;
    paperStyle?: ReceiptData["paperStyle"];
    receiptProfile?: ReceiptData["receiptProfile"];
  };
  return {
    businessName: ex.brand,
    logoDataUrl: "",
    addressLine1: def.addressLine1 ?? "",
    addressLine2: ex.city ?? def.addressLine2 ?? "",
    phone: def.phone ?? "",
    website: "",
    receiptNumber: stableNumber(ex.slug),
    date: "2026-06-15",
    time: "13:42",
    cashier: "",
    register: "",
    items: ex.items.map((it, i) => ({ id: `${ex.slug}-${i}`, ...it })),
    currency: def.currency ?? "USD",
    taxLabel: def.taxLabel ?? "Sales Tax",
    taxRate: ex.taxRate ?? def.taxRate ?? 0,
    discount: 0,
    tip: 0,
    paymentMethod: ex.payment ?? "Credit Card",
    cardLastFour: "4821",
    amountTendered: 0,
    footerMessage: ex.footer ?? def.footerMessage ?? "",
    showBarcode: true,
    paperStyle: def.paperStyle ?? "thermal",
    receiptProfile: def.receiptProfile,
  };
}

export function exampleTotal(ex: Example): number {
  const sub = ex.items.reduce((s, i) => s + i.quantity * i.price, 0);
  const rate = ex.taxRate ?? getTemplate(ex.base)?.defaults.taxRate ?? 0;
  return Math.round((sub + sub * (rate / 100)) * 100) / 100;
}

export function exampleSummary(ex: Example): string {
  const names = ex.items.slice(0, 2).map((i) => i.name);
  const extra = ex.items.length - names.length;
  return names.join(", ") + (extra > 0 ? ` and ${extra} more item${extra > 1 ? "s" : ""}` : "");
}

export const EXAMPLES: Example[] = [
  // ── Coffee ──
  { slug: "starbucks-receipt-two-lattes-muffin", brand: "Starbucks", base: "coffee-shop", city: "Seattle, WA 98101", items: [{ name: "Venti Caffè Latte", quantity: 2, price: 5.45 }, { name: "Oat Milk", quantity: 1, price: 0.7 }, { name: "Blueberry Muffin", quantity: 1, price: 3.25 }] },
  { slug: "dunkin-receipt-coffee-donuts", brand: "Dunkin'", base: "coffee-shop", city: "Boston, MA 02108", items: [{ name: "Medium Iced Coffee", quantity: 1, price: 2.89 }, { name: "Glazed Donut", quantity: 3, price: 1.29 }, { name: "Hash Browns", quantity: 1, price: 1.99 }] },
  { slug: "costa-coffee-receipt-cappuccino", brand: "Costa Coffee", base: "coffee-shop", city: "London, UK", items: [{ name: "Flat White", quantity: 1, price: 3.4 }, { name: "Almond Croissant", quantity: 1, price: 2.6 }], taxRate: 0 },
  { slug: "tim-hortons-receipt-double-double", brand: "Tim Hortons", base: "coffee-shop", city: "Toronto, ON", items: [{ name: "Double-Double (L)", quantity: 2, price: 2.19 }, { name: "Boston Cream Donut", quantity: 2, price: 1.49 }] },

  // ── Fast food / restaurant ──
  { slug: "mcdonalds-receipt-big-mac-meal", brand: "McDonald's", base: "restaurant", city: "Chicago, IL 60601", items: [{ name: "Big Mac Meal (L)", quantity: 1, price: 9.49 }, { name: "McNuggets 10pc", quantity: 1, price: 5.99 }, { name: "Apple Pie", quantity: 2, price: 1.29 }] },
  { slug: "chipotle-receipt-burrito-bowl", brand: "Chipotle", base: "restaurant", city: "Denver, CO 80202", items: [{ name: "Chicken Burrito Bowl", quantity: 2, price: 9.95 }, { name: "Chips & Guac", quantity: 1, price: 4.45 }, { name: "Bottled Water", quantity: 2, price: 2.5 }] },
  { slug: "popeyes-receipt-chicken-combo", brand: "Popeyes", base: "restaurant", city: "Atlanta, GA 30303", items: [{ name: "Spicy Chicken Sandwich Combo", quantity: 1, price: 8.99 }, { name: "Cajun Fries (L)", quantity: 1, price: 3.49 }, { name: "Sprite", quantity: 1, price: 2.29 }] },
  { slug: "chick-fil-a-receipt-sandwich-meal", brand: "Chick-fil-A", base: "restaurant", city: "Dallas, TX 75201", items: [{ name: "Chicken Sandwich Meal", quantity: 2, price: 8.65 }, { name: "8ct Nuggets", quantity: 1, price: 4.69 }, { name: "Lemonade", quantity: 2, price: 2.45 }] },
  { slug: "subway-receipt-footlong", brand: "Subway", base: "restaurant", city: "Phoenix, AZ 85001", items: [{ name: "Footlong Italian B.M.T.", quantity: 1, price: 9.29 }, { name: "6\" Veggie Delite", quantity: 1, price: 5.49 }, { name: "Cookies (3)", quantity: 1, price: 2.0 }] },
  { slug: "taco-bell-receipt-cravings-box", brand: "Taco Bell", base: "restaurant", city: "Las Vegas, NV 89101", items: [{ name: "Cravings Box", quantity: 1, price: 6.99 }, { name: "Crunchwrap Supreme", quantity: 1, price: 4.99 }, { name: "Baja Blast (L)", quantity: 1, price: 2.49 }] },
  { slug: "kfc-receipt-bucket-meal", brand: "KFC", base: "restaurant", city: "Louisville, KY 40202", items: [{ name: "8pc Bucket Meal", quantity: 1, price: 21.99 }, { name: "Mac & Cheese (L)", quantity: 1, price: 3.99 }, { name: "Biscuits (4)", quantity: 1, price: 2.49 }] },
  { slug: "dominos-receipt-large-pizza", brand: "Domino's Pizza", base: "restaurant", city: "Ann Arbor, MI 48104", items: [{ name: "Large Pepperoni Pizza", quantity: 1, price: 13.99 }, { name: "Garlic Bread Twists", quantity: 1, price: 5.99 }, { name: "Coke 2L", quantity: 1, price: 2.99 }] },
  { slug: "olive-garden-receipt-dinner-for-two", brand: "Olive Garden", base: "restaurant", city: "Orlando, FL 32801", items: [{ name: "Chicken Alfredo", quantity: 1, price: 17.49 }, { name: "Lasagna Classico", quantity: 1, price: 16.99 }, { name: "Tiramisu", quantity: 1, price: 7.99 }] },

  // ── Grocery ──
  { slug: "walmart-receipt-grocery-haul", brand: "Walmart", base: "grocery-store", city: "Bentonville, AR 72712", items: [{ name: "Great Value Milk 1Gal", quantity: 1, price: 3.12 }, { name: "Bananas (lb)", quantity: 3, price: 0.58 }, { name: "Bread Loaf", quantity: 2, price: 1.42 }, { name: "Eggs 18ct", quantity: 1, price: 4.34 }, { name: "Ground Beef (lb)", quantity: 2, price: 5.97 }] },
  { slug: "target-receipt-household-run", brand: "Target", base: "grocery-store", city: "Minneapolis, MN 55403", items: [{ name: "Up & Up Paper Towels", quantity: 1, price: 8.99 }, { name: "Laundry Detergent", quantity: 1, price: 11.49 }, { name: "Goldfish Crackers", quantity: 2, price: 2.79 }, { name: "Sparkling Water 12pk", quantity: 1, price: 4.99 }] },
  { slug: "kroger-receipt-weekly-groceries", brand: "Kroger", base: "grocery-store", city: "Cincinnati, OH 45202", items: [{ name: "Chicken Breast (lb)", quantity: 2, price: 4.49 }, { name: "Broccoli Crowns (lb)", quantity: 1, price: 1.99 }, { name: "Greek Yogurt 4pk", quantity: 1, price: 4.29 }, { name: "Orange Juice 52oz", quantity: 1, price: 3.79 }] },
  { slug: "whole-foods-receipt-organic", brand: "Whole Foods Market", base: "grocery-store", city: "Austin, TX 78703", items: [{ name: "Organic Avocados", quantity: 4, price: 1.79 }, { name: "365 Almond Milk", quantity: 2, price: 2.99 }, { name: "Wild Salmon Fillet (lb)", quantity: 1, price: 13.99 }, { name: "Kombucha", quantity: 2, price: 3.49 }] },
  { slug: "trader-joes-receipt-snacks", brand: "Trader Joe's", base: "grocery-store", city: "Monrovia, CA 91016", items: [{ name: "Mandarin Orange Chicken", quantity: 1, price: 5.49 }, { name: "Everything Bagel Seasoning", quantity: 1, price: 1.99 }, { name: "Dark Chocolate PB Cups", quantity: 2, price: 3.99 }, { name: "Cauliflower Gnocchi", quantity: 2, price: 2.99 }] },
  { slug: "aldi-receipt-budget-groceries", brand: "ALDI", base: "grocery-store", city: "Batavia, IL 60510", items: [{ name: "Millville Cereal", quantity: 1, price: 1.85 }, { name: "Bananas (lb)", quantity: 2, price: 0.44 }, { name: "Friendly Farms Milk", quantity: 1, price: 2.65 }, { name: "Casa Mamita Salsa", quantity: 1, price: 1.99 }] },
  { slug: "tesco-receipt-uk-shop", brand: "Tesco", base: "grocery-store", city: "Welwyn Garden City, UK", items: [{ name: "Tesco Semi-Skimmed Milk", quantity: 1, price: 1.45 }, { name: "Hovis Bread", quantity: 1, price: 1.1 }, { name: "Free Range Eggs 6", quantity: 1, price: 1.95 }, { name: "Cheddar 400g", quantity: 1, price: 3.5 }], taxRate: 0 },
  { slug: "costco-receipt-bulk-haul", brand: "Costco Wholesale", base: "grocery-store", city: "Issaquah, WA 98027", items: [{ name: "Kirkland Rotisserie Chicken", quantity: 1, price: 4.99 }, { name: "Paper Towels 12ct", quantity: 1, price: 21.99 }, { name: "Organic Eggs 24ct", quantity: 1, price: 7.49 }, { name: "Olive Oil 2L", quantity: 1, price: 15.99 }] },

  // ── Retail / electronics ──
  { slug: "best-buy-receipt-headphones", brand: "Best Buy", base: "retail-store", city: "Richfield, MN 55423", items: [{ name: "Sony WH-1000XM5 Headphones", quantity: 1, price: 349.99 }, { name: "USB-C Cable 6ft", quantity: 2, price: 14.99 }, { name: "2-Yr Protection Plan", quantity: 1, price: 39.99 }] },
  { slug: "apple-store-receipt-airpods", brand: "Apple Store", base: "retail-store", city: "Cupertino, CA 95014", items: [{ name: "AirPods Pro (2nd gen)", quantity: 1, price: 249.0 }, { name: "20W USB-C Adapter", quantity: 1, price: 19.0 }, { name: "AppleCare+", quantity: 1, price: 29.0 }] },
  { slug: "nike-receipt-sneakers", brand: "Nike", base: "retail-store", city: "Beaverton, OR 97005", items: [{ name: "Air Force 1 '07", quantity: 1, price: 115.0 }, { name: "Dri-FIT Socks 3pk", quantity: 1, price: 22.0 }, { name: "Sportswear Tee", quantity: 1, price: 30.0 }] },
  { slug: "home-depot-receipt-hardware", brand: "The Home Depot", base: "retail-store", city: "Atlanta, GA 30339", items: [{ name: "DeWalt 20V Drill", quantity: 1, price: 129.0 }, { name: "2x4 Lumber 8ft", quantity: 6, price: 3.78 }, { name: "Drywall Screws 1lb", quantity: 2, price: 8.47 }] },
  { slug: "ikea-receipt-furniture", brand: "IKEA", base: "retail-store", city: "Conshohocken, PA 19428", items: [{ name: "BILLY Bookcase", quantity: 1, price: 69.99 }, { name: "LACK Side Table", quantity: 2, price: 12.99 }, { name: "Swedish Meatballs", quantity: 1, price: 6.99 }] },

  // ── Pharmacy ──
  { slug: "cvs-pharmacy-receipt-essentials", brand: "CVS Pharmacy", base: "pharmacy", city: "Woonsocket, RI 02895", items: [{ name: "Prescription Co-Pay", quantity: 1, price: 10.0 }, { name: "Ibuprofen 200mg 100ct", quantity: 1, price: 8.99 }, { name: "Vitamin D3", quantity: 1, price: 12.49 }] },
  { slug: "walgreens-receipt-pharmacy", brand: "Walgreens", base: "pharmacy", city: "Deerfield, IL 60015", items: [{ name: "Prescription Pickup", quantity: 1, price: 15.0 }, { name: "Allergy Relief 24hr", quantity: 1, price: 17.99 }, { name: "Bandages Variety", quantity: 1, price: 4.49 }] },

  // ── Gas ──
  { slug: "shell-receipt-fuel-fillup", brand: "Shell", base: "gas-station", city: "Houston, TX 77002", items: [{ name: "Regular Unleaded (gal)", quantity: 12.4, price: 3.39 }] },
  { slug: "chevron-receipt-gas", brand: "Chevron", base: "gas-station", city: "San Ramon, CA 94583", items: [{ name: "Plus 89 (gal)", quantity: 10.8, price: 4.89 }, { name: "Bottled Water", quantity: 1, price: 1.99 }] },
  { slug: "bp-receipt-petrol", brand: "BP", base: "gas-station", city: "Chicago, IL 60601", items: [{ name: "Premium (gal)", quantity: 9.5, price: 4.29 }, { name: "Energy Drink", quantity: 1, price: 3.49 }] },

  // ── Rideshare / taxi ──
  { slug: "uber-receipt-ride-downtown", brand: "Uber", base: "taxi", city: "San Francisco, CA 94103", items: [{ name: "UberX Trip (4.2 mi)", quantity: 1, price: 16.4 }, { name: "Booking Fee", quantity: 1, price: 2.75 }], payment: "Credit Card" },
  { slug: "lyft-receipt-airport-ride", brand: "Lyft", base: "taxi", city: "Los Angeles, CA 90045", items: [{ name: "Lyft Trip to LAX (11 mi)", quantity: 1, price: 28.9 }, { name: "Service Fee", quantity: 1, price: 3.5 }], payment: "Credit Card" },

  // ── Hotel ──
  { slug: "marriott-receipt-hotel-stay", brand: "Marriott", base: "hotel", city: "Bethesda, MD 20814", items: [{ name: "Room — 2 Nights", quantity: 2, price: 189.0 }, { name: "Parking (night)", quantity: 2, price: 28.0 }, { name: "Room Service", quantity: 1, price: 42.5 }] },
  { slug: "hilton-receipt-folio", brand: "Hilton", base: "hotel", city: "McLean, VA 22102", items: [{ name: "King Room — 1 Night", quantity: 1, price: 214.0 }, { name: "Resort Fee", quantity: 1, price: 35.0 }, { name: "Breakfast Buffet", quantity: 2, price: 24.0 }] },

  // ── Bar ──
  { slug: "bar-receipt-night-out", brand: "The Tipsy Tavern", base: "bar", city: "Nashville, TN 37203", items: [{ name: "Draft IPA", quantity: 3, price: 7.0 }, { name: "House Margarita", quantity: 2, price: 11.0 }, { name: "Loaded Nachos", quantity: 1, price: 12.5 }] },
];

export const EXAMPLE_SLUGS = EXAMPLES.map((e) => e.slug);

export function getExample(slug: string): Example | undefined {
  return EXAMPLES.find((e) => e.slug === slug);
}
