/**
 * Publish blog posts to Sanity via the HTTP mutations API. Zero dependencies.
 *
 *   node scripts/publish-posts.mjs --dry   # print converted docs, no writes
 *   node scripts/publish-posts.mjs         # createOrReplace all posts
 *
 * Posts use stable ids (post.<slug>) so re-running updates in place.
 */
import { readFileSync } from "node:fs";
import { toPortableText, withKeys } from "./sanity-portable-text.mjs";
import { POSTS_A } from "./posts/day1-hubs-a.mjs";
import { POSTS_B } from "./posts/day1-hubs-b.mjs";

const PROJECT_ID = "3pvc71cl";
const DATASET = "production";
const API_VERSION = "2024-10-01";
const DRY = process.argv.includes("--dry");

let token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  try {
    const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    token = env.match(/^SANITY_API_WRITE_TOKEN=(.+)$/m)?.[1]?.trim();
  } catch {
    /* no .env.local */
  }
}
if (!token && !DRY) {
  console.error("Missing SANITY_API_WRITE_TOKEN in env or .env.local");
  process.exit(1);
}

const POSTS = [...POSTS_A, ...POSTS_B];

const docs = POSTS.map((p) => ({
  _id: `post-${p.slug}`,
  _type: "post",
  title: p.title,
  slug: { _type: "slug", current: p.slug },
  excerpt: p.excerpt,
  seoTitle: p.seoTitle,
  seoDescription: p.seoDescription,
  publishedAt: p.publishedAt,
  author: { _type: "reference", _ref: "author-sara-artheta" },
  category: { _type: "reference", _ref: `category-${p.category}` },
  faqs: withKeys(p.faqs),
  body: toPortableText(p.body),
}));

if (DRY) {
  for (const d of docs) {
    const words = d.body
      .map((b) => b.children.map((c) => c.text).join(""))
      .join(" ")
      .split(/\s+/).length;
    console.log(
      `${d._id}\n  title: ${d.title}\n  category: ${d.category._ref}  published: ${d.publishedAt}`
    );
    console.log(`  blocks: ${d.body.length}  words: ${words}  faqs: ${d.faqs.length}`);
    const styles = d.body.reduce((m, b) => ((m[b.listItem ?? b.style] = (m[b.listItem ?? b.style] ?? 0) + 1), m), {});
    console.log(`  block styles:`, styles);
    const links = d.body.flatMap((b) => b.markDefs.map((md) => md.href));
    console.log(`  links (${links.length}):`, links.join(" "));
    console.log();
  }
  process.exit(0);
}

const res = await fetch(
  `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations: docs.map((doc) => ({ createOrReplace: doc })) }),
  }
);
const body = await res.json();
if (!res.ok) {
  console.error("Publish failed:", JSON.stringify(body, null, 2));
  process.exit(1);
}
console.log(`✓ Published ${docs.length} posts:`);
for (const d of docs) console.log(`  - /blog/${d.slug.current} (${d.publishedAt})`);
