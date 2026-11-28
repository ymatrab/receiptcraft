// Makes the picture of each template's sample receipt, and its share preview.
//
//   bun scripts/template-images.ts            every template
//   bun scripts/template-images.ts rent-receipt hotel   just these
//
// Why pictures at all: on 2026-11-28 the template pages had no image of the
// receipt (the sample is drawn in HTML), while Pinterest pins and Etsy listings
// held most of page one for "rent / cash / donation receipt template". A page
// with no picture has nothing for Google Images to show.
//
// How: headless Chrome opens the LIVE template page and photographs the sample
// receipt at the top of it, so a picture can never show something the page
// does not. Re-run it for a template whenever that template's sample changes,
// after the change is live. Needs only bun and Google Chrome; installs nothing.
//
// Writes:
//   public/template-images/<slug>.webp   the receipt, 2x, for the page
//   public/og/templates/<slug>.jpg       1200x630 share preview
//   lib/template-images.ts               sizes, read by the page
import { spawn } from "bun";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";

const ROOT = new URL("..", import.meta.url).pathname;
const SITE = "https://www.makecepeit.com";
const all = [...readFileSync(`${ROOT}lib/templates.ts`, "utf8").matchAll(/^    slug: "([a-z0-9-]+)"/gm)].map((m) => m[1]);
const only = Bun.argv.slice(2);
const slugs = only.length ? all.filter((s) => only.includes(s)) : all;

mkdirSync(`${ROOT}public/template-images`, { recursive: true });
mkdirSync(`${ROOT}public/og/templates`, { recursive: true });
const profile = `${process.env.TMPDIR || "/tmp"}/template-images-profile`;
mkdirSync(profile, { recursive: true });
const port = 9351;
const chrome = spawn(
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "--headless=new", "--window-size=1366,900", `--remote-debugging-port=${port}`, "--no-first-run",
    `--user-data-dir=${profile}`,
    // www does not answer from every network; the apex IP serves the same site.
    "--host-resolver-rules=MAP www.makecepeit.com 216.198.79.1",
    "about:blank",
  ],
  { stdout: "ignore", stderr: "ignore" },
);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let ws: WebSocket | null = null;
for (let i = 0; i < 40 && !ws; i++) {
  await sleep(250);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    const page = list.find((t: { type: string }) => t.type === "page");
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch {}
}
if (!ws) throw new Error("Chrome did not start");
await new Promise((r) => (ws!.onopen = r));
let id = 0;
const pending = new Map<number, (v: any) => void>();
ws.onmessage = (e) => {
  const m = JSON.parse(String(e.data));
  if (m.id && pending.has(m.id)) { pending.get(m.id)!(m); pending.delete(m.id); }
};
const send = (method: string, params: any = {}) =>
  new Promise<any>((r) => { const i = ++id; pending.set(i, r); ws!.send(JSON.stringify({ id: i, method, params })); });
const js = async (expression: string) =>
  (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;

await send("Page.enable");
await send("Network.enable");
// Keep these visits out of the site's own analytics.
await send("Network.setBlockedURLs", { urls: ["*/api/events*", "*google-analytics.com*", "*googletagmanager.com*", "*clarity.ms*"] });

const logo = `data:image/png;base64,${readFileSync(`${ROOT}public/logo.png`).toString("base64")}`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const sizes: Record<string, { w: number; h: number }> = {};
const failed: string[] = [];

for (const slug of slugs) {
  await send("Emulation.setDeviceMetricsOverride", { width: 1366, height: 900, deviceScaleFactor: 2, mobile: false });
  await send("Page.navigate", { url: `${SITE}/templates/${slug}` });
  let rect: { x: number; y: number; w: number; h: number; title: string } | null = null;
  for (let i = 0; i < 40 && !rect; i++) {
    await sleep(400);
    rect = await js(`(()=>{const e=document.querySelector('main .receipt-shadow');const h=document.querySelector('main h1');if(!e||!h||document.readyState!=='complete')return null;const r=e.getBoundingClientRect();if(r.width<100||r.height<100)return null;return {x:r.left+scrollX,y:r.top+scrollY,w:r.width,h:r.height,title:h.textContent.trim()}})()`);
  }
  if (!rect) { failed.push(slug); console.log("FAILED", slug); continue; }
  // Fonts and the logo proxy settle after load; then clear anything floating
  // over the page (chat launcher, cookie banner, offer bar).
  await sleep(1200);
  await js(`document.fonts.ready.then(()=>{const paper=document.querySelector('main .receipt-shadow');document.querySelectorAll('body *').forEach(e=>{const p=getComputedStyle(e).position;if((p==='fixed'||p==='sticky')&&!e.contains(paper)&&!paper.contains(e))e.style.visibility='hidden'});return 1})`);
  rect = await js(`(()=>{const r=document.querySelector('main .receipt-shadow').getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,w:r.width,h:r.height,title:document.querySelector('main h1').textContent.trim()}})()`);
  const pad = 12;
  const clip = { x: Math.round(rect!.x - pad), y: Math.round(rect!.y - pad), width: Math.round(rect!.w + pad * 2), height: Math.round(rect!.h + pad * 2), scale: 1 };
  const shot = await send("Page.captureScreenshot", { format: "webp", quality: 92, captureBeyondViewport: true, clip });
  writeFileSync(`${ROOT}public/template-images/${slug}.webp`, Buffer.from(shot.result.data, "base64"));
  sizes[slug] = { w: clip.width, h: clip.height };
  const png = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip });

  // The share preview: the receipt on the left, the page's own H1 on the right.
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;background:#eef2ff;display:flex;align-items:center;overflow:hidden}
.l{width:470px;height:630px;display:flex;justify-content:center;${(rect!.h + 24) * (372 / (rect!.w + 24)) <= 558 ? "align-items:center" : "align-items:flex-start;padding-top:36px"}}.l img{width:372px;border-radius:8px}
.r{flex:1;padding:0 64px 0 20px}.k{font-size:22px;font-weight:600;color:#4f46e5;letter-spacing:.02em}
h1{font-size:${rect!.title.length > 30 ? 52 : rect!.title.length > 22 ? 60 : 68}px;line-height:1.06;font-weight:800;color:#0f172a;margin:14px 0 22px;letter-spacing:-.02em}
p{font-size:27px;line-height:1.4;color:#475569}.b{margin-top:38px;display:flex;align-items:center;gap:14px;font-size:26px;font-weight:700;color:#4f46e5}.b img{width:46px;height:46px;border-radius:11px}
</style></head><body><div class="l"><img src="data:image/png;base64,${png.result.data}"></div><div class="r"><div class="k">Free template</div><h1>${esc(rect!.title)}</h1><p>Edit the sample, then download it as a PDF or PNG.</p><div class="b"><img src="${logo}">makecepeit.com</div></div></body></html>`;
  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: "about:blank" });
  await sleep(150);
  const tree = await send("Page.getFrameTree");
  await send("Page.setDocumentContent", { frameId: tree.result.frameTree.frame.id, html });
  await sleep(500);
  const og = await send("Page.captureScreenshot", { format: "jpeg", quality: 86, clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
  writeFileSync(`${ROOT}public/og/templates/${slug}.jpg`, Buffer.from(og.result.data, "base64"));
  console.log("ok", slug, clip.width, "x", clip.height, rect!.title);
}
ws.close();
chrome.kill();

// Merge into the existing size table so a partial run keeps the rest.
const file = `${ROOT}lib/template-images.ts`;
const prev: Record<string, { w: number; h: number }> = existsSync(file)
  ? JSON.parse(readFileSync(file, "utf8").match(/= (\{[\s\S]*\});/)![1])
  : {};
const merged = { ...prev, ...sizes };
const body = Object.keys(merged).sort().map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(merged[k])}`).join(",\n");
writeFileSync(
  file,
  `// Written by scripts/template-images.ts. Do not edit by hand.\n// CSS-pixel size of each picture in public/template-images (the files are 2x).\nexport const TEMPLATE_IMAGES: Record<string, { w: number; h: number }> = {\n${body}\n};\n`,
);
console.log(`\n${Object.keys(sizes).length} made, ${failed.length} failed${failed.length ? ": " + failed.join(", ") : ""}`);
