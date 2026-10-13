/**
 * Day 2026-12-10, slot a (09:30Z). Elliot writer G.
 * Keyword gate (coordinator brief): "invoice international clients". Demand evidence:
 * Google autocomplete 2026-10-13; no makecepeit page ranks for it. Creation intent: a
 * freelancer or small business writing an invoice to a client abroad.
 *   -> owner /templates/invoice; links /blog/commercial-invoice (Nov 10)
 *
 * Product check (2026-10-13): lib/format.ts CURRENCIES = USD, EUR, GBP, CAD, AUD, INR,
 * JPY, AED, SAR, MAD (10 currencies); the builder has a currency selector
 * (components/builder/SectionBuilder.tsx) and an editable tax label and rate; business
 * details include a "Tax ID / VAT / GST" field. Per coordinator correction (verified on
 * main), the post does not tell readers to retitle the document; it uses line items,
 * labels, business details, Invoice ID and notes only.
 *
 * Facts checked 2026-10-13:
 *   - HMRC, VAT Notice 741A Place of supply of services,
 *     https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a :
 *     sec. 6.3 the B2B general rule is that the supply is made where the customer
 *     belongs; when that is outside the UK no UK VAT is due (secs 1.4, 2.2), subject to
 *     exceptions in sec. 6.4 (e.g. land-related services, admission to events, use and
 *     enjoyment); keep commercial evidence the customer is in business and belongs
 *     abroad, a VAT number being good evidence for EU customers (secs 2.2-2.4); sec. 2.3
 *     invoices should describe the services clearly. The notice prescribes no invoice
 *     wording for these supplies, so "Outside the scope of UK VAT" is labelled common
 *     practice.
 *   - European Commission, VAT invoicing,
 *     https://taxation-customs.ec.europa.eu/taxation/vat/vat-businesses/invoicing_en :
 *     where the customer is liable for the VAT, the invoice must show the customer's VAT
 *     identification number and the words "reverse charge".
 *   - Your Europe, Cross-border VAT,
 *     https://europa.eu/youreurope/business/taxation/vat/cross-border-vat/index_en.htm :
 *     selling services to businesses in another EU country, you usually do not charge
 *     VAT; the customer pays VAT in their country under the reverse charge; important
 *     exceptions exist.
 * Bank details (IBAN, SWIFT/BIC, intermediary bank) are given as common practice with
 * "ask your bank for the exact details"; no claim about which countries issue IBANs.
 * Not stated: exchange-rate rules for VAT invoices, US state rules, FX fees. Sample
 * freelancer, client and figures are fictional.
 */

export const DEC_10A_INVOICE_INTERNATIONAL_CLIENTS = [
  {
    slug: "invoice-international-clients",
    image: "assets/invoice-international-clients.jpeg",
    category: "small-business",
    publishedAt: "2026-12-10T09:30:00Z",
    title: "How to Invoice International Clients: Currency, Bank Details and VAT",
    seoTitle: "How to Invoice International Clients: Currency and VAT",
    seoDescription:
      "How to invoice a client in another country: choosing the currency, an exchange-rate note, IBAN and SWIFT details, and the UK and EU reverse-charge rules.",
    excerpt:
      "Invoicing a client abroad means a few extra fields: the currency, how you will be paid across borders, and a VAT note if the client is a business in the UK or EU. Here is what to add, with a worked example.",
    body: `**To invoice an international client, use your normal invoice and add four things: the currency the client will pay in, an exchange-rate note if you quote in another currency, payment details that work across borders (such as SWIFT/BIC and IBAN for a bank transfer), and a VAT note where one applies, such as "reverse charge" with the client's VAT number for a business client in the EU.** Agree the currency and payment method before you send it. You can build one in the browser with the [invoice template](/templates/invoice), which has a currency selector with ten currencies including USD, EUR and GBP.

## What Changes on an International Invoice

| Field | Domestic invoice | International invoice |
|---|---|---|
| Currency | Assumed | Stated by code, e.g. USD, EUR, GBP |
| Client details | Name and address | Plus country and, for businesses, their VAT or tax ID |
| Your tax ID | Sometimes | Usually, especially if you are VAT-registered |
| Payment details | Account and routing number, or a link | SWIFT/BIC, IBAN where used, or an international payment link |
| Tax line | Sales tax if applicable | Often no tax, with a note explaining why |
| Description | Brief | Clear enough to show what the service was and where it was used |
| Due date and fees | Terms | Terms, plus who pays transfer fees |

If you are shipping physical goods across a border, you will also need a [commercial invoice](/blog/commercial-invoice) for customs. This guide is about billing for services and the payment side.

## Choosing the Currency

You have three common options:

- **Bill in your own currency.** You know exactly what you will receive, but the client carries the exchange risk.
- **Bill in the client's currency.** Easier for the client to approve and pay, but what lands in your account depends on the rate on the day.
- **Bill in a third currency both sides use,** such as USD or EUR for many cross-border contracts.

Whichever you pick, write the currency code next to the total, not only a symbol. "$" means different things in the US, Canada and Australia. If you quoted in one currency and invoice in another, add a short exchange-rate note, for example: "Converted from USD 2,400.00 at 1 USD = 0.92 EUR, rate as of Dec 1, 2026." That line ends the "why is this different from the quote?" email before it starts.

## Payment Details That Work Across Borders

For a bank transfer, ask your bank exactly what an overseas payer needs. Commonly that is:

- **Account name**, exactly as the bank holds it
- **Bank name and address**
- **SWIFT/BIC code** of your bank
- **IBAN**, if your account has one, or your account number and any domestic bank code
- **Intermediary bank details**, if your bank uses one for incoming international wires
- **A payment reference**, normally the invoice number

Also say who pays transfer fees. Fees can be taken by sending, intermediary and receiving banks, so a $2,000 invoice can arrive as less. A line such as "All bank charges to be paid by the sender" sets the expectation; whether it holds depends on your agreement and the transfer type. Many freelancers offer a card or online payment link as well, which can be simpler for the client.

## VAT: The UK and EU Business-Client Notes

This is the part people get wrong, and the rules depend on where you are and who the client is. The cases below cover services to business clients only.

**You are a UK business billing a business client abroad.** HMRC's [VAT Notice 741A](https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a) says the general rule for business-to-business services is that the supply is made where the customer belongs. If that is outside the UK, no UK VAT is charged, with exceptions such as land-related services and admission to events. Keep evidence that the customer is a business based abroad; for an EU customer, HMRC says a VAT number is good evidence. HMRC does not prescribe wording, but many suppliers add a note such as "Outside the scope of UK VAT" and describe the service clearly.

**You are an EU business billing a business client in another EU country.** [Your Europe](https://europa.eu/youreurope/business/taxation/vat/cross-border-vat/index_en.htm) says you usually do not charge VAT; the customer accounts for it in their own country under the reverse charge. The European Commission's [VAT invoicing rules](https://taxation-customs.ec.europa.eu/taxation/vat/vat-businesses/invoicing_en) say that where the customer is liable for the VAT, the invoice must show the customer's VAT identification number and the words "reverse charge".

**You are a US business billing a client in the UK or EU.** Your client's country decides how its own VAT applies to services it buys from abroad. Ask the client what they need on the invoice, which is often their VAT number and your full business details.

All three have exceptions, and consumer clients follow different rules. If VAT is a real amount for you, check with the tax authority or an accountant.

## Worked Example

Nora Price Design (fictional), a US freelance designer, invoices Haverly GmbH (fictional), a business client in Berlin, for a brand refresh. They agreed to bill in euros.

| Line | Amount (EUR) |
|---|---|
| Brand guidelines, 24-page PDF | €1,200.00 |
| Logo refinement, 3 variants | €650.00 |
| Social media template set, 12 designs | €480.00 |
| **Total due (EUR)** | **€2,330.00** |

Notes on the invoice:

- Invoice INV-2026-087, issued Dec 10, 2026, due Jan 9, 2027 (Net 30).
- Client: Haverly GmbH, Berlin, Germany, VAT ID as supplied by the client.
- Payment by SWIFT transfer to the account below; reference INV-2026-087. All bank charges to be paid by the sender.
- No sales tax charged by the supplier. VAT, if any, to be accounted for by the customer.

Each line describes a real deliverable, and the total is the sum of the lines.

## How to Make It on makecepeit

1. Open the [invoice template](/templates/invoice) and choose the currency in the settings.
2. Enter your business details, including your tax or VAT ID if you have one, and the client's name, address and country.
3. Add one line per service with a clear description.
4. Remove or relabel the tax line to match your situation, for example a VAT line at 0% with a note, or no tax line at all.
5. Use your invoice ID, and put the exchange-rate note, bank details, fee note and any VAT wording in the notes.
6. Preview it free with no account. Downloading takes a free account, and your first download is watermark-free.

Invoice only for work you actually delivered, at the price you agreed. This is general information, not tax advice; VAT and tax treatment depend on where you and your client are based.`,
    faqs: [
      {
        q: "What currency should I invoice an international client in?",
        a: "The one you agreed in advance. Billing in your own currency protects you from exchange-rate swings; billing in the client's currency is easier for them. Always write the currency code next to the total.",
      },
      {
        q: "What bank details do I put on an invoice for a client abroad?",
        a: "Usually the account name, bank name and address, your bank's SWIFT/BIC code, and your IBAN if your account has one, plus a payment reference. Ask your bank for the exact details an overseas payer needs.",
      },
      {
        q: "Do I charge VAT to a business client in another country?",
        a: "Often not. HMRC says business services are generally supplied where the customer belongs, so a UK supplier usually charges no UK VAT to an overseas business client. Within the EU, the business customer usually accounts for VAT under the reverse charge.",
      },
      {
        q: "What does 'reverse charge' mean on an invoice?",
        a: "That the customer, not the supplier, accounts for the VAT. The European Commission says an invoice where the customer is liable for VAT must show the words 'reverse charge' and the customer's VAT number.",
      },
    ],
  },
];
