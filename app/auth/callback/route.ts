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

  if (supabaseConfigured) {
    const supabase = await createClient();

    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}${next}`);
      return fail(error.message);
    } else if (tokenHash && type) {
      const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
      if (!error) return NextResponse.redirect(`${origin}${next}`);
      return fail(error.message);
    }
  }

  return fail();
}
