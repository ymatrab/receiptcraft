/**
 * Cadence — Day 2026-11-24, post 1 of 2 (09:30Z). Invoice cluster spoke.
 * Elliot writers test (writer F).
 * Keyword gate (orchestrator brief): "statement of account" (definition, template,
 *   sample). Demand evidence: Google autocomplete 2026-10-13; no makecepeit page ranks
 *   for it in Search Console.
 *   -> /templates/invoice (owner: the invoices a statement lists),
 *      /blog/invoice-number (Oct 25); also links /blog/credit-memo (Nov 16, same batch)
 *
 * Product check 2026-10-13: there is no statement template and the builder's header
 * title is not editable, so the post does not offer one; it links the invoice
 * template for the invoices the statement summarizes.
 *
 * Facts checked 2026-10-13:
 *   - IRS "What kind of records should I keep": supporting documents for gross
 *     receipts include cash register tapes, deposit information, receipt books,
 *     invoices and Forms 1099-MISC.
 *     https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep
 * Statement layout, aging buckets and applying payments to the oldest invoice are
 * common practice. Sample businesses are fictional; all figures reconcile.
 */

export const NOV_24A_STATEMENT_OF_ACCOUNT = [
  {
    slug: "statement-of-account",
    image: "assets/statement-of-account.jpeg",
    category: "small-business",
    publishedAt: "2026-11-24T09:30:00Z",
    title: "Statement of Account: What It Is, With a Worked Sample",
    seoTitle: "Statement of Account: Definition, Sample and Aging",
    seoDescription:
      "What a statement of account is, how it differs from an invoice, which columns to include, and a worked sample with a running balance and an aging summary.",
    excerpt:
      "A statement of account sums up every invoice, payment and credit on a customer's account for a period and shows what is still owed. Here is what goes on one, how aging columns work, and a sample that reconciles to the cent.",
    body: `**A statement of account is a summary a business sends a customer, usually monthly, listing every invoice, payment and credit on their account for the period, with a running balance and the total still owed. Unlike an invoice, it does not bill anything new; it shows where the account stands and which amounts are overdue.** Customers who buy on credit often pay from the statement rather than from each invoice.

Each line on a statement points back to an invoice, so the invoices come first. Our [invoice template](/templates/invoice) handles those, and a clean numbering system, covered in [how to number invoices](/blog/invoice-number), is what lets a customer tick each statement line off against their own records.

## Statement of Account vs. Invoice

| | Invoice | Statement of account |
|---|---|---|
| Covers | One sale or job | Every transaction in a period |
| Asks for payment? | Yes, for that sale | Shows the total balance and what is overdue |
| Shows payments and credits? | Rarely | Yes, all of them |
| Frequency | Each time you bill | Usually monthly |
| Main number | Invoice number | Statement date and account number |
| Who needs it | Every customer you bill | Customers on account (regular credit buyers) |

If a customer pays every invoice on the spot, a statement adds little. It earns its place when one customer has several open invoices, partial payments and credits at once.

## What Goes on a Statement of Account

| Section | What to include |
|---|---|
| Header | Your business details, STATEMENT OF ACCOUNT, statement date |
| Customer | Name, address, account number |
| Period | e.g. Nov 1 to Nov 30, 2026 |
| Opening balance | What was owed at the start of the period |
| Transactions | Date, reference (invoice, payment, credit memo), charge, credit, running balance |
| Closing balance | Total owed at the statement date |
| Aging summary | How much of the balance is current and how much is overdue, by age |
| Payment details | How to pay and whom to call with a query |

## How Aging Columns Work

An aging summary splits the closing balance by how long each amount has been past its due date. The usual buckets are:

| Bucket | Meaning |
|---|---|
| Current | Not yet due |
| 1–30 days | Up to 30 days past the due date |
| 31–60 days | 31 to 60 days past due |
| 61–90 days | 61 to 90 days past due |
| Over 90 days | More than 90 days past due |

Two rules keep it accurate. Age each invoice from its **due date**, not its issue date. And apply payments to the **oldest invoice first** unless the customer says which invoice they are paying; a payment marked for a specific invoice goes against that one.

## How to Prepare a Statement

1. **Choose the period**, usually the calendar month.
2. **Carry forward the opening balance** from last month's closing balance.
3. **List every transaction in date order**: invoices as charges, payments and credit memos as credits.
4. **Keep a running balance** on every line.
5. **Check the closing balance** against the open invoices in your records. They must agree.
6. **Age what is still open** into the buckets above.
7. **Send it** a day or two after the period ends, with payment details at the bottom.

## A Worked Example

Sample data: a fictional linen service and a fictional restaurant customer on Net 30 terms.

> **STATEMENT OF ACCOUNT** · Statement date: Nov 30, 2026
> **From:** Harbor Linen Service, 52 Wharf St, Charleston, SC 29401
> **To:** Bayside Bistro, 9 Marina Way, Charleston, SC 29412 · Account BB-207
> **Period:** Nov 1 to Nov 30, 2026

| Date | Reference | Charges | Credits | Balance |
|---|---|---|---|---|
| Nov 1 | Balance forward (INV-3301, Oct 15) | | | $640.00 |
| Nov 3 | Payment received, thank you | | $400.00 | $240.00 |
| Nov 7 | INV-3342 | $520.00 | | $760.00 |
| Nov 14 | INV-3360 | $480.00 | | $1,240.00 |
| Nov 20 | Credit memo CM-0042 (stained napkins, INV-3360) | | $60.00 | $1,180.00 |
| Nov 28 | INV-3377 | $505.00 | | $1,685.00 |
| | **Balance due** | | | **$1,685.00** |

The $400 payment went against the oldest invoice, INV-3301, leaving $240 open on it. That invoice was due Nov 14, so on Nov 30 it is 16 days late. Everything else is not yet due.

| Current | 1–30 days | 31–60 days | 61–90 days | Over 90 | Total |
|---|---|---|---|---|---|
| $1,445.00 | $240.00 | $0.00 | $0.00 | $0.00 | $1,685.00 |

The current column is INV-3342 ($520.00), INV-3360 after its credit ($420.00) and INV-3377 ($505.00), which add to $1,445.00. With the $240.00 overdue, that matches the $1,685.00 balance. If the columns do not add to the balance, something is missing from the list. Credits like the one on Nov 20 are explained in our guide to the [credit memo](/blog/credit-memo).

## What a Customer Does With It

A good statement lets the customer's bookkeeper do three things quickly: match each invoice to their own records, spot anything they have not received, and pay the overdue amount first. In the sample, Bayside Bistro would pay the $240.00 now and the rest by each invoice's due date.

## Keep the Paper Trail

A statement is a summary, not a source document. The records behind it are the invoices, payment records and credit memos, and those are what the IRS lists among the [supporting documents for gross receipts](https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep). Keep them filed by customer and number so any statement line can be traced back. This is general information, not tax or accounting advice.

A statement should list only real invoices, payments and credits on the customer's account.`,
    faqs: [
      {
        q: "What is a statement of account?",
        a: "A summary a business sends a customer, usually monthly, listing every invoice, payment and credit for the period with a running balance and the total still owed.",
      },
      {
        q: "Is a statement of account the same as an invoice?",
        a: "No. An invoice bills one sale. A statement summarizes all of a customer's invoices, payments and credits over a period and shows the overall balance and what is overdue.",
      },
      {
        q: "What are aging columns on a statement?",
        a: "They split the balance by how long each amount has been past its due date, typically Current, 1–30, 31–60, 61–90 and over 90 days. They show the customer what to pay first.",
      },
      {
        q: "How often should I send statements of account?",
        a: "Monthly is common, a day or two after the month ends. Send them to customers who buy on credit and have more than one open invoice at a time.",
      },
      {
        q: "Can I make the invoices behind a statement on makecepeit?",
        a: "Yes. Use the invoice template for each invoice, numbered in sequence. Building and previewing need no account; downloading needs a free account.",
      },
    ],
  },
];
