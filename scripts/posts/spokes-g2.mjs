/** Cluster G (Digital) spokes 2/3: G4, G6. */

export const SPOKES_G2 = [
  {
    slug: "how-receipt-ocr-works",
    category: "digital",
    publishedAt: "2026-07-16T15:00:00Z",
    title: "How Does Receipt OCR Work?",
    seoTitle: "How Receipt OCR Works (From Photo to Data)",
    seoDescription:
      "Receipt OCR runs a pipeline: image cleanup, text recognition, then field extraction that finds the vendor, date, total and line items. Each stage, and why receipts are hard.",
    excerpt:
      "Between the photo and the expense entry runs a four-stage pipeline: cleanup, recognition, layout analysis, field extraction. How receipt OCR actually works — and why crumpled thermal paper still wins sometimes.",
    body: `Receipt OCR converts a photo of a receipt into structured data in four stages: **image preprocessing** (deskewing, contrast, noise removal), **text recognition** (the OCR proper — mapping pixels to characters), **layout analysis** (understanding columns, line items, and the total block), and **field extraction** (identifying which text is the vendor, date, tax and total — increasingly done by machine-learning models trained on millions of receipts). The first stage is why app captures beat casual photos; the last is where products differentiate.

## Stage 1: making the photo readable

Receipts arrive crumpled, curled, shadowed and skewed. Preprocessing finds the receipt's edges, flattens perspective, binarizes (pure black/white), and boosts the low contrast that faded thermal paper offers ([why it fades](/blog/faded-receipt-fix-reddit)). Good capture UIs do this live — edge detection, glare warnings — because garbage in is unrecoverable later. It's also the practical answer to "why did my scan fail": flatten the receipt, kill the glare, fill the frame.

## Stage 2: recognizing the text

Modern OCR is neural: models read whole lines in context rather than matching letter shapes, which is how they survive receipt fonts — dot-matrix-descended, monospaced, ALL-CAPS, printed at 203dpi ([the printer's constraints](/blog/thermal-receipt-printers-guide)). Digits do well; the failure modes are faded strokes (8→3, 0→8), the abbreviations grocery receipts love ("GV WHL MLK" — [the grocery dialect](/blog/how-to-make-a-grocery-receipt)), and handwriting, which remains largely out of reach ([handwritten receipts](/blog/handwritten-receipts-valid) get manual entry).

## Stage 3: understanding the layout

Receipts are structured documents: header, item column with a price column, a totals block, a payment block. Layout analysis reassembles OCR's text fragments into that structure — matching item names to their prices across the gap, distinguishing the SUBTOTAL/TAX/TOTAL stack from line items, ignoring the survey-code footer. Narrow 58mm receipts that wrap item names across lines are the classic layout headache.

## Stage 4: extracting the fields

Knowing the text says "07/14/26" is recognition; knowing that's the transaction date (not a best-by date in the footer) is extraction. Production systems combine rules (TOTAL keywords, currency patterns, date formats) with trained models that learn positional and contextual cues — plus arithmetic validation: items should sum to subtotal, subtotal + tax = total. When the math reconciles, confidence jumps; when it doesn't, the field gets flagged for the human review queue. That check is the same one an [expense-report reviewer](/blog/expense-report-receipts-guide) runs by eye.

## Why receipts stay hard (and what wins)

No standard layout across millions of merchants, thermal fading, 32-character truncation, multilingual stock, tax quirks per jurisdiction — receipt OCR is a long tail of edge cases. Accuracy on clean captures now exceeds high-90s per field in [good apps](/blog/best-receipt-scanning-apps); the residual errors cluster exactly where you'd guess: faded, crumpled, handwritten. The user-side fixes are boring and effective: capture at payment before pocket damage, flatten, avoid glare, verify extracted totals weekly ([the verification habit](/blog/self-employed-receipt-tracking)).

## The bottom line

Cleanup → recognize → structure → extract, with arithmetic as the referee. OCR turned receipt-keeping from typing into photography; the last honest advice is unchanged — photograph it now, while it's flat and dark and true.`,
    faqs: [
      {
        q: "How accurate is receipt OCR?",
        a: "On clean, well-captured printed receipts, leading systems exceed high-90s percent per field for vendor, date and total; line items run lower. Faded thermal paper, crumples and handwriting are where accuracy drops sharply.",
      },
      {
        q: "Why does OCR misread my receipt totals?",
        a: "Usually capture quality: faded strokes turn 8s into 3s, glare erases digits, curl distorts lines. Good systems catch many errors by checking that items sum to subtotal and subtotal plus tax equals total.",
      },
      {
        q: "Can OCR read handwritten receipts?",
        a: "Mostly no — handwriting recognition on unconstrained receipts remains unreliable, so apps route handwritten receipts to manual entry. Printed receipts are the technology's home turf.",
      },
      {
        q: "How do apps know which number is the total?",
        a: "Field extraction: keyword rules (TOTAL, AMOUNT DUE), position patterns, and models trained on millions of receipts — validated by arithmetic. If a candidate total doesn't equal subtotal plus tax, it gets flagged rather than trusted.",
      },
    ],
  },

  {
    slug: "receipt-paper-sizes",
    category: "digital",
    publishedAt: "2026-07-17T15:00:00Z",
    title: "What Size Is Receipt Paper? A Buyer's Guide",
    seoTitle: "Receipt Paper Sizes: 80mm, 58mm & Roll Buying Guide",
    seoDescription:
      "Receipt paper comes in 80mm and 58mm widths, with roll diameter and core size determining fit. The size chart, GSM quality tiers, and how to buy the right rolls.",
    excerpt:
      "Two widths rule the world — 80mm and 58mm — but diameter, core size and paper weight decide whether a roll fits your printer and how it prints. The buying guide.",
    body: `Receipt paper comes overwhelmingly in two widths: **80mm (3 1/8")** — the standard POS width — and **58mm (2 1/4")** for compact and mobile printers. But width alone doesn't guarantee fit: rolls are specified as width × diameter (or length), around a core size, in a paper weight — a typical POS spec reads "80mm × 80mm, 12.7mm core, 55gsm thermal." Match all of it to your printer's manual and rolls just work; miss the diameter and the lid won't close.

## The size chart

- **80 × 80mm** — the countertop standard: ~72–80m of paper, fits full-size POS printers (Epson TM-T88 class and its clones — [the printer landscape](/blog/thermal-receipt-printers-guide)).
- **80 × 70mm / 80 × 60mm** — slimmer rolls for shallow printer bays; less paper, more changes.
- **58 × 50mm** — card terminals and mobile printers; ~15–25m.
- **58 × 40mm** — the little rolls in handheld terminals everywhere.
- **57 × 38/40mm** — credit-card terminal legacy sizing; interchangeable with 58mm in most devices, but check.
- **44mm, 76mm (bond/impact)** — kitchen impact printers and legacy registers; usually two-ply carbonless, not thermal.

Diameter caps how much paper fits your printer's bucket; core (12.7mm standard, 17.5mm on some) must match the spindle. Length is diameter's honest cousin — thinner paper packs more meters into the same diameter.

## Paper weight: the quality tier

GSM (grams/m²) is the quality axis: **48–55gsm** is standard-good; below 48 the paper curls, jams and tears more; 55+ feels premium and feeds beautifully. Cheap thin rolls cost more in jams than they save in price — the falsest economy in POS supplies. Coating quality also sets image life: better stock holds an image longer, though all direct thermal eventually fades ([the fading chemistry](/blog/faded-receipt-fix-reddit)) — archival needs are solved by [scanning](/blog/scanned-receipts-irs), not paper selection.

## BPA-free, and why it's on the label

Thermal coatings historically used BPA as the developer; health scrutiny moved the industry toward BPA-free (often BPS — its own debate) and phenol-free stock ([what the research says](/blog/bpa-receipt-paper)). Phenol-free costs slightly more and is the defensible default for customer-facing businesses — some jurisdictions regulate BPA paper explicitly.

## Buying rules

1. **Spec from the printer manual:** width, max diameter, core — then buy exactly that.
2. **Buy by the case** once a roll proves itself; per-roll price halves.
3. **Store cool, dark and dry** — heat pre-develops thermal stock; a sunny shelf ruins a case.
4. **Test one roll of a new supplier** for coating quality: print, then thumb-rub — excessive graying means weak coating.
5. **Match ply to printer:** thermal is single-ply always; two/three-ply carbonless belongs to impact printers only.

## The bottom line

80mm for counters, 58mm for terminals — at the diameter and core your manual states, in 48gsm+, increasingly phenol-free. Or print no rolls at all: low-volume businesses can skip the hardware and paper entirely with emailed PDFs from the [free receipt generator](/create).`,
    faqs: [
      {
        q: "What are the standard receipt paper sizes?",
        a: "80mm width for standard POS printers (typically 80×80mm rolls) and 58mm for compact and mobile printers (58×40 or 58×50mm). Fit also depends on roll diameter and core size — check the printer manual.",
      },
      {
        q: "Are 57mm and 58mm receipt rolls interchangeable?",
        a: "Usually — 57mm is legacy card-terminal sizing and fits most 58mm devices with negligible difference. Confirm your terminal's spec; a millimeter matters only in the tightest holders.",
      },
      {
        q: "What GSM receipt paper should I buy?",
        a: "48–55gsm for reliable feeding and decent image life; avoid sub-48gsm bargain rolls, which curl and jam. Premium 55gsm+ makes sense for customer-facing retail.",
      },
      {
        q: "Does receipt paper expire?",
        a: "Effectively yes — thermal coating degrades with heat, light and humidity. Stored cool and dark, stock stays good for a couple of years; stored badly, it pre-grays and prints faintly much sooner.",
      },
    ],
  },
];
