// Scrapes the receipt template preview images from receiptmaker.org and saves
// them to reference/receiptmaker-templates/ for design reference.
//
// Self-contained: it loads the templates page, finds the JS bundle, extracts
// the /images/newreceipts/*.{png,webp} paths it references, and downloads each.
//
// Run with: node scripts/scrape-receiptmaker.mjs

import { mkdir, writeFile } from "node:fs/promises";

const SITE = "https://receiptmaker.org";
const PAGE = `${SITE}/templates/`;
const OUT = new URL("../reference/receiptmaker-templates/", import.meta.url);
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

async function text(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // 1. page -> JS bundle
  const html = await text(PAGE);
  const bundle = html.match(/\/assets\/[^"']+\.js/)?.[0];
  if (!bundle) throw new Error("could not find JS bundle on templates page");
  console.error(`bundle: ${bundle}`);

  // 2. bundle -> image paths
  const js = await text(`${SITE}${bundle}`);
  const paths = [
    ...new Set(js.match(/\/images\/newreceipts\/\d+\.(?:png|webp|jpe?g)/gi) ?? []),
  ].sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));
  console.error(`found ${paths.length} template images`);
  if (paths.length === 0) throw new Error("no images found in bundle");

  // 3. download each
  let ok = 0;
  const failed = [];
  for (const path of paths) {
    const name = path.split("/").pop();
    try {
      const res = await fetch(`${SITE}${path}`, {
        headers: { "User-Agent": UA, Referer: PAGE },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(new URL(name, OUT), buf);
      ok++;
      process.stderr.write(".");
    } catch (e) {
      failed.push(`${name} (${e.message})`);
    }
  }

  console.error(`\nDownloaded ${ok}/${paths.length} to reference/receiptmaker-templates/`);
  if (failed.length) console.error("Failed:\n" + failed.map((f) => "  - " + f).join("\n"));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
