# Master SEO Action Plan — makecepeit.com

**Date:** 2026-08-15 · **Health score:** 78/100 · **Supersedes** ACTION-PLAN-2026-08-14.md

**Consolidates every data source now live:** GSC (connected 08-14), Bing Webmaster, DataForSEO (Lighthouse CWV, ChatGPT GEO, backlinks, keywords), Semrush, and competitor recon (receiptfaker / makereceipt).

---

## Strategic thesis

Your **informational content ranks on page 1, but your money pages are stranded on pages 5–8** (`/create` pos 79, home pos 74) — for two fixable reasons: the money pages don't use the head keywords, and you have **almost no authority** (3 referring domains vs makereceipt's 372). You're also **invisible in AI answers** (0 ChatGPT citations). Nothing here is a technical emergency — performance and indexing are healthy. The path up is: **ship what's already written → put the proven low-KD head terms on the money pages → build authority → grab the KD-0 keyword gems.**

## Scoreboard (all live data)

| Signal | Value | Source |
|---|---|---|
| Google search (28d) | 34,387 impressions · 254 clicks · **0.74% CTR** · **pos 19.6** | GSC |
| Money-page positions | `/create` **79** · home **74** · `/templates/restaurant` **50** | GSC |
| Indexation | ~900 pages (Bing) · 500+ ranking (GSC) — healthy | Bing/GSC |
| Authority | **3 referring domains** (domain rank 7/1000, 10 backlinks, spam 15) | DataForSEO |
| — vs competitors | makereceipt **372** · receiptfaker **109** · receiptbaker **20** | DataForSEO |
| Core Web Vitals (mobile) | Perf **95–97**, CLS 0 — *healthy* (`/create` a11y 82 is the only gap) | DataForSEO Lighthouse |
| AI / GEO | **0 ChatGPT citations** for "best free receipt generator" | DataForSEO |

---

## 🔴 CRITICAL — ship this week

| # | Action | Effort | Evidence |
|---|---|---|---|
| C1 | **Commit + deploy the 3 written-but-unshipped fixes** — `app/login/page.tsx` (noindex `?next=`), `app/api/logo/route.ts` + `app/opengraph-image.tsx` (`X-Robots-Tag: noindex`). | S | HEAD lacks `index:false`; GSC "Duplicate w/o canonical" still open |
| C2 | **Money-page keyword overhaul (`/create` + home).** `/create` title→ "Free Receipt Maker & Generator — Build a Custom Receipt Online", H1→ "Free Receipt Maker"; home H1→ include "receipt maker/generator". Add one indexable intro paragraph with the exact phrases. | M | `/create` title="Receipt Builder" → **pos 79**; terms confirmed **low-KD**: online receipt generator KD8, free receipt maker KD9 |
| C3 | **Push all changed URLs to IndexNow** after deploy (`/login`, `/create`, home, `/compare/*`, `/alternatives`). | S | IndexNow is manual here |

---

## 🟠 HIGH — next 2–4 weeks

| # | Action | Effort | Evidence |
|---|---|---|---|
| H1 | **Own "walmart receipt lookup"** — 33,100 vol @ **KD 0**. Fully optimize the existing `/blog/walmart-receipt-lookup` (title, intro, FAQ, internal links, step-by-step). | M | DataForSEO: 33,100 vol, KD 0; you already rank/have the page |
| H2 | **Build a rent-receipt-template page** — a KD 0–1 cluster (`rent receipt template`, `rental receipt template word`, …) at 6,600 vol. You have **no** dedicated page. | M | DataForSEO cluster, KD 0–1, 6,600 vol |
| H3 | **CTR rewrites on the ~10 page-1 zero-CTR pages** + add FAQPage/HowTo schema so you win the snippet. | M | GSC: `amount-tendered-meaning` pos 5.7 / 1,330 imp / **2 clicks**; zara-receipt-copy pos 8.0 / 1,242 / 2 |
| H4 | **Backlink program — kickoff.** Submit the directory kit (AlternativeTo, SaaSHub, Product Hunt, AI directories) **and** the clean competitor-link targets below. | L | 3 vs 372 referring domains — the ceiling on every ranking above |
| H5 | **Brand receipt template pages** for KD<15 commercial long-tails: `instacart receipt generator` (GSC pos 10.8), `apple receipt maker` (20.3), `burberry receipt generator` (14.4), plus `fake walmart receipt` (KD5), `fake grab receipt` (KD0). Brand-safe titles, `/brands` + `/templates` shell. | M | GSC striking-distance + DataForSEO + competitor `/template/X` pattern (#1 @ KD5) |

---

## 🟡 MEDIUM — this month

| # | Action | Effort | Evidence |
|---|---|---|---|
| M1 | **Fix `/create` Accessibility (82 → 90+)** — contrast, form labels, focus states on the builder. | M | Lighthouse a11y 82 (home is 97) |
| M2 | **Low-KD content/template pages:** `itemized receipt` (KD0), `store receipts` (KD5), `grocery receipt` (KD0), `restaurant receipt` (KD0), `digital receipt` (KD4). Map to existing/new template pages. | L | DataForSEO ranked-keyword map |
| M3 | **Kill category-default duplication** — unique realistic items for fallback brands (`lib/brands.ts`). | L | Templated-content risk |
| M4 | **Schema + E-E-A-T:** HowTo on step lists, FAQPage on FAQs, richer `Organization` (`contactPoint`, `foundingDate`, real `sameAs`). | M | Only `sameAs` = X today |
| M5 | **Return/exchange-without-receipt content** (walmart/target, KD 6–12, 5.4k–12k vol) in `/receipt-help`. | M | DataForSEO suggestions |
| M6 | **GEO:** get listed on AI-cited directories, add citable structured passages; track the **ChatGPT-citation KPI monthly** (~$0.02/pull). | M | 0 citations; cited set below |
| M7 | **Soften the "No sign-up" chip** → "Free to build & preview — account only to download." | S | Post-click bounce risk |

---

## 🟢 LOW — backlog

L1 Collapse `http→non-www→www` redirect chain (1 hop) · L2 Differentiate `/examples` boilerplate · L3 `/create` LCP 2.8s→<2.5s · L4 Deepen generated-brand intros · L5 `/examples` indexable images + alt audit.

---

## 📋 Keyword target sheet (live volume + KD → page)

| Keyword | Vol | KD | Intent | Target page | Action |
|---|---|---|---|---|---|
| walmart receipt lookup | 33,100 | 0 | nav | /blog/walmart-receipt-lookup | H1 — own it |
| receipt template(s) | 14,800 | 11–13 | info | /templates (hub) | optimize hub |
| receipt maker | 12,100 | 35 | trans | home (title ✓) | keep + authority |
| rent/rental receipt template | 6,600 | 0–1 | info | **NEW** /templates/rent-receipt | H2 — build |
| receipt generator | 6,600 | 28 | comm | /create + home | C2 |
| itemized receipt | 5,400 | 0 | info | /guides or /templates | M2 |
| free receipt maker | 3,600 | 9 | trans | home + /create | C2 |
| receipt generator free | 3,600 | 11 | info | /create | C2 |
| store receipts | 3,600 | 5 | info | /templates/retail-store | M2 |
| fake receipts | 3,600 | 12 | info | fake-cluster (brand-safe) | H5 |
| grocery receipt | 2,400 | 0 | info | /templates/grocery-store | M2 |
| fake grab receipt | 2,400 | 0 | info | /brands/grab | H5 |
| restaurant receipt | 1,900 | 0 | info | /templates/restaurant | M2 |
| digital receipt | 1,900 | 4 | trans | guide/blog | M2 |
| online receipt generator | 1,600 | 8 | comm | /create (title/H1) | C2 |
| instacart receipt generator | ~—(GSC pos 10.8) | — | comm | /brands/instacart | H5 |

*(Universe: 82,338 "receipt" keywords — effectively unlimited low-KD long-tail runway for the brand-template strategy.)*

## 🔗 Backlink outreach list

**You:** 3 referring domains. **Reality check:** much of the competitors' lead is a spam PBN — of the 27 domains linking to both makereceipt + receiptfaker (not you), ~9 are `seo-anomaly-sX.xyz` (spam 75–99) — **do not chase those.**

**Clean, gettable targets (start here):**
- `promoteproject.com` (rank 22, launch/directory) · `verygoodalternatives.com` (alternatives directory) · `toolsmart.ai` (AI-tools directory — you qualify via the AI generator) · `robuta.com` · `navigaweb.net`, `howtechismade.com` (tech blogs)
- **Plus the directory kit** (`plan/directory-submission-kit.md`) — makereceipt's anchor profile is almost all **branded mentions + directory/template listings + 2 content posts**, i.e. entirely replicable.

**Next data pull (optional, ~$0.03):** makereceipt's full 372-domain list filtered to spam<30 → a 50–100 prospect outreach sheet.

## 🤖 GEO / AI visibility

- **Status:** 0 mentions/citations in ChatGPT for "best free receipt generator." Feature parity exists — it's an **authority/mention gap**, not a product gap.
- **AI-cited leaders to get listed alongside:** checkoutreceipt.com, receiptexpenses.com, makemyreceipt.com, onlinereceiptmaker.com, receiptmakr.com, kitovo.app. (Note: the AI-citation set ≠ the Google-SERP set — a separate game.)
- **KPI:** re-run the ChatGPT pull monthly (~$0.02) and track first appearance.

## ⚡ Core Web Vitals — healthy, deprioritized

| Page | Perf | A11y | LCP | TBT | CLS |
|---|---|---|---|---|---|
| Home | 97 | 97 | 2.4s | 90ms | 0 |
| /create | 95 | **82** | 2.8s | 100ms | 0 |

The old "font-bloat / INP on `/create`" worry is **disproven**. Only real item: `/create` accessibility (M1).

---

## 30-day sequence

- **Week 1:** C1 → C3 (deploy pending fixes + IndexNow) → H1 (own walmart-receipt-lookup).
- **Week 2:** C2 (money-page keyword overhaul) → H3 (CTR rewrites + schema).
- **Week 3:** H2 (rent-receipt page) → H5 (brand template pages).
- **Week 4 + ongoing:** H4 backlinks (weekly), M-block content, GEO tracking, IndexNow after every publish.

## North-star KPIs (measure at next 28-day window)

| Metric | Now | Target |
|---|---|---|
| Avg position | 19.6 | **< 12** |
| CTR | 0.74% | **> 1.5%** |
| Referring domains (clean) | 3 | **30** |
| `/create` + home position | 74–79 | **top 20** |
| ChatGPT citations | 0 | **appears** |
| Health score | 78 | **85+** |
