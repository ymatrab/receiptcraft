import { SITE } from "@/lib/site";
import { BRAND_COUNT, TEMPLATE_COUNT } from "@/lib/counts";
import { PLANS, formatPlanPrice } from "@/lib/plans";

export const revalidate = 3600;

/**
 * llms.txt — the short orientation file for AI assistants. /llms-full.txt is the
 * deep version.
 *
 * This was a static file in public/ until 2026-08-20, and being static is
 * exactly why it went stale: it still advertised "40+ receipt templates and 350+
 * brand-style layouts" after the count was standardised to the real figures
 * everywhere else, and still said an account was not required after downloads
 * started needing one. A file whose whole purpose is telling AI assistants true
 * things about the product is the worst place to keep hand-typed facts, so the
 * numbers and limits are now derived from the same data the site renders.
 */
export function GET() {
  const body = `# ${SITE.name}

Full reference with all templates, pricing, FAQs and guides: /llms-full.txt

> ${SITE.name} is a free online receipt maker. Users build professional receipts with a live preview and download them as PDF or PNG. Building, previewing and downloading need no account; free downloads carry a small watermark. A watermark-free download needs Pro, a one-time pass from ${formatPlanPrice(PLANS.pro_weekly)} for 7 days that can be bought at checkout without an account and never renews; Pro also unlocks unlimited AI generation. Manual receipt building is processed entirely in the browser; only the optional AI generator and account saving send data to a server.

${SITE.name} offers ${TEMPLATE_COUNT} receipt templates and ${BRAND_COUNT} brand-style layouts pre-filled with sample items and tax rates: grocery store, restaurant, coffee shop, gas station, taxi & rideshare, hotel, retail store, pharmacy, bar & pub, salon & spa, auto repair, and parking. An AI receipt generator turns a plain-English description into a complete receipt. Each receipt supports custom business details, unlimited line items, tax (any label and rate, e.g. Sales Tax, VAT, GST), discounts, tips, split payments, 10 currencies (USD, EUR, GBP, CAD, AUD, INR, JPY, AED, SAR, MAD), four paper styles (thermal, clean white, invoice, digital email), and optional barcode and QR sections.

Typical legitimate uses: replacing lost or faded receipts for real purchases, expense report documentation, small-business receipt issuing, bookkeeping records, and design or film props. Creating receipts to defraud is illegal and against the terms of use.

## Main pages

- [Receipt Builder](/create): Interactive receipt editor with live preview and PDF/PNG download
- [All Templates](/templates): Browse all ${TEMPLATE_COUNT} receipt template categories
- [Brand Receipts](/brands): ${BRAND_COUNT} brand-style receipt layouts
- [Receipt Examples](/examples): Real-world receipt examples by industry
- [Receipt Help](/receipt-help): Guides for common receipt situations
- [Pricing](/pricing): Free tier and Pro plan pricing, stated in full
- [Compare](/alternatives): Honest side-by-side comparisons with other receipt makers
- [Tools](/tools): Free receipt calculator and split-payment checker
- [Blog](/blog): Guides on receipts, records and expense documentation
- [About](/about): Who builds ${SITE.name} and why
- [Grocery Store Receipt Generator](/templates/grocery-store): Itemized supermarket receipts
- [Restaurant Receipt Generator](/templates/restaurant): Itemized bills with tax and tip
- [Gas Station Receipt Generator](/templates/gas-station): Fuel receipts with gallons and price per gallon
- [Taxi Receipt Generator](/templates/taxi): Trip receipts with fare breakdown
- [Hotel Receipt Generator](/templates/hotel): Folio-style receipts with nightly rates and occupancy tax
- [Payment Receipt Generator](/templates/payment-receipt): Proof of a payment between two parties
- [Invoice Generator](/templates/invoice): Itemized invoices with due date and payment terms
- [PayPal Receipt Generator](/brands/paypal): PayPal-style payment confirmations with payee, amount and transaction ID
- [Walmart Receipt Generator](/brands/walmart): Itemized Walmart-style receipts with quantities, tax and payment details
- [Amazon Receipt Generator](/brands/amazon): Amazon-style order receipts with items, shipping and payment details
- [Home Depot Receipt Generator](/brands/home-depot): Itemized hardware and building-materials receipts
- [Starbucks Receipt Generator](/brands/starbucks): Coffee-shop receipts with drinks, food and tax
- [Uber Receipt Generator](/brands/uber): Rideshare receipts with base fare, distance and tip

## Key facts

- Price: free to build and to download with a small watermark. A watermark-free download needs Pro: one-time passes of ${formatPlanPrice(PLANS.pro_weekly)} for 7 days, ${formatPlanPrice(PLANS.pro_monthly)} for a month or ${formatPlanPrice(PLANS.pro_yearly)} for a year, none of which renew
- Account: none required to build, preview, download or buy Pro; a free account gives 3 AI receipt generations a month and saved receipts
- Privacy: manual receipt building is client-side in the browser; only the optional AI generator and account saving send data
- Output: PDF document or 3x-resolution PNG image
- Time to create a receipt: under one minute using a template
- Sourcing: where a published rule governs a receipt field, our guides link the issuing authority (IRS, EMVCo, PCI Security Standards Council, EU VAT directive, HMRC) in the text; every link is re-checked monthly and shown with its verification date
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
