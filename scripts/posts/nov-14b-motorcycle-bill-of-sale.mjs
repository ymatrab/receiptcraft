/**
 * Day 2026-11-14, slot b (14:00Z). Elliot writer H (bill of sale cluster).
 * Keyword: "motorcycle bill of sale" (+ template / pdf / form / state variants).
 * Demand evidence (coordinator brief): Google autocomplete 2026-10-13 shows template, pdf,
 *   form and state variants; no makecepeit page ranks for the cluster.
 * Owner / link targets: /templates/sales-receipt (payment receipt only, see product check),
 *   /blog/as-is-bill-of-sale (Nov 12), /blog/car-sale-receipt (Oct 7).
 * Angle: what is specific to a motorcycle: frame VIN AND engine number, gear sold with the
 *   bike, odometer rules (no motorcycle exemption), vintage bikes that have no title.
 *
 * Product check 2026-10-13 (coordinator correction, verified on main): the builder cannot
 *   change the document heading, there is no bill-of-sale template. The post gives the bill
 *   of sale as a written sample and points to /templates/sales-receipt only for the payment
 *   receipt. Building/previewing need no account; download needs a free account; only the
 *   first download is watermark-free.
 *
 * Facts checked 2026-10-13:
 *   - 49 CFR 580.17, https://www.law.cornell.edu/cfr/text/49/580.17 : odometer disclosure
 *     exemptions are GVWR > 16,000 lb, not self-propelled, MY2010 and older after 10 years,
 *     MY2011+ after 20 years, direct sales to US agencies. No motorcycle-specific exemption.
 *   - 49 CFR 565.2, https://www.law.cornell.edu/cfr/text/49/565.2 : the VIN standard covers
 *     motorcycles (manufactured on or after Apr 30, 2009 under subpart B; earlier rules for
 *     older models).
 *   - 49 CFR 565.15, https://www.law.cornell.edu/cfr/text/49/565.15 : 17 positions; for
 *     motorcycles positions 4-8 encode make, type, line, engine type, net brake horsepower.
 *   - California DMV REG 135 Bill of Sale, https://www.dmv.ca.gov/portal/file/bill-of-sale-reg-135-pdf :
 *     fields include identification number, year model, make, license plate and a separate
 *     "Motorcycle engine #" box; seller certifies under penalty of perjury.
 *   - California DMV NRL, https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/notice-of-transfer-and-release-of-liability-nrl/ :
 *     seller notifies DMV within 5 calendar days (verified by the Nov 12 post, same date).
 *   - Texas DMV, https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle : buyer must
 *     title within 30 days; seller gives signed title with date of sale and odometer reading
 *     plus signed Form 130-U showing sales price; seller files Vehicle Transfer Notification
 *     within 30 days; go to the county tax office together.
 *   - Georgia DOR, https://dor.georgia.gov/title-not-required-or-optional-titles : titles not
 *     required for 1962 or older vehicles; titles optional for 1963-1985 model years.
 *   - Georgia DOR casual sale, https://dor.georgia.gov/motor-vehicles/title-motor-vehicles/title-and-register-vehicle-purchased-casual-sale :
 *     title and registration within 7 days of purchase; bill of sale required when the
 *     vehicle is 1985 or older and does not require a title.
 * Not stated (unverified): where each maker stamps the VIN (described as "usually the frame
 *   near the steering head" = common practice), any state fee.
 * Names, bike and amounts are fictional sample data.
 */

export const NOV_14B_MOTORCYCLE_BILL_OF_SALE = [
  {
    slug: "motorcycle-bill-of-sale",
    image: "assets/motorcycle-bill-of-sale.jpeg",
    category: "legal",
    publishedAt: "2026-11-14T14:00:00Z",
    title: "Motorcycle Bill of Sale: What to Write, With a Filled-In Example",
    seoTitle: "Motorcycle Bill of Sale: Fields, Sample and State Steps",
    seoDescription:
      "How to write a motorcycle bill of sale: VIN and engine number, odometer, gear included, as-is clause, a filled-in sample, and title steps in TX, CA and GA.",
    excerpt:
      "A motorcycle bill of sale needs the frame VIN, the engine number, the mileage and a list of any gear that goes with the bike. Here is every field, a filled-in sample, and what the buyer and seller do next.",
    body: `**A motorcycle bill of sale names the seller and buyer, identifies the bike by year, make, model, the full VIN and the engine number, records the odometer reading, price, payment method and date, lists any gear sold with it, and says whether it is sold as is. Both people sign, each keeps a copy, and the title is signed over separately.** Write the bill of sale from the sample below, then hand the buyer a payment receipt made with our [sales receipt template](/templates/sales-receipt).

Most of what a car sale needs applies here too, and our [car sale receipt guide](/blog/car-sale-receipt) covers it. This post covers what is different about bikes.

## What Makes a Motorcycle Different

**Two numbers, not one.** Motorcycles carry a 17-character VIN under the federal VIN standard ([49 CFR 565](https://www.law.cornell.edu/cfr/text/49/565.15)), and for bikes, characters 4 to 8 encode the make, type, line, engine type and horsepower. The engine also carries its own number. California's official [Bill of Sale form (REG 135)](https://www.dmv.ca.gov/portal/file/bill-of-sale-reg-135-pdf) has a separate box for the "motorcycle engine #", and it is worth recording in every state. A mismatch between the frame and engine numbers is something a buyer should ask about before paying.

**Where to find them.** The VIN is usually stamped on the frame near the steering head and printed on the title. Read it off the bike, not just the paperwork, and check that the two match.

**Gear and parts.** Bikes often sell with helmets, a cover, saddlebags, a spare seat or a stock exhaust that was swapped out. List each item, so nobody argues later about what was included.

## Fields to Include

| Field | Example (sample data) |
|---|---|
| Seller name and address | Marcus Reid, 210 Cedar Rd, Round Rock, TX |
| Buyer name and address | Alana Brooks, 47 Lake Dr, Austin, TX |
| Date of sale | Nov 9, 2026 |
| Year, make, model, color | 2019 Kawasaki Ninja 400, green |
| VIN | All 17 characters, checked on the frame and the title |
| Engine number | As stamped on the engine case |
| Odometer reading | 8,912 miles, actual mileage |
| License plate | Plate number, and whether it stays with the bike |
| Gear included | Two helmets, bike cover, stock exhaust |
| Price and payment | $4,250.00, cashier's check no. 55190 |
| Known issues | "Front tire due for replacement" |
| As-is clause | See below |
| Signatures | Seller and buyer, dated |

## The Odometer Rule Still Applies

Motorcycles get no special exemption from federal mileage disclosure. Under [49 CFR 580.17](https://www.law.cornell.edu/cfr/text/49/580.17), the exemptions are for vehicles over 16,000 lb gross weight, vehicles that are not self-propelled, and vehicles past a certain age: model year 2010 and older are exempt 10 years after their model year, and model year 2011 onward stay covered for 20 years. So a 2019 bike sold in 2026 needs a written mileage disclosure. Write the reading on the bill of sale and in the odometer section of the title if it has one.

## The As-Is Clause

Most private bike sales are as is. Put a clear clause above the signatures:

> **AS IS, WITH ALL FAULTS.** The buyer accepts the motorcycle and the listed gear in their present condition. The seller makes no warranty, express or implied, including any warranty of merchantability or fitness for a particular purpose. The buyer has had the chance to inspect and test ride the motorcycle before signing.

Our [as-is bill of sale guide](/blog/as-is-bill-of-sale) explains what that wording does, and what it cannot protect a seller from, such as a false statement about the bike's history.

## A Filled-In Sample

> **MOTORCYCLE BILL OF SALE**
>
> On November 9, 2026, Marcus Reid, 210 Cedar Rd, Round Rock, TX ("Seller"), sold to Alana Brooks, 47 Lake Dr, Austin, TX ("Buyer"), the following motorcycle: 2019 Kawasaki Ninja 400, green, VIN [17 characters], engine no. [as stamped], odometer 8,912 miles (actual mileage).
>
> Included: two helmets, bike cover, stock exhaust.
>
> Price: $4,250.00, paid by cashier's check no. 55190, received in full.
>
> Known issue disclosed: front tire due for replacement.
>
> As is, with all faults (clause above).
>
> Seller signature and date / Buyer signature and date

Both sign two copies. If your state publishes its own form, you can use it instead or attach this page to it.

## What Happens After the Sale

The bill of sale records the deal. The title, where one exists, moves ownership, and each state runs that step differently. Three examples:

- **Texas.** The [Texas DMV](https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle) says the seller gives the buyer a signed title with the date of sale and odometer reading, plus a signed Form 130-U showing the price. The buyer must title the vehicle within 30 days, and the seller should file a Vehicle Transfer Notification within 30 days so later tickets and tolls are not theirs. The DMV suggests both go to the county tax office together.
- **California.** The seller files a [Notice of Transfer and Release of Liability](https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/notice-of-transfer-and-release-of-liability-nrl/) within 5 calendar days.
- **Georgia, vintage bikes.** The Georgia Department of Revenue [does not require a title](https://dor.georgia.gov/title-not-required-or-optional-titles) for 1962 or older vehicles and makes titles optional for 1963 to 1985 models. For a [private purchase](https://dor.georgia.gov/motor-vehicles/title-motor-vehicles/title-and-register-vehicle-purchased-casual-sale) of a 1985 or older vehicle that needs no title, the buyer needs a bill of sale, and title and registration are due within 7 days of purchase. On an old bike, the bill of sale may be the main proof of ownership, so the VIN and engine number matter even more.

Rules vary by state, so check your own DMV before the sale. A few states also want certain bills of sale notarized, so ask your DMV whether yours does.

## Give the Buyer a Payment Receipt

The bill of sale proves the transfer. A separate payment receipt is a clean record that the money changed hands, which helps if the payment was split or partly in cash. Open the [sales receipt template](/templates/sales-receipt), enter the bike as the line item, add the payment method and reference, and download it. Building and previewing need no account; downloading takes a free account, and your first download is watermark-free.

Only write a bill of sale for a real sale of a motorcycle you own or are authorized to sell.

This is general information, not legal advice. Title, registration and disclosure rules vary by state; your state DMV is the authority for your sale.`,
    faqs: [
      {
        q: "What should a motorcycle bill of sale include?",
        a: "Seller and buyer names and addresses, the date, year, make, model and color, the full VIN, the engine number, the odometer reading, the price and payment method, any gear included, an as-is clause if it applies, and both signatures.",
      },
      {
        q: "Do I need to write the mileage when selling a motorcycle?",
        a: "Usually yes. Federal odometer rules have no motorcycle exemption. Bikes from model year 2011 on need a mileage disclosure for 20 years; model year 2010 and older are exempt after 10 years.",
      },
      {
        q: "Why record the engine number as well as the VIN?",
        a: "The VIN identifies the frame and the engine has its own number. Recording both shows exactly which bike and engine changed hands. California's REG 135 bill of sale has a separate box for the motorcycle engine number.",
      },
      {
        q: "Does a bill of sale transfer the motorcycle title?",
        a: "No. If the bike has a title, it must be signed over and the buyer applies to the state. In Texas the buyer has 30 days to title it; in California the seller files a release of liability within 5 calendar days.",
      },
      {
        q: "What if an old motorcycle has no title?",
        a: "Some states do not title older vehicles. Georgia, for example, requires no title for 1962 or older vehicles, and the buyer of a 1985 or older vehicle that needs no title uses a bill of sale instead.",
      },
    ],
  },
];
