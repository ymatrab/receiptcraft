# Blog Content Plan — 120 Articles, Question/How-To First

**Optimized for AI citation (AEO/GEO):** every title is a question or a how-to — the two
formats ChatGPT, Perplexity and Google AI Overviews cite most, because they map 1:1 onto
what users ask. 100 articles drip over 15 days, then 20 short "quick answer" posts sustain
cadence in weeks 3–4.

**Scheduling:** load everything into Sanity now with future `publishedAt` dates — the site
only shows posts whose date has passed, so publishing is automatic. Day 1 = **2026-07-03**.
8 hubs on Day 1, ~7 spokes/day through Day 15, then 1–2 quick answers/day through Day 30.

**Why drip:** Google targets "scaled content abuse"; 100 URLs in one crawl on a young domain
invites the classifier. A steady 7/day with real depth reads as an active editorial site and
spreads GSC indexation load.

## The AI-citation formula (apply to every article)

1. **H1 = the exact question people ask.** AI engines match questions to questions.
2. **Answer in the first 40–60 words.** A self-contained, quotable paragraph directly under
   the H1 — this is the passage AI extracts. No throat-clearing.
3. **Question-form H2s** covering the follow-up questions (mine "People Also Ask" for each keyword).
4. **How-to posts: numbered steps** with one action per step — step lists get quoted verbatim.
5. **Facts as standalone sentences** ("The IRS requires receipts for expenses of $75 or more.")
   — AI cites sentences, not paragraphs. One fact per sentence, with source linked.
6. **A comparison table** wherever two things are compared — tables are extraction gold.
7. **3–5 FAQ entries** in the Sanity `faqs` field (renders with FAQPage JSON-LD).
8. **E-E-A-T:** real author byline + bio; tax/legal posts cite IRS.gov/statutes and carry a
   "not tax/legal advice" line. Stats posts list methodology/sources — stat pages are the
   single most-cited page type in AI answers.
9. **Internal links:** spoke→hub, 2 sibling spokes, and the matching `/templates/*` or `/create`.
10. **Vary length** (spokes 1,200–1,800; hubs 2,000–2,500; quick answers 600–900). Identical
    lengths fingerprint as generated content.

## Publishing calendar

| Phase | Days | Volume |
|---|---|---|
| Launch | Day 1 (Jul 3) | 8 hubs |
| Core drip | Days 2–15 | ~7 spokes/day (92 posts) |
| Sustain | Days 16–30 | 1–2 quick answers/day (20 posts) + hub link QA |

---

## Cluster A — Receipt Basics (hub + 11)

| # | Day | Title (H1 = the query) | Slug |
|---|---|---|---|
| A1 | 1 | What Is a Receipt? Types, Required Fields and Examples | what-is-a-receipt |
| A2 | 2 | What's the Difference Between a Receipt and an Invoice? | receipt-vs-invoice |
| A3 | 4 | What Is a Receipt Number and How Is It Generated? | what-is-a-receipt-number |
| A4 | 5 | What Information Must a Receipt Include? | parts-of-a-receipt |
| A5 | 6 | What Counts as Proof of Purchase? | what-counts-as-proof-of-purchase |
| A6 | 8 | How Do Gift Receipts Work? | gift-receipt-explained |
| A7 | 9 | What Is an Itemized Receipt and When Do You Need One? | itemized-receipt-guide |
| A8 | 10 | What Are the Different Types of Receipts? (12 Kinds Explained) | types-of-receipts |
| A9 | 11 | What Is a Cash Receipt and How Do You Write One? | cash-receipt-definition |
| A10 | 12 | Sales Receipt vs. Purchase Order vs. Invoice: What's the Difference? | sales-receipt-vs-purchase-order |
| A11 | 13 | What Do the Codes on a Credit Card Receipt Mean? | credit-card-receipt-explained |
| A12 | 14 | Why Do Receipts Exist? A Short History | history-of-receipts |

## Cluster B — Lost & Replacement Receipts (hub + 13)

Highest-intent cluster: each store guide documents the official reprint path first (genuinely
useful → ranks → cited), then offers `/create` for recreating records of real purchases.

| # | Day | Title | Slug |
|---|---|---|---|
| B1 | 1 | How Do You Replace a Lost Receipt? Every Option Explained | how-to-replace-a-lost-receipt |
| B2 | 2 | How to Look Up and Reprint a Walmart Receipt | walmart-receipt-lookup |
| B3 | 3 | How to Download an Amazon Receipt or Invoice | amazon-receipt-download |
| B4 | 4 | How to Find an Old Target Receipt (4 Ways) | target-receipt-lookup |
| B5 | 5 | How to Reprint a Home Depot or Lowe's Receipt | home-depot-lowes-receipt-reprint |
| B6 | 7 | How to Get a Copy of a Costco Receipt | costco-receipt-copy |
| B7 | 8 | How to Download Uber and Lyft Trip Receipts | uber-lyft-receipt-download |
| B8 | 9 | How to Get a Receipt From Delta, United, American or Southwest | airline-receipt-retrieval |
| B9 | 10 | How to Request a Hotel Folio After Checkout | hotel-folio-after-checkout |
| B10 | 11 | How to Get a Gas Station Receipt After Driving Off | gas-station-receipt-copy |
| B11 | 3 | Why Do Receipts Fade? (And How to Read a Faded One) | why-receipts-fade |
| B12 | 12 | Can You Return Something Without a Receipt? 15 Store Policies | return-without-receipt-policies |
| B13 | 13 | Can You Claim a Warranty Without a Receipt? | warranty-claim-without-receipt |
| B14 | 14 | Can a Bank Statement Replace a Receipt? | bank-statement-as-proof-of-purchase |

## Cluster C — Expense Reports & Reimbursement (hub + 11)

| # | Day | Title | Slug |
|---|---|---|---|
| C1 | 1 | What Receipts Do You Need for an Expense Report? | expense-report-receipts-guide |
| C2 | 2 | Does the IRS Require Receipts Under $75? The Rule Explained | irs-75-dollar-receipt-rule |
| C3 | 3 | What Should You Do If You Lost a Receipt for an Expense Report? | lost-receipt-expense-report |
| C4 | 5 | Should You Use Per Diem or Actual Expenses? | per-diem-vs-actual-expenses |
| C5 | 6 | Do You Need Receipts for Mileage Deductions? | mileage-log-receipts |
| C6 | 7 | What Are the Receipt Rules for Business Meals? (50% vs 100%) | meal-receipts-business-expenses |
| C7 | 8 | How to Organize Receipts for Expense Reports (5 Systems) | organize-receipts-expense-reports |
| C8 | 10 | What Receipts Do You Need for Business Travel? A Checklist | business-travel-receipt-checklist |
| C9 | 11 | Why Do Companies Require Itemized Hotel Receipts? | itemized-hotel-receipt-reimbursement |
| C10 | 12 | What Should an Expense Receipt Policy Include? | expense-receipt-policy |
| C11 | 13 | When Must Employers Reimburse Employee Expenses? | employee-reimbursement-rules |
| C12 | 15 | How to Make Receipts Work With Expensify, Concur and Ramp | receipts-for-expense-software |

## Cluster D — Small Business Receipts (hub + 13)

| # | Day | Title | Slug |
|---|---|---|---|
| D1 | 1 | How to Write a Receipt (Step by Step, With Examples) | how-to-write-a-receipt |
| D2 | 2 | How to Write a Rent Receipt (+ Free Template) | how-to-write-a-rent-receipt |
| D3 | 4 | What Must a Security Deposit Receipt Include? | security-deposit-receipt |
| D4 | 5 | How to Write a Receipt for a Cash Payment | cash-payment-receipt-services |
| D5 | 6 | Should You Use a Receipt Book or Digital Receipts? | receipt-book-vs-digital |
| D6 | 7 | Are Businesses Legally Required to Give Receipts? | are-receipts-legally-required |
| D7 | 9 | Are Handwritten Receipts Valid? | handwritten-receipts-valid |
| D8 | 10 | What Are the Receipt Requirements in the US, UK, EU, Canada and Australia? | receipt-requirements-by-country |
| D9 | 11 | How Should You Number Receipts? 4 Systems That Scale | how-to-number-receipts |
| D10 | 12 | When Should Freelancers Issue Receipts? | freelancer-receipts |
| D11 | 13 | How to Write a Deposit or Partial Payment Receipt | partial-payment-receipt |
| D12 | 14 | What Must a 501(c)(3) Donation Receipt Include? | donation-receipt-requirements |
| D13 | 14 | What Should a Receipt for Services Rendered Include? | receipt-for-services-rendered |
| D14 | 15 | How to Issue Professional Receipts Without a POS System | receipts-without-pos-system |

## Cluster E — Taxes & Bookkeeping (hub + 11)

| # | Day | Title | Slug |
|---|---|---|---|
| E1 | 1 | Which Receipts Should You Keep for Taxes? | receipts-to-keep-for-taxes |
| E2 | 2 | How Long Should You Keep Receipts? | how-long-to-keep-receipts |
| E3 | 3 | Does the IRS Accept Scanned Receipts? | scanned-receipts-irs |
| E4 | 4 | How Should Self-Employed People Track Receipts? | self-employed-receipt-tracking |
| E5 | 6 | What Receipts Do You Need for the Home Office Deduction? | home-office-deduction-receipts |
| E6 | 7 | Which Small-Business Tax Deductions Require Receipts? | small-business-deductions-receipts |
| E7 | 8 | What Happens If You're Audited Without Receipts? The Cohan Rule | audit-without-receipts-cohan-rule |
| E8 | 9 | What's the Best Way to Organize Receipts? 7 Systems Compared | receipt-organization-systems |
| E9 | 11 | How Do You Record Receipts in Bookkeeping? | recording-receipts-bookkeeping |
| E10 | 12 | What Makes a Receipt VAT-Valid? (UK/EU) | vat-receipt-explained |
| E11 | 13 | GST Receipt vs. Tax Invoice: What's the Difference? | gst-receipt-tax-invoice |
| E12 | 14 | What Receipts Do You Need for Charitable Donations? | charitable-donation-receipt-taxes |

## Cluster F — How to Make Every Kind of Receipt (hub + 13)

Conversion cluster — every post deep-links its `/templates/*` page and `/create`, with
numbered steps (step lists are quoted verbatim by AI engines).

| # | Day | Title | Slug |
|---|---|---|---|
| F1 | 1 | How to Make a Receipt Online (Free, No Sign-Up) | how-to-make-a-receipt-online |
| F2 | 2 | How to Make a Restaurant Receipt (Tax + Tip Done Right) | how-to-make-a-restaurant-receipt |
| F3 | 3 | How to Make a Gas Station Receipt (Gallons, Grade, Pump) | how-to-make-a-gas-receipt |
| F4 | 4 | How to Make a Taxi or Rideshare Receipt | how-to-make-a-taxi-receipt |
| F5 | 5 | How to Make a Hotel Receipt (Folio Format Explained) | how-to-make-a-hotel-receipt |
| F6 | 6 | How to Make a Grocery Store Receipt | how-to-make-a-grocery-receipt |
| F7 | 7 | How to Make a Parking Receipt | how-to-make-a-parking-receipt |
| F8 | 8 | How to Make a Daycare Receipt for Child-Care Tax Credits | how-to-make-a-daycare-receipt |
| F9 | 9 | How to Make a Cleaning Service Receipt | how-to-make-a-cleaning-receipt |
| F10 | 10 | How to Make a Contractor or Handyman Receipt | how-to-make-a-contractor-receipt |
| F11 | 11 | How to Make a Salon or Barber Receipt | how-to-make-a-salon-receipt |
| F12 | 12 | How to Make an Auto Repair Receipt (Parts + Labor) | how-to-make-an-auto-repair-receipt |
| F13 | 13 | How to Make a Catering Receipt or Invoice | how-to-make-a-catering-receipt |
| F14 | 15 | How to Make a Tutoring Receipt Parents Can Submit | how-to-make-a-tutoring-receipt |

## Cluster G — Digital Receipts & Receipt Tech (hub + 10)

| # | Day | Title | Slug |
|---|---|---|---|
| G1 | 1 | What Are Digital Receipts and How Do They Work? | digital-receipts-guide |
| G2 | 3 | How Should Businesses Send Email Receipts? Best Practices | email-receipt-best-practices |
| G3 | 4 | What's the Best Receipt Scanning App? 8 Tested | best-receipt-scanning-apps |
| G4 | 6 | How Does Receipt OCR Work? | how-receipt-ocr-works |
| G5 | 5 | How Do Thermal Receipt Printers Work? (58mm vs 80mm) | thermal-receipt-printers-guide |
| G6 | 7 | What Size Is Receipt Paper? A Buyer's Guide | receipt-paper-sizes |
| G7 | 9 | What Do the QR Codes and Barcodes on Receipts Do? | receipt-qr-codes-barcodes |
| G8 | 10 | What Do Stores Learn When You Choose an Email Receipt? | e-receipt-privacy |
| G9 | 11 | Why Do Receipts Look Like That? Fonts, Caps and Dot Matrix | why-receipts-look-like-that |
| G10 | 13 | How to Switch Your Business to Digital Receipts | switch-to-digital-receipts |
| G11 | 14 | How Are Receipts Designed? Layout Rules From Real POS Systems | receipt-design-guide |

## Cluster H — Legality & Responsible Use (hub + 10)

Anti-fraud/awareness angle — protects the domain's E-E-A-T in a sensitive niche.

| # | Day | Title | Slug |
|---|---|---|---|
| H1 | 1 | Is It Legal to Make Your Own Receipt? | is-it-legal-to-make-your-own-receipt |
| H2 | 2 | What Is Receipt Fraud and What Are the Penalties? | receipt-fraud-explained |
| H3 | 5 | How Do Stores Verify Receipts? | how-stores-verify-receipts |
| H4 | 6 | How Do Businesses Detect Fake Receipts? | how-to-spot-a-fake-receipt |
| H5 | 8 | Is a Receipt a Legal Document? When Receipts Count as Evidence | receipts-as-legal-documents |
| H6 | 9 | How Do You Make Prop Receipts for Film and Theatre? | prop-receipts-film-design |
| H7 | 10 | How Do You Use Realistic Receipts in UI/UX Mockups? | receipts-ui-ux-mockups |
| H8 | 12 | 25 Receipt Statistics for 2026 (Paper Waste, Digital Adoption) | receipt-statistics |
| H9 | 13 | Why Do Cashiers Ask If You Want Your Receipt? | why-stores-ask-receipt |
| H10 | 14 | Is BPA in Receipt Paper Dangerous? What the Research Says | bpa-receipt-paper |
| H11 | 15 | Can Stores Legally Check Your Receipt at the Exit? | store-receipt-checks-rights |

## Cluster Q — Quick Answers (20 posts, Days 16–30, 1–2/day)

Pure People-Also-Ask capture: 600–900 words, answer in the first sentence, one FAQ block.
These are the cheapest posts to write and the likeliest to be quoted word-for-word by AI.

| # | Day | Title | Slug |
|---|---|---|---|
| Q1 | 16 | Do Receipts Show Your Full Credit Card Number? | do-receipts-show-card-number |
| Q2 | 16 | What Does "Amount Tendered" Mean on a Receipt? | amount-tendered-meaning |
| Q3 | 17 | What Does SKU Mean on a Receipt? | sku-meaning-receipt |
| Q4 | 17 | Why Is There a Survey Code on My Receipt? | receipt-survey-code |
| Q5 | 18 | Can You Use a Picture of a Receipt for a Return? | picture-of-receipt-return |
| Q6 | 18 | Do Stores Keep Copies of Receipts? | do-stores-keep-receipt-copies |
| Q7 | 19 | What Is a Duplicate Receipt? | duplicate-receipt-meaning |
| Q8 | 20 | What Does VOID Mean on a Receipt? | void-receipt-meaning |
| Q9 | 20 | Are Receipts Recyclable? | are-receipts-recyclable |
| Q10 | 21 | Can Receipts Be Used as Evidence in Court? | receipts-evidence-court |
| Q11 | 22 | What Is a Till Receipt? | what-is-a-till-receipt |
| Q12 | 23 | What's the Difference Between a Receipt and a Ticket? | receipt-vs-ticket |
| Q13 | 24 | How Do You Prove a Purchase Without a Receipt? | prove-purchase-without-receipt |
| Q14 | 24 | Why Does My Receipt Say "Customer Copy"? | customer-copy-receipt-meaning |
| Q15 | 25 | What Is a Pro Forma Invoice (and Is It a Receipt)? | pro-forma-invoice-vs-receipt |
| Q16 | 26 | How Do Restaurants Split a Receipt? | how-restaurants-split-receipts |
| Q17 | 27 | What Does "Cash Back" Mean on a Receipt? | cash-back-receipt-meaning |
| Q18 | 28 | What Does "Reprint" Mean on a Receipt? | reprint-receipt-meaning |
| Q19 | 29 | How Do You Email a Receipt to Yourself? | email-receipt-to-yourself |
| Q20 | 30 | What Is an Official Receipt? | what-is-an-official-receipt |

---

## Execution checklist

1. **Sanity setup (once):** 1 real author (name, photo, 2-line bio) + 8 categories
   (Basics, Lost Receipts, Expenses, Small Business, Taxes, How-To, Digital, Legal).
2. **Write the 8 hubs first** — the only Day-1 deadline. Hubs link every spoke; add the
   reverse spoke→hub link as each spoke ships.
3. **Set `publishedAt` per the Day column** — future dates auto-publish, no manual action.
4. **Every post fills the Sanity `faqs` field** (3–5 Q&As) → FAQPage JSON-LD ships automatically.
5. **After Day 15:** internal-link QA, resubmit sitemap in GSC, watch Coverage. If
   "Crawled – not indexed" grows on blog URLs, slow weeks 3–4 instead of adding more.
6. **Refresh hubs every 60–90 days** — update stats and facts; the visible "Updated" date and
   `dateModified` schema already ship from Sanity's `_updatedAt`.
7. **Monthly:** add the 8 hub URLs to `llms.txt` under a "Guides" section once live.
