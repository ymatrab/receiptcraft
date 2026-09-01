# August 2026 Content Plan — UPDATE (2026-08-17)

**Revises the Aug 18–31 queue** of the [reconciled calendar](./august-2026-content-plan-RECONCILED.md) using data the Aug-1 plan didn't have: **live GSC**, **live DataForSEO KD/volume** (replaces Jul-30 Semrush), and a **GEO citation analysis**. Same rules, archetypes, and ledger process — this just re-sorts the remaining ~13 days by what the data now says is highest-value.

**State:** 26/53 published (through Aug 17). ~13 days left. The originally-queued #27–53 are **reprioritized below, not discarded.**

---

## What changed and why

1. **Two KD-0 gems surfaced that dwarf everything queued** (DataForSEO, live):
   - `walmart receipt lookup` — **33,100 vol, KD 0** (we already have the page)
   - `rent receipt template` cluster — **6,600 vol, KD 0–1** (no dedicated page yet)
   - `receipt template(s)` — **14,800 vol, KD 11–13**
2. **We now know what earns AI citations.** GEO testing (ChatGPT w/ web search) showed AI cites **recommendation / template / comparison** content and **ignores definitional explainers** (it just answers "what does X mean" itself). makecepeit currently earns **0 AI citations**. → 3 new *citable* posts added; definitional posts stay for Google only.
3. **Cannibalization guard.** Six+ near-identical `/create` synonym posts are already live (#2,10,12,13,14,16). **Stop writing more.** The head terms `online receipt generator` (KD8) / `free receipt maker` (KD9) belong on the **`/create` page itself** (audit item C2), not another blog.

---

## Revised queue — Aug 18–31

### 🥇 Tier A — do first (biggest Google + GEO wins)

| Post | Action | Target kw | Vol | KD | GEO | Notes |
|---|---|---|--:|--:|:--:|---|
| A1 | **Optimize** `/blog/walmart-receipt-lookup` | walmart receipt lookup | 33,100 | 0 | low | The single biggest term in the niche. Make it the definitive "how to look up / get a copy of a Walmart receipt" guide; strong internal links; FAQ. |
| A2 | **NEW + build page** | rent / rental receipt template | 6,600 | 0–1 | med | Build `/templates/rent-receipt` + a citable guide. Whole KD-0 cluster, zero coverage today. |
| A3 | **NEW (GEO Tier-1)** | best free receipt templates | 14,800 | 11–13 | **HIGH** | Citable roundup: comparison table, "best for [use case]", answer-first. This exact query type is what AI cites (checkoutreceipt/makemyreceipt/smartsheet win it). |
| A4 | **NEW (GEO Tier-1)** | create a receipt for a small business | — | — | **HIGH** | Definitive guide AI cites (fitsmallbusiness territory). Template types + clear recommendation + FAQ. |
| A5 | **Optimize → refresh** `/blog/best-free-receipt-generator` (#3) | best free receipt generator 2026 | 480+ | 30 | **HIGH** | Rework into a citable "2026 comparison" (table, "best for X", freshness date). This is the query where AI already browses and cites — make ours the citable version. |

### 🥈 Tier B — low-KD winnable, net-new posts

*(DataForSEO/Semrush KD; build the two missing brand hubs first: **Amiri**, **StockX**.)*

| Post | Target kw | Vol | KD | Hub |
|---|---|--:|--:|---|
| B1 | amiri receipt | 720 | 4 | /brands/amiri *(build hub first)* |
| B2 | cash app generator | 390 | 7 | /create → brand-safe |
| B3 | dental receipt | 170 | 8 | /templates/dental-receipt |
| B4 | towing receipt template | 110 | 4 | /templates/towing-receipt |
| B5 | ai receipt generator free | 260 | 11 | /create |
| B6 | pharmacy receipt | 140 | 17 | /templates/pharmacy |
| B7 | stockx receipt / what does a stockx receipt look like | 210 | 18 | /brands/stockx *(build hub first)* |
| B8 | add receipt to starbucks app | 210 | 18 | /brands/starbucks |
| B9 | clothing receipt | 90 | 18 | /templates/clothing-store-receipt |
| B10 | taco bell receipt | 590 | 19 | /brands/taco-bell |

**Plus the "fake [brand]" / "[brand] generator" long-tails** (competitor recon, KD≤15) as brand-page spokes: `fake grab receipt` (KD0, 2,400) → /brands/grab · `fake walmart receipt` (KD5) → /brands/walmart · `instacart receipt generator` (GSC pos 10.8) → /brands/instacart · `apple receipt maker` → /brands/apple.

### 🥉 Tier C — optimize existing + interlink (no new page)

These are KD 0–5 and already have a post — apply the §3 pattern (update + exact-match hub link):

| Keyword | Vol | KD | Existing post → hub |
|---|--:|--:|---|
| itemized receipt | 5,400 | 0 | itemized-receipt-guide → /templates/itemized-receipt |
| store receipts | 3,600 | 5 | how-stores-verify-receipts → /templates/retail-store |
| grocery receipt | 2,400 | 0 | how-to-make-a-grocery-receipt → /templates/grocery-store |
| restaurant receipt | 1,900 | 0 | how-to-make-a-restaurant-receipt → /templates/restaurant |
| digital receipt | 1,900 | 4 | digital-receipts-guide → /create |

### ⛔ Stop / drop (cannibalization — do NOT write)

`receipt creator free` · `receipt maker online free` · `simple receipt generator` · `free receipt maker app` · `free receipt app` · `online receipt maker`(done) — all near-duplicate `/create` intent. Instead, put `online receipt generator` (KD8) + `free receipt maker` (KD9) into the **`/create` page** title/H1/intro (audit C2).

---

## 🆕 Citable-format rules (for AI citations — apply to every Tier-A GEO post)

AI extracts and cites structured, recommendation-style passages — not prose. Each GEO post MUST:
1. **Answer-first** — a direct 2–3 sentence answer in the opening (before any preamble).
2. **Lists + "Best for [use case]" labels** — numbered/bulleted, scannable.
3. **A comparison table** — use the native-table block (shipped, commit `aab6133`).
4. **Concrete specifics** — real numbers, formats, "free / no watermark / no signup-to-start."
5. **FAQ block** — add FAQPage schema (also an audit item).

## 🔗 GEO listicle outreach (parallel — not a blog post)

The *fastest* path to an AI citation is being **in the roundups AI already cites.** Pitch makecepeit for inclusion in: `fitsmallbusiness.com`, `techdator.com`, freshbooks-style blogs ("best free receipt generator/template"). Ties into the backlink program (action-plan H4) — one effort, two payoffs (links + AI citations).

## Cadence & sizing

13 days, so **right-size, don't pad.** Suggested order:
- **Days 1–3:** Tier A (A1→A5) — highest ROI, front-load.
- **Days 4–10:** Tier B, ~1–2/day (build Amiri + StockX hubs before B1/B7).
- **Interleave:** Tier C optimizations (fast, no drafting).
- Skip anything that would be a 7th `/create` synonym.

## KPIs (measure at next 28-day GSC window)

| Metric | Now | Target |
|---|---|---|
| walmart-receipt-lookup position | GSC ~pos 20s | top 5 |
| rent-receipt-template | none | indexed + top 20 |
| AI citations (monthly ChatGPT test) | 0 | first appearance |
| avg position / CTR | 19.6 / 0.74% | <12 / >1.5% |
