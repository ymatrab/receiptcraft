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
];

export const EXAMPLE_SLUGS = EXAMPLES.map((e) => e.slug);

export function getExample(slug: string): Example | undefined {
  return EXAMPLES.find((e) => e.slug === slug);
}
