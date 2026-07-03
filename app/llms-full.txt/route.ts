import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";
import { HOMEPAGE_FAQS } from "@/lib/faqs";
import { PLANS } from "@/lib/plans";
import { getAllPosts } from "@/lib/sanity/queries";

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

  const body = `# ${SITE.name} — Full Reference

> ${SITE.name} is a free online receipt maker at ${SITE.url}. Users create professional receipts with a live preview and download them as PDF, PNG or JPG — free to use with no sign-up. An optional Pro plan removes the watermark and unlocks unlimited AI generation and saved history. Manual receipt building is processed entirely in the browser; only the optional AI generator and account saving send data to a server.

Founder & editor: Sara Artheta (${SITE.url}/about). Contact: ${SITE.email}.

## Pricing

${planLines}

## Receipt templates (${TEMPLATES.length})

${templateLines}

Also available: 350+ brand-style receipt layouts (${SITE.url}/brands), real-world receipt examples by industry (${SITE.url}/examples), and lost-receipt help guides for 70+ major brands (${SITE.url}/receipt-help).

## Frequently asked questions

${faqLines}

## Guides

${blogLines}

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
