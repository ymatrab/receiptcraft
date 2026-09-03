import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Retrieval crawlers — the ones that fetch a page to answer a question a user
 * just asked, and can cite us in the answer.
 *
 * The wildcard rule below already allows these, so naming them changes nothing
 * today. They are listed anyway so the intent is auditable: if the wildcard is
 * ever tightened, an explicit block keeps AI retrieval working instead of
 * silently cutting off every citation the GEO work is aimed at.
 *
 * Training crawlers (GPTBot, Google-Extended, ClaudeBot) are a separate
 * decision and are deliberately NOT listed here. They remain allowed by the
 * wildcard. Recorded so that staying allowed is a choice rather than an
 * oversight — blocking them would not affect retrieval or citation.
 */
const AI_RETRIEVAL_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  // Same access as the wildcard: private routes stay private for AI crawlers
  // too. An explicit rule replaces the wildcard for a named agent rather than
  // adding to it, so these must be repeated, not omitted.
  const allow = ["/", "/api/logo"];
  // `/login?` blocks the parameterised variants only — bare /login has no "?"
  // and stays crawlable, so the branded "makecepeit login" query is unaffected
  // (longest match wins, so this beats `Allow: /` for the variants alone).
  //
  // The header appends ?next=<current-path> to the log-in link on every page,
  // which spawns one crawlable login URL per page on the site. Those variants
  // are already noindex (see app/login/page.tsx), but noindex only takes effect
  // *after* a crawl, so Googlebot was still spending budget fetching them —
  // Search Console logged five on 26–27 Aug 2026. rel="nofollow" on the link
  // does not prevent this: Google has treated nofollow as a hint rather than a
  // directive since 2019. robots.txt is the only mechanism that actually stops
  // the fetch, whichever way the URL is discovered.
  const disallow = ["/admin", "/account", "/api/", "/login?"];

  return {
    rules: [
      {
        userAgent: "*",
        // Allow the brand-logo proxy that brand/example pages embed — longest
        // match wins, so /api/logo stays crawlable while the rest of /api/ and
        // the private routes stay out of the index.
        allow,
        // Bare /login is deliberately crawlable: it's in the sitemap and
        // indexable for the branded "makecepeit login" query. Only its
        // ?next=/?signup= variants are blocked — see the note above.
        disallow,
      },
      ...AI_RETRIEVAL_AGENTS.map((userAgent) => ({ userAgent, allow, disallow })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
