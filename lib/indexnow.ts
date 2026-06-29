import { SITE } from "./site";

/**
 * Public IndexNow key. Not a secret — it's also hosted at /<key>.txt so the
 * search engines can verify we own the host. IndexNow notifies Bing, Yandex,
 * Seznam and Naver (NOT Google — Google indexes via the sitemap/crawl).
 */
export const INDEXNOW_KEY = "01a54c886440475eb6df09e644afe429";

export interface IndexNowResult {
  submitted: number;
  ok: boolean;
  endpointStatus: number | null;
  error?: string;
}

/**
 * Push URLs to IndexNow. Accepts up to 10,000 URLs per request, so the whole
 * site goes in one call. Use for the initial launch push and after publishing
 * new pages — not on a loop with unchanged URLs (that's treated as spam).
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  if (urls.length === 0) {
    return { submitted: 0, ok: false, endpointStatus: null, error: "No URLs to submit" };
  }
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE.url).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE.url}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    return { submitted: urls.length, ok: res.ok, endpointStatus: res.status };
  } catch (e) {
    return { submitted: urls.length, ok: false, endpointStatus: null, error: String(e) };
  }
}
