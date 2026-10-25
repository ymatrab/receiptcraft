import { createAdminClient } from "@/lib/supabase/admin";
import { isProEntitled } from "@/lib/plans";
import { startOfUsageMonth } from "@/lib/usage";
import { grantPro, revokePro } from "./actions";

export const dynamic = "force-dynamic";

/** Map a raw auth provider to a short human label. */
function providerLabel(provider: string): string {
  if (provider === "google") return "Google";
  if (provider === "email") return "Password";
  if (provider === "checkout") return "Checkout";
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

  const subByUser = new Map<
    string,
    { plan: string | null; status: string; current_period_end: string | null }
  >();
  for (const s of subs ?? []) {
    if (!subByUser.has(s.user_id))
      subByUser.set(s.user_id, {
        plan: s.plan,
        status: s.status,
        current_period_end: s.current_period_end,
      });
  }

  // Signup method (google vs email) and email-confirmation status both live in
  // auth.users, not profiles. One page of 200 matches the profiles limit above;
  // paginate if we ever grow past that.
  const providerByUser = new Map<string, string>();
  const confirmedByUser = new Map<string, boolean>();
  const signedInByUser = new Map<string, boolean>();
  const { data: authList } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  for (const u of authList?.users ?? []) {
    // A guest who paid without an account gets one made by the checkout
    // (lib/stripe-passes.ts resolveGuestBuyer). Until they sign in with Google
    // it has no identity of its own, and "Password" would be a guess.
    const fromCheckout = Boolean(u.app_metadata?.created_by_checkout);
    const identity = u.identities?.[0]?.provider;
    const provider =
      fromCheckout && (!identity || identity === "email")
        ? "checkout"
        : (u.app_metadata?.provider as string | undefined) ?? identity ?? "email";
    providerByUser.set(u.id, provider);
    signedInByUser.set(u.id, Boolean(u.last_sign_in_at));
    // email_confirmed_at is set once the verification link is clicked (and is
    // pre-set for Google sign-ups, since Google vouches for the address).
    confirmedByUser.set(u.id, Boolean(u.email_confirmed_at));
  }

  // Which browser belongs to which account: any session that was signed in
  // carries both ids on its visit and builder events. That is what lets a
  // download made before signing in — a guest who paid at checkout and has
  // not signed in yet, say — count for the account once the browser is known.
  const userByAnon = new Map<string, string>();
  const { data: linkRows } = await admin
    .from("events")
    .select("user_id, anonymous_id")
    .in("name", ["visit", "builder_opened"])
    .not("user_id", "is", null)
    .not("anonymous_id", "is", null)
    .limit(10000);
  for (const r of linkRows ?? []) {
    if (r.user_id && r.anonymous_id) userByAnon.set(r.anonymous_id, r.user_id);
  }

  // Per-user download counts from first-party events (recorded on every
  // completed download — signed out too since 2026-10-25, with the browser id).
  const downloadsByUser = new Map<string, { total: number; signedOut: number }>();
  let unattributedDownloads = 0;
  const { data: dlEvents } = await admin
    .from("events")
    .select("user_id, anonymous_id")
    .eq("name", "receipt_downloaded")
    .limit(10000);
  for (const e of dlEvents ?? []) {
    const owner = e.user_id ?? (e.anonymous_id ? userByAnon.get(e.anonymous_id) : undefined);
    if (!owner) {
      unattributedDownloads++;
      continue;
    }
    const entry = downloadsByUser.get(owner) ?? { total: 0, signedOut: 0 };
    entry.total++;
    if (!e.user_id) entry.signedOut++;
    downloadsByUser.set(owner, entry);
  }

  // Per-user AI generations: one ai_usage row per generation, split into the
  // current allowance month and all time. Pro generations are in here too since
  // migration 0005 — before that the column showed 0 for every paying member,
  // which is the opposite of the truth.
  const monthStart = startOfUsageMonth().getTime();
  const aiByUser = new Map<string, { month: number; total: number }>();
  const { data: aiRows } = await admin
    .from("ai_usage")
    .select("user_id, created_at")
    .not("user_id", "is", null)
    .limit(10000);
  for (const r of aiRows ?? []) {
    if (!r.user_id) continue;
    const entry = aiByUser.get(r.user_id) ?? { month: 0, total: 0 };
    entry.total++;
    // Parsed rather than string-compared — Postgres timestamps come back with a
    // "+00:00" offset, which does not sort against a "Z" suffix.
    if (Date.parse(r.created_at) >= monthStart) entry.month++;
    aiByUser.set(r.user_id, entry);
  }

  const members = (profiles ?? []).map((p) => ({
    ...p,
    sub: subByUser.get(p.id) ?? null,
    provider: providerByUser.get(p.id) ?? null,
    confirmed: confirmedByUser.get(p.id) ?? false,
    signedIn: signedInByUser.get(p.id) ?? false,
    downloads: downloadsByUser.get(p.id) ?? { total: 0, signedOut: 0 },
    ai: aiByUser.get(p.id) ?? { month: 0, total: 0 },
  }));
  return { members, unattributedDownloads };
}

export default async function AdminMembers() {
  const { members, unattributedDownloads } = await getMembers();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Members</h1>
      <p className="mt-1 text-sm text-slate-500">
        {members.length} most recent
        {unattributedDownloads > 0 && (
          <> · {unattributedDownloads} signed-out downloads not tied to an account yet</>
        )}
      </p>

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
              <th className="px-4 py-3">AI gens</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Membership</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((m) => {
              const pro = isProEntitled(m.sub?.status, m.sub?.current_period_end);
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
                    {m.provider === "checkout" && !m.signedIn ? (
                      // Paid as a guest; the account exists but they have not
                      // come back to it yet.
                      <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">
                        Never signed in
                      </span>
                    ) : (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          m.confirmed
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {m.confirmed ? "Activated" : "Pending"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{m.full_name ?? "—"}</td>
                  <td className="px-4 py-3">
                    {m.provider ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          m.provider === "google"
                            ? "bg-blue-100 text-blue-700"
                            : m.provider === "checkout"
                              ? "bg-violet-100 text-violet-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {providerLabel(m.provider)}
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
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
                    {m.downloads.total}
                    {m.downloads.signedOut > 0 && (
                      <span className="ml-1 text-xs font-normal text-slate-400">
                        ({m.downloads.signedOut} signed out)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-600 tabular-nums">
                    {m.ai.month}
                    {m.ai.total !== m.ai.month && (
                      <span className="ml-1 text-xs font-normal text-slate-400">
                        / {m.ai.total}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
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
