import { NextResponse } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getRoutableAiConnections, setAiCooldown, clearAiCooldown } from "@/lib/settings";
import { generateJson, AiProviderError } from "@/lib/ai-providers";
import { FREE_LIMITS } from "@/lib/plans";
import { AI_RECEIPT_SCHEMA, receiptSystemPrompt, type AiReceiptResult } from "@/lib/ai-receipt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


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

  // AI generation needs an account. The signed-out tier it replaces was enforced
  // by a cookie, which anyone could clear — so account holders were the only
  // people actually rate-limited, and every generation by everyone else cost
  // real provider tokens while identifying nobody. Requiring an account makes
  // the limit real and turns the spend into a known user.
  if (!account.userId) {
    return NextResponse.json(
      {
        error: `Create a free account to generate receipts with AI — ${FREE_LIMITS.aiGenerationsPerDay} a day free.`,
        needsAuth: true,
      },
      { status: 401 }
    );
  }

  // Rate limit free accounts; Pro is unlimited.
  if (!account.isPro) {
    const ok = await checkUserLimit(account.userId);
    if (!ok) {
      return NextResponse.json(
        { error: "You've used your free AI generations for today. Upgrade for unlimited." },
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
  for (const connection of connections) {
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

  // Record usage for rate limiting (free accounts only).
  if (!account.isPro && supabaseConfigured) {
    await createAdminClient().from("ai_usage").insert({ user_id: account.userId });
  }

  return NextResponse.json({ receipt: result });
}
