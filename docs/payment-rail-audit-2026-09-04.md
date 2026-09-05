# Payment rail audit — 4 September 2026

Section 10 of the implementation plan asks a single question before anything is
changed: **which rail actually takes the money, Shopify or Stripe?** The plan is
explicit that both must not be built in parallel without a commercial reason.

This is a read-only audit. Nothing about payments was changed — the owner
excluded it from this session's scope, and the plan makes the choice an owner
decision in any case.

## The answer: Shopify, entirely

Read from the live `app_settings` table on 2026-09-04:

| Setting key | Value |
| --- | --- |
| `stripe_link_weekly` | `burokrafts.store/cart/53072336781593:1` |
| `stripe_link_monthly` | `burokrafts.store/cart/53072340156697:1` |
| `stripe_link_yearly` | `burokrafts.store/cart/53072343073049:1` |
| `shopify_variant_plans` | `{"53072336781593": "pro_weekly", "53072340156697": "pro_monthly", "53072343073049": "pro_yearly"}` |

All three buy buttons are Shopify cart permalinks. No Stripe Payment Link is
configured anywhere. `shop.makecepeit.com` appears nowhere in the codebase; the
store is `burokrafts.store`.

### Trap: the setting keys say Stripe and hold Shopify

`lib/settings.ts` names them `stripe_link_weekly` / `_monthly` / `_yearly`, and
`getPaymentLinks()` falls back to `NEXT_PUBLIC_STRIPE_LINK_*`. Anyone reading the
code — or grepping for "which provider are we on" — is told Stripe by every
identifier and Shopify by every value.

`app/api/checkout/route.ts` gets this right, and only because it branches on the
*hostname* rather than on the key name:

```ts
if (url.hostname.includes("stripe.com")) {
  url.searchParams.set("client_reference_id", account.userId!);
} else {
  url.searchParams.set("attributes[user_id]", account.userId!);
  if (account.email) url.searchParams.set("checkout[email]", account.email);
}
```

So the live path is the `else`, and the user id travels as a Shopify cart
attribute. That is the correct design — email alone breaks the moment a buyer
edits the address at checkout — but it is working despite the naming, not
because of it. Renaming the keys means migrating live rows in `app_settings`
and is not something to do in passing.

## What is missing: there is no Shopify webhook

`app/api/` contains exactly one payment webhook, `app/api/stripe/webhook`, and
it verifies a Stripe signature (`stripe.webhooks.constructEvent`). Nothing
listens to Shopify at all.

Consequence: **a completed purchase grants nothing.** Every Shopify order is
fulfilled by hand — an admin writes a `subscriptions` row with
`stripe_customer_id: "manual"`. That matches what `app/api/stripe/portal`
already documents, and it is why `pro_activated` measures a wait in seconds:
with fulfilment manual, that wait is a human being noticing.

This was not an oversight. An `orders/paid` webhook, `lib/shopify.ts`, an
`/admin/orders` queue and a `subscriptions.source` migration were all written and
then **deliberately removed** in commit `d4feaf8` on 2026-08-28 — they lived only
on `dev`, never reached production, and the decision recorded in that commit was
to abandon automatic fulfilment rather than finish it.

Two leftovers survive that removal and now have no reader in the code: the
`shopify_variant_plans` row in `app_settings`, and `SHOPIFY_WEBHOOK_SECRET` if it
is still set on Vercel. `lib/ga4.ts` is also unreferenced — the removed webhook
was its only caller.

This is the plan's "webhook موثوق للتفعيل" item and the single largest piece of
work remaining on the payment side. It is out of scope here, but it is the thing
that turns a sale into access without somebody watching an inbox — and picking it
back up means reversing a decision made three weeks ago, not filling a gap.

## Resolved: a cancelled pass now runs to its end date

`isProEntitled` required `status` to be `active` or `trialing`, so a `canceled`
row granted nothing **even with a future period end**. Live data, 2026-09-04:

| plan | status | current_period_end | entitled before | after |
| --- | --- | --- | --- | --- |
| pro_yearly | active | 2027-06-29 | yes | yes |
| pro_weekly | canceled | 2026-07-22 | no | no |
| pro_monthly | canceled | **2026-09-28** | **no** | **yes** |

**The owner's answer (2026-09-04):** cancelling is deliberate and is about
*billing*, not access. Nothing on this product auto-renews — every plan is a
pass bought for a period — and a row is marked cancelled so the buyer can see
for themselves that they will not be charged again. It is a trust signal.

So treating it as a revocation was a bug, and it had a victim: the third row is
somebody who bought a month on 28 August running to 28 September, had it
cancelled the same day so no charge could recur, and lost three weeks of what
they paid for. Silently — the account page had no state for it and showed them
as Free.

Fixed: `canEntitle()` admits `canceled`, and `isProEntitled` grants it **only
while the period is still running and only when that period is actually
visible** — a cancelled row with no end date, or an unparseable one, still gets
nothing, since granting there would make cancellation meaningless. Active rows
are untouched, including the documented case of an active Stripe row with no
period end never expiring.

Two follow-ons in the same change: `/account` says "Pro access until …" rather
than "Renews on …" for a cancelled pass, which would have promised the opposite
of what the cancellation was for; and a lapsed cancelled pass now gets the
"Your Pro access ended on …" line instead of silently reading as Free.

## Settled: the Shopify yearly price

An earlier session note recorded the Shopify yearly variant at $39.00 against
the site's $49. **The owner confirmed on 2026-09-04 that the Shopify price is
correct.** Nothing to do.

## Recommendation

1. **Commit to Shopify** for now. It takes the money today, the checkout route
   already carries the user id correctly, and a second rail buys nothing until
   there is a volume problem to solve. The plan's warning against building both
   in parallel applies squarely.
2. **Write the Shopify order webhook** (HMAC-verified against the store's own
   secret) before anything else on this side. It is what makes
   `payment_completed` provable from the provider rather than inferred from
   somebody landing on a success page — the plan's rule, and the reason
   `purchase_landed` is deliberately named for a return and not a purchase.
   Note the webhook secret follows the store: it changed when the store moved to
   burokrafts.store.
3. **Keep the cancelled-pass rule** the webhook now has to honour: cancelling
   stops the next charge and never removes access before the period ends.
4. **Rename `stripe_link_*` only as part of that work**, with a migration for the
   `app_settings` rows — not as a tidy-up.
