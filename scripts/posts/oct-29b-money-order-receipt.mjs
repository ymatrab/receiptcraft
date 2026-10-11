/**
 * Cadence — Day 2026-10-29, slot b (14:00Z). Writer B batch.
 * Keyword gate (DataForSEO, US, 2026-10-11): no makecepeit page ranks.
 *   "money order receipt"   880/mo · mixed: buyers asking about the stub, and
 *                                     payees writing a receipt for a money order
 *   -> /templates/cash-receipt, /blog/check-receipt (Oct 27, earlier slot)
 *
 * Facts checked 2026-10-11 on https://www.usps.com/shop/money-orders.htm :
 *  - domestic USPS money orders up to $1,000; buy with cash or debit card,
 *    credit cards not accepted
 *  - keep the receipt to track the money order; status online via the Money
 *    Orders application (tools.usps.com/money-orders.htm) with serial number,
 *    Post Office number and dollar amount
 *  - lost/stolen: payment cannot be stopped; replacement possible; take the
 *    receipt to a Post Office to start a Money Order Inquiry; confirming loss
 *    can take up to 30 days, investigating up to 60 days; processing fee $23.00
 *  - money orders don't expire; Post Offices cash them; payee signs at the
 *    counter with photo ID
 * USPS does not describe the individual printed fields on that page, so the
 * post describes them generically and says other issuers (banks, retailers,
 * Western Union, MoneyGram) have their own forms and inquiry processes.
 */

export const OCT_29B_MONEY_ORDER_RECEIPT = [
  {
    slug: "money-order-receipt",
    image: "assets/money-order-receipt.jpeg",
    category: "how-to",
    publishedAt: "2026-10-29T14:00:00Z",
    title: "Money Order Receipt: What the Stub Shows and Why to Keep It",
    seoTitle: "Money Order Receipt: What It Shows and Why to Keep It",
    seoDescription:
      "What a money order receipt (the stub) shows, how to fill in the money order, tracing a lost USPS money order, and writing a receipt when paid by one.",
    excerpt:
      "The stub you tear off a money order is the only thing that lets you trace or replace it. Here is what it shows, how to fill in the money order and stub correctly, how USPS handles lost ones, and how to write a receipt if you are the one paid.",
    body: `**A money order receipt is the customer stub you keep when you buy a money order. It carries the serial number, amount and issue details, and it is what the issuer asks for if you need to check whether the money order was cashed or get a replacement.** Fill in the stub with the payee's name and what the payment was for before you hand the money order over. If you are the person receiving a money order, write the payer a receipt of your own; our [cash receipt template](/templates/cash-receipt) has a payment-method line for it.

The details below follow the [USPS money order page](https://www.usps.com/shop/money-orders.htm). Banks, retailers and companies such as Western Union and MoneyGram issue money orders too, each with its own form, fees and inquiry process, so check with whoever sold you yours.

## What the Customer Receipt Shows

| On the stub | Why it matters |
|---|---|
| Serial number | Identifies the money order; needed for any status check |
| Amount | Must match the money order exactly |
| Issue date and location | USPS asks for the Post Office number when you check status |
| Space for payee and purpose | Your own note of who you paid and why |

USPS says to keep the receipt so you can track the money order. To check its status online, you enter the serial number, Post Office number and dollar amount in the USPS Money Orders application, which is why a lost stub makes everything harder.

## USPS Basics Worth Knowing

- Domestic USPS money orders go up to $1,000 each.
- You pay with cash or a debit card; USPS does not accept credit cards for them.
- They do not expire.
- The payee can cash one at a Post Office with photo ID, signing it at the counter. Banks and some stores also cash them.

## How to Fill In the Money Order and Stub

Money orders from different issuers label their fields differently, but they all ask for the same things.

1. **Payee.** Write the full name of the person or business you are paying, exactly as they will deposit it. Do this before you leave the counter; a money order with a blank payee is as good as cash to whoever finds it.
2. **Your name and address** in the purchaser or "from" area.
3. **Memo or account number**, if there is a line for it: "October rent, Unit 4B" or a utility account number.
4. **Sign** where the purchaser signs, if your money order has a purchaser signature line. Do not sign the back; that is for the payee.
5. **Fill in the stub** with the same payee, the date and what it was for.
6. **Keep the stub** somewhere safe, and photograph it as a backup.

Write in ink, and do not cross anything out. If you make a mistake on the money order, ask the issuer what to do rather than correcting it yourself.

## Tracing a Lost or Stolen USPS Money Order

According to USPS:

1. **Payment cannot be stopped**, but a replacement can be issued.
2. **Take your receipt to a Post Office** and ask a retail associate to start a Money Order Inquiry.
3. **Track the inquiry** in the Money Orders application.
4. **Expect it to take time.** USPS says confirming loss or theft can take up to 30 days, and investigating the status up to 60 days.
5. **A processing fee applies.** It was listed at $23.00 when we checked in October 2026.

For a damaged money order, USPS asks you to bring the money order and your receipt to a Post Office for a replacement. Without the receipt, every one of these steps is harder.

## If You Are the One Being Paid

The stub belongs to the buyer, so the payee has no record of the payment unless they write one. Give the payer a receipt with:

| Field | Example |
|---|---|
| Receipt number | 0307 |
| Date received | Oct 29, 2026 |
| Received from | Marcus Bell |
| Amount | $725.00 |
| Payment method | USPS money order, serial ending 4417 |
| For | November rent, Unit 4B |
| Balance due | $0.00 |
| Received by | Signature and printed name |

Recording the serial number lets you both match the payment if a question comes up. Landlords taking rent by money order can also use our [rent receipt template](/templates/rent-receipt).

If you receive a money order from someone you do not know, be wary of one written for more than the amount owed with a request to send back the difference, and check it with the issuer before handing over goods or cash. For check payments, the same habits apply; see [check receipt](/blog/check-receipt).

## Making the Receipt

Our [cash receipt template](/templates/cash-receipt) works for money order payments: put "Money order" and the serial number in the payment method field. Building and previewing are free; a watermark-free download needs an account.`,
    faqs: [
      {
        q: "What is a money order receipt?",
        a: "The customer stub you keep when you buy a money order. It shows the serial number and amount and is needed to check status or request a replacement.",
      },
      {
        q: "Why should I keep my money order receipt?",
        a: "USPS says to keep it to track the money order, and you take it to a Post Office to start an inquiry if the money order is lost or stolen.",
      },
      {
        q: "How do I check if a USPS money order was cashed?",
        a: "Use the USPS Money Orders application online with the serial number, Post Office number and dollar amount from your receipt.",
      },
      {
        q: "Can I replace a lost USPS money order without the receipt?",
        a: "USPS asks you to bring your receipt to start a Money Order Inquiry, so keep it safe and photograph it when you buy the money order.",
      },
      {
        q: "How long does it take to replace a lost USPS money order?",
        a: "USPS says confirming loss or theft can take up to 30 days and investigating the status up to 60 days.",
      },
      {
        q: "Can I stop payment on a USPS money order?",
        a: "No. USPS says payment cannot be stopped, but a lost or stolen money order can be replaced after an inquiry.",
      },
      {
        q: "What is the maximum for a USPS money order?",
        a: "$1,000 for a domestic money order. Buy several if you need to send more.",
      },
      {
        q: "Do money orders from banks or Western Union work the same way?",
        a: "Similarly, but each issuer has its own form, fees and lost-money-order process. Ask the issuer that sold it.",
      },
      {
        q: "Should I fill in the payee right away?",
        a: "Yes. A money order with a blank payee can be filled in and cashed by anyone who finds it.",
      },
      {
        q: "How do I give a receipt for a money order payment?",
        a: "Write a receipt showing the date, payer, amount, 'money order' with its serial number, what it paid for and your signature.",
      },
    ],
  },
];
