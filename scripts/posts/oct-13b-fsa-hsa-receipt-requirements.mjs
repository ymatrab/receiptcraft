/**
 * Day 2026-10-13, slot b (14:00Z). Writer C.
 * Keyword gate 2026-10-11 (DataForSEO, US monthly): no makecepeit page ranks.
 *   "fsa receipt"              260/mo
 *   "fsa receipt requirements" 210/mo
 *   "hsa receipt"              170/mo
 *   -> owner /templates/medical-receipt
 * Distinct from /blog/dependent-care-fsa-receipt (child care, live Oct 13 09:30):
 * this post covers medical (health) FSA claims and HSA records.
 *
 * Facts checked 2026-10-11:
 *   - IRS Pub 969 (2025), https://www.irs.gov/publications/p969 : health FSA claims need
 *     a written statement from an independent third party that the medical expense was
 *     incurred and its amount, plus the participant's written statement that it was not
 *     paid or reimbursed under any other health plan. HSA holders must keep records
 *     sufficient to show distributions paid qualified medical expenses, were not
 *     reimbursed from another source and were not taken as an itemized deduction; records
 *     are kept with tax records, not sent with the return.
 *   - IRS Pub 502 (2025), https://www.irs.gov/publications/p502 : medical expenses are
 *     costs of diagnosis, cure, mitigation, treatment or prevention of disease; cosmetic
 *     surgery generally excluded; toothbrush and toothpaste are personal expenses.
 */

export const OCT_13B_FSA_HSA = [
  {
    slug: "fsa-hsa-receipt-requirements",
    image: "assets/fsa-hsa-receipt-requirements.jpeg",
    category: "taxes",
    publishedAt: "2026-10-13T14:00:00Z",
    title: "FSA and HSA Receipt Requirements: What an Itemized Receipt Must Show",
    seoTitle: "FSA and HSA Receipt Requirements: What to Include",
    seoDescription:
      "What an itemized receipt needs for a health FSA claim or HSA records: provider, patient, date, service, amount and payment. Why a card slip alone is rejected.",
    excerpt:
      "FSA administrators reject receipts that only show a total. Here is what an itemized medical receipt must show for a health FSA claim, what HSA owners need to keep, and a worked example.",
    body: `**For a health FSA claim, the IRS requires a written statement from an independent third party, usually the provider's itemized receipt, showing that a medical expense was incurred and how much it cost. In practice that means the provider's name, the patient, the date of service, a description of what was provided and the amount. For an HSA, nobody checks the receipt up front, but you must keep records that prove every withdrawal paid a qualified medical expense.** If you are the provider issuing the receipt, our [medical receipt template](/templates/medical-receipt) has a line for each of those fields.

The rules come from IRS [Publication 969](https://www.irs.gov/publications/p969), which covers both accounts. Which expenses count is set out in [Publication 502](https://www.irs.gov/publications/p502). This guide covers medical (health) FSAs and HSAs. Child care claims follow different rules, covered in our [dependent care FSA receipt guide](/blog/dependent-care-fsa-receipt).

## What an FSA or HSA Receipt Must Show

| Field | Example | Why administrators ask for it |
|---|---|---|
| Provider or merchant name | Northside Family Dental | Shows an independent third party issued it |
| Provider address or phone | 210 Oak Ave, Columbus, OH | Lets the administrator confirm the provider exists |
| Patient name | Maya Lin | Ties the expense to you, your spouse or a dependent |
| Date of service | Oct 2, 2026 | Must fall inside your plan year |
| Description of each service or item | Periodic exam, bitewing X-rays | Shows it is medical care, not a personal item |
| Amount of each line | $95.00, $120.00 | Shows the cost incurred |
| Amount you paid | $325.00 | Separates your share from what insurance paid |

The date of service matters more than the payment date. FSA plans reimburse expenses incurred during the plan year, so a receipt dated only by payment can be questioned if the visit happened earlier.

## What Is Not Enough

- **A credit or debit card slip on its own.** It shows that you paid a business, not what you bought or who it was for. Pub 969 asks for a statement that the medical expense was incurred, and a slip does not say that.
- **A bank or card statement.** Same problem: a merchant name and a total.
- **A receipt with only a total.** A pharmacy or optical receipt that mixes eligible items with toothpaste or shampoo needs each line shown, because Pub 502 treats toothbrushes and toothpaste as personal expenses.
- **A cancelled check.** Proof of payment, not of service.

When insurance is involved, administrators often ask for the Explanation of Benefits (EOB) instead of, or alongside, the receipt, because it shows what the plan paid and what you owe. You also confirm on the claim form that the expense was not reimbursed by any other plan. Pub 969 requires that statement from you as well.

## A Worked Example

| Date of service | Description | Amount |
|---|---|---|
| Oct 2, 2026 | Periodic oral exam | $95.00 |
| Oct 2, 2026 | Bitewing X-rays, 4 films | $120.00 |
| Oct 2, 2026 | Adult cleaning | $110.00 |
| | **Total paid by patient** | **$325.00** |

The header shows the practice name, address and phone; the patient line reads "Patient: Maya Lin"; the footer says "Paid in full by Visa ending 4417 on Oct 2, 2026." That single page answers every question an FSA administrator asks.

## How to Get a Receipt That Will Be Accepted

1. Ask for an itemized receipt at checkout, not the card terminal slip.
2. Check that the patient's name and the date of service are on it.
3. If insurance paid part of the bill, keep the EOB too.
4. Upload both to your FSA portal, or keep both in your HSA records folder.
5. If a claim is denied, read the reason. Most denials name the missing field, and the provider can reissue the receipt with it added.

## HSA Records: What to Keep and for How Long

An HSA works differently. You can pay a provider with the HSA card or reimburse yourself later, and no one reviews the receipt at the time. Pub 969 says you must keep records sufficient to show that each distribution paid a qualified medical expense, that the expense was not paid or reimbursed from another source, and that you did not also claim it as an itemized deduction. You keep these with your tax records; you do not send them with your return.

Keep the same itemized receipt an FSA would require. If you reimburse yourself years after the visit, the receipt is the only proof the withdrawal was tax-free. Our guide to [receipts to keep for taxes](/blog/receipts-to-keep-for-taxes) covers how long to hold them.

## For Providers Issuing Receipts

Therapists, chiropractors, dentists and other practices get asked for "a receipt for my FSA" every week. A receipt that already lists the patient, date of service and each service by line saves a second request. If the patient will also file with an insurer, a [superbill](/blog/superbill-template) adds the procedure and diagnosis codes an insurer needs.

You can build an itemized receipt in the browser at [makecepeit](/create) for free; downloading a copy without the watermark needs an account. Every receipt must match a real visit and a real payment.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "What does an FSA receipt need to show?",
        a: "The provider's name, the patient's name, the date of service, a description of each service or item, and the amount. A total alone is usually rejected.",
      },
      {
        q: "Is a credit card receipt enough for an FSA claim?",
        a: "No. A card slip shows that you paid a business, not what you bought or who received it. Administrators ask for an itemized receipt or an Explanation of Benefits.",
      },
      {
        q: "Do I need to send receipts to the IRS for my HSA?",
        a: "No. IRS Publication 969 says to keep records with your tax records showing each distribution paid a qualified medical expense. You do not send them with your return.",
      },
      {
        q: "What HSA records should I keep?",
        a: "Records that show each withdrawal paid a qualified medical expense, that the expense was not reimbursed from another source, and that you did not also deduct it. An itemized receipt plus any EOB covers this.",
      },
      {
        q: "Does the receipt have to show the date of service?",
        a: "Yes. FSA plans reimburse expenses incurred during the plan year, so the date the care was provided matters more than the date you paid.",
      },
      {
        q: "Can I use an Explanation of Benefits instead of a receipt?",
        a: "Often, yes. Many administrators accept an EOB because it shows the service, date and your share of the cost. Check your plan's rules.",
      },
      {
        q: "Why was my FSA receipt rejected?",
        a: "The usual reasons are a missing patient name, missing date of service, no description of the service, or a receipt that mixes eligible and personal items without itemizing them.",
      },
      {
        q: "Are toiletries eligible for FSA or HSA?",
        a: "IRS Publication 502 treats items such as a toothbrush and toothpaste as personal expenses, so they are not qualified medical expenses.",
      },
      {
        q: "Is this the same as a dependent care FSA receipt?",
        a: "No. A dependent care FSA reimburses child or adult care so you can work, and its receipts need the care provider's details. Medical FSAs reimburse health care.",
      },
      {
        q: "Can a provider make an itemized receipt after the visit?",
        a: "Yes, as long as it reflects the real visit, date and payment. Ask the practice to reissue it with any missing field rather than editing it yourself.",
      },
    ],
  },
];
