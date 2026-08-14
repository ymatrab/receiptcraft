import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

async function getSubscriptions() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("subscriptions")
    .select("id, plan, status, current_period_end, cancel_at_period_end, created_at, profiles(email)")
    .order("created_at", { ascending: false })
    .limit(200);
  return data ?? [];
}

const STATUS_STYLE: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  trialing: "bg-sky-100 text-sky-700",
  past_due: "bg-amber-100 text-amber-700",
  canceled: "bg-rule/45 text-ink-soft",
};

export default async function AdminSubscriptions() {
  const subs = await getSubscriptions();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Payments &amp; subscriptions</h1>
      <p className="mt-1 text-sm text-ink-soft">{subs.length} most recent</p>

      <div className="mt-6 overflow-x-auto rounded-[3px] border border-rule bg-card">
        <table className="w-full text-sm">
          <thead className="bg-greenbar text-left text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Renews / ends</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {subs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-ink-soft">
                  No subscriptions yet.
                </td>
              </tr>
            ) : (
              subs.map((s) => {
                const email =
                  (s.profiles as { email?: string } | { email?: string }[] | null) &&
                  (Array.isArray(s.profiles) ? s.profiles[0]?.email : (s.profiles as { email?: string })?.email);
                return (
                  <tr key={s.id}>
                    <td className="px-4 py-3 font-medium text-ink">{email ?? "—"}</td>
                    <td className="px-4 py-3 text-ink-soft">{s.plan ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          STATUS_STYLE[s.status] ?? "bg-rule/45 text-ink-soft"
                        }`}
                      >
                        {s.status}
                        {s.cancel_at_period_end && " (canceling)"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-soft/70">
                      {s.current_period_end
                        ? new Date(s.current_period_end).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
