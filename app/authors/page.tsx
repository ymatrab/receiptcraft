import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Authors & Editorial Team",
  description: `The people who write and review ${SITE.name}'s receipt guides and templates, with their background and areas of focus.`,
  alternates: { canonical: "/authors" },
};

const AUTHORS = [
  {
    slug: "sara-artheta",
    name: "Sara Artheta",
    role: "Founder & Editor",
    initials: "SA",
    blurb:
      "Founder of Makecepeit with a background in small-business bookkeeping and expense reporting. Writes the receipt guides and reviews every template for realism.",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Authors", item: absoluteUrl("/authors") },
  ],
};

export default function AuthorsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-slate-900">Authors</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
        Authors &amp; editorial team
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
        The people who write and review {SITE.name}&apos;s receipt guides and
        templates. Our{" "}
        <Link href="/editorial-policy" className="font-medium text-indigo-600 hover:underline">
          editorial policy
        </Link>{" "}
        explains how content is written, reviewed and kept up to date.
      </p>

      <ul className="mt-10 space-y-4">
        {AUTHORS.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/authors/${a.slug}`}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-300"
            >
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white"
              >
                {a.initials}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{a.name}</p>
                <p className="text-sm text-slate-500">{a.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.blurb}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
