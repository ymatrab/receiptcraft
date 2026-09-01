# SEO Action Plan — makecepeit.com (2026-09-01)

> **Status, end of 2026-09-01.** 11 of 15 items shipped the same day. The live
> tracker is the audit artifact, not this file — plans on disk go stale, and two
> items in this one already changed after contact with the data:
>
> - **H3 (scanner content)** was reversed by the owner: the page stays and keeps
>   ranking, because a scanning feature is planned and it becomes the link target
>   when it ships. Recorded in AGENTS.md as a standing exception to the intent gate.
> - **H1 (/brands growth)** turned out to have far less headroom than this file
>   assumes. Brand pages at position 1–10 already convert at 5.21%, but the whole
>   section shares 2,090 impressions and the striking-distance band holds 412.
>   Ranking work there buys perhaps 15–20 clicks a month.
> - **A "no contextual internal linking" finding was withdrawn.** It came from
>   counting link targets across all pages, where nav and footer dominate. Isolating
>   `<main>` shows 7–10 contextual links per page, and receipt-help pages already
>   link their brand page twice. No work was needed.
>
> Also found and fixed on the day, not in the original plan: **nine live claims
> promising "your first three" watermark-free downloads when the real limit is one**,
> and an article-agreement bug producing "Make a Applebee's Receipt" and
> "Generate a The Cheesecake Factory Receipt Online".

Ordered by expected revenue impact, not by effort. Written to respect the standing
rules: **fix pages, don't remove them** (301s only for competitor pages), and leave
the ~20 newest blog posts alone during bulk passes.

---

## CRITICAL — the binding constraint

### C1. Build a link profile (nothing else moves the head terms)
Bing Webmaster Tools reports **zero inbound links**. `/create` is a well-built page
sitting at position 77 for "receipt maker". On-page work is finished; links are the
only remaining lever on contested commercial terms.

- **First, verify** the zero-link reading against a second source before acting on
  it. DataForSEO is on hold (owner's call) and Semrush is exhausted — so either
  reopen one of those, or use a free check (Moz free tier, Ahrefs Webmaster Tools,
  which is free for a verified domain).
- Then pursue links the site can actually earn: the two free tools
  (`/tools/receipt-calculator`, `/tools/split-payment-checker`) and the
  `/guides/receipt-legality` page are the only genuinely linkable assets. Everything
  else is a template gallery, which nobody cites.
- **Do not** buy links or run a mass-outreach campaign — the site's trust position
  ("receipt generator") makes it a target for scrutiny, and a spammy profile is far
  worse than none.

**Effort:** high · **Impact:** this is the whole commercial ceiling.

### C2. Stop scaling the un-monetizable content type
July→August: impressions +55%, clicks +26%, CTR 0.86% → 0.70%. The batch is growing
the kind of traffic that cannot convert. Before publishing more `receipt-help` or
informational blog posts, check the target query is **creation** intent, not
**retrieval** or **definition** intent.

- Retrieval ("zara recover my receipt", "walmart receipt lookup") → user wants the
  merchant. Cannot convert.
- Definition ("amount tendered meaning") → SERP answers it. No click.
- Creation ("starbucks receipt template", "gas station receipt maker") → converts.
  This is what `/brands` already proves at 3.53% CTR.

**Effort:** none — it is a publishing gate · **Impact:** stops the CTR bleed.

---

## HIGH — do within a week

### H1. Put `/brands` on the growth path instead of `/receipt-help`
`/brands` earns 3.53% CTR at position 20.5 while `/receipt-help` earns 0.63% at
position 9.5. Brands convert because the query is "make me a Starbucks receipt".
Brand pages rank *worse* and earn *more* — so moving them up is the highest-yield
ranking work on the site. 230 brand pages currently draw only 2,380 impressions;
that is a position problem on a section that already converts.

### H2. Retarget the retrieval pages toward the creation query
Do not delete them. Each `receipt-help` page already has a "Recreate a lost {Brand}
receipt" section — that section is the product, and it is buried under the fold
beneath the policy answer. Restructure the ~23 zero-CTR page-1 pages so the
creation offer is above the fold and the title reflects what the visitor can
actually *do* here, then let the policy answer follow. Roughly 10/day as usual.

Start with the highest-impression set: zara-return-policy (1,655), sephora-lost-receipt
(1,077), zara-receipt-copy (851), ulta-beauty-receipt-copy (364),
publix-receipt-copy (274), united-airlines-receipt-copy (265).

### H3. Retire the scanner-app targeting
`/blog/best-receipt-scanning-apps` (610 impr, pos 76.6) chases people who want to
scan receipts, not make them. Rewrite it toward the creation intent rather than
competing with Expensify — or accept it as a non-converting page and stop linking
it prominently.

---

## MEDIUM — within a month

### M1. Shorten the 150 titles that truncate (28% of pages)
79 blog, 41 brands, 17 receipt-help titles exceed 60 characters; 24 exceed 70 and
are cut off in the SERP. Worst offenders repeat the brand name twice:
`"Urban Outfitters Receipt Generator — Create an Editable Urban Outfitters Receipt"`
(80ch). Given the CTR problem, a truncated title is a compounding loss.

### M2. Fix the llms.txt pricing grammar
`"the first 1 downloads are watermark-free"` appears twice in `/llms.txt`. This is
the sentence AI assistants quote verbatim when describing the pricing. Should read
"the first download is watermark-free".

### M3. Add a PageSpeed/CrUX API key
Performance is currently scored from transfer timings only. No field LCP/INP/CLS is
available, so a real Core Web Vitals regression would be invisible to these audits.

---

## LOW — backlog

- **L1.** ~203 impressions come from Boolean/quoted queries such as
  `"instacart" "receipt generator"` and `("panera bread receipt" or ...) (generator
  or t...)`. These are brand-protection monitoring tools, not customers. Harmless,
  but discount them when reading impression growth.
- **L2.** Two queries are verbatim searches for placeholder phone numbers printed on
  templates (`"(217) 555-0148"`, `"602-555-0124"`) — someone verifying a receipt
  they were handed. The numbers are correctly in the 555 reserved range; no action,
  worth knowing the checks happen.
- **L3.** `AGENTS.md` points at `app/sitemap.ts`, which no longer exists — the
  sitemap now lives in `app/sitemap/` + `lib/sitemap-sections.ts`. Update the doc so
  a cold session doesn't hunt for a missing file.

---

## What NOT to do

- **Don't delete or 301 the receipt-help pages.** They rank, they carry the domain's
  only topical footprint, and the standing rule is to fix rather than remove.
- **Don't rewrite the tags.** Title/meta/canonical/schema/alt coverage is already
  100% with zero duplicates. There is no on-page hygiene work left worth doing.
- **Don't chase more informational keywords** until the link profile can support the
  commercial ones.
