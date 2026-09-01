> ⚠️ **2026-08-10 correction:** the `/alternatives` + `/compare/*` pages referenced below as "already shipped / launched and monitored" are **NOT live — they 404 in production** (code is written but untracked in git on the `dev` branch, never deployed). Ranking reality vs the Jul-30 baseline: coverage 358 → **535** kw (▲) but top-10 **6 → 5** (▼) and top-3 **1 → 0** (▼). See the current plan in [`seo-audit/ACTION-PLAN-2026-08-10.md`](../seo-audit/ACTION-PLAN-2026-08-10.md) — priority is now **ship the built work**, then fix positions.

# Keyword Gap Report + 30-Day Plan (August 2026)

**Product:** Makecepeit (makecepeit.com) — free online receipt maker
**Date:** 2026-08-01
**Source data:** Semrush organic positions (US), pulled 2026-07-30, for makecepeit vs its 3 closest competitors: makereceipt.com, receiptbaker.com, receiptfaker.com.
**Companion files:** full keyword tables in [`seo-audit/KEYWORD-GAP-2026-07-31.md`](../seo-audit/KEYWORD-GAP-2026-07-31.md) · execution template in [`docs/commercial-keyword-post-playbook.md`](./commercial-keyword-post-playbook.md).

---

## TL;DR

We have two gaps vs competitors: **coverage** (we rank for far fewer keywords) and **position** (we rank far worse on the ones we do). The position gap is the bigger, more fixable problem. The 30-day plan below front-loads the fastest, highest-ROI wins: fix pages we already have (striking-distance rankings + 354 un-indexed brand pages), then win the core commercial "receipt maker / generator" terms, then expand low-KD template pages.

**North-star for August:** move from **6 → 40+ top-10 keywords** and **358 → 600+ total ranking keywords**, with at least **3 of the core commercial terms** ("receipt maker", "free receipt maker", "receipt generator") on page 1.

---

## Part 1 — The two gaps, quantified

| Domain | Ranking keywords | Vol ≥1k | Top 10 | Top 3 |
|---|--:|--:|--:|--:|
| **makecepeit (us)** | **358** | **19** | **6** | **1** |
| makereceipt | 1,184 | 49 | 823 | 640 |
| receiptbaker | 1,130 | 47 | 424 | 228 |
| receiptfaker | 1,634 | 52 | 441 | 161 |

- **Gap 1 — coverage:** we rank for ~3–4.5× fewer keywords, and only 19 high-volume terms vs their ~50.
- **Gap 2 — position (worse):** competitors hold 424–823 top-10 and up to 640 top-3 placements. We hold **6** and **1**. Even where we rank, we sit on page 3–8.

**Interpretation:** MakeReceipt ranks for only ~3× more keywords than us but has **640× more top-3 placements**. That's topical authority on the core "receipt" terms lifting everything else. So the win is not primarily "publish more" — it's **win the core tool terms (authority) + fix the pages we already have**, then expand coverage.

**Data hygiene applied:** removed survey/junk terms competitors accidentally rank for (`tellaldi.us`, `chipotlefeedback.com`, etc.); folded the "receipt" misspelling cluster (recipt 14.8k, reciepts 9.9k, recipts 5.4k… ~50k total vol) into the canonical terms — Google auto-corrects these, so ranking for "receipt/receipt maker" captures them. **Do not build pages for misspellings.**

---

## Part 2 — Prioritized targets (most → least important)

Sorted by *winnability × value*, not raw volume. Tier volumes: T0 1.4k · T1 52.8k · T2 62.5k · T3 60.8k · T4 16.6k · T5 19.7k · T6 376k.
"Us" = current position; "—" = not ranking. "#c" = how many of the 3 competitors rank in top-40 (demand validation).

### 🟢 Tier 0 — Striking distance (fastest wins; we already rank #11–30)
Push existing pages to page 1 with internal links + minor on-page tweaks.

| Keyword | Vol | KD | Us |
|---|--:|--:|--:|
| gas receipt generator | 90 | 0 | #14 |
| fuel receipt generator | 90 | 0 | #13 |
| hotel receipt generator free | 70 | 9 | #14 |
| how to get a copy of walmart receipt | 90 | 39 | #13 |
| store receipts | 2,400 | 35 | #34 |
| makereceipt (competitor brand) | 590 | 18 | #23 |

### 🔴 Tier 1 — Core commercial "money" terms → home + /create + /templates
We are absent while all 3 competitors rank top-10. Highest ROI. Run these through the [commercial-keyword-post-playbook](./commercial-keyword-post-playbook.md) (one keyword = one page).

| Keyword | Vol | KD | Us |
|---|--:|--:|--:|
| receipt maker | 8,100 | 45 | — |
| receipt generator | 4,400 | 53 | — |
| free receipt template | 2,900 | 44 | — |
| free receipt maker | 2,400 | 48 | — |
| receipt generator free | 2,400 | 49 | — |
| receipt maker free | 1,300 | 36 | — |
| create a receipt / make a receipt | 1,300 ea | 37–41 | — |
| online receipt maker | 1,300 | 49 | — |
| online receipt generator | 1,000 | 28 | — |
| receipt creator (free) | 1,000 | 30–52 | — |

### 🟠 Tier 2 — Receipt-type templates (many KD < 25) → new/optimized /templates/&lt;type&gt; pages

| Keyword | Vol | KD | Us |
|---|--:|--:|--:|
| cash receipt / cash receipts | 1,900 / 1,600 | 33 / 22 | — |
| sales receipt | 1,300 | 21 | — |
| food shopping receipt | 1,300 | 25 | — |
| digital receipt | 1,300 | 36 | — |
| grocery receipt / grocery store receipt | 1,600 / 1,300 | 26 / 25 | #64 / #48 |
| restaurant receipt / receipt in restaurant | 1,000 ea | **7 / 6** | — |
| hotel receipt | 1,000 | 22 | — |
| purchase receipt | 880 | 17 | — |
| gas receipt(s) | 720 | **5** | #60 / — |
| oil change receipt | 590 | 14 | — |

Restaurant/gas at KD 5–7 with 700–1,000 vol are the easiest real-traffic wins on the board.

### 🟡 Tier 3 — Brand receipts → fix indexation of existing 354 /brands pages + add missing brands
We have the pages but don't rank ("discovered, not indexed"). This is an indexation + internal-linking fix, not new content — except the luxury/streetwear sub-niche, which is low-KD and likely uncovered.

| Keyword | Vol | KD | Us | Action |
|---|--:|--:|--:|---|
| cvs pharmacy receipt | 2,400 | 37 | — | index existing |
| target receipt | 1,600 | 26 | — | index existing |
| uber receipt | 1,300 | 37 | — | index existing |
| burger king receipt | 1,000 | 25 | — | index existing |
| doordash receipt | 1,000 | 33 | — | index existing |
| best buy receipt | 880 | 30 | — | index existing |
| sephora receipt | 720 | 27 | — | index existing |
| louis vuitton receipt / lv receipt | 1,300 / 1,000 | 30 / 22 | — | **new brand page** |
| amiri receipt | 720 | **4** | — | **new brand page** |
| stockx receipt / stock x receipt | 880 / 720 | 29 / 14 | — | **new brand page** |

### 🔵 Tier 4 — How-to / educational → /blog (Sanity)
Informational intent (do **not** run the commercial playbook on these — it enforces an intent gate). Build topical authority + internal links to /create.

| Keyword | Vol | KD |
|---|--:|--:|
| how to make a receipt | 1,300 | 45 |
| how to write a receipt | 1,000 | 21 |
| how to create a receipt | 720 | 38 |
| how to make a receipt of payment | 480 | 38 |
| how to get a [lyft/uber/walmart/amazon] receipt | 200–320 ea | 17–38 |

### ⚫ Tier 5 — "Fake receipt" cluster (~19,700 vol) — DECISION NEEDED
`fake receipt generator` (1,900), `fake receipt` (1,300), `fake receipt maker` (1,300), `fake receipts` (1,000, KD21). Real demand, low-ish KD, but collides with our legitimacy-first positioning (ReceiptFaker owns this framing). **Recommendation: skip fraud-intent terms; if pursued, target only the defensible edge via legit framing** ("novelty / replacement receipts for props, design mockups, testing"). See "Open decisions".

### ⚪ Tier 6 — Ultra-head informational (aspirational, long-term)
`receipt` (201k, KD71), `receipts` (60k, KD56). Informational SERP (definitions/images). Picked up as a byproduct of Tier 1 authority — do not target directly yet.

---

## Part 3 — 30-day execution plan (August 2026)

Solo-founder cadence. Each week has a theme, concrete deliverables, and a definition of done. Assets already shipped this session — `/alternatives` hub + `/compare/makereceipt|receiptfaker|receiptbaker` — are launched and monitored throughout.

### Week 1 (Aug 1–7) — Fix what we already have (fastest wins)
**Theme:** capture rankings already within reach; unblock the 354 brand pages.
- **Ship + index the new comparison pages:** confirm `/alternatives` and the 3 `/compare/*` pages are live on Vercel; submit all 4 URLs via `/api/indexnow` and in GSC.
- **Tier 0 striking distance:** add internal links + tighten title/H1/first-paragraph exact-match on the pages ranking #11–30 (`gas receipt generator`, `fuel receipt generator`, `hotel receipt generator free`, `store receipts`, `how to get a copy of walmart receipt`).
- **Tier 3 indexation sprint:** for the top 15 brand terms (cvs pharmacy, target, uber, burger king, doordash, best buy, sephora…), verify each `/brands/<slug>` page is in the sitemap, add cross-links from the homepage/footer and related brand pages, then bulk-submit to IndexNow + GSC "Request indexing".
- **DoD:** 4 comparison URLs submitted; 5 striking-distance pages optimized; 15 brand pages re-submitted for indexing.

### Week 2 (Aug 8–14) — Core commercial terms on-page (Tier 1)
**Theme:** make home + /create + /templates actually competitive for "receipt maker / generator".
- **On-page overhaul of the money pages:** homepage + `/create` + `/templates` — exact-match "receipt maker", "receipt generator", "free receipt maker" in title, H1, first sentence (bolded imperative), and image alt/schema. Add a comparison table + FAQ block (targets snippets/PAA).
- **Publish 2 commercial landing/blog posts** via the playbook, one keyword each, funnelling to `/create`: `receipt maker` and `free receipt maker`.
- **Internal linking:** link every high-traffic brand/blog page up to the money pages with exact-match anchors.
- **DoD:** money pages re-optimized + submitted; 2 commercial posts live with Article+FAQPage JSON-LD and ≥3 in-context links to /create.

### Week 3 (Aug 15–21) — Low-KD template pages (Tier 2) + luxury brands (Tier 3)
**Theme:** harvest the easy-KD volume.
- **Create/optimize 6 /templates/&lt;type&gt; pages:** restaurant (KD7), gas (KD5), cash (KD22), sales (KD21), hotel (KD22), food-shopping (KD25). Each: unique intro, live preview, "what's on a … receipt", FAQ, link to /create.
- **Add 3 new luxury/streetwear brand pages:** Louis Vuitton (KD30), Amiri (KD4), StockX (KD14) — reuse the `/brands/[slug]` template + data pattern in `lib/brands.ts`.
- **Publish 1 more commercial post:** `receipt generator`.
- **DoD:** 6 template pages + 3 brand pages live and indexed; 1 commercial post live.

### Week 4 (Aug 22–31) — Educational cluster (Tier 4) + measure & iterate
**Theme:** topical authority + read the results.
- **Publish 3 how-to blog posts** (informational, no playbook): `how to make a receipt`, `how to write a receipt`, `how to get a [uber/lyft/walmart] receipt` — each links to /create and relevant brand pages.
- **Re-pull Semrush** positions for makecepeit and compare against the 2026-07-30 baseline; log movement on the Tier 0/1 terms.
- **Iterate:** for any Tier 1 term stuck on page 2, add depth/internal links per the playbook's "position 11–20" fix.
- **Decide Tier 5** (see below) and, if greenlit, scope 1 legit-framed post for September.
- **DoD:** 3 posts live; August-vs-July position report written; Tier 5 decision recorded.

### Always-on (every week)
- Submit every new/updated URL to IndexNow (`/api/indexnow`) — new pages are **not** auto-pushed to Bing.
- One keyword = one page: before publishing, confirm no existing page targets the same phrase (avoid cannibalization).
- Keep the `/compare/*` competitor data current (quarterly review is noted in `lib/comparisons.ts`).

---

## Part 4 — Measurement & success metrics

Baseline (2026-07-30) → August target:

| Metric | Baseline | End-of-August target |
|---|--:|--:|
| Total ranking keywords (US) | 358 | 600+ |
| Keywords in top 10 | 6 | 40+ |
| Keywords in top 3 | 1 | 8+ |
| High-volume (≥1k) keywords ranking | 19 | 30+ |
| Core commercial terms on page 1 | 0 | ≥3 |

**Tracking:** GSC (impressions/avg position on the Tier 0/1 terms), Semrush position tracking (re-pull monthly), GA4 organic sessions to /create + /templates. Review weekly, full report at month end.

---

## Part 5 — Open decisions

1. **Tier 5 "fake receipt" (~19,700 vol):** pursue via legit framing, or skip entirely? Recommendation: skip fraud-intent; consider only "novelty/replacement receipt" angle. **Owner decision required.**
2. **Live-SERP sanity check:** KD/volume are Semrush's Jul-30 US snapshot. Recommend verifying the top ~15 targets against live SERPs (Semrush MCP available) before heavy production effort.
3. **Two-language / GEO expansion:** competitors (MakeReceipt) lean on multi-language. Out of scope for August; revisit in Q4.

---

## Appendix — Methodology
Parsed the four Semrush `Organic Positions` XLSX exports (stdlib XML, no external deps). For each domain, kept the best position per keyword. Gap = any keyword where ≥1 competitor ranks in top-40 and we are missing or ranked >20. Priority score = volume × (0.5 + 0.5·(100−KD)/100) × competitor-validation × intent weight. Clustered by target page type; filtered navigational/survey junk and receipt misspellings. Full per-keyword tables: [`seo-audit/KEYWORD-GAP-2026-07-31.md`](../seo-audit/KEYWORD-GAP-2026-07-31.md).
