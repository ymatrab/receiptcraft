/**
 * Day 2026-12-12, slot a (09:30Z). Elliot writer J.
 * Keyword: "consignment receipt" (meaning, sample).
 * Demand: Google autocomplete, checked 2026-10-13; no makecepeit page ranks for it.
 * Owner/links: /templates/sales-receipt (owner), /create, /blog/what-makes-a-receipt-valid
 *   (same batch, 2026-11-22).
 * Angle: two documents in a consignment deal (intake receipt when goods are handed over,
 * settlement statement when they sell), the commission split, unsold-item terms, worked example.
 * Product check: sales-receipt template exists (lib/templates.ts); store name (header), two-column
 * label/value rows with optional title, item lines, message and signature sections are editable
 * in components/builder/SectionBuilder.tsx.
 * Builder claims re-checked against origin/main 2026-10-13 (lib/templates.ts, SectionBuilder.tsx):
 * the document heading cannot be changed, so the post never tells readers to retitle it.
 * There is no dedicated consignment template; the post does not claim one.
 *
 * Facts checked 2026-10-13:
 *   - UCC 9-102(a)(20), https://www.law.cornell.edu/ucc/9/9-102 : "consignment" for Article 9
 *     means a person delivers goods to a merchant for sale, and the merchant deals in goods of that
 *     kind under a name other than the deliverer's, is not an auctioneer, and is not generally
 *     known by its creditors to be substantially engaged in selling others' goods; aggregate value
 *     $1,000 or more at delivery; goods not consumer goods immediately before delivery; no security
 *     interest securing an obligation. Used only to say the legal definition is narrow and that
 *     business consignments of significant value raise creditor questions for a lawyer.
 * Commission percentages, terms and the shop are fictional examples, presented as such.
 */

export const DEC_12A_CONSIGNMENT_RECEIPT = [
  {
    slug: "consignment-receipt",
    image: "assets/consignment-receipt.jpeg",
    category: "small-business",
    publishedAt: "2026-12-12T09:30:00Z",
    title: "Consignment Receipt: Meaning, What to Include and a Sample",
    seoTitle: "Consignment Receipt: Meaning, Fields and Sample",
    seoDescription:
      "A consignment receipt records goods left with a shop to sell for the owner. What to include, how the commission split works, and a worked sample.",
    excerpt:
      "A consignment receipt is what a shop gives you when you leave items for it to sell on your behalf. Here is what it should list, how to write the commission and unsold-item terms, and a sample from intake to payout.",
    body: `**A consignment receipt is the document a shop or dealer (the consignee) gives the owner of goods (the consignor) when the owner leaves items for the shop to sell. It lists each item, its condition and asking price, the commission split, how long the shop will hold the items and what happens to anything unsold. Ownership stays with the consignor until the item sells, so the receipt is the consignor's proof of what they handed over.**

You can make one from the [sales receipt template](/templates/sales-receipt) by listing the items at their agreed prices and adding the consignment terms in a label-and-value block. Most deals need two documents: the receipt at intake and a settlement statement when items sell. Both are covered below.

## How Consignment Works

1. **Intake.** The consignor brings items in. The shop inspects them, agrees prices and writes a consignment receipt.
2. **Selling period.** The shop displays the items for an agreed time, often with planned markdowns.
3. **Sale.** When an item sells, the shop gives the buyer an ordinary sales receipt.
4. **Settlement.** The shop pays the consignor their share and issues a settlement statement.
5. **Unsold items.** At the end of the period, the consignor collects them, or the agreed alternative applies.

The buyer never deals with the consignor. That is why the paperwork between consignor and shop matters: it is the only record of who owns what.

## What the Intake Receipt Should Include

| Field | Example |
|---|---|
| Receipt or agreement number | CON-0412 |
| Date received | September 1, 2026 |
| Consignee (shop) name and address | Second Bloom Boutique, 88 Main St, Asheville, NC |
| Consignor name and contact | Rachel Kim, phone or email |
| Item list | Description, brand, size or model, condition |
| Agreed price per item | The tag price the shop will start at |
| Commission split | For example, 60% to consignor, 40% to shop |
| Consignment period | For example, 60 days, to October 31, 2026 |
| Markdown schedule | For example, 20% off after 30 days |
| Unsold-item terms | Collect within 7 days, or the items are donated |
| Payout method and timing | For example, check on the 15th of the month after sale |
| Signatures | Consignor and shop |

Write condition honestly on intake ("small mark on left sleeve"). It prevents the most common argument later, which is about damage.

## The Commission Split

Commission rates are set by each shop; there is no standard. Whatever you agree, put three things on paper:

- **The percentage and who gets which side.** "Consignor 60% / shop 40%" is clearer than "40% commission".
- **What it is calculated on.** Usually the actual sale price, after any markdown, not the original tag price.
- **Any fees.** If the shop charges an intake or listing fee, write the amount on the receipt.

## Worked Example

Rachel Kim leaves three items at Second Bloom Boutique on September 1, 2026 (all names and figures are fictional). The intake receipt lists:

| Item | Condition | Agreed price |
|---|---|---|
| Wool winter coat, size M | Excellent | $120.00 |
| Leather crossbody bag | Good, light wear on strap | $85.00 |
| Ankle boots, size 8 | Like new | $65.00 |
| **Total agreed price** | | **$270.00** |

Terms: 60% to consignor, 40% to shop, on the actual sale price; 60-day period; 20% markdown after 30 days; unsold items to be collected within 7 days of the period ending.

By the end of the period, the coat sold at full price, the bag sold after the markdown at $68.00, and the boots did not sell. The settlement statement shows:

| Item | Sale price | Consignor 60% | Shop 40% |
|---|---|---|---|
| Wool winter coat | $120.00 | $72.00 | $48.00 |
| Leather crossbody bag (after 20% markdown) | $68.00 | $40.80 | $27.20 |
| **Totals** | **$188.00** | **$112.80** | **$75.20** |

Payout to consignor: $112.80. Ankle boots: unsold, returned to consignor on November 3, 2026, signed for on collection.

The two documents together tell the whole story: what went in, what sold for how much, what was paid, and what came back.

## The Settlement Statement

The statement the shop gives at payout should repeat the intake receipt number, then list:

- each item sold, the date and the actual sale price
- the consignor's share and the shop's share
- any fees deducted
- the total paid, the date and the method
- any unsold items and whether they were returned or donated

## A Note on the Legal Meaning

In everyday use, any arrangement where an owner leaves goods with someone else to sell is called consignment. The Uniform Commercial Code uses a narrower definition for its secured-transactions rules: [UCC 9-102](https://www.law.cornell.edu/ucc/9/9-102) covers deliveries of goods worth $1,000 or more, to a merchant, that were not consumer goods before delivery, among other conditions. That definition matters mainly for the rights of the shop's creditors. If you are consigning business inventory of real value, ask a lawyer whether those rules apply to you. For a resale shop taking in personal items, a clear receipt and agreement are the practical protection.

## How to Make It in the Builder

1. Open the [sales receipt template](/templates/sales-receipt).
2. Put the shop's name and address in the header fields.
3. Add each item as a line with its description, condition and agreed price.
4. Add a two-column block titled "Consignment terms" with rows for the consignor, the commission split, the period and the unsold-item terms.
5. Add a signature section.

For the settlement, make a second document that lists the items sold at their sale prices and puts the split and payout in a two-column block titled "Settlement". You can [build and preview](/create) without an account; downloading needs a free account, and the first download is watermark-free. Only list goods that were actually handed over and prices that were actually agreed.

For the elements every receipt should carry, see [what makes a receipt valid](/blog/what-makes-a-receipt-valid).

This is general information, not legal advice.`,
    faqs: [
      {
        q: "What is a consignment receipt?",
        a: "The record a shop gives the owner of goods when the owner leaves them to be sold. It lists the items, their condition and price, the commission split, the selling period and what happens to unsold items.",
      },
      {
        q: "Who keeps the consignment receipt?",
        a: "Both. The consignor keeps it as proof of what they handed over and on what terms; the shop keeps a copy to match against sales and payouts.",
      },
      {
        q: "Is commission calculated on the tag price or the sale price?",
        a: "Whatever the agreement says. Most agreements use the actual sale price after any markdown, so write that on the receipt to avoid disputes.",
      },
      {
        q: "What happens to items that don't sell?",
        a: "That depends on the terms you sign. Common options are collection by the consignor within a set number of days, a further markdown, or donation. The receipt should say which applies.",
      },
    ],
  },
];
