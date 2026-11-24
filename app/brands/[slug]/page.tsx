import type { Metadata } from "next";
import { PLANS, formatPlanPrice } from "@/lib/plans";
import Reviewed from "@/components/Reviewed";
import { brandReviewedAt } from "@/lib/content-dates";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND_TEMPLATES, anBrand, brandCategoryFor } from "@/lib/brands";
import { CATEGORY_NOUN } from "@/lib/brand-categories";
import { previewFromTemplate } from "@/lib/receipt";
import { docFromReceiptData } from "@/lib/sections";
import { calcTotals, formatMoney } from "@/lib/format";
import { SITE, absoluteUrl } from "@/lib/site";
import { creativeWorkJsonLd } from "@/lib/schema";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import RelatedPosts from "@/components/RelatedPosts";
import { TEMPLATES } from "@/lib/templates";
import { templatesForBrand } from "@/lib/topic-clusters";
import { BRAND_DEPTH } from "@/lib/brand-depth";
import { BRAND_SELL_LINKS } from "@/lib/sell-links";
import SellLinks from "@/components/SellLinks";
import { CitedText } from "@/components/Sources";
import ContextLinks from "@/components/ContextLinks";
import HandoffCard from "@/components/HandoffCard";
import OfferBar from "@/components/OfferBar";
import { examplesForBrand } from "@/lib/example-links";
import { exampleSummary } from "@/lib/examples";

interface Props {
  params: Promise<{ slug: string }>;
}

// Prerender all brand pages at build time (ISR) so they are served from the
// edge cache like /examples and /receipt-help — not rendered on every request.
export function generateStaticParams() {
  return BRAND_TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = BRAND_TEMPLATES.find((t) => t.slug === slug);
  if (!template) return {};
  return {
    title: { absolute: template.seoTitle },
    description: template.seoDescription,
    alternates: { canonical: `/brands/${template.slug}` },
    openGraph: {
      title: template.seoTitle,
      description: template.seoDescription,
      url: absoluteUrl(`/brands/${template.slug}`),
      siteName: SITE.name,
      type: "website",
      // Setting openGraph explicitly drops the default opengraph-image, so
      // re-add it — otherwise social previews render with no image.
      images: [absoluteUrl("/opengraph-image")],
    },
    // Mirror OG onto the Twitter card; without this it falls back to the
    // sitewide homepage title/description.
    twitter: {
      card: "summary_large_image",
      title: template.seoTitle,
      description: template.seoDescription,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export default async function BrandTemplatePage({ params }: Props) {
  const { slug } = await params;
  const template = BRAND_TEMPLATES.find((t) => t.slug === slug);
  if (!template) notFound();

  const preview = previewFromTemplate(template);
  // The next four brands in the same category, wrapping round. This used to be
  // the first four brands sitewide, so ~344 pages linked Walmart, Uber, Target
  // and McDonald's by name — and Google ranked /brands/petsmart for "target
  // receipt generator" ahead of /brands/target. Neighbours spread the links
  // evenly and keep each page's outbound anchors on its own topic.
  const category = brandCategoryFor(template.slug);
  const siblings = BRAND_TEMPLATES.filter((t) => brandCategoryFor(t.slug) === category);
  const at = siblings.findIndex((t) => t.slug === template.slug);
  const related = Array.from({ length: Math.min(4, siblings.length - 1) }, (_, i) =>
    siblings[(at + 1 + i) % siblings.length],
  );
  // No links from here to the same brand's /receipt-help guides. A brand page
  // sells; those guides are retrieval pages, and a "lost your receipt?" link
  // sends a buyer off to find the receipt they came to make (strategy: never
  // link a sell page to a retrieval page). The guides still link here.
  // The generic template(s) this brand belongs under, so the brand links up to
  // its hub as well as across to its neighbours.
  const hubTemplates = templatesForBrand(template.slug, category)
    .map((s) => TEMPLATES.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  // Per-brand content derived from the template's own data — unique per page
  // (items, address, tax and totals all differ), not boilerplate.
  const totals = calcTotals(preview);
  const d = template.defaults;
  const money = (n: number) => formatMoney(n, preview.currency);
  const addr = [d.addressLine1, d.addressLine2].filter(Boolean).join(", ");
  // Brand-specific receipt anatomy for the ~15 brands with real search demand;
  // undefined for the rest, which keep only the data-driven section above.
  const depth = BRAND_DEPTH[template.slug];
  // Worked examples of this brand's receipt. Examples linked their brand page,
  // but until 2026-11-16 no brand page linked back, so most examples had no
  // body link at all and several were crawled and left out of the index.
  const examples = examplesForBrand(template.slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: template.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Brands", item: absoluteUrl("/brands") },
      {
        "@type": "ListItem",
        position: 3,
        name: template.name,
        item: absoluteUrl(`/brands/${template.slug}`),
      },
    ],
  };

  // What the page is, not just where it sits. `about` names the brand as a
  // plain Thing — the page is about their receipts, and says nothing about who
  // published it.
  const workJsonLd = creativeWorkJsonLd({
    name: template.name,
    description: template.seoDescription,
    path: `/brands/${template.slug}`,
    // shortName, not name: `about` takes the real-world entity ("Walmart"),
    // while name is the page's own title ("Walmart Receipt").
    about: template.shortName,
    dateModified: brandReviewedAt(template.slug),
  });

  return (
    <>
      {template.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-indigo-600">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/brands" className="hover:text-indigo-600">Brands</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-900">{template.name}</li>
          </ol>
        </nav>

        {/* PHONE ORDER (2026-11-21). On a phone the receipt was the second
            screen, after the intro, the notice, "What is" and "Common uses",
            and the button at the top was the page's only way into the
            builder. Nov 6–20: of 192 phone visitors who never opened the
            builder, 93 left from the first screen and 60 read past halfway.

            The left column is `contents` below lg, so its three parts become
            items of this grid and `order` can put the receipt (order-2)
            straight after the button (order-1), with the notice (order-3)
            and the explainer (order-4) after it. From lg it is an ordinary
            column again, in its original order.

            grid-cols-[minmax(0,1fr)]: an implicit column takes its widest
            child, and the 380px receipt made the page 396px on a 390px
            phone. */}
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="contents lg:block">
          <div className="order-1">
            {template.defaults.logoDataUrl ? (
              <span className="inline-flex h-12 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.defaults.logoDataUrl}
                  alt={`${template.shortName} logo`}
                  className="h-full w-auto max-w-[200px] object-contain"
                />
              </span>
            ) : (
              <span className="text-4xl" aria-hidden="true">{template.icon}</span>
            )}
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {template.heading}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{template.intro}</p>
            <SellLinks links={BRAND_SELL_LINKS[template.slug]} />

            <div className="mt-8 flex flex-wrap gap-3">
              {/* data-offer-cta: the phone offer bar stays hidden while this is on screen. */}
              <Link
                href={`/create?template=${template.slug}`}
                data-offer-cta=""
                className="w-full rounded-full bg-indigo-600 px-7 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 sm:w-auto"
              >
                Use This Template — Free
              </Link>
              {/* Phones: the breadcrumb already links the brand list, and this
                  second button stood between the first one and the receipt. */}
              <Link
                href="/brands"
                className="hidden rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:inline-block"
              >
                All Brands
              </Link>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500 sm:hidden">
              Free with a small watermark · {formatPlanPrice(PLANS.pro_weekly)} removes it · no account
            </p>
          </div>

            {/* Non-affiliation / provenance notice, shown next to the CTA where
                the trademark/misuse risk is highest. Uses the site's standard
                brand-safety wording — keep in sync with the brands hub + Terms. */}
            <p className="order-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500 lg:mt-4">
              Independent, customizable template. {SITE.name} is not affiliated
              with, endorsed by, or issued by {template.shortName}. Receipts you
              create are for lawful records, personal mockups and authorized use
              only — not a proof of purchase.
            </p>

            <div className="order-4">
            {/* A self-contained answer an AI engine can quote whole. Brand pages
                had none (the intro is one line), while the receipt-help pages
                AI Overviews cite do. Facts come from the template and
                lib/plans.ts, never typed here. */}
            <h2 className="text-xl font-bold text-slate-900 lg:mt-12">
              What is the {template.shortName} receipt generator?
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              The {template.shortName} receipt generator is a {SITE.name} template that
              lays out {anBrand(template.shortName)}-style receipt with{" "}
              {d.hideItems ? "the payee, amount, date and transaction details" : CATEGORY_NOUN[category]}{" "}
              already filled in. You edit every field in your browser with a live
              preview and download a PDF or PNG with no account. Free downloads carry
              a small watermark; Pro from {formatPlanPrice(PLANS.pro_weekly)} a week{" "}
              removes it.
            </p>

            {/* Hand-written hand-offs to the closest sell page (lib/contextual-links.ts) */}
            <ContextLinks path={`/brands/${template.slug}`} />

            <h2 className="mt-12 text-xl font-bold text-slate-900">
              Common uses for {anBrand(template.shortName)} receipt
            </h2>
            <ul className="mt-4 space-y-3">
              {template.useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-3 text-slate-600">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {useCase}
                </li>
              ))}
            </ul>
            </div>
          </div>

          {/* Phones: the receipt part-way, scaled to the screen, and one tap
              into the builder. From lg: the whole receipt, sticky, clickable,
              with the "Edit this receipt" button under it. */}
          <div className="relative order-2 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/70 p-3 lg:sticky lg:top-24 lg:order-none lg:overflow-visible lg:rounded-none lg:bg-none lg:p-0">
            <div className="flex max-h-[340px] justify-center overflow-hidden lg:max-h-none lg:overflow-visible">
              <div className="receipt-shadow [zoom:0.85] lg:[zoom:1]">
                <ReceiptDocPaper doc={docFromReceiptData(preview)} />
              </div>
            </div>
            {/* Desktop: the whole sample opens the builder (2026-11-24: it was
                the biggest thing on the first screen and did nothing when
                clicked; 101 of 166 desktop visitors who never opened the
                builder left from that screen, Nov 6–23). An empty overlay, out
                of the tab order, so the receipt text stays plain content; the
                link below is the keyboard and screen-reader route. Phones keep
                the peek as it was. */}
            <Link
              href={`/create?template=${template.slug}`}
              tabIndex={-1}
              aria-label="Edit this receipt"
              className="absolute inset-0 hidden lg:block"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-200 to-transparent lg:hidden" />
            <Link
              href={`/create?template=${template.slug}`}
              data-offer-cta=""
              className="absolute bottom-4 left-1/2 inline-flex min-h-11 -translate-x-1/2 items-center whitespace-nowrap rounded-full bg-white px-5 text-sm font-semibold text-indigo-700 shadow lg:relative lg:inset-auto lg:mx-auto lg:mt-6 lg:flex lg:w-fit lg:translate-x-0 lg:bg-indigo-600 lg:text-white lg:hover:bg-indigo-700"
            >
              Edit this receipt →
            </Link>
          </div>
        </div>

        {/* What's on this receipt — data-driven, unique per brand */}
        <section className="mt-20" aria-labelledby="whats-on-heading">
          <h2 id="whats-on-heading" className="text-2xl font-bold text-slate-900">
            What&apos;s on {anBrand(template.shortName)} receipt
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
            This {template.shortName} receipt template opens pre-filled with{" "}
            {d.businessName ?? template.shortName}
            {addr ? ` (${addr})` : ""} and {preview.items.length}{" "}
            sample {preview.items.length === 1 ? "item" : "items"} totalling{" "}
            {money(totals.total)}. It shows {CATEGORY_NOUN[category]}, with{" "}
            {d.taxLabel ?? "tax"} set to {d.taxRate ?? 0}% on a{" "}
            {d.paperStyle ?? "thermal"}-style layout. Every field is editable —
            change the business details, items, prices, tax rate and currency,
            upload your own logo, then download as a PDF or PNG.
          </p>

          <div className="mt-6 max-w-md rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Sample items
            </h3>
            <ul className="mt-3 divide-y divide-slate-100">
              {preview.items.map((it) => (
                <li key={it.id} className="flex justify-between gap-4 py-2 text-sm text-slate-700">
                  <span>
                    {it.name}
                    {it.quantity && it.quantity !== 1 ? ` × ${it.quantity}` : ""}
                  </span>
                  <span className="tabular-nums">{money((it.price ?? 0) * (it.quantity ?? 1))}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 space-y-1 border-t border-slate-200 pt-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{money(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-slate-600">
                <dt>{d.taxLabel ?? "Tax"} ({d.taxRate ?? 0}%)</dt>
                <dd className="tabular-nums">{money(totals.tax)}</dd>
              </div>
              <div className="flex justify-between font-semibold text-slate-900">
                <dt>Total</dt>
                <dd className="tabular-nums">{money(totals.total)}</dd>
              </div>
            </dl>
          </div>

          {/* A way into the builder where the reading stops. The hero button
              was the page's only one: 60 of the phone visitors who never
              opened the builder had read past halfway (Nov 6–20), and so had
              48 of 166 on desktop (Nov 6–23), so it shows on desktop too
              since 2026-11-24. */}
          <div className="max-w-md lg:max-w-3xl">
            <HandoffCard
              heading={d.hideItems ? "This receipt is already in the template" : "These items are already in the template"}
              href={`/create?template=${template.slug}`}
              label={`Open the ${template.shortName} template`}
              location="brand_card"
            >
              Change the store details, items, prices and date, then download a PDF or PNG.
            </HandoffCard>
          </div>

          <h3 className="mt-10 text-lg font-bold text-slate-900">
            How to make {anBrand(template.shortName)} receipt
          </h3>
          <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 text-slate-600">
            <li>Open the {template.shortName} template — it loads with sample items and {d.taxLabel ?? "tax"} already filled in.</li>
            <li>Edit the business details, line items, prices, date and payment method to match what you need.</li>
            <li>
              Download a print-ready PDF or high-resolution PNG with no account. Free
              downloads carry a small watermark; Pro removes it, from{" "}
              {formatPlanPrice(PLANS.pro_weekly)} for 7 days.
            </li>
          </ol>

          {hubTemplates.length > 0 && (
            <p className="mt-6 max-w-3xl text-slate-600">
              Need one without the {template.shortName} branding? Start from the{" "}
              {hubTemplates.map((t, i) => (
                <span key={t.slug}>
                  {i > 0 && (i === hubTemplates.length - 1 ? " or " : ", ")}
                  <Link href={`/templates/${t.slug}`} className="font-medium text-indigo-600 hover:text-indigo-700">
                    {t.name.toLowerCase()}
                  </Link>
                </span>
              ))}{" "}
              {hubTemplates.length > 1 ? "templates" : "template"}, or open a blank page in the{" "}
              <Link href="/create" className="font-medium text-indigo-600 hover:text-indigo-700">
                receipt maker
              </Link>
              .
            </p>
          )}

          {examples.length > 0 && (
            <p className="mt-4 max-w-3xl text-slate-600">
              {examples.length === 1
                ? `See a worked ${template.shortName} receipt example: `
                : `See worked ${template.shortName} receipt examples: `}
              {examples.map((ex, i) => (
                <span key={ex.slug}>
                  {i > 0 && (i === examples.length - 1 ? " and " : ", ")}
                  <Link href={`/examples/${ex.slug}`} className="font-medium text-indigo-600 hover:text-indigo-700">
                    {exampleSummary(ex)}
                  </Link>
                </span>
              ))}
              .
            </p>
          )}
        </section>

        {/* Hand-written sections for the few brands whose queries need them
            (template.guidance, the same field the category templates use). */}
        {template.guidance && template.guidance.length > 0 && (
          <section className="mt-20">
            <div className="max-w-3xl space-y-12">
              {template.guidance.map((g) => (
                <div key={g.heading}>
                  <h2 className="text-2xl font-bold text-slate-900">{g.heading}</h2>
                  <CitedText body={g.body} className="mt-3 leading-relaxed text-slate-600" />
                </div>
              ))}
            </div>
          </section>
        )}

        {depth && (
          <section className="mt-20" aria-labelledby="real-receipt-heading">
            <h2 id="real-receipt-heading" className="text-2xl font-bold text-slate-900">
              How to read {anBrand(template.shortName)} receipt
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{depth.note}</p>
            <dl className="mt-6 max-w-3xl divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
              {depth.lines.map((line) => (
                <div key={line.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="font-mono text-sm font-semibold text-slate-900">{line.label}</dt>
                  <dd className="text-sm leading-relaxed text-slate-600">{line.meaning}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 max-w-3xl text-sm text-slate-500">
              The template follows this layout with invented sample numbers. Replace
              them with the details of a real transaction.
            </p>
            {depth.sources && depth.sources.length > 0 && (
              <p className="mt-3 max-w-3xl text-xs text-slate-500">
                Sources:{" "}
                {depth.sources.map((src, i) => (
                  <span key={src.url}>
                    {i > 0 && " · "}
                    <a href={src.url} rel="nofollow noopener" target="_blank" className="underline underline-offset-2 hover:text-slate-700">
                      {src.title}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </section>
        )}
        {/* FAQ */}
        {template.faqs.length > 0 && (
          <section className="mt-20" aria-labelledby="template-faq-heading">
            <h2 id="template-faq-heading" className="text-2xl font-bold text-slate-900">
              {template.shortName} receipt FAQ
            </h2>
            <div className="mt-6 space-y-4">
              {template.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related templates */}
        {related.length > 0 && (
        <section className="mt-20" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-bold text-slate-900">
            Other brand templates
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/brands/${t.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-indigo-300 hover:shadow-md"
                >
                  {t.defaults.logoDataUrl ? (
                    <span className="flex h-7 items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.defaults.logoDataUrl}
                        alt={`${t.shortName} logo`}
                        loading="lazy"
                        className="h-full w-auto max-w-[110px] object-contain"
                      />
                    </span>
                  ) : (
                    <span className="text-2xl" aria-hidden="true">{t.icon}</span>
                  )}
                  <span className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                    {t.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        )}

        {/* Curated and brand-named posts first; the topical fallback keeps the
            ~337 brands with no post of their own from being dead ends. */}
        <RelatedPosts
          hub={`/brands/${template.slug}`}
          categories={["Basics", "How-To", "Lost Receipts"]}
        />

        <Reviewed date={brandReviewedAt(template.slug)} />
      </div>

      {/* Phones: the builder one tap away while reading. Shows once the hero
          button has scrolled off, and hides while any other button
          (data-offer-cta) or the footer is on screen. */}
      <OfferBar
        href={`/create?template=${template.slug}`}
        text={`Ready to make your ${template.shortName} receipt?`}
        label="Use this template"
        shortLabel={`Make this ${template.shortName} receipt`}
        location="brand"
        showAtPercent={0}
        phonesOnly
      />
    </>
  );
}
