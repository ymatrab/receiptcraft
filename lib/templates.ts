import type { ReceiptTemplate } from "./types";
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
  {
    slug: "rent-receipt",
    name: "Rent Receipt",
    shortName: "Rent",
    icon: "🏠",
    seoTitle: "Free Rent Receipt Generator — Landlord Rent Receipt Maker",
    seoDescription:
      "Create a rent receipt for tenants and landlords. Show rent paid, period, property and payment method. Free PDF & PNG download, no sign-up.",
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
      "Make a cash payment receipt with amount, payer and purpose. Free cash receipt template — download as PDF or PNG instantly, no watermark.",
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
      "Create a donation receipt for nonprofits and charities. Show donor, amount and date for tax records. Free PDF & PNG download, no sign-up.",
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
      "Create a medical or clinic receipt for services and copays. Free receipt maker for HSA/FSA and insurance records — PDF & PNG, no sign-up.",
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
    seoTitle: "Free Childcare Receipt Generator — Babysitting Receipt Maker",
    seoDescription:
      "Create a childcare or babysitting receipt with hours, rate and dates. Free receipt maker for tax credits and reimbursement — PDF & PNG download.",
    heading: "Childcare Receipt Generator",
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
      "Create a handyman or contractor receipt with labor, materials and tax. Free receipt maker for home services — download as PDF or PNG, no sign-up.",
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
      "Create a tutoring receipt with sessions, hours and rate. Free receipt maker for tutors and parents — download as PDF or PNG, no watermark.",
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
      "Create a cleaning service receipt with services, hours and tax. Free receipt maker for house cleaners and clients — PDF & PNG download, no sign-up.",
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
];

export function getTemplate(slug: string): ReceiptTemplate | undefined {
  return [...TEMPLATES, ...BRAND_TEMPLATES].find((t) => t.slug === slug);
}
