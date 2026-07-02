# Full SEO Audit — makecepeit.com

**Date:** 2026-06-26
**Site:** https://www.makecepeit.com
**Method:** Live HTTP fetches (homepage + sampled pages, robots, sitemap, llms.txt) cross-referenced with source (`app/`, `lib/`).
**Pages in sitemap:** 900

---

## Executive Summary

**Overall SEO Health Score: 87 / 100** — Strong.

**Business type detected:** SaaS / web-app tool (free online receipt maker) with a large **programmatic SEO** footprint (~750+ generated pages across templates, brands, examples, and intent/help pages). Not a local business — no NAP/GBP factors apply.

This is an unusually well-built site for SEO. Fundamentals are essentially all in place: clean canonicalization, correct redirects, rich structured data, unique per-page metadata at scale, a thoughtful `llms.txt`, and non-blocking analytics. The score is held back not by execution gaps but by (1) thin security headers, (2) heavy DOM weight on index pages, and (3) one strategic **risk** that sits outside the SEO score: the 354 brand-name receipt pages.

### Top 5 issues
1. **[Risk — High]** 354 `/brands/<real-brand>` "receipt generator" pages (Starbucks, H&R Block, etc.) carry trademark + Google deceptive-content policy exposure that could trigger a manual action. *Not scored, but the single biggest threat to organic survival.*
2. **[High]** Security response headers are minimal — only HSTS is set. Missing `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and CSP/`frame-ancestors`.
3. **[Medium]** `/examples` index ships ~1 MB of HTML (~14k words, all receipt DOM) — INP/CLS and crawl-budget risk on the heaviest pages.
4. **[Medium]** Index-bloat risk: 900 URLs on a young domain. Brand/example pages are structurally near-identical (same FAQ/HowTo skeleton); without watching indexation this can dilute crawl budget.
5. **[Medium]** Thin E-E-A-T signals — no named author/organization trust markers beyond `Organization` schema; pages are templated.

### Top 5 quick wins
1. Add the four missing security headers (one `next.config` `headers()` block) — closes the largest *technical* gap in an afternoon.
2. Add `ItemList` + `BreadcrumbList` schema to the `/examples` and `/brands` index pages (currently only `Organization` + `WebSite`).
3. Paginate or lazy-load the `/examples` index DOM to cut the 1 MB payload.
4. Add `lastmod` precision per programmatic page where data actually changes (currently a single stable `CONTENT_UPDATED` date — fine, but blog/brand updates could be reflected).
5. Strengthen E-E-A-T: a real "About/Who we are" trust block + author byline on blog posts.

---

## Technical SEO — 88/100

| Check | Result |
|---|---|
| HTTPS | ✅ HTTP/2, valid |
| HSTS | ✅ `max-age=63072000` |
| non-www → www | ✅ 308 |
| http → https | ✅ 308 |
| 404 handling | ✅ returns 404 for unknown paths |
| Private routes | ✅ `/admin` 307→login, disallowed in robots |
| robots.txt | ✅ allows `/` + `/api/logo`, disallows `/admin /account /login /api/`, links sitemap |
| sitemap.xml | ✅ 900 URLs, stable `lastmod` (`2026-06-19`), priority/changefreq set |
| Canonicals | ✅ present & self-referential on every sampled page |
| `<html lang>` | ✅ `en` |
| Meta robots | ✅ `index, follow` |
| Font loading | ✅ `woff2` preloaded, `crossorigin` |
| Render | ✅ prerendered (`x-nextjs-prerender: 1`), Vercel CDN `HIT` |

**Gap — Security headers.** Only HSTS is returned. Missing:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (lock down camera/mic/geolocation)
- `Content-Security-Policy` with `frame-ancestors` (replaces legacy `X-Frame-Options`)

Fix once in `next.config.ts` via an async `headers()` export. Low effort, applies site-wide.

---

## Content Quality — 82/100

- **Unique metadata at scale:** every sampled programmatic page (`/templates/itemized-receipt`, `/brands/starbucks`) has a distinct title, description, and self-canonical. Confirmed in source: `generateMetadata` exists in all six dynamic routes.
- **Depth:** programmatic pages run ~1,200–1,400 visible words — **not thin**. Good for a generated-page model.
- **Structure:** single H1 per page, FAQ + HowTo content baked in.
- **E-E-A-T (weak):** templated pages with no author attribution, credentials, or external trust signals. `Organization` schema is present but light. Blog is the natural home for experience/authority signals.
- **Scaled-similarity risk:** brand and example pages share an identical skeleton (same FAQ/HowTo block, swapped entity). Google tolerates this when each page answers a distinct query, but the 354-brand cluster is the most exposed.

---

## On-Page SEO — 92/100

- **Homepage title:** "Free Receipt Maker — Create & Download Receipts in Seconds" (~58 chars, keyword-led, within limit).
- **Meta description:** compelling, benefit-driven, with a CTA; correct length.
- **OG + Twitter:** complete — `og:title/description/url/site_name/type`, dynamic `opengraph-image` (1200×630 PNG with `:alt`), `twitter:card=summary_large_image`.
- **Headings:** exactly one H1 per page across all samples.
- **Internal linking:** strong hub structure (templates/brands/examples/receipt-help indexes), reinforced by `llms.txt` main-pages list.

No material on-page defects found.

---

## Schema / Structured Data — 90/100

Homepage carries a rich graph: `WebApplication`, `WebSite`, `Organization`, `FAQPage` (8 Q&A), `HowTo` (3 steps), `Offer`. Programmatic pages add `BreadcrumbList` + `FAQPage` + `ListItem`.

**Gaps:**
- `/examples` and `/brands` **index** pages expose only `Organization` + `WebSite` — add `ItemList` (the card grid) + `BreadcrumbList`.
- Consider `aggregateRating`/`Review` only if you have genuine reviews (don't fabricate — that's a rich-result penalty risk).

---

## Performance (CWV) — 75/100 *(lab estimate; no field data)*

- **Homepage:** 142 KB HTML — on the heavy side, partly from inline JSON-LD + full content; acceptable. Fonts preloaded, prerendered, CDN-cached.
- **`/examples` index:** **~1 MB HTML, ~14k words** — receipts render as CSS/DOM (0 `<img>` tags), so this is thousands of DOM nodes. Real INP/CLS/main-thread risk on mid/low-end mobile.
- **Analytics:** GA4 (`gtag`) + Microsoft Clarity both load `strategy="afterInteractive"` — correctly non-blocking. ✅
- **No image payloads:** receipts are vector/DOM, so no oversized-image problem — but also no `next/image` lazy benefit on the heavy index pages.

**Recommendation:** treat `/examples` (and any "all items on one page" index) as the performance hotspot — paginate, virtualize, or lazy-mount cards. Pull CrUX/PSI field data once GSC traffic exists to replace this lab estimate.

---

## Images — 85/100

- **OG/social:** dynamic `opengraph-image` route, correct dimensions + alt + type. ✅
- **Content images:** none (`<img>` count = 0 site-wide on sampled pages) — receipts are DOM-rendered. No alt-text debt, but **no Google Images surface** either. Minor missed opportunity: a real PNG preview per template/brand could win image-search traffic and improve social richness.

---

## AI Search Readiness (GEO) — 92/100

- **`llms.txt`:** present, well-structured — summary, main pages with descriptions, key facts, and an explicit legitimate-use / anti-fraud statement. Among the better examples in the wild.
- **Citability:** clear factual answers, FAQ schema, HowTo steps — highly extractable for AI Overviews / Perplexity / ChatGPT.
- **AI crawler access:** robots allows `/`; no blocking of AI agents.
- **Brand mention signals:** thin (young domain) — off-site authority is the limiter, not on-site structure.

---

## Strategic Risk (outside the score) — Brand pages

354 pages generate "[Brand] Receipt Generator" experiences for real companies. SEO-wise they're well-built, but they concentrate three risks:
1. **Trademark** — using brand names + logos (`/api/logo` proxy) at scale.
2. **Google policy** — "deceptive content / enabling dishonest behavior" is an explicit manual-action category; receipt generators for real brands are squarely in the gray zone despite the `llms.txt` disclaimer.
3. **Single point of failure** — if this cluster draws a sitewide manual action, the *whole* domain suffers, not just `/brands`.

This is a business/legal call, not a tag fix — flagged here so it's a conscious decision. Mitigations: keep the anti-fraud disclaimer on every brand page, consider `noindex` on the most trademark-sensitive brands, and ensure logos are used nominatively.

---

## Score Breakdown

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 88 | 19.4 |
| Content Quality | 23% | 82 | 18.9 |
| On-Page SEO | 20% | 92 | 18.4 |
| Schema | 10% | 90 | 9.0 |
| Performance | 10% | 75 | 7.5 |
| AI Readiness | 10% | 92 | 9.2 |
| Images | 5% | 85 | 4.3 |
| **Total** | | | **≈ 87** |

See `ACTION-PLAN.md` for the prioritized fix list.
