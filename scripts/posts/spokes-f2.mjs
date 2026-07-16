/** Cluster F (How-To) spokes 2/5: F5–F7. */

export const SPOKES_F2 = [
  {
    slug: "how-to-make-a-hotel-receipt",
    category: "how-to",
    publishedAt: "2026-07-15T14:00:00Z",
    title: "How to Make a Hotel Receipt (Folio Format Explained)",
    seoTitle: "How to Make a Hotel Receipt (Folio Format Explained)",
    seoDescription:
      "Hotel receipts follow folio format: dated postings per night, room and tax lines, incidentals, payments and a zero balance. The structure, step by step.",
    excerpt:
      "Hotels don't print shop receipts — they print folios: a dated ledger of postings, night by night, ending at zero. The folio structure and how to build one correctly.",
    body: `A hotel receipt is a **folio** — not an itemized shop slip but a dated ledger of the stay: each night's room rate posted as its own line with its taxes, incidentals posted on the dates they occurred, then payments applied, ending at a zero balance. Making one correctly means thinking in postings, not items. The [hotel receipt template](/templates/hotel) is built on exactly this structure.

Legitimate uses: independent properties and hosts issuing guest receipts, travelers reconstructing a real stay's record for their own files (after trying [the folio-request email](/blog/hotel-folio-after-checkout), which retrieves the original for years), prop design, and software testing. Reimbursement submissions need the genuine folio — the reasons policies insist are in [why companies require itemized hotel receipts](/blog/itemized-hotel-receipt-reimbursement).

## The folio structure, step by step

1. **Property header:** hotel name, address, phone; chains add property codes.
2. **Guest and stay block:** guest name, room number, arrival and departure dates, number of guests, confirmation and folio numbers, rate code.
3. **Nightly postings:** each night on its own dated line — "07/14 ROOM CHARGE 189.00" — followed by that night's taxes as separate dated lines: occupancy/lodging tax, state or city taxes, resort or destination fee if the property charges one.
4. **Incidentals, dated:** parking per night, restaurant charges on their days, minibar, laundry — each with its date and department.
5. **Payments and balance:** deposits and the final settlement as credit lines ("07/16 VISA ****4821 −612.48"), ending "BALANCE: 0.00" — the signature of a closed folio.

## The tax layer that sells it

Lodging taxes are the folio's fingerprint: occupancy taxes commonly run 8–15% and are levied per night, often as two or three stacked lines (state + city + district), and resort fees are themselves taxed in many jurisdictions. A folio showing one generic "tax" total on the last line reads as wrong; nightly, named tax postings read as real. Rates are public — a reconstruction of a real stay should use the actual locality's.

## Business-stay formatting

Corporate folios add: company name and address in the bill-to block (hotels reissue folios in company names on request), split-folio arrangements separating room from incidentals, and VAT fields internationally (the [VAT receipt requirements](/blog/vat-receipt-explained) apply to hotels squarely — VAT number, per-rate breakdown).

## Make one now

The [hotel template](/templates/hotel) at [/create](/create) lays out the guest block, dated posting rows, stacked tax lines and payment/balance footer. Enter nights, rate and locality taxes; the ledger math — postings minus payments equals zero — stays consistent by construction.

## The bottom line

Folios are dated ledgers: room-plus-tax per night, incidentals on their days, payments to zero. Structure it as postings and the document is correct; structure it as a shopping list and it never will be. Recreate only real stays, for your own records — the original is one polite email away.`,
    faqs: [
      {
        q: "What is folio format on a hotel receipt?",
        a: "A dated transaction ledger: every charge posted on its date — each night's room and taxes separately, incidentals as they occur — then payments credited, closing at a zero balance. It reads as an account history, not an item list.",
      },
      {
        q: "What taxes appear on a hotel folio?",
        a: "Occupancy or lodging taxes (often 8–15%, sometimes several stacked lines for state, city and district), taxes on resort fees where applicable, and standard sales tax on restaurant or shop charges. They post nightly, not as one final total.",
      },
      {
        q: "Can I get my real folio after checkout instead of recreating it?",
        a: "Almost always — email the property with your dates and confirmation number, or pull it from the loyalty app. Hotels retain folios for years, and the genuine document is what expense reports require.",
      },
      {
        q: "What makes a folio look complete?",
        a: "The zero balance. A folio ends with payments applied against all postings — 'Balance: 0.00.' Missing payment lines or a hanging balance are what make a folio read as unfinished.",
      },
    ],
  },

  {
    slug: "how-to-make-a-grocery-receipt",
    category: "how-to",
    publishedAt: "2026-07-16T14:00:00Z",
    title: "How to Make a Grocery Store Receipt",
    seoTitle: "How to Make a Grocery Store Receipt (Realistic Format)",
    seoDescription:
      "Grocery receipts have their own grammar: abbreviated items, department codes, tax flags per line, savings summaries. Build one correctly in 6 steps.",
    excerpt:
      "ABBREV MILK 2% 3.49 F — grocery receipts speak their own language: truncated names, tax flags, department codes, loyalty savings. The 6-step build that gets the dialect right.",
    body: `To make a grocery store receipt: store header, timestamp and register metadata, items in abbreviated ALL-CAPS with per-line tax flags, weighed produce with per-pound math, a savings/loyalty section, then the tax summary by flag and the payment block. Grocery receipts are the most idiosyncratic retail format — the realism lives in the details. The [grocery store template](/templates/grocery-store) has the dialect built in.

Legitimate uses: small grocers and markets issuing receipts, replacing a faded original of a real shop for records or returns (though [store loyalty lookups](/blog/how-to-replace-a-lost-receipt) usually recover the original), props for film and staging, and OCR/app testing.

## The 6 steps

1. **Header:** chain name, store address, phone, store number and manager line — supermarket receipts are header-heavy.
2. **Register metadata:** date, time, store/register/cashier/transaction numbers — "ST# 0412 OP# 004 TE# 07 TR# 08122."
3. **Items, in grocery grammar:** ALL-CAPS truncated names ("GV WHL MILK", "BNLS CKN BRST"), quantity lines ("2 @ 2.50"), and weighed goods showing the scale math — "BANANAS 2.34 lb @ 0.59/lb 1.38." Each line ends with its tax flag: F (food/untaxed), T or X (taxable) — conventions vary by chain.
4. **Savings section:** loyalty discounts per item ("CARD SAVINGS −0.50"), coupons, and the summary line chains love: "YOU SAVED $6.42."
5. **Tax summary:** subtotal, then tax computed only on flagged items — many states exempt unprepared food, so a mixed basket shows tax far below the naive rate. This split is the top realism failure in fabricated grocery receipts.
6. **Payment block:** method, last four, change; then footer — survey code, return policy, item count ("ITEMS SOLD: 27").

## Why the tax flags matter

Grocery taxation is per-item law: staple foods exempt in most states, sodas and candy taxable in many, prepared foods taxable nearly everywhere, household goods always. The receipt encodes this per line and totals it per class — reproducing that structure (rather than taxing everything) is what makes the math check out against the printed tax. The general anatomy is in [what information must a receipt include](/blog/parts-of-a-receipt).

## Make one now

The [grocery template](/templates/grocery-store) at [/create](/create) handles abbreviations, weight lines, tax flags and the savings block — enter items and it formats them in register style with a consistent tax summary, printable as a thermal-width PDF.

## The bottom line

Grocery realism is grammatical: truncation, flags, scale math, savings lines, split taxes. Get the dialect right and the totals honest — and reconstruct only real baskets, for your own records.`,
    faqs: [
      {
        q: "What do the letters next to grocery items mean?",
        a: "Tax flags: they mark each item's tax class — commonly F for exempt food, T or X for taxable goods, with chain-specific variants. The tax summary computes only on flagged taxable lines.",
      },
      {
        q: "Why is the tax on my grocery receipt so low?",
        a: "Most states exempt unprepared staple foods from sales tax, so only part of a mixed basket — household goods, sodas, prepared items — is taxed. The receipt's flags show exactly which lines.",
      },
      {
        q: "How do grocery receipts show produce?",
        a: "As scale math: weight, unit price and extension — 'BANANAS 2.34 lb @ 0.59/lb 1.38.' Priced-by-unit produce shows quantity lines instead ('3 @ 0.79').",
      },
      {
        q: "Can I get an old grocery receipt reprinted?",
        a: "If the trip was tied to a loyalty card or app, usually yes — customer service can reprint from your account, and many chains store digital receipts automatically. Cash without loyalty is generally unrecoverable.",
      },
    ],
  },

  {
    slug: "how-to-make-a-parking-receipt",
    category: "how-to",
    publishedAt: "2026-07-17T14:00:00Z",
    title: "How to Make a Parking Receipt",
    seoTitle: "How to Make a Parking Receipt (Garage, Meter & Valet)",
    seoDescription:
      "Parking receipts come in three formats — garage entry/exit, meter/kiosk, and valet. The fields each needs, the duration math, and a free template.",
    excerpt:
      "Entry 08:12, exit 17:40, rate table, total — parking receipts are tiny duration ledgers in three dialects: garage, kiosk and valet. Each format, field by field.",
    body: `A parking receipt documents a duration: where the vehicle was, from when to when, at what rate, for what total. Three formats cover the landscape — garage receipts (entry/exit stamps and a rate calculation), meter or kiosk receipts (prepaid duration with an expiry time), and valet tickets (claim stubs with location and fees). The [parking receipt template](/templates/parking) covers the standard cases.

Legitimate uses: lots and valets issuing receipts, drivers reconstructing a real charge for expense files (parking stubs are among the most-lost receipts — [the under-$75 record rules](/blog/irs-75-dollar-receipt-rule) often cover them, but policies like paper), props and testing.

## Garage format: the entry/exit ledger

1. **Operator header:** garage or lot name, address, operator company (LAZ, SP+, ABM — chains dominate) and location code.
2. **The stamps:** ENTRY: 07/17 08:12, EXIT: 07/17 17:40 — the two timestamps everything hangs on.
3. **Duration and rate:** elapsed time, then the applied tier — "9H 28M @ DAILY MAX $24.00." Garages price in stepped tiers (first hour, each additional, daily max); the receipt shows which tier won.
4. **Fees and tax:** some cities levy parking taxes (often 10–20%+ where they exist) as a line; validation discounts appear as credits.
5. **Payment and ticket number** — the ticket number links the receipt to the entry record.

## Kiosk/meter format: prepaid time

Pay-and-display and app-linked kiosks print: operator/zone, space or plate number, **start time and paid-until time**, amount, and payment method — the receipt is a permit, and the field that matters is the expiry ("PAID UNTIL 2:00 PM"). App parking (ParkMobile, PayByPhone) emails the same fields; those receipts regenerate from the app's history, so reconstruction is rarely needed.

## Valet format

Location and date, ticket number matching the claim check, the flat or event fee, tax where applicable, and tip if paid by card. Hotel valet often posts to the folio instead — check there before assuming it's lost ([the folio's incidental lines](/blog/how-to-make-a-hotel-receipt)).

## For expenses

Business parking is deductible and reimbursable — on top of mileage under the standard rate ([the mileage rules](/blog/mileage-log-receipts)). The fields policies check: location, date, duration or expiry, amount. A photographed stub at pay time beats every reconstruction; the capture habit is the same one from [organizing expense receipts](/blog/organize-receipts-expense-reports).

## Make one now

The [parking template](/templates/parking) at [/create](/create) formats operator header, timestamps, tiered rate line, tax and payment — enter the times and rate, and the duration math stays consistent.

## The bottom line

Two timestamps, a rate tier, a total — plus city tax where levied. Pick the right dialect (garage, kiosk, valet), keep the arithmetic honest, and reconstruct only real parking, for your own records.`,
    faqs: [
      {
        q: "What information is on a parking receipt?",
        a: "The operator and location, entry and exit times (or paid-until expiry for prepaid), the rate tier applied, any parking tax, the total and payment method — plus a ticket number linking to the entry record.",
      },
      {
        q: "Are parking receipts required for expense reports?",
        a: "Policies commonly want them above small thresholds; below, the IRS's under-$75 contemporaneous-record rule can cover a meter with a logged note. Photograph stubs at payment — they're the most-lost receipt category.",
      },
      {
        q: "Is parking taxed?",
        a: "In many cities, yes — dedicated parking taxes (sometimes steep: 10–20%+) appear as their own line on garage receipts. Where none applies, the receipt shows just the fee.",
      },
      {
        q: "How do garages calculate the price on the receipt?",
        a: "Stepped tiers: a first-hour rate, additional-hour increments, and a daily maximum — the receipt shows elapsed time and which tier applied. Early-bird and validation discounts post as credits.",
      },
    ],
  },
];
