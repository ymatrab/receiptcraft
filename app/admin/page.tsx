import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { isProEntitled, PLANS } from "@/lib/plans";
import { startOfUsageMonth } from "@/lib/usage";
import { TRACKED_EVENT_NAMES } from "@/lib/analytics-events";
import { getTraffic, FUNNEL_STEPS, ROW_CAP, isoDay, type StepKey } from "@/lib/admin-traffic";
import { getBingSearch, getGoogleSearch, type DailySearch, type SearchSource } from "@/lib/search-stats";
import { DailyBars, Funnel, type Point } from "./charts";

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
    // funnel_counts() (migration 0007) is applied in production; event_counts()
    // (0005) is not — verified 2026-10-14. Try the one that exists first.
    const funnel = await admin.rpc("funnel_counts", { since: sinceIso });
    if (!funnel.error && Array.isArray(funnel.data)) {
      const counts = new Map<string, number>();
      for (const row of funnel.data as { event_name: string; events: number | string }[]) {
        counts.set(row.event_name, Number(row.events));
      }
      return { counts, truncated: false };
    }

    const { data, error } = await admin.rpc("event_counts", { since: sinceIso });
    if (!error && Array.isArray(data)) {
      const counts = new Map<string, number>();
      for (const row of data as { event_name: string; total: number | string }[]) {
        counts.set(row.event_name, Number(row.total));
      }
      return { counts, truncated: false };
    }

    // Neither function exists: tally in memory. Paged, because Supabase caps a
    // single response at 1,000 rows — an unpaged read here once reported more
    // events in 7 days than in 30, because each window got an arbitrary 1,000.
    const counts = new Map<string, number>();
    let seen = 0;
    for (let from = 0; from < TALLY_CAP; from += 1000) {
      const { data: rows } = await admin
        .from("events")
        .select("name")
        .gte("created_at", sinceIso)
        .order("id", { ascending: true })
        .range(from, from + 999);
      if (!rows) break;
      for (const r of rows) counts.set(r.name, (counts.get(r.name) ?? 0) + 1);
      seen += rows.length;
      if (rows.length < 1000) break;
    }
    return { counts, truncated: seen >= TALLY_CAP };
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
    // visit is one row per session — on real traffic it would crowd out the
    // actions this feed is for, just like scroll_depth.
    .not("name", "in", "(scroll_depth,visit)")
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

/** Window for the charts and the funnel. */
const RANGE_DAYS = 30;

/** One search engine's daily rows laid onto the dashboard's day keys. */
function searchSeries(src: SearchSource, days: string[], field: keyof Omit<DailySearch, "date">): Point[] {
  const byDay = new Map<string, number>(src.ok ? src.days.map((d) => [d.date, d[field]] as [string, number]) : []);
  return days.map((date) => ({ date, value: byDay.get(date) ?? 0 }));
}

const addSeries = (a: Point[], b: Point[]): Point[] => a.map((p, i) => ({ date: p.date, value: p.value + (b[i]?.value ?? 0) }));
const total = (pts: Point[]) => pts.reduce((n, p) => n + p.value, 0);

/** Labels for the source column. */
const SOURCE_LABEL: Record<string, string> = {
  google: "Google",
  bing: "Bing",
  direct: "Direct / unknown",
  referral: "Other websites",
  pinterest: "Pinterest",
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  gemini: "Gemini",
  copilot: "Copilot",
  claude: "Claude",
  duckduckgo: "DuckDuckGo",
  yahoo: "Yahoo",
  meta: "Facebook / Instagram",
  unknown: "Unknown",
};

export default async function AdminOverview() {
  const [stats, ai, eventRollup, events, traffic, google, bing] = await Promise.all([
    getStats(),
    getAiUsage(),
    getEventRollup(),
    getRecentEvents(),
    getTraffic(RANGE_DAYS),
    getGoogleSearch(RANGE_DAYS + 3),
    getBingSearch(RANGE_DAYS + 3),
  ]);

  const searchClicks = addSeries(
    searchSeries(google, traffic.days, "clicks"),
    searchSeries(bing, traffic.days, "clicks")
  );
  const searchImpressions = addSeries(
    searchSeries(google, traffic.days, "impressions"),
    searchSeries(bing, traffic.days, "impressions")
  );
  const anySearch = google.ok || bing.ok;
  // Search Console publishes with a 2–3 day lag, so the newest days read low.
  const searchPartialFrom = isoDay(Date.now() - 2 * 864e5);

  // The search funnel compares like with like: an engine's clicks against
  // visits from that engine, over the same days — from the day session
  // tracking began, up to where the engines' reporting lag starts. Without
  // that window a month of clicks would be set against a day of visits.
  const firstTrackedDay = traffic.firstSessionAt ? isoDay(Date.parse(traffic.firstSessionAt)) : null;
  const inSearchWindow = (date: string) =>
    // Strictly after the first day: tracking began part-way through it.
    firstTrackedDay !== null && date > firstTrackedDay && date < searchPartialFrom;
  const windowSum = (pts: Point[]) => total(pts.filter((p) => inSearchWindow(p.date)));
  const searchWindowDays = traffic.days.filter(inSearchWindow).length;
  const funnelImpressions = windowSum(searchImpressions);
  const funnelClicks = windowSum(searchClicks);
  const searchVisits =
    (google.ok ? windowSum(traffic.engineVisits.google) : 0) + (bing.ok ? windowSum(traffic.engineVisits.bing) : 0);
  const connected = [google.ok && "Google", bing.ok && "Bing"].filter(Boolean).join(" + ");

  const searchByEngine: Record<string, { impressions: number; clicks: number }> = {
    google: {
      impressions: windowSum(searchSeries(google, traffic.days, "impressions")),
      clicks: windowSum(searchSeries(google, traffic.days, "clicks")),
    },
    bing: {
      impressions: windowSum(searchSeries(bing, traffic.days, "impressions")),
      clicks: windowSum(searchSeries(bing, traffic.days, "clicks")),
    },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Overview</h1>

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Traffic & sign-ups</h2>
      <p className="mt-1 text-sm text-slate-500">
        Last {RANGE_DAYS} days, per day (UTC). Hover a bar for its value.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DailyBars
          title="Visits"
          points={traffic.visits}
          hint="Browser sessions that loaded a page. Bots excluded."
        />
        <DailyBars
          title="Sign-ups"
          points={traffic.signups}
          color="#059669"
          label="Free"
          base={{ label: "Paid", color: "#eab308", points: traffic.signupsPaid }}
          hint="New accounts, counted from the database. Paid: the account has bought a pass since (admin grants don't count)."
        />
        <DailyBars
          title={`Search clicks${connected ? ` · ${connected}` : ""}`}
          points={searchClicks}
          color="#0284c7"
          partialFrom={searchPartialFrom}
          hint={anySearch ? "Grey days are still being filled in by the search engines." : google.ok ? undefined : google.reason}
        />
        <DailyBars
          title="Search impressions"
          points={searchImpressions}
          color="#7dd3fc"
          partialFrom={searchPartialFrom}
          hint={anySearch ? undefined : "Connect Search Console or Bing to fill this in."}
        />
        <DailyBars title="Receipts started" points={traffic.started} color="#d97706" hint="First real edit in the builder." />
        <DailyBars title="Downloads" points={traffic.downloads} color="#9333ea" hint="Files actually downloaded, any plan." />
      </div>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">Funnel</h2>
      <p className="mt-1 text-sm text-slate-500">
        Where people drop out, last {RANGE_DAYS} days. Steps after the first count
        browser sessions that reached them, so one person who downloads three
        times is one, not three.
        {traffic.firstSessionAt &&
          ` Visit tracking began ${new Date(traffic.firstSessionAt).toLocaleDateString()} — earlier sessions are not in these numbers; the Funnel page has the full history without sources.`}
      </p>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
        1 · From search to the site
      </h3>
      <div className="mt-3">
        <Funnel
          steps={[
            {
              label: "Seen in search",
              value: funnelImpressions,
              source: connected ? `${connected} impressions` : "not connected",
              missing: !anySearch || searchWindowDays === 0,
            },
            {
              label: "Clicked through",
              value: funnelClicks,
              source: connected ? `${connected} clicks` : "not connected",
              missing: !anySearch || searchWindowDays === 0,
            },
            {
              label: "Page loaded",
              value: searchVisits,
              source: "visits from those engines",
              missing: !anySearch || searchWindowDays === 0,
            },
          ]}
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        {searchWindowDays > 0
          ? `Covers the ${searchWindowDays} complete day${searchWindowDays === 1 ? "" : "s"} since visit tracking began. `
          : "Fills in once visit tracking has run for a few days — search engines report 2–3 days late. "}
        {!google.ok && <>Google: {google.reason}. </>}
        {!bing.ok && <>Bing: {bing.reason}. </>}
        Clicks that never become a visit left before the page finished loading,
        or block scripts.
      </p>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
        2 · On the site, every source
      </h3>
      <p className="mt-1 text-xs text-slate-500">
        Stage-by-stage detail, walls and history:{" "}
        <Link href="/admin/funnel" className="text-indigo-600 underline">Funnel page</Link>.
      </p>
      <div className="mt-3">
        <Funnel
          steps={FUNNEL_STEPS.map((step) => ({
            label: step.label,
            value: traffic.funnel.steps[step.key],
            source: step.events.join(" / "),
          }))}
        />
      </div>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
        3 · By source
      </h3>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        {traffic.funnelBySource.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            No sessions recorded yet — they start arriving once this version is live.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Source</th>
                <th className="px-3 py-3 text-right">Impr.</th>
                <th className="px-3 py-3 text-right">Clicks</th>
                {FUNNEL_STEPS.map((s) => (
                  <th key={s.key} className="px-3 py-3 text-right">
                    {s.short}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Visit → sign-up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {traffic.funnelBySource.map((row) => {
                const engine = searchByEngine[row.source];
                const engineOk =
                  searchWindowDays > 0 &&
                  ((row.source === "google" && google.ok) || (row.source === "bing" && bing.ok));
                return (
                  <tr key={row.source}>
                    <td className="px-4 py-3 font-medium text-slate-700">{SOURCE_LABEL[row.source] ?? row.source}</td>
                    <td className="px-3 py-3 text-right tabular-nums text-slate-400">
                      {engine && engineOk ? engine.impressions.toLocaleString() : "—"}
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums text-slate-400">
                      {engine && engineOk ? engine.clicks.toLocaleString() : "—"}
                    </td>
                    {FUNNEL_STEPS.map((s) => (
                      <td
                        key={s.key}
                        className={`px-3 py-3 text-right tabular-nums ${row.steps[s.key as StepKey] ? "text-slate-700" : "text-slate-300"}`}
                      >
                        {row.steps[s.key as StepKey].toLocaleString()}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right tabular-nums font-medium text-slate-700">
                      {row.steps.visit ? `${((row.steps.signup / row.steps.visit) * 100).toFixed(1)}%` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Source is the site that sent the visit; a direct return within a week
        keeps the source that brought the visitor first. Impressions and clicks
        come from the search engine itself, over the same complete days as the
        search funnel above.
        {traffic.truncated && ` Counted from the first ${ROW_CAP.toLocaleString()} events of the period.`}
      </p>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">Business</h2>

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
        The last 15 events, visits and scroll depth aside — they fire on every
        page and would be the whole list.
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
