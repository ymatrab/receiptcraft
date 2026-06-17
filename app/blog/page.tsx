import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Receipt & Bookkeeping Guides — Blog",
  description:
    "Practical guides on receipts, expense tracking, bookkeeping and small-business records. Learn how to make, store and use receipts the right way.",
  alternates: { canonical: "/blog" },
};

// Rebuild the list hourly so scheduled posts appear without a redeploy.
export const revalidate = 3600;

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">The {SITE.name} Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Guides on receipts, expenses, bookkeeping and running a small business.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-16 text-center text-slate-500">
          New articles are on the way — check back soon.
        </p>
      ) : (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {post.mainImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlForImage(post.mainImage).width(600).height(338).url()}
                  alt={post.title}
                  className="aspect-video w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-5">
                {post.category && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    {post.category}
                  </span>
                )}
                <h2 className="mt-1 text-lg font-bold text-slate-900 group-hover:text-indigo-700">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
                )}
                {post.publishedAt && (
                  <time className="mt-4 text-xs text-slate-400">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
