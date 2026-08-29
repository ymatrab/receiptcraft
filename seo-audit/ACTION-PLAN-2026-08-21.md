# SEO Action Plan — makecepeit.com

**Date:** 2026-08-21 · **Score:** 84/100 (up from 80) · Companion to `FULL-AUDIT-REPORT-2026-08-21.md`

Priority key: **Critical** = ship now · **High** = within 1 week · **Medium** = within 1 month · **Low** = backlog.
Effort: S (<1h) · M (a few hours) · L (a day+).

Nothing this pass is Critical. Five of yesterday's items shipped and are verified live: hub→spoke links on 569 pages, `/pricing` caching, citations on 36 template pages, real named authorship, and the alt-text audit that had been carried unmeasured for three passes.

## What changed in the plan itself

**Yesterday's H2 needs narrowing again.** It said to retarget the meta rewrite at `*-receipt-copy` / `*-lost-receipt` pages because they are multi-step rather than definitional. The position-band data shows that split is not the operative one. `/receipt-help` underperforms the CTR curve ~8x *at identical positions to `/brands`*, and the reason is that much of it ranks for queries only the retailer can satisfy ("zara recover receipt"). The right split is **whether the brand owns a self-serve receipt lookup**, not whether the page has steps.

**Two items should be downgraded, not repeated:**
- The "26 font families" payload item has been overstated for three audits. One `@font-face` actually ships; the other 25 are inert CSS variables. The homepage's real weight is 175KB of RSC flight data.
- The 8 zero-CTR definitional pages were re-measured and are unchanged (0.19% → 0.20% CTR, positions flat). The decision not to rewrite them was right. Do not revisit.

---

## 🟠 High — within 1 week

| # | Action | Effort | Evidence |
|---|---|---|---|
| H1 | **Segment `/receipt-help` by whether the brand has a self-serve receipt lookup.** Where it does (Zara, and audit the rest), stop targeting the recovery query — re-angle the page to the intent we *can* serve (the user who already failed to recover it and now needs a replacement), and stop measuring it on CTR. Where it does not (Chipotle, Panda Express, Whole Foods), it is a real click target — invest there. | L | `/receipt-help` gets 0.63% CTR at positions 5-10 where `/brands` gets 5.43% — same positions, 8x gap. The Zara block alone is **2,716 impressions and 1 click (0.04%)**, 7.7% of all site impressions. The pages that do convert are exactly the brands with weak self-serve lookup. |
| H2 | **Resume the backlink program.** Third audit in a row where this is the binding constraint, and now it has three independent confirmations. | L | `/create` position 78 (0 clicks on 950 impressions), home position 77, and **93% of `/templates` impressions sit at position 20+** — where templates do reach page one they convert at 5.21%. None of this is reachable by on-page work. |
| H3 | **Unblock the Domino's support link.** Carried unchanged from 08-20 — one check from a US connection. | S | `/receipt-help/domino-s-pizza-lost-receipt` is the site's 3rd-biggest page (6 clicks, 777 impressions, pos 8.8) at 0.77% CTR, trailing every sibling that cites the brand's own help page. |

## 🟡 Medium — within 1 month

| # | Action | Effort | Evidence |
|---|---|---|---|
| M1 | **Finish the `og:url` fix the 08-19 pass started.** `/blog/*` (173 pages) emits no `og:url` at all; `/tools`, `/guides`, `/examples/page/N` and 8 static pages still point it at the homepage. | S | Same bug class as the fix that shipped for `/create` and `/receipt-help`, left half-done. Low ranking impact, but it is cheap and currently inconsistent. |
| M2 | **Trim titles over 60 characters.** 26% of sampled pages exceed it, worst at 76. Most of the overflow is the `| Makecepeit` suffix on titles that are already full — drop the suffix where the title is long rather than shortening the useful half. | M | 13 of 50 sampled. Truncation costs the end of the value proposition on exactly the commercial pages. |
| M3 | **Give `/examples` real depth** — ~233 words of `<main>` content across 316 pages, 28% of the sitemap. | L | Unchanged from 08-20. A thinness fix, not a duplication fix. |
| M4 | **Investigate the 175KB RSC flight payload on the homepage.** This is the actual cause of the 396KB document (44% of it), not fonts or images. | M | Reframed from 08-20's M9. Likely a large catalogue serialised into server-component props. |
| M5 | **Finish `Organization` schema** — `foundingDate` and a real `sameAs` set. `contactPoint` landed on 08-19; `sameAs` is still a single X link. | S | Carried. Directly relevant to entity recognition and the zero-branded-demand problem. |
| M6 | **Collapse the `http → non-www → www` redirect chain** to one hop. | S | Carried from 08-14 and 08-19. Still 2 hops. |
| M7 | **Map every template to its related posts.** `/templates/rent-receipt` still shows 0 blog links while `/templates/restaurant` shows 1 and the brand/receipt-help groups now show 4. | S | Flagged on 08-20 and not covered by the fix that shipped; the hub-key mapping has gaps. |
| M8 | **Extend citations from templates to `/brands`.** The mechanism is built, typed and now proven on 36 template pages — adding a section is data entry. | M | Was M3 on 08-20, now half-delivered. |

## 🟢 Low — backlog

| # | Action | Effort |
|---|---|---|
| L1 | Audit `/receipt-help` variant pools at code level (carried since 08-19; H1 above may supersede it). | M |
| L2 | Per-item `lastmod` for `/brands` / `/receipt-help` / `/templates` instead of bucket constants. | M |
| L3 | Trim the 24 `/examples/page/N` pagination URLs from the sitemap. | S |
| L4 | Wire a CrUX/PageSpeed key so Performance scores on field data instead of server-side proxies. | S |
| L5 | Build `/brands/amiri` and `/brands/stockx` before either keyword is queued. | M |
| L6 | Add one embedded demo video — still zero video sitewide. | M |
| L7 | ~~Scope the 26 font families out of the root layout.~~ **Downgraded** — only 1 `@font-face` ships; the rest are inert variables. Cosmetic at best. | S |

---

## Closed this pass

| Item | Resolution |
|---|---|
| 08-20 H1 — hub→spoke on the two big groups | **Shipped.** 569 pages went from 0 to 4 blog links. |
| 08-20 M1 — `/pricing` cache | **Shipped.** 1.08s → 0.34s TTFB, now cached like the rest of the site. |
| 08-20 M3 — citations past 4 pages | **Shipped** for 36 template pages. Remainder tracked as M8. |
| 08-20 M7 — real named authorship | **Shipped.** `Person` with resolving author URL. |
| 08-20 L2 — alt-text audit | **Closed by measurement.** 0 missing alt across 125 images; images rescored 80 → 92. |
| 08-20 M8 — DataForSEO 403 | **Removed from the plan.** Owner paused it 2026-08-21; not a defect to fix. |
| 08-20 H7 (from 08-19) — rewrite 8 zero-CTR metas | **Confirmed closed.** Re-measured: CTR 0.19% → 0.20%, positions flat. Correctly declined. |
| 08-20 M4 — 26 font families | **Downgraded to L7.** Measurement showed the premise was wrong. |

## Sequencing

1. **This week:** H1 is the highest-leverage item on the board and the first one grounded in a mechanism rather than a symptom — it decides what 202 ranking pages are *for*. H3 is 60 seconds against the site's 3rd-biggest page.
2. **H2 in parallel, and treat it as the constraint it is.** Three audits have now shown on-page work cannot move `/create`, home, or the 93% of `/templates` sitting past position 20.
3. **Batch the S-effort items** (M1, M5, M6, M7) into one pass — together they are under two hours and clear four carried items.

## Measurement note

Retire CTR as the success metric for the receipt-help pages covered by H1's first branch, and for the 8 definitional pages. Both classes accrue impressions and cannot convert them. Track them as impression/citation assets. The honest north-star for the next pass is **`/brands` and the click-capable half of `/receipt-help`**, plus any movement at all in branded query volume — currently 0 of 1,711 visible queries.
