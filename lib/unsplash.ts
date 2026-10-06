/**
 * Unsplash hero images for blog posts.
 *
 * Unsplash's API guidelines require hotlinking (images.unsplash.com, never
 * re-hosted in Sanity), crediting the photographer and Unsplash with the
 * referral links the API returns, and registering a download when a photo is
 * used. So a post stores the photo's imgix base URL and its attribution, and
 * the page sizes the image with imgix parameters at render time.
 */
export interface UnsplashImage {
  /** The photo's `raw` imgix URL from the Unsplash API. */
  raw: string;
  alt: string;
  photographer: string;
  /** Photographer profile, with the API's utm referral parameters. */
  photographerUrl: string;
  /** Unsplash home, with the API's utm referral parameters. */
  unsplashUrl: string;
}

/** A cropped rendition of the photo at the given size. */
export function unsplashSrc(img: UnsplashImage, width: number, height: number): string {
  const url = new URL(img.raw);
  url.searchParams.set("w", String(width));
  url.searchParams.set("h", String(height));
  url.searchParams.set("fit", "crop");
  url.searchParams.set("q", "80");
  url.searchParams.set("auto", "format");
  return url.toString();
}
