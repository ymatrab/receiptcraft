/** Cluster E (Taxes) spokes 1/4: E2–E4. */

export const SPOKES_E1 = [
  {
    slug: "how-long-to-keep-receipts",
    category: "taxes",
    publishedAt: "2026-07-12T13:00:00Z",
    title: "How Long Should You Keep Receipts?",
    seoTitle: "How Long Should You Keep Receipts? (Tax & Non-Tax Rules)",
    seoDescription:
      "Tax receipts: 3 years minimum, 6 for underreported income, 7 for bad-debt claims — and property receipts for as long as you own it. The full retention table.",
    excerpt:
      "Three years is the baseline, but six, seven and 'as long as you own it' all apply to somebody. The retention rules by receipt type, and which papers you can safely shred today.",
    body: `Keep tax-related receipts for at least 3 years — that's the standard IRS audit window. Keep them 6 years if substantial income underreporting could ever be alleged, 7 for bad-debt or worthless-securities claims, and keep receipts for property, home improvements and investments for as long as you own the asset plus 3 years. Non-tax receipts follow their own clocks: warranty length, return window, or the life of an insurance policy.

This is general information, not tax advice.

## The tax retention table

- **3 years** — the default: the IRS generally has 3 years from filing to assess. Everyday deduction receipts live here.
- **6 years** — if a return omits more than 25% of gross income, the window doubles; cash-heavy businesses and complex-income filers should default to 6.
- **7 years** — claims for bad-debt deductions or worthless securities.
- **Forever-ish (asset life + 3):** home purchase and improvement receipts (they build basis and cut future capital gains), major equipment, investment records. The $12,000 roof receipt from 2016 is a live tax document the year you sell.
- **No limit** — if a return was never filed or was fraudulent, no statute protects you; the records are your defense.
- **Employment tax records:** at least 4 years.

State audit windows can run longer than federal — a year or two more in several states — so match your longest applicable clock.

## Non-tax clocks people forget

- **Warranties:** the receipt starts and proves the clock ([warranty claims without receipts](/blog/warranty-claim-without-receipt) are possible but harder) — keep it the full warranty term.
- **Returns:** the store's window, typically 30–90 days.
- **Insurance:** receipts for insured valuables persist as long as the item and policy do — they're your claim evidence.
- **Rent and deposits:** the tenancy plus the deposit-return dispute window ([deposit receipt rules](/blog/security-deposit-receipt)).
- **HSA/FSA:** medical receipts until reimbursed plus the tax window — and indefinitely if you defer HSA reimbursement, a strategy that turns old receipts into future tax-free withdrawals.

## Digital storage resets the economics

The 3-vs-6-year question mattered when receipts were shoeboxes; scanned, they cost nothing to keep forever. The IRS accepts digital copies ([the scanning rules](/blog/scanned-receipts-irs)), thermal paper fades within months anyway ([why receipts fade](/blog/faded-receipt-fix-reddit)), so the practical policy is: **scan everything tax-relevant immediately, keep digital copies indefinitely, shred paper freely.** Storage habits and folder structures are covered in [receipt organization systems](/blog/receipt-organization-systems).

## What you can safely discard now

Paper receipts already scanned and verified; receipts for ordinary purchases past return and warranty windows with no tax role; ATM slips reconciled against statements; grocery receipts (barring insurance-claim relevance or business use). What you never discard: anything establishing basis in property you still own, records for open tax years, and receipts documenting an ongoing dispute or claim.

## The bottom line

Three years minimum, six for safety, asset-life-plus-three for property — digitally, keep it all; the cost of storage is zero and the cost of the missing receipt is the deduction. The list of which receipts are worth keeping in the first place is the hub: [which receipts should you keep for taxes](/blog/receipts-to-keep-for-taxes).`,
    faqs: [
      {
        q: "How long should I keep receipts for taxes?",
        a: "At least 3 years from filing (the standard IRS assessment window); 6 years protects against the extended window for substantial underreporting. Property and improvement receipts: as long as you own the asset, plus 3 years.",
      },
      {
        q: "Can I throw away paper receipts after scanning?",
        a: "Generally yes — the IRS accepts legible digital copies as records. Verify the scan captures the whole receipt, back the files up, and paper becomes redundant except for rare original-document contexts.",
      },
      {
        q: "Why keep home improvement receipts for decades?",
        a: "They increase your home's cost basis, which reduces taxable capital gain when you sell. Without them, improvements you can't prove are gains you may pay tax on — keep them the full ownership period plus 3 years.",
      },
      {
        q: "Which receipts should I keep forever?",
        a: "Anything establishing basis in assets you still hold (home, improvements, investments, equipment), records for unfiled or disputed years, and — practically — all scanned receipts, since digital retention costs nothing.",
      },
    ],
  },

  {
    slug: "scanned-receipts-irs",
    category: "taxes",
    publishedAt: "2026-07-13T13:00:00Z",
    title: "Does the IRS Accept Scanned Receipts?",
    seoTitle: "Does the IRS Accept Scanned Receipts? (Yes — Here's the Rule)",
    seoDescription:
      "The IRS has accepted digitized records since 1997 (Rev. Proc. 97-22): scans must be accurate, legible and reproducible. What that means in practice, and the audit-day workflow.",
    excerpt:
      "Yes — and it has since 1997. What Revenue Procedure 97-22 actually requires of your scans, whether phone photos count, and the one mistake that gets digital records rejected.",
    body: `Yes — the IRS accepts scanned and photographed receipts, and has formally since Revenue Procedure 97-22 (1997). Digital copies qualify as records if the system that stores them produces accurate, legible, readily accessible reproductions of the originals. Phone photos count. Expense-app captures count. Once a faithful digital copy exists, the paper original may be destroyed; audits proceed on the digital files.

This is general information, not tax advice.

## What Rev. Proc. 97-22 actually asks

The standard is functional, not technical. Your electronic storage must:

1. **Reproduce faithfully** — the digital copy shows everything the paper did: vendor, date, items, amounts, tax.
2. **Stay legible** — readable on screen and in printout, at audit time, years later.
3. **Be retrievable** — you can locate and produce the receipt for a given transaction when asked; indexed storage, not a 9,000-photo camera roll.
4. **Maintain integrity** — controls that prevent loss and undisclosed alteration (ordinary app/cloud storage satisfies this; editing receipts obviously doesn't).

No resolution minimums, no format mandates, no certification regime — a clear phone photo in organized cloud storage clears the bar.

## What this changes in practice

Thermal receipts fade to blank within months ([the chemistry of fading](/blog/faded-receipt-fix-reddit)) — so a same-day scan isn't just permitted, it's the only way most receipts survive to an audit anyway. The retention clocks in [how long to keep receipts](/blog/how-long-to-keep-receipts) all become trivial digitally: keep everything, forever, at zero cost. Capture workflows are in [receipt organization systems](/blog/receipt-organization-systems); for expense-report contexts every major system (Concur, Expensify, Ramp) is built on exactly this rule.

## The mistakes that actually cause rejections

- **Illegible captures:** cropped totals, blur, glare — the scan must stand alone; auditors won't decrypt it.
- **Unfindable storage:** records exist but can't be produced per-transaction. Folder-by-year plus vendor/date filenames (or an app that indexes automatically) is enough.
- **Capture without context:** the scan proves the purchase; deductions still need the substantiation around it — business purpose, attendees for meals ([the meal rules](/blog/meal-receipts-business-expenses)), mileage logs ([the mileage rules](/blog/mileage-log-receipts)).
- **Backups that weren't:** a phone-only archive that died with the phone. Cloud sync or a second copy is the integrity control that matters.

## Audit day with digital records

Auditors routinely receive PDFs and spreadsheet-indexed receipt archives; the IRS's own correspondence audits ask you to mail or upload copies — nobody is examining paper originals. Produce: the receipts for sampled transactions, the ledger they reconcile to, and the contextual records (logs, calendars). Digital files that open, read cleanly and match the ledger end the conversation; the deeper no-receipts scenario is covered in [what happens if you're audited without receipts](/blog/audit-without-receipts-cohan-rule).

## The bottom line

Scan it the day you get it, store it where you can find it, back it up, and shred the paper without guilt — the IRS has been fine with this since dial-up. The receipt that fades in the glovebox loses deductions; the one photographed at the counter never does.`,
    faqs: [
      {
        q: "Are phone photos of receipts OK for the IRS?",
        a: "Yes. A clear, complete photo satisfies the digital-records standard — accurate, legible, retrievable. Blur, glare and cropped edges are what disqualify captures, not the fact of being a photo.",
      },
      {
        q: "Can I destroy paper receipts after scanning?",
        a: "Yes — Rev. Proc. 97-22 permits destroying originals once faithful digital copies exist in a compliant system. Verify each scan before shredding and keep backups.",
      },
      {
        q: "Do scanned receipts need to be in a special format?",
        a: "No mandated format or resolution — JPG, PNG, PDF and app captures all qualify. The tests are legibility, completeness, retrievability and integrity, not file type.",
      },
      {
        q: "Is a scanned receipt enough to win a deduction?",
        a: "It proves the purchase. The deduction may need more: business purpose, attendees, mileage logs. The scan replaces the paper, not the substantiation rules around it.",
      },
    ],
  },

  {
    slug: "self-employed-receipt-tracking",
    category: "taxes",
    publishedAt: "2026-07-14T13:00:00Z",
    title: "How Should Self-Employed People Track Receipts?",
    seoTitle: "Receipt Tracking for Self-Employed: The Complete System",
    seoDescription:
      "A self-employed receipt system needs four parts: separate accounts, capture-at-purchase, weekly categorization, and quarterly reconciliation. The setup, tool by tool.",
    excerpt:
      "No employer, no expense desk — the whole substantiation burden is yours. The four-part system that keeps a freelancer's receipts audit-ready in 20 minutes a week.",
    body: `Self-employed receipt tracking comes down to four habits: separate business money from personal (one account, one card), capture every receipt at the moment of purchase (photo or forwarded email), categorize weekly while memory is fresh, and reconcile quarterly against bank statements when estimated taxes come due anyway. The system runs on 15–20 minutes a week and produces exactly what a Schedule C — or an auditor — asks for.

This is general information, not tax advice.

## Part 1: separation is the system

A dedicated business checking account and card make every statement line a business record by definition — no highlighting personal statements, no "was that Amazon order supplies?" archaeology. Mixed finances are the root cause of most self-employment record chaos, and separation is also what makes the [bookkeeping side](/blog/recording-receipts-bookkeeping) mechanical: the account's transactions ARE the books' raw material.

## Part 2: capture at purchase

The receipt gets photographed or forwarded the moment it exists ([the capture logic](/blog/organize-receipts-expense-reports)): app captures for paper, a mail rule sweeping digital receipts to one folder, rideshare and platform receipts on auto-forward. The IRS accepts all of it digitally ([the scanning rules](/blog/scanned-receipts-irs)), and thermal paper wasn't going to survive until April anyway. Income receipts too — copies of every receipt you issue to clients ([freelancer receipt practice](/blog/freelancer-receipts)) are the other half of your records.

## Part 3: the weekly 15 minutes

Once a week: open the capture pile, attach each receipt to its bank-feed transaction (or ledger row), assign a Schedule C category (supplies, software, advertising, travel...), and annotate anything a stranger couldn't parse — client names on meals ([the meal substantiation](/blog/meal-receipts-business-expenses)), projects on materials. Weekly is the frequency at which you still remember; monthly is the frequency at which you guess.

Tools: QuickBooks Self-Employed, Wave (free), FreshBooks — or a spreadsheet plus organized cloud folders at low volume. The tool matters less than the cadence.

## Part 4: quarterly reconciliation

Estimated-tax quarters force a natural rhythm: before each payment, confirm every business-account transaction has its receipt and category, chase the gaps while merchants can still reprint ([the recovery playbook](/blog/how-to-replace-a-lost-receipt)), and glance at category totals for anomalies. Come filing season, Schedule C is a report, not a project.

## The categories that need extra structure

- **Mileage:** a tracker app, not fuel receipts, under the standard rate ([the log rules](/blog/mileage-log-receipts)).
- **Home office:** utilities, rent, internet — the percentage method needs the underlying bills kept ([home office receipts](/blog/home-office-deduction-receipts)).
- **Mixed-use purchases:** phone, internet, equipment used personally too — record the business-use basis at purchase time, not audit time.
- **Assets over ~$2,500:** keep purchase documents permanently in a separate folder; depreciation and basis outlive the yearly cycle ([retention rules](/blog/how-long-to-keep-receipts)).

## The bottom line

Separate, capture, categorize weekly, reconcile quarterly — four habits, twenty minutes a week, zero April panic. The self-employed lose deductions to missing paper, not to tax law: the system above makes missing paper structurally impossible.`,
    faqs: [
      {
        q: "What receipts do self-employed people need to keep?",
        a: "Every business expense receipt (supplies, software, travel, meals with context), income records including receipts you issue, asset purchase documents, and the substantiation layers — mileage logs, home-office bills, business-use notes.",
      },
      {
        q: "Do I need a separate bank account if I'm self-employed?",
        a: "Legally required only for some entities, but practically foundational: a dedicated account makes every transaction a business record, halves bookkeeping time, and is the cleanest audit posture available.",
      },
      {
        q: "What's the best app for tracking receipts when self-employed?",
        a: "Any tool you'll actually use weekly: QuickBooks Self-Employed and FreshBooks for integrated bookkeeping, Wave for free, spreadsheet-plus-cloud-folders at low volume. Capture-at-purchase and weekly categorization matter more than the brand.",
      },
      {
        q: "How far back can the IRS ask for my receipts?",
        a: "Generally 3 years from filing, 6 if substantial underreporting is alleged — and without limit for unfiled or fraudulent years. Digital storage makes keeping everything 6+ years costless.",
      },
    ],
  },
];
