/** Cluster R (Reddit-target answers) 7/10: R18–R20. */

export const REDDIT_7 = [
  {
    slug: "mileage-tracking-reddit",
    category: "taxes",
    publishedAt: "2026-07-25T19:00:00Z",
    title: "How Do People on Reddit Track Mileage for Taxes?",
    seoTitle: "How Reddit Tracks Mileage for Taxes (App Picks + Method)",
    seoDescription:
      "r/tax and r/selfemployed agree: use a GPS mileage app, keep it contemporaneous, and don't rely on gas receipts. The apps Reddit names and the log rules, verified.",
    excerpt:
      "r/selfemployed's mileage consensus: a GPS app doing the logging, MileIQ/Everlance/Stride the usual names, and the hard rule nobody escapes — contemporaneous or it doesn't count.",
    body: `Reddit's mileage-tracking threads — r/tax, r/selfemployed, r/rideshare — reach a firm consensus: **use a GPS mileage app** (it logs automatically, so the record is contemporaneous by construction), **classify trips promptly** (business vs. personal while you remember), and **understand that gas receipts aren't the point** under the standard mileage rate. The apps named most are MileIQ, Everlance, Stride (free), and the trackers built into QuickBooks Self-Employed. The threads exist because the alternative — reconstructing mileage in April — is the classic audit loss.

This is general information, not tax advice.

## The apps Reddit names

**MileIQ** — the veteran; swipe-to-classify, reliable auto-detection. **Everlance** — popular free tier, good for gig workers. **Stride** — free, aimed at self-employed and rideshare. **QuickBooks Self-Employed** — the pick when you want mileage inside your bookkeeping ([the integration logic](/blog/recording-receipts-bookkeeping)). The thread consensus on choosing: they all do the core job; pick by free-tier limits and whether you want mileage standalone or bundled with expense tracking. Rideshare drivers add that the platform's own mileage figure understates deductible miles (it omits between-fares and to-first-pickup driving), so a separate tracker usually wins.

## The rule Reddit can't repeat enough

**Contemporaneous or it doesn't count.** The most-upvoted mileage warnings all say it: the IRS wants records made "at or near the time" of the trip, and [courts routinely deny reconstructed mileage](/blog/audit-without-receipts-cohan-rule) — mileage falls under the strict-substantiation rules where the [Cohan estimate rule doesn't rescue you](/blog/audit-no-receipts-reddit). A GPS app solves this automatically by logging as you drive; the failure mode is letting weeks of unclassified trips pile up until the memory's gone. Classify weekly.

## What a compliant log needs (and apps produce)

The [log requirements](/blog/mileage-log-receipts) — date, destination, business purpose, miles, plus annual total and odometer readings — are exactly what app exports contain. The thread point: don't overthink the format, do respect the completeness. "Business purpose" is the field people skip and shouldn't ("client meeting — Acme," not blank).

## The gas-receipt confusion, cleared up

The recurring r/tax correction: under the **standard mileage rate** (70 cents/mile for 2025), fuel is *already included* — so gas receipts substantiate nothing and you don't need them. They only matter under the **actual expense method**, where you deduct the business-use share of real vehicle costs. Most self-employed people use the standard rate; most therefore need a mileage log and no gas receipts at all — a point that surprises posters every year. Parking and tolls remain separately deductible and do need receipts.

## The commuting trap the threads flag

r/tax regulars keep correcting the same error: home-to-regular-workplace is **commuting**, nondeductible under both methods no matter what an app logs. Deductible miles run between work locations, to client sites, or from a [qualifying home office](/blog/home-office-deduction-receipts) to business stops. Apps track the miles; you classify which ones actually qualify.

## The bottom line

Reddit's mileage playbook: a GPS app (MileIQ, Everlance, Stride, or QuickBooks) doing contemporaneous logging, weekly classification, gas receipts ignored under the standard rate, commuting excluded. Install one today rather than reconstructing next April — the reconstruction is the thing the threads are full of warnings about.`,
    faqs: [
      {
        q: "What mileage app does Reddit recommend?",
        a: "MileIQ, Everlance, Stride (free), and QuickBooks Self-Employed's built-in tracker are the most-named. All auto-log via GPS; choose by free-tier limits and whether you want mileage standalone or inside bookkeeping.",
      },
      {
        q: "Do I need gas receipts for the mileage deduction?",
        a: "Not under the standard mileage rate — fuel is already bundled into the per-mile figure, so the mileage log is the substantiation. Gas receipts only matter under the actual expense method.",
      },
      {
        q: "Why do Reddit threads stress contemporaneous logs?",
        a: "Because mileage falls under strict IRS substantiation, and courts routinely deny logs reconstructed from memory. A GPS app logs as you drive, making the record contemporaneous automatically — just classify trips weekly.",
      },
      {
        q: "Does my rideshare app's mileage figure cover my deduction?",
        a: "Usually it undercounts — platform mileage often omits between-fare and to-first-pickup driving, which is deductible. Reddit drivers run a separate GPS tracker to capture all business miles.",
      },
    ],
  },

  {
    slug: "audit-no-receipts-reddit",
    category: "taxes",
    publishedAt: "2026-07-26T17:00:00Z",
    title: "Audited Without Receipts? What r/tax and the Cohan Rule Say",
    seoTitle: "Audited Without Receipts? r/tax and the Cohan Rule",
    seoDescription:
      "r/tax's advice for audits without receipts: reconstruct from statements and vendors, know the Cohan rule's limits, and never fabricate. The consensus, verified against the law.",
    excerpt:
      "The 'I'm being audited and lost my receipts' posts get sober, useful answers on r/tax: reconstruct aggressively, understand what Cohan can and can't save, and don't make the fatal mistake.",
    body: `The dreaded r/tax post — "audited, don't have my receipts" — draws some of the subreddit's best answers, and they track the law well: **reconstruct from bank statements and vendor records** (this saves more audits than people expect), **understand the Cohan rule and its hard limits**, **get a professional for anything serious**, and above all **never fabricate documents** — the move that converts a records problem into a fraud case. Here's the r/tax consensus, verified.

This is general information, not tax advice; audit representation is a professional's job.

## "Reconstruct" — the advice that works

The top r/tax answers push back on despair: missing receipts rarely means lost deductions, because the record exists in fragments. The reconstruction ladder they describe ([the full playbook](/blog/audit-without-receipts-cohan-rule)):

- **Bank and card statements** — the transaction skeleton ([what they prove](/blog/bank-statement-as-proof-of-purchase)).
- **Vendor reprints** — [stores, restaurants, hotels reissue](/blog/how-to-replace-a-lost-receipt); online orders are itemized in your account.
- **Email archives** — confirmations are originals, not substitutes.
- **Calendars, contracts, logs** — establishing business purpose and pattern.

Organized reconstruction presented category-by-category reads as credibility; a shoebox of guesses doesn't. The threads are right that effort here is rewarded.

## The Cohan rule, per r/tax

The subreddit's tax pros explain [Cohan](/blog/audit-without-receipts-cohan-rule) accurately: when you prove an expense clearly happened but can't document the exact amount, courts may allow a *reasonable estimate* — resolving doubt against you. But they flag the critical limit every time: **Section 274(d) expenses get no Cohan estimate** — travel, meals, and vehicle/listed property require strict substantiation, so missing records there generally mean full disallowance ([why mileage logs matter](/blog/mileage-tracking-reddit)). The thread summary: Cohan is a partial safety net for general expenses, useless for the categories most people lose receipts in.

## The mistake that turns bad into catastrophic

Every serious r/tax audit thread contains the warning: **do not create fake receipts to fill gaps.** Reconstruction from real evidence is legitimate; fabricating a document is [civil fraud (75% penalties) or criminal exposure](/blog/receipt-fraud-explained) — trading a manageable adjustment for a disaster. The posters who float "can I just recreate them?" get firmly corrected: recreating a record of a real purchase for your *own files* is one thing, but presenting fabrications to an auditor as originals is the line you never cross. The [affidavit-and-reconstruction path](/blog/lost-receipt-expense-report) exists precisely so honesty is available.

## The "get a pro" consensus

r/tax reliably recommends professional representation (EA or CPA) for anything beyond a simple correspondence audit — not because DIY is impossible but because representation changes tone, catches Cohan opportunities you'd miss, and keeps you from volunteering damage. The threads treat the fee as cheap insurance against a bad outcome. What examiners actually receive — [organized digital records reconciling to a ledger](/blog/irs-receipt-photos-reddit) — is what a pro helps you assemble.

## The bottom line

r/tax's audit-without-receipts wisdom is sound: reconstruct hard from statements, vendors and email; know Cohan helps general expenses but not travel/meals/mileage; get representation for anything real; and never, ever fabricate. The best thread advice, though, is preventive — the [capture-everything systems](/blog/self-employed-receipt-tracking) that make this entire scenario a non-event next time.`,
    faqs: [
      {
        q: "What does r/tax say to do if audited without receipts?",
        a: "Reconstruct from bank statements, vendor reprints and email confirmations; present it organized by category; know the Cohan rule's limits; get professional representation for serious audits; and never fabricate documents.",
      },
      {
        q: "Can the Cohan rule save deductions without receipts?",
        a: "Partially, for general expenses — courts may allow a reasonable estimate when an expense clearly occurred. But it doesn't apply to travel, meals or vehicle expenses, which require strict substantiation and get disallowed without records.",
      },
      {
        q: "Is it OK to recreate receipts for an audit?",
        a: "No — presenting fabricated documents to an auditor is fraud, escalating penalties dramatically. Legitimate reconstruction uses real evidence (statements, vendor reprints, email). The two are entirely different acts.",
      },
      {
        q: "Should I hire someone for an IRS audit?",
        a: "For anything beyond a simple correspondence audit, r/tax strongly recommends an EA or CPA — representation improves tone, surfaces Cohan opportunities, and prevents you from volunteering harmful information. The fee is cheap insurance.",
      },
    ],
  },

  {
    slug: "expensify-vs-ramp-reddit",
    category: "expenses",
    publishedAt: "2026-07-26T18:30:00Z",
    title: "Expensify vs. Ramp vs. Concur: What Reddit Users Actually Say",
    seoTitle: "Expensify vs. Ramp vs. Concur: What Reddit Says",
    seoDescription:
      "Reddit's expense-software consensus: Ramp for modern free card-based expensing, Expensify for flexibility, Concur for big enterprises that have to. The verdicts, verified.",
    excerpt:
      "r/accounting and r/smallbusiness have opinions: Ramp is the darling, Expensify the veteran, Concur the one people are stuck with. What the threads actually say about each.",
    body: `Reddit's expense-software threads — r/accounting, r/smallbusiness, r/fintech — have a clear pecking order in the mid-2020s: **Ramp is the darling** (free, card-first, modern), **Expensify the flexible veteran** (works without adopting a card program, loved and occasionally grumbled about on pricing), and **Concur the enterprise incumbent** people describe being *stuck with* rather than choosing. The consensus is less about features than fit — company size and whether you'll adopt the vendor's corporate card decide it.

This is general information, not a vendor endorsement.

## Ramp: Reddit's current favorite

The threads' enthusiasm is consistent: Ramp is free (it monetizes via card interchange, not subscriptions), the card-plus-software model auto-captures most expenses at the source, and receipt matching is strong — the corporate card feed and the receipt meet automatically, killing the reconciliation chase ([why that matters](/blog/expense-report-tips-reddit)). The caveat r/accounting raises: it's card-centric, so it fits companies willing to run spend on Ramp cards; it's a weaker fit if you need to expense across existing cards you won't replace.

## Expensify: the flexible veteran

Expensify's Reddit reputation is "it just works, and it works without changing your cards." SmartScan receipt capture is well-regarded, it handles reimbursement for out-of-pocket spend (not just card transactions), and it integrates broadly. The grumbles: per-user pricing that adds up, and some UX-churn complaints. The thread verdict: the safe pick when you need reimbursement flexibility rather than a card program, and the one most likely to fit a mixed setup.

## Concur: the one you're stuck with

r/accounting's Concur threads have a distinct tone — resignation. It's the enterprise standard (deep ERP integration, travel booking, compliance controls big companies require), which means large orgs use it because they must, while smaller ones find it heavy and dated versus Ramp/Expensify. Nobody on Reddit recommends Concur to a small business; plenty explain why enterprises can't easily leave it. Its strength is exactly its weight: the controls and integrations that justify it at scale.

## What the threads agree matters more than the tool

The recurring meta-point from the approver-heavy threads: the software only helps if the [capture and submission habits](/blog/organize-receipts-reddit) are there — all three tools reward capture-at-payment and punish 60-day megareports equally. And all three run on the same underlying discipline: [itemized receipts where required](/blog/itemized-receipt-guide), context notes on meals, prompt submission. The tool automates matching and approval; it doesn't create the receipts or the honesty.

## The bottom line

Reddit's verdict: Ramp if you'll run spend on its cards and want free + modern, Expensify for flexible reimbursement without changing cards, Concur if you're an enterprise that needs (or is stuck with) its depth. Match to company size and card strategy, then — the part the threads insist on — actually build the capture habits, because no expense platform fixes receipts you never captured.`,
    faqs: [
      {
        q: "What expense software does Reddit recommend?",
        a: "Ramp is the current favorite (free, card-first, modern), Expensify the flexible veteran for reimbursement without changing cards, and Concur the enterprise incumbent that large orgs use out of necessity. Fit depends on company size and card strategy.",
      },
      {
        q: "Is Ramp really free?",
        a: "Yes — Ramp monetizes through card interchange rather than subscription fees, which is why Reddit favors it for cost. The trade-off is its card-centric model: it fits best when you'll run company spend on Ramp cards.",
      },
      {
        q: "Why do people dislike Concur on Reddit?",
        a: "It's seen as heavy and dated compared to newer tools — enterprises use it for deep ERP integration and compliance controls, but smaller companies find it cumbersome. Reddit threads describe being stuck with it, not choosing it.",
      },
      {
        q: "Does expense software eliminate the need for receipts?",
        a: "No — it automates matching and approval, but you still need itemized receipts where required and context notes on meals. All three tools reward capture-at-payment habits and can't fix receipts you never captured.",
      },
    ],
  },
];
