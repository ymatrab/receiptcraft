/** Cluster H (Legal) spokes 1/3: H2–H4. */

export const SPOKES_H1 = [
  {
    slug: "receipt-fraud-explained",
    category: "legal",
    publishedAt: "2026-07-12T16:00:00Z",
    title: "What Is Receipt Fraud and What Are the Penalties?",
    seoTitle: "Receipt Fraud: Types, Penalties & How It's Caught",
    seoDescription:
      "Receipt fraud spans return fraud, expense fraud, tax fraud and warranty fraud — with penalties from termination to felony charges. The forms, the law, and the detection.",
    excerpt:
      "Same document, four crimes: returns, expenses, taxes and warranties are where fake or altered receipts become fraud charges. What each form looks like and what it actually costs.",
    body: `Receipt fraud is using a fabricated, altered or misappropriated receipt to obtain something you're not entitled to — a refund, a reimbursement, a tax deduction, a warranty replacement. The document is incidental; the deception is the crime. Depending on context and amount, it's prosecuted as theft, forgery, wire fraud or tax fraud, with consequences running from firing and civil liability to felony convictions.

This is general information, not legal advice.

## The four main forms

1. **Return fraud** — fake or altered receipts used to return stolen or ineligible merchandise, or to return items at inflated prices. Retail's costliest receipt problem: industry surveys put fraudulent returns in the tens of billions of dollars annually in the US.
2. **Expense fraud** — fabricated or inflated receipts on expense reports: the invented client dinner, the altered taxi fare, the resubmitted duplicate. Classified as occupational fraud; a standard termination-and-prosecution offense ([the honest alternatives](/blog/lost-receipt-expense-report) exist precisely so nobody needs this).
3. **Tax fraud** — fake receipts manufactured to support deductions that never happened. This escalates a substantiation problem into civil fraud penalties (75% of the underpayment) or criminal exposure ([what audits actually do](/blog/audit-without-receipts-cohan-rule) about missing records is far gentler).
4. **Warranty and insurance fraud** — receipts forged to claim coverage for ineligible items, inflate claimed values, or fake purchase dates.

## What the law actually charges

There's rarely a statute called "receipt fraud" — prosecutors use the general toolbox: **theft/larceny** (the refund or reimbursement obtained), **forgery** (making or altering a document with intent to defraud — a felony in most states), **fraud statutes** (wire and mail fraud federally, where amounts or patterns justify it), and **falsifying business records**. Amount thresholds decide misdemeanor vs. felony in most states; patterns and organized activity aggravate. Civil consequences stack on top: restitution, treble damages in some contexts, and retail civil recovery demands.

## The context that decides everything

Making a receipt is not inherently illegal — businesses do it with every sale, and [legitimate uses](/blog/is-it-legal-to-make-your-own-receipt) (issuing receipts for your own real transactions, reconstructing records of real purchases, props, design, testing) involve no deception. The line is intent and use: the same PDF is lawful as your own record of a real purchase and criminal the moment it's presented to a store, employer, insurer or tax authority as something it isn't. That line is bright, and every serious tool states it — ours included: [Makecepeit's generator](/create) exists for the legitimate list.

## How it gets caught

Retailers verify against their own transaction databases ([how stores verify receipts](/blog/how-stores-verify-receipts)) — a receipt whose number doesn't exist in the system fails instantly. Employers cross-check card feeds, catch duplicate submissions algorithmically, and audit patterns ([how businesses detect fakes](/blog/how-to-spot-a-fake-receipt)). The IRS matches claimed expenses against bank records. Detection has quietly industrialized; the fabricated receipt is a bet against databases that remember everything.

## The bottom line

Receipt fraud is ordinary fraud wearing a small document. The penalties scale with amount and pattern — from firing, to restitution, to felony forgery — and the detection is systematic. The legitimate paths (honest reimbursement substitutes, real records, reconstruction labeled as such) cost nothing; the dishonest one prices in your job, your record and occasionally your liberty.`,
    faqs: [
      {
        q: "Is making a fake receipt illegal?",
        a: "Making a receipt becomes illegal when it's used to deceive — obtaining refunds, reimbursements, deductions or coverage. Creating a record of your own real transaction, a prop, or a test document involves no deception and no crime.",
      },
      {
        q: "What are the penalties for fake receipts on expense reports?",
        a: "Termination is near-universal; employers also pursue restitution and, at meaningful amounts, criminal charges (theft, falsifying records). The IRS adds civil fraud penalties when tax filings relied on fabricated documents.",
      },
      {
        q: "Is receipt fraud a felony?",
        a: "It can be: forgery is a felony in most states, and theft crosses into felony at state-specific amount thresholds (commonly $500–2,500). Small single instances may be charged as misdemeanors; patterns aggravate.",
      },
      {
        q: "How do companies detect receipt fraud?",
        a: "Database verification (does the transaction exist?), card-feed cross-checks, duplicate-detection algorithms, and pattern analytics across employees and returners. Modern detection assumes documents can be checked, not just read.",
      },
    ],
  },

  {
    slug: "how-stores-verify-receipts",
    category: "legal",
    publishedAt: "2026-07-15T16:00:00Z",
    title: "How Do Stores Verify Receipts?",
    seoTitle: "How Stores Verify Receipts (Returns Desk Mechanics)",
    seoDescription:
      "Stores verify receipts by looking up the transaction in their own database — the barcode is the key. The verification stack, from POS lookup to return-fraud scoring.",
    excerpt:
      "The returns desk isn't reading your receipt — it's querying it. How transaction databases, barcode lookups and fraud scoring actually verify receipts, layer by layer.",
    body: `Stores verify receipts by checking their own records, not by examining paper. The barcode or receipt number is a database key: scanned at the returns desk, it either retrieves the original transaction — items, prices, payment, prior returns against it — or it doesn't exist and the receipt fails. Paper inspection is a fallback; the system of record is the POS database, which is why altered dates and inflated prices fail against the store's own copy of the truth.

## Layer 1: the transaction lookup

Every sale writes a permanent record; the receipt's [barcode encodes its address](/blog/receipt-qr-codes-barcodes). At verification, the scan pulls the original: the desk sees what was actually sold, at what price, on what tender — and whether this receipt already funded a return (used receipts are flagged, killing the double-return play). No matching record = no valid receipt, however convincing the paper. This is also why [reprints and lookups](/blog/how-to-replace-a-lost-receipt) work: the record, not the paper, is the receipt.

## Layer 2: payment-card matching

No paper? The desk searches by the card: transactions indexed by (tokenized) card number plus date range reconstruct the purchase — the mechanics behind every [no-receipt return](/blog/return-without-receipt-policies). It cuts the other way too: a receipt claiming a Visa payment that the system shows as cash is a caught alteration.

## Layer 3: the human checks

Staff still eyeball the paper for the obvious: date plausibility, store number consistency, item codes that belong to the chain, fonts and layout matching the house format, and totals that arithmetic supports. These catch casual fakes; the database catches good ones ([the tells businesses look for](/blog/how-to-spot-a-fake-receipt) run deeper on the fraud-detection side).

## Layer 4: return-fraud scoring

Behind the desk, retailers run return-behavior analytics — in-house or via third-party services that score returners across stores. High-frequency no-receipt returns, serial gift-receipt returns and geographic patterns trigger refusals independent of any single receipt's validity ("we can't accept this return" with a slip to an 800 number). ID capture at no-receipt returns feeds exactly this system.

## What this means for honest customers

Keep the barcode legible ([photograph receipts](/blog/receipt-organization-systems) — the barcode is the recoverable part), pay traceably where returns are plausible, and know that a lost receipt is rarely fatal precisely because verification runs on the store's records, not your paper. The gift-receipt path exists for presents ([how gift receipts work](/blog/gift-receipt-explained)); the ID-verified path exists for everything else.

## What this means for anyone tempted otherwise

A fabricated or altered receipt isn't tested against a clerk's eye — it's tested against the database that generated every genuine receipt the store has ever printed. The transaction either exists or it doesn't; the consequences when it doesn't are in [what receipt fraud costs](/blog/receipt-fraud-explained). The asymmetry is total, and it's the honest customer's protection: verification that catches fakes is the same machinery that makes your real lost receipt recoverable.

## The bottom line

The receipt is a pointer; the store's database is the document. Verification = dereference the pointer, compare, score the behavior around it. Keep barcodes, pay traceably, and the system works for you rather than against you.`,
    faqs: [
      {
        q: "Can stores tell if a receipt is fake?",
        a: "Usually instantly: the barcode or receipt number either matches a transaction in the store's own database — with the same items, prices and payment — or it doesn't. Paper inspection is secondary to the record lookup.",
      },
      {
        q: "What does the returns desk see when they scan my receipt?",
        a: "The original transaction: every item and price, the payment method, and any returns already processed against that receipt. Partial returns and reprint history are visible too.",
      },
      {
        q: "Why was my legitimate return declined?",
        a: "Common causes: the return window closed, the item's condition, or return-behavior scoring — frequent no-receipt returns across retailers can trigger refusals via third-party fraud services, independent of this purchase's validity.",
      },
      {
        q: "Do stores verify receipts from other stores?",
        a: "They can't query each other's databases — cross-store verification falls back to human checks and phone calls, which is why some retailers simply refuse third-party receipts for their processes.",
      },
    ],
  },

  {
    slug: "how-to-spot-a-fake-receipt",
    category: "legal",
    publishedAt: "2026-07-16T16:00:00Z",
    title: "How Do Businesses Detect Fake Receipts?",
    seoTitle: "How Businesses Detect Fake Receipts (The Checks That Work)",
    seoDescription:
      "Finance teams and auditors catch fake receipts through arithmetic errors, database mismatches, metadata, duplicate detection and behavioral patterns. The detection stack.",
    excerpt:
      "Bad math, impossible tax rates, reused receipt numbers, file metadata, card-feed mismatches — the checks that catch fabricated receipts, from the reviewer's side of the desk.",
    body: `Businesses detect fake receipts with a stack of checks: **arithmetic** (items must sum; tax must match the jurisdiction's actual rate), **reference validation** (does the merchant exist, does the receipt number fit its format, does the transaction appear in card feeds?), **format forensics** (fonts, layouts and codes that don't match the claimed merchant), **file metadata** on digital submissions, and **pattern analytics** (duplicates, thresholds-gaming, vendor anomalies across time). Single checks catch lazy fakes; the stack catches careful ones.

Written for reviewers, auditors and owners — the defensive side of the topic covered in [what receipt fraud is](/blog/receipt-fraud-explained).

## Check 1: the arithmetic

Fabricators routinely fumble math: line items that don't sum to the subtotal, tax computed at a rate the claimed city doesn't charge (sales-tax rates are public and specific — 8.875% in NYC, not 8.5%), tips that change the total inconsistently, rounding that no register produces. Recompute everything; a receipt that fails its own arithmetic fails, full stop.

## Check 2: does the reference world agree?

The merchant should exist at the claimed address with the claimed phone; the [receipt number should fit the merchant's format](/blog/what-is-a-receipt-number) and never repeat across submissions; the expense should appear in the corporate-card feed at the same merchant, date and amount ([the statement cross-check](/blog/bank-statement-as-proof-of-purchase) is the workhorse); and for meals, the restaurant should have been open that Tuesday. Retailers extend this to full database verification ([their machinery](/blog/how-stores-verify-receipts)); employers approximate it with feeds and spot calls.

## Check 3: format forensics

Real receipts have house styles: chain receipts follow chain layouts (store numbers, SKU formats, footer text), thermal receipts have [thermal typography](/blog/thermal-receipt-printers-guide) — monospaced, 32/48-character lines, specific truncations ([the grocery dialect](/blog/how-to-make-a-grocery-receipt) is hard to improvise). Tells: proportional fonts where monospace belongs, perfect kerning on a "register" receipt, missing the codes every real receipt of that chain carries, laser-crisp printing claimed as a pocket-aged thermal slip.

## Check 4: the file itself

Digital submissions carry metadata: creation software (a "photo" authored by an image editor invites questions), creation dates postdating the claimed purchase, dimensions matching screenshots of templates rather than camera output, and EXIF absence where a phone photo should have it. None is proof alone; each is a thread to pull.

## Check 5: the patterns

The strongest detection is longitudinal: duplicate receipts across reports or employees (submission-hash matching catches the same image twice), expenses clustering just under receipt thresholds ([policy thresholds](/blog/expense-receipt-policy) create visible bunching when gamed), one employee's vendors never appearing in anyone else's reports, and missing-receipt affidavits at outlier frequency. Modern expense systems automate most of this — the human's job is the follow-up conversation.

## Process notes for teams

Verify before accusing: most anomalies are innocent (reprints, split payments, [legitimate reconstructions](/blog/is-it-legal-to-make-your-own-receipt) properly labeled). Escalate on evidence, document the checks you ran, and design policy so honesty is cheap — clear substitutes for [lost receipts](/blog/lost-receipt-expense-report) remove the temptation that produces most amateur fakes.

## The bottom line

Recompute the math, cross-check the feeds, respect the house formats, read the metadata, watch the patterns. Fakes fail one of the five with remarkable reliability — and the same stack, run calmly, clears the honest majority faster too.`,
    faqs: [
      {
        q: "What's the fastest way to check a suspicious receipt?",
        a: "Arithmetic first: do the items sum, and is the tax rate the jurisdiction's real one? Then the card feed: does a matching charge exist at that merchant, date and amount? Those two checks resolve most cases.",
      },
      {
        q: "Can fake receipts be detected from the file?",
        a: "Often — metadata showing editing software, creation dates after the claimed purchase, or screenshot dimensions instead of camera output all flag submissions for closer review. Absence of tells doesn't prove authenticity, though.",
      },
      {
        q: "What patterns indicate expense fraud?",
        a: "Duplicated receipt images across reports, amounts bunched just under receipt-required thresholds, vendors unique to one employee, and unusually frequent missing-receipt affidavits — pattern analytics catch what single-document review misses.",
      },
      {
        q: "What should I do if I suspect a fake receipt?",
        a: "Verify quietly first — reprints, split payments and mislabeled documents explain many anomalies. Document your checks, escalate per policy with evidence, and let HR/legal run the conversation. Accusation before verification is the expensive mistake.",
      },
    ],
  },
];
