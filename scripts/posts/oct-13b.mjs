/**
 * Oct re-plan, gap fill — Day 2026-10-13 (1 post). Notion Content Pipeline Order 63
 * (moved forward from Nov 4 to fill Oct 10–20).
 *   63. "dependent care fsa receipt"   70/mo (110 Nov–Jan) · Low -> /templates/childcare-receipt
 *
 * Covers the dropped nanny / daycare / childcare template posts (#51–53) from
 * the angle no page owns: what a provider's receipt must show for an FSA claim
 * and for Form 2441. ChatGPT retrieves our IRS-rule content and cites irs.gov,
 * so every rule here is stated precisely and linked to irs.gov.
 *
 * Facts checked 2026-10-05:
 *   - Pub 503 (2025): provider name, address and TIN required; incomplete info
 *     can cost the credit unless due diligence is shown; Form W-10 requests it.
 *   - Exclusion limit: $5,000 ($2,500 MFS) through 2025; $7,500 ($3,750 MFS)
 *     from 2026 under P.L. 119-21, which amended IRC §129(a)(2)(A). A plan only
 *     offers the higher limit if the employer amended it.
 * Administrator documentation varies by plan; the post says "most ask for",
 * never "the IRS requires", for the claim-form fields.
 */

export const OCT_13B = [
  {
    slug: "dependent-care-fsa-receipt",
    category: "taxes",
    publishedAt: "2026-10-13T09:30:00Z",
    title: "Dependent Care FSA Receipts: What Your Provider Must Include",
    seoTitle: "Dependent Care FSA Receipt: What It Must Include",
    seoDescription:
      "What a daycare or nanny receipt needs for a dependent care FSA claim and Form 2441: dates, amounts, the child, and the provider's name, address and TIN.",
    excerpt:
      "A dependent care FSA claim needs a receipt showing who provided the care, for which child, on which dates and for how much. Here are the fields, the IRS rules behind them, and how a provider issues one.",
    body: `**A dependent care FSA receipt needs to show the provider's name and address, the child who received care, the dates of care, and the amount paid.** Most FSA administrators ask for exactly those fields before they reimburse a claim. Separately, when you file your tax return you report the provider's name, address and taxpayer identification number (TIN) on Form 2441, so get the TIN at the same time. A provider can issue a receipt with every field in place from the [childcare receipt template](/templates/childcare-receipt).

Two different readers check that receipt: your FSA administrator, when you claim, and the IRS, through Form 2441. It is easiest to give both what they need on one document.

## What the Receipt Must Show

| Field | Why it is needed |
|---|---|
| Provider name | Identifies who was paid |
| Provider address | Required by the IRS for Form 2441 |
| Provider TIN (EIN or SSN) | Required by the IRS for Form 2441 |
| Child's name | Shows the care was for a qualifying person |
| Dates of care | Administrators reimburse care already provided, for a stated period |
| Amount paid | The figure being claimed |
| Type of care | For example daycare, preschool, after-school care or nanny |
| Provider signature | Some administrators ask for it instead of a separate form |

Your plan's own claim form is the final word on what it accepts. Some administrators let the provider sign the claim form itself instead of attaching a receipt.

## The IRS Rules Behind It

**The provider details come from IRS Publication 503.**

[Publication 503](https://www.irs.gov/publications/p503) says you must identify every care provider with their **name, address and taxpayer identification number**. If the information is incorrect or incomplete, the credit may not be allowed, unless you can show you used due diligence trying to get it. The IRS form for asking a provider for those details is [Form W-10](https://www.irs.gov/forms-pubs/about-form-w-10).

You report the provider's information on [Form 2441](https://www.irs.gov/forms-pubs/about-form-2441), the form that handles both the child and dependent care credit and dependent care benefits paid through an employer plan, including an FSA.

### The 2026 limit

Through 2025, you could exclude up to **$5,000** a year of dependent care benefits ($2,500 if married filing separately). From 2026, Public Law 119-21 raised the limit to **$7,500** ($3,750 if married filing separately). Your employer's plan only offers the higher amount if it has been amended to do so, so check your plan before you change your election.

## Who Counts as a Provider

**Daycare centres, preschools, after-school programmes, day camps and individual carers, including a nanny or a babysitter.**

The rules on whose care qualifies are in Publication 503. Two points cause most rejected claims:

- **The care has to let you work or look for work.** Care while you are at a weekend social event does not count.
- **The child has to be a qualifying person,** generally under 13 for the whole period of care.

## If Your Provider Is a Nanny

**A nanny is a provider like any other, and the receipt needs the same fields.** The nanny's TIN is their social security number, which you will also need if you are their employer for payroll tax purposes. Ask for it on Form W-10 at the start, not in January when the claim deadline is close.

A weekly or monthly receipt from the nanny, listing the dates worked and the amount paid, gives the administrator what it needs. A single annual summary often does not, because most plans reimburse care period by period.

## How a Provider Issues the Receipt

1. Open the [childcare receipt template](/templates/childcare-receipt).
2. Enter your business name (or your own name, for a nanny), address and phone number.
3. Add the parent's name and the child's name.
4. Add a line for the period of care, for example "Daycare, October 1–31, 2026", with the amount paid.
5. Add your EIN or SSN if the parent has asked for it for Form 2441, or provide it separately on Form W-10.
6. Sign it, download the PDF and give the parent a copy.

## Keep the Receipts After the Claim

**Keep every receipt with your tax records.** The FSA administrator has already seen it, but the IRS reads Form 2441, and the receipts are what back the figures on it.`,
    faqs: [
      {
        q: "What does a receipt need for a dependent care FSA claim?",
        a: "Most administrators ask for the provider's name and address, the child's name, the dates of care and the amount paid. Check your plan's claim form for anything extra.",
      },
      {
        q: "Does the receipt need the provider's tax ID?",
        a: "Your administrator may not ask, but the IRS does: Form 2441 requires each provider's name, address and taxpayer identification number. Get it with the receipt or on Form W-10.",
      },
      {
        q: "What is the dependent care FSA limit for 2026?",
        a: "Up to $7,500 a year ($3,750 if married filing separately), raised from $5,000 by Public Law 119-21. Your employer's plan must be amended to offer the higher limit.",
      },
      {
        q: "What if my provider won't give me their TIN?",
        a: "Publication 503 says you can still claim if you can show due diligence in trying to get it. Keep a copy of your Form W-10 request.",
      },
      {
        q: "Can a nanny give me receipts for my FSA?",
        a: "Yes. A nanny is a care provider, and the receipt needs the same fields: name, address, dates of care, amount paid, and their SSN for Form 2441.",
      },
      {
        q: "Is one receipt for the year enough?",
        a: "Often not. Most plans reimburse care period by period, so weekly or monthly receipts listing the dates and amounts are safer.",
      },
      {
        q: "Does summer day camp count?",
        a: "Day camp can qualify under Publication 503's rules. Overnight camp does not. The receipt needs the same fields as any other care.",
      },
      {
        q: "Can I use the FSA and the child care credit for the same expenses?",
        a: "No. Expenses reimbursed through the FSA cannot also be claimed for the credit. Form 2441 is where the two are reconciled.",
      },
      {
        q: "Do I need to sign the receipt as the provider?",
        a: "It is not an IRS requirement, but some administrators ask for a signed receipt or for the provider to sign the claim form instead.",
      },
      {
        q: "How long should I keep dependent care receipts?",
        a: "Keep them with your tax records for the year you claimed, since they back the figures you reported on Form 2441.",
      },
    ],
  },
];
