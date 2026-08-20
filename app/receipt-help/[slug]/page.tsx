import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getIntentPage,
  intentContent,
  siblingIntents,
  INTENT_SLUGS,
  type IntentKind,
} from "@/lib/intent-pages";
import { getTemplate } from "@/lib/templates";
import { fitSeoDescription } from "@/lib/seo-description";
import { absoluteUrl, SITE } from "@/lib/site";
import RelatedPosts from "@/components/RelatedPosts";

/** Which blog categories suit each guide. A "can I return without a receipt"
 *  page wants the legal reading; a lost-receipt page wants the recovery
 *  reading. Falls back to Lost Receipts, which fits every kind. */
const RELATED_CATEGORIES: Record<IntentKind, readonly string[]> = {
  "lost-receipt": ["Lost Receipts"],
  "receipt-copy": ["Lost Receipts"],
  "return-policy": ["Legal", "Lost Receipts"],
  "refund-policy": ["Legal", "Lost Receipts"],
};

export function generateStaticParams() {
  return INTENT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getIntentPage(slug);
  if (!page) return { title: "Not found" };
  const c = intentContent(page);
  const description = fitSeoDescription(c.description);
  return {
    title: c.title,
    description,
    alternates: { canonical: `/receipt-help/${slug}` },
    openGraph: {
      title: c.title,
      description,
      url: absoluteUrl(`/receipt-help/${slug}`),
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
      title: c.title,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export default async function IntentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIntentPage(slug);
  if (!page) notFound();

  const c = intentContent(page);
  const logo = getTemplate(page.brandSlug)?.defaults.logoDataUrl ?? "";
  const siblings = siblingIntents(page);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
    url: absoluteUrl(`/receipt-help/${slug}`),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Receipt Help", item: absoluteUrl("/receipt-help") },
      { "@type": "ListItem", position: 3, name: c.h1, item: absoluteUrl(`/receipt-help/${slug}`) },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="text-sm text-slate-500">
        <Link href="/receipt-help" className="hover:text-slate-700">Receipt Help</Link>
        <span className="px-1">/</span>
        <Link href={`/brands/${page.brandSlug}`} className="hover:text-slate-700">{page.brandName}</Link>
      </nav>

      <div className="mt-4 flex items-center gap-3">
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={`${page.brandName} logo`} className="h-8 w-auto max-w-[120px] object-contain" />
        )}
      </div>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{c.h1}</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">{c.lead}</p>

      {c.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
          {s.body && <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>}
          {s.steps && (
            <ol className="mt-3 space-y-2">
              {s.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          )}
          {s.cite && (
            <p className="mt-3 leading-relaxed text-slate-600">
              {s.cite.fact ? `${s.cite.fact} ` : null}
              Check{" "}
              <a
                href={s.cite.url}
                target="_blank"
                rel="noopener"
                className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:decoration-indigo-600"
              >
                {s.cite.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              for the current rules — policies change, and the brand&apos;s own page is
              the only authoritative version.{" "}
              <span className="text-sm text-slate-500">
                Link checked {new Date(s.cite.verifiedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                .
              </span>
            </p>
          )}
        </section>
      ))}

      {/* CTA */}
      <div className="mt-12 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-10 text-center">
        <h2 className="text-2xl font-bold text-white">{c.ctaHeading}</h2>
        <p className="mt-2 text-indigo-100">Match the items, prices, date and store details — then download as PDF or PNG.</p>
        <Link
          href={`/create?template=${encodeURIComponent(page.brandSlug)}`}
          className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 text-base font-semibold text-indigo-700 shadow-lg hover:scale-105"
        >
          Open the {page.brandName} receipt builder
        </Link>
      </div>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
        <dl className="mt-4 space-y-4">
          {c.faqs.map((f) => (
            <div key={f.question} className="rounded-2xl border border-slate-200 bg-white p-5">
              <dt className="font-semibold text-slate-900">{f.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Related */}
      {siblings.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            More {page.brandName} receipt help
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/receipt-help/${s.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                >
                  {intentContent(s).h1}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/brands/${page.brandSlug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
              >
                {page.brandName} receipt template
              </Link>
            </li>
          </ul>
        </section>
      )}

      {/* Articles about this brand. Keyed off the brand hub so a guide and the
          brand's own template page surface the same reading, with a topical
          fallback for the ~337 brands that have no post named after them. */}
      <RelatedPosts
        hub={`/brands/${page.brandSlug}`}
        categories={RELATED_CATEGORIES[page.kind]}
      />
    </main>
  );
}
