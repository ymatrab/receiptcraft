import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND_TEMPLATES, brandCategoryFor } from "@/lib/brands";
import { CATEGORY_NOUN } from "@/lib/brand-categories";
import { previewFromTemplate } from "@/lib/receipt";
import { docFromReceiptData } from "@/lib/sections";
import { calcTotals, formatMoney } from "@/lib/format";
import { SITE, absoluteUrl } from "@/lib/site";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";

interface Props {
  params: Promise<{ slug: string }>;
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
  };
}

export default async function BrandTemplatePage({ params }: Props) {
  const { slug } = await params;
  const template = BRAND_TEMPLATES.find((t) => t.slug === slug);
  if (!template) notFound();

  const preview = previewFromTemplate(template);
  const related = BRAND_TEMPLATES.filter((t) => t.slug !== template.slug).slice(0, 4);

  // Per-brand content derived from the template's own data — unique per page
  // (items, address, tax and totals all differ), not boilerplate.
  const totals = calcTotals(preview);
  const category = brandCategoryFor(template.slug);
  const d = template.defaults;
  const money = (n: number) => formatMoney(n, preview.currency);
  const addr = [d.addressLine1, d.addressLine2].filter(Boolean).join(", ");

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
              <Link href="/brands" className="hover:text-indigo-600">Brands</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-900">{template.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
          <div>
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

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/create?template=${template.slug}`}
                className="rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
              >
                Use This Template — Free
              </Link>
              <Link
                href="/brands"
                className="rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                All Brands
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

        {/* What's on this receipt — data-driven, unique per brand */}
        <section className="mt-20" aria-labelledby="whats-on-heading">
          <h2 id="whats-on-heading" className="text-2xl font-bold text-slate-900">
            What&apos;s on a {template.shortName} receipt
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
            This {template.name.toLowerCase()} template opens pre-filled with{" "}
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

          <h3 className="mt-10 text-lg font-bold text-slate-900">
            How to make a {template.shortName} receipt
          </h3>
          <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 text-slate-600">
            <li>Open the {template.shortName} template — it loads with realistic items and {d.taxLabel ?? "tax"} already filled in.</li>
            <li>Edit the business details, line items, prices, date and payment method to match what you need.</li>
            <li>Download instantly as a print-ready PDF or high-resolution PNG — no sign-up required.</li>
          </ol>
        </section>

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
      </div>
    </>
  );
}
