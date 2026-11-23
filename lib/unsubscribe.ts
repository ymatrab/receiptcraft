import { createHmac, timingSafeEqual } from "node:crypto";
import { absoluteUrl } from "@/lib/site";

/**
 * Signed one-click unsubscribe links for the newsletter.
 *
 * A link names the subscriber row by its random id, never by email address,
 * and carries an HMAC of that id so nobody can unsubscribe someone else by
 * guessing ids. The key is UNSUBSCRIBE_SECRET when it is set, otherwise the
 * Supabase service-role key — a server-only secret that already exists in every
 * environment, and an HMAC reveals nothing about its key. Rotating whichever key
 * is in use invalidates links already sent, so set UNSUBSCRIBE_SECRET once
 * before the first newsletter goes out and leave it alone.
 *
 * CAN-SPAM needs a working opt-out in every marketing email, honoured within 10
 * business days; this honours it immediately.
 */

function key(): string {
  return process.env.UNSUBSCRIBE_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

export function unsubscribeToken(subscriberId: string): string {
  return createHmac("sha256", key()).update(`newsletter-unsubscribe:${subscriberId}`).digest("base64url").slice(0, 32);
}

export function verifyUnsubscribeToken(subscriberId: string | null, token: string | null): boolean {
  if (!subscriberId || !token || !key()) return false;
  const expected = Buffer.from(unsubscribeToken(subscriberId));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** The link to put in an email, and in its List-Unsubscribe header. */
export function unsubscribeUrl(subscriberId: string): string {
  return absoluteUrl(`/unsubscribe?s=${subscriberId}&t=${unsubscribeToken(subscriberId)}`);
}

/** "j•••@gmail.com" — enough for someone to recognise their own address. */
export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "your address";
  return `${user.slice(0, 1)}•••@${domain}`;
}
