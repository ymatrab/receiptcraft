import type { ReceiptTemplate } from "./types";
import { WIKIMEDIA_LOGOS } from "./brand-logos";

/**
 * Brand logo URL for a company domain. Prefers the official Wikimedia logo
 * (real wordmarks, CORS-enabled so they embed into exported receipts) resolved
 * by scripts/resolve-logos.mjs. Domains without a verified Wikimedia logo fall
 * back to the same-origin /api/logo favicon proxy (see app/api/logo).
 */
export const brandLogo = (domain: string) =>
  WIKIMEDIA_LOGOS[domain] ?? `/api/logo?domain=${domain}`;

let n = 0;
const id = () => `brand-${++n}`;

export const BRAND_TEMPLATES: ReceiptTemplate[] = [
  {
    slug: "walmart",
    name: "Walmart Receipt",
    shortName: "Walmart",
    icon: "🛒",
    seoTitle: "Free Walmart Receipt Generator — Itemized Walmart Receipt Maker",
    seoDescription:
      "Generate a realistic Walmart receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Walmart Receipt Generator",
    intro:
      "Create a realistic Walmart receipt with itemized products, quantities, tax and payment details. Perfect for replacing lost receipts or keeping track of expenses.",
    useCases: [
      "Replace a lost Walmart receipt",
      "Expense reports and reimbursement",
      "Personal bookkeeping",
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
    seoTitle: "Free Uber Receipt Generator — Rideshare Receipt Maker",
    seoDescription:
      "Create an Uber-style rideshare receipt with base fare, distance, and tip. Free PDF & PNG download.",
    heading: "Uber Receipt Generator",
    intro:
      "Generate a rideshare receipt for your Uber trips. Include base fare, distance, wait time, and tip. Great for business travel expense reports.",
    useCases: [
      "Business travel expense claims",
      "Lost digital receipt recovery",
      "Client billing for travel costs",
    ],
    faqs: [
      {
        question: "Can I add a tip to my Uber receipt?",
        answer:
          "Yes. Use the tip field to add a gratuity, and the total will be calculated automatically.",
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
    seoTitle: "Free Target Receipt Generator — Store Receipt Maker",
    seoDescription:
      "Make a realistic Target store receipt. Itemize your purchases, tax, and totals. Free instant PDF & PNG download.",
    heading: "Target Receipt Generator",
    intro:
      "Create a department store receipt for Target. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Replacing a lost store receipt",
      "Reimbursement for office supplies",
      "Prop use for design and video",
    ],
    faqs: [
      {
        question: "Does it look like a real Target receipt?",
        answer:
          "By choosing the 'Thermal' paper style and adding your items, it generates a very realistic retail receipt structure.",
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
      "Generate a fast food receipt for McDonald's online. Add your meal, tax, and get a PDF download instantly.",
    heading: "McDonald's Receipt Generator",
    intro:
      "Recreate a fast food order from McDonald's. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Per-diem food expenses",
      "Travel meal reimbursements",
      "Lost fast food receipt recovery",
    ],
    faqs: [
      {
        question: "Can I use this for my travel expenses?",
        answer:
          "Yes, if you lost your original meal receipt, you can recreate it here for your records and submit it according to your company's policy.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("mcdonalds.com"),
      businessName: "McDonald's",
      addressLine1: "110 N Carpenter St",
      addressLine2: "Chicago, IL 60607",
      phone: "(312) 867-5309",
      taxLabel: "Restaurant Tax",
      taxRate: 10.25,
      register: "Order #1042",
      footerMessage: "I'm Lovin' It!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Big Mac Meal (M)", quantity: 1, price: 9.29 },
        { id: id(), name: "10pc Chicken McNuggets", quantity: 1, price: 5.69 },
        { id: id(), name: "Large Coca-Cola", quantity: 1, price: 1.99 },
      ],
    },
  },
  {
    slug: "starbucks",
    name: "Starbucks Receipt",
    shortName: "Starbucks",
    icon: "☕",
    seoTitle: "Free Starbucks Receipt Generator — Coffee Receipt Maker",
    seoDescription:
      "Create a Starbucks coffee receipt in seconds. Free PDF & PNG download, no watermark, completely private.",
    heading: "Starbucks Receipt Generator",
    intro:
      "Make a coffee shop receipt for Starbucks. Add your lattes, cold brews, and pastries for petty cash and expense reports.",
    useCases: [
      "Office coffee-run reimbursement",
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
      "Create a Burger King receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Burger King Receipt Generator",
    intro:
      "Generate a realistic Burger King receipt for your flame-grilled meal. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Replace lost meal receipts",
      "Personal budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Burger King receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Wendy's receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Wendy's Receipt Generator",
    intro:
      "Generate a fresh, never-frozen Wendy's receipt. Ideal for meal expense tracking and reimbursement.",
    useCases: [
      "Business travel meal expenses",
      "Replacing lost fast food receipts",
      "Personal accounting and budgeting",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Wendy's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Subway receipt online in seconds. Add your subs, drinks, and cookies. Free PDF download.",
    heading: "Subway Receipt Generator",
    intro:
      "Build a Subway sandwich receipt with sub types, sizes, and extras. Great for work-lunch reimbursements.",
    useCases: [
      "Lunch expense reimbursement",
      "Replacing a lost Subway receipt",
      "Corporate catering documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Subway receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Taco Bell receipt online in seconds. Add your burritos, tacos, and combos. Free PDF download.",
    heading: "Taco Bell Receipt Generator",
    intro:
      "Generate a Taco Bell receipt with your favorite Mexican-inspired items. Perfect for on-the-go meal expense tracking.",
    useCases: [
      "Travel meal expense documentation",
      "Replace a lost Taco Bell receipt",
      "Per-diem food tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Taco Bell receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a KFC receipt online in seconds. Add your chicken meals, sides, and drinks. Free PDF download.",
    heading: "KFC Receipt Generator",
    intro:
      "Generate a finger-lickin' good KFC receipt. Include chicken buckets, sides, and drinks for travel meal reimbursement.",
    useCases: [
      "Team lunch expense claims",
      "Lost KFC receipt replacement",
      "Personal food budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the KFC receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Chipotle receipt online in seconds. Add burritos, bowls, and guac. Free PDF download.",
    heading: "Chipotle Receipt Generator",
    intro:
      "Build a Chipotle Mexican Grill receipt with burritos, bowls, and sides. Great for lunch expense reports.",
    useCases: [
      "Work lunch reimbursement",
      "Replace a lost Chipotle receipt",
      "Catering expense documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Chipotle receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Domino's Pizza receipt online in seconds. Add pizzas, wings, and breadsticks. Free PDF download.",
    heading: "Domino's Pizza Receipt Generator",
    intro:
      "Generate a Domino's delivery or carryout receipt. Include pizzas, wings, sides, and delivery fee for expense tracking.",
    useCases: [
      "Team pizza expense reimbursement",
      "Replace a lost delivery receipt",
      "Event catering documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Domino's Pizza receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Pizza Hut receipt online in seconds. Add your pizzas, pasta, and wings. Free PDF download.",
    heading: "Pizza Hut Receipt Generator",
    intro:
      "Generate a Pizza Hut dine-in, delivery, or carryout receipt with pan pizzas, wings, and desserts.",
    useCases: [
      "Group dinner expense tracking",
      "Replace a lost Pizza Hut receipt",
      "Office party food documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Pizza Hut receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Papa John's receipt online in seconds. Add pizzas, sides, and dipping sauces. Free PDF download.",
    heading: "Papa John's Receipt Generator",
    intro:
      "Make a Papa John's pizza delivery receipt with your favorite pies, sides, and garlic dipping sauce.",
    useCases: [
      "Office pizza order documentation",
      "Lost delivery receipt replacement",
      "Event food expense claims",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Papa John's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Chick-fil-A receipt online in seconds. Add sandwiches, nuggets, and lemonade. Free PDF download.",
    heading: "Chick-fil-A Receipt Generator",
    intro:
      "Generate a Chick-fil-A receipt featuring their signature chicken sandwiches, nuggets, and classic lemonade.",
    useCases: [
      "Team lunch expense documentation",
      "Replace a lost Chick-fil-A receipt",
      "Per-diem meal tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Chick-fil-A receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Panera Bread receipt online in seconds. Add soups, salads, and sandwiches. Free PDF download.",
    heading: "Panera Bread Receipt Generator",
    intro:
      "Generate a Panera Bread receipt with soups, salads, sandwiches, and bakery items. Perfect for work-lunch reimbursement.",
    useCases: [
      "Client meeting lunch receipts",
      "Replace lost Panera receipt",
      "Corporate catering tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Panera Bread receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Five Guys receipt online in seconds. Add your burgers, fries, and shakes. Free PDF download.",
    heading: "Five Guys Receipt Generator",
    intro:
      "Generate a Five Guys receipt with customizable burgers, Cajun fries, and milkshakes. Great for meal expense reports.",
    useCases: [
      "Business lunch reimbursement",
      "Replace a lost Five Guys receipt",
      "Travel per-diem tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Five Guys receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an In-N-Out Burger receipt online. Add Double-Doubles, Animal Fries, and shakes. Free PDF.",
    heading: "In-N-Out Burger Receipt Generator",
    intro:
      "Generate an In-N-Out Burger receipt with your favorite secret-menu items. Quality you can taste.",
    useCases: [
      "West coast travel expense claims",
      "Replace a lost In-N-Out receipt",
      "Personal meal budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the In-N-Out Burger receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Shake Shack receipt online in seconds. Add ShackBurgers, crinkle fries, and shakes. Free PDF.",
    heading: "Shake Shack Receipt Generator",
    intro:
      "Generate a Shake Shack receipt with ShackBurgers, crinkle-cut fries, and frozen custard concretes.",
    useCases: [
      "NYC dining expense documentation",
      "Replace a lost Shake Shack receipt",
      "Team lunch reimbursement",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Shake Shack receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Panda Express receipt online in seconds. Add plates, bowls, and entrees. Free PDF download.",
    heading: "Panda Express Receipt Generator",
    intro:
      "Generate a Panda Express receipt with plates, bowls, and A La Carte items. Great for quick-service meal documentation.",
    useCases: [
      "Mall food court expense claims",
      "Replace a lost Panda Express receipt",
      "Personal meal tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Panda Express receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Sonic Drive-In receipt online in seconds. Add burgers, tots, and Slushes. Free PDF download.",
    heading: "Sonic Drive-In Receipt Generator",
    intro:
      "Generate a Sonic Drive-In receipt with SuperSONIC burgers, tots, and classic Slushes. Perfect for carhop-style meal tracking.",
    useCases: [
      "Travel meal reimbursement",
      "Replace a lost Sonic receipt",
      "Personal food budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sonic Drive-In receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Dairy Queen receipt online in seconds. Add Blizzards, baskets, and cakes. Free PDF download.",
    heading: "Dairy Queen Receipt Generator",
    intro:
      "Generate a DQ receipt with Blizzard treats, burger baskets, and classic dipped cones. Happy tastes good.",
    useCases: [
      "Dessert stop expense claims",
      "Replace a lost DQ receipt",
      "Party cake order documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Dairy Queen receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Arby's receipt online in seconds. Add roast beef sandwiches, curly fries, and shakes. Free PDF.",
    heading: "Arby's Receipt Generator",
    intro:
      "Generate an Arby's receipt with roast beef sandwiches, curly fries, and Jamocha shakes. We have the meats!",
    useCases: [
      "Travel lunch expense documentation",
      "Replace a lost Arby's receipt",
      "Per-diem meal tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Arby's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Jack in the Box receipt online. Add tacos, burgers, and curly fries. Free PDF download.",
    heading: "Jack in the Box Receipt Generator",
    intro:
      "Generate a Jack in the Box receipt with their famous tacos, Jumbo Jack burgers, and late-night combos.",
    useCases: [
      "Late-night meal expense claims",
      "Replace a lost JITB receipt",
      "Food budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Jack in the Box receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Popeyes receipt online in seconds. Add chicken sandwiches, tenders, and biscuits. Free PDF.",
    heading: "Popeyes Receipt Generator",
    intro:
      "Generate a Popeyes Louisiana Kitchen receipt with spicy chicken, tenders, and buttermilk biscuits.",
    useCases: [
      "Fast food expense reimbursement",
      "Replace a lost Popeyes receipt",
      "Per-diem meal tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Popeyes receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Dunkin' receipt online in seconds. Add coffee, donuts, and breakfast sandwiches. Free PDF download.",
    heading: "Dunkin' Receipt Generator",
    intro:
      "Make a Dunkin' receipt with iced coffees, donuts, and bagel sandwiches. America runs on Dunkin'.",
    useCases: [
      "Morning coffee run reimbursement",
      "Replace a lost Dunkin' receipt",
      "Petty cash documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Dunkin' receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Tim Hortons receipt online in seconds. Add coffee, Timbits, and sandwiches. Free PDF download.",
    heading: "Tim Hortons Receipt Generator",
    intro:
      "Make a Tim Hortons receipt with double-doubles, Timbits, and breakfast wraps. Always fresh.",
    useCases: [
      "Cross-border travel meal claims",
      "Replace a lost Tim Hortons receipt",
      "Office coffee run documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Tim Hortons receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Peet's Coffee receipt online in seconds. Add lattes, cold brews, and pastries. Free PDF download.",
    heading: "Peet's Coffee Receipt Generator",
    intro:
      "Make a Peet's Coffee receipt with hand-roasted espresso drinks and pastries. Coffee of exceptional quality.",
    useCases: [
      "Office coffee reimbursement",
      "Replace a lost Peet's receipt",
      "Personal caffeine budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Peet's Coffee receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Caribou Coffee receipt online in seconds. Add crafted drinks and bakery items. Free PDF download.",
    heading: "Caribou Coffee Receipt Generator",
    intro:
      "Make a Caribou Coffee receipt with handcrafted drinks and fresh bakery goods. Life is short, stay awake for it.",
    useCases: [
      "Midwest travel coffee receipts",
      "Replace a lost Caribou receipt",
      "Team coffee run tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Caribou Coffee receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Dutch Bros receipt online in seconds. Add Rebels, Frosts, and cold brews. Free PDF download.",
    heading: "Dutch Bros Receipt Generator",
    intro:
      "Make a Dutch Bros receipt with Rebels, Frosts, and their signature coffee drinks. Drink one for me!",
    useCases: [
      "Drive-thru coffee expense tracking",
      "Replace a lost Dutch Bros receipt",
      "Personal drink budget",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Dutch Bros receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Jamba Juice receipt online in seconds. Add smoothies, bowls, and boosts. Free PDF download.",
    heading: "Jamba Juice Receipt Generator",
    intro:
      "Make a Jamba receipt with smoothies, acai bowls, and energy boosts. Blend in the good.",
    useCases: [
      "Health-focused meal reimbursement",
      "Replace a lost Jamba receipt",
      "Wellness expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Jamba Juice receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Boba Guys receipt online in seconds. Add milk teas, matcha, and toppings. Free PDF download.",
    heading: "Boba Guys Receipt Generator",
    intro:
      "Make a Boba Guys receipt with premium milk teas, matcha drinks, and organic tapioca. Real ingredients, real boba.",
    useCases: [
      "Boba run reimbursement",
      "Replace a lost bubble tea receipt",
      "Personal treat tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Boba Guys receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Costco receipt online in seconds. Add bulk items, electronics, and groceries. Free PDF download.",
    heading: "Costco Receipt Generator",
    intro:
      "Create a Costco Wholesale receipt with bulk-buy items, electronics, and groceries. Member pricing included.",
    useCases: [
      "Business bulk purchase documentation",
      "Replace a lost Costco receipt for returns",
      "Household expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Costco receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Sam's Club receipt online in seconds. Add warehouse club items and groceries. Free PDF download.",
    heading: "Sam's Club Receipt Generator",
    intro:
      "Create a Sam's Club warehouse receipt with bulk groceries, office supplies, and electronics.",
    useCases: [
      "Office supply bulk purchase claims",
      "Replace a lost Sam's Club receipt",
      "Small business inventory tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sam's Club receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Whole Foods Market receipt online in seconds. Add organic produce and groceries. Free PDF.",
    heading: "Whole Foods Receipt Generator",
    intro:
      "Create a Whole Foods Market receipt with organic produce, 365 brand items, and specialty groceries.",
    useCases: [
      "Organic grocery reimbursement",
      "Replace a lost Whole Foods receipt",
      "Health-focused budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Whole Foods receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Trader Joe's receipt online. Add TJ's favorites, frozen meals, and snacks. Free PDF download.",
    heading: "Trader Joe's Receipt Generator",
    intro:
      "Create a Trader Joe's receipt with their iconic private-label products, frozen favorites, and specialty snacks.",
    useCases: [
      "Grocery run expense documentation",
      "Replace a lost TJ's receipt",
      "Personal grocery budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Trader Joe's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Kroger receipt online in seconds. Add groceries, produce, and household items. Free PDF download.",
    heading: "Kroger Receipt Generator",
    intro:
      "Create a Kroger receipt with weekly grocery items, produce, and household essentials. Fresh for everyone.",
    useCases: [
      "Grocery shopping reimbursement",
      "Replace a lost Kroger receipt",
      "Household expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Kroger receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Publix receipt online in seconds. Add groceries, deli items, and bakery goods. Free PDF download.",
    heading: "Publix Receipt Generator",
    intro:
      "Create a Publix receipt with deli subs, bakery items, and weekly BOGO deals. Where shopping is a pleasure.",
    useCases: [
      "Southeast US grocery reimbursement",
      "Replace a lost Publix receipt",
      "Household grocery tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Publix receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("publix.com"),
      businessName: "White Oak Village",
      addressLine1: "4591 South Laburnum Ave",
      addressLine2: "Richmond, VA 23231",
      phone: "(804) 226-1915",
      taxLabel: "Sales Tax",
      taxRate: 6.5,
      register: "",
      cashier: "Your cashier was Dominic",
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
      "Create a Safeway receipt online in seconds. Add groceries and Club Card savings. Free PDF download.",
    heading: "Safeway Receipt Generator",
    intro:
      "Create a Safeway receipt with grocery items, Club Card savings, and weekly deals.",
    useCases: [
      "Grocery reimbursement claims",
      "Replace a lost Safeway receipt",
      "Household budget documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Safeway receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Aldi receipt online in seconds. Add discount groceries and specialty finds. Free PDF download.",
    heading: "Aldi Receipt Generator",
    intro:
      "Create an Aldi receipt with their exclusive brands, Aldi Finds, and everyday low-price groceries.",
    useCases: [
      "Budget grocery reimbursement",
      "Replace a lost Aldi receipt",
      "Personal savings tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Aldi receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
    seoTitle: "Free Walgreens Receipt Generator — Walgreens Receipt Maker",
    seoDescription:
      "Create a Walgreens receipt online. Add pharmacy, health, and convenience items. Free PDF download.",
    heading: "Walgreens Receipt Generator",
    intro:
      "Create a Walgreens receipt with pharmacy items, health products, and convenience store essentials.",
    useCases: [
      "Health expense reimbursement",
      "Replace a lost pharmacy receipt",
      "FSA/HSA documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Walgreens receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
    seoTitle:
      "Free CVS Pharmacy Receipt Generator — CVS Receipt Maker",
    seoDescription:
      "Create a CVS Pharmacy receipt online in seconds. Add health and beauty items. Free PDF download.",
    heading: "CVS Pharmacy Receipt Generator",
    intro:
      "Create a CVS Pharmacy receipt (infamously long!) with health, beauty, and ExtraBucks Rewards.",
    useCases: [
      "Pharmacy reimbursement claims",
      "FSA/HSA eligible item documentation",
      "Replace a lost CVS receipt",
    ],
    faqs: [
      {
        question: "Can I customize the items on the CVS Pharmacy receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
    seoTitle:
      "Free Home Depot Receipt Generator — Home Depot Receipt Maker",
    seoDescription:
      "Create a Home Depot receipt online. Add tools, lumber, and hardware supplies. Free PDF download.",
    heading: "Home Depot Receipt Generator",
    intro:
      "Create a Home Depot receipt with tools, building materials, and home improvement supplies.",
    useCases: [
      "Contractor material reimbursement",
      "Replace a lost Home Depot receipt for returns",
      "Home renovation expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Home Depot receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
    seoTitle: "Free Lowe's Receipt Generator — Lowe's Receipt Maker",
    seoDescription:
      "Create a Lowe's receipt online. Add appliances, tools, and building supplies. Free PDF download.",
    heading: "Lowe's Receipt Generator",
    intro:
      "Create a Lowe's receipt with appliances, plumbing supplies, and home improvement materials.",
    useCases: [
      "Home improvement deductions",
      "Replace a lost Lowe's receipt",
      "Contractor supply documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Lowe's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an IKEA receipt online in seconds. Add furniture, accessories, and food court items. Free PDF.",
    heading: "IKEA Receipt Generator",
    intro:
      "Create an IKEA receipt with flat-pack furniture, home décor, and even those famous Swedish meatballs.",
    useCases: [
      "Office furniture reimbursement",
      "Replace a lost IKEA receipt for returns",
      "Moving expense documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the IKEA receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
    seoTitle: "Free Best Buy Receipt Generator — Best Buy Receipt Maker",
    seoDescription:
      "Create a Best Buy receipt online in seconds. Add electronics, appliances, and accessories. Free PDF.",
    heading: "Best Buy Receipt Generator",
    intro:
      "Create a Best Buy receipt with electronics, laptops, TVs, and Geek Squad services.",
    useCases: [
      "IT equipment purchase documentation",
      "Replace a lost Best Buy receipt for warranty",
      "Business electronics reimbursement",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Best Buy receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Macy's receipt online in seconds. Add clothing, accessories, and home goods. Free PDF.",
    heading: "Macy's Receipt Generator",
    intro:
      "Create a Macy's department store receipt with apparel, beauty, and home products.",
    useCases: [
      "Wardrobe expense documentation",
      "Replace a lost Macy's receipt for returns",
      "Gift purchase tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Macy's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Nordstrom receipt online in seconds. Add designer fashion and accessories. Free PDF download.",
    heading: "Nordstrom Receipt Generator",
    intro:
      "Create a Nordstrom receipt with premium fashion, shoes, and beauty products. In style since 1901.",
    useCases: [
      "Professional wardrobe reimbursement",
      "Replace a lost Nordstrom receipt",
      "Gift receipt documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Nordstrom receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Sephora receipt online in seconds. Add beauty, skincare, and fragrance items. Free PDF.",
    heading: "Sephora Receipt Generator",
    intro:
      "Create a Sephora receipt with prestige beauty, skincare, and fragrance products.",
    useCases: [
      "Beauty product gift receipt",
      "Replace a lost Sephora receipt for returns",
      "Personal beauty budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sephora receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Ulta Beauty receipt online in seconds. Add makeup, haircare, and skincare. Free PDF download.",
    heading: "Ulta Beauty Receipt Generator",
    intro:
      "Create an Ulta Beauty receipt with drugstore and prestige beauty, plus salon services.",
    useCases: [
      "Beauty supply reimbursement",
      "Replace a lost Ulta receipt for returns",
      "Salon service documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Ulta Beauty receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a GameStop receipt online in seconds. Add games, consoles, and collectibles. Free PDF download.",
    heading: "GameStop Receipt Generator",
    intro:
      "Create a GameStop receipt with video games, consoles, accessories, and collectibles.",
    useCases: [
      "Gaming purchase documentation",
      "Replace a lost GameStop receipt for trades",
      "Gift purchase tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the GameStop receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
    seoTitle:
      "Free Apple Store Receipt Generator — Apple Store Receipt Maker",
    seoDescription:
      "Create an Apple Store receipt online in seconds. Add iPhones, MacBooks, and accessories. Free PDF.",
    heading: "Apple Store Receipt Generator",
    intro:
      "Create a premium Apple Store receipt with iPhones, MacBooks, AirPods, and AppleCare protection.",
    useCases: [
      "IT equipment purchase receipts",
      "Replace a lost Apple receipt for warranty",
      "Business electronics documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Apple Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a TJ Maxx receipt online in seconds. Add designer fashion at discount prices. Free PDF.",
    heading: "TJ Maxx Receipt Generator",
    intro:
      "Create a TJ Maxx receipt with brand-name clothing, shoes, and home décor at off-price deals.",
    useCases: [
      "Discount fashion expense tracking",
      "Replace a lost TJ Maxx receipt for returns",
      "Gift purchase documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the TJ Maxx receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Marshalls receipt online in seconds. Add off-price designer goods. Free PDF download.",
    heading: "Marshalls Receipt Generator",
    intro:
      "Create a Marshalls receipt with brand-name fashion, shoes, and home goods at discount prices.",
    useCases: [
      "Off-price shopping documentation",
      "Replace a lost Marshalls receipt",
      "Personal fashion budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Marshalls receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Dick's Sporting Goods receipt online. Add athletic gear, shoes, and equipment. Free PDF.",
    heading: "Dick's Sporting Goods Receipt Generator",
    intro:
      "Create a Dick's Sporting Goods receipt with athletic apparel, footwear, and sports equipment.",
    useCases: [
      "Team equipment reimbursement",
      "Replace a lost Dick's receipt",
      "Fitness expense tracking",
    ],
    faqs: [
      {
        question:
          "Can I customize the items on the Dick's Sporting Goods receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Petco receipt online in seconds. Add pet food, toys, and grooming services. Free PDF.",
    heading: "Petco Receipt Generator",
    intro:
      "Create a Petco receipt with pet food, treats, toys, and grooming services. Health + Happiness.",
    useCases: [
      "Pet care expense tracking",
      "Replace a lost Petco receipt",
      "Grooming service documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Petco receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a PetSmart receipt online in seconds. Add pet supplies, grooming, and vet services. Free PDF.",
    heading: "PetSmart Receipt Generator",
    intro:
      "Create a PetSmart receipt with pet food, toys, grooming, and Banfield vet services.",
    useCases: [
      "Pet supply reimbursement",
      "Replace a lost PetSmart receipt",
      "Veterinary expense documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the PetSmart receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an AutoZone receipt online in seconds. Add auto parts, oil, and accessories. Free PDF download.",
    heading: "AutoZone Receipt Generator",
    intro:
      "Create an AutoZone receipt with auto parts, motor oil, and vehicle accessories. Get in the zone!",
    useCases: [
      "Vehicle maintenance reimbursement",
      "Replace a lost AutoZone receipt",
      "Fleet maintenance tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the AutoZone receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an O'Reilly Auto Parts receipt online. Add auto parts and supplies. Free PDF download.",
    heading: "O'Reilly Auto Parts Receipt Generator",
    intro:
      "Create an O'Reilly Auto Parts receipt with parts, tools, and car care products. The right parts, right price.",
    useCases: [
      "Vehicle repair reimbursement",
      "Replace a lost O'Reilly receipt",
      "Company vehicle maintenance docs",
    ],
    faqs: [
      {
        question:
          "Can I customize the items on the O'Reilly Auto Parts receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Amazon receipt online in seconds. Add products, Prime delivery, and order details. Free PDF.",
    heading: "Amazon Receipt Generator",
    intro:
      "Generate an Amazon order receipt with individual items, shipping, and payment details. Great for expense claims.",
    useCases: [
      "Online order expense documentation",
      "Business purchase reimbursement",
      "Personal accounting records",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Amazon receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an eBay receipt online in seconds. Add auction or Buy It Now purchases. Free PDF download.",
    heading: "eBay Receipt Generator",
    intro:
      "Generate an eBay marketplace receipt for auction wins or Buy It Now purchases.",
    useCases: [
      "Online marketplace purchase claims",
      "Replace a lost eBay payment receipt",
      "Resale business documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the eBay receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
    slug: "netflix",
    name: "Netflix Receipt",
    shortName: "Netflix",
    icon: "🎬",
    seoTitle: "Free Netflix Receipt Generator — Netflix Billing Receipt Maker",
    seoDescription:
      "Create a Netflix billing receipt online in seconds. Document your subscription charges. Free PDF.",
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
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Spotify billing receipt online. Document your Premium subscription. Free PDF download.",
    heading: "Spotify Receipt Generator",
    intro:
      "Generate a Spotify subscription receipt for Premium individual, family, or student plans.",
    useCases: [
      "Music subscription documentation",
      "Replace a lost billing receipt",
      "Personal expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Spotify receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Hulu billing receipt online. Document your streaming subscription. Free PDF download.",
    heading: "Hulu Receipt Generator",
    intro:
      "Generate a Hulu subscription receipt for basic, premium, or live TV plans.",
    useCases: [
      "Streaming expense documentation",
      "Replace a lost Hulu billing receipt",
      "Household budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hulu receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Disney+ billing receipt online. Document your streaming subscription. Free PDF download.",
    heading: "Disney+ Receipt Generator",
    intro:
      "Generate a Disney+ subscription receipt. Where the best stories in the world all live.",
    useCases: [
      "Family entertainment expense docs",
      "Replace a lost Disney+ billing receipt",
      "Subscription tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Disney+ receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Apple Services receipt online. Document iCloud, Apple Music, and Apple One. Free PDF.",
    heading: "Apple Services Receipt Generator",
    intro:
      "Generate an Apple Services receipt for iCloud+, Apple Music, Apple TV+, or Apple One bundles.",
    useCases: [
      "Cloud storage expense documentation",
      "Replace a lost Apple billing receipt",
      "Subscription expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Apple Services receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Google Play receipt online. Document app purchases and subscriptions. Free PDF download.",
    heading: "Google Play Receipt Generator",
    intro:
      "Generate a Google Play receipt for app purchases, in-app buys, and subscription renewals.",
    useCases: [
      "App purchase reimbursement",
      "Replace a lost Google Play receipt",
      "Digital expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Google Play receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Microsoft Store receipt online. Add software, subscriptions, and hardware. Free PDF download.",
    heading: "Microsoft Store Receipt Generator",
    intro:
      "Generate a Microsoft Store receipt for Microsoft 365, Xbox Game Pass, or Surface purchases.",
    useCases: [
      "Software license documentation",
      "Replace a lost Microsoft receipt",
      "Business IT expense claims",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Microsoft Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Steam receipt online in seconds. Add game purchases and DLC. Free PDF download.",
    heading: "Steam Receipt Generator",
    intro:
      "Generate a Steam digital storefront receipt for game purchases, DLC, and in-game items.",
    useCases: [
      "Gaming expense documentation",
      "Replace a lost Steam purchase receipt",
      "Entertainment budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Steam receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a PlayStation Store receipt online. Add game and PS Plus purchases. Free PDF download.",
    heading: "PlayStation Store Receipt Generator",
    intro:
      "Generate a PlayStation Store receipt for digital game purchases and PS Plus subscriptions.",
    useCases: [
      "Gaming expense documentation",
      "Replace a lost PS Store receipt",
      "Subscription tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the PlayStation Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Xbox Store receipt online. Add game and Game Pass purchases. Free PDF download.",
    heading: "Xbox Store Receipt Generator",
    intro:
      "Generate an Xbox Store receipt for digital games, Game Pass, and in-game purchases.",
    useCases: [
      "Gaming expense documentation",
      "Replace a lost Xbox receipt",
      "Subscription budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Xbox Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Adobe receipt online. Document Creative Cloud and Acrobat subscriptions. Free PDF.",
    heading: "Adobe Receipt Generator",
    intro:
      "Generate an Adobe receipt for Creative Cloud, Acrobat Pro, and Stock subscriptions.",
    useCases: [
      "Creative software reimbursement",
      "Replace a lost Adobe billing receipt",
      "Business subscription documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Adobe receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Zoom receipt online. Document your Zoom Workplace plan subscription. Free PDF download.",
    heading: "Zoom Receipt Generator",
    intro:
      "Generate a Zoom receipt for Workplace Pro, Business, or Webinar plan subscriptions.",
    useCases: [
      "Business communication reimbursement",
      "Replace a lost Zoom billing receipt",
      "Remote work expense documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Zoom receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
    seoTitle: "Free Lyft Receipt Generator — Lyft Ride Receipt Maker",
    seoDescription:
      "Create a Lyft receipt online in seconds. Add ride fare, distance, and tip. Free PDF download.",
    heading: "Lyft Receipt Generator",
    intro:
      "Generate a Lyft rideshare receipt with base fare, distance, time, and tip. Your ride, your way.",
    useCases: [
      "Business travel ride claims",
      "Replace a lost Lyft ride receipt",
      "Client travel billing",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Lyft receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a DoorDash receipt online. Add food items, delivery, and service fees. Free PDF download.",
    heading: "DoorDash Receipt Generator",
    intro:
      "Create a DoorDash food delivery receipt with restaurant items, delivery fee, service fee, and driver tip.",
    useCases: [
      "Food delivery expense claims",
      "Replace a lost DoorDash receipt",
      "Travel meal documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the DoorDash receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Uber Eats receipt online. Add food, delivery, and service fees. Free PDF download.",
    heading: "Uber Eats Receipt Generator",
    intro:
      "Create an Uber Eats food delivery receipt with restaurant items, fees, and tip.",
    useCases: [
      "Delivery meal expense claims",
      "Replace a lost Uber Eats receipt",
      "Business travel food documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Uber Eats receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Grubhub receipt online. Add food delivery items and fees. Free PDF download.",
    heading: "Grubhub Receipt Generator",
    intro:
      "Create a Grubhub food delivery receipt with restaurant items, delivery fees, and tip.",
    useCases: [
      "Food delivery reimbursement",
      "Replace a lost Grubhub receipt",
      "Per-diem meal expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Grubhub receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Postmates receipt online. Add delivery items and fees. Free PDF download.",
    heading: "Postmates Receipt Generator",
    intro:
      "Create a Postmates delivery receipt for food, groceries, or any on-demand delivery.",
    useCases: [
      "On-demand delivery documentation",
      "Replace a lost Postmates receipt",
      "Business meal reimbursement",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Postmates receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Instacart receipt online. Add grocery delivery items and fees. Free PDF download.",
    heading: "Instacart Receipt Generator",
    intro:
      "Create an Instacart grocery delivery receipt with items, delivery fee, service fee, and shopper tip.",
    useCases: [
      "Grocery delivery reimbursement",
      "Replace a lost Instacart receipt",
      "Household grocery tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Instacart receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Airbnb receipt online. Add nightly rates, cleaning, and service fees. Free PDF download.",
    heading: "Airbnb Receipt Generator",
    intro:
      "Make an Airbnb receipt with nightly rates, cleaning fees, and service charges for travel reimbursement.",
    useCases: [
      "Business travel lodging claims",
      "Replace a lost Airbnb receipt",
      "Rental host income documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Airbnb receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Expedia receipt online. Add hotel, flight, and car rental bookings. Free PDF download.",
    heading: "Expedia Receipt Generator",
    intro:
      "Make an Expedia receipt for hotel bookings, flights, or car rentals for business travel reimbursement.",
    useCases: [
      "Corporate travel booking documentation",
      "Replace a lost Expedia receipt",
      "Multi-component trip tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Expedia receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Booking.com receipt online. Add hotel booking details and fees. Free PDF download.",
    heading: "Booking.com Receipt Generator",
    intro:
      "Make a Booking.com receipt with hotel booking details, nightly rates, and taxes for trip reimbursement.",
    useCases: [
      "International travel lodging claims",
      "Replace a lost Booking.com receipt",
      "Conference travel documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Booking.com receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Delta Airlines receipt online. Add flight, baggage, and upgrade charges. Free PDF download.",
    heading: "Delta Airlines Receipt Generator",
    intro:
      "Make a Delta Air Lines receipt with flight charges, seat upgrades, and checked baggage fees.",
    useCases: [
      "Business flight reimbursement",
      "Replace a lost Delta boarding receipt",
      "Travel expense documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Delta Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an American Airlines receipt online. Add flight and ancillary charges. Free PDF download.",
    heading: "American Airlines Receipt Generator",
    intro:
      "Make an American Airlines receipt with base fare, seat selection, and baggage fees.",
    useCases: [
      "Corporate flight expense claims",
      "Replace a lost AA receipt",
      "Travel budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the American Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a United Airlines receipt online. Add flight and service charges. Free PDF download.",
    heading: "United Airlines Receipt Generator",
    intro:
      "Make a United Airlines receipt with airfare, Economy Plus upgrades, and in-flight purchases.",
    useCases: [
      "Business flight reimbursement",
      "Replace a lost United receipt",
      "Corporate travel documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the United Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Southwest Airlines receipt online. Free bags, no change fees. Free PDF download.",
    heading: "Southwest Airlines Receipt Generator",
    intro:
      "Make a Southwest Airlines receipt with Wanna Get Away, Anytime, or Business Select fares.",
    useCases: [
      "No-frills flight reimbursement",
      "Replace a lost Southwest receipt",
      "Low-cost travel documentation",
    ],
    faqs: [
      {
        question:
          "Can I customize the items on the Southwest Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Marriott receipt online. Add room, resort fees, and incidentals. Free PDF download.",
    heading: "Marriott Receipt Generator",
    intro:
      "Make a Marriott hotel receipt with room charges, resort fees, valet parking, and room service.",
    useCases: [
      "Business hotel stay reimbursement",
      "Replace a lost Marriott folio",
      "Conference travel documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Marriott receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Hilton receipt online. Add room charges, parking, and dining. Free PDF download.",
    heading: "Hilton Receipt Generator",
    intro:
      "Make a Hilton hotel receipt with room rates, parking, dining charges, and Hilton Honors points.",
    useCases: [
      "Business hotel reimbursement",
      "Replace a lost Hilton folio",
      "Loyalty points documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hilton receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Hyatt receipt online. Add room charges, spa, and dining. Free PDF download.",
    heading: "Hyatt Receipt Generator",
    intro:
      "Make a Hyatt hotel receipt with room charges, spa treatments, and World of Hyatt loyalty details.",
    useCases: [
      "Luxury hotel stay documentation",
      "Replace a lost Hyatt folio",
      "Conference travel reimbursement",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hyatt receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Hertz car rental receipt online. Add rental days, fuel, and insurance. Free PDF download.",
    heading: "Hertz Receipt Generator",
    intro:
      "Make a Hertz car rental receipt with daily rate, fuel charges, and insurance options.",
    useCases: [
      "Business car rental reimbursement",
      "Replace a lost Hertz rental receipt",
      "Travel fleet expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hertz receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Enterprise car rental receipt online. Add rental charges and extras. Free PDF download.",
    heading: "Enterprise Receipt Generator",
    intro:
      "Make an Enterprise Rent-A-Car receipt with daily rates, insurance, and fuel charges.",
    useCases: [
      "Company car rental reimbursement",
      "Replace a lost Enterprise receipt",
      "Fleet rental documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Enterprise receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Avis car rental receipt online. Add rental days, insurance, and extras. Free PDF.",
    heading: "Avis Receipt Generator",
    intro:
      "Make an Avis car rental receipt with daily rates, roadside assistance, and GPS add-ons.",
    useCases: [
      "Corporate rental car documentation",
      "Replace a lost Avis receipt",
      "Travel fleet tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Avis receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a 7-Eleven receipt online. Add Slurpees, snacks, and fuel. Free PDF download.",
    heading: "7-Eleven Receipt Generator",
    intro:
      "Create a 7-Eleven receipt with Slurpees, Big Gulps, snacks, and fuel for mileage and expense logs.",
    useCases: [
      "Road trip fuel receipts",
      "Replace a lost 7-Eleven receipt",
      "Convenience store expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the 7-Eleven receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      logoDataUrl: brandLogo("7-eleven.com"),
      businessName: "7-Eleven",
      addressLine1: "3992 Havana St",
      addressLine2: "Denver, CO 80239",
      phone: "(303) 371-9329",
      taxLabel: "Sales Tax",
      taxRate: 8.25,
      register: "Store #35053",
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
      "Create a Shell gas station receipt online. Add fuel gallons and convenience items. Free PDF.",
    heading: "Shell Receipt Generator",
    intro:
      "Create a Shell gas station receipt with fuel purchases and convenience store items for mileage logs.",
    useCases: [
      "Fuel expense reimbursement",
      "Replace a lost Shell gas receipt",
      "Fleet fuel tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Shell receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
    seoTitle: "Free Chevron Receipt Generator — Chevron Gas Receipt Maker",
    seoDescription:
      "Create a Chevron gas station receipt online. Add fuel and convenience items. Free PDF download.",
    heading: "Chevron Receipt Generator",
    intro:
      "Create a Chevron gas station receipt with Techron fuel and ExtraMile convenience items.",
    useCases: [
      "Company fuel reimbursement",
      "Replace a lost Chevron receipt",
      "Mileage and fuel tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Chevron receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an Exxon gas station receipt online. Add fuel gallons and snacks. Free PDF download.",
    heading: "Exxon Receipt Generator",
    intro:
      "Create an Exxon gas station receipt with Synergy fuel and convenience purchases.",
    useCases: [
      "Fleet fuel expense claims",
      "Replace a lost Exxon gas receipt",
      "Company vehicle fuel tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Exxon receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Mobil gas station receipt online. Add fuel purchases and car care. Free PDF download.",
    heading: "Mobil Receipt Generator",
    intro:
      "Create a Mobil gas station receipt with Synergy Supreme+ fuel and On the Run® convenience items.",
    useCases: [
      "Business fuel reimbursement",
      "Replace a lost Mobil gas receipt",
      "Fleet fuel documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Mobil receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a BP gas station receipt online. Add fuel and ampm convenience items. Free PDF download.",
    heading: "BP Receipt Generator",
    intro:
      "Create a BP gas station receipt with Invigorate® fuel and ampm convenience store items.",
    useCases: [
      "Road trip fuel documentation",
      "Replace a lost BP gas receipt",
      "Commercial fuel tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the BP receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Speedway receipt online. Add fuel and Speedy Rewards items. Free PDF download.",
    heading: "Speedway Receipt Generator",
    intro:
      "Create a Speedway gas station receipt with fuel purchases and Speedy Rewards points.",
    useCases: [
      "Fuel purchase documentation",
      "Replace a lost Speedway receipt",
      "Rewards points tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Speedway receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Wawa receipt online. Add hoagies, coffee, and fuel. Free PDF download.",
    heading: "Wawa Receipt Generator",
    intro:
      "Create a Wawa receipt with custom hoagies, fresh coffee, and fuel for East Coast travel logs.",
    useCases: [
      "East Coast road trip receipts",
      "Replace a lost Wawa receipt",
      "Lunch and fuel expense claims",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Wawa receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a QuikTrip receipt online. Add fuel, drinks, and QT Kitchen items. Free PDF download.",
    heading: "QuikTrip Receipt Generator",
    intro:
      "Create a QuikTrip receipt with fuel, QT Kitchen fresh food, and convenience items.",
    useCases: [
      "Southern road trip fuel receipts",
      "Replace a lost QT receipt",
      "Fleet fuel documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the QuikTrip receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Sheetz receipt online. Add MTO food, fuel, and drinks. Free PDF download.",
    heading: "Sheetz Receipt Generator",
    intro:
      "Create a Sheetz receipt with Made-To-Order food, fuel, and Sheetz Bros coffee.",
    useCases: [
      "Mid-Atlantic travel receipts",
      "Replace a lost Sheetz receipt",
      "Road trip expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sheetz receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Barnes & Noble receipt online. Add books, NOOK devices, and café items. Free PDF.",
    heading: "Barnes & Noble Receipt Generator",
    intro:
      "Create a Barnes & Noble receipt with bestsellers, stationery, and café drinks.",
    useCases: [
      "Book purchase reimbursement",
      "Replace a lost B&N receipt",
      "Education expense documentation",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Barnes & Noble receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Michaels receipt online. Add craft supplies, frames, and floral items. Free PDF download.",
    heading: "Michaels Receipt Generator",
    intro:
      "Create a Michaels receipt with craft supplies, picture frames, and seasonal décor.",
    useCases: [
      "Craft supply reimbursement",
      "Replace a lost Michaels receipt",
      "Art project expense tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Michaels receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Joann receipt online. Add fabric, sewing, and craft supplies. Free PDF download.",
    heading: "Joann Receipt Generator",
    intro:
      "Create a Joann Fabrics receipt with fabric yardage, sewing supplies, and crafting materials.",
    useCases: [
      "Sewing project expense tracking",
      "Replace a lost Joann receipt",
      "Crafting supply reimbursement",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Joann receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create a Zara receipt online. Add trendy fashion and accessories. Free PDF download.",
    heading: "Zara Receipt Generator",
    intro:
      "Create a Zara fashion receipt with on-trend clothing, shoes, and accessories.",
    useCases: [
      "Fashion purchase documentation",
      "Replace a lost Zara receipt for returns",
      "Personal wardrobe budgeting",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Zara receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
      "Create an H&M receipt online. Add affordable fashion and conscious collection items. Free PDF.",
    heading: "H&M Receipt Generator",
    intro:
      "Create an H&M receipt with affordable fashion essentials, basics, and Conscious Collection items.",
    useCases: [
      "Fashion expense documentation",
      "Replace a lost H&M receipt for returns",
      "Wardrobe budget tracking",
    ],
    faqs: [
      {
        question: "Can I customize the items on the H&M receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
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
];
