# ReceiptCraft — Backend Setup (Phase 0)

The code foundation is in place. To activate it, create the accounts below and
paste the keys into `.env.local` (copy from `.env.example`). You only need to do
this once. I'll wire each feature on top in later phases.

## 1. Supabase (database + auth + chat)
1. Create a project at https://supabase.com → **New project**.
2. Project Settings → **API**: copy
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)
3. SQL Editor → paste the contents of `supabase/migrations/0001_init.sql` → **Run**.
   This creates all tables, the auto-profile trigger, and row-level security.
4. (Phase 2) Auth → Providers: we'll enable Google + Apple then.

## 2. Stripe (payments)
1. https://dashboard.stripe.com → start in **Test mode**.
2. Developers → API keys → copy **Secret key** → `STRIPE_SECRET_KEY`.
3. Products → create **ReceiptCraft Pro** with two prices:
   - $7.99 / month → copy price id → `STRIPE_PRICE_PRO_MONTHLY`
   - $39 / year → copy price id → `STRIPE_PRICE_PRO_YEARLY`
4. `STRIPE_WEBHOOK_SECRET` — I'll generate this in Phase 1 when the webhook exists.

## 2b. Supabase Realtime (chat)
Enable Realtime for the `messages` table so the support chat streams live:
Supabase → Database → **Replication** → add `messages` (and `conversations`) to
the `supabase_realtime` publication. (Database → Publications also works.)

## 2c. Auth providers (Google + Apple)
Supabase → Authentication → **Providers**:
- **Google**: create OAuth credentials in Google Cloud Console, paste client id/secret.
- **Apple**: needs an Apple Developer account ($99/yr) — create a Services ID + key.
- Set the redirect/callback to `https://YOUR-DOMAIN/auth/callback` and add your
  site URL under Authentication → URL Configuration.
- Make yourself an admin: in the SQL editor run
  `update public.profiles set is_admin = true where email = 'you@example.com';`
  Then visit `/admin`.

## 2d. Sanity (blog CMS)
1. Create a project at https://sanity.io → copy the **Project ID**.
2. Put it in `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID` (dataset `production`).
3. The content model lives in `sanity/schemas/` — spin up a studio (`npm create sanity@latest`
   pointed at this project, or deploy one) using those schema files to write and
   **schedule** posts. Posts with a future `publishedAt` stay hidden until their date.

## 2e. AI receipt generator (Anthropic)
Set `ANTHROPIC_API_KEY` (https://console.anthropic.com). Free users get
3 generations/day (configurable in `lib/plans.ts`); Pro is unlimited.

## 3. Vercel (hosting)
1. Import the GitHub repo at https://vercel.com (framework auto-detects Next.js).
2. Add every variable from `.env.local` under Project → Settings → **Environment Variables**.
3. Deploy. (Cloudflare/`wrangler` config has been removed — we're Vercel-only now.)

## What changed in Phase 0
- Added `@supabase/ssr`, `@supabase/supabase-js`, `stripe`.
- `lib/supabase/` — browser, server, admin (service-role) and middleware clients.
- `middleware.ts` — keeps the auth session fresh on every request.
- `lib/auth.ts` — `getAccountStatus()`: login + Pro + admin in one call.
- `lib/plans.ts` — pricing & free-tier limits (single source of truth).
- `lib/stripe.ts` — server Stripe client.
- `supabase/migrations/0001_init.sql` — full schema + RLS.
- Removed Cloudflare `next-on-pages`, `wrangler.toml`, and the `pages:build`/`preview`/`deploy` scripts.

> Hand me the filled-in keys (or just confirm they're in Vercel) and I'll start
> **Phase 1: watermark + Stripe membership.**
