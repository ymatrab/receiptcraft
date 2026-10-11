/**
 * Day 2026-10-17, slot b (14:00Z). Writer C.
 * Keyword gate 2026-10-11 (DataForSEO, US monthly): no makecepeit page ranks.
 *   "missing receipt affidavit"  720/mo
 *   "missing receipt form"       390/mo
 *   -> first link /blog/lost-receipt-expense-report (closest owner; no template is a fit)
 * Angle: how to fill out the employer's form honestly, what it can and cannot do.
 * Never suggests using it for expenses that did not happen.
 *
 * Facts checked 2026-10-11 against IRS Pub 463 (2025), https://www.irs.gov/publications/p463 :
 *   - documentary evidence (receipts, canceled checks, bills) generally required; not
 *     needed for an expense other than lodging under $75, or transportation where a receipt
 *     is not readily available
 *   - adequate evidence shows amount, date, place and essential character
 *   - incomplete records: your own written or oral statement with specific information
 *     plus other supporting evidence sufficient to establish the element
 *   - destroyed records: reasons beyond your control (fire, flood, other casualties) allow
 *     reconstruction
 *   - accountable plan: business connection, adequately account within a reasonable
 *     period, return excess
 */

export const OCT_17B_MISSING_RECEIPT_AFFIDAVIT = [
  {
    slug: "missing-receipt-affidavit",
    image: "assets/missing-receipt-affidavit.jpeg",
    category: "expenses",
    publishedAt: "2026-10-17T14:00:00Z",
    title: "Missing Receipt Affidavit: How to Fill One Out (With Example)",
    seoTitle: "Missing Receipt Affidavit: What to Include + Example",
    seoDescription:
      "How to fill out a missing receipt affidavit: the fields employers ask for, when it is accepted, its limits, and how it fits the IRS recordkeeping rules.",
    excerpt:
      "A missing receipt affidavit is the form you sign when a business expense receipt is lost. Here is what goes on it, when employers accept it, where it stops working, and a filled-in example.",
    body: `**A missing receipt affidavit (also called a missing receipt form or lost receipt declaration) is a signed statement an employee gives their employer when the receipt for a real business expense is lost. It records the date, the merchant, what was bought, the amount, the business purpose and why there is no receipt, so the expense can still be reimbursed.** It replaces a receipt only under your employer's policy, and it is never a way to claim an expense that did not happen. For the wider process, see our guide to [handling a lost receipt on an expense report](/blog/lost-receipt-expense-report).

The form is an internal document. Each company writes its own, sets its own limits and decides whether to accept it. The IRS does not publish a "missing receipt affidavit" form.

## What a Missing Receipt Affidavit Includes

| Field | Example |
|---|---|
| Employee name and department | Jordan Price, Field Sales |
| Date of the expense | Sep 18, 2026 |
| Merchant or vendor name | Harbor Grill |
| City and state | Portland, ME |
| Description of the expense | Lunch with client, 2 people |
| Amount | $48.60 |
| Payment method | Corporate card ending 2291 |
| Business purpose | Contract renewal meeting with Coastline Supply |
| Why the receipt is missing | Itemized receipt not provided, card slip lost |
| Attempts to get a copy | Called restaurant Sep 22, no duplicate available |
| Signature and date | Employee, then approving manager |

Most forms end with a sentence the employee signs, along the lines of "I certify this expense was incurred for company business and that I have not been and will not be reimbursed for it elsewhere."

## How to Fill It Out

1. **Try to get a duplicate first.** Many merchants can reprint a receipt from the transaction date and card number. Hotels, airlines and ride apps keep receipts in your account.
2. **Gather what you do have.** A card statement line, a booking confirmation email or a calendar invite all support the claim.
3. **Fill in every field from the table above.** Vague entries such as "meals, $60" are the most common reason a form is sent back.
4. **State the business purpose plainly.** Name who you met or why you traveled.
5. **Attach the supporting evidence** and submit it with the expense report, within your policy's deadline.
6. **Sign and get the approver's signature.** A manager's signature usually confirms the trip or meeting happened.

## A Filled-In Example

| Date | Merchant | Description | Amount |
|---|---|---|---|
| Sep 18, 2026 | Harbor Grill, Portland, ME | Client lunch, 2 people | $48.60 |
| Sep 18, 2026 | City parking garage | Parking during client meeting | $18.00 |
| | | **Total claimed** | **$66.60** |

Reason: "Both receipts lost while traveling. Card statement attached showing both charges." Signed by the employee, approved by the regional manager.

## When It Is Accepted, and Its Limits

Policies vary, but these limits are common:

- **A cap per item or per report.** Many companies accept an affidavit only for small amounts and require a real receipt above that.
- **A limit on how often.** Repeated missing receipts usually trigger a review.
- **No affidavit for some categories.** Airfare and hotel stays are often excluded, since a copy can almost always be downloaded.
- **Supporting proof.** Some employers accept the form only with a card or bank record attached.

## Where the IRS Fits In

Employers reimburse expenses tax-free through what the IRS calls an accountable plan. Under [IRS Publication 463](https://www.irs.gov/publications/p463), that plan requires a business connection, an adequate accounting to the employer within a reasonable period, and the return of any excess. A missing receipt affidavit is part of how an employee accounts for one expense.

Pub 463 also sets the receipt rules behind those policies:

- You generally need documentary evidence, such as receipts, canceled checks or bills.
- A receipt is not required for an expense, other than lodging, of less than $75. Our [$75 receipt rule guide](/blog/irs-75-dollar-receipt-rule) explains the details.
- Good evidence shows the amount, date, place and essential character of the expense.
- If your records are incomplete, you can prove an element with your own specific written statement plus other supporting evidence.
- If records were lost for reasons beyond your control, such as a fire or flood, you can reconstruct them.

A signed statement with a card record attached follows that pattern. It does not replace the business purpose or the amount; it records them. For self-employed people facing an audit without receipts, the courts have sometimes allowed an estimate under the [Cohan rule](/blog/audit-without-receipts-cohan-rule), but that is a fallback, not a plan.

## What Not to Do

- Do not sign an affidavit for an expense that did not happen, or for a higher amount than you paid. That is expense fraud.
- Do not recreate the merchant's receipt yourself. A receipt has to come from the business that was paid. If you sell something, you issue the receipt; you do not make one for someone else's sale.
- Do not claim the same expense twice, for example with an affidavit and a later-found receipt.

If you run a small business and your own customers ask for a replacement receipt, you can reissue one for a real sale from your records. Our [itemized receipt template](/templates/itemized-receipt) is a quick way to do that.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "What is a missing receipt affidavit?",
        a: "A signed statement an employee gives their employer when the receipt for a real business expense is lost. It records the date, merchant, amount, purpose and why the receipt is missing.",
      },
      {
        q: "Is a missing receipt form the same as an affidavit?",
        a: "Usually, yes. Companies use both names. Some require notarization, most only need the employee's and manager's signatures.",
      },
      {
        q: "Does the IRS accept a missing receipt affidavit?",
        a: "The IRS does not publish one. Publication 463 lets you prove an incomplete record with your own specific written statement plus other supporting evidence, which is what a well-filled affidavit with a card record provides.",
      },
      {
        q: "Is there a dollar limit for a missing receipt affidavit?",
        a: "Each employer sets its own. Many accept the form only up to a set amount per item and require a real receipt above it.",
      },
      {
        q: "Do I need a receipt for expenses under $75?",
        a: "Under IRS Publication 463, documentary evidence is not required for an expense other than lodging of less than $75, though you still need a record of it. Your employer may still ask for receipts.",
      },
      {
        q: "What should I attach to a missing receipt form?",
        a: "Anything that shows the charge happened: a card or bank statement line, a booking confirmation, or an email from the merchant.",
      },
      {
        q: "Can I use a missing receipt affidavit for a hotel bill?",
        a: "Often not. Hotels can almost always send a copy of the folio, so many policies exclude lodging and airfare.",
      },
      {
        q: "What happens if I use an affidavit too often?",
        a: "Most employers review employees who submit frequent missing receipt forms, and some limit how many are accepted per year.",
      },
      {
        q: "Can I make a replacement receipt myself?",
        a: "No. A receipt has to come from the business that was paid. Ask the merchant for a duplicate, or file a missing receipt form.",
      },
      {
        q: "Who signs a missing receipt affidavit?",
        a: "The employee who incurred the expense, and usually the approving manager. Some companies also require finance review.",
      },
    ],
  },
];
