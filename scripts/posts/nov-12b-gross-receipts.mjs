/**
 * Day 2026-11-12, slot b (14:00Z). Writer B (Elliot writers test).
 * Keyword gate (coordinator brief, DataForSEO US monthly):
 *   "what are gross receipts"  1,600/mo  (the "gross receipts" info gap flagged in the
 *   Aug 2026 keyword-opportunity memo)
 *   -> owner /templates/invoice; links /blog/receipts-to-keep-for-taxes, /create
 * Angle: answer-first, AI-citable explainer. Definition, gross receipts vs net receipts vs
 * gross profit vs gross income vs net profit, where it appears (Schedule C line 1, the
 * small business gross receipts test), and how invoices and receipts feed the total.
 * Creation tie-in: every sale should have an invoice or receipt so line 1 can be added up.
 *
 * Facts checked 2026-10-13:
 *   - IRS, Instructions for Schedule C (2025), https://www.irs.gov/instructions/i1040sc :
 *     line 1 "Enter gross receipts from your trade or business"; include Forms 1099-NEC
 *     amounts and attach a statement if line 1 is less than their box 1 total; line 2 returns and allowances as a positive number; sales tax imposed on you
 *     as the seller and collected from the buyer goes in line 1; sales tax imposed on the
 *     buyer that you collect and pay over is not in gross receipts; small business taxpayer
 *     = average annual gross receipts of $31 million or less for the 3 prior tax years
 *     (indexed for inflation) and not a tax shelter; line 7 is gross income; line 31 net
 *     profit or loss.
 *   - IRS Pub 334 (for 2025 returns), https://www.irs.gov/publications/p334 : net receipts
 *     (line 3) = gross receipts (line 1) minus returns and allowances (line 2); gross profit
 *     = line 3 minus cost of goods sold (line 4); service businesses' gross profit = net
 *     receipts; income from other sources goes on line 6 and is added to gross profit to
 *     give gross business income; barter received at fair market value is included in gross
 *     receipts; a bona fide loan is not income; Form 1099-K may not equal the amount to
 *     report (can omit receipts or include sales tax); "use a proper invoicing system".
 *   - IRS, Gross receipts defined (exempt organizations),
 *     https://www.irs.gov/charities-non-profits/gross-receipts-defined : total amounts
 *     received from all sources during the annual accounting period, without subtracting
 *     costs or expenses.
 * The $31 million figure is the one printed in the 2025 instructions; the post says it is
 * indexed yearly and to check the current instructions. Not used: the $32 million 2026
 * figure seen only on secondary sites (no irs.gov page found for it on 2026-10-13).
 * Sample business and amounts are fictional.
 */

export const NOV_12B_GROSS_RECEIPTS = [
  {
    slug: "gross-receipts",
    image: "assets/gross-receipts.jpeg",
    category: "taxes",
    publishedAt: "2026-11-12T14:00:00Z",
    title: "What Are Gross Receipts? Definition, Examples and Where They Go",
    seoTitle: "What Are Gross Receipts? IRS Meaning and Examples",
    seoDescription:
      "Gross receipts are everything your business takes in before any costs. How they differ from gross income and net profit, Schedule C line 1, and a worked example.",
    excerpt:
      "Gross receipts are the total your business took in from sales and services before subtracting anything. Here is the IRS meaning, how it differs from gross profit, gross income and net profit, and how your invoices and receipts add up to it.",
    body: `**Gross receipts are the total amount a business takes in during its tax year from all sales and services, before subtracting returns, cost of goods or any expenses. For a sole proprietor, it is the figure that goes on line 1 of Schedule C (Form 1040). The IRS's definition for tax-exempt organizations puts it plainly: total amounts received from all sources during the accounting period, with no costs or expenses subtracted.** The simplest way to get the number right is to issue an [invoice](/templates/invoice) or receipt for every sale and add them up at year end.

## What Counts as Gross Receipts

The [Schedule C instructions](https://www.irs.gov/instructions/i1040sc) say to enter gross receipts from your trade or business on line 1, including amounts shown on any Forms 1099-NEC you received. [IRS Publication 334](https://www.irs.gov/publications/p334) fills in the rest:

| Include | Leave out |
|---|---|
| Payments for goods and services, by cash, check, card or app | Money from a bona fide loan |
| Amounts reported to you on Form 1099-NEC | Sales tax imposed on the buyer that you collect and pass to the state |
| Fair market value of goods or services received in barter | Income from outside regular operations, such as bank interest (line 6) |
| Sales tax imposed on you as the seller, if you collected it from the buyer | — |

Do not net refunds out of line 1. Report the full sales there and put returns and allowances on line 2 as a positive number.

Pub 334 also warns that Form 1099-K may not match what you should report: it can miss some receipts and include things that are not receipts, such as sales tax. Your own records are the source, not the form.

## Gross Receipts vs. Gross Income vs. Net Profit

These terms are easy to mix up because each is a step down the same page of Schedule C.

| Term | What it is | Schedule C |
|---|---|---|
| Gross receipts | Everything taken in from sales and services | Line 1 |
| Net receipts | Gross receipts minus returns and allowances | Line 3 |
| Gross profit | Net receipts minus cost of goods sold | Line 5 |
| Gross income | Gross profit plus other business income | Line 7 |
| Net profit | Gross income minus business expenses | Line 31 |

A service business with no inventory has no cost of goods sold, so Pub 334 notes that its gross profit equals its net receipts.

## A Worked Example

A one-person candle business (sample figures) files Schedule C for 2025:

| Step | Amount |
|---|---|
| Gross receipts: all invoices and sales receipts for the year | $84,500 |
| Minus returns and refunds to customers | −$1,200 |
| Net receipts | $83,300 |
| Minus cost of goods sold (wax, wicks, jars, labels) | −$31,000 |
| Gross profit | $52,300 |
| Plus other income (interest on the business account) | +$150 |
| Gross income | $52,450 |
| Minus business expenses | −$18,900 |
| **Net profit** | **$33,550** |

The $84,500 is the number the business can prove line by line, because each sale has a document behind it: invoices to wholesale buyers, card and cash receipts at markets, and payment app records for online orders.

## Common Mistakes

- **Copying the 1099-K total onto line 1.** The form is a cross-check, not your figure. It can include sales tax and miss cash or check sales.
- **Leaving out 1099-NEC income.** The Schedule C instructions say line 1 should include amounts properly shown on Forms 1099-NEC. If your line 1 is less than the total in box 1 of those forms, the IRS asks you to attach a statement explaining the difference.
- **Netting refunds.** Report the full sales on line 1 and the refunds on line 2. The net figure appears on line 3 anyway.
- **Counting a loan as a sale.** Pub 334 says money borrowed through a bona fide loan is not income, so a deposit from a lender stays out of your sales total.
- **Forgetting barter.** If a client paid you in goods or services, Pub 334 says their fair market value goes into gross receipts. Write yourself an invoice for the swap so it is on the record.

## Where Else Gross Receipts Matter

**The small business gross receipts test.** Several tax rules, including simpler inventory accounting, are open only to small business taxpayers. The 2025 Schedule C instructions define one as a business with average annual gross receipts of $31 million or less for the 3 prior tax years, indexed for inflation, that is not a tax shelter. The figure changes each year, so check the current instructions for your tax year.

**Tax-exempt organizations.** The IRS applies the same idea to charities and other exempt organizations: [gross receipts](https://www.irs.gov/charities-non-profits/gross-receipts-defined) are the total received from all sources during the accounting period, with no costs or expenses subtracted.

**Other definitions.** State and local governments that use the term may define it their own way, so read the definition in the form or rule in front of you.

## How Invoices and Receipts Feed the Total

Pub 334 tells business owners to make sure each day's records balance with actual cash and card receipts, and to use a proper invoicing system and a separate business bank account. In practice:

1. **Issue a numbered invoice or receipt for every sale.** Gaps in the numbering show up fast.
2. **Record the date, customer, amount and payment method.** That is what lets you match each sale to a bank deposit.
3. **Show sales tax on its own line.** You need it separately to apply the line 1 rules above.
4. **Record refunds as their own documents** so they go on line 2, not as reductions to line 1.
5. **Total by year.** Add up every invoice and sales receipt for the year, plus anything received in barter. That is the starting point for line 1.

Our guide to [receipts to keep for taxes](/blog/receipts-to-keep-for-taxes) covers the expense side. To issue the documents themselves, [build an invoice or receipt](/create) in the browser with no account needed to preview; downloading takes a free account, and the first download is watermark-free.

This is general information, not tax advice. For your own return, follow the current IRS instructions or ask a tax professional.`,
    faqs: [
      {
        q: "What are gross receipts in simple terms?",
        a: "The total money a business takes in from sales and services during the year, before subtracting refunds, the cost of goods or any expenses.",
      },
      {
        q: "Are gross receipts the same as gross income?",
        a: "No. On Schedule C, gross receipts are line 1. Gross income is line 7: gross receipts minus returns and cost of goods sold, plus other business income.",
      },
      {
        q: "Is sales tax included in gross receipts?",
        a: "It depends who the tax is imposed on. The IRS says sales tax imposed on you as the seller and collected from the buyer goes in gross receipts; sales tax imposed on the buyer that you collect and pay over does not.",
      },
      {
        q: "Should my gross receipts match my Form 1099-K?",
        a: "Not necessarily. IRS Publication 334 says a 1099-K may leave out some receipts and include amounts that are not receipts, such as sales tax. Report from your own records.",
      },
      {
        q: "What is the gross receipts test for small businesses?",
        a: "A test of average annual gross receipts over the 3 prior tax years. The 2025 Schedule C instructions set it at $31 million or less, indexed for inflation each year.",
      },
    ],
  },
];
