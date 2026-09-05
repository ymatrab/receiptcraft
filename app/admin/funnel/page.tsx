import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

const DAY = 864e5;
const WINDOW_DAYS = 30;

/**
 * The funnel, in order, as sessions rather than as raw event counts.
 *
 * The admin overview already tallies events by name. That answers "how much
 * happened" and cannot answer "how many people", which is every question worth
 * asking: 139 builder opens is either 139 visitors or one visitor and a
 * re-rendering component, and until events carried a session id nothing could
 * tell those apart. See supabase/migrations/0007_event_identity.sql.
 *
 * Two rules keep this page honest, both of them things a funnel chart usually
 * gets wrong:
 *
 * 1. **A stage is counted in sessions**, not events, so refreshing does not
 *    improve the conversion rate.
 * 2. **A ratio is only shown when both stages were being recorded over the same
 *    period.** Half these events have existed since July and half start today.
 *    Dividing one by the other produces a number that looks like a collapse and
 *    is arithmetic — `first_seen` is what makes that visible, and suppressing
 *    the percentage is what stops someone acting on it.
 */
const STAGES: { event: string; label: string; note: string }[] = [
  { event: "builder_opened", label: "Opened the builder", note: "Reached /create, by any route" },
  { event: "edit_started", label: "Made a real edit", note: "First actual change, not focus" },
  {
    event: "receipt_completed",
    label: "Finished a receipt",
    note: "Merchant, a priced item, and a total — the first stage that means a receipt exists",
  },
  { event: "download_click", label: "Tried to download", note: "Before any gate" },
  { event: "signup_started", label: "Left to sign up", note: "From a gate or a CTA" },
  { event: "sign_up", label: "Account created", note: "Confirmed session only" },
  {
    event: "receipt_downloaded",
    label: "Downloaded a receipt",
    note: "Server-recorded, after the file left",
  },
  { event: "pricing_viewed", label: "Saw the plans", note: "Once per session" },
  { event: "upgrade_click", label: "Clicked to upgrade", note: "Asked for money and got a click" },
  { event: "begin_checkout", label: "Chose a plan", note: "Left for the payment provider" },
  { event: "purchase_landed", label: "Came back from checkout", note: "Not proof of payment" },
  { event: "pro_activated", label: "Pro actually active", note: "Entitlement appeared" },
];

/** Where people are refused. Not a funnel — each is a wall, counted on its own. */
const WALLS: { event: string; label: string }[] = [
  { event: "download_blocked", label: "Download refused" },
  { event: "watermark_prompt", label: "Hit the watermark wall" },
  { event: "pro_template_blocked", label: "Refused a Pro template" },
  { event: "sign_up_error", label: "Sign-up failed" },
  { event: "login_error", label: "Log-in failed" },
];

type Row = {
  event_name: string;
  events: number;
  sessions: number;
  visitors: number;
  users: number;
  receipts: number;
  first_seen: string | null;
  last_seen: string | null;
};

const pct = (n: number, d: number) => (d > 0 ? `${((n / d) * 100).toFixed(1)}%` : "—");
const day = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "—";

/**
 * The share of `base` that reached `stage`, or "n/c" when the two were not
 * being recorded over the same period.
 *
 * A day of slack, because a deploy that adds two events puts them minutes
 * apart. Anything wider and one stage has a head start the other never had, so
 * the ratio between them measures the deploy date rather than the users — which
 * is the failure mode that makes a brand-new event look like a collapse.
 */
function rate(stage: Row | undefined, base: Row | undefined): string {
  if (!stage?.first_seen || !base?.first_seen) return "n/c";
  const apart = Math.abs(new Date(stage.first_seen).getTime() - new Date(base.first_seen).getTime());
  if (apart >= DAY) return "n/c";
  return pct(stage.sessions, base.sessions);
}

export default async function AdminFunnelPage() {
  if (!supabaseConfigured) {
    return <p className="text-sm text-slate-600">Supabase is not configured in this environment.</p>;
  }

  const since = new Date(Date.now() - WINDOW_DAYS * DAY).toISOString();
  const { data, error } = await createAdminClient().rpc("funnel_counts", { since });

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Funnel</h1>
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">funnel_counts is not available yet.</p>
          <p className="mt-1">
            Apply <code className="font-mono">supabase/migrations/0007_event_identity.sql</code>, then
            reload. Until it runs, events are recorded without a session id and none of the figures
            below can be computed.
          </p>
          <p className="mt-2 font-mono text-xs">{error.message}</p>
        </div>
      </div>
    );
  }

  const rows = new Map<string, Row>();
  for (const r of (data ?? []) as Row[]) rows.set(r.event_name, r);

  const top = rows.get(STAGES[0].event);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Funnel</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        Distinct sessions per stage, last {WINDOW_DAYS} days. A percentage is shown only where the
        two stages have been recorded over the same period — <strong>since</strong> is when each
        event was first ever seen, and a stage that only started counting last week cannot be
        divided into one that has counted since July.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[58rem] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Stage</th>
              <th className="px-4 py-3 text-right font-semibold">Sessions</th>
              <th className="px-4 py-3 text-right font-semibold">Visitors</th>
              <th className="px-4 py-3 text-right font-semibold">Events</th>
              <th className="px-4 py-3 text-right font-semibold" title="Distinct receipts this stage touched">
                Receipts
              </th>
              <th className="px-4 py-3 text-right font-semibold">From previous</th>
              <th className="px-4 py-3 text-right font-semibold">From top</th>
              <th className="px-4 py-3 text-right font-semibold">Since</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {STAGES.map((stage, i) => {
              const row = rows.get(stage.event);
              const prev = i > 0 ? rows.get(STAGES[i - 1].event) : undefined;
              return (
                <tr key={stage.event} className={row ? "" : "text-slate-400"}>
                  <td className="px-4 py-3">
                    <span className="font-medium text-slate-900">{stage.label}</span>
                    <span className="block font-mono text-xs text-slate-400">{stage.event}</span>
                    <span className="block text-xs text-slate-500">{stage.note}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-slate-900">
                    {row ? row.sessions.toLocaleString() : "0"}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-600">
                    {row ? row.visitors.toLocaleString() : "0"}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-500">
                    {row ? row.events.toLocaleString() : "0"}
                  </td>
                  {/* Distinct receipts, which is how "downloaded twice" stops
                      being confused with "made a second receipt" — the
                      difference between a one-off visitor and a returning one,
                      and unanswerable before events carried a receipt id. */}
                  <td className="px-4 py-3 text-right tabular-nums text-slate-500">
                    {row && row.receipts > 0 ? row.receipts.toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {i === 0 ? "—" : rate(row, prev)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                    {i === 0 ? "—" : rate(row, top)}
                  </td>
                  <td className="px-4 py-3 text-right text-xs tabular-nums text-slate-500">
                    {day(row?.first_seen ?? null)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        <strong>n/c</strong> — not comparable: the two stages started being recorded more than a day
        apart, so a ratio between them would measure the deploy, not the users.
      </p>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">Where people are refused</h2>
      <p className="mt-1 max-w-2xl text-sm text-slate-600">
        Walls, not stages. These are counted separately on purpose: none of them is someone choosing
        to leave, and folding them into the funnel above makes a blocked user look like a
        disinterested one.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WALLS.map((wall) => {
          const row = rows.get(wall.event);
          return (
            <div key={wall.event} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">{wall.label}</p>
              <p className="mt-1 text-3xl font-bold tabular-nums text-slate-900">
                {row ? row.sessions.toLocaleString() : "0"}
              </p>
              <p className="mt-1 font-mono text-xs text-slate-400">{wall.event}</p>
              <p className="mt-1 text-xs text-slate-500">
                {row ? `${row.events.toLocaleString()} events · since ${day(row.first_seen)}` : "Not seen yet"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
