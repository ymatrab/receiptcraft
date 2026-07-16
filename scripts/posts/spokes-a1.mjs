/** Cluster A (Basics) spokes 1/3: A2–A4. Body is markdown-lite (see sanity-portable-text.mjs). */

export const SPOKES_A1 = [
  {
    slug: "receipt-vs-invoice",
    category: "basics",
    publishedAt: "2026-07-12T08:00:00Z",
    title: "What's the Difference Between a Receipt and an Invoice?",
    seoTitle: "Receipt vs. Invoice: What's the Difference?",
    seoDescription:
      "An invoice requests payment before money moves; a receipt proves payment after. Learn when to send each, what each must include, and how one becomes the other.",
    excerpt:
      "An invoice asks for money; a receipt proves money was paid. Same items, same totals — but the timing, purpose and legal role are completely different.",
    body: `An invoice is a request for payment sent before money changes hands; a receipt is proof of payment issued after. The invoice says "you owe this amount," while the receipt says "this amount was paid." They can list identical items and totals — what separates them is timing and purpose, not layout.

Mixing the two up has real consequences: sending a receipt before payment can void your leverage to collect, and booking an invoice as income before it is paid distorts your accounts. Here is exactly how they differ and when to use each.

## When do you send an invoice vs. a receipt?

The sequence in a typical service transaction looks like this:

1. You finish the work or prepare the goods.
2. You send an **invoice** stating what is owed, payment terms and a due date.
3. The customer pays.
4. You issue a **receipt** confirming the payment.

Retail compresses steps 2–4 into a single moment: payment happens at the register, so only a receipt is ever printed. Service businesses, freelancers and B2B sellers usually need both documents.

## What does each document include?

The two documents answer different questions, so their required fields differ:

- **Invoice:** seller and buyer details, invoice number, itemized charges, subtotal, tax, total due, payment terms (like Net 30), accepted payment methods and a due date
- **Receipt:** seller details, date of payment, items or services paid for, amount paid, payment method and a receipt or transaction number

The invoice looks forward (how and when to pay); the receipt looks backward (what was paid, when, and how). Our guide to [what information a receipt must include](/blog/parts-of-a-receipt) breaks down each receipt field in detail.

## Can an invoice become a receipt?

Yes — and small businesses do it every day. Marking an invoice "PAID" with the payment date and method converts it into functional proof of payment. Most invoicing tools do this automatically: once the customer pays, the invoice status flips and a payment confirmation is generated.

If you do this manually, add three things to the paid invoice:

1. The word "PAID" displayed prominently.
2. The date the payment was received.
3. The payment method (cash, card, bank transfer, check number).

For cash payments especially, a separate signed receipt is safer than a stamped invoice — see [how to write a receipt for a cash payment](/blog/cash-payment-receipt-services).

## Which one matters for taxes and bookkeeping?

Both, but for different sides of the ledger. Invoices document **revenue owed** (accounts receivable); receipts document **money actually moved**. For expense deductions, tax authorities want proof the expense was actually paid — which is why an unpaid invoice generally cannot support a deduction, but a receipt can. The IRS treats receipts, canceled checks and card statements as documentary evidence of payment.

For buyers, the same logic applies in reverse: keep the receipt, not just the invoice, for anything you plan to deduct. Our guide on [which receipts to keep for taxes](/blog/receipts-to-keep-for-taxes) covers retention rules.

## Is a receipt or an invoice a legal document?

Both are legal evidence, but of different facts. An invoice is evidence that a debt was claimed; courts treat unpaid invoices as the basis of collection claims. A receipt is evidence that payment occurred — it is what settles "I already paid for that" disputes. Neither needs a signature to be valid in most jurisdictions, though signed receipts carry more weight for cash transactions.

## Quick comparison

- **Timing:** invoice before payment; receipt after payment
- **Purpose:** invoice requests money; receipt confirms money received
- **Key field:** invoice has a due date; receipt has a payment date and method
- **Accounting role:** invoice = accounts receivable; receipt = cash received
- **Tax role:** receipts prove deductible expenses; invoices alone usually do not
- **Who keeps it:** buyer keeps the receipt; both parties keep the invoice

## The bottom line

Send an invoice when you want to get paid; issue a receipt when you have been paid. If you run a business and need clean, professional receipts without a POS system, you can [create one free](/create) or start from a ready-made [sales receipt template](/templates/sales-receipt) — and if you invoice first, mark it paid and attach the receipt so both you and the customer have a complete record.`,
    faqs: [
      {
        q: "Can an invoice serve as a receipt?",
        a: "Only after it is marked paid. An invoice stamped PAID with the payment date and method functions as proof of payment in most contexts. An unpaid invoice proves only that money was requested, not that it was received.",
      },
      {
        q: "Do I need to send both an invoice and a receipt?",
        a: "For services and B2B sales, best practice is both: the invoice to request payment, the receipt to confirm it. In retail, where payment is immediate, a receipt alone is standard.",
      },
      {
        q: "Which is better for tax deductions — an invoice or a receipt?",
        a: "A receipt. Tax authorities want evidence the expense was actually paid, which an invoice alone does not show. Pair invoices with receipts, canceled checks or card statements to substantiate deductions.",
      },
      {
        q: "Does an invoice or receipt need a signature?",
        a: "Generally no — neither requires a signature to be valid in the US, UK or EU. Signed receipts are still recommended for cash payments, rent and private-party sales, where no bank record backs up the transaction.",
      },
    ],
  },

  {
    slug: "what-is-a-receipt-number",
    category: "basics",
    publishedAt: "2026-07-14T08:00:00Z",
    title: "What Is a Receipt Number and How Is It Generated?",
    seoTitle: "What Is a Receipt Number & How Is It Generated?",
    seoDescription:
      "A receipt number is a unique identifier assigned to each transaction for lookups, returns and audits. Learn how POS systems generate them and how to number your own.",
    excerpt:
      "That string of digits near the top or bottom of your receipt is the transaction's unique fingerprint. Here is how registers generate receipt numbers and how to number your own.",
    body: `A receipt number is a unique identifier assigned to a single transaction. Stores use it to look up the sale for returns, exchanges and warranty claims; businesses use it to keep bookkeeping traceable; auditors use it to match records to payments. No two receipts from the same business should ever share a number.

## Where is the receipt number on a receipt?

On printed store receipts, look near the top under the store details or in the block of codes near the bottom, often labeled:

- **Receipt #, Trans #, or Transaction ID** — the transaction's own number
- **TC or Ref #** — a reference code, common on card slips (Walmart's long "TC#" is its transaction code)
- **Order # or Confirmation #** — the equivalent on e-commerce and email receipts
- **Invoice #** — some POS systems label every sale an invoice

Restaurant receipts often show a **check number**, and hotels use a **folio number** — same idea, different name. The number sits alongside the other standard fields covered in [what information a receipt must include](/blog/parts-of-a-receipt).

## How do POS systems generate receipt numbers?

Modern registers build receipt numbers from transaction metadata rather than a simple 1, 2, 3 count. A typical structure encodes:

- **Store number** — which location made the sale
- **Register or terminal ID** — which till processed it
- **Date or shift code** — when it happened
- **Sequence number** — the transaction's position in that register's day

That is why store receipt numbers are long: a code like 0347-05-260709-0182 can mean store 347, register 5, July 9 2026, transaction 182. The structure lets a clerk find the exact sale in seconds — which is also what makes receipt lookups and reprints possible, as covered in [how to replace a lost receipt](/blog/how-to-replace-a-lost-receipt).

Card payments add a second set of numbers from the payment processor: an authorization code (approval of the charge) and a reference number (the processor's own transaction ID). These are separate from the store's receipt number.

## Are receipt numbers sequential?

Within one register, usually yes — the final segment increments with each sale. Across a whole business they rarely look sequential, because store, register and date segments change. Small businesses issuing receipts by hand should still keep numbers strictly sequential per the numbering system they choose; gaps invite questions in an audit.

## How should a small business number receipts?

Pick a format you can sustain and never repeat. Four systems that scale, from simplest to most structured:

1. **Simple sequence:** 0001, 0002, 0003 — fine for very low volume.
2. **Year prefix:** 2026-0001 — resets each year, keeps numbers short.
3. **Date-based:** 260709-01 — encodes the date, sorts naturally.
4. **Client or job prefix:** SMITH-2026-03 — useful for freelancers with repeat clients.

Whichever you choose, record every number in your books, including voided receipts — void and keep the number rather than reusing it. Our guide on [how to number receipts](/blog/how-to-number-receipts) compares these systems in depth.

## Can you look up a purchase with a receipt number?

Often, yes. Store systems index transactions by receipt or reference number, so customer service can pull up the sale, reprint it, or process a return without the paper slip. Some retailers expose this directly: barcode or QR codes on receipts usually encode the receipt number so returns desks can scan instead of type. If you have lost the paper but know roughly when and how you paid, most stores can search by card number and date instead.

## The bottom line

A receipt number is the transaction's fingerprint: unique, traceable and boring by design. If you issue receipts yourself, commit to one numbering format and never reuse a number. Need to produce clean numbered receipts without a POS? [Build one free](/create) — every template, from the [itemized receipt](/templates/itemized-receipt) on, includes a proper receipt-number field.`,
    faqs: [
      {
        q: "Is a receipt number the same as an order number?",
        a: "They serve the same purpose — uniquely identifying a transaction — but an order number is assigned when an order is placed (often before payment), while a receipt number is tied to the completed payment. E-commerce systems typically generate both.",
      },
      {
        q: "Can two receipts have the same number?",
        a: "Not from the same business — uniqueness is the whole point. Different businesses can coincidentally use the same number, which is why lookups always combine the number with the merchant, date or amount.",
      },
      {
        q: "What is the TC number on a Walmart receipt?",
        a: "TC stands for transaction code — Walmart's internal receipt number. Typing it into Walmart's online receipt lookup along with the store, date and payment details retrieves a digital copy of the receipt.",
      },
      {
        q: "Do handwritten receipts need numbers?",
        a: "Legally no in most places, but practically yes: a sequential number is what makes a handwritten receipt traceable in your books, and receipt books come pre-numbered for exactly that reason.",
      },
    ],
  },

  {
    slug: "parts-of-a-receipt",
    category: "basics",
    publishedAt: "2026-07-15T08:00:00Z",
    title: "What Information Must a Receipt Include?",
    seoTitle: "What Information Must a Receipt Include? All Required Fields",
    seoDescription:
      "A valid receipt needs the seller, date, items, amounts and payment method. Here is every required field, what's optional, and the extra rules for VAT, rent and donations.",
    excerpt:
      "Seller, date, items, amount, payment method — five facts make a receipt usable anywhere. Here is the full field-by-field breakdown, plus the special rules for VAT, rent and donation receipts.",
    body: `A usable receipt must identify five things: who was paid (the business name and contact), when (date and time), what for (the items or services), how much (itemized amounts, tax and total), and how (the payment method). Add a receipt number for traceability and you have a document that works for returns, expense reports, taxes and bookkeeping alike.

There is no single global law defining a receipt — but expense policies, tax authorities and return desks converge on the same field list. Here it is, top to bottom.

## The header: who issued the receipt

- **Business name** — the legal or trading name
- **Address and phone number** — at least one way to locate or contact the business
- **Tax ID where required** — VAT number in the UK/EU, ABN in Australia, GST/HST number in Canada; US receipts generally omit tax IDs

A receipt that does not identify the seller is nearly useless as proof — this is the field disputes turn on.

## The transaction block: when and what

- **Date** — required everywhere; the fact most often checked
- **Time** — standard on POS receipts, optional on handwritten ones
- **Line items** — each product or service, with quantity and unit price
- **Receipt or transaction number** — the unique identifier covered in [what is a receipt number](/blog/what-is-a-receipt-number)

Itemization is what separates a full receipt from a card slip. A slip showing only "$84.20 — APPROVED" proves a charge happened but not what was bought, which is why most expense policies and the IRS's meal-deduction rules effectively require itemized receipts.

## The money block: how much and how

- **Subtotal** — the sum before tax
- **Tax** — rate and amount, broken out per rate where multiple rates apply
- **Discounts, tips or fees** — each on its own line
- **Total** — the amount actually paid
- **Payment method** — cash, card (with last four digits only), check, transfer or app
- **Amount tendered and change** — standard for cash transactions

Card receipts must never show the full card number — showing more than the last five digits violates US federal law (FACTA) for electronically printed receipts.

## What special receipt types must add

Some receipts carry extra required fields on top of the basics:

- **VAT receipts (UK/EU):** the seller's VAT number, and for full VAT invoices the VAT amount per rate — details in [what makes a receipt VAT-valid](/blog/vat-receipt-explained)
- **Rent receipts:** the rental period, property address, tenant name and landlord signature in several jurisdictions
- **Donation receipts (US 501(c)(3)):** the nonprofit's name, gift amount or description, and a statement on whether goods or services were provided in return
- **Daycare/medical receipts:** the provider's tax ID or license number, needed for tax credits and insurance claims

## What is optional but professional

Return policy text, a thank-you line, loyalty points, a survey code, and the store logo are all optional. They add polish and reduce disputes but carry no legal weight. Layout is equally free-form: a receipt can be a thermal strip, a PDF or a handwritten note — [handwritten receipts are valid](/blog/handwritten-receipts-valid) as long as the required facts are present.

## A checklist you can copy

1. Business name and contact details
2. Date (and time for POS receipts)
3. Each item or service with quantity and price
4. Subtotal, tax by rate, discounts and tips
5. Total paid and payment method
6. Receipt number
7. Any type-specific extras (VAT number, rental period, donation statement)

## The bottom line

If a receipt answers who, when, what, how much and how — it will be accepted almost anywhere. When you need to issue one, skip the formatting work: [create a receipt free](/create) or start from the [itemized receipt template](/templates/itemized-receipt), which includes every field on this list by default.`,
    faqs: [
      {
        q: "Is a receipt valid without a business address?",
        a: "Usually yes for returns and informal proof, but expense policies and tax authorities expect the seller to be identifiable. A receipt with a business name but no address or phone is weaker evidence and may be rejected for reimbursement.",
      },
      {
        q: "Does a receipt need to show the payment method?",
        a: "It is expected on virtually all modern receipts and required by many expense policies, because the method links the receipt to a bank or card statement. Cash receipts should say cash — that is precisely when the receipt matters most.",
      },
      {
        q: "Can a receipt show a full credit card number?",
        a: "No. Under the US FACTA law, electronically printed receipts may show at most the last five digits of the card number and must not show the expiration date. Most receipts show only the last four.",
      },
      {
        q: "Do receipts have to include tax?",
        a: "Where sales tax, VAT or GST was charged, the receipt should show it — separately from the subtotal. VAT jurisdictions additionally require the seller's VAT number for the receipt to support input-tax claims.",
      },
      {
        q: "Is a handwritten receipt with all the fields valid?",
        a: "Yes. Validity comes from the information, not the format. A handwritten receipt with the seller, date, items, amounts and payment method is as valid as a printed one in most contexts.",
      },
    ],
  },
];
