import type { ReceiptTemplate } from "./types";

let n = 0;
const id = () => `tpl-${++n}`;

export const TEMPLATES: ReceiptTemplate[] = [
  {
    slug: "grocery-store",
    name: "Grocery Store Receipt",
    shortName: "Grocery",
    icon: "🛒",
    seoTitle: "Free Grocery Store Receipt Generator — Create & Download PDF",
    seoDescription:
      "Make a realistic grocery store receipt online in seconds. Add items, prices, tax and store details, then download as PDF or PNG. Free, no sign-up, no watermark.",
    heading: "Grocery Store Receipt Generator",
    intro:
      "Create a realistic supermarket or grocery store receipt with itemized products, quantities, sales tax and payment details. Perfect for replacing lost receipts, expense reports, bookkeeping records or design mockups.",
    useCases: [
      "Replace a lost grocery receipt for your expense report",
      "Reimbursement documentation for household or office supplies",
      "Bookkeeping and budget tracking records",
      "Props for film, theatre and UI design mockups",
    ],
    faqs: [
      {
        question: "How do I make a grocery store receipt?",
        answer:
          "Choose the grocery template, enter your store name and address, add each product with its quantity and price, set your local sales tax rate, then download the receipt as a PDF or PNG image. The whole process takes under a minute and requires no account.",
      },
      {
        question: "Can I add as many grocery items as I want?",
        answer:
          "Yes. You can add unlimited line items to your receipt, each with its own name, quantity and unit price. Subtotal, tax and total are recalculated automatically as you type.",
      },
    ],
    defaults: {
      businessName: "FreshMart Supermarket",
      addressLine1: "1247 Maple Avenue",
      addressLine2: "Springfield, IL 62704",
      phone: "(217) 555-0148",
      taxLabel: "Sales Tax",
      taxRate: 6.25,
      footerMessage: "Thank you for shopping with us!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Whole Milk 1 Gal", quantity: 1, price: 3.49 },
        { id: id(), name: "Bananas (lb)", quantity: 2, price: 0.59 },
        { id: id(), name: "Wheat Bread", quantity: 1, price: 2.79 },
        { id: id(), name: "Eggs Large 12ct", quantity: 1, price: 4.29 },
        { id: id(), name: "Chicken Breast (lb)", quantity: 1.5, price: 5.99 },
      ],
    },
  },
  {
    slug: "restaurant",
    name: "Restaurant Receipt",
    shortName: "Restaurant",
    icon: "🍽️",
    seoTitle: "Free Restaurant Receipt Generator — Itemized Bill with Tip",
    seoDescription:
      "Generate an itemized restaurant receipt with food items, tax and tip. Download instantly as PDF or PNG. Free restaurant bill maker, no watermark.",
    heading: "Restaurant Receipt Generator",
    intro:
      "Build an itemized restaurant bill with dishes, drinks, sales tax, tip and payment method. Ideal for business meal expense claims, per-diem documentation and replacing lost dinner receipts.",
    useCases: [
      "Business meal expense reimbursement",
      "Replace a lost dinner or lunch receipt",
      "Per-diem and travel expense documentation",
      "Restaurant POS mockups and menu pricing tests",
    ],
    faqs: [
      {
        question: "Can I add a tip to my restaurant receipt?",
        answer:
          "Yes. The restaurant template includes a dedicated tip field. Enter any tip amount and it is added after tax, exactly like a real restaurant bill. The grand total updates instantly in the live preview.",
      },
      {
        question: "Does the restaurant receipt show a server name and table?",
        answer:
          "Yes. You can set a server name in the cashier field and use the register field for the table number, so the receipt mirrors a genuine restaurant ticket.",
      },
    ],
    defaults: {
      businessName: "The Olive Garden Bistro",
      addressLine1: "88 Harbor Street",
      addressLine2: "Portland, OR 97201",
      phone: "(503) 555-0192",
      taxLabel: "Sales Tax",
      taxRate: 8.0,
      tip: 9.5,
      cashier: "Sarah M.",
      register: "Table 12",
      footerMessage: "We hope to see you again soon!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Grilled Salmon", quantity: 1, price: 24.95 },
        { id: id(), name: "Caesar Salad", quantity: 1, price: 11.5 },
        { id: id(), name: "Pasta Carbonara", quantity: 1, price: 18.75 },
        { id: id(), name: "House Red Wine (Glass)", quantity: 2, price: 8.5 },
      ],
    },
  },
  {
    slug: "coffee-shop",
    name: "Coffee Shop Receipt",
    shortName: "Coffee",
    icon: "☕",
    seoTitle: "Free Coffee Shop Receipt Generator — Cafe Receipt Maker",
    seoDescription:
      "Create a cafe or coffee shop receipt online for free. Lattes, pastries, tax — live preview and instant PDF/PNG download with no sign-up.",
    heading: "Coffee Shop Receipt Generator",
    intro:
      "Make a coffee shop receipt with drinks, pastries and snacks in seconds. Great for small daily expense claims, petty cash records and coffee-run reimbursements.",
    useCases: [
      "Daily coffee expense and petty cash records",
      "Office coffee-run reimbursements",
      "Replace a faded thermal receipt",
      "Cafe POS and loyalty app design mockups",
    ],
    faqs: [
      {
        question: "Why do thermal coffee receipts fade and how can I replace one?",
        answer:
          "Thermal paper uses heat-sensitive coating that degrades with light and time, often becoming unreadable within months. If you need a record of a purchase whose receipt faded, recreate it here with the original items, prices and date, then download a permanent PDF copy.",
      },
    ],
    defaults: {
      businessName: "Daily Grind Coffee Co.",
      addressLine1: "412 Oak Street",
      addressLine2: "Austin, TX 78701",
      phone: "(512) 555-0177",
      taxLabel: "Sales Tax",
      taxRate: 8.25,
      footerMessage: "Fuel your day. See you tomorrow!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Caffe Latte (Grande)", quantity: 1, price: 5.25 },
        { id: id(), name: "Cappuccino (Tall)", quantity: 1, price: 4.5 },
        { id: id(), name: "Butter Croissant", quantity: 2, price: 3.75 },
        { id: id(), name: "Blueberry Muffin", quantity: 1, price: 3.95 },
      ],
    },
  },
  {
    slug: "gas-station",
    name: "Gas Station Receipt",
    shortName: "Gas",
    icon: "⛽",
    seoTitle: "Free Gas Station Receipt Generator — Fuel Receipt Maker",
    seoDescription:
      "Generate a gas station fuel receipt with gallons, price per gallon and pump number. Free PDF & PNG download for mileage and fuel expense claims.",
    heading: "Gas Station Receipt Generator",
    intro:
      "Create a fuel receipt showing gallons pumped, price per gallon, pump number and payment method. Essential for mileage reimbursement, fleet records and fuel expense claims when the pump printer was out of paper.",
    useCases: [
      "Fuel expense claims when the pump didn't print a receipt",
      "Mileage and fleet expense documentation",
      "Company car fuel logs",
      "Replace faded thermal fuel receipts",
    ],
    faqs: [
      {
        question: "How do I show gallons and price per gallon on the receipt?",
        answer:
          "Use the quantity field for gallons (decimals like 12.418 are supported) and the price field for the per-gallon rate. The receipt automatically multiplies them, so '12.418 × $3.45' displays exactly like a real pump receipt.",
      },
      {
        question: "What if the gas pump didn't print my receipt?",
        answer:
          "Pump printers frequently run out of paper. Recreate the transaction here with the station name, date, fuel grade, gallons and total from your bank statement, then attach the PDF to your expense report alongside the card statement line.",
      },
    ],
    defaults: {
      businessName: "Route 66 Fuel Stop",
      addressLine1: "3401 Highway 66",
      addressLine2: "Flagstaff, AZ 86001",
      phone: "(928) 555-0134",
      taxLabel: "Fuel Tax (incl.)",
      taxRate: 0,
      register: "Pump 04",
      footerMessage: "Drive safe. Thank you!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Unleaded 87 (Gal)", quantity: 12.418, price: 3.459 },
      ],
    },
  },
  {
    slug: "taxi",
    name: "Taxi & Rideshare Receipt",
    shortName: "Taxi",
    icon: "🚕",
    seoTitle: "Free Taxi Receipt Generator — Cab & Rideshare Receipt Maker",
    seoDescription:
      "Make a taxi or rideshare trip receipt with fare, distance and tip. Free cab receipt maker with instant PDF & PNG download. No sign-up needed.",
    heading: "Taxi & Rideshare Receipt Generator",
    intro:
      "Generate a taxi or private ride receipt with base fare, distance charges, wait time and tip. Perfect for travel expense reports when a driver couldn't provide a printed receipt.",
    useCases: [
      "Business travel expense claims",
      "Cash taxi rides with no printed receipt",
      "Airport transfer documentation",
      "Client billing for travel costs",
    ],
    faqs: [
      {
        question: "How do I make a receipt for a cash taxi ride?",
        answer:
          "Enter the taxi company name, the trip date and time, then add line items such as base fare, distance charge and airport surcharge. Add a tip if you gave one, select Cash as the payment method, and download the PDF for your expense report.",
      },
    ],
    defaults: {
      businessName: "Metro City Taxi",
      addressLine1: "Licensed Taxi Operator",
      addressLine2: "New York, NY",
      phone: "(212) 555-0166",
      taxLabel: "City Surcharge",
      taxRate: 0,
      tip: 4.0,
      cashier: "Driver: J. Alvarez",
      register: "Cab #4127",
      footerMessage: "Thank you for riding with us.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Base Fare", quantity: 1, price: 3.5 },
        { id: id(), name: "Distance (8.2 mi)", quantity: 1, price: 19.68 },
        { id: id(), name: "Wait Time", quantity: 1, price: 2.5 },
      ],
    },
  },
  {
    slug: "hotel",
    name: "Hotel Receipt",
    shortName: "Hotel",
    icon: "🏨",
    seoTitle: "Free Hotel Receipt Generator — Lodging Invoice Maker",
    seoDescription:
      "Create a hotel stay receipt with room rate, nights, taxes and fees. Free hotel folio maker — download as PDF or PNG instantly, no watermark.",
    heading: "Hotel Receipt Generator",
    intro:
      "Build a hotel folio-style receipt with nightly room rate, occupancy taxes, resort fees and incidentals. Useful for travel reimbursements and lodging records when the front desk copy went missing.",
    useCases: [
      "Travel reimbursement for lodging",
      "Replace a lost hotel folio",
      "Per-diem lodging documentation",
      "Booking and travel app mockups",
    ],
    faqs: [
      {
        question: "How do I show multiple nights on a hotel receipt?",
        answer:
          "Set the quantity to the number of nights and the price to the nightly rate — for example 3 nights × $129.00. Add separate line items for resort fees, parking or room service, and set the occupancy tax rate to match your city.",
      },
    ],
    defaults: {
      businessName: "Harborview Hotel & Suites",
      addressLine1: "200 Seaside Boulevard",
      addressLine2: "San Diego, CA 92101",
      phone: "(619) 555-0123",
      taxLabel: "Occupancy Tax",
      taxRate: 10.5,
      footerMessage: "We hope you enjoyed your stay!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Deluxe King Room (Night)", quantity: 3, price: 129.0 },
        { id: id(), name: "Resort Fee (Night)", quantity: 3, price: 25.0 },
        { id: id(), name: "Valet Parking (Night)", quantity: 3, price: 18.0 },
      ],
    },
  },
  {
    slug: "retail-store",
    name: "Retail Store Receipt",
    shortName: "Retail",
    icon: "🏬",
    seoTitle: "Free Retail Store Receipt Generator — Shop Receipt Maker",
    seoDescription:
      "Make a retail or department store receipt with items, tax and payment details. Free receipt maker with live preview and PDF/PNG download.",
    heading: "Retail Store Receipt Generator",
    intro:
      "Create a department store or boutique receipt with SKU-style line items, sales tax and card payment details. Handy for warranty claims, returns documentation and expense records.",
    useCases: [
      "Proof of purchase for warranty claims",
      "Returns and exchange documentation",
      "Office supply expense reports",
      "Retail POS system mockups",
    ],
    faqs: [
      {
        question: "Can I use a recreated receipt for a warranty claim?",
        answer:
          "Many retailers and manufacturers accept a recreated receipt alongside a bank statement showing the original transaction. Recreate the purchase with the exact date, store, item and price, and present both documents together. Always check the specific retailer's policy first.",
      },
    ],
    defaults: {
      businessName: "Urban Outfit Co.",
      addressLine1: "55 Commerce Plaza",
      addressLine2: "Chicago, IL 60611",
      phone: "(312) 555-0188",
      taxLabel: "Sales Tax",
      taxRate: 10.25,
      footerMessage: "Returns accepted within 30 days with receipt.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Cotton T-Shirt M Navy", quantity: 2, price: 19.99 },
        { id: id(), name: "Slim Jeans 32x32", quantity: 1, price: 49.95 },
        { id: id(), name: "Canvas Belt", quantity: 1, price: 24.5 },
      ],
    },
  },
  {
    slug: "pharmacy",
    name: "Pharmacy Receipt",
    shortName: "Pharmacy",
    icon: "💊",
    seoTitle: "Free Pharmacy Receipt Generator — Drugstore Receipt Maker",
    seoDescription:
      "Generate a pharmacy or drugstore receipt for OTC items and health products. Free PDF & PNG download for HSA/FSA and medical expense records.",
    heading: "Pharmacy Receipt Generator",
    intro:
      "Create a drugstore receipt for over-the-counter medicine, health and personal care items. Useful for HSA/FSA reimbursement records and medical expense tracking.",
    useCases: [
      "HSA / FSA reimbursement documentation",
      "Medical expense tax records",
      "Replace faded pharmacy receipts",
      "Healthcare app design mockups",
    ],
    faqs: [
      {
        question: "Can I use this receipt for HSA or FSA reimbursement?",
        answer:
          "A recreated receipt can support an HSA/FSA claim when the original is lost, but administrators usually also require proof of payment such as a card statement. Include the pharmacy name, date, item names and amounts, and check your plan administrator's documentation rules.",
      },
    ],
    defaults: {
      businessName: "WellCare Pharmacy",
      addressLine1: "910 Health Plaza Drive",
      addressLine2: "Denver, CO 80202",
      phone: "(303) 555-0155",
      taxLabel: "Sales Tax",
      taxRate: 4.81,
      footerMessage: "Your health, our priority.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Ibuprofen 200mg 100ct", quantity: 1, price: 8.99 },
        { id: id(), name: "Vitamin D3 2000IU", quantity: 1, price: 12.49 },
        { id: id(), name: "Adhesive Bandages 40ct", quantity: 1, price: 4.79 },
      ],
    },
  },
  {
    slug: "bar",
    name: "Bar & Pub Receipt",
    shortName: "Bar",
    icon: "🍺",
    seoTitle: "Free Bar Receipt Generator — Pub Tab Receipt Maker",
    seoDescription:
      "Create a bar tab receipt with drinks, tax and tip. Free bar receipt maker with live preview — download as PDF or PNG, no sign-up.",
    heading: "Bar & Pub Receipt Generator",
    intro:
      "Recreate a bar tab with drinks, appetizers, tax and gratuity. Useful for client entertainment expense claims and team outing reimbursements.",
    useCases: [
      "Client entertainment expense claims",
      "Team outing reimbursements",
      "Replace a lost bar tab receipt",
      "Hospitality POS mockups",
    ],
    faqs: [
      {
        question: "How do I add gratuity to a bar receipt?",
        answer:
          "Use the tip field for gratuity — it is added after tax like a genuine bar tab. For large groups you can mirror an automatic 18% service charge by calculating it from the subtotal and entering that amount as the tip.",
      },
    ],
    defaults: {
      businessName: "The Brass Tap House",
      addressLine1: "77 River North Street",
      addressLine2: "Nashville, TN 37201",
      phone: "(615) 555-0144",
      taxLabel: "Sales Tax",
      taxRate: 9.25,
      tip: 8.0,
      cashier: "Bartender: Mike",
      footerMessage: "Drink responsibly. Cheers!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Craft IPA Draft 16oz", quantity: 3, price: 7.5 },
        { id: id(), name: "House Margarita", quantity: 2, price: 11.0 },
        { id: id(), name: "Loaded Nachos", quantity: 1, price: 13.95 },
      ],
    },
  },
  {
    slug: "salon",
    name: "Salon & Spa Receipt",
    shortName: "Salon",
    icon: "💇",
    seoTitle: "Free Salon Receipt Generator — Spa & Beauty Receipt Maker",
    seoDescription:
      "Make a salon, spa or barbershop receipt for services and products. Free receipt generator with instant PDF & PNG download, no watermark.",
    heading: "Salon & Spa Receipt Generator",
    intro:
      "Create a receipt for haircuts, styling, spa treatments and beauty products. Ideal for independent stylists who need to give clients a professional receipt, and for clients tracking personal care expenses.",
    useCases: [
      "Independent stylists issuing client receipts",
      "Spa service records",
      "Beauty product purchase documentation",
      "Booking app design mockups",
    ],
    faqs: [
      {
        question: "I'm an independent stylist — can I issue receipts to clients with this?",
        answer:
          "Yes. Enter your business name and contact details, list the services performed with prices, add tax if you collect it, and download the PDF for your client. It is a quick alternative to a POS system for small independent businesses.",
      },
    ],
    defaults: {
      businessName: "Luxe Hair Studio",
      addressLine1: "24 Fashion Avenue",
      addressLine2: "Miami, FL 33101",
      phone: "(305) 555-0171",
      taxLabel: "Sales Tax",
      taxRate: 7.0,
      tip: 12.0,
      cashier: "Stylist: Ana",
      footerMessage: "Book your next visit online!",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Women's Cut & Style", quantity: 1, price: 65.0 },
        { id: id(), name: "Full Color Treatment", quantity: 1, price: 95.0 },
        { id: id(), name: "Argan Oil Serum", quantity: 1, price: 28.0 },
      ],
    },
  },
  {
    slug: "auto-repair",
    name: "Auto Repair Receipt",
    shortName: "Auto",
    icon: "🔧",
    seoTitle: "Free Auto Repair Receipt Generator — Mechanic Invoice Maker",
    seoDescription:
      "Create an auto repair shop receipt with parts, labor and tax. Free mechanic receipt maker — download as PDF or PNG, no sign-up required.",
    heading: "Auto Repair Receipt Generator",
    intro:
      "Build a mechanic shop receipt with parts, labor hours and shop fees. Useful for vehicle maintenance records, warranty documentation and resale history.",
    useCases: [
      "Vehicle maintenance history for resale",
      "Warranty and insurance documentation",
      "Fleet maintenance records",
      "Small shop invoicing without a POS",
    ],
    faqs: [
      {
        question: "How do I show labor hours on an auto repair receipt?",
        answer:
          "Add a line item like 'Labor' with the quantity set to hours and the price set to your hourly rate — for example 2.5 × $95.00. List parts as separate items so the receipt clearly separates parts from labor, as service invoices normally do.",
      },
    ],
    defaults: {
      businessName: "Precision Auto Care",
      addressLine1: "1500 Industrial Parkway",
      addressLine2: "Columbus, OH 43204",
      phone: "(614) 555-0139",
      taxLabel: "Sales Tax",
      taxRate: 7.5,
      register: "Bay 2",
      footerMessage: "12-month / 12,000-mile warranty on parts & labor.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Synthetic Oil Change", quantity: 1, price: 69.95 },
        { id: id(), name: "Brake Pads (Front Set)", quantity: 1, price: 89.0 },
        { id: id(), name: "Labor (hrs)", quantity: 1.5, price: 95.0 },
      ],
    },
  },
  {
    slug: "parking",
    name: "Parking Receipt",
    shortName: "Parking",
    icon: "🅿️",
    seoTitle: "Free Parking Receipt Generator — Parking Ticket Maker",
    seoDescription:
      "Generate a parking garage or lot receipt with entry time, duration and rate. Free parking receipt maker with instant PDF & PNG download.",
    heading: "Parking Receipt Generator",
    intro:
      "Create a parking garage or surface lot receipt with duration, rate and location. Perfect for business travel expense claims when the exit machine didn't print a ticket.",
    useCases: [
      "Business travel parking expense claims",
      "Airport parking documentation",
      "Monthly parking records",
      "Replace unprinted machine receipts",
    ],
    faqs: [
      {
        question: "What should a parking receipt include for an expense report?",
        answer:
          "An expense-ready parking receipt should show the facility name and address, date, duration or entry/exit context, the amount paid and the payment method. Most expense systems accept a clear PDF showing these five elements.",
      },
    ],
    defaults: {
      businessName: "CityPark Garage — Level 2",
      addressLine1: "300 Downtown Crossing",
      addressLine2: "Boston, MA 02108",
      phone: "(617) 555-0150",
      taxLabel: "City Tax",
      taxRate: 0,
      register: "Exit Lane 1",
      footerMessage: "Lost ticket pays daily maximum.",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Parking 0-2 Hours", quantity: 1, price: 14.0 },
        { id: id(), name: "Each Additional Hour", quantity: 3, price: 6.0 },
      ],
    },
  },
];

export function getTemplate(slug: string): ReceiptTemplate | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}
