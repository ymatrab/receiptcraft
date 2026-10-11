/**
 * Cadence — Day 2026-10-29, post 1 of 2 (09:30Z). Invoice cluster spoke.
 * Keyword gate checked 2026-10-11 (DataForSEO, US): no makecepeit page ranks.
 *   "invoice payment terms"   590/mo
 *   "net 30 invoice"          320/mo
 *   "late fee on invoice"     140/mo
 *   -> /templates/invoice (owner), /blog/how-to-make-an-invoice (Oct 15),
 *      /blog/how-to-send-an-invoice (Oct 23), /blog/invoice-number (Oct 25)
 *
 * Facts checked 2026-10-11:
 *   - SBA blog "How Net 30 Accounts Help Conserve Business Cash Flow": net 30
 *     defers payment for 30 days; suppliers often offer early-payment discounts.
 *     https://www.sba.gov/blog/how-net-30-accounts-help-conserve-business-cash-flow
 * Late fees: stated only as "agree in advance" + "state law may limit interest
 * and late charges, check your state". No state rates or caps given, because
 * none were verified. The 1.5%/month figure is labeled as an example only.
 */

export const OCT_29A_INVOICE_PAYMENT_TERMS = [
  {
    slug: "invoice-payment-terms",
    image: "assets/invoice-payment-terms.jpeg",
    category: "small-business",
    publishedAt: "2026-10-29T09:30:00Z",
    title: "Invoice Payment Terms: Net 30, 2/10 Net 30 and Late Fees",
    seoTitle: "Invoice Payment Terms: Net 30, Discounts and Late Fees",
    seoDescription:
      "Invoice payment terms explained: due on receipt, Net 15, Net 30, 2/10 net 30 early-pay discounts, and how to state a late fee your client agreed to.",
    excerpt:
      "Payment terms tell a client when an invoice is due and what happens if it is early or late. Here is what Net 30, due on receipt and 2/10 net 30 mean, the math behind each, and how to word a late fee.",
    body: `**Invoice payment terms state when an invoice must be paid and on what conditions. "Net 30" means the full amount is due 30 days after the invoice date; "due on receipt" means it is due immediately; "2/10 net 30" means the client may take a 2% discount if they pay within 10 days, otherwise the full amount is due in 30.** Write the terms and the actual due date on every invoice, and agree any late fee with the client before the work starts.

Our [invoice template](/templates/invoice) has an issue date, a due date and space for the terms under the total. For the rest of the layout, see [how to make an invoice](/blog/how-to-make-an-invoice).

## Common Payment Terms

| Term | Meaning | Typical use |
|---|---|---|
| Due on receipt | Pay when the invoice arrives | Small one-off jobs, consumer work |
| Net 7 / Net 10 | Due 7 or 10 days after the invoice date | Freelancers who want fast turnaround |
| Net 15 | Due in 15 days | Small business clients |
| Net 30 | Due in 30 days | The default for many business clients |
| Net 60 / Net 90 | Due in 60 or 90 days | Large companies that set their own supplier terms |
| 2/10 net 30 | 2% off if paid in 10 days, else full amount in 30 | Encouraging early payment |
| EOM / Net 30 EOM | Due at the end of the month, or 30 days after it | Clients who pay in a monthly batch |
| 50% upfront | Half before work starts, balance on delivery | Projects with materials or long timelines |

The SBA describes [net 30 accounts](https://www.sba.gov/blog/how-net-30-accounts-help-conserve-business-cash-flow) as a form of trade credit, letting a buyer defer payment for 30 days, and notes that many suppliers offer discounts for early payment. That cuts both ways: when you are the supplier, Net 30 is credit you are extending.

## How the Days Are Counted

Net terms run from the **invoice date**, not the date the client opens it. An invoice dated October 29 on Net 30 is due November 28. Two habits prevent arguments:

1. Send the invoice the day you date it.
2. Write the calendar due date next to the terms: "Net 30, due Nov 28, 2026".

## Early Payment Discounts: 2/10 Net 30

A worked example: invoice INV-1215 for a $2,500.00 kitchen cabinet installation, dated October 29, 2026, on 2/10 net 30:

| If the client pays | They pay |
|---|---|
| By November 8 (within 10 days) | $2,450.00 ($2,500 minus 2% = $50 off) |
| By November 28 (within 30 days) | $2,500.00 |

Is it worth offering? A 2% discount for paying 20 days sooner is expensive money for you. It makes sense when cash now matters more than margin, or when a slow-paying client needs a reason to move your invoice up the pile. If you offer it, state the discounted amount and its deadline on the invoice so nobody has to calculate.

## Late Fees

A late fee is only fair, and usually only collectable, if the client agreed to it before the work started. Put it in your contract, quote or signed estimate, then repeat it on every invoice.

How to word it, as an example:

> Payment due within 30 days of the invoice date. Balances unpaid after the due date incur a late fee of 1.5% per month, as agreed in our service agreement dated Sept 15, 2026.

Some ground rules:

- **Agree it first.** Adding a fee to an invoice the client never agreed to invites a dispute and rarely gets paid.
- **Pick a flat fee or a percentage,** not both. A flat fee (e.g. $25) is simpler on small invoices.
- **Check your state's rules before charging interest.** State law can limit interest rates and late charges, and consumer transactions often have extra protections. Your state attorney general's office or a business attorney can tell you what applies. The 1.5% above is an example, not a recommendation.
- **Apply it consistently,** or not at all. Waiving it once is fine; charging some clients and not others causes friction.

## Which Terms Should You Use?

| Your situation | A sensible starting point |
|---|---|
| New client, small job | Due on receipt or Net 7 |
| Regular business client | Net 15 or Net 30 |
| Large project with materials | 50% deposit, balance Net 15 |
| Client asks for Net 60 | Agree only if the price reflects the wait |

Whatever you choose, write it on the quote before the work, on the invoice after it, and in the email when you [send the invoice](/blog/how-to-send-an-invoice). Give each invoice its own [invoice number](/blog/invoice-number) so payments, discounts and late fees can be matched to the right one.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "What does Net 30 mean on an invoice?",
        a: "The full amount is due 30 days after the invoice date. An invoice dated October 29 on Net 30 is due November 28.",
      },
      {
        q: "What does 2/10 net 30 mean?",
        a: "The client can take a 2% discount if they pay within 10 days of the invoice date. Otherwise the full amount is due within 30 days.",
      },
      {
        q: "What does due on receipt mean?",
        a: "The invoice should be paid as soon as the client receives it. In practice many clients treat it as within a few days.",
      },
      {
        q: "Do net 30 days start when the client receives the invoice?",
        a: "They normally run from the invoice date. Send the invoice the same day you date it, and write the calendar due date on it.",
      },
      {
        q: "Can I charge a late fee on an invoice?",
        a: "Only reliably if the client agreed to it before the work began, in a contract or signed quote. State law may limit interest and late charges, so check your state's rules.",
      },
      {
        q: "How do I write a late fee on an invoice?",
        a: "State the fee and when it applies, and reference the agreement it comes from, for example: balances unpaid after the due date incur a fee as agreed in our service agreement.",
      },
      {
        q: "What are the most common invoice payment terms?",
        a: "Due on receipt, Net 15 and Net 30 are the most common for small businesses. Large companies often set Net 60 or Net 90 for their suppliers.",
      },
      {
        q: "Should I offer an early payment discount?",
        a: "Only if getting paid sooner is worth the discount to you. A 2% discount for paying 20 days early is a costly way to borrow.",
      },
      {
        q: "Where do payment terms go on an invoice?",
        a: "Near the due date at the top, and repeated under the total along with how to pay.",
      },
      {
        q: "Can I change payment terms for an existing client?",
        a: "Yes, with notice. Tell the client in writing before the next job and apply the new terms only to invoices after that date.",
      },
    ],
  },
];
