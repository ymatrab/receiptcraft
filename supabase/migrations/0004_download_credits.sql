-- Download credits: track a free account's watermark-free receipt downloads.
-- Each logged-in free account gets FREE_LIMITS.freeReceiptDownloads (3) clean
-- receipts. Counted per unique receipt id, so re-downloading the same receipt or
-- grabbing multiple formats (PNG + PDF) of it does not consume extra credits.
-- Once used up, downloads fall back to watermarked; Pro removes the watermark.
--
-- Run in the Supabase SQL editor or via `supabase db push`.

create table if not exists public.download_credits (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles (id) on delete cascade,
  receipt_key  text not null,                 -- ReceiptDoc.id of the downloaded receipt
  created_at   timestamptz not null default now(),
  -- One credit per (user, receipt): makes claiming idempotent, so distinct
  -- receipt count == row count and races can't double-charge.
  unique (user_id, receipt_key)
);

create index if not exists download_credits_user_idx
  on public.download_credits (user_id);

-- ---------------------------------------------------------------------------
-- Row Level Security: owners read their own; writes go through the service-role
-- API route (createAdminClient), mirroring ai_usage.
-- ---------------------------------------------------------------------------
alter table public.download_credits enable row level security;

create policy "download_credits_select_own" on public.download_credits
  for select using (auth.uid() = user_id);

create policy "download_credits_insert_own" on public.download_credits
  for insert with check (auth.uid() = user_id);
