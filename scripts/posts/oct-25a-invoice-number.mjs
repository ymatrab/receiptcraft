/**
 * Cadence — Day 2026-10-25, post 1 of 2 (09:30Z). Invoice cluster spoke.
 * Keyword gate checked 2026-10-11 (DataForSEO, US): no makecepeit page ranks.
 *   "invoice number"           1,900/mo
 *   "how to number invoices"     170/mo
 *   -> /templates/invoice (owner), /blog/how-to-make-an-invoice (Oct 15),
 *      /blog/how-to-number-receipts, /blog/how-to-send-an-invoice (Oct 23)
 *
 * Facts checked 2026-10-11:
 *   - IRS "What kind of records should I keep" lists invoices among
 *     supporting documents for gross receipts.
 *     https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep
 * Sequential numbering is framed as practice, not law; no claim either way
 * about a legal format requirement.
 */

export const OCT_25A_INVOICE_NUMBER = [
  {
    slug: "invoice-number",
    image: "assets/invoice-number.jpeg",
    category: "basics",
    publishedAt: "2026-10-25T09:30:00Z",
    title: "Invoice Number: What It Is and How to Number Invoices",
    seoTitle: "Invoice Number: What It Is and How to Number Invoices",
    seoDescription:
      "An invoice number is a unique ID for each invoice you send. Four numbering schemes, how to pick one, and what to do with voided or corrected invoices.",
    excerpt:
      "Every invoice needs its own number, and the scheme you choose on day one follows you for years. Here are four ways to number invoices, the rules that keep the sequence clean, and how to handle a voided invoice.",
    body: `**An invoice number is a unique identifier you give each invoice so that you and your client can track it, match it to a payment and find it later. The simplest way to number invoices is sequentially, such as 1001, 1002, 1003, using each number once, never reusing it and not skipping numbers.** Put it near the top of the invoice, next to the issue date, and quote it in every email about that invoice.

Our [invoice template](/templates/invoice) has an invoice number field beside the issue and due dates. For the full layout, see [how to make an invoice](/blog/how-to-make-an-invoice).

## Why the Number Matters

- **Clients pay by it.** Accounts payable teams match each payment to an invoice number. A missing or repeated number stalls payment.
- **You reconcile by it.** When a deposit of $450 lands, the reference INV-2026-0047 tells you which job it paid.
- **It proves completeness.** An unbroken sequence shows every invoice is accounted for, which helps if your books are ever reviewed. The IRS lists invoices among the [supporting documents for gross receipts](https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep) a business should keep.

Whatever format you pick, two things matter: each number is unique, and you can produce the invoice behind it.

## Four Ways to Number Invoices

| Scheme | Example | Best for |
|---|---|---|
| Plain sequence | 1001, 1002, 1003 | Most freelancers and small businesses |
| Year prefix | 2026-001, 2026-002 | Anyone who wants to see the year at a glance |
| Client code | NSB-001, NSB-002 | A few large clients billed often |
| Date-based | 20261025-01 | Several invoices a day |

**Plain sequence.** Easiest to keep and easiest to check for gaps. Starting at 1001 rather than 1 is common and perfectly fine.

**Year prefix.** Restarts each January (2027-001). Keeps numbers short and makes year-end filing easy. The full number, prefix included, is still unique.

**Client code.** Useful when a client asks how many invoices you have sent them. Keep a master log as well, or two clients can end up with gaps that are hard to audit.

**Date-based.** The date plus a counter. Works when volume is high, but numbers get long and are easy to mistype.

A letter prefix such as INV- is optional. It helps when a client searches their inbox, and it keeps invoice numbers apart from your [receipt numbers](/blog/how-to-number-receipts) if you issue both.

## How to Number Invoices, Step by Step

1. **Pick one scheme** from the table and write it down.
2. **Choose your starting number,** such as 1001 or 2026-001.
3. **Keep a log** with the number, date, client, amount and status (sent, paid, void).
4. **Take the next number in the log** each time you invoice. Never guess.
5. **Put the number on the invoice, the file name and the email subject,** for example Invoice INV-2026-0047.
6. **Ask clients to quote it** on their payment.

## The Rules That Keep a Sequence Clean

- **Never reuse a number,** even for the same client or a resend. A resend keeps its original number.
- **Do not skip numbers on purpose.** If one gets skipped by mistake, note it in your log ("1047 not used") rather than leaving a silent gap.
- **One number, one invoice.** A deposit invoice and a final invoice for the same job get two numbers.
- **Do not change the scheme mid-year** unless you must. If you do, note the date of the switch in your log.

## Voided and Corrected Invoices

Mistakes happen. Do not delete the invoice or hand its number to a new one.

| Situation | What to do |
|---|---|
| Invoice sent with an error, not yet paid | Mark it VOID, keep it, issue a new invoice with the next number and mention the old one ("Replaces INV-1046") |
| Client was overcharged after paying | Issue a credit note with its own number that references the original invoice |
| Job cancelled before invoicing | Nothing to do; no number was used |
| Number skipped by accident | Record it as unused in your log |

This keeps every number accounted for and gives the client a clear paper trail.

## A Worked Example

A bookkeeper using the year-prefix scheme bills a client for October:

> **Invoice INV-2026-0047** · Issued Oct 31, 2026 · Due Nov 30, 2026
> Monthly bookkeeping, October 2026 · $450.00

Her log for the month reads 0045 (paid), 0046 (void, replaced by 0047), 0047 (sent). When the client's transfer arrives with the reference INV-2026-0047, it matches in one step. When you [send the invoice](/blog/how-to-send-an-invoice), put the same number in the subject line.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "What is an invoice number?",
        a: "A unique identifier assigned to each invoice so the seller and the client can track it, match it to a payment and find it later.",
      },
      {
        q: "How do I number my first invoice?",
        a: "Choose a starting point such as 1001 or 2026-001 and increase it by one for each new invoice.",
      },
      {
        q: "Do invoice numbers have to be sequential?",
        a: "Sequential numbering is the standard practice because it is the easiest way to show every invoice is accounted for and to spot a missing one. Above all, each number must be unique.",
      },
      {
        q: "Can I start invoice numbers at 1001 instead of 1?",
        a: "Yes. Any starting number works as long as each number after it is unique.",
      },
      {
        q: "Should each client have their own invoice numbers?",
        a: "You can add a client code, such as NSB-001, but keep one master log so every number across all clients stays unique.",
      },
      {
        q: "Can two invoices have the same number?",
        a: "No. A duplicate number causes payment matching errors for your client and gaps in your own records.",
      },
      {
        q: "What do I do if I made a mistake on an invoice?",
        a: "If it is unpaid, mark it void, keep it, and issue a new invoice with the next number that says which invoice it replaces.",
      },
      {
        q: "Is a credit note numbered like an invoice?",
        a: "It gets its own unique number, often with a CN- prefix, and references the invoice it adjusts.",
      },
      {
        q: "Where does the invoice number go?",
        a: "Near the top, next to the issue date and due date. Repeat it in the file name and the email subject line.",
      },
      {
        q: "Should invoice numbers and receipt numbers be separate?",
        a: "Yes. Using different prefixes, such as INV- and R-, keeps the two sequences apart and easy to search.",
      },
    ],
  },
];
