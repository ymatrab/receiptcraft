/**
 * Cadence — Day 2026-11-08, post 2 of 2 (14:00Z). Purchase order cluster spoke.
 * Elliot writers test (writer A).
 * Keyword gate (orchestrator brief, DataForSEO US, 2026-10-13): no makecepeit page ranks.
 *   "purchase order vs invoice"   1,300/mo
 *   -> /templates/invoice (owner), /blog/how-to-make-an-invoice (Oct 15),
 *      /blog/how-to-write-a-purchase-order (Nov 8, 09:30Z, earlier slot)
 *
 * Facts checked 2026-10-13:
 *   - FAR 2.101: a government purchase order is an offer by the Government to
 *     buy supplies or services upon specified terms and conditions.
 *     https://www.acquisition.gov/far/2.101
 *   - FAR 32.905(a): payment is based on receipt of a proper invoice and
 *     satisfactory contract performance; 32.905(c): invoice payments must be
 *     supported by a receiving report or other Government documentation
 *     authorizing payment; 32.905(b)(1)(iii): a proper invoice includes the
 *     contract number or other authorization, including order number and
 *     line item number.
 *     https://www.acquisition.gov/far/32.905
 * Three-way match is described as common accounts payable practice, with the
 * federal rule given as one concrete example of it. Sample businesses are
 * fictional and the example figures add up.
 */

export const NOV_8B_PURCHASE_ORDER_VS_INVOICE = [
  {
    slug: "purchase-order-vs-invoice",
    image: "assets/purchase-order-vs-invoice.jpeg",
    category: "basics",
    publishedAt: "2026-11-08T14:00:00Z",
    title: "Purchase Order vs. Invoice: Who Sends Which, and When",
    seoTitle: "Purchase Order vs. Invoice: Key Differences and Example",
    seoDescription:
      "A purchase order is the buyer's order; an invoice is the seller's bill. Side-by-side comparison, the order they come in, and how the three-way match works.",
    excerpt:
      "The buyer sends the purchase order before anything ships. The seller sends the invoice after delivering. Here is the full comparison, the order the documents move in, and how a buyer checks one against the other before paying.",
    body: `**A purchase order is sent by the buyer to the seller before delivery, to order goods or services at an agreed price. An invoice is sent by the seller to the buyer after delivery, to ask for payment, and it usually quotes the buyer's PO number so the two can be matched.** The PO commits the buyer to the order; the invoice says how much is now owed and by when.

If you are the seller billing against a PO, our [invoice template](/templates/invoice) has the bill-to block, invoice number, terms, due date and amount due laid out, and you can add a "PO number" line to the details. For the buyer's side, see [how to write a purchase order](/blog/how-to-write-a-purchase-order).

## Purchase Order vs. Invoice at a Glance

| | Purchase order | Invoice |
|---|---|---|
| Sent by | Buyer | Seller |
| Sent to | Seller | Buyer |
| When | Before goods ship or work starts | After delivery or on the agreed billing date |
| Purpose | Orders goods or services on stated terms | Requests payment for what was delivered |
| Its own number | PO number, set by the buyer | Invoice number, set by the seller |
| References | The seller's quote, if any | The buyer's PO number |
| Amounts | What the buyer expects to pay | What the seller says is owed |
| Key dates | Order date, delivery date | Issue date, due date |
| In the books | Usually a commitment, not yet a bill | Creates a payable for the buyer and a receivable for the seller |

The federal acquisition rules describe a government purchase order as an [offer to buy supplies or services on specified terms](https://www.acquisition.gov/far/2.101). An invoice is the bill that follows once those terms have been met.

## Who Sends Which, and When

The documents move in a set order. Skipping one is how invoices end up stuck in a client's accounts payable queue.

1. **Quote** (seller, optional): the price and lead time.
2. **Purchase order** (buyer): the order, with a PO number.
3. **Order confirmation** (seller): the order is accepted.
4. **Delivery** with a packing slip (seller): what shipped.
5. **Invoice** (seller): the bill, quoting the PO number.
6. **Payment** (buyer), then a **receipt** (seller) if the buyer wants proof it was received.

A quote or [estimate](/blog/estimate-vs-invoice) can come before the PO. A [receipt](/blog/receipt-vs-invoice) comes after the invoice is paid.

## What Each Document Contains

Both list the same items, which is the point. They differ in who is speaking and what they ask for.

**A purchase order** has the PO number and date, the buyer and vendor, a ship-to address, the delivery date, each line item with quantity and unit price, the total, payment and shipping terms, and an approval.

**An invoice** has the seller's details, the buyer under "bill to", an invoice number, the issue and due dates, the same line items as delivered, any tax, the amount due, payment terms and how to pay. When there is a PO, it carries the PO number too. Our guide on [how to make an invoice](/blog/how-to-make-an-invoice) walks through each field.

## The Three-Way Match

Before paying, many buyers compare three documents line by line:

| Document | Answers |
|---|---|
| Purchase order | What did we order, and at what price? |
| Receiving record (packing slip or receiving report) | What actually arrived? |
| Invoice | What is the seller charging? |

If quantities and prices agree across all three, the invoice is approved. If not, it goes back for a correction before anyone pays. Some buyers only compare the PO and invoice (a two-way match); others add an inspection report (a four-way match).

The federal government works this way. Under the Federal Acquisition Regulation, [payment is based on a proper invoice](https://www.acquisition.gov/far/32.905) supported by a receiving report or other documentation, and a proper invoice must include the contract or order number and the line item number. Large private buyers often follow the same pattern.

## Example: a Match That Fails

Sample data: a fictional bakery ordered packaging from a fictional supplier on PO-2026-0112.

| Line | PO | Received | Invoiced |
|---|---|---|---|
| Paper cups, case of 1,000 at $62.00 | 4 | 4 | 4 · $248.00 |
| Lids, case of 1,000 at $38.00 | 4 | 3 | 4 · $152.00 |
| Bakery bags, case of 500 at $45.50 | 2 | 2 | 2 · $91.00 |
| Shipping | $25.00 | | $25.00 |
| **Total** | **$516.00** | | **$516.00** |

The invoice matches the PO, but only three cases of lids arrived. The bakery holds payment and asks for a corrected invoice: one less case of lids ($38.00) brings it to $478.00 ($248.00 + $114.00 + $91.00 + $25.00). The supplier either ships the missing case and bills it later or issues the corrected invoice now, under a new invoice number that references the old one.

## When You Need Both, and When You Don't

Every sale that is paid on terms needs an invoice. A purchase order is the buyer's choice. Small businesses often order by email or phone and skip POs entirely, and that is fine when one person both orders and pays.

POs earn their keep when the person ordering is not the person paying, when orders are large or recurring, or when a business has to show who approved each purchase. If you sell to a company, school or government agency, expect to receive one, and ask for the PO number before you send your first invoice. Without it, your bill may sit unpaid until someone matches it by hand.

## Tips for Sellers Billing Against a PO

- **Copy the PO number exactly,** including any prefix, into a labeled field near your invoice number.
- **Use the buyer's line descriptions and units** so each invoice line maps to a PO line.
- **Invoice what shipped,** not what was ordered, if the two differ.
- **Send it to the address on the PO,** often a dedicated accounts payable inbox.
- **Keep your own invoice number.** The PO number is a reference; it never replaces your sequence.

This is general information, not legal or accounting advice.`,
    faqs: [
      {
        q: "What is the main difference between a purchase order and an invoice?",
        a: "A purchase order is the buyer's order, sent before delivery. An invoice is the seller's request for payment, sent after delivery.",
      },
      {
        q: "Does a purchase order come before an invoice?",
        a: "Yes. The buyer issues the PO first; the seller invoices after delivering, quoting the PO number.",
      },
      {
        q: "Can an invoice be used as a purchase order?",
        a: "No. They come from opposite sides. A pro forma invoice can serve as a quote before an order, but the buyer still places the order, often with a PO.",
      },
      {
        q: "What is a three-way match?",
        a: "Before paying, the buyer compares the purchase order, the receiving record and the invoice. If quantities and prices agree, the invoice is approved for payment.",
      },
      {
        q: "Do I need a PO number to send an invoice?",
        a: "Only if the client uses purchase orders. Many companies will not pay an invoice without one, so ask for it before you bill.",
      },
    ],
  },
];
