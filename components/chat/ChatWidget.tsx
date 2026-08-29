"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/config";
import { useAccount } from "@/lib/useAccount";
import { useConsent } from "@/lib/consent";
import type { ChatMessage } from "@/lib/chat";

/**
 * Floating support chat for logged-in users. Finds or creates the user's
 * conversation, loads history, and streams new messages over Supabase Realtime.
 * Admins reply from /admin/chat. Hidden entirely on admin pages and when the
 * backend isn't configured.
 */
export default function ChatWidget() {
  const { account } = useAccount();
  const consent = useConsent();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Load the user's existing conversation + full history as soon as they're
  // known — so the thread persists across reloads and page navigation. We do
  // NOT create a conversation here; that happens lazily on the first send, to
  // avoid spawning empty conversations.
  useEffect(() => {
    if (!account.isLoggedIn) return;
    let active = true;
    (async () => {
      const supabase = createClient();
      const { data: convo } = await supabase
        .from("conversations")
        .select("id")
        .order("last_message_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!active || !convo?.id) return;
      setConversationId(convo.id);
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", convo.id)
        .order("created_at", { ascending: true });
      if (active) setMessages((data as ChatMessage[]) ?? []);
    })();
    return () => {
      active = false;
    };
  }, [account.isLoggedIn]);

  /** Returns the conversation id, creating one on first use. */
  async function getOrCreateConversation(): Promise<string | null> {
    if (conversationId) return conversationId;
    const supabase = createClient();
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .order("last_message_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    const id =
      existing?.id ??
      (
        await supabase
          .from("conversations")
          .insert({ user_id: account.userId })
          .select("id")
          .single()
      ).data?.id ??
      null;
    if (id) setConversationId(id);
    return id;
  }

  // Subscribe to new messages for this conversation.
  useEffect(() => {
    if (!conversationId) return;
    const supabase = createClient();
    const channel = supabase
      .channel(`messages:${conversationId}`)
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

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    setDraft("");
    const id = await getOrCreateConversation();
    if (!id) {
      setDraft(text);
      setSending(false);
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.from("messages").insert({
      conversation_id: id,
      sender_id: account.userId,
      sender_role: "user",
      body: text,
    });
    if (error) setDraft(text);
    setSending(false);
  }

  // Admins reply from the dashboard, not the floating widget.
  if (!supabaseConfigured || pathname?.startsWith("/admin")) return null;

  // Stay out of the way until the cookie choice is made. Both this launcher
  // (bottom-5 right-5) and the consent banner (inset-x-4 bottom-4) are z-50 and
  // share the bottom-right corner: on a 375px viewport the launcher covered
  // roughly 36px of the 146px Decline button, its full height, and won the tap
  // because it paints later. Waiting is also simply right — a support chat is
  // not what someone needs in the first two seconds of their first visit.
  //
  // `null` means the choice hasn't been read from localStorage yet, so a
  // returning visitor gets the launcher a tick after mount rather than seeing it
  // appear and then vanish.
  if (consent !== "granted" && consent !== "denied") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Support chat"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">Support</p>
            <p className="text-xs text-slate-500">We usually reply within a day.</p>
          </div>

          {!account.isLoggedIn ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-sm text-slate-600">Log in to start a conversation with us.</p>
              <Link
                href="/login?next=/"
                rel="nofollow"
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Log in
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {messages.length === 0 && (
                  <p className="px-2 pt-4 text-center text-xs text-slate-500">
                    Send us a message and we&apos;ll get back to you.
                  </p>
                )}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      m.sender_role === "user"
                        ? "ml-auto bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {m.body}
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              <div className="flex items-center gap-2 border-t border-slate-100 p-3">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Type a message…"
                  aria-label="Message"
          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-base text-slate-900 transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={sending || !draft.trim()}
                  aria-busy={sending}
          className="flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
