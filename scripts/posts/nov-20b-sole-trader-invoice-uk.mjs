/**
 * Day 2026-11-20, slot b (14:00Z). Writer I (Elliot writers, UK batch).
 * Keyword gate (coordinator brief, Google autocomplete gl=uk, 2026-10-13):
 *   "sole trader invoice", "sole trader invoice template", "sole trader invoice no vat number"
 *   -> owner /templates/invoice; links /blog/vat-invoice-requirements-uk (Nov 16, this batch),
 *      /blog/invoice-number, /blog/invoice-payment-terms, /blog/self-employed-receipt-tracking
 * Angle: UK sole trader invoice, field by field from GOV.UK, invoicing when not VAT
 * registered, payment terms and late payment interest, worked example in £.
 * Product check (origin/main, 2026-10-13): /templates/invoice is a real bill (greeting
 * INVOICE, "Bill to" block, "Payment terms" block with Terms/Due rows, hideTotals so the
 * total reads as amount due); its default currency is not GBP, so the post tells readers to
 * pick "British Pound (£)" in Settings > Currency (lib/format.ts CURRENCIES,
 * SectionBuilder.tsx line ~1286). Detail rows have editable labels and values.
 *
 * Facts checked 2026-10-13:
 *   - GOV.UK, Invoicing and taking payment from customers: Invoices - what they must include,
 *     https://www.gov.uk/invoicing-and-taking-payment-from-customers/invoices-what-they-must-include :
 *     unique identification number; your company name, address and contact information;
 *     customer's company name and address; clear description; supply date; invoice date;
 *     amounts charged; VAT amount if applicable; total owed. Sole traders must also include
 *     their name and any business name used, and an address where legal documents can be
 *     delivered if using a business name. VAT invoices must be used if you and your customer
 *     are VAT registered.
 *   - GOV.UK, same guide, Overview: an invoice is not the same as a receipt, which is an
 *     acknowledgement of payment.
 *   - GOV.UK, Payment - obligations,
 *     https://www.gov.uk/invoicing-and-taking-payment-from-customers/payment-obligations :
 *     you can set your own payment terms; unless a payment date is agreed the customer must
 *     pay within 30 days of getting the invoice or the goods/service.
 *   - GOV.UK, Late commercial payments: When a payment becomes late / Interest,
 *     https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt :
 *     statutory interest 8% plus Bank of England base rate for B2B; agreed payment dates
 *     usually within 60 days for business transactions; send a new invoice if you add interest.
 *   - GOV.UK, Charge, reclaim and record VAT, https://www.gov.uk/charge-reclaim-record-vat :
 *     you must register for VAT to start charging VAT.
 *   - GOV.UK, Register for VAT, https://www.gov.uk/register-for-vat : £90,000 threshold;
 *     voluntary registration possible below it.
 *   - GOV.UK, Business records if you're self-employed: what records to keep,
 *     https://www.gov.uk/self-employed-records/what-records-to-keep : proof includes sales
 *     invoices, till rolls and bank slips.
 * Not stated as law: writing "Not VAT registered" on the invoice (presented as common
 * practice). Sample business, person and amounts are fictional.
 */

export const NOV_20B_SOLE_TRADER_INVOICE_UK = [
  {
    slug: "sole-trader-invoice-uk",
    image: "assets/sole-trader-invoice-uk.jpeg",
    category: "small-business",
    publishedAt: "2026-11-20T14:00:00Z",
    title: "Sole Trader Invoice (UK): What to Include, With or Without VAT",
    seoTitle: "Sole Trader Invoice UK: What It Must Include",
    seoDescription:
      "What a UK sole trader invoice must show under GOV.UK rules, how to invoice without a VAT number, payment terms, late payment interest and a worked example.",
    excerpt:
      "A UK sole trader invoice needs your name, any trading name, an address for legal documents, a unique number, dates, a description and the total owed. Here is the full list, how to invoice without a VAT number, and a sample.",
    body: `**A UK sole trader invoice must show a unique invoice number, your name and any business name you trade under, your address and contact details, the customer's name and address, a clear description of the work, the supply date and invoice date, the amounts charged and the total owed. If you trade under a business name, add an address where legal documents can be delivered to you. If you are not VAT registered, leave VAT off entirely: you cannot charge it.** You can fill all of this in on the [free invoice template](/templates/invoice) and switch the currency to pounds.

The list comes from GOV.UK's guide to [invoicing and taking payment from customers](https://www.gov.uk/invoicing-and-taking-payment-from-customers/invoices-what-they-must-include). If you are VAT registered and so is your customer, the rules are stricter; those are covered in our [UK VAT invoice requirements](/blog/vat-invoice-requirements-uk) guide.

## What every sole trader invoice must include

| Field | Example |
|---|---|
| Unique invoice number | SB-2026-031 |
| Your name and any business name | Priya Shah, trading as Shah Bookkeeping |
| Your address and contact details | Business address, phone, email |
| Address for legal documents | Needed if you use a business name; often the same address |
| Customer's name and address | The company or person you are billing |
| Clear description | "Monthly bookkeeping, October 2026", not "services" |
| Supply date | When you did the work or delivered the goods |
| Invoice date | The day you issue it |
| Amounts charged | Each line, with quantity and price where it helps |
| VAT amount | Only if you are VAT registered |
| Total owed | The amount the customer needs to pay |

GOV.UK adds two things for sole traders on top of the general list: your own name has to appear, not only a trading name, and if you use a business name you must give an address where legal documents can reach you. A limited company has different rules, such as showing its full registered name.

GOV.UK also says the invoice should make clear how much the customer needs to pay and when. That means a due date or payment terms, even though they are not on the "must include" list.

## Invoicing without a VAT number

Most sole traders are not VAT registered. Registration is compulsory only when taxable turnover goes over [£90,000 in a rolling 12 months](https://www.gov.uk/register-for-vat), though you can register voluntarily below that.

If you are not registered:

- **Do not add VAT.** GOV.UK is plain that you must register for VAT before you can charge it.
- **Do not show a VAT number** or call the document a VAT invoice.
- **Your total is simply your price.** There is no net, VAT and gross split.

Many sole traders add a line such as "Not VAT registered" so business customers do not ask where the VAT is. It is not a legal requirement, but it saves an email.

If you register later, your invoices change from that date: you charge VAT and, when your customer is VAT registered too, you issue full VAT invoices.

## Payment terms and late payment

You can set your own terms, for example 14 days or 30 days, or payment upfront. GOV.UK says that if no payment date is agreed, the customer must pay within 30 days of getting your invoice or the goods or service.

For business customers, the late payment rules let you charge statutory interest at 8% plus the Bank of England base rate if they pay late. You do not have to, and you cannot claim it if your contract sets a different rate. If you decide to add interest, send a new invoice for it. Our guide to [invoice payment terms](/blog/invoice-payment-terms) explains common wording such as "Net 30".

## Worked example

Priya Shah (a sample sole trader) does bookkeeping for a small café. She is not VAT registered and bills monthly.

| Description | Qty | Price | Amount |
|---|---|---|---|
| Monthly bookkeeping, October 2026 | 1 | £240.00 | £240.00 |
| Payroll run, 2 staff | 2 | £25.00 | £50.00 |
| **Total owed** | | | **£290.00** |

Around the table the invoice shows:

- **From:** Priya Shah, trading as Shah Bookkeeping, with her business address, which is also where legal documents can be served
- **Bill to:** the café's business name and address
- **Invoice number:** SB-2026-031, the next number in her series (see [invoice numbers](/blog/invoice-number) for formats)
- **Supply date:** 1 to 31 October 2026. **Invoice date:** 3 November 2026
- **Terms:** payment due within 14 days, by bank transfer, with her sort code and account number
- **Note:** "Not VAT registered"

When the café pays, Priya can mark the same invoice as paid and keep it as their receipt. GOV.UK points out that an invoice and a receipt are different things: the invoice asks for payment, the receipt acknowledges it.

## Common mistakes

- **Trading name only.** As a sole trader your own name needs to be on the invoice too.
- **Charging VAT before you are registered.** GOV.UK says you must register before you can charge VAT.
- **Vague descriptions.** "Work done" makes queries more likely and is harder to match to your records.
- **Reusing or skipping numbers.** Each invoice needs a unique number. A simple running sequence is enough.
- **No due date.** Without one, the 30-day default applies, which may be longer than you wanted.

## Keep a copy

Your sales invoices are part of the records HMRC expects you to keep for your Self Assessment return, alongside receipts for expenses and bank statements. Keep every invoice you send, including any you cancel. Our guide to [receipt tracking for the self-employed](/blog/self-employed-receipt-tracking) covers the expense side.

## Make it in the builder

1. Open the [invoice template](/templates/invoice) and choose British Pound (£) under Settings, then Currency.
2. Put your name and trading name in the header, with your address and contact details.
3. Fill in the "Bill to" block and the invoice number, dates and terms.
4. Add each line with its price. If you are not VAT registered, set the tax to 0.
5. Preview it free with no account. Downloading needs a free account, and your first download is watermark-free.

Only invoice for work you actually did or goods you actually supplied, at the price you agreed.

This is general information, not tax or legal advice. Check GOV.UK or ask an accountant about your own situation.`,
    faqs: [
      {
        q: "What does a sole trader need to put on an invoice in the UK?",
        a: "A unique number, your name and any business name, your address and contact details, the customer's name and address, a clear description, the supply date, the invoice date, the amounts charged and the total owed. If you use a business name, add an address where legal documents can be delivered.",
      },
      {
        q: "Can a sole trader invoice without a VAT number?",
        a: "Yes. Most sole traders are not VAT registered. Issue a normal invoice with no VAT on it. You cannot charge VAT or call it a VAT invoice until you are registered.",
      },
      {
        q: "Do I need to write 'not VAT registered' on my invoice?",
        a: "It is not a legal requirement, but many sole traders add it so business customers know why there is no VAT line.",
      },
      {
        q: "How long does a customer have to pay a sole trader invoice?",
        a: "Whatever you agree. If no payment date is agreed, GOV.UK says the customer must pay within 30 days of getting the invoice or the goods or service.",
      },
      {
        q: "Does a sole trader invoice need a company number?",
        a: "GOV.UK's list for sole traders does not include one. It asks for your own name, any business name you use, and an address where legal documents can be delivered.",
      },
    ],
  },
];
