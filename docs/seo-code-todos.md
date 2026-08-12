# SEO Code-Fix Checklist

**Source:** `docs/makecepeit_seo_audit_2026-08-11.pdf` (SEO • AEO • GEO • CRO audit, 11 Aug 2026)
**Scope:** Only items fixable **with code** in this Next.js codebase.
**Deliberately excluded** (not code): writing/expanding article & template copy, keyword research/validation, backlinks & digital PR, case-study content, author bios, legal/tax review. Those live in the content/marketing plan, not here.

Legend: `[ ]` todo · **P0** critical · **P1** high · **P2** medium · **P3** low · 🔎 = verify current live behavior first.

---

## Progress log — 2026-08-12 (branch `dev`, not committed)

Ran a verify-first pass. **Key takeaway: the codebase was already much healthier than the blind audit implied** (robots.ts, sitemap.ts with real per-section `lastmod`, JSON-LD, breadcrumbs on detail pages, and SSR determinism for static previews were already correct). Shipped the genuinely-real items:

- **DONE — Hydration #418.** Root cause: builder seeded `useState(blankDoc)`, running `Math.random()` + time on both server & client. Now SSR renders a deterministic seed (`blankDocSeed`), real values fill on mount. `lib/sections.ts`, `components/builder/SectionBuilder.tsx`. Confirmed this was the *only* SSR non-determinism (template/brand/example pages already use deterministic `previewFromTemplate`/stable numbers). ⏳ *Verify on preview: `/create` console shows no #418.*
- **DONE — Pricing contradiction.** "2 months free" was false ($39/yr ≈ 7 months free) and clashed with the accurate "Save ~60%". Replaced with "Just $3.25/mo, billed yearly". `lib/plans.ts`.
- **DONE — Funnel gap.** Funnel was already ~80% instrumented; added the missing `download_click` intent event (fires before login/watermark gate, tagged pro/free/anon). `lib/analytics.ts`, `SectionBuilder.tsx`.
- **DONE — CRO honesty microcopy.** Homepage hero now states "free to build & preview — account needed only to download" under the primary CTA. `app/page.tsx`. (`/create` already disclosed it.)
- **DONE — 404 robots.** Pinned `googleBot: { index:false }` on `not-found.tsx` so no conflicting directive can leak from the layout via metadata merge.
- **DONE — Blog breadcrumb.** `blog/[slug]` had `BreadcrumbList` schema but no visible trail; added a visible breadcrumb matching it. (templates/brands/examples/receipt-help/compare detail pages already had visible breadcrumbs.)

**Verified NOT a bug (no action):**
- **robots.txt / sitemap.xml** — already correct; the audit "couldn't verify" them because it was run without crawl access. sitemap already uses truthful per-section `lastmod` (a single sitemap is fine at this URL count; segmentation is premature).
- **hreflang** — correctly absent (canonical-only); don't add until localized pages exist.
- **Featured-On images** — the "duplicates" are an intentional `aria-hidden` marquee loop; every badge has explicit `width`/`height` (no CLS). The audit's "zero natural dimensions" was its crawler failing to load external badges.

---

## P0 — Critical (blockers, do first)

- [ ] **Eliminate React hydration mismatch (#418)** — sitewide. Find non-deterministic server/client values (dates, random receipt numbers, locale/currency formatting, `Math.random`, `new Date()`, `toLocale*`, `Intl.*`) and make first render deterministic (seed on server, compute client values in `useEffect`, or `suppressHydrationWarning` only as last resort). Add a CI check that fails on console hydration errors. *Verify: no hydration errors in clean sessions at 360 / 768 / 1440 px; builder actions work.*
  - Search hotspots already in repo: `components/layout/Footer.tsx`, `app/create/*`, anything using `new Date()` / `toLocaleString` in a Client Component.
- [ ] **Single source of truth for plans** — centralize Free / Weekly / Monthly / Annual + watermark rule + renewal/refund/cancellation into one config module and render every surface (`app/pricing/page.tsx`, `app/terms`, builder, download modal, `lib/settings.ts`, JSON-LD Offers) from it. No hardcoded plan copy anywhere else. *Verify: automated copy check + legal review show identical plan terms everywhere.*
- [ ] **Brand pages — provenance & safety in code** — replace "replacing lost receipts" / "proof of purchase" framing; render a visible **non-affiliation + "not proof of purchase"** disclaimer near the CTA **and on the generated receipt output**; add a persistent "generated document" label + misuse-reporting link. `app/brands/[slug]/page.tsx`, receipt render/output component. *Verify: approved language appears on page and generated output.*
- [ ] **Offer / WebApplication schema aligned to visible price** — `app/pricing/page.tsx` Offer(s) linked to WebApplication; emit price, currency, billing period, watermark/download limits; never publish conflicting or stale offers. Drive from the plan config above.

---

## P1 — Crawlability & indexability infrastructure

- [ ] 🔎 **robots** — confirm `app/robots.ts` serves 200 with expected directives; allow intended search crawlers; make an **explicit `OAI-SearchBot` decision** (allow/deny for AI search). *Verify via external fetch / GSC robots tester.*
- [ ] **Segmented XML sitemap index** — `app/sitemap.ts`: split into a sitemap index by section; include **only 200 / indexable / self-canonical** URLs with **truthful `lastmod`** (not build time). Exclude thin/noindex pages. Submit in GSC. *Verify: every sitemap URL returns 200, self-canonical, indexable.*
- [ ] **404 duplicate robots meta** — `app/not-found.tsx` currently sets `robots: { index:false, follow:false }` *and* Next emits its own default → audit saw **duplicate `<meta name="robots">`**. Emit exactly one noindex directive; keep helpful navigation; ensure a true 404 HTTP status. *Verify: single robots meta + HTTP 404 in external test.*
- [ ] **Canonical / noindex rules pass** — audit thin/duplicate routes; ensure each indexable page is self-canonical and low-value URLs are intentionally `noindex`.

---

## P1 — Structured data (JSON-LD) correctness per page-type

JSON-LD already exists on most routes — this is a **correctness / alignment** pass, not net-new. Rule for all: markup must match **visible** data; no invented ratings/awards/credentials.

- [ ] **Homepage** — `Organization` + `WebSite` + `WebApplication`; name, URL, logo, contact, founder, `sameAs`, applicationCategory, OS, offers. Remove any unverified ratings/awards. (`app/page.tsx`, `app/layout.tsx`)
- [ ] **Builder** — `WebApplication` + `WebPage` + `BreadcrumbList`; features, supported formats/currencies, offers → pricing. Don't advertise capabilities not in the live UI. (`app/create/page.tsx`)
- [ ] **Template hub / Brand hub** — `CollectionPage` + `ItemList` + `BreadcrumbList`; list items with real URLs/names in the **same visible order**; no hidden/non-indexable items.
- [ ] **Brand hub/detail** — non-affiliation description in schema; **do not** use brand `Organization` entities as if affiliated. (P0-adjacent)
- [ ] **Template detail** — `WebPage` or `Service` + `BreadcrumbList`; do **not** force `Product` when there's no individual product/price. (`app/templates/[slug]/page.tsx`)
- [ ] **Article / guide** — `Article`/`BlogPosting` + `Person` + `BreadcrumbList`; real headline, author URL, published/modified dates. **No future or cosmetic modified dates.** (`app/blog/[slug]/page.tsx`, `app/receipt-help/[slug]/page.tsx`)
- [ ] **About** — `AboutPage` + `Organization` + `Person`; avoid duplicate/conflicting `Organization` nodes across layout + page.
- [ ] **FAQ cleanup** — `FAQPage` only where FAQs are **visible and valid**; remove markup-only / duplicated sitewide FAQ boilerplate. (Google removed FAQ rich results in 2026 — keep for semantics only, don't treat as a KPI.)
- [ ] **Author profile** *(when real authors exist)* — `Person` + `ProfilePage`, genuine `sameAs` only.
- [ ] **VideoObject** *(only for real tutorial videos)* — thumbnail, uploadDate, duration, content/embed URL, transcript.

---

## P1 — Visible breadcrumbs matching schema

- [ ] Render a **visible breadcrumb nav that matches the `BreadcrumbList` JSON-LD** on every indexable child page. Present today on `brands/[slug]`, `templates/[slug]`, `compare/[slug]`, `alternatives`; audit flagged **missing/mismatched** on the **templates hub, blog articles, receipt-help, examples**. Build one shared `<Breadcrumbs>` component driven by the same data that feeds the JSON-LD so they can't drift. *Verify: visible path === structured path.*

---

## P1 — CRO / conversion (code changes)

- [ ] **Account-to-download microcopy** beside the **first** primary CTA: "Free to build & preview — free account required to download." (homepage + `app/create`). *Quick win, very high impact.*
- [ ] **Free vs Pro comparison** table inside the builder **and** the download modal (exact entitlement before the paywall). Drive from plan config.
- [ ] **Frictionless first export test** — implement one watermark-free sample export (or an explicit account-value exchange) as an A/B-able path.
- [ ] **Privacy / lawful-use microcopy** rendered beside AI generate, logo upload, and brand-template actions.
- [ ] **Shorten signup** — secure SSO / magic-link, and **return the user to the exact draft** they were editing (persist draft across auth).
- [ ] **Mobile sticky CTA** showing exact entitlement + current draft status.
- [ ] **Instrument the full funnel (GA4 events)** — `create_start → first_edit → preview → download_click → signup → download_success → paywall → purchase`. Events fire once, with required params. *This gates real CRO measurement — do before A/B tests.* (`lib/analytics.ts`)
- [ ] **Calculators / validators as components** (code, doubles as content depth): subtotal→tax→discount→total calculator, split-payment checker, receipt-field completeness checker.

---

## P1–P2 — Images & Core Web Vitals

- [ ] **"Featured On" badges** (`app/page.tsx`) — replace duplicated/external images with permissioned **local assets** that have explicit `width`/`height` (audit: some reported **zero natural dimensions** → CLS). Remove duplicate DOM nodes. *Verify: no duplicate badges, images have dimensions, no layout shift.*
- [ ] **Alt text + dimensions on in-content images** (blog/article images) — descriptive `alt`, explicit sizing, `next/image` where possible.
- [ ] **Core Web Vitals** — add RUM by template; optimize to **LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75**; profile slow templates and heavy JS interactions in the builder. (Relatedly: font bloat previously flagged — audit fonts loaded.) *Verify: GSC CWV / RUM show "Good" at 75th percentile.*

---

## P2 — Site structure & internal linking

- [ ] Implement the internal-link architecture in code: hub → pillar → vertical/use-case pages; use **field/use-case anchor text**; add parent/sibling links; inject **commercial CTA blocks into informational guides**. Fix **orphan money pages**.
- [ ] **Cannibalization / merges** — canonical anchors for simple definitions; redirect map for merged thin pages (implement 301s in `next.config`/middleware once the content team marks merges).

---

## P2 — Accuracy & consistency (code)

- [ ] **Currency list in visible HTML**, synchronized with the builder's actual supported currencies (homepage claims "10 currencies").
- [ ] **Annual savings basis** — one arithmetically correct comparison ("Save ~60%" at `app/pricing/page.tsx:152` vs "2 months free") displayed **next to the price**; compute from plan config so it can't contradict itself.
- [ ] **Product-capability accuracy** — QR/barcode, multiple tax lines, split payment, AI-from-text: only surface schema/marketing claims for capabilities that exist in the live builder (validate demand before building new ones).

---

## Decisions / intentionally no-code-now

- **hreflang** — `app/layout.tsx` exposes `alternates.canonical` only, **no `languages`**. Audit says this is **correct**: do **not** add hreflang until real localized equivalents exist. Leave as-is.
- **Local SEO** — N/A for a national/global web app. Do **not** add GBP, city/doorway pages, or `LocalBusiness` schema.
- **FAQ rich results** — removed by Google in 2026; don't chase them as a metric (see FAQ cleanup above).

---

## Suggested execution order (code-only slice of the 90-day plan)

1. Hydration fix (#418) + CWV/mobile validation.
2. Plan config single-source-of-truth → pricing/terms/modal/Offer schema consistency.
3. Brand provenance/disclaimer rendering (page + output).
4. robots + segmented sitemap + 404 meta dedupe + canonical/noindex pass.
5. GA4 funnel instrumentation (unblocks CRO measurement).
6. CRO microcopy + Free/Pro comparison + frictionless export + sticky CTA + SSO/magic-link.
7. Shared Breadcrumbs component + JSON-LD alignment pass.
8. Featured-On assets + image dimensions/alt.
9. Internal-link architecture + calculators/validators.
