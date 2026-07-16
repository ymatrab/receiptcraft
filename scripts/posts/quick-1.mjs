/** Cluster Q (Quick Answers) 1/4: Q1–Q5. 600–900 words, answer-first, one FAQ block. */

export const QUICK_1 = [
  {
    slug: "do-receipts-show-card-number",
    category: "digital",
    publishedAt: "2026-07-24T20:00:00Z",
    title: "Do Receipts Show Your Full Credit Card Number?",
    seoTitle: "Do Receipts Show Your Full Credit Card Number?",
    seoDescription:
      "No — US law (FACTA) limits electronically printed receipts to the last five digits and bans printing the expiration date. What's safe and what to still shred.",
    excerpt:
      "No. US federal law caps electronically printed receipts at the last five digits of your card and forbids printing the expiration date. Here's the rule and its edges.",
    body: `No — a receipt cannot legally show your full credit card number. Under the US Fair and Accurate Credit Transactions Act (FACTA), electronically printed receipts may display no more than the **last five digits** of the card number and must **not** print the expiration date. In practice, almost every receipt shows only the last four ("\\*\\*\\*\\*1234"), which is enough for you to identify the card and useless to anyone else.

## What the law requires

FACTA's receipt-truncation rule applies to any receipt printed electronically at the point of sale. The two hard requirements:

- **Card number:** at most the last five digits; the rest must be masked.
- **Expiration date:** must not appear at all.

The law targets the two pieces of data a thief needs together. Showing the last four digits identifies your card to you without exposing the number, and omitting the expiration date removes the second factor. Merchants who violate this face statutory penalties, and the rule has driven a wave of litigation against non-compliant retailers — so businesses take it seriously.

## The exceptions and edges

- **Handwritten or imprinted receipts** are outside FACTA's electronic-printing rule — the old "knuckle-buster" card imprints showed the full number, which is exactly why they've nearly vanished. If someone manually writes your full card number on a receipt, that's a practice to avoid.
- **The merchant's own copy** follows the same truncation on the customer-facing portion; internal processing data is handled under separate card-network security rules (PCI DSS), not printed for you.
- **Your card number never appears in full**, but other identifiers do their job: the [authorization code and reference number](/blog/credit-card-receipt-explained) tie the receipt to the transaction for disputes without exposing card data.

## What's still worth shredding

Even compliant receipts deserve care. The last four digits plus your name, the merchant, date and amount are mild personal data — not enough to clone a card, but useful to a determined fraudster building a profile. Shred receipts you're discarding rather than binning them whole, and be a little more careful with older receipts (pre-FACTA enforcement) or handwritten ones that may show more. For receipts you keep, [scanning and storing them digitally](/blog/scanned-receipts-irs) is both safer and more durable than a wallet full of paper.

## If a receipt DOES show too much

If you're handed an electronically printed receipt showing more than the last five digits or your expiration date, that merchant is out of compliance. It's worth flagging to the business, and — because FACTA provides for statutory damages — a pattern of it has been the basis of consumer claims. For your own protection, treat such a receipt like sensitive data: don't leave it behind, and shred it when done.

## The bottom line

Receipts don't show your full card number — FACTA caps them at the last five digits (usually four) and bans the expiration date. The masking is why a lost receipt is an annoyance rather than a fraud emergency. Shred what you discard anyway, watch for the rare non-compliant or handwritten exception, and keep the receipts that matter [digitally](/blog/receipt-organization-systems) rather than in a wallet.`,
    faqs: [
      {
        q: "Can a receipt legally show my full credit card number?",
        a: "No — US FACTA law limits electronically printed receipts to the last five digits (most show four) and prohibits printing the expiration date. Showing more is a compliance violation.",
      },
      {
        q: "Why do receipts show the last four digits of my card?",
        a: "So you can identify which card you used, without exposing the full number. Four digits plus the expiration date omission means the printed data can't be used to clone or charge the card.",
      },
      {
        q: "Should I still shred receipts that only show four digits?",
        a: "Yes — the last four digits plus your name, merchant, date and amount are mild personal data useful for profiling. Shred discarded receipts, and store the ones you keep digitally.",
      },
      {
        q: "What if a receipt shows my whole card number?",
        a: "An electronically printed receipt showing more than five digits or the expiration date violates FACTA. Flag it to the merchant, treat the receipt as sensitive, and shred it — such practices have supported consumer claims.",
      },
    ],
  },

  {
    slug: "amount-tendered-meaning",
    category: "basics",
    publishedAt: "2026-07-24T21:00:00Z",
    title: 'What Does "Amount Tendered" Mean on a Receipt?',
    seoTitle: 'What Does "Amount Tendered" Mean on a Receipt?',
    seoDescription:
      '"Amount tendered" is the money you handed over to pay — cash given or card charged. It appears above the change line to show how the total was settled.',
    excerpt:
      '"Amount tendered" is simply the money you gave to pay — the cash you handed over or the amount charged to your card. Here\'s why it\'s on the receipt.',
    body: `"Amount tendered" on a receipt means the amount of money you handed over (or authorized) to pay for the purchase. "Tender" is an old commercial word for offering payment — so amount tendered is the payment you offered, which the receipt records alongside the total due and any change given back. If you pay a $17.40 total with a $20 bill, the receipt shows "Amount tendered: $20.00" and "Change: $2.60."

## Why it appears on the receipt

The tendered line documents *how the total was settled* — it closes the loop between what you owed and what you paid:

- **Total:** what the purchase cost ($17.40).
- **Amount tendered:** what you gave ($20.00 cash, or the card amount).
- **Change:** the difference returned ($2.60).

For cash transactions this trio proves the math was done correctly and change was owed and given — useful in a dispute, and standard on register receipts. For card transactions, "amount tendered" usually just equals the total (you tender the exact amount via card), so the change line reads $0.00 or is omitted.

## Related terms you'll see nearby

- **"Tender type"** — the *method* of payment (cash, Visa, debit, gift card). A single transaction can have multiple tenders: "$10.00 cash + $7.40 Visa" is a split tender.
- **"Change due"** — the amount returned to you; only meaningful for cash.
- **"Balance"** — on partial payments, what remains owed after the tender (common on [deposit and installment receipts](/blog/partial-payment-receipt)).

The tendered/change pairing is part of the standard [payment block every receipt carries](/blog/parts-of-a-receipt).

## Split tenders and gift cards

"Amount tendered" gets more interesting with multiple payment methods. Pay a $50 total with a $30 gift card and $20 cash, and the receipt lists each tender separately — "Gift card: $30.00, Cash: $20.00, Total tendered: $50.00" — so you (and the store) can see exactly how the balance was cleared. This matters for returns: a refund typically goes back to the tenders in some defined order, so the receipt's record of what you tendered determines how you're refunded.

## The bottom line

"Amount tendered" is just the money you offered to pay — cash handed over or card charged. Paired with the total and the change line, it documents that the transaction was settled correctly. For cash it shows why you got change; for cards it usually equals the total. It's plumbing, not a puzzle — the receipt showing its work.`,
    faqs: [
      {
        q: 'What does "amount tendered" mean?',
        a: "The amount of money you handed over or authorized to pay — cash given or card charged. Paired with the total and change lines, it shows how the purchase was settled.",
      },
      {
        q: 'What is the difference between "total" and "amount tendered"?',
        a: "The total is what the purchase cost; the amount tendered is what you actually gave to pay it. When you pay cash with a larger bill, the tendered amount exceeds the total and the difference is your change.",
      },
      {
        q: 'What does "tender type" mean on a receipt?',
        a: "The method of payment — cash, credit, debit, gift card. A transaction can have multiple tender types (a split tender), each listed separately on the receipt.",
      },
      {
        q: 'Why does my card receipt say amount tendered equals the total?',
        a: "Because a card charges the exact amount owed — you tender precisely the total, so there's no change. The tendered line is most meaningful for cash payments, where change is returned.",
      },
    ],
  },

  {
    slug: "sku-meaning-receipt",
    category: "basics",
    publishedAt: "2026-07-25T20:00:00Z",
    title: "What Does SKU Mean on a Receipt?",
    seoTitle: "What Does SKU Mean on a Receipt?",
    seoDescription:
      "SKU stands for Stock Keeping Unit — a store's internal code identifying a specific product. How it differs from a UPC barcode and why it's on your receipt.",
    excerpt:
      "SKU means Stock Keeping Unit — the store's own internal code for a specific product. Here's how it differs from a barcode and why it matters for returns.",
    body: `SKU on a receipt stands for **Stock Keeping Unit** — a store's internal code that identifies a specific product, right down to its size, color and variant. When you see "SKU 483920" next to an item, that's the retailer's own inventory number for exactly that thing, used to track stock, ring up sales and process returns. It's the store's private product ID, as opposed to the universal barcode printed on the packaging.

## SKU vs. UPC: the key difference

These get confused constantly, but they're different systems:

- **SKU (Stock Keeping Unit):** the retailer's *own* code, unique to that store or chain. Two different stores selling the same shirt assign it different SKUs. SKUs are alphanumeric and often encode meaning (department, brand, size) that staff can read.
- **UPC (Universal Product Code):** the *manufacturer's* barcode, the same everywhere — the 12-digit number under the barcode lines. A can of a specific soda has one UPC worldwide, scanned at every store that sells it.

So the UPC identifies the *product* globally; the SKU identifies how *this retailer* stocks and sells it. A receipt may show either or both.

## Why the SKU is on your receipt

The SKU makes your purchase precise and traceable:

- **Returns and exchanges:** the SKU tells the store exactly which variant you bought — the medium blue, not the large green — so returns match to the right item and price.
- **Inventory tracking:** scanning your item at checkout decremented that SKU's stock count; the receipt records which unit sold.
- **Price verification:** the SKU ties the item to its price in the system, resolving "was I charged right?" questions.
- **Warranty and support:** for electronics and appliances, the SKU pins down the exact model.

It's part of what makes the itemized receipt more useful than a card slip — the [itemization that carries real product detail](/blog/itemized-receipt-guide).

## Reading SKUs on a receipt

Retailers abbreviate heavily, so a receipt line might read "MENS TEE BLU M — SKU 483920 — 14.99." The truncated description plus the SKU together identify the item; the SKU is the authoritative part, since [descriptions get compressed](/blog/how-to-make-a-grocery-receipt) to fit narrow paper. If you ever need to reference the exact product to customer service, the SKU is the number to quote.

## The bottom line

SKU means Stock Keeping Unit — the store's internal code for a specific product variant. Unlike the universal UPC barcode, it's the retailer's own numbering, and it's on your receipt to make returns, price checks and inventory precise. When a return desk or support line asks "which item exactly?", the SKU is the answer.`,
    faqs: [
      {
        q: "What does SKU stand for on a receipt?",
        a: "Stock Keeping Unit — a retailer's internal code identifying a specific product variant (size, color, model). It's the store's own inventory number, used for sales tracking, returns and price verification.",
      },
      {
        q: "What's the difference between a SKU and a barcode?",
        a: "A SKU is the retailer's own internal code, unique to that store or chain; the UPC barcode is the manufacturer's universal code, identical everywhere. The UPC identifies the product globally; the SKU identifies how this store stocks it.",
      },
      {
        q: "Why is a SKU printed on my receipt?",
        a: "To make your purchase precise: it lets the store match returns to the exact variant, verify the price, track inventory, and identify the model for warranty or support. It's part of a fully itemized receipt.",
      },
      {
        q: "Do I need the SKU to return an item?",
        a: "Not usually — the receipt's barcode or transaction lookup handles returns. But the SKU is the most precise product identifier on the receipt, useful when referencing the exact item to customer service.",
      },
    ],
  },

  {
    slug: "receipt-survey-code",
    category: "digital",
    publishedAt: "2026-07-25T21:00:00Z",
    title: "Why Is There a Survey Code on My Receipt?",
    seoTitle: "Why Is There a Survey Code on My Receipt?",
    seoDescription:
      "That survey code invites you to rate your visit — often for a prize or discount. Why stores print them, whether they're worth doing, and what data you're sharing.",
    excerpt:
      "The survey code invites you to rate your visit, usually dangling a prize or coupon. Here's why stores print them and whether it's worth your two minutes.",
    body: `The survey code on your receipt is an invitation to complete a customer-satisfaction survey — usually a website and a code (or a QR code), often dangling a reward: a sweepstakes entry, a discount on your next visit, or free-item validation. Stores print them because feedback tied to a real transaction is valuable market research, and the incentive is what convinces enough customers to bother.

## Why stores want you to do it

A survey linked to your specific visit gives the retailer data it can't get otherwise:

- **Store-level performance:** which locations delight or disappoint, traceable to the store, date and time on your receipt.
- **Transaction context:** they know what you bought and when, so your rating attaches to a real experience, not a vague memory.
- **Operational signals:** speed, cleanliness, staff friendliness — the metrics that drive manager bonuses and staffing.

The code ties your feedback to the transaction data the store already has, which is why the survey asks you to enter numbers from the receipt (store number, transaction ID, date/time) — those match your response to the visit.

## Is it worth doing?

Depends on the reward and your time:

- **Real discounts** (a percentage off, a free item with purchase) can be worth the two minutes if you'll return to that store.
- **Sweepstakes entries** ("win $1,000!") have long odds — treat them as near-zero value, though they cost only time.
- **No reward** surveys are pure goodwill; skip unless you have strong feedback to give.

If you had a genuinely great or bad experience, the survey is also the most direct line to the store's management — feedback tied to a receipt gets read.

## What data you're sharing

Completing the survey links your opinions to your purchase — and if the reward requires an email or account, to your identity and contact info. That's the quiet trade: the discount is paid for with data connecting your feedback, purchase and contact details, feeding marketing and research. It's the same data logic behind [what stores learn from digital receipts](/blog/digital-receipts-guide). Nothing sinister, but worth knowing the coupon isn't free.

## A caution on survey QR codes

Scan survey QR codes with ordinary care — a legitimate one resolves to the retailer's or its survey vendor's domain. As with any [receipt QR code](/blog/receipt-qr-codes-barcodes), check the domain before entering anything, and never provide payment details to a "survey" (no real one asks).

## The bottom line

The survey code invites you to rate your visit, usually for a discount or sweepstakes entry, because transaction-linked feedback is valuable to the store. Worth doing for real rewards or strong feedback; skippable otherwise. Just remember the reward is paid for with data connecting your opinions, purchase and contact info — a fair trade if you go in knowing it.`,
    faqs: [
      {
        q: "Why do receipts have survey codes?",
        a: "To collect customer feedback tied to your specific visit — valuable market research for the store. The code matches your survey response to the transaction data, which is why you enter numbers from the receipt.",
      },
      {
        q: "Are receipt surveys worth doing?",
        a: "For real rewards (a discount or free item you'll use) or when you have strong feedback, yes. Sweepstakes-only surveys have long odds and are worth only your spare time.",
      },
      {
        q: "What data do I give up completing a receipt survey?",
        a: "Your opinions linked to your purchase, and — if the reward needs an email or account — your contact details. The discount is effectively paid for with that data, feeding the store's marketing and research.",
      },
      {
        q: "Are receipt survey QR codes safe?",
        a: "Generally yes if they resolve to the retailer's or its survey vendor's domain. Check the domain before entering anything, and never give payment details to a survey — no legitimate one asks.",
      },
    ],
  },

  {
    slug: "picture-of-receipt-return",
    category: "lost-receipts",
    publishedAt: "2026-07-26T20:00:00Z",
    title: "Can You Use a Picture of a Receipt for a Return?",
    seoTitle: "Can You Use a Picture of a Receipt for a Return?",
    seoDescription:
      "Often yes — many stores accept a clear photo of a receipt for returns, especially if the barcode is legible. When it works, when it doesn't, and how to improve your odds.",
    excerpt:
      "Often yes. Many retailers accept a clear photo of a receipt for returns, particularly when the barcode scans. Here's when it works and how to help it along.",
    body: `Yes, you can often use a picture of a receipt for a return — many retailers accept a clear photo, especially when the barcode is legible enough to scan or the transaction details are readable enough to look up. Store policies vary, and some insist on the original paper, but a good photo works more often than not, because what the store really needs is the transaction information, not the specific piece of paper.

## Why a photo usually works

Returns are verified against the store's own transaction records, not the physical receipt ([how stores verify receipts](/blog/how-stores-verify-receipts)). A photo that shows the [barcode](/blog/receipt-qr-codes-barcodes) lets the desk scan it (from your screen or a printout) and pull the original sale; a photo showing the store, date, transaction number and card details lets them look it up manually. Either way, the paper original isn't magic — it's a carrier for information a clear photo carries just as well.

## When it works best

- **The barcode is sharp and complete** — scannable from your phone screen, which makes the return as smooth as the paper would.
- **All key details are legible** — store, date, transaction/receipt number, items, total, payment method.
- **You paid by card** — even if the photo is imperfect, the [card lookup](/blog/return-without-receipt-policies) backs it up.
- **Within the return window** — a photo doesn't extend deadlines.

## When a photo may not be enough

- **Strict store policies** requiring original receipts (some do, for high-fraud categories).
- **Blurry or partial photos** where the barcode won't scan and details are unreadable.
- **Cash purchases with a poor photo** and no card to fall back on.

If the photo fails, you're not stuck — you fall back to the same options as any [no-receipt return](/blog/return-without-receipt-reddit): card lookup, loyalty account, or ID-based store credit.

## How to improve your odds

1. **Photograph receipts well the first time** — flat, well-lit, the whole receipt including the barcode, in focus. This is the [capture-at-purchase habit](/blog/organize-receipts-reddit) that makes lost paper a non-issue.
2. **Keep the email version** if you got one — a digital receipt is even better than a photo of a paper one.
3. **Bring the card you paid with** as backup.
4. **Have the photo ready to scan** — screen brightness up, barcode centered.

## The bottom line

A clear photo of a receipt works for returns at most stores, especially when the barcode scans or the details are readable — because the store verifies against its records, and the photo carries the same information as the paper. Snap receipts properly at purchase, keep the email version when offered, and bring your card, and a photographed receipt handles the vast majority of returns.`,
    faqs: [
      {
        q: "Can I return an item with a photo of the receipt?",
        a: "Often yes — many stores accept a clear photo, especially if the barcode scans or the transaction details are legible. They verify against their own records, so the photo carries the same information as the paper.",
      },
      {
        q: "What makes a receipt photo work for returns?",
        a: "A sharp, complete image showing the barcode and all key details (store, date, transaction number, items, total, payment method), taken flat and well-lit — and being within the return window, which a photo doesn't extend.",
      },
      {
        q: "What if the store won't accept my receipt photo?",
        a: "Fall back to a no-receipt return: card lookup finds the purchase if you paid by card, or ID-based store credit at the item's lowest recent price. A digital email receipt, if you have one, is stronger than a photo.",
      },
      {
        q: "Is an email receipt better than a photo for returns?",
        a: "Yes — a digital email receipt is native, always legible, and easy to present or forward, whereas a photo can be blurry or partial. Keep email receipts when offered; they're the most reliable return proof.",
      },
    ],
  },
];
