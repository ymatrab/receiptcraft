import { NextResponse, after } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getAccountStatus } from "@/lib/auth";
import { notify } from "@/lib/telegram";

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

  const admin = createAdminClient();

  // Was this address already on the list? Asked before the upsert, because
  // afterwards there is no way to tell an insert from an update — and the
  // difference is the whole point of the alert. A re-subscribe is worth
  // knowing about (it means someone who left came back) but it is not a new
  // subscriber, and counting it as one would quietly inflate the number.
  const { data: existing } = await admin
    .from("newsletter_subscribers")
    .select("unsubscribed_at")
    .eq("email", email)
    .maybeSingle();

  const { error } = await admin
    .from("newsletter_subscribers")
    .upsert(
      { email, source, user_id: account.userId, unsubscribed_at: null },
      { onConflict: "email" }
    );

  if (error) {
    console.error("[newsletter] insert failed", error);
    return NextResponse.json({ error: "Something went wrong — please try again." }, { status: 500 });
  }

  if (!existing) {
    after(() =>
      notify("📬 New newsletter subscriber", {
        Email: email,
        Source: source,
        Account: account.email ?? "not signed in",
      })
    );
  } else if (existing.unsubscribed_at) {
    after(() => notify("📬 Newsletter re-subscribe", { Email: email, Source: source }));
  }

  return NextResponse.json({ ok: true });
}
