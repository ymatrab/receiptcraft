-- Record what people ask the AI generator for.
--
-- ai_usage held one row per generation with nothing but who and when, so the
-- most direct demand signal the product has — the sentence someone typed to
-- describe the receipt they need — was thrown away on every request. These
-- columns keep it: the prompt, the brand template we matched it to (null when
-- none), and the business name the model returned. Together they answer "which
-- brands do people want that we have no template for" without guessing.
--
-- The prompt is free text typed by a signed-in user. It is kept for 90 days
-- (see the cleanup function below) and read only by the admin dashboard
-- through the service role; RLS already keeps it out of every browser session.
--
-- Also re-states 0005's `pro` column. 0005 was never applied to production
-- (checked 2026-10-27: the column did not exist), and every insert since has
-- taken the fallback path that drops it. Both statements are idempotent, so
-- running 0005 first, or not at all, ends in the same place.
--
-- Run in the Supabase SQL editor, or via `supabase db push`.

alter table public.ai_usage
  add column if not exists pro           boolean not null default false,
  add column if not exists prompt        text,
  add column if not exists template      text,
  add column if not exists business_name text;

create index if not exists ai_usage_user_pro_created_idx
  on public.ai_usage (user_id, pro, created_at);

-- Prompts older than 90 days are cleared, the rest of the row kept: the
-- monthly limiter and the per-member counts still need the row itself.
create or replace function public.clear_old_ai_prompts()
returns void
language sql
set search_path = public
as $$
  update public.ai_usage
     set prompt = null
   where prompt is not null
     and created_at < now() - interval '90 days'
$$;

revoke execute on function public.clear_old_ai_prompts() from public;
revoke execute on function public.clear_old_ai_prompts() from anon, authenticated;
grant execute on function public.clear_old_ai_prompts() to service_role;
