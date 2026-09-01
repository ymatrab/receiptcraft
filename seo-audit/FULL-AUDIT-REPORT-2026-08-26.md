# Full SEO Audit — makecepeit.com

**Date:** 2026-08-26 · **Score: 81/100** (down from 83 on 08-23)
**Crawl:** 225 pages, stratified across all 20 sitemap sections (1,129 URLs total), all HTTP 200
**Search data:** Google Search Console, `sc-domain:makecepeit.com`, 2026-07-27 → 2026-08-23 vs 2026-06-29 → 2026-07-26 (final data)
**Also used:** Bing Webmaster Tools API (key supplied 2026-08-26 — see §11)
**Not used:** DataForSEO (on hold at owner's request since 08-21) · Semrush (API balance exhausted) · PageSpeed/CrUX field data (see §6)

| Category | Weight | Score | 08-23 | Δ |
|---|--:|--:|--:|--:|
| Technical SEO | 22% | **93** | 93 | — |
| Content Quality | 23% | **74** | 78 | ▼ −4 |
| On-Page SEO | 20% | **72** | 77 | ▼ −5 |
| Schema / Structured Data | 10% | **88** | 88 | — |
| Performance (CWV) | 10% | **74** | 76 | ▼ −2 |
| AI Search Readiness (GEO) | 10% | **85** | 87 | ▼ −2 |
| Images | 5% | **86** | 84 | ▲ +2 |

**Nothing shipped since the last audit.** `git log --since=2026-08-22` is empty on both branches. The score moved down because two on-page items regressed while the plan sat untouched; one image item (missing `alt`) was resolved in an earlier pass and is now confirmed closed.

---

## 1. Executive summary

**Business type:** SaaS / freemium web tool (receipt generator) with a large programmatic content estate — 349 brand pages, 316 examples, 220 help pages, 181 blog posts, 43 templates.

### Search performance, 28 days vs prior 28 days

| | Prev | Current | Δ |
|---|--:|--:|--:|
| Clicks | 198 | **255** | **+29%** |
| Impressions | 22,508 | **38,950** | **+73%** |
| Avg position | 23.4 | **20.4** | **−3.0** |
| Pages earning impressions | 675 | **823** | **+22%** |
| CTR | 0.88% | 0.65% | −0.23pp |

Growth continues to come from the July blog batch aging into rankings — `/blog` impressions are up **274%** and its average position improved **17.5 places**. That is momentum from work already done, not from anything shipped this period.

### Top 5 findings

1. **Google ranks the wrong Zara page, and it costs the site its single largest click opportunity.** `/receipt-help/zara-return-policy` is the URL Google serves for **87 distinct Zara queries** — "zara recover my receipt", "zara retrieve my receipt", "zara receipt finder", "zara receipt lookup" — at **positions 6–10**, and it has earned **0 clicks in 28 days** from ~1,041 disclosed impressions (1,521 total). Its title reads *"Zara Returns: Do You Need a Receipt?"* Almost nobody is asking about returns. The correctly-targeted sibling, `/receipt-help/zara-lost-receipt` ("How to Find a Lost Zara Receipt"), appears for **none** of those queries. This is not a zero-click SERP — it is a title answering a question nobody asked, on 7% of all site impressions. **New this pass, and it supersedes 08-23's H2.**

2. **`/templates` is still the only section losing ground, and it got worse.** Average position **43.8 → 50.5** (+6.7 worse), CTR 0.37% → **0.22%**, 9 clicks from 4,184 impressions. **93% of its impressions sit past position 21.** The mechanism identified on 08-23 is unchanged and confirmed live: [app/templates/[slug]/page.tsx:335](app/templates/[slug]/page.tsx:335) calls `<RelatedPosts hub={...} />` with no `categories` argument, so `relatedPostsForHub` falls through all three tiers. `/templates/auto-repair` serves **43 unique internal links — the header/footer boilerplate count — and exactly one link to `/blog`, the nav item.**

3. **The site's impression mass is parked in the one position band that cannot convert.** 17,544 impressions (45% of the site) sit at positions 8–11, where measured CTR is **0.58%**. The band above it (5–8) converts at **1.23%**; positions 3–5 at **5.88%**; positions 1–3 at **18.5%**. No metadata rewrite changes a position-10 page's economics. This is the single clearest statement of what the site's problem is.

4. **The citation mechanism reaches 30 pages out of 1,129.** `Sources & references` blocks render on 28 of 30 sampled `/templates` pages and both `/guides` — citing irs.gov, law.cornell.edu, emvco.com. They appear on **0 of 181 blog posts, 0 of 349 brand pages, and 0 of 316 examples**. `/blog/are-receipts-legally-required` makes claims about US law with zero external sources, and `/blog` is now 30% of site impressions. This is simultaneously the E-E-A-T gap and the AI-citability gap.

5. **Zero branded queries out of 1,755.** Fifth audit in a row. No one searches for "makecepeit". `Organization.sameAs` in [app/layout.tsx:83](app/layout.tsx:83) is still a single X link, and there is still no `foundingDate`. Combined with `/create` sitting at position **79–91** for every head term it targets, the site has no entity footprint and no authority — which is the same finding as the backlink item that has now carried four audits.

### Top 5 quick wins (all under an hour each)

| Win | Where | Impact |
|---|---|---|
| Retitle `/receipt-help/zara-return-policy` to lead with receipt retrieval | `lib/intent-pages.ts` | 1,521 impressions at position ~8 currently earning 0 clicks |
| Pass `categories` to `RelatedPosts` on `/templates/[slug]` | [app/templates/[slug]/page.tsx:335](app/templates/[slug]/page.tsx:335) | Unblocks 42 pages stuck at boilerplate link depth |
| Add `og:url` to `/blog/*` | blog metadata builder | 44 of 45 sampled blog pages emit none |
| `width`/`height` on brand logos | brand page components | 373 of 624 sampled images unsized; `/api/logo` cold TTFB 2.06s |
| `sameAs` + `foundingDate` on `Organization` | [app/layout.tsx:71](app/layout.tsx:71) | The only on-page lever against 0 branded queries |

---

## 2. Technical SEO — 93/100

**Healthy.** No crawlability or indexability defects found across 225 pages.

| Check | Result |
|---|---|
| robots.txt | Valid. Explicit `Allow: /` blocks for OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, Bingbot, CCBot. `Disallow: /admin`, `/account`, `/api/` with `/api/logo` carved out. |
| Sitemap | 1,129 URLs, valid XML, all with `lastmod`. TTFB **0.53s** (was 5.1s cold on 08-23 — improved). |
| Canonicals | **225/225 correct and self-referencing.** Zero mismatches. |
| `noindex` | None found anywhere. |
| `lang` | `en` on 225/225. No hreflang (correct — single-locale site). |
| 404 handling | Correct 404 status on unknown paths and unknown brand slugs. |
| Internal redirects | **Zero** redirect hops on any crawled internal URL. |
| Security headers | HSTS (`max-age=63072000; includeSubDomains; preload`), CSP `frame-ancestors 'self'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` locking camera/mic/geolocation. |
| Credential hygiene | `client_secret_*.json`, `*-credentials.json` and `/local/` are all correctly gitignored and untracked. No leak. |

**Open defects (all carried, all minor):**

- **`http://makecepeit.com` still takes 2 hops** to reach `https://www.makecepeit.com` (→ `https://makecepeit.com` → `https://www.makecepeit.com`). Carried from 08-14, 08-19, 08-21, 08-23.
- **24 `/examples/page/N` pagination URLs in the sitemap.** Paginated list views are not landing pages.
- **580 URLs share `lastmod: 2026-08-20`** — bucket constants in [app/sitemap.ts](app/sitemap.ts) rather than per-item dates. Works, but IndexNow can only ever see a whole section change at once.

---

## 3. Content Quality — 74/100

### Duplication risk is closed

The templated-content risk flagged in the July audit no longer holds. Measured by 8-gram Jaccard similarity on `<main>` text:

| Section | Pages | Median similarity | Max | Unique 8-grams per page |
|---|--:|--:|--:|--:|
| `/blog` | 45 | 0.007 | 0.008 | 100% |
| `/receipt-help` | 45 | 0.014 | 0.369 | 98% |
| `/examples` | 40 | 0.071 | 0.253 | 100% |
| `/templates` | 30 | 0.073 | 0.428 | 99% |
| `/brands` | 45 | 0.156 | 0.290 | 78% |

Not a single pair above 0.5 in 200 sampled comparisons. `/brands` carries the most shared phrasing (89 8-grams common to all 45 sampled pages) but still writes 78% unique content per page. **Strike templated-content from the risk register.**

### The citation gap

| Section | Pages | Pages citing an external source | Sources cited |
|---|--:|--:|---|
| `/templates` | 30 | **28** | law.cornell.edu (30), irs.gov (30), state legislatures |
| `/guides` | 2 | **2** | irs.gov (14), law.cornell.edu (5), emvco.com (4), eur-lex.europa.eu |
| `/receipt-help` | 45 | 9 | brand help pages (mcdonalds.com, pandaexpress.com, timhortons.com…) |
| `/blog` | 45 | **0** | — |
| `/brands` | 45 | **0** | — |
| `/examples` | 40 | **0** | — |

`llms.txt` tells AI crawlers: *"where a published rule governs a receipt field, our guides link the issuing authority (IRS, EMVCo, PCI Security Standards Council, EU VAT directive, HMRC)… every link is re-checked monthly and shown with its verification date."* That is true of `/guides` and `/templates` and of nothing else. The claim is narrowly worded enough to be accurate, but the mechanism it describes is built, typed, and sitting idle across 846 pages.

### E-E-A-T signals

Blog posts carry author attribution, `datePublished` and `dateModified`, `Person` schema, and an `/authors` page and `/editorial-policy` exist. The missing leg is external corroboration — see above.

### Thin content

`/examples` is **232 median words of `<main>` text across 316 pages** — 28% of the sitemap. It converts respectably (1.21% CTR at position 11.2), so it is under-built rather than broken, but it is the site's largest block of thin pages.

### `/tools` is functionally abandoned

3 pages, **28 impressions, 0 clicks, average position 69.8**, and **1 contextual internal link across the entire 225-page crawl**.

---

## 4. On-Page SEO — 72/100

### Where the impressions actually sit

| Position band | Pages | Impressions | Clicks | CTR |
|---|--:|--:|--:|--:|
| 1 – 3 | 42 | 81 | 15 | **18.52%** |
| 3 – 5 | 60 | 153 | 9 | **5.88%** |
| 5 – 8 | 199 | 6,601 | 81 | **1.23%** |
| **8 – 11** | **234** | **17,544** | **101** | **0.58%** |
| 11 – 20 | 137 | 4,644 | 30 | 0.65% |
| 20 – 40 | 86 | 3,621 | 13 | 0.36% |
| 40 – 70 | 48 | 4,308 | 6 | 0.14% |
| 70 – 200 | 16 | 3,180 | 1 | 0.03% |

45% of all impressions are in the 8–11 band. Moving that mass into 5–8 roughly doubles its clicks; into 3–5, multiplies them tenfold. Nothing about titles or descriptions changes that arithmetic.

### Section performance

| Section | Clicks | Δ | Impressions | Δ | CTR | Position | Δpos |
|---|--:|--:|--:|--:|--:|--:|--:|
| `/receipt-help` | 103 | −1 | 19,129 | +48% | 0.54% | 10.0 | −2.1 |
| `/blog` | 41 | **+37** | 11,715 | **+274%** | 0.35% | 20.2 | **−17.5** |
| `/templates` | 9 | −2 | 4,184 | +28% | 0.22% | **50.5** | **+6.7** |
| `/brands` | **89** | **+21** | 2,536 | +8% | **3.51%** | 22.0 | −2.7 |
| `/create` | **0** | — | 1,106 | +353% | 0.00% | **79.0** | +3.6 |
| `/examples` | 12 | +1 | 993 | +79% | 1.21% | 11.2 | +1.9 |
| `/` (home) | 1 | — | 444 | −39% | 0.23% | 75.5 | +1.3 |

`/brands` remains the only section that converts like a normal website — **3.51% CTR, 6× the site average, on 6.5% of impressions.** `/templates` is the only section moving backwards.

### The Zara case in full

`/receipt-help/zara-return-policy` is the URL Google returns for every Zara query the site ranks for. A sample of the 87 pairs:

| Query | Position | Impressions | Clicks |
|---|--:|--:|--:|
| `zara receipt` | 9.3 | 169 | 0 |
| `zara recover my receipt` | 7.5 | 75 | 0 |
| `zara recover receipt` | 6.2 | 73 | 0 |
| `zara retrieve my receipt` | 7.4 | 64 | 0 |
| `zara receipt finder` | 9.7 | 53 | 0 |
| `retrieve my receipt zara` | 7.2 | 48 | 0 |
| `zara receipt recovery` | 6.1 | 43 | 0 |
| `zara find receipt` | 9.4 | 41 | 0 |
| `zara lost receipt` | 8.8 | 17 | **0** |

The last row is the tell: even the query `zara lost receipt` is answered by the return-policy URL, not by `/receipt-help/zara-lost-receipt`. Only **6 of 87** Zara queries are actually about returns, and those rank at positions 32–56. The page is winning rankings for an intent its title does not serve.

### Cannibalisation

24 queries with ≥30 impressions are split across multiple URLs. The worst is the site's primary commercial term:

| `receipt maker` (188 impressions, 0 clicks) | Position |
|---|--:|
| `/create` | 90.3 |
| `/` | 88.8 |
| `/blog/best-free-receipt-generator` | 75.6 |
| `/brands/stop-shop` | 96.5 |
| `/templates/sales-receipt` | 88.5 |

Five URLs, none within reach. `/brands/stop-shop` also appears for `make receipt` and `create a receipt` — a targeting artifact worth checking.

### Metadata

| Check | Result |
|---|---|
| Titles > 60 chars | **73 of 225 (32%)** — held flat vs 08-23's 31%. Worst: `/brands/the-coffee-bean` at **93 chars**, `/brands/moe-s-southwest-grill` at 91, `/create` at 75, `/tools` at 74. |
| Meta descriptions | **225/225 present.** Median 155 chars, only 4 over 160, none under 70. Healthy. |
| H1 | **225/225 present, exactly one per page.** |
| `og:url` missing | **44 of 45 `/blog` pages.** Carried unchanged through three audits. |
| `og:url` pointing at the homepage | 16 pages: `/about`, `/authors`, `/blog`, `/contact`, `/cookies`, `/editorial-policy`, `/guides/receipt-anatomy`, `/login`, `/privacy`, `/terms`, `/tools`, `/tools/receipt-calculator`, `/examples/page/{4,7,22}`. |
| Twitter card | Present sitewide. |

### Internal linking

`/create` receives contextual `<main>` links from **214 of 225** crawled pages — internal linking to the money page is saturated. Its position-79 problem is authority, not architecture.

The gaps are elsewhere:

| Target | Contextual inbound links (of 225 pages) |
|---|--:|
| `/create` | 214 |
| `/receipt-help` | 49 |
| `/brands` | 46 |
| `/blog` | 46 |
| `/examples` | 41 |
| `/templates` | 34 |
| `/pricing` | 5 |
| `/alternatives` | 4 |
| `/tools` | **1** |

And at page level, `/templates` deep pages receive a **median of 1** contextual inbound link, matching `/brands` — but `/brands` pages *emit* related-post links while `/templates` pages emit none.

---

## 5. Schema / Structured Data — 88/100

Broad, valid, and consistently applied. Every one of the 225 crawled pages carries structured data; **zero parse errors.**

| Type | Coverage |
|---|---|
| `Organization` + `WebSite` + `ContactPoint` | 225/225 (root layout) |
| `BreadcrumbList` | All sections except the flat legal/utility pages; **3 of 40 `/examples` pages missing** |
| `FAQPage` + `Question`/`Answer` | `/blog` 44/45, `/brands` 45/45, `/receipt-help` 45/45, `/templates` 30/30, `/create`, `/pricing`, `/compare`, home |
| `HowTo` + `HowToStep` | `/receipt-help` 45/45, home |
| `BlogPosting` + `Person` + `ImageObject` | `/blog` 44/45 |
| `SoftwareApplication` / `WebApplication` + `Offer` | `/create`, `/pricing`, `/compare`, `/tools`, home |
| `CreativeWork` | `/templates` 28/30 |
| `DefinedTermSet` | home, `/guides/receipt-anatomy` |

**Gaps:**
- `Organization.sameAs` contains **one URL** (X). No `foundingDate`, no LinkedIn, GitHub, Crunchbase, Product Hunt, or any other corroborating profile. Carried since 08-19.
- 3 `/examples` pages missing `BreadcrumbList` (2 are `/examples/page/N` pagination).
- 2 `/templates` pages missing `CreativeWork`.

---

## 6. Performance (CWV) — 74/100

**Field data is unavailable for the third consecutive audit.** The keyless PageSpeed Insights API returned HTTP 429 (shared anonymous daily quota exhausted) on all six requests, and no PSI/CrUX API key is configured in the repo. **This score is lab- and server-side proxies only and should be treated as provisional.** Wiring a free API key is a 10-minute task that has now blocked three audits.

### What was measurable

| Page | HTML | RSC flight payload | Median TTFB |
|---|--:|--:|--:|
| `/` (home) | **387 KB** | **228 KB (59%)** | 0.83s |
| `/create` | 130 KB | 34 KB | 0.48s |
| `/pricing` | 106 KB | 63 KB | 0.26s |
| `/brands/*` | 90 KB | 53 KB | 0.49s |
| `/templates/*` | 85 KB | 51 KB | 0.43s |
| `/examples/*` | 74 KB | 44 KB | 0.36s |
| `/receipt-help/*` | 66 KB | 38 KB | 0.43s |
| `/blog/*` | 66 KB | 38 KB | 0.47s |

**TTFB is genuinely good** — 0.26–0.55s median across every section, served from Vercel edge cache.

**Homepage payload is not.** 387 KB of HTML, of which 239 KB is inline script (the RSC flight), plus:

| Asset | Uncompressed |
|---|--:|
| 12 JS chunks | **752 KB** |
| 2 CSS files (60.8 KB + 77.5 KB) | **138 KB** |
| **Total JS + CSS** | **890 KB** |

Two things stand out. The **110 KB polyfills chunk** is legacy-browser ballast Next.js emits by default. And **two separate stylesheets totalling 138 KB** is unusual for a Tailwind build — worth checking whether both are actually needed on the homepage.

**Zero `@font-face` rules** are emitted anywhere; two `.woff2` files are preloaded via `next/font`. The font item is confirmed closed.

**The one clear CWV risk:** `/api/logo` returns in **2.06s on a cache miss** (0.33s warm), and every image it serves is rendered without `width`/`height`. See §8.

---

## 7. AI Search Readiness (GEO) — 85/100

### Strong

- **All 8 major AI crawlers return HTTP 200** on a live content page: GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Claude-SearchBot, Google-Extended, bingbot, Applebot-Extended.
- **`llms.txt` (3.5 KB) and `llms-full.txt` both exist and are genuinely well-written** — an accurate product summary, an explicit statement of the free/Pro boundary, a named list of main pages, key facts on price, privacy, output format, and sourcing, and an unprompted statement that fraudulent use is illegal and against the terms. This is above the standard of most sites that publish one at all.
- Answer-shaped structure is everywhere: `FAQPage` on 165+ of 225 crawled pages, `HowTo` on all 45 sampled `/receipt-help` pages, question-phrased H2s.
- `/editorial-policy` and `/authors` exist and are indexable.

### Weak

- **Zero branded queries in 1,755.** Nothing recognises "Makecepeit" as an entity. This is the ceiling on every AI-citation ambition the site has.
- **`sameAs` is one link.** Entity resolution needs corroborating profiles, and there is nothing to corroborate against.
- **846 pages cite nothing.** AI engines preferentially cite pages that themselves cite authorities. The blog — now 30% of impressions and the fastest-growing section — has zero external references.
- **No video anywhere on the site.** Carried.

---

## 8. Images — 86/100

| Metric | Value |
|---|--:|
| Images sampled | 624 across 225 pages |
| Missing `alt` attribute | **0** ✅ (was 12 on 08-23 — **resolved**) |
| Empty `alt=""` | 12 — all homepage brand logos, marked decorative. Acceptable. |
| Missing `width`/`height` | **373 (60%)** |

**The remaining issue is dimensions, and it is concentrated where it hurts.** Every brand page renders six `<img>` from `/api/logo` with no `width` or `height`:

```html
<img src="/api/logo?domain=chipotle.com" alt="Chipotle logo" class="h-full w-auto max-w-[200px] object-contain"/>
```

An unsized image whose source takes **2.06s to respond cold** is a textbook CLS event, on the 349-page section that produces the site's best CTR. The one image on the page that *does* carry `width`/`height` is a third-party badge.

---

## 9. Status of the 08-23 action plan

`git log --since=2026-08-22` returns nothing on `main` or `dev`. Every item below was verified live against `https://www.makecepeit.com`.

| Item | Status | Evidence |
|---|---|---|
| **H1** — pass `categories` to `RelatedPosts` on `/templates/[slug]` | ❌ Not shipped | [app/templates/[slug]/page.tsx:335](app/templates/[slug]/page.tsx:335) still `<RelatedPosts hub={...} />`. `/templates/auto-repair` serves 43 unique internal links and one `/blog` link (the nav). Section lost a further 6.7 positions. |
| **H2** — split `/receipt-help` by URL suffix | ⚠️ Superseded | The measured gap between suffixes has narrowed to noise: `-lost-receipt` 0.66%, `-receipt-copy` 0.76%, `-return-policy` (ex-Zara) 0.29%. The real defect is **Zara specifically** — 2,766 impressions, 1 click, wrong page ranking. See §4. |
| **H3** — resume the backlink program | ❌ Not shipped | `/create` at position 79.0 (was 79.2). `receipt maker` 90.3, `create a receipt` 89.7, `make a receipt` 91.4. Fifth audit as the binding constraint. |
| **H4** — scale the `*-alternative` / `*-reddit` format | ❌ Not shipped | Still the best-converting content: `receiptbaker` 22.2% CTR at pos 3.9, `receiptmakerly` 7.7% at pos 4.3, `best-receipt-maker-reddit` 2.70%, `return-without-receipt-reddit` 1.20%. |
| **M1** — finish `og:url` | ❌ Not shipped | 44/45 blog pages missing; 16 pages still point at the homepage. |
| **M2** — `width`/`height` on brand logos | ❌ Not shipped | 373/624 images unsized. |
| **M3** — trim titles over 60 chars | ❌ Not shipped | 32% (was 31%). |
| **M4** — `RelatedPosts` on `/examples/[slug]` | ❌ Not shipped | No `RelatedPosts` import anywhere under `app/examples/`. |
| **M5** — finish `Organization` schema | ❌ Not shipped | [app/layout.tsx:83](app/layout.tsx:83) — `sameAs` is one X link, no `foundingDate`. |
| **M6** — collapse the redirect chain | ❌ Not shipped | `http://makecepeit.com` → 2 hops. |
| **M7** — widen `policyUrl` coverage | ◐ Partial | **21 of 80** brands have one (was 19 of 73). |
| **M8** — extend citations to `/brands` | ❌ Not shipped | 0 of 45 sampled brand pages cite anything. **Reprioritised to `/blog`** — see the action plan. |
| **M9** — homepage RSC payload | ❌ Not shipped | 228 KB, flat vs 08-23. |
| **L1** — `alt` on homepage logos | ✅ **Closed** | 0 images missing `alt`; the 12 logos now carry `alt=""` as decorative. |
| **L2** — wire a CrUX/PageSpeed key | ❌ Not shipped | PSI returned 429 on all 6 requests. **Third audit without field data.** |
| **L3** — trim `/examples/page/N` from sitemap | ❌ Not shipped | 24 pagination URLs present. |
| **L4** — per-item `lastmod` | ❌ Not shipped | 580 URLs share 2026-08-20. |
| **L6** — build `/brands/amiri`, `/brands/stockx` | ❌ Not shipped | Both 404. `/brands/apple` also 404 (`/brands/costco` and `/brands/doordash` exist). |
| **L7** — add a demo video | ❌ Not shipped | Zero video sitewide. |
| **L8** — sitemap TTFB | ✅ **Closed** | 0.53s (was 5.1s cold). |

---

## 10. Measurement notes and limits

- **Query-dimension data covers 9,508 of 38,950 impressions.** Google withholds long-tail queries for privacy. All query-level percentages in this report are of the disclosed subset and are labelled as such; page-level and section-level figures are complete.
- **Performance is lab/proxy only.** No CrUX field data. §6's score is provisional.
- **DataForSEO was not used.** The MCP server reconnected during this session, but it remains on hold at the owner's request since 2026-08-21. SERP-feature attribution — which would settle how much of the position 8–11 CTR problem is AI Overviews versus intent mismatch — is unavailable without it.
- **Backlink data was not refreshed.** No Moz or Bing Webmaster credentials are configured; Semrush's API balance is exhausted. The backlink finding rests on ranking evidence (nothing on-page reaches page 9 for a head term), not on a fresh link profile.
- Crawl sample: 225 of 1,129 URLs, stratified — every section with fewer than 45 URLs was crawled completely; the five large sections were sampled at 30–45 pages each with a fixed seed.

---

## 11. Bing Webmaster Tools — first-party data

A Bing Webmaster API key was supplied on 2026-08-26 and works. `GetUserSites` confirms one verified property: **`https://makecepeit.com/` — the non-www host**, which 308-redirects to `www`. Bing is tracking the address that redirects rather than the address that serves. Adding the `www` property is worth doing (see §2).

### The backlink finding, confirmed at source

**`GetLinkCounts` returns an empty `Links` array and `TotalPages: 0`.** Bing attributes essentially **zero inbound links** to the domain.

Four previous audits inferred the link deficit from rankings. This is the search engine saying it directly. The caveat worth stating: an empty link table can also mean the endpoint is unpopulated for a given property. Two things argue against that here — Bing is otherwise fully engaged with this site (1,044 pages indexed, 100–350 crawled daily, query and page stats flowing), and the ranking evidence independently says the same thing. Treat it as strong corroboration rather than proof.

### Index coverage — the first real number we have

| Metric | Value |
|---|--:|
| Pages in Bing's index | **1,044** |
| URLs in our sitemap | 1,129 |
| **Coverage** | **~92%** |
| Pages crawled per day | 100–350 |
| Crawl trend | 992 → 1,044 indexed over 10 days, rising |

Indexing is not a problem. Bing finds, crawls and keeps the pages. Across 58 days of crawl data: **zero 301s, zero 302s, zero 5xx**, 156 4xx, 72 URLs blocked by robots.txt (`/admin`, `/account`, `/api/` — intentional).

### Bing converts ~3× better than Google

| | Google (28d) | Bing (recent weeks) |
|---|--:|--:|
| CTR | **0.65%** | **1.72 – 1.88%** |
| Average position | **20.4** | **4 – 10** |
| Impressions | 38,950 | ~1,850 |

Bing's volume is a twentieth of Google's, so this does not change the business. But it is a useful control: **the same pages, with the same titles and the same content, earn nearly three times the CTR when they rank at 4–10 instead of 20.** That is the position-band argument in §4, reproduced on a different search engine. It is evidence that the content converts fine and the constraint is position — which is the constraint links relieve.

### Bing's query set independently confirms the Zara diagnosis

Bing's top queries are the same intent shape that Zara demonstrates in Google — brand + lookup:

| Query | Position | Impr | Clicks |
|---|--:|--:|--:|
| `sam's club receipt look up` | 4.0 | 18 | 0 |
| `walmart receipt lookup tool` | 6.0 | 5 | 0 |
| `delta receipt lookup` | 6.0 | 4 | 0 |
| `how to get receipts from spotify app` | 7.0 | 6 | 0 |
| `can you get a kroger receipt reprinted` | 2.0 | 2 | 1 |
| `mcodnalds retreieve receipt` | 4.0 | 2 | 1 |
| `7eleven need a receipt` | 2.0 | 4 | 2 |

**"Retrieve / look up / reprint my receipt from brand X" is the demand this site actually meets.** It is what `/receipt-help` is for, it is what earns clicks in both engines, and it is exactly the intent the Zara page is ranking for while promising something else.

Bing's top pages are `/receipt-help/*` almost exclusively — `delta-airlines-receipt-copy`, `sam-s-club-lost-receipt`, `mcdonalds-lost-receipt`, `7-eleven-receipt-copy`, `kroger-receipt-copy` — matching Google's page-level picture.

### What this unlocks going forward

- **Index coverage monitoring** — a number no other configured source gives us.
- **IndexNow verification** — submissions can now be confirmed rather than assumed. Relevant to the standing sitemap-date discipline.
- **A free backlink signal** — re-running `GetLinkCounts` is how we will know the directory-listing work is landing.

Store the key alongside `local/gsc-credentials.json`; `/local/` is already gitignored.
