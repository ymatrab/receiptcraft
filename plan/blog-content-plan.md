# Blog Content Plan — 100 Articles / 15 Days

**Strategy:** hub-and-spoke. 8 cluster hubs publish on Day 1; spokes drip ~7/day for 14 days,
mixing clusters daily so the cadence looks editorial, not programmatic. All posts can be loaded
into Sanity immediately with a future `publishedAt` — the site only shows posts whose date has
passed (`publishedAt <= now()`), so scheduling is automatic. Dates below assume Day 1 = **2026-07-03**.

**Why drip instead of bulk:** Google explicitly targets "scaled content abuse". Velocity alone
isn't a penalty, but 100 URLs appearing in one crawl on a young domain invites the classifier.
7/day with real depth, real authors and real internal links reads as an active editorial site.
It also spreads GSC indexation load — we're already watching a 900-URL programmatic set.

## Per-article quality bar (non-negotiable, this is what keeps it from looking like spam)

- **Length:** spokes 1,200–1,800 words; hubs 2,000–2,500. Vary — identical lengths are a scaled-content fingerprint.
- **AEO:** first paragraph = 40–60 word direct answer to the title question (this is what AI engines quote). H2s phrased as questions where natural.
- **FAQ block:** 3–5 questions at the end, stored in the Sanity `faqs` field → rendered with `FAQPage` JSON-LD (infrastructure shipped alongside this plan).
- **E-E-A-T:** every post has the author byline (create one real author in Sanity with bio + photo). Tax/legal articles cite primary sources (IRS.gov, state statutes) and carry a one-line "not tax/legal advice" note.
- **Internal links:** 3–6 per post — up to its hub, sideways to 2 sibling spokes, and down to the relevant `/templates/*`, `/receipt-help/*` or `/create` page. Hubs link to every spoke.
- **GEO:** facts stated as short standalone sentences (citable passages), tables for comparisons, stats with sources. Update `llms.txt` monthly to reference the 8 hubs.
- **No AI fingerprints:** vary openings, no "In today's fast-paced world", no identical section skeletons across posts.

## Publishing calendar

| Day | Date | Posts |
|---|---|---|
| 1 | Jul 3 | 8 hubs (A1, B1, C1, D1, E1, F1, G1, H1) |
| 2–14 | Jul 4–16 | 7 spokes/day, clusters mixed |
| 15 | Jul 17 | final 1 spoke + QA pass on internal links |

---

## Cluster A — Receipt Basics (hub + 11 spokes)

| # | Day | Title | Slug | Primary keyword | Intent |
|---|---|---|---|---|---|
| A1 | 1 | What Is a Receipt? Types, Parts and Why They Matter | what-is-a-receipt | what is a receipt | info (HUB) |
| A2 | 2 | Receipt vs. Invoice: What's the Difference? | receipt-vs-invoice | receipt vs invoice | info |
| A3 | 4 | What Is a Receipt Number and How Is It Generated? | what-is-a-receipt-number | receipt number | info |
| A4 | 5 | The Anatomy of a Receipt: Every Field Explained | parts-of-a-receipt | parts of a receipt | info |
| A5 | 6 | What Counts as Proof of Purchase? (With Examples) | what-counts-as-proof-of-purchase | proof of purchase | info |
| A6 | 8 | Gift Receipts Explained: How They Work and When to Use One | gift-receipt-explained | gift receipt | info |
| A7 | 9 | What Is an Itemized Receipt and When Do You Need One? | itemized-receipt-guide | itemized receipt | info |
| A8 | 10 | 12 Types of Receipts Every Business Should Know | types-of-receipts | types of receipts | info |
| A9 | 11 | What Is a Cash Receipt? Definition, Format and Example | cash-receipt-definition | cash receipt | info |
| A10 | 12 | Sales Receipt vs. Purchase Order vs. Invoice | sales-receipt-vs-purchase-order | sales receipt | info |
| A11 | 13 | Credit Card Receipts: Auth Codes, Last 4 and What It All Means | credit-card-receipt-explained | credit card receipt | info |
| A12 | 14 | Why Do Receipts Exist? A Short History of the Receipt | history-of-receipts | history of receipts | info (linkable) |

## Cluster B — Lost & Replacement Receipts (hub + 13 spokes)

High commercial relevance: people who lost receipts are exactly who needs a receipt maker.
Each store guide documents the *official* reprint/lookup path first (genuinely useful, ranks),
then offers `/create` for recreating records of real purchases.

| # | Day | Title | Slug | Primary keyword | Intent |
|---|---|---|---|---|---|
| B1 | 1 | Lost a Receipt? Every Way to Get a Replacement | how-to-replace-a-lost-receipt | lost receipt | info (HUB) |
| B2 | 2 | How to Look Up and Reprint a Walmart Receipt | walmart-receipt-lookup | walmart receipt lookup | info |
| B3 | 3 | How to Download an Amazon Receipt or Invoice | amazon-receipt-download | amazon receipt | info |
| B4 | 4 | Target Receipt Lookup: 4 Ways to Find an Old Receipt | target-receipt-lookup | target receipt lookup | info |
| B5 | 5 | Home Depot & Lowe's Receipt Reprints: Store Policies | home-depot-lowes-receipt-reprint | home depot receipt lookup | info |
| B6 | 7 | How to Get a Copy of a Costco Receipt | costco-receipt-copy | costco receipt | info |
| B7 | 8 | How to Download Uber and Lyft Trip Receipts | uber-lyft-receipt-download | uber receipt | info |
| B8 | 9 | How to Retrieve Airline Receipts (Delta, United, American, Southwest) | airline-receipt-retrieval | flight receipt | info |
| B9 | 10 | How to Request a Hotel Folio After Checkout | hotel-folio-after-checkout | hotel receipt copy | info |
| B10 | 11 | Gas Station Receipts: How to Get a Copy After You Drive Off | gas-station-receipt-copy | gas station receipt | info |
| B11 | 3 | Why Thermal Receipts Fade (and How to Recover One) | why-receipts-fade | faded receipt | info (linkable) |
| B12 | 12 | Returning Something Without a Receipt: 15 Store Policies Compared | return-without-receipt-policies | return without receipt | info |
| B13 | 13 | Warranty Claims Without a Receipt: What Are Your Options? | warranty-claim-without-receipt | warranty without receipt | info |
| B14 | 14 | Can a Bank Statement Replace a Receipt? | bank-statement-as-proof-of-purchase | bank statement proof of purchase | info |

## Cluster C — Expense Reports & Reimbursement (hub + 11 spokes)

| # | Day | Title | Slug | Primary keyword | Intent |
|---|---|---|---|---|---|
| C1 | 1 | Receipts for Expense Reports: The Complete Guide | expense-report-receipts-guide | expense report receipts | info (HUB) |
| C2 | 2 | The IRS $75 Receipt Rule, Explained | irs-75-dollar-receipt-rule | irs receipt requirements | info |
| C3 | 3 | Lost a Receipt for Your Expense Report? Do This | lost-receipt-expense-report | lost receipt expense report | info |
| C4 | 5 | Per Diem vs. Actual Expenses: Which Should You Use? | per-diem-vs-actual-expenses | per diem vs actual | info |
| C5 | 6 | Mileage Logs and Receipts: What the IRS Actually Requires | mileage-log-receipts | mileage log requirements | info |
| C6 | 7 | Meal Receipt Rules for Business Expenses (50% vs 100%) | meal-receipts-business-expenses | business meal receipts | info |
| C7 | 8 | How to Organize Receipts for Expense Reports (5 Systems) | organize-receipts-expense-reports | organize receipts | info |
| C8 | 10 | Business Travel Receipts: A Checklist That Survives Finance Review | business-travel-receipt-checklist | travel expense receipts | info |
| C9 | 11 | Why Finance Teams Demand Itemized Hotel Receipts | itemized-hotel-receipt-reimbursement | itemized hotel receipt | info |
| C10 | 12 | What to Put in Your Company's Expense Receipt Policy | expense-receipt-policy | expense policy receipts | info |
| C11 | 13 | Employee Reimbursement Rules: The Legal Basics | employee-reimbursement-rules | employee reimbursement law | info |
| C12 | 15 | Making Your Receipts Work with Expensify, Concur and Ramp | receipts-for-expense-software | expense software receipts | info |

## Cluster D — Small Business Receipts (hub + 13 spokes)

| # | Day | Title | Slug | Primary keyword | Intent |
|---|---|---|---|---|---|
| D1 | 1 | How to Write a Receipt (Step by Step, With Examples) | how-to-write-a-receipt | how to write a receipt | info (HUB) |
| D2 | 2 | How to Write a Rent Receipt (+ Free Template) | how-to-write-a-rent-receipt | rent receipt | info→tool |
| D3 | 4 | Security Deposit Receipts: What Landlords Must Include | security-deposit-receipt | security deposit receipt | info→tool |
| D4 | 5 | How to Write a Cash Payment Receipt for Services | cash-payment-receipt-services | cash payment receipt | info→tool |
| D5 | 6 | Receipt Books vs. Digital Receipts: Which Is Right for You? | receipt-book-vs-digital | receipt book | comparison |
| D6 | 7 | Are Businesses Legally Required to Give Receipts? | are-receipts-legally-required | do businesses have to give receipts | info |
| D7 | 9 | Are Handwritten Receipts Valid? (Yes — Here's How to Do It Right) | handwritten-receipts-valid | handwritten receipt | info |
| D8 | 10 | Receipt Requirements Around the World: US, UK, EU, Canada, Australia | receipt-requirements-by-country | receipt requirements | info |
| D9 | 11 | How to Number Receipts: 4 Systems That Scale | how-to-number-receipts | receipt numbering system | info |
| D10 | 12 | Receipts for Freelancers: When and How to Issue Them | freelancer-receipts | freelancer receipt | info→tool |
| D11 | 13 | Deposit and Partial Payment Receipts Done Right | partial-payment-receipt | deposit receipt | info→tool |
| D12 | 14 | Donation Receipts: 501(c)(3) Requirements and a Template | donation-receipt-requirements | donation receipt | info→tool |
| D13 | 14 | Receipt for Services Rendered: What to Include | receipt-for-services-rendered | services rendered receipt | info→tool |
| D14 | 15 | Issuing Professional Receipts Without a POS System | receipts-without-pos-system | receipts without pos | info→tool |

## Cluster E — Taxes & Bookkeeping (hub + 11 spokes)

| # | Day | Title | Slug | Primary keyword | Intent |
|---|---|---|---|---|---|
| E1 | 1 | Which Receipts Should You Keep for Taxes? | receipts-to-keep-for-taxes | receipts for taxes | info (HUB) |
| E2 | 2 | How Long to Keep Receipts (IRS, Business and Personal) | how-long-to-keep-receipts | how long to keep receipts | info |
| E3 | 3 | Are Scanned Receipts Accepted by the IRS? | scanned-receipts-irs | scanned receipts irs | info |
| E4 | 4 | Receipt Tracking for the Self-Employed: A Simple System | self-employed-receipt-tracking | self employed receipts | info |
| E5 | 6 | Home Office Deduction: The Receipts You'll Need | home-office-deduction-receipts | home office deduction receipts | info |
| E6 | 7 | Small Business Tax Deductions Checklist (Receipt by Receipt) | small-business-deductions-receipts | small business tax deductions | info |
| E7 | 8 | Audited Without Receipts? The Cohan Rule and Your Options | audit-without-receipts-cohan-rule | audited without receipts | info |
| E8 | 9 | 7 Receipt Organization Systems, From Shoebox to App | receipt-organization-systems | receipt organization | info |
| E9 | 11 | Recording Receipts: Bookkeeping Basics for Non-Accountants | recording-receipts-bookkeeping | bookkeeping receipts | info |
| E10 | 12 | VAT Receipts Explained: What Makes a Receipt VAT-Valid (UK/EU) | vat-receipt-explained | vat receipt | info |
| E11 | 13 | GST Receipts and Tax Invoices in Canada, Australia and India | gst-receipt-tax-invoice | gst receipt | info |
| E12 | 14 | Charitable Donations and Taxes: Receipt Rules by Amount | charitable-donation-receipt-taxes | donation receipt taxes | info |

## Cluster F — How to Make Every Kind of Receipt (hub + 13 spokes)

Direct conversion cluster — each spoke deep-links its `/templates/*` page and `/create`.

| # | Day | Title | Slug | Primary keyword | Intent |
|---|---|---|---|---|---|
| F1 | 1 | How to Make a Receipt Online (Free, No Sign-Up) | how-to-make-a-receipt-online | make a receipt online | commercial (HUB) |
| F2 | 2 | How to Make a Restaurant Receipt (Tax + Tip Done Right) | how-to-make-a-restaurant-receipt | restaurant receipt maker | commercial |
| F3 | 3 | How to Make a Gas Station Receipt (Gallons, Grade, Pump) | how-to-make-a-gas-receipt | gas receipt maker | commercial |
| F4 | 4 | How to Make a Taxi or Rideshare Receipt | how-to-make-a-taxi-receipt | taxi receipt maker | commercial |
| F5 | 5 | How to Make a Hotel Receipt (Folio Format Explained) | how-to-make-a-hotel-receipt | hotel receipt maker | commercial |
| F6 | 6 | How to Make a Grocery Store Receipt | how-to-make-a-grocery-receipt | grocery receipt maker | commercial |
| F7 | 7 | How to Make a Parking Receipt | how-to-make-a-parking-receipt | parking receipt | commercial |
| F8 | 8 | How to Make a Daycare Receipt for Child-Care Tax Credits | how-to-make-a-daycare-receipt | daycare receipt | commercial |
| F9 | 9 | How to Make a Cleaning Service Receipt | how-to-make-a-cleaning-receipt | cleaning service receipt | commercial |
| F10 | 10 | How to Make a Contractor or Handyman Receipt | how-to-make-a-contractor-receipt | contractor receipt | commercial |
| F11 | 11 | How to Make a Salon or Barber Receipt | how-to-make-a-salon-receipt | salon receipt | commercial |
| F12 | 12 | How to Make an Auto Repair Receipt (Parts + Labor) | how-to-make-an-auto-repair-receipt | auto repair receipt | commercial |
| F13 | 13 | How to Make a Catering Receipt or Invoice | how-to-make-a-catering-receipt | catering receipt | commercial |
| F14 | 15 | How to Make a Tutoring Receipt Parents Can Submit | how-to-make-a-tutoring-receipt | tutoring receipt | commercial |

## Cluster G — Digital Receipts & Receipt Tech (hub + 10 spokes)

| # | Day | Title | Slug | Primary keyword | Intent |
|---|---|---|---|---|---|
| G1 | 1 | Digital Receipts (E-Receipts): The Complete Guide | digital-receipts-guide | digital receipts | info (HUB) |
| G2 | 3 | Email Receipts: Best Practices for Businesses | email-receipt-best-practices | email receipt | info |
| G3 | 4 | The 8 Best Receipt Scanning Apps, Tested | best-receipt-scanning-apps | receipt scanner app | comparison |
| G4 | 6 | How Receipt OCR Works (and Why It Sometimes Doesn't) | how-receipt-ocr-works | receipt ocr | info |
| G5 | 5 | Thermal Receipt Printers: 58mm vs 80mm and How They Work | thermal-receipt-printers-guide | thermal receipt printer | info |
| G6 | 7 | Receipt Paper Sizes and Types: A Buyer's Guide | receipt-paper-sizes | receipt paper size | info |
| G7 | 9 | QR Codes and Barcodes on Receipts: What They Do | receipt-qr-codes-barcodes | receipt barcode | info |
| G8 | 10 | E-Receipt Privacy: What Stores Learn When You Choose Email | e-receipt-privacy | email receipt privacy | info |
| G9 | 11 | Why Receipts Look Like That: Fonts, Caps and Dot Matrix | why-receipts-look-like-that | receipt font | info (linkable) |
| G10 | 13 | Going Paperless: Switching Your Business to Digital Receipts | switch-to-digital-receipts | paperless receipts | info |
| G11 | 14 | Receipt Design 101: Layout Rules From Real POS Systems | receipt-design-guide | receipt design | info (linkable) |

## Cluster H — Legality & Responsible Use (hub + 10 spokes)

Positions the site on the right side of the fake-receipt topic: awareness + anti-fraud angle.
This cluster protects the domain (E-E-A-T for a sensitive niche) while capturing high-volume queries.

| # | Day | Title | Slug | Primary keyword | Intent |
|---|---|---|---|---|---|
| H1 | 1 | Is It Legal to Make Your Own Receipt? | is-it-legal-to-make-your-own-receipt | is it legal to make a receipt | info (HUB) |
| H2 | 2 | Receipt Fraud: What It Is and What It Costs | receipt-fraud-explained | receipt fraud | info |
| H3 | 5 | How Stores Verify Receipts (Serial Numbers, Barcodes, Systems) | how-stores-verify-receipts | receipt verification | info |
| H4 | 6 | How Businesses Detect Fake Receipts | how-to-spot-a-fake-receipt | fake receipt detection | info (anti-fraud) |
| H5 | 8 | Are Receipts Legal Documents? When a Receipt Counts as Evidence | receipts-as-legal-documents | is a receipt a legal document | info |
| H6 | 9 | Receipts for Film, Theatre and Photo Props: A Practical Guide | prop-receipts-film-design | prop receipts | info→tool |
| H7 | 10 | Using Realistic Receipts in UI/UX Mockups | receipts-ui-ux-mockups | receipt mockup | info→tool |
| H8 | 12 | 25 Receipt Statistics for 2026 (Paper Waste, Digital Adoption) | receipt-statistics | receipt statistics | info (linkable) |
| H9 | 13 | Why Cashiers Ask "Do You Want Your Receipt?" | why-stores-ask-receipt | — | info (light) |
| H10 | 14 | BPA in Receipt Paper: What the Research Says | bpa-receipt-paper | bpa receipts | info (linkable) |
| H11 | 15 | Receipt Checks at Store Exits: Your Rights | store-receipt-checks-rights | receipt check rights | info (linkable) |

---

## Execution checklist

1. **Sanity setup (once):** create 1 real author (name, photo, 2-line bio) and 8 categories
   (Basics, Lost Receipts, Expenses, Small Business, Taxes, How-To, Digital, Legal).
2. **Write hubs first** (Day-1 posts are the only hard deadline). Every spoke written later
   links up to its hub; add the reverse hub→spoke link when each spoke ships.
3. **Set `publishedAt` per the Day column** — future dates auto-publish; no manual action.
4. **After Day 15:** run an internal-link QA pass, submit updated sitemap in GSC, then watch
   Coverage. If "Crawled – not indexed" grows on blog URLs, slow the next batch (weeks 3–4)
   rather than adding more.
5. **Refresh cycle:** revisit hubs every 60–90 days (update stats, re-date honestly via
   Sanity's `_updatedAt` → shown as dateModified).
