import { SITE, absoluteUrl } from "@/lib/site";

/**
 * The subject entity for a template-style page — the JSON-LD statement of what
 * the page actually *is*, as opposed to where it sits (BreadcrumbList) or what
 * it answers (FAQPage).
 *
 * Worth being clear about what this earns, because the examples page already
 * dropped an ItemList on the grounds that schema earning nothing is noise:
 * `CreativeWork` is **not** a Google rich-result type and will not change how
 * the blue link renders. It is here for retrieval and entity understanding —
 * the AI crawlers named in app/robots.ts read JSON-LD to decide what a page is
 * about before deciding whether to cite it, and until now /brands, /examples
 * and /templates described only their breadcrumbs and their FAQs. A page whose
 * only typed statement is "this is a list of links back to the homepage"
 * classifies badly.
 *
 * Kept deliberately small. Every property here is something the page genuinely
 * asserts elsewhere in its own markup; nothing is inferred or padded out to
 * look richer.
 */
export function creativeWorkJsonLd({
  name,
  description,
  path,
  about,
  dateModified,
}: {
  name: string;
  description: string;
  /** Site-relative canonical path, e.g. `/brands/walmart`. */
  path: string;
  /**
   * The real-world thing the page is about — a brand name on /brands and
   * /examples. Emitted as a bare `Thing`, never as `brand` or `publisher`:
   * "this page is about Walmart receipts" is true, "this was published by
   * Walmart" is not, and the second is the claim a wrong property makes.
   */
  about?: string;
  /** ISO date, from the same content-dates constant the sitemap uses. */
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "en",
    image: absoluteUrl("/opengraph-image"),
    creator: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    ...(about ? { about: { "@type": "Thing", name: about } } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}
