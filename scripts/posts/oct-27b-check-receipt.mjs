/**
 * Cadence — Day 2026-10-27, slot b (14:00Z). Writer B batch.
 * Keyword gate (DataForSEO, US, 2026-10-11): no makecepeit page ranks.
 *   "check receipt"   720/mo · mixed SERP; we target the payee writing a
 *                              receipt for a check payment
 *   -> /templates/cash-receipt, /blog/proof-of-payment (Oct 15, earlier slot)
 *
 * Facts checked 2026-10-11:
 *  - CFPB "How long can a bank or credit union hold funds I deposited?":
 *    next-business-day availability for some deposits, longer holds allowed
 *    for new accounts, large deposits, suspected uncollectible checks.
 *    https://www.consumerfinance.gov/ask-cfpb/how-long-can-a-bank-or-credit-union-hold-funds-i-deposited-en-1023/
 *  - CFPB: a bank can take money back if a deposited check turns out to be
 *    fraudulent even after it made the funds available and you withdrew them.
 *    https://www.consumerfinance.gov/ask-cfpb/i-deposited-a-check-and-waited-until-i-was-able-to-withdraw-the-money-from-the-bank-i-later-found-out-that-the-check-was-fraudulent-the-bankcredit-union-took-the-money-back-and-now-my-account-is-overdrawn-can-they-charge-me-an-overdraft-fe-en-1001/
 *  - IRS records page lists canceled checks as proof of payment.
 *    https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep
 *  Specific hold dollar thresholds deliberately not quoted (inflation-adjusted).
 */

export const OCT_27B_CHECK_RECEIPT = [
  {
    slug: "check-receipt",
    image: "assets/check-receipt.jpeg",
    category: "how-to",
    publishedAt: "2026-10-27T14:00:00Z",
    title: "Check Receipt: How to Write a Receipt for a Check Payment",
    seoTitle: "Check Receipt: How to Write a Receipt for a Check",
    seoDescription:
      "How to write a receipt when you are paid by check: check number, bank, date, amount, what it paid for, and what to do if the check bounces later.",
    excerpt:
      "When a customer pays by check, the receipt should name the check number and bank, and you should know what to do if it bounces. Here are the fields, a worked example and the timing to watch.",
    body: `**When you are paid by check, write a receipt that records the check number, the bank it is drawn on, the date on the check, the amount, who paid and what it was for.** Mark the payment method as "Check #1234" rather than just "check", so the receipt and your bank deposit can be matched later. Our [cash receipt template](/templates/cash-receipt) has a payment-method line for exactly this.

A receipt for a check confirms you received the check. It cannot confirm the check will clear, because that happens later at the bank. The sections below cover how to word the receipt with that in mind.

## Fields for a Check Receipt

| Field | Example |
|---|---|
| Receipt number | 0219 |
| Date received | Oct 27, 2026 |
| Received from | Dana Morales |
| Amount | $450.00 (Four hundred fifty and 00/100 dollars) |
| Payment method | Check #5108 |
| Drawn on | First Valley Bank |
| Date on the check | Oct 27, 2026 |
| For | October lawn care, invoice 0391 |
| Balance due | $0.00 |
| Received by | Signature and printed name |

Write the amount in words as well as figures, the same way it appears on the check. It makes a later alteration obvious.

## How to Write It, Step by Step

1. **Check the check first.** Confirm the payee name is yours or your business's, the figures and the written amount match, it is signed, and it is not dated in the future.
2. **Number the receipt** in sequence. See [how to number receipts](/blog/how-to-number-receipts).
3. **Write the date you received it.**
4. **Name the payer** as printed on the check.
5. **Record the check details:** number, bank and the date written on it.
6. **Describe what it paid for** and reference the invoice number.
7. **Show any balance due.** If the check is a deposit or installment, use a [partial payment receipt](/blog/partial-payment-receipt) layout.
8. **Sign and give the customer their copy.** Keep yours with the deposit slip.

## A Worked Example

> Receipt #0219. Oct 27, 2026. Received from Dana Morales the sum of $450.00 by check #5108 drawn on First Valley Bank, dated Oct 27, 2026, for October lawn care (invoice 0391). Balance due: $0.00. Received by: Luis Park, Park Lawn Services.

## When the Money Is Actually Yours

Banks often let you use deposited funds before the check has finished clearing. The CFPB explains the [federal limits on how long banks can hold deposits](https://www.consumerfinance.gov/ask-cfpb/how-long-can-a-bank-or-credit-union-hold-funds-i-deposited-en-1023/), and that holds can run longer for new accounts, large deposits or checks the bank thinks may not be paid.

Funds being available is not the same as the check being good. The CFPB notes that if a deposited check turns out to be fraudulent, the bank [can take the money back](https://www.consumerfinance.gov/ask-cfpb/i-deposited-a-check-and-waited-until-i-was-able-to-withdraw-the-money-from-the-bank-i-later-found-out-that-the-check-was-fraudulent-the-bankcredit-union-took-the-money-back-and-now-my-account-is-overdrawn-can-they-charge-me-an-overdraft-fe-en-1001/) even after you have withdrawn it. For a large sale to someone you do not know, wait a while before handing over goods, or ask for a cashier's check you can verify with the issuing bank using a phone number you look up yourself.

## Adding a Returned-Check Note

Some businesses print one line on receipts for check payments:

> Payment by check is subject to the check clearing. If the check is returned unpaid, the balance above remains due.

That line does not create new rights; it reminds the customer that a bounced check means the bill is still unpaid. If you charge a returned-check fee, state the amount in your terms in advance. Rules on those fees vary by state, so check your state's rules before setting one.

## If the Check Bounces

1. Your bank will return the check and debit your account.
2. Contact the customer, explain that the check was returned and ask for payment by another method.
3. Issue a new receipt for the replacement payment, and write "replaces receipt #0219, check returned" on it.
4. Keep the returned check and the bank notice with the original receipt.

## Keeping the Paper Trail

For the payer, the canceled check or its image on a bank statement is proof the check was paid; the IRS lists canceled checks among the [records that show proof of payment](https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep). For you as the payee, the receipt plus the deposit record does the same job. For more on what each record proves, see [proof of payment](/blog/proof-of-payment).

## Making a Check Receipt

Our [cash receipt template](/templates/cash-receipt) works for checks: put "Check #5108, First Valley Bank" in the payment method field and the returned-check line in the footer. Building and previewing are free; a watermark-free download needs an account.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "How do I write a receipt for a check payment?",
        a: "Include the receipt number, date, payer, amount in figures and words, 'Check #' with the number, the bank, what it paid for, any balance due and your signature.",
      },
      {
        q: "Should a receipt include the check number?",
        a: "Yes. It lets you match the receipt to the deposit and helps the customer find the check on their statement.",
      },
      {
        q: "Does a receipt mean the check has cleared?",
        a: "No. A receipt confirms you received the check. Whether it clears is settled later by the banks.",
      },
      {
        q: "Can the bank take back money from a check that bounced?",
        a: "Yes. The CFPB says a bank can reverse a deposited check that turns out to be fraudulent even after it made the funds available.",
      },
      {
        q: "How long do banks hold deposited checks?",
        a: "Federal rules set maximum hold times, with longer holds allowed for new accounts, large deposits and checks the bank doubts will be paid. The CFPB's deposit holds page has the details.",
      },
      {
        q: "What should I write on the receipt about bounced checks?",
        a: "A line such as 'Payment by check is subject to the check clearing; if returned unpaid, the balance remains due.'",
      },
      {
        q: "Can I charge a returned-check fee?",
        a: "Many businesses do, but rules vary by state. Check your state's rules and state the fee in your terms before accepting the check.",
      },
      {
        q: "Is a canceled check proof of payment?",
        a: "Yes. The IRS lists canceled checks among the documents that show proof of payment.",
      },
      {
        q: "What if the check is post-dated?",
        a: "Write the date on the check in the receipt and consider waiting until that date to deposit it and hand over goods.",
      },
      {
        q: "What do I do if a customer's check bounces?",
        a: "Contact them, ask for another payment method, issue a new receipt referencing the old one, and keep the returned check with your records.",
      },
    ],
  },
];
