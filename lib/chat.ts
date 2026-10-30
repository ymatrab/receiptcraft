export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string | null;
  sender_role: "user" | "admin";
  body: string;
  created_at: string;
}

/** What GET /api/chat hands the widget on every poll. */
export interface ChatThread {
  /** False when the guest columns (migration 0009) are missing and the visitor has no account. */
  available: boolean;
  conversationId: string | null;
  /** The address replies go to: the account's, or the one the guest gave. */
  email: string | null;
  messages: ChatMessage[];
  /** The last time support had this thread on screen. Visitor messages before it are seen. */
  adminLastReadAt: string | null;
  /** The last time the visitor had the panel open. Support replies after it are unread. */
  visitorLastReadAt: string | null;
}

/**
 * How long a heartbeat counts as "here". The widget beats every 20s while the
 * tab is visible, so a single missed beat doesn't flip anyone to away.
 */
export const ONLINE_WINDOW_MS = 75_000;

export function isOnline(lastSeenAt: string | null | undefined, now = Date.now()): boolean {
  if (!lastSeenAt) return false;
  return now - new Date(lastSeenAt).getTime() < ONLINE_WINDOW_MS;
}

/** True when `at` is at or after the message was sent. */
function atOrAfter(message: ChatMessage, at: string | null | undefined): boolean {
  if (!at) return false;
  return new Date(at).getTime() >= new Date(message.created_at).getTime();
}

export type Delivery = "sent" | "delivered" | "seen";

/**
 * Where a message stands with the person it was sent to: seen once they had
 * the chat open after it arrived, delivered once they were on the site after
 * it arrived, otherwise just sent. Pass no `recipientSeenAt` for a recipient
 * who is always there (support, from the visitor's side).
 */
export function deliveryOf(
  message: ChatMessage,
  recipientReadAt: string | null | undefined,
  recipientSeenAt?: string | null
): Delivery {
  if (atOrAfter(message, recipientReadAt)) return "seen";
  if (recipientSeenAt === undefined || atOrAfter(message, recipientSeenAt)) return "delivered";
  return "sent";
}

/** "just now", "5 min ago", "3 h ago", or a date. */
export function timeAgo(iso: string, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86_400) return `${Math.floor(s / 3600)} h ago`;
  return new Date(iso).toLocaleDateString();
}

export const MAX_MESSAGE = 2000;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
