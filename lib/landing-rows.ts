import { isSellPath, normalizeLandingPath } from "./landing-paths";

/**
 * The arithmetic of the landings metric, kept free of the database so it can
 * be read (and checked) on its own. lib/landing-metrics.ts loads the rows.
 *
 * One output row per UTC day × landing path:
 *
 * - sessions     — sessions that started on that path that day (one `visit`
 *                  row per session; a visit with no session id is its own).
 * - reached_sell — of those, sessions that reached a sell page after landing:
 *                  the same session has a SELL_EVENTS event, or the same
 *                  browser (anonymous_id) has one, or starts a new session on a
 *                  sell page, within 24 hours of the landing.
 * - signups /
 *   purchases    — conversions on that day, credited to the converting
 *                  account's FIRST landing in the 30 days before it (first
 *                  touch, across all of that account's browsers). Conversions
 *                  with no linked browser visit go to "(unattributed)", so the
 *                  daily totals still match the signups / purchases metrics.
 */

export const HANDOFF_WINDOW_MS = 24 * 36e5;
export const ATTRIBUTION_WINDOW_MS = 30 * 864e5;
/** Most landing paths reported per day; the rest are summed into OTHER. */
export const MAX_PATHS_PER_DAY = 500;
export const OTHER = "(other)";
export const UNATTRIBUTED = "(unattributed)";

export type VisitIn = { at: number; sid: string | null; anon: string | null; landing: string | null };
export type SellEventIn = { at: number; sid: string | null; anon: string | null };
export type ConversionIn = { kind: "signup" | "purchase"; at: number; anons: string[] };

export type LandingRow = {
  date: string;
  landing: string;
  sessions: number;
  reached_sell: number;
  signups: number;
  purchases: number;
};

const day = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** Is there a time in sorted `times` within [from, to]? */
function anyBetween(times: number[] | undefined, from: number, to: number): boolean {
  if (!times?.length) return false;
  let lo = 0;
  let hi = times.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (times[mid] < from) lo = mid + 1;
    else hi = mid;
  }
  return lo < times.length && times[lo] <= to;
}

function push(map: Map<string, number[]>, key: string, at: number) {
  const list = map.get(key);
  if (list) list.push(at);
  else map.set(key, [at]);
}

/**
 * @param startMs  first instant of the range (UTC midnight of `from`)
 * @param endMs    first instant after the range (UTC midnight after `to`)
 * @param visits   every `visit` from startMs − 30 days to endMs + 24 h
 * @param sells    every SELL_EVENTS event from startMs to endMs + 24 h
 * @param conversions sign-ups and purchases inside the range, each with the
 *                 browsers (anonymous ids) known to belong to the account
 */
export function landingRows(
  startMs: number,
  endMs: number,
  visits: VisitIn[],
  sells: SellEventIn[],
  conversions: ConversionIn[]
): LandingRow[] {
  const sellSessions = new Set<string>();
  const sellByAnon = new Map<string, number[]>();
  for (const e of sells) {
    if (e.sid) sellSessions.add(e.sid);
    if (e.anon) push(sellByAnon, e.anon, e.at);
  }

  // One visit per session (the earliest), oldest first.
  const ordered = [...visits].sort((a, b) => a.at - b.at);
  const seen = new Set<string>();
  const sessions: (VisitIn & { path: string })[] = [];
  const visitsByAnon = new Map<string, { at: number; path: string }[]>();
  for (const v of ordered) {
    if (v.sid) {
      if (seen.has(v.sid)) continue;
      seen.add(v.sid);
    }
    const path = normalizeLandingPath(v.landing);
    sessions.push({ ...v, path });
    if (v.anon) {
      const list = visitsByAnon.get(v.anon) ?? [];
      list.push({ at: v.at, path });
      visitsByAnon.set(v.anon, list);
      // A new session that lands on a sell page counts as reaching one.
      if (isSellPath(path)) push(sellByAnon, v.anon, v.at);
    }
  }
  for (const list of sellByAnon.values()) list.sort((a, b) => a - b);

  type Acc = Omit<LandingRow, "date" | "landing">;
  const days = new Map<string, Map<string, Acc>>();
  const cell = (date: string, landing: string): Acc => {
    let byPath = days.get(date);
    if (!byPath) days.set(date, (byPath = new Map()));
    let acc = byPath.get(landing);
    if (!acc) byPath.set(landing, (acc = { sessions: 0, reached_sell: 0, signups: 0, purchases: 0 }));
    return acc;
  };

  for (const s of sessions) {
    if (s.at < startMs || s.at >= endMs) continue;
    const acc = cell(day(s.at), s.path);
    acc.sessions++;
    const reached =
      (s.sid !== null && sellSessions.has(s.sid)) ||
      // Strictly after the landing, so the landing visit itself never counts.
      (s.anon !== null && anyBetween(sellByAnon.get(s.anon), s.at + 1, s.at + HANDOFF_WINDOW_MS));
    if (reached) acc.reached_sell++;
  }

  for (const c of conversions) {
    if (c.at < startMs || c.at >= endMs) continue;
    let first: { at: number; path: string } | null = null;
    for (const anon of new Set(c.anons)) {
      for (const v of visitsByAnon.get(anon) ?? []) {
        if (v.at > c.at || v.at < c.at - ATTRIBUTION_WINDOW_MS) continue;
        if (!first || v.at < first.at) first = v;
      }
    }
    const acc = cell(day(c.at), first?.path ?? UNATTRIBUTED);
    if (c.kind === "signup") acc.signups++;
    else acc.purchases++;
  }

  const out: LandingRow[] = [];
  for (const date of [...days.keys()].sort()) {
    const rows = [...days.get(date)!.entries()].map(([landing, acc]) => ({ date, landing, ...acc }));
    rows.sort(
      (a, b) =>
        b.sessions - a.sessions ||
        b.signups + b.purchases - (a.signups + a.purchases) ||
        a.landing.localeCompare(b.landing)
    );
    const kept = rows.filter((r) => r.landing !== OTHER && r.landing !== UNATTRIBUTED).slice(0, MAX_PATHS_PER_DAY);
    const keptSet = new Set(kept);
    const rest = rows.filter((r) => !keptSet.has(r) && r.landing !== UNATTRIBUTED);
    const unattributed = rows.find((r) => r.landing === UNATTRIBUTED);
    out.push(...kept);
    if (rest.length) {
      const other: LandingRow = { date, landing: OTHER, sessions: 0, reached_sell: 0, signups: 0, purchases: 0 };
      for (const r of rest) {
        other.sessions += r.sessions;
        other.reached_sell += r.reached_sell;
        other.signups += r.signups;
        other.purchases += r.purchases;
      }
      out.push(other);
    }
    if (unattributed) out.push(unattributed);
  }
  return out;
}
