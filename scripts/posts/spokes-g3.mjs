/** Cluster G (Digital) spokes 3/3: G7, G10. */

export const SPOKES_G3 = [
  {
    slug: "receipt-qr-codes-barcodes",
    category: "digital",
    publishedAt: "2026-07-19T15:00:00Z",
    title: "What Do the QR Codes and Barcodes on Receipts Do?",
    seoTitle: "Receipt QR Codes & Barcodes: What Each One Does",
    seoDescription:
      "The barcode encodes the transaction ID for returns; QR codes carry surveys, digital-receipt links, loyalty hooks — and in some countries, government tax verification.",
    excerpt:
      "That barcode is your transaction's address in the store's database; the QR might be a survey, your e-receipt, or a national tax authority checking the merchant. The decoder ring.",
    body: `The barcode on a receipt encodes the transaction identifier — scan it at the returns desk and the full sale appears, which is what makes barcode returns and reprints instant. QR codes are more varied: survey invitations, links to a digital copy of the receipt, loyalty enrollment, payment confirmation — and in a growing list of countries, government-mandated fiscal verification codes that let anyone confirm the receipt was reported to the tax authority.

## The barcode: your transaction's database key

Usually a 1D barcode (Code 128 or similar) encoding the receipt/transaction number — store, register, date, sequence in one string ([how those numbers are built](/blog/what-is-a-receipt-number)). Its jobs:

- **Returns:** scanning pulls the original sale — items, prices, payment — no typing, no arguing.
- **Reprints:** a faded receipt with a readable barcode is fully recoverable at customer service ([the Target pattern](/blog/target-receipt-lookup)).
- **Fraud control:** barcodes mark a receipt as used once refunded, blocking double returns — part of the verification machinery in [how stores verify receipts](/blog/how-stores-verify-receipts).

Practical corollary: when photographing receipts, capture the barcode — it's the most operationally useful square centimeter on the paper.

## The QR codes, by species

1. **Survey QRs** — the "tell us how we did, win $500" codes, linking to feedback forms keyed to your transaction ([the survey-code economy](/blog/receipt-survey-code) has its own logic).
2. **Digital-receipt QRs** — scan to download the e-receipt PDF or claim it into an app; the paper-to-digital bridge from the [digital receipts guide](/blog/digital-receipts-guide).
3. **Loyalty and app hooks** — enroll, claim points for this purchase, or open the retailer's app pre-loaded with the transaction.
4. **Payment QRs** — on pay-at-table and invoice receipts, a code that opens the payment flow; on paid receipts, sometimes the processor's confirmation.
5. **Fiscal verification QRs — the serious ones.** In much of the EU, Latin America and beyond, law requires receipts to carry a QR encoding a government-registered transaction signature: scan it and the tax authority's site confirms the sale was reported (Italy, Portugal, Greece, Brazil's NFC-e, Saudi ZATCA...). These are anti-evasion infrastructure — the certified-register world described in [receipt requirements by country](/blog/receipt-requirements-by-country) — and they're why some countries' receipt QRs look official: they are.

## Should you scan random receipt QRs?

Reasonable caution applies: a receipt QR from a store you just paid is low-risk, but QR phishing exists — check the domain before entering anything, and never enter card details from a "receipt" QR (no legitimate receipt flow asks). Fiscal QRs resolve to government domains; survey QRs to the retailer or its survey vendor.

## For businesses issuing receipts

A QR linking to the digital copy of the receipt is the highest-utility, lowest-effort addition — customers self-serve their lost-receipt problem ([the problem you're solving](/blog/how-to-replace-a-lost-receipt)). Keep one QR per receipt; three competing codes get zero scans.

## The bottom line

Barcode = the transaction's key (returns, reprints, fraud control); QR = a link — to a survey, your e-receipt, a loyalty hook, or in fiscalized countries, the tax authority's ledger. Photograph the barcode, scan QRs with ordinary skepticism, and if you print receipts, make your QR the useful one.`,
    faqs: [
      {
        q: "What does the barcode on a receipt contain?",
        a: "The transaction identifier — encoding store, register, date and sequence. Scanning it retrieves the full sale for returns, reprints and refund tracking; it's the receipt's database key, not a product code.",
      },
      {
        q: "Can a store reprint my receipt from the barcode?",
        a: "Generally yes — a readable barcode on even a badly faded receipt pulls the original transaction, and customer service can reprint it. A photo of the barcode usually works too.",
      },
      {
        q: "Why do receipts in some countries have official QR codes?",
        a: "Fiscal law: many countries require receipts to carry government-verifiable codes proving the sale was reported for tax. Scanning them opens the tax authority's verification page — anti-evasion infrastructure, not marketing.",
      },
      {
        q: "Are receipt QR codes safe to scan?",
        a: "Usually — surveys, e-receipts and loyalty links from a merchant you just visited are low-risk. Check the domain it opens, and treat any receipt QR requesting card details as fraudulent; no legitimate flow does that.",
      },
    ],
  },

  {
    slug: "switch-to-digital-receipts",
    category: "digital",
    publishedAt: "2026-07-23T15:00:00Z",
    title: "How to Switch Your Business to Digital Receipts",
    seoTitle: "How to Switch Your Business to Digital Receipts (Playbook)",
    seoDescription:
      "Move from paper to digital receipts in five steps: pick the delivery rails, set up capture-free checkout, handle consent and privacy, keep a paper fallback, measure adoption.",
    excerpt:
      "Going paperless at the register is a five-step project: rails, checkout flow, consent, fallback, measurement. The playbook, including the mistakes that stall adoption at 20%.",
    body: `Switching to digital receipts is a five-step project: choose the delivery rails (email, SMS, app — usually via your POS's built-in feature), design the checkout ask so it takes three seconds, handle consent and privacy honestly, keep a paper fallback for the customers and cases that need it, and measure adoption monthly. Done well, businesses commonly reach majority digital within a quarter — cutting paper cost, support requests, and the fading-receipt complaints that follow thermal paper everywhere.

## Step 1: pick the rails

Modern POS systems (Square, Toast, Clover, Shopify, Lightspeed) ship digital receipts natively — email and SMS, with card-linked memory so repeat customers never re-enter details. Use what's built in before buying anything: the integration battles are pre-fought. E-commerce is digital by default; the project is the counter. Format standards for what you send are in [email receipt best practices](/blog/email-receipt-best-practices) — itemized body, searchable subject, marketing restraint.

## Step 2: design the three-second ask

Adoption lives or dies at the prompt. What works: the customer-facing terminal offering "Email / Text / Print / None" as equal buttons; card-linked recall ("send to j***@gmail.com again?"); staff phrasing that assumes digital ("want that emailed like last time?"). What stalls at 20%: cashiers asking "do you want a receipt?" (customers hear "no receipt"), typing emails verbally at a queue's expense, and paper printing anyway alongside the email — which deletes the cost savings and the point.

## Step 3: consent and privacy, honestly

A receipt email address is contact data: use it for receipts freely, for marketing only with explicit opt-in — a separate checkbox, not a buried assumption. Customers know stores mine e-receipt data ([what stores learn from e-receipts](/blog/digital-receipts-guide) is a real question they ask); the businesses that win adoption are the ones whose answer is boring. State it plainly at the prompt ("we'll only use this for your receipt") and honor it.

## Step 4: keep the paper fallback

Cash customers, returns desks that want paper, gift receipts, older customers, network outages — the fallback printer stays ([the hardware you're winding down](/blog/thermal-receipt-printers-guide) still earns its socket). Some contexts also carry paper expectations or legal wrinkles ([the by-country picture](/blog/receipt-requirements-by-country) matters if you operate beyond the US). Digital-first, not digital-only, is the operationally sane posture.

## Step 5: measure and iterate

Track digital share monthly, by register and staff member — the variance between cashiers is the coaching list. Watch bounce rates (typos at entry), re-send requests (findability problems — fix your subject lines), and repeat-customer recall rates. Your own books benefit in parallel: issued digital receipts archive themselves into your records, tightening the [bookkeeping loop](/blog/recording-receipts-bookkeeping).

## The bottom line

Rails from your POS, a three-second equal-buttons ask, honest consent, paper in reserve, numbers monthly. The switch pays in supply costs, support time and customer goodwill — and if you're small enough to lack a POS, skip straight to emailed PDFs from the [free receipt generator](/create): digital receipts without a single new device.`,
    faqs: [
      {
        q: "Are digital receipts legal for businesses?",
        a: "Yes, broadly — US card rules and consumer expectations are satisfied by emailed or texted receipts, with paper on request as the safe fallback. Some regulated contexts and countries retain paper or fiscal-system requirements.",
      },
      {
        q: "How do stores send receipts without asking for email every time?",
        a: "Card-linked memory: the POS associates the (tokenized) card with the previously provided address, so repeat customers get one-tap 'send again.' It's built into Square, Toast, Clover and similar systems.",
      },
      {
        q: "Can we use receipt email addresses for marketing?",
        a: "Only with separate, explicit opt-in. A receipt address is transactional data; folding it silently into marketing lists risks spam law violations and — faster — customer trust. Ask with an unambiguous checkbox.",
      },
      {
        q: "What digital adoption rate should we expect?",
        a: "With equal-buttons prompts and card recall, majority digital within a quarter is common in retail and food service; verbally-asked email entry stalls near 20%. The prompt design, not the customer base, is usually the variable.",
      },
    ],
  },
];
