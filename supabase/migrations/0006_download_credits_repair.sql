-- Repair: create public.download_credits in an environment where 0004 never ran.
--
-- Why this exists as its own migration rather than "just re-run 0004".
--
-- On 2026-09-04 production was probed directly through PostgREST with the
-- service role:
--
--   GET /rest/v1/download_credits?select=*&limit=0
--   -> 404 {"code":"PGRST205",
--           "message":"Could not find the table 'public.download_credits'
--                      in the schema cache"}
--
-- while ai_usage, profiles, receipts and events all answered 206. So 0004 was
-- written and committed but never applied, and every read the app makes against
-- this table has been failing since the free-download limit shipped. Because
-- app/api/downloads/route.ts read `count` without reading `error`, a failed
-- count returned null, `null ?? 0` made it zero, zero is below the limit, and
-- every logged-in free account got a clean watermark-free export on every
-- download, without limit. That is the whole free-tier gate.
--
-- 0004 is left untouched on purpose: it may have been applied in another
-- environment, and editing an applied migration makes the two histories
-- disagree. Everything below is idempotent and safe to run whether 0004 ran,
-- half-ran, or never ran at all.
--
-- Run in the Supabase SQL editor, or via `supabase db push`.

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------
create table if not exists public.download_credits (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles (id) on delete cascade,
  receipt_key  text not null,                 -- ReceiptDoc.id of the downloaded receipt
  created_at   timestamptz not null default now()
);

-- The uniqueness that makes claiming idempotent: one credit per (user, receipt),
-- so re-downloading the same receipt — or grabbing PNG *and* PDF of it — cannot
-- consume a second credit, distinct-receipt count equals row count, and two
-- concurrent claims cannot both charge.
--
-- Added separately from the CREATE TABLE so a half-applied 0004 (table present,
-- constraint missing) is repaired rather than skipped: `create table if not
-- exists` on an existing table is a no-op and would leave the constraint off.
-- Duplicates are collapsed first, because the index cannot be built over them.
delete from public.download_credits a
  using public.download_credits b
 where a.user_id = b.user_id
   and a.receipt_key = b.receipt_key
   and a.ctid > b.ctid;

create unique index if not exists download_credits_user_receipt_key
  on public.download_credits (user_id, receipt_key);

create index if not exists download_credits_user_idx
  on public.download_credits (user_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Owners read their own; writes go through the service-role API route
-- (createAdminClient), mirroring ai_usage. RLS on with no policy denies
-- everything, which is the safe direction if a policy below ever fails.
alter table public.download_credits enable row level security;

-- CREATE POLICY has no IF NOT EXISTS before PG 15, and this has to be
-- re-runnable, so each policy is dropped first.
drop policy if exists "download_credits_select_own" on public.download_credits;
create policy "download_credits_select_own" on public.download_credits
  for select using (auth.uid() = user_id);

drop policy if exists "download_credits_insert_own" on public.download_credits;
create policy "download_credits_insert_own" on public.download_credits
  for insert with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Schema cache
-- ---------------------------------------------------------------------------
-- PostgREST answers from a cached introspection of the schema and does not
-- notice new tables on its own. Without this the API keeps returning PGRST205
-- for the table that now exists — which is indistinguishable, from the app's
-- side, from the outage this migration is fixing.
notify pgrst, 'reload schema';
