/**
 * Cadence — Day 2026-11-26, post 1 of 2 (09:30Z). Invoice cluster spoke.
 * Elliot writers test (writer F).
 * Keyword gate (orchestrator brief): "deposit invoice" (example, template, meaning).
 *   Demand evidence: Google autocomplete 2026-10-13; no makecepeit page ranks for it
 *   in Search Console.
 *   -> /templates/invoice (owner), /blog/partial-payment-receipt (Jul 23);
 *      also links /blog/how-to-write-a-quote (Nov 14, same batch)
 *
 * Product check 2026-10-13 (components/builder/SectionBuilder.tsx, lib/sections.ts):
 *   item names are free text; the price input is type=number with no min, and
 *   itemsTotals() sums negative lines, so a "Deposit received" line at a minus amount
 *   reduces the total; "Total label" is an editable field. Tax is calculated on the
 *   subtotal after discounts, so a minus line also lowers taxable amount; the post
 *   warns readers to check the tax line. Header title is NOT editable, so the post
 *   does not tell readers to retitle the document.
 *
 * Facts checked 2026-10-13:
 *   - IRS Publication 538 (Accounting Periods and Methods): cash method, income is
 *     included when actually or constructively received. Accrual method, "Advance
 *     Payments": generally report an advance payment for goods, services or other
 *     items as income in the year received; an accrual-method taxpayer can elect to
 *     postpone including part of it until the next tax year, not beyond.
 *     https://www.irs.gov/publications/p538
 * Deposit percentages and invoice layout are common practice. Sample business is
 * fictional; all figures reconcile.
 */

export const NOV_26A_DEPOSIT_INVOICE = [
  {
    slug: "deposit-invoice",
    image: "assets/deposit-invoice.jpeg",
    category: "small-business",
    publishedAt: "2026-11-26T09:30:00Z",
    title: "Deposit Invoice: How to Bill a Deposit, Then the Balance",
    seoTitle: "Deposit Invoice: Example and How to Bill the Balance",
    seoDescription:
      "What a deposit invoice is, what to put on it, and how the final invoice shows the deposit already paid. Worked example with a change order.",
    excerpt:
      "A deposit invoice asks for part of the price before work starts. Here is what goes on one, how to word it, and how the final invoice subtracts the deposit so the client pays the right balance.",
    body: `**A deposit invoice is an invoice for an upfront part of the price, sent after the client accepts your quote and before you start work or order materials. It names the job, states the deposit as an amount and a percentage of the agreed total, and is usually due on receipt. The final invoice then lists the full job and subtracts the deposit paid, so the client owes only the balance.**

You can make both in our [invoice template](/templates/invoice): one invoice for the deposit, then a second for the full job with the deposit entered as a minus line. Once the deposit arrives, the client may also want a receipt for it; [partial payment receipts](/blog/partial-payment-receipt) covers what that should say.

## Why Take a Deposit

- **Materials.** You should not fund a client's custom order out of your own cash.
- **Commitment.** A client who has paid 30% is far less likely to cancel or go quiet.
- **Scheduling.** A deposit holds a date on your calendar that you will turn other work away for.

The deposit should be agreed before you invoice it, ideally on the quote itself. Our guide on [how to write a quote](/blog/how-to-write-a-quote) shows where the deposit terms go.

## What Goes on a Deposit Invoice

| Field | Example |
|---|---|
| Invoice number and date | INV-2026-201, Oct 2, 2026 |
| Your details and the client's | Names, addresses, contact |
| Reference to the agreement | "Deposit per quote Q-118, accepted Sep 30, 2026" |
| Agreed job total | $8,400.00 |
| Deposit line | "Deposit, 40% of agreed total" · $3,360.00 |
| Amount due | $3,360.00 |
| Due date | Due on receipt |
| Refund terms | What happens to the deposit if the job is cancelled |
| How to pay | Bank transfer details or payment link |

State the full job total on the deposit invoice even though you are not billing it yet. It makes the percentage checkable and reminds the client what the deposit is part of.

## Deposit vs. Retainer vs. Partial Payment

| | Deposit | Retainer | Progress or partial payment |
|---|---|---|---|
| When | Before work starts | Before or during ongoing work | At milestones, or whenever the client pays part |
| Linked to | One quoted job | Hours or services over time | An invoice already issued |
| Ends up as | A credit on the final invoice | Drawn down as you bill | A reduced balance on that invoice |

## Step by Step: Deposit, Then Balance

1. **Agree the total and the deposit** in writing, on the quote or contract.
2. **Send the deposit invoice** with its own invoice number, due on receipt.
3. **Send a receipt** when the deposit lands.
4. **Do the work**, recording any change orders the client approves.
5. **Send the final invoice** listing the full job plus changes, then subtract the deposit, quoting the deposit invoice number and the date it was paid.
6. **Send a receipt** for the balance when it is paid.

## A Worked Example

Sample data: a fictional cabinet maker builds a kitchen for a fictional client. Sales tax is left out of the sample because it depends on your state and on how the job is billed.

The deposit invoice:

> **INVOICE INV-2026-201** · Oct 2, 2026 · **Due:** on receipt
> **From:** Fernwood Custom Cabinets, 31 Mill Rd, Asheville, NC 28801
> **To:** Elena Brooks, 640 Ridge Ave, Asheville, NC 28804
> **Job:** Kitchen cabinets per quote Q-118 · Agreed total $8,400.00

| Description | Amount |
|---|---|
| Deposit, 40% of agreed total ($8,400.00) | $3,360.00 |
| **Amount due** | **$3,360.00** |

The client paid it on Oct 5. In November, after installation and one approved change (crown molding, $350), the final invoice:

> **INVOICE INV-2026-214** · Nov 20, 2026 · **Due:** Dec 4, 2026 (Net 14)
> **Job:** Kitchen cabinets per quote Q-118

| Description | Qty | Rate | Amount |
|---|---|---|---|
| Custom cabinets, built and finished | 1 | $6,900.00 | $6,900.00 |
| Installation | 1 | $1,500.00 | $1,500.00 |
| Change order 1: crown molding | 1 | $350.00 | $350.00 |
| **Job total** | | | **$8,750.00** |
| Less deposit paid Oct 5 (INV-2026-201) | | | −$3,360.00 |
| **Balance due** | | | **$5,390.00** |

The quoted lines add to the $8,400 agreed total, the change order brings the job to $8,750, and subtracting the $3,360 deposit leaves $5,390. The client can see at a glance that the deposit was counted.

## Building It in the Invoice Template

In the [invoice template](/templates/invoice), enter the job lines as usual, then add one more line such as "Less deposit paid Oct 5 (INV-2026-201)" with a minus price. The price field accepts minus amounts, and the total updates. Rename the total label to "Balance due". If you charge sales tax, check the tax line afterward: the builder calculates tax on the subtotal, which now includes the minus deposit line, so you may need to adjust it to match how your state taxes the job.

## Deposits and Your Taxes

When a deposit counts as income depends on your accounting method. The IRS explains in [Publication 538](https://www.irs.gov/publications/p538) that cash-method businesses include income when they receive it, and that accrual-method businesses generally report an advance payment in the year received, with an election to postpone part of it to the next tax year. If a deposit is refundable or held for the client, the treatment can differ. This is general information, not tax advice.

Invoice a deposit only for a job the client has actually agreed to.`,
    faqs: [
      {
        q: "What is a deposit invoice?",
        a: "An invoice for an upfront part of the agreed price, sent after the client accepts your quote and before work starts. It states the deposit amount, what it is a percentage of, and when it is due.",
      },
      {
        q: "How do I show a deposit on the final invoice?",
        a: "List the full job and any approved changes, total them, then subtract the deposit as its own line, quoting the deposit invoice number and the date it was paid. The result is the balance due.",
      },
      {
        q: "How much deposit should I ask for?",
        a: "There is no single rule. Many trades ask for enough to cover materials and commit the client, and the right figure depends on the job and on any rules for your trade in your state. Agree the amount in writing before you invoice it.",
      },
      {
        q: "Is a deposit taxable income when I receive it?",
        a: "It depends on your accounting method and whether the deposit is refundable. IRS Publication 538 explains the rules for cash and accrual businesses. This is general information, not tax advice.",
      },
      {
        q: "Can I make a deposit invoice on makecepeit?",
        a: "Yes. Use the invoice template for the deposit, then for the final invoice add the deposit as a minus line and rename the total label to Balance due. Building and previewing need no account; downloading needs a free account.",
      },
    ],
  },
];
