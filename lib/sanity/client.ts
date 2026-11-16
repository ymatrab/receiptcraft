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

/**
 * `src` + `srcSet` for an image shown on the page (not for og:image or JSON-LD,
 * which keep their plain `urlForImage` URLs for social and rich-result
 * crawlers).
 *
 * Blog images are 1376x768 RGBA PNGs, and the old single `?w=1600` URL shipped
 * 1–1.6 MB per image. `fm=webp` + `q=75` brings an 800px one from ~1.6 MB to
 * ~19 KB and keeps the alpha channel (JPEG would not). WebP is forced rather
 * than negotiated with `auto=format` because auto falls back to the original
 * PNG for any client that does not send `Accept: image/webp` — which is what
 * site auditors and some crawlers do, so they kept measuring ~500 KB PNGs.
 * Every browser the site supports decodes WebP.
 *
 * `height` is optional: pass the crop height at the largest width to fix a
 * ratio (the 16:9 hero and cards); leave it out to keep an inline image's own
 * aspect ratio.
 */
export function sanityImageProps(
  source: SanityImageSource,
  { widths, height }: { widths: number[]; height?: number },
): { src: string; srcSet: string } {
  const max = Math.max(...widths);
  const build = (w: number) => {
    let b = builder.image(source).width(w).format("webp").quality(75);
    // `height` is the crop height at the largest width; scale it with each
    // width so every candidate keeps the same ratio.
    if (height) b = b.height(Math.round((height * w) / max));
    return b.url();
  };
  return {
    src: build(max),
    srcSet: widths.map((w) => `${build(w)} ${w}w`).join(", "),
  };
}

/**
 * Intrinsic size of a Sanity image from its asset reference
 * (`image-<hash>-<w>x<h>-<ext>`), so `<img>` can reserve its box before it
 * loads. Undefined when the asset is not a plain reference.
 */
export function sanityImageDimensions(
  source: unknown,
): { width: number; height: number } | undefined {
  const ref = (source as { asset?: { _ref?: string } } | undefined)?.asset?._ref;
  const m = ref?.match(/-(\d+)x(\d+)-[a-z0-9]+$/);
  return m ? { width: Number(m[1]), height: Number(m[2]) } : undefined;
}
