# SEO Action Plan — makecepeit.com

**Date:** 2026-08-14 · **Score:** 78/100 · Companion to `FULL-AUDIT-REPORT-2026-08-14.md`

Priority key: **Critical** = ship now · **High** = within 1 week · **Medium** = within 1 month · **Low** = backlog.
Effort: S (<1h) · M (a few hours) · L (a day+).

---

## 🔴 Critical — ship now

| # | Action | Effort | Evidence |
|---|---|---|---|
| C1 | **Commit + deploy the 3 pending fixes** — `app/login/page.tsx` (noindex `?next=`), `app/api/logo/route.ts` + `app/opengraph-image.tsx` (`X-Robots-Tag: noindex`). None is live; Google can't see them. | S | GSC "Duplicate w/o canonical" first detected 8/5; HEAD has no `index:false` |
| C2 | **Push to IndexNow** after deploy — `/login`, `/create`, home, `/compare/*`, `/alternatives`. | S | IndexNow is manual here |

---

## 🟠 High — within 1 week

| # | Action | Effort | Evidence |
|---|---|---|---|
| H1 | **Re-optimize `/create` for the head terms.** Title → "Free Receipt Maker & Generator — Build a Custom Receipt Online"; H1 → "Free Receipt Maker" (or "Receipt Maker & Generator"). Add one indexable intro paragraph using the exact phrases. | M | `/create` title="Receipt Builder", ranks **pos 79** / 475 imp; "receipt maker" 9,900 vol, "receipt generator" 5,400 |
| H2 | **Homepage H1** → include exact "receipt maker/generator" (keep the 60-second hook as a subhead). | S | Home H1="Make a receipt in 60 seconds", ranks **pos 74** |
| H3 | **Rewrite titles/metas on the 10 page-1 zero-CTR pages** (amount-tendered-meaning, zara-receipt-copy, picture-of-receipt-return, autozone-lost-receipt, customer-copy-receipt-meaning, how-to-write-tip-on-receipt, do-stores-keep-receipt-copies, costco-receipt-copy…). Front-load the query + a click hook. | M | e.g. amount-tendered pos 5.7 / 1,330 imp / **2 clicks** |
| H4 | **Start the backlink program** — submit the directory kit (AlternativeTo, SaaSHub, Product Hunt, AI directories) and harvest competitor referring domains. | L | ~0 inbound links (Bing); money pages capped at pos 74–79 |
| H5 | **Capture striking-distance commercial queries** at pos 8–20 via brand pages: instacart (pos 10.8), apple receipt maker (20.3), burberry (14.4), ulta, dollar tree. Brand-safe titles, `/brands` shell. | M | 63 striking-distance kws in GSC; ties to competitor recon (KD<15) |

---

## 🟡 Medium — within 1 month

| # | Action | Effort | Evidence |
|---|---|---|---|
| M1 | **Kill category-default duplication** — give fallback brands unique realistic items instead of `CATEGORY_DEFAULT_ITEMS`. `lib/brands.ts`. | L | Templated-content risk |
| M2 | **Add `HowTo` schema** to "how to make a receipt" step lists + **`FAQPage`** to the home/blog FAQs. | M | No HowTo/FAQ markup today |
| M3 | **Deepen generated-brand intros** (1 → 2–3 sentences with a brand-specific fact). `lib/brands.ts`, `lib/intent-pages.ts`. | M | Thin generated pages |
| M4 | **Differentiate `/examples` boilerplate** — vary copy by category, add 1–2 unique sentences each. | L | 291 pages ~80% shared prose |
| M5 | **Strengthen `Organization` schema + E-E-A-T** — `contactPoint`, `foundingDate`, real `sameAs` (LinkedIn, Product Hunt, X). Author credentials on `/about`, "Reviewed by / Last updated" on guides. | M | `sameAs` = X only |
| M6 | **Soften the "No sign-up" chip** — say "Free to build & preview — account only to download" so the promise matches the gate. | S | Post-click bounce risk |
| M7 | **Wire CrUX / PageSpeed field data** so CWV scores on real data next audit. | S | CWV not field-measured |

---

## 🟢 Low — backlog

| # | Action | Effort |
|---|---|---|
| L1 | Collapse the `http → non-www → www` redirect chain to one hop (Vercel domain setting). | S |
| L2 | Make `/examples` rendered receipts indexable images with descriptive alt. | M |
| L3 | INP watch on `/create` (full font library load). | M |
| L4 | Audit alt-text coverage across brand/example pages. | M |

---

## Sequencing
1. **Today:** C1 → C2 (deploy + IndexNow). Ship what's already written.
2. **This week:** H1/H2 (money-page keywords) → H3 (CTR titles) — these move the pages GSC shows are closest to converting impressions to clicks.
3. **In parallel, ongoing:** H4 (backlinks) — the long lever that lifts the pos-74–79 pages; nothing on-page fully fixes those without it.
4. **This month:** the content-depth + schema block (M1–M5).

**North-star metric:** avg position 19.6 → <12, and CTR 0.74% → >1.5% over the next 28-day window.
