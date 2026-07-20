import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMPLATES, getTemplate } from "@/lib/templates";
import { previewFromTemplate } from "@/lib/receipt";
import { docFromReceiptData } from "@/lib/sections";
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
  return {
    title: { absolute: template.seoTitle },
    description: template.seoDescription,
    alternates: { canonical: `/templates/${template.slug}` },
    openGraph: {
      title: template.seoTitle,
      description: template.seoDescription,
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
      description: template.seoDescription,
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

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="text-4xl" aria-hidden="true">{template.icon}</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {template.heading}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{template.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/create?template=${template.slug}`}
                className="rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
              >
                Use This Template — Free
              </Link>
              <Link
                href="/templates"
                className="rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                All Templates
              </Link>
            </div>

            <h2 className="mt-12 text-xl font-bold text-slate-900">
              Common uses for a {template.name.toLowerCase()}
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

          <div className="flex justify-center lg:sticky lg:top-24">
            <div className="receipt-shadow">
              <ReceiptDocPaper doc={docFromReceiptData(preview)} />
            </div>
          </div>
        </div>

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
        <section className="mt-20" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-bold text-slate-900">
            Related templates
          </h2>
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
      </div>
    </>
  );
}
