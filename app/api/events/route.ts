import { NextResponse } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { normalizeEventName, normalizeId, sanitizeProps } from "@/lib/analytics-events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/events { name, props } — record one product event in our own
 * `events` table.
 *
 * Every call to `track()` in lib/analytics.ts now lands here as well as in GA4
 * and Clarity. Until this route existed, `events` had exactly two writers (the
 * download tracker and the Stripe webhook), so the admin dashboard's activity
 * feed showed almost nothing while the funnel itself — sign-ups, checkouts,
 * AI generations, upgrade clicks — was visible only inside Google's UI, where
 * it cannot be joined to a member.
 *
 * Two rules make a public write endpoint safe enough for this:
 *
 * 1. The event name must be in the allowlist in lib/analytics-events.ts, and
 *    the props bag is truncated to primitives. Nothing else is stored.
 * 2. The user is resolved from the session cookie, never from the body, so an
 *    event can't be attributed to somebody else. Anonymous visitors are still
 *    recorded, with a null user — dropping them would hide the top of the
 *    funnel, which is most of it.
 *
 * Always answers 200. It is called with sendBeacon from the browser and must
 * never surface as an error in a user's console or block a page unload.
 */
export async function POST(req: Request) {
  if (!supabaseConfigured) return NextResponse.json({ ok: false });

  const body = (await req.json().catch(() => null)) as
    | {
        name?: unknown;
        props?: unknown;
        anonymous_id?: unknown;
        session_id?: unknown;
        receipt_id?: unknown;
      }
    | null;

  const name = normalizeEventName(body?.name);
  if (!name) {
    // Unknown or server-recorded event — accepted and discarded, so a stale
    // deploy sending an old name never retries or logs noise.
    return NextResponse.json({ ok: false });
  }

  const props = sanitizeProps(body?.props);
  const account = await getAccountStatus();

  // Grouping keys, validated to a short safe shape by normalizeId. Unlike the
  // user, these come from the body — they are minted in the browser and there
  // is no server-side copy to check them against. That is acceptable because
  // they carry no authority: the worst a forged id does is merge or split rows
  // in an internal count, whereas taking the *user* from the body would let
  // anyone attribute an event to somebody else's account. Hence one from the
  // cookie and three from the body.
  const anonymousId = normalizeId(body?.anonymous_id);
  const sessionId = normalizeId(body?.session_id);
  const receiptId = normalizeId(body?.receipt_id);

  const { error } = await createAdminClient().from("events").insert({
    user_id: account.userId ?? null,
    name,
    props,
    anonymous_id: anonymousId,
    session_id: sessionId,
    receipt_id: receiptId,
  });

  if (error) {
    // Worth a server log — a broken analytics write is otherwise completely
    // silent, which is how the dashboard came to be empty in the first place.
    console.error("[events] insert failed", error.message);
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true });
}
