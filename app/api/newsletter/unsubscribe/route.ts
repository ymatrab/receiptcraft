import { NextResponse, after } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";
import { absoluteUrl } from "@/lib/site";
import { notify } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Takes a newsletter subscriber off the list.
 *
 * POST only. Mail scanners and link previewers follow every GET in an email,
 * so a GET that unsubscribed would quietly remove people who never clicked;
 * the link opens /unsubscribe, whose button posts here.
 *
 * Also the target of the RFC 8058 one-click header
 * (`List-Unsubscribe-Post: List-Unsubscribe=One-Click`): mail clients post that
 * body to the List-Unsubscribe URL itself and expect a 2xx, not a redirect.
 */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const subscriberId = url.searchParams.get("s");
  const token = url.searchParams.get("t");
  const body = await req.text().catch(() => "");
  const oneClick = body.includes("List-Unsubscribe=One-Click");

  const fail = () =>
    oneClick
      ? new NextResponse("Invalid unsubscribe link", { status: 400 })
      : NextResponse.redirect(absoluteUrl("/unsubscribe?status=invalid"), { status: 303 });

  if (!supabaseConfigured || !verifyUnsubscribeToken(subscriberId, token)) return fail();

  const { data, error } = await createAdminClient()
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("id", subscriberId!)
    .is("unsubscribed_at", null)
    .select("id");

  if (error) {
    console.error("[newsletter] unsubscribe failed", error);
    return oneClick
      ? new NextResponse("Please try again", { status: 500 })
      : NextResponse.redirect(absoluteUrl("/unsubscribe?status=error"), { status: 303 });
  }

  // Only the first click is news; repeat clicks change nothing.
  if (data && data.length > 0) after(() => notify("📭 Newsletter unsubscribe", { Via: oneClick ? "mail client" : "link" }));

  return oneClick
    ? new NextResponse("Unsubscribed", { status: 200 })
    : NextResponse.redirect(absoluteUrl("/unsubscribe?status=done"), { status: 303 });
}
