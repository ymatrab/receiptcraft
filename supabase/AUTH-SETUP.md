# Supabase auth setup — Google, long sessions, email template

The code in this repo is wired and correct. The three items below are **dashboard
configuration** in Supabase / Google Cloud — they can't be done from code. Do them
once and they stick.

Project: **Makecepeit** · canonical domain: `https://www.makecepeit.com`

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

## 3. Install the branded email template

File: [`email-templates/magic-link.html`](email-templates/magic-link.html)

Dashboard → **Authentication → Emails**:
1. Open the **Magic Link** template.
2. Switch the editor to **HTML / source** view.
3. Paste the entire contents of `magic-link.html` and **Save**.
4. (Optional) Repeat for the **Confirm signup** template — it exposes the same
   `{{ .ConfirmationURL }}` variable, so the same HTML works.

The template includes the one-click button, the full fallback link beneath it (for
when the button doesn't render), a short FAQ, and links to the site.

> Tip: for best deliverability set up a **custom SMTP** sender
> (Dashboard → Authentication → Emails → SMTP Settings) using a domain address like
> `hello@makecepeit.com`. Supabase's built-in email is rate-limited and more likely
> to land in spam.

---

## 4. Weekly plan checkout link (code is ready)

The new **Pro Weekly** ($3 / 7 days) plan is live in the pricing page and admin.
To make its button buy something, paste the checkout URL in
**/admin/settings → Checkout links → Weekly link** (Stripe Payment Link or a Shopify
link). For Shopify/manual payments, grant the buyer Pro with the new **"Grant 7d"**
button in **/admin/members**.

Env fallback (optional): `NEXT_PUBLIC_STRIPE_LINK_WEEKLY` and, for Stripe API/webhook
sync, `STRIPE_PRICE_PRO_WEEKLY`.
