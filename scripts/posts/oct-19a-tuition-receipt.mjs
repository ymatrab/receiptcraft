/**
 * Day 2026-10-19, slot a (09:30Z). Writer C.
 * Keyword gate 2026-10-11 (DataForSEO, US monthly): no makecepeit page ranks.
 *   "tuition receipt"  590/mo
 *   -> owner /templates/tutoring-receipt
 * Angle: the receipt a school, tutor or program writes for a parent or student,
 * and how it differs from Form 1098-T.
 *
 * Facts checked 2026-10-11 against IRS Pub 970 (2025), https://www.irs.gov/publications/p970 :
 *   - Form 1098-T comes from the eligible educational institution; for 2025 by Feb 2, 2026;
 *     the amount on it may differ from what you actually paid
 *   - to claim the AOTC or LLC you generally must have received Form 1098-T; exceptions
 *     exist, and then you must be able to substantiate payment of qualified tuition
 *   - AOTC: up to $2,500 per eligible student (2025); LLC: up to $2,000 per return
 *   - AOTC qualified expenses: tuition and certain related expenses required for enrollment
 *     at an eligible educational institution (postsecondary, eligible for Dept. of
 *     Education student aid)
 *   - employer educational assistance: up to $5,250 excluded each year (2025)
 */

export const OCT_19A_TUITION_RECEIPT = [
  {
    slug: "tuition-receipt",
    image: "assets/tuition-receipt.jpeg",
    category: "how-to",
    publishedAt: "2026-10-19T09:30:00Z",
    title: "Tuition Receipt: What It Should Show (and How It Differs From a 1098-T)",
    seoTitle: "Tuition Receipt: What to Include and a Free Template",
    seoDescription:
      "How to write a tuition receipt for a school, class or tutor: student, term, fees, amount paid and balance, and how it differs from Form 1098-T.",
    excerpt:
      "Parents ask for tuition receipts for employer reimbursement, 529 withdrawals and their own records. Here is what a tuition or tutoring receipt should show, a worked example, and where Form 1098-T fits.",
    body: `**A tuition receipt is a written record from a school, program or tutor confirming that a student's tuition was paid. It should show the provider, the student, the term or dates of instruction, each charge, the amount paid, the payment date and method, and any balance still owed.** Colleges also send Form 1098-T for tax purposes, but a receipt is what proves an individual payment. Small schools, academies and private tutors can issue one with our [tutoring receipt template](/templates/tutoring-receipt).

## Tuition Receipt vs. Form 1098-T

| | Tuition receipt | Form 1098-T |
|---|---|---|
| Who issues it | Any school, program or tutor | Eligible postsecondary institutions |
| When | At each payment | Once a year, early in the year |
| What it shows | One payment and what it covered | Yearly totals, scholarships, enrollment status |
| Used for | Proof of payment, employer reimbursement, 529 records | Claiming federal education credits |

According to [IRS Publication 970](https://www.irs.gov/publications/p970), the amount on a 1098-T may differ from what you actually paid in the year, so your own receipts and statements are how you work out the real figure. When a student does not receive a 1098-T because the school is not required to send one, Pub 970 says you can still claim a credit if you otherwise qualify and can substantiate the payment. A receipt is that substantiation.

## What a Tuition Receipt Should Include

| Field | Example |
|---|---|
| School or tutor name, address, phone | Bright Path Learning Center, 88 Main St, Plano, TX |
| Tax ID (EIN), if the provider has one | Often requested for employer reimbursement |
| Receipt number and date | #T-1042, Sep 5, 2026 |
| Student name | Ava Morales |
| Paid by, if different | Daniel Morales (parent) |
| Program, course or grade | SAT prep, fall session |
| Term or dates of instruction | Sep 8 to Nov 20, 2026 |
| Itemized charges | Tuition, registration fee, materials |
| Amount paid, date and method | $1,060.00 by check #3318 |
| Balance due | $0.00, or the remaining amount |
| Signature or name of the person issuing it | Office manager |

Itemize instead of writing one total. Employers, 529 plan administrators and other reviewers often treat tuition differently from books, supplies or late fees, so each charge needs its own line.

## A Worked Example

| Description | Amount |
|---|---|
| SAT prep tuition, fall session (24 sessions) | $960.00 |
| Registration fee | $50.00 |
| Practice materials | $50.00 |
| **Total paid** | **$1,060.00** |

The header carries the center's name and address, the receipt number and date. Below the lines: "Paid in full by check #3318 on Sep 5, 2026. Balance due: $0.00."

## How to Write One, Step by Step

1. Put your school or business name, address and contact details at the top.
2. Number the receipt and date it. Sequential numbers make your own records easy to reconcile; see [how to number receipts](/blog/how-to-number-receipts).
3. Name the student, and the payer if a parent or employer paid.
4. State the program and the term or dates it covers.
5. List each charge on its own line and total them.
6. Record how and when it was paid, and any balance left.
7. Keep a copy for your own books.

For installment plans, issue a receipt for each payment showing the amount received and the remaining balance. Our guide to [partial payment receipts](/blog/partial-payment-receipt) covers the wording.

## Where Tuition Receipts Get Used

- **Employer tuition assistance.** Pub 970 says employees can exclude up to $5,250 a year (for 2025) of educational assistance received under an employer's program. Employers usually ask for a receipt plus proof of a grade or completion.
- **529 plan withdrawals.** Keep receipts that match each withdrawal to a qualified expense.
- **Education credits.** The American opportunity credit (up to $2,500 per eligible student for 2025) and the lifetime learning credit (up to $2,000 per return) apply to qualified expenses at eligible postsecondary institutions. Pub 970 defines those as colleges, universities and vocational schools eligible to take part in federal student aid programs. Private tutoring is not tuition paid to such an institution, so a tutoring receipt does not by itself support either credit.
- **Your own records.** Parents keep receipts in case of a billing dispute or refund.

## Making Tuition Receipts in the Browser

You can lay out a tuition or tutoring receipt on [makecepeit](/create) for free. Downloading it without a watermark needs an account. Every receipt must match a real payment.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "What is a tuition receipt?",
        a: "A written record from a school, program or tutor confirming a tuition payment. It shows the provider, student, term, charges, amount paid, date and method, and any balance.",
      },
      {
        q: "Is a tuition receipt the same as Form 1098-T?",
        a: "No. A receipt proves one payment. Form 1098-T is a yearly information return from an eligible postsecondary institution used for education credits.",
      },
      {
        q: "Can I claim an education credit without a 1098-T?",
        a: "IRS Publication 970 says you generally need one, but if the school was not required to send it you may still claim a credit if you otherwise qualify and can substantiate the payment.",
      },
      {
        q: "Does tutoring qualify for the American opportunity credit?",
        a: "Generally no. The credit covers tuition and required expenses at an eligible postsecondary institution, not payments to a private tutor.",
      },
      {
        q: "What should a tutoring receipt include?",
        a: "Tutor or business name and contact, student name, subject, session dates or hours, rate, amount paid, payment method and date.",
      },
      {
        q: "Should a tuition receipt be itemized?",
        a: "Yes. Tuition, registration, materials and late fees are often treated differently by employers and 529 plans, so list each one.",
      },
      {
        q: "What does my employer need for tuition reimbursement?",
        a: "Usually an itemized receipt showing tuition paid, plus proof of completion or a grade. Check your company's policy.",
      },
      {
        q: "How do I write a receipt for an installment payment?",
        a: "Record the amount received, the date, the total tuition, and the remaining balance after this payment.",
      },
      {
        q: "Do private schools have to give tuition receipts?",
        a: "Practices vary, but most will provide one on request. Ask at enrollment so you receive one for every payment.",
      },
      {
        q: "How long should I keep tuition receipts?",
        a: "Keep them at least as long as the tax return they support could be examined, and longer if they back a 529 withdrawal or reimbursement.",
      },
    ],
  },
];
