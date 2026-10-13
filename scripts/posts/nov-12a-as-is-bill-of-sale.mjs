/**
 * Day 2026-11-12, slot a (09:30Z). Writer B (Elliot writers test).
 * Keyword gate (coordinator brief, DataForSEO US monthly):
 *   "as is bill of sale" / "bill of sale as is vehicle"  60,500 grouped volume, KD 15
 *   -> owner /templates/sales-receipt; sibling /blog/car-sale-receipt (Oct 7) covers the
 *      general car sale record, so this post takes only the "as is" angle and links there.
 * Angle: what "as is" means on a bill of sale, exact wording, what it does and does not
 * protect, and what else a vehicle sale needs (title transfer, odometer disclosure).
 *
 * Facts checked 2026-10-13:
 *   - UCC 2-316, https://www.law.cornell.edu/ucc/2/2-316 : (3)(a) implied warranties are
 *     excluded by expressions like "as is" and "with all faults"; (2) a disclaimer of
 *     merchantability must mention merchantability and, if written, be conspicuous.
 *   - FTC "Buying a Used Car From a Dealer" (Aug 2023),
 *     https://consumer.ftc.gov/articles/buying-used-car-dealer : dealers must display a
 *     Buyers Guide; "As Is - No Dealer Warranty" means the buyer assumes the risk of what goes
 *     wrong after the sale; implied warranties apply unless the sale is "as is"; the guide
 *     has an "Implied Warranties Only" version for states that do not allow "as is" sales;
 *     contact the state attorney general for state "as is" disclosure rules.
 *   - 49 CFR 580.17, https://www.law.cornell.edu/cfr/text/49/580.17 : odometer disclosure
 *     exemptions: MY2010 and older after 10 years; MY2011+ after 20 years; GVWR over
 *     16,000 lb; non-self-propelled vehicles.
 *   - 49 USC 32705, https://www.law.cornell.edu/uscode/text/49/32705 : transferor must give
 *     a written mileage disclosure and may not give a false statement.
 *   - 49 USC 32710, https://www.law.cornell.edu/uscode/text/49/32710 : violation with intent
 *     to defraud -> liable for 3x actual damages or $10,000, whichever is greater; sue within
 *     2 years.
 *   - California DMV NRL page,
 *     https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/notice-of-transfer-and-release-of-liability-nrl/ :
 *     seller notifies DMV within 5 calendar days (CVC 5900); after that, tickets and
 *     lawsuits arising after the sale date shift to the buyer (CVC 5602).
 * Not verified on a .gov page: a general statement that "as is" never shields fraud. The
 * post states it only through the odometer statute (federal) and frames the rest as
 * "a disclaimer of warranties is not a licence to lie", with a not-legal-advice note.
 * Names, vehicle and amounts are fictional sample data.
 */

export const NOV_12A_AS_IS_BILL_OF_SALE = [
  {
    slug: "as-is-bill-of-sale",
    image: "assets/as-is-bill-of-sale.jpeg",
    category: "legal",
    publishedAt: "2026-11-12T09:30:00Z",
    title: "As Is Bill of Sale: Wording, What It Covers and a Vehicle Example",
    seoTitle: "As Is Bill of Sale: Sample Wording for a Vehicle Sale",
    seoDescription:
      "What \"as is\" means on a bill of sale, sample as-is clause wording for a car, what it does and does not protect, and the odometer and title steps you still need.",
    excerpt:
      "Writing \"sold as is\" on a bill of sale tells the buyer there is no warranty. Here is wording that does that clearly, what it cannot protect a seller from, and the odometer and title steps a vehicle sale still needs.",
    body: `**An "as is" bill of sale records that the buyer accepts the item in its current condition, faults included, and that the seller gives no warranty. The clause should say "as is" and "with all faults," say that no warranty is given, express or implied, and name merchantability and fitness for a particular purpose. It does not protect a seller who lies about the item.** You can lay the sale out on our [sales receipt template](/templates/sales-receipt) and put the as-is clause in the notes, where both parties sign under it.

This guide covers the "as is" part. For everything else a private car sale record needs, see our [car sale receipt guide](/blog/car-sale-receipt).

## What "As Is" Means

Every sale of goods can carry unwritten promises, called implied warranties. The main one, merchantability, is a promise that the item works for its ordinary purpose: a car that runs, a mower that cuts. Section 2-316 of the [Uniform Commercial Code](https://www.law.cornell.edu/ucc/2/2-316), the model sales law that state codes are built on, says expressions like "as is" and "with all faults" exclude implied warranties. The same section says a written disclaimer of merchantability should mention merchantability by name and be conspicuous, which is why good clauses use the word and set it in bold or capitals.

For used cars bought from a dealer, the Federal Trade Commission's [guide to buying a used car](https://consumer.ftc.gov/articles/buying-used-car-dealer) explains the federal Buyers Guide: "As Is - No Dealer Warranty" means the buyer takes on the risk of anything that goes wrong after the sale. The FTC also publishes an "Implied Warranties Only" version of the guide for states that do not allow "as is" sales of used cars, so check your state attorney general's rules before you rely on the clause.

## Sample As-Is Clause

> **AS IS, WITH ALL FAULTS.** The buyer accepts the vehicle described above in its present condition. The seller makes no warranty of any kind, express or implied, including any implied warranty of merchantability or fitness for a particular purpose. The buyer has had the opportunity to inspect the vehicle [and have it inspected by a mechanic of the buyer's choice] before signing.

Set it in bold or capitals, place it just above the signatures, and have the buyer initial next to it. If you promised anything specific, such as "new battery fitted," write that in too. A written promise is an express warranty, and the as-is clause will not cancel it.

## As-Is Bill of Sale: Field Table

| Field | Example (sample data) |
|---|---|
| Seller name and address | Daniel Ortiz, 41 Pine St, Fresno, CA |
| Buyer name and address | Keisha Grant, 9 Elm Ct, Clovis, CA |
| Date and time of sale | Nov 8, 2026, 2:15 p.m. |
| Year, make, model, color | 2015 Toyota Corolla, silver |
| VIN | Full 17 characters, checked against the title |
| Odometer reading | 128,450 miles, actual mileage |
| Price | $6,800.00 |
| Payment | Cashier's check, number written on the bill of sale |
| Known defects disclosed | "A/C does not blow cold; check engine light on" |
| As-is clause | As above, initialed by the buyer |
| Signatures | Seller and buyer, both dated |

The "known defects" line helps both sides. A seller who writes down the faults they know about has a record that they told the buyer. A buyer has proof of what they were told.

## What "As Is" Does Not Protect

**Lying.** An as-is clause disclaims warranties. It does nothing for false statements. If the seller says "never been in an accident" or "rebuilt transmission" and that is false, the clause does not erase the statement. Write down only what is true.

**Mileage.** Federal law requires the person transferring a vehicle to give the buyer a written odometer disclosure and forbids false statements in it ([49 U.S.C. 32705](https://www.law.cornell.edu/uscode/text/49/32705)). A seller who breaks the odometer rules with intent to defraud can be sued for three times the actual damages or $10,000, whichever is greater ([49 U.S.C. 32710](https://www.law.cornell.edu/uscode/text/49/32710)). No contract wording changes that.

**Written promises.** Anything the seller promised in writing is an express warranty and stays binding.

**State rules.** Some states limit "as is" sales or add their own disclosures. The FTC points buyers and sellers to the state attorney general for those rules.

## What a Vehicle Sale Still Needs

**Odometer disclosure.** Under [49 CFR 580.17](https://www.law.cornell.edu/cfr/text/49/580.17), vehicles from model year 2011 on need a mileage disclosure at every transfer until they are 20 years old; model year 2010 and older are exempt after 10 years, and so are vehicles over 16,000 lb gross weight. Most titles have a space for it.

**Title transfer.** The bill of sale records the deal; the title moves ownership. Sign the title over and follow your state DMV's steps. In California, for example, the [DMV says](https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/notice-of-transfer-and-release-of-liability-nrl/) the seller must file a Notice of Transfer and Release of Liability within 5 calendar days, after which tickets and lawsuits from after the sale date are the buyer's responsibility.

**A copy each.** Sign two originals so both sides keep one.

## Not Just Cars

The same clause works for any used item sold privately: a boat trailer, a lawnmower, used equipment. For animals, a different set of rules applies; our [dog bill of sale guide](/blog/dog-bill-of-sale) covers health guarantees and pet purchase laws.

## Make It in a Few Minutes

Open the [sales receipt template](/templates/sales-receipt), enter both parties and the vehicle or item, add the price and payment method, and paste the as-is clause into the notes. Building and previewing need no account; downloading takes a free account, and your first download is watermark-free. A bill of sale must describe a real sale of something you own.

This is general information, not legal advice. Contract and vehicle rules vary by state; your state DMV and attorney general are the authorities for your sale.`,
    faqs: [
      {
        q: "What does \"as is\" mean on a bill of sale?",
        a: "The buyer accepts the item in its present condition, with any faults, and the seller gives no warranty. Under UCC 2-316, wording like \"as is\" or \"with all faults\" excludes implied warranties.",
      },
      {
        q: "What should an as-is clause say?",
        a: "That the item is sold \"as is, with all faults,\" that the seller makes no warranty, express or implied, including merchantability and fitness for a particular purpose, and that the buyer had a chance to inspect it. Make it conspicuous and have the buyer initial it.",
      },
      {
        q: "Does selling a car \"as is\" protect me if something breaks later?",
        a: "Generally it means the buyer takes the risk of problems after the sale. It does not cover false statements you made, written promises, or odometer violations, and some states limit as-is sales.",
      },
      {
        q: "Does an as-is bill of sale transfer the title?",
        a: "No. The title must be signed over and the transfer handled through your state DMV. In California, the seller also files a release of liability within 5 calendar days.",
      },
      {
        q: "Do I still need to write the odometer reading?",
        a: "For most vehicles from model year 2011 on, yes. Federal rules require a written mileage disclosure at each transfer until the vehicle is 20 years old.",
      },
    ],
  },
];
