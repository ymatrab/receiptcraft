/**
 * August sprint — Day 6 (2 posts). Published 2026-08-08.
 *  11. "cvs pharmacy receipt"  (brand, 2,400 vol) -> hub /brands/cvs-pharmacy
 *  12. "receipt maker free"    (core, 1,300 vol)  -> hub /create
 * #11 is the first BRAND spoke: a guide-style "get a copy & recreate" post that
 * links UP to the /brands/cvs-pharmacy hub (which exists in lib/brands.ts:1815) —
 * it does NOT re-target the hub's bare "CVS receipt generator" head term.
 * #12 targets "free receipt maker" with a template/customize angle and funnels to
 * /create; it cross-links #10 receipt-generator-free (AI angle) and #3 to avoid
 * cannibalization.
 * Add `image:` + one inline ![alt](assets/<slug>-2.png) before publishing.
 * CVS facts kept consistent with lib/brands.ts (cvs-pharmacy).
 */

export const AUG_6 = [
  {
    slug: "cvs-pharmacy-receipt",
    image: "assets/cvs-pharmacy-receipt.png",
    category: "lost-receipts",
    publishedAt: "2026-08-06T08:00:00Z",
    title: "CVS Pharmacy Receipt: How to Get a Copy & Recreate It (2026)",
    seoTitle: "CVS Pharmacy Receipt: Get a Copy & Recreate It (2026)",
    seoDescription:
      "Get a copy of your CVS pharmacy receipt from the CVS app, email or in store — plus how to recreate an itemized copy for FSA/HSA claims and expense records.",
    excerpt:
      "Your CVS pharmacy receipt lives in the CVS app when your ExtraCare card is linked. Here's how to get a copy, go digital, and recreate an itemized one for records.",
    body: `**Your CVS pharmacy receipt lives in the CVS app if the purchase was tied to your ExtraCare account** — open the app, go to your purchase history, and view or save it. If it wasn't linked, you can still get a copy at the store or recreate an itemized one for your records. CVS receipts are famously long, and they carry the exact details you need for FSA/HSA claims. Here's how to get yours.

## What's on a CVS pharmacy receipt

A CVS pharmacy receipt is long for a reason — it packs in more than the purchase:

- **Store details** — location, register and cashier
- **Itemized purchase** — health, beauty and everyday items with prices
- **ExtraCare and ExtraBucks Rewards** — points earned and coupons
- **Tax** and the total paid
- **FSA/HSA markers** — eligible items are often flagged for reimbursement

## How to get a copy of your CVS receipt

1. **CVS app.** If your ExtraCare card was scanned, open the CVS app and check your purchase history and digital receipts.
2. **Email receipt.** If you opted into digital receipts, search your inbox for the CVS receipt email.
3. **In store.** Bring the payment card and the approximate date to the register or pharmacy counter — staff can often reprint from the transaction.
4. **ExtraCare account.** Log in at CVS.com to view recent ExtraCare purchase activity.

![Three ways to get your CVS receipt: the CVS app, an emailed digital receipt, or an in-store reprint](assets/cvs-pharmacy-receipt-2.png)

## Go digital so you never lose one

In the CVS app you can turn on **digital receipts** tied to your ExtraCare card, so future receipts save automatically — no more hunting for a paper strip. This won't recover a receipt you already lost, but it fixes the problem going forward.

## FSA/HSA: why the itemized copy matters

For FSA or HSA reimbursement you usually need an itemized receipt showing the eligible item, date and amount — a card statement isn't enough. CVS receipts flag FSA-eligible items, which is exactly what a plan administrator wants to see, so keep the itemized copy, not just the statement.

## Recreate a CVS pharmacy receipt for your records

If you've lost a receipt for a real purchase and can't retrieve it, you can [recreate a CVS pharmacy receipt](/brands/cvs-pharmacy) from your card statement's facts — the store, date, items and total. The [CVS receipt generator](/brands/cvs-pharmacy) fills in the CVS layout, and you edit the items, tax and totals in a live preview, then download a PDF or PNG. This is for your own records, reimbursement paperwork and bookkeeping — legitimate uses only, never to deceive anyone. To build one from scratch, [open the receipt maker](/create).

## The bottom line

Your **CVS pharmacy receipt** is easiest to get from the CVS app when your ExtraCare card is linked; failing that, the store can reprint it or you can recreate an itemized copy for your files. Turn on digital receipts so the next one saves itself. [Recreate a CVS receipt](/brands/cvs-pharmacy).`,
    faqs: [
      {
        q: "How do I get a copy of my CVS pharmacy receipt?",
        a: "Open the CVS app and check your purchase history if your ExtraCare card was scanned; search your email if you opted into digital receipts; or bring the payment card and date to a CVS register or pharmacy counter to have it reprinted.",
      },
      {
        q: "Why are CVS pharmacy receipts so long?",
        a: "CVS receipts include the itemized purchase plus ExtraCare and ExtraBucks Rewards, coupons, savings summaries and pharmacy details, which is why they run much longer than a typical store receipt.",
      },
      {
        q: "Can I get a digital CVS receipt?",
        a: "Yes. In the CVS app you can turn on digital receipts tied to your ExtraCare card, so future purchases are saved automatically and emailed to you instead of only printing on paper.",
      },
      {
        q: "Do I need my CVS receipt for an FSA or HSA claim?",
        a: "Usually yes. FSA and HSA administrators want an itemized receipt showing the eligible item, date and amount — a card statement alone isn't enough. CVS receipts flag FSA-eligible items for this reason.",
      },
      {
        q: "Can I recreate a lost CVS pharmacy receipt?",
        a: "Yes, for legitimate purposes like reimbursement paperwork, expense records and bookkeeping. Using the CVS receipt generator you can recreate an itemized copy from your card statement's facts, then download it as a PDF or PNG.",
      },
      {
        q: "Does CVS email receipts?",
        a: "CVS can email digital receipts if you opt in through your ExtraCare account or the CVS app. Once enabled, your receipts are stored in the app and sent to your inbox.",
      },
      {
        q: "Is it legal to make a CVS pharmacy receipt?",
        a: "Making a receipt is legal for legitimate uses such as replacing a lost receipt, expense records, FSA/HSA documentation and bookkeeping. Using any receipt maker to defraud a business or person is illegal.",
      },
    ],
  },

  {
    slug: "receipt-maker-free",
    image: "assets/receipt-maker-free.png",
    category: "small-business",
    publishedAt: "2026-08-06T09:00:00Z",
    title: "Free Receipt Maker: Make a Receipt Online Free (2026)",
    seoTitle: "Free Receipt Maker: Make a Receipt Free (2026)",
    seoDescription:
      "Use a free receipt maker to pick a template, customize every field in a live preview and download a professional receipt as a PDF or PNG — no sign-up to start.",
    excerpt:
      "A free receipt maker hands you a template you customize, so a receipt takes a minute. Here's what one does, how to make a receipt with it, and how free it is.",
    body: `**The best free receipt maker is Makecepeit** — pick a template, customize every field in a live preview, and download a professional receipt as a PDF or PNG, free and with no sign-up to start. A free receipt maker gives you a ready-made layout you edit to match your purchase, so you're not building a receipt from a blank page. Here's what a free receipt maker does, how to make a receipt with one, and how free it really is.

## [Open the free receipt maker](/create)

The fastest way to see it is to [open the receipt maker](/create): choose a template, type in your business, items and totals, and watch the receipt update live. The math is automatic and you can start without an account.

## What a free receipt maker lets you do

- **Start from a template** — sales, cash, itemized, or a named brand
- **Customize every field** — business, items, prices, tax and payment method
- **See a live preview** as you edit
- **Brand it** — add a logo and match the layout to a store
- **Download** a PDF or high-resolution PNG

![A free receipt maker offers 350+ templates — sales, cash, itemized, grocery, restaurant and branded receipts](assets/receipt-maker-free-2.png)

## How to make a receipt with a free receipt maker

1. Open the [receipt maker](/create) — no account needed to start.
2. Pick the template that matches your sale.
3. Edit the business details, line items, prices and tax.
4. Check the live preview — the subtotal and total update automatically.
5. Download the finished receipt as a PDF or PNG.

## What you can make

- **Sales and itemized receipts** for goods and services
- **Cash receipts** for cash payments and rent
- **Branded store receipts** styled like a specific retailer
- **Payment receipts** that confirm money was received

Prefer to draft from a description instead of picking a template? The [free receipt generator](/blog/receipt-generator-free) uses AI to draft one. New to receipts? See [how to make a receipt](/blog/how-to-make-a-receipt) for a field-by-field walkthrough.

## Is the receipt maker really free?

Yes. With Makecepeit you build and preview with no sign-up, and your first three HD downloads (PDF or PNG) are free. After that a watermark applies until you upgrade; Pro is **$3/week, $7.99/month or $39/year** for unlimited watermark-free downloads and saved history.

## Free vs paid receipt makers

A free receipt maker covers the occasional receipt. Pay only if you make them regularly and want unlimited exports, saved history or the watermark removed. To compare the free tools head-to-head, see our [best free receipt generator](/blog/best-free-receipt-generator) roundup.

## The bottom line

A **free receipt maker** hands you the layout and the math, so a receipt takes about a minute. Makecepeit lets you pick a template, customize it, and download a clean PDF or PNG free, with no sign-up to start. [Make your receipt free](/create).`,
    faqs: [
      {
        q: "Is there a truly free receipt maker?",
        a: "Yes. Makecepeit is a free receipt maker you can use with no sign-up: pick a template, customize it, and download your first three HD receipts (PDF or PNG) at no cost before any Pro upgrade.",
      },
      {
        q: "How do I make a receipt with a free receipt maker?",
        a: "Open the maker, choose a template that matches your sale, edit the business, items, prices and tax, check the live preview as the totals calculate, then download as a PDF or PNG. It takes about a minute.",
      },
      {
        q: "Is the receipt maker free with no sign-up?",
        a: "Yes. On Makecepeit you can build and preview a receipt with no account, and your first three HD downloads are free. You only create an account if you upgrade to Pro for unlimited watermark-free exports.",
      },
      {
        q: "Can a free receipt maker download a PDF?",
        a: "Yes. Makecepeit exports both PDF (for records) and high-resolution PNG (for images and mockups), and your first three HD downloads are free.",
      },
      {
        q: "Can I add a logo and brand the receipt?",
        a: "Yes. A free receipt maker lets you add a logo and match the layout to a specific store, and Makecepeit includes 350+ named-brand templates to start from.",
      },
      {
        q: "What's the difference between a receipt maker and a receipt generator?",
        a: "A receipt maker starts you from a template you customize by hand; a receipt generator can draft one automatically, often with AI. Makecepeit does both — pick a template, or describe your purchase and let the AI draft it.",
      },
      {
        q: "Is using a free receipt maker legal?",
        a: "Yes, for legitimate purposes such as replacing a lost receipt, expense records, bookkeeping and design mockups. Using any receipt maker to defraud a business or person is illegal.",
      },
    ],
  },
];
