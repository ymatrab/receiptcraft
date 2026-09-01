# SEO Action Plan — makecepeit.com

**Date:** 2026-08-23 · **Score:** 83/100 (down from 84) · Companion to `FULL-AUDIT-REPORT-2026-08-23.md`

Priority key: **Critical** = ship now · **High** = within 1 week · **Medium** = within 1 month · **Low** = backlog.
Effort: S (<1h) · M (a few hours) · L (a day+).

Nothing this pass is Critical. Traffic grew hard — **clicks +34%, impressions +84%, average position −3.3** — driven by the July blog batch aging into rankings rather than by anything shipped since 08-21. Nothing from the 08-21 plan shipped, so most items carry.

## What changed in the plan itself

**A new item takes the top slot, and it is an S-effort code fix.** `/templates` is the only major section whose position went *backwards* this period (43.6 → 49.6) — and the cause is a single omitted function argument that leaves 42 of 43 template pages with zero contextual internal links. Where templates do reach positions 4–10 they convert at **4.85%**, indistinguishable from `/brands`. They convert fine; they don't rank.

**08-21's H1 is confirmed but its proposed split was wrong.** The operative division inside `/receipt-help` is not whether the brand has a self-serve lookup — it is the **page type**, readable straight off the URL suffix. `-return-policy` pages convert at 0.14%; `-receipt-copy` and `-lost-receipt` at 0.68% and 0.62%, *at the same average position*. That is a cleaner and more actionable line than the one drawn on 08-21.

**08-21's H3 rests on a premise that does not survive testing.** Pages citing the brand's own help page convert at **0.60%**; pages without one, **0.63%**. Adding official links is a trust and accuracy improvement, not a CTR lever — and the gap is far wider than one Domino's link (19 of 73 brands have one). It moves to Medium, reframed.

**One item is closed by measurement and one is revised:**
- The font-payload item is finished. The homepage emits **zero** `@font-face` rules. Strike it.
- The 08-21 alt-text measurement sampled 125 images and missed the homepage logo strip. Against 393 images, **12 lack `alt`** — all on the homepage. Images rescored 92 → 84, mostly for a separate `width`/`height` finding.

---

## 🟠 High — within 1 week

| # | Action | Effort | Evidence |
|---|---|---|---|
| **H1** | **Pass `categories` to `RelatedPosts` on `/templates/[slug]`.** One argument at [app/templates/[slug]/page.tsx:335](app/templates/[slug]/page.tsx:335), matching the call site in [app/brands/[slug]/page.tsx:337](app/brands/[slug]/page.tsx:337). Without it, `relatedPostsForHub` falls through all three tiers — the curated map holds one template key, the brand regex can't match, and Sanity is never queried. | **S** | `/templates` is the only major section losing position (43.6 → 49.6, CTR 0.37% → 0.20%). It carries **40 internal links per page — the exact header/footer boilerplate count**, identical to `/login` and `/privacy`. At positions 4–10 it converts at **4.85%** vs `/brands`' 4.87%. 60% of its impressions sit past position 21. |
| **H2** | **Split `/receipt-help` by URL suffix, not by brand.** Retire `-return-policy` (29 pages) and the 37 odd-pattern pages from the click funnel — consolidate, redirect into the `-receipt-copy` sibling, or keep as impression assets and stop measuring them on CTR. Handle the 3 Zara pages the same way. Invest the freed attention in `-receipt-copy` / `-lost-receipt`. | L | Segments A+B are **18.3% of all site impressions** and produced **6 clicks in 28 days**. `-return-policy`: 2,854 impr, 4 clicks, **0.14%** at position 10.3. `-receipt-copy`: 7,224 impr, 49 clicks, 0.68% at position 10.1. Same positions, 5× gap. Zara alone: 2,749 impressions, **1 click**, 7.2% of everything the site earns. |
| **H3** | **Resume the backlink program.** Fourth audit in a row where this is the binding constraint. | L | `receipt maker` → `/create` at position **90.2**, homepage at **88.4**. `create a receipt` at 90.5. `make a receipt` at 91.6. `/create` took 1,024 impressions and **0 clicks**, and its position got *worse* (72.9 → 79.2). `/templates` head terms sit at 48–88. Nothing on-page reaches page 9. |
| **H4** | **Scale the `*-alternative` and `*-reddit` blog format.** Three alternative posts and two reddit posts are the site's best-converting content by a wide margin, and the pattern is trivially extensible to the competitors already listed on `/alternatives`. | M | `receiptbaker-alternative` **12.50%** CTR · `receiptmakerly-alternative` **6.06%** · `expressexpense-alternative` **4.26%** · `best-receipt-maker-reddit` **2.84%** · `uber-lyft-receipts-reddit` **2.94%**. Compare the blog's overall 0.33%. Commercial intent converts; definitional intent does not. |

## 🟡 Medium — within 1 month

| # | Action | Effort | Evidence |
|---|---|---|---|
| M1 | **Finish the `og:url` fix the 08-19 pass started.** `/blog/*` (177 pages) emits none at all; `/tools`, `/guides`, `/examples/page/N` and 8 static pages still point at the homepage. | S | Carried unchanged through two audits. Low ranking impact, cheap, and currently inconsistent with `/create` and `/receipt-help`, which were fixed. |
| M2 | **Give the brand-page logos explicit `width`/`height`.** Six unsized `<img>` per page across 349 brand pages, served from `/api/logo` at **1.99s TTFB on a cache miss**. | S | 217 of 393 sampled images lack dimensions. An unsized image arriving 2s late is a textbook CLS event, on the section that produces the site's best CTR. |
| M3 | **Trim titles over 60 characters — this regressed.** 31% of sampled pages now exceed it (was 26%), worst at 75. Drop the ` \| Makecepeit` suffix where the title is already full rather than shortening the useful half. | M | 47 of 150. Worst cases are the commercial pages: `/create` at 75 chars, `/tools` at 74 — the truncation eats the value proposition. |
| M4 | **Render `RelatedPosts` on `/examples/[slug]`.** 316 pages, 28% of the sitemap, currently carrying zero contextual internal links — the same defect as H1, in a section that has no `RelatedPosts` call at all. | S | `/examples` converts at **1.11% at position 10.6** — better than `/receipt-help`. It is small, not broken, and it is a dead end for link equity. |
| M5 | **Finish `Organization` schema** — `foundingDate` and a real `sameAs` set. | S | Carried since 08-19. `contactPoint` landed then; `sameAs` is still one X link. Directly relevant to the **zero branded queries out of 1,774**. |
| M6 | **Collapse the `http → non-www → www` redirect chain** to one hop. | S | Carried from 08-14, 08-19 and 08-21. Still 2 hops. |
| M7 | **Widen official-link coverage in `lib/intent-pages.ts` — as an accuracy fix, not a CTR fix.** Only **19 of 73** brands have a `policyUrl`. Missing: Walmart, Target, Amazon, Costco, Starbucks, Uber, DoorDash, Domino's and 46 others. | M | Reframed from 08-21's H3. Domino's was never blocked — it was never added. The CTR premise is disproved (0.60% with a link vs 0.63% without), so ship this for correctness and user trust and do not expect a click lift. |
| M8 | **Extend citations from templates to `/brands`.** Mechanism is built, typed and proven on 36 template pages. | M | Carried from 08-21 M8. Data entry. |
| M9 | **Investigate the homepage RSC flight payload** — 228KB of a 386KB document (59%), larger than the 175KB measured on 08-21. | M | Likely a large catalogue serialised into server-component props. This, not fonts or images, is the homepage's weight. |

## 🟢 Low — backlog

| # | Action | Effort |
|---|---|---|
| L1 | Add `alt` to the 12 homepage brand-logo images (the same logos already carry `alt` on `/brands/*`). | S |
| L2 | Wire a CrUX/PageSpeed key so Performance scores on field data instead of server-side proxies. Carried. | S |
| L3 | Trim the 24 `/examples/page/N` pagination URLs from the sitemap — `/examples/page/3` is also the one page missing `BreadcrumbList`. | S |
| L4 | Per-item `lastmod` for `/brands` / `/receipt-help` / `/templates` instead of bucket constants (580 URLs share 2026-08-20). | M |
| L5 | Give `/examples` real depth — 271 words of `<main>` across 316 pages. Carried from 08-20. | L |
| L6 | Build `/brands/amiri` and `/brands/stockx` before either keyword is queued. | M |
| L7 | Add one embedded demo video — still zero video sitewide. | M |
| L8 | Look at the 5.1s cold / 1.0s warm sitemap TTFB on a 138KB document. Crawler-facing only. | S |

---

## Closed this pass

| Item | Resolution |
|---|---|
| 08-21 L7 — font families in the root layout | **Closed for good.** The homepage emits **zero** `@font-face` rules and preloads two `.woff2` via `next/font`. Strike it from the plan. |
| 08-21 H3 — "unblock the Domino's support link" | **Premise disproved, item reframed.** Pages citing the retailer convert at 0.60% vs 0.63% without. Survives as M7, an accuracy fix covering 54 brands. |
| 08-21 H1 — segment `/receipt-help` by self-serve lookup | **Superseded by H2.** The confirmable split is by URL suffix (page type), not by brand capability. |
| 08-20 L2 — alt-text audit | **Revised.** 12 missing `alt` against a 393-image sample, all on the homepage; the 08-21 sample of 125 missed the logo strip. |

## Sequencing

1. **H1 first — it is under an hour and it is the only item on the board with a verified mechanism, a measured cost, and a one-line fix.** 43 pages currently sitting at boilerplate link depth, in a section proven to convert at 4.85% when it ranks. Batch M4 with it; it is the same defect in `/examples`.
2. **Then the S-effort block: M1, M2, M5, M6, L1.** Together under two hours, and they clear four items carried across two or three audits. M2 in particular is the only CWV-adjacent fix available without field data.
3. **H2 and H3 are the strategic pair, and they are independent.** H2 decides what 69 pages are *for*; H3 is the only thing that reaches `/create`, the homepage, and the 60% of `/templates` past position 21.
4. **H4 is the cheapest growth lever on the board** and the only one with proven conversion data behind it.

## Measurement note

The honest north-star for the next pass is **`/brands` clicks, `/templates` average position, and the click-capable half of `/receipt-help`** (`-receipt-copy` + `-lost-receipt`, ex-Zara — currently 12,592 impressions at 0.71%).

Retire CTR as a success metric for `-return-policy`, the 37 odd-pattern pages, the 3 Zara pages, and `/blog/amount-tendered-meaning` + `/blog/picture-of-receipt-return`. Together those accrue **over 20% of site impressions** and cannot convert them. Reported site CTR excluding them is **0.76%**, not 0.65% — that is the number to track.

Branded demand is still **0 queries out of 1,774**. Any movement at all remains a genuine signal.
