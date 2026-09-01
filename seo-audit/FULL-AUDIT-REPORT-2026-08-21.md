# Full SEO Audit — makecepeit.com — 2026-08-21

**Method:** live checks against `https://www.makecepeit.com` (stratified 50-URL crawl across all 20 sitemap sections, canonical/OG/H1/title/meta extraction, JSON-LD type census, hub→spoke link counts, TTFB×3 per page type, payload composition, alt-text audit, security headers) plus a live Google Search Console pull via the service account. Baseline: `FULL-AUDIT-REPORT-2026-08-20.md` (80/100).

**Run inline, not fan-out.** The `seo-audit` skill ships only `SKILL.md` — the `scripts/` it references (`fetch_page.py`, `google_auth.py`, `drift_history.py`) are not installed, so every pass was run directly with curl/python. **DataForSEO was not retried** — the owner paused it on 2026-08-21 pending their own review, so SERP-feature confirmation remains unavailable by decision, not by failure.

**GSC access note:** no `google-auth` or `cryptography` module is present and nothing was installed (standing rule). The JWT is signed with `openssl` and the HTTP calls go through curl. Script kept at the session scratchpad.

---

## Executive Summary

### SEO Health Score: **84 / 100** *(up from 80 on 08-20)*

| Category | Weight | Score | 08-20 | Δ |
|---|--:|--:|--:|--:|
| Technical SEO | 22% | **93** | 92 | ▲ +1 |
| Content Quality | 23% | **76** | 72 | ▲ +4 |
| On-Page SEO | 20% | **80** | 76 | ▲ +4 |
| Schema / Structured Data | 10% | **88** | 85 | ▲ +3 |
| Performance (CWV) | 10% | **78** | 72 | ▲ +6 |
| AI Search Readiness (GEO) | 10% | **86** | 82 | ▲ +4 |
| Images | 5% | **92** | 80 | ▲ +12 *(first real measurement — no longer carried)* |

Ten commits landed today. **Production is current** — `main` holds the same work as `dev` by squash/cherry-pick (same subjects, different SHAs), verified against the live site rather than the build log.

### Resolved since 08-20 (verified live)

| Item | Was | Now |
|---|---|---|
| **H1** hub→spoke on the two big groups | `/brands/*` and `/receipt-help/*` at **0** blog links | **4 each** — 569 pages, 51% of the site, no longer dead ends |
| **M1** `/pricing` cache | 1.08s TTFB, `no-cache, no-store`, Vercel `MISS` | **0.34s**, `public, max-age=0, must-revalidate`, `STALE` — matches the rest of the site |
| **M3** citations past 4 pages | 4 of 1,120 pages | **36 template pages** carry sourced `CreativeWork` citations (e.g. California Civil Code § 1499 with publisher) |
| **M7** real named authorship | no `Person` | `Person` "Sara Artheta", `jobTitle`, and `/authors/sara-artheta` resolves 200 |
| **L2** alt-text audit | carried unmeasured for 3 audits | **measured: 0 missing alt across 125 images.** Closed |
| — | no Bing verification | Bing site ownership confirmed (`97dbdfe`) |

### Not a regression — the `HowTo` schema is back on purpose

The type census shows `HowTo`/`HowToStep`/`HowToTool` on the homepage, which 08-20 recorded as removed. This is **not** a reversal. `76f0a66` re-added a different, grounded `HowTo`: it is built from the step list actually rendered on the page, and a page with no steps emits none. The code comment states plainly that Google retired the HowTo rich result and that the markup is there for model parsing. That is a deliberate GEO play on correct markup, not the dead markup that was removed.

---

## Finding 1 — The receipt-help cluster ranks for intent it structurally cannot satisfy

This is the most consequential finding in this pass, and it reframes the whole content strategy.

Two page groups sit at **the same SERP positions** and convert completely differently:

| Section | Position band | Clicks | Impressions | CTR |
|---|---|--:|--:|--:|
| `/brands/*` | 5-10 | 49 | 902 | **5.43%** |
| `/receipt-help/*` | 5-10 | 76 | 12,124 | **0.63%** |

Position is held constant, so this is not a ranking problem. A CTR of ~5% at positions 5-10 is *normal*; `/brands` performs as expected. `/receipt-help` underperforms the standard curve by roughly 8x on **12,124 impressions** — the largest click pool on the site.

The query data says why. The Zara cluster, the biggest visible block of receipt-help impressions:

```
zara receipt              158 impr  pos 9.4   0 clicks
zara recover receipt       72 impr  pos 6.3   0 clicks
zara retrieve my receipt   64 impr  pos 7.4   0 clicks
zara recover my receipt    61 impr  pos 8.2   0 clicks
zara receipt finder        52 impr  pos 9.8   0 clicks
...80 Zara queries, 925 impressions at position <10 — zero clicks
```

Page level, which is **not** anonymised and therefore load-bearing:

```
/receipt-help/zara-return-policy   1,463 impr   0 clicks   pos  9.7
/receipt-help/zara-receipt-copy    1,019 impr   1 click    pos  8.1
/receipt-help/zara-lost-receipt      227 impr   0 clicks   pos  9.4
/brands/zara                           7 impr   0 clicks   pos 12.0
                                   ─────────────────────────────────
                                   2,716 impr   1 click    0.04% CTR
```

**2,716 impressions — 7.7% of all site impressions — producing one click.**

Someone searching "zara recover receipt" wants *their own Zara receipt from Zara*. We are a receipt maker; we cannot give them that. Sitting at position 8-10 underneath Zara's own help page, we get skipped every time. The click is not available at any title.

`/brands/*` converts 6.4x better sitewide (3.53% vs 0.55%) because it ranks for **tool intent** — "amazon receipt generator", "receipt template" — which is exactly what the product is.

The distinguishing pattern within receipt-help supports this. The pages that *do* earn clicks are ones where the brand has no strong self-serve receipt lookup: `chipotle-receipt-copy` (10 clicks, 1.22%), `panda-express-receipt-copy` (8 clicks, 2.52%), `whole-foods-lost-receipt` (4 clicks, 4.82%). The ones at zero are the ones where the retailer owns a clear returns/receipt portal.

**Implication:** receipt-help should be segmented by whether the brand has a self-serve receipt lookup, not treated as one block. Where the brand owns the answer, the page is an impression/citation asset and must stop being measured on CTR. Where it does not, the page is a real click target.

## Finding 2 — `/templates` is a position problem, not a copy problem

`/templates` has the worst CTR of any content section (0.21%), which looks like a metadata defect. It is not:

| Position band | Clicks | Impressions | CTR |
|---|--:|--:|--:|
| 5-10 | 5 | 96 | 5.21% |
| 10-20 | 2 | 165 | 1.21% |
| 20-50 | 0 | 1,500 | 0.00% |
| 50+ | 1 | 2,026 | 0.05% |

**93% of template impressions sit at position 20 or worse.** Where templates reach page one they convert at 5.21% — in line with `/brands`. The section is fine; it simply is not ranking. This is the same class of problem as `/create` (position 78) and home (position 77): authority, not copy.

## Finding 3 — Zero branded demand, confirmed with a number

Across **1,711 visible queries in 28 days, exactly 0 contain "makecepeit", "make cepeit" or "cepeit".** Nobody is searching for the brand. This corroborates `92f4977`'s baseline and is the single cleanest statement of the authority gap: the site earns impressions on generic and brand-adjacent terms and has built no name of its own.

## Finding 4 — Yesterday's decision not to rewrite the 8 zero-CTR metas is validated

The eight pages 08-20 declined to rewrite, re-measured today:

| Page | 08-20 (c/i/pos) | Today (c/i/pos) |
|---|---|---|
| `amount-tendered-meaning` | 2 / 1,374 / 5.7 | 2 / 1,393 / 5.7 |
| `zara-receipt-copy` | 1 / 993 / 8.1 | 1 / 1,019 / 8.1 |
| `picture-of-receipt-return` | 2 / 744 / 6.7 | 2 / 744 / 6.7 |
| `sephora-lost-receipt` | 1 / 585 / 8.7 | 1 / 643 / 8.7 |
| `autozone-lost-receipt` | 2 / 454 / 8.8 | 2 / 479 / 8.7 |
| `are-receipts-legally-required` | 1 / 407 / 8.2 | 2 / 433 / 8.1 |
| `customer-copy-receipt-meaning` | 1 / 380 / 9.9 | 1 / 388 / 9.8 |
| `do-receipts-show-card-number` | 0 / 263 / 10.0 | 0 / 289 / 9.9 |
| **Total** | **10 / 5,200 (0.19%)** | **11 / 5,388 (0.20%)** |

Impressions accrue, positions hold, clicks do not move. Exactly the signature of a SERP that answers the query itself.

## Finding 5 — Site totals are growing, slowly, from the right places

```
28d to 08-20:  238 clicks  35,165 impressions  0.68% CTR  pos 20.31
28d to 08-19:  226 clicks  33,623 impressions  0.67% CTR  pos 20.16
```

Section rollup (815 pages earning impressions):

| Section | Clicks | Impressions | CTR | Pages |
|---|--:|--:|--:|--:|
| receipt-help | 95 | 17,359 | 0.55% | 202 |
| brands | 87 | 2,467 | **3.53%** | 240 |
| blog | 34 | 10,347 | 0.33% | 126 |
| examples | 11 | 966 | 1.14% | 198 |
| templates | 8 | 3,787 | 0.21% | 37 |
| (home) | 1 | 409 | 0.24% | 1 |
| create | 0 | 950 | 0.00% | 1 |

`/create` moved 324 → 375 impressions week over week but stayed at position 78 with zero clicks. Home sits at position 77. Two audits of on-page work have not moved either, as predicted.

## Finding 6 — On-page defects found this pass

The 50-URL stratified crawl was clean on the fundamentals: **0 non-200, exactly one `<h1>` on every page, canonical present and self-referential on all 50.** Two real defects:

**`og:url` coverage is incomplete.** The 08-19 fix covered the commercial sections but not the rest:

| State | Sections |
|---|---|
| Correct | home, `/create`, `/templates`, `/receipt-help`, `/brands`, `/alternatives`, `/pricing`, `/compare` |
| **`og:url` absent** | `/blog/*` — **173 pages** |
| **`og:url` points at homepage** | `/tools/*`, `/guides`, `/examples/page/N`, and 8 static pages (about, contact, authors, login, privacy, terms, cookies, editorial-policy) |

Severity is genuinely low — `og:url` affects share attribution, not ranking — but the homepage-pointing variant is the same bug class 08-19 fixed and it was left half-done.

**Titles run long.** 13 of 50 (26%) exceed 60 rendered characters, worst at 76 (`/brands/family-dollar`). Mostly caused by the `| Makecepeit` suffix on already-full titles. 4 of 50 descriptions exceed 160 characters.

*(Correction to my own first measurement: the raw-HTML count said 40/50 over-length. That counted `&amp;` as five characters. Decoded, it is 13/50.)*

## Finding 7 — Correction: the "26 font families" issue has been overstated for three audits

Prior plans carried "scope the 26 font families out of the root layout" as a Medium payload item. `app/fonts.ts` does declare 26 families and `app/layout.tsx` does apply all of them to `<html>`. But what actually ships:

```
main CSS bundle   62,278 bytes — @font-face rules: 1
second bundle     79,355 bytes — @font-face rules: 0
homepage preloads 2 woff2 files
```

`next/font` only emits `@font-face` and preloads for faces actually rendered. **One font-face ships, not 26.** The variables are inert CSS custom properties. This item should be downgraded, not repeated.

The real homepage payload story is different:

```
total HTML                395,357 bytes
  <script> total          248,574  (63%)
    of which RSC flight   175,184  (44%)
    of which JSON-LD        8,444  (2%)
  inline <svg>             21,043  (5%)
  <style> / data: URIs           0
CSS (2 files)             141,633
```

The 396KB homepage is **44% serialised React Server Component payload**. That is the thing to investigate, not fonts.

## Finding 8 — Technical and image health are strong

**Security headers — complete:**
```
strict-transport-security: max-age=63072000; includeSubDomains; preload
content-security-policy: frame-ancestors 'self'
x-content-type-options: nosniff
referrer-policy: strict-origin-when-cross-origin
permissions-policy: camera=(), microphone=(), geolocation=()
```

**TTFB (3 samples per page type)** — 0.28s to 0.60s across every section. The `/pricing` outlier is gone.

**Images — 125 images across 50 pages, 0 missing alt.** 12 empty `alt=""` on the homepage, which is correct for decorative graphics. This closes an item carried unmeasured since 08-14.

**robots.txt** names OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, Bingbot and CCBot explicitly, all `Allow: /`.

**`llms.txt` derives its facts and they check out** — it claims 42 templates and 348 brand layouts; the sitemap holds 43 and 349 URLs respectively, each including its index page. Consistent.

Still open technically: the redirect chain is **2 hops** (`http://makecepeit.com` → `https://makecepeit.com` → `https://www.makecepeit.com`), carried from 08-14.

---

## Data limitations

State these plainly, because two findings rest on them:

1. **75% of impressions and 96% of clicks are query-anonymised.** GSC disclosed 1,711 query rows totalling 8,679 impressions and 9 clicks, against a property total of 35,165 and 238. Query-level conclusions therefore describe a minority of traffic. **Finding 1 is safe from this** because its load-bearing evidence (the Zara page block: 2,716 impressions, 1 click) is page-level, which is not anonymised.
2. **No SERP-feature data.** DataForSEO is paused by the owner, so whether AI Overviews sit on the Zara and definitional SERPs is inferred from position/CTR/query shape, not observed.
3. **No CWV field data.** No CrUX or PageSpeed key is wired, so Performance is scored on TTFB, payload composition and cache behaviour — server-side signals only. No LCP/INP/CLS measurement exists in this audit.
4. **`/examples` depth** measured at ~233 words of `<main>` content across a 3-page sample of 316.
