import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sanity publish webhook. When a post is published, edited, or unpublished,
 * Sanity POSTs here and we purge the cached blog pages, the sitemap, and the
 * llms-full.txt manifest so a freshly-live post appears everywhere at once.
 *
 * Without this, the blog post page and the sitemap each cache on their own
 * hourly clock, so a scheduled post could sit in the sitemap while its page
 * still served a cached notFound() for up to an hour. Real-time revalidation
 * closes that window entirely; the page's short `revalidate` is only the
 * fallback for when this webhook isn't configured.
 *
 * Setup (Sanity → Manage → API → Webhooks):
 *   URL:     https://www.makecepeit.com/api/revalidate
 *   Trigger: Create, Update, Delete   Filter: _type == "post"
 *   Header:  Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 *   Projection (optional): { "slug": slug.current }
 *
 * Fails open when SANITY_REVALIDATE_SECRET is unset: the only possible action is
 * refreshing our own public cache, which is self-limiting.
 */
async function run(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Best-effort slug from the webhook body (Sanity projection or raw document),
  // so we can target one post. Falls back to refreshing every post page.
  let slug: string | undefined;
  try {
    const body = (await req.json()) as
      | { slug?: string | { current?: string } }
      | null;
    const raw = body?.slug;
    slug = typeof raw === "string" ? raw : raw?.current;
  } catch {
    // No or invalid JSON body — fall through to the broad revalidation.
  }

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  } else {
    // Unknown which post changed — refresh the whole /blog/[slug] segment.
    revalidatePath("/blog/[slug]", "page");
  }
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms-full.txt");

  return NextResponse.json({
    revalidated: true,
    slug: slug ?? null,
    now: Date.now(),
  });
}

export const POST = run;
export const GET = run;
