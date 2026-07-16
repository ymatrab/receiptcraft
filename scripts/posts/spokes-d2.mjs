/** Cluster D (Small Business) spokes 2/4: D5–D7. */

export const SPOKES_D2 = [
  {
    slug: "receipt-book-vs-digital",
    category: "small-business",
    publishedAt: "2026-07-16T12:00:00Z",
    title: "Should You Use a Receipt Book or Digital Receipts?",
    seoTitle: "Receipt Book vs. Digital Receipts: Which Should You Use?",
    seoDescription:
      "Receipt books win on simplicity and signatures; digital wins on copies, search and bookkeeping. Which fits your business — and the hybrid most small operators land on.",
    excerpt:
      "The carbon-copy book still has real advantages — signatures, no battery, instant. But digital receipts feed your books automatically. The honest comparison, use case by use case.",
    body: `A receipt book wins when transactions happen away from screens — cash trades, market stalls, on-site services — because it needs no battery, produces a signed original plus a carbon copy, and takes thirty seconds. Digital receipts win everywhere else: copies can't be lost, records feed bookkeeping automatically, and customers keep emails better than slips. Most small operators end up hybrid: digital by default, a book in the truck.

## What the receipt book still does best

- **Signatures at the point of payment** — for cash receipts, the signed original is the strongest form, per [how to write a cash payment receipt](/blog/cash-payment-receipt-services).
- **Zero dependencies** — no signal, battery, app or printer; a fence line or a farmers market doesn't care about your connectivity.
- **Automatic duplicates** — carbonless copies give both parties a record mechanically.
- **Pre-printed numbering** — the sequential integrity auditors like, ready-made ([why numbering matters](/blog/how-to-number-receipts)).

Its costs: handwriting legibility, no backup if the book is lost, manual transfer into your books, and an unprofessional look in trades where clients expect PDFs.

## What digital does better

- **Permanence** — the copy exists in email and your records the moment it's issued; nothing fades ([thermal paper does](/blog/faded-receipt-fix-reddit), handwriting smears).
- **Bookkeeping integration** — issued receipts land in your ledger without retyping; the recording workflow in [how to record receipts in bookkeeping](/blog/recording-receipts-bookkeeping) becomes nearly automatic.
- **Professional appearance** — itemized, branded, consistently formatted documents; clients forward them to their own accountants without apology.
- **Search** — "what did I invoice Chen in March" takes four seconds, not a shoebox.

Its costs: needs a device, and for cash payments you must add the signature step deliberately (print-and-sign, or sign on screen).

## Decide by transaction pattern

1. **Mostly cash, mostly mobile (markets, casual labor):** book primary, photograph each carbon at day's end — paper speed, digital permanence.
2. **Services with quotes and balances (contractors, cleaners):** digital primary — the receipt chain (deposit → progress → final, per [partial payment receipts](/blog/partial-payment-receipt)) is exactly what digital tools handle well; keep a book for cash days.
3. **Anything with repeat clients or bookkeeping software:** digital, no debate — retyping a receipt book into QuickBooks monthly is the worst of both worlds.
4. **Regulated receipts (rent):** either medium satisfies the field requirements in [how to write a rent receipt](/blog/how-to-write-a-rent-receipt); digital's automatic copies fit the multi-year retention better.

## The hybrid done right

Digital as the system of record; the book as the offline capture device. Two rules keep it clean: photograph every handwritten carbon into the digital system the same day, and run one numbering scheme across both (book receipts prefixed "B-" slot into the sequence). One system of record, two input methods — not two systems.

## The bottom line

The book is a capture tool; digital is a records system. Buy the book for where screens can't go, but let every receipt end up digital by nightfall. If you want the digital side without new software, the [free receipt generator](/create) produces numbered, itemized PDFs per transaction — the [sales receipt template](/templates/sales-receipt) covers the standard case in under a minute.`,
    faqs: [
      {
        q: "Are receipt books still legal?",
        a: "Completely. A handwritten receipt with the required fields — date, parties, purpose, amount, method — is as valid as any printed one. Pre-numbered duplicate books remain a perfectly auditable system at small scale.",
      },
      {
        q: "What should I look for in a receipt book?",
        a: "Carbonless duplicates (or triplicates if a third party needs copies), pre-printed sequential numbers, and fields matching your use — rent books have period fields, service books have description space.",
      },
      {
        q: "How do I get receipt-book records into my bookkeeping?",
        a: "Photograph each carbon copy the same day and enter or import it weekly. Treat the digital ledger as the system of record and the book as an input device — never let the book be the only copy for long.",
      },
      {
        q: "Do customers prefer digital receipts?",
        a: "Mostly yes — emails survive wallets and washing machines, and business customers need digital copies for expense systems anyway. Cash-heavy contexts are the exception, where the signed paper original still rules.",
      },
    ],
  },

  {
    slug: "are-receipts-legally-required",
    category: "small-business",
    publishedAt: "2026-07-17T12:00:00Z",
    title: "Are Businesses Legally Required to Give Receipts?",
    seoTitle: "Are Businesses Legally Required to Give Receipts? (US Rules)",
    seoDescription:
      "No general federal law requires receipts for every US sale — but card rules, state laws, and specific industries do. Where receipts are mandatory and where they're just wise.",
    excerpt:
      "In the US, no federal law demands a receipt for every sale — the duty comes from card networks, states, and industry rules. Where the actual obligations are, and why you should issue receipts anyway.",
    body: `In the US, there is no general federal law requiring businesses to give a receipt for every sale. The obligations that do exist come from narrower sources: card-network rules require receipts for card transactions on request, some states and cities require receipts in specific contexts (fuel pumps, rent, certain services), and regulated industries have their own mandates. Elsewhere — notably much of the EU — issuing receipts is compulsory. Practically, every serious business issues them regardless: the receipt is as much the seller's record as the customer's.

This is general information, not legal advice.

## Where receipts ARE required in the US

- **Card transactions:** Visa and Mastercard rules require merchants to provide a receipt (paper or digital) when the customer asks; federal FACTA law separately governs what printed card receipts may show — no more than the last five digits, no expiration date.
- **State and local rules:** patchwork, but real — several states require receipts for rent (especially cash — see [rent receipt rules](/blog/how-to-write-a-rent-receipt)), some require them at fuel pumps, for towing, pawnshops, auto repair and similar consumer-protection hotspots.
- **Industry regulation:** pharmacies, financial services, firearms dealers and others have transaction-documentation duties that function as receipt requirements.
- **Refund-policy triggers:** states that let stores set restrictive return policies often require those policies to be disclosed on the receipt — making the receipt legally load-bearing even when not strictly mandatory.

## Where the duty is really about records, not customers

Tax law doesn't force you to hand a customer a slip — it forces you to be able to prove your income. Sales records supporting your filings are mandatory everywhere, and numbered receipts are how small businesses meet that duty in practice; the bookkeeping mechanics are in [how to record receipts in bookkeeping](/blog/recording-receipts-bookkeeping). A business that issues no receipts has chosen the hardest possible audit.

## The international contrast

In much of the EU, fiscal law requires issuing receipts — often via certified registers, with customers sometimes technically obliged to take them. Italy and Portugal run receipt lotteries to enforce the habit. VAT systems make receipts tax documents ([what makes a receipt VAT-valid](/blog/vat-receipt-explained)); Canada and Australia sit between the US and EU models, with GST documentation duties kicking in at low thresholds. If you sell internationally, the local rule travels with the sale — the by-country map is in [receipt requirements by country](/blog/receipt-requirements-by-country).

## Why issue receipts even when nothing requires it

1. **Disputes die faster** — returns, chargebacks and "I never got it" claims all resolve on documentation.
2. **Chargeback defense specifically** — the receipt (with method, last four, and signature where relevant) is your evidence packet.
3. **Your books need them anyway** — the customer copy is a by-product of the record you must keep for yourself.
4. **Customers expect it** — a business that can't produce a receipt reads as one that can't produce an invoice, a warranty, or a refund.

## The bottom line

The US rule is: rarely mandatory, always wise. Card sales on request, plus your state's specific pockets — but the real requirement is the one you owe your own books. Issuing a professional receipt takes under a minute with the [free generator](/create), which makes the legal question mostly academic: just issue them.`,
    faqs: [
      {
        q: "Can a US store refuse to give a receipt?",
        a: "For cash sales in most states, legally yes — no general law compels it (specific contexts like fuel, rent and regulated industries aside). For card payments, network rules require a receipt on request.",
      },
      {
        q: "Is a business required to keep copies of receipts it issues?",
        a: "It's required to keep records substantiating its income and tax filings — and copies of issued receipts (or the sales records behind them) are the standard way to do it. Retention of several years is the norm.",
      },
      {
        q: "Are receipts mandatory in Europe?",
        a: "Broadly yes — many EU countries require receipts to be issued for retail sales through certified fiscal systems, and VAT rules make receipts formal tax documents well beyond the US practice.",
      },
      {
        q: "What must legally appear on a card receipt in the US?",
        a: "FACTA limits what may appear: electronically printed receipts can show at most the last five digits of the card and must omit the expiration date. Network rules add content standards for merchant copies.",
      },
    ],
  },

  {
    slug: "handwritten-receipts-valid",
    category: "small-business",
    publishedAt: "2026-07-19T12:00:00Z",
    title: "Are Handwritten Receipts Valid?",
    seoTitle: "Are Handwritten Receipts Valid? (Legally & for Taxes)",
    seoDescription:
      "Yes — validity comes from the information, not the printing. What a handwritten receipt must contain, where it's accepted, and the three cases where it's actually stronger.",
    excerpt:
      "A receipt's validity comes from its facts, not its font. Where handwritten receipts stand legally, for taxes and expense reports — and when handwriting actually beats print.",
    body: `Handwritten receipts are valid. Legally, for taxes, and for most expense purposes, a receipt's force comes from its content — seller, date, items or services, amount, payment method — not from being machine-printed. Courts accept handwritten receipts as evidence, the IRS accepts them as documentary evidence, and businesses have issued them for centuries. The practical questions are legibility, completeness and, in a few contexts, credibility.

## What makes any receipt valid

The same fields regardless of medium (the full anatomy is in [what information must a receipt include](/blog/parts-of-a-receipt)):

1. Who was paid — business or person, identifiable and contactable.
2. Date.
3. What for — items or services, specific.
4. How much — with tax broken out where charged.
5. How — cash, check, card, transfer.
6. A receipt number, for traceability.
7. For cash: the receiver's signature, per [cash receipt practice](/blog/cash-payment-receipt-services).

A handwritten note with all seven is a valid receipt. A printed slip missing half of them is a weak one. Medium is not the test.

## Where handwritten receipts are fully accepted

- **Courts:** handwriting is evidence like any document; a signed handwritten receipt for a private sale or rent payment is routinely dispositive.
- **The IRS:** documentary evidence doesn't specify printing. A legible handwritten receipt substantiates an expense — and pairs well with the contemporaneous-record principle in [the $75 rule](/blog/irs-75-dollar-receipt-rule).
- **Landlord-tenant contexts:** rent receipt statutes are medium-neutral; duplicate books are the traditional compliance tool ([rent receipt fields](/blog/how-to-write-a-rent-receipt)).
- **Warranty and insurance claims:** accepted, though a card statement pairing strengthens a private-sale receipt.

## Where handwriting meets friction

Expense systems OCR poorly against handwriting, so reports may need manual entry; some corporate policies want "original itemized receipts" and reviewers side-eye handwritten meal receipts (restaurants print, after all — a handwritten restaurant receipt invites the question of why). And at scale, credibility inverts: a plumber's handwritten receipt is normal; a claimed office-supply vendor issuing handwritten receipts for hundreds of dollars looks odd. Context sets expectations.

## The three cases where handwriting is stronger

1. **Signatures come free** — a handwritten cash receipt signed at handover is better evidence than an unsigned thermal slip.
2. **No infrastructure required** — the receipt exists wherever a pen does.
3. **Alterations show** — ink amounts in words are tamper-evident in a way reprintable thermal paper is not.

## Making handwritten receipts professional

Write legibly in ink, always duplicate (carbonless book or a photo before handover), number sequentially ([numbering systems](/blog/how-to-number-receipts)), and photograph everything into your records the same day — the hybrid workflow from [receipt book vs. digital](/blog/receipt-book-vs-digital). If clients expect polish, generate the same content as a clean PDF at [/create](/create) — the [cash receipt template](/templates/cash-receipt) reproduces everything a receipt book does, printable and signable.

## The bottom line

Valid, accepted, and occasionally superior — a handwritten receipt with complete fields, legible ink and a signature outranks most printed slips as evidence. Its real weaknesses are logistical (OCR, copies, polish), and a same-day photo fixes two of the three.`,
    faqs: [
      {
        q: "Does the IRS accept handwritten receipts?",
        a: "Yes. IRS documentary-evidence standards concern content — payee, amount, date, purpose — not printing method. A legible handwritten receipt substantiates an expense, especially alongside consistent records.",
      },
      {
        q: "Can a handwritten receipt be used in court?",
        a: "Yes — it's documentary evidence like any writing, and a signed one carries the signer's acknowledgment. Authenticity can be examined, which is why signatures and duplicates matter.",
      },
      {
        q: "Will my employer accept a handwritten receipt for expenses?",
        a: "Usually for categories where handwriting is normal — trades, markets, taxis in some countries. Meal and retail receipts are expected to be printed, so pair unusual handwritten receipts with the card statement.",
      },
      {
        q: "How do I make a handwritten receipt look professional?",
        a: "Ink, legible block letters, complete fields, sequential number, signature, duplicate copy — or transfer the same content to a clean printable template and sign that instead.",
      },
    ],
  },
];
