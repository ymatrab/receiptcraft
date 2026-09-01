# Full SEO Audit — makecepeit.com — 2026-08-19

**Method:** 12 specialist passes (technical, content/E-E-A-T, schema, sitemap, performance, visual, GEO, SXO, live GSC field data, backlinks, content-cluster architecture, DataForSEO) run in parallel against the live site (`https://www.makecepeit.com`) plus source review of the local repo. Baseline for delta comparisons: `FULL-AUDIT-REPORT-2026-08-14.md` (scored 78/100).

---

## Executive Summary

### SEO Health Score: **75 / 100** *(down slightly from 78/100 on 08-14 — see note)*

| Category | Weight | Score | 08-14 | Δ |
|---|--:|--:|--:|--:|
| Technical SEO | 22% | **93** | 88 | ▲ +5 |
| Content Quality | 23% | **64** | — | reassessed |
| On-Page SEO | 20% | **66** | 70 | ▼ -4 |
| Schema / Structured Data | 10% | **79** | 76 | ▲ +3 |
| Performance (CWV) | 10% | **75** | 80 | re-scoped, same caveat |
| AI Search Readiness (GEO) | 10% | **77** | 72 | ▲ +5 |
| Images | 5% | **80** | 78 | ▲ +2 |

**Why the overall score moved down despite four categories improving:** this pass went deeper than 08-14 on two fronts — a full code read of `lib/brands.ts` (not just rendered-page sampling) and a live re-pull of GSC data — and both surfaced that Content Quality and On-Page were softer than the headline 78 implied. This is **better information, not new damage**: the technical fixes that shipped since 08-14 are real and verified live, but the content-scale and head-term problems they didn't touch are now precisely quantified for the first time.

### Top 5 Critical/High Issues
1. **Home and `/create` still don't lead with "receipt maker"/"receipt generator" in H1/meta** — confirmed via fresh GSC data that `/create` now gets **zero clicks on 791 impressions** (up from 475 impressions at 08-14). This is the single highest-leverage open item and it's a same-day copy fix.
2. **`/create` and all ~220 `/receipt-help/*` pages emit the homepage's Open Graph tags** instead of their own (NEW finding) — breaks social/LLM-preview citations at scale, plausibly contributing to the CTR crisis on informational pages.
3. **885 of 1,118 sitemap URLs (79%) — `/brands`, `/examples`, `/receipt-help` — breach the near-duplicate-content quality gate** by 4-17x, with direct code evidence of small-variant-pool templating (`/brands`) and one CTA paragraph that's byte-for-byte identical across all 316 `/examples` pages.
4. **Backlink profile is still effectively zero**, now corroborated by a second independent source (Common Crawl doesn't have the domain in its graph at all) — this remains the ceiling capping money pages at pos 74-79.
5. **Hub pages link to zero spokes** (0/8 sampled: `/create`, 4× `/brands/*`, `/compare/makereceipt`, `/templates/restaurant`, `/alternatives`) — the internal-link graph flows spoke→hub only, never back down. One template fix retroactively benefits all 30 published posts.

### Top 5 Quick Wins
1. Rewrite home H1 (`"Make a receipt in 60 seconds"` → include "receipt maker") and `/create`'s H1/title (`"Receipt Builder"` → include the head term) — copy-only, no dev work. Use `/brands/starbucks` (title: "Free Starbucks Receipt Generator — Coffee Receipt Maker") as the reference pattern that already works.
2. Fix `/create` and `/receipt-help/*` Open Graph tags to be self-referential instead of homepage copies — one shared metadata-generator patch.
3. Delete the dead `HowTo` JSON-LD block added in the homepage redesign — Google removed HowTo rich results in Sept 2023; it's wasted, inert markup.
4. Add a "Related reading" module to hub-page templates (`/create`, `/brands/[slug]`, `/compare/[slug]`, `/templates/[slug]`, `/alternatives`) keyed off the `hub`/`cluster` fields already tracked in the content ledger's data model.
5. Scope the 25 receipt-builder font families out of the root layout so ~1,100 non-`/create` pages stop parsing 201 unused `@font-face` rules.

---

## What changed since 2026-08-14 (verified live)

**RESOLVED:**
- `/login?next=` self-canonicalization + `noindex` (commit `19711c6`) — re-verified live, correct pattern.
- `/api/logo` and `/opengraph-image` `X-Robots-Tag: noindex` — both confirmed live.
- IndexNow cron visibility fix (`fcd30b9`) — code + schedule confirmed wired.
- Homepage `FAQPage`/`HowTo`/`WebApplication`/`DefinedTermSet` schema shipped (commit `b0d61a5`) — closes 08-14's schema gap on paper (though see HowTo caveat above).
- `CATEGORY_DEFAULT_ITEMS` brand-item duplication — the 08-14 framing was overstated; code-level check confirms 0/348 live brand pages actually fall through to the shared default table.
- Ledger's stale "`/alternatives`/`/compare/*` 404" warning — all four routes confirmed live at 200.

**STILL OPEN (unchanged):**
- `http → non-www → www` 2-hop redirect chain.
- Sitewide font-loading bloat (re-scoped: it's sitewide via root layout, not `/create`-scoped as previously described).
- Thin `Organization` schema (no `contactPoint`/`foundingDate`, `sameAs` = one X/Twitter link).
- Home/`/create` H1-vs-head-term mismatch — GSC confirms this is now measurably worse (`/create` 0 clicks).
- Page-1 CTR crisis on the original 6 flagged pages — numbers essentially unchanged, plus 4 more newly-visible pages in a wider pull.
- Near-zero backlinks — now corroborated by a second, independent live source.
- `/brands`/`/examples`/`/receipt-help` templated-prose thinness — confirmed and more precisely scoped this pass (variant-pool sizes, byte-identical CTA on `/examples`).
- Named-author E-E-A-T gap on `/authors`.

**NEW this pass:**
- `/create` + `/receipt-help/*` Open Graph metadata bug (homepage tags leaking onto every page).
- Hub pages have zero reciprocal links to their own spoke content.
- `/create` is itself optimized for the same head terms as 6 of its own blog spokes — a 7-URL collision, not yet costing rankings (nothing in the cluster ranks yet) but structurally risky.
- Byline mismatch: `BlogPosting` schema names an individual author ("Sara Artheta") that `/authors` doesn't back up with a real profile.
- `/pricing` is the only one of the tested pages served uncached (`private, no-cache, no-store`), with a 650–780ms TTFB vs. ~250-400ms on cached pages.
- DataForSEO MCP is not functional this session — every call returns HTTP 403 (account auth/billing issue, not a per-endpoint problem). Flagged for the user to check independently of this audit.

---

## Technical SEO — 93/100

Crawlability, indexability, security headers, mobile viewport, and SSR/JS-rendering all **PASS clean**. Full detail: `robots.txt`/`sitemap.xml` correct; all three pending 08-14 fixes (`/login?next=`, `/api/logo` noindex, `/opengraph-image` noindex) re-verified live; IndexNow cron wired; HSTS/CSP/nosniff/Referrer-Policy/Permissions-Policy all present; every sampled template self-canonicalizes correctly; SSR confirmed (`is_spa: false`, full content in raw HTML with zero JS dependency).

**Still open:** the `http://makecepeit.com` → `https://makecepeit.com` → `https://www.makecepeit.com/` redirect chain remains 2 hops (Low). Sitewide font-loading CSS bloat — `app/fonts.ts` declares 27 `next/font/google` families, applied once on `<html>` in the root layout, so all ~1,118 pages ship 201 `@font-face` rules (93% of one shared CSS file) to use exactly 2 of them. Compressed transfer cost is small (~6KB) — this is a parse/code-hygiene issue, not a major LCP driver.

**Sitemap mechanics** (feeds this category): valid XML, correct scale handling (no index file needed at 1,118 URLs, and none wrongly present), `priority`/`changefreq` correctly omitted, 49/49 stratified sample URLs live at 200, blog `lastmod` genuinely per-page accurate. The other 947 URLs (85%) share bucket-level `lastmod` constants rather than per-page dates — deliberate (avoids the worse "everything modified today" anti-pattern) but means a hand-edited brand/help page won't get its own accurate timestamp, and per the IndexNow cron's own logic, could silently never get pushed to Bing.

---

## Content Quality — 64/100

The content **operation** (171 posts, active ledger discipline, angle-differentiated near-duplicates, brand-cluster hygiene) is well above average for a site this size. The score is held down by **scale of unjustified near-duplicate indexation**: 885 of 1,118 sitemap URLs (79%) — `/brands` (349), `/examples` (316), `/receipt-help` (220) — individually breach this skill's quality gates by 4-17x (WARNING at 30+ near-duplicate pages, HARD STOP at 50+ requiring justification), with no documented indexation-strategy justification found anywhere in the repo.

Direct code evidence:
- **`/brands` (234 of 349 generated pages):** built via a deterministic hash-of-slug picker pulling from tiny fixed pools — 4 intro / 3 use-case / 4 footer / 5 meta-description / 6 title variants, interpolated with just `{brand name}`/`{category noun}`. Item tables themselves are genuinely unique per brand (0/348 fall to the shared default — that specific 08-14 claim was overstated), but the surrounding prose is real mad-lib templating.
- **`/examples` (316 pages) — the weakest template on the site:** fixed, non-varying paragraph templates (no variant pool at all). The closing CTA paragraph is **byte-for-byte identical across all 316 pages**. Worse than 08-14's "~80% shared prose" estimate.
- **`/receipt-help` (220 pages):** same generator pattern inferred from file density (`lib/intent-pages.ts`, ~2.8 lines/entry), mitigated by genuine `FAQPage` schema and sectioned body content — not fully code-verified this pass, flagged for next audit.

**E-E-A-T:** `/about`, `/editorial-policy`, `/authors` all exist and are substantive (editorial-policy is a genuine strength — explicit correction process, "we do not invent credentials"). The clearest remaining gap: `/authors` is a collective "team" page with no named individuals/credentials, while `BlogPosting` schema names an individual author ("Sara Artheta") with no corroborating bio — an unverifiable-byline inconsistency, notable given the site's content leans YMYL-adjacent (expense reporting, bookkeeping records).

**Mitigating factor:** this is a receipt-generator *utility* — each brand/example page hosts a real, functionally distinct interactive tool, not a zero-utility "we serve City X too" doorway page. That's a real, meaningful defense for the 118 hand-built `/brands` pages. It's a much weaker defense for the 234 template-generated `/brands` pages and the bulk of `/examples`/`/receipt-help`, where it's specifically the *surrounding prose* — not the tool — that Google's Helpful Content system evaluates.

---

## On-Page SEO — 66/100

**SERP-backwards check confirms the core problem is unchanged and now sharper:** every top-8 organic result for "receipt maker"/"receipt generator" is a Tool/Interactive page type, and every one leads its title with the exact commercial phrase. Home's title does this correctly, but its **H1 (`"Make a receipt in 60 seconds"`) still doesn't contain "receipt maker" or "receipt generator"** — the exact 08-14 finding, unchanged. `/create` is worse: title (`"Receipt Builder — Create a Custom Receipt Online"`) and H1 (`"Receipt Builder"`) contain no head-term match at all, word count is 379 vs. home's 2,530, and it carries no FAQ/HowTo schema.

**NEW bugs found this pass:**
- `/create`'s Open Graph tags (`og:title`, `og:description`, `og:url`) are literal copies of the homepage's — confirmed via raw HTML. Canonical tag is correctly self-referential, so this isn't an indexing problem, but any social share or LLM citation preview of `/create` shows homepage metadata instead.
- **Confirmed template-wide (3/3 sampled):** every `/receipt-help/*` page emits the homepage's OG block instead of its own title/description/URL — a plausible contributing factor to the CTR-crisis pattern on informational pages, isolated to this one template (`/brands/*` and `/blog/*` are correctly self-referential).

**What's working — use as the reference pattern:** `/brands/starbucks` (title: "Free Starbucks Receipt Generator — Coffee Receipt Maker", H1: "Starbucks Receipt Generator") leads with the exact commercial phrase and is fully aligned with SERP consensus. `/receipt-help/*` pages correctly sequence "where to look first" before the recreate-CTA, matching a skeptical, not-yet-decided persona.

**Zero-click reframe:** the flagged `/blog/amount-tendered-meaning` CTR crisis (pos 5.7, 1,349 impressions, 2 clicks) is not a structural/on-page problem — title, schema, and FAQ are all correctly matched to the query. It reads as classic zero-click snippet cannibalization on an ultra-short definitional query; the page's own FAQPage schema may be feeding the exact snippet that answers the query without a click.

---

## Schema / Structured Data — 79/100

Live production matches source exactly on every sampled template — no drift, no client-injected schema.

| Template | Blocks |
|---|---|
| Sitewide | `Organization`, `WebSite` |
| Home | + `FAQPage`, `WebApplication`, `HowTo`, `DefinedTermSet` |
| `/blog/[slug]` | + `BlogPosting`, `BreadcrumbList`, `FAQPage` |
| `/brands/[slug]` | + `FAQPage`, `BreadcrumbList` |
| `/templates/[slug]` | + `FAQPage`, `BreadcrumbList` |
| `/pricing` | + `SoftwareApplication` (3 well-formed `Offer`s), `FAQPage` |
| `/create` | + `WebApplication` |

**Still open:** `Organization` is exactly as thin as 08-14 found it — `name`/`url`/`logo`/`email`/`sameAs:[twitter only]`, no `contactPoint` or `foundingDate`. The one fully-actionable 08-14 item that still wasn't touched.

**Resolved, but imperfectly:** the homepage redesign added both items 08-14 asked for — but **`HowTo` rich results were removed by Google in September 2023** (dead markup, should be deleted, not extended — and correctly *not* copy-pasted onto `/brands`/`/templates`, which show the same 3-step content unmarked, the right call). **`FAQPage` rich results are Google-restricted to government/healthcare sites** since August 2023 — fine to keep as an AI/LLM-citation asset (Info priority), not a Google SERP win. Same caveat applies to the FAQPage blocks that already existed pre-08-14 on `/blog`, `/brands`, `/templates`, `/pricing`.

**New, genuinely good:** `WebApplication`/`SoftwareApplication` with correctly-typed `Offer`/`UnitPriceSpecification` (ISO 8601 billing durations), and a `DefinedTermSet` for the homepage's receipt-anatomy definitions — a reasonable GEO-oriented addition not requested by 08-14. Neither `WebApplication` block can earn its rich result without `aggregateRating`, which the site has no legitimate way to populate yet (no review-collection mechanism) — informational, not actionable today.

---

## Performance (CWV) — 75/100 *(lab/heuristic-estimated, not field-measured — same caveat as 08-14)*

No CrUX/PageSpeed API key configured; no Lighthouse/Playwright run (no-install policy in effect). Derived from HTTP timing, response headers, and static code analysis.

- **TTFB:** `/` and `/create` are edge-cached (~225-460ms). **`/pricing` is the outlier** — served `cache-control: private, no-cache, no-store` (needs auth state for its CTA), TTFB 650-780ms. Worth isolating the auth-dependent CTA into a client island so the shell can be statically cached, especially since `PricingCta.tsx` is already mid-edit for an unrelated checkout-flow fix.
- **Font bloat, re-scoped:** confirmed sitewide (not `/create`-only as 08-14 framed it) — 201 `@font-face` rules, 93% of one shared CSS file, ship on every page to serve 2 fonts. Compressed cost is small (~6KB); this is a parse-cost/hygiene issue.
- **`/create` INP watch-item, re-scoped:** font-switching itself is unlikely the culprit (async, non-blocking). The more plausible risk: `lib/download.ts` statically imports `html-to-image` (unlike `jsPDF`, already dynamically imported), and the Download click runs synchronous `pixelRatio: 3` image serialization — real CPU-heavy main-thread work on the interaction itself.
- **CLS:** no issues found — images dimensioned, fonts preloaded with `display: swap`, no ad slots or late-injected content.

---

## AI Search Readiness (GEO) — 77/100

| Dimension | Score |
|---|--:|
| Citability | 90 |
| Structural Readability | 85 |
| Multi-Modal Content | 65 |
| Authority & Brand Signals | 45 |
| Technical Accessibility | 92 |

`llms.txt`/`llms-full.txt` confirmed live and content-accurate. No AI-crawler blocks in `robots.txt` (GPTBot/ClaudeBot/PerplexityBot/CCBot all inherit the open wildcard). **Citability is the most-improved dimension since 08-14** — direct-answer ledes, question-based H2s, tight FAQ blocks in the 134-167-word optimal band, and genuine source citations (HHS/HIPAA, FTC, PCI Security Standards Council on the pharmacy-receipt post) confirmed across every sampled page type.

**Still the weak point:** Authority & Brand Signals (45/100) — `sameAs` remains a single X/Twitter link, and off-site brand-mention data wasn't independently re-verified this pass (carry forward 08-14's near-zero finding, now corroborated by this session's backlinks pass). Zero video content sitewide despite video being the strongest brand-mention/citation correlate per the skill's reference data.

---

## Images — 80/100

No dedicated crawl this pass (not in the seo-audit core roster), assessed from technical/visual findings: every inspected `<img>` carries explicit `width`/`height` + `loading="lazy"` — good CLS hygiene. `/api/logo` and `/opengraph-image` now both correctly `noindex`'d (resolves 08-14's open item). Brand-logo trust-bar images use empty `alt=""` (acceptable, decorative); directory badges have real alt text. **Not verified this pass** (same gap as 08-14): alt-text coverage across the 349 `/brands` and 316 `/examples` pages' primary content images/rendered receipts — recommend a dedicated image-audit pass next time.

---

## Content Cluster Architecture (supplementary — not in the core 7-category score)

**Sub-score: 62/100.** Spoke→hub linking is real and consistent (10/10 sampled posts link up correctly). The internal-link graph is **one-directional**: 0/8 sampled hub pages (`/create`, 4× `/brands/*`, `/compare/makereceipt`, `/templates/restaurant`, `/alternatives`) link back to any spoke content — no "Related reading" module exists anywhere. This is a single template-level fix (querying on the `hub`/`cluster` fields the content ledger already tracks) that retroactively benefits all 30 live posts and every future one.

**Cannibalization risk:** `/create` itself is optimized for the same head terms ("create a receipt", "make a receipt", "receipt maker free") as 6 of its own blog spokes — a 7-URL collision for one intent, not yet costing rankings only because none of the 7 currently rank (per `docs/position-tracking-100-keywords.md`, all show "—"). The 2026-08-17 content-plan update correctly stopped adding more posts to this cluster; the 6 already-published overlapping posts haven't been addressed.

---

## Backlinks (supplementary — insufficient live data for a numeric score)

DataForSEO MCP returned HTTP 403 on every call this session (account auth/billing issue — flagged for the user to check independently). Common Crawl's live pull found **makecepeit.com entirely absent from its web graph** — no in-degree, no PageRank — a second independent signal corroborating the 08-14 "~0 inbound links" finding. The last working DataForSEO pull on record (2026-08-15/17, in-repo) showed 10 backlinks / 3-13 referring domains / Domain Rank 7 vs. competitors makereceipt (372), receiptfaker (109), receiptbaker (20) — treat as stale, not re-verified today. Already picking up organic AI-tool-directory links (fazier.com, bestofai.com, etc.) — the outreach program should lean into that proven channel. 8 concrete link targets identified, all backed by existing repo assets (`plan/directory-submission-kit.md`, live `/compare/*` pages).

---

## GSC Field Data Snapshot (28d, 2026-07-20 to 2026-08-16, live)

| Metric | 08-14 | Now | Δ |
|---|--:|--:|--:|
| Impressions | 34,387 | 34,744 | +1.0% |
| Clicks | 254 | 240 | **-5.5%** |
| CTR | 0.74% | 0.69% | **worse** |
| Avg position | 19.6 | 20.04 | **worse** |

Money pages unchanged (home pos 74.7, `/create` pos 79.2) — `/create` now converts **zero clicks** on 791 impressions (up from 475). A working-template comparison set (`chipotle-receipt-copy` 1.35% CTR, `pizza-hut-receipt-copy` 2.37% CTR at similar positions) proves the same page type can convert when title/query match tightly — concrete before/after models for the zero-CTR pages. None of the shipped 08-14→08-19 fixes were on-page keyword or backlink changes, so this flat/slightly-worse trend is expected, not alarming — it's evidence the *next* fixes need to be on-page and off-page, not more technical hygiene.

---

*See `ACTION-PLAN-2026-08-19.md` for the prioritized, effort-estimated task list.*
