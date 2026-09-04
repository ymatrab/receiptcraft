import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";
import { BRAND_TEMPLATES } from "@/lib/brands";
import { EXAMPLES, EXAMPLES_TOTAL_PAGES } from "@/lib/examples";
import { INTENT_PAGES } from "@/lib/intent-pages";
import { COMPETITORS } from "@/lib/comparisons";
import * as C from "@/lib/content-dates";
import { getAllPosts } from "@/lib/sanity/queries";

/**
 * The sitemap, split by content type.
 *
 * One flat sitemap of 1,133 URLs meant Search Console reported a single
 * indexed/submitted ratio for the whole site, so "brands are being dropped but
 * the guides are fine" was invisible. The Aug 2026 external audit asked for the
 * split; working out which sections were actually failing had to be done by
 * hand against the Search Analytics API instead, which is not a thing anyone
 * will repeat monthly.
 *
 * Submitted as an index at /sitemap.xml pointing at /sitemap/<section>.xml, so
 * each section gets its own coverage report.
 *
 * Written as ordinary route handlers rather than Next's generateSitemaps():
 * node_modules is intentionally empty here, so the framework's own docs are not
 * on disk and its exact output paths could not be checked. The sitemap is the
 * one file where a wrong guess silently costs the whole site its crawl
 * directives, and the sitemaps.org XML it emits is a stable published format
 * that needs no framework support to get right.
 *
 * The per-section `lastModified` rule is unchanged and still matters most:
 * bump a constant only when that page's content really moved.
 */

const d = (iso: string) => new Date(iso);

export const SECTION_IDS = [
  "core",
  "templates",
  "brands",
  "examples",
  "receipt-help",
  "compare",
  "blog",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function isSectionId(v: string): v is SectionId {
  return (SECTION_IDS as readonly string[]).includes(v);
}

function core(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: d(C.HOME_UPDATED) },
    { url: `${SITE.url}/create`, lastModified: d(C.CREATE_UPDATED) },
    { url: `${SITE.url}/tools`, lastModified: d(C.TOOLS_INDEX_UPDATED) },
    { url: `${SITE.url}/tools/receipt-calculator`, lastModified: d(C.CONTENT_UPDATED) },
    { url: `${SITE.url}/tools/split-payment-checker`, lastModified: d(C.CONTENT_UPDATED) },
    { url: `${SITE.url}/guides/receipt-anatomy`, lastModified: d(C.GUIDES_UPDATED) },
    { url: `${SITE.url}/guides/receipt-legality`, lastModified: d(C.GUIDES_LEGALITY_UPDATED) },
    { url: `${SITE.url}/templates`, lastModified: d(C.TEMPLATES_INDEX_UPDATED) },
    { url: `${SITE.url}/examples`, lastModified: d(C.EXAMPLES_UPDATED) },
    { url: `${SITE.url}/receipt-help`, lastModified: d(C.INTENT_UPDATED) },
    { url: `${SITE.url}/alternatives`, lastModified: d(C.COMPARISONS_UPDATED) },
    { url: `${SITE.url}/pricing`, lastModified: d(C.PRICING_UPDATED) },
    { url: `${SITE.url}/login`, lastModified: d(C.LOGIN_UPDATED) },
    { url: `${SITE.url}/blog`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/about`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/contact`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/authors`, lastModified: d(C.STATIC_UPDATED) },
    { url: `${SITE.url}/editorial-policy`, lastModified: d(C.POLICY_UPDATED) },
    { url: `${SITE.url}/privacy`, lastModified: d(C.PRIVACY_UPDATED) },
    { url: `${SITE.url}/terms`, lastModified: d(C.TERMS_UPDATED) },
    { url: `${SITE.url}/cookies`, lastModified: d(C.COOKIES_UPDATED) },
  ];
}

/** URLs for one section. Async only because the blog reads from Sanity. */
export async function sectionUrls(id: SectionId): Promise<MetadataRoute.Sitemap> {
  switch (id) {
    case "core":
      return core();

    case "templates":
      return TEMPLATES.map((t) => ({
        url: `${SITE.url}/templates/${t.slug}`,
        // Precedence lives in lib/content-dates so the page and the sitemap
        // cannot disagree about when a template was last reviewed.
        lastModified: d(C.templateReviewedAt(t)),
      }));

    case "brands":
      return [
        { url: `${SITE.url}/brands`, lastModified: d(C.BRANDS_INDEX_UPDATED) },
        ...BRAND_TEMPLATES.map((t) => ({
          url: `${SITE.url}/brands/${t.slug}`,
          // Per-brand, same reason as templates: only the 36 pages the article
          // fix actually rewrote should carry a new date.
          lastModified: d(C.brandReviewedAt(t.slug)),
        })),
      ];

    case "examples":
      return [
        ...EXAMPLES.map((e) => ({
          url: `${SITE.url}/examples/${e.slug}`,
          lastModified: d(C.EXAMPLES_UPDATED),
        })),
        // Paginated index pages; page 1 is /examples, which lives in core.
        ...Array.from({ length: Math.max(0, EXAMPLES_TOTAL_PAGES - 1) }, (_, i) => ({
          url: `${SITE.url}/examples/page/${i + 2}`,
          lastModified: d(C.EXAMPLES_UPDATED),
        })),
      ];

    case "receipt-help":
      return INTENT_PAGES.map((p) => ({
        url: `${SITE.url}/receipt-help/${p.slug}`,
        lastModified: d(C.intentReviewedAt(p.brandSlug)),
      }));

    case "compare":
      return COMPETITORS.map((c) => ({
        url: `${SITE.url}/compare/${c.slug}`,
        lastModified: d(C.COMPARISONS_UPDATED),
      }));

    case "blog": {
      const posts = await getAllPosts();
      return posts.map((p) => ({
        url: `${SITE.url}/blog/${p.slug}`,
        lastModified: p.publishedAt ? new Date(p.publishedAt) : d(C.STATIC_UPDATED),
      }));
    }
  }
}

/**
 * Every URL in the sitemap, flattened.
 *
 * The IndexNow routes work on the whole set rather than a section — they diff
 * `lastModified` against the last run — and they read it from here so the URLs
 * submitted to Bing and Yandex cannot drift from the URLs we publish. That is
 * the same guarantee they had when they imported the single app/sitemap.ts
 * default export.
 */
export async function allSitemapUrls(): Promise<MetadataRoute.Sitemap> {
  const sections = await Promise.all(SECTION_IDS.map(sectionUrls));
  return sections.flat();
}

/* -------------------------------------------------------------------------- */
/*  XML                                                                       */
/* -------------------------------------------------------------------------- */

/** Five predefined entities is the whole of what XML requires. */
function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** W3C date, which is what <lastmod> takes. Date-only: the constants are days. */
function lastmod(v: Date | string | undefined): string | null {
  if (!v) return null;
  const date = v instanceof Date ? v : new Date(v);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

export function urlSetXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((e) => {
      const mod = lastmod(e.lastModified);
      return (
        `  <url>\n    <loc>${xmlEscape(e.url)}</loc>\n` +
        (mod ? `    <lastmod>${mod}</lastmod>\n` : "") +
        `  </url>`
      );
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function indexXml(children: { loc: string; lastmod: string | null }[]): string {
  const items = children
    .map(
      (c) =>
        `  <sitemap>\n    <loc>${xmlEscape(c.loc)}</loc>\n` +
        (c.lastmod ? `    <lastmod>${c.lastmod}</lastmod>\n` : "") +
        `  </sitemap>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

/** The newest lastmod in a section — what the index reports for it. */
export function newestLastmod(entries: MetadataRoute.Sitemap): string | null {
  let best: string | null = null;
  for (const e of entries) {
    const m = lastmod(e.lastModified);
    if (m && (best === null || m > best)) best = m;
  }
  return best;
}
