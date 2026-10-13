/**
 * Day 2026-11-10, slot b (14:00Z). Writer B (Elliot writers test).
 * Keyword gate (coordinator brief, DataForSEO US monthly):
 *   "format for commercial invoice"  2,400/mo
 *   "commercial invoice fedex"       1,900/mo
 *   -> owner /templates/invoice; pillar /blog/how-to-make-an-invoice
 * Angle: how to fill out a commercial invoice for an international shipment, field by
 * field, with a worked example. Creation intent: the reader has a parcel to send.
 *
 * Facts checked 2026-10-13:
 *   - trade.gov, https://www.trade.gov/commercial-invoice : required for export and import
 *     clearance; buyer's customs uses it to assess duties and taxes; most countries accept
 *     the exporter's own form, a few require a specific form; may include the HS code,
 *     which can speed clearance; destination control statement not required for all exports.
 *   - 19 CFR 141.86(a) (US import invoice contents), read via
 *     https://www.law.cornell.edu/cfr/text/19/141.86 (eCFR blocked the fetch): port of
 *     entry; time, place and parties of sale; detailed description incl. marks/numbers;
 *     quantities; purchase price per item in the currency of sale; currency; itemized
 *     charges (freight, insurance, packing...) unless included; country of origin.
 *   - trade.gov Incoterms, https://www.trade.gov/know-your-incoterms : ICC rules defining
 *     seller/buyer responsibilities; contracts should reference Incoterms 2020; 11 rules;
 *     DAP/DDP/FCA need a named place.
 *   - trade.gov HS codes, https://www.trade.gov/harmonized-system-hs-codes : 6-digit
 *     international HS; US uses 10 digits; Schedule B (Census) for exports, HTS for imports.
 *   - trade.gov EEI, https://www.trade.gov/electronic-export-information-eei : EEI filed in
 *     AES when value per Schedule B number is over $2,500 or a license is needed; shipments
 *     to Canada exempt at any value unless a mandatory filing applies.
 *   - trade.gov pro forma, https://www.trade.gov/pro-forma-invoice : seller, buyer, items,
 *     unit and extended prices, weights, terms of sale/Incoterm, payment terms, estimated
 *     ship date, validity date.
 * Not verified: fedex.com, ups.com and dhl.com all blocked automated fetches on
 * 2026-10-13, so the post names no carrier-specific field order, copy count or upload step;
 * it tells readers to check their carrier's own form.
 * Sample business, HS example and numbers are fictional sample data.
 */

export const NOV_10B_COMMERCIAL_INVOICE = [
  {
    slug: "commercial-invoice",
    image: "assets/commercial-invoice.jpeg",
    category: "small-business",
    publishedAt: "2026-11-10T14:00:00Z",
    title: "Commercial Invoice: How to Fill One Out for an International Shipment",
    seoTitle: "Commercial Invoice: How to Fill It Out (Field by Field)",
    seoDescription:
      "How to fill out a commercial invoice for an international shipment: shipper, consignee, HS code, country of origin, Incoterms, reason for export and value.",
    excerpt:
      "Customs in the destination country uses your commercial invoice to clear the parcel and work out duty. Here is every field, what to write in it, and a filled-in example for a US seller shipping to Canada.",
    body: `**A commercial invoice is the document customs uses to clear an international shipment and work out duties and taxes. It lists the seller and buyer, a detailed description of each item with its HS code, quantity, unit value and country of origin, the currency, the Incoterm, the reason for export and the total value.** You can lay one out on our [invoice template](/templates/invoice) and add the customs fields to each line and the notes, then print and sign it.

The [International Trade Administration](https://www.trade.gov/commercial-invoice) says the commercial invoice is required for export and import clearance, and that most countries accept the exporter's own version as long as it carries all the pertinent information. A few countries require a specific form, so check the destination first. If you have never written an ordinary invoice, start with [how to make an invoice](/blog/how-to-make-an-invoice); a commercial invoice is the same document with customs fields added.

## Commercial Invoice Fields, One by One

| Field | What to write |
|---|---|
| Invoice number and date | Your own invoice number and the date of shipment |
| Waybill or tracking number | The number your carrier gives the shipment |
| Shipper / exporter | Name, address, phone, and tax ID if you have one |
| Consignee | Who receives the goods: name, address, phone |
| Importer of record | Only if different from the consignee |
| Description of goods | What each item is, what it is made of and what it is for |
| HS code | The tariff classification number for each item |
| Country of origin | Where each item was made, not where it ships from |
| Quantity and unit | Number of pieces, plus weight if the carrier asks |
| Unit value and line total | Price per unit and quantity times price |
| Currency | The currency of the sale, e.g. USD |
| Incoterm | The terms of sale and a named place, e.g. DAP Toronto |
| Reason for export | Sale, gift, sample, repair, return |
| Freight, insurance, other charges | Listed separately unless included in the prices |
| Total declared value | The sum the buyer actually pays for the goods |
| Signature and declaration | A statement that the information is true, signed and dated |

## The Fields People Get Wrong

**Description.** "Gifts" or "merchandise" will hold a parcel up. Write "Stoneware coffee mugs, 12 oz, glazed" instead. US import rules in [19 CFR 141.86](https://www.law.cornell.edu/cfr/text/19/141.86) ask for a detailed description of each item, its quantity, its price in the currency of the sale and its country of origin; customs offices elsewhere ask for much the same.

**HS code.** The Harmonized System gives every product a 6-digit code that is the same in every country. The [ITA's HS code page](https://www.trade.gov/harmonized-system-hs-codes) explains that the US adds four more digits: exports are classified with the Census Bureau's Schedule B, imports with the Harmonized Tariff Schedule. The first six digits match, so the 6-digit code is what most buyers' customs will read. The ITA notes that including it can speed clearance.

**Country of origin.** This is where the goods were made. A sweater knitted in Peru and sold from a shop in Ohio has Peru as its origin. List the origin on every line, because one parcel can hold goods from several countries.

**Incoterm.** Incoterms are rules published by the International Chamber of Commerce that say who pays for and handles freight, insurance and customs at each stage. The ITA's [Incoterms guide](https://www.trade.gov/know-your-incoterms) says contracts should reference the 2020 rules and that rules such as DAP (Delivered at Place) and DDP (Delivered Duty Paid) need a named place. "DAP Toronto, ON" tells customs and the buyer that you pay to get it there and the buyer pays import duty; "DDP" means you pay the duty too.

**Reason for export.** Pick the one that is true: sale, gift, sample, repair and return, or returned goods. A sale shipped as a "gift" to dodge duty is a false declaration.

**Declared value.** For a sale, it is the price the buyer paid. Show freight and insurance on their own lines unless they are already in the item prices, as the US rules require for imports.

## A Worked Example

A small pottery studio in North Carolina sells stoneware to a café in Toronto and ships it DAP. This is sample data.

| Description | HS code | Origin | Qty | Unit (USD) | Total (USD) |
|---|---|---|---|---|---|
| Stoneware coffee mugs, 12 oz, glazed | 6912.00 | United States | 24 | 18.00 | 432.00 |
| Stoneware serving bowls, 9 in | 6912.00 | United States | 12 | 35.00 | 420.00 |
| Stoneware platters, 14 in | 6912.00 | United States | 6 | 48.00 | 288.00 |
| **Goods subtotal** | | | | | **1,140.00** |
| Freight to Toronto | | | | | 85.00 |
| **Invoice total** | | | | | **1,225.00** |

Header: Invoice CI-2026-118, Nov 9, 2026. Shipper: Cedar Lane Pottery, Asheville, NC. Consignee: Harbourfront Café, Toronto, ON. Currency: USD. Incoterm: DAP Toronto, ON. Reason for export: Sale. Declaration: "I declare that the information on this invoice is true and correct," signed and dated by the owner.

The HS code here is an example; look up your own goods in the Census Bureau's Schedule B search before you ship.

## Do You Also Need to File EEI?

Electronic Export Information is a separate US export filing. The [ITA's EEI page](https://www.trade.gov/electronic-export-information-eei) says it is required when the value under a single Schedule B number is over $2,500, or when the goods need an export license. Shipments from the US to Canada are exempt at any value unless a mandatory filing applies. The example above, at $1,140 of goods under one code and bound for Canada, needs no EEI.

## Commercial Invoice vs. Pro Forma Invoice

A pro forma invoice is a quote sent before the sale, with the items, prices, terms of sale and an estimated ship date. The [ITA's pro forma invoice page](https://www.trade.gov/pro-forma-invoice) lists what goes on it. The commercial invoice goes with the goods once the sale is made and records what was actually shipped and paid for. If quantities or prices changed after the quote, the commercial invoice shows the final figures.

## How to Make One on makecepeit

1. Open the [invoice template](/templates/invoice) and fill in your business as the seller and the consignee as the customer.
2. Add one line per product. Put the HS code and country of origin in each line's description.
3. Add freight and insurance as their own lines if you charge them.
4. In the notes, write the Incoterm with its named place, the reason for export, the currency and the signed declaration.
5. Preview it for free; no account is needed to build it. Downloading takes a free account, and your first download is watermark-free.

FedEx, UPS, DHL and USPS each have their own international shipping forms and rules on how many signed copies to attach or whether you can upload the invoice electronically. Check your carrier's international shipping pages before you print.

This is general information, not legal or customs advice. Requirements depend on the destination country and the goods.`,
    faqs: [
      {
        q: "What is a commercial invoice used for?",
        a: "Customs in the destination country uses it to clear the shipment and calculate duties and taxes. The International Trade Administration says it is required for export and import clearance.",
      },
      {
        q: "What is the format for a commercial invoice?",
        a: "Seller and buyer details, invoice number and date, a line for each item with description, HS code, country of origin, quantity, unit value and total, then the currency, Incoterm, reason for export, freight and other charges, the total value and a signed declaration.",
      },
      {
        q: "Can I use my own commercial invoice instead of the carrier's form?",
        a: "Most countries accept the exporter's own invoice if it contains all the required information, according to the International Trade Administration. A few countries require a specific form, and carriers have their own rules, so check before shipping.",
      },
      {
        q: "Where do I find the HS code for my product?",
        a: "For US exports, search the Census Bureau's Schedule B. The first six digits are the international HS code that the destination's customs will read.",
      },
      {
        q: "What value do I declare on a commercial invoice?",
        a: "For a sale, the price the buyer actually paid, in the currency of the sale. List freight and insurance separately unless they are already included in the item prices.",
      },
    ],
  },
];
