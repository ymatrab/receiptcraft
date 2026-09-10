/**
 * Telegram alerts for the few things worth interrupting a person for.
 *
 * The site already records everything in the `events` table and on the admin
 * dashboard, but a dashboard only reports to someone who opens it. Three
 * moments are time-sensitive enough to push instead of store:
 *
 *  - a checkout starts, because Shopify fulfilment is by hand — Pro has to be
 *    granted from the Members tab, and nothing else announces that a buyer is
 *    waiting;
 *  - a support message arrives, because the chat widget is live and the reply
 *    happens at /admin/chat;
 *  - a signup or a newsletter subscribe, which is the growth number the owner
 *    checks most often.
 *
 * Everything here is server-only: the bot token would let anyone post as the
 * bot, so this module must never be imported from a Client Component.
 *
 * Nothing in here is allowed to break the thing it reports on. `notify()`
 * swallows every error, and callers wrap it in `after()` so a slow or dead
 * Telegram API can never delay a checkout redirect or fail a signup.
 */

/** Bot token from @BotFather. Set in Vercel → Settings → Environment Variables. */
const TOKEN = (process.env.TELEGRAM_BOT_TOKEN ?? "").trim();

/**
 * Where alerts go. Comma-separated, so a second destination (a phone and a
 * team group, say) is an env change rather than a deploy.
 */
const CHAT_IDS = (process.env.TELEGRAM_CHAT_ID ?? "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

/** True when both halves are present. Without it every send is a no-op. */
export const telegramConfigured = TOKEN !== "" && CHAT_IDS.length > 0;

/** How many chats are configured — for the admin screen, without leaking ids. */
export const telegramChatCount = CHAT_IDS.length;

/** Give up rather than hold a request open when Telegram is unreachable. */
const TIMEOUT_MS = 5_000;

/** Telegram's HTML parse mode needs exactly these three escaped. */
export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Longest single value we will put in a message. */
const MAX_VALUE = 300;
/** Telegram rejects anything over 4096 characters; stay clear of the edge. */
const MAX_MESSAGE = 3_800;

export type Fields = Record<string, string | number | null | undefined>;

/**
 * Title plus `label: value` lines, HTML-escaped.
 *
 * Empty, null and undefined fields are dropped rather than rendered as "null" —
 * an alert saying `Email: null` reads like a bug in the alert, and half of
 * these fields are legitimately absent (an anonymous visitor has no email).
 */
export function buildMessage(title: string, fields: Fields = {}): string {
  const lines = [`<b>${escapeHtml(title)}</b>`];
  for (const [label, raw] of Object.entries(fields)) {
    if (raw === null || raw === undefined || raw === "") continue;
    const text = String(raw);
    // Mark a cut rather than making one silently — a support message that ends
    // mid-sentence should look truncated, so the owner opens the thread instead
    // of answering half a question.
    const value = text.length > MAX_VALUE ? `${text.slice(0, MAX_VALUE)}…` : text;
    lines.push(`<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`);
  }
  return lines.join("\n").slice(0, MAX_MESSAGE);
}

export interface SendResult {
  ok: boolean;
  /** Telegram's own description when it refuses — the only useful diagnostic. */
  error?: string;
}

async function sendToChat(chatId: string, text: string): Promise<SendResult> {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });

  const payload = (await res.json().catch(() => null)) as
    | { ok?: boolean; description?: string }
    | null;

  if (res.ok && payload?.ok) return { ok: true };
  // Telegram answers 400 with a description like "chat not found" or
  // "bot was blocked by the user" — pass it through verbatim, because those
  // two mean completely different fixes.
  return { ok: false, error: payload?.description ?? `HTTP ${res.status}` };
}

/**
 * Send raw text to every configured chat. Throws on a network failure and
 * reports a Telegram-level refusal in the result, so the admin Test button can
 * show what actually went wrong. Product code should call `notify()` instead.
 */
export async function sendTelegram(text: string): Promise<SendResult> {
  if (!telegramConfigured) {
    return { ok: false, error: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set." };
  }

  const results = await Promise.all(CHAT_IDS.map((id) => sendToChat(id, text)));
  const failed = results.filter((r) => !r.ok);
  // One bad id in a list of two should still count as a partial failure: a
  // silent half-delivery is how a second recipient stops getting alerts
  // without anyone noticing.
  if (failed.length === 0) return { ok: true };
  return { ok: false, error: failed.map((r) => r.error).join("; ") };
}

/**
 * The call product code makes. Never throws, never rejects — a Telegram outage
 * must not turn into a failed checkout or a 500 on signup.
 */
export async function notify(title: string, fields: Fields = {}): Promise<void> {
  if (!telegramConfigured) return;
  try {
    const result = await sendTelegram(buildMessage(title, fields));
    if (!result.ok) console.error("[telegram] not delivered:", result.error);
  } catch (err) {
    console.error("[telegram] send failed", err);
  }
}

/**
 * Client-tracked events worth a phone buzz, and how to word them.
 *
 * Kept small on purpose. Everything in lib/analytics-events.ts lands in the
 * `events` table; only what a person would want to know about within the hour
 * belongs here, or the alerts become noise and get muted — at which point the
 * genuinely urgent ones are missed too.
 */
export const EVENT_ALERTS: Record<string, string> = {
  sign_up: "🎉 New account",
  pro_activated: "⭐ Pro activated",
};
