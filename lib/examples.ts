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

  // ── More coffee ──
  { slug: "peets-coffee-receipt-latte", brand: "Peet's Coffee", base: "coffee-shop", city: "Berkeley, CA 94704", items: [{ name: "Caffè Latte (L)", quantity: 1, price: 4.95 }, { name: "Cold Brew", quantity: 1, price: 4.45 }, { name: "Banana Bread", quantity: 1, price: 3.75 }] },
  { slug: "caribou-coffee-receipt-mocha", brand: "Caribou Coffee", base: "coffee-shop", city: "Minneapolis, MN 55402", items: [{ name: "Campfire Mocha (L)", quantity: 2, price: 5.25 }, { name: "Oatmeal Bar", quantity: 1, price: 2.95 }] },
  { slug: "pret-a-manger-receipt-london", brand: "Pret A Manger", base: "coffee-shop", city: "London, UK", taxRate: 0, items: [{ name: "Flat White", quantity: 1, price: 3.15 }, { name: "Chicken Caesar Baguette", quantity: 1, price: 4.99 }, { name: "Still Water", quantity: 1, price: 1.35 }] },

  // ── More fast food / restaurant ──
  { slug: "burger-king-receipt-whopper-meal", brand: "Burger King", base: "restaurant", city: "Miami, FL 33131", items: [{ name: "Whopper Meal (L)", quantity: 1, price: 9.79 }, { name: "Chicken Fries 9pc", quantity: 1, price: 4.49 }, { name: "Onion Rings", quantity: 1, price: 2.99 }] },
  { slug: "wendys-receipt-baconator", brand: "Wendy's", base: "restaurant", city: "Dublin, OH 43017", items: [{ name: "Baconator Combo", quantity: 1, price: 10.49 }, { name: "Spicy Nuggets 10pc", quantity: 1, price: 5.29 }, { name: "Frosty (M)", quantity: 2, price: 2.49 }] },
  { slug: "five-guys-receipt-burger-fries", brand: "Five Guys", base: "restaurant", city: "Lorton, VA 22079", items: [{ name: "Bacon Cheeseburger", quantity: 1, price: 11.49 }, { name: "Cajun Fries (L)", quantity: 1, price: 6.29 }, { name: "Regular Shake", quantity: 1, price: 5.99 }] },
  { slug: "panera-receipt-soup-sandwich", brand: "Panera Bread", base: "restaurant", city: "St. Louis, MO 63105", items: [{ name: "You Pick Two", quantity: 1, price: 11.99 }, { name: "Broccoli Cheddar Bowl", quantity: 1, price: 7.49 }, { name: "Iced Tea", quantity: 1, price: 2.99 }] },
  { slug: "shake-shack-receipt-shackburger", brand: "Shake Shack", base: "restaurant", city: "New York, NY 10010", items: [{ name: "ShackBurger Double", quantity: 1, price: 9.59 }, { name: "Cheese Fries", quantity: 1, price: 4.99 }, { name: "Chocolate Shake", quantity: 1, price: 6.19 }] },
  { slug: "in-n-out-receipt-double-double", brand: "In-N-Out Burger", base: "restaurant", city: "Baldwin Park, CA 91706", items: [{ name: "Double-Double", quantity: 2, price: 5.25 }, { name: "Fries", quantity: 2, price: 2.6 }, { name: "Vanilla Shake", quantity: 1, price: 3.15 }] },
  { slug: "arbys-receipt-roast-beef", brand: "Arby's", base: "restaurant", city: "Sandy Springs, GA 30328", items: [{ name: "Classic Roast Beef", quantity: 2, price: 4.99 }, { name: "Curly Fries (M)", quantity: 1, price: 2.99 }, { name: "Jamocha Shake", quantity: 1, price: 3.29 }] },
  { slug: "raising-canes-receipt-box-combo", brand: "Raising Cane's", base: "restaurant", city: "Baton Rouge, LA 70808", items: [{ name: "The Box Combo", quantity: 1, price: 10.99 }, { name: "Extra Cane's Sauce", quantity: 2, price: 0.5 }, { name: "Lemonade", quantity: 1, price: 2.79 }] },
  { slug: "whataburger-receipt-meal", brand: "Whataburger", base: "restaurant", city: "San Antonio, TX 78216", items: [{ name: "Whataburger Meal", quantity: 1, price: 9.39 }, { name: "Honey BBQ Chicken Strip Sandwich", quantity: 1, price: 6.79 }] },
  { slug: "panda-express-receipt-plate", brand: "Panda Express", base: "restaurant", city: "Rosemead, CA 91770", items: [{ name: "Bigger Plate", quantity: 1, price: 11.4 }, { name: "Orange Chicken (extra)", quantity: 1, price: 5.2 }, { name: "Fountain Drink", quantity: 1, price: 2.5 }] },
  { slug: "wingstop-receipt-wings", brand: "Wingstop", base: "restaurant", city: "Addison, TX 75001", items: [{ name: "20pc Boneless Combo", quantity: 1, price: 18.99 }, { name: "Cajun Fried Corn", quantity: 2, price: 2.49 }, { name: "Ranch Dip", quantity: 2, price: 0.89 }] },
  { slug: "pizza-hut-receipt-large-pizza", brand: "Pizza Hut", base: "restaurant", city: "Plano, TX 75024", items: [{ name: "Large Supreme Pizza", quantity: 1, price: 16.99 }, { name: "Breadsticks", quantity: 1, price: 5.99 }, { name: "Pepsi 2L", quantity: 1, price: 3.29 }] },
  { slug: "papa-johns-receipt-pizza", brand: "Papa John's", base: "restaurant", city: "Louisville, KY 40299", items: [{ name: "Large Pepperoni", quantity: 1, price: 14.49 }, { name: "Garlic Knots", quantity: 1, price: 6.49 }, { name: "Garlic Sauce", quantity: 3, price: 0.75 }] },
  { slug: "cheesecake-factory-receipt-dinner", brand: "The Cheesecake Factory", base: "restaurant", city: "Calabasas, CA 91302", items: [{ name: "Chicken Madeira", quantity: 1, price: 24.95 }, { name: "Avocado Eggrolls", quantity: 1, price: 13.5 }, { name: "Original Cheesecake Slice", quantity: 2, price: 9.95 }] },
  { slug: "texas-roadhouse-receipt-steak", brand: "Texas Roadhouse", base: "restaurant", city: "Louisville, KY 40223", items: [{ name: "16oz Ribeye", quantity: 1, price: 27.99 }, { name: "Cactus Blossom", quantity: 1, price: 8.99 }, { name: "Loaded Sweet Potato", quantity: 1, price: 4.99 }] },
  { slug: "ihop-receipt-pancakes", brand: "IHOP", base: "restaurant", city: "Glendale, CA 91203", items: [{ name: "Original Buttermilk Pancakes", quantity: 1, price: 8.99 }, { name: "Big Steak Omelette", quantity: 1, price: 13.49 }, { name: "Coffee", quantity: 2, price: 2.99 }] },

  // ── Delivery (orders) ──
  { slug: "doordash-receipt-food-delivery", brand: "DoorDash", base: "restaurant", city: "San Francisco, CA 94107", items: [{ name: "Restaurant Subtotal", quantity: 1, price: 27.5 }, { name: "Delivery Fee", quantity: 1, price: 3.99 }, { name: "Service Fee", quantity: 1, price: 4.13 }, { name: "Dasher Tip", quantity: 1, price: 5.0 }], payment: "Credit Card" },
  { slug: "uber-eats-receipt-order", brand: "Uber Eats", base: "restaurant", city: "Chicago, IL 60607", items: [{ name: "Order Subtotal", quantity: 1, price: 31.2 }, { name: "Delivery Fee", quantity: 1, price: 2.49 }, { name: "Service Fee", quantity: 1, price: 4.68 }, { name: "Tip", quantity: 1, price: 6.0 }], payment: "Credit Card" },
  { slug: "grubhub-receipt-delivery", brand: "Grubhub", base: "restaurant", city: "New York, NY 10018", items: [{ name: "Food Subtotal", quantity: 1, price: 24.0 }, { name: "Delivery Fee", quantity: 1, price: 1.99 }, { name: "Service Fee", quantity: 1, price: 3.6 }, { name: "Driver Tip", quantity: 1, price: 4.5 }], payment: "Credit Card" },

  // ── More grocery (US) ──
  { slug: "safeway-receipt-groceries", brand: "Safeway", base: "grocery-store", city: "Pleasanton, CA 94588", items: [{ name: "Signature Milk 1Gal", quantity: 1, price: 3.99 }, { name: "Romaine Hearts 3ct", quantity: 1, price: 3.49 }, { name: "Boneless Chicken Thighs (lb)", quantity: 2, price: 3.99 }, { name: "Sourdough Loaf", quantity: 1, price: 3.99 }] },
  { slug: "publix-receipt-groceries", brand: "Publix", base: "grocery-store", city: "Lakeland, FL 33801", items: [{ name: "Publix Milk 1Gal", quantity: 1, price: 3.85 }, { name: "Pub Sub (Chicken Tender)", quantity: 1, price: 8.49 }, { name: "Strawberries 1lb", quantity: 1, price: 3.99 }, { name: "Greenwise Eggs", quantity: 1, price: 4.59 }] },
  { slug: "heb-receipt-groceries", brand: "H-E-B", base: "grocery-store", city: "San Antonio, TX 78215", items: [{ name: "H-E-B Tortillas 20ct", quantity: 1, price: 2.18 }, { name: "Fajita Beef (lb)", quantity: 1.5, price: 7.98 }, { name: "Avocados", quantity: 4, price: 0.78 }, { name: "Limes", quantity: 6, price: 0.25 }] },
  { slug: "wegmans-receipt-groceries", brand: "Wegmans", base: "grocery-store", city: "Rochester, NY 14624", items: [{ name: "Organic Spring Mix", quantity: 1, price: 4.49 }, { name: "Wild Caught Cod (lb)", quantity: 1, price: 11.99 }, { name: "Wegmans Pasta Sauce", quantity: 2, price: 2.29 }, { name: "Baguette", quantity: 1, price: 2.49 }] },
  { slug: "sams-club-receipt-bulk", brand: "Sam's Club", base: "grocery-store", city: "Bentonville, AR 72712", items: [{ name: "Member's Mark Water 40pk", quantity: 1, price: 4.48 }, { name: "Rotisserie Chicken", quantity: 1, price: 4.98 }, { name: "Paper Towels 15ct", quantity: 1, price: 19.98 }, { name: "Ground Beef 5lb", quantity: 1, price: 24.86 }] },

  // ── Grocery (international) ──
  { slug: "carrefour-receipt-france", brand: "Carrefour", base: "grocery-store", city: "Paris, France", taxRate: 0, items: [{ name: "Baguette Tradition", quantity: 2, price: 1.1 }, { name: "Lait Demi-Écrémé 1L", quantity: 1, price: 0.95 }, { name: "Camembert", quantity: 1, price: 2.45 }, { name: "Pommes (kg)", quantity: 1, price: 2.2 }] },
  { slug: "mercadona-receipt-spain", brand: "Mercadona", base: "grocery-store", city: "Valencia, Spain", taxRate: 0, items: [{ name: "Leche Entera 1L", quantity: 2, price: 0.89 }, { name: "Pan de Molde", quantity: 1, price: 1.2 }, { name: "Aceite de Oliva 1L", quantity: 1, price: 6.5 }, { name: "Plátanos (kg)", quantity: 1, price: 1.79 }] },
  { slug: "lidl-receipt-groceries", brand: "Lidl", base: "grocery-store", city: "Neckarsulm, Germany", taxRate: 0, items: [{ name: "Vollmilch 1L", quantity: 2, price: 0.95 }, { name: "Brötchen 6er", quantity: 1, price: 0.99 }, { name: "Bananen (kg)", quantity: 1, price: 1.49 }, { name: "Gouda 400g", quantity: 1, price: 2.99 }] },
  { slug: "sainsburys-receipt-uk", brand: "Sainsbury's", base: "grocery-store", city: "London, UK", taxRate: 0, items: [{ name: "British Semi-Skimmed Milk", quantity: 1, price: 1.45 }, { name: "Taste the Difference Bread", quantity: 1, price: 1.5 }, { name: "Free Range Eggs 12", quantity: 1, price: 2.95 }, { name: "Bananas 5pk", quantity: 1, price: 0.79 }] },
  { slug: "asda-receipt-uk", brand: "ASDA", base: "grocery-store", city: "Leeds, UK", taxRate: 0, items: [{ name: "ASDA Chicken Breast 1kg", quantity: 1, price: 5.5 }, { name: "Baked Beans 4pk", quantity: 1, price: 1.4 }, { name: "Cheddar 460g", quantity: 1, price: 3.0 }, { name: "Apples 6pk", quantity: 1, price: 1.25 }] },
  { slug: "woolworths-receipt-australia", brand: "Woolworths", base: "grocery-store", city: "Sydney, Australia", taxRate: 0, items: [{ name: "Full Cream Milk 2L", quantity: 1, price: 3.1 }, { name: "Tip Top Bread", quantity: 1, price: 3.5 }, { name: "Free Range Eggs 12", quantity: 1, price: 5.5 }, { name: "Bananas (kg)", quantity: 1, price: 3.9 }] },
  { slug: "coles-receipt-australia", brand: "Coles", base: "grocery-store", city: "Melbourne, Australia", taxRate: 0, items: [{ name: "Coles Milk 3L", quantity: 1, price: 4.0 }, { name: "Mince Beef 500g", quantity: 1, price: 7.5 }, { name: "Avocados", quantity: 2, price: 1.5 }, { name: "Bread Loaf", quantity: 1, price: 2.9 }] },
  { slug: "loblaws-receipt-canada", brand: "Loblaws", base: "grocery-store", city: "Toronto, ON", items: [{ name: "PC Milk 4L", quantity: 1, price: 5.49 }, { name: "Wonder Bread", quantity: 1, price: 3.29 }, { name: "Eggs Large 12", quantity: 1, price: 3.99 }, { name: "Bananas (kg)", quantity: 1, price: 1.65 }] },
  { slug: "rewe-receipt-germany", brand: "REWE", base: "grocery-store", city: "Cologne, Germany", taxRate: 0, items: [{ name: "Bio Milch 1L", quantity: 2, price: 1.19 }, { name: "Roggenbrot", quantity: 1, price: 1.79 }, { name: "Eier 10er", quantity: 1, price: 2.49 }, { name: "Äpfel (kg)", quantity: 1, price: 2.29 }] },

  // ── Retail / electronics / clothing ──
  { slug: "amazon-receipt-order", brand: "Amazon", base: "retail-store", city: "Seattle, WA 98109", items: [{ name: "Echo Dot (5th Gen)", quantity: 1, price: 49.99 }, { name: "USB-C Hub", quantity: 1, price: 25.99 }, { name: "Paperback Book", quantity: 1, price: 14.29 }] },
  { slug: "macys-receipt-clothing", brand: "Macy's", base: "retail-store", city: "New York, NY 10001", items: [{ name: "Ralph Lauren Polo", quantity: 1, price: 89.5 }, { name: "Levi's 511 Jeans", quantity: 1, price: 69.5 }, { name: "Dress Socks 3pk", quantity: 1, price: 16.0 }] },
  { slug: "gamestop-receipt-games", brand: "GameStop", base: "retail-store", city: "Grapevine, TX 76051", items: [{ name: "PS5 Game (New)", quantity: 1, price: 69.99 }, { name: "Controller Charger", quantity: 1, price: 24.99 }, { name: "Pre-Owned Game", quantity: 1, price: 29.99 }] },
  { slug: "sephora-receipt-makeup", brand: "Sephora", base: "retail-store", city: "San Francisco, CA 94105", items: [{ name: "Foundation", quantity: 1, price: 42.0 }, { name: "Setting Spray", quantity: 1, price: 33.0 }, { name: "Lip Gloss", quantity: 2, price: 22.0 }] },
  { slug: "ulta-receipt-beauty", brand: "Ulta Beauty", base: "retail-store", city: "Bolingbrook, IL 60440", items: [{ name: "Shampoo & Conditioner Set", quantity: 1, price: 28.0 }, { name: "Mascara", quantity: 1, price: 24.0 }, { name: "Nail Polish", quantity: 3, price: 9.5 }] },
  { slug: "lowes-receipt-tools", brand: "Lowe's", base: "retail-store", city: "Mooresville, NC 28117", items: [{ name: "Kobalt Socket Set", quantity: 1, price: 49.98 }, { name: "Paint Gallon (Eggshell)", quantity: 2, price: 32.98 }, { name: "Painter's Tape 3pk", quantity: 1, price: 11.97 }] },
  { slug: "dicks-sporting-goods-receipt", brand: "Dick's Sporting Goods", base: "retail-store", city: "Coraopolis, PA 15108", items: [{ name: "Wilson Basketball", quantity: 1, price: 29.99 }, { name: "Under Armour Shorts", quantity: 2, price: 25.0 }, { name: "Water Bottle 32oz", quantity: 1, price: 14.99 }] },
  { slug: "old-navy-receipt-clothes", brand: "Old Navy", base: "retail-store", city: "San Francisco, CA 94133", items: [{ name: "Graphic Tee", quantity: 3, price: 10.0 }, { name: "Men's Chinos", quantity: 1, price: 29.99 }, { name: "Kids Hoodie", quantity: 1, price: 19.99 }] },
  { slug: "h-m-receipt-clothing", brand: "H&M", base: "retail-store", city: "New York, NY 10018", items: [{ name: "Cotton T-Shirt", quantity: 2, price: 12.99 }, { name: "Slim Fit Jeans", quantity: 1, price: 24.99 }, { name: "Knit Sweater", quantity: 1, price: 29.99 }] },
  { slug: "petco-receipt-pet-supplies", brand: "Petco", base: "retail-store", city: "San Diego, CA 92121", items: [{ name: "Dog Food 30lb", quantity: 1, price: 54.99 }, { name: "Cat Litter 20lb", quantity: 1, price: 16.99 }, { name: "Chew Toy", quantity: 2, price: 7.99 }] },
  { slug: "staples-receipt-office", brand: "Staples", base: "retail-store", city: "Framingham, MA 01702", items: [{ name: "Printer Paper 5-Ream", quantity: 1, price: 42.99 }, { name: "Ink Cartridge", quantity: 1, price: 34.99 }, { name: "Ballpoint Pens 12pk", quantity: 2, price: 6.49 }] },

  // ── More pharmacy ──
  { slug: "rite-aid-receipt-pharmacy", brand: "Rite Aid", base: "pharmacy", city: "Camp Hill, PA 17011", items: [{ name: "Prescription Co-Pay", quantity: 1, price: 12.0 }, { name: "Cold & Flu Relief", quantity: 1, price: 9.99 }, { name: "Multivitamin 100ct", quantity: 1, price: 14.99 }] },
  { slug: "boots-receipt-uk", brand: "Boots", base: "pharmacy", city: "Nottingham, UK", taxRate: 0, items: [{ name: "Prescription Charge", quantity: 1, price: 9.9 }, { name: "Paracetamol 16s", quantity: 2, price: 0.65 }, { name: "Vitamin C 1000mg", quantity: 1, price: 4.5 }] },

  // ── More gas ──
  { slug: "exxon-receipt-fuel", brand: "Exxon", base: "gas-station", city: "Irving, TX 75039", items: [{ name: "Supreme+ (gal)", quantity: 11.2, price: 4.59 }] },
  { slug: "mobil-receipt-gas", brand: "Mobil", base: "gas-station", city: "Springfield, VA 22150", items: [{ name: "Regular (gal)", quantity: 13.6, price: 3.45 }, { name: "Coffee (M)", quantity: 1, price: 1.79 }] },
  { slug: "speedway-receipt-gas-snacks", brand: "Speedway", base: "gas-station", city: "Enon, OH 45323", items: [{ name: "Regular Unleaded (gal)", quantity: 10.1, price: 3.29 }, { name: "Speedy Rewards Hot Dog", quantity: 2, price: 1.49 }, { name: "Fountain Drink (L)", quantity: 1, price: 1.29 }] },
  { slug: "wawa-receipt-hoagie-gas", brand: "Wawa", base: "gas-station", city: "Wawa, PA 19063", items: [{ name: "Regular (gal)", quantity: 9.8, price: 3.39 }, { name: "Classic Italian Hoagie", quantity: 1, price: 6.79 }, { name: "Iced Coffee (L)", quantity: 1, price: 2.29 }] },

  // ── More hotels ──
  { slug: "hyatt-receipt-hotel-stay", brand: "Hyatt", base: "hotel", city: "Chicago, IL 60601", items: [{ name: "King Room — 2 Nights", quantity: 2, price: 224.0 }, { name: "Valet Parking (night)", quantity: 2, price: 52.0 }, { name: "Minibar", quantity: 1, price: 18.0 }] },
  { slug: "holiday-inn-receipt-stay", brand: "Holiday Inn Express", base: "hotel", city: "Atlanta, GA 30303", items: [{ name: "Queen Room — 1 Night", quantity: 1, price: 139.0 }, { name: "Pet Fee", quantity: 1, price: 25.0 }] },
  { slug: "best-western-receipt-folio", brand: "Best Western", base: "hotel", city: "Phoenix, AZ 85004", items: [{ name: "Double Queen — 2 Nights", quantity: 2, price: 118.0 }, { name: "Parking", quantity: 2, price: 12.0 }] },

  // ── More rideshare / taxi ──
  { slug: "bolt-receipt-ride-london", brand: "Bolt", base: "taxi", city: "London, UK", taxRate: 0, payment: "Credit Card", items: [{ name: "Bolt Trip (6.1 mi)", quantity: 1, price: 14.2 }, { name: "Booking Fee", quantity: 1, price: 1.5 }] },
  { slug: "yellow-cab-receipt-nyc", brand: "NYC Yellow Cab", base: "taxi", city: "New York, NY 10019", payment: "Cash", items: [{ name: "Metered Fare (3.4 mi)", quantity: 1, price: 18.5 }, { name: "MTA Surcharge", quantity: 1, price: 0.5 }, { name: "Congestion Fee", quantity: 1, price: 2.5 }] },
  { slug: "grab-receipt-ride-singapore", brand: "Grab", base: "taxi", city: "Singapore", taxRate: 0, payment: "Mobile Payment", items: [{ name: "GrabCar (8.2 km)", quantity: 1, price: 12.8 }, { name: "Platform Fee", quantity: 1, price: 0.7 }] },

  // ── Services: salon / auto / parking ──
  { slug: "great-clips-receipt-haircut", brand: "Great Clips", base: "salon", city: "Minneapolis, MN 55425", items: [{ name: "Adult Haircut", quantity: 2, price: 19.0 }, { name: "Kids Haircut", quantity: 1, price: 16.0 }] },
  { slug: "nail-salon-receipt-manicure", brand: "Lily Nails & Spa", base: "salon", city: "Orlando, FL 32819", items: [{ name: "Gel Manicure", quantity: 1, price: 35.0 }, { name: "Pedicure", quantity: 1, price: 40.0 }], footer: "Tips appreciated — thank you!" },
  { slug: "jiffy-lube-receipt-oil-change", brand: "Jiffy Lube", base: "auto-repair", city: "Houston, TX 77002", items: [{ name: "Signature Oil Change", quantity: 1, price: 79.99 }, { name: "Air Filter", quantity: 1, price: 24.99 }, { name: "Tire Rotation", quantity: 1, price: 19.99 }] },
  { slug: "midas-receipt-brakes", brand: "Midas", base: "auto-repair", city: "Itasca, IL 60143", items: [{ name: "Front Brake Pads", quantity: 1, price: 189.0 }, { name: "Brake Fluid Flush", quantity: 1, price: 89.99 }, { name: "Labor", quantity: 1, price: 120.0 }] },
  { slug: "discount-tire-receipt", brand: "Discount Tire", base: "auto-repair", city: "Scottsdale, AZ 85254", items: [{ name: "Tire — 235/45R18", quantity: 4, price: 162.0 }, { name: "Installation", quantity: 4, price: 23.0 }, { name: "Road Hazard Warranty", quantity: 4, price: 18.0 }] },
  { slug: "airport-parking-receipt", brand: "Airport Premium Parking", base: "parking", city: "Atlanta, GA 30320", items: [{ name: "Daily Parking", quantity: 4, price: 18.0 }] },
  { slug: "city-garage-parking-receipt", brand: "Downtown City Garage", base: "parking", city: "Boston, MA 02110", items: [{ name: "Hourly Parking (3 hrs)", quantity: 3, price: 7.0 }] },

  // ── Multi-variant: top brands, different baskets ──
  { slug: "starbucks-receipt-frappuccino-order", brand: "Starbucks", base: "coffee-shop", city: "Chicago, IL 60611", items: [{ name: "Caramel Frappuccino (Venti)", quantity: 2, price: 6.45 }, { name: "Cake Pop", quantity: 2, price: 2.95 }, { name: "Bacon Gouda Sandwich", quantity: 1, price: 5.25 }] },
  { slug: "mcdonalds-receipt-breakfast", brand: "McDonald's", base: "restaurant", city: "Oak Brook, IL 60523", items: [{ name: "Sausage McMuffin Meal", quantity: 1, price: 6.49 }, { name: "Hotcakes", quantity: 1, price: 4.19 }, { name: "Hash Browns", quantity: 2, price: 1.69 }, { name: "Iced Coffee", quantity: 1, price: 2.49 }] },
  { slug: "cvs-receipt-prescription-only", brand: "CVS Pharmacy", base: "pharmacy", city: "Boston, MA 02118", items: [{ name: "Prescription — Amoxicillin", quantity: 1, price: 14.99 }, { name: "Prescription — Lisinopril", quantity: 1, price: 9.0 }] },
  { slug: "nike-receipt-running-gear", brand: "Nike", base: "retail-store", city: "New York, NY 10012", items: [{ name: "Pegasus 41 Running Shoes", quantity: 1, price: 140.0 }, { name: "Dri-FIT Running Shorts", quantity: 1, price: 40.0 }, { name: "Elite Crew Socks", quantity: 1, price: 18.0 }] },
  { slug: "walmart-receipt-electronics", brand: "Walmart", base: "retail-store", city: "Bentonville, AR 72712", items: [{ name: "onn. 50\" 4K TV", quantity: 1, price: 248.0 }, { name: "HDMI Cable", quantity: 1, price: 9.88 }, { name: "AA Batteries 24pk", quantity: 1, price: 12.97 }] },
  { slug: "target-receipt-clothing", brand: "Target", base: "retail-store", city: "Minneapolis, MN 55403", items: [{ name: "Cat & Jack Kids Tee", quantity: 3, price: 6.0 }, { name: "Universal Thread Jeans", quantity: 1, price: 25.99 }, { name: "Socks 6pk", quantity: 1, price: 8.99 }] },

  // ── Batch 3: more restaurants ──
  { slug: "jersey-mikes-receipt-sub", brand: "Jersey Mike's", base: "restaurant", city: "Manasquan, NJ 08736", items: [{ name: "Giant #13 Mike's Way", quantity: 1, price: 16.45 }, { name: "Regular Club Sub", quantity: 1, price: 9.95 }, { name: "Chips", quantity: 2, price: 1.79 }] },
  { slug: "jimmy-johns-receipt-sub", brand: "Jimmy John's", base: "restaurant", city: "Champaign, IL 61820", items: [{ name: "#9 Italian Night Club", quantity: 1, price: 8.99 }, { name: "Turkey Tom", quantity: 1, price: 7.49 }, { name: "Jumbo Kosher Dill", quantity: 1, price: 1.75 }] },
  { slug: "jack-in-the-box-receipt", brand: "Jack in the Box", base: "restaurant", city: "San Diego, CA 92123", items: [{ name: "Jumbo Jack Combo", quantity: 1, price: 8.49 }, { name: "Tacos 2pc", quantity: 2, price: 1.99 }, { name: "Curly Fries", quantity: 1, price: 3.29 }] },
  { slug: "qdoba-receipt-burrito", brand: "Qdoba", base: "restaurant", city: "San Diego, CA 92101", items: [{ name: "Loaded Tortilla Soup", quantity: 1, price: 6.25 }, { name: "Chicken Burrito", quantity: 1, price: 9.5 }, { name: "Chips & Queso", quantity: 1, price: 3.95 }] },
  { slug: "moes-receipt-burrito", brand: "Moe's Southwest Grill", base: "restaurant", city: "Atlanta, GA 30305", items: [{ name: "Homewrecker Burrito", quantity: 1, price: 10.29 }, { name: "Stack", quantity: 1, price: 9.49 }, { name: "Queso & Chips", quantity: 1, price: 4.49 }] },
  { slug: "sonic-drive-in-receipt", brand: "Sonic Drive-In", base: "restaurant", city: "Oklahoma City, OK 73102", items: [{ name: "SuperSONIC Bacon Combo", quantity: 1, price: 9.19 }, { name: "Mozzarella Sticks", quantity: 1, price: 4.29 }, { name: "Cherry Limeade", quantity: 2, price: 2.99 }] },
  { slug: "waffle-house-receipt", brand: "Waffle House", base: "restaurant", city: "Norcross, GA 30093", items: [{ name: "All-Star Special", quantity: 1, price: 11.5 }, { name: "Pecan Waffle", quantity: 1, price: 5.25 }, { name: "Coffee", quantity: 2, price: 2.5 }] },
  { slug: "dennys-receipt-grand-slam", brand: "Denny's", base: "restaurant", city: "Spartanburg, SC 29319", items: [{ name: "Grand Slam", quantity: 2, price: 9.99 }, { name: "Hash Browns", quantity: 1, price: 3.49 }, { name: "Orange Juice", quantity: 2, price: 3.29 }] },
  { slug: "cracker-barrel-receipt", brand: "Cracker Barrel", base: "restaurant", city: "Lebanon, TN 37087", items: [{ name: "Country Fried Steak", quantity: 1, price: 13.99 }, { name: "Sunday Homestyle Chicken", quantity: 1, price: 12.49 }, { name: "Biscuits & Gravy", quantity: 1, price: 4.99 }] },
  { slug: "applebees-receipt-dinner", brand: "Applebee's", base: "restaurant", city: "Glendale, CA 91203", items: [{ name: "Bourbon St. Chicken & Shrimp", quantity: 1, price: 16.99 }, { name: "Riblets Platter", quantity: 1, price: 17.49 }, { name: "Mozzarella Sticks", quantity: 1, price: 9.29 }] },
  { slug: "chilis-receipt-dinner", brand: "Chili's", base: "restaurant", city: "Dallas, TX 75240", items: [{ name: "Triple Dipper", quantity: 1, price: 14.99 }, { name: "Old Timer Burger", quantity: 1, price: 11.99 }, { name: "Bottomless Chips & Salsa", quantity: 1, price: 5.49 }] },
  { slug: "buffalo-wild-wings-receipt", brand: "Buffalo Wild Wings", base: "restaurant", city: "Minneapolis, MN 55402", items: [{ name: "20 Boneless Wings", quantity: 1, price: 19.99 }, { name: "Mozzarella Sticks", quantity: 1, price: 8.49 }, { name: "Soft Drink", quantity: 2, price: 3.29 }] },
  { slug: "outback-receipt-steak", brand: "Outback Steakhouse", base: "restaurant", city: "Tampa, FL 33607", items: [{ name: "Outback Special 12oz", quantity: 1, price: 24.99 }, { name: "Bloomin' Onion", quantity: 1, price: 11.49 }, { name: "Aussie Fries", quantity: 1, price: 6.99 }] },

  // ── Coffee / snacks / dessert ──
  { slug: "jamba-juice-receipt-smoothie", brand: "Jamba", base: "coffee-shop", city: "Frisco, TX 75034", items: [{ name: "Mango-A-Go-Go (L)", quantity: 2, price: 7.49 }, { name: "Pretzel", quantity: 1, price: 3.29 }] },
  { slug: "auntie-annes-receipt-pretzel", brand: "Auntie Anne's", base: "coffee-shop", city: "Lancaster, PA 17601", items: [{ name: "Original Pretzel", quantity: 2, price: 5.29 }, { name: "Pretzel Nuggets", quantity: 1, price: 6.49 }, { name: "Lemonade", quantity: 1, price: 3.49 }] },
  { slug: "baskin-robbins-receipt-icecream", brand: "Baskin-Robbins", base: "coffee-shop", city: "Canton, MA 02021", items: [{ name: "Double Scoop", quantity: 2, price: 5.49 }, { name: "Waffle Cone", quantity: 2, price: 1.29 }] },
  { slug: "cold-stone-receipt-icecream", brand: "Cold Stone Creamery", base: "coffee-shop", city: "Scottsdale, AZ 85258", items: [{ name: "Love It Creation", quantity: 2, price: 7.49 }, { name: "Waffle Bowl", quantity: 1, price: 1.5 }] },
  { slug: "greggs-receipt-uk", brand: "Greggs", base: "coffee-shop", city: "Newcastle, UK", taxRate: 0, items: [{ name: "Sausage Roll", quantity: 2, price: 1.3 }, { name: "Steak Bake", quantity: 1, price: 1.85 }, { name: "Latte", quantity: 1, price: 2.35 }] },
  { slug: "caffe-nero-receipt-uk", brand: "Caffè Nero", base: "coffee-shop", city: "Manchester, UK", taxRate: 0, items: [{ name: "Cappuccino", quantity: 1, price: 3.25 }, { name: "Panini", quantity: 1, price: 5.45 }] },

  // ── International restaurants ──
  { slug: "nandos-receipt-uk", brand: "Nando's", base: "restaurant", city: "London, UK", taxRate: 0, items: [{ name: "1/2 Chicken", quantity: 1, price: 9.5 }, { name: "Peri-Peri Chips", quantity: 2, price: 3.95 }, { name: "Bottomless Drink", quantity: 2, price: 3.25 }] },
  { slug: "wagamama-receipt-uk", brand: "Wagamama", base: "restaurant", city: "London, UK", taxRate: 0, items: [{ name: "Chicken Katsu Curry", quantity: 1, price: 13.95 }, { name: "Yasai Gyoza", quantity: 1, price: 6.95 }, { name: "Green Tea", quantity: 2, price: 2.5 }] },

  // ── More grocery (US) ──
  { slug: "food-lion-receipt-groceries", brand: "Food Lion", base: "grocery-store", city: "Salisbury, NC 28147", items: [{ name: "Food Lion Milk 1Gal", quantity: 1, price: 3.29 }, { name: "Chicken Drumsticks (lb)", quantity: 3, price: 1.29 }, { name: "Bread", quantity: 1, price: 1.5 }, { name: "Eggs 12ct", quantity: 1, price: 2.99 }] },
  { slug: "sprouts-receipt-groceries", brand: "Sprouts Farmers Market", base: "grocery-store", city: "Phoenix, AZ 85016", items: [{ name: "Organic Kale", quantity: 1, price: 1.99 }, { name: "Grass-Fed Ground Beef (lb)", quantity: 1, price: 6.99 }, { name: "Almond Butter", quantity: 1, price: 7.49 }, { name: "Bulk Granola (lb)", quantity: 1, price: 4.99 }] },
  { slug: "vons-receipt-groceries", brand: "Vons", base: "grocery-store", city: "Fullerton, CA 92835", items: [{ name: "Signature Eggs 12ct", quantity: 1, price: 3.49 }, { name: "Roma Tomatoes (lb)", quantity: 2, price: 1.49 }, { name: "Pasta 16oz", quantity: 3, price: 1.29 }, { name: "Pasta Sauce", quantity: 2, price: 2.49 }] },
  { slug: "meijer-receipt-groceries", brand: "Meijer", base: "grocery-store", city: "Grand Rapids, MI 49544", items: [{ name: "Meijer Milk 1Gal", quantity: 1, price: 2.99 }, { name: "Frozen Pizza", quantity: 2, price: 4.49 }, { name: "Bananas (lb)", quantity: 3, price: 0.49 }, { name: "Cereal", quantity: 1, price: 3.99 }] },
  { slug: "albertsons-receipt-groceries", brand: "Albertsons", base: "grocery-store", city: "Boise, ID 83706", items: [{ name: "O Organics Milk", quantity: 1, price: 4.49 }, { name: "Ground Turkey (lb)", quantity: 1, price: 5.49 }, { name: "Spinach Bag", quantity: 1, price: 3.29 }, { name: "Whole Wheat Bread", quantity: 1, price: 2.79 }] },

  // ── More grocery (international) ──
  { slug: "aldi-sud-receipt-germany", brand: "ALDI SÜD", base: "grocery-store", city: "Mülheim, Germany", taxRate: 0, items: [{ name: "Milch 1L", quantity: 2, price: 0.85 }, { name: "Toastbrot", quantity: 1, price: 0.89 }, { name: "Hähnchenbrust 500g", quantity: 1, price: 3.99 }, { name: "Bananen (kg)", quantity: 1, price: 1.39 }] },
  { slug: "edeka-receipt-germany", brand: "EDEKA", base: "grocery-store", city: "Hamburg, Germany", taxRate: 0, items: [{ name: "Bio Vollmilch", quantity: 1, price: 1.29 }, { name: "Brötchen 4er", quantity: 1, price: 0.99 }, { name: "Butter 250g", quantity: 1, price: 2.19 }, { name: "Äpfel (kg)", quantity: 1, price: 2.49 }] },
  { slug: "monoprix-receipt-france", brand: "Monoprix", base: "grocery-store", city: "Paris, France", taxRate: 0, items: [{ name: "Yaourt Nature 4x", quantity: 1, price: 1.95 }, { name: "Jambon Blanc", quantity: 1, price: 3.4 }, { name: "Salade Verte", quantity: 1, price: 1.5 }, { name: "Eau Minérale 6x", quantity: 1, price: 2.7 }] },
  { slug: "jumbo-receipt-netherlands", brand: "Jumbo", base: "grocery-store", city: "Veghel, Netherlands", taxRate: 0, items: [{ name: "Halfvolle Melk 1L", quantity: 2, price: 1.05 }, { name: "Bruin Brood", quantity: 1, price: 1.39 }, { name: "Eieren 10", quantity: 1, price: 2.29 }, { name: "Kaas 250g", quantity: 1, price: 3.19 }] },
  { slug: "migros-receipt-switzerland", brand: "Migros", base: "grocery-store", city: "Zürich, Switzerland", taxRate: 0, items: [{ name: "Milch 1L", quantity: 2, price: 1.6 }, { name: "Brot", quantity: 1, price: 2.5 }, { name: "Eier 6", quantity: 1, price: 3.9 }, { name: "Käse 200g", quantity: 1, price: 4.2 }] },
  { slug: "ica-receipt-sweden", brand: "ICA", base: "grocery-store", city: "Stockholm, Sweden", taxRate: 0, items: [{ name: "Mjölk 1L", quantity: 2, price: 13.5 }, { name: "Bröd", quantity: 1, price: 24.9 }, { name: "Ägg 6-pack", quantity: 1, price: 29.9 }, { name: "Bananer (kg)", quantity: 1, price: 22.9 }] },
  { slug: "metro-receipt-canada", brand: "Metro", base: "grocery-store", city: "Montreal, QC", items: [{ name: "2% Milk 2L", quantity: 1, price: 3.79 }, { name: "Baguette", quantity: 1, price: 1.99 }, { name: "Eggs 12", quantity: 1, price: 3.49 }, { name: "Chicken Thighs (kg)", quantity: 1, price: 8.8 }] },

  // ── Clothing / department / specialty retail ──
  { slug: "lululemon-receipt-leggings", brand: "lululemon", base: "retail-store", city: "Vancouver, BC", items: [{ name: "Align High-Rise Pant", quantity: 1, price: 98.0 }, { name: "Swiftly Tech Tee", quantity: 1, price: 68.0 }] },
  { slug: "adidas-receipt-shoes", brand: "adidas", base: "retail-store", city: "Portland, OR 97201", items: [{ name: "Ultraboost Light", quantity: 1, price: 190.0 }, { name: "Trefoil Hoodie", quantity: 1, price: 65.0 }, { name: "Crew Socks 6pk", quantity: 1, price: 20.0 }] },
  { slug: "foot-locker-receipt-sneakers", brand: "Foot Locker", base: "retail-store", city: "New York, NY 10001", items: [{ name: "Jordan Retro 4", quantity: 1, price: 215.0 }, { name: "Nike Crew Socks", quantity: 2, price: 16.0 }] },
  { slug: "tj-maxx-receipt", brand: "T.J. Maxx", base: "retail-store", city: "Framingham, MA 01701", items: [{ name: "Designer Handbag", quantity: 1, price: 79.99 }, { name: "Throw Blanket", quantity: 1, price: 24.99 }, { name: "Candle Set", quantity: 1, price: 16.99 }] },
  { slug: "ross-receipt-clothing", brand: "Ross Dress for Less", base: "retail-store", city: "Dublin, CA 94568", items: [{ name: "Men's Polo", quantity: 2, price: 12.99 }, { name: "Bath Towel Set", quantity: 1, price: 19.99 }, { name: "Sandals", quantity: 1, price: 14.99 }] },
  { slug: "kohls-receipt-clothing", brand: "Kohl's", base: "retail-store", city: "Menomonee Falls, WI 53051", items: [{ name: "Sonoma Flannel Shirt", quantity: 2, price: 22.0 }, { name: "Nike Kids Shoes", quantity: 1, price: 49.99 }, { name: "Bath Towels 2pk", quantity: 1, price: 17.99 }] },
  { slug: "nordstrom-receipt-clothing", brand: "Nordstrom", base: "retail-store", city: "Seattle, WA 98101", items: [{ name: "Cashmere Sweater", quantity: 1, price: 149.0 }, { name: "Leather Belt", quantity: 1, price: 58.0 }, { name: "Fragrance", quantity: 1, price: 92.0 }] },
  { slug: "barnes-noble-receipt-books", brand: "Barnes & Noble", base: "retail-store", city: "New York, NY 10011", items: [{ name: "Hardcover Bestseller", quantity: 1, price: 28.99 }, { name: "Journal", quantity: 1, price: 14.95 }, { name: "Café Latte", quantity: 1, price: 4.95 }] },
  { slug: "dollar-tree-receipt", brand: "Dollar Tree", base: "retail-store", city: "Chesapeake, VA 23320", items: [{ name: "Party Supplies", quantity: 6, price: 1.25 }, { name: "Cleaning Sponges", quantity: 3, price: 1.25 }, { name: "Greeting Card", quantity: 2, price: 1.25 }] },
  { slug: "harbor-freight-receipt-tools", brand: "Harbor Freight Tools", base: "retail-store", city: "Calabasas, CA 91302", items: [{ name: "Pittsburgh Tool Set", quantity: 1, price: 49.99 }, { name: "Work Gloves 3pk", quantity: 1, price: 8.99 }, { name: "Tarp 10x12", quantity: 2, price: 6.99 }] },
  { slug: "autozone-receipt-parts", brand: "AutoZone", base: "retail-store", city: "Memphis, TN 38103", items: [{ name: "Duralast Battery", quantity: 1, price: 139.99 }, { name: "Motor Oil 5qt", quantity: 1, price: 27.99 }, { name: "Wiper Blades", quantity: 2, price: 14.99 }] },
  { slug: "microsoft-store-receipt", brand: "Microsoft Store", base: "retail-store", city: "Redmond, WA 98052", items: [{ name: "Xbox Wireless Controller", quantity: 1, price: 59.99 }, { name: "Game Pass 3-Month", quantity: 1, price: 49.99 }] },

  // ── More pharmacy ──
  { slug: "walgreens-receipt-photo-order", brand: "Walgreens", base: "pharmacy", city: "Deerfield, IL 60015", items: [{ name: "8x10 Photo Print", quantity: 2, price: 4.99 }, { name: "Passport Photo", quantity: 1, price: 16.99 }, { name: "Greeting Card", quantity: 1, price: 3.99 }] },

  // ── More gas ──
  { slug: "circle-k-receipt-gas-snacks", brand: "Circle K", base: "gas-station", city: "Tempe, AZ 85284", items: [{ name: "Regular (gal)", quantity: 11.5, price: 3.35 }, { name: "Polar Pop (L)", quantity: 1, price: 0.99 }, { name: "Hot Dog", quantity: 1, price: 2.49 }] },
  { slug: "7-eleven-receipt-snacks", brand: "7-Eleven", base: "gas-station", city: "Irving, TX 75063", items: [{ name: "Regular (gal)", quantity: 8.7, price: 3.42 }, { name: "Big Gulp", quantity: 1, price: 1.79 }, { name: "Slurpee", quantity: 1, price: 2.29 }] },
  { slug: "sheetz-receipt-mto", brand: "Sheetz", base: "gas-station", city: "Altoona, PA 16601", items: [{ name: "Premium (gal)", quantity: 10.3, price: 4.09 }, { name: "MTO Burger", quantity: 1, price: 6.99 }, { name: "Specialty Coffee", quantity: 1, price: 3.29 }] },
  { slug: "esso-receipt-uk", brand: "Esso", base: "gas-station", city: "Birmingham, UK", taxRate: 0, items: [{ name: "Unleaded (litre)", quantity: 42.0, price: 1.45 }] },

  // ── More hotels ──
  { slug: "airbnb-receipt-stay", brand: "Airbnb", base: "hotel", city: "Austin, TX 78704", items: [{ name: "3 Nights", quantity: 3, price: 142.0 }, { name: "Cleaning Fee", quantity: 1, price: 75.0 }, { name: "Service Fee", quantity: 1, price: 62.0 }] },
  { slug: "motel-6-receipt-stay", brand: "Motel 6", base: "hotel", city: "Dallas, TX 75234", items: [{ name: "Standard Room — 1 Night", quantity: 1, price: 64.99 }, { name: "Pet Fee", quantity: 1, price: 10.0 }] },
  { slug: "ritz-carlton-receipt-stay", brand: "The Ritz-Carlton", base: "hotel", city: "Naples, FL 34108", items: [{ name: "Deluxe Room — 2 Nights", quantity: 2, price: 645.0 }, { name: "Resort Fee", quantity: 2, price: 55.0 }, { name: "Spa Treatment", quantity: 1, price: 220.0 }] },
  { slug: "premier-inn-receipt-uk", brand: "Premier Inn", base: "hotel", city: "London, UK", taxRate: 0, items: [{ name: "Double Room — 1 Night", quantity: 1, price: 89.0 }, { name: "Breakfast", quantity: 2, price: 9.99 }] },
  { slug: "travelodge-receipt-uk", brand: "Travelodge", base: "hotel", city: "Manchester, UK", taxRate: 0, items: [{ name: "Saver Room — 2 Nights", quantity: 2, price: 49.0 }] },

  // ── More rideshare ──
  { slug: "uber-receipt-comfort-ride", brand: "Uber", base: "taxi", city: "Austin, TX 78701", payment: "Credit Card", items: [{ name: "Uber Comfort (7.8 mi)", quantity: 1, price: 24.6 }, { name: "Booking Fee", quantity: 1, price: 3.25 }, { name: "Tip", quantity: 1, price: 5.0 }] },
  { slug: "ola-receipt-india", brand: "Ola", base: "taxi", city: "Mumbai, India", taxRate: 0, payment: "Mobile Payment", items: [{ name: "Ola Mini (12.4 km)", quantity: 1, price: 248.0 }, { name: "Access Fee", quantity: 1, price: 10.0 }] },
  { slug: "cabify-receipt-spain", brand: "Cabify", base: "taxi", city: "Madrid, Spain", taxRate: 0, payment: "Credit Card", items: [{ name: "Cabify Lite (9.1 km)", quantity: 1, price: 13.9 }] },

  // ── Medical / dental / vet (medical-receipt base) ──
  { slug: "urgent-care-receipt-visit", brand: "QuickCare Urgent Care", base: "medical-receipt", city: "Columbus, OH 43215", payment: "Credit Card", items: [{ name: "Office Visit — Established Patient", quantity: 1, price: 150.0 }, { name: "Rapid Strep Test", quantity: 1, price: 45.0 }, { name: "Insurance Adjustment", quantity: 1, price: -120.0 }] },
  { slug: "dental-receipt-cleaning", brand: "Bright Smile Dental", base: "medical-receipt", city: "San Jose, CA 95128", payment: "Credit Card", items: [{ name: "Adult Cleaning (Prophylaxis)", quantity: 1, price: 120.0 }, { name: "Periodic Exam", quantity: 1, price: 55.0 }, { name: "Bitewing X-rays", quantity: 1, price: 65.0 }] },
  { slug: "vet-receipt-checkup", brand: "Paws & Claws Veterinary", base: "medical-receipt", city: "Denver, CO 80205", payment: "Credit Card", items: [{ name: "Wellness Exam", quantity: 1, price: 65.0 }, { name: "Rabies Vaccine", quantity: 1, price: 32.0 }, { name: "Flea & Tick Prevention", quantity: 1, price: 58.0 }] },
  { slug: "physical-therapy-receipt", brand: "Motion Physical Therapy", base: "medical-receipt", city: "Seattle, WA 98109", payment: "Credit Card", items: [{ name: "Therapeutic Exercise (30 min)", quantity: 1, price: 95.0 }, { name: "Manual Therapy", quantity: 1, price: 75.0 }] },

  // ── Childcare / tutoring ──
  { slug: "daycare-receipt-monthly", brand: "Little Explorers Daycare", base: "childcare-receipt", city: "Plano, TX 75024", payment: "Check", items: [{ name: "Full-Time Care — Monthly", quantity: 1, price: 1150.0 }, { name: "Registration Fee", quantity: 1, price: 75.0 }] },
  { slug: "math-tutor-receipt", brand: "Bright Minds Tutoring", base: "tutoring-receipt", city: "Boston, MA 02116", payment: "Credit Card", items: [{ name: "Algebra Tutoring (hr)", quantity: 4, price: 55.0 }, { name: "Practice Materials", quantity: 1, price: 20.0 }] },
  { slug: "language-lessons-receipt", brand: "Lingua Academy", base: "tutoring-receipt", city: "Miami, FL 33130", payment: "Credit Card", items: [{ name: "Spanish Lesson (hr)", quantity: 8, price: 40.0 }] },

  // ── Home services (handyman-receipt) ──
  { slug: "plumber-receipt-repair", brand: "RapidFlow Plumbing", base: "handyman-receipt", city: "Phoenix, AZ 85003", payment: "Credit Card", items: [{ name: "Service Call", quantity: 1, price: 89.0 }, { name: "Labor (2 hrs)", quantity: 2, price: 95.0 }, { name: "Parts — Faucet Cartridge", quantity: 1, price: 38.0 }] },
  { slug: "electrician-receipt-service", brand: "Voltedge Electric", base: "handyman-receipt", city: "Aurora, IL 60505", payment: "Credit Card", items: [{ name: "Diagnostic Fee", quantity: 1, price: 95.0 }, { name: "Outlet Replacement", quantity: 3, price: 45.0 }, { name: "Labor (1.5 hrs)", quantity: 1.5, price: 110.0 }] },
  { slug: "hvac-receipt-service", brand: "Comfort Air HVAC", base: "handyman-receipt", city: "Charlotte, NC 28202", payment: "Credit Card", items: [{ name: "AC Tune-Up", quantity: 1, price: 129.0 }, { name: "Capacitor Replacement", quantity: 1, price: 165.0 }] },
  { slug: "lawn-care-receipt", brand: "GreenBlade Lawn Care", base: "handyman-receipt", city: "Raleigh, NC 27604", payment: "Cash", items: [{ name: "Mowing & Edging", quantity: 1, price: 45.0 }, { name: "Hedge Trimming", quantity: 1, price: 35.0 }] },
  { slug: "pest-control-receipt", brand: "ShieldPest Control", base: "handyman-receipt", city: "Orlando, FL 32801", payment: "Credit Card", items: [{ name: "Quarterly Treatment", quantity: 1, price: 120.0 }, { name: "Termite Inspection", quantity: 1, price: 75.0 }] },

  // ── Cleaning ──
  { slug: "house-cleaning-receipt", brand: "Sparkle Home Cleaning", base: "cleaning-service-receipt", city: "Portland, OR 97205", payment: "Credit Card", items: [{ name: "Deep Clean (3 BR)", quantity: 1, price: 220.0 }, { name: "Interior Windows", quantity: 1, price: 45.0 }] },
  { slug: "carpet-cleaning-receipt", brand: "FreshStep Carpet Care", base: "cleaning-service-receipt", city: "Salt Lake City, UT 84101", payment: "Credit Card", items: [{ name: "Carpet Cleaning (3 rooms)", quantity: 3, price: 55.0 }, { name: "Stain Treatment", quantity: 1, price: 40.0 }] },

  // ── Rent / donation / invoice ──
  { slug: "apartment-rent-receipt", brand: "Maple Grove Apartments", base: "rent-receipt", city: "Austin, TX 78745", payment: "Check", items: [{ name: "Monthly Rent — Unit 204", quantity: 1, price: 1650.0 }, { name: "Pet Rent", quantity: 1, price: 35.0 }] },
  { slug: "goodwill-donation-receipt", brand: "Goodwill", base: "donation-receipt", city: "Rockville, MD 20850", payment: "Cash", items: [{ name: "Clothing (2 bags)", quantity: 2, price: 0.0 }, { name: "Household Goods", quantity: 1, price: 0.0 }], footer: "Thank you for your tax-deductible donation." },
  { slug: "church-donation-receipt", brand: "Grace Community Church", base: "donation-receipt", city: "Nashville, TN 37203", payment: "Check", items: [{ name: "Tithe / Offering", quantity: 1, price: 250.0 }], footer: "No goods or services were provided in exchange for this contribution." },
  { slug: "freelance-invoice-example", brand: "Jordan Creative Studio", base: "invoice", city: "Brooklyn, NY 11201", payment: "Credit Card", items: [{ name: "Logo Design", quantity: 1, price: 800.0 }, { name: "Brand Guidelines", quantity: 1, price: 450.0 }, { name: "Revisions (2 rounds)", quantity: 2, price: 75.0 }] },
  { slug: "web-design-invoice-example", brand: "Pixel & Co. Web Studio", base: "invoice", city: "Austin, TX 78704", payment: "Credit Card", items: [{ name: "Website Design (5 pages)", quantity: 1, price: 2500.0 }, { name: "Hosting Setup", quantity: 1, price: 150.0 }, { name: "SEO Setup", quantity: 1, price: 400.0 }] },

  // ── Misc sales / cash ──
  { slug: "car-wash-receipt", brand: "Splash & Shine Car Wash", base: "sales-receipt", city: "San Diego, CA 92110", payment: "Credit Card", items: [{ name: "Premium Wash", quantity: 1, price: 18.0 }, { name: "Interior Vacuum", quantity: 1, price: 8.0 }, { name: "Tire Shine", quantity: 1, price: 5.0 }] },
  { slug: "farmers-market-receipt", brand: "Riverside Farmers Market", base: "cash-receipt", city: "Sacramento, CA 95814", payment: "Cash", items: [{ name: "Heirloom Tomatoes (lb)", quantity: 2, price: 3.5 }, { name: "Fresh Eggs (dozen)", quantity: 1, price: 6.0 }, { name: "Sourdough Loaf", quantity: 1, price: 7.0 }, { name: "Honey Jar", quantity: 1, price: 9.0 }] },
  { slug: "food-truck-receipt", brand: "Rolling Bites Food Truck", base: "sales-receipt", city: "Portland, OR 97209", payment: "Mobile Payment", items: [{ name: "Korean BBQ Tacos (3)", quantity: 1, price: 12.0 }, { name: "Kimchi Fries", quantity: 1, price: 7.0 }, { name: "Bottled Soda", quantity: 2, price: 2.5 }] },

  // ── Batch 4: restaurant baskets ──
  { slug: "mcdonalds-receipt-family-meal", brand: "McDonald's", base: "fast-food-receipt", city: "Oak Brook, IL 60523", items: [{ name: "4x Quarter Pounder Meal", quantity: 4, price: 8.79 }, { name: "20pc McNuggets", quantity: 1, price: 9.99 }, { name: "Apple Pie", quantity: 4, price: 1.29 }] },
  { slug: "chipotle-receipt-two-burritos", brand: "Chipotle", base: "fast-food-receipt", city: "Newport Beach, CA 92660", items: [{ name: "Steak Burrito", quantity: 1, price: 10.95 }, { name: "Barbacoa Burrito", quantity: 1, price: 10.95 }, { name: "Large Chips & Queso", quantity: 1, price: 5.55 }] },
  { slug: "kfc-receipt-family-bucket", brand: "KFC", base: "fast-food-receipt", city: "Louisville, KY 40213", items: [{ name: "12pc Family Bucket", quantity: 1, price: 32.99 }, { name: "Large Mashed Potatoes", quantity: 2, price: 4.49 }, { name: "Biscuits (6)", quantity: 1, price: 3.99 }] },
  { slug: "taco-bell-receipt-party-pack", brand: "Taco Bell", base: "fast-food-receipt", city: "Irvine, CA 92618", items: [{ name: "Supreme Taco Party Pack (12)", quantity: 1, price: 24.99 }, { name: "Cinnamon Twists", quantity: 2, price: 1.99 }, { name: "Baja Blast (L)", quantity: 2, price: 2.49 }] },
  { slug: "wendys-receipt-biggie-bag", brand: "Wendy's", base: "fast-food-receipt", city: "Dublin, OH 43017", items: [{ name: "Biggie Bag", quantity: 2, price: 5.0 }, { name: "Spicy Nuggets 10pc", quantity: 1, price: 5.29 }, { name: "Frosty (L)", quantity: 2, price: 2.99 }] },
  { slug: "subway-receipt-catering-box", brand: "Subway", base: "fast-food-receipt", city: "Milford, CT 06461", items: [{ name: "Giant Sub Platter", quantity: 1, price: 39.99 }, { name: "Cookie Platter (12)", quantity: 1, price: 9.99 }] },
  { slug: "popeyes-receipt-family-feast", brand: "Popeyes", base: "fast-food-receipt", city: "Atlanta, GA 30338", items: [{ name: "12pc Family Meal", quantity: 1, price: 29.99 }, { name: "Cajun Fries (Family)", quantity: 1, price: 6.99 }, { name: "Biscuits (6)", quantity: 1, price: 4.49 }] },
  { slug: "dominos-receipt-two-pizzas", brand: "Domino's Pizza", base: "pizza-receipt", city: "Ann Arbor, MI 48108", items: [{ name: "Large 2-Topping Pizza", quantity: 2, price: 11.99 }, { name: "Stuffed Cheesy Bread", quantity: 1, price: 7.99 }, { name: "Coke 2L", quantity: 1, price: 2.99 }] },
  { slug: "pizza-hut-receipt-dinner-box", brand: "Pizza Hut", base: "pizza-receipt", city: "Plano, TX 75024", items: [{ name: "Big Dinner Box", quantity: 1, price: 23.99 }, { name: "Breadsticks", quantity: 1, price: 5.99 }] },
  { slug: "chick-fil-a-receipt-breakfast", brand: "Chick-fil-A", base: "fast-food-receipt", city: "College Park, GA 30349", items: [{ name: "Chick-n-Minis (4ct)", quantity: 2, price: 5.65 }, { name: "Hash Browns", quantity: 2, price: 1.69 }, { name: "Coffee", quantity: 2, price: 1.95 }] },
  { slug: "panera-receipt-you-pick-two", brand: "Panera Bread", base: "fast-food-receipt", city: "St. Louis, MO 63105", items: [{ name: "You Pick Two", quantity: 2, price: 11.99 }, { name: "Baguette", quantity: 1, price: 0.0 }, { name: "Iced Tea", quantity: 2, price: 2.99 }] },
  { slug: "five-guys-receipt-little-burger", brand: "Five Guys", base: "fast-food-receipt", city: "Lorton, VA 22079", items: [{ name: "Little Cheeseburger", quantity: 2, price: 8.49 }, { name: "Regular Fries", quantity: 1, price: 5.29 }] },
  { slug: "wingstop-receipt-party-pack", brand: "Wingstop", base: "fast-food-receipt", city: "Addison, TX 75001", items: [{ name: "30pc Party Pack", quantity: 1, price: 31.99 }, { name: "Large Fries", quantity: 2, price: 4.99 }] },
  { slug: "raising-canes-receipt-caniac", brand: "Raising Cane's", base: "fast-food-receipt", city: "Plano, TX 75024", items: [{ name: "The Caniac Combo", quantity: 1, price: 14.49 }, { name: "Extra Toast", quantity: 1, price: 0.99 }] },
  { slug: "whataburger-receipt-breakfast", brand: "Whataburger", base: "fast-food-receipt", city: "San Antonio, TX 78216", items: [{ name: "Breakfast On A Bun Meal", quantity: 2, price: 7.49 }, { name: "Cinnamon Roll", quantity: 1, price: 2.99 }] },
  { slug: "culvers-receipt-value-basket", brand: "Culver's", base: "fast-food-receipt", city: "Prairie du Sac, WI 53578", items: [{ name: "ButterBurger Cheese Value Basket", quantity: 2, price: 9.29 }, { name: "Mint Concrete Mixer", quantity: 1, price: 4.49 }] },
  { slug: "applebees-receipt-2-for-25", brand: "Applebee's", base: "restaurant", city: "Kansas City, MO 64111", items: [{ name: "2 for $25 Combo", quantity: 1, price: 25.0 }, { name: "Spinach & Artichoke Dip", quantity: 1, price: 9.99 }] },
  { slug: "texas-roadhouse-receipt-family-pack", brand: "Texas Roadhouse", base: "restaurant", city: "Louisville, KY 40223", items: [{ name: "Family Pack (Sirloin)", quantity: 1, price: 49.99 }, { name: "Rolls (Dozen)", quantity: 1, price: 0.0 }] },
  { slug: "olive-garden-receipt-take-home", brand: "Olive Garden", base: "restaurant", city: "Orlando, FL 32819", items: [{ name: "Tour of Italy", quantity: 1, price: 21.99 }, { name: "Take-Home Entrée", quantity: 1, price: 7.99 }, { name: "Zeppoli", quantity: 1, price: 6.49 }] },
  { slug: "cheesecake-factory-receipt-cheesecake", brand: "The Cheesecake Factory", base: "restaurant", city: "Calabasas, CA 91302", items: [{ name: "Whole Original Cheesecake", quantity: 1, price: 59.95 }, { name: "Slice to Go", quantity: 2, price: 9.95 }] },
  { slug: "ihop-receipt-family-feast", brand: "IHOP", base: "restaurant", city: "Glendale, CA 91203", items: [{ name: "Family Feast (Pancakes)", quantity: 1, price: 39.99 }, { name: "Hash Browns (Family)", quantity: 1, price: 8.99 }] },
  { slug: "arbys-receipt-meat-mountain", brand: "Arby's", base: "fast-food-receipt", city: "Atlanta, GA 30339", items: [{ name: "Meat Mountain", quantity: 1, price: 10.0 }, { name: "Curly Fries (L)", quantity: 1, price: 3.29 }, { name: "Jamocha Shake", quantity: 1, price: 3.29 }] },
  { slug: "little-caesars-receipt-deep-dish", brand: "Little Caesars", base: "pizza-receipt", city: "Detroit, MI 48201", items: [{ name: "Deep Dish Pepperoni", quantity: 1, price: 9.99 }, { name: "Crazy Combo", quantity: 1, price: 4.49 }] },
  { slug: "sonic-receipt-happy-hour", brand: "Sonic Drive-In", base: "fast-food-receipt", city: "Oklahoma City, OK 73102", items: [{ name: "Route 44 Slush", quantity: 2, price: 2.49 }, { name: "Mozzarella Sticks", quantity: 1, price: 4.29 }, { name: "Soft Pretzel Twist", quantity: 1, price: 2.99 }] },

  // ── Coffee ──
  { slug: "dunkin-receipt-dozen-donuts", brand: "Dunkin'", base: "coffee-shop", city: "Quincy, MA 02169", items: [{ name: "Dozen Donuts", quantity: 1, price: 12.99 }, { name: "Box O' Joe", quantity: 1, price: 18.99 }] },
  { slug: "tim-hortons-receipt-timbits", brand: "Tim Hortons", base: "coffee-shop", city: "Toronto, ON", items: [{ name: "Timbits 20pk", quantity: 1, price: 6.99 }, { name: "Double-Double (L)", quantity: 2, price: 2.19 }] },
  { slug: "dutch-bros-receipt-energy", brand: "Dutch Bros", base: "coffee-shop", city: "Grants Pass, OR 97526", items: [{ name: "Rebel Energy (L)", quantity: 2, price: 5.5 }, { name: "Soft Top", quantity: 1, price: 0.75 }] },
  { slug: "starbucks-receipt-holiday-order", brand: "Starbucks", base: "coffee-shop", city: "Seattle, WA 98109", items: [{ name: "Peppermint Mocha (Venti)", quantity: 2, price: 6.25 }, { name: "Cake Pop", quantity: 2, price: 2.95 }, { name: "Reserve Beans 12oz", quantity: 1, price: 19.95 }] },
  { slug: "peets-receipt-beans", brand: "Peet's Coffee", base: "coffee-shop", city: "Berkeley, CA 94704", items: [{ name: "Major Dickason's Blend 1lb", quantity: 1, price: 16.95 }, { name: "Latte (L)", quantity: 1, price: 4.95 }] },
  { slug: "panera-receipt-coffee-subscription", brand: "Panera Bread", base: "coffee-shop", city: "St. Louis, MO 63105", items: [{ name: "Unlimited Sip Club — Monthly", quantity: 1, price: 11.99 }] },

  // ── Grocery ──
  { slug: "costco-receipt-monthly-stockup", brand: "Costco Wholesale", base: "grocery-store", city: "Issaquah, WA 98027", items: [{ name: "Kirkland Paper Towels 12ct", quantity: 1, price: 21.99 }, { name: "Rotisserie Chicken", quantity: 2, price: 4.99 }, { name: "Organic Eggs 24ct", quantity: 1, price: 7.49 }, { name: "Ground Coffee 3lb", quantity: 1, price: 14.99 }] },
  { slug: "sams-club-receipt-bulk-run", brand: "Sam's Club", base: "grocery-store", city: "Bentonville, AR 72712", items: [{ name: "Member's Mark Water 40pk", quantity: 2, price: 4.48 }, { name: "Bath Tissue 45ct", quantity: 1, price: 23.98 }, { name: "Frozen Chicken 10lb", quantity: 1, price: 28.84 }] },
  { slug: "whole-foods-receipt-prepared-foods", brand: "Whole Foods Market", base: "grocery-store", city: "Austin, TX 78703", items: [{ name: "Hot Bar (lb)", quantity: 1.4, price: 10.99 }, { name: "Kombucha", quantity: 2, price: 3.49 }, { name: "365 Sparkling Water 8pk", quantity: 1, price: 2.99 }] },
  { slug: "kroger-receipt-bulk-shop", brand: "Kroger", base: "grocery-store", city: "Cincinnati, OH 45202", items: [{ name: "Boneless Chicken Breast (lb)", quantity: 4, price: 3.99 }, { name: "Kroger Brand Cereal", quantity: 3, price: 2.49 }, { name: "2% Milk 1Gal", quantity: 2, price: 3.29 }] },
  { slug: "meijer-receipt-grocery", brand: "Meijer", base: "grocery-store", city: "Grand Rapids, MI 49544", items: [{ name: "Meijer Bread", quantity: 2, price: 1.49 }, { name: "Frozen Vegetables", quantity: 4, price: 1.0 }, { name: "Ground Turkey (lb)", quantity: 1, price: 4.99 }] },
  { slug: "heb-receipt-texas-run", brand: "H-E-B", base: "grocery-store", city: "San Antonio, TX 78215", items: [{ name: "H-E-B Brisket (lb)", quantity: 3, price: 4.47 }, { name: "Tortillas 20ct", quantity: 2, price: 2.18 }, { name: "Queso Fresco", quantity: 1, price: 3.99 }] },
  { slug: "wegmans-receipt-shop", brand: "Wegmans", base: "grocery-store", city: "Rochester, NY 14624", items: [{ name: "Wegmans Pizza Kit", quantity: 1, price: 9.99 }, { name: "Organic Strawberries", quantity: 2, price: 4.99 }, { name: "French Baguette", quantity: 1, price: 2.49 }] },
  { slug: "publix-receipt-subs", brand: "Publix", base: "grocery-store", city: "Lakeland, FL 33801", items: [{ name: "Chicken Tender Pub Sub (Whole)", quantity: 2, price: 11.49 }, { name: "Publix Chips", quantity: 2, price: 2.99 }] },
  { slug: "safeway-receipt-deli", brand: "Safeway", base: "grocery-store", city: "Pleasanton, CA 94588", items: [{ name: "Deli Rotisserie Chicken", quantity: 1, price: 8.99 }, { name: "Potato Salad (lb)", quantity: 1, price: 5.99 }, { name: "Signature Rolls 12ct", quantity: 1, price: 3.99 }] },
  { slug: "sprouts-receipt-organic-haul", brand: "Sprouts Farmers Market", base: "grocery-store", city: "Phoenix, AZ 85016", items: [{ name: "Organic Chicken (lb)", quantity: 2, price: 6.99 }, { name: "Bulk Trail Mix (lb)", quantity: 1, price: 5.49 }, { name: "Cold-Pressed Juice", quantity: 2, price: 4.99 }] },
  { slug: "aldi-receipt-weekly", brand: "ALDI", base: "grocery-store", city: "Batavia, IL 60510", items: [{ name: "Friendly Farms Milk", quantity: 2, price: 2.65 }, { name: "Specially Selected Pizza", quantity: 2, price: 4.49 }, { name: "Bananas (lb)", quantity: 3, price: 0.44 }] },
  { slug: "sainsburys-receipt-meal-deal", brand: "Sainsbury's", base: "grocery-store", city: "London, UK", taxRate: 0, items: [{ name: "Meal Deal (Sandwich+Snack+Drink)", quantity: 2, price: 3.75 }, { name: "Milk 2 Pints", quantity: 1, price: 1.25 }] },
  { slug: "asda-receipt-weekly-shop", brand: "ASDA", base: "grocery-store", city: "Leeds, UK", taxRate: 0, items: [{ name: "ASDA Chicken 1kg", quantity: 1, price: 5.5 }, { name: "Baked Beans 4pk", quantity: 2, price: 1.4 }, { name: "Bread Loaf", quantity: 2, price: 0.59 }] },
  { slug: "coles-receipt-aus-shop", brand: "Coles", base: "grocery-store", city: "Melbourne, Australia", taxRate: 0, items: [{ name: "Coles Milk 3L", quantity: 1, price: 4.0 }, { name: "Tim Tams", quantity: 2, price: 3.5 }, { name: "Bananas (kg)", quantity: 1, price: 3.9 }] },

  // ── Retail ──
  { slug: "best-buy-receipt-laptop", brand: "Best Buy", base: "electronics-store-receipt", city: "Richfield, MN 55423", items: [{ name: "Laptop 15\" i7", quantity: 1, price: 899.99 }, { name: "Laptop Sleeve", quantity: 1, price: 24.99 }, { name: "Geek Squad Setup", quantity: 1, price: 99.99 }] },
  { slug: "apple-store-receipt-iphone", brand: "Apple Store", base: "electronics-store-receipt", city: "Cupertino, CA 95014", items: [{ name: "iPhone 16 128GB", quantity: 1, price: 799.0 }, { name: "MagSafe Charger", quantity: 1, price: 39.0 }, { name: "AppleCare+", quantity: 1, price: 149.0 }] },
  { slug: "nike-receipt-jordans", brand: "Nike", base: "clothing-store-receipt", city: "New York, NY 10012", items: [{ name: "Air Jordan 1 High", quantity: 1, price: 180.0 }, { name: "Nike Tech Fleece Hoodie", quantity: 1, price: 130.0 }] },
  { slug: "macys-receipt-shoes", brand: "Macy's", base: "clothing-store-receipt", city: "New York, NY 10001", items: [{ name: "Steve Madden Heels", quantity: 1, price: 99.0 }, { name: "INC Dress", quantity: 1, price: 89.5 }] },
  { slug: "sephora-receipt-skincare", brand: "Sephora", base: "clothing-store-receipt", city: "San Francisco, CA 94105", items: [{ name: "Vitamin C Serum", quantity: 1, price: 78.0 }, { name: "Moisturizer", quantity: 1, price: 45.0 }, { name: "Cleanser", quantity: 1, price: 32.0 }] },
  { slug: "ulta-receipt-haircare", brand: "Ulta Beauty", base: "clothing-store-receipt", city: "Bolingbrook, IL 60440", items: [{ name: "Shampoo & Conditioner Set", quantity: 1, price: 48.0 }, { name: "Hair Dryer", quantity: 1, price: 129.99 }] },
  { slug: "gamestop-receipt-console", brand: "GameStop", base: "electronics-store-receipt", city: "Grapevine, TX 76051", items: [{ name: "Pre-Owned Console", quantity: 1, price: 299.99 }, { name: "Controller", quantity: 1, price: 59.99 }, { name: "Pro Membership", quantity: 1, price: 24.99 }] },
  { slug: "home-depot-receipt-paint-project", brand: "The Home Depot", base: "hardware-store-receipt", city: "Atlanta, GA 30339", items: [{ name: "Behr Paint (Gallon)", quantity: 3, price: 34.98 }, { name: "Roller Kit", quantity: 1, price: 14.97 }, { name: "Painter's Tape 3pk", quantity: 1, price: 11.97 }] },
  { slug: "lowes-receipt-appliance", brand: "Lowe's", base: "hardware-store-receipt", city: "Mooresville, NC 28117", items: [{ name: "Microwave", quantity: 1, price: 149.0 }, { name: "Delivery & Haul-Away", quantity: 1, price: 49.0 }] },
  { slug: "ikea-receipt-kitchen", brand: "IKEA", base: "retail-store", city: "Conshohocken, PA 19428", items: [{ name: "KALLAX Shelf Unit", quantity: 1, price: 89.99 }, { name: "Drinking Glasses 6pk", quantity: 2, price: 4.99 }, { name: "Plant Pot", quantity: 3, price: 3.99 }] },
  { slug: "lululemon-receipt-yoga", brand: "lululemon", base: "clothing-store-receipt", city: "Vancouver, BC", items: [{ name: "Align Tank", quantity: 1, price: 58.0 }, { name: "The Yoga Mat 5mm", quantity: 1, price: 88.0 }] },
  { slug: "adidas-receipt-soccer", brand: "adidas", base: "clothing-store-receipt", city: "Portland, OR 97201", items: [{ name: "Predator Cleats", quantity: 1, price: 130.0 }, { name: "Tiro Track Pants", quantity: 1, price: 45.0 }] },
  { slug: "foot-locker-receipt-dunks", brand: "Foot Locker", base: "clothing-store-receipt", city: "New York, NY 10001", items: [{ name: "Nike Dunk Low", quantity: 1, price: 115.0 }, { name: "Crew Socks 6pk", quantity: 1, price: 20.0 }] },
  { slug: "kohls-receipt-bedding", brand: "Kohl's", base: "retail-store", city: "Menomonee Falls, WI 53051", items: [{ name: "Comforter Set (Queen)", quantity: 1, price: 79.99 }, { name: "Bath Towels 4pk", quantity: 1, price: 24.99 }] },
  { slug: "old-navy-receipt-kids", brand: "Old Navy", base: "clothing-store-receipt", city: "San Francisco, CA 94133", items: [{ name: "Kids Jeans", quantity: 2, price: 17.99 }, { name: "Toddler Tees 3pk", quantity: 1, price: 14.99 }] },
  { slug: "uniqlo-receipt-basics", brand: "Uniqlo", base: "clothing-store-receipt", city: "New York, NY 10018", items: [{ name: "Ultra Light Down Vest", quantity: 1, price: 49.9 }, { name: "Supima Cotton Tees 3pk", quantity: 1, price: 44.7 }] },
  { slug: "gucci-receipt-handbag", brand: "Gucci", base: "clothing-store-receipt", city: "New York, NY 10022", items: [{ name: "GG Marmont Shoulder Bag", quantity: 1, price: 2350.0 }] },
  { slug: "rei-receipt-camping", brand: "REI", base: "retail-store", city: "Seattle, WA 98109", items: [{ name: "2-Person Tent", quantity: 1, price: 199.0 }, { name: "Sleeping Bag", quantity: 2, price: 89.0 }, { name: "Camp Stove", quantity: 1, price: 59.95 }] },
  { slug: "petco-receipt-aquarium", brand: "Petco", base: "pet-store-receipt", city: "San Diego, CA 92121", items: [{ name: "20 Gallon Aquarium Kit", quantity: 1, price: 119.99 }, { name: "Fish Food", quantity: 1, price: 8.99 }, { name: "Water Conditioner", quantity: 1, price: 6.99 }] },

  // ── Pharmacy / health ──
  { slug: "cvs-receipt-vitamins", brand: "CVS Pharmacy", base: "pharmacy", city: "Woonsocket, RI 02895", items: [{ name: "Multivitamin 200ct", quantity: 1, price: 18.99 }, { name: "Vitamin D3", quantity: 1, price: 12.49 }, { name: "Hand Sanitizer", quantity: 2, price: 2.99 }] },
  { slug: "walgreens-receipt-otc", brand: "Walgreens", base: "pharmacy", city: "Deerfield, IL 60015", items: [{ name: "Allergy Relief 24hr", quantity: 1, price: 17.99 }, { name: "Cough Syrup", quantity: 1, price: 9.49 }, { name: "Throat Lozenges", quantity: 2, price: 3.99 }] },
  { slug: "rite-aid-receipt-otc", brand: "Rite Aid", base: "pharmacy", city: "Camp Hill, PA 17011", items: [{ name: "Ibuprofen 200mg 100ct", quantity: 1, price: 8.99 }, { name: "First Aid Kit", quantity: 1, price: 14.99 }] },

  // ── Gas ──
  { slug: "shell-receipt-premium-fillup", brand: "Shell", base: "gas-station", city: "Houston, TX 77002", items: [{ name: "Shell V-Power (gal)", quantity: 13.2, price: 4.19 }, { name: "Car Wash", quantity: 1, price: 9.0 }] },
  { slug: "chevron-receipt-fillup", brand: "Chevron", base: "gas-station", city: "San Ramon, CA 94583", items: [{ name: "Regular (gal)", quantity: 11.0, price: 4.79 }] },
  { slug: "exxon-receipt-snacks", brand: "Exxon", base: "gas-station", city: "Irving, TX 75039", items: [{ name: "Regular (gal)", quantity: 12.5, price: 3.45 }, { name: "Energy Drink", quantity: 1, price: 3.49 }, { name: "Chips", quantity: 1, price: 2.29 }] },
  { slug: "circle-k-receipt-snack-run", brand: "Circle K", base: "gas-station", city: "Tempe, AZ 85284", items: [{ name: "Regular (gal)", quantity: 9.8, price: 3.35 }, { name: "Polar Pop (L)", quantity: 2, price: 0.99 }, { name: "Roller Grill Hot Dog", quantity: 2, price: 1.99 }] },
  { slug: "sheetz-receipt-mto-order", brand: "Sheetz", base: "gas-station", city: "Altoona, PA 16601", items: [{ name: "Premium (gal)", quantity: 10.5, price: 4.09 }, { name: "MTO Sub", quantity: 1, price: 7.49 }, { name: "Specialty Drink", quantity: 1, price: 3.29 }] },

  // ── Travel ──
  { slug: "marriott-receipt-weekend", brand: "Marriott", base: "hotel", city: "Bethesda, MD 20814", items: [{ name: "King Room — 2 Nights", quantity: 2, price: 199.0 }, { name: "Valet Parking", quantity: 2, price: 42.0 }, { name: "Room Service", quantity: 1, price: 38.5 }] },
  { slug: "hilton-receipt-business-stay", brand: "Hilton", base: "hotel", city: "McLean, VA 22102", items: [{ name: "Executive Room — 3 Nights", quantity: 3, price: 224.0 }, { name: "Resort Fee", quantity: 3, price: 35.0 }] },
  { slug: "airbnb-receipt-week-stay", brand: "Airbnb", base: "hotel", city: "Austin, TX 78704", items: [{ name: "7 Nights", quantity: 7, price: 128.0 }, { name: "Cleaning Fee", quantity: 1, price: 95.0 }, { name: "Service Fee", quantity: 1, price: 110.0 }] },
  { slug: "jetblue-receipt-flight", brand: "JetBlue", base: "airline-receipt", city: "Long Island City, NY", items: [{ name: "Base Fare (JFK-FLL)", quantity: 1, price: 119.0 }, { name: "Even More Space", quantity: 1, price: 45.0 }, { name: "Checked Bag", quantity: 1, price: 35.0 }] },
  { slug: "delta-receipt-flight", brand: "Delta Airlines", base: "airline-receipt", city: "Atlanta, GA", items: [{ name: "Main Cabin Fare", quantity: 1, price: 248.0 }, { name: "Taxes & Fees", quantity: 1, price: 41.2 }, { name: "Preferred Seat", quantity: 1, price: 29.0 }] },
  { slug: "hertz-receipt-rental", brand: "Hertz", base: "car-rental-receipt", city: "Estero, FL 33928", items: [{ name: "Full-Size Car — 3 Days", quantity: 3, price: 54.0 }, { name: "Loss Damage Waiver (day)", quantity: 3, price: 21.99 }, { name: "Prepaid Fuel", quantity: 1, price: 52.0 }] },
  { slug: "expedia-receipt-package", brand: "Expedia", base: "hotel", city: "Seattle, WA 98119", items: [{ name: "Flight + Hotel Package", quantity: 1, price: 689.0 }, { name: "Taxes & Booking Fees", quantity: 1, price: 78.4 }] },
  { slug: "southwest-receipt-flight", brand: "Southwest Airlines", base: "airline-receipt", city: "Dallas, TX", items: [{ name: "Wanna Get Away Fare", quantity: 1, price: 129.0 }, { name: "Taxes & Fees", quantity: 1, price: 22.4 }, { name: "EarlyBird Check-In", quantity: 1, price: 25.0 }] },

  // ── Services ──
  { slug: "uber-receipt-pool-ride", brand: "Uber", base: "taxi", city: "San Francisco, CA 94103", payment: "Credit Card", items: [{ name: "UberX Share (3.1 mi)", quantity: 1, price: 9.8 }, { name: "Booking Fee", quantity: 1, price: 2.75 }] },
  { slug: "lyft-receipt-lux-ride", brand: "Lyft", base: "taxi", city: "Los Angeles, CA 90045", payment: "Credit Card", items: [{ name: "Lyft Lux (9 mi)", quantity: 1, price: 41.5 }, { name: "Service Fee", quantity: 1, price: 3.5 }, { name: "Tip", quantity: 1, price: 8.0 }] },
  { slug: "doordash-receipt-grocery", brand: "DoorDash", base: "restaurant", city: "San Francisco, CA 94107", payment: "Credit Card", items: [{ name: "Grocery Subtotal", quantity: 1, price: 54.2 }, { name: "Delivery Fee", quantity: 1, price: 3.99 }, { name: "Service Fee", quantity: 1, price: 8.13 }, { name: "Dasher Tip", quantity: 1, price: 8.0 }] },
  { slug: "instacart-receipt-costco", brand: "Instacart", base: "grocery-store", city: "San Francisco, CA 94105", payment: "Credit Card", items: [{ name: "Costco Order Subtotal", quantity: 1, price: 142.6 }, { name: "Delivery Fee", quantity: 1, price: 3.99 }, { name: "Service Fee", quantity: 1, price: 14.26 }, { name: "Tip", quantity: 1, price: 15.0 }] },
  { slug: "planet-fitness-receipt-membership", brand: "Planet Fitness", base: "gym-membership-receipt", city: "Hampton, NH 03842", payment: "Credit Card", items: [{ name: "Black Card Membership", quantity: 1, price: 24.99 }, { name: "Annual Fee", quantity: 1, price: 49.0 }] },
  { slug: "la-fitness-receipt-membership", brand: "LA Fitness", base: "gym-membership-receipt", city: "Irvine, CA 92614", payment: "Credit Card", items: [{ name: "Monthly Dues", quantity: 1, price: 39.99 }, { name: "Initiation Fee", quantity: 1, price: 99.0 }] },
  { slug: "regal-receipt-movie-night", brand: "Regal Cinemas", base: "sales-receipt", city: "Knoxville, TN 37902", payment: "Credit Card", items: [{ name: "Adult Ticket", quantity: 2, price: 14.5 }, { name: "Large Popcorn", quantity: 1, price: 9.5 }, { name: "Soft Drink (L)", quantity: 2, price: 6.0 }] },
  { slug: "ups-store-receipt-shipping", brand: "The UPS Store", base: "sales-receipt", city: "San Diego, CA 92101", payment: "Credit Card", items: [{ name: "Ground Shipping", quantity: 1, price: 14.85 }, { name: "Packaging", quantity: 1, price: 4.99 }, { name: "Printing (25 pages)", quantity: 25, price: 0.19 }] },
];

export const EXAMPLE_SLUGS = EXAMPLES.map((e) => e.slug);

export function getExample(slug: string): Example | undefined {
  return EXAMPLES.find((e) => e.slug === slug);
}
