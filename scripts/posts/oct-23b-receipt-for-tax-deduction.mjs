/**
 * Day 2026-10-23, slot b (14:00Z). Writer C.
 * Keyword gate 2026-10-11 (DataForSEO, US monthly): no makecepeit page ranks.
 *   "receipt for tax deduction"  110/mo
 *   -> owner /templates/itemized-receipt
 * Angle: the fields that make a receipt usable as proof of a business deduction,
 * for the person writing or checking it. Links the $75 and $250 rule posts.
 *
 * Facts checked 2026-10-11:
 *   - IRS Pub 463 (2025), https://www.irs.gov/publications/p463 : documentary evidence
 *     generally required; not needed for expenses other than lodging under $75;
 *     adequate evidence shows amount, date, place and essential character; hotel receipt
 *     needs name/location, dates, separate charges; restaurant receipt needs name/location,
 *     number of people served, date and amount; a canceled check by itself does not prove
 *     a business expense; written statement of business purpose generally required; keep
 *     records generally 3 years from filing.
 *   - IRS Pub 526 (2025), https://www.irs.gov/publications/p526 : $250+ contribution needs
 *     a contemporaneous written acknowledgment; cash gifts of any amount need a bank record
 *     or a receipt/letter/email from the organization showing name, date and amount.
 */

export const OCT_23B_RECEIPT_FOR_TAX_DEDUCTION = [
  {
    slug: "receipt-for-tax-deduction",
    image: "assets/receipt-for-tax-deduction.jpeg",
    category: "taxes",
    publishedAt: "2026-10-23T14:00:00Z",
    title: "What a Receipt Needs to Show for a Tax Deduction",
    seoTitle: "Receipt for Tax Deduction: What It Must Show",
    seoDescription:
      "What a receipt must show for a business tax deduction: who was paid, what, when, how much and why. Plus the $75 rule, donation receipts and retention.",
    excerpt:
      "The IRS wants receipts that show the amount, date, place and nature of an expense, plus a business purpose. Here is what that looks like on paper, with examples for meals, hotels, supplies and donations.",
    body: `**For a business tax deduction, a receipt should show who was paid, what was bought, when, where and how much. IRS Publication 463 calls this the amount, date, place and essential character of the expense. You add the business purpose yourself, on the receipt or in your records.** If you are the business issuing the receipt, an [itemized receipt template](/templates/itemized-receipt) gives your customer every one of those fields.

## The Five Things a Deductible Receipt Proves

| Element | What shows it | Example |
|---|---|---|
| Who | Merchant name and location | Office Hub, 12 Grand Ave, Denver, CO |
| What | Itemized description | Laser printer, 2 toner cartridges |
| When | Date of the purchase | Oct 6, 2026 |
| How much | Amount of each item and total paid | $289.00 |
| Why | Business purpose, written by you | "Printer for client invoices, home office" |

[IRS Publication 463](https://www.irs.gov/publications/p463) says documentary evidence is ordinarily adequate if it shows the amount, date, place and essential character of the expense. It also says you generally need a written statement of the business purpose, unless the purpose is clear from the circumstances. A single word on the back of the receipt, or a note in your bookkeeping app, does the job.

## Receipts That Need Extra Detail

Pub 463 lists what some receipts must show to stand on their own:

- **Hotel:** the hotel's name and location, the dates you stayed, and separate amounts for lodging, meals, phone calls and other charges.
- **Business meal:** the restaurant's name and location, the number of people served, and the date and amount. If the bill includes anything other than food and drink, the receipt has to show it.

A card terminal slip that shows only a total fails both tests. Keep the itemized copy.

## What Does Not Count on Its Own

- **A canceled check or card statement alone.** Pub 463 says a canceled check, together with a bill from the payee, ordinarily establishes the cost, but a check by itself does not prove a business expense.
- **A receipt with no description.** "Merchandise $142.18" does not show what was bought.
- **A handwritten note you wrote yourself after the fact.** A receipt comes from the business that was paid. Handwritten receipts from the seller are fine; our guide to [handwritten receipts](/blog/handwritten-receipts-valid) explains when.

## The $75 Rule

Pub 463 says documentary evidence is not needed for an expense, other than lodging, that costs less than $75. You still need a record of the amount, date, place and purpose. Lodging needs a receipt at any amount. Details in our [$75 receipt rule guide](/blog/irs-75-dollar-receipt-rule).

## Receipts for Charitable Donations

Donations follow their own rules in [IRS Publication 526](https://www.irs.gov/publications/p526):

- For any cash gift, keep a bank record or a receipt, letter or email from the charity showing its name, the date and the amount.
- For a single gift of $250 or more, you need a written acknowledgment from the charity, received by the time you file. It must state the amount and whether you got anything in return.

See our [donation receipt requirements](/blog/donation-receipt-requirements) for the full list.

## A Worked Example: Supplies for a Small Business

| Item | Qty | Amount |
|---|---|---|
| Laser printer | 1 | $219.00 |
| Toner cartridge | 2 | $70.00 |
| **Total paid (Visa ending 8812)** | | **$289.00** |

Header: "Office Hub, 12 Grand Ave, Denver, CO. Receipt #55821, Oct 6, 2026." Written on it by the buyer: "Home office, printing client invoices." That one receipt shows all five elements.

## How to Make Your Receipts Deduction-Ready

1. Ask for the itemized receipt, not just the card slip.
2. Write the business purpose on it the same day, or note it in your records.
3. For meals, note who attended and the business discussed.
4. Scan or photograph it and file it by tax year.
5. Keep it for as long as the return can be examined. Pub 463 says that is generally 3 years from the date you file.

Our guide to [receipts to keep for taxes](/blog/receipts-to-keep-for-taxes) covers which documents to hold.

## If You Issue Receipts to Customers

Your customers want to deduct what they pay you, so give them a receipt that does the work: your business name and address, a receipt number, the date, an itemized list, the total and how it was paid. Freelancers can follow our [freelancer receipts guide](/blog/freelancer-receipts). You can build that receipt on [makecepeit](/create) for free; a watermark-free download needs an account. Receipts must always reflect a real sale.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "What does a receipt need to show for a tax deduction?",
        a: "The merchant's name and location, the date, a description of what was bought, and the amount. You add the business purpose. IRS Publication 463 calls this the amount, date, place and essential character.",
      },
      {
        q: "Is a credit card statement enough for a deduction?",
        a: "On its own it shows a payment, not what was bought. Keep the itemized receipt, and use the statement as backup.",
      },
      {
        q: "Do I need a receipt for every business expense?",
        a: "Pub 463 says documentary evidence is not required for expenses other than lodging under $75, but you still need a record of the amount, date, place and purpose.",
      },
      {
        q: "What must a business meal receipt show?",
        a: "The restaurant's name and location, the number of people served, and the date and amount. Note the business purpose and who attended.",
      },
      {
        q: "What must a hotel receipt show?",
        a: "The hotel's name and location, the dates of the stay, and separate amounts for lodging, meals, phone and other charges.",
      },
      {
        q: "Do I need a receipt for a donation?",
        a: "For any cash gift you need a bank record or a written receipt from the charity. For a single gift of $250 or more you need the charity's written acknowledgment.",
      },
      {
        q: "Should I write the business purpose on the receipt?",
        a: "Yes, or record it somewhere linked to the receipt. Pub 463 generally requires a written statement of business purpose.",
      },
      {
        q: "Are photos of receipts acceptable?",
        a: "A clear, legible image that shows all the details works as a record. Make sure the date, merchant and amounts are readable.",
      },
      {
        q: "How long should I keep receipts for deductions?",
        a: "Generally 3 years from the date you file the return, according to Pub 463. Some situations call for longer.",
      },
      {
        q: "Can I write my own receipt for an expense?",
        a: "No. A receipt comes from the business you paid. If you lose one, ask the merchant for a copy and keep your own written record.",
      },
    ],
  },
];
