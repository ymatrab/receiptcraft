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

// Wikimedia answers 403 to requests without a User-Agent (its robot policy,
// enforced since late 2026), and the edge runtime's fetch sends none. That
// silently broke every curated wordmark the edge cache did not already hold.
const USER_AGENT =
  "MakecepeitLogoProxy/1.0 (https://www.makecepeit.com; logo cache)";

const SHARED_HEADERS = {
  // Same-origin already avoids canvas tainting; ACAO keeps the asset usable
  // in html-to-image even when loaded via crossOrigin="anonymous" <img>.
  "Access-Control-Allow-Origin": "*",
  // These are third-party brand marks re-served through a proxy — useful
  // embedded on brand/example pages, but not something we want in Google's
  // image index. robots still allows /api/logo (so pages render), while this
  // header keeps the endpoint out of the index and clears the ?domain=…
  // variants out of GSC's "Crawled – currently not indexed" bucket.
  "X-Robots-Tag": "noindex",
};

async function fetchImage(url: string): Promise<Response | null> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
    const type = res.headers.get("Content-Type") ?? "";
    if (!res.ok || !type.startsWith("image/")) return null;
    return res;
  } catch {
    return null;
  }
}

/**
 * A neutral lettered badge, served when no upstream has a logo. A broken image
 * icon on a brand page reads as a broken product (and crawlers report it); a
 * plain initial does neither.
 */
function fallbackBadge(label: string): Response {
  const letter = (label.match(/[a-z0-9]/i)?.[0] ?? "?").toUpperCase();
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">` +
    `<rect width="128" height="128" rx="24" fill="#e5e7eb"/>` +
    `<text x="64" y="64" dy=".35em" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="64" font-weight="700" fill="#374151">${letter}</text>` +
    `</svg>`;
  return new Response(svg, {
    status: 200,
    headers: {
      ...SHARED_HEADERS,
      "Content-Type": "image/svg+xml",
      // Short: a Wikimedia 429 during a cold-cache crawl also lands here, and
      // the real wordmark should replace the badge within the hour.
      "Cache-Control": "public, max-age=600, s-maxage=3600",
    },
  });
}

/**
 * Same-origin brand logo proxy. Two modes:
 *   ?url=<wikimedia-url> — re-serves a curated Wikimedia wordmark.
 *   ?domain=walmart.com  — fetches the upstream favicon (Google s2, then
 *                          DuckDuckGo) for brands without a curated wordmark.
 * Both re-serve from our own domain so the browser can display them (no
 * third-party blocking) and html-to-image can embed them into exported PDF/PNG
 * receipts without cross-origin canvas tainting. When every upstream fails it
 * answers with a lettered badge instead of a 404, so no page shows a broken
 * image.
 */
export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const rawUrl = params.get("url");
  const domain = params.get("domain") ?? "";

  let upstreams: string[];
  let label: string;
  if (rawUrl) {
    if (!rawUrl.startsWith(WIKIMEDIA_PREFIX)) {
      return new Response("Invalid url", { status: 400 });
    }
    upstreams = [rawUrl];
    // ".../thumb/5/58/Uber_logo_2018.svg/330px-Uber_logo_2018.svg.png" → "Uber…"
    label = decodeURIComponent(rawUrl.split("/").pop() ?? "").replace(
      /^\d+px-/,
      ""
    );
  } else if (DOMAIN_RE.test(domain)) {
    const d = encodeURIComponent(domain);
    upstreams = [
      `https://www.google.com/s2/favicons?domain=${d}&sz=128`,
      `https://icons.duckduckgo.com/ip3/${d}.ico`,
    ];
    label = domain.replace(/^www\./i, "");
  } else {
    return new Response("Invalid request", { status: 400 });
  }

  for (const upstream of upstreams) {
    const res = await fetchImage(upstream);
    if (!res) continue;
    return new Response(res.body, {
      status: 200,
      headers: {
        ...SHARED_HEADERS,
        "Content-Type": res.headers.get("Content-Type") ?? "image/png",
        // Cache hard — brand logos rarely change.
        "Cache-Control": "public, max-age=86400, s-maxage=2592000, immutable",
      },
    });
  }

  return fallbackBadge(label);
}
