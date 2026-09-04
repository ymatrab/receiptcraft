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

## Finding worth a decision: a paid customer may lose access early

`isProEntitled` (lib/plans.ts) requires `status` to be `active` or `trialing`.
A row that is `canceled` grants nothing, **even when its period end is in the
future**. Live data, 2026-09-04:

| plan | status | current_period_end | created |
| --- | --- | --- | --- |
| pro_yearly | active | 2027-06-29 | 2026-06-29 |
| pro_weekly | canceled | 2026-07-22 | 2026-07-15 |
| pro_monthly | canceled | **2026-09-28** | 2026-08-28 |

The third row is the one to look at. Somebody paid for a month on 28 August. The
period runs to 28 September. The row is `canceled`, so they are not Pro today —
a month they paid for, cut short.

Whether that is wrong depends on what "canceled" was meant to record here, which
is why this is a finding and not a fix:

- If it means *the customer cancelled and should keep access until the period
  ends* — the standard subscription meaning — then `isProEntitled` is wrong, and
  the fix is to let a canceled row entitle until `current_period_end`.
- If it means *refunded, charged back, or written off* — access ending
  immediately is correct, and the field is doing its job.

The two cases need different columns, not different opinions, and the
distinction cannot be recovered from the data. Worth resolving before the
webhook is written, because the webhook will have to pick one.

## Unverified: the yearly price may not match the product

A session note from the 2026-08-28 store migration records the Shopify yearly
variant (`53072343073049`) at **$39.00**. `lib/plans.ts` and /pricing advertise
**$49**, and the $39 → $49 change is documented in `lib/content-dates.ts`.

If the Shopify product was never repriced, the site is advertising a price the
checkout does not charge. This could not be checked from here — it needs the
Shopify admin — and it is the first thing to confirm, because it is either
nothing or it is the site quoting the wrong price on every plan card.

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
3. **Settle the `canceled` question above** first, since the webhook has to
   encode the answer.
4. **Rename `stripe_link_*` only as part of that work**, with a migration for the
   `app_settings` rows — not as a tidy-up.
