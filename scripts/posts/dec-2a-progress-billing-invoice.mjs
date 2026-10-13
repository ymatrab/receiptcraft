/**
 * Day 2026-12-02, slot a (09:30Z). Elliot writer G.
 * Keyword gate (coordinator brief): "progress billing" / "progress invoice". Demand
 * evidence: Google autocomplete 2026-10-13; no makecepeit page ranks for either.
 * Creation intent: contractors and long-job freelancers who need to bill part of a job.
 *   -> owner /templates/invoice. The brief also named /templates/plumbing-invoice, but
 *      that slug does not exist in lib/templates.ts (checked 2026-10-13), so the post
 *      links /templates/handyman-receipt instead for the final paid receipt.
 *
 * Product check (2026-10-13, coordinator correction verified on main): the builder
 * cannot change the document heading. Confirmed features used: line items (negative
 * amounts for retainage and previous billings), labels (total label), business
 * details, Invoice ID and notes. A schedule of values can be typed as line items with
 * the percent complete in each name.
 *
 * Facts checked 2026-10-13:
 *   - AIA Help Center, "Summary: G702-1992, Application and Certificate for Payment",
 *     https://help.aiacontracts.com/hc/en-us/articles/1500009387461-Summary-G702-1992-Application-and-Certificate-for-Payment :
 *     G702 is the contractor's payment application and the architect's certificate;
 *     shows contract sum, change orders, work completed and stored to date, retainage
 *     (if any), previous payments and current payment due. G703 (Continuation Sheet)
 *     breaks the contract sum into portions of the work per a schedule of values the
 *     contractor prepares; AIA does not publish a standard schedule of values form.
 *     The forms are AIA's copyrighted documents; the post names them and does not
 *     reproduce them.
 *   - FAR 32.103, https://www.acquisition.gov/far/32.103 : on federal construction
 *     contracts with progress payments, retainage shall not exceed 10 percent of the
 *     approved estimated amount; release promptly after completion.
 * Not stated: any state retainage cap or prompt-payment deadline (not verified). The
 * 10% in the example is labelled as the sample contract's rate. Sample contractor,
 * client and figures are fictional; arithmetic checked by hand.
 */

export const DEC_2A_PROGRESS_BILLING_INVOICE = [
  {
    slug: "progress-billing-invoice",
    image: "assets/progress-billing-invoice.jpeg",
    category: "small-business",
    publishedAt: "2026-12-02T09:30:00Z",
    title: "Progress Billing: How to Write a Progress Invoice, With Retainage",
    seoTitle: "Progress Billing: How to Write a Progress Invoice",
    seoDescription:
      "Progress billing explained for contractors: schedule of values, percent complete, retainage and previous billings, with a worked progress invoice example.",
    excerpt:
      "Progress billing lets you invoice a long job in stages as work is completed. Here is how a progress invoice is laid out, how retainage is held back, and a worked example with every number shown.",
    body: `**Progress billing means invoicing a long job in stages, based on how much of the work is complete, instead of waiting until the end. Each progress invoice lists the job's schedule of values, the percent complete on each line, the total earned to date, any retainage held back and what was billed before, so the amount due is only the new work.** For a smaller job you can build one from the [invoice template](/templates/invoice) by listing each phase as a line and showing the percent complete in its description.

## How Progress Billing Works

Before work starts, contractor and client agree the contract price and split it into a **schedule of values**: one line per phase or trade, with a dollar value for each that adds up to the contract sum. Every billing period, usually monthly, the contractor reports the percent complete on each line. The invoice then works through the same steps every time:

| Step | What it means |
|---|---|
| Scheduled value | The agreed price of each line |
| Work completed to date | Scheduled value times percent complete |
| Total earned to date | The sum of all lines |
| Less retainage | A percentage held back until the job is finished, if the contract says so |
| Less previous billings | What earlier progress invoices already requested |
| Current amount due | What this invoice asks for |
| Balance to finish | Contract sum minus earned to date, plus retainage still held |

Because the invoice is cumulative, an error in one period is corrected in the next one automatically: the client only ever pays the difference between what is earned to date and what was billed before.

## Retainage

Retainage (also called retention) is a slice of each payment that the client keeps until the job is complete, as security for finishing the work and fixing defects. The rate is set by the contract. On federal construction contracts, [FAR 32.103](https://www.acquisition.gov/far/32.103) says retainage shall not exceed 10 percent of the approved estimated amount and should be released promptly once the work is done. Many states have their own retainage and prompt-payment rules for public jobs and sometimes private ones, so check yours before you set a rate.

On the invoice, show retainage as its own line so the client sees exactly how much is being held and you can track it for release.

## The AIA G702 and G703

On commercial projects with an architect, progress billing is often done on two American Institute of Architects forms. According to the [AIA's summary](https://help.aiacontracts.com/hc/en-us/articles/1500009387461-Summary-G702-1992-Application-and-Certificate-for-Payment), the G702 Application and Certificate for Payment is the contractor's payment request and the architect's certificate in one, showing the contract sum, change orders, work completed and stored to date, retainage, previous payments and the current payment due. The G703 Continuation Sheet breaks the contract sum into portions of the work using the contractor's schedule of values.

These are licensed AIA documents. If your contract calls for them, get them from the AIA. For residential and small commercial work without an architect, a clear progress invoice laid out the same way is usually what the client expects.

## Worked Example

Ridgeline Renovations (fictional) has a $48,000 contract for a kitchen remodel with 10 percent retainage under the contract. Pay application #1, at the end of October, billed $8,500 of work, less $850 retainage, so **$7,650** was requested and paid.

**Progress invoice #2, November 30, 2026:**

| Line | Scheduled value | % complete | Completed to date |
|---|---|---|---|
| Demolition and haul-away | $4,000 | 100% | $4,000 |
| Rough plumbing and electrical | $9,000 | 100% | $9,000 |
| Cabinets, supply and install | $18,000 | 50% | $9,000 |
| Countertops | $8,000 | 0% | $0 |
| Tile, paint and finish | $5,000 | 0% | $0 |
| Permits, protection and cleanup | $4,000 | 25% | $1,000 |
| **Total** | **$48,000** | | **$23,000** |

| Summary | Amount |
|---|---|
| Total completed to date | $23,000.00 |
| Less retainage (10%) | −$2,300.00 |
| Total earned less retainage | $20,700.00 |
| Less previous billings (invoice #1) | −$7,650.00 |
| **Current amount due** | **$13,050.00** |
| Balance to finish, including retainage | $27,300.00 |

Check the math the way the client will: $48,000 contract minus $20,700 earned less retainage leaves $27,300, which is the $25,000 of work not yet done plus the $2,300 retainage held.

## How to Make a Progress Invoice on makecepeit

1. Open the [invoice template](/templates/invoice) and enter your business, the client and the job address.
2. Set the invoice ID, and write "Progress invoice #2", the contract sum, billing period and retainage rate in the notes.
3. Add one line per schedule-of-values item with the percent complete in its name, for example "Cabinets, supply and install (50% of $18,000)", priced at the amount completed to date.
4. Add retainage and previous billings as negative lines, and set the total label to "Current amount due".
5. Put the balance to finish and payment instructions in the notes.
6. Preview it free with no account. Downloading takes a free account; your first download is watermark-free.

When the client pays the final invoice and releases retainage, give them a paid receipt for the record; the [handyman receipt template](/templates/handyman-receipt) suits trade work with labor and materials lines.

Bill only for work actually completed. Overstating the percent complete to pull money forward is called front-loading, and clients and lenders check for it.

## Common Mistakes

- **A schedule of values that does not add up.** The lines must total the contract sum, change orders included.
- **Billing stored materials without agreement.** Only include materials on site but not installed if the contract allows it.
- **Forgetting change orders.** Add each approved change order as its own line so the contract sum stays right.
- **Losing track of retainage.** Keep a running total so you can invoice its release at completion.

This is general information, not legal advice. Retainage and payment timing depend on your contract and your state's rules.`,
    faqs: [
      {
        q: "What is progress billing?",
        a: "Invoicing a long job in stages as work is completed. Each invoice shows the percent complete on each line of the schedule of values, subtracts retainage and previous billings, and asks for the difference.",
      },
      {
        q: "What is retainage on a progress invoice?",
        a: "A percentage of each payment the client holds back until the job is finished. The rate comes from the contract; on federal construction contracts FAR 32.103 caps it at 10 percent of the approved estimated amount.",
      },
      {
        q: "What are the AIA G702 and G703?",
        a: "Standard American Institute of Architects forms for construction pay applications. The G702 is the application and architect's certificate; the G703 continuation sheet lists the schedule of values.",
      },
      {
        q: "How do I calculate the amount due on a progress invoice?",
        a: "Add up work completed to date, subtract retainage, then subtract what earlier progress invoices already billed. The remainder is the current amount due.",
      },
    ],
  },
];
