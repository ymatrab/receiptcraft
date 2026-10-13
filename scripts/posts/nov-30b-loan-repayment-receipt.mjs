/**
 * Day 2026-11-30, slot b (14:00Z). Elliot writer J.
 * Keyword: "loan repayment receipt" / "loan payment receipt" (personal loans between people).
 * Demand: Google autocomplete, checked 2026-10-13; no makecepeit page ranks for it.
 * Owner/links: /templates/cash-receipt (owner), /blog/partial-payment-receipt, /create.
 * Angle: a receipt for each repayment on a private loan, with a running balance. Distinct from
 * partial-payment-receipt (deposits/instalments against a sale): here there is no sale, the
 * document tracks a debt down to zero and helps show the money was a loan, not a gift.
 * Product check: cash-receipt template exists (lib/templates.ts); the builder has editable
 * store name, two-column label/value rows, message and signature sections
 * (components/builder/SectionBuilder.tsx).
 * Builder claims re-checked against origin/main 2026-10-13 (lib/templates.ts, SectionBuilder.tsx):
 * the document heading cannot be changed, so the post never tells readers to retitle it.
 *
 * Facts checked 2026-10-13:
 *   - IRS, Gift Tax, https://www.irs.gov/businesses/small-businesses-self-employed/gift-tax :
 *     "if you make an interest-free or reduced-interest loan, you may be making a gift";
 *     the tax applies whether or not the donor intends a gift.
 *   - IRS, Frequently asked questions on gift taxes,
 *     https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-gift-taxes :
 *     gift = any transfer to an individual where full consideration is not received; annual
 *     exclusion $19,000 per donee for 2025 and 2026; the donor generally pays any gift tax.
 * Not used: below-market loan interest rules (Applicable Federal Rate) - not verified for this
 * post; the post sends readers to the IRS / a tax professional instead.
 * Names and amounts are fictional.
 */

export const NOV_30B_LOAN_REPAYMENT_RECEIPT = [
  {
    slug: "loan-repayment-receipt",
    image: "assets/loan-repayment-receipt.jpeg",
    category: "how-to",
    publishedAt: "2026-11-30T14:00:00Z",
    title: "Loan Repayment Receipt: What to Include, With a Running Balance",
    seoTitle: "Loan Repayment Receipt: Fields, Sample and Balance Table",
    seoDescription:
      "How to write a receipt for each payment on a personal loan between friends or family: the fields, a running balance table and a filled-in sample.",
    excerpt:
      "Lent money to a friend or family member? Give a receipt for every repayment. Here are the fields to include, how to show the remaining balance, and a sample schedule for a $3,000 loan.",
    body: `**A loan repayment receipt is a short document the lender gives the borrower each time a payment comes in. It should show both names, the original loan amount and date, the payment number, the amount and method of this payment, and the balance still owed after it. Signed by the lender, a series of these receipts proves what was repaid and when, and shows the money was a loan rather than a gift.**

You can make one with the [cash receipt template](/templates/cash-receipt): put the payment on the item line, the loan details in a label-and-value block and the remaining balance in the message box. This guide covers what goes on it and how to keep the running balance straight.

## Why Bother Between Friends and Family

Personal loans usually start with a conversation and end in a misunderstanding about how much is left. A receipt for each payment fixes three problems:

- **The borrower has proof of payment.** If the lender later says only $1,500 came back, the borrower has signed receipts for every installment.
- **Both sides agree on the balance.** Each receipt states what is still owed, so a disagreement surfaces after one payment, not after a year.
- **It shows the money was a loan.** The IRS says that if you make an interest-free or reduced-interest loan, [you may be making a gift](https://www.irs.gov/businesses/small-businesses-self-employed/gift-tax), and it defines a gift as a transfer for which full consideration is not received. A record of real repayments is the plainest evidence that the money was meant to come back.

On the gift question, the IRS lists an annual exclusion of $19,000 per recipient for both 2025 and 2026, and says the person making a gift is generally the one responsible for any gift tax. If you are lending a large sum, especially without interest, ask a tax professional how the IRS rules apply to you.

## Fields to Include

| Field | Example |
|---|---|
| What it is | Repayment on a personal loan |
| Receipt number | LR-04 |
| Date received | November 1, 2026 |
| Lender (received by) | Marcus Hale |
| Borrower (received from) | Priya Nair |
| Original loan | $3,000.00, lent March 1, 2026 |
| Payment number | 4 of 12 |
| Amount received | $250.00 |
| Method | Zelle, confirmation 7XK22 |
| Applied to | Principal (no interest agreed) |
| Balance after this payment | $2,000.00 |
| Signature | Lender |

If you agreed on interest, add a line splitting the payment into interest and principal, so the balance only falls by the principal part.

## The Running Balance Table

Keep a simple table alongside the receipts. Each row matches one receipt, and the last column on one row becomes the first on the next.

| No. | Date | Opening balance | Payment | Closing balance |
|---|---|---|---|---|
| 1 | Aug 1, 2026 | $3,000.00 | $250.00 | $2,750.00 |
| 2 | Sep 1, 2026 | $2,750.00 | $250.00 | $2,500.00 |
| 3 | Oct 1, 2026 | $2,500.00 | $250.00 | $2,250.00 |
| 4 | Nov 1, 2026 | $2,250.00 | $250.00 | $2,000.00 |

In this sample, Priya borrowed $3,000 from Marcus on March 1, 2026, interest free, and agreed to repay $250 a month from August. After the fourth payment, $2,000 remains. Eight more payments of $250 bring it to zero in July 2027.

If a payment is missed or a larger one comes in, write the actual amount. The table should show what happened, not what was planned.

## Worked Example: Receipt No. 4

**LOAN REPAYMENT RECEIPT**
Receipt no. LR-04, November 1, 2026

Received from Priya Nair the sum of $250.00 by Zelle (confirmation 7XK22) as payment 4 of 12 on the personal loan of $3,000.00 made by Marcus Hale on March 1, 2026. No interest applies.

Balance remaining after this payment: $2,000.00.

Signed: Marcus Hale

That paragraph format works on paper too. On a cash receipt layout, the same facts go in fields: lender in the header, borrower as "Received from", the payment as a single line item, and the balance in the message.

## How to Make It in the Builder

1. Open the [cash receipt template](/templates/cash-receipt).
2. Put the lender's name in the store name field at the top.
3. Set the "Received from" line to the borrower.
4. Use one item line: "Payment 4 of 12, loan of $3,000 dated Mar 1, 2026", priced at the amount received.
5. Choose the payment method that was actually used.
6. Add a two-column block titled "Loan details" with rows for the original loan, its date and the payment number.
7. Put "Balance remaining: $2,000.00" in the message and add a signature section.

You can build and preview without an account. Downloading needs a free account, and the first download is watermark-free. Only issue a receipt for money you actually received.

## The Final Receipt

When the last payment comes in, the final receipt should say the loan is paid in full and the balance is $0.00. Some lenders also write a one-line release: "The loan of $3,000.00 dated March 1, 2026 has been repaid in full." The borrower should keep that one with the loan agreement.

If the arrangement is closer to paying off a purchase in installments, such as a car bought from a friend, the [partial payment receipt guide](/blog/partial-payment-receipt) covers that format.

## Tips for Lenders and Borrowers

- **Put the loan itself in writing** before any money moves: amount, date, repayment schedule and interest, if any.
- **Prefer traceable payments.** Bank transfers and app payments leave a record of their own; the receipt adds what the payment was for.
- **Number the receipts** so a missing one is obvious.
- **Both keep a copy.** The borrower needs the receipts as proof; the lender needs the balance history.

This is general information, not legal or tax advice. For a large loan, or one with interest, check the IRS rules or ask a professional.`,
    faqs: [
      {
        q: "What should a loan repayment receipt include?",
        a: "Both names, the receipt number and date, the original loan amount and date, the payment number, the amount and method of this payment, the remaining balance and the lender's signature.",
      },
      {
        q: "Do I need a receipt if the borrower pays by bank transfer?",
        a: "The transfer proves money moved, but not that it was a loan repayment or what balance remains. A short receipt adds both, and both people agree on the number.",
      },
      {
        q: "Can an interest-free loan to family count as a gift?",
        a: "The IRS says an interest-free or reduced-interest loan may be a gift. Keeping a written loan agreement and a receipt for each repayment shows the money is being repaid; for large amounts, ask a tax professional.",
      },
      {
        q: "What goes on the last loan repayment receipt?",
        a: "The final payment, a balance of $0.00 and a line stating the loan dated on its original date has been repaid in full, signed by the lender.",
      },
    ],
  },
];
