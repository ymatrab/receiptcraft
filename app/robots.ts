import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep private + non-content routes out of the index.
        disallow: ["/admin", "/account", "/login", "/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
