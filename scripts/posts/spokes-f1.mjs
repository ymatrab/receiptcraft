/** Cluster F (How-To) spokes 1/5: F2–F4. Conversion cluster — every post deep-links its template. */

export const SPOKES_F1 = [
  {
    slug: "how-to-make-a-restaurant-receipt",
    category: "how-to",
    publishedAt: "2026-07-12T14:00:00Z",
    title: "How to Make a Restaurant Receipt (Tax + Tip Done Right)",
    seoTitle: "How to Make a Restaurant Receipt (Tax + Tip Done Right)",
    seoDescription:
      "Make a realistic restaurant receipt in 7 steps: header, server and table line, itemized dishes, subtotal, tax, tip line and payment block. Free template included.",
    excerpt:
      "Server line, itemized dishes, tax before tip, a proper payment block — the 7 steps to a restaurant receipt that looks and adds up exactly like the real thing.",
    body: `To make a restaurant receipt: add the restaurant's header, a check/server/table line, each dish and drink as its own priced line, the subtotal, sales tax calculated on the subtotal, a tip line (blank or filled), and the payment block with method and total. The format is standardized enough that getting the order and math right is most of the realism — and the [restaurant receipt template](/templates/restaurant) has it prebuilt.

Legitimate uses first: restaurants issuing or reissuing checks, replacing a faded original of a real meal for expense records, prop and design work, and testing receipt-scanning software. Fabricating a meal that never happened for reimbursement is expense fraud — the line drawn in [is it legal to make your own receipt](/blog/is-it-legal-to-make-your-own-receipt).

## The 7 steps

1. **Header:** restaurant name, address, phone. Real checks often add the location or store number.
2. **Check metadata:** date and time, server name or number, table number, guest count — "SERVER: MARIA — TBL 12 — GUESTS: 2." This line is what makes it read as a restaurant check rather than a shop receipt.
3. **Items:** one line per dish or drink with its price; modifiers (add avocado) indented with their upcharges. Quantities collapse ("2 HOUSE IPA 16.00").
4. **Subtotal** — food and drink before anything else.
5. **Tax:** your locality's rate applied to the subtotal, shown as its own line. Some cities stack rates (state + county + hospitality); one combined line is standard on checks.
6. **Tip line:** dine-in card checks print TIP: ____ and TOTAL: ____ for handwriting; a completed receipt shows the tip amount and grand total. Counter-service receipts often skip it.
7. **Payment block:** method, card brand and last four for cards, amount tendered and change for cash, and a check or receipt number ([numbering logic](/blog/what-is-a-receipt-number)).

## The math that must reconcile

Items sum to the subtotal; tax = subtotal × rate (rounded per line convention); total = subtotal + tax + tip. The single most common realism error is tipping before tax or taxing the tip — tips are not taxable sales. If you're reconstructing a real meal from a card statement, remember the statement total includes the tip you wrote: back it out before rebuilding lines ([statement-to-receipt logic](/blog/bank-statement-as-proof-of-purchase)).

## Details that sell the format

ALL-CAPS items in a monospaced look, abbreviated dish names (CHKN CAES SAL), the "customer copy" footer, a gratuity-suggestion block, and the merchant/customer copy distinction for card payments ([why two slips exist](/blog/credit-card-receipt-explained)). For expense submissions, what matters instead is completeness: itemization is what separates the check from the card slip — the requirement explained in [the business-meal receipt rules](/blog/meal-receipts-business-expenses).

## Make one now

Open the [restaurant template](/templates/restaurant) at [/create](/create), fill the header, add items, set your tax rate — subtotal, tax and totals calculate themselves, and the PDF prints in thermal-strip format. Under a minute for a complete, arithmetic-perfect check.

## The bottom line

Header, metadata, items, subtotal, tax, tip, payment — in that order, with tax on food only and totals that add. The template does the arithmetic; you supply the true facts of a real transaction.`,
    faqs: [
      {
        q: "What does a restaurant receipt include?",
        a: "The restaurant's details, date/time, server and table, each item priced, subtotal, sales tax, a tip line, and the payment block with method and total — plus a check number tying it to the POS.",
      },
      {
        q: "Is tax calculated before or after the tip?",
        a: "Before. Sales tax applies to the food and drink subtotal; the tip is added after tax and isn't taxed. Total = subtotal + tax + tip — receipts that tax the tip are miscalculated.",
      },
      {
        q: "Why do card payments at restaurants produce two slips?",
        a: "The merchant copy (with tip and signature lines) is the restaurant's record of the authorized amount; the customer copy is yours. The itemized check is a third document — the one expense reports want.",
      },
      {
        q: "Can I recreate a restaurant receipt for an expense report?",
        a: "No — submit originals or your policy's declared substitutes (statement plus note, or a missing-receipt affidavit). Recreations are for your own records of real meals, props and design work.",
      },
    ],
  },

  {
    slug: "how-to-make-a-gas-receipt",
    category: "how-to",
    publishedAt: "2026-07-13T14:00:00Z",
    title: "How to Make a Gas Station Receipt (Gallons, Grade, Pump)",
    seoTitle: "How to Make a Gas Station Receipt (Gallons, Grade, Pump)",
    seoDescription:
      "A gas receipt needs station details, pump number, fuel grade, gallons to 3 decimals, price per gallon and total. The 6-step build, with the math that must agree.",
    excerpt:
      "Gallons to three decimals, price per gallon, grade, pump number — the fields that make a fuel receipt read true, and the one multiplication everything hangs on.",
    body: `To make a gas station receipt: station header, date and time, pump number, fuel grade, gallons dispensed (to three decimals — pumps meter that precisely), price per gallon, and the total, plus the payment block. One multiplication rules the document: gallons × price per gallon = fuel total, to the cent. The [gas station template](/templates/gas-station) carries all of it prebuilt.

Legitimate uses: stations reissuing records, drivers reconstructing a real fill-up for their own files after the pump printer failed ([the recovery-first playbook](/blog/gas-station-receipt-copy)), fleet documentation, props and testing. What you submit for reimbursement must be genuine or a declared substitute — never a reconstruction presented as an original.

## The 6 steps

1. **Header:** station brand and street address; real receipts add store/site numbers and often the phone.
2. **Timestamp:** date and time — pay-at-pump receipts are timestamped to the minute.
3. **Pump and product:** "PUMP 04", then the grade — REGULAR / UNLEADED 87, MIDGRADE 89, PREMIUM 91/93, or DIESEL.
4. **The metered lines:** GALLONS: 11.482, PRICE/GAL: $3.499, FUEL TOTAL: $40.17. Three decimals on gallons, three on price (the /10 cent convention), two on money.
5. **Extras if any:** car wash, in-store items — separate lines, taxed per local rules (motor fuel itself carries excise tax inside the pump price, not a sales-tax line).
6. **Payment block:** method, last four for cards, auth code on pay-at-pump slips ([what those codes mean](/blog/credit-card-receipt-explained)).

## The realism details

Fuel receipts rarely show a sales-tax line — road taxes live inside the per-gallon price; a receipt adding 8% sales tax to fuel reads wrong immediately. Gallons with only one decimal, prices in round numbers, and pump totals that don't equal the multiplication are the other tells. Real slips are terse: no marketing footer beyond a loyalty pitch, printed narrow on 58mm paper ([why they look like that](/blog/thermal-receipt-printers-guide)).

## For expenses and taxes

Reimbursement policies want the itemized fuel detail — gallons and price — rather than the card slip ([what statements can't show](/blog/bank-statement-as-proof-of-purchase)); mileage-rate deductions want the log, not fuel receipts at all ([the mileage rules](/blog/mileage-log-receipts)). Fleet drivers: your fuel card already captured everything centrally.

## Make one now

The [gas station template](/templates/gas-station) at [/create](/create) formats pump metadata, three-decimal metering and payment block automatically — enter grade, gallons and price, and the arithmetic locks itself consistent.

## The bottom line

Pump, grade, gallons × price = total — with no sales-tax line and timestamps to the minute. Reconstruct only real fills, from your statement and the day's posted price, for your own records.`,
    faqs: [
      {
        q: "What information is on a gas station receipt?",
        a: "Station name and address, date and time, pump number, fuel grade, gallons to three decimals, price per gallon, fuel total and the payment details — with road taxes embedded in the per-gallon price rather than listed separately.",
      },
      {
        q: "Why do gas receipts show gallons to three decimals?",
        a: "Pumps meter fuel in thousandths of a gallon, and the receipt reports the metered figure. Gallons × price per gallon must equal the total to the cent — the arithmetic auditors and expense systems check first.",
      },
      {
        q: "Is there sales tax on a gas receipt?",
        a: "Usually no separate line — federal and state motor-fuel excise taxes are built into the posted per-gallon price. Convenience-store items on the same receipt do get sales tax lines.",
      },
      {
        q: "Do I need fuel receipts for taxes?",
        a: "Only under the actual-expense vehicle method. The standard mileage rate needs a mileage log instead — fuel receipts add nothing to it. Reimbursement policies, though, often want the itemized fuel receipt.",
      },
    ],
  },

  {
    slug: "how-to-make-a-taxi-receipt",
    category: "how-to",
    publishedAt: "2026-07-14T14:00:00Z",
    title: "How to Make a Taxi or Rideshare Receipt",
    seoTitle: "How to Make a Taxi or Rideshare Receipt (Fare Breakdown)",
    seoDescription:
      "Taxi receipts need cab and driver IDs, the fare meter breakdown, distance and time; rideshare receipts add route and surge. Both formats, step by step.",
    excerpt:
      "Two formats, one job: cab receipts run on meter drops and medallion numbers, rideshare receipts on routes and surge multipliers. Building both, with the fare math that checks out.",
    body: `A taxi receipt needs the cab company details, cab or medallion number, driver ID, date and time, distance, and the metered fare breakdown — base drop, per-mile/per-minute charges, surcharges, tolls, tip, total. A rideshare-style receipt swaps meter fields for pickup and drop-off points, fare components (base + distance + time), any surge multiplier, and the platform's fees. The [taxi receipt template](/templates/taxi) covers the classic format ready to fill.

Legitimate uses: drivers and small fleets issuing passenger receipts (many independent cabs still hand-write them), travelers reconstructing a real trip's record when the paper vanished ([rideshare receipts are recoverable in-app](/blog/uber-lyft-receipt-download) — check first), props and testing.

## The classic cab receipt, step by step

1. **Company block:** cab company name and phone; city regulator info where required.
2. **Vehicle and driver:** cab number or medallion, driver ID or hack license — the fields that make it a taxi document.
3. **Trip data:** date, pickup time, drop-off time, and distance.
4. **Fare breakdown:** flag drop / base fare, metered distance charge, wait time, then surcharges each on a line — airport fee, night/peak surcharge, extra passengers, tolls at cost.
5. **Tip and total:** cash tips often unrecorded; card payments show the tip line.
6. **Payment method** — and a receipt number if the company issues them.

The math: base + (miles × per-mile rate) + (wait minutes × wait rate) + surcharges + tolls + tip = total. City rate cards are public — a reconstruction of a real trip should use the actual city's rates.

## The rideshare-style receipt

Modern app receipts show: route (pickup → drop-off with timestamps), fare = base + per-mile + per-minute components, surge multiplier if applied, booking/service fees, tolls, tip, and payment method — plus driver first name and license plate. If you need one of these, you almost never need to make it: trip history regenerates receipts permanently, per [how to download Uber and Lyft receipts](/blog/uber-lyft-receipt-download).

## For expense reports

Policies accept both formats; what they check is date, route or distance, amount and method — the standard fields from [what receipts you need for an expense report](/blog/expense-report-receipts-guide). Handwritten cab receipts are normal and accepted ([handwriting's validity](/blog/handwritten-receipts-valid)); pair anything unusual with the card statement.

## Make one now

Open the [taxi template](/templates/taxi) at [/create](/create): company, cab and driver fields, fare lines with surcharges and tolls, tip and totals — formatted like the printed meter receipts cabs issue, PDF in under a minute.

## The bottom line

Cab number, driver ID, fare breakdown, tolls, tip, total — the meter's story in print. Rebuild only real rides; for rideshares, the app already kept the receipt.`,
    faqs: [
      {
        q: "What should a taxi receipt include?",
        a: "Company details, cab/medallion number, driver ID, date and time, distance, and the fare broken into base, distance and wait charges, surcharges, tolls, tip and total — plus the payment method.",
      },
      {
        q: "Are handwritten taxi receipts acceptable for expenses?",
        a: "Yes — independent cabs have always issued them, and expense policies accept them with complete fields. Pair with the card statement when the amount is large or the format unusual.",
      },
      {
        q: "How is a taxi fare calculated?",
        a: "Flag drop (base) + metered distance × per-mile rate + wait time × per-minute rate + local surcharges + tolls. City regulators publish the rate cards, and receipts should reconcile against them.",
      },
      {
        q: "How do I get a receipt for an Uber ride I already took?",
        a: "From the app: Activity → trip → Receipt, or riders.uber.com for a PDF. Trip history is permanent, so rideshare receipts never need reconstruction.",
      },
    ],
  },
];
