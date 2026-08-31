import { NextResponse } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { FREE_LIMITS } from "@/lib/plans";
import { templateNeedsPro } from "@/lib/templates";
import { startOfUsageMonth } from "@/lib/usage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMIT = FREE_LIMITS.freeReceiptDownloads;

/**
 * AI generations this account has used in the current usage month.
 *
 * Reads the same startOfUsageMonth() boundary the limiter in
 * app/api/ai/generate uses. Recomputing the window here would let the builder
 * show "2 left" while the next request is refused, which is the exact drift
 * lib/usage.ts exists to prevent.
 */
async function aiUsedThisMonth(userId: string): Promise<number> {
  const { count } = await createAdminClient()
    .from("ai_usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", startOfUsageMonth().toISOString());
  return count ?? 0;
}

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
    return NextResponse.json({
      isPro: true,
      loggedIn: true,
      willWatermark: false,
      remaining: null,
      aiRemaining: null,
    });
  }
  if (!account.userId || !supabaseConfigured) {
    return NextResponse.json({
      isPro: false,
      loggedIn: false,
      willWatermark: false,
      remaining: LIMIT,
      aiRemaining: FREE_LIMITS.aiGenerationsPerMonth,
    });
  }
  const params = new URL(req.url).searchParams;
  const key = params.get("receiptKey") ?? "";
  const brand = params.get("brand");
  const [used, claimed, aiUsed] = await Promise.all([
    usedCount(account.userId),
    key ? alreadyClaimed(account.userId, key) : Promise.resolve(false),
    aiUsedThisMonth(account.userId),
  ]);
  const remaining = Math.max(0, LIMIT - used);
  // Two independent gates. The credit gate is per account; the brand gate is per
  // template.
  //
  // The brand gate is belt-and-braces now that applyTemplate refuses to open a
  // Pro-only template at all — but it is the server-side half, and it still
  // catches the cases the client cannot: a subscription that lapsed while the
  // doc was open, a restored autosave of a template bought under Pro, and
  // anyone driving the API directly.
  //
  // An already-claimed receipt re-downloads clean either way, so nobody loses a
  // receipt they already spent a credit on because the brand list changed under
  // them.
  const brandLocked = templateNeedsPro(brand);
  const willWatermark = !claimed && (brandLocked || remaining <= 0);
  return NextResponse.json(
    {
      isPro: false,
      loggedIn: true,
      willWatermark,
      remaining,
      brandLocked,
      aiRemaining: Math.max(0, FREE_LIMITS.aiGenerationsPerMonth - aiUsed),
    },
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

  const { receiptKey, brand } = (await req.json().catch(() => ({}))) as {
    receiptKey?: string;
    brand?: string;
  };
  const key = (receiptKey || "").slice(0, 200);
  if (!key) return NextResponse.json({ error: "Missing receiptKey" }, { status: 400 });

  const userId = account.userId;

  // Already claimed → clean re-download, no new credit consumed. Checked before
  // the brand gate on purpose: a receipt that already cost a credit stays clean
  // even if its brand later leaves the free list.
  if (await alreadyClaimed(userId, key)) {
    return NextResponse.json({ clean: true, remaining: Math.max(0, LIMIT - (await usedCount(userId))) });
  }

  // A Pro-only brand never consumes a credit — it simply exports watermarked.
  // Spending one here would be the worst of both: the user pays a credit and
  // still gets a watermark.
  if (templateNeedsPro(brand)) {
    return NextResponse.json({
      clean: false,
      brandLocked: true,
      remaining: Math.max(0, LIMIT - (await usedCount(userId))),
    });
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
