/**
 * Central registry of the external authorities the site cites.
 *
 * Why a registry instead of links scattered through the pages:
 *  - verification dates get bumped in one place, not 400
 *  - JSON-LD `citation` entries are generated from the same data the page renders
 *  - `scripts/check-sources.mjs` can HEAD every URL in one pass (link rot on a
 *    .gov citation is worse than having no citation at all)
 *  - the same source is reused across dozens of pages without duplication
 *
 * Citing regulations is not legal advice — see /editorial-policy.
 */

export interface Source {
  /** Stable key used by <Cite id="…"> and by the per-page source lists. */
  id: string;
  /** Document title as the publisher writes it. */
  title: string;
  /** Issuing body — shown inline so the authority is visible without a click. */
  publisher: string;
  url: string;
  /** Which rules this belongs to, when the claim is jurisdiction-specific. */
  jurisdiction?: "US" | "US-CA" | "US-NY" | "US-WA" | "US-MA" | "EU" | "UK";
  /** ISO date the URL was last checked and confirmed to say what we claim. */
  verifiedAt: string;
  /** Some legislature and standards sites reject automated requests (403 or a
   *  refused connection) while serving humans normally. Flagged sources are
   *  warned about, not failed, by scripts/check-sources.mjs — verify them by
   *  hand in a browser when bumping `verifiedAt`. */
  botBlocked?: boolean;
  /** The specific claim this source backs. Keeps citations honest and lets a
   *  reviewer tell at a glance whether a page is citing the right document. */
  supports: string;
}

const S = <T extends Record<string, Source>>(x: T) => x;

export const SOURCES = S({
  // ── US federal: recordkeeping & substantiation ──────────────────────────
  "irs-pub-463": {
    id: "irs-pub-463",
    title: "Publication 463: Travel, Gift, and Car Expenses",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/publications/p463",
    jurisdiction: "US",
    verifiedAt: "2026-08-19",
    supports:
      "What a receipt must show to substantiate a business expense: amount, date, place and the nature of the expense.",
  },
  "irs-pub-583": {
    id: "irs-pub-583",
    title: "Publication 583: Starting a Business and Keeping Records",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/publications/p583",
    jurisdiction: "US",
    verifiedAt: "2026-08-19",
    supports:
      "Which sales and purchase records a business is expected to keep, and that receipts are supporting documents for gross receipts.",
  },
  "irs-pub-1771": {
    id: "irs-pub-1771",
    title: "Publication 1771: Charitable Contributions — Substantiation and Disclosure Requirements",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/pub/irs-pdf/p1771.pdf",
    jurisdiction: "US",
    verifiedAt: "2026-08-19",
    supports:
      "The $250 written-acknowledgement threshold, and the statement about whether any goods or services were provided in return for the gift.",
  },
  "irs-pub-527": {
    id: "irs-pub-527",
    title: "Publication 527: Residential Rental Property",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/publications/p527",
    jurisdiction: "US",
    verifiedAt: "2026-08-19",
    supports: "The rental income and expense records a landlord is expected to keep.",
  },
  "irs-pub-531": {
    id: "irs-pub-531",
    title: "Publication 531: Reporting Tip Income",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/publications/p531",
    jurisdiction: "US",
    verifiedAt: "2026-08-19",
    supports: "How tips are treated and reported, as distinct from employer-set service charges.",
  },
  "irs-rr-2012-18": {
    id: "irs-rr-2012-18",
    title: "Revenue Ruling 2012-18",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/pub/irs-drop/rr-12-18.pdf",
    jurisdiction: "US",
    verifiedAt: "2026-08-19",
    supports:
      "An automatic gratuity added by the restaurant is a service charge, not a tip — the distinction shown on large-party checks.",
  },

  // ── US federal: card data on the printed receipt ────────────────────────
  "fcra-1681c-g": {
    id: "fcra-1681c-g",
    title: "15 U.S.C. § 1681c(g) — Truncation of credit card and debit card numbers",
    publisher: "U.S. Code (Cornell Legal Information Institute)",
    url: "https://www.law.cornell.edu/uscode/text/15/1681c",
    jurisdiction: "US",
    verifiedAt: "2026-08-19",
    supports:
      "The FACTA truncation rule: an electronically printed receipt may show no more than the last 5 digits of the card number, and must not show the expiration date.",
  },
  "pci-dss": {
    id: "pci-dss",
    title: "Payment Card Industry Data Security Standard",
    publisher: "PCI Security Standards Council",
    url: "https://www.pcisecuritystandards.org/standards/pci-dss/",
    verifiedAt: "2026-08-19",
    supports:
      "Masking of the primary account number (PAN) when displayed, which is why receipts print only the last four digits.",
  },
  "emvco-specs": {
    id: "emvco-specs",
    title: "EMV Integrated Circuit Card Specifications for Payment Systems (Book 3)",
    publisher: "EMVCo",
    url: "https://www.emvco.com/specifications/",
    verifiedAt: "2026-08-19",
    supports:
      "The chip-transaction data elements printed on card receipts — Application Identifier (AID), Terminal Verification Results (TVR) and Transaction Status Information (TSI).",
  },

  // ── Non-US invoicing rules ─────────────────────────────────────────────
  "eu-vat-directive-226": {
    id: "eu-vat-directive-226",
    title: "Council Directive 2006/112/EC, Article 226 — details required on an invoice",
    publisher: "EUR-Lex, Publications Office of the European Union",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32006L0112",
    jurisdiction: "EU",
    verifiedAt: "2026-08-19",
    supports: "The particulars an EU VAT invoice must carry, including the VAT identification number and the rate applied.",
  },
  "hmrc-vat-notice-700": {
    id: "hmrc-vat-notice-700",
    title: "VAT guide (VAT Notice 700)",
    publisher: "HM Revenue & Customs",
    url: "https://www.gov.uk/guidance/vat-guide-notice-700",
    jurisdiction: "UK",
    verifiedAt: "2026-08-19",
    supports: "What a UK VAT invoice must contain, and when a simplified (less-detailed) VAT invoice is allowed.",
  },

  // ── US state: rent receipts ────────────────────────────────────────────
  "ca-civ-1499": {
    id: "ca-civ-1499",
    title: "California Civil Code § 1499",
    publisher: "California Legislative Information",
    url: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1499",
    jurisdiction: "US-CA",
    verifiedAt: "2026-08-19",
    supports: "A person paying money is entitled to a receipt from the person accepting it.",
  },
  "ny-rpl-235-e": {
    id: "ny-rpl-235-e",
    botBlocked: true,
    title: "NY Real Property Law § 235-e — Duty of landlord to provide written receipt",
    publisher: "New York State Senate",
    url: "https://www.nysenate.gov/legislation/laws/RPP/235-E",
    jurisdiction: "US-NY",
    verifiedAt: "2026-08-19",
    supports:
      "A landlord must give a written rent receipt when rent is paid by any means other than the tenant's personal check, and what that receipt must state.",
  },
  "wa-rcw-59-18-063": {
    id: "wa-rcw-59-18-063",
    title: "RCW 59.18.063 — Landlord must provide receipt for payments",
    publisher: "Washington State Legislature",
    url: "https://app.leg.wa.gov/RCW/default.aspx?cite=59.18.063",
    jurisdiction: "US-WA",
    verifiedAt: "2026-08-19",
    supports: "A landlord must provide a receipt for any payment made in cash, and on request for other payment methods.",
  },
  "ma-mgl-186-15b": {
    id: "ma-mgl-186-15b",
    botBlocked: true,
    title: "Massachusetts General Laws c.186 § 15B",
    publisher: "Massachusetts General Court",
    url: "https://malegislature.gov/Laws/GeneralLaws/PartII/TitleI/Chapter186/Section15B",
    jurisdiction: "US-MA",
    verifiedAt: "2026-08-19",
    supports: "The receipt a landlord must give for a security deposit or last month's rent, and what it has to contain.",
  },
});

export type SourceId = keyof typeof SOURCES;

/** Resolve ids to Source objects, skipping unknown ids rather than throwing —
 *  a typo in one page must not take the page down. */
export function getSources(ids: readonly SourceId[]): Source[] {
  return ids.map((id) => SOURCES[id]).filter(Boolean);
}

/** Most recent verification date across a set — what a page shows as
 *  "sources last checked". */
export function lastVerified(ids: readonly SourceId[]): string {
  const dates = getSources(ids).map((s) => s.verifiedAt).sort();
  return dates[dates.length - 1] ?? "";
}

/** schema.org `citation` entries for a page's JSON-LD block. */
export function citationJsonLd(ids: readonly SourceId[]) {
  return getSources(ids).map((s) => ({
    "@type": "CreativeWork" as const,
    name: s.title,
    url: s.url,
    publisher: { "@type": "Organization" as const, name: s.publisher },
  }));
}
