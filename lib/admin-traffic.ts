import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Daily series and the session funnel for the admin overview.
 *
 * Everything is counted from rows pulled into the page, because PostgREST
 * cannot GROUP BY. Supabase caps a single response at 1,000 rows, so reads are
 * paged; ROW_CAP bounds the total and the page says so when it bites.
 */

const DAY = 864e5;
export const ROW_CAP = 60000;
const PAGE = 1000;

export const isoDay = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** The last `days` calendar days (UTC), oldest first, ending today. */
export function dayKeys(days: number): string[] {
  const today = Date.parse(isoDay(Date.now()));
  return Array.from({ length: days }, (_, i) => isoDay(today - (days - 1 - i) * DAY));
}

/**
 * Funnel steps, in order. A session "reached" a step if any of the step's
 * events fired in it — steps are counted independently, so a sign-up that
 * skipped the builder still counts as a sign-up.
 */
export const FUNNEL_STEPS = [
  { key: "visit", label: "Visited the site", short: "Visits", events: ["visit"] },
  { key: "builder", label: "Opened the builder", short: "Builder", events: ["builder_opened"] },
  { key: "edit", label: "Started a receipt", short: "Started", events: ["edit_started", "receipt_generated"] },
  { key: "download", label: "Tried to download", short: "Download", events: ["download_click"] },
  { key: "signup", label: "Signed up", short: "Sign-up", events: ["sign_up"] },
  { key: "upgrade", label: "Clicked upgrade", short: "Upgrade", events: ["upgrade_click"] },
  { key: "checkout", label: "Started checkout", short: "Checkout", events: ["begin_checkout"] },
  { key: "paid", label: "Paid", short: "Paid", events: ["purchase_landed", "pro_activated"] },
] as const;

export type StepKey = (typeof FUNNEL_STEPS)[number]["key"];

const STEP_BY_EVENT = new Map<string, StepKey>();
for (const step of FUNNEL_STEPS) for (const e of step.events) STEP_BY_EVENT.set(e, step.key);

/** Events charted per day, by name. */
const DAILY_EVENTS = ["visit", "edit_started", "receipt_downloaded", "begin_checkout"] as const;

interface EventRow {
  name: string;
  created_at: string;
  sid: string | null;
  src: string | null;
}

async function pagedEvents(sinceIso: string): Promise<{ rows: EventRow[]; truncated: boolean }> {
  const admin = createAdminClient();
  const names = [...new Set<string>([...STEP_BY_EVENT.keys(), ...DAILY_EVENTS])];
  const rows: EventRow[] = [];
  for (let from = 0; from < ROW_CAP; from += PAGE) {
    const { data, error } = await admin
      .from("events")
      .select("name, created_at, sid:props->>sid, src:props->>src")
      .in("name", names)
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error || !data) break;
    rows.push(...(data as unknown as EventRow[]));
    if (data.length < PAGE) return { rows, truncated: false };
  }
  return { rows, truncated: rows.length >= ROW_CAP };
}

async function pagedSignups(sinceIso: string): Promise<string[]> {
  const admin = createAdminClient();
  const out: string[] = [];
  for (let from = 0; from < ROW_CAP; from += PAGE) {
    const { data, error } = await admin
      .from("profiles")
      .select("created_at")
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error || !data) break;
    out.push(...data.map((r) => r.created_at as string));
    if (data.length < PAGE) break;
  }
  return out;
}

export interface FunnelRow {
  source: string;
  steps: Record<StepKey, number>;
}

const emptySteps = (): Record<StepKey, number> =>
  Object.fromEntries(FUNNEL_STEPS.map((s) => [s.key, 0])) as Record<StepKey, number>;

export async function getTraffic(days: number) {
  const sinceIso = new Date(Date.parse(dayKeys(days)[0])).toISOString();
  const [{ rows, truncated }, signups] = await Promise.all([pagedEvents(sinceIso), pagedSignups(sinceIso)]);

  // ---- daily series ----
  const keys = dayKeys(days);
  const series: Record<string, Map<string, number>> = {};
  for (const name of [...DAILY_EVENTS, "signups"]) series[name] = new Map(keys.map((k) => [k, 0]));
  // Visits per day from each search engine, so the search funnel can compare
  // an engine's clicks with its visits over exactly the same days.
  const engineVisits: Record<string, Map<string, number>> = {
    google: new Map(keys.map((k) => [k, 0])),
    bing: new Map(keys.map((k) => [k, 0])),
  };
  for (const r of rows) {
    const m = series[r.name];
    if (!m) continue;
    const day = isoDay(Date.parse(r.created_at));
    if (m.has(day)) m.set(day, m.get(day)! + 1);
    const e = r.name === "visit" && r.src ? engineVisits[r.src] : undefined;
    if (e?.has(day)) e.set(day, e.get(day)! + 1);
  }
  // Sign-ups from profiles, not the sign_up event: an account row is exact,
  // and it has history from before any event was tracked.
  for (const at of signups) {
    const day = isoDay(Date.parse(at));
    const m = series.signups;
    if (m.has(day)) m.set(day, m.get(day)! + 1);
  }
  const daily = (name: string) => keys.map((date) => ({ date, value: series[name].get(date) ?? 0 }));

  // ---- session funnel ----
  // A session's source is the one on its visit row; any event of the session
  // will do when the visit itself was missed.
  const sessions = new Map<string, { src: string; reached: Set<StepKey> }>();
  let firstSessionAt: string | null = null;
  for (const r of rows) {
    if (!r.sid) continue;
    const step = STEP_BY_EVENT.get(r.name);
    if (!step) continue;
    firstSessionAt ??= r.created_at;
    const s = sessions.get(r.sid) ?? { src: r.src ?? "unknown", reached: new Set<StepKey>() };
    if (r.name === "visit" && r.src) s.src = r.src;
    s.reached.add(step);
    sessions.set(r.sid, s);
  }

  const total: FunnelRow = { source: "all", steps: emptySteps() };
  const bySource = new Map<string, FunnelRow>();
  for (const s of sessions.values()) {
    const row = bySource.get(s.src) ?? { source: s.src, steps: emptySteps() };
    for (const step of s.reached) {
      row.steps[step]++;
      total.steps[step]++;
    }
    bySource.set(s.src, row);
  }

  return {
    days: keys,
    visits: daily("visit"),
    signups: daily("signups"),
    started: daily("edit_started"),
    downloads: daily("receipt_downloaded"),
    checkouts: daily("begin_checkout"),
    engineVisits: {
      google: keys.map((date) => ({ date, value: engineVisits.google.get(date) ?? 0 })),
      bing: keys.map((date) => ({ date, value: engineVisits.bing.get(date) ?? 0 })),
    },
    funnel: total,
    funnelBySource: [...bySource.values()].sort((a, b) => b.steps.visit - a.steps.visit),
    firstSessionAt,
    truncated,
  };
}
