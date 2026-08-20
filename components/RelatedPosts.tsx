import Link from "next/link";
import { relatedPostsForHub } from "@/lib/related-posts";

/** Renders nothing if this hub has no tracked spokes yet. Async because brand
 *  hubs resolve their spokes from the published post list rather than a
 *  hand-maintained map — see lib/related-posts.ts. */
export default async function RelatedPosts({
  hub,
  categories,
}: {
  hub: string;
  /** Blog categories to fall back on when the hub has no posts of its own. */
  categories?: readonly string[];
}) {
  const posts = await relatedPostsForHub(hub, categories);
  if (posts.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-reading-heading">
      <h2
        id="related-reading-heading"
        className="text-sm font-semibold uppercase tracking-wide text-slate-500"
      >
        Related reading
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
