import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getPost, getPostSlugs } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import { absoluteUrl, SITE } from "@/lib/site";

export const revalidate = 3600;

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
  const description = post.seoDescription ?? post.excerpt;
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
      <Link href="/blog" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
        ← All articles
      </Link>

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
            <PortableText value={post.body as never} />
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
