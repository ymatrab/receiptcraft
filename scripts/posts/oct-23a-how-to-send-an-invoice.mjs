/**
 * Cadence — Day 2026-10-23, post 1 of 2 (09:30Z). Invoice cluster spoke.
 * Keyword gate checked 2026-10-11 (DataForSEO, US): no makecepeit page ranks.
 *   "how to send an invoice"   2,400/mo
 *   -> /templates/invoice (owner), /blog/how-to-make-an-invoice (pillar, Oct 15)
 *
 * No regulated claims. Payment links are described generically; no claim
 * about any named payment app's fees or features. The product is not
 * described as sending email or taking payments: it builds the PDF.
 */

export const OCT_23A_HOW_TO_SEND_AN_INVOICE = [
  {
    slug: "how-to-send-an-invoice",
    image: "assets/how-to-send-an-invoice.jpeg",
    category: "how-to",
    publishedAt: "2026-10-23T09:30:00Z",
    title: "How to Send an Invoice by Email (With a Template Message)",
    seoTitle: "How to Send an Invoice: Email Template and Follow-Ups",
    seoDescription:
      "How to send an invoice: save it as a PDF, email the right person with a clear subject line, add a payment link, and follow up before and after the due date.",
    excerpt:
      "Most invoices that get paid late were sent to the wrong person, with a vague subject line, and no easy way to pay. Here is how to send one properly, a message you can copy, and when to follow up.",
    body: `**To send an invoice, save it as a PDF, attach it to an email addressed to the person who pays bills (not only the person who hired you), and use a subject line with your business name, the invoice number and the due date. In the message, state the amount, the due date and how to pay, and include a payment link if you accept online payment.** Then put a reminder in your calendar for the due date.

If you have not made the invoice yet, start with our guide on [how to make an invoice](/blog/how-to-make-an-invoice) or open the [invoice template](/templates/invoice), which has the invoice number, issue date, due date and balance due already laid out.

## Before You Send: A Quick Check

| Check | Why |
|---|---|
| Invoice number is new | A repeated number gets the invoice rejected or lost |
| Due date is a real date | "Net 30" alone gets read differently by different people |
| Client name and PO number are right | Accounts payable matches invoices to purchase orders |
| Totals add up | One wrong sum means a corrected invoice and another wait |
| Payment details are on the invoice | The client should never have to email to ask how to pay |
| File is a PDF named clearly | e.g. RiveraDesign_INV-1043.pdf |

## How to Send an Invoice by Email

1. **Export the invoice as a PDF.** It keeps the layout fixed and cannot be edited by accident. Name the file with your business name and invoice number.
2. **Find out who pays.** In a small business it is usually the owner. In a larger company it is accounts payable, often a shared address such as ap@ or invoices@. Send to them and copy your contact.
3. **Write a subject line they can search for.** Business name, invoice number, amount or due date.
4. **Keep the message short.** Amount, due date, what it covers, how to pay. Everything else is on the PDF.
5. **Attach the PDF and add a payment link** if you have one.
6. **Send it on the day the work is delivered.** Every day you wait is a day added to when you get paid.
7. **Log it.** Record the invoice number, amount, date sent and due date in a spreadsheet or your accounting software.

### Subject lines that work

- Invoice INV-1043 from Hale Copy Co. – $1,000 due Nov 22
- Hale Copy Co. invoice INV-1043 (website copy, October)

### A message you can copy

> Hi Jordan,
>
> Attached is invoice INV-1043 for the website copy delivered on October 23: four pages, $1,000.00, due November 22, 2026.
>
> You can pay by bank transfer (details on the invoice) or online using this link: [your payment link].
>
> Let me know if accounts payable needs a W-9 or a PO number added.
>
> Thanks,
> Alex Hale, Hale Copy Co.

## Payment Links

A payment link is a URL from your payment processor or invoicing service that opens a checkout page for the amount due. The client clicks, pays by card or bank, and you are notified. They usually get you paid faster because there is nothing to set up on the client's side.

Two things to know before you add one. Processors charge a fee on each payment, so check your provider's pricing page and decide whether to absorb it. And put the same link on the PDF and in the email, so a client who prints the invoice can still find it.

Other ways to send an invoice:

- **Through accounting or invoicing software**, which emails it and tracks when it is opened.
- **Through a client's supplier portal.** Some large companies require you to upload invoices there instead of emailing them.
- **By mail.** Still common with government agencies and some older businesses. Mail a printed copy and keep the PDF.

## When and How to Follow Up

| When | What to send |
|---|---|
| 3 days before the due date | A friendly reminder: amount, due date, payment link |
| On the due date | "Today is the due date for INV-1043." |
| 7 days late | A firmer note, the invoice attached again, and a direct question: when can I expect payment? |
| 14 to 30 days late | A phone call, then a final written notice that states any late fee you agreed on in advance |

Reply to your original email each time, so the whole history sits in one thread. Be specific and polite. Most late invoices are stuck in someone's inbox, not disputed.

When payment arrives, send a short thank-you and mark the invoice paid. If the client wants proof of payment, send a receipt. Our [partial payment receipt guide](/blog/partial-payment-receipt) covers what to send when only part of the balance comes in.

## Make the Invoice First

The [invoice template](/templates/invoice) builds the PDF you attach: your details, the bill-to block, invoice number, dates, line items and balance due. Building it is free; a watermark-free download needs an account.`,
    faqs: [
      {
        q: "What is the best way to send an invoice?",
        a: "Email a PDF to the person who pays bills, with a clear subject line and a short message stating the amount, due date and how to pay.",
      },
      {
        q: "What should I write in an email when sending an invoice?",
        a: "The invoice number, what it covers, the amount, the due date and how to pay. Two or three sentences is enough; the details are on the attached PDF.",
      },
      {
        q: "What subject line should I use for an invoice email?",
        a: "Include your business name, the invoice number and the due date or amount, for example: Invoice INV-1043 from Hale Copy Co., $1,000 due Nov 22.",
      },
      {
        q: "Should I send an invoice as a PDF or a Word file?",
        a: "PDF. It looks the same everywhere and cannot be edited by accident.",
      },
      {
        q: "Who should I send the invoice to?",
        a: "The person or team that pays bills, usually accounts payable in a larger company, with your main contact copied.",
      },
      {
        q: "When should I send an invoice?",
        a: "As soon as the work is delivered or the agreed milestone is reached. Payment terms run from the invoice date, so a late invoice means late payment.",
      },
      {
        q: "Can I send an invoice by text message?",
        a: "You can send a payment link by text for small jobs, but email a PDF as well so the client has a copy for their records.",
      },
      {
        q: "How soon should I follow up on an unpaid invoice?",
        a: "Send a reminder a few days before the due date, another on the due date, and a firmer one about a week after it passes.",
      },
      {
        q: "Do payment links cost money?",
        a: "Usually yes. Payment processors charge a fee per payment. Check your provider's pricing page before adding a link.",
      },
      {
        q: "Should I send a receipt after an invoice is paid?",
        a: "It is good practice and some clients require it. A receipt, or the invoice marked paid, confirms the balance is cleared.",
      },
    ],
  },
];
