import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import { getAuthors } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Editorial Team",
  description: `Who writes and reviews ${SITE.name}'s receipt guides and templates, the real experience each author brings, and the editorial standards we hold them to.`,
  alternates: { canonical: "/authors" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Editorial Team", item: absoluteUrl("/authors") },
  ],
};

export const revalidate = 3600;

export default async function AuthorsPage() {
  const authors = await getAuthors();

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
          <li className="font-medium text-slate-900">Editorial Team</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">Editorial team</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
        {SITE.name}&apos;s receipt guides and templates are written and reviewed
        by the {SITE.name} team, drawing on hands-on experience with
        small-business receipts, bookkeeping and expense reporting.
      </p>

      {/* The named people behind the bylines. Anonymous "we" is the version that
          carries no weight — with readers or with anything summarising the page.
          Rendered from the author records themselves, so a job title or profile
          link appears only once a real one has been entered. */}
      {authors.length > 0 && (
        <section className="mt-10" aria-labelledby="people-heading">
          <h2 id="people-heading" className="text-2xl font-bold text-slate-900">
            Who writes these guides
          </h2>
          <ul className="mt-6 space-y-6">
            {authors.map((a) => (
              <li key={a.slug} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  <Link href={`/authors/${a.slug}`} className="hover:text-indigo-600">
                    {a.name}
                  </Link>
                </h3>
                {a.jobTitle && <p className="mt-1 text-sm text-slate-600">{a.jobTitle}</p>}
                {a.bio && <p className="mt-3 leading-relaxed text-slate-600">{a.bio}</p>}
                {typeof a.postCount === "number" && a.postCount > 0 && (
                  <p className="mt-3 text-sm text-slate-500">
                    {a.postCount} published {a.postCount === 1 ? "guide" : "guides"}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
        <h2 className="text-lg font-semibold text-slate-900">The {SITE.name} team</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          We build the receipt builder, write the guides on our{" "}
          <Link href="/blog" className="font-medium text-indigo-600 hover:underline">
            blog
          </Link>
          , review every template for accurate fields and layout, and answer
          support ourselves. Our guides are grounded in how receipts actually
          work — what each field means, how totals are calculated, and how to
          keep records lawfully.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          How we write, source and update content is described in our{" "}
          <Link href="/editorial-policy" className="font-medium text-indigo-600 hover:underline">
            editorial policy
          </Link>
          . Spot an error?{" "}
          <Link href="/contact" className="font-medium text-indigo-600 hover:underline">
            Tell us
          </Link>{" "}
          and we&apos;ll fix it.
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/blog"
          className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Read our guides
        </Link>
      </div>
    </main>
  );
}
