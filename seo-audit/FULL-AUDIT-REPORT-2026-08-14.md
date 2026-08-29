# Full SEO Audit — makecepeit.com

**Date:** 2026-08-14
**Business type:** B2C SaaS / online utility (receipt maker & templates)
**Data sources:** Live Google Search Console (connected today), Bing Webmaster, Semrush, direct codebase review, live page fetches.
**Prior audits:** 2026-08-07 and 2026-08-10 (both scored 83, lab-only — no GSC data).

---

## Executive Summary

### SEO Health Score: **78 / 100** *(data-informed)*

This is the first audit with **live Google Search Console data**, and that changes the picture. The prior score of 83 was lab-only. With real query data, the technical foundation looks even stronger than before — but GSC exposes two things a crawl can't see: the **commercial pages rank on pages 5–8** while informational pages rank on page 1, and **click-through is 0.74%**. The score isn't a regression; it's the same site measured honestly for the first time.

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 22% | 88 | Excellent — full security headers, clean sitemap/robots, canonicals, comparison pages now live |
| Content Quality | 23% | 76 | Broad (140 posts + guides + tools), but templated-page duplication + weak external authority |
| On-Page SEO | 20% | 70 | **Money pages don't use head keywords**; page-1 CTR crisis |
| Schema | 10% | 76 | Org + WebSite + Article + Breadcrumb present; missing HowTo/FAQPage |
| Performance (CWV) | 10% | 80 | Not field-measured (no CrUX/PSI wired); font-bloat + /create INP watch |
| AI Search Readiness | 10% | 72 | llms.txt live & citable, but ~0 backlinks caps citation odds |
| Images | 5% | 78 | Logo proxy + OG in place; alt-text coverage unverified |

### The one-sentence story
**Your informational content earns page-1 rankings; your revenue pages (`/create`, home, `/templates`) are stuck on pages 5–8 — because they lack both on-page head-keyword targeting and any backlink authority.**

### Live performance (GSC, last 28 days)
- **34,387 impressions · 254 clicks · 0.74% CTR · avg position 19.6**
- 500+ pages drawing impressions (Bing: 900 indexed). Indexation is healthy.
- Google is ~70× Bing's impression volume — Google is the priority surface.

### Top 5 critical / high-impact issues
1. **Three shipped-in-code fixes are uncommitted** — login `?next=` de-dupe + `/api/logo` & `/opengraph-image` noindex sit in the working tree, not deployed. Nothing improves in Google until they ship.
2. **~0 backlinks = the ranking ceiling.** Money pages sit at position 74–79 because there's no authority behind them. This is the single biggest constraint on everything else.
3. **Money-page on-page miss.** `/create` title/H1 = "Receipt Builder"; homepage H1 = "Make a receipt in 60 seconds." Neither uses "receipt maker" (9,900 vol) or "receipt generator" (5,400 vol). Direct cause of the pos-79 ranking on the highest-value terms.
4. **Page-1 CTR crisis.** `/blog/amount-tendered-meaning` ranks **pos 5.7 on 1,330 impressions → 2 clicks (0.15%)**; `/receipt-help/zara-receipt-copy` pos 8.0 / 1,242 imp / 2 clicks. Titles/metas aren't earning the click (and some are being answered in-SERP).
5. **Templated-content duplication risk** (carried from prior audits): category-default item tables, `/examples` boilerplate, thin generated-brand intros.

### Top 5 quick wins
1. **Commit + deploy** the 3 pending files, then push them + the comparison pages to IndexNow.
2. **Rewrite `/create` + homepage** title/H1 to lead with **"Free Receipt Maker / Generator."**
3. **Rewrite titles/metas** on the ~10 page-1 zero-CTR pages (add the query + a click hook; mark up FAQ/HowTo).
4. **Capture striking-distance commercial queries** already at pos 8–20 — "instacart receipt generator" (pos 10.8), "apple receipt maker" (pos 20.3), "burberry receipt generator" — via brand pages (ties to competitor recon).
5. **Start closing the backlink gap** (directory kit + competitor referring-domain harvest).

---

## Technical SEO — 88/100

**Strengths (verified live):**
- **Security headers complete:** HSTS (`max-age=63072000; includeSubDomains; preload`), `X-Content-Type-Options: nosniff`, CSP `frame-ancestors 'self'`, `Referrer-Policy`, `Permissions-Policy`. Applied to `/:path*` in `next.config.ts`.
- **robots.txt** clean: allows `/`, `/api/logo`; disallows `/admin`, `/account`, `/api/`; sitemap referenced.
- **sitemap.ts** well-built: 1,106 URLs, `revalidate = 3600` (scheduled posts enter automatically), real per-section `lastModified`, `changefreq`/`priority` correctly omitted. Includes tools, guides, authors, editorial-policy, comparison, alternatives.
- **Canonicals** self-referencing on `/`, `/create`, `/brands/*`, `/blog/*`.
- **Comparison pages now deployed** — `/compare/makereceipt`, `/compare/receiptfaker`, `/compare/receiptbaker`, `/alternatives` all 200 (prior audits flagged these as built-but-not-deployed → **resolved**).
- **llms.txt + llms-full.txt** both 200.

**Issues:**
- ⚠️ **Uncommitted fixes not live:** login `?next=` noindex + `/api/logo`/`/opengraph-image` `X-Robots-Tag: noindex` are in the working tree only. **Deploy required.**
- ⚠️ **Redirect chain:** `http://makecepeit.com` → non-www → `https://www.makecepeit.com` (2 hops). Collapse to one hop at the Vercel domain level.
- ⚠️ **GSC sitemap "indexed = 0"** — this is the *deprecated* GSC API metric (Google stopped populating it); real indexation is proven by 500+ pages drawing impressions. Not a real problem.
- Harmless noise: `/$` (Googlebot extracting a route regex from JS) and `shop.makecepeit.com/cdn` (external subdomain) both 404 correctly. Ignore.

---

## Content Quality — 76/100

**Strengths:**
- 140 blog posts (live in Sanity), plus `/guides/*`, `/tools/*` (receipt-calculator, split-payment-checker), FAQ on home.
- E-E-A-T infrastructure added since prior audits: `/authors`, `/editorial-policy`, author bios.
- Homepage is content-rich (800+ words, FAQ).

**Issues:**
- ⚠️ **Templated duplication (highest content upside):** `makeBrand()` falls back to `CATEGORY_DEFAULT_ITEMS` → identical item tables/totals across fallback brands (`lib/brands.ts`). `/examples` (291 pages) share ~80% prose. Generated-brand intros are 1 sentence. Google is indexing these today, but it's fragile at scale.
- ⚠️ **Weak external authority signals:** Organization `sameAs` lists only X/Twitter. No LinkedIn, Product Hunt, Crunchbase, etc.
- ⚠️ **"No sign-up" framing:** home prominently shows "No sign-up to start," but downloads require an account (`/create`: "create a free account to download… first 3 downloads watermark-free"). The "to start" qualifier makes it *technically* accurate and it's softer than the July version, but the prominent "No sign-up" chip risks post-click bounce when users hit the download gate — a negative UX/quality signal.

---

## On-Page SEO — 70/100

This is where the live data hurts most.

- ⚠️ **Head keywords missing from money pages.**
  - `/create` — title "Receipt Builder — Create a Custom Receipt Online"; H1 "Receipt Builder." "Receipt maker/generator" appears only in the footer. → **ranks pos 79** on 475 impressions.
  - Home — title *does* lead with "Free Receipt Maker" ✅, but H1 is "Make a receipt in 60 seconds" (no exact match). → **ranks pos 74**.
  - `/templates/restaurant` — pos 49.6 on 488 impressions.
- ⚠️ **CTR crisis on page-1 pages** (GSC, 28d):

  | Page | Pos | Impr | Clicks | CTR |
  |---|---|---|---|---|
  | /blog/amount-tendered-meaning | 5.7 | 1,330 | 2 | 0.15% |
  | /receipt-help/zara-receipt-copy | 8.0 | 1,242 | 2 | 0.16% |
  | /blog/picture-of-receipt-return | 6.8 | 634 | 2 | 0.32% |
  | /receipt-help/autozone-lost-receipt | 8.9 | 463 | 1 | 0.22% |
  | /blog/customer-copy-receipt-meaning | 10.1 | 353 | 0 | 0% |
  | /blog/how-to-write-tip-on-receipt | 11.5 | 316 | 0 | 0% |

  Some low CTR is inherent to "X meaning" queries (answered in-SERP) — but titles/metas can still be rewritten to win the residual click, and these are prime **FAQPage/HowTo snippet** targets.

**Strengths:** title templates, self-canonicals, breadcrumb trails, hub-and-spoke internal linking all in place.

---

## Schema / Structured Data — 76/100

- ✅ `Organization` + `WebSite` JSON-LD sitewide (`app/layout.tsx`); `Article` + `BreadcrumbList` on blog & brand pages.
- ⚠️ `Organization` is thin: `logo`, `email`, one `sameAs`. Add `contactPoint`, `foundingDate`, and a broader `sameAs`.
- ⚠️ **No `HowTo`** on "How to make a receipt in 3 steps" lists; **no `FAQPage`** on the home FAQ. Both are quick rich-result wins.
- Only add `aggregateRating` if you have genuine reviews — never fabricate.

---

## Performance (CWV) — 80/100 *(not field-measured)*

- Field data isn't wired: no CrUX/PageSpeed key, and GSC's `webmasters.readonly` scope doesn't return CWV. Local Lighthouse not run (no-install policy).
- Known watch items: **font bloat** (flagged in prior audits) and **`/create` INP** (the builder pulls the full font library). Landing pages reported clean previously.
- **Recommendation:** wire a CrUX/PageSpeed key so the next audit scores this on real field data.

---

## AI Search Readiness — 72/100

- ✅ `llms.txt` + `llms-full.txt` live; structured, FAQ-rich, guide content = citable passages.
- ⚠️ **~0 backlinks / brand mentions** — AI engines (Copilot pulls the Bing index; Perplexity/ChatGPT weight authority) cite established sources. Citation odds stay low until off-site authority exists.
- ⚠️ Sparse `sameAs` weakens entity recognition.

---

## Images — 78/100

- ✅ Same-origin `/api/logo` proxy (edge-cached, SSRF-allowlisted); OG image present. Both now `noindex` (pending deploy) to clear crawl-budget noise.
- ⚠️ Alt-text coverage across brand/example pages unverified; `/examples` rendered receipts aren't indexable images (minor).

---

## What changed since 2026-08-10

**Fixed / improved:** comparison pages deployed (was critical); E-E-A-T pages added (authors, editorial-policy, guides, tools); login de-dupe + logo/OG noindex written (pending deploy); "fake receipt maker" removed from the keywords array.

**Newly visible (via GSC):** money pages ranking pos 74–79; 0.74% CTR; page-1 CTR crisis; 63 striking-distance keywords at pos 8–20.

**Still open:** ~0 backlinks; templated-page duplication; money-page head-keyword optimization; HowTo/FAQ schema; redirect-chain collapse.

*See `ACTION-PLAN-2026-08-14.md` for the prioritized, effort-estimated task list.*
