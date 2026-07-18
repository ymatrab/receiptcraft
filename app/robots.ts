import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // Allow the brand-logo proxy that brand/example pages embed — longest
        // match wins, so /api/logo stays crawlable while the rest of /api/ and
        // the private routes stay out of the index.
        allow: ["/", "/api/logo"],
        // /login is deliberately crawlable: it's in the sitemap and indexable
        // for the branded "makecepeit login" query.
        disallow: ["/admin", "/account", "/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
