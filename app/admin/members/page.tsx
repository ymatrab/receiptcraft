import { createAdminClient } from "@/lib/supabase/admin";
import { isProStatus } from "@/lib/plans";

export const dynamic = "force-dynamic";

async function getMembers() {
  const admin = createAdminClient();
  // Pull recent profiles and their latest subscription in two queries, then join
  // in memory (keeps it simple without a DB view).
  const { data: profiles } = await admin
    .from("profiles")
    .select("id, email, full_name, is_admin, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const { data: subs } = await admin
    .from("subscriptions")
    .select("user_id, plan, status, current_period_end");

  const subByUser = new Map<string, { plan: string | null; status: string }>();
  for (const s of subs ?? []) {
    if (!subByUser.has(s.user_id)) subByUser.set(s.user_id, { plan: s.plan, status: s.status });
  }

  return (profiles ?? []).map((p) => ({
    ...p,
    sub: subByUser.get(p.id) ?? null,
  }));
}

export default async function AdminMembers() {
  const members = await getMembers();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Members</h1>
      <p className="mt-1 text-sm text-slate-500">{members.length} most recent</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((m) => {
              const pro = isProStatus(m.sub?.status);
              return (
                <tr key={m.id}>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {m.email ?? "—"}
                    {m.is_admin && (
                      <span className="ml-2 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        ADMIN
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{m.full_name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        pro ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {pro ? m.sub?.plan ?? "pro" : "free"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(m.created_at).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
