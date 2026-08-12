import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getPost, getPostSlugs } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import { fitSeoDescription } from "@/lib/seo-description";
import { absoluteUrl, SITE } from "@/lib/site";

// Inline body images (![alt](…) authored in the seeder) preserve their natural
// aspect ratio — hero crops to 16:9, but in-content visuals can be any shape.
const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const img = value as { asset?: unknown; alt?: string } | undefined;
      if (!img?.asset) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlForImage(img as Parameters<typeof urlForImage>[0]).width(1600).url()}
          alt={img.alt ?? ""}
          className="my-8 w-full rounded-2xl"
        />
      );
    },
    // Comparison tables authored as pipe tables in the seeder. First row = header.
    table: ({ value }) => {
      const rows = (value as { rows?: { cells?: string[] }[] } | undefined)?.rows ?? [];
      if (rows.length === 0) return null;
      const [head, ...body] = rows;
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            {head?.cells && (
              <thead>
                <tr>
                  {head.cells.map((cell, i) => (
                    <th
                      key={i}
                      className="border border-slate-300 bg-slate-50 px-3 py-2 font-semibold text-slate-900"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri}>
                  {(row.cells ?? []).map((cell, ci) => (
                    <td
                      key={ci}
                      className="border border-slate-300 px-3 py-2 align-top text-slate-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  block: {
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-indigo-300 bg-slate-50 py-2 pl-4 pr-3 italic text-slate-700">
        {children}
      </blockquote>
    ),
  },
};

// Kept well below the sitemap's hourly revalidate so a scheduled post's page can
// never lag behind the sitemap advertising it. A not-yet-live slug is cached as
// notFound() for at most this long, so once publishedAt passes, the stale 404
// clears within minutes instead of up to an hour — and the /api/revalidate
// webhook purges it immediately when Sanity actually publishes.
export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  const description = fitSeoDescription(post.seoDescription ?? post.excerpt, { neutral: true });
  return {
    title: post.seoTitle ?? post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.mainImage
        ? [urlForImage(post.mainImage).width(1200).height(630).url()]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description,
      images: post.mainImage
        ? [urlForImage(post.mainImage).width(1200).height(630).url()]
        : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // dateModified must never precede datePublished. Bulk-authored posts carry an
  // _updatedAt from before their scheduled publish date, so only trust it when
  // it is genuinely later than publication.
  const dateModified =
    post._updatedAt &&
    post.publishedAt &&
    new Date(post._updatedAt).getTime() > new Date(post.publishedAt).getTime()
      ? post._updatedAt
      : post.publishedAt;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    dateModified,
    author: {
      "@type": post.authorName ? "Person" : "Organization",
      name: post.authorName ?? SITE.name,
      url: post.authorName ? absoluteUrl("/about") : SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logo-1024.png`,
        width: 1024,
        height: 1024,
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: post.mainImage
      ? [urlForImage(post.mainImage).width(1200).height(675).url()]
      : [absoluteUrl("/opengraph-image")],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };

  const faqs = post.faqs ?? [];
  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* Visible breadcrumb — matches breadcrumbJsonLd (Home / Blog / title). */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-indigo-600">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-slate-900">{post.title}</li>
        </ol>
      </nav>

      <article className="mt-6">
        {post.category && (
          <span className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            {post.category}
          </span>
        )}
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{post.title}</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          {post.authorName && <span>{post.authorName}</span>}
          {post.authorName && post.publishedAt && <span>·</span>}
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
          )}
          {/* Freshness signal: show "Updated" when revised at least a day after publishing. */}
          {post._updatedAt &&
            post.publishedAt &&
            new Date(post._updatedAt).getTime() - new Date(post.publishedAt).getTime() >
              24 * 60 * 60 * 1000 && (
              <>
                <span>·</span>
                <span>Updated {new Date(post._updatedAt).toLocaleDateString()}</span>
              </>
            )}
        </div>

        {post.mainImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlForImage(post.mainImage).width(1200).height(675).url()}
            alt={post.title}
            className="mt-8 aspect-video w-full rounded-2xl object-cover"
          />
        )}

        <div className="prose prose-slate mt-8 max-w-none prose-headings:font-bold prose-a:text-indigo-600">
          {post.body ? (
            <PortableText value={post.body as never} components={portableComponents} />
          ) : (
            <p className="text-slate-500">This article has no content yet.</p>
          )}
        </div>

        {faqs.length > 0 && (
          <section className="mt-12" aria-labelledby="post-faq-heading">
            <h2 id="post-faq-heading" className="text-2xl font-bold text-slate-900">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <dt className="font-semibold text-slate-900">{f.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </article>

      <div className="mt-16 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-10 text-center">
        <h2 className="text-2xl font-bold text-white">Need a receipt right now?</h2>
        <p className="mt-2 text-indigo-100">Create one free in under a minute.</p>
        <Link
          href="/create"
          className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700"
        >
          Open the receipt maker
        </Link>
      </div>
    </main>
  );
}
