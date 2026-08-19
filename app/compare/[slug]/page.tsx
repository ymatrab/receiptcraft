import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COMPETITORS,
  competitorBySlug,
  MAKECEPEIT,
  PRICING_AS_OF,
} from "@/lib/comparisons";
import { BRAND_TEMPLATES } from "@/lib/brands";
import { previewFromTemplate } from "@/lib/receipt";
import { docFromReceiptData } from "@/lib/sections";
import { SITE, absoluteUrl } from "@/lib/site";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import ComparisonTable from "@/components/comparison/ComparisonTable";
import RelatedPosts from "@/components/RelatedPosts";

interface Props {
  params: Promise<{ slug: string }>;
}

// Prerender every comparison page at build time (ISR) so they are served from
// the edge cache like /brands and /examples — not rendered on each request.
export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = competitorBySlug(slug);
  if (!c) return {};
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: { canonical: `/compare/${c.slug}` },
    openGraph: {
      title: c.seoTitle,
      description: c.seoDescription,
      url: absoluteUrl(`/compare/${c.slug}`),
      siteName: SITE.name,
      type: "website",
      images: [absoluteUrl("/opengraph-image")],
    },
    twitter: {
      card: "summary_large_image",
      title: c.seoTitle,
      description: c.seoDescription,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

// A neutral, professional receipt to show what Makecepeit produces. Reuses a
// real brand template so the preview stays valid without a hand-written literal.
const PREVIEW_BRAND =
  BRAND_TEMPLATES.find((t) => t.slug === "starbucks") ?? BRAND_TEMPLATES[0];

function Check() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const c = competitorBySlug(slug);
  if (!c) notFound();

  const preview = previewFromTemplate(PREVIEW_BRAND);
  const related = COMPETITORS.filter((o) => o.slug !== c.slug);
  const reviewedLabel = new Date(c.updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Alternatives",
        item: absoluteUrl("/alternatives"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: c.h1,
        item: absoluteUrl(`/compare/${c.slug}`),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // Makecepeit's own SoftwareApplication schema (our product; prices are public
  // in lib/plans.ts). No aggregateRating — we don't have verifiable review data.
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: SITE.description,
    url: SITE.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free to build and preview; Pro from $3/week.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/alternatives" className="hover:text-indigo-600">
                Alternatives
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-900">{c.h1}</li>
          </ol>
        </nav>

        {/* Hero */}
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Receipt maker comparison
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {c.h1}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{c.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/create"
                className="rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
              >
                Try {SITE.name} Free
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                See Pricing
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Last reviewed {reviewedLabel}. {SITE.name} is our own product;
              {" "}{c.name} data is from its public website (as of {PRICING_AS_OF}).
            </p>
          </div>

          <div className="flex justify-center lg:sticky lg:top-24">
            <div className="receipt-shadow">
              <ReceiptDocPaper doc={docFromReceiptData(preview)} />
            </div>
          </div>
        </div>

        {/* Feature matrix */}
        <section className="mt-20" aria-labelledby="matrix-heading">
          <h2 id="matrix-heading" className="text-2xl font-bold text-slate-900">
            {SITE.name} vs {c.name}: feature comparison
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            A field-by-field look at how the two receipt makers stack up.
            {" "}✓ = yes, ~ = partial or limited, ✕ = not available.
          </p>
          <div className="mt-6">
            <ComparisonTable
              caption={`${SITE.name} versus ${c.name} feature comparison`}
              columns={[
                { name: `${SITE.name} (us)`, cells: MAKECEPEIT.cells, highlight: true },
                { name: c.name, cells: c.cells },
              ]}
            />
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-16" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="text-2xl font-bold text-slate-900">
            Pricing compared
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-6">
              <h3 className="text-lg font-bold text-slate-900">{SITE.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Free to build and preview with no signup. Your first 3 HD
                downloads are free; after that, Pro removes the watermark and
                unlocks unlimited HD exports, unlimited AI generation and saved
                history.
              </p>
              <p className="mt-4 text-2xl font-bold text-slate-900">
                Free{" "}
                <span className="text-base font-medium text-slate-500">
                  · Pro from $3/wk
                </span>
              </p>
              <p className="mt-1 text-sm text-slate-500">
                $3/week · $7.99/month · $39/year
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {c.pricing.free}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {c.pricing.paid}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            {c.name} pricing as of {PRICING_AS_OF}, from its public website.
            Prices can change — check {c.name} directly before subscribing.
          </p>
        </section>

        {/* Fair overview of the competitor */}
        <section className="mt-16 grid gap-10 lg:grid-cols-2" aria-labelledby="overview-heading">
          <div>
            <h2 id="overview-heading" className="text-2xl font-bold text-slate-900">
              About {c.name}
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">{c.overview}</p>
            <h3 className="mt-6 text-base font-semibold text-slate-900">
              What {c.name} does well
            </h3>
            <ul className="mt-3 space-y-2">
              {c.strengths.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-slate-600">
                  <Check />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Where {SITE.name} is stronger
            </h2>
            <ul className="mt-4 space-y-2">
              {c.gaps.map((g) => (
                <li key={g} className="flex items-start gap-2.5 text-slate-600">
                  <Check />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Verdict */}
        <section className="mt-16" aria-labelledby="verdict-heading">
          <h2 id="verdict-heading" className="text-2xl font-bold text-slate-900">
            The verdict
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
            {c.verdict}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-indigo-700">
                Choose {SITE.name} if…
              </h3>
              <ul className="mt-3 space-y-2">
                {c.chooseUs.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-slate-600">
                    <Check />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-slate-700">
                Choose {c.name} if…
              </h3>
              <ul className="mt-3 space-y-2">
                {c.chooseThem.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-slate-600">
                    <Check />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-slate-900">
            {SITE.name} vs {c.name}: FAQ
          </h2>
          <dl className="mt-6 max-w-3xl space-y-6">
            {c.faqs.map((f) => (
              <div key={f.question}>
                <dt className="text-base font-semibold text-slate-900">
                  {f.question}
                </dt>
                <dd className="mt-2 leading-relaxed text-slate-600">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Final CTA */}
        <section className="mt-16 rounded-3xl bg-slate-900 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Make a receipt in seconds — free
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            350+ brand templates, AI generation and PDF &amp; PNG export. Start
            building with no signup and see the difference yourself.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/create"
              className="rounded-full bg-indigo-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-400"
            >
              Try {SITE.name} Free
            </Link>
            <Link
              href="/alternatives"
              className="rounded-full border border-slate-600 px-7 py-3.5 text-base font-semibold text-slate-100 transition-colors hover:bg-slate-800"
            >
              All Alternatives
            </Link>
          </div>
        </section>

        {/* Related comparisons */}
        <section className="mt-16" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xl font-bold text-slate-900">
            Related comparisons
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((o) => (
              <Link
                key={o.slug}
                href={`/compare/${o.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-300"
              >
                <span className="text-base font-semibold text-slate-900">
                  {SITE.name} vs {o.name}
                </span>
                <span className="mt-1 block text-sm text-slate-500">
                  {o.tagline}
                </span>
              </Link>
            ))}
            <Link
              href="/alternatives"
              className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-300"
            >
              <span className="text-base font-semibold text-slate-900">
                Best receipt generators
              </span>
              <span className="mt-1 block text-sm text-slate-500">
                All {SITE.name} alternatives, compared
              </span>
            </Link>
          </div>
        </section>

        <RelatedPosts hub={`/compare/${c.slug}`} />
      </div>
    </>
  );
}
