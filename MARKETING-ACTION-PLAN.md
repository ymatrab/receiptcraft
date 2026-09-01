# Makecepeit — Fix, Trust & Growth Plan

**Date:** 2026-08-18 · **Companion to** `MARKETING-AUDIT.md` (score 55.5/100)
**Decisions locked with owner:** Shopify payment links only (no Stripe) ·
**membership model only — no repricing, no one-time products** ·
**launch stage: zero paying customers, free users only** — renewal mechanics (1.6) and any
pricing change are explicitly deferred until after the first paying clients.

---

## The shape of the problem

The audit's finding was that makecepeit is *under-connected*, not under-built. The
execution consequence is that this plan is mostly **wiring and copy, not construction**.
Four phases, in strict order — each one is worthless if the one before it is skipped.

```
P0  Stop the leak      (~1 day)   revenue is escaping + customers see false statements
P1  Automate Shopify   (~2 days)  every sale is hand-processed; nothing scales past this
P2  Trust              (~1 week)  cheap, parallelisable, unblocks conversion + AI citation
P3  Growth             (~1 quarter) the traffic work — pointless while the funnel leaks

Pricing is deliberately out of scope: tiers stay at $3/wk · $7.99/mo · $39/yr.

### Launch-stage ordering (read this before starting)

With **no paying customers yet**, the defects in Phase 0 are *latent, not active* — nothing
is currently leaking, and nobody is currently being shown a false renewal date. That splits
Phase 0 in two, and changes what to do first:

**Still urgent — these block your FIRST sale, and every free user hits them today:**
- **0.4** the `window.confirm()` — fires for every free user who clicks upgrade
- **0.5** the signup dead-end — fires for every free user who tries to create an account

**Do before the first sale, not before the first visitor** — these only affect people who
have already paid, so at zero customers they are cheap insurance rather than emergencies:
- **0.1** expiry enforcement · **0.2** renewal copy · **0.3** the billing-portal 500

**Therefore the real launch-stage order is: 0.4 + 0.5 → Phase 2 (trust) → Phase 3 (growth)
→ then 0.1-0.3 and Phase 1 as the first sales approach.** At zero customers the binding
constraint is acquisition, not retention or fulfilment — automating fulfilment for zero
orders is premature, and so is renewal. Phase 1 becomes urgent the week you make your
first sale, and 0.1 must land *before* it, or your first paying customers get Pro for life.
```

---

## PHASE 0 — Stop the leak (do this first, ~1 day)

### 0.1 🔴 Enforce Pro expiry — you are giving away lifetime Pro for $3
**This is the highest-value line of code in the plan.**

`lib/auth.ts:49-62` selects `status, plan` and returns `isPro: isProStatus(sub?.status)`.
`current_period_end` is written by `grantPro`, displayed in `/account` and `/admin/*`,
used for `ORDER BY` — and **never compared to now, anywhere**. No expiry cron exists
(`vercel.json` has only IndexNow).

Every manual grant is therefore permanent. A $3 weekly pass = Pro forever, until you
notice and hand-revoke it. On a Shopify-only rail, *every* customer is a manual grant.

```ts
// lib/auth.ts — select the column, then honour it
.select("status, plan, current_period_end")
...
const active = isProStatus(sub?.status) &&
  (!sub?.current_period_end || new Date(sub.current_period_end) > new Date());
return { ...,  isPro: active, plan: active ? (sub?.plan ?? "free") : "free" };
```
Apply the same guard anywhere entitlement is read server-side (download route, AI quota).

**Before shipping:** query how many rows have `status='active'` and
`current_period_end < now()`. Those are people currently holding Pro they no longer paid
for. Decide deliberately whether to let them lapse quietly or email them a real offer —
lapsing them silently is defensible, but do it knowingly.

### 0.2 🔴 Stop telling customers their plan renews
`app/account/page.tsx:66` renders `{cancel_at_period_end ? "Cancels" : "Renews"} on`.
Shopify grants never renew. Once 0.1 lands, the date becomes a true expiry date, so:
```tsx
{sub.source === "shopify" || sub.id?.startsWith("manual_")
  ? `Pro access until ${date}`
  : `${sub.cancel_at_period_end ? "Cancels" : "Renews"} on ${date}`}
```

### 0.3 🔴 Kill the "Manage billing" 500
`app/admin/members/actions.ts:31` writes `stripe_customer_id: "manual"`; the guard at
`app/api/stripe/portal/route.ts:32` is `if (!sub?.stripe_customer_id)`, which `"manual"`
passes → Stripe throws. Since there is no Stripe, **the portal button should never render.**

Replace it on `/account` with: *"Need to cancel or get a refund? Email support@… and we'll
sort it within one business day."* Then update the `/pricing` FAQ, which currently promises
self-serve cancellation that does not exist. **Say what you actually do.**

### 0.4 🟠 Remove the `window.confirm()` at peak intent
`app/pricing/PricingCta.tsx:55-59`. A grey OS dialog is the last thing a buyer sees, and
`analytics.beginCheckout()` fires *after* the bail-out branch, so its damage is invisible.
Move the "use the same email" instruction into the page as static text beside the button,
and keep the `checkout[email]` prefill (which already does the real work).

### 0.5 🟠 Fix the signup dead-end
`app/login/LoginForm.tsx:88` tells new users to "come back and log in" — the auth callback
already signs them in, so the instruction is false. Also default to `signup` mode when
`?next=` is present. Add the `data.session` guard while you're in the file: it is dormant
today but breaks the moment email confirmation is switched off.

**Phase 0 exit test:** buy your own $3 pass end-to-end. Confirm Pro activates, the account
page shows a truthful date, the date is enforced, and no button 500s.

---

## PHASE 1 — Automate the Shopify rail (~2 days)

Manual fulfilment is the ceiling on everything: it delays value, invites disputes, and
means growth work directly increases your admin workload.

### 1.1 Carry the user id through checkout
Today the order is matched by email, which breaks whenever the buyer edits it at checkout.
Shopify cart permalinks accept custom attributes:
```
https://<shop>/cart/<variant>:1?attributes[user_id]=<uuid>&checkout[email]=<email>
```
Set this in `PricingCta.tsx` on the non-Stripe branch — it's the same place the email
prefill already happens.

### 1.2 Build the order webhook
New route `app/api/shopify/webhook/route.ts`, subscribed to **`orders/paid`**:
1. Verify HMAC against `SHOPIFY_WEBHOOK_SECRET` (raw body — reject on mismatch).
2. Read `note_attributes.user_id`; fall back to matching `email` if absent.
3. Map line-item variant/SKU → plan via a `SHOPIFY_VARIANT_MAP` in `lib/plans.ts`.
4. Upsert the subscription row (see 1.3) with a correct `current_period_end`.
5. Fire the GA4 `purchase` event (1.5).
6. If no user matches, write to a `pending_orders` table and surface it in admin — never
   drop the order silently.

Also handle **`refunds/create`** → set `status: 'canceled'`. Manual refunds currently
leave Pro active forever (compounding 0.1).

### 1.3 Fix the schema honestly
Stop overloading a Stripe column with the sentinel `"manual"`.
```sql
alter table subscriptions add column source text
  check (source in ('stripe','shopify','manual')) default 'manual';
alter table subscriptions add column shopify_order_id text unique; -- idempotency
```
Set `stripe_customer_id` to real `NULL` for non-Stripe rows. `shopify_order_id unique`
makes webhook retries safe — Shopify *will* redeliver.

Keep `grantPro()` for comps and support, but have it write `source: 'manual'`.

### 1.4 Build the post-checkout landing page
No `thank-you` / `success` route exists anywhere in `app/` — after paying, buyers land
nowhere. Add `/pro-activating`: confirm the order, state that access appears within a
minute, poll `getAccountStatus`, then redirect to `/create`. Point Shopify's post-purchase
URL at it.

### 1.5 Close the measurement loop
There is **no `purchase` event** in the codebase, so checkout→paid conversion is unknowable
and no growth decision in Phase 3 can be evaluated. Fire GA4 Measurement Protocol
server-side from the webhook; persist the `_ga` cookie as `client_id` at `begin_checkout`
so the purchase joins the session that produced it.

### 1.6 Make memberships actually renew — ⏸️ DEFERRED until after the first paying clients
**Flagged because it follows directly from the two decisions above, not from any pricing
opinion.** Shopify payment links do not auto-renew (that needs a subscription app). Every
membership you sell is therefore a fixed period of access that ends silently. Combined with
0.1 — which correctly makes access *stop* at `current_period_end` — the result is 100%
silent churn: members lapse without ever being told.

A membership-only model needs a renewal path where auto-renew would have been:
1. Email at T-3 days and on expiry: *"Your Pro access ends Friday — renew in one click"*,
   deep-linking to the same Shopify checkout with `attributes[user_id]` already set.
2. In-app banner on `/account` and at the watermark prompt once inside the expiry window.
3. A daily Vercel cron (`vercel.json` currently runs only IndexNow) to find rows expiring
   soon and enqueue the mail.

Without this, every member you win is lost by default — but with zero members today, that
is a problem you do not have yet. **Deferred by decision.** Revisit when you have paying
customers; handling the first handful of renewals by hand is entirely reasonable.

**Phase 1 exit test:** place a real order; Pro activates with no admin action; a second
webhook delivery of the same order changes nothing; GA4 shows the purchase.

---

## PHASE 2 — Build trust (~1 week, parallelisable)

You have **zero** testimonials, zero ratings, zero user counts. The only social proof is
seven launch-directory badges, which signal "shipped last month" — the opposite of intent.
Trust is also the precondition for AI citation: assistants recommend tools with editorial
policies and responsible-use pages, which you have and no competitor does.

| # | Action | Why it matters | Effort |
|---|---|---|---|
| 2.1 | **Get 3 real testimonials.** After a successful HD download, prompt: *"Did this save you time? One line we can quote?"* Email existing Pro users directly — you can name them from admin. | Zero → three is the largest proportional trust gain available | M |
| 2.2 | **Publish one countable number** ("12,400 receipts created") and demote the badge row beneath it | A real number beats eight logos nobody recognises | S |
| 2.3 | **Show the watermark on `/pricing`** | It is the asset the entire Free→Pro decision turns on, and it is never shown | S |
| 2.4 | **Standardise the template count to 348** — currently stated five ways: "40+" (`page.tsx:156`), "100+" (`page.tsx:422`,`:458`, `lib/site.ts:7`, `opengraph-image.tsx:48`), "348 brand layouts" (stat strip), "350+" (`alternatives:172`,`:282`). The site-wide meta advertises your best asset at under a third of its size. | CTR on every page + the one claim that beats every competitor | S |
| 2.5 | **Fix the ReceiptFaker comparison row** — `lib/comparisons.ts:207`,`:223` credit them with "100+ templates" while yours renders as "100+", showing you as *tied* on the dimension you win 348-to-100 | You built a page that argues against you | S |
| 2.6 | **Requalify the "no sign-up" chip.** Hero says *"Free to build & preview — no sign-up"*; `page.tsx:148` says *"Create a free account to download."* Template and brand pages disclose nothing at all. | Repeat finding from the July audit; direct bounce cause | S |
| 2.7 | **Add a refund policy** (competitors offer 14 days). With manual fulfilment, a stated policy is cheaper than a dispute. | Reduces chargeback risk on a single-processor setup | S |
| 2.8 | **Persistent responsible-use line above the nav** (ReceiptMakr does this) | Cheapest possible processor-review insurance | S |

---

## PHASE 3 — Growth (~1 quarter)

Ordered by return per hour. Do **not** start before Phase 1 — every one of these increases
traffic into a funnel that currently loses buyers invisibly and fulfils them by hand.

### 3.1 The CTR programme — the single biggest lever you have
34,387 impressions → 254 clicks = **0.74%**. You do not need new rankings; you need the
clicks you already earned. Two independent analyses traced the cause to the same place:
`lib/seo-description.ts` pads to 150–160 chars with filler ("Editable.", "Read on.") or
truncates mid-clause, and on definitional pages the description *fully answers the query*,
so Google satisfies the searcher in-SERP.

- `/blog/amount-tendered-meaning` — pos **5.7**, 1,330 impressions, **2 clicks**
- `/receipt-help/zara-receipt-copy` — pos **8.0**, 1,242 impressions, **2 clicks**

**Action:** hand-write the top 30 descriptions by impressions. Confirm relevance in six
words, then open a loop. Six known page-1 zero-CTR URLs alone ≈ **+80 clicks/mo (+31%
site traffic)** with no ranking change. Site-wide 0.74% → 2% ≈ **+434 clicks/mo**.
Also fix blog OG images — `generateMetadata` passes `images: undefined`, suppressing the
root fallback, so ~140 posts emit `summary_large_image` with no image.

### 3.2 Authority: 3 → 10+ referring domains
3 referring domains vs MakeReceipt's 372 is the ceiling on every ranking above. You are
listed on **no** software directory and named in **no** third-party roundup — including
MakeMyReceipt's own "7 Best Receipt Makers", which excludes you.
**Action:** submit to AlternativeTo, SaaSHub, G2, Capterra, Product Hunt, Slant. Pitch the
already-built free tools (`/tools/receipt-calculator`, `/tools/split-payment-checker`) —
tools earn links that product pages don't. These listings are simultaneously the referring
domains *and* the "alternatives" visibility your comparison pages were built to chase.

### 3.3 Consolidate the comparison layer — stop building, start merging
The pages are live (the "404" note is stale) and genuinely well made. But five
`/blog/{competitor}-alternative` posts duplicate them, and **Google picked the blog
versions**: `/compare/makereceipt`, `/compare/receiptfaker` and `/alternatives` have
**zero impressions**, while the blog posts hold all of them — and link *into* the pages
Google ignores.
**Action:** one URL per competitor, 301 the loser. Then stop: total competitor-brand demand
is ~108 impressions/month, all navigational. "instacart receipt generator" alone is 96.
Add **MakeMyReceipt** and **ReceiptGenerator.io** to `COMPETITORS` (both untracked, both
contesting your SERPs); drop ReceiptBaker's dedicated page (7 impressions).

### 3.4 Claim the legitimacy position — "reconstruct, don't fake"
Publish **"Is it legal to make a receipt?"**. A site named ReceiptFaker can never be a
credible source on receipt legality; you can — you already have an editorial policy, named
authors and a responsible-use page that no competitor has. Most defensible content position
in this market, currently unclaimed, and the route to your first AI citations (you have 0).

**Never put "fake" in a title tag, H1 or slug.** The demand does not justify it: all "fake"
queries total 29 impressions and 0 clicks at positions 17–100, while brand queries —
instacart 96, chipotle 58, amazon ~30, ulta 25 — are the same buyer at ~10x volume without
the word. And with a single payment processor and 348 named-brand templates, a "fake"
posture is the one thing that could cost you the rail.

### 3.5 Rebuild the hero around what you actually win on
"Make a receipt in 60 seconds" is **a competitor's tagline** — SimpleReceiptMaker's
sitewide strapline is "Create Professional Receipts in 60 Sec." and MakeMyReceipt also
claims 60 seconds. Meanwhile "AI" appears **twice** in the entire homepage file and never
above the fold, though six named rivals lack AI entirely.
**Action:** lead with **348 brand templates + AI**. Surface the highest-impression brands
(Instacart, Chipotle, Amazon, Ulta, AutoZone) on the homepage. Add an AI row to the stats
strip and a nav-level entry point.

### 3.6 Link `/pricing` from the homepage
Grep-confirmed: zero links from `app/page.tsx` or any footer. Your most-visited page never
points at the offer.

---

## Sequenced checklist

**Week 1 — Phase 0**
- [ ] Enforce `current_period_end` in `lib/auth.ts` + audit currently-overstaying Pro rows
- [ ] "Pro access until {date}" for non-renewing grants
- [ ] Remove the Stripe portal button; state the real cancellation path; fix `/pricing` FAQ
- [x] **0.4** Delete the `window.confirm()` — the instruction already existed statically on `/pricing`
- [x] **0.5** `LoginForm` copy + signup default on `?next=` + `data.session` guard; login page heading/subcopy made mode-aware and the false "manage billing" promise removed

**Weeks 2-3 — Phase 1**
- [ ] `attributes[user_id]` on the cart permalink
- [ ] `orders/paid` + `refunds/create` webhook with HMAC verification
- [ ] `source` + `shopify_order_id` columns; retire the `"manual"` sentinel
- [ ] `/pro-activating` post-checkout page
- [ ] GA4 `purchase` via Measurement Protocol + `client_id` persistence
- [ ] ~~Expiry-warning email + re-purchase CTA (1.6)~~ — ⏸️ deferred to post-first-client

**Week 4 — Phase 2**
- [ ] 3 testimonials · 1 countable number · watermark image on `/pricing`
- [ ] Standardise to **348** everywhere; fix the ReceiptFaker row
- [ ] Requalify "no sign-up"; publish refund policy; responsible-use line above nav

**Weeks 5-12 — Phase 3**
- [ ] Top 30 meta descriptions rewritten; blog OG images fixed
- [ ] Six directory submissions
- [ ] Comparison-page consolidation + competitor set updated
- [ ] "Is it legal to make a receipt?" published
- [ ] Hero rebuilt on 348 + AI; `/pricing` linked from homepage

---

## What success looks like

| Metric | Today | 90-day target | How it gets there |
|---|---|---|---|
| Organic clicks/mo | 254 | 500-700 | 3.1 CTR programme (largest single lever) |
| CTR | 0.74% | 1.5-2% | Meta description rewrites |
| Referring domains | 3 | 10-15 | 3.2 directories + tools outreach |
| Purchase visibility | **none** | full funnel | 1.5 GA4 `purchase` |
| Fulfilment time | manual, hours | < 60 seconds | 1.2 webhook |
| Testimonials | 0 | 3+ | 2.1 |
| Lapsed members contacted | n/a — no members yet | n/a | 1.6, deferred |
| Expired users holding Pro | unknown, growing | 0 | 0.1 |

**Honest note on money.** Near-term revenue upside across this entire plan is roughly
**+$20-40/month**, and no plan built on ~250 clicks/month should promise more. The reason
to run it is that Phase 0 stops an active leak, Phase 1 removes the ceiling on every future
sale, and Phase 3 is a ~30% traffic gain from editing text you have already written. The
binding constraints are **traffic and measurement** — not price points, and not features.

*Companion to `MARKETING-AUDIT.md`. Per-agent findings in the session scratchpad.*
