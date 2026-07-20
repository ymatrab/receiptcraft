import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { submitToIndexNow } from "@/lib/indexnow";
import { getIndexNowLastRun, setIndexNowLastRun } from "@/lib/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Automated IndexNow push, run daily by Vercel Cron (see vercel.json).
 *
 * Submits only the sitemap URLs whose lastModified is newer than the previous
 * run, so newly published/updated pages reach Bing/Yandex quickly without
 * re-spamming the whole (unchanged) sitemap — resubmitting unchanged URLs on a
 * loop is what IndexNow treats as abuse. The watermark advances only on a
 * successful push, so a failed run retries the same set next time.
 *
 * Secured with CRON_SECRET when set (Vercel sends it as `Authorization: Bearer
 * <secret>`). If no secret is configured it fails open: the only action possible
 * is nudging search engines to crawl our own public pages, and it's
 * self-limiting (a second call right after finds nothing changed).
 */
async function run(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const lastRunIso = await getIndexNowLastRun();
  // First-ever run: look back 2 days so a fresh deploy's pages go out once.
  const since = lastRunIso
    ? new Date(lastRunIso)
    : new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

  const entries = await sitemap();
  const changed = entries
    .filter((e) => {
      const lm = e.lastModified ? new Date(e.lastModified).getTime() : 0;
      return lm >= since.getTime();
    })
    .map((e) => String(e.url));

  const result =
    changed.length > 0
      ? await submitToIndexNow(changed)
      : { submitted: 0, ok: true, endpointStatus: null as number | null };

  // Advance the watermark only when the push succeeded (or there was nothing to
  // send), so a transient IndexNow failure is retried on the next run.
  if (result.ok) await setIndexNowLastRun(now.toISOString());

  return NextResponse.json({ since: since.toISOString(), changed: changed.length, ...result });
}

export const GET = run;
export const POST = run;
