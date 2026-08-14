import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

async function getConversations() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("conversations")
    .select("id, status, last_message_at, profiles(email)")
    .order("last_message_at", { ascending: false })
    .limit(100);
  return data ?? [];
}

export default async function AdminChatInbox() {
  const conversations = await getConversations();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Chat</h1>
      <p className="mt-1 text-sm text-slate-500">{conversations.length} conversations</p>

      <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {conversations.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No conversations yet.</p>
        ) : (
          conversations.map((c) => {
            const email = Array.isArray(c.profiles)
              ? c.profiles[0]?.email
              : (c.profiles as { email?: string } | null)?.email;
            return (
              <Link
                key={c.id}
                href={`/admin/chat/${c.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-800">{email ?? "Unknown user"}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(c.last_message_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    c.status === "open"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {c.status}
                </span>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
