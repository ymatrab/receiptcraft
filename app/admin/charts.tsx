/**
 * Dependency-free charts for the admin overview: plain SVG and divs, rendered
 * on the server. Hovering a bar shows its date and value via an SVG <title>.
 */

export interface Point {
  date: string;
  value: number;
}

const sum = (pts: Point[]) => pts.reduce((n, p) => n + p.value, 0);
const fmt = (n: number) => Math.round(n).toLocaleString();
const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

/** Last 7 days against the 7 before them, as a signed percentage. */
function weekChange(pts: Point[]): number | null {
  if (pts.length < 14) return null;
  const last = sum(pts.slice(-7));
  const prev = sum(pts.slice(-14, -7));
  if (prev === 0) return last === 0 ? 0 : null;
  return ((last - prev) / prev) * 100;
}

/**
 * One metric per day as bars, with its 30-day total and the week-on-week move.
 * `partialFrom` greys out trailing days whose data is known to be incomplete
 * (Search Console lags two to three days).
 */
export function DailyBars({
  title,
  points,
  color = "#4f46e5",
  hint,
  partialFrom,
}: {
  title: string;
  points: Point[];
  color?: string;
  hint?: string;
  partialFrom?: string;
}) {
  const W = 300;
  const H = 90;
  const max = Math.max(1, ...points.map((p) => p.value));
  const bw = W / Math.max(1, points.length);
  const change = weekChange(points);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm text-slate-500">{title}</p>
        {change !== null && (
          <span
            className={`text-xs font-medium ${change >= 0 ? "text-emerald-600" : "text-rose-600"}`}
            title="Last 7 days vs the 7 days before"
          >
            {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(0)}% wk
          </span>
        )}
      </div>
      <p className="mt-1 text-2xl font-bold text-slate-900">{fmt(sum(points))}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-24 w-full" preserveAspectRatio="none" role="img" aria-label={`${title} per day`}>
        <line x1="0" y1={H - 0.5} x2={W} y2={H - 0.5} stroke="#e2e8f0" />
        {points.map((p, i) => {
          const h = (p.value / max) * (H - 4);
          const partial = partialFrom !== undefined && p.date >= partialFrom;
          return (
            <rect
              key={p.date}
              x={i * bw + bw * 0.15}
              y={H - h}
              width={bw * 0.7}
              height={Math.max(h, p.value > 0 ? 1 : 0)}
              rx="1"
              fill={partial ? "#cbd5e1" : color}
            >
              <title>{`${shortDate(p.date)}: ${fmt(p.value)}${partial ? " (still filling in)" : ""}`}</title>
            </rect>
          );
        })}
      </svg>
      <div className="mt-1 flex justify-between text-[11px] text-slate-400">
        <span>{points[0] && shortDate(points[0].date)}</span>
        <span>
          peak {fmt(max)} · today {fmt(points.at(-1)?.value ?? 0)}
        </span>
        <span>{points.at(-1) && shortDate(points.at(-1)!.date)}</span>
      </div>
      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export interface FunnelStep {
  label: string;
  value: number;
  /** Where the number comes from, shown under the label. */
  source?: string;
  /** Not available (unconnected source) — drawn as a dash, never as zero. */
  missing?: boolean;
}

/**
 * Horizontal funnel. Each bar is sized against the first step; the column on
 * the right is the share of the previous step that made it through. The step
 * that loses the most people in absolute terms is flagged — that is where the
 * work is.
 */
export function Funnel({ steps }: { steps: FunnelStep[] }) {
  const top = Math.max(1, ...steps.filter((s) => !s.missing).map((s) => s.value));

  let worst = -1;
  let worstLoss = 0;
  for (let i = 1; i < steps.length; i++) {
    const prev = steps[i - 1];
    const cur = steps[i];
    if (prev.missing || cur.missing) continue;
    const loss = prev.value - cur.value;
    if (loss > worstLoss) {
      worstLoss = loss;
      worst = i;
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <ol className="space-y-3">
        {steps.map((s, i) => {
          const prev = steps[i - 1];
          const rate =
            i > 0 && !s.missing && prev && !prev.missing && prev.value > 0 ? (s.value / prev.value) * 100 : null;
          const isWorst = i === worst;
          return (
            <li key={s.label}>
              {isWorst && (
                <p className="mb-1 text-xs font-semibold text-rose-600">
                  ▼ Biggest loss: {fmt(worstLoss)} drop out between “{prev?.label}” and “{s.label}”
                </p>
              )}
              <div className="flex items-center gap-3">
                <div className="w-40 shrink-0 sm:w-48">
                  <p className="text-sm font-medium text-slate-700">{s.label}</p>
                  {s.source && <p className="text-[11px] text-slate-400">{s.source}</p>}
                </div>
                <div className="relative h-7 min-w-0 flex-1 rounded bg-slate-50">
                  {!s.missing && (
                    <div
                      className={`h-7 rounded ${isWorst ? "bg-rose-400" : "bg-indigo-500"}`}
                      style={{ width: `${Math.max((s.value / top) * 100, s.value > 0 ? 0.6 : 0)}%` }}
                    />
                  )}
                </div>
                <div className="w-28 shrink-0 text-right">
                  <p className="text-sm font-semibold tabular-nums text-slate-900">{s.missing ? "—" : fmt(s.value)}</p>
                  <p className={`text-[11px] tabular-nums ${isWorst ? "text-rose-600" : "text-slate-400"}`}>
                    {rate === null ? (i === 0 ? "start" : "") : `${rate < 10 ? rate.toFixed(1) : rate.toFixed(0)}% of previous`}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
