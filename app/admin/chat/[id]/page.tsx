import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth";
import type { ChatMessage } from "@/lib/chat";
import AdminChatThread, { type VisitorState } from "./AdminChatThread";

export const dynamic = "force-dynamic";

export default async function AdminConversation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const admin = createAdminClient();

  const { data: conversation } = await admin
    .from("conversations")
    // `*` rather than named columns, so the page still opens before migration
    // 0009 adds the guest and presence columns.
    .select("*, profiles(email)")
    .eq("id", id)
    .maybeSingle();
  if (!conversation) notFound();

  const { data: messages } = await admin
    .from("messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });

  const me = await getCurrentUser();
  const accountEmail = Array.isArray(conversation.profiles)
    ? conversation.profiles[0]?.email
    : (conversation.profiles as { email?: string } | null)?.email;
  const guestEmail = (conversation.guest_email as string | null | undefined) ?? null;
  const email = accountEmail ?? guestEmail;
  const visitor: VisitorState = {
    lastSeenAt: conversation.visitor_last_seen_at ?? null,
    page: conversation.visitor_page ?? null,
    lastReadAt: conversation.visitor_last_read_at ?? null,
  };

  return (
    <div>
      <Link href="/admin/chat" className="text-sm text-slate-500 hover:text-slate-700">
        ← Back to inbox
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">
        {email ? (
          <a href={`mailto:${email}`} className="hover:underline">
            {email}
          </a>
        ) : (
          "Conversation"
        )}
        {!accountEmail && (
          <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 align-middle text-xs font-medium text-amber-800">
            Guest
          </span>
        )}
      </h1>

      <AdminChatThread
        conversationId={id}
        adminId={me?.id ?? null}
        initialMessages={(messages as ChatMessage[]) ?? []}
        initialVisitor={visitor}
      />
    </div>
  );
}
