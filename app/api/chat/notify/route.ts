import { NextResponse, after } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { notify } from "@/lib/telegram";
import { absoluteUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/chat/notify { conversation_id } — buzz Telegram about a support
 * message a visitor just sent.
 *
 * ChatWidget writes messages straight to Supabase over RLS, so there is no
 * server route in the send path to hang this off. Rather than move the insert
 * (and lose the Realtime echo the widget relies on), the widget pings this
 * route afterwards and the route goes back to the database for the message.
 *
 * That detail is the security of it: the body is *never* taken from the
 * request. A caller can only nominate a conversation, and gets an alert only
 * if the newest message in it is one they themselves just sent as a user. So:
 *
 *  - nobody can put words in someone else's mouth, or in the owner's phone;
 *  - an admin reply from /admin/chat can't ping the owner about their own
 *    message;
 *  - a replay a minute later is outside the freshness window and does nothing.
 *
 * Always answers 200. The message is already saved by the time this is called;
 * a failure here must never look to the sender like their message was lost.
 */

/** How recently the message must have been written for an alert to make sense. */
const FRESH_MS = 60_000;

/**
 * Message ids already announced, so a double-submit or a retry doesn't send
 * two alerts. Per-instance and therefore best-effort — serverless will spread
 * requests across instances — which is why it backs up the freshness window
 * rather than being the only guard.
 */
const announced = new Set<string>();
const ANNOUNCED_MAX = 500;

function remember(id: string) {
  if (announced.size >= ANNOUNCED_MAX) announced.clear();
  announced.add(id);
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  if (!supabaseConfigured) return NextResponse.json({ ok: false });

  const account = await getAccountStatus();
  if (!account.isLoggedIn) return NextResponse.json({ ok: false });

  const body = (await req.json().catch(() => null)) as { conversation_id?: unknown } | null;
  const conversationId = typeof body?.conversation_id === "string" ? body.conversation_id : "";
  if (!UUID.test(conversationId)) return NextResponse.json({ ok: false });

  const { data: message } = await createAdminClient()
    .from("messages")
    .select("id, body, sender_id, sender_role, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (
    !message ||
    message.sender_role !== "user" ||
    message.sender_id !== account.userId ||
    announced.has(message.id) ||
    Date.now() - new Date(message.created_at).getTime() > FRESH_MS
  ) {
    return NextResponse.json({ ok: true });
  }

  remember(message.id);

  after(() =>
    notify("💬 New support message", {
      From: account.email,
      Plan: account.plan,
      Message: message.body,
      Reply: absoluteUrl(`/admin/chat/${conversationId}`),
    })
  );

  return NextResponse.json({ ok: true });
}
