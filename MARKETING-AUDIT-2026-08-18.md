# Marketing Audit: Makecepeit

**URL:** https://makecepeit.com
**Date:** 2026-08-18
**Business Type:** Freemium tool-led micro-SaaS (SEO-acquired, single operator)
**Overall Marketing Score: 55.5/100 (Grade: C)**

Method: five parallel analysis agents (content, conversion, competitive, technical,
strategy) working against the live site, the local Next.js source, the GSC API, and
live fetches of 10 competitors. Every code-level claim in the Critical section was
independently re-verified by the orchestrator before inclusion.

---

## Executive Summary

**Makecepeit is not under-built. It is under-connected.**

That is the finding that survived all five analyses, and it is the reason the score is
a C rather than a D. Almost nothing here is missing. There are 348 named-brand receipt
templates — more than any competitor in the market, including ReceiptGenerator.io's
300+, ReceiptMakr's 200+ and ReceiptFaker's 100+. There is an AI generator that six
named rivals lack entirely. There are ~140 published articles, an editorial policy,
named authors, and free tools. Core Web Vitals are healthy at 95–97 mobile. GA4,
Microsoft Clarity and Vercel Analytics are all live with a real, fully-wired funnel
event taxonomy. A comparison layer exists with better editorial ethics than any
competitor roundup fetched during this audit.

The failures are all at the **seams between these assets**. The 348-template library is
advertised to Google as "100+". The AI generator appears twice in the entire homepage
file and never above the fold. The `/pricing` page receives zero links from the homepage
or footer. The GA4 funnel is instrumented right up to `begin_checkout` and then stops —
there is no `purchase` event anywhere in the codebase, so the question "does my SEO
traffic produce paying customers?" is currently unanswerable. The comparison pages are
outranked by the site's own blog duplicates of themselves. The legitimacy positioning —
the single most defensible asset against a competitor named ReceiptFaker — sits six
sections below the fold.

**The biggest single lever is CTR, not rankings.** The site earns 34,387 Google
impressions per month and converts them to 254 clicks — a 0.74% click-through rate. Two
independent agents traced this to the same mechanical cause: `lib/seo-description.ts`
truncates meta descriptions mid-clause, and on the definitional pages the descriptions
*fully answer the query inside the snippet*, so Google satisfies the searcher without a
visit. `/blog/amount-tendered-meaning` sits at position 5.7 with 1,330 impressions and
2 clicks. Fixing description copy on six known page-1 zero-CTR URLs is worth roughly +80
clicks/month (+31% site traffic) with no ranking change at all. This is copy work, not
SEO work, and it is the cheapest traffic available to this business.

**Three customer-facing defects outrank every optimization in this report.** Manual Pro
provisioning writes `stripe_customer_id: "manual"` into a schema that assumes Stripe.
The consequence is that the "Manage billing" button throws a 500 for every manually
granted paying customer — while `/pricing` FAQ promises they can "cancel anytime from
your account page". The same grant sets `cancel_at_period_end: false`, so the account
page tells those customers their plan **"Renews on {date}"** when nothing renews a manual
grant. And a native `window.confirm()` dialog fires at peak purchase intent, with
`analytics.beginCheckout()` called *after* the bail-out branch, so everyone it scares off
is invisible. These are verified in source, they affect people who have already paid, and
they should be fixed before any growth work begins.

**Honest scale note.** At ~254 organic clicks and ~400–600 sessions per month, this is a
pre-traction business. Percentage lifts are the correct unit; dollar projections at this
volume would be fiction. The pricing restructure recommended below is worth perhaps
+$15–25/month today — it is worth shipping because it takes about four hours, removes an
auto-renew chargeback vector, and is worth $250–400/month at 5,000 sessions. The binding
constraints are **traffic and measurement**, not price points.

---

## Score Breakdown

| Category | Score | Weight | Weighted | Key Finding |
|---|---|---|---|---|
| Content & Messaging | 64/100 | 25% | 16.00 | Meta descriptions close the loop — searchers get the answer in-SERP and never click |
| Conversion Optimization | 45/100 | 20% | 9.00 | Hard login wall lands after 1–3 minutes of invested work, on a draft stored only in localStorage |
| SEO & Discoverability | 75/100 | 20% | 15.00 | Technically healthy; the gap is marketing-technical — no `purchase` event, no blog OG images |
| Competitive Positioning | 50/100 | 15% | 7.50 | Best substance, worst presence: 348 templates and an AI edge, both invisible |
| Brand & Trust | 50/100 | 10% | 5.00 | Zero testimonials, zero user counts sitewide; proof is 7 launch-directory badges |
| Growth & Strategy | 30/100 | 10% | 3.00 | Subscription-only pricing against a one-off job; manual provisioning caps scale |
| **TOTAL** | | **100%** | **55.5/100** | **Grade C — significant gaps, strong foundation** |

---

## 🔴 Critical — Fix Before Anything Else

These are verified production defects affecting paying customers. They are not ranked by
revenue upside; they are ranked first because they damage people who already paid.

### C1. "Manage billing" returns a 500 for every manually-granted Pro customer
`app/admin/members/actions.ts:31` writes `stripe_customer_id: "manual"`. The portal guard
at `app/api/stripe/portal/route.ts:32` is `if (!sub?.stripe_customer_id)` — the string
`"manual"` is truthy, passes the guard, and line 37 calls Stripe with
`customer: "manual"`, which throws.

Meanwhile `/pricing` FAQ states: *"Manage or cancel your subscription anytime from your
account page."* That is the page whose button errors.

**Fix:** guard on a real Stripe id, and for manual grants render a "Contact support to
cancel" mailto instead of the portal button.
```ts
if (!sub?.stripe_customer_id || sub.stripe_customer_id === "manual") { /* hide portal */ }
```

### C2. Manual customers are told their subscription renews when it does not
`actions.ts:35` sets `cancel_at_period_end: false`; `app/account/page.tsx:66` renders
`{sub.cancel_at_period_end ? "Cancels" : "Renews"} on {date}`. Every manual grant
therefore displays **"Renews on {date}"**. Nothing renews a manual grant — access simply
stops. If the Shopify side *is* recurring, the customer keeps being charged past the date
with no access.

**Fix:** add a `source: 'manual'` column and render "Access until {date}" for it.

### C3. A native OS dialog sits at peak purchase intent — and hides its own damage
`app/pricing/PricingCta.tsx:55` fires `window.confirm()`; line 59 is `if (!ok) return;`;
`analytics.beginCheckout()` is line 62. Abandonment at the dialog is therefore never
recorded.

```
upgrade_click → [window.confirm — drop-off INVISIBLE] → begin_checkout → [no purchase event]
   tracked            PricingCta.tsx:55-59                  line 62            MISSING
```

**Fix:** delete the `confirm()`; move the disclosure into the page as static text above
the button.

### C4. Automate Pro provisioning
Pro is granted by hand in admin after Shopify checkout. The Stripe webhook path is
already written and working. Manual provisioning is the root cause of C1 and C2, delays
time-to-value for every buyer, and makes each new customer a dispute candidate. With no
backup processor, one Shopify review event is 100% of revenue.

---

## Quick Wins (This Week)

**1. Standardise the template count — and use the true number: 348.**
Currently stated five contradictory ways: "40+" (`app/page.tsx:156`), "100+"
(`app/page.tsx:422`, `:458`, `lib/site.ts:7`, `app/opengraph-image.tsx:48`), "348 brand
layouts" (stat strip), "350+" (`app/alternatives/page.tsx:172`, `:282`). Verified count
in `lib/brands.ts` is **348 unique brand slugs**.
The site-wide meta description advertises the market-leading asset at under a third of
its size. *Impact: CTR on every page, plus the one claim that beats every competitor.*

**2. Fix the self-defeating comparison table.**
`lib/comparisons.ts:207` and `:223` credit ReceiptFaker with "100+ retailer templates" —
while makecepeit's own count is rendered as "100+" too. The comparison page presents you
as **tied** on library size when you have 348 and they have ~100. One-line fix.

**3. Stop meta descriptions from closing the loop.**
`lib/seo-description.ts` pads to 150–160 chars with filler ("Editable.", "Read on.",
"See more.") or truncates mid-clause. Live examples: `/receipt-help/zara-receipt-copy`
(pos 8.0, 1,242 impr, 2 clicks) ends *"…or make a new Zara receipt for your…"*.
Definitional pages are worse — they answer fully in-snippet.
Hand-write the top ~30 by impressions: confirm relevance in six words, then open a gap.
*Impact: ~+80 clicks/month on six known URLs alone (+31% traffic), no ranking change.*

**4. Link `/pricing` from the homepage and footer.**
Grep-confirmed: zero links from `app/page.tsx` or any footer. All 7 internal links come
from `/contact`, `/compare`, `/account` and in-builder paywalls. The most-visited page
never points at the offer.

**5. Disclose the account gate on template and brand pages.**
`/templates/[slug]` has no mention of the download requirement; the CTA reads "Use This
Template — Free". `app/page.tsx:148` confirms *"Create a free account to download."*
Add that sentence under the CTA. This is the source of the "no sign-up is misleading"
bounce flagged in the July audit.

**6. Give the ~140 blog posts an OG image.**
`generateMetadata` passes `images: undefined`, which suppresses the root
`opengraph-image.tsx` fallback, so every post emits `twitter:card=summary_large_image`
with no image. On 3 referring domains, that is self-inflicted.

**7. Put the AI generator above the fold.**
"AI" appears twice in the entire homepage file, never in the hero. MakeReceipt,
ReceiptFaker, ExpressExpense, MakeMyReceipt, ReceiptMakr and ReceiptMake all lack AI
entirely. It is the hardest-to-copy edge against the two highest-authority rivals.

---

## Strategic Recommendations (This Month)

**S1. Close both ends of the revenue funnel.**
Send a server-side `purchase` event to GA4 via Measurement Protocol from
`app/api/stripe/webhook/route.ts` on `checkout.session.completed` and from the manual
grant action. Persist the `_ga` cookie as `client_id` at `begin_checkout` so the hit
joins the original session. Until this exists, no acquisition decision on this site can
be evaluated.

**S2. Fix the signup dead-end.**
`app/login/LoginForm.tsx:88` calls `setVerifyEmail()` and tells the user to come back and
log in — but the auth callback signs them in automatically, so that instruction is false.
Additionally, the branch lacks a `data.session` check; if email confirmation is ever
disabled in Supabase, verified-and-logged-in users will be shown a "check your email"
wall. *(Conditional on your Supabase auth settings — worth confirming which mode is live.)*
Also: default to `signup` mode when `?next=` is present, and prefer a 6-digit OTP in-tab
over a magic link, because the draft lives only in that browser's `localStorage` and dies
if the link opens in a Gmail webview.

**S3. Resolve the comparison-page cannibalisation.**
Five `/blog/{competitor}-alternative` posts compete with `/compare/{slug}` and
`/alternatives`. GSC 28d: the blog versions hold all the impressions; `/compare/makereceipt`,
`/compare/receiptfaker` and `/alternatives` have **zero**. The blog posts even link into
the pages Google ignores. Pick one URL per competitor and 301 the other.
Note: the memory that comparison pages 404 is **stale** — they are live and prerendered.

**S4. Restructure the offer around the actual job.**
The job is *one receipt, once*. The free meter (3 downloads) exceeds the median user's
lifetime need, so **the median user never sees the paywall**. Watermark every download
instead — wall exposure rises ~4 → ~25/month, which is also the only way pricing becomes
testable at this traffic level.
Add **"$4.99 — 10 watermark-free HD downloads, no subscription"** as the primary paid CTA.
Retire the $3/wk pass: at $13/month-equivalent it is *more expensive than monthly*, its
renewal behaviour is undisclosed, and `/terms` never mentions it. Validated in-category —
ReceiptMake leads with $22.99 lifetime; ReceiptGenerator.io sells fixed-count packs;
ExpressExpense sells single-receipt unlocks.
Raise Pro Monthly to $9.99–12.99 and Yearly to $49–59 (market median yearly is $60–99;
$39 is the market floor and reads as "the cheap one").

**S5. Start third-party presence — it is the only link source that scales here.**
3 referring domains vs MakeReceipt's 372. Makecepeit is listed on **no** software
directory and named in **no** third-party roundup — including MakeMyReceipt's own
"7 Best Receipt Makers", which excludes it. Submit to AlternativeTo, SaaSHub, G2,
Capterra, Product Hunt and Slant. These listings are simultaneously the referring domains
*and* the "alternatives" visibility the comparison pages were built to chase.

**S6. Get one real testimonial.**
Zero testimonials, zero ratings, zero user counts sitewide. The only proof is seven
launch-directory badges, which signal "shipped last month" — the opposite of the intent.
Also add an image of the watermark to `/pricing`: it is the asset the entire Free→Pro
conversion depends on and it is never shown.

---

## Long-Term Initiatives (This Quarter)

**L1. Claim the legitimacy position — "reconstruct, don't fake".**
Publish *"Is it legal to make a receipt?"*. A site named ReceiptFaker can never be a
credible source on receipt legality; makecepeit — with an editorial policy, named authors
and a responsible-use policy no competitor has — can. This is the most defensible content
position in the market and it is currently unclaimed.
Never put "fake" in a title tag, H1 or slug. The demand case for doing so is weak: all
"fake" queries total 29 impressions and 0 clicks (positions 17–100), while brand queries
— instacart 96, chipotle 58, amazon ~30, ulta 25 — are the same buyer at ~10x the volume
without the word. Four asymmetric risks argue against it: Shopify AUP review (with no
backup processor, that is 100% of revenue), converting the `terms §8` trademark defence
into documented intent, forfeiting AI citations permanently, and irreversibility.
Add a persistent responsible-use line above the nav — the cheapest processor-review
insurance available.

**L2. Establish a backup payment processor.** Manual Shopify provisioning with no
fallback is a single point of total revenue failure.

**L3. Update competitor tracking.** `COMPETITORS` misses the two rivals actually
contesting the same SERPs: **MakeMyReceipt** (194+ templates free with no account —
a better free tier than yours) and **ReceiptGenerator.io** (300+ templates, published
pricing, owns the resale vertical). ReceiptBaker holds a full page for 7 impressions.

**L4. Pursue the brand-query surface.** GSC shows demand is brand-shaped and largely
uncaptured. Surface the highest-impression brands on the homepage and build out the
template pages behind them.

---

## Competitor Comparison

| Factor | Makecepeit | MakeReceipt | MakeMyReceipt | ReceiptFaker | ReceiptGenerator.io |
|---|---|---|---|---|---|
| Brand templates | **348** | 60+ cats | 194+ | 100+ | 300+ |
| AI generation | **Yes** | No | No | No | No |
| Pricing published | **Yes** | No | Blog only | No paid tier | Yes |
| Yearly price | **$39** | n/a | n/a | — | $59.99 |
| One-time option | **No** | No | No | — | **Yes** |
| Free download, no account | No | No | **Yes** | **Yes** | No |
| Testimonials | **0** | "thousands, 84 countries" | "Trusted by Thousands" | None | None |
| Referring domains | **3** | **372** | n/a | 109 | n/a |
| Editorial policy / named authors | **Yes** | No | No | No | No |

Read plainly: makecepeit wins on substance in four rows and loses on presence in four
rows. Every losing row is fixable without building product.

---

## Revenue Impact Summary

**Stated honestly: checkout→paid conversion is currently unmeasurable (no `purchase`
event), so all figures below are ranges under explicit assumptions, not forecasts.**
Baseline: 34,387 impressions/mo, 254 clicks, ~400–600 sessions, Pro at $7.99/mo.

| Recommendation | Primary effect | Est. impact | Confidence | Timeline |
|---|---|---|---|---|
| Meta description rewrites (top 30) | +80 clicks/mo on 6 known URLs | +31% traffic | **High** — measured GSC baseline | 1 week |
| Sitewide CTR programme (0.74% → 2%) | +434 clicks/mo | +171% traffic | Medium — aspirational ceiling | 1 quarter |
| Fix C1/C2 billing defects | Prevents disputes on existing customers | Protects 100% of revenue | **High** | 1 day |
| Remove `window.confirm()` | Recovers invisible checkout abandonment | Unknown until measured | **High** that it leaks | 1 hour |
| Add `purchase` event | Makes every other number knowable | Prerequisite, not a lift | **High** | 1 day |
| Link `/pricing` from homepage | Offer becomes reachable | Small but free | High | 1 hour |
| Template count 100+ → 348 | CTR + competitive claim | Small, compounding | High | 1 hour |
| Pricing restructure (one-time pack) | Monetises the median one-off user | **+$15–25/mo today**; $250–400/mo at 5,000 sessions | Medium | 4 hours |
| Directory submissions | 3 → ~10 referring domains | Unlocks the ranking ceiling | Medium | 2 weeks |

**The honest total:** near-term dollar upside is roughly **+$20–40/month**. The real
return is a ~30% traffic lift from copy edits, a funnel that can finally be measured, and
the removal of two defects that put existing revenue at risk. This business needs traffic
and instrumentation before it needs optimization.

---

## Next Steps

1. **Today:** fix C1 and C2 (billing defects hitting paying customers), delete the
   `window.confirm()` in `PricingCta.tsx`.
2. **This week:** add the GA4 `purchase` event; standardise the template count to 348
   everywhere; link `/pricing` from the homepage; fix the ReceiptFaker comparison row.
3. **Next two weeks:** hand-write the top 30 meta descriptions by impressions; disclose
   the account gate on template/brand pages; automate Pro provisioning.
4. **This month:** resolve `/compare` vs `/blog/*-alternative` duplication; ship the
   one-time download pack; submit to six directories.

Suggested follow-ups: `/market copy https://makecepeit.com` for the hero rewrite,
`/market funnel https://makecepeit.com` for a deeper build→paywall trace.

---

*Generated by AI Marketing Suite — `/market audit`. Full per-agent findings in the
session scratchpad: `FINDINGS-content.md`, `FINDINGS-conversion.md`,
`FINDINGS-competitive.md`, `FINDINGS-technical.md`, `FINDINGS-strategy.md`.*
