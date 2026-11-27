/**
 * What only one brand's page can say: the lines that print on that brand's
 * own receipt and what each one means.
 *
 * Written 2026-11-03 for the 15 brand pages with the most commercial search
 * demand (Search Console, Oct 19–31: Walmart, PayPal, Home Depot, Amazon…).
 * The rest of each brand page is assembled from shared copy pools in
 * lib/brands.ts, which an audit measured at ~61–64% vocabulary overlap between
 * pages; this is the part that can't be produced by swapping a name in.
 *
 * Every line here follows the researched layout in lib/brand-specs.ts (whose
 * comments list the full research sources). `sources` keeps only official or
 * neutral pages a reader can check — never competitor receipt sites or
 * uploaded document mirrors. Sample values on the template are invented, and
 * the copy says so; nothing here describes a real transaction.
 */
export interface BrandDepth {
  /** Printed lines, in the order they appear on the receipt. */
  lines: { label: string; meaning: string }[];
  /** One paragraph on how this brand's receipt differs from a generic one. */
  note: string;
  sources?: { title: string; url: string }[];
}

export const BRAND_DEPTH: Record<string, BrandDepth> = {
  walmart: {
    lines: [
      { label: "ST# OP# TE# TR#", meaning: "Store number, operator (cashier) ID, terminal and transaction number, printed on one line under the header." },
      { label: "Item + UPC", meaning: "Each item prints as a short all-caps name followed by its 12-digit UPC, e.g. GV 2% MLK GAL." },
      { label: "Tax flag", meaning: "A letter after the price, such as F, marks how the item was taxed." },
      { label: "TAX 1", meaning: "Tax prints against a numbered rate code rather than a plain \"Tax\" line." },
      { label: "Card block", meaning: "Card type, masked number, APPROVAL #, REF #, TRANS ID, VALIDATION and AID from the payment terminal." },
      { label: "# ITEMS SOLD", meaning: "A count of items in the basket, printed just above the TC#." },
      { label: "TC#", meaning: "The 20-digit transaction code. It is what Walmart's own receipt lookup and many cashback apps read." },
    ],
    note: "A Walmart receipt is a long monospaced thermal slip. What sets it apart is the UPC printed after every item and the TC# near the bottom, plus a survey line with an ID # at the top. The template keeps that order. To print one, download the PDF: it keeps the narrow slip width, and the builder's print-ready PDF centres the same receipt on an A4 page for an office printer.",
    sources: [
      { title: "Ibotta: sending a Walmart receipt", url: "https://help.ibotta.com/hc/en-us/articles/360012110879-How-do-I-send-my-Walmart-receipt-" },
    ],
  },
  paypal: {
    lines: [
      { label: "You sent a payment to…", meaning: "PayPal receipts open with who was paid, because they are emails, not till slips." },
      { label: "Merchant + email", meaning: "The business name and the email address the payment went to." },
      { label: "Transaction ID", meaning: "A 17-character code that identifies the payment inside PayPal; it is the reference to quote in a dispute." },
      { label: "Transaction date", meaning: "The date the payment was sent." },
      { label: "Purchase details", meaning: "Item lines with amounts, then tax and total." },
      { label: "Purchase Protection line", meaning: "A footer saying whether the payment is eligible for PayPal Purchase Protection." },
    ],
    note: "A PayPal receipt has no store, register or cashier. It is a payment confirmation laid out like an email, and the Transaction ID does the job a receipt number does elsewhere. The template uses that format instead of a till receipt.",
    sources: [
      { title: "PayPal Help: confirming a Virtual Terminal transaction", url: "https://www.paypal.com/au/cshelp/article/how-will-i-know-if-virtual-terminal-successfully-processed-a-transaction-ts2230" },
    ],
  },
  "home-depot": {
    lines: [
      { label: "Store / register / transaction", meaning: "A number line such as 0121 00034 58210 with the date and cashier, under the store header." },
      { label: "SKU first", meaning: "Each line leads with the item's SKU, then a short description." },
      { label: "Quantity column", meaning: "Bulk lumber and hardware print as quantity × unit price, e.g. 12 @ 3.98." },
      { label: "Bracketed code", meaning: "A short code such as <A> prints after the item description." },
      { label: "SALES TAX", meaning: "One sales-tax line before the total." },
      { label: "Card block", meaning: "Masked card, AUTH CODE, Chip Read and AID." },
    ],
    note: "Home Depot receipts are built around quantities and SKUs, because so much of what people buy there is sold by the piece: studs, screws, bags of concrete. That is why the template puts a quantity column next to every line.",
    // No sources: the one listed (a Hunker article) 404s since Nov 2026 and has
    // no archive copy.
  },
  amazon: {
    lines: [
      { label: "Final Details for Order #", meaning: "The heading of Amazon's printable order summary, with the order number in 3-7-7 format." },
      { label: "Order Placed", meaning: "The date the order was placed, not the delivery date." },
      { label: "Shipping Speed + address", meaning: "Delivery option and the ship-to name and address." },
      { label: "Items Ordered / Sold by", meaning: "Each product with its quantity, price and the seller of record." },
      { label: "Estimated tax to be collected", meaning: "Amazon's own wording for the tax line." },
      { label: "Grand Total + payment", meaning: "The order total and the card it was charged to." },
    ],
    note: "Amazon does not hand out a paper receipt. What people print is the order details page, so the template copies that page rather than a till slip, including the 'Sold by' line that matters when a third-party seller fulfilled the order.",
    sources: [
      { title: "SlashGear: how to print or view an Amazon receipt", url: "https://www.slashgear.com/1778351/amazon-receipt-how-to-print-view/" },
      { title: "University of Utah: viewing Amazon order details", url: "https://fbs.admin.utah.edu/download/ushop/quickref/view-amazon-order-detail.pdf" },
    ],
  },
  uber: {
    lines: [
      { label: "Here's your receipt for your ride", meaning: "An emailed receipt that opens with the rider's name." },
      { label: "Fare breakdown", meaning: "Trip fare and fees as separate lines, then tax and total." },
      { label: "Payments", meaning: "The card or wallet charged." },
      { label: "Ride type + distance", meaning: "UberX (or another product) with miles and minutes, e.g. 9.84 miles | 24 min." },
      { label: "Pickup and drop-off", meaning: "Two timed address lines for where the trip started and ended." },
    ],
    note: "An Uber receipt documents a trip, not a basket of items, so the distance, duration and the two timed addresses carry as much weight as the fare. Expense policies usually ask for exactly those fields.",
  },
  starbucks: {
    lines: [
      { label: "Store #", meaning: "The store number printed in the header." },
      { label: "CHK", meaning: "The check number for the order." },
      { label: "Reg / Drawer", meaning: "Register and cash-drawer number." },
      { label: "Drink + modifiers", meaning: "Each drink prints with its add-ons as separate priced lines, e.g. Add Shot." },
      { label: "Card + Auth", meaning: "Masked card number and authorisation code." },
      { label: "Check Closed", meaning: "A line marking the check as paid." },
      { label: "Survey code", meaning: "A code for the mystarbucksvisit.com survey at the bottom." },
    ],
    note: "Starbucks receipts are short, but the modifiers make them distinctive: an extra shot or a syrup prints as its own line under the drink. The template keeps those lines editable.",
  },
  target: {
    lines: [
      { label: "DPCI before the name", meaning: "Each item starts with a 9-digit department-class-item number, then a short name such as THRESHOLD THROW PILLOW." },
      { label: "T tax flag", meaning: "A letter after the price marks taxed items, and the tax line names the state, e.g. T = MN TAX." },
      { label: "Card line", meaning: "Masked card with VISA CHARGE, then AID and AUTH CODE." },
      { label: "Barcode", meaning: "A barcode near the bottom that store systems scan for returns." },
      { label: "Expect More. Pay Less.", meaning: "Target's slogan in the footer." },
    ],
    note: "The DPCI is the Target-specific detail: department, class and item number, printed ahead of every product name. It is how Target staff find an item, and the template prints it the same way.",
    sources: [
      { title: "Racklify: how Target's DPCI system works", url: "https://racklify.com/encyclopedia/what-is-target-dpci-how-the-departmentclassitem-system-works/" },
    ],
  },
  "cvs-pharmacy": {
    lines: [
      { label: "REG# TRN# CSHR# STR#", meaning: "Register, transaction, cashier and store numbers on one line." },
      { label: "ExtraCare Card #", meaning: "The masked loyalty card number." },
      { label: "Tax flags", meaning: "A letter after each price marks taxed and untaxed items; whether medicines are taxed depends on the state." },
      { label: "Card block", meaning: "Masked card, APPROVED#, REF#, TRAN TYPE, AID, TC and TERMINAL#." },
      { label: "Return date", meaning: "A line saying returns with the receipt are accepted through a specific date." },
      { label: "Survey ID + Year to Date Savings", meaning: "A survey code and the ExtraCare savings total for the year." },
      { label: "Coupons and rewards", meaning: "Reward offers printed at the end, which is why CVS receipts are famously long." },
    ],
    note: "The length is the giveaway: ExtraCare savings, coupon offers and a dated return line all print below the payment block. The template includes them so the receipt doesn't stop short of where a real one ends.",
  },
  "apple-store": {
    lines: [
      { label: "Store name", meaning: "The specific Apple Store, e.g. Apple Fifth Avenue." },
      { label: "Part numbers", meaning: "Each product lists Apple's part number, e.g. MG0X4LL/A, next to its name." },
      { label: "AppleCare+", meaning: "Coverage prints as its own line item when it is bought at the same time." },
      { label: "Specialist", meaning: "The name of the staff member who served you." },
      { label: "Return by", meaning: "The last day for a standard return, 14 days after purchase." },
      { label: "Payment", meaning: "Card or mobile payment such as Apple Pay." },
    ],
    note: "Apple Store receipts are usually emailed, not printed, and they are clean and sans-serif rather than thermal. The part number and the dated return line are the details that make one recognisable.",
    sources: [
      { title: "Apple: retail sales and refund policy", url: "https://www.apple.com/legal/sales-support/sales-policies/retail/" },
    ],
  },
  lyft: {
    lines: [
      { label: "Thanks for riding with…", meaning: "An emailed receipt naming the driver." },
      { label: "Pickup and drop-off", meaning: "Two timed address lines for the start and end of the ride." },
      { label: "Ride type", meaning: "Lyft Standard or another option." },
      { label: "Fare lines", meaning: "Ride fare and fees, then tax and total." },
      { label: "Payment", meaning: "The card charged." },
      { label: "Lost something?", meaning: "A footer pointing to help.lyft.com to contact the driver." },
    ],
    note: "Like Uber, a Lyft receipt is about the trip: who drove, from where, to where and when. Those are the fields most expense policies check, so the template puts them first.",
  },
  sephora: {
    lines: [
      { label: "Reg + Beauty Advisor", meaning: "Register number and the name of the Beauty Advisor who helped you." },
      { label: "Member", meaning: "The masked Beauty Insider membership number." },
      { label: "Status", meaning: "The member's tier, e.g. VIB." },
      { label: "Points balance", meaning: "Beauty Insider points after the purchase." },
      { label: "Item lines", meaning: "Brand and product name, then price." },
    ],
    note: "The loyalty block is what makes a Sephora receipt: member number, tier and points sit right on the receipt. Sephora can also find in-store purchases from the member account, which matters for returns.",
    sources: [
      { title: "Sephora: returns and exchanges", url: "https://www.sephora.com/returns" },
    ],
  },
  mcdonalds: {
    lines: [
      { label: "Survey Code", meaning: "A long, dash-separated code at the very top for the mcdvoice.com survey." },
      { label: "Restaurant #", meaning: "The restaurant number in the header." },
      { label: "Order number", meaning: "The number called out when the order is ready." },
      { label: "Meal + components", meaning: "A meal prints as one priced line with its side and drink listed under it." },
      { label: "Take-Out Total", meaning: "The total line names eat-in or take-out." },
    ],
    note: "Two things make a McDonald's receipt recognisable: the long survey code at the very top, and meals printed as one line with their parts underneath rather than three separate items.",
    sources: [
      { title: "McDonald's customer survey (mcdvoice)", url: "https://www.mcdvoice.com/" },
    ],
  },
  costco: {
    lines: [
      { label: "Item number first", meaning: "Each line starts with Costco's item number, then a short name; KS marks Kirkland Signature." },
      { label: "Instant savings", meaning: "Discounts print as their own line under the item they apply to." },
      { label: "Tax flag", meaning: "A letter after the price marks taxable items." },
      { label: "**** TOTAL", meaning: "Costco's starred total line." },
      { label: "Card block", meaning: "Masked card, Chip Read, AID, Seq#, App# and the response." },
      { label: "Whse / Trm / Trn / OP", meaning: "Warehouse, terminal, transaction and operator numbers near the bottom." },
    ],
    note: "Costco receipts are checked at the door, so they are dense with numbers: item numbers on every line, instant savings beneath them, and the warehouse and terminal numbers at the end.",
    sources: [
      { title: "Chowhound: what Costco looks for on your receipt", url: "https://chowhound.com/1508140/what-costco-looks-for-customer-receipt-check" },
    ],
  },
  "best-buy": {
    lines: [
      { label: "REG / TRANS", meaning: "Register and transaction number." },
      { label: "Your cashier was…", meaning: "The cashier's name." },
      { label: "SKU per item", meaning: "Each product shows Best Buy's 7-digit SKU." },
      { label: "Card block", meaning: "Masked card and authorisation." },
      { label: "My Best Buy member", meaning: "The masked member number and points earned." },
    ],
    note: "A Best Buy receipt is short but SKU-heavy, because electronics returns and warranty claims go by the SKU. The member points line at the bottom is the other Best Buy detail.",
  },
  walgreens: {
    lines: [
      { label: "REG TRAN STORE", meaning: "Register, transaction and store numbers on one line." },
      { label: "Item lines + savings", meaning: "Products with their prices, and sale or coupon savings shown under them." },
      { label: "Untaxed items", meaning: "Items exempt from sales tax in that state print without it." },
      { label: "SALES TAX with rate", meaning: "One tax line that shows the rate." },
      { label: "Card + AUTH CODE", meaning: "Masked card and authorisation code." },
      { label: "RFN#", meaning: "A reference number near the bottom that identifies the transaction." },
    ],
    note: "The RFN# and the savings lines are the Walgreens markers, along with a pointer to myWalgreens for full reward details.",
    sources: [
      { title: "Walgreens: return policy", url: "https://www.walgreens.com/returns" },
      { title: "Wikimedia Commons: Walgreens customer receipt", url: "https://commons.wikimedia.org/wiki/File:Walgreens_customer_receipt_with_RX_number.jpg" },
    ],
  },
  // 2026-11-09: the 37 brand pages Search Console listed as "Crawled – currently
  // not indexed" (URL Inspection of every sitemap URL). Most were last crawled
  // in June or July and judged on the shared-pool copy alone. Each entry follows
  // that brand's researched layout in lib/brand-specs.ts. Cartier and Kate Spade
  // were also dropped but are left out on purpose, like Balenciaga and Versace:
  // luxury receipts are searched for fake proof of purchase.
  chipotle: {
    lines: [
      { label: "TO GO", meaning: "The order type prints across the top of the ticket." },
      { label: "Server", meaning: "The name of the crew member who rang up the order." },
      { label: "Entrée lines", meaning: "Each bowl, burrito or taco order prints as one priced line, e.g. Chicken Burrito Bowl." },
      { label: "Add-ons", meaning: "Guacamole and queso print as their own priced lines because they cost extra." },
      { label: "Tax / Total", meaning: "A single tax line, then the total." },
      { label: "Survey Code", meaning: "A long numeric code for the chipotlefeedback.com survey in the footer." },
    ],
    note: "A Chipotle receipt is short: a handful of entrées, the extras that cost more, and a survey code at the bottom. Guacamole is the line people look for, because it is the item that is charged separately.",
    sources: [
      { title: "Chipotle customer survey", url: "https://www.chipotlefeedback.com/" },
    ],
  },
  "pizza-hut": {
    lines: [
      { label: "Order type + number", meaning: "CARRYOUT or DELIVERY with the order number, e.g. CARRYOUT · Order #1184." },
      { label: "Customer", meaning: "The name the order was placed under." },
      { label: "Size + crust", meaning: "Pizzas print with size and crust first, e.g. Lg Pan Pepperoni." },
      { label: "Wings and sides", meaning: "Sides print with their piece count, e.g. 8pc Bone-Out Wings." },
      { label: "Tax / Total", meaning: "One tax line, then the total." },
      { label: "Slogan", meaning: "No One OutPizzas the Hut. in the footer." },
    ],
    note: "Pizza Hut tickets are built around the order, not a register: carryout or delivery, an order number and the customer's name come first. Size and crust lead every pizza line.",
    sources: [
      { title: "Pizza Hut Help: invoices for Pizza Hut orders", url: "https://pizzahut-helpdesk.zendesk.com/hc/en-us/articles/13637341620495-Do-you-provide-invoices-for-Pizza-Hut-orders" },
    ],
  },
  dunkin: {
    lines: [
      { label: "TAKE OUT", meaning: "The order type at the top." },
      { label: "Crew", meaning: "The crew member's first name." },
      { label: "Size first", meaning: "Drinks lead with a size code, e.g. LG Iced Coffee or MD Hot Latte." },
      { label: "Food lines", meaning: "Sandwiches and donuts print as separate priced lines." },
      { label: "Tax / Total", meaning: "One tax line, then the total." },
      { label: "Survey Code", meaning: "A code for the dunkinrunsonyou.com survey in the footer." },
    ],
    note: "The size prefix is the Dunkin' detail: SM, MD and LG lead every drink line. The survey code at the bottom is what most people keep the receipt for.",
    sources: [
      { title: "Dunkin' customer survey", url: "https://dunkinrunsonyou.com/" },
    ],
  },
  "jamba-juice": {
    lines: [
      { label: "Reg + cashier", meaning: "Register number and the team member's name." },
      { label: "Size first", meaning: "Smoothies lead with Sm, Md or Lg, e.g. Md Mango-A-Go-Go." },
      { label: "Boosts", meaning: "Add-ins such as a Protein Boost print as their own priced line." },
      { label: "Bowls", meaning: "Açaí bowls print by name, without a size." },
      { label: "Card + Auth", meaning: "Masked card number and authorisation code." },
      { label: "Rewards code", meaning: "A code to add the visit to Jamba Rewards afterwards." },
    ],
    note: "Jamba receipts are short; the rewards code makes them distinctive. Boosts print under the smoothie they were added to, so the price of each add-in is visible.",
  },
  "boba-guys": {
    lines: [
      { label: "Clean layout", meaning: "A tablet-style receipt in a sans-serif font, not a thermal printout." },
      { label: "Drink lines", meaning: "Each tea or latte prints by name, e.g. Classic Black Milk Tea." },
      { label: "Boba", meaning: "Toppings such as boba print as their own line." },
      { label: "Sales Tax", meaning: "One sales-tax line." },
      { label: "Card + contactless", meaning: "The card brand, last four digits and Contactless." },
      { label: "Auth code", meaning: "The authorisation code from the card terminal." },
    ],
    note: "Boba Guys takes orders on Square, so its receipt looks like a clean digital slip rather than a register printout, with toppings priced separately from the drink.",
  },
  "sam-s-club": {
    lines: [
      { label: "ST# OP# TE# TR#", meaning: "Club number, operator ID, terminal and transaction number on one line." },
      { label: "Short names", meaning: "Items print in abbreviated caps; MM marks the Member's Mark house brand, e.g. MM ROTIS CHKN." },
      { label: "Pack sizes", meaning: "The pack size is part of the item name, e.g. MM WATER 40PK." },
      { label: "Instant Savings", meaning: "Member discounts print as their own line under the item." },
      { label: "TAX 1", meaning: "Tax prints against a numbered rate code." },
      { label: "# ITEMS SOLD", meaning: "A count of items in the basket near the bottom." },
    ],
    note: "Sam's Club shares Walmart's receipt layout, so the ST# OP# TE# TR# line looks familiar. What differs is the club stock: bulk pack sizes and the Member's Mark MM prefix on many lines.",
    sources: [
      { title: "Sam's Club Help: Instant Savings", url: "https://help.samsclub.com/app/answers/detail/a_id/1130/~/sam%E2%80%99s-club-instant-savings%E2%84%A0-program-faq" },
    ],
  },
  "lowe-s": {
    lines: [
      { label: "LOWE'S HOME CENTERS, LLC", meaning: "The legal name printed in the header." },
      { label: "STORE / TERMINAL", meaning: "Store and terminal number." },
      { label: "SALES# / TRANS#", meaning: "A sales number and a transaction number under the - SALE - heading." },
      { label: "Long item names", meaning: "Items print with brand and spec in caps, e.g. 1/2-IN X 10-FT PVC SCH 40 PIPE." },
      { label: "TOTAL TAX", meaning: "Lowe's names the tax line TOTAL TAX." },
      { label: "INVOICE TOTAL", meaning: "The total is labelled INVOICE TOTAL, not just TOTAL." },
    ],
    note: "A Lowe's receipt reads like a building-supplies invoice: full item specs in caps, a sales number and the words INVOICE TOTAL. Those are the lines to look for when matching it to a project.",
  },
  autozone: {
    lines: [
      { label: "Store # + Reg", meaning: "The store and register number." },
      { label: "Part names", meaning: "Parts print with brand and spec, e.g. MOBIL 1 EXT PERF 5W-30 5QT." },
      { label: "Battery core charge", meaning: "A separate charge that is refunded when the old battery comes back." },
      { label: "Duralast lines", meaning: "AutoZone's own Duralast parts are named on the line, which matters for warranty claims." },
      { label: "AutoZone Rewards", meaning: "The masked phone number of the rewards account in the footer." },
    ],
    note: "The core charge is the AutoZone detail: a battery purchase prints a second line for the deposit on the old one. Warranty claims on Duralast parts start from this receipt.",
  },
  marriott: {
    lines: [
      { label: "GUEST FOLIO", meaning: "Marriott's checkout statement is a folio, not a till receipt." },
      { label: "ROOM / NAME / RATE", meaning: "Room number, the guest as SURNAME/INITIAL, and the nightly rate." },
      { label: "ARRIVE / DEPART", meaning: "Check-in and check-out dates with times." },
      { label: "MBV#", meaning: "The masked Marriott Bonvoy member number." },
      { label: "Nightly lines", meaning: "One ROOM line per night, then city fees and restaurant charges." },
      { label: "ROOM TAX / OCC TAX", meaning: "Room tax and occupancy tax print as separate lines." },
      { label: "TO BE SETTLED TO", meaning: "The card the folio was settled to, with a zero CURRENT BALANCE." },
    ],
    note: "A hotel folio lists every night separately and splits the taxes by type. The Bonvoy number and the settled balance at the bottom are the Marriott-specific parts.",
  },
  hilton: {
    lines: [
      { label: "Room No / Folio No", meaning: "The room and the folio number, plus a confirmation number." },
      { label: "Arrival / Departure", meaning: "Check-in and check-out dates with times." },
      { label: "Adult/Child", meaning: "The guest count for the room." },
      { label: "HH #", meaning: "The masked Hilton Honors member number." },
      { label: "GUEST ROOM lines", meaning: "One line per night at the room rate." },
      { label: "Occupancy taxes", meaning: "State, city and county occupancy taxes on separate lines." },
      { label: "CREDIT CARD DETAIL", meaning: "Approval code, merchant ID and transaction ID for the payment." },
    ],
    note: "Hilton folios split occupancy tax three ways (state, city and county) and close with a credit-card detail block. The Honors line notes that points post within 72 hours of checkout.",
  },
  hyatt: {
    lines: [
      { label: "INVOICE + Folio No.", meaning: "Hyatt's statement is headed INVOICE, with a folio number." },
      { label: "Guest address", meaning: "The guest's name and home address print under the header." },
      { label: "Room / Arrival / Departure", meaning: "Room number and the stay dates." },
      { label: "Confirmation No. / Folio Window", meaning: "The booking confirmation and which folio window the charges sit on." },
      { label: "Accommodation lines", meaning: "One line per night." },
      { label: "Occupancy taxes with rates", meaning: "State and county occupancy taxes, each with its percentage." },
      { label: "World of Hyatt Summary", meaning: "Membership number and qualifying nights at the bottom." },
    ],
    note: "Hyatt prints the tax rate inside each tax line and ends with a World of Hyatt summary. The folio-window number matters when a stay is split between two payers.",
  },
  avis: {
    lines: [
      { label: "RENTAL AGREEMENT NUMBER", meaning: "The agreement number that identifies the rental." },
      { label: "Vehicle", meaning: "Avis car number, plate and description, e.g. GRY TOYOTA CAMRY." },
      { label: "Odometer and fuel", meaning: "Odometer and fuel gauge readings when the car went out and came back." },
      { label: "Pickup / Return", meaning: "Locations and date-times for both ends of the rental." },
      { label: "TIME & MILEAGE", meaning: "The daily rate × days, with the mileage allowance." },
      { label: "Fees", meaning: "Facility, licence recovery, energy recovery and concession fees, each on its own line." },
      { label: "Optional products", meaning: "Loss Damage Waiver and other cover, marked Accepted or Declined." },
    ],
    note: "A car-rental receipt documents the car as much as the charge: odometer readings, fuel levels and the declined or accepted cover. The long list of per-day fees is normal for an airport rental.",
    sources: [
      { title: "Avis: fees and taxes", url: "https://avis.ca/en/customer-service/faqs/canada/fees-taxes" },
    ],
  },
  joann: {
    lines: [
      { label: "REG + Cashier", meaning: "Register number and cashier name." },
      { label: "Item names", meaning: "Fabric and notions print in caps, e.g. GUTERMANN SEW-ALL THREAD 110YD." },
      { label: "Discounts", meaning: "Sale and coupon savings print under the item." },
      { label: "TAX / TOTAL", meaning: "One tax line, then the total." },
      { label: "Bounce-back coupon", meaning: "A Stop back and save! offer with a valid-through date at the bottom." },
    ],
    note: "JOANN receipts are known for the coupon at the bottom, a percentage off one regular-priced item with an expiry date. Fabric prints by the product, with the cut length in the description.",
  },
  "raising-canes": {
    lines: [
      { label: "Check Number", meaning: "The check number for the order." },
      { label: "Fiscal Transaction ID", meaning: "A long date-and-time based transaction ID." },
      { label: "Order Type", meaning: "Drive Thru, Dine In or Carry Out." },
      { label: "Quoted combo names", meaning: "Combos print in quotes, e.g. 'BOX COMBO' or 'CANIAC COMBO'." },
      { label: "Extra sauce", meaning: "An extra Cane's Sauce prints as its own line." },
      { label: "Order-type total", meaning: "The total is named for the order type, e.g. Drive Thru Total." },
      { label: "Customer's Copy", meaning: "A footer with Customer Relations contact details." },
    ],
    note: "Raising Cane's prints its combo names in quotation marks and names the total after the order type. Those two details make the receipt easy to recognise.",
  },
  applebees: {
    lines: [
      { label: "Server + table", meaning: "The server's name and table number, e.g. TB#14." },
      { label: "GUESTS", meaning: "The number of people at the table." },
      { label: "Check #", meaning: "The check number for the table." },
      { label: "Abbreviated items", meaning: "Dishes and drinks print in short caps, e.g. BOURBON ST STEAK." },
      { label: "TAX / Total Due", meaning: "Tax, then Total Due." },
      { label: "Survey Code", meaning: "A talktoapplebees.com survey code, valid for three days." },
    ],
    note: "As a sit-down restaurant, Applebee's prints the table, guest count and server, which matter when a bill is split or tipped. The survey block takes up the bottom third.",
  },
  "red-lobster": {
    lines: [
      { label: "Server / Table / Guests", meaning: "Who served the table, the table number and how many people ate." },
      { label: "Check", meaning: "The check number." },
      { label: "Dishes by name", meaning: "Menu names such as Ultimate Feast or Walt's Favorite Shrimp." },
      { label: "Soups and drinks", meaning: "Each prints as its own line, with the cup or bowl size." },
      { label: "Tax / Total", meaning: "One tax line, then the total before tip." },
    ],
    note: "Red Lobster checks follow the sit-down pattern: server, table and guest count in the header, then the full menu names. My Red Lobster Rewards points are tied to the check, not printed on it.",
    sources: [
      { title: "Red Lobster: My Red Lobster Rewards FAQ", url: "https://www.redlobster.com/rewards/faq" },
    ],
  },
  portillos: {
    lines: [
      { label: "Reg + cashier", meaning: "Register number and cashier name." },
      { label: "Chicago staples", meaning: "Hot Dog, Italian Beef and Chocolate Cake Slice print by name." },
      { label: "Sizes", meaning: "Fries and drinks lead with size, e.g. Large Fries." },
      { label: "AUTH / ENTRY", meaning: "Authorisation code and how the card was read, e.g. CONTACTLESS." },
      { label: "TOTAL", meaning: "The total after one tax line." },
    ],
    note: "Portillo's receipts are simple counter tickets; the menu gives them away. Italian beef and chocolate cake on one slip is about as Chicago as a receipt gets.",
  },
  "noodles-company": {
    lines: [
      { label: "Host + register", meaning: "The host or register name and the team member." },
      { label: "Indented add-ons", meaning: "Proteins and add-ins print indented under the dish they belong to." },
      { label: "After Order Add-On", meaning: "Items added after the order was rung up print under this heading." },
      { label: "TO GO Total", meaning: "The total names the order type." },
      { label: "Signature line", meaning: "VISA with masked digits, then a SIGNATURE line." },
      { label: "Survey code", meaning: "A tellnoodles.com code that earns a reward on the next visit." },
    ],
    note: "The indented add-ons are the Noodles & Company detail: grilled chicken prints under the pad thai it was added to, with its own price.",
  },
  "blue-bottle-coffee": {
    lines: [
      { label: "Cafe name", meaning: "The specific cafe, e.g. Blue Bottle Coffee - Franklin St." },
      { label: "Clean layout", meaning: "A Square-style digital receipt in a sans-serif font." },
      { label: "Drink + milk", meaning: "Alternative milks print as their own line under the drink, e.g. Oat Milk." },
      { label: "Pastries", meaning: "Food such as a Liège waffle prints separately." },
      { label: "Sales Tax / Total", meaning: "One tax line, then the total." },
    ],
    note: "Blue Bottle runs on Square, so receipts are usually emailed or texted. The cafe name in the header matters, because each location prints its own.",
  },
  "pret-a-manger": {
    lines: [
      { label: "POS / Till", meaning: "The till number, e.g. 2 - Till 2, with the team member's name." },
      { label: "TAKE AWAY", meaning: "Eat-in or take-away prints as a line, because in the UK it changes the VAT." },
      { label: "Item names in caps", meaning: "FLAT WHITE, CHICKEN CAESAR BACON BAG and so on." },
      { label: "VAT INCLUDED", meaning: "Prices already include VAT, and the receipt says so." },
      { label: "INCLUSIVE TOTAL DUE", meaning: "Pret's wording for the total." },
    ],
    note: "UK receipts show the VAT inside the price, and Pret's take-away line matters: hot food and drink are taxed whether you eat in or not, but some cold items are taxed only when eaten in.",
  },
  "caffe-nero": {
    lines: [
      { label: "Download our App", meaning: "The app prompt prints above the order." },
      { label: "Shift + CHK", meaning: "A shift line and the check number." },
      { label: "Take Away / Drink In", meaning: "The order type, which sets the VAT." },
      { label: "Drink + Classico + milk", meaning: "Each coffee prints with its blend (Classico) and milk on separate lines." },
      { label: "VAT 20 %", meaning: "The VAT amount at the standard rate." },
      { label: "Check Closed", meaning: "A dashed line marking the check as paid." },
    ],
    note: "Caffè Nero splits each coffee into drink, blend and milk lines, and prints whether it was a take-away. That decides the VAT on food.",
  },
  "winco-foods": {
    lines: [
      { label: "Abbreviated items", meaning: "Produce prints as type, then variety, e.g. LETT,ROMAINE or ROOT,GINGER." },
      { label: "Weights", meaning: "Bulk items carry the weight in the name, e.g. POTATOES,10#." },
      { label: "WINCO house brand", meaning: "Store-brand items start with WINCO." },
      { label: "Debit block", meaning: "US DEBIT, Chip Read, Verified By PIN, AID and approval code." },
      { label: "Oper / Trx / Term / Store", meaning: "Operator, transaction, terminal and store numbers at the end." },
    ],
    note: "WinCo is employee-owned and debit-heavy, so many receipts end with a PIN-verified debit block. The comma-style produce names are the other giveaway.",
  },
  mercadona: {
    lines: [
      { label: "Company + NIF", meaning: "MERCADONA, S.A. with its Spanish tax ID, A-46103834." },
      { label: "FACTURA SIMPLIFICADA", meaning: "The simplified invoice number. In Spain a till receipt is a simplified invoice." },
      { label: "OP", meaning: "The operator number." },
      { label: "Item names in Spanish", meaning: "LECHE ENTERA, BARRA DE PAN and so on, in caps." },
      { label: "IVA 4% / 10% / 21%", meaning: "VAT split by rate: basic food, other food and everything else." },
      { label: "TOTAL (€)", meaning: "The total in euros." },
    ],
    note: "A Mercadona ticket is legally a factura simplificada, which is why it carries the company tax ID and a numbered invoice. The three-rate IVA table at the bottom shows how much tax each kind of product carried.",
    sources: [
      { title: "TaxDown: what a factura simplificada is", url: "https://taxdown.es/informacion-autonomos/factura-simplificada" },
    ],
  },
  kohls: {
    lines: [
      { label: "Store / register / transaction", meaning: "A slash-separated number line, e.g. 0731/0010/4418/6." },
      { label: "ID#", meaning: "A long transaction ID used for returns." },
      { label: "Department names", meaning: "Items print by department, e.g. MENS KNIT TOPS or BATH TOWELS." },
      { label: "Savings", meaning: "Offers such as 15% SPECIAL OFFER print as their own lines, with TOTAL SAVED at the end." },
      { label: "Survey block", meaning: "kohls.com/survey with a store number and access code, valid 48 hours." },
    ],
    note: "Kohl's receipts are about savings: offers, Kohl's Cash and a TOTAL SAVED line. Items print by department rather than product name.",
  },
  "williams-sonoma": {
    lines: [
      { label: "Order confirmation", meaning: "An online receipt that opens with Thanks! Your Order's all set!" },
      { label: "Order number", meaning: "A 12-digit order number." },
      { label: "Shipping To", meaning: "The delivery name, address and phone." },
      { label: "Delivery and Gift Options", meaning: "Shipping method and whether gift wrap was added." },
      { label: "Full product names", meaning: "Brand, product and size, e.g. All-Clad D3 Stainless-Steel Fry Pan, 10\"." },
      { label: "Order Total", meaning: "Tax, then Order Total." },
    ],
    note: "Most Williams Sonoma purchases are confirmed online, so the receipt is an order page with shipping and gift options, not a till slip.",
  },
  rei: {
    lines: [
      { label: "REI Co-op", meaning: "REI is a co-op, and the header says so." },
      { label: "Full product names", meaning: "Brand and model, e.g. HOKA Speedgoat 6 Trail Running Shoes." },
      { label: "Member number", meaning: "Members' purchases are tied to their membership, which tracks the annual member reward." },
      { label: "Tax / Total", meaning: "One tax line, then the total." },
    ],
    note: "The membership link is the REI-specific part: member purchases count toward the annual member reward, and REI can look them up for returns.",
    sources: [
      { title: "REI: membership", url: "https://www.rei.com/membership" },
    ],
  },
  arco: {
    lines: [
      { label: "ampm # + ARCO", meaning: "ARCO stations print the ampm store number in the header." },
      { label: "Site + Pump", meaning: "The site ID and the pump number." },
      { label: "Fuel line", meaning: "The grade and pump, e.g. UNLEADED CR #04, with gallons × price." },
      { label: "Card block", meaning: "Masked card, transaction number, approval code, entry method and mode." },
      { label: "ORIGINAL / CUSTOMER COPY", meaning: "Marks the copy as the customer's." },
    ],
    note: "ARCO pumps are paired with ampm stores, so the receipt carries both names. Fuel prints as one line with the gallons and price per gallon, then the payment details.",
  },
  "spirit-airlines": {
    lines: [
      { label: "Your Itinerary Receipt", meaning: "An emailed receipt, not a paper one." },
      { label: "Confirmation Code", meaning: "The six-character booking code." },
      { label: "Flights", meaning: "Date, flight number such as NK1123, and the departure and arrival times." },
      { label: "Passenger + Free Spirit #", meaning: "The passenger's name and loyalty number." },
      { label: "Taxes and carrier charges", meaning: "Federal excise tax, security fee, segment fee and others, each on its own line." },
      { label: "BAGS / SEATS", meaning: "Bags and seat choices are separate charges, because the fare covers neither." },
      { label: "TOTAL PAID", meaning: "The total charged for the booking." },
    ],
    note: "Spirit sells the fare, bags and seats separately, so its receipt is longer than most airlines': each extra is a line, and the government fees are broken out one by one.",
  },
  bolt: {
    lines: [
      { label: "Invoice no. + Recipient", meaning: "A ride invoice addressed to the rider." },
      { label: "Issued on behalf of", meaning: "Bolt issues the invoice for the driver's company, whose name, address, registration and VAT number print below." },
      { label: "Start / Finish", meaning: "Pickup and drop-off addresses with the start time." },
      { label: "Trip Fee", meaning: "The fare for the ride." },
      { label: "VAT", meaning: "VAT at the local rate on transport." },
      { label: "Total including VAT", meaning: "The total in the local currency." },
    ],
    note: "A Bolt receipt is an invoice from the driver's business, issued by Bolt on their behalf. That is why it carries someone else's VAT number. In the EU this is the document an expense claim needs.",
    sources: [
      { title: "Bolt Support: ride receipts", url: "https://bolt.eu/en-lv/support/articles/360017382159/" },
    ],
  },
  "just-eat": {
    lines: [
      { label: "Order confirmation", meaning: "An email saying the restaurant has received the order." },
      { label: "Order number", meaning: "Just Eat's order number." },
      { label: "Restaurant + address", meaning: "The restaurant that cooked the food, under Just to confirm." },
      { label: "Deliver to", meaning: "The delivery address." },
      { label: "Dishes", meaning: "Each dish with quantity and price." },
      { label: "VAT / Total", meaning: "VAT, then the total including delivery and service charges." },
    ],
    note: "A Just Eat receipt names two businesses: Just Eat and the restaurant that made the food. The restaurant's phone number is printed in case the order is wrong.",
  },
  gopuff: {
    lines: [
      { label: "Order + delivered date", meaning: "Gopuff's order number and the delivery date." },
      { label: "Branded items", meaning: "Products by brand and size, e.g. Tide PODS Original 16ct." },
      { label: "Order fee", meaning: "A delivery fee, waived for FAM members." },
      { label: "Small order fee", meaning: "Added when the basket is under the minimum." },
      { label: "Tax / Tip / Total", meaning: "Tax and tip, then the total." },
    ],
    note: "Gopuff receipts are emailed, and the fees tell the story: order fee, small-order fee and tip sit between the items and the total.",
    sources: [
      { title: "Gopuff FAQ: fees", url: "https://gopuff.com/e/faq" },
    ],
  },
  slack: {
    lines: [
      { label: "Receipt + invoice number", meaning: "A receipt number and the invoice it pays." },
      { label: "Date paid", meaning: "When the card was charged." },
      { label: "Payment method", meaning: "Card brand and last four digits." },
      { label: "Bill to", meaning: "The company's name and billing address." },
      { label: "Billing period", meaning: "The dates the plan covers." },
      { label: "Plan line", meaning: "The plan and seats, e.g. Pro monthly plan." },
      { label: "Workspace URL", meaning: "The Slack workspace the plan belongs to, in the footer." },
    ],
    note: "A Slack receipt is a SaaS billing document: there are no items, only a plan, a billing period and the workspace it covers. The billing period is what an accountant needs.",
    sources: [
      { title: "Slack Help: vendor and remittance details", url: "https://slack.com/help/articles/115005855543-Vendor-and-remittance-details-for-Slack" },
    ],
  },
  notion: {
    lines: [
      { label: "Invoice number", meaning: "Plus a separate sequential invoice number." },
      { label: "WORKSPACE", meaning: "The workspace name and its billing email." },
      { label: "BILLED TO", meaning: "The name and address on the account." },
      { label: "STATUS", meaning: "Paid or open." },
      { label: "Plan recurring charges", meaning: "The plan, seat count and From–To billing dates, e.g. Plus Plan Monthly x 3 members." },
      { label: "Total due", meaning: "Tax and the total." },
    ],
    note: "Notion invoices name the workspace as well as the person billed, and price the plan per member. A team plan shows the seat count on the line.",
    sources: [
      { title: "Notion Help: invoices", url: "https://www.notion.com/en-gb/help/invoices" },
    ],
  },
  canva: {
    lines: [
      { label: "Tax Invoice", meaning: "Canva's heading, because Canva is an Australian company." },
      { label: "Invoice no.", meaning: "The invoice number." },
      { label: "To", meaning: "The account holder's name and email." },
      { label: "Subscription line", meaning: "The plan and term, e.g. Canva Pro (yearly)." },
      { label: "Includes tax", meaning: "Tax is shown as included in the price, not added on." },
      { label: "Total charged", meaning: "The amount charged to the card." },
    ],
    note: "Canva's receipt is headed Tax Invoice and shows tax as included in the price, following its Australian origin. The seller named on it depends on your country.",
    sources: [
      { title: "Canva Help: finding and reading invoices", url: "https://www.canva.com/help/find-read-invoices/" },
    ],
  },
  patreon: {
    lines: [
      { label: "Receipt #", meaning: "Patreon's receipt number." },
      { label: "Provided by", meaning: "Patreon's own name and San Francisco address." },
      { label: "Provided to", meaning: "The patron's name and email." },
      { label: "Creator + tier", meaning: "One line per membership, naming the creator and tier." },
      { label: "Tax", meaning: "Sales tax or VAT as an extra line where it applies." },
      { label: "Total", meaning: "The total charged that billing date." },
    ],
    note: "A Patreon receipt can bundle several creators in one charge, each as a creator-and-tier line. Patreon is the seller of record, so its name and address appear, not the creator's.",
    sources: [
      { title: "Patreon Help: finding your billing history", url: "https://support.patreon.com/hc/en-us/articles/115002958303-Where-do-I-find-my-billing-history" },
    ],
  },
  ups: {
    lines: [
      { label: "The UPS Store #", meaning: "The franchise store number in the header." },
      { label: "Associate + Trans #", meaning: "The associate's name and transaction number." },
      { label: "Service line", meaning: "The shipping service, e.g. UPS Ground." },
      { label: "Packing", meaning: "Boxes and pack-and-ship services as their own lines." },
      { label: "Tracking number", meaning: "Printed with the shipment, starting 1Z." },
      { label: "Card + AUTH", meaning: "Masked card and authorisation code." },
    ],
    note: "A UPS Store receipt is also the shipping record: the tracking number is on it, and boxes and packing are charged apart from postage.",
  },
  cinemark: {
    lines: [
      { label: "Transaction Details", meaning: "An emailed purchase confirmation." },
      { label: "Order + confirmation number", meaning: "The order number and a long confirmation number." },
      { label: "Film + rating", meaning: "The film title and its rating." },
      { label: "Showtime + seats", meaning: "The date, time and reserved seats, e.g. H7, H8." },
      { label: "Ticket type", meaning: "Format and admission, e.g. XD General Admission." },
      { label: "Concessions", meaning: "Pre-ordered popcorn and drinks as their own lines." },
      { label: "Purchase Total", meaning: "The total and when the card was charged." },
    ],
    note: "Cinemark's receipt is a booking confirmation, so the showtime and seats matter as much as the price. Concessions bought with the tickets print on the same receipt.",
    sources: [
      { title: "Cinemark: tickets, purchases and refunds FAQ", url: "https://cinemark.com/faq-tickets-purchases-refunds" },
    ],
  },
  "wendy-s": {
    lines: [
      { label: "Restaurant #", meaning: "The restaurant number, which the survey asks for." },
      { label: "Cashier", meaning: "The name of the crew member who took the order." },
      { label: "DRIVE THRU", meaning: "The order type, printed with the order number such as ORDER 66." },
      { label: "Combo lines", meaning: "A combo prints as one priced line, with its side and drink listed underneath, e.g. Dave's Single Combo." },
      { label: "Size first", meaning: "Fries, drinks and Frostys lead with a size, e.g. Med Chocolate Frosty." },
      { label: "Card + auth", meaning: "The masked card number and authorization code." },
      { label: "Survey + Validation Code", meaning: "A wendyswantstoknow.com survey prompt with a blank line for the validation code." },
    ],
    note: "The Wendy's footer is what people keep the receipt for: the survey asks for the restaurant number, date and time printed above, then gives a validation code to write on the blank line. Combos print as a single price with the side and drink listed under it.",
    sources: [
      { title: "Wendy's customer survey", url: "https://www.wendyswantstoknow.com/" },
    ],
  },
  "tim-hortons": {
    lines: [
      { label: "Store #", meaning: "The store number prints in the header with the street address." },
      { label: "Order # · Take Out", meaning: "The order number and order type on one line." },
      { label: "Cashier", meaning: "The team member's first name." },
      { label: "Size first", meaning: "Coffee leads with a size, e.g. Lg Original Blend." },
      { label: "Coffee order", meaning: "Cream and sugar print under the coffee, e.g. Double Double." },
      { label: "Timbits count", meaning: "Timbits print with how many are in the box, e.g. 20 Timbits." },
      { label: "HST", meaning: "In Ontario the tax line is HST, the combined federal and provincial sales tax, and prices are in Canadian dollars." },
      { label: "Survey code + GUEST COPY", meaning: "A long code for the Tell Tims survey at telltims.ca, then GUEST COPY." },
    ],
    note: "A Tim Hortons receipt is Canadian first: prices in CAD and an HST line instead of a US sales tax. The coffee order is spelled out under each cup, and the survey code at the bottom is what Tell Tims asks for.",
    sources: [
      { title: "Tim Hortons Help: redeeming a Tell Tims survey offer", url: "https://help.timhortons.ca/hc/en-ca/articles/33456675818395-How-do-I-redeem-my-Tell-Tims-Survey-offer" },
    ],
  },
  nordstrom: {
    lines: [
      { label: "STORE REG TRANS", meaning: "Store, register and transaction number on one line under the header." },
      { label: "Salesperson", meaning: "The ID number of the salesperson who rang up the sale." },
      { label: "Item + number", meaning: "Each item prints in caps with the brand first, e.g. ZELLA LIVE IN HIGH WAIST LEGGING, plus a 12-digit item number." },
      { label: "Sales Tax", meaning: "One sales-tax line before the total." },
      { label: "Card block", meaning: "Card brand and masked number, ENTRY (such as CHIP) and AUTH code." },
      { label: "THE NORDY CLUB", meaning: "The masked member number of the Nordy Club loyalty account." },
      { label: "Returns line", meaning: "A note that returns are handled case by case, with a pointer to nordstrom.com." },
    ],
    note: "Nordstrom sells many outside brands, so each line leads with the brand name. Two things are Nordstrom's own: the salesperson ID near the top and the Nordy Club member line after the payment. The return note gives no fixed number of days.",
  },
  "playstation-store": {
    lines: [
      { label: "Thank you for your purchase", meaning: "An emailed confirmation, not a till receipt." },
      { label: "Online ID", meaning: "The PlayStation Network account the content was bought on." },
      { label: "Order Number", meaning: "The order number for the purchase." },
      { label: "Date and Time of Purchase", meaning: "When the order was placed." },
      { label: "Item / Price", meaning: "Games and subscriptions by name, e.g. PlayStation Plus Essential: 12 Month Subscription." },
      { label: "Payment", meaning: "The card brand and last four digits on one line." },
      { label: "Current Wallet Amount", meaning: "The PSN wallet balance left after the purchase." },
      { label: "Right to cancel", meaning: "A notice that cancelling may not apply once a download or stream has started." },
    ],
    note: "A PlayStation Store receipt identifies the buyer by Online ID rather than by name or address, and it reports the wallet balance after the purchase. It is sent on behalf of Sony Interactive Entertainment LLC from a send-only address.",
  },
  "southwest-airlines": {
    lines: [
      { label: "Confirmation #", meaning: "The six-character booking code." },
      { label: "Passenger + Rapid Rewards #", meaning: "The traveler's name and loyalty number." },
      { label: "Ticket #", meaning: "The 13-digit ticket number." },
      { label: "Flight sections", meaning: "One block per flight with date, flight number, Nonstop or connecting, and departure and arrival with airport codes." },
      { label: "Fare", meaning: "The fare type bought for each flight, e.g. Choice." },
      { label: "Base Fare", meaning: "The fare before government charges, under a heading with the confirmation code." },
      { label: "Taxes and fees", meaning: "U.S. Transportation Tax, 9/11 Security Fee, Flight Segment Tax and Passenger Facility Charge, each on its own line." },
      { label: "Fare Rules", meaning: "A note that leftover travel funds can be used by the passenger named on the ticket." },
    ],
    note: "Southwest emails the itinerary and the trip receipt together, so the flights come first and the money second. Each flight shows its own fare type, and the fare rules say any remaining travel funds stay with the named passenger.",
  },
  "h-m": {
    lines: [
      { label: "Store number", meaning: "The store number prints in the header with the address." },
      { label: "Till + cashier", meaning: "The till number and the cashier's first name." },
      { label: "Article / Price", meaning: "H&M heads the item column Article." },
      { label: "Article lines", meaning: "Each item prints with fit, color and size, e.g. Regular Fit T-shirt Black M, plus a 10-digit article number." },
      { label: "Member discount", meaning: "The H&M Member welcome discount is noted in the footer." },
      { label: "Sales Tax", meaning: "One sales-tax line before the total." },
      { label: "Card + auth", meaning: "The masked card number and authorization code." },
      { label: "Return terms", meaning: "Returns within 30 days with the receipt and tags attached; in-store returns are free." },
    ],
    note: "H&M calls its items articles, and each one prints with its color and size in the name, and carries a 10-digit article number. The return terms ask for the tags to still be attached, not just the receipt.",
    sources: [
      { title: "H&M customer service: returns", url: "https://www2.hm.com/en_us/customer-service/return-link.html" },
    ],
  },
  "jimmy-john-s": {
    lines: [
      { label: "Store #", meaning: "The store number." },
      { label: "Order Type", meaning: "Pickup or delivery." },
      { label: "Name", meaning: "The name the order was placed under, in caps." },
      { label: "ORDER number", meaning: "The order number called out at the counter." },
      { label: "Numbered sandwiches", meaning: "Sandwiches print by menu number and length, e.g. #9 Italian Night Club 8\"." },
      { label: "Changes", meaning: "Edits such as No Onion or Add Hot Peppers print under the sandwich." },
      { label: "Sides", meaning: "Jimmy Chips, pickles and drinks print as their own priced lines." },
      { label: "Card + Auth", meaning: "The card brand, masked number and authorization code." },
    ],
    note: "Jimmy John's sandwiches print by their menu number, so a #4 or #9 on the line is the sandwich itself, followed by its length and any changes. The footer points to Freaky Fast Rewards in the app.",
  },
  "white-castle": {
    lines: [
      { label: "GUEST SATISFACTION SURVEY", meaning: "A survey block at the top offering two free sliders for completing it at survey.whitecastle.com." },
      { label: "White Castle # + Sale #", meaning: "The restaurant number and the sale number the survey asks for." },
      { label: "Enter Validation Code Here", meaning: "A blank line for the code, with coupon terms: it expires three weeks after the receipt date." },
      { label: "Team Member #", meaning: "The number of the team member who took the order." },
      { label: "*** To Go *** + Register #", meaning: "The order type and register number." },
      { label: "Short item codes", meaning: "Items print as abbreviated codes, e.g. ORIG SLIDER, with the quantity in a column." },
      { label: "Grand Total", meaning: "Tax, then a Grand Total, with no separate subtotal line." },
      { label: "Customer #", meaning: "The order number called at pickup." },
    ],
    note: "White Castle puts the survey before the food: the free-slider offer, the restaurant and sale numbers and a blank for the validation code take up the top half of the slip, with a line saying the survey is available in Spanish. The order follows in short codes below.",
  },
  "church-s-chicken": {
    lines: [
      { label: "Restaurant #", meaning: "The restaurant number under the Church's Texas Chicken header." },
      { label: "Check + Drive-Thru", meaning: "The check number and order type." },
      { label: "Combo lines", meaning: "A combo prints as one priced line, e.g. Combo 2PC Spicy Mix, with each piece, the Honey-Butter Biscuit, side and drink listed under it." },
      { label: "Upgrades", meaning: "A side swap such as Baked Mac & Cheese adds a small priced line under the combo." },
      { label: "Sales Tax", meaning: "One sales-tax line before the total." },
      { label: "Visa Tendered", meaning: "The tender line naming how the order was paid." },
      { label: "Card block", meaning: "Card Type, masked Card Number, Authorization, Entry Mode, Application Label and AID." },
    ],
    note: "Church's combos spell out every piece of chicken, dark or white, along with the biscuit, side and drink, so the line under one combo can run five rows deep. The card details print as a labelled list rather than a single line.",
  },
  "h-e-b": {
    lines: [
      { label: "H-E-B # + Lane", meaning: "The store number in the header and the checkout lane under it." },
      { label: "Item names", meaning: "Short names in caps, with HEB marking the house brand, e.g. HEB WHOLE MILK GAL." },
      { label: "Weighed items", meaning: "Produce and meat print with the weight in pounds and the price per pound, e.g. BANANAS." },
      { label: "Untaxed groceries", meaning: "Food lines carry no tax; household items such as paper towels do." },
      { label: "Item discount", meaning: "A sale price prints as a discount under the item it applies to." },
      { label: "SALES TAX / TOTAL", meaning: "One sales-tax line, then the total." },
      { label: "YOU SAVED", meaning: "The total of the discounts on the order." },
      { label: "AUTH + ENTRY", meaning: "The authorization code and how the card was presented, e.g. CONTACTLESS." },
    ],
    note: "An H-E-B receipt mixes taxed and untaxed lines, because Texas does not tax most groceries, and weighed produce and meat print with their pounds and price per pound. The footer gives a 90-day return window with the receipt.",
    sources: [
      { title: "H-E-B refund policy", url: "https://images.heb.com/is/content/HEBGrocery/PDF/heb-refund-policy.pdf" },
    ],
  },
  "banana-republic": {
    lines: [
      { label: "Barcode at the top", meaning: "A barcode prints above the transaction details, not at the bottom." },
      { label: "Trans. / Store / Reg.", meaning: "Transaction, store and register numbers, each on its own line." },
      { label: "Valid No. + Cashier", meaning: "A validation number and the cashier's ID number." },
      { label: "Style number", meaning: "Each item prints by name with a style number and a four-digit code, e.g. 791034 0002." },
      { label: "Item Discount", meaning: "A percentage markdown prints under each item it applies to." },
      { label: "T flag", meaning: "A T after the price marks the item as taxable." },
      { label: "T1 Tax", meaning: "The tax line names the rate code and percentage, e.g. T1 (8.625%) Tax." },
      { label: "Total Discount / You Saved", meaning: "The sum of the markdowns on the order." },
    ],
    note: "Banana Republic prints its barcode at the top and lists a percentage discount under each item, so a sale receipt shows the original price and the markdown line by line. The card block ends with the Application Label and AID from the terminal.",
  },
  adidas: {
    lines: [
      { label: "Store number + name", meaning: "The store's number and name in the header, e.g. 0417 - Chicago Michigan Ave." },
      { label: "Sales Receipt", meaning: "The heading above the items." },
      { label: "Item / Selling Price", meaning: "The column headings for the item list." },
      { label: "Article number first", meaning: "Each line leads with the six-character article code, e.g. B75806." },
      { label: "Name, color, size", meaning: "The product name followed by a color code and size, e.g. Samba OG M FTWWHT ,10." },
      { label: "Total tax", meaning: "One tax line before the total." },
      { label: "Card block", meaning: "Pref. name (such as VISA CREDIT), Auth. code and the masked card." },
      { label: "ORIGINAL + REFUND POLICY", meaning: "Marks the receipt as the original, and gives a 30-day return window with a link to adidas.com/storereturns." },
    ],
    note: "An adidas receipt leads every line with the six-character article code, then the product name with a color code and size, so the exact colorway and size bought are on the slip. The footer marks it ORIGINAL above a 30-day refund policy.",
  },
  "academy-sports": {
    lines: [
      { label: "Store name + phone", meaning: "The store's name in caps with its phone number, e.g. ACADEMY KATY FREEWAY." },
      { label: "SALE line", meaning: "A row of reference numbers with the word SALE." },
      { label: "Item + SKU", meaning: "Each description is followed by a slash and the SKU, e.g. MAGELLAN 30 OZ TUMBLER / 110230018." },
      { label: "MARKDOWN", meaning: "A price reduction prints under the item it applies to." },
      { label: "8.25% SALES TAX", meaning: "The tax line carries the rate in its label." },
      { label: "ITEM COUNT", meaning: "The number of items in the basket." },
      { label: "TOTAL USD$", meaning: "Academy's label for the total." },
      { label: "Card block", meaning: "MID, TID, RRN, PIN or chip verification, sequence, AUTH, mode and AID from the terminal." },
    ],
    note: "Academy prints one of the longer card blocks of any retailer, with merchant, terminal and reference numbers listed out. The footer invites feedback within 72 hours at academyfeedback.com.",
    sources: [
      { title: "Academy Sports + Outdoors customer survey", url: "https://www.academyfeedback.com/Survey.aspx?c=592316" },
    ],
  },
  "tiffany-co": {
    lines: [
      { label: "TIFFANY & CO. + store", meaning: "The store prints by location in caps, e.g. SHORT HILLS." },
      { label: "Sales Professional", meaning: "The name of the person who made the sale." },
      { label: "STORE / REG / TRAN", meaning: "Store, register and transaction numbers on one line." },
      { label: "Item lines", meaning: "Abbreviated descriptions with the metal, e.g. SS for sterling silver or 18K RG for rose gold, and a long item number." },
      { label: "Size", meaning: "Bracelets and rings print their size under the item, e.g. SIZE MEDIUM." },
      { label: "Tax line", meaning: "The tax prints with a jurisdiction code and the rate instead of the word Tax." },
      { label: "VISA CHARGE", meaning: "The card type, masked account number and AUTH code." },
      { label: "CUSTOMER COPY", meaning: "Followed by a note that the terms and conditions of sale are on the reverse." },
    ],
    note: "A Tiffany & Co. receipt is a plain thermal slip despite the price of what is on it. Each line spells out the metal in abbreviations next to a long item number, sizes print under the piece, and the terms of sale are on the back.",
    sources: [
      { title: "Tiffany & Co. return policy", url: "https://www.tiffany.com/policy/return-policy/" },
    ],
  },
  "kay-jewelers": {
    lines: [
      { label: "Store # + mall", meaning: "The store number and the mall it is in." },
      { label: "Sales Associate + Reg", meaning: "The associate's name and register number." },
      { label: "Item number first", meaning: "Each line leads with the item number, then the description." },
      { label: "Carat and metal", meaning: "Jewelry prints with total carat weight and metal, e.g. 1/4 ct tw Diamond Hoop Earrings 10K Yellow Gold." },
      { label: "Lifetime Protection Plan", meaning: "The protection plan prints as its own priced line." },
      { label: "Gift box", meaning: "Packaging prints as a line at no charge." },
      { label: "Card + auth", meaning: "The masked card number and authorization code." },
      { label: "Signature line", meaning: "A line for the customer's signature at the bottom." },
    ],
    note: "A Kay receipt doubles as the service record: the footer asks you to bring it with the jewelry for Lifetime Protection Plan service, and notes that the diamond guarantee needs an inspection at a Kay store every six months.",
    sources: [
      { title: "Kay: Lifetime Protection Plan", url: "https://www.kay.com/lifetime-protection-plan" },
      { title: "Kay: jewelry and engagement ring warranty", url: "https://www.kay.com/warranty-for-jewelry-engagement-rings" },
    ],
  },
  jetblue: {
    lines: [
      { label: "This is not your boarding pass", meaning: "The trip receipt is an email, and it says so at the top." },
      { label: "Confirmation code", meaning: "The six-letter booking code." },
      { label: "Date of request", meaning: "When the receipt was requested or issued." },
      { label: "Flight sections", meaning: "One block per flight with the B6 flight number, route with airport codes, times, fare (e.g. Blue) and seat." },
      { label: "Traveler", meaning: "The name as SURNAME/FIRST, the ticket number and the masked TrueBlue number." },
      { label: "YOUR PAYMENT", meaning: "Fare, extras such as an Even More Space seat, and each tax or fee on its own line." },
      { label: "Total paid + Form of payment", meaning: "The total and the card it was charged to." },
    ],
    note: "JetBlue's receipt lists extras bought with the booking, such as an Even More Space seat, as their own lines next to the fare. Flights are numbered with JetBlue's B6 code, and the footer states that the total covers fare, taxes, fees and extras.",
    sources: [
      { title: "JetBlue Help: receipts and itineraries", url: "https://www.jetblue.com/help/receipts-and-itineraries" },
    ],
  },
  "ritz-carlton": {
    lines: [
      { label: "GUEST FOLIO", meaning: "The checkout statement is a folio, not a till receipt." },
      { label: "ROOM / NAME / RATE", meaning: "Room number, the guest as SURNAME/INITIAL, and the nightly rate." },
      { label: "ARRIVE / DEPART", meaning: "Check-in and check-out dates." },
      { label: "FOLIO", meaning: "The folio number for the stay." },
      { label: "MARRIOTT BONVOY #", meaning: "The masked member number; The Ritz-Carlton is part of Marriott Bonvoy." },
      { label: "DESCRIPTION / CHARGES", meaning: "Room nights, then charges such as in-room dining and valet parking." },
      { label: "ROOM TAX", meaning: "Tax on the room charge." },
      { label: "BALANCE", meaning: "The card the folio was settled to, then a balance of .00." },
    ],
    note: "A Ritz-Carlton folio follows the Marriott layout, since the hotels share Marriott Bonvoy, but the charges reflect a full-service stay: in-room dining and valet parking post next to the room nights. The footer states that the statement is the only receipt.",
  },
  alamo: {
    lines: [
      { label: "Alamo Rental Receipt", meaning: "An emailed receipt sent after the car is returned." },
      { label: "Rental Agreement #", meaning: "The agreement number that identifies the rental." },
      { label: "PICK-UP / RETURN", meaning: "The location, date and time at each end of the rental." },
      { label: "Vehicle", meaning: "The car class, odometer readings out and in, and fuel level." },
      { label: "RENTAL RATE", meaning: "TIME & DISTANCE as days × daily rate, plus a line confirming unlimited mileage." },
      { label: "TAXES AND FEES", meaning: "Each fee with its basis, e.g. Concession Recovery Fee as a percentage and Customer Facility Charge per day." },
      { label: "Local taxes", meaning: "State or county taxes on separate lines, which differ by rental location." },
      { label: "Charged to + Amount Due", meaning: "The card charged and a balance of 0.00." },
    ],
    note: "Alamo splits its receipt into two headings, RENTAL RATE and TAXES AND FEES, and prints the rate or per-day amount inside each fee's name. The footer notes that charges are subject to audit.",
    sources: [
      { title: "Alamo: taxes, surcharges and fees", url: "https://www.alamo.com/en_US/car-rental-faqs/taxes-surcharges-fees.html" },
      { title: "Alamo: understanding your rental agreement", url: "https://tour.alamo.com/en_US/car-rental/travel-tools/rental-agreement.html" },
    ],
  },
  sixt: {
    lines: [
      { label: "Doc. no.", meaning: "The invoice number, issued by Sixt Rent a Car, LLC." },
      { label: "Pick-up / Return", meaning: "Date, time and branch for each end of the rental." },
      { label: "Customer no. / Debtor ID", meaning: "Sixt's account numbers for the renter." },
      { label: "Driver's name + Vehicle category", meaning: "The driver and a four-letter vehicle class code, e.g. IFAR." },
      { label: "Res. no. / RA no.", meaning: "The reservation number and the rental agreement number." },
      { label: "Tax codes", meaning: "Each charge carries a code such as A0, A1 or A3 that says which taxes apply to it." },
      { label: "Total net / Total gross amount", meaning: "The total before and after tax, with the taxes listed by code in between." },
      { label: "Outstanding amount", meaning: "What is still owed, normally 0.00." },
    ],
    note: "Sixt issues a formal invoice rather than a slip, and a final one only after the car is returned. Each charge is tagged with a tax code, so you can see which fees carry rental-car tax and which carry none. The rental agreement number is the reference to quote.",
    sources: [
      { title: "Sixt Help Center: invoices and receipts", url: "https://www.sixt.com/help-center/sections/invoices-and-receipts/" },
      { title: "Sixt Help Center: reading your rental agreement", url: "https://www.sixt.com/help-center/articles/how-do-i-read-my-sixt-rental-agreement/" },
    ],
  },
  roblox: {
    lines: [
      { label: "Receipt from Roblox", meaning: "An emailed receipt, not a store slip." },
      { label: "Receipt #", meaning: "The receipt number in groups of four digits." },
      { label: "DATE PAID", meaning: "When the card was charged." },
      { label: "SUMMARY", meaning: "What was bought, usually a Robux bundle, e.g. 1,000 Robux." },
      { label: "Sales tax", meaning: "Tax with the state named and the rate shown, where it applies." },
      { label: "Amount paid", meaning: "The total charged." },
      { label: "PAYMENT METHOD", meaning: "Card brand and last four digits." },
    ],
    note: "What Roblox charges a card for is usually a Robux bundle, so the receipt often has a single line. The email notes that Roblox uses Stripe for invoicing and payment processing, and the tax line names the buyer's state.",
  },
  gnc: {
    lines: [
      { label: "GNC # + store", meaning: "The store number and location in the header." },
      { label: "Assoc + Reg", meaning: "The associate's number and the register." },
      { label: "Item names", meaning: "Abbreviated in caps with the size or count, e.g. GNC MEGA MEN 90CT." },
      { label: "PRO ACCESS Price", meaning: "The member discount prints under each item it applies to." },
      { label: "Sales Tax", meaning: "Printed with its rate." },
      { label: "You Saved", meaning: "The total of the member discounts." },
      { label: "ACCT + AUTH", meaning: "The masked card number and authorization code." },
      { label: "myGNC Rewards", meaning: "The masked member number and membership status." },
    ],
    note: "A GNC receipt shows the member price item by item, with a PRO ACCESS line under each discounted product and a myGNC Rewards block after the payment. Supplements print with their count or serving size in the name.",
    sources: [
      { title: "GNC: myGNC Rewards terms and conditions", url: "https://www.gnc.com/my-rewards/terms-conditions.html" },
    ],
  },
  "quest-diagnostics": {
    lines: [
      { label: "Payment confirmation", meaning: "Issued by Quest's patient billing when a lab bill is paid online, not at the lab." },
      { label: "Invoice Number", meaning: "The number from the bill being paid." },
      { label: "Lab Code + Patient ID", meaning: "The lab that ran the tests and the patient's account ID." },
      { label: "Date of Service", meaning: "The day the sample was taken, often weeks before the payment." },
      { label: "Ordering Physician", meaning: "The doctor who ordered the tests." },
      { label: "Test lines", meaning: "Each test leads with its five-digit procedure code, e.g. 80061 Lipid Panel." },
      { label: "Insurance Payment / Contractual Adjustment", meaning: "Negative lines for what insurance paid and the discount it negotiated." },
      { label: "Amount Paid + Confirmation #", meaning: "What the patient paid and the confirmation number for it." },
    ],
    note: "Quest bills after the visit, so this is a confirmation of paying an invoice rather than a point-of-sale receipt. The insurance payment and contractual adjustment lines explain why the amount paid is lower than the total charges.",
  },
  "regal-cinemas": {
    lines: [
      { label: "Theater name", meaning: "The header names the theater, e.g. Brandermill Crossing 12, rather than Regal." },
      { label: "SALES RECEIPT", meaning: "The heading above the items." },
      { label: "Concession lines", meaning: "Food and drinks with size, e.g. FTN - Large Coca-Cola for a fountain drink." },
      { label: "Ticket lines", meaning: "Admission type and film, e.g. Adult with the title, and the number of tickets." },
      { label: "Trans # / Cashier / Register", meaning: "Printed after the payment, not at the top." },
      { label: "Not valid for admission", meaning: "A boxed line saying the receipt is not a ticket." },
      { label: "Survey Access Code", meaning: "A code for the talktoregal.com survey, valid for 7 days." },
      { label: "Credit Claim Code", meaning: "A code to claim Regal Crown Club credits in the app within 7 days." },
    ],
    note: "A Regal receipt carries two codes after the payment: a survey access code and a Crown Club credit claim code, each valid for seven days. A boxed line above them states that the receipt is not valid for admission.",
  },
  "panda-express": {
    lines: [
      { label: "Store number", meaning: "The restaurant's number prints with the name, e.g. Panda Express #1342." },
      { label: "TO GO + order number", meaning: "Whether the order was for here or to go, and the order number called at the counter." },
      { label: "Cashier", meaning: "The first name of the person who rang up the order." },
      { label: "Plate / Bowl", meaning: "The meal size prints as the item, with the chosen entrees and side listed underneath it." },
      { label: "Tax / Total", meaning: "Tax at the local rate, then the total." },
      { label: "Survey Code", meaning: "A long code for the PandaGuestExperience.com survey at the bottom." },
    ],
    note: "On a Panda Express receipt the price belongs to the meal size, not to each dish: a Plate or Bowl is one line, and the entrees and side picked for it print beneath it without their own prices. Anything ordered on its own, like rangoons or a drink, gets a separate priced line.",
    sources: [
      { title: "Panda Express guest survey", url: "https://www.pandaguestexperience.com/" },
    ],
  },
  "longhorn-steakhouse": {
    lines: [
      { label: "LongHorn + store number", meaning: "The restaurant prints as LongHorn followed by its four-digit store number." },
      { label: "Check #", meaning: "The check number for the table." },
      { label: "Table + server", meaning: "The table number and the server's name on their own lines." },
      { label: "Gst", meaning: "The number of guests at the table." },
      { label: "Guest No. headings", meaning: "Items are grouped under Guest No.1, Guest No.2 and so on, by who ordered them." },
      { label: "Sales Tax / Total", meaning: "Sales tax on the food and drink, then the total." },
      { label: "Card block", meaning: "Card type, masked number and an Auth code from the payment." },
    ],
    note: "A LongHorn check groups the order by seat, so each guest's steak, sides and drinks sit under their own Guest No. heading. That makes it easy to see who had what when the bill is split or one person's meal is claimed as an expense.",
  },
  "j-crew": {
    lines: [
      { label: "Store number", meaning: "The store's number prints in the address line, e.g. Store 0417." },
      { label: "Associate + register", meaning: "The sales associate's name and the register number." },
      { label: "SKU first", meaning: "Each item starts with its five-character style code, e.g. BV481, before the name." },
      { label: "Color + size", meaning: "The item name carries the color and size, e.g. WHITE M or KHAKI 32x32." },
      { label: "Sales Tax", meaning: "Tax applies only to the items that are taxable where the store is." },
      { label: "Card + barcode", meaning: "The masked card number with its authorization, then a barcode for returns." },
      { label: "Return line", meaning: "Store purchases can be returned to any J.Crew store with proof of purchase." },
    ],
    note: "J.Crew prints the style code ahead of each item and spells out color and size, which is what a return or exchange is matched against. In New York, clothing under $110 an item is exempt from sales tax, so on the template only the $148 sweater is taxed.",
    sources: [
      { title: "J.Crew returns", url: "https://www.jcrew.com/footie/returns.jsp" },
      { title: "New York State: clothing and footwear exemption", url: "https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/clothing_and_footwear.htm" },
    ],
  },
  "holiday-inn": {
    lines: [
      { label: "GUEST FOLIO", meaning: "A hotel folio rather than a till receipt, with the hotel's name and address at the top." },
      { label: "Room No / Folio No", meaning: "The room number, the folio number and the confirmation number of the booking." },
      { label: "Arrival / Departure", meaning: "Check-in and check-out dates, with the adult and child count." },
      { label: "Rate", meaning: "The nightly room rate." },
      { label: "IHG One Rewards #", meaning: "The masked loyalty number, when the guest is a member." },
      { label: "GUEST ROOM lines", meaning: "One charge per night at the room rate, with any per-night hotel fee on its own line." },
      { label: "Tax lines", meaning: "State/local sales tax and a city hotel/motel tax, each on a separate line." },
      { label: "BALANCE 0.00", meaning: "Shows the folio is settled at checkout." },
    ],
    note: "A Holiday Inn folio charges each night separately and splits the taxes by authority, which is what travel and expense teams check. Georgia adds a flat hotel fee per night, so the Atlanta template carries a GA HOTEL FEE line next to the room charges.",
  },
  careem: {
    lines: [
      { label: "Emailed receipt", meaning: "The receipt arrives by email after the trip, addressed to the rider by name." },
      { label: "Ride fare", meaning: "The fare for the trip itself." },
      { label: "Salik (toll)", meaning: "Dubai road tolls passed through on the trip, on their own line." },
      { label: "Booking fee", meaning: "The fee Careem adds for the booking, on its own line." },
      { label: "VAT included", meaning: "UAE VAT at 5% is included in the total and shown on its own line." },
      { label: "Total in AED", meaning: "The total in dirhams, with the card used." },
      { label: "Trip details", meaning: "Captain's name, car type, distance and time, and the pickup and drop-off points with times." },
    ],
    note: "A Careem receipt reads like an email, not a till slip. It breaks the price into fare, Salik tolls and the booking fee, states the VAT already included, and ends with the captain, route and times: the details an expense claim for a ride usually asks for.",
    sources: [
      { title: "Careem Help: getting a trip receipt", url: "https://help.careem.com/hc/en-us/articles/360001592268-How-can-I-get-my-trip-receipt" },
    ],
  },
};
