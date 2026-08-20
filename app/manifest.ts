import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SITE_DESCRIPTION } from "@/lib/counts";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
