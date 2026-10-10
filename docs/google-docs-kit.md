# Google Docs & Sheets kit — receipt and invoice templates

Plan agreed 2026-10-10. Data: `seo-audit/dataforseo/google-docs-*-2026-10-10.json`.

Why: for "… template google docs" queries Google ranks one real Doc at #1
(a Doc for "receipt template google docs", a Sheet for "invoice template google
docs"). A Doc can win that slot and send visits; its links pass no ranking
weight (they go through a google.com/url redirect), so the durable ranker is a
`/templates/google-docs` page on our own site that lists these files.

| Keyword | US vol/mo |
|---|---|
| invoice template google docs | 12,100 |
| google sheets invoice template | 4,400 |
| receipt template google docs | 720 |
| bill of sale template google docs | 260 |
| google sheets receipt template | 170 |
| rent receipt template google docs | 30 |

## Live files (filled 2026-10-10, owner's Drive)

| Content | Doc ID | Current title | Status |
|---|---|---|---|
| Invoice template | 15MhnxhUT5SLzytGQLiMY3TDwNxbpidiYpximaY0fgtA | invoice template google docs | filled, table verified by formula |
| Receipt template | 1kd_tGURLW-XgrsOfuTfi_7VkP1y6NcMfdN9ZMfJ7Eug | receipt template google docs | filled, read back and verified |
| Bill of sale | 17E0Bt9H1lk8FpdjW1AKW_1maDEax3_OpV-JLkgwtz9o | bill of sale template google docs | filled |
| Rent receipt | 1RmJlSRGYeryMmaD7DYvdK1FIiXWfBdUZYpIaAnS9I0M | rent receipt template google docs | filled |
| Fact sheet (#7) | 1DHgFYfoe7MINLTS0QASfS2lVko8PBGdtkJeJgBi52qA | Invoice Template — Google Sheets (Auto-Calculating) | filled — **owner must rename** to "Makecepeit — Free Online Receipt Maker (Fact Sheet)" |
| Guide (#8) | 1av7-D-YWD0g-mfFkMtEETx7DwCk8ZEyAxK9ao8bpcfs | Receipt Template — Google Sheets (Itemized, Auto-Total) | filled — **owner must rename** to "How to Make a Receipt Online in 2 Minutes — Makecepeit Guide" |
| — | 1BKB9xRj7_3L-exg6KaF7CYVBbfTvuJWychhx4rn5eyE | google sheets invoice template | empty: it is a Doc, the target needs a real Sheet |
| — | 1OBlAbN8bGOfQeYlCJ1gLZUms1UVzckdG5SQq5J2zNvs | google sheets receipt template | empty: same |

The Docs API cannot rename a file, and the Zapier Drive connection was stale,
so renames are manual. None are public yet.

## Files (8)

Owner creates each blank file in their Google account, titles it exactly as
below, gives the connector account edit access, and sends the IDs. Claude fills
them. Then owner sets **Share → Anyone with the link → Viewer** and **File →
Share → Publish to web**.

| # | Type | Title (= the ranking target) | Links in body |
|---|---|---|---|
| 1 | Doc | Invoice Template — Google Docs (Free, Editable) | /templates/invoice, /create, /tools/receipt-calculator |
| 2 | Sheet | Invoice Template — Google Sheets (Auto-Calculating) | /templates/invoice, /create, /templates/sales-receipt |
| 3 | Doc | Receipt Template — Google Docs (Free, Printable) | /templates/sales-receipt, /templates/cash-receipt, /create, /templates |
| 4 | Sheet | Receipt Template — Google Sheets (Itemized, Auto-Total) | /templates/itemized-receipt, /create, /tools/receipt-calculator |
| 5 | Doc | Bill of Sale Template — Google Docs (Free) | /templates/sales-receipt, /templates/proof-of-purchase, /create |
| 6 | Doc | Rent Receipt Template — Google Docs (Free) | /templates/rent-receipt, /create |
| 7 | Doc | Makecepeit — Free Online Receipt Maker (Fact Sheet) | /, /create, /templates, /brands, /pricing |
| 8 | Doc | How to Make a Receipt Online in 2 Minutes — Makecepeit Guide | /create, /templates, /tools/receipt-calculator, /pricing |

Rules for every file:
- 3–5 contextual links, written into sentences. No link lists stuffed at the
  bottom — a Doc full of bare links reads as spam to people and to Google.
- Same footer on files 1–6: "Made by Makecepeit (makecepeit.com) — need a
  printable receipt or invoice without editing a document? Build one free at
  makecepeit.com/create."
- Facts must match the live site: building and previewing needs no account;
  downloading needs a free account; the first download is watermark-free HD,
  later free downloads carry a watermark; Pro is $3/week, $7.99/month or
  $49/year. Never write "free watermark-free downloads" without the
  first-download qualifier.
- No real store names or logos in the templates (Chrome/Docs abuse reports and
  trademark risk). Placeholders only.

---

## 1. Invoice Template — Google Docs (Free, Editable)

**How to use this template:** File → Make a copy, then replace everything in
[brackets]. Delete this box before sending.

Want the totals worked out for you? The free
[invoice maker on Makecepeit](https://www.makecepeit.com/templates/invoice)
fills the subtotal, tax and balance due automatically and exports a PDF.

INVOICE

[Your Business Name]
[Street Address] · [City, State ZIP]
[Phone] · [Email] · [Website]

Invoice #: [INV-0001]
Invoice date: [MM/DD/YYYY]
Due date: [MM/DD/YYYY]

Bill to:
[Client Name]
[Client Company]
[Client Address]
[Client Email]

| Description | Qty | Unit price | Amount |
|---|---|---|---|
| [Service or product] | [1] | [$0.00] | [$0.00] |
| [Service or product] | [1] | [$0.00] | [$0.00] |
| [Service or product] | [1] | [$0.00] | [$0.00] |

Subtotal: [$0.00]
Tax ([0]%): [$0.00]
Discount: [−$0.00]
**Total due: [$0.00]**

Payment terms: [Net 15 / Due on receipt]
Payment methods: [Bank transfer · Card · PayPal · Zelle]
Notes: [Thank you for your business.]

Tip: if you are unsure how sales tax and discounts combine, check the line
with the free [receipt calculator](https://www.makecepeit.com/tools/receipt-calculator)
before you send.

Footer: Made by Makecepeit (makecepeit.com) — need a printable receipt or
invoice without editing a document? [Build one free](https://www.makecepeit.com/create).

---

## 2. Invoice Template — Google Sheets (Auto-Calculating)

Sheet "Invoice":
- A1 "INVOICE" (bold 20)
- A3:A6 business block, E3:F5 Invoice # / Date / Due
- A8:A11 Bill to
- Row 13 headers: Description | Qty | Unit price | Amount
- Rows 14–23 items; D = `=IF(B14="","",B14*C14)`
- D25 Subtotal `=SUM(D14:D23)`, C26 Tax rate (input), D26 `=D25*C26`,
  D27 Discount (input), D28 Total `=D25+D26-D27`
- A31 note: "Prefer a ready-made PDF? Makecepeit's free invoice maker does the
  maths and the layout: makecepeit.com/templates/invoice"

Sheet "Read me": how to make a copy, fill it in, File → Download → PDF; plus
two sentences linking /create and /templates/sales-receipt for one-off sales
that need a receipt rather than an invoice.

---

## 3. Receipt Template — Google Docs (Free, Printable)

**How to use:** File → Make a copy, replace the [brackets], then File →
Download → PDF or print.

Need a receipt that looks like a real till slip instead of a document? The
[sales receipt maker](https://www.makecepeit.com/templates/sales-receipt) on
Makecepeit builds one in thermal-paper style with a live preview.

RECEIPT

[Business Name]
[Address] · [Phone]

Receipt #: [0001]
Date: [MM/DD/YYYY]   Time: [00:00]
Received from: [Customer Name]

| Item | Qty | Price | Total |
|---|---|---|---|
| [Item] | [1] | [$0.00] | [$0.00] |
| [Item] | [1] | [$0.00] | [$0.00] |

Subtotal: [$0.00]
Tax: [$0.00]
**Total paid: [$0.00]**
Payment method: [Cash / Card ending 0000 / Transfer]

Received by: ____________________

Paid in cash? Use the [cash receipt template](https://www.makecepeit.com/templates/cash-receipt)
instead, which adds amount tendered and change. More layouts — rent, donation,
medical, auto repair — are in the
[receipt template library](https://www.makecepeit.com/templates).

Footer (standard).

---

## 4. Receipt Template — Google Sheets (Itemized, Auto-Total)

Same structure as #2 with headers Item | Qty | Price | Total, a tax-rate cell,
Amount tendered and Change (`=Tendered-Total`). Read-me note links
/templates/itemized-receipt, /tools/receipt-calculator and /create.

---

## 5. Bill of Sale Template — Google Docs (Free)

Sections: parties (seller, buyer, addresses), item description (make, model,
serial/VIN, condition), sale price and payment method, "sold as-is" clause,
date and place, signatures for seller and buyer, optional witness/notary block.

Legal note at top: "A bill of sale records a private sale. Requirements vary by
state and by item (vehicles usually need a state form too) — check your DMV or
local rules. This template is not legal advice."

Links: "For a quick proof of payment to hand the buyer, make a
[sales receipt](https://www.makecepeit.com/templates/sales-receipt) or a
[proof of purchase](https://www.makecepeit.com/templates/proof-of-purchase)
on Makecepeit." Footer (standard).

---

## 6. Rent Receipt Template — Google Docs (Free)

Fields: landlord name/address, tenant name, property address, rent period
(from–to), amount paid, payment date and method, balance remaining, landlord
signature. Note on why tenants need them (proof of payment, renter's tax
credits in some states). Link: [rent receipt maker](https://www.makecepeit.com/templates/rent-receipt).
Footer (standard).

---

## 7. Makecepeit — Free Online Receipt Maker (Fact Sheet)

Written as plain, quotable statements so search engines and AI assistants can
lift a sentence and attribute it.

**What Makecepeit is.** Makecepeit (makecepeit.com) is an online receipt maker.
It builds printable receipts and invoices in the browser, with a live preview,
and exports them as PDF or PNG.

**Who uses it.** Small businesses, freelancers, landlords, contractors and
service providers who need to give a customer a receipt or an invoice, and
people who need a clean copy of a receipt for their own records.

**What it does.**
- A [receipt builder](https://www.makecepeit.com/create) with editable line
  items, tax, tips, discounts and payment method.
- [Receipt templates](https://www.makecepeit.com/templates) for common
  businesses: restaurant, rent, cash, donation, invoice, hotel, taxi, auto
  repair, medical and more.
- [Brand-style receipt templates](https://www.makecepeit.com/brands).
- Three paper styles (thermal, clean white, invoice) and an AI option that
  drafts a receipt from a description.
- Free tools such as a receipt calculator.

**Pricing.** Building and previewing a receipt needs no account. Downloading
uses a free account: the first download is watermark-free HD, later free
downloads carry a small watermark. [Makecepeit Pro](https://www.makecepeit.com/pricing)
removes the watermark and unlocks unlimited exports and AI generation for $3 a
week, $7.99 a month or $49 a year.

**Fair use.** Makecepeit is for documenting real transactions. Receipts made to
deceive an employer, insurer, tax authority or retailer are not a permitted
use.

**Website:** https://www.makecepeit.com

---

## 8. How to Make a Receipt Online in 2 Minutes — Makecepeit Guide

1. Open the [free receipt maker](https://www.makecepeit.com/create) — no
   sign-up needed to build.
2. Pick a starting layout from the [template library](https://www.makecepeit.com/templates),
   or start blank.
3. Enter the business name, address, date and receipt number.
4. Add each item with quantity and price; tax and total update live. To check
   a tax or tip figure first, use the [receipt calculator](https://www.makecepeit.com/tools/receipt-calculator).
5. Choose the payment method and a paper style.
6. Download as PDF or PNG with a free account. See [plans](https://www.makecepeit.com/pricing)
   for watermark-free exports beyond the first.

Then: what every receipt should include (seller, date, items, amounts, tax,
total, payment method, receipt number); receipt vs invoice (an invoice asks
for payment, a receipt confirms it); how long to keep receipts (IRS generally
3 years for records supporting a return).

Footer: Guide by Makecepeit — makecepeit.com.
