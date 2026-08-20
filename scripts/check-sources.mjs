#!/usr/bin/env node
/**
 * Link-rot check for lib/sources.ts.
 *
 * A dead .gov citation is worse than no citation — it tells readers and search
 * engines we don't verify what we publish. Run this monthly, and bump the
 * `verifiedAt` dates in lib/sources.ts after a clean pass.
 *
 *   node scripts/check-sources.mjs
 *
 * Exits non-zero if any source fails, so it can gate a deploy.
 */
import { readFileSync } from "node:fs";

const SRC = "lib/sources.ts";
const TIMEOUT_MS = 20000;

// Some government sites reject requests without a browser-like UA.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const file = readFileSync(SRC, "utf8");
const ids = [...file.matchAll(/^\s{4}id: "([^"]+)",/gm)].map((m) => m[1]);
const urls = [...file.matchAll(/^\s{4}url: "([^"]+)",/gm)].map((m) => m[1]);
// Sources whose host rejects automated requests — warn, never fail.
const botBlocked = new Set(
  [...file.matchAll(/^\s{4}id: "([^"]+)",\n\s{4}botBlocked: true,/gm)].map((m) => m[1])
);

// A redirect that lands on an error page is the dangerous case: the status is
// 200, so a naive checker reports the citation as healthy.
const SOFT_404 = /\/(errors?|404|page-not-found|not-found)(\b|\/|\.)/i;

if (ids.length !== urls.length) {
  console.error(`Parse mismatch: ${ids.length} ids vs ${urls.length} urls in ${SRC}`);
  process.exit(2);
}
if (ids.length === 0) {
  console.error(`No sources parsed out of ${SRC}`);
  process.exit(2);
}

async function probe(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    // HEAD first; a fair number of sites answer 403/405 to HEAD but 200 to GET.
    let r = await fetch(url, { method: "HEAD", redirect: "follow", signal: ctl.signal, headers: { "User-Agent": UA } });
    if (r.status === 405 || r.status === 403 || r.status === 501) {
      r = await fetch(url, { method: "GET", redirect: "follow", signal: ctl.signal, headers: { "User-Agent": UA } });
    }
    return { status: r.status, finalUrl: r.url };
  } catch (err) {
    return { status: 0, error: err.name === "AbortError" ? "timeout" : String(err.message || err) };
  } finally {
    clearTimeout(t);
  }
}

const results = await Promise.all(
  ids.map(async (id, i) => ({ id, url: urls[i], ...(await probe(urls[i])) }))
);

let failed = 0;
let warned = 0;

for (const r of results) {
  const reachable = r.status >= 200 && r.status < 400;
  const soft404 = reachable && r.finalUrl && SOFT_404.test(new URL(r.finalUrl).pathname);
  const blocked = botBlocked.has(r.id);

  let mark;
  if (soft404) {
    mark = "FAIL"; // 200 but redirected onto an error page
    failed++;
  } else if (reachable) {
    mark = "ok  ";
  } else if (blocked) {
    mark = "warn"; // host blocks bots; verify by hand
    warned++;
  } else {
    mark = "FAIL";
    failed++;
  }

  const redirected = r.finalUrl && r.finalUrl !== r.url ? `\n       -> ${r.finalUrl}` : "";
  const why = soft404 ? "  (redirects to an error page)" : r.error ? `  (${r.error})` : "";
  console.log(`${mark} ${String(r.status).padStart(3)}  ${r.id.padEnd(24)} ${r.url}${redirected}${why}`);
}

const ok = results.length - failed - warned;
console.log(`\n${ok}/${results.length} verified automatically.`);
if (warned) console.log(`${warned} blocked to bots — open them in a browser before bumping verifiedAt.`);
if (failed) console.log(`${failed} broken — fix lib/sources.ts before shipping.`);
process.exit(failed > 0 ? 1 : 0);
