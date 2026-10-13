/**
 * Day 2026-11-16, slot b (14:00Z). Writer I (Elliot writers, UK batch).
 * Keyword gate (coordinator brief, Google autocomplete gl=uk, 2026-10-13):
 *   "vat invoice requirements uk", "vat invoice requirements hmrc"
 *   -> owner /templates/vat-receipt (live on main since 2026-10-05, commit d0f0f18);
 *      links /blog/vat-receipt-explained (UK/EU general post, Jul 2026), /blog/invoice-number
 * Angle: the UK-only, field-by-field version of the general VAT receipt post. Full vs
 * simplified vs modified VAT invoice, the £250 line, the 30-day rule, a worked example.
 * Product check (origin/main, 2026-10-13): vat-receipt template defaults are currency GBP,
 * taxLabel VAT, taxRate 20, a "VAT details" rows block (VAT Reg No, Tax point); detail rows
 * are add/editable in SectionBuilder.tsx (label + value); tax lines have editable rates.
 *
 * Facts checked 2026-10-13:
 *   - HMRC, Record keeping (VAT Notice 700/21),
 *     https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021 :
 *     3.1 only VAT-registered businesses can issue VAT invoices; must issue one when supplying
 *     standard or reduced rate goods/services to another VAT-registered person; normally
 *     within 30 days of the supply. 4.1 full list (sequential number, time of supply, date of
 *     issue if different, supplier name/address/VAT number, customer name/address,
 *     description, per description quantity/extent + rate + amount excl. VAT, gross total
 *     excl. VAT, rate of any cash discount, total VAT in sterling, unit price). 4.4/4.5: up to
 *     £250 incl. VAT a simplified invoice (name, address, VAT number, time of supply,
 *     description, per rate total incl. VAT and rate; no exempt supplies); over £250 a full
 *     VAT invoice or a modified VAT invoice showing VAT-inclusive values. 4.4 retailers need
 *     not issue a VAT invoice unless asked. 4.6 exceptions (self-billing, gifts, margin
 *     schemes, only exempt or zero-rated sales). 2.4 keep VAT records at least 6 years.
 *   - HMRC, VAT guide (VAT Notice 700), https://www.gov.uk/guidance/vat-guide-notice-700 :
 *     16.3.1 trading name allowed but registered name and address must appear somewhere;
 *     amounts may be in any currency but total VAT in sterling; 16.3.2 unit price applies to
 *     countable goods/services (e.g. hourly rate); 16.4 foreign-currency invoices convert
 *     total VAT to sterling; 16.6.1 simplified invoice needs the customer's agreement;
 *     16.6.2 full VAT invoice if more than £250 or if the customer requests one;
 *     17.3 pro forma invoices cannot be used to reclaim input tax, mark "this is not a VAT
 *     invoice".
 *   - GOV.UK, Charge, reclaim and record VAT, https://www.gov.uk/charge-reclaim-record-vat :
 *     cannot reclaim VAT using an invalid invoice, a pro-forma invoice, a statement or a
 *     delivery note; keep copies of all sales invoices even if cancelled.
 *   - GOV.UK, Register for VAT, https://www.gov.uk/register-for-vat : threshold £90,000.
 * VAT number in the example is a placeholder (GB 000 0000 00). Business and amounts fictional.
 */

export const NOV_16B_VAT_INVOICE_REQUIREMENTS_UK = [
  {
    slug: "vat-invoice-requirements-uk",
    image: "assets/vat-invoice-requirements-uk.jpeg",
    category: "taxes",
    publishedAt: "2026-11-16T14:00:00Z",
    title: "VAT Invoice Requirements in the UK: What HMRC Says Must Be on It",
    seoTitle: "VAT Invoice Requirements UK: HMRC Checklist",
    seoDescription:
      "What a UK VAT invoice must show under HMRC rules: the full list, simplified invoices up to £250, modified invoices, the 30-day rule and an example.",
    excerpt:
      "HMRC sets out exactly what a VAT invoice must show. Here is the full list, when a simplified invoice up to £250 is enough, what a modified invoice is, and a worked example you can copy.",
    body: `**A full UK VAT invoice must show a unique sequential number, the time of supply, your name, address and VAT registration number, your customer's name and address, a description of each item with its quantity, unit price, VAT rate and net amount, and the total VAT in sterling. For sales of £250 or less including VAT you can issue a simplified invoice instead, which needs fewer details. Only VAT-registered businesses can issue VAT invoices, and you normally have 30 days from the supply to send one.** To make one now, open the [VAT receipt and invoice builder](/templates/vat-receipt): it starts in pounds with VAT at 20%, and you add your own VAT number.

The rules below come from HMRC's [Record keeping (VAT Notice 700/21)](https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021) and the main VAT guide, Notice 700, as published on GOV.UK. For the general picture across the UK and EU, see [what makes a receipt VAT-valid](/blog/vat-receipt-explained).

## Who has to issue a VAT invoice

HMRC's rule is short. If you are VAT registered and you supply standard-rated or reduced-rated goods or services to another VAT-registered business, you must give them a VAT invoice. Your customer needs it as evidence to reclaim the VAT you charged them.

You do not have to issue one when:

- your customer runs a self-billing arrangement
- you are giving away goods on which VAT is due
- you sell under a second-hand margin scheme (those have their own invoice rules)
- the invoice covers only exempt or zero-rated sales within the UK

Retailers selling to the public can assume no VAT invoice is needed unless the customer asks for one. In practice that means any customer who asks, since you usually cannot tell who is VAT registered.

If you are not VAT registered, you cannot issue a VAT invoice or charge VAT at all. Registration becomes compulsory once your taxable turnover goes over [£90,000 in a rolling 12 months](https://www.gov.uk/register-for-vat).

## The full VAT invoice: every field

| Field | What HMRC asks for |
|---|---|
| Invoice number | A sequential number from one or more series that uniquely identifies the invoice |
| Time of supply | The tax point, which decides which VAT return the sale belongs to |
| Date of issue | Only if it differs from the time of supply |
| Your details | Name, address and VAT registration number. A trading name is fine, but the name and address you registered under must appear somewhere |
| Customer | Their name and address |
| Description | Enough to identify the goods or services |
| Per line | Quantity or extent, unit price, VAT rate and the amount excluding VAT |
| Totals | Gross total excluding VAT, the rate of any cash discount offered, and the total VAT |

Two details trip people up. First, the unit price applies to anything countable, which for services usually means an hourly or day rate. If the work cannot be broken into units, the VAT-exclusive price is the unit price. Second, the line amounts can be in any currency, but **the total VAT must be shown in sterling**. If you invoice a UK customer in euros, convert the VAT total to pounds on the invoice.

A good numbering system matters more than it looks. HMRC wants every invoice to be traceable, and you must keep copies of all sales invoices you issue, including ones you cancel. Our guide to [invoice numbers](/blog/invoice-number) covers formats that stay sequential.

## The simplified VAT invoice (£250 or less)

If the total of the supply is £250 or less including VAT, and your customer agrees, you can issue a simplified invoice. It needs only:

1. Your name, address and VAT registration number
2. The time of supply
3. A description that identifies the goods or services
4. For each VAT rate, the total amount payable including VAT, and the rate

There is no customer name, no invoice number requirement and no separate VAT figure. Exempt supplies cannot go on a simplified invoice. Most till receipts from VAT-registered shops are simplified invoices for this reason, and so is the [VAT receipt template](/templates/vat-receipt) when the sale is under the limit.

If the customer asks for a full VAT invoice, you have to give them one even under £250.

## The modified VAT invoice (over £250)

Above £250, HMRC gives you two options: a full VAT invoice, or a modified VAT invoice. The modified version carries the same information as a full invoice but shows VAT-inclusive values instead of VAT-exclusive ones. Retailers who price everything including VAT tend to use it, because the figures match the shelf price. You still show the VAT rate and the VAT total.

## Worked example

Harbour Print Co (a sample business) prints 2,000 flyers and does three hours of design work for a café that is also VAT registered. The total is over £250, so a full VAT invoice is required.

| Description | Qty | Unit price | VAT rate | Net |
|---|---|---|---|---|
| A5 flyers, full colour | 2,000 | £0.09 | 20% | £180.00 |
| Flyer design | 3 hours | £45.00 | 20% | £135.00 |
| **Total excluding VAT** | | | | **£315.00** |
| **VAT at 20%** | | | | **£63.00** |
| **Total payable** | | | | **£378.00** |

Above the table sit the invoice number (HPC-0158), the date of supply, Harbour Print Co's address and VAT number (shown here as GB 000 0000 00), and the café's name and address.

Had the café bought a single £96 order of business cards instead, a simplified invoice would do: supplier details, VAT number, date, "500 business cards", the total of £96.00 and the rate, 20%. The VAT inside it is £16.00, which is the VAT fraction of one sixth for a 20% rate.

## Timing: the 30-day rule

You should normally issue a VAT invoice within 30 days of the tax point. Notice 700 lists a few cases where you can go beyond that without asking HMRC, such as when you are waiting for invoices from your own subcontractors, or when you are newly registered and still waiting for your VAT number. Otherwise you need HMRC's agreement in writing.

## Documents that are not VAT invoices

GOV.UK is clear that you cannot reclaim VAT using a pro forma invoice, a statement or a delivery note. A pro forma should say "this is not a VAT invoice", and you issue the real VAT invoice once you supply the goods or get paid. If a supplier sends you an invoice with the wrong amount, ask them for a corrected one. Corrections after the event are made with a credit or debit note.

## How to make one in the builder

1. Open the [VAT receipt template](/templates/vat-receipt). It is already set to pounds, with VAT at 20% and a "VAT details" block.
2. Replace the sample business name and address with yours, and put your VAT number in the "VAT Reg No" row.
3. For a full invoice, add rows to the same block for the invoice number, the date of supply and the customer's name and address.
4. Enter each line at its net price with the quantity, and set the tax line to VAT at 20%, 5% or 0%. The VAT and total calculate themselves.
5. Preview it free with no account. Downloading the PDF or PNG needs a free account, and your first download is watermark-free.

Only issue a VAT invoice for a real sale you made while VAT registered, with your own VAT number. Keep a copy: VAT records must be kept for at least 6 years.

This is general information, not tax advice. For your own business, follow HMRC's current guidance or ask an accountant.`,
    faqs: [
      {
        q: "What must a VAT invoice include in the UK?",
        a: "A unique sequential number, the time of supply, your name, address and VAT number, the customer's name and address, a description of each item with quantity, unit price, VAT rate and net amount, the total excluding VAT, and the total VAT in sterling.",
      },
      {
        q: "What is the £250 rule for VAT invoices?",
        a: "If a sale is £250 or less including VAT and the customer agrees, you can issue a simplified VAT invoice showing your details, VAT number, date, a description, and for each rate the VAT-inclusive total and the rate.",
      },
      {
        q: "What is a modified VAT invoice?",
        a: "For sales over £250, HMRC allows a modified VAT invoice as an alternative to a full one. It contains the same information but shows VAT-inclusive values instead of VAT-exclusive values.",
      },
      {
        q: "How long do I have to issue a VAT invoice?",
        a: "Normally within 30 days of the tax point. HMRC's VAT guide allows longer in a few listed cases, such as waiting for your own subcontractors' invoices; otherwise you need HMRC's agreement.",
      },
      {
        q: "Can I issue a VAT invoice if I'm not VAT registered?",
        a: "No. Only VAT-registered businesses can issue VAT invoices or charge VAT. If you are not registered, issue an ordinary invoice with no VAT on it.",
      },
    ],
  },
];
