/**
 * Cadence — Day 2026-10-19, slot b (14:00Z). Writer B batch.
 * Keyword gate (DataForSEO, US, 2026-10-11): no makecepeit page ranks.
 *   "delivery receipt"   590/mo · creation intent for small businesses
 *                                 (proof of delivery they hand to a customer)
 *   -> /templates/sales-receipt, /create
 *
 * No regulated claims: describes a business's own proof-of-delivery record.
 * Carrier bills of lading and freight claim rules are deliberately left out
 * because they vary by carrier and contract.
 * Facts checked 2026-10-11: none required (no legal/tax/bank claims made).
 */

export const OCT_19B_DELIVERY_RECEIPT = [
  {
    slug: "delivery-receipt",
    image: "assets/delivery-receipt.jpeg",
    category: "small-business",
    publishedAt: "2026-10-19T14:00:00Z",
    title: "Delivery Receipt: What to Record and How to Write One",
    seoTitle: "Delivery Receipt: What to Record and How to Write One",
    seoDescription:
      "How to write a delivery receipt: order number, items and quantities, condition notes, date and time, and the recipient's signature, with a worked example.",
    excerpt:
      "A delivery receipt is the record that goods reached the customer, in what quantity and condition, signed by whoever accepted them. Here are the fields, a worked example and how to handle damage or shortages.",
    body: `**A delivery receipt is a document the person receiving goods signs to confirm what arrived, how many, in what condition, and when.** It protects the seller if the customer later says something was missing or damaged, and it protects the customer by recording any problem at the door. It should list the order or invoice number, each item and quantity, condition notes, the delivery address, date and time, and the recipient's printed name and signature. You can lay one out with our [sales receipt template](/templates/sales-receipt).

A delivery receipt is often called proof of delivery. It is a different record from a payment receipt: one proves the goods arrived, the other proves the money did. Many small businesses combine them on one page when the customer pays on delivery.

## What a Delivery Receipt Includes

| Field | Example |
|---|---|
| Your business name and contact | Oakline Furniture, (555) 010-4471 |
| Delivery receipt number | DR-0318 |
| Order or invoice number | INV-2207 |
| Delivery date and time | Oct 19, 2026, 2:40 pm |
| Delivered to (name and address) | Priya Shah, 14 Birch Rd, Apt 3 |
| Items and quantities | 1 dining table, 6 chairs |
| Condition on arrival | Good, no visible damage |
| Delivered by | Driver name or carrier |
| Received by | Printed name and signature |
| Payment collected, if any | $0.00 (paid online) or amount and method |

The quantity line matters most. Write the count you are handing over, not the count on the order, so a short shipment shows up right away.

## A Worked Example

| Item | Ordered | Delivered | Price | Condition |
|---|---|---|---|---|
| Oak dining table | 1 | 1 | $640.00 | Good |
| Oak dining chair | 6 | 6 | $540.00 ($90 each) | 1 chair: scuff on left leg |
| Assembly hardware kit | 1 | 1 | Included | Good |

Notes: Chair scuff noted by customer at delivery. Replacement leg to be sent.

Received by: Priya Shah. Signature. Oct 19, 2026, 2:40 pm.

The note costs nothing to write and settles the question later. Without it, a scuffed chair reported three days afterwards becomes a disagreement about who caused it.

## How to Write One, Step by Step

1. **Prepare it before you leave.** Fill in the business details, receipt number, order number, address and item list from the order.
2. **Count at the door.** Unload, count each line with the customer and write the delivered quantity.
3. **Check condition together.** Open or inspect anything the customer wants to see. Write any damage, however small, in the condition column.
4. **Record the time.** Date and time of handover, written by hand or stamped by your app.
5. **Get the signature.** The person accepting signs and prints their name. If it is not the customer, write who they are, such as "neighbor" or "front desk".
6. **Leave a copy.** The customer keeps one, you keep one. A photo of the signed page works if you have no carbon copy.
7. **Attach it to the invoice.** File the delivery receipt with the matching invoice so the two can be found together.

## When Nobody Is Home

If you leave goods without a signature, the receipt should say so: "Left at front door, no signature, photo taken 2:40 pm." Take a photo showing the items and the house number. That is weaker than a signature, so agree in advance with the customer whether unattended delivery is allowed.

## Damage, Shortages and Refusals

- **Damage:** describe it in the condition column and have the customer initial the note.
- **Short delivery:** write the delivered count and "balance to follow" on that line.
- **Refused item:** note "refused by customer" and the reason, and take the item back.
- **Payment on delivery:** add the amount collected, the method and a payment receipt number. If it is a partial payment, show the balance still owed.

## Delivery Receipt vs. Sales Receipt vs. Invoice

| Document | Proves |
|---|---|
| Invoice | What the customer owes |
| Delivery receipt | What the customer received, and its condition |
| [Sales receipt](/templates/sales-receipt) | What the customer paid |

For a cash-on-delivery sale, a single page with the item lines, the condition notes, the amount paid and a signature does all three jobs.

## Making a Delivery Receipt

Our [sales receipt template](/templates/sales-receipt) handles the item lines, quantities and totals. Put the order number and delivery date in the header and the condition notes and signature line in the footer. If you want to start from a blank layout, use the [receipt builder](/create). Building and previewing are free; a watermark-free download needs an account.`,
    faqs: [
      {
        q: "What is a delivery receipt?",
        a: "A document signed by the person receiving goods that confirms what arrived, the quantities, the condition and the date and time of delivery.",
      },
      {
        q: "Is a delivery receipt the same as proof of delivery?",
        a: "Yes, the terms are used interchangeably for a signed record that goods were handed over.",
      },
      {
        q: "What should a delivery receipt include?",
        a: "Business details, a receipt number, the order or invoice number, delivery address, date and time, each item with quantity and condition, who delivered it, and the recipient's printed name and signature.",
      },
      {
        q: "Who signs a delivery receipt?",
        a: "The person who accepts the goods. If that is not the customer, note who they are, such as a neighbor or receptionist.",
      },
      {
        q: "What if the goods arrive damaged?",
        a: "Describe the damage on the receipt before anyone signs, have the recipient initial it, and take photos.",
      },
      {
        q: "Should the customer sign if something is missing?",
        a: "Yes, but only after the delivered quantity is written correctly and the shortage is noted. A signature should confirm what actually arrived.",
      },
      {
        q: "Is a delivery receipt the same as a sales receipt?",
        a: "No. A delivery receipt proves the goods arrived. A sales receipt proves payment. They can be combined for cash-on-delivery sales.",
      },
      {
        q: "Can a delivery receipt be digital?",
        a: "Yes. A signature captured on a phone or tablet with the date and time works, as long as both sides can get a copy.",
      },
      {
        q: "How long should I keep delivery receipts?",
        a: "Keep them with the matching invoice for as long as you keep your sales records, and longer if there is a warranty or a dispute.",
      },
      {
        q: "What if no one is home to sign?",
        a: "Only leave goods if the customer agreed to it. Note the time and place on the receipt and take a photo showing the items and address.",
      },
    ],
  },
];
