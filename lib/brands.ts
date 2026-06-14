import type { ReceiptTemplate } from "./types";

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
      businessName: "Walmart",
      addressLine1: "123 Retail Lane",
      addressLine2: "Bentonville, AR 72712",
      phone: "(479) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.5,
      footerMessage: "Thanks for shopping at Walmart!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "GV Whole Milk 1 Gal", quantity: 1, price: 2.98 },
        { id: id(), name: "Bananas (lb)", quantity: 2.5, price: 0.58 },
        { id: id(), name: "Paper Towels 6pk", quantity: 1, price: 9.98 },
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
      businessName: "Uber",
      addressLine1: "Trip Details",
      addressLine2: "San Francisco, CA",
      phone: "",
      taxLabel: "City Surcharge",
      taxRate: 0,
      tip: 5.0,
      cashier: "Driver: Michael",
      footerMessage: "Thanks for riding with Uber.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Base Fare", quantity: 1, price: 2.50 },
        { id: id(), name: "Distance", quantity: 1, price: 14.20 },
        { id: id(), name: "Time", quantity: 1, price: 4.15 },
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
      businessName: "Target",
      addressLine1: "456 Bullseye Blvd",
      addressLine2: "Minneapolis, MN 55403",
      phone: "(612) 555-0144",
      taxLabel: "Sales Tax",
      taxRate: 8.0,
      footerMessage: "Expect More. Pay Less.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Throw Pillow", quantity: 2, price: 15.00 },
        { id: id(), name: "Graphic Tee", quantity: 1, price: 12.99 },
        { id: id(), name: "Up&Up Batteries AA 8pk", quantity: 1, price: 8.59 },
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
      businessName: "McDonald's",
      addressLine1: "789 Golden Arches Way",
      addressLine2: "Chicago, IL 60607",
      phone: "(312) 555-0100",
      taxLabel: "Restaurant Tax",
      taxRate: 10.25,
      register: "Order #42",
      footerMessage: "I'm Lovin' It!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Big Mac Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "10pc Chicken McNuggets", quantity: 1, price: 5.49 },
        { id: id(), name: "Large Coke", quantity: 1, price: 1.49 },
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
      businessName: "Starbucks",
      addressLine1: "101 Pike Street",
      addressLine2: "Seattle, WA 98101",
      phone: "(206) 555-0122",
      taxLabel: "Tax",
      taxRate: 10.1,
      footerMessage: "To inspire and nurture the human spirit.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Grande Caramel Macchiato", quantity: 1, price: 5.45 },
        { id: id(), name: "Venti Iced Latte", quantity: 1, price: 5.95 },
        { id: id(), name: "Butter Croissant", quantity: 2, price: 3.25 },
      ],
    },
  },
];
