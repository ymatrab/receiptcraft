/**
 * Day 2026-11-06, slot a (09:30Z). Writer C.
 * Keyword gate 2026-10-11 (DataForSEO, US monthly): no makecepeit page ranks.
 *   "babysitting receipt"         90/mo
 *   "daycare receipt for taxes"   50/mo
 *   "nanny receipt"               20/mo
 *   -> owner /templates/childcare-receipt; links /blog/how-to-make-a-daycare-receipt and
 *      /blog/dependent-care-fsa-receipt
 * Angle: the receipt a sitter or nanny writes so the parents can claim the child and
 * dependent care credit or a dependent care FSA.
 *
 * Facts checked 2026-10-11 against IRS Pub 503 (2025), https://www.irs.gov/publications/p503 :
 *   - care for a dependent under 13 (or a spouse/dependent unable to self-care) so the
 *     parent can work or look for work
 *   - provider identification: name, address and TIN (SSN or ITIN for an individual, EIN for
 *     an organization); Form W-10 can be used to request it; alternatives include a recently
 *     printed letterhead or invoice showing name, address and TIN; keep with tax records,
 *     do not send to the IRS; due diligence if the provider refuses
 *   - payments not counted: to a person you can claim as a dependent, your child under 19,
 *     your spouse, or the parent of your qualifying child under 13
 *   Pub 926 linked for household employer duties; no thresholds quoted.
 *   Dollar limits and credit percentages deliberately omitted (changed for 2026).
 */

export const NOV_6A_BABYSITTING_RECEIPT = [
  {
    slug: "babysitting-receipt",
    image: "assets/babysitting-receipt.jpeg",
    category: "taxes",
    publishedAt: "2026-11-06T09:30:00Z",
    title: "Babysitting Receipt: What Parents Need for the Child Care Credit",
    seoTitle: "Babysitting Receipt: What to Include for Taxes",
    seoDescription:
      "How to write a babysitting or nanny receipt parents can use for the child care credit or a dependent care FSA: provider details, TIN, dates, hours, pay.",
    excerpt:
      "Parents who pay a babysitter or nanny need the provider's name, address and taxpayer ID to claim child care costs. Here is what a babysitting receipt should show, with a worked example.",
    body: `**A babysitting receipt records that a parent paid a sitter or nanny for child care. To be useful at tax time it should show the sitter's name and address, the child cared for, the dates and hours, the rate, the amount paid and how, and the sitter's signature. The parent also needs the sitter's taxpayer identification number, usually collected once a year on IRS Form W-10.** Sitters can write one in a few minutes with our [childcare receipt template](/templates/childcare-receipt).

Parents use these receipts for two things: the child and dependent care credit on their tax return, and claims against a dependent care FSA at work. Both are covered in [IRS Publication 503](https://www.irs.gov/publications/p503). For FSA claim specifics, see our [dependent care FSA receipt guide](/blog/dependent-care-fsa-receipt).

## What a Babysitting Receipt Should Include

| Field | Example |
|---|---|
| Sitter's name | Emma Clarke |
| Sitter's address | 27 Linden Ct, Raleigh, NC |
| Parent or payer name | Marcus and Jo Bell |
| Child or children cared for | Noah Bell, age 6 |
| Dates and hours of care | Oct 5 to Oct 30, 2026, after school |
| Rate | $20.00 per hour |
| Amount paid | $920.00 |
| Payment date and method | Oct 30, 2026, bank transfer |
| Receipt number and date | #2026-10 |
| Sitter's signature | Signed |

Weekly or monthly receipts both work. One receipt per pay period keeps the records easy to add up in January.

## The Taxpayer ID: Why Parents Ask for It

Pub 503 says that to claim the credit a parent must identify the care provider on their return with the provider's name, address and taxpayer identification number. For an individual sitter, that is a Social Security number or ITIN. For a daycare business it is usually an EIN.

The simplest way to supply it is [Form W-10](https://www.irs.gov/forms-pubs/about-form-w-10), the IRS form for requesting a care provider's details. Pub 503 also accepts other sources, including a recently printed letterhead or invoice that shows the provider's name, address and TIN. Parents keep this with their tax records and do not send it to the IRS.

Sitters do not need to print their full SSN on every weekly receipt. Giving it once on a W-10, or on a single year-end statement, limits how many copies are floating around. If a sitter refuses, Pub 503 lets the parent still claim the credit by showing due diligence, such as a written request kept on file.

## A Worked Example

| Week | Hours | Rate | Amount |
|---|---|---|---|
| Oct 5 to Oct 9, 2026 | 12 | $20.00 | $240.00 |
| Oct 12 to Oct 16, 2026 | 12 | $20.00 | $240.00 |
| Oct 19 to Oct 23, 2026 | 10 | $20.00 | $200.00 |
| Oct 26 to Oct 30, 2026 | 12 | $20.00 | $240.00 |
| **Total paid** | **46** | | **$920.00** |

Header: "Babysitting receipt #2026-10. Provider: Emma Clarke, 27 Linden Ct, Raleigh, NC." Below the table: "After-school care for Noah Bell. Paid Oct 30, 2026 by bank transfer. Signed, Emma Clarke."

## How to Write One, Step by Step

1. Put your name and address at the top.
2. Name the parent who paid and the child you cared for.
3. List the dates, or each week, with hours worked.
4. Show your rate and the total for each line.
5. Add the total, the payment date and the method.
6. Sign it and give the parent a copy; keep one yourself.
7. At year-end, fill in the parent's Form W-10 if they ask.

## Who Does Not Count

Pub 503 excludes some payments from the credit, even with a perfect receipt. Payments to someone the parent can claim as a dependent, to the parent's own child under 19, to their spouse, or to the child's other parent when the child is under 13 do not count. A grandparent who is not the parent's dependent can qualify.

The care must also be so the parent can work or look for work, and generally for a child under 13. Date night does not qualify; after-school care while both parents work does.

## Nannies and Household Employers

A nanny who works in the family's home may be the family's household employee, which brings payroll tax duties for the parents. [IRS Publication 926](https://www.irs.gov/publications/p926) explains when that applies. A receipt still helps both sides keep track of what was paid, but it does not replace a W-2 if one is required.

Daycare centers and home daycares have more fields to cover; see [how to make a daycare receipt](/blog/how-to-make-a-daycare-receipt).

## Making Receipts in the Browser

You can build a babysitting or nanny receipt on [makecepeit](/create) for free; downloading it without a watermark needs an account. Receipts must match care actually given and money actually paid.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "What should a babysitting receipt include?",
        a: "The sitter's name and address, the parent's name, the child cared for, dates and hours, rate, amount paid, payment date and method, and the sitter's signature.",
      },
      {
        q: "Can I claim babysitting on my taxes?",
        a: "Possibly, through the child and dependent care credit, if the care was for a child under 13 so you could work or look for work, and you can identify the provider.",
      },
      {
        q: "Does my babysitter have to give me their Social Security number?",
        a: "To claim the credit you need the provider's taxpayer ID. If they refuse, IRS Publication 503 lets you still claim it if you show due diligence in trying to get it.",
      },
      {
        q: "What is Form W-10?",
        a: "The IRS form parents use to request a care provider's name, address and taxpayer identification number. Parents keep it; it is not sent to the IRS.",
      },
      {
        q: "Do I need to put my SSN on every babysitting receipt?",
        a: "No. Providing it once on Form W-10 or a year-end statement is enough for the parent's records.",
      },
      {
        q: "Can I use a babysitting receipt for a dependent care FSA?",
        a: "Yes. FSA administrators usually ask for the provider's details, the dates of care, the child's name and the amount paid.",
      },
      {
        q: "Can I pay a grandparent and claim the credit?",
        a: "Yes, if the grandparent is not someone you can claim as a dependent. Payments to your own child under 19 or your spouse do not count.",
      },
      {
        q: "Does date-night babysitting qualify?",
        a: "No. The care has to be so you, and your spouse if filing jointly, can work or look for work.",
      },
      {
        q: "Is a nanny receipt different from a babysitting receipt?",
        a: "The fields are the same. A nanny may also be a household employee, in which case the family may have payroll tax duties explained in IRS Publication 926.",
      },
      {
        q: "How often should a babysitter give receipts?",
        a: "Each pay period, weekly or monthly, plus a year-end summary if the parents ask for one.",
      },
    ],
  },
];
