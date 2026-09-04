-- Give `events` the three identifiers every funnel question needs.
--
-- The table records name, props, user_id and created_at. That is enough to
-- count events and nothing else. Every question actually being asked of it —
-- how many *people* opened the builder, what share of *sessions* reach pricing,
-- whether anyone makes a *second, different* receipt — needs to group rows by
-- something, and there was nothing to group by. `user_id` is null for the whole
-- top of the funnel (building and previewing need no account), so the only
-- available answer to "how many visitors" was "we can't tell you".
--
-- None of these is personal data. anonymous_id and session_id are random values
-- minted in the browser with no relation to anything about the person, and
-- receipt_id is the document id the builder already generates client-side. No
-- email, no receipt contents, no merchant names — see lib/analytics-events.ts,
-- which caps and strips the props bag on the way in.
--
-- Run in the Supabase SQL editor, or via `supabase db push`.

alter table public.events
  -- Stable per browser. Answers "unique visitors" and, with created_at, "did
  -- they come back on a different day".
  add column if not exists anonymous_id text,
  -- Rotates after 30 minutes idle (lib/analytics.ts). Answers "unique
  -- sessions" and makes second_session derivable rather than guessed.
  add column if not exists session_id  text,
  -- The receipt a builder/download event was about, so "downloaded twice" and
  -- "made a second, different receipt" stop being the same number.
  add column if not exists receipt_id  text;

-- The dashboard's rollups are all (name, created_at) with a distinct count of
-- one of the id columns, so the ids ride along in the index rather than sending
-- the planner back to the heap for every row.
create index if not exists events_name_created_idx
  on public.events (name, created_at desc)
  include (session_id, anonymous_id);

-- "Which receipts did this account actually download" — partial, because the
-- large majority of rows carry no receipt at all.
create index if not exists events_receipt_idx
  on public.events (receipt_id, created_at desc)
  where receipt_id is not null;

-- ---------------------------------------------------------------------------
-- funnel_counts: one row per event name, with the denominators
-- ---------------------------------------------------------------------------
-- PostgREST cannot GROUP BY or COUNT DISTINCT, and the alternative — pulling
-- every row into the page and tallying in JavaScript — stops working at exactly
-- the traffic level that makes the dashboard worth reading. event_counts (0005)
-- already does the plain tally; this adds the distinct counts, which are the
-- ones the funnel needs.
--
-- `first_seen` is the important column and the easiest to leave out. Half these
-- events start being recorded today and half have been recorded since July, so
-- a ratio between two of them is meaningless unless you can see that one only
-- started counting last week. Without it the dashboard invents conversion rates
-- that look catastrophic and are arithmetic.
create or replace function public.funnel_counts(since timestamptz)
returns table (
  event_name text,
  events     bigint,
  sessions   bigint,
  visitors   bigint,
  users      bigint,
  receipts   bigint,
  first_seen timestamptz,
  last_seen  timestamptz
)
language sql
stable
set search_path = public
as $$
  select
    e.name,
    count(*)::bigint,
    count(distinct e.session_id)::bigint,
    count(distinct e.anonymous_id)::bigint,
    count(distinct e.user_id)::bigint,
    count(distinct e.receipt_id)::bigint,
    -- Deliberately unfiltered by `since`: the question this answers is "has
    -- this event been recorded long enough for its ratio to mean anything",
    -- and a first_seen clamped to the start of the window always says yes.
    (select min(f.created_at) from public.events f where f.name = e.name),
    max(e.created_at)
  from public.events e
  where e.created_at >= since
  group by e.name
  order by count(*) desc
$$;

-- Admin-only data; nobody reaches this from a browser session. Postgres grants
-- EXECUTE to PUBLIC on every new function, so the revoke has to come first and
-- the service role — the dashboard's client, and the only intended caller — has
-- to be granted back explicitly.
revoke execute on function public.funnel_counts(timestamptz) from public;
revoke execute on function public.funnel_counts(timestamptz) from anon, authenticated;
grant execute on function public.funnel_counts(timestamptz) to service_role;

notify pgrst, 'reload schema';
