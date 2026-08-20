# Full SEO Audit — makecepeit.com — 2026-08-20

**Method:** live checks against `https://www.makecepeit.com` (head-term/metadata extraction, OG and canonical parsing, JSON-LD type census, hub→spoke link counts, sitemap census, TTFB/cache headers, content-overlap sampling) plus a source read of the repo and a live Google Search Console pull via the service account. Baseline: `FULL-AUDIT-REPORT-2026-08-19.md` (75/100).

**Run inline, not fan-out.** The `seo-audit` skill ships only `SKILL.md` — the `scripts/` it references (`fetch_page.py`, `google_auth.py`, `drift_history.py`) are not installed, so the passes were run directly. DataForSEO returned **HTTP 403 again today**, so SERP-feature data is still unavailable (M12 remains open, and this pass shows concretely what it costs — see Finding 2).

---

## Executive Summary

### SEO Health Score: **80 / 100** *(up from 75 on 08-19)*

| Category | Weight | Score | 08-19 | Δ |
|---|--:|--:|--:|--:|
| Technical SEO | 22% | **92** | 93 | ▼ -1 |
| Content Quality | 23% | **72** | 64 | ▲ +8 |
| On-Page SEO | 20% | **76** | 66 | ▲ +10 |
| Schema / Structured Data | 10% | **85** | 79 | ▲ +6 |
| Performance (CWV) | 10% | **72** | 75 | ▼ -3 |
| AI Search Readiness (GEO) | 10% | **82** | 77 | ▲ +5 |
| Images | 5% | 80 | 80 | carried (not re-audited — L8 still open) |

The rise is real and traceable to two commits: `db5e19c` (2026-08-19, head-term H1s + OG fix + hub-to-spoke links + brand variant pools) and today's GEO citation work. Six of yesterday's twelve numbered items are confirmed shipped and live.

### Resolved since 08-19 (verified live)

| Item | Was | Now |
|---|---|---|
| **H1** home H1 head term | "Make a receipt in 60 seconds" | "Free receipt maker — build yours in 60 seconds" |
| **H2** `/create` title + H1 | "Receipt Builder" | "Free Receipt Maker & Generator — Build a Custom Receipt Online" / H1 "Free Receipt Maker" |
| **H3** `/create` OG tags | homepage's tags | self-referential (`og:url` = `/create`) |
| **H4** `/receipt-help/*` OG tags | homepage's tags | self-referential — 3/3 sampled correct |
| **M1** dead `HowTo` JSON-LD | present on home | gone (type census: FAQPage, WebSite, WebApplication, Organization, DefinedTermSet, ContactPoint, Offer) |
| **M5** `/brands` variant pools | 3-4 variants, city unused | 8-10 per pool (intro/desc/title/usecase/footer) **with city spliced into prose** |
| **M10** `html-to-image` code-split | synchronous | `await import("html-to-image")`, matching the jsPDF pattern |
| **M2** `Organization` schema | no `contactPoint` | `contactPoint` added *(partial — `foundingDate` still absent, `sameAs` still one X link)* |

---

## Finding 1 — `/create`'s zero clicks is a **position** problem, not a title problem

Yesterday's H2 framed `/create` at 0 clicks as a head-term/CTR fix. The fix was correct and shipped, but the live GSC data reframes what to expect from it:

```
/create, 28d: clicks=0  impressions=874  CTR=0.00%  avg position=79.36
```

**Position 79 is page 8.** No title rewrite produces clicks from page 8 — nobody is seeing the result to decline it. Daily data (08-11 → 08-18) shows position oscillating 67-81 with zero clicks throughout, and GSC lags ~2 days so the 08-19 fix is not yet measurable at all.

The head-term rewrite was still the right call (relevance is an input to ranking), but the north-star metric set yesterday — "`/create` clicks 0 → measurable" — cannot be met by that change alone on any near horizon. `/create` needs links and authority, not copy.

## Finding 2 — The zero-CTR page-1 pages are **zero-click SERPs**, not bad titles

This is the most consequential correction in this pass. Yesterday's H7 prescribed rewriting titles/metas on eight page-1 pages using "working siblings" as models. Current state of all eight:

| Page | Clicks | Impressions | CTR | Position |
|---|--:|--:|--:|--:|
| `/blog/amount-tendered-meaning` | 2 | 1,374 | 0.15% | **5.7** |
| `/receipt-help/zara-receipt-copy` | 1 | 993 | 0.10% | 8.1 |
| `/blog/picture-of-receipt-return` | 2 | 744 | 0.27% | 6.7 |
| `/receipt-help/sephora-lost-receipt` | 1 | 585 | 0.17% | 8.7 |
| `/receipt-help/autozone-lost-receipt` | 2 | 454 | 0.44% | 8.8 |
| `/blog/are-receipts-legally-required` | 1 | 407 | 0.25% | 8.2 |
| `/blog/customer-copy-receipt-meaning` | 1 | 380 | 0.26% | 9.9 |
| `/blog/do-receipts-show-card-number` | 0 | 263 | 0.00% | 10.0 |
| **Total** | **10** | **5,200** | **0.19%** | — |

Drilling into the biggest one by query:

```
/blog/amount-tendered-meaning
  "amount tendered meaning"      1 click   269 impr   0.37%   pos 3.7
  "amount tendered"              0 clicks   69 impr   0.00%   pos 4.1
  "amount tendered vs amount paid" 0 clicks 16 impr   0.00%   pos 5.2
  "cash tendered meaning"        0 clicks   55 impr   0.00%   pos 10.9
```

**Position 3.7 with 0.37% CTR is not a title defect.** The title is already an exact query match — `What Does "Amount Tendered" Mean on a Receipt?` — and the meta description supplies the *complete answer* in its first sentence ("the money you handed over to pay — cash given or card charged"). These are short definitional queries: Google answers them in the SERP, and the searcher never needs the page.

Rewriting these metas will not recover the clicks, because the click is not available to recover. The strategy for this page class should change:

- **Stop measuring them on CTR.** They are impression/citation assets. Track whether they get cited by AI Overviews and assistants, not whether they get clicked.
- **Do not spend an L-effort meta rewrite on them.** The existing Marketing-board task "Win back the clicks we already rank for — rewrite the top 30 meta descriptions" should exclude definitional queries and target *commercial* and *multi-step* intents, where the SERP cannot answer in one line — `*-receipt-copy` and `*-lost-receipt` pages that require steps are the right targets.
- Note the honest caveat: DataForSEO's 403 blocks direct confirmation of an AI Overview / featured snippet on these SERPs. The inference rests on position, CTR, query type and the self-answering snippet — strong, but not directly observed.

## Finding 3 — Hub→spoke links shipped for 4 hub types, but the two biggest are still at zero

`db5e19c` wired `RelatedPosts`, and it works:

```
/create                             4 blog links
/alternatives                       3
/compare/makereceipt                1
/templates/restaurant               1
/templates/rent-receipt             0
/brands/starbucks                   0
/brands/walmart                     0
/receipt-help/walmart-lost-receipt  0
```

`/brands/*` (349 pages) and `/receipt-help/*` (220 pages) — **569 pages, 51% of the site** — still link to zero articles. These are also the pages that carry essentially all the site's clicks (see Finding 4), so they are the strongest link sources available and they are currently dead ends.

`/templates/rent-receipt` at 0 while `/templates/restaurant` has 1 suggests `RelatedPosts` matches on a hub key with no posts mapped to the rent cluster — worth confirming the mapping covers every template, not just the ones that happen to match.

## Finding 4 — Traffic is concentrated in exactly the pages that were never the focus

Top pages by clicks, 28 days (site total: **226 clicks, 33,623 impressions, 0.67% CTR, avg pos 20.16**):

```
10  793   1.26%  pos  7.5  /receipt-help/chipotle-receipt-copy
 7  298   2.35%  pos  7.4  /receipt-help/panda-express-receipt-copy
 6  750   0.80%  pos  8.8  /receipt-help/domino-s-pizza-lost-receipt
 5   18  27.78%  pos  6.3  /brands/dhl
 5   89   5.62%  pos  8.3  /templates/liquor-store-receipt
 4  187   2.14%  pos  7.7  /receipt-help/pizza-hut-receipt-copy
 4   80   5.00%  pos 10.7  /receipt-help/whole-foods-lost-receipt
```

Every click comes from `/receipt-help/*`, `/brands/*`, `/templates/*` and `/blog/*`. Home and `/create` — the two pages that absorbed yesterday's top two action items — contribute approximately zero (home: 1 click in 8 days, position 70-83).

Site-over-site the trend is healthy: impressions **20,111 → 33,623 (+67%)** and average position **23.87 → 20.16** versus the prior 28 days, with clicks **181 → 226 (+25%)**. CTR fell 0.90% → 0.67% because impression growth is outpacing click growth — consistent with more page-1 rankings on zero-click informational queries.

**`/receipt-help/domino-s-pizza-lost-receipt` is the site's 3rd-highest-click page** (750 impressions, position 8.8) — and it is the exact page blocked on the unverified Domino's support link. Its 0.80% CTR trails every comparable sibling (`chipotle-receipt-copy` 1.26%, `pizza-hut-receipt-copy` 2.14%, `panda-express-receipt-copy` 2.35%), all of which now cite the brand's own help page. That is correlation, not proof — but it puts a real number on a task currently parked as Blocked.

## Finding 5 — `/pricing` performance regressed, and it is the highest-intent page on the site

```
/                          ttfb 0.266s   x-vercel-cache: HIT
/create                    ttfb 0.331s   HIT
/brands/starbucks          ttfb 0.230s   HIT
/templates/rent-receipt    ttfb 0.266s   HIT
/receipt-help/walmart-...  ttfb 0.293s   HIT
/pricing                   ttfb 1.081s   MISS   cache-control: private, no-cache, no-store
```

Yesterday measured `/pricing` at 650-780ms; it is now **1.08s — 4x every other page**, the only `MISS`, and explicitly `no-store`. Three P0 revenue tasks are currently In progress against `app/pricing/*` and `app/account/page.tsx`, so this is live churn rather than a mystery — but the fix (isolate the auth-dependent CTA into a client island so the shell caches) belongs with that work, not after it.

Separately: the homepage ships **390KB of HTML** (`/create` 131KB, brand pages ~88KB). That is a large document independent of the font issue below.

## Finding 6 — Content quality genuinely improved; `/examples` was misdiagnosed

`/brands` templating (M5) is fixed: intro, SEO-description, title, use-case and footer pools are now 8-10 deep, and `city` is spliced into prose in several variants with a code comment explaining the city-free fallback. Live sampling confirms brand-specific prose on `/brands/starbucks`, `/walmart` and `/petsmart`.

`/examples` is **no longer duplicate**. Sentence-level comparison across three pages:

```
starbucks vs dunkin   1/8 sentences identical (12%)
starbucks vs costa    0/8 (0%)
dunkin    vs costa    0/9 (0%)
identical across all three: 0
```

Yesterday's "byte-for-byte identical CTA across all 316 pages" no longer holds — the earlier match was the sitewide footer, which is legitimately shared. The real `/examples` problem is different and still real: **~220 words of main content per page across 316 pages**. That is thinness, not duplication, and it needs a different fix (depth) than the one M6 prescribed (variant pools).

## Finding 7 — GEO plumbing is built; coverage is the gap

Citation coverage across page types:

```
/guides/receipt-anatomy      5 authority hosts   source list ✓   JSON-LD citation ✓
/templates/rent-receipt      5                   ✓               ✓
/templates/donation-receipt  1                   ✓               ✓
/templates/restaurant        1                   ✓               ✓
/templates/invoice           0                   —               —
/receipt-help/walmart-...    0                   —               —
/brands/starbucks            0                   —               —
/examples/dunkin-...         0                   —               —
```

Four pages of 1,120 carry citations (0.36%). The mechanism now exists end-to-end — a typed source registry, `Cite`/`CitedText`/`SourceList`, schema.org `citation`, a monthly link-rot check, and `llms-full.txt` (68KB) exposing the registry to AI crawlers with 8 authority mentions. `/editorial-policy` now states plainly that citing a rule is not advice and documents the monthly re-verification cadence, which is the trust half of the same signal.

What remains is volume: the 220 `/receipt-help/*` pages cite each brand's own help page (19 brands done, ~57 pages), but no `/brands`, `/examples` or remaining `/templates` page cites anything.

---

## Still open, unchanged

- **M11** `http → non-www → www` still 2 hops (`http://makecepeit.com` → `https://makecepeit.com/` → `https://www.makecepeit.com/`).
- **M3** 26 font families still declared in `app/fonts.ts` and loaded sitewide via `fontVariables` in the root layout.
- **M2 (partial)** `Organization` still has no `foundingDate`; `sameAs` is still a single X link.
- **M7** named-author E-E-A-T gap on `/authors`.
- **H6** backlink program — not re-tested this pass (DataForSEO 403); no reason to think it changed.
- **M12** DataForSEO 403 — **re-confirmed today**, same failure mode.
- **L8** image/alt audit — still not performed.

## Near-duplicate quality gate

Unchanged: `/brands` (349) + `/examples` (316) + `/receipt-help` (220) = **885 of 1,120 sitemap URLs (79%)**. The `/brands` portion is materially better after M5; the `/examples` portion is thin rather than duplicated; `/receipt-help` was not re-sampled at code level this pass (L4 still open).

Sitemap `lastmod` distribution shows **66 URLs dated 2026-08-20**, so the IndexNow cron has fresh URLs to submit — the citation work and the 08-19 fixes will be pushed to Bing/Yandex.
