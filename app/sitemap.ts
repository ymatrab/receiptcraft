import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";
import { BRAND_TEMPLATES } from "@/lib/brands";
import { EXAMPLES, EXAMPLES_TOTAL_PAGES } from "@/lib/examples";
import { INTENT_PAGES, hasOfficialSource } from "@/lib/intent-pages";
import { COMPETITORS, LAST_UPDATED } from "@/lib/comparisons";
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
// Bump this to today whenever a page's visible content actually changes, and
// move that page onto it. The IndexNow cron only submits URLs whose
// lastModified is newer than its own last run, so a brand-new or rewritten
// page that keeps an older date is silently never submitted to Bing/Yandex.
// Only pages that genuinely changed belong here — restamping untouched pages
// puts false dates in the sitemap and is what IndexNow treats as spam.
const CONTENT_UPDATED = new Date("2026-08-14");
const TEMPLATES_UPDATED = new Date("2026-07-20");
const BRANDS_UPDATED = new Date("2026-07-20");
const INTENT_UPDATED = new Date("2026-07-20");
// The 19 brands whose guides now cite the retailer's own help pages. Only those
// pages changed; the other ~180 keep INTENT_UPDATED.
const INTENT_CITED_UPDATED = new Date("2026-08-20");
const EXAMPLES_UPDATED = new Date("2026-07-03");
// /guides/receipt-anatomy — rewritten with inline citations to the IRS, EMVCo,
// PCI DSS and the EU/UK VAT rules. Its own constant so bumping it doesn't
// restamp every other static page.
const GUIDES_UPDATED = new Date("2026-08-20");
// /editorial-policy — now states plainly that citing a regulation is not legal
// or tax advice, and documents the monthly source re-check. Its own constant so
// it does not restamp the other static pages that did not change.
const POLICY_UPDATED = new Date("2026-08-20");
const COMPARISONS_UPDATED = new Date(LAST_UPDATED);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: CONTENT_UPDATED },
    { url: `${SITE.url}/create`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/tools`, lastModified: CONTENT_UPDATED },
    { url: `${SITE.url}/tools/receipt-calculator`, lastModified: CONTENT_UPDATED },
    { url: `${SITE.url}/tools/split-payment-checker`, lastModified: CONTENT_UPDATED },
    { url: `${SITE.url}/guides/receipt-anatomy`, lastModified: GUIDES_UPDATED },
    { url: `${SITE.url}/templates`, lastModified: TEMPLATES_UPDATED },
    { url: `${SITE.url}/examples`, lastModified: EXAMPLES_UPDATED },
    { url: `${SITE.url}/receipt-help`, lastModified: INTENT_UPDATED },
    { url: `${SITE.url}/alternatives`, lastModified: COMPARISONS_UPDATED },
    { url: `${SITE.url}/pricing`, lastModified: CONTENT_UPDATED },
    { url: `${SITE.url}/login`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/blog`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/about`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/contact`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/authors`, lastModified: STATIC_UPDATED },
    { url: `${SITE.url}/editorial-policy`, lastModified: POLICY_UPDATED },
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
    lastModified: hasOfficialSource(p.brandSlug) ? INTENT_CITED_UPDATED : INTENT_UPDATED,
  }));

  const comparisonPages: MetadataRoute.Sitemap = COMPETITORS.map((c) => ({
    url: `${SITE.url}/compare/${c.slug}`,
    lastModified: COMPARISONS_UPDATED,
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
