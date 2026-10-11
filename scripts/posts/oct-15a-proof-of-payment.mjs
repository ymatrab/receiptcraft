/**
 * Cadence — Day 2026-10-15, slot a (09:30Z). Writer B batch.
 * Keyword gate (DataForSEO, US, 2026-10-11): no makecepeit page ranks for any.
 *   "proof of payment"         880/mo
 *   "wire transfer receipt"    480/mo
 *   "proof of payment letter"   50/mo
 *   -> /templates/cash-receipt, /blog/what-counts-as-proof-of-purchase
 *
 * Angle: the person who has to PRODUCE proof of payment (write a receipt or a
 * payment confirmation letter), not the one retrieving a merchant's copy.
 *
 * Facts checked 2026-10-11:
 *  - IRS "What kind of records should I keep" lists canceled checks or other
 *    documents reflecting proof of payment/electronic funds transferred, cash
 *    register tape receipts, account statements, credit card receipts and
 *    statements, invoices; a combination may be needed.
 *    https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep
 *  - CFPB Regulation E §1005.31: remittance transfer providers (incl. banks
 *    sending international wires) must give the sender a receipt showing
 *    amount, fees, exchange rate, amount received, date available, recipient,
 *    cancellation rights. https://www.consumerfinance.gov/rules-policy/regulations/1005/31/
 *  Domestic wire confirmation contents vary by bank, so the post does not list
 *  a mandated format for them.
 */

export const OCT_15A_PROOF_OF_PAYMENT = [
  {
    slug: "proof-of-payment",
    image: "assets/proof-of-payment.jpeg",
    category: "basics",
    publishedAt: "2026-10-15T09:30:00Z",
    title: "Proof of Payment: What Counts and How to Write One",
    seoTitle: "Proof of Payment: What Counts and How to Write One",
    seoDescription:
      "What counts as proof of payment (receipt, bank statement, wire confirmation, canceled check) and how to write a receipt or proof of payment letter.",
    excerpt:
      "Proof of payment is any record that shows who paid whom, how much, when and how. Here is what counts, which document fits which payment method, and how to write a receipt or a payment confirmation letter yourself.",
    body: `**Proof of payment is a document that shows who paid, who was paid, how much, on what date and by what method.** A signed receipt from the person who was paid is the strongest single record. A bank statement, a canceled check or a wire transfer confirmation also counts, though those show money moving rather than what it was for. If you were paid and the payer asks for proof, the simplest answer is to write them a receipt, which you can do with our [cash receipt template](/templates/cash-receipt).

Proof of purchase is the narrower cousin: it shows you bought a specific item, usually for a return or warranty. We cover that separately in [what counts as proof of purchase](/blog/what-counts-as-proof-of-purchase).

## What Counts as Proof of Payment

The IRS lists the records it accepts as proof that a business expense was paid on its page [What kind of records should I keep](https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep): canceled checks or other records of electronic funds transferred, cash register tape receipts, account statements, credit card receipts and statements, and invoices. It also notes that you may need a combination of them to show everything about one payment.

| Document | Shows | Missing |
|---|---|---|
| Receipt from the payee | Amount, date, payer, payee, what it was for, method | Nothing, if filled in fully |
| Bank or card statement | Amount, date, the account it went to | Usually what the payment was for |
| Canceled check (or its image) | Payee, amount, date, that the bank paid it | Details of the goods or service |
| Wire transfer confirmation | Amount, date, sending and receiving accounts, reference number | What it was for, unless you added a memo |
| Invoice marked paid | What was sold and the price | Proof the money moved, on its own |

The pattern is that bank records prove money moved and receipts and invoices prove what it was for. When the stakes are high, such as a deposit, a car sale or a disputed bill, keep both.

## Wire Transfer Receipts

For an international transfer sent by a consumer, federal rules require the bank or money transmitter to hand over a receipt. Under the CFPB's [Regulation E remittance rules](https://www.consumerfinance.gov/rules-policy/regulations/1005/31/), that receipt shows the amount sent, fees and taxes, the exchange rate, the amount the recipient will get, the date funds will be available, the recipient's name and the sender's cancellation rights.

For a domestic wire, the format is up to the bank. Most show the amount, the date, the sending and receiving account (partly masked) and a reference number. Save it as a PDF or screenshot on the day you send it, because it is the record the bank will ask for if the money goes missing.

## How to Write Proof of Payment Yourself

If you received money, a receipt is the normal way to prove it. Fill in these fields:

| Field | Example |
|---|---|
| Receipt number | 0142 |
| Date paid | October 15, 2026 |
| Received from | Jordan Lee |
| Amount | $850.00 |
| Payment method | Wire transfer, ref. 7731 |
| For | Kitchen cabinet installation, invoice 2041 |
| Balance due | $0.00 |
| Received by | Signature and printed name |

Steps:

1. Number the receipt so it can be found later. See [how to number receipts](/blog/how-to-number-receipts).
2. Write the date the money arrived, not the date you agreed the price.
3. Name the payer exactly as it appears on their bank account or ID.
4. Give the amount in figures, and in words for cash or large sums.
5. Name the method and its reference: check number, wire reference or app transaction ID.
6. Say what the payment was for and link it to an invoice number if there was one.
7. Show any balance still owed. For a deposit or installment, use a [partial payment receipt](/blog/partial-payment-receipt).
8. Sign it and keep a copy.

## Proof of Payment Letter

Some landlords, schools, visa offices and lenders ask for a short letter instead of a receipt. It carries the same facts in sentence form. An example:

> October 15, 2026. To whom it may concern: I confirm that I received $850.00 from Jordan Lee by wire transfer on October 15, 2026, reference 7731, as full payment for kitchen cabinet installation under invoice 2041. No balance remains. Signed, Maria Chen, Chen Carpentry, (555) 010-2290.

Put it on letterhead if you have it, sign it and attach the bank record if the reader asked for one.

## Making One Quickly

Our [cash receipt template](/templates/cash-receipt) has every field above and works for cash, check, wire or app payments. You can build and preview a receipt free in the browser. A watermark-free download needs an account. A receipt must describe a payment that actually happened; it is a record, not a substitute for one.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "What is proof of payment?",
        a: "A document showing who paid, who was paid, the amount, the date and the payment method. A signed receipt, bank statement, canceled check or wire confirmation can all serve.",
      },
      {
        q: "Is a bank statement proof of payment?",
        a: "Yes, it shows money left your account and where it went. It rarely shows what the payment was for, so pair it with a receipt or invoice when that matters.",
      },
      {
        q: "Is a screenshot proof of payment?",
        a: "It can support your case, but a downloaded statement or a receipt from the payee is stronger because it is harder to dispute.",
      },
      {
        q: "What is a wire transfer receipt?",
        a: "The confirmation your bank or money transmitter gives when you send a wire. For international consumer transfers, the CFPB's Regulation E sets what it must show, including fees, exchange rate and amount received.",
      },
      {
        q: "How do I write a proof of payment letter?",
        a: "State the date, the payer, the amount, the method and reference number, what it paid for and any balance left, then sign it with your name and contact details.",
      },
      {
        q: "Is an invoice proof of payment?",
        a: "Not by itself. An invoice is a request for payment. An invoice marked paid with the date and method, or a separate receipt, shows it was settled.",
      },
      {
        q: "What does the IRS accept as proof of payment?",
        a: "The IRS lists canceled checks, records of electronic transfers, cash register tape receipts, account statements, credit card receipts and statements, and invoices, sometimes in combination.",
      },
      {
        q: "Who should issue proof of payment?",
        a: "The person or business that received the money. They are the one who can confirm it arrived and what it was for.",
      },
      {
        q: "Can I ask a seller for proof of payment?",
        a: "Yes. Asking for a receipt at the time you pay is normal and much easier than reconstructing one later.",
      },
      {
        q: "How long should I keep proof of payment?",
        a: "Keep it at least as long as the related tax return can be examined, and longer for warranties, deposits or anything still in dispute.",
      },
    ],
  },
];
