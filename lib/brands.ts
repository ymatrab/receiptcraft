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
        { id: id(), name: "Base Fare", quantity: 1, price: 2.5 },
        { id: id(), name: "Distance", quantity: 1, price: 14.2 },
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
        { id: id(), name: "Throw Pillow", quantity: 2, price: 15.0 },
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
        {
          id: id(),
          name: "Grande Caramel Macchiato",
          quantity: 1,
          price: 5.45,
        },
        { id: id(), name: "Venti Iced Latte", quantity: 1, price: 5.95 },
        { id: id(), name: "Butter Croissant", quantity: 2, price: 3.25 },
      ],
    },
  },
  {
    slug: "burger-king",
    name: "Burger King Receipt",
    shortName: "Burger King",
    icon: "🍔",
    seoTitle:
      "Free Burger King Receipt Generator — Fake Burger King Receipt Maker",
    seoDescription:
      "Create a Burger King receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Burger King Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Burger King receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Burger King",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "wendy-s",
    name: "Wendy's Receipt",
    shortName: "Wendy's",
    icon: "🍔",
    seoTitle: "Free Wendy's Receipt Generator — Fake Wendy's Receipt Maker",
    seoDescription:
      "Create a Wendy's receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Wendy's Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Wendy's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Wendy's",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "subway",
    name: "Subway Receipt",
    shortName: "Subway",
    icon: "🥪",
    seoTitle: "Free Subway Receipt Generator — Fake Subway Receipt Maker",
    seoDescription:
      "Create a Subway receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Subway Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Subway receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Subway",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "taco-bell",
    name: "Taco Bell Receipt",
    shortName: "Taco Bell",
    icon: "🌮",
    seoTitle: "Free Taco Bell Receipt Generator — Fake Taco Bell Receipt Maker",
    seoDescription:
      "Create a Taco Bell receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Taco Bell Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Taco Bell receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Taco Bell",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "kfc",
    name: "KFC Receipt",
    shortName: "KFC",
    icon: "🍗",
    seoTitle: "Free KFC Receipt Generator — Fake KFC Receipt Maker",
    seoDescription:
      "Create a KFC receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "KFC Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the KFC receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "KFC",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "chipotle",
    name: "Chipotle Receipt",
    shortName: "Chipotle",
    icon: "🌯",
    seoTitle: "Free Chipotle Receipt Generator — Fake Chipotle Receipt Maker",
    seoDescription:
      "Create a Chipotle receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Chipotle Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Chipotle receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Chipotle",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "domino-s-pizza",
    name: "Domino's Pizza Receipt",
    shortName: "Domino's Pizza",
    icon: "🍕",
    seoTitle:
      "Free Domino's Pizza Receipt Generator — Fake Domino's Pizza Receipt Maker",
    seoDescription:
      "Create a Domino's Pizza receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Domino's Pizza Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Domino's Pizza receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Domino's Pizza",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "pizza-hut",
    name: "Pizza Hut Receipt",
    shortName: "Pizza Hut",
    icon: "🍕",
    seoTitle: "Free Pizza Hut Receipt Generator — Fake Pizza Hut Receipt Maker",
    seoDescription:
      "Create a Pizza Hut receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Pizza Hut Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Pizza Hut receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Pizza Hut",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "papa-john-s",
    name: "Papa John's Receipt",
    shortName: "Papa John's",
    icon: "🍕",
    seoTitle:
      "Free Papa John's Receipt Generator — Fake Papa John's Receipt Maker",
    seoDescription:
      "Create a Papa John's receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Papa John's Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Papa John's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Papa John's",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "chick-fil-a",
    name: "Chick-fil-A Receipt",
    shortName: "Chick-fil-A",
    icon: "🍗",
    seoTitle:
      "Free Chick-fil-A Receipt Generator — Fake Chick-fil-A Receipt Maker",
    seoDescription:
      "Create a Chick-fil-A receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Chick-fil-A Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Chick-fil-A receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Chick-fil-A",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "panera-bread",
    name: "Panera Bread Receipt",
    shortName: "Panera Bread",
    icon: "🥖",
    seoTitle:
      "Free Panera Bread Receipt Generator — Fake Panera Bread Receipt Maker",
    seoDescription:
      "Create a Panera Bread receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Panera Bread Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Panera Bread receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Panera Bread",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "five-guys",
    name: "Five Guys Receipt",
    shortName: "Five Guys",
    icon: "🍔",
    seoTitle: "Free Five Guys Receipt Generator — Fake Five Guys Receipt Maker",
    seoDescription:
      "Create a Five Guys receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Five Guys Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Five Guys receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Five Guys",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "in-n-out-burger",
    name: "In-N-Out Burger Receipt",
    shortName: "In-N-Out Burger",
    icon: "🍔",
    seoTitle:
      "Free In-N-Out Burger Receipt Generator — Fake In-N-Out Burger Receipt Maker",
    seoDescription:
      "Create a In-N-Out Burger receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "In-N-Out Burger Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the In-N-Out Burger receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "In-N-Out Burger",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "shake-shack",
    name: "Shake Shack Receipt",
    shortName: "Shake Shack",
    icon: "🍔",
    seoTitle:
      "Free Shake Shack Receipt Generator — Fake Shake Shack Receipt Maker",
    seoDescription:
      "Create a Shake Shack receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Shake Shack Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Shake Shack receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Shake Shack",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "panda-express",
    name: "Panda Express Receipt",
    shortName: "Panda Express",
    icon: "🥡",
    seoTitle:
      "Free Panda Express Receipt Generator — Fake Panda Express Receipt Maker",
    seoDescription:
      "Create a Panda Express receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Panda Express Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Panda Express receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Panda Express",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "sonic-drive-in",
    name: "Sonic Drive-In Receipt",
    shortName: "Sonic Drive-In",
    icon: "🥤",
    seoTitle:
      "Free Sonic Drive-In Receipt Generator — Fake Sonic Drive-In Receipt Maker",
    seoDescription:
      "Create a Sonic Drive-In receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Sonic Drive-In Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sonic Drive-In receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Sonic Drive-In",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "dairy-queen",
    name: "Dairy Queen Receipt",
    shortName: "Dairy Queen",
    icon: "🍦",
    seoTitle:
      "Free Dairy Queen Receipt Generator — Fake Dairy Queen Receipt Maker",
    seoDescription:
      "Create a Dairy Queen receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Dairy Queen Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Dairy Queen receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Dairy Queen",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "arby-s",
    name: "Arby's Receipt",
    shortName: "Arby's",
    icon: "🥪",
    seoTitle: "Free Arby's Receipt Generator — Fake Arby's Receipt Maker",
    seoDescription:
      "Create a Arby's receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Arby's Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Arby's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Arby's",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "jack-in-the-box",
    name: "Jack in the Box Receipt",
    shortName: "Jack in the Box",
    icon: "🍔",
    seoTitle:
      "Free Jack in the Box Receipt Generator — Fake Jack in the Box Receipt Maker",
    seoDescription:
      "Create a Jack in the Box receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Jack in the Box Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Jack in the Box receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Jack in the Box",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "popeyes",
    name: "Popeyes Receipt",
    shortName: "Popeyes",
    icon: "🍗",
    seoTitle: "Free Popeyes Receipt Generator — Fake Popeyes Receipt Maker",
    seoDescription:
      "Create a Popeyes receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Popeyes Receipt Generator",
    intro:
      "Recreate a fast food order. Perfect for per-diem travel meals and reimbursable expenses.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Popeyes receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Popeyes",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Combo Meal", quantity: 1, price: 8.99 },
        { id: id(), name: "Large Soda", quantity: 1, price: 2.49 },
        { id: id(), name: "Fries", quantity: 1, price: 3.29 },
      ],
    },
  },
  {
    slug: "dunkin",
    name: "Dunkin' Receipt",
    shortName: "Dunkin'",
    icon: "🍩",
    seoTitle: "Free Dunkin' Receipt Generator — Fake Dunkin' Receipt Maker",
    seoDescription:
      "Create a Dunkin' receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Dunkin' Receipt Generator",
    intro:
      "Make a coffee shop receipt. Add your lattes, cold brews, and pastries for petty cash and expense reports.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Dunkin' receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Dunkin'",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 9,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Large Iced Coffee", quantity: 1, price: 4.5 },
        { id: id(), name: "Breakfast Sandwich", quantity: 1, price: 5.25 },
        { id: id(), name: "Blueberry Muffin", quantity: 1, price: 3 },
      ],
    },
  },
  {
    slug: "tim-hortons",
    name: "Tim Hortons Receipt",
    shortName: "Tim Hortons",
    icon: "☕",
    seoTitle:
      "Free Tim Hortons Receipt Generator — Fake Tim Hortons Receipt Maker",
    seoDescription:
      "Create a Tim Hortons receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Tim Hortons Receipt Generator",
    intro:
      "Make a coffee shop receipt. Add your lattes, cold brews, and pastries for petty cash and expense reports.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Tim Hortons receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Tim Hortons",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 9,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Large Iced Coffee", quantity: 1, price: 4.5 },
        { id: id(), name: "Breakfast Sandwich", quantity: 1, price: 5.25 },
        { id: id(), name: "Blueberry Muffin", quantity: 1, price: 3 },
      ],
    },
  },
  {
    slug: "peet-s-coffee",
    name: "Peet's Coffee Receipt",
    shortName: "Peet's Coffee",
    icon: "☕",
    seoTitle:
      "Free Peet's Coffee Receipt Generator — Fake Peet's Coffee Receipt Maker",
    seoDescription:
      "Create a Peet's Coffee receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Peet's Coffee Receipt Generator",
    intro:
      "Make a coffee shop receipt. Add your lattes, cold brews, and pastries for petty cash and expense reports.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Peet's Coffee receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Peet's Coffee",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 9,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Large Iced Coffee", quantity: 1, price: 4.5 },
        { id: id(), name: "Breakfast Sandwich", quantity: 1, price: 5.25 },
        { id: id(), name: "Blueberry Muffin", quantity: 1, price: 3 },
      ],
    },
  },
  {
    slug: "caribou-coffee",
    name: "Caribou Coffee Receipt",
    shortName: "Caribou Coffee",
    icon: "☕",
    seoTitle:
      "Free Caribou Coffee Receipt Generator — Fake Caribou Coffee Receipt Maker",
    seoDescription:
      "Create a Caribou Coffee receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Caribou Coffee Receipt Generator",
    intro:
      "Make a coffee shop receipt. Add your lattes, cold brews, and pastries for petty cash and expense reports.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Caribou Coffee receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Caribou Coffee",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 9,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Large Iced Coffee", quantity: 1, price: 4.5 },
        { id: id(), name: "Breakfast Sandwich", quantity: 1, price: 5.25 },
        { id: id(), name: "Blueberry Muffin", quantity: 1, price: 3 },
      ],
    },
  },
  {
    slug: "dutch-bros",
    name: "Dutch Bros Receipt",
    shortName: "Dutch Bros",
    icon: "☕",
    seoTitle:
      "Free Dutch Bros Receipt Generator — Fake Dutch Bros Receipt Maker",
    seoDescription:
      "Create a Dutch Bros receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Dutch Bros Receipt Generator",
    intro:
      "Make a coffee shop receipt. Add your lattes, cold brews, and pastries for petty cash and expense reports.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Dutch Bros receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Dutch Bros",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 9,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Large Iced Coffee", quantity: 1, price: 4.5 },
        { id: id(), name: "Breakfast Sandwich", quantity: 1, price: 5.25 },
        { id: id(), name: "Blueberry Muffin", quantity: 1, price: 3 },
      ],
    },
  },
  {
    slug: "jamba-juice",
    name: "Jamba Juice Receipt",
    shortName: "Jamba Juice",
    icon: "🥤",
    seoTitle:
      "Free Jamba Juice Receipt Generator — Fake Jamba Juice Receipt Maker",
    seoDescription:
      "Create a Jamba Juice receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Jamba Juice Receipt Generator",
    intro:
      "Make a coffee shop receipt. Add your lattes, cold brews, and pastries for petty cash and expense reports.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Jamba Juice receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Jamba Juice",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 9,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Large Iced Coffee", quantity: 1, price: 4.5 },
        { id: id(), name: "Breakfast Sandwich", quantity: 1, price: 5.25 },
        { id: id(), name: "Blueberry Muffin", quantity: 1, price: 3 },
      ],
    },
  },
  {
    slug: "boba-guys",
    name: "Boba Guys Receipt",
    shortName: "Boba Guys",
    icon: "🧋",
    seoTitle: "Free Boba Guys Receipt Generator — Fake Boba Guys Receipt Maker",
    seoDescription:
      "Create a Boba Guys receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Boba Guys Receipt Generator",
    intro:
      "Make a coffee shop receipt. Add your lattes, cold brews, and pastries for petty cash and expense reports.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Boba Guys receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Boba Guys",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 9,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Large Iced Coffee", quantity: 1, price: 4.5 },
        { id: id(), name: "Breakfast Sandwich", quantity: 1, price: 5.25 },
        { id: id(), name: "Blueberry Muffin", quantity: 1, price: 3 },
      ],
    },
  },
  {
    slug: "costco",
    name: "Costco Receipt",
    shortName: "Costco",
    icon: "🛒",
    seoTitle: "Free Costco Receipt Generator — Fake Costco Receipt Maker",
    seoDescription:
      "Create a Costco receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Costco Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Costco receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Costco",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "sam-s-club",
    name: "Sam's Club Receipt",
    shortName: "Sam's Club",
    icon: "🛒",
    seoTitle:
      "Free Sam's Club Receipt Generator — Fake Sam's Club Receipt Maker",
    seoDescription:
      "Create a Sam's Club receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Sam's Club Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sam's Club receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Sam's Club",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "whole-foods",
    name: "Whole Foods Receipt",
    shortName: "Whole Foods",
    icon: "🥗",
    seoTitle:
      "Free Whole Foods Receipt Generator — Fake Whole Foods Receipt Maker",
    seoDescription:
      "Create a Whole Foods receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Whole Foods Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Whole Foods receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Whole Foods",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "trader-joe-s",
    name: "Trader Joe's Receipt",
    shortName: "Trader Joe's",
    icon: "🛍️",
    seoTitle:
      "Free Trader Joe's Receipt Generator — Fake Trader Joe's Receipt Maker",
    seoDescription:
      "Create a Trader Joe's receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Trader Joe's Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Trader Joe's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Trader Joe's",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "kroger",
    name: "Kroger Receipt",
    shortName: "Kroger",
    icon: "🛒",
    seoTitle: "Free Kroger Receipt Generator — Fake Kroger Receipt Maker",
    seoDescription:
      "Create a Kroger receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Kroger Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Kroger receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Kroger",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "publix",
    name: "Publix Receipt",
    shortName: "Publix",
    icon: "🛒",
    seoTitle: "Free Publix Receipt Generator — Fake Publix Receipt Maker",
    seoDescription:
      "Create a Publix receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Publix Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Publix receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Publix",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "safeway",
    name: "Safeway Receipt",
    shortName: "Safeway",
    icon: "🛒",
    seoTitle: "Free Safeway Receipt Generator — Fake Safeway Receipt Maker",
    seoDescription:
      "Create a Safeway receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Safeway Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Safeway receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Safeway",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "aldi",
    name: "Aldi Receipt",
    shortName: "Aldi",
    icon: "🛒",
    seoTitle: "Free Aldi Receipt Generator — Fake Aldi Receipt Maker",
    seoDescription:
      "Create a Aldi receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Aldi Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Aldi receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Aldi",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "walgreens",
    name: "Walgreens Receipt",
    shortName: "Walgreens",
    icon: "💊",
    seoTitle: "Free Walgreens Receipt Generator — Fake Walgreens Receipt Maker",
    seoDescription:
      "Create a Walgreens receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Walgreens Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Walgreens receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Walgreens",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "cvs-pharmacy",
    name: "CVS Pharmacy Receipt",
    shortName: "CVS Pharmacy",
    icon: "💊",
    seoTitle:
      "Free CVS Pharmacy Receipt Generator — Fake CVS Pharmacy Receipt Maker",
    seoDescription:
      "Create a CVS Pharmacy receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "CVS Pharmacy Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the CVS Pharmacy receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "CVS Pharmacy",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "home-depot",
    name: "Home Depot Receipt",
    shortName: "Home Depot",
    icon: "🛠️",
    seoTitle:
      "Free Home Depot Receipt Generator — Fake Home Depot Receipt Maker",
    seoDescription:
      "Create a Home Depot receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Home Depot Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Home Depot receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Home Depot",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "lowe-s",
    name: "Lowe's Receipt",
    shortName: "Lowe's",
    icon: "🛠️",
    seoTitle: "Free Lowe's Receipt Generator — Fake Lowe's Receipt Maker",
    seoDescription:
      "Create a Lowe's receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Lowe's Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Lowe's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Lowe's",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "ikea",
    name: "IKEA Receipt",
    shortName: "IKEA",
    icon: "🪑",
    seoTitle: "Free IKEA Receipt Generator — Fake IKEA Receipt Maker",
    seoDescription:
      "Create a IKEA receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "IKEA Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the IKEA receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "IKEA",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "best-buy",
    name: "Best Buy Receipt",
    shortName: "Best Buy",
    icon: "💻",
    seoTitle: "Free Best Buy Receipt Generator — Fake Best Buy Receipt Maker",
    seoDescription:
      "Create a Best Buy receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Best Buy Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Best Buy receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Best Buy",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "macy-s",
    name: "Macy's Receipt",
    shortName: "Macy's",
    icon: "👗",
    seoTitle: "Free Macy's Receipt Generator — Fake Macy's Receipt Maker",
    seoDescription:
      "Create a Macy's receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Macy's Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Macy's receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Macy's",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "nordstrom",
    name: "Nordstrom Receipt",
    shortName: "Nordstrom",
    icon: "👔",
    seoTitle: "Free Nordstrom Receipt Generator — Fake Nordstrom Receipt Maker",
    seoDescription:
      "Create a Nordstrom receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Nordstrom Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Nordstrom receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Nordstrom",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "sephora",
    name: "Sephora Receipt",
    shortName: "Sephora",
    icon: "💄",
    seoTitle: "Free Sephora Receipt Generator — Fake Sephora Receipt Maker",
    seoDescription:
      "Create a Sephora receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Sephora Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sephora receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Sephora",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "ulta-beauty",
    name: "Ulta Beauty Receipt",
    shortName: "Ulta Beauty",
    icon: "💄",
    seoTitle:
      "Free Ulta Beauty Receipt Generator — Fake Ulta Beauty Receipt Maker",
    seoDescription:
      "Create a Ulta Beauty receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Ulta Beauty Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Ulta Beauty receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Ulta Beauty",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "gamestop",
    name: "GameStop Receipt",
    shortName: "GameStop",
    icon: "🎮",
    seoTitle: "Free GameStop Receipt Generator — Fake GameStop Receipt Maker",
    seoDescription:
      "Create a GameStop receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "GameStop Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the GameStop receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "GameStop",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "apple-store",
    name: "Apple Store Receipt",
    shortName: "Apple Store",
    icon: "📱",
    seoTitle:
      "Free Apple Store Receipt Generator — Fake Apple Store Receipt Maker",
    seoDescription:
      "Create a Apple Store receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Apple Store Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Apple Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Apple Store",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "tj-maxx",
    name: "TJ Maxx Receipt",
    shortName: "TJ Maxx",
    icon: "👕",
    seoTitle: "Free TJ Maxx Receipt Generator — Fake TJ Maxx Receipt Maker",
    seoDescription:
      "Create a TJ Maxx receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "TJ Maxx Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the TJ Maxx receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "TJ Maxx",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "marshalls",
    name: "Marshalls Receipt",
    shortName: "Marshalls",
    icon: "👕",
    seoTitle: "Free Marshalls Receipt Generator — Fake Marshalls Receipt Maker",
    seoDescription:
      "Create a Marshalls receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Marshalls Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Marshalls receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Marshalls",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "dick-s-sporting-goods",
    name: "Dick's Sporting Goods Receipt",
    shortName: "Dick's Sporting Goods",
    icon: "⚽",
    seoTitle:
      "Free Dick's Sporting Goods Receipt Generator — Fake Dick's Sporting Goods Receipt Maker",
    seoDescription:
      "Create a Dick's Sporting Goods receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Dick's Sporting Goods Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
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
      businessName: "Dick's Sporting Goods",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "petco",
    name: "Petco Receipt",
    shortName: "Petco",
    icon: "🐕",
    seoTitle: "Free Petco Receipt Generator — Fake Petco Receipt Maker",
    seoDescription:
      "Create a Petco receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Petco Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Petco receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Petco",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "petsmart",
    name: "PetSmart Receipt",
    shortName: "PetSmart",
    icon: "🐈",
    seoTitle: "Free PetSmart Receipt Generator — Fake PetSmart Receipt Maker",
    seoDescription:
      "Create a PetSmart receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "PetSmart Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the PetSmart receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "PetSmart",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "autozone",
    name: "AutoZone Receipt",
    shortName: "AutoZone",
    icon: "🚗",
    seoTitle: "Free AutoZone Receipt Generator — Fake AutoZone Receipt Maker",
    seoDescription:
      "Create a AutoZone receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "AutoZone Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the AutoZone receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "AutoZone",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "o-reilly-auto-parts",
    name: "O'Reilly Auto Parts Receipt",
    shortName: "O'Reilly Auto Parts",
    icon: "🚗",
    seoTitle:
      "Free O'Reilly Auto Parts Receipt Generator — Fake O'Reilly Auto Parts Receipt Maker",
    seoDescription:
      "Create a O'Reilly Auto Parts receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "O'Reilly Auto Parts Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
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
      businessName: "O'Reilly Auto Parts",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "amazon",
    name: "Amazon Receipt",
    shortName: "Amazon",
    icon: "📦",
    seoTitle: "Free Amazon Receipt Generator — Fake Amazon Receipt Maker",
    seoDescription:
      "Create a Amazon receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Amazon Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Amazon receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Amazon",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "ebay",
    name: "eBay Receipt",
    shortName: "eBay",
    icon: "📦",
    seoTitle: "Free eBay Receipt Generator — Fake eBay Receipt Maker",
    seoDescription:
      "Create a eBay receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "eBay Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the eBay receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "eBay",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "netflix",
    name: "Netflix Receipt",
    shortName: "Netflix",
    icon: "🎬",
    seoTitle: "Free Netflix Receipt Generator — Fake Netflix Receipt Maker",
    seoDescription:
      "Create a Netflix receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Netflix Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Netflix receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Netflix",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "spotify",
    name: "Spotify Receipt",
    shortName: "Spotify",
    icon: "🎵",
    seoTitle: "Free Spotify Receipt Generator — Fake Spotify Receipt Maker",
    seoDescription:
      "Create a Spotify receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Spotify Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Spotify receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Spotify",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "hulu",
    name: "Hulu Receipt",
    shortName: "Hulu",
    icon: "🎬",
    seoTitle: "Free Hulu Receipt Generator — Fake Hulu Receipt Maker",
    seoDescription:
      "Create a Hulu receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Hulu Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hulu receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Hulu",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "disney",
    name: "Disney+ Receipt",
    shortName: "Disney+",
    icon: "🎬",
    seoTitle: "Free Disney+ Receipt Generator — Fake Disney+ Receipt Maker",
    seoDescription:
      "Create a Disney+ receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Disney+ Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Disney+ receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Disney+",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "apple-services",
    name: "Apple Services Receipt",
    shortName: "Apple Services",
    icon: "☁️",
    seoTitle:
      "Free Apple Services Receipt Generator — Fake Apple Services Receipt Maker",
    seoDescription:
      "Create a Apple Services receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Apple Services Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Apple Services receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Apple Services",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "google-play",
    name: "Google Play Receipt",
    shortName: "Google Play",
    icon: "▶️",
    seoTitle:
      "Free Google Play Receipt Generator — Fake Google Play Receipt Maker",
    seoDescription:
      "Create a Google Play receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Google Play Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Google Play receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Google Play",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "microsoft-store",
    name: "Microsoft Store Receipt",
    shortName: "Microsoft Store",
    icon: "💻",
    seoTitle:
      "Free Microsoft Store Receipt Generator — Fake Microsoft Store Receipt Maker",
    seoDescription:
      "Create a Microsoft Store receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Microsoft Store Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Microsoft Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Microsoft Store",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "steam",
    name: "Steam Receipt",
    shortName: "Steam",
    icon: "🎮",
    seoTitle: "Free Steam Receipt Generator — Fake Steam Receipt Maker",
    seoDescription:
      "Create a Steam receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Steam Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Steam receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Steam",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "playstation-store",
    name: "PlayStation Store Receipt",
    shortName: "PlayStation Store",
    icon: "🎮",
    seoTitle:
      "Free PlayStation Store Receipt Generator — Fake PlayStation Store Receipt Maker",
    seoDescription:
      "Create a PlayStation Store receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "PlayStation Store Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the PlayStation Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "PlayStation Store",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "xbox-store",
    name: "Xbox Store Receipt",
    shortName: "Xbox Store",
    icon: "🎮",
    seoTitle:
      "Free Xbox Store Receipt Generator — Fake Xbox Store Receipt Maker",
    seoDescription:
      "Create a Xbox Store receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Xbox Store Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Xbox Store receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Xbox Store",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "adobe",
    name: "Adobe Receipt",
    shortName: "Adobe",
    icon: "🎨",
    seoTitle: "Free Adobe Receipt Generator — Fake Adobe Receipt Maker",
    seoDescription:
      "Create a Adobe receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Adobe Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Adobe receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Adobe",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "zoom",
    name: "Zoom Receipt",
    shortName: "Zoom",
    icon: "📹",
    seoTitle: "Free Zoom Receipt Generator — Fake Zoom Receipt Maker",
    seoDescription:
      "Create a Zoom receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Zoom Receipt Generator",
    intro:
      "Generate a digital subscription or online order receipt. Great for personal accounting or digital expense claims.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Zoom receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Zoom",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Monthly Subscription", quantity: 1, price: 15.99 },
        { id: id(), name: "Digital Service Fee", quantity: 1, price: 2 },
      ],
    },
  },
  {
    slug: "lyft",
    name: "Lyft Receipt",
    shortName: "Lyft",
    icon: "🚗",
    seoTitle: "Free Lyft Receipt Generator — Fake Lyft Receipt Maker",
    seoDescription:
      "Create a Lyft receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Lyft Receipt Generator",
    intro:
      "Generate a rideshare receipt. Include base fare, distance, wait time, and tip. Great for business travel expense reports.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Lyft receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Lyft",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Base Fare", quantity: 1, price: 3.5 },
        { id: id(), name: "Distance", quantity: 1, price: 12.2 },
        { id: id(), name: "Time", quantity: 1, price: 5.15 },
      ],
    },
  },
  {
    slug: "doordash",
    name: "DoorDash Receipt",
    shortName: "DoorDash",
    icon: "🥡",
    seoTitle: "Free DoorDash Receipt Generator — Fake DoorDash Receipt Maker",
    seoDescription:
      "Create a DoorDash receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "DoorDash Receipt Generator",
    intro:
      "Create a food delivery receipt including service fees, delivery charges, and tip for accurate travel expense reporting.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the DoorDash receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "DoorDash",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Restaurant Subtotal", quantity: 1, price: 24.5 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 3.99 },
        { id: id(), name: "Service Fee", quantity: 1, price: 4.5 },
      ],
    },
  },
  {
    slug: "uber-eats",
    name: "Uber Eats Receipt",
    shortName: "Uber Eats",
    icon: "🥡",
    seoTitle: "Free Uber Eats Receipt Generator — Fake Uber Eats Receipt Maker",
    seoDescription:
      "Create a Uber Eats receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Uber Eats Receipt Generator",
    intro:
      "Create a food delivery receipt including service fees, delivery charges, and tip for accurate travel expense reporting.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Uber Eats receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Uber Eats",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Restaurant Subtotal", quantity: 1, price: 24.5 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 3.99 },
        { id: id(), name: "Service Fee", quantity: 1, price: 4.5 },
      ],
    },
  },
  {
    slug: "grubhub",
    name: "Grubhub Receipt",
    shortName: "Grubhub",
    icon: "🥡",
    seoTitle: "Free Grubhub Receipt Generator — Fake Grubhub Receipt Maker",
    seoDescription:
      "Create a Grubhub receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Grubhub Receipt Generator",
    intro:
      "Create a food delivery receipt including service fees, delivery charges, and tip for accurate travel expense reporting.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Grubhub receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Grubhub",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Restaurant Subtotal", quantity: 1, price: 24.5 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 3.99 },
        { id: id(), name: "Service Fee", quantity: 1, price: 4.5 },
      ],
    },
  },
  {
    slug: "postmates",
    name: "Postmates Receipt",
    shortName: "Postmates",
    icon: "🥡",
    seoTitle: "Free Postmates Receipt Generator — Fake Postmates Receipt Maker",
    seoDescription:
      "Create a Postmates receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Postmates Receipt Generator",
    intro:
      "Create a food delivery receipt including service fees, delivery charges, and tip for accurate travel expense reporting.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Postmates receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Postmates",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Restaurant Subtotal", quantity: 1, price: 24.5 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 3.99 },
        { id: id(), name: "Service Fee", quantity: 1, price: 4.5 },
      ],
    },
  },
  {
    slug: "instacart",
    name: "Instacart Receipt",
    shortName: "Instacart",
    icon: "🛒",
    seoTitle: "Free Instacart Receipt Generator — Fake Instacart Receipt Maker",
    seoDescription:
      "Create a Instacart receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Instacart Receipt Generator",
    intro:
      "Create a food delivery receipt including service fees, delivery charges, and tip for accurate travel expense reporting.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Instacart receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Instacart",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 8.5,
      footerMessage: "Thank you for your business!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Restaurant Subtotal", quantity: 1, price: 24.5 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 3.99 },
        { id: id(), name: "Service Fee", quantity: 1, price: 4.5 },
      ],
    },
  },
  {
    slug: "airbnb",
    name: "Airbnb Receipt",
    shortName: "Airbnb",
    icon: "🏠",
    seoTitle: "Free Airbnb Receipt Generator — Fake Airbnb Receipt Maker",
    seoDescription:
      "Create a Airbnb receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Airbnb Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Airbnb receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Airbnb",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "expedia",
    name: "Expedia Receipt",
    shortName: "Expedia",
    icon: "✈️",
    seoTitle: "Free Expedia Receipt Generator — Fake Expedia Receipt Maker",
    seoDescription:
      "Create a Expedia receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Expedia Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Expedia receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Expedia",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "booking-com",
    name: "Booking.com Receipt",
    shortName: "Booking.com",
    icon: "🏨",
    seoTitle:
      "Free Booking.com Receipt Generator — Fake Booking.com Receipt Maker",
    seoDescription:
      "Create a Booking.com receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Booking.com Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Booking.com receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Booking.com",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "delta-airlines",
    name: "Delta Airlines Receipt",
    shortName: "Delta Airlines",
    icon: "✈️",
    seoTitle:
      "Free Delta Airlines Receipt Generator — Fake Delta Airlines Receipt Maker",
    seoDescription:
      "Create a Delta Airlines receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Delta Airlines Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Delta Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Delta Airlines",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "american-airlines",
    name: "American Airlines Receipt",
    shortName: "American Airlines",
    icon: "✈️",
    seoTitle:
      "Free American Airlines Receipt Generator — Fake American Airlines Receipt Maker",
    seoDescription:
      "Create a American Airlines receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "American Airlines Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the American Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "American Airlines",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "united-airlines",
    name: "United Airlines Receipt",
    shortName: "United Airlines",
    icon: "✈️",
    seoTitle:
      "Free United Airlines Receipt Generator — Fake United Airlines Receipt Maker",
    seoDescription:
      "Create a United Airlines receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "United Airlines Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the United Airlines receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "United Airlines",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "southwest-airlines",
    name: "Southwest Airlines Receipt",
    shortName: "Southwest Airlines",
    icon: "✈️",
    seoTitle:
      "Free Southwest Airlines Receipt Generator — Fake Southwest Airlines Receipt Maker",
    seoDescription:
      "Create a Southwest Airlines receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Southwest Airlines Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
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
      businessName: "Southwest Airlines",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "marriott",
    name: "Marriott Receipt",
    shortName: "Marriott",
    icon: "🏨",
    seoTitle: "Free Marriott Receipt Generator — Fake Marriott Receipt Maker",
    seoDescription:
      "Create a Marriott receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Marriott Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Marriott receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Marriott",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "hilton",
    name: "Hilton Receipt",
    shortName: "Hilton",
    icon: "🏨",
    seoTitle: "Free Hilton Receipt Generator — Fake Hilton Receipt Maker",
    seoDescription:
      "Create a Hilton receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Hilton Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hilton receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Hilton",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "hyatt",
    name: "Hyatt Receipt",
    shortName: "Hyatt",
    icon: "🏨",
    seoTitle: "Free Hyatt Receipt Generator — Fake Hyatt Receipt Maker",
    seoDescription:
      "Create a Hyatt receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Hyatt Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hyatt receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Hyatt",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "hertz",
    name: "Hertz Receipt",
    shortName: "Hertz",
    icon: "🚙",
    seoTitle: "Free Hertz Receipt Generator — Fake Hertz Receipt Maker",
    seoDescription:
      "Create a Hertz receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Hertz Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Hertz receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Hertz",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "enterprise",
    name: "Enterprise Receipt",
    shortName: "Enterprise",
    icon: "🚙",
    seoTitle:
      "Free Enterprise Receipt Generator — Fake Enterprise Receipt Maker",
    seoDescription:
      "Create a Enterprise receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Enterprise Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Enterprise receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Enterprise",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "avis",
    name: "Avis Receipt",
    shortName: "Avis",
    icon: "🚙",
    seoTitle: "Free Avis Receipt Generator — Fake Avis Receipt Maker",
    seoDescription:
      "Create a Avis receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Avis Receipt Generator",
    intro:
      "Make a professional travel or lodging receipt. Detail nightly rates, taxes, and fees for business trip reimbursements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Avis receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Avis",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 12,
      footerMessage: "Thank you for your business!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Room (1 Night)", quantity: 1, price: 149 },
        { id: id(), name: "Resort Fee", quantity: 1, price: 25 },
        { id: id(), name: "Room Service", quantity: 1, price: 34.5 },
      ],
    },
  },
  {
    slug: "7-eleven",
    name: "7-Eleven Receipt",
    shortName: "7-Eleven",
    icon: "🏪",
    seoTitle: "Free 7-Eleven Receipt Generator — Fake 7-Eleven Receipt Maker",
    seoDescription:
      "Create a 7-Eleven receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "7-Eleven Receipt Generator",
    intro:
      "Create a realistic gas station or convenience store receipt. Itemize fuel gallons or quick snacks for mileage and travel logs.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the 7-Eleven receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "7-Eleven",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular Unleaded Fuel", quantity: 12, price: 3.45 },
        { id: id(), name: "Bottled Water", quantity: 1, price: 1.99 },
        { id: id(), name: "Energy Drink", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "shell",
    name: "Shell Receipt",
    shortName: "Shell",
    icon: "⛽",
    seoTitle: "Free Shell Receipt Generator — Fake Shell Receipt Maker",
    seoDescription:
      "Create a Shell receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Shell Receipt Generator",
    intro:
      "Create a realistic gas station or convenience store receipt. Itemize fuel gallons or quick snacks for mileage and travel logs.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Shell receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Shell",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular Unleaded Fuel", quantity: 12, price: 3.45 },
        { id: id(), name: "Bottled Water", quantity: 1, price: 1.99 },
        { id: id(), name: "Energy Drink", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "chevron",
    name: "Chevron Receipt",
    shortName: "Chevron",
    icon: "⛽",
    seoTitle: "Free Chevron Receipt Generator — Fake Chevron Receipt Maker",
    seoDescription:
      "Create a Chevron receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Chevron Receipt Generator",
    intro:
      "Create a realistic gas station or convenience store receipt. Itemize fuel gallons or quick snacks for mileage and travel logs.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Chevron receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Chevron",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular Unleaded Fuel", quantity: 12, price: 3.45 },
        { id: id(), name: "Bottled Water", quantity: 1, price: 1.99 },
        { id: id(), name: "Energy Drink", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "exxon",
    name: "Exxon Receipt",
    shortName: "Exxon",
    icon: "⛽",
    seoTitle: "Free Exxon Receipt Generator — Fake Exxon Receipt Maker",
    seoDescription:
      "Create a Exxon receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Exxon Receipt Generator",
    intro:
      "Create a realistic gas station or convenience store receipt. Itemize fuel gallons or quick snacks for mileage and travel logs.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Exxon receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Exxon",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular Unleaded Fuel", quantity: 12, price: 3.45 },
        { id: id(), name: "Bottled Water", quantity: 1, price: 1.99 },
        { id: id(), name: "Energy Drink", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "mobil",
    name: "Mobil Receipt",
    shortName: "Mobil",
    icon: "⛽",
    seoTitle: "Free Mobil Receipt Generator — Fake Mobil Receipt Maker",
    seoDescription:
      "Create a Mobil receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Mobil Receipt Generator",
    intro:
      "Create a realistic gas station or convenience store receipt. Itemize fuel gallons or quick snacks for mileage and travel logs.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Mobil receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Mobil",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular Unleaded Fuel", quantity: 12, price: 3.45 },
        { id: id(), name: "Bottled Water", quantity: 1, price: 1.99 },
        { id: id(), name: "Energy Drink", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "bp",
    name: "BP Receipt",
    shortName: "BP",
    icon: "⛽",
    seoTitle: "Free BP Receipt Generator — Fake BP Receipt Maker",
    seoDescription:
      "Create a BP receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "BP Receipt Generator",
    intro:
      "Create a realistic gas station or convenience store receipt. Itemize fuel gallons or quick snacks for mileage and travel logs.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the BP receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "BP",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular Unleaded Fuel", quantity: 12, price: 3.45 },
        { id: id(), name: "Bottled Water", quantity: 1, price: 1.99 },
        { id: id(), name: "Energy Drink", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "speedway",
    name: "Speedway Receipt",
    shortName: "Speedway",
    icon: "⛽",
    seoTitle: "Free Speedway Receipt Generator — Fake Speedway Receipt Maker",
    seoDescription:
      "Create a Speedway receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Speedway Receipt Generator",
    intro:
      "Create a realistic gas station or convenience store receipt. Itemize fuel gallons or quick snacks for mileage and travel logs.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Speedway receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Speedway",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular Unleaded Fuel", quantity: 12, price: 3.45 },
        { id: id(), name: "Bottled Water", quantity: 1, price: 1.99 },
        { id: id(), name: "Energy Drink", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "wawa",
    name: "Wawa Receipt",
    shortName: "Wawa",
    icon: "🏪",
    seoTitle: "Free Wawa Receipt Generator — Fake Wawa Receipt Maker",
    seoDescription:
      "Create a Wawa receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Wawa Receipt Generator",
    intro:
      "Create a realistic gas station or convenience store receipt. Itemize fuel gallons or quick snacks for mileage and travel logs.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Wawa receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Wawa",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular Unleaded Fuel", quantity: 12, price: 3.45 },
        { id: id(), name: "Bottled Water", quantity: 1, price: 1.99 },
        { id: id(), name: "Energy Drink", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "quiktrip",
    name: "QuikTrip Receipt",
    shortName: "QuikTrip",
    icon: "🏪",
    seoTitle: "Free QuikTrip Receipt Generator — Fake QuikTrip Receipt Maker",
    seoDescription:
      "Create a QuikTrip receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "QuikTrip Receipt Generator",
    intro:
      "Create a realistic gas station or convenience store receipt. Itemize fuel gallons or quick snacks for mileage and travel logs.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the QuikTrip receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "QuikTrip",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular Unleaded Fuel", quantity: 12, price: 3.45 },
        { id: id(), name: "Bottled Water", quantity: 1, price: 1.99 },
        { id: id(), name: "Energy Drink", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "sheetz",
    name: "Sheetz Receipt",
    shortName: "Sheetz",
    icon: "🏪",
    seoTitle: "Free Sheetz Receipt Generator — Fake Sheetz Receipt Maker",
    seoDescription:
      "Create a Sheetz receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Sheetz Receipt Generator",
    intro:
      "Create a realistic gas station or convenience store receipt. Itemize fuel gallons or quick snacks for mileage and travel logs.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Sheetz receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Sheetz",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Regular Unleaded Fuel", quantity: 12, price: 3.45 },
        { id: id(), name: "Bottled Water", quantity: 1, price: 1.99 },
        { id: id(), name: "Energy Drink", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "barnes-noble",
    name: "Barnes & Noble Receipt",
    shortName: "Barnes & Noble",
    icon: "📚",
    seoTitle:
      "Free Barnes & Noble Receipt Generator — Fake Barnes & Noble Receipt Maker",
    seoDescription:
      "Create a Barnes & Noble receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Barnes & Noble Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Barnes & Noble receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Barnes & Noble",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "michaels",
    name: "Michaels Receipt",
    shortName: "Michaels",
    icon: "🎨",
    seoTitle: "Free Michaels Receipt Generator — Fake Michaels Receipt Maker",
    seoDescription:
      "Create a Michaels receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Michaels Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Michaels receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Michaels",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "joann",
    name: "Joann Receipt",
    shortName: "Joann",
    icon: "🧵",
    seoTitle: "Free Joann Receipt Generator — Fake Joann Receipt Maker",
    seoDescription:
      "Create a Joann receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Joann Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Joann receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Joann",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "zara",
    name: "Zara Receipt",
    shortName: "Zara",
    icon: "👗",
    seoTitle: "Free Zara Receipt Generator — Fake Zara Receipt Maker",
    seoDescription:
      "Create a Zara receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "Zara Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the Zara receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "Zara",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
  {
    slug: "h-m",
    name: "H&M Receipt",
    shortName: "H&M",
    icon: "👕",
    seoTitle: "Free H&M Receipt Generator — Fake H&M Receipt Maker",
    seoDescription:
      "Create a H&M receipt online in seconds. Add your items, prices, and tax. Free PDF download, no sign-up.",
    heading: "H&M Receipt Generator",
    intro:
      "Create a detailed retail store receipt. Add household goods, apparel, groceries, and more for expense tracking or replacements.",
    useCases: [
      "Business and travel expense claims",
      "Lost digital receipt recovery",
      "Personal accounting and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I customize the items on the H&M receipt?",
        answer:
          "Yes, you can edit the line items, adjust the tax rate to match your local area, and download a highly realistic PDF or image file.",
      },
    ],
    defaults: {
      businessName: "H&M",
      addressLine1: "123 Main Street",
      addressLine2: "City, ST 12345",
      phone: "(555) 555-0199",
      taxLabel: "Tax",
      taxRate: 7.25,
      footerMessage: "Thank you for your business!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Store Item #12345", quantity: 1, price: 14.99 },
        { id: id(), name: "Household Goods", quantity: 1, price: 29.5 },
        { id: id(), name: "Reusable Bag", quantity: 2, price: 1.5 },
      ],
    },
  },
];
