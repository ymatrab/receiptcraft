import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getAccountStatus } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Good-enough email shape check — Supabase's unique constraint handles dupes.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter signup. Inserts via the service role (no anon RLS policy on the
 * table). The `website` field is a honeypot: real users never fill it, so a
 * value means a bot — we answer 200 without storing anything.
 */
export async function POST(req: Request) {
  if (!supabaseConfigured) {
    return NextResponse.json({ error: "Signups aren't enabled yet." }, { status: 503 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    source?: string;
    website?: string;
  };

  if (body.website) return NextResponse.json({ ok: true });

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const source = (body.source ?? "footer").slice(0, 40);
  const account = await getAccountStatus();

  const { error } = await createAdminClient()
    .from("newsletter_subscribers")
    .upsert(
      { email, source, user_id: account.userId, unsubscribed_at: null },
      { onConflict: "email" }
    );

  if (error) {
    console.error("[newsletter] insert failed", error);
    return NextResponse.json({ error: "Something went wrong — please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
