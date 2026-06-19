import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";
import { BRAND_TEMPLATES } from "@/lib/brands";
import { EXAMPLES, EXAMPLES_TOTAL_PAGES } from "@/lib/examples";
import { INTENT_PAGES } from "@/lib/intent-pages";
import { getAllPosts } from "@/lib/sanity/queries";

// Stable content date. Bump when the programmatic page data (templates, brands,
// examples, intent pages, static copy) materially changes. Using `new Date()`
// here would stamp every page as "just modified" on each deploy and train
// crawlers to ignore <lastmod>. Blog entries override this with publishedAt.
const CONTENT_UPDATED = new Date("2026-06-19");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = CONTENT_UPDATED;

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/create`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/templates`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/examples`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/receipt-help`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE.url}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/blog`, lastModified, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const posts = await getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const templatePages: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${SITE.url}/templates/${t.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const brandPages: MetadataRoute.Sitemap = BRAND_TEMPLATES.map((t) => ({
    url: `${SITE.url}/brands/${t.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  brandPages.push({
    url: `${SITE.url}/brands`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  });

  const examplePages: MetadataRoute.Sitemap = EXAMPLES.map((e) => ({
    url: `${SITE.url}/examples/${e.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Paginated /examples index pages (page 1 is /examples, already listed above).
  const exampleListPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, EXAMPLES_TOTAL_PAGES - 1) },
    (_, i) => ({
      url: `${SITE.url}/examples/page/${i + 2}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })
  );

  const intentPages: MetadataRoute.Sitemap = INTENT_PAGES.map((p) => ({
    url: `${SITE.url}/receipt-help/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
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
