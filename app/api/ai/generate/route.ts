import { NextResponse, after } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import {
  getRoutableAiConnections,
  setAiCooldown,
  clearAiCooldown,
  claimAlertSlot,
} from "@/lib/settings";
import { notify } from "@/lib/telegram";
import { generateJson, AiProviderError, AI_ATTEMPT_TIMEOUT_MS } from "@/lib/ai-providers";
import { FREE_LIMITS } from "@/lib/plans";
import { startOfUsageMonth } from "@/lib/usage";
import { AI_RECEIPT_SCHEMA, receiptSystemPrompt, type AiReceiptResult } from "@/lib/ai-receipt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/**
 * Long enough for two provider attempts on the budget lib/ai-providers.ts gives
 * each one, plus this route's own Supabase round-trips. Left unset, this
 * inherited the platform default — which on some plans is 10s, less than a
 * single slow Gemini call, so the function could be killed mid-generation and
 * the failover below never got the chance to run.
 */
export const maxDuration = 30;

/**
 * Stop starting new provider attempts once there isn't room for one to finish
 * inside `maxDuration`. Without this, a third connection could begin a 12s call
 * with 6s of budget left — the request dies with no answer instead of returning
 * the honest "try again" below.
 */
const ROUTING_BUDGET_MS = 26_000;

/**
 * How long to stay quiet after each kind of operational alert.
 *
 * An outage produces one failure per visitor, so these windows are what decide
 * whether the bot stays useful or gets muted. Long enough that a bad afternoon
 * is a handful of messages; short enough that a new outage the next morning
 * still announces itself.
 */
const OUTAGE_ALERT_WINDOW_MS = 30 * 60 * 1000;
const EXHAUSTED_ALERT_WINDOW_MS = 6 * 60 * 60 * 1000;

/**
 * Tell the owner a free account has spent its monthly AI allowance.
 *
 * Not a fault — this is the moment someone wanted a fourth receipt and could
 * not have one, which is the warmest upgrade signal the product produces. It
 * is worth a message for the same reason a started checkout is.
 *
 * Recorded in `events` as well as sent, and the row is what keeps it to one
 * message per account per month: the 429 fires on *every* attempt once the cap
 * is reached, so a determined user would otherwise send an alert a minute. The
 * event is useful on its own too — the admin funnel can now show how many
 * people hit the ceiling, which nothing measured before.
 */
async function announceLimitReached(userId: string, email: string | null) {
  try {
    const admin = createAdminClient();
    const since = startOfUsageMonth().toISOString();

    const { count } = await admin
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("name", "ai_limit_reached")
      .gte("created_at", since);

    if ((count ?? 0) > 0) return;

    await admin.from("events").insert({
      user_id: userId,
      name: "ai_limit_reached",
      props: { limit: FREE_LIMITS.aiGenerationsPerMonth },
    });

    await notify("🎯 Free AI limit reached", {
      Email: email,
      Used: `${FREE_LIMITS.aiGenerationsPerMonth} of ${FREE_LIMITS.aiGenerationsPerMonth} this month`,
      Meaning: "They wanted another receipt and could not have one.",
      User: userId,
    });
  } catch (err) {
    console.error("[ai] limit alert failed", err);
  }
}

/**
 * Logged-in free users: count this month's free rows in ai_usage.
 *
 * The day boundary comes from lib/usage.ts because the account page now shows
 * the user how many generations they have left. Two definitions of "today"
 * would mean the page says "1 left" and this function then refuses the request.
 *
 * `pro = false` matters because ai_usage now records Pro generations too (see
 * the insert below). Without the filter, someone whose subscription lapsed
 * mid-month would come back to a free allowance already spent by the
 * generations they made while paying.
 */
async function checkUserLimit(userId: string): Promise<boolean> {
  if (!supabaseConfigured) return true;
  const admin = createAdminClient();
  const since = startOfUsageMonth();
  const query = () =>
    admin
      .from("ai_usage")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", since.toISOString());

  const { count, error } = await query().eq("pro", false);
  if (!error) return (count ?? 0) < FREE_LIMITS.aiGenerationsPerMonth;

  // The `pro` column arrives with migration 0005. If it is missing, filtering on
  // it errors and supabase-js returns a null count — which would read as "0 used"
  // and hand every free account unlimited generations. Fall back to counting
  // every row instead: on a database without the column, none of them are Pro.
  console.error("[ai] usage limit query failed", error.message);
  const { count: fallback } = await query();
  return (fallback ?? 0) < FREE_LIMITS.aiGenerationsPerMonth;
}

export async function POST(req: Request) {
  const { ordered: connections, cooling } = await getRoutableAiConnections();
  if (connections.length === 0) {
    // No connection is even eligible — every one is disabled, deleted, or
    // parked in cooldown at the same time. The headline feature is offline and
    // only an admin can bring it back, so this is the loudest case of all.
    after(async () => {
      if (await claimAlertSlot("ai_unconfigured", OUTAGE_ALERT_WINDOW_MS)) {
        await notify("🔴 AI generator is offline", {
          Cause: "No usable provider — all disabled, deleted, or resting.",
          Fix: "Add or re-enable a connection at /admin/ai.",
        });
      }
    });
    return NextResponse.json({ error: "AI is not configured yet." }, { status: 503 });
  }

  const { prompt } = (await req.json().catch(() => ({}))) as { prompt?: string };
  if (!prompt || prompt.trim().length < 3) {
    return NextResponse.json({ error: "Please describe the receipt you want." }, { status: 400 });
  }

  const account = await getAccountStatus();

  // AI generation needs an account. The signed-out tier it replaces was enforced
  // by a cookie, which anyone could clear — so account holders were the only
  // people actually rate-limited, and every generation by everyone else cost
  // real provider tokens while identifying nobody. Requiring an account makes
  // the limit real and turns the spend into a known user.
  if (!account.userId) {
    return NextResponse.json(
      {
        error: `Create a free account to generate receipts with AI — ${FREE_LIMITS.aiGenerationsPerMonth} a month free.`,
        needsAuth: true,
      },
      { status: 401 }
    );
  }

  // Rate limit free accounts; Pro is unlimited.
  if (!account.isPro) {
    const ok = await checkUserLimit(account.userId);
    if (!ok) {
      after(() => announceLimitReached(account.userId!, account.email));
      return NextResponse.json(
        { error: "You've used your free AI generations for this month. Upgrade for unlimited." },
        { status: 429 }
      );
    }
  }

  // Try each connection in routing order: one dead or spent key demotes us to
  // the next provider rather than taking the feature offline. A provider that
  // reports an exhausted quota is parked so the next request skips straight
  // past it — that is what makes stacked free tiers add up instead of each one
  // costing a wasted round-trip once it runs dry.
  // Resolved once, so every failover attempt sends an identical prompt (and a
  // retry that straddles midnight cannot change the date mid-request).
  const system = receiptSystemPrompt();
  let result: AiReceiptResult | null = null;
  let servedBy: string | null = null;
  let failures = 0;
  let transientFailures = 0;
  let lastFailure: string | null = null;
  const startedAt = Date.now();
  for (const connection of connections) {
    if (Date.now() - startedAt + AI_ATTEMPT_TIMEOUT_MS > ROUTING_BUDGET_MS) {
      console.warn(`[ai] out of time before trying ${connection.label}`);
      break;
    }
    try {
      result = (await generateJson(
        connection,
        system,
        prompt.slice(0, 600),
        AI_RECEIPT_SCHEMA
      )) as AiReceiptResult;
      servedBy = connection.id;
      break;
    } catch (err) {
      failures++;
      if (err instanceof AiProviderError) {
        if (err.isTransient) transientFailures++;
        if (err.isQuotaExhausted) {
          const until = err.cooldownUntil();
          await setAiCooldown(connection.id, until).catch(() => {});
          console.warn(`[ai] ${connection.label} exhausted — resting until ${until.toISOString()}`);
          // Worth knowing before it becomes an outage: the stack is designed to
          // absorb one spent free tier, but each one parked is a layer of cover
          // gone, and topping up is only possible if somebody is told.
          after(async () => {
            if (await claimAlertSlot(`ai_exhausted:${connection.id}`, EXHAUSTED_ALERT_WINDOW_MS)) {
              await notify("🪫 AI provider out of credits", {
                Provider: connection.label,
                Resting: `until ${until.toISOString().slice(0, 16).replace("T", " ")} UTC`,
                Detail: err.message,
                Meaning: "Requests now fall through to the next provider.",
              });
            }
          });
        }
      }
      // Kept so the alert below can carry the real cause. Until now this was
      // recorded only in a server log nobody reads until the feature has been
      // dark for days — which is exactly how the August 2026 outage lasted six.
      lastFailure = `${connection.label}: ${err instanceof Error ? err.message : String(err)}`;
      // The response below is deliberately vague, and /admin/ai re-runs this on
      // demand to show the detail.
      console.error(`[ai] ${connection.label} (${connection.provider}) failed`, err);
    }
  }

  if (!result) {
    /**
     * Nobody served this request, so the visitor saw the generator fail.
     *
     * Throttled hard: an outage hits every visitor alike, and one message per
     * half hour is the difference between an alert that gets read and a bot
     * that gets muted — taking the checkout alerts with it.
     *
     * `Cause` is the part that matters. The provider's own error text is what
     * distinguishes a retired model from an expired key from a spent quota, and
     * those have nothing in common except the symptom.
     */
    after(async () => {
      if (await claimAlertSlot("ai_outage", OUTAGE_ALERT_WINDOW_MS)) {
        await notify("🔴 AI generator is failing", {
          Tried: `${connections.length} ${connections.length === 1 ? "provider" : "providers"}, all failed`,
          // `failures === 0` is its own case: the routing budget ran out before
          // any provider was even tried, so nothing is broken and nothing is
          // rate-limited — the request was simply too slow to start.
          Kind:
            failures === 0
              ? "ran out of time before any provider was tried"
              : transientFailures === failures
                ? "rate-limited or down"
                : "needs an admin fix",
          Cause: lastFailure,
          Affected: account.email,
          Fix: "Open /admin/ai and press Test on each connection.",
        });
      }
    });

    // Everything we tried is rate-limited or down → it's worth coming back.
    // Anything else is a misconfiguration only an admin can fix, so say less.
    if (failures > 0 && transientFailures === failures) {
      return NextResponse.json(
        { error: "The AI generator is taking a break right now — please try again in a little while." },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Couldn't generate that one — please try again in a moment." },
      { status: 502 }
    );
  }

  // A success means any parked cooldown for that connection is stale. Only
  // touch the store when there was actually one to clear — the happy path
  // should not pay a settings write (or even a read) for nothing.
  if (servedBy && cooling[servedBy]) await clearAiCooldown(servedBy).catch(() => {});

  // Record the generation. Every one of them, not just the free-tier ones the
  // limiter cares about: this table is also where "AI generations per user" on
  // the admin dashboard comes from, and while Pro was excluded that figure read
  // zero for the members who generate most — and nothing anywhere recorded what
  // unlimited actually costs us in provider calls.
  //
  // `pro` keeps the two uses apart: checkUserLimit above counts free rows only.
  if (supabaseConfigured) {
    const usage = createAdminClient().from("ai_usage");
    const { error } = await usage.insert({ user_id: account.userId, pro: account.isPro });
    if (error) {
      // Same missing-column case as above. Record the generation regardless —
      // supabase-js returns errors rather than throwing, so a silently dropped
      // insert would take the free monthly limit down with it.
      console.error("[ai] usage insert failed", error.message);
      await usage.insert({ user_id: account.userId });
    }
  }

  return NextResponse.json({ receipt: result });
}
