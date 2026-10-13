import { createSign } from "node:crypto";

/**
 * Daily impressions and clicks from Google Search Console and Bing Webmaster
 * Tools — the top of the funnel, before anyone reaches the site.
 *
 * Server only: both read secrets. Each source is optional and reports why it is
 * missing instead of throwing, so the dashboard still renders with one or both
 * unconnected.
 *
 * Env:
 * - GSC_SERVICE_ACCOUNT_JSON — the whole service-account key file, pasted as
 *   one value. The account must be a user on the Search Console property.
 * - GSC_SITE_URL — defaults to the domain property, sc-domain:makecepeit.com.
 * - BING_WEBMASTER_API_KEY — from Bing Webmaster Tools → Settings → API access.
 * - BING_SITE_URL — the verified property. Defaults to the NON-www host,
 *   because that is the one verified in Bing; the www host is not.
 */

export interface DailySearch {
  /** YYYY-MM-DD, UTC */
  date: string;
  impressions: number;
  clicks: number;
}

export type SearchSource =
  | { ok: true; days: DailySearch[] }
  | { ok: false; reason: string };

const DAY = 864e5;
const isoDay = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const b64url = (input: string | Buffer) => Buffer.from(input).toString("base64url");

async function googleAccessToken(): Promise<string | null> {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  const key = JSON.parse(raw) as { client_email: string; private_key: string };
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  )}`;
  // Pasting a key into an env var often turns its newlines into literal "\n".
  const pem = key.private_key.replace(/\\n/g, "\n");
  const signature = createSign("RSA-SHA256").update(unsigned).sign(pem);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${b64url(signature)}`,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`token ${res.status}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

export async function getGoogleSearch(days: number): Promise<SearchSource> {
  try {
    const token = await googleAccessToken();
    if (!token) return { ok: false, reason: "Not connected — add GSC_SERVICE_ACCOUNT_JSON in Vercel" };
    const site = process.env.GSC_SITE_URL || "sc-domain:makecepeit.com";
    const res = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: isoDay(Date.now() - days * DAY),
          endDate: isoDay(Date.now()),
          dimensions: ["date"],
          rowLimit: 1000,
        }),
        cache: "no-store",
      }
    );
    if (!res.ok) return { ok: false, reason: `Search Console answered ${res.status}` };
    const json = (await res.json()) as { rows?: { keys: string[]; clicks: number; impressions: number }[] };
    return {
      ok: true,
      days: (json.rows ?? []).map((r) => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions })),
    };
  } catch (err) {
    return { ok: false, reason: `Search Console failed: ${(err as Error).message}` };
  }
}

export async function getBingSearch(days: number): Promise<SearchSource> {
  const key = process.env.BING_WEBMASTER_API_KEY;
  if (!key) return { ok: false, reason: "Not connected — add BING_WEBMASTER_API_KEY in Vercel" };
  const site = process.env.BING_SITE_URL || "https://makecepeit.com/";
  try {
    const res = await fetch(
      `https://ssl.bing.com/webmaster/api.svc/json/GetRankAndTrafficStats?apikey=${encodeURIComponent(key)}&siteUrl=${encodeURIComponent(site)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { ok: false, reason: `Bing answered ${res.status}` };
    const json = (await res.json()) as {
      d?: { Date: string; Clicks: number; Impressions: number }[];
      Message?: string;
    };
    if (!json.d) return { ok: false, reason: `Bing: ${json.Message ?? "no data"}` };
    const cutoff = Date.now() - days * DAY;
    return {
      ok: true,
      days: json.d
        // Dates arrive as "/Date(1791676800000)/".
        .map((r) => ({ ms: Number(/\d+/.exec(r.Date)?.[0] ?? 0), clicks: r.Clicks, impressions: r.Impressions }))
        .filter((r) => r.ms >= cutoff)
        .map((r) => ({ date: isoDay(r.ms), clicks: r.clicks, impressions: r.impressions })),
    };
  } catch (err) {
    return { ok: false, reason: `Bing failed: ${(err as Error).message}` };
  }
}
