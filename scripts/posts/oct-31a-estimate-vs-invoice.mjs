/**
 * Cadence — Day 2026-10-31, post 1 of 2 (09:30Z). Invoice cluster spoke.
 * Keyword gate checked 2026-10-11 (DataForSEO, US): no makecepeit page ranks.
 *   "estimate vs invoice"   210/mo
 *   -> /templates/invoice (owner), /templates/plumbing-invoice,
 *      /blog/how-to-make-an-invoice (Oct 15), /blog/invoice-payment-terms (Oct 29),
 *      /blog/pro-forma-invoice-vs-receipt
 *
 * No regulated claims. Avoids stating that estimates are or are not legally
 * binding in any state; says it depends on the wording and local rules.
 */

export const OCT_31A_ESTIMATE_VS_INVOICE = [
  {
    slug: "estimate-vs-invoice",
    image: "assets/estimate-vs-invoice.jpeg",
    category: "basics",
    publishedAt: "2026-10-31T09:30:00Z",
    title: "Estimate vs. Invoice: The Difference and When to Send Each",
    seoTitle: "Estimate vs. Invoice: What's the Difference?",
    seoDescription:
      "An estimate prices the work before it starts; an invoice asks for payment after. When to send each, what changes between them, and how to convert one.",
    excerpt:
      "An estimate says what a job will probably cost. An invoice says what the client now owes. Here is how the two differ, when each one goes out, and how to turn an approved estimate into an invoice without losing track of changes.",
    body: `**An estimate is a price you give a client before the work starts, so they can approve it. An invoice is a request for payment you send after the work is done (or a milestone is reached), showing what they owe and when it is due.** The estimate wins the job; the invoice gets you paid. Most service businesses send both, in that order, for the same job.

If you are ready to bill, open the [invoice template](/templates/invoice), or the [plumbing invoice template](/templates/plumbing-invoice) for trade work with parts and labor lines. The full walkthrough is in [how to make an invoice](/blog/how-to-make-an-invoice).

## Estimate vs. Invoice at a Glance

| | Estimate | Invoice |
|---|---|---|
| When it is sent | Before the work | After the work, or at a milestone |
| Purpose | Get approval for a price | Get paid |
| Amount | Expected cost, may change | Final amount owed |
| Asks for payment? | No (unless a deposit is requested) | Yes, with a due date |
| Key dates | Date issued, valid until | Issue date, due date |
| Number | Estimate number (EST-) | Invoice number (INV-) |
| What the client does | Approves, signs or declines | Pays |
| Goes in your income records | No | Yes |

A **quote** is usually treated as a firmer price than an estimate. If you call it a quote, clients will expect you to hold that number. A **pro forma invoice** is a different thing again: a preview of an invoice sent before delivery, covered in our [pro forma invoice guide](/blog/pro-forma-invoice-vs-receipt).

## When to Send Each

1. **Client asks for a price.** Send an estimate with a scope, line items, a total and an expiry date ("valid for 30 days").
2. **Client approves.** Get it in writing: a signature, a reply email or an approval in your software. This is where you set [payment terms](/blog/invoice-payment-terms) and any deposit.
3. **Deposit, if any.** Send a deposit invoice for that amount with its own invoice number.
4. **Scope changes during the job.** Tell the client and get approval for the extra cost before doing it. A revised estimate or a written change order works.
5. **Work is done.** Send the final invoice: the approved lines, any approved changes, minus the deposit already paid.

## How to Convert an Estimate to an Invoice

1. Copy the approved estimate's line items into a new invoice.
2. Change the title from Estimate to Invoice.
3. Give it the next **invoice number** in your sequence. Do not reuse the estimate number; put it in a reference line instead ("Per estimate EST-0112").
4. Replace "valid until" with an issue date and a due date.
5. Adjust quantities to what was actually used, and add any approved changes as separate lines.
6. Subtract any deposit and show the balance due.
7. Send it, and keep the signed estimate with your copy.

## A Worked Example

A plumber estimates a water heater replacement:

| Estimate EST-0112 | Amount |
|---|---|
| 50-gallon gas water heater | $1,150.00 |
| Labor, 4 hr @ $110 | $440.00 |
| Permit fee | $75.00 |
| Haul away old unit | $50.00 |
| **Estimated total** | **$1,715.00** |

On the day, the plumber finds the local code calls for an expansion tank. The plumber explains why, the homeowner approves $85 in writing, and the final invoice reads:

| Invoice INV-2031 (per EST-0112) | Amount |
|---|---|
| 50-gallon gas water heater | $1,150.00 |
| Labor, 4 hr @ $110 | $440.00 |
| Permit fee | $75.00 |
| Haul away old unit | $50.00 |
| Expansion tank (approved Oct 31) | $85.00 |
| **Total due** | **$1,800.00** |

Because the change was approved and shown as its own line, there is nothing to argue about when the invoice arrives.

## Is an Estimate Binding?

It depends on how it is worded, what the client signed and the rules where you work, so ask a local attorney if a dispute is likely. As a working habit: say clearly that it is an estimate, state how long it is valid, and never go over it without the client's approval. If you need a fixed price, call it a quote and say it is fixed.

## Common Mistakes

- **Sending an estimate as the bill.** The client cannot pay a document that has no due date or invoice number.
- **Silent overruns.** Going over the estimate without approval is the fastest way to an unpaid invoice.
- **Mixing the numbering.** Keep estimates (EST-) and invoices (INV-) in separate sequences.
- **Forgetting the deposit.** The final invoice must subtract what was already paid.`,
    faqs: [
      {
        q: "What is the difference between an estimate and an invoice?",
        a: "An estimate is an expected price sent before the work for the client to approve. An invoice is a request for payment sent after the work, with a due date.",
      },
      {
        q: "Do I send an estimate or an invoice first?",
        a: "The estimate. Once the client approves it and the work is done, you send the invoice.",
      },
      {
        q: "Is an estimate the same as a quote?",
        a: "Not quite. A quote is usually treated as a fixed price, while an estimate is an expected price that may change with approval.",
      },
      {
        q: "Can the final invoice be higher than the estimate?",
        a: "Only for changes the client approved. Get approval in writing and show the extra work as its own line on the invoice.",
      },
      {
        q: "How do I turn an estimate into an invoice?",
        a: "Copy the approved lines, retitle it Invoice, give it a new invoice number, add issue and due dates, adjust for approved changes, subtract any deposit and send it.",
      },
      {
        q: "Should an invoice reference the estimate?",
        a: "Yes. A line such as \"Per estimate EST-0112\" lets the client match the two documents.",
      },
      {
        q: "Does an estimate need a number?",
        a: "It helps. Use a separate sequence, such as EST-0112, so estimates never collide with invoice numbers.",
      },
      {
        q: "How long should an estimate be valid?",
        a: "Long enough for the client to decide and short enough that your costs will not change, often 30 days. State the expiry date on it.",
      },
      {
        q: "Is an estimate legally binding?",
        a: "It depends on the wording, what was signed and the rules where you work. Label it as an estimate, give an expiry date and get approval before exceeding it.",
      },
      {
        q: "Do estimates count as income for my records?",
        a: "No. Only invoices and payments received are part of your income records. Keep signed estimates with the job file.",
      },
    ],
  },
];
