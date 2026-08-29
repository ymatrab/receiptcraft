# SEO Action Plan — makecepeit.com

**Date:** 2026-08-26 · **Score:** 81/100 (down from 83) · Companion to `FULL-AUDIT-REPORT-2026-08-26.md`

Priority key: **Critical** = ship now · **High** = within 1 week · **Medium** = within 1 month · **Low** = backlog.
Effort: S (<1h) · M (a few hours) · L (a day+).

Nothing this pass is Critical. **Nothing from the 08-23 plan shipped** — `git log --since=2026-08-22` is empty on both branches — so the board carries almost intact. Traffic grew anyway: **clicks +29%, impressions +73%, average position −3.0**, all of it the July blog batch aging into rankings.

## What changed in the plan itself

**A new S-effort item takes the second slot, and it is worth more impressions than anything else on the board.** `/receipt-help/zara-return-policy` ranks at **positions 6–10 for 87 distinct Zara queries** and has earned **zero clicks in 28 days** from 1,521 impressions — 3.9% of everything the site gets. The queries are "recover my receipt", "retrieve my receipt", "receipt finder", "receipt lookup". The title says *"Zara Returns: Do You Need a Receipt?"* Only 6 of the 87 queries are about returns.

**That finding replaces 08-23's H2, and it deliberately does not generalise.** I tested whether the whole `/receipt-help` estate suffers wrong-page selection by cross-tabulating query intent against ranking URL suffix. It does not: **688 of 745 mismatched impressions are Zara**, and all 219 other pages account for 57 impressions of near-synonym drift ("panda express receipt lookup" landing on `-receipt-copy`) that is not worth touching. **Fix one page, not a section.**

**08-23's H2 premise no longer holds anyway.** The suffix gap has closed to noise: `-receipt-copy` 0.76%, `-lost-receipt` 0.66%, `-return-policy` ex-Zara 0.29% — nothing like the 5× gap measured on 08-23. Retiring 29 `-return-policy` pages would now be destroying working assets. **Struck.**

**M8 is reprioritised and promoted.** The `Sources & references` mechanism runs on 30 pages. 08-23 proposed extending it to `/brands` (2,536 impressions). It should go to **`/blog` instead** — 181 pages, **11,715 impressions, +274% this period**, and currently **zero external citations on any of them**, including posts making claims about US law.

**Two items close.** Missing `alt` is resolved (0 of 624 images lack the attribute). Sitemap TTFB is resolved (5.1s → 0.53s).

**One backlog item is promoted to Medium because it is now blocking the audit itself.** No PageSpeed/CrUX key means three consecutive audits with no field CWV data. This pass, keyless PSI returned HTTP 429 on all six requests.

---

## 🟠 High — within 1 week

| # | Action | Effort | Evidence |
|---|---|---|---|
| **H1** | **Pass `categories` to `RelatedPosts` on `/templates/[slug]`.** One argument at [app/templates/[slug]/page.tsx:335](app/templates/[slug]/page.tsx:335), matching the call site in [app/brands/[slug]/page.tsx:337](app/brands/[slug]/page.tsx:337). `lib/templates.ts` has no category field, so pass a literal array as `/brands` does. Without it, `relatedPostsForHub` falls through all three tiers. | **S** | Carried from 08-23 and **the section degraded further**: position 43.8 → **50.5**, CTR 0.37% → **0.22%**, 9 clicks from 4,184 impressions, **93% of impressions past position 21**. Verified live: `/templates/auto-repair` serves 43 unique internal links — the exact boilerplate count — and one link to `/blog`, which is the nav item. |
| **H2** | **Retitle and re-lead `/receipt-help/zara-return-policy` around receipt retrieval.** Change the title, H1 and opening paragraph to answer "how do I recover my Zara receipt", and put the retrieval steps above the returns content. **Do not redirect it** into `/receipt-help/zara-lost-receipt` — Google has already awarded this URL positions 6–10 and a redirect risks the ranking. Keep the returns section lower on the page for the 6 queries that want it. | **S** | 87 query pairs, ~1,041 disclosed impressions, **0 clicks**. `zara recover my receipt` pos 7.5 · `zara retrieve my receipt` pos 7.4 · `zara receipt finder` pos 9.7 · **`zara lost receipt` pos 8.8** — even that query is served by the return-policy URL, while `/receipt-help/zara-lost-receipt` appears for none of them. Expect a modest ceiling: Zara's own recovery tool will always take most of these clicks. But 1,521 impressions at 0.00% is the largest single pool of dead impressions on the site, and this is an hour's work. |
| **H3** | **Resume the backlink program.** Fifth audit in a row where this is the binding constraint, and the only lever that reaches `/create`, the homepage, or the 93% of `/templates` past position 21. | L | **Now confirmed first-party: Bing's `GetLinkCounts` returns an empty list — it attributes essentially zero inbound links to the domain**, while indexing 1,044 of our pages and crawling 100–350 a day. Previous audits inferred this from rankings; the search engine now says it directly. `/create`: 1,106 impressions, **0 clicks**, position **79.0**. `receipt maker` → 90.3 · `create a receipt` → 89.7 · `make receipt` → 79.4 · `make a receipt` → 91.4. Internal linking is not the cause — `/create` already receives contextual links from **214 of 225** crawled pages. Nothing on-page reaches page 9 for a head term. |
| **H4** | **Scale the `*-alternative` and `*-reddit` blog format.** Extend to the competitors already listed on `/alternatives`. | M | Still the best-converting content on the site: `receiptbaker` **22.2% CTR at position 3.9** · `receiptmakerly` **7.7% at position 4.3** · `best-receipt-maker-reddit` 2.70% · `return-without-receipt-reddit` 1.20% · `burger-king-receipt` 2.00%. Blog average: 0.35%. Commercial and comparison intent converts; definitional intent does not. |
| **H5** | **Extend `Sources & references` to `/blog`.** The mechanism is built, typed and proven on 28 `/templates` pages and both `/guides`. Start with the legal and rules-based posts, which make the claims most in need of a source. | M | **0 of 45 sampled blog posts cite anything external.** `/blog/are-receipts-legally-required` (540 impressions, position 6.8) states US legal rules with no source. `/blog` is now **30% of site impressions and grew 274%**. This is simultaneously the E-E-A-T gap and the AI-citability gap — AI engines preferentially cite pages that cite. Reprioritised from 08-23 M8, which aimed at `/brands` (2,536 impressions) instead. |

## 🟡 Medium — within 1 month

| # | Action | Effort | Evidence |
|---|---|---|---|
| M1 | **Wire a free PageSpeed/CrUX API key, and store the new Bing key alongside it.** *(Promoted from L2.)* | S | Keyless PSI returned **HTTP 429 on all 6 requests** this pass. The Bing key supplied on 08-26 works and should live in `local/` next to `gsc-credentials.json`. Three consecutive audits have scored Performance on server-side proxies. Until this lands, the CWV score is provisional and no CWV work can be verified. |
| M2 | **Finish the `og:url` fix the 08-19 pass started.** | S | **44 of 45 sampled `/blog` pages emit none** (181 pages affected). 16 further pages point `og:url` at the homepage: `/about`, `/authors`, `/blog`, `/contact`, `/cookies`, `/editorial-policy`, `/guides/receipt-anatomy`, `/login`, `/privacy`, `/terms`, `/tools`, `/tools/receipt-calculator`, `/examples/page/{4,7,22}`. Carried through three audits. |
| M3 | **Give the brand-page logos explicit `width`/`height`.** Six unsized `<img>` per page across 349 brand pages. | S | **373 of 624 sampled images (60%) lack dimensions.** `/api/logo` returns in **2.06s on a cache miss** (0.33s warm). An unsized image arriving 2s late is a textbook CLS event, on the section with the site's best CTR (3.51%). |
| M4 | **Trim titles over 60 characters.** Drop the ` \| Makecepeit` suffix where the title is already full, rather than shortening the useful half. | M | **73 of 225 (32%)**, flat vs 08-23's 31%. Worst: `/brands/the-coffee-bean` **93 chars**, `/brands/moe-s-southwest-grill` 91, `/brands/firehouse-subs` 78, `/create` 75, `/tools` 74. The commercial pages are the ones losing their value proposition to truncation. |
| M5 | **Render `RelatedPosts` on `/examples/[slug]`.** 316 pages, 28% of the sitemap, with no `RelatedPosts` call anywhere under `app/examples/`. | S | Same defect class as H1. `/examples` converts at **1.21% at position 11.2** — better than `/receipt-help` — and is a dead end for link equity. |
| M6 | **Finish `Organization` schema** — `foundingDate` and a real `sameAs` set. | S | Carried since 08-19. [app/layout.tsx:83](app/layout.tsx:83) — `sameAs` is still one X link. Directly relevant to **zero branded queries out of 1,755**, fifth audit running. |
| M7 | **Collapse the `http → non-www → www` redirect chain** to one hop. | S | Carried from 08-14, 08-19, 08-21 and 08-23. Still 2 hops. |
| M8 | **Resolve the `receipt maker` cannibalisation.** Five URLs split 188 impressions for the site's primary commercial term, none above position 75. | M | `/create` 90.3 · `/` 88.8 · `/blog/best-free-receipt-generator` 75.6 · `/brands/stop-shop` **96.5** · `/templates/sales-receipt` 88.5. `/brands/stop-shop` also surfaces for `make receipt` and `create a receipt` — worth checking why a supermarket brand page targets generic tool terms at all. 24 queries with ≥30 impressions are split this way. |
| M9 | **Widen official-link coverage in `lib/intent-pages.ts` — as an accuracy fix, not a CTR fix.** | M | **21 of 80** brands have a `policyUrl` (was 19 of 73 — two added). Missing: Walmart, Target, Amazon, Costco, Starbucks, Uber, DoorDash and ~50 others. The CTR premise was disproved on 08-23; ship this for correctness and user trust. |
| M10 | **Investigate the homepage payload.** 387 KB HTML of which **228 KB is RSC flight**, plus **890 KB of uncompressed JS + CSS** — including a **110 KB polyfills chunk** and **two stylesheets totalling 138 KB**. | M | Carried from 08-23 M9 and now measured more fully. Two separate CSS files on one Tailwind page is worth a look on its own. TTFB is fine everywhere (0.26–0.55s); weight is the issue. |

## 🟢 Low — backlog

| # | Action | Effort |
|---|---|---|
| L1 | Trim the 24 `/examples/page/N` pagination URLs from the sitemap — two of them are also the pages missing `BreadcrumbList`. | S |
| L2 | Per-item `lastmod` for `/brands` / `/receipt-help` / `/templates` instead of bucket constants (580 URLs share 2026-08-20). | M |
| L3 | Give `/examples` real depth — **232 median words** of `<main>` across 316 pages. Carried from 08-20. | L |
| L4 | Build `/brands/amiri`, `/brands/stockx` and `/brands/apple` before any of those keywords is queued — all three 404 today. | M |
| L5 | Revive or retire `/tools`. 3 pages, 28 impressions, 0 clicks, position 69.8, and **1 contextual internal link across 225 crawled pages**. | M |
| L6 | Add one embedded demo video — still zero video sitewide. | M |
| L7 | Add `BreadcrumbList` to the 3 `/examples` pages missing it and `CreativeWork` to the 2 `/templates` pages missing it. | S |

---

## Closed this pass

| Item | Resolution |
|---|---|
| 08-23 L1 — `alt` on the 12 homepage brand logos | ✅ **Closed.** 0 of 624 sampled images lack the `alt` attribute. The 12 logos now carry `alt=""` as decorative, which is correct for a logo strip. |
| 08-23 L8 — sitemap TTFB | ✅ **Closed.** 0.53s, down from 5.1s cold. |
| 08-23 H2 — retire `/receipt-help/-return-policy` pages | ❌ **Struck.** The suffix gap has closed to noise (0.76% / 0.66% / 0.29%), and the wrong-page test shows 688 of 745 mismatched impressions are Zara alone. Replaced by H2 above, scoped to one page. |
| July 2026 — templated-content penalty risk | ✅ **Closed.** Max 8-gram Jaccard similarity is 0.428 across 200 sampled intra-section pairs; not one exceeds 0.5. Pages write 78–100% unique content. Strike it from the risk register. |
| 08-23 M8 — extend citations to `/brands` | ↗️ **Reprioritised to `/blog`** as H5. `/blog` carries 4.6× the impressions and none of the sources. |

## Sequencing

1. **The S-effort block first: H1, H2, M2, M3, M5, M6, M7.** Together roughly half a day, and they clear six items carried across two to four audits plus the largest dead-impression pool on the site. H1 and H2 are the two highest-value hours available.
2. **M1 immediately after** — without a PSI key the next audit is blind on CWV again, and M3 is the one CWV fix currently on the board with no way to verify it.
3. **H5 and H4 are the content pair.** H5 fixes what 181 growing pages lack; H4 builds more of the only format proven to convert. Independent of each other.
4. **H3 remains the strategic bet and remains untouched.** It is the only item that reaches `/create`, the homepage, and the 93% of `/templates` past position 21. Four audits of on-page work have not moved a single head term off page 8.

## Measurement note

The honest north-star for the next pass is **`/templates` average position** (does H1 move 50.5?), **Zara clicks** (does H2 move 0?), and **`/brands` clicks**, which is the only section converting like a normal site. Watch the **position 8–11 band** as the structural number: 17,544 impressions at 0.58% CTR is 45% of the site sitting where clicks do not happen, and moving that band is what H3 is for.

Query-level figures cite the **9,508 of 38,950 impressions** Google discloses at query dimension; section and page figures are complete.


---

## Addendum — 2026-08-26, after the Bing key

A Bing Webmaster Tools API key was supplied after the audit was written. It works, and it changes three things on this board.

**H3 is no longer an inference.** `GetLinkCounts` returns an empty list — Bing attributes essentially **zero inbound links** to the domain, while simultaneously indexing **1,044 of our 1,129 sitemap URLs (92%)** and crawling 100–350 pages a day. Indexing is healthy; links are absent. Four audits argued this from rankings. The search engine now states it.

**The content is exonerated.** Bing earns **1.72–1.88% CTR at average positions 4–10**, against Google's **0.65% at position 20.4** — the same pages, same titles, roughly 3× the click rate purely because they rank higher. That is §4's position-band argument reproduced on an independent engine, and it means the conversion problem is position, not copy.

**The Zara diagnosis is independently corroborated.** Bing's top queries are the same brand-plus-lookup shape: `sam's club receipt look up` (pos 4), `walmart receipt lookup tool`, `delta receipt lookup`, `can you get a kroger receipt reprinted`. "Retrieve my receipt from brand X" is the demand this site actually meets — and it is exactly the intent H2's page ranks for while promising something else.

Going forward the key gives us index-coverage monitoring, verifiable IndexNow submission, and a free backlink signal to measure H3 against. Two housekeeping notes: the verified Bing property is the **non-www** host (the one behind the redirect in M7 — add `www` too), and the key belongs in the gitignored `local/` directory.

Full detail: `FULL-AUDIT-REPORT-2026-08-26.md` §11.

---

## Board status — 2026-08-26

This plan is now reflected in Notion. **7 tasks created** on the Marketing & Revenue board (Zara retitle; template/example linking; brand-logo dimensions; CWV measurement; title trimming; redirect chain; blog `og:url`) and **6 existing tasks updated** with the evidence from this audit.

**One P0 was archived.** "Split the receipt-help guides by whether the brand lets you look up your own receipt" rested on a premise that has now failed twice — the 08-21 split by brand capability, then the 08-23 split by URL suffix, which has since closed to noise (0.76% / 0.66% / 0.29%). It is absorbed into the one-page Zara task, S effort instead of L.

**One task was promoted to Now / P0:** "Add sources to the 140 blog articles."

New SEO tasks were filed under **Next**, not **Now**, deliberately. The Marketing board's `Phase` order is a dependency chain — stop the revenue leak, automate fulfilment, build trust, then grow — and three P0 revenue items are still open in Now: turning payments on at Shopify, the AI generator being down, and the checkout branding. Growth work that pours traffic into a funnel losing buyers is the thing that ordering exists to prevent. **Those three outrank everything in this audit.**
