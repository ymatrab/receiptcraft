import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { isProEntitled, PLANS } from "@/lib/plans";
import { startOfUsageMonth } from "@/lib/usage";
import { TRACKED_EVENT_NAMES } from "@/lib/analytics-events";

export const dynamic = "force-dynamic";

/** Monthly-normalized revenue per plan, for an MRR estimate. */
const MRR_PER_PLAN: Record<string, number> = {
  pro_weekly: PLANS.pro_weekly.price * (52 / 12),
  pro_monthly: PLANS.pro_monthly.price,
  pro_yearly: PLANS.pro_yearly.price / 12,
};

const DAY = 864e5;
const since = (days: number) => new Date(Date.now() - days * DAY).toISOString();

/**
 * Ceiling on rows pulled for an in-memory tally.
 *
 * PostgREST can't GROUP BY, so per-user figures are counted in the page. The
 * cap keeps one busy month from pulling an unbounded result set into a request;
 * when it bites, the page says so rather than quietly showing a short total.
 */
const TALLY_CAP = 20000;

async function getStats() {
  const admin = createAdminClient();

  const [members, newMembers, activeSubs, openChats, subscribers] = await Promise.all([
    admin.from("profiles").select("*", { count: "exact", head: true }),
    admin
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", since(30)),
    admin
      .from("subscriptions")
      .select("plan, status, current_period_end")
      .in("status", ["active", "trialing"]),
    admin
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .eq("status", "open"),
    admin
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true })
      .is("unsubscribed_at", null),
  ]);

  // Status alone would count grants that have already run out, overstating both
  // the member count and MRR.
  const subs = (activeSubs.data ?? []).filter((s) =>
    isProEntitled(s.status, s.current_period_end)
  );
  const mrr = subs.reduce((sum, s) => sum + (MRR_PER_PLAN[s.plan ?? ""] ?? 0), 0);

  return {
    members: members.count ?? 0,
    newMembers: newMembers.count ?? 0,
    activeSubs: subs.length,
    mrr,
    openChats: openChats.count ?? 0,
    subscribers: subscribers.count ?? 0,
  };
}

interface AiMember {
  userId: string;
  email: string | null;
  pro: boolean;
  plan: string | null;
  thisMonth: number;
  last30: number;
  total: number;
  lastAt: string;
}

/**
 * AI generations, in total and per member.
 *
 * One ai_usage row is one generation. Until migration 0005 the table only ever
 * held free-tier rows — Pro was unlimited, so nothing recorded it — which meant
 * a per-user figure read zero for the members who generate most. Both are
 * counted now.
 */
async function getAiUsage() {
  const admin = createAdminClient();
  const monthStart = startOfUsageMonth().getTime();
  const thirtyDaysAgo = Date.now() - 30 * DAY;

  const [totalRes, monthRes, rowsRes] = await Promise.all([
    admin.from("ai_usage").select("*", { count: "exact", head: true }),
    admin
      .from("ai_usage")
      .select("*", { count: "exact", head: true })
      .gte("created_at", new Date(monthStart).toISOString()),
    admin
      .from("ai_usage")
      .select("user_id, created_at")
      .order("created_at", { ascending: false })
      .limit(TALLY_CAP),
  ]);

  const rows = rowsRes.data ?? [];

  const byUser = new Map<string, { thisMonth: number; last30: number; total: number; lastAt: string }>();
  let anonymous = 0;
  for (const row of rows) {
    // Generations now require an account, but rows predating that rule have no
    // user to attribute. Counted, not silently dropped.
    if (!row.user_id) {
      anonymous++;
      continue;
    }
    const entry = byUser.get(row.user_id) ?? {
      thisMonth: 0,
      last30: 0,
      total: 0,
      // Rows arrive newest-first, so the first one seen for a user is their last.
      lastAt: row.created_at,
    };
    // Parsed, not string-compared: Postgres returns "+00:00" where toISOString()
    // writes "Z", and those two do not sort against each other.
    const at = Date.parse(row.created_at);
    entry.total++;
    if (at >= thirtyDaysAgo) entry.last30++;
    if (at >= monthStart) entry.thisMonth++;
    byUser.set(row.user_id, entry);
  }

  // Emails and plans for the members who actually appear, rather than a join
  // across every profile.
  const ids = [...byUser.keys()];
  const [profilesRes, subsRes] = await Promise.all([
    ids.length
      ? admin.from("profiles").select("id, email").in("id", ids)
      : Promise.resolve({ data: [] as { id: string; email: string | null }[] }),
    ids.length
      ? admin
          .from("subscriptions")
          .select("user_id, plan, status, current_period_end")
          .in("user_id", ids)
      : Promise.resolve({
          data: [] as {
            user_id: string;
            plan: string | null;
            status: string;
            current_period_end: string | null;
          }[],
        }),
  ]);

  const emailById = new Map<string, string | null>();
  for (const p of profilesRes.data ?? []) emailById.set(p.id, p.email ?? null);

  const subByUser = new Map<string, { plan: string | null; pro: boolean }>();
  for (const s of subsRes.data ?? []) {
    if (subByUser.has(s.user_id)) continue;
    subByUser.set(s.user_id, {
      plan: s.plan,
      pro: isProEntitled(s.status, s.current_period_end),
    });
  }

  const members: AiMember[] = [...byUser.entries()]
    .map(([userId, counts]) => ({
      userId,
      email: emailById.get(userId) ?? null,
      pro: subByUser.get(userId)?.pro ?? false,
      plan: subByUser.get(userId)?.plan ?? null,
      ...counts,
    }))
    // Busiest this month first — that is the question the table is here to
    // answer. All-time breaks ties so the order is stable month to month.
    .sort((a, b) => b.thisMonth - a.thisMonth || b.total - a.total);

  const total = totalRes.count ?? 0;
  const activeThisMonth = members.filter((m) => m.thisMonth > 0).length;
  const monthTotal = monthRes.count ?? 0;

  return {
    total,
    monthTotal,
    activeThisMonth,
    anonymous,
    members,
    truncated: rows.length >= TALLY_CAP,
    avgThisMonth: activeThisMonth ? monthTotal / activeThisMonth : 0,
  };
}

interface EventRow {
  name: string;
  d7: number;
  d30: number;
}

/**
 * How many of each event arrived in the last 7 and 30 days.
 *
 * Every event lib/analytics.ts fires now lands in `events` (via /api/events),
 * so this is the whole funnel in one table — and unlike GA4 it is a join away
 * from the member who produced it.
 */
async function getEventRollup(): Promise<{ rows: EventRow[]; truncated: boolean }> {
  const admin = createAdminClient();

  /** Counts per event name for one window, grouped in Postgres where possible. */
  async function countsSince(sinceIso: string): Promise<{ counts: Map<string, number>; truncated: boolean }> {
    const { data, error } = await admin.rpc("event_counts", { since: sinceIso });
    if (!error && Array.isArray(data)) {
      const counts = new Map<string, number>();
      for (const row of data as { event_name: string; total: number | string }[]) {
        counts.set(row.event_name, Number(row.total));
      }
      return { counts, truncated: false };
    }

    // event_counts() ships with migration 0005. Before it is applied, tally in
    // memory so the dashboard still reports — that is when you most need it.
    const { data: rows } = await admin
      .from("events")
      .select("name")
      .gte("created_at", sinceIso)
      .limit(TALLY_CAP);
    const counts = new Map<string, number>();
    for (const r of rows ?? []) counts.set(r.name, (counts.get(r.name) ?? 0) + 1);
    return { counts, truncated: (rows ?? []).length >= TALLY_CAP };
  }

  const [week, month] = await Promise.all([countsSince(since(7)), countsSince(since(30))]);

  // Every known event is listed even at zero: an event that stopped firing looks
  // identical to one that never existed if the row simply disappears.
  const names = new Set<string>([...TRACKED_EVENT_NAMES, ...month.counts.keys(), ...week.counts.keys()]);
  const rows = [...names]
    .map((name) => ({ name, d7: week.counts.get(name) ?? 0, d30: month.counts.get(name) ?? 0 }))
    .sort((a, b) => b.d30 - a.d30 || b.d7 - a.d7 || a.name.localeCompare(b.name));

  return { rows, truncated: week.truncated || month.truncated };
}

/**
 * The newest events, for the activity feed.
 *
 * scroll_depth is left out. It fires up to four times per pageview site-wide,
 * so on any real traffic it is every row in a fifteen-row feed and the feed
 * stops showing anything that happened. It is still counted in the table above.
 */
async function getRecentEvents() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("events")
    .select("id, name, props, created_at")
    .neq("name", "scroll_depth")
    .order("created_at", { ascending: false })
    .limit(15);
  return data ?? [];
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default async function AdminOverview() {
  const [stats, ai, eventRollup, events] = await Promise.all([
    getStats(),
    getAiUsage(),
    getEventRollup(),
    getRecentEvents(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Overview</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Members" value={stats.members.toLocaleString()} hint={`+${stats.newMembers} in 30 days`} />
        <Stat label="Active subscriptions" value={stats.activeSubs.toLocaleString()} />
        <Stat label="Est. MRR" value={`$${stats.mrr.toFixed(0)}`} hint="Monthly recurring revenue" />
        <Stat label="Open chats" value={stats.openChats.toLocaleString()} />
      </div>

      <div className="mt-4">
        <Link href="/admin/subscribers" className="block sm:max-w-xs">
          <Stat label="Email subscribers" value={stats.subscribers.toLocaleString()} hint="Newsletter list · click to export" />
        </Link>
      </div>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">AI generations</h2>
      <p className="mt-1 text-sm text-slate-500">
        One row per receipt generated with AI, free and Pro alike.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="This month" value={ai.monthTotal.toLocaleString()} hint="Since the 1st (UTC)" />
        <Stat label="All time" value={ai.total.toLocaleString()} />
        <Stat
          label="Members using AI"
          value={ai.activeThisMonth.toLocaleString()}
          hint="Generated at least once this month"
        />
        <Stat
          label="Avg per active member"
          value={ai.avgThisMonth ? ai.avgThisMonth.toFixed(1) : "—"}
          hint="Generations this month"
        />
      </div>

      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Per member
      </h3>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        {ai.members.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No AI generations recorded yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3 text-right">This month</th>
                <th className="px-4 py-3 text-right">30 days</th>
                <th className="px-4 py-3 text-right">All time</th>
                <th className="px-4 py-3 text-right">Last used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ai.members.slice(0, 25).map((m) => (
                <tr key={m.userId}>
                  <td className="px-4 py-3 font-medium text-slate-700">{m.email ?? m.userId}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        m.pro ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {m.pro ? m.plan ?? "pro" : "free"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums text-slate-700">
                    {m.thisMonth}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-500">{m.last30}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-500">{m.total}</td>
                  <td className="px-4 py-3 text-right text-slate-500">
                    {new Date(m.lastAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p className="mt-2 text-xs text-slate-500">
        {ai.members.length > 25
          ? `Top 25 of ${ai.members.length} members who have used AI. `
          : ""}
        {ai.anonymous > 0
          ? `${ai.anonymous} older generation${ai.anonymous === 1 ? "" : "s"} predate the account requirement and have no member. `
          : ""}
        {ai.truncated ? `Counts cover the most recent ${TALLY_CAP.toLocaleString()} generations.` : ""}
      </p>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">Events</h2>
      <p className="mt-1 text-sm text-slate-500">
        Everything the site tracks, first-party. A zero here means the event has
        not arrived — which is worth a look, not a shrug.
      </p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3 text-right">7 days</th>
              <th className="px-4 py-3 text-right">30 days</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {eventRollup.rows.map((row) => (
              <tr key={row.name} className={row.d30 === 0 ? "text-slate-400" : undefined}>
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3 text-right tabular-nums">{row.d7.toLocaleString()}</td>
                <td className="px-4 py-3 text-right tabular-nums">{row.d30.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {eventRollup.truncated && (
        <p className="mt-2 text-xs text-amber-600">
          Counted from the most recent {TALLY_CAP.toLocaleString()} events — apply
          migration 0005 so the totals are grouped in Postgres instead.
        </p>
      )}

      <h2 className="mt-10 text-lg font-semibold text-slate-900">Recent activity</h2>
      <p className="mt-1 text-sm text-slate-500">
        The last 15 events, scroll depth aside — it fires on every page and would
        be the whole list.
      </p>
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {events.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No events yet.</p>
        ) : (
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100">
              {events.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3 font-medium text-slate-700">{e.name}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {e.props ? JSON.stringify(e.props) : "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500">
                    {new Date(e.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
