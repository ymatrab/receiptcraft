import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { isOnline, timeAgo } from "@/lib/chat";

export const dynamic = "force-dynamic";

async function getConversations() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("conversations")
    // `*` so the inbox still loads before migration 0009 adds the guest and
    // presence columns; they simply read as undefined until then.
    .select("*, profiles(email)")
    .order("last_message_at", { ascending: false })
    .limit(100);
  return data ?? [];
}

export default async function AdminChatInbox() {
  const conversations = await getConversations();
  const now = Date.now();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Chat</h1>
      <p className="mt-1 text-sm text-slate-500">{conversations.length} conversations</p>

      <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {conversations.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No conversations yet.</p>
        ) : (
          conversations.map((c) => {
            const accountEmail = Array.isArray(c.profiles)
              ? c.profiles[0]?.email
              : (c.profiles as { email?: string } | null)?.email;
            const email: string | undefined = accountEmail ?? c.guest_email ?? undefined;
            const online = isOnline(c.visitor_last_seen_at, now);
            // last_message_at moves on replies too, but replying happens on
            // the thread page, which stamps admin_last_read_at as it goes.
            const unread =
              c.admin_last_read_at !== undefined &&
              (!c.admin_last_read_at ||
                new Date(c.last_message_at) > new Date(c.admin_last_read_at));
            return (
              <Link
                key={c.id}
                href={`/admin/chat/${c.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-medium text-slate-800">
                    <span
                      aria-label={online ? "On the website now" : "Away"}
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        online ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    />
                    <span className={`truncate ${unread ? "font-bold text-slate-900" : ""}`}>
                      {email ?? "Unknown visitor"}
                    </span>
                    {!accountEmail && (
                      <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                        Guest
                      </span>
                    )}
                    {unread && (
                      <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        New
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(c.last_message_at).toLocaleString()}
                    {online
                      ? ` · on the site now${c.visitor_page ? ` (${c.visitor_page})` : ""}`
                      : c.visitor_last_seen_at
                        ? ` · last seen ${timeAgo(c.visitor_last_seen_at, now)}`
                        : ""}
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
