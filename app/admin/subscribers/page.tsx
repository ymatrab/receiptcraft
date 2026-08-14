import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

interface Subscriber {
  email: string;
  source: string;
  unsubscribed_at: string | null;
  created_at: string;
}

async function getSubscribers() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("newsletter_subscribers")
    .select("email, source, unsubscribed_at, created_at")
    .order("created_at", { ascending: false })
    .limit(1000);

  const rows = (data ?? []) as Subscriber[];
  const active = rows.filter((r) => !r.unsubscribed_at);
  const thirtyDaysAgo = Date.now() - 30 * 864e5;
  const last30 = active.filter((r) => new Date(r.created_at).getTime() >= thirtyDaysAgo).length;

  // Signups grouped by where the form was rendered (footer, blog, ...).
  const bySource = new Map<string, number>();
  for (const r of active) bySource.set(r.source, (bySource.get(r.source) ?? 0) + 1);
  const sources = [...bySource.entries()].sort((a, b) => b[1] - a[1]);

  return { rows, activeCount: active.length, last30, sources };
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export default async function AdminSubscribers() {
  const { rows, activeCount, last30, sources } = await getSubscribers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Email subscribers</h1>
        {rows.length > 0 && (
          <a
            href="/admin/subscribers/export"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            ⬇ Export CSV (Excel)
          </a>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Active subscribers" value={activeCount.toLocaleString()} />
        <Stat label="New in 30 days" value={`+${last30.toLocaleString()}`} />
        <Stat
          label="Top source"
          value={sources[0]?.[0] ?? "—"}
          hint={sources[0] ? `${sources[0][1]} signups` : undefined}
        />
      </div>

      {sources.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {sources.map(([src, n]) => (
            <span
              key={src}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
            >
              {src}: {n}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        {rows.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            No subscribers yet. The signup form lives in the site footer —{" "}
            <Link href="/" className="font-medium text-indigo-600 hover:underline">
              view it
            </Link>
            .
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Signed up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.email}>
                  <td className="px-4 py-3 font-medium text-slate-700">{r.email}</td>
                  <td className="px-4 py-3 text-slate-500">{r.source}</td>
                  <td className="px-4 py-3">
                    {r.unsubscribed_at ? (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                        unsubscribed
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        subscribed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-400">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Showing up to 1,000 most recent. The CSV export includes every subscriber.
      </p>
    </div>
  );
}
