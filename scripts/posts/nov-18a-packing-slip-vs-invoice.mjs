/**
 * Cadence — Day 2026-11-18, post 1 of 2 (09:30Z). Invoice cluster spoke.
 * Elliot writers test (writer F).
 * Keyword gate (orchestrator brief): "packing slip" (what goes on one, packing slip
 *   vs invoice vs commercial invoice). Demand evidence: Google autocomplete
 *   2026-10-13; no makecepeit page ranks for it in Search Console.
 *   -> /templates/invoice (owner: the invoice that travels separately),
 *      /blog/commercial-invoice (Nov 10)
 *
 * Product check 2026-10-13: there is no packing slip template and the builder's header
 * title is not editable, so the post does not offer one. It links the invoice
 * template only for the invoice.
 *
 * Facts checked 2026-10-13:
 *   - trade.gov "Packing List": itemizes the contents of each package (box, pallet);
 *     includes weights, measurements and detailed lists of the goods in each package;
 *     used by forwarders to estimate weights/costs and by customs to check contents;
 *     can go inside the carton or be attached outside with a copy inside.
 *     https://www.trade.gov/packing-list
 *   - 19 CFR 141.86(e) "Packing list": each invoice of imported merchandise must state
 *     in adequate detail what merchandise is contained in each individual package.
 *     https://www.law.cornell.edu/cfr/text/19/141.86 (eCFR not used)
 * Domestic packing slip contents (no prices, qty ordered/shipped/backordered) are
 * common practice. Sample shop is fictional.
 */

export const NOV_18A_PACKING_SLIP_VS_INVOICE = [
  {
    slug: "packing-slip-vs-invoice",
    image: "assets/packing-slip-vs-invoice.jpeg",
    category: "small-business",
    publishedAt: "2026-11-18T09:30:00Z",
    title: "Packing Slip vs. Invoice: What Goes in the Box and What Doesn't",
    seoTitle: "Packing Slip vs. Invoice: What Goes on Each (Example)",
    seoDescription:
      "What a packing slip is, what to put on one, and how it differs from an invoice and a commercial invoice. With a filled-in example for a small online shop.",
    excerpt:
      "A packing slip lists what is in the box; an invoice lists what the customer owes. Here is what goes on a packing slip, a worked example with a backorder, and where the commercial invoice fits in for international parcels.",
    body: `**A packing slip is the list that ships inside the box: the order number, the ship-to address and each item with the quantity ordered and the quantity actually shipped, usually without prices. An invoice is the bill: it shows prices, tax, the total and when payment is due, and it is often sent separately by email.** The packing slip helps the person opening the box check the delivery; the invoice gets you paid.

For the billing side, our [invoice template](/templates/invoice) has the line items, tax and total ready to fill in. If the parcel is leaving the country, you will also need a commercial invoice for customs, covered field by field in [how to fill out a commercial invoice](/blog/commercial-invoice).

## Packing Slip vs. Invoice vs. Commercial Invoice

| | Packing slip | Invoice | Commercial invoice |
|---|---|---|---|
| Purpose | Confirm what is in the package | Request payment | Declare goods to customs |
| Goes where | Inside or on the box | To the buyer, often by email | With the shipment and to the carrier or broker |
| Shows prices? | Usually not | Yes | Yes, value per item and currency |
| Quantities | Ordered, shipped, backordered | Billed | Shipped, with weights |
| Extra fields | Order number, SKU, box count | Due date, terms, amount due | Country of origin, HS code, terms of sale |
| Needed for | Every order, by habit | Every sale on credit | International shipments |

Leaving prices off the packing slip matters when the box is a gift or goes to a warehouse, a job site or a reception desk rather than to the person who paid.

## What Goes on a Packing Slip

| Field | Example |
|---|---|
| Your business name and return address | Juniper & Pine Candle Co., Portland, OR |
| Order number and order date | #5521, Nov 12, 2026 |
| Ship date and carrier | Nov 13, 2026, USPS Ground Advantage |
| Ship-to name and address | Where the box is going |
| Bill-to name, if different | Who placed the order |
| Item and SKU | "Cedar candle, 8 oz" · JP-CED-8 |
| Quantity ordered | 4 |
| Quantity shipped | 4 |
| Backordered | 0, or the number still to come |
| Box count | Box 1 of 1 |
| Note | Return instructions, or "Gift: prices not shown" |

For large orders, a packing slip per box is easier to check than one for the whole shipment. That is what a packing list does for exporters: the US trade agency describes it as a document that [itemizes the contents of each package](https://www.trade.gov/packing-list), including weights and measurements, and says it can go inside the carton or be attached outside with a copy inside.

## How to Make a Packing Slip

1. **Start from the order**, not from memory. Copy the order number, items and quantities.
2. **Pick and count**, then fill in the quantity shipped for each line.
3. **Mark anything short as backordered** and say when it will follow.
4. **Leave prices off** unless the buyer asked for them.
5. **Add the box count** if the order ships in more than one carton.
6. **Put it in the box** on top of the goods, or in a clear pouch on the outside.
7. **Send the invoice separately** if the order is not already paid.

## A Worked Example

Sample data: a fictional candle shop ships an online order with one item short.

> **PACKING SLIP** · Order #5521 · Ordered Nov 12, 2026 · Shipped Nov 13, 2026
> **From:** Juniper & Pine Candle Co., 88 SE Alder St, Portland, OR 97214
> **Ship to:** Priya Nair, 1406 Elm St, Apt 3, Boise, ID 83702 · Box 1 of 1

| Item | SKU | Ordered | Shipped | Backordered |
|---|---|---|---|---|
| Cedar candle, 8 oz | JP-CED-8 | 4 | 4 | 0 |
| Lavender candle, 8 oz | JP-LAV-8 | 2 | 1 | 1 |
| Brass wick trimmer | JP-TRIM | 1 | 1 | 0 |
| **Units** | | **7** | **6** | **1** |

> **Note:** 1 lavender candle ships separately by Nov 20. Questions? hello@juniperpine.example

The invoice for the same order shows the money instead:

| Item | Qty | Unit price | Amount |
|---|---|---|---|
| Cedar candle, 8 oz | 4 | $24.00 | $96.00 |
| Lavender candle, 8 oz | 2 | $24.00 | $48.00 |
| Brass wick trimmer | 1 | $18.00 | $18.00 |
| Shipping | 1 | $8.50 | $8.50 |
| **Total** | | | **$170.50** |

The slip counts six units in this box; the invoice bills all seven, because the seller has committed to ship the backordered candle. Some shops instead bill only what shipped and invoice the rest when it goes out. Either way, the order number ties the two documents together. (The invoice sample leaves out sales tax, which depends on where the buyer is.)

## Packing Slips on International Parcels

For an export, the packing slip is not enough. Customs works from the commercial invoice, which carries values, country of origin and terms of sale. For goods entering the United States, the import rules go further and require the invoice to [state what is in each individual package](https://www.law.cornell.edu/cfr/text/19/141.86) in adequate detail, which is why exporters often attach a per-box packing list to the commercial invoice. Our [commercial invoice guide](/blog/commercial-invoice) walks through the rest.

## Common Mistakes

- **Prices on a gift order.** Check before you print.
- **No order number.** Without it, the customer cannot match the box to the invoice or the confirmation email.
- **Silent shortages.** A missing item with no backorder note becomes a support ticket.
- **Using the packing slip as the invoice.** If the customer owes money, send an invoice with a due date.

Every packing slip should match a real order and the goods actually in the box.`,
    faqs: [
      {
        q: "What is a packing slip?",
        a: "A list included in a shipment that shows the order number, ship-to address and each item with the quantity ordered and shipped. It lets the recipient check the delivery and usually leaves prices off.",
      },
      {
        q: "Is a packing slip the same as an invoice?",
        a: "No. A packing slip confirms what is in the box. An invoice asks for payment and shows prices, tax, the total and a due date. Many sellers send the invoice by email and put only the packing slip in the box.",
      },
      {
        q: "Does a packing slip show prices?",
        a: "Usually not, so the box can go to a gift recipient or a warehouse without revealing what was paid. Some business buyers ask for prices on it; include them only if asked.",
      },
      {
        q: "What is the difference between a packing slip and a packing list?",
        a: "The terms overlap. Packing slip is the usual name for a small parcel's contents list; packing list is the export term for a per-package list with weights and measurements that travels with the commercial invoice.",
      },
      {
        q: "Can I make the invoice for an order on makecepeit?",
        a: "Yes. The invoice template has line items, tax and a total. Building and previewing need no account; downloading needs a free account.",
      },
    ],
  },
];
