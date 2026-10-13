/**
 * Day 2026-12-12, slot b (14:00Z). Elliot writer J.
 * Keyword: "year-end checklist for small business" (receipts and records focus).
 * Demand: Google autocomplete, checked 2026-10-13; no makecepeit page ranks for it.
 * Owner/links: /templates/invoice (owner), /blog/receipts-to-keep-for-taxes,
 *   /blog/donation-acknowledgement-letter, /blog/how-to-invoice-as-a-1099-contractor,
 *   /blog/gross-receipts, /create.
 * Angle: AI-citable checklist table for the last weeks of December: send final invoices,
 * reconcile income, chase missing receipts, 1099-NEC prep, donations by Dec 31 and their
 * acknowledgments, back up digital receipts. receipts-to-keep-for-taxes is the "which receipts"
 * reference; this is the dated to-do list.
 * Product check: /templates/invoice is a real invoice (bill-to, terms, due date, amount due).
 *
 * Facts checked 2026-10-13:
 *   - IRS, Instructions for Forms 1099-MISC and 1099-NEC (Dec 2026 revision, for 2026 information
 *     filed in early 2027), https://www.irs.gov/instructions/i1099mec : 1099-NEC is due to the IRS
 *     and to recipients by January 31; weekend/holiday -> next business day; for tax years
 *     beginning after 2025 the 1099-NEC nonemployee compensation threshold is $2,000, may be
 *     inflation-adjusted from 2027. January 31, 2027 is a Sunday, so the due date is Monday,
 *     February 1, 2027 (computed).
 *   - IRS Pub 526 (2025 returns), https://www.irs.gov/publications/p526 : deduct contributions only
 *     in the year you actually make them; a check is delivered on the date mailed; a bank credit
 *     card contribution is deductible in the year charged; written acknowledgment for $250 or more
 *     is contemporaneous if obtained by the earlier of the date you file the return or its due
 *     date including extensions.
 *   - IRS, Charitable contributions: written acknowledgments,
 *     https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contributions-written-acknowledgments :
 *     acknowledgment for $250+ must include organization name, cash amount, description (not
 *     value) of non-cash items, and a statement of goods or services provided (or none).
 *   - IRS Pub 583, https://www.irs.gov/publications/p583 : keep records as long as needed for the
 *     tax law; generally until the period of limitations runs out, usually 3 years; employment tax
 *     records at least 4 years; expense documents should show the amount paid and that it was for
 *     a business expense.
 *   - IRS Pub 463, https://www.irs.gov/publications/p463 : record expense elements at or near the
 *     time; documentary evidence shows amount, date, place and essential character.
 * Business and amounts in the example are fictional.
 */

export const DEC_12B_YEAR_END_RECEIPTS_CHECKLIST = [
  {
    slug: "year-end-receipts-checklist",
    image: "assets/year-end-receipts-checklist.jpeg",
    category: "small-business",
    publishedAt: "2026-12-12T14:00:00Z",
    title: "Year-End Checklist for Small Business: Receipts and Records",
    seoTitle: "Year-End Checklist for Small Business: Receipts & Records",
    seoDescription:
      "A December checklist for small businesses: final invoices, missing receipts, 1099-NEC prep, donations by Dec 31, acknowledgments and backups.",
    excerpt:
      "The last weeks of December decide how easy tax season will be. This checklist covers the receipts and records to sort before January: invoices, missing receipts, 1099-NEC forms, year-end donations and backups.",
    body: `**A small business year-end checklist for receipts and records has six jobs: send every invoice for work done this year, match income to deposits, chase missing expense receipts, collect contractor details for Form 1099-NEC, make and document any donations by December 31, and back up every digital receipt. For payments made in 2026, Form 1099-NEC is due to contractors and the IRS by February 1, 2027, because January 31 falls on a Sunday.**

Start with the first job: if you finished work for a client this year and have not billed it, send an [invoice](/templates/invoice) now, with the work date, terms and due date on it. Then work down the table.

## The Checklist

| # | Task | Deadline | What you need |
|---|---|---|---|
| 1 | Send final invoices for work done this year | Before Dec 31 | Invoice with work dates and due date |
| 2 | Match every invoice and sales receipt to a deposit | Before Dec 31 | Bank statements, sales records |
| 3 | Chase missing or faded expense receipts | Before Dec 31 | Vendor contact details, card statements |
| 4 | Note the business purpose on each receipt | Before Dec 31 | Your expense log |
| 5 | Confirm contractor names, addresses and tax IDs | Early January | Your records of payments to contractors |
| 6 | Furnish and file Form 1099-NEC | Feb 1, 2027 (for 2026 payments) | Totals paid to each contractor |
| 7 | Make planned charitable donations | Dec 31 | Check mailed, card charge or bank transfer |
| 8 | Get written acknowledgments for gifts of $250 or more | By the earlier of filing your return or its due date | Letter or email from the charity |
| 9 | Back up all digital receipts and invoices | Before Dec 31 | Second location, separate from your laptop |
| 10 | Start a clean folder for the new year | Jan 1 | Same structure as this year |

## 1. Send Final Invoices

Any finished job that has not been billed is income you may be chasing in February. Send the invoice while the details are fresh, and put the date the work was done on it so it lands in the right year in your records. If you are a contractor billing clients, our guide to [invoicing as a 1099 contractor](/blog/how-to-invoice-as-a-1099-contractor) covers what clients need from you.

## 2. Match Income to Deposits

Add up your invoices and sales receipts and compare them with bank deposits. Gaps usually mean an unpaid invoice, a payment app transfer that never reached the bank, or a cash sale with no receipt. This total is the starting point for your [gross receipts](/blog/gross-receipts) figure.

## 3. Chase Missing Expense Receipts

[IRS Publication 583](https://www.irs.gov/publications/p583) says your expense documents should show the amount paid and that it was for a business expense, and that proof of payment alone does not establish a deduction. A card statement shows the amount; it does not show what you bought.

Go through your statements for December and earlier, and for each business charge without a receipt:

- check your email for an emailed receipt or order confirmation
- log in to the vendor's account and download the invoice
- ask the vendor for a duplicate

[IRS Publication 463](https://www.irs.gov/publications/p463) says to record expense details at or near the time of the expense, because a timely record carries more weight than one written later. That is the case for doing this in December rather than April. Do not recreate a receipt yourself: get the real one from the seller, or note the expense in your log with what you know.

## 4. Note the Business Purpose

A receipt rarely says why you bought something. Write it on the receipt or in your log now: "client lunch, Harper project" or "replacement printer for office".

## 5 and 6. Prepare for Form 1099-NEC

If you paid an independent contractor for services in the course of your business, you may need to issue Form 1099-NEC. According to the [IRS instructions for Forms 1099-MISC and 1099-NEC](https://www.irs.gov/instructions/i1099mec):

- For tax years beginning after 2025, the reporting threshold for nonemployee compensation is **$2,000**, and it may be adjusted for inflation from 2027.
- The form must be furnished to the contractor and filed with the IRS by **January 31**. When that date falls on a weekend or legal holiday, the deadline moves to the next business day. January 31, 2027 is a Sunday, so 2026 forms are due **Monday, February 1, 2027**.

The useful December job is getting the details now: the legal name, address and tax ID for each contractor you paid, and your total paid to each one for the year. Many businesses collect these on Form W-9 when they first hire a contractor; if you did not, ask before the holidays.

## 7 and 8. Year-End Donations

If you plan to give to charity this year, the timing rules in [IRS Publication 526](https://www.irs.gov/publications/p526) decide which year the gift counts in:

- You deduct contributions only in the year you actually make them.
- A check counts as delivered on the date you mail it.
- A credit card gift counts in the year the charge is made.

For any single gift of $250 or more, you need a written acknowledgment from the charity, and Pub 526 says it must be obtained by the earlier of the date you file your return or its due date, including extensions. The IRS says the acknowledgment should show the charity's name, the cash amount, a description (not the value) of any non-cash gift, and whether the charity gave you anything in return. Our post on [donation acknowledgment letters](/blog/donation-acknowledgement-letter) shows a sample.

## 9. Back Up Digital Receipts

Keep scans, photos and emailed receipts in at least two places: for example, cloud storage and an external drive. Name files so they sort by date: "2026-12-04 printer ink 86.40.pdf". Pub 583 says to keep records as long as they may be needed for the tax law, generally until the period of limitations for the return runs out, which is usually 3 years, and at least 4 years for employment tax records. Our guide to [receipts to keep for taxes](/blog/receipts-to-keep-for-taxes) covers which documents to hold on to.

## Worked Example

A one-person web design studio (fictional) runs the checklist on December 10, 2026:

| Item | Finding | Action |
|---|---|---|
| Unbilled work | Two finished sites not invoiced, $2,400 and $1,150 | Invoices sent Dec 10 |
| Income check | Invoices for the year total $68,300; deposits $66,900 | $1,400 traced to an unpaid November invoice; reminder sent |
| Missing receipts | 7 card charges with no receipt | 6 downloaded from vendor accounts, 1 duplicate requested |
| Contractors | Paid a copywriter $3,600 and an illustrator $1,200 | Copywriter is over $2,000: confirm W-9 details, prepare 1099-NEC |
| Donations | Planned $300 gift to a local food bank | Paid by card Dec 10; acknowledgment requested |
| Backups | Receipts only on laptop | Copied to cloud folder and external drive |

## Make the Missing Documents Now

If your list turns up work you have not billed, [build the invoice](/create) and send it today. Building and previewing need no account; downloading needs a free account, and the first download is watermark-free. Invoice only for work you actually did.

This is general information, not tax advice. Check the current IRS instructions for your tax year or ask a tax professional.`,
    faqs: [
      {
        q: "What should a small business do with receipts at year end?",
        a: "Chase any missing expense receipts, note the business purpose on each, match income records to bank deposits, and back everything up in at least two places before January.",
      },
      {
        q: "When is Form 1099-NEC due for 2026 payments?",
        a: "The IRS deadline is January 31, moved to the next business day when it falls on a weekend. January 31, 2027 is a Sunday, so forms for 2026 payments are due February 1, 2027, to both the contractor and the IRS.",
      },
      {
        q: "What is the 1099-NEC threshold for 2026?",
        a: "The IRS instructions say that for tax years beginning after 2025 the threshold for nonemployee compensation is $2,000, which may be adjusted for inflation from 2027.",
      },
      {
        q: "Does a donation have to be made by December 31 to count this year?",
        a: "Yes. IRS Publication 526 says you deduct contributions in the year you actually make them. A mailed check counts on the date mailed, and a credit card gift counts in the year it is charged.",
      },
      {
        q: "When do I need the charity's acknowledgment letter?",
        a: "For a gift of $250 or more, by the earlier of the date you file your return or the return's due date including extensions, according to IRS Publication 526.",
      },
    ],
  },
];
