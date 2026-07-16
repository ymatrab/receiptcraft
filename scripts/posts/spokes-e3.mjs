/** Cluster E (Taxes) spokes 3/4: E8–E9. */

export const SPOKES_E3 = [
  {
    slug: "receipt-organization-systems",
    category: "taxes",
    publishedAt: "2026-07-19T13:00:00Z",
    title: "What's the Best Way to Organize Receipts? 7 Systems Compared",
    seoTitle: "How to Organize Receipts: 7 Systems Compared",
    seoDescription:
      "From the shoebox to full bookkeeping integration — 7 receipt organization systems compared by effort, search speed and audit-readiness, with the right pick per situation.",
    excerpt:
      "Seven systems, honestly compared — shoebox to software — by the three tests that matter: capture effort, findability, and whether an auditor's question takes minutes or a weekend.",
    body: `The best receipt organization system is the least effortful one that still passes two tests: any receipt findable in under a minute, and every tax-relevant receipt captured before it fades or vanishes. Seven systems span the spectrum — shoebox, envelopes, binder, folder scans, app capture, email-first, and full bookkeeping integration. Most people's right answer is app capture (personal/simple business) or bookkeeping integration (real business volume).

## 1. The shoebox — capture: trivial; findability: none

Everything in a box, sorted never. It beats losing receipts, and that's its whole résumé. At tax time it becomes a weekend; at audit time, a liability. If this is you today, the upgrade path is #5 in an afternoon.

## 2. Monthly envelopes — the analog minimum

Twelve envelopes, receipts in by month. Findability improves to "which month was that?"; still unsearchable and still on fading thermal paper ([why that matters](/blog/faded-receipt-fix-reddit)). Acceptable for very low volume, but the same effort digitized (#4) buys permanence.

## 3. The category binder — analog, organized, laborious

Tabbed by category (utilities, medical, business supplies...), receipts filed weekly. Genuinely findable and audit-friendly — this was the gold standard in 1995 — but the filing labor is real and paper originals remain fragile. Its digital descendant (#7) does the same taxonomy automatically.

## 4. Scan-to-folders — the DIY digital baseline

Phone-scan everything into cloud folders (Year/Category or Year/Month) with vendor-date filenames. Free, IRS-compliant ([the digital records rule](/blog/scanned-receipts-irs)), searchable by filename, and permanent. Costs discipline: the unscanned pocket receipt is the failure mode. Right for organized individuals and side gigs.

## 5. App capture — the personal-finance sweet spot

A receipt app (or notes app with OCR) captures at purchase; software extracts vendor, date, amount; search covers content, not just filenames. Near-zero marginal effort once habitual — the capture-at-payment principle from [organizing expense receipts](/blog/organize-receipts-expense-reports) generalized to everything. Right for most individuals and freelancers below bookkeeping-software volume.

## 6. Email-first — for digital-native spending

A dedicated address or label collects e-receipts; rules auto-file by sender; paper receipts get photographed into the same stream. Zero effort for online spending, which for many people is now most spending. Pairs with #5 for the physical remainder rather than replacing it.

## 7. Bookkeeping integration — the business answer

Receipts attach to transactions inside QuickBooks/Wave/FreshBooks via bank-feed matching: every expense categorized, documented and reconciled in one motion — the full workflow from [self-employed receipt tracking](/blog/self-employed-receipt-tracking) and [recording receipts in bookkeeping](/blog/recording-receipts-bookkeeping). Highest setup cost, lowest ongoing cost per receipt, and audit-readiness as a by-product. Right for any real business.

## Picking yours

- **Individual, simple taxes:** #5, with #6 if your inbox is where receipts live.
- **Freelancer/side gig:** #5 or #4 feeding a quarterly review.
- **Small business with software:** #7, no debate — anything else double-handles every receipt.
- **Paper devotee:** #3, scanned monthly as backup (#4) — belt and suspenders.

Whatever you pick, the retention clocks from [how long to keep receipts](/blog/how-long-to-keep-receipts) apply to the system, not the medium: digital keeps everything free, paper keeps everything fragile.

## The bottom line

Organizing receipts is one decision — where does a receipt go in the first ten seconds of existing? — repeated forever. Answer it with an app or your bookkeeping software, and systems 1 through 3 become nostalgia.`,
    faqs: [
      {
        q: "What's the best way to organize receipts for taxes?",
        a: "Digitally, captured at purchase: an app or scan-to-folder system by year and category, feeding bookkeeping software if you run a business. Digital copies satisfy the IRS and never fade.",
      },
      {
        q: "Should I organize receipts by date or by category?",
        a: "Category-first, year above it: taxes and audits ask by category ('show me supplies'), rarely by date. Apps and software index both, which is one reason they beat physical filing.",
      },
      {
        q: "How do I organize years of unfiled receipt backlog?",
        a: "Triage: current and last tax year first, property/asset receipts second (they matter longest), everything else batch-scanned coarsely by year. Perfect categorization of 2019's groceries isn't worth an evening.",
      },
      {
        q: "Is a photo of a receipt as good as the original?",
        a: "For the IRS and nearly all practical purposes, yes — legible, complete digital copies are accepted records, and they outlive thermal paper by decades. Verify the capture before tossing the paper.",
      },
    ],
  },

  {
    slug: "recording-receipts-bookkeeping",
    category: "taxes",
    publishedAt: "2026-07-21T13:00:00Z",
    title: "How Do You Record Receipts in Bookkeeping?",
    seoTitle: "How to Record Receipts in Bookkeeping (Both Directions)",
    seoDescription:
      "Receipts enter the books twice: sales receipts as income entries, expense receipts as categorized costs attached to transactions. The double-sided workflow, step by step.",
    excerpt:
      "Every receipt is a ledger entry waiting to happen — income if you issued it, expense if you received it. The recording workflow in both directions, and the reconciliation habit that ties them to reality.",
    body: `Recording receipts in bookkeeping runs in two directions. **Receipts you issue** (sales) become income entries: date, customer, amount, category, payment method — posted to the sales or cash-receipts journal. **Receipts you receive** (purchases) become expense entries: categorized to the chart of accounts, with the receipt image attached to the transaction. Both directions then meet reality in reconciliation: ledger totals matching bank statements, monthly.

This is general bookkeeping practice, not accounting advice for your specific situation.

## Recording sales receipts (money in)

Each receipt you issue carries exactly the fields a ledger row needs — which is why numbered receipts ARE the primitive bookkeeping system ([the numbering discipline](/blog/how-to-number-receipts)):

1. Enter date, receipt number, customer, amount, and payment method.
2. Categorize the income (service revenue, product sales, ...).
3. Record sales tax collected separately — it's a liability you're holding, not income.
4. Match deposits: cash receipts batched to a deposit should sum to that deposit's bank line.

Software users: point-of-sale and invoicing tools post this automatically; the [invoice→receipt workflow](/blog/freelancer-receipts) keeps the paper trail aligned with the ledger. Spreadsheet users: one row per receipt in a cash-receipts journal, per [cash receipt practice](/blog/cash-payment-receipt-services).

## Recording expense receipts (money out)

The modern flow is attach-and-categorize:

1. Capture the receipt at purchase ([the tracking system](/blog/self-employed-receipt-tracking)).
2. The bank feed surfaces the transaction; match the receipt image to it.
3. Categorize to your chart of accounts (supplies, advertising, meals at their limited deductibility, ...).
4. Annotate what the receipt can't say: business purpose, client, project — the context layer that categories like meals legally require ([the substantiation map](/blog/small-business-deductions-receipts)).
5. Split mixed receipts: the office-supplies-plus-personal Costco run becomes two lines, one deductible.

Cash-basis books record at payment date (the receipt's date); accrual books record expenses when incurred and receipts document the payment leg.

## Reconciliation: where the two directions meet

Monthly, tie the ledger to the bank: every statement line matched to an entry, every entry to a document. Unmatched bank lines are unrecorded transactions; unmatched entries are errors or missing money. This loop is what makes receipt-keeping into bookkeeping — and it's the exact posture that shortens audits: ledger → receipts → statements, agreeing with each other, per the two-sided audit logic in [which deductions require receipts](/blog/small-business-deductions-receipts).

## The chart-of-accounts shortcut

Categorize to match your tax form from day one — Schedule C line names for sole proprietors — and year-end becomes a report export. Renaming "stuff" into tax categories every April is the single most common small-business bookkeeping tax.

## Retention rides along

Attached receipt images inherit software backups and satisfy digital-records rules ([the IRS position](/blog/scanned-receipts-irs)); keep the books and their attachments per the [retention clocks](/blog/how-long-to-keep-receipts) — and asset purchases flagged permanently for depreciation and basis.

## The bottom line

Issue a receipt → post income; receive one → attach and categorize; monthly → reconcile both against the bank. Three motions, and the shoebox era ends: the books substantiate the taxes, the receipts substantiate the books, and the bank confirms them both.`,
    faqs: [
      {
        q: "Are receipts the same as bookkeeping records?",
        a: "Receipts are source documents; bookkeeping is the ledger built from them. Every entry should trace to a document (receipt, invoice, statement), and every receipt should exist as an entry — that two-way traceability is the standard.",
      },
      {
        q: "How do I record a cash sale in bookkeeping?",
        a: "Issue a numbered receipt, then post its fields as an income entry — date, number, customer, amount, category — and record sales tax collected as a liability. Batch deposits should reconcile to the receipts they contain.",
      },
      {
        q: "Do I record an expense when I buy or when I see it on the statement?",
        a: "Cash-basis books record at payment (the receipt date); the bank feed is a matching tool, not the trigger. Accrual books record when the expense is incurred, with the receipt documenting payment.",
      },
      {
        q: "What happens to receipts with no matching bank transaction?",
        a: "Cash purchases — record them from the receipt directly (a petty-cash or owner-funds entry). The receipt is the only evidence for these, which is why cash receipts deserve the most careful capture.",
      },
    ],
  },
];
