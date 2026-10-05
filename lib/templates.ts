import type { ReceiptTemplate } from "./types";
import type { SourceId } from "./sources";
import { isFreeBrand } from "@/lib/brand-access";
import { BRAND_TEMPLATES } from "./brands";

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
      "Make an editable grocery store receipt online in seconds. Add items, prices, tax and store details, then download as PDF or PNG. Free, sign in to export.",
    heading: "Grocery Store Receipt Generator",
    intro:
      "Create an editable supermarket or grocery store receipt with itemized products, quantities, sales tax and payment details. Perfect for replacing lost receipts, expense reports, bookkeeping records or design mockups.",
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
          "Choose the grocery template, enter your store name and address, add each product with its quantity and price, set your local sales tax rate, then download the receipt as a PDF or PNG image. Building takes under a minute; sign in free to download.",
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
      "Generate an itemized restaurant receipt with food items, tax and tip. Download instantly as PDF or PNG. Free restaurant bill maker, free account required.",
    heading: "Restaurant Receipt Generator",
    intro:
      "Build an itemized restaurant bill with dishes, drinks, sales tax, tip and payment method. Ideal for business meal expense claims, per-diem documentation and replacing lost dinner receipts.",
    leadAnswer:
      "A restaurant receipt shows the restaurant's name and location, the server and table or check number, each dish and drink with its price, the food subtotal, sales tax, an optional tip or service charge, and the final total with the payment method. Large parties often see an automatic gratuity added as its own line.",
    useCases: [
      "Business meal expense reimbursement",
      "Replace a lost dinner or lunch receipt",
      "Per-diem and travel expense documentation",
      "Restaurant POS mockups and menu pricing tests",
    ],
    fields: [
      {
        name: "Server & table",
        description:
          "The server's name and the table or check number identify who took the order — printed at the top of most sit-down tickets.",
      },
      {
        name: "Itemized food & drink",
        description:
          "Every dish and beverage on its own line with quantity and price, so the bill can be verified item by item.",
      },
      {
        name: "Subtotal",
        description:
          "The total of all food and drink before tax and tip — the figure sales tax is calculated on.",
      },
      {
        name: "Sales tax",
        description:
          "State and local tax on prepared food, often at a higher 'meals' rate than groceries. Charged on the subtotal, not on the tip.",
      },
      {
        name: "Tip / gratuity",
        description:
          "A voluntary amount added after tax. On the merchant copy the tip and final total are usually left blank for the guest to write in.",
      },
      {
        name: "Service charge",
        description:
          "A mandatory percentage the restaurant adds itself (commonly 18–20% for large parties), printed as its own line before the total.",
      },
      {
        name: "Total & payment",
        description:
          "The grand total including tax and tip, plus how it was paid — cash, or a card with the last four digits.",
      },
    ],
    howToSteps: [
      "Open the Restaurant template — it loads with dishes, an 8% sales tax and a sample tip already filled in.",
      "Set the restaurant name, address and phone; put the server's name in the cashier field and the table number in the register field.",
      "Add each dish and drink as its own line with quantity and price — the subtotal updates as you type.",
      "Set your local sales-tax rate, then enter the tip (or an auto-gratuity amount for a large party).",
      "Sign in with a free account to download a print-ready PDF or high-resolution PNG — your first download is watermark-free.",
    ],
    guidance: [
      {
        heading: "Tip vs. service charge — keep them separate",
        body:
          "A tip is voluntary and usually written in by the guest after tax, which is why the printed merchant copy leaves the 'Tip' and 'Total' lines blank while the customer copy shows suggested totals.\n\nA service charge (or 'auto-gratuity') is a mandatory percentage the restaurant adds itself — commonly 18–20% for parties of six or more — and prints as its own line before the total. The two are taxed and reported differently, so if the real receipt itemized a service charge, don't fold it into the tip field; add it as its own line labelled 'Service Charge (18%)'.\n\nThe IRS draws the same line. Under {cite:irs-rr-2012-18|Revenue Ruling 2012-18} an automatic gratuity the restaurant sets is a service charge rather than a tip, and {cite:irs-pub-531|Publication 531} treats tips separately from employer-set service charges. That is the reason the two get their own lines on a real check instead of being merged into one figure.",
      },
      {
        heading: "How tax is applied to a restaurant bill",
        body:
          "Sales tax on prepared food is charged on the food-and-drink subtotal, before the tip — the math reads subtotal → tax → tip → total. Tax is never charged on the tip itself.\n\nMany states tax restaurant meals at a higher 'prepared food' rate than groceries, and some cities add a separate meals tax on top. If you're recreating a real bill, match the tax to the subtotal shown on your card statement rather than guessing a round number.",
      },
      {
        heading: "Splitting the check",
        body:
          "When a table splits the bill, each guest's receipt shows only their share of the items plus a proportional share of tax and tip. To reconcile a bill paid across several cards or cash, the Split-payment checker adds every tender back to the grand total so nothing is double-counted.",
      },
      {
        heading: "Alcohol and separate bar tabs",
        body:
          "Bars and many restaurants ring alcohol on a separate tab or under a different tax line, and expense policies often exclude alcohol from reimbursement. Itemize drinks as their own lines so an approver can see — and, if needed, subtract — them. A total-only receipt usually fails an itemization requirement: {cite:irs-pub-463|Publication 463} sets out what a receipt has to show to substantiate a business expense — the amount, the date, the place and what the expense was for.",
      },
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
      {
        question: "Is the tip calculated before or after tax?",
        answer:
          "Custom is to base the tip on the pre-tax subtotal, though many guests tip on the post-tax total — both are common. On the receipt itself the tip is added after tax, so the totals read subtotal → tax → tip → grand total. Our builder adds the tip amount after tax automatically.",
      },
      {
        question: "What is an automatic gratuity or service charge?",
        answer:
          "It's a mandatory percentage the restaurant adds for large parties — often 18–20% for six or more guests — printed as its own line before the total. Enter it in the tip field, or add a separate line item labelled 'Service Charge (18%)' if the original receipt itemized it that way.",
      },
      {
        question: "Can I use a recreated restaurant receipt for a business-meal expense claim?",
        answer:
          "Many expense systems accept a recreated itemized receipt alongside the card-statement line for the meal. Recreate the real restaurant, date, dishes and amounts, keep alcohol on its own line if your policy excludes it, and submit both documents together. Always follow your employer's reimbursement rules.",
      },
    ],
    sources: ["irs-rr-2012-18", "irs-pub-531", "irs-pub-463"],
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
      "Create a cafe or coffee shop receipt online for free. Lattes, pastries, tax — live preview and instant PDF/PNG download with a free account.",
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
    heading: "Gas Station & Fuel Receipt Generator",
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
      "Make a taxi or rideshare trip receipt with fare, distance and tip. Free cab receipt maker with instant PDF & PNG download. No sign-up to start.",
    heading: "Taxi, Cab & Rideshare Receipt Generator",
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
      "Create a hotel stay receipt with room rate, nights, taxes and fees. Free hotel folio maker — download as PDF or PNG instantly. No sign-up to start.",
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
      "Create a bar tab receipt with drinks, tax and tip. Free bar receipt maker with live preview — download as PDF or PNG, watermark-free on your first one.",
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
      "Make a salon, spa or barbershop receipt for services and products. Free receipt generator with instant PDF & PNG download. No sign-up to start.",
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
    seoTitle: "Free Auto Repair Receipt Generator — Mechanic Receipt Maker",
    seoDescription:
      "Create an auto repair shop receipt with parts, labor and tax. Free mechanic receipt maker — download as PDF or PNG, sign in to save yours.",
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
    slug: "oil-change-receipt",
    name: "Oil Change Receipt",
    shortName: "Oil Change",
    icon: "🛢️",
    seoTitle: "Free Oil Change Receipt Generator & Template",
    seoDescription:
      "Make an oil change receipt with the mileage, oil grade, filter and next service due: the maintenance record a warranty claim or a car buyer asks for.",
    heading: "Oil Change Receipt Generator",
    intro:
      "Create an oil change receipt that records what a routine service actually proves: when it happened, at what mileage, with what oil, and when the next one is due. Quick-lube shops, independent mechanics and owners keeping their own service history all use the same few fields.",
    leadAnswer:
      "An oil change receipt shows the service date, the odometer reading, the oil grade and quantity, the filter, the price and when the next change is due. Keep every one: together they are the maintenance history a warranty claim or a used-car buyer will ask to see.",
    useCases: [
      "Proof of maintenance for a warranty claim",
      "Service history for a private car sale",
      "Quick-lube and mobile mechanic receipts",
      "Fleet and company-car maintenance logs",
    ],
    fields: [
      {
        name: "Service date",
        description:
          "The day the oil was changed. Warranty and lease terms count intervals in time as well as miles, so the date matters as much as the mileage.",
      },
      {
        name: "Odometer reading",
        description:
          "The mileage at the time of service. It is the figure that proves the change happened inside the manufacturer's interval.",
      },
      {
        name: "Vehicle",
        description:
          "Year, make and model, and ideally the VIN or plate, so the receipt can only belong to one car.",
      },
      {
        name: "Oil grade and quantity",
        description:
          "The viscosity and type (for example 0W-20 full synthetic) and how many quarts went in. Owner's manuals specify both, and a warranty question can turn on them.",
      },
      {
        name: "Filter",
        description:
          "Whether the filter was replaced, and with which part. A change without a new filter is a different service.",
      },
      {
        name: "Labor and fees",
        description:
          "The labor charge and any shop-supply or disposal fee on their own lines, so the total can be checked.",
      },
      {
        name: "Next service due",
        description:
          "The mileage or date of the next change. It is the line customers read most, and it shows the interval the shop recommended.",
      },
      {
        name: "Business details",
        description:
          "The shop's name, address and phone number. A receipt that names who did the work is the one a warranty company will accept.",
      },
    ],
    howToSteps: [
      "Enter the shop name, address and phone number.",
      "Add the vehicle and the odometer reading at the time of service.",
      "List the oil (grade and quarts), the filter, labor and any disposal fee as separate lines.",
      "Set the next service due, by mileage or date.",
      "Download the PDF or PNG and give the customer a copy.",
    ],
    guidance: [
      {
        heading: "Why the receipt matters for your warranty",
        body:
          "You do not have to use the dealer to keep a new-car warranty. The {cite:ftc-auto-warranties|FTC} says it is illegal for a dealer to deny warranty coverage because routine maintenance was done by someone else. That right only helps if you can show the maintenance happened, and the FTC's advice is to keep records of oil changes and your service receipts.\n\nSo the receipt is the evidence. A quick-lube receipt with the date, mileage and oil grade answers the question a warranty company asks when an engine fails: was the car serviced on schedule, with the right oil?",
      },
      {
        heading: "Mileage is the field that does the work",
        body:
          "Most manufacturers set the oil interval in miles and months, whichever comes first. A receipt with a date but no odometer reading cannot show the interval was kept, and that is the gap a dispute opens.\n\nWrite the reading at the time of service, not an estimate, and print the next-due mileage on the same receipt so the customer and the shop are working from the same number.",
      },
    ],
    sources: ["ftc-auto-warranties"],
    faqs: [
      {
        question: "What should an oil change receipt include?",
        answer:
          "The service date, the odometer reading, the vehicle, the oil grade and quantity, the filter, labor and fees, the total, and when the next change is due.",
      },
      {
        question: "Do I need oil change receipts to keep my warranty?",
        answer:
          "The FTC says a dealer cannot deny coverage just because someone else did the maintenance, and advises keeping records of oil changes. The receipts are how you show the car was maintained.",
      },
      {
        question: "Can I make a receipt for an oil change I did myself?",
        answer:
          "You can record your own service, and you should keep the receipt for the oil and filter you bought alongside it. Your own log is weaker evidence than a shop's receipt, so keep both.",
      },
      {
        question: "How long should I keep oil change receipts?",
        answer:
          "For as long as you own the car. They are the service history a buyer asks for and the record a warranty claim needs.",
      },
    ],
    defaults: {
      businessName: "Express Lube & Tire",
      addressLine1: "2210 Commerce Street",
      addressLine2: "Dallas, TX 75201",
      phone: "(214) 555-0182",
      taxLabel: "Sales Tax",
      taxRate: 8.25,
      register: "Bay 1",
      footerMessage: "Next service due: 47,850 mi or Apr 2027, whichever comes first.",
      paperStyle: "thermal",
      sections: [
        {
          title: "Vehicle",
          rows: [
            { label: "Vehicle", value: "2021 Toyota Camry" },
            { label: "Odometer", value: "42,850 mi" },
            { label: "Next due", value: "47,850 mi" },
          ],
        },
      ],
      items: [
        { id: id(), name: "Full Synthetic 0W-20 (qt)", quantity: 5, price: 8.99 },
        { id: id(), name: "Oil Filter", quantity: 1, price: 12.99 },
        { id: id(), name: "Labor", quantity: 1, price: 24.99 },
        { id: id(), name: "Disposal Fee", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "rent-receipt-india",
    name: "Rent Receipt (India)",
    shortName: "Rent (India)",
    icon: "🏠",
    seoTitle: "Rent Receipt Format for HRA — Free Rent Receipt Generator",
    seoDescription:
      "Rent receipt format for HRA in India: tenant, landlord, property, rent in ₹, period, payment mode, landlord PAN and revenue stamp. Download as PDF or PNG.",
    heading: "Rent Receipt Generator (India)",
    intro:
      "Create a rent receipt in the format employers in India accept for HRA: tenant and landlord names, the rented property's address, the rent in rupees, the period it covers and how it was paid, with space for the landlord's PAN, signature and revenue stamp.",
    leadAnswer:
      "A rent receipt for HRA shows the tenant's name, the landlord's name and address, the property address, the rent amount in rupees, the period covered, the payment date and mode, and the landlord's signature. Add the landlord's PAN if your rent for the year exceeds ₹1,00,000, and a ₹1 revenue stamp on a cash payment above ₹5,000.",
    useCases: [
      "HRA proof for your employer (Form 124)",
      "Monthly receipts from a landlord to a tenant",
      "Cash rent payments that need a paper record",
      "Rent paid to a parent who owns the home",
    ],
    fields: [
      { name: "Tenant's name", description: "As it appears in your salary records, so payroll can match the receipt to you." },
      { name: "Landlord's name and address", description: "The person you pay rent to, and where they can be reached." },
      { name: "Property address", description: "The address you actually live at and pay rent for." },
      { name: "Rent amount", description: "In rupees, ideally in figures and in words, for the period stated." },
      { name: "Period covered", description: "For example, rent for October 2026. Monthly, quarterly or annual receipts all work if each states its period." },
      { name: "Date and mode of payment", description: "When the rent was paid, and how: cash, cheque, UPI or bank transfer." },
      { name: "Landlord's PAN", description: "Mandatory when the rent you pay in the year exceeds ₹1,00,000." },
      { name: "Signature and revenue stamp", description: "The landlord signs every receipt. A cash payment above ₹5,000 also needs a ₹1 revenue stamp, signed across." },
    ],
    howToSteps: [
      "Enter the landlord's name and the property address.",
      "Enter the tenant's name.",
      "Add a line for the period, for example Rent for October 2026, with the amount in rupees.",
      "Record the payment date and mode, and the landlord's PAN if your annual rent exceeds ₹1,00,000.",
      "Download, print and have the landlord sign it. Add a ₹1 revenue stamp for a cash payment above ₹5,000.",
    ],
    guidance: [
      {
        heading: "What your employer checks",
        body:
          "Salaried employees claim the HRA exemption through their employer, who reads the rent receipts with the declaration on Form 124 (it replaced Form 12BB from 1 April 2026). Payroll looks for three things: that the receipts cover the months claimed, that the amounts match the declaration, and that the landlord's PAN is there once the year's rent passes ₹1,00,000.\n\nThe exemption is only available under the old tax regime. Under the new regime, now the default, HRA is fully taxable and rent receipts do not reduce your tax.",
      },
      {
        heading: "The revenue stamp is about cash",
        body:
          "Under the Indian Stamp Act, 1899, a receipt for a cash payment of more than ₹5,000 needs a ₹1 revenue stamp, signed across by the person receiving the money. Rent paid by cheque, UPI or bank transfer does not need one, because the payment leaves its own record. Some employers ask for a stamp on every receipt above ₹5,000 anyway; it costs ₹1, so follow your payroll team's rule.",
      },
    ],
    faqs: [
      {
        question: "What is the format of a rent receipt for HRA?",
        answer:
          "Tenant's name, landlord's name and address, property address, rent amount in rupees, period covered, payment date and mode, and the landlord's signature, plus the landlord's PAN above ₹1,00,000 a year and a revenue stamp on cash payments above ₹5,000.",
      },
      {
        question: "Is a revenue stamp mandatory on rent receipts?",
        answer:
          "For cash payments above ₹5,000, yes: a ₹1 revenue stamp. Payments by cheque, UPI or bank transfer do not need one, though some employers ask for it anyway.",
      },
      {
        question: "When is the landlord's PAN required?",
        answer: "When the rent you pay in the financial year exceeds ₹1,00,000.",
      },
      {
        question: "Can I generate rent receipts online?",
        answer:
          "Yes, for rent you actually paid, signed by your landlord. A receipt for rent that was never paid is a false claim, and employers and the Income Tax Department can ask for bank records.",
      },
    ],
    defaults: {
      businessName: "Rajesh Kumar (Landlord)",
      addressLine1: "Flat 302, Shanti Apartments, 14th Main Road",
      addressLine2: "Indiranagar, Bengaluru 560038",
      phone: "",
      currency: "INR",
      taxLabel: "Tax",
      taxRate: 0,
      greeting: "RENT RECEIPT",
      cashier: "Received by: Rajesh Kumar",
      paymentMethod: "Mobile Payment",
      hideStoreLine: true,
      showBarcode: false,
      dateOrder: "dmy",
      footerMessage: "Received with thanks. Landlord's signature: ____________",
      cardLastFour: "", // paid by UPI: no card digits on the payment line
      paperStyle: "modern",
      sections: [
        {
          title: "Tenant",
          rows: [
            { label: "Name", value: "Priya Sharma" },
            { label: "Property", value: "Flat 302, Shanti Apartments, Bengaluru" },
          ],
        },
        {
          title: "Landlord",
          rows: [
            { label: "PAN", value: "XXXXX0000X" },
            { label: "Paid via", value: "UPI" },
          ],
        },
      ],
      items: [{ id: id(), name: "Rent for October 2026", quantity: 1, price: 18000 }],
    },
  },
  {
    slug: "fuel-bill",
    name: "Fuel Bill",
    shortName: "Fuel Bill",
    icon: "⛽",
    seoTitle: "Fuel Bill Generator — Petrol Pump Bill Format (₹)",
    seoDescription:
      "Make a petrol pump fuel bill in rupees: station, bill number, date, nozzle, product, rate per litre, volume, vehicle number and payment mode. PDF or PNG.",
    heading: "Fuel Bill Generator",
    intro:
      "Create a petrol or diesel bill in the format Indian petrol pumps print: the station, bill number, date and time, nozzle, product, rate per litre, litres filled, amount, vehicle number and payment mode. Use it to record a real fill-up when the pump's printer did not issue a bill.",
    leadAnswer:
      "A fuel bill shows the petrol pump's name and address, the bill number, the date and time, the product (petrol or diesel), the rate per litre, the litres filled, the amount in rupees, the vehicle number and the payment mode. Petrol and diesel are outside GST, so there is no GST line: the taxes are already in the price per litre.",
    useCases: [
      "Recording a real fill-up when the pump printer failed",
      "Fuel logs for a company car or a fleet",
      "Monthly fuel records for your own budgeting",
      "Bills for a petrol pump that has no printer",
    ],
    fields: [
      { name: "Pump name and address", description: "The petrol pump and its dealer or company, so the bill can be traced to one station." },
      { name: "Bill number", description: "The pump's own sequence number for the transaction." },
      { name: "Date and time", description: "When the vehicle was filled, written day-first as Indian bills print it." },
      { name: "Nozzle", description: "The nozzle or dispenser number used." },
      { name: "Product", description: "Petrol, diesel, or a premium grade, as named at the pump." },
      { name: "Rate and volume", description: "The price per litre on the day and the litres filled. Amount equals rate times volume." },
      { name: "Vehicle number", description: "The registration number of the vehicle filled. Fleet and company-car records depend on it." },
      { name: "Payment mode", description: "Cash, card or UPI." },
    ],
    howToSteps: [
      "Enter the petrol pump's name and address.",
      "Set the date and time of the fill-up.",
      "Enter the nozzle, product, rate per litre, litres and vehicle number from the pump display.",
      "Check that the amount equals rate times litres, and set the payment mode.",
      "Download the PDF or PNG and keep it with your fuel records.",
    ],
    guidance: [
      {
        heading: "Why a fuel bill has no GST line",
        body:
          "Petrol, diesel, aviation turbine fuel, natural gas and crude oil were kept outside GST when it was introduced. They are taxed through central excise duty and state VAT instead, and both are already inside the price per litre shown at the pump. So a petrol pump bill shows the rate, the volume and the amount, and no separate tax line.",
      },
      {
        heading: "Fuel reimbursement needs fuel you bought",
        body:
          "Many employers reimburse fuel against monthly bills, and a bill made here can record a real fill-up when the pump did not print one. It cannot stand in for fuel that was never bought. Claiming reimbursement or a tax benefit with bills for fuel you did not buy is a false claim, and employers increasingly check bills against card, UPI and FASTag records. Keep the payment record with every bill.",
      },
    ],
    faqs: [
      {
        question: "What should a petrol pump bill include?",
        answer:
          "The pump's name and address, the bill number, the date and time, the nozzle, the product, the rate per litre, the litres filled, the amount, the vehicle number and the payment mode.",
      },
      {
        question: "Is there GST on a fuel bill?",
        answer:
          "No. Petrol and diesel are outside GST. They carry central excise and state VAT, which are already included in the price per litre.",
      },
      {
        question: "Can I use a generated fuel bill for reimbursement?",
        answer:
          "Only for fuel you actually bought, for example when the pump did not print a bill. Bills for fuel never bought are false claims, and employers can check them against your payment records.",
      },
      {
        question: "How do I calculate the amount on a fuel bill?",
        answer: "Multiply the rate per litre by the litres filled. A bill where the amount does not match rate times volume will be questioned.",
      },
    ],
    defaults: {
      businessName: "Shree Ganesh Fuels",
      addressLine1: "NH-48, Near Toll Plaza, Manesar",
      addressLine2: "Gurugram, Haryana 122051",
      phone: "",
      currency: "INR",
      taxLabel: "Tax",
      taxRate: 0,
      greeting: "FUEL BILL",
      paymentMethod: "Mobile Payment",
      hideStoreLine: true,
      showBarcode: false,
      dateOrder: "dmy",
      footerMessage: "Thank you. Visit again.",
      cardLastFour: "", // paid by UPI: no card digits on the payment line
      paperStyle: "thermal",
      sections: [
        {
          title: "Fuel details",
          rows: [
            { label: "Nozzle", value: "03" },
            { label: "Product", value: "Petrol" },
            { label: "Rate (₹/L)", value: "94.98" },
            { label: "Volume (L)", value: "31.59" },
            { label: "Vehicle No", value: "HR 26 XX 0000" },
          ],
        },
      ],
      items: [{ id: id(), name: "Petrol 31.59 L @ ₹94.98", quantity: 1, price: 3000.42 }],
    },
  },
  {
    slug: "vat-receipt",
    name: "VAT Receipt",
    shortName: "VAT",
    icon: "🇬🇧",
    seoTitle: "VAT Receipt Template — Free UK VAT Receipt Generator",
    seoDescription:
      "Make a UK VAT receipt: your VAT registration number, tax point, items, the VAT rate and amount, and the total in pounds. Download as PDF or PNG.",
    heading: "VAT Receipt Generator (UK)",
    intro:
      "Create a VAT receipt for a sale in the UK, showing your VAT registration number, the date of supply, what was sold, the VAT rate and amount, and the total in pounds. For sales up to £250 it can serve as a simplified VAT invoice; above that, your customer may need a full one.",
    leadAnswer:
      "A UK VAT receipt shows the seller's name, address and VAT registration number, the date of supply (tax point), a description of what was sold, and for each VAT rate the rate and the total including VAT. For sales of £250 or less, that is a valid simplified VAT invoice; VAT-registered customers buying more need a full VAT invoice.",
    useCases: [
      "VAT receipts for business customers who reclaim VAT",
      "Simplified VAT invoices for sales up to £250",
      "Sole traders and small shops without a till",
      "Replacing a VAT receipt a customer asks for later",
    ],
    fields: [
      { name: "Seller's name and address", description: "Your trading name and business address." },
      { name: "VAT registration number", description: "Nine digits, usually shown with the GB prefix. Without it, a VAT-registered customer cannot reclaim the VAT." },
      { name: "Date of supply (tax point)", description: "When the goods or services were supplied. It decides which VAT return the sale falls into." },
      { name: "Description", description: "Enough to identify what was sold. 'Goods' is not enough; 'A4 printer paper, 5 reams' is." },
      { name: "VAT rate", description: "20% standard, 5% reduced or 0% zero-rated, shown for each rate on the receipt." },
      { name: "VAT amount", description: "The VAT charged, so a business customer knows what to reclaim." },
      { name: "Total including VAT", description: "What the customer paid. On a simplified invoice this, with the rate, is the minimum." },
      { name: "Customer details", description: "Not needed on a simplified invoice up to £250; required on a full VAT invoice." },
    ],
    howToSteps: [
      "Enter your business name, address and VAT registration number.",
      "Set the date of supply.",
      "List what was sold, with prices excluding VAT.",
      "Set VAT to the right rate (20%, 5% or 0%); the VAT amount and total calculate themselves.",
      "Download the PDF or PNG and give it to the customer.",
    ],
    guidance: [
      {
        heading: "VAT receipt or full VAT invoice?",
        body:
          "Under {cite:hmrc-vat-notice-700|HMRC's VAT guide}, a less detailed VAT invoice is allowed when the total of the supply is £250 or less, including VAT. It needs your name, address and VAT registration number, the time of supply, a description that identifies the goods or services, and for each VAT rate the total including VAT and the rate. It does not need the customer's name or address.\n\nAbove £250, a VAT-registered customer who wants to reclaim the VAT needs a full VAT invoice: an invoice number, the issue date, the customer's name and address, quantities, prices excluding VAT, and the VAT amount, alongside everything above.",
      },
      {
        heading: "Retailers issue them on request",
        body:
          "A shop selling to the public does not have to hand every customer a VAT invoice. HMRC's guidance is that retailers provide one when the customer asks for it, which is usually a business customer who needs it to reclaim VAT. Keep a copy of every VAT receipt you issue: it is part of the records behind your VAT return.",
      },
    ],
    sources: ["hmrc-vat-notice-700"],
    faqs: [
      {
        question: "What is a VAT receipt?",
        answer:
          "A receipt that shows the VAT charged on a sale, with the seller's VAT registration number. For sales up to £250 it can serve as a simplified VAT invoice, which VAT-registered customers use to reclaim VAT.",
      },
      {
        question: "What must a VAT receipt show?",
        answer:
          "The seller's name, address and VAT registration number, the date of supply, a description of what was sold, and for each VAT rate the rate and the total including VAT.",
      },
      {
        question: "When do I need a full VAT invoice instead?",
        answer:
          "When the sale is over £250 including VAT and the customer is VAT registered. A full invoice adds an invoice number, the customer's name and address, quantities, prices excluding VAT and the VAT amount.",
      },
      {
        question: "Can I issue a VAT receipt if I'm not VAT registered?",
        answer:
          "No. Only VAT-registered businesses can charge VAT or show a VAT registration number. If you are not registered, issue an ordinary receipt with no VAT line.",
      },
    ],
    defaults: {
      businessName: "Northgate Stationers Ltd",
      addressLine1: "14 Market Street",
      addressLine2: "Leeds LS1 6DT",
      phone: "",
      currency: "GBP",
      taxLabel: "VAT",
      taxRate: 20,
      greeting: "VAT RECEIPT",
      paymentMethod: "Debit Card",
      hideStoreLine: true,
      showBarcode: false,
      dateOrder: "dmy",
      footerMessage: "Thank you for your custom.",
      paperStyle: "thermal",
      sections: [
        {
          title: "VAT details",
          rows: [
            { label: "VAT Reg No", value: "GB 000 0000 00" },
            { label: "Tax point", value: "Date of sale" },
          ],
        },
      ],
      items: [
        { id: id(), name: "A4 Printer Paper (ream)", quantity: 5, price: 4.15 },
        { id: id(), name: "Black Toner Cartridge", quantity: 1, price: 38.0 },
      ],
    },
  },
  {
    slug: "tax-invoice-australia",
    name: "Tax Invoice (Australia)",
    shortName: "Tax Invoice",
    icon: "🇦🇺",
    seoTitle: "Tax Invoice Template Australia — Free GST Tax Invoice Maker",
    seoDescription:
      "Make an Australian tax invoice with your ABN, the date, items, GST at 10% and the total. Shows the buyer's ABN for sales of $1,000 or more. PDF or PNG.",
    heading: "Tax Invoice Generator (Australia)",
    intro:
      "Create a tax invoice for a sale in Australia: marked as a tax invoice, with your business name and ABN, the date, what you sold, the GST and the total. It works as the receipt a business customer needs to claim a GST credit.",
    leadAnswer:
      "An Australian tax invoice must show that it is intended to be a tax invoice, the seller's identity and ABN, the date, a brief description of what was sold with quantity and price, and the GST, either as an amount or as the words 'Total price includes GST'. For sales of $1,000 or more it must also show the buyer's identity or ABN.",
    useCases: [
      "Tradies and contractors billing a job",
      "Receipts business customers need for GST credits",
      "Sole traders without invoicing software",
      "Re-issuing a tax invoice a customer asks for",
    ],
    fields: [
      { name: "The words 'Tax invoice'", description: "The document has to show it is intended to be a tax invoice. Printing 'Tax invoice' at the top does that." },
      { name: "Seller's identity and ABN", description: "Your business name and your 11-digit Australian Business Number." },
      { name: "Date of issue", description: "The date the tax invoice was issued." },
      { name: "Description, quantity and price", description: "A brief description of each item, with the quantity where it applies and the price." },
      { name: "GST", description: "The GST amount, or the statement 'Total price includes GST' when GST is exactly one-eleventh of the total." },
      { name: "Total", description: "The amount payable including GST." },
      { name: "Buyer's identity or ABN", description: "Required only when the sale is $1,000 or more." },
    ],
    howToSteps: [
      "Enter your business name and ABN.",
      "Set the date of issue.",
      "List each item with its quantity and price excluding GST.",
      "Leave GST at 10%; the GST amount and total calculate themselves.",
      "For a sale of $1,000 or more, add the buyer's name or ABN. Then download the PDF or PNG.",
    ],
    guidance: [
      {
        heading: "Under $1,000, and $1,000 or more",
        body:
          "The {cite:ato-tax-invoices|ATO} sets two levels. Under $1,000, a tax invoice needs to show it is intended to be a tax invoice, the seller's identity and ABN, the date, a brief description with quantity and price, and the GST, which can be shown as an amount or, where it is exactly one-eleventh of the total, as the words 'Total price includes GST'. From $1,000, it must also show the buyer's identity or ABN.",
      },
      {
        heading: "When a customer asks for one",
        body:
          "If a customer asks for a tax invoice, the ATO requires you to provide it within 28 days, unless the sale was $82.50 or less including GST. Business customers ask because they generally need a tax invoice to claim the GST credit on the purchase. Keep a copy of every one you issue.",
      },
    ],
    sources: ["ato-tax-invoices"],
    faqs: [
      {
        question: "What must an Australian tax invoice include?",
        answer:
          "That it is intended to be a tax invoice, the seller's identity and ABN, the date, a brief description with quantity and price, and the GST. From $1,000, also the buyer's identity or ABN.",
      },
      {
        question: "Do I have to give a tax invoice?",
        answer:
          "If a customer asks, yes, within 28 days, unless the sale was $82.50 or less including GST.",
      },
      {
        question: "Can a receipt be a tax invoice?",
        answer:
          "Yes, if it shows everything a tax invoice must show. Many Australian receipts are printed with 'Tax invoice' at the top for that reason.",
      },
      {
        question: "Can I issue a tax invoice without being registered for GST?",
        answer:
          "Not with GST on it. Only GST-registered businesses charge GST. If you are not registered, issue an invoice or receipt with no GST.",
      },
    ],
    defaults: {
      businessName: "Harbour Electrical Services",
      addressLine1: "Unit 4, 22 Wharf Road",
      addressLine2: "Newcastle NSW 2300",
      phone: "",
      currency: "AUD",
      taxLabel: "GST",
      taxRate: 10,
      greeting: "TAX INVOICE",
      paymentMethod: "Credit Card",
      hideStoreLine: true,
      showBarcode: false,
      dateOrder: "dmy",
      footerMessage: "Total price includes GST. Thank you for your business.",
      paperStyle: "modern",
      sections: [
        {
          title: "Seller",
          rows: [{ label: "ABN", value: "00 000 000 000" }],
        },
      ],
      items: [
        { id: id(), name: "Call-out Fee", quantity: 1, price: 90.0 },
        { id: id(), name: "Labour (hrs)", quantity: 2, price: 95.0 },
        { id: id(), name: "Double Power Point & Fittings", quantity: 1, price: 48.0 },
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
  {
    slug: "rent-receipt",
    name: "Rent Receipt",
    shortName: "Rent",
    icon: "🏠",
    seoTitle: "Free Rent Receipt Generator — Landlord Rent Receipt Maker",
    seoDescription:
      "Create a rent receipt for tenants and landlords. Show rent paid, period, property and payment method. Free PDF & PNG download, free to build and preview.",
    heading: "Rent Receipt Generator",
    intro:
      "Create a rent receipt that documents a rent payment with the amount, rental period, property address and payment method. Landlords use it to give tenants proof of payment; tenants use it for records and reimbursement.",
    useCases: [
      "Landlords issuing proof of payment to tenants",
      "Tenants documenting rent for records or benefits",
      "Cash rent payments that need a paper trail",
      "Housing-allowance and reimbursement claims",
    ],
    faqs: [
      {
        question: "What should a rent receipt include?",
        answer:
          "A complete rent receipt shows the date paid, the rental period it covers, the property address, the tenant and landlord names, the amount paid and the payment method. Use the business field for the landlord or property name and a line item for the rent period.",
      },
      {
        question: "Is a rent receipt a legal document?",
        answer:
          "A rent receipt is a record of payment and can serve as evidence that rent was paid. In some jurisdictions landlords are required to provide one on request. It is most useful when it accurately reflects a real payment between the named tenant and landlord.",
      },
    ],
    guidance: [
      {
        heading: "When a landlord has to give a receipt",
        body:
          "Whether a rent receipt is optional depends on where the property is — and in several states it is not optional at all. California is the broadest: {cite:ca-civ-1499|Civil Code § 1499} entitles anyone paying money to a receipt from the person who accepts it. New York is specific to rent — under {cite:ny-rpl-235-e|Real Property Law § 235-e} a landlord must give a written receipt whenever rent is paid by any means other than the tenant's own personal check, and the statute sets out what that receipt has to state.\n\nWashington ties the duty to cash: {cite:wa-rcw-59-18-063|RCW 59.18.063} requires a receipt for any payment made in cash, and on request for other payment methods. Massachusetts covers the money a tenant hands over at the start of a tenancy — {cite:ma-mgl-186-15b|G.L. c.186 § 15B} governs the receipt for a security deposit or last month's rent, down to what it has to contain.\n\nThose four are examples, not the full picture. Rules differ by state and sometimes by city, and the one that binds you is the one where the property sits — not where either party lives. Look yours up before assuming a receipt is a courtesy.",
      },
      {
        heading: "Why cash rent is the case that matters",
        body:
          "A bank transfer or a cheque leaves a record on both sides without anyone doing anything. Cash leaves nothing, which is why the statutes that single out a payment method almost always single out cash, and why a tenant paying in cash should insist on a receipt every month rather than at the end of a dispute.\n\nMake the receipt say which period the payment covers, not just the date it was handed over. 'Rent — June 2026' settles an argument that '$1,850 received on 3 June' does not: a payment made in June could be June's rent, May's arrears, or a part payment of both.",
      },
      {
        heading: "What the landlord keeps it for",
        body:
          "The receipt is the tenant's proof, but it is also the landlord's own income record. {cite:irs-pub-527|Publication 527} sets out the rental income and expense records a landlord is expected to keep, and receipts are the income side of that file. Issuing them monthly means the year-end position is already assembled rather than reconstructed.",
      },
    ],
    sources: ["ca-civ-1499", "ny-rpl-235-e", "wa-rcw-59-18-063", "ma-mgl-186-15b", "irs-pub-527"],
    defaults: {
      businessName: "Maple Grove Properties",
      addressLine1: "Unit 4B, 215 Birch Lane",
      addressLine2: "Seattle, WA 98101",
      phone: "(206) 555-0119",
      taxLabel: "Tax",
      taxRate: 0,
      cashier: "Received by: M. Reyes",
      footerMessage: "Payment received in full. Thank you.",
      paymentMethod: "Check",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Monthly Rent — June 2026", quantity: 1, price: 1850.0 },
      ],
    },
  },
  {
    slug: "cash-receipt",
    name: "Cash Receipt",
    shortName: "Cash",
    icon: "💵",
    seoTitle: "Free Cash Receipt Generator — Cash Payment Receipt Maker",
    seoDescription:
      "Make a cash payment receipt with amount, payer and purpose. Free cash receipt template — download as PDF or PNG instantly. No sign-up to start.",
    heading: "Cash Receipt Generator",
    intro:
      "Create a simple cash receipt that records a payment made in cash: the amount, who paid, what it was for and the date. Ideal for any transaction where cash changed hands and both sides want a record.",
    useCases: [
      "Documenting a cash payment between two parties",
      "Small businesses giving customers cash proof of payment",
      "Recording deposits, fees or one-off payments",
      "Petty cash and reimbursement records",
    ],
    faqs: [
      {
        question: "How do I write a cash receipt?",
        answer:
          "Enter who received the payment as the business name, add a line item describing what the payment was for, set the amount, choose Cash as the payment method, and date it. Download the PDF and give a copy to the payer.",
      },
    ],
    defaults: {
      businessName: "Cash Payment Receipt",
      addressLine1: "",
      addressLine2: "",
      phone: "",
      taxLabel: "Tax",
      taxRate: 0,
      cashier: "Received from: J. Carter",
      footerMessage: "Paid in cash — received with thanks.",
      paymentMethod: "Cash",
      showBarcode: false,
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Payment for services rendered", quantity: 1, price: 150.0 },
      ],
    },
  },
  {
    slug: "donation-receipt",
    name: "Donation Receipt",
    shortName: "Donation",
    icon: "🎗️",
    seoTitle: "Free Donation Receipt Generator — Charity Receipt Maker",
    seoDescription:
      "Create a donation receipt for nonprofits and charities. Show donor, amount and date for tax records. Free PDF & PNG download, sign in to export.",
    heading: "Donation Receipt Generator",
    intro:
      "Create a charitable donation receipt that records a gift to a nonprofit, including the donor, amount, date and organization details. Useful for charities acknowledging donations and for donors keeping tax records.",
    useCases: [
      "Nonprofits acknowledging donor contributions",
      "Donors keeping records for tax deductions",
      "Fundraisers and community drives",
      "In-kind and cash donation documentation",
    ],
    faqs: [
      {
        question: "What does a donation receipt need for tax purposes?",
        answer:
          "A donation receipt generally needs the organization's name, the donor's name, the date and amount of the contribution, and a statement about whether goods or services were provided in return. Tax rules vary by country, so confirm your local requirements before relying on it for a deduction.",
      },
    ],
    guidance: [
      {
        heading: "The $250 line, and the sentence that has to be on the receipt",
        body:
          "For a single contribution of $250 or more, a donor needs a written acknowledgement from the charity. {cite:irs-pub-1771|Publication 1771} sets out that threshold and the statement the acknowledgement carries about whether the organization provided any goods or services in return for the gift.\n\nThat second half is what the familiar line — that no goods or services were provided in exchange for the contribution — is doing on a donation receipt. It is not boilerplate. It is the statement the rule asks for, and a receipt that records the amount but omits it is incomplete for a donor who intends to claim the gift. This template prints it in the footer by default for exactly that reason.\n\nBelow $250 the written acknowledgement is not required, but a charity that issues one anyway spares the donor from reconstructing the gift months later from a bank line that says only 'transfer'.",
      },
      {
        heading: "A receipt records the gift — it does not make it deductible",
        body:
          "Whether a donation can actually be deducted turns on the organization's tax status and on the donor's own circumstances, neither of which a receipt establishes. A charity issuing receipts is documenting what it received; it is not certifying anyone's deduction.\n\nSo write the receipt to be accurate about the facts — who gave, how much, when, and what if anything was given back — and leave the question of deductibility to the donor and their own adviser. Tax rules also differ by country, and the threshold above is a US one.",
      },
    ],
    sources: ["irs-pub-1771"],
    defaults: {
      businessName: "Helping Hands Foundation",
      addressLine1: "501 Charity Way",
      addressLine2: "Denver, CO 80203",
      phone: "(303) 555-0188",
      taxLabel: "Tax",
      taxRate: 0,
      cashier: "Donor: A. Thompson",
      footerMessage: "No goods or services were provided in exchange for this gift.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Charitable Donation", quantity: 1, price: 250.0 },
      ],
    },
  },
  {
    slug: "invoice",
    name: "Invoice Receipt",
    shortName: "Invoice",
    icon: "📋",
    seoTitle: "Free Invoice Generator — Simple Paid Invoice Receipt Maker",
    seoDescription:
      "Create a simple paid invoice receipt with line items, tax and total. Free invoice maker for freelancers and small businesses — PDF & PNG download.",
    heading: "Invoice Receipt Generator",
    intro:
      "Create a clean paid-invoice receipt for freelancers, contractors and small businesses, with itemized services, tax and a total. A fast way to give a client proof that an invoice was paid without invoicing software.",
    useCases: [
      "Freelancers confirming a paid invoice",
      "Small businesses billing for services",
      "Contractors documenting completed work",
      "Client records and bookkeeping",
    ],
    faqs: [
      {
        question: "What's the difference between an invoice and a receipt?",
        answer:
          "An invoice requests payment before it's made; a receipt confirms payment after it's made. This generator produces a paid-style document that itemizes the work and shows the total as settled — useful when a client needs proof that they have already paid.",
      },
    ],
    defaults: {
      businessName: "Bright Studio Design",
      addressLine1: "120 Creative Blvd",
      addressLine2: "Brooklyn, NY 11201",
      phone: "(718) 555-0142",
      website: "brightstudio.design",
      taxLabel: "Sales Tax",
      taxRate: 8.875,
      register: "Invoice #INV-2041",
      footerMessage: "Paid in full — thank you for your business!",
      paymentMethod: "Mobile Payment",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Logo Design", quantity: 1, price: 450.0 },
        { id: id(), name: "Brand Style Guide", quantity: 1, price: 300.0 },
        { id: id(), name: "Revisions (hrs)", quantity: 2, price: 75.0 },
      ],
    },
  },
  {
    slug: "plumbing-invoice",
    name: "Plumbing Invoice",
    shortName: "Plumbing",
    icon: "🔧",
    seoTitle: "Plumbing Invoice Template — Free Plumber Invoice Generator",
    seoDescription:
      "Make a plumbing invoice with the service call, labor hours, parts, amount due and due date, then mark it paid to give the customer a receipt. PDF or PNG.",
    heading: "Plumbing Invoice Generator",
    intro:
      "Create a plumbing invoice that bills a job clearly: the service call, labor hours, each part, the amount due and when it is due. When the customer pays, mark the same document paid and it becomes the receipt.",
    leadAnswer:
      "A plumbing invoice lists your business and license details, the customer and service address, the work done, labor and parts on separate lines, the amount due and the due date. After payment, mark it paid so the same document serves as the customer's receipt.",
    useCases: [
      "Independent plumbers billing a job",
      "Service-call and emergency work",
      "Receipts for customers once an invoice is paid",
      "Landlord and property-manager repair records",
    ],
    fields: [
      {
        name: "Business and license number",
        description:
          "Your trading name, phone number and, where your state licenses plumbers, your license number. It tells the customer who is responsible for the work.",
      },
      {
        name: "Customer and service address",
        description:
          "Who is billed and where the work was done. For rentals they are often different people and places.",
      },
      {
        name: "Description of work",
        description:
          "What was fixed or installed, in plain words: 'Replaced 40-gal water heater' rather than 'Labor'.",
      },
      {
        name: "Labor",
        description:
          "Hours and rate, or a flat charge, on its own line.",
      },
      {
        name: "Parts and materials",
        description:
          "Each part with quantity and price, separate from labor.",
      },
      {
        name: "Service-call or trip fee",
        description:
          "A named line, so it is not mistaken for padding in the labor rate.",
      },
      {
        name: "Invoice number",
        description:
          "A number in a sequence you control, so a payment can be matched to the job and no number is used twice.",
      },
      {
        name: "Issue date and due date",
        description:
          "When the invoice was sent and when payment is due. 'Net 15' or 'due on receipt' belongs on the same line as the date it produces.",
      },
      {
        name: "Amount due",
        description:
          "The total relabelled as the amount the customer owes. Once paid, change it to show the amount received and mark the document paid.",
      },
    ],
    howToSteps: [
      "Enter your business name, phone number and license number.",
      "Add the customer, the billing address and the service address.",
      "List the service call, labor and each part as separate lines.",
      "Set the invoice number, issue date, due date and payment terms.",
      "Download the PDF and send it. When the customer pays, mark it paid and send it again as their receipt.",
    ],
    guidance: [
      {
        heading: "Parts and labor on separate lines",
        body:
          "Customers question a single lump sum far more often than an itemized one, and separate lines make a warranty claim on a part easy to trace. Sales tax is the other reason: whether it applies to parts, labor or both depends on your state, so keep them apart and check your state's rules before you set a rate.",
      },
      {
        heading: "Keep a copy of every invoice",
        body:
          "An invoice is a business record as well as a bill. {cite:irs-pub-583|IRS Publication 583} lists invoices among the supporting documents for a business's gross receipts, so keep a copy of each one you issue, paid or not, with the number sequence unbroken.",
      },
    ],
    sources: ["irs-pub-583"],
    faqs: [
      {
        question: "What should a plumbing invoice include?",
        answer:
          "Your business and license details, the customer and service address, a description of the work, labor and parts on separate lines, any service-call fee, the invoice number, the issue and due dates, and the amount due.",
      },
      {
        question: "What is the difference between a plumbing invoice and a receipt?",
        answer:
          "An invoice asks for payment; a receipt confirms it was made. With this template you send the invoice, then mark the same document paid once the customer pays.",
      },
      {
        question: "Should I charge sales tax on plumbing labor?",
        answer:
          "It depends on your state. Some tax parts only, some tax labor too. Keep them on separate lines and check your state's rules before setting a rate.",
      },
      {
        question: "Do I need my license number on the invoice?",
        answer:
          "Where your state licenses plumbers, showing it is good practice and some jurisdictions expect it. It tells the customer who is responsible for the work.",
      },
    ],
    defaults: {
      businessName: "Clearline Plumbing Co.",
      addressLine1: "88 Harbor Road",
      addressLine2: "Tampa, FL 33602",
      phone: "(813) 555-0127",
      greeting: "INVOICE",
      taxLabel: "Sales Tax",
      taxRate: 0,
      grandTotalLabel: "AMOUNT DUE",
      hideTotals: true,
      invoice: true,
      hideStoreLine: true,
      showBarcode: false,
      footerMessage: "Payment due within 15 days. Thank you for your business.",
      paperStyle: "modern",
      sections: [
        {
          title: "Bill to",
          rows: [
            { value: "Dana Whitfield" },
            { value: "1425 Bayview Drive" },
            { value: "Tampa, FL 33611" },
          ],
        },
        {
          title: "Payment terms",
          rows: [
            { label: "Terms", value: "Net 15" },
            { label: "Due", value: "15 days from invoice date" },
            { label: "License #", value: "CFC0000000" },
          ],
        },
      ],
      items: [
        { id: id(), name: "Service Call", quantity: 1, price: 89.0 },
        { id: id(), name: "Labor (hrs)", quantity: 2.5, price: 115.0 },
        { id: id(), name: "40-gal Water Heater", quantity: 1, price: 649.0 },
        { id: id(), name: "Supply Lines & Fittings", quantity: 1, price: 42.5 },
      ],
    },
  },
  {
    slug: "hvac-invoice",
    name: "HVAC Invoice",
    shortName: "HVAC",
    icon: "❄️",
    seoTitle: "HVAC Invoice Template — Free HVAC Invoice Generator",
    seoDescription:
      "Make an HVAC invoice with the equipment, labor, parts, refrigerant, amount due and due date, then mark it paid to give the customer a receipt. PDF or PNG.",
    heading: "HVAC Invoice Generator",
    intro:
      "Create an HVAC invoice for repairs, maintenance visits and installations, with the equipment serviced, labor, parts, refrigerant, the amount due and when it is due. When the customer pays, mark the same document paid and it becomes the receipt.",
    leadAnswer:
      "An HVAC invoice lists your business and license details, the customer and service address, the equipment serviced, labor, parts and refrigerant on separate lines, the amount due and the due date. After payment, mark it paid so the same document serves as the customer's receipt.",
    useCases: [
      "HVAC technicians billing repairs and installs",
      "Seasonal maintenance and tune-up visits",
      "Receipts for customers once an invoice is paid",
      "Records for equipment warranty claims",
    ],
    fields: [
      {
        name: "Business and license number",
        description:
          "Your trading name, phone number and, where your state licenses HVAC contractors, your license number.",
      },
      {
        name: "Customer and service address",
        description:
          "Who is billed and where the equipment is.",
      },
      {
        name: "Equipment serviced",
        description:
          "Make, model and, ideally, serial number of the unit. Manufacturer warranty claims are made by serial number.",
      },
      {
        name: "Labor",
        description:
          "Hours and rate, or a flat charge, on its own line.",
      },
      {
        name: "Parts",
        description:
          "Each part with quantity and price, separate from labor.",
      },
      {
        name: "Refrigerant",
        description:
          "Type and amount added, for example R-410A by the pound, on its own line.",
      },
      {
        name: "Invoice number",
        description:
          "A number in a sequence you control, so a payment can be matched to the job and no number is used twice.",
      },
      {
        name: "Issue date and due date",
        description:
          "When the invoice was sent and when payment is due. 'Net 15' or 'due on receipt' belongs on the same line as the date it produces.",
      },
      {
        name: "Amount due",
        description:
          "The total relabelled as the amount the customer owes. Once paid, change it to show the amount received and mark the document paid.",
      },
    ],
    howToSteps: [
      "Enter your business name, phone number and license number.",
      "Add the customer, the billing address and the service address.",
      "Record the equipment's make, model and serial number.",
      "List labor, each part and any refrigerant as separate lines.",
      "Set the invoice number, issue date, due date and terms, then download and send it. Mark it paid when the customer pays.",
    ],
    guidance: [
      {
        heading: "Why refrigerant gets its own line",
        body:
          "Refrigerant is often the most questioned charge on an HVAC bill, so show the type and amount added rather than folding it into labor. Handling it is regulated: under {cite:epa-section-608|EPA Section 608} technicians who maintain, service or repair equipment that could release refrigerants must be certified, which is why many contractors print the technician's certification on the invoice.",
      },
      {
        heading: "Record the serial number",
        body:
          "Manufacturer warranties on compressors, coils and furnaces are claimed by serial number, and the claim usually asks for proof of the service. An invoice that names the unit and what was done to it is that proof, for you and for the customer.",
      },
    ],
    sources: ["epa-section-608"],
    faqs: [
      {
        question: "What should an HVAC invoice include?",
        answer:
          "Your business and license details, the customer and service address, the equipment's make, model and serial number, labor, parts and refrigerant on separate lines, the invoice number, the issue and due dates, and the amount due.",
      },
      {
        question: "What is the difference between an HVAC invoice and a receipt?",
        answer:
          "An invoice asks for payment; a receipt confirms it was made. Send the invoice, then mark the same document paid once the customer pays.",
      },
      {
        question: "Should refrigerant be listed separately?",
        answer:
          "Yes. Show the type and amount added on its own line. It is often the most questioned charge, and a separate line answers the question before it is asked.",
      },
      {
        question: "Do HVAC technicians need certification to handle refrigerant?",
        answer:
          "Yes. Under EPA Section 608, technicians who maintain, service or repair equipment that could release refrigerants must be certified.",
      },
    ],
    defaults: {
      businessName: "Summit Heating & Air",
      addressLine1: "3100 Ridge Avenue",
      addressLine2: "Charlotte, NC 28203",
      phone: "(704) 555-0164",
      greeting: "INVOICE",
      taxLabel: "Sales Tax",
      taxRate: 0,
      grandTotalLabel: "AMOUNT DUE",
      hideTotals: true,
      invoice: true,
      hideStoreLine: true,
      showBarcode: false,
      footerMessage: "Payment due within 15 days. Thank you for your business.",
      paperStyle: "modern",
      sections: [
        {
          title: "Bill to",
          rows: [
            { value: "Marcus Ellison" },
            { value: "742 Laurel Street" },
            { value: "Charlotte, NC 28205" },
          ],
        },
        {
          title: "Payment terms",
          rows: [
            { label: "Terms", value: "Net 15" },
            { label: "Due", value: "15 days from invoice date" },
          ],
        },
        {
          title: "Equipment",
          rows: [
            { label: "Unit", value: "Carrier 24ACC636" },
            { label: "Serial", value: "1023E12345" },
          ],
        },
      ],
      items: [
        { id: id(), name: "Diagnostic Visit", quantity: 1, price: 95.0 },
        { id: id(), name: "Labor (hrs)", quantity: 2, price: 125.0 },
        { id: id(), name: "Dual Run Capacitor", quantity: 1, price: 68.0 },
        { id: id(), name: "R-410A Refrigerant (lb)", quantity: 2, price: 85.0 },
      ],
    },
  },
  {
    slug: "sales-receipt",
    name: "Sales Receipt",
    shortName: "Sales",
    icon: "🛍️",
    seoTitle: "Free Sales Receipt Generator — Itemized Sales Receipt Maker",
    seoDescription:
      "Create an itemized sales receipt for any product sale with tax and payment details. Free sales receipt template — download as PDF or PNG.",
    heading: "Sales Receipt Generator",
    intro:
      "Create a general-purpose sales receipt for any product or service sale, with itemized lines, tax, discount and payment method. Flexible enough for market stalls, online sellers, pop-ups and side businesses.",
    useCases: [
      "Independent sellers and market vendors",
      "Online resellers shipping with a receipt",
      "Pop-up shops and craft fairs",
      "General proof of sale and bookkeeping",
    ],
    faqs: [
      {
        question: "Can I use a sales receipt as proof of purchase?",
        answer:
          "Yes — an itemized sales receipt showing the seller, date, items, amounts and payment method is a standard proof of purchase. Keep it with your card or bank statement for the strongest record.",
      },
    ],
    defaults: {
      businessName: "Riverside Goods",
      addressLine1: "78 Market Street",
      addressLine2: "Savannah, GA 31401",
      phone: "(912) 555-0173",
      taxLabel: "Sales Tax",
      taxRate: 7.0,
      footerMessage: "Thank you for your purchase!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Handmade Candle", quantity: 2, price: 16.0 },
        { id: id(), name: "Gift Wrap", quantity: 1, price: 3.5 },
      ],
    },
  },
  {
    slug: "itemized-receipt",
    name: "Itemized Receipt",
    shortName: "Itemized",
    icon: "📝",
    seoTitle: "Free Itemized Receipt Generator — Detailed Receipt Maker",
    seoDescription:
      "Create a fully itemized receipt listing every product, quantity and price with tax. Free itemized receipt maker for expenses — PDF & PNG download.",
    heading: "Itemized Receipt Generator",
    intro:
      "Create a fully itemized receipt that breaks out every product or service with its quantity and price. Expense systems and reimbursement policies often require an itemized receipt rather than just a total.",
    useCases: [
      "Expense reports that require itemization",
      "Insurance and reimbursement claims",
      "Detailed bookkeeping records",
      "Splitting shared costs accurately",
    ],
    faqs: [
      {
        question: "Why do expense policies require an itemized receipt?",
        answer:
          "An itemized receipt shows exactly what was purchased, which lets approvers verify that each line is eligible under the policy (for example, excluding alcohol or personal items). A total-only receipt doesn't provide that detail, so many systems reject it.",
      },
    ],
    defaults: {
      businessName: "Office Supply Depot",
      addressLine1: "44 Commerce Drive",
      addressLine2: "Dallas, TX 75201",
      phone: "(214) 555-0160",
      taxLabel: "Sales Tax",
      taxRate: 8.25,
      footerMessage: "Itemized receipt — keep for your records.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Printer Paper A4 (Ream)", quantity: 3, price: 5.99 },
        { id: id(), name: "Ballpoint Pens 12ct", quantity: 2, price: 4.49 },
        { id: id(), name: "Sticky Notes 4pk", quantity: 1, price: 6.99 },
        { id: id(), name: "Stapler", quantity: 1, price: 9.99 },
      ],
    },
  },
  {
    slug: "medical-receipt",
    name: "Medical Receipt",
    shortName: "Medical",
    icon: "🩺",
    seoTitle: "Free Medical Receipt Generator — Doctor & Clinic Receipt Maker",
    seoDescription:
      "Create a medical or clinic receipt for services and copays. Free receipt maker for HSA/FSA and insurance records — PDF & PNG, free account required.",
    heading: "Medical Receipt Generator",
    intro:
      "Create a receipt for medical services, copays or treatments, with provider details and itemized charges. Useful for HSA/FSA reimbursement, insurance submissions and personal medical expense records.",
    useCases: [
      "HSA / FSA reimbursement claims",
      "Insurance reimbursement submissions",
      "Medical expense tax records",
      "Copay and treatment documentation",
    ],
    faqs: [
      {
        question: "What should a medical receipt include for reimbursement?",
        answer:
          "For HSA/FSA or insurance, a medical receipt should show the provider's name, the date of service, a description of the service or item, the amount paid and the payment method. Keep any explanation-of-benefits paperwork with it for the strongest claim.",
      },
    ],
    defaults: {
      businessName: "Lakeside Family Clinic",
      addressLine1: "330 Wellness Avenue",
      addressLine2: "Minneapolis, MN 55401",
      phone: "(612) 555-0137",
      taxLabel: "Tax",
      taxRate: 0,
      cashier: "Patient: R. Daniels",
      footerMessage: "Thank you. Please keep this receipt for your records.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Office Visit Copay", quantity: 1, price: 30.0 },
        { id: id(), name: "Lab Work — Basic Panel", quantity: 1, price: 45.0 },
      ],
    },
  },
  {
    slug: "proof-of-purchase",
    name: "Proof of Purchase Receipt",
    shortName: "Proof",
    icon: "✅",
    seoTitle: "Free Proof of Purchase Generator — Receipt of Purchase Maker",
    seoDescription:
      "Create a proof of purchase receipt for warranties, returns and claims. Free template with item, date and payment details — PDF & PNG download.",
    heading: "Proof of Purchase Generator",
    intro:
      "Create a proof-of-purchase receipt documenting what was bought, when, for how much and how it was paid. Commonly needed for warranty registration, returns, exchanges and insurance claims.",
    useCases: [
      "Warranty registration and claims",
      "Returns and exchange documentation",
      "Insurance claims for purchased items",
      "Replacing a lost original receipt",
    ],
    faqs: [
      {
        question: "What counts as proof of purchase?",
        answer:
          "Proof of purchase typically shows the seller, the item purchased, the date and the amount paid. Recreate the details of a genuine purchase here and pair the PDF with your bank or card statement, which together form strong proof for most warranty and return policies.",
      },
    ],
    defaults: {
      businessName: "Tech & Home Store",
      addressLine1: "1200 Retail Park",
      addressLine2: "Phoenix, AZ 85001",
      phone: "(602) 555-0124",
      taxLabel: "Sales Tax",
      taxRate: 8.6,
      footerMessage: "Retain as proof of purchase for warranty claims.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Cordless Vacuum Cleaner", quantity: 1, price: 199.99 },
      ],
    },
  },
  {
    slug: "childcare-receipt",
    name: "Childcare Receipt",
    shortName: "Childcare",
    icon: "👶",
    seoTitle: "Daycare & Childcare Receipt Generator — Free Receipt Maker",
    seoDescription:
      "Create a daycare, childcare or babysitting receipt with dates, hours and rate. Free receipt maker for FSA claims and tax credits — PDF & PNG download.",
    heading: "Daycare & Childcare Receipt Generator",
    intro:
      "Create a childcare or babysitting receipt showing the provider, dates, hours and rate. Parents use it for childcare tax credits and employer benefits; providers use it to give families a professional record.",
    useCases: [
      "Childcare tax credit documentation",
      "Dependent-care FSA reimbursement",
      "Independent babysitters issuing receipts",
      "Nanny and daycare payment records",
    ],
    faqs: [
      {
        question: "What should a childcare receipt show for a tax credit?",
        answer:
          "Childcare receipts for tax credits usually need the provider's name, the dates of care, the amount paid and often the provider's tax ID. Use the business field for the provider, line items for sessions or weeks, and the footer or cashier field for any required identifier.",
      },
    ],
    defaults: {
      businessName: "Sunshine Childcare",
      addressLine1: "Care Provider",
      addressLine2: "Portland, OR 97205",
      phone: "(503) 555-0181",
      taxLabel: "Tax",
      taxRate: 0,
      cashier: "Provider: L. Nguyen",
      footerMessage: "Thank you for trusting us with your family.",
      paymentMethod: "Mobile Payment",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Full-Day Care (days)", quantity: 5, price: 55.0 },
      ],
    },
  },
  {
    slug: "handyman-receipt",
    name: "Handyman Receipt",
    shortName: "Handyman",
    icon: "🔨",
    seoTitle: "Free Handyman Receipt Generator — Contractor Receipt Maker",
    seoDescription:
      "Create a handyman receipt with labor, materials and tax. Free receipt maker for home services — download as PDF or PNG, watermark-free on your first one.",
    heading: "Handyman & Contractor Receipt Generator",
    intro:
      "Create a handyman or contractor receipt that separates labor, materials and tax. Ideal for independent tradespeople giving customers a professional record and for homeowners tracking home-improvement costs.",
    useCases: [
      "Independent handymen issuing receipts",
      "Home repair and improvement records",
      "Landlord maintenance documentation",
      "Customer proof of completed work",
    ],
    faqs: [
      {
        question: "How do I separate labor and materials on the receipt?",
        answer:
          "Add a line item for labor with the quantity set to hours and the price set to your hourly rate, then list each material as its own line. This mirrors how professional service invoices break out labor from parts, which customers and tax records expect.",
      },
    ],
    defaults: {
      businessName: "Reliable Home Repairs",
      addressLine1: "Licensed & Insured",
      addressLine2: "Charlotte, NC 28202",
      phone: "(704) 555-0166",
      taxLabel: "Sales Tax",
      taxRate: 7.25,
      footerMessage: "90-day workmanship guarantee. Thank you!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Labor (hrs)", quantity: 3, price: 65.0 },
        { id: id(), name: "Drywall & Supplies", quantity: 1, price: 48.5 },
        { id: id(), name: "Paint (Gal)", quantity: 1, price: 32.0 },
      ],
    },
  },
  {
    slug: "tutoring-receipt",
    name: "Tutoring Receipt",
    shortName: "Tutoring",
    icon: "📚",
    seoTitle: "Free Tutoring Receipt Generator — Tutor Payment Receipt Maker",
    seoDescription:
      "Create a tutoring receipt with sessions, hours and rate. Free receipt maker for tutors and parents — download as PDF or PNG. No sign-up to start.",
    heading: "Tutoring Receipt Generator",
    intro:
      "Create a tutoring receipt showing sessions, hours and rate for academic or test-prep tutoring. Independent tutors use it to bill families professionally; parents use it for education expense records.",
    useCases: [
      "Independent tutors issuing client receipts",
      "Education expense and reimbursement records",
      "Test-prep and lesson payment tracking",
      "Employer education-benefit claims",
    ],
    faqs: [
      {
        question: "How do I bill for multiple tutoring sessions on one receipt?",
        answer:
          "Add a line item such as 'Math Tutoring' with the quantity set to the number of hours or sessions and the price set to your per-hour or per-session rate. You can list different subjects as separate lines so the receipt clearly shows what each charge covers.",
      },
    ],
    defaults: {
      businessName: "Bright Minds Tutoring",
      addressLine1: "Private Tutor",
      addressLine2: "Boston, MA 02116",
      phone: "(617) 555-0190",
      taxLabel: "Tax",
      taxRate: 0,
      cashier: "Tutor: S. Patel",
      footerMessage: "Next session booked — see you then!",
      paymentMethod: "Mobile Payment",
      paperStyle: "minimal",
      items: [
        { id: id(), name: "Algebra Tutoring (hrs)", quantity: 4, price: 45.0 },
        { id: id(), name: "SAT Prep Session (hrs)", quantity: 2, price: 60.0 },
      ],
    },
  },
  {
    slug: "cleaning-service-receipt",
    name: "Cleaning Service Receipt",
    shortName: "Cleaning",
    icon: "🧹",
    seoTitle: "Free Cleaning Service Receipt Generator — House Cleaning Receipt",
    seoDescription:
      "Create a cleaning service receipt with services, hours and tax. Free receipt maker for house cleaners and clients — PDF & PNG download, sign in to save yours.",
    heading: "Cleaning Service Receipt Generator",
    intro:
      "Create a house-cleaning or commercial-cleaning receipt with itemized services, hours and tax. Independent cleaners use it to give clients a professional record; clients use it for expense and reimbursement tracking.",
    useCases: [
      "Independent house cleaners issuing receipts",
      "Recurring service payment records",
      "Move-in / move-out cleaning documentation",
      "Office cleaning expense tracking",
    ],
    faqs: [
      {
        question: "How do I show recurring cleaning visits on a receipt?",
        answer:
          "Use a line item like 'Standard Clean' with the quantity set to the number of visits and the price set to your per-visit rate, or list each dated visit separately. Add extras such as deep cleaning or window washing as their own lines.",
      },
    ],
    defaults: {
      businessName: "Spotless Home Cleaning",
      addressLine1: "Insured Cleaning Service",
      addressLine2: "Tampa, FL 33602",
      phone: "(813) 555-0155",
      taxLabel: "Sales Tax",
      taxRate: 7.5,
      footerMessage: "Thank you — your next clean is on us if you're not satisfied!",
      paymentMethod: "Mobile Payment",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Standard Home Clean", quantity: 1, price: 120.0 },
        { id: id(), name: "Interior Windows", quantity: 1, price: 35.0 },
      ],
    },
  },
  {
    slug: "fast-food-receipt",
    name: "Fast Food Receipt",
    shortName: "Fast Food",
    icon: "🍔",
    seoTitle: "Free Fast Food Receipt Generator — Burger & Combo Receipts",
    seoDescription:
      "Make an editable fast food receipt online: burgers, combos, fries and drinks with tax. Download as PDF or PNG in seconds. Free, free to build and preview.",
    heading: "Fast Food Receipt Generator",
    intro:
      "Create an editable fast food or drive-thru receipt with combo meals, add-ons, fountain drinks and sales tax. Great for replacing a lost meal receipt, expense reports or design mockups.",
    useCases: [
      "Replace a lost drive-thru receipt for an expense report",
      "Per-diem and travel meal documentation",
      "Bookkeeping for daily meal spending",
      "Props for film, TV and advertising",
    ],
    faqs: [
      { question: "How do I make a fast food receipt?", answer: "Pick the fast food template, set the restaurant name and location, add each item and combo with its price, set the local tax rate, then download as PDF or PNG. It takes under a minute." },
      { question: "Can I add combo meals and add-ons?", answer: "Yes. Add any number of line items — combos, sides, drinks and add-ons — each with its own quantity and price. The subtotal, tax and total update automatically." },
    ],
    defaults: {
      businessName: "Burger Junction",
      addressLine1: "880 Drive-Thru Lane",
      addressLine2: "Columbus, OH 43004",
      phone: "(614) 555-0193",
      taxLabel: "Sales Tax",
      taxRate: 7.5,
      footerMessage: "Thanks — come back soon!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Double Cheeseburger Combo", quantity: 1, price: 8.99 },
        { id: id(), name: "Chicken Nuggets 10pc", quantity: 1, price: 5.49 },
        { id: id(), name: "Large Fries", quantity: 1, price: 3.29 },
        { id: id(), name: "Soft Drink (L)", quantity: 2, price: 2.49 },
      ],
    },
  },
  {
    slug: "pizza-receipt",
    name: "Pizza Receipt",
    shortName: "Pizza",
    icon: "🍕",
    seoTitle: "Free Pizza Receipt Generator — Pizzeria & Delivery Receipts",
    seoDescription:
      "Create an editable pizza receipt with pies, toppings, sides and delivery fees. Download as PDF or PNG instantly. Free pizza receipt maker, sign in to export.",
    heading: "Pizza Receipt Generator",
    intro:
      "Make an editable pizzeria or pizza delivery receipt with custom pies, toppings, sides, drinks, delivery fees and tip. Perfect for reimbursements, records or props.",
    useCases: [
      "Replace a lost pizza delivery receipt",
      "Office party and catering expense records",
      "Bookkeeping for a small pizzeria",
      "Film and advertising props",
    ],
    faqs: [
      { question: "Can I add delivery fees and tips?", answer: "Yes. Add line items for the delivery fee and driver tip just like any other item, and the total recalculates instantly." },
      { question: "Can I itemize toppings?", answer: "Absolutely — add each pizza and topping as its own line, or as a single line with the full price. It's completely flexible." },
    ],
    defaults: {
      businessName: "Tony's Pizzeria",
      addressLine1: "245 Brick Oven Road",
      addressLine2: "Brooklyn, NY 11215",
      phone: "(718) 555-0142",
      taxLabel: "Sales Tax",
      taxRate: 8.875,
      footerMessage: "Grazie! See you next slice.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Large Pepperoni Pizza", quantity: 1, price: 18.99 },
        { id: id(), name: "Garlic Knots (6)", quantity: 1, price: 6.49 },
        { id: id(), name: "2L Soda", quantity: 1, price: 3.49 },
        { id: id(), name: "Delivery Fee", quantity: 1, price: 3.99 },
      ],
    },
  },
  {
    slug: "clothing-store-receipt",
    name: "Clothing Store Receipt",
    shortName: "Clothing",
    icon: "👕",
    seoTitle: "Free Clothing Store Receipt Generator — Apparel Receipts",
    seoDescription:
      "Make an editable clothing or apparel store receipt with items, sizes, sales tax and payment details. Download as PDF or PNG. Free, free account required.",
    heading: "Clothing Store Receipt Generator",
    intro:
      "Create an editable clothing or fashion retail receipt with apparel items, quantities, discounts and sales tax. Useful for returns documentation, expense reports, bookkeeping or props.",
    useCases: [
      "Proof of purchase for a return or exchange",
      "Wardrobe and business-attire expense records",
      "Bookkeeping for a boutique or resale shop",
      "Styling and design mockups",
    ],
    faqs: [
      { question: "Can I add a discount or coupon?", answer: "Yes — the builder supports a flat or percentage discount that's applied before tax, so you can show a sale price or coupon." },
      { question: "Can I include sizes and colors?", answer: "Yes. Put the size or color right in the item name (e.g. \"T-Shirt — Black / M\") so the receipt reads naturally." },
    ],
    defaults: {
      businessName: "Urban Thread Apparel",
      addressLine1: "57 Fashion Avenue",
      addressLine2: "Los Angeles, CA 90014",
      phone: "(213) 555-0166",
      taxLabel: "Sales Tax",
      taxRate: 9.5,
      footerMessage: "Returns accepted within 30 days with receipt.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Crewneck Sweater — Navy / M", quantity: 1, price: 49.99 },
        { id: id(), name: "Slim Jeans — 32x32", quantity: 1, price: 59.99 },
        { id: id(), name: "Crew Socks 3-Pack", quantity: 1, price: 14.99 },
      ],
    },
  },
  {
    slug: "electronics-store-receipt",
    name: "Electronics Store Receipt",
    shortName: "Electronics",
    icon: "📱",
    seoTitle: "Free Electronics Store Receipt Generator — Tech Receipts",
    seoDescription:
      "Create an editable electronics store receipt with devices, accessories, warranties and sales tax. Download as PDF or PNG. Free, watermark-free on your first.",
    heading: "Electronics Store Receipt Generator",
    intro:
      "Make an editable electronics or tech store receipt with devices, accessories, protection plans and sales tax. Ideal for warranty claims, insurance documentation, expense reports or props.",
    useCases: [
      "Proof of purchase for a warranty or insurance claim",
      "Business equipment expense documentation",
      "Records for a repair or resale shop",
      "Design and advertising mockups",
    ],
    faqs: [
      { question: "Can I add a serial number or warranty?", answer: "Yes — add a line for the protection plan, and include serial or model numbers in the item name or a custom note section." },
      { question: "Is this good for insurance claims?", answer: "Many people recreate a lost proof of purchase for a device they really bought. You're responsible for using it honestly and lawfully." },
    ],
    defaults: {
      businessName: "VoltTech Electronics",
      addressLine1: "1200 Circuit Drive",
      addressLine2: "San Jose, CA 95110",
      phone: "(408) 555-0119",
      taxLabel: "Sales Tax",
      taxRate: 9.25,
      footerMessage: "Keep your receipt for warranty service.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Wireless Earbuds", quantity: 1, price: 129.99 },
        { id: id(), name: "USB-C Charger 30W", quantity: 1, price: 24.99 },
        { id: id(), name: "2-Year Protection Plan", quantity: 1, price: 19.99 },
      ],
    },
  },
  {
    slug: "hardware-store-receipt",
    name: "Hardware Store Receipt",
    shortName: "Hardware",
    icon: "🔨",
    seoTitle: "Free Hardware Store Receipt Generator — Tools & Supplies",
    seoDescription:
      "Make an editable hardware store receipt with tools, lumber, paint and supplies plus tax. Download as PDF or PNG. Free hardware receipt maker, sign in to save yours.",
    heading: "Hardware Store Receipt Generator",
    intro:
      "Create an editable hardware or home-improvement store receipt with tools, building materials, paint and supplies. Great for contractor expense tracking, reimbursements, job costing or props.",
    useCases: [
      "Job-costing and contractor expense records",
      "Reimbursement for materials on a project",
      "Replace a lost receipt for a return",
      "Bookkeeping for a trades business",
    ],
    faqs: [
      { question: "Can I add materials sold by length or weight?", answer: "Yes. Use the quantity field for board feet, pounds or units, and set the unit price — totals calculate automatically." },
      { question: "Can I use this for contractor expenses?", answer: "Yes, it's popular for recreating lost materials receipts on a job. Use it only for purchases that actually happened." },
    ],
    defaults: {
      businessName: "Cornerstone Hardware",
      addressLine1: "78 Builders Way",
      addressLine2: "Denver, CO 80216",
      phone: "(303) 555-0188",
      taxLabel: "Sales Tax",
      taxRate: 8.0,
      footerMessage: "Returns with receipt within 90 days.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Cordless Drill Kit", quantity: 1, price: 99.0 },
        { id: id(), name: "2x4 Lumber 8ft", quantity: 8, price: 3.78 },
        { id: id(), name: "Interior Paint (Gallon)", quantity: 2, price: 29.98 },
        { id: id(), name: "Drywall Screws 1lb", quantity: 1, price: 8.47 },
      ],
    },
  },
  {
    slug: "pet-store-receipt",
    name: "Pet Store Receipt",
    shortName: "Pet Store",
    icon: "🐾",
    seoTitle: "Free Pet Store Receipt Generator — Pet Supplies Receipts",
    seoDescription:
      "Create an editable pet store receipt with food, supplies and grooming plus tax. Download as PDF or PNG instantly. Free pet store receipt maker, free to build and preview.",
    heading: "Pet Store Receipt Generator",
    intro:
      "Make an editable pet store receipt with pet food, toys, supplies and grooming services. Useful for expense records, reimbursement, bookkeeping or props.",
    useCases: [
      "Pet-care and supply expense documentation",
      "Reimbursement for a service animal's supplies",
      "Bookkeeping for a pet shop or groomer",
      "Replace a lost receipt for a return",
    ],
    faqs: [
      { question: "Can I add grooming or services?", answer: "Yes — add grooming, boarding or vet services as line items alongside products. Everything totals together." },
      { question: "Can I change the currency?", answer: "Yes, the builder supports multiple currencies and custom tax labels like VAT or GST." },
    ],
    defaults: {
      businessName: "Happy Tails Pet Supply",
      addressLine1: "330 Paw Print Plaza",
      addressLine2: "Austin, TX 78745",
      phone: "(512) 555-0173",
      taxLabel: "Sales Tax",
      taxRate: 8.25,
      footerMessage: "Give your pet a treat on us — thank you!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Dry Dog Food 30lb", quantity: 1, price: 54.99 },
        { id: id(), name: "Cat Litter 20lb", quantity: 1, price: 16.99 },
        { id: id(), name: "Chew Toy", quantity: 2, price: 7.99 },
        { id: id(), name: "Nail Trim Service", quantity: 1, price: 12.0 },
      ],
    },
  },
  {
    slug: "liquor-store-receipt",
    name: "Liquor Store Receipt",
    shortName: "Liquor Store",
    icon: "🍾",
    seoTitle: "Free Liquor Store Receipt Generator — Wine & Spirits Receipts",
    seoDescription:
      "Make an editable liquor store receipt with wine, beer and spirits plus tax. Download as PDF or PNG. Free liquor store receipt maker, sign in to export.",
    heading: "Liquor Store Receipt Generator",
    intro:
      "Create an editable liquor, wine or spirits store receipt with bottles, cases and applicable taxes. Useful for event expense records, bookkeeping or props.",
    useCases: [
      "Event and hospitality expense documentation",
      "Bookkeeping for a wine shop or bar",
      "Reimbursement records",
      "Film and TV props",
    ],
    faqs: [
      { question: "Can I add bottle deposits or excise tax?", answer: "Yes — add deposits as a line item and use the custom tax label and rate for any excise or sales tax that applies." },
      { question: "Can I itemize a mixed case?", answer: "Yes, list each bottle separately or add a single 'Mixed Case' line — whichever matches your need." },
    ],
    defaults: {
      businessName: "Vine & Barrel Wine & Spirits",
      addressLine1: "412 Cellar Street",
      addressLine2: "Chicago, IL 60614",
      phone: "(312) 555-0150",
      taxLabel: "Sales Tax",
      taxRate: 10.25,
      footerMessage: "Please enjoy responsibly. Must be 21+.",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Cabernet Sauvignon 750ml", quantity: 2, price: 18.99 },
        { id: id(), name: "Craft IPA 6-Pack", quantity: 1, price: 11.99 },
        { id: id(), name: "Bourbon Whiskey 750ml", quantity: 1, price: 34.99 },
      ],
    },
  },
  {
    slug: "car-rental-receipt",
    name: "Car Rental Receipt",
    shortName: "Car Rental",
    icon: "🚗",
    seoTitle: "Free Car Rental Receipt Generator — Rental Car Receipts",
    seoDescription:
      "Create an editable car rental receipt with daily rate, insurance, fuel and taxes. Download as PDF or PNG. Free rental car receipt maker, free account required.",
    heading: "Car Rental Receipt Generator",
    intro:
      "Make an editable rental car receipt with daily rates, insurance, fuel charges, fees and taxes. Ideal for travel expense reports, reimbursement or records.",
    useCases: [
      "Business travel expense reports",
      "Reimbursement for a rental on a trip",
      "Personal travel and trip records",
      "Replace a lost rental agreement receipt",
    ],
    faqs: [
      { question: "Can I add insurance and fees?", answer: "Yes — add daily insurance, young-driver fees, airport surcharges and a fuel charge as separate line items." },
      { question: "Can I show the number of rental days?", answer: "Yes, set the quantity to the number of days and the daily rate as the price; the line total multiplies automatically." },
    ],
    defaults: {
      businessName: "FreedomDrive Car Rental",
      addressLine1: "1 Airport Terminal Blvd",
      addressLine2: "Orlando, FL 32827",
      phone: "(407) 555-0128",
      taxLabel: "Tax & Fees",
      taxRate: 11.5,
      footerMessage: "Thank you for renting with us. Safe travels!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Midsize SUV — Daily Rate", quantity: 4, price: 62.0 },
        { id: id(), name: "Collision Damage Waiver (day)", quantity: 4, price: 19.99 },
        { id: id(), name: "Prepaid Fuel", quantity: 1, price: 48.0 },
      ],
    },
  },
  {
    slug: "airline-receipt",
    name: "Airline Ticket Receipt",
    shortName: "Airline",
    icon: "✈️",
    seoTitle: "Free Airline Receipt Generator — Flight Ticket Receipts",
    seoDescription:
      "Make an editable airline receipt with fare, taxes, baggage and seat fees. Download as PDF or PNG. Free flight receipt maker, watermark-free on your first one.",
    heading: "Airline Ticket Receipt Generator",
    intro:
      "Create an editable airline or flight ticket receipt with base fare, taxes, baggage, seat selection and booking fees. Perfect for travel expense reports and reimbursement.",
    useCases: [
      "Business travel expense reimbursement",
      "Proof of purchase for a flight you booked",
      "Personal trip records and budgeting",
      "Replace a lost e-ticket receipt",
    ],
    faqs: [
      { question: "Can I add baggage and seat fees?", answer: "Yes — add checked-bag, seat-selection and booking fees as separate line items along with the base fare and taxes." },
      { question: "Can I set a different currency?", answer: "Yes, the builder supports 10 currencies and a custom tax label for international fares." },
    ],
    defaults: {
      businessName: "SkyHigh Airlines",
      addressLine1: "Booking Ref: XK7P2Q",
      addressLine2: "JFK to LAX · Economy",
      phone: "",
      taxLabel: "Taxes & Carrier Fees",
      taxRate: 0,
      footerMessage: "Thank you for flying SkyHigh.",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Base Fare (JFK-LAX)", quantity: 1, price: 214.0 },
        { id: id(), name: "Taxes & Carrier Fees", quantity: 1, price: 58.4 },
        { id: id(), name: "Checked Bag", quantity: 1, price: 35.0 },
        { id: id(), name: "Seat Selection", quantity: 1, price: 22.0 },
      ],
    },
  },
  {
    slug: "dry-cleaning-receipt",
    name: "Dry Cleaning Receipt",
    shortName: "Dry Cleaning",
    icon: "👔",
    seoTitle: "Free Dry Cleaning Receipt Generator — Laundry Receipts",
    seoDescription:
      "Create an editable dry cleaning or laundry receipt with garments, services and tax. Download as PDF or PNG. Free dry cleaning receipt maker, sign in to save yours.",
    heading: "Dry Cleaning Receipt Generator",
    intro:
      "Make an editable dry cleaning or laundry service receipt with garments, pressing, alterations and pickup details. Useful for expense reports, reimbursement or records.",
    useCases: [
      "Business-attire and uniform expense records",
      "Reimbursement for work-related cleaning",
      "Bookkeeping for a cleaners or laundromat",
      "Replace a lost claim ticket receipt",
    ],
    faqs: [
      { question: "Can I list each garment?", answer: "Yes — add each shirt, suit or dress as a line item with its service price, or group them into one line." },
      { question: "Can I add a pickup date?", answer: "Yes, set the date on the receipt and add a note for the ready-by date in a message section." },
    ],
    defaults: {
      businessName: "Crisp & Clean Cleaners",
      addressLine1: "92 Press Street",
      addressLine2: "Seattle, WA 98109",
      phone: "(206) 555-0137",
      taxLabel: "Sales Tax",
      taxRate: 10.1,
      footerMessage: "Ready by 5 PM. Thank you!",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Dress Shirt — Laundered", quantity: 5, price: 3.5 },
        { id: id(), name: "Two-Piece Suit — Dry Clean", quantity: 1, price: 18.0 },
        { id: id(), name: "Hem Pants (alteration)", quantity: 1, price: 12.0 },
      ],
    },
  },
  {
    slug: "gym-membership-receipt",
    name: "Gym Membership Receipt",
    shortName: "Gym",
    icon: "🏋️",
    seoTitle: "Free Gym Membership Receipt Generator — Fitness Receipts",
    seoDescription:
      "Make an editable gym or fitness membership receipt with dues, classes and fees. Download as PDF or PNG. Free gym receipt maker, free to build and preview.",
    heading: "Gym Membership Receipt Generator",
    intro:
      "Create an editable gym or fitness studio membership receipt with monthly dues, class packs, personal training and initiation fees. Useful for HR wellness reimbursement or records.",
    useCases: [
      "Wellness and HR reimbursement documentation",
      "Personal budgeting and membership records",
      "Bookkeeping for a gym or studio",
      "Proof of payment for membership",
    ],
    faqs: [
      { question: "Can I show monthly dues?", answer: "Yes — add the monthly membership as a line item, plus any class packs, training sessions or fees." },
      { question: "Can I add a payment method?", answer: "Yes, the builder lets you show cash, card (with last four digits) or other payment methods." },
    ],
    defaults: {
      businessName: "Iron Peak Fitness",
      addressLine1: "55 Strength Avenue",
      addressLine2: "Phoenix, AZ 85004",
      phone: "(602) 555-0181",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "See you at the gym — let's go!",
      paymentMethod: "Credit Card",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Monthly Membership", quantity: 1, price: 49.99 },
        { id: id(), name: "Personal Training (3 sessions)", quantity: 3, price: 55.0 },
        { id: id(), name: "Initiation Fee", quantity: 1, price: 25.0 },
      ],
    },
  },
  {
    slug: "dental-receipt",
    name: "Dental Receipt",
    shortName: "Dental",
    icon: "🦷",
    seoTitle: "Free Dental Receipt Generator — Dentist Invoice & Receipt",
    seoDescription:
      "Create an editable dental receipt with procedures, codes and insurance adjustments. Download as PDF or PNG. Free dental receipt maker, sign in to export.",
    heading: "Dental Receipt Generator",
    intro:
      "Make an editable dental office receipt with cleanings, exams, x-rays, procedures and insurance adjustments. Useful for FSA/HSA reimbursement, tax records or bookkeeping.",
    useCases: [
      "FSA, HSA and insurance reimbursement",
      "Medical-expense tax documentation",
      "Bookkeeping for a dental practice",
      "Proof of payment for a procedure",
    ],
    faqs: [
      { question: "Can I show an insurance adjustment?", answer: "Yes — add a negative-priced line for the insurance adjustment or write-off so the patient balance is accurate." },
      { question: "Can I add procedure descriptions?", answer: "Yes, put the procedure name (and code, if you like) in each item line for a clear, professional receipt." },
    ],
    defaults: {
      businessName: "Bright Smile Dental",
      addressLine1: "210 Wellness Court",
      addressLine2: "San Jose, CA 95128",
      phone: "(408) 555-0164",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you. Your next visit is in 6 months.",
      paymentMethod: "Credit Card",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Adult Cleaning (Prophylaxis)", quantity: 1, price: 120.0 },
        { id: id(), name: "Periodic Exam", quantity: 1, price: 55.0 },
        { id: id(), name: "Bitewing X-rays", quantity: 1, price: 65.0 },
        { id: id(), name: "Insurance Adjustment", quantity: 1, price: -110.0 },
      ],
    },
  },
  {
    slug: "veterinary-receipt",
    name: "Veterinary Receipt",
    shortName: "Veterinary",
    icon: "🐶",
    seoTitle: "Free Veterinary Receipt Generator — Vet Bill & Invoice",
    seoDescription:
      "Make an editable veterinary receipt with exams, vaccines and treatments. Download as PDF or PNG. Free vet receipt maker, free account required.",
    heading: "Veterinary Receipt Generator",
    intro:
      "Create an editable veterinary clinic receipt with wellness exams, vaccines, medications and procedures. Useful for pet insurance claims, reimbursement or records.",
    useCases: [
      "Pet insurance claim documentation",
      "Reimbursement for a service animal's care",
      "Bookkeeping for a veterinary clinic",
      "Proof of payment for treatment",
    ],
    faqs: [
      { question: "Is this good for a pet insurance claim?", answer: "Many pet owners recreate a lost vet receipt for care their pet actually received. Always use it truthfully." },
      { question: "Can I list medications?", answer: "Yes — add exams, vaccines, medications and procedures as separate line items with their own prices." },
    ],
    defaults: {
      businessName: "Paws & Claws Veterinary",
      addressLine1: "1450 Animal Care Drive",
      addressLine2: "Denver, CO 80205",
      phone: "(303) 555-0156",
      taxLabel: "Tax",
      taxRate: 0,
      footerMessage: "Thank you for caring for your pet!",
      paymentMethod: "Credit Card",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Wellness Exam", quantity: 1, price: 65.0 },
        { id: id(), name: "Rabies Vaccine", quantity: 1, price: 32.0 },
        { id: id(), name: "Flea & Tick Prevention (6mo)", quantity: 1, price: 78.0 },
      ],
    },
  },
  {
    slug: "spa-receipt",
    name: "Spa Receipt",
    shortName: "Spa",
    icon: "💆",
    seoTitle: "Free Spa Receipt Generator — Massage & Spa Receipts",
    seoDescription:
      "Create an editable spa or massage receipt with treatments, add-ons and gratuity. Download as PDF or PNG. Free spa receipt maker, watermark-free on your first.",
    heading: "Spa Receipt Generator",
    intro:
      "Make an editable spa, massage or wellness receipt with treatments, add-ons, packages and gratuity. Useful for gift documentation, reimbursement or records.",
    useCases: [
      "Wellness reimbursement and gift records",
      "Bookkeeping for a spa or massage studio",
      "Proof of payment for a treatment",
      "Replace a lost service receipt",
    ],
    faqs: [
      { question: "Can I add gratuity?", answer: "Yes — the builder has a dedicated tip field, or you can add gratuity as its own line item." },
      { question: "Can I list packages?", answer: "Yes, add a spa package as one line or itemize each treatment — whatever you prefer." },
    ],
    defaults: {
      businessName: "Serenity Day Spa",
      addressLine1: "88 Tranquil Way",
      addressLine2: "Scottsdale, AZ 85251",
      phone: "(480) 555-0145",
      taxLabel: "Sales Tax",
      taxRate: 8.6,
      footerMessage: "Relax, recharge, return soon.",
      tip: 25,
      paperStyle: "modern",
      items: [
        { id: id(), name: "60-Min Swedish Massage", quantity: 1, price: 110.0 },
        { id: id(), name: "Aromatherapy Add-On", quantity: 1, price: 20.0 },
        { id: id(), name: "Express Facial", quantity: 1, price: 65.0 },
      ],
    },
  },
  {
    slug: "barber-receipt",
    name: "Barbershop Receipt",
    shortName: "Barber",
    icon: "💈",
    seoTitle: "Free Barbershop Receipt Generator — Haircut Receipts",
    seoDescription:
      "Make an editable barbershop or haircut receipt with services, products and tip. Download as PDF or PNG. Free barber receipt maker, sign in to save yours.",
    heading: "Barbershop Receipt Generator",
    intro:
      "Create an editable barbershop receipt with haircuts, beard trims, shaves, products and gratuity. Useful for expense records, bookkeeping or props.",
    useCases: [
      "Grooming expense records",
      "Bookkeeping for a barbershop or stylist",
      "Proof of payment for a service",
      "Tip and gratuity documentation",
    ],
    faqs: [
      { question: "Can I add a tip?", answer: "Yes — use the tip field or add gratuity as a line item; the total updates automatically." },
      { question: "Can I sell products on the same receipt?", answer: "Yes, add pomade, beard oil or other retail products alongside the services." },
    ],
    defaults: {
      businessName: "Sharp Edge Barbershop",
      addressLine1: "14 Main Street",
      addressLine2: "Brooklyn, NY 11211",
      phone: "(347) 555-0177",
      taxLabel: "Sales Tax",
      taxRate: 8.875,
      footerMessage: "Looking sharp! Thanks for stopping by.",
      tip: 8,
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Men's Haircut", quantity: 1, price: 30.0 },
        { id: id(), name: "Beard Trim", quantity: 1, price: 15.0 },
        { id: id(), name: "Beard Oil", quantity: 1, price: 12.0 },
      ],
    },
  },
  {
    slug: "towing-receipt",
    name: "Towing Receipt",
    shortName: "Towing",
    icon: "🚙",
    seoTitle: "Free Towing Receipt Generator — Tow Truck Service Receipts",
    seoDescription:
      "Create an editable towing receipt with hook-up, mileage and storage fees. Download as PDF or PNG. Free tow truck receipt maker, free to build and preview.",
    heading: "Towing Receipt Generator",
    intro:
      "Make an editable towing or roadside-assistance receipt with hook-up fees, mileage, storage and labor. Useful for insurance claims, reimbursement or records.",
    useCases: [
      "Insurance and roadside-assistance claims",
      "Reimbursement for a tow you paid for",
      "Bookkeeping for a towing company",
      "Proof of payment for service",
    ],
    faqs: [
      { question: "Can I bill mileage?", answer: "Yes — set the quantity to the number of miles and the per-mile rate as the price; the line total multiplies automatically." },
      { question: "Can I add storage fees?", answer: "Yes, add daily storage as its own line item along with the hook-up and labor charges." },
    ],
    defaults: {
      businessName: "Rapid Response Towing",
      addressLine1: "640 Recovery Road",
      addressLine2: "Houston, TX 77003",
      phone: "(713) 555-0190",
      taxLabel: "Tax",
      taxRate: 8.25,
      footerMessage: "Drive safe out there. Thank you!",
      paymentMethod: "Credit Card",
      paperStyle: "thermal",
      items: [
        { id: id(), name: "Hook-Up Fee", quantity: 1, price: 85.0 },
        { id: id(), name: "Mileage (mi)", quantity: 12, price: 4.5 },
        { id: id(), name: "After-Hours Surcharge", quantity: 1, price: 35.0 },
      ],
    },
  },
  {
    slug: "catering-receipt",
    name: "Catering Receipt",
    shortName: "Catering",
    icon: "🍽️",
    seoTitle: "Free Catering Receipt Generator — Event Catering Receipts",
    seoDescription:
      "Make an editable catering receipt with per-person pricing, staffing and gratuity. Download as PDF or PNG. Free catering receipt maker, sign in to export.",
    heading: "Catering Receipt Generator",
    intro:
      "Create an editable catering or event food receipt with per-person packages, staffing, rentals and gratuity. Useful for event expense reports, reimbursement or records.",
    useCases: [
      "Corporate event and party expense reports",
      "Reimbursement for catered meals",
      "Bookkeeping for a caterer or food business",
      "Proof of payment for an event",
    ],
    faqs: [
      { question: "Can I use per-person pricing?", answer: "Yes — set the quantity to the guest count and the per-person price; the line total multiplies for you." },
      { question: "Can I add a service charge?", answer: "Yes, add a staffing or service charge and a gratuity line in addition to the food packages." },
    ],
    defaults: {
      businessName: "Gather & Feast Catering",
      addressLine1: "300 Banquet Boulevard",
      addressLine2: "Nashville, TN 37203",
      phone: "(615) 555-0133",
      taxLabel: "Sales Tax",
      taxRate: 9.25,
      footerMessage: "Thank you for letting us cater your event!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Buffet Package (per guest)", quantity: 40, price: 28.0 },
        { id: id(), name: "Staffing & Service", quantity: 1, price: 250.0 },
        { id: id(), name: "Linen & Rentals", quantity: 1, price: 180.0 },
      ],
    },
  },
  {
    slug: "florist-receipt",
    name: "Florist Receipt",
    shortName: "Florist",
    icon: "💐",
    seoTitle: "Free Florist Receipt Generator — Flower Shop Receipts",
    seoDescription:
      "Create an editable florist or flower shop receipt with arrangements, delivery and tax. Download as PDF or PNG. Free florist receipt maker, free account required.",
    heading: "Florist Receipt Generator",
    intro:
      "Make an editable florist or flower shop receipt with arrangements, bouquets, vases and delivery. Useful for gift and event records, reimbursement or bookkeeping.",
    useCases: [
      "Gift and event flower expense records",
      "Reimbursement for office or client flowers",
      "Bookkeeping for a flower shop",
      "Proof of purchase for a delivery",
    ],
    faqs: [
      { question: "Can I add a delivery fee and card message?", answer: "Yes — add the delivery fee as a line item and include the gift-card message in a note section if you like." },
      { question: "Can I itemize an arrangement?", answer: "Yes, list each arrangement or a single custom bouquet line — both work." },
    ],
    defaults: {
      businessName: "Petal & Stem Florist",
      addressLine1: "27 Garden Lane",
      addressLine2: "Portland, OR 97205",
      phone: "(503) 555-0124",
      taxLabel: "Sales Tax",
      taxRate: 0,
      footerMessage: "Thank you — wishing you bloom and joy!",
      paperStyle: "modern",
      items: [
        { id: id(), name: "Seasonal Bouquet (Deluxe)", quantity: 1, price: 64.99 },
        { id: id(), name: "Glass Vase", quantity: 1, price: 14.99 },
        { id: id(), name: "Same-Day Delivery", quantity: 1, price: 12.0 },
      ],
    },
  },
];

export function getTemplate(slug: string): ReceiptTemplate | undefined {
  return [...TEMPLATES, ...BRAND_TEMPLATES].find((t) => t.slug === slug);
}

/** Every brand slug, for the Pro check below. Built once, not per call. */
const BRAND_SLUGS: ReadonlySet<string> = new Set(BRAND_TEMPLATES.map((t) => t.slug));

/**
 * Whether opening this template requires Pro.
 *
 * Only *brand* templates can be Pro. The generic ones — grocery-store,
 * restaurant, taxi and the rest — are the free builder, and gating them would
 * put the whole product behind the paywall.
 *
 * This lives here rather than in lib/brand-access.ts because answering it needs
 * to know which slugs are brands at all, and brand-access cannot import
 * lib/brands without a cycle. Asking `isFreeBrand` directly is the trap: it
 * answers "is this slug in the free fifty", which is false for every generic
 * template as well as for the Pro brands.
 */
export function templateNeedsPro(slug: string | null | undefined): boolean {
  if (!slug) return false;
  if (!BRAND_SLUGS.has(slug)) return false;
  return !isFreeBrand(slug);
}

/**
 * Build-time invariants for the free/Pro split.
 *
 * Three bugs shipped to production in one afternoon getting this right, and all
 * three had the same shape: a rule applied to one source of a value and not the
 * other. Each looked correct in the diff and was wrong on the live page.
 *
 *  - 96 hand-written brand titles never went near the generated title path, so
 *    they kept saying "Free X Receipt Generator" over a paid template.
 *  - Pro descriptions were written correctly and then had "Free to use."
 *    appended by the shared padding pool.
 *  - The Pro gate was applied with isFreeBrand(), which is false for every
 *    generic template too, so the entire free builder went behind the paywall.
 *
 * This module is imported by the brand pages and the builder, so it evaluates
 * during `next build` and a violation fails the build rather than reaching a
 * visitor. Cheap to run — a few hundred regex tests, once.
 */
const PROMISES_FREE = /\bfree\b/i;

{
  const problems: string[] = [];

  for (const t of TEMPLATES) {
    if (templateNeedsPro(t.slug)) {
      problems.push(`generic template "${t.slug}" is gated behind Pro — the free builder must stay free`);
    }
  }

  for (const b of BRAND_TEMPLATES) {
    if (!templateNeedsPro(b.slug)) continue;
    if (PROMISES_FREE.test(b.seoTitle)) {
      problems.push(`Pro brand "${b.slug}" title promises free: ${b.seoTitle}`);
    }
    if (PROMISES_FREE.test(b.seoDescription)) {
      problems.push(`Pro brand "${b.slug}" description promises free: ${b.seoDescription}`);
    }
    for (const f of b.faqs) {
      // Deliberately narrow, and anchored on the brand name.
      //
      // A Pro page legitimately says "the generic receipt builder is free" and
      // "around fifty brand templates are free to use" — both true. A blanket
      // /free/ test flags those, and a guard that cries wolf is a guard everyone
      // learns to skip. So: any "watermark-free" claim at all, or a "is free"
      // sitting close enough to the brand name to be about *this* template.
      const nearBrand = new RegExp(
        `${b.shortName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^.]{0,60}\\bis free\\b`,
        "i"
      );
      if (/watermark-free/i.test(f.answer) || nearBrand.test(f.answer)) {
        problems.push(`Pro brand "${b.slug}" FAQ promises free: ${f.question}`);
      }
    }
  }

  /**
   * No template may promise a "realistic" version of someone else's receipt.
   *
   * Added after the Aug 2026 external audit: "Create a realistic Walmart
   * receipt" reads as a promise to reproduce a specific company's document,
   * which invites fraudulent use and is the wording payment processors and ad
   * platforms act on. The replacement vocabulary is editable / sample /
   * template.
   *
   * Checked here rather than at the point each string is written because the
   * copy is assembled from variant pools — the same reason the free/Pro rule
   * above lives at assembly. Fixing a pool does not prove a hand-written title
   * elsewhere was fixed too, and 118 brands carry hand-written copy.
   *
   * "photorealistic" is deliberately not matched: it appears in
   * lib/comparisons.ts describing a competitor's own named feature, which is
   * reporting rather than a claim about us.
   */
  const IMITATION_CLAIM = /(?<!photo)\brealistic\b/i;
  const copyOf = (t: ReceiptTemplate): [string, string][] => [
    ["title", t.seoTitle],
    ["description", t.seoDescription],
    ["heading", t.heading],
    ["intro", t.intro],
    ...t.useCases.map((u, i): [string, string] => [`useCase[${i}]`, u]),
    ...t.faqs.map((f): [string, string] => [`faq "${f.question}"`, `${f.question} ${f.answer}`]),
  ];
  for (const t of [...TEMPLATES, ...BRAND_TEMPLATES]) {
    for (const [field, text] of copyOf(t)) {
      if (IMITATION_CLAIM.test(text)) {
        problems.push(`"${t.slug}" ${field} promises a realistic receipt: ${text.slice(0, 90)}`);
      }
    }
  }

  if (problems.length > 0) {
    throw new Error(
      `Template copy invariants violated (${problems.length}):\n  ` +
        problems.slice(0, 12).join("\n  ") +
        (problems.length > 12 ? `\n  …and ${problems.length - 12} more` : "")
    );
  }
}

/* -------------------------------------------------------------------------- */
/*  Sourced figures                                                           */
/* -------------------------------------------------------------------------- */

/**
 * A specific, sourced number for template pages that carry none of their own.
 *
 * Replacing vague claims with a figure attributed to the body that published it
 * is the single highest-lift GEO intervention measured, and 39 of the 42
 * templates had nothing extractable — no number, no publisher, no checked date.
 *
 * Two rules cover almost every receipt honestly:
 *
 *  - card-present sales are bound by the federal truncation rule, which caps
 *    what may be printed of a card number
 *  - receipts kept for a business expense are bound by the IRS substantiation
 *    threshold
 *
 * Assignment is by what the receipt actually involves, not by convenience.
 * medical, dental and veterinary templates are deliberately excluded: their
 * claims run through FSA/HSA and insurance rules we hold no source for, and
 * citing Pub 463 at them would be citing a document for something it does not
 * say. A missing figure is recoverable; a mis-attributed one is not.
 */
type FigureKind = "card-present" | "business-expense";

const FIGURE_BY_SLUG: Record<string, FigureKind> = {};
for (const slug of [
  "grocery-store", "retail-store", "clothing-store-receipt", "electronics-store-receipt",
  "hardware-store-receipt", "pet-store-receipt", "liquor-store-receipt", "pharmacy",
  "fast-food-receipt", "pizza-receipt", "coffee-shop", "bar", "salon", "barber-receipt",
  "spa-receipt", "dry-cleaning-receipt", "florist-receipt", "catering-receipt",
  "gym-membership-receipt",
]) FIGURE_BY_SLUG[slug] = "card-present";
for (const slug of [
  "hotel", "airline-receipt", "car-rental-receipt", "taxi", "parking", "gas-station",
  "invoice", "sales-receipt", "itemized-receipt", "proof-of-purchase", "cash-receipt",
  "auto-repair", "towing-receipt", "handyman-receipt", "cleaning-service-receipt",
  "tutoring-receipt", "childcare-receipt",
]) FIGURE_BY_SLUG[slug] = "business-expense";

export interface SourcedFigure {
  heading: string;
  body: string;
  sources: SourceId[];
}

/**
 * The figure section for a template, or null when it already cites its own
 * sources (restaurant, rent, donation) or has no rule we can honestly attach.
 *
 * The subject noun is the template's own, so the passage reads as being about
 * that receipt rather than as a block pasted onto every page.
 */
export function sourcedFigure(template: ReceiptTemplate): SourcedFigure | null {
  if (template.sources?.length) return null;
  const kind = FIGURE_BY_SLUG[template.slug];
  if (!kind) return null;

  const noun = template.shortName.toLowerCase();

  if (kind === "card-present") {
    return {
      heading: `What a ${noun} receipt may show of your card`,
      body:
        `Federal law limits this, and the limit is specific. {cite:fcra-1681c-g|15 U.S.C. § 1681c(g)} bars any business that accepts cards from printing more than the last five digits of the card number, or the expiry date at all, on the receipt handed to the cardholder at the point of sale. Most merchants print four digits rather than five, which is inside the rule.\n\n` +
        `It is why a genuine ${noun} receipt shows something like "VISA ****4821" and never the full number. A recreated receipt should follow the same convention — our builder takes only the last four digits for that reason. The rule governs the printed customer copy, so it is one of the few receipt details that is a legal requirement rather than a merchant's house style.`,
      sources: ["fcra-1681c-g"],
    };
  }

  return {
    heading: `Using a ${noun} receipt for an expense claim`,
    body:
      `The threshold is a number, not a judgement call. {cite:irs-pub-463|IRS Publication 463} requires documentary evidence — a receipt — for any lodging expense and for any other expense of $75 or more. Below $75, and for non-lodging costs, a written record may be accepted instead, though most employers set a stricter bar than the IRS does.\n\n` +
      `The same publication sets out what that evidence has to show: the amount, the date, the place, and the nature of the expense. A ${noun} receipt that records a total but not what was bought fails the last of those, which is why itemisation matters more on an expense claim than it does at the till. Check your employer's own policy as well — it binds you whether or not the IRS threshold does.`,
    sources: ["irs-pub-463"],
  };
}
