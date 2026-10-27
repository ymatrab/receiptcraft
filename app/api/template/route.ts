import { NextResponse } from "next/server";
import { getTemplate, TEMPLATES } from "@/lib/templates";
import { previewFromTemplate } from "@/lib/receipt";

export const runtime = "nodejs";

/**
 * GET /api/template?slug=walmart — one template's receipt, for the builder.
 *
 * The builder used to import every template and brand receipt so it could load
 * whichever one was picked, which put ~90 KB (compressed) of data nobody would
 * see on the page people build receipts on. Now it asks for the one it needs.
 *
 * The receipt comes back deterministic (previewFromTemplate), so it caches at
 * the edge; the builder stamps today's date, the time and a fresh receipt
 * number on it, which is all receiptFromTemplate does differently.
 */
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug")?.slice(0, 80) ?? "";
  const template = slug ? getTemplate(slug) : undefined;
  if (!template) return NextResponse.json({ error: "Unknown template" }, { status: 404 });

  return NextResponse.json(
    {
      slug: template.slug,
      // Brands carry a lawful-use notice in the builder; generic templates don't.
      brandName: TEMPLATES.some((t) => t.slug === template.slug) ? null : template.shortName,
      data: previewFromTemplate(template),
    },
    // Templates change only with a deploy, which also renews Vercel's cache.
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" } }
  );
}
