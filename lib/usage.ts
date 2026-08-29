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
 * The start of the current usage day.
 *
 * This is server-local midnight, which on Vercel means UTC. That is a choice
 * with a real edge — someone in Los Angeles gets their AI generations back at
 * 5pm rather than at midnight — but it is the boundary the limiter has always
 * used, and the only thing worse than an odd reset time is two of them.
 *
 * It lives here because it is now read in two places. app/api/ai/generate
 * decides whether to allow a generation; the account page tells the user how
 * many they have left. If those two ever compute "today" differently, the page
 * says "1 left" and the next request is refused — which reads as a broken
 * product rather than a quota.
 */
export function startOfUsageDay(): Date {
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  return since;
}

export interface AccountUsage {
  /** Watermark-free downloads claimed, and how many of the free allowance are left. */
  downloadsUsed: number;
  downloadsLeft: number;
  /** AI generations used since startOfUsageDay(), and how many remain. */
  aiUsedToday: number;
  aiLeftToday: number;
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
    supabase
      .from("ai_usage")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", startOfUsageDay().toISOString()),
    supabase.from("receipts").select("*", { count: "exact", head: true }).eq("user_id", userId),
  ]);

  const downloadsUsed = downloads.count ?? 0;
  const aiUsedToday = ai.count ?? 0;

  return {
    downloadsUsed,
    downloadsLeft: Math.max(0, FREE_LIMITS.freeReceiptDownloads - downloadsUsed),
    aiUsedToday,
    aiLeftToday: Math.max(0, FREE_LIMITS.aiGenerationsPerDay - aiUsedToday),
    receiptCount: receipts.count ?? 0,
  };
}
