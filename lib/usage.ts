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
  /** Watermark-free downloads claimed, and how many of the free allowance are left. */
  downloadsUsed: number;
  downloadsLeft: number;
  /** Free AI generations used since startOfUsageMonth(), and how many remain. */
  aiUsedThisMonth: number;
  aiLeftThisMonth: number;
  /** Receipts saved to the account. */
  receiptCount: number;
}

/**
 * Everything the account page needs to tell someone what they have used.
 *
 * Reads through the caller's client rather than the service role: RLS already
 * scopes download_credits, ai_usage and receipts to their owner, so a user's
 * own session is sufficient and nothing here needs elevated access.
 *
 * Counts are `head: true` — we want the number, never the rows.
 */
export async function getAccountUsage(
  supabase: ServerClient,
  userId: string
): Promise<AccountUsage> {
  const [downloads, ai, receipts] = await Promise.all([
    supabase
      .from("download_credits")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
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

  const downloadsUsed = downloads.count ?? 0;
  const aiUsedThisMonth = ai.count ?? 0;

  return {
    downloadsUsed,
    downloadsLeft: Math.max(0, FREE_LIMITS.freeReceiptDownloads - downloadsUsed),
    aiUsedThisMonth,
    aiLeftThisMonth: Math.max(0, FREE_LIMITS.aiGenerationsPerMonth - aiUsedThisMonth),
    receiptCount: receipts.count ?? 0,
  };
}
