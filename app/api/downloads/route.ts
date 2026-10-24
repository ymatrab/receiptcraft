import { NextResponse } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { FREE_LIMITS } from "@/lib/plans";
import { startOfUsageMonth } from "@/lib/usage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Download entitlement.
 *
 * Since 2026-10-24 the rule is one line: Pro exports clean, everyone else
 * exports watermarked. No account is needed to download, there is no free
 * watermark-free allowance, and there are no Pro-only templates. The old
 * per-account credit (download_credits + claim_download_credit) is no longer
 * read or written; the table and function stay in the database untouched.
 *
 * The paid gate fails closed: getAccountStatus() reports isPro only when it
 * could read an entitled subscription row, so any failure on that path
 * answers "watermarked".
 */

const NO_STORE = { "Cache-Control": "no-store" } as const;

/**
 * AI generations this account has used in the current usage month, or null
 * when the count could not be read.
 *
 * Reads the same startOfUsageMonth() boundary the limiter in
 * app/api/ai/generate uses, so the builder never shows "2 left" while the next
 * request is refused. Free rows only — ai_usage records Pro generations too.
 * Code and message only in the log: no user ids.
 */
async function aiUsedThisMonth(userId: string): Promise<number | null> {
  const { count, error } = await createAdminClient()
    .from("ai_usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("pro", false)
    .gte("created_at", startOfUsageMonth().toISOString());
  if (error) {
    console.error(`[downloads] ai_usage count failed (${error.code ?? "unknown"}): ${error.message}`);
    return null;
  }
  return count ?? null;
}

/**
 * GET /api/downloads — read-only status for the preview: whether an export
 * would carry the watermark, and how many free AI generations are left for a
 * logged-in free account.
 */
export async function GET() {
  const account = await getAccountStatus();
  if (account.isPro) {
    return NextResponse.json(
      { isPro: true, loggedIn: true, willWatermark: false, aiRemaining: null },
      { headers: NO_STORE }
    );
  }

  if (!account.userId || !supabaseConfigured) {
    return NextResponse.json(
      { isPro: false, loggedIn: false, willWatermark: true, aiRemaining: null },
      { headers: NO_STORE }
    );
  }

  const used = await aiUsedThisMonth(account.userId);
  return NextResponse.json(
    {
      isPro: false,
      loggedIn: true,
      willWatermark: true,
      aiRemaining: used === null ? null : Math.max(0, FREE_LIMITS.aiGenerationsPerMonth - used),
    },
    { headers: NO_STORE }
  );
}

/**
 * POST /api/downloads — decide whether this export is clean. Pro → clean,
 * anyone else (logged in or not) → watermarked. Always 200; no login needed.
 */
export async function POST() {
  const account = await getAccountStatus();
  return NextResponse.json({ clean: account.isPro }, { headers: NO_STORE });
}
