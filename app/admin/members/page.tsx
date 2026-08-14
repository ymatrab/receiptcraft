import { createAdminClient } from "@/lib/supabase/admin";
import { isProStatus } from "@/lib/plans";
import { grantPro, revokePro } from "./actions";

export const dynamic = "force-dynamic";

/** Map a raw auth provider to a short human label. */
function providerLabel(provider: string): string {
  if (provider === "google") return "Google";
  if (provider === "email") return "Password";
  return provider.charAt(0).toUpperCase() + provider.slice(1);
}

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

  // Signup method (google vs email) and email-confirmation status both live in
  // auth.users, not profiles. One page of 200 matches the profiles limit above;
  // paginate if we ever grow past that.
  const providerByUser = new Map<string, string>();
  const confirmedByUser = new Map<string, boolean>();
  const { data: authList } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  for (const u of authList?.users ?? []) {
    const provider =
      (u.app_metadata?.provider as string | undefined) ??
      u.identities?.[0]?.provider ??
      "email";
    providerByUser.set(u.id, provider);
    // email_confirmed_at is set once the verification link is clicked (and is
    // pre-set for Google sign-ups, since Google vouches for the address).
    confirmedByUser.set(u.id, Boolean(u.email_confirmed_at));
  }

  // Per-user download counts from first-party events (recorded on every
  // completed download by a logged-in user).
  const downloadsByUser = new Map<string, number>();
  const { data: dlEvents } = await admin
    .from("events")
    .select("user_id")
    .eq("name", "receipt_downloaded")
    .not("user_id", "is", null)
    .limit(10000);
  for (const e of dlEvents ?? []) {
    if (e.user_id) downloadsByUser.set(e.user_id, (downloadsByUser.get(e.user_id) ?? 0) + 1);
  }

  return (profiles ?? []).map((p) => ({
    ...p,
    sub: subByUser.get(p.id) ?? null,
    provider: providerByUser.get(p.id) ?? null,
    confirmed: confirmedByUser.get(p.id) ?? false,
    downloads: downloadsByUser.get(p.id) ?? 0,
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
              <th className="px-4 py-3">Email status</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Signup</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Downloads</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Membership</th>
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
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        m.confirmed
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {m.confirmed ? "Activated" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{m.full_name ?? "—"}</td>
                  <td className="px-4 py-3">
                    {m.provider ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          m.provider === "google"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {providerLabel(m.provider)}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        pro ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {pro ? m.sub?.plan ?? "pro" : "free"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-600 tabular-nums">
                    {m.downloads}
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(m.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {pro ? (
                      <form action={revokePro}>
                        <input type="hidden" name="userId" value={m.id} />
                        <button className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50">
                          Revoke
                        </button>
                      </form>
                    ) : (
                      <div className="flex gap-1.5">
                        <form action={grantPro}>
                          <input type="hidden" name="userId" value={m.id} />
                          <input type="hidden" name="days" value="7" />
                          <button className="rounded-md border border-emerald-200 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50">
                            Grant 7d
                          </button>
                        </form>
                        <form action={grantPro}>
                          <input type="hidden" name="userId" value={m.id} />
                          <input type="hidden" name="months" value="1" />
                          <button className="rounded-md border border-emerald-200 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50">
                            Grant 1mo
                          </button>
                        </form>
                        <form action={grantPro}>
                          <input type="hidden" name="userId" value={m.id} />
                          <input type="hidden" name="months" value="12" />
                          <button className="rounded-md border border-emerald-200 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50">
                            Grant 1yr
                          </button>
                        </form>
                      </div>
                    )}
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
