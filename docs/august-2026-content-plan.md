# August 2026 Content Sprint — 62 Posts, Hub-and-Spoke

**Goal:** publish **2 SEO blog posts/day for 31 days (62 posts)** that close the coverage + position gaps from the keyword-gap report, each targeting ONE distinct keyword and funnelling authority to a money page.
**Merges:** [`keyword-gap-report-and-august-2026-plan.md`](./keyword-gap-report-and-august-2026-plan.md) (what to target) + [`commercial-keyword-post-playbook.md`](./commercial-keyword-post-playbook.md) (how to write it).
**Status:** PLAN FOR APPROVAL — no content written yet.
**Date:** 2026-08-01.

---

## 1. The model: hubs & spokes (why this won't cannibalize)

The gap report showed our real problem isn't too few pages — it's **weak positions and thin topical authority**. The fix is a hub-and-spoke cluster, not 62 disconnected posts:

- **HUBS = money pages we already own** (don't re-blog their head terms): `/` + `/create` ("receipt maker/generator"), the 42 `/templates/<type>` pages, the 354 `/brands/<slug>` pages, and the `/alternatives` + `/compare/*` pages we shipped.
- **SPOKES = the 62 blog posts.** Each targets ONE *distinct* long-tail / facet keyword and links **up** to its hub with exact-match anchor text. Internal links from 62 fresh posts are exactly what lifts the hubs' positions — the thing we're missing.

**The 20 "anchor" keywords** (the important terms the sprint is built around; hubs rank these, spokes reinforce them):
`receipt maker` · `receipt generator` · `free receipt maker` · `receipt generator free` · `online receipt maker` · `receipt creator` · `make a receipt` · `cash receipt` · `sales receipt` · `restaurant receipt` · `gas receipt` · `hotel receipt` · `grocery receipt` · `cvs pharmacy receipt` · `target receipt` · `uber receipt` · `louis vuitton receipt` · `how to make a receipt` · `how to write a receipt` · `makereceipt alternative`.

> The 62 spokes target *variants and facets* of these 20 (e.g., hub owns "cash receipt" → spoke targets "cash payment receipt template"; hub owns "uber receipt" → spoke targets "how can I get an Uber receipt"). This is the anti-cannibalization rule below.

---

## 2. Hard rules (enforced on every post)

1. **One keyword = one page.** Before writing, confirm no existing page/post targets the same phrase (check GSC + the calendar). Singular/plural and word-order variants count as the same keyword.
2. **Never blog a head term a hub already owns.** If a `/templates/*` or `/brands/*` or money page targets the exact term, the spoke targets a *distinct facet* (how-to, use-case, "template free download", "for expense report", brand-specific) and **canonically defers** to the hub for the head term.
3. **Intent gate (from the playbook).** Commercial/transactional keyword → use the **Commercial template** (playbook PART B). Informational ("how to", "what is") → use the **Informational template** (§4). Never hard-sell on informational posts; never write a thin sales page for an informational query.
4. **≥3 in-context links to the hub** (money page), exact-match anchor, plus 2–4 links to sibling spokes in the same cluster.
5. **Unique data per post — no templated filler.** Each post embeds the *actual* receipt template/live example for its keyword, real numbers, and keyword-specific FAQs. (Site was flagged for templated-content risk + scored 60/100 — 62 near-identical posts would make that worse, not better.)
6. **AI-detection gate.** Run every draft through the `ai-score` / `content-humanizer` agents; ship only when AI-probability is below threshold. Balanced, specific, honest tone — not hype.
7. **Schema:** valid JSON-LD `BlogPosting/Article` + `FAQPage` on every post (HowTo schema on how-to posts).
8. **Post-publish:** submit each URL to IndexNow (`/api/indexnow`) + GSC — new posts are **not** auto-pushed to Bing.

---

## 3. Cluster mix (62 posts)

| Cluster | Posts | Hub they link to | Intent |
|---|--:|---|---|
| Comparison / alternatives | 6 | `/alternatives`, `/compare/*` | Commercial (highest convert) |
| Core tool (maker/generator variants) | 14 | `/create` | Commercial |
| Receipt-type templates | 18 | `/templates/<type>` | Commercial |
| Brand receipts (guides) | 18 | `/brands/<slug>` | Commercial/how-to |
| How-to / educational | 6 | `/create` | Informational |

Total targeted volume ≈ **51,000 searches/mo**. Two new brand hubs to create first: **Amiri** (KD4) and **StockX** (KD14–29).

---

## 4. The two post templates

**Commercial posts → use `commercial-keyword-post-playbook.md` unchanged.** Fill PART A per post:
`TARGET_KEYWORD` = the row's keyword · `MONEY_PAGE_URL` = the row's hub link · `PRODUCT` = Makecepeit · `GEO` = USA · `INTERNAL_LINKS` = 2–4 sibling spokes. 2,500–3,500 words, exact-match in all 7 slots, one comparison table, one numbered how-to, 10 FAQs.

**Informational posts (how-to) → template (defined here, since the playbook is commercial-only):**
- 1,500–2,200 words. Title/H1/slug/first-sentence exact-match.
- Direct-answer opening (bolded, ≤90 words) → featured snippet / AI Overview.
- **HowTo schema** + numbered steps with a screenshot each.
- Sections: what it is → step-by-step → what to include (checklist) → common mistakes → templates/examples → 6–8 FAQs.
- **Soft** conversion bridge only: one "Make one in 60 seconds with Makecepeit" callout linking to `/create` (not a hard sell — informational SERPs filter salesy pages).
- Link to 2–3 relevant brand/template hubs.

---

## 5. Daily cadence

- **2 posts/day, paired:** 1 commercial (money) + 1 informational/supporting. Keeps intent balance and daily internal-link velocity.
- **Weekly themes:** Wk1 comparison + how-to foundation (fast authority) → Wk2 core tool terms → Wk3 templates + luxury brands → Wk4 brand guides + measure.
- **Batch production suggestion:** draft 6–10 at a time with the playbook, humanize, schedule in Sanity with `publishedAt` staggered 2/day (the sitemap already revalidates hourly to pick them up).

---

## 6. The 62-post calendar

> ⚠️ **SUPERSEDED (2026-08-01).** This 62-post table was built before deduping against the 140 posts already in Sanity — ~23 of these overlap existing content. **Use the reconciled 53-post calendar in [august-2026-content-plan-RECONCILED.md](./august-2026-content-plan-RECONCILED.md) instead.** The table below is kept only for reference.

Data-grounded from the Semrush gap set (US, Jul-30). Vol = monthly searches, KD = Semrush difficulty. Titles are **drafts** (fix minor article agreement, e.g. "an Uber"). Slug = exact keyword, kebab-case.

| # | Date | Target keyword | Vol | KD | Type · cluster | Hub link | Working title (draft) |
|--:|---|---|--:|--:|---|---|---|
| 1 | Aug 01 | makereceipt alternative | 590 | 32 | Comm · comparison | /compare/makereceipt | MakeReceipt Alternative: Top Picks Compared (2026) |
| 2 | Aug 01 | how to make a receipt | 1,300 | 45 | Info · howto | /create | How to Make a Receipt: Step-by-Step Guide |
| 3 | Aug 02 | best free receipt generator | 480 | 30 | Comm · comparison | /alternatives | Best Free Receipt Generator: Top Picks Compared (2026) |
| 4 | Aug 02 | how to write a receipt | 1,000 | 21 | Info · howto | /create | How to Write a Receipt: Step-by-Step Guide |
| 5 | Aug 03 | receiptmakerly alternative | 320 | 28 | Comm · comparison | /alternatives | Receiptmakerly Alternative: Top Picks Compared (2026) |
| 6 | Aug 03 | how can i get an uber receipt | 720 | 33 | Info · brand | /brands/uber | How Can I Get an Uber Receipt? Get a Copy Fast |
| 7 | Aug 04 | receiptfaker alternative | 210 | 25 | Comm · comparison | /compare/receiptfaker | ReceiptFaker Alternative: Top Picks Compared (2026) |
| 8 | Aug 04 | how to make a receipt of payment | 480 | 38 | Info · howto | /create | How to Make a Receipt of Payment: Step-by-Step Guide |
| 9 | Aug 05 | expressexpense alternative | 210 | 26 | Comm · comparison | /alternatives | ExpressExpense Alternative: Top Picks Compared (2026) |
| 10 | Aug 05 | how to write tip on receipt | 260 | 22 | Info · howto | /create | How to Write a Tip on a Receipt: Step-by-Step Guide |
| 11 | Aug 06 | receiptbaker alternative | 140 | 25 | Comm · comparison | /compare/receiptbaker | ReceiptBaker Alternative: Top Picks Compared (2026) |
| 12 | Aug 06 | how to get a receipt from walmart | 260 | 38 | Info · howto | /create | How to Get a Receipt from Walmart: Step-by-Step Guide |
| 13 | Aug 07 | receipt generator free | 2,400 | 49 | Comm · core | /create | Receipt Generator Free: Make Receipts Online Free |
| 14 | Aug 07 | how to get a receipt | 210 | 27 | Info · howto | /create | How to Get a Receipt: Step-by-Step Guide |
| 15 | Aug 08 | cvs pharmacy receipt | 2,400 | 37 | Comm · brand | /brands/cvs-pharmacy | How to Get & Recreate a CVS Pharmacy Receipt (2026) |
| 16 | Aug 08 | walmart receipt maker | 320 | 13 | Comm · core | /create | Walmart Receipt Maker: Make Receipts Online Free |
| 17 | Aug 09 | target receipt | 1,600 | 26 | Comm · brand | /brands/target | How to Get & Recreate a Target Receipt (2026) |
| 18 | Aug 09 | receipt maker online | 320 | 37 | Comm · core | /create | Receipt Maker Online: Make Receipts Online Free |
| 19 | Aug 10 | receipt maker free | 1,300 | 36 | Comm · core | /create | Receipt Maker Free: Make Receipts Online Free |
| 20 | Aug 10 | receipt expense | 390 | 34 | Comm · template | /templates | Receipt for Expenses: Free Template & Examples |
| 21 | Aug 11 | create a receipt | 1,300 | 41 | Comm · core | /create | Create a Receipt: Make Receipts Online Free |
| 22 | Aug 11 | itemized receipt example | 390 | 16 | Comm · template | /templates/itemized-receipt | Itemized Receipt Example: Free Template & Download |
| 23 | Aug 12 | grocery store receipt | 1,300 | 25 | Comm · template | /templates/grocery-store | Grocery Store Receipt Template: Free Download & Examples |
| 24 | Aug 12 | auto repair receipt | 390 | 10 | Comm · template | /templates/auto-repair | Auto Repair Receipt Template: Free Download & Examples |
| 25 | Aug 13 | online receipt maker | 1,300 | 49 | Comm · core | /create | Online Receipt Maker: Make Receipts Online Free |
| 26 | Aug 13 | cash app receipt generator | 390 | 7 | Comm · core | /create | Cash App Receipt Generator: Make Receipts Online Free |
| 27 | Aug 14 | louis vuitton receipt | 1,300 | 30 | Comm · brand | /brands/louis-vuitton | How to Get & Recreate a Louis Vuitton Receipt (2026) |
| 28 | Aug 14 | hotel receipt template | 390 | 22 | Comm · template | /templates/hotel | Hotel Receipt Template: Free Download & Examples |
| 29 | Aug 15 | uber receipt | 1,300 | 33 | Comm · brand | /brands/uber | How to Get & Recreate an Uber Receipt (2026) |
| 30 | Aug 15 | cash payment receipt | 480 | 33 | Comm · template | /templates/cash-receipt | Cash Payment Receipt Template: Free Download & Examples |
| 31 | Aug 16 | digital receipt | 1,300 | 36 | Comm · template | /templates | Digital Receipt Template: Free Download & Examples |
| 32 | Aug 16 | cash app receipt | 480 | 22 | Comm · template | /templates/cash-receipt | Cash App Receipt: Template & How to Make One |
| 33 | Aug 17 | make a receipt | 1,300 | 37 | Comm · core | /create | Make a Receipt: Free Online Receipt Tool |
| 34 | Aug 17 | free online receipt maker | 480 | 23 | Comm · core | /create | Free Online Receipt Maker: Make Receipts Online Free |
| 35 | Aug 18 | food shopping receipt | 1,300 | 25 | Comm · template | /templates/grocery-store | Food Shopping Receipt Template: Free Download & Examples |
| 36 | Aug 18 | rent receipt template free | 590 | 30 | Comm · template | /templates/rent-receipt | Rent Receipt Template Free: Download & Examples |
| 37 | Aug 19 | receipt from store | 1,300 | 35 | Comm · template | /templates/retail-store | Store Receipt Template: Free Download & Examples |
| 38 | Aug 19 | taco bell receipt | 590 | 19 | Comm · brand | /brands/taco-bell | How to Get & Recreate a Taco Bell Receipt (2026) |
| 39 | Aug 20 | online receipt generator | 1,000 | 28 | Comm · core | /create | Online Receipt Generator: Make Receipts Online Free |
| 40 | Aug 20 | handwritten restaurant bill | 590 | 18 | Comm · template | /templates/restaurant | Handwritten Restaurant Bill: Free Template & Examples |
| 41 | Aug 21 | receipt creator free | 1,000 | 30 | Comm · core | /create | Receipt Creator Free: Make Receipts Online Free |
| 42 | Aug 21 | free receipt maker pdf | 590 | 22 | Comm · core | /create | Free Receipt Maker PDF: Make Receipts Online Free |
| 43 | Aug 22 | receipt in restaurant | 1,000 | 6 | Comm · template | /templates/restaurant | Restaurant Receipt Template: Free Download & Examples |
| 44 | Aug 22 | oil change receipt | 590 | 14 | Comm · template | /templates/auto-repair | Oil Change Receipt Template: Free Download & Examples |
| 45 | Aug 23 | receipt creator | 1,000 | 52 | Comm · core | /create | Receipt Creator: Make Receipts Online Free |
| 46 | Aug 23 | hilton receipt | 720 | 50 | Comm · brand | /brands/hilton | How to Get & Recreate a Hilton Receipt (2026) |
| 47 | Aug 24 | lv receipt | 1,000 | 22 | Comm · brand | /brands/louis-vuitton | LV Receipt: How to Get & Recreate One (2026) |
| 48 | Aug 24 | expense receipt | 720 | 43 | Comm · template | /templates | Expense Receipt Template: Free Download & Examples |
| 49 | Aug 25 | burger king receipt | 1,000 | 25 | Comm · brand | /brands/burger-king | How to Get & Recreate a Burger King Receipt (2026) |
| 50 | Aug 25 | sephora receipt | 720 | 27 | Comm · brand | /brands/sephora | How to Get & Recreate a Sephora Receipt (2026) |
| 51 | Aug 26 | doordash receipt | 1,000 | 33 | Comm · brand | /brands/doordash | How to Get & Recreate a DoorDash Receipt (2026) |
| 52 | Aug 26 | expenses receipt | 720 | 46 | Comm · template | /templates | Expenses Receipt Template: Free Download & Examples |
| 53 | Aug 27 | home depot receipt | 1,000 | 42 | Comm · brand | /brands/home-depot | How to Get & Recreate a Home Depot Receipt (2026) |
| 54 | Aug 27 | chipotle receipt | 720 | 39 | Comm · brand | /brands/chipotle | How to Get & Recreate a Chipotle Receipt (2026) |
| 55 | Aug 28 | free online receipt generator | 880 | 26 | Comm · core | /create | Free Online Receipt Generator: Make Receipts Online Free |
| 56 | Aug 28 | amiri receipt | 720 | 4 | Comm · brand | /brands/amiri | How to Get & Recreate an Amiri Receipt (2026) |
| 57 | Aug 29 | stockx receipt | 880 | 29 | Comm · brand | /brands/stockx | How to Get & Recreate a StockX Receipt (2026) |
| 58 | Aug 29 | blank receipt | 880 | 43 | Comm · template | /templates | Blank Receipt Template: Free Download & Examples |
| 59 | Aug 30 | best buy receipt | 880 | 30 | Comm · brand | /brands/best-buy | How to Get & Recreate a Best Buy Receipt (2026) |
| 60 | Aug 30 | walgreens receipt | 880 | 55 | Comm · brand | /brands/walgreens | How to Get & Recreate a Walgreens Receipt (2026) |
| 61 | Aug 31 | purchase receipt | 880 | 17 | Comm · template | /templates/proof-of-purchase | Purchase Receipt Template: Free Download & Examples |
| 62 | Aug 31 | lowes receipt | 880 | 54 | Comm · brand | /brands/lowes | How to Get & Recreate a Lowe's Receipt (2026) |

---

## 7. Success metrics (baseline 2026-07-30 → end-August)

| Metric | Baseline | Target |
|---|--:|--:|
| Total ranking keywords (US) | 358 | 600+ |
| Keywords in top 10 | 6 | 40+ |
| Posts published | — | 62 |
| Core commercial terms on page 1 | 0 | ≥3 |
| Organic sessions → /create + /templates | baseline | +40% |

**Track weekly:** GSC impressions/position on the 20 anchors; Sanity publish count; GA4 organic to hubs. Re-pull Semrush at month end vs the 07-30 baseline.

---

## 8. Risks & open decisions

1. **Volume vs quality (biggest risk).** 62 posts × 2,500 words in 31 days is aggressive. If quality slips, thin/duplicate content *hurts* a site already at 60/100. Mitigation: rules #5–#6 (unique embedded data + AI-detection gate). Consider dropping to 1/day if the humanize+QA loop can't keep up.
2. **Self-cannibalization with brand/template hubs.** Handled by rule #2 (spokes target facets, canonical to hub) — must be enforced, not assumed.
3. **"Fake receipt" cluster (~19,700 vol) — excluded by default.** Not in this calendar. Decision needed if you want it (legit-framing only).
4. **KD/volume are a Jul-30 snapshot.** Sanity-check the top ~15 targets against live SERPs before writing (Semrush MCP available).

---

## 9. Approval gate → next step

Before any writing, confirm: (a) the 62 keywords/targets, (b) 2/day vs 1/day cadence, (c) the fake-receipt decision, (d) create the Amiri + StockX brand hubs first. On approval, production order = Week 1 rows (comparison + how-to), drafted via the playbook, humanized, then scheduled in Sanity 2/day.
