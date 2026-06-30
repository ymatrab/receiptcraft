# Supabase auth setup — email/password, Google, SMTP, sessions

The code in this repo is wired and correct. The items below are **dashboard
configuration** in Supabase / Google Cloud / Resend — they can't be done from code.
Do them once and they stick.

Project: **Makecepeit** · canonical domain: `https://www.makecepeit.com`

> **Login model:** the site now uses **email + password** (with a one-time email
> verification at signup) plus **Continue with Google**. Magic-link sign-in was
> removed — it emailed a link on *every* login, which tripped the email rate limit
> and added friction. Verification + password-reset emails are the only auth emails
> we send now, so they're rare.

---

## 0. Turn on email/password + verification  ← do this first

Dashboard → **Authentication → Providers → Email**:
- **Enable Email provider:** ON.
- **Confirm email:** **ON** — this is what sends the one verification link at signup
  and blocks login until the user clicks it. (With it OFF, accounts work instantly
  and no verification email is sent.)
- **Secure email change:** ON (recommended).

Dashboard → **Authentication → Providers → Email → Password settings** (or
**Authentication → Policies**):
- **Minimum password length:** `8` (the UI also enforces 8 — keep them in sync).
- **Leaked password protection:** **ON** — rejects passwords found in the
  HaveIBeenPwned breach corpus. Free, one toggle, big security win.

Dashboard → **Authentication → URL Configuration**:
- **Site URL:** `https://www.makecepeit.com`
- **Redirect URLs** must include (these power verification, Google, and reset):
  - `https://www.makecepeit.com/auth/callback`
  - `https://www.makecepeit.com/auth/reset`
  - `http://localhost:3000/auth/callback` (dev, optional)

The reset-password page lives at `/auth/reset` and the callback at `/auth/callback`
— both already handle the `?code=` and `?token_hash=` link formats, so the default
Supabase email templates work as-is.

---

## 1. Fix "Continue with Google"

A blank/failed Google sign-in is almost always one of these three missing pieces.
The login page now shows the real provider error under the red box — read it first,
then fix the matching item.

### a) Enable the Google provider in Supabase
Dashboard → **Authentication → Providers → Google** → toggle **Enabled**.
You'll need a **Client ID** and **Client Secret** from Google (step b).

### b) Create the OAuth client in Google Cloud
1. <https://console.cloud.google.com/apis/credentials> → **Create credentials → OAuth client ID**.
2. Application type: **Web application**.
3. **Authorized JavaScript origins:**
   - `https://www.makecepeit.com`
   - `http://localhost:3000` (dev, optional)
4. **Authorized redirect URI** — this must be your **Supabase** callback, not the site:
   ```
   https://<YOUR-PROJECT-REF>.supabase.co/auth/v1/callback
   ```
   (Copy the exact value shown under Supabase → Providers → Google → "Callback URL".)
5. Copy the generated **Client ID + Secret** back into Supabase (step a) and save.
6. Make sure the OAuth consent screen is **Published** (Testing mode only lets
   whitelisted test users in — that alone breaks sign-in for everyone else).

### c) Allow the app's redirect URLs in Supabase
Dashboard → **Authentication → URL Configuration**:
- **Site URL:** `https://www.makecepeit.com`
- **Redirect URLs** (add both):
  - `https://www.makecepeit.com/auth/callback`
  - `http://localhost:3000/auth/callback`

> Most "it just bounces back to /login" cases are a missing redirect URL here, or
> the Google redirect URI in (b4) pointing at the site instead of the
> `…supabase.co/auth/v1/callback` URL.

If it still fails, the error text now shown on `/login` will say which of these is
wrong — send me that line and I can pinpoint it.

---

## 2. Keep users logged in (long sessions)

Magic-link sign-in is one-time, so we don't want users requesting a new link
constantly. The app already refreshes the session on every request
([middleware.ts](../middleware.ts) → `updateSession`), so a user stays logged in as
long as the refresh token is valid. Set these so that window is long:

Dashboard → **Authentication → Sessions**:
- **Time-box user sessions:** leave **empty/unlimited** (or set e.g. `0` = no forced logout).
- **Inactivity timeout:** leave **empty/unlimited** so users aren't logged out for being away.

Dashboard → **Authentication → Sessions → Refresh tokens**:
- Keep **"Detect & revoke potentially compromised refresh tokens"** on (security),
  but do **not** set a short reuse interval.

Dashboard → **Authentication → Settings → Access token (JWT) expiry:**
- Default `3600`s (1 hour) is fine — the middleware silently refreshes it; the user
  never notices. (You can raise it, but it's not necessary.)

Net effect: a user signs in once via the email link and stays signed in on that
device essentially indefinitely.

### Make the email link itself last longer (optional)
So a link the user opens an hour later still works:
Dashboard → **Authentication → Email** → **Email OTP Expiration** → raise from `3600`
to e.g. `86400` (24h). The email template copy says "expires in 1 hour" — update that
line in `magic-link.html` if you change this.

---

## 3. Install the branded email templates

File: [`email-templates/magic-link.html`](email-templates/magic-link.html) — the same
HTML works for every auth email because they all expose `{{ .ConfirmationURL }}`.

Dashboard → **Authentication → Emails**, for **each** of these templates switch the
editor to **HTML / source** view, paste the file contents, and **Save**:
1. **Confirm signup** — the verification email new users get. (Now the main one.)
2. **Reset password** — sent by the “Forgot password?” link.
3. **Magic Link** / **Change email** — optional, harmless to leave on the default.

The template includes the one-click button, the full fallback link beneath it (for
when the button doesn't render), a short FAQ, and links to the site.

---

## 3b. Custom SMTP via Resend — fixes the rate limit (do this for launch)

Supabase's built-in email sender is throttled to a handful per hour and is
"testing only" — it's what threw **"email rate limit exceeded."** Point Supabase at
your own sender and the limit goes away. **Resend** is the fastest; its free tier
(3,000 emails/mo) is far more than verification + reset email ever needs, and custom
SMTP works on Supabase's **free** plan.

**1. Create the Resend account + verify the domain**
- Sign up at <https://resend.com> → **Domains → Add domain** → `makecepeit.com`.
- Resend shows DNS records to add at your domain registrar / DNS host:
  - an **SPF** TXT record (e.g. `send.makecepeit.com` → `v=spf1 include:amazonses.com ~all`)
  - a **DKIM** TXT record (`resend._domainkey…`)
  - (optional) a **DMARC** TXT record (`_dmarc` → `v=DMARC1; p=none;`)
- Wait until Resend marks the domain **Verified** (usually minutes).

**2. Create an API key** — Resend → **API Keys → Create** → copy it (starts `re_…`).

**3. Paste SMTP creds into Supabase** — Dashboard → **Authentication → Emails → SMTP
Settings → Enable custom SMTP**:
| Field | Value |
|---|---|
| Host | `smtp.resend.com` |
| Port | `465` (SSL) or `587` (STARTTLS) |
| Username | `resend` |
| Password | your Resend API key (`re_…`) |
| Sender email | `hello@makecepeit.com` |
| Sender name | `Makecepeit` |

**4. Raise the rate limit** — Dashboard → **Authentication → Rate Limits → "Emails
sent per hour"** → bump to e.g. `100`. (The shared-SMTP cap no longer applies once
custom SMTP is on.)

Send yourself a test signup afterwards to confirm the verification email lands (check
spam the first time; SPF/DKIM verification fixes that).

---

## 4. Weekly plan checkout link (code is ready)

The new **Pro Weekly** ($3 / 7 days) plan is live in the pricing page and admin.
To make its button buy something, paste the checkout URL in
**/admin/settings → Checkout links → Weekly link** (Stripe Payment Link or a Shopify
link). For Shopify/manual payments, grant the buyer Pro with the new **"Grant 7d"**
button in **/admin/members**.

Env fallback (optional): `NEXT_PUBLIC_STRIPE_LINK_WEEKLY` and, for Stripe API/webhook
sync, `STRIPE_PRICE_PRO_WEEKLY`.
