import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";

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
   * Send a brand-new account to the welcome sheet, the same as the password
   * sign-up path does. Covers the two routes that land here instead: a verified
   * email link, and Google sign-in by someone who has never used the site.
   *
   * "New" is judged by how recently the account was created, because that is
   * the only signal available here — `last_sign_in_at` is already stamped by
   * the exchange itself, so it cannot distinguish first visit from tenth. The
   * window is generous on purpose: showing a one-time welcome twice is a
   * trivial cost, never showing it to a real new user is not.
   */
  const destinationFor = (createdAt: string | undefined): string => {
    if (!createdAt) return next;
    const age = Date.now() - new Date(createdAt).getTime();
    if (!Number.isFinite(age) || age > 10 * 60 * 1000) return next;
    const url = new URL(next, origin);
    url.searchParams.set("welcome", "1");
    return `${url.pathname}${url.search}${url.hash}`;
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
