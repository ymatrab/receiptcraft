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
      "Make a realistic grocery store receipt online in seconds. Add items, prices, tax and store details, then download as PDF or PNG. Free, no sign-up to start.",
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
      "Generate an itemized restaurant receipt with food items, tax and tip. Download instantly as PDF or PNG. Free restaurant bill maker, no sign-up to start.",
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
      "Create a cafe or coffee shop receipt online for free. Lattes, pastries, tax — live preview and instant PDF/PNG download with no sign-up to start.",
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
      "Make a taxi or rideshare trip receipt with fare, distance and tip. Free cab receipt maker with instant PDF & PNG download. No sign-up to start.",
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
      "Create a bar tab receipt with drinks, tax and tip. Free bar receipt maker with live preview — download as PDF or PNG, no sign-up to start.",
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
    seoTitle: "Free Auto Repair Receipt Generator — Mechanic Invoice Maker",
    seoDescription:
      "Create an auto repair shop receipt with parts, labor and tax. Free mechanic receipt maker — download as PDF or PNG, no sign-up to start.",
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
      "Create a rent receipt for tenants and landlords. Show rent paid, period, property and payment method. Free PDF & PNG download, no sign-up to start.",
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
      "Create a donation receipt for nonprofits and charities. Show donor, amount and date for tax records. Free PDF & PNG download, no sign-up to start.",
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
      "Create a medical or clinic receipt for services and copays. Free receipt maker for HSA/FSA and insurance records — PDF & PNG, no sign-up to start.",
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
      "Create a handyman or contractor receipt with labor, materials and tax. Free receipt maker for home services — download as PDF or PNG, no sign-up to start.",
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
      "Create a cleaning service receipt with services, hours and tax. Free receipt maker for house cleaners and clients — PDF & PNG download, no sign-up to start.",
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
      "Make a realistic fast food receipt online: burgers, combos, fries and drinks with tax. Download as PDF or PNG in seconds. Free, no sign-up to start.",
    heading: "Fast Food Receipt Generator",
    intro:
      "Create a realistic fast food or drive-thru receipt with combo meals, add-ons, fountain drinks and sales tax. Great for replacing a lost meal receipt, expense reports or design mockups.",
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
      "Create a realistic pizza receipt with pies, toppings, sides and delivery fees. Download as PDF or PNG instantly. Free pizza receipt maker, no sign-up to start.",
    heading: "Pizza Receipt Generator",
    intro:
      "Make a realistic pizzeria or pizza delivery receipt with custom pies, toppings, sides, drinks, delivery fees and tip. Perfect for reimbursements, records or props.",
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
      "Make a realistic clothing or apparel store receipt with items, sizes, sales tax and payment details. Download as PDF or PNG. Free, no sign-up to start.",
    heading: "Clothing Store Receipt Generator",
    intro:
      "Create a realistic clothing or fashion retail receipt with apparel items, quantities, discounts and sales tax. Useful for returns documentation, expense reports, bookkeeping or props.",
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
      "Create a realistic electronics store receipt with devices, accessories, warranties and sales tax. Download as PDF or PNG instantly. Free, no sign-up to start.",
    heading: "Electronics Store Receipt Generator",
    intro:
      "Make a realistic electronics or tech store receipt with devices, accessories, protection plans and sales tax. Ideal for warranty claims, insurance documentation, expense reports or props.",
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
      "Make a realistic hardware store receipt with tools, lumber, paint and supplies plus tax. Download as PDF or PNG. Free hardware receipt maker, no sign-up to start.",
    heading: "Hardware Store Receipt Generator",
    intro:
      "Create a realistic hardware or home-improvement store receipt with tools, building materials, paint and supplies. Great for contractor expense tracking, reimbursements, job costing or props.",
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
      "Create a realistic pet store receipt with food, supplies and grooming plus tax. Download as PDF or PNG instantly. Free pet store receipt maker, no sign-up to start.",
    heading: "Pet Store Receipt Generator",
    intro:
      "Make a realistic pet store receipt with pet food, toys, supplies and grooming services. Useful for expense records, reimbursement, bookkeeping or props.",
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
      "Make a realistic liquor store receipt with wine, beer and spirits plus tax. Download as PDF or PNG. Free liquor store receipt maker, no sign-up to start.",
    heading: "Liquor Store Receipt Generator",
    intro:
      "Create a realistic liquor, wine or spirits store receipt with bottles, cases and applicable taxes. Useful for event expense records, bookkeeping or props.",
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
      "Create a realistic car rental receipt with daily rate, insurance, fuel and taxes. Download as PDF or PNG. Free rental car receipt maker, no sign-up to start.",
    heading: "Car Rental Receipt Generator",
    intro:
      "Make a realistic rental car receipt with daily rates, insurance, fuel charges, fees and taxes. Ideal for travel expense reports, reimbursement or records.",
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
      "Make a realistic airline ticket receipt with fare, taxes, baggage and seat fees. Download as PDF or PNG. Free flight receipt maker, no sign-up to start.",
    heading: "Airline Ticket Receipt Generator",
    intro:
      "Create a realistic airline or flight ticket receipt with base fare, taxes, baggage, seat selection and booking fees. Perfect for travel expense reports and reimbursement.",
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
      "Create a realistic dry cleaning or laundry receipt with garments, services and tax. Download as PDF or PNG. Free dry cleaning receipt maker, no sign-up to start.",
    heading: "Dry Cleaning Receipt Generator",
    intro:
      "Make a realistic dry cleaning or laundry service receipt with garments, pressing, alterations and pickup details. Useful for expense reports, reimbursement or records.",
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
      "Make a realistic gym or fitness membership receipt with dues, classes and fees. Download as PDF or PNG. Free gym receipt maker, no sign-up to start.",
    heading: "Gym Membership Receipt Generator",
    intro:
      "Create a realistic gym or fitness studio membership receipt with monthly dues, class packs, personal training and initiation fees. Useful for HR wellness reimbursement or records.",
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
      "Create a realistic dental receipt with procedures, codes and insurance adjustments. Download as PDF or PNG. Free dental receipt maker, no sign-up to start.",
    heading: "Dental Receipt Generator",
    intro:
      "Make a realistic dental office receipt with cleanings, exams, x-rays, procedures and insurance adjustments. Useful for FSA/HSA reimbursement, tax records or bookkeeping.",
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
      "Make a realistic veterinary receipt with exams, vaccines and treatments. Download as PDF or PNG. Free vet receipt maker, no sign-up to start.",
    heading: "Veterinary Receipt Generator",
    intro:
      "Create a realistic veterinary clinic receipt with wellness exams, vaccines, medications and procedures. Useful for pet insurance claims, reimbursement or records.",
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
      "Create a realistic spa or massage receipt with treatments, add-ons and gratuity. Download as PDF or PNG. Free spa receipt maker, no sign-up to start.",
    heading: "Spa Receipt Generator",
    intro:
      "Make a realistic spa, massage or wellness receipt with treatments, add-ons, packages and gratuity. Useful for gift documentation, reimbursement or records.",
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
      "Make a realistic barbershop or haircut receipt with services, products and tip. Download as PDF or PNG. Free barber receipt maker, no sign-up to start.",
    heading: "Barbershop Receipt Generator",
    intro:
      "Create a realistic barbershop receipt with haircuts, beard trims, shaves, products and gratuity. Useful for expense records, bookkeeping or props.",
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
      "Create a realistic towing receipt with hook-up, mileage and storage fees. Download as PDF or PNG. Free tow truck receipt maker, no sign-up to start.",
    heading: "Towing Receipt Generator",
    intro:
      "Make a realistic towing or roadside-assistance receipt with hook-up fees, mileage, storage and labor. Useful for insurance claims, reimbursement or records.",
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
      "Make a realistic catering receipt with per-person pricing, staffing and gratuity. Download as PDF or PNG. Free catering receipt maker, no sign-up to start.",
    heading: "Catering Receipt Generator",
    intro:
      "Create a realistic catering or event food receipt with per-person packages, staffing, rentals and gratuity. Useful for event expense reports, reimbursement or records.",
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
      "Create a realistic florist or flower shop receipt with arrangements, delivery and tax. Download as PDF or PNG. Free florist receipt maker, no sign-up to start.",
    heading: "Florist Receipt Generator",
    intro:
      "Make a realistic florist or flower shop receipt with arrangements, bouquets, vases and delivery. Useful for gift and event records, reimbursement or bookkeeping.",
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
