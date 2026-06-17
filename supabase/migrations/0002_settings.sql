-- App settings: admin-editable config (Stripe payment links, AI provider/key/model).
-- RLS is ON with NO policies, so anon/auth clients can't read it at all — only the
-- service-role key (used server-side) can. This keeps API keys out of the browser.

create table if not exists public.app_settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table public.app_settings enable row level security;
-- (intentionally no policies — server-only via service role)
