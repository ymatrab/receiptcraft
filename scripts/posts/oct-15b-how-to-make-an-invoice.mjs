/**
 * Cadence — Day 2026-10-15, post 2 of 2 (14:00Z). Invoice cluster pillar.
 * Keyword gate checked 2026-10-11 (DataForSEO, US): no makecepeit page ranks.
 *   "how to make an invoice"        14,800/mo
 *   "how to create an invoice"       2,900/mo
 *   "how to write an invoice"        1,900/mo
 *   "what to include on an invoice"    210/mo
 *   -> /templates/invoice (owner; rebuilt as a true unpaid invoice before Oct 15)
 *   -> /templates/google-docs (secondary, for people who prefer a Google Doc)
 *
 * Facts checked 2026-10-11:
 *   - IRS "What kind of records should I keep" lists invoices among the
 *     supporting documents for gross receipts.
 *     https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep
 * Sales tax is mentioned only as "if your state requires it", no rates.
 */

export const OCT_15B_HOW_TO_MAKE_AN_INVOICE = [
  {
    slug: "how-to-make-an-invoice",
    image: "assets/how-to-make-an-invoice.jpeg",
    category: "how-to",
    publishedAt: "2026-10-15T14:00:00Z",
    title: "How to Make an Invoice: Fields, Steps and a Worked Example",
    seoTitle: "How to Make an Invoice: Every Field, Step by Step",
    seoDescription:
      "How to make an invoice: your details, the client's, an invoice number, issue and due dates, itemized lines, tax, total, payment terms and how to pay.",
    excerpt:
      "An invoice asks a client to pay for work you already did or goods you delivered. It needs nine things to get paid on time. Here is each field, the steps in order, and a finished example you can copy.",
    body: `**To make an invoice, put your business name and contact details at the top, then the client's name and address, a unique invoice number, the issue date and the due date. List each product or service on its own line with quantity, rate and amount, add any tax, show the total due, and finish with your payment terms and how the client can pay.** You can build one in our [invoice template](/templates/invoice), which has the bill-to block, invoice number, issue and due dates and balance due already laid out.

An invoice is a request for payment. A receipt comes after, and proves the money arrived. If you are unsure which one you need, our guide to [receipts vs. invoices](/blog/receipt-vs-invoice) covers the difference, and the [pro forma invoice guide](/blog/pro-forma-invoice-vs-receipt) covers the quote-style invoice sent before work starts.

## What to Include on an Invoice

| Field | What to write | Why it matters |
|---|---|---|
| Your details | Business name, address, email, phone | Tells the client who to pay and who to call |
| Client details ("Bill to") | Name or company, billing address, contact person | Gets the invoice to the person who approves it |
| Invoice number | A unique number, e.g. INV-1042 | Lets both sides find and reference it |
| Issue date | The date you send it | Starts the clock on the payment terms |
| Due date | A real date, e.g. Nov 14, 2026 | Clearer than "Net 30" alone |
| Line items | Description, quantity, rate, amount | Shows exactly what is being charged |
| Subtotal, tax, total | Sum of lines, any sales tax, amount due | The number the client pays |
| Payment terms | Net 30, late fee policy if agreed | Sets expectations in writing |
| Payment methods | Bank transfer details, check payee, payment link | Removes the reason to delay |

Optional but useful: a purchase order (PO) number if the client issued one, a project name, and a short thank-you note. Many larger clients will not pay an invoice that is missing their PO number, so ask for it before you bill.

## How to Make an Invoice, Step by Step

1. **Open a template.** Start from an [invoice template](/templates/invoice) or the [invoice builder](/create) rather than a blank page, so no field gets forgotten.
2. **Add your business details.** Use the name your client knows you by and the email where you want replies.
3. **Fill in the bill-to block.** Use the client's legal or company name and the billing address they gave you, which may differ from the job site.
4. **Assign the next invoice number.** Never reuse one and never skip ahead without a reason. A simple sequence such as INV-1041, INV-1042 is enough.
5. **Set the issue date and due date.** Write the due date as a calendar date. "Due on receipt" works for small one-off jobs; Net 15 or Net 30 is common for business clients.
6. **List each item on its own line.** Describe the work the way the client will recognize it ("Logo design, 3 concepts"), then quantity, rate and amount. Hours go in the quantity column.
7. **Add tax if it applies.** If your state requires sales tax on what you sold, add it as a separate line under the subtotal. Services are taxed in some states and not others, so check your state revenue department.
8. **Check the total.** Subtotal plus tax, minus any deposit already paid, equals the balance due.
9. **Write the payment terms and methods.** Say how to pay and by when. If you charge a late fee, it should match what the client agreed to before the work started.
10. **Save as PDF and send.** A PDF keeps the layout fixed on every device. Then follow up if the due date passes.

## A Worked Example

Here is a finished invoice from a freelance designer to a bakery.

> **Rivera Design Studio** · 210 Pine St, Portland, OR · hello@riveradesign.example
> **Bill to:** Northside Bakery, Attn: Sam Lee, 88 Market Ave, Portland, OR
> **Invoice:** INV-1042 · **Issued:** Oct 15, 2026 · **Due:** Nov 14, 2026 (Net 30)

| Description | Qty | Rate | Amount |
|---|---|---|---|
| Logo design, 3 concepts + final files | 1 | $600.00 | $600.00 |
| Business card layout | 1 | $150.00 | $150.00 |
| Extra revision rounds | 2 hr | $75.00 | $150.00 |
| **Total due** | | | **$900.00** |

> **Payment:** bank transfer (details on request) or check payable to Rivera Design Studio. Thank you for your business.

No sales tax line appears because the example assumes design services are not taxed where this designer works. Check your own state before copying that.

## Common Invoice Mistakes

- **No due date.** "Payable soon" gets paid last. A date gets paid on time.
- **Vague line items.** "Services, $900" invites questions. Itemize so the approver can sign off without emailing you.
- **Wrong recipient.** In a company, the person who hired you is often not the person who pays. Ask who handles accounts payable.
- **Duplicate numbers.** Two invoices with the same number confuse both sets of books.
- **Missing payment details.** If the client has to ask how to pay, you have added a week.

## Keep a Copy

Keep every invoice you send, paid or not. The IRS lists invoices among the [supporting documents for gross receipts](https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep) a business should keep, alongside receipt books and deposit records. When the client pays, mark the invoice paid or send a receipt.

## Making One in a Few Minutes

The [invoice template](/templates/invoice) gives you the layout above, ready to fill in. Building it in the browser is free; a watermark-free download needs an account. If you would rather edit a Google Doc, our [Google Docs templates](/templates/google-docs) include an invoice you can copy into your own Drive.`,
    faqs: [
      {
        q: "What is the easiest way to make an invoice?",
        a: "Start from an invoice template, fill in your details, the client's details, an invoice number, the dates and your line items, then save it as a PDF and email it.",
      },
      {
        q: "What must an invoice include?",
        a: "Your business name and contact details, the client's name and address, a unique invoice number, the issue date, the due date, itemized lines with amounts, any tax, the total due, and how to pay.",
      },
      {
        q: "How do I make an invoice if I am not a business?",
        a: "Use your own name in place of a business name. The fields are the same: who is billing, who is paying, what for, how much and when it is due.",
      },
      {
        q: "Should I write the due date or just Net 30?",
        a: "Write both. \"Net 30\" explains the terms, and a calendar date such as Nov 14, 2026 removes any doubt about when the 30 days end.",
      },
      {
        q: "Do I need to add sales tax to an invoice?",
        a: "Only if your state taxes what you sold. Rules for services differ by state, so check with your state revenue department.",
      },
      {
        q: "What is the difference between an invoice and a receipt?",
        a: "An invoice asks for payment. A receipt confirms payment was received. Many businesses send the invoice first and a receipt, or a paid invoice, after.",
      },
      {
        q: "What file format should I send an invoice in?",
        a: "PDF. It looks the same on every device and the client cannot accidentally change the numbers.",
      },
      {
        q: "How do I number my first invoice?",
        a: "Pick a starting number such as 1001 or 2026-001 and go up by one each time. Starting above 1 is fine and common.",
      },
      {
        q: "Can I make an invoice in Google Docs?",
        a: "Yes. Copy an invoice template into your Drive, fill in the fields and download it as a PDF. You will need to add up the totals yourself.",
      },
      {
        q: "How long should I keep copies of my invoices?",
        a: "Keep them with your business records for as long as the IRS may ask about that tax year. The IRS lists invoices as supporting documents for gross receipts.",
      },
    ],
  },
];
