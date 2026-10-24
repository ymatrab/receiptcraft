import { FREE_LIMITS } from "@/lib/plans";

/**
 * The server client's own type, derived rather than imported as the generic
 * `SupabaseClient` — that one defaults its type parameters and does not always
 * line up with what @supabase/ssr hands back.
 *
 * `import type` is erased at compile time, so this costs nothing at runtime and
 * does not drag `next/headers` into anything that imports this file.
 */
import type { createClient } from "@/lib/supabase/server";

type ServerClient = Awaited<ReturnType<typeof createClient>>;

/**
 * The start of the current usage month.
 *
 * The AI allowance used to be per day. Three a day compounds to about ninety a
 * month, which is more than competitors sell — so the window is now the calendar
 * month, and the allowance resets on the 1st.
 *
 * Server-local, which on Vercel means UTC. That has a real edge — someone in Los
 * Angeles gets their allowance back at 5pm on the last day of the month — but it
 * is one boundary rather than two, and the only thing worse than an odd reset
 * time is two of them disagreeing.
 *
 * It lives here because it is read in two places. app/api/ai/generate decides
 * whether to allow a generation; the account page tells the user how many are
 * left. If those ever computed the window differently, the page would say "1
 * left" and the next request would be refused — which reads as a broken product
 * rather than a quota.
 */
export function startOfUsageMonth(): Date {
  const since = new Date();
  since.setDate(1);
  since.setHours(0, 0, 0, 0);
  return since;
}

export interface AccountUsage {
  // `null` throughout means the count could not be read. `count ?? 0` once
  // turned an unreadable table into "you have used nothing"; a page that says
  // "we can't tell you right now" beats one that states the wrong number.
  //
  // There is no download allowance to report: since 2026-10-24 every non-Pro
  // download is watermarked, so download_credits is no longer read.
  /** Free AI generations used since startOfUsageMonth(), and how many remain. */
  aiUsedThisMonth: number | null;
  aiLeftThisMonth: number | null;
  /** Receipts saved to the account. */
  receiptCount: number | null;
}

/**
 * Everything the account page needs to tell someone what they have used.
 *
 * Reads through the caller's client rather than the service role: RLS already
 * scopes ai_usage and receipts to their owner, so a user's
 * own session is sufficient and nothing here needs elevated access.
 *
 * Counts are `head: true` — we want the number, never the rows.
 */
export async function getAccountUsage(
  supabase: ServerClient,
  userId: string
): Promise<AccountUsage> {
  const [ai, receipts] = await Promise.all([
    // Free rows only: ai_usage records Pro generations as well, and those are
    // unlimited — counting them would make "3 of 3 used" appear on an account
    // that has no allowance to spend.
    supabase
      .from("ai_usage")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("pro", false)
      .gte("created_at", startOfUsageMonth().toISOString()),
    supabase.from("receipts").select("*", { count: "exact", head: true }).eq("user_id", userId),
  ]);

  // `error ? null : count` rather than `count ?? 0`. A query that failed and a
  // query that found nothing are different answers, and only one of them is a
  // number.
  const countOf = (r: { count: number | null; error: unknown }): number | null =>
    r.error ? null : r.count;

  const aiUsedThisMonth = countOf(ai);
  const left = (limit: number, used: number | null) =>
    used === null ? null : Math.max(0, limit - used);

  return {
    aiUsedThisMonth,
    aiLeftThisMonth: left(FREE_LIMITS.aiGenerationsPerMonth, aiUsedThisMonth),
    receiptCount: countOf(receipts),
  };
}
