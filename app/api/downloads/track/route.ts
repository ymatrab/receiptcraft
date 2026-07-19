import { NextResponse } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/downloads/track { format, watermark } — record one completed receipt
 * download so the admin dashboard can show per-member download counts.
 *
 * Fire-and-forget from the builder. The user is resolved from their session
 * cookie (not the request body), so a download can't be attributed to anyone
 * else. Anonymous downloads have no user to attribute and are skipped.
 */
export async function POST(req: Request) {
  const account = await getAccountStatus();
  if (!account.userId || !supabaseConfigured) {
    // Nothing to attribute — succeed quietly so the client never blocks.
    return NextResponse.json({ ok: false });
  }

  const body = (await req.json().catch(() => ({}))) as {
    format?: string;
    watermark?: boolean;
  };
  const format = typeof body.format === "string" ? body.format.slice(0, 16) : "unknown";

  await createAdminClient()
    .from("events")
    .insert({
      user_id: account.userId,
      name: "receipt_downloaded",
      props: { format, watermark: Boolean(body.watermark), pro: account.isPro },
    });

  return NextResponse.json({ ok: true });
}
