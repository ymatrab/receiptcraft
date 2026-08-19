import Link from "next/link";
import { relatedPostsForHub } from "@/lib/related-posts";

/** Renders nothing if this hub has no tracked spokes yet. */
export default function RelatedPosts({ hub }: { hub: string }) {
  const posts = relatedPostsForHub(hub);
  if (posts.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-reading-heading">
      <h2
        id="related-reading-heading"
        className="text-sm font-semibold uppercase tracking-wide text-slate-400"
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
