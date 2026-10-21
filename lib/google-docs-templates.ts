/**
 * Free templates published as public Google Docs in the owner's Drive.
 *
 * The Docs exist because Google ranks one real docs.google.com file at #1 for
 * "receipt template google docs" and "invoice template google docs" (DataForSEO,
 * 2026-10-10). /templates/google-docs lists them so the Docs get discovered and
 * the page itself can rank for the same searches. Content and IDs are recorded
 * in docs/google-docs-kit.md — edit the Doc in Drive, not here.
 */
export interface GoogleDocTemplate {
  id: string;
  name: string;
  blurb: string;
  /** Our own builder page for the same document, for people who want it filled in for them. */
  builderHref: string;
  builderLabel: string;
}

export const GOOGLE_DOC_TEMPLATES: GoogleDocTemplate[] = [
  {
    id: "15MhnxhUT5SLzytGQLiMY3TDwNxbpidiYpximaY0fgtA",
    name: "Invoice template",
    blurb: "Business and client details, invoice number, due date, a four-column line-item table, tax, discount and payment terms.",
    builderHref: "/templates/invoice",
    builderLabel: "invoice maker",
  },
  {
    id: "1kd_tGURLW-XgrsOfuTfi_7VkP1y6NcMfdN9ZMfJ7Eug",
    name: "Receipt template",
    blurb: "A general sales receipt: receipt number, date and time, an item table, tax, total paid, payment method and a signature line.",
    builderHref: "/templates/sales-receipt",
    builderLabel: "sales receipt maker",
  },
  {
    id: "1RmJlSRGYeryMmaD7DYvdK1FIiXWfBdUZYpIaAnS9I0M",
    name: "Rent receipt template",
    blurb: "Tenant, property address, rent period, amount received, payment method, balance remaining and the landlord's signature.",
    builderHref: "/templates/rent-receipt",
    builderLabel: "rent receipt maker",
  },
  {
    id: "17E0Bt9H1lk8FpdjW1AKW_1maDEax3_OpV-JLkgwtz9o",
    name: "Bill of sale template",
    blurb: "A private-sale record in five sections: the parties, the item, price and payment, an as-is clause, and signatures for both sides.",
    builderHref: "/templates/proof-of-purchase",
    builderLabel: "proof of purchase maker",
  },
];

/** The step-by-step guide, published as a Doc alongside the templates. */
export const GOOGLE_DOC_GUIDE_ID = "1av7-D-YWD0g-mfFkMtEETx7DwCk8ZEyAxK9ao8bpcfs";

/** "Make a copy" — Google prompts the visitor to copy the Doc into their own Drive. */
export function docCopyUrl(id: string): string {
  return `https://docs.google.com/document/d/${id}/copy`;
}

/**
 * The Doc's own address, the one Google indexes. Every docs.google.com result
 * ranking for these searches is a /edit URL; /copy is an interstitial and
 * /preview is not what Google lists, so linking only those left our Docs
 * undiscovered (not indexed on 2026-10-21). Shared "anyone with the link can
 * view", so visitors get the read-only Doc.
 */
export function docViewUrl(id: string): string {
  return `https://docs.google.com/document/d/${id}/edit`;
}

/** The Google Doc version of a builder page, if one exists. */
export function googleDocFor(builderHref: string): GoogleDocTemplate | undefined {
  return GOOGLE_DOC_TEMPLATES.find((t) => t.builderHref === builderHref);
}

/** Read-only view without the editor chrome. */
export function docPreviewUrl(id: string): string {
  return `https://docs.google.com/document/d/${id}/preview`;
}
