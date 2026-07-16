import { NextResponse } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { FREE_LIMITS } from "@/lib/plans";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMIT = FREE_LIMITS.freeReceiptDownloads;

/** Distinct receipts this user has already claimed a free (clean) download for. */
async function usedCount(userId: string): Promise<number> {
  const { count } = await createAdminClient()
    .from("download_credits")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
  return count ?? 0;
}

async function alreadyClaimed(userId: string, key: string): Promise<boolean> {
  const { data } = await createAdminClient()
    .from("download_credits")
    .select("id")
    .eq("user_id", userId)
    .eq("receipt_key", key)
    .maybeSingle();
  return Boolean(data);
}

/**
 * GET /api/downloads?receiptKey=... — read-only status for the preview.
 * Tells the builder whether the current receipt would export clean or
 * watermarked, and how many free receipts remain.
 */
export async function GET(req: Request) {
  const account = await getAccountStatus();
  if (account.isPro) {
    return NextResponse.json({ isPro: true, loggedIn: true, willWatermark: false, remaining: null });
  }
  if (!account.userId || !supabaseConfigured) {
    return NextResponse.json({ isPro: false, loggedIn: false, willWatermark: false, remaining: LIMIT });
  }
  const key = new URL(req.url).searchParams.get("receiptKey") ?? "";
  const [used, claimed] = await Promise.all([
    usedCount(account.userId),
    key ? alreadyClaimed(account.userId, key) : Promise.resolve(false),
  ]);
  const remaining = Math.max(0, LIMIT - used);
  // A receipt already claimed re-downloads clean; otherwise it's clean only
  // while the account still has credits left.
  const willWatermark = !claimed && remaining <= 0;
  return NextResponse.json(
    { isPro: false, loggedIn: true, willWatermark, remaining },
    { headers: { "Cache-Control": "no-store" } }
  );
}

/**
 * POST /api/downloads { receiptKey } — claim a free download for a receipt.
 * Idempotent per (user, receipt): the first claim of a new receipt consumes a
 * credit while any remain; re-claims of an already-claimed receipt stay clean
 * for free. Returns whether the export should be clean (watermark-free).
 */
export async function POST(req: Request) {
  const account = await getAccountStatus();
  if (account.isPro) return NextResponse.json({ clean: true, remaining: null });
  if (!account.userId || !supabaseConfigured) {
    return NextResponse.json({ clean: false, requiresLogin: true, remaining: LIMIT }, { status: 401 });
  }

  const { receiptKey } = (await req.json().catch(() => ({}))) as { receiptKey?: string };
  const key = (receiptKey || "").slice(0, 200);
  if (!key) return NextResponse.json({ error: "Missing receiptKey" }, { status: 400 });

  const userId = account.userId;

  // Already claimed → clean re-download, no new credit consumed.
  if (await alreadyClaimed(userId, key)) {
    return NextResponse.json({ clean: true, remaining: Math.max(0, LIMIT - (await usedCount(userId))) });
  }

  const used = await usedCount(userId);
  if (used < LIMIT) {
    // The unique(user_id, receipt_key) constraint keeps this idempotent under
    // races (a duplicate insert errors harmlessly rather than double-charging).
    await createAdminClient()
      .from("download_credits")
      .insert({ user_id: userId, receipt_key: key });
    return NextResponse.json({ clean: true, remaining: Math.max(0, LIMIT - (used + 1)) });
  }

  // Out of free receipts → watermarked fallback.
  return NextResponse.json({ clean: false, remaining: 0 });
}
