/**
 * Day 2026-12-02, slot b (14:00Z). Writer I (Elliot writers, UK batch).
 * Keyword gate (coordinator brief, Google autocomplete gl=uk, 2026-10-13):
 *   "how long to keep receipts uk", "how long to keep business records uk hmrc"
 *   -> owner /blog/how-long-to-keep-receipts (US/IRS version, Jul 2026) is linked as the
 *      US counterpart; builder link /create; links /blog/vat-invoice-requirements-uk,
 *      /blog/cis-invoice-uk, /blog/self-employed-receipt-tracking
 * Angle: UK retention periods by taxpayer type with dated examples, in one table.
 * Product check: /create is the builder entry; no product feature beyond issuing documents
 * is claimed (no storage/archive feature claimed).
 *
 * Facts checked 2026-10-13:
 *   - GOV.UK, Business records if you're self-employed: how long to keep your records,
 *     https://www.gov.uk/self-employed-records/how-long-to-keep-your-records : at least 5 years
 *     after the 31 January submission deadline of the relevant tax year; example 2022-23
 *     return by 31 January 2024 -> keep until at least end of January 2029; return sent more
 *     than 4 years after the deadline -> keep 15 months after sending.
 *   - GOV.UK, Business records if you're self-employed: what records to keep,
 *     https://www.gov.uk/self-employed-records/what-records-to-keep : sales and income,
 *     expenses, VAT records, PAYE records, personal income; proof includes receipts for goods
 *     and stock, bank statements, chequebook stubs, sales invoices, till rolls, bank slips.
 *   - GOV.UK, Keeping your pay and tax records: how long to keep your records,
 *     https://www.gov.uk/keeping-your-pay-tax-records/how-long-to-keep-your-records : on-time
 *     return -> at least 22 months after the end of the tax year (example 2024-25 return by
 *     31 January 2026 -> until at least end of January 2027); late -> 15 months after sending.
 *   - GOV.UK, Running a limited company: company and accounting records,
 *     https://www.gov.uk/running-a-limited-company/company-and-accounting-records : 6 years from
 *     the end of the last company financial year they relate to, or longer if a transaction
 *     covers more than one accounting period, an asset is expected to last more than 6 years,
 *     the Company Tax Return was late, or HMRC has started a compliance check; fine £3,000 or
 *     director disqualification for not keeping accounting records.
 *   - HMRC, Record keeping (VAT Notice 700/21),
 *     https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021 : 2.4 at least 6 years;
 *     HMRC may allow shorter if serious storage problems; 2.1 no set way to keep records.
 *   - GOV.UK, Charge, reclaim and record VAT, https://www.gov.uk/charge-reclaim-record-vat :
 *     VAT bad debt relief records kept 4 years after the claim (10 years if VAT MOSS used).
 *   - GOV.UK, CIS contractor record keeping,
 *     https://www.gov.uk/what-you-must-do-as-a-cis-contractor/record-keeping : at least 3 years
 *     after the end of the tax year; fine up to £3,000.
 *   - GOV.UK, Self Assessment deadlines, https://www.gov.uk/self-assessment-tax-returns/deadlines :
 *     2025-26 tax year ended 5 April 2026; online return due 31 January 2027.
 * Derived dates (arithmetic on the rules above): 2025-26 sole trader -> end of January 2032;
 * 2025-26 employee on-time return -> 22 months after 5 April 2026 = early February 2028,
 * stated as "until at least February 2028".
 * Not stated: Making Tax Digital for Income Tax specifics (not verified in this session).
 */

export const DEC_2B_HOW_LONG_TO_KEEP_RECEIPTS_UK = [
  {
    slug: "how-long-to-keep-receipts-uk",
    image: "assets/how-long-to-keep-receipts-uk.jpeg",
    category: "taxes",
    publishedAt: "2026-12-02T14:00:00Z",
    title: "How Long to Keep Receipts in the UK: HMRC Rules by Business Type",
    seoTitle: "How Long to Keep Receipts UK: HMRC Rules Explained",
    seoDescription:
      "Sole traders: 5 years after the 31 January deadline. Limited companies and VAT: 6 years. The full HMRC record-keeping table, with 2025-26 dates.",
    excerpt:
      "HMRC's record-keeping periods depend on who you are: 5 years after the filing deadline for sole traders, 6 years for limited companies and VAT, 22 months for most personal returns. Here is the full table with real dates.",
    body: `**In the UK, sole traders and partners must keep business receipts and records for at least 5 years after the 31 January Self Assessment deadline for the tax year they relate to. Limited companies must keep records for 6 years from the end of the financial year they relate to, and VAT-registered businesses must keep VAT records for at least 6 years. If you file a personal Self Assessment return on time and are not self-employed, the minimum is 22 months after the end of the tax year.** Keeping good records starts with issuing proper ones: you can [make a receipt or invoice](/create) for each sale in the browser.

This is the UK version of our guide. The US rules, which run on IRS audit windows, are in [how long to keep receipts](/blog/how-long-to-keep-receipts).

## The retention table

| Who | Minimum period | Source |
|---|---|---|
| Sole trader or partner | 5 years after the 31 January filing deadline for the tax year | GOV.UK, self-employed records |
| Sole trader filing more than 4 years late | 15 months after you send the return | GOV.UK, self-employed records |
| Limited company | 6 years from the end of the last financial year the records relate to, sometimes longer | GOV.UK, company records |
| VAT-registered business | At least 6 years for VAT records | HMRC Notice 700/21 |
| CIS contractor | At least 3 years after the end of the tax year, for CIS records | GOV.UK, CIS record keeping |
| VAT bad debt relief claim | 4 years after the claim (10 years if you used VAT MOSS) | GOV.UK, VAT records |
| Personal return, not self-employed, filed on time | At least 22 months after the end of the tax year | GOV.UK, pay and tax records |
| Personal return filed late | At least 15 months after you send it | GOV.UK, pay and tax records |

Where more than one line applies, keep to the longest. A VAT-registered sole trader, for example, needs at least 6 years for VAT records and 5 years after the filing deadline for the rest, so check both dates before clearing anything out.

## Sole traders and partners: the dates

The 5-year clock starts from the filing deadline, not from the date of the receipt. GOV.UK's own example: a 2022 to 2023 return sent online by 31 January 2024 means keeping the records until at least the end of January 2029.

For the 2025 to 2026 tax year, which ended on 5 April 2026, the online return is due by 31 January 2027. Keep that year's receipts until at least the end of January 2032. A receipt from April 2025 therefore needs to survive for nearly seven years.

[GOV.UK's list](https://www.gov.uk/self-employed-records/what-records-to-keep) of what to keep covers all sales and income, all business expenses, VAT and PAYE records if they apply, and records of your personal income. As proof it names receipts for goods and stock, bank statements, chequebook stubs, sales invoices, till rolls and bank slips. Our guide to [receipt tracking for the self-employed](/blog/self-employed-receipt-tracking) has a simple system for the expense side.

## Limited companies

GOV.UK says a company must keep records for [6 years from the end of the last company financial year](https://www.gov.uk/running-a-limited-company/company-and-accounting-records) they relate to. Keep them longer if:

- a transaction covers more than one of the company's accounting periods
- the company bought something it expects to last more than 6 years, such as machinery
- the Company Tax Return was sent late
- HMRC has started a compliance check into the return

The records include money received (invoices, contracts, sales books, till rolls), money spent (receipts, petty cash books, orders, delivery notes) and supporting documents like bank statements. HMRC can fine a company £3,000, or a director can be disqualified, for not keeping accounting records.

## VAT records

HMRC's [Notice 700/21](https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021) says VAT-registered businesses must generally keep all business records for VAT purposes for at least 6 years. That includes copies of every VAT invoice you issue, the VAT invoices you receive, credit and debit notes, and your VAT account. If 6 years causes serious storage problems, HMRC says you can ask about keeping some records for less. For what a VAT invoice must contain, see [VAT invoice requirements in the UK](/blog/vat-invoice-requirements-uk).

## Construction (CIS)

Contractors in the Construction Industry Scheme must keep records of gross payments, deductions and materials for at least 3 years after the end of the tax year, and can be fined up to £3,000 if they cannot produce them. Subcontractors should keep their monthly payment and deduction statements with their own records; see [how a CIS invoice works](/blog/cis-invoice-uk).

## Personal tax returns

If you fill in a Self Assessment return but are not self-employed, for example as an employee or company director with income to declare, the period is shorter: at least 22 months after the end of the tax year if you file on time. For 2025 to 2026, that means keeping records until at least February 2028. If you file late, keep them for at least 15 months after you send the return.

## Paper or digital

HMRC's VAT guidance says you do not have to keep records in a set way, as long as they are complete, up to date and let you work out the right tax. Many people photograph or scan receipts as they get them, especially till receipts printed on thermal paper, which fade. Records kept in software for Making Tax Digital for VAT have their own digital rules, so check those if they apply to you.

If records are lost, stolen or destroyed and you cannot replace them, GOV.UK says to do your best to provide figures and tell HMRC you are using estimated or provisional figures.

## Worked example

Amira (a sample sole trader) runs a mobile hairdressing business. She is not VAT registered and her accounts run to 5 April.

| Tax year | Return due | Keep records until at least |
|---|---|---|
| 2023 to 2024 | 31 January 2025 | End of January 2030 |
| 2024 to 2025 | 31 January 2026 | End of January 2031 |
| 2025 to 2026 | 31 January 2027 | End of January 2032 |

Each February she can safely clear out one more year: in February 2030, the 2023 to 2024 folder reaches the end of its minimum period.

## Issue documents you can keep

A record is only as good as the paper behind it. Give every customer a numbered receipt or invoice and keep your copy. You can [build one in the browser](/create), with British Pound (£) available as the currency in Settings; previewing needs no account, downloading needs a free account, and your first download is watermark-free.

This is general information, not tax advice. Check GOV.UK or ask an accountant about your own records.`,
    faqs: [
      {
        q: "How long do I need to keep receipts as a sole trader in the UK?",
        a: "At least 5 years after the 31 January Self Assessment deadline for the tax year. For 2025 to 2026, the deadline is 31 January 2027, so keep that year's records until at least the end of January 2032.",
      },
      {
        q: "How long must a limited company keep records?",
        a: "6 years from the end of the last company financial year they relate to, or longer in some cases, such as assets expected to last more than 6 years or a late Company Tax Return.",
      },
      {
        q: "How long do I keep VAT records?",
        a: "HMRC's record-keeping notice says at least 6 years for all business records kept for VAT purposes, including copies of VAT invoices and credit notes.",
      },
      {
        q: "How long should I keep records if I'm not self-employed?",
        a: "If you file a Self Assessment return on time, at least 22 months after the end of the tax year. If you file late, at least 15 months after you send the return.",
      },
      {
        q: "Can I keep scanned copies instead of paper receipts?",
        a: "HMRC's VAT record-keeping guidance says records do not have to be kept in a set way, as long as they are complete, up to date and let you work out the right VAT. Many businesses scan receipts, which also protects against faded thermal paper.",
      },
    ],
  },
];
