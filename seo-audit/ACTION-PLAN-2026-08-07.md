# SEO Action Plan — makecepeit.com

**Date:** 2026-08-07 · **Current score:** 83/100 · **Target:** 90+

Priorities are ordered by impact-per-effort. The technical and on-page foundation is already excellent — nearly all remaining upside is in the **content layer** and the **brand/"fake receipt" strategic risk**.

---

## 🔴 Critical — the strategic risk (decide first, it gates everything)

### C1. Brand-name + logo receipt pages + "fake receipt maker" keyword
**Why it matters:** 348 pages generate "receipts" bearing real trademarks and logos (Walmart, Target, Amazon, Apple, CVS…). Combined with the `fake receipt maker` keyword in your metadata, this is the biggest single lever on the domain's SEO health — it's the profile Google's *scaled content abuse* and *site-reputation* systems, plus trademark complaints (which can force takedowns), are built to catch. A manual action here would override every other point in this audit.

**This is a business/legal decision, not a code tweak.** Options, safest → most aggressive:
- **(a)** Reframe every brand/tool page around lawful use (replacing lost receipts, expense records, mockups/props) and add a visible sitewide disclaimer. Drop `fake receipt maker` from `keywords` in `app/layout.tsx`.
- **(b)** Keep brand pages but stop embedding official logos on generated documents; use category icons instead (removes the impersonation vector while keeping the keyword pages).
- **(c)** Consolidate the thinnest brand pages into category hubs (see H1) to shrink the programmatic footprint.

➡️ **Recommend at minimum (a) now.** Flag to the owner before doing anything that removes indexed pages. I did **not** change any of this — it needs your call.

---

## 🟠 High — content quality (biggest scoreable upside)

### H1. Kill the category-default duplication
`makeBrand()` falls back to `CATEGORY_DEFAULT_ITEMS[category]`, so brands without their own items share an identical item table + subtotal/tax/total.
- **Action:** enumerate brands whose items resolve to `CATEGORY_DEFAULT_ITEMS` (no entry in `BRAND_ITEMS` and no inline `items`), and give each a unique, realistic item set — `/brands/aldi` is the model (real private-label items).
- **Alternative for the long tail:** `noindex` the brands that can't get unique data, or fold them into category hub pages, so you index fewer, stronger pages.
- **File:** `lib/brands.ts` (`BRAND_ITEMS`, `NEW_BRAND_SEEDS`).

### H2. Deepen generated-brand intros
Generated brands get one templated sentence; hand-written brands get a full paragraph.
- **Action:** expand `INTRO_VARIANTS` to 2–3 sentences with a brand-specific detail slot (what the brand sells, typical basket, a real quirk). Reuse the `BRAND_FACTS` you already maintain for receipt-help.
- **File:** `lib/brands.ts` (`INTRO_VARIANTS`), `lib/intent-pages.ts` (`BRAND_FACTS`).

### H3. Differentiate the /examples boilerplate
291 example pages share ~80% identical prose.
- **Action:** vary the surrounding copy by category/base template (grocery vs restaurant vs hotel narratives), and add 1–2 genuinely unique sentences per example (what makes *this* receipt realistic).
- **File:** `app/examples/[slug]/page.tsx`, `lib/examples.ts`.

---

## 🟡 Medium

### M1. E-E-A-T / trust signals
YMYL-adjacent niche (financial documents) with thin authorship.
- Real author bio + credentials for "Sara Artheta" on `/about`; add "Reviewed by / Last updated" to guide and receipt-help pages; link real `sameAs` profiles in Organization schema.
- Add the honest-use disclaimer from C1 in the footer (`components/layout/Footer.tsx`).

### M2. Connect Google Search Console + CrUX
Replace the lab-estimated CWV with real field data and get indexation coverage for the 1,087 URLs (watch for "Crawled – currently not indexed" on the thin tail — that's your duplication canary).
- Re-run this audit with the `seo-google` skill once connected.

### M3. Schema enrichments (only with real data)
- `HowTo` on the "How to make a … receipt" step lists (brands/templates).
- `aggregateRating` **only if** you have genuine reviews — do not fabricate.

---

## 🟢 Low

### L1. Collapse the redirect chain
`http://makecepeit.com` → `https://makecepeit.com` → `https://www.makecepeit.com` is 2 hops. Configure the http→canonical redirect to land on `https://www.makecepeit.com` in one hop.

### L2. /examples image-SEO
The rendered example receipt isn't an indexable image with descriptive alt — minor missed signal; optional.

### L3. INP watch on /create
The interactive builder pulls the full font library. Confirm it stays responsive; the landing pages are already clean.

---

## Suggested sequence
1. **Decide C1** (owner call) — reframe + drop the `fake receipt maker` keyword + disclaimer. *(this week)*
2. **H1 + H2** — remove category-default duplication, deepen intros. *(1–2 weeks)*
3. **M2** — connect GSC/CrUX, watch indexation of the tail. *(this week, runs in background)*
4. **H3 + M1** — examples differentiation + E-E-A-T. *(this month)*
5. **L1–L3** — polish. *(backlog)*

## What was NOT changed
This audit is read-only. No code, metadata, redirects, or indexing directives were modified — C1 in particular involves indexed pages and trademark/legal judgment and needs your explicit go-ahead.
