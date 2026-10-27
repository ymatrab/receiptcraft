import type { LineItem, ReceiptData, ReceiptProfile, LayoutVariant } from "./types";

/**
 * Brand receipts rebuilt from what the real ones look like.
 *
 * GENERATED from research passes starting 2026-10-27 — edit here, not in
 * lib/brands.ts, for the brands listed. Brand templates were being chosen and
 * almost never downloaded (Walmart 123 picks / 0 downloads, PayPal 264 / 1),
 * and many had been modelled on some other business's receipt: BP on an Indian
 * fuel bill, Amazon on a UPS shipping slip, Chipotle on an Indian restaurant
 * ticket. Each entry below was rebuilt from public descriptions and photos of
 * that brand's own receipt; the sources are listed above each one. Layout,
 * labels and typical items follow the real receipt. Every number on them —
 * store, transaction, card, survey codes — is invented sample data, on purpose.
 *
 * A "replace" entry takes the place of the template's defaults outright (the
 * brand's logo is kept unless the entry sets its own), so nothing from the old,
 * wrong reference leaks through. A "merge" entry corrects only the fields it
 * names.
 */
export type BrandSpec = Partial<Omit<ReceiptData, "items">> & { items: Omit<LineItem, "id">[] };

export const BRAND_SPECS: Record<string, BrandSpec & { mode?: "merge" }> = {
  // paypal — was wrong-format. Sources:
  //   https://root.cern.ch/root/roottalk/roottalk05/1798.html
  //   https://lists.internet2.edu/sympa/arc/performingarts/2006-11/msg00042.html
  //   https://www.sparklabs.com/support/kb/article/retrieving-your-receipt-or-transaction-number/
  //   https://www.paypal.com/au/cshelp/article/how-will-i-know-if-virtual-terminal-successfully-processed-a-transaction-ts2230
  "paypal": {
    logoText: "PayPal",
    businessName: "",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    fontFamily: "sans",
    paperStyle: "minimal",
    ruleStyle: "solid",
    dividers: "minimal",
    headerAlign: "left",
    hideStoreLine: true,
    greeting: "You sent a payment to Northwind Outfitters",
    sections: [
      {
        rows: [
          {
            label: "Merchant",
            value: "Northwind Outfitters",
          },
          {
            label: "",
            value: "orders@northwind.example",
          },
          {
            label: "Transaction ID",
            value: "4KX19203LM7756231",
          },
          {
            label: "Transaction date",
            value: "Oct 27, 2026",
          },
        ],
      },
    ],
    itemStyle: "lined",
    itemHeader: {
      left: "Purchase details",
      right: "Amount",
    },
    items: [
      {
        name: "Trail Running Socks (3-pack)",
        quantity: 1,
        price: 24.0,
      },
      {
        name: "Insulated Water Bottle 24 oz",
        quantity: 1,
        price: 32.0,
      },
      {
        name: "Shipping",
        quantity: 1,
        price: 6.95,
      },
    ],
    taxLabel: "Tax",
    taxRate: 0,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    paymentInline: true,
    showBarcode: false,
    footerMessage: "This payment is eligible for PayPal Purchase Protection.",
    policyText: "Help & Contact | Security | Apps\nCopyright © 1999-2026 PayPal, Inc. All rights reserved.\nPayPal is located at 2211 N. First St., San Jose, CA 95131.",
    paperFinish: "email",
    showTaxRate: false,
  },
  // walmart — was wrong-format. Sources:
  //   https://querysprout.com/how-to-read-a-walmart-receipt/
  //   https://help.ibotta.com/hc/en-us/articles/360012110879-How-do-I-send-my-Walmart-receipt-
  //   https://www.hprt.com/Product/POS-PRINTERS/Receipt-Barcode-Guide.html
  //   https://tailride.so/blog/what-is-the-tax-number-on-your-walmart-receipt
  "walmart": {
    businessName: "",
    addressLine1: "479-555-0142 Mgr:DANA MORRIS",
    addressLine2: "406 S WALTON BLVD\nBENTONVILLE AR 72712",
    phone: "",
    hideStoreLine: true,
    greeting: "Give us feedback @ survey.walmart.com\nThank you! ID #: 7QX4BZ1C9TPL",
    sections: [
      {
        rows: [
          {
            value: "ST# 00100 OP# 009051 TE# 51 TR# 04271",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "lined",
    items: [
      {
        name: "GV 2% MLK GAL 007874235186",
        quantity: 1,
        price: 3.42,
        taxFlag: "F",
      },
      {
        name: "BANANAS 000000004011",
        quantity: 1,
        price: 1.36,
        taxFlag: "F",
      },
      {
        name: "GV LG WHT EGG 007874213620",
        quantity: 1,
        price: 4.47,
        taxFlag: "F",
      },
      {
        name: "BOUNTY SAS 6DR 003700074312",
        quantity: 1,
        price: 12.97,
      },
      {
        name: "TIDE PODS 42 003700087654",
        quantity: 1,
        price: 13.97,
      },
      {
        name: "GV WHT BREAD 007874237003",
        quantity: 1,
        price: 1.42,
        taxFlag: "F",
      },
      {
        name: "COKE 12PK 004900000634",
        quantity: 1,
        price: 7.48,
        taxFlag: "F",
      },
    ],
    taxLabel: "TAX 1",
    taxRate: 9.5,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    showBarcode: true,
    footerMessage: "# ITEMS SOLD 7\nTC# 4417 2093 5518 6624 0179",
    policyText: "Low Prices You Can Trust. Every Day.",
    paperStyle: "thermal",
    labels: {
      subtotal: "SUBTOTAL",
      change: "CHANGE DUE",
    },
    cardRows: [
      {
        value: "EFT DEBIT PAY FROM PRIMARY",
      },
      {
        label: "US DEBIT",
        value: "**** **** **** 4417 I 0",
      },
      {
        label: "APPROVAL #",
        value: "0A13CZ",
      },
      {
        label: "REF #",
        value: "529900415512",
      },
      {
        label: "TRANS ID -",
        value: "385297612048391",
      },
      {
        label: "VALIDATION -",
        value: "8E2P",
      },
      {
        label: "PAYMENT SERVICE -",
        value: "E",
      },
      {
        label: "AID",
        value: "A0000000980840",
      },
      {
        label: "TERMINAL #",
        value: "SC010127",
      },
      {
        value: "*Signature Not Required",
      },
    ],
  },
  // mcdonalds — was missing-key-details. Sources:
  //   https://www.mcdvoice.com/
  //   https://www.mcdvoice.com/Index.aspx?POSType=PieceMeal
  //   https://www.cake.me/portfolios/mcdvoice-com-survey
  //   https://video.pw.org/newshd1/unlocking-rewards-understanding-the-mcdvoicecom-survey-receipt-code.html
  "mcdonalds": {
    logoDataUrl: "",
    logoText: "",
    businessName: "McDonald's Restaurant #04829",
    addressLine1: "2005 W Division St",
    addressLine2: "Chicago, IL 60622",
    phone: "TEL# 312 555 0143",
    hideStoreLine: true,
    qrCode: false,
    showBarcode: false,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "qtycol",
    dividers: "minimal",
    greeting: "Survey Code:\n04829-04270-102726-14221-00047-6",
    sections: [
      {
        rows: [
          {
            label: "KS# 2",
            value: "Side1",
          },
          {
            value: "Order 47",
          },
        ],
      },
    ],
    items: [
      {
        name: "Big Mac Meal",
        quantity: 1,
        price: 10.99,
        modifiers: ["Med French Fries", "Med Coca-Cola"],
      },
      {
        name: "10 Pc. McNuggets",
        quantity: 1,
        price: 6.29,
        modifiers: ["Sweet N Sour"],
      },
      {
        name: "Baked Apple Pie",
        quantity: 1,
        price: 1.99,
      },
    ],
    taxLabel: "Tax",
    taxRate: 11.75,
    grandTotalLabel: "Take-Out Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    footerMessage: "We'd love to hear from you!\nTell us about your visit at www.mcdvoice.com\nand get a validation code for the offer\nprinted on this receipt.",
    policyText: "",
    paperStyle: "thermal",
    cardRows: [
      {
        label: "Cashless",
        value: "VISA ************4417",
      },
      {
        label: "Auth Code",
        value: "082214",
      },
      {
        label: "Seq #",
        value: "0417",
      },
    ],
    showTaxRate: false,
  },
  // domino-s-pizza — was missing-key-details. Sources:
  //   https://baymard.com/checkout-usability/benchmark/step-type/receipt/11377-dominos-pizza
  //   https://baymard.com/checkout-usability/benchmark/step-type/receipt/11480-dominos-pizza
  //   https://npmjs.com/package/ez-pizza-api
  //   https://github.com/erichilarysmithsr/node-dominos-pizza-api
  "domino-s-pizza": {
    businessName: "Domino's",
    addressLine1: "3220 Packard St",
    addressLine2: "Ann Arbor, MI 48108",
    phone: "(734) 555-0161",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    greeting: "DELIVERY",
    sections: [
      {
        rows: [
          {
            label: "Store #",
            value: "7342",
          },
          {
            label: "Customer",
            value: "JORDAN",
          },
          {
            label: "Phone",
            value: "(734) 555-0198",
          },
          {
            label: "Deliver to",
            value: "1420 Example Ave Apt 3",
          },
        ],
      },
    ],
    items: [
      {
        name: "Large (14\") Hand Tossed Pizza",
        quantity: 1,
        price: 17.99,
        modifiers: ["Robust Inspired Tomato Sauce", "Cheese", "Pepperoni"],
      },
      {
        name: "8-Piece Boneless Chicken",
        quantity: 1,
        price: 8.99,
        modifiers: ["BBQ"],
      },
      {
        name: "Parmesan Bread Bites",
        quantity: 1,
        price: 5.99,
      },
      {
        name: "2-Liter Coke",
        quantity: 1,
        price: 3.79,
      },
      {
        name: "Delivery Charge",
        quantity: 1,
        price: 4.99,
      },
    ],
    taxLabel: "Tax",
    taxRate: 6.0,
    tip: 4.0,
    grandTotalLabel: "Order Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    paymentInline: true,
    showBarcode: false,
    footerMessage: "The delivery charge is not a tip paid to your driver.",
    policyText: "Track your order at dominos.com",
    paperStyle: "thermal",
    orderNumber: "ORDER 58213",
    showTaxRate: false,
  },
  // amazon — was wrong-format. Sources:
  //   https://www.slashgear.com/1778351/amazon-receipt-how-to-print-view/
  //   https://michaelsforms.eastus2.cloudapp.azure.com/prod_image/43%20-%20Amazon.pdf
  //   https://fbs.admin.utah.edu/download/ushop/quickref/view-amazon-order-detail.pdf
  //   https://www.scribd.com/document/736524439/Amazon-Invoice-PDF
  "amazon": {
    businessName: "",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    paperStyle: "modern",
    fontFamily: "sans",
    headerAlign: "left",
    ruleStyle: "solid",
    hideStoreLine: true,
    greeting: "Final Details for Order #112-4829301-5539204\nPrint this page for your records.",
    sections: [
      {
        rows: [
          {
            label: "Order Placed:",
            value: "October 21, 2026",
          },
          {
            label: "Amazon.com order number:",
            value: "112-4829301-5539204",
          },
        ],
      },
      {
        title: "Shipped on October 22, 2026",
        rows: [
          {
            label: "Shipping Speed:",
            value: "FREE Prime Delivery",
          },
        ],
      },
      {
        title: "Shipping Address:",
        rows: [
          {
            value: "Jordan Sample",
          },
          {
            value: "123 Example St Apt 4",
          },
          {
            value: "Seattle, WA 98109",
          },
          {
            value: "United States",
          },
        ],
      },
    ],
    itemStyle: "lined",
    itemHeader: {
      left: "Items Ordered",
      right: "Price",
    },
    items: [
      {
        name: "Anker Portable Charger, 10000mAh",
        quantity: 1,
        price: 21.99,
        category: "Sold by: Amazon.com Services, Inc",
      },
      {
        name: "Amazon Basics AA Batteries, 48 Count",
        quantity: 2,
        price: 14.49,
        category: "Sold by: Amazon.com Services, Inc",
      },
      {
        name: "Stainless Steel Tumbler 40 oz",
        quantity: 1,
        price: 7.5,
        category: "Sold by: Example Home Goods",
      },
    ],
    taxLabel: "Estimated tax to be collected",
    taxRate: 9.75,
    grandTotalLabel: "Grand Total:",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    paymentInline: true,
    showBarcode: false,
    footerMessage: "",
    policyText: "Conditions of Use | Privacy Notice\n© 1996-2026, Amazon.com, Inc. or its affiliates",
    paperFinish: "email",
    showTaxRate: false,
  },
  // chipotle — was missing-key-details. Sources:
  //   https://www.chipotlefeedback.com/
  //   https://donotpay.com/learn/chipotle-feedback/
  //   https://dune-equipment-b39.notion.site/ChipotleFeedback-Your-Ultimate-Guide-to-Sharing-Your-Thoughts-683149a03a2c44d191b66b9d494613fd
  "chipotle": {
    businessName: "Chipotle Mexican Grill",
    addressLine1: "4250 Barranca Pkwy",
    addressLine2: "Irvine, CA 92604",
    phone: "(949) 555-0127",
    topBarcode: false,
    showCardAuth: false,
    showBarcode: false,
    fontFamily: "mono",
    itemStyle: "qtycol",
    ruleStyle: "dashed",
    greeting: "TO GO",
    sections: [
      {
        rows: [
          {
            label: "Server",
            value: "Alexis",
          },
        ],
      },
    ],
    items: [
      {
        name: "Chicken Burrito Bowl",
        quantity: 1,
        price: 11.15,
        modifiers: ["White Rice", "Black Beans", "Fresh Tomato Salsa", "Cheese", "Lettuce"],
      },
      {
        name: "Steak Burrito",
        quantity: 1,
        price: 12.55,
        modifiers: ["Brown Rice", "Pinto Beans", "Tomatillo-Red Chili Salsa", "Sour Cream"],
      },
      {
        name: "Guacamole",
        quantity: 1,
        price: 3.25,
      },
      {
        name: "Chips & Queso Blanco",
        quantity: 1,
        price: 5.25,
      },
      {
        name: "Large Drink",
        quantity: 1,
        price: 3.45,
      },
    ],
    taxLabel: "Tax",
    taxRate: 7.75,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    footerMessage: "Tell us about your visit at chipotlefeedback.com\nSurvey Code: 2026 1027 1422 0212 4417",
    policyText: "",
    paperStyle: "thermal",
    orderNumber: "ORDER 212",
    showTaxRate: false,
  },
  // bp — was wrong-format. Sources:
  //   https://consumered.georgia.gov/node/871
  //   https://tehama.gov/wp-content/uploads/2022/05/Gas-Complaint-Form.pdf
  //   https://bp.com/en_gb/united-kingdom/home/products-and-services/bpme.html
  //   https://kiplinger.com/personal-finance/credit-cards/use-points-to-pay-for-gas-at-bp-and-amoco
  "bp": {
    businessName: "bp",
    addressLine1: "11902 Westheimer Rd",
    addressLine2: "Houston, TX 77077",
    phone: "(281) 555-0186",
    register: "Pump #04",
    greeting: "WELCOME",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    sections: [
      {
        rows: [
          {
            label: "GALLONS",
            value: "13.462",
          },
          {
            label: "PRICE/GAL",
            value: "$2.899",
          },
        ],
      },
    ],
    items: [
      {
        name: "REGULAR",
        quantity: 1,
        price: 39.03,
      },
    ],
    taxLabel: "Tax",
    taxRate: 0,
    grandTotalLabel: "FUEL TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    showBarcode: false,
    footerMessage: "THANK YOU\nHAVE A NICE DAY",
    policyText: "Earn on every fill-up with bp rewards",
    paperStyle: "thermal",
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "AUTH#",
        value: "041872",
      },
      {
        label: "INVOICE",
        value: "018233",
      },
      {
        label: "AID",
        value: "A0000000031010",
      },
      {
        label: "Entry",
        value: "Chip",
      },
    ],
    fuelGrade: "Regular",
    hideSubtotal: true,
    showTaxRate: false,
  },
  // panda-express — was missing-key-details. Sources:
  //   https://www.pandaguestexperience.com/
  //   https://www.frequal.com/Perspectives/PandaExpressSurvey.html
  //   https://app.activedirectorypro.com/panda-express-survey-get-freebies-panda-express-feedback.html
  "panda-express": {
    businessName: "Panda Express #1342",
    addressLine1: "3355 E Colorado Blvd",
    addressLine2: "Pasadena, CA 91107",
    phone: "(626) 555-0175",
    fontFamily: "mono",
    itemStyle: "qtycol",
    ruleStyle: "dashed",
    greeting: "TO GO",
    sections: [
      {
        rows: [
          {
            label: "Cashier",
            value: "Kevin",
          },
        ],
      },
    ],
    items: [
      {
        name: "Plate",
        quantity: 1,
        price: 11.9,
        modifiers: ["Orange Chicken", "Beijing Beef", "Chow Mein"],
      },
      {
        name: "Bowl",
        quantity: 1,
        price: 10.1,
        modifiers: ["Broccoli Beef", "Fried Rice"],
      },
      {
        name: "Cream Cheese Rangoon (3)",
        quantity: 1,
        price: 2.5,
      },
      {
        name: "Large Drink",
        quantity: 1,
        price: 3.1,
      },
    ],
    taxLabel: "Tax",
    taxRate: 10.25,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showBarcode: false,
    footerMessage: "Tell us about your visit at\nwww.PandaGuestExperience.com\nSurvey Code: 1342-1027-2614-2201-1844-17",
    policyText: "",
    paperStyle: "thermal",
    orderNumber: "ORDER 118",
    showTaxRate: false,
  },
  // dunkin — was missing-key-details. Sources:
  //   https://dunkinrunsonyou.com/
  //   https://hip2save.com/tips/free-dunkin-donut-receipt-survery-tip/
  //   https://donotpay.com/learn/telldunkin/
  //   https://eathealthy365.com/a-faq-for-the-tell-dunkin-donut-survey/
  "dunkin": {
    businessName: "Dunkin'",
    addressLine1: "PC# 343918",
    addressLine2: "275 Boylston St, Boston, MA 02116",
    phone: "(617) 555-0133",
    fontFamily: "mono",
    itemStyle: "qtycol",
    ruleStyle: "dashed",
    greeting: "TAKE OUT",
    sections: [
      {
        rows: [
          {
            label: "Crew",
            value: "Mike",
          },
        ],
      },
    ],
    items: [
      {
        name: "LG Iced Coffee",
        quantity: 1,
        price: 3.79,
        modifiers: ["Cream", "Caramel Swirl"],
      },
      {
        name: "Bacon Egg & Cheese Croissant",
        quantity: 1,
        price: 5.49,
      },
      {
        name: "Glazed Donut",
        quantity: 2,
        price: 1.79,
      },
      {
        name: "MD Hot Latte",
        quantity: 1,
        price: 4.29,
        modifiers: ["Oat Milk"],
      },
    ],
    taxLabel: "Tax",
    taxRate: 7.0,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showBarcode: false,
    footerMessage: "Tell us how we did at dunkinrunsonyou.com\nSurvey Code: 3439 1810 2726 0814 72",
    policyText: "America Runs on Dunkin'.",
    paperStyle: "thermal",
    orderNumber: "ORDER 147",
    showTaxRate: false,
  },
  // chick-fil-a — was missing-key-details. Sources:
  //   https://www.chick-fil-a.com/customer-support/events-and-promotions/receipt-survey/i-cant-read-my-survey-code-on-my-receipt-how-can-i-take-the-survey
  //   https://www.mycfavisit.com/
  //   https://ringed-forest-abf.notion.site/Unlocking-Rewards-Your-Guide-to-the-Mycfavisit-Survey-f6250e3fe93341e1a2dd1e47d91570f1
  "chick-fil-a": {
    businessName: "Chick-fil-A Peachtree Corners",
    addressLine1: "5155 Peachtree Pkwy",
    addressLine2: "Peachtree Corners, GA 30092",
    phone: "(770) 555-0119",
    fontFamily: "mono",
    itemStyle: "qtycol",
    ruleStyle: "dashed",
    greeting: "CARRY OUT",
    sections: [
      {
        rows: [
          {
            label: "Name",
            value: "JORDAN",
          },
        ],
      },
    ],
    items: [
      {
        name: "#1 Chick-fil-A Chicken Sandwich Meal",
        quantity: 1,
        price: 10.39,
        modifiers: ["Medium Waffle Potato Fries", "Medium Lemonade"],
      },
      {
        name: "12 Ct Nuggets",
        quantity: 1,
        price: 7.15,
        modifiers: ["Chick-fil-A Sauce", "Polynesian Sauce"],
      },
      {
        name: "Large Lemonade",
        quantity: 1,
        price: 3.35,
      },
    ],
    taxLabel: "Tax",
    taxRate: 8.9,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showBarcode: false,
    footerMessage: "Tell us how we did at www.mycfavisit.com\nSerial #: 0418-2710-2614-2202-1744",
    policyText: "",
    paperStyle: "thermal",
    orderNumber: "ORDER 217",
    showTaxRate: false,
  },
  // taco-bell — was missing-key-details. Sources:
  //   https://github.com/jnicolow/receiptParse/blob/main/data/receipts/text/2b5287a5-8249-401e-8410-27f30dfb2695.txt
  //   https://github.com/jnicolow/receiptParse/blob/main/data/receipts/text/7c1bdf4b-25f8-44d6-949b-77e86ff18944.txt
  //   https://www.tellthebell.com/
  //   https://www.thepricer.org/taco-bell-menu-prices/
  "taco-bell": {
    businessName: "Taco Bell 004127",
    addressLine1: "1 Glen Bell Way",
    addressLine2: "Irvine, CA 92618",
    phone: "(949)863-4500",
    taxLabel: "Tax",
    taxRate: 7.75,
    grandTotalLabel: "Total",
    fontFamily: "share-tech-mono",
    ruleStyle: "none",
    headerAlign: "center",
    itemStyle: "qtycol",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "Order 214837",
          },
          {
            value: "Cashier: Maria G",
          },
        ],
      },
    ],
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    footerMessage: "Order Number 287\nTotal Items in Order: 4",
    policyText: "Start earning FREE rewards now.\nDownload the Taco Bell App &\nScan the barcode below to get your points\nTerms and exclusions apply\n\nGot a sec? Let's connect.\nTellthebell.com\nSurvey Code: 0000-1234-5678-0001",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "Crunchwrap Supreme",
        quantity: 1,
        price: 6.49,
        modifiers: ["No Tomato"],
      },
      {
        name: "Chzy Gordita Crunch",
        quantity: 1,
        price: 5.99,
      },
      {
        name: "Crunchy Taco",
        quantity: 2,
        price: 1.99,
      },
      {
        name: "Lg Baja Blast",
        quantity: 1,
        price: 3.19,
      },
    ],
    labels: {
      subtotal: "SubTotal",
    },
    cardRows: [
      {
        label: "Acct :",
        value: "XXXXXXXX4417",
      },
      {
        label: "Approval :",
        value: "06916D",
      },
      {
        label: "Entry Mode:",
        value: "Contactless",
      },
      {
        label: "APL:",
        value: "VISA CREDIT",
      },
      {
        label: "AID:",
        value: "A0000000031010",
      },
      {
        label: "TVR:",
        value: "0000000000",
      },
      {
        label: "TSI:",
        value: "0000",
      },
      {
        label: "CVM:",
        value: "NONE",
      },
    ],
    showTaxRate: false,
  },
  // dollar-tree — was missing-key-details. Sources:
  //   https://www.housedigest.com/2230237/big-changes-shoppers-notice-dollar-tree-2026/
  //   https://www.aol.com/lifestyle/dollar-tree-price-changes-2026-192510129.html
  //   https://www.wral.com/dollar-tree-hikes-prices-25-everything-will-cost-1-25/19998042/
  "dollar-tree": {
    logoText: "DOLLAR TREE",
    businessName: "Dollar Tree #04821",
    addressLine1: "500 Volvo Pkwy",
    addressLine2: "Chesapeake, VA 23320",
    phone: "(757) 321-5000",
    taxLabel: "TAX",
    taxRate: 6,
    fontFamily: "mono",
    ruleStyle: "dashed",
    headerAlign: "center",
    itemStyle: "qtycol",
    showCardAuth: true,
    paymentMethod: "Debit Card",
    cardLastFour: "2087",
    footerMessage: "THANK YOU FOR SHOPPING AT DOLLAR TREE",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "GIFT WRAP ROLL",
        quantity: 2,
        price: 1.25,
      },
      {
        name: "DISH SPONGES 3PK",
        quantity: 1,
        price: 1.25,
      },
      {
        name: "PAPER TOWEL 1 ROLL",
        quantity: 1,
        price: 1.25,
      },
      {
        name: "PARTY BALLOONS 12CT",
        quantity: 1,
        price: 1.5,
      },
      {
        name: "STORAGE BIN W/LID",
        quantity: 1,
        price: 3.0,
      },
      {
        name: "PLUSH THROW BLANKET",
        quantity: 1,
        price: 5.0,
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    showTaxRate: false,
  },
  // petsmart — was missing-key-details. Sources:
  //   https://www.petsmart.com/learning-center/treats-rewards/how-to-earn-petsmart-treats-rewards
  //   https://www.petsmart.com/learning-center/treats-rewards/redeeming-treats-rewards-points-a-step-by-step-guide
  //   https://www.loyal.guru/?p=18712
  //   https://abc13.com/post/dont-toss-your-receipt-compete-surveys-for-freebies/473178/
  "petsmart": {
    businessName: "PetSmart #0412",
    addressLine1: "19601 N 27th Ave",
    addressLine2: "Phoenix, AZ 85027",
    phone: "(623) 580-6100",
    taxLabel: "TAX",
    taxRate: 8.6,
    fontFamily: "mono",
    ruleStyle: "dashed",
    headerAlign: "center",
    itemStyle: "qtycol",
    showCardAuth: true,
    paymentMethod: "Credit Card",
    cardLastFour: "6038",
    sections: [
      {
        rows: [
          {
            label: "REG",
            value: "03",
          },
          {
            label: "TRANS",
            value: "4471",
          },
          {
            label: "CASHIER",
            value: "JORDAN",
          },
        ],
      },
    ],
    footerMessage: "TREATS MEMBER: XXXXXXX5521\nPOINTS EARNED TODAY: 1,330\nPOINTS BALANCE: 2,840",
    policyText: "Every 1,000 points = $2 in savings. Check your balance in the PetSmart app.",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "PRO PLAN ADULT CHKN/RICE 18LB",
        quantity: 1,
        price: 59.99,
      },
      {
        name: "TIDY CATS CLUMPING 35LB",
        quantity: 1,
        price: 22.99,
      },
      {
        name: "TEMPTATIONS CAT TREATS 16OZ",
        quantity: 1,
        price: 9.99,
      },
      {
        name: "TOP PAW RETRACT LEASH M",
        quantity: 1,
        price: 16.99,
      },
      {
        name: "KONG CLASSIC DOG TOY L",
        quantity: 1,
        price: 15.99,
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    showTaxRate: false,
  },
  // subway — was missing-key-details. Sources:
  //   https://frequal.com/Perspectives/SubwaySurveyForCookie.html
  //   https://www.thedailymeal.com/1551493/subway-receipt-survey-worth
  //   https://www.tastingtable.com/2110506/sandwich-chain-costs-too-much-subway
  //   https://menupedia.us/subway-menu/
  "subway": {
    businessName: "Subway #23816-0",
    addressLine1: "325 Sub Way",
    addressLine2: "Milford, CT 06461",
    phone: "(203) 877-4281",
    taxLabel: "Tax",
    taxRate: 7.35,
    fontFamily: "mono",
    ruleStyle: "dashed",
    headerAlign: "center",
    itemStyle: "qtycol",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Cashier",
            value: "Dana",
          },
          {
            value: "Dine In",
          },
        ],
      },
    ],
    paymentMethod: "Credit Card",
    cardLastFour: "9015",
    showCardAuth: true,
    footerMessage: "Thank you for choosing Subway!",
    policyText: "Tell us about your visit at subwaylistens.com\nand get a FREE cookie on your next visit.\nSurvey Code: 0000-1234-5678",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "FTLNG Italian B.M.T.",
        quantity: 1,
        price: 9.99,
        modifiers: ["Italian Herbs & Cheese", "Provolone", "Toasted", "Lettuce, Tomato, Onion", "Mayo"],
      },
      {
        name: "6\" Oven Roasted Turkey",
        quantity: 1,
        price: 7.29,
        modifiers: ["Hearty Multigrain", "American", "Spinach, Cucumber", "Honey Mustard"],
      },
      {
        name: "Chips",
        quantity: 1,
        price: 1.99,
      },
      {
        name: "21oz Fountain Drink",
        quantity: 1,
        price: 2.49,
      },
    ],
    orderNumber: "ORDER 58",
    showTaxRate: false,
  },
  // kfc — was missing-key-details. Sources:
  //   https://www.mykfcexperience.com/
  //   https://menupedia.us/kfc-menu/
  //   https://www.thedailymeal.com/2094131/major-kfc-changes-coming-2026
  //   https://eathealthy365.com/complete-kfc-menu-price-list/
  "kfc": {
    businessName: "KFC #G104227",
    addressLine1: "1441 Gardiner Ln",
    addressLine2: "Louisville, KY 40213",
    phone: "(502) 874-8100",
    taxLabel: "Tax",
    taxRate: 6.0,
    fontFamily: "mono",
    ruleStyle: "dashed",
    headerAlign: "center",
    itemStyle: "qtycol",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Cashier",
            value: "Tasha",
          },
          {
            value: "CARRY OUT",
          },
        ],
      },
    ],
    paymentMethod: "Debit Card",
    cardLastFour: "3362",
    showCardAuth: true,
    footerMessage: "Thank you for choosing KFC!",
    policyText: "Tell us about your visit at\nwww.mykfcexperience.com\nSurvey Code: CN1-0000-1234-5678\nValidation Code: ______________",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "8 PC Meal",
        quantity: 1,
        price: 29.99,
        modifiers: ["Original Recipe", "LG Mashed Potatoes & Gravy", "LG Cole Slaw", "4 Biscuits"],
      },
      {
        name: "Famous Bowl",
        quantity: 1,
        price: 6.49,
      },
      {
        name: "LG Drink",
        quantity: 1,
        price: 2.99,
        modifiers: ["Pepsi"],
      },
    ],
    orderNumber: "ORDER 142",
    showTaxRate: false,
  },
  // burger-king — was missing-key-details. Sources:
  //   https://www.mybkexperience.com/
  //   https://github.com/EnesYilmazcode/FreeBee/blob/main/research/RECEIPT-SURVEYS.md
  //   https://menupedia.us/burger-king-menu/
  //   https://www.mashed.com/2243596/burger-king-whopper-cost-2000-vs-2026/
  "burger-king": {
    businessName: "Burger King #21874",
    addressLine1: "5505 Blue Lagoon Dr",
    addressLine2: "Miami, FL 33126",
    phone: "(305) 378-3535",
    taxLabel: "Tax",
    taxRate: 7.0,
    fontFamily: "mono",
    ruleStyle: "dashed",
    headerAlign: "center",
    itemStyle: "qtycol",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Cashier",
            value: "Luis",
          },
          {
            value: "DRIVE THRU",
          },
        ],
      },
    ],
    paymentMethod: "Credit Card",
    cardLastFour: "7720",
    showCardAuth: true,
    footerMessage: "Thank you for choosing Burger King",
    policyText: "WE WANT TO HEAR FROM YOU!\nGo to www.mybkexperience.com\nwithin 2 days and get a validation code\nfor a FREE WHOPPER with purchase of same.\nSurvey Code: 21874-00043-1027-0000\nValidation Code: ______________",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "Whopper Meal M",
        quantity: 1,
        price: 11.49,
        modifiers: ["Med French Fries", "Med Coca-Cola", "No Onion"],
      },
      {
        name: "$5 Your Way Meal",
        quantity: 1,
        price: 5.0,
        modifiers: ["Whopper Jr", "4pc Nuggets", "Sm Fries", "Sm Sprite"],
      },
      {
        name: "Hershey's Sundae Pie",
        quantity: 1,
        price: 2.79,
      },
    ],
    orderNumber: "ORDER 43",
    showTaxRate: false,
  },
  // apple-store — was wrong-format. Sources:
  //   https://www.apple.com/legal/sales-support/sales-policies/retail/
  //   https://discussions.apple.com/thread/255008272
  //   https://discussions.apple.com/thread/256131229
  //   https://www.scribd.com/document/619737592/111Apple-Store
  "apple-store": {
    businessName: "Apple Fifth Avenue",
    addressLine1: "767 Fifth Ave",
    addressLine2: "New York, NY 10153",
    phone: "(212) 336-1440",
    website: "apple.com/retail/fifthavenue",
    taxLabel: "Sales Tax",
    taxRate: 8.875,
    grandTotalLabel: "Total",
    fontFamily: "inter",
    ruleStyle: "solid",
    headerAlign: "center",
    itemStyle: "lined",
    itemHeader: {
      left: "Item",
      right: "Price",
    },
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Specialist",
            value: "James",
          },
          {
            label: "Return by",
            value: "{{date+14}}",
          },
        ],
      },
    ],
    paymentMethod: "Mobile Payment",
    cardLastFour: "8124",
    paymentInline: true,
    dividers: "minimal",
    footerMessage: "Thank you for shopping at Apple.",
    policyText: "Products may be returned within 14 days of receipt with this receipt. See apple.com/shop/help/returns_refund for details.",
    showBarcode: false,
    paperStyle: "modern",
    items: [
      {
        name: "iPhone 17 Pro 256GB Cosmic Orange",
        quantity: 1,
        price: 1099.0,
        sku: "MG0X4LL/A",
      },
      {
        name: "AppleCare+ for iPhone 17 Pro",
        quantity: 1,
        price: 199.0,
        sku: "S9999LL/A",
      },
      {
        name: "AirPods Pro 3",
        quantity: 1,
        price: 249.0,
        sku: "MXX02LL/A",
      },
      {
        name: "USB-C Charge Cable (1 m)",
        quantity: 1,
        price: 19.0,
        sku: "MXX12AM/A",
      },
    ],
    paperFinish: "email",
    showTaxRate: false,
  },
  // home-depot — was missing-key-details. Sources:
  //   https://github.com/jnicolow/receiptParse/blob/main/data/receipts/text/1dfc45f4-d53e-458a-84fb-c6ab365dcaf3.txt
  //   https://github.com/ShakilKabir/Receipt/blob/main/combined.txt
  //   https://www.hunker.com/13414941/how-to-read-my-home-depot-receipt
  //   https://github.com/EnesYilmazcode/FreeBee/blob/main/research/RECEIPT-SURVEYS.md
  "home-depot": {
    businessName: "The Home Depot",
    greeting: "How doers get more done.",
    addressLine1: "2455 PACES FERRY RD",
    addressLine2: "ATLANTA, GA 30339",
    phone: "(770)433-8211",
    taxLabel: "SALES TAX",
    taxRate: 8.9,
    fontFamily: "mono",
    ruleStyle: "none",
    headerAlign: "center",
    itemStyle: "qtycol",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "0121 00034 58210",
            value: "{{date+0}}",
          },
          {
            value: "SALE CASHIER TOM",
          },
        ],
      },
    ],
    paymentMethod: "Credit Card",
    cardLastFour: "5509",
    showCardAuth: false,
    footerMessage: "RETURN POLICY DEFINITIONS\nPOLICY ID  DAYS  POLICY EXPIRES ON\nA          90    90 DAYS AFTER PURCHASE",
    policyText: "DID WE NAIL IT?\nTake a short survey for a chance TO WIN\nA $5,000 HOME DEPOT GIFT CARD\nOpine en Espanol\nwww.homedepot.com/survey\nUser ID: H89 000000 000000\nPASSWORD: 00000 000000\nEntries must be completed within 14 days of purchase. Entrants must be 18 or older to enter. See complete rules on website. No purchase necessary.",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "2X4-8FT STUD <A>",
        quantity: 12,
        price: 3.98,
        sku: "000000101012",
      },
      {
        name: "DCD771C2 <A>",
        quantity: 1,
        price: 99.0,
        sku: "000000771202",
      },
      {
        name: "BEHR ULT 1G <A>",
        quantity: 1,
        price: 41.98,
        sku: "000000550101",
      },
      {
        name: "2090 1.88 TAPE <A>",
        quantity: 2,
        price: 7.97,
        sku: "000000209018",
      },
      {
        name: "DROP CLOTH 9X12 <A>",
        quantity: 1,
        price: 8.98,
        sku: "000000912012",
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    cardRows: [
      {
        value: "XXXXXXXXXXXX5509 VISA",
      },
      {
        label: "AUTH CODE",
        value: "030120/9521209",
      },
      {
        value: "Chip Read",
      },
      {
        label: "AID",
        value: "A0000000031010",
      },
      {
        value: "VISA CREDIT",
      },
    ],
    skuFirst: true,
    showTaxRate: false,
  },
  // southwest-airlines — was wrong-format. Sources:
  //   https://htmlscript.auburn.edu/academic/education/ed/documents_uploaded/graduatetravelawards/jaw0110bt2020020318064583807.pdf
  //   https://htmlscript.auburn.edu/academic/education/ed/documents_uploaded/travelrequests/CGS0013-2024041249936.pdf
  //   https://nata.aero/icymi-irs-announces-2026-fet-rates/
  //   https://travelnoire.com/southwest-airlines-new-fare-bundles
  "southwest-airlines": {
    businessName: "Southwest Airlines",
    addressLine1: "P.O. Box 36647",
    addressLine2: "Dallas, TX 75235",
    phone: "1-800-435-9792",
    website: "southwest.com",
    greeting: "Your reservation is confirmed. Below you'll find your itinerary and trip receipt.",
    hideStoreLine: true,
    fontFamily: "open-sans",
    headerAlign: "left",
    ruleStyle: "solid",
    sections: [
      {
        title: "Trip summary",
        rows: [
          {
            label: "Confirmation #",
            value: "QX7K2P",
          },
          {
            label: "Passenger",
            value: "Alex Sample",
          },
          {
            label: "Rapid Rewards #",
            value: "00000000000",
          },
          {
            label: "Ticket #",
            value: "5260000123456",
          },
        ],
      },
      {
        title: "Flight 1: DAL to DEN",
        rows: [
          {
            label: "Date",
            value: "{{date+21}}",
          },
          {
            label: "Flight #",
            value: "1734 - Nonstop",
          },
          {
            label: "Departs",
            value: "DAL 07:05 AM Dallas (Love)",
          },
          {
            label: "Arrives",
            value: "DEN 08:15 AM Denver",
          },
          {
            label: "Fare",
            value: "Choice",
          },
        ],
      },
      {
        title: "Flight 2: DEN to DAL",
        rows: [
          {
            label: "Date",
            value: "{{date+25}}",
          },
          {
            label: "Flight #",
            value: "2218 - Nonstop",
          },
          {
            label: "Departs",
            value: "DEN 05:40 PM Denver",
          },
          {
            label: "Arrives",
            value: "DAL 08:50 PM Dallas (Love)",
          },
          {
            label: "Fare",
            value: "Choice",
          },
        ],
      },
    ],
    itemStyle: "lined",
    itemHeader: {
      left: "Air - QX7K2P",
      right: "",
    },
    taxLabel: "Taxes & fees",
    taxRate: 0,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "7731",
    paymentInline: true,
    footerMessage: "Fare Rules: Changes to this itinerary may result in a fare increase. Any remaining travel funds can be used toward a future flight for the passenger named on the ticket.",
    policyText: "Check in on Southwest.com or the Southwest app 24 hours before departure. Arrive at the gate 30 minutes before departure.",
    showBarcode: false,
    paperStyle: "modern",
    items: [
      {
        name: "Base Fare",
        quantity: 1,
        price: 241.86,
      },
      {
        name: "U.S. Transportation Tax",
        quantity: 1,
        price: 18.14,
      },
      {
        name: "U.S. 9/11 Security Fee",
        quantity: 1,
        price: 11.2,
      },
      {
        name: "U.S. Flight Segment Tax",
        quantity: 1,
        price: 10.6,
      },
      {
        name: "U.S. Passenger Facility Chg",
        quantity: 1,
        price: 9.0,
      },
    ],
    paperFinish: "email",
    showTaxRate: false,
  },
  // wendy-s — was missing-key-details. Sources:
  //   https://donotpay.com/learn/talktowendys/
  //   https://www.wendyswantstoknow.com/
  //   https://www.franchising.com/news/20261019_fresh_beef_fresh_deal_wendys_debuts_the_799_daves_single_combo_meal.html
  //   https://www.nrn.com/quick-service/wendy-s-targets-singles-with-1-burger-deal
  "wendy-s": {
    businessName: "Wendy's #11482",
    addressLine1: "1 Dave Thomas Blvd",
    addressLine2: "Dublin, OH 43017",
    phone: "(614) 764-3100",
    taxLabel: "Tax",
    taxRate: 8.0,
    fontFamily: "mono",
    ruleStyle: "dashed",
    headerAlign: "center",
    itemStyle: "qtycol",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Restaurant #",
            value: "11482",
          },
          {
            label: "Cashier",
            value: "Kim",
          },
          {
            value: "DRIVE THRU",
          },
        ],
      },
    ],
    paymentMethod: "Credit Card",
    cardLastFour: "1846",
    showCardAuth: true,
    footerMessage: "Thank you for choosing Wendy's!",
    policyText: "Tell us about your visit at\nwww.wendyswantstoknow.com\nYou'll need the restaurant number, date and time from this receipt.\nValidation Code: ______________",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "Dave's Single Combo",
        quantity: 1,
        price: 7.99,
        modifiers: ["Sm Hot & Crispy Fries", "Sm Coca-Cola"],
      },
      {
        name: "10 PC Spicy Nuggets",
        quantity: 1,
        price: 5.99,
      },
      {
        name: "Med Chocolate Frosty",
        quantity: 1,
        price: 2.99,
      },
    ],
    orderNumber: "ORDER 66",
    showTaxRate: false,
  },
  // 7-eleven — was close. Sources:
  //   https://medium999.blogspot.com/2018/04/i-spent-711-and-at-7-eleven-at-711-am.html (photo: https://i.redd.it/asym12evzuu01.jpg — Denver CO 7-Eleven receipt, 2018)
  //   https://www.flickr.com/photos/target_man_2000/14451931159 (California 7-Eleven receipt photo, 2014)
  //   https://receiptbaker.com/examples/7-eleven-receipt (secondary, template site)
  "7-eleven": {
    businessName: "7-Eleven",
    logoText: "7-ELEVEN",
    addressLine1: "2201 W Airport Fwy",
    addressLine2: "IRVING TX 75062",
    phone: "9725550147",
    taxLabel: "High Tax",
    taxRate: 8.25,
    register: "STORE#: 41862",
    hideTitle: true,
    greeting: "THANKS FOR SHOPPING 7-ELEVEN",
    sections: [
      {
        rows: [
          {
            label: "UNIT ID",
            value: "00094186201",
          },
          {
            label: "TERM ID",
            value: "21",
          },
        ],
      },
      {
        rows: [
          {
            value: "--== SALE TRANSACTION ==--",
          },
        ],
      },
    ],
    sectionStyle: "flow",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    grandTotalLabel: "TOTAL DUE",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    footerMessage: "THANKS FOR SHOPPING HERE\nWE WILL SEE YOU SOON",
    policyText: "CUSTOMER AGREES TO PAY THE ABOVE TOTAL AMOUNT ACCORDING TO THE CARD HOLDERS AGREEMENT",
    showBarcode: false,
    paperStyle: "thermal",
    items: [
      {
        name: "PaperHotCupLgSel20OZ",
        quantity: 1,
        price: 2.49,
      },
      {
        name: "BigBiteQtrLbAllBf",
        quantity: 1,
        price: 2.99,
      },
      {
        name: "LaysClassic2.625z",
        quantity: 1,
        price: 2.29,
      },
      {
        name: "MnstrEnrgyOrig16z",
        quantity: 2,
        price: 3.29,
      },
      {
        name: "7SelOrigBfJrky3.25z",
        quantity: 1,
        price: 7.49,
      },
      {
        name: "SlurpeeLg30oz",
        quantity: 1,
        price: 2.19,
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    cardRows: [
      {
        label: "ACCT#:",
        value: "XXXX XXXX XXXX 4417",
      },
      {
        label: "APPROVAL#:",
        value: "00-418236",
      },
      {
        label: "TERM# :",
        value: "0102 01",
      },
      {
        label: "REF# :",
        value: "000418236502017",
      },
      {
        value: "00 - APPROVED",
      },
    ],
    showTaxRate: false,
  },
  // aldi — was missing-key-details. Sources:
  //   https://www.the-sun.com/money/11886850/aldi-double-tax-manager-grocery-receipt/ (photo of a Chicago ALDI receipt, June 2024)
  //   https://www.thebillfold.com/2016/04/show-us-your-grocery-receipts-part-eleven-trader-joes-and-aldi/ (two US ALDI receipt photos, 2016)
  //   https://www.thebillfold.com/2016/03/show-us-your-grocery-receipts-part-eight-market-district-aldi-trader-joes-and-hannaford/
  "aldi": {
    businessName: "ALDI",
    logoText: "ALDI",
    addressLine1: "4120 Nolensville Pike",
    addressLine2: "Nashville, TN 37211",
    phone: "",
    hideTitle: true,
    greeting: "www.ALDI.us",
    hideStoreLine: true,
    register: "",
    taxLabel: "B:Taxable",
    taxRate: 6.25,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "asterisk",
    itemStyle: "lined",
    grandTotalLabel: "T O T A L",
    paymentMethod: "Debit Card",
    cardLastFour: "6052",
    showCardAuth: false,
    footerMessage: "Like ALDI? Tell ALDI!\nTell us how we did at\nwww.tellaldi.us\nEnter the drawing for a chance\nto win a $100 ALDI gift card.\nMust be 18 years old to enter.\nNo purchase necessary.",
    policyText: "Sign up for ALDI emails and save!\nwww.aldi.us/signup",
    showBarcode: false,
    paperStyle: "thermal",
    items: [
      {
        name: "416318 Whole Milk 1/2 Gal",
        quantity: 1,
        price: 2.29,
      },
      {
        name: "702214 Large White Eggs 12ct",
        quantity: 1,
        price: 2.79,
      },
      {
        name: "Bananas",
        quantity: 2.43,
        price: 0.33,
        unit: "lb",
      },
      {
        name: "388139 Shredded Parmesan",
        quantity: 1,
        price: 2.19,
      },
      {
        name: "412907 Wide Pan Wheat Brd",
        quantity: 1,
        price: 1.89,
      },
      {
        name: "701552 Strw/Blue Grk Yog",
        quantity: 4,
        price: 0.89,
      },
      {
        name: "515006 Fresh 80% Lean Bf",
        quantity: 1,
        price: 5.79,
      },
      {
        name: "399685 Dish Detergent",
        quantity: 1,
        price: 2.09,
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    cardRows: [
      {
        value: "***************6052 PIN",
      },
      {
        label: "Ref/Seq #",
        value: "004182",
      },
      {
        label: "Auth #",
        value: "418236",
      },
      {
        label: "AID",
        value: "A0000000980840",
      },
      {
        label: "TSI",
        value: "0000  ARC 000  EntryMode 07",
      },
      {
        value: "++APPROVED++",
      },
    ],
  },
  // publix — was close. Sources:
  //   https://www.scribd.com/document/902181201/2023-03-14-0852am-PublixReceipt (full Publix receipt, Decatur GA, 2023)
  //   https://www.thedailymeal.com/1261545/tips-first-trip-publix/ (photo of a Weston FL Publix receipt)
  //   https://receiptbaker.com/examples/publix-receipt (secondary, template site)
  "publix": {
    businessName: "Oak Hollow Commons",
    addressLine1: "3180 Peachtree Pkwy",
    addressLine2: "Suwanee, GA 30024",
    phone: "770-555-0136",
    manager: "Store Manager: Dana Whitfield",
    hideTitle: true,
    topBarcode: true,
    showBarcode: false,
    register: "Your cashier was Lena",
    taxLabel: "Food Tax",
    taxRate: 2.0,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "lined",
    grandTotalLabel: "Grand Total",
    paymentMethod: "Debit Card",
    cardLastFour: "6723",
    showCardAuth: false,
    footerMessage: "Savings Summary\nSpecial Price Savings 5.99\n**********************************\n*    Your Savings at Publix     *\n*            5.99               *\n**********************************",
    policyText: "Join the Publix family!\nApply today at apply.publix.jobs.\nWe're an equal opportunity employer.\n\nPublix Super Markets, Inc.",
    paperStyle: "thermal",
    items: [
      {
        name: "PUBLIX WHOLE MILK GAL",
        quantity: 1,
        price: 4.79,
      },
      {
        name: "GW ORG BABY SPINACH 5OZ",
        quantity: 1,
        price: 4.29,
      },
      {
        name: "PUB SUB CHKN TNDR WHL",
        quantity: 1,
        price: 11.99,
      },
      {
        name: "OREO DOUBLE STF 15.35OZ",
        quantity: 2,
        price: 5.99,
        discount: 5.99,
      },
      {
        name: "TOSTITOS SCOOPS 10OZ",
        quantity: 1,
        price: 5.79,
      },
      {
        name: "BANANAS",
        quantity: 1.84,
        price: 0.69,
        unit: "lb",
      },
    ],
    labels: {
      subtotal: "Order Total",
    },
    cardRows: [
      {
        value: "PRESTO!",
      },
      {
        label: "Trace #:",
        value: "418236",
      },
      {
        label: "Reference #:",
        value: "0102418236",
      },
      {
        label: "Acct #:",
        value: "XXXXXXXXXXXX6723",
      },
      {
        value: "Debit Purchase FROM CHECKING",
      },
      {
        label: "Auth #:",
        value: "418236",
      },
      {
        value: "A0000000980840  US DEBIT",
      },
      {
        label: "Entry Method:",
        value: "Chip Read",
      },
    ],
    showTaxRate: false,
  },
  // kroger — was missing-key-details. Sources:
  //   https://thejournalonline.blogspot.com/2016/11/challenge.html (full Kroger receipt photo: https://blogger.googleusercontent.com/.../kroger-receipt.jpg)
  //   https://missiontosave.com/wp-content/uploads/2015/06/Kroger-Mega-Sale-Receipt-.jpg (Kroger receipt photo with SC KROGER SAVINGS lines, 2015)
  //   https://olivia-knox.com/krogerfeedback-com/ (screenshot of Kroger's survey page showing the receipt's Entry ID box)
  //   https://www.createreceipt.com/templates/stores/kroger (secondary, template modelled on real layout)
  "kroger": {
    businessName: "Kroger",
    addressLine1: "5520 Clinton Hwy",
    addressLine2: "Knoxville, TN 37912",
    phone: "(865) 555-0182 STORE",
    hideTitle: true,
    register: "YOUR CASHIER WAS DANA",
    taxLabel: "TAX",
    taxRate: 6.25,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "asterisk",
    itemStyle: "lined",
    grandTotalLabel: "**** BALANCE",
    paymentMethod: "Debit Card",
    cardLastFour: "5310",
    showCardAuth: true,
    footerMessage: "********* KROGER SAVINGS *********\nKROGER SAVINGS $ 6.00\nFuel Points This Order = 58\nSave $.10 off per gallon on 1 fillup\nfor every 100 Fuel Points\n\n*SEE WHAT YOU ARE SAVING TODAY*\nYOU SAVED $6.00\nTHANK YOU FOR SHOPPING KROGER",
    policyText: "**********************************\nEARN 50 FUEL POINTS\nBY GIVING US FEEDBACK\nGo to kroger.com/feedback\nEntry ID: 481-207-336-915-062-774\n**********************************",
    showBarcode: false,
    paperStyle: "thermal",
    items: [
      {
        name: "KRO 2% MILK GAL",
        quantity: 1,
        price: 3.29,
      },
      {
        name: "SMP TRTH ORG EGGS 12CT",
        quantity: 1,
        price: 5.49,
        discount: 1.0,
      },
      {
        name: "BANANAS",
        quantity: 2.31,
        price: 0.59,
        unit: "lb",
      },
      {
        name: "KRO WHT BREAD 20OZ",
        quantity: 1,
        price: 1.49,
      },
      {
        name: "TIDE PODS 42CT",
        quantity: 1,
        price: 13.99,
        discount: 3.0,
      },
      {
        name: "COCA COLA 12PK 12OZ",
        quantity: 2,
        price: 7.99,
        discount: 2.0,
      },
      {
        name: "PRV SEL CHKN BRST",
        quantity: 1,
        price: 8.47,
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
      change: "CHANGE",
    },
    showTaxRate: false,
  },
  // united-airlines — was wrong-format. Sources:
  //   https://experience.apsc.ubc.ca/sites/default/files/2024-08/united_airlines_receipt_-_sample.pdf (redacted United eTicket Itinerary and Receipt, 2024)
  //   https://web.mit.edu/golem/doc/receipt/united-lga-iad-receipt.html (older United E-Ticket Receipt and Itinerary)
  //   https://www.flyertalk.com/forum/7750513-post1.html (FlyerTalk breakdown of UA e-receipt tax codes)
  "united-airlines": {
    businessName: "United Airlines",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    hideTitle: true,
    greeting: "eTicket Itinerary and Receipt for Confirmation K7QW2M",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "Thank you for choosing United. A receipt of your purchase is shown below. Please retain this email receipt for your records.",
          },
          {
            label: "Confirmation Number",
            value: "K7QW2M",
          },
        ],
      },
      {
        title: "Flight 1 of 2 UA1187",
        rows: [
          {
            label: "Date",
            value: "{{date+14}}",
          },
          {
            label: "Class",
            value: "United Economy (L)",
          },
          {
            label: "Depart 07:05 AM",
            value: "Chicago, IL, US (ORD)",
          },
          {
            label: "Arrive 09:52 AM",
            value: "San Francisco, CA, US (SFO)",
          },
        ],
      },
      {
        title: "Flight 2 of 2 UA2214",
        rows: [
          {
            label: "Date",
            value: "{{date+18}}",
          },
          {
            label: "Class",
            value: "United Economy (L)",
          },
          {
            label: "Depart 05:40 PM",
            value: "San Francisco, CA, US (SFO)",
          },
          {
            label: "Arrive 11:58 PM",
            value: "Chicago, IL, US (ORD)",
          },
        ],
      },
      {
        title: "Traveler Details",
        rows: [
          {
            value: "SAMPLE/ALEX",
          },
          {
            label: "eTicket number",
            value: "0162398471105",
          },
          {
            label: "Seats",
            value: "ORD-SFO 23C   SFO-ORD 24C",
          },
          {
            label: "MileagePlus",
            value: "XXXXX123",
          },
        ],
      },
      {
        title: "Purchase Summary",
        rows: [
          {
            label: "Method of payment",
            value: "Visa ending in 4417",
          },
          {
            label: "Date of purchase",
            value: "{{date+0}}",
          },
        ],
      },
    ],
    taxLabel: "Taxes",
    taxRate: 0,
    itemStyle: "lined",
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    hideTotals: true,
    fontFamily: "sans",
    headerAlign: "left",
    ruleStyle: "solid",
    footerMessage: "Fare Rules\nAdditional charges may apply for changes in addition to any fare rules listed.\nNONREF/CHGFEE/NOASR",
    policyText: "Baggage allowance and charges for this itinerary\nORD to SFO: 1st bag 40.00 USD, 2nd bag 50.00 USD, 50lbs (23kg) 62in (157cm)\nSFO to ORD: 1st bag 40.00 USD, 2nd bag 50.00 USD, 50lbs (23kg) 62in (157cm)",
    showBarcode: false,
    paperStyle: "modern",
    items: [
      {
        name: "Airfare",
        quantity: 1,
        price: 267.0,
      },
      {
        name: "U.S. Transportation Tax",
        quantity: 1,
        price: 20.03,
      },
      {
        name: "U.S. Flight Segment Tax",
        quantity: 1,
        price: 10.6,
      },
      {
        name: "September 11th Security Fee",
        quantity: 1,
        price: 11.2,
      },
      {
        name: "U.S. Passenger Facility Charge",
        quantity: 1,
        price: 9.0,
      },
    ],
    paperFinish: "email",
    showTaxRate: false,
  },
  // chevron — was wrong-format. Sources:
  //   https://commons.wikimedia.org/wiki/File:G%26M_Oil_(Chevron)_145_(Palm_Desert,_California).jpg (Chevron pump receipt scan, 2011)
  //   https://foursquare.com/v/chevron/4ea99ea930f8719c90589532 (photo of an Oakland CA Chevron in-store receipt, 2017)
  //   https://commons.wikimedia.org/wiki/File:Shell-Gas-Station-Receipt-MasterCard.jpg (same-era US pump receipt layout: PUMP / PRODUCT / $/G / GALLONS / FUEL TOTAL)
  //   https://receiptgenerator.io/chevron-receipt (secondary: grades Regular/Plus/Supreme, no sales tax line on fuel)
  "chevron": {
    businessName: "VALLEY OIL CHEV # 214",
    addressLine1: "2405 San Ramon Valley Blvd",
    addressLine2: "San Ramon CA 94583",
    phone: "",
    hideTitle: true,
    headerAlign: "left",
    register: "Pump# 6",
    sections: [
      {
        rows: [
          {
            value: "STN 00214587",
          },
          {
            label: "Invoice#",
            value: "0083416",
          },
          {
            label: "Auth#",
            value: "052917",
          },
        ],
      },
    ],
    taxLabel: "Tax",
    taxRate: 0,
    fontFamily: "mono",
    ruleStyle: "none",
    itemStyle: "stacked",
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "7731",
    showCardAuth: false,
    footerMessage: "THANK YOU\nPLEASE COME AGAIN",
    policyText: "Save on every fill-up with\nChevron Texaco Rewards.",
    showBarcode: false,
    paperStyle: "thermal",
    items: [
      {
        name: "Regular/Self",
        quantity: 11.405,
        price: 4.899,
        unit: "G",
      },
    ],
    hideSubtotal: true,
    showTaxRate: false,
  },
  // panera-bread — was missing-key-details. Sources:
  //   https://www.tripadvisor.com/Restaurant_Review-g60933-d13496056-Reviews-Panera_Bread-Albuquerque_New_Mexico.html (receipt photo, Albuquerque NM, 2018)
  //   https://www.yelp.com/biz/panera-bread-clark (receipt photo, Clark NJ, 2017)
  //   https://www.automobilesillustrated.com/tellpanera-survey (secondary: tellpanera.com survey code printed near the bottom)
  "panera-bread": {
    businessName: "Panera Bread",
    logoDataUrl: "",
    addressLine1: "Cafe 2147",
    addressLine2: "Sunset Hills, MO 63127",
    phone: "Phone: (314) 555-0129",
    hideTitle: true,
    greeting: "Accuracy Matters,\nYour order should be correct every time.\nIf it's not, we'll fix it right away.\nJust let any associate know.",
    register: "Check Number: 2814406   Cashier: Maria",
    taxLabel: "Tax",
    taxRate: 9.238,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "qtycol",
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "2290",
    showCardAuth: false,
    footerMessage: "Log in at PaneraBread.com.\nYou are 2 visits away from your next reward\nMyPanera Member: XXXXXXXXXXXX40217",
    policyText: "www.panerabread.com\n\nRAPID PICK-UP\nYour Order Number is: 418\nCustomer / Pager: ALEX",
    showBarcode: false,
    paperStyle: "thermal",
    items: [
      {
        name: "You Pick 2",
        quantity: 1,
        price: 12.79,
        modifiers: ["1/2 Frontega Chx Pan", "No Mozzarella Cheese", "Cup Brc Chdr Soup", "French Baguette"],
      },
      {
        name: "Lg Iced Green Tea",
        quantity: 1,
        price: 3.49,
      },
      {
        name: "Choc Chipper Cookie",
        quantity: 1,
        price: 2.99,
      },
    ],
    labels: {
      subtotal: "SubTotal",
    },
    showTaxRate: false,
  },
  // gucci — was wrong-format. Sources:
  //   https://poshmark.com/listing/Gucci-shoes-and-Gucci-shirt-brad-new-receipts-5faf31109e1559dd0bcf47de (photo of a Gucci Troy MI boutique receipt, 2020)
  //   https://aworldofgoodsforyou.com/wp-content/uploads/2022/10/DB8CA8C4-230D-4FFA-9B72-71CC8EE1D914-scaled.jpeg (Gucci Canton Road receipt with signature/barcode footer)
  //   https://pbs.twimg.com/media/Eu68-5YVoAM0Y8w.jpg (Gucci Beijing SKP receipt, same POS layout)
  "gucci": {
    businessName: "New York 5th Avenue",
    addressLine1: "725 Fifth Avenue",
    addressLine2: "New York NY 10022",
    phone: "tel (212) 555-0190",
    hideTitle: true,
    hideStoreLine: true,
    register: "Register: 1",
    sections: [
      {
        rows: [
          {
            label: "Trans #",
            value: "41876",
          },
          {
            label: "Store",
            value: "21604",
          },
          {
            label: "Cashier",
            value: "98114207",
          },
          {
            label: "Customer",
            value: "SAMPLE CLIENT",
          },
        ],
      },
    ],
    taxLabel: "Tax",
    taxRate: 8.875,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "lined",
    itemHeader: {
      left: "ITEM            QTY.",
      right: "AMOUNT USD",
    },
    grandTotalLabel: "Total(USD)",
    paymentMethod: "Credit Card",
    cardLastFour: "1009",
    showCardAuth: true,
    footerMessage: "",
    policyText: "I acknowledge satisfactory receipt\nof relative goods/services\n\nX______________________________\nCustomer's Signature",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "HANDBAGS 728219 AABZC - 9761 - NOSIZ",
        quantity: 1,
        price: 3200.0,
        sku: "809754213",
        category: "Salesperson: 1061937 (Marco)",
      },
      {
        name: "MENS SHOES 776123 AAEP3 - 9014 - 10",
        quantity: 1,
        price: 850.0,
        sku: "809761504",
        category: "Salesperson: 1061937 (Marco)",
      },
    ],
    skuFirst: true,
    showTaxRate: false,
  },
  // whole-foods — was missing-key-details. Sources:
  //   https://nosaltnofatnosugar.com/2021/07/18/deal-shopping-even-at-whole-foods/ (photo of a Northbrook IL Whole Foods receipt with Prime Extra 10% lines, 2021)
  //   https://robpegoraro.com/2020/07/03/how-i-got-amazon-prime-almost-for-free/whole-foods-receipt-with-amazon-prime-discounts/ (receipt close-up: *Sale*, Prime Extra 10.00%, BAG REFUND)
  //   https://www.thebillfold.com/2016/04/show-us-your-grocery-receipts-part-nine-whole-foods/ (older Whole Foods receipts: F/B flags, weight/TARE, ITEM = PLU lines)
  //   https://couponsinthenews.com/2019/05/22/whole-foods-will-show-off-its-low-prices-even-though-theyre-still-high (Prime Extra 10% printed under each sale item)
  "whole-foods": {
    businessName: "Riverside RVS 512-555-0148",
    addressLine1: "4301 S Congress Ave",
    addressLine2: "Austin, TX 78745",
    phone: "",
    hideTitle: true,
    hideStoreLine: true,
    register: "",
    taxLabel: "Tax:",
    taxRate: 8.25,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "stacked",
    grandTotalLabel: "Total:",
    paymentMethod: "Credit Card",
    cardLastFour: "8820",
    showCardAuth: false,
    paymentInline: false,
    footerMessage: "Total Savings: -$1.25",
    showBarcode: false,
    paperStyle: "thermal",
    items: [
      {
        name: "365 OG WHOLE MILK GAL",
        quantity: 1,
        price: 5.49,
      },
      {
        name: "OG HASS AVOCADO",
        quantity: 4,
        price: 1.25,
      },
      {
        name: "WILD SOCKEYE SALMON",
        quantity: 1.21,
        price: 13.99,
        unit: "lb",
      },
      {
        name: "SIETE GRAIN FREE CHIPS",
        quantity: 1,
        price: 5.29,
        discount: 1.25,
      },
      {
        name: "365 SPRKLNG WTR LIME 8PK",
        quantity: 1,
        price: 4.99,
      },
      {
        name: "OG BABY SPINACH 5OZ",
        quantity: 1,
        price: 3.99,
      },
      {
        name: "BRM THCK RLD OATS",
        quantity: 1,
        price: 6.49,
      },
    ],
    labels: {
      subtotal: "Subtotal:",
    },
  },
  // safeway — was missing-key-details. Sources:
  //   https://www.milehighonthecheap.com/safeway-nestle-bonus-coupon-discount/ (photo of a Denver-area Safeway receipt, Jan 2025)
  //   https://www.grocerycouponguide.com/articles/step-by-step-safeway-ecoupon-moneymaker-eating-well-on-1-a-day/ (Safeway receipt photo with RegPrice/CardSav lines, 2010)
  //   https://www.safeway.com/faq/foru.3132.html (Safeway for U program: member prices and points)
  "safeway": {
    businessName: "Safeway",
    addressLine1: "1480 S Colorado Blvd",
    addressLine2: "Denver, CO 80222",
    phone: "(303) 555-0164",
    hideTitle: true,
    topBarcode: true,
    showBarcode: false,
    register: "YOUR CASHIER TODAY WAS JORDAN",
    taxLabel: "TAX",
    taxRate: 4.81,
    discount: 2.0,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    itemHeader: {
      left: "",
      right: "You Pay",
    },
    grandTotalLabel: "**** BALANCE",
    paymentMethod: "Credit Card",
    cardLastFour: "2286",
    showCardAuth: true,
    footerMessage: "YOUR SAVINGS\nMember Savings 9.50\nBasket Savings 2.00\nTotal 11.50",
    policyText: "YOUR POINTS\nPoints Earned Today 41\nPoints Available 386",
    paperStyle: "thermal",
    items: [
      {
        name: "LUCERNE 2% MILK GAL",
        quantity: 1,
        price: 4.49,
        discount: 0.5,
      },
      {
        name: "O ORGANICS BABY SPINACH",
        quantity: 1,
        price: 4.99,
        discount: 1.0,
      },
      {
        name: "HOT POCKETS PEPRNI",
        quantity: 2,
        price: 3.79,
        discount: 2.0,
      },
      {
        name: "SIG SEL FLOUR TORTILLA",
        quantity: 1,
        price: 2.99,
      },
      {
        name: "BANANAS",
        quantity: 2.1,
        price: 0.69,
        unit: "lb",
      },
      {
        name: "TILLAMOOK MED CHDR 2LB",
        quantity: 1,
        price: 12.99,
        discount: 3.0,
      },
      {
        name: "COCA COLA 12PK 12OZ",
        quantity: 1,
        price: 9.99,
        discount: 3.0,
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    showTaxRate: false,
  },
  // wawa — was wrong-format. Sources:
  //   https://www.fox29.com/news/wawa-superfan-collects-receipts-0-999-over-3-years
  //   https://mywawavisitsurvey.com/
  //   https://en.wikipedia.org/wiki/Wawa_(company)
  "wawa": {
    businessName: "Wawa",
    addressLine1: "Store #8062 · 260 W Baltimore Pike",
    addressLine2: "Wawa, PA 19063",
    phone: "(610) 358-8000",
    register: "Order #417",
    cashier: "Cashier: Dana",
    taxLabel: "PA Sales Tax",
    taxRate: 6.0,
    paymentMethod: "Credit Card",
    cardLastFour: "4821",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    showCardAuth: true,
    hideStoreLine: true,
    footerMessage: "Thank you for visiting Wawa!",
    policyText: "Tell us about your visit at mywawavisit.com\nSurvey code: 4821-307  Store: 8062",
    showBarcode: false,
    paperStyle: "thermal",
    items: [
      {
        name: "Classic Italian Shorti",
        quantity: 1,
        price: 7.29,
        modifiers: ["Roll", "Provolone", "Lettuce, Onion, Oil"],
      },
      {
        name: "Hot Coffee 24oz",
        quantity: 1,
        price: 2.29,
      },
      {
        name: "Wawa Iced Tea 16.9oz",
        quantity: 1,
        price: 1.99,
      },
      {
        name: "Soft Pretzel",
        quantity: 1,
        price: 1.79,
      },
    ],
    showTaxRate: false,
  },
  // shell — was wrong-format. Sources:
  //   https://support.shell.us/hc/en-us/articles/43333743484945-How-Shell-Fuel-Rewards-Savings-Work-at-the-Pump-Limits-Rollover-Explained
  //   https://www.fuelly.com/forums/f2/enter-total-fill-up-cost-729.html?nojs=1
  //   https://www.makecepeit.com/blog/how-to-make-a-gas-receipt
  "shell": {
    businessName: "SHELL",
    logoText: "SHELL",
    addressLine1: "910 Main St",
    addressLine2: "Houston, TX 77002",
    phone: "",
    register: "Pump #06",
    taxLabel: "Tax",
    taxRate: 0,
    paymentMethod: "Credit Card",
    cardLastFour: "7310",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    grandTotalLabel: "FUEL TOTAL",
    showCardAuth: true,
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "PUMP#",
            value: "06",
          },
          {
            label: "PRODUCT",
            value: "REGULAR",
          },
          {
            label: "GALLONS",
            value: "12.453",
          },
          {
            label: "PRICE/GAL",
            value: "$2.799",
          },
        ],
      },
    ],
    footerMessage: "THANK YOU - PLEASE COME AGAIN",
    policyText: "Fuel Rewards savings applied at the pump when your account is linked.",
    showBarcode: false,
    paperStyle: "thermal",
    items: [
      {
        name: "REGULAR  12.453 GAL",
        quantity: 1,
        price: 34.86,
      },
    ],
    hideSubtotal: true,
    showTaxRate: false,
  },
  // tim-hortons — was missing-key-details. Sources:
  //   https://help.timhortons.ca/hc/en-ca/articles/33456675818395-How-do-I-redeem-my-Tell-Tims-Survey-offer
  //   https://www.Leg.BC.ca/content-committees/AccountabilityDocuments/mlas/2018-19/Q2/Ind-Current-MLA/Constituency-Office-Expenses-Receipts/Bains-Constituency-Office-Expenses-Receipts-Q2-FY2018-19.pdf
  //   https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/gi-064/harmonized-sales-tax-ontario-point-sale-rebate-on-prepared-food-beverages.html
  //   https://tell-tims.com/requirements/
  "tim-hortons": {
    businessName: "Tim Hortons",
    addressLine1: "Store #104822 · 130 King St W",
    addressLine2: "Toronto, ON M5X 1E4",
    phone: "(416) 847-8488",
    register: "Order #238 · Take Out",
    cashier: "Cashier: Priya",
    currency: "CAD",
    taxLabel: "HST",
    taxRate: 13.0,
    paymentMethod: "Debit Card",
    cardLastFour: "0921",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    showCardAuth: true,
    hideStoreLine: true,
    footerMessage: "Thank you! Always Fresh.",
    policyText: "Tell us about your visit at telltims.ca\nSurvey code: 1048 2238 1027 0941 5\nGUEST COPY",
    showBarcode: false,
    paperStyle: "thermal",
    items: [
      {
        name: "Lg Original Blend",
        quantity: 1,
        price: 2.39,
        modifiers: ["Double Double"],
      },
      {
        name: "Farmer's Breakfast Wrap",
        quantity: 1,
        price: 5.49,
        modifiers: ["Sausage", "Hash Brown"],
      },
      {
        name: "20 Timbits",
        quantity: 1,
        price: 6.19,
        modifiers: ["Assorted"],
      },
    ],
    showTaxRate: false,
  },
  // rolex — was missing-key-details. Sources:
  //   https://www.rolexforums.com/showthread.php?t=834494
  //   https://rolexforums.com/showthread.php?t=948176
  //   https://www.horando.de/en/blogs/buyers-guide/rolex-papiere-welche-echtheitszeugnisse-sollten-bei-einer-uhr-dabei-sein
  //   https://www.affordableswisswatchesinc.com/blogs/news/used-rolex-papers-what-you-should-get
  "rolex": {
    businessName: "Madison & Co. Jewelers",
    logoText: "Madison & Co. Jewelers",
    greeting: "Official Rolex Retailer",
    addressLine1: "610 Madison Ave",
    addressLine2: "New York, NY 10022",
    phone: "(212) 555-0148",
    website: "",
    invoice: true,
    numberLabel: "Sales Invoice No.",
    cashier: "Salesperson: R. Alvarez",
    taxLabel: "NY Sales Tax",
    taxRate: 8.875,
    paymentMethod: "Credit Card",
    cardLastFour: "5512",
    fontFamily: "serif",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "lined",
    itemHeader: {
      left: "Description",
      right: "Amount",
    },
    showCardAuth: true,
    hideStoreLine: true,
    sections: [
      {
        title: "Sold To",
        rows: [
          {
            label: "Name",
            value: "Jordan Sample",
          },
          {
            label: "Address",
            value: "100 Example St, New York, NY 10001",
          },
        ],
      },
      {
        title: "Timepiece",
        rows: [
          {
            label: "Model",
            value: "Submariner Date 41mm",
          },
          {
            label: "Reference",
            value: "126610LN",
          },
          {
            label: "Case / Bracelet",
            value: "Oystersteel / Oyster",
          },
          {
            label: "Serial",
            value: "SAMPLE-0000",
          },
          {
            label: "Warranty card",
            value: "Dated and issued at sale",
          },
        ],
      },
    ],
    policyText: "This timepiece is covered by the Rolex international guarantee for five years from the date shown on the Rolex warranty card issued by this Official Rolex Retailer. All sales final. Retain this invoice with the warranty card.\n\nCustomer signature: ______________________",
    showBarcode: false,
    paperStyle: "minimal",
    items: [
      {
        name: "Rolex Submariner Date, Ref. 126610LN",
        quantity: 1,
        price: 10900,
      },
    ],
    showTaxRate: false,
  },
  // pizza-hut — was missing-key-details. Sources:
  //   https://slickdeals.net/f/7564034-pizza-hut-10-dollars-off-of-20-dollars-for-quick-survey-can-get-two-10-dollars-off-twice-a-week
  //   https://slickdeals.net/f/10261280-pizza-hut-10-off-20-coupon-code-after-survey-online-only-ymmv
  //   https://pizzahut-helpdesk.zendesk.com/hc/en-us/articles/13637341620495-Do-you-provide-invoices-for-Pizza-Hut-orders
  //   https://www.techbloat.com/how-to-add-pizza-hut-rewards-from-receipt.html
  "pizza-hut": {
    businessName: "Pizza Hut",
    addressLine1: "Store #034512 · 2901 W Parker Rd",
    addressLine2: "Plano, TX 75075",
    phone: "(972) 555-0172",
    register: "CARRYOUT · Order #1184",
    cashier: "Customer: Alex",
    taxLabel: "Tax",
    taxRate: 8.25,
    paymentMethod: "Credit Card",
    cardLastFour: "2290",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    hideStoreLine: true,
    footerMessage: "No One OutPizzas the Hut.",
    policyText: "Tell us how we did at tellpizzahut.com\nStore #034512  Order #1184\nHut Rewards: scan your receipt code in the Pizza Hut app.",
    qrCode: true,
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "Lg Pan Pepperoni",
        quantity: 1,
        price: 17.99,
        modifiers: ["Original Pan", "Extra Cheese"],
      },
      {
        name: "Lg Meat Lover's",
        quantity: 1,
        price: 20.99,
        modifiers: ["Hand-Tossed"],
      },
      {
        name: "8pc Bone-Out Wings",
        quantity: 1,
        price: 9.99,
        modifiers: ["Garlic Parmesan", "Ranch"],
      },
    ],
    showTaxRate: false,
  },
  // sam-s-club — was missing-key-details. Sources:
  //   https://help.samsclub.com/app/answers/detail/a_id/1130/~/sam%E2%80%99s-club-instant-savings%E2%84%A0-program-faq
  //   https://help.samsclub.com/app/answers/detail/a_id/521/~/how-to-check-instant-savings
  //   https://elyex.com/facturacion-sams-en-linea/
  //   https://www.brex.com/tools/charge-finder/sams-club.md
  "sam-s-club": {
    businessName: "Sam's Club",
    addressLine1: "Club 8158 · 2101 SE Simple Savings Dr",
    addressLine2: "Bentonville, AR 72712",
    phone: "(479) 277-0004",
    manager: "Club Manager: T. Brooks",
    register: "ST# 8158 OP# 004812 TE# 08 TR# 03317",
    cashier: "",
    taxLabel: "TAX 1",
    taxRate: 9.5,
    discount: 3.0,
    paymentMethod: "Credit Card",
    cardLastFour: "6604",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "lined",
    showCardAuth: true,
    hideStoreLine: true,
    footerMessage: "# ITEMS SOLD 7",
    policyText: "TC# 4417 0832 1975 3301 2286\nINSTANT SAVINGS  You saved $3.00",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "MM PPR TWL 12",
        quantity: 1,
        price: 22.98,
        sku: "980114522",
      },
      {
        name: "MM WATER 40PK",
        quantity: 1,
        price: 4.98,
        sku: "980108713",
      },
      {
        name: "MM ROTIS CHKN",
        quantity: 1,
        price: 4.98,
        sku: "980021455",
      },
      {
        name: "MM LG EGGS 24",
        quantity: 1,
        price: 6.48,
        sku: "980093604",
      },
      {
        name: "CROISSANT 12CT",
        quantity: 1,
        price: 6.98,
        sku: "980045218",
      },
      {
        name: "MM COPY PAPER",
        quantity: 1,
        price: 49.98,
        sku: "980130077",
      },
      {
        name: "BANANAS 3LB",
        quantity: 1,
        price: 1.47,
        sku: "980000401",
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    skuFirst: true,
  },
  // exxon — was wrong-format. Sources:
  //   https://thepointsguy.com/news/exxon-mobil-rewards-app/
  //   https://apkmirror.com/apk/exxonmobil/exxon-mobil-rewards
  //   https://www.makecepeit.com/blog/how-to-make-a-gas-receipt
  //   https://www.fuelly.com/forums/f2/enter-total-fill-up-cost-729.html?nojs=1
  "exxon": {
    businessName: "EXXON",
    logoText: "EXXON",
    addressLine1: "5959 Las Colinas Blvd",
    addressLine2: "Irving, TX 75039",
    phone: "",
    register: "Pump #08",
    taxLabel: "Tax",
    taxRate: 0,
    paymentMethod: "Credit Card",
    cardLastFour: "3398",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    grandTotalLabel: "TOTAL",
    showCardAuth: true,
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "PUMP #",
            value: "08",
          },
          {
            label: "PRODUCT",
            value: "REGULAR",
          },
          {
            label: "GALLONS",
            value: "13.942",
          },
          {
            label: "PRICE/GAL",
            value: "$2.759",
          },
        ],
      },
      {
        title: "CAR WASH",
        rows: [
          {
            label: "WASH",
            value: "DELUXE",
          },
          {
            label: "CODE",
            value: "40217",
          },
          {
            label: "EXPIRES",
            value: "30 DAYS",
          },
        ],
      },
    ],
    footerMessage: "THANK YOU - PLEASE COME AGAIN",
    policyText: "Earn points on every fill-up with Exxon Mobil Rewards+.",
    showBarcode: false,
    paperStyle: "thermal",
    items: [
      {
        name: "FUEL TOTAL  13.942 GAL",
        quantity: 1,
        price: 38.47,
      },
      {
        name: "DELUXE CAR WASH",
        quantity: 1,
        price: 10.0,
      },
    ],
    hideSubtotal: true,
    showTaxRate: false,
  },
  // grab — was wrong-format. Sources:
  //   https://imagetotable.ai/extract/grab-trip-screenshot
  //   https://www.scribd.com/document/686589132/Grab
  //   https://community.expensify.com/discussion/3998/expensify-grab-smoother-business-travel-in-southeast-asia
  //   https://bizzi.vn/en/instructions-on-how-to-get-grab-receipt-in-the-most-detail/
  "grab": {
    businessName: "Grab",
    logoText: "Grab",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    currency: "SGD",
    taxLabel: "GST",
    taxRate: 0,
    paymentMethod: "Mobile Payment",
    cardLastFour: "",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    dividers: "minimal",
    paymentInline: true,
    greeting: "Hope you enjoyed your ride!",
    grandTotalLabel: "Total Paid",
    hideStoreLine: true,
    showBarcode: false,
    sections: [
      {
        title: "Ride details",
        rows: [
          {
            label: "Booking ID",
            value: "A-7KQ2M9XW4RPT",
          },
          {
            label: "Ride type",
            value: "JustGrab",
          },
          {
            label: "Distance",
            value: "12.4 km · 21 min",
          },
          {
            label: "Pick-up",
            value: "Raffles Place MRT Exit B",
          },
          {
            label: "Drop-off",
            value: "Jewel Changi Airport",
          },
          {
            label: "Driver",
            value: "Wei Ming · SKA1234Z",
          },
        ],
      },
    ],
    footerMessage: "Paid by GrabPay Wallet",
    policyText: "Issue with this ride? Visit help.grab.com. This e-receipt was issued on behalf of the driver-partner. Sample receipt.",
    items: [
      {
        name: "Fare",
        quantity: 1,
        price: 15.6,
      },
      {
        name: "Platform Fee",
        quantity: 1,
        price: 0.9,
      },
      {
        name: "ERP / Tolls",
        quantity: 1,
        price: 1.0,
      },
      {
        name: "Promotion",
        quantity: 1,
        price: -2.0,
      },
    ],
    paperFinish: "email",
    showTaxRate: false,
  },
  // h-m — was missing-key-details. Sources:
  //   https://www2.hm.com/en_us/customer-service/return-link.html
  //   https://tax.ny.gov/pdf/memos/sales/m05_10s.pdf
  //   https://www.tax.ny.gov/pdf/publications/sales/pub718c_224.pdf
  //   https://www.rather-be-shopping.com/blog/hm-return-policy/
  "h-m": {
    businessName: "H&M",
    logoText: "H&M",
    addressLine1: "Store 0431 · 22 N State St",
    addressLine2: "Chicago, IL 60602",
    phone: "(855) 466-7467",
    website: "hm.com",
    register: "Till 03",
    cashier: "Cashier: Maya",
    taxLabel: "Sales Tax",
    taxRate: 10.25,
    discount: 11.3,
    paymentMethod: "Credit Card",
    cardLastFour: "8817",
    fontFamily: "inter",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "lined",
    itemHeader: {
      left: "Article",
      right: "Price",
    },
    showCardAuth: true,
    hideStoreLine: true,
    footerMessage: "H&M Member 10% welcome discount applied. Thank you for shopping at H&M!",
    policyText: "Returns: within 30 days with this receipt and tags attached. In-store returns are free. See hm.com for details.",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "Slim Fit Oxford Shirt  White  M",
        quantity: 1,
        price: 24.99,
        sku: "0977521004",
      },
      {
        name: "Regular Fit T-shirt  Black  M",
        quantity: 1,
        price: 9.99,
        sku: "0570002002",
      },
      {
        name: "Loose Jeans  Denim blue  32",
        quantity: 1,
        price: 34.99,
        sku: "1024256001",
      },
      {
        name: "Relaxed Fit Hoodie  Grey  L",
        quantity: 1,
        price: 29.99,
        sku: "0970819003",
      },
      {
        name: "5-pack Socks  Black",
        quantity: 1,
        price: 12.99,
        sku: "0712924001",
      },
    ],
    showTaxRate: false,
  },
  // best-buy — was missing-key-details. Sources:
  //   https://receiptedit.com/blog/best-buy-receipt
  //   https://retailreturnspolicy.com/best-buy-return-policy/
  //   https://www.consumerreports.org/consumerist/best-buy-doesnt-want-you-to-know-they-take-returns-without-a-receipt/
  "best-buy": {
    businessName: "Best Buy",
    addressLine1: "Store #0011 · 1000 W 78th St",
    addressLine2: "Richfield, MN 55423",
    phone: "(612) 866-0092",
    website: "www.bestbuy.com",
    register: "REG 04  TRANS 5521",
    cashier: "Your cashier was Mitchell U.",
    taxLabel: "Sales Tax",
    taxRate: 8.025,
    paymentMethod: "Credit Card",
    cardLastFour: "1946",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    showCardAuth: true,
    hideStoreLine: true,
    footerMessage: "My Best Buy Member ****4471 · Points earned: 568",
    policyText: "Return & Exchange: 15 days for most products (60 days for My Best Buy Plus/Total members). Activatable devices: 14 days. Keep this receipt for returns and warranty.",
    showBarcode: true,
    paperStyle: "thermal",
    items: [
      {
        name: "APPLE AIRPODS PRO 3",
        quantity: 1,
        price: 249.99,
        sku: "6376563",
      },
      {
        name: "INSIGNIA 50IN F30 4K FIRE TV",
        quantity: 1,
        price: 229.99,
        sku: "6544218",
      },
      {
        name: "GSP 2YR TV PROTECTION",
        quantity: 1,
        price: 39.99,
        sku: "6402117",
      },
      {
        name: "APPLE 20W USB-C ADAPTER",
        quantity: 1,
        price: 19.99,
        sku: "6437121",
      },
      {
        name: "INSIGNIA 6FT USB-C CABLE",
        quantity: 1,
        price: 14.99,
        sku: "6397003",
      },
    ],
    showTaxRate: false,
  },
  // planet-fitness — was close. Sources:
  //   https://alumni.caelum.com.br/guide-costs-billing-dates-sneaky-pu4b.html
  //   https://tool.rubadub.co.uk/annual-fee-planet-fitness-your-v2ep.html
  //   https://gupmagazine.com/much-planet-fitness-annual-fee-z86g.html
  "planet-fitness": {
    mode: "merge",
    greeting: "Membership Payment Receipt",
    sections: [
      {
        title: "Membership",
        rows: [
          {
            label: "Member",
            value: "Chris Daniels",
          },
          {
            label: "Member #",
            value: "0000 0000 0000",
          },
          {
            label: "Plan",
            value: "Black Card",
          },
          {
            label: "Home club",
            value: "Sample Club #0001",
          },
          {
            label: "Billing date",
            value: "16th monthly",
          },
        ],
      },
    ],
    items: [
      {
        name: "Black Card Monthly Dues",
        quantity: 1,
        price: 24.99,
      },
    ],
    policyText: "Annual fee of $49 bills separately on its scheduled date. Questions? Contact your home club.",
    showTaxRate: false,
  },
  // sheetz — was wrong-format. Sources:
  //   https://www.chowhound.com/2115869/sheetz-order-pickup-counter-rule
  //   https://www.brex.com/tools/charge-finder/sheetz
  //   https://www.complaintsboard.com/sheetz-236-marietta-pa-fuel-c1156625
  "sheetz": {
    mode: "merge",
    addressLine1: "Sheetz #0123 - 5700 Sixth Ave",
    addressLine2: "Altoona, PA 16602",
    register: "Pump 04",
    taxLabel: "Sales Tax",
    taxRate: 0,
    fontFamily: "courier",
    ruleStyle: "dashed",
    paymentMethod: "Credit Card",
    cardLastFour: "0000",
    showCardAuth: true,
    items: [
      {
        name: "UNLEADED 87  11.214 GAL @ $3.299/G",
        quantity: 1,
        price: 37.0,
      },
    ],
    footerMessage: "THANK YOU FOR CHOOSING SHEETZ",
    policyText: "Earn points on every gallon with Sheetz Rewardz.",
    showBarcode: false,
    fuelGrade: "Unleaded 87",
    hideSubtotal: true,
    showTaxRate: false,
  },
  // peet-s-coffee — was missing-key-details. Sources:
  //   https://www.nrn.com/beverage-trends/peet-s-coffee-sees-returns-from-relaunched-loyalty-program-now-with-tiered-rewards-structure
  //   https://www.modernretail.co/retailers/why-peets-coffee-redesigned-its-loyalty-program/
  //   https://www.cdtfa.ca.gov/lawguides/vol1/sutr/1603.html
  "peet-s-coffee": {
    mode: "merge",
    addressLine1: "2124 Vine St",
    addressLine2: "Berkeley, CA 94709",
    register: "Order #42",
    cashier: "Barista: Alex",
    greeting: "Order for: SAM",
    taxLabel: "Tax",
    taxRate: 0,
    items: [
      {
        name: "Caffe Latte Medium 16oz",
        quantity: 1,
        price: 5.75,
        modifiers: ["Oat Milk +0.80"],
      },
      {
        name: "Cold Brew Large 20oz",
        quantity: 1,
        price: 5.45,
      },
      {
        name: "Butter Croissant",
        quantity: 1,
        price: 3.95,
      },
    ],
    paymentMethod: "Mobile Payment",
    footerMessage: "Thanks for visiting Peet's!",
    policyText: "Peetnik Rewards members: scan your app QR code at checkout to earn points.",
    qrCode: true,
    showBarcode: true,
    showTaxRate: false,
  },
  // lowe-s — was missing-key-details. Sources:
  //   https://sites.google.com/view/lowescomsurveyshareyourex/home
  //   https://commerce.app.dext.com/help/automate-lowes-instore-online-receipts/5
  //   https://baymard.com/checkout-usability/benchmark/step-type/receipt/27895-lowes
  "lowe-s": {
    mode: "merge",
    greeting: "LOWE'S HOME CENTERS, LLC",
    addressLine1: "123 Sample Pkwy",
    addressLine2: "Mooresville, NC 28117",
    taxLabel: "TOTAL TAX",
    taxRate: 7.0,
    register: "STORE: 0000 TERMINAL: 12",
    fontFamily: "courier",
    ruleStyle: "dashed",
    itemStyle: "stacked",
    grandTotalLabel: "INVOICE TOTAL",
    sections: [
      {
        rows: [
          {
            value: "- SALE -",
          },
          {
            label: "SALES#",
            value: "S0000ABC 1234567",
          },
          {
            label: "TRANS#",
            value: "000123456",
          },
        ],
      },
    ],
    items: [
      {
        name: "KOBALT 24V 1/4-IN IMPACT DRIVER",
        quantity: 1,
        price: 99.0,
        sku: "1234567",
      },
      {
        name: "GE 60W EQ A19 LED 8PK",
        quantity: 1,
        price: 9.98,
        sku: "1234568",
      },
      {
        name: "1/2-IN X 10-FT PVC SCH 40 PIPE",
        quantity: 5,
        price: 2.48,
        sku: "1234569",
      },
      {
        name: "DAP ALEX PLUS 10.1OZ CAULK",
        quantity: 2,
        price: 3.98,
        sku: "1234570",
      },
      {
        name: "SCOTTS TURF BUILDER 12.5LB",
        quantity: 1,
        price: 24.98,
        sku: "1234572",
      },
    ],
    paymentMethod: "Credit Card",
    cardLastFour: "0000",
    showCardAuth: true,
    footerMessage: "THANK YOU FOR SHOPPING LOWE'S",
    policyText: "Share your feedback! Visit www.lowes.com/survey and enter the survey code below for a chance to win. See lowes.com/returns for our return policy.",
    showBarcode: true,
    labels: {
      subtotal: "SUBTOTAL",
    },
    skuFirst: true,
    showTaxRate: false,
  },
  // ulta-beauty — was missing-key-details. Sources:
  //   https://www.ulta.com/rewards/faq
  //   https://www.trybeans.com/blog/ultamate-rewards-analysis
  //   https://www.supermoney.com/what-is-ultas-return-policy
  "ulta-beauty": {
    mode: "merge",
    addressLine1: "Store #0000 - 123 Sample Rd",
    addressLine2: "Bolingbrook, IL 60440",
    taxRate: 8.75,
    register: "REG 02 TRAN 0456",
    cashier: "Associate: Jen",
    fontFamily: "courier",
    items: [
      {
        name: "MAYBELLINE LASH SENSATIONAL VERY BLACK",
        quantity: 1,
        price: 12.99,
        sku: "0000001",
      },
      {
        name: "IT COSMETICS CC+ CREAM SPF50 MEDIUM",
        quantity: 1,
        price: 47.0,
        sku: "0000002",
      },
      {
        name: "REDKEN ALL SOFT SHAMPOO 10.1OZ",
        quantity: 1,
        price: 32.0,
        sku: "0000003",
        discount: 3.5,
      },
      {
        name: "TARTE SHAPE TAPE CONCEALER 20B",
        quantity: 1,
        price: 32.0,
        sku: "0000004",
      },
    ],
    paymentMethod: "Credit Card",
    cardLastFour: "0000",
    showCardAuth: true,
    footerMessage: "Ulta Beauty Rewards Member ****0000 | Points earned: 120 | Balance: 1,540",
    policyText: "Returns and exchanges accepted within 60 days with receipt. See ulta.com for details.",
    showBarcode: true,
    showTaxRate: false,
  },
  // target — was missing-key-details. Sources:
  //   https://receiptsmaker.com/blog/how-to-read-a-receipt
  //   https://gist.github.com/CheckoutReceipt/bb018642378133ad8219eaf3f2d3f043
  //   https://fool.com/the-ascent/personal-finance/articles/3-ways-to-save-more-at-target-in-2023/
  //   https://racklify.com/encyclopedia/what-is-target-dpci-how-the-departmentclassitem-system-works/
  "target": {
    mode: "merge",
    addressLine1: "MINNEAPOLIS NICOLLET MALL",
    addressLine2: "900 Nicollet Mall, Minneapolis, MN 55403",
    taxLabel: "T = MN TAX",
    taxRate: 8.525,
    fontFamily: "courier",
    hideStoreLine: true,
    items: [
      {
        name: "THRESHOLD THROW PILLOW",
        quantity: 1,
        price: 20.0,
        sku: "234010012",
        taxFlag: "T",
      },
      {
        name: "UP&UP AA BATTERIES 8PK",
        quantity: 1,
        price: 8.49,
        sku: "082041234",
        taxFlag: "T",
      },
      {
        name: "ROOM ESSENTIALS STORAGE BIN",
        quantity: 2,
        price: 6.0,
        sku: "068010456",
        taxFlag: "T",
      },
      {
        name: "MAIN STREET MULTI-SURFACE CLEANER",
        quantity: 1,
        price: 3.29,
        sku: "071020789",
        taxFlag: "T",
      },
      {
        name: "FAVORITE DAY GUMMY BEARS",
        quantity: 1,
        price: 3.49,
        sku: "249110901",
        taxFlag: "T",
      },
    ],
    paymentMethod: "Credit Card",
    cardLastFour: "0000",
    showCardAuth: false,
    footerMessage: "Expect More. Pay Less.",
    policyText: "Most items can be returned within 90 days with receipt. Target owned brands: 1 year. Tell us about your visit at informtarget.com.",
    showBarcode: true,
    labels: {
      subtotal: "SUBTOTAL",
    },
    cardRows: [
      {
        value: "*0000 VISA CHARGE",
      },
      {
        label: "AID",
        value: "A0000000031010",
      },
      {
        label: "AUTH CODE",
        value: "418236",
      },
    ],
    skuFirst: true,
  },
  // costco — was missing-key-details. Sources:
  //   https://www.makemyreceipt.com/blog/costco-receipt-codes
  //   https://pricematcher.app/resources/how-to-read-costco-receipt
  //   https://pricematcher.app/resources/costco-receipt-codes
  //   https://chowhound.com/1508140/what-costco-looks-for-customer-receipt-check
  "costco": {
    mode: "merge",
    addressLine1: "ISSAQUAH #0000",
    addressLine2: "1801 10th Ave NW, Issaquah, WA 98027",
    phone: "",
    taxLabel: "TAX",
    taxRate: 10.2,
    grandTotalLabel: "**** TOTAL",
    fontFamily: "courier",
    register: "Whse:0000 Trm:12 Trn:123 OP:482",
    items: [
      {
        name: "KS PAPER TOWEL 12 ROLL",
        quantity: 1,
        price: 23.99,
        sku: "1234567",
        taxFlag: "A",
      },
      {
        name: "KS BATH TISSUE 30 ROLL",
        quantity: 1,
        price: 24.99,
        sku: "1234568",
        discount: 4.0,
        taxFlag: "A",
      },
      {
        name: "ROTISSERIE CHICKEN",
        quantity: 1,
        price: 4.99,
        sku: "1234569",
        taxFlag: "E",
        notTaxed: true,
      },
      {
        name: "ORG STRAWBERRY 2LB",
        quantity: 1,
        price: 6.99,
        sku: "1234570",
        taxFlag: "E",
        notTaxed: true,
      },
      {
        name: "KS WATER 40PK",
        quantity: 2,
        price: 4.99,
        sku: "1234571",
        taxFlag: "E",
        notTaxed: true,
      },
      {
        name: "KS ORG EVOO 2L",
        quantity: 1,
        price: 18.99,
        sku: "1234572",
        taxFlag: "E",
        notTaxed: true,
      },
    ],
    paymentMethod: "Credit Card",
    cardLastFour: "0000",
    showCardAuth: false,
    footerMessage: "Thank You! Please Come Again",
    policyText: "INSTANT SAVINGS $4.00",
    showBarcode: true,
    labels: {
      subtotal: "SUBTOTAL",
    },
    cardRows: [
      {
        value: "XXXXXXXXXXXX0000 CHIP Read",
      },
      {
        label: "AID",
        value: "A0000000031010",
      },
      {
        label: "Seq#",
        value: "41823",
      },
      {
        label: "App#",
        value: "418236",
      },
      {
        label: "Visa Resp:",
        value: "APPROVED",
      },
    ],
    skuFirst: true,
    showTaxRate: false,
  },
  // autozone — was missing-key-details. Sources:
  //   https://www.automoblog.com/reviews/auto-warranty/what-to-know-about-the-autozone-warranty/
  //   https://www.motor1.com/news/795656/autozone-free-duralast-brakes/
  //   https://www.pissedconsumer.com/people/27605735.html
  "autozone": {
    mode: "merge",
    addressLine1: "AutoZone #0000 - 123 Sample Ave",
    addressLine2: "Memphis, TN 38104",
    register: "Store #0000 Reg 02",
    fontFamily: "courier",
    items: [
      {
        name: "MOBIL 1 EXT PERF 5W-30 5QT",
        quantity: 1,
        price: 36.99,
        sku: "120000",
      },
      {
        name: "STP OIL FILTER",
        quantity: 1,
        price: 8.99,
        sku: "S10060XL",
        modifiers: ["Warranty: 90 Days"],
      },
      {
        name: "DURALAST GOLD BATTERY 24F",
        quantity: 1,
        price: 239.99,
        sku: "24F-DLG",
        modifiers: ["Warranty: 3 Year Free Replacement"],
      },
      {
        name: "BATTERY CORE CHARGE",
        quantity: 1,
        price: 22.0,
      },
      {
        name: "RAIN-X LATITUDE WIPER 22IN",
        quantity: 2,
        price: 21.99,
        modifiers: ["Warranty: 1 Year"],
      },
    ],
    paymentMethod: "Debit Card",
    cardLastFour: "0000",
    showCardAuth: true,
    footerMessage: "AutoZone Rewards: (XXX) XXX-0000",
    policyText: "Warranty terms for each part are shown above; keep this receipt or the phone number used at purchase for warranty claims. Core charge refunded when the old part is returned.",
    showBarcode: true,
    showTaxRate: false,
  },
  // dhl — was wrong-format. Sources:
  //   https://mydhl.express.dhl/es/en/help-and-support/faqs/tracking-monitoring.html
  //   https://mydhl.express.dhl/ws/en/ship/surcharges.html
  //   https://www.dhl.com/discover/en-th/backup/contact-us
  //   https://supplychaindive.com/news/dhl-express-to-lower-import-export-fuel-surcharge-calculations/826162
  "dhl": {
    businessName: "DHL Express",
    logoText: "DHL",
    addressLine1: "DHL Express ServicePoint - 123 Sample St",
    addressLine2: "Miami, FL 33131",
    phone: "1-800-225-5345",
    website: "dhl.com/express",
    greeting: "Shipment Receipt",
    hideStoreLine: true,
    fontFamily: "sans",
    ruleStyle: "solid",
    headerAlign: "left",
    paperStyle: "modern",
    sections: [
      {
        title: "Shipment",
        rows: [
          {
            label: "Waybill No.",
            value: "00 0000 0000",
          },
          {
            label: "Product",
            value: "EXPRESS WORLDWIDE",
          },
          {
            label: "From",
            value: "Miami, FL, US",
          },
          {
            label: "To",
            value: "London, GB",
          },
          {
            label: "Pieces",
            value: "1",
          },
          {
            label: "Weight",
            value: "2.0 lb (dim 3.0 lb)",
          },
          {
            label: "Contents",
            value: "Documents and samples",
          },
          {
            label: "Declared value",
            value: "USD 50.00",
          },
          {
            label: "Est. delivery",
            value: "{{date+3}}",
          },
        ],
      },
    ],
    itemHeader: {
      left: "Charges",
      right: "USD",
    },
    itemStyle: "lined",
    items: [
      {
        name: "Express Worldwide transportation",
        quantity: 1,
        price: 84.5,
      },
      {
        name: "Fuel surcharge (46.25%)",
        quantity: 1,
        price: 39.08,
      },
      {
        name: "Shipment insurance",
        quantity: 1,
        price: 9.0,
      },
    ],
    taxLabel: "Tax",
    taxRate: 0,
    grandTotalLabel: "Total charges",
    paymentMethod: "Credit Card",
    cardLastFour: "0000",
    paymentInline: true,
    footerMessage: "Track your shipment at dhl.com with your waybill number.",
    policyText: "Carriage is subject to the DHL Express Terms and Conditions of Carriage. Duties and taxes, if any, are payable by the receiver unless DTP was selected.",
    showBarcode: true,
    showTaxRate: false,
  },
  // nike — was wrong-format. Sources:
  //   https://www.nike.com/help/a/returns-policy
  //   https://www.nike.com/gb/help/warranty
  //   https://www.nike.com/jp/en/help/a/order-tracking
  //   https://baymard.com/checkout-usability/benchmark/step-type/receipt/19821-nike
  "nike": {
    mode: "merge",
    logoText: "NIKE",
    addressLine1: "Nike, Inc. One Bowerman Drive",
    addressLine2: "Beaverton, OR 97005",
    website: "nike.com",
    greeting: "Thanks for your order",
    hideStoreLine: true,
    fontFamily: "inter",
    ruleStyle: "solid",
    paperStyle: "modern",
    dividers: "minimal",
    paymentInline: true,
    sections: [
      {
        title: "Order details",
        rows: [
          {
            label: "Order Number",
            value: "C00000000000",
          },
          {
            label: "Ship to",
            value: "Sam Sample, Portland, OR 97201",
          },
          {
            label: "Delivery",
            value: "Free Standard Shipping (Member)",
          },
          {
            label: "Arrives by",
            value: "{{date+5}}",
          },
        ],
      },
    ],
    items: [
      {
        name: "Nike Air Force 1 '07",
        quantity: 1,
        price: 115.0,
        sku: "CW2288-111",
        modifiers: ["Men's Shoes", "Size 10 / White"],
      },
      {
        name: "Nike Everyday Plus Cushioned Socks (3 Pairs)",
        quantity: 1,
        price: 22.0,
        modifiers: ["Size L / White"],
      },
      {
        name: "Nike Sportswear Club Fleece Hoodie",
        quantity: 1,
        price: 60.0,
        modifiers: ["Size M / Black"],
      },
    ],
    taxLabel: "Estimated Tax",
    taxRate: 0,
    paymentMethod: "Credit Card",
    cardLastFour: "0000",
    footerMessage: "Returns are free for Nike Members within 60 days.",
    showBarcode: false,
    paperFinish: "email",
    showTaxRate: false,
  },
  // uber — was wrong-format. Sources:
  //   https://static.nhtsa.gov/odi/inv/2023/INRD-PE23022-14940P1.pdf
  //   https://www.camara.leg.br/cota-parlamentar/documentos/publ/3211/2024/7773378.pdf
  //   https://www.ridester.com/?p=577168
  "uber": {
    businessName: "Uber",
    logoText: "Uber",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "",
    cashier: "",
    register: "",
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    dividers: "minimal",
    hideStoreLine: true,
    showBarcode: false,
    greeting: "Here's your receipt for your ride, Jordan\nWe hope you enjoyed your ride this afternoon.",
    items: [
      {
        name: "Trip fare",
        quantity: 1,
        price: 31.84,
      },
      {
        name: "Booking Fee",
        quantity: 1,
        price: 3.85,
      },
    ],
    hideSubtotal: true,
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 4.75,
    showTaxRate: false,
    discount: 0,
    tip: 6.0,
    labels: {
      tip: "Tip",
      paymentMethod: "Payments",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4821",
    paymentInline: true,
    showCardAuth: false,
    afterPayment: [
      {
        rows: [
          {
            value: "Visit the trip page for more information, including invoices (where available)",
          },
        ],
      },
      {
        title: "You rode with Marcus",
        rows: [
          {
            label: "UberX",
            value: "9.84 miles | 24 min",
          },
          {
            label: "3:51 PM",
            value: "1200 Market St, San Francisco, CA",
          },
          {
            label: "4:15 PM",
            value: "850 Bryant St, San Francisco, CA",
          },
        ],
      },
    ],
    footerMessage: "",
    policyText: "Fare does not include fees that may be charged by your bank. Please contact your bank directly for inquiries.",
  },
  // instacart — was missing-key-details. Sources:
  //   https://www.instacart.com/help/article/receipts-and-charges
  //   https://instacart.com/help/article/service-fee
  //   https://docs.instacart.com/storefront/learn_about_your_storefront/fulfillment/after_fulfillment/
  //   https://www.veryfi.com/technology/instacart-vs-store-prices-comparison/
  "instacart": {
    businessName: "Instacart",
    logoText: "instacart",
    addressLine1: "Shopped at Costco",
    addressLine2: "Delivered to 1450 Valencia St, San Francisco, CA",
    phone: "",
    website: "instacart.com",
    cashier: "Shopper: Daniel K.",
    register: "",
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    hideStoreLine: true,
    showBarcode: false,
    greeting: "Here's your receipt from Costco",
    items: [
      {
        name: "Costco",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "Kirkland Signature Organic Bananas, 3 lb",
        quantity: 1,
        price: 2.99,
        notTaxed: true,
      },
      {
        name: "Kirkland Signature Rotisserie Chicken",
        quantity: 1,
        price: 5.99,
        notTaxed: true,
      },
      {
        name: "Kirkland Signature Large Eggs, 24 ct",
        quantity: 1,
        price: 9.49,
        notTaxed: true,
      },
      {
        name: "Kirkland Signature Paper Towels, 12 rolls",
        quantity: 1,
        price: 25.99,
      },
    ],
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 8.625,
    showTaxRate: false,
    discount: 0,
    tip: 7.0,
    labels: {
      subtotal: "Subtotal",
      serviceFee: "Service fee",
      deliveryFee: "Delivery fee",
      tip: "Shopper tip",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "3392",
    paymentInline: true,
    showCardAuth: false,
    footerMessage: "100% of your tip goes to your shopper.",
    policyText: "Final charges can differ from the checkout estimate when items are replaced or refunded. See instacart.com/help for receipt questions. Sample receipt.",
    serviceFee: 5.85,
    deliveryFee: 3.99,
  },
  // speedway — was missing-key-details. Sources:
  //   https://www.speedway.com/About/FAQ-CreditCard
  //   https://www.speedway.com:443/about/faq/mobileapps
  //   https://corp.7-eleven.com/corp-press-releases/7-eleven-rewards-customers-with-the-chance-to-win-5-000-every-single-day-in-2025
  "speedway": {
    businessName: "Speedway",
    addressLine1: "Speedway #9421 - 1250 N Main St",
    addressLine2: "Findlay, OH 45840",
    phone: "(419) 555-0173",
    website: "",
    register: "Pump #06",
    cashier: "",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "stacked",
    fuelGrade: "Unleaded",
    unitDecimals: 3,
    items: [
      {
        name: "UNLEADED",
        quantity: 10.874,
        price: 3.099,
        unit: "gal",
      },
    ],
    hideSubtotal: true,
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 0,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "7712",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX7712",
      },
      {
        label: "AUTH #",
        value: "084213",
      },
      {
        label: "ENTRY",
        value: "CHIP",
      },
    ],
    afterPayment: [
      {
        title: "SPEEDY REWARDS",
        rows: [
          {
            label: "CARD",
            value: "XXXXXXXX5530",
          },
          {
            label: "POINTS BALANCE",
            value: "2,415",
          },
        ],
      },
    ],
    showBarcode: false,
    footerMessage: "THANK YOU FOR CHOOSING SPEEDWAY",
    policyText: "",
  },
  // trader-joe-s — was no-source. Sources:
  //   https://cerritos.gov/news/posts/business-spotlight-trader-joes
  //   https://abc7ny.com/post/trader-joes-settlement-shoppers-could-get-payout-claims-receipts-showed-card-information/18898229/
  "trader-joe-s": {
    businessName: "Trader Joe's",
    addressLine1: "4510 W Olympic Blvd",
    addressLine2: "Los Angeles, CA 90019",
    phone: "(323) 555-0148",
    website: "traderjoes.com",
    register: "Store #000 - Reg 03",
    cashier: "Crew: Sam",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    greeting: "OPEN 8:00AM TO 9:00PM DAILY",
    items: [
      {
        name: "BANANAS EACH",
        quantity: 4,
        price: 0.23,
        notTaxed: true,
      },
      {
        name: "MANDARIN ORANGE CHICKEN",
        quantity: 1,
        price: 5.49,
        notTaxed: true,
      },
      {
        name: "EVERYTHING BUT THE BAGEL",
        quantity: 1,
        price: 2.49,
        notTaxed: true,
      },
      {
        name: "CAULIFLOWER GNOCCHI",
        quantity: 2,
        price: 2.99,
        notTaxed: true,
      },
      {
        name: "UNEXPECTED CHEDDAR",
        quantity: 1,
        price: 4.49,
        notTaxed: true,
      },
      {
        name: "TULIPS 10 STEM",
        quantity: 1,
        price: 5.99,
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 9.75,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "SUBTOTAL",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "2087",
    showCardAuth: true,
    showBarcode: false,
    footerMessage: "THANK YOU FOR SHOPPING AT TRADER JOE'S",
    policyText: "",
  },
  // macy-s — was no-source. Sources:
  //   https://www.macys.com/customer-service/articles/macys-star-reward-faq
  //   https://www.tax.ny.gov/pdf/publications/sales/pub718c_224.pdf
  "macy-s": {
    businessName: "Macy's",
    addressLine1: "Macy's Midtown Sample Store",
    addressLine2: "New York, NY 10001",
    phone: "(212) 555-0119",
    website: "macys.com",
    register: "",
    cashier: "",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "asterisk",
    itemStyle: "lined",
    itemHeader: {
      left: "Item:",
      right: "Amount:",
    },
    sections: [
      {
        rows: [
          {
            label: "Store",
            value: "0000",
          },
          {
            label: "Reg",
            value: "042",
          },
          {
            label: "Trans",
            value: "38127",
          },
          {
            label: "Salesperson",
            value: "000123",
          },
        ],
      },
    ],
    items: [
      {
        name: "Charter Club Cashmere Sweater",
        quantity: 1,
        price: 99.0,
        discount: 39.6,
        notTaxed: true,
      },
      {
        name: "Calvin Klein Dress Shirt",
        quantity: 1,
        price: 69.5,
        discount: 20.85,
        notTaxed: true,
      },
      {
        name: "Fragrance Eau de Parfum 3.4 oz",
        quantity: 1,
        price: 128.0,
      },
    ],
    showSavings: true,
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 8.875,
    showTaxRate: true,
    discount: 0,
    tip: 0,
    labels: {
      itemDiscount: "Sale",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "6630",
    showCardAuth: true,
    showBarcode: true,
    footerMessage: "Thank you for shopping Macy's",
    policyText: "Keep this receipt for returns and exchanges. See macys.com for our current return policy.",
  },
  // amc-theatres — was wrong-format. Sources:
  //   https://www.amctheatres.com/faqs/refunds/refunding-your-order
  //   https://topclassactions.com/lawsuit-settlements/lawsuit-news/class-action-alleges-amc-charges-junk-fees-for-online-movie-tickets/
  //   https://slickdeals.net/f/18006819-amc-theatres-movie-experience-2-tickets-2x-drinks-1x-popcorn-26-email-delivery
  "amc-theatres": {
    businessName: "AMC Theatres",
    logoText: "AMC",
    addressLine1: "AMC Midtown 12 (sample)",
    addressLine2: "New York, NY 10036",
    phone: "",
    website: "amctheatres.com",
    cashier: "",
    register: "",
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    hideStoreLine: true,
    greeting: "Your order is confirmed",
    sections: [
      {
        title: "Your Movie",
        rows: [
          {
            label: "Movie",
            value: "Feature Presentation (PG-13)",
          },
          {
            label: "Date",
            value: "{{date+2}}",
          },
          {
            label: "Showtime",
            value: "7:30 PM",
          },
          {
            label: "Auditorium",
            value: "IMAX 8",
          },
          {
            label: "Seats",
            value: "H7, H8",
          },
        ],
      },
    ],
    items: [
      {
        name: "Adult Ticket",
        quantity: 2,
        price: 21.49,
        notTaxed: true,
      },
      {
        name: "Convenience Fee",
        quantity: 2,
        price: 2.19,
        notTaxed: true,
      },
      {
        name: "Large Popcorn",
        quantity: 1,
        price: 10.99,
      },
      {
        name: "Large Fountain Drink",
        quantity: 2,
        price: 8.29,
      },
    ],
    labels: {
      subtotal: "Subtotal",
    },
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.875,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "Order Total",
    paymentMethod: "Credit Card",
    cardLastFour: "5098",
    paymentInline: true,
    showCardAuth: false,
    afterPayment: [
      {
        rows: [
          {
            label: "Order #",
            value: "1849302275",
          },
          {
            label: "AMC Stubs",
            value: "XXXX XXXX 4410",
          },
        ],
      },
    ],
    qrCode: true,
    showBarcode: true,
    footerMessage: "Show this QR code at the theatre entrance.",
    policyText: "Tickets and food can be refunded before the showtime from your AMC Stubs account. Convenience fees are non-refundable.",
  },
  // asda — was no-source. Sources:
  //   https://www.aol.com/news/man-26-item-supermarket-receipt-173240633.html
  //   https://www.ukbusinessforums.co.uk/threads/incorrect-vat-showing-on-purchase-receipt.355400/
  //   https://corporate.asda.com/newsroom/2022/08/16/asda-confirms-shoppers-nationwide-can-now-access-its-loyalty-programme
  "asda": {
    businessName: "ASDA",
    addressLine1: "Asda Superstore, 120 Kirkstall Road",
    addressLine2: "Leeds LS4 2AA",
    phone: "0113 555 0164",
    website: "asda.com",
    register: "Till 14",
    cashier: "Op 2207",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    dateOrder: "dmy",
    currency: "GBP",
    greeting: "VAT No. 123 4567 89",
    items: [
      {
        name: "SEMI SKIMMED MILK 4PT",
        quantity: 1,
        price: 1.65,
        notTaxed: true,
      },
      {
        name: "MEDIUM WHITE BREAD",
        quantity: 1,
        price: 0.75,
        notTaxed: true,
      },
      {
        name: "FREE RANGE EGGS 6",
        quantity: 1,
        price: 1.99,
        notTaxed: true,
      },
      {
        name: "CHICKEN BREAST FILLETS",
        quantity: 1,
        price: 4.75,
        notTaxed: true,
      },
      {
        name: "BANANAS",
        quantity: 1,
        price: 0.89,
        notTaxed: true,
      },
      {
        name: "JAM",
        quantity: 1,
        price: 1.25,
        notTaxed: true,
      },
      {
        name: "WASHING UP LIQUID",
        quantity: 1,
        price: 1.15,
      },
      {
        name: "KITCHEN ROLL 2PK",
        quantity: 1,
        price: 1.6,
      },
    ],
    taxLabel: "VAT",
    taxRate: 20,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      change: "CHANGE",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    cardLastFour: "6142",
    showCardAuth: true,
    afterPayment: [
      {
        title: "Asda Rewards",
        rows: [
          {
            value: "Scan your Asda Rewards app at the till to add to your Cashpot",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING AT ASDA",
    policyText: "Please retain your receipt as proof of purchase. VAT receipts are available from the customer service desk.",
    taxIncluded: true,
    taxLines: [
      {
        label: "VAT @ 20%",
        rate: 20,
      },
    ],
  },
  // orangetheory — was no-source. Sources:
  //   https://form.jotform.com/251553819811157
  //   https://www.19pine.ai/cancel-subscription/orangetheory-fitness
  "orangetheory": {
    businessName: "Orangetheory Fitness",
    addressLine1: "Orangetheory Fitness Boca Raton (sample studio)",
    addressLine2: "2200 N Federal Hwy, Boca Raton, FL 33431",
    phone: "(561) 555-0192",
    website: "orangetheory.com",
    cashier: "",
    register: "",
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    hideStoreLine: true,
    greeting: "Membership Payment Receipt",
    sections: [
      {
        title: "Membership",
        rows: [
          {
            label: "Member",
            value: "Taylor Brooks",
          },
          {
            label: "Member #",
            value: "OT-000000",
          },
          {
            label: "Plan",
            value: "Elite (8 classes / month)",
          },
          {
            label: "Home studio",
            value: "Boca Raton (sample)",
          },
          {
            label: "Next billing date",
            value: "{{date+30}}",
          },
        ],
      },
    ],
    items: [
      {
        name: "Elite Membership - Monthly Dues",
        quantity: 1,
        price: 139.0,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 0,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "Total Charged",
    paymentMethod: "Credit Card",
    cardLastFour: "9054",
    paymentInline: true,
    showCardAuth: false,
    showBarcode: false,
    footerMessage: "See you in the studio.",
    policyText: "Membership changes and cancellations require 30 days' written notice to your home studio. Billing questions? Contact your home studio.",
  },
  // marriott — was wrong-format. Sources:
  //   https://expenses.alberta.ca/files/2019-10/img_826569657846806969828320190712105156.pdf
  //   https://www.ombudsman.ab.ca/wp-content/uploads/2019/11/Ombudsman-Travel-and-Hosting-2019-19-Q1.pdf
  //   https://thepointsguy.com/news/quick-points-marriott-redemption-fees
  "marriott": {
    businessName: "Marriott Midtown Sample Hotel",
    addressLine1: "740 Example Ave",
    addressLine2: "New York, NY 10036",
    phone: "(212) 555-0140",
    website: "marriott.com",
    cashier: "",
    register: "",
    paperFinish: "invoice",
    paperStyle: "modern",
    fontFamily: "courier",
    headerAlign: "left",
    ruleStyle: "double",
    itemStyle: "lined",
    itemHeader: {
      left: "REFERENCES",
      right: "CHARGES",
    },
    greeting: "GUEST FOLIO",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "ROOM",
            value: "1814",
          },
          {
            label: "NAME",
            value: "MORGAN/A",
          },
          {
            label: "RATE",
            value: "389.00",
          },
          {
            label: "ARRIVE",
            value: "{{date+0}}  15:12",
          },
          {
            label: "DEPART",
            value: "{{date+2}}  11:00",
          },
          {
            label: "ACCT#",
            value: "60417",
          },
          {
            label: "MBV#",
            value: "XXXXX3306",
          },
        ],
      },
    ],
    items: [
      {
        name: "ROOM 1814",
        quantity: 2,
        price: 389.0,
      },
      {
        name: "NYC UNIT FEE 1814",
        quantity: 2,
        price: 2.0,
        notTaxed: true,
      },
      {
        name: "RESTAURANT",
        quantity: 1,
        price: 46.3,
        notTaxed: true,
      },
    ],
    currency: "USD",
    taxLabel: "ROOM TAX",
    taxRate: 14.75,
    taxLines: [
      {
        label: "ROOM TAX",
        rate: 8.875,
      },
      {
        label: "OCC TAX",
        rate: 5.875,
      },
    ],
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "NET CHARGES",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "2219",
    showCardAuth: false,
    paymentName: "MC CARD",
    afterPayment: [
      {
        rows: [
          {
            label: "TO BE SETTLED TO",
            value: "MASTERCARD",
          },
          {
            label: "CURRENT BALANCE",
            value: ".00",
          },
        ],
      },
    ],
    showBarcode: false,
    footerMessage: "Your Marriott Bonvoy points earned on eligible charges will be credited to your account.",
    policyText: "This statement is your only receipt. You have agreed to pay for all amounts charged to you on this account.\nSignature X",
  },
  // hilton — was wrong-format. Sources:
  //   https://travel.umbc.edu/wp-content/uploads/sites/801/2025/08/Sample-hotel-folio.pdf
  //   https://static.nhtsa.gov/odi/inv/2026/INRD-RQ26001-11370P1.pdf
  "hilton": {
    businessName: "Hilton Chicago Loop (sample)",
    addressLine1: "300 E Example St",
    addressLine2: "Chicago, IL 60601 United States of America",
    phone: "312-555-0175",
    website: "www.hilton.com or 1 800 HILTONS",
    cashier: "Cashier ID: JPARKER",
    register: "",
    paperFinish: "invoice",
    paperStyle: "modern",
    fontFamily: "roboto",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    itemHeader: {
      left: "DESCRIPTION",
      right: "CHARGES",
    },
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Room No",
            value: "1207/K1",
          },
          {
            label: "Arrival Date",
            value: "{{date+0}} 3:42 PM",
          },
          {
            label: "Departure Date",
            value: "{{date+2}} 10:05 AM",
          },
          {
            label: "Adult/Child",
            value: "1/0",
          },
          {
            label: "Room Rate",
            value: "229.00",
          },
          {
            label: "HH #",
            value: "000000000",
          },
          {
            label: "Folio No",
            value: "6418204 A",
          },
          {
            label: "Confirmation Number",
            value: "3150098712",
          },
        ],
      },
    ],
    items: [
      {
        name: "GUEST ROOM",
        quantity: 2,
        price: 229.0,
      },
    ],
    currency: "USD",
    taxLabel: "STATE OCCUPANCY TAX",
    taxRate: 17.4,
    taxLines: [
      {
        label: "STATE OCCUPANCY TAX",
        rate: 11.9,
      },
      {
        label: "CITY OCCUPANCY TAX",
        rate: 4.5,
      },
      {
        label: "COUNTY OCCUPANCY TAX",
        rate: 1.0,
      },
    ],
    showTaxRate: false,
    hideSubtotal: true,
    discount: 0,
    tip: 0,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    paymentName: "VS *4417",
    showCardAuth: false,
    afterPayment: [
      {
        rows: [
          {
            label: "**BALANCE**",
            value: "$0.00",
          },
        ],
      },
      {
        title: "CREDIT CARD DETAIL",
        rows: [
          {
            label: "APPR CODE",
            value: "071538A",
          },
          {
            label: "MERCHANT ID",
            value: "000100000000",
          },
          {
            label: "TRANSACTION ID",
            value: "0482916",
          },
          {
            label: "TRANS TYPE",
            value: "Sale",
          },
        ],
      },
    ],
    showBarcode: false,
    footerMessage: "Hilton Honors(R) stays are posted within 72 hours of checkout.",
    policyText: "Thank you for choosing Hilton. Book your next stay at hilton.com.",
  },
  // balenciaga — was no-source. Sources:
  //   https://forum.purseblog.com/threads/authenticate-this-balenciaga.936807/page-117
  //   https://forum.purseblog.com/threads/barneys-ny-forgot-the-authenticity-paperwork.138521/
  "balenciaga": {
    logoText: "BALENCIAGA",
    businessName: "Balenciaga New York",
    addressLine1: "Madison Avenue Boutique",
    addressLine2: "New York, NY 10065",
    phone: "(212) 555-0187",
    website: "balenciaga.com",
    hideStoreLine: true,
    cashier: "Camille R.",
    fontFamily: "montserrat",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "lined",
    itemHeader: {
      left: "Description",
      right: "Amount",
    },
    skuFirst: true,
    items: [
      {
        name: "Le City Small Bag - Black",
        quantity: 1,
        price: 3350.0,
        sku: "7654321",
        modifiers: ["Calfskin / Aged Silver"],
      },
      {
        name: "Speed 2.0 Recycled Knit Sneaker - Size 42",
        quantity: 1,
        price: 1050.0,
        sku: "6170902",
      },
    ],
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 8.875,
    showTaxRate: false,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "************4417",
      },
      {
        label: "AUTH CODE",
        value: "082714",
      },
      {
        label: "ENTRY",
        value: "CHIP",
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    afterPayment: [
      {
        rows: [
          {
            label: "Sales Associate",
            value: "Camille R.",
          },
          {
            label: "Client",
            value: "SAMPLE CLIENT",
          },
        ],
      },
    ],
    footerMessage: "Thank you for shopping at Balenciaga",
    policyText: "Exchanges and returns of unworn merchandise with original tags and this receipt within 30 days of purchase. Final sale items are not eligible.",
    showBarcode: true,
    paperStyle: "minimal",
  },
  // lyft — was wrong-format. Sources:
  //   https://apifox.com/apidoc/docs-site/406103/api-5364782
  //   https://getridewise.com/blog/uber-lyft-receipts-business-expenses-2026
  //   https://imagetotable.ai/extract/lyft-trip-screenshot
  //   https://tailride.so/blog/how-to-print-a-receipt-from-lyft
  "lyft": {
    businessName: "Lyft",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "lyft.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    paperFinish: "email",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    dividers: "minimal",
    greeting: "Thanks for riding with Marcus!",
    sections: [
      {
        title: "Ride details",
        rows: [
          {
            label: "Pickup 8:42 AM",
            value: "1830 Mission St, San Francisco, CA",
          },
          {
            label: "Drop-off 9:01 AM",
            value: "870 Market St, San Francisco, CA",
          },
          {
            label: "Ride type",
            value: "Lyft Standard",
          },
        ],
      },
    ],
    itemStyle: "lined",
    items: [
      {
        name: "Lyft fare (6.21 mi, 18m 47s)",
        quantity: 1,
        price: 18.42,
      },
      {
        name: "Service fee",
        quantity: 1,
        price: 2.95,
      },
    ],
    tip: 4.0,
    hideSubtotal: true,
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 0,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    paymentInline: true,
    showCardAuth: false,
    showBarcode: false,
    footerMessage: "Lost something? Visit help.lyft.com to contact your driver.",
    policyText: "Lyft, Inc. · San Francisco, CA",
    paperStyle: "minimal",
  },
  // coach — was no-source. Sources:
  //   https://careers.tapestry.com/coach/job/Sales-Associate-III-Premium-Outlets-International/726178200
  "coach": {
    logoText: "COACH",
    businessName: "Coach",
    addressLine1: "Fifth Avenue Store",
    addressLine2: "New York, NY 10001",
    phone: "(212) 555-0164",
    website: "coach.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "STORE 1042  REG 02  TRANS 3381",
          },
          {
            label: "Associate",
            value: "Jordan P.",
          },
        ],
      },
    ],
    fontFamily: "ibm-plex-mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "stacked",
    skuFirst: true,
    items: [
      {
        name: "Tabby Shoulder Bag 26 - Black",
        quantity: 1,
        price: 450.0,
        sku: "CN712",
      },
      {
        name: "Leather Card Case - Saddle",
        quantity: 1,
        price: 95.0,
        sku: "CR998",
      },
    ],
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 8.875,
    showTaxRate: false,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "AUTH",
        value: "514802",
      },
      {
        label: "ENTRY",
        value: "CONTACTLESS",
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    footerMessage: "Thank you for shopping at Coach",
    policyText: "Unused merchandise in original condition may be returned or exchanged within 30 days with this receipt.",
    showBarcode: true,
    paperStyle: "thermal",
  },
  // popeyes — was missing-key-details. Sources:
  //   https://www.tellpopeyes.com/
  //   https://www.tellpopeyes.it.com/?p=158
  "popeyes": {
    businessName: "Popeyes Louisiana Kitchen #11482",
    addressLine1: "4821 Airline Dr",
    addressLine2: "Metairie, LA 70001",
    phone: "(504) 555-0139",
    website: "popeyes.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "DRIVE THRU",
          },
          {
            label: "Cashier",
            value: "Keisha",
          },
          {
            label: "Order",
            value: "214",
          },
        ],
      },
    ],
    fontFamily: "share-tech-mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    items: [
      {
        name: "Classic Chicken Sandwich Combo",
        quantity: 1,
        price: 10.49,
        modifiers: ["Reg Cajun Fries", "Reg Sweet Tea"],
      },
      {
        name: "3Pc Tenders Combo",
        quantity: 1,
        price: 11.99,
        modifiers: ["Spicy", "Reg Mac & Cheese", "Reg Lemonade", "Blackened Ranch"],
      },
      {
        name: "Biscuit",
        quantity: 2,
        price: 1.49,
      },
      {
        name: "Red Beans & Rice Reg",
        quantity: 1,
        price: 3.29,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 9.2,
    showTaxRate: false,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "Auth Code",
        value: "07215C",
      },
      {
        label: "Entry",
        value: "Contactless",
      },
    ],
    labels: {
      subtotal: "Subtotal",
    },
    orderNumber: "ORDER 214",
    afterPayment: [
      {
        title: "Tell us about your visit!",
        rows: [
          {
            value: "tellpopeyes.com",
          },
          {
            label: "Restaurant #",
            value: "11482",
          },
          {
            label: "Survey Code",
            value: "11482-0214-2710-6393",
          },
        ],
      },
    ],
    footerMessage: "Love That Chicken From Popeyes",
    showBarcode: false,
    paperStyle: "thermal",
  },
  // o-reilly-auto-parts — was missing-key-details. Sources:
  //   https://oreillyauto.com/warranty
  //   https://www.oreillyauto.com/orewards-faq-spanish
  //   https://get.partstech.com/oreilly
  "o-reilly-auto-parts": {
    businessName: "O'Reilly Auto Parts #2214",
    addressLine1: "1450 E Battlefield St",
    addressLine2: "Springfield, MO 65804",
    phone: "(417) 555-0172",
    website: "oreillyauto.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "INVOICE #",
            value: "2214-381947",
          },
          {
            label: "COUNTERPERSON",
            value: "TYLER M",
          },
          {
            label: "REG",
            value: "02",
          },
        ],
      },
    ],
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "stacked",
    skuFirst: true,
    items: [
      {
        name: "DURALAST GOLD BATTERY",
        quantity: 1,
        price: 219.99,
        sku: "DLG 48H6-DLG",
      },
      {
        name: "CORE CHARGE",
        quantity: 1,
        price: 22.0,
        sku: "DLG 48H6-DLG",
      },
      {
        name: "MOBIL 1 5W-30 FULL SYN 5QT",
        quantity: 1,
        price: 32.99,
        sku: "MOB 124317",
      },
      {
        name: "MICROGARD OIL FILTER",
        quantity: 1,
        price: 6.99,
        sku: "MGD MGL51372",
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 8.1,
    showTaxRate: false,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "DEBIT",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "APPROVAL",
        value: "318804",
      },
      {
        label: "ENTRY",
        value: "CHIP",
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    afterPayment: [
      {
        rows: [
          {
            label: "O'REWARDS MEMBER",
            value: "XXXXXX8823",
          },
        ],
      },
    ],
    footerMessage: "Thank you for shopping O'Reilly Auto Parts",
    policyText: "Keep this receipt. The original sales receipt is required for warranty service and core refunds.",
    showBarcode: true,
    paperStyle: "thermal",
  },
  // jack-in-the-box — was missing-key-details. Sources:
  //   https://www.jacklistens.com/
  //   https://slickdeals.net/f/8101850-fast-food-receipt-survey-validation-codes?p=78172096
  //   https://dune-equipment-b39.notion.site/JackListens-How-to-Provide-Feedback-and-Earn-Rewards-at-Jack-in-the-Box-704c5c2e2ecc49298f1225b4a7e4f7b6
  "jack-in-the-box": {
    businessName: "Jack in the Box #3471",
    addressLine1: "5120 Convoy St",
    addressLine2: "San Diego, CA 92111",
    phone: "(858) 555-0118",
    website: "jackinthebox.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "DRIVE THRU",
          },
          {
            label: "Order #",
            value: "47",
          },
          {
            label: "Cashier",
            value: "Angel",
          },
        ],
      },
    ],
    fontFamily: "share-tech-mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    items: [
      {
        name: "Jumbo Jack Cheese Combo",
        quantity: 1,
        price: 10.79,
        modifiers: ["Med Curly Fries", "Med Coke"],
      },
      {
        name: "2 Tacos",
        quantity: 1,
        price: 2.49,
      },
      {
        name: "Sauced & Loaded Fries",
        quantity: 1,
        price: 4.29,
      },
      {
        name: "Oreo Cookie Shake Reg",
        quantity: 1,
        price: 5.49,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 7.75,
    showTaxRate: false,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "************4417",
      },
      {
        label: "AUTH",
        value: "042918",
      },
    ],
    labels: {
      subtotal: "Subtotal",
    },
    orderNumber: "ORDER 47",
    afterPayment: [
      {
        title: "We want to hear from you!",
        rows: [
          {
            value: "Tell us at jacklistens.com",
          },
          {
            label: "Store #",
            value: "3471",
          },
          {
            label: "Survey Code",
            value: "3471 0047 2710 26",
          },
        ],
      },
    ],
    footerMessage: "Thank you for choosing Jack in the Box",
    showBarcode: false,
    paperStyle: "thermal",
  },
  // expedia — was wrong-format. Sources:
  //   https://htmlscript.auburn.edu/academic/education/ed/documents_uploaded/graduatetravelawards/mzf0029bt2018090312444932640.pdf
  //   https://ai.eecs.umich.edu/people/conway/Awards/CHM/Travel/Expedia%20travel%20confirmation%20-%20April%2024,%202014%20-%20(Itin%23%20172130665108).htm
  //   https://developers.expediagroup.com/docs/products/rapid/lodging/manage-booking/booking-receipts
  "expedia": {
    businessName: "Expedia",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "expedia.com",
    hideStoreLine: true,
    paperFinish: "email",
    fontFamily: "sans",
    headerAlign: "left",
    ruleStyle: "solid",
    greeting: "Receipt for Chicago\nItinerary # 7284916305812",
    sections: [
      {
        title: "Booked Items",
        rows: [
          {
            label: "Hotel:",
            value: "Riverside Loop Hotel Chicago",
          },
          {
            label: "Check-in:",
            value: "{{date+14}}",
          },
          {
            label: "Check-out:",
            value: "{{date+16}}",
          },
          {
            label: "Room:",
            value: "1 King Bed, Non-Smoking",
          },
        ],
      },
      {
        title: "Traveler Information",
        rows: [
          {
            value: "SAMPLE TRAVELER - Adult",
          },
        ],
      },
      {
        title: "Cost Summary",
        rows: [
          {
            label: "Booked Date:",
            value: "{{date+0}}",
          },
        ],
      },
    ],
    itemStyle: "lined",
    items: [
      {
        name: "Room price (2 nights)",
        quantity: 1,
        price: 318.0,
      },
      {
        name: "Taxes & Fees",
        quantity: 1,
        price: 58.83,
      },
    ],
    hideSubtotal: true,
    currency: "USD",
    taxLabel: "Taxes & Fees",
    taxRate: 0,
    grandTotalLabel: "Total:",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    paymentInline: true,
    showCardAuth: false,
    showBarcode: false,
    footerMessage: "All prices quoted in US dollars.",
    policyText: "Expedia, Inc. · Seattle, WA",
    paperStyle: "modern",
  },
  // xbox-store — was wrong-format. Sources:
  //   https://support.microsoft.com/en-us/accounts-billing/tax-invoices-breakdowns-and-registration-numbers-for-microsoft-store
  //   https://www.microsoft.com/en-sg/store/b/order-tracking?xr=footnav
  //   https://forums.anandtech.com/threads/xbox-360s-shipping.1744896
  "xbox-store": {
    businessName: "Microsoft Store",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "xbox.com",
    hideStoreLine: true,
    paperFinish: "email",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    dividers: "minimal",
    greeting: "Thanks for your order",
    sections: [
      {
        title: "Order details",
        rows: [
          {
            label: "Order number",
            value: "8840173562918",
          },
          {
            label: "Order date",
            value: "{{date+0}}",
          },
          {
            label: "Microsoft account",
            value: "player@example.com",
          },
        ],
      },
    ],
    itemStyle: "lined",
    itemHeader: {
      left: "Product",
      right: "Price",
    },
    items: [
      {
        name: "Xbox Game Pass Ultimate - 1 Month",
        quantity: 1,
        price: 29.99,
        modifiers: ["Subscription"],
      },
      {
        name: "EA SPORTS FC 26 Standard Edition",
        quantity: 1,
        price: 69.99,
        modifiers: ["Game - Xbox Series X|S"],
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 10.1,
    showTaxRate: false,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    paymentInline: true,
    showCardAuth: false,
    showBarcode: false,
    footerMessage: "View your order history at account.microsoft.com/billing/orders",
    policyText: "Microsoft Corporation · One Microsoft Way · Redmond, WA 98052\nPrivacy Statement",
    paperStyle: "minimal",
  },
  // cracker-barrel — was no-source. Sources:
  //   https://wanderlog.com/place/details/2285036/cracker-barrel-old-country-store
  //   https://wanderlog.com/place/details/791076/cracker-barrel-old-country-store
  //   https://dune-equipment-b39.notion.site/Unlocking-the-Customer-Experience-Exploring-the-Cracker-Barrel-Survey-2e3d1e0292b04cb49786bceb3bafb62e
  "cracker-barrel": {
    businessName: "Cracker Barrel Old Country Store #0472",
    addressLine1: "2200 Hartmann Dr",
    addressLine2: "Lebanon, TN 37087",
    phone: "(615) 555-0126",
    website: "crackerbarrel.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Server",
            value: "Tammy",
          },
          {
            label: "Table",
            value: "34",
          },
          {
            label: "Guests",
            value: "2",
          },
          {
            label: "Check #",
            value: "4417",
          },
        ],
      },
    ],
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    items: [
      {
        name: "Momma's Pancake Breakfast",
        quantity: 1,
        price: 12.49,
        modifiers: ["Eggs Scrambled", "Bacon"],
      },
      {
        name: "Chicken n' Dumplins",
        quantity: 1,
        price: 13.99,
        modifiers: ["Hashbrown Casserole", "Fried Okra"],
      },
      {
        name: "Sweet Tea",
        quantity: 2,
        price: 3.49,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 9.75,
    showTaxRate: false,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "AUTH",
        value: "639210",
      },
    ],
    labels: {
      subtotal: "Subtotal",
    },
    qrCode: true,
    afterPayment: [
      {
        title: "Tell us about your visit",
        rows: [
          {
            label: "Survey Code",
            value: "0472-4417-2710-55",
          },
        ],
      },
    ],
    footerMessage: "Thank you for visiting Cracker Barrel",
    showBarcode: true,
    paperStyle: "thermal",
  },
  // ups — was missing-key-details. Sources:
  //   https://www.scribd.com/document/338944143/UPS-Receipt
  //   https://fulfillmenthubusa.com/how-to-find-your-tracking-number-on-a-ups-receipt/
  //   https://www.shipaid.com/blogs/ecommerce-shipping/how-to-put-insurance-on-a-ups-package
  "ups": {
    businessName: "The UPS Store #4821",
    addressLine1: "2950 Peachtree Rd NW",
    addressLine2: "Atlanta, GA 30305",
    phone: "(404) 555-0153",
    website: "theupsstore.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Associate",
            value: "Darnell",
          },
          {
            label: "Trans #",
            value: "118734",
          },
        ],
      },
    ],
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "stacked",
    items: [
      {
        name: "UPS Ground",
        quantity: 1,
        price: 18.47,
        notTaxed: true,
        modifiers: ["Trk# 1Z 4E8 W71 03 1846 2297", "Wt 4.2 lb  To ZIP 60614", "Declared Value 150.00"],
      },
      {
        name: "Box 12x12x12",
        quantity: 1,
        price: 6.49,
      },
      {
        name: "Pack & Ship Service",
        quantity: 1,
        price: 7.99,
        notTaxed: true,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.9,
    showTaxRate: false,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "AUTH",
        value: "227103",
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    footerMessage: "Track your package at ups.com",
    policyText: "Please retain this receipt for your records. It is required for any claim. This is not a shipping label.",
    showBarcode: true,
    paperStyle: "thermal",
  },
  // starbucks — was missing-key-details. Sources:
  //   https://tailride.so/blog/how-to-get-a-receipt-from-starbucks
  //   https://www.brainbound.blog/starbucks-survey-guide-rewards
  //   https://getmylo.ai/blog/starbucks-receipt-lookup
  "starbucks": {
    businessName: "Starbucks Store #21847",
    addressLine1: "2150 Western Ave",
    addressLine2: "Seattle, WA 98121",
    phone: "(206) 555-0147",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "CHK 704518",
          },
          {
            value: "Reg: 2  Drawer: 1",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    items: [
      {
        name: "Gr Caramel Macchiato",
        quantity: 1,
        price: 5.95,
        addons: [
          {
            name: "Add Shot",
            price: 1.25,
          },
        ],
      },
      {
        name: "Vt Iced Shaken Espresso",
        quantity: 1,
        price: 6.25,
      },
      {
        name: "Bacon Gouda Sandwich",
        quantity: 1,
        price: 5.75,
      },
      {
        name: "Butter Croissant",
        quantity: 1,
        price: 3.95,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 10.35,
    showTaxRate: false,
    grandTotalLabel: "Total",
    labels: {
      subtotal: "Subtotal",
      change: "Change Due",
    },
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "Visa",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "Auth",
        value: "052381",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            value: "---- Check Closed ----",
          },
        ],
      },
    ],
    footerMessage: "Tell us about your visit at\nwww.mystarbucksvisit.com\nSurvey code: 2184 7051 8331 04",
    policyText: "Join Starbucks Rewards and earn Stars on every purchase.\nstarbucks.com/rewards",
    showBarcode: false,
  },
  // gamestop — was no-source. Sources:
  //   https://www.gamestop.com/fullreturnpolicy
  //   https://www.shacknews.com/article/129371/gamestop-return-policy-refunds-online-orders-and-exceptions
  //   https://twinfinite.net/guides/gamestop-amazon-how-to-redeem-codes/
  "gamestop": {
    businessName: "GameStop #4471",
    addressLine1: "2310 Hall Johnson Rd, Suite 140",
    addressLine2: "Grapevine, TX 76051",
    phone: "(817) 555-0182",
    cashier: "Tyler M",
    register: "02",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    paperStyle: "thermal",
    items: [
      {
        name: "Mario Kart World - Nintendo Switch 2",
        quantity: 1,
        price: 79.99,
        sku: "424381",
      },
      {
        name: "DualSense Wireless Controller - Midnight Black",
        quantity: 1,
        price: 74.99,
        sku: "416902",
      },
      {
        name: "Pre-Owned Elden Ring - PS5",
        quantity: 1,
        price: 34.99,
        sku: "231577",
      },
      {
        name: "PlayStation Store $50 Gift Card",
        quantity: 1,
        price: 50.0,
        notTaxed: true,
      },
    ],
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 8.25,
    showTaxRate: false,
    labels: {
      subtotal: "Subtotal",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: true,
    footerMessage: "Thank you for shopping at GameStop!",
    policyText: "Keep your receipt. New unopened products may be returned within 15 days of purchase; pre-owned products within 7 days. Full policy: gamestop.com/fullreturnpolicy",
    showBarcode: true,
  },
  // walgreens — was missing-key-details. Sources:
  //   https://www.scribd.com/document/880548896/Veryfi-API-Demo-2
  //   https://commons.wikimedia.org/wiki/File:Walgreens_customer_receipt_with_RX_number.jpg
  //   https://www.walgreens.com/returns
  //   https://www.consumeraffairs.com/news/how-to-coupon-at-walgreens-like-a-pro-and-actually-save-serious-money-032626.html
  "walgreens": {
    businessName: "Walgreens",
    addressLine1: "#08142 10593 NARCOOSSEE RD",
    addressLine2: "ORLANDO, FL 32832",
    phone: "(407) 555-0136",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "REG 2  TRAN 4182  STORE 08142",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "lined",
    paperStyle: "thermal",
    items: [
      {
        name: "ADVIL 200MG TABLETS 50CT",
        quantity: 1,
        price: 10.49,
        notTaxed: true,
        discount: 2.0,
      },
      {
        name: "COLGATE TOTAL WHITENING 4.8OZ",
        quantity: 1,
        price: 6.49,
      },
      {
        name: "COCA-COLA 20OZ",
        quantity: 2,
        price: 2.79,
      },
      {
        name: "REESE'S PB CUPS 1.5OZ",
        quantity: 1,
        price: 1.99,
      },
    ],
    currency: "USD",
    taxLabel: "SALES TAX",
    taxRate: 6.5,
    showTaxRate: true,
    labels: {
      subtotal: "SUBTOTAL",
      itemDiscount: "myWalgreens Savings",
      change: "CHANGE",
    },
    grandTotalLabel: "TOTAL",
    showSavings: true,
    paymentMethod: "Debit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "DEBIT",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "AUTH CODE",
        value: "318604",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            value: "FOR FULL DETAILS SEE MYWALGREENS.COM",
          },
          {
            value: "RFN# 0814-2027-4182-1027-2610",
          },
        ],
      },
    ],
    footerMessage: "THANK YOU FOR SHOPPING AT WALGREENS",
    policyText: "Tell us about your visit at www.walgreenslistens.com",
    showBarcode: true,
  },
  // dairy-queen — was no-source. Sources:
  //   https://www.fox9.com/news/dairy-queen-85-cent-blizzard-deal-2025
  //   https://issuu.com/officialdqfanfeedback/docs/dqfanfeedback
  "dairy-queen": {
    businessName: "Dairy Queen #13527",
    addressLine1: "8850 Lakeview Rd",
    addressLine2: "Bloomington, MN 55438",
    phone: "(952) 555-0164",
    cashier: "Kayla",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    items: [
      {
        name: "Md Oreo Blizzard",
        quantity: 1,
        price: 6.29,
      },
      {
        name: "4 Pc Chicken Strip Basket",
        quantity: 1,
        price: 9.99,
        modifiers: ["Country Gravy", "Md Coke"],
      },
      {
        name: "Sm Dipped Cone",
        quantity: 2,
        price: 3.79,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 7.875,
    showTaxRate: false,
    labels: {
      subtotal: "Subtotal",
      change: "Change",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "Approval",
        value: "071583",
      },
    ],
    orderNumber: "ORDER 47",
    footerMessage: "Tell us how we did!\nDQfanfeedback.com",
    policyText: "Earn points on every order with DQ Rewards in the DQ app.",
    showBarcode: false,
  },
  // hyatt — was wrong-format. Sources:
  //   https://htmlscript.auburn.edu/academic/education/ed/documents_uploaded/travelrequests/mjm0055-2026032722560.pdf
  //   https://legis.wisconsin.gov/eupdates/asm35/Folio_31746110.pdf
  //   https://agendalink.fortbendcountytx.gov/docs/2023/CCTR/20231010_3838/58502%5FSneed%2DGrand%5FHyatt%2Epdf
  "hyatt": {
    businessName: "Hyatt Regency Potomac Yard",
    addressLine1: "1850 S Eads St",
    addressLine2: "Arlington, VA 22202",
    phone: "Tel: 703-555-0123",
    website: "www.hyatt.com",
    invoice: true,
    numberLabel: "Folio No.",
    hideStoreLine: true,
    headerAlign: "left",
    fontFamily: "sans",
    ruleStyle: "solid",
    paperStyle: "modern",
    paperFinish: "invoice",
    greeting: "INVOICE",
    sections: [
      {
        rows: [
          {
            value: "SAMPLE, ALEX",
          },
          {
            value: "410 Elm Street",
          },
          {
            value: "Columbus OH 43215",
          },
          {
            value: "United States",
          },
        ],
      },
      {
        rows: [
          {
            label: "Room No.",
            value: "0814",
          },
          {
            label: "Arrival",
            value: "{{date-3}}",
          },
          {
            label: "Departure",
            value: "{{date+0}}",
          },
          {
            label: "Confirmation No.",
            value: "2715840396",
          },
          {
            label: "Folio Window",
            value: "1",
          },
        ],
      },
    ],
    itemStyle: "lined",
    itemHeader: {
      left: "Description",
      right: "Charges",
    },
    items: [
      {
        name: "Accommodation",
        quantity: 1,
        price: 219.0,
      },
      {
        name: "Accommodation",
        quantity: 1,
        price: 219.0,
      },
      {
        name: "Accommodation",
        quantity: 1,
        price: 219.0,
      },
    ],
    currency: "USD",
    taxLabel: "Occupancy Tax",
    taxRate: 0,
    taxLines: [
      {
        label: "State Occupancy Tax - 6.0%",
        rate: 6.0,
      },
      {
        label: "County Occupancy Tax - 8.25%",
        rate: 8.25,
      },
    ],
    showTaxRate: false,
    hideSubtotal: true,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    paymentName: "American Express",
    cardLastFour: "1009",
    showCardAuth: false,
    cardRows: [
      {
        label: "American Express",
        value: "XXXXXXXXXXXX1009 XX/XX",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            label: "Balance",
            value: "0.00",
          },
        ],
      },
      {
        title: "World of Hyatt Summary",
        rows: [
          {
            label: "Membership",
            value: "XXXXXX418K",
          },
          {
            label: "Bonus Codes",
            value: "",
          },
          {
            label: "Qualifying Nights",
            value: "3",
          },
        ],
      },
    ],
    footerMessage: "WE HOPE YOU ENJOYED YOUR STAY WITH US!\nFor inquiries concerning your bill, please call 888-555-0177\nFor future reservations please visit us at www.hyatt.com",
    policyText: "Guest Signature ____________________\nI agree that my liability for this bill is not waived and I agree to be held personally liable in the event that the indicated person, company or association fails to pay for any part or the full amount of these charges.",
    showBarcode: false,
  },
  // stop-shop — was no-source. Sources:
  //   https://fuelrewards.com/fuelrewards/stop-and-shop-terms
  //   https://theproducenews.com/headlines/stop-shop-rolls-out-savings-station-kiosks-0?page=0
  //   https://www.mass.gov/guides/sales-and-use-tax
  "stop-shop": {
    businessName: "Stop & Shop #0418",
    addressLine1: "745 Adams St",
    addressLine2: "Quincy, MA 02169",
    phone: "(617) 555-0139",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    paperStyle: "thermal",
    items: [
      {
        name: "SS WHOLE MILK GAL",
        quantity: 1,
        price: 4.29,
        notTaxed: true,
      },
      {
        name: "NP LG BROWN EGGS 12CT",
        quantity: 1,
        price: 5.49,
        notTaxed: true,
        discount: 1.0,
      },
      {
        name: "BANANAS",
        quantity: 2.4,
        price: 0.65,
        unit: "lb",
        notTaxed: true,
      },
      {
        name: "COCA-COLA 12PK 12OZ",
        quantity: 1,
        price: 8.99,
        notTaxed: true,
        discount: 2.0,
      },
      {
        name: "BOTTLE DEPOSIT",
        quantity: 12,
        price: 0.05,
        notTaxed: true,
      },
      {
        name: "BOUNTY SELECT-A-SIZE 6 DBL",
        quantity: 1,
        price: 12.99,
        taxFlag: "T",
      },
      {
        name: "TIDE PODS 42CT",
        quantity: 1,
        price: 13.99,
        taxFlag: "T",
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 6.25,
    showTaxRate: true,
    labels: {
      subtotal: "SUBTOTAL",
      change: "CHANGE",
    },
    grandTotalLabel: "TOTAL",
    showSavings: true,
    paymentMethod: "Debit Card",
    cardLastFour: "4417",
    showCardAuth: true,
    footerMessage: "Thank you for shopping at Stop & Shop!",
    policyText: "Earn GO Rewards points with your Stop & Shop Card on groceries and gas.",
    showBarcode: true,
  },
  // didi — was wrong-format. Sources:
  //   https://expansion.mx/tecnologia/2025/01/17/por-que-tarifas-de-uber-y-didi-varian-de-un-telefono-a-otro
  //   https://forbes.com.mx/?p=511534
  //   https://www.xataka.com.mx/aplicaciones/didi-ciudad-mexico-probamos-competencia-uber-asi-fue-nuestra-experiencia
  "didi": {
    businessName: "DiDi",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    hideStoreLine: true,
    headerAlign: "left",
    fontFamily: "sans",
    ruleStyle: "solid",
    paperFinish: "email",
    greeting: "Gracias por viajar con DiDi",
    sections: [
      {
        title: "Detalles del viaje",
        rows: [
          {
            label: "Servicio",
            value: "DiDi Express",
          },
          {
            label: "Origen",
            value: "Col. Roma Norte, Cuauhtémoc, CDMX",
          },
          {
            label: "Destino",
            value: "Col. Del Valle Centro, Benito Juárez, CDMX",
          },
          {
            label: "Distancia",
            value: "9.2 km",
          },
          {
            label: "Duración",
            value: "24 min",
          },
          {
            label: "Conductor",
            value: "Luis",
          },
        ],
      },
    ],
    itemStyle: "lined",
    items: [
      {
        name: "Tarifa base",
        quantity: 1,
        price: 10.0,
      },
      {
        name: "Costo por kilómetro",
        quantity: 9.2,
        price: 4.1,
        unit: "km",
      },
      {
        name: "Costo por duración",
        quantity: 24,
        price: 1.65,
        unit: "min",
      },
      {
        name: "Cuota de solicitud",
        quantity: 1,
        price: 7.5,
      },
    ],
    currency: "MXN",
    dateOrder: "dmy",
    taxLabel: "IVA",
    taxRate: 0,
    showTaxRate: false,
    hideSubtotal: true,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    paymentInline: true,
    labels: {
      paymentMethod: "Método de pago",
    },
    footerMessage: "¿Necesitas factura? Solicítala desde la app de DiDi.",
    showBarcode: false,
  },
  // woolworths-au — was wrong-format. Sources:
  //   https://commons.wikimedia.org/wiki/File:Receipt-woolworth.jpg
  //   https://en.wikipedia.org/wiki/Everyday_Rewards
  //   https://www.executivetraveller.com/woolworths-rewards
  "woolworths-au": {
    businessName: "",
    addressLine1: "NORTH STRATHFIELD PH: 0270100142",
    addressLine2: "Store Manager is Priya",
    phone: "",
    greeting: "WOOLWORTHS TAX INVOICE - ABN 46 100 237 815",
    hideStoreLine: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "stacked",
    paperStyle: "thermal",
    itemHeader: {
      left: "",
      right: "$",
    },
    items: [
      {
        name: "*WW SANDWICH CLASSIC EGG & LETTUCE",
        quantity: 1,
        price: 6.0,
      },
      {
        name: "APPLE PINK LADY",
        quantity: 0.3,
        price: 5.9,
        unit: "kg NET",
        notTaxed: true,
      },
      {
        name: "WW FULL CREAM MILK 2L",
        quantity: 1,
        price: 3.1,
        notTaxed: true,
      },
      {
        name: "BANANA CAVENDISH",
        quantity: 0.6,
        price: 3.5,
        unit: "kg NET",
        notTaxed: true,
      },
      {
        name: "*SMITHS CRINKLE CUT ORIGINAL 170G",
        quantity: 1,
        price: 5.0,
      },
      {
        name: "*GOLDEN PIKELETS 8 PK 200GM",
        quantity: 1,
        price: 4.5,
        discount: 1.5,
      },
    ],
    currency: "AUD",
    dateOrder: "dmy",
    taxLabel: "Total includes GST",
    taxRate: 10,
    taxIncluded: true,
    showTaxRate: false,
    labels: {
      subtotal: "SUBTOTAL",
      itemDiscount: "OFFER",
      change: "CHANGE",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    paymentName: "EFTPOS",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        value: "WOOLWORTHS 3306",
      },
      {
        value: "NORTH STRATH NSW",
      },
      {
        label: "CARD NO",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "AUTH",
        value: "482913",
      },
    ],
    afterPayment: [
      {
        title: "Everyday Rewards",
        rows: [
          {
            label: "Card",
            value: "XXXXXXXXX2208",
          },
          {
            label: "Points this shop",
            value: "14",
          },
        ],
      },
    ],
    footerMessage: "Thank you for shopping at Woolworths",
    showBarcode: true,
  },
  // alaska-airlines — was wrong-format. Sources:
  //   https://alaskalandmine.com/wp-content/uploads/2025/02/Boyle-tickets.pdf
  //   https://alaskalandmine.com/wp-content/uploads/2024/08/Huber-TA8240484-JNU-3.3.24-3.8.24_Redacted.pdf
  //   https://docs.cpuc.ca.gov/PublishedDocs/Efile/G000/M583/K961/583961211.PDF
  "alaska-airlines": {
    businessName: "Alaska Airlines",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    hideStoreLine: true,
    headerAlign: "left",
    fontFamily: "sans",
    ruleStyle: "solid",
    paperStyle: "modern",
    paperFinish: "email",
    greeting: "Alex, you're all set.",
    sections: [
      {
        rows: [
          {
            label: "Confirmation code",
            value: "KQZRWT",
          },
          {
            value: "Thank you for booking with Alaska and we look forward to seeing you on board.",
          },
        ],
      },
      {
        title: "Alaska 1184 · Boeing 737-900",
        rows: [
          {
            label: "Departs",
            value: "Seattle (SEA)",
          },
          {
            label: "Date",
            value: "{{date+21}}",
          },
          {
            label: "Time",
            value: "7:15 am",
          },
          {
            label: "Arrives",
            value: "Los Angeles (LAX) 9:52 am",
          },
          {
            label: "Class",
            value: "S (Coach)",
          },
          {
            label: "Traveler(s)",
            value: "Alex Sample",
          },
          {
            label: "Seat(s)",
            value: "14C",
          },
        ],
      },
      {
        title: "Alaska 1251 · Boeing 737-800",
        rows: [
          {
            label: "Departs",
            value: "Los Angeles (LAX)",
          },
          {
            label: "Date",
            value: "{{date+25}}",
          },
          {
            label: "Time",
            value: "6:40 pm",
          },
          {
            label: "Arrives",
            value: "Seattle (SEA) 9:28 pm",
          },
          {
            label: "Class",
            value: "S (Coach)",
          },
          {
            label: "Traveler(s)",
            value: "Alex Sample",
          },
          {
            label: "Seat(s)",
            value: "16D",
          },
        ],
      },
      {
        title: "Summary of airfare charges",
        rows: [
          {
            value: "Alex Sample",
          },
          {
            label: "MP#",
            value: "XXXXX4821",
          },
          {
            label: "Ticket",
            value: "0272184409312",
          },
        ],
      },
    ],
    itemStyle: "lined",
    items: [
      {
        name: "Base fare and surcharges",
        quantity: 1,
        price: 236.28,
      },
      {
        name: "Taxes and other fees",
        quantity: 1,
        price: 48.52,
      },
    ],
    currency: "USD",
    taxLabel: "Taxes",
    taxRate: 0,
    showTaxRate: false,
    labels: {
      subtotal: "Per person total",
    },
    grandTotalLabel: "Total charges for air travel",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "Nonrefundable fare charged to",
        value: "Visa ************4417",
      },
      {
        label: "Held by",
        value: "Alex Sample",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            label: "Charged on",
            value: "{{date+0}}",
          },
        ],
      },
    ],
    footerMessage: "Alaska Airlines reservations 1-800-ALASKAAIR (1-800-252-7522)",
    policyText: "Alaska Airlines, PO Box 68900, Seattle, WA 98168-0900.\n© 2026 Alaska Airlines. All rights reserved.",
    showBarcode: false,
  },
  // american-airlines — was wrong-format. Sources:
  //   https://rtim.servicereef.com/events/files/11289/forms/33989/American%20portion%20New%20Dates.pdf
  //   https://www.parkindymedia.org/wp-content/uploads/2021/06/Knight-Miami-AA-flight.pdf
  //   https://www.aa.com/i18n/fragments/contactAA/TicketNumberLocation.jsp
  //   https://www.benedelman.org/airfare-advertising/pdf/edelman-to-kennedy-31dec2011.pdf
  "american-airlines": {
    businessName: "American Airlines",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    hideStoreLine: true,
    headerAlign: "left",
    fontFamily: "sans",
    ruleStyle: "solid",
    paperStyle: "modern",
    paperFinish: "email",
    greeting: "AA RECORD LOCATOR: KXWPTN",
    sections: [
      {
        title: "Dallas/ Fort Worth to New York",
        rows: [
          {
            value: "1 Adult",
          },
          {
            label: "Reservation Name",
            value: "DFW/LGA",
          },
          {
            label: "Status",
            value: "Ticketed",
          },
        ],
      },
      {
        title: "American Airlines 2386",
        rows: [
          {
            label: "Depart",
            value: "Dallas/ Fort Worth (DFW) 08:05 AM",
          },
          {
            label: "Date",
            value: "{{date+14}}",
          },
          {
            label: "Arrive",
            value: "New York (LGA) 12:31 PM",
          },
          {
            label: "Class",
            value: "Economy",
          },
          {
            label: "Seat",
            value: "14C",
          },
          {
            label: "Booking Code",
            value: "N",
          },
          {
            label: "Aircraft",
            value: "Boeing 737-800",
          },
        ],
      },
      {
        title: "American Airlines 1047",
        rows: [
          {
            label: "Depart",
            value: "New York (LGA) 05:40 PM",
          },
          {
            label: "Date",
            value: "{{date+18}}",
          },
          {
            label: "Arrive",
            value: "Dallas/ Fort Worth (DFW) 08:52 PM",
          },
          {
            label: "Class",
            value: "Economy",
          },
          {
            label: "Seat",
            value: "15D",
          },
          {
            label: "Booking Code",
            value: "N",
          },
          {
            label: "Aircraft",
            value: "Airbus A321",
          },
        ],
      },
      {
        title: "Receipt",
        rows: [
          {
            label: "PASSENGER",
            value: "SAMPLE,ALEX",
          },
          {
            label: "TICKET NUMBER",
            value: "0012198473365",
          },
          {
            label: "FREQUENT FLYER NUMBER",
            value: "XXXX7J42",
          },
        ],
      },
    ],
    itemStyle: "lined",
    itemHeader: {
      left: "Fare Amount",
      right: "",
    },
    items: [
      {
        name: "Adult",
        quantity: 1,
        price: 228.84,
      },
      {
        name: "Preferred Seats",
        quantity: 1,
        price: 39.0,
      },
      {
        name: "Taxes",
        quantity: 1,
        price: 47.96,
      },
      {
        name: "Carrier-Imposed Fees",
        quantity: 1,
        price: 0.0,
      },
    ],
    currency: "USD",
    taxLabel: "Taxes",
    taxRate: 0,
    showTaxRate: false,
    labels: {
      subtotal: "Flight Subtotal",
      paymentMethod: "Payment Type",
    },
    grandTotalLabel: "Total Paid",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    paymentInline: true,
    afterPayment: [
      {
        title: "Endorsements/Restrictions",
        rows: [
          {
            value: "NONREFUNDABLE NONREF/RESTRICTIONS APPLY",
          },
        ],
      },
    ],
    footerMessage: "Terms and conditions:\nIf you've already begun travel, this receipt may only show portions of your trip not flown.",
    policyText: "A summary of all the terms and conditions that apply to your travel are available on aa.com/conditionsofcarriage.",
    topBarcode: true,
    showBarcode: false,
  },
  // food-lion — was missing-key-details. Sources:
  //   https://newsroom.foodlion.com/news-releases/news-release-details/food-lion-customers-can-earn-extra-20-savings-fall
  //   https://progressivegrocer.com/food-lion-enables-shoppers-save-extra-20
  //   https://theshelbyreport.com/2020/02/11/food-lion-mvp-customers-save-millions-with-shop-earn/
  //   https://techbullion.com/talktofoodlion-com-food-lion-customer-satisfaction-survey-win-500/
  "food-lion": {
    businessName: "Food Lion",
    addressLine1: "1420 W Innes St",
    addressLine2: "Salisbury, NC 28144",
    phone: "(704) 555-0186",
    website: "foodlion.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "STORE 0417  REG 03  TRAN 5582",
          },
          {
            value: "CASHIER: TASHA",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    paperStyle: "thermal",
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 7,
    taxLines: [
      {
        label: "FOOD TAX",
        rate: 2,
        appliesTo: "F",
      },
      {
        label: "TAX",
        rate: 7,
      },
    ],
    showTaxRate: true,
    items: [
      {
        name: "FL 2% MILK GAL",
        quantity: 1,
        price: 3.79,
        taxFlag: "F",
        discount: 0.5,
      },
      {
        name: "NATURE'S OWN BUTTERBREAD",
        quantity: 1,
        price: 3.49,
        taxFlag: "F",
      },
      {
        name: "FL LARGE EGGS 12CT",
        quantity: 1,
        price: 3.29,
        taxFlag: "F",
      },
      {
        name: "BANANAS",
        quantity: 1,
        price: 1.42,
        taxFlag: "F",
        unit: "lb",
      },
      {
        name: "LAYS CLASSIC 8OZ",
        quantity: 1,
        price: 5.49,
        taxFlag: "F",
        discount: 1.5,
      },
      {
        name: "COCA-COLA 12PK CAN",
        quantity: 1,
        price: 8.99,
        taxFlag: "F",
        discount: 2.0,
      },
      {
        name: "BOUNTY PAPER TOWEL 6RL",
        quantity: 1,
        price: 12.99,
        taxFlag: "T",
        discount: 2.0,
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
      itemDiscount: "MVP SAVINGS",
      savings: "TOTAL SAVINGS",
      change: "CHANGE",
    },
    showSavings: true,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    cardLastFour: "3391",
    showCardAuth: false,
    cardRows: [
      {
        label: "DEBIT",
        value: "************3391",
      },
      {
        label: "AUTH #",
        value: "648213",
      },
      {
        label: "ENTRY",
        value: "CONTACTLESS",
      },
    ],
    afterPayment: [
      {
        title: "MVP CARD",
        rows: [
          {
            label: "MVP #",
            value: "*********2208",
          },
        ],
      },
      {
        rows: [
          {
            value: "Tell us about your visit at talktofoodlion.com",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING FOOD LION",
    policyText: "Promotion progress and any reward coupons you have earned print here when your MVP card is scanned. Sample receipt.",
  },
  // guitar-center — was no-source. Sources:
  //   https://www.guitarcenter.com/pages/return-policy
  //   https://www.guitarworld.com/gear/guitar-center-return-policy
  "guitar-center": {
    businessName: "Guitar Center",
    addressLine1: "30990 Russell Ranch Rd",
    addressLine2: "Westlake Village, CA 91362",
    phone: "(818) 555-0147",
    website: "guitarcenter.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "STORE 214  REG 2  TRANS 08841",
          },
          {
            label: "Sales Associate",
            value: "MARCUS T",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    currency: "USD",
    taxLabel: "SALES TAX",
    taxRate: 9.5,
    showTaxRate: true,
    items: [
      {
        name: "BOSS TU-3 CHROMATIC TUNER PEDAL",
        quantity: 1,
        price: 109.99,
      },
      {
        name: "ERNIE BALL REGULAR SLINKY 10-46",
        quantity: 2,
        price: 7.99,
      },
      {
        name: "LIVEWIRE ADVANTAGE 10FT INST CABLE",
        quantity: 1,
        price: 14.99,
      },
      {
        name: "FENDER 351 CELLULOID PICKS 12PK MED",
        quantity: 1,
        price: 5.99,
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "7752",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "************7752",
      },
      {
        label: "APPROVAL",
        value: "092145",
      },
      {
        label: "ENTRY",
        value: "CHIP",
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING AT GUITAR CENTER",
    policyText: "45-day satisfaction guarantee on most new gear. Used and vintage items have shorter return windows. Keep this receipt for returns. Sample receipt.",
  },
  // five-guys — was missing-key-details. Sources:
  //   https://github.com/MaVILab-UFV/Filtering-Preparation-for-OCR_SIBGRAPI-2024/blob/main/sibgrapi24-main/data/01_raw/Labels/1090-receipt.txt
  //   https://github.com/premAI-io/InvoiceDataExtractor/blob/main/dataset/mdData/fiveguys_aaaxwhncacb5.md
  //   https://github.com/premAI-io/InvoiceDataExtractor/blob/main/dataset/mdData/fiveguys_aaaxwhnjaebm.md
  //   https://github.com/premAI-io/InvoiceDataExtractor/blob/main/dataset/mdData/fiveguys_20190829.md
  "five-guys": {
    businessName: "FIVE GUYS",
    addressLine1: "STORE # VA-0517\n10718 Richmond Hwy",
    addressLine2: "Lorton, VA 22079",
    phone: "Phone (703) 555-0129",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "Order Id: AAAQ7K2MXBZT",
          },
          {
            value: "47 - FIVE GUYS",
          },
          {
            value: "Employee: Dana R",
          },
          {
            value: "47",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 10,
    showTaxRate: false,
    items: [
      {
        name: "Cheeseburger",
        quantity: 1,
        price: 12.49,
        addons: [
          {
            name: "Mayo",
            price: 0,
          },
          {
            name: "Lettuce",
            price: 0,
          },
          {
            name: "Pickles",
            price: 0,
          },
          {
            name: "Tomatoes",
            price: 0,
          },
          {
            name: "Grilled Onions",
            price: 0,
          },
        ],
      },
      {
        name: "Little Bacon Burger",
        quantity: 1,
        price: 9.99,
        addons: [
          {
            name: "Ketchup",
            price: 0,
          },
          {
            name: "Mustard",
            price: 0,
          },
          {
            name: "Grilled Mushrooms",
            price: 0,
          },
          {
            name: "Jalapeno Peppers",
            price: 0,
          },
        ],
      },
      {
        name: "Regular Cajun Fry",
        quantity: 1,
        price: 6.29,
      },
      {
        name: "Regular Soda",
        quantity: 2,
        price: 3.99,
      },
    ],
    labels: {
      subtotal: "Sub Total",
    },
    grandTotalLabel: "Order Total",
    paymentMethod: "Credit Card",
    paymentName: "MasterCard",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "Card#:",
        value: "************4417",
      },
      {
        label: "Authorization:",
        value: "58Q2KZ",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            value: "> Order Closed <",
          },
        ],
      },
    ],
    showBarcode: false,
    footerMessage: "Don't throw away your receipt!!!\n\nHelp Five Guys and you could win!\nLog online to www.fiveguys.com/survey\nand fill out a brief survey!",
    policyText: "10 lucky people will win a Five Guys Gift Card each month. No purchase necessary. Must be at least 18 years old and submit survey within 30 days of the receipt date to enter. Please visit www.fiveguys.com/survey for Official Rules and how to enter without making a purchase or completing a survey. Void where prohibited.",
  },
  // cvs-pharmacy — was missing-key-details. Sources:
  //   https://github.com/jnicolow/receiptParse/blob/main/data/receipts/text/30ae33b7-518d-43af-a950-1d22ebef2b3c.txt
  //   https://github.com/jnicolow/receiptParse/blob/main/data/receipts/text/0ba41157-853a-4070-ad63-845b5c09de60.txt
  //   https://github.com/premAI-io/InvoiceDataExtractor/blob/main/dataset/mdData/cvs_20231209_006.md
  //   https://github.com/premAI-io/InvoiceDataExtractor/blob/main/dataset/mdData/cvs-20190420_012.md
  "cvs-pharmacy": {
    businessName: "CVS pharmacy",
    addressLine1: "1088 Diamond Hill Rd",
    addressLine2: "Woonsocket, RI 02895",
    phone: "401.555.0163",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "REG#03 TRN#4821 CSHR#0000117 STR#10472",
          },
          {
            value: "Helped by: JANET",
          },
          {
            label: "ExtraCare Card #",
            value: "********5864",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    currency: "USD",
    taxLabel: "RI 7% TAX",
    taxRate: 7,
    showTaxRate: false,
    items: [
      {
        name: "TYLENOL XS CPLT 100CT",
        quantity: 1,
        price: 13.49,
        notTaxed: true,
        taxFlag: "N",
      },
      {
        name: "CVS IBUPROFEN 200MG 100CT",
        quantity: 1,
        price: 9.99,
        notTaxed: true,
        taxFlag: "N",
      },
      {
        name: "CVS FABRIC BANDAGE 30CT",
        quantity: 1,
        price: 4.79,
        taxFlag: "T",
      },
      {
        name: "HLMRK EVERYDY CARD ASST",
        quantity: 1,
        price: 4.99,
        taxFlag: "T",
      },
      {
        name: "SNICKERS KING SIZE",
        quantity: 1,
        price: 2.79,
        taxFlag: "T",
      },
    ],
    labels: {
      subtotal: "SUBTOTAL",
      change: "CHANGE",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    paymentName: "CHARGE",
    cardLastFour: "9212",
    showCardAuth: false,
    cardRows: [
      {
        value: "************9212 RF",
      },
      {
        value: "VISA DEBIT",
      },
      {
        label: "APPROVED#",
        value: "318604",
      },
      {
        label: "REF#",
        value: "207415",
      },
      {
        label: "TRAN TYPE:",
        value: "SALE",
      },
      {
        label: "AID:",
        value: "A0000000031010",
      },
      {
        label: "TC:",
        value: "7C2E91A04B3F6D18",
      },
      {
        label: "TERMINAL#",
        value: "04117302",
      },
      {
        value: "NO SIGNATURE REQUIRED",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            value: "Returns with receipt, subject to\nCVS Return Policy, thru {{date+60}}",
          },
          {
            value: "Refund amount is based on price\nafter all coupons and discounts.",
          },
        ],
      },
      {
        rows: [
          {
            label: "Survey ID #",
            value: "6183 2047 5530 1",
          },
          {
            value: "We would love to hear your feedback on your recent experience with us. This survey will take only 1 minute to complete.",
          },
          {
            value: "Share Your Feedback\nwww.CVSHealthSurvey.com\nHablamos español",
          },
        ],
      },
      {
        title: "ExtraCare Card balances",
        rows: [
          {
            label: "Year to Date Savings",
            value: "41.62",
          },
          {
            value: "Fill 10 prescriptions Get $5EB",
          },
          {
            value: "Access all coupons & rewards, and track your 2% earnings in the CVS Pharmacy app!",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU. SHOP 24 HOURS AT CVS.COM",
    policyText: "Sample receipt.",
  },
  // jimmy-john-s — was no-source. Sources:
  //   https://www.qsrmagazine.com/news/jimmy-johns-rolling-loyalty-program-nationwide/
  //   https://onefoottsunami.com/2019/09/27/jimmy-johns-is-not-great-at-order-notifications/
  "jimmy-john-s": {
    businessName: "Jimmy John's",
    addressLine1: "601 E Green St",
    addressLine2: "Champaign, IL 61820",
    phone: "(217) 555-0134",
    website: "jimmyjohns.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Store",
            value: "#1187",
          },
          {
            label: "Order Type",
            value: "Pickup",
          },
          {
            label: "Name",
            value: "CHRIS",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 9,
    showTaxRate: false,
    items: [
      {
        name: "#9 Italian Night Club 8\"",
        quantity: 1,
        price: 10.29,
        modifiers: ["No Onion", "Add Hot Peppers"],
      },
      {
        name: "#4 Turkey Tom 8\"",
        quantity: 1,
        price: 8.79,
      },
      {
        name: "Jimmy Chips Sea Salt",
        quantity: 1,
        price: 2.19,
      },
      {
        name: "Jumbo Kosher Dill",
        quantity: 1,
        price: 1.89,
      },
      {
        name: "Regular Drink",
        quantity: 1,
        price: 2.79,
      },
    ],
    labels: {
      subtotal: "Subtotal",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "6025",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX6025",
      },
      {
        label: "Auth",
        value: "411907",
      },
    ],
    orderNumber: "ORDER 52",
    showBarcode: false,
    footerMessage: "Thank you!",
    policyText: "Earn Freaky Fast Rewards on every order in the Jimmy John's app. Sample receipt.",
  },
  // chili-s — was missing-key-details. Sources:
  //   https://github.com/MaVILab-UFV/Filtering-Preparation-for-OCR_SIBGRAPI-2024/blob/main/sibgrapi24-main/data/01_raw/Labels/1061-receipt.txt
  //   https://d3.harvard.edu/platform-rctom/submission/ziosk-digitalizing-the-fast-casual-restaurant-experience/
  //   https://nrn.com/corporate/chili-s-franchisee-rolls-out-wireless-tabletop-terminals
  "chili-s": {
    businessName: "Chili's Grill & Bar",
    addressLine1: "Lake Highlands #114\n7425 Skillman St",
    addressLine2: "Dallas, TX 75231",
    phone: "(214) 555-0172",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Server:",
            value: "Kayla M",
          },
          {
            value: "22/1",
          },
          {
            label: "Guests:",
            value: "2   4071183",
          },
          {
            label: "Order Type:",
            value: "Dine In",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "lined",
    paperStyle: "thermal",
    currency: "USD",
    taxLabel: "Total Tax",
    taxRate: 8.25,
    showTaxRate: false,
    items: [
      {
        name: "TRIPLE DIPPER",
        quantity: 1,
        price: 15.99,
      },
      {
        name: "3 FOR ME OLDTIMER",
        quantity: 1,
        price: 10.99,
      },
      {
        name: "CAJUN CHKN PASTA",
        quantity: 1,
        price: 15.49,
      },
      {
        name: "COKE",
        quantity: 1,
        price: 3.49,
      },
      {
        name: "SWEET TEA",
        quantity: 1,
        price: 3.49,
      },
    ],
    labels: {
      subtotal: "Subtotal",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "2286",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX2286",
      },
      {
        label: "Auth:",
        value: "530918",
      },
    ],
    showBarcode: false,
    footerMessage: "Want free Chips and Salsa\nor a drink, every visit?\nChilis.com/Rewards",
    policyText: "Gift Card activation is\ndelayed by 4 hours.\n\nTELL US HOW WE'RE DOING!\nwww.chilis.com/survey\n\nSample receipt.",
  },
  // morrisons — was wrong-format. Sources:
  //   https://morrisons.com/help/morrisons-more/more-points--fivers
  //   https://github.com/Kali89/morrisons-receipt-analytics/blob/main/examples/sample_receipt.json
  //   https://morrisons-corporate.com/media-centre/corporate-news/earn-as-you-shop-morrisons-introduces-loyalty-card-points-on-every-product
  //   https://www.gov.uk/guidance/rates-of-vat-on-different-goods-and-services
  "morrisons": {
    businessName: "Morrisons",
    addressLine1: "Morrisons Thornbury\nLeeds Road",
    addressLine2: "Bradford BD3 7AU",
    phone: "Tel: 01274 555 018",
    website: "morrisons.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "VAT No. GB 123 4567 89",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    paperStyle: "thermal",
    currency: "GBP",
    dateOrder: "dmy",
    taxLabel: "VAT",
    taxRate: 20,
    taxIncluded: true,
    taxLines: [
      {
        label: "VAT @ 20% incl.",
        rate: 20,
      },
    ],
    showTaxRate: false,
    items: [
      {
        name: "M SEMI SKIMMED MILK 4PT",
        quantity: 1,
        price: 1.65,
        notTaxed: true,
      },
      {
        name: "WARBURTONS TOASTIE 800G",
        quantity: 1,
        price: 1.55,
        notTaxed: true,
      },
      {
        name: "M FREE RANGE EGGS 6",
        quantity: 1,
        price: 1.95,
        notTaxed: true,
      },
      {
        name: "HEINZ BEANZ 4X415G",
        quantity: 1,
        price: 3.8,
        notTaxed: true,
        discount: 0.55,
      },
      {
        name: "PG TIPS 160 BAGS",
        quantity: 1,
        price: 4.5,
        notTaxed: true,
        discount: 1.0,
      },
      {
        name: "BANANAS LOOSE",
        quantity: 1,
        price: 0.99,
        notTaxed: true,
        unit: "kg",
      },
      {
        name: "FAIRY ORIGINAL 820ML",
        quantity: 1,
        price: 2.75,
      },
    ],
    labels: {
      itemDiscount: "MORE CARD PRICE",
      savings: "TOTAL SAVINGS",
      change: "CHANGE",
    },
    showSavings: true,
    grandTotalLabel: "BALANCE DUE",
    paymentMethod: "Debit Card",
    paymentName: "VISA DEBIT",
    cardLastFour: "6142",
    showCardAuth: false,
    cardRows: [
      {
        value: "CONTACTLESS",
      },
      {
        label: "CARD",
        value: "************6142",
      },
      {
        label: "AUTH CODE",
        value: "725413",
      },
      {
        label: "AID",
        value: "A0000000031010",
      },
    ],
    afterPayment: [
      {
        title: "MORRISONS MORE",
        rows: [
          {
            label: "More Card",
            value: "************4791",
          },
          {
            label: "Points this shop",
            value: "85",
          },
          {
            label: "Points balance",
            value: "3,420",
          },
          {
            value: "5,000 points = a £5 Fiver",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING AT MORRISONS",
    policyText: "Please keep your receipt as proof of purchase. Sample receipt.",
  },
  // newegg — was wrong-format. Sources:
  //   https://forums.anandtech.com/threads/does-newegg-com-send-an-email-notice-when-you-order-something.498650
  //   https://github.com/jewwri/Catalog-Curator/blob/main/tests/test_email_order_extraction.py
  //   https://baymard.com/mcommerce-usability/benchmark/mobile-page-types/receipt/1424-newegg
  "newegg": {
    businessName: "Newegg",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "newegg.com",
    hideStoreLine: true,
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "stacked",
    greeting: "Thank you for your order!",
    sections: [
      {
        rows: [
          {
            label: "Order #",
            value: "561287430",
          },
          {
            label: "Sold by",
            value: "Newegg",
          },
        ],
      },
      {
        title: "Shipping Address",
        rows: [
          {
            value: "Jordan Ellis\n2210 Barton Springs Rd\nAustin, TX 78704",
          },
          {
            label: "Shipping Method",
            value: "Newegg Standard Shipping (3-5 business days)",
          },
          {
            label: "Shipping",
            value: "FREE",
          },
        ],
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.25,
    showTaxRate: false,
    items: [
      {
        name: "MSI MAG B650 TOMAHAWK WIFI AM5 ATX AMD Motherboard",
        quantity: 1,
        price: 189.99,
      },
      {
        name: "CORSAIR RM850e 850W 80 PLUS Gold Fully Modular ATX 3.1 Power Supply",
        quantity: 1,
        price: 109.99,
      },
      {
        name: "Thermalright Peerless Assassin 120 SE CPU Air Cooler",
        quantity: 1,
        price: 34.9,
      },
    ],
    labels: {
      subtotal: "Subtotal",
    },
    grandTotalLabel: "Order Total",
    paymentMethod: "Credit Card",
    paymentName: "Visa",
    cardLastFour: "3308",
    paymentInline: true,
    showCardAuth: false,
    showBarcode: false,
    footerMessage: "We'll email you a shipping confirmation with tracking as soon as your order ships.",
    policyText: "Prices, tax and shipping shown are as of the time of order. Sample receipt; not issued by Newegg.",
  },
  // uber-eats — was wrong-format. Sources:
  //   https://github.com/cristianfraser/nw-tracker/blob/main/ingest/src/payments/uberMails.ts
  //   https://imagetotable.ai/extract/uber-eats-order-screenshot
  //   https://www.uber.com/gb/en/blog/understanding-fees-and-arrival-time/
  //   https://www.ridester.com/?p=558880
  "uber-eats": {
    businessName: "Uber Eats",
    logoText: "Uber Eats",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    hideStoreLine: true,
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "qtycol",
    dividers: "minimal",
    greeting: "Thanks for ordering, Alex\nHere's your receipt for Chinatown Express (7th St NW).",
    sections: [
      {
        title: "Delivery details",
        rows: [
          {
            label: "Delivered to",
            value: "1100 New York Ave NW, Washington, DC",
          },
          {
            label: "Courier",
            value: "Sarah",
          },
          {
            label: "Order",
            value: "#7F2KQ",
          },
        ],
      },
    ],
    currency: "USD",
    taxLabel: "Taxes",
    taxRate: 10,
    showTaxRate: false,
    deliveryFee: 2.49,
    serviceFee: 4.15,
    tip: 5.0,
    items: [
      {
        name: "General Tso's Chicken",
        quantity: 1,
        price: 16.95,
        modifiers: ["Spice level: Medium"],
      },
      {
        name: "Vegetable Fried Rice (L)",
        quantity: 1,
        price: 11.5,
      },
      {
        name: "Spring Rolls (2)",
        quantity: 1,
        price: 4.95,
      },
    ],
    labels: {
      subtotal: "Subtotal",
      deliveryFee: "Delivery Fee",
      serviceFee: "Service Fee",
      tip: "Tip",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    paymentName: "Visa",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        value: "Visa ••••4417",
      },
    ],
    showBarcode: false,
    footerMessage: "Rate your order in the Uber Eats app.",
    policyText: "Sample receipt. Not issued by Uber. Fees and taxes vary by location and order.",
  },
  // menards — was missing-key-details. Sources:
  //   https://github.com/patrykszady/hive2025/blob/main/app/Support/ReceiptTenders.php
  //   https://github.com/patrykszady/hive2025/blob/main/app/Console/Commands/FixMenardsRebateTotals.php
  //   https://msoid.icmbio.gov.br/en/menards-rebate-printable-form.html
  "menards": {
    businessName: "MENARDS",
    addressLine1: "EAU CLAIRE WI #3012\n3725 S Hastings Way",
    addressLine2: "Eau Claire, WI 54701",
    phone: "(715) 555-0193",
    website: "menards.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "REG 07  TRANS 4418  CASHIER 1129",
          },
        ],
      },
    ],
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "stacked",
    paperStyle: "thermal",
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 5.5,
    showTaxRate: true,
    items: [
      {
        name: "2X4-8 #2&BTR STUD",
        quantity: 20,
        price: 3.79,
      },
      {
        name: "GRIP-RITE #9 3\" DECK SCREW 5LB",
        quantity: 1,
        price: 34.99,
      },
      {
        name: "MASTERFORCE 25' TAPE MEASURE",
        quantity: 1,
        price: 9.99,
      },
      {
        name: "DUTCH BOY INT EGGSHELL 1 GAL",
        quantity: 2,
        price: 29.98,
      },
    ],
    labels: {
      subtotal: "TOTAL",
      change: "CHANGE",
    },
    grandTotalLabel: "TOTAL SALE",
    paymentMethod: "Credit Card",
    paymentName: "VISA",
    cardLastFour: "4060",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "************4060",
      },
      {
        label: "AUTH",
        value: "071533",
      },
    ],
    afterPayment: [
      {
        title: "11% MAIL-IN REBATE RECEIPT",
        rows: [
          {
            label: "REBATE NO:",
            value: "6407718230",
          },
          {
            label: "STORE",
            value: "3012",
          },
          {
            label: "FINAL MAILING DATE",
            value: "{{date+60}}",
          },
          {
            value: "Mail this original rebate receipt with a completed rebate form. Rebate paid as a Menards merchandise credit check.",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING AT MENARDS",
    policyText: "Sample receipt.",
  },
  // doordash — was missing-key-details. Sources:
  //   https://help.doordash.com/consumers/s/article/What-fees-do-I-pay
  //   https://imagetotable.ai/extract/doordash-order-screenshot
  //   https://newsweek.com/man-shocked-cost-650-drink-after-delivery-fees-took-me-out-1742247
  "doordash": {
    businessName: "DoorDash",
    logoText: "DoorDash",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "doordash.com",
    currency: "USD",
    taxLabel: "Estimated Tax",
    taxRate: 8.25,
    showTaxRate: false,
    tip: 5.0,
    labels: {
      tip: "Dasher Tip",
      subtotal: "Subtotal",
      deliveryFee: "Delivery Fee",
      serviceFee: "Service Fee",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4821",
    paymentInline: true,
    showCardAuth: false,
    greeting: "Thanks for your order, Alex",
    hideStoreLine: true,
    headerAlign: "left",
    fontFamily: "inter",
    ruleStyle: "solid",
    itemStyle: "lined",
    dividers: "minimal",
    paperStyle: "minimal",
    paperFinish: "email",
    showBarcode: false,
    sections: [
      {
        title: "Order details",
        rows: [
          {
            label: "Order",
            value: "#5F2A91C7",
          },
          {
            label: "Placed",
            value: "Oct 27, 7:42 PM",
          },
          {
            label: "Delivered",
            value: "Oct 27, 8:16 PM",
          },
        ],
      },
      {
        title: "Delivered to",
        rows: [
          {
            value: "Alex",
          },
          {
            value: "1407 Ridgeview Dr, Austin, TX 78704",
          },
        ],
      },
      {
        title: "Ordered from",
        rows: [
          {
            value: "Lotus Garden Thai",
          },
          {
            value: "2210 S Lamar Blvd, Austin, TX 78704",
          },
        ],
      },
    ],
    footerMessage: "Get help with your order in the DoorDash app.",
    policyText: "Menu prices and taxes are set by the restaurant. Sample receipt.",
    items: [
      {
        name: "Pad See Ew",
        quantity: 1,
        price: 15.95,
        modifiers: ["Chicken", "Medium spicy"],
      },
      {
        name: "Fresh Spring Rolls (2)",
        quantity: 1,
        price: 7.5,
      },
      {
        name: "Thai Iced Tea",
        quantity: 2,
        price: 4.75,
      },
    ],
    deliveryFee: 2.99,
    serviceFee: 4.97,
  },
  // tgi-fridays — was no-source. Sources:
  //   https://pointed-bean-06f.notion.site/TalktoFridays-US-Survey-Your-Guide-to-Sharing-Feedback-and-Earning-Rewards-at-TGI-Fridays-1372d0b9bf0980f5b9a2e7792af13271
  //   https://www.streetinsider.com/PRNewswire/TGI+Fridays+Brings+Bigger%2C+Better+Rewards+to+Customers+with+Oracle/21662815.html
  "tgi-fridays": {
    businessName: "TGI Fridays",
    addressLine1: "Store #2147 · 13090 Preston Rd",
    addressLine2: "Dallas, TX 75240",
    phone: "(972) 555-0148",
    website: "tgifridays.com",
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.25,
    showTaxRate: false,
    tip: 0,
    paymentMethod: "Credit Card",
    cardLastFour: "3092",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX3092",
      },
      {
        label: "Auth Code",
        value: "07731B",
      },
      {
        label: "Entry",
        value: "Contactless",
      },
    ],
    labels: {
      subtotal: "Subtotal",
    },
    grandTotalLabel: "Total",
    hideStoreLine: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    sections: [
      {
        rows: [
          {
            label: "Server",
            value: "Dana",
          },
          {
            label: "Table",
            value: "24",
          },
          {
            label: "Guests",
            value: "2",
          },
          {
            label: "Check",
            value: "4418",
          },
        ],
      },
    ],
    policyText: "Tip: ______________\n\nTotal: ______________\n\nX_____________________________\nI agree to pay the above total amount according to the card issuer agreement.",
    footerMessage: "Thank you for dining with us!\nJoin Fridays Rewards and earn on every visit.",
    showBarcode: false,
    items: [
      {
        name: "Loaded Potato Skins",
        quantity: 1,
        price: 13.49,
      },
      {
        name: "Whiskey-Glazed Ribs Full Rack",
        quantity: 1,
        price: 27.99,
        modifiers: ["Seasoned Fries", "Coleslaw"],
      },
      {
        name: "Fridays Signature Burger",
        quantity: 1,
        price: 17.49,
        modifiers: ["Medium"],
      },
      {
        name: "Strawberry Lemonade",
        quantity: 1,
        price: 4.79,
      },
      {
        name: "Coca-Cola",
        quantity: 1,
        price: 3.79,
      },
    ],
  },
  // sephora — was missing-key-details. Sources:
  //   https://www.sephora.com/returns
  //   https://community.sephora.com/t5/Customer-Support/Add-points-to-account-with-receipt/m-p/5423082
  //   https://community.sephora.com/t5/Customer-Support/In-store-order-history-search/m-p/3374481
  "sephora": {
    businessName: "SEPHORA",
    logoText: "SEPHORA",
    addressLine1: "Store #0482 · 160 Stockton St",
    addressLine2: "San Francisco, CA 94108",
    phone: "(415) 555-0172",
    website: "sephora.com",
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.625,
    showTaxRate: false,
    register: "Reg 03",
    cashier: "Beauty Advisor: Kim",
    paymentMethod: "Credit Card",
    cardLastFour: "6614",
    showCardAuth: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    paperStyle: "thermal",
    afterPayment: [
      {
        title: "BEAUTY INSIDER",
        rows: [
          {
            label: "Member",
            value: "****8831",
          },
          {
            label: "Status",
            value: "VIB",
          },
          {
            label: "Points balance",
            value: "1,284",
          },
        ],
      },
    ],
    footerMessage: "Thank you for shopping at Sephora!",
    policyText: "Returns: within 30 days of purchase for a refund to the original form of payment. See sephora.com/returns for details.",
    showBarcode: true,
    items: [
      {
        name: "Rare Beauty Soft Pinch Liquid Blush",
        quantity: 1,
        price: 25.0,
      },
      {
        name: "Summer Fridays Lip Butter Balm",
        quantity: 1,
        price: 24.0,
      },
      {
        name: "Drunk Elephant Protini Polypeptide Cream",
        quantity: 1,
        price: 68.0,
      },
      {
        name: "SEPHORA COLLECTION Cleansing Water",
        quantity: 1,
        price: 12.0,
      },
    ],
  },
  // versace — was wrong-format. Sources:
  //   https://openportal.isti.cnr.it/data/2020/438458/2020_%20438458.pdf
  //   https://www.teamsystem.com/magazine/glossario/documento-commerciale/
  //   https://finom.co/it-it/blog/documento-commerciale/
  //   https://atoka.io/public/it/azienda/gianni-versace-srl/764ecd3a9490
  "versace": {
    businessName: "Gianni Versace S.r.l.",
    logoText: "VERSACE",
    addressLine1: "Boutique Milano · Via Monte Napoleone",
    addressLine2: "20121 Milano (MI) · P.IVA IT 09417250963",
    phone: "",
    website: "versace.com",
    currency: "EUR",
    dateOrder: "dmy",
    taxLabel: "di cui IVA",
    taxRate: 22,
    showTaxRate: false,
    greeting: "DOCUMENTO COMMERCIALE\ndi vendita o prestazione",
    itemStyle: "lined",
    itemHeader: {
      left: "DESCRIZIONE",
      right: "Prezzo(€)",
    },
    grandTotalLabel: "TOTALE COMPLESSIVO",
    labels: {
      subtotal: "SUBTOTALE",
      amountPaid: "Importo pagato",
      change: "Resto",
    },
    hideSubtotal: true,
    paymentMethod: "Credit Card",
    paymentName: "Pagamento elettronico",
    cardLastFour: "5207",
    showCardAuth: false,
    hideStoreLine: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    paperStyle: "thermal",
    afterPayment: [
      {
        rows: [
          {
            label: "DOC. N.",
            value: "0127-0043",
          },
          {
            label: "RT",
            value: "99MEX017724",
          },
        ],
      },
    ],
    footerMessage: "Grazie per aver scelto Versace",
    policyText: "Cambi entro 30 giorni con il presente documento. Sample receipt.",
    showBarcode: false,
    qrCode: true,
    items: [
      {
        name: "Cintura Medusa '95 pelle",
        quantity: 1,
        price: 550.0,
      },
      {
        name: "Foulard Barocco seta",
        quantity: 1,
        price: 390.0,
      },
    ],
    taxIncluded: true,
  },
  // barnes-noble — was missing-key-details. Sources:
  //   https://blog.vendoo.co/barnes-and-noble-return-policy
  //   https://closo.co/blogs/returns-refunds/barnes-and-noble-return-policy
  //   https://dailydot.com/barnes-and-noble-2011-return
  "barnes-noble": {
    businessName: "Barnes & Noble",
    addressLine1: "Booksellers #2817 · 410 W 34th St",
    addressLine2: "New York, NY 10001",
    phone: "(212) 555-0193",
    website: "bn.com",
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 8.875,
    showTaxRate: false,
    register: "REG 04",
    cashier: "Bookseller: Alice",
    skuFirst: true,
    showSavings: true,
    labels: {
      itemDiscount: "Member Discount",
      savings: "Member savings",
    },
    paymentMethod: "Credit Card",
    cardLastFour: "2275",
    showCardAuth: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "stacked",
    paperStyle: "thermal",
    afterPayment: [
      {
        rows: [
          {
            label: "B&N Premium Member",
            value: "****4410",
          },
        ],
      },
    ],
    footerMessage: "Thanks for shopping at Barnes & Noble",
    policyText: "Returns of new and unread books and unopened music, DVDs and audio with a receipt within 30 days for a refund to the original payment method. NOOK devices: 14 days. Without a receipt, store credit at the lowest selling price.",
    showBarcode: true,
    items: [
      {
        name: "Atomic Habits (HC)",
        quantity: 1,
        price: 27.0,
        sku: "9780735211292",
        discount: 2.7,
      },
      {
        name: "Fourth Wing (PB)",
        quantity: 1,
        price: 19.99,
        sku: "9781649374172",
        discount: 2.0,
      },
      {
        name: "Moleskine Classic Notebook Lg",
        quantity: 1,
        price: 24.95,
        sku: "9788883701122",
      },
      {
        name: "Caffe Mocha Grande",
        quantity: 1,
        price: 5.95,
      },
    ],
  },
  // kay-jewelers — was no-source. Sources:
  //   https://www.kay.com/lifetime-protection-plan
  //   https://www.jared.com/lifetime-protection-plan-details
  //   https://www.kay.com/warranty-for-jewelry-engagement-rings
  "kay-jewelers": {
    businessName: "Kay Jewelers",
    addressLine1: "Store #1374 · Summit Mall",
    addressLine2: "Akron, OH 44333",
    phone: "(330) 555-0126",
    website: "kay.com",
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 6.75,
    showTaxRate: false,
    cashier: "Sales Associate: Megan",
    register: "Reg 1",
    skuFirst: true,
    paymentMethod: "Credit Card",
    cardLastFour: "7730",
    showCardAuth: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "stacked",
    paperStyle: "thermal",
    footerMessage: "Thank you for choosing Kay!",
    policyText: "Keep this receipt: present it with your merchandise for Lifetime Protection Plan service. Diamond guarantee requires inspections every six months at a Kay store. See kay.com for return terms.\n\nX______________________________\nCustomer Signature",
    showBarcode: true,
    items: [
      {
        name: "1/4 ct tw Diamond Hoop Earrings 10K Yellow Gold",
        quantity: 1,
        price: 499.99,
        sku: "191543208",
      },
      {
        name: "Lifetime Protection Plan",
        quantity: 1,
        price: 79.99,
        sku: "LPP",
      },
      {
        name: "Jewelry Gift Box & Bag",
        quantity: 1,
        price: 0.0,
      },
    ],
  },
  // albert-heijn — was wrong-format. Sources:
  //   https://www.emerce.nl/?p=3419191
  //   https://www.ah.nl/privacy/winkelen
  //   https://www.ah.nl/privacy/gegevens
  //   https://www.ah.nl/acties/mijn-ah-miles/actievoorwaarden
  "albert-heijn": {
    businessName: "Albert Heijn",
    addressLine1: "AH 1428 · Ferdinand Bolstraat 120",
    addressLine2: "1072 LN Amsterdam",
    phone: "020 555 0147",
    website: "ah.nl",
    currency: "EUR",
    dateOrder: "dmy",
    taxLabel: "BTW",
    showTaxRate: false,
    labels: {
      subtotal: "SUBTOTAAL",
      itemDiscount: "BONUS",
      savings: "UW VOORDEEL",
    },
    showSavings: true,
    grandTotalLabel: "TOTAAL",
    paymentMethod: "Debit Card",
    paymentName: "PINNEN",
    cardLastFour: "0381",
    showCardAuth: false,
    cardRows: [
      {
        label: "Terminal",
        value: "5T8K21",
      },
      {
        label: "Kaart",
        value: "xxxx xxxx xxxx 0381",
      },
      {
        label: "Autorisatiecode",
        value: "F4K29Q",
      },
    ],
    itemStyle: "qtycol",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    paperStyle: "thermal",
    afterPayment: [
      {
        rows: [
          {
            label: "BONUSKAART",
            value: "xx2754",
          },
          {
            label: "AH MILES",
            value: "spaar in de app",
          },
        ],
      },
    ],
    footerMessage: "Bedankt en tot ziens!",
    policyText: "Sample receipt.",
    showBarcode: true,
    items: [
      {
        name: "AH HALFVOLLE MELK 1,5L",
        quantity: 1,
        price: 1.65,
        taxFlag: "B",
      },
      {
        name: "AH BANANEN",
        quantity: 1,
        price: 1.99,
        taxFlag: "B",
      },
      {
        name: "LAY'S NATUREL",
        quantity: 2,
        price: 2.69,
        discount: 2.69,
        taxFlag: "B",
      },
      {
        name: "AH TARWE BUSSEMAKER",
        quantity: 1,
        price: 2.39,
        taxFlag: "B",
      },
      {
        name: "GOUDA JONG BELEGEN PLAKKEN",
        quantity: 1,
        price: 3.79,
        discount: 0.95,
        taxFlag: "B",
      },
      {
        name: "HEINEKEN PILSENER 6X33CL",
        quantity: 1,
        price: 7.49,
      },
    ],
    taxIncluded: true,
    taxLines: [
      {
        label: "BTW 9%",
        rate: 9,
        appliesTo: "B",
      },
      {
        label: "BTW 21%",
        rate: 21,
      },
    ],
  },
  // nintendo-eshop — was missing-key-details. Sources:
  //   https://en-americas-support.nintendo.com/app/answers/detail/a_id/2237/p/989/c/193
  //   https://en-americas-support.nintendo.com/app/answers/detail/a_id/27892
  //   https://www.nintendo.co.uk/Support/Nintendo-Switch/Why-Did-I-Receive-Multiple-Emails-for-My-Nintendo-eShop-Purchase-on-Nintendo-Switch-1511422.html
  "nintendo-eshop": {
    businessName: "Nintendo eShop",
    logoText: "Nintendo",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "accounts.nintendo.com",
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.25,
    showTaxRate: false,
    paymentMethod: "Credit Card",
    cardLastFour: "1846",
    paymentInline: true,
    showCardAuth: false,
    hideStoreLine: true,
    headerAlign: "left",
    fontFamily: "inter",
    ruleStyle: "solid",
    itemStyle: "lined",
    itemHeader: {
      left: "Purchased Item",
      right: "Price",
    },
    dividers: "minimal",
    paperStyle: "minimal",
    paperFinish: "email",
    showBarcode: false,
    greeting: "Thank you for your purchase.",
    sections: [
      {
        rows: [
          {
            label: "Nintendo Account",
            value: "sample-user",
          },
          {
            label: "Transaction No.",
            value: "6720-4418-0931",
          },
          {
            label: "Platform",
            value: "Nintendo Switch 2",
          },
        ],
      },
    ],
    footerMessage: "View your purchase history at accounts.nintendo.com > Shop Menu.",
    policyText: "Downloadable software is non-refundable once downloaded, except as required by law. Sample receipt.",
    items: [
      {
        name: "Mario Kart World",
        quantity: 1,
        price: 79.99,
      },
    ],
  },
  // epic-games — was missing-key-details. Sources:
  //   https://www.epicgames.com/help/billing-and-payment-c-41804731/c-Trending_0/where-can-i-find-an-invoice-id-of-my-epic-games-purchase-a20001256
  //   https://www.epicgames.com/help/billing-and-payment-c-202300000001642/a202300000012400
  //   https://www.scribd.com/document/709141079/Epic-game
  "epic-games": {
    businessName: "Epic Games",
    logoText: "EPIC GAMES",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "epicgames.com",
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.25,
    showTaxRate: false,
    labels: {
      itemDiscount: "Discounts",
    },
    paymentMethod: "Credit Card",
    cardLastFour: "9054",
    paymentInline: true,
    showCardAuth: false,
    hideStoreLine: true,
    headerAlign: "left",
    fontFamily: "inter",
    ruleStyle: "solid",
    itemStyle: "lined",
    itemHeader: {
      left: "Description / Publisher",
      right: "Price",
    },
    dividers: "minimal",
    paperStyle: "minimal",
    paperFinish: "email",
    showBarcode: false,
    greeting: "Thanks for your purchase!",
    sections: [
      {
        rows: [
          {
            label: "Invoice ID",
            value: "F2604198835",
          },
          {
            label: "Order ID",
            value: "F2604198835-7712",
          },
          {
            label: "Bill To",
            value: "sample.player@example.com",
          },
          {
            label: "Order Date",
            value: "October 27, 2026",
          },
          {
            label: "Source",
            value: "Epic Games Store",
          },
        ],
      },
    ],
    footerMessage: "Manage purchases at epicgames.com/account/transactions",
    policyText: "Eligible games can be refunded within 14 days of purchase if played for less than 2 hours. Sample receipt.",
    items: [
      {
        name: "Hades II\nSupergiant Games",
        quantity: 1,
        price: 29.99,
      },
      {
        name: "Hollow Knight: Silksong\nTeam Cherry",
        quantity: 1,
        price: 19.99,
        discount: 2.0,
      },
    ],
  },
  // burberry — was wrong-format. Sources:
  //   https://www.retailgazette.co.uk/?p=190470
  //   https://fashionunited.com/news/business/without-tax-free-shopping-uk-is-least-attractive-shopping-destination-says-burberry-chief/2023042553512
  "burberry": {
    businessName: "BURBERRY",
    logoText: "BURBERRY",
    addressLine1: "Regent Street, London W1B",
    addressLine2: "VAT Reg No. GB 284 6159 37",
    phone: "020 7555 0182",
    website: "burberry.com",
    currency: "GBP",
    dateOrder: "dmy",
    taxLabel: "VAT included @ 20%",
    taxRate: 20,
    showTaxRate: false,
    cashier: "Client Advisor: Oliver",
    register: "Till 02",
    skuFirst: true,
    hideSubtotal: true,
    grandTotalLabel: "TOTAL GBP",
    paymentMethod: "Credit Card",
    cardLastFour: "4405",
    showCardAuth: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "stacked",
    paperStyle: "thermal",
    footerMessage: "Thank you for shopping at Burberry",
    policyText: "Unworn items with this receipt may be exchanged or refunded within 30 days. Sample receipt.",
    showBarcode: true,
    items: [
      {
        name: "Mid-length Kensington Heritage Trench Coat Honey 10",
        quantity: 1,
        price: 2190.0,
        sku: "80913451",
      },
      {
        name: "Check Cashmere Scarf Archive Beige",
        quantity: 1,
        price: 520.0,
        sku: "80745221",
      },
    ],
    taxIncluded: true,
  },
  // venmo — was missing-key-details. Sources:
  //   https://diswww.mit.edu/nemesis/swaccess/8793
  //   https://help.venmo.com/hc/en-us/articles/235170748-Payments-FAQ
  //   https://newsroom.paypal-corp.com/How-to-automatically-label-Venmo-receipts-in-Gmail
  //   https://joingerald.com/learn/banking--payments/venmo-receipt
  "venmo": {
    businessName: "Venmo",
    logoText: "venmo",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "",
    greeting: "You paid Alex Rivera",
    hideStoreLine: true,
    fontFamily: "inter",
    paperStyle: "minimal",
    headerAlign: "center",
    ruleStyle: "solid",
    dividers: "minimal",
    itemStyle: "lined",
    itemHeader: {
      left: "Note",
      right: "Amount",
    },
    items: [
      {
        name: "Dinner 🍜",
        quantity: 1,
        price: 45.0,
      },
    ],
    hideSubtotal: true,
    taxLabel: "Tax",
    taxRate: 0,
    showTaxRate: false,
    grandTotalLabel: "Total",
    paymentMethod: "Mobile Payment",
    paymentName: "Venmo balance",
    cardLastFour: "",
    paymentInline: true,
    showCardAuth: false,
    sections: [
      {
        title: "Transaction details",
        rows: [
          {
            label: "To",
            value: "Alex Rivera (@alex-rivera-27)",
          },
          {
            label: "Date",
            value: "{{date+0}}",
          },
          {
            label: "Transaction ID",
            value: "4187236095521847302",
          },
          {
            label: "Privacy",
            value: "Friends",
          },
        ],
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            value: "Status: Complete",
          },
        ],
      },
    ],
    footerMessage: "Send money. Transfer to your bank.",
    policyText: "Make sure you know how to spot payment scams. Venmo is a service of PayPal, Inc., a licensed provider of money transfer services. Sample receipt.",
    showBarcode: false,
    paperFinish: "email",
  },
  // dick-s-sporting-goods — was missing-key-details. Sources:
  //   https://passionatepennypincher.com/?p=330458
  //   https://www.golfgalaxy.com/s/scorecard
  //   https://www.dickssportinggoods.com/s/warehouse-sale-return-policy
  //   https://investors.synchrony.com/news-events/financial-news/detail/572/dicks-sporting-goods-and-synchrony-level-up-the-dicks-credit-card-offering-members-10-back-in-scorecard-rewards-on-qualifying-purchases
  "dick-s-sporting-goods": {
    businessName: "DICK'S Sporting Goods",
    addressLine1: "Store 1187 · 4120 Sample Town Center Dr",
    addressLine2: "Columbus, OH 43219",
    phone: "(614) 555-0148",
    website: "dickssportinggoods.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "STR 1187  REG 04  TRN 5521  TEAMMATE 20914",
          },
        ],
      },
    ],
    fontFamily: "mono",
    paperStyle: "thermal",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    skuFirst: true,
    items: [
      {
        name: "NIKE REVOLUTION 7 RUNNING SHOE",
        sku: "195870948821",
        quantity: 1,
        price: 70.0,
      },
      {
        name: "DSG MENS PERFORMANCE SS TEE",
        sku: "196512330478",
        quantity: 2,
        price: 20.0,
        discount: 10.0,
      },
      {
        name: "WILSON NCAA REPLICA BASKETBALL",
        sku: "887768905532",
        quantity: 1,
        price: 29.99,
      },
      {
        name: "HYDRO FLASK 32OZ WIDE MOUTH",
        sku: "810070081626",
        quantity: 1,
        price: 44.95,
      },
    ],
    showSavings: true,
    taxLabel: "Sales Tax",
    taxRate: 8.0,
    showTaxRate: false,
    grandTotalLabel: "TOTAL",
    labels: {
      subtotal: "SUBTOTAL",
      savings: "YOU SAVED",
    },
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "************4417",
      },
      {
        label: "ENTRY",
        value: "CHIP",
      },
      {
        label: "AUTH",
        value: "082714",
      },
      {
        label: "AID",
        value: "A0000000031010",
      },
    ],
    afterPayment: [
      {
        title: "SCORECARD",
        rows: [
          {
            label: "Member",
            value: "*******8823",
          },
          {
            value: "Points post to your account within 48 hours",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "Tell us how we did!\nSurvey code: 1187 0427 5521 0420 931",
    policyText: "Most items may be returned with this receipt. See dickssportinggoods.com for our return policy. Sample receipt.",
  },
  // delta-airlines — was wrong-format. Sources:
  //   https://htmlscript.auburn.edu/academic/education/ed/documents_uploaded/travelrequests/mjm0055-2026032757034.pdf
  //   https://htmlscript.auburn.edu/academic/education/ed/documents_uploaded/graduatetravelawards/cjg0021bt2019052911161186329.pdf
  //   https://htmlscript.auburn.edu/academic/education/ed/documents_uploaded/travelrequests/NHB0002-2024101178981.pdf
  //   https://markup.co.uk/hg/BCS/raw-file/tip/travel_2024_1/Receipts%20_%20Delta%20Air%20Lines.pdf
  "delta-airlines": {
    businessName: "Delta Air Lines",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "delta.com",
    hideStoreLine: true,
    greeting: "Flight Receipt for Atlanta, GA to Los Angeles, CA",
    sections: [
      {
        rows: [
          {
            label: "Date of Purchase:",
            value: "{{date+0}}",
          },
          {
            label: "Confirmation #:",
            value: "HQ7M2K",
          },
        ],
      },
      {
        title: "PASSENGER INFORMATION",
        rows: [
          {
            value: "ALEX SAMPLE",
          },
          {
            label: "Ticket Number:",
            value: "0062417735091",
          },
          {
            label: "SkyMiles #:",
            value: "*******482",
          },
        ],
      },
      {
        title: "FLIGHT INFORMATION",
        rows: [
          {
            label: "DL 1468",
            value: "{{date+21}}  ATL 08:15AM > LAX 10:02AM",
          },
          {
            label: "Class / Seat",
            value: "Main Cabin (L) · 27C",
          },
          {
            label: "DL 2797",
            value: "{{date+25}}  LAX 01:30PM > ATL 08:52PM",
          },
          {
            label: "Class / Seat",
            value: "Main Cabin (L) · 31D",
          },
        ],
      },
      {
        title: "DETAILED CHARGES",
        rows: [
          {
            value: "Air Transportation Charges / Taxes, Fees & Charges",
          },
        ],
      },
    ],
    fontFamily: "inter",
    paperStyle: "modern",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    items: [
      {
        name: "Base Fare",
        quantity: 1,
        price: 289.0,
      },
      {
        name: "September 11th Security Fee (Civil Aviation Security Service Fee) (AY)",
        quantity: 1,
        price: 11.2,
      },
      {
        name: "United States - Transportation Tax (US)",
        quantity: 1,
        price: 21.68,
      },
      {
        name: "United States - Passenger Facility Charge (XF)",
        quantity: 1,
        price: 9.0,
      },
      {
        name: "United States - Flight Segment Tax (ZP)",
        quantity: 1,
        price: 11.0,
      },
    ],
    hideSubtotal: true,
    taxLabel: "Taxes",
    taxRate: 0,
    showTaxRate: false,
    grandTotalLabel: "Total Price:",
    paymentMethod: "Credit Card",
    paymentName: "Paid with Visa",
    cardLastFour: "4417",
    paymentInline: true,
    showCardAuth: false,
    footerMessage: "NON-REFUNDABLE / CHANGE FEE\nThis ticket is non-refundable unless issued at a fully refundable fare. Changes may require a fare difference. Failure to appear for any flight without notice cancels the remaining reservation.",
    policyText: "You must be checked in and at the gate at least 15 minutes before departure for travel inside the United States, and 45 minutes before for international travel. Air transportation on Delta and Delta Connection carriers is subject to Delta's conditions of carriage.\n© 2026 Delta Air Lines, Inc. All rights reserved.",
    showBarcode: false,
    paperFinish: "email",
  },
  // petco — was no-source. Sources:
  //   https://www.retailtouchpoints.com/news/petco-combines-two-loyalty-programs-to-better-support-pets-health-and-wellness/126311/
  //   https://storebrands.com/petco-unifies-pals-rewards-and-vital-care-members
  "petco": {
    businessName: "Petco",
    addressLine1: "Store 2214 · 7720 Sample Mesa Blvd",
    addressLine2: "San Diego, CA 92126",
    phone: "(858) 555-0136",
    website: "petco.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "STORE 2214  REG 02  TRANS 8841  ASSOC 1076",
          },
        ],
      },
    ],
    fontFamily: "mono",
    paperStyle: "thermal",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    skuFirst: true,
    items: [
      {
        name: "BLUE BUFFALO LP ADULT CHKN 15LB",
        sku: "859610008291",
        quantity: 1,
        price: 48.99,
        discount: 5.0,
      },
      {
        name: "KONG CLASSIC DOG TOY MEDIUM",
        sku: "035585111315",
        quantity: 1,
        price: 13.99,
      },
      {
        name: "GREENIES DENTAL TREATS REG 12OZ",
        sku: "642863106440",
        quantity: 1,
        price: 19.99,
      },
      {
        name: "WORLD'S BEST CAT LITTER 15LB",
        sku: "728028000201",
        quantity: 1,
        price: 26.99,
      },
    ],
    showSavings: true,
    taxLabel: "Sales Tax",
    taxRate: 7.75,
    showTaxRate: false,
    grandTotalLabel: "TOTAL",
    labels: {
      subtotal: "SUBTOTAL",
      savings: "MEMBER SAVINGS",
    },
    paymentMethod: "Debit Card",
    cardLastFour: "7730",
    showCardAuth: false,
    cardRows: [
      {
        label: "DEBIT",
        value: "************7730",
      },
      {
        label: "ENTRY",
        value: "CONTACTLESS",
      },
      {
        label: "AUTH",
        value: "551903",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            label: "Vital Care member",
            value: "*******4412",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "Thank you for shopping at Petco!",
    policyText: "Returns accepted with receipt. See petco.com for the full return policy. Sample receipt.",
  },
  // nordstrom — was no-source. Sources:
  //   https://www.retaildive.com/news/nordstrom-revamps-loyalty-with-new-nordy-club/532472
  //   https://thepointsguy.com/news/nordstrom-rewards-loyalty-program
  //   https://www.supermoney.com/nordstrom-return-policy
  "nordstrom": {
    businessName: "Nordstrom",
    logoText: "NORDSTROM",
    addressLine1: "Store 0427 · 1100 Sample Square NE",
    addressLine2: "Bellevue, WA 98004",
    phone: "(425) 555-0190",
    website: "nordstrom.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "STORE 0427  REG 112  TRANS 3308",
          },
          {
            label: "Salesperson",
            value: "#2084417",
          },
        ],
      },
    ],
    fontFamily: "mono",
    paperStyle: "thermal",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    skuFirst: false,
    items: [
      {
        name: "ZELLA LIVE IN HIGH WAIST LEGGING",
        sku: "439055812201",
        quantity: 1,
        price: 65.0,
      },
      {
        name: "NIKE AIR FORCE 1 '07 SNEAKER",
        sku: "196153709012",
        quantity: 1,
        price: 115.0,
      },
      {
        name: "NORDSTROM CASHMERE CREWNECK",
        sku: "439098120047",
        quantity: 1,
        price: 129.0,
      },
    ],
    taxLabel: "Sales Tax",
    taxRate: 10.1,
    showTaxRate: false,
    grandTotalLabel: "TOTAL",
    labels: {
      subtotal: "SUBTOTAL",
    },
    paymentMethod: "Credit Card",
    cardLastFour: "3391",
    showCardAuth: false,
    cardRows: [
      {
        label: "MASTERCARD",
        value: "************3391",
      },
      {
        label: "ENTRY",
        value: "CHIP",
      },
      {
        label: "AUTH",
        value: "774102",
      },
    ],
    afterPayment: [
      {
        title: "THE NORDY CLUB",
        rows: [
          {
            label: "Member",
            value: "*******0582",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "Thank you for shopping at Nordstrom.",
    policyText: "We handle returns on a case-by-case basis. Please keep this receipt; see nordstrom.com for our return policy. Sample receipt.",
  },
  // hy-vee — was missing-key-details. Sources:
  //   https://hy-vee.com/resources/fuel-saver-learn-more.aspx
  //   https://www.supermarketnews.com/retail-financial/hy-vee-looks-monetize-customer-receipts
  //   https://hy-veesurveycom.yolasite.com/
  "hy-vee": {
    businessName: "Hy-Vee",
    addressLine1: "Store 1542 · 5100 Sample Mills Pkwy",
    addressLine2: "West Des Moines, IA 50266",
    phone: "(515) 555-0177",
    website: "hy-vee.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "STORE 1542  LANE 06  TRANS 4419  CASHIER 1093",
          },
        ],
      },
    ],
    fontFamily: "mono",
    paperStyle: "thermal",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    items: [
      {
        name: "HY-VEE 2% MILK GAL",
        quantity: 1,
        price: 3.49,
        notTaxed: true,
      },
      {
        name: "BANANAS",
        quantity: 2.31,
        unit: "lb",
        price: 0.59,
        notTaxed: true,
      },
      {
        name: "HY-VEE LG GRADE A EGGS 12CT",
        quantity: 1,
        price: 2.99,
        notTaxed: true,
      },
      {
        name: "HY-VEE GROUND BEEF 80/20 1LB",
        quantity: 2,
        price: 5.99,
        notTaxed: true,
      },
      {
        name: "HY-VEE WHITE BREAD 20OZ",
        quantity: 1,
        price: 1.99,
        notTaxed: true,
      },
      {
        name: "BOUNTY SELECT-A-SIZE 6 DBL",
        quantity: 1,
        price: 11.99,
        taxFlag: "T",
      },
      {
        name: "TIDE PODS ORIG 42CT",
        quantity: 1,
        price: 13.99,
        taxFlag: "T",
      },
    ],
    taxLabel: "TAX",
    taxRate: 7.0,
    showTaxRate: false,
    grandTotalLabel: "TOTAL",
    labels: {
      subtotal: "SUBTOTAL",
    },
    paymentMethod: "Debit Card",
    cardLastFour: "6604",
    showCardAuth: false,
    cardRows: [
      {
        label: "US DEBIT",
        value: "************6604",
      },
      {
        label: "ENTRY",
        value: "CHIP",
      },
      {
        label: "APPROVAL",
        value: "348817",
      },
      {
        label: "AID",
        value: "A0000000980840",
      },
    ],
    afterPayment: [
      {
        title: "FUEL SAVER",
        rows: [
          {
            label: "Earned this visit",
            value: "$0.10/gal",
          },
          {
            label: "Total available",
            value: "$0.25/gal",
          },
          {
            value: "Discounts expire 30 days from date earned",
          },
        ],
      },
      {
        title: "HY-VEE PERKS",
        rows: [
          {
            label: "Member",
            value: "*******2716",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "Thank you for shopping Hy-Vee!\nTell us about your visit at hy-vee.com",
    policyText: "Sample receipt.",
  },
  // einstein-bros-bagels — was missing-key-details. Sources:
  //   https://rewards.einsteinbros.com/Faq
  //   https://www.couponcabin.com/coupons/einstein-bagels/
  //   https://abc11.com/receipt-surveys-food-free/474646
  "einstein-bros-bagels": {
    businessName: "Einstein Bros. Bagels",
    addressLine1: "Store 3317 · 7400 W Sample Ave",
    addressLine2: "Lakewood, CO 80226",
    phone: "(303) 555-0162",
    website: "einsteinbros.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "CHK 4471  TERM 2  SERVER: JORDAN",
          },
          {
            value: "FOR HERE",
          },
        ],
      },
    ],
    fontFamily: "mono",
    paperStyle: "thermal",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    items: [
      {
        name: "Asiago Bagel w/ Shmear",
        quantity: 1,
        price: 3.79,
        modifiers: ["Garden Veggie Shmear"],
      },
      {
        name: "Nova Lox Bagel",
        quantity: 1,
        price: 10.49,
        modifiers: ["Everything Bagel"],
      },
      {
        name: "Farmhouse Egg Sandwich",
        quantity: 1,
        price: 8.29,
        addons: [
          {
            name: "Add Avocado",
            price: 1.5,
          },
        ],
      },
      {
        name: "Medium Hot Coffee",
        quantity: 2,
        price: 2.89,
      },
    ],
    taxLabel: "Tax",
    taxRate: 7.5,
    showTaxRate: false,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "2205",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX2205",
      },
      {
        label: "AUTH",
        value: "019384",
      },
    ],
    orderNumber: "ORDER 58",
    afterPayment: [
      {
        title: "EINSTEIN BROS. REWARDS",
        rows: [
          {
            label: "Receipt Visit Code",
            value: "7KQ2-M9XW-4RPT",
          },
          {
            value: "Enter this code in your rewards account to add this visit's points.",
          },
        ],
      },
      {
        rows: [
          {
            value: "Tell us about your visit at BagelExperience.com\nand get a free bagel with purchase next time.",
          },
        ],
      },
    ],
    showBarcode: false,
    footerMessage: "Thank you!",
    policyText: "Sample receipt.",
  },
  // quest-diagnostics — was wrong-format. Sources:
  //   https://cas2.questdiagnostics.com/help/psc/content/topics/task/billing_non-draw_collection_task.htm
  //   https://virtualold.fapam.edu.br/paying-your-lab-bills-online-i2ui.html
  //   https://stripe.jhu.edu/news/quest-self-pay-pricing
  "quest-diagnostics": {
    businessName: "Quest Diagnostics",
    addressLine1: "Patient Billing",
    addressLine2: "",
    phone: "",
    website: "questdiagnostics.com",
    hideStoreLine: true,
    greeting: "Payment confirmation",
    sections: [
      {
        rows: [
          {
            label: "Invoice Number",
            value: "7104829365",
          },
          {
            label: "Lab Code",
            value: "SKB",
          },
          {
            label: "Patient ID",
            value: "QP41922807",
          },
          {
            label: "Patient",
            value: "SAMPLE, ALEX",
          },
          {
            label: "Date of Service",
            value: "{{date-14}}",
          },
          {
            label: "Ordering Physician",
            value: "Dr. J. Sample",
          },
        ],
      },
    ],
    fontFamily: "inter",
    paperStyle: "modern",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    itemHeader: {
      left: "Description",
      right: "Amount",
    },
    items: [
      {
        name: "80053 Comprehensive Metabolic Panel",
        quantity: 1,
        price: 48.0,
      },
      {
        name: "85025 CBC (includes Differential/Platelets)",
        quantity: 1,
        price: 34.0,
      },
      {
        name: "80061 Lipid Panel",
        quantity: 1,
        price: 52.0,
      },
      {
        name: "36415 Venipuncture",
        quantity: 1,
        price: 12.0,
      },
      {
        name: "Insurance Payment",
        quantity: 1,
        price: -61.4,
      },
      {
        name: "Contractual Adjustment",
        quantity: 1,
        price: -44.6,
      },
    ],
    taxLabel: "Tax",
    taxRate: 0,
    showTaxRate: false,
    labels: {
      subtotal: "Total Charges",
    },
    grandTotalLabel: "Amount Paid",
    paymentMethod: "Credit Card",
    cardLastFour: "9012",
    paymentInline: true,
    showCardAuth: false,
    afterPayment: [
      {
        rows: [
          {
            label: "Confirmation #",
            value: "QP-26-0418837",
          },
          {
            label: "Payment Date",
            value: "{{date+0}}",
          },
        ],
      },
    ],
    footerMessage: "Thank you for your payment. Keep this confirmation for your records.",
    policyText: "Questions about this bill? Contact Quest Diagnostics Billing at the number on your invoice. Sample receipt.",
    showBarcode: false,
    paperFinish: "email",
  },
  // jersey-mike-s — was no-source. Sources:
  //   https://www.thedailymeal.com/1581163/mikes-way-explained-jersey-mikes
  //   https://www.thetakeout.com/1793166/ordering-mistakes-jersey-mikes/
  "jersey-mike-s": {
    businessName: "Jersey Mike's Subs",
    addressLine1: "Store 1093 · 2400 Sample Hwy 35",
    addressLine2: "Manasquan, NJ 08736",
    phone: "(732) 555-0124",
    website: "jerseymikes.com",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "CHECK 2281  REG 1  CASHIER: TAYLOR",
          },
          {
            value: "TO GO",
          },
        ],
      },
    ],
    fontFamily: "mono",
    paperStyle: "thermal",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    items: [
      {
        name: "#13 Original Italian GIANT",
        quantity: 1,
        price: 17.95,
        modifiers: ["Mike's Way", "Provolone"],
      },
      {
        name: "#7 Turkey & Provolone REGULAR",
        quantity: 1,
        price: 11.45,
        modifiers: ["Mike's Way", "No Onions"],
      },
      {
        name: "Chips",
        quantity: 2,
        price: 1.99,
      },
      {
        name: "Regular Fountain Drink",
        quantity: 1,
        price: 2.79,
      },
    ],
    taxLabel: "Sales Tax",
    taxRate: 6.625,
    showTaxRate: false,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "5518",
    showCardAuth: false,
    cardRows: [
      {
        label: "MASTERCARD",
        value: "XXXXXXXXXXXX5518",
      },
      {
        label: "AUTH",
        value: "440912",
      },
    ],
    orderNumber: "ORDER: CHRIS",
    showBarcode: false,
    footerMessage: "Thank you for choosing Jersey Mike's!",
    policyText: "Sample receipt.",
  },
  // zara — was missing-key-details. Sources:
  //   https://www.zara.com/es/en/help-center/StoreReceiptFinder
  //   https://parcelpath.com/retailer-returns/zara-returns/
  //   https://www.elliott.org/company-contacts/zara-customer-service-contacts/
  //   https://www.tax.ny.gov/pdf/publications/sales/pub718c_224.pdf
  "zara": {
    businessName: "ZARA",
    logoText: "ZARA",
    addressLine1: "Store 3942 · 680 Sample Ave",
    addressLine2: "New York, NY 10011",
    phone: "(212) 555-0183",
    website: "zara.com/us",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "STORE 3942  TILL 04  TICKET 118274",
          },
        ],
      },
    ],
    fontFamily: "mono",
    paperStyle: "thermal",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    items: [
      {
        name: "WOOL BLEND COAT  L",
        sku: "8216/744/800",
        quantity: 1,
        price: 189.0,
      },
      {
        name: "STRAIGHT FIT JEANS  32",
        sku: "6688/320/407",
        quantity: 1,
        price: 49.9,
        notTaxed: true,
      },
      {
        name: "BASIC KNIT SWEATER  M",
        sku: "3920/402/712",
        quantity: 1,
        price: 45.9,
        notTaxed: true,
      },
      {
        name: "LEATHER ANKLE BOOTS  42",
        sku: "2014/320/040",
        quantity: 1,
        price: 119.0,
      },
    ],
    taxLabel: "Sales Tax",
    taxRate: 8.875,
    showTaxRate: false,
    grandTotalLabel: "TOTAL",
    labels: {
      subtotal: "SUBTOTAL",
    },
    paymentMethod: "Credit Card",
    cardLastFour: "6120",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "************6120",
      },
      {
        label: "ENTRY",
        value: "CONTACTLESS",
      },
      {
        label: "AUTH",
        value: "305571",
      },
    ],
    showBarcode: true,
    footerMessage: "Keep this ticket for returns and exchanges.",
    policyText: "Returns and exchanges within 30 days of purchase with this receipt. If you gave your phone number at the till, your E-Ticket is available in the Zara app. Sample receipt.",
  },
  // texas-roadhouse — was missing-key-details. Sources:
  //   https://brobible.com/culture/article/texas-roadhouse-tipping-tablet/
  //   https://www.mashed.com/2219762/texas-roadhouse-tipping-strategy-explained/
  //   https://www.kxxv.com/news/national/truckers-photo-of-receipt-goes-viral-thankful-for-texas-roadhouses-support
  "texas-roadhouse": {
    businessName: "Texas Roadhouse",
    addressLine1: "4720 Bardstown Rd",
    addressLine2: "Louisville, KY 40218",
    phone: "(502) 555-0186",
    website: "texasroadhouse.com",
    hideStoreLine: true,
    cashier: "",
    register: "",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    sections: [
      {
        rows: [
          {
            label: "Server:",
            value: "Kayla",
          },
          {
            label: "Table:",
            value: "24",
          },
          {
            label: "Guests:",
            value: "3",
          },
          {
            label: "Check #:",
            value: "4127",
          },
        ],
      },
    ],
    items: [
      {
        name: "16 oz Ribeye",
        quantity: 1,
        price: 27.99,
        modifiers: ["Medium Rare", "Loaded Sweet Potato", "House Salad"],
      },
      {
        name: "Grilled BBQ Chicken",
        quantity: 1,
        price: 16.99,
        modifiers: ["Seasoned Rice", "Green Beans"],
      },
      {
        name: "Cactus Blossom",
        quantity: 1,
        price: 8.99,
      },
      {
        name: "Sweet Tea",
        quantity: 2,
        price: 3.29,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 6,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "Subtotal",
      tip: "Tip",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "3108",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX3108",
      },
      {
        label: "Auth Code:",
        value: "072613",
      },
      {
        label: "Entry:",
        value: "Chip",
      },
    ],
    showBarcode: false,
    footerMessage: "Thank you for dining with us!",
    policyText: "Legendary Food, Legendary Service.",
  },
  // michael-kors — was no-source. Sources:
  "michael-kors": {
    businessName: "MICHAEL KORS",
    addressLine1: "Store #1247",
    addressLine2: "610 Lexington Ave\nNew York, NY 10022",
    phone: "(212) 555-0147",
    website: "michaelkors.com",
    hideStoreLine: true,
    cashier: "Associate: Nicole",
    register: "Reg 02",
    fontFamily: "inter",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "lined",
    paperStyle: "thermal",
    skuFirst: true,
    items: [
      {
        name: "Jet Set Travel Large Saffiano Leather Tote",
        sku: "30T3GTVT3L",
        quantity: 1,
        price: 398.0,
        discount: 79.6,
      },
      {
        name: "Saffiano Leather Continental Wallet",
        sku: "32S4GJ6E7L",
        quantity: 1,
        price: 178.0,
      },
    ],
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 8.875,
    showTaxRate: false,
    discount: 0,
    labels: {
      subtotal: "Subtotal",
      itemDiscount: "Promotion",
    },
    grandTotalLabel: "Total",
    showSavings: true,
    paymentMethod: "Credit Card",
    cardLastFour: "6620",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "************6620",
      },
      {
        label: "Auth:",
        value: "184402",
      },
    ],
    showBarcode: true,
    footerMessage: "Thank you for shopping Michael Kors",
    policyText: "Returns and exchanges require this receipt. See michaelkors.com for our full return policy.",
  },
  // dollar-general — was no-source. Sources:
  //   https://merchants.letsweel.com/merchants/dollar-general
  "dollar-general": {
    businessName: "DOLLAR GENERAL",
    addressLine1: "STORE #18342",
    addressLine2: "1215 MAIN ST\nGOODLETTSVILLE, TN 37072",
    phone: "(615) 555-0193",
    website: "dollargeneral.com",
    hideStoreLine: true,
    cashier: "CASHIER: TERESA",
    register: "REG 1",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    paperStyle: "thermal",
    items: [
      {
        name: "CLOROX BLEACH 81OZ",
        quantity: 1,
        price: 5.5,
        taxFlag: "T",
      },
      {
        name: "DG HOME PAPER TOWEL 6RL",
        quantity: 1,
        price: 6.95,
        taxFlag: "T",
      },
      {
        name: "CLOVER VALLEY WHT BREAD",
        quantity: 1,
        price: 1.75,
        taxFlag: "T",
      },
      {
        name: "LAYS CLASSIC 7.75OZ",
        quantity: 2,
        price: 4.25,
        taxFlag: "T",
      },
      {
        name: "COCA-COLA 2LTR",
        quantity: 1,
        price: 2.95,
        taxFlag: "T",
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 9.75,
    showTaxRate: false,
    discount: 0,
    labels: {
      subtotal: "SUBTOTAL",
      change: "CHANGE",
      amountTendered: "CASH",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Cash",
    amountTendered: 40.0,
    showCardAuth: false,
    showBarcode: true,
    footerMessage: "Thank you for shopping at Dollar General",
    policyText: "Save Time. Save Money. Every Day!",
  },
  // hermes — was no-source. Sources:
  //   https://forum.purseblog.com/threads/tax-fsh.359194/
  //   https://www.pursebop.com/dearpursebop/question/if-i-order-hermes-products-online-for-delivery-in-store-in-europe-can-i-claim-a-vat-refund
  "hermes": {
    businessName: "HERMÈS",
    logoText: "HERMÈS\nPARIS",
    addressLine1: "45 Rue Saint-Florentin",
    addressLine2: "75008 Paris",
    phone: "01 40 17 00 00",
    website: "hermes.com",
    hideStoreLine: true,
    cashier: "Vendeur : Camille",
    register: "Caisse 03",
    fontFamily: "playfair",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "lined",
    paperStyle: "minimal",
    dateOrder: "dmy",
    items: [
      {
        name: "Carré 90 en twill de soie",
        sku: "H003410S",
        quantity: 1,
        price: 560.0,
      },
      {
        name: "Twilly en soie",
        sku: "H063370S",
        quantity: 1,
        price: 215.0,
      },
    ],
    currency: "EUR",
    taxIncluded: true,
    taxLabel: "TVA",
    taxRate: 20,
    taxLines: [
      {
        label: "TVA 20%",
        rate: 20,
      },
    ],
    discount: 0,
    labels: {
      subtotal: "Sous-total",
      paymentMethod: "Paiement",
      change: "Rendu",
    },
    grandTotalLabel: "Total TTC",
    paymentMethod: "Credit Card",
    paymentName: "Carte bancaire",
    cardLastFour: "5402",
    showCardAuth: false,
    showBarcode: false,
    footerMessage: "Merci de votre visite",
    policyText: "Échange possible sous 30 jours sur présentation de ce ticket. Exemple de reçu.",
  },
  // napa-auto-parts — was missing-key-details. Sources:
  //   https://www.napaonline.com/en/returns
  //   https://www.napaonline.com/en/what-is-a-core
  //   https://career.io/job/parts-counter-clerk-napa-siddons-martin-emergency-d59e91c2d211958d3c772cad7040058c
  //   https://agendalink.fortbendcountytx.gov/docs/2012/CCTR/20121113_2418/8922%5FInv%20Transmittal%20JM%2Epdf
  "napa-auto-parts": {
    businessName: "NAPA AUTO PARTS",
    addressLine1: "Peachtree Auto Supply #2741",
    addressLine2: "2280 Cheshire Bridge Rd NE\nAtlanta, GA 30324",
    phone: "(404) 555-0172",
    website: "napaonline.com",
    hideStoreLine: true,
    cashier: "Counter: MARCUS",
    register: "",
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "table",
    paperStyle: "thermal",
    skuFirst: true,
    sections: [
      {
        rows: [
          {
            label: "INVOICE",
            value: "274-118902",
          },
          {
            label: "CUSTOMER",
            value: "CASH CUSTOMER",
          },
        ],
      },
    ],
    items: [
      {
        name: "NAPA LEGEND PREMIUM BATTERY",
        sku: "BAT 7565",
        quantity: 1,
        price: 219.99,
      },
      {
        name: "CORE CHARGE - BATTERY",
        sku: "BAT 7565C",
        quantity: 1,
        price: 22.0,
      },
      {
        name: "NAPA GOLD OIL FILTER",
        sku: "FIL 1515",
        quantity: 1,
        price: 10.49,
      },
      {
        name: "NAPA FULL SYN 5W-30 5QT",
        sku: "NMO 65-112",
        quantity: 1,
        price: 34.99,
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 8.9,
    showTaxRate: false,
    discount: 0,
    labels: {
      subtotal: "SUBTOTAL",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    cardLastFour: "2290",
    showCardAuth: false,
    cardRows: [
      {
        label: "DEBIT",
        value: "XXXXXXXXXXXX2290",
      },
      {
        label: "AUTH #",
        value: "318845",
      },
    ],
    showBarcode: true,
    footerMessage: "*** CUSTOMER COPY ***",
    policyText: "No returns without receipt. Used cores must be returned within 30 days of purchase with this receipt for core credit.",
  },
  // buffalo-wild-wings — was missing-key-details. Sources:
  //   https://mahomettwp.gov/wp-content/uploads/2026/01/2023JulyTownCemRedacted-4867-8509-4778-v5.pdf
  //   https://www.thedailymeal.com/1399761/restaurants-you-should-always-ask-for-receipt-why/
  "buffalo-wild-wings": {
    businessName: "Buffalo Wild Wings",
    addressLine1: "Grill and Bar #4182",
    addressLine2: "3100 Prairie Crossing Dr\nSpringfield, IL 62711",
    phone: "217-555-0148",
    website: "",
    hideStoreLine: true,
    cashier: "",
    register: "",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "asterisk",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    sections: [
      {
        rows: [
          {
            label: "Server:",
            value: "Tyler",
          },
          {
            label: "Table",
            value: "42/1",
          },
          {
            label: "Guests:",
            value: "2",
          },
          {
            value: "#80117",
          },
          {
            label: "Order Type:",
            value: "DINE IN",
          },
          {
            value: "Seat 1",
          },
        ],
      },
    ],
    items: [
      {
        name: "10 BONELESS",
        quantity: 1,
        price: 14.49,
        modifiers: ["MILD"],
        addons: [
          {
            name: "TATER TOT PLTR",
            price: 1.0,
          },
        ],
      },
      {
        name: "6 TRADITIONAL",
        quantity: 1,
        price: 11.49,
        modifiers: ["HONEY BBQ"],
      },
      {
        name: "LG DOMESTIC DRAFT",
        quantity: 1,
        price: 6.99,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 9.75,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "Subtotal",
      tip: "+ Tips:",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Debit Card",
    paymentName: "Sale",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        value: "VISA",
      },
      {
        label: "Card #:",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "Card Entry Method:",
        value: "CHIP",
      },
      {
        value: "*** EMV PURCHASE ***",
      },
      {
        label: "App Label:",
        value: "VISA DEBIT",
      },
      {
        label: "AID:",
        value: "A0000000031010",
      },
      {
        label: "TVR:",
        value: "8000008000",
      },
      {
        label: "TSI:",
        value: "6800",
      },
      {
        label: "Approval:",
        value: "51A27C",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            value: "Don't leave points on the table! Download the Buffalo Wild Wings Mobile App and scan the code below or enter your claim number to receive credit for your visit.",
          },
        ],
      },
      {
        rows: [
          {
            label: "Your Claim Number:",
            value: "4182-80117-2741",
          },
        ],
      },
    ],
    qrCode: true,
    showBarcode: true,
    footerMessage: "*** Customer Copy ***",
    policyText: "",
  },
  // shake-shack — was no-source. Sources:
  //   https://displaydaily.com/shake-shack-opening-cashless-kiosk-in-new-york/
  //   https://www.quirks.com/storage/ralene/2025%20TQE%20Session%20Documents/2025%20TQE%20NY%20Sess%20Docs/Day2_Rm4_1200.pdf
  "shake-shack": {
    businessName: "Shake Shack",
    addressLine1: "Midtown East Shack",
    addressLine2: "712 Third Ave\nNew York, NY 10017",
    phone: "(646) 555-0139",
    website: "shakeshack.com",
    hideStoreLine: true,
    cashier: "Kiosk 3",
    register: "",
    fontFamily: "inter",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    sections: [
      {
        rows: [
          {
            label: "Name:",
            value: "JORDAN",
          },
          {
            label: "Order Type:",
            value: "Dine In",
          },
        ],
      },
    ],
    items: [
      {
        name: "ShackBurger",
        quantity: 1,
        price: 8.29,
        modifiers: ["No Tomato"],
        addons: [
          {
            name: "Add Bacon",
            price: 2.0,
          },
        ],
      },
      {
        name: "Crinkle Cut Fries",
        quantity: 1,
        price: 4.89,
      },
      {
        name: "Vanilla Shake",
        quantity: 1,
        price: 7.29,
      },
      {
        name: "Fresh Lemonade",
        quantity: 1,
        price: 4.49,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.875,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "Subtotal",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "9031",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "**** 9031",
      },
      {
        label: "Auth:",
        value: "562119",
      },
      {
        label: "Entry:",
        value: "Contactless",
      },
    ],
    orderNumber: "ORDER 47",
    showBarcode: false,
    footerMessage: "We'll text you when your order is ready.",
    policyText: "Stand For Something Good.",
  },
  // shoprite — was no-source. Sources:
  //   https://slickdeals.net/f/18962320-shoprite-supermarkets-12-14-12-20-purchase-100-in-any-gc-excludes-visa-mc-amex-and-shoprite-gc-get-a-20-grocery-voucher-valid-12-21-12-27
  //   https://abc7.com/archive/7569244
  //   https://www.supermarketnews.com/company-news/shoprite-locks-in-prices-on-thousands-of-grocery-items
  "shoprite": {
    businessName: "ShopRite",
    addressLine1: "ShopRite of Maple Ridge",
    addressLine2: "1450 Route 9 North\nMaple Ridge, NJ 08861",
    phone: "(732) 555-0164",
    website: "shoprite.com",
    hideStoreLine: true,
    cashier: "CASHIER 214",
    register: "LANE 6",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    paperStyle: "thermal",
    items: [
      {
        name: "GROCERY",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "BOWL & BASKET CEREAL",
        quantity: 1,
        price: 3.49,
        notTaxed: true,
        discount: 1.0,
      },
      {
        name: "PASTA SAUCE MARINARA",
        quantity: 2,
        price: 2.79,
        notTaxed: true,
      },
      {
        name: "DAIRY",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "SR WHOLE MILK GAL",
        quantity: 1,
        price: 4.19,
        notTaxed: true,
      },
      {
        name: "PRODUCE",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "BANANAS",
        quantity: 1,
        price: 1.62,
        notTaxed: true,
        unit: "2.7 lb @ .60/lb",
      },
      {
        name: "HOUSEHOLD",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "BOUNTY PAPER TOWELS 6 RL",
        quantity: 1,
        price: 13.99,
        discount: 3.0,
        taxFlag: "T",
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 6.625,
    showTaxRate: false,
    discount: 0,
    labels: {
      subtotal: "SUBTOTAL",
      itemDiscount: "PRICE PLUS SAVINGS",
      savings: "TOTAL SAVINGS",
      change: "CHANGE",
    },
    grandTotalLabel: "TOTAL",
    showSavings: true,
    paymentMethod: "Debit Card",
    cardLastFour: "7752",
    showCardAuth: false,
    cardRows: [
      {
        label: "DEBIT",
        value: "XXXXXXXXXXXX7752",
      },
      {
        label: "AUTH",
        value: "620418",
      },
      {
        label: "PRICE PLUS CARD",
        value: "XXXXXXX4093",
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING SHOPRITE",
    policyText: "Use your Price Plus club card every trip to get the sale prices.",
  },
  // sweetgreen — was wrong-format. Sources:
  //   https://www.nrn.com/fast-casual/sweetgreen-pilot-first-digital-only-pickup-location-washington-dc
  //   https://www.qsrmagazine.com/fast-casual/sweetgreens-new-restaurant-concept-goes-fully-digital
  //   https://www.american.edu/hr/AhealthyU/upload/sweetgreen-Outpost-How-It-Works.pdf
  "sweetgreen": {
    businessName: "sweetgreen",
    logoText: "sweetgreen",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "sweetgreen.com",
    hideStoreLine: true,
    cashier: "",
    register: "",
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    dividers: "minimal",
    greeting: "Thanks for your order, Alex\nHere's your receipt.",
    sections: [
      {
        title: "Pickup",
        rows: [
          {
            label: "Location",
            value: "sweetgreen Silver Lake, 3320 Sunset Blvd, Los Angeles, CA",
          },
          {
            label: "Order",
            value: "#SG-58213",
          },
          {
            label: "Method",
            value: "Pickup",
          },
        ],
      },
    ],
    items: [
      {
        name: "Harvest Bowl",
        quantity: 1,
        price: 15.95,
        modifiers: ["Light balsamic vinaigrette"],
      },
      {
        name: "Kale Caesar",
        quantity: 1,
        price: 13.95,
        addons: [
          {
            name: "Add roasted chicken",
            price: 3.5,
          },
        ],
      },
      {
        name: "Hibiscus Clover Iced Tea",
        quantity: 1,
        price: 3.95,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 9.75,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "Subtotal",
      tip: "Tip",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "1184",
    paymentInline: true,
    showCardAuth: false,
    showBarcode: false,
    footerMessage: "Questions about your order? Visit sweetgreen.com or the app.",
    policyText: "Sample receipt.",
  },
  // postmates — was wrong-format. Sources:
  //   https://www.ridesharingdriver.com/ubereats-guide/
  //   https://www.kiplinger.com/personal-finance/spending/leisure/food/603258/food-delivery-apps-we-compare-4-of-the-biggest
  //   https://www.uber.com/gb/en/blog/understanding-fees-and-arrival-time/
  "postmates": {
    businessName: "Postmates",
    logoText: "Postmates",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "postmates.com",
    hideStoreLine: true,
    cashier: "",
    register: "",
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "qtycol",
    dividers: "minimal",
    greeting: "Thanks for ordering, Jordan\nHere's your receipt for Sunset Taqueria.",
    sections: [
      {
        title: "Delivery details",
        rows: [
          {
            label: "Delivered to",
            value: "2150 Hyperion Ave, Los Angeles, CA",
          },
          {
            label: "Courier",
            value: "Luis",
          },
          {
            label: "Order",
            value: "#3KQ8D",
          },
        ],
      },
    ],
    items: [
      {
        name: "Carne Asada Burrito",
        quantity: 1,
        price: 13.5,
        modifiers: ["Extra salsa verde"],
      },
      {
        name: "Chicken Tacos (3)",
        quantity: 1,
        price: 11.75,
      },
      {
        name: "Chips & Guacamole",
        quantity: 1,
        price: 6.95,
      },
      {
        name: "Horchata (L)",
        quantity: 1,
        price: 4.25,
      },
    ],
    currency: "USD",
    taxLabel: "Taxes",
    taxRate: 9.75,
    showTaxRate: false,
    discount: 0,
    deliveryFee: 2.99,
    serviceFee: 5.42,
    tip: 5.0,
    labels: {
      subtotal: "Subtotal",
      deliveryFee: "Delivery Fee",
      serviceFee: "Service Fee",
      tip: "Tip",
      paymentMethod: "Payments",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    paymentName: "Visa",
    cardLastFour: "5530",
    showCardAuth: false,
    cardRows: [
      {
        value: "Visa ••••5530",
      },
    ],
    showBarcode: false,
    footerMessage: "Rate your order in the Postmates app.",
    policyText: "Sample receipt. Fees and taxes vary by location and order.",
  },
  // papa-john-s — was missing-key-details. Sources:
  //   https://www.foxbusiness.com/lifestyle/papa-johns-box-message-telling-customers-tip-delivery-drivers-sparks-fierce-tipping-culture-debate-online
  //   https://abc11.com/archive/9225207
  //   https://contactus.papatalksurvey.smg.com/
  //   https://www.papajohnsfeedback.com/Projects/PAPA_CSI/pdfs/Terms_QAT_en-GB.pdf
  "papa-john-s": {
    businessName: "Papa John's",
    addressLine1: "3418 Sample Pike Rd",
    addressLine2: "Louisville, KY 40220",
    phone: "(502) 555-0186",
    website: "papajohns.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    sections: [
      {
        rows: [
          {
            label: "Store #",
            value: "4127",
          },
          {
            label: "Order #",
            value: "58",
          },
          {
            label: "Order Type",
            value: "DELIVERY",
          },
          {
            label: "Customer",
            value: "SAM R.",
          },
          {
            label: "Placed",
            value: "{{date+0}}",
          },
        ],
      },
    ],
    items: [
      {
        name: "LG Original Pepperoni",
        quantity: 1,
        price: 17.99,
      },
      {
        name: "LG Thin Garden Fresh",
        quantity: 1,
        price: 18.99,
      },
      {
        name: "Garlic Knots",
        quantity: 1,
        price: 7.99,
      },
      {
        name: "Special Garlic Sauce",
        quantity: 2,
        price: 0.99,
      },
      {
        name: "2-Liter Pepsi",
        quantity: 1,
        price: 3.99,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 6.0,
    showTaxRate: false,
    deliveryFee: 4.99,
    tip: 5.0,
    discount: 0,
    labels: {
      subtotal: "Subtotal",
      deliveryFee: "Delivery Fee",
      tip: "Driver Tip",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "3391",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX3391",
      },
      {
        label: "Auth",
        value: "071482",
      },
    ],
    footerMessage: "Better Ingredients. Better Pizza.\nThank you for your order!",
    showBarcode: false,
  },
  // marshalls — was missing-key-details. Sources:
  //   https://blog.vendoo.co/marshalls-return-policy
  //   https://www.marshallsfeedbackcom.com/
  //   https://www.mycard-activation.com/marshallsfeedback/
  //   https://legalclarity.org/what-is-the-marshalls-chicago-il-charge-on-your-statement/
  "marshalls": {
    businessName: "Marshalls",
    addressLine1: "9120 Sample Westheimer Rd",
    addressLine2: "Houston, TX 77063",
    phone: "(713) 555-0147",
    website: "marshalls.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    paperStyle: "thermal",
    sections: [
      {
        rows: [
          {
            value: "STORE 0846  REG 03  TRAN 2719",
          },
          {
            label: "Associate",
            value: "118254",
          },
          {
            label: "Date",
            value: "{{date+0}}",
          },
        ],
      },
    ],
    items: [
      {
        name: "WOMENS KNIT TOP",
        quantity: 1,
        price: 12.99,
      },
      {
        name: "MENS DENIM JEANS",
        quantity: 1,
        price: 24.99,
      },
      {
        name: "HANDBAG",
        quantity: 1,
        price: 39.99,
      },
      {
        name: "THROW PILLOW",
        quantity: 1,
        price: 14.99,
      },
      {
        name: "SCENTED CANDLE",
        quantity: 1,
        price: 9.99,
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 8.25,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "SUBTOTAL",
      change: "CHANGE",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "6024",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "************6024",
      },
      {
        label: "AUTH #",
        value: "294817",
      },
      {
        label: "ENTRY",
        value: "CHIP",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            value: "Tell us about your visit",
          },
          {
            label: "Survey code",
            value: "0846 2719 0331 58",
          },
        ],
      },
    ],
    footerMessage: "Thank you for shopping at Marshalls",
    policyText: "Returns and exchanges within 30 days with this receipt.",
    showBarcode: true,
  },
  // ross-dress-for-less — was missing-key-details. Sources:
  //   https://rosslistens.com/
  //   https://closo.co/blogs/returns-refunds/ross-dress-for-less-return-policy
  //   https://www.sweepstakesbible.com/giveaways/wwwtellrosscom
  "ross-dress-for-less": {
    businessName: "Ross Dress for Less",
    addressLine1: "4560 Sample Dublin Blvd",
    addressLine2: "Dublin, CA 94568",
    phone: "(925) 555-0163",
    website: "rossstores.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    paperStyle: "thermal",
    sections: [
      {
        rows: [
          {
            value: "Tell us how we did at rosslistens.com",
          },
          {
            label: "Survey #",
            value: "418 306 927 154 082",
          },
        ],
      },
      {
        rows: [
          {
            value: "STORE 1182  REG 02  TRANS 3375",
          },
          {
            label: "Date",
            value: "{{date+0}}",
          },
        ],
      },
    ],
    items: [
      {
        name: "MENS POLO SHIRT",
        quantity: 2,
        price: 12.99,
      },
      {
        name: "WOMENS MAXI DRESS",
        quantity: 1,
        price: 16.99,
      },
      {
        name: "BATH TOWEL",
        quantity: 2,
        price: 7.99,
      },
      {
        name: "KIDS SNEAKERS",
        quantity: 1,
        price: 14.99,
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 10.25,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "SUBTOTAL",
      change: "CHANGE",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    cardLastFour: "8812",
    showCardAuth: false,
    cardRows: [
      {
        label: "DEBIT",
        value: "************8812",
      },
      {
        label: "AUTH",
        value: "553019",
      },
    ],
    footerMessage: "Thank you for shopping at Ross!",
    policyText: "Refunds or exchanges within 30 days with receipt. Without a receipt, store credit at the lowest recent selling price.",
    showBarcode: true,
  },
  // usps — was missing-key-details. Sources:
  //   https://faq.usps.com/s/article/USPS-Tracking-The-Basics
  //   https://faq.usps.com/s/article/How-to-find-your-tracking-number
  //   https://pe.usps.com/Archive/NHTML/DMMArchive20260712/Notice123.htm
  //   https://www.createreceipt.com/templates/logistics/usps
  "usps": {
    businessName: "UNITED STATES POSTAL SERVICE",
    addressLine1: "SPRINGDALE POST OFFICE\n215 SAMPLE EMMA AVE",
    addressLine2: "SPRINGDALE, AR 72764-9998",
    phone: "(800)275-8777",
    website: "usps.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "table",
    paperStyle: "thermal",
    items: [
      {
        name: "Priority Mail® Flat Rate Env",
        quantity: 1,
        price: 12.9,
        modifiers: ["Destination: 30309", "Weight: 0 lb 6.40 oz", "Tracking #: 9505 5121 4087 6301 2245 18"],
      },
      {
        name: "First-Class Mail® Letter",
        quantity: 1,
        price: 0.78,
        modifiers: ["Destination: 10027", "Weight: 0 lb 0.90 oz"],
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 0,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "Total",
    },
    grandTotalLabel: "Grand Total:",
    paymentMethod: "Credit Card",
    paymentName: "Credit Card Remit",
    cardLastFour: "2846",
    showCardAuth: false,
    cardRows: [
      {
        label: "Card Name",
        value: "VISA",
      },
      {
        label: "Account #",
        value: "XXXXXXXXXXXX2846",
      },
      {
        label: "Approval #",
        value: "418273",
      },
      {
        label: "Transaction #",
        value: "612",
      },
      {
        label: "AID",
        value: "A0000000031010  Chip",
      },
      {
        label: "AL",
        value: "VISA CREDIT",
      },
      {
        label: "PIN",
        value: "Not Required",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            label: "Expected Delivery Date",
            value: "{{date+2}}",
          },
        ],
      },
      {
        rows: [
          {
            value: "Text your tracking number to 28777 (2USPS) to get the latest status.",
          },
          {
            value: "Sign up for Informed Delivery at informeddelivery.usps.com",
          },
        ],
      },
      {
        rows: [
          {
            value: "All sales final on stamps and postage. Refunds for guaranteed services only. Thank you for your business.",
          },
          {
            value: "Tell us about your experience: postalexperience.com/Pos",
          },
        ],
      },
      {
        rows: [
          {
            label: "UFN",
            value: "045218-0193",
          },
          {
            label: "Receipt #",
            value: "840-57300162-1-7712408-2",
          },
          {
            label: "Clerk",
            value: "07",
          },
        ],
      },
    ],
    footerMessage: "",
    showBarcode: true,
  },
  // cash-app — was wrong-format. Sources:
  //   https://www.lrl.mn.gov/archive/minutes/senate/2022/rulesethical/20220615/rulesethical_20220615_respondentdocuments.pdf
  //   https://root.packagist.org/packages/ruhulfbr/cashapp-receipt-verifier
  "cash-app": {
    businessName: "Cash App",
    logoText: "Cash App",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "cash.app",
    cashier: "",
    register: "",
    hideStoreLine: true,
    greeting: "Jordan Lee\nPayment to $JordanLee",
    fontFamily: "inter",
    paperStyle: "minimal",
    paperFinish: "email",
    headerAlign: "center",
    ruleStyle: "solid",
    dividers: "minimal",
    itemStyle: "lined",
    itemHeader: {
      left: "For",
      right: "Amount",
    },
    sections: [
      {
        rows: [
          {
            value: "{{date+0}}",
          },
          {
            value: "Completed",
          },
        ],
      },
    ],
    items: [
      {
        name: "October rent",
        quantity: 1,
        price: 850.0,
      },
    ],
    hideSubtotal: true,
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 0,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "Amount",
    paymentMethod: "Mobile Payment",
    paymentName: "Cash",
    cardLastFour: "",
    paymentInline: true,
    showCardAuth: false,
    labels: {
      paymentMethod: "Source",
    },
    afterPayment: [
      {
        rows: [
          {
            label: "Identifier",
            value: "#D7K2MQ9",
          },
          {
            label: "To",
            value: "Jordan Lee",
          },
          {
            label: "From",
            value: "Casey Morgan",
          },
        ],
      },
    ],
    footerMessage: "cash.app — Private",
    showBarcode: false,
  },
  // dior — was no-source. Sources:
  //   https://zapptax.com/en/blog/dior-vat-refund-france-claim-tax-back
  //   https://zapptax.com/en/blog/primark-vat-refund-how-to-claim-tax-back-france
  "dior": {
    businessName: "DIOR",
    logoText: "DIOR",
    addressLine1: "18 Rue Exemple Saint-Honoré\n75008 Paris",
    addressLine2: "SIRET 552 000 000 00018 · TVA FR00 552000000",
    phone: "+33 1 55 00 00 00",
    website: "dior.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    fontFamily: "serif",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "lined",
    paperStyle: "minimal",
    dateOrder: "dmy",
    sections: [
      {
        rows: [
          {
            label: "Ticket n°",
            value: "0418-002731",
          },
          {
            label: "Vendeur",
            value: "Camille",
          },
          {
            label: "Date",
            value: "{{date+0}}",
          },
        ],
      },
    ],
    items: [
      {
        name: "Sauvage Eau de Parfum 100 ml",
        quantity: 1,
        price: 165.0,
      },
      {
        name: "Rouge Dior Lipstick 999",
        quantity: 1,
        price: 49.0,
      },
    ],
    currency: "EUR",
    taxIncluded: true,
    taxLabel: "dont TVA 20%",
    taxRate: 20,
    taxLines: [
      {
        label: "dont TVA 20%",
        rate: 20,
      },
    ],
    showTaxRate: false,
    hideSubtotal: true,
    discount: 0,
    tip: 0,
    grandTotalLabel: "TOTAL TTC",
    paymentMethod: "Credit Card",
    paymentName: "CB",
    cardLastFour: "4071",
    showCardAuth: false,
    cardRows: [
      {
        label: "CARTE",
        value: "XXXX XXXX XXXX 4071",
      },
      {
        label: "AUTO",
        value: "183520",
      },
    ],
    labels: {
      paymentMethod: "Règlement",
    },
    footerMessage: "Merci de votre visite",
    policyText: "Échange sous 30 jours sur présentation de ce ticket. (sample policy — verify)",
    showBarcode: false,
  },
  // hertz — was wrong-format. Sources:
  //   https://images.hertz.com/pdfs/Chargesexplained-English-v8.pdf
  //   https://images.hertz.com/pdfs/fireflyreceipt.pdf
  //   https://www.hertz.ca/rentacar/productservice/index.jsp?targetPage=fee_definitions.jsp
  //   https://rentalverdict.com/tips/concession-recovery-fee/
  "hertz": {
    businessName: "Hertz",
    addressLine1: "ORLANDO INTL AP",
    addressLine2: "RES: G71935284C4 / HERD / C",
    phone: "",
    website: "hertz.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    fontFamily: "courier",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    paperStyle: "modern",
    items: [
      {
        name: "INITIAL CHARGES",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "RENTAL RATE ($64.99/Day @ 3 Days)",
        quantity: 3,
        price: 64.99,
      },
      {
        name: "CHARGES ADDED DURING RENTAL",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "LDW ($34.99/Day @ 3 Days)",
        quantity: 3,
        price: 34.99,
      },
      {
        name: "FUEL & SERVICE (9.150/Gal., 4 Gal.)",
        quantity: 4,
        price: 9.15,
      },
      {
        name: "SERVICE CHARGES/TAXES",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "AIRPORT CONCESSION FEE RECOVERY (ACFR)",
        quantity: 1,
        price: 21.66,
        notTaxed: true,
      },
      {
        name: "VEH. LICENSING COST RECOVERY (VLCR)",
        quantity: 3,
        price: 2.1,
        notTaxed: true,
      },
      {
        name: "CUSTOMER FACILITY CHARGE (CFC)/USE FEE",
        quantity: 3,
        price: 2.5,
        notTaxed: true,
      },
      {
        name: "FL STATE SURCHARGE",
        quantity: 3,
        price: 2.0,
        notTaxed: true,
      },
    ],
    currency: "USD",
    taxLabel: "TAX 6.500%",
    taxRate: 6.5,
    showTaxRate: false,
    hideSubtotal: true,
    discount: 0,
    tip: 0,
    grandTotalLabel: "TOTAL AMT DUE",
    paymentMethod: "Credit Card",
    paymentName: "PAID BY MC",
    cardLastFour: "7341",
    showCardAuth: false,
    cardRows: [
      {
        value: "XXXXXXXXXXXX7341",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            label: "VEHICLE",
            value: "04418/9152736 2025 COROLLA - FL QX4 82T",
          },
          {
            label: "FUEL",
            value: "FULL 8/8 OUT, 4/8 IN",
          },
          {
            label: "MILES CHECKIN",
            value: "18642",
          },
          {
            label: "MILES @ RENTAL",
            value: "18297",
          },
          {
            label: "MILES DRIVEN",
            value: "345",
          },
          {
            label: "RENTED",
            value: "ORLANDO INTL A/P",
          },
          {
            label: "RENTAL",
            value: "{{date-3}}",
          },
          {
            label: "RETURNED",
            value: "{{date+0}}",
          },
          {
            label: "PLAN IN",
            value: "MCOT",
          },
          {
            label: "RATE CLASS",
            value: "C",
          },
          {
            label: "PLAN OUT",
            value: "MCOT",
          },
        ],
      },
    ],
    footerMessage: "Thank You For Renting From Hertz",
    policyText: "For an explanation of the above charges, see hertz.com.",
    showBarcode: false,
  },
  // booking-com — was wrong-format. Sources:
  //   https://www.booking.com/tpi_faq.html
  //   https://secure.booking.com/faq.en-us.html?aid=330843
  //   https://partnerhelp.booking.com/hc/en-us/articles/360001925128-Is-city-tax-included-in-my-prices-on-Booking-com-
  //   https://help.business.booking.com/hc/en-us/articles/14862570197268-How-can-I-get-my-invoice
  "booking-com": {
    businessName: "Booking.com",
    logoText: "Booking.com",
    addressLine1: "Hôtel Exemple Montmartre\n24 Rue Exemple, 75018 Paris, France",
    addressLine2: "",
    phone: "",
    website: "booking.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    greeting: "Your booking is confirmed",
    fontFamily: "inter",
    paperStyle: "modern",
    paperFinish: "email",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    itemHeader: {
      left: "Price",
      right: "€",
    },
    dateOrder: "dmy",
    sections: [
      {
        rows: [
          {
            label: "Confirmation number",
            value: "4718.226.903",
          },
          {
            label: "PIN code",
            value: "5821",
          },
        ],
      },
      {
        rows: [
          {
            label: "Check-in",
            value: "{{date+0}}",
          },
          {
            label: "Check-out",
            value: "{{date+3}}",
          },
          {
            label: "Your reservation",
            value: "3 nights, 1 room",
          },
          {
            label: "Guest",
            value: "Alex Martin",
          },
        ],
      },
    ],
    items: [
      {
        name: "Superior Double Room (per night)",
        quantity: 3,
        price: 189.0,
      },
    ],
    currency: "EUR",
    taxIncluded: true,
    taxLabel: "Includes VAT 10%",
    taxRate: 10,
    taxLines: [
      {
        label: "Includes VAT 10%",
        rate: 10,
      },
    ],
    showTaxRate: false,
    hideSubtotal: true,
    discount: 0,
    tip: 0,
    grandTotalLabel: "Total price",
    paymentMethod: "Credit Card",
    paymentName: "Mastercard",
    cardLastFour: "5530",
    showCardAuth: false,
    labels: {
      paymentMethod: "Payment",
    },
    afterPayment: [
      {
        title: "Excluded charges",
        rows: [
          {
            label: "City tax",
            value: "€ 5.20 per person per night, payable at the property",
          },
        ],
      },
      {
        title: "Cancellation",
        rows: [
          {
            label: "Free cancellation until",
            value: "{{date-2}}",
          },
        ],
      },
    ],
    footerMessage: "Booking.com doesn't charge any reservation, administration or other fees.",
    policyText: "Your invoice is issued by the property. Contact the property for a VAT invoice.",
    showBarcode: false,
  },
  // the-coffee-bean — was no-source. Sources:
  //   https://en.wikipedia.org/wiki/The_Coffee_Bean_%26_Tea_Leaf
  //   https://www.coffeebean.com/blogs/blog/how-to-make-the-coffee-bean-tea-leaf-r-black-forest-ice-blended-drink-at-home
  "the-coffee-bean": {
    businessName: "The Coffee Bean & Tea Leaf",
    addressLine1: "10820 Sample Blvd",
    addressLine2: "Los Angeles, CA 90024",
    phone: "(310) 555-0129",
    website: "coffeebean.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    paperStyle: "thermal",
    sections: [
      {
        rows: [
          {
            label: "Order",
            value: "#214",
          },
          {
            label: "Name",
            value: "RILEY",
          },
          {
            label: "Cashier",
            value: "Dana",
          },
          {
            label: "Date",
            value: "{{date+0}}",
          },
        ],
      },
    ],
    items: [
      {
        name: "LG Vanilla Ice Blended",
        quantity: 1,
        price: 6.95,
        modifiers: ["Non-Fat Milk"],
      },
      {
        name: "SM Hazelnut Latte",
        quantity: 1,
        price: 5.75,
        modifiers: ["Oat Milk"],
        addons: [
          {
            name: "Extra Shot",
            price: 1.0,
          },
        ],
      },
      {
        name: "Blueberry Muffin",
        quantity: 1,
        price: 3.95,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 9.75,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "Subtotal",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "1187",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX1187",
      },
      {
        label: "Auth",
        value: "640219",
      },
    ],
    footerMessage: "Thank you for visiting The Coffee Bean & Tea Leaf",
    showBarcode: false,
  },
  // prada — was no-source. Sources:
  //   https://www.teamsystem.com/magazine/glossario/documento-commerciale/
  //   https://finom.co/it-it/blog/documento-commerciale/
  //   https://zapptax.com/en/blog/prada-vat-refund-how-to-claim-your-tax-back-in-france
  "prada": {
    businessName: "PRADA",
    logoText: "PRADA",
    addressLine1: "Via Esempio 8, 20121 Milano",
    addressLine2: "P.IVA 10000000000",
    phone: "+39 02 0000 0000",
    website: "prada.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    greeting: "DOCUMENTO COMMERCIALE\ndi vendita o prestazione",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    itemHeader: {
      left: "DESCRIZIONE",
      right: "Prezzo(€)",
    },
    paperStyle: "thermal",
    dateOrder: "dmy",
    items: [
      {
        name: "Borsa a spalla Re-Nylon",
        quantity: 1,
        price: 1550.0,
        taxFlag: "22%",
      },
      {
        name: "Porta carte Saffiano",
        quantity: 1,
        price: 330.0,
        taxFlag: "22%",
      },
    ],
    currency: "EUR",
    taxIncluded: true,
    taxLabel: "DI CUI IVA",
    taxRate: 22,
    taxLines: [
      {
        label: "DI CUI IVA",
        rate: 22,
      },
    ],
    showTaxRate: false,
    hideSubtotal: true,
    discount: 0,
    tip: 0,
    grandTotalLabel: "TOTALE COMPLESSIVO",
    paymentMethod: "Credit Card",
    paymentName: "PAGAMENTO ELETTRONICO",
    cardLastFour: "9902",
    showCardAuth: false,
    labels: {
      amountPaid: "IMPORTO PAGATO",
      paymentMethod: "Pagamento",
    },
    afterPayment: [
      {
        rows: [
          {
            value: "{{date+0}}",
          },
          {
            label: "DOCUMENTO N.",
            value: "0142-0087",
          },
          {
            label: "RT",
            value: "99MEX004218",
          },
        ],
      },
    ],
    footerMessage: "Grazie per la visita",
    showBarcode: false,
    qrCode: true,
  },
  // steam — was missing-key-details. Sources:
  //   https://steamcommunity.com/discussions/forum/1/350540974000742743
  //   https://steamcommunity.com/discussions/forum/1/627456486452560467
  //   https://steamcommunity.com/discussions/forum/1/143387886729880546
  //   https://imagetotable.ai/extract/steam-purchase-screenshot
  "steam": {
    businessName: "Steam",
    logoText: "STEAM",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "store.steampowered.com",
    cashier: "",
    register: "",
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    dividers: "minimal",
    hideStoreLine: true,
    showBarcode: false,
    greeting: "Thank you for your purchase!\nThe following items have been added to your Steam library.",
    sections: [
      {
        rows: [
          {
            label: "Account name",
            value: "pixelharbor_77",
          },
          {
            label: "Invoice",
            value: "582913740266183054",
          },
          {
            label: "Date issued",
            value: "{{date+0}}",
          },
        ],
      },
    ],
    items: [
      {
        name: "ELDEN RING NIGHTREIGN",
        quantity: 1,
        price: 39.99,
      },
      {
        name: "Hades II",
        quantity: 1,
        price: 29.99,
      },
      {
        name: "Stardew Valley",
        quantity: 1,
        price: 14.99,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 6.5,
    showTaxRate: false,
    labels: {
      subtotal: "Subtotal",
      paymentMethod: "Payment method",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "6038",
    paymentInline: true,
    showCardAuth: false,
    footerMessage: "Valve Corporation\nBellevue, WA, USA",
    policyText: "This email confirms your Steam purchase. You can view this transaction any time under Account details > Purchase history.",
  },
  // giant-food — was missing-key-details. Sources:
  //   https://www.just-food.com/?p=21088
  //   https://progressivegrocer.com/giant-carlisle-martins-enhance-gas-extra-rewards-limited-time
  //   https://progressivegrocer.com/giant-landover-pharmacy-purchases-now-amass-gas-rewards-points
  //   https://www.grocerydive.com/news/giant-food-savings-stations-value-ahold-delhaize/827671/
  "giant-food": {
    businessName: "GIANT",
    addressLine1: "STORE 0217  4820 GREENBELT RD",
    addressLine2: "COLLEGE PARK MD 20740",
    phone: "(301) 555-0186",
    website: "giantfood.com",
    cashier: "CASHIER 14",
    register: "LANE 06",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    items: [
      {
        name: "GIANT 2% MILK GAL",
        quantity: 1,
        price: 3.99,
        notTaxed: true,
        discount: 0.5,
      },
      {
        name: "BANANAS",
        quantity: 2.31,
        unit: "lb",
        price: 0.69,
        notTaxed: true,
      },
      {
        name: "CHICKEN BREAST BNLS",
        quantity: 1,
        price: 9.84,
        notTaxed: true,
        discount: 2.0,
      },
      {
        name: "CHEERIOS 18OZ",
        quantity: 1,
        price: 5.49,
        notTaxed: true,
        discount: 1.0,
      },
      {
        name: "TIDE PODS 32CT",
        quantity: 1,
        price: 12.99,
      },
      {
        name: "BOUNTY PAPER TWL 6PK",
        quantity: 1,
        price: 11.49,
        discount: 1.5,
      },
    ],
    currency: "USD",
    taxLabel: "MD TAX",
    taxRate: 6,
    showTaxRate: false,
    labels: {
      subtotal: "SUBTOTAL",
      itemDiscount: "BONUS CARD SAVINGS",
      savings: "TOTAL BONUSCARD SAVINGS",
      change: "CHANGE",
    },
    showSavings: true,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    cardLastFour: "2290",
    showCardAuth: false,
    cardRows: [
      {
        label: "DEBIT",
        value: "************2290",
      },
      {
        label: "AUTH #",
        value: "071834",
      },
      {
        label: "REF #",
        value: "530211",
      },
    ],
    afterPayment: [
      {
        title: "GIANT REWARDS",
        rows: [
          {
            label: "BONUS CARD",
            value: "************4471",
          },
          {
            value: "Points are tracked on your card and at the pump.",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING GIANT",
    policyText: "Save receipt for returns.",
  },
  // wingstop — was no-source. Sources:
  //   https://www.itsyummi.com/wingstop-menu-with-prices/
  //   https://glama.ai/mcp/servers/heq1miyop4
  "wingstop": {
    businessName: "WINGSTOP",
    addressLine1: "STORE #1482  3215 BELT LINE RD",
    addressLine2: "ADDISON, TX 75001",
    phone: "(972) 555-0147",
    website: "wingstop.com",
    cashier: "Server: KAYLA",
    register: "REG 2",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    items: [
      {
        name: "10 pc Classic Wing Combo",
        quantity: 1,
        price: 16.99,
        modifiers: ["Lemon Pepper", "Ranch", "Reg Fries", "Med Drink"],
      },
      {
        name: "8 pc Boneless",
        quantity: 1,
        price: 10.49,
        modifiers: ["Garlic Parmesan", "Bleu Cheese"],
      },
      {
        name: "Cajun Fried Corn",
        quantity: 1,
        price: 3.79,
      },
      {
        name: "Extra Ranch",
        quantity: 2,
        price: 0.99,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.25,
    showTaxRate: false,
    labels: {
      subtotal: "Subtotal",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "7712",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX7712",
      },
      {
        label: "Auth",
        value: "284106",
      },
    ],
    orderNumber: "ORDER 117",
    showBarcode: false,
    footerMessage: "THANK YOU FOR CHOOSING WINGSTOP!\nTell us about your visit at wingstop.com",
  },
  // rewe — was wrong-format. Sources:
  //   https://raw.githubusercontent.com/ReceiptManager/receipt-parser-legacy/master/tests/data/receipts/sample_text_receipt.txt
  //   https://github.com/ReceiptManager/receipt-parser-legacy
  //   https://reversesalestaxcalc.org/de/blog/how-to-read-your-receipt-tax-breakdown
  //   https://www.rewe.de/payback/teilnahmebedingungen-ebon/
  "rewe": {
    businessName: "REWE",
    addressLine1: "**** Venloer Str. 412 ****\n**** 50825 Köln ****",
    addressLine2: "UID Nr.: DE812706034",
    phone: "0221-5550194",
    website: "",
    cashier: "",
    register: "",
    hideStoreLine: true,
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    itemHeader: {
      left: "",
      right: "EUR",
    },
    dateOrder: "dmy",
    items: [
      {
        name: "BIO BANANE",
        quantity: 1,
        price: 1.99,
        taxFlag: "B",
      },
      {
        name: "JA! H-MILCH 1,5%",
        quantity: 2,
        price: 1.05,
        taxFlag: "B",
      },
      {
        name: "BUTTERBREZEL",
        quantity: 1,
        price: 0.89,
        taxFlag: "B",
      },
      {
        name: "GOUDA JUNG SCHEIB.",
        quantity: 1,
        price: 2.29,
        taxFlag: "B",
      },
      {
        name: "PFAND 0,25 EURO",
        quantity: 2,
        price: 0.25,
        taxFlag: "A",
      },
      {
        name: "COCA-COLA 1,0L",
        quantity: 2,
        price: 1.69,
        taxFlag: "A",
      },
      {
        name: "SPUELMITTEL",
        quantity: 1,
        price: 1.45,
        taxFlag: "A",
      },
    ],
    currency: "EUR",
    taxIncluded: true,
    taxLabel: "MwSt",
    taxRate: 19,
    taxLines: [
      {
        label: "A= 19,0%",
        rate: 19,
      },
      {
        label: "B= 7,0%",
        rate: 7,
        appliesTo: "B",
      },
    ],
    showTaxRate: false,
    hideSubtotal: true,
    grandTotalLabel: "SUMME EUR",
    paymentMethod: "Cash",
    amountTendered: 20,
    labels: {
      amountTendered: "Geg. BAR EUR",
      change: "Rückgeld BAR EUR",
    },
    showCardAuth: false,
    afterPayment: [
      {
        rows: [
          {
            label: "Bon-Nr.:",
            value: "2871",
          },
          {
            value: "Markt:4512 Kasse:3 Bed.:304417",
          },
        ],
      },
      {
        rows: [
          {
            value: "Noch keine PAYBACK Karte? Schade.",
          },
          {
            value: "Gleich hier am REWE Service Punkt im Markt anmelden oder auf www.rewe.de/payback",
          },
        ],
      },
    ],
    showBarcode: false,
    footerMessage: "REWE Markt GmbH\nFür Sie da:\nMO - SA 7:00 bis 22:00 Uhr",
    policyText: "Sie haben Fragen?\nAntworten gibt es unter www.rewe.de",
  },
  // apple-services — was wrong-format. Sources:
  //   https://support.apple.com/en-asia/108092
  //   https://support.chess.com/en/articles/15073321-how-do-i-find-my-apple-order-id
  //   https://developer.apple.com/documentation/appstoreserverapi/look-up-order-id.md
  //   https://discussions.apple.com/thread/255112933
  "apple-services": {
    businessName: "Apple",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "apple.com",
    cashier: "",
    register: "",
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    dividers: "minimal",
    hideStoreLine: true,
    hideItems: false,
    hideTotals: false,
    showBarcode: false,
    greeting: "Receipt",
    sections: [
      {
        rows: [
          {
            label: "Apple Account",
            value: "jordan.ellis@icloud.com",
          },
          {
            label: "Date",
            value: "{{date+0}}",
          },
          {
            label: "Order ID",
            value: "MT7QK2X9LP",
          },
          {
            label: "Document",
            value: "629384710552",
          },
        ],
      },
    ],
    items: [
      {
        name: "iCloud+ with 200 GB of Storage\nMonthly · Renews monthly",
        quantity: 1,
        price: 2.99,
      },
      {
        name: "Apple Music\nIndividual (Monthly)",
        quantity: 1,
        price: 10.99,
      },
      {
        name: "Procreate Pocket\niPhone app",
        quantity: 1,
        price: 5.99,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 7.25,
    showTaxRate: false,
    labels: {
      subtotal: "Subtotal",
      paymentMethod: "Billed To",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4821",
    paymentInline: true,
    showCardAuth: false,
    afterPayment: [
      {
        title: "Billed To",
        rows: [
          {
            value: "Jordan Ellis",
          },
          {
            value: "2140 Alder Creek Dr\nSacramento, CA 95833",
          },
        ],
      },
    ],
    footerMessage: "Manage subscriptions or report a problem at reportaproblem.apple.com",
    policyText: "Apple Media Services Terms and Conditions apply.",
  },
  // airbnb — was missing-key-details. Sources:
  //   https://htmlscript.auburn.edu/academic/education/ed/documents_uploaded/graduatetravelawards/ecp0026bt2021101510441242970.pdf
  //   https://htmlscript.auburn.edu/academic/education/ed/documents_uploaded/graduatetravelawards/kww0009bt2019121613202619335.pdf
  //   https://experience.apsc.ubc.ca/sites/default/files/2024-08/airbnb_receipt_sample.pdf
  //   https://thepointsguy.com/hotel/understand-airbnb-fees
  "airbnb": {
    businessName: "Airbnb",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "airbnb.com",
    cashier: "",
    register: "",
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    dividers: "minimal",
    hideStoreLine: true,
    showBarcode: false,
    greeting: "Your receipt from Airbnb",
    sections: [
      {
        rows: [
          {
            label: "Receipt ID",
            value: "RCX7M2KQ4T",
          },
        ],
      },
      {
        title: "3 nights in Asheville",
        rows: [
          {
            label: "Check-in",
            value: "{{date+21}}",
          },
          {
            label: "Checkout",
            value: "{{date+24}}",
          },
          {
            value: "Entire home/apt · 2 beds · 3 guests",
          },
          {
            value: "Hosted by Renata",
          },
          {
            label: "Confirmation code",
            value: "HMQ8ZT4KWE",
          },
        ],
      },
    ],
    items: [
      {
        name: "$142.00 x 3 nights",
        quantity: 1,
        price: 426.0,
      },
      {
        name: "Cleaning fee",
        quantity: 1,
        price: 85.0,
      },
      {
        name: "Service fee",
        quantity: 1,
        price: 72.28,
        notTaxed: true,
      },
    ],
    currency: "USD",
    taxLabel: "Occupancy taxes and fees",
    taxRate: 13,
    showTaxRate: false,
    hideSubtotal: true,
    grandTotalLabel: "Total (USD)",
    paymentMethod: "Credit Card",
    cardLastFour: "3904",
    paymentInline: true,
    showCardAuth: false,
    labels: {
      paymentMethod: "Payment",
      amountPaid: "Amount paid (USD)",
    },
    afterPayment: [
      {
        title: "Cancellation policy",
        rows: [
          {
            value: "Free cancellation for 48 hours after booking. Cancel before check-in for a partial refund. Cutoff times are based on the listing's local time.",
          },
        ],
      },
    ],
    footerMessage: "Have a question? Visit the Help Center",
    policyText: "Airbnb Payments, Inc. is a limited payment collection agent of your Host: once you pay Airbnb Payments, your payment obligation to your Host is satisfied. Refunds follow the Host's cancellation policy or Airbnb's Guest Refund Policy.\nAirbnb Payments, Inc., 888 Brannan St, San Francisco, CA 94103",
  },
  // ikea — was wrong-format. Sources:
  //   https://experience.apsc.ubc.ca/sites/default/files/2024-08/ikea_-_invoice_with_payment_information_sample.pdf
  //   https://www.ingka.com/wp-content/uploads/2025/05/Country-specific-invoicing-instructions-United-States.pdf
  //   https://watchingtheswedes.com/tag/products/
  "ikea": {
    businessName: "IKEA",
    greeting: "Sales invoice\nWelcome to IKEA Conshohocken",
    addressLine1: "1800 Matsonford Rd, Conshohocken, PA 19428",
    addressLine2: "Mon-Sat 10a-9p  Sun 10a-8p",
    phone: "1-888-888-4532",
    website: "ikea.com/us",
    cashier: "",
    register: "",
    hideStoreLine: true,
    paperStyle: "thermal",
    fontFamily: "noto-sans",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "table",
    skuFirst: true,
    topBarcode: false,
    sections: [
      {
        rows: [
          {
            value: "9900021104700153088417",
          },
        ],
      },
      {
        title: "Transaction information",
        rows: [
          {
            label: "Date",
            value: "{{date+0}}",
          },
          {
            label: "Store",
            value: "211",
          },
          {
            label: "Workstation",
            value: "47",
          },
          {
            label: "Transaction number",
            value: "1530",
          },
          {
            label: "Operator ID",
            value: "47",
          },
        ],
      },
    ],
    items: [
      {
        sku: "20275814",
        name: "KALLAX shelf unit, white",
        quantity: 1,
        price: 79.99,
      },
      {
        sku: "70102972",
        name: "SAMLA box, clear",
        quantity: 4,
        price: 2.49,
      },
      {
        sku: "40449871",
        name: "FEJKA artificial potted plant",
        quantity: 2,
        price: 4.99,
      },
      {
        sku: "00457734",
        name: "LACK side table, black-brown",
        quantity: 1,
        price: 14.99,
      },
    ],
    currency: "USD",
    taxLabel: "Sales tax",
    taxRate: 6,
    showTaxRate: false,
    labels: {
      subtotal: "Net total",
      itemsSold: "Number of items",
      paymentMethod: "Payment method",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    paymentName: "EFT VISA",
    cardLastFour: "1007",
    showCardAuth: false,
    cardRows: [
      {
        value: "************1007",
      },
    ],
    showBarcode: true,
    footerMessage: "Keep this receipt for returns and exchanges.",
    policyText: "Change of mind? Return new, unopened products within 180 days with proof of purchase.",
  },
  // costa-coffee — was no-source. Sources:
  //   https://www.accountingweb.co.uk/any-answers/vat-on-subsistence
  //   https://www.grimsbytelegraph.co.uk/whats-on/food-drink/costa-coffee-cuts-prices-including-4332063
  //   https://conveniencestore.co.uk/news/costa-extends-loyalty-scheme-to-costa-express-machines/573918.article
  "costa-coffee": {
    businessName: "Costa Coffee",
    addressLine1: "Store 4127  118 Kingsway",
    addressLine2: "London WC2B 6NR",
    phone: "",
    website: "costa.co.uk",
    cashier: "Served by: Priya",
    register: "Till 2",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    dateOrder: "dmy",
    sections: [
      {
        rows: [
          {
            value: "VAT No. GB 487 2210 63",
          },
          {
            value: "EAT IN",
          },
        ],
      },
    ],
    items: [
      {
        name: "Medio Flat White",
        quantity: 1,
        price: 3.95,
        modifiers: ["Oat Milk"],
      },
      {
        name: "Medio Latte",
        quantity: 1,
        price: 3.85,
        addons: [
          {
            name: "Vanilla Syrup",
            price: 0.45,
          },
        ],
      },
      {
        name: "All Butter Croissant",
        quantity: 1,
        price: 2.45,
      },
      {
        name: "Ham & Cheese Toastie",
        quantity: 1,
        price: 4.95,
      },
    ],
    currency: "GBP",
    taxIncluded: true,
    taxLabel: "VAT 20%",
    taxRate: 20,
    showTaxRate: false,
    hideSubtotal: true,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    paymentName: "Contactless",
    cardLastFour: "5308",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA DEBIT",
        value: "************5308",
      },
      {
        label: "AUTH CODE",
        value: "628471",
      },
    ],
    showBarcode: false,
    footerMessage: "Thank you for visiting Costa Coffee\nScan your Costa Club app at the till to collect points",
  },
  // kwik-trip — was no-source. Sources:
  //   https://kwiktrip.com/fleet
  //   https://www.nbc26.com/news/local-news/kwik-trip-drops-pennies-will-round-cash-purchases-down-to-nearest-5-cents
  //   https://www.brex.com/tools/charge-finder/kwik-trip
  "kwik-trip": {
    businessName: "KWIK TRIP",
    addressLine1: "KWIK TRIP #0742  2815 STATE RD",
    addressLine2: "LA CROSSE, WI 54601",
    phone: "(608) 555-0172",
    website: "kwiktrip.com",
    cashier: "CASHIER: TYLER",
    register: "REG 1",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    unitDecimals: 3,
    fuelGrade: "Unleaded",
    items: [
      {
        name: "PUMP 06 UNLEADED",
        quantity: 10.412,
        unit: "gal",
        price: 2.999,
        notTaxed: true,
      },
      {
        name: "GLAZER DONUT",
        quantity: 2,
        price: 1.19,
        notTaxed: true,
      },
      {
        name: "KC PEPPERONI PIZZA SLICE",
        quantity: 1,
        price: 2.99,
      },
      {
        name: "FOUNTAIN 32OZ",
        quantity: 1,
        price: 1.49,
      },
      {
        name: "KWIK TRIP 2% MILK GAL",
        quantity: 1,
        price: 3.39,
        notTaxed: true,
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 5.5,
    showTaxRate: false,
    labels: {
      subtotal: "SUBTOTAL",
      change: "CHANGE",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "3381",
    showCardAuth: false,
    cardRows: [
      {
        label: "MASTERCARD",
        value: "************3381",
      },
      {
        label: "AUTH#",
        value: "052914",
      },
      {
        label: "ENTRY",
        value: "CHIP",
      },
    ],
    afterPayment: [
      {
        title: "KWIK REWARDS",
        rows: [
          {
            label: "MEMBER",
            value: "********6625",
          },
          {
            value: "Check your points and perks in the Kwik Trip app",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING KWIK TRIP",
  },
  // adobe — was wrong-format. Sources:
  //   https://www.camara.leg.br/cota-parlamentar/documentos/publ/3647/2025/8003500.pdf
  //   https://ddvqivddqhemvvwvggcn.supabase.co/storage/v1/object/public/documents/pdfs/1782064392887-invoice_7257896829_invoice.pdf
  //   https://www.camara.leg.br/cota-parlamentar/documentos/publ/2243/2023/7603422.pdf
  "adobe": {
    businessName: "Adobe Inc.",
    addressLine1: "345 Park Avenue",
    addressLine2: "San Jose, CA 95110-2704",
    phone: "",
    website: "helpx.adobe.com/contact.html",
    cashier: "",
    register: "",
    invoice: true,
    numberLabel: "Invoice Number",
    paperFinish: "invoice",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "table",
    skuFirst: true,
    hideStoreLine: true,
    showBarcode: false,
    greeting: "ORIGINAL\nINVOICE",
    sections: [
      {
        title: "Invoice Information",
        rows: [
          {
            label: "Invoice Date",
            value: "{{date+0}}",
          },
          {
            label: "Payment Terms",
            value: "Credit Card",
          },
          {
            label: "Purchase Order",
            value: "AD05218843016CUS",
          },
          {
            label: "Order Number",
            value: "7319204588",
          },
          {
            label: "Customer Number",
            value: "1584420973",
          },
          {
            label: "Currency",
            value: "USD",
          },
        ],
      },
      {
        title: "Bill To",
        rows: [
          {
            value: "Emma Caldwell",
          },
          {
            value: "SilverPeak Solutions\n77 Haywood St, Suite 300\nAsheville, NC 28801\nUNITED STATES",
          },
        ],
      },
      {
        title: "Item Details",
        rows: [
          {
            label: "Service Term start",
            value: "{{date+0}}",
          },
          {
            label: "Service Term end",
            value: "{{date+29}}",
          },
        ],
      },
    ],
    items: [
      {
        sku: "65183110",
        name: "Creative Cloud Pro",
        quantity: 1,
        unit: "EA",
        price: 69.99,
      },
      {
        sku: "65304522",
        name: "Acrobat Pro",
        quantity: 1,
        unit: "EA",
        price: 19.99,
      },
    ],
    currency: "USD",
    taxLabel: "TAXES (SEE DETAILS FOR RATES)",
    taxRate: 7,
    showTaxRate: false,
    labels: {
      subtotal: "NET AMOUNT (USD)",
    },
    grandTotalLabel: "GRAND TOTAL (USD)",
    paymentMethod: "Credit Card",
    cardLastFour: "4402",
    showCardAuth: false,
    paymentInline: true,
    footerMessage: "Thank you for your business!",
    policyText: "Billing Contact: https://helpx.adobe.com/contact.html",
  },
  // grubhub — was wrong-format. Sources:
  //   https://openclassactions.com/blog/grubhub-doordash-uber-eats-delivery-fees-explained.php
  //   https://www.savetheblog.com/blog/grubhub-shopping-guide-2026
  //   https://slickdeals.net/f/19175377-ymmv-select-grubhub-acccounts-10-off-20-code-pickup-delivery
  "grubhub": {
    businessName: "Grubhub",
    logoText: "GRUBHUB",
    addressLine1: "Your order from Luigi's Pizzeria",
    addressLine2: "Delivered to 2140 N Sample Ave, Chicago, IL 60614",
    phone: "",
    website: "grubhub.com",
    cashier: "",
    register: "",
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "qtycol",
    hideStoreLine: true,
    showBarcode: false,
    greeting: "Thanks for your order!",
    sections: [
      {
        title: "Order details",
        rows: [
          {
            label: "Order #",
            value: "318604572",
          },
          {
            label: "Order type",
            value: "Delivery",
          },
          {
            label: "Restaurant",
            value: "Luigi's Pizzeria",
          },
        ],
      },
    ],
    items: [
      {
        name: "Large Margherita Pizza",
        quantity: 1,
        price: 18.99,
        modifiers: ["Thin crust"],
      },
      {
        name: "Caesar Salad",
        quantity: 1,
        price: 9.49,
      },
      {
        name: "Garlic Knots (6)",
        quantity: 1,
        price: 5.99,
      },
    ],
    currency: "USD",
    taxLabel: "Sales tax",
    taxRate: 10.25,
    showTaxRate: false,
    discount: 0,
    tip: 5.0,
    serviceFee: 4.3,
    deliveryFee: 2.99,
    labels: {
      subtotal: "Items subtotal",
      serviceFee: "Service fee",
      deliveryFee: "Delivery fee",
      tip: "Driver tip",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "6021",
    paymentInline: true,
    showCardAuth: false,
    footerMessage: "Questions about your order? Visit grubhub.com/help.",
    policyText: "Sample receipt.",
  },
  // harbor-freight — was no-source. Sources:
  //   https://www.slashgear.com/1518941/harbor-freight-return-policy-explained
  //   https://dailydot.com/news/harbor-freight-lifetime-warranty/
  //   https://slickdeals.net/f/1276399-harbor-freight-coupon-thread?p=40606497
  "harbor-freight": {
    businessName: "Harbor Freight Tools",
    logoText: "HARBOR FREIGHT",
    addressLine1: "Store #0000 - 4120 Sample Blvd",
    addressLine2: "Calabasas, CA 91302",
    phone: "(818) 555-0142",
    website: "harborfreight.com",
    cashier: "Cashier: 214",
    register: "Reg 03",
    paperStyle: "thermal",
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    skuFirst: true,
    showSavings: true,
    items: [
      {
        name: "PITTSBURGH 3/8IN DR RATCHET SET 40PC",
        quantity: 1,
        price: 24.99,
        sku: "63878",
        discount: 5.0,
      },
      {
        name: "HERCULES 20V DRILL/DRIVER KIT",
        quantity: 1,
        price: 79.99,
        sku: "56383",
      },
      {
        name: "WESTERN SAFETY NITRILE GLOVES 100PC L",
        quantity: 2,
        price: 9.99,
        sku: "68498",
      },
    ],
    currency: "USD",
    taxLabel: "SALES TAX",
    taxRate: 9.5,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "SUBTOTAL",
      itemDiscount: "COUPON SAVINGS",
      savings: "YOU SAVED",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "3307",
    showCardAuth: true,
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING AT HARBOR FREIGHT",
    policyText: "Returns within 90 days with receipt. Hand tools carry a lifetime warranty. Keep this receipt for warranty claims.",
  },
  // carrefour — was wrong-format. Sources:
  //   https://huggingface.co/datasets/Bhawna/MultiOCR-QA/viewer/default/train?p=4
  //   https://huggingface.co/datasets/Bhawna/MultiOCR-QA/viewer/default/train?p=5
  //   https://www.legifiscal.fr/reperes-fiscaux/taux-reduit-tva-5.5.html?pdf=1
  "carrefour": {
    businessName: "Carrefour market",
    logoText: "Carrefour market",
    addressLine1: "CARREFOUR MARKET EXEMPLEVILLE - 12 AVENUE DES TILLEULS",
    addressLine2: "17000 LA ROCHELLE - Tel : 05 46 00 00 00\nLundi au Samedi de 9h à 20h00 Dimanche 9h à 12h30",
    phone: "",
    website: "",
    cashier: "CAISSE 004",
    register: "",
    dateOrder: "dmy",
    paperStyle: "thermal",
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    itemHeader: {
      left: "DESCRIPTION",
      right: "MONTANT",
    },
    hideSubtotal: true,
    hideStoreLine: true,
    items: [
      {
        name: "PAIN CEREALES BIO",
        quantity: 1,
        price: 2.25,
      },
      {
        name: "*BP 1L LAIT 1/2ECRE",
        quantity: 2,
        price: 0.78,
      },
      {
        name: "*CRF EMMENTAL RAPE 200G",
        quantity: 1,
        price: 1.95,
      },
      {
        name: "POMMES GOLDEN 1KG",
        quantity: 1,
        price: 2.49,
      },
    ],
    currency: "EUR",
    taxIncluded: true,
    taxLabel: "TVA 5,5%",
    taxRate: 5.5,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      itemsSold: "ARTICLE(S)",
      change: "Votre Monnaie",
    },
    grandTotalLabel: "TOTAL A PAYER",
    paymentMethod: "Debit Card",
    paymentName: "CARTE BANCAIRE EMV",
    cardLastFour: "4410",
    showCardAuth: false,
    showBarcode: true,
    footerMessage: "Avec la carte fidélité Carrefour, cumulez à chaque passage sur votre compte fidélité.",
    policyText: "MERCI DE VOTRE VISITE - A BIENTOT",
  },
  // racetrac — was no-source. Sources:
  //   https://racetrac.com/Rewards
  //   https://www.destinationcrm.com/Articles/CRM-Insights/CRM-Case-Studies/On-the-Right-Track-87377.aspx
  "racetrac": {
    businessName: "RaceTrac",
    logoText: "RaceTrac",
    addressLine1: "RaceTrac #0000 - 2250 Sample Pkwy",
    addressLine2: "Atlanta, GA 30339",
    phone: "(770) 555-0119",
    website: "racetrac.com",
    cashier: "",
    register: "Pump #07",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "stacked",
    fuelGrade: "Unleaded",
    unitDecimals: 3,
    hideSubtotal: true,
    items: [
      {
        name: "UNLEADED",
        quantity: 11.204,
        price: 2.899,
        unit: "gal",
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 0,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "5582",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX5582",
      },
      {
        label: "AUTH #",
        value: "072914",
      },
      {
        label: "ENTRY",
        value: "CHIP",
      },
    ],
    afterPayment: [
      {
        title: "RACETRAC REWARDS",
        rows: [
          {
            label: "MEMBER",
            value: "XXX-XXX-0148",
          },
          {
            label: "POINTS BALANCE",
            value: "1,236",
          },
        ],
      },
    ],
    showBarcode: false,
    footerMessage: "THANK YOU",
    policyText: "",
  },
  // quiktrip — was no-source. Sources:
  //   https://www.complaintsboard.com/quiktrip-lack-of-receipts-at-pump-c1451825
  //   https://doctorofcredit.com/quiktrip-store-card-review
  //   https://www.azfamily.com/2024/08/28/quiktrip-offering-arizona-customers-25-cents-off-per-gallon-through-new-app-feature
  "quiktrip": {
    businessName: "QuikTrip",
    logoText: "QuikTrip",
    addressLine1: "QuikTrip #0000 - 4705 S Sample Ave",
    addressLine2: "Tulsa, OK 74135",
    phone: "(918) 555-0163",
    website: "quiktrip.com",
    cashier: "Cashier: 05",
    register: "Reg 02",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    items: [
      {
        name: "QT KITCHENS PIZZA SLICE PEPP",
        quantity: 1,
        price: 2.99,
      },
      {
        name: "FOUNTAIN DRINK 32OZ",
        quantity: 1,
        price: 1.19,
      },
      {
        name: "MONSTER ENERGY 16OZ",
        quantity: 1,
        price: 3.29,
      },
      {
        name: "LAYS CLASSIC 2.625OZ",
        quantity: 1,
        price: 2.49,
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 8.517,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "SUBTOTAL",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    cardLastFour: "9064",
    showCardAuth: true,
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING QT",
    policyText: "",
  },
  // advance-auto-parts — was no-source. Sources:
  "advance-auto-parts": {
    businessName: "Advance Auto Parts",
    logoText: "ADVANCE AUTO PARTS",
    addressLine1: "Store #0000 - 3301 Sample Rd",
    addressLine2: "Raleigh, NC 27604",
    phone: "(919) 555-0127",
    website: "advanceautoparts.com",
    cashier: "Team Member: 0447",
    register: "Reg 02",
    paperStyle: "thermal",
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    skuFirst: true,
    items: [
      {
        name: "DIEHARD GOLD BATTERY 24F",
        quantity: 1,
        price: 219.99,
        sku: "24F-AGM",
        modifiers: ["Warranty: 3 Year Free Replacement"],
      },
      {
        name: "BATTERY CORE CHARGE",
        quantity: 1,
        price: 22.0,
      },
      {
        name: "CASTROL GTX 5W-30 5QT",
        quantity: 1,
        price: 29.99,
        sku: "GTX5W30-5Q",
      },
      {
        name: "WIX OIL FILTER 51515",
        quantity: 1,
        price: 9.49,
        sku: "51515",
      },
    ],
    currency: "USD",
    taxLabel: "SALES TAX",
    taxRate: 7.25,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "SUBTOTAL",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "2846",
    showCardAuth: true,
    afterPayment: [
      {
        title: "SPEED PERKS",
        rows: [
          {
            label: "MEMBER",
            value: "XXX-XXX-0391",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING ADVANCE AUTO PARTS",
    policyText: "Core charge refunded when the old battery is returned with this receipt. Keep this receipt for warranty claims.",
  },
  // office-depot — was no-source. Sources:
  //   https://baymard.com/checkout-usability/benchmark/step-type/receipt/8429-office-depot-step-7
  //   https://forums.anandtech.com/threads/update-still-works-as-of-4-30-take-a-officemax-survey-and-get-a-10-in-store-coupon-you-need-a-om-store-receipt.994186/
  "office-depot": {
    businessName: "Office Depot",
    logoText: "Office DEPOT",
    addressLine1: "Store #0000 - 6600 Sample Rd",
    addressLine2: "Boca Raton, FL 33433",
    phone: "(561) 555-0158",
    website: "officedepot.com",
    cashier: "Associate: 0193",
    register: "Reg 03",
    paperStyle: "thermal",
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    skuFirst: true,
    items: [
      {
        name: "HP 67XL BLACK INK CARTRIDGE",
        quantity: 1,
        price: 36.99,
        sku: "5743209",
      },
      {
        name: "OD COPY PAPER 8.5X11 500SH",
        quantity: 2,
        price: 10.99,
        sku: "196517",
      },
      {
        name: "PILOT G2 GEL PENS BLK 12PK",
        quantity: 1,
        price: 17.99,
        sku: "238493",
      },
    ],
    currency: "USD",
    taxLabel: "SALES TAX",
    taxRate: 7.0,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "SUBTOTAL",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "7730",
    showCardAuth: true,
    afterPayment: [
      {
        title: "OFFICE DEPOT OFFICEMAX REWARDS",
        rows: [
          {
            label: "MEMBER #",
            value: "XXXXXX4419",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING OFFICE DEPOT",
    policyText: "Keep this receipt for returns and exchanges.",
  },
  // arby-s — was no-source. Sources:
  "arby-s": {
    businessName: "Arby's",
    logoText: "Arby's",
    addressLine1: "Arby's #0000 - 2815 Sample Hwy",
    addressLine2: "Marietta, GA 30060",
    phone: "(770) 555-0136",
    website: "arbys.com",
    cashier: "Cashier: Dana",
    register: "Reg 1",
    paperStyle: "thermal",
    fontFamily: "mono",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    sections: [
      {
        rows: [
          {
            value: "DRIVE THRU",
          },
        ],
      },
    ],
    items: [
      {
        name: "Classic Roast Beef Meal Md",
        quantity: 1,
        price: 9.99,
        modifiers: ["Curly Fries Md", "Coke Md"],
      },
      {
        name: "Beef 'n Cheddar Classic",
        quantity: 1,
        price: 6.29,
        modifiers: ["No Red Ranch"],
      },
      {
        name: "Jamocha Shake Sm",
        quantity: 1,
        price: 3.99,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.9,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "5127",
    showCardAuth: false,
    orderNumber: "ORDER 47",
    showBarcode: false,
    footerMessage: "Thank you for choosing Arby's!",
    policyText: "",
  },
  // hampton-inn — was wrong-format. Sources:
  //   https://psc.ky.gov/pscecf/2020-00290/kyunker@mcbrayerfirm.com/05292021095845/Favor.pdf
  //   https://travel.umbc.edu/wp-content/uploads/sites/801/2025/08/Sample-hotel-folio.pdf
  "hampton-inn": {
    businessName: "Hampton Inn Memphis-Sample (sample)",
    addressLine1: "2100 Sample Ave",
    addressLine2: "Memphis, TN 38104 United States of America",
    phone: "901-555-0144",
    website: "hamptoninn.com",
    cashier: "Cashier ID: FDESK2",
    register: "",
    paperFinish: "invoice",
    paperStyle: "modern",
    fontFamily: "roboto",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    itemHeader: {
      left: "DESCRIPTION",
      right: "CHARGES",
    },
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Room No",
            value: "312/K1",
          },
          {
            label: "Arrival Date",
            value: "{{date-2}} 4:18 PM",
          },
          {
            label: "Departure Date",
            value: "{{date+0}} 10:52 AM",
          },
          {
            label: "Adult/Child",
            value: "1/0",
          },
          {
            label: "Room Rate",
            value: "139.00",
          },
          {
            label: "HH #",
            value: "000000000",
          },
          {
            label: "Folio No",
            value: "2851377 A",
          },
          {
            label: "Confirmation Number",
            value: "8410023377",
          },
        ],
      },
    ],
    items: [
      {
        name: "GUEST ROOM",
        quantity: 2,
        price: 139.0,
      },
    ],
    currency: "USD",
    taxLabel: "STATE/LOCAL SALES TAX",
    taxRate: 13.25,
    taxLines: [
      {
        label: "STATE/LOCAL SALES TAX",
        rate: 9.75,
      },
      {
        label: "CITY OCCUPANCY TAX",
        rate: 3.5,
      },
    ],
    showTaxRate: false,
    hideSubtotal: true,
    discount: 0,
    tip: 0,
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "8831",
    paymentName: "VS *8831",
    showCardAuth: false,
    afterPayment: [
      {
        rows: [
          {
            label: "**BALANCE**",
            value: "$0.00",
          },
        ],
      },
      {
        title: "CREDIT CARD DETAIL",
        rows: [
          {
            label: "APPR CODE",
            value: "052194A",
          },
          {
            label: "TRANS TYPE",
            value: "Sale",
          },
        ],
      },
    ],
    showBarcode: false,
    footerMessage: "Hilton Honors(R) stays are posted within 72 hours of checkout.",
    policyText: "Thank you for choosing Hampton by Hilton.",
  },
  // bass-pro-shops — was no-source. Sources:
  //   https://baymard.com/checkout-usability/benchmark/step-type/receipt/1785-bass-pro-shops
  "bass-pro-shops": {
    businessName: "Bass Pro Shops",
    logoText: "BASS PRO SHOPS",
    addressLine1: "Store #0000 - 1935 S Sample Ave",
    addressLine2: "Springfield, MO 65807",
    phone: "(417) 555-0182",
    website: "basspro.com",
    cashier: "Associate: 3381",
    register: "Reg 04",
    paperStyle: "thermal",
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    items: [
      {
        name: "BPS JOHNNY MORRIS CARBONLITE 2.0 SPIN ROD",
        quantity: 1,
        price: 99.99,
      },
      {
        name: "BERKLEY POWERBAIT MAXSCENT 10CT",
        quantity: 2,
        price: 7.99,
      },
      {
        name: "REDHEAD SILENT-HIDE CAMO CAP",
        quantity: 1,
        price: 19.99,
      },
    ],
    currency: "USD",
    taxLabel: "SALES TAX",
    taxRate: 8.1,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "SUBTOTAL",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "6614",
    showCardAuth: true,
    afterPayment: [
      {
        title: "OUTDOOR REWARDS",
        rows: [
          {
            label: "MEMBER",
            value: "XXXXXXX2057",
          },
        ],
      },
    ],
    showBarcode: true,
    footerMessage: "THANK YOU FOR SHOPPING BASS PRO SHOPS",
    policyText: "Keep this receipt for returns and exchanges.",
  },
  // jcpenney — was wrong-format. Sources:
  //   https://s3-media1.fl.yelpcdn.com/bphoto/HOmX-Ng9X7X6T-NZDom0gQ/o.jpg
  //   https://jillcataldo.com/wp-content/uploads/2015/02/jcpreceipt.jpg
  //   https://townsquare.media/site/99/files/2019/10/JCPenney-receipt.jpg
  //   https://todaysfabulousfinds.blogspot.com/2011/08/free-ten-dollars-at-jcpenney.html
  "jcpenney": {
    businessName: "JCPenney",
    logoText: "JCPenney",
    addressLine1: "JCPenney #2741",
    addressLine2: "4800 Preston Park Blvd\nPlano, TX 75093",
    phone: "972-555-0143",
    website: "",
    cashier: "",
    register: "",
    hideStoreLine: true,
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "lined",
    items: [
      {
        name: "STAFFORD OXFORD SHIRT",
        quantity: 1,
        price: 40.0,
        discount: 20.01,
        sku: "613/2140/050812",
        taxFlag: "T1",
      },
      {
        name: "ANA HIGH RISE JEAN",
        quantity: 1,
        price: 44.0,
        discount: 22.01,
        sku: "842/6281/030611",
        taxFlag: "T1",
      },
      {
        name: "SJB CREWNECK TEE",
        quantity: 1,
        price: 14.0,
        discount: 6.01,
        sku: "845/5171/040709",
        taxFlag: "T1",
      },
    ],
    currency: "USD",
    taxLabel: "Sales Tax 8.2500% 75093",
    taxRate: 8.25,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    labels: {
      subtotal: "Subtotal",
      itemDiscount: "Sale Disc",
      itemDiscounts: "Total Item Discounts:",
      savings: "Your Total Discounts Today:",
      change: "Change",
    },
    showSavings: true,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "3318",
    showCardAuth: false,
    afterPayment: [
      {
        rows: [
          {
            value: "Total Items Returned: 0",
          },
        ],
      },
    ],
    footerMessage: "Tell us about your visit at jcp.com/survey",
    policyText: "",
    showBarcode: true,
    paperStyle: "thermal",
    subtotalNet: true,
  },
  // fred-meyer — was wrong-format. Sources:
  //   https://i.redd.it/2fbijt2d26gb1.jpg
  //   https://www.savingadvice.com/wp-content/uploads/2022/06/Fred-Meyer-receipt.jpg
  //   https://www.fredmeyer.com/d/fuel-points-program_fm_12-13
  "fred-meyer": {
    businessName: "Fred Meyer",
    logoText: "Fred Meyer",
    greeting: "Now Hiring!\nApply at jobs.fredmeyer.com",
    addressLine1: "8320 SE Foster Rd",
    addressLine2: "",
    phone: "503-555-0187",
    website: "",
    cashier: "",
    register: "",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "YOUR CASHIER WAS CHEC 512",
          },
          {
            label: "REWARDS CARD",
            value: "*******8812",
          },
        ],
      },
    ],
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "lined",
    skuFirst: true,
    items: [
      {
        name: "ST DSTLD WTR",
        quantity: 1,
        price: 6.99,
        sku: "1111090275",
        taxFlag: "F",
      },
      {
        name: "BTL DEPOSIT",
        quantity: 1,
        price: 2.4,
        sku: "9178",
        taxFlag: "F",
      },
      {
        name: "KRO 2% MILK GAL",
        quantity: 1,
        price: 3.79,
        sku: "1111041700",
        taxFlag: "F",
      },
      {
        name: "BANANAS",
        quantity: 2.31,
        price: 0.69,
        unit: "lb",
        sku: "4011",
        taxFlag: "F",
      },
      {
        name: "PC GLTT CLR GEL",
        quantity: 1,
        price: 4.99,
        discount: 1.5,
        sku: "4740009787",
      },
    ],
    currency: "USD",
    taxLabel: "TAX",
    taxRate: 0,
    taxLines: [
      {
        label: "TAX",
        rate: 0,
      },
    ],
    showTaxRate: false,
    hideSubtotal: true,
    discount: 0,
    tip: 0,
    grandTotalLabel: "**** BALANCE",
    labels: {
      itemDiscount: "SC FM SAVINGS",
      itemDiscounts: "FM SAVINGS",
      savings: "Fred Meyer Savings",
      change: "CHANGE",
      itemsSold: "TOTAL NUMBER OF ITEMS SOLD =",
    },
    showSavings: true,
    paymentMethod: "Credit Card",
    paymentName: "MASTERCARD",
    cardLastFour: "7740",
    showCardAuth: false,
    cardRows: [
      {
        value: "Portland OR 97206",
      },
      {
        value: "MASTERCARD Purchase",
      },
      {
        value: "************7740 - H",
      },
      {
        label: "REF#:",
        value: "418302",
      },
      {
        label: "AID:",
        value: "A0000000041010",
      },
      {
        label: "TC:",
        value: "7C21A9E04B6F33D1",
      },
      {
        value: "VERIFIED BY PIN",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            value: "************************************",
          },
          {
            label: "Annual Card Savings",
            value: "$214.60",
          },
          {
            label: "Fuel Points Earned Today:",
            value: "18",
          },
          {
            label: "Total Oct Fuel Points:",
            value: "146",
          },
          {
            value: "************************************",
          },
        ],
      },
    ],
    footerMessage: "FRESH FOR EVERYONE.",
    policyText: "SAVE THIS RECEIPT FOR REFUNDS OR ADJUSTMENTS",
    showBarcode: true,
    paperStyle: "thermal",
  },
  // sobeys — was wrong-format. Sources:
  //   https://einnovativecdn.blob.core.windows.net/gmscene/images/SobeysReceiptExample.jpg
  //   https://www.canadianfreestuff.com/my-sobeys-contest-customer-survey/
  //   http://2.bp.blogspot.com/-BXBJ486eGjs/UlNkYBJChmI/AAAAAAAALzs/aH3grBB3i8o/s1600/sobeys+receipt.jpg
  "sobeys": {
    businessName: "Sobeys",
    logoText: "Sobeys",
    addressLine1: "Kanata Sobeys #4821",
    addressLine2: "1180 Hazeldean Road, Kanata, K2M 1N4",
    phone: "613-555-0172",
    website: "www.sobeys.ca",
    cashier: "",
    register: "",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "HST#81234 5678 RT0001",
          },
          {
            value: "Served by: Priya K",
          },
        ],
      },
    ],
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "dashed",
    itemStyle: "lined",
    items: [
      {
        name: "GROCERY",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "Maple Cookies",
        quantity: 1,
        price: 3.99,
        discount: 0.5,
        taxFlag: "C",
        notTaxed: true,
      },
      {
        name: "Kettle Chips Sea Salt",
        quantity: 1,
        price: 4.49,
        taxFlag: "HC",
      },
      {
        name: "PRODUCE",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "Baby Spinach",
        quantity: 1,
        price: 5.99,
        discount: 1.0,
        taxFlag: "C",
        notTaxed: true,
      },
      {
        name: "Bananas",
        quantity: 1.195,
        price: 1.74,
        unit: "kg",
        taxFlag: "C",
        notTaxed: true,
      },
      {
        name: "BAKERY",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "Pie Blueberry",
        quantity: 1,
        price: 7.69,
        discount: 0.3,
        taxFlag: "C",
        notTaxed: true,
      },
      {
        name: "HEALTH & BEAUTY",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "Colgate 85ML",
        quantity: 1,
        price: 4.79,
        taxFlag: "HC",
      },
    ],
    currency: "CAD",
    taxLabel: "HST",
    taxRate: 13,
    taxLines: [
      {
        label: "HST",
        rate: 13,
        appliesTo: "HC",
      },
    ],
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "TOTAL",
    labels: {
      subtotal: "SUBTOTAL",
      itemDiscount: "YOU SAVED",
      itemDiscounts: "YOUR SAVINGS",
      savings: "YOUR SAVINGS",
      change: "CHANGE",
      itemsSold: "NUMBER OF ITEMS",
    },
    showSavings: true,
    paymentMethod: "Debit Card",
    paymentName: "Debit",
    cardLastFour: "0417",
    showCardAuth: false,
    cardRows: [
      {
        label: "MERCHANT",
        value: "58214470",
      },
      {
        label: "TERM",
        value: "SB5821447002",
      },
      {
        label: "ACCOUNT",
        value: "************0417",
      },
      {
        label: "RESP",
        value: "001",
      },
      {
        label: "AUTH #",
        value: "284716",
      },
      {
        label: "REF#",
        value: "003318725",
      },
      {
        label: "APPL.",
        value: "Interac",
      },
      {
        label: "AID",
        value: "A0000002771010",
      },
      {
        value: "00   APPROVED - THANK YOU",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            value: "I AGREE TO PAY THE ABOVE TOTAL AMOUNT ACCORDING TO THE CARD ISSUER AGREEMENT (MERCHANT AGREEMENT IF CREDIT VOUCHER)",
          },
          {
            value: "Retain this copy for your record",
          },
        ],
      },
      {
        rows: [
          {
            label: "Term  Tran  Store  Oper",
            value: "7  6487  4821  129",
          },
          {
            value: "{{date+0}}",
          },
        ],
      },
    ],
    footerMessage: "Thank you for shopping at our store\nPlease come again soon",
    policyText: "",
    showBarcode: false,
    paperStyle: "thermal",
  },
  // frontier-airlines — was wrong-format. Sources:
  //   https://wheniwander.com/best-flight-deals/
  //   https://flytrippers.com/frontier-unlimited-flight-pass/
  //   https://www.flyfrontier.com/manage-travel/confirmation-code
  "frontier-airlines": {
    businessName: "Frontier Airlines",
    logoText: "FRONTIER",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    website: "flyfrontier.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    paperFinish: "email",
    paperStyle: "modern",
    fontFamily: "montserrat",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "lined",
    greeting: "DENVER, CO (DEN)  -  LAS VEGAS, NV (LAS)",
    sections: [
      {
        rows: [
          {
            label: "Trip Confirmation Number",
            value: "K4XQ7B",
          },
        ],
      },
      {
        title: "Depart",
        rows: [
          {
            label: "Date",
            value: "{{date+21}}",
          },
          {
            label: "Flight",
            value: "F9 1271",
          },
          {
            label: "Departure 08:05 AM",
            value: "DENVER, CO (DEN)",
          },
          {
            label: "Arrival 09:12 AM",
            value: "LAS VEGAS, NV (LAS)",
          },
        ],
      },
      {
        title: "Return",
        rows: [
          {
            label: "Date",
            value: "{{date+25}}",
          },
          {
            label: "Flight",
            value: "F9 1272",
          },
          {
            label: "Departure 06:40 PM",
            value: "LAS VEGAS, NV (LAS)",
          },
          {
            label: "Arrival 09:38 PM",
            value: "DENVER, CO (DEN)",
          },
        ],
      },
      {
        title: "Passenger",
        rows: [
          {
            label: "Passenger Name",
            value: "ALEX SAMPLE",
          },
          {
            label: "Seats",
            value: "14C / 17D",
          },
          {
            label: "Bags",
            value: "1 Carry-On",
          },
          {
            label: "Known Traveler Number:",
            value: "",
          },
        ],
      },
    ],
    items: [
      {
        name: "Airfare",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "Flights",
        quantity: 1,
        price: 78.14,
      },
      {
        name: "U.S. Transportation Tax",
        quantity: 1,
        price: 9.46,
      },
      {
        name: "Carrier Interface Charge",
        quantity: 1,
        price: 47.98,
      },
      {
        name: "U.S. Passenger Security Fee",
        quantity: 1,
        price: 11.2,
      },
      {
        name: "U.S. Domestic Flight Segment Tax",
        quantity: 1,
        price: 10.6,
      },
      {
        name: "Denver, Co (DEN) Passenger Facility Charge",
        quantity: 1,
        price: 4.5,
      },
      {
        name: "Las Vegas, Nv (LAS) Passenger Facility Charge",
        quantity: 1,
        price: 4.5,
      },
      {
        name: "Bags",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "Carry-On Bag",
        quantity: 2,
        price: 54.0,
      },
    ],
    currency: "USD",
    taxLabel: "Taxes",
    taxRate: 0,
    showTaxRate: false,
    hideSubtotal: true,
    discount: 0,
    tip: 0,
    labels: {
      discount: "Discounts",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Credit Card",
    cardLastFour: "6021",
    paymentInline: true,
    showCardAuth: false,
    footerMessage: "",
    policyText: "",
    showBarcode: false,
  },
  // blue-bottle-coffee — was missing-key-details. Sources:
  //   https://www.pinterest.com/pin/receipt-from-blue-bottle-coffee-abbot-kinney--400187116903796042/
  //   https://squareup.com/us/en/press/blue-bottle-coffee-adopts-square-for-its-point-of-sale
  //   https://dailycoffeenews.com/2013/02/12/blue-bottle-bringing-square-pos-system-to-all-11-locations
  "blue-bottle-coffee": {
    businessName: "Blue Bottle Coffee",
    logoText: "Blue Bottle Coffee",
    greeting: "Blue Bottle Coffee - Franklin St",
    addressLine1: "1950 Franklin St",
    addressLine2: "Oakland, CA 94612",
    phone: "",
    website: "bluebottlecoffee.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "center",
    ruleStyle: "solid",
    itemStyle: "lined",
    dividers: "minimal",
    items: [
      {
        name: "Latte",
        quantity: 1,
        price: 6.25,
        addons: [
          {
            name: "Oat Milk",
            price: 0.75,
          },
        ],
      },
      {
        name: "Single Origin Pour Over",
        quantity: 1,
        price: 6.75,
      },
      {
        name: "Liège Waffle",
        quantity: 1,
        price: 4.75,
      },
    ],
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 10.75,
    showTaxRate: false,
    discount: 0,
    tip: 2.0,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    paymentInline: true,
    showCardAuth: false,
    footerMessage: "Thank you for visiting Blue Bottle Coffee",
    policyText: "Powered by Square",
    showBarcode: false,
  },
  // bojangles — was missing-key-details. Sources:
  //   https://media-cdn.tripadvisor.com/media/photo-s/10/7d/3c/7e/receipt.jpg
  //   https://www.bolistens.com/Index.aspx?POSType=2
  //   https://www.mybovisit.com/
  "bojangles": {
    businessName: "Bojangles",
    logoText: "Bojangles",
    greeting: "Drive Thru",
    addressLine1: "Store 4127",
    addressLine2: "8930 South Blvd\nCharlotte, NC 28273",
    phone: "704-555-0161",
    website: "",
    cashier: "",
    register: "",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "Thank you for dining with us today!",
          },
          {
            label: "Cashier:",
            value: "Tasha",
          },
          {
            label: "Check:",
            value: "407512",
          },
        ],
      },
    ],
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "double",
    itemStyle: "qtycol",
    items: [
      {
        name: "Bo-2Pc Combo-2",
        quantity: 1,
        price: 9.49,
        modifiers: ["( 1) IND Mac & Cheese", "( 1) Wing", "( 1) IND Green Beans", "( 1) Lg Tea"],
        addons: [
          {
            name: "( 1) Breast",
            price: 1.3,
          },
        ],
      },
      {
        name: "Cajun Filet Biscuit",
        quantity: 1,
        price: 4.99,
      },
      {
        name: "Bo-Berry Biscuit",
        quantity: 1,
        price: 1.89,
      },
    ],
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 8.25,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "GRAND TOTAL",
    labels: {
      subtotal: "SubTotal",
      amountTendered: "Cash Tender",
      change: "Change",
    },
    paymentMethod: "Cash",
    amountTendered: 20.0,
    cardLastFour: "",
    showCardAuth: false,
    footerMessage: "Tell us about your visit and get a\nFREE SAUSAGE BISCUIT\nwith any purchase!",
    policyText: "Go to BojanglesListens.com to complete a brief survey within 2 days of your visit.\nTo redeem offer, print or bring the barcode provided at the end of the survey and this receipt to the cashier. Only one survey may be completed per household per month. Offer expires 30 days from date of purchase. Cannot be combined with any other offer. No cash value.\nSurvey Code: 41270-0012-4075-12034-8",
    showBarcode: false,
    paperStyle: "thermal",
  },
  // vitamin-shoppe — was missing-key-details. Sources:
  //   https://s3-media0.fl.yelpcdn.com/bphoto/7efNca1SFi57eeM1lgEhhQ/o.jpg
  //   https://freshfitnhealthy.com/my-trip-to-vitamin-shoppe/
  //   https://s3-media0.fl.yelpcdn.com/bphoto/ysAb7JdLsEQQxnIZpxVoyw/l.jpg
  "vitamin-shoppe": {
    businessName: "The Vitamin Shoppe",
    addressLine1: "The Vitamin Shoppe #0712",
    addressLine2: "650 Harmon Meadow Blvd\nSecaucus, NJ 07094",
    phone: "Telephone: (201)555-0148",
    website: "",
    cashier: "",
    register: "",
    hideStoreLine: true,
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "asterisk",
    itemStyle: "lined",
    items: [
      {
        name: "ON GOLD STD WHEY DBL CHOC 2LB",
        quantity: 1,
        price: 45.99,
        discount: 5.0,
        notTaxed: true,
      },
      {
        name: "TVS VITAMIN D3 2000IU 300SG",
        quantity: 1,
        price: 15.99,
        notTaxed: true,
      },
      {
        name: "BODYTECH FISH OIL 1000MG 250SG",
        quantity: 1,
        price: 21.49,
        notTaxed: true,
      },
      {
        name: "BLENDER BOTTLE CLASSIC 28OZ",
        quantity: 1,
        price: 12.99,
      },
    ],
    currency: "USD",
    taxLabel: "Sales Tax 6.625%",
    taxRate: 6.625,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "Total",
    labels: {
      subtotal: "Subtotal",
      itemDiscount: "Healthy Awards Price",
      savings: "You Saved:",
    },
    showSavings: true,
    paymentMethod: "Credit Card",
    paymentName: "Visa",
    cardLastFour: "2286",
    showCardAuth: false,
    cardRows: [
      {
        label: "No.:",
        value: "XXXXXXXXXXXX2286 <S>",
      },
      {
        label: "Auth. No.:",
        value: "XXXXX41",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            label: "Store: 0712   Reg: 01",
            value: "Tran: 284511",
          },
          {
            label: "Date:",
            value: "{{date+0}}",
          },
          {
            label: "Assoc:",
            value: "021547",
          },
        ],
      },
      {
        rows: [
          {
            value: "Save 10% today with Auto Delivery!\nIt's convenient, flexible and time-saving.\nAsk a Health Enthusiast for details.",
          },
        ],
      },
    ],
    footerMessage: "www.VitaminShoppe.com",
    policyText: "* Vitamin Shoppe values your feedback *",
    showBarcode: true,
    paperStyle: "thermal",
  },
  // burlington — was wrong-format. Sources:
  //   https://i.pinimg.com/736x/20/7b/32/207b3204085b1d088cc0cf8479b5b3c0.jpg
  //   https://pbs.twimg.com/media/DWWrPATVMAAi80w.jpg
  "burlington": {
    businessName: "Burlington",
    logoText: "Burlington",
    addressLine1: "3540 Tyler St, Riverside, CA",
    addressLine2: "Store Mgr. Denise R.  (951) 555-0136",
    phone: "",
    website: "www.Burlington.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Trans.: 41873",
            value: "Store: 00517",
          },
          {
            label: "Reg.: 004",
            value: "Cashier: Luis",
          },
          {
            value: "SALE",
          },
        ],
      },
    ],
    topBarcode: true,
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "lined",
    skuFirst: true,
    items: [
      {
        name: "2 BUTTON HR ROLL",
        quantity: 1,
        price: 14.99,
        discount: 3.0,
        sku: "0Y24523DS13",
        taxFlag: "T",
      },
      {
        name: "2PK BIKE 2 PKTS:BL",
        quantity: 1,
        price: 12.99,
        discount: 2.6,
        sku: "0403KS0736",
        taxFlag: "T",
      },
      {
        name: "7 2 PKT HRT YOKE",
        quantity: 1,
        price: 6.99,
        discount: 1.4,
        sku: "320214-36IA0",
        taxFlag: "T",
      },
      {
        name: "VEGGIE STORAGE SACK",
        quantity: 1,
        price: 2.99,
        sku: "G-KPR-20F7",
        taxFlag: "T",
      },
    ],
    currency: "USD",
    taxLabel: "Total Sales Tax",
    taxRate: 8.75,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "Total",
    labels: {
      subtotal: "Subtotal",
      itemDiscount: "Store Coupon 20.00%",
      itemDiscounts: "Total Discount",
      change: "Change Due",
      amountTendered: "Total Tender",
      itemsSold: "Items sold:",
    },
    paymentMethod: "Debit Card",
    paymentName: "Debit",
    cardLastFour: "8836",
    showCardAuth: false,
    cardRows: [
      {
        label: "Card:",
        value: "Visa",
      },
      {
        label: "Account:",
        value: "8836",
      },
      {
        label: "AID:",
        value: "A0000000980840",
      },
      {
        label: "CVM:",
        value: "Verified By Pin",
      },
      {
        label: "Auth:",
        value: "072318 (A)",
      },
      {
        label: "Entry:",
        value: "CTLS",
      },
    ],
    footerMessage: "SHOP WITH CONFIDENCE\nOur goal is your complete satisfaction!",
    policyText: "THANK YOU FOR SHOPPING",
    showBarcode: false,
    paperStyle: "thermal",
    subtotalNet: true,
  },
  // bed-bath-beyond — was missing-key-details. Sources:
  //   https://www.younghouselove.com/pillow-talk/
  //   https://prod-cdn-thekrazycouponlady.imgix.net/wp-content/uploads/2022/11/bed-bath-beyond-returns-policy-receipt-bag-02-1669656399-1669656399.jpg
  "bed-bath-beyond": {
    businessName: "Bed Bath & Beyond",
    logoText: "BED BATH & BEYOND",
    addressLine1: "BED BATH & BEYOND #1147",
    addressLine2: "1680 MORRIS AVE\nUNION, NJ 07083",
    phone: "(908)555-0129",
    website: "",
    cashier: "",
    register: "",
    hideStoreLine: true,
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "asterisk",
    itemStyle: "lined",
    items: [
      {
        name: "WAMSUTTA BATH TOWEL",
        quantity: 2,
        price: 19.99,
        sku: "041256321",
        taxFlag: "T",
      },
      {
        name: "OXO GOOD GRIPS COLANDER",
        quantity: 1,
        price: 24.99,
        discount: 5.0,
        sku: "046871177",
        taxFlag: "T",
      },
      {
        name: "SIMPLEHUMAN SOAP PUMP",
        quantity: 1,
        price: 49.99,
        sku: "044190512",
        taxFlag: "T",
      },
    ],
    currency: "USD",
    taxLabel: "6.625% SALES TAX",
    taxRate: 6.625,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "TOTAL",
    labels: {
      subtotal: "SUBTOTAL",
      itemDiscount: "PRICE ADJ",
      itemDiscounts: "PRICE ADJ",
      change: "CHANGE",
    },
    paymentMethod: "Credit Card",
    cardLastFour: "5129",
    showCardAuth: false,
    afterPayment: [
      {
        rows: [
          {
            value: "RETURN LIMITS FROM DATE OF PURCHASE:",
          },
          {
            value: "-90 days: MOST ITEMS",
          },
          {
            value: "-60 days: ELECTRIC ITEMS",
          },
          {
            value: "-30 days: SMART HOME/TECH SUMMER, HOLIDAY",
          },
          {
            value: "-No Returns: AS-IS/BEYOND DEALS",
          },
          {
            value: "-365 days: GIFT REGISTRY ITEMS",
          },
        ],
      },
    ],
    footerMessage: "For details regarding holiday returns please visit bedbathandbeyond.com",
    policyText: "",
    showBarcode: true,
    paperStyle: "thermal",
  },
  // outback-steakhouse — was wrong-format. Sources:
  //   https://thekrazycouponlady.com/tips/store-hacks/outback-specials-savings
  //   https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/e3/26/79/receipt.jpg
  //   https://www.complaintsboard.com/outback-steakhouse-b120102
  "outback-steakhouse": {
    businessName: "Outback Steakhouse",
    logoText: "OUTBACK STEAKHOUSE",
    addressLine1: "4210 W Kennedy Blvd",
    addressLine2: "Tampa, FL 33609",
    phone: "",
    website: "",
    greeting: "EAT-EARN-REDEEM\nwww.Dine-Rewards.com",
    cashier: "",
    register: "",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "0217a",
            value: "Table 24  #Party 2",
          },
          {
            label: "MARCUS T",
            value: "SvrCk: 6  6:42p",
          },
        ],
      },
    ],
    fontFamily: "courier",
    headerAlign: "center",
    ruleStyle: "none",
    itemStyle: "qtycol",
    items: [
      {
        name: "BLOOM",
        quantity: 1,
        price: 11.99,
      },
      {
        name: "6 SIRLOIN",
        quantity: 1,
        price: 17.99,
      },
      {
        name: "8 FILET",
        quantity: 1,
        price: 29.99,
      },
      {
        name: "COLD BEVERAGE",
        quantity: 1,
        price: 3.49,
      },
      {
        name: "ICE WATER",
        quantity: 1,
        price: 0.0,
      },
    ],
    currency: "USD",
    taxLabel: "TAX:",
    taxRate: 7.5,
    showTaxRate: false,
    discount: 0,
    tip: 0,
    grandTotalLabel: "TOTAL:",
    labels: {
      subtotal: "Sub Total:",
      discount: "AARP 10%",
    },
    paymentMethod: "Credit Card",
    cardLastFour: "9034",
    showCardAuth: false,
    footerMessage: "Tip guide provided for your convenience, mates.",
    policyText: "**********************************\nFOR CONTACTLESS PAYMENT:\nUSE THE OUTBACK APP OR VISIT\nOUTBACK.COM/PAY AND ENTER\nTHE FOLLOWING PAYMENT CODE:\n\nKRTWQM",
    showBarcode: false,
    paperStyle: "thermal",
  },
  // longhorn-steakhouse — was wrong-format. Sources:
  //   https://www.tripadvisor.com/Restaurant_Review-g59544-d514640-Reviews-LongHorn_Steakhouse-South_Charleston_West_Virginia.html (receipt photo: https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/fb/d7/e1/receipt.jpg)
  //   https://merchants.letsweel.com/merchants/longhorn-steakhouse
  //   https://www.longhornsteakhouse.com/menu (prices; current menu prices approximate, unverified per market)
  "longhorn-steakhouse": {
    businessName: "LongHorn 5247",
    addressLine1: "3720 Nicholasville Rd",
    addressLine2: "Lexington, KY 40503",
    phone: "(859) 555-0148",
    website: "",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Check # :",
            value: "18342",
          },
          {
            value: "Table 214",
          },
          {
            value: "Dana R",
          },
          {
            label: "Gst",
            value: "2",
          },
        ],
      },
    ],
    items: [
      {
        name: "Guest No.1",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "Wild West Shrimp",
        quantity: 1,
        price: 12.49,
      },
      {
        name: "9oz Flo's Filet",
        quantity: 1,
        price: 30.99,
      },
      {
        name: "Steamed Asparagus",
        quantity: 1,
        price: 2.99,
      },
      {
        name: "Blue Moon Small",
        quantity: 2,
        price: 6.49,
      },
      {
        name: "Guest No.2",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "12oz Outlaw Ribeye",
        quantity: 1,
        price: 33.49,
      },
      {
        name: "Sweet Tea",
        quantity: 1,
        price: 3.49,
      },
    ],
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 6,
    showTaxRate: false,
    grandTotalLabel: "Total",
    labels: {
      subtotal: "Subtotal",
    },
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    cardRows: [
      {
        label: "VISA",
        value: "XXXXXXXXXXXX4417",
      },
      {
        label: "Auth:",
        value: "072915",
      },
    ],
    afterPayment: [
      {
        rows: [
          {
            value: "ID # 5247 18342 0915",
          },
          {
            value: "Survey - Chance to win one of five $100 gift cards!",
          },
          {
            value: "Each month we're awarding 5 guests a $100 restaurant gift card!",
          },
          {
            value: "Visit LONGHORNSURVEY.COM and enter the ID # above",
          },
          {
            value: "NO PURCHASE NECESSARY. Void where prohibited. See Official Rules at LONGHORNSURVEY.COM",
          },
          {
            value: "Disponible en Espanol",
          },
        ],
      },
      {
        rows: [
          {
            label: "OFFER EXPIRES",
            value: "{{date+7}}",
          },
        ],
      },
    ],
    footerMessage: "",
    showBarcode: false,
    paperStyle: "thermal",
    paperFinish: "thermal",
    fontFamily: "courier",
    ruleStyle: "dashed",
    itemStyle: "qtycol",
    headerAlign: "center",
  },
  // marco-s-pizza — was wrong-format. Sources:
  //   https://www.yelp.com/biz/marcos-pizza-johnson-city-2 (receipt photo: https://s3-media0.fl.yelpcdn.com/bphoto/RuMRNzEqaFMatuSC9ANr1A/l.jpg)
  //   https://www.opinionr.com/tellmarcos/ (receipt image: https://www.opinionr.com/wp-content/uploads/Receipt-to-take-Marcos-Pizza-survey.jpg)
  //   https://www.marcos.com/ (menu prices, approximate)
  "marco-s-pizza": {
    businessName: "Marco's Pizza #2147",
    greeting: "HELLO PRIMO!",
    addressLine1: "5315 Monroe St",
    addressLine2: "Toledo, OH 43623",
    phone: "419-555-0172",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Check#:",
            value: "57",
          },
          {
            label: "Type:",
            value: "DELVRY",
          },
          {
            label: "Sent:",
            value: "6:42pm",
          },
          {
            label: "Order Taker:",
            value: "Web Order",
          },
        ],
      },
    ],
    items: [
      {
        name: "Lg. Deluxe",
        quantity: 1,
        price: 20.99,
        discount: 3.0,
      },
      {
        name: "Lg. Pepperoni Magnifico",
        quantity: 1,
        price: 19.99,
        discount: 3.0,
      },
      {
        name: "CheezyBread",
        quantity: 1,
        price: 8.99,
        modifiers: ["Garlic Sauce"],
      },
      {
        name: "2-Liter Pepsi",
        quantity: 1,
        price: 3.79,
      },
    ],
    labels: {
      subtotal: "Subtotal",
      itemDiscount: "$3 Off Any Large Specialty Pizza",
      deliveryFee: "Delivery Charge",
      tip: "Tip",
    },
    currency: "USD",
    taxLabel: "Tax",
    taxRate: 7.75,
    showTaxRate: false,
    deliveryFee: 3.99,
    tip: 5.0,
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "2281",
    showCardAuth: false,
    afterPayment: [
      {
        rows: [
          {
            label: "Survey Code:",
            value: "2147-0057-61842093-15",
          },
          {
            label: "Validation Code:",
            value: "____________",
          },
          {
            value: "Must be redeemed within 30 days.",
          },
        ],
      },
    ],
    footerMessage: "",
    showBarcode: false,
    paperStyle: "thermal",
    paperFinish: "thermal",
    fontFamily: "courier",
    ruleStyle: "double",
    itemStyle: "qtycol",
    headerAlign: "center",
  },
  // just-eat — was wrong-format. Sources:
  //   https://sendlayer.com/blog/how-to-increase-engagement-with-dynamic-email-content/ (Just Eat transactional email screenshot: https://sendlayer.com/wp-content/uploads/2024/11/just-eat-transatctional-email.png)
  //   https://becleverwithyourcash.com/how-to-save-money-at-just-eat/
  //   https://www.deliverect.com/en/blog/omni-channel-restaurant/just-eat-uk-101-the-essential-guide-for-restaurants
  //   https://www.just-eat.co.uk/plus/terms-and-conditions
  "just-eat": {
    businessName: "Just Eat",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    hideStoreLine: true,
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "qtycol",
    dividers: "minimal",
    greeting: "Hey there, great news! Bombay Spice Kitchen have received your order. Get ready to tuck-in!",
    sections: [
      {
        rows: [
          {
            label: "Your order number is:",
            value: "731842056",
          },
        ],
      },
      {
        title: "Just to confirm",
        rows: [
          {
            value: "Bombay Spice Kitchen",
          },
          {
            value: "48 Holloway Road, London, N7 8JL",
          },
        ],
      },
      {
        title: "Deliver to:",
        rows: [
          {
            value: "Flat 3, 19 Elm Grove, London, N7 6QA",
          },
        ],
      },
    ],
    items: [
      {
        name: "Chicken Tikka Masala",
        quantity: 1,
        price: 10.95,
        modifiers: ["Medium"],
      },
      {
        name: "Pilau Rice",
        quantity: 1,
        price: 3.75,
      },
      {
        name: "Garlic Naan",
        quantity: 1,
        price: 3.45,
      },
      {
        name: "Onion Bhaji (4)",
        quantity: 1,
        price: 4.5,
      },
    ],
    currency: "GBP",
    dateOrder: "dmy",
    taxLabel: "VAT",
    taxRate: 0,
    deliveryFee: 2.49,
    serviceFee: 1.99,
    labels: {
      subtotal: "Subtotal:",
      deliveryFee: "Delivery fee",
      serviceFee: "Service charge",
    },
    grandTotalLabel: "Total:",
    paymentMethod: "Credit Card",
    paymentName: "Visa",
    cardLastFour: "6620",
    showCardAuth: false,
    afterPayment: [
      {
        title: "All good?",
        rows: [
          {
            value: "If things aren't right, get some more help in the app. Alternatively give Bombay Spice Kitchen a buzz on 020 7946 0183.",
          },
        ],
      },
      {
        title: "Help make us even better...",
        rows: [
          {
            value: "Please help us improve our ordering service by completing our short survey. Share your thoughts >",
          },
        ],
      },
    ],
    footerMessage: "Just-Eat.co.uk Ltd",
    policyText: "Remember, Just Eat will never, ever email you asking for your bank or card details.",
    showBarcode: false,
  },
  // staples — was missing-key-details. Sources:
  //   https://expressexpense.com/receiptDB/9343-staples-receipt1.jpg (Staples NYC receipt photo)
  //   https://www.scribd.com/document/364618108/Receipt-Staples
  //   https://baymard.com/checkout-usability/benchmark/step-type/receipt/4273-staples-step-6 (online confirmation, background)
  "staples": {
    businessName: "STAPLES",
    greeting: "that was easy.\nLow prices. Every item. Every day.",
    addressLine1: "400 Cochituate Rd",
    addressLine2: "Framingham, MA 01701",
    phone: "(508) 555-0126",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "SALE",
            value: "0412 3 007 51824",
          },
          {
            label: "REWARDS NUMBER",
            value: "2047719365",
          },
        ],
      },
    ],
    itemHeader: {
      left: "QTY SKU",
      right: "PRICE",
    },
    itemStyle: "qtycol",
    items: [
      {
        name: "STPLS COPY PAPER 8.5X11 RM",
        quantity: 2,
        price: 10.49,
        sku: "718103230094",
      },
      {
        name: "HP 67XL BLACK INK",
        quantity: 1,
        price: 39.99,
        sku: "190780571510",
      },
      {
        name: "SHARPIE FINE BLK 12PK",
        quantity: 1,
        price: 14.29,
        sku: "071641301712",
      },
      {
        name: "STPLS 1SUBJ NTBK 7",
        quantity: 1,
        price: 3.49,
        sku: "718103025423",
      },
    ],
    currency: "USD",
    taxLabel: "Standard Tax",
    taxRate: 6.25,
    showTaxRate: true,
    grandTotalLabel: "TOTAL",
    labels: {
      subtotal: "SUBTOTAL",
      itemsSold: "TOTAL ITEMS",
    },
    paymentMethod: "Debit Card",
    paymentName: "Debit Tender:",
    cardLastFour: "3842",
    showCardAuth: false,
    cardRows: [
      {
        label: "Card No.:",
        value: "XXXXXXXXXXXX3842 [S]",
      },
      {
        label: "Auth No.:",
        value: "518206",
      },
    ],
    footerMessage: "Compare and Save",
    policyText: "Please save this receipt. See staples.com for our full return policy.",
    showBarcode: true,
    paperStyle: "thermal",
    paperFinish: "thermal",
    fontFamily: "courier",
    ruleStyle: "none",
    headerAlign: "center",
  },
  // ebay — was wrong-format. Sources:
  //   https://www.scribd.com/document/979451559/Order-Details-EBay (2025 eBay order-details printout)
  //   https://www.scribd.com/document/844607450/Your-Order-is-Confirmed (2024 eBay confirmation email)
  //   https://developer.ebay.com/api-docs/sell/finances/types/pay:OrderSummary
  //   https://community.ebay.com/forum/ask-a-mentor-57913/topic/sold-item-364745/
  "ebay": {
    businessName: "eBay",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    hideStoreLine: true,
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    dividers: "minimal",
    itemStyle: "table",
    greeting: "Thanks for shopping! Your order is confirmed.",
    sections: [
      {
        title: "Order information",
        rows: [
          {
            label: "Buyer",
            value: "jordan_k_84",
          },
          {
            label: "Seller",
            value: "brightside_tech",
          },
          {
            label: "Placed on",
            value: "{{date+0}}",
          },
          {
            label: "Payment method",
            value: "Credit Card",
          },
          {
            label: "Paid on",
            value: "{{date+0}}",
          },
        ],
      },
      {
        title: "Shipping address",
        rows: [
          {
            value: "Jordan Kim",
          },
          {
            value: "2218 Linden Ave",
          },
          {
            value: "Columbus, Ohio 43211-1904",
          },
          {
            value: "United States",
          },
        ],
      },
      {
        title: "Items bought from brightside_tech",
        rows: [
          {
            label: "Order number:",
            value: "17-12458-60391",
          },
          {
            label: "Shipping service",
            value: "USPS Ground Advantage",
          },
        ],
      },
    ],
    items: [
      {
        name: "Apple AirPods Pro 2nd Gen USB-C MagSafe Case (276518304922)",
        quantity: 1,
        price: 164.0,
      },
    ],
    currency: "USD",
    taxLabel: "Tax*",
    taxRate: 7.5,
    showTaxRate: false,
    deliveryFee: 6.95,
    labels: {
      subtotal: "1 item",
      deliveryFee: "Shipping",
    },
    grandTotalLabel: "Order total",
    paymentMethod: "Credit Card",
    cardLastFour: "0318",
    showCardAuth: false,
    policyText: "*We're required by law to collect sales tax and applicable fees for certain tax authorities.",
    footerMessage: "",
    showBarcode: false,
  },
  // canva — was wrong-format. Sources:
  //   https://www.scribd.com/document/889413857/Canva-Invoice (Canva Tax Invoice PDF, 2024)
  //   https://www.canva.com/help/find-read-invoices/ (invoice number format, seller entity; via search snippet)
  //   https://www.brex.com/tools/charge-finder/canva-pty-limited
  "canva": {
    businessName: "Canva",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    hideStoreLine: true,
    paperFinish: "invoice",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    dividers: "minimal",
    itemStyle: "lined",
    greeting: "Tax Invoice",
    invoice: true,
    numberLabel: "Invoice no.",
    sections: [
      {
        title: "To",
        rows: [
          {
            value: "Riley Morgan",
          },
          {
            value: "riley.morgan@example.com",
          },
        ],
      },
    ],
    items: [
      {
        name: "Subscriptions",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "Canva Pro (yearly)",
        quantity: 1,
        price: 120.0,
      },
    ],
    currency: "USD",
    taxLabel: "Includes tax",
    taxRate: 0,
    taxIncluded: true,
    taxLines: [
      {
        label: "Includes tax",
        rate: 0,
      },
    ],
    showTaxRate: false,
    labels: {
      subtotal: "Total",
    },
    grandTotalLabel: "Total charged",
    paymentMethod: "Credit Card",
    cardLastFour: "5521",
    showCardAuth: false,
    policyText: "Payments will be processed internationally. Additional bank fees may apply.\nPlease retain for your records.\nCanva Pty Ltd, 110 Kippax St, Surry Hills NSW 2010 Australia",
    footerMessage: "",
    showBarcode: false,
  },
  // pret-a-manger — was wrong-format. Sources:
  //   https://londonist.com/2015/06/london-news-roundup-365 (UK receipt photo: https://assets.londonist.com/uploads/2015/06/i875/jesus_pret_receipt.jpg)
  //   https://www.scribd.com/document/893799065/khd7x3etpdfbxjoj (Pret Changi T3 receipt, 2025)
  //   https://www.stl-training.co.uk/post-39034-vat.html (eat-in vs take-away VAT)
  //   https://whitneyhess.com/blog/2010/06/18/photo-of-the-day-brand-transparency/
  "pret-a-manger": {
    businessName: "Pret A Manger",
    addressLine1: "Moorgate Station\nShop Number 418",
    addressLine2: "London\nEC2M 6TX",
    phone: "",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            value: "06052600173",
          },
          {
            value: "Sam K",
          },
          {
            label: "POS :",
            value: "2 - Till 2",
          },
        ],
      },
    ],
    items: [
      {
        name: "TAKE AWAY",
        quantity: 0,
        price: 0,
        heading: true,
      },
      {
        name: "FLAT WHITE",
        quantity: 1,
        price: 3.65,
      },
      {
        name: "CHICKEN CAESAR BACON BAG",
        quantity: 1,
        price: 6.25,
        notTaxed: true,
      },
      {
        name: "SEA SALT CRISPS",
        quantity: 1,
        price: 1.35,
        notTaxed: true,
      },
    ],
    currency: "GBP",
    dateOrder: "dmy",
    taxIncluded: true,
    taxLabel: "VAT INCLUDED",
    taxRate: 20,
    showTaxRate: true,
    hideSubtotal: true,
    grandTotalLabel: "INCLUSIVE TOTAL DUE",
    paymentMethod: "Credit Card",
    paymentName: "CARD",
    cardLastFour: "9034",
    showCardAuth: false,
    footerMessage: "",
    showBarcode: false,
    paperStyle: "thermal",
    paperFinish: "thermal",
    fontFamily: "courier",
    ruleStyle: "none",
    itemStyle: "qtycol",
    headerAlign: "center",
  },
  // netflix — was wrong-format. Sources:
  //   https://www.scribd.com/document/774967202/netflix-invoice (netflix.com/invoice/print, 2024)
  //   https://help.netflix.com/en/node/41049/us
  //   https://help.netflix.com/en/node/27
  "netflix": {
    businessName: "Netflix, Inc.",
    addressLine1: "121 Albright Way",
    addressLine2: "Los Gatos, CA 95032",
    phone: "",
    hideStoreLine: true,
    paperFinish: "invoice",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "left",
    ruleStyle: "solid",
    itemStyle: "table",
    invoice: true,
    numberLabel: "Invoice No.",
    sections: [
      {
        rows: [
          {
            value: "alex.sample@example.com",
          },
        ],
      },
      {
        title: "Service Period",
        rows: [
          {
            label: "From",
            value: "{{date+0}}",
          },
          {
            label: "To",
            value: "{{date+29}}",
          },
        ],
      },
    ],
    items: [
      {
        name: "Streaming Service — Standard",
        quantity: 1,
        price: 17.99,
      },
    ],
    currency: "USD",
    taxLabel: "TAX TOTAL",
    taxRate: 0,
    labels: {
      subtotal: "SUBTOTAL",
      paymentMethod: "Payment Method",
    },
    grandTotalLabel: "TOTAL",
    paymentMethod: "Debit Card",
    cardLastFour: "4441",
    paymentInline: true,
    showCardAuth: false,
    afterPayment: [
      {
        rows: [
          {
            label: "Payment Date:",
            value: "{{date+0}}",
          },
          {
            label: "Reference ID:",
            value: "QXR72KD09T4WMB",
          },
        ],
      },
    ],
    footerMessage: "",
    showBarcode: false,
  },
  // goat — was missing-key-details. Sources:
  //   https://blumereceipts.com/ (screenshot of GOAT confirmation email: https://blumereceipts.com/images/scroll-gallery/goat.webp — a receipt-generator gallery, treat as low confidence)
  //   https://www.goat.com/returns-old (US shipping $12/$15)
  //   https://support.goat.com/hc/en-us/articles/360047587011-Shipping-for-China-Sellers
  "goat": {
    businessName: "GOAT",
    addressLine1: "",
    addressLine2: "",
    phone: "",
    hideStoreLine: true,
    paperFinish: "email",
    paperStyle: "minimal",
    fontFamily: "inter",
    headerAlign: "center",
    ruleStyle: "solid",
    dividers: "minimal",
    itemStyle: "lined",
    greeting: "Thank you for your order\nYour item(s) have been pre-authenticated by our specialists and are shipping directly to you from GOAT.",
    sections: [
      {
        rows: [
          {
            value: "ORDER #41529837",
          },
        ],
      },
      {
        title: "Shipping address",
        rows: [
          {
            value: "Jordan Reyes",
          },
          {
            value: "1840 Hillhurst Ave",
          },
          {
            value: "Los Angeles, CA 90027",
          },
        ],
      },
    ],
    items: [
      {
        name: "AIR JORDAN 4 RETRO 'BRED REIMAGINED'",
        quantity: 1,
        price: 238.0,
        modifiers: ["Size: US M 10", "Condition: New"],
      },
    ],
    currency: "USD",
    taxLabel: "Sales Tax",
    taxRate: 9.5,
    showTaxRate: false,
    deliveryFee: 12.0,
    labels: {
      subtotal: "Subtotal",
      deliveryFee: "Shipping",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "7702",
    showCardAuth: false,
    footerMessage: "",
    showBarcode: false,
  },
  // lululemon — was wrong-format. Sources:
  //   https://www.reddit.com/r/lululemon/comments/hw6ess/if_you_use_your_healthcare_id_it_applies_to_final/ (receipt photo: https://i.redd.it/7c94g5dfcic51.jpg)
  //   https://www.schimiggy.com/how-to-find-lululemon-size-dots-markers/ (lululemon e-receipt screenshot)
  //   https://www.eu.lululemon.com/en-pl/returns-policy-and-refunds/returnspolicyandrefunds.html
  "lululemon": {
    businessName: "lululemon",
    addressLine1: "8516 Macleod Trail SE",
    addressLine2: "Calgary, AB T2H 0E3",
    phone: "(403) 555-0164",
    hideStoreLine: true,
    sections: [
      {
        rows: [
          {
            label: "Store:",
            value: "3528",
          },
          {
            label: "Transaction:",
            value: "0417-22958",
          },
          {
            label: "Educator:",
            value: "Priya S",
          },
        ],
      },
    ],
    itemStyle: "stacked",
    items: [
      {
        name: "Align HR Pant 25\" BLK 6",
        quantity: 1,
        price: 118.0,
        sku: "128471903",
        modifiers: ["COLOR: 0001", "SIZE: 6"],
      },
      {
        name: "Swiftly Tech SS 2.0 WHT 6",
        quantity: 1,
        price: 78.0,
        sku: "131560284",
        modifiers: ["COLOR: 0002", "SIZE: 6"],
      },
    ],
    currency: "CAD",
    taxLabel: "GST/HST",
    taxRate: 5,
    showTaxRate: true,
    labels: {
      subtotal: "Subtotal",
    },
    grandTotalLabel: "Total",
    paymentMethod: "Credit Card",
    cardLastFour: "4417",
    showCardAuth: false,
    afterPayment: [
      {
        title: "TRANSACTION RECORD",
        rows: [
          {
            label: "Card Number",
            value: "************4417",
          },
          {
            label: "Card Type",
            value: "VISA",
          },
          {
            label: "Card Entry",
            value: "CONTACTLESS",
          },
        ],
      },
    ],
    footerMessage: "",
    showBarcode: true,
    paperStyle: "thermal",
    paperFinish: "thermal",
    fontFamily: "courier",
    ruleStyle: "solid",
    headerAlign: "center",
  },
};

/** Profiles the research corrected (e.g. Wawa food is not a fuel receipt). */
export const BRAND_SPEC_PROFILES: Record<string, ReceiptProfile> = {
  amazon: "retail",
  wawa: "retail",
  grab: "retail",
  costco: "warehouse",
  dhl: "retail",
  nike: "retail",
  uber: "ride",
  instacart: "delivery",
  speedway: "fuel",
  "trader-joe-s": "grocery",
  "macy-s": "fashion",
  "amc-theatres": "digital",
  asda: "grocery",
  orangetheory: "digital",
  marriott: "hotel",
  hilton: "hotel",
  balenciaga: "fashion",
  lyft: "ride",
  coach: "fashion",
  popeyes: "restaurant",
  "o-reilly-auto-parts": "auto",
  "jack-in-the-box": "restaurant",
  expedia: "travel",
  "xbox-store": "digital",
  "cracker-barrel": "restaurant",
  ups: "retail",
  hyatt: "hotel",
  didi: "ride",
  "alaska-airlines": "airline",
  "american-airlines": "airline",
  "uber-eats": "delivery",
  doordash: "delivery",
  "tgi-fridays": "restaurant",
  sephora: "beauty",
  versace: "fashion",
  "barnes-noble": "retail",
  "kay-jewelers": "fashion",
  "albert-heijn": "grocery",
  "nintendo-eshop": "digital",
  "epic-games": "digital",
  burberry: "fashion",
  venmo: "digital",
  "delta-airlines": "airline",
  "quest-diagnostics": "digital",
  sweetgreen: "digital",
  postmates: "delivery",
  "cash-app": "digital",
  hertz: "rental",
  "booking-com": "hotel",
  steam: "digital",
  "giant-food": "grocery",
  wingstop: "restaurant",
  rewe: "grocery",
  "apple-services": "digital",
  airbnb: "travel",
  ikea: "home",
  "costa-coffee": "coffee",
  "kwik-trip": "fuel",
  adobe: "digital",
  grubhub: "delivery",
  "harbor-freight": "home",
  carrefour: "grocery",
  racetrac: "fuel",
  quiktrip: "fuel",
  "advance-auto-parts": "auto",
  "office-depot": "retail",
  "arby-s": "restaurant",
  "hampton-inn": "hotel",
  "bass-pro-shops": "sporting",
  "frontier-airlines": "airline",
  "blue-bottle-coffee": "coffee",
  "longhorn-steakhouse": "restaurant",
  "marco-s-pizza": "restaurant",
  "just-eat": "delivery",
  staples: "retail",
  ebay: "digital",
  canva: "digital",
  "pret-a-manger": "coffee",
  netflix: "digital",
  goat: "digital",
  lululemon: "fashion",
};

/** Layouts the research pinned. */
export const BRAND_SPEC_VARIANTS: Record<string, LayoutVariant> = {
  "pizza-hut": "pos",
  "tgi-fridays": "pos",
};
