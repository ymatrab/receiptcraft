/**
 * Cadence fill — Day 2026-10-09, post 2 of 2 (14:00Z). Pairs with the oil
 * change post at 09:30Z. Keyword gate checked 2026-10-06: no page owns it;
 * /blog/receipt-book-vs-digital is a different question (which to use).
 *   "how to fill out a receipt book"  1,600/mo · Low competition
 *   -> /templates/cash-receipt, /blog/receipt-book-vs-digital
 *
 * No regulated claims; describes the standard duplicate receipt book layout.
 */

export const OCT_9B = [
  {
    slug: "how-to-fill-out-a-receipt-book",
    image: "assets/how-to-fill-out-a-receipt-book.jpeg",
    category: "how-to",
    publishedAt: "2026-10-09T14:00:00Z",
    title: "How to Fill Out a Receipt Book, Field by Field",
    seoTitle: "How to Fill Out a Receipt Book, Field by Field",
    seoDescription:
      "How to fill out a receipt book: number, date, received from, amount in words and figures, what it was for, payment method, balance and signature.",
    excerpt:
      "A receipt book page has the same fields every time: number, date, who paid, the amount in words and figures, what it was for, how it was paid, and your signature. Here's each one, and what to do with the copy.",
    body: `**To fill out a receipt book, write the date, the name of the person who paid, the amount in figures and in words, what the payment was for, how it was paid (cash, check or money order), any balance still due, and sign it.** The receipt number is usually pre-printed. Press firmly so the carbon copy underneath is legible, give the customer the top copy and keep the copy in the book.

Most receipt books, from the standard two-part pads to three-part books, use the same layout. The fields below follow it from top to bottom.

## The Fields, Top to Bottom

| Field | What to write |
|---|---|
| No. | Usually pre-printed. Never skip or reuse one. |
| Date | The day the money was received. |
| Received from | The full name of the person or business that paid. |
| Amount (figures) | The amount in numbers, for example 250.00. |
| Amount (words) | The same amount in words, for example "Two hundred fifty and 00/100". |
| For | What the payment covers: "October rent, Unit 3", "Deposit on dining table". |
| Payment method | Tick cash, check (with its number) or money order. |
| Account / Payment / Balance due | For part payments: the total owed, this payment, and what is left. |
| By (signature) | The person who received the money signs. |

### Why write the amount twice?

The figures are easy to alter; a "1" becomes a "7" with one stroke. The amount in words is much harder to change, which is why checks use the same idea. If the two ever disagree, the words are usually taken as the intended amount.

## Step by Step

1. Check the receipt number is the next in sequence.
2. Write the date.
3. Write the payer's full name after "Received from".
4. Write the amount in figures, then in words.
5. Describe what the payment is for, including the period for rent or a reference for an invoice.
6. Mark the payment method and write the check number if there is one.
7. For a part payment, fill in the account total, this payment and the balance due.
8. Sign it, tear off the top copy for the customer, and leave the carbon copy in the book.

## Two-Part or Three-Part Books

**A two-part book gives the payer the original and leaves you a copy; a three-part book adds a second copy.** Two parts is enough for most sole traders and landlords. A three-part book suits a business where one copy goes to the customer, one stays in the book, and one goes to whoever does the bookkeeping. Whichever you use, press hard with a ballpoint pen, and slip the cardboard divider under the set you are writing on so the next receipt does not pick up your writing.

## Using a Receipt Book for Rent

**Rent receipts need the period and the property, not just the date.** Write "Rent for October 2026, Unit 3" in the For line, not "Rent". A tenant may need these receipts for tax credits or benefits, and some places require a landlord to provide one on request, so a receipt that names the month and the address answers the question it will be used for.

## Mistakes and Voided Receipts

**Do not tear out a spoiled receipt.** Write "VOID" across both copies, leave them in the book, and use the next number. A gap in the numbering is the first thing anyone checking your records will ask about, and a voided receipt answers the question before it is asked.

## Keep the Book

The carbon copies are your record of every payment you received, so keep finished books with your business records. If you write a lot of receipts, a digital [cash receipt template](/templates/cash-receipt) does the numbering and arithmetic for you, and our comparison of [receipt books and digital receipts](/blog/receipt-book-vs-digital) covers when each makes sense.`,
    faqs: [
      {
        q: "How do you fill out a receipt book?",
        a: "Write the date, who paid, the amount in figures and words, what it was for, the payment method, any balance due, and sign it. Give the top copy to the payer and keep the carbon copy.",
      },
      {
        q: "Why does a receipt book ask for the amount in words?",
        a: "Figures are easy to alter; words are not. Writing both makes the amount hard to change after the fact.",
      },
      {
        q: "What do I do if I make a mistake on a receipt?",
        a: "Write VOID across both copies, leave them in the book, and use the next receipt number. Never tear a spoiled receipt out.",
      },
      {
        q: "What goes in the 'For' line?",
        a: "What the payment covers, specifically: 'October rent, Unit 3', 'Deposit on dining table', or an invoice number.",
      },
      {
        q: "How do I record a partial payment?",
        a: "Use the account, payment and balance due lines: the total owed, the amount received now, and what is still outstanding.",
      },
      {
        q: "Which copy does the customer get?",
        a: "The top, original copy. The carbon copy stays in the book as your record.",
      },
      {
        q: "Do I need to sign every receipt?",
        a: "Yes. The signature shows who received the money, which matters most for cash payments.",
      },
      {
        q: "How long should I keep used receipt books?",
        a: "Keep them with your business or tax records for as long as those records need to be kept.",
      },
      {
        q: "Can I write the check number on the receipt?",
        a: "Yes, and you should. It links the receipt to the bank record of the payment.",
      },
      {
        q: "Is a handwritten receipt from a receipt book valid?",
        a: "Yes. A completed, signed receipt book entry is a valid record of payment.",
      },
    ],
  },
];
