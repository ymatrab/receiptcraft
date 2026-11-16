import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SELL_EVENTS } from "@/lib/landing-paths";
import {
  ATTRIBUTION_WINDOW_MS,
  HANDOFF_WINDOW_MS,
  landingRows,
  type ConversionIn,
  type LandingRow,
} from "@/lib/landing-rows";
import { isSale, json, paged, readRequest, type Admin, type Range } from "@/lib/metrics-api";

/**
 * Daily sessions, hand-offs and conversions per landing page, for Command
 * Center's "API source" contract (the "rows" shape: several rows per day).
 *
 *   GET /api/metrics/landings?from=YYYY-MM-DD&to=YYYY-MM-DD
 *   x-api-key: <METRICS_API_KEY>
 *   200 {"metric": "landings", "timezone": "UTC",
 *        "data": [{"date", "landing", "sessions", "reached_sell", "signups", "purchases"}, …]}
 *
 * Definitions are in lib/landing-rows.ts; which pages sell, and which events
 * prove a visitor reached one, are in lib/landing-paths.ts. Only dates, paths
 * and counts leave this module — never an id.
 *
 * Unlike the scalar metrics, a day with no sessions and no conversions has no
 * rows at all.
 */

/** At most 92 days per request: Command Center's backfill chunk. */
const MAX_DAYS = 92;
/** Account ids per `in.(…)` filter, to keep the request URL short. */
const ID_CHUNK = 100;

type VisitRow = {
  created_at: string;
  session_id: string | null;
  anonymous_id: string | null;
  landing: string | null;
};
type EventRow = { created_at: string; session_id: string | null; anonymous_id: string | null };

/**
 * Events that carry both an account and a browser id once someone is signed
 * in. A short list rather than every event: a signed-in member's scroll and
 * edit events would multiply the rows read without adding a browser.
 */
const LINK_EVENTS = [
  "visit",
  "builder_opened",
  "ai_generate",
  "sign_up",
  "login",
  "welcome_shown",
  "new_account_pricing_shown",
  "receipt_downloaded",
  "begin_checkout",
];

/** The browsers each account has used: any LINK_EVENTS event that carries both ids. */
async function browsersOf(admin: Admin, userIds: string[]): Promise<Map<string, Set<string>>> {
  const out = new Map<string, Set<string>>();
  for (let i = 0; i < userIds.length; i += ID_CHUNK) {
    const chunk = userIds.slice(i, i + ID_CHUNK);
    const rows = await paged<{ user_id: string; anonymous_id: string }>("events(links)", (a, b) =>
      admin
        .from("events")
        .select("user_id, anonymous_id")
        .in("user_id", chunk)
        .in("name", LINK_EVENTS)
        .not("anonymous_id", "is", null)
        .order("id", { ascending: true })
        .range(a, b)
    );
    for (const r of rows) {
      const set = out.get(r.user_id) ?? new Set<string>();
      set.add(r.anonymous_id);
      out.set(r.user_id, set);
    }
  }
  return out;
}

export async function landings(admin: Admin, range: Range): Promise<LandingRow[]> {
  const startMs = Date.parse(range.startIso);
  const endMs = Date.parse(range.endIso);
  const visitsFrom = new Date(startMs - ATTRIBUTION_WINDOW_MS).toISOString();
  const lookAhead = new Date(endMs + HANDOFF_WINDOW_MS).toISOString();

  const visits = await paged<VisitRow>("events(visit)", (a, b) =>
    admin
      .from("events")
      .select("created_at, session_id, anonymous_id, landing:props->>landing")
      .eq("name", "visit")
      .gte("created_at", visitsFrom)
      .lt("created_at", lookAhead)
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(a, b)
  );

  const sells = await paged<EventRow>("events(sell)", (a, b) =>
    admin
      .from("events")
      .select("created_at, session_id, anonymous_id")
      .in("name", [...SELL_EVENTS])
      .gte("created_at", range.startIso)
      .lt("created_at", lookAhead)
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(a, b)
  );

  // Conversions, defined exactly as the signups and purchases metrics are.
  const accounts = await paged<{ id: string; created_at: string }>("profiles", (a, b) =>
    admin
      .from("profiles")
      .select("id, created_at")
      .gte("created_at", range.startIso)
      .lt("created_at", range.endIso)
      .order("created_at", { ascending: true })
      .range(a, b)
  );
  const sales = (
    await paged<{ id: string; user_id: string; created_at: string }>("subscriptions", (a, b) =>
      admin
        .from("subscriptions")
        .select("id, user_id, created_at")
        .or("id.like.cs_live_%,id.like.sub_%")
        .gte("created_at", range.startIso)
        .lt("created_at", range.endIso)
        .order("created_at", { ascending: true })
        .order("id", { ascending: true })
        .range(a, b)
    )
  ).filter((s) => isSale(s.id));

  const userIds = [...new Set([...accounts.map((p) => p.id), ...sales.map((s) => s.user_id)])];
  const browsers = await browsersOf(admin, userIds);
  const anonsOf = (userId: string) => [...(browsers.get(userId) ?? [])];

  const conversions: ConversionIn[] = [
    ...accounts.map((p) => ({ kind: "signup" as const, at: Date.parse(p.created_at), anons: anonsOf(p.id) })),
    ...sales.map((s) => ({ kind: "purchase" as const, at: Date.parse(s.created_at), anons: anonsOf(s.user_id) })),
  ];

  return landingRows(
    startMs,
    endMs,
    visits.map((v) => ({
      at: Date.parse(v.created_at),
      sid: v.session_id,
      anon: v.anonymous_id,
      landing: v.landing,
    })),
    sells.map((e) => ({ at: Date.parse(e.created_at), sid: e.session_id, anon: e.anonymous_id })),
    conversions
  );
}

/** GET /api/metrics/landings — see the header comment. */
export async function landingsHandler(req: NextRequest) {
  const range = readRequest(req, MAX_DAYS);
  if (range instanceof NextResponse) return range;

  try {
    const data = await landings(createAdminClient(), range);
    return json({ metric: "landings", timezone: "UTC", data });
  } catch (err) {
    console.error("[metrics] landings failed", err);
    return json({ error: "could not read the metric" }, 502);
  }
}
