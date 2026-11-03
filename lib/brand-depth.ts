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
    note: "A Walmart receipt is a long monospaced thermal slip. What sets it apart is the UPC printed after every item and the TC# near the bottom, plus a survey line with an ID # at the top. The template keeps that order, so a reimbursement reviewer sees the layout they expect.",
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
    sources: [
      { title: "Hunker: how to read a Home Depot receipt", url: "https://www.hunker.com/13414941/how-to-read-my-home-depot-receipt" },
    ],
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
};
