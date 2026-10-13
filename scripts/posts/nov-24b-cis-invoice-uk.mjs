/**
 * Day 2026-11-24, slot b (14:00Z). Writer I (Elliot writers, UK batch).
 * Keyword gate (coordinator brief, Google autocomplete gl=uk, 2026-10-13):
 *   "cis invoice", "cis invoice template", "cis invoice example"
 *   -> owner /templates/invoice; links /templates/plumbing-invoice (live on main since
 *      2026-10-05, commit 6e8e24f), /blog/sole-trader-invoice-uk (Nov 20, this batch),
 *      /blog/vat-invoice-requirements-uk (Nov 16, this batch)
 * Angle: how a CIS subcontractor invoice splits labour and materials so the contractor can
 * work out the 20%/30% deduction, a worked example in £, the reverse charge note for
 * VAT-registered subcontractors.
 * Product check (origin/main, 2026-10-13): /templates/invoice and /templates/plumbing-invoice
 * are real bills (INVOICE heading, Bill to, Payment terms rows, amount due); neither defaults
 * to GBP, so the post says to pick British Pound (£) in Settings > Currency. Line items and
 * detail rows are editable. No negative-line or "CIS deduction" feature is claimed.
 *
 * Facts checked 2026-10-13:
 *   - GOV.UK, What you must do as a CIS subcontractor (Overview),
 *     https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor : register if you work for a
 *     contractor as a sole trader, company owner or partner; contractor deducts 20%
 *     ('net payment status'); 30% if not registered; deductions are advance payments towards
 *     tax and National Insurance; gross payment status means no deductions.
 *   - GOV.UK, CIS subcontractor: Get paid,
 *     https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor/get-paid : 20% if registered
 *     and the contractor can verify you, otherwise 30%; give contractor your UTR and legal
 *     business or trading name; no deductions from amounts on your invoice for VAT,
 *     consumable stores, plant hired for the job, manufacturing or prefabricating materials,
 *     materials you paid for directly; contractor may ask for evidence (receipts) or estimate;
 *     monthly payment and deduction statement within 14 days of the end of each tax month.
 *   - GOV.UK, CIS contractor: Make deductions and pay subcontractors,
 *     https://www.gov.uk/what-you-must-do-as-a-cis-contractor/make-deductions-and-pay-subcontractors :
 *     rates 20% / 30% / 0%; start with the gross invoice, take away VAT, consumable stores,
 *     fuel (except travelling), plant hire, manufacturing/prefabricating materials, materials
 *     paid for directly; deduct the CIS rate from what is left; statement example: tax month
 *     6 May to 5 June, statement by 19 June.
 *   - GOV.UK, CIS contractor: Record keeping,
 *     https://www.gov.uk/what-you-must-do-as-a-cis-contractor/record-keeping : contractor keeps
 *     gross payments excl. VAT, deductions, cost of materials excl. VAT; at least 3 years after
 *     the end of the tax year.
 *   - GOV.UK, VAT domestic reverse charge for building and construction services,
 *     https://www.gov.uk/guidance/vat-domestic-reverse-charge-for-building-and-construction-services
 *     and VAT reverse charge technical guide,
 *     https://www.gov.uk/guidance/vat-reverse-charge-technical-guide : applies to standard and
 *     reduced rate construction services between VAT and CIS registered businesses; not to
 *     end users who notify in writing; not to private domestic customers; invoice must show all
 *     VAT invoice details, note that the reverse charge applies and the customer accounts for
 *     the VAT, state the VAT due (or the rate) but not include it in the amount charged;
 *     wording examples include "Customer to pay the VAT to HMRC".
 *   - GOV.UK, CIS subcontractor: Pay tax and claim back deductions,
 *     https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor/pay-tax-and-claim-back-deductions :
 *     sole traders record total pay before deductions as income and total deductions as CIS
 *     deductions on Self Assessment; limited companies use the payroll scheme (FPS + EPS).
 * Not stated as law: showing the expected deduction and net figure on the invoice (common
 * practice; the contractor's statement is the official record). Sample names and amounts
 * are fictional.
 */

export const NOV_24B_CIS_INVOICE_UK = [
  {
    slug: "cis-invoice-uk",
    image: "assets/cis-invoice-uk.jpeg",
    category: "small-business",
    publishedAt: "2026-11-24T14:00:00Z",
    title: "CIS Invoice: How Subcontractors Show Labour, Materials and the Deduction",
    seoTitle: "CIS Invoice: Labour, Materials and the 20% Deduction",
    seoDescription:
      "How to write a CIS invoice as a UK subcontractor: split labour from materials, how the 20% or 30% deduction works, the reverse charge, and an example.",
    excerpt:
      "Under the Construction Industry Scheme your contractor deducts 20% or 30% from the labour on your invoice, not the materials. Here is how to lay out a CIS invoice so the sums are right, with a worked example in pounds.",
    body: `**A CIS invoice is a normal invoice from a construction subcontractor that separates labour from materials, so the contractor can take the Construction Industry Scheme deduction from the right figure. Contractors deduct 20% if you are registered for CIS and they can verify you, 30% if you are not, and nothing if you have gross payment status. The deduction comes off the labour only: VAT and materials you paid for directly are taken out first.** You can build one on the [free invoice template](/templates/invoice), or the [plumbing invoice](/templates/plumbing-invoice) if you work in that trade, with the currency set to pounds.

The rules here are from GOV.UK's guidance for [CIS subcontractors](https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor/get-paid) and for contractors making deductions. The basic invoice fields are the same as any sole trader invoice; see [what a UK sole trader invoice must include](/blog/sole-trader-invoice-uk).

## The deduction rates

| Your CIS status | Deduction from labour |
|---|---|
| Registered for CIS and verified by the contractor | 20% |
| Not registered, or the contractor cannot verify you | 30% |
| Gross payment status | 0% (you pay your own tax) |

The deductions are not a separate tax. GOV.UK describes them as advance payments towards your tax and National Insurance bill, which a sole trader claims through Self Assessment and a limited company offsets through its payroll scheme. The contractor uses the UTR and the legal or trading name you gave when you registered to verify you, so put those details on your invoices exactly as registered.

## What the contractor does not deduct from

GOV.UK lists the amounts on your invoice that are not treated as your pay, so no CIS deduction is taken from them:

- VAT
- materials you paid for directly
- equipment that is now unusable ("consumable stores")
- plant hired for the job
- manufacturing or prefabricating materials

The contractor's guidance also lists fuel used, except for travelling. The contractor can ask you for evidence of what you paid for materials, such as supplier receipts. If you cannot show it, they will estimate the cost. That is the main reason to show materials as their own lines and keep the receipts.

## How to lay out a CIS invoice

1. **Your details:** name, any trading name, address, and your UTR so the contractor can match you to your CIS registration.
2. **The contractor's details:** their business name and address.
3. **Invoice number, invoice date and the site or job reference.**
4. **Labour lines:** what you did and when, with days or hours and the rate.
5. **Materials lines:** each item you bought for the job at the price you paid, excluding VAT if you are VAT registered.
6. **Totals:** labour subtotal, materials subtotal and the gross invoice total.
7. **VAT or reverse charge note,** if you are VAT registered (see below).

Many subcontractors also add a short summary under the totals showing the CIS deduction they expect and the net amount. That is common practice rather than a rule, and it helps the contractor spot a mismatch early. The official record of what was deducted is the contractor's monthly payment and deduction statement.

## Worked example

Dan Kowalski (a sample subcontractor) is a sole trader registered for CIS and not VAT registered. He does four days of second-fix plumbing on a house build for a contractor and buys the fittings himself.

| Description | Amount |
|---|---|
| Labour: second-fix plumbing, 4 days at £220 | £880.00 |
| Materials: copper pipe, fittings and valves (receipts held) | £320.00 |
| **Invoice total** | **£1,200.00** |

The contractor works it out as GOV.UK describes: start from the gross invoice, take away the materials, then apply the rate to what is left.

| Step | 20% (registered) | 30% (unregistered) |
|---|---|---|
| Gross invoice | £1,200.00 | £1,200.00 |
| Less materials paid for directly | −£320.00 | −£320.00 |
| Amount the deduction applies to | £880.00 | £880.00 |
| CIS deduction | £176.00 | £264.00 |
| **Net paid to Dan** | **£1,024.00** | **£936.00** |

If Dan had gross payment status, he would receive the full £1,200 and pay his own tax later. On his Self Assessment return GOV.UK tells him to record his total pay before deductions as income and the £176 as CIS deductions; HMRC then takes the deductions off what he owes.

## If you are VAT registered: the reverse charge

Most construction services between businesses that are both VAT and CIS registered fall under the VAT domestic reverse charge. In that case you do not add VAT to the amount you charge. Your invoice must still carry all the details of a VAT invoice ([the UK list is here](/blog/vat-invoice-requirements-uk)), plus:

- a note that the domestic reverse charge applies and the customer must account for the VAT, for example "Reverse charge: customer to pay the VAT to HMRC"
- the amount of VAT due under the reverse charge, or the VAT rate if you cannot show the amount

The reverse charge does not apply when the customer is an end user that has told you so in writing, or when you work for a private householder, who will not be VAT registered. Then you charge VAT in the normal way. Remember that VAT is never part of the figure the CIS deduction is taken from.

## Statements and records

Your contractor must give you a payment and deduction statement within 14 days of the end of each tax month, which runs from the 6th to the 5th. For the tax month 6 May to 5 June, for example, the statement is due by 19 June. Keep every statement alongside your invoices and materials receipts, because HMRC may ask for evidence of the deductions when you claim them back.

Contractors have their own duty to keep records of each gross payment, the deductions and the cost of materials for at least 3 years after the end of the tax year.

## Make it in the builder

1. Open the [invoice template](/templates/invoice) and pick British Pound (£) under Settings, then Currency.
2. Add your name, trading name and address, and a detail row for your UTR.
3. Fill in the contractor under "Bill to", the invoice number, date and job reference.
4. Enter labour and materials as separate lines. Set the tax to 0 unless you are charging VAT normally.
5. Preview it with no account. Downloading needs a free account, and your first download is watermark-free.

Only invoice for work done and materials you actually bought for the job: the contractor may ask for the receipts.

This is general information, not tax advice. Check HMRC's CIS guidance or ask an accountant about your own position.`,
    faqs: [
      {
        q: "What is a CIS invoice?",
        a: "An invoice from a construction subcontractor to a contractor that shows labour and materials separately, so the contractor can take the Construction Industry Scheme deduction from the labour part only.",
      },
      {
        q: "What is the CIS deduction rate?",
        a: "20% if you are registered for CIS and the contractor can verify you, 30% if you are not, and 0% if you have gross payment status.",
      },
      {
        q: "Is the CIS deduction taken from materials?",
        a: "No. GOV.UK says contractors do not deduct from VAT, materials you paid for directly, consumable stores, plant hired for the job, or manufacturing and prefabricating materials. They may ask for receipts for the materials.",
      },
      {
        q: "Should I show the CIS deduction on my invoice?",
        a: "Many subcontractors add the expected deduction and net amount under the totals, but it is not required. The contractor's monthly payment and deduction statement is the record of what was actually deducted.",
      },
      {
        q: "Do I charge VAT on a CIS invoice?",
        a: "If you are VAT registered and your customer is VAT and CIS registered, the domestic reverse charge usually applies: you show the VAT due and a reverse charge note but do not add VAT to the amount charged. For end users and householders you charge VAT normally.",
      },
    ],
  },
];
