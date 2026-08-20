import { SITE } from "@/lib/site";
import { BRAND_COUNT } from "@/lib/counts";
import { TEMPLATES } from "@/lib/templates";
import { HOMEPAGE_FAQS } from "@/lib/faqs";
import { PLANS } from "@/lib/plans";
import { getAllPosts } from "@/lib/sanity/queries";
import { SOURCES } from "@/lib/sources";

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

  const faqLines = HOMEPAGE_FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n");

  const planLines = (["free", "pro_weekly", "pro_monthly", "pro_yearly"] as const)
    .map((id) => {
      const p = PLANS[id];
      const price = p.price === 0 ? "Free" : `$${p.price}/${p.interval}`;
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

> ${SITE.name} is a free online receipt maker at ${SITE.url}. Users build professional receipts with a live preview — free, with no sign-up. Downloading uses a free account: the first 3 receipts export watermark-free in HD (PDF, PNG or JPG), after which free downloads carry a small watermark unless the user upgrades to Pro. An optional Pro plan removes the watermark on every download and unlocks unlimited AI generation and saved history. Manual receipt building is processed entirely in the browser; only the optional AI generator and account features send data to a server.

Written and reviewed by the ${SITE.name} team (${SITE.url}/authors); editorial standards at ${SITE.url}/editorial-policy. Contact: ${SITE.email}.

## Pricing

${planLines}

## Receipt templates (${TEMPLATES.length})

${templateLines}

Also available: ${BRAND_COUNT} brand-style receipt layouts (${SITE.url}/brands), real-world receipt examples by industry (${SITE.url}/examples), and lost-receipt help guides for 70+ major brands (${SITE.url}/receipt-help).

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
