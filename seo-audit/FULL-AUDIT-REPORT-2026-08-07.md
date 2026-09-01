# Full SEO Audit — makecepeit.com

**Date:** 2026-08-07
**Method:** Live crawl of production (`https://www.makecepeit.com`) + direct source-code audit of the Next.js app
**Pages in sitemap:** 1,087
**Business type:** SaaS / free web tool (receipt generator) with a large programmatic-SEO content layer

---

## Executive Summary

### SEO Health Score: **83 / 100** — Strong (up from 60/100 in the 2026-07-03 audit)

The site is technically excellent and on-page execution is genuinely good — unique titles/descriptions/canonicals sitewide, clean heading hierarchy, comprehensive schema, breadcrumbs, strong internal linking, and full GEO/AI-crawler readiness. Two of the three top issues from July are resolved (see below).

The one category that holds the score back — and the one strategic risk that could override everything — is **content**: ~858 of the 1,087 URLs are programmatically generated from variant/template pools, and the site targets brand-name receipt generation ("Walmart receipt", "Target receipt", …) plus the "fake receipt maker" keyword. That combination is exactly what Google's *scaled content abuse* and *site reputation / trademark* enforcement targets.

### What changed since July (60 → 83)
- ✅ **"No sign-up" copy corrected** — now precisely *"no sign-up **to start**"*; brand pages state downloads need a free account ("your first 3 receipts are watermark-free"). The earlier false-claim risk is largely resolved.
- ✅ **Font bloat mitigated** — 30+ Google font families still imported for the receipt builder, but every receipt font is `preload: false`; the homepage loads only **2** woff2 files. No SEO/perf impact on landing pages.
- ⚠️ **Templated-content risk remains** — partially mitigated by variant pools + real per-brand data, but ~858 generated pages is still a live exposure.

### Top 5 issues
1. **[Strategic] Brand-name + logo receipt pages (348) + "fake receipt maker" targeting** — trademark exposure and the single largest manual-action / quality-suppression risk for the whole domain.
2. **[High] Scaled programmatic content (~858 pages) from variant pools** — falls under Google's scaled-content-abuse policy; weakest pages are generated brands that fall back to `CATEGORY_DEFAULT_ITEMS` (identical item tables + totals within a category).
3. **[Medium] Thin generated-brand intros** — hand-written brands (~117) get multi-sentence intros; generated brands get a single templated sentence.
4. **[Low] E-E-A-T depth** — single author ("Sara Artheta"), thin author/experience signals for a YMYL-adjacent (financial-document) niche.
5. **[Low] Redirect chain** — `http://makecepeit.com` → `https://makecepeit.com` → `https://www.makecepeit.com` (2 hops instead of 1).

### Top 5 quick wins
1. Add a visible, honest disclaimer sitewide ("for lawful record-keeping, mockups, and replacing lost receipts") to blunt the fraud-association signal and support E-E-A-T.
2. Audit which generated brands fall back to `CATEGORY_DEFAULT_ITEMS` and give each a unique item set (Aldi already does this well — extend it).
3. Expand generated-brand `INTRO_VARIANTS` from 1 sentence to 2–3 with a brand-specific detail slot.
4. Collapse the http→www redirect to a single hop.
5. Strengthen author/E-E-A-T: real bio, credentials, and "reviewed by" signals on `/about` and guide pages.

---

## Technical SEO — 92/100 (weight 22%)

**Excellent.** Nothing blocking indexing.

| Check | Result |
|---|---|
| HTTPS + HSTS | ✅ `max-age=63072000; includeSubDomains; preload` |
| Security headers | ✅ `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `permissions-policy` locked down, CSP `frame-ancestors 'self'` |
| robots.txt | ✅ Allows all, disallows `/admin` `/account` `/api/` (allows `/api/logo`), declares sitemap |
| Sitemap | ✅ Valid, 1,087 URLs, **revalidates hourly** so scheduled blog posts self-enter; per-section `lastmod`, no bogus `changefreq`/`priority` (deliberately omitted) |
| Canonical host | ✅ non-www 308→ www; enforced consistently |
| Trailing slash | ✅ `/pricing/` 308→ `/pricing` |
| 404 handling | ✅ Real `404` status on missing paths |
| Rendering | ✅ Prerendered/ISR, `x-vercel-cache: HIT`, edge-cached |
| OG image | ✅ `/opengraph-image` 200, PNG, dynamic |
| Favicon/icon | ✅ `/icon.svg` 200 |

**Minor:** `http://makecepeit.com` redirects to `https://makecepeit.com` (non-www) *then* to `https://www.makecepeit.com` — a 2-hop chain. Collapse to one hop.

---

## Content Quality — 62/100 (weight 23%) ← weakest category

This is where the score and the real-world risk concentrate.

**URL inventory (live sitemap):**
| Section | URLs | Depth |
|---|---|---|
| Brands (`/brands/[slug]`) | 348 | 117 hand-written (rich) + ~231 generated (variant pools) |
| Examples (`/examples/[slug]`) | 291 | Real receipt data + ~80% shared boilerplate prose |
| Receipt-help (`/receipt-help/[slug]`) | 219 | Brand × intent combos; per-brand facts where available |
| Blog (`/blog/[slug]`) | 150 | Sanity CMS articles (full-length, genuine) |
| Templates (`/templates/[slug]`) | 42 | Rich, unique (intro + 4 use-cases + 2 FAQs each) |

**Findings:**
- **~858 programmatically generated pages** (brands + examples + receipt-help). The generators use spintax-style variant pools (`TITLE_VARIANTS`, `INTRO_VARIANTS`, `SEO_DESC_VARIANTS`, `USECASE_VARIANTS`, `FAQ_POOL`, `FOOTER_VARIANTS`) selected deterministically by slug hash. This spreads duplication but is fundamentally templated content at scale — the exact target of Google's March-2024 **scaled content abuse** policy.
- **Category-default fallback is the weak spot.** `makeBrand()` uses `s.items ?? BRAND_ITEMS[slug] ?? CATEGORY_DEFAULT_ITEMS[category]`. Brands without their own items render an *identical* sample-item table + subtotal/tax/total as every other brand in that category — a strong near-duplicate signal.
- **But not uniformly thin.** Sampled `/brands/aldi`: ~720 words, genuine Aldi private-label items (Friendly Farms, Clancy's, Simply Nature), real address/total. Where per-brand data exists, pages are legitimately unique. The problem is the tail that falls back to category defaults + single-sentence intros.
- **Examples (291):** each renders a real, unique receipt, but the surrounding prose ("This is a sample X receipt showing…", "Make your own in under a minute") is ~identical across all 291. Unique text = brand name + item table + total.
- **Blog (150) and Templates (42)** are the healthiest content and should be the model.

---

## On-Page SEO — 90/100 (weight 20%)

- ✅ Homepage title 58 chars, description 155 chars — both within SERP limits.
- ✅ Every generated page has a **unique** `seoTitle`, `seoDescription`, and self-referencing `canonical` (verified in `templates/[slug]`, `brands/[slug]`, `examples/[slug]`).
- ✅ `fitSeoDescription()` enforces the ~150–160 char window; example descriptions fall back to a concise variant when the rich one overflows.
- ✅ Heading hierarchy clean: homepage 1×H1 / 6×H2 / 14×H3; generated pages have a single descriptive H1 + logical H2/H3.
- ✅ Breadcrumb nav + `BreadcrumbList` schema on all programmatic pages.
- ✅ Strong internal linking: related templates/brands/examples, intra-entity brand↔receipt-help cross-links.
- ⚠️ Title/description variant pools mean patterns repeat across the generated tail — acceptable, but the same duplication caveat as content applies.

---

## Schema / Structured Data — 95/100 (weight 10%)

Comprehensive and well-formed. Detected on homepage: **Organization, WebSite, WebApplication, Offer, FAQPage (8 Q&A), Person**. Generated pages add **FAQPage + BreadcrumbList**. Notes:
- Organization has `logo`, `email`, `founder` (Person), `sameAs` (X). Good.
- `WebApplication` + `Offer` correctly express the freemium tool.
- Only gap: consider `SoftwareApplication`/`aggregateRating` **only if** you have genuine review data (don't fabricate) and a `HowTo` on template/brand "How to make a…" sections.

---

## Performance (CWV) — 80/100 (weight 10%)

No field data (CrUX/GSC not connected in this run), so this is a lab-informed estimate.
- ✅ Pages are prerendered + edge-cached (`x-vercel-cache: HIT`) → strong LCP/TTFB on landing pages.
- ✅ Font strategy fixed: only 2 woff2 on the homepage; receipt fonts are lazy (`preload: false`).
- ⚠️ Homepage HTML is ~171 KB with ~64 script tags (Next RSC payload + analytics: Vercel Analytics, GA4, Clarity behind consent). Heavy-ish but consent-gated. Watch INP on the interactive `/create` builder specifically.
- **Recommendation:** connect Google Search Console + CrUX to replace this estimate with real field CWV.

---

## Images — 88/100 (weight 5%)

- ✅ All 15 homepage images carry `alt`.
- ✅ Brand logos: `alt="{brand} logo"`; related-brand logos use `loading="lazy"`.
- ✅ Receipts render as live DOM (not heavy `<img>`), and logos are proxied through same-origin `/api/logo` (edge-cached, avoids cross-origin canvas taint on export) — smart.
- ⚠️ The rendered receipt "example" is the primary unique visual but is not an indexable image with descriptive alt — fine for UX, a small missed image-SEO signal on `/examples`.

---

## AI Search Readiness (GEO) — 90/100 (weight 10%)

Strong and ahead of most competitors.
- ✅ `/llms.txt` (200) — site description, main pages, key facts (pricing, accounts, privacy, formats, time-to-create).
- ✅ `/llms-full.txt` (200, ~55 KB) — full content dump for LLM ingestion.
- ✅ AI crawlers unblocked in robots.txt; FAQPage schema + clear factual Q&A feed AI Overviews/ChatGPT/Perplexity.
- ✅ `googleBot` meta: `max-image-preview: large`, `max-snippet: -1`.
- ⚠️ The "fake receipt" positioning may suppress AI citation in some engines that filter the category — another reason to lead with the legitimate-use framing.

---

## Scoring Summary

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 92 | 20.2 |
| Content Quality | 23% | 62 | 14.3 |
| On-Page SEO | 20% | 90 | 18.0 |
| Schema | 10% | 95 | 9.5 |
| Performance (CWV) | 10% | 80 | 8.0 |
| AI Search Readiness | 10% | 90 | 9.0 |
| Images | 5% | 88 | 4.4 |
| **Total** | **100%** | | **≈ 83** |

The ceiling on this score is set almost entirely by the programmatic content layer and the brand/"fake receipt" positioning. Fix those and the site is a 90+.
