/**
 * Day 2026-12-08, slot a (09:30Z). Elliot writer H (bill of sale cluster).
 * Keyword: "personal property bill of sale" (+ template / pdf / form / state variants).
 * Demand evidence (coordinator brief): Google autocomplete 2026-10-13 shows template, pdf,
 *   form and state variants; no makecepeit page ranks for the cluster.
 * Owner / link targets: /templates/sales-receipt (payment receipt only),
 *   /blog/as-is-bill-of-sale (Nov 12), /blog/motorcycle-bill-of-sale (Nov 14),
 *   /blog/boat-bill-of-sale (Nov 18), /blog/trailer-bill-of-sale (Nov 22),
 *   /blog/how-to-notarize-a-bill-of-sale (Nov 26).
 * Angle: furniture, electronics, equipment (serial numbers, condition, multi-item list);
 *   personal property left in a home sale (fixtures vs movable goods, explained simply);
 *   when an item is really a titled vehicle; tax on selling personal items.
 *
 * Product check 2026-10-13 (coordinator correction): no bill-of-sale template, heading not
 *   editable; /templates/sales-receipt only for the payment receipt (it supports several
 *   item lines). Download needs a free account; first download only watermark-free.
 *
 * Facts checked 2026-10-13:
 *   - UCC 2-105(1), https://www.law.cornell.edu/ucc/2/2-105 : "goods" means all things which
 *     are movable at the time of identification.
 *   - UCC 9-102(a)(41), https://www.law.cornell.edu/ucc/9/9-102 : "fixtures" are goods that
 *     have become so related to particular real property that an interest in them arises
 *     under real property law.
 *   - IRS Topic 409, https://www.irs.gov/taxtopics/tc409 : personal-use items like household
 *     furnishings are capital assets; losses from the sale of personal-use property aren't
 *     tax deductible.
 *   - Georgia DOR, https://dor.georgia.gov/title-not-required-or-optional-titles : titles not
 *     required for all terrain and off-road vehicles, vehicles not manufactured for highway
 *     use, agricultural equipment not required to be registered.
 *   - Texas DMV Trailers, https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/trailers :
 *     farm trailers up to 4,000 lb used primarily as farm vehicles are exempt from title and
 *     registration; a used trailer of 4,000 lb or less transfers with a bill of sale plus
 *     registration receipt (or title if issued).
 * Not stated: any rule on how mortgage lenders treat personal property in a home sale (not
 *   verified); a gain is taxable (from search snippet of an IRS page, not fetched) - the post
 *   only says losses are not deductible and points to the IRS.
 * Names, items and amounts are fictional sample data.
 */

export const DEC_8A_PERSONAL_PROPERTY_BILL_OF_SALE = [
  {
    slug: "personal-property-bill-of-sale",
    image: "assets/personal-property-bill-of-sale.jpeg",
    category: "legal",
    publishedAt: "2026-12-08T09:30:00Z",
    title: "Personal Property Bill of Sale: Furniture, Electronics and Home Sales",
    seoTitle: "Personal Property Bill of Sale: What to Write + Sample",
    seoDescription:
      "How to write a bill of sale for furniture, electronics or equipment, how to list items left behind in a home sale, and a filled-in multi-item sample.",
    excerpt:
      "Selling a sofa set, a laptop, a riding mower or the appliances you are leaving in a house? Here is what a personal property bill of sale should say, how to list several items, and a filled-in sample.",
    body: `**A personal property bill of sale records the sale of movable items such as furniture, electronics, tools or equipment. It names the seller and buyer, lists each item with a description, condition and any serial number, gives the price for each item and the total, records the date and payment, says whether the items are sold as is, and is signed by both people.** Write it from the sample below, then give the buyer a payment receipt made with our [sales receipt template](/templates/sales-receipt).

## What Counts as Personal Property

In everyday terms, personal property is anything you own that you can pick up and move. The Uniform Commercial Code, the model sales law that state codes are built on, calls these "goods": things that are [movable](https://www.law.cornell.edu/ucc/2/2-105) when they are sold. A couch, a television, a table saw and a pressure washer are all goods. A house, and the land it sits on, are real property, and they pass by deed, not by bill of sale.

Some items have their own title or registration system, and a plain personal property bill of sale is not enough for them. Use the item-specific guides for a [motorcycle](/blog/motorcycle-bill-of-sale), a [boat](/blog/boat-bill-of-sale) or a [trailer](/blog/trailer-bill-of-sale). Some machines fall in between, and states differ: the Georgia Department of Revenue, for example, lists all-terrain and off-road vehicles and vehicles [not built for highway use](https://dor.georgia.gov/title-not-required-or-optional-titles) as needing no title, while Texas exempts [light farm trailers](https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/trailers) used mainly on the farm from title and registration. Check your state before assuming an item is untitled.

## Describe Each Item Properly

A good description lets a stranger pick the item out of a room.

- **Brand and model**, such as "Samsung 65-inch QN65Q80C television."
- **Serial number** for electronics, appliances, tools and equipment. It is usually on a label on the back or underside.
- **Condition**, honestly: "scratch on left arm," "battery holds about 3 hours."
- **Accessories** that go with it: remote, charger, original box, manuals.
- **Price per item**, even in a bundle sale. If one item turns out to be faulty or is left behind, a per-item price makes the fix simple.

## Fields to Include

| Field | Example (sample data) |
|---|---|
| Seller name and address | Owen Carter, 26 Willow Way, Boise, ID |
| Buyer name and address | Priya Raman, 813 Grove St, Meridian, ID |
| Date of sale | Dec 5, 2026 |
| Item 1 | Sectional sofa, gray, three pieces, good condition |
| Item 2 | Television, brand and model, serial number, with remote |
| Item 3 | Riding mower, brand and model, serial number, 210 hours |
| Price per item and total | See sample |
| Payment | Cash and a bank transfer, amounts noted |
| Delivery or pickup | Buyer collects by Dec 7, 2026 |
| As-is clause | See below |
| Signatures | Seller and buyer, dated |

## A Filled-In Sample

> **BILL OF SALE: PERSONAL PROPERTY**
>
> On December 5, 2026, Owen Carter, 26 Willow Way, Boise, ID ("Seller"), sold to Priya Raman, 813 Grove St, Meridian, ID ("Buyer"), the following items:
>
> 1. Sectional sofa, gray fabric, three pieces, small stain on center cushion: $650.00
> 2. Samsung 65-inch television, model [number], serial no. [number], with remote and wall mount: $480.00
> 3. John Deere riding mower, model [number], serial no. [number], 210 hours: $1,370.00
>
> Total: $2,500.00. Paid $500.00 in cash and $2,000.00 by bank transfer, reference [number], received in full.
>
> Buyer will collect the items from the seller's address by December 7, 2026. Risk of loss passes to Buyer on collection.
>
> Sold as is, with all faults. The seller makes no warranty, express or implied.
>
> Seller signature and date / Buyer signature and date

Our [as-is bill of sale guide](/blog/as-is-bill-of-sale) has fuller wording for the as-is clause and explains what it does not cover, such as a false statement about an item.

## Personal Property in a Home Sale

When you sell a house, the buyer often wants some of your things too: the washer and dryer, a patio set, a gym in the garage, the dining table that fits the room perfectly. Here is the simple version of how that works.

**Fixtures usually go with the house.** The law treats some items as part of the property once they are attached to it. The UCC describes [fixtures](https://www.law.cornell.edu/ucc/9/9-102) as goods so connected to a property that real property law governs them. Built-in cabinets or a ceiling fan are typical examples. They normally transfer with the deed unless the purchase contract excludes them.

**Movable items do not, unless you say so.** A freestanding refrigerator, a sofa or a hot tub on a patio is personal property. The home purchase contract decides what is included, so list it there.

**A separate bill of sale keeps it clean.** When the buyer is paying extra for items, or you are leaving things behind, write a personal property bill of sale that lists each item, its condition and its price (or "$0.00, included at no charge"). Keep the items, prices and dates consistent with the purchase contract, and talk to your agent, attorney or closing company before signing, because they will know how your lender and your state handle it.

Use real values. Shifting money between the house price and the furniture price to change what a lender or tax office sees is a misstatement, not a paperwork trick.

## Do You Need a Notary or a Tax Form?

A personal property bill of sale between private people usually needs no notary, though your state or a specific situation can require one. Our guide on [how to notarize a bill of sale](/blog/how-to-notarize-a-bill-of-sale) covers when and how.

On taxes, the IRS treats household furnishings and other personal-use items as capital assets, and a [loss on selling personal-use property is not deductible](https://www.irs.gov/taxtopics/tc409). If you sell items for more than you paid, or you sell regularly, read the IRS guidance or ask a tax professional. Keep the bill of sale and the original purchase receipts together.

## Give the Buyer a Payment Receipt

A payment receipt is the simplest proof that the money changed hands, and it helps when payment was split between cash and a transfer. Open the [sales receipt template](/templates/sales-receipt), add each item as its own line with the same prices as the bill of sale, enter the payment methods, and download it. Building and previewing need no account; downloading takes a free account, and your first download is watermark-free.

Only write a bill of sale for a real sale of items you own or are authorized to sell.

This is general information, not legal or tax advice. Sale, title and tax rules vary by state; your state agencies and the IRS are the authorities for your situation.`,
    faqs: [
      {
        q: "What is a personal property bill of sale?",
        a: "A signed record that movable items, such as furniture, electronics, tools or equipment, were sold by one person to another. It lists each item, its condition and serial number, the price, the date and the payment, and both people sign it.",
      },
      {
        q: "Can I list several items on one bill of sale?",
        a: "Yes. Number each item, describe it, and give it its own price, then show the total. A per-item price makes it easy to fix the record if one item is returned or left behind.",
      },
      {
        q: "Does furniture left in a house need a bill of sale?",
        a: "The home purchase contract decides what is included. A separate bill of sale is a clear way to list movable items the buyer is paying for or that you are leaving behind. Fixtures attached to the house usually transfer with it.",
      },
      {
        q: "Is a personal property bill of sale enough for an ATV or trailer?",
        a: "It depends on the state. Some items have their own title or registration system. Georgia, for example, does not title off-road vehicles, while Texas titles trailers over 4,000 lb gross. Check your state's DMV.",
      },
      {
        q: "Do I pay tax when I sell my used furniture?",
        a: "A loss on selling personal-use items is not deductible, according to the IRS. If you sell for more than you paid, or sell regularly, check the IRS guidance or a tax professional.",
      },
    ],
  },
];
