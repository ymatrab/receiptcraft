"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { supabaseConfigured } from "@/lib/supabase/config";
import { useAccount } from "@/lib/useAccount";
import { useConsent } from "@/lib/consent";
import { SITE } from "@/lib/site";
import { EMAIL_RE, MAX_MESSAGE, isSeen, type ChatMessage, type ChatThread } from "@/lib/chat";

/** Poll while the panel is open, so replies and "Seen" show up within seconds. */
const OPEN_POLL_MS = 4_000;
/** Poll while closed, to keep the visitor's presence fresh and catch a reply for the badge. */
const CLOSED_POLL_MS = 20_000;

/**
 * Set once this browser has sent a message. The guest token is an httpOnly
 * cookie the page can't see, so this is how the widget knows a thread exists
 * worth polling — visitors who never chat cost no requests at all.
 */
const STARTED_KEY = "rc_chat_started";

function hasStarted(): boolean {
  try {
    return localStorage.getItem(STARTED_KEY) === "1";
  } catch {
    return false;
  }
}

function markStarted() {
  try {
    localStorage.setItem(STARTED_KEY, "1");
  } catch {
    // Private mode: the panel still works, it just won't poll until opened.
  }
}

const ERRORS: Record<string, string> = {
  email: "Please enter a valid email so we can get back to you.",
  slow_down: "You're sending messages quickly. Give it a moment.",
  empty: "Type a message first.",
};

/**
 * Floating support chat for every visitor, signed in or not. All reads and
 * writes go through /api/chat, which works out whose thread it is (account or
 * guest cookie). Opens with a greeting that asks a guest for their email and
 * what they need. Shows Sent/Seen on the visitor's last message and whether
 * support is online, and doubles as the visitor's presence heartbeat for
 * /admin/chat. Hidden entirely on admin pages and when the backend isn't
 * configured.
 */
export default function ChatWidget() {
  const { account } = useAccount();
  const consent = useConsent();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState<ChatThread | null>(null);
  const [draft, setDraft] = useState("");
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [started, setStarted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const hidden = !supabaseConfigured || Boolean(pathname?.startsWith("/admin"));
  const ready = consent === "granted" || consent === "denied";

  useEffect(() => setStarted(hasStarted()), []);

  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === "visible");
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  const load = useCallback(
    async (reading: boolean) => {
      const params = new URLSearchParams({ page: pathname ?? "/" });
      if (reading) params.set("read", "1");
      try {
        const res = await fetch(`/api/chat?${params}`, { cache: "no-store" });
        if (res.ok) setThread((await res.json()) as ChatThread);
      } catch {
        // Offline for a moment; the next tick tries again.
      }
    },
    [pathname]
  );

  // A signed-in visitor may have a thread from another device: look once.
  const checkedAccount = useRef(false);
  useEffect(() => {
    if (hidden || !ready || !account.isLoggedIn || checkedAccount.current) return;
    checkedAccount.current = true;
    void load(false);
  }, [hidden, ready, account.isLoggedIn, load]);

  // Poll only for someone who has a thread, and only while the tab is
  // visible — a hidden tab going quiet is what makes the visitor show as away
  // on the admin side.
  const hasThread = started || Boolean(thread?.conversationId);
  const shouldPoll = !hidden && ready && visible && (open || hasThread);
  useEffect(() => {
    if (!shouldPoll) return;
    void load(open);
    const timer = setInterval(() => void load(open), open ? OPEN_POLL_MS : CLOSED_POLL_MS);
    return () => clearInterval(timer);
  }, [shouldPoll, open, load]);

  const messages = thread?.messages ?? [];

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, open]);

  const knownEmail = thread?.email ?? account.email ?? null;
  const needsEmail = !account.isLoggedIn && !knownEmail;

  async function send() {
    const text = draft.trim();
    if (!text || sending) return;
    if (needsEmail && !EMAIL_RE.test(email.trim())) {
      setError(ERRORS.email);
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text, email: email.trim(), website: trap }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: ChatMessage;
        conversationId?: string;
        error?: string;
      };
      if (!res.ok || !data.message) {
        setError(
          ERRORS[data.error ?? ""] ?? `Couldn't send that. Try again, or email us at ${SITE.email}.`
        );
        return;
      }
      const sent = data.message;
      setDraft("");
      markStarted();
      setStarted(true);
      setThread((prev) => ({
        available: true,
        conversationId: data.conversationId ?? prev?.conversationId ?? null,
        email: prev?.email ?? (email.trim() || account.email),
        messages: [...(prev?.messages ?? []).filter((m) => m.id !== sent.id), sent],
        adminLastReadAt: prev?.adminLastReadAt ?? null,
        visitorLastReadAt: prev?.visitorLastReadAt ?? null,
        supportOnline: prev?.supportOnline ?? false,
      }));
    } catch {
      setError(`Couldn't send that. Try again, or email us at ${SITE.email}.`);
    } finally {
      setSending(false);
    }
  }

  if (hidden) return null;

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
  if (!ready) return null;

  const unread =
    !open &&
    messages.some(
      (m) =>
        m.sender_role === "admin" &&
        (!thread?.visitorLastReadAt ||
          new Date(m.created_at) > new Date(thread.visitorLastReadAt))
    );
  const lastMine = [...messages].reverse().find((m) => m.sender_role === "user");
  const unavailable = thread?.available === false && !thread.conversationId;
  const online = thread?.supportOnline ?? false;

  const greeting = account.isLoggedIn
    ? "Hi there 👋 How can we help you today?"
    : "Hi there 👋 What's your email, and how can we help you today? Leave both below and we'll get back to you, even if you leave the page.";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={unread ? "Support chat, new reply" : "Support chat"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? "✕" : "💬"}
        {unread && (
          <span className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-rose-500" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[30rem] max-h-[calc(100dvh-7.5rem)] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">Support</p>
            <p className="flex items-center gap-1.5 text-xs text-slate-600">
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full ${online ? "bg-emerald-500" : "bg-slate-300"}`}
              />
              {online ? "Online now" : "We usually reply within a day."}
            </p>
          </div>

          {unavailable ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="text-sm text-slate-600">Chat is offline right now.</p>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm font-semibold text-indigo-700 underline"
              >
                Email {SITE.email}
              </a>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-2 overflow-y-auto p-3" aria-live="polite">
                <div className="max-w-[85%] rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-800">
                  {greeting}
                </div>
                {messages.map((m) => (
                  <div key={m.id}>
                    <div
                      className={`max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm ${
                        m.sender_role === "user"
                          ? "ml-auto bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {m.body}
                    </div>
                    {m.id === lastMine?.id && (
                      <p className="mt-0.5 pr-1 text-right text-[11px] text-slate-500">
                        {isSeen(m, thread?.adminLastReadAt) ? "✓✓ Seen" : "✓ Sent"}
                      </p>
                    )}
                  </div>
                ))}
                <div ref={endRef} />
              </div>

              <div className="space-y-2 border-t border-slate-100 p-3">
                {error && (
                  <p role="alert" className="text-xs text-rose-700">
                    {error}
                  </p>
                )}
                {needsEmail && (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    aria-label="Your email"
                    autoComplete="email"
                    className="w-full rounded-full border border-slate-300 px-4 py-2 text-base text-slate-900 transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 sm:text-sm"
                  />
                )}
                {/* Invisible to people; bots that fill every field reveal themselves. */}
                <input
                  type="text"
                  name="website"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder={needsEmail ? "How can we help?" : "Type a message…"}
                    aria-label="Message"
                    maxLength={MAX_MESSAGE}
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
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
