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
-- claim_download_credit: check the allowance and spend it in one step
-- ---------------------------------------------------------------------------
-- The unique index above makes claiming the SAME receipt twice idempotent, and
-- that is the race the original code reasoned about. It does not cover the
-- other one: two downloads of two DIFFERENT receipts, fired together. Both read
-- "0 used", both see room under a limit of 1, both insert, and the account gets
-- two clean exports out of one credit. Nothing about that is visible
-- afterwards — the rows look exactly like a legitimate pair.
--
-- Read-then-write cannot be made safe in the application: the gap between the
-- count and the insert is the bug, and it exists however carefully the two
-- statements are written. So both happen here, under a per-user advisory lock
-- held for the transaction. PostgREST wraps each request in one, so the lock is
-- released when the request ends, including when it fails.
--
-- Locking per user, not globally: two different accounts downloading at the
-- same instant have nothing to serialise, and a single global lock would put
-- every download on the site behind one queue.
--
-- Returns `granted` (may this export be clean) and `used` (credits spent after
-- this call), so the caller never has to count again to answer "how many left".
create or replace function public.claim_download_credit(
  p_user_id     uuid,
  p_receipt_key text,
  p_limit       int
)
returns table (granted boolean, used int)
language plpgsql
set search_path = public
as $$
declare
  v_used   int;
  v_exists boolean;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id::text, 0));

  select exists (
    select 1 from public.download_credits
     where user_id = p_user_id and receipt_key = p_receipt_key
  ) into v_exists;

  select count(*) into v_used
    from public.download_credits
   where user_id = p_user_id;

  -- Already paid for: re-downloading it, or taking another format of it, is
  -- free and stays clean however many credits remain.
  if v_exists then
    return query select true, v_used;
    return;
  end if;

  if v_used >= p_limit then
    return query select false, v_used;
    return;
  end if;

  insert into public.download_credits (user_id, receipt_key)
  values (p_user_id, p_receipt_key)
  on conflict (user_id, receipt_key) do nothing;

  select count(*) into v_used
    from public.download_credits
   where user_id = p_user_id;

  return query select true, v_used;
end;
$$;

-- Called only by the service-role client in app/api/downloads, which already
-- bypasses RLS. Postgres grants EXECUTE to PUBLIC on every new function, so the
-- revoke has to come first: without it any signed-in user could call this
-- directly and spend their own credits on receipts they never made.
revoke execute on function public.claim_download_credit(uuid, text, int) from public;
revoke execute on function public.claim_download_credit(uuid, text, int) from anon, authenticated;
grant execute on function public.claim_download_credit(uuid, text, int) to service_role;

-- ---------------------------------------------------------------------------
-- Schema cache
-- ---------------------------------------------------------------------------
-- PostgREST answers from a cached introspection of the schema and does not
-- notice new tables on its own. Without this the API keeps returning PGRST205
-- for the table that now exists — which is indistinguishable, from the app's
-- side, from the outage this migration is fixing.
notify pgrst, 'reload schema';
