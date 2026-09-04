/**
 * The event vocabulary, shared by the client tracker and the server ingest.
 *
 * Deliberately framework-free and without "use client": lib/analytics.ts (a
 * client module) and app/api/events/route.ts (a server route) both import it,
 * so the browser and the database can never disagree about what an event is
 * called. An event name that is not in this list is dropped at the ingest
 * rather than written — the endpoint is public, and an allowlist is what keeps
 * it from becoming an open write to our own analytics table.
 */

/** Every event name lib/analytics.ts can emit. Keep in sync with `analytics`. */
export const EVENT_NAMES = [
  // creation funnel
  "receipt_generated",
  "ai_generate",
  "download_receipt",
  "download_click",
  "watermark_prompt",
  "builder_opened",
  "edit_started",
  "select_template",
  "save_receipt",
  "ai_demo_opened",
  // revenue funnel
  "begin_checkout",
  "purchase_landed",
  "pro_activated",
  "upgrade_click",
  // accounts
  "login",
  "login_attempt",
  "login_error",
  "sign_up",
  "sign_up_error",
  "welcome_shown",
  "new_account_pricing_shown",
  "new_account_pricing_skip",
  "select_free_plan",
  // engagement
  "newsletter_signup",
  "scroll_depth",
  // reviews
  "review_prompt_shown",
  "review_prompt_clicked",
  "review_prompt_dismissed",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

const KNOWN = new Set<string>(EVENT_NAMES);

/**
 * Events that are NOT copied into our own `events` table.
 *
 * `download_receipt` is the client-side name for the action that
 * app/api/downloads/track records as `receipt_downloaded`. That route resolves
 * the user from the session cookie and knows whether the file was watermarked,
 * which the browser call does not — it is the better record of the same event.
 * Mirroring both would put two rows in the table for one download and double
 * every download figure on the dashboard.
 *
 * `scroll_depth` is the one event worth thinking twice about. It fires up to
 * four times per pageview from the root layout, on every blog post as well as
 * the product — several times the volume of everything else here combined, for
 * a page-engagement number GA4 already reports and that nothing on the
 * dashboard joins to a member. It is mirrored today because the funnel should
 * be complete; add it to this set to stop storing it if the table starts
 * costing more than the metric is worth.
 */
export const NOT_MIRRORED_EVENTS = new Set<string>([
  "download_receipt",
  // "scroll_depth",
]);

/** Should this event be written to our own `events` table? */
export function isMirroredEvent(name: string): boolean {
  return KNOWN.has(name) && !NOT_MIRRORED_EVENTS.has(name);
}

/**
 * Events written only by a server route, never by the browser.
 *
 * `receipt_downloaded` comes from app/api/downloads/track (the same action the
 * browser calls `download_receipt`); `subscription_synced` from the Stripe
 * webhook.
 */
export const SERVER_ONLY_EVENT_NAMES = ["receipt_downloaded", "subscription_synced"] as const;

/**
 * Every name that can appear in the `events` table, in funnel order.
 *
 * The admin dashboard lists these whether or not any have arrived, so an event
 * that has stopped firing shows up as a zero instead of quietly vanishing from
 * the table — a missing row looks like nothing happened, which is exactly what
 * a broken tracker also looks like.
 */
export const TRACKED_EVENT_NAMES: readonly string[] = [
  ...EVENT_NAMES.filter((n) => !NOT_MIRRORED_EVENTS.has(n)),
  ...SERVER_ONLY_EVENT_NAMES,
];

/** Longest event-name string we will consider, before the allowlist even runs. */
const MAX_NAME = 64;
const MAX_PROP_KEYS = 12;
const MAX_KEY = 40;
const MAX_VALUE = 120;

export type EventProps = Record<string, string | number | boolean>;

/**
 * Reduce a client-supplied props bag to something safe to store.
 *
 * The values arrive from the browser, so this caps how many there are and how
 * long each one is, and keeps only primitives — a nested object or an
 * unbounded string would otherwise go straight into jsonb. Numbers that aren't
 * finite are dropped rather than stored as null, which would read on the
 * dashboard as "we measured this and got nothing".
 */
export function sanitizeProps(input: unknown): EventProps | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;

  const out: EventProps = {};
  let kept = 0;
  for (const [rawKey, value] of Object.entries(input as Record<string, unknown>)) {
    if (kept >= MAX_PROP_KEYS) break;
    const key = rawKey.slice(0, MAX_KEY);
    if (!key) continue;

    if (typeof value === "string") {
      if (!value) continue;
      out[key] = value.slice(0, MAX_VALUE);
    } else if (typeof value === "number") {
      if (!Number.isFinite(value)) continue;
      out[key] = value;
    } else if (typeof value === "boolean") {
      out[key] = value;
    } else {
      continue;
    }
    kept++;
  }

  return kept > 0 ? out : null;
}

/** Trim and validate an incoming event name. Returns null if we won't store it. */
export function normalizeEventName(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const name = input.trim().slice(0, MAX_NAME);
  return isMirroredEvent(name) ? name : null;
}
