# SEO Action Plan — makecepeit.com

**Date:** 2026-08-10 · **Score:** 83/100 (flat) · **Target:** 90+ · **Supersedes:** ACTION-PLAN-2026-08-07.md

The last plan's priorities are still right; the problem is they haven't shipped. Three days on, the score is flat because the high-impact work is either undeployed (comparison pages) or undecided (C1). This plan is re-ordered around **ship what exists → fix positions → then keep publishing**, backed by live ranking data (coverage 358→535 kw, but top-10 6→5, top-3 1→0).

---

## 🔴 Critical — ship this week (these gate the August ranking targets)

### C0. Deploy the comparison pages (they're 404 in production)
`/alternatives` and `/compare/{makereceipt,receiptfaker,receiptbaker}` return 404. The code is written but **untracked in git** and never deployed. This is the single most valuable unshipped asset — it's a Week-1 deliverable *and* the hub for August blog posts #1/#5/#7/#9 (whose internal links are currently dangling).
- **Do:** commit `app/alternatives/`, `app/compare/`, `components/comparison/`, `lib/comparisons.ts`, plus the modified `app/sitemap.ts` and `components/layout/Footer.tsx` **together** (the footer adds a `/alternatives` link — shipping it without the pages creates a sitewide broken link), merge `dev` → `main`, deploy.
- **Then:** submit all 4 URLs via `/api/indexnow` + GSC "Request indexing".

### C1. Decide the "fake receipt" + trademark strategy (still open)
`"fake receipt maker"` is still in `app/layout.tsx:25` (and renders ×2 on the homepage). This remains the biggest single risk to the whole domain (scaled-content-abuse + trademark). The disclaimer and llms.txt reframing are already live — finish the job.
- **Minimum now:** drop `fake receipt maker` from the `keywords` array. Confirm the honest-use framing on all brand/tool pages (mostly done).
- Owner/legal call on logos-on-generated-docs and the Tier-5 keyword cluster (below).

---

## 🟠 High — fix positions (the metric that's going the wrong way)

### H0. Convert the striking-distance pool (56 keywords in pos 11–30)
This is the fastest ROI on the board and directly targets the top-10 goal (5 → 40+). Positions are static (no movement in the data), so a nudge should move them.
- **Do:** for each striking-distance page, add exact-match internal links (from homepage/footer/related pages) + tighten title/H1/first-paragraph. Priorities from live data: `what does cash back mean` #26 (2,400 vol), `do you need a receipt to return at costco` #39 (720), `generic receipt for plane ticket` #12 (390), `zara receipt` #19, `amazon reciept` #49 (590), plus the Tier-0 set (gas/fuel receipt generator, hotel receipt generator free, store receipts).

### H1. Fix keyword cannibalization (newly visible in data)
Multiple URLs compete for one term, splitting authority: `mechanic receipts` (3 URLs), `generate a receipt online` (home + blog), `receipt creator online` (home + `/create`), `create receipt.com` (3 URLs).
- **Do:** pick one canonical page per term, point the others' internal links (and, where needed, canonicals) at it. Enforce the plan's "one keyword = one page" rule retroactively.

### H2. Money-page on-page overhaul (Tier 1 — was due Aug 8–14)
Core commercial terms are stuck deep (`generate a receipt online` #81, `receipt creator online` #87, `online receipt maker free` #76) because home/`/create`/`/templates` aren't optimized for them.
- **Do:** exact-match "receipt maker / receipt generator / free receipt maker" in title, H1, first sentence, image alt/schema; add a comparison table + FAQ block. Fix the homepage description ("100+ brand templates" → "350+"; trim to ≤160 chars).

### H3. Finish the category-default de-duplication (H1 from last audit)
~227 of 354 brand seeds still fall back to `CATEGORY_DEFAULT_ITEMS` → identical item tables/totals. `BRAND_ITEMS` now covers 127 (Aldi/CVS are the model).
- **Do:** give the highest-traffic fallback brands unique item sets; `noindex` or fold the untouchable long tail into category hubs. File: `lib/brands.ts`.

---

## 🟡 Medium

- **M1. Differentiate the 315 /examples pages** (H3 last time; surface grew). Vary prose by category + 1–2 unique sentences each. `app/examples/[slug]/page.tsx`, `lib/examples.ts`.
- **M2. Connect Google Search Console + CrUX** — still the missing measurement layer; replaces lab CWV and surfaces the "not indexed" tail. Runs in background.
- **M3. New low-KD pages** once the above ship: luxury/streetwear brand hubs (Louis Vuitton, Amiri KD4, StockX KD14) + template pages (restaurant KD7, gas KD5, cash, sales, hotel, food-shopping).
- **M4. E-E-A-T depth** — real author bio/credentials for Sara Artheta; "Reviewed by / Last updated"; verify `sameAs` (LinkedIn/ProductHunt/YouTube).

## 🟢 Low
- **L1. Collapse the redirect chain** to one hop (still 2).
- **L2. /examples image-SEO** (indexable receipt image w/ alt).
- **L3. INP watch on /create.**
- **L4. Directory submissions** (kit ready in `plan/directory-submission-kit.md`).

---

## Revised sequence
1. **This week:** C0 (deploy comparison pages) + C1 (drop keyword) → submit to IndexNow/GSC.
2. **This week:** H0 (striking-distance internal links) + H1 (de-cannibalize) — the fastest position wins.
3. **Next:** H2 (money pages) + H3 (brand de-dup).
4. **This month:** M1–M4, then M3 new pages.
5. **Backlog:** L1–L4.

## Success metric to watch (re-pull Semrush end of August)
Top-10 keywords **5 → 40+**, top-3 **0 → 8+**, core commercial terms on page 1 **0 → ≥3**. Coverage (535 kw) is already tracking; the whole game now is **position**, and position only moves once the built work is deployed.
