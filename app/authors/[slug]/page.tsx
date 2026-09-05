import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuthor, getAuthors, getAllPosts } from "@/lib/sanity/queries";
import { SITE, absoluteUrl } from "@/lib/site";

/**
 * Author page — the entity behind a byline.
 *
 * Attributed statements from a named person carry weight that anonymous "we"
 * does not, for readers and for models summarising the page. That only holds if
 * the person is real, so everything here renders from what the author document
 * actually contains: no invented job title, no placeholder bio, no sameAs link
 * to a profile nobody confirmed. Fields left empty in the Studio are simply
 * omitted from both the page and the Person schema.
 */

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  const authors = await getAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) return { title: "Author not found" };
  return {
    title: `${author.name} — ${SITE.name}`,
    description:
      author.bio ?? `Guides and receipt templates written by ${author.name} for ${SITE.name}.`,
    alternates: { canonical: `/authors/${author.slug}` },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) notFound();

  const posts = (await getAllPosts()).slice(0, 12);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: absoluteUrl(`/authors/${author.slug}`),
    // Each of these is omitted rather than defaulted. A Person block asserting a
    // job title nobody holds is a false claim about a real individual.
    ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
    ...(author.bio ? { description: author.bio } : {}),
    ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
    worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Editorial Team", item: absoluteUrl("/authors") },
      {
        "@type": "ListItem",
        position: 3,
        name: author.name,
        item: absoluteUrl(`/authors/${author.slug}`),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, breadcrumbJsonLd]) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/authors" className="hover:text-indigo-600">
              Editorial Team
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-slate-900">{author.name}</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">{author.name}</h1>
      {author.jobTitle && <p className="mt-2 text-lg text-slate-600">{author.jobTitle}</p>}
      {author.bio && <p className="mt-5 leading-relaxed text-slate-600">{author.bio}</p>}

      {author.sameAs && author.sameAs.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-4 text-sm">
          {author.sameAs.map((url) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="me noopener"
                className="font-medium text-indigo-600 hover:underline"
              >
                {new URL(url).hostname.replace(/^www\./, "")}
              </a>
            </li>
          ))}
        </ul>
      )}

      {typeof author.postCount === "number" && author.postCount > 0 && (
        <p className="mt-6 text-sm text-slate-500">
          {author.postCount} published {author.postCount === 1 ? "guide" : "guides"} on{" "}
          {SITE.name}.
        </p>
      )}

      <section className="mt-12" aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="text-2xl font-bold text-slate-900">
          Recent guides
        </h2>
        <ul className="mt-6 space-y-4">
          {posts.map((p) => (
            <li key={p._id}>
              <Link
                href={`/blog/${p.slug}`}
                className="font-medium text-slate-800 hover:text-indigo-600"
              >
                {p.title}
              </Link>
              {p.publishedAt && (
                <span className="ml-2 text-sm text-slate-500">
                  {new Date(p.publishedAt).toLocaleDateString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
