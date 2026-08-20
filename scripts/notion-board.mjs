#!/usr/bin/env node
/**
 * Notion task board sync — talks to the Notion API directly.
 *
 * Why not Zapier: every Notion read and write through Zapier spends a task
 * credit, and the account runs dry mid-job. The Notion API itself is free and
 * rate-limited at roughly 3 requests/second, which is far more than this needs.
 *
 * Setup (one time, done by the account owner):
 *   1. https://www.notion.so/profile/integrations → New integration ("internal")
 *   2. Copy the Internal Integration Secret (starts `ntn_`)
 *   3. Save it as local/notion-token.json:  { "token": "ntn_..." }
 *      local/ is gitignored, same as the GSC service-account key.
 *   4. In Notion, open the makecepeit page → ••• → Connections → add the
 *      integration. Without this step the API cannot see the board.
 *
 * Usage:
 *   node scripts/notion-board.mjs            # dry run — prints the plan
 *   node scripts/notion-board.mjs --apply    # performs it
 */
import { readFileSync } from "node:fs";

const DB = "3c10a70b-4d02-81df-8eae-d3d4eed63f2a";
const APPLY = process.argv.includes("--apply");

function loadToken() {
  if (process.env.NOTION_TOKEN) return process.env.NOTION_TOKEN;
  try {
    const t = JSON.parse(readFileSync("local/notion-token.json", "utf8")).token;
    if (t) return t;
    throw new Error("no `token` key");
  } catch (err) {
    console.error(
      [
        "No Notion token found.",
        "",
        "Create an internal integration at https://www.notion.so/profile/integrations,",
        "then save its secret as local/notion-token.json:",
        '  { "token": "ntn_..." }',
        "",
        "Then open the makecepeit page in Notion → ••• → Connections → add the",
        "integration, or the API will not be able to see the board.",
        "",
        `(${err.message})`,
      ].join("\n")
    );
    process.exit(1);
  }
}
const token = loadToken();

async function notion(path, method = "GET", body) {
  const r = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status}: ${j.message || JSON.stringify(j)}`);
  return j;
}

const para = (text) => ({
  object: "block",
  type: "paragraph",
  paragraph: { rich_text: [{ text: { content: text } }] },
});

/** old exact title → the owner-level task it becomes. Anything not listed here
 *  is absorbed into one of these and gets archived. */
const REWRITE = {
  "Capture GSC baseline before anything ships": {
    title: "Measure where we stand before any changes",
    status: "Done",
    files: "seo-audit/geo-citations-baseline-2026-08-19.json",
    body: ["Pull the search-performance baseline so the effect of this work can actually be read in September rather than guessed at. Captured before anything shipped: 35,172 impressions sitewide, half of them on the lost-receipt guides."],
  },
  "Build lib/sources.ts — central source registry": {
    title: "Make the receipt guide cite official rules",
    status: "Done",
    files: "lib/sources.ts, components/Sources.tsx, scripts/check-sources.mjs, app/guides/receipt-anatomy/page.tsx, app/llms-full.txt/route.ts",
    body: [
      "The field-by-field receipt guide now backs its definitions with the actual regulations — IRS expense rules, the US card-truncation law, EMVCo chip specs, EU and UK VAT invoice requirements — so readers and AI answer engines can see where each claim comes from.",
      "15 authorities are held in one registry with the claim each supports and the date it was last checked, and a script re-checks every link. Live on the guide, the structured data, and both llms.txt files.",
    ],
  },
  "Verify official receipt + policy URLs for the top 30 brands": {
    title: "Point 57 lost-receipt guides at the brand's own help page",
    status: "Done",
    files: "lib/intent-pages.ts, app/receipt-help/[slug]/page.tsx",
    body: [
      "Our 19 biggest brands' guides now link the retailer's official receipt and returns pages and quote what those pages actually say — Macy's two-year receipt lookup, CVS's 60-day cap, AutoZone's phone lookup, Apple's advice to search your email.",
      "These pages carry half the site's search impressions and previously linked out to nothing at all. Brands were picked from real search data, not assumption: Zara, Chipotle and Sephora lead, while Walmart and Amazon barely register.",
    ],
  },
  "Add pricingUrl + per-competitor verifiedAt": {
    title: "Fix and source the competitor pricing we publish",
    status: "Done",
    files: "lib/comparisons.ts, app/alternatives/page.tsx, app/compare/[slug]/page.tsx",
    body: [
      "Two competitors had changed their pricing since the last review and our pages still stated the old position — one FAQ answer told readers a rival had no paid plans when it had three.",
      "Every price now links the page it came from and shows the date it was checked, and the methodology section says what we verify and what we could not confirm.",
    ],
  },
  "Run /api/indexnow after every batch ships": {
    title: "Tell Bing about the 240 updated pages",
    status: "To do",
    priority: "P0",
    files: "https://www.makecepeit.com/api/indexnow",
    body: ["New and changed pages stay invisible to Bing, and therefore to Microsoft Copilot, until the IndexNow endpoint is triggered. It is admin-only, so it has to be done from a signed-in browser — visiting the URL is the whole job."],
  },
  "Get a US-verified support URL for Domino's": {
    title: "Get Domino's official support link",
    status: "Blocked",
    files: "lib/intent-pages.ts",
    body: ["Domino's is our third-biggest lost-receipt brand but its support URLs redirect by country, so the US version could not be confirmed from here. One check from a US browser and it joins the other 19."],
  },
  "Research state rent-receipt statutes": {
    title: "Cite the tax rules on rent, donation and restaurant receipts",
    status: "Backlog",
    files: "lib/templates.ts",
    body: ["Rent receipts, charity donation receipts and restaurant tips all have published rules behind them — state landlord statutes, the IRS charitable-substantiation rules, and the service-charge-versus-tip ruling. Citing those makes these the most complete answer for the question, which is what gets quoted by AI search."],
  },
  "Add sources field to ReceiptTemplate type + render": {
    title: "Add sources to the rest of the receipt templates",
    status: "Backlog",
    files: "lib/types.ts, lib/templates.ts, app/templates/[slug]/page.tsx",
    body: ["Extend the same treatment to the remaining templates — selectively, only where a genuine authority exists. Forcing a citation onto a template with nothing real to cite produces exactly the filler the July audit warned about."],
  },
  "Add sources field to Sanity post schema + blog render": {
    title: "Add sources to the 140 blog articles",
    status: "Backlog",
    files: "studio/schemaTypes/post.ts, app/blog/[slug]/page.tsx",
    body: ["The largest batch and the least suitable for automation, since each article needs a source that genuinely fits it. Do it in runs of 10-20 and update the content ledger as they land."],
  },
  "Extend receipt-help citations to the remaining brands": {
    title: "Cover the remaining 60 brands in the lost-receipt guides",
    status: "Backlog",
    files: "lib/intent-pages.ts",
    body: ["Takes brand coverage from 19 to all 79, once the first batch has been live long enough to show the approach works. Expect the same split as before: about half the retailers block automated checks and need confirming through search instead."],
  },
  "Add a not-legal-advice line to /editorial-policy": {
    title: "Say plainly that we're not giving legal advice",
    status: "Backlog",
    files: "app/editorial-policy/page.tsx",
    body: ["We now cite tax and legal rules across the site. The editorial policy should state that citing a regulation is not legal advice, and describe how often sources are re-verified."],
  },
  "Monthly source link-rot run": {
    title: "Re-check every source link each month",
    status: "Backlog",
    files: "scripts/check-sources.mjs",
    body: ["A dead government link is worse than no citation — it signals we do not check what we publish. One command; bump the verification dates after a clean run."],
  },
  "Read results mid-September, not before": {
    title: "Review the results in mid-September",
    status: "Backlog",
    files: "GSC + the committed baseline",
    body: ["This kind of change takes 4-8 weeks to show. Judging it earlier produces a false negative and tempts undoing work that was fine."],
  },
};

const NEW_TASKS = [
  {
    title: "Re-check competitor pricing each quarter",
    status: "Backlog",
    phase: "Ops",
    priority: "P1",
    area: "Research",
    effort: "S",
    files: "lib/comparisons.ts",
    body: [
      "Two of three competitors moved between the July and August reviews, and both errors were live on the site for weeks — one of them a FAQ answer stating the opposite of the truth.",
      "Watch for prices rendered only in the browser (a plain fetch comes back empty), and pricing paths that quietly redirect to a homepage.",
    ],
  },
];

const rows = [];
let cursor;
do {
  const page = await notion(`/databases/${DB}/query`, "POST", { page_size: 100, start_cursor: cursor });
  rows.push(...page.results);
  cursor = page.has_more ? page.next_cursor : undefined;
} while (cursor);

const titleOf = (p) => (p.properties?.Task?.title?.[0]?.plain_text || "").trim();

const renames = [], archives = [];
for (const p of rows) {
  const t = titleOf(p);
  if (REWRITE[t]) renames.push([p, REWRITE[t]]);
  else archives.push([p, t]);
}

console.log(`board has ${rows.length} tasks`);
console.log(`\nRENAME (${renames.length}):`);
for (const [p, r] of renames) console.log(`  "${titleOf(p)}"\n    -> "${r.title}"  [${r.status}]`);
console.log(`\nARCHIVE (${archives.length}) — absorbed into the tasks above:`);
for (const [, t] of archives) console.log(`  ${t}`);
console.log(`\nCREATE (${NEW_TASKS.length}):`);
for (const n of NEW_TASKS) console.log(`  ${n.title}  [${n.status}]`);

if (!APPLY) {
  console.log("\nDry run. Re-run with --apply to perform it.");
  process.exit(0);
}

const sel = (name) => (name ? { select: { name } } : undefined);

for (const [p, r] of renames) {
  const props = {
    Task: { title: [{ text: { content: r.title } }] },
    Status: sel(r.status),
  };
  if (r.priority) props.Priority = sel(r.priority);
  if (r.files) props.Files = { rich_text: [{ text: { content: r.files } }] };
  await notion(`/pages/${p.id}`, "PATCH", { properties: props });

  // replace the body with the owner-level description
  const kids = await notion(`/blocks/${p.id}/children?page_size=100`);
  for (const k of kids.results) await notion(`/blocks/${k.id}`, "DELETE");
  await notion(`/blocks/${p.id}/children`, "PATCH", { children: r.body.map(para) });
  console.log(`renamed: ${r.title}`);
}

for (const [p, t] of archives) {
  await notion(`/pages/${p.id}`, "PATCH", { in_trash: true });
  console.log(`archived: ${t}`);
}

for (const n of NEW_TASKS) {
  await notion("/pages", "POST", {
    parent: { database_id: DB },
    properties: {
      Task: { title: [{ text: { content: n.title } }] },
      Status: sel(n.status),
      Phase: sel(n.phase),
      Priority: sel(n.priority),
      Area: sel(n.area),
      Effort: sel(n.effort),
      Files: { rich_text: [{ text: { content: n.files } }] },
    },
    children: n.body.map(para),
  });
  console.log(`created: ${n.title}`);
}

console.log("\ndone.");
