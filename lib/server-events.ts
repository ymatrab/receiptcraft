import { createAdminClient } from "@/lib/supabase/admin";
import type { SERVER_ONLY_EVENT_NAMES } from "@/lib/analytics-events";

type ServerEvent = (typeof SERVER_ONLY_EVENT_NAMES)[number];

/**
 * Write one server-side event to the `events` table, for /admin/funnel.
 *
 * Used along the payment path so a buyer who gets stuck can be followed step by
 * step — checkout opened, came back, pass granted — and the step that failed is
 * the first one missing. Never throws: a tracking write must not break the
 * payment it is describing.
 */
export async function recordServerEvent(
  name: ServerEvent,
  userId: string | null,
  props: Record<string, string | number | boolean | null | undefined> = {}
): Promise<void> {
  try {
    const { error } = await createAdminClient()
      .from("events")
      .insert({ name, user_id: userId, props });
    if (error) console.error(`[events] ${name} not recorded`, error);
  } catch (err) {
    console.error(`[events] ${name} not recorded`, err);
  }
}

/** An error as a short string that fits in an event's props. */
export function errorText(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  return message.slice(0, 200);
}
