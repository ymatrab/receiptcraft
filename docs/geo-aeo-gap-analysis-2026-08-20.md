# GEO/AEO gap analysis — makecepeit.com vs. the LLM Pulse GEO guide

**Date:** 2026-08-20
**Source article:** https://llmpulse.ai/blog/geo-guide/
**Method:** every tactic in the guide checked against the repo and against live
production HTML (not the build), plus a sitemap-wide count of outbound
authority links.

## Caveat on the source

The guide is published by a GEO tracking vendor. Its *tactics* trace back to the
Princeton GEO paper (Aggarwal et al.), which genuinely measured citations,
quotations and statistics as the top-lifting interventions — those are worth
acting on. Its *benchmarks* ("median visibility 8–12%", "Softonic +340%") are
vendor marketing. Use the tactics; ignore the numbers.

---

## Already done — do not redo

| Guide requirement | Status |
|---|---|
| SEO foundation (crawl, index, links, sitemap) | ~1,120 URLs, server-rendered, honest per-section `lastmod`, IndexNow cron |
| Allow AI crawlers | `User-Agent: *` `Allow: /` — nothing is blocked, every retrieval bot is permitted |
| Valid structured data | Organization, WebSite, WebApplication, SoftwareApplication, FAQPage, BreadcrumbList, ItemList, BlogPosting, DefinedTermSet, Offer, `citation` |
| llms.txt | `/llms.txt` + `/llms-full.txt`, generated from live data so it cannot drift. Guide rates this optional/experimental — it's done; don't invest more |
| Query fan-out coverage | Homepage already splits intent ("You lost the original / expense report / issuing one / prop") |
| Citation infrastructure | `lib/sources.ts` registry, `{cite:id\|text}` inline syntax, `citationJsonLd()`, `verifiedAt` dates, `scripts/check-sources.mjs` link-rot pass |

The infrastructure is unusually good. The problem is that almost nothing uses it.

---

## GAP 1 — Inline citations reach ~5% of the site

Guide tactic #2. Second-highest ranked; +115% visibility for pages ranked ~5.

Measured on production HTML, counting outbound links excluding own-domain,
schema.org and the launchzone footer badge:

| Page type | URLs | With an authority link |
|---|---|---|
| `/receipt-help/*` | 220 | ~57 (19 of 73 brands) |
| `/blog/*` | 173 | **0** |
| `/brands/*` | 349 | **0** |
| `/examples/*` | 316 | **0** |
| `/templates/*` | 43 | 3 |
| `/compare/*`, `/pricing` | 4 | 0 |
| `/guides/receipt-anatomy` | 1 | yes |

**54 brands cite nothing** — including every high-volume one:
Walmart, Target, Amazon, Costco, Sam's Club, Home Depot, Lowe's, Best Buy,
Starbucks, Uber, Lyft, DoorDash, Uber Eats, Instacart, IKEA, Nike, Marriott,
Hilton, Airbnb, Delta, Southwest, Subway, Taco Bell, KFC, Wendy's, Domino's,
eBay, Netflix, Spotify, Expedia, Hertz, and 23 more.

`/receipt-help/walmart-lost-receipt` tells the reader to "use Walmart's online
receipt lookup" and does not link to it. That is the exact page an LLM is asked
to summarise for "how do I get a copy of my Walmart receipt", and it has no
primary source on it.

**Fix:** extend `BRAND_OFFICIAL` in `lib/intent-pages.ts` to the remaining 54
brands, highest-volume first. The schema, the renderer, the `verifiedAt`
discipline and the sitemap dating (`hasOfficialSource`) already exist — this is
data entry, not engineering. Then add `sources` to the templates where a
published rule really governs a field (VAT/GST, mileage, fuel, hotel occupancy
tax, parking, medical/HSA, taxi), and wire `{cite:}` through Sanity portable
text so the 173 blog posts can cite at all.

## GAP 2 — There are no statistics on the site

Guide tactic #4: *"the strongest single tactic in the Princeton paper."*

Sampled `/blog/pharmacy-receipt-generator-itemized-products`: 2,833 words, zero
figures carrying a number, a year and a source. `/receipt-help/walmart-lost-receipt`:
725 words, one hard fact (the TC# on every Walmart receipt), no sourced numbers.

You already *hold* the facts — `BRAND_FACTS` and `BRAND_OFFICIAL` contain things
like "Macy's can retrieve receipt information for up to two years", "CVS caps a
no-receipt refund at the lowest advertised price from the prior 60 days",
"GameStop runs a 15-day window that drops to 7 for special editions". They are
buried in prose or absent from the visible copy.

**Fix:** every money page states 2–3 specific numbers with the issuing authority
and a date. "The IRS requires a receipt for any lodging expense and any other
expense of $75 or more (Publication 463, checked August 2026)" is extractable;
"keep receipts for larger expenses" is not.

## GAP 3 — No original data, and you own the only dataset in this niche

Guide: *"nothing earns citations like unreplicated numbers."*

349 brand-style layouts and 43 templates modelled on real receipts. No
competitor has that corpus.

**Fix — highest ceiling on this list:** publish *The Receipt Field Report 2026*.
Across 349 layouts: what share print a transaction/TC number, a barcode, a tip
line, the last four of the card, a return-policy footer; average line-item
count; how many currencies and tax labels appear; which categories itemise vs.
total-only. One page, `Dataset` schema, cited for years, and impossible for a
competitor to replicate without building what you already built.

## GAP 4 — No named human author and no Person entity

Guide tactic #3 (quotes from named experts with title and organisation).

Blog posts carry a byline ("Sara Artheta") but `/authors` has no `Person`
schema, no bio, no credentials, no `sameAs`. `BlogPosting.author.url` points at
`/about`, not at a person.

**Fix:** real `/authors/[slug]` pages with `Person` + `jobTitle` + `sameAs`
(LinkedIn/X), and repoint `BlogPosting.author`. Then attribute the judgement
calls in the guides to a named person with a title, rather than to "we".

## GAP 5 — No visible freshness signal

Guide tactic #9: cited sources average ~26% fresher than equivalent SEO results.

`app/sitemap.ts` maintains meticulous per-section dates, but a model reading the
page never sees them. Blog posts show a publish date only — no "updated".
`/receipt-help`, `/brands`, `/examples`, `/templates`, `/compare` show no date
at all.

**Fix:** render "Last reviewed <date>" on every content page from data you
already hold (`INTENT_UPDATED`, `Source.verifiedAt`, `_updatedAt`,
`LAST_UPDATED`), and run a quarterly refresh on the top 30 pages.

## GAP 6 — Four comparison pages, in a format that is ~32% of AI citations

Guide tactic #10. `/compare` holds 3 competitors; `/alternatives` is one page.
`lib/comparisons.ts` already enforces fair, verifiable, dated competitor claims
— the format is right, the surface is tiny.

**Fix:** expand to 10–12 competitors, then add the "best X for Y" long tail:
best receipt generator for expense reports / for landlords / for freelancers /
for small business, and free vs paid receipt makers.

## GAP 7 — No off-page seeding whatsoever

Guide tactic #7, and the guide's highest-leverage off-page category.

`Organization.sameAs` contains exactly one URL: X/Twitter. No Wikipedia, Reddit,
YouTube, G2, Capterra, Product Hunt, AlternativeTo or SaaSHub presence.

Wikipedia is not realistic at this size — skip it. The achievable set this
quarter: **AlternativeTo, SaaSHub, Product Hunt, Capterra**. Those are precisely
the pages an assistant reads when asked "free receipt generator alternatives".

**YouTube is the notable miss:** transcripts are crawled and cited, and you have
zero video. A 90-second screen recording of building a receipt, with a clean
transcript and chapter markers, is cheap and directly citable.

**Reddit:** r/smallbusiness, r/personalfinance, r/Bookkeeping — genuine answers
over months, not drops.

## GAP 8 — None of this is measurable today

`lib/analytics.ts` has a well-built event dispatcher and **no referrer handling
at all**: nothing segments chatgpt.com, perplexity.ai, gemini.google.com or
copilot.microsoft.com. There is no prompt set and no share-of-voice tracking.

**Do this before shipping any of the above**, or there is no baseline to
attribute lift to.

1. Add an AI-referrer dimension to the GA4 payload + a GA4 exploration.
2. Define ~25 buyer-intent prompts ("free receipt generator", "how do I replace
   a lost Walmart receipt", "makereceipt alternative", "receipt template for
   expense report") and run them weekly across ChatGPT, Perplexity, Gemini,
   AI Mode and AI Overviews. The DataForSEO MCP already exposes LLM-mention and
   ChatGPT-scraper endpoints if you want it automated.
3. Trend branded "makecepeit" impressions in GSC — the service account is
   already connected. That is the cleanest single GEO KPI you have.

## GAP 9 — Technical nits (cheap, low individual impact)

- **robots.txt:** nothing is blocked today, so no AI crawler is excluded. But
  add an explicit named allow block (OAI-SearchBot, ChatGPT-User, PerplexityBot,
  Perplexity-User, Claude-SearchBot, Claude-User, Bingbot, CCBot) so the intent
  is auditable and a future tightening of the `*` rule can't silently cut AI
  retrieval off.
- **llms.txt** omits `/compare`, `/alternatives`, `/pricing`, `/tools`,
  `/about` and `/blog` from "Main pages".
- **No `HowTo` schema** on "How to make a receipt in 3 steps" or on the
  lost-receipt step lists. Google dropped the rich result; models still parse it
  and it makes the steps individually extractable.
- **No `ImageObject`/descriptive alt** on the sample receipt images — the
  guide's 2027 multimodal point.
- **`Organization.sameAs`** should list every profile you own once GAP 7 lands.

---

## Sequence

The guide's own timing: on-page tactics show lift 2–4 weeks after re-crawl;
entity and off-page work compounds over months.

**Week 1 — baseline and the cheap structural wins**
GAP 8 (measurement first, so lift is attributable) · GAP 1 for the top ~20
uncited brands · GAP 5 visible review dates · GAP 9 nits.

**Weeks 2–4 — the tactics with measured lift**
GAP 1 remainder + templates + Sanity `{cite:}` wiring · GAP 2 statistics into
the top 30 pages · GAP 4 author entity · GAP 6 comparison expansion.

**Month 2–3 — the compounding work**
GAP 3 Receipt Field Report · GAP 7 directory listings, YouTube, Reddit.

Deliberately not doing: chasing a Wikipedia entry, and any further llms.txt
investment — the guide rates both as low-yield at this scale.
