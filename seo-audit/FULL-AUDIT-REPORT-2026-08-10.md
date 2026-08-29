# Full SEO Audit — makecepeit.com

**Date:** 2026-08-10
**Method:** Live crawl of production (`https://www.makecepeit.com`) + direct source-code audit + live Semrush organic data (US, pulled 2026-08-10)
**Pages in sitemap:** ~1,093 (brands 348 · examples 315 · receipt-help 219 · blog 154 · templates 42 + static)
**Previous audit:** 2026-08-07 (83/100)

---

## Executive Summary

### SEO Health Score: **83 / 100** — flat vs 2026-08-07

The on-site health score has not moved in three days, and the reason is not planning — it's **execution/deployment**. The high-impact fixes from the last audit that would lift the score (C1 keyword removal, H1 duplication, redirect chain) are still untouched in production, and the single biggest planned growth asset — the comparison pages — **is written locally but never committed or deployed** (returns 404 on production).

Meanwhile the off-site picture is a tale of two metrics: **coverage is climbing** (Semrush organic keywords 358 → **535**, +49% since Jul-30, confirming the blog drip is working) but **positions are flat-to-down on the money terms** (top-10 6 → **5**, top-3 1 → **0**). This is exactly the gap the August plan was built to close — and it isn't closing because the position-fixing work (money-page optimization, comparison pages, striking-distance internal links) hasn't shipped.

**The headline for the plan: this is an execution gap, not a strategy gap. Ship what's already built.**

### What changed since 2026-08-07

| Prior finding | Status now |
|---|---|
| ✅ **H2 — deepen generated-brand intros** | **DONE.** `INTRO_VARIANTS` are now 2-sentence variants with a brand-specific noun slot (`lib/brands.ts:5324`). |
| ✅ **M1 — honest-use disclaimer** | **DEPLOYED.** Homepage + brand pages carry "…legitimate purposes such as record keeping… Creating receipts to defraud is illegal." |
| ✅ **GEO — legitimate-use framing** | **DONE in `llms.txt`** — explicit legitimate-uses paragraph + fraud disclaimer. |
| 🟡 **H1 — category-default duplication** | **Partial.** `BRAND_ITEMS` now covers **127** brands, but ~**227 of 354** seeds still fall back to `CATEGORY_DEFAULT_ITEMS` (`lib/brands.ts:5533`). Biggest remaining content issue. |
| ❌ **C1 — "fake receipt maker" keyword** | **Still live** (`app/layout.tsx:25`, and ×2 in homepage HTML). The top strategic risk is unchanged. |
| ❌ **L1 — redirect chain** | **Still 2 hops:** `http://makecepeit.com` → `https://makecepeit.com` → `https://www.makecepeit.com`. |
| ❌ **M2 — connect GSC + CrUX** | **Not done.** Performance still lab-estimated; no indexation coverage data. |
| ❌ **H3 — /examples boilerplate** | **Not done** — and now **315** example pages (was 291), so the shared-prose surface grew. |

### 🔴 New / escalated findings

1. **[Critical execution] The comparison pages are 404 on production.** `/alternatives`, `/compare/makereceipt`, `/compare/receiptfaker`, `/compare/receiptbaker` all return **404**. The code exists but is **untracked in git** (`app/alternatives/`, `app/compare/`, `components/comparison/`, `lib/comparisons.ts`) and `app/sitemap.ts` + `Footer.tsx` are modified-uncommitted. The entire Week-1 comparison strategy — plus the hub target for August blog posts #1, #5, #7, #9 — is sitting undeployed on the `dev` branch. **This is the #1 thing to fix.**
2. **[High] Keyword cannibalization is now visible in live data.** Multiple URLs compete for the same term: `mechanic receipts` (#50/#55/#60 across 3 URLs), `generate a receipt online` (home + blog), `receipt creator online` (home + `/create`), `create receipt.com` (3 URLs). Splitting authority is holding these off page 1.
3. **[Trap] Don't deploy the footer without the compare pages.** Production footer does *not* yet link to `/alternatives` (uncommitted), so there's no broken link *yet* — but the modified `Footer.tsx` adds that link. Ship the footer and the compare pages **together**, or you introduce a sitewide broken link.

---

## Ranking reality check (Semrush US, 2026-08-10)

| Metric | Jul-30 baseline | Aug-10 now | Aug target | Trend |
|---|--:|--:|--:|---|
| Total ranking keywords | 358 | **535** | 600+ | 🟢 on track |
| Keywords in top 10 | 6 | **5** | 40+ | 🔴 down |
| Keywords in top 3 | 1 | **0** | 8+ | 🔴 down |
| Keywords in pos 11–30 | — | **56** | — | 🟡 huge striking-distance pool |
| Est. organic traffic | — | **11/mo** | — | 🔴 very low |

**Read:** publishing works; positioning doesn't — yet. 56 keywords sit in positions 11–30 with no movement (every `position_difference` in the sample is 0). That pool is the fastest available win and is precisely what internal-linking + on-page exact-match (Tier 0) is meant to convert. The core commercial terms are stuck deep — `generate a receipt online` #81, `receipt creator online` #87, `online receipt maker free` #76 — because the money-page overhaul hasn't shipped.

**Best current positions** (the pages that *are* working — the model to replicate): `what does amount tendered mean` #5, `amount tendered` #6, `apple store receipt generator` #7 (KD1), `motel 6 receipt template` #9, `recover my receipt zara` #13, `zara receipt` #19.

---

## Category scores

| Category | Weight | Aug-07 | Aug-10 | Note |
|---|--:|--:|--:|---|
| Technical SEO | 22% | 92 | **90** | Redirect chain still 2 hops; latent footer/compare deploy trap |
| Content Quality | 23% | 62 | **64** | H2 done, BRAND_ITEMS +10; H1 (227 fallback) + H3 (315 examples) open |
| On-Page SEO | 20% | 90 | **88** | Cannibalization now visible; money terms unoptimized on money pages |
| Schema | 10% | 95 | **95** | Comprehensive, intact (Org, WebSite, WebApp, Offer, FAQPage, Person; Breadcrumb on inner pages) |
| Performance (CWV) | 10% | 80 | **80** | Still no field data (GSC/CrUX unconnected); homepage ~171 KB |
| AI Readiness (GEO) | 10% | 90 | **91** | llms.txt legitimate-use framing added |
| Images | 5% | 88 | **88** | Unchanged |
| **Total** | **100%** | **83** | **≈83** | Flat — gated by undeployed fixes |

---

## Minor notes

- Homepage meta description is **162 chars** (target ≤160) and says "**100+** brand templates" while the site has **350+** brand layouts + 40+ templates — undercount; align the copy.
- Examples grew 291 → 315 without the H3 differentiation fix, so the near-duplicate prose surface is larger than at the last audit.
- `fake lyft receipt` (#47/#55) ranks — a fraud-adjacent term in tension with the legitimacy-first positioning; note for the Tier-5 decision.

## What was NOT changed
This audit is read-only. No code, git state, redirects, or indexing directives were modified. The comparison-page deployment, the C1 keyword decision, and the redirect fix all need your action.
