import { Fragment, type CSSProperties } from "react";
import type { Metadata } from "next";
import Reviewed from "@/components/Reviewed";
import { templateReviewedAt } from "@/lib/content-dates";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMPLATES, getTemplate, sourcedFigure } from "@/lib/templates";
import { TEMPLATE_IMAGES } from "@/lib/template-images";
import { previewFromTemplate } from "@/lib/receipt";
import { docFromReceiptData } from "@/lib/sections";
import { fitSeoDescription } from "@/lib/seo-description";
import { SITE, absoluteUrl } from "@/lib/site";
import { creativeWorkJsonLd } from "@/lib/schema";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import OfferBar from "@/components/OfferBar";
import { CitedText, SourceList } from "@/components/Sources";
import { citationJsonLd } from "@/lib/sources";
import RelatedPosts from "@/components/RelatedPosts";
import SellLinks from "@/components/SellLinks";
import { TEMPLATE_SELL_LINKS } from "@/lib/sell-links";
import ContextLinks from "@/components/ContextLinks";
import { examplesForTemplate } from "@/lib/example-links";
import { exampleSummary } from "@/lib/examples";
import { docViewUrl, googleDocFor } from "@/lib/google-docs-templates";
import { BRAND_TEMPLATES, brandCategoryFor } from "@/lib/brands";
import { byDemand, hubTemplateForBrand, relatedTemplateSlugs } from "@/lib/topic-clusters";

interface Props {
  params: Promise<{ slug: string }>;
}

// Prerender all template pages at build time (ISR) so they serve from the edge
// cache instead of rendering dynamically on every request.
export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};
  const description = fitSeoDescription(template.seoDescription);
  // The template's own share preview (its sample receipt beside its name),
  // made by scripts/template-images.ts. Until 2026-11-28 every template page
  // shared the one site-wide picture.
  const shareImage = absoluteUrl(
    TEMPLATE_IMAGES[template.slug] ? `/og/templates/${template.slug}.jpg` : "/opengraph-image",
  );
  return {
    title: { absolute: template.seoTitle },
    description,
    alternates: { canonical: `/templates/${template.slug}` },
    openGraph: {
      title: template.seoTitle,
      description,
      url: absoluteUrl(`/templates/${template.slug}`),
      siteName: SITE.name,
      type: "website",
      // Setting openGraph explicitly drops the default opengraph-image, so
      // an image has to be named here — otherwise social previews render with
      // none.
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: template.seoTitle,
      description,
      images: [shareImage],
    },
  };
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const preview = previewFromTemplate(template);
  const receiptDoc = docFromReceiptData(preview);
  // Phone scale for the receipt: 0.85 like brand pages, smaller for the wide
  // layouts so they fit 334px (390px phone, minus page and box padding).
  const receiptZoom = Math.min(0.85, 334 / (receiptDoc.settings.widthPx || 380));
  const googleDoc = googleDocFor(`/templates/${template.slug}`);
  // Invoice templates bill rather than confirm payment, so their headings say
  // "invoice"; the article follows the noun ("an airline receipt").
  const isInvoice = Boolean(template.defaults.invoice);
  const docLabel = isInvoice ? template.name.toLowerCase() : `${template.shortName.toLowerCase()} receipt`;
  const docTitle = isInvoice ? template.name : `${template.shortName} receipt`;
  const an = (noun: string) => (/^[aeiou]/i.test(noun) ? "an" : "a");
  const useLabel = template.name.toLowerCase();
  // Neighbours from the same topic group, and the brands whose hub this
  // template is. Both used to be missing: every page listed the same first
  // four templates and no brands at all.
  const related = relatedTemplateSlugs(template.slug)
    .map((s) => getTemplate(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const allBrands = BRAND_TEMPLATES.filter(
    (b) => hubTemplateForBrand(b.slug, brandCategoryFor(b.slug)) === template.slug,
  ).sort(byDemand);
  const brands = allBrands.slice(0, 8);
  // The rest, as plain links under the cards. Until 2026-10-27 a template showed
  // only eight of its brands, so 213 of 352 brand pages had no link from the
  // template page they belong to and lived on five links from their neighbours.
  const moreBrands = allBrands.slice(8);
  // Worked examples built on this template that have no brand page to link
  // them (a vet, a plumber, a farmers market). Before 2026-11-16 nothing in
  // any page body linked them; only the paginated /examples index did.
  const examples = examplesForTemplate(template.slug);

  // A sourced figure for templates that carry none of their own. Its sources
  // join the page's own so the footer list and the JSON-LD citations both cover
  // everything actually cited in the body — a citation rendered inline but
  // missing from the list reads as unsourced to anything parsing the page.
  const figure = sourcedFigure(template);
  const pageSources = [...(template.sources ?? []), ...(figure?.sources ?? [])];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: template.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
    // Same data the page renders in its source list — the machine-readable half
    // of the citation, omitted entirely when a template cites nothing.
    ...(pageSources.length ? { citation: citationJsonLd(pageSources) } : {}),
    // Machine-readable twin of the visible "Last reviewed" line, from the same
    // constant the sitemap uses.
    dateModified: templateReviewedAt(template),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Templates", item: absoluteUrl("/templates") },
      {
        "@type": "ListItem",
        position: 3,
        name: template.name,
        item: absoluteUrl(`/templates/${template.slug}`),
      },
    ],
  };

  // A real picture of the sample receipt (scripts/template-images.ts). The
  // sample at the top of the page is drawn in HTML, which gave Google Images
  // nothing to show: on 2026-11-28 Pinterest pins and Etsy listings held most
  // of page one for "rent / cash / donation receipt template" while no
  // template page had an image of its own receipt.
  const picture = TEMPLATE_IMAGES[template.slug];
  const pictureSrc = `/template-images/${template.slug}.webp`;
  const fieldNames = (template.fields ?? []).slice(0, 4).map((f) => f.name.toLowerCase());
  const pictureAlt =
    `${docTitle} template example: a filled-in sample` +
    (fieldNames.length > 1
      ? ` showing ${fieldNames.slice(0, -1).join(", ")} and ${fieldNames[fieldNames.length - 1]}`
      : "");
  // Narrower for the long receipts, so none stands much taller than 640px
  // beside the field list. The whole receipt always shows; nothing is cropped.
  const pictureWidth = picture ? Math.min(270, Math.round((640 * picture.w) / picture.h)) : 0;
  const sampleFigure = picture ? (
    <figure className="mx-auto w-full shrink-0 text-center lg:mx-0" style={{ maxWidth: pictureWidth }}>
      <Link href={`/create?template=${template.slug}`} className="block">
        {/* A plain img on purpose: the file is already sized and compressed,
            and next/image would spend an optimisation on every one of them. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pictureSrc}
          alt={pictureAlt}
          width={picture.w}
          height={picture.h}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-md"
        />
      </Link>
      <figcaption className="mt-2 text-xs leading-relaxed text-slate-500">
        {docTitle} example. The names and amounts are sample data.
        <br />
        <Link href={`/create?template=${template.slug}`} className="font-semibold text-indigo-600 hover:text-indigo-700">
          Edit this {isInvoice ? "invoice" : "receipt"} →
        </Link>
      </figcaption>
    </figure>
  ) : null;
  const imageJsonLd = picture
    ? {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        contentUrl: absoluteUrl(pictureSrc),
        url: absoluteUrl(pictureSrc),
        name: `${docTitle} template example`,
        description: pictureAlt,
        width: picture.w * 2,
        height: picture.h * 2,
        representativeOfPage: true,
        creditText: SITE.name,
        creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
      }
    : null;

  // The page's subject. The FAQ and breadcrumb blocks describe what it answers
  // and where it sits; neither says what the page is.
  const workJsonLd = creativeWorkJsonLd({
    name: template.name,
    description: template.seoDescription,
    path: `/templates/${template.slug}`,
    dateModified: templateReviewedAt(template),
    image: picture ? pictureSrc : undefined,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {imageJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pt-12 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-indigo-600">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/templates" className="hover:text-indigo-600">Templates</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-900">{template.name}</li>
          </ol>
        </nav>

        {/* PHONE ORDER (2026-11-23). On a phone the receipt came after the
            intro, the answer box, the links, both buttons and "Common uses"
            (821–1,402px down), and on four templates the button itself was
            below the first screen. Wide receipts (airline 420px, car rental
            440px) also made the page wider than the phone, cutting the text
            off on the right.

            The left column is `contents` below lg, so its four groups become
            items of this grid and `order` puts the button (order-2) and the
            receipt (order-3) straight after the intro, with the answer and
            links (order-4) and "Common uses" (order-5) after them. From lg it
            is a flex column with the same order, so the button also comes
            before the answer box on desktop (2026-11-24: on the 26 templates
            with one, a 1366x768 laptop showed the button at the screen's
            bottom edge, 711px). The HTML order never changes.

            grid-cols-[minmax(0,1fr)]: an implicit column takes its widest
            child, which is what made the page 436px on a 390px phone. */}
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)] items-start gap-6 sm:mt-8 lg:grid-cols-2 lg:gap-12">
          <div className="contents lg:flex lg:flex-col">
            <div className="order-1">
              <span className="text-3xl sm:text-4xl" aria-hidden="true">{template.icon}</span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:mt-4 sm:text-4xl">
                {template.heading}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{template.intro}</p>
            </div>

            {/* -mt-2 cancels most of the grid gap when none of these render. */}
            <div className="order-4 -mt-2 lg:mt-0">
              <SellLinks links={TEMPLATE_SELL_LINKS[template.slug]} />

              {template.leadAnswer && (
                <p className="mt-6 rounded-2xl border-l-4 border-indigo-500 bg-indigo-50/60 px-5 py-4 text-base leading-relaxed text-slate-700">
                  {template.leadAnswer}
                </p>
              )}

              {/* Hand-written hand-offs to the closest sell page (lib/contextual-links.ts) */}
              <ContextLinks path={`/templates/${template.slug}`} />
            </div>

            <div className="order-2 flex flex-wrap gap-3 lg:mt-8">
              {/* data-offer-cta: the phone offer bar stays hidden while this is on screen. */}
              <Link
                href={`/create?template=${template.slug}`}
                data-offer-cta=""
                className="w-full rounded-full bg-indigo-600 px-7 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 sm:w-auto"
              >
                Use This Template — Free
              </Link>
              {/* Phones: the breadcrumb already links the template list, and
                  this second button stood between the first one and the receipt. */}
              <Link
                href="/templates"
                className="hidden rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:inline-block"
              >
                All Templates
              </Link>
            </div>

            <div className="order-5">
              <h2 className="mt-4 text-xl font-bold text-slate-900 lg:mt-12">
                Common uses for {an(useLabel)} {useLabel}
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

          {/* Phones: the receipt part-way, scaled to fit the screen, and one
              tap into the builder. --rz fits the widest receipt (440px) into
              the 334px a 390px phone leaves inside this box. From lg: the
              whole receipt, sticky, as before. */}
          <div className="relative order-3 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/70 p-3 lg:sticky lg:top-24 lg:order-none lg:overflow-visible lg:rounded-none lg:bg-none lg:p-0">
            <div className="flex max-h-[340px] justify-center overflow-hidden lg:max-h-none lg:overflow-visible">
              <div className="receipt-shadow [zoom:var(--rz)] lg:[zoom:1]" style={{ "--rz": receiptZoom } as CSSProperties}>
                <ReceiptDocPaper doc={receiptDoc} />
              </div>
            </div>
            {/* The whole sample opens the builder (2026-11-24: on desktop it
                was the biggest thing on the first screen and did nothing when
                clicked). An empty overlay, out of the tab order, so the
                receipt text stays plain content; the link below is the
                keyboard and screen-reader route. */}
            <Link
              href={`/create?template=${template.slug}`}
              tabIndex={-1}
              aria-label="Edit this receipt"
              className="absolute inset-0 rounded-2xl"
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

        {/* What's on a [X] receipt — vertical-specific fields */}
        {template.fields && template.fields.length > 0 && (
          <section className="mt-20" aria-labelledby="fields-heading">
            <h2 id="fields-heading" className="text-2xl font-bold text-slate-900">
              What&apos;s on {an(docLabel)} {docLabel}
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
              These are the fields {an(docLabel)} {docLabel} is
              expected to show — the same ones filled in on the sample above. For a
              plain-English definition of any receipt field, see the{" "}
              <Link href="/guides/receipt-anatomy" className="font-medium text-indigo-600 hover:text-indigo-700">
                Receipt Field Dictionary
              </Link>
              .
            </p>
            {/* The picture sits above the list on phones and to its left from
                lg, so each field can be read against the sample. */}
            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
              {sampleFigure}
              <dl className="grid flex-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {template.fields.map((f) => (
                  <div key={f.name} className="border-l-2 border-slate-200 pl-4">
                    <dt className="font-semibold text-slate-900">{f.name}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-600">{f.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* Templates with no field list still get the picture, in a short
            section of its own. */}
        {!(template.fields && template.fields.length > 0) && sampleFigure && (
          <section className="mt-20" aria-labelledby="sample-heading">
            <h2 id="sample-heading" className="text-2xl font-bold text-slate-900">
              What {an(docLabel)} {docLabel} looks like
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
              This is the sample the template opens with. Every line on it can be changed before
              you download it.
            </p>
            <div className="mt-6">{sampleFigure}</div>
          </section>
        )}

        {/* How to make one → builder CTA */}
        {template.howToSteps && template.howToSteps.length > 0 && (
          <section className="mt-20" aria-labelledby="how-to-heading">
            <h2 id="how-to-heading" className="text-2xl font-bold text-slate-900">
              How to make {an(docLabel)} {docLabel}
            </h2>
            <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-slate-600 marker:font-semibold marker:text-indigo-600">
              {template.howToSteps.map((step) => (
                <li key={step} className="leading-relaxed pl-1">{step}</li>
              ))}
            </ol>
            <Link
              href={`/create?template=${template.slug}`}
              data-offer-cta=""
              className="mt-8 inline-block rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
            >
              Open the {template.shortName} template — Free
            </Link>
          </section>
        )}

        {/* The same document as a public Google Doc, linked by its indexable
            /edit address so Google discovers the Doc from a crawled page. */}
        {googleDoc && (
          <p className="mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-slate-600">
            Prefer Google Docs? Open the free{" "}
            <a
              href={docViewUrl(googleDoc.id)}
              target="_blank"
              rel="noopener"
              className="font-medium text-indigo-600 hover:underline"
            >
              {googleDoc.name.toLowerCase()} in Google Docs
            </a>{" "}
            and make a copy, or see all our{" "}
            <Link href="/templates/google-docs" className="font-medium text-indigo-600 hover:underline">
              Google Docs templates
            </Link>
            .
          </p>
        )}

        {/* Worked examples on this template with no brand page of their own */}
        {examples.length > 0 && (
          <p className="mt-10 max-w-3xl leading-relaxed text-slate-600">
            <span className="font-semibold text-slate-900">
              {examples.length === 1 ? `A worked ${docLabel} example:` : `Worked ${docLabel} examples:`}
            </span>{" "}
            {examples.map((ex, i) => (
              <Fragment key={ex.slug}>
                {i > 0 && (i === examples.length - 1 ? " and " : ", ")}
                <Link href={`/examples/${ex.slug}`} className="font-medium text-indigo-600 hover:underline">
                  {ex.brand} ({exampleSummary(ex)})
                </Link>
              </Fragment>
            ))}
            .
          </p>
        )}

        {/* Vertical-specific guidance — the depth competitors lack */}
        {template.guidance && template.guidance.length > 0 && (
          <section className="mt-20" aria-labelledby="guidance-heading">
            <h2 id="guidance-heading" className="text-2xl font-bold text-slate-900">
              {docTitle}s: what to get right
            </h2>
            <div className="mt-6 max-w-3xl space-y-8">
              {template.guidance.map((g) => (
                <div key={g.heading}>
                  <h3 className="text-lg font-bold text-slate-900">{g.heading}</h3>
                  <CitedText body={g.body} className="mt-3 leading-relaxed text-slate-600" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* A specific, sourced figure for templates that carry none of their own.
            Rendered as its own section so the number, the authority behind it
            and the checked date are extractable together rather than inferred
            from prose. */}
        {figure && (
          <section className="mt-20" aria-labelledby="figure-heading">
            <h2 id="figure-heading" className="text-2xl font-bold text-slate-900">
              {figure.heading}
            </h2>
            <div className="mt-6 max-w-3xl">
              <CitedText body={figure.body} className="mt-3 leading-relaxed text-slate-600" />
            </div>
          </section>
        )}

        {/* Helpful tools & guides — internal links (depth pages only) */}
        {template.guidance && template.guidance.length > 0 && (
          <section className="mt-20" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="text-2xl font-bold text-slate-900">
              Helpful tools &amp; guides
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { href: "/tools/receipt-calculator", title: "Receipt totals calculator", desc: "Check subtotal, tax, tip, total and change." },
                { href: "/tools/split-payment-checker", title: "Split-payment checker", desc: "Reconcile a bill paid across several tenders." },
                { href: "/guides/receipt-anatomy", title: "Receipt Field Dictionary", desc: "Every receipt field, defined in plain English." },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-indigo-300 hover:shadow-md"
                  >
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-700">{l.title}</span>
                    <span className="mt-1 text-sm text-slate-500">{l.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        {template.faqs.length > 0 && (
          <section className="mt-20" aria-labelledby="template-faq-heading">
            <h2 id="template-faq-heading" className="text-2xl font-bold text-slate-900">
              {docTitle} FAQ
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

        {/* The authorities behind the guidance above */}
        {pageSources.length > 0 && (
          <SourceList
            ids={pageSources}
            note={`The rules cited on this page, with what each one is cited for. They describe how ${template.shortName.toLowerCase()} receipts are treated — they are not advice about your own situation.`}
          />
        )}

        {/* Brand templates of this kind — the spokes of this hub */}
        {brands.length > 0 && (
          <section className="mt-20" aria-labelledby="brands-heading">
            <h2 id="brands-heading" className="text-2xl font-bold text-slate-900">
              Make {an(docLabel)} {docLabel} for a specific brand
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              These brand templates start from the same layout, with that
              brand&apos;s own items, tax and store details already filled in.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/brands/${b.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-indigo-300 hover:text-indigo-600"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
            {moreBrands.length > 0 && (
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-900">
                  More {docLabel} templates by brand:
                </span>{" "}
                {moreBrands.map((b, i) => (
                  <Fragment key={b.slug}>
                    {i > 0 && " · "}
                    <Link href={`/brands/${b.slug}`} className="hover:text-indigo-600 hover:underline">
                      {b.shortName}
                    </Link>
                  </Fragment>
                ))}
              </p>
            )}
          </section>
        )}

        {/* Related templates */}
        <section className="mt-20" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-bold text-slate-900">
            Related templates
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Or start from a blank page in the{" "}
            <Link href="/create" className="font-medium text-indigo-600 hover:text-indigo-700">
              receipt maker
            </Link>
            .
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/templates/${t.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-indigo-300 hover:shadow-md"
                >
                  <span className="text-2xl" aria-hidden="true">{t.icon}</span>
                  <span className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                    {t.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Curated posts first, then a rotation of how-to and small-business
            posts, so no template page is a dead end for the crawler. */}
        <RelatedPosts
          hub={`/templates/${template.slug}`}
          categories={["How-To", "Small Business", "Basics"]}
        />

        <Reviewed date={templateReviewedAt(template)} />
      </div>

      {/* Phones: the builder one tap away while reading. Shows once the hero
          button has scrolled off, and hides while any other button
          (data-offer-cta) or the footer is on screen. Template pages without
          a "How to make" section had no other button above the footer. */}
      <OfferBar
        href={`/create?template=${template.slug}`}
        text={`Ready to make your ${docLabel}?`}
        label="Use this template"
        shortLabel={`Make this ${docLabel}`}
        location="template"
        showAtPercent={0}
        phonesOnly
      />
    </>
  );
}
