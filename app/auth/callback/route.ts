import { NextResponse, after } from "next/server";
import type { EmailOtpType, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { newAccountDestination } from "@/lib/new-account";
import { notify } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * How long after an account is created a confirmation still counts as that
 * account's sign-up.
 *
 * A day, because that is roughly how long Supabase's confirmation links stay
 * valid — someone who signs up at night and clicks the link over breakfast is
 * still a new account, not a returning login. It is deliberately much wider
 * than the ten minutes used to pick the destination: being shown the plans
 * twice is a small cost, whereas never being told about a customer is the bug
 * this window exists to prevent. `announcedAlready` is what keeps the wide
 * window safe.
 */
const ANNOUNCE_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Record a new account and alert the owner — from the server, not the browser.
 *
 * This used to be the browser's job: the redirect below carried `ev=signup`
 * and AuthEventBeacon fired `sign_up` once the destination page had loaded and
 * hydrated. That silently lost real customers, and the September 2026 data
 * shows exactly how. taylor.schneider@vacationclub.com and taylors1999@icloud.com
 * both have `email_confirmed_at` set — so this route definitely ran for them —
 * yet neither has a `sign_up` event at that moment, only a `login` a minute or
 * two later when the person gave up on the dead link and used their password.
 * One confirmation landed 24 seconds after sign-up, which is a corporate mail
 * scanner opening the link, not a human reading their inbox.
 *
 * That is the whole failure: a link checker, a privacy proxy or a mail client
 * preview fetches the confirmation URL, this route runs and activates the
 * account, and then nothing executes JavaScript, so the event never fires and
 * the alert never sends. The account is real, active, downloading receipts —
 * and invisible.
 *
 * Doing it here needs no browser at all, so it survives every one of those.
 *
 * Idempotent by design: the confirmation URL is routinely fetched more than
 * once (the scanner, then the person), and each fetch lands here.
 */
async function announceNewAccount(user: User, method: "google" | "email" | null) {
  try {
    const admin = createAdminClient();

    // Has this account already been announced? The `sign_up` row written below
    // is the marker — one row per account, whoever opened the link.
    const { count } = await admin
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("name", "sign_up");

    // A failed count reads as null. Treat that as "not yet announced": a
    // duplicate message is a far smaller failure than the silence this whole
    // function exists to fix.
    if ((count ?? 0) > 0) return;

    await admin.from("events").insert({
      user_id: user.id,
      name: "sign_up",
      props: { method: method ?? "email" },
    });

    await notify("🎉 New account", {
      Email: user.email ?? null,
      Method: method ?? "email",
      User: user.id,
    });
  } catch (err) {
    console.error("[auth] new-account announce failed", err);
  }
}

/**
 * Auth callback. Handles both flows:
 *  - OAuth / PKCE magic links → `?code=...` (exchangeCodeForSession)
 *  - Email OTP magic links     → `?token_hash=...&type=...` (verifyOtp)
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/create";
  // Which form the person actually used. Supabase returns a `code` for Google
  // and for a PKCE email link alike, so this cannot be inferred from the params
  // — LoginForm has to say.
  //
  // Absent means "don't count this one": the password-reset link also lands
  // here (`next=/auth/reset`) and sets no `m`, and resetting a password is not
  // a login worth putting in the login numbers.
  const rawMethod = searchParams.get("m");
  const method = rawMethod === "google" ? "google" : rawMethod === "email" ? "email" : null;

  // The OAuth provider (or Supabase) can bounce back with an explicit error —
  // surface its description on the login page instead of a generic message.
  const providerError = searchParams.get("error_description") || searchParams.get("error");

  const fail = (detail?: string | null) => {
    const url = new URL(`${origin}/login`);
    url.searchParams.set("error", "auth");
    if (detail) url.searchParams.set("error_description", detail);
    return NextResponse.redirect(url);
  };

  if (providerError) return fail(providerError);

  /**
   * Where a brand-new account goes, mirroring the password sign-up path in
   * LoginForm. Covers the two routes that land here instead: a verified email
   * link, and Google sign-in by someone who has never used the site.
   *
   * Every new account is shown the plans — see lib/new-account.ts. Whatever
   * they were doing travels along as `next` so the banner there can offer a way
   * back to it.
   *
   * "New" is judged by how recently the account was created, because that is
   * the only signal available here — `last_sign_in_at` is already stamped by
   * the exchange itself, so it cannot distinguish first visit from tenth. The
   * window is generous on purpose: showing the plans to a new account twice is
   * a trivial cost, never showing them to a real new user is not. Returning
   * users are unaffected either way and go straight to `next`.
   */
  const destinationFor = (createdAt: string | undefined): string => {
    const isNew = (() => {
      if (!createdAt) return false;
      const age = Date.now() - new Date(createdAt).getTime();
      return Number.isFinite(age) && age <= 10 * 60 * 1000;
    })();

    // Mark a *returning* login so AuthEventBeacon can fire it from the
    // destination page. A sign-up is no longer marked here: it is recorded
    // server-side by announceNewAccount, for the reasons set out there.
    const withEvent = (dest: string): string => {
      if (!method || isNew) return dest;
      const url = new URL(dest, origin);
      url.searchParams.set("ev", "login");
      url.searchParams.set("ev_method", method);
      return `${url.pathname}${url.search}${url.hash}`;
    };

    if (!isNew) return withEvent(next);

    return withEvent(newAccountDestination(next));
  };

  if (supabaseConfigured) {
    const supabase = await createClient();

    /**
     * Announce the account if this exchange is the one that brought it to life.
     * In `after()`, so a slow Telegram or a slow insert never delays the
     * redirect the person is waiting on.
     */
    const announceIfNew = (user: User | null) => {
      if (!user) return;
      const age = Date.now() - new Date(user.created_at).getTime();
      if (!Number.isFinite(age) || age > ANNOUNCE_WINDOW_MS) return;
      after(() => announceNewAccount(user, method));
    };

    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        announceIfNew(data.user);
        return NextResponse.redirect(`${origin}${destinationFor(data.user?.created_at)}`);
      }
      return fail(error.message);
    } else if (tokenHash && type) {
      const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
      if (!error) {
        announceIfNew(data.user);
        return NextResponse.redirect(`${origin}${destinationFor(data.user?.created_at)}`);
      }
      return fail(error.message);
    }
  }

  return fail();
}
