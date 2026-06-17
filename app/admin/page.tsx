import { createAdminClient } from "@/lib/supabase/admin";
import { PLANS } from "@/lib/plans";

export const dynamic = "force-dynamic";

/** Monthly-normalized revenue per plan, for an MRR estimate. */
const MRR_PER_PLAN: Record<string, number> = {
  pro_monthly: PLANS.pro_monthly.price,
  pro_yearly: PLANS.pro_yearly.price / 12,
};

async function getStats() {
  const admin = createAdminClient();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 864e5).toISOString();

  const [members, newMembers, activeSubs, openChats] = await Promise.all([
    admin.from("profiles").select("*", { count: "exact", head: true }),
    admin
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", thirtyDaysAgo),
    admin.from("subscriptions").select("plan, status").in("status", ["active", "trialing"]),
    admin
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .eq("status", "open"),
  ]);

  const subs = activeSubs.data ?? [];
  const mrr = subs.reduce((sum, s) => sum + (MRR_PER_PLAN[s.plan ?? ""] ?? 0), 0);

  return {
    members: members.count ?? 0,
    newMembers: newMembers.count ?? 0,
    activeSubs: subs.length,
    mrr,
    openChats: openChats.count ?? 0,
  };
}

async function getRecentEvents() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("events")
    .select("id, name, props, created_at")
    .order("created_at", { ascending: false })
    .limit(15);
  return data ?? [];
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

export default async function AdminOverview() {
  const [stats, events] = await Promise.all([getStats(), getRecentEvents()]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Overview</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Members" value={stats.members.toLocaleString()} hint={`+${stats.newMembers} in 30 days`} />
        <Stat label="Active subscriptions" value={stats.activeSubs.toLocaleString()} />
        <Stat label="Est. MRR" value={`$${stats.mrr.toFixed(0)}`} hint="Monthly recurring revenue" />
        <Stat label="Open chats" value={stats.openChats.toLocaleString()} />
      </div>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">Recent activity</h2>
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
                  <td className="px-4 py-3 text-right text-slate-400">
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
