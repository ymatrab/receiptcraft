# Marketing Audit: Makecepeit

**URL:** https://www.makecepeit.com
**Date:** 2026-08-22
**Business Type:** Freemium tool-led micro-SaaS (SEO-acquired, single operator)
**Overall Marketing Score: 50.0/100 (Grade: D)**
**Prior audit:** 55.5/100 on 2026-08-18 — archived at `MARKETING-AUDIT-2026-08-18.md`

Method: five parallel analysis agents (content, conversion, competitive, technical,
strategy) against the live site, the local Next.js source on both `main` and `dev`, and
the Google Search Console API. Every finding in the Critical section was independently
re-verified by the orchestrator in a real browser before inclusion.

---

## Read this first

**Nobody can buy. Payments are switched off at the Shopify store.**

Loading a real checkout for the Weekly ($3.00) and Yearly ($39.00) plans returns, under
the payment heading:

> This store can't accept payments right now.

Verified 2026-08-22 in a real browser on live Shopify checkout URLs
(`shop.makecepeit.com/checkouts/cn/hWNFvdSyRekHMPRJ9ItoiZAh/…`), on two separate plans,
after the cart correctly showed the right price. The products exist, are `available: true`
and are priced correctly. The blocker is the store's payment configuration.

This reframes the entire business situation. "Zero paying customers" has been read for
weeks as a funnel, pricing or traffic problem. It is not. **It has been impossible to pay
this company money.** Every conversion, pricing, positioning and growth recommendation in
this document — and in the previous audit, and on the Notion board — is downstream of a
setting in the Shopify admin.

Nothing else on this list matters until that is fixed.

---

## Executive Summary

The score fell from 55.5 to 50.0, and it is important to be precise about why: **the site
did not get worse. This audit found things that were already true.** Six of the previous
audit's fixes genuinely shipped and are verifiably live — the template count is now derived
from the catalogue rather than hardcoded, the account gate is disclosed before the user
invests effort, the false ReceiptFaker comparison row is corrected, `/pricing` is now
linked from the homepage four times, the legality guide is published with eight primary
sources, and billing copy no longer states a renewal date the system cannot honour. That
work was real. The score dropped because three pre-existing, revenue-blocking defects were
found this time and missed last time.

**The three defects, in order of severity.** First, payments are disabled at Shopify, as
above. Second, the AI receipt generator — the product's single headline differentiator,
the one feature six named competitors lack — returns **HTTP 502 in production**. It is
advertised on the homepage hero, on `/create` as "Free to try", on `/pricing` as the
unlimited Pro benefit, in the competitor comparison table, and across four blog posts. All
of those are currently false statements. Third, the entire Shopify fulfilment layer —
the webhook that grants Pro automatically, the post-payment landing page, and the
server-side GA4 `purchase` event — exists on `dev` and was **left behind in a cherry-pick
to `main`**. `/pro-activating` and `/api/shopify/webhook` both return 404 in production.
Eighteen of twenty-one `dev` commits have twins on `main`; the three that don't are exactly
the three that turn a payment into access.

**The trust picture at the point of sale is worse than any copy problem on the site.** The
storefront a buyer is sent to, branded "Makecepeit", lists twenty-one products — eighteen
of which are Instagram and TikTok follower packages from $2.49 to $319.00. The three
receipt plans sit among them with no product image, no description, and vendor "My Store".
The shop's refund policy and terms of service both 404. A buyer who reaches checkout sees
a follower-selling storefront, an unbranded line item, no policies, and then a message
saying payment is impossible.

**The good news is genuinely good, and it corrects a strategic assumption everyone has
been working from.** Search Console's page dimension shows `/brands/*` — believed to be
informational — are in fact the product's commercial template pages, carrying H1s like
"DHL Receipt Generator" and CTAs reading "Use This Template — Free". They earn **87 of 238
clicks at a 3.53% CTR**, five times the sitewide average, from only 6.8% of impressions.
The audience is not wrong. The intent match is as clean as this market offers. What is
broken is position — every commercial head term sits at rank 26–88 — and, underneath that,
the fact that 49% of the URL corpus is spun from about ten templates while the pages that
actually rank are the ones carrying hand-researched facts.

**Top three actions.** (1) Turn on payments in the Shopify admin and place one real $3 test
order end to end. (2) Restore the AI generator or remove every claim that it works. (3)
Merge the three orphaned fulfilment commits so a sale grants access and registers as
revenue. Combined, these are roughly one working day and they are the difference between a
business that cannot transact and one that can.

---

## Score Breakdown

| Category | Score | Prior | Weight | Weighted | Key Finding |
|---|---|---|---|---|---|
| Content & Messaging | 63/100 | 64 | 25% | 15.75 | Real fixes shipped, but 231 brand pages still promise "no sign-up" and every AI claim on the site is currently false |
| Conversion Optimization | 20/100 | 45 | 20% | 4.00 | Payments are disabled at Shopify; the fulfilment layer that grants access was left out of the production merge |
| SEO & Discoverability | 64/100 | 75 | 20% | 12.80 | Technical hygiene near-90, but the head term is split across five URLs and 49% of the corpus is spun |
| Competitive Positioning | 58/100 | 50 | 15% | 8.70 | Cheapest yearly with the largest library — never stated; and a false rival pricing claim is live on the best-converting page |
| Brand & Trust | 45/100 | 50 | 10% | 4.50 | Editorial layer is category-best; the checkout sells Instagram followers and has no refund policy |
| Growth & Strategy | 42/100 | 30 | 10% | 4.20 | `/brands` converts at 3.53% and nobody knew; but there is no email capability, no loop, and no way to take money |
| **TOTAL** | | **55.5** | **100%** | **50.0/100** | **Grade D — the transaction layer is non-functional** |

Movement is explained by discovery, not regression. Competitive and Growth rose on shipped
work and better data. Conversion collapsed because payments were found to be off. SEO fell
from 75 because the spun-corpus and cannibalisation findings are new understanding of a
pre-existing condition, not new damage.

---

## Critical — Fix Before Anything Else

These are verified production defects. They are not ranked by effort; they are ranked by
what blocks revenue.

### C1. Payments are disabled at the Shopify store
**Evidence:** live checkout, both plans, 2026-08-22: "This store can't accept payments
right now." Cart total renders correctly ($3.00 / $39.00); variants are `available: true`.
**Impact:** 100% of revenue. No customer can complete a purchase and none could have.
**Fix:** Shopify admin → Settings → Payments. Activate a provider, then place one real $3
order and refund it. **~30 minutes. Nothing else on this list matters first.**

### C2. The AI generator returns 502 in production
**Evidence:** `POST https://www.makecepeit.com/api/ai/generate` → `HTTP 502`,
`{"error":"Couldn't generate that one — please try again in a moment."}`.
**Impact:** the headline differentiator does not work, and it is sold as the primary Pro
benefit on `/pricing`. The moment C1 is fixed, this becomes a paid customer paying for a
feature that 502s. It is also advertised on the hero, on `/create` ("Free to try"), in the
comparison table, and in four blog posts.
**Fix:** this matches a known failure mode — the Gemini free-tier key being zeroed. Rotate
the key and confirm the model in `/admin/settings`. If it cannot be restored today, **pull
every AI claim from the hero, `/pricing`, `/create` and the comparison table** rather than
leave false statements live. **~1 hour either way.**

### C3. The fulfilment layer never reached production
**Evidence:** `git cat-file -e main:lib/shopify.ts` → not found. `/pro-activating` → 404.
`/api/shopify/webhook` → 404. `git grep '"purchase"' main` → nothing. Eighteen of twenty-one
`dev` commits have content-identical twins on `main`; the three without are `b7b8de8`
(webhook), `40d320e` (post-payment landing), `b392566` (server-side GA4 purchase).
**Impact:** once C1 is fixed, every sale is hand-processed through six manual operator
steps, the buyer lands on a bare Shopify page and is still Free when they return, and the
sale is invisible to GA4 **permanently** — production never sets `attributes[ga_client_id]`,
so the session join is destroyed at sale time and cannot be reconstructed later.
**Fix:** merge those three commits to `main`, then point Shopify's thank-you URL at
`/pro-activating`. **~2 hours including a real test order.** This is a merge, not a build.

### C4. The checkout storefront sells Instagram followers
**Evidence:** `shop.makecepeit.com/collections/all` — 21 products, 18 are Insta/TikTok
follower packages ($2.49–$319.00). The three Makecepeit plans have **no image, no
description, vendor "My Store"**. `shop.makecepeit.com/policies/refund-policy` → 404;
`/policies/terms-of-service` → 404.
**Impact:** the highest-intent moment in the funnel presents a storefront that reads as a
follower-selling shop with no policies. This is a trust break no amount of on-site
credibility work can offset.
**Fix:** hide the follower products from the storefront (or move the plans to a dedicated
sales channel), give each plan an image and a one-line description, set the vendor, and
publish refund + ToS pages. **~1 hour.**

### C5. A false competitor pricing claim is live on the best-converting page
**Evidence:** `/blog/receiptbaker-alternative` (13% CTR, position 10.9 — the site's
highest-converting competitor page) states ReceiptBaker "hides its pricing". ReceiptBaker
publishes $5/wk and $12/mo, fetched live this session. The site's own
`/compare/receiptbaker` says the opposite — two contradictory claims, and the false one is
the one that ranks.
**Impact:** this re-creates the exact August 2026 incident that `AGENTS.md` exists to
prevent, on the single page best positioned to convert rival-brand demand.
**Fix:** correct the claim and reconcile it against `/compare/receiptbaker`. **~15 minutes.**

Also live and wrong, same class, from the competitive analysis: ReceiptBaker is marked ✓ on
"Named-brand templates" when they have none — giving away the one row Makecepeit wins
outright; their `no_signup` is marked "Not confirmed" when their homepage says "No signup
required"; `/alternatives` is titled "**7** Best Receipt Generators" and renders **6**; and
the ExpressExpense "$9–$49/mo" figure is unsourced on a page that promises every figure
links to its source.

### C6. The homepage hero CTA is clipped off-screen on phones under 412px
**Evidence:** measured live — `grid-template-columns: 380px` inside a 343px content box
puts the CTA's right edge at 396px. Clipped 21px at 375, 6px at 390, 36px at 360.
`scrollWidth === clientWidth`, so it cannot be scrolled to. Two independent causes: the
hero receipt's hard `widthPx: 380` (`lib/sections.ts:400`, used at `app/page.tsx:490`) and
`HomeAiGenerator.tsx:51`. The codebase already narrows this document at `page.tsx:63` and
`pricing/page.tsx:75` — the hero was missed.
**Fix:** `minmax(0,1fr)` on `app/page.tsx:427` resolves it to exactly 343px. **~30 minutes.**

---

## Quick Wins (This Week)

1. **Turn on Shopify payments** — C1. 30 min. Blocks everything.
2. **Rotate the AI key or pull the AI claims** — C2. 1 hr.
3. **Merge the three fulfilment commits and set the thank-you URL** — C3. 2 hrs.
4. **Clean the storefront: hide follower products, add plan images and descriptions,
   publish refund + ToS** — C4. 1 hr.
5. **Fix the ReceiptBaker pricing claim and the four other false comparison cells** — C5. 30 min.
6. **Unclip the mobile hero CTA** — C6. 30 min.
7. **Change the internal anchor text pointing at `/create`.** 2,242 internal links point
   there (`Header.tsx:78`, `:126`; `Footer.tsx:93` × 1,121 URLs) and **not one contains
   "receipt generator" or "receipt maker"** — they all read "Create Receipt" or "Receipt
   Builder". Two string edits. 15 min, and it is the highest-leverage SEO change available.
8. **Fix the 231 brand-page meta descriptions still promising "no sign-up."**
   `lib/brands.ts:5859` pads descriptions via `RECEIPT_PADS`; live `/brands/dhl` ends
   "…no sign-up to start. Free — no sign-up." This is the claim the hero and `/create`
   were corrected to stop making. 1 hr.
9. **Add the `preformatted` flag to blog metas** — `app/blog/[slug]/page.tsx:96` lacks the
   fix applied to receipt-help on 2026-08-20; three of six sampled truncate mid-clause. The
   blog carries ~88% of impressions. 30 min.
10. **Give the hub pages their own OG tags** — `/templates`, `/brands`, `/examples`,
    `/blog`, `/tools` all share the homepage `og:title`/`og:description`. `/brands`, the
    348-store asset that beats every competitor, currently shares as generic homepage copy.
11. **Replace the broken FrogDR badge** — `frogdr.com/makecepeit.com/badge-white.svg`
    returns 503 on retry, and so does its link target. The one section whose job is
    credibility renders a broken image.
12. **Link the legality guide.** `/guides/receipt-legality` is the best page on the site —
    eight primary sources, each cited to the claim it backs — and has exactly **one**
    internal link, from `Footer.tsx:143`. It gets 34 impressions and 1 click per month.

---

## Strategic Recommendations (This Month)

1. **Resolve the head-term cannibalisation.** `/`, `/create` and `/blog/receipt-maker-free`
   all open their `<title>` *and* their H1 with the literal string "Free Receipt Maker", and
   the product declares WebApplication/SoftwareApplication schema four separate times.
   Google has already chosen: `/blog/best-receipt-maker-reddit` ranks 12.7 with clicks;
   `/create` ranks 79.3 with none. Pick one canonical target per term, differentiate the
   other two, and consolidate the schema.

2. **Stop spinning pages and start researching them — the site contains its own controlled
   experiment.** `/receipt-help/*` is programmatic (220 pages from `BRANDS.flatMap`) *and*
   ranks at positions 6–10, because 73 of 76 brands carry hand-researched `BRAND_FACTS`
   lookup paths and official-source citations. The generated half — `/brands/*` from ten
   title variants, ten descriptions and one identical FAQ answer (`lib/brands.ts:5851`),
   plus 316 more from `lib/examples.ts:127-186` — is 549 of 1,121 URLs, 49% of the corpus.
   The lesson is not "informational beats commercial". It is **"researched beats
   substituted"**. Backfill facts into the highest-impression `/brands` pages rather than
   publishing more.

3. **Fix the pricing page's conversion mechanics.** On a phone the first price is 2.64
   screens down and the first buy button 3.46 screens down. The buy button is the *smallest*
   on the page (129px vs 262px for "Start free") because `PricingCta` renders a `<button>`
   and `block` doesn't fill one. The critical "check out using the same email" instruction —
   the only thing linking a payment to an account — sits **911px below** the first buy
   button. Logging in from `/pricing` drops the chosen plan and returns the user to the top.

4. **List on the directories.** Zero third-party presence was confirmed — nothing on
   Reddit, Product Hunt, AlternativeTo, G2, Trustpilot or SaaSHub. Meanwhile SaaSHub's
   Receiptmakerly-alternatives page lists 13 rivals with ratings and ranks for the query
   Makecepeit converts at 10.5% on. One action ranks for all fifteen rival names and doubles
   as the missing referring domains.

5. **Track ReceiptMakr.** The closest competitor is entirely absent from the comparison
   layer: 200+ named-brand templates, PNG+PDF, no signup, and a persistent lawful-use banner
   above the nav — i.e. they already occupy the legitimacy position this site treats as
   unclaimed. They charge 3.75× more ($99/yr vs $39).

6. **Un-orphan `/compare/*`.** All the child pages return 200, are `index, follow`,
   self-canonical, prerendered and in the sitemap — they are orphaned, not unindexed. Zero
   homepage, footer or brand-page links point at them, and `lib/related-posts.ts:44-46`
   points them *out* to their own cannibalising blog duplicates. Note **`/compare` itself is
   a 404** — its zero impressions are structural, not a ranking problem.

7. **State the price advantage.** Cheapest yearly and joint-cheapest monthly in a
   ten-product market, with the largest verified template library — and the site never says
   so. Caveats to stay honest about: ReceiptGenerator.io ties at $7.99/mo with 300+
   templates, and ReceiptBaker ships photorealistic AI renders this product does not.

---

## Long-Term Initiatives (This Quarter)

1. **Build a way to send email.** `main:package.json` contains no Resend, SendGrid,
   Postmark, nodemailer or Mailgun, and no send call exists anywhere. The footer newsletter
   upserts addresses to Supabase with an `unsubscribed_at` column for mail that cannot be
   sent. Until this exists there is no retention, no nurture, no receipt delivery, no
   dunning, and no path to the deferred renewal work. It is the single largest missing
   capability in the business.

2. **Decide the free-tier meter deliberately, once measurement works.** The job this
   audience has is "one receipt, once", and the free tier grants three watermark-free HD
   downloads — so the median winner of this traffic never meets the paywall. Cutting the
   meter from 3 to 1 is the only lever that monetises traffic that already exists, it is a
   day's work, and it sits inside the locked constraints (no price change, no new product).
   **But do not ship it until C1 and C3 are done** — with no `purchase` event, its effect
   cannot be measured, and shipping an unmeasurable pricing change to a business with zero
   baseline is how you learn nothing twice.

3. **Rebuild the proof layer.** Zero testimonials sitewide. The one countable number was
   added (`648a99b`) and removed (`9116782`) twenty-seven minutes later, leaving eight
   launch-directory badges — one of which is broken — as the entire social proof surface.
   Once C1 is fixed and real customers exist, capturing their words is the highest-value
   content work available.

4. **Consolidate or prune the spun corpus.** 49% of URLs generated from ten templates is
   scaled-content-abuse exposure and a site-quality drag. Note honestly: the causal link
   between corpus quality and the homepage sitting at position 75.8 is the most parsimonious
   explanation available, not a confirmed fact.

---

## Detailed Analysis by Category

Full per-agent findings, with evidence and before/after copy, are in the session scratchpad:
`agent-content.md`, `agent-conversion.md`, `agent-competitive.md`, `agent-technical.md`,
`agent-strategy.md`.

### Content & Messaging — 63/100

Genuine progress: the template count derives from the catalogue, the account gate is
disclosed in four places before the user invests effort, and `/guides/receipt-legality`
cites Cal. Civ. Code § 1499, RCW 59.18.063, IRS Pub 463/583/1771 and 15 U.S.C. § 1681c(g),
each to the specific claim it backs. That guide is category-best work.

Against that: `/blog/best-receipt-maker-reddit` publishes a buying checklist — "Free tier
that produces a clean, watermark-free document. No account required to generate and
download" — and then claims Makecepeit satisfies it, with a stale "40+ real-format
templates". It satisfies neither item. `/blog/best-free-receipt-generator` recommends a
competitor by name. 231 brand pages still promise "no sign-up". Content is two-tier and the
newer tier is weaker: the Aug 13–19 "{X} Receipt Generator" cluster runs ~2,400 words each
on an identical H2 skeleton with zero outbound citations, and
`/blog/dental-payment-receipt-generator` makes uncited HSA/FSA/insurance claims. All 172
guides carry one byline with no credential or external profile.

### Conversion Optimization — 20/100

The full production buyer journey, walked step by step: homepage → `/pricing` (now linked
4×, previously zero — a real fix) → on mobile the first buy button is 3.46 screens down and
is the smallest button on the page → not logged in, so `/login?next=/pricing` with **no
plan carried**, back to the top → `shop.makecepeit.com/cart/<variant>:1?checkout[email]=…`,
where email is the *only* link to the account → an imageless, description-less line item in
a storefront selling Instagram followers, with no refund policy → **"This store can't accept
payments right now."**

And if it did accept payments: Shop Pay, PayPal, Apple Pay and Google Pay all overwrite the
prefilled email; production sets no `attributes[user_id]` and has no `pending_orders` table,
so an unmatched order is recorded nowhere; `/pro-activating` 404s so the buyer lands on a
bare Shopify page and returns still Free; fulfilment is six manual operator steps; and
`grantPro` derives the plan from a days/months field rather than from the order.

The best-built part of the funnel is the *download* gate — disclosed before effort, draft
survives login via `rc_pending_export` with a resume banner, and the watermark modal offers
a real third option. The pricing flow should copy that pattern wholesale.

### SEO & Discoverability — 64/100

Technical hygiene is near-90: robots, canonicals, redirects, schema, SSR parity, sitemap
and compression all correct. Googlebot and Chrome receive byte-identical HTML (132,721
bytes, 1,035 SSR words, real H1, JSON-LD). Four intuitive explanations for the money-page
collapse were tested and **disproven**: it is not link starvation (`/create` receives ≥2,242
internal links versus 4–6 for a `/receipt-help` page that outranks it by 70 positions — a
~400:1 ratio in the wrong direction), not JS rendering, not canonicals (the
`app/layout.tsx:34` root-canonical footgun is present but every one of 42 routes overrides
it correctly), and not indexation.

The actual causes are the three compounding layers in Strategic #1, #2 and Quick Win #7.

**The CTR "decline" was a misreading, and this corrects the previous audit.** The 15,054
new impressions converted at 0.379% at an implied position of 15.5 — page two, where the
curve predicts 0.3–0.6%. The base cohort lost **zero** clicks. Titles are exonerated;
position is the entire story. The previous audit's projected "+80 clicks from six meta
rewrites" would require 4.5% CTR from the known page-one pool; the realistic ceiling is
+25–40.

Two latent items: `/compare` returns 404 (no index route exists), and the IndexNow cron has
a same-day trap — date-only constants resolve to `T00:00Z` while the watermark advances to
06:00 UTC, so anything stamped "today" and deployed after 06:00 UTC is skipped permanently.
The 2026-08-21 batch escaped by about 3.5 hours.

### Competitive Positioning — 58/100

See the comparison table below. Corrections to previously-published claims: MakeMyReceipt
now publishes $4.50/wk and $9/mo with a watermarked free tier (the prior "pricing blog only,
free download no account" is wrong); ReceiptGenerator.io's one-time option is referenced in
their FAQ but unpriced, and their monthly is **$7.99 — identical to this site's**; the
referring-domain counts of 372/109/3 are **unverified this session and should not be
republished**.

### Brand & Trust — 45/100

The editorial and legitimacy layer is the strongest in the category and verifiably live.
The proof layer is zero: no testimonials, no user counts, one broken badge. And the
payment-adjacent trust picture — a follower-selling storefront, no refund policy, no ToS,
an unbranded line item — undoes it. `/terms:51` says payments are "non-refundable" while
the `/pricing` FAQ offers refunds. The response promise is inconsistent in the wrong
direction: "within one business day" on `/pricing` and `/account`, "a couple of business
days" on `/contact` — the looser promise sits in front of the sale. Sara Artheta's byline
resolves to a page on makecepeit.com and nowhere else, with no photo and no `sameAs`.

### Growth & Strategy — 42/100

**The strategic premise everyone has been working from is wrong, and this is the audit's
most useful correction.** `/brands/*` are not informational pages. `/brands/dhl` carries the
H1 "DHL Receipt Generator" and the CTA "Use This Template — Free", and its queries are
"chipotle receipt generator", "amazon receipt generator". By GSC page dimension (815 rows,
238 clicks, complete — unlike the query dimension, which is 94% anonymised):

| Section | Clicks | % | Impressions | CTR |
|---|---:|---:|---:|---:|
| /receipt-help | 95 | 39.9% | 17,359 | 0.55% |
| **/brands** | **87** | **36.6%** | **2,467** | **3.53%** |
| /blog | 34 | 14.3% | 10,347 | 0.33% |
| /create | 0 | 0% | 950 | 0.00% |

The split is ~59% informational / **~41% commercial**, and the commercial section has the
highest CTR on the site at 5.4× the sitewide average. The audience is right. Position is
wrong: "receipt maker" sits at 88.4, "create a receipt" at 87.9, `/create` at 79.3.
`/brands` wins clicks only where individual pages happen to rank 1–10.

Zero customers at 238 clicks/month is also, separately, the expected arithmetic outcome
(~0.1–0.3 sales/month) — so even with payments working, this traffic volume was never going
to produce a visible customer count. That does not excuse C1; it means C1 has been masking
a second, slower problem.

---

## Competitor Comparison

Every cell fetched live 2026-08-22. Cells marked UNVERIFIED could not be confirmed and
should not be published.

| | **Makecepeit** | **ReceiptMakr** | **ReceiptGenerator.io** | **MakeMyReceipt** | **ReceiptBaker** | **ReceiptFaker** | **ReceiptMake** | **Receiptmakerly** |
|---|---|---|---|---|---|---|---|---|
| Tracked by site? | — | **No** | **No** | **No** | Yes | Yes | **No** | Card |
| Templates | 348 brand | 200+ brand | 300+ | 194+ | Category only | 100+ | 100+ | 50+ |
| Named-brand? | Yes | Yes | Yes | Yes | **No** | Yes | Yes | UNVERIFIED |
| AI generator | **Yes (502 in prod)** | No | No | No | **Yes** + photorealistic | No | No | No |
| Weekly | **$3.00** | $6.99 | — | $4.50 | $5.00 | $6.50 | $4.50 | — |
| Monthly | $7.99 | $14.99 | $7.99 | $9.00 | $12.00 | $13.50 | $9.00 | $8.90 |
| Yearly | **$39** | $99 | $59.99 | — | — | $60 | — | $47 |
| One-time | No | No | FAQ only | No | No | No | **$22.99 lifetime** | No |
| 3rd-party listed | **None found** | UNVERIFIED | SaaSHub (10) | SaaSHub (4) | UNVERIFIED | SaaSHub (3) | UNVERIFIED | own page |

MakeReceipt and ExpressExpense are excluded: both `/pricing` and `/membership` 302 to their
homepages, so no price could be verified. There is strong circumstantial evidence they are
one operator (identical chrome, identical "84 countries" claim), which would mean
`/alternatives` double-counts one rival as two of its six.

---

## Revenue Impact Summary

Honest framing: with payments disabled and zero customers, there is no conversion rate to
improve and no baseline to project from. Any dollar figure here would be invented. What can
be stated is the ordering and what each item unblocks.

| Recommendation | Effect | Confidence | Effort |
|---|---|---|---|
| C1 — enable Shopify payments | Makes revenue possible at all. Current ceiling is $0. | Certain | 30 min |
| C3 — merge fulfilment commits | Makes revenue *measurable* and access automatic; removes 6 manual steps per sale | Certain | 2 hrs |
| C2 — restore AI or pull the claims | Removes false advertising on the primary Pro benefit | Certain | 1 hr |
| C4 — clean the storefront | Removes the worst trust break in the funnel | High | 1 hr |
| C5/C6 — false claims, clipped CTA | Correctness, and restores the mobile CTA on ~40% of phones | High | 1 hr |
| Quick Win 7 — `/create` anchor text | Highest-leverage SEO edit available; 2,242 links currently carry no keyword | Medium | 15 min |
| Free-meter 3 → 1 | Only lever that monetises existing traffic — **after** C1 and C3 | Medium | 1 day |
| Email capability | Unblocks retention, nurture, renewal — currently impossible | High | 1 week |

At 238 clicks/month, the realistic near-term outcome even with everything fixed is a
low single-digit number of sales. **The purpose of this week's work is not to grow revenue.
It is to make revenue possible and observable**, so that the traffic work has something to
report into.

---

## What Could Not Be Verified

- **Core Web Vitals were not re-measured.** PageSpeed Insights returned HTTP 429 (keyless
  quota) and no CrUX key was available. The prior audit's 95–97 mobile is cited as *prior*,
  not current.
- **No search-volume or SERP data.** DataForSEO is on hold by the owner and Semrush's
  balance is exhausted, so competitor-brand demand could not be sized. The observable base
  is only ~50 impressions/28d on rival-name queries; true addressable demand is unknown.
- **No backlink data.** The 372/109/3 referring-domain figures from the prior audit are
  unverified and should not be republished.
- **Whether Sara Artheta is a real person**, and whether the FrogDR 503 is permanent.
- **Any sale since 2026-08-18** — no Shopify admin access; and subscriber/user counts, which
  are admin-gated.
- **Whether GA4/Clarity behavioural data contradicts any of this** — not queried.
- **Site-level quality demotion is inference, not fact.** The spun-corpus scale and the
  receipt-help/brands contrast are both measured; the causal link to position 75.8 is the
  most parsimonious explanation, not a confirmed one.

---

## Next Steps

1. **Open the Shopify admin and turn on payments.** Place one real $3 order, confirm it
   completes, then refund it. Until this is done, every other item on this list is
   theoretical.
2. **Rotate the AI key** — or, if it cannot be restored today, remove every AI claim from
   the hero, `/pricing`, `/create` and the comparison table.
3. **Merge `b7b8de8`, `40d320e` and `b392566` to `main`** and point Shopify's thank-you URL
   at `/pro-activating`, so the next sale grants access by itself and appears in GA4.

*Generated by AI Marketing Suite — `/market audit`*
