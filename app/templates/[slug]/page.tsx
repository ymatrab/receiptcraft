import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMPLATES, getTemplate } from "@/lib/templates";
import { previewFromTemplate } from "@/lib/receipt";
import { docFromReceiptData } from "@/lib/sections";
import { fitSeoDescription } from "@/lib/seo-description";
import { SITE, absoluteUrl } from "@/lib/site";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";

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
      // re-add it — otherwise social previews render with no image.
      images: [absoluteUrl("/opengraph-image")],
    },
    twitter: {
      card: "summary_large_image",
      title: template.seoTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const preview = previewFromTemplate(template);
  const related = TEMPLATES.filter((t) => t.slug !== template.slug).slice(0, 4);

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
      { "@type": "ListItem", position: 2, name: "Templates", item: absoluteUrl("/templates") },
      {
        "@type": "ListItem",
        position: 3,
        name: template.name,
        item: absoluteUrl(`/templates/${template.slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-ledger">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/templates" className="hover:text-ledger">Templates</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-ink">{template.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="text-4xl" aria-hidden="true">{template.icon}</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {template.heading}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{template.intro}</p>

            {template.leadAnswer && (
              <p className="mt-6 rounded-[3px] border-l-4 border-ledger bg-greenbar/60 px-5 py-4 text-base leading-relaxed text-ink">
                {template.leadAnswer}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/create?template=${template.slug}`}
                className="rounded-full bg-ledger px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-ledger/25 transition-all hover:bg-ledger-deep"
              >
                Use This Template — Free
              </Link>
              <Link
                href="/templates"
                className="rounded-full border border-rule bg-card px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-greenbar"
              >
                All Templates
              </Link>
            </div>

            <h2 className="mt-12 text-xl font-bold text-ink">
              Common uses for a {template.name.toLowerCase()}
            </h2>
            <ul className="mt-4 space-y-3">
              {template.useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-3 text-ink-soft">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-ledger"
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

          <div className="flex justify-center lg:sticky lg:top-24">
            <div className="receipt-shadow">
              <ReceiptDocPaper doc={docFromReceiptData(preview)} />
            </div>
          </div>
        </div>

        {/* What's on a [X] receipt — vertical-specific fields */}
        {template.fields && template.fields.length > 0 && (
          <section className="mt-20" aria-labelledby="fields-heading">
            <h2 id="fields-heading" className="text-2xl font-bold text-ink">
              What&apos;s on a {template.shortName.toLowerCase()} receipt
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
              These are the fields a {template.shortName.toLowerCase()} receipt is
              expected to show — the same ones filled in on the sample above. For a
              plain-English definition of any receipt field, see the{" "}
              <Link href="/guides/receipt-anatomy" className="font-medium text-ledger hover:text-ledger-deep">
                Receipt Field Dictionary
              </Link>
              .
            </p>
            <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {template.fields.map((f) => (
                <div key={f.name} className="border-l-2 border-rule pl-4">
                  <dt className="font-semibold text-ink">{f.name}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{f.description}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* How to make one → builder CTA */}
        {template.howToSteps && template.howToSteps.length > 0 && (
          <section className="mt-20" aria-labelledby="how-to-heading">
            <h2 id="how-to-heading" className="text-2xl font-bold text-ink">
              How to make a {template.shortName.toLowerCase()} receipt
            </h2>
            <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-ink-soft marker:font-semibold marker:text-ledger">
              {template.howToSteps.map((step) => (
                <li key={step} className="leading-relaxed pl-1">{step}</li>
              ))}
            </ol>
            <Link
              href={`/create?template=${template.slug}`}
              className="mt-8 inline-block rounded-full bg-ledger px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-ledger/25 transition-all hover:bg-ledger-deep"
            >
              Open the {template.shortName} template — Free
            </Link>
          </section>
        )}

        {/* Vertical-specific guidance — the depth competitors lack */}
        {template.guidance && template.guidance.length > 0 && (
          <section className="mt-20" aria-labelledby="guidance-heading">
            <h2 id="guidance-heading" className="text-2xl font-bold text-ink">
              {template.shortName} receipts: what to get right
            </h2>
            <div className="mt-6 max-w-3xl space-y-8">
              {template.guidance.map((g) => (
                <div key={g.heading}>
                  <h3 className="text-lg font-bold text-ink">{g.heading}</h3>
                  {g.body.split(/\n\n+/).map((para, i) => (
                    <p key={i} className="mt-3 leading-relaxed text-ink-soft">{para}</p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Helpful tools & guides — internal links (depth pages only) */}
        {template.guidance && template.guidance.length > 0 && (
          <section className="mt-20" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="text-2xl font-bold text-ink">
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
                    className="group flex h-full flex-col rounded-[3px] border border-rule bg-card p-5 transition-all hover:border-ledger/45 hover:shadow-md"
                  >
                    <span className="text-sm font-semibold text-ink group-hover:text-ledger-deep">{l.title}</span>
                    <span className="mt-1 text-sm text-ink-soft">{l.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        {template.faqs.length > 0 && (
          <section className="mt-20" aria-labelledby="template-faq-heading">
            <h2 id="template-faq-heading" className="text-2xl font-bold text-ink">
              {template.shortName} receipt FAQ
            </h2>
            <div className="mt-6 space-y-4">
              {template.faqs.map((faq) => (
                <div key={faq.question} className="rounded-[3px] border border-rule bg-card p-6">
                  <h3 className="font-semibold text-ink">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related templates */}
        <section className="mt-20" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-bold text-ink">
            Related templates
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/templates/${t.slug}`}
                  className="group flex h-full flex-col rounded-[3px] border border-rule bg-card p-5 transition-all hover:border-ledger/45 hover:shadow-md"
                >
                  <span className="text-2xl" aria-hidden="true">{t.icon}</span>
                  <span className="mt-2 text-sm font-semibold text-ink group-hover:text-ledger-deep">
                    {t.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
