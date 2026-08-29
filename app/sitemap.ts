import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";
import { BRAND_TEMPLATES } from "@/lib/brands";
import { EXAMPLES, EXAMPLES_TOTAL_PAGES } from "@/lib/examples";
import { INTENT_PAGES } from "@/lib/intent-pages";
import { COMPETITORS } from "@/lib/comparisons";
import * as C from "@/lib/content-dates";
import { getAllPosts } from "@/lib/sanity/queries";

// Regenerate hourly so scheduled blog posts (publishedAt <= now()) enter the
// sitemap automatically as they go live — no redeploy needed.
export const revalidate = 3600;

// Per-section content dates. Bump the one matching the data you edited when its
// page copy materially changes — do NOT use `new Date()` (that stamps every page
// as "just modified" every deploy and trains crawlers to ignore <lastmod>).
// changefreq/priority are intentionally omitted: Google and Bing have ignored
// them since 2023. Blog entries use their real publishedAt.
// Section review dates now live in lib/content-dates.ts so the date a reader
// sees on the page and the date reported here are the same constant. The rule
// is unchanged: only pages that genuinely changed get a fresh date, and a page
// moves onto a new constant rather than restamping one that also covers
// untouched pages.
const d = (iso: string) => new Date(iso);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: d(C.HOME_UPDATED) },
    { url: `${SITE.url}/create`, lastModified: d(C.CREATE_UPDATED) },
    { url: `${SITE.url}/tools`, lastModified: d(C.CONTENT_UPDATED) },
    { url: `${SITE.url}/tools/receipt-calculator`, lastModified: d(C.CONTENT_UPDATED) },
    { url: `${SITE.url}/tools/split-payment-checker`, lastModified: d(C.CONTENT_UPDATED) },
    { url: `${SITE.url}/guides/receipt-anatomy`, lastModified: d(C.GUIDES_UPDATED) },
    { url: `${SITE.url}/guides/receipt-legality`, lastModified: d(C.GUIDES_LEGALITY_UPDATED) },
    { url: `${SITE.url}/templates`, lastModified: d(C.TEMPLATES_INDEX_UPDATED) },
    { url: `${SITE.url}/examples`, lastModified: d(C.EXAMPLES_UPDATED) },
    { url: `${SITE.url}/receipt-help`, lastModified: d(C.INTENT_UPDATED) },
    { url: `${SITE.url}/alternatives`, lastModified: d(C.COMPARISONS_UPDATED) },
    { url: `${SITE.url}/pricing`, lastModified: d(C.PRICING_UPDATED) },
    { url: `${SITE.url}/login`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/blog`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/about`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/contact`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/authors`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/editorial-policy`, lastModified: d(C.POLICY_UPDATED) },
    { url: `${SITE.url}/privacy`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/terms`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/cookies`, lastModified: d(C.COOKIES_UPDATED) },
  ];

  const posts = await getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : d(C.STATIC_UPDATED),
  }));

  const templatePages: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${SITE.url}/templates/${t.slug}`,
    // Precedence lives in lib/content-dates so the page and the sitemap cannot
    // disagree about when a template was last reviewed.
    lastModified: d(C.templateReviewedAt(t)),
  }));

  const brandPages: MetadataRoute.Sitemap = BRAND_TEMPLATES.map((t) => ({
    url: `${SITE.url}/brands/${t.slug}`,
    lastModified: d(C.BRANDS_UPDATED),
  }));

  brandPages.push({
    url: `${SITE.url}/brands`,
    lastModified: d(C.BRANDS_INDEX_UPDATED),
  });

  const examplePages: MetadataRoute.Sitemap = EXAMPLES.map((e) => ({
    url: `${SITE.url}/examples/${e.slug}`,
    lastModified: d(C.EXAMPLES_UPDATED),
  }));

  // Paginated /examples index pages (page 1 is /examples, already listed above).
  const exampleListPages: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, EXAMPLES_TOTAL_PAGES - 1) },
    (_, i) => ({
      url: `${SITE.url}/examples/page/${i + 2}`,
      lastModified: d(C.EXAMPLES_UPDATED),
    })
  );

  const intentPages: MetadataRoute.Sitemap = INTENT_PAGES.map((p) => ({
    url: `${SITE.url}/receipt-help/${p.slug}`,
    lastModified: d(C.intentReviewedAt(p.brandSlug)),
  }));

  const comparisonPages: MetadataRoute.Sitemap = COMPETITORS.map((c) => ({
    url: `${SITE.url}/compare/${c.slug}`,
    lastModified: d(C.COMPARISONS_UPDATED),
  }));

  return [
    ...staticPages,
    ...templatePages,
    ...brandPages,
    ...examplePages,
    ...exampleListPages,
    ...intentPages,
    ...comparisonPages,
    ...blogPages,
  ];
}
