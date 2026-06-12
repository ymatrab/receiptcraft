import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/create`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/templates`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const templatePages: MetadataRoute.Sitemap = TEMPLATES.map((t) => ({
    url: `${SITE.url}/templates/${t.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...templatePages];
}
