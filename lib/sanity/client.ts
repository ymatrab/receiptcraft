import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityConfig } from "./config";

export const sanityClient = createClient({
  projectId: sanityConfig.projectId || "placeholder",
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  // Served from the CDN; published content is revalidated via ISR on the pages.
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
