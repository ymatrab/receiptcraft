/**
 * Day 2026-11-30, slot a (09:30Z). Elliot writer G.
 * Keyword gate (coordinator brief): "retainer invoice". Demand evidence: Google
 * autocomplete 2026-10-13; no makecepeit page ranks for it. Creation intent: the
 * searcher wants to bill a retainer and track what is left of it.
 *   -> owner /templates/invoice; links /blog/deposit-invoice (Nov 26, same batch,
 *      written by another writer)
 *
 * Product check (2026-10-13, coordinator correction verified on main): the builder
 * cannot change the document heading, so the post never tells readers to retitle it.
 * Confirmed features used: line items with negative amounts ("Retainer applied"),
 * labels (total label), business details, Invoice ID and notes.
 *
 * Facts: none regulatory. Retainer types and drawdown mechanics are described as common
 * business practice. Lawyers' client-trust rules are mentioned only as "your state bar's
 * rules" with no specifics (not verified per state). Sample studio, client and figures
 * are fictional; all arithmetic checked by hand.
 */

export const NOV_30A_RETAINER_INVOICE = [
  {
    slug: "retainer-invoice",
    image: "assets/retainer-invoice.jpeg",
    category: "small-business",
    publishedAt: "2026-11-30T09:30:00Z",
    title: "Retainer Invoice: How to Bill a Retainer and Draw It Down",
    seoTitle: "Retainer Invoice: How to Bill and Draw Down a Retainer",
    seoDescription:
      "How to write a retainer invoice, bill the retainer up front, and show the balance as you work it off, with a worked example and a free invoice template.",
    excerpt:
      "A retainer invoice bills a client up front for work you will do later. Here is what to put on it, how to draw the retainer down on later invoices, and a worked example with the numbers.",
    body: `**A retainer invoice bills a client in advance for work you will do later. It shows the agreed retainer amount, what it covers, when it is due and how unused funds are handled; as you work, each later invoice lists the hours or tasks done and subtracts them from the retainer balance.** You can make one with the [invoice template](/templates/invoice): enter the retainer as the line item, set the amount due, and put the retainer terms in the notes.

## Two Kinds of Retainer

The word covers two different arrangements, and the invoice looks different for each.

| | Prepaid (drawdown) retainer | Monthly (availability) retainer |
|---|---|---|
| What the client buys | A block of money spent against your hourly or task rates | A set amount of your time or availability each month |
| How you bill it | One invoice up front, then statements showing the balance | One invoice per month, usually at the start |
| Unused balance | Refunded, or rolled over, per your agreement | Usually does not roll over, per your agreement |
| Common in | Legal, design, consulting, development | Marketing, bookkeeping, IT support, PR |

Whichever you use, put the rules in your written agreement first. The invoice should repeat them, not invent them. A [deposit invoice](/blog/deposit-invoice) is a close cousin: it takes part of one project's price up front, while a retainer pays for ongoing or future work.

## What to Put on a Retainer Invoice

| Field | Example |
|---|---|
| Label | "Retainer" in the line description and the notes |
| Invoice number and date | RET-2026-07, Dec 1, 2026 |
| Bill to | Client name, company and address |
| Description | "Prepaid retainer for design services, Dec 2026 to Feb 2027" |
| Rate the retainer is billed against | $120 per hour |
| Amount due | $4,800.00 |
| Due date and terms | Due on receipt; work starts when paid |
| Unused balance rule | "Unused balance refunded at end of engagement" |
| Top-up rule | "Replenish when balance falls below $1,000" |
| Payment instructions | ACH details or a payment link |

Sales tax on a retainer depends on what you sell and where. If your services are taxable, check your state's rules on when tax is due on prepayments before you add a tax line.

## How to Draw the Retainer Down

After the first invoice is paid, each billing period gets its own invoice or statement. It should show:

1. **The retainer balance at the start** of the period.
2. **The work done**, each line with a date, a description, the hours and the amount.
3. **Retainer applied**, equal to the work done, up to the balance available.
4. **Amount due now**, which is zero if the retainer covered everything.
5. **The balance remaining** after this period.

If the work exceeds the balance, the client pays the difference on that invoice, or you bill a top-up if your agreement says so.

## Worked Example

Pine & Paper Studio (fictional) agrees a prepaid retainer with Larkfield Dental (also fictional) at $120 an hour.

**Invoice RET-2026-07, December 1, 2026:** Prepaid design retainer, 40 hours at $120. Amount due: **$4,800.00**. Larkfield pays on December 3.

**December statement, INV-2026-118, issued January 2, 2027:**

| Date | Work | Hours | Amount |
|---|---|---|---|
| Dec 4 | Appointment card redesign | 6 | $720.00 |
| Dec 11 | Website banner set (5 sizes) | 8 | $960.00 |
| Dec 18 | Holiday hours signage | 3 | $360.00 |
| | **Work this period** | **17** | **$2,040.00** |
| | Retainer applied | | −$2,040.00 |
| | **Amount due** | | **$0.00** |

Retainer balance: $4,800.00 at the start, $2,760.00 remaining.

**January statement, INV-2027-009, issued February 1, 2027:** 26 hours of work for a new patient brochure and its print files, $3,120.00. The retainer covers $2,760.00 of it, which leaves **$360.00 due** and a balance of $0.00. Because the agreement says to replenish below $1,000, Pine & Paper also sends a new retainer invoice for the next block.

Every number on these invoices can be traced: rate times hours, the sum of the lines, the amount applied and what is left.

## A Monthly Retainer Invoice

A monthly availability retainer is simpler: the same invoice goes out at the start of each month. A fictional bookkeeping client might be billed "Monthly bookkeeping retainer, January 2027: up to 10 hours, reconciliations and monthly report", $900.00, due January 5. Add a second line only when work goes beyond the agreed hours, for example "Additional hours, December, 3 at $85", $255.00, so the client can see exactly what was outside the retainer. State on every invoice that unused hours do not roll over, if that is what you agreed.

## How to Make It on makecepeit

1. Open the [invoice template](/templates/invoice) and enter your business and the client.
2. Set the invoice ID, and write "Retainer invoice", the date and the terms in the notes.
3. For the first invoice, add one line: the retainer description and amount.
4. For each drawdown invoice, add one line per task, then a negative line for "Retainer applied", and set the total label to "Amount due".
5. Put the balance remaining and the unused-balance rule in the notes.
6. Preview it free with no account. Downloading takes a free account; your first download is watermark-free.

Bill only for work that was agreed and, on drawdown statements, work that was actually done. A retainer statement is a record the client relies on to see where their money went.

## Common Mistakes

- **No written terms.** Without an agreement on rollover and refunds, the first unused balance becomes an argument.
- **Applying the retainer silently.** If a statement only shows "$0 due", the client cannot see the work. List the lines every time.
- **Losing track of the balance.** Print the opening and remaining balance on each statement so both sides agree.
- **Mixing up deposit and retainer.** A deposit belongs to one project; a retainer funds ongoing work. Call it what it is on the invoice.

Lawyers and other professionals who hold client money in trust have their own rules from their state bar or regulator. Follow those first. This is general information, not legal or tax advice.`,
    faqs: [
      {
        q: "What is a retainer invoice?",
        a: "An invoice that bills a client in advance for work you will do later. It shows the retainer amount, what it covers, when it is due and how any unused balance is handled.",
      },
      {
        q: "How do I show a retainer being used on later invoices?",
        a: "List the work done in the period, subtract the same amount as 'retainer applied', show any amount still due, and print the remaining retainer balance.",
      },
      {
        q: "What is the difference between a retainer and a deposit?",
        a: "A deposit is part of one project's price paid up front. A retainer pays in advance for ongoing or future work, either as a prepaid balance or as a monthly fee.",
      },
      {
        q: "What happens to an unused retainer?",
        a: "Whatever your agreement says. Prepaid retainers are often refunded or rolled over; monthly availability retainers usually are not. Put the rule in writing and repeat it on the invoice.",
      },
    ],
  },
];
