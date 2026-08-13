export const runtime = "edge";

// Only allow plain domains (incl. subdomains) like "walmart.com" or
// "store.steampowered.com" — never arbitrary URLs.
const DOMAIN_RE = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i;

// Curated brand wordmarks live on Wikimedia. We re-serve them from our own
// origin instead of hotlinking so they load reliably (no third-party outage or
// hotlink-block takes out the brand pages), stay edge-cached, and — being
// same-origin — embed into html-to-image exports without tainting the canvas.
// The allowlist keeps this from becoming an open proxy (SSRF).
const WIKIMEDIA_PREFIX = "https://upload.wikimedia.org/";

/**
 * Same-origin brand logo proxy. Two modes:
 *   ?url=<wikimedia-url> — re-serves a curated Wikimedia wordmark.
 *   ?domain=walmart.com  — fetches the upstream favicon (Google s2) for brands
 *                          without a curated wordmark.
 * Both re-serve from our own domain so the browser can display them (no
 * third-party blocking) and html-to-image can embed them into exported PDF/PNG
 * receipts without cross-origin canvas tainting.
 */
export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const rawUrl = params.get("url");
  const domain = params.get("domain") ?? "";

  let upstream: string;
  if (rawUrl) {
    if (!rawUrl.startsWith(WIKIMEDIA_PREFIX)) {
      return new Response("Invalid url", { status: 400 });
    }
    upstream = rawUrl;
  } else if (DOMAIN_RE.test(domain)) {
    upstream = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
      domain
    )}&sz=128`;
  } else {
    return new Response("Invalid request", { status: 400 });
  }

  const res = await fetch(upstream);
  if (!res.ok) {
    return new Response("Logo not found", { status: 404 });
  }

  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "image/png",
      // Cache hard — brand logos rarely change.
      "Cache-Control": "public, max-age=86400, s-maxage=2592000, immutable",
      // Same-origin already avoids canvas tainting; ACAO keeps the asset usable
      // in html-to-image even when loaded via crossOrigin="anonymous" <img>.
      "Access-Control-Allow-Origin": "*",
      // These are third-party brand marks re-served through a proxy — useful
      // embedded on brand/example pages, but not something we want in Google's
      // image index. robots still allows /api/logo (so pages render), while this
      // header keeps the endpoint out of the index and clears the ?domain=…
      // variants out of GSC's "Crawled – currently not indexed" bucket.
      "X-Robots-Tag": "noindex",
    },
  });
}
