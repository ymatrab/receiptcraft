-- Support chat without an account, plus "seen" receipts and presence.
--
-- Until now a conversation had to belong to a profile, so the chat widget told
-- every signed-out visitor to log in first. Most people who need help have no
-- account — they are halfway through building a receipt — and a login wall in
-- front of "how do I…" loses them. A conversation can now belong to a guest
-- instead: the browser holds a random token in an httpOnly cookie, and only its
-- SHA-256 is stored here. Guests never touch these tables over RLS; every read
-- and write goes through app/api/chat with the service role, which looks the
-- conversation up by that hash. Policies are unchanged, so a guest thread
-- (user_id null) is visible to admins only.
--
-- The guest gives an email with their first message, so a reply can still
-- reach them after they close the tab.
--
-- Seen and presence are four timestamps per conversation rather than a flag
-- per message: one update per view instead of one per row, and "seen" is just
-- "the other side last read after this message was sent".
--
-- profiles.last_seen_at is the admin's own heartbeat while /admin is open, so
-- the widget can say whether support is online right now.
--
-- Run in the Supabase SQL editor, or via `supabase db push`.

alter table public.conversations
  alter column user_id drop not null,
  add column if not exists guest_email          text,
  add column if not exists guest_token_hash     text,
  -- The visitor's tab was open and visible at this time, on this page.
  add column if not exists visitor_last_seen_at timestamptz,
  add column if not exists visitor_page         text,
  -- Everything sent before these was on screen for the other side.
  add column if not exists visitor_last_read_at timestamptz,
  add column if not exists admin_last_read_at   timestamptz;

create unique index if not exists conversations_guest_token_idx
  on public.conversations (guest_token_hash)
  where guest_token_hash is not null;

-- Every thread still has an owner of one kind or the other.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'conversations_has_owner'
  ) then
    alter table public.conversations
      add constraint conversations_has_owner
      check (user_id is not null or guest_token_hash is not null);
  end if;
end;
$$;

alter table public.profiles
  add column if not exists last_seen_at timestamptz;

notify pgrst, 'reload schema';
