#!/usr/bin/env node
/**
 * Stale-claim check: does anything on the site still quote a price or a limit
 * we no longer offer?
 *
 *   node scripts/check-claims.mjs
 *
 * Exits non-zero when it finds one, so it can gate a deploy.
 *
 * Why this is worth a script. Prices and free-tier limits are quoted in prose
 * all over the site — pricing cards, FAQ answers, the comparison tables, the
 * llms.txt routes, JSON-LD offers — and prose is not type-checked. Every change
 * to date has left some of it behind:
 *
 *   - the AI allowance went from 3 a day to 3 a month, and /alternatives went
 *     on advertising "3/day free" for weeks, overstating our own free tier by
 *     about thirty times on the page whose only value is being accurate;
 *   - the yearly price went from $39 to $49 with $39 still on the page;
 *   - the download allowance went from 3 to 1, leaving "1 watermark-free
 *     downloads" rendered live.
 *
 * None of those broke a build. All three were visible to customers.
 *
 * The rule this enforces: a number that describes OUR plans belongs in
 * lib/plans.ts and reaches the page through a helper. A literal is only allowed
 * where it is genuinely not ours — a competitor's price, or a comment
 * describing what a number used to be.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["app", "lib", "components"];
const EXTS = new Set([".ts", ".tsx"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);

/**
 * Files exempt, with the reason.
 *
 * lib/comparisons.ts states competitors' real prices, which are theirs to set
 * and must be quoted exactly; its own Makecepeit row is derived from plans.ts
 * and is checked like anything else, so the exemption is scoped to the file
 * rather than to the rule.
 */
const EXEMPT = new Map([
  ["lib/comparisons.ts", "competitor prices are quoted verbatim by design"],
  ["lib/plans.ts", "the source of truth itself"],
]);

/**
 * What must never appear in rendered copy, and why.
 *
 * Every pattern is a claim that was true once. Add to this list when a price or
 * a limit changes — the old value going on the list is what stops it coming
 * back.
 */
const STALE = [
  { re: /\$39\b/, why: "yearly is $49 — $39 is the old price" },
  { re: /3\s*\/\s*day/i, why: "the AI allowance is monthly, not daily" },
  { re: /3 (?:AI )?(?:generations?|receipts?) a day/i, why: "the AI allowance is monthly" },
  { re: /3 free (?:HD )?downloads?/i, why: "the free allowance is 1 download" },
  { re: /3 watermark-free/i, why: "the free allowance is 1 download" },
  // The plural bug that shipped: a singular count with a plural noun.
  { re: /\b1 watermark-free downloads\b/, why: "singular count, plural noun" },
  { re: /\b1 free downloads\b/, why: "singular count, plural noun" },
  { re: /your first 1 /i, why: 'reads as "your first 1 download" — use firstDownloadsPhrase()' },
];

/** A line that is only describing history is allowed to name the old number. */
function isComment(line) {
  const t = line.trim();
  return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*");
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (EXTS.has(extname(entry))) out.push(path);
  }
  return out;
}

const files = ROOTS.flatMap((r) => walk(r));
const hits = [];

for (const file of files) {
  if (EXEMPT.has(file)) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (isComment(line)) return;
    for (const { re, why } of STALE) {
      if (re.test(line)) hits.push({ file, line: i + 1, text: line.trim().slice(0, 120), why });
    }
  });
}

for (const h of hits) {
  console.log(`FAIL ${h.file}:${h.line}\n     ${h.text}\n     -> ${h.why}\n`);
}

console.log(`${files.length} files checked, ${hits.length} stale claim${hits.length === 1 ? "" : "s"} found.`);
if (EXEMPT.size) {
  console.log(`Exempt: ${[...EXEMPT].map(([f, why]) => `${f} (${why})`).join(", ")}`);
}
process.exit(hits.length > 0 ? 1 : 0);
