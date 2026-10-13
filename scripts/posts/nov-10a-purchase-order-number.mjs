/**
 * Cadence — Day 2026-11-10, post 1 of 2 (09:30Z). Purchase order cluster spoke.
 * Elliot writers test (writer A).
 * Keyword gate (orchestrator brief, DataForSEO US, 2026-10-13): no makecepeit page ranks.
 *   "purchase order numbering"   2,400/mo
 *   -> /templates/invoice (owner: where the PO number goes on the supplier's
 *      invoice), /blog/invoice-number (Oct 25), /blog/how-to-write-a-purchase-order
 *      (Nov 8)
 *
 * Product check 2026-10-13: the invoice template's two-column details block
 * has "+ Add line", so a "PO number" row can be added beside Invoice # and
 * the dates (components/builder/SectionBuilder.tsx).
 *
 * Facts checked 2026-10-13:
 *   - FAR 32.905(b)(1)(ii)-(iii): a proper invoice to the federal government
 *     includes the invoice date and invoice number, and the contract number or
 *     other authorization, including order number and line item number.
 *     https://www.acquisition.gov/far/32.905
 * Numbering schemes, revision suffixes and the log are framed as practice,
 * not law. No claim about any accounting package's default numbering.
 */

export const NOV_10A_PURCHASE_ORDER_NUMBER = [
  {
    slug: "purchase-order-number",
    image: "assets/purchase-order-number.jpeg",
    category: "basics",
    publishedAt: "2026-11-10T09:30:00Z",
    title: "Purchase Order Numbering: Formats, Rules and Where the PO Number Goes",
    seoTitle: "Purchase Order Numbering: Formats and Rules That Work",
    seoDescription:
      "How to number purchase orders: four formats, rules for a clean sequence, revisions and cancellations, and where the PO number goes on an invoice.",
    excerpt:
      "A PO number is the thread that ties an order to its delivery, invoice and payment. Here are four numbering formats, the rules that keep the sequence clean, and exactly where the number belongs on the supplier's invoice.",
    body: `**A purchase order number is a unique identifier the buyer gives each PO. The simplest scheme is a sequence with a prefix, such as PO-1001, PO-1002, PO-1003, where each number is used once and never reused. The supplier then copies that number onto its invoice, in a labeled field near the invoice number, so the buyer can match the bill to the order.**

If you are the supplier, our [invoice template](/templates/invoice) has the invoice number, dates and amount due in one details block, and you can add a "PO number" line right beside them. If you are the buyer writing the PO itself, start with [how to write a purchase order](/blog/how-to-write-a-purchase-order).

## Four Ways to Number Purchase Orders

| Format | Example | Best for |
|---|---|---|
| Prefix and sequence | PO-1001, PO-1002 | Most small businesses |
| Year and sequence | PO-2026-0001 | Anyone who wants the year visible and a fresh count each January |
| Department or location code | PO-NYC-0042, PO-OPS-0108 | Several people or sites placing orders |
| Date and counter | PO-20261110-01 | Many orders a day |

**Prefix and sequence.** Easy to keep in a spreadsheet and easy to spot a gap. The PO- prefix stops your PO numbers from being confused with invoice or receipt numbers.

**Year and sequence.** Restarts at 0001 each year. Pad the counter to four digits so numbers sort correctly in a file list.

**Department or location code.** Shows at a glance who placed the order. Keep one master log, though, or two departments can run separate sequences that collide.

**Date and counter.** Unique without a central counter, but long. It works best when software assigns it.

Pick one format and keep it. Every PO number, under any scheme, must point to exactly one order.

## The Rules That Keep a PO Sequence Clean

- **One number, one order.** A follow-up order to the same supplier gets the next number.
- **Never reuse a number,** even after a cancellation.
- **Keep a log** with PO number, date, vendor, total, approver and status (open, received, invoiced, closed, cancelled).
- **Take the next number from the log,** not from memory.
- **Mark cancelled POs as cancelled** and tell the supplier in writing. Do not hand the number to a new order.
- **Use a revision suffix for changes,** such as PO-1042-R1, so everyone knows which version is current.

A spreadsheet is enough for a small business. Add columns for the supplier's invoice number and the date paid, and the log doubles as an open-orders list.

## Who Assigns the Number

The buyer always assigns the PO number, never the supplier. In a business with one person ordering, that person keeps the log. Once several people place orders, give one person or one shared spreadsheet the job of handing out numbers, or let your purchasing or accounting software assign them. Two people both reading "next number: 1043" off a sticky note is how duplicates happen.

If you are moving from paper to software, start the new sequence above the last paper number (for example, from PO-1300 if paper ended at PO-1287) and note the switch date in the log. That way no number appears twice across the two systems.

## Choosing a Starting Number

Any starting point works. Many businesses start at 1001 rather than 1 so that every number has the same number of digits for a long while. If you use the year format, start at 0001 each January. What matters is that the first number is written down in the log, so the next person knows where the sequence began.

## Revisions, Cancellations and Blanket POs

| Situation | What to do |
|---|---|
| Quantity or price changes before shipping | Issue PO-1042-R1 with the changes and send it to the supplier |
| Order cancelled | Mark PO-1042 cancelled in the log and confirm with the supplier |
| Partial delivery | Keep the PO open; each invoice quotes the same PO number |
| Repeat orders over a period | Some buyers issue one blanket PO with a spending limit and a date range; each invoice quotes it |

## Where the PO Number Goes on an Invoice

For a supplier, the PO number is a reference, not a replacement for your own invoice number. Put it:

1. **In the invoice header,** labeled "PO number" or "Customer PO", next to the invoice number and dates.
2. **Exactly as the buyer wrote it,** prefix, dashes and revision suffix included.
3. **On each line,** if the PO has line numbers, so each invoice line maps to a PO line.
4. **In the email subject and file name,** for example "Invoice 3381, PO-2026-0112".

Federal buyers spell this out. Under the Federal Acquisition Regulation, a [proper invoice](https://www.acquisition.gov/far/32.905) must include the invoice number and the contract or order number, down to the line item number. Many private buyers print a similar instruction on the PO itself, and an invoice without the number often waits until someone finds it.

Your own invoice numbering stays separate; our guide to the [invoice number](/blog/invoice-number) covers that sequence.

## A Worked Example

Sample data: a fictional bakery numbers its POs by year.

| PO number | Date | Vendor | Total | Status |
|---|---|---|---|---|
| PO-2026-0110 | Oct 28 | Green Valley Dairy | $384.00 | Closed |
| PO-2026-0111 | Oct 30 | Green Valley Dairy | $210.00 | Cancelled |
| PO-2026-0112 | Nov 3 | Hillside Paper Supply | $516.00 | Received |

Hillside's invoice reads "Invoice 3381 · Dated Nov 9, 2026 · PO number PO-2026-0112 · Amount due $516.00 · Due Dec 9, 2026". The bakery finds PO-2026-0112 in its log, checks the delivery against it, and approves payment. PO-2026-0111 stays in the log as cancelled, and its number is never used again.

This is general information, not legal or accounting advice.`,
    faqs: [
      {
        q: "What is a purchase order number?",
        a: "A unique identifier the buyer assigns to each purchase order so the order, delivery, invoice and payment can all be matched to it.",
      },
      {
        q: "How should I format PO numbers?",
        a: "A prefix and a sequence, such as PO-1001, works for most small businesses. Add the year (PO-2026-0001) or a department code if you need more context, but keep each number unique.",
      },
      {
        q: "Where does the PO number go on an invoice?",
        a: "In the invoice header, labeled PO number or Customer PO, next to the supplier's own invoice number and dates. Repeat it in the email subject.",
      },
      {
        q: "Is the PO number the same as the invoice number?",
        a: "No. The buyer sets the PO number; the seller sets the invoice number. The invoice shows both.",
      },
      {
        q: "What happens to the number of a cancelled purchase order?",
        a: "Mark it cancelled in your log and never reuse it, so every number in the sequence stays accounted for.",
      },
    ],
  },
];
