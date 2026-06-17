import { NextResponse } from "next/server";
import { getAccountStatus } from "@/lib/auth";

// Account status is per-request and auth-dependent — never cache.
export const dynamic = "force-dynamic";

/** Lightweight endpoint the client builder polls to decide watermark/limits. */
export async function GET() {
  const status = await getAccountStatus();
  return NextResponse.json(status, {
    headers: { "Cache-Control": "no-store" },
  });
}
