"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { deliveryOf, isOnline, timeAgo, type ChatMessage } from "@/lib/chat";
import Ticks from "@/components/chat/Ticks";

export interface VisitorState {
  lastSeenAt: string | null;
  page: string | null;
  lastReadAt: string | null;
}

interface Props {
  conversationId: string;
  adminId: string | null;
  initialMessages: ChatMessage[];
  initialVisitor: VisitorState;
}

/** How often the open thread marks itself read and re-reads the visitor's presence. */
const POLL_MS = 5_000;

/**
 * Admin-side conversation view: realtime messages, reply box, whether the
 * visitor is on the site right now (and which page), and ✓ / ✓✓ / blue ✓✓
 * on every reply. While this tab is visible it stamps admin_last_read_at, which is
 * what the visitor's widget turns into "Seen".
 */
export default function AdminChatThread({
  conversationId,
  adminId,
  initialMessages,
  initialVisitor,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [visitor, setVisitor] = useState<VisitorState>(initialVisitor);
  const [now, setNow] = useState(() => Date.now());
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`admin-messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const msg = payload.new as ChatMessage;
          setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // Mark read + refresh presence. Also picks up any message Realtime missed.
  // Every call here fails harmlessly before migration 0009.
  useEffect(() => {
    const supabase = createClient();
    let active = true;
    const tick = async () => {
      setNow(Date.now());
      if (document.visibilityState !== "visible") return;
      const [{ data: convo }, { data: rows }] = await Promise.all([
        supabase
          .from("conversations")
          .update({ admin_last_read_at: new Date().toISOString() })
          .eq("id", conversationId)
          .select("*")
          .maybeSingle(),
        supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true }),
      ]);
      if (!active) return;
      if (convo) {
        setVisitor({
          lastSeenAt: convo.visitor_last_seen_at ?? null,
          page: convo.visitor_page ?? null,
          lastReadAt: convo.visitor_last_read_at ?? null,
        });
      }
      if (rows) {
        setMessages((prev) => (rows.length === prev.length ? prev : (rows as ChatMessage[])));
      }
    };
    void tick();
    const timer = setInterval(() => void tick(), POLL_MS);
    document.addEventListener("visibilitychange", tick);
    return () => {
      active = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [conversationId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function send() {
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    setDraft("");
    const supabase = createClient();
    const { error } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: adminId,
      sender_role: "admin",
      body: text,
    });
    if (error) setDraft(text);
    setSending(false);
  }

  const online = isOnline(visitor.lastSeenAt, now);

  return (
    <div className="mt-6 flex h-[32rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5 text-sm">
        <span
          aria-hidden
          className={`h-2.5 w-2.5 rounded-full ${online ? "bg-emerald-500" : "bg-slate-300"}`}
        />
        {online ? (
          <span className="text-slate-800">
            On the website now
            {visitor.page && <span className="text-slate-500"> · {visitor.page}</span>}
          </span>
        ) : (
          <span className="text-slate-600">
            {visitor.lastSeenAt
              ? `Away · last on the site ${timeAgo(visitor.lastSeenAt, now)}`
              : "Away"}
            {visitor.page && <span className="text-slate-500"> · {visitor.page}</span>}
          </span>
        )}
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((m) => (
          <div key={m.id}>
            <div
              className={`max-w-[70%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm ${
                m.sender_role === "admin"
                  ? "ml-auto bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {m.body}
            </div>
            {m.sender_role === "admin" && (
              <Ticks state={deliveryOf(m, visitor.lastReadAt, visitor.lastSeenAt ?? null)} />
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 border-t border-slate-100 p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Reply…"
          aria-label="Reply"
          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-base text-slate-900 transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 sm:text-sm"
        />
        <button
          type="button"
          onClick={send}
          disabled={sending || !draft.trim()}
          aria-busy={sending}
          className="flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
