import { groq } from "next-sanity";
import { sanityClient } from "./client";
import { CONSOLIDATED_POSTS, withoutConsolidated } from "../consolidated-posts";
import { sanityConfigured } from "./config";

export interface BlogPostStub {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: import("@sanity/image-url/lib/types/types").SanityImageSource;
  category?: string;
}

export interface BlogPostFaq {
  question: string;
  answer: string;
}

export interface BlogPost extends BlogPostStub {
  body?: unknown;
  seoTitle?: string;
  seoDescription?: string;
  authorName?: string;
  authorSlug?: string;
  authorJobTitle?: string;
  faqs?: BlogPostFaq[];
  _updatedAt?: string;
}

// Only published posts whose publish date has passed — lets Sanity schedule posts.
const PUBLISHED = `_type == "post" && !(_id in path("drafts.**")) && publishedAt <= now()`;

const LIST_QUERY = groq`*[${PUBLISHED}] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, publishedAt, mainImage,
  "category": category->title
}`;

const SLUGS_QUERY = groq`*[${PUBLISHED}].slug.current`;

const POST_QUERY = groq`*[${PUBLISHED} && slug.current == $slug][0]{
  _id, _updatedAt, title, "slug": slug.current, excerpt, publishedAt, mainImage, body,
  seoTitle, seoDescription, faqs, "category": category->title,
  "authorName": author->name, "authorSlug": author->slug.current, "authorJobTitle": author->jobTitle
}`;

/**
 * Every live post, consolidated ones removed.
 *
 * Filtered here rather than at each call site because this one helper feeds the
 * blog index, the sitemap, llms-full.txt, the author pages and the related-post
 * picker. A post folded into another page must not keep appearing in listings
 * or get submitted for indexing — see lib/consolidated-posts.ts.
 */
export async function getAllPosts(): Promise<BlogPostStub[]> {
  if (!sanityConfigured) return [];
  try {
    return withoutConsolidated<BlogPostStub>(await sanityClient.fetch(LIST_QUERY));
  } catch {
    return [];
  }
}

export async function getPostSlugs(): Promise<string[]> {
  if (!sanityConfigured) return [];
  try {
    const slugs: string[] = await sanityClient.fetch(SLUGS_QUERY);
    // Consolidated posts are redirected, so pre-rendering them would build a
    // page nobody can reach.
    return slugs.filter((s) => !CONSOLIDATED_POSTS.has(s));
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!sanityConfigured) return null;
  try {
    return await sanityClient.fetch(POST_QUERY, { slug });
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Authors                                                                   */
/* -------------------------------------------------------------------------- */

export interface Author {
  name: string;
  slug: string;
  bio?: string;
  jobTitle?: string;
  sameAs?: string[];
  postCount?: number;
}

/**
 * Slug for an author page.
 *
 * The `slug` field was added to the schema after the existing author document
 * was created, so it is empty until someone opens the Studio. Deriving it from
 * the name means author pages work immediately rather than 404ing on a field
 * nobody has filled in yet, and a slug set later simply takes precedence.
 */
export function authorSlug(a: { slug?: string | null; name: string }): string {
  if (a.slug) return a.slug;
  return a.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const AUTHOR_FIELDS = `name, "slug": slug.current, bio, jobTitle, sameAs,
  "postCount": count(*[${PUBLISHED} && references(^._id)])`;

const AUTHORS_QUERY = groq`*[_type == "author"]{ ${AUTHOR_FIELDS} }`;

export async function getAuthors(): Promise<Author[]> {
  if (!sanityConfigured) return [];
  try {
    const rows: Author[] = await sanityClient.fetch(AUTHORS_QUERY);
    return rows.map((a) => ({ ...a, slug: authorSlug(a) }));
  } catch {
    return [];
  }
}

/** One author by slug, matching either the stored slug or the derived one. */
export async function getAuthor(slug: string): Promise<Author | null> {
  const all = await getAuthors();
  return all.find((a) => a.slug === slug) ?? null;
}
