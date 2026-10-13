/**
 * Day 2026-11-28, slot b (14:00Z). Writer I (Elliot writers, UK batch).
 * Keyword gate (coordinator brief, Google autocomplete gl=uk, 2026-10-13):
 *   "credit note", "credit note vat", "credit note vs debit note"
 *   -> owner /templates/vat-receipt; links /blog/vat-invoice-requirements-uk (Nov 16),
 *      /blog/what-is-a-refund-receipt, /blog/credit-receipt-vs-refund-receipt
 * Angle: what a UK credit note is, the HMRC conditions and required fields for a credit note
 * that adjusts VAT, a worked example against a VAT invoice, credit vs debit note.
 * Product check (origin/main, 2026-10-13 + coordinator correction): there is NO credit note
 * template and the builder CANNOT change the document heading, so the post does not tell
 * readers to retitle a template. It links /templates/vat-receipt only for the original VAT
 * invoice / VAT receipt, and says plainly there is no credit note template.
 *
 * Facts checked 2026-10-13:
 *   - HMRC, VAT guide (VAT Notice 700), https://www.gov.uk/guidance/vat-guide-notice-700 :
 *     18.2.1 where the customer can reclaim all the tax, supplier and customer may agree not to
 *     adjust the original VAT charge; otherwise both should adjust, normally by a credit note.
 *     18.2.3 valid credit note must reflect a genuine mistake or overcharge or an agreed
 *     reduction in the value of the supply, and be issued within 14 days of the refund
 *     payment being made to the customer; give value to the customer (refund or offset);
 *     show identifying number and date of issue; supplier name, address, registration number;
 *     customer name and address; description of goods/services credited; quantity and amount
 *     for each description; total credited excluding VAT; rate and amount of VAT credited in
 *     sterling; number and date of the original VAT invoice(s), or otherwise satisfy HMRC.
 *     Credit notes without a VAT adjustment should state "This is not a credit note for VAT";
 *     records of outputs and inputs must still be adjusted. 18.2.4 debit notes: genuine
 *     mistake, undercharge or agreed increase; issued within 14 days of the increase being
 *     agreed; number and date, supplier and customer details, original invoice number and
 *     date, description, increase excluding VAT, rate and amount of VAT debited.
 *   - GOV.UK, Charge, reclaim and record VAT, https://www.gov.uk/charge-reclaim-record-vat :
 *     returns: settle by replacement invoice or credit/debit note; keep originals; exchange
 *     for goods of the same value needs no new VAT invoice; credit/debit note includes same
 *     information as the VAT invoice, reason, total credited excluding VAT, number and date of
 *     original invoice; keep copies of cancelled sales invoices; supplier errors: ask for a
 *     corrected invoice.
 *   - HMRC, Record keeping (VAT Notice 700/21),
 *     https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021 : 2.3 credit or debit
 *     notes issued or received are business records; 2.4 keep at least 6 years.
 * Sample businesses and amounts are fictional.
 */

export const NOV_28B_CREDIT_NOTE_UK = [
  {
    slug: "credit-note-uk",
    image: "assets/credit-note-uk.jpeg",
    category: "small-business",
    publishedAt: "2026-11-28T14:00:00Z",
    title: "Credit Note (UK): What It Is and How to Issue One Against a VAT Invoice",
    seoTitle: "Credit Note UK: How to Issue One Against a VAT Invoice",
    seoDescription:
      "What a credit note is, what HMRC says it must show to adjust VAT, the 14-day rule, a worked example against a VAT invoice, and credit note vs debit note.",
    excerpt:
      "A credit note reduces what a customer owes on an invoice you have already issued. Here is what HMRC says a VAT credit note must show, when you can issue one, a worked example, and how it differs from a debit note.",
    body: `**A credit note is a document a supplier issues to reduce, or cancel, the amount charged on an invoice already sent, for example after a return, an overcharge or an agreed discount. In the UK, a credit note that adjusts VAT must reflect a genuine mistake, overcharge or agreed reduction, quote the number and date of the original VAT invoice, and show the amount credited excluding VAT plus the VAT rate and VAT credited in sterling.** It sits alongside the original [VAT invoice or receipt](/templates/vat-receipt) rather than replacing it.

The requirements below are from HMRC's [VAT guide (Notice 700)](https://www.gov.uk/guidance/vat-guide-notice-700), section 18.2, and GOV.UK's guidance on [charging and recording VAT](https://www.gov.uk/charge-reclaim-record-vat). For what the original invoice must contain, see [VAT invoice requirements in the UK](/blog/vat-invoice-requirements-uk).

## When you issue a credit note

GOV.UK says that when goods come back from a customer, you settle the balance with either a replacement invoice or a credit or debit note. The usual triggers are:

- the customer returns some or all of the goods
- you made a mistake on the invoice and overcharged
- you agree a price reduction after the sale, for example for a fault
- a prompt payment discount is taken up

If the customer simply swaps goods for others of the same value, GOV.UK says you do not need a new VAT invoice.

Do not delete or edit the original invoice. Keep it, including any you cancel, and let the credit note do the correcting. HMRC counts credit and debit notes as business records you must keep for at least 6 years.

## What a VAT credit note must show

For the credit note to be valid for VAT, Notice 700 says it must give the customer a genuine entitlement to the amount, as a refund or an offset against future supplies, and show:

| Field | Notes |
|---|---|
| Identifying number and date of issue | Use your own credit note series, such as CN-0007 |
| Supplier's name, address and VAT registration number | The same details as on your invoice |
| Customer's name and address | |
| Description of what is being credited | Enough to identify the goods or services |
| Quantity and amount for each description | |
| Total amount credited, excluding VAT | |
| Rate and amount of VAT credited | The VAT must be shown in sterling |
| Number and date of the original VAT invoice | If returned goods cannot be tied to one invoice, you must be able to satisfy HMRC another way |

GOV.UK's shorter version adds one more thing worth including: the reason the credit note was issued.

## The 14-day rule

Notice 700 says a credit note must be issued within 14 days of the refund payment being made to the customer. In practice, issue the credit note at the same time as you refund or agree the reduction, so both sides adjust their VAT in the same period.

## When the VAT is not adjusted

If your customer can reclaim all the VAT, you and they can agree not to adjust the original VAT charge. HMRC says a credit note issued without a VAT adjustment should state "This is not a credit note for VAT". You still adjust your records of sales and purchases for the VAT return.

## Worked example

Fenwick Office Supplies (a sample business) invoices a VAT-registered design studio for ten office chairs on invoice INV-0412, dated 3 November 2026:

| Original invoice INV-0412 | Amount |
|---|---|
| 10 office chairs at £120.00 | £1,200.00 |
| VAT at 20% | £240.00 |
| **Total** | **£1,440.00** |

Two chairs arrive damaged and go back. Fenwick refunds the studio and issues a credit note the same day:

| Credit note CN-0007, 12 November 2026 | Amount |
|---|---|
| 2 office chairs at £120.00, returned damaged | £240.00 |
| VAT at 20% | £48.00 |
| **Total credited** | **£288.00** |

The credit note also shows Fenwick's name, address and VAT number, the studio's name and address, and "Relates to invoice INV-0412 dated 3 November 2026". Fenwick reduces its output VAT by £48 and the studio reduces the input VAT it reclaims by £48. Net of the credit, the sale is now £960.00 plus £192.00 VAT.

## Common mistakes

- **No link to the original invoice.** Without the original invoice's number and date, the credit note is hard to match, and HMRC expects you to show which supply it relates to.
- **Crediting the gross figure only.** Show the amount excluding VAT and the VAT credited separately, with the rate, so both sides can adjust their VAT returns.
- **Reusing invoice numbers.** Give credit notes their own numbered series so every document stays unique.
- **Issuing a credit note with no refund or offset behind it.** HMRC says it must give the customer a genuine entitlement to the money, either back or against future supplies.
- **Waiting.** Notice 700 ties the credit note to 14 days after the refund, so do the paperwork when you pay the money back.

## Credit note vs debit note

A debit note works the other way: it increases the amount on an invoice.

| | Credit note | Debit note |
|---|---|---|
| Effect | Reduces the amount charged | Increases the amount charged |
| Typical reason | Return, overcharge, agreed reduction | Undercharge, agreed increase |
| Issued within | 14 days of the refund payment | 14 days of the increase being agreed |
| Links to | The original VAT invoice's number and date | The original VAT invoice's number and date |
| VAT shown | Rate and amount of VAT credited | Rate and amount of VAT debited |

Both must quote the original invoice.

## Credit notes, refund receipts and store credit

A credit note is a business-to-business accounting document. When a shop refunds a member of the public, the customer usually gets a refund receipt instead; see [what a refund receipt is](/blog/what-is-a-refund-receipt), and the difference between [a credit receipt and a refund receipt](/blog/credit-receipt-vs-refund-receipt) for store credit.

## Making the documents

makecepeit does not have a credit note template, and its documents keep their own heading, so we would not suggest dressing a receipt up as one. If you use accounting software, check whether it can issue numbered credit notes that quote the original invoice, which covers the rules above. What you can make here is the original sale document: the [VAT receipt template](/templates/vat-receipt) starts in pounds with VAT at 20% and a VAT number field. Building and previewing need no account; downloading needs a free account, and your first download is watermark-free.

Only issue a credit note for a real return, error or agreed reduction, and keep it with the original invoice.

This is general information, not tax advice. For your own business, follow HMRC's current guidance or ask an accountant.`,
    faqs: [
      {
        q: "What is a credit note in the UK?",
        a: "A document a supplier issues to reduce or cancel the amount charged on an invoice already sent, for example after a return, an overcharge or an agreed discount.",
      },
      {
        q: "What must a VAT credit note show?",
        a: "Its number and date, the supplier's name, address and VAT number, the customer's name and address, a description, the quantity and amount for each item, the total credited excluding VAT, the VAT rate and amount credited in sterling, and the number and date of the original VAT invoice.",
      },
      {
        q: "How soon must a credit note be issued?",
        a: "HMRC's VAT guide says a credit note must be issued within 14 days of the refund payment being made to the customer.",
      },
      {
        q: "What is the difference between a credit note and a debit note?",
        a: "A credit note reduces the amount charged on an invoice; a debit note increases it, for example after an undercharge. Both must quote the original VAT invoice.",
      },
      {
        q: "Can I just edit or delete the original invoice instead?",
        a: "No. GOV.UK says to keep copies of all sales invoices, even cancelled ones. Corrections are made with a replacement invoice or a credit or debit note.",
      },
    ],
  },
];
