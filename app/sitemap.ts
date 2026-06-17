import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";
import { BRAND_TEMPLATES } from "@/lib/brands";
import { getAllPosts } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/create`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/templates`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/blog`, lastModified, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const posts = await getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const templatePages: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${SITE.url}/templates/${t.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const brandPages: MetadataRoute.Sitemap = BRAND_TEMPLATES.map((t) => ({
    url: `${SITE.url}/brands/${t.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  brandPages.push({
    url: `${SITE.url}/brands`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  });

  return [...staticPages, ...templatePages, ...brandPages, ...blogPages];
}
