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
| `landings` | `https://www.makecepeit.com/api/metrics/landings` — several rows per day, see [Landings](#landings) |

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

## Landings

Does a page that does not sell (a `/receipt-help` guide, a how-to post) hand its visitors on to one
that does? Code: `lib/landing-metrics.ts` (loading), `lib/landing-rows.ts` (definitions),
`lib/landing-paths.ts` (which pages sell). The coverage check behind it: 14 days to 2026-11-15
gave 1,289 `/receipt-help` sessions, 26.5% handed on; 377 blog sessions, 11.1%; 1,046 sell-page
sessions; 104 of 115 sign-ups and all 33 purchases linked to a landing.

Request: `GET https://www.makecepeit.com/api/metrics/landings?from=YYYY-MM-DD&to=YYYY-MM-DD`, same
`x-api-key` and errors as above, but **at most 92 days** per request.

Response — the "rows" shape: one row per UTC day × landing path, and no rows for a day with nothing:

```json
{"metric": "landings", "timezone": "UTC", "data": [
  {"date": "2026-11-10", "landing": "/receipt-help/kfc-receipt-copy",
   "sessions": 54, "reached_sell": 21, "signups": 1, "purchases": 0}, …]}
```

- **landing** — the path the session started on (`visit.props.landing`): no query string,
  lower-case, no trailing slash. At most 500 paths a day; the rest are summed into `(other)`.
  Sign-ups and purchases that cannot be linked to any visit go to `(unattributed)`, so each day's
  `signups` and `purchases` add up to the `signups` and `purchases` metrics.
- **sessions** — sessions that started there that day (one `visit` row per session: 30 minutes
  idle ends one, and nothing is recorded until the browser shows a person's input).
- **reached_sell** — of those, sessions that reached a **sell page after landing**: home,
  `/create`, `/brands`, `/brands/*`, `/templates`, `/templates/*`, `/examples`, `/examples/*`
  (not `/examples/page/*`), `/pricing`, `/compare/*`, `/alternatives` — `SELL_PATH_PATTERNS`, kept
  in step with the sell classes on Command Center's Strategy page. "Reached" means the same
  session, or the same browser within 24 hours of landing, has one of:
  - a `sell_reached` event — sent once per session, the first time it views a sell page other than
    its landing page. **Recorded since this metric shipped (2026-11);**
  - a builder event (`builder_opened`, `edit_started`, `select_template`, `receipt_completed`,
    `download_click`, `paywall_shown`, `receipt_downloaded`) — the builder exists only on `/create`;
  - `ai_generate` (builder or the home AI) or `begin_checkout` (builder, home AI, `/pricing`);
  - a new session that lands on a sell page.

  Before `sell_reached` existed the site recorded no page views after the landing, so **for days
  before the release the number is a lower bound**: it counts visitors who opened the builder, used
  the home AI, started a checkout or came back to a sell page, not ones who only browsed a brand
  page. Expect a step up on the release day; compare periods on the same side of it.
  For a sell landing the same rule applies, so it reads "went on to another sell page or started a
  receipt" — a `/create` landing is close to 100% by construction.
- **signups / purchases** — defined exactly as the `signups` and `purchases` metrics and dated on
  the day they happened, credited **first-touch**: to the earliest landing, in the 30 days before
  the conversion, of any browser the account has used (a browser is linked to an account by any
  signed-in `visit`, builder, AI, sign-in, download or checkout event that carries both ids).

Hand-off rate = `reached_sell / sessions`. Only dates, paths and counts are returned.

Command Center: add an API source with metric `landings` (URL above); it is stored per landing in
`landing_metrics_daily`, not in the scalar daily metrics.

```sh
curl -s -H "x-api-key: $METRICS_API_KEY" \
  "https://www.makecepeit.com/api/metrics/landings?from=2026-11-01&to=2026-11-14"
```
