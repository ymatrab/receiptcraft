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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": post.authorName ? "Person" : "Organization", name: post.authorName ?? SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: post.mainImage ? urlForImage(post.mainImage).width(1200).url() : undefined,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
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
