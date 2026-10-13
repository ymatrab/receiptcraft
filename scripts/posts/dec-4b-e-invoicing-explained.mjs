/**
 * Day 2026-12-04, slot b (14:00Z). Elliot writer G.
 * Keyword gate (coordinator brief): "e-invoicing" (AI-citable explainer). Demand
 * evidence: Google autocomplete 2026-10-13; no makecepeit page ranks for it.
 * Angle: answer-first definition, formats, and a status table for the EU, UK and US as
 * of October 2026, from official sources only. Creation tie-in is honest: makecepeit
 * produces PDF/PNG invoices, which are not structured e-invoices.
 *   -> owner /templates/invoice
 *
 * Facts checked 2026-10-13:
 *   - European Commission, eInvoicing (Digital Building Blocks),
 *     https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eInvoicing :
 *     eInvoicing = structured electronic exchange of invoice data between supplier and
 *     buyer; Directive 2014/55/EU defines an electronic invoice as one issued,
 *     transmitted and received in a structured data format; European standard EN 16931
 *     (EN 16931-1:2017 semantic model, CEN/TS 16931-2:2017 list of syntaxes).
 *   - European Commission, Required syntaxes,
 *     https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/467108934/Required+syntaxes :
 *     the two syntaxes are UBL 2.1 invoice/credit note and UN/CEFACT Cross Industry
 *     Invoice (CII). Commission country pages (e.g. Luxembourg) describe Peppol BIS
 *     Billing 3.0 as the profile for e-invoices exchanged over the Peppol network.
 *   - European Commission, VAT invoicing,
 *     https://taxation-customs.ec.europa.eu/taxation/vat/vat-businesses/invoicing_en :
 *     electronic invoices are equivalent to paper invoices; may be issued if the
 *     recipient accepts; for B2G, public administrations must accept structured
 *     e-invoices.
 *   - European Commission, VAT in the Digital Age (ViDA),
 *     https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en :
 *     adopted 11 March 2025; in force 14 April 2025, from when member states are able to
 *     introduce mandatory e-invoicing under specific conditions; 1 July 2030 digital
 *     reporting requirements, real-time reporting for cross-border trade based on
 *     e-invoicing; 1 January 2035 deadline for national systems to align.
 *   - GOV.UK, "Promoting electronic invoicing across UK businesses and the public sector:
 *     consultation response" (updated 26 November 2025),
 *     https://www.gov.uk/government/consultations/promoting-electronic-invoicing-across-uk-businesses-and-the-public-sector/outcome/promoting-electronic-invoicing-across-uk-businesses-and-the-public-sector-consultation-response :
 *     mandatory e-invoicing for all VAT invoices from 2029, announced at Budget 2025;
 *     VAT invoices are typically B2B and B2G, not B2C; decentralised model; standard not
 *     yet chosen; roadmap to be published at Budget 2026.
 *   - Bureau of the Fiscal Service, Invoice Processing Platform,
 *     https://fiscal.treasury.gov/ipp/about.html : web-based, centralized program for
 *     federal agency invoicing from PO to payment notification, no cost to agencies and
 *     their vendors.
 *   - Federal Reserve FedPayments Improvement, Electronic Invoices,
 *     https://fedpaymentsimprovement.org/strategic-initiatives/payments-efficiency/electronic-invoices/ :
 *     Fed collaborated with the Business Payments Coalition on an e-invoice exchange
 *     framework; DBNAlliance established in 2023 to oversee it; businesses use a member
 *     service provider. The page states no mandate.
 * Deliberately left out: national EU mandates (e.g. Germany, France, Belgium) and any UK
 * start month, because they were not confirmed on an official page in this check. The
 * US row says no federal mandate for private B2B invoices was found on Treasury or
 * Federal Reserve pages, phrased as such. Sample invoice is fictional.
 */

export const DEC_4B_E_INVOICING_EXPLAINED = [
  {
    slug: "e-invoicing",
    image: "assets/e-invoicing.jpeg",
    category: "digital",
    publishedAt: "2026-12-04T14:00:00Z",
    title: "What Is E-Invoicing? Formats and Rules in the US, UK and EU",
    seoTitle: "What Is E-Invoicing? Formats and US, UK, EU Status",
    seoDescription:
      "E-invoicing is the exchange of invoice data in a structured format such as UBL. What it is, how it differs from a PDF, and where the US, UK and EU stand.",
    excerpt:
      "An e-invoice is invoice data a computer can read, not a PDF. Here is what that means, the formats and networks involved (EN 16931, UBL, Peppol), and where e-invoicing stands in the EU, UK and US as of late 2026.",
    body: `**E-invoicing is the exchange of invoice data between a seller and a buyer in a structured format that the buyer's software can read directly, without anyone retyping it. A PDF or a scanned paper invoice is not an e-invoice in this sense; an e-invoice is a data file, such as XML in the UBL format, usually sent through a network like Peppol. The EU and UK are moving toward making it mandatory for business invoices; the US has no general requirement.** For everyday billing where your client accepts a PDF, you can still make one with the [invoice template](/templates/invoice).

## What Counts as an E-Invoice

The European Commission describes [eInvoicing](https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eInvoicing) as the structured electronic exchange of invoice data between a supplier and a buyer. Directive 2014/55/EU, which covers public procurement, defines an electronic invoice as one issued, transmitted and received in a structured data format that allows automatic processing.

That rules out the documents most small businesses think of as "electronic":

| Document | Structured e-invoice? |
|---|---|
| PDF invoice sent by email | No. A person has to read it or software has to guess at it |
| Scanned or photographed paper invoice | No |
| Invoice typed into a customer's supplier portal | Partly. The data is structured, but you entered it by hand |
| UBL or CII XML file sent through Peppol or a similar network | Yes |
| Hybrid PDF with embedded XML (used in some countries) | Yes, the XML part is |

The word "electronic" is used more loosely in VAT law. The Commission's [VAT invoicing page](https://taxation-customs.ec.europa.eu/taxation/vat/vat-businesses/invoicing_en) says electronic invoices are equivalent to paper ones and can be issued if the recipient accepts them, while public administrations must accept structured e-invoices. When a rule says "e-invoice", check which meaning it uses.

## The Formats and Networks

- **EN 16931** is the European standard for e-invoicing. It defines the data an invoice carries (seller, buyer, lines, VAT, totals), not the file layout.
- **UBL 2.1 and UN/CEFACT CII** are the two XML syntaxes the Commission lists as [required syntaxes](https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/467108934/Required+syntaxes) for the standard. They carry the same information in different file structures.
- **Peppol** is a network for exchanging these documents. Commission country pages describe Peppol BIS Billing 3.0 as the profile used for e-invoices sent over it. You connect through an access point provider rather than building a link to each customer.

A simplified example of what changes: on a PDF, the invoice number is text somewhere on the page. In UBL it is a tagged field, so the buyer's system reads it without guessing.

| Field on a sample invoice | On a PDF | In a UBL e-invoice |
|---|---|---|
| Invoice number INV-2026-311 | Printed text | A tagged ID element |
| Issue date Dec 4, 2026 | Printed text | IssueDate, 2026-12-04 |
| Currency EUR | A € sign | DocumentCurrencyCode EUR |
| Seller VAT number | Printed text | A tagged tax scheme ID |
| Amount due €1,240.00 | Printed text | PayableAmount 1240.00 |

## Status by Region, October 2026

| Region | Where things stand | Official source |
|---|---|---|
| European Union | The VAT in the Digital Age package was adopted on 11 March 2025 and entered into force on 14 April 2025, from which point member states can introduce mandatory e-invoicing under specific conditions. From 1 July 2030, digital reporting requirements based on e-invoicing apply to cross-border trade between businesses. Member states with their own real-time reporting must align with the EU model by 1 January 2035. Public bodies must already accept structured e-invoices. | [European Commission, ViDA](https://taxation-customs.ec.europa.eu/taxation/vat/vat-digital-age-vida_en) |
| United Kingdom | The government has confirmed that all VAT invoices will need to be e-invoices from 2029, as announced at Budget 2025. VAT invoices are typically business-to-business and business-to-government, not consumer sales. A decentralised model is planned, the technical standard is not yet chosen, and a roadmap is due at Budget 2026. | [GOV.UK consultation response](https://www.gov.uk/government/consultations/promoting-electronic-invoicing-across-uk-businesses-and-the-public-sector/outcome/promoting-electronic-invoicing-across-uk-businesses-and-the-public-sector-consultation-response) |
| United States | We found no federal requirement for private businesses to use e-invoices on Treasury or Federal Reserve pages. Vendors to many federal agencies submit invoices through the Treasury's Invoice Processing Platform, which is free for agencies and their vendors. For business-to-business invoicing, the Federal Reserve worked with the Business Payments Coalition on a voluntary exchange framework now overseen by the DBNAlliance. | [Fiscal Service IPP](https://fiscal.treasury.gov/ipp/about.html), [FedPayments Improvement](https://fedpaymentsimprovement.org/strategic-initiatives/payments-efficiency/electronic-invoices/) |

Individual EU countries set their own national timetables within the EU framework, and some already require e-invoices for domestic business sales. If you sell in a specific EU country, check that country's tax authority for its dates.

## What This Means for a Small Business

- **US sellers billing US clients:** nothing changes unless a customer, such as a large company or a federal agency, asks you to invoice through its portal or network.
- **Selling to EU or UK businesses:** your customer may ask for a structured e-invoice as their country's rules take effect. Ask early what format and network they need.
- **UK VAT-registered businesses:** watch for the roadmap at Budget 2026; it should say when the 2029 requirement starts and which standard applies.
- **Everyone:** the data an e-invoice needs is the same data a good invoice already carries. Clean invoice numbers, dates, VAT IDs and totals make the switch easier.

## Where a PDF Still Fits

Most US small businesses, and many international clients today, still accept a PDF invoice. You can build one in the browser with the [invoice template](/templates/invoice): add your business, the client, line items, tax and the amount due, then preview it free with no account. Downloading takes a free account, and your first download is watermark-free. It produces a PDF or image, not a UBL file, so where a structured e-invoice is required, use your accounting software or a Peppol access point provider instead.

Whatever format you use, an invoice must describe a real sale. This is general information, not tax advice; check the official guidance for your country before relying on it.`,
    faqs: [
      {
        q: "What is e-invoicing?",
        a: "Sending invoice data from seller to buyer in a structured format, such as UBL XML, that the buyer's software can process automatically. A PDF emailed to a client is not an e-invoice in this sense.",
      },
      {
        q: "Is a PDF invoice an e-invoice?",
        a: "Not under the structured definition in EU Directive 2014/55/EU, which requires an invoice issued, transmitted and received in a structured data format. Some VAT rules use 'electronic invoice' more loosely, so check which meaning applies.",
      },
      {
        q: "What is Peppol?",
        a: "A network for exchanging e-invoices and other business documents. Businesses connect through an access point provider, and the European Commission's country pages describe Peppol BIS Billing 3.0 as the profile used on it.",
      },
      {
        q: "When does e-invoicing become mandatory in the UK?",
        a: "The UK government has confirmed mandatory e-invoicing for all VAT invoices from 2029, announced at Budget 2025. A roadmap with the details is due at Budget 2026.",
      },
      {
        q: "Is e-invoicing mandatory in the United States?",
        a: "We found no federal requirement for private businesses on Treasury or Federal Reserve pages. Federal agencies use Treasury's Invoice Processing Platform, and a voluntary business-to-business framework is overseen by the DBNAlliance.",
      },
    ],
  },
];
