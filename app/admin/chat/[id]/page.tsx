import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/auth";
import type { ChatMessage } from "@/lib/chat";
import AdminChatThread from "./AdminChatThread";

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
    .select("id, profiles(email)")
    .eq("id", id)
    .maybeSingle();
  if (!conversation) notFound();

  const { data: messages } = await admin
    .from("messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });

  const me = await getCurrentUser();
  const email = Array.isArray(conversation.profiles)
    ? conversation.profiles[0]?.email
    : (conversation.profiles as { email?: string } | null)?.email;

  return (
    <div>
      <Link href="/admin/chat" className="text-sm text-slate-500 hover:text-slate-700">
        ← Back to inbox
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">{email ?? "Conversation"}</h1>

      <AdminChatThread
        conversationId={id}
        adminId={me?.id ?? null}
        initialMessages={(messages as ChatMessage[]) ?? []}
      />
    </div>
  );
}
