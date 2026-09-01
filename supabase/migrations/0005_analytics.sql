-- Analytics: make the admin dashboard able to answer "who did what".
--
-- Two gaps this closes.
--
-- 1. `ai_usage` only ever recorded generations by FREE accounts, because the
--    insert in app/api/ai/generate sat inside the `if (!account.isPro)` branch
--    that enforces the monthly limit. Pro is unlimited, so nobody counted it —
--    which meant a per-user AI figure read zero for exactly the members who
--    generate the most. Every generation is recorded now, and the `pro` column
--    keeps the limiter honest: it counts free rows only, so a Pro subscription
--    that lapses mid-month does not arrive to find its free allowance already
--    spent by generations made while it was paid.
--
-- 2. `events` had no index for the two queries the dashboard actually runs —
--    "everything recently" and "everything by this member".
--
-- Run in the Supabase SQL editor or via `supabase db push`.

-- ---------------------------------------------------------------------------
-- ai_usage: mark which generations were made under a Pro entitlement
-- ---------------------------------------------------------------------------
-- Existing rows are all free-tier by definition (Pro was never recorded), so
-- the false default backfills them correctly.
alter table public.ai_usage
  add column if not exists pro boolean not null default false;

-- The limiter's query is (user_id, pro=false, created_at >= month start).
create index if not exists ai_usage_user_pro_created_idx
  on public.ai_usage (user_id, pro, created_at);

-- ---------------------------------------------------------------------------
-- events: indexes for the dashboard's two access patterns
-- ---------------------------------------------------------------------------
-- The activity feed: newest first, no name filter.
create index if not exists events_created_idx
  on public.events (created_at desc);

-- Per-member history. Partial, because rows from signed-out visitors are the
-- majority and are never fetched by user.
create index if not exists events_user_created_idx
  on public.events (user_id, created_at desc)
  where user_id is not null;

-- ---------------------------------------------------------------------------
-- event_counts: rollup by event name for a time window
-- ---------------------------------------------------------------------------
-- PostgREST cannot GROUP BY, and the alternative — pulling every row into the
-- page and tallying in JS — stops working at exactly the traffic level that
-- makes the dashboard worth reading. Not SECURITY DEFINER: the only caller is
-- the service-role client, which already bypasses RLS, so this needs no
-- elevated rights of its own.
-- Output columns are `event_name`/`total` rather than `name`/`count`: a
-- RETURNS TABLE column shares a namespace with the body's column references,
-- and `name` would collide with events.name.
create or replace function public.event_counts(since timestamptz)
returns table (event_name text, total bigint)
language sql
stable
set search_path = public
as $$
  select e.name, count(*)::bigint
  from public.events e
  where e.created_at >= since
  group by e.name
  order by count(*) desc
$$;

-- Admin-only data: nobody reaches this from a browser session. Postgres grants
-- EXECUTE to PUBLIC on every new function, so the revoke has to come first and
-- the service role — the dashboard's client, and the only intended caller — has
-- to be granted back explicitly. Without the grant the dashboard silently falls
-- back to counting rows in the page.
revoke execute on function public.event_counts(timestamptz) from public;
revoke execute on function public.event_counts(timestamptz) from anon, authenticated;
grant execute on function public.event_counts(timestamptz) to service_role;
