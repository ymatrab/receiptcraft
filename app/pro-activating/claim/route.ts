import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import {
  fulfillPassCheckout,
  isGuestSession,
  retrieveCheckoutSession,
} from "@/lib/stripe-passes";
import { recordServerEvent, errorText } from "@/lib/server-events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /pro-activating/claim { sessionId } — the return step of a guest
 * checkout.
 *
 * Grants the pass (the same idempotent fulfilment the webhook runs) and, when
 * it is safe, signs this browser in to the account the pass went to, so a
 * buyer who paid without an account lands back in the builder as Pro.
 *
 * A Route Handler rather than work in the page: only a Route Handler or Server
 * Action can set the session cookie (lib/supabase/server.ts swallows cookie
 * writes from Server Components). POST, so a link prefetcher or a pasted URL
 * cannot trigger a sign-in by being opened.
 *
 * When signing in is safe. A session id is not a secret once it has sat in a
 * URL, so it must not become a key to someone's account. Sign-in happens only
 * when ALL of these hold:
 *  - the account was created by THIS checkout (app_metadata.created_by_checkout,
 *    which only the service role can write) within two hours of it;
 *  - it has no sign-in method beyond the email identity (no Google linked) and
 *    has never been signed in to;
 *  - this session has not been used to sign in before (a `guest_signed_in`
 *    event is recorded the first time and checked for every time).
 * An email that belonged to an existing account gets the pass but no session:
 * the page tells them to sign in to it.
 *
 * Response `status`:
 *  signed_in        — Pro is on and this browser is now signed in
 *  existing_account — Pro was added to an account they must sign in to
 *  pending          — not paid yet (delayed payment methods); try again
 *  error            — could not grant here; the webhook will
 */

type Status = "signed_in" | "existing_account" | "pending" | "not_guest" | "error";

const reply = (status: Status, extra: Record<string, unknown> = {}, code = 200) =>
  NextResponse.json({ status, ...extra }, { status: code, headers: { "Cache-Control": "no-store" } });

/** How long after checkout an account still counts as "just created by it". */
const FRESH_MS = 2 * 60 * 60 * 1000;

/** Refuse cross-site posts: this endpoint can set a session cookie. */
function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin fetches from older browsers omit it
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return reply("error", {}, 403);
  if (!supabaseConfigured) return reply("error", {}, 503);

  const { sessionId } = (await req.json().catch(() => ({}))) as { sessionId?: unknown };
  const session = await retrieveCheckoutSession(typeof sessionId === "string" ? sessionId : undefined);
  if (!session) return reply("error", {}, 404);
  if (!isGuestSession(session)) return reply("not_guest");

  await recordServerEvent("checkout_returned", null, {
    status: session.payment_status,
    plan: session.metadata?.plan ?? null,
    session: session.id,
    guest: true,
  });

  if (session.payment_status !== "paid") return reply("pending");

  let granted: Awaited<ReturnType<typeof fulfillPassCheckout>>;
  try {
    granted = await fulfillPassCheckout(session);
  } catch (err) {
    console.error("[claim] could not fulfil guest checkout", err);
    await recordServerEvent("pass_grant_failed", null, {
      where: "guest_return",
      session: session.id,
      error: errorText(err),
    });
    return reply("error", {}, 500);
  }
  if (!granted) return reply("error", {}, 500);

  const supabase = await createClient();
  const {
    data: { user: current },
  } = await supabase.auth.getUser();
  if (current) {
    // Already signed in: either to the account that got the pass, or to a
    // different one — never switch accounts underneath someone.
    return current.id === granted.userId
      ? reply("signed_in", { plan: granted.plan })
      : reply("existing_account", { plan: granted.plan });
  }

  const admin = createAdminClient();
  const { data: found, error: userError } = await admin.auth.admin.getUserById(granted.userId);
  const user = found?.user;
  if (userError || !user?.email) {
    console.error("[claim] could not read the buyer's account", userError?.message);
    return reply("existing_account", { plan: granted.plan });
  }

  const createdAt = Date.parse(user.created_at);
  const createdByThisCheckout =
    user.app_metadata?.created_by_checkout === session.id &&
    Number.isFinite(createdAt) &&
    Math.abs(createdAt - session.created * 1000) < FRESH_MS;
  const emailOnly = (user.identities ?? []).every((i) => i.provider === "email");
  const neverSignedIn = !user.last_sign_in_at;

  if (!createdByThisCheckout || !emailOnly || !neverSignedIn) {
    return reply("existing_account", { plan: granted.plan });
  }

  // Has this session already been used to sign in? Fail closed if we cannot tell.
  const { data: used, error: usedError } = await admin
    .from("events")
    .select("id")
    .eq("name", "guest_signed_in")
    .eq("props->>session", session.id)
    .limit(1);
  if (usedError || (used && used.length > 0)) {
    if (usedError) console.error("[claim] guest_signed_in lookup failed", usedError.message);
    return reply("existing_account", { plan: granted.plan });
  }

  // A magic link generated server-side (no email is sent) and redeemed at once
  // on the cookie-bound client, which writes the session cookie.
  const { data: link, error: linkError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: user.email,
  });
  const tokenHash = link?.properties?.hashed_token;
  if (linkError || !tokenHash) {
    console.error("[claim] generateLink failed", linkError?.message);
    return reply("existing_account", { plan: granted.plan });
  }

  const { error: verifyError } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "magiclink",
  });
  if (verifyError) {
    console.error("[claim] verifyOtp failed", verifyError.message);
    return reply("existing_account", { plan: granted.plan });
  }

  await recordServerEvent("guest_signed_in", granted.userId, { session: session.id });
  return reply("signed_in", { plan: granted.plan, newAccount: true });
}
