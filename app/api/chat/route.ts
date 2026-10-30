import { NextResponse, after } from "next/server";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { notify } from "@/lib/telegram";
import { absoluteUrl } from "@/lib/site";
import { BOT_UA } from "@/lib/analytics-events";
import { EMAIL_RE, MAX_MESSAGE, type ChatMessage, type ChatThread } from "@/lib/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The support chat's only door, for visitors with or without an account.
 *
 *   GET  /api/chat?page=/pricing&read=1  the thread, plus a presence heartbeat
 *   POST /api/chat { body, email? }      send a message (the first one creates the thread)
 *
 * The widget used to talk to Supabase directly over RLS, which only works with
 * a session — so signed-out visitors were told to log in before they could ask
 * anything. Now every read and write happens here with the service role, and
 * the route decides whose thread it is:
 *
 *  - signed in: the account's newest conversation;
 *  - signed out: the conversation whose guest_token_hash matches the SHA-256 of
 *    the httpOnly `rc_chat` cookie. The token itself is never stored, and is
 *    never readable by page scripts.
 *
 * A guest who later signs in on the same browser has the thread moved onto the
 * account, and the cookie is dropped so a shared computer doesn't show it to
 * whoever uses the browser next.
 *
 * The heartbeat is what "seen" and "on the website" are made of: each GET
 * stamps visitor_last_seen_at and the page, and with read=1 (panel open)
 * visitor_last_read_at. The admin thread stamps admin_last_read_at
 * (AdminChatThread). Before migration 0009 those updates fail and are ignored;
 * signed-in chat keeps working and guests are told chat is unavailable.
 */

const COOKIE = "rc_chat";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

/** Visitor messages allowed per conversation per minute. */
const BURST_LIMIT = 6;
const HISTORY_LIMIT = 100;

type Conversation = {
  id: string;
  user_id: string | null;
  guest_email?: string | null;
  visitor_page?: string | null;
  admin_last_read_at?: string | null;
  visitor_last_read_at?: string | null;
};

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * The caller's conversation, or null. `claimed` means a guest thread was just
 * moved onto the signed-in account and the cookie should be cleared.
 */
async function findConversation(
  db: SupabaseClient,
  userId: string | null,
  token: string | undefined
): Promise<{ convo: Conversation | null; claimed: boolean }> {
  if (userId) {
    const { data } = await db
      .from("conversations")
      .select("*")
      .eq("user_id", userId)
      .order("last_message_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) return { convo: data as Conversation, claimed: false };
  }
  if (!token) return { convo: null, claimed: false };

  // Errors here mean the guest columns don't exist yet: no guest thread.
  const { data } = await db
    .from("conversations")
    .select("*")
    .eq("guest_token_hash", hashToken(token))
    .maybeSingle();
  const convo = data as Conversation | null;
  if (!convo) return { convo: null, claimed: false };

  if (userId) {
    if (convo.user_id && convo.user_id !== userId) return { convo: null, claimed: false };
    if (!convo.user_id) {
      const { error } = await db
        .from("conversations")
        .update({ user_id: userId, guest_token_hash: null })
        .eq("id", convo.id);
      if (!error) return { convo: { ...convo, user_id: userId }, claimed: true };
    }
  }
  return { convo, claimed: false };
}

/** Cached once true: the columns don't disappear once added. */
let guestColumnsExist = false;

async function guestChatAvailable(db: SupabaseClient): Promise<boolean> {
  if (guestColumnsExist) return true;
  const { error } = await db.from("conversations").select("guest_token_hash").limit(0);
  guestColumnsExist = !error;
  return guestColumnsExist;
}

function respond(payload: unknown, init?: { status?: number; clearCookie?: boolean }) {
  const res = NextResponse.json(payload, {
    status: init?.status ?? 200,
    headers: { "Cache-Control": "no-store" },
  });
  if (init?.clearCookie) res.cookies.delete(COOKIE);
  return res;
}

export async function GET(req: Request) {
  const empty: ChatThread = {
    available: false,
    conversationId: null,
    email: null,
    messages: [],
    adminLastReadAt: null,
    visitorLastReadAt: null,
  };
  if (!supabaseConfigured) return respond(empty);

  const url = new URL(req.url);
  const reading = url.searchParams.get("read") === "1";
  const page = (url.searchParams.get("page") ?? "").slice(0, 200);

  const user = await getCurrentUser();
  const token = (await cookies()).get(COOKIE)?.value;
  const db = createAdminClient();

  const { convo, claimed } = await findConversation(db, user?.id ?? null, token);

  if (!convo) {
    return respond({
      ...empty,
      available: user ? true : await guestChatAvailable(db),
      email: user?.email ?? null,
    } satisfies ChatThread);
  }

  const now = new Date().toISOString();
  const stamp: Record<string, string> = { visitor_last_seen_at: now };
  if (page.startsWith("/")) stamp.visitor_page = page;
  if (reading) stamp.visitor_last_read_at = now;

  const [{ data: rows }] = await Promise.all([
    db
      .from("messages")
      .select("id, conversation_id, sender_id, sender_role, body, created_at")
      .eq("conversation_id", convo.id)
      .order("created_at", { ascending: false })
      .limit(HISTORY_LIMIT),
    db.from("conversations").update(stamp).eq("id", convo.id),
  ]);

  return respond(
    {
      available: true,
      conversationId: convo.id,
      email: user?.email ?? convo.guest_email ?? null,
      messages: ((rows as ChatMessage[] | null) ?? []).reverse(),
      adminLastReadAt: convo.admin_last_read_at ?? null,
      visitorLastReadAt: reading ? now : convo.visitor_last_read_at ?? null,
    } satisfies ChatThread,
    { clearCookie: claimed }
  );
}

export async function POST(req: Request) {
  if (!supabaseConfigured) return respond({ error: "unavailable" }, { status: 503 });

  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT_UA.test(ua)) return respond({ error: "forbidden" }, { status: 403 });

  const input = (await req.json().catch(() => null)) as {
    body?: unknown;
    email?: unknown;
    website?: unknown;
  } | null;
  // `website` is a field no person can see. Anything that fills it in is a form-filling bot.
  if (input?.website) return respond({ error: "forbidden" }, { status: 403 });

  const text = typeof input?.body === "string" ? input.body.trim().slice(0, MAX_MESSAGE) : "";
  if (!text) return respond({ error: "empty" }, { status: 400 });
  const email =
    typeof input?.email === "string" ? input.email.trim().toLowerCase().slice(0, 254) : "";

  const user = await getCurrentUser();
  const token = (await cookies()).get(COOKIE)?.value;
  const db = createAdminClient();

  const found = await findConversation(db, user?.id ?? null, token);
  const claimed = found.claimed;
  let convo = found.convo;
  let newToken: string | null = null;

  if (!convo) {
    if (user) {
      const { data } = await db
        .from("conversations")
        .insert({ user_id: user.id })
        .select("*")
        .single();
      convo = data as Conversation | null;
    } else {
      if (!EMAIL_RE.test(email)) return respond({ error: "email" }, { status: 400 });
      newToken = randomBytes(32).toString("base64url");
      const { data } = await db
        .from("conversations")
        .insert({ guest_email: email, guest_token_hash: hashToken(newToken) })
        .select("*")
        .single();
      convo = data as Conversation | null;
    }
    if (!convo) return respond({ error: "unavailable" }, { status: 503 });
  } else if (!user && !convo.guest_email && EMAIL_RE.test(email)) {
    await db.from("conversations").update({ guest_email: email }).eq("id", convo.id);
    convo = { ...convo, guest_email: email };
  }

  const { count } = await db
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("conversation_id", convo.id)
    .eq("sender_role", "user")
    .gte("created_at", new Date(Date.now() - 60_000).toISOString());
  if ((count ?? 0) >= BURST_LIMIT) return respond({ error: "slow_down" }, { status: 429 });

  const { data: message, error } = await db
    .from("messages")
    .insert({
      conversation_id: convo.id,
      sender_id: user?.id ?? null,
      sender_role: "user",
      body: text,
    })
    .select("id, conversation_id, sender_id, sender_role, body, created_at")
    .single();
  if (error || !message) return respond({ error: "unavailable" }, { status: 503 });

  // Nudge the owner's phone after the response, so a slow Telegram never holds
  // up the message appearing on screen.
  const from = user?.email ?? (convo.guest_email ? `${convo.guest_email} (guest)` : "Guest");
  const page = convo.visitor_page ?? null;
  const conversationId = convo.id;
  after(() =>
    notify("💬 New support message", {
      From: from,
      Page: page,
      Message: text,
      Reply: absoluteUrl(`/admin/chat/${conversationId}`),
    })
  );

  const res = respond({ message, conversationId }, { clearCookie: claimed });
  if (newToken) {
    res.cookies.set(COOKIE, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
  }
  return res;
}
