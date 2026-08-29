# SEO Action Plan — makecepeit.com

**Date:** 2026-08-19 · **Score:** 75/100 · Companion to `FULL-AUDIT-REPORT-2026-08-19.md`

Priority key: **Critical** = ship now · **High** = within 1 week · **Medium** = within 1 month · **Low** = backlog.
Effort: S (<1h) · M (a few hours) · L (a day+).

Note: nothing this pass rises to Critical (blocks indexing / causes penalties) — the prior Criticals (login-canonical, noindex headers, IndexNow cron) all shipped and are confirmed live.

---

## 🟠 High — within 1 week

| # | Action | Effort | Evidence |
|---|---|---|---|
| H1 | **Rewrite home H1** to lead with "receipt maker" (currently "Make a receipt in 60 seconds" — keep the hook as a subhead). Copy-only. | S | GSC: home pos 74.7, unchanged since 08-14. `/brands/starbucks` proves the pattern works. |
| H2 | **Rewrite `/create`'s title + H1** to include "receipt maker"/"receipt generator" (currently "Receipt Builder" — no head-term match at all). | S | GSC: `/create` now **0 clicks on 791 impressions** (up from 475 at 08-14) — the single sharpest regression this pass. |
| H3 | **Fix Open Graph tags on `/create`** — currently duplicates the homepage's `og:title`/`og:url`. | S | Confirmed via raw HTML; canonical is fine, only OG is wrong. |
| H4 | **Fix Open Graph tags on all `/receipt-help/*` pages (template-level)** — confirmed 3/3 sampled emit homepage OG data instead of their own. Patch the shared metadata generator once, fixes all ~220 pages. | M | Plausible contributing factor to the CTR-crisis pattern on informational pages. |
| H5 | **Add a "Related reading" module to hub-page templates** (`/create`, `/brands/[slug]`, `/compare/[slug]`, `/templates/[slug]`, `/alternatives`) querying Sanity by the `hub`/`cluster` fields already in the content model. | M | 0/8 sampled hub pages link to any spoke; retroactively fixes all 30 live posts at once. |
| H6 | **Resume the backlink program** — submit the 8 targets identified (Product Hunt, AlternativeTo, SaaSHub, remaining AI-tool directories, GEO-cited roundup sites, competitor-alternative listicles, micro-directories, freelancer/small-biz roundups). Assets already drafted in `plan/directory-submission-kit.md`. | L | Common Crawl (live, this pass) independently corroborates ~0 backlink footprint; this is confirmed as the ranking ceiling. |
| H7 | **Rewrite titles/metas on the confirmed page-1 zero-CTR pages** (`amount-tendered-meaning`, `zara-receipt-copy`, `picture-of-receipt-return`, `sephora-lost-receipt`, `autozone-lost-receipt`, `customer-copy-receipt-meaning`, `are-receipts-legally-required`, `do-receipts-show-card-number`) using the working siblings (`chipotle-receipt-copy` 1.35% CTR, `pizza-hut-receipt-copy` 2.37% CTR) as before/after models. | M | 8 confirmed page-1 pages at <0.5% CTR, essentially unchanged since 08-14. |

---

## 🟡 Medium — within 1 month

| # | Action | Effort | Evidence |
|---|---|---|---|
| M1 | **Delete the dead `HowTo` JSON-LD block** on the homepage (Google removed HowTo rich results Sept 2023) — inert markup, wasted effort. Do not add it anywhere else. | S | Confirmed still present, correctly *not* copy-pasted to `/brands`/`/templates`. |
| M2 | **Enrich `Organization` schema** — add `contactPoint`, real `foundingDate`, broaden `sameAs` as real accounts go live (LinkedIn, Product Hunt, Crunchbase — never placeholder URLs). | S | Exactly as thin as 08-14 found it; the one fully-actionable item still untouched. |
| M3 | **Scope the 25 receipt-builder font families out of the root layout** into a `/create`-specific layout/module. | M | 201 unused `@font-face` rules parsed on ~1,100 non-`/create` pages; ~6KB compressed but real code-hygiene/parse-cost issue. |
| M4 | **Investigate `/pricing`'s uncached ~650-780ms TTFB** — isolate the auth-dependent CTA into a client island so the page shell can be statically cached like `/` and `/create`. Natural to bundle with the in-progress `PricingCta.tsx` checkout-flow edit. | M | Only tested page served `private, no-cache, no-store`; ~2x slower TTFB than cached pages. |
| M5 | **Deepen `/brands` generated-page prose** — expand `INTRO_VARIANTS`/`USE_CASE_VARIANTS`/`FOOTER_VARIANTS` from 3-4 to 8-10+, splice in one brand-specific fact (city is already captured in `BrandSeed`, currently unused in prose). | L | 234 of 349 brand pages draw from tiny fixed pools — real mad-lib templating. |
| M6 | **Rebuild `/examples`' fixed paragraph templates as a variant pool** (mirror the `/brands` pattern at minimum) — the closing CTA is currently byte-for-byte identical across all 316 pages. | L | Weakest template on the site; worse than the 08-14 "~80% shared" estimate. |
| M7 | **Add real named authorship** — at least one credentialed author/reviewer on `/authors`, and wire `authorName` onto more Sanity blog posts (or drop the individual `Person` byline in favor of `Organization` if names can't be verified). | M | `BlogPosting` names "Sara Artheta" with no corroborating profile; content is YMYL-adjacent (bookkeeping/expense records). |
| M8 | **Flesh out `/create`'s content** — add an FAQ/short explainer paragraph; it competes for the same head terms as home (2,530 words) at 379 words with no FAQ/HowTo schema. | M | Also serves AI-citability (currently ~1.2K characters of extractable text, almost all UI labels). |
| M9 | **Run a DataForSEO SERP-overlap check on the `/create` synonym cluster** (`/create` + 6 blog posts) once DataForSEO's 403 is resolved, and pre-decide a merge plan (`create-a-receipt` + `make-a-receipt` are the likeliest merge candidates). | M | 7 URLs target one intent; not costing rankings yet only because none currently rank. |
| M10 | **Code-split `html-to-image`** in `lib/download.ts` to match the existing `jsPDF` dynamic-import pattern. | S | Most plausible real INP risk on `/create`'s Download click (synchronous `pixelRatio: 3` serialization). |
| M11 | **Collapse the `http → non-www → www` redirect chain** to one hop at the Vercel/DNS domain level. | S | Unchanged from 08-14's L1. |
| M12 | **Check the DataForSEO account behind this session's MCP connection** — every call returned HTTP 403 today (auth/billing, not per-endpoint). Blocks live SERP/keyword/Lighthouse/backlink data for this and future audits until resolved. | S | Confirmed by the orchestrator directly; not fixable from within the audit. |

---

## 🟢 Low — backlog

| # | Action | Effort |
|---|---|---|
| L1 | Delete the unused `CATEGORY_DEFAULT_ITEMS` brand-fallback path (dead code — 0/348 live pages use it) or add a build-time assertion so it can't silently regress. | S |
| L2 | Move `/brands`/`/receipt-help`/`/templates` toward per-item `lastmod` dates instead of bucket-level constants, so hand-edited pages don't silently miss the IndexNow cron. | M |
| L3 | Trim the 24 `/examples/page/N` pagination URLs from the sitemap (2% of slots on low-value listing pages) — optional. | S |
| L4 | Audit `/receipt-help`'s variant-pool sizes with the same code-level method used on `/brands` this pass (not completed — file density inferred, not confirmed). | M |
| L5 | Add one embedded/linked video (e.g., a 60-second "how to make a receipt" demo) — zero video sitewide despite it being the strongest brand-mention correlate. | M |
| L6 | Wire a CrUX/PageSpeed API key so the next audit scores Performance on real field data instead of heuristics. | S |
| L7 | Investigate the `ConsentGate` `BAILOUT_TO_CLIENT_SIDE_RENDERING` inconsistency between home/`/create` and `/pricing` — likely benign (component is invisible either way), unexplained. | S |
| L8 | Full alt-text audit across `/brands` and `/examples` primary content images — not verified this pass or 08-14. | M |
| L9 | Build `/brands/amiri` and `/brands/stockx` before either brand keyword is queued for a blog post (`amiri receipt` vol 720/KD 4, `stockx receipt` vol 880). | M |

---

## Sequencing

1. **This week:** H1/H2 (head-term H1 rewrites on home + `/create`) — cheapest, highest-leverage fix given `/create` is now at zero clicks. H3/H4 (OG metadata) can ship alongside as a small PR. H5 (hub→spoke links) is one template change with sitewide payoff.
2. **In parallel, ongoing:** H6 (backlinks) — the long lever nothing else fully substitutes for; lean into the AI-directory channel that's already converting organically.
3. **This month:** the content-depth block (M5/M6/M7/M8) and the schema/performance cleanup (M1-M4, M10-M12).
4. **Before next audit:** M9 (SERP-overlap check on the `/create` cluster) and M12 (fix DataForSEO access) — both unblock more precise data for the next pass.

**North-star metrics:** `/create` clicks 0 → measurable (any nonzero sustained clicks would confirm the H2 fix worked); avg position 20.04 → <15; CTR 0.69% → >1.2% over the next 28-day window; referring domains 3-13 (stale) → a verified, growing count once H6 lands and DataForSEO access is restored.
