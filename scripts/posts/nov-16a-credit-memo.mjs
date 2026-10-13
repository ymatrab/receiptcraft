/**
 * Cadence — Day 2026-11-16, post 1 of 2 (09:30Z). Invoice cluster spoke.
 * Elliot writers test (writer F).
 * Keyword gate (orchestrator brief): "credit memo" (meaning, template, credit memo vs
 *   debit memo). Demand evidence: Google autocomplete 2026-10-13; no makecepeit page
 *   ranks for it in Search Console.
 *   -> /templates/invoice (owner: the original invoice and the corrected bill),
 *      /blog/invoice-number (Oct 25)
 *
 * Product check 2026-10-13 (components/builder/SectionBuilder.tsx, lib/sections.ts):
 *   no credit memo template exists, and the header's document title is NOT editable,
 *   so the post does not say "retitle the invoice". It says: the builder's price field
 *   accepts minus amounts (type=number, no min; itemsTotals sums negatives), item
 *   names are free text, and "Total label" is editable, which is enough to show a
 *   credit against an invoice on the invoice itself.
 *
 * Facts checked 2026-10-13:
 *   - IRS Publication 334 (Tax Guide for Small Business), "Sales returns and
 *     allowances": credits allowed to customers for returned merchandise and other
 *     allowances are subtracted from gross sales; on Schedule C, returns and
 *     allowances (line 2) are subtracted from gross receipts (line 1) and include
 *     cash or credit refunds to customers.
 *     https://www.irs.gov/publications/p334
 * Credit memo fields and the debit memo definition are common practice. Sample
 * businesses are fictional.
 */

export const NOV_16A_CREDIT_MEMO = [
  {
    slug: "credit-memo",
    image: "assets/credit-memo.jpeg",
    category: "small-business",
    publishedAt: "2026-11-16T09:30:00Z",
    title: "Credit Memo: Meaning, Example and How to Write One",
    seoTitle: "Credit Memo: Meaning, Example and Credit vs. Debit Memo",
    seoDescription:
      "What a credit memo is, when to issue one, how to write it against the original invoice number, and how it differs from a debit memo. Worked example inside.",
    excerpt:
      "A credit memo reduces what a customer owes on an invoice you already sent. Here is when to issue one, what goes on it, a worked example against a real invoice number, and how it compares with a debit memo.",
    body: `**A credit memo (credit memorandum) is a document a seller issues to reduce the amount a customer owes on an invoice already sent, usually because goods were returned, damaged or overcharged. It quotes the original invoice number, lists what is being credited and why, and shows the new balance.** The customer either pays the lower balance or keeps the credit for a future order.

The original bill lives on an invoice like the one in our [invoice template](/templates/invoice). A credit memo never edits that invoice; it sits beside it, which is why both documents need clean, unique numbers. Our guide to [invoice numbers](/blog/invoice-number) covers how to keep them in order.

## When to Issue a Credit Memo

- **Returned goods.** The customer sends back part of an order.
- **Damaged or short shipments.** Something arrived broken, or fewer units arrived than were billed.
- **Pricing errors.** You billed $185 for an item quoted at $165.
- **Allowances.** You agree to knock something off for a late delivery or a cosmetic defect the customer chose to keep.
- **Cancelled services** that were billed in advance.

If the invoice has not been sent yet, just correct it. A credit memo is for invoices the customer already has.

## Credit Memo vs. Debit Memo

| | Credit memo | Debit memo |
|---|---|---|
| Effect on what the customer owes | Lowers it | Raises it |
| Typical reasons | Returns, damage, overcharge, allowance | Undercharge, extra freight, added items |
| Who issues it | The seller | The seller (a buyer may also send one to a supplier, claiming a deduction) |
| Linked to | The original invoice number | The original invoice number |
| Numbering | Its own series, e.g. CM-0019 | Its own series, e.g. DM-0007 |

Some businesses skip debit memos and simply send a new invoice for the extra amount. That works too, as long as it references the original.

## What Goes on a Credit Memo

| Field | Example |
|---|---|
| Title | CREDIT MEMO |
| Credit memo number and date | CM-0019, Nov 10, 2026 |
| Original invoice number and date | INV-1087, Oct 28, 2026 |
| Seller and customer | Names, addresses, account number if you use one |
| Reason | "2 chairs returned unused; 1 allowance for damaged carton" |
| Credited lines | Item, quantity, unit price, line total, matching the invoice |
| Tax credited | If the original lines were taxed, the tax on the credited lines |
| Total credit | $395.00 |
| New balance or treatment | "Balance on INV-1087 now $845.00" or "Credit held on account" |

Use the same descriptions and unit prices as the original invoice. If the memo says "Task chair" at $185 and the invoice said "Ergo chair, black" at $185, someone will have to phone to match them.

## How to Write a Credit Memo Against an Invoice

1. **Pull up the original invoice** and confirm what was billed.
2. **Agree the credit** with the customer in writing: which lines, how many, and why.
3. **Take the next credit memo number.** Keep credit memos in their own series so they never collide with invoice numbers.
4. **Quote the original invoice number and date** near the top.
5. **List each credited line** at the original price. Add the tax on those lines if tax was charged.
6. **Total the credit** and state the new balance on the invoice, or that the credit is held for a future order.
7. **Send it and record it** against the customer's account the same day, so your next statement shows it.

## A Worked Example

Sample data: a fictional office supplier credits a fictional dental practice.

> **CREDIT MEMO CM-0019** · Nov 10, 2026
> **From:** Northfield Office Supply, 220 Commerce Dr, Madison, WI 53703
> **To:** Lakeview Dental, 15 Shore Rd, Madison, WI 53704 · Account 4410
> **Applies to:** Invoice INV-1087 dated Oct 28, 2026 (original total $1,240.00)
> **Reason:** Two chairs returned unused; allowance for one damaged carton kept by customer

| Item | Qty | Unit price | Credit |
|---|---|---|---|
| Ergo chair, black (returned) | 2 | $185.00 | $370.00 |
| Allowance, damaged carton | 1 | $25.00 | $25.00 |
| **Total credit** | | | **$395.00** |

> **New balance on INV-1087:** $1,240.00 − $395.00 = **$845.00**, due on the original due date.
> Sample assumes the original invoice carried no sales tax.

Two chairs at $185 is $370; add the $25 allowance for $395. Taking that from the $1,240 invoice leaves $845 owed.

## Showing the Credit on the Invoice Itself

Many small businesses do not issue a separate memo. They send a corrected copy of the invoice that shows the credit as a minus line. In the [invoice template](/templates/invoice) the price field accepts minus amounts, so you can add a line such as "Credit CM-0019, 2 chairs returned" at −$370.00, and rename the total label to "Balance due". Keep the original invoice number on it so your records still match.

## How Credits Affect Your Books

A credit memo lowers your sales, not your expenses. The IRS treats [returns and allowances](https://www.irs.gov/publications/p334) as a reduction of gross receipts: on Schedule C they are entered on their own line and subtracted from gross receipts, and they include cash or credit refunds you give customers. Keep each credit memo with the invoice it changes. This is general information, not tax or accounting advice.

Issue a credit memo only for a real return, error or agreed allowance on a real sale.`,
    faqs: [
      {
        q: "What is a credit memo?",
        a: "A document a seller issues to lower the amount a customer owes on an invoice already sent, for example after a return, damage or an overcharge. It quotes the original invoice number and shows the credit and the new balance.",
      },
      {
        q: "What is the difference between a credit memo and a debit memo?",
        a: "A credit memo reduces what the customer owes; a debit memo increases it, for example to bill extra freight or correct an undercharge. Both should reference the original invoice.",
      },
      {
        q: "Is a credit memo the same as a refund?",
        a: "Not quite. A credit memo records the reduction. The customer can then pay a lower balance, keep the credit for a future order, or receive a refund of money already paid.",
      },
      {
        q: "Does a credit memo need its own number?",
        a: "Yes. Give credit memos their own sequence, such as CM-0019, and quote the original invoice number on each one so both can be matched later.",
      },
      {
        q: "Can I show a credit on a makecepeit invoice?",
        a: "Yes. The invoice template's price field accepts minus amounts, so you can add the credit as its own line and rename the total label to Balance due. Building and previewing need no account; downloading needs a free account.",
      },
    ],
  },
];
