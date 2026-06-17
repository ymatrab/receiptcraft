import { groq } from "next-sanity";
import { sanityClient } from "./client";
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

export interface BlogPost extends BlogPostStub {
  body?: unknown;
  seoTitle?: string;
  seoDescription?: string;
  authorName?: string;
}

// Only published posts whose publish date has passed — lets Sanity schedule posts.
const PUBLISHED = `_type == "post" && !(_id in path("drafts.**")) && publishedAt <= now()`;

const LIST_QUERY = groq`*[${PUBLISHED}] | order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, publishedAt, mainImage,
  "category": category->title
}`;

const SLUGS_QUERY = groq`*[${PUBLISHED}].slug.current`;

const POST_QUERY = groq`*[${PUBLISHED} && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, publishedAt, mainImage, body,
  seoTitle, seoDescription, "category": category->title, "authorName": author->name
}`;

export async function getAllPosts(): Promise<BlogPostStub[]> {
  if (!sanityConfigured) return [];
  try {
    return await sanityClient.fetch(LIST_QUERY);
  } catch {
    return [];
  }
}

export async function getPostSlugs(): Promise<string[]> {
  if (!sanityConfigured) return [];
  try {
    return await sanityClient.fetch(SLUGS_QUERY);
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
