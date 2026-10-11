/**
 * Cadence — Day 2026-11-02, post 2 of 2 (14:00Z). Invoice cluster spoke.
 * Keyword gate checked 2026-10-11 (DataForSEO, US): no makecepeit page ranks.
 *   "1099 invoice template"           210/mo
 *   "invoice for services rendered"   170/mo
 *   "self employed invoice"            70/mo
 *   -> /templates/invoice (owner), /templates/google-docs (secondary),
 *      /blog/how-to-make-an-invoice (Oct 15), /blog/invoice-payment-terms (Oct 29),
 *      /blog/invoice-number (Oct 25), /blog/freelancer-receipts
 *
 * Facts checked 2026-10-11 on irs.gov:
 *   - 1099-NEC threshold: $600, or $2,000 for payments made after
 *     December 31, 2025 (so payments made in 2026).
 *     https://www.irs.gov/faqs/small-business-self-employed-other-business/form-1099-nec-independent-contractors/form-1099-nec-independent-contractors
 *     (Pub 1099 / i1099mec: OBBBA sec. 70433; indexed for inflation after 2026.)
 *   - Form W-9 is used to provide your correct TIN to the person who must file
 *     an information return. https://www.irs.gov/forms-pubs/about-form-w-9
 *   - Report all income even if you don't receive a Form 1099.
 *     https://www.irs.gov/businesses/small-businesses-self-employed/manage-taxes-for-your-gig-work
 *   - File a return if net earnings from self-employment were $400 or more;
 *     SE tax plus income tax; quarterly estimated taxes.
 *     https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center
 *   - i1099mec "What's New": $2,000 for tax years beginning after 2025, may be
 *     adjusted for inflation beginning in calendar year 2027.
 *     https://www.irs.gov/instructions/i1099mec
 *   - Form W-9 (Rev. March 2024): "Give form to the requester. Do not send to
 *     the IRS."; sole proprietor with an EIN may enter SSN or EIN (IRS
 *     encourages SSN); line 1 = name as shown on your tax return.
 *     https://www.irs.gov/pub/irs-pdf/fw9.pdf
 */

export const NOV_2B_HOW_TO_INVOICE_AS_A_1099_CONTRACTOR = [
  {
    slug: "how-to-invoice-as-a-1099-contractor",
    image: "assets/how-to-invoice-as-a-1099-contractor.jpeg",
    category: "taxes",
    publishedAt: "2026-11-02T14:00:00Z",
    title: "How to Invoice as a 1099 Contractor (Template and W-9 Basics)",
    seoTitle: "How to Invoice as a 1099 Contractor: Fields and W-9",
    seoDescription:
      "What a 1099 contractor invoice needs, how to bill for services rendered, when clients ask for a W-9, and the 1099-NEC threshold for payments made in 2026.",
    excerpt:
      "As an independent contractor you bill clients with an invoice, and they may report what they paid you on Form 1099-NEC. Here is what your invoice should include, how the W-9 fits in, and what changed for payments made in 2026.",
    body: `**A 1099 contractor invoice is an ordinary invoice for services rendered: your name or business name and contact details, the client's details, a unique invoice number, the issue and due dates, a description of the services with dates, hours or quantities and rates, the total due, and how to pay.** There is no special IRS invoice format. The "1099" part is what your client does with the payments afterward: if they pay you enough in the year for services in their business, they report it on Form 1099-NEC, using the taxpayer ID number you give them on Form W-9.

You can build one in our [invoice template](/templates/invoice), which has the bill-to block, invoice number, issue and due dates and balance due laid out. If you prefer working in Google Docs, our [Google Docs templates](/templates/google-docs) include an invoice you can copy. The general walkthrough is in [how to make an invoice](/blog/how-to-make-an-invoice).

## What to Include on a Contractor Invoice

| Field | Example | Note |
|---|---|---|
| Your name or business name | Kim Nguyen Development | Use the name on your W-9 so payments match |
| Your contact details | Email, phone, mailing address | |
| Client name and billing address | Brightline Logistics, Attn: Accounts Payable | |
| Invoice number | INV-1088 | See [invoice number](/blog/invoice-number) |
| Issue date and due date | Nov 2, 2026 · due Dec 2, 2026 | |
| Service period | Oct 1–31, 2026 | Helps the client book it in the right year |
| Description of services | API integration, code review | "Services rendered" plus specifics |
| Hours or quantity, rate, amount | 24 hr × $95 | |
| Total due | $2,565.00 | |
| Payment terms and methods | Net 30, bank transfer | See [payment terms](/blog/invoice-payment-terms) |

**Leave your Social Security number off the invoice.** Invoices get emailed, forwarded and printed. Your taxpayer ID goes on the W-9, which you send to the client separately and securely. A sole proprietor who has an EIN may enter either the SSN or the EIN on the W-9.

## An Invoice for Services Rendered: Worked Example

> **Kim Nguyen Development** · kim@nguyendev.example · Austin, TX
> **Bill to:** Brightline Logistics, Attn: Accounts Payable
> **Invoice:** INV-1088 · **Issued:** Nov 2, 2026 · **Due:** Dec 2, 2026 (Net 30)
> **Service period:** October 1–31, 2026

| Services rendered | Qty | Rate | Amount |
|---|---|---|---|
| Shipping API integration | 24 hr | $95.00 | $2,280.00 |
| Code review and documentation | 3 hr | $95.00 | $285.00 |
| **Total due** | | | **$2,565.00** |

> Payment by bank transfer to the account on file. W-9 provided on Sept 30, 2026.

"Services rendered" is fine as a heading, but the lines underneath should say what you did. Clients approve specific invoices faster.

## Where the W-9 Comes In

Before or soon after your first invoice, a business client will usually ask you for a Form W-9. The IRS describes the W-9 as the form you use to [provide your correct taxpayer identification number](https://www.irs.gov/forms-pubs/about-form-w-9) to the person who has to file an information return about payments to you. You fill it in and give it to the client; the form itself says not to send it to the IRS.

Steps:

1. Download the current W-9 from irs.gov.
2. Enter your name as shown on your tax return, a business name if you have one, and your tax classification (for example, individual/sole proprietor or single-member LLC).
3. Enter your SSN or EIN and sign it.
4. Send it through a secure method the client offers, not as a plain email attachment if you can avoid it.

## Form 1099-NEC: What Changed for 2026

Form 1099-NEC is filed by the client, not by you. According to the IRS, a business reports payments to a non-employee for services when they total $600 or more in the year, and [$2,000 or more for payments made after December 31, 2025](https://www.irs.gov/faqs/small-business-self-employed-other-business/form-1099-nec-independent-contractors/form-1099-nec-independent-contractors). For work paid in 2026, the threshold is $2,000. The IRS [instructions for Forms 1099-MISC and 1099-NEC](https://www.irs.gov/instructions/i1099mec) say the amount may be adjusted for inflation beginning in calendar year 2027.

So in the example above, if Brightline pays Kim $2,000 or more during 2026, it files a 1099-NEC and sends her a copy early the following year.

## Report All of It, 1099 or Not

A 1099 is the client's paperwork. Your obligation is separate: the IRS says to [report all income](https://www.irs.gov/businesses/small-businesses-self-employed/manage-taxes-for-your-gig-work) on your tax return even if you do not receive a Form 1099. Your own invoices and payment records are how you prove what you earned.

The IRS [Self-Employed Individuals Tax Center](https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center) also notes that you must file a return if your net earnings from self-employment were $400 or more, that self-employed people generally pay self-employment tax as well as income tax, and that they are generally expected to pay estimated taxes quarterly.

## Habits That Keep the Year Clean

- Invoice on the day the work is delivered, or on a fixed day each month.
- Keep one numbered sequence for all clients.
- Match each payment to its invoice when it lands.
- Keep receipts for business expenses; our [freelancer receipts guide](/blog/freelancer-receipts) covers which ones.
- In January, compare any 1099-NECs you receive with your own invoice log.

This is general information, not tax or legal advice.`,
    faqs: [
      {
        q: "Is there a special 1099 invoice format?",
        a: "No. A contractor uses an ordinary invoice. The 1099-NEC is a separate form the client files to report what it paid you.",
      },
      {
        q: "What should a 1099 contractor invoice include?",
        a: "Your name and contact details, the client's details, a unique invoice number, issue and due dates, the service period, itemized services with hours and rates, the total due and how to pay.",
      },
      {
        q: "What is the 1099-NEC threshold for 2026?",
        a: "The IRS says the reporting threshold is $2,000 for payments made after December 31, 2025, up from $600. It may be adjusted for inflation beginning in calendar year 2027.",
      },
      {
        q: "Should I put my Social Security number on my invoice?",
        a: "No. Give your taxpayer ID to the client on Form W-9, sent securely, and keep it off invoices.",
      },
      {
        q: "What is a W-9 used for?",
        a: "To give your correct taxpayer identification number to a business that must file an information return, such as a 1099-NEC, about payments to you.",
      },
      {
        q: "Do I send the W-9 to the IRS?",
        a: "No. You give it to the client who asked for it. They keep it on file.",
      },
      {
        q: "Do I have to report income if I don't get a 1099?",
        a: "Yes. The IRS says to report all income on your tax return even if you don't receive a Form 1099.",
      },
      {
        q: "What does invoice for services rendered mean?",
        a: "An invoice for work you have already performed. List the specific services, dates or hours and rates under that heading.",
      },
      {
        q: "Can I use an EIN instead of my SSN as a contractor?",
        a: "If you are a sole proprietor with an EIN, the W-9 lets you enter either your SSN or your EIN. The form's instructions note the IRS encourages sole proprietors to use their SSN.",
      },
      {
        q: "Who files the 1099-NEC, me or the client?",
        a: "The client files it and sends you a copy. You use your own records to report your income either way.",
      },
    ],
  },
];
