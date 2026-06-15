export const runtime = "edge";

// Only allow plain domains (incl. subdomains) like "walmart.com" or
// "store.steampowered.com" — never arbitrary URLs.
const DOMAIN_RE = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i;

/**
 * Same-origin brand logo proxy. Fetches the upstream favicon server-side and
 * re-serves it from our own domain so that:
 *   1. the browser can display it (no third-party blocking), and
 *   2. html-to-image can embed it into exported PNG/PDF receipts without
 *      tainting the canvas (cross-origin logos can't be read back otherwise).
 */
export async function GET(request: Request): Promise<Response> {
  const domain = new URL(request.url).searchParams.get("domain") ?? "";
  if (!DOMAIN_RE.test(domain)) {
    return new Response("Invalid domain", { status: 400 });
  }

  const upstream = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
    domain
  )}&sz=128`;

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
    },
  });
}
