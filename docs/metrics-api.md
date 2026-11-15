# Metrics API (for Command Center)

Daily sign-ups, customers, revenue and purchases, in Command Center's "API source"
format. Code: `lib/metrics-api.ts` (definitions in its header comment) and
`app/api/metrics/<metric>/route.ts`.

## Endpoints

| Metric | URL |
| --- | --- |
| `signups` | `https://www.makecepeit.com/api/metrics/signups` |
| `customers` | `https://www.makecepeit.com/api/metrics/customers` |
| `revenue` | `https://www.makecepeit.com/api/metrics/revenue` |
| `purchases` | `https://www.makecepeit.com/api/metrics/purchases` |

Request: `GET <url>?from=YYYY-MM-DD&to=YYYY-MM-DD` with header `x-api-key: <METRICS_API_KEY>`.
Both dates are required and inclusive; at most 400 days per request.

Response: `{"metric": "signups", "timezone": "UTC", "data": [{"date": "2026-11-10", "value": 14}, …]}`,
one row per day of the range, zeros included. `Cache-Control: no-store`. Only dates and numbers are
returned, never ids or emails.

Errors: `401` wrong or missing key · `503` `METRICS_API_KEY` (or Supabase) not configured ·
`400` bad dates or a range over 400 days · `502` the database read failed.

## Definitions

Days are **UTC** calendar days — the same days the /admin charts use.

- **signups** — accounts made that day (`profiles.created_at`). The same number as the Sign-ups chart
  on /admin. Includes the accounts the checkout makes for guest buyers.
- **purchases** — paid passes granted that day: `subscriptions` rows whose id is a live Checkout
  Session (`cs_live_…`) or a legacy Stripe subscription (`sub_…`). Manual grants (`manual_…`) and
  admin sandbox purchases (`cs_test_…`) are left out. /admin's "Paid" series drops manual grants
  the same way (it keeps sandbox rows, and it is dated by sign-up day, not purchase day).
  A pass refunded later still counts on the day it was bought.
- **customers** — accounts whose first purchase (as above) was that day. Guests included.
- **revenue** — USD, two decimals: what Stripe charged for each purchase that day (`amount` on the
  `pass_purchased` event; the plan's list price if the event is missing), minus the amount of every
  pass ended by a full refund or a chargeback, on the day it was ended. Stripe fees are not
  subtracted. Partial refunds keep the pass and are not visible here. Legacy subscription renewals
  are not counted (only their first payment).

## Setup

1. In Vercel (production), add `METRICS_API_KEY` — a long random value, e.g. `openssl rand -hex 32`.
   Redeploy so the routes see it. Until then every endpoint answers 503.
2. In Command Center: Settings → API sources, with makecepeit selected in the site switcher, add one
   API source per metric:

   | Name | URL | Header name | Header value | Metric |
   | --- | --- | --- | --- | --- |
   | makecepeit signups | `https://www.makecepeit.com/api/metrics/signups` | `x-api-key` | the key | Signups |
   | makecepeit customers | `https://www.makecepeit.com/api/metrics/customers` | `x-api-key` | the key | Customers |
   | makecepeit revenue | `https://www.makecepeit.com/api/metrics/revenue` | `x-api-key` | the key | Revenue |
   | makecepeit purchases | `https://www.makecepeit.com/api/metrics/purchases` | `x-api-key` | the key | Custom → `purchases` |

3. Press **Test** on each: it fetches the last 28 days and lists any format errors. Then save. The
   first sync backfills 14 months in 92-day requests; afterwards the daily sync restates the last 7 days.
   Saving the signups source switches the site's Signups connector to "API source".

Check by hand:

```sh
curl -s -H "x-api-key: $METRICS_API_KEY" \
  "https://www.makecepeit.com/api/metrics/signups?from=2026-11-01&to=2026-11-14"
```
