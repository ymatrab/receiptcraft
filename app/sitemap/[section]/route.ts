import {
  SECTION_IDS,
  isSectionId,
  sectionUrls,
  urlSetXml,
} from "@/lib/sitemap-sections";

export const revalidate = 3600;

/**
 * One sitemap per content type, at /sitemap/<section>.xml.
 *
 * The `.xml` is part of the dynamic segment rather than a nested route so the
 * filename reads the way Search Console and every crawler expect. Only the
 * seven known sections resolve; anything else 404s instead of rendering an
 * empty urlset, which would otherwise let a typo'd submission look healthy.
 */
export function generateStaticParams() {
  return SECTION_IDS.map((id) => ({ section: `${id}.xml` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  const id = section.endsWith(".xml") ? section.slice(0, -".xml".length) : section;
  // A plain 404 rather than notFound(): this is a machine-read endpoint with no
  // use for the not-found page, and it keeps the handler independent of the
  // framework's navigation helpers.
  if (!isSectionId(id)) return new Response("Not found", { status: 404 });

  return new Response(urlSetXml(await sectionUrls(id)), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
