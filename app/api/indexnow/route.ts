import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { getAccountStatus } from "@/lib/auth";
import { submitToIndexNow } from "@/lib/indexnow";

// Always run fresh — this is a manual admin action, never cached.
export const dynamic = "force-dynamic";

/**
 * Admin-only: push every sitemap URL to IndexNow (Bing/Yandex/etc.).
 * Visit /api/indexnow while signed in as an admin, or POST to it from the
 * admin UI. Reuses sitemap() so the URL set always matches the sitemap.
 */
async function handle() {
  const status = await getAccountStatus();
  if (!status.isAdmin) {
    return NextResponse.json({ error: "Forbidden — admin only" }, { status: 403 });
  }
  const entries = await sitemap();
  const urls = entries.map((e) => String(e.url));
  const result = await submitToIndexNow(urls);
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}

export const GET = handle;
export const POST = handle;
