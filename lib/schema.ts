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

/**
 * The procedure a tool page documents, as `HowTo`.
 *
 * Read the CreativeWork note above first — this is here for the same reason and
 * earns the same thing. Be clear about what that is: Google **retired HowTo
 * rich results in 2023**, so this will not put numbered steps on the blue link
 * and is not a SERP feature play. It is machine-readable structure for
 * retrieval — the AI crawlers in app/robots.ts read JSON-LD to decide what a
 * page does before deciding whether to cite it, and "fill these six fields,
 * then download" is the single most citable thing a builder page asserts.
 *
 * Steps must describe what the page actually lets someone do, in the order the
 * interface does it. A step the UI does not support is a false claim in a
 * machine-readable wrapper, which is worse than no markup at all.
 */
export function howToJsonLd({
  name,
  description,
  path,
  steps,
  dateModified,
}: {
  name: string;
  description: string;
  /** Site-relative canonical path of the page documenting the procedure. */
  path: string;
  /** Ordered steps. Each is a self-contained instruction. */
  steps: readonly { name: string; text: string }[];
  dateModified?: string;
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url,
    inLanguage: "en",
    // The builder is free to use; the tool itself is the only "supply" needed.
    // No estimatedCost or totalTime: we do not measure either, and inventing
    // them is the padding the CreativeWork note rules out.
    tool: [{ "@type": "HowToTool", name: `${SITE.name} receipt builder` }],
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${url}#step-${i + 1}`,
    })),
    ...(dateModified ? { dateModified } : {}),
  };
}
