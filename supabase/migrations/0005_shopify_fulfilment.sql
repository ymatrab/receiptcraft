-- Shopify fulfilment: grant Pro automatically when an order is paid.
--
-- Until now every Shopify buyer was granted Pro by hand in /admin/members,
-- which wrote the literal string "manual" into stripe_customer_id as a sentinel.
-- That overloaded a Stripe-specific column, and it meant nothing recorded WHICH
-- order paid for a grant — so a redelivered webhook or a duplicate purchase had
-- no way to be recognised as already handled.
--
-- This migration gives a subscription a real provenance (`source`) and a real
-- idempotency key (`shopify_order_id`), and adds a landing place for orders that
-- arrive without a matching account so they are never dropped silently.
--
-- Run in the Supabase SQL editor or via `supabase db push`.
-- IMPORTANT: apply this BEFORE deploying the code that reads `source`.

-- ---------------------------------------------------------------------------
-- subscriptions: provenance + Shopify idempotency
-- ---------------------------------------------------------------------------

-- Stripe is no longer the only way a subscription is created, so its customer
-- id can legitimately be absent.
alter table public.subscriptions
  alter column stripe_customer_id drop not null;

alter table public.subscriptions
  add column if not exists source text not null default 'stripe',
  add column if not exists shopify_order_id text;

-- Only one subscription row per Shopify order. This is what makes a redelivered
-- `orders/paid` webhook a no-op rather than a second grant. Partial, so the many
-- Stripe and manual rows with a null order id don't collide with each other.
create unique index if not exists subscriptions_shopify_order_id_key
  on public.subscriptions (shopify_order_id)
  where shopify_order_id is not null;

create index if not exists subscriptions_source_idx on public.subscriptions (source);

-- Retire the "manual" sentinel: those rows were admin grants, not Stripe
-- customers. Ordered so the default of 'stripe' above does not mislabel them.
update public.subscriptions
   set source = 'manual',
       stripe_customer_id = null
 where stripe_customer_id = 'manual';

-- Constrain the vocabulary now that the backfill has run, so a typo in code
-- fails loudly at write time instead of silently creating a fourth "source".
alter table public.subscriptions
  drop constraint if exists subscriptions_source_check;
alter table public.subscriptions
  add constraint subscriptions_source_check
  check (source in ('stripe', 'shopify', 'manual'));

-- ---------------------------------------------------------------------------
-- pending_orders: paid orders we could not attach to an account
-- ---------------------------------------------------------------------------
-- A buyer who checks out with a different email than they signed up with, or
-- who has not registered yet, must not vanish. They paid; someone has to see it.
-- Surfaced in /admin/orders so it can be resolved by hand.
create table if not exists public.pending_orders (
  id                bigint generated always as identity primary key,
  shopify_order_id  text not null unique,        -- also the webhook idempotency key
  order_number      text,                        -- human-facing "#1042", for support replies
  email             text,
  plan              text,                        -- resolved plan, when the SKU matched
  reason            text not null,               -- why it could not be matched
  payload           jsonb not null,              -- raw order, so it can be replayed
  resolved_at       timestamptz,                 -- set when an admin grants access
  resolved_by       uuid references public.profiles (id) on delete set null,
  created_at        timestamptz not null default now()
);

create index if not exists pending_orders_unresolved_idx
  on public.pending_orders (created_at desc)
  where resolved_at is null;

-- Service-role only: RLS on with no policies means no client can read these.
-- They contain buyer emails and full order payloads.
alter table public.pending_orders enable row level security;
