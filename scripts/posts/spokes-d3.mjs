/** Cluster D (Small Business) spokes 3/4: D8–D10. */

export const SPOKES_D3 = [
  {
    slug: "receipt-requirements-by-country",
    category: "small-business",
    publishedAt: "2026-07-20T12:00:00Z",
    title: "What Are the Receipt Requirements in the US, UK, EU, Canada and Australia?",
    seoTitle: "Receipt Requirements by Country: US, UK, EU, Canada, Australia",
    seoDescription:
      "US receipts are rarely mandatory; EU receipts are fiscal documents; UK, Canada and Australia sit between. The required fields and thresholds in each system, compared.",
    excerpt:
      "Five jurisdictions, five philosophies: the US barely regulates receipts, the EU makes them fiscal documents, and the UK, Canada and Australia each draw their own lines. The field-by-field map.",
    body: `Receipt rules split five ways: the US rarely mandates receipts at all (card-network rules and state pockets aside); the UK requires VAT receipts with the seller's VAT number for VAT-registered sales; the EU goes furthest, treating receipts as fiscal documents issued through certified systems; Canada keys documentation to GST/HST registration with fields scaling by amount; and Australia requires receipts for sales over AU$75 (excl. GST) on request, with ABN-bearing tax invoices for GST claims.

If you sell across borders, the rule follows the sale — here is each system in practice. This is general information, not tax advice.

## United States: the light-touch outlier

No general federal receipt mandate; obligations come from card networks (receipt on request), FACTA's card-masking rules, state pockets (fuel, rent, repair trades) and industry regulation — the full picture is in [are businesses legally required to give receipts](/blog/are-receipts-legally-required). No tax ID appears on ordinary receipts; sales tax shows as a line but the receipt isn't a "tax document" the way it is elsewhere. The binding duty is record-keeping: you must be able to substantiate income.

## United Kingdom: VAT draws the line

Below VAT registration (a turnover threshold in the £90k region, adjusted over time), ordinary receipts suffice. VAT-registered sellers must provide VAT invoices/receipts for business customers showing: seller name and address, **VAT registration number**, date, description, and VAT amount or rate. Simplified VAT receipts are allowed under a threshold (£250 including VAT) with reduced fields. A UK business receipt without a VAT number can't support the buyer's input-VAT claim — the mechanics are in [what makes a receipt VAT-valid](/blog/vat-receipt-explained).

## European Union: receipts as fiscal documents

The strictest family of regimes: many member states require every retail sale to produce a receipt from a certified fiscal register or software (Italy, Portugal, Germany's TSE-certified tills, and others), transmitting or securing transaction data for tax authorities. Receipts carry the seller's tax identifiers; some countries fine businesses for not issuing and run lotteries to make customers collect them. Full VAT invoices (B2B) add buyer details and per-rate VAT breakdowns. The operational upshot: an EU retail business chooses its till system around fiscal law, not convenience.

## Canada: GST/HST scaling fields

Registrants (required above CA$30,000 turnover) must give documentation whose mandatory fields scale with the amount — historically in tiers (under $100 / $100–500 / over $500... thresholds were raised in recent years): seller name, date, amount, then the **GST/HST registration number** once the buyer needs an input tax credit, then buyer name and terms at the top tier. The registration number is the field businesses forget and buyers chase; the [VAT receipt mechanics](/blog/vat-receipt-explained) works similarly in other GST countries.

## Australia: the AU$75 rule

Businesses must provide a receipt or proof of transaction for sales of AU$75 or more (excluding GST) — and on request below it. GST-registered sellers issue **tax invoices** for sales over AU$82.50 (incl. GST) when asked, showing the ABN, GST amount and "tax invoice" wording; buyers need them to claim input credits. Consumer law also requires itemized bills for services on request.

## The convergent core

Strip the local paint and every system wants the same skeleton — seller identity (plus tax ID where VAT/GST applies), date, description, amount with tax broken out, and traceability — the anatomy in [what information must a receipt include](/blog/parts-of-a-receipt). Build receipts to that spec by default (the [free generator](/create) does) and local compliance is usually one field away.

## The bottom line

US: wise but rarely mandatory. UK: VAT number once registered. EU: certified fiscal issuance. Canada: GST/HST number for credits. Australia: receipts at AU$75, tax invoices on request. Sell where the customer is, and issue what their tax system needs — it's cheaper than their accountant emailing you.`,
    faqs: [
      {
        q: "Do US businesses have to put a tax ID on receipts?",
        a: "No — ordinary US sales receipts carry no tax identifier. That's a VAT/GST-system feature: UK receipts need the VAT number once registered, Canadian receipts the GST/HST number for input credits, Australian tax invoices the ABN.",
      },
      {
        q: "What is a certified fiscal receipt in the EU?",
        a: "A receipt issued through government-certified register hardware or software that secures and often transmits the transaction to tax authorities. Several EU states require them for all retail sales, with fines for non-issuance.",
      },
      {
        q: "At what amount does Australia require receipts?",
        a: "AU$75 or more (excluding GST) automatically, and on customer request below that. GST-registered sellers must additionally provide a tax invoice for sales over AU$82.50 including GST when asked.",
      },
      {
        q: "Which country's rules apply to my online sales?",
        a: "Generally the buyer's jurisdiction for consumption taxes — a US seller shipping to EU or Australian consumers can owe VAT/GST registration and its documentation duties once thresholds are crossed. Marketplace platforms often handle it for you.",
      },
    ],
  },

  {
    slug: "how-to-number-receipts",
    category: "small-business",
    publishedAt: "2026-07-21T12:00:00Z",
    title: "How Should You Number Receipts? 4 Systems That Scale",
    seoTitle: "How to Number Receipts: 4 Systems That Scale",
    seoDescription:
      "Sequential, year-prefixed, date-based or client-coded — four receipt numbering systems, the rules that keep any of them audit-proof, and how to handle voids and gaps.",
    excerpt:
      "Never repeat, never skip silently, never reuse a void — numbering rules matter more than the format. Four systems compared, from 0001 to client-coded, with the audit logic behind them.",
    body: `Number receipts with any format you can sustain — the rules matter more than the scheme: every receipt gets a number, numbers never repeat, sequences never skip silently, and voided numbers are kept and marked rather than reused. Four formats cover almost every small business: plain sequence, year-prefixed, date-based, and client-coded. Pick by volume and whether humans need to read meaning into the number.

## Why numbering exists at all

A receipt number makes each transaction uniquely referenceable — for customer lookups, refunds tied to originals, and above all bookkeeping: an unbroken sequence proves your ledger is complete. Auditors read gaps as missing income and duplicates as sloppiness or worse; a clean series is quiet evidence of clean books, which is the whole game in [recording receipts in bookkeeping](/blog/recording-receipts-bookkeeping). (What the numbers mean on big-retail receipts — store, register, sequence — is covered in [what is a receipt number](/blog/what-is-a-receipt-number).)

## System 1: plain sequence (0001, 0002, …)

The default. Works at any volume, sorts naturally, and gaps are instantly visible. Its one weakness: the number carries no information — fine for software, mildly annoying for humans flipping paper. Zero-pad to at least four digits so filenames sort.

## System 2: year prefix (2026-0041)

Resets each January; numbers stay short and every receipt self-dates to a year. The sweet spot for service businesses issuing tens to hundreds annually — "2026-0041" reads as "41st receipt of 2026" with no lookup. Handles the year-boundary audit question ("how many receipts in 2026?") by construction.

## System 3: date-based (260721-03)

YYMMDD plus a daily counter. Encodes the full date, sorts chronologically as text, and suits businesses with several-per-day volume — market vendors, food stalls, service calls. Slightly longer to write by hand; trivially generated by software.

## System 4: client or job codes (ACME-2026-07)

For freelancers and contractors with repeat clients: prefix by client or job, then year, then sequence. The number becomes a filing system — every Acme receipt findable by its prefix — and pairs naturally with the deposit-progress-final chains described in [partial payment receipts](/blog/partial-payment-receipt). Keep a master log so prefixes don't collide.

## The rules that make any system audit-proof

1. **No reuse, ever** — including voids: mark "VOID," keep the copy, move on. A missing number with no void record is the classic audit question.
2. **One series per system of record** — if you run a receipt book alongside software, prefix book receipts ("B-") into the same logical sequence, per the hybrid setup in [receipt book vs. digital](/blog/receipt-book-vs-digital).
3. **Assign at issuance, not later** — numbering retroactively is how duplicates happen.
4. **Log everything** — number, date, payer, amount, status. The log is what turns the numbers into proof.

## Common mistakes

Starting at 0001 publicly (start at 1001 if optics bother you — gap-free from there is what matters), restarting sequences mid-year after a software change without documenting the cutover, and letting refunds share the original's number (refunds get their own number, referencing the original).

## The bottom line

Pick the simplest format your volume allows — sequence or year-prefix for most — and enforce the four rules without exception. The [receipt generator](/create) assigns and remembers numbers automatically; the [sales receipt template](/templates/sales-receipt) shows the number placement customers expect.`,
    faqs: [
      {
        q: "Do receipt numbers have to be sequential?",
        a: "They have to be unique and account-for-able; sequential is the easiest way to prove completeness. Structured formats (dates, client codes) are fine as long as the sequence within them never skips silently or repeats.",
      },
      {
        q: "What do I do with a voided receipt's number?",
        a: "Keep it. Mark the receipt VOID, retain the copy in your records, and let the sequence continue. Reusing or deleting voided numbers is what creates audit questions.",
      },
      {
        q: "Should receipt and invoice numbers share a series?",
        a: "Separate series are cleaner — INV-2026-001 and RCT-2026-001 — because the documents have different lifecycles. Link them by reference: the receipt cites the invoice it settles.",
      },
      {
        q: "What number should I start with?",
        a: "Anything you'll sustain — 0001 is honest, 1001 hides your newness. What matters is that the series runs gap-free and documented from wherever it starts.",
      },
    ],
  },

  {
    slug: "freelancer-receipts",
    category: "small-business",
    publishedAt: "2026-07-22T12:00:00Z",
    title: "When Should Freelancers Issue Receipts?",
    seoTitle: "When Should Freelancers Issue Receipts? (And For What)",
    seoDescription:
      "Freelancers should issue receipts on every payment received — deposits included — even when the platform already does. The why, the fields, and the invoice-receipt workflow.",
    excerpt:
      "Every payment, every deposit, even when Upwork already 'handles it' — the freelancer receipt rules that keep clients happy and your books audit-ready, with the invoice→receipt workflow.",
    body: `Freelancers should issue a receipt for every payment received: final payments, deposits and retainers, cash especially, and even platform-paid work where the platform's records are the client's only documentation. The receipt closes the loop the invoice opened — invoice requests, receipt confirms — and the discipline pays twice: clients get the paperwork their accountants want, and your own income records assemble themselves.

## The invoice → receipt workflow

The clean freelance payment cycle has two documents:

1. **Invoice** — sent when work (or a milestone) completes: what's owed, terms, due date.
2. **Receipt** — sent when money arrives: what was paid, when, how, against which invoice.

Marking the invoice "PAID" and re-sending it works as a receipt ([the mechanics](/blog/receipt-vs-invoice)); a separate numbered receipt is cleaner, referencing the invoice number so both documents index each other. Software does this automatically; so does a two-minute template habit at [/create](/create).

## When a receipt is non-negotiable

- **Cash payments** — the receipt is the only record; signed, per [cash receipt practice](/blog/cash-payment-receipt-services).
- **Deposits and retainers** — state amount received, the total, the balance and what the deposit reserves ([the partial-payment format](/blog/partial-payment-receipt)); disputes about "what the deposit covered" are the freelance classic.
- **Business clients** — they need receipts for their own expense and tax records; being the freelancer whose paperwork is effortless is quiet marketing.
- **Anyone claiming your fee somewhere** — parents claiming tutoring for dependent-care credits, clients expensing your work: your receipt is their substantiation.

## "But the platform already sends receipts"

Upwork, Fiverr and similar do issue payment documentation — for what the client paid the platform, fees included, formatted for the platform's needs. Direct clients off-platform get nothing unless you send it. The rule that scales: platforms document platform payments; you document direct ones. And your own bookkeeping needs a unified income record across both, which platform PDFs alone don't give you — the recording side is in [how self-employed people should track receipts](/blog/self-employed-receipt-tracking).

## What a freelancer receipt contains

Your name/business and contact (plus tax ID where clients need it for their filings — US clients may separately request a W-9), receipt number in your series ([numbering systems](/blog/how-to-number-receipts)), date received, client name, service description with period ("Brand identity design, June 2026, per invoice INV-2026-014"), amount, payment method, and full/partial status. The [receipt for services template](/templates/invoice) has the layout; the description specificity rules from [receipts for services rendered](/blog/receipt-for-services-rendered) apply directly.

## The tax quietly riding on this

Every receipt you issue is an income record: numbered receipts reconciling to deposits reconciling to your Schedule C is the pattern that makes self-employment audits boring. Sales tax adds a wrinkle — some states tax certain services, in which case the receipt must break the tax out. When in doubt about your service's taxability, that's an accountant question worth its fee.

## The bottom line

Issue on every payment, number them, reference the invoice, keep copies — and let deposits and cash get the most careful receipts, not the least. The freelancers who "never got around to receipts" meet the consequence at tax time or in a client dispute; the ones with the two-document habit never notice either.`,
    faqs: [
      {
        q: "Do freelancers legally have to give receipts?",
        a: "Rarely by statute in the US — but cash contexts, some state service rules and client contracts create duties, and your own tax record-keeping effectively requires the same documentation. Treat it as mandatory practice.",
      },
      {
        q: "Should I send a receipt for a deposit or retainer?",
        a: "Always. State the amount received, the project total, the remaining balance and what the deposit secures. Deposit ambiguity is the most common freelance payment dispute, and the receipt is what prevents it.",
      },
      {
        q: "Is a paid invoice the same as a receipt?",
        a: "Functionally close: an invoice marked PAID with date and method received works as proof of payment. A separate numbered receipt referencing the invoice is cleaner for both parties' books.",
      },
      {
        q: "Do I need to put my SSN or EIN on receipts?",
        a: "Not on receipts. Business clients who need your tax ID for their reporting will request a W-9 — provide the EIN there rather than printing identifiers on routine documents.",
      },
    ],
  },
];
