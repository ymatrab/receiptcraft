import { EXAMPLES, type Example } from "./examples";
import { BRAND_TEMPLATES } from "./brands";

/**
 * Which brand page an example belongs to, and the reverse.
 *
 * Until 2026-11-16 the link only ran one way: an example linked its brand page,
 * but no brand or template page linked back to its examples. The only route in
 * was the paginated /examples index, so the crawl report listed most examples as
 * orphans (no body-copy link at all), and several were crawled and not indexed.
 *
 * Matching is by name, as the example page always did, with two corrections:
 * a leading "The" is ignored ("The Home Depot" is Home Depot), and a few
 * examples name the company rather than the brand page's short name.
 */

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/^the\s+/, "")
    .replace(/[^a-z0-9]/g, "");

/** Example brand name (normalised) → brand slug, where the names differ. */
const ALIASES: Readonly<Record<string, string>> = {
  costcowholesale: "costco",
  wholefoodsmarket: "whole-foods",
};

const BRAND_BY_NAME: ReadonlyMap<string, string> = (() => {
  const m = new Map<string, string>();
  for (const t of BRAND_TEMPLATES) {
    for (const key of [norm(t.shortName), norm(t.name.replace(/ Receipt$/, ""))]) {
      if (!m.has(key)) m.set(key, t.slug);
    }
  }
  const slugs = new Set(BRAND_TEMPLATES.map((t) => t.slug));
  for (const [name, slug] of Object.entries(ALIASES)) {
    if (slugs.has(slug) && !m.has(name)) m.set(name, slug);
  }
  return m;
})();

/** The brand page slug for an example, or undefined when there is none. */
export function brandSlugForExample(ex: Example): string | undefined {
  return BRAND_BY_NAME.get(norm(ex.brand));
}

/** Examples that show this brand's receipts. */
export function examplesForBrand(brandSlug: string): Example[] {
  return EXAMPLES.filter((ex) => brandSlugForExample(ex) === brandSlug);
}

/**
 * Examples built on this template that have no brand page of their own — the
 * independent businesses (a vet, a plumber, a farmers market) and the brands
 * we carry no template for. Examples with a brand page are linked from it, so
 * listing them here too would only repeat links.
 */
export function examplesForTemplate(templateSlug: string): Example[] {
  return EXAMPLES.filter((ex) => ex.base === templateSlug && !brandSlugForExample(ex));
}
