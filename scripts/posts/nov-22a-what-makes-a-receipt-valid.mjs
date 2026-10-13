/**
 * Day 2026-11-22, slot a (09:30Z). Elliot writer J.
 * Keyword: "what makes a receipt valid" / "what constitutes a valid receipt".
 * Demand: Google autocomplete, checked 2026-10-13; no makecepeit page ranks for it.
 * Owner/links: /create (owner), /blog/handwritten-receipts-valid, /blog/receipts-to-keep-for-taxes,
 *   /blog/vat-invoice-requirements-uk (same batch, 2026-11-16), /templates/sales-receipt.
 * Angle: AI-citable checklist. handwritten-receipts-valid covers the medium (pen vs print);
 * this post covers the elements, using the IRS documentary-evidence test as the yardstick, and
 * splits "valid for the buyer's records" from "valid as proof of payment".
 * Product check: builder header (store name), date/time, receipt number, items, payment
 * method and signature sections exist in components/builder/SectionBuilder.tsx.
 *
 * Facts checked 2026-10-13:
 *   - IRS Pub 463 (2025), https://www.irs.gov/publications/p463 , ch. 5 "What Are Adequate
 *     Records?": documentary evidence (receipts, canceled checks, bills) is ordinarily adequate
 *     if it shows the amount, date, place and essential character of the expense; not required
 *     if the expense, other than lodging, is less than $75; hotel receipt must show name and
 *     location of the hotel, dates stayed, separate amounts for lodging, meals, phone;
 *     "A canceled check, together with a bill from the payee, ordinarily establishes the cost";
 *     a written statement of business purpose is generally required; record elements "at or
 *     near the time of the expense".
 *   - IRS Pub 583, https://www.irs.gov/publications/p583 : supporting documents "should show
 *     the amount paid and that the amount was for a business expense"; proof of payment alone
 *     does not establish a deduction; examples: canceled checks, cash register tapes, account
 *     statements, credit card sales slips, invoices, petty cash slips.
 *   - GOV.UK, https://www.gov.uk/invoicing-and-taking-payment-from-customers/invoices-what-they-must-include :
 *     VAT invoices must be used when seller and customer are both VAT registered and include
 *     more information than non-VAT invoices (detail left to the linked Nov 16 post).
 * Sample business and amounts are fictional.
 */

export const NOV_22A_WHAT_MAKES_A_RECEIPT_VALID = [
  {
    slug: "what-makes-a-receipt-valid",
    image: "assets/what-makes-a-receipt-valid.jpeg",
    category: "basics",
    publishedAt: "2026-11-22T09:30:00Z",
    title: "What Makes a Receipt Valid? A Checklist of Required Elements",
    seoTitle: "What Makes a Receipt Valid? Required Elements Checklist",
    seoDescription:
      "A valid receipt shows who was paid, when, how much and for what. The full checklist, what the IRS expects for business expenses, and a sample.",
    excerpt:
      "A receipt is valid when it shows who was paid, the date, the amount and what the payment bought. Here is the element-by-element checklist, what the IRS looks for on business expense receipts, and a sample that passes.",
    body: `**A receipt is valid when it identifies who was paid, the date, the amount and what was bought, in a form the other person can keep. For business expenses, the IRS says documentary evidence is ordinarily adequate if it shows the amount, date, place and essential character of the expense. No signature, stamp or special paper is required for an ordinary sale receipt; what matters is that the details are complete and match the payment.**

If you are the one issuing receipts, the quickest way to tick every box is to [build the receipt](/create) from a layout that already has a field for each element. If you are checking a receipt you were given, use the checklist below.

## The Checklist

| Element | Why it matters | Required? |
|---|---|---|
| Seller's name | Shows who received the money (the "place" in IRS terms) | Yes |
| Seller's address or location | Ties the expense to a place; the IRS asks for hotel location | Strongly recommended |
| Date of the sale or payment | Puts the expense in the right tax year | Yes |
| Description of goods or services | Shows the "essential character" of the expense | Yes |
| Amount for each item and the total | Proves the amount; lets you split business from personal items | Yes |
| Tax shown separately | Needed for sales tax or VAT records | Where tax applies |
| Payment method | Links the receipt to a bank or card record | Recommended |
| Receipt or transaction number | Lets the seller find it again and spot duplicates | Recommended |
| Buyer's name | Useful for large purchases, rent, deposits and services | Recommended |
| Signature | Helpful on handwritten or cash receipts; not required on printed ones | Optional |

Four lines carry the weight: who, when, how much, for what. A receipt missing any one of them will struggle to prove anything. The rest make it easier to match, search and defend later.

## What the IRS Expects for Business Expenses

The clearest standard comes from [IRS Publication 463](https://www.irs.gov/publications/p463), chapter 5. It says you generally need documentary evidence such as receipts, canceled checks or bills, and that this evidence is ordinarily adequate if it shows:

- **Amount** of the expense
- **Date** it was incurred
- **Place**, meaning the name and location of the business
- **Essential character**, meaning what was actually bought

A few rules sit on top of that:

- **Business purpose is a separate note.** Pub 463 says you generally must provide a written statement of the business purpose. A receipt rarely says why you bought something, so write it on the back or in your expense log.
- **Under $75.** Documentary evidence is not required for an expense, other than lodging, of less than $75. You still need a record of the elements, such as a log entry.
- **Hotels.** A hotel receipt should show the hotel's name and location, the dates you stayed and separate amounts for lodging, meals and phone calls.
- **Write it down at the time.** The IRS says to record the elements at or near the time of the expense, because a timely record carries more weight than one made later.

## Proof of Payment Is Not the Same as a Receipt

[IRS Publication 583](https://www.irs.gov/publications/p583) adds an important line: proof of payment by itself does not establish that you are entitled to a deduction. A bank statement shows that $86.40 left your account. It does not show that the money bought printer ink rather than groceries.

Pub 583 says supporting documents should show the amount paid and that it was for a business expense. Pub 463 makes the same point from the other side: a canceled check together with a bill from the payee ordinarily establishes the cost. You want the pair: something that proves payment and something that describes what you paid for. A well-made itemized receipt does both at once.

## A Sample That Passes

Here is a fictional receipt from a print shop, checked against the list:

| Field | Sample |
|---|---|
| Seller | Copper Kettle Print Co., 412 Alder St, Bend, OR |
| Receipt no. | R-20581 |
| Date | November 18, 2026 |
| Items | 500 business cards, $64.00; 2 vinyl banners, $96.00 |
| Total | $160.00 |
| Payment | Visa ending 4417 |
| Buyer | Lena Ortiz, Ortiz Dog Walking |
| Business purpose (written by buyer) | Marketing for spring launch |

Every IRS element is there: amount ($160.00), date, place (the shop's name and address) and essential character (business cards and banners). The card digits match the card statement, and the buyer's note supplies the business purpose. This sample carries no sales tax; where tax is charged, it should appear on its own line.

## Common Reasons a Receipt Falls Short

- **"Merchandise" as the only description.** It hides the essential character. Ask for an itemized copy.
- **Faded thermal paper.** A receipt you cannot read proves nothing. Scan or photograph it the day you get it.
- **No seller name.** Some card slips show only a processor code. Keep the itemized receipt as well as the card slip.
- **Total only, mixed purchase.** If business and personal items were bought together, you need the line items to claim only the business part.
- **Written after the fact.** A receipt the seller fills in weeks later, from memory, is weaker than one issued at the sale.

Whether the receipt was printed or written by hand does not change the list. Our post on [handwritten receipts](/blog/handwritten-receipts-valid) covers when handwriting works well and when it causes friction.

## Valid Outside the US

Other countries add their own rules. In the UK, [GOV.UK](https://www.gov.uk/invoicing-and-taking-payment-from-customers/invoices-what-they-must-include) says you must use VAT invoices when both you and your customer are VAT registered, and it says those include more information than a non-VAT invoice. Our guide to [UK VAT invoice requirements](/blog/vat-invoice-requirements-uk) lists them.

## Making Receipts That Pass

If you sell goods or services, put every element on the receipt from the start:

1. Your business name and address in the header.
2. A receipt number and the date of the sale.
3. One line per item with a clear description and price.
4. Tax on its own line, if you charge it.
5. The payment method and, for cash or larger sales, the buyer's name.
6. A signature line for cash payments.

The [sales receipt template](/templates/sales-receipt) has a field for each of these. You can build and preview without an account; downloading needs a free account, and the first download is watermark-free. A receipt should always describe a real sale that actually took place. For deciding which receipts to keep once you have them, see [receipts to keep for taxes](/blog/receipts-to-keep-for-taxes).

This is general information, not tax or legal advice. For your situation, follow current IRS guidance or ask a tax professional.`,
    faqs: [
      {
        q: "What information must a receipt have to be valid?",
        a: "At minimum: the seller's name, the date, a description of what was bought and the amount paid. For business expenses, the IRS says receipts are ordinarily adequate if they show the amount, date, place and essential character of the expense.",
      },
      {
        q: "Does a receipt need a signature to be valid?",
        a: "No. Printed sales receipts are not signed. A signature helps on handwritten or cash receipts because it shows who accepted the money.",
      },
      {
        q: "Is a bank statement a valid receipt?",
        a: "It proves payment but not what you bought. IRS Publication 583 says proof of payment alone does not establish a deduction, so keep the itemized receipt or invoice too.",
      },
      {
        q: "Do I need receipts for expenses under $75?",
        a: "IRS Publication 463 says documentary evidence is not required for expenses, other than lodging, of less than $75. You still need a record of the amount, date, place and business purpose.",
      },
    ],
  },
];
