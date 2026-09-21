import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/sanity/queries";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Warm freshly published blog posts, run by Vercel Cron shortly after each
 * publish slot (see vercel.json — 10:xx for the 09:30Z posts, 14:xx for the
 * 14:00Z ones).
 *
 * Why this exists: /blog/[slug] is ISR with revalidate = 300. If a scheduled
 * post's URL is requested before its publishedAt — a forward cross-link from an
 * earlier post, a crawler, a manual check — Next caches that notFound(). Once
 * the post goes live, stale-while-revalidate serves the cached 404 to the first
 * visitor and only regenerates in the background. On 2026-09-21 that held a live
 * post at 404 for 80 minutes. Whoever arrives first after publish gets the 404,
 * and if that is Googlebot the new URL is recorded as missing.
 *
 * So this requests each recently published post until it answers 200, taking
 * the stale hit itself. It also nudges /blog and the sitemap, which cache the
 * same way. Posts not yet due are skipped by getAllPosts (publishedAt <= now()),
 * so a run that fires a little early cannot cache a fresh 404. The 26-hour
 * lookback means a run that misses a post catches it the next time.
 *
 * Secured with CRON_SECRET the same way as /api/cron/indexnow, and fails open for
 * the same reason: the only effect is requesting our own public pages.
 */

const LOOKBACK_MS = 26 * 60 * 60 * 1000;
const ATTEMPTS = 4;
const RETRY_WAIT_MS = 3000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function warm(url: string) {
  let status = 0;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        cache: "no-store",
        headers: { "user-agent": "makecepeit-warmup/1.0" },
      });
      status = res.status;
      if (res.ok) return { url, status, attempts: attempt };
    } catch {
      status = 0;
    }
    if (attempt < ATTEMPTS) await sleep(RETRY_WAIT_MS);
  }
  return { url, status, attempts: ATTEMPTS };
}

async function run(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const posts = await getAllPosts();
  const recent = posts.filter((p) => {
    const t = p.publishedAt ? new Date(p.publishedAt).getTime() : 0;
    return t <= now && now - t <= LOOKBACK_MS;
  });

  const urls = recent.map((p) => `${SITE.url}/blog/${p.slug}`);
  // Posts first and in parallel, so a slow regeneration on one does not eat the
  // function's time budget for the rest.
  const warmedPosts = await Promise.all(urls.map(warm));
  // Listing pages only need one request to trigger their own regeneration.
  const warmedPages =
    recent.length > 0
      ? await Promise.all([`${SITE.url}/blog`, `${SITE.url}/sitemap.xml`].map(warm))
      : [];

  const failed = warmedPosts.filter((w) => w.status !== 200);
  return NextResponse.json({
    checked: posts.length,
    recent: recent.length,
    posts: warmedPosts,
    pages: warmedPages,
    ok: failed.length === 0,
  });
}

export const GET = run;
export const POST = run;
