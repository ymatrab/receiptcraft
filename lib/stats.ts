import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";

/**
 * Real usage numbers for public copy.
 *
 * Counted at render time rather than written into the page. A hardcoded figure
 * is a claim that starts drifting the moment it ships and quietly becomes a
 * false one — and on a page whose job is to be trusted, that is the worst place
 * for it. Derived means it is true whenever anyone reads it.
 */

/**
 * Below this we publish nothing.
 *
 * A small number undersells harder than no number: "312 receipts downloaded"
 * reads as a site nobody uses, while silence reads as neutral. The floor also
 * makes this safe to ship without knowing the current value — if usage has not
 * reached it yet, the line simply does not appear until it does.
 */
export const RECEIPTS_FLOOR = 1000;

/**
 * Receipts actually downloaded, from the first-party event log.
 *
 * Deliberately counts `receipt_downloaded` rather than page views or sessions:
 * it is the one event that means somebody finished the job. Labelled in the UI
 * as what it literally is — downloads — not dressed up as "users" or "customers".
 *
 * Returns null on any failure so the caller renders nothing. A homepage that
 * breaks because a stats query timed out would be a bad trade for one line.
 */
export async function receiptsDownloaded(): Promise<number | null> {
  if (!supabaseConfigured) return null;
  try {
    const { count, error } = await createAdminClient()
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("name", "receipt_downloaded");
    if (error) return null;
    return typeof count === "number" ? count : null;
  } catch {
    return null;
  }
}
