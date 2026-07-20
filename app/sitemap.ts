import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";
import { BRAND_TEMPLATES } from "@/lib/brands";
import { EXAMPLES, EXAMPLES_TOTAL_PAGES } from "@/lib/examples";
import { INTENT_PAGES } from "@/lib/intent-pages";
import { getAllPosts } from "@/lib/sanity/queries";

// Regenerate hourly so scheduled blog posts (publishedAt <= now()) enter the
// sitemap automatically as they go live — no redeploy needed.
export const revalidate = 3600;

// Per-section content dates. Bump the one matching the data you edited when its
// page copy materially changes — do NOT use `new Date()` (that stamps every page
// as "just modified" every deploy and trains crawlers to ignore <lastmod>).
// changefreq/priority are intentionally omitted: Google and Bing have ignored
// them since 2023. Blog entries use their real publishedAt.
const STATIC_UPDATED = new Date("2026-07-20");
const TEMPLATES_UPDATED = new Date("2026-07-20");
const BRANDS_UPDATED = new Date("2026-07-20");
const INTENT_UPDATED = new Date("2026-07-20");
const EXAMPLES_UPDATED = new Date("2026-07-03");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/create`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/templates`, lastModified: TEMPLATES_UPDATED },
    { url: `${SITE.url}/examples`, lastModified: EXAMPLES_UPDATED },
    { url: `${SITE.url}/receipt-help`, lastModified: INTENT_UPDATED },
    { url: `${SITE.url}/pricing`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/login`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/blog`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/about`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/privacy`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/terms`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/cookies`, lastModified: STATIC_UPDATED },
  ];

  const posts = await getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : STATIC_UPDATED,
  }));

  const templatePages: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${SITE.url}/templates/${t.slug}`,
    lastModified: TEMPLATES_UPDATED,
  }));

  const brandPages: MetadataRoute.Sitemap = BRAND_TEMPLATES.map((t) => ({
    url: `${SITE.url}/brands/${t.slug}`,
    lastModified: BRANDS_UPDATED,
  }));

  brandPages.push({
    url: `${SITE.url}/brands`,
    lastModified: BRANDS_UPDATED,
  });

  const examplePages: MetadataRoute.Sitemap = EXAMPLES.map((e) => ({
    url: `${SITE.url}/examples/${e.slug}`,
    lastModified: EXAMPLES_UPDATED,
  }));

  // Paginated /examples index pages (page 1 is /examples, already listed above).
  const exampleListPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, EXAMPLES_TOTAL_PAGES - 1) },
    (_, i) => ({
      url: `${SITE.url}/examples/page/${i + 2}`,
      lastModified: EXAMPLES_UPDATED,
    })
  );

  const intentPages: MetadataRoute.Sitemap = INTENT_PAGES.map((p) => ({
    url: `${SITE.url}/receipt-help/${p.slug}`,
    lastModified: INTENT_UPDATED,
  }));

  return [
    ...staticPages,
    ...templatePages,
    ...brandPages,
    ...examplePages,
    ...exampleListPages,
    ...intentPages,
    ...blogPages,
  ];
}
