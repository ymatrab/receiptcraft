/**
 * Cadence fill — Day 2026-10-07, post 2 of 2 (14:00Z). Pairs with the mechanic
 * post at 09:30Z. Keyword gate checked 2026-10-06: no page owns it.
 *   "car sale receipt"          590/mo · CPC $2.35
 *   "receipt for selling a car"  90/mo
 *   -> /templates/sales-receipt (no vehicle-specific template exists)
 *
 * Facts checked 2026-10-06:
 *   - NHTSA: from 1 Jan 2021, odometer disclosure on every transfer for the
 *     first 20 years, starting with model year 2011; MY2010 and older keep the
 *     old 10-year rule, so they are now exempt.
 *   - California DMV: Bill of Sale REG 135; any bill of sale that identifies the
 *     vehicle is acceptable; no notary or witness required.
 * State rules vary; the post says so and sends readers to their DMV.
 */

export const OCT_7B = [
  {
    slug: "car-sale-receipt",
    image: "assets/car-sale-receipt.jpeg",
    category: "how-to",
    publishedAt: "2026-10-07T14:00:00Z",
    title: "Car Sale Receipt: What to Write When You Sell a Car",
    seoTitle: "Car Sale Receipt: What to Write When You Sell a Car",
    seoDescription:
      "What a car sale receipt or bill of sale should say: buyer, seller, VIN, odometer reading, price, date, payment method and an as-is statement.",
    excerpt:
      "Selling a car privately? The receipt (usually called a bill of sale) needs the buyer and seller, the VIN, the odometer reading, the price and the date. Here's what to write, and what your state may add.",
    body: `**A car sale receipt, usually called a bill of sale, should name the buyer and the seller, identify the car by year, make, model and VIN, record the odometer reading, the sale price, the date and how it was paid, and say whether the car is sold as-is.** Both parties sign it and each keeps a copy. Some states publish their own form, and California's DMV accepts any bill of sale that identifies the vehicle. A [sales receipt template](/templates/sales-receipt) gives you a clean record of the payment to go with it.

The receipt protects both sides. The seller can show when the car left their hands and for how much; the buyer can show what they paid and that they own it.

## What a Car Sale Receipt Should Include

| Field | Why it matters |
|---|---|
| Seller's name and address | Who sold the car |
| Buyer's name and address | Who now owns it |
| Year, make and model | Identifies the car in plain words |
| VIN | Identifies this exact car; check it against the title and the dashboard plate |
| Odometer reading | Federal law requires it for most recent cars (see below) |
| Sale price | What was paid, in figures and ideally in words |
| Date of sale | When ownership changed |
| Payment method | Cash, cashier's check or transfer, with a reference number |
| As-is statement | Whether the seller gives any warranty |
| Signatures | Both buyer and seller |

## The Odometer Rule

**For most cars from model year 2011 on, the mileage must be disclosed at every sale for the first 20 years.**

The [National Highway Traffic Safety Administration](https://www.nhtsa.gov/press-releases/consumer-alert-changes-odometer-disclosure-requirements) extended the federal odometer disclosure rule from January 1, 2021. Vehicles from model year 2011 onward need a disclosure on every transfer of ownership until they are 20 years old. Model year 2010 and older cars stayed on the old 10-year rule, so they are now exempt. Write the reading as shown on the odometer, without tenths, and note it on the title if your state's title has a space for it.

## Bill of Sale or Receipt?

**In a private car sale they are usually the same document.**

A bill of sale records that ownership passed from one person to another; a receipt records that money changed hands. A good car sale receipt does both, which is why most people write one document and call it a bill of sale. Some states publish an official form, such as the [California DMV's Bill of Sale (REG 135)](https://www.dmv.ca.gov/portal/file/bill-of-sale-reg-135-pdf). California says any bill of sale that identifies the vehicle is acceptable and that it does not need to be notarized or witnessed, but other states set their own rules. Check your state DMV before the sale.

## How to Write One

1. Get the VIN from the title and confirm it matches the plate on the dashboard.
2. Write both names and addresses.
3. Describe the car: year, make, model, color and VIN.
4. Record the odometer reading at the time of sale.
5. Write the price and how it was paid, with any check or transfer number.
6. Add "Sold as-is, with no warranty" if that is the deal.
7. Date it, both sign it, and each keep a copy.

If you are taking a cash payment, a separate payment receipt from a [sales receipt template](/templates/sales-receipt) gives the buyer a clean record of the money alongside the bill of sale.

## After the Sale

**The receipt does not transfer the title.** The title still has to be signed over and the transfer reported the way your state requires. Keep your copy of the receipt with the date and time of sale: if the car gets a parking ticket or toll charge the next day, it is your proof that you no longer owned it.`,
    faqs: [
      {
        q: "What should a car sale receipt include?",
        a: "Buyer and seller names and addresses, the year, make, model and VIN, the odometer reading, the sale price, the date, the payment method, an as-is statement if there is no warranty, and both signatures.",
      },
      {
        q: "Is a bill of sale the same as a receipt?",
        a: "In a private car sale, usually yes. A bill of sale records the change of ownership and a receipt records the payment; one document can do both.",
      },
      {
        q: "Do I need to write the odometer reading?",
        a: "For model year 2011 and newer, federal rules require an odometer disclosure on every transfer for the first 20 years. Model year 2010 and older cars are exempt.",
      },
      {
        q: "Does a car bill of sale need to be notarized?",
        a: "It depends on the state. California says its bill of sale does not need to be notarized or witnessed; check your own state DMV.",
      },
      {
        q: "Should I write 'sold as-is'?",
        a: "If you are not giving a warranty, yes. It records that the buyer accepted the car in its current condition.",
      },
      {
        q: "Does the receipt transfer ownership?",
        a: "No. The title has to be signed over and the transfer reported to your state. The receipt is the record of the sale.",
      },
      {
        q: "How should I take payment in a private sale?",
        a: "A cashier's check or bank transfer leaves a record. If you take cash, write it on the receipt and have the buyer sign.",
      },
      {
        q: "Should the buyer and seller each keep a copy?",
        a: "Yes. The seller needs proof of when the car was sold; the buyer needs proof of what they paid and when.",
      },
      {
        q: "Can I write a car sale receipt by hand?",
        a: "Yes, if it includes all the details and both signatures. A typed copy is easier to read later.",
      },
      {
        q: "What if I'm giving the car away?",
        a: "Write a bill of sale that says it was a gift, with a price of $0 or the gift value your state asks for. California's form has a space for gifts.",
      },
    ],
  },
];
