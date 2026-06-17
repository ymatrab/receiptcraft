import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { getAiConfig } from "@/lib/settings";
import { generateJson } from "@/lib/ai-providers";
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
  return { ok: used < FREE_LIMITS.aiGenerationsPerDay, remaining: FREE_LIMITS.aiGenerationsPerDay - used };
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
  const aiConfig = await getAiConfig();
  if (!aiConfig) {
    return NextResponse.json({ error: "AI is not configured yet." }, { status: 503 });
  }

  const { prompt } = (await req.json().catch(() => ({}))) as { prompt?: string };
  if (!prompt || prompt.trim().length < 3) {
    return NextResponse.json({ error: "Please describe the receipt you want." }, { status: 400 });
  }

  const account = await getAccountStatus();

  // Rate limit free users (Pro is unlimited).
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
          { error: "Free daily limit reached. Log in and upgrade for unlimited AI generation." },
          { status: 429 }
        );
      }
    }
  }

  let result: AiReceiptResult;
  try {
    result = (await generateJson(
      aiConfig,
      SYSTEM,
      prompt.slice(0, 600),
      AI_RECEIPT_SCHEMA
    )) as AiReceiptResult;
  } catch (err) {
    console.error("[ai] generation failed", err);
    const msg = err instanceof Error ? err.message : String(err);
    // Provider quota / rate-limit / overload → tell the user to come back later.
    if (/\b429\b|quota|resource_exhausted|rate.?limit|overloaded|exhausted/i.test(msg)) {
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
