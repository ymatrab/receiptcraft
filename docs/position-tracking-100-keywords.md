# Semrush Position Tracking — 100-keyword starter set

**Built:** 2026-08-18 · **Source:** the four Semrush organic-positions exports in `semrush/` + the [Master Action Plan](../seo-audit/MASTER-ACTION-PLAN-2026-08-15.md) and the [Aug-17 content-plan update](./august-2026-content-plan-UPDATE-2026-08-17.md).

## Why the Organic Positions export can't do this job

The `makecepeit.com-organic.Positions-*.xlsx` exports are **not** a position-tracking source:

- Between the 2026-07-30 and 2026-08-17 exports, **352 of 354** shared keywords are at the *identical* position — 99% frozen.
- The reason is in the `Timestamp` column: of the 625 rows in the "Aug 17" file, **428 carry a July SERP date and 10 a June one**. Only 187 rows were re-crawled in August. It's a rolling mosaic of stale + fresh data, not a same-day snapshot.
- It only ever contains keywords you **already** rank top-100 for — so a new page (`/brands/amiri`, `/templates/rent-receipt`) is invisible until it's already ranking. It also can't show 0-rank targets, competitor movement, or SERP-feature/AI-Overview ownership.

Position Tracking solves all four: daily refresh, your own keyword list including non-ranking targets, competitor columns, and SERP-feature tracking.

## Setup

| Setting | Value |
|---|---|
| Domain | `www.makecepeit.com` (root-domain scope) |
| Location / engine | United States · Google |
| Device | Desktop **and** Mobile |
| Competitors | `makereceipt.com`, `receiptfaker.com`, `receiptbaker.com` |
| Tags | use the `tag` column in `semrush/position-tracking-100.csv` |

Paste-ready list: `semrush/position-tracking-100.txt` (one keyword per line). Tagged version with volume/KD/current position: `semrush/position-tracking-100.csv`.

## The 100 keywords

`Vol`/`KD` are Semrush values from the exports (`?` = not in any export — Semrush will fill it in on setup). `Now` = our best position in the 2026-08-17 export, `—` = not ranking top-100.


### Money / head terms — `/create` + home (audit C2) (11)

| Keyword | Vol | KD | Now | Target page |
|---|--:|--:|--:|---|
| receipt maker | 8100 | 45 | — | home |
| receipt generator | 4400 | 53 | — | /create |
| free receipt maker | 2400 | 48 | — | home + /create |
| receipt generator free | 2400 | 49 | — | /create |
| online receipt generator | 1000 | 28 | — | /create |
| free receipt generator | 720 | 35 | — | /create |
| receipt maker free | 1300 | 36 | — | /create |
| online receipt maker | 1300 | 49 | — | /create |
| receipt creator | 1000 | 52 | — | /create |
| create a receipt | 1300 | 41 | — | /create |
| make a receipt | 1300 | 37 | — | /create |

### Template hub + KD-low clusters (14)

| Keyword | Vol | KD | Now | Target page |
|---|--:|--:|--:|---|
| receipt template | 9900 | 39 | 77 | /templates |
| receipt templates | 720 | 44 | — | /templates |
| free receipt template | 2900 | 45 | 86 | /templates |
| receipt template free | 1900 | 40 | — | /templates |
| rent receipt template | 4400 | 25 | — | /templates/rent-receipt (NEW A2) |
| rental receipt template | ? | ? | — | /templates/rent-receipt (NEW A2) |
| rent receipt template word | ? | ? | — | /templates/rent-receipt (NEW A2) |
| itemized receipt | ? | ? | — | /templates/itemized-receipt (C1) |
| grocery receipt | 1600 | 26 | 64 | /templates/grocery-store (C1) |
| restaurant receipt | 1000 | 17 | 48 | /templates/restaurant (C1) |
| store receipts | 2400 | 35 | — | /templates/retail-store (C1) |
| hotel receipt | 880 | 18 | 53 | /templates/hotel |
| gas receipt | 720 | 5 | 60 | /templates/gas-station |
| donation receipt template | ? | ? | — | NEW |

### Tier-A bets (the KD-0 gems) (6)

| Keyword | Vol | KD | Now | Target page |
|---|--:|--:|--:|---|
| digital receipt | 1300 | 36 | — | /create (C1) |
| walmart receipt lookup | ? | ? | — | /blog/walmart-receipt-lookup (H1) |
| how to get a copy of walmart receipt | 70 | 39 | 13 | /blog/walmart-receipt-lookup |
| how to retrieve walmart receipt | 170 | 39 | 15 | /blog/walmart-receipt-lookup |
| walmart receipt lookup by card | ? | ? | — | /blog/walmart-receipt-lookup |
| walmart serial number search | 110 | 32 | 23 | /blog/walmart-receipt-lookup |

### Tier-A GEO — the queries AI actually cites (4)

| Keyword | Vol | KD | Now | Target page |
|---|--:|--:|--:|---|
| best free receipt templates | ? | ? | — | NEW roundup (A3) |
| best free receipt generator | ? | ? | — | /blog/best-free-receipt-generator (A5) |
| best receipt generator | 30 | 28 | — | /blog/best-free-receipt-generator |
| create a receipt for a small business | ? | ? | — | NEW guide (A4) |

### Page-1 defense (we already rank 1–11) (8)

| Keyword | Vol | KD | Now | Target page |
|---|--:|--:|--:|---|
| kfc receipt | 210 | 31 | 1 | /receipt-help/kfc-receipt-copy |
| customer copy | 90 | 14 | 1 | /blog/customer-copy-receipt-meaning |
| amount tendered | 140 | 26 | 6 | /blog/amount-tendered-meaning |
| what does amount tendered mean | 110 | 25 | 5 | /blog/amount-tendered-meaning |
| what does tendered amount mean | 90 | 34 | 9 | /blog/amount-tendered-meaning |
| apple store receipt generator | 90 | 1 | 7 | /brands/apple-store |
| motel 6 receipt template | 70 | 11 | 9 | /brands/motel-6 |
| mcdonalds receipt lookup | 40 | 19 | 11 | /receipt-help/mcdonalds-lost-receipt |

### Striking distance — currently p12–30 (21)

| Keyword | Vol | KD | Now | Target page |
|---|--:|--:|--:|---|
| zara recover my receipt | 720 | 27 | 15 | /receipt-help/zara-return-policy |
| recover my receipt zara | 140 | 24 | 13 | /receipt-help/zara-return-policy |
| zara receipt | 170 | 29 | 19 | /brands/zara |
| makereceipt | 590 | 18 | 23 | home (competitor brand) |
| recite of purchase | 590 | 12 | 30 | /blog/what-is-a-receipt |
| generic receipt for plane ticket | 390 | 20 | 12 | /templates/airline-receipt |
| panda express receipt | 320 | 26 | 14 | /receipt-help/panda-express-receipt-copy |
| walmart recept | 260 | 44 | 16 | /blog/walmart-receipt-lookup |
| costco recipt | 210 | 35 | 14 | /receipt-help/costco-lost-receipt |
| how to get a lyft receipt | 210 | 24 | 30 | /receipt-help/lyft-receipt-copy |
| receipts from lyft | 170 | ? | 17 | /receipt-help/lyft-receipt-copy |
| receipt for southwest flight | 170 | 30 | 13 | /receipt-help/southwest-airlines-receipt |
| dunkin donuts receipt | 170 | 24 | 26 | /receipt-help/dunkin-lost-receipt |
| dunkin receipt | 140 | 28 | 26 | /receipt-help/dunkin-lost-receipt |
| safeway receipts | 140 | 33 | 25 | /receipt-help/safeway-receipt-copy |
| safeway receipt lookup | 110 | 25 | 22 | /receipt-help/safeway-receipt-copy |
| aa invoice | 140 | 27 | 29 | /brands/american-airlines |
| cvs rx receipt | 90 | 54 | 13 | /receipt-help/cvs-pharmacy-receipt-copy |
| fuel receipt generator | 90 | 0 | 13 | /templates/gas-station |
| hotel receipt generator free | 70 | 9 | 14 | /templates/hotel |
| store receipt generator | 50 | 36 | 65 | /templates/retail-store |

### Brand pages (live + planned, H5 / Tier-B) (21)

| Keyword | Vol | KD | Now | Target page |
|---|--:|--:|--:|---|
| amiri receipt | 720 | 4 | — | /brands/amiri (NEW B1) |
| stockx receipt | 880 | 29 | — | /brands/stockx (NEW B7) |
| stock x receipt | 720 | 14 | — | /brands/stockx (NEW B7) |
| taco bell receipt | 590 | 19 | — | /brands/taco-bell (B10) |
| instacart receipt generator | ? | ? | — | /brands/instacart (H5) |
| apple receipt maker | ? | ? | — | /brands/apple (H5) |
| fake grab receipt | ? | ? | — | /brands/grab (H5) |
| fake walmart receipt | 260 | 5 | — | /brands/walmart (H5) |
| burberry receipt generator | ? | ? | — | /brands/burberry (H5) |
| cash app receipt | 480 | 22 | — | /brands/cash-app |
| louis vuitton receipt | 1300 | 30 | — | /blog/louis-vuitton-receipt |
| lv receipt | 1000 | 22 | — | /blog/louis-vuitton-receipt |
| receipt for louis vuitton | 1000 | 23 | — | /blog/louis-vuitton-receipt |
| sephora receipt | 720 | 27 | — | /brands/sephora |
| best buy recipt | 720 | 29 | — | /brands/best-buy |
| chipotle receipt | 720 | 39 | — | /brands/chipotle |
| popeyes receipt | 480 | 32 | — | /brands/popeyes |
| doordash receipt | 1000 | 33 | — | /brands/doordash (gap) |
| costco receipt | 1300 | 40 | 58 | /receipt-help/costco-lost-receipt |
| add receipt to starbucks app | 210 | 18 | — | /brands/starbucks (B8) |
| target receipt lookup | ? | ? | — | /receipt-help/target |

### Tier-B new pages (8)

| Keyword | Vol | KD | Now | Target page |
|---|--:|--:|--:|---|
| dental receipt | 170 | 8 | — | /templates/dental-receipt (B3) |
| towing receipt template | 140 | 5 | 50 | /templates/towing-receipt (B4) |
| pharmacy receipt | 140 | 17 | 48 | /templates/pharmacy (B6) |
| clothing receipt | 90 | 18 | 34 | /templates/clothing-store-receipt (B9) |
| ai receipt generator free | 260 | 11 | — | /create (B5) |
| cash app generator | 390 | 7 | — | /create brand-safe (B2) |
| oil change receipt | 590 | 14 | — | /templates/oil-change |
| parking receipt template | ? | ? | — | NEW |

### Fake-receipt cluster (competitor-contested) (4)

| Keyword | Vol | KD | Now | Target page |
|---|--:|--:|--:|---|
| fake receipt generator | 1900 | 31 | — | /create (brand-safe) |
| fake receipt maker | 1300 | 38 | — | /create (brand-safe) |
| fake receipts | 1000 | 21 | — | fake-cluster |
| create fake receipt | 880 | 39 | — | fake-cluster |

### Brand defense (3)

| Keyword | Vol | KD | Now | Target page |
|---|--:|--:|--:|---|
| makecepeit | ? | ? | — | home |
| makecepeit receipt maker | ? | ? | — | home |
| makereceipt alternatives | ? | ? | — | /alternatives |

## How to read it once it's live

- **defend + striking (30 kws)** — the fastest scoreboard. These move in days, not months; a drop here means a real SERP change, not a stale export.
- **money + contested (16)** — the authority-gated set. Expect these to stay flat until the referring-domain count moves off 3; they're the long-run KPI, not a weekly one.
- **tier-a / tier-b / brand rows sitting at `—`** — these are the pages not built or not optimized yet. Their job is to prove the new page landed: first appearance in the top 100 *is* the success signal.

