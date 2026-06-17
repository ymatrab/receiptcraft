-- ReceiptCraft initial schema (Phase 0)
-- Run in the Supabase SQL editor or via `supabase db push`.
-- Covers: profiles, subscriptions, saved receipts, chat, analytics events,
-- and AI-generation usage tracking. RLS is ON everywhere.

-- ---------------------------------------------------------------------------
-- Helper: updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user (mirrors auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  avatar_url  text,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- subscriptions: synced from Stripe via webhook (service role only writes)
-- ---------------------------------------------------------------------------
create table if not exists public.subscriptions (
  id                     text primary key,                 -- Stripe subscription id
  user_id                uuid not null references public.profiles (id) on delete cascade,
  stripe_customer_id     text not null,
  status                 text not null,                    -- active, trialing, past_due, canceled, ...
  price_id               text,
  plan                   text,                             -- pro_monthly | pro_yearly
  current_period_end     timestamptz,
  cancel_at_period_end   boolean not null default false,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);
create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- receipts: saved receipts for logged-in users (Pro "history")
-- ---------------------------------------------------------------------------
create table if not exists public.receipts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  title       text,
  data        jsonb not null,                              -- the ReceiptData / doc payload
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists receipts_user_id_idx on public.receipts (user_id);
create trigger receipts_updated_at
  before update on public.receipts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- chat: conversations + messages (user <-> admin support)
-- ---------------------------------------------------------------------------
create table if not exists public.conversations (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles (id) on delete cascade,
  status          text not null default 'open',           -- open | closed
  last_message_at timestamptz not null default now(),
  created_at      timestamptz not null default now()
);
create index if not exists conversations_user_id_idx on public.conversations (user_id);

create table if not exists public.messages (
  id               uuid primary key default gen_random_uuid(),
  conversation_id  uuid not null references public.conversations (id) on delete cascade,
  sender_id        uuid references public.profiles (id) on delete set null,
  sender_role      text not null,                          -- user | admin
  body             text not null,
  read_at          timestamptz,
  created_at       timestamptz not null default now()
);
create index if not exists messages_conversation_id_idx on public.messages (conversation_id);

-- Bump the parent conversation whenever a message arrives (re-opens it too).
create or replace function public.touch_conversation()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.conversations
    set last_message_at = now(),
        status = 'open'
    where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists messages_touch_conversation on public.messages;
create trigger messages_touch_conversation
  after insert on public.messages
  for each row execute function public.touch_conversation();

-- ---------------------------------------------------------------------------
-- ai_usage: rate-limit the free AI generator (one row per generation)
-- ---------------------------------------------------------------------------
create table if not exists public.ai_usage (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.profiles (id) on delete cascade,
  created_at  timestamptz not null default now()
);
create index if not exists ai_usage_user_created_idx on public.ai_usage (user_id, created_at);

-- ---------------------------------------------------------------------------
-- events: lightweight first-party analytics for the admin dashboard
-- ---------------------------------------------------------------------------
create table if not exists public.events (
  id          bigint generated always as identity primary key,
  user_id     uuid references public.profiles (id) on delete set null,
  name        text not null,                               -- e.g. receipt_downloaded, checkout_started
  props       jsonb,
  created_at  timestamptz not null default now()
);
create index if not exists events_name_created_idx on public.events (name, created_at);

-- ===========================================================================
-- Row Level Security
-- ===========================================================================
alter table public.profiles      enable row level security;
alter table public.subscriptions enable row level security;
alter table public.receipts      enable row level security;
alter table public.conversations enable row level security;
alter table public.messages      enable row level security;
alter table public.ai_usage      enable row level security;
alter table public.events        enable row level security;

-- Admin check helper (avoids recursive RLS on profiles).
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- profiles: a user sees/updates their own row; admins see all.
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- subscriptions: read-only to the owner + admins (writes go through service role).
create policy "subscriptions_select_own" on public.subscriptions
  for select using (auth.uid() = user_id or public.is_admin());

-- receipts: full CRUD for the owner.
create policy "receipts_all_own" on public.receipts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- conversations: owner + admins.
create policy "conversations_select" on public.conversations
  for select using (auth.uid() = user_id or public.is_admin());
create policy "conversations_insert_own" on public.conversations
  for insert with check (auth.uid() = user_id);
create policy "conversations_update_admin" on public.conversations
  for update using (public.is_admin());

-- messages: visible to the conversation owner + admins; users post as themselves.
create policy "messages_select" on public.messages
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.conversations c
      where c.id = conversation_id and c.user_id = auth.uid()
    )
  );
create policy "messages_insert" on public.messages
  for insert with check (
    public.is_admin()
    or exists (
      select 1 from public.conversations c
      where c.id = conversation_id and c.user_id = auth.uid()
    )
  );

-- ai_usage: owner can read/insert their own; admins read all.
create policy "ai_usage_select" on public.ai_usage
  for select using (auth.uid() = user_id or public.is_admin());
create policy "ai_usage_insert_own" on public.ai_usage
  for insert with check (auth.uid() = user_id);

-- events: only admins can read; inserts handled server-side via service role.
create policy "events_select_admin" on public.events
  for select using (public.is_admin());
