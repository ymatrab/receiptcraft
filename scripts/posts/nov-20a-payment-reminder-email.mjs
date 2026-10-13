/**
 * Cadence — Day 2026-11-20, post 1 of 2 (09:30Z). Invoice cluster spoke.
 * Elliot writers test (writer F).
 * Keyword gate (orchestrator brief): "payment reminder email" (template, sample, to
 *   client). Demand evidence: Google autocomplete 2026-10-13; no makecepeit page ranks
 *   for it in Search Console.
 *   -> /templates/invoice (owner: attach the invoice to every reminder),
 *      /blog/invoice-payment-terms (Oct 29)
 *
 * Product check 2026-10-13: none beyond the invoice template itself (line items, total,
 * editable total label). The post does not claim the product sends emails.
 *
 * Facts checked 2026-10-13:
 *   - FTC consumer page "Debt Collection FAQs": the FDCPA makes abusive, unfair or
 *     deceptive collection practices illegal; covered debts are personal/household
 *     debts; "Business debts are not covered by the FDCPA."
 *     https://consumer.ftc.gov/articles/debt-collection-faqs
 * Reminder timing (before due, on due date, 7 days late) and late-fee wording are
 * common practice; no state late-fee rates are given. Sample businesses are fictional.
 */

export const NOV_20A_PAYMENT_REMINDER_EMAIL = [
  {
    slug: "payment-reminder-email",
    image: "assets/payment-reminder-email.jpeg",
    category: "small-business",
    publishedAt: "2026-11-20T09:30:00Z",
    title: "Payment Reminder Email: 3 Samples to Send a Client",
    seoTitle: "Payment Reminder Email Templates: 3 Samples for Clients",
    seoDescription:
      "Three payment reminder email samples you can copy: a friendly note before the due date, one on the day, and a firmer one 7 days late, plus timing tips.",
    excerpt:
      "Most late invoices are forgotten, not disputed. Here are three payment reminder emails to copy, one before the due date, one on it and one a week late, with subject lines, a schedule and what to attach.",
    body: `**A payment reminder email should name the invoice number, the amount, the due date and how to pay, in a few polite lines, with the invoice attached. Send the first a few days before the due date, the second on the day, and a firmer one about a week after it passes.** Three samples you can copy are below.

Every reminder works better with the invoice attached, so the client never has to search for it. If you need to rebuild or resend one, our [invoice template](/templates/invoice) has the line items and total ready, and you can rename the total label to "Amount due". The terms you set on that invoice decide the timing of everything here; [invoice payment terms](/blog/invoice-payment-terms) explains Net 30, due on receipt and late fees.

## A Reminder Schedule That Works

| When | Tone | Goal |
|---|---|---|
| 3 days before the due date | Friendly heads-up | Get it into the client's payment run |
| On the due date | Plain and direct | Confirm today is the day |
| 7 days past due | Firm, still polite | Get a payment date or find the problem |
| 14+ days past due | Phone call | Talk to a person, agree a plan |
| 30+ days past due | Final written notice | State next steps you will actually take |

Put reminder dates on your calendar the day you send the invoice. Reminders that go out on schedule feel routine; reminders sent in frustration read that way.

## What Every Reminder Should Include

- **Invoice number** in the subject line and the body.
- **Amount due**, exactly as it appears on the invoice.
- **Due date**, and how many days late if it has passed.
- **How to pay**: bank transfer details, payment link or mailing address.
- **The invoice attached** as a PDF.
- **Your name and a direct contact**, so a question does not stall payment.

## Sample 1: Before the Due Date

Sample data: a fictional design studio reminds a fictional client.

> **Subject:** Invoice INV-2026-118 due Nov 30
> Hi Laura,
> A quick reminder that invoice INV-2026-118 for $1,850.00 is due on Monday, Nov 30. I've attached a copy for your records.
> You can pay by bank transfer to the account on the invoice, or by card using the payment link at the bottom.
> Thanks, and let me know if anything needs to go through your purchasing team first.
> Sam Ortega
> Ortega Studio · (503) 555-0186

Short, specific and easy to forward to whoever actually pays the bills.

## Sample 2: On the Due Date

> **Subject:** Invoice INV-2026-118 due today, $1,850.00
> Hi Laura,
> Invoice INV-2026-118 for $1,850.00 is due today. A copy is attached.
> If it's already on its way, thank you, and please ignore this note. If anything on the invoice needs correcting, reply here and I'll sort it out today.
> Sam Ortega
> Ortega Studio · (503) 555-0186

The line about corrections matters. A client who thinks an invoice is wrong often says nothing and simply does not pay.

## Sample 3: 7 Days Late

> **Subject:** Overdue: invoice INV-2026-118, 7 days past due
> Hi Laura,
> I haven't yet received payment for invoice INV-2026-118 ($1,850.00), which was due on Nov 30 and is now 7 days overdue. The invoice is attached again.
> Could you let me know when payment is scheduled? If there's a problem with the invoice or the work, I'd rather hear about it now so we can fix it.
> As set out in our agreement, a late fee of 1.5% per month applies to balances unpaid after 30 days.
> Sam Ortega
> Ortega Studio · (503) 555-0186

Include the late-fee sentence only if the client agreed to that fee in advance, on the quote, contract or invoice, and use the rate you actually agreed. The 1.5% here is an example. State law can limit interest and late charges, so check your state's rules before you set a rate.

## Subject Lines That Get Opened

| Situation | Subject line |
|---|---|
| Before due | Invoice INV-2026-118 due Nov 30 |
| Due today | Invoice INV-2026-118 due today, $1,850.00 |
| Late | Overdue: invoice INV-2026-118, 7 days past due |
| Partial payment received | Balance of $850.00 remaining on INV-2026-118 |
| Final notice | Final notice: INV-2026-118, 30 days past due |

Lead with the invoice number. The client's accounts team searches their inbox by it.

## Keep It Professional

Reminders work because they are clear and routine. Avoid threats you will not carry out, copying the client's colleagues to shame them, or messaging late at night.

If your clients are individuals rather than businesses, the rules on collecting a debt can be stricter. The FTC notes that the federal debt collection law covers [personal and household debts, not business debts](https://consumer.ftc.gov/articles/debt-collection-faqs), and states have their own rules. Before handing a debt to a collector or threatening legal action, get advice for your state. This is general information, not legal advice.

## When the Client Pays

Send a short thank-you and a receipt or a paid copy of the invoice, the same day. It closes the loop, and clients who feel noticed for paying on time tend to keep doing it.

Send reminders only for real invoices for work you actually delivered.`,
    faqs: [
      {
        q: "How do I write a polite payment reminder email?",
        a: "Keep it short: name the invoice number, the amount and the due date, say how to pay, attach the invoice and offer to fix anything that is wrong. Avoid blame; most late payments are oversights.",
      },
      {
        q: "When should I send a payment reminder?",
        a: "A common schedule is a friendly note three days before the due date, a reminder on the due date, and a firmer email about seven days after it passes, followed by a phone call if there is still no reply.",
      },
      {
        q: "Can I add a late fee in a reminder email?",
        a: "Only if the client agreed to it in advance, for example on the quote, contract or invoice. State law may limit interest and late charges, so check your state's rules. This is general information, not legal advice.",
      },
      {
        q: "What should the subject line of a payment reminder say?",
        a: "Lead with the invoice number and the status, for example: Invoice INV-2026-118 due today, $1,850.00. Clients' accounts teams search by invoice number.",
      },
      {
        q: "Can I make the invoice to attach on makecepeit?",
        a: "Yes. The invoice template has line items, tax and a total, and you can rename the total label to Amount due. Building and previewing need no account; downloading needs a free account.",
      },
    ],
  },
];
