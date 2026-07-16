/** Cluster E (Taxes) spokes 4/4: E10, E12. */

export const SPOKES_E4 = [
  {
    slug: "vat-receipt-explained",
    category: "taxes",
    publishedAt: "2026-07-22T13:00:00Z",
    title: "What Makes a Receipt VAT-Valid? (UK/EU)",
    seoTitle: "VAT Receipts Explained: What Makes One Valid (UK/EU)",
    seoDescription:
      "A VAT-valid receipt shows the seller's VAT number and the VAT charged — without it, businesses can't reclaim input VAT. Full vs. simplified invoices, field by field.",
    excerpt:
      "No VAT number, no VAT reclaim — the rule that turns an ordinary receipt into a tax document. What full and simplified VAT invoices must show, and the thresholds between them.",
    body: `A receipt is VAT-valid when it identifies the seller as a VAT-registered business — name, address and **VAT registration number** — and shows the VAT charged, either as an amount per rate or (on simplified receipts) the rate with VAT-inclusive totals. The stakes are concrete: a business can only reclaim input VAT with a valid VAT invoice or receipt. An ordinary till slip without the VAT number reclaims nothing, however real the expense.

This is general information, not tax advice; VAT rules vary by country and change.

## The UK structure: full vs. simplified

**Full VAT invoice** (required for most B2B supplies): invoice number, seller's name, address and VAT number, date/tax point, customer's name and address, description of goods or services, and per rate — the net amount, VAT rate and VAT amount, plus totals.

**Simplified VAT invoice** (allowed for retail sales up to £250 including VAT): seller's name, address and VAT number, date, description, VAT rate, and the gross amount — no customer details, no per-rate VAT amount needed. Most shop receipts from VAT-registered UK retailers qualify by printing exactly these fields.

Below the registration threshold (around £90,000 turnover currently), unregistered sellers issue ordinary receipts with no VAT at all — and buyers have nothing to reclaim.

## The EU pattern

The VAT Directive harmonizes the skeleton — supplier identity and VAT ID, date, description, taxable amount per rate, VAT amount — with member-state variation in simplified-invoice thresholds (commonly €100–400) and e-invoicing mandates (Italy's SdI, and a growing list). Many EU countries layer this on the certified-register requirements described in [receipt requirements by country](/blog/receipt-requirements-by-country): the receipt is simultaneously a fiscal document and a VAT document.

## Reading a VAT receipt

The fields to check before filing it for reclaim:

1. **VAT number present?** (UK format GB + digits; EU formats vary by country.) No number → not a VAT receipt.
2. **VAT shown?** Amount per rate on full invoices; rate + gross on simplified.
3. **Date and description** — reclaim needs the what and when.
4. **Your details** — required on full invoices for larger amounts; ask the seller to add them when B2B.

Mixed-rate baskets (standard, reduced, zero) must break VAT out per rate — the reason grocery receipts in VAT countries carry rate-code letters next to items.

## For US readers and sellers

US sales tax works differently — it's shown on receipts but there's no reclaim chain, so an ordinary receipt suffices ([the US picture](/blog/are-receipts-legally-required)). US businesses selling into the UK/EU may need VAT registration and compliant invoices once thresholds or marketplace rules apply; travelers, conversely, meet VAT receipts in refund schemes at airports, where the full invoice with your details is what the refund desk validates.

## Issuing VAT-valid receipts

If you're registered: put the VAT number on everything, break out rates, and mind the full-vs-simplified line at £250 (UK) or your country's threshold. Invoicing software handles this by construction; the general receipt-craft in [how to write a receipt](/blog/how-to-write-a-receipt) applies with the VAT block added. Buyers who receive a non-compliant receipt should request a proper VAT invoice — sellers must provide one on request for B2B supplies.

## The bottom line

The VAT number is the difference between a receipt and a tax instrument: with it (plus rate and amount fields), the buyer reclaims; without it, the paper is only proof of spending. Check for the number at the counter — asking for a VAT receipt takes five seconds, and reclaim-eligible spending without one is money donated.`,
    faqs: [
      {
        q: "What must a VAT receipt show?",
        a: "The seller's name, address and VAT registration number, the date, a description, and the VAT — per-rate amounts on full invoices, or rate plus VAT-inclusive total on simplified retail receipts (UK: up to £250).",
      },
      {
        q: "Can I reclaim VAT with an ordinary till receipt?",
        a: "Only if it carries the seller's VAT number and rate information (a simplified VAT receipt). A receipt without the VAT number cannot support input-VAT recovery — ask the seller for a VAT invoice instead.",
      },
      {
        q: "What's the difference between a full and simplified VAT invoice?",
        a: "Full invoices add the customer's details, invoice number, and per-rate net/VAT breakdowns — required for most B2B supplies. Simplified versions (below ~£250 retail in the UK) need only seller details, VAT number, date, description, rate and gross.",
      },
      {
        q: "Do US receipts have VAT numbers?",
        a: "No — the US has sales tax, not VAT: no registration numbers on receipts and no input-tax reclaim chain. The VAT-number requirement applies in VAT systems like the UK, EU, and GST countries' equivalents.",
      },
    ],
  },

  {
    slug: "charitable-donation-receipt-taxes",
    category: "taxes",
    publishedAt: "2026-07-24T14:00:00Z",
    title: "What Receipts Do You Need for Charitable Donations?",
    seoTitle: "Charitable Donation Receipts for Taxes: What You Need",
    seoDescription:
      "Cash gifts need a bank record or acknowledgment at any amount; $250+ needs the charity's written acknowledgment; non-cash adds forms at $500 and appraisals at $5,000.",
    excerpt:
      "The substantiation ladder for donations: bank record at any amount, magic-words acknowledgment at $250, Form 8283 at $500, appraisal at $5,000 — from the donor's side of the receipt.",
    body: `To deduct charitable donations you need, at minimum, a bank record or written acknowledgment for every cash gift — and the requirements climb with amount: a contemporaneous written acknowledgment from the charity at $250 or more per gift, Form 8283 for non-cash donations over $500, and generally a qualified appraisal above $5,000. Deducting also requires itemizing (or fitting a temporary non-itemizer provision when one exists) — the receipts substantiate a deduction only itemizers can take.

This is general information, not tax advice.

## The ladder, rung by rung

- **Any cash gift (even $5):** a bank record (statement, canceled check, card record) OR a written receipt from the charity showing name, date, amount. Undocumented cash in the collection plate is not deductible — the rule with no de minimis exception.
- **$250+ per gift:** the charity's **contemporaneous written acknowledgment** becomes mandatory — amount, date, and the goods-and-services statement. The bank record alone stops sufficing at this line, and "contemporaneous" means in hand before you file. The charity-side anatomy of these acknowledgments is in [what a 501(c)(3) donation receipt must include](/blog/donation-receipt-requirements).
- **Quid pro quo gifts over $75:** galas, auctions, benefit dinners — the charity's disclosure states the benefit's value; you deduct only the excess over it.
- **Non-cash over $500:** add Form 8283 Section A — how and when you acquired the property, your cost basis.
- **Non-cash over $5,000:** qualified appraisal plus Form 8283 Section B with signatures (appraiser, charity). Publicly traded securities are the main exception.

## Non-cash gifts: your valuation, their description

The charity's receipt describes the donated property but never values it — fair market value is the donor's determination and the donor's risk. For the Goodwill bag: an itemized list made at donation time (12 shirts, 3 coats...), thrift-shop values per item, photos, and the charity's dated receipt stapled to it. Clothing and household items must be in good used condition or better to be deductible at all.

## Special cases with their own paper

- **Payroll-deduction giving:** pay stub or W-2 plus the pledge card showing the charity's name.
- **Vehicle donations:** Form 1098-C from the charity — the deduction usually caps at what the charity sold it for.
- **Volunteering:** time is never deductible, but out-of-pocket costs and mileage (at the charitable rate) are — keep receipts and a log, per the usual [substantiation patterns](/blog/small-business-deductions-receipts).
- **Donor-advised funds:** the acknowledgment comes from the fund sponsor at contribution, not from eventual grantees.

## Verify, file, retain

Confirm exempt status when the charity is unfamiliar (the IRS Tax Exempt Organization Search) — gifts to non-qualified organizations aren't deductible regardless of paper. File the acknowledgments with the year's tax documents ([the organization habit](/blog/receipt-organization-systems)) and retain per the standard clocks in [how long to keep receipts](/blog/how-long-to-keep-receipts): 3 years minimum, 6 for comfort.

## The bottom line

Bank record always, acknowledgment at $250 (check for the goods-and-services sentence before filing), forms at $500, appraisal at $5,000 — and December's generosity documented in January, not reconstructed in April. Charities issue year-end statements precisely to make this easy; the donor's only job is to keep them.`,
    faqs: [
      {
        q: "Do I need a receipt for small cash donations?",
        a: "Yes — every cash gift needs a bank record or written acknowledgment to be deductible, with no minimum threshold. Cash in the plate without paper is generosity the tax code can't see.",
      },
      {
        q: "What do I need for a donation of $250 or more?",
        a: "A contemporaneous written acknowledgment from the charity — amount, date, and the statement about goods or services received — in your hands before you file. A bank record alone no longer suffices at this level.",
      },
      {
        q: "How do I value donated clothes and household goods?",
        a: "At fair market (thrift-store) value, item by item, in good used condition or better. Make the itemized list and photos at donation time and staple them to the charity's receipt — valuation is your responsibility, not the charity's.",
      },
      {
        q: "Can I deduct donations without itemizing?",
        a: "Generally no — charitable deductions require itemizing on Schedule A, apart from temporary non-itemizer provisions Congress occasionally enacts. The substantiation rules apply the same either way.",
      },
    ],
  },
];
