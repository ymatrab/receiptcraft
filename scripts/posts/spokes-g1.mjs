/** Cluster G (Digital) spokes 1/3: G2, G3, G5. */

export const SPOKES_G1 = [
  {
    slug: "email-receipt-best-practices",
    category: "digital",
    publishedAt: "2026-07-13T15:00:00Z",
    title: "How Should Businesses Send Email Receipts? Best Practices",
    seoTitle: "Email Receipt Best Practices for Businesses",
    seoDescription:
      "Email receipts should arrive instantly, put the total and merchant in the subject, itemize in the body (not just an attachment), and skip the marketing overload. The playbook.",
    excerpt:
      "Instant delivery, a searchable subject line, itemization in the body, marketing restraint — the email receipt playbook that helps customers find you in their inbox a year later.",
    body: `A good email receipt arrives within seconds of payment, states the merchant and total in the subject line ("Your Blue Door Café receipt — $23.40"), itemizes the purchase in the email body rather than only in an attachment, and keeps marketing to a footer. The test is simple: can the customer find and read this receipt in 30 seconds, a year from now, searching their inbox? Every practice below serves that test.

## Send from a recognizable identity, instantly

Timing: at payment, not batched overnight — customers checking for the charge should find the receipt already there. Sender: your business name in the from-field, even when a processor sends it (Square's messaging.squareup.com problem means customers can't find receipts they possess — the confusion documented in [how to replace a lost receipt](/blog/how-to-replace-a-lost-receipt)). Configure the display name and reply-to so the email identifies you, not your vendor.

## The subject line is the search index

"Receipt from [Business] — $[total] — [date]" beats "Your order" in every way that matters: inbox search hits it by name, by amount, and by the word receipt. Expense-minded customers search exactly those tokens ([the search habits](/blog/organize-receipts-expense-reports) are predictable); order numbers help e-commerce, but human-readable facts belong first.

## Itemize in the body, attach the PDF second

The email body should be the receipt: items, quantities, prices, tax, tip, total, payment method with last four, and your business details — the full anatomy from [what information must a receipt include](/blog/parts-of-a-receipt). A PDF attachment is a good addition (expense systems love files), but body-only-says-"see attachment" fails customers on phones, in previews, and in inbox search. Plain, table-like HTML that survives dark mode and printing beats a designed masterpiece.

## Marketing restraint (and law)

A receipt is a transactional email — that status is why it bypasses marketing-consent walls under CAN-SPAM and GDPR-adjacent regimes, and it keeps that status only while the transaction is the primary content. A discreet footer ("10% off your next visit") is normal; a promotion with a receipt buried in it invites spam-foldering, legal ambiguity, and customer irritation. Also skip: attachments beyond the PDF, tracking-pixel excess, and requesting reviews inside the receipt itself.

## The operational details

- **Offer email receipts at checkout, don't force them** — capture consent honestly; what stores do with receipt emails is a trust topic customers notice.
- **Make resending trivial:** support should re-send any receipt from the order record in seconds.
- **Keep your copies:** the receipts you send are your sales records ([the bookkeeping loop](/blog/recording-receipts-bookkeeping)) — archive them queryably.
- **Test the render** in Gmail, Outlook, Apple Mail, dark mode, and print preview — receipts get printed more than any other email class.

## The bottom line

Instant, identifiable, searchable, itemized in the body, marketing in the footer. The email receipt is the one message every customer wants from you — send it like you know it, and it becomes the most-kept document your business produces. The wider ecosystem — apps, wallets, smart receipts — is in the [digital receipts guide](/blog/digital-receipts-guide).`,
    faqs: [
      {
        q: "What should an email receipt contain?",
        a: "Everything a paper receipt does: business details, date, itemized purchases, tax, tip, total, payment method with last four — in the email body itself, with an optional PDF attached for filing.",
      },
      {
        q: "What's the best subject line for an email receipt?",
        a: "Merchant, the word receipt, total and date: 'Receipt from Blue Door Café — $23.40 — Jul 13.' Those are the tokens customers search a year later; order numbers come second.",
      },
      {
        q: "Can email receipts include marketing?",
        a: "A restrained footer, yes — receipts are transactional email and stay exempt from marketing-consent rules only while the transaction dominates the content. A promo with a receipt attached risks spam treatment both legally and practically.",
      },
      {
        q: "Are email receipts valid for returns and expenses?",
        a: "Yes — an itemized email receipt is full proof of purchase for returns, warranties, expense reports and tax records. Forwarding it to an expense system is precisely how modern reimbursement workflows run.",
      },
    ],
  },

  {
    slug: "best-receipt-scanning-apps",
    category: "digital",
    publishedAt: "2026-07-14T15:00:00Z",
    title: "What's the Best Receipt Scanning App? 8 Tested",
    seoTitle: "Best Receipt Scanning Apps: 8 Compared by Use Case",
    seoDescription:
      "Expensify, QuickBooks, Wave, Dext, Zoho, Shoeboxed, Genius Scan and Google Drive — 8 receipt scanners compared by OCR quality, workflow and price, per use case.",
    excerpt:
      "The best scanner depends on what happens after the scan: reimbursement, bookkeeping, taxes or just storage. Eight apps sorted by that question, with honest trade-offs.",
    body: `The best receipt scanning app depends on where the scan must land: **Expensify** for employee reimbursement, **QuickBooks' built-in capture** if you already keep books there, **Wave** for free bookkeeping-grade capture, **Dext** for volume and accountant handoff, **Zoho Expense** for value at team scale, **Shoeboxed** for digitizing backlogs (they scan your mail-in shoebox literally), and **Genius Scan or Google Drive's scanner** for plain, no-subscription filing. All extract vendor, date and total via OCR; they differ in what happens next.

## The quick map

- **Reimbursement workflows:** Expensify (SmartScan, policy rules, approvals) and Zoho Expense (similar shape, aggressive pricing). Corporate-card matching, mileage, affidavit flows — the machinery behind [expense report documentation](/blog/expense-report-receipts-guide).
- **Bookkeeping-first:** QuickBooks capture attaches scans to bank-feed transactions natively — if QB keeps your books, adding a second scanner is double handling ([the integration logic](/blog/recording-receipts-bookkeeping)). Wave does the same free, at small-business polish levels.
- **Volume and accountants:** Dext (ex-Receipt Bank) is what bookkeepers hand clients — strong OCR, supplier rules, batch exports.
- **Backlog rescue:** Shoeboxed's mail-in service turns the infamous shoebox into searchable data — the shortcut when [years of paper](/blog/receipt-organization-systems) need digitizing at once.
- **Just scanning:** Genius Scan, Adobe Scan, or the scanners inside Google Drive and iOS Notes — free, excellent captures, folder organization ([the scan-to-folder system](/blog/scanned-receipts-irs) satisfies the IRS fully).

## What actually differentiates them

**OCR accuracy** is near-parity on clean receipts; the gaps show on crumpled thermal paper and handwriting ([handwritten receipts](/blog/handwritten-receipts-valid) defeat most extraction — expect manual entry). **Line-item extraction** (not just totals) matters for itemization-dependent uses and is where premium tiers earn keep. **The workflow tail** is the real product: approval chains, accounting exports, audit trails. **Price** runs free (Wave, basic scanners) through per-user SaaS — pay for workflow you'll use, not OCR marketing.

## Whichever you pick: the three rules

1. **Capture at payment** — the app's value is the habit it hosts ([capture-first logic](/blog/organize-receipts-expense-reports)); an unused subscription organizes nothing.
2. **Verify the extraction weekly** — OCR misreads totals occasionally; reconciliation catches it ([the weekly pass](/blog/self-employed-receipt-tracking)).
3. **Own your exports** — whatever the app, ensure data and images export freely; receipt archives outlive app subscriptions, and [retention clocks](/blog/how-long-to-keep-receipts) run 3–7 years.

## The bottom line

Match the app to the destination: Expensify/Zoho for reimbursement, QuickBooks/Wave for books, Dext for volume, Shoeboxed for backlogs, a free scanner for storage. The OCR is table stakes — the habit and the workflow are the purchase.`,
    faqs: [
      {
        q: "What's the best free receipt scanning app?",
        a: "Wave for bookkeeping-grade capture tied to free accounting software; Genius Scan or Google Drive's built-in scanner for plain scan-to-folder filing. Free covers most individuals completely.",
      },
      {
        q: "Do receipt apps satisfy IRS record requirements?",
        a: "Yes — digital captures that are legible, complete and retrievable meet the IRS digital-records standard (Rev. Proc. 97-22). Verify scans and keep exports backed up.",
      },
      {
        q: "Can scanning apps read line items, not just totals?",
        a: "Premium tiers of Expensify, Dext, Zoho and QuickBooks extract line items with decent accuracy on printed receipts; free tiers usually capture vendor, date and total. Handwritten receipts still need manual entry everywhere.",
      },
      {
        q: "Should I use my accounting software's scanner or a separate app?",
        a: "If QuickBooks, Xero or Wave keeps your books, use their built-in capture — scans attach directly to transactions. Separate scanners earn their place only for workflows books don't cover, like employee reimbursement.",
      },
    ],
  },

  {
    slug: "thermal-receipt-printers-guide",
    category: "digital",
    publishedAt: "2026-07-15T15:00:00Z",
    title: "How Do Thermal Receipt Printers Work? (58mm vs 80mm)",
    seoTitle: "Thermal Receipt Printers: How They Work (58mm vs 80mm)",
    seoDescription:
      "Thermal printers print with heat on chemically coated paper — no ink ever. How the technology works, 58mm vs 80mm, direct thermal vs transfer, and what to buy.",
    excerpt:
      "No ink, no toner — just heat on chemical paper at 250mm a second. How thermal printing works, why receipts fade, the 58/80mm decision, and what a small business should buy.",
    body: `Thermal receipt printers print with heat: a line of tiny heating elements (the printhead) darkens chemically coated paper wherever it fires — no ink, no toner, no ribbon, ever. That's why receipt printers are fast (250mm+/second), nearly silent, and cheap to run, and also why receipts fade: the image is a chemical state, not pigment. The two decisions that matter when buying: paper width (58mm vs 80mm) and connection type.

## The technology in one paragraph

Receipt paper is coated with a leuco dye and a developer that react and darken when heated past a threshold. The printhead spans the paper's width with hundreds of resistive dots (203dpi standard); as paper feeds past, dots fire per line, building text and barcodes. **Direct thermal** (all receipt printers) heats the paper itself; **thermal transfer** (label printers) heats a ribbon that deposits resin onto the media — permanent, but not used for receipts. Direct thermal's trade-off is impermanence: heat, sunlight, plasticizers and time all erase it — the fading chemistry behind [why receipts fade](/blog/faded-receipt-fix-reddit), and the reason [same-day scanning](/blog/scanned-receipts-irs) is policy, not paranoia.

## 58mm vs 80mm

- **58mm:** compact and mobile printers, card terminals, low print volume. Cheaper hardware and paper; ~32 characters per line — tight for itemized formats.
- **80mm:** the standard POS width — ~48 characters, room for [proper itemization](/blog/parts-of-a-receipt), logos and barcodes; faster printers, bigger paper rolls, auto-cutters standard.

Rule of thumb: countertop retail and food service want 80mm; mobile trades, market stalls and terminal-integrated printing live happily at 58mm. Paper specs and roll sizes are their own small topic — covered in [what size is receipt paper](/blog/receipt-paper-sizes).

## Connections and ecosystem

USB (simple, one register), Ethernet (shared, kitchen printing, reliable), Bluetooth (tablets and phones — confirm iOS MFi vs Android support explicitly), and WiFi (flexible, occasionally flaky). ESC/POS is the de facto command language — most software speaks it, which is why the Epson TM-T88 lineage and its clones (Star, Bixolon, Munbyn and the budget tier) dominate. Buying used: printheads wear (a rated km figure) and the auto-cutter is the usual first failure.

## What a small business should buy

A current 80mm ESC/POS printer with auto-cutter and Ethernet or USB (name-brand ~$150–300; serviceable clones under $100), 48+ gsm paper (thinner curls and jams), and BPA-free stock — the paper-chemistry question customers actually ask about ([the BPA research](/blog/bpa-receipt-paper)). If your volume is a handful of receipts a day, skip hardware entirely: emailed or PDF receipts from a [free generator](/create) cost nothing and never jam.

## The bottom line

Heat on chemical paper: fast, silent, ink-free — and temporary by design. 80mm for counters, 58mm for pockets, ESC/POS for compatibility, and a scan habit for anything the fading paper must outlive.`,
    faqs: [
      {
        q: "Do thermal receipt printers use ink?",
        a: "No — nothing consumable but paper. The printhead darkens heat-sensitive coating chemically. That's why running costs are trivially low and why the printed image fades over time.",
      },
      {
        q: "Should I buy a 58mm or 80mm receipt printer?",
        a: "80mm for countertop retail and restaurants — wider lines fit proper itemization and barcodes, printers are faster. 58mm suits mobile use, card terminals and low volume where compactness wins.",
      },
      {
        q: "Why do thermal receipts fade?",
        a: "The image is a heat-induced chemical state, not ink — heat, sunlight, friction and plasticizers reverse or destroy it, often within months in a hot car or wallet. Scan anything that matters the day you get it.",
      },
      {
        q: "What is ESC/POS?",
        a: "The de facto command protocol for receipt printers, originated by Epson. Software that 'supports thermal printers' almost always means ESC/POS — buying a printer that speaks it guarantees broad compatibility.",
      },
    ],
  },
];
