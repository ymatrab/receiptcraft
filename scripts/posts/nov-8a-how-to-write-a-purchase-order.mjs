/**
 * Cadence — Day 2026-11-08, post 1 of 2 (09:30Z). Purchase order cluster pillar.
 * Elliot writers test (writer A).
 * Keyword gate (orchestrator brief, DataForSEO US, 2026-10-13): no makecepeit page ranks.
 *   "what is a purchase order"   12,100/mo
 *   "purchase order"              9,900/mo
 *   -> /templates/invoice (owner: the supplier bills against the PO there;
 *      buyers write the PO from the post; the builder heading is not editable), sister posts
 *      /blog/purchase-order-vs-invoice (Nov 8, 14:00Z) and
 *      /blog/purchase-order-number (Nov 10)
 *
 * Product check 2026-10-13: /templates/invoice opens /create?template=invoice
 * in the section builder; the header's title text is editable and the
 * two-column info block has "+ Add line" for custom label/value rows
 * (components/builder/SectionBuilder.tsx). No dedicated PO template exists,
 * and the header title is NOT editable (checked on main 2026-10-13), so the
 * post never tells buyers to retitle the invoice.
 *
 * Facts checked 2026-10-13:
 *   - FAR 2.101: a purchase order, when issued by the Government, is an offer
 *     by the Government to buy supplies or services upon specified terms and
 *     conditions, using simplified acquisition procedures.
 *     https://www.acquisition.gov/far/2.101
 *   - UCC 2-206(1)(b): an order to buy goods for prompt or current shipment
 *     invites acceptance by a prompt promise to ship or by prompt shipment.
 *     https://www.law.cornell.edu/ucc/2/2-206
 * PO fields and the PO -> invoice -> receipt flow are described as common
 * practice, not as a legal requirement. Sample businesses are fictional.
 */

export const NOV_8A_HOW_TO_WRITE_A_PURCHASE_ORDER = [
  {
    slug: "how-to-write-a-purchase-order",
    image: "assets/how-to-write-a-purchase-order.jpeg",
    category: "how-to",
    publishedAt: "2026-11-08T09:30:00Z",
    title: "How to Write a Purchase Order: Every Field, With an Example",
    seoTitle: "How to Write a Purchase Order (Field by Field + Example)",
    seoDescription:
      "What a purchase order is and how to write one: PO number, vendor, ship-to, line items, terms and approval, plus a worked example and the PO-to-invoice flow.",
    excerpt:
      "A purchase order is the buyer's written order to a supplier. Here is what goes on one, field by field, a finished example you can copy, and how the PO connects to the invoice and the receipt that follow.",
    body: `**A purchase order (PO) is a document a buyer sends to a supplier to order goods or services at an agreed price. To write one, give it a unique PO number and date, name the buyer and the vendor, say where to deliver, list each item with quantity, unit price and line total, and state the payment and delivery terms before someone with authority approves it.** Once the supplier accepts it, the PO number follows the order all the way to the invoice and the receipt.

If you are the supplier, you bill against a PO with an invoice that quotes its number; our [invoice template](/templates/invoice) has the bill-to block, invoice number, terms and amount due ready, and you can add a "PO number" line to the details block. If you are the buyer and do not use purchasing software, write the PO from the field list and example below in a document or spreadsheet; makecepeit does not have a purchase order template yet.

## What a Purchase Order Does

A PO puts an order in writing before any goods ship or work starts. It tells the supplier exactly what you want and what you will pay, and it gives your own team a record of what was approved.

In legal terms, a PO is usually an offer. The federal acquisition rules define a government purchase order as an [offer to buy supplies or services on specified terms](https://www.acquisition.gov/far/2.101), and under the Uniform Commercial Code an order for prompt shipment [can be accepted](https://www.law.cornell.edu/ucc/2/2-206) by the seller promising to ship or simply shipping. So once the supplier accepts, both sides are working from the same terms. This is general information, not legal advice.

## The Fields on a Purchase Order

| Field | What to write | Why it matters |
|---|---|---|
| PO number | A unique number, e.g. PO-2026-0112 | The supplier quotes it on the invoice so you can match it |
| PO date | The day you issue it | Starts the clock on delivery and terms |
| Buyer | Company name, billing address, contact | Who is ordering and who gets the invoice |
| Vendor | Supplier name, address, contact | Who the order is for |
| Ship to | Delivery address and contact, if different | Where the goods go |
| Delivery date | The date you need it by | Sets the supplier's deadline |
| Line items | Item or SKU, description, quantity, unit price, line total | The heart of the order; vague lines cause disputes |
| Subtotal, shipping, tax, total | Each on its own line | The amount you are committing to |
| Payment terms | e.g. Net 30 | When you will pay after invoicing |
| Shipping terms | Who pays freight, how it ships | Avoids surprise freight charges |
| Notes | e.g. "Quote this PO number on your invoice" | Keeps invoices traceable |
| Approval | Name, title and signature or sign-off | Shows the purchase was authorized |

Use the supplier's own SKU or quote number on each line where you have one. It is the fastest way to make sure you get the exact item you priced.

## How to Write a Purchase Order, Step by Step

1. **Get a quote first.** Confirm price, quantity and lead time with the supplier, and keep the quote number.
2. **Take the next PO number** from your log. Our guide to [purchase order numbering](/blog/purchase-order-number) covers formats that stay clean.
3. **Fill in the buyer, vendor and ship-to blocks.** Add a named contact on each side.
4. **List every item on its own line** with quantity, unit price and line total. Multiply each line yourself and check it.
5. **Add subtotal, shipping and tax, then the total.** If you do not know the tax, say so in the notes; the supplier's invoice will show it.
6. **State payment terms, shipping terms and the delivery date.**
7. **Get it approved** by whoever signs off on spending, then send it to the supplier.
8. **Ask the supplier to confirm** in writing, and file the PO with its confirmation.

## A Worked Example

Sample data: a fictional bakery orders packaging from a fictional supplier.

> **PURCHASE ORDER PO-2026-0112** · Issued Nov 3, 2026
> **Buyer:** Maple Street Bakery, 18 Maple St, Burlington, VT 05401 · Contact: Dana Reyes
> **Vendor:** Hillside Paper Supply, 940 Industrial Pkwy, Albany, NY 12205
> **Ship to:** Same as buyer, rear loading door · **Deliver by:** Nov 12, 2026

| Item | Qty | Unit price | Line total |
|---|---|---|---|
| 12 oz paper cups, case of 1,000 | 4 | $62.00 | $248.00 |
| Lids for 12 oz cups, case of 1,000 | 4 | $38.00 | $152.00 |
| Kraft bakery bags, case of 500 | 2 | $45.50 | $91.00 |
| **Subtotal** | | | **$491.00** |
| Shipping (flat rate per quote Q-7781) | | | $25.00 |
| **PO total** | | | **$516.00** |

> **Terms:** Net 30 from invoice date · **Notes:** Quote PO-2026-0112 on your invoice. · **Approved by:** Dana Reyes, Owner

Every line multiplies out, and the total is the subtotal plus shipping. That is the figure the bakery expects to see on the invoice.

## From Purchase Order to Invoice to Receipt

| Step | Document | Who sends it | What it proves |
|---|---|---|---|
| 1 | Purchase order | Buyer | What was ordered and at what price |
| 2 | Order confirmation | Supplier | The supplier accepted those terms |
| 3 | Packing slip or delivery note | Supplier, with the goods | What actually arrived |
| 4 | Invoice | Supplier | How much is owed and by when |
| 5 | Receipt | Supplier, after payment | The money was received |

Before paying, the buyer checks the invoice against the PO and what arrived. That check, called a three-way match, is covered in [purchase order vs. invoice](/blog/purchase-order-vs-invoice). After payment, the supplier can mark the same invoice paid and send it as the receipt.

## Common Mistakes

- **Reusing or skipping PO numbers.** Two orders with one number make the invoice impossible to match.
- **Lines with no unit price.** "Cups, assorted" invites a different item and a different price.
- **No delivery date.** Without one, "late" has no meaning.
- **Changing an order by phone.** Send a revised PO, such as PO-2026-0112-R1, so the paper matches the goods.
- **Sending it unapproved.** A PO signed by someone without authority to spend causes problems on both sides.

This is general information, not legal or accounting advice.`,
    faqs: [
      {
        q: "What is a purchase order?",
        a: "A document a buyer sends to a supplier to order goods or services, listing the items, quantities, prices, delivery details and payment terms. Once the supplier accepts it, it records the agreed order.",
      },
      {
        q: "Who writes a purchase order, the buyer or the seller?",
        a: "The buyer. The seller responds with an order confirmation, ships the goods, and then sends an invoice that quotes the PO number.",
      },
      {
        q: "Is a purchase order legally binding?",
        a: "A PO is usually treated as an offer. Once the supplier accepts it, for example by confirming the order or shipping the goods, the terms generally bind both sides. This is general information, not legal advice.",
      },
      {
        q: "Do small businesses need purchase orders?",
        a: "Not always. They are most useful when someone other than the owner places orders, when orders are large, or when a customer requires one before it will pay an invoice.",
      },
      {
        q: "Can I make a purchase order with makecepeit?",
        a: "Not yet: there is no purchase order template, and the invoice template's heading always reads INVOICE. Use the field list and example above to write the PO. On the supplier side, the invoice template is the right tool: add the PO number as a line in the details block when you bill against the order. Building and previewing need no account; downloading needs a free account, and the first download is watermark-free.",
      },
    ],
  },
];
