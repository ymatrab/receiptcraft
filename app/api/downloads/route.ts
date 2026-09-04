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
 * Why every read below can answer "I don't know".
 *
 * This route used to read Supabase's `count` and ignore its `error`:
 *
 *   const { count } = await admin.from("download_credits")...;
 *   return count ?? 0;
 *
 * A failed query returns `count: null`, `null ?? 0` is 0, 0 is below the limit,
 * and the caller hands back a clean watermark-free export. So the free-download
 * gate did not fail closed on a database error — it failed *open*, every time,
 * for every account.
 *
 * That was not hypothetical. `public.download_credits` did not exist in
 * production at all (migration 0004 was never applied; see
 * supabase/migrations/0006_download_credits_repair.sql), so the count failed on
 * every single request and the free tier was unlimited clean downloads from the
 * day the limit shipped.
 *
 * The fix is to make "unknown" a value the type system will not let a caller
 * quietly turn into a number. Nothing here uses `?? 0`.
 */
type Known<T> = { ok: true; value: T };
type Unknown = { ok: false; reason: string };
type Answer<T> = Known<T> | Unknown;

const known = <T,>(value: T): Known<T> => ({ ok: true, value });

/**
 * Record a database failure without recording who it happened to.
 *
 * Code and message only. Postgres puts the offending column *values* in
 * `details` — for this table that is the receipt key — and an error log is not
 * a place to start keeping receipt identifiers or user ids.
 */
function fail(where: string, error: { code?: string; message?: string } | null): Unknown {
  const code = error?.code ?? "unknown";
  console.error(`[downloads] ${where} failed (${code}): ${error?.message ?? "no message"}`);
  // PGRST205 is PostgREST saying the table is not in its schema cache: either
  // the migration has not been applied or the cache is stale. Called out
  // because it is the one failure a deploy can fix, and it reads like any other
  // database error otherwise.
  if (code === "PGRST205") {
    console.error(
      "[downloads] download_credits is missing from the PostgREST schema cache — " +
        "apply supabase/migrations/0006_download_credits_repair.sql"
    );
  }
  return { ok: false, reason: code };
}

/**
 * AI generations this account has used in the current usage month.
 *
 * Reads the same startOfUsageMonth() boundary the limiter in
 * app/api/ai/generate uses. Recomputing the window here would let the builder
 * show "2 left" while the next request is refused, which is the exact drift
 * lib/usage.ts exists to prevent. Free rows only — ai_usage records Pro
 * generations too, and those never count against an allowance.
 */
async function aiUsedThisMonth(userId: string): Promise<Answer<number>> {
  const { count, error } = await createAdminClient()
    .from("ai_usage")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("pro", false)
    .gte("created_at", startOfUsageMonth().toISOString());
  if (error) return fail("ai_usage count", error);
  // A successful count with a null value should not happen, but `count` is
  // typed nullable and treating that as 0 is the bug this file exists to kill.
  if (count === null) return fail("ai_usage count", { code: "null_count" });
  return known(count);
}

/** Distinct receipts this user has already claimed a free (clean) download for. */
async function usedCount(userId: string): Promise<Answer<number>> {
  const { count, error } = await createAdminClient()
    .from("download_credits")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) return fail("credit count", error);
  if (count === null) return fail("credit count", { code: "null_count" });
  return known(count);
}

async function alreadyClaimed(userId: string, key: string): Promise<Answer<boolean>> {
  const { data, error } = await createAdminClient()
    .from("download_credits")
    .select("id")
    .eq("user_id", userId)
    .eq("receipt_key", key)
    .maybeSingle();
  if (error) return fail("claim lookup", error);
  return known(Boolean(data));
}

/**
 * Check the allowance and spend it, atomically.
 *
 * Delegated to claim_download_credit in Postgres rather than done here as a
 * count followed by an insert, because the gap between those two statements is
 * itself the bug: two downloads of two *different* receipts fired together both
 * read "0 used", both see room under a limit of 1, and both export clean. The
 * unique index only covers the same receipt twice. No amount of care in
 * JavaScript closes that window — it needs one transaction and a lock, which is
 * what the function does.
 *
 * The old code did neither. It awaited the insert, discarded the result and
 * returned `clean: true` regardless, so a rejected insert produced a clean
 * export and no record of it — repeatable without limit.
 */
async function claim(
  userId: string,
  key: string
): Promise<Answer<{ granted: boolean; used: number }>> {
  const { data, error } = await createAdminClient().rpc("claim_download_credit", {
    p_user_id: userId,
    p_receipt_key: key,
    p_limit: LIMIT,
  });

  if (error) return fail("claim", error);

  // `returns table` arrives as an array of rows. No row means the function
  // answered nothing, which is not the same as answering "no" — treat it as
  // unknown so it fails closed rather than silently refusing a paid-for export.
  const row = Array.isArray(data) ? data[0] : data;
  if (!row || typeof row.granted !== "boolean" || typeof row.used !== "number") {
    return fail("claim", { code: "empty_result", message: "claim_download_credit returned no row" });
  }

  return known({ granted: row.granted, used: row.used });
}

/**
 * The answer when the database cannot be reached.
 *
 * `clean: false` so nothing is given away, and `unavailable: true` so the
 * builder can say what happened instead of handing back a watermarked file with
 * no explanation — a user who was promised a clean first download and silently
 * got a watermark reads that as the product cheating them. 503 with Retry-After
 * because it is exactly that: temporary, and worth retrying.
 */
function unavailable() {
  return NextResponse.json(
    { clean: false, unavailable: true, remaining: null },
    { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "5" } }
  );
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
    key ? alreadyClaimed(account.userId, key) : Promise.resolve(known(false)),
    aiUsedThisMonth(account.userId),
  ]);

  // The preview cannot be trusted to be right when the credit state is unknown,
  // so it shows the watermark. That direction is deliberate: a preview that
  // says "watermarked" and then exports clean is a pleasant surprise, while the
  // reverse is the product going back on the thing it just promised. POST is
  // the decision either way — this only sets what the user sees first.
  if (!used.ok || !claimed.ok) {
    return NextResponse.json(
      {
        isPro: false,
        loggedIn: true,
        willWatermark: true,
        unavailable: true,
        remaining: null,
        brandLocked: templateNeedsPro(brand),
        aiRemaining: aiUsed.ok
          ? Math.max(0, FREE_LIMITS.aiGenerationsPerMonth - aiUsed.value)
          : null,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const remaining = Math.max(0, LIMIT - used.value);
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
  const willWatermark = !claimed.value && (brandLocked || remaining <= 0);
  return NextResponse.json(
    {
      isPro: false,
      loggedIn: true,
      willWatermark,
      remaining,
      brandLocked,
      aiRemaining: aiUsed.ok
        ? Math.max(0, FREE_LIMITS.aiGenerationsPerMonth - aiUsed.value)
        : null,
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
  const claimed = await alreadyClaimed(userId, key);
  if (!claimed.ok) return unavailable();
  if (claimed.value) {
    const used = await usedCount(userId);
    return NextResponse.json({
      clean: true,
      remaining: used.ok ? Math.max(0, LIMIT - used.value) : null,
    });
  }

  // A Pro-only brand never consumes a credit — it simply exports watermarked.
  // Spending one here would be the worst of both: the user pays a credit and
  // still gets a watermark.
  //
  // Not `unavailable` when the count fails: the answer is watermarked either
  // way, and nothing is given away by admitting we cannot say how many credits
  // are left.
  if (templateNeedsPro(brand)) {
    const used = await usedCount(userId);
    return NextResponse.json({
      clean: false,
      brandLocked: true,
      remaining: used.ok ? Math.max(0, LIMIT - used.value) : null,
    });
  }

  // One call decides and records. `used` comes back from the same transaction
  // that spent the credit, so "how many left" needs no second count that could
  // disagree with the answer just given.
  const spent = await claim(userId, key);
  if (!spent.ok) return unavailable();

  return NextResponse.json({
    clean: spent.value.granted,
    remaining: Math.max(0, LIMIT - spent.value.used),
  });
}
