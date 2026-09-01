# Full SEO Audit — makecepeit.com

**Date:** 2026-08-23 · **Previous:** 2026-08-21 (84/100)
**Method:** live crawl of a 150-page stratified sample across all 20 sections (1,125 sitemap URLs), Google Search Console 28-day window vs the preceding 28 days, and source-level verification in the repo.

---

## Executive Summary

### SEO Health Score: **83 / 100** *(down from 84 on 08-21)*

| Category | Weight | Score | 08-21 | Δ |
|---|--:|--:|--:|--:|
| Technical SEO | 22% | **93** | 93 | — |
| Content Quality | 23% | **78** | 76 | ▲ +2 |
| On-Page SEO | 20% | **77** | 80 | ▼ −3 |
| Schema / Structured Data | 10% | **88** | 88 | — |
| Performance (CWV) | 10% | **76** | 78 | ▼ −2 |
| AI Search Readiness (GEO) | 10% | **87** | 86 | ▲ +1 |
| Images | 5% | **84** | 92 | ▼ −8 |

**The score fell one point in a period where traffic grew sharply.** That is not a contradiction. Search performance improved on its own momentum — 132 blog posts released in July finally aged into rankings — while three items flagged on 08-19 and 08-21 went untouched, one on-page metric regressed, and two prior measurements turned out to have been taken on samples too small to be true.

### Search performance, 28 days vs prior 28 days

| | Prev | Current | Δ |
|---|--:|--:|--:|
| Clicks | 181 | **242** | **+34%** |
| Impressions | 20,111 | **36,976** | **+84%** |
| Avg position | 23.9 | **20.6** | **−3.3** |
| Pages earning impressions | 633 | **827** | **+31%** |
| CTR | 0.90% | 0.65% | −0.25pp |

CTR fell because impressions nearly doubled while clicks grew a third — and, as Section 3 shows, almost all of the new impressions landed in page classes that structurally cannot convert. Excluding those classes, site CTR reads **0.76%**, not 0.65%.

### Top 5 findings

1. **`/templates` is the only major section moving backwards, and the cause is one missing function argument.** 42 of 43 template pages render zero contextual internal links. Position went 43.6 → 49.6 while every other section improved.
2. **The blog broke out.** 4 → 36 clicks, position 38.8 → 20.8 (an 18-place jump), 2,633 → 10,920 impressions. The `*-alternative` commercial posts convert at 4–12% CTR.
3. **18.3% of all site impressions sit in two page classes that produced 6 clicks in 28 days.** This is measurable now at page-type granularity, which the 08-21 hypothesis was not.
4. **Correction to the 08-21 plan: the "cite the brand's own help page" CTR hypothesis does not hold.** Pages with an official link convert at 0.60%; pages without, 0.63%.
5. **Backlinks remain the binding constraint, for the fourth audit running.** `/create` and the homepage rank at **position 79–90** for "receipt maker", "make a receipt", "create a receipt".

### Top 5 quick wins

| | Action | Effort |
|---|---|---|
| 1 | Pass `categories` to `RelatedPosts` on `/templates/[slug]` — one argument, 43 pages | S |
| 2 | Emit `og:url` on `/blog/*` (177 pages, currently none at all) | S |
| 3 | Give the 6 brand-page logos explicit `width`/`height` — 349 pages of CLS | S |
| 4 | Add `alt` to the 12 homepage logo-strip images | S |
| 5 | Finish `Organization` — `foundingDate` and a real `sameAs` set | S |

---

## 1. Technical SEO — 93/100

**Clean.** 150 of 150 crawled pages returned 200. Zero redirects, zero canonical mismatches, zero missing canonicals.

| Check | Result |
|---|---|
| robots.txt | Valid; `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Claude-SearchBot`, `Claude-User`, `Bingbot`, `CCBot` all explicitly allowed |
| Sitemap | 1,125 URLs, valid XML, all reachable |
| HTTPS / HSTS | `max-age=63072000; includeSubDomains; preload` |
| Security headers | CSP `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` all present |
| Canonicals | 150/150 correct |
| Meta robots | No accidental `noindex` |

**Open issues:**

- **The `http → non-www → www` redirect chain is still 2 hops.** Carried from 08-14, 08-19 and 08-21 unchanged.
  ```
  http://makecepeit.com/  → 308 → https://makecepeit.com/  → 308 → https://www.makecepeit.com/
  ```
- **Sitemap TTFB is 5.1s cold, 1.0s warm** for a 138KB document. Not visitor-facing, but crawler-facing.
- **`/examples/page/3` emits no `BreadcrumbList`** where every other `/examples` URL does — a symptom of the 24 pagination URLs that should not be in the sitemap at all (carried as L3).
- **Sitemap `lastmod` is still bucketed**, with 580 URLs sharing 2026-08-20 and 324 sharing 2026-07-03.

---

## 2. Content Quality — 78/100

### The blog is the story of this period

| | Prev | Current |
|---|--:|--:|
| Clicks | 4 | **36** |
| Impressions | 2,633 | **10,920** |
| Avg position | 38.8 | **20.8** |

177 posts are now live (4 published today). Average depth is 790 words of `<main>` content, reaching 2,358.

**The commercial-intent posts are the ones converting**, and they convert at rates the rest of the site cannot match:

| Post | Impr | Clicks | CTR | Position |
|---|--:|--:|--:|--:|
| `/blog/receiptbaker-alternative` | 24 | 3 | **12.50%** | 11 |
| `/blog/receiptmakerly-alternative` | 33 | 2 | **6.06%** | 7 |
| `/blog/expressexpense-alternative` | 47 | 2 | **4.26%** | 15 |
| `/blog/best-receipt-maker-reddit` | 141 | 4 | **2.84%** | 12 |
| `/blog/uber-lyft-receipts-reddit` | 68 | 2 | 2.94% | 10 |

Three `*-alternative` posts and two `*-reddit` posts. That is a repeatable, proven format — and it is the same commercial-comparison intent that `/alternatives` and `/compare` serve.

**But the blog's aggregate CTR is dragged down by two definitional pages:**

| Post | Impr | Clicks | CTR | Position |
|---|--:|--:|--:|--:|
| `/blog/amount-tendered-meaning` | 1,415 | 2 | **0.14%** | 6 |
| `/blog/picture-of-receipt-return` | 744 | 2 | **0.27%** | 7 |

Together, 2,159 impressions at positions 6–7 for 4 clicks. These are the same zero-click SERP class the 08-21 pass correctly declined to rewrite. At positions 4–10 the blog section as a whole converts at **0.28%** — worse than `/receipt-help` (0.59%) and 17× worse than `/brands` (4.87%).

### `/examples` remains thin — 316 pages, 28% of the sitemap

Average 271 words of `<main>` content (range 210–900). No `RelatedPosts` component is rendered on `/examples/[slug]` at all, so all 316 pages carry zero contextual internal links. Schema is `BreadcrumbList` only, by deliberate decision recorded in the source.

Unchanged from 08-20 and 08-21. Worth noting it is not *failing*: 994 impressions, 11 clicks, **1.11% CTR at position 10.6** — better CTR than `/receipt-help`. It is small, not broken.

### Thinnest pages measured

| Page | Words |
|---|--:|
| `/login` | 23 |
| `/authors` | 142 |
| `/contact` | 153 |
| `/templates/medical-receipt` | 198 |
| `/examples/mobil-receipt-gas` | 210 |

---

## 3. The impression problem, measured at page-type granularity

The 08-21 plan's H1 proposed splitting `/receipt-help` by **whether the brand owns a self-serve receipt lookup**. That hypothesis is not confirmable in the data. What *is* clean is a split by **URL pattern** — i.e. page type:

| Segment | Pages | Impr | Clicks | CTR | Avg pos |
|---|--:|--:|--:|--:|--:|
| **A.** `-return-policy` + other patterns | 66 | 4,241 | 5 | **0.12%** | 10.2 |
| **B.** Zara (all three patterns) | 3 | 2,749 | 1 | **0.04%** | 9.1 |
| **C.** `-receipt-copy` / `-lost-receipt`, ex-Zara | 135 | 12,592 | 89 | **0.71%** | 10.4 |
| **Total `/receipt-help`** | 203 | 18,119 | 95 | 0.52% | 10.2 |

Segments A and B are **18.3% of all site impressions** and produced **6 clicks in 28 days**, at positions where segment C converts 6–18× better. The average positions are within one place of each other, so this is not a ranking difference — it is a difference in what the query wants.

By suffix:

| Pattern | Pages | Impr | Clicks | CTR | Avg pos |
|---|--:|--:|--:|--:|--:|
| `-receipt-copy` | 69 | 7,224 | 49 | 0.68% | 10.1 |
| `-lost-receipt` | 68 | 6,654 | 41 | 0.62% | 10.3 |
| `-return-policy` | 29 | 2,854 | 4 | **0.14%** | 10.3 |
| (other patterns) | 37 | 1,387 | 1 | **0.07%** | 10.0 |

A return-policy query is answered in the SERP by Google and on the retailer's own domain. A "where do I get a copy of my receipt" query is not.

**Zara is a special case worth stating separately.** Three pages, 2,749 impressions, 1 click, all at positions 6–10:

| Query | Impr | Clicks | Position |
|---|--:|--:|--:|
| `zara receipt` | 158 | 0 | 9.4 |
| `zara recover receipt` | 72 | 0 | 6.3 |
| `zara retrieve my receipt` | 64 | 0 | 7.4 |
| `zara receipt finder` | 52 | 0 | 9.8 |
| …16 more `zara *receipt*` variants | | 0 | 6–10 |

Zara alone is **7.2% of every impression the site earns**.

### Correction: the official-link hypothesis does not hold

08-21's H3 argued Domino's trails "every sibling that cites the brand's own help page." Tested directly against the current window:

| Group | Pages | Impr | Clicks | CTR | Avg pos |
|---|--:|--:|--:|--:|--:|
| Has an official `policyUrl` | 54 | 8,496 | 51 | **0.60%** | 9.7 |
| No official link | 146 | 6,874 | 43 | **0.63%** | 11.2 |

*(Zara excluded, since it is in the "has link" group and would otherwise dominate it.)*

Pages that cite the retailer convert **slightly worse**, not better. Adding official links is a legitimate trust and accuracy improvement — it is not a CTR lever, and should not be sold as one.

That said, the coverage gap is larger than 08-21 described. Only **19 of 73 brands** in `lib/intent-pages.ts` have a `policyUrl`. Domino's is not blocked — it was never added. Neither were Walmart, Target, Amazon, Costco, Starbucks, Uber, or DoorDash.

---

## 4. `/templates` — the section that went backwards

Every other major section improved its average position this period. `/templates` did not:

| | Prev | Current |
|---|--:|--:|
| Clicks | 11 | **8** |
| Impressions | 3,009 | 4,053 |
| Avg position | 43.6 | **49.6** |
| CTR | 0.37% | **0.20%** |

**It is not a conversion problem.** Look at the position bands:

| Band | Impr | Clicks | CTR |
|---|--:|--:|--:|
| 4–10 | 103 | 5 | **4.85%** |
| 11–20 | 143 | 0 | 0.00% |
| 21–50 | 1,108 | 0 | 0.00% |
| 51–200 | 1,323 | 1 | 0.08% |

At positions 4–10, `/templates` converts at **4.85%** — statistically indistinguishable from `/brands`' 4.87% in the same band. Templates convert perfectly well when they rank. **60% of their impressions sit past position 21.**

Core terms and where they rank:

| Query | Page | Position |
|---|---|--:|
| `restaurant receipt template` | `/templates/restaurant` | 53.1 |
| `receipt template` | `/templates` | 81.4 |
| `hotel receipt template` | `/templates/hotel` | 53.7 |
| `auto repair receipt template` | `/templates/auto-repair` | 48.1 |
| `free receipt template` | `/templates` | 88.2 |

### The mechanism, verified in source

`/templates` is the **only** major section with zero contextual internal links. Measured across the crawl:

| Section | Internal links/page | Blog links/page | Pages with zero |
|---|--:|--:|--:|
| `/brands` | 45 | **4.0** | 0 / 30 |
| `/receipt-help` | 46 | **4.0** | 0 / 30 |
| `/blog` | 45 | 3.7 | 1 / 30 |
| `/templates` | 40 | **0.0** | **20 / 20** |
| `/examples` | 46 | **0.0** | **20 / 20** |

40 internal links is exactly the header-and-footer boilerplate count — identical to `/login`, `/privacy` and `/terms`.

The cause is a single omitted argument. In [app/templates/[slug]/page.tsx:335](app/templates/[slug]/page.tsx:335):

```tsx
<RelatedPosts hub={`/templates/${template.slug}`} />
```

Compare [app/brands/[slug]/page.tsx:337](app/brands/[slug]/page.tsx:337):

```tsx
<RelatedPosts
  hub={`/brands/${template.slug}`}
  categories={["Basics", "How-To", "Lost Receipts"]}
/>
```

`relatedPostsForHub(hub, categories = [])` in [lib/related-posts.ts](lib/related-posts.ts) has three tiers: the curated `POSTS_BY_HUB` map, brand-slug matching (guarded by `/^\/brands\/([a-z0-9-]+)$/`), and a topical fallback that **only runs when `categories` is non-empty**. With no categories passed, a template hub falls through all three: the curated map holds exactly one template key (`/templates/restaurant`, 1 post), the brand regex cannot match, and Sanity is never even queried.

The 08-20 fix that added 4 blog links to 569 brand and receipt-help pages simply never reached templates. 08-21's M7 described this as a mapping gap on `/templates/rent-receipt`; it is all 42 pages, and the fix is one argument rather than a data-entry exercise.

---

## 5. On-Page SEO — 77/100

| Check | Result |
|---|---|
| Missing titles | **0** / 150 |
| Missing meta descriptions | **0** / 150 |
| Duplicate titles | **0** |
| Duplicate descriptions | **0** |
| Missing / multiple H1 | **0** |
| Canonical mismatches | **0** |

**Titles over 60 characters regressed: 47 of 150 (31%), up from 26% on 08-21.** Worst offenders are the commercial pages, where the truncation costs the value proposition:

| Chars | Page | Title |
|--:|---|---|
| 75 | `/create` | Free Receipt Maker & Generator — Build a Custom Receipt Online \| Makecepeit |
| 74 | `/tools` | Free Receipt Tools — Total Calculator & Split-Payment Checker \| Makecepeit |
| 72 | `/blog/employee-reimbursement-rules` | When Must Employers Reimburse Employee Expenses? (By State) \| Makecepeit |
| 69 | `/brands/bass-pro-shops` | Free Bass Pro Shops Receipt Generator — Make a Bass Pro Shops Receipt |

Most of the overflow is the ` | Makecepeit` suffix appended to titles that are already at length.

**`og:url` is still unfixed, four days after being flagged.** The 08-19 pass fixed `/create` and `/receipt-help`; the rest was never finished:

| Section | Status | Pages affected |
|---|---|--:|
| `/blog/*` | **No `og:url` emitted at all** | 177 |
| `/tools`, `/guides`, `/examples/page/N` | Points at the homepage | ~27 |
| 8 static pages (`/login`, `/about`, `/contact`, `/authors`, `/editorial-policy`, `/privacy`, `/terms`, `/cookies`) | Points at the homepage | 8 |

Low ranking impact. It is cheap, it is inconsistent, and it has now been carried through two audits.

---

## 6. Schema / Structured Data — 88/100

**Zero JSON-LD parse errors across all 150 pages.** Coverage is genuinely strong:

| Section | Types |
|---|---|
| Home | `WebSite`, `Organization`, `WebApplication`, `FAQPage`, `HowTo`, `DefinedTermSet` |
| `/blog/*` | `BlogPosting`, `BreadcrumbList`, `FAQPage` |
| `/brands/*` | `BreadcrumbList`, `FAQPage` |
| `/receipt-help/*` | `BreadcrumbList`, `FAQPage`, `HowTo` |
| `/templates/*` | `BreadcrumbList`, `FAQPage` |
| `/compare/*`, `/pricing` | `SoftwareApplication`, `FAQPage` |
| `/examples/*` | `BreadcrumbList` only |

**`Organization` is still incomplete** — carried unchanged since 08-19:

```json
{
  "@type": "Organization",
  "name": "Makecepeit",
  "url": "https://www.makecepeit.com",
  "logo": "https://www.makecepeit.com/logo-1024.png",
  "email": "hello@makecepeit.com",
  "contactPoint": [{ "@type": "ContactPoint", "email": "hello@makecepeit.com", "contactType": "customer support" }],
  "sameAs": ["https://x.com/makecepeit"]
}
```

No `foundingDate`, and `sameAs` is a single link. With **zero branded queries out of 1,774**, entity signals are exactly what is missing.

---

## 7. Performance — 76/100

No CrUX or PageSpeed key is configured, so there is still no field CWV data. Everything below is server-side and lab-adjacent.

| Section | Avg size | Avg TTFB | Edge cache |
|---|--:|--:|---|
| Home | 386 KB | 0.74s | HIT |
| `/create` | 129 KB | 0.97s | HIT |
| `/compare` | 122 KB | 0.30s | HIT |
| `/brands` | 89 KB | 0.40s | HIT / PRERENDER |
| `/templates` | 84 KB | 0.43s | HIT |
| `/blog` | 68 KB | 0.78s | STALE |
| `/receipt-help` | 66 KB | 0.50s | HIT |

**Resolved for good: the font-bloat premise is dead.** The homepage emits **zero** `@font-face` rules and preloads exactly two `.woff2` files via `next/font`. 08-21 downgraded this correctly; it can be struck from the plan entirely.

**The homepage RSC flight payload is larger than previously measured** — 228KB of the 386KB document (59%), not the 175KB reported on 08-21. JSON-LD is 8KB. The remaining ~150KB is markup.

**New finding: `/api/logo` is an unsized, slow image proxy on 349 brand pages.**

```
/api/logo?url=… → 200, 19,172 bytes, TTFB 1.99s, x-vercel-cache: MISS
cache-control: public, max-age=86400, immutable
```

Six of these per brand page, and none carry `width`/`height`:

```html
<img src="/api/logo?url=https%3A%2F%2Fupload.wikimedia.org…" alt="Steam logo">
```

The `immutable` cache header is right, but each brand page requests a different set of logo URLs, so edge misses are common — and an unsized image that arrives 2 seconds late is a textbook CLS event. Across the crawl, **217 of 393 images had no `width`/`height`**, concentrated at 6 per page on `/brands`.

The third-party LaunchZone footer badge, by contrast, is correctly handled — `width="154" height="54" loading="lazy"` — despite a 1.75s TTFB. Not a problem.

---

## 8. AI Search Readiness (GEO) — 87/100

**Strong, and the best-executed area of the site.**

| Signal | Status |
|---|---|
| `/llms.txt` | ✅ 3,492 bytes |
| `/llms-full.txt` | ✅ 68,011 bytes, 296 lines, 15 sections |
| AI crawler access | ✅ 8 AI user-agents explicitly allowed in robots.txt |
| Named authorship | ✅ `Person` with a resolving author URL |
| Editorial policy | ✅ `/editorial-policy`, cited in `llms-full.txt` |
| `FAQPage` / `HowTo` | ✅ across the three largest sections |
| Entity `sameAs` | ⚠️ one link |

The `llms.txt` content itself is unusually good: it states pricing in full, states the legitimacy position plainly ("Creating receipts to defraud is illegal and against the terms of use"), and documents the sourcing standard including the authorities cited and the monthly re-verification cadence. That is precisely the material an LLM needs to cite the site accurately.

The remaining GEO weakness is not on-page. It is that **no one searches for the brand** — 0 branded queries across 1,774 — so there is no entity for an assistant to attach the citation to.

---

## 9. Images — 84/100

| Metric | Value |
|---|--:|
| Images sampled | 393 |
| Missing `alt` | **12** |
| Missing `width`/`height` | **217** |

**Revision to the 08-21 measurement.** That pass reported "0 missing alt across 125 images" and rescored Images 80 → 92. Against a 393-image sample, 12 images do lack `alt` — all of them the homepage brand-logo strip:

```html
<img src="/api/logo?url=…" width="72" height="28" loading="lazy">   ← no alt, ×12
```

The same logos on `/brands/*` pages *do* carry `alt="Steam logo"` etc., so this is a homepage-only omission. The earlier sample simply did not include the homepage strip. Not a regression in the code — a correction to the measurement.

The `width`/`height` gap is the more consequential one, covered under Performance above.

---

## 10. The constraint nothing on-page can move

Fourth audit running. `/create` and the homepage rank on **page 8–9** for the terms that define the product:

| Query | Page | Impr | Clicks | Position |
|---|---|--:|--:|--:|
| `receipt maker` | `/create` | 87 | 0 | **90.2** |
| `receipt maker` | `/` | 80 | 0 | **88.4** |
| `create a receipt` | `/create` | 41 | 0 | **90.5** |
| `make receipt` | `/create` | 34 | 0 | **79.9** |
| `make a receipt` | `/create` | 28 | 0 | **91.6** |
| `how to create receipt` | `/create` | 22 | 0 | **88.3** |

`/create` earned 1,024 impressions and **0 clicks** this period, and its average position *worsened* from 72.9 to 79.2. `/templates` at position 49.6 on head template terms is the same story one section over.

No amount of title tuning, schema, or internal linking reaches position 90. This is a domain-authority problem and it needs off-site work.

---

## Measurement caveats

1. **150-page sample, not a full 1,125-page crawl.** Stratified across all 20 sections with 20–30 pages sampled from each of the five large ones. Section-level percentages carry sampling error; the source-level findings (the `RelatedPosts` argument, the `policyUrl` map, the `Organization` block) are exact.
2. **No CWV field data.** Performance is scored on TTFB, payload composition, cache behaviour and markup inspection. No LCP, INP or CLS was measured. Wiring a CrUX key remains the cheapest way to close this.
3. **GSC low-volume queries are anonymised**, so per-query click counts under-report the 242 total. Section and page aggregates are reliable; individual query CTRs at 1–2 clicks are not.
4. **DataForSEO was not used.** The owner paused it on 2026-08-21; no SERP-feature, competitor or backlink data appears in this audit.
5. **The 08-21 alt-text measurement is revised**, per Section 9.
