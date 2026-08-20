# GEO Citations Plan — citing authoritative sources in-text

**Created:** 2026-08-19
**Status:** planned, not started
**Owner:** Mryou

## Why

The GEO paper (Aggarwal et al., Princeton, KDD 2024) found that adding citations,
quotations and statistics to a page raised its visibility in generative-engine
answers, with the largest gains for pages that were *not* already top-ranked
(~+115% for a page sitting around position 5).

**Honest caveat, do not oversell this:** that number was measured on a *simulated*
generative-engine benchmark (GEO-Bench), not on live Google Search Console data.
The direction is right and the change is cheap, but do not forecast +115%.
Independent of the LLM angle, outbound citations to `.gov` / standards bodies are
a long-standing E-E-A-T signal for classic Google rankings, so this is worth doing
even if the GEO effect is smaller than advertised.

**The load-bearing detail:** the effect comes from citations **inside the body
text**, not from a bibliography at the bottom. `According to IRS Publication 463,
...` beats a footer link list. Do both, weight the inline form.

## Where content actually lives

Three layers, three different mechanics:

| Layer | Files | Pages | How citations get added |
|---|---|---|---|
| Hand-written TSX | `app/guides/receipt-anatomy/page.tsx`, `app/alternatives/page.tsx`, `app/tools/*` | ~8 | edit the page directly |
| Data-driven | `lib/templates.ts` (42), `lib/intent-pages.ts` (237), `lib/comparisons.ts` | ~280 | add optional `sources` to the type, render once in the page component |
| Sanity blog | `studio/schemaTypes/post.ts` | 140 | new schema field + render in `app/blog/[slug]/page.tsx` + batch migration |

Already in place (do not rebuild): JSON-LD on 24 pages, `public/llms.txt`,
`app/llms-full.txt/route.ts`, `/authors`, `/editorial-policy`.

Biggest gap found: **`/receipt-help/[slug]` has zero external links** across all
237 pages, while answering exactly the questions ("how do I get a copy of my
Walmart receipt") that LLMs field constantly.

## Infrastructure (build once, serves ~400 pages)

### `lib/sources.ts` — central source registry

```ts
export interface Source {
  id: string;             // "irs-pub-463"
  title: string;          // "Publication 463: Travel, Gift, and Car Expenses"
  publisher: string;      // "Internal Revenue Service"
  url: string;
  jurisdiction?: string;  // "US" | "EU" | "UK" | "US-CA"
  verifiedAt: string;     // ISO date — surfaced on-page, strong GEO signal
  supports: string;       // what claim this source backs
}
export const SOURCES: Record<string, Source> = { /* ... */ };
```

Central registry rather than scattered links because: one place to bump
verification dates, JSON-LD generated automatically, one script can check every
URL for link rot, and the same source is reused across dozens of pages without
duplication.

### `components/Sources.tsx`

- `<Cite id="irs-pub-463" />` — inline in-body link. **This is the one that matters.**
- `<SourceList ids={[...]} />` — "Sources & references" section with verification date.

### JSON-LD

Add `citation: [{ "@type": "CreativeWork", name, url, publisher }]` to the existing
`Article` / `WebPage` blocks, plus `dateModified` driven off `verifiedAt`.

### llms-full.txt

Add a `## Sources we cite` section to `app/llms-full.txt/route.ts`. Cheap, and it
feeds LLM crawlers directly.

## Phases

### Phase 1 — highest ROI

**1. `/receipt-help/[slug]` — 237 pages, one code change**
Add `officialReceiptUrl` and `officialPolicyUrl` to `IntentBrand` in
`lib/intent-pages.ts`. Each page then cites the brand's own help page:
"Walmart's official return policy (verified August 2026)".
Start with the top ~30 brands, not all 79.

**2. `/guides/receipt-anatomy`** — the most citable page on the site. Sources:
- FACTA truncation rule, 15 U.S.C. 1681c(g) — last 5 digits only, no expiry date
  on electronically printed receipts. Backs the "masked card number" definition.
- PCI DSS Requirement 3.3 — PAN masking (pcisecuritystandards.org)
- EMVCo Book 3 — AID / TVR / TSI. No competitor cites this.
- IRS Publication 463 — expense substantiation
- EU VAT Directive 2006/112/EC, Art. 226 (eur-lex.europa.eu) — invoice contents
- HMRC VAT Notice 700, section 16.3 — UK VAT invoice contents
- CRA — GST/HST receipt requirements (Canada)

**3. `/alternatives`** — already has `LAST_UPDATED` / `PRICING_AS_OF` / per-competitor
`url` in `lib/comparisons.ts`. Add:
- `pricingUrl` distinct from the homepage `url`
- per-competitor `verifiedAt`
- an explicit **Methodology** section (what we compared, what we checked, how often)

### Phase 2

**4. `/templates/rent-receipt`** — real statutes by state:
- California Civil Code 1499 — right to a receipt
- New York RPL 235-e — receipt required for rent paid other than by personal check
- Washington RCW 59.18.063 — receipt required for cash payments
- Massachusetts M.G.L. c.186 15B
- IRS Publication 527 (Residential Rental Property) — landlord records

**5. `/templates/donation-receipt`** — IRS Publication 1771 (Charitable
Contributions: Substantiation and Disclosure). Clearest win on the site: the $250
threshold and the literal "no goods or services" language.

**6. `/templates/restaurant`** — IRS Pub 531 and Rev. Rul. 2012-18 (auto-gratuity
is a service charge, not a tip). The distinction is already in `guidance`; it just
needs a source.

### Phase 3

7. Remaining templates — `sources?: string[]` on `ReceiptTemplate`. Add
   selectively; not every template needs one.
8. Sanity: `sources` array on the post schema, render in `app/blog/[slug]/page.tsx`,
   backfill 140 posts in batches.

## Guardrails

- **Link rot is worse than no citation.** Ship `scripts/check-sources.mjs` in
  Phase 1 (HEAD request per source, non-200 fails). Run monthly.
- **Do not `nofollow`** the `.gov` / standards-body links. The semantic association
  is the entire point.
- **Editorial framing.** This site generates receipts. Every citation must read as
  "what the law requires a *real* receipt to contain" — which is what these guides
  already do. Add one line: citing regulations is not legal advice.
- **After publishing:** IndexNow is not automatic here. Hit `/api/indexnow`.

## Measurement

- GSC baseline captured before Phase 1 ships: impressions/clicks/position for
  `/receipt-help/*` and `/guides/receipt-anatomy`.
- LLM brand mentions via `mcp__dataforseo__ai_opt_llm_ment_search`.
- Expect a 4-8 week read, not a one-week read. Do not judge Phase 1 before mid-September.
