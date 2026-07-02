-- Newsletter subscribers (email marketing list).
-- Run in the Supabase SQL editor or via `supabase db push`.
-- Writes go through the service role in /api/newsletter — no anon policies.

create table if not exists public.newsletter_subscribers (
  id              uuid primary key default gen_random_uuid(),
  email           text not null unique,
  -- Where the signup happened (footer, blog, builder, ...) for attribution.
  source          text not null default 'footer',
  user_id         uuid references public.profiles (id) on delete set null,
  unsubscribed_at timestamptz,
  created_at      timestamptz not null default now()
);

create index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (email);

alter table public.newsletter_subscribers enable row level security;

-- Only admins can read the list; inserts/updates happen server-side via the
-- service role, which bypasses RLS.
create policy "newsletter_select_admin" on public.newsletter_subscribers
  for select using (public.is_admin());
