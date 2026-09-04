import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

/**
 * Does every table the app depends on actually exist and answer?
 *
 * This page exists because of what happened without it. `download_credits` was
 * written as migration 0004, committed, referenced from three files — and never
 * applied to production. Every read against it failed, the calling code turned
 * the failure into "0 credits used", and the free tier quietly became unlimited
 * watermark-free downloads. Nothing anywhere said so: no error surfaced to a
 * user, the account page printed a confident "1 of 1 left", and the admin
 * overview was full of numbers that all came from tables that did happen to
 * exist. It was found by querying PostgREST by hand.
 *
 * A missing table is a deploy-time mistake with a runtime cost and a two-second
 * check. This is the two-second check.
 *
 * Read-only: `head: true` with `limit 0` fetches no rows, only the count and
 * whatever error the schema cache wants to raise.
 */

/** Tables the product cannot work correctly without, and what breaks. */
const REQUIRED: { table: string; purpose: string }[] = [
  { table: "profiles", purpose: "Accounts. Everything joins to this." },
  { table: "subscriptions", purpose: "Pro entitlement — who has paid and until when." },
  {
    table: "download_credits",
    purpose:
      "The free watermark-free download allowance. Missing means every free account exports clean, without limit.",
  },
  { table: "ai_usage", purpose: "The free monthly AI generation allowance." },
  { table: "receipts", purpose: "Saved receipts on an account." },
  { table: "events", purpose: "The product funnel. Missing means no measurement at all." },
  { table: "newsletter_subscribers", purpose: "Newsletter list." },
  { table: "conversations", purpose: "Support chat threads." },
];

type Probe = {
  table: string;
  purpose: string;
  ok: boolean;
  rows: number | null;
  code: string | null;
  message: string | null;
};

async function probe(table: string, purpose: string): Promise<Probe> {
  const { count, error } = await createAdminClient()
    .from(table)
    .select("*", { count: "exact", head: true });
  return {
    table,
    purpose,
    ok: !error,
    rows: error ? null : count,
    code: error?.code ?? null,
    message: error?.message ?? null,
  };
}

export default async function AdminHealthPage() {
  if (!supabaseConfigured) {
    return (
      <p className="text-sm text-slate-600">
        Supabase is not configured in this environment, so there is nothing to check.
      </p>
    );
  }

  const probes = await Promise.all(REQUIRED.map((r) => probe(r.table, r.purpose)));
  const broken = probes.filter((p) => !p.ok);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Database health</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        Every table the app reads, probed through PostgREST with the service role. A table
        that is missing here is missing in production, whatever the migrations folder says.
      </p>

      {broken.length > 0 ? (
        <div className="mt-6 rounded-2xl border border-red-300 bg-red-50 p-5">
          <p className="text-sm font-semibold text-red-900">
            {broken.length} {broken.length === 1 ? "table is" : "tables are"} unreachable
          </p>
          <p className="mt-1 text-sm text-red-800">
            {broken.some((b) => b.code === "PGRST205")
              ? "PGRST205 means PostgREST cannot see the table: either the migration was never applied, or its schema cache is stale. Apply the matching file in supabase/migrations and run: notify pgrst, 'reload schema';"
              : "Check the error against supabase/migrations."}
          </p>
        </div>
      ) : (
        <p className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-5 text-sm font-semibold text-emerald-900">
          All {probes.length} tables reachable.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Table</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Rows</th>
              <th className="px-4 py-3 font-semibold">What depends on it</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {probes.map((p) => (
              <tr key={p.table} className={p.ok ? "" : "bg-red-50"}>
                <td className="px-4 py-3 font-mono text-xs text-slate-900">{p.table}</td>
                <td className="px-4 py-3">
                  {p.ok ? (
                    <span className="font-medium text-emerald-700">OK</span>
                  ) : (
                    <span className="font-medium text-red-700">
                      {p.code}
                      {p.message ? <span className="block font-normal">{p.message}</span> : null}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                  {p.rows === null ? "—" : p.rows.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-slate-600">{p.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
