/**
 * Publish blog posts to Sanity via the HTTP mutations API. Zero dependencies.
 *
 *   node scripts/publish-posts.mjs --dry            # print converted docs, no writes
 *   node scripts/publish-posts.mjs                  # createOrReplace all posts
 *   node scripts/publish-posts.mjs --file=spokes-a  # only files whose name starts with prefix
 *
 * Loads every .mjs in scripts/posts/ and flattens all exported arrays.
 * Posts use stable ids (post-<slug>) so re-running updates in place.
 */
import { readFileSync, readdirSync } from "node:fs";
import { toPortableText, withKeys } from "./sanity-portable-text.mjs";

const PROJECT_ID = "3pvc71cl";
const DATASET = "production";
const API_VERSION = "2024-10-01";
const DRY = process.argv.includes("--dry");
const FILE_PREFIX = process.argv.find((a) => a.startsWith("--file="))?.slice(7);

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

const postsDir = new URL("./posts/", import.meta.url);
const files = readdirSync(postsDir)
  .filter((f) => f.endsWith(".mjs"))
  .filter((f) => !FILE_PREFIX || f.startsWith(FILE_PREFIX))
  .sort();

const POSTS = [];
for (const f of files) {
  const mod = await import(new URL(f, postsDir));
  for (const value of Object.values(mod)) {
    if (Array.isArray(value)) POSTS.push(...value.map((p) => ({ ...p, _file: f })));
  }
}

const seen = new Map();
for (const p of POSTS) {
  if (seen.has(p.slug)) {
    console.error(`Duplicate slug "${p.slug}" in ${p._file} and ${seen.get(p.slug)}`);
    process.exit(1);
  }
  seen.set(p.slug, p._file);
  for (const field of ["title", "seoTitle", "seoDescription", "excerpt", "publishedAt", "category", "body", "faqs"]) {
    if (!p[field]) {
      console.error(`Post "${p.slug}" (${p._file}) missing field: ${field}`);
      process.exit(1);
    }
  }
}

// Upload local images to Sanity's asset store, once per unique file. Sanity dedupes
// by content hash, so re-running returns the same asset id. Skipped in --dry.
// Each post can reference two: the hero (`image`) and inline body images written as
// ![alt](assets/…) in the markdown-lite body.
const MIME = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp" };
const BODY_IMG_RE = /!\[[^\]]*\]\((assets\/[^)]+)\)/g;
const imagePaths = (p) => [p.image, ...[...(p.body?.matchAll(BODY_IMG_RE) ?? [])].map((m) => m[1])].filter(Boolean);
const assetIds = new Map();
if (!DRY) {
  for (const p of POSTS) {
    for (const path of imagePaths(p)) {
      if (assetIds.has(path)) continue;
      const filename = path.split("/").pop();
      const ext = filename.split(".").pop().toLowerCase();
      const bytes = readFileSync(new URL(`./posts/${path}`, import.meta.url));
      const res = await fetch(
        `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/assets/images/${DATASET}?filename=${encodeURIComponent(filename)}`,
        { method: "POST", headers: { "Content-Type": MIME[ext] ?? "application/octet-stream", Authorization: `Bearer ${token}` }, body: bytes }
      );
      const body = await res.json();
      if (!res.ok) {
        console.error(`Image upload failed for ${path}:`, JSON.stringify(body, null, 2));
        process.exit(1);
      }
      assetIds.set(path, body.document._id);
      console.log(`✓ Uploaded image ${path} -> ${body.document._id}`);
    }
  }
}

const docs = POSTS.map((p) => {
  const doc = {
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
    body: toPortableText(p.body, (path) => assetIds.get(path)),
  };
  const assetId = assetIds.get(p.image);
  if (assetId) doc.mainImage = { _type: "image", asset: { _type: "reference", _ref: assetId } };
  return doc;
});

if (DRY) {
  let total = 0;
  for (const d of docs) {
    const textBlocks = d.body.filter((b) => b._type === "block");
    const images = d.body.filter((b) => b._type === "image");
    const words = textBlocks
      .map((b) => b.children.map((c) => c.text).join(""))
      .join(" ")
      .split(/\s+/).length;
    total += words;
    console.log(
      `${d._id}\n  title: ${d.title}\n  category: ${d.category._ref}  published: ${d.publishedAt}`
    );
    console.log(`  blocks: ${d.body.length}  words: ${words}  faqs: ${d.faqs.length}`);
    if (d.mainImage || images.length) {
      console.log(`  images: hero=${d.mainImage ? "yes" : "no"} inline=${images.length}${images.length ? " (" + images.map((b) => b._localPath ?? b.asset?._ref).join(", ") + ")" : ""}`);
    }
    const links = textBlocks.flatMap((b) => b.markDefs.map((md) => md.href));
    console.log(`  links (${links.length}):`, links.join(" "));
    console.log();
  }
  console.log(`Total: ${docs.length} posts, ${total} body words, from ${files.length} files.`);
  process.exit(0);
}

// Sanity mutation payloads should stay well under the request size limit — chunk by 20.
const CHUNK = 20;
for (let i = 0; i < docs.length; i += CHUNK) {
  const chunk = docs.slice(i, i + CHUNK);
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ mutations: chunk.map((doc) => ({ createOrReplace: doc })) }),
    }
  );
  const body = await res.json();
  if (!res.ok) {
    console.error(`Publish failed on chunk ${i / CHUNK + 1}:`, JSON.stringify(body, null, 2));
    process.exit(1);
  }
  console.log(`✓ Published ${chunk.length} posts (chunk ${i / CHUNK + 1}/${Math.ceil(docs.length / CHUNK)})`);
}
console.log(`✓ Done. ${docs.length} posts total:`);
for (const d of docs) console.log(`  - /blog/${d.slug.current} (${d.publishedAt})`);
