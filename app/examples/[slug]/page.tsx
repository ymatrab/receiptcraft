import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Reviewed from "@/components/Reviewed";
import { exampleReviewedAt } from "@/lib/content-dates";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getExample,
  receiptFromExample,
  exampleTotal,
  exampleSummary,
  exampleIntroText,
  exampleDetailText,
  exampleClosingText,
  EXAMPLE_SLUGS,
  EXAMPLES,
} from "@/lib/examples";
import { docFromReceiptData } from "@/lib/sections";
import { fitSeoDescription } from "@/lib/seo-description";
import { formatMoney, formatDisplayDate } from "@/lib/format";
import { SITE, absoluteUrl } from "@/lib/site";
import { creativeWorkJsonLd } from "@/lib/schema";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import OfferBar from "@/components/OfferBar";
import { BRAND_TEMPLATES } from "@/lib/brands";
import { brandSlugForExample } from "@/lib/example-links";

// 2026-11-16: the brand page is the sell page for these examples' queries
// ("starbucks receipt template", "home depot receipt generator").
const BRAND_FIRST_EXAMPLES: ReadonlySet<string> = new Set([
  "starbucks-receipt-two-lattes-muffin",
  "home-depot-receipt-paint-project",
]);

// Examples that own a brand's "{brand} receipt template" query (Search Console
// shows Google already ranks them for it). Their title and H1 name the template
// so the page answers the query it is shown for; the brand's /receipt-help
// guides hand off to them with that anchor (lib/intent-pages.ts HANDOFF).
const OWNS_TEMPLATE_QUERY: ReadonlySet<string> = new Set([
  "kroger-receipt-weekly-groceries",
]);

// Examples whose brand page owns "{brand} receipt generator": the link to the
// brand page uses that anchor instead of "receipt template" (2026-11-25).
const GENERATOR_ANCHOR: ReadonlySet<string> = new Set([
  "little-caesars-receipt-deep-dish",
]);

function exampleHeading(slug: string, brand: string): string {
  return OWNS_TEMPLATE_QUERY.has(slug)
    ? `${brand} Receipt Template Example`
    : `${brand} Receipt Example`;
}

export function generateStaticParams() {
  return EXAMPLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ex = getExample(slug);
  if (!ex) return { title: "Example not found" };
  const data = receiptFromExample(ex);
  const total = formatMoney(exampleTotal(ex), data.currency);
  // Keep the title short enough to avoid SERP truncation (~60 chars incl. the
  // " | Makecepeit" suffix); the verbose item summary stays in the description.
  const title = `${exampleHeading(slug, ex.brand)} (${total})`;
  const full = `See a sample ${ex.brand} receipt example: ${exampleSummary(ex)}, totalling ${total}. Make your own editable ${ex.brand} receipt and download it as PDF or PNG.`;
  // Long item summaries (or long brand names) can push the rich description past
  // the ~160-char SERP truncation limit — fall back to a concise variant then.
  const description = fitSeoDescription(
    full.length <= 160
      ? full
      : `${ex.brand} receipt example totalling ${total}. Make your own editable version and download it free as a watermarked PDF or PNG.`,
  );
  return {
    title,
    description,
    alternates: { canonical: `/examples/${ex.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/examples/${ex.slug}`),
      siteName: SITE.name,
      type: "article",
      // Setting openGraph explicitly drops the default opengraph-image, so
      // re-add it — otherwise social previews render with no image.
      images: [absoluteUrl("/opengraph-image")],
    },
    // Mirror OG onto the Twitter card; without this it falls back to the
    // sitewide homepage title/description.
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export default async function ExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ex = getExample(slug);
  if (!ex) notFound();

  const data = receiptFromExample(ex);
  const total = exampleTotal(ex);
  const totalStr = formatMoney(total, data.currency);
  const location = data.addressLine2 || data.addressLine1;

  // Related examples: the next six in the same category, wrapping round. A
  // plain slice(0, 6) sent every page in a category to the same six examples.
  const pool = EXAMPLES.filter((e) => e.base === ex.base);
  const at = pool.findIndex((e) => e.slug === ex.slug);
  const related = (pool.length > 1
    ? Array.from({ length: Math.min(6, pool.length - 1) }, (_, i) => pool[(at + 1 + i) % pool.length])
    : EXAMPLES.filter((e) => e.slug !== ex.slug).slice(0, 6));

  // The brand's own template page, when there is one: examples had no link to it.
  // Matched in lib/example-links.ts (drops a leading "The", knows aliases),
  // which the brand page uses to link back.
  const brandSlug = brandSlugForExample(ex);
  const brandPage = brandSlug ? BRAND_TEMPLATES.find((t) => t.slug === brandSlug) : undefined;
  // Examples whose brand page owns the query this example also shows for: the
  // main button opens the brand page instead of the generic category template.
  const brandFirst = Boolean(brandPage) && BRAND_FIRST_EXAMPLES.has(ex.slug);
  const ctaHref = brandFirst && brandPage ? `/brands/${brandPage.slug}` : `/create?template=${encodeURIComponent(ex.base)}`;
  const ctaLabel = brandFirst && brandPage ? `Open the ${brandPage.shortName} receipt template` : `Make a ${ex.brand} receipt`;
  const receiptDoc = docFromReceiptData(data);
  // Phone scale for the receipt: 0.85 like brand pages, smaller for the wide
  // layouts so they fit 334px (390px phone, minus page and box padding).
  const receiptZoom = Math.min(0.85, 334 / (receiptDoc.settings.widthPx || 380));

  // The former ItemList of receipt line items had no per-item URLs, so it was
  // ineligible for any Google rich result — dropped as noise, and not revived.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Receipt Examples", item: absoluteUrl("/examples") },
      { "@type": "ListItem", position: 3, name: exampleHeading(ex.slug, ex.brand), item: absoluteUrl(`/examples/${ex.slug}`) },
    ],
  };

  // The subject entity the breadcrumb alone could not supply: what this page
  // is, and which brand's receipts it shows.
  const workJsonLd = creativeWorkJsonLd({
    name: `${ex.brand} Receipt Example (${totalStr})`,
    description: `A worked ${ex.brand} receipt example: ${exampleSummary(ex)}, totalling ${totalStr}.`,
    path: `/examples/${ex.slug}`,
    about: ex.brand,
    dateModified: exampleReviewedAt(ex.slug),
  });

  return (
    <>
    <div className="mx-auto max-w-5xl px-4 pb-12 pt-6 sm:px-6 sm:pt-12 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd) }} />
      <nav className="text-sm text-slate-500">
        <Link href="/examples" className="hover:text-slate-700">Examples</Link>
        <span className="px-1">/</span>
        <span className="text-slate-700">{ex.brand}</span>
      </nav>

      {/* PHONE ORDER (2026-11-23). On a phone the receipt came after the
          scenario, the notes, the item table and the closing text (1,059–
          1,424px down), and wide receipts made the page up to 524px wide.

          The left column is `contents` below lg, so its two parts become items
          of this grid and `order` puts the receipt (order-2) between the button
          (order-1) and the explanation (order-3). From lg it is an ordinary
          column again; the HTML order never changes.

          grid-cols-[minmax(0,1fr)]: an implicit column takes its widest child,
          which is what made the page wider than the phone. */}
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
        <div className="contents lg:block">
          <div className="order-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {exampleHeading(ex.slug, ex.brand)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {exampleIntroText(ex, exampleSummary(ex), totalStr)}
          </p>

          <div className="mt-6">
            <Link
              href={ctaHref}
              data-offer-cta=""
              className="block w-full rounded-full text-center sm:inline-block sm:w-auto bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700"
            >
              {ctaLabel}
            </Link>
            {brandPage && !brandFirst && (
              <Link
                href={`/brands/${brandPage.slug}`}
                className="mt-3 block text-center text-sm font-medium sm:ml-4 sm:mt-0 sm:inline text-indigo-700 underline decoration-indigo-300 underline-offset-2 hover:decoration-indigo-700"
              >
                {GENERATOR_ANCHOR.has(ex.slug)
                  ? `Want your own order? Open the ${brandPage.shortName} receipt generator`
                  : `See the ${brandPage.shortName} receipt template`}
              </Link>
            )}
          </div>
          </div>

          {/* -mt-4: the first heading below carries its own top margin. */}
          <div className="order-3 -mt-4 lg:mt-0">
          {ex.scenario && (
            <>
              <h2 className="mt-10 text-xl font-bold text-slate-900">When you would need this receipt</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{ex.scenario}</p>
            </>
          )}
          {ex.notes && ex.notes.length > 0 && (
            <>
              <h2 className="mt-8 text-xl font-bold text-slate-900">What to notice on this receipt</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                {ex.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-10 text-xl font-bold text-slate-900">What&apos;s on this receipt</h2>
          <table className="mt-3 w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
              <tr><th className="py-2">Item</th><th className="py-2">Qty</th><th className="py-2 text-right">Price</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ex.items.map((it) => (
                <tr key={it.name}>
                  <td className="py-2 text-slate-700">{it.name}</td>
                  <td className="py-2 text-slate-500">{it.quantity}</td>
                  <td className="py-2 text-right text-slate-700">{formatMoney(it.price, data.currency)}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2" colSpan={2}>Total (incl. tax)</td>
                <td className="py-2 text-right">{totalStr}</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            {exampleDetailText(
              ex,
              data.paymentMethod.toLowerCase(),
              location,
              formatDisplayDate(data.date),
              data.taxLabel.toLowerCase(),
              data.taxRate,
            )}
          </p>

          <h2 className="mt-10 text-xl font-bold text-slate-900">Make your own in under a minute</h2>
          <p className="mt-2 leading-relaxed text-slate-600">{exampleClosingText(ex, SITE.name)}</p>
          {/* Desktop: the section that says "make your own" had no button
              (2026-11-24). Phones keep the bottom bar for this instead. */}
          <Link
            href={ctaHref}
            className="mt-5 hidden rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 lg:inline-flex"
          >
            {ctaLabel} →
          </Link>
          </div>
        </div>

        {/* Rendered example receipt */}
        {/* Phones: the whole receipt (it is the example), scaled to fit the
            screen. From lg: full size, sticky, and since 2026-11-24 it opens
            the builder (it was the biggest thing on the page and did nothing
            when clicked), with "Make one like this" under it. */}
        <div className="order-2 lg:sticky lg:top-20 lg:order-none">
          <div className="rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/60 p-3 sm:rounded-3xl sm:p-6">
            <div className="flex justify-center">
              <div className="[zoom:var(--rz)] lg:[zoom:1]" style={{ "--rz": receiptZoom } as CSSProperties}>
                <ReceiptDocPaper doc={receiptDoc} />
              </div>
            </div>
          </div>
          {/* Desktop: an empty overlay, out of the tab order, so the receipt
              text stays plain content; the button below is the keyboard
              route and sits above the overlay (positioned, later in DOM). */}
          <Link
            href={ctaHref}
            tabIndex={-1}
            aria-label={ctaLabel}
            className="absolute inset-0 hidden lg:block"
          />
          <Link
            href={ctaHref}
            className="relative mx-auto mt-5 hidden w-fit items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700 lg:flex"
          >
            Make one like this →
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="related-examples-heading">
          <h2 id="related-examples-heading" className="text-xl font-bold text-slate-900">
            More receipt examples
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {related.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/examples/${e.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-700"
                >
                  {e.brand} receipt
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Reviewed date={exampleReviewedAt(ex.slug)} />
    </div>

    {/* Phones: the builder one tap away while reading. Shows once the main
        button has scrolled off, and hides while it or the footer is on screen. */}
    <OfferBar
      href={ctaHref}
      text={`Ready to make your ${ex.brand} receipt?`}
      label="Make one like this"
      shortLabel={`Make a ${ex.brand} receipt`}
      location="example"
      showAtPercent={0}
      phonesOnly
    />
    </>
  );
}
