import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import { newAccountDestination } from "@/lib/new-account";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    // Whatever the destination turns out to be, mark it so AuthEventBeacon can
    // fire the event from there. These flows finish on the server, which has no
    // client to fire from — which is why a Google account never appeared in the
    // sign-up funnel at all until now.
    const withEvent = (dest: string): string => {
      if (!method) return dest;
      const url = new URL(dest, origin);
      url.searchParams.set("ev", isNew ? "signup" : "login");
      url.searchParams.set("ev_method", method);
      return `${url.pathname}${url.search}${url.hash}`;
    };

    if (!isNew) return withEvent(next);

    return withEvent(newAccountDestination(next));
  };

  if (supabaseConfigured) {
    const supabase = await createClient();

    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${destinationFor(data.user?.created_at)}`);
      }
      return fail(error.message);
    } else if (tokenHash && type) {
      const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
      if (!error) {
        return NextResponse.redirect(`${origin}${destinationFor(data.user?.created_at)}`);
      }
      return fail(error.message);
    }
  }

  return fail();
}
