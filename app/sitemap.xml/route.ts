import { SITE } from "@/lib/site";
import {
  SECTION_IDS,
  sectionUrls,
  indexXml,
  newestLastmod,
} from "@/lib/sitemap-sections";

// Regenerate hourly so scheduled blog posts (publishedAt <= now()) enter the
// sitemap automatically as they go live — no redeploy needed. Same interval the
// single sitemap used; app/sitemap.ts was replaced by this index plus
// /sitemap/<section>.xml so each section gets its own coverage report.
export const revalidate = 3600;

export async function GET() {
  const children = await Promise.all(
    SECTION_IDS.map(async (id) => ({
      loc: `${SITE.url}/sitemap/${id}.xml`,
      lastmod: newestLastmod(await sectionUrls(id)),
    }))
  );

  return new Response(indexXml(children), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Matches `revalidate` so a CDN and the framework agree on freshness.
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
