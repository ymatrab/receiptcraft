import { TEMPLATES } from "@/lib/templates";
import { BRAND_TEMPLATES } from "@/lib/brands";

/**
 * Catalogue sizes, counted from the data rather than typed into copy.
 *
 * The site used to claim "40+", "42+", "100+", "348" and "350+" across five
 * pages — four of them on the homepage alone — and none of them matched the
 * real figure. Deriving the numbers means adding a brand updates every claim on
 * the site, and the copy cannot drift from the catalogue again.
 *
 * Two distinct catalogues, so keep them apart in copy: BRAND_COUNT is the
 * named-brand layouts under /brands, TEMPLATE_COUNT the generic receipt styles
 * under /templates. Saying "348 receipt templates" would just be a new false
 * claim in place of the old one.
 *
 * Server-only by construction: this pulls in the full brand dataset, so it must
 * never be imported from lib/site.ts or anything a client component reaches.
 */
export const BRAND_COUNT = BRAND_TEMPLATES.length;
export const TEMPLATE_COUNT = TEMPLATES.length;

/**
 * Default meta description. Lives here rather than in lib/site.ts because it
 * quotes BRAND_COUNT, and lib/site.ts is imported by client components — a data
 * import there would ship the whole brand catalogue to the browser.
 *
 * Kept under ~160 chars so it doesn't truncate in SERPs.
 */
export const SITE_DESCRIPTION = `Create professional receipts online for free with ${BRAND_COUNT} brand templates — live preview, instant PDF & PNG download, editable fields, free account to download.`;
