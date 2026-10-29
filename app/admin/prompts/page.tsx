import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/** Newest first, enough to read a few weeks of prompts at today's volume. */
const LIMIT = 500;

/**
 * What people typed into the AI generator, as stored in `ai_usage`.
 *
 * Prompts are recorded since migration 0008 and cleared after 90 days (the row
 * itself stays for the usage counts), so older generations show no text and
 * are left out here.
 */
async function getPrompts() {
  const admin = createAdminClient();
  const { data: rows, error } = await admin
    .from("ai_usage")
    .select("id, user_id, created_at, pro, prompt, template, business_name")
    .not("prompt", "is", null)
    .order("created_at", { ascending: false })
    .limit(LIMIT);
  if (error) console.error("[admin/prompts] read failed", error.message);

  const ids = [...new Set((rows ?? []).map((r) => r.user_id).filter(Boolean))] as string[];
  const emailById = new Map<string, string>();
  if (ids.length > 0) {
    const { data: profiles } = await admin.from("profiles").select("id, email").in("id", ids);
    for (const p of profiles ?? []) if (p.email) emailById.set(p.id, p.email);
  }

  return (rows ?? []).map((r) => ({
    ...r,
    email: r.user_id ? emailById.get(r.user_id) ?? null : null,
  }));
}

export default async function AdminPrompts() {
  const prompts = await getPrompts();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Prompts</h1>
      <p className="mt-1 text-sm text-slate-500">
        {prompts.length} AI prompts, newest first · kept for 90 days
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Member</th>
              <th className="px-4 py-3">Prompt</th>
              <th className="px-4 py-3">Template</th>
              <th className="px-4 py-3">Business</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {prompts.map((p) => (
              <tr key={p.id} className="align-top">
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                  {new Date(p.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    // The owner's clock, as in the GA4 property — not the server's UTC.
                    timeZone: "Africa/Casablanca",
                  })}
                </td>
                <td className="px-4 py-3">
                  <span className="text-slate-700">{p.email ?? "—"}</span>
                  {p.pro && (
                    <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      Pro
                    </span>
                  )}
                </td>
                <td className="min-w-[18rem] max-w-xl whitespace-pre-wrap break-words px-4 py-3 text-slate-800">
                  {p.prompt}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {p.template ? (
                    <span className="text-slate-600">{p.template}</span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">{p.business_name ?? "—"}</td>
              </tr>
            ))}
            {prompts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No prompts recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
