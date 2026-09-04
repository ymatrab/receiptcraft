import { NextResponse } from "next/server";
import { getAccountStatus } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { normalizeId } from "@/lib/analytics-events";

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
    receiptKey?: string;
    template?: string;
    anonymous_id?: string;
    session_id?: string;
  };
  const format = typeof body.format === "string" ? body.format.slice(0, 16) : "unknown";
  const template = typeof body.template === "string" ? body.template.slice(0, 64) : null;

  const { error } = await createAdminClient()
    .from("events")
    .insert({
      user_id: account.userId,
      name: "receipt_downloaded",
      props: {
        format,
        watermark: Boolean(body.watermark),
        pro: account.isPro,
        // brand vs generic: the plan's first question is whether the traffic
        // that brand pages bring ever reaches a finished receipt, and the
        // download is where that gets answered.
        template_type: template ? "brand" : "generic",
        ...(template ? { template } : {}),
      },
      // The receipt this download was of. Without it, one person downloading
      // the same receipt as PNG and PDF is indistinguishable from someone
      // making two receipts — which is precisely the difference between a
      // one-off visitor and a returning user.
      receipt_id: normalizeId(body.receiptKey),
      anonymous_id: normalizeId(body.anonymous_id),
      session_id: normalizeId(body.session_id),
    });

  // The confirmed-download row is the one event the funnel cannot be rebuilt
  // without. Silence here is how a dashboard ends up looking merely quiet.
  if (error) console.error("[downloads/track] insert failed", error.message);

  return NextResponse.json({ ok: !error });
}
