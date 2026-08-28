import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getRoutableAiConnections, setAiCooldown, clearAiCooldown } from "@/lib/settings";
import { generateJson, AiProviderError } from "@/lib/ai-providers";
import { FREE_LIMITS } from "@/lib/plans";
import { AI_RECEIPT_SCHEMA, type AiReceiptResult } from "@/lib/ai-receipt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM = `You generate realistic receipt data from a short description.
Invent plausible specifics: a fitting business name and address, line items with
realistic prices and quantities, a sensible tax rate for the locale, a receipt
number, and today's date unless the user specifies otherwise. Keep totals
coherent. Return only the structured fields requested.`;

const COOKIE = "ai_free_usage";

/** Anonymous daily counter stored in a cookie: "YYYY-MM-DD:N". */
async function checkAnonLimit(): Promise<{ ok: boolean; remaining: number }> {
  const store = await cookies();
  const today = new Date().toISOString().slice(0, 10);
  const raw = store.get(COOKIE)?.value ?? "";
  const [day, n] = raw.split(":");
  const used = day === today ? parseInt(n) || 0 : 0;
  const limit = FREE_LIMITS.aiGenerationsPerDayAnon;
  return { ok: used < limit, remaining: limit - used };
}

async function bumpAnonCookie() {
  const store = await cookies();
  const today = new Date().toISOString().slice(0, 10);
  const raw = store.get(COOKIE)?.value ?? "";
  const [day, n] = raw.split(":");
  const used = day === today ? parseInt(n) || 0 : 0;
  store.set(COOKIE, `${today}:${used + 1}`, { httpOnly: true, sameSite: "lax", path: "/" });
}

/** Logged-in free users: count today's rows in ai_usage. */
async function checkUserLimit(userId: string): Promise<boolean> {
  if (!supabaseConfigured) return true;
  const admin = createAdminClient();
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  const { count } = await admin
    .from("ai_usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", since.toISOString());
  return (count ?? 0) < FREE_LIMITS.aiGenerationsPerDay;
}

export async function POST(req: Request) {
  const { ordered: connections, cooling } = await getRoutableAiConnections();
  if (connections.length === 0) {
    return NextResponse.json({ error: "AI is not configured yet." }, { status: 503 });
  }

  const { prompt } = (await req.json().catch(() => ({}))) as { prompt?: string };
  if (!prompt || prompt.trim().length < 3) {
    return NextResponse.json({ error: "Please describe the receipt you want." }, { status: 400 });
  }

  const account = await getAccountStatus();

  // Rate limit free users (Pro is unlimited). Signed-out visitors get a smaller
  // allowance than account holders, so signing in is worth something.
  if (!account.isPro) {
    if (account.userId) {
      const ok = await checkUserLimit(account.userId);
      if (!ok) {
        return NextResponse.json(
          { error: "You've used your free AI generations for today. Upgrade for unlimited." },
          { status: 429 }
        );
      }
    } else {
      const { ok } = await checkAnonLimit();
      if (!ok) {
        return NextResponse.json(
          {
            error: `That's your free generation for today. Create a free account for ${FREE_LIMITS.aiGenerationsPerDay} a day, or upgrade for unlimited.`,
          },
          { status: 429 }
        );
      }
    }
  }

  // Try each connection in routing order: one dead or spent key demotes us to
  // the next provider rather than taking the feature offline. A provider that
  // reports an exhausted quota is parked so the next request skips straight
  // past it — that is what makes stacked free tiers add up instead of each one
  // costing a wasted round-trip once it runs dry.
  let result: AiReceiptResult | null = null;
  let servedBy: string | null = null;
  let failures = 0;
  let transientFailures = 0;
  for (const connection of connections) {
    try {
      result = (await generateJson(
        connection,
        SYSTEM,
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
        }
      }
      // The only place the real cause is recorded — the response below is
      // deliberately vague, and /admin/ai re-runs this on demand to show it.
      console.error(`[ai] ${connection.label} (${connection.provider}) failed`, err);
    }
  }

  if (!result) {
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

  // Record usage for rate limiting (free users only).
  if (!account.isPro) {
    if (account.userId && supabaseConfigured) {
      await createAdminClient().from("ai_usage").insert({ user_id: account.userId });
    } else if (!account.userId) {
      await bumpAnonCookie();
    }
  }

  return NextResponse.json({ receipt: result });
}
