import { SITE } from "@/lib/site";
import { BRAND_COUNT } from "@/lib/counts";
import { TEMPLATES } from "@/lib/templates";
import { HOMEPAGE_FAQS } from "@/lib/faqs";
import { PLANS, formatPlanPrice } from "@/lib/plans";
import { getAllPosts } from "@/lib/sanity/queries";
import { SOURCES } from "@/lib/sources";
import { BRAND_TEMPLATES, brandCategoryFor } from "@/lib/brands";
import { byDemand } from "@/lib/topic-clusters";

/** "7 days" rather than "/week": a pass is paid once and never renews. */
const PASS_LENGTH = { week: "7 days", month: "1 month", year: "1 year" } as const;

// Regenerate hourly so newly published blog posts appear without a redeploy.
export const revalidate = 3600;

/**
 * llms-full.txt — the deep version of /llms.txt. Inlines the content AI
 * engines would otherwise need to crawl page-by-page: full template catalog,
 * pricing, FAQ answers and published guides. Generated from the same data the
 * site renders, so it can't drift out of date.
 */
export async function GET() {
  const posts = await getAllPosts();

  const templateLines = TEMPLATES.map(
    (t) => `- [${t.name}](${SITE.url}/templates/${t.slug}): ${t.intro.split(". ")[0]}.`
  ).join("\n");

  // Until 2026-10-27 this file listed 55 templates and ~230 posts but not one
  // of the brand pages, so an engine reading it learned the site was about
  // finding receipts. The brand pages are where the creation searches land
  // (5% CTR); proven demand first, then by category.
  const brandLines = [...BRAND_TEMPLATES]
    .sort(byDemand)
    .map(
      (b) =>
        `- [${b.shortName} receipt generator](${SITE.url}/brands/${b.slug}): ${brandCategoryFor(b.slug)}`
    )
    .join("\n");

  const faqLines = HOMEPAGE_FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");

  const planLines = (["free", "pro_weekly", "pro_monthly", "pro_yearly"] as const)
    .map((id) => {
      const p = PLANS[id];
      const price =
        p.price === 0 || !p.interval
          ? "Free"
          : `${formatPlanPrice(p)} one-time pass for ${PASS_LENGTH[p.interval]}, never renews`;
      return `- **${p.name}** (${price}): ${p.features.join("; ")}`;
    })
    .join("\n");

  const blogLines =
    posts.length > 0
      ? posts
          .map((p) => `- [${p.title}](${SITE.url}/blog/${p.slug})${p.excerpt ? `: ${p.excerpt}` : ""}`)
          .join("\n")
      : "- Guides are published on a rolling schedule — see the blog index.";

  // Generated from the same registry the pages cite, so this can't drift out
  // of date the way a hand-maintained list would.
  const sourceLines = Object.values(SOURCES)
    .map((s) => `- [${s.title}](${s.url}) — ${s.publisher}. ${s.supports} (checked ${s.verifiedAt})`)
    .join("\n");

  const body = `# ${SITE.name} — Full Reference

> ${SITE.name} is a free online receipt maker at ${SITE.url}. Users build professional receipts with a live preview — free, with no sign-up. Downloading needs no account either: free downloads (PDF, PNG or JPG) carry a small watermark. A watermark-free download needs Pro, a one-time pass from ${formatPlanPrice(PLANS.pro_weekly)} for 7 days, bought at checkout with no account needed and never renewed; Pro also unlocks unlimited AI generation. Manual receipt building is processed entirely in the browser; only the optional AI generator and account features send data to a server.

Written and reviewed by the ${SITE.name} team (${SITE.url}/authors); editorial standards at ${SITE.url}/editorial-policy. Contact: ${SITE.email}.

## Main pages

- [Receipt maker](${SITE.url}/create): the builder — pick a template, edit every field with a live preview, download as PDF or PNG
- [Receipt templates](${SITE.url}/templates): ${TEMPLATES.length} receipt and invoice templates by business type
- [Brand receipt generators](${SITE.url}/brands): ${BRAND_COUNT} brand-style receipt layouts
- [Pricing](${SITE.url}/pricing): free to build; watermark-free downloads from ${formatPlanPrice(PLANS.pro_weekly)}, one-time
- [Receipt maker comparisons](${SITE.url}/alternatives): ${SITE.name} compared with other receipt generators, prices included

## Pricing

${planLines}

## Receipt templates (${TEMPLATES.length})

${templateLines}

## Brand receipt generators (${BRAND_TEMPLATES.length})

${brandLines}

Also available: real-world receipt examples by industry (${SITE.url}/examples), and lost-receipt help guides for 70+ major brands (${SITE.url}/receipt-help).

## Frequently asked questions

${faqLines}

## Guides

${blogLines}

## Sources we cite

Where a receipt field or rule is governed by a published authority, our guides link that authority in the text rather than paraphrasing it. Every link below is re-checked monthly and carries the date it was last verified. Citing these rules is not legal or tax advice.

${sourceLines}

## Responsible use

${SITE.name} is intended for legitimate purposes: replacing lost or faded receipts for real purchases, expense documentation, small-business receipt issuing, bookkeeping records, and design or film props. Brand-styled templates are design examples only; trademarks belong to their owners and ${SITE.name} is not affiliated with any brand shown. Creating receipts to defraud is illegal and against the terms of use (${SITE.url}/terms).
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
