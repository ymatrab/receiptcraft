import { PLANS, formatPlanPrice } from "@/lib/plans";
import type { LineItem, ReceiptTemplate } from "./types";
import { WIKIMEDIA_LOGOS } from "./brand-logos";
import type { BrandCategory } from "./brand-categories";
import {
  CATEGORY_DEFAULT_ITEMS,
  CATEGORY_ICON,
  CATEGORY_NOUN,
  EXISTING_BRAND_CATEGORY,
} from "./brand-categories";
import { fitSeoDescription } from "./seo-description";
import { BRAND_SPECS } from "./brand-specs";

/**
 * Brand logo URL for a company domain. Prefers the official Wikimedia wordmark
 * resolved by scripts/resolve-logos.mjs; domains without one fall back to a
 * favicon. Both are served through the same-origin /api/logo proxy (see
 * app/api/logo) so logos are edge-cached, survive a Wikimedia hotlink block,
 * and embed into exported PDF/PNG receipts without cross-origin canvas tainting.
 */
export const brandLogo = (domain: string) => {
  const wordmark = WIKIMEDIA_LOGOS[domain];
  return wordmark
    ? `/api/logo?url=${encodeURIComponent(wordmark)}`
    : `/api/logo?domain=${domain}`;
};

let n = 0;
const id = () => `brand-${++n}`;

/**
 * "$3" — the cheapest watermark-free pass, for the hand-written entries below.
 * PRO_FROM further down holds the same value but is declared after HAND_BRANDS,
 * so referencing it from an entry would throw at module load.
 */
const PASS_FROM = formatPlanPrice(PLANS.pro_weekly);

const HAND_BRANDS: ReceiptTemplate[] = [
  {
    slug: "walmart",
    name: "Walmart Receipt",
    shortName: "Walmart",
    icon: "🛒",
    // 2026-11-16: "template" added to the title, H1 and intro — the page ranks
    // ~10 for "walmart receipt template" — with "generator" kept first, since it
    // brings most of the clicks. The lost-receipt and reimbursement use cases
    // went with the misuse review (the page draws "fake walmart receipt" queries).
    seoTitle: "Free Walmart Receipt Generator & Template — Itemized Receipt Maker",
    seoDescription:
      `Fill in an editable Walmart receipt template with items, prices, tax, store details and date. Free watermarked PDF or PNG; Pro from ${PASS_FROM} a week removes it.`,
    heading: "Walmart Receipt Generator & Template",
    intro:
      `Fill in a Walmart receipt template with itemized products, quantities, tax and payment details, then download it as a PDF or PNG. Building it and a watermarked download are free; Pro from ${PASS_FROM} a week removes the watermark.`,
    useCases: [
      "Records of your own Walmart purchases",
      "Personal bookkeeping and budgeting",
      "Sample receipts for design mockups",
    ],
    faqs: [
      {
        question: "How do I make a Walmart receipt?",
        answer:
          "Simply enter the store details, add your items and prices, set the tax rate, and download the PDF. The design matches standard thermal paper receipts.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("walmart.com"),
      businessName: "Walmart",
      addressLine1: "702 SW 8th Street",
      addressLine2: "Bentonville, AR 72712",
      phone: "(479) 273-4681",
      taxLabel: "Tax",
      taxRate: 9.75,
      footerMessage: "Save Money. Live Better.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "GV Whole Milk 1 Gal", quantity: 1, price: 3.36 },
        { id: id(), name: "Bananas (lb)", quantity: 2.5, price: 0.58 },
        { id: id(), name: "GV Paper Towels 6pk", quantity: 1, price: 9.97 },
      ],
    },
  },
  {
    slug: "uber",
    name: "Uber Receipt",
    shortName: "Uber",
    icon: "🚗",
    seoTitle: "Uber Receipt Generator & Template — Uber Trip Receipt",
    seoDescription:
      "Uber receipt generator and template: trip fare, booking fee, tip, pickup and drop-off times, then a PDF or PNG. Free download is watermarked; Pro clears it.",
    heading: "Uber Receipt Generator & Template",
    intro:
      "Make an Uber-style trip receipt with the fare, booking fee and tip, the ride type and the pickup and drop-off times, then download it as a PDF or PNG.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of rides and fares",
      "Client billing for travel costs",
    ],
    guidance: [
      {
        heading: "The fields of an Uber trip receipt",
        body:
          "The sample opens with an UberX ride: a trip fare line, a booking fee line, the pickup and drop-off times and a tip. Change the fare, fee, tip and times to match the trip and the total follows.",
      },
      {
        heading: "Uber receipt template: start from the layout",
        body:
          "The template is a clean, minimal trip layout with the total, the fare breakdown and the trip details. Use it as the starting layout for your own ride records or mockups. Makecepeit is not affiliated with Uber, and a receipt made here is not proof of purchase.",
      },
    ],
    faqs: [
      {
        question: "Can I add a tip to my Uber receipt?",
        answer:
          "Yes. Use the tip field to add a gratuity, and the total will be calculated automatically.",
      },
      {
        question: "Is the Uber receipt generator free?",
        answer:
          `Building and a watermarked download are free with no account; a clean download needs Pro from ${PASS_FROM} a week.`,
      },
      {
        question: "Is this an official Uber receipt?",
        answer:
          "No. Makecepeit is not affiliated with Uber; your official receipt comes from Uber itself.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("uber.com"),
      businessName: "Uber",
      addressLine1: "Trip Details",
      addressLine2: "San Francisco, CA",
      phone: "",
      taxLabel: "City Surcharge",
      taxRate: 0,
      tip: 5.0,
      cashier: "Driver: Michael T.",
      footerMessage: "Thanks for riding with Uber.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Base Fare", quantity: 1, price: 2.5 },
        { id: id(), name: "Distance (8.4 mi)", quantity: 1, price: 14.2 },
        { id: id(), name: "Time (22 min)", quantity: 1, price: 4.15 },
        { id: id(), name: "Booking Fee", quantity: 1, price: 2.85 },
      ],
    },
  },
  {
    slug: "target",
    name: "Target Receipt",
    shortName: "Target",
    icon: "🎯",
    seoTitle: "Target Receipt Generator & Maker — Download PDF or PNG",
    seoDescription:
      "Target receipt generator and maker: add items with item numbers and T tax flags, set the sales tax and store, then download a watermarked PDF or PNG free.",
    heading: "Target Receipt Generator & Maker",
    intro:
      "Make a Target-style store receipt: add household goods, apparel and groceries, each with its item number, set the sales tax, edit the store and date, then download a PDF or PNG.",
    useCases: [
      "Keep your own record of Target purchases",
      "Records of your own purchases",
      "Prop use for design and video",
    ],
    guidance: [
      {
        heading: "Target receipt template: the thermal layout",
        body:
          "The Target template opens as a thermal store receipt in a monospaced font: the store name and address at the top, then each item in capitals with a 9-digit item number and a T tax flag, the subtotal, the tax line and the total. Under the total sit the card lines, a barcode and a return-policy footer. Every line is editable, so change the items, item numbers, store and date to match your own record.",
      },
      {
        heading: "The Target receipt header and logo",
        body:
          "The header shows the store name and address with a logo. In the editor you can upload your own logo image, use a text heading instead, or leave the logo out. Makecepeit is not affiliated with Target, and a receipt made here is not proof of purchase.",
      },
    ],
    faqs: [
      {
        question: "What layout does the Target template use?",
        answer:
          "A thermal store layout: item lines in capitals with a 9-digit item number and a T tax flag, then the subtotal, tax and total, the card lines, a barcode and a return-policy footer. Every field is editable.",
      },
      {
        question: "Is the Target receipt generator free?",
        answer:
          `Building and a watermarked download are free with no account; a clean download needs Pro from ${PASS_FROM} a week.`,
      },
      {
        question: "Can I change the tax rate and item numbers?",
        answer:
          "Yes. Every item, item number, tax rate, store and date is editable.",
      },
      {
        question: "Is this affiliated with Target?",
        answer:
          "No. It is an independent template and not a proof of purchase.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("target.com"),
      businessName: "Target",
      addressLine1: "1000 Nicollet Mall",
      addressLine2: "Minneapolis, MN 55403",
      phone: "(612) 304-6073",
      taxLabel: "Sales Tax",
      taxRate: 8.025,
      footerMessage: "Expect More. Pay Less.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Threshold Throw Pillow", quantity: 2, price: 15.0 },
        { id: id(), name: "Goodfellow Crew Tee", quantity: 1, price: 12.0 },
        { id: id(), name: "Up&Up AA Batteries 8pk", quantity: 1, price: 8.49 },
      ],
    },
  },
  {
    slug: "mcdonalds",
    name: "McDonald's Receipt",
    shortName: "McDonald's",
    icon: "🍔",
    seoTitle: "Free McDonald's Receipt Generator — Fast Food Receipt Maker",
    seoDescription:
      "Generate a McDonald's fast food receipt online. Add your meal, combos and tax, edit the store details and order date, then get a free watermarked PDF or PNG.",
    heading: "McDonald's Receipt Generator",
    intro:
      "Recreate a fast food order from McDonald's. Handy for keeping your own record of a meal.",
    useCases: [
      "Records of your own purchases",
      "Personal budgeting and bookkeeping",
      "Lost fast food receipt recovery",
    ],
    faqs: [
      {
        question: "Can I use this for my travel expenses?",
        answer:
          "For your own records of travel meals, yes. To claim a meal back from work, use the original receipt; if you lost it, ask the restaurant for a copy or use your company's missing-receipt form.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("mcdonalds.com"),
      logoText: "McDonald's",
      businessName: "",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Tax",
      taxRate: 9.25,
      register: "",
      cardLastFour: "4422",
      fontFamily: "mono",
      headerAlign: "center",
      ruleStyle: "dashed",
      itemStyle: "qtycol",
      dividers: "minimal",
      paymentInline: true,
      sectionStyle: "flow",
      grandTotalLabel: "Total",
      hideStoreLine: true,
      qrCode: true,
      footerMessage: "i'm lovin' it",
      policyText: "Visit the help section in the McDonald's app for support.",
      sections: [
        {
          rows: [
            { label: "Order Type", value: "Dine In" },
            { label: "Crew", value: "Sarah M." },
            { label: "Store", value: "#04829" },
          ],
        },
      ],
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Big Mac", quantity: 1, price: 5.99 },
        { id: id(), name: "Quarter Pounder w/ Cheese", quantity: 1, price: 6.29 },
        { id: id(), name: "World Famous Fries (M)", quantity: 2, price: 3.89 },
        { id: id(), name: "10pc Chicken McNuggets", quantity: 1, price: 5.49 },
        { id: id(), name: "Coca-Cola (M)", quantity: 1, price: 1.49 },
      ],
    },
  },
  {
    slug: "starbucks",
    name: "Starbucks Receipt",
    shortName: "Starbucks",
    icon: "☕",
    // 2026-11-16: this page, not the /brands hub, owns "starbucks receipt
    // template" — the hub keeps its own title and links here with that anchor.
    seoTitle: "Starbucks Receipt Template & Generator — Coffee Receipt Maker",
    seoDescription:
      `Fill in a Starbucks receipt template with your drinks, food, tax, store details and order date. Free watermarked PDF or PNG; Pro from ${PASS_FROM} a week removes it.`,
    heading: "Starbucks Receipt Template & Generator",
    intro:
      `Fill in a Starbucks receipt template with your lattes, cold brews and pastries, then download it as a PDF or PNG. Building it and a watermarked download are free; Pro from ${PASS_FROM} a week removes the watermark.`,
    useCases: [
      "Records of your own purchases",
      "Petty cash documentation",
      "Personal expense tracking",
    ],
    faqs: [
      {
        question: "How do I add multiple coffees?",
        answer:
          "Click '+ Add Item' to add as many drinks or pastries as you need, and adjust the quantity for group orders.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("starbucks.com"),
      businessName: "Starbucks",
      addressLine1: "1912 Pike Place",
      addressLine2: "Seattle, WA 98101",
      phone: "(206) 842-0436",
      taxLabel: "Tax",
      taxRate: 10.25,
      cashier: "Barista: Sarah",
      footerMessage: "To inspire and nurture the human spirit.",
      paperStyle: "thermal",
      items: [
        {
          id: id(),
          name: "Gr Caramel Macchiato",
          quantity: 1,
          price: 5.75,
        },
        { id: id(), name: "Vt Iced Vanilla Latte", quantity: 1, price: 6.45 },
        { id: id(), name: "Butter Croissant", quantity: 2, price: 3.45 },
      ],
    },
  },
  {
    slug: "burger-king",
    name: "Burger King Receipt",
    shortName: "Burger King",
    icon: "🍔",
    seoTitle:
      "Free Burger King Receipt Generator — Burger King Receipt Maker",
    seoDescription:
      "Create a Burger King receipt online. Add your Whoppers, fries and drinks, edit the prices, tax and order date, then download a free watermarked PDF or PNG.",
    heading: "Burger King Receipt Generator",
    intro:
      "Generate an editable Burger King receipt for your flame-grilled meal. Handy for keeping your own record of a meal.",
    useCases: [
      "Records of your own purchases",
      "Replace lost meal receipts",
      "Personal budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Burger King receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("bk.com"),
      businessName: "Burger King",
      addressLine1: "5505 Blue Lagoon Dr",
      addressLine2: "Miami, FL 33126",
      phone: "(305) 378-3535",
      taxLabel: "Tax",
      taxRate: 7.0,
      register: "Order #2187",
      footerMessage: "Have It Your Way!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Whopper Meal (M)", quantity: 1, price: 9.49 },
        { id: id(), name: "8pc Chicken Fries", quantity: 1, price: 3.49 },
        { id: id(), name: "Med Frozen Coke", quantity: 1, price: 2.99 },
      ],
    },
  },
  {
    slug: "wendy-s",
    name: "Wendy's Receipt",
    shortName: "Wendy's",
    icon: "🍔",
    seoTitle: "Free Wendy's Receipt Generator — Wendy's Receipt Maker",
    seoDescription:
      "Create a Wendy's receipt online. Add burgers, nuggets, fries and Frostys, edit the prices, tax and order date, then download a free watermarked PDF or PNG.",
    heading: "Wendy's Receipt Generator",
    intro:
      "Generate a fresh, never-frozen Wendy's receipt. Ideal for tracking what you spend on meals.",
    useCases: [
      "Business travel meal expenses",
      "Replacing lost fast food receipts",
      "Personal accounting and budgeting",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Wendy's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("wendys.com"),
      businessName: "Wendy's",
      addressLine1: "1 Dave Thomas Blvd",
      addressLine2: "Dublin, OH 43017",
      phone: "(614) 764-3100",
      taxLabel: "Tax",
      taxRate: 7.5,
      register: "Order #384",
      footerMessage: "Quality Is Our Recipe.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Dave's Single Combo", quantity: 1, price: 9.19 },
        { id: id(), name: "Jr Bacon Cheeseburger", quantity: 1, price: 2.79 },
        { id: id(), name: "Med Chocolate Frosty", quantity: 1, price: 2.79 },
      ],
    },
  },
  {
    slug: "subway",
    name: "Subway Receipt",
    shortName: "Subway",
    icon: "🥪",
    seoTitle: "Free Subway Receipt Generator — Sandwich Receipt Maker",
    seoDescription:
      "Create a Subway receipt online. Add your subs, drinks and cookies, edit the items, prices, tax and order date, then download a free watermarked PDF or PNG.",
    heading: "Subway Receipt Generator",
    intro:
      "Build a Subway sandwich receipt with sub types, sizes, and extras. Great for tracking what you spend on lunch.",
    useCases: [
      "Records of your own purchases",
      "Replacing a lost Subway receipt",
      "Corporate catering documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Subway receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("subway.com"),
      businessName: "Subway",
      addressLine1: "325 Bic Dr",
      addressLine2: "Milford, CT 06461",
      phone: "(203) 877-4281",
      taxLabel: "Tax",
      taxRate: 6.35,
      register: "Order #756",
      footerMessage: "Eat Fresh!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Footlong Italian BMT", quantity: 1, price: 8.99 },
        { id: id(), name: "6\" Turkey Sub", quantity: 1, price: 6.49 },
        { id: id(), name: "Choc Chip Cookie", quantity: 2, price: 1.29 },
        { id: id(), name: "Fountain Drink 21oz", quantity: 1, price: 2.19 },
      ],
    },
  },
  {
    slug: "taco-bell",
    name: "Taco Bell Receipt",
    shortName: "Taco Bell",
    icon: "🌮",
    seoTitle: "Free Taco Bell Receipt Generator — Taco Bell Receipt Maker",
    seoDescription:
      "Create a Taco Bell receipt online. Add burritos, tacos and combos, edit the items, prices, tax and order date, then download a free watermarked PDF or PNG.",
    heading: "Taco Bell Receipt Generator",
    intro:
      "Generate a Taco Bell receipt with your favorite Mexican-inspired items. Perfect for on-the-go meal expense tracking.",
    useCases: [
      "Travel meal expense records",
      "Keep your own record of Taco Bell purchases",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Taco Bell receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("tacobell.com"),
      businessName: "Taco Bell",
      addressLine1: "1 Glen Bell Way",
      addressLine2: "Irvine, CA 92618",
      phone: "(949) 863-4500",
      taxLabel: "Tax",
      taxRate: 7.75,
      register: "Order #613",
      footerMessage: "Live Más!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Crunchwrap Supreme", quantity: 1, price: 5.49 },
        { id: id(), name: "Cheesy Gordita Crunch", quantity: 1, price: 4.99 },
        { id: id(), name: "Crunchy Taco", quantity: 2, price: 1.89 },
        { id: id(), name: "Lg Baja Blast", quantity: 1, price: 2.69 },
      ],
    },
  },
  {
    slug: "kfc",
    name: "KFC Receipt",
    shortName: "KFC",
    icon: "🍗",
    seoTitle: "Free KFC Receipt Generator — KFC Receipt Maker",
    seoDescription:
      "Create a KFC receipt online. Add chicken meals, sides and drinks, edit the items, prices, tax and order date, then download a free watermarked PDF or PNG.",
    heading: "KFC Receipt Generator",
    intro:
      "Generate a finger-lickin' good KFC receipt. Include chicken buckets, sides, and drinks for your own meal records.",
    useCases: [
      "Records of your own purchases",
      "Lost KFC receipt replacement",
      "Personal food budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the KFC receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("kfc.com"),
      businessName: "KFC",
      addressLine1: "1441 Gardiner Ln",
      addressLine2: "Louisville, KY 40213",
      phone: "(502) 874-8100",
      taxLabel: "Tax",
      taxRate: 6.0,
      register: "Order #829",
      footerMessage: "It's Finger Lickin' Good!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "8pc Bucket Meal", quantity: 1, price: 24.99 },
        { id: id(), name: "Lg Mashed Potatoes", quantity: 1, price: 4.99 },
        { id: id(), name: "Lg Coleslaw", quantity: 1, price: 4.49 },
        { id: id(), name: "4 Biscuits", quantity: 1, price: 4.29 },
      ],
    },
  },
  {
    slug: "chipotle",
    name: "Chipotle Receipt",
    shortName: "Chipotle",
    icon: "🌯",
    seoTitle: "Free Chipotle Receipt Generator — Chipotle Receipt Maker",
    seoDescription:
      `Chipotle receipt generator: add burritos, bowls, chips and guac, edit prices, tax and date. Free watermarked PDF; Pro from ${PASS_FROM} a week removes the watermark.`,
    heading: "Chipotle Receipt Generator",
    intro:
      `Build a Chipotle Mexican Grill receipt with burritos, bowls and sides in the Chipotle receipt generator. Building it and a watermarked download are free; a clean download needs Pro from ${PASS_FROM} a week.`,
    useCases: [
      "Records of your own purchases",
      "Track Chipotle spending in a budget",
      "Catering expense records",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Chipotle receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("chipotle.com"),
      businessName: "Chipotle Mexican Grill",
      addressLine1: "610 Newport Center Dr",
      addressLine2: "Newport Beach, CA 92660",
      phone: "(949) 524-4000",
      taxLabel: "Tax",
      taxRate: 7.75,
      register: "Order #1847",
      footerMessage: "Real Ingredients. Real Purpose.",
      topBarcode: true,
      showCardAuth: true,
      policyText:
        "Please retain this receipt as proof of purchase. All food items are prepared fresh; returns and exchanges are not accepted. For any concerns, please contact us. We hope you enjoyed your meal!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Chicken Burrito Bowl", quantity: 1, price: 10.75 },
        { id: id(), name: "Steak Burrito", quantity: 1, price: 11.50 },
        { id: id(), name: "Guacamole", quantity: 1, price: 3.25 },
        { id: id(), name: "Lg Fountain Drink", quantity: 2, price: 2.95 },
      ],
    },
  },
  {
    slug: "domino-s-pizza",
    name: "Domino's Pizza Receipt",
    shortName: "Domino's Pizza",
    icon: "🍕",
    seoTitle:
      "Free Domino's Pizza Receipt Generator — Domino's Receipt Maker",
    seoDescription:
      "Create a Domino's Pizza receipt online. Add pizzas, wings and breadsticks, edit the prices, tax and order date, then download a free watermarked PDF or PNG.",
    heading: "Domino's Pizza Receipt Generator",
    intro:
      "Generate a Domino's delivery or carryout receipt. Include pizzas, wings, sides, and delivery fee for expense tracking.",
    useCases: [
      "Records of your own purchases",
      "A sample delivery receipt for a mockup or demo",
      "Event catering documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Domino's Pizza receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("dominos.com"),
      businessName: "Domino's Pizza",
      addressLine1: "30 Frank Lloyd Wright Dr",
      addressLine2: "Ann Arbor, MI 48105",
      phone: "(734) 930-3030",
      taxLabel: "Tax",
      taxRate: 6.0,
      register: "Order #30MIN",
      footerMessage: "Oh Yes We Did!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Lg Hand Tossed Pepperoni", quantity: 1, price: 14.99 },
        { id: id(), name: "8pc Boneless Wings BBQ", quantity: 1, price: 8.99 },
        { id: id(), name: "Stuffed Cheesy Bread", quantity: 1, price: 6.99 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 4.99 },
      ],
    },
  },
  {
    slug: "pizza-hut",
    name: "Pizza Hut Receipt",
    shortName: "Pizza Hut",
    icon: "🍕",
    seoTitle: "Free Pizza Hut Receipt Generator — Pizza Hut Receipt Maker",
    seoDescription:
      "Create a Pizza Hut receipt online in seconds. Add pizzas, pasta, wings and sides, edit the prices, tax and order date, then download a watermarked PDF free.",
    heading: "Pizza Hut Receipt Generator",
    intro:
      "Generate a Pizza Hut dine-in, delivery, or carryout receipt with pan pizzas, wings, and desserts.",
    useCases: [
      "Group dinner expense tracking",
      "Keep your own record of Pizza Hut purchases",
      "Office party food documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Pizza Hut receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("pizzahut.com"),
      businessName: "Pizza Hut",
      addressLine1: "7100 Corporate Dr",
      addressLine2: "Plano, TX 75024",
      phone: "(972) 338-7700",
      taxLabel: "Tax",
      taxRate: 8.25,
      register: "Order #PHT452",
      footerMessage: "No One OutPizzas the Hut.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Lg Original Pan Pepperoni", quantity: 1, price: 15.99 },
        { id: id(), name: "Lg Meat Lover's Stuffed", quantity: 1, price: 18.99 },
        { id: id(), name: "Breadsticks 5pc", quantity: 1, price: 5.99 },
      ],
    },
  },
  {
    slug: "papa-john-s",
    name: "Papa John's Receipt",
    shortName: "Papa John's",
    icon: "🍕",
    seoTitle:
      "Free Papa John's Receipt Generator — Papa John's Receipt Maker",
    seoDescription:
      "Create a Papa John's receipt online. Add pizzas, sides and dipping sauces, edit the prices, tax and order date, then download a free watermarked PDF or PNG.",
    heading: "Papa John's Receipt Generator",
    intro:
      "Make a Papa John's pizza delivery receipt with your favorite pies, sides, and garlic dipping sauce.",
    useCases: [
      "Office pizza order documentation",
      "Lost delivery receipt replacement",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Papa John's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("papajohns.com"),
      businessName: "Papa John's",
      addressLine1: "2002 Papa Johns Blvd",
      addressLine2: "Louisville, KY 40299",
      phone: "(502) 261-7272",
      taxLabel: "Tax",
      taxRate: 6.0,
      register: "Order #PJ1984",
      footerMessage: "Better Ingredients. Better Pizza.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "XL NY Style Cheese", quantity: 1, price: 16.99 },
        { id: id(), name: "Lg Pepperoni Classic", quantity: 1, price: 14.99 },
        { id: id(), name: "Garlic Knots 8pc", quantity: 1, price: 5.99 },
        { id: id(), name: "Special Garlic Sauce 2x", quantity: 1, price: 1.50 },
      ],
    },
  },
  {
    slug: "chick-fil-a",
    name: "Chick-fil-A Receipt",
    shortName: "Chick-fil-A",
    icon: "🐔",
    seoTitle:
      "Free Chick-fil-A Receipt Generator — Chick-fil-A Receipt Maker",
    seoDescription:
      "Create a Chick-fil-A receipt online. Add sandwiches, nuggets and lemonade, edit the prices, tax and order date, then download a free watermarked PDF or PNG.",
    heading: "Chick-fil-A Receipt Generator",
    intro:
      "Generate a Chick-fil-A receipt featuring their signature chicken sandwiches, nuggets, and classic lemonade.",
    useCases: [
      "Team lunch expense records",
      "Track Chick-fil-A spending in a budget",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Chick-fil-A receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("chick-fil-a.com"),
      businessName: "Chick-fil-A",
      addressLine1: "5200 Buffington Rd",
      addressLine2: "Atlanta, GA 30349",
      phone: "(404) 765-8038",
      taxLabel: "Tax",
      taxRate: 8.9,
      register: "Order #A217",
      cashier: "Operator: Jordan",
      footerMessage: "It's my pleasure to serve you!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "CFA Deluxe Sandwich Meal", quantity: 1, price: 10.55 },
        { id: id(), name: "12ct Nuggets", quantity: 1, price: 6.59 },
        { id: id(), name: "Lg Chick-fil-A Lemonade", quantity: 1, price: 3.09 },
        { id: id(), name: "CFA Sauce", quantity: 2, price: 0.0 },
      ],
    },
  },
  {
    slug: "panera-bread",
    name: "Panera Bread Receipt",
    shortName: "Panera Bread",
    icon: "🥖",
    seoTitle:
      "Free Panera Bread Receipt Generator — Panera Bread Receipt Maker",
    seoDescription:
      "Create a Panera Bread receipt online. Add soups, salads and sandwiches, edit the prices, tax and order date, then download a free watermarked PDF or PNG.",
    heading: "Panera Bread Receipt Generator",
    intro:
      "Generate a Panera Bread receipt with soups, salads, sandwiches, and bakery items. Perfect for tracking what you spend on lunch.",
    useCases: [
      "Client meeting lunch receipts",
      "Replace lost Panera receipt",
      "Corporate catering tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Panera Bread receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("panerabread.com"),
      businessName: "Panera Bread",
      addressLine1: "3630 S Geyer Rd",
      addressLine2: "Sunset Hills, MO 63127",
      phone: "(314) 984-1000",
      taxLabel: "Tax",
      taxRate: 9.238,
      register: "Order #PB412",
      cashier: "Cashier: Emily",
      footerMessage: "Live Consciously. Eat Deliciously.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "You Pick 2: Soup & Half", quantity: 1, price: 11.79 },
        { id: id(), name: "Broccoli Cheddar Soup Bread Bowl", quantity: 1, price: 10.49 },
        { id: id(), name: "Kitchen Sink Cookie", quantity: 1, price: 3.29 },
        { id: id(), name: "Lg Iced Green Tea", quantity: 1, price: 3.39 },
      ],
    },
  },
  {
    slug: "five-guys",
    name: "Five Guys Receipt",
    shortName: "Five Guys",
    icon: "🍔",
    seoTitle: "Free Five Guys Receipt Generator — Five Guys Receipt Maker",
    seoDescription:
      "Create a Five Guys receipt online. Add your burgers, fries and shakes, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Five Guys Receipt Generator",
    intro:
      "Generate a Five Guys receipt with customizable burgers, Cajun fries, and milkshakes. Great for tracking what you spend on meals.",
    useCases: [
      "Records of your own purchases",
      "A sample Five Guys receipt for a mockup or demo",
      "Personal budgeting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Five Guys receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("fiveguys.com"),
      businessName: "Five Guys",
      addressLine1: "10718 Richmond Hwy",
      addressLine2: "Lorton, VA 22079",
      phone: "(703) 339-9500",
      taxLabel: "Tax",
      taxRate: 6.0,
      register: "Order #FG517",
      footerMessage: "Fresh burgers, fresh fries. Period.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Cheeseburger All The Way", quantity: 1, price: 11.69 },
        { id: id(), name: "Cajun Fries (Regular)", quantity: 1, price: 5.79 },
        { id: id(), name: "Vanilla Milkshake", quantity: 1, price: 6.99 },
      ],
    },
  },
  {
    slug: "in-n-out-burger",
    name: "In-N-Out Burger Receipt",
    shortName: "In-N-Out Burger",
    icon: "🍔",
    seoTitle:
      "Free In-N-Out Burger Receipt Generator — In-N-Out Receipt Maker",
    seoDescription:
      "Create an In-N-Out Burger receipt online. Add Double-Doubles, Animal Fries and shakes, edit the prices and tax, then download a free watermarked PDF or PNG.",
    heading: "In-N-Out Burger Receipt Generator",
    intro:
      "Generate an In-N-Out Burger receipt with your favorite secret-menu items. Quality you can taste.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of In-N-Out purchases",
      "Personal meal budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the In-N-Out Burger receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("in-n-out.com"),
      businessName: "In-N-Out Burger",
      addressLine1: "13502 Hamburger Ln",
      addressLine2: "Baldwin Park, CA 91706",
      phone: "(800) 786-1000",
      taxLabel: "Tax",
      taxRate: 9.5,
      register: "Order #51",
      footerMessage: "Quality You Can Taste.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Double-Double", quantity: 1, price: 5.90 },
        { id: id(), name: "Cheeseburger", quantity: 1, price: 3.95 },
        { id: id(), name: "French Fries", quantity: 2, price: 2.40 },
        { id: id(), name: "Lg Chocolate Shake", quantity: 1, price: 3.60 },
      ],
    },
  },
  {
    slug: "shake-shack",
    name: "Shake Shack Receipt",
    shortName: "Shake Shack",
    icon: "🍔",
    seoTitle:
      "Free Shake Shack Receipt Generator — Shake Shack Receipt Maker",
    seoDescription:
      "Create a Shake Shack receipt online in seconds. Add ShackBurgers, crinkle fries and shakes, edit the prices and tax, then get a free watermarked PDF or PNG.",
    heading: "Shake Shack Receipt Generator",
    intro:
      "Generate a Shake Shack receipt with ShackBurgers, crinkle-cut fries, and frozen custard concretes.",
    useCases: [
      "NYC dining expense records",
      "Track Shake Shack spending in a budget",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Shake Shack receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("shakeshack.com"),
      businessName: "Shake Shack",
      addressLine1: "Madison Square Park",
      addressLine2: "New York, NY 10010",
      phone: "(212) 889-6600",
      taxLabel: "Tax",
      taxRate: 8.875,
      register: "Order #SS347",
      footerMessage: "Stand For Something Good.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "ShackBurger", quantity: 1, price: 7.79 },
        { id: id(), name: "SmokeShack", quantity: 1, price: 9.49 },
        { id: id(), name: "Crinkle Cut Fries", quantity: 1, price: 4.29 },
        { id: id(), name: "Black & White Shake", quantity: 1, price: 6.29 },
      ],
    },
  },
  {
    slug: "panda-express",
    name: "Panda Express Receipt",
    shortName: "Panda Express",
    icon: "🥡",
    seoTitle:
      "Free Panda Express Receipt Generator — Panda Express Receipt Maker",
    seoDescription:
      "Create a Panda Express receipt online. Add plates, bowls and entrees, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Panda Express Receipt Generator",
    intro:
      "Generate a Panda Express receipt with plates, bowls, and A La Carte items. Great for quick-service meal documentation.",
    useCases: [
      "Records of your own purchases",
      "A sample Panda Express receipt for a mockup or demo",
      "Personal meal tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Panda Express receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("pandaexpress.com"),
      businessName: "Panda Express",
      addressLine1: "1683 Walnut Grove Ave",
      addressLine2: "Rosemead, CA 91770",
      phone: "(626) 799-9898",
      taxLabel: "Tax",
      taxRate: 9.5,
      register: "Order #PE836",
      footerMessage: "Boldly Crafted. Perfectly Prepared.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Plate (2 Entrees + Side)", quantity: 1, price: 10.90 },
        { id: id(), name: "Orange Chicken (Entree)", quantity: 1, price: 0.0 },
        { id: id(), name: "Beijing Beef (Entree)", quantity: 1, price: 0.0 },
        { id: id(), name: "Chow Mein (Side)", quantity: 1, price: 0.0 },
        { id: id(), name: "Fountain Drink Lg", quantity: 1, price: 2.70 },
      ],
    },
  },
  {
    slug: "sonic-drive-in",
    name: "Sonic Drive-In Receipt",
    shortName: "Sonic Drive-In",
    icon: "🥤",
    seoTitle:
      "Free Sonic Drive-In Receipt Generator — Sonic Receipt Maker",
    seoDescription:
      "Create a Sonic Drive-In receipt online. Add burgers, tots and Slushes, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Sonic Drive-In Receipt Generator",
    intro:
      "Generate a Sonic Drive-In receipt with SuperSONIC burgers, tots, and classic Slushes. Perfect for carhop-style meal tracking.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Sonic purchases",
      "Personal food budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sonic Drive-In receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("sonicdrivein.com"),
      businessName: "Sonic Drive-In",
      addressLine1: "300 Johnny Bench Dr",
      addressLine2: "Oklahoma City, OK 73104",
      phone: "(405) 225-5000",
      taxLabel: "Tax",
      taxRate: 8.625,
      register: "Stall #7",
      footerMessage: "This Is How We SONIC.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "SuperSONIC Dbl Bacon Cheeseburger", quantity: 1, price: 7.99 },
        { id: id(), name: "Lg Tater Tots", quantity: 1, price: 3.49 },
        { id: id(), name: "Rt 44 Cherry Limeade", quantity: 1, price: 3.99 },
      ],
    },
  },
  {
    slug: "dairy-queen",
    name: "Dairy Queen Receipt",
    shortName: "Dairy Queen",
    icon: "🍦",
    seoTitle:
      "Free Dairy Queen Receipt Generator — Dairy Queen Receipt Maker",
    seoDescription:
      "Create a Dairy Queen receipt online. Add Blizzards, baskets and cakes, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Dairy Queen Receipt Generator",
    intro:
      "Generate a DQ receipt with Blizzard treats, burger baskets, and classic dipped cones. Happy tastes good.",
    useCases: [
      "Records of your own purchases",
      "Track DQ spending in a budget",
      "Party cake order documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Dairy Queen receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("dairyqueen.com"),
      businessName: "Dairy Queen",
      addressLine1: "7505 Metro Blvd",
      addressLine2: "Bloomington, MN 55439",
      phone: "(952) 830-0200",
      taxLabel: "Tax",
      taxRate: 7.875,
      register: "Order #DQ221",
      footerMessage: "Happy Tastes Good.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Md Oreo Blizzard Treat", quantity: 1, price: 5.79 },
        { id: id(), name: "1/3 lb Flameburger Basket", quantity: 1, price: 8.99 },
        { id: id(), name: "Sm Dipped Cone", quantity: 1, price: 3.49 },
      ],
    },
  },
  {
    slug: "arby-s",
    name: "Arby's Receipt",
    shortName: "Arby's",
    icon: "🥪",
    seoTitle: "Free Arby's Receipt Generator — Arby's Receipt Maker",
    seoDescription:
      "Create an Arby's receipt online. Add roast beef sandwiches, curly fries and shakes, edit the prices and tax, then download a free watermarked PDF or PNG.",
    heading: "Arby's Receipt Generator",
    intro:
      "Generate an Arby's receipt with roast beef sandwiches, curly fries, and Jamocha shakes. We have the meats!",
    useCases: [
      "Travel lunch expense records",
      "A sample Arby's receipt for a mockup or demo",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Arby's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("arbys.com"),
      businessName: "Arby's",
      addressLine1: "1155 Perimeter Ctr W",
      addressLine2: "Atlanta, GA 30338",
      phone: "(678) 514-4100",
      taxLabel: "Tax",
      taxRate: 8.9,
      register: "Order #AB142",
      footerMessage: "We Have The Meats!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Classic Roast Beef (M)", quantity: 1, price: 5.99 },
        { id: id(), name: "Beef 'n Cheddar (M)", quantity: 1, price: 6.49 },
        { id: id(), name: "Lg Curly Fries", quantity: 1, price: 3.79 },
        { id: id(), name: "Md Jamocha Shake", quantity: 1, price: 4.49 },
      ],
    },
  },
  {
    slug: "jack-in-the-box",
    name: "Jack in the Box Receipt",
    shortName: "Jack in the Box",
    icon: "🍔",
    seoTitle:
      "Free Jack in the Box Receipt Generator — Jack in the Box Receipt Maker",
    seoDescription:
      "Create a Jack in the Box receipt online. Add tacos, burgers and curly fries, edit the prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Jack in the Box Receipt Generator",
    intro:
      "Generate a Jack in the Box receipt with their famous tacos, Jumbo Jack burgers, and late-night combos.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of JITB purchases",
      "Food budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Jack in the Box receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("jackinthebox.com"),
      businessName: "Jack in the Box",
      addressLine1: "9357 Spectrum Center Blvd",
      addressLine2: "San Diego, CA 92123",
      phone: "(858) 571-2121",
      taxLabel: "Tax",
      taxRate: 7.75,
      register: "Order #JB728",
      footerMessage: "We Don't Make It Til You Order It.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Jumbo Jack w/ Cheese", quantity: 1, price: 6.19 },
        { id: id(), name: "2 Tacos", quantity: 1, price: 2.39 },
        { id: id(), name: "Lg Seasoned Curly Fries", quantity: 1, price: 3.79 },
        { id: id(), name: "Lg Oreo Shake", quantity: 1, price: 5.09 },
      ],
    },
  },
  {
    slug: "popeyes",
    name: "Popeyes Receipt",
    shortName: "Popeyes",
    icon: "🍗",
    seoTitle: "Free Popeyes Receipt Generator — Popeyes Receipt Maker",
    seoDescription:
      "Create a Popeyes receipt online. Add chicken sandwiches, tenders and biscuits, edit the prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Popeyes Receipt Generator",
    intro:
      "Generate a Popeyes Louisiana Kitchen receipt with spicy chicken, tenders, and buttermilk biscuits.",
    useCases: [
      "Records of your own purchases",
      "Track Popeyes spending in a budget",
      "Personal budgeting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Popeyes receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("popeyes.com"),
      businessName: "Popeyes Louisiana Kitchen",
      addressLine1: "400 Poydras St",
      addressLine2: "New Orleans, LA 70130",
      phone: "(504) 875-5911",
      taxLabel: "Tax",
      taxRate: 9.45,
      register: "Order #POP915",
      footerMessage: "Love That Chicken From Popeyes!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Classic Chicken Sandwich", quantity: 1, price: 5.99 },
        { id: id(), name: "5pc Handcrafted Tenders", quantity: 1, price: 9.99 },
        { id: id(), name: "Red Beans & Rice (Reg)", quantity: 1, price: 3.49 },
        { id: id(), name: "Biscuit", quantity: 2, price: 1.29 },
      ],
    },
  },
  {
    slug: "dunkin",
    name: "Dunkin' Receipt",
    shortName: "Dunkin'",
    icon: "🍩",
    seoTitle: "Free Dunkin' Receipt Generator — Dunkin' Receipt Maker",
    seoDescription:
      "Create a Dunkin' receipt online. Add coffee, donuts and breakfast sandwiches, edit the prices and tax, then download a free watermarked PDF or PNG receipt.",
    heading: "Dunkin' Receipt Generator",
    intro:
      "Make a Dunkin' receipt with iced coffees, donuts, and bagel sandwiches. America runs on Dunkin'.",
    useCases: [
      "Records of your own purchases",
      "A sample Dunkin' receipt for a mockup or demo",
      "Petty cash documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Dunkin' receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("dunkinbrands.com"),
      businessName: "Dunkin'",
      addressLine1: "130 Royall St",
      addressLine2: "Canton, MA 02021",
      phone: "(781) 737-3000",
      taxLabel: "Tax",
      taxRate: 6.25,
      register: "Order #DD472",
      cashier: "Crew: Mike",
      footerMessage: "America Runs on Dunkin'.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Lg Iced Coffee w/ Cream", quantity: 1, price: 4.09 },
        { id: id(), name: "Bacon Egg Cheese Croissant", quantity: 1, price: 5.59 },
        { id: id(), name: "Glazed Donut", quantity: 2, price: 1.69 },
        { id: id(), name: "Md Hot Latte", quantity: 1, price: 4.59 },
      ],
    },
  },
  {
    slug: "tim-hortons",
    name: "Tim Hortons Receipt",
    shortName: "Tim Hortons",
    icon: "☕",
    seoTitle:
      "Free Tim Hortons Receipt Generator — Tim Hortons Receipt Maker",
    seoDescription:
      "Create a Tim Hortons receipt online. Add coffee, Timbits and sandwiches, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Tim Hortons Receipt Generator",
    intro:
      "Make a Tim Hortons receipt with double-doubles, Timbits, and breakfast wraps. Always fresh.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Tim Hortons purchases",
      "Office coffee run documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Tim Hortons receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("timhortons.com"),
      businessName: "Tim Hortons",
      addressLine1: "130 King St W",
      addressLine2: "Toronto, ON M5X 1E4",
      phone: "(416) 847-8488",
      taxLabel: "HST",
      taxRate: 13.0,
      register: "Order #TH612",
      footerMessage: "Always Fresh. Always Tim Hortons.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Lg Double-Double", quantity: 1, price: 2.40 },
        { id: id(), name: "20pc Timbits Assorted", quantity: 1, price: 6.19 },
        { id: id(), name: "BLT Wrap", quantity: 1, price: 5.29 },
        { id: id(), name: "Sm Iced Capp", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "peet-s-coffee",
    name: "Peet's Coffee Receipt",
    shortName: "Peet's Coffee",
    icon: "☕",
    seoTitle:
      "Free Peet's Coffee Receipt Generator — Peet's Coffee Receipt Maker",
    seoDescription:
      "Create a Peet's Coffee receipt online in seconds. Add lattes, cold brews and pastries, edit the prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "Peet's Coffee Receipt Generator",
    intro:
      "Make a Peet's Coffee receipt with hand-roasted espresso drinks and pastries. Coffee of exceptional quality.",
    useCases: [
      "Records of your own purchases",
      "Track Peet's spending in a budget",
      "Personal caffeine budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Peet's Coffee receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("peets.com"),
      businessName: "Peet's Coffee",
      addressLine1: "1400 Park Ave",
      addressLine2: "Emeryville, CA 94608",
      phone: "(510) 594-2100",
      taxLabel: "Tax",
      taxRate: 10.25,
      cashier: "Barista: Alex",
      footerMessage: "The Original Craft Coffee.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Lg Caffe Latte", quantity: 1, price: 5.85 },
        { id: id(), name: "Md Cold Brew", quantity: 1, price: 4.75 },
        { id: id(), name: "Almond Croissant", quantity: 1, price: 4.15 },
      ],
    },
  },
  {
    slug: "caribou-coffee",
    name: "Caribou Coffee Receipt",
    shortName: "Caribou Coffee",
    icon: "☕",
    seoTitle:
      "Free Caribou Coffee Receipt Generator — Caribou Coffee Receipt Maker",
    seoDescription:
      "Create a Caribou Coffee receipt online. Add crafted drinks and bakery items, edit the prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Caribou Coffee Receipt Generator",
    intro:
      "Make a Caribou Coffee receipt with handcrafted drinks and fresh bakery goods. Life is short, stay awake for it.",
    useCases: [
      "Midwest travel coffee receipts",
      "A sample Caribou receipt for a mockup or demo",
      "Team coffee run tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Caribou Coffee receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("cariboucoffee.com"),
      businessName: "Caribou Coffee",
      addressLine1: "3900 Lakebreeze Ave N",
      addressLine2: "Brooklyn Center, MN 55429",
      phone: "(763) 592-8500",
      taxLabel: "Tax",
      taxRate: 7.875,
      cashier: "Barista: Taylor",
      footerMessage: "Life is short. Stay awake for it.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Lg Crafted Press", quantity: 1, price: 4.79 },
        { id: id(), name: "Md Caramel High Rise", quantity: 1, price: 5.59 },
        { id: id(), name: "Cinnamon Roll", quantity: 1, price: 3.99 },
      ],
    },
  },
  {
    slug: "dutch-bros",
    name: "Dutch Bros Receipt",
    shortName: "Dutch Bros",
    icon: "☕",
    seoTitle:
      "Free Dutch Bros Receipt Generator — Dutch Bros Receipt Maker",
    seoDescription:
      "Create a Dutch Bros receipt online. Add Rebels, Frosts and cold brews, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Dutch Bros Receipt Generator",
    intro:
      "Make a Dutch Bros receipt with Rebels, Frosts, and their signature coffee drinks. Drink one for me!",
    useCases: [
      "Drive-thru coffee expense tracking",
      "Keep your own record of Dutch Bros purchases",
      "Personal drink budget",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Dutch Bros receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("dutchbros.com"),
      businessName: "Dutch Bros Coffee",
      addressLine1: "1135 NE Dustin Ct",
      addressLine2: "Grants Pass, OR 97526",
      phone: "(541) 955-4700",
      taxLabel: "Tax",
      taxRate: 0,
      register: "Window #2",
      footerMessage: "Drink One For Me!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Lg Caramelizer Breve", quantity: 1, price: 6.50 },
        { id: id(), name: "Md Peach Rebel Energy", quantity: 1, price: 5.25 },
        { id: id(), name: "Lg Vanilla Frost", quantity: 1, price: 5.75 },
      ],
    },
  },
  {
    slug: "jamba-juice",
    name: "Jamba Juice Receipt",
    shortName: "Jamba Juice",
    icon: "🥤",
    seoTitle:
      "Free Jamba Juice Receipt Generator — Jamba Juice Receipt Maker",
    seoDescription:
      "Create a Jamba Juice receipt online. Add smoothies, bowls and boosts, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Jamba Juice Receipt Generator",
    intro:
      "Make a Jamba receipt with smoothies, acai bowls, and energy boosts. Blend in the good.",
    useCases: [
      "Records of your own purchases",
      "Track Jamba spending in a budget",
      "Wellness expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Jamba Juice receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("jamba.com"),
      businessName: "Jamba",
      addressLine1: "1700 Montgomery St",
      addressLine2: "San Francisco, CA 94111",
      phone: "(415) 865-3300",
      taxLabel: "Tax",
      taxRate: 8.625,
      register: "Order #J429",
      footerMessage: "Blend In The Good.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Md Caribbean Passion", quantity: 1, price: 7.69 },
        { id: id(), name: "Sm Acai Primo Bowl", quantity: 1, price: 9.49 },
        { id: id(), name: "Energy Boost Add-On", quantity: 1, price: 0.75 },
      ],
    },
  },
  {
    slug: "boba-guys",
    name: "Boba Guys Receipt",
    shortName: "Boba Guys",
    icon: "🧋",
    seoTitle: "Free Boba Guys Receipt Generator — Boba Guys Receipt Maker",
    seoDescription:
      "Create a Boba Guys receipt online. Add milk teas, matcha and toppings, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Boba Guys Receipt Generator",
    intro:
      "Make a Boba Guys receipt with premium milk teas, matcha drinks, and organic tapioca. Real ingredients, real boba.",
    useCases: [
      "Records of your own purchases",
      "A sample bubble tea receipt for a mockup or demo",
      "Personal treat tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Boba Guys receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("bobaguys.com"),
      businessName: "Boba Guys",
      addressLine1: "429 Stockton St",
      addressLine2: "San Francisco, CA 94108",
      phone: "(415) 967-2622",
      taxLabel: "Tax",
      taxRate: 8.625,
      cashier: "Crew: Jamie",
      footerMessage: "Real Ingredients. Real Boba.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Classic Milk Tea w/ Boba", quantity: 1, price: 6.50 },
        { id: id(), name: "Matcha Latte w/ Oat Milk", quantity: 1, price: 7.25 },
        { id: id(), name: "Extra Boba Topping", quantity: 1, price: 0.75 },
      ],
    },
  },
  {
    slug: "costco",
    name: "Costco Receipt",
    shortName: "Costco",
    icon: "🛒",
    seoTitle: "Free Costco Receipt Generator — Costco Receipt Maker",
    seoDescription:
      "Create a Costco receipt online in seconds. Add bulk items, electronics and groceries, edit the prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "Costco Receipt Generator",
    intro:
      "Create a Costco Wholesale receipt with bulk-buy items, electronics, and groceries. Member pricing included.",
    useCases: [
      "Business bulk purchase documentation",
      "Keep your own record of Costco purchases",
      "Household expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Costco receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("costco.com"),
      businessName: "Costco Wholesale",
      addressLine1: "999 Lake Dr",
      addressLine2: "Issaquah, WA 98027",
      phone: "(425) 313-8100",
      taxLabel: "Tax",
      taxRate: 10.1,
      register: "REG #12",
      cashier: "Cashier: 482",
      footerMessage: "Member #*****7821 — Thank You!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "KS Paper Towels 12pk", quantity: 1, price: 19.99 },
        { id: id(), name: "KS Rotisserie Chicken", quantity: 1, price: 4.99 },
        { id: id(), name: "Organic Strawberries 2lb", quantity: 1, price: 7.99 },
        { id: id(), name: "KS Water 40pk", quantity: 2, price: 4.49 },
      ],
    },
  },
  {
    slug: "sam-s-club",
    name: "Sam's Club Receipt",
    shortName: "Sam's Club",
    icon: "🛒",
    seoTitle:
      "Free Sam's Club Receipt Generator — Sam's Club Receipt Maker",
    seoDescription:
      "Create a Sam's Club receipt online in seconds. Add warehouse club items and groceries, edit the prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "Sam's Club Receipt Generator",
    intro:
      "Create a Sam's Club warehouse receipt with bulk groceries, office supplies, and electronics.",
    useCases: [
      "Records of your own purchases",
      "Track Sam's Club spending in a budget",
      "Small business inventory tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sam's Club receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("samsclub.com"),
      businessName: "Sam's Club",
      addressLine1: "2101 SE Simple Savings Dr",
      addressLine2: "Bentonville, AR 72712",
      phone: "(479) 277-0004",
      taxLabel: "Tax",
      taxRate: 9.75,
      register: "REG #08",
      cashier: "Cashier: 317",
      footerMessage: "Member #*****3492 — Savings Made Simple.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "MM Copy Paper 10-Ream Case", quantity: 1, price: 39.98 },
        { id: id(), name: "MM Trash Bags 200ct", quantity: 1, price: 18.98 },
        { id: id(), name: "Fresh Bakery Croissants 12pk", quantity: 1, price: 7.98 },
      ],
    },
  },
  {
    slug: "whole-foods",
    name: "Whole Foods Receipt",
    shortName: "Whole Foods",
    icon: "🥗",
    seoTitle:
      "Free Whole Foods Receipt Generator — Whole Foods Receipt Maker",
    seoDescription:
      "Create a Whole Foods Market receipt online. Add organic produce, groceries and prepared foods, edit prices and tax, then download a watermarked PDF free.",
    heading: "Whole Foods Receipt Generator",
    intro:
      "Create a Whole Foods Market receipt with organic produce, 365 brand items, and specialty groceries.",
    useCases: [
      "Records of your own purchases",
      "A sample Whole Foods receipt for a mockup or demo",
      "Health-focused budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Whole Foods receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("wholefoodsmarket.com"),
      businessName: "Whole Foods Market",
      addressLine1: "550 Bowie St",
      addressLine2: "Austin, TX 78703",
      phone: "(512) 542-2200",
      taxLabel: "Tax",
      taxRate: 8.25,
      register: "REG #04",
      cashier: "Team Member: Pat",
      footerMessage: "Prime Member Savings Applied!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Org Avocados 4ct", quantity: 1, price: 5.99 },
        { id: id(), name: "365 Almond Milk 64oz", quantity: 1, price: 3.49 },
        { id: id(), name: "Wild Caught Salmon (lb)", quantity: 1.2, price: 12.99 },
        { id: id(), name: "Org Baby Spinach 5oz", quantity: 2, price: 3.99 },
      ],
    },
  },
  {
    slug: "trader-joe-s",
    name: "Trader Joe's Receipt",
    shortName: "Trader Joe's",
    icon: "🛍️",
    seoTitle:
      "Free Trader Joe's Receipt Generator — Trader Joe's Receipt Maker",
    seoDescription:
      "Create a Trader Joe's receipt online. Add TJ's favorites, frozen meals and snacks, edit the prices and tax, then download a free watermarked PDF or PNG.",
    heading: "Trader Joe's Receipt Generator",
    intro:
      "Create a Trader Joe's receipt with their iconic private-label products, frozen favorites, and specialty snacks.",
    useCases: [
      "Grocery run expense records",
      "Keep your own record of TJ's purchases",
      "Personal grocery budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Trader Joe's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("traderjoes.com"),
      businessName: "Trader Joe's",
      addressLine1: "263 S La Brea Ave",
      addressLine2: "Los Angeles, CA 90036",
      phone: "(323) 965-1989",
      taxLabel: "Tax",
      taxRate: 9.5,
      register: "REG #03",
      cashier: "Crew: Sam",
      footerMessage: "Thank You for shopping at Trader Joe's!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "TJ Mandarin Orange Chkn", quantity: 1, price: 4.99 },
        { id: id(), name: "Everything But The Bagel", quantity: 1, price: 2.49 },
        { id: id(), name: "TJ Cauliflower Gnocchi", quantity: 2, price: 3.49 },
        { id: id(), name: "Unexpected Cheddar Cheese", quantity: 1, price: 3.99 },
      ],
    },
  },
  {
    slug: "kroger",
    name: "Kroger Receipt",
    shortName: "Kroger",
    icon: "🛒",
    seoTitle: "Free Kroger Receipt Generator — Kroger Receipt Maker",
    seoDescription:
      "Create a Kroger receipt online in seconds. Add groceries, produce and household items, edit the prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "Kroger Receipt Generator",
    intro:
      "Create a Kroger receipt with weekly grocery items, produce, and household essentials. Fresh for everyone.",
    useCases: [
      "Records of your own purchases",
      "Track Kroger spending in a budget",
      "Household expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Kroger receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("kroger.com"),
      businessName: "Kroger",
      addressLine1: "1014 Vine St",
      addressLine2: "Cincinnati, OH 45202",
      phone: "(513) 762-4000",
      taxLabel: "Tax",
      taxRate: 7.5,
      register: "REG #06",
      cashier: "Your cashier was Beth",
      website: "www.kroger.com",
      footerMessage: "THANK YOU FOR SHOPPING AT KROGER!",
      showCardAuth: true,
      manager: "MGR: Maria Guerra (513) 762-4000",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "KR 2% Milk 1 Gal", quantity: 1, price: 3.49 },
        { id: id(), name: "Simple Truth Org Eggs 12ct", quantity: 1, price: 5.49 },
        { id: id(), name: "Bananas (lb)", quantity: 2.3, price: 0.59 },
        { id: id(), name: "KR Wheat Bread 20oz", quantity: 1, price: 2.49 },
      ],
    },
  },
  {
    slug: "publix",
    name: "Publix Receipt",
    shortName: "Publix",
    icon: "🛒",
    seoTitle: "Free Publix Receipt Generator — Publix Receipt Maker",
    seoDescription:
      "Create a Publix receipt online in seconds. Add groceries, deli items and bakery goods, edit the prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "Publix Receipt Generator",
    intro:
      "Create a Publix receipt with deli subs, bakery items, and weekly BOGO deals. Where shopping is a pleasure.",
    useCases: [
      "Records of your own purchases",
      "A sample Publix receipt for a mockup or demo",
      "Household grocery tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Publix receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("publix.com"),
      // Replaced by lib/brand-specs.ts. These lines once copied a real store and
      // a real cashier's name from a photo, so they hold sample values now.
      businessName: "Publix",
      addressLine1: "100 Sample Pkwy",
      addressLine2: "Lakeland, FL 33801",
      phone: "",
      taxLabel: "Sales Tax",
      taxRate: 6.5,
      register: "",
      cashier: "",
      footerMessage: "",
      fontFamily: "sans",
      headerAlign: "center",
      ruleStyle: "none",
      itemStyle: "lined",
      grandTotalLabel: "Grand Total",
      showCardAuth: true,
      manager: "Store Manager: Matt Reece",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Oreo Thins Golden", quantity: 1, price: 5.0 },
        { id: id(), name: "Oreo Double Stuff", quantity: 1, price: 5.0 },
        { id: id(), name: "Tostitos Rest/Styl", quantity: 1, price: 4.29 },
        { id: id(), name: "Publix IC Premium", quantity: 1, price: 6.0 },
      ],
    },
  },
  {
    slug: "safeway",
    name: "Safeway Receipt",
    shortName: "Safeway",
    icon: "🛒",
    seoTitle: "Free Safeway Receipt Generator — Safeway Receipt Maker",
    seoDescription:
      "Create a Safeway receipt online. Add groceries, produce and Club Card savings, edit the prices and tax, then download a free watermarked PDF or PNG receipt.",
    heading: "Safeway Receipt Generator",
    intro:
      "Create a Safeway receipt with grocery items, Club Card savings, and weekly deals.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Safeway purchases",
      "Household budget documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Safeway receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("safeway.com"),
      businessName: "Safeway",
      addressLine1: "5544 Promenade Pkwy",
      addressLine2: "Denver, CO 80239",
      phone: "(303) 562-9128",
      taxLabel: "Tax",
      taxRate: 6.0,
      register: "",
      cashier: "Your cashier was Dom Y.",
      footerMessage:
        "Sign up for your Club Card — it would have saved you $6.50. Visit safeway.com for weekly specials.",
      fontFamily: "mono",
      headerAlign: "center",
      ruleStyle: "none",
      itemStyle: "lined",
      showCardAuth: true,
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Lays Potato Chips", quantity: 1, price: 4.39 },
        { id: id(), name: "Lays Dip", quantity: 1, price: 5.49 },
        { id: id(), name: "Kro Grnd Coffee", quantity: 1, price: 6.79 },
        { id: id(), name: "Snwfx Mixed Fruit", quantity: 1, price: 15.99 },
      ],
    },
  },
  {
    slug: "aldi",
    name: "Aldi Receipt",
    shortName: "Aldi",
    icon: "🛒",
    seoTitle: "Free Aldi Receipt Generator — Aldi Receipt Maker",
    seoDescription:
      "Create an Aldi receipt online in seconds. Add discount groceries and specialty finds, edit the prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "Aldi Receipt Generator",
    intro:
      "Create an Aldi receipt with their exclusive brands, Aldi Finds, and everyday low-price groceries.",
    useCases: [
      "Records of your own purchases",
      "Track Aldi spending in a budget",
      "Personal savings tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Aldi receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("aldi.us"),
      businessName: "Aldi",
      addressLine1: "1200 N Kirk Rd",
      addressLine2: "Batavia, IL 60510",
      phone: "(630) 879-8100",
      taxLabel: "Tax",
      taxRate: 8.0,
      register: "REG #02",
      footerMessage: "Spend A Little. Get A Lot.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Friendly Farms Milk Gal", quantity: 1, price: 2.95 },
        { id: id(), name: "Clancy's Chips 10oz", quantity: 1, price: 1.95 },
        { id: id(), name: "Simply Nature Org Pasta", quantity: 2, price: 1.39 },
        { id: id(), name: "Baker's Corner Bread 20oz", quantity: 1, price: 1.29 },
      ],
    },
  },
  {
    slug: "walgreens",
    name: "Walgreens Receipt",
    shortName: "Walgreens",
    icon: "💊",
    // 2026-11-25: "template" first. The page ranked 10.2 for "walgreens
    // receipt template" with 0 clicks in 28 days (117 impressions) while the
    // title only said generator and maker. The savings, tax and card lines named
    // below are the ones the researched receipt has (lib/brand-specs.ts).
    seoTitle: "Walgreens Receipt Template & Generator — PDF or PNG",
    seoDescription:
      "Walgreens receipt template with pharmacy items, myWalgreens savings, sales tax and card line. Edit every field, download a watermarked PDF or PNG free.",
    heading: "Walgreens Receipt Template & Generator",
    intro:
      `Make a Walgreens-style pharmacy receipt with health and convenience items, a myWalgreens savings line, sales tax and the card's last four digits. Edit every field with a live preview and download a PDF or PNG; the free download is watermarked and Pro from ${PASS_FROM} a week removes it.`,
    useCases: [
      "Records of your own purchases",
      "A sample pharmacy receipt for a mockup or demo",
      "FSA/HSA documentation",
    ],
    guidance: [
      {
        heading: "Pharmacy items, savings and prescription lines",
        body:
          "Each product is its own line. A sale or coupon price prints as a minus line under the item it reduces, labelled myWalgreens Savings, and the savings are added up near the total. Items your state does not tax can be marked untaxed so the tax line covers only the rest.\n\n" +
          "To record a prescription, add it as its own line with the Rx number and the copay you paid. Keep FSA- or HSA-eligible items on separate lines too, so they are easy to pick out for your own records. For a receipt without the Walgreens layout, start from the {link:/templates/pharmacy|pharmacy receipt template}.",
      },
      {
        heading: "Walgreens receipt template vs a blank pharmacy receipt",
        body:
          "Use this template when the receipt should follow the Walgreens layout: the register, transaction and store line, the savings lines and the card block. For an independent pharmacy or a drugstore with its own name, the pharmacy template starts from a plain layout you fill in yourself.",
      },
    ],
    faqs: [
      {
        question: "Is the Walgreens receipt template free?",
        answer:
          `Building it and a watermarked PDF or PNG are free with no account; Pro from ${PASS_FROM} a week removes the watermark.`,
      },
      {
        question: "Can I change the store number and address?",
        answer:
          "Yes. Every field is editable: the store, register and transaction numbers, the items, the tax rate and the payment.",
      },
      {
        question: "Can I customize the items on the Walgreens receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
      {
        question: "Is this a receipt issued by Walgreens?",
        answer:
          "No. It is an independent template, not affiliated with Walgreens and not a proof of purchase.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("walgreens.com"),
      businessName: "Walgreens",
      addressLine1: "200 Wilmot Rd",
      addressLine2: "Deerfield, IL 60015",
      phone: "(847) 914-2500",
      taxLabel: "Tax",
      taxRate: 10.25,
      register: "REG #01",
      footerMessage: "Balance Rewards Pts Earned: 250",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Advil Pain Reliever 24ct", quantity: 1, price: 7.49 },
        { id: id(), name: "W Brand Vitamin C 1000mg", quantity: 1, price: 9.99 },
        { id: id(), name: "Snickers Bar", quantity: 1, price: 2.19 },
        { id: id(), name: "1L Smartwater", quantity: 1, price: 2.49 },
      ],
    },
  },
  {
    slug: "cvs-pharmacy",
    name: "CVS Pharmacy Receipt",
    shortName: "CVS Pharmacy",
    icon: "💊",
    // 2026-11-16: leads with the exact "cvs receipt generator" this page owns.
    seoTitle: "CVS Receipt Generator — CVS Pharmacy Receipt Maker",
    seoDescription:
      "Create a CVS Pharmacy receipt online. Add health, beauty and everyday items, edit the prices and tax, then download a free watermarked PDF or PNG receipt.",
    heading: "CVS Pharmacy Receipt Generator",
    intro:
      "Create a CVS Pharmacy receipt (infamously long!) with health, beauty, and ExtraBucks Rewards.",
    useCases: [
      "Records of your own pharmacy and drugstore purchases",
      "Household health and beauty budgeting",
      "Sample receipts for app and design mockups",
    ],
    faqs: [
      {
        question: "Can I customize the items on the CVS Pharmacy receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("cvs.com"),
      businessName: "CVS Pharmacy",
      addressLine1: "1 CVS Dr",
      addressLine2: "Woonsocket, RI 02895",
      phone: "(401) 765-1500",
      taxLabel: "Tax",
      taxRate: 7.0,
      register: "REG #03",
      cashier: "Cashier: Janet",
      footerMessage: "ExtraBucks® Earned: $2.00 — Health is everything.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Tylenol Extra Strength 100ct", quantity: 1, price: 11.79 },
        { id: id(), name: "CVS Health Bandages 30ct", quantity: 1, price: 4.29 },
        { id: id(), name: "Cetaphil Cleanser 16oz", quantity: 1, price: 15.49 },
        { id: id(), name: "CVS Gold Emblem Trail Mix", quantity: 1, price: 5.99 },
      ],
    },
  },
  {
    slug: "home-depot",
    name: "Home Depot Receipt",
    shortName: "Home Depot",
    icon: "🛠️",
    // 2026-11-16: "template" added — the page gets "home depot receipt template"
    // at ~7.8 — once the duplicate blog post was folded into it.
    seoTitle: "Home Depot Receipt Generator & Template — Hardware Receipt Maker",
    seoDescription:
      "Create a Home Depot receipt online. Add tools, lumber and hardware supplies, edit the prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Home Depot Receipt Generator & Template",
    intro:
      "Create a Home Depot receipt with tools, building materials, and home improvement supplies.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Home Depot purchases",
      "Home renovation expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Home Depot receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("homedepot.com"),
      businessName: "The Home Depot",
      addressLine1: "2455 Paces Ferry Rd",
      addressLine2: "Atlanta, GA 30339",
      phone: "(770) 433-8211",
      taxLabel: "Tax",
      taxRate: 8.9,
      register: "REG #22",
      cashier: "Cashier: Tom",
      footerMessage: "How Doers Get More Done.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "2x4x8 Whitewood Stud", quantity: 12, price: 3.98 },
        { id: id(), name: "DEWALT 20V Drill Kit", quantity: 1, price: 99.0 },
        { id: id(), name: "BEHR Ultra Paint 1 Gal", quantity: 1, price: 38.98 },
        { id: id(), name: "3M Painter's Tape 1.88\"", quantity: 2, price: 7.97 },
      ],
    },
  },
  {
    slug: "lowe-s",
    name: "Lowe's Receipt",
    shortName: "Lowe's",
    icon: "🛠️",
    // "Lowes", without the apostrophe, is how people type it: the page had no
    // impressions at all for "lowes receipt generator" with the brand spelled
    // only one way. The second mention carries the other spelling, which also
    // keeps fitBrandTitle from treating it as a repeat to trim.
    seoTitle: "Free Lowe's Receipt Generator — Lowes Receipt Maker",
    seoDescription:
      "Create a Lowe's receipt online. Add appliances, tools and building supplies, edit the prices, tax and date, then get a free watermarked PDF or PNG receipt.",
    heading: "Lowe's Receipt Generator",
    intro:
      "Make a Lowe's (Lowes) receipt with appliances, plumbing supplies and building materials, laid out like the store's thermal register receipt.",
    useCases: [
      "Home improvement deductions",
      "Track Lowe's spending in a budget",
      "Contractor supply documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Lowe's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
      {
        question: "How do I get a copy of a real Lowe's receipt?",
        answer:
          "If the purchase was linked to a MyLowe's account, it appears in your purchase history there. If it wasn't, Lowe's customer care or a store can usually look it up from the card you paid with. This template is for your own records, not a copy of the store's.",
      },
      {
        question: "Can I use a Lowes receipt maker for returns?",
        answer:
          "No. A receipt you make is a record for budgeting, expense notes or mockups, not proof that Lowe's sold you something. For a return, use the store's own record of the sale.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("lowes.com"),
      businessName: "Lowe's",
      addressLine1: "1000 Lowe's Blvd",
      addressLine2: "Mooresville, NC 28117",
      phone: "(704) 758-1000",
      taxLabel: "Tax",
      taxRate: 7.25,
      register: "REG #18",
      cashier: "Cashier: Greg",
      footerMessage: "Do It Right For Less. Start Here.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Kobalt 24V Impact Driver", quantity: 1, price: 79.0 },
        { id: id(), name: "GE LED Bulbs 60W 8pk", quantity: 1, price: 9.98 },
        { id: id(), name: "1/2\" PVC Pipe 10ft", quantity: 5, price: 2.38 },
        { id: id(), name: "DAP Silicone Caulk 10.1oz", quantity: 2, price: 6.48 },
      ],
    },
  },
  {
    slug: "ikea",
    name: "IKEA Receipt",
    shortName: "IKEA",
    icon: "🪑",
    seoTitle: "Free IKEA Receipt Generator — IKEA Receipt Maker",
    seoDescription:
      "Create an IKEA receipt online in seconds. Add furniture, accessories and food court items, edit the prices and tax, then get a free watermarked PDF or PNG.",
    heading: "IKEA Receipt Generator",
    intro:
      "Create an IKEA receipt with flat-pack furniture, home décor, and even those famous Swedish meatballs.",
    useCases: [
      "Records of your own purchases",
      "A sample IKEA receipt for a mockup or demo",
      "Moving expense records",
    ],
    faqs: [
      {
        question: "Can I customize the items on the IKEA receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("ikea.com"),
      businessName: "IKEA",
      addressLine1: "1 Ikea Way",
      addressLine2: "Conshohocken, PA 19428",
      phone: "(888) 888-4532",
      taxLabel: "Tax",
      taxRate: 8.0,
      register: "REG #07",
      cashier: "Co-Worker: Anna",
      footerMessage: "Create A Better Everyday Life.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "KALLAX Shelf Unit 4x2", quantity: 1, price: 69.99 },
        { id: id(), name: "MALM 6-Drawer Dresser", quantity: 1, price: 199.99 },
        { id: id(), name: "FEJKA Artificial Plant", quantity: 2, price: 3.99 },
        { id: id(), name: "Swedish Meatballs 15pc", quantity: 1, price: 6.99 },
      ],
    },
  },
  {
    slug: "best-buy",
    name: "Best Buy Receipt",
    shortName: "Best Buy",
    icon: "💻",
    seoTitle: "Best Buy Receipt Generator & Template — Edit Online",
    seoDescription:
      "Best Buy receipt generator and template: add laptops, TVs and protection plans, edit SKUs, prices and tax, then download a watermarked PDF or PNG free.",
    heading: "Best Buy Receipt Generator & Template",
    intro:
      "Create a Best Buy-style receipt with laptops, TVs, accessories and protection plans, each line with its SKU, then download it as a PDF or PNG.",
    useCases: [
      "IT equipment purchase documentation",
      "Keep your own record of Best Buy purchases",
      "Records of your own purchases",
    ],
    guidance: [
      {
        heading: "Best Buy receipt template: what opens pre-filled",
        body:
          "The template opens as a thermal Best Buy-style receipt: the store header, five sample lines with their SKUs (AirPods, a 50-inch TV, a two-year TV protection plan, a charger and a cable), the subtotal, tax and total, and a member points line in the footer. Change any line, SKU or price and the totals follow.",
      },
      {
        heading: "Make a Best Buy laptop or TV receipt",
        body:
          "Replace a sample line with the laptop or TV: type the model in the item name, put its SKU in the SKU field and set the price. Add a protection plan as its own line under it. The {link:/examples/best-buy-receipt-laptop|Best Buy laptop receipt example} shows one filled in.",
      },
    ],
    faqs: [
      {
        question: "Is the Best Buy receipt generator free?",
        answer:
          `Building and a watermarked download are free with no account; a clean download needs Pro from ${PASS_FROM} a week.`,
      },
      {
        question: "Can I edit the SKUs and the protection plan?",
        answer:
          "Yes. Every line, SKU, price, tax rate and the member line are editable.",
      },
      {
        question: "Is this affiliated with Best Buy?",
        answer:
          "No. It is an independent template and not a proof of purchase.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("bestbuy.com"),
      businessName: "Best Buy",
      addressLine1: "7601 Penn Ave S",
      addressLine2: "Richfield, MN 55423",
      phone: "(612) 291-1000",
      taxLabel: "Tax",
      taxRate: 7.875,
      register: "",
      cashier: "Your cashier was Mitchell U.",
      website: "www.bestbuy.com",
      footerMessage: "Thank you for shopping at Best Buy!",
      showCardAuth: true,
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Apple AirPods Pro (2nd Gen)", quantity: 1, price: 249.99 },
        { id: id(), name: "Insignia 65\" 4K Fire TV", quantity: 1, price: 349.99 },
        { id: id(), name: "Anker USB-C Cable 6ft", quantity: 2, price: 12.99 },
      ],
    },
  },
  {
    slug: "macy-s",
    name: "Macy's Receipt",
    shortName: "Macy's",
    icon: "👗",
    seoTitle: "Free Macy's Receipt Generator — Macy's Receipt Maker",
    seoDescription:
      "Create a Macy's receipt online in seconds. Add clothing, accessories and home goods, edit the prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "Macy's Receipt Generator",
    intro:
      "Create a Macy's department store receipt with apparel, beauty, and home products.",
    useCases: [
      "Wardrobe expense records",
      "Track Macy's spending in a budget",
      "Gift purchase tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Macy's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("macys.com"),
      businessName: "Macy's",
      addressLine1: "Shops at Crystals",
      addressLine2: "3720 S Las Vegas Blvd, NV 89158",
      phone: "(702) 560-5022",
      taxLabel: "Tax",
      taxRate: 8.1,
      register: "",
      cashier: "",
      footerMessage: "",
      fontFamily: "mono",
      headerAlign: "center",
      ruleStyle: "asterisk",
      itemStyle: "lined",
      itemHeader: { left: "Item:", right: "Amount:" },
      showCardAuth: true,
      sections: [
        {
          rows: [
            { label: "Trans", value: "14005" },
            { label: "Store", value: "4068" },
            { label: "Salesperson", value: "50126686" },
            { label: "Customer", value: "400010142184" },
          ],
        },
      ],
      policyText:
        "Please keep this receipt as proof of purchase. Returns of full-price items are accepted within 30 days and sale items within 14 days. Items must be unused, in original condition with all tags attached. Personalized, pierced, or fragrance items are non-returnable.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Charter Club Cashmere Sweater", quantity: 1, price: 79.5 },
        { id: id(), name: "Calvin Klein Dress Shirt", quantity: 1, price: 49.99 },
      ],
    },
  },
  {
    slug: "nordstrom",
    name: "Nordstrom Receipt",
    shortName: "Nordstrom",
    icon: "👔",
    seoTitle: "Free Nordstrom Receipt Generator — Nordstrom Receipt Maker",
    seoDescription:
      "Create a Nordstrom receipt online in seconds. Add designer fashion, shoes and accessories, edit the prices and tax, then get a free watermarked PDF or PNG.",
    heading: "Nordstrom Receipt Generator",
    intro:
      "Create a Nordstrom receipt with premium fashion, shoes, and beauty products. In style since 1901.",
    useCases: [
      "Records of your own purchases",
      "A sample Nordstrom receipt for a mockup or demo",
      "Gift receipt documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Nordstrom receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("nordstrom.com"),
      businessName: "Nordstrom New York Flagship",
      addressLine1: "225 W 57th St",
      addressLine2: "New York, NY 10019",
      phone: "(212) 333-7300",
      taxLabel: "Sales Tax",
      taxRate: 8.875,
      register: "",
      cashier: "",
      footerMessage: "",
      fontFamily: "mono",
      headerAlign: "center",
      ruleStyle: "dashed",
      itemStyle: "lined",
      itemHeader: { left: "Description:", right: "Price:" },
      showCardAuth: true,
      policyText:
        "Nordstrom is happy to offer product exchanges within 10 days of the purchase date, in accordance with any applicable legal guarantees. This exchange policy does not cover personalized items, made-to-order products, cosmetics, or fragrances.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Ferragamo Gancini Leather Belt", quantity: 1, price: 450.0 },
        { id: id(), name: "Theory Wool Two-Button Blazer", quantity: 1, price: 525.0 },
      ],
    },
  },
  {
    slug: "sephora",
    name: "Sephora Receipt",
    shortName: "Sephora",
    icon: "💄",
    seoTitle: "Free Sephora Receipt Generator — Sephora Receipt Maker",
    seoDescription:
      "Create a Sephora receipt online in seconds. Add beauty, skincare and fragrance items, edit the prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "Sephora Receipt Generator",
    intro:
      "Create a Sephora receipt with prestige beauty, skincare, and fragrance products.",
    useCases: [
      "Beauty product gift receipt",
      "Keep your own record of Sephora purchases",
      "Personal beauty budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sephora receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("sephora.com"),
      businessName: "Sephora",
      addressLine1: "525 Market St",
      addressLine2: "San Francisco, CA 94105",
      phone: "(415) 392-1545",
      taxLabel: "Tax",
      taxRate: 8.625,
      register: "REG #02",
      cashier: "Beauty Advisor: Kim",
      footerMessage: "Beauty Insider — 280 Pts Earned!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "NARS Radiant Creamy Concealer", quantity: 1, price: 32.0 },
        { id: id(), name: "Rare Beauty Soft Pinch Blush", quantity: 1, price: 23.0 },
        { id: id(), name: "Sephora Collection Mask", quantity: 2, price: 6.0 },
      ],
    },
  },
  {
    slug: "ulta-beauty",
    name: "Ulta Beauty Receipt",
    shortName: "Ulta Beauty",
    icon: "💄",
    seoTitle:
      "Free Ulta Beauty Receipt Generator — Ulta Beauty Receipt Maker",
    seoDescription:
      "Create an Ulta Beauty receipt online. Add makeup, haircare and skincare, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Ulta Beauty Receipt Generator",
    intro:
      "Create an Ulta Beauty receipt with drugstore and prestige beauty, plus salon services.",
    useCases: [
      "Records of your own purchases",
      "Track Ulta spending in a budget",
      "Salon service documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Ulta Beauty receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("ulta.com"),
      businessName: "Ulta Beauty",
      addressLine1: "1000 Remington Blvd",
      addressLine2: "Bolingbrook, IL 60440",
      phone: "(630) 410-4800",
      taxLabel: "Tax",
      taxRate: 8.75,
      register: "REG #06",
      cashier: "Associate: Jen",
      footerMessage: "Ultamate Rewards — Points Balance: 1,420",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Maybelline Lash Sensational", quantity: 1, price: 10.99 },
        { id: id(), name: "IT Cosmetics CC+ Cream", quantity: 1, price: 47.0 },
        { id: id(), name: "Redken All Soft Shampoo 10oz", quantity: 1, price: 26.0 },
      ],
    },
  },
  {
    slug: "gamestop",
    name: "GameStop Receipt",
    shortName: "GameStop",
    icon: "🎮",
    seoTitle: "Free GameStop Receipt Generator — GameStop Receipt Maker",
    seoDescription:
      "Create a GameStop receipt online. Add games, consoles and collectibles, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "GameStop Receipt Generator",
    intro:
      "Create a GameStop receipt with video games, consoles, accessories, and collectibles.",
    useCases: [
      "Gaming purchase documentation",
      "A sample GameStop receipt for a mockup or demo",
      "Gift purchase tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the GameStop receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("gamestop.com"),
      businessName: "GameStop",
      addressLine1: "625 Westport Pkwy",
      addressLine2: "Grapevine, TX 76051",
      phone: "(817) 424-2000",
      taxLabel: "Tax",
      taxRate: 8.25,
      register: "REG #01",
      cashier: "Game Advisor: Tyler",
      footerMessage: "Power To The Players.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Elden Ring (PS5)", quantity: 1, price: 59.99 },
        { id: id(), name: "DualSense Controller White", quantity: 1, price: 69.99 },
        { id: id(), name: "PowerA Switch Pro Controller", quantity: 1, price: 44.99 },
      ],
    },
  },
  {
    slug: "apple-store",
    name: "Apple Store Receipt",
    shortName: "Apple Store",
    icon: "📱",
    seoTitle: "Apple Receipt Generator — iPhone & Apple Store Receipts",
    seoDescription:
      `Apple receipt generator: add iPhone, AirPods and AppleCare lines, set the tax, get a PDF or PNG. Free download is watermarked; Pro from ${PASS_FROM} a week removes it.`,
    heading: "Apple Receipt Generator — Make an Apple Store Receipt",
    intro:
      "Create an Apple Store-style receipt with an iPhone, AirPods, accessories and AppleCare+, set the tax, then download it as a PDF or PNG.",
    useCases: [
      "IT equipment purchase receipts",
      "Keep your own record of Apple purchases",
      "Business electronics documentation",
    ],
    guidance: [
      {
        heading: "Make an iPhone receipt",
        body:
          "The sample opens with an iPhone 17 Pro 256GB line, AppleCare+ for it, AirPods Pro 3 and a USB-C cable. Change the model, storage and colour in the item name, set the price, and keep or delete the AppleCare+ line. The {link:/examples/apple-store-receipt-iphone|iPhone receipt example} shows one filled in.",
      },
      {
        heading: "AirPods and accessory receipts",
        body:
          "Delete the iPhone and AppleCare+ lines to leave an AirPods-only or accessories receipt. The {link:/examples/apple-store-receipt-airpods|AirPods receipt example} shows one.",
      },
      {
        heading: "Apple receipt template: the layout",
        body:
          "The template uses a clean sans-serif layout with a Specialist line and a return-by date under the items. Edit the store, Specialist, date and return-by line to match your own record. Makecepeit is not affiliated with Apple, and a receipt made here is not proof of purchase.",
      },
    ],
    faqs: [
      {
        question: "Is the Apple receipt generator free?",
        answer:
          `Building and a watermarked PDF or PNG are free with no account; Pro from ${PASS_FROM} a week removes the watermark.`,
      },
      {
        question: "Can I add AppleCare to the receipt?",
        answer:
          "Yes. AppleCare+ is an editable line item with its own price.",
      },
      {
        question: "Can I change the store and tax rate?",
        answer:
          "Yes. The store name, address, tax rate and currency are all editable.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("apple.com"),
      businessName: "Apple Store",
      addressLine1: "767 Fifth Ave",
      addressLine2: "New York, NY 10153",
      phone: "(212) 336-1440",
      taxLabel: "Tax",
      taxRate: 8.875,
      cashier: "Specialist: James",
      footerMessage: "Thank you for visiting Apple.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "iPhone 16 Pro 256GB", quantity: 1, price: 1199.0 },
        { id: id(), name: "AppleCare+ for iPhone", quantity: 1, price: 199.0 },
        { id: id(), name: "MagSafe Charger", quantity: 1, price: 39.0 },
      ],
    },
  },
  {
    slug: "tj-maxx",
    name: "TJ Maxx Receipt",
    shortName: "TJ Maxx",
    icon: "👕",
    seoTitle: "Free TJ Maxx Receipt Generator — TJ Maxx Receipt Maker",
    seoDescription:
      "Create a TJ Maxx receipt online. Add designer fashion at discount prices, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "TJ Maxx Receipt Generator",
    intro:
      "Create a TJ Maxx receipt with brand-name clothing, shoes, and home décor at off-price deals.",
    useCases: [
      "Discount fashion expense tracking",
      "Track TJ Maxx spending in a budget",
      "Gift purchase documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the TJ Maxx receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("tjmaxx.tjx.com"),
      businessName: "TJ Maxx",
      addressLine1: "770 Cochituate Rd",
      addressLine2: "Framingham, MA 01701",
      phone: "(508) 390-1000",
      taxLabel: "Tax",
      taxRate: 6.25,
      register: "REG #09",
      footerMessage: "Maxx Life — You'll Love What You Find!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Lucky Brand Jeans", quantity: 1, price: 29.99 },
        { id: id(), name: "Nike Dri-FIT Tee", quantity: 2, price: 14.99 },
        { id: id(), name: "Calvin Klein Handbag", quantity: 1, price: 39.99 },
      ],
    },
  },
  {
    slug: "marshalls",
    name: "Marshalls Receipt",
    shortName: "Marshalls",
    icon: "👕",
    seoTitle: "Free Marshalls Receipt Generator — Marshalls Receipt Maker",
    seoDescription:
      "Create a Marshalls receipt online. Add off-price designer clothing and home goods, edit the prices and tax, then download a free watermarked PDF or PNG.",
    heading: "Marshalls Receipt Generator",
    intro:
      "Create a Marshalls receipt with brand-name fashion, shoes, and home goods at discount prices.",
    useCases: [
      "Off-price shopping documentation",
      "A sample Marshalls receipt for a mockup or demo",
      "Personal fashion budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Marshalls receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("marshalls.com"),
      businessName: "Marshalls",
      addressLine1: "770 Cochituate Rd",
      addressLine2: "Framingham, MA 01701",
      phone: "(508) 390-2500",
      taxLabel: "Tax",
      taxRate: 6.25,
      register: "REG #04",
      footerMessage: "Your Surprise Is Waiting!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Michael Kors Crossbody Bag", quantity: 1, price: 49.99 },
        { id: id(), name: "Adidas Ultraboost Sneakers", quantity: 1, price: 59.99 },
        { id: id(), name: "Decorative Throw Blanket", quantity: 1, price: 19.99 },
      ],
    },
  },
  {
    slug: "dick-s-sporting-goods",
    name: "Dick's Sporting Goods Receipt",
    shortName: "Dick's Sporting Goods",
    icon: "⚽",
    seoTitle:
      "Free Dick's Sporting Goods Receipt Generator — Dick's Receipt Maker",
    seoDescription:
      "Create a Dick's Sporting Goods receipt online. Add athletic gear, shoes and equipment, edit the prices and tax, then download a free watermarked PDF or PNG.",
    heading: "Dick's Sporting Goods Receipt Generator",
    intro:
      "Create a Dick's Sporting Goods receipt with athletic apparel, footwear, and sports equipment.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Dick's purchases",
      "Fitness expense tracking",
    ],
    faqs: [
      {
        question:
          "Can I customize the items on the Dick's Sporting Goods receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("dickssportinggoods.com"),
      businessName: "Dick's Sporting Goods",
      addressLine1: "345 Court St",
      addressLine2: "Coraopolis, PA 15108",
      phone: "(724) 273-3400",
      taxLabel: "Tax",
      taxRate: 7.0,
      register: "REG #12",
      cashier: "Teammate: Marcus",
      footerMessage: "Every Season Starts At Dick's.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Nike Revolution 7 Running", quantity: 1, price: 64.99 },
        { id: id(), name: "Under Armour Tech 2.0 Tee", quantity: 2, price: 25.0 },
        { id: id(), name: "Wilson NCAA Basketball", quantity: 1, price: 29.99 },
      ],
    },
  },
  {
    slug: "petco",
    name: "Petco Receipt",
    shortName: "Petco",
    icon: "🐕",
    seoTitle: "Free Petco Receipt Generator — Petco Receipt Maker",
    seoDescription:
      "Create a Petco receipt online. Add pet food, toys and grooming services, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Petco Receipt Generator",
    intro:
      "Create a Petco receipt with pet food, treats, toys, and grooming services. Health + Happiness.",
    useCases: [
      "Pet care expense tracking",
      "Track Petco spending in a budget",
      "Grooming service documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Petco receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("petco.com"),
      businessName: "Petco",
      addressLine1: "10850 Via Frontera",
      addressLine2: "San Diego, CA 92127",
      phone: "(858) 453-7845",
      taxLabel: "Tax",
      taxRate: 7.75,
      register: "REG #03",
      footerMessage: "Health + Happiness for pets & people.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Blue Buffalo Life Prot 15lb", quantity: 1, price: 42.99 },
        { id: id(), name: "KONG Classic Dog Toy (M)", quantity: 1, price: 11.99 },
        { id: id(), name: "Greenies Dental Treats 12oz", quantity: 1, price: 18.99 },
      ],
    },
  },
  {
    slug: "petsmart",
    name: "PetSmart Receipt",
    shortName: "PetSmart",
    icon: "🐈",
    seoTitle: "Free PetSmart Receipt Generator — PetSmart Receipt Maker",
    seoDescription:
      "Create a PetSmart receipt online. Add pet supplies, grooming and vet services, edit the prices and tax, then download a free watermarked PDF or PNG receipt.",
    heading: "PetSmart Receipt Generator",
    intro:
      "Create a PetSmart receipt with pet food, toys, grooming, and Banfield vet services.",
    useCases: [
      "Records of your own purchases",
      "A sample PetSmart receipt for a mockup or demo",
      "Veterinary expense records",
    ],
    faqs: [
      {
        question: "Can I customize the items on the PetSmart receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("petsmart.com"),
      businessName: "PetSmart",
      addressLine1: "19601 N 27th Ave",
      addressLine2: "Phoenix, AZ 85027",
      phone: "(623) 580-6100",
      taxLabel: "Tax",
      taxRate: 8.6,
      register: "REG #05",
      footerMessage: "Anything For Pets. Treats Rewards: 450 pts",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Purina Pro Plan 16lb Dog", quantity: 1, price: 38.98 },
        { id: id(), name: "Tidy Cats Clumping 35lb", quantity: 1, price: 16.99 },
        { id: id(), name: "Top Paw Retractable Leash", quantity: 1, price: 14.99 },
        { id: id(), name: "Grooming Bath & Brush", quantity: 1, price: 29.99 },
      ],
    },
  },
  {
    slug: "autozone",
    name: "AutoZone Receipt",
    shortName: "AutoZone",
    icon: "🚗",
    seoTitle: "Free AutoZone Receipt Generator — AutoZone Receipt Maker",
    seoDescription:
      "Create an AutoZone receipt online. Add auto parts, oil and accessories, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "AutoZone Receipt Generator",
    intro:
      "Create an AutoZone receipt with auto parts, motor oil, and vehicle accessories. Get in the zone!",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of AutoZone purchases",
      "Fleet maintenance tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the AutoZone receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("autozone.com"),
      businessName: "AutoZone",
      addressLine1: "123 S Front St",
      addressLine2: "Memphis, TN 38103",
      phone: "(901) 495-6500",
      taxLabel: "Tax",
      taxRate: 9.75,
      register: "REG #02",
      footerMessage: "Get In The Zone — AutoZone!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Mobil 1 Full Synth 5qt", quantity: 1, price: 28.97 },
        { id: id(), name: "STP Oil Filter S3614", quantity: 1, price: 5.99 },
        { id: id(), name: "Rain-X Wipers 22\"", quantity: 2, price: 12.99 },
      ],
    },
  },
  {
    slug: "o-reilly-auto-parts",
    name: "O'Reilly Auto Parts Receipt",
    shortName: "O'Reilly Auto Parts",
    icon: "🚗",
    seoTitle:
      "Free O'Reilly Auto Parts Receipt Generator — O'Reilly Receipt Maker",
    seoDescription:
      "Create an O'Reilly Auto Parts receipt online in seconds. Add auto parts, oil and supplies, edit the prices and tax, then get a free watermarked PDF or PNG.",
    heading: "O'Reilly Auto Parts Receipt Generator",
    intro:
      "Create an O'Reilly Auto Parts receipt with parts, tools, and car care products. The right parts, right price.",
    useCases: [
      "Records of your own purchases",
      "Track O'Reilly spending in a budget",
      "Company vehicle maintenance docs",
    ],
    faqs: [
      {
        question:
          "Can I customize the items on the O'Reilly Auto Parts receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("oreillyauto.com"),
      businessName: "O'Reilly Auto Parts",
      addressLine1: "233 S Patterson Ave",
      addressLine2: "Springfield, MO 65802",
      phone: "(417) 862-2674",
      taxLabel: "Tax",
      taxRate: 8.1,
      register: "REG #01",
      footerMessage: "O-O-O O'Reilly! — Auto Parts!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Duralast Brake Pads Front", quantity: 1, price: 34.99 },
        { id: id(), name: "Penzoil Platinum 5W30 5qt", quantity: 1, price: 26.99 },
        { id: id(), name: "Armor All Interior Wipes", quantity: 1, price: 6.99 },
      ],
    },
  },
  {
    slug: "amazon",
    name: "Amazon Receipt",
    shortName: "Amazon",
    icon: "📦",
    seoTitle: "Free Amazon Receipt Generator — Amazon Order Receipt Maker",
    seoDescription:
      "Create an Amazon receipt online in seconds. Add products, Prime delivery and order details, edit the prices and tax, then get a free watermarked PDF or PNG.",
    heading: "Amazon Receipt Generator",
    intro:
      "Generate an Amazon order receipt with individual items, shipping, and payment details. Great for your own purchase records.",
    useCases: [
      "Online order expense records",
      "Records of your own purchases",
      "Personal accounting records",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Amazon receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("amazon.com"),
      businessName: "Amazon Logistics",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      forcePaper: true,
      greeting: "Shipment Receipt — 1Z A24 826 73 6194",
      grandTotalLabel: "Total",
      footerMessage: "",
      sections: [
        {
          title: "Ship from",
          rows: [
            { value: "Amazon Fulfillment BFI4" },
            { value: "2700 Center Dr, DuPont, WA 98327" },
          ],
        },
        {
          title: "Ship to",
          rows: [
            { value: "Paulina Valades" },
            { value: "2219 San Dario Ave #1820" },
            { value: "Laredo, TX 78040" },
          ],
        },
        {
          title: "Shipment",
          rows: [
            { label: "Total weight", value: "45 kg" },
            { label: "Parcels", value: "2" },
            { label: "Est. delivery", value: "Aug 21, End of Day" },
          ],
        },
      ],
      policyText:
        "All shipments are subject to the Amazon Logistics terms and conditions of service in effect at the time of shipping. Liability for loss or damage is limited unless a higher value is declared and additional charges are paid.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Worldwide Expedited", quantity: 1, price: 1141.0 },
        { id: id(), name: "Fuel Surcharge", quantity: 1, price: 325.41 },
      ],
    },
  },
  {
    slug: "ebay",
    name: "eBay Receipt",
    shortName: "eBay",
    icon: "📦",
    seoTitle: "Free eBay Receipt Generator — eBay Purchase Receipt Maker",
    seoDescription:
      "Create an eBay receipt online in seconds. Add auction or Buy It Now purchases, edit the items, prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "eBay Receipt Generator",
    intro:
      "Generate an eBay marketplace receipt for auction wins or Buy It Now purchases.",
    useCases: [
      "Records of your own purchases",
      "A sample eBay payment receipt for a mockup or demo",
      "Resale business documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the eBay receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("ebay.com"),
      businessName: "eBay",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Sales Tax",
      taxRate: 0,
      forcePaper: true,
      greeting: "Congrats on Your Purchase!",
      grandTotalLabel: "TOTAL",
      footerMessage: "",
      logoScale: 1.2,
      sections: [
        {
          title: "Shipping details",
          rows: [
            { value: "Isabella Grant" },
            { value: "472 Maplewood Drive" },
            { value: "Los Angeles, CA 90042" },
          ],
        },
        {
          title: "Seller",
          rows: [
            { label: "Located in", value: "Italy" },
            { label: "Ships in", value: "3–6 weeks (international)" },
          ],
        },
      ],
      policyText:
        "Sellers have up to 7 days to ship the item and provide tracking. If you don't receive tracking within 7 days, eBay will cancel the order and issue a full refund.",
      paperStyle: "modern",
      items: [{ id: id(), name: "Christian Louboutin So Kate Pumps", quantity: 1, price: 725 }],
    },
  },
  {
    slug: "stockx",
    name: "StockX Receipt",
    shortName: "StockX",
    icon: "👟",
    // 2026-11-25: "template" first. The page ranks 9.1 for "stockx receipt
    // template" at a 1.7% click rate; /blog/stockx-receipt keeps "stockx
    // receipt" and hands its readers here.
    seoTitle: "StockX Receipt Template & Generator — Sneaker Order Receipt",
    seoDescription:
      "StockX receipt template for a sneaker order: style ID, size, purchase price, processing fee, shipping, sales tax and total. Download a watermarked PDF free.",
    heading: "StockX Receipt Template & Generator",
    intro:
      "Make a StockX-style order receipt for a sneaker or streetwear purchase, with the size, style code, processing fee and shipping laid out the way a resale order is billed.",
    useCases: [
      "Resale business bookkeeping",
      "Tracking what a pair actually cost after fees",
      "Expense records for a sneaker collection",
    ],
    guidance: [
      {
        heading: "What a StockX order receipt shows",
        body:
          "The template follows the order confirmation StockX emails: an Order Confirmed header, the order number and date, then the item details (style ID, size, condition and the StockX Verified line) and the shipping address.\n\n" +
          "Below that come the purchase price, the processing fee, shipping, sales tax and the total, with the card's last four digits. StockX works out its processing fee as a share of the price, with a minimum. The sample's numbers are invented: check the fee, shipping and tax against your own StockX order email before you rely on them.",
      },
    ],
    faqs: [
      {
        question: "Where do I find my real StockX receipt?",
        answer:
          "Log in to your StockX account and open the order in your buying history; StockX also emails an order confirmation when the purchase goes through. That confirmation is the official record of what you paid.",
      },
      {
        question: "What does a StockX order receipt show?",
        answer:
          "The item name, size and style code, the purchase price, the processing fee, shipping, sales tax and the order total, plus the order number and shipping address.",
      },
      {
        question: "Does a receipt from this template prove a pair is authentic?",
        answer:
          "No. It records a price, nothing more, and it carries no authentication tag. Only StockX's own records relate to its verification process.",
      },
      {
        question: "Can I change the item, size and fees?",
        answer:
          "Yes. Every field is editable: the item, size, style code, price, fees, tax rate and date, then download a PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("stockx.com"),
      businessName: "StockX",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Sales Tax",
      taxRate: 8.875,
      forcePaper: true,
      greeting: "Your order is confirmed",
      grandTotalLabel: "TOTAL",
      footerMessage: "",
      sections: [
        {
          title: "Item details",
          rows: [
            { label: "Size", value: "US M 10" },
            { label: "Style", value: "DZ5485-612" },
            { label: "Condition", value: "New" },
          ],
        },
        {
          title: "Shipping details",
          rows: [
            { value: "Marcus Bell" },
            { value: "218 Atlantic Avenue" },
            { value: "Brooklyn, NY 11201" },
          ],
        },
      ],
      paperStyle: "modern",
      items: [
        { id: id(), name: "Jordan 1 Retro High OG", quantity: 1, price: 248 },
        { id: id(), name: "Processing Fee", quantity: 1, price: 7.44 },
        { id: id(), name: "Shipping", quantity: 1, price: 14.95 },
      ],
    },
  },
  {
    slug: "goat",
    name: "GOAT Receipt",
    shortName: "GOAT",
    icon: "👟",
    seoTitle: "Free GOAT Receipt Generator — GOAT Order Receipt Maker",
    seoDescription:
      "Make a GOAT-style order receipt for sneakers and apparel: item, size, condition, shipping and tax, then download it as a PDF or PNG for your own records.",
    heading: "GOAT Receipt Generator",
    intro:
      "Make a GOAT-style order receipt for a sneaker or apparel purchase, with the size, condition, shipping and tax laid out the way a resale order is billed.",
    useCases: [
      "Resale business bookkeeping",
      "Tracking what a pair cost after shipping and tax",
      "Expense records for a sneaker collection",
    ],
    faqs: [
      {
        question: "Where do I find my real GOAT receipt?",
        answer:
          "Open your order history in the GOAT app or on goat.com, and check the order confirmation email GOAT sends when a purchase goes through. That confirmation is the official record of what you paid.",
      },
      {
        question: "What does a GOAT order receipt show?",
        answer:
          "The item name, size and condition, the price, shipping, sales tax and the order total, plus the order number and shipping address.",
      },
      {
        question: "Does a receipt from this template prove a pair is authentic?",
        answer:
          "No. It records a price, nothing more, and it carries no authentication mark. Only GOAT's own records relate to its verification process.",
      },
      {
        question: "Can I change the item, size and condition?",
        answer:
          "Yes. Every field is editable: the item, size, condition, price, shipping, tax rate and date, then download a PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("goat.com"),
      businessName: "GOAT",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Sales Tax",
      taxRate: 9.5,
      forcePaper: true,
      greeting: "Thanks for your order",
      grandTotalLabel: "TOTAL",
      footerMessage: "",
      sections: [
        {
          title: "Item details",
          rows: [
            { label: "Size", value: "US M 9.5" },
            { label: "Condition", value: "New" },
          ],
        },
        {
          title: "Shipping details",
          rows: [
            { value: "Jordan Reyes" },
            { value: "5120 Sunset Boulevard" },
            { value: "Los Angeles, CA 90027" },
          ],
        },
      ],
      paperStyle: "modern",
      items: [
        { id: id(), name: "Nike Dunk Low Retro", quantity: 1, price: 132 },
        { id: id(), name: "Shipping", quantity: 1, price: 14.5 },
      ],
    },
  },
  {
    slug: "netflix",
    name: "Netflix Receipt",
    shortName: "Netflix",
    icon: "🎬",
    seoTitle: "Free Netflix Receipt Generator — Netflix Billing Receipt Maker",
    seoDescription:
      "Create a Netflix billing receipt online in seconds. Document your subscription plan, charges, dates and payment method, then download a watermarked PDF free.",
    heading: "Netflix Receipt Generator",
    intro:
      "Generate a Netflix subscription billing receipt. Perfect for documenting entertainment expenses.",
    useCases: [
      "Entertainment expense tracking",
      "Subscription billing documentation",
      "Personal finance records",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Netflix receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("netflix.com"),
      businessName: "Netflix",
      addressLine1: "100 Winchester Cir",
      addressLine2: "Los Gatos, CA 95032",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "See what's next on Netflix.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Standard with Ads (Monthly)", quantity: 1, price: 6.99 },
      ],
    },
  },
  {
    slug: "spotify",
    name: "Spotify Receipt",
    shortName: "Spotify",
    icon: "🎵",
    seoTitle: "Free Spotify Receipt Generator — Spotify Billing Receipt Maker",
    seoDescription:
      "Create a Spotify billing receipt online in seconds. Document your Premium subscription plan, charges and dates, then download a free watermarked PDF or PNG.",
    heading: "Spotify Receipt Generator",
    intro:
      "Generate a Spotify subscription receipt for Premium individual, family, or student plans.",
    useCases: [
      "Music subscription documentation",
      "Keep your own record of billing purchases",
      "Personal expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Spotify receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("spotify.com"),
      businessName: "Spotify",
      addressLine1: "4 World Trade Center",
      addressLine2: "New York, NY 10007",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Music for everyone.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Spotify Premium Individual", quantity: 1, price: 11.99 },
      ],
    },
  },
  {
    slug: "hulu",
    name: "Hulu Receipt",
    shortName: "Hulu",
    icon: "🎬",
    seoTitle: "Free Hulu Receipt Generator — Hulu Billing Receipt Maker",
    seoDescription:
      "Create a Hulu billing receipt online in seconds. Document your streaming subscription plan, charges and dates, then download a free watermarked PDF or PNG.",
    heading: "Hulu Receipt Generator",
    intro:
      "Generate a Hulu subscription receipt for basic, premium, or live TV plans.",
    useCases: [
      "Streaming expense records",
      "Track Hulu billing spending in a budget",
      "Household budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hulu receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("hulu.com"),
      businessName: "Hulu",
      addressLine1: "2500 Broadway",
      addressLine2: "Santa Monica, CA 90404",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Come TV with us.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Hulu (No Ads) Monthly", quantity: 1, price: 17.99 },
      ],
    },
  },
  {
    slug: "disney",
    name: "Disney+ Receipt",
    shortName: "Disney+",
    icon: "🎬",
    seoTitle: "Free Disney+ Receipt Generator — Disney+ Billing Receipt Maker",
    seoDescription:
      "Create a Disney+ billing receipt online in seconds. Document your streaming subscription plan, charges and dates, then download a watermarked PDF or PNG free.",
    heading: "Disney+ Receipt Generator",
    intro:
      "Generate a Disney+ subscription receipt. Where the best stories in the world all live.",
    useCases: [
      "Family entertainment expense records",
      "A sample Disney+ billing receipt for a mockup or demo",
      "Subscription tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Disney+ receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("disneyplus.com"),
      businessName: "Disney+",
      addressLine1: "500 S Buena Vista St",
      addressLine2: "Burbank, CA 91521",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "The best stories in the world, all in one place.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Disney+ Premium Monthly", quantity: 1, price: 13.99 },
      ],
    },
  },
  {
    slug: "apple-services",
    name: "Apple Services Receipt",
    shortName: "Apple Services",
    icon: "☁️",
    seoTitle:
      "Free Apple Services Receipt Generator — Apple Billing Receipt Maker",
    seoDescription:
      "Create an Apple Services receipt online in seconds. Document iCloud, Apple Music and Apple One charges, then download a free watermarked PDF or PNG billing.",
    heading: "Apple Services Receipt Generator",
    intro:
      "Generate an Apple Services receipt for iCloud+, Apple Music, Apple TV+, or Apple One bundles.",
    useCases: [
      "Cloud storage expense records",
      "Keep your own record of Apple billing purchases",
      "Subscription expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Apple Services receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("apple.com"),
      businessName: "Apple Cash",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      forcePaper: true,
      fontFamily: "sans",
      headerAlign: "center",
      ruleStyle: "none",
      greeting: "Payment Receipt",
      hideItems: true,
      hideTotals: true,
      footerMessage: "Need help? Visit support.apple.com",
      sections: [
        {
          rows: [
            { label: "Payee", value: "TacoTown LLC" },
            { label: "Transaction", value: "Payment" },
            { label: "Amount", value: "$24.50" },
            { label: "Date", value: "Sep 29, 1:42 PM" },
            { label: "Transaction ID", value: "TXN-9F3C2A7B" },
            { label: "Payment method", value: "Visa •••• 1234" },
            { label: "Status", value: "Completed" },
            { label: "Fee", value: "$0.00" },
            { label: "Note", value: "Lunch order" },
            { label: "Sender", value: "Ava Mitchell" },
          ],
        },
      ],
      paperStyle: "minimal",
      items: [{ id: id(), name: "Payment", quantity: 1, price: 24.5 }],
    },
  },
  {
    slug: "google-play",
    name: "Google Play Receipt",
    shortName: "Google Play",
    icon: "▶️",
    seoTitle:
      "Free Google Play Receipt Generator — Google Play Receipt Maker",
    seoDescription:
      "Create a Google Play receipt online. Document app purchases and subscription charges, dates and totals, then download a free watermarked PDF or PNG receipt.",
    heading: "Google Play Receipt Generator",
    intro:
      "Generate a Google Play receipt for app purchases, in-app buys, and subscription renewals.",
    useCases: [
      "Records of your own purchases",
      "Track Google Play spending in a budget",
      "Digital expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Google Play receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("play.google.com"),
      businessName: "Google Pay",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      forcePaper: true,
      fontFamily: "mono",
      headerAlign: "center",
      ruleStyle: "colon",
      greeting: "Bank Transaction Receipt",
      hideItems: true,
      hideTotals: true,
      footerMessage: "For any other assistance, contact support.google.com/pay",
      sections: [
        {
          rows: [
            { label: "Amount", value: "$5,000.00" },
            { label: "Type", value: "Bank Transfer" },
            { label: "Date", value: "Sep 30, 10:12 AM" },
          ],
        },
        {
          rows: [
            { label: "Sender", value: "Ava Mitchell" },
            { label: "Debit acct", value: "750 ****274" },
            { label: "Beneficiary", value: "Liam Carter" },
            { label: "Credit acct", value: "100 ****3489" },
          ],
        },
        { title: "Status", rows: [{ value: "Successful" }] },
      ],
      paperStyle: "minimal",
      items: [{ id: id(), name: "Transfer", quantity: 1, price: 5000 }],
    },
  },
  {
    slug: "microsoft-store",
    name: "Microsoft Store Receipt",
    shortName: "Microsoft Store",
    icon: "💻",
    seoTitle:
      "Free Microsoft Store Receipt Generator — Microsoft Receipt Maker",
    seoDescription:
      "Create a Microsoft Store receipt online. Add software, subscriptions and hardware, edit the prices and tax, then download a free watermarked PDF or PNG.",
    heading: "Microsoft Store Receipt Generator",
    intro:
      "Generate a Microsoft Store receipt for Microsoft 365, Xbox Game Pass, or Surface purchases.",
    useCases: [
      "Software license documentation",
      "A sample Microsoft receipt for a mockup or demo",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Microsoft Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("microsoft.com"),
      businessName: "Microsoft Store",
      addressLine1: "Order #MSO-291847362",
      addressLine2: "Redmond, WA 98052",
      phone: "",
      taxLabel: "Tax",
      taxRate: 10.1,
      footerMessage: "Empower every person and organization.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Microsoft 365 Personal (Annual)", quantity: 1, price: 69.99 },
        { id: id(), name: "Xbox Game Pass Ultimate 1mo", quantity: 1, price: 19.99 },
      ],
    },
  },
  {
    slug: "steam",
    name: "Steam Receipt",
    shortName: "Steam",
    icon: "🎮",
    seoTitle: "Free Steam Receipt Generator — Steam Purchase Receipt Maker",
    seoDescription:
      "Create a Steam receipt online in seconds. Add game purchases, DLC and wallet funds, edit the items, prices and date, then get a free watermarked PDF or PNG.",
    heading: "Steam Receipt Generator",
    intro:
      "Generate a Steam digital storefront receipt for game purchases, DLC, and in-game items.",
    useCases: [
      "Gaming expense records",
      "Keep your own record of Steam purchase purchases",
      "Entertainment budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Steam receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("store.steampowered.com"),
      businessName: "Steam",
      addressLine1: "Transaction #8247193650",
      addressLine2: "Valve Corporation — Bellevue, WA",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your Steam purchase.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Baldur's Gate 3", quantity: 1, price: 59.99 },
        { id: id(), name: "Stardew Valley", quantity: 1, price: 14.99 },
      ],
    },
  },
  {
    slug: "playstation-store",
    name: "PlayStation Store Receipt",
    shortName: "PlayStation Store",
    icon: "🎮",
    seoTitle:
      "Free PlayStation Store Receipt Generator — PS Store Receipt Maker",
    seoDescription:
      "Create a PlayStation Store receipt online. Add game and PS Plus purchases, edit the items, prices and date, then download a free watermarked PDF or PNG.",
    heading: "PlayStation Store Receipt Generator",
    intro:
      "Generate a PlayStation Store receipt for digital game purchases and PS Plus subscriptions.",
    useCases: [
      "Gaming expense records",
      "Track PS Store spending in a budget",
      "Subscription tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the PlayStation Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("playstation.com"),
      businessName: "PlayStation Store",
      addressLine1: "Transaction #WO-2847163950",
      addressLine2: "Sony Interactive Entertainment",
      phone: "",
      taxLabel: "Tax",
      taxRate: 9.5,
      footerMessage: "Play Has No Limits.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Spider-Man 2 (PS5)", quantity: 1, price: 69.99 },
        { id: id(), name: "PS Plus Premium (Annual)", quantity: 1, price: 159.99 },
      ],
    },
  },
  {
    slug: "xbox-store",
    name: "Xbox Store Receipt",
    shortName: "Xbox Store",
    icon: "🎮",
    seoTitle:
      "Free Xbox Store Receipt Generator — Xbox Store Receipt Maker",
    seoDescription:
      "Create an Xbox Store receipt online. Add game and Game Pass purchases, edit the items, prices and date, then download a free watermarked PDF or PNG receipt.",
    heading: "Xbox Store Receipt Generator",
    intro:
      "Generate an Xbox Store receipt for digital games, Game Pass, and in-game purchases.",
    useCases: [
      "Gaming expense records",
      "A sample Xbox receipt for a mockup or demo",
      "Subscription budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Xbox Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("xbox.com"),
      businessName: "Xbox Store",
      addressLine1: "Order #XBOX-3918274650",
      addressLine2: "Microsoft Corporation — Redmond, WA",
      phone: "",
      taxLabel: "Tax",
      taxRate: 10.1,
      footerMessage: "Power Your Dreams.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Starfield Premium Edition", quantity: 1, price: 99.99 },
        { id: id(), name: "Forza Horizon 5", quantity: 1, price: 59.99 },
      ],
    },
  },
  {
    slug: "adobe",
    name: "Adobe Receipt",
    shortName: "Adobe",
    icon: "🎨",
    seoTitle: "Free Adobe Receipt Generator — Adobe Billing Receipt Maker",
    seoDescription:
      "Create an Adobe receipt online. Document Creative Cloud and Acrobat subscription charges and dates, then get a free watermarked PDF or PNG billing receipt.",
    heading: "Adobe Receipt Generator",
    intro:
      "Generate an Adobe receipt for Creative Cloud, Acrobat Pro, and Stock subscriptions.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Adobe billing purchases",
      "Business subscription documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Adobe receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("adobe.com"),
      businessName: "Adobe Inc.",
      addressLine1: "345 Park Ave",
      addressLine2: "San Jose, CA 95110",
      phone: "(408) 536-6000",
      taxLabel: "Tax",
      taxRate: 7.0,
      forcePaper: true,
      fontFamily: "mono",
      headerAlign: "center",
      ruleStyle: "asterisk",
      greeting: "Credit Card Receipt",
      itemStyle: "lined",
      showCardAuth: true,
      sections: [
        {
          title: "Bill to",
          rows: [
            { label: "Name", value: "Emma Caldwell" },
            { label: "Company", value: "SilverPeak Solutions" },
            { label: "City", value: "Asheville, NC" },
            { label: "Phone", value: "(615) 555-7392" },
          ],
        },
      ],
      policyText:
        "All sales are final unless otherwise stated by the merchant's return policy. For refunds, exchanges, or disputes, please retain this receipt and contact the merchant directly. Charges will appear on your statement under the merchant's business or DBA name.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Creative Cloud — Annual License", quantity: 1, price: 599.88 },
        { id: id(), name: "Acrobat Pro Renewal", quantity: 1, price: 199.0 },
        { id: id(), name: "Cloud Storage 1TB Subscription", quantity: 1, price: 49.99 },
      ],
    },
  },
  {
    slug: "zoom",
    name: "Zoom Receipt",
    shortName: "Zoom",
    icon: "📹",
    seoTitle: "Free Zoom Receipt Generator — Zoom Billing Receipt Maker",
    seoDescription:
      "Create a Zoom receipt online in seconds. Document your Zoom Workplace plan subscription, charges and dates, then get a free watermarked PDF or PNG billing.",
    heading: "Zoom Receipt Generator",
    intro:
      "Generate a Zoom receipt for Workplace Pro, Business, or Webinar plan subscriptions.",
    useCases: [
      "Records of your own purchases",
      "Track Zoom billing spending in a budget",
      "Remote work expense records",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Zoom receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("zoom.us"),
      businessName: "Zoom Video Communications",
      addressLine1: "55 Almaden Blvd",
      addressLine2: "San Jose, CA 95113",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "One platform to connect.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Zoom Workplace Pro (Monthly)", quantity: 1, price: 13.33 },
        { id: id(), name: "Cloud Storage Add-On (100GB)", quantity: 1, price: 10.0 },
      ],
    },
  },
  {
    slug: "lyft",
    name: "Lyft Receipt",
    shortName: "Lyft",
    icon: "🚗",
    // 2026-11-16: ranks 7–11 for "lyft receipt pdf" and "lyft receipts online"
    // but is clicked only for "generator" and "maker", so "PDF" and "ride
    // receipt" join the title and H1 in creation terms.
    seoTitle: "Lyft Receipt Generator — Make a Lyft Ride Receipt PDF",
    seoDescription:
      `Make a Lyft ride receipt online: fare, distance, time, tip and pickup. Free to build with a watermarked PDF or PNG; Pro from ${PASS_FROM} a week removes the watermark.`,
    heading: "Lyft Receipt Generator: Make a Lyft Ride Receipt PDF",
    intro:
      "Make a Lyft-style ride receipt with the fare, distance, time, service fee and tip, plus the ride type and timed pickup and drop-off, then download it as a PDF or PNG.",
    useCases: [
      "Business travel records: log a ride you took with its fare, tip, route and times, so your own expense file shows what each trip cost.",
      "Client billing: list each ride's fare and service fee on its own receipt when you pass travel costs on to a client.",
      "Personal ride and travel budgeting",
    ],
    guidance: [
      {
        heading: "Download your Lyft receipt template as a PDF or PNG",
        body:
          `The editor exports a print-ready PDF or a high-resolution PNG, with no account needed. The free download carries a small watermark, and Pro from ${PASS_FROM} a week removes it. Print the PDF or attach the PNG wherever you keep your records.`,
      },
      {
        heading: "Add the fare, service fee, ride type and tip",
        body:
          "The sample opens with the fare on one line, with the miles and minutes in its name, and the service fee on the next. Change either amount and the total follows. The tip is its own editable line, so a receipt can show the ride with or without one.\n\n" +
          "The ride details block holds the ride type (the sample says Lyft Standard) and the pickup and drop-off, each with its time and address. Edit the times to match the trip, and the driver's name in the greeting at the top.",
      },
    ],
    faqs: [
      {
        question: "Can I download the Lyft receipt as a PDF?",
        answer:
          `Yes. Download a PDF or PNG with no account; free downloads carry a small watermark, and Pro from ${PASS_FROM} a week removes it.`,
      },
      {
        question: "Can I add a tip to the Lyft receipt?",
        answer: "Yes. The tip line is editable, and the total updates as you change it.",
      },
      {
        question: "Is this an official Lyft receipt?",
        answer:
          "No. Makecepeit is not affiliated with Lyft; your official receipt comes from Lyft itself.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("lyft.com"),
      businessName: "Lyft",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Fees & Tax",
      taxRate: 0,
      tip: 4.0,
      cashier: "",
      forcePaper: true,
      greeting: "Thanks for travelling with us!",
      grandTotalLabel: "Total Payable",
      showCardAuth: true,
      footerMessage: "",
      sections: [
        {
          title: "Ride details",
          rows: [
            { label: "Pickup", value: "1830 Palm Canyon Dr" },
            { label: "Drop-off", value: "870 Hawthorne Blvd" },
            { label: "Driver", value: "Amanda R." },
            { label: "Vehicle", value: "Toyota Camry" },
            { label: "License plate", value: "8GRJ123" },
          ],
        },
      ],
      policyText:
        "Have queries? Visit Lyft support for this ride. Fares shown are final and include all applicable taxes and fees. Thank you for choosing Lyft.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Base Fare", quantity: 1, price: 3.50 },
        { id: id(), name: "Distance (6.2 mi)", quantity: 1, price: 12.20 },
        { id: id(), name: "Time (18 min)", quantity: 1, price: 5.15 },
        { id: id(), name: "Service Fee", quantity: 1, price: 2.75 },
      ],
    },
  },
  {
    slug: "doordash",
    name: "DoorDash Receipt",
    shortName: "DoorDash",
    icon: "🥡",
    seoTitle: "Free DoorDash Receipt Generator — DoorDash Receipt Maker",
    seoDescription:
      "Create a DoorDash receipt online. Add food items, delivery and service fees, edit the prices, tip and date, then get a free watermarked PDF or PNG receipt.",
    heading: "DoorDash Receipt Generator",
    intro:
      "Create a DoorDash food delivery receipt with restaurant items, delivery fee, service fee, and driver tip.",
    useCases: [
      "Records of your own purchases",
      "A sample DoorDash receipt for a mockup or demo",
      "Travel meal documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the DoorDash receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("doordash.com"),
      businessName: "DoorDash",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Taxes",
      taxRate: 8.625,
      tip: 6.0,
      cashier: "",
      forcePaper: true,
      greeting: "Thanks for choosing DoorDash, Jack!",
      grandTotalLabel: "Grand Total",
      showCardAuth: true,
      footerMessage: "",
      sections: [
        {
          title: "Order details",
          rows: [
            { label: "Order No.", value: "#33123785031" },
            { label: "Placed", value: "12/02, 9:01 PM" },
            { label: "Delivered", value: "12/02, 9:28 PM" },
            { label: "Status", value: "Delivered" },
          ],
        },
        {
          title: "Delivery to",
          rows: [
            { value: "Jack" },
            { value: "458 Meadowbrook Lane, Portland, OR 97219" },
          ],
        },
        {
          title: "Ordered from",
          rows: [
            { value: "Thai Basil Kitchen" },
            { value: "874 Hawthorne Blvd, Portland, OR 97214" },
          ],
        },
      ],
      policyText:
        "This is an acknowledgement of delivery of the order and not an actual invoice. Menu prices and taxes are as provided by the restaurant to DoorDash.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Pad Thai (Chicken)", quantity: 1, price: 15.99 },
        { id: id(), name: "Spring Rolls (4pc)", quantity: 1, price: 7.99 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 3.99 },
        { id: id(), name: "Service Fee", quantity: 1, price: 4.50 },
      ],
    },
  },
  {
    slug: "uber-eats",
    name: "Uber Eats Receipt",
    shortName: "Uber Eats",
    icon: "🥡",
    seoTitle: "Free Uber Eats Receipt Generator — Uber Eats Receipt Maker",
    seoDescription:
      "Create an Uber Eats receipt online. Add food items, delivery and service fees, edit the prices, tip and date, then download a free watermarked PDF or PNG.",
    heading: "Uber Eats Receipt Generator",
    intro:
      "Create an Uber Eats food delivery receipt with restaurant items, fees, and tip.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Uber Eats purchases",
      "Business travel food documentation",
    ],
    guidance: [
      {
        heading: "Download an Uber Eats receipt as a PDF",
        body:
          `The order layout downloads as a print-ready PDF or a PNG with no account. The free download carries a small watermark, and Pro from ${PASS_FROM} a week removes it.`,
      },
      {
        heading: "Uber Eats order receipt example",
        body:
          "The sample is a takeout order of General Tso's chicken, vegetable fried rice and spring rolls, with the delivery address, courier and order lines, a delivery fee, a service fee, a tip and the total. Change the restaurant, dishes, fees and tip to match your order. The {link:/examples/uber-eats-receipt-order|Uber Eats receipt example} shows another.",
      },
      {
        heading: "Other delivery apps",
        body:
          "Ordered through another app? Use the {link:/brands/doordash|DoorDash}, {link:/brands/grubhub|Grubhub}, {link:/brands/postmates|Postmates} or {link:/brands/instacart|Instacart} receipt generator.",
      },
    ],
    faqs: [
      {
        question: "Can I download the Uber Eats receipt as a PDF?",
        answer:
          `Yes. Download a print-ready PDF or PNG; free downloads carry a watermark, and Pro from ${PASS_FROM} a week removes it.`,
      },
      {
        question: "Can I edit the delivery fee, service fee and tip?",
        answer:
          "Yes. Every fee, tip, tax rate and line item is editable with a live preview.",
      },
      {
        question: "Is this an official Uber Eats receipt?",
        answer:
          "No. It is an independent template, not issued by Uber, and not a proof of purchase.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("ubereats.com"),
      businessName: "Uber Eats",
      addressLine1: "Order from: Chinatown Express",
      addressLine2: "Washington, DC",
      phone: "",
      taxLabel: "Tax",
      taxRate: 10.0,
      tip: 5.0,
      cashier: "Courier: Sarah M.",
      footerMessage: "Get anything delivered with Uber Eats.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "General Tso's Chicken", quantity: 1, price: 14.50 },
        { id: id(), name: "Fried Rice (Lg)", quantity: 1, price: 8.50 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 2.49 },
        { id: id(), name: "Service Fee", quantity: 1, price: 3.89 },
      ],
    },
  },
  {
    slug: "grubhub",
    name: "Grubhub Receipt",
    shortName: "Grubhub",
    icon: "🥡",
    seoTitle: "Free Grubhub Receipt Generator — Grubhub Receipt Maker",
    seoDescription:
      "Create a Grubhub receipt online in seconds. Add food delivery items, service fees and tip, edit the prices and date, then get a free watermarked PDF or PNG.",
    heading: "Grubhub Receipt Generator",
    intro:
      "Create a Grubhub food delivery receipt with restaurant items, delivery fees, and tip.",
    useCases: [
      "Records of your own purchases",
      "Track Grubhub spending in a budget",
      "Personal budgeting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Grubhub receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("grubhub.com"),
      businessName: "Grubhub",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Taxes",
      taxRate: 10.25,
      tip: 4.50,
      cashier: "",
      forcePaper: true,
      grandTotalLabel: "TOTAL",
      showCardAuth: true,
      footerMessage: "",
      sections: [
        {
          title: "Order summary",
          rows: [
            { label: "Order ID", value: "947860487" },
            { label: "Order time", value: "26 Sep, 9:45 PM" },
            { label: "Restaurant", value: "Luigi's Pizzeria" },
            { label: "Address", value: "742 Linden Ave, Chicago, IL" },
          ],
        },
        {
          title: "Customer",
          rows: [
            { value: "Daniel Herrera" },
            { value: "1830 Palm Canyon Drive, Chicago, IL 60601" },
          ],
        },
      ],
      policyText:
        "Communication address: 1830 Palm Canyon Drive, Chicago, IL — Second floor, Apartment #3, ring the bell on the right.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Lg Margherita Pizza", quantity: 1, price: 16.99 },
        { id: id(), name: "Caesar Salad", quantity: 1, price: 8.99 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 4.99 },
        { id: id(), name: "Service Fee", quantity: 1, price: 3.99 },
      ],
    },
  },
  {
    slug: "postmates",
    name: "Postmates Receipt",
    shortName: "Postmates",
    icon: "🥡",
    seoTitle: "Free Postmates Receipt Generator — Postmates Receipt Maker",
    seoDescription:
      "Create a Postmates receipt online. Add delivery items, service fees and tip, edit the prices and date, then download a free watermarked PDF or PNG receipt.",
    heading: "Postmates Receipt Generator",
    intro:
      "Create a Postmates delivery receipt for food, groceries, or any on-demand delivery.",
    useCases: [
      "On-demand delivery documentation",
      "A sample Postmates receipt for a mockup or demo",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Postmates receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("postmates.com"),
      businessName: "Postmates",
      addressLine1: "267 Skyline Parkway, Atlanta, GA 30318",
      addressLine2: "",
      phone: "(404) 555-9123",
      taxLabel: "Tax",
      taxRate: 0,
      tip: 0,
      cashier: "",
      forcePaper: true,
      greeting: "Courier Service Receipt",
      grandTotalLabel: "Total",
      showCardAuth: true,
      footerMessage: "Thank you for choosing us!",
      sections: [
        {
          title: "Delivery",
          rows: [
            { label: "Recipient", value: "Emma Carrington" },
            { label: "Address", value: "158 Willowbrook Lane, Seattle, WA 98105" },
            { label: "Delivered by", value: "Justin T." },
            { label: "Method", value: "Express shipping" },
            { label: "Tracking", value: "1Z9X4A7821375965" },
          ],
        },
      ],
      policyText:
        "Please retain this receipt as proof of shipment and for all inquiries. Claims for damaged, lost, or misrouted items must be reported within 7 days of delivery. All fees, including express shipping and insurance, are non-refundable once the shipment is in transit.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Express Shipping (1-Day)", quantity: 1, price: 29.99 },
        { id: id(), name: "Packaging Materials (Box)", quantity: 2, price: 4.50 },
        { id: id(), name: "Shipment Insurance", quantity: 1, price: 7.50 },
      ],
    },
  },
  {
    slug: "instacart",
    name: "Instacart Receipt",
    shortName: "Instacart",
    icon: "🛒",
    seoTitle: "Free Instacart Receipt Generator — Instacart Receipt Maker",
    seoDescription:
      "Create an Instacart receipt online. Add grocery delivery items, service fees and tip, edit the prices and date, then download a free watermarked PDF or PNG.",
    heading: "Instacart Receipt Generator",
    intro:
      "Create an Instacart grocery delivery receipt with items, delivery fee, service fee, and shopper tip.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Instacart purchases",
      "Household grocery tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Instacart receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("instacart.com"),
      businessName: "Instacart",
      addressLine1: "Delivered from: Costco",
      addressLine2: "San Francisco, CA",
      phone: "",
      taxLabel: "Est. Tax",
      taxRate: 8.625,
      tip: 7.0,
      cashier: "Shopper: Daniel K.",
      footerMessage: "Groceries delivered in as fast as 1 hour.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Organic Bananas (bunch)", quantity: 1, price: 2.49 },
        { id: id(), name: "KS Rotisserie Chicken", quantity: 1, price: 4.99 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 3.99 },
        { id: id(), name: "Service Fee", quantity: 1, price: 5.49 },
      ],
    },
  },
  {
    slug: "airbnb",
    name: "Airbnb Receipt",
    shortName: "Airbnb",
    icon: "🏠",
    seoTitle: "Free Airbnb Receipt Generator — Airbnb Booking Receipt Maker",
    seoDescription:
      "Create an Airbnb receipt online in seconds. Add nightly rates, cleaning and service fees, edit the dates and totals, then get a free watermarked PDF or PNG.",
    heading: "Airbnb Receipt Generator",
    intro:
      "Make an Airbnb receipt with nightly rates, cleaning fees, and service charges for your own travel records.",
    useCases: [
      "Records of your own purchases",
      "Track Airbnb spending in a budget",
      "Rental host income documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Airbnb receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("airbnb.com"),
      businessName: "Airbnb",
      addressLine1: "Confirmation #HM7X9K2B",
      addressLine2: "San Francisco, CA 94103",
      phone: "",
      taxLabel: "Occupancy Taxes",
      taxRate: 14.0,
      footerMessage: "Belong Anywhere.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "2 Nights × $145.00", quantity: 1, price: 290.0 },
        { id: id(), name: "Cleaning Fee", quantity: 1, price: 75.0 },
        { id: id(), name: "Airbnb Service Fee", quantity: 1, price: 52.0 },
      ],
    },
  },
  {
    slug: "expedia",
    name: "Expedia Receipt",
    shortName: "Expedia",
    icon: "✈️",
    seoTitle: "Free Expedia Receipt Generator — Expedia Booking Receipt Maker",
    seoDescription:
      "Create an Expedia receipt online in seconds. Add hotel, flight and car rental bookings, edit the dates and charges, then get a free watermarked PDF or PNG.",
    heading: "Expedia Receipt Generator",
    intro:
      "Make an Expedia receipt for hotel bookings, flights, or car rentals for your own travel records.",
    useCases: [
      "Corporate travel booking documentation",
      "A sample Expedia receipt for a mockup or demo",
      "Multi-component trip tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Expedia receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("expedia.com"),
      businessName: "Expedia",
      addressLine1: "Itinerary #72849163058",
      addressLine2: "Seattle, WA 98101",
      phone: "(866) 310-5768",
      taxLabel: "Taxes & Fees",
      taxRate: 12.5,
      footerMessage: "Made To Travel.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Marriott Downtown (2 Nights)", quantity: 1, price: 298.0 },
        { id: id(), name: "Hotel Booking Fee", quantity: 1, price: 0.0 },
      ],
    },
  },
  {
    slug: "booking-com",
    name: "Booking.com Receipt",
    shortName: "Booking.com",
    icon: "🏨",
    seoTitle:
      "Free Booking.com Receipt Generator — Booking.com Receipt Maker",
    seoDescription:
      "Create a Booking.com receipt online. Add hotel booking details, nightly rates and fees, edit the dates, then download a free watermarked PDF or PNG receipt.",
    heading: "Booking.com Receipt Generator",
    intro:
      "Make a Booking.com receipt with hotel booking details, nightly rates, and taxes for your own travel records.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Booking.com purchases",
      "Conference travel documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Booking.com receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("booking.com"),
      businessName: "Booking.com",
      addressLine1: "Confirmation #1847293650",
      addressLine2: "Amsterdam, Netherlands",
      phone: "",
      taxLabel: "Taxes & City Tax",
      taxRate: 12.0,
      footerMessage: "Booking.yeah!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Double Room (3 Nights)", quantity: 1, price: 447.0 },
        { id: id(), name: "Breakfast Add-On", quantity: 3, price: 18.0 },
      ],
    },
  },
  {
    slug: "delta-airlines",
    name: "Delta Airlines Receipt",
    shortName: "Delta Airlines",
    icon: "✈️",
    seoTitle:
      "Free Delta Airlines Receipt Generator — Delta Receipt Maker",
    seoDescription:
      "Create a Delta Airlines receipt online. Add flight, baggage and upgrade charges, edit the route and dates, then get a free watermarked PDF or PNG receipt.",
    heading: "Delta Airlines Receipt Generator",
    intro:
      "Make a Delta Air Lines receipt with flight charges, seat upgrades, and checked baggage fees.",
    useCases: [
      "Records of your own purchases",
      "Track Delta boarding spending in a budget",
      "Travel expense records",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Delta Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("delta.com"),
      businessName: "Delta Air Lines",
      addressLine1: "Confirmation #GKLT7M",
      addressLine2: "Atlanta, GA 30354",
      phone: "(800) 221-1212",
      taxLabel: "US Excise Tax & Fees",
      taxRate: 7.5,
      footerMessage: "Keep Climbing.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "ATL → LAX (Main Cabin)", quantity: 1, price: 289.0 },
        { id: id(), name: "Comfort+ Upgrade", quantity: 1, price: 45.0 },
        { id: id(), name: "1st Checked Bag", quantity: 1, price: 35.0 },
      ],
    },
  },
  {
    slug: "american-airlines",
    name: "American Airlines Receipt",
    shortName: "American Airlines",
    icon: "✈️",
    seoTitle:
      "Free American Airlines Receipt Generator — AA Receipt Maker",
    seoDescription:
      "Create an American Airlines receipt online. Add flight and ancillary charges, edit the route, dates and totals, then download a free watermarked PDF or PNG.",
    heading: "American Airlines Receipt Generator",
    intro:
      "Make an American Airlines receipt with base fare, seat selection, and baggage fees.",
    useCases: [
      "Records of your own purchases",
      "A sample AA receipt for a mockup or demo",
      "Travel budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the American Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("aa.com"),
      businessName: "American Airlines",
      addressLine1: "Record Locator: RTYM4N",
      addressLine2: "Fort Worth, TX 76155",
      phone: "(800) 433-7300",
      taxLabel: "US Excise Tax & Fees",
      taxRate: 7.5,
      footerMessage: "The World's Largest Airline.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "DFW → JFK (Main Cabin)", quantity: 1, price: 314.0 },
        { id: id(), name: "Preferred Seat 12C", quantity: 1, price: 29.0 },
        { id: id(), name: "Checked Bag (1st)", quantity: 1, price: 35.0 },
      ],
    },
  },
  {
    slug: "united-airlines",
    name: "United Airlines Receipt",
    shortName: "United Airlines",
    icon: "✈️",
    seoTitle:
      "Free United Airlines Receipt Generator — United Receipt Maker",
    seoDescription:
      "Create a United Airlines receipt online. Add flight, baggage and service charges, edit the route and dates, then get a free watermarked PDF or PNG receipt.",
    heading: "United Airlines Receipt Generator",
    intro:
      "Make a United Airlines receipt with airfare, Economy Plus upgrades, and in-flight purchases.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of United purchases",
      "Corporate travel documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the United Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("united.com"),
      businessName: "United Airlines",
      addressLine1: "Confirmation #H4KM9W",
      addressLine2: "Chicago, IL 60666",
      phone: "(800) 864-8331",
      taxLabel: "US Excise Tax & Fees",
      taxRate: 7.5,
      footerMessage: "Good Leads The Way.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "ORD → SFO (Economy)", quantity: 1, price: 267.0 },
        { id: id(), name: "Economy Plus Upgrade", quantity: 1, price: 59.0 },
        { id: id(), name: "In-Flight WiFi", quantity: 1, price: 8.0 },
      ],
    },
  },
  {
    slug: "southwest-airlines",
    name: "Southwest Airlines Receipt",
    shortName: "Southwest Airlines",
    icon: "✈️",
    seoTitle:
      "Free Southwest Airlines Receipt Generator — Southwest Receipt Maker",
    seoDescription:
      "Create a Southwest Airlines receipt online in seconds. Add flights, fare class and extras, edit the route and dates, then get a free watermarked PDF or PNG.",
    heading: "Southwest Airlines Receipt Generator",
    intro:
      "Make a Southwest Airlines receipt with Wanna Get Away, Anytime, or Business Select fares.",
    useCases: [
      "Records of your own purchases",
      "Track Southwest spending in a budget",
      "Low-cost travel documentation",
    ],
    faqs: [
      {
        question:
          "Can I customize the items on the Southwest Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("southwest.com"),
      businessName: "Southwest Airlines",
      addressLine1: "Confirmation #R4HKJ7",
      addressLine2: "Dallas, TX 75235",
      phone: "(800) 435-9792",
      taxLabel: "US Excise Tax & Fees",
      taxRate: 7.5,
      footerMessage: "Low Fares. Nothing To Hide.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "DAL → DEN (Wanna Get Away)", quantity: 1, price: 149.0 },
        { id: id(), name: "EarlyBird Check-In", quantity: 1, price: 25.0 },
      ],
    },
  },
  {
    slug: "marriott",
    name: "Marriott Receipt",
    shortName: "Marriott",
    icon: "🏨",
    seoTitle: "Free Marriott Receipt Generator — Marriott Hotel Receipt Maker",
    seoDescription:
      "Create a Marriott receipt online. Add room charges, resort fees and incidentals, edit the dates and totals, then get a free watermarked PDF or PNG receipt.",
    heading: "Marriott Receipt Generator",
    intro:
      "Make a Marriott hotel receipt with room charges, resort fees, valet parking, and room service.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Marriott stays",
      "Conference travel documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Marriott receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("marriott.com"),
      businessName: "Marriott International",
      addressLine1: "Marriott Marquis Times Square",
      addressLine2: "New York, NY 10036",
      phone: "(212) 398-1900",
      taxLabel: "Room Tax & Fees",
      taxRate: 14.75,
      register: "Folio #847291",
      footerMessage: "Bonvoy Member — Thank You For Your Stay!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Deluxe King Room (2 Nights)", quantity: 1, price: 538.0 },
        { id: id(), name: "Destination Fee", quantity: 2, price: 25.0 },
        { id: id(), name: "Valet Parking", quantity: 1, price: 65.0 },
        { id: id(), name: "Room Service Breakfast", quantity: 1, price: 34.0 },
      ],
    },
  },
  {
    slug: "hilton",
    name: "Hilton Receipt",
    shortName: "Hilton",
    icon: "🏨",
    seoTitle: "Free Hilton Receipt Generator — Hilton Hotel Receipt Maker",
    seoDescription:
      "Create a Hilton receipt online. Add room charges, parking and dining, edit the stay dates and totals, then get a free watermarked PDF or PNG folio receipt.",
    heading: "Hilton Receipt Generator",
    intro:
      "Make a Hilton hotel receipt with room rates, parking, dining charges, and Hilton Honors points.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Hilton stays",
      "Loyalty points documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hilton receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("hilton.com"),
      businessName: "Hilton Hotels & Resorts",
      addressLine1: "Hilton Chicago",
      addressLine2: "Chicago, IL 60605",
      phone: "(312) 922-4400",
      taxLabel: "Room Tax",
      taxRate: 17.4,
      register: "Folio #391724",
      footerMessage: "Hilton Honors: 4,280 pts earned!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "King Room City View (3 Nights)", quantity: 1, price: 657.0 },
        { id: id(), name: "Self Parking", quantity: 3, price: 42.0 },
        { id: id(), name: "Restaurant Charge", quantity: 1, price: 47.50 },
      ],
    },
  },
  {
    slug: "hyatt",
    name: "Hyatt Receipt",
    shortName: "Hyatt",
    icon: "🏨",
    seoTitle: "Free Hyatt Receipt Generator — Hyatt Hotel Receipt Maker",
    seoDescription:
      "Create a Hyatt receipt online. Add room charges, spa and dining, edit the stay dates and totals, then get a free watermarked PDF or PNG hotel folio receipt.",
    heading: "Hyatt Receipt Generator",
    intro:
      "Make a Hyatt hotel receipt with room charges, spa treatments, and World of Hyatt loyalty details.",
    useCases: [
      "Luxury hotel stay documentation",
      "Keep your own record of Hyatt stays",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hyatt receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("hyatt.com"),
      businessName: "Hyatt Hotels Corporation",
      addressLine1: "Grand Hyatt San Francisco",
      addressLine2: "San Francisco, CA 94102",
      phone: "(415) 398-1234",
      taxLabel: "Room Tax & Tourism Fee",
      taxRate: 14.0,
      register: "Folio #628410",
      footerMessage: "World of Hyatt: 6,150 pts earned!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Grand King Room (2 Nights)", quantity: 1, price: 478.0 },
        { id: id(), name: "Resort/Destination Fee", quantity: 2, price: 35.0 },
        { id: id(), name: "In-Room Dining", quantity: 1, price: 42.0 },
      ],
    },
  },
  {
    slug: "hertz",
    name: "Hertz Receipt",
    shortName: "Hertz",
    icon: "🚙",
    seoTitle: "Free Hertz Receipt Generator — Hertz Rental Receipt Maker",
    seoDescription:
      "Create a Hertz car rental receipt online. Add rental days, fuel and insurance, edit the dates and charges, then get a free watermarked PDF or PNG receipt.",
    heading: "Hertz Receipt Generator",
    intro:
      "Make a Hertz car rental receipt with daily rate, fuel charges, and insurance options.",
    useCases: [
      "Records of your own purchases",
      "A sample Hertz rental receipt for a mockup or demo",
      "Travel fleet expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hertz receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("hertz.com"),
      businessName: "Hertz",
      addressLine1: "Rental Agreement #H41927384",
      addressLine2: "Estero, FL 33928",
      phone: "(800) 654-3131",
      taxLabel: "Taxes & Surcharges",
      taxRate: 11.5,
      footerMessage: "Let's Go! — Hertz Gold Plus Member",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Midsize Sedan — 3 Days", quantity: 1, price: 156.0 },
        { id: id(), name: "Fuel Service Option", quantity: 1, price: 42.0 },
        { id: id(), name: "Loss Damage Waiver", quantity: 3, price: 19.99 },
      ],
    },
  },
  {
    slug: "enterprise",
    name: "Enterprise Receipt",
    shortName: "Enterprise",
    icon: "🚙",
    seoTitle:
      "Free Enterprise Receipt Generator — Enterprise Rental Receipt Maker",
    seoDescription:
      "Create an Enterprise car rental receipt online. Add rental days, insurance and extras, edit the dates and charges, then download a free watermarked PDF or PNG.",
    heading: "Enterprise Receipt Generator",
    intro:
      "Make an Enterprise Rent-A-Car receipt with daily rates, insurance, and fuel charges.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Enterprise purchases",
      "Fleet rental documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Enterprise receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("enterprise.com"),
      businessName: "Enterprise Rent-A-Car",
      addressLine1: "Rental Agreement #E-58391047",
      addressLine2: "St. Louis, MO 63105",
      phone: "(800) 736-8222",
      taxLabel: "Taxes & Surcharges",
      taxRate: 10.85,
      footerMessage: "We'll Pick You Up!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Compact Car — 4 Days", quantity: 1, price: 172.0 },
        { id: id(), name: "Supplemental Liability Prot", quantity: 4, price: 15.99 },
        { id: id(), name: "Fuel Purchase Option", quantity: 1, price: 38.50 },
      ],
    },
  },
  {
    slug: "avis",
    name: "Avis Receipt",
    shortName: "Avis",
    icon: "🚙",
    seoTitle: "Free Avis Receipt Generator — Avis Rental Receipt Maker",
    seoDescription:
      "Create an Avis car rental receipt online. Add rental days, insurance and extras, edit the dates and charges, then get a free watermarked PDF or PNG receipt.",
    heading: "Avis Receipt Generator",
    intro:
      "Make an Avis car rental receipt with daily rates, roadside assistance, and GPS add-ons.",
    useCases: [
      "Corporate rental car documentation",
      "Track Avis spending in a budget",
      "Travel fleet tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Avis receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("avis.com"),
      businessName: "Avis Rent A Car",
      addressLine1: "Rental Agreement #A-729184630",
      addressLine2: "Parsippany, NJ 07054",
      phone: "(800) 352-7900",
      taxLabel: "Taxes & Surcharges",
      taxRate: 11.625,
      footerMessage: "We Try Harder.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Full-Size Sedan — 2 Days", quantity: 1, price: 112.0 },
        { id: id(), name: "GPS Navigation Unit", quantity: 2, price: 13.99 },
        { id: id(), name: "Roadside Safety Net", quantity: 2, price: 7.99 },
      ],
    },
  },
  {
    slug: "7-eleven",
    name: "7-Eleven Receipt",
    shortName: "7-Eleven",
    icon: "🏪",
    seoTitle: "Free 7-Eleven Receipt Generator — 7-Eleven Receipt Maker",
    seoDescription:
      "Create a 7-Eleven receipt online. Add Slurpees, snacks, drinks and fuel, edit the items, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "7-Eleven Receipt Generator",
    intro:
      "Create a 7-Eleven receipt with Slurpees, Big Gulps, snacks, and fuel for mileage and expense logs.",
    useCases: [
      "Road trip fuel receipts",
      "A sample 7-Eleven receipt for a mockup or demo",
      "Convenience store expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the 7-Eleven receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("7-eleven.com"),
      businessName: "7-Eleven",
      // Replaced by lib/brand-specs.ts; the real store's address once sat here.
      addressLine1: "100 Sample St",
      addressLine2: "Denver, CO 80202",
      phone: "",
      taxLabel: "Sales Tax",
      taxRate: 8.25,
      register: "Store #00000",
      fontFamily: "mono",
      headerAlign: "center",
      ruleStyle: "dashed",
      greeting: "--== SALE TRANSACTION ==--",
      itemStyle: "lined",
      grandTotalLabel: "TOTAL DUE",
      showCardAuth: true,
      footerMessage: "THANKS FOR SHOPPING HERE — WE WILL SEE YOU SOON",
      policyText: "Your opinion counts! Enter to win 1 of 50 $25 gas gift cards. Provide feedback at www.gasvisit.com",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Big Gulp (32 oz)", quantity: 1, price: 2.49 },
        { id: id(), name: "Hot Dog", quantity: 1, price: 1.99 },
        { id: id(), name: "Doritos (9.75 oz)", quantity: 1, price: 3.49 },
        { id: id(), name: "AA Batteries (12-pack)", quantity: 1, price: 6.99 },
      ],
    },
  },
  {
    slug: "shell",
    name: "Shell Receipt",
    shortName: "Shell",
    icon: "⛽",
    seoTitle: "Free Shell Receipt Generator — Shell Gas Receipt Maker",
    seoDescription:
      "Create a Shell gas station receipt online. Add fuel gallons and convenience items, edit the prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Shell Receipt Generator",
    intro:
      "Create a Shell gas station receipt with fuel purchases and convenience store items for mileage logs.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Shell gas purchases",
      "Fleet fuel tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Shell receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("shell.com"),
      businessName: "Shell",
      addressLine1: "Pump #6 — 910 Main St",
      addressLine2: "Houston, TX 77002",
      phone: "(713) 241-6161",
      taxLabel: "Tax",
      taxRate: 8.25,
      register: "Pump #06",
      footerMessage: "Fuel Rewards Member — Savings Applied!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "V-Power 93 Octane 12.4 Gal", quantity: 1, price: 47.12 },
        { id: id(), name: "Smartwater 1L", quantity: 1, price: 2.49 },
      ],
    },
  },
  {
    slug: "chevron",
    name: "Chevron Receipt",
    shortName: "Chevron",
    icon: "⛽",
    seoTitle: "Chevron Receipt Generator — Make a Chevron Gas Receipt",
    seoDescription:
      "Chevron receipt generator: set the pump, fuel grade, gallons and price per gallon, then get a PDF or PNG. The free download is watermarked; Pro removes it.",
    heading: "Chevron Receipt Generator — Chevron Gas Station Receipt",
    intro:
      "Create a Chevron-style gas station receipt: the fuel grade, gallons and price per gallon, any store items, the tax and the total, then download it as a PDF or PNG.",
    useCases: [
      "Records of your own purchases",
      "Track Chevron spending in a budget",
      "Mileage and fuel tracking",
    ],
    guidance: [
      {
        heading: "Fuel lines: gallons at a price per gallon",
        body:
          "Enter the gallons as the quantity and the price per gallon as the price on the fuel line (the sample line is Regular/Self), and the line total and the receipt total follow. The invoice number, auth number and the last four card digits are editable lines under the total.",
      },
      {
        heading: "Add snacks and drinks from the store",
        body:
          "Add convenience items as extra lines under the fuel, each with its own price, and set the sales tax rate for your area. The {link:/examples/chevron-receipt-gas|Chevron receipt example} shows a fill-up with a store item.",
      },
      {
        heading: "Fuel receipts for your own mileage records",
        body:
          "Make one receipt per fill-up to keep a running record of what you spend on fuel. Makecepeit is not affiliated with Chevron, and a receipt made here is not proof of purchase.",
      },
    ],
    faqs: [
      {
        question: "Can I change the gallons and price per gallon?",
        answer:
          "Yes. Enter the gallons as the quantity and the price per gallon as the price, and the total updates.",
      },
      {
        question: "Can I add store items to a Chevron receipt?",
        answer:
          "Yes. Add any number of convenience lines and set the tax rate for your area.",
      },
      {
        question: "Is the download free?",
        answer:
          `A watermarked PDF or PNG is free with no account; Pro from ${PASS_FROM} a week removes the watermark.`,
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("chevron.com"),
      businessName: "Chevron",
      addressLine1: "Pump #3 — 6001 Bollinger Canyon Rd",
      addressLine2: "San Ramon, CA 94583",
      phone: "(925) 842-1000",
      taxLabel: "Tax",
      taxRate: 9.25,
      register: "Pump #03",
      footerMessage: "Chevron With Techron — Accept No Substitutes.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Supreme 91 Oct 11.8 Gal", quantity: 1, price: 52.98 },
        { id: id(), name: "Red Bull 12oz", quantity: 1, price: 3.99 },
      ],
    },
  },
  {
    slug: "exxon",
    name: "Exxon Receipt",
    shortName: "Exxon",
    icon: "⛽",
    seoTitle: "Free Exxon Receipt Generator — Exxon Gas Receipt Maker",
    seoDescription:
      "Create an Exxon gas station receipt online. Add fuel gallons and snacks, edit the prices, tax, pump and date, then download a free watermarked PDF or PNG.",
    heading: "Exxon Receipt Generator",
    intro:
      "Create an Exxon gas station receipt with Synergy fuel and convenience purchases.",
    useCases: [
      "Records of your own purchases",
      "A sample Exxon gas receipt for a mockup or demo",
      "Company vehicle fuel tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Exxon receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("exxon.com"),
      businessName: "Exxon",
      addressLine1: "Pump #8 — 5959 Las Colinas Blvd",
      addressLine2: "Irving, TX 75039",
      phone: "(972) 940-6000",
      taxLabel: "Tax",
      taxRate: 8.25,
      register: "Pump #08",
      footerMessage: "Synergy™ Fuel — Engineered To Help.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular 87 Oct 14.2 Gal", quantity: 1, price: 44.59 },
        { id: id(), name: "Gatorade 28oz", quantity: 1, price: 2.79 },
        { id: id(), name: "Car Wash — Basic", quantity: 1, price: 8.99 },
      ],
    },
  },
  {
    slug: "mobil",
    name: "Mobil Receipt",
    shortName: "Mobil",
    icon: "⛽",
    seoTitle: "Free Mobil Receipt Generator — Mobil Gas Receipt Maker",
    seoDescription:
      "Create a Mobil gas station receipt online. Add fuel purchases and car care items, edit the gallons, prices and date, then get a free watermarked PDF or PNG.",
    heading: "Mobil Receipt Generator",
    intro:
      "Create a Mobil gas station receipt with Synergy Supreme+ fuel and On the Run® convenience items.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of Mobil gas purchases",
      "Fleet fuel documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Mobil receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("mobil.com"),
      businessName: "Mobil",
      addressLine1: "Pump #5 — 3225 Gallows Rd",
      addressLine2: "Fairfax, VA 22037",
      phone: "(703) 846-3000",
      taxLabel: "Tax",
      taxRate: 6.0,
      register: "Pump #05",
      footerMessage: "Mobil Synergy Supreme+ — Drive With Confidence.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Plus 89 Oct 13.1 Gal", quantity: 1, price: 42.77 },
        { id: id(), name: "Coffee 16oz", quantity: 1, price: 1.99 },
      ],
    },
  },
  {
    slug: "bp",
    name: "BP Receipt",
    shortName: "BP",
    icon: "⛽",
    seoTitle: "Free BP Receipt Generator — BP Gas Receipt Maker",
    seoDescription:
      "Create a BP gas station receipt online. Add fuel and ampm convenience items, edit the gallons, prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "BP Receipt Generator",
    intro:
      "Create a BP gas station receipt with Invigorate® fuel and ampm convenience store items.",
    useCases: [
      "Road trip fuel documentation",
      "Track BP gas spending in a budget",
      "Commercial fuel tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the BP receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("bp.com"),
      businessName: "BP",
      addressLine1: "NH10 Service Station",
      addressLine2: "Houston, TX 77079",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      register: "Pump #02",
      grandTotalLabel: "Sale",
      showCardAuth: true,
      footerMessage: "Thank you! Visit Again",
      sections: [
        {
          title: "Fuel details",
          rows: [
            { label: "TIN", value: "06463800987" },
            { label: "Vehicle No.", value: "DL-4C-AB-0556" },
            { label: "Fuel type", value: "Diesel" },
            { label: "Rate / gal", value: "$3.29" },
            { label: "Volume", value: "32.14 gal" },
          ],
        },
      ],
      paperStyle: "thermal",
      items: [{ id: id(), name: "Diesel (32.14 gal)", quantity: 1, price: 105.67 }],
    },
  },
  {
    slug: "speedway",
    name: "Speedway Receipt",
    shortName: "Speedway",
    icon: "⛽",
    seoTitle: "Free Speedway Receipt Generator — Speedway Gas Receipt Maker",
    seoDescription:
      "Create a Speedway receipt online. Add fuel and Speedy Rewards items, edit the gallons, prices, tax and date, then get a free watermarked PDF or PNG receipt.",
    heading: "Speedway Receipt Generator",
    intro:
      "Create a Speedway gas station receipt with fuel purchases and Speedy Rewards points.",
    useCases: [
      "Fuel purchase documentation",
      "A sample Speedway receipt for a mockup or demo",
      "Rewards points tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Speedway receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("speedway.com"),
      businessName: "Speedway",
      addressLine1: "Pump #2 — 539 S Main St",
      addressLine2: "Findlay, OH 45840",
      phone: "(419) 422-2121",
      taxLabel: "Tax",
      taxRate: 7.25,
      register: "Pump #02",
      footerMessage: "Speedy Rewards Pts Earned: 840",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular 87 Oct 10.9 Gal", quantity: 1, price: 34.01 },
        { id: id(), name: "Speedy Café Coffee 20oz", quantity: 1, price: 1.49 },
        { id: id(), name: "Snickers Bar", quantity: 1, price: 1.99 },
      ],
    },
  },
  {
    slug: "wawa",
    name: "Wawa Receipt",
    shortName: "Wawa",
    icon: "🏪",
    seoTitle: "Free Wawa Receipt Generator — Wawa Receipt Maker",
    seoDescription:
      "Create a Wawa receipt online in seconds. Add hoagies, coffee, snacks and fuel, edit the items, prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "Wawa Receipt Generator",
    intro:
      "Create a Wawa receipt with custom hoagies, fresh coffee, and fuel for East Coast travel logs.",
    useCases: [
      "East Coast road trip receipts",
      "Keep your own record of Wawa purchases",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Wawa receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("wawa.com"),
      businessName: "Wawa",
      addressLine1: "260 W Baltimore Pike",
      addressLine2: "Wawa, PA 19063",
      phone: "(610) 358-8000",
      taxLabel: "Tax",
      taxRate: 6.0,
      register: "Store #862",
      footerMessage: "Gottahava Wawa! Rewards Pts: 215",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Classic Italian Hoagie 10\"", quantity: 1, price: 7.99 },
        { id: id(), name: "Wawa Coffee 24oz", quantity: 1, price: 2.09 },
        { id: id(), name: "Reg Unleaded 9.8 Gal", quantity: 1, price: 33.32 },
      ],
    },
  },
  {
    slug: "quiktrip",
    name: "QuikTrip Receipt",
    shortName: "QuikTrip",
    icon: "🏪",
    seoTitle: "Free QuikTrip Receipt Generator — QuikTrip Receipt Maker",
    seoDescription:
      "Create a QuikTrip receipt online in seconds. Add fuel, drinks and QT Kitchen items, edit the prices, tax and date, then download a watermarked PDF or PNG free.",
    heading: "QuikTrip Receipt Generator",
    intro:
      "Create a QuikTrip receipt with fuel, QT Kitchen fresh food, and convenience items.",
    useCases: [
      "Southern road trip fuel receipts",
      "Track QT spending in a budget",
      "Fleet fuel documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the QuikTrip receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("quiktrip.com"),
      businessName: "QuikTrip Service Station",
      addressLine1: "350 W Chicago Ave",
      addressLine2: "Chicago, IL 60654",
      phone: "",
      taxLabel: "Taxes",
      taxRate: 8.5,
      register: "",
      fontFamily: "mono",
      headerAlign: "center",
      ruleStyle: "dashed",
      itemStyle: "lined",
      itemHeader: { left: "Item:", right: "Price:" },
      showCardAuth: true,
      footerMessage: "Complete a survey — Thank you! Please Come Again!",
      policyText: "Complete a survey at www.gasvisit.com — register to win.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Monster Energy Drink (16 oz)", quantity: 1, price: 3.29 },
        { id: id(), name: "Snickers Bar (1.86 oz)", quantity: 1, price: 1.49 },
        { id: id(), name: "Lays Chips (2.75 oz)", quantity: 1, price: 10.0 },
      ],
    },
  },
  {
    slug: "sheetz",
    name: "Sheetz Receipt",
    shortName: "Sheetz",
    icon: "🏪",
    seoTitle: "Free Sheetz Receipt Generator — Sheetz Receipt Maker",
    seoDescription:
      "Create a Sheetz receipt online. Add MTO food, fuel and drinks, edit the items, prices, tax and date, then get a free watermarked PDF or PNG store receipt.",
    heading: "Sheetz Receipt Generator",
    intro:
      "Create a Sheetz receipt with Made-To-Order food, fuel, and Sheetz Bros coffee.",
    useCases: [
      "Mid-Atlantic travel receipts",
      "A sample Sheetz receipt for a mockup or demo",
      "Road trip expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sheetz receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("sheetz.com"),
      businessName: "Sheetz",
      addressLine1: "Store #001 — 5700 Sixth Ave",
      addressLine2: "Altoona, PA 16602",
      phone: "(814) 946-3611",
      taxLabel: "Tax",
      taxRate: 6.0,
      register: "Order #SHZ891",
      footerMessage: "Sheetz — Total Customer Buzz!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "MTO Chicken Finger Sub", quantity: 1, price: 6.99 },
        { id: id(), name: "Sheetz Bros Coffee Lg", quantity: 1, price: 1.99 },
        { id: id(), name: "Reg Unleaded 11.2 Gal", quantity: 1, price: 36.96 },
      ],
    },
  },
  {
    slug: "barnes-noble",
    name: "Barnes & Noble Receipt",
    shortName: "Barnes & Noble",
    icon: "📚",
    seoTitle:
      "Free Barnes & Noble Receipt Generator — Barnes & Noble Receipt Maker",
    seoDescription:
      "Create a Barnes & Noble receipt online in seconds. Add books, NOOK devices and cafe items, edit the prices and tax, then get a free watermarked PDF or PNG.",
    heading: "Barnes & Noble Receipt Generator",
    intro:
      "Create a Barnes & Noble receipt with bestsellers, stationery, and café drinks.",
    useCases: [
      "Records of your own purchases",
      "Keep your own record of B&N purchases",
      "Education expense records",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Barnes & Noble receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("barnesandnoble.com"),
      businessName: "Barnes & Noble",
      addressLine1: "555 Fifth Ave",
      addressLine2: "New York, NY 10017",
      phone: "(212) 697-3048",
      taxLabel: "Tax",
      taxRate: 8.875,
      register: "REG #03",
      cashier: "Bookseller: Alice",
      footerMessage: "B&N Member Discount Applied — Read More!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Atomic Habits (Paperback)", quantity: 1, price: 16.99 },
        { id: id(), name: "Moleskine Classic Notebook", quantity: 1, price: 19.95 },
        { id: id(), name: "Café Mocha (Lg)", quantity: 1, price: 5.29 },
      ],
    },
  },
  {
    slug: "michaels",
    name: "Michaels Receipt",
    shortName: "Michaels",
    icon: "🎨",
    seoTitle: "Free Michaels Receipt Generator — Michaels Receipt Maker",
    seoDescription:
      "Create a Michaels receipt online. Add craft supplies, frames and floral items, edit the prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Michaels Receipt Generator",
    intro:
      "Create a Michaels receipt with craft supplies, picture frames, and seasonal décor.",
    useCases: [
      "Records of your own purchases",
      "Track Michaels spending in a budget",
      "Art project expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Michaels receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("michaels.com"),
      businessName: "Michaels",
      addressLine1: "3939 W John Carpenter Fwy",
      addressLine2: "Irving, TX 75063",
      phone: "(972) 409-1300",
      taxLabel: "Tax",
      taxRate: 8.25,
      register: "REG #05",
      footerMessage: "Where Creativity Happens. 20% OFF Coupon Inside!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Cricut Joy Machine", quantity: 1, price: 149.99 },
        { id: id(), name: "Acrylic Paint Set 24pk", quantity: 1, price: 12.99 },
        { id: id(), name: "11x14 Gallery Frame", quantity: 2, price: 14.99 },
      ],
    },
  },
  {
    slug: "joann",
    name: "Joann Receipt",
    shortName: "Joann",
    icon: "🧵",
    seoTitle: "Free Joann Receipt Generator — Joann Fabric Receipt Maker",
    seoDescription:
      "Create a Joann receipt online. Add fabric, sewing notions and craft supplies, edit the prices, tax and date, then get a free watermarked PDF or PNG receipt.",
    heading: "Joann Receipt Generator",
    intro:
      "Create a Joann Fabrics receipt with fabric yardage, sewing supplies, and crafting materials.",
    useCases: [
      "Sewing project expense tracking",
      "A sample Joann receipt for a mockup or demo",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Joann receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("joann.com"),
      businessName: "JOANN Fabric and Craft",
      addressLine1: "5555 Darrow Rd",
      addressLine2: "Hudson, OH 44236",
      phone: "(330) 656-2600",
      taxLabel: "Tax",
      taxRate: 7.25,
      register: "REG #02",
      footerMessage: "JOANN — The creative heart of America.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Cotton Fabric (3 yds @ $8.99/yd)", quantity: 1, price: 26.97 },
        { id: id(), name: "Singer Sewing Needles Asst", quantity: 1, price: 3.99 },
        { id: id(), name: "Gutermann Thread 110yd", quantity: 3, price: 3.49 },
      ],
    },
  },
  {
    slug: "zara",
    name: "Zara Receipt",
    shortName: "Zara",
    icon: "👗",
    seoTitle: "Free Zara Receipt Generator — Zara Receipt Maker",
    seoDescription:
      "Create a Zara receipt online in seconds. Add clothing, shoes and accessories, edit the items, prices, tax and date, then download a watermarked PDF free.",
    heading: "Zara Receipt Generator",
    intro:
      "Create a Zara fashion receipt with on-trend clothing, shoes, and accessories.",
    useCases: [
      "Fashion purchase documentation",
      "Keep your own record of Zara purchases",
      "Personal wardrobe budgeting",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Zara receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("zara.com"),
      logoText: "ZARA",
      businessName: "Zara New York Broadway",
      addressLine1: "503 Broadway",
      addressLine2: "New York, NY 10012",
      phone: "(212) 334-8888",
      website: "",
      taxLabel: "Sales Tax",
      taxRate: 7.0,
      register: "",
      fontFamily: "mono",
      headerAlign: "center",
      ruleStyle: "dashed",
      itemStyle: "lined",
      itemHeader: { left: "Description:", right: "Price:" },
      hideStoreLine: true,
      showCardAuth: true,
      policyText:
        "Zara is happy to offer product exchanges within 30 days of the purchase date, in accordance with any applicable legal guarantees. This exchange policy does not cover personalized items, made-to-order products, cosmetics, or fragrances. Please note that no exceptions to these requirements will be accepted.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Wool Blend Tailored Coat", quantity: 1, price: 320.0 },
        { id: id(), name: "Crystal Embellished Heels", quantity: 1, price: 280.0 },
      ],
    },
  },
  {
    slug: "h-m",
    name: "H&M Receipt",
    shortName: "H&M",
    icon: "👕",
    seoTitle: "Free H&M Receipt Generator — H&M Receipt Maker",
    seoDescription:
      "Create an H&M receipt online. Add affordable fashion and conscious collection items, edit the prices and tax, then download a free watermarked PDF or PNG.",
    heading: "H&M Receipt Generator",
    intro:
      "Create an H&M receipt with affordable fashion essentials, basics, and Conscious Collection items.",
    useCases: [
      "Fashion expense records",
      "Track H&M spending in a budget",
      "Wardrobe budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the H&M receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a print-ready PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("hm.com"),
      businessName: "H&M",
      addressLine1: "505 Fifth Ave",
      addressLine2: "New York, NY 10017",
      phone: "(212) 457-8024",
      taxLabel: "Tax",
      taxRate: 8.875,
      register: "REG #11",
      footerMessage: "H&M Member — 10% Welcome Offer Applied!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Slim Fit Oxford Shirt", quantity: 1, price: 24.99 },
        { id: id(), name: "Regular Fit Jeans", quantity: 1, price: 29.99 },
        { id: id(), name: "3-Pack Cotton Tees", quantity: 1, price: 14.99 },
        { id: id(), name: "Canvas Tote Bag", quantity: 1, price: 9.99 },
      ],
    },
  },
  {
    slug: "fedex",
    name: "FedEx Receipt",
    shortName: "FedEx",
    icon: "📦",
    seoTitle: "Free FedEx Receipt Generator — Shipping Receipt Maker",
    seoDescription:
      "Create a FedEx shipping receipt online. Add tracking, package weight and charges, edit the service and date, then get a free watermarked PDF or PNG receipt.",
    heading: "FedEx Receipt Generator",
    intro: "Generate a FedEx shipping receipt with ship-from/to details, tracking number and charges.",
    useCases: [
      "Shipping expense records",
      "A sample FedEx receipt for a mockup or demo",
      "Business mailing records",
    ],
    faqs: [
      {
        question: "Can I edit the FedEx receipt details?",
        answer:
          "Yes. Edit the addresses, tracking number, services and charges, then download a PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("fedex.com"),
      logoText: "FedEx",
      businessName: "FedEx Office",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      fontFamily: "mono",
      ruleStyle: "dashed",
      headerAlign: "center",
      greeting: "Shipment Receipt",
      grandTotalLabel: "Total",
      showCardAuth: true,
      qrCode: true,
      sections: [
        { title: "Ship from", rows: [{ value: "Acme Co." }, { value: "500 Market St, San Francisco, CA 94105" }] },
        { title: "Ship to", rows: [{ value: "Jordan Lee" }, { value: "77 Pine Ave, Austin, TX 78701" }] },
        {
          title: "Shipment",
          rows: [
            { label: "Service", value: "Priority Overnight" },
            { label: "Weight", value: "3.2 lb" },
            { label: "Tracking", value: "7712 8841 0093" },
          ],
        },
      ],
      policyText:
        "Keep this receipt for tracking and claims. Liability is limited per the FedEx Service Guide unless a higher value is declared.",
      items: [
        { id: id(), name: "Priority Overnight", quantity: 1, price: 28.9 },
        { id: id(), name: "Fuel Surcharge", quantity: 1, price: 4.35 },
      ],
    },
  },
  {
    slug: "paypal",
    name: "PayPal Receipt",
    shortName: "PayPal",
    icon: "💸",
    seoTitle: "Free PayPal Receipt Generator — Payment Receipt Maker",
    // 2026-11-16 misuse review: the page draws "fake paypal" queries, so the
    // copy says plainly what it is (a sample layout for your own records, with
    // a watermark on the free download) and drops the lost-receipt use case.
    seoDescription:
      `Lay out a PayPal-style payment receipt with payee, amount, fees and date for your own records. Free watermarked PDF or PNG; Pro from ${PASS_FROM} a week removes it.`,
    heading: "PayPal Receipt Generator",
    intro:
      "Lay out a PayPal-style payment receipt with payee, amount and transaction ID for your own records. It is a sample layout, not a confirmation from PayPal: only PayPal can confirm a payment.",
    useCases: [
      "Records of payments you sent or received",
      "Freelance and side-business bookkeeping",
      "Checkout and invoicing app mockups",
    ],
    faqs: [
      {
        question: "Can I customize the PayPal receipt?",
        answer: "Yes. Edit the payee, amount, note and transaction details, then download.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("paypal.com"),
      logoText: "PayPal",
      businessName: "PayPal",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      fontFamily: "sans",
      ruleStyle: "none",
      headerAlign: "center",
      greeting: "Payment Sent",
      hideItems: true,
      hideTotals: true,
      footerMessage: "Questions? Visit paypal.com/help",
      sections: [
        {
          rows: [
            { label: "To", value: "maria.lopez@email.com" },
            { label: "Amount", value: "$120.00 USD" },
            { label: "Date", value: "Jun 16, 2026" },
            { label: "Transaction ID", value: "7AB12345CD678901E" },
            { label: "Type", value: "Goods and Services" },
            { label: "Status", value: "Completed" },
            { label: "Fee", value: "$3.78" },
          ],
        },
      ],
      items: [{ id: id(), name: "Payment", quantity: 1, price: 120 }],
    },
  },
  {
    slug: "venmo",
    name: "Venmo Receipt",
    shortName: "Venmo",
    icon: "💵",
    seoTitle: "Free Venmo Receipt Generator — Payment Receipt Maker",
    seoDescription: "Create a Venmo payment receipt online. Add the note, amount, sender and transaction details, edit the date, then get a free watermarked PDF or PNG receipt.",
    heading: "Venmo Receipt Generator",
    intro: "Generate a Venmo payment receipt with recipient, amount, note and transaction ID.",
    useCases: [
      "Peer payment records",
      "Keep your own record of Venmo purchases",
      "Shared expense tracking",
    ],
    faqs: [
      {
        question: "Can I edit the Venmo receipt?",
        answer:
          "Yes. Edit the recipient, amount, note and details, then download a PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("venmo.com"),
      logoText: "venmo",
      businessName: "Venmo",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      fontFamily: "sans",
      ruleStyle: "none",
      headerAlign: "center",
      greeting: "You paid Alex Rivera",
      hideItems: true,
      hideTotals: true,
      footerMessage: "Pay. Get paid. Shop.",
      sections: [
        {
          rows: [
            { label: "Amount", value: "$45.00" },
            { label: "Note", value: "Dinner 🍜" },
            { label: "Date", value: "Jun 16, 2026 at 7:42 PM" },
            { label: "Transaction ID", value: "3920184756" },
            { label: "Funding source", value: "Venmo balance" },
          ],
        },
      ],
      items: [{ id: id(), name: "Payment", quantity: 1, price: 45 }],
    },
  },
  // Cash App and Zelle (added 2026-10-19). Fields are limited to what each
  // company's own help pages say a payment record shows — Cash App: the
  // Activity tab lists status, date, amount and payment method, receipts carry
  // the $cashtag and a transaction number; Zelle: payments live in your bank's
  // app, are sent to an enrolled email or U.S. mobile number and show as
  // pending or completed. Zelle's pages do not describe a confirmation number
  // (it varies by bank), so the template does not invent one.
  {
    slug: "cash-app",
    name: "Cash App Receipt",
    shortName: "Cash App",
    icon: "💲",
    seoTitle: "Cash App Receipt Generator — Payment Receipt Template",
    seoDescription:
      "Make a receipt for a Cash App payment you sent or received: $Cashtag, amount, date and time, payment method, status and identifier, as a PDF or PNG.",
    heading: "Cash App Receipt Generator",
    intro:
      "Make a written receipt for a Cash App payment that actually happened, laid out like the payment details in the app: the $Cashtag, amount, date and time, payment method, status and identifier.",
    useCases: [
      "A receipt for rent paid or collected through Cash App",
      "Records for a sale or freelance job paid by $Cashtag",
      "Bookkeeping copies when you split costs with roommates",
    ],
    faqs: [
      {
        question: "Where do I find my Cash App payment details?",
        answer:
          "Open the Activity tab in Cash App, or Activity on the web, and select the payment. Its receipt shows the details Cash App holds for it, and that record is the official one.",
      },
      {
        question: "What does a Cash App payment receipt show?",
        answer:
          "Who the payment went to or came from by $Cashtag, the amount, the date and time, the payment method (such as Cash balance or a linked card), the status, and a transaction identifier.",
      },
      {
        question: "When would I make my own Cash App receipt?",
        answer:
          "When someone you sold to, rented to or worked for wants a receipt with your name and their details on it, or when you want a tidy copy of a real payment for your books. Fill in the payment exactly as it appears in your Cash App activity.",
      },
      {
        question: "Can I edit the fields?",
        answer:
          "Yes. Edit the $Cashtag, amount, date, payment method, status and identifier, then download a PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("cash.app"),
      logoText: "Cash App",
      businessName: "Cash App",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      fontFamily: "sans",
      ruleStyle: "none",
      headerAlign: "center",
      greeting: "Payment to $JordanLee",
      hideItems: true,
      hideTotals: true,
      footerMessage: "Keep this receipt with your records.",
      sections: [
        {
          rows: [
            { label: "Amount", value: "$850.00" },
            { label: "To", value: "$JordanLee" },
            { label: "For", value: "October rent" },
            { label: "Date", value: "Oct 1, 2026 at 9:14 AM" },
            { label: "Payment method", value: "Cash balance" },
            { label: "Status", value: "Completed" },
            { label: "Identifier", value: "#D7K2MQ9" },
          ],
        },
      ],
      items: [{ id: id(), name: "Payment", quantity: 1, price: 850 }],
    },
  },
  {
    slug: "zelle",
    name: "Zelle Receipt",
    shortName: "Zelle",
    icon: "🏦",
    seoTitle: "Zelle Receipt Generator — Payment Receipt Template",
    seoDescription:
      "Make a receipt for a Zelle payment you sent or received: sender, recipient, bank, amount, date and status, ready to download as a PDF or PNG.",
    heading: "Zelle Receipt Generator",
    intro:
      "Make a written receipt for a Zelle payment that actually happened: who sent it, who received it at which email or mobile number, the bank account it left, the amount, the date and the status.",
    useCases: [
      "A receipt for rent a tenant paid by Zelle",
      "Records for a sale or freelance invoice settled by Zelle",
      "Bookkeeping copies of shared bills and split costs",
    ],
    faqs: [
      {
        question: "Where do I find my Zelle payment details?",
        answer:
          "Zelle runs inside your bank's or credit union's app and online banking, so the payment appears in that bank's payment activity. That bank record is the official one, and what it shows varies from bank to bank.",
      },
      {
        question: "What does a Zelle payment record show?",
        answer:
          "The sender and recipient, the recipient's enrolled email address or U.S. mobile number, the amount, the date and a status such as pending or completed. Many banks add their own reference number; copy it from your bank's activity if you want it on the receipt.",
      },
      {
        question: "When would I make my own Zelle receipt?",
        answer:
          "When a tenant, customer or client asks for a receipt for a Zelle payment they made, or when you want a clean copy of a real payment for your books. Fill it in exactly as the payment appears in your bank's activity.",
      },
      {
        question: "Can I edit the fields?",
        answer:
          "Yes. Edit the sender, recipient, bank, amount, date and status, then download a PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("zelle.com"),
      logoText: "Zelle",
      businessName: "Zelle",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      fontFamily: "sans",
      ruleStyle: "none",
      headerAlign: "center",
      greeting: "Payment sent with Zelle",
      hideItems: true,
      hideTotals: true,
      footerMessage: "Keep this receipt with your records.",
      sections: [
        {
          rows: [
            { label: "From", value: "Maria Lopez" },
            { label: "Bank", value: "Checking ••4821" },
            { label: "To", value: "Sam Carter" },
            { label: "Sent to", value: "sam.carter@email.com" },
            { label: "Amount", value: "$320.00" },
            { label: "Date", value: "Oct 12, 2026" },
            { label: "Status", value: "Completed" },
          ],
        },
      ],
      items: [{ id: id(), name: "Payment", quantity: 1, price: 320 }],
    },
  },
  {
    slug: "gucci",
    name: "Gucci Receipt",
    shortName: "Gucci",
    icon: "👜",
    seoTitle: "Free Gucci Receipt Generator — Luxury Boutique Receipt Maker",
    seoDescription: "Create a Gucci boutique receipt online. Add designer bags, apparel and accessories, edit the prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Gucci Receipt Generator",
    intro: "Create a Gucci boutique receipt with designer items, boutique details and card payment.",
    useCases: [
      "Luxury purchase documentation",
      "Track boutique spending in a budget",
      "Insurance and household inventory records",
    ],
    faqs: [
      {
        question: "Can I customize the Gucci receipt?",
        answer:
          "Yes. Edit the boutique, items and prices, then download a print-ready PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("gucci.com"),
      logoText: "GUCCI",
      businessName: "Gucci Fifth Avenue",
      addressLine1: "725 Fifth Avenue",
      addressLine2: "New York, NY 10022",
      phone: "(212) 826-2600",
      taxLabel: "Sales Tax",
      taxRate: 8.875,
      fontFamily: "playfair",
      ruleStyle: "dashed",
      headerAlign: "center",
      itemStyle: "lined",
      itemHeader: { left: "Description", right: "Price" },
      showCardAuth: true,
      policyText:
        "Exchanges accepted within 14 days with original receipt and tags. Made-to-order, personalized and fragrance items are final sale.",
      items: [
        { id: id(), name: "GG Marmont Leather Bag", quantity: 1, price: 2980 },
        { id: id(), name: "Ace Leather Sneakers", quantity: 1, price: 790 },
      ],
    },
  },
  {
    slug: "rolex",
    name: "Rolex Receipt",
    shortName: "Rolex",
    icon: "⌚",
    seoTitle: "Free Rolex Receipt Generator — Luxury Watch Receipt Maker",
    seoDescription: "Create a Rolex retailer receipt online. Add a luxury timepiece, model, reference and price, edit the date, then get a free watermarked PDF or PNG receipt.",
    heading: "Rolex Receipt Generator",
    intro:
      "Create an authorized-dealer Rolex receipt with the model, reference number and card payment.",
    useCases: ["Timepiece purchase records", "Insurance documentation", "Resale provenance"],
    faqs: [
      {
        question: "Can I edit the Rolex receipt?",
        answer: "Yes. Edit the dealer, model and price, then download a print-ready PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("rolex.com"),
      logoText: "ROLEX",
      businessName: "Official Rolex Retailer",
      addressLine1: "Bond Street Boutique",
      addressLine2: "London W1S 2RX",
      phone: "+44 20 7493 0000",
      taxLabel: "VAT",
      taxRate: 20,
      fontFamily: "playfair",
      ruleStyle: "dotted",
      headerAlign: "center",
      itemStyle: "lined",
      showCardAuth: true,
      sections: [
        {
          title: "Timepiece",
          rows: [
            { label: "Model", value: "Submariner Date" },
            { label: "Reference", value: "126610LN" },
            { label: "Serial", value: "7DES-X42" },
          ],
        },
      ],
      policyText:
        "This watch is covered by the Rolex international five-year guarantee. Retain this receipt as proof of purchase.",
      items: [{ id: id(), name: "Submariner Date 41mm", quantity: 1, price: 10900 }],
    },
  },
  {
    slug: "louis-vuitton",
    name: "Louis Vuitton Receipt",
    shortName: "Louis Vuitton",
    icon: "👜",
    seoTitle: "Free Louis Vuitton Receipt Generator — Luxury Receipt Maker",
    seoDescription: "Create a Louis Vuitton store receipt online. Add designer bags, apparel and accessories, edit the prices, tax and date, then get a free watermarked PDF or PNG.",
    heading: "Louis Vuitton Receipt Generator",
    intro: "Create a Louis Vuitton receipt with monogram goods, store details and card payment.",
    useCases: [
      "Luxury purchase records",
      "A sample LV receipt for a mockup or demo",
      "Insurance and household inventory records",
    ],
    faqs: [
      {
        question: "Can I customize the receipt?",
        answer: "Yes. Edit the store, items and prices, then download a print-ready PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("louisvuitton.com"),
      logoText: "LOUIS VUITTON",
      businessName: "Louis Vuitton Champs-Élysées",
      addressLine1: "101 Av. des Champs-Élysées",
      addressLine2: "75008 Paris",
      phone: "+33 9 77 40 40 77",
      taxLabel: "VAT",
      taxRate: 20,
      fontFamily: "mono",
      ruleStyle: "dashed",
      headerAlign: "center",
      itemStyle: "lined",
      itemHeader: { left: "Article", right: "Prix" },
      showCardAuth: true,
      policyText:
        "Exchange within 30 days with receipt. Personalized (Mon Monogram) items are non-returnable.",
      items: [
        { id: id(), name: "Neverfull MM Monogram", quantity: 1, price: 2030 },
        { id: id(), name: "Round Coin Purse", quantity: 1, price: 355 },
      ],
    },
  },
  {
    slug: "lidl",
    name: "Lidl Receipt",
    shortName: "Lidl",
    icon: "🛒",
    seoTitle: "Free Lidl Receipt Generator — Grocery Receipt Maker",
    seoDescription: "Create a Lidl grocery receipt online. Add weekly items, produce and prices, edit the store details, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Lidl Receipt Generator",
    intro: "Create a Lidl grocery receipt with discount-store items, prices and totals.",
    useCases: ["Records of your own purchases", "Keep your own record of Lidl purchases", "Household budgeting"],
    faqs: [
      {
        question: "Can I edit the Lidl receipt?",
        answer: "Yes. Edit the items, prices and tax, then download a PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("lidl.com"),
      logoText: "Lidl",
      businessName: "Lidl",
      addressLine1: "3500 S Clark St",
      addressLine2: "Arlington, VA 22202",
      phone: "(844) 747-5435",
      taxLabel: "Tax",
      taxRate: 6,
      fontFamily: "mono",
      ruleStyle: "dashed",
      headerAlign: "center",
      itemStyle: "lined",
      showCardAuth: true,
      footerMessage: "Big on quality, Lidl on price.",
      items: [
        { id: id(), name: "Deluxe Sourdough Loaf", quantity: 1, price: 2.49 },
        { id: id(), name: "Organic Bananas (bunch)", quantity: 1, price: 1.29 },
        { id: id(), name: "Italian Olive Oil 1L", quantity: 1, price: 6.99 },
        { id: id(), name: "Chicken Breast 1kg", quantity: 1, price: 5.49 },
      ],
    },
  },
  {
    slug: "planet-fitness",
    name: "Planet Fitness Receipt",
    shortName: "Planet Fitness",
    icon: "🏋️",
    // 2026-11-16: "receipts" and "invoice" wording for the queries it ranks ~8
    // on. No reimbursement or HSA/FSA angle, by the owner's brief.
    seoTitle: "Planet Fitness Receipt & Invoice Template — Free to Build",
    seoDescription:
      `Make a Planet Fitness membership receipt or invoice with plan, club, billing date and dues. Watermarked download is free; Pro from ${PASS_FROM} a week removes it.`,
    heading: "Planet Fitness Receipt Generator for Membership Dues",
    intro:
      `Make a Planet Fitness membership receipt or invoice with your plan, home club, billing date and dues. Building it and a watermarked download are free; Pro from ${PASS_FROM} a week removes the watermark.`,
    useCases: [
      "Records of your own membership payments",
      "Household budgeting for gym dues",
      "Sample receipts for fitness app mockups",
    ],
    guidance: [
      {
        heading: "Fields you can edit on a Planet Fitness receipt",
        body:
          "The membership block holds the member name and number, the plan (the sample shows Black Card; change it to Classic or whichever plan the account is on), the home club and the billing date. Below it, the dues print as a line item, and the annual fee can go on its own line or in the note at the foot of the receipt.\n\n" +
          "The amounts on the sample are placeholders. Enter the dues and fees shown on your own account, since prices vary by club and plan.",
      },
      {
        heading: "Invoice or receipt?",
        body:
          "An invoice asks for a payment that has not been made yet, so it shows an amount due and a due date. A receipt confirms a payment that has already gone through, with the date and how it was paid. Use the builder's Document heading field to head the same layout INVOICE or RECEIPT, depending on which one you need.",
      },
    ],
    faqs: [
      {
        question: "Can I customize the receipt?",
        answer: "Yes. Edit the plan, club and amounts, then download a PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("planetfitness.com"),
      logoText: "PLANET FITNESS",
      businessName: "Planet Fitness",
      addressLine1: "4 Liberty Lane W",
      addressLine2: "Hampton, NH 03842",
      phone: "(844) 880-7180",
      taxLabel: "Tax",
      taxRate: 0,
      fontFamily: "sans",
      ruleStyle: "solid",
      headerAlign: "center",
      greeting: "Membership Receipt",
      paymentInline: true,
      sections: [
        {
          title: "Membership",
          rows: [
            { label: "Member", value: "Chris Daniels" },
            { label: "Plan", value: "Black Card" },
            { label: "Home club", value: "#1842" },
            { label: "Billing date", value: "16th monthly" },
          ],
        },
      ],
      footerMessage: "Judgement Free Zone",
      items: [
        { id: id(), name: "Black Card Monthly", quantity: 1, price: 24.99 },
        { id: id(), name: "Annual Fee", quantity: 1, price: 49 },
      ],
    },
  },
  {
    slug: "amc-theatres",
    name: "AMC Theatres Receipt",
    shortName: "AMC",
    icon: "🎬",
    seoTitle: "Free AMC Theatres Receipt Generator — Movie Ticket Receipt",
    seoDescription:
      "Create an AMC movie ticket receipt online. Add the showtime, seats, tickets and snacks, edit the date, then download a free watermarked PDF or PNG receipt.",
    heading: "AMC Theatres Receipt Generator",
    intro: "Create an AMC receipt with film, showtime, seats and concession items.",
    useCases: [
      "Entertainment expense records",
      "Track ticket spending in a budget",
      "Records of your own purchases",
    ],
    faqs: [
      {
        question: "Can I edit the AMC receipt?",
        answer:
          "Yes. Edit the film, showtime, seats and items, then download a PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("amctheatres.com"),
      logoText: "AMC",
      businessName: "AMC Empire 25",
      addressLine1: "234 W 42nd St",
      addressLine2: "New York, NY 10036",
      phone: "(212) 398-2597",
      taxLabel: "Tax",
      taxRate: 8.875,
      fontFamily: "mono",
      ruleStyle: "dashed",
      headerAlign: "center",
      greeting: "ADMIT ONE",
      qrCode: true,
      showCardAuth: true,
      sections: [
        {
          title: "Showing",
          rows: [
            { label: "Film", value: "Dune: Part Three" },
            { label: "Auditorium", value: "IMAX 8" },
            { label: "Showtime", value: "Jun 16, 7:30 PM" },
            { label: "Seats", value: "H7, H8" },
          ],
        },
      ],
      items: [
        { id: id(), name: "Adult Ticket", quantity: 2, price: 19.69 },
        { id: id(), name: "Large Popcorn", quantity: 1, price: 9.99 },
        { id: id(), name: "ICEE Blue", quantity: 1, price: 6.49 },
      ],
    },
  },
  {
    slug: "dollar-tree",
    name: "Dollar Tree Receipt",
    shortName: "Dollar Tree",
    icon: "🏪",
    seoTitle: "Free Dollar Tree Receipt Generator — Discount Store Receipt",
    seoDescription: "Create a Dollar Tree receipt online. Add everyday low-price items, edit the store details, prices, tax and date, then download a free watermarked PDF or PNG.",
    heading: "Dollar Tree Receipt Generator",
    intro: "Create a Dollar Tree receipt with value items and a simple itemized total.",
    useCases: ["Expense records", "Keep your own purchase records", "Budget tracking"],
    faqs: [
      {
        question: "Can I edit the Dollar Tree receipt?",
        answer: "Yes. Edit the items and prices, then download a PDF or PNG.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("dollartree.com"),
      logoText: "DOLLAR TREE",
      businessName: "Dollar Tree #4821",
      addressLine1: "500 Volvo Pkwy",
      addressLine2: "Chesapeake, VA 23320",
      phone: "(757) 321-5000",
      taxLabel: "Tax",
      taxRate: 6,
      fontFamily: "mono",
      ruleStyle: "dotted",
      headerAlign: "center",
      itemStyle: "qtycol",
      showCardAuth: true,
      footerMessage: "Everything's $1.25!",
      items: [
        { id: id(), name: "Gift Wrap Roll", quantity: 2, price: 1.25 },
        { id: id(), name: "Greeting Cards 2pk", quantity: 1, price: 1.25 },
        { id: id(), name: "Dish Sponges 3pk", quantity: 1, price: 1.25 },
        { id: id(), name: "Party Balloons 10ct", quantity: 1, price: 1.25 },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Generated brands. Compact seeds are expanded into full ReceiptTemplate pages
// so we can scale brand coverage without hand-writing every field. Each page
// still renders a real logo, the brand name throughout, and (where given) the
// brand's own items. Omit `items` to use sensible category defaults.
// ---------------------------------------------------------------------------

type Paper = "thermal" | "modern" | "minimal";

interface BrandSeed {
  slug: string;
  name: string;
  domain: string;
  category: BrandCategory;
  city?: string;
  address1?: string;
  taxRate?: number;
  paper?: Paper;
  icon?: string;
  items?: Omit<LineItem, "id">[];
  /** Hand-set page title, overriding the TITLE_VARIANTS pick. */
  title?: string;
}

// ---------------------------------------------------------------------------
// Per-brand variety. A stable hash of the slug selects which intro / FAQ /
// use-case / title / footer variant each generated brand gets, so no two pages
// share the same body text even though they are machine-built. Deterministic:
// output depends only on the slug, so pages don't churn between builds.
// ---------------------------------------------------------------------------

function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], seed: number): T {
  // Math.abs guards against signed-shift seeds going negative (arr[-n] is undefined).
  return arr[Math.abs(seed) % arr.length];
}

/** Pick `n` distinct entries from `arr`, chosen deterministically from `seed`. */
function pickDistinct<T>(arr: T[], n: number, seed: number): T[] {
  const out: T[] = [];
  const used = new Set<number>();
  let s = seed || 1;
  while (out.length < Math.min(n, arr.length)) {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    const i = s % arr.length;
    if (!used.has(i)) {
      used.add(i);
      out.push(arr[i]);
    }
  }
  return out;
}

// `city` is optional (BrandSeed) — every variant either uses it or ignores it,
// so pages without a city just render the city-free half of the sentence.
// Every CATEGORY_NOUN but Health & Pharmacy already ends in tax, so no variant
// names tax again after ${noun} (2026-11-25: "…and sales tax, set the tax").
const INTRO_VARIANTS: ((n: string, noun: string, city?: string) => string)[] = [
  (n, noun) => `Create an editable ${n} receipt with ${noun}. Perfect for your own records of a real ${n} purchase, budgeting or design mockups.`,
  (n, noun) => `Need ${anBrand(n)} receipt fast? Build one with ${noun}, then download a PDF or PNG with no account. Free downloads carry a small watermark; Pro removes it.`,
  (n, noun) => `Lay out ${anBrand(n)}-style receipt complete with ${noun}. Adjust the totals and export it for your own records.`,
  (n, noun) => `Make ${anBrand(n)} receipt online in seconds. Lay it out with ${noun}, plus the subtotal and total, ready to print or save.`,
  (n, noun, city) => `Build ${anBrand(n)} receipt${city ? ` for a visit to the ${city} location` : ""} with ${noun}. Edit the totals, then download it for expenses or your own records.`,
  // 2026-11-25: was "Rebuild … receipt from memory", which reads as recreating
  // a real receipt. 25 generated brand pages used it (content-dates INTRO_NOV25).
  (n, noun) => `Start from ${anBrand(n)} receipt layout with ${noun}, edit the totals, then export a PDF or PNG in under a minute.`,
  // 2026-11-25: was "Whether you're replacing a receipt from …", which reads as
  // recreating a real one, and ran "…sales tax and the totals" together.
  (n, noun, city) => `Keeping a record of ${anBrand(n)} purchase${city ? ` in ${city}` : ""}? Fill in ${noun}. The totals add up as you type, and the receipt downloads as a PDF or PNG.`,
  (n, noun) => `A ${n} receipt template with ${noun} already laid out — change the items, prices and date to match your own purchase, then download.`,
  (n, noun) => `Generate ${anBrand(n)}-style receipt with ${noun}. Free to build, with a live preview as you edit.`,
  (n, noun, city) => `This ${n} receipt generator lays out ${noun}${city ? `, styled after the ${city} store` : ""} — edit every field, then export as PDF or PNG.`,
];

// None of these may say an account is needed to download — since 2026-10-24
// it is not: building and a watermarked download need no account, and the
// watermark-free download is a Pro pass bought at checkout, also without one.
// None may say "clean" either: a free download is watermarked.
const SEO_DESC_VARIANTS: ((n: string, noun: string) => string)[] = [
  (n, noun) => `Create an editable ${n} receipt online in seconds. Add ${noun}, preview it free, then download a PDF or PNG with no account.`,
  (n, noun) => `Make ${anBrand(n)} receipt with ${noun} and download a print-ready PDF or PNG. Free ${n} receipt generator — no account needed.`,
  (n, noun) => `Generate ${anBrand(n)} receipt online, complete with ${noun}. Set the totals, preview free, then export with no account.`,
  (n, noun) => `Build ${anBrand(n)} receipt online with ${noun}, editable totals and tax. Free live preview — download as a PDF or PNG, no account needed.`,
  (n, noun) => `Free ${n} receipt maker: add ${noun}, set the date and totals, then export a PDF or PNG with no account.`,
  (n, noun) => `${n} receipt generator: lay out ${noun}, edit the totals and tax, then export a PDF or PNG. Free to build and preview.`,
  // 2026-11-25: was "Recreate a … receipt" — the same recreate-a-real-receipt
  // reading as the old "from memory" intro. 15 pages (content-dates INTRO_NOV25).
  (n, noun) => `Put together ${anBrand(n)} receipt with ${noun} in a couple of clicks. Free preview and watermarked PDF or PNG, no account needed.`,
  (n, noun) => `Build an editable ${n} receipt — ${noun}, custom tax and totals — and get a free watermarked PDF or PNG.`,
  (n, noun) => `A free ${n} receipt template with ${noun} pre-filled. Adjust the details and download a print-ready PDF or PNG.`,
  (n, noun) => `Fast, free ${n} receipt generator. Add ${noun}, set the tax rate, preview live, then export as a PDF or PNG.`,
];

/**
 * "a Target", "an IKEA", "The Cheesecake Factory".
 *
 * The title variants hardcoded "a ${n}", which reads wrong for a tenth of the
 * catalogue: "Make a Applebee's Receipt", "a ASDA", "a Olive Garden", and —
 * worst — "Generate a The Cheesecake Factory Receipt Online". Nine of these
 * were live in a 227-page sample of brand titles.
 *
 * A vowel LETTER is not a vowel SOUND, so the "yoo" words are listed out:
 * "an Uber" but "a United Airlines", "a UPS", "a Uniqlo".
 */
const YOO_SOUND = /^(UPS|USPS|United|Uniqlo|UO|Universal|Euro)\b/;

function withArticle(n: string): string {
  if (/^The\s/i.test(n)) return n;
  if (YOO_SOUND.test(n)) return `a ${n}`;
  return /^[aeiou]/i.test(n) ? `an ${n}` : `a ${n}`;
}

/**
 * The same article, for running copy: "a Target receipt", "an IKEA receipt".
 *
 * Differs from withArticle in one way — a leading "The" is dropped rather than
 * kept, because "Recreate a The Cheesecake Factory receipt" is not English and
 * "Recreate The Cheesecake Factory receipt" names one specific receipt rather
 * than the kind. "a Cheesecake Factory receipt" is what a person would say.
 */
export function anBrand(n: string): string {
  const bare = n.replace(/^The\s+/i, "");
  if (YOO_SOUND.test(bare)) return `a ${bare}`;
  return /^[aeiou]/i.test(bare) ? `an ${bare}` : `a ${bare}`;
}

const TITLE_VARIANTS: ((n: string) => string)[] = [
  (n) => `Free ${n} Receipt Generator — Make ${withArticle(n)} Receipt`,
  (n) => `${n} Receipt Generator — Create an Editable ${n} Receipt`,
  (n) => `Make ${withArticle(n)} Receipt — Free ${n} Receipt Generator`,
  (n) => `${n} Receipt Maker — Free Online ${n} Receipt`,
  (n) => `Create ${withArticle(n)} Receipt Online — Free ${n} Receipt Generator`,
  (n) => `Free ${n} Receipt Maker — Editable PDF & PNG`,
  (n) => `${n} Receipt Maker — Build & Download ${withArticle(n)} Receipt Free`,
  (n) => `Generate ${withArticle(n)} Receipt Online — Free ${n} Receipt Maker`,
  (n) => `${n} Receipt Template — Free Online Generator`,
  (n) => `Build ${withArticle(n)} Receipt Free — ${n} Receipt Generator & Maker`,
];

const USECASE_VARIANTS: ((n: string) => string[])[] = [
  (n) => [`Keep your own record of ${n} purchases`, "Personal bookkeeping and records", "Budgeting and spend tracking", "Props and design mockups"],
  (n) => [`Track ${n} spending in a budget`, "Business travel expense notes", "Personal finance records", "Mockups for design or film"],
  (n) => [`A sample ${n} receipt for testing or demos`, "Freelance and small-business bookkeeping", "Records for taxes and bookkeeping", "Point-of-sale and app UI mockups"],
  (n) => [`See how ${anBrand(n)} receipt is laid out`, "Keep an itemized record of a purchase", "Keep a personal spending log", "App or website screenshot mockups"],
  (n) => [`Log ${anBrand(n)} purchase in your own records`, "Freelance and small-business invoicing", "Tax-season bookkeeping records", "Stage or screen props"],
  (n) => [`Plan a budget around ${n} purchases`, "Training material on reading receipts", "Household budgeting records", "Presentation or portfolio mockups"],
  (n) => [`A printable ${n}-style receipt for a prop or display`, "Small-business record-keeping", "Everyday bookkeeping and record-keeping", "Design comps and mockups that need a sample receipt"],
  (n) => [`Teach how ${anBrand(n)} receipt is read`, "Freelancer client expense summaries", "Personal finance tracking", "Film, theatre or app-demo props"],
];

const FOOTER_VARIANTS: ((n: string, city?: string) => string)[] = [
  (n) => `Thank you — see you again at ${n}!`,
  () => `Thank you for your purchase!`,
  () => `Thanks for shopping with us today.`,
  (n) => `${n} appreciates your business.`,
  (n, city) => `Thank you for visiting ${n}${city ? ` in ${city}` : ""}!`,
  () => `We appreciate you choosing us today.`,
  (n) => `Come back soon — ${n} thanks you!`,
  () => `Have a great day!`,
  (n, city) => `${n}${city ? ` — ${city}` : ""} thanks you for your visit.`,
  () => `Your business means a lot to us.`,
];

type FaqVariant = (n: string, slug: string) => { question: string; answer: string };

/** "$3" — the cheapest watermark-free route, quoted rather than typed. */
const PRO_FROM = formatPlanPrice(PLANS.pro_weekly);

// "How do I make…" is the primary search intent, so it always leads; two more
// are rotated in from the pool below for variety.
const FAQ_ANCHOR: FaqVariant = (n) => ({
  question: `How do I make ${anBrand(n)} receipt?`,
  answer: `Open the ${n} template, edit the store details, add your items and prices, set the tax rate, then download it as a PDF or PNG — no account needed. It takes about a minute.`,
});

const FAQ_POOL: FaqVariant[] = [
  (n) => ({
    question: `Is the ${n} receipt generator free?`,
    answer: `Yes. Building and previewing ${anBrand(n)} receipt is free with no account, and so is a download with a small watermark. A watermark-free download needs Pro, from ${PRO_FROM} for 7 days, which also unlocks unlimited AI generation.`,
  }),
  (n) => ({ question: `Can I edit the items and prices on ${anBrand(n)} receipt?`, answer: `Every line, quantity, price and the tax rate is fully editable, so your ${n} receipt matches exactly what you need.` }),
  (n) => ({ question: `Can I download ${anBrand(n)} receipt as a PDF?`, answer: `Yes — export your ${n} receipt as a high-resolution PDF or PNG, ready to print or keep with your own records.` }),
  (n) => ({ question: `What does the ${n} receipt template include?`, answer: `It opens with ${anBrand(n)}-style layout: a logo, itemized lines, subtotal, tax and total, all editable. It is an independent template for your own records and mockups, not a receipt issued by ${n}.` }),
  (n) => ({
    question: `Do I need an account to make ${anBrand(n)} receipt?`,
    answer: `No. You can build, preview and download ${anBrand(n)} receipt with no account. Free downloads carry a small watermark; Pro removes it, from ${PRO_FROM} for 7 days, and you pay at checkout without creating an account.`,
  }),
  (n) => ({ question: `Can I change the date and store details on ${anBrand(n)} receipt?`, answer: `Yes. Set the date, store address, register or order number and cashier so your ${n} receipt reflects the right visit.` }),
  (n) => ({ question: `What can I use ${anBrand(n)} receipt for?`, answer: `For your own records and budgeting, as a sample layout, or as a prop or mockup for design, film, theatre or app demos. It is an independent template, not a receipt issued by ${n}, so it is not proof of purchase for a return, warranty or claim.` }),
  (n) => ({ question: `Can I add my own items to ${anBrand(n)} receipt?`, answer: `Yes — add, remove or reorder line items freely. The template starts with sample ${n} items, but every field is yours to change.` }),
  (n) => ({ question: `What file formats does the ${n} receipt export to?`, answer: `PDF (fitted or print-ready A4), PNG and JPG, all rendered at 3x resolution so they stay sharp when printed or attached to an email.` }),
  (n) => ({
    question: `Will my ${n} receipt have a watermark?`,
    answer: `Free downloads include a small watermark. A watermark-free download needs Pro, from ${PRO_FROM} a week — cancel any time in one click.`,
  }),
  (n) => ({ question: `Can I set a different currency or tax rate on ${anBrand(n)} receipt?`, answer: `Yes. Switch between 10 currencies and set any tax label and rate — the totals recalculate instantly.` }),
  (n) => ({ question: `Is my information saved when I make ${anBrand(n)} receipt?`, answer: `Only if you ask for it. The builder runs in your browser, so what you type stays on your device unless you save the receipt to your account.` }),
];

// Real, brand-appropriate items for seeds that would otherwise fall back to
// generic category defaults. Gives each of these pages a distinct receipt body.
const BRAND_ITEMS: Record<string, Omit<LineItem, "id">[]> = {
  // ── Restaurants ──
  "carl-s-jr": [{ name: "Famous Star w/ Cheese Combo", quantity: 1, price: 8.79 }, { name: "CrissCut Fries", quantity: 1, price: 3.49 }, { name: "Chocolate Shake", quantity: 1, price: 3.99 }],
  "hardees": [{ name: "1/3 lb Thickburger Combo", quantity: 1, price: 9.29 }, { name: "Hand-Breaded Chicken Tenders 3pc", quantity: 1, price: 5.49 }],
  "del-taco": [{ name: "Epic Cali Burrito", quantity: 1, price: 7.49 }, { name: "Crinkle Cut Fries", quantity: 1, price: 2.49 }, { name: "Del Taco", quantity: 2, price: 1.69 }],
  "moe-s-southwest-grill": [{ name: "Homewrecker Burrito", quantity: 1, price: 10.49 }, { name: "Chips & Queso", quantity: 1, price: 4.29 }],
  "el-pollo-loco": [{ name: "2pc Chicken Combo", quantity: 1, price: 9.99 }, { name: "Chicken Tortilla Soup", quantity: 1, price: 4.49 }],
  "white-castle": [{ name: "Original Slider", quantity: 6, price: 0.99 }, { name: "Cheese Slider", quantity: 2, price: 1.29 }, { name: "Small Fries", quantity: 1, price: 2.19 }],
  "checkers": [{ name: "Big Buford", quantity: 1, price: 6.49 }, { name: "Famous Seasoned Fries (Lg)", quantity: 1, price: 3.29 }, { name: "Strawberry Milkshake", quantity: 1, price: 3.99 }],
  "bojangles": [{ name: "8pc Tailgate Special", quantity: 1, price: 22.99 }, { name: "Bo-Berry Biscuits 3pc", quantity: 1, price: 3.99 }],
  "zaxbys": [{ name: "Chicken Finger Plate", quantity: 1, price: 9.99 }, { name: "Texas Toast", quantity: 1, price: 0.0 }, { name: "Extra Zax Sauce", quantity: 2, price: 0.5 }],
  "church-s-chicken": [{ name: "2pc Chicken Combo", quantity: 1, price: 7.79 }, { name: "Honey-Butter Biscuit", quantity: 2, price: 1.29 }],
  "marco-s-pizza": [{ name: "Large Pepperoni Magnifico", quantity: 1, price: 14.99 }, { name: "CheezyBread", quantity: 1, price: 6.49 }],
  "blaze-pizza": [{ name: "Build Your Own 11\" Pizza", quantity: 2, price: 9.45 }, { name: "Blood Orange Lemonade", quantity: 1, price: 3.25 }],
  "mod-pizza": [{ name: "MOD-Size Custom Pizza", quantity: 1, price: 9.87 }, { name: "Caesar Salad", quantity: 1, price: 7.27 }],
  "tgi-fridays": [{ name: "Loaded Potato Skins", quantity: 1, price: 10.49 }, { name: "Jack Daniel's Burger", quantity: 1, price: 16.99 }],
  "longhorn-steakhouse": [{ name: "Outlaw Ribeye 18oz", quantity: 1, price: 28.99 }, { name: "Wild West Shrimp", quantity: 1, price: 10.49 }],
  "red-robin": [{ name: "Royal Red Robin Burger", quantity: 1, price: 15.49 }, { name: "Bottomless Steak Fries", quantity: 1, price: 0.0 }, { name: "Freckled Lemonade", quantity: 1, price: 3.99 }],
  "cracker-barrel": [{ name: "Country Fried Steak", quantity: 1, price: 12.99 }, { name: "Hashbrown Casserole", quantity: 1, price: 3.49 }, { name: "Buttermilk Biscuits", quantity: 1, price: 0.0 }],
  "golden-corral": [{ name: "Adult Buffet", quantity: 2, price: 16.99 }, { name: "Beverage", quantity: 2, price: 2.99 }],
  "steak-n-shake": [{ name: "Steakburger 'n Fries Combo", quantity: 1, price: 7.99 }, { name: "Chili Mac", quantity: 1, price: 5.49 }, { name: "Hand-Dipped Shake", quantity: 1, price: 4.29 }],
  "portillos": [{ name: "Italian Beef Combo", quantity: 1, price: 9.79 }, { name: "Chicago-Style Hot Dog", quantity: 1, price: 4.49 }, { name: "Chocolate Cake Shake", quantity: 1, price: 6.49 }],
  "firehouse-subs": [{ name: "Hook & Ladder Sub (Lg)", quantity: 1, price: 10.99 }, { name: "Chips", quantity: 1, price: 1.79 }, { name: "Drink", quantity: 1, price: 2.49 }],
  "potbelly": [{ name: "Original Italian Sandwich", quantity: 1, price: 7.49 }, { name: "Chips", quantity: 1, price: 1.99 }, { name: "Oatmeal Chocolate Chip Cookie", quantity: 1, price: 2.29 }],
  "noodles-company": [{ name: "Wisconsin Mac & Cheese", quantity: 1, price: 8.95 }, { name: "Pad Thai", quantity: 1, price: 9.95 }],

  // ── Coffee & Cafés ──
  "philz-coffee": [{ name: "Mint Mojito Iced Coffee", quantity: 1, price: 5.95 }, { name: "Tesora Pour Over", quantity: 1, price: 4.5 }],
  "the-coffee-bean": [{ name: "Ice Blended Mocha", quantity: 1, price: 5.95 }, { name: "Almond Croissant", quantity: 1, price: 3.95 }],
  "scooter-s-coffee": [{ name: "Caramelicious", quantity: 1, price: 5.25 }, { name: "Cinnamon Roll", quantity: 1, price: 3.45 }],
  "biggby-coffee": [{ name: "Teddy Bear Latte", quantity: 1, price: 4.99 }, { name: "Bagel w/ Cream Cheese", quantity: 1, price: 2.99 }],
  "caffe-nero": [{ name: "Cappuccino", quantity: 1, price: 3.25 }, { name: "Ham & Cheese Panini", quantity: 1, price: 5.45 }],
  "einstein-bros-bagels": [{ name: "Bacon Egg & Cheese Bagel", quantity: 1, price: 5.49 }, { name: "Plain Bagel w/ Shmear", quantity: 1, price: 2.99 }, { name: "Coffee (Lg)", quantity: 1, price: 2.49 }],

  // ── Grocery ──
  "food-lion": [{ name: "Food Lion 2% Milk 1Gal", quantity: 1, price: 3.29 }, { name: "Large White Eggs 12ct", quantity: 1, price: 2.49 }, { name: "White Bread", quantity: 1, price: 1.49 }, { name: "Bananas (lb)", quantity: 2, price: 0.55 }],
  "giant-food": [{ name: "Giant 2% Milk 1Gal", quantity: 1, price: 3.49 }, { name: "Boar's Head Turkey (lb)", quantity: 1, price: 9.99 }, { name: "Wheat Bread", quantity: 1, price: 2.29 }],
  "stop-shop": [{ name: "Nature's Promise Eggs 12ct", quantity: 1, price: 3.29 }, { name: "Whole Milk 1Gal", quantity: 1, price: 3.59 }, { name: "Pasta 16oz", quantity: 2, price: 1.29 }],
  "vons": [{ name: "Signature Select Milk 1Gal", quantity: 1, price: 3.79 }, { name: "Rotisserie Chicken", quantity: 1, price: 7.99 }, { name: "Salad Mix", quantity: 1, price: 3.49 }],
  "ralphs": [{ name: "Ralphs Milk 1Gal", quantity: 1, price: 3.49 }, { name: "Ground Beef 80/20 (lb)", quantity: 1, price: 5.99 }, { name: "Flour Tortillas", quantity: 1, price: 2.49 }],
  "albertsons": [{ name: "Lucerne Milk 1Gal", quantity: 1, price: 3.49 }, { name: "Large Eggs 18ct", quantity: 1, price: 4.29 }, { name: "Sourdough Loaf", quantity: 1, price: 3.99 }],
  "winco-foods": [{ name: "Bulk Long Grain Rice (lb)", quantity: 3, price: 0.79 }, { name: "Eggs 12ct", quantity: 1, price: 2.19 }, { name: "Milk 1Gal", quantity: 1, price: 2.99 }],
  "hy-vee": [{ name: "Hy-Vee Milk 1Gal", quantity: 1, price: 3.29 }, { name: "Bakery Donuts 6ct", quantity: 1, price: 3.99 }, { name: "Bananas (lb)", quantity: 2, price: 0.55 }],
  "harris-teeter": [{ name: "HT Traders Milk 1Gal", quantity: 1, price: 3.59 }, { name: "Chicken Breast (lb)", quantity: 1, price: 4.99 }, { name: "Baguette", quantity: 1, price: 2.29 }],
  "giant-eagle": [{ name: "Giant Eagle Milk 1Gal", quantity: 1, price: 3.49 }, { name: "Large Eggs 12ct", quantity: 1, price: 2.79 }, { name: "Ground Coffee 12oz", quantity: 1, price: 7.99 }],
  "shoprite": [{ name: "Bowl & Basket Milk 1Gal", quantity: 1, price: 3.29 }, { name: "Eggs 12ct", quantity: 1, price: 2.49 }, { name: "Cereal", quantity: 1, price: 3.99 }],
  "fred-meyer": [{ name: "Kroger Milk 1Gal", quantity: 1, price: 3.39 }, { name: "Gala Apples (lb)", quantity: 2, price: 1.49 }, { name: "Sandwich Bread", quantity: 1, price: 1.99 }],
  "asda": [{ name: "ASDA Semi-Skimmed Milk 2pt", quantity: 1, price: 1.3 }, { name: "Hovis Wholemeal Bread", quantity: 1, price: 1.1 }, { name: "Free Range Eggs 6", quantity: 1, price: 1.45 }],
  "morrisons": [{ name: "Morrisons Milk 4pt", quantity: 1, price: 1.45 }, { name: "Wholemeal Bread", quantity: 1, price: 0.89 }, { name: "Mature Cheddar 350g", quantity: 1, price: 2.5 }],
  "waitrose": [{ name: "Essential Whole Milk 2pt", quantity: 1, price: 1.4 }, { name: "Free Range Eggs 6", quantity: 1, price: 2.1 }, { name: "Sourdough Loaf", quantity: 1, price: 1.85 }],
  "mercadona": [{ name: "Leche Entera 1L", quantity: 2, price: 0.85 }, { name: "Pan de Molde", quantity: 1, price: 1.1 }, { name: "Huevos 12", quantity: 1, price: 1.95 }],
  "edeka": [{ name: "Vollmilch 1L", quantity: 2, price: 0.99 }, { name: "Brötchen 6", quantity: 1, price: 1.2 }, { name: "Eier 10", quantity: 1, price: 2.49 }],
  "rewe": [{ name: "REWE Bio Milch 1L", quantity: 1, price: 1.19 }, { name: "Roggenbrot", quantity: 1, price: 1.49 }, { name: "Butter 250g", quantity: 1, price: 1.99 }],
  "albert-heijn": [{ name: "AH Halfvolle Melk 1L", quantity: 1, price: 1.05 }, { name: "Volkorenbrood", quantity: 1, price: 1.39 }, { name: "Eieren 10", quantity: 1, price: 2.29 }],
  "sobeys": [{ name: "Compliments Milk 4L", quantity: 1, price: 5.49 }, { name: "White Bread", quantity: 1, price: 2.99 }, { name: "Large Eggs 12", quantity: 1, price: 3.79 }],
  "coles": [{ name: "Coles Full Cream Milk 2L", quantity: 1, price: 3.1 }, { name: "White Bread", quantity: 1, price: 1.5 }, { name: "Free Range Eggs 12", quantity: 1, price: 4.5 }],
  "woolworths-au": [{ name: "Woolworths Milk 2L", quantity: 1, price: 3.1 }, { name: "Wholemeal Bread", quantity: 1, price: 1.6 }, { name: "Cavendish Bananas (kg)", quantity: 1, price: 3.9 }],

  // ── Retail ──
  "jcpenney": [{ name: "Stafford Dress Shirt", quantity: 2, price: 29.99 }, { name: "Home Expressions Sheet Set", quantity: 1, price: 39.99 }],
  "bed-bath-beyond": [{ name: "Wamsutta Comforter Set", quantity: 1, price: 89.99 }, { name: "Cuisinart Knife Set", quantity: 1, price: 49.99 }],
  "big-lots": [{ name: "Stonehurst Patio Chair", quantity: 1, price: 79.99 }, { name: "Storage Bins", quantity: 3, price: 9.99 }],
  "family-dollar": [{ name: "Cleaning Supplies", quantity: 3, price: 1.5 }, { name: "Paper Towels 6pk", quantity: 1, price: 5.99 }, { name: "Snacks", quantity: 4, price: 1.25 }],
  "burlington": [{ name: "Winter Jacket", quantity: 1, price: 49.99 }, { name: "Kids' Sneakers", quantity: 1, price: 24.99 }],
  "gap": [{ name: "Logo Fleece Hoodie", quantity: 1, price: 49.95 }, { name: "1969 Slim Jeans", quantity: 1, price: 69.95 }],
  "banana-republic": [{ name: "Untucked Dress Shirt", quantity: 1, price: 79.5 }, { name: "Aiden Slim Chinos", quantity: 1, price: 89.5 }],
  "j-crew": [{ name: "Secret Wash Oxford Shirt", quantity: 1, price: 79.5 }, { name: "484 Slim Chino", quantity: 1, price: 98.0 }],
  "forever-21": [{ name: "Graphic Tee", quantity: 2, price: 12.99 }, { name: "Denim Skirt", quantity: 1, price: 24.99 }],
  "urban-outfitters": [{ name: "UO Graphic Tee", quantity: 1, price: 39.0 }, { name: "Vinyl Record", quantity: 1, price: 28.0 }],
  "american-eagle": [{ name: "AE AirFlex Jeans", quantity: 1, price: 49.95 }, { name: "Graphic Tee", quantity: 1, price: 24.95 }],
  "hollister": [{ name: "Skinny Jeans", quantity: 1, price: 59.95 }, { name: "Logo Hoodie", quantity: 1, price: 44.95 }],
  "victorias-secret": [{ name: "Body by Victoria Bra", quantity: 1, price: 54.95 }, { name: "PINK Leggings", quantity: 1, price: 49.95 }],
  "dsw": [{ name: "Nike Running Shoes", quantity: 1, price: 89.99 }, { name: "Dress Shoes", quantity: 1, price: 69.99 }],
  "menards": [{ name: "2x4x8 Stud", quantity: 12, price: 3.49 }, { name: "Interior Paint Gallon", quantity: 1, price: 28.99 }, { name: "Wood Screws 1lb", quantity: 1, price: 7.49 }],
  "tractor-supply": [{ name: "4health Dog Food 40lb", quantity: 1, price: 44.99 }, { name: "Work Boots", quantity: 1, price: 89.99 }],
  "office-depot": [{ name: "Multipurpose Paper 10-Ream", quantity: 1, price: 49.99 }, { name: "HP Ink Cartridge", quantity: 1, price: 32.99 }],
  "newegg": [{ name: "GeForce RTX GPU", quantity: 1, price: 399.99 }, { name: "NVMe SSD 1TB", quantity: 1, price: 79.99 }],
  "crate-barrel": [{ name: "Aspen Dinnerware Set", quantity: 1, price: 99.95 }, { name: "Lumbar Throw Pillow", quantity: 1, price: 39.95 }],
  "williams-sonoma": [{ name: "Le Creuset Dutch Oven", quantity: 1, price: 369.95 }, { name: "Chef's Knife", quantity: 1, price: 79.95 }],
  "pottery-barn": [{ name: "Faux Fur Throw", quantity: 1, price: 79.5 }, { name: "Table Lamp", quantity: 1, price: 129.0 }],
  "world-market": [{ name: "Cabernet Sauvignon", quantity: 2, price: 12.99 }, { name: "Outdoor Cushion", quantity: 1, price: 29.99 }],
  "hobby-lobby": [{ name: "Stretched Canvas 3pk", quantity: 1, price: 12.99 }, { name: "Acrylic Paint Set", quantity: 1, price: 19.99 }, { name: "Yarn", quantity: 3, price: 3.49 }],
  "party-city": [{ name: "Latex Balloons 24pk", quantity: 1, price: 6.99 }, { name: "Tableware Set", quantity: 1, price: 14.99 }, { name: "Helium Tank", quantity: 1, price: 39.99 }],
  "guitar-center": [{ name: "Ernie Ball Strings", quantity: 3, price: 5.99 }, { name: "Instrument Cable", quantity: 1, price: 19.99 }],
  "cabelas": [{ name: "Hiking Boots", quantity: 1, price: 129.99 }, { name: "Spinning Reel", quantity: 1, price: 59.99 }],
  "bass-pro-shops": [{ name: "Rod & Reel Combo", quantity: 1, price: 79.99 }, { name: "Tackle Box", quantity: 1, price: 24.99 }],
  "academy-sports": [{ name: "Brooks Running Shoes", quantity: 1, price: 109.99 }, { name: "Adjustable Dumbbell", quantity: 1, price: 49.99 }],
  "total-wine": [{ name: "Cabernet Sauvignon 750ml", quantity: 1, price: 15.99 }, { name: "Craft IPA 6pk", quantity: 1, price: 11.99 }, { name: "Tequila 750ml", quantity: 1, price: 29.99 }],
  "pep-boys": [{ name: "Synthetic Oil Change", quantity: 1, price: 49.99 }, { name: "Wiper Blades", quantity: 2, price: 14.99 }],
  "napa-auto-parts": [{ name: "NAPA Air Filter", quantity: 1, price: 18.99 }, { name: "Brake Pads (Front)", quantity: 1, price: 44.99 }],
  "kay-jewelers": [{ name: "Diamond Pendant Necklace", quantity: 1, price: 399.0 }],
  "zales": [{ name: "10K Gold Hoop Earrings", quantity: 1, price: 199.0 }],
  "michael-kors": [{ name: "Jet Set Crossbody Bag", quantity: 1, price: 298.0 }],
  "kate-spade": [{ name: "Spencer Slim Wallet", quantity: 1, price: 178.0 }],
  "versace": [{ name: "Greca Sunglasses", quantity: 1, price: 320.0 }],
  "balenciaga": [{ name: "Logo T-Shirt", quantity: 1, price: 450.0 }],

  // ── Gas & Convenience ──
  "texaco": [{ name: "Regular Unleaded (gal)", quantity: 11.2, price: 3.45 }, { name: "Bottled Water", quantity: 1, price: 1.99 }],
  "citgo": [{ name: "Regular Unleaded (gal)", quantity: 12.0, price: 3.39 }],
  "sunoco": [{ name: "Sunoco 87 Unleaded (gal)", quantity: 10.8, price: 3.49 }, { name: "Energy Drink", quantity: 1, price: 2.99 }],
  "valero": [{ name: "Regular Unleaded (gal)", quantity: 12.5, price: 3.29 }],
  "phillips-66": [{ name: "Regular Unleaded (gal)", quantity: 11.0, price: 3.42 }, { name: "Coffee (M)", quantity: 1, price: 1.79 }],
  "conoco": [{ name: "Regular Unleaded (gal)", quantity: 10.5, price: 3.55 }],
  "casey-s": [{ name: "Regular Unleaded (gal)", quantity: 11.8, price: 3.25 }, { name: "Casey's Pizza Slice", quantity: 2, price: 2.99 }],
  "kwik-trip": [{ name: "Regular Unleaded (gal)", quantity: 12.2, price: 3.19 }, { name: "Glazer Donut", quantity: 1, price: 1.29 }],
  "racetrac": [{ name: "Regular Unleaded (gal)", quantity: 11.6, price: 3.29 }, { name: "Crazy Cooler (L)", quantity: 1, price: 0.99 }],

  // ── Travel ──
  "alaska-airlines": [{ name: "Base Fare (SEA-LAX)", quantity: 1, price: 148.0 }, { name: "Seat Selection", quantity: 1, price: 25.0 }, { name: "Checked Bag", quantity: 1, price: 35.0 }],
  "frontier-airlines": [{ name: "Base Fare", quantity: 1, price: 59.0 }, { name: "Carry-On Bag", quantity: 1, price: 49.0 }, { name: "Seat Assignment", quantity: 1, price: 22.0 }],
  "british-airways": [{ name: "Base Fare (LHR-JFK)", quantity: 1, price: 412.0 }, { name: "Taxes & Carrier Charges", quantity: 1, price: 196.0 }],
  "emirates": [{ name: "Base Fare (DXB-LHR)", quantity: 1, price: 545.0 }, { name: "Taxes & Fees", quantity: 1, price: 142.0 }],
  "air-canada": [{ name: "Base Fare (YYZ-YVR)", quantity: 1, price: 218.0 }, { name: "Seat Selection", quantity: 1, price: 28.0 }, { name: "Checked Bag", quantity: 1, price: 30.0 }],
  "days-inn": [{ name: "Standard Room — 1 Night", quantity: 1, price: 84.99 }, { name: "Taxes & Fees", quantity: 1, price: 13.6 }],
  "la-quinta": [{ name: "King Room — 1 Night", quantity: 1, price: 94.0 }, { name: "Taxes & Fees", quantity: 1, price: 15.04 }],
  "comfort-inn": [{ name: "Queen Room — 1 Night", quantity: 1, price: 109.0 }, { name: "Taxes & Fees", quantity: 1, price: 17.44 }],
  "hampton-inn": [{ name: "King Room — 1 Night", quantity: 1, price: 139.0 }, { name: "Taxes & Fees", quantity: 1, price: 22.24 }],
  "sheraton": [{ name: "Club Room — 1 Night", quantity: 1, price: 189.0 }, { name: "Taxes & Fees", quantity: 1, price: 30.24 }],
  "westin": [{ name: "Deluxe Room — 1 Night", quantity: 1, price: 219.0 }, { name: "Resort Fee", quantity: 1, price: 35.0 }],
  "ritz-carlton": [{ name: "Deluxe King — 2 Nights", quantity: 2, price: 525.0 }, { name: "Resort Fee", quantity: 2, price: 50.0 }],
  "radisson": [{ name: "Standard Room — 1 Night", quantity: 1, price: 129.0 }, { name: "Taxes & Fees", quantity: 1, price: 20.64 }],
  "national-car-rental": [{ name: "Midsize — Daily Rate", quantity: 3, price: 52.0 }, { name: "Taxes & Fees", quantity: 1, price: 41.0 }],
  "alamo": [{ name: "Economy — Daily Rate", quantity: 3, price: 46.0 }, { name: "Taxes & Fees", quantity: 1, price: 38.0 }],
  "sixt": [{ name: "Premium — Daily Rate", quantity: 2, price: 78.0 }, { name: "Taxes & Fees", quantity: 1, price: 44.0 }],
  "priceline": [{ name: "Hotel Booking — 2 Nights", quantity: 2, price: 118.0 }, { name: "Taxes & Fees", quantity: 1, price: 38.0 }],

  // ── Rideshare & Delivery ──
  "ola": [{ name: "Ola Ride (8.4 km)", quantity: 1, price: 12.5 }, { name: "Booking Fee", quantity: 1, price: 1.2 }],
  "didi": [{ name: "DiDi Express (9.0 km)", quantity: 1, price: 9.8 }, { name: "Service Fee", quantity: 1, price: 0.9 }],
  "careem": [{ name: "Careem Ride (7.6 km)", quantity: 1, price: 14.3 }, { name: "Booking Fee", quantity: 1, price: 1.5 }],
  "just-eat": [{ name: "Order Subtotal", quantity: 1, price: 22.4 }, { name: "Delivery Fee", quantity: 1, price: 2.49 }, { name: "Service Fee", quantity: 1, price: 1.6 }],
  "gopuff": [{ name: "Order Subtotal", quantity: 1, price: 18.75 }, { name: "Delivery Fee", quantity: 1, price: 1.95 }],
  "shipt": [{ name: "Grocery Order Subtotal", quantity: 1, price: 86.4 }, { name: "Service Fee", quantity: 1, price: 7.0 }],
  "caviar": [{ name: "Order Subtotal", quantity: 1, price: 31.5 }, { name: "Delivery Fee", quantity: 1, price: 3.99 }, { name: "Service Fee", quantity: 1, price: 2.8 }],

  // ── Health & Pharmacy ──
  "duane-reade": [{ name: "Prescription Co-Pay", quantity: 1, price: 12.0 }, { name: "Pain Reliever", quantity: 1, price: 8.99 }, { name: "Vitamins", quantity: 1, price: 11.49 }],
  "vitamin-shoppe": [{ name: "Whey Protein 5lb", quantity: 1, price: 54.99 }, { name: "BCAA Powder", quantity: 1, price: 24.99 }],

  // ── Services & Other ──
  "dhl": [{ name: "Express Worldwide Shipping", quantity: 1, price: 38.5 }, { name: "Packaging", quantity: 1, price: 4.99 }],
  "crunch-fitness": [{ name: "Monthly Membership", quantity: 1, price: 24.99 }, { name: "Annual Fee", quantity: 1, price: 49.0 }],
  "anytime-fitness": [{ name: "Monthly Membership", quantity: 1, price: 41.99 }, { name: "Enrollment Fee", quantity: 1, price: 49.0 }],
  "cinemark": [{ name: "Adult Ticket", quantity: 2, price: 13.5 }, { name: "Large Popcorn", quantity: 1, price: 9.25 }, { name: "Soft Drink (L)", quantity: 2, price: 5.75 }],
};

/**
 * Hand-written copy for generated brands whose queries need more than the
 * variant pool (SEOZONE tasks, 2026-11-20). Replaces the picked title, meta,
 * H1 and FAQs, and adds guidance sections; the FAQ list keeps the anchor.
 */
const SEED_COPY: Record<string, Partial<Pick<ReceiptTemplate, "seoTitle" | "seoDescription" | "heading" | "intro" | "guidance" | "faqs">>> = {
  // 2026-11-25: "deliveroo receipt pdf" / "deliveroo customer receipt pdf"
  // (pos 8.5–11.5, 0 clicks). The page described a ride ("trip or order
  // charges"); the lines named here are the researched order receipt's
  // (lib/brand-specs.ts): dishes with add-ons, restaurant subtotal, delivery
  // fee, service fee, rider tip, VAT line, total in pounds.
  "deliveroo": {
    seoTitle: "Deliveroo Receipt Generator — Customer Receipt PDF & PNG",
    heading: "Deliveroo Receipt Generator & Template",
    seoDescription:
      "Deliveroo receipt generator: dishes, service fee, delivery fee, rider tip and total in £. Edit every line, then download a customer receipt PDF or PNG.",
    intro:
      `Make a Deliveroo-style order receipt with the restaurant, each dish, the service fee, delivery fee, rider tip and total in pounds. Edit every field with a live preview and download a PDF or PNG; the free download carries a small watermark and Pro from ${PASS_FROM} a week removes it.`,
    guidance: [
      {
        heading: "Deliveroo receipt sample: a London food order",
        body:
          "The sample is a Deliveroo order receipt in pounds: the order number and date, the recipient, the restaurant and its address, the delivery address, then each dish with its add-ons, the restaurant subtotal, the delivery fee, the service fee and the rider tip. Every line is editable, so you can change the dishes, fees and tip to match the order.",
      },
      {
        heading: "Save your Deliveroo receipt as a PDF",
        body:
          `Download the receipt as a print-ready PDF or a PNG for your own records or expense notes. The free download carries a small watermark; Pro from ${PASS_FROM} a week removes it. It is an independent template, not issued by Deliveroo and not proof of purchase.`,
      },
      {
        heading: "VAT on a Deliveroo receipt",
        body:
          "The template's VAT line starts at 0% and can be set to any rate. For a receipt built around VAT, with the net amount, the rate and the VAT shown on their own lines, use the {link:/templates/vat-receipt|VAT receipt template}.",
      },
    ],
    faqs: [
      FAQ_ANCHOR("Deliveroo", "deliveroo"),
      {
        question: "Can I download the Deliveroo receipt as a PDF?",
        answer:
          `Yes, as a PDF or PNG. The free download carries a small watermark, and Pro from ${PASS_FROM} a week removes it.`,
      },
      {
        question: "Can I change the fees, tip and currency?",
        answer:
          "Yes. The service fee, delivery fee, rider tip, VAT rate and currency are all editable, along with every dish.",
      },
      {
        question: "Is this an official Deliveroo receipt?",
        answer:
          "No. It is an independent template, not issued by Deliveroo and not proof of purchase.",
      },
    ],
  },
  // 2026-11-25: "didi receipt" (pos ~7, 0 clicks). The intro was the shared
  // "Rebuild … from memory" line, which reads as recreating a real receipt.
  // Fields named are the researched trip receipt's (lib/brand-specs.ts).
  "didi": {
    seoTitle: "DiDi Receipt Generator — Editable Trip Receipt PDF & PNG",
    heading: "DiDi Receipt Generator",
    seoDescription:
      "DiDi receipt generator for a ride: base fare, per-km and per-minute charges, request fee and total in pesos or any currency. Watermarked PDF or PNG free.",
    intro:
      `Make a DiDi-style trip receipt with the base fare, per-kilometre and per-minute charges, request fee and total, in Mexican pesos or any currency you set. Edit every field with a live preview and download a PDF or PNG; the free download is watermarked and Pro from ${PASS_FROM} a week removes it.`,
    guidance: [
      {
        heading: "DiDi receipt sample: a DiDi Express ride in Mexico City",
        body:
          "The sample is a DiDi Express trip receipt: the service type, origin and destination, distance, duration and driver, then the base fare, the distance and time charges, the request fee, the IVA line and the payment method. The sample is in Spanish; every label and line can be changed to any language.",
      },
      {
        heading: "DiDi receipt vs a DiDi invoice (factura)",
        body:
          "The sample's footer notes that a factura is requested from the DiDi app. This template makes a trip receipt for your own records; it is not a tax invoice and not issued by DiDi.",
      },
    ],
    faqs: [
      FAQ_ANCHOR("DiDi", "didi"),
      {
        question: "Can I change the currency and IVA rate?",
        answer:
          "Yes. The currency, IVA rate, distance, time and every fare line are editable.",
      },
      {
        question: "Is the DiDi receipt generator free?",
        answer:
          `Building a receipt and a watermarked download are free; Pro from ${PASS_FROM} a week removes the watermark.`,
      },
      {
        question: "Is this an official DiDi receipt or factura?",
        answer:
          "No. It is an independent template, not issued by DiDi and not proof of purchase.",
      },
    ],
  },
  // 2026-11-25: this page should own "little caesars receipt generator" and
  // "little caesars receipt maker"; the maker query was going to the /brands
  // hub (30.7). The lines named are the researched receipt's
  // (lib/brand-specs.ts): pizzas, Crazy Bread, order number, tax, total.
  "little-caesars": {
    seoTitle: "Little Caesars Receipt Generator & Maker",
    heading: "Little Caesars Receipt Generator & Maker",
    seoDescription:
      `Little Caesars receipt generator and maker: pizzas, Crazy Bread, order number, sales tax and total. Edit every line, get a watermarked PDF free; ${PASS_FROM} removes it.`,
    guidance: [
      {
        heading: "How to make a Little Caesars receipt",
        body:
          "1. Open the generator: it starts with a Little Caesars-style carry-out order, two pizzas and Crazy Bread.\n\n" +
          "2. Edit the store, the order number, the cashier and the items, with the price of each pizza on its own line.\n\n" +
          "3. Set the sales tax rate for the store's address. The receipt works out the tax and the total from it.\n\n" +
          `4. Download it as a PDF or PNG. The free download carries a small watermark; Pro from ${PASS_FROM} a week removes it.`,
      },
    ],
  },
  "grab": {
    seoTitle: "Grab Receipt Generator — Make a Grab Receipt PDF or PNG",
    seoDescription:
      "Make a Grab receipt PDF or PNG with the fare, platform fee, tolls and promo, and set GST and currency. The free download is watermarked; Pro removes it.",
    heading: "Grab Receipt Generator — Make a Grab Receipt PDF",
    guidance: [
      {
        heading: "Grab receipt sample: GrabCar ride",
        body:
          "The sample is a GrabCar ride in Singapore dollars: a booking ID, the ride type, the distance, pick-up and drop-off and the driver, then the fare, platform fee, ERP / tolls and a promotion line, paid by GrabPay Wallet. Every line is editable.",
      },
      {
        heading: "Export your Grab receipt as a PDF, PNG or JPG",
        body:
          `Download a fitted or A4 print-ready PDF, a PNG or a JPG, all at 3x resolution. The free download carries a small watermark, and Pro from ${PASS_FROM} a week removes it.`,
      },
      {
        heading: "Grab food and delivery orders",
        body:
          "For a food order, replace the fare and toll lines with the dishes, then add the delivery fee and a tip as lines of their own.",
      },
    ],
    faqs: [
      FAQ_ANCHOR("Grab", "grab"),
      {
        question: "Can I download the Grab receipt as a PDF?",
        answer:
          `Yes. Export a fitted or A4 print-ready PDF, a PNG or a JPG. The free download carries a small watermark, which Pro from ${PASS_FROM} a week removes.`,
      },
      {
        question: "Can I change the currency from SGD?",
        answer:
          "Yes. The currency, GST rate and every fare line are editable.",
      },
      {
        question: "Is this an official Grab receipt?",
        answer:
          "No. Makecepeit is an independent template, not affiliated with Grab.",
      },
    ],
  },
  "balenciaga": {
    seoTitle: "Balenciaga Receipt Generator — Make a Balenciaga Receipt",
    seoDescription:
      "Balenciaga receipt generator: add bags, sneakers or slides, set the sales tax and currency, get a PDF or PNG. Free download is watermarked; Pro removes it.",
    heading: "Balenciaga Receipt Generator for Bags, Sneakers & Slides",
    guidance: [
      {
        heading: "Make a Balenciaga slides or sneakers receipt",
        body:
          "The sample opens with a small bag and a knit sneaker in size 42. Replace either line with the footwear you are recording and put the size and colour in the item name. Prices are yours to enter; the template suggests none.",
      },
      {
        heading: "Boutique receipt vs online order receipt",
        body:
          "The template is a boutique receipt: a sales associate and client line, the card entry and auth code, and a returns line at the foot. For an online order, change the header to the online store and replace the associate line with your order number.",
      },
    ],
    faqs: [
      FAQ_ANCHOR("Balenciaga", "balenciaga"),
      {
        question: "Is the Balenciaga receipt generator free?",
        answer:
          `Building and a watermarked PDF or PNG are free with no account; Pro from ${PASS_FROM} a week removes the watermark.`,
      },
      {
        question: "Can I change the boutique and the items?",
        answer:
          "Yes. The store details, item descriptions, prices, tax rate and currency are all editable.",
      },
      {
        question: "Is it affiliated with Balenciaga?",
        answer:
          "No. It is an independent template for your own records and mockups, not a proof of purchase.",
      },
    ],
  },
};

function makeBrand(s: BrandSeed): ReceiptTemplate {
  const seed = hashSlug(s.slug);
  const noun = CATEGORY_NOUN[s.category];
  const items: LineItem[] = (
    s.items ?? BRAND_ITEMS[s.slug] ?? CATEGORY_DEFAULT_ITEMS[s.category]
  ).map((it) => ({ id: id(), ...it }));
  const faqs = [
    FAQ_ANCHOR(s.name),
    ...pickDistinct(FAQ_POOL, 2, seed).map((f) => f(s.name, s.slug)),
  ];
  return {
    slug: s.slug,
    name: `${s.name} Receipt`,
    shortName: s.name,
    icon: s.icon ?? CATEGORY_ICON[s.category],
    // Free/Pro wording is applied once, at assembly — see stripFree and the
    // BRAND_TEMPLATES map. Doing it here as well would be the second mechanism
    // that made 96 hand-written titles miss the rule in the first place.
    seoTitle: s.title ?? pick(TITLE_VARIANTS, seed)(s.name),
    seoDescription: pick(SEO_DESC_VARIANTS, seed >>> 2)(s.name, noun),
    heading: `${s.name} Receipt Generator`,
    intro: pick(INTRO_VARIANTS, seed >>> 4)(s.name, noun, s.city),
    useCases: pick(USECASE_VARIANTS, seed >>> 6)(s.name),
    faqs,
    defaults: {
      logoDataUrl: brandLogo(s.domain),
      businessName: s.name,
      addressLine1: s.address1 ?? "",
      addressLine2: s.city ?? "",
      phone: "",
      taxLabel: "Sales Tax",
      taxRate: s.taxRate ?? 0,
      footerMessage: pick(FOOTER_VARIANTS, seed >>> 8)(s.name, s.city),
      paperStyle: s.paper ?? (s.category === "Digital & Subscriptions" ? "modern" : "thermal"),
      items,
    },
    ...SEED_COPY[s.slug],
  };
}

const NEW_BRAND_SEEDS: BrandSeed[] = [
  // ── Restaurants ──
  { slug: "raising-canes", name: "Raising Cane's", domain: "raisingcanes.com", category: "Restaurants", city: "Baton Rouge, LA", items: [{ name: "The Box Combo", quantity: 1, price: 10.99 }, { name: "Extra Cane's Sauce", quantity: 2, price: 0.5 }, { name: "Lemonade", quantity: 1, price: 2.79 }] },
  { slug: "whataburger", name: "Whataburger", domain: "whataburger.com", category: "Restaurants", city: "San Antonio, TX", items: [{ name: "Whataburger Meal", quantity: 1, price: 9.39 }, { name: "Honey BBQ Chicken Strip Sandwich", quantity: 1, price: 6.79 }] },
  { slug: "wingstop", name: "Wingstop", domain: "wingstop.com", category: "Restaurants", city: "Addison, TX", items: [{ name: "20pc Boneless Combo", quantity: 1, price: 18.99 }, { name: "Cajun Fried Corn", quantity: 2, price: 2.49 }] },
  { slug: "jersey-mike-s", name: "Jersey Mike's", domain: "jerseymikes.com", category: "Restaurants", city: "Manasquan, NJ", items: [{ name: "Giant #13 Mike's Way", quantity: 1, price: 16.45 }, { name: "Chips", quantity: 2, price: 1.79 }] },
  { slug: "jimmy-john-s", name: "Jimmy John's", domain: "jimmyjohns.com", category: "Restaurants", city: "Champaign, IL", items: [{ name: "#9 Italian Night Club", quantity: 1, price: 8.99 }, { name: "Jumbo Kosher Dill", quantity: 1, price: 1.75 }] },
  { slug: "carl-s-jr", name: "Carl's Jr.", domain: "carlsjr.com", category: "Restaurants", city: "Franklin, TN" },
  { slug: "hardees", name: "Hardee's", domain: "hardees.com", category: "Restaurants", city: "Franklin, TN" },
  { slug: "del-taco", name: "Del Taco", domain: "deltaco.com", category: "Restaurants", city: "Lake Forest, CA" },
  { slug: "qdoba", name: "Qdoba", domain: "qdoba.com", category: "Restaurants", city: "San Diego, CA", items: [{ name: "Chicken Burrito", quantity: 1, price: 9.5 }, { name: "Chips & Queso", quantity: 1, price: 3.95 }] },
  { slug: "moe-s-southwest-grill", name: "Moe's Southwest Grill", domain: "moes.com", category: "Restaurants", city: "Atlanta, GA" },
  { slug: "el-pollo-loco", name: "El Pollo Loco", domain: "elpolloloco.com", category: "Restaurants", city: "Costa Mesa, CA" },
  { slug: "culvers", name: "Culver's", domain: "culvers.com", category: "Restaurants", city: "Prairie du Sac, WI", items: [{ name: "ButterBurger Deluxe", quantity: 1, price: 6.49 }, { name: "Cheese Curds", quantity: 1, price: 4.99 }, { name: "Custard Concrete", quantity: 1, price: 4.49 }] },
  { slug: "white-castle", name: "White Castle", domain: "whitecastle.com", category: "Restaurants", city: "Columbus, OH" },
  { slug: "checkers", name: "Checkers", domain: "checkers.com", category: "Restaurants", city: "Tampa, FL" },
  { slug: "bojangles", name: "Bojangles", domain: "bojangles.com", category: "Restaurants", city: "Charlotte, NC" },
  { slug: "zaxbys", name: "Zaxby's", domain: "zaxbys.com", category: "Restaurants", city: "Athens, GA" },
  { slug: "church-s-chicken", name: "Church's Chicken", domain: "churchs.com", category: "Restaurants", city: "Atlanta, GA" },
  { slug: "little-caesars", name: "Little Caesars", domain: "littlecaesars.com", category: "Restaurants", city: "Detroit, MI", items: [{ name: "Hot-N-Ready Pepperoni", quantity: 1, price: 6.99 }, { name: "Crazy Bread", quantity: 1, price: 4.49 }] },
  { slug: "marco-s-pizza", name: "Marco's Pizza", domain: "marcos.com", category: "Restaurants", city: "Toledo, OH" },
  { slug: "blaze-pizza", name: "Blaze Pizza", domain: "blazepizza.com", category: "Restaurants", city: "Pasadena, CA" },
  { slug: "mod-pizza", name: "MOD Pizza", domain: "modpizza.com", category: "Restaurants", city: "Bellevue, WA" },
  { slug: "applebees", name: "Applebee's", domain: "applebees.com", category: "Restaurants", city: "Glendale, CA", items: [{ name: "Bourbon St. Chicken & Shrimp", quantity: 1, price: 16.99 }, { name: "Mozzarella Sticks", quantity: 1, price: 9.29 }] },
  { slug: "chili-s", name: "Chili's", domain: "chilis.com", category: "Restaurants", city: "Dallas, TX", items: [{ name: "Triple Dipper", quantity: 1, price: 14.99 }, { name: "Old Timer Burger", quantity: 1, price: 11.99 }] },
  { slug: "tgi-fridays", name: "TGI Fridays", domain: "tgifridays.com", category: "Restaurants", city: "Dallas, TX" },
  { slug: "buffalo-wild-wings", name: "Buffalo Wild Wings", domain: "buffalowildwings.com", category: "Restaurants", city: "Minneapolis, MN", items: [{ name: "20 Boneless Wings", quantity: 1, price: 19.99 }, { name: "Mozzarella Sticks", quantity: 1, price: 8.49 }] },
  { slug: "outback-steakhouse", name: "Outback Steakhouse", domain: "outback.com", category: "Restaurants", city: "Tampa, FL", items: [{ name: "Outback Special 12oz", quantity: 1, price: 24.99 }, { name: "Bloomin' Onion", quantity: 1, price: 11.49 }] },
  { slug: "texas-roadhouse", name: "Texas Roadhouse", domain: "texasroadhouse.com", category: "Restaurants", city: "Louisville, KY", items: [{ name: "16oz Ribeye", quantity: 1, price: 27.99 }, { name: "Loaded Sweet Potato", quantity: 1, price: 4.99 }] },
  { slug: "longhorn-steakhouse", name: "LongHorn Steakhouse", domain: "longhornsteakhouse.com", category: "Restaurants", city: "Orlando, FL" },
  { slug: "red-lobster", name: "Red Lobster", domain: "redlobster.com", category: "Restaurants", city: "Orlando, FL", items: [{ name: "Ultimate Feast", quantity: 1, price: 32.99 }, { name: "Cheddar Bay Biscuits", quantity: 1, price: 0.0 }] },
  { slug: "red-robin", name: "Red Robin", domain: "redrobin.com", category: "Restaurants", city: "Greenwood Village, CO" },
  { slug: "cheesecake-factory", name: "The Cheesecake Factory", domain: "thecheesecakefactory.com", category: "Restaurants", city: "Calabasas, CA", items: [{ name: "Chicken Madeira", quantity: 1, price: 24.95 }, { name: "Original Cheesecake Slice", quantity: 2, price: 9.95 }] },
  { slug: "ihop", name: "IHOP", domain: "ihop.com", category: "Restaurants", city: "Glendale, CA", items: [{ name: "Original Buttermilk Pancakes", quantity: 1, price: 8.99 }, { name: "Big Steak Omelette", quantity: 1, price: 13.49 }] },
  { slug: "denny-s", name: "Denny's", domain: "dennys.com", category: "Restaurants", city: "Spartanburg, SC", items: [{ name: "Grand Slam", quantity: 2, price: 9.99 }, { name: "Hash Browns", quantity: 1, price: 3.49 }] },
  { slug: "waffle-house", name: "Waffle House", domain: "wafflehouse.com", category: "Restaurants", city: "Norcross, GA", items: [{ name: "All-Star Special", quantity: 1, price: 11.5 }, { name: "Pecan Waffle", quantity: 1, price: 5.25 }] },
  { slug: "cracker-barrel", name: "Cracker Barrel", domain: "crackerbarrel.com", category: "Restaurants", city: "Lebanon, TN" },
  { slug: "olive-garden", name: "Olive Garden", domain: "olivegarden.com", category: "Restaurants", city: "Orlando, FL", items: [{ name: "Chicken Alfredo", quantity: 1, price: 17.49 }, { name: "Breadsticks", quantity: 1, price: 0.0 }] },
  { slug: "golden-corral", name: "Golden Corral", domain: "goldencorral.com", category: "Restaurants", city: "Raleigh, NC" },
  { slug: "steak-n-shake", name: "Steak 'n Shake", domain: "steaknshake.com", category: "Restaurants", city: "Indianapolis, IN" },
  { slug: "portillos", name: "Portillo's", domain: "portillos.com", category: "Restaurants", city: "Oak Brook, IL" },
  { slug: "sweetgreen", name: "Sweetgreen", domain: "sweetgreen.com", category: "Restaurants", city: "Los Angeles, CA", items: [{ name: "Harvest Bowl", quantity: 1, price: 13.95 }, { name: "Sparkling Water", quantity: 1, price: 2.75 }] },
  { slug: "firehouse-subs", name: "Firehouse Subs", domain: "firehousesubs.com", category: "Restaurants", city: "Jacksonville, FL" },
  { slug: "potbelly", name: "Potbelly", domain: "potbelly.com", category: "Restaurants", city: "Chicago, IL" },
  { slug: "noodles-company", name: "Noodles & Company", domain: "noodles.com", category: "Restaurants", city: "Broomfield, CO" },

  // ── Coffee & Cafés ──
  { slug: "blue-bottle-coffee", name: "Blue Bottle Coffee", domain: "bluebottlecoffee.com", category: "Coffee & Cafés", city: "Oakland, CA", items: [{ name: "Single Origin Pour Over", quantity: 1, price: 5.5 }, { name: "Liège Waffle", quantity: 1, price: 4.75 }] },
  { slug: "philz-coffee", name: "Philz Coffee", domain: "philzcoffee.com", category: "Coffee & Cafés", city: "San Francisco, CA" },
  { slug: "the-coffee-bean", name: "The Coffee Bean & Tea Leaf", domain: "coffeebean.com", category: "Coffee & Cafés", city: "Los Angeles, CA" },
  { slug: "scooter-s-coffee", name: "Scooter's Coffee", domain: "scooterscoffee.com", category: "Coffee & Cafés", city: "Omaha, NE" },
  { slug: "biggby-coffee", name: "Biggby Coffee", domain: "biggby.com", category: "Coffee & Cafés", city: "East Lansing, MI" },
  { slug: "costa-coffee", name: "Costa Coffee", domain: "costa.co.uk", category: "Coffee & Cafés", city: "London, UK", items: [{ name: "Flat White", quantity: 1, price: 3.4 }, { name: "Almond Croissant", quantity: 1, price: 2.6 }] },
  { slug: "pret-a-manger", name: "Pret A Manger", domain: "pret.com", category: "Coffee & Cafés", city: "London, UK", items: [{ name: "Flat White", quantity: 1, price: 3.15 }, { name: "Chicken Caesar Baguette", quantity: 1, price: 4.99 }] },
  { slug: "greggs", name: "Greggs", domain: "greggs.co.uk", category: "Coffee & Cafés", city: "Newcastle, UK", items: [{ name: "Sausage Roll", quantity: 2, price: 1.3 }, { name: "Latte", quantity: 1, price: 2.35 }] },
  { slug: "caffe-nero", name: "Caffè Nero", domain: "caffenero.com", category: "Coffee & Cafés", city: "Manchester, UK" },
  { slug: "einstein-bros-bagels", name: "Einstein Bros. Bagels", domain: "einsteinbros.com", category: "Coffee & Cafés", city: "Lakewood, CO" },
  // Added 2026-11-03: asked for by name in the AI generator's saved prompts
  // ("Krispy Kreme", three tries by one Pro account) with no template. Prices
  // are user-reported, not official: dozen $15.99 regular (Slickdeals thread,
  // July 2026), single $2.59 (older price guide); they vary by shop.
  { slug: "krispy-kreme", name: "Krispy Kreme", domain: "krispykreme.com", category: "Coffee & Cafés", city: "Charlotte, NC", items: [{ name: "Original Glazed Dozen", quantity: 1, price: 15.99 }, { name: "Original Glazed Doughnut", quantity: 2, price: 2.59 }] },

  // ── Grocery ──
  { slug: "meijer", name: "Meijer", domain: "meijer.com", category: "Grocery", city: "Grand Rapids, MI", taxRate: 6, items: [{ name: "Meijer Milk 1Gal", quantity: 1, price: 2.99 }, { name: "Frozen Pizza", quantity: 2, price: 4.49 }, { name: "Bananas (lb)", quantity: 3, price: 0.49 }] },
  { slug: "h-e-b", name: "H-E-B", domain: "heb.com", category: "Grocery", city: "San Antonio, TX", taxRate: 8.25, items: [{ name: "H-E-B Tortillas 20ct", quantity: 1, price: 2.18 }, { name: "Fajita Beef (lb)", quantity: 1.5, price: 7.98 }] },
  { slug: "wegmans", name: "Wegmans", domain: "wegmans.com", category: "Grocery", city: "Rochester, NY", taxRate: 8, items: [{ name: "Organic Spring Mix", quantity: 1, price: 4.49 }, { name: "Baguette", quantity: 1, price: 2.49 }] },
  { slug: "food-lion", name: "Food Lion", domain: "foodlion.com", category: "Grocery", city: "Salisbury, NC", taxRate: 7 },
  { slug: "giant-food", name: "Giant Food", domain: "giantfood.com", category: "Grocery", city: "Landover, MD", taxRate: 6 },
  { slug: "stop-shop", name: "Stop & Shop", domain: "stopandshop.com", category: "Grocery", city: "Quincy, MA", taxRate: 6.25 },
  { slug: "sprouts", name: "Sprouts Farmers Market", domain: "sprouts.com", category: "Grocery", city: "Phoenix, AZ", taxRate: 8.6, items: [{ name: "Organic Kale", quantity: 1, price: 1.99 }, { name: "Grass-Fed Ground Beef (lb)", quantity: 1, price: 6.99 }] },
  { slug: "vons", name: "Vons", domain: "vons.com", category: "Grocery", city: "Fullerton, CA", taxRate: 7.75 },
  { slug: "ralphs", name: "Ralphs", domain: "ralphs.com", category: "Grocery", city: "Los Angeles, CA", taxRate: 9.5 },
  { slug: "albertsons", name: "Albertsons", domain: "albertsons.com", category: "Grocery", city: "Boise, ID", taxRate: 6 },
  { slug: "winco-foods", name: "WinCo Foods", domain: "wincofoods.com", category: "Grocery", city: "Boise, ID" },
  { slug: "hy-vee", name: "Hy-Vee", domain: "hy-vee.com", category: "Grocery", city: "West Des Moines, IA", taxRate: 7 },
  { slug: "harris-teeter", name: "Harris Teeter", domain: "harristeeter.com", category: "Grocery", city: "Matthews, NC", taxRate: 7 },
  { slug: "giant-eagle", name: "Giant Eagle", domain: "gianteagle.com", category: "Grocery", city: "Pittsburgh, PA", taxRate: 7 },
  { slug: "shoprite", name: "ShopRite", domain: "shoprite.com", category: "Grocery", city: "Keasbey, NJ", taxRate: 6.625 },
  { slug: "fred-meyer", name: "Fred Meyer", domain: "fredmeyer.com", category: "Grocery", city: "Portland, OR" },
  { slug: "tesco", name: "Tesco", domain: "tesco.com", category: "Grocery", city: "Welwyn Garden City, UK", items: [{ name: "Tesco Semi-Skimmed Milk", quantity: 1, price: 1.45 }, { name: "Hovis Bread", quantity: 1, price: 1.1 }] },
  { slug: "sainsburys", name: "Sainsbury's", domain: "sainsburys.co.uk", category: "Grocery", city: "London, UK", items: [{ name: "British Semi-Skimmed Milk", quantity: 1, price: 1.45 }, { name: "Free Range Eggs 12", quantity: 1, price: 2.95 }] },
  { slug: "asda", name: "ASDA", domain: "asda.com", category: "Grocery", city: "Leeds, UK" },
  { slug: "morrisons", name: "Morrisons", domain: "morrisons.com", category: "Grocery", city: "Bradford, UK" },
  { slug: "waitrose", name: "Waitrose", domain: "waitrose.com", category: "Grocery", city: "Bracknell, UK" },
  { slug: "carrefour", name: "Carrefour", domain: "carrefour.com", category: "Grocery", city: "Paris, France", items: [{ name: "Baguette Tradition", quantity: 2, price: 1.1 }, { name: "Lait Demi-Écrémé 1L", quantity: 1, price: 0.95 }] },
  { slug: "mercadona", name: "Mercadona", domain: "mercadona.es", category: "Grocery", city: "Valencia, Spain" },
  { slug: "edeka", name: "EDEKA", domain: "edeka.de", category: "Grocery", city: "Hamburg, Germany" },
  { slug: "rewe", name: "REWE", domain: "rewe.de", category: "Grocery", city: "Cologne, Germany" },
  { slug: "albert-heijn", name: "Albert Heijn", domain: "ah.nl", category: "Grocery", city: "Zaandam, Netherlands" },
  { slug: "loblaws", name: "Loblaws", domain: "loblaws.ca", category: "Grocery", city: "Toronto, ON", items: [{ name: "PC Milk 4L", quantity: 1, price: 5.49 }, { name: "Wonder Bread", quantity: 1, price: 3.29 }] },
  { slug: "sobeys", name: "Sobeys", domain: "sobeys.com", category: "Grocery", city: "Stellarton, NS" },
  { slug: "coles", name: "Coles", domain: "coles.com.au", category: "Grocery", city: "Melbourne, Australia" },
  { slug: "woolworths-au", name: "Woolworths", domain: "woolworths.com.au", category: "Grocery", city: "Sydney, Australia" },

  // ── Retail ──
  { slug: "kohls", name: "Kohl's", domain: "kohls.com", category: "Retail", city: "Menomonee Falls, WI", taxRate: 5.5, items: [{ name: "Sonoma Flannel Shirt", quantity: 2, price: 22.0 }, { name: "Bath Towels 2pk", quantity: 1, price: 17.99 }] },
  { slug: "jcpenney", name: "JCPenney", domain: "jcpenney.com", category: "Retail", city: "Plano, TX", taxRate: 8.25 },
  { slug: "bed-bath-beyond", name: "Bed Bath & Beyond", domain: "bedbathandbeyond.com", category: "Retail", city: "Union, NJ", taxRate: 6.625 },
  { slug: "big-lots", name: "Big Lots", domain: "biglots.com", category: "Retail", city: "Columbus, OH" },
  { slug: "dollar-general", name: "Dollar General", domain: "dollargeneral.com", category: "Retail", city: "Goodlettsville, TN", items: [{ name: "Cleaning Supplies", quantity: 2, price: 1.25 }, { name: "Snacks", quantity: 3, price: 1.0 }] },
  { slug: "family-dollar", name: "Family Dollar", domain: "familydollar.com", category: "Retail", city: "Chesapeake, VA" },
  { slug: "five-below", name: "Five Below", domain: "fivebelow.com", category: "Retail", city: "Philadelphia, PA", items: [{ name: "Phone Accessory", quantity: 1, price: 5.0 }, { name: "Snacks", quantity: 2, price: 3.0 }] },
  { slug: "ross-dress-for-less", name: "Ross Dress for Less", domain: "rossstores.com", category: "Retail", city: "Dublin, CA", items: [{ name: "Men's Polo", quantity: 2, price: 12.99 }, { name: "Bath Towel Set", quantity: 1, price: 19.99 }] },
  { slug: "burlington", name: "Burlington", domain: "burlington.com", category: "Retail", city: "Burlington, NJ" },
  { slug: "old-navy", name: "Old Navy", domain: "oldnavy.com", category: "Retail", city: "San Francisco, CA", items: [{ name: "Graphic Tee", quantity: 3, price: 10.0 }, { name: "Men's Chinos", quantity: 1, price: 29.99 }] },
  { slug: "gap", name: "Gap", domain: "gap.com", category: "Retail", city: "San Francisco, CA" },
  { slug: "banana-republic", name: "Banana Republic", domain: "bananarepublic.com", category: "Retail", city: "San Francisco, CA" },
  { slug: "j-crew", name: "J.Crew", domain: "jcrew.com", category: "Retail", city: "New York, NY" },
  { slug: "uniqlo", name: "Uniqlo", domain: "uniqlo.com", category: "Retail", city: "New York, NY", items: [{ name: "Ultra Light Down Jacket", quantity: 1, price: 69.9 }, { name: "Supima Cotton Tee", quantity: 2, price: 14.9 }] },
  { slug: "forever-21", name: "Forever 21", domain: "forever21.com", category: "Retail", city: "Los Angeles, CA" },
  { slug: "urban-outfitters", name: "Urban Outfitters", domain: "urbanoutfitters.com", category: "Retail", city: "Philadelphia, PA" },
  { slug: "american-eagle", name: "American Eagle", domain: "ae.com", category: "Retail", city: "Pittsburgh, PA" },
  { slug: "hollister", name: "Hollister", domain: "hollisterco.com", category: "Retail", city: "Columbus, OH" },
  { slug: "victorias-secret", name: "Victoria's Secret", domain: "victoriassecret.com", category: "Retail", city: "Columbus, OH" },
  { slug: "bath-body-works", name: "Bath & Body Works", domain: "bathandbodyworks.com", category: "Retail", city: "Columbus, OH", items: [{ name: "3-Wick Candle", quantity: 2, price: 16.95 }, { name: "Body Lotion", quantity: 1, price: 14.5 }] },
  { slug: "lululemon", name: "lululemon", domain: "lululemon.com", category: "Retail", city: "Vancouver, BC", items: [{ name: "Align High-Rise Pant", quantity: 1, price: 98.0 }, { name: "Swiftly Tech Tee", quantity: 1, price: 68.0 }] },
  { slug: "nike", name: "Nike", domain: "nike.com", category: "Retail", city: "Beaverton, OR", items: [{ name: "Air Force 1 '07", quantity: 1, price: 115.0 }, { name: "Dri-FIT Socks 3pk", quantity: 1, price: 22.0 }] },
  { slug: "adidas", name: "adidas", domain: "adidas.com", category: "Retail", city: "Portland, OR", items: [{ name: "Ultraboost Light", quantity: 1, price: 190.0 }, { name: "Trefoil Hoodie", quantity: 1, price: 65.0 }] },
  { slug: "foot-locker", name: "Foot Locker", domain: "footlocker.com", category: "Retail", city: "New York, NY", items: [{ name: "Jordan Retro 4", quantity: 1, price: 215.0 }, { name: "Nike Crew Socks", quantity: 2, price: 16.0 }] },
  { slug: "dsw", name: "DSW", domain: "dsw.com", category: "Retail", city: "Columbus, OH" },
  { slug: "ace-hardware", name: "Ace Hardware", domain: "acehardware.com", category: "Retail", city: "Oak Brook, IL", items: [{ name: "Paint Gallon", quantity: 1, price: 32.99 }, { name: "Assorted Screws", quantity: 1, price: 6.49 }] },
  { slug: "harbor-freight", name: "Harbor Freight Tools", domain: "harborfreight.com", category: "Retail", city: "Calabasas, CA", items: [{ name: "Pittsburgh Tool Set", quantity: 1, price: 49.99 }, { name: "Work Gloves 3pk", quantity: 1, price: 8.99 }] },
  { slug: "menards", name: "Menards", domain: "menards.com", category: "Retail", city: "Eau Claire, WI" },
  { slug: "tractor-supply", name: "Tractor Supply Co.", domain: "tractorsupply.com", category: "Retail", city: "Brentwood, TN" },
  { slug: "staples", name: "Staples", domain: "staples.com", category: "Retail", city: "Framingham, MA", items: [{ name: "Printer Paper 5-Ream", quantity: 1, price: 42.99 }, { name: "Ink Cartridge", quantity: 1, price: 34.99 }] },
  { slug: "office-depot", name: "Office Depot", domain: "officedepot.com", category: "Retail", city: "Boca Raton, FL" },
  { slug: "micro-center", name: "Micro Center", domain: "microcenter.com", category: "Retail", city: "Hilliard, OH", items: [{ name: "NVMe SSD 1TB", quantity: 1, price: 79.99 }, { name: "Mechanical Keyboard", quantity: 1, price: 59.99 }] },
  { slug: "newegg", name: "Newegg", domain: "newegg.com", category: "Retail", city: "City of Industry, CA" },
  { slug: "crate-barrel", name: "Crate & Barrel", domain: "crateandbarrel.com", category: "Retail", city: "Northbrook, IL" },
  { slug: "williams-sonoma", name: "Williams Sonoma", domain: "williams-sonoma.com", category: "Retail", city: "San Francisco, CA" },
  { slug: "pottery-barn", name: "Pottery Barn", domain: "potterybarn.com", category: "Retail", city: "San Francisco, CA" },
  { slug: "world-market", name: "World Market", domain: "worldmarket.com", category: "Retail", city: "Alameda, CA" },
  { slug: "hobby-lobby", name: "Hobby Lobby", domain: "hobbylobby.com", category: "Retail", city: "Oklahoma City, OK" },
  { slug: "party-city", name: "Party City", domain: "partycity.com", category: "Retail", city: "Woodcliff Lake, NJ" },
  { slug: "guitar-center", name: "Guitar Center", domain: "guitarcenter.com", category: "Retail", city: "Westlake Village, CA" },
  { slug: "rei", name: "REI", domain: "rei.com", category: "Retail", city: "Kent, WA", items: [{ name: "Trail Running Shoes", quantity: 1, price: 139.95 }, { name: "Hydration Pack", quantity: 1, price: 49.0 }] },
  { slug: "cabelas", name: "Cabela's", domain: "cabelas.com", category: "Retail", city: "Sidney, NE" },
  { slug: "bass-pro-shops", name: "Bass Pro Shops", domain: "basspro.com", category: "Retail", city: "Springfield, MO" },
  { slug: "academy-sports", name: "Academy Sports + Outdoors", domain: "academy.com", category: "Retail", city: "Katy, TX" },
  { slug: "total-wine", name: "Total Wine & More", domain: "totalwine.com", category: "Retail", city: "Bethesda, MD" },
  { slug: "advance-auto-parts", name: "Advance Auto Parts", domain: "advanceautoparts.com", category: "Retail", city: "Raleigh, NC", items: [{ name: "Car Battery", quantity: 1, price: 139.99 }, { name: "Motor Oil 5qt", quantity: 1, price: 27.99 }] },
  { slug: "pep-boys", name: "Pep Boys", domain: "pepboys.com", category: "Retail", city: "Philadelphia, PA" },
  { slug: "napa-auto-parts", name: "NAPA Auto Parts", domain: "napaonline.com", category: "Retail", city: "Atlanta, GA" },
  { slug: "tiffany-co", name: "Tiffany & Co.", domain: "tiffany.com", category: "Retail", city: "New York, NY", paper: "minimal", items: [{ name: "Sterling Silver Necklace", quantity: 1, price: 350.0 }] },
  { slug: "pandora", name: "Pandora", domain: "pandora.net", category: "Retail", city: "Copenhagen, Denmark", items: [{ name: "Charm Bracelet", quantity: 1, price: 75.0 }, { name: "Charm", quantity: 2, price: 45.0 }] },
  { slug: "kay-jewelers", name: "Kay Jewelers", domain: "kay.com", category: "Retail", city: "Akron, OH" },
  { slug: "zales", name: "Zales", domain: "zales.com", category: "Retail", city: "Dallas, TX" },
  { slug: "coach", name: "Coach", domain: "coach.com", category: "Retail", city: "New York, NY", paper: "minimal", items: [{ name: "Leather Tote Bag", quantity: 1, price: 395.0 }] },
  { slug: "michael-kors", name: "Michael Kors", domain: "michaelkors.com", category: "Retail", city: "New York, NY" },
  { slug: "kate-spade", name: "Kate Spade", domain: "katespade.com", category: "Retail", city: "New York, NY" },
  // Added 2026-10-28: asked for by name in the AI generator's saved prompts
  // ("Ralph Lauren Flagship", "Ralph Lauren store in Chicago") with no template.
  { slug: "ralph-lauren", name: "Ralph Lauren", domain: "ralphlauren.com", category: "Retail", city: "Chicago, IL", paper: "minimal" },
  { slug: "burberry", name: "Burberry", domain: "burberry.com", category: "Retail", city: "London, UK", paper: "minimal", items: [{ name: "Cashmere Scarf", quantity: 1, price: 470.0 }] },
  { slug: "prada", name: "Prada", domain: "prada.com", category: "Retail", city: "Milan, Italy", paper: "minimal", items: [{ name: "Leather Wallet", quantity: 1, price: 590.0 }] },
  { slug: "chanel", name: "Chanel", domain: "chanel.com", category: "Retail", city: "Paris, France", paper: "minimal", items: [{ name: "Chanel No. 5 EDP 100ml", quantity: 1, price: 168.0 }] },
  { slug: "hermes", name: "Hermès", domain: "hermes.com", category: "Retail", city: "Paris, France", paper: "minimal", items: [{ name: "Silk Twilly Scarf", quantity: 1, price: 230.0 }] },
  { slug: "dior", name: "Dior", domain: "dior.com", category: "Retail", city: "Paris, France", paper: "minimal", items: [{ name: "Sauvage EDT 100ml", quantity: 1, price: 125.0 }] },
  { slug: "versace", name: "Versace", domain: "versace.com", category: "Retail", city: "Milan, Italy", paper: "minimal" },
  { slug: "balenciaga", name: "Balenciaga", domain: "balenciaga.com", category: "Retail", city: "Paris, France", paper: "minimal" },
  { slug: "cartier", name: "Cartier", domain: "cartier.com", category: "Retail", city: "Paris, France", paper: "minimal", items: [{ name: "Love Bracelet", quantity: 1, price: 7350.0 }] },

  // ── Gas & Convenience ──
  { slug: "arco", name: "ARCO", domain: "arco.com", category: "Gas & Convenience", city: "La Palma, CA", items: [{ name: "Regular Unleaded (gal)", quantity: 11.5, price: 3.49 }] },
  { slug: "marathon-gas", name: "Marathon", domain: "marathonbrand.com", category: "Gas & Convenience", city: "Findlay, OH", items: [{ name: "Regular Unleaded (gal)", quantity: 12.0, price: 3.35 }] },
  { slug: "texaco", name: "Texaco", domain: "texaco.com", category: "Gas & Convenience", city: "Houston, TX" },
  { slug: "citgo", name: "CITGO", domain: "citgo.com", category: "Gas & Convenience", city: "Houston, TX" },
  { slug: "sunoco", name: "Sunoco", domain: "sunoco.com", category: "Gas & Convenience", city: "Dallas, TX", title: "Sunoco Gas Receipt Generator — Fuel Receipt Maker" },
  { slug: "valero", name: "Valero", domain: "valero.com", category: "Gas & Convenience", city: "San Antonio, TX" },
  { slug: "phillips-66", name: "Phillips 66", domain: "phillips66.com", category: "Gas & Convenience", city: "Houston, TX" },
  { slug: "conoco", name: "Conoco", domain: "conoco.com", category: "Gas & Convenience", city: "Houston, TX" },
  { slug: "circle-k", name: "Circle K", domain: "circlek.com", category: "Gas & Convenience", city: "Tempe, AZ", items: [{ name: "Regular Unleaded (gal)", quantity: 11.5, price: 3.35 }, { name: "Polar Pop (L)", quantity: 1, price: 0.99 }] },
  { slug: "casey-s", name: "Casey's", domain: "caseys.com", category: "Gas & Convenience", city: "Ankeny, IA" },
  { slug: "kwik-trip", name: "Kwik Trip", domain: "kwiktrip.com", category: "Gas & Convenience", city: "La Crosse, WI" },
  { slug: "racetrac", name: "RaceTrac", domain: "racetrac.com", category: "Gas & Convenience", city: "Atlanta, GA" },

  // ── Travel ──
  { slug: "jetblue", name: "JetBlue", domain: "jetblue.com", category: "Travel", city: "Long Island City, NY", items: [{ name: "Base Fare (JFK-FLL)", quantity: 1, price: 119.0 }, { name: "Even More Space Seat", quantity: 1, price: 45.0 }, { name: "Checked Bag", quantity: 1, price: 35.0 }] },
  { slug: "alaska-airlines", name: "Alaska Airlines", domain: "alaskaair.com", category: "Travel", city: "Seattle, WA" },
  { slug: "spirit-airlines", name: "Spirit Airlines", domain: "spirit.com", category: "Travel", city: "Miramar, FL", items: [{ name: "Base Fare", quantity: 1, price: 49.0 }, { name: "Carry-On Bag", quantity: 1, price: 55.0 }, { name: "Seat Assignment", quantity: 1, price: 18.0 }] },
  { slug: "frontier-airlines", name: "Frontier Airlines", domain: "flyfrontier.com", category: "Travel", city: "Denver, CO" },
  { slug: "british-airways", name: "British Airways", domain: "britishairways.com", category: "Travel", city: "London, UK" },
  { slug: "emirates", name: "Emirates", domain: "emirates.com", category: "Travel", city: "Dubai, UAE" },
  { slug: "air-canada", name: "Air Canada", domain: "aircanada.com", category: "Travel", city: "Montreal, QC" },
  { slug: "holiday-inn", name: "Holiday Inn", domain: "ihg.com", category: "Travel", city: "Atlanta, GA", items: [{ name: "Queen Room — 1 Night", quantity: 1, price: 139.0 }, { name: "Taxes & Fees", quantity: 1, price: 22.0 }] },
  { slug: "best-western", name: "Best Western", domain: "bestwestern.com", category: "Travel", city: "Phoenix, AZ", items: [{ name: "Double Queen — 2 Nights", quantity: 2, price: 118.0 }] },
  { slug: "motel-6", name: "Motel 6", domain: "motel6.com", category: "Travel", city: "Dallas, TX", items: [{ name: "Standard Room — 1 Night", quantity: 1, price: 64.99 }] },
  { slug: "days-inn", name: "Days Inn", domain: "wyndhamhotels.com", category: "Travel", city: "Parsippany, NJ" },
  { slug: "la-quinta", name: "La Quinta", domain: "wyndhamhotels.com", category: "Travel", city: "Irving, TX" },
  { slug: "comfort-inn", name: "Comfort Inn", domain: "choicehotels.com", category: "Travel", city: "Rockville, MD" },
  { slug: "hampton-inn", name: "Hampton Inn", domain: "hilton.com", category: "Travel", city: "Memphis, TN" },
  { slug: "sheraton", name: "Sheraton", domain: "marriott.com", category: "Travel", city: "Bethesda, MD" },
  { slug: "westin", name: "Westin", domain: "marriott.com", category: "Travel", city: "Stamford, CT" },
  { slug: "four-seasons", name: "Four Seasons", domain: "fourseasons.com", category: "Travel", city: "Toronto, ON", paper: "minimal", items: [{ name: "Deluxe Room — 2 Nights", quantity: 2, price: 695.0 }, { name: "Resort Fee", quantity: 2, price: 55.0 }] },
  { slug: "ritz-carlton", name: "The Ritz-Carlton", domain: "ritzcarlton.com", category: "Travel", city: "Chevy Chase, MD", paper: "minimal" },
  { slug: "radisson", name: "Radisson", domain: "radissonhotels.com", category: "Travel", city: "Minneapolis, MN" },
  { slug: "budget-car-rental", name: "Budget", domain: "budget.com", category: "Travel", city: "Parsippany, NJ", items: [{ name: "Economy Car — Daily Rate", quantity: 3, price: 44.0 }, { name: "Taxes & Fees", quantity: 1, price: 38.0 }] },
  { slug: "national-car-rental", name: "National Car Rental", domain: "nationalcar.com", category: "Travel", city: "St. Louis, MO" },
  { slug: "alamo", name: "Alamo", domain: "alamo.com", category: "Travel", city: "St. Louis, MO" },
  { slug: "sixt", name: "SIXT", domain: "sixt.com", category: "Travel", city: "Fort Lauderdale, FL" },
  { slug: "vrbo", name: "Vrbo", domain: "vrbo.com", category: "Travel", city: "Austin, TX", items: [{ name: "3 Nights", quantity: 3, price: 165.0 }, { name: "Cleaning Fee", quantity: 1, price: 90.0 }, { name: "Service Fee", quantity: 1, price: 72.0 }] },
  { slug: "priceline", name: "Priceline", domain: "priceline.com", category: "Travel", city: "Norwalk, CT" },

  // ── Rideshare & Delivery ──
  { slug: "bolt", name: "Bolt", domain: "bolt.eu", category: "Rideshare & Delivery", city: "Tallinn, Estonia", items: [{ name: "Bolt Trip (6.1 mi)", quantity: 1, price: 14.2 }, { name: "Booking Fee", quantity: 1, price: 1.5 }] },
  { slug: "grab", name: "Grab", domain: "grab.com", category: "Rideshare & Delivery", city: "Singapore", items: [{ name: "GrabCar (8.2 km)", quantity: 1, price: 12.8 }, { name: "Platform Fee", quantity: 1, price: 0.7 }] },
  { slug: "ola", name: "Ola", domain: "olacabs.com", category: "Rideshare & Delivery", city: "Bengaluru, India" },
  { slug: "didi", name: "DiDi", domain: "didiglobal.com", category: "Rideshare & Delivery", city: "Mexico City, MX" },
  { slug: "careem", name: "Careem", domain: "careem.com", category: "Rideshare & Delivery", city: "Dubai, UAE" },
  { slug: "deliveroo", name: "Deliveroo", domain: "deliveroo.com", category: "Rideshare & Delivery", city: "London, UK", items: [{ name: "Order Subtotal", quantity: 1, price: 24.5 }, { name: "Delivery Fee", quantity: 1, price: 2.99 }, { name: "Service Fee", quantity: 1, price: 1.8 }] },
  { slug: "just-eat", name: "Just Eat", domain: "just-eat.com", category: "Rideshare & Delivery", city: "London, UK" },
  { slug: "gopuff", name: "Gopuff", domain: "gopuff.com", category: "Rideshare & Delivery", city: "Philadelphia, PA" },
  { slug: "shipt", name: "Shipt", domain: "shipt.com", category: "Rideshare & Delivery", city: "Birmingham, AL" },
  { slug: "caviar", name: "Caviar", domain: "trycaviar.com", category: "Rideshare & Delivery", city: "San Francisco, CA" },

  // ── Digital & Subscriptions ──
  { slug: "hbo-max", name: "Max", domain: "max.com", category: "Digital & Subscriptions", items: [{ name: "Max Ad-Free — Monthly", quantity: 1, price: 16.99 }] },
  { slug: "paramount-plus", name: "Paramount+", domain: "paramountplus.com", category: "Digital & Subscriptions", items: [{ name: "Paramount+ with Showtime — Monthly", quantity: 1, price: 12.99 }] },
  { slug: "peacock", name: "Peacock", domain: "peacocktv.com", category: "Digital & Subscriptions", items: [{ name: "Peacock Premium — Monthly", quantity: 1, price: 7.99 }] },
  { slug: "apple-tv-plus", name: "Apple TV+", domain: "tv.apple.com", category: "Digital & Subscriptions", items: [{ name: "Apple TV+ — Monthly", quantity: 1, price: 9.99 }] },
  { slug: "youtube-premium", name: "YouTube Premium", domain: "youtube.com", category: "Digital & Subscriptions", items: [{ name: "YouTube Premium — Monthly", quantity: 1, price: 13.99 }] },
  { slug: "youtube-tv", name: "YouTube TV", domain: "tv.youtube.com", category: "Digital & Subscriptions", items: [{ name: "YouTube TV — Monthly", quantity: 1, price: 72.99 }] },
  { slug: "amazon-prime", name: "Amazon Prime", domain: "amazon.com", category: "Digital & Subscriptions", items: [{ name: "Prime Membership — Annual", quantity: 1, price: 139.0 }] },
  { slug: "audible", name: "Audible", domain: "audible.com", category: "Digital & Subscriptions", items: [{ name: "Audible Premium Plus — Monthly", quantity: 1, price: 14.95 }] },
  { slug: "dropbox", name: "Dropbox", domain: "dropbox.com", category: "Digital & Subscriptions", items: [{ name: "Dropbox Plus — Monthly", quantity: 1, price: 11.99 }] },
  { slug: "microsoft-365", name: "Microsoft 365", domain: "microsoft.com", category: "Digital & Subscriptions", items: [{ name: "Microsoft 365 Family — Annual", quantity: 1, price: 99.99 }] },
  { slug: "slack", name: "Slack", domain: "slack.com", category: "Digital & Subscriptions", items: [{ name: "Slack Pro (per user/mo)", quantity: 5, price: 7.25 }] },
  { slug: "notion", name: "Notion", domain: "notion.so", category: "Digital & Subscriptions", items: [{ name: "Notion Plus (per user/mo)", quantity: 3, price: 10.0 }] },
  { slug: "canva", name: "Canva", domain: "canva.com", category: "Digital & Subscriptions", items: [{ name: "Canva Pro — Annual", quantity: 1, price: 119.99 }] },
  { slug: "grammarly", name: "Grammarly", domain: "grammarly.com", category: "Digital & Subscriptions", items: [{ name: "Grammarly Premium — Monthly", quantity: 1, price: 30.0 }] },
  { slug: "nintendo-eshop", name: "Nintendo eShop", domain: "nintendo.com", category: "Digital & Subscriptions", items: [{ name: "Game Download", quantity: 1, price: 59.99 }, { name: "Switch Online — Annual", quantity: 1, price: 19.99 }] },
  { slug: "epic-games", name: "Epic Games", domain: "epicgames.com", category: "Digital & Subscriptions", items: [{ name: "Game Purchase", quantity: 1, price: 39.99 }, { name: "V-Bucks 2800", quantity: 1, price: 19.99 }] },
  { slug: "roblox", name: "Roblox", domain: "roblox.com", category: "Digital & Subscriptions", items: [{ name: "800 Robux", quantity: 1, price: 9.99 }, { name: "Premium — Monthly", quantity: 1, price: 9.99 }] },
  { slug: "twitch", name: "Twitch", domain: "twitch.tv", category: "Digital & Subscriptions", items: [{ name: "Channel Sub (Tier 1)", quantity: 2, price: 5.99 }] },
  { slug: "patreon", name: "Patreon", domain: "patreon.com", category: "Digital & Subscriptions", items: [{ name: "Membership Pledge", quantity: 1, price: 10.0 }] },
  { slug: "godaddy", name: "GoDaddy", domain: "godaddy.com", category: "Digital & Subscriptions", items: [{ name: "Domain Registration (1yr)", quantity: 1, price: 19.99 }, { name: "Web Hosting (12mo)", quantity: 1, price: 95.88 }] },

  // ── Health & Pharmacy ──
  { slug: "rite-aid", name: "Rite Aid", domain: "riteaid.com", category: "Health & Pharmacy", city: "Camp Hill, PA", items: [{ name: "Prescription Co-Pay", quantity: 1, price: 12.0 }, { name: "Cold & Flu Relief", quantity: 1, price: 9.99 }] },
  { slug: "duane-reade", name: "Duane Reade", domain: "duanereade.com", category: "Health & Pharmacy", city: "New York, NY" },
  { slug: "boots-pharmacy", name: "Boots", domain: "boots.com", category: "Health & Pharmacy", city: "Nottingham, UK", items: [{ name: "Prescription Charge", quantity: 1, price: 9.9 }, { name: "Vitamin C 1000mg", quantity: 1, price: 4.5 }] },
  { slug: "gnc", name: "GNC", domain: "gnc.com", category: "Health & Pharmacy", city: "Pittsburgh, PA", items: [{ name: "Whey Protein 5lb", quantity: 1, price: 59.99 }, { name: "Multivitamin", quantity: 1, price: 24.99 }] },
  { slug: "vitamin-shoppe", name: "The Vitamin Shoppe", domain: "vitaminshoppe.com", category: "Health & Pharmacy", city: "Secaucus, NJ" },
  { slug: "quest-diagnostics", name: "Quest Diagnostics", domain: "questdiagnostics.com", category: "Health & Pharmacy", city: "Secaucus, NJ", items: [{ name: "Lab Panel", quantity: 1, price: 95.0 }, { name: "Insurance Adjustment", quantity: 1, price: -60.0 }] },

  // ── Services & Other ──
  { slug: "ups", name: "UPS", domain: "ups.com", category: "Services & Other", city: "Atlanta, GA", items: [{ name: "Ground Shipping", quantity: 1, price: 12.85 }, { name: "Packaging", quantity: 1, price: 3.99 }] },
  { slug: "the-ups-store", name: "The UPS Store", domain: "theupsstore.com", category: "Services & Other", city: "San Diego, CA", items: [{ name: "Printing (50 pages)", quantity: 50, price: 0.19 }, { name: "Notary Service", quantity: 1, price: 15.0 }] },
  { slug: "dhl", name: "DHL", domain: "dhl.com", category: "Services & Other", city: "Bonn, Germany" },
  { slug: "usps", name: "USPS", domain: "usps.com", category: "Services & Other", city: "Washington, DC", items: [{ name: "Priority Mail", quantity: 1, price: 9.65 }, { name: "Tracking", quantity: 1, price: 0.0 }] },
  { slug: "la-fitness", name: "LA Fitness", domain: "lafitness.com", category: "Services & Other", city: "Irvine, CA", items: [{ name: "Monthly Membership", quantity: 1, price: 39.99 }, { name: "Annual Fee", quantity: 1, price: 49.0 }] },
  { slug: "equinox", name: "Equinox", domain: "equinox.com", category: "Services & Other", city: "New York, NY", paper: "minimal", items: [{ name: "Monthly Membership", quantity: 1, price: 285.0 }] },
  { slug: "orangetheory", name: "Orangetheory Fitness", domain: "orangetheory.com", category: "Services & Other", city: "Boca Raton, FL", items: [{ name: "Elite Membership — Monthly", quantity: 1, price: 159.0 }] },
  { slug: "crunch-fitness", name: "Crunch Fitness", domain: "crunch.com", category: "Services & Other", city: "New York, NY" },
  { slug: "anytime-fitness", name: "Anytime Fitness", domain: "anytimefitness.com", category: "Services & Other", city: "Woodbury, MN" },
  { slug: "regal-cinemas", name: "Regal Cinemas", domain: "regmovies.com", category: "Services & Other", city: "Knoxville, TN", items: [{ name: "Adult Ticket", quantity: 2, price: 14.5 }, { name: "Large Popcorn", quantity: 1, price: 9.5 }, { name: "Soft Drink (L)", quantity: 2, price: 6.0 }] },
  { slug: "cinemark", name: "Cinemark", domain: "cinemark.com", category: "Services & Other", city: "Plano, TX" },
  { slug: "h-r-block", name: "H&R Block", domain: "hrblock.com", category: "Services & Other", city: "Kansas City, MO", items: [{ name: "Tax Prep — Federal", quantity: 1, price: 89.0 }, { name: "State Return", quantity: 1, price: 49.0 }] },
];

const GENERATED_BRANDS = NEW_BRAND_SEEDS.map(makeBrand);

// Bing Webmaster flags meta descriptions outside the ~150–160 char sweet spot.
// Raw seoDescriptions (hand-written and generated) run from ~70 to ~200 chars,
// so every brand passes through the shared fitSeoDescription at assembly: short
// ones gain a follow-on sentence landing closest to the target, overlong ones
// are trimmed to a clean word boundary.
/**
 * Strip the word "Free" from a brand title outside TITLE_KEEPS_FREE (it was
 * the Pro-only brand rule until 2026-10-24; see TITLE_KEEPS_FREE).
 *
 * Applied at assembly rather than at generation because 118 brands carry a
 * hand-written seoTitle that never goes near TITLE_VARIANTS — 96 of them are
 * Pro-only and said "Free X Receipt Generator" over a template you must pay to
 * open. Fixing only the generated path left those live and wrong, which is
 * exactly the failure this codebase keeps repeating: a rule applied to one
 * source of a value and not the other.
 *
 * Surgical rather than replacing the whole title, so the hand-written ones keep
 * their character: "Free Target Receipt Generator — Store Receipt Maker"
 * becomes "Target Receipt Generator — Store Receipt Maker".
 */
function stripFree(title: string): string {
  return title
    .replace(/\bFree\s+/gi, "")
    .replace(/\s+Free\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+—\s*$/, "")
    .trim();
}

/**
 * Longest title that survives Google's SERP truncation intact.
 *
 * 60, not 70. Google cuts the title near 60 characters, so a 70 ceiling let the
 * whole 61–70 band through untouched. Measured on the assembled titles — after
 * stripFree, which is what actually ships — 2026-09-11:
 *
 *             over 60 chars      before → after
 *   generated    69 / 231            69 → 14
 *   hand-written 21 / 117            21 →  7
 *   total        90 / 348            90 → 21   (69 titles change)
 *
 * The residual 21 are titles fitBrandTitle cannot help: they run long without
 * naming the brand twice, so there is no redundant mention to drop. Shortening
 * those means rewriting the variants, not moving this number.
 */
const TITLE_MAX = 60;

/**
 * Drop a brand's second mention from an overlong title.
 *
 * Four of the ten TITLE_VARIANTS name the brand in both clauses ("Urban
 * Outfitters Receipt Generator — Create an Editable Urban Outfitters Receipt",
 * 80 chars). That reads fine for "Gap" and truncates for anything longer, and
 * it hit eight brand pages plus an unknown share of the 118 hand-written
 * titles. Applied at assembly for the same reason stripFree is: the generated
 * and hand-written titles are two sources of one value, and fixing one of them
 * is the failure this file keeps repeating.
 *
 * Surgical — the first clause still carries the brand, so only the redundant
 * repeat is removed: the example above becomes "Urban Outfitters Receipt
 * Generator — Create an Editable Receipt" (63).
 *
 * Cutting the brand can strand the article in front of it. withArticle() picks
 * "a" or "an" to agree with the *brand* — "Make an Applebee's Receipt" — so
 * removing the brand leaves "Make an Receipt". At the old 70 ceiling no title in
 * that shape was long enough to be cut; at 60 it reaches six of them, so the
 * article has to be re-agreed with whatever word now follows it.
 */
function fitBrandTitle(title: string, brand: string): string {
  if (title.length <= TITLE_MAX) return title;
  const first = title.indexOf(brand);
  if (first === -1) return title;
  const second = title.indexOf(brand, first + brand.length);
  if (second === -1) return title;
  const trimmed = dropMention(title, second, brand.length);
  // Dropping the brand from "… — Free Food Lion Receipt Generator" leaves the
  // bare clause "Free Receipt Generator", which is /create's head term rather
  // than this page's. 53 brand titles were in that shape on 2026-10-18 and
  // rotated with /create for "receipt maker" and "receipt generator". Keep
  // the clause that pairs the brand with the generator or maker instead.
  if (trimmed.split(" — ").some((c) => BARE_HEAD_TERM.test(c.trim()))) {
    const clauses = title.split(" — ").map((c) => c.trim());
    return clauses.find((c) => c.includes(brand) && /\breceipt\s+(?:generator|maker)\b/i.test(c)) ?? clauses[0];
  }
  return trimmed;
}

/**
 * A title clause that is only the site's head term — "Receipt Maker", "Free
 * Receipt Generator", "Receipt Generator & Maker" — with no brand or kind in
 * front of it. Those belong to /create; see fitBrandTitle.
 */
export const BARE_HEAD_TERM =
  /^(?:free\s+)?(?:online\s+)?receipt\s+(?:generator|maker|creator)(?:\s*&\s*(?:generator|maker))?$/i;

function dropMention(title: string, at: number, length: number): string {
  return (title.slice(0, at) + title.slice(at + length))
    .replace(/\s{2,}/g, " ")
    .replace(/\s+—\s*$/, "")
    // Re-agree any indefinite article with the word it now sits in front of.
    // Safe to run over the whole title: where the brand survives, the article
    // already agrees with it and this rewrites it to itself — including the
    // YOO_SOUND brands, which take "a" despite the vowel ("a UPS Store").
    .replace(
      /\b(?:a|an)(\s+)([A-Za-z][\w'’&.+-]*)/g,
      (_m, gap: string, word: string) =>
        (YOO_SOUND.test(word) || !/^[aeiou]/i.test(word) ? "a" : "an") + gap + word
    )
    .trim();
}

/**
 * Brands whose page title keeps its "Free".
 *
 * Until 2026-10-24 only these fifty exported watermark-free on a free account,
 * and stripFree took "Free" out of every other brand's title. That paywall is
 * gone — every brand now builds and downloads (watermarked) free with no
 * account — so a "Free" title is honest on all of them. The titles are frozen
 * as they were rather than restored, so the paywall change does not also
 * rewrite ~300 SERP titles on the same day. Restoring "Free" to the rest is a
 * separate, measurable title test: delete this set and the stripFree call.
 */
const TITLE_KEEPS_FREE: ReadonlySet<string> = new Set([
  "7-eleven", "albert-heijn", "aldi", "amazon", "apple-store", "autozone",
  "barnes-noble", "bp", "burger-king", "chanel", "chick-fil-a", "chipotle",
  "deliveroo", "dhl", "dick-s-sporting-goods", "dollar-tree", "domino-s-pizza",
  "dunkin", "exxon", "food-lion", "gamestop", "giant-eagle", "grab", "gucci",
  "guitar-center", "h-m", "harbor-freight", "jersey-mike-s", "kfc", "kroger",
  "marriott", "mcdonalds", "nordstrom", "panda-express", "paypal", "petsmart",
  "pizza-hut", "planet-fitness", "publix", "safeway", "sephora", "subway",
  "taco-bell", "tgi-fridays", "tim-hortons", "trader-joe-s", "united-airlines",
  "walmart", "whole-foods", "zara",
]);

/**
 * A template's defaults with its researched receipt applied (lib/brand-specs.ts).
 * "replace" specs drop the old defaults except the logo; "merge" specs only
 * correct the fields they name.
 */
function withSpec(t: ReceiptTemplate): ReceiptTemplate["defaults"] {
  const spec = BRAND_SPECS[t.slug];
  if (!spec) return t.defaults;
  const { mode, items, ...fields } = spec;
  const base = mode === "merge" ? t.defaults : { logoDataUrl: t.defaults.logoDataUrl };
  return { ...base, ...fields, items: items.map((it) => ({ id: id(), ...it })) };
}

export const BRAND_TEMPLATES: ReceiptTemplate[] = [...HAND_BRANDS, ...GENERATED_BRANDS].map((t) => {
  const seoTitle = fitBrandTitle(
    TITLE_KEEPS_FREE.has(t.slug) ? t.seoTitle : stripFree(t.seoTitle),
    t.shortName
  );
  return { ...t, defaults: withSpec(t), seoTitle, seoDescription: fitSeoDescription(t.seoDescription) };
});

const NEW_BRAND_CATEGORY: Record<string, BrandCategory> = {};
for (const s of NEW_BRAND_SEEDS) NEW_BRAND_CATEGORY[s.slug] = s.category;

/** Resolve a brand's user-facing category (generated → existing → fallback). */
export function brandCategoryFor(slug: string): BrandCategory {
  return NEW_BRAND_CATEGORY[slug] ?? EXISTING_BRAND_CATEGORY[slug] ?? "Retail";
}

export interface BrandListItem {
  slug: string;
  name: string;
  logo: string;
  icon: string;
  category: BrandCategory;
}

/** Lightweight list for the /brands explorer (no heavy template fields). */
export const BRAND_LIST: BrandListItem[] = BRAND_TEMPLATES.map((t) => ({
  slug: t.slug,
  name: t.shortName,
  logo: t.defaults.logoDataUrl ?? "",
  icon: t.icon,
  category: brandCategoryFor(t.slug),
}));
