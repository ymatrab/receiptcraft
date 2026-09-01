# SEO Action Plan — makecepeit.com

**Date:** 2026-08-20 · **Score:** 80/100 (up from 75) · Companion to `FULL-AUDIT-REPORT-2026-08-20.md`

Priority key: **Critical** = ship now · **High** = within 1 week · **Medium** = within 1 month · **Low** = backlog.
Effort: S (<1h) · M (a few hours) · L (a day+).

Nothing this pass is Critical. Six of yesterday's twelve items shipped and are verified live.

## What changed in the plan itself

Two of yesterday's High items were built on a wrong diagnosis. Both fixes were still worth shipping; the *expectations* attached to them were wrong:

- **H2 (`/create` head term)** — shipped. But `/create` is at **position 79**, so no copy change produces clicks. Retire "`/create` clicks 0 → measurable" as a north-star metric; it cannot be met by on-page work.
- **H7 (rewrite 8 zero-CTR titles/metas)** — **do not do this as written.** Those pages rank 3.7-10.0 on definitional queries that Google answers in the SERP. `amount tendered meaning` is position 3.7 at 0.37% CTR with a title that already matches the query exactly. The clicks are not recoverable by copy.

---

## 🟠 High — within 1 week

| # | Action | Effort | Evidence |
|---|---|---|---|
| H1 | **Link `/brands/*` and `/receipt-help/*` to the articles about them.** `RelatedPosts` already works on `/create`, `/alternatives`, `/compare`, `/templates` — extend it to the two biggest page groups. Confirm the hub-key mapping covers every template too (`/templates/rent-receipt` is at 0 while `/templates/restaurant` has 1). | M | 569 pages (51% of the site) link to zero articles — and they carry essentially all the site's clicks, so they are the strongest internal link sources available and are currently dead ends. |
| H2 | **Retarget the top-30 meta-description rewrite at commercial and multi-step intents**, excluding definitional queries. Use `*-receipt-copy` / `*-lost-receipt` pages (steps, not definitions) as the target set; `panda-express-receipt-copy` at 2.35% CTR is the model, not the definitional pages. | L | The 8 flagged pages hold 5,200 impressions at 0.19% CTR, but the query data shows the SERP answers them. Spending an L on those is spending it where no click exists. |
| H3 | **Unblock the Domino's support link.** One check from a US connection; every path from this machine force-redirects to `dominos.ma`. | S | `/receipt-help/domino-s-pizza-lost-receipt` is the **3rd-highest-click page on the site** (6 clicks, 750 impressions, pos 8.8) at 0.80% CTR, trailing every sibling that cites the brand's own help page (1.26%-2.35%). |
| H4 | **Resume the backlink program** — unchanged from yesterday's H6, and Finding 1 strengthens it: `/create` at position 79 and home at 70-83 are authority problems that no on-page work reaches. | L | Nothing on-page has moved either page in two audits. |

## 🟡 Medium — within 1 month

| # | Action | Effort | Evidence |
|---|---|---|---|
| M1 | **Make `/pricing` cache like the rest of the site** — isolate the auth-dependent CTA into a client island so the shell is statically cached. Bundle with the P0 revenue work already in flight on those files. | M | 1.08s TTFB vs 0.23-0.33s everywhere else; only page serving `no-cache, no-store` and the only Vercel cache `MISS`. Regressed from 650-780ms yesterday. |
| M2 | **Give `/examples` pages real depth** — ~220 words of main content across 316 pages. Note this is a *thinness* fix, not the duplicate-CTA fix prescribed yesterday; the pages are no longer duplicated (0-12% sentence overlap). | L | 316 pages, 28% of the sitemap. |
| M3 | **Extend citations past the 4 pages that have them** — `/templates/*` first (the mechanism is built and typed; adding a template is data entry), then `/brands`. | M | 4 of 1,120 pages carry citations. Registry, `CitedText`, `SourceList`, JSON-LD `citation` and the monthly link check all exist already. |
| M4 | **Scope the 26 font families out of the root layout.** | M | Unchanged; still loaded sitewide via `fontVariables`. |
| M5 | **Finish `Organization` schema** — `foundingDate` and a broader real `sameAs`. `contactPoint` landed. | S | Half-done as of `db5e19c`. |
| M6 | **Collapse the `http → non-www → www` redirect chain** to one hop. | S | Unchanged from 08-14 and 08-19. |
| M7 | **Add real named authorship** on `/authors`. | M | Unchanged; content is YMYL-adjacent and the site now cites tax law, which raises the bar. |
| M8 | **Fix DataForSEO access (403).** Re-confirmed failing today. This pass could not confirm whether AI Overviews sit on the zero-click SERPs — the single most decision-relevant fact in the report. | S | Third audit in a row blocked on it. |
| M9 | **Investigate the 390KB homepage HTML document.** | M | 3-6x the other page types; separate from the font issue. |

## 🟢 Low — backlog

| # | Action | Effort |
|---|---|---|
| L1 | Audit `/receipt-help` variant pools at code level (never done — L4 carried from 08-19). | M |
| L2 | Full alt-text audit across `/brands` and `/examples` (carried; Images scored 80 on a carried-forward figure, not a fresh measurement). | M |
| L3 | Per-item `lastmod` for `/brands` / `/receipt-help` / `/templates` instead of bucket constants. | M |
| L4 | Trim the 24 `/examples/page/N` pagination URLs from the sitemap. | S |
| L5 | Wire a CrUX/PageSpeed key so Performance scores on field data. | S |
| L6 | Build `/brands/amiri` and `/brands/stockx` before either keyword is queued. | M |
| L7 | Add one embedded demo video — still zero video sitewide. | M |

---

## Sequencing

1. **This week:** H1 (hub→spoke on the two big groups) is the highest-leverage remaining on-page item and touches 569 pages with one template change. H3 (Domino's) is 60 seconds of the owner's time against the site's 3rd-biggest page.
2. **Redirect the effort already budgeted for H7** into H2's retargeted version rather than cancelling it — the intent split is the whole point.
3. **In parallel:** H4 (backlinks). Two audits now show on-page work cannot move home or `/create`.
4. **This month:** M1 alongside the in-flight revenue work; then M3 (citation coverage), M2 (`/examples` depth).

**Revised north-star metrics.** Retire "`/create` clicks". Track instead:

- Site clicks 226 → 300+ over the next 28-day window (currently +25% period-over-period).
- Average position 20.16 → <18 (currently improving: 23.87 → 20.16).
- Clicks from `/receipt-help/*` and `/brands/*` specifically — where the traffic actually is.
- Citation coverage 4 pages → 40+.
- Referring domains: still unmeasured pending M8.
