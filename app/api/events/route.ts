import { NextResponse, after } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { normalizeEventName, normalizeId, sanitizeProps } from "@/lib/analytics-events";
import { EVENT_ALERTS, notify } from "@/lib/telegram";

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

  /**
   * Telegram alert for the handful of events in EVENT_ALERTS.
   *
   * Sign-up is only observable here. It happens in three different flows — a
   * password form, a Google redirect and an emailed link — and the two redirect
   * flows finish on a page, not in a route, so this ingest is the one place all
   * three pass through.
   *
   * That makes it a public endpoint deciding when to ring someone's phone, so
   * two conditions guard it:
   *
   * 1. A session user is required. The name is attacker-controlled, but the
   *    user is not — it comes from the cookie — so an anonymous client cannot
   *    post `{name:"sign_up"}` in a loop and buzz the owner all night.
   * 2. It must be the first event of that name for that account. The same
   *    signup can be reported twice by a remount or a back-button, and a
   *    logged-in user could replay it deliberately; either way the second one
   *    is not news. The row we just wrote is included in the count, so "first"
   *    means exactly one.
   */
  const alertTitle = EVENT_ALERTS[name];
  if (alertTitle && account.userId) {
    // "email" / "google" / "password", when the tracker sent one.
    const rawMethod = props ? props.method : undefined;
    const method = typeof rawMethod === "string" ? rawMethod : undefined;

    after(async () => {
      try {
        const { count } = await createAdminClient()
          .from("events")
          .select("id", { count: "exact", head: true })
          .eq("user_id", account.userId!)
          .eq("name", name);

        if (count !== 1) return;

        await notify(alertTitle, {
          Email: account.email,
          Plan: account.plan,
          Method: method,
          User: account.userId,
        });
      } catch (err) {
        // An alert is never worth an unhandled rejection in the log.
        console.error("[events] alert failed", err);
      }
    });
  }

  return NextResponse.json({ ok: true });
}
