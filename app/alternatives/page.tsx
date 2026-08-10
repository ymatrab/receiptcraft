import type { Metadata } from "next";
import Link from "next/link";
import {
  COMPETITORS,
  OTHER_ALTERNATIVES,
  MAKECEPEIT,
  PRICING_AS_OF,
  LAST_UPDATED,
} from "@/lib/comparisons";
import { SITE, absoluteUrl } from "@/lib/site";
import ComparisonTable from "@/components/comparison/ComparisonTable";

const TITLE = "7 Best Receipt Generators in 2026 (Free & Paid), Compared";
const DESCRIPTION =
  "The best receipt makers and Makecepeit alternatives in 2026, compared on price, templates, AI generation and PDF/PNG export — including MakeReceipt, ReceiptFaker and ReceiptBaker.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/alternatives" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/alternatives"),
    siteName: SITE.name,
    type: "website",
    images: [absoluteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [absoluteUrl("/opengraph-image")],
  },
};

const REVIEWED_LABEL = new Date(LAST_UPDATED).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

// Ranked list for the roundup: Makecepeit first (disclosed as our own), then
// the tracked competitors, then other well-known names.
const RANKED_NAMES = [
  MAKECEPEIT.name,
  ...COMPETITORS.map((c) => c.name),
  ...OTHER_ALTERNATIVES.map((o) => o.name),
];

export default function AlternativesPage() {
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
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Receipt Generators in 2026",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: RANKED_NAMES.length,
    itemListElement: RANKED_NAMES.map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-900">Alternatives</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Receipt maker roundup
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Best receipt generators in 2026
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            There are dozens of online receipt makers. We compared the most
            popular ones on the things that actually matter — price, template
            breadth, AI generation, export formats and how much you can do for
            free — so you can pick the right one fast.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Last reviewed {REVIEWED_LABEL}. Competitor data is from each tool&apos;s
            public website (as of {PRICING_AS_OF}). {SITE.name} is our own tool —
            we&apos;ve tried to keep this list fair and note where rivals are
            stronger.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/create"
              className="rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
            >
              Try {SITE.name} Free
            </Link>
          </div>
        </header>

        {/* At-a-glance matrix */}
        <section className="mt-16" aria-labelledby="matrix-heading">
          <h2 id="matrix-heading" className="text-2xl font-bold text-slate-900">
            At a glance
          </h2>
          <p className="mt-3 text-slate-600">
            {SITE.name} vs the three most-searched competitors. ✓ = yes, ~ =
            partial or limited, ✕ = not available.
          </p>
          <div className="mt-6">
            <ComparisonTable
              caption="Receipt generator feature comparison"
              columns={[
                { name: `${MAKECEPEIT.name} (us)`, cells: MAKECEPEIT.cells, highlight: true },
                ...COMPETITORS.map((c) => ({ name: c.name, cells: c.cells })),
              ]}
            />
          </div>
        </section>

        {/* Ranked write-ups */}
        <section className="mt-16" aria-labelledby="ranked-heading">
          <h2 id="ranked-heading" className="text-2xl font-bold text-slate-900">
            The receipt generators, ranked
          </h2>

          {/* #1 — Makecepeit (disclosed) */}
          <article className="mt-8 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-6">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-bold text-indigo-600">#1</span>
              <h3 className="text-xl font-bold text-slate-900">
                {SITE.name}{" "}
                <span className="text-sm font-medium text-slate-400">
                  (our tool)
                </span>
              </h3>
            </div>
            <p className="mt-3 leading-relaxed text-slate-600">
              A free, AI-powered receipt maker with 350+ named-brand templates
              (Walmart, Target, Starbucks and more), live preview, and PDF plus
              high-resolution PNG export. You can build and preview with no
              signup; your first three HD downloads are free, and Pro removes the
              watermark with unlimited AI generation and saved history.
            </p>
            <p className="mt-3 text-sm font-medium text-slate-500">
              Pricing: Free · Pro $3/wk, $7.99/mo or $39/yr · Best for: anyone
              who wants the most templates and AI at the lowest transparent
              price.
            </p>
            <div className="mt-4">
              <Link
                href="/create"
                className="inline-block rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
              >
                Start free
              </Link>
            </div>
          </article>

          {/* Tracked competitors with full vs pages */}
          {COMPETITORS.map((c, i) => (
            <article
              key={c.slug}
              className="mt-6 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-bold text-slate-400">#{i + 2}</span>
                <h3 className="text-xl font-bold text-slate-900">{c.name}</h3>
              </div>
              <p className="mt-1 text-sm text-slate-500">{c.tagline}</p>
              <p className="mt-3 leading-relaxed text-slate-600">{c.overview}</p>
              <p className="mt-3 text-sm text-slate-500">
                <span className="font-medium text-slate-600">Pricing:</span>{" "}
                {c.pricing.free} {c.pricing.paid}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/compare/${c.slug}`}
                  className="inline-block rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  {SITE.name} vs {c.name}
                </Link>
                <a
                  href={c.url}
                  target="_blank"
                  rel="nofollow noopener"
                  className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                  Visit {c.domain} ↗
                </a>
              </div>
            </article>
          ))}

          {/* Other well-known alternatives (lighter cards) */}
          {OTHER_ALTERNATIVES.map((o, i) => (
            <article
              key={o.name}
              className="mt-6 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-bold text-slate-400">
                  #{COMPETITORS.length + 2 + i}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{o.name}</h3>
              </div>
              <p className="mt-3 leading-relaxed text-slate-600">{o.blurb}</p>
              <p className="mt-3 text-sm text-slate-500">
                <span className="font-medium text-slate-600">Pricing:</span>{" "}
                {o.pricing} · <span className="font-medium text-slate-600">Best for:</span>{" "}
                {o.bestFor}
              </p>
              <div className="mt-4">
                <a
                  href={o.url}
                  target="_blank"
                  rel="nofollow noopener"
                  className="inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                  Visit website ↗
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* How we compared */}
        <section className="mt-16 max-w-3xl" aria-labelledby="method-heading">
          <h2 id="method-heading" className="text-2xl font-bold text-slate-900">
            How we compared them
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            We reviewed each tool&apos;s public website for pricing, template
            breadth, export formats, AI features and whether you can start
            without an account. Where a tool doesn&apos;t publish its prices, we
            say so rather than guess. Pricing changes often, so treat the figures
            as a snapshot from {PRICING_AS_OF} and confirm on each provider&apos;s
            site. As the makers of {SITE.name}, we&apos;ve flagged where
            competitors do things better on their dedicated comparison pages.
          </p>
        </section>

        {/* Final CTA */}
        <section className="mt-16 rounded-3xl bg-slate-900 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Make your receipt free in seconds
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            350+ brand templates, AI generation and PDF &amp; PNG export — with
            no signup to start.
          </p>
          <div className="mt-8">
            <Link
              href="/create"
              className="inline-block rounded-full bg-indigo-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-400"
            >
              Try {SITE.name} Free
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
