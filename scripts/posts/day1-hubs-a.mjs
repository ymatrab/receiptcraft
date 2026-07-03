/** Day-1 hub articles 1–4. Body is markdown-lite (see sanity-portable-text.mjs). */

export const POSTS_A = [
  {
    slug: "what-is-a-receipt",
    category: "basics",
    publishedAt: "2026-07-03T09:00:00Z",
    title: "What Is a Receipt? Types, Required Fields and Examples",
    seoTitle: "What Is a Receipt? Types, Required Fields & Examples",
    seoDescription:
      "A receipt is written proof that a payment happened. Learn what a receipt must include, the 12 most common types, and how receipts differ from invoices.",
    excerpt:
      "A receipt is written proof that a payment changed hands. Here is exactly what one must include, the main types you will meet, and how receipts differ from invoices.",
    body: `A receipt is a written record that a payment happened. It is issued by the seller to the buyer after payment and states, at minimum, who was paid, what was paid for, how much was paid, and when. That is the whole idea — everything else on a receipt is detail layered on top of those four facts.

Receipts matter because they are the default proof of purchase almost everywhere: returns, warranty claims, expense reports, tax deductions, insurance claims and basic bookkeeping all run on them.

## What information must a receipt include?

There is no single worldwide law defining a receipt, but a usable one answers four questions. In practice a complete receipt contains:

- The business name and contact details (address or phone, often a tax ID)
- The date and time of the transaction
- The items or services purchased, with quantities and prices
- Taxes applied (rate and amount), any discounts or tips
- The total amount paid and the payment method
- A receipt or transaction number for reference

Regulated contexts add requirements: VAT receipts in the UK and EU must show the seller's VAT number, and donation receipts for US nonprofits must include specific IRS wording. If you are issuing receipts as a business, our guide on [how to write a receipt](/blog/how-to-write-a-receipt) covers the exact fields step by step.

## What is the difference between a receipt and an invoice?

An invoice is a request for payment issued before money moves; a receipt is proof of payment issued after. The invoice says "you owe this", the receipt says "you paid this". They can look nearly identical — same items, same totals — which is why the timing and intent, not the layout, is what separates them. Many small businesses convert an invoice into a receipt simply by marking it paid, with the payment date and method.

## What are the main types of receipts?

Different transactions produce different receipt formats. The ones you will meet most often:

- **Sales receipt** — the standard retail record printed at a register
- **Cash receipt** — confirms a cash payment, often handwritten for services
- **Itemized receipt** — lists every line item separately; required by most expense policies
- **Gift receipt** — hides prices so a recipient can exchange without seeing the cost
- **Rent receipt** — landlord's confirmation of rent received, required by law in some regions
- **Donation receipt** — a nonprofit's acknowledgment, needed for tax deductions
- **Digital or e-receipt** — emailed or in-app; see our [digital receipts guide](/blog/digital-receipts-guide)
- **Hotel folio** — an itemized statement of room, taxes and incidentals
- **Fuel receipt** — includes gallons or liters, price per unit and pump number
- **Restaurant receipt** — subtotal, tax and a tip line, often with a customer copy
- **Deposit or partial-payment receipt** — records money received toward a larger total
- **Refund receipt** — documents money returned to the buyer

Each type has a matching layout in our [template library](/templates) if you need to issue or recreate one.

## Why do receipts look the way they do?

The narrow, monospaced look of a classic receipt comes from thermal printers: 58mm or 80mm paper, heat-printed, no ink. Thermal paper is cheap and fast but fades — often within months in a hot car or wallet — which is why so many people end up needing to [replace a lost or faded receipt](/blog/how-to-replace-a-lost-receipt). Digital receipts avoid the fading problem entirely, and modern email receipts have shifted receipt design toward wider, cleaner layouts.

## Is a receipt a legal document?

A receipt is legal evidence of a transaction — courts, tax authorities and insurers accept receipts as proof that a payment occurred. That cuts both ways: issuing honest receipts protects both parties, and fabricating a receipt to deceive someone is fraud. The rules are covered in plain language in [is it legal to make your own receipt?](/blog/is-it-legal-to-make-your-own-receipt)

## The bottom line

A receipt is proof of payment: who, what, how much, when. If it answers those four questions clearly, it does its job — whether it is a fading thermal strip from a gas station or a clean PDF from an online tool. If you need to issue one for your business or recreate a lost record of a real purchase, you can [build one free](/create) in about a minute.`,
    faqs: [
      {
        q: "What makes a receipt valid?",
        a: "A receipt is valid when it identifies the seller, the date, what was purchased, and the amount paid. There is no universal legal template — a handwritten note with those facts is a valid receipt in most contexts. Specific uses add requirements: expense policies usually demand itemized receipts, and VAT/GST receipts must show the seller's tax number.",
      },
      {
        q: "Is a receipt the same as proof of purchase?",
        a: "A receipt is the most common form of proof of purchase, but not the only one. Bank and credit-card statements, order confirmations, loyalty-account purchase history and packing slips can all serve as proof of purchase, though many stores prefer or require the original receipt for returns.",
      },
      {
        q: "What is the difference between a receipt and a ticket?",
        a: "A ticket grants access to something (a movie, a flight, an event) and is usually issued before or at payment; a receipt proves the payment itself. Some documents combine both — an airline e-ticket confirmation typically includes the fare receipt.",
      },
      {
        q: "Do all businesses have to give receipts?",
        a: "In the US there is no federal law requiring receipts for every sale, though several states and specific industries require them, and card networks require them on request. In much of the EU, issuing a receipt is mandatory. Most businesses issue them regardless, because customers and bookkeeping expect it.",
      },
    ],
  },

  {
    slug: "how-to-replace-a-lost-receipt",
    category: "lost-receipts",
    publishedAt: "2026-07-03T10:00:00Z",
    title: "How Do You Replace a Lost Receipt? Every Option Explained",
    seoTitle: "How to Replace a Lost Receipt: Every Option Explained",
    seoDescription:
      "Lost a receipt? Check your email, store apps, loyalty accounts and card statements — and learn when stores can reprint receipts and how to recreate one for your records.",
    excerpt:
      "Most lost receipts are recoverable: they live in your email, a store app, a loyalty account or the retailer's own system. Here is the complete recovery playbook, in order.",
    body: `Most lost receipts can be replaced. Digital copies usually exist in your email, a store app or a loyalty account, and many retailers can reprint an in-store purchase from the card you paid with. Work through the options below in order — the first three solve the majority of cases in under ten minutes.

## Step 1: Search your email properly

Search the store name, but also try "receipt", "order", "your purchase" and the exact amount (like 47.83). Card-linked e-receipts often come from payment processors with unfamiliar sender names — Square receipts, for example, arrive from messaging.squareup.com, not from the shop that served you. Check spam and promotions folders too.

## Step 2: Check the store's app or your loyalty account

If you scanned a loyalty card, typed a phone number, or paid through a store app, the purchase is recorded even if you paid cash:

- Grocery chains (Kroger, Safeway, Publix) store digital receipts against your loyalty number
- Warehouse clubs (Costco, Sam's Club) tie every purchase to your membership and can reprint at the desk
- Fast food and coffee apps (McDonald's, Starbucks, Chick-fil-A) keep order history with full receipts
- Rideshare and delivery (Uber, Lyft, DoorDash) email every receipt and store it in trip or order history

We keep step-by-step retrieval guides for 70+ brands in the [receipt help center](/receipt-help) — including exact menu paths for the big ones like [Walmart](/receipt-help/walmart-lost-receipt) and [Costco](/receipt-help/costco-lost-receipt).

## Step 3: Ask the store for a reprint

Bring the payment card and the approximate date to the customer-service desk. Modern point-of-sale systems can search transactions by card number, amount and date. Walmart even offers a self-service online receipt lookup using the store, date and card. Time limits vary — some systems only search 90 days back, warehouse clubs go much further — so ask sooner rather than later.

## Step 4: Use your card statement as backup proof

A bank or credit-card statement proves the date, merchant and amount. It is not itemized, so it will not satisfy every expense policy or return desk, but paired with a short explanation it is often accepted for reimbursements — and the IRS accepts statements as supporting evidence for many business expenses. For what statements can and cannot do, see [which receipts to keep for taxes](/blog/receipts-to-keep-for-taxes).

## Step 5: Recreate the receipt for your records

If the original is truly unrecoverable — a faded thermal strip, a cash purchase with no loyalty scan — you can recreate a receipt that documents the real transaction: same store, same items, same prices, same date. That gives your bookkeeping, expense file or personal records a legible document where a blank spot would otherwise be.

Our [receipt builder](/create) does this in about a minute, free, with templates matching most receipt formats. One firm rule: only recreate receipts for purchases that actually happened, and never present a recreated receipt as the original to deceive anyone — that is fraud. The full rules are in [is it legal to make your own receipt?](/blog/is-it-legal-to-make-your-own-receipt)

## Why do paper receipts disappear so easily?

Thermal paper is the culprit. Receipts are printed with heat on chemically coated paper, and that coating degrades with sunlight, heat, friction and time — often fading to blank within months. If a receipt matters (a warranty, a big purchase, taxes), photograph it the day you get it. A phone photo is accepted by the IRS and most warranty departments, and it never fades.

## The bottom line

Check email, check apps and loyalty accounts, ask the store, fall back on your statement — and if all four fail, recreate the record honestly. In most cases the receipt is not lost at all; it is just sitting in a system you have not checked yet.`,
    faqs: [
      {
        q: "Can a store look up my receipt with my credit card?",
        a: "Often yes. Most modern registers can search past transactions by the card used, the date and the amount. Bring the physical card you paid with to the customer-service desk — the lookup usually needs to read or reference the card number. Time limits vary by retailer, from about 90 days to two years or more.",
      },
      {
        q: "Can I get a copy of a receipt if I paid cash?",
        a: "Only if the purchase was tied to something identifiable: a loyalty card, a phone number typed at the register, or an app. Anonymous cash purchases generally cannot be looked up, which is when photographing receipts at purchase time — or recreating the record afterward — matters most.",
      },
      {
        q: "Is a bank statement enough to return an item?",
        a: "Sometimes. Many large retailers can process a return using the original payment card in place of a receipt, and some accept statements with photo ID, usually paying refunds as store credit. Policies differ widely, so check the specific store's rules in our receipt help center first.",
      },
      {
        q: "Is it OK to recreate a lost receipt?",
        a: "Yes, for legitimate purposes: documenting a real purchase for your own records, bookkeeping or an honest reimbursement of money you actually spent. It is illegal to fabricate a receipt for a purchase that never happened or to present a recreation as an original to deceive a store, employer or tax authority.",
      },
    ],
  },

  {
    slug: "expense-report-receipts-guide",
    category: "expenses",
    publishedAt: "2026-07-03T11:00:00Z",
    title: "What Receipts Do You Need for an Expense Report?",
    seoTitle: "What Receipts Do You Need for an Expense Report?",
    seoDescription:
      "Most companies require itemized receipts for expenses over $25-$75. Learn exactly what finance teams accept, the IRS $75 rule, and what to do about lost receipts.",
    excerpt:
      "Finance teams want itemized receipts that show what was bought, not just how much was paid. Here are the exact rules, the IRS $75 threshold, and the lost-receipt playbook.",
    body: `For an expense report you generally need itemized receipts — documents showing what was purchased line by line, not just the total. Most US companies set a receipt threshold between $25 and $75 (mirroring the IRS rule that lodging always needs a receipt but other expenses under $75 technically do not), and require receipts for every expense above it.

The practical standard is simple: if finance cannot tell what you bought, when, from whom and for how much, expect the report to bounce.

## What makes a receipt acceptable to finance?

An expense-ready receipt shows five things:

- The merchant's name and location
- The transaction date
- Itemized purchases — each line, not just a total
- Taxes and tip broken out
- The payment amount and method

The most common rejection is the credit-card slip problem: the little signature slip from a restaurant shows the total but not what was ordered. Finance wants the itemized receipt that lists the meals. The same applies to hotel stays — the card charge is not enough; you need the folio listing room, taxes and incidentals night by night. Hotels will re-send folios long after checkout, and our [receipt help center](/receipt-help) covers how for the major chains.

## What is the IRS $75 receipt rule?

For business tax records, the IRS does not require receipts for most expenses under $75 — with important exceptions: lodging always requires documentation regardless of amount, and you still must record the expense (date, amount, place, business purpose) even when no receipt is needed. Two warnings before you rely on it:

1. The rule applies to IRS substantiation, not your employer. Company policy can (and usually does) demand receipts at a lower threshold.
2. The record-keeping duty never goes away. A contemporaneous log entry replaces the receipt, not the documentation itself.

## What should you do if you lost a receipt for an expense report?

Follow the recovery chain in our [lost receipt guide](/blog/how-to-replace-a-lost-receipt): email search, store app or loyalty account, merchant reprint, then card statement. For expense reports specifically, add these:

1. Check the vendor portal — airlines, hotels and rideshare apps all re-issue receipts (Uber and Lyft store every trip receipt in the app).
2. Submit a missing-receipt affidavit if your company has one — a signed declaration of the date, vendor, amount and business purpose.
3. Attach the card statement line plus a short written explanation when policy allows substitutes.
4. If the purchase was real and no original can be recovered, some situations allow a recreated receipt documenting the actual transaction — always disclosed as a recreation, never passed off as an original. Misrepresenting expenses is fraud and a firing offense everywhere.

## Meals, mileage and the special cases

- **Meals**: itemized receipt plus the business context (who attended, purpose). Most US business meals are 50% deductible for the company, which is why finance is strict here.
- **Mileage**: no receipt exists — keep a log with date, distance, origin/destination and purpose. Fuel receipts substantiate fuel costs, not mileage claims.
- **Per diem**: if your employer pays per diem, individual meal receipts are usually unnecessary — the daily rate replaces them. Do not mix per diem and receipt-based claims for the same day.
- **Tips**: cash tips without receipts go in the log; card tips should appear on the itemized receipt.

## How to keep receipts from becoming a monthly crisis

Photograph every receipt the moment you get it — thermal paper fades fast. Forward email receipts to a dedicated folder or directly into your expense tool; Expensify, Concur and Ramp all extract data from forwarded receipts automatically. File by trip or by month, not in one giant pile. Five minutes per week beats three hours at month-end.

## The bottom line

Itemized receipt above your company's threshold, folio for every hotel night, log for mileage, affidavit or statement as a disclosed fallback. If you spend it, capture it the same day — and if a real receipt is gone for good, [rebuild the record honestly](/create) rather than leaving a hole in your report.`,
    faqs: [
      {
        q: "Does the IRS require receipts for expenses under $75?",
        a: "Generally no — except for lodging, which always requires documentation. But you must still record the expense's date, amount, place and business purpose in a log or expense system. And note this is the IRS floor: most employers set stricter receipt thresholds, commonly $25.",
      },
      {
        q: "Can I use a credit card statement instead of a receipt?",
        a: "As a fallback, sometimes. A statement proves the merchant, date and amount but not what was purchased, so it fails the itemization requirement most policies have. Pair it with a written explanation or a missing-receipt affidavit where your company allows substitutes.",
      },
      {
        q: "Why do companies require itemized hotel receipts?",
        a: "Because a hotel charge bundles room, taxes, meals, minibar and incidentals into one number. The folio separates reimbursable costs from personal ones, applies the right tax treatment, and shows the nightly rate against travel policy caps. Request folios from the front desk or the hotel's website — they can re-send them months later.",
      },
      {
        q: "What happens if I submit an expense report without receipts?",
        a: "Below your company's threshold, usually nothing — the report processes on the recorded details. Above it, expect rejection or a request for a missing-receipt affidavit. Repeated missing receipts trigger audits of your reports, and fabricating receipts for expenses that never happened is fraud with career-ending consequences.",
      },
    ],
  },

  {
    slug: "how-to-write-a-receipt",
    category: "small-business",
    publishedAt: "2026-07-03T12:00:00Z",
    title: "How to Write a Receipt (Step by Step, With Examples)",
    seoTitle: "How to Write a Receipt: Step by Step With Examples",
    seoDescription:
      "Write a valid receipt in 7 steps: business details, date, receipt number, itemized list, tax, total and payment method. Works handwritten or digital.",
    excerpt:
      "A valid receipt needs seven things: your business details, the date, a receipt number, an itemized list, tax, the total, and the payment method. Here is each step with examples.",
    body: `To write a receipt, record seven things: your business name and contact details, the date, a unique receipt number, an itemized list of what was sold, the tax applied, the total paid, and how it was paid. Get those down — handwritten or digital — and you have issued a valid receipt in every US state and most of the world.

Here is each step in detail, plus the special cases (rent, deposits, donations) where specific wording matters.

## Step-by-step: the seven parts of a receipt

1. **Business details.** Your business name at the top, plus at least one way to reach you — address, phone or email. Sole traders can use their own name. If you are VAT/GST registered, include the tax number.
2. **Date (and time).** The date payment was received — not the invoice date, not the delivery date. Time matters for retail; date alone is fine for services.
3. **Receipt number.** A unique reference so both sides can point at this exact transaction later. A simple incrementing sequence works (0001, 0002…); many businesses prefix by year (2026-0147). Never reuse numbers.
4. **Itemized list.** One line per item or service: description, quantity, unit price, line total. For services, describe the work and period ("Lawn care — June 2026"). Vague single lines like "services rendered — $500" invite disputes.
5. **Subtotal, tax and any discounts.** Show the subtotal, then tax as its own line with the rate ("Sales Tax 8.25% — $4.13"), then discounts if any. If you are not required to collect tax, simply omit the line.
6. **Total.** The final amount actually paid, clearly the biggest visual element. If this was a partial payment, label it (see below).
7. **Payment method.** Cash, card (last four digits only — never the full number), check number, or transfer. For cash, note amount tendered and change if relevant.

Sign it if handwritten — a signature adds weight to informal receipts. Then give the customer the original and keep a copy; that copy is your bookkeeping record, as covered in [which receipts to keep for taxes](/blog/receipts-to-keep-for-taxes).

## Are handwritten receipts valid?

Yes. A handwritten receipt with the seven elements above is as legally valid as a printed one. Receipt books with carbon copies solve the keep-a-copy problem automatically. The weaknesses are practical, not legal: handwriting gets disputed as illegible, sequential numbering gets forgotten, and paper copies get lost — which is why most small businesses eventually switch to digital. You can [generate a clean, numbered receipt](/create) faster than writing one by hand.

## Special receipts that need specific wording

### Rent receipts

Include the property address, the rental period covered ("Rent for July 2026, Unit 4B"), tenant name, amount and payment method. Several states require landlords to provide rent receipts on request (or automatically for cash), and tenants claiming renter's credits need them at tax time.

### Deposit and partial-payment receipts

State three numbers: amount received today, total price, and balance remaining — plus what the deposit is for and whether it is refundable. "Deposit of $300 received toward kitchen renovation quoted at $2,400; balance $2,100 due on completion. Deposit non-refundable after materials are ordered."

### Donation receipts

US 501(c)(3) organizations must include: the organization's name, the donation date and amount (or a description of donated goods, without valuing them), and one of two statements — either that no goods or services were provided in exchange, or a description and good-faith value of what was provided. Donors need this for any deduction of $250 or more.

### Receipts for services

Add the service date if it differs from the payment date, and any warranty terms ("90-day warranty on labor"). Trades and repair businesses should separate parts from labor — customers, insurers and warranty companies all ask.

## The bottom line

Seven fields, honestly filled: who, when, what number, what items, what tax, what total, paid how. Whether that lands on a carbon-copy pad or a [free receipt template](/templates), the record is what protects both sides of the transaction.`,
    faqs: [
      {
        q: "Do I need special software to issue receipts?",
        a: "No. A receipt book, a word processor or a free online receipt maker all produce valid receipts. What matters is the content — the seven required fields — and keeping a copy of every receipt you issue. Software helps mainly with automatic numbering, clean formatting and searchable records.",
      },
      {
        q: "How should I number my receipts?",
        a: "Use a sequence that never repeats and never skips ambiguously: plain incremental (0001, 0002), year-prefixed (2026-0147), or per-client prefixes for freelancers (ACME-012). Start anywhere you like, but from then on the sequence should be continuous — gaps and duplicates are what auditors question.",
      },
      {
        q: "Do I have to charge tax on my receipts?",
        a: "Only if you are required to collect it — that depends on your location, what you sell and your registration status. If you collect sales tax, VAT or GST, show it as a separate line with the rate. If you are not registered or the sale is exempt, leave the tax line off entirely rather than showing 0% ambiguously.",
      },
      {
        q: "What is the difference between a receipt and a proof of payment?",
        a: "A receipt is issued by the seller and itemizes the transaction; proof of payment (like a bank transfer confirmation) is generated by the payment system and shows only that money moved. For bookkeeping and disputes you ideally hold both, but the seller-issued receipt is the document that explains what the payment was for.",
      },
    ],
  },
];
