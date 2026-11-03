#!/usr/bin/env node
/**
 * What did people ask the AI generator for, and where did the catalog let them down?
 *
 *   node scripts/ai-prompt-report.mjs            # last 15 days
 *   node scripts/ai-prompt-report.mjs --days 7
 *   node scripts/ai-prompt-report.mjs --since 2026-10-27
 *
 * Reads the prompts that app/api/ai/generate stores on `ai_usage` (migration
 * 0008, 90-day retention) with the service-role key from .env.local, replays
 * every one through the brand matcher, and prints a Markdown report.
 *
 * The replay is the point. A prompt saved with no template means one of three
 * different things, and each has a different fix:
 *
 *   - the brand IS in the catalog but the matcher missed it ("Apple receipt",
 *     "7-11", lowercase "subway") — fix lib/ai-brand.ts;
 *   - the brand is NOT in the catalog ("Krispy Kreme") — add a brand;
 *   - the prompt names a template on screen it is not about ("Krispy Kreme"
 *     typed on the Shell page came back as Shell) — a routing bug.
 *
 * The matcher below is a port of lib/ai-brand.ts (names + ALIASES) as of 2026-11-03. The brand
 * list comes from origin/main, not the working tree, so a stale checkout does
 * not report brands as missing that production already has. If ai-brand.ts
 * changes, update the port — the report says which rows the live matcher and
 * this port disagree on, which is the first sign it has drifted.
 */
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const days = Number(arg("days") ?? 15);
const since = arg("since") ?? new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);

// --- credentials -----------------------------------------------------------
const env = Object.fromEntries(
  readFileSync(join(ROOT, ".env.local"), "utf8")
    .split("\n")
    .map((l) => l.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]])
);
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing from .env.local");

// --- catalog (from production's branch) --------------------------------------
execSync("git fetch -q origin main", { cwd: ROOT });
const brandsSrc = execSync("git show origin/main:lib/brands.ts", { cwd: ROOT, encoding: "utf8", maxBuffer: 64e6 });
const templatesSrc = execSync("git show origin/main:lib/templates.ts", { cwd: ROOT, encoding: "utf8", maxBuffer: 64e6 });

const brands = new Map();
// Hand-written brands: slug, name, shortName on consecutive lines.
for (const m of brandsSrc.matchAll(/slug:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*shortName:\s*"([^"]+)"/g))
  brands.set(m[1], [m[3], m[2].replace(/\s+Receipt$/i, "")]);
// Generated brands: one-line seeds.
for (const m of brandsSrc.matchAll(/\{ slug: "([^"]+)", name: "([^"]+)"/g)) if (!brands.has(m[1])) brands.set(m[1], [m[2]]);
const genericTemplates = [...templatesSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]).filter((s) => !brands.has(s));

// --- port of lib/ai-brand.ts detectBrand --------------------------------------
const norm = (s) =>
  ` ${s
    .toLowerCase()
    .replace(/['’®™.]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bmc (?=[a-z])/g, "mc")
    .trim()} `;
const GENERIC_TAIL =
  /\s(pizza|coffee|burgers?|grill|express|chicken|steakhouse|stores?|shops|pharmacy|airlines?|market|foods|cafe|bakery|kitchen|bagels|subs|tea leaf|drive in|sporting goods|auto parts|car rental|club)\s$/;
const COMMON_WORDS = new Set(["target", "subway", "budget", "enterprise", "max", "steam", "coach", "gap", "boots", "marathon",
  "notion", "slack", "zoom", "bolt", "staples", "checkers", "goat", "equinox", "sonic", "national", "giant"]);
const NOT_ALONE = new Set(["whole", "apple", "microsoft", "american", "united", "southwest", "blaze", "costa", "world",
  "advance", "alaska", "spirit", "frontier", "national"]);
const FULL = [...brands].flatMap(([slug, ds]) =>
  [...new Set(ds)].map((display) => ({ slug, name: norm(display), display })).filter((n) => n.name.trim().length >= 3)
);
const TAKEN = new Set(FULL.map((n) => n.name));
const SHORT = FULL.flatMap((n) => {
  const short = n.name.replace(GENERIC_TAIL, " ");
  const bare = short.trim();
  return short !== n.name && bare.length >= 5 && !COMMON_WORDS.has(bare) && !NOT_ALONE.has(bare) && !TAKEN.has(short)
    ? [{ ...n, name: short }]
    : [];
});
const NAMES = [...FULL, ...SHORT].sort((a, b) => b.name.length - a.name.length);
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const ALIASES = [
  { slug: "apple-store", raw: /(?<!Big )\bApple\b(?!\s+(?:Pay|Card|Cash|Music|TV|One|Arcade|Care|Bee)\b)/ },
  { slug: "apple-store", normed: / (?:airpods|iphone|ipad|macbook|imac|apple watch) / },
  { slug: "7-eleven", raw: /(?<![\d/.:,#-])7(?:-11|[- ]?eleven)(?![\d/.:,-])/i },
  { slug: "subway", normed: / subway (?:receipt|sandwich|sub|footlong|order|meal) / },
  { slug: "little-caesars", normed: / little c(?:ae|ea|e|a)s[ae]rs? / },
  { slug: "chick-fil-a", normed: / chick fil / },
];
const detectBrand = (prompt) =>
  NAMES.find(
    (n) => norm(prompt).includes(n.name) && (!COMMON_WORDS.has(n.name.trim()) || new RegExp(`\\b${escape(n.display)}\\b`).test(prompt))
  )?.slug ??
  ALIASES.find((a) => (a.raw ? a.raw.test(prompt) : a.normed.test(norm(prompt))))?.slug ??
  null;

// Brands the catalog has but people type differently ("Apple receipt" for
// Apple Store, "Little Cesar's"). Compares the brand's FIRST word — the
// distinctive one — against the prompt, exactly or one typo off. Words that
// open many brand names or ordinary sentences are skipped; they only add noise.
const FUZZY_SKIP = new Set(["home", "store", "card", "quest", "hardware", "pizza", "chicken", "market", "the", "best",
  "first", "great", "little", "big", "golden", "royal", "fresh", "life", "game", "care", "pacific", "american", "united"]);
const typo1 = (a, b) => {
  if (Math.abs(a.length - b.length) > 1 || a.length < 5) return a === b;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
};
const fuzzy = (prompt) => {
  const words = norm(prompt).trim().split(" ");
  return [...brands]
    .filter(([, ds]) => ds.some((d) => {
      const first = norm(d).trim().split(" ")[0];
      if (first.length < 4 || FUZZY_SKIP.has(first)) return false;
      return words.some((w) => typo1(w, first));
    }))
    .map(([s]) => s);
};

// --- data ------------------------------------------------------------------
const res = await fetch(
  `${url}/rest/v1/ai_usage?select=created_at,pro,prompt,template,business_name,user_id&prompt=not.is.null&created_at=gte.${since}&order=created_at.asc&limit=10000`,
  { headers: { apikey: key, Authorization: `Bearer ${key}` } }
);
if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
const rows = await res.json();

const clip = (s, n = 110) => (s ?? "").replace(/\s+/g, " ").slice(0, n);
const count = (xs) => [...xs.reduce((m, x) => m.set(x, (m.get(x) ?? 0) + 1), new Map())].sort((a, b) => b[1] - a[1]);

const users = new Set(rows.map((r) => r.user_id));
const matched = rows.filter((r) => r.template);
const unmatched = rows.filter((r) => !r.template);
const fixedSince = []; // the matcher has improved since this prompt was saved
const missedExisting = []; // catalog has it, today's matcher still misses it
const notInCatalog = []; // nothing in the catalog
for (const r of unmatched) {
  const now = detectBrand(r.prompt);
  if (now) { fixedSince.push({ ...r, guess: now }); continue; }
  const guess = fuzzy(r.prompt)[0] ?? null;
  (guess ? missedExisting : notInCatalog).push({ ...r, guess });
}
// Template on screen won over a brand the prompt names: the model was told to
// write the on-screen brand's name, so the business name came back as that brand.
// Rows listed here took their template from the screen, not the prompt — most
// are fine ("2 lattes" on the Starbucks page), so read them, don't count them.
const wrongBrand = matched.filter((r) => !detectBrand(r.prompt) && !fuzzy(r.prompt).includes(r.template));

const out = [];
out.push(`# AI prompt report — ${since} → ${new Date().toISOString().slice(0, 10)}`, "");
out.push(`- **${rows.length} prompts** from **${users.size} accounts** (${rows.filter((r) => r.pro).length} by Pro)`);
out.push(`- Built on a brand template: **${matched.length}** (${Math.round((100 * matched.length) / (rows.length || 1))}%) · no template: **${unmatched.length}**`);
out.push(`- Catalog: ${brands.size} brands, ${genericTemplates.length} generic templates`, "");

out.push("## Most requested templates", "");
for (const [t, n] of count(matched.map((r) => r.template)).slice(0, 20)) out.push(`- ${t} — ${n}`);

out.push("", "## Matcher misses — the catalog HAS a template, the prompt got none", "");
out.push("Fix in lib/ai-brand.ts (alias, casing, NOT_ALONE/COMMON_WORDS).", "");
for (const r of missedExisting) out.push(`- \`${r.guess}\`? ← "${clip(r.prompt)}" (AI wrote: ${r.business_name})`);
if (fixedSince.length) {
  out.push("", `Already matched by today's lib/ai-brand.ts (missed when saved): ${fixedSince.map((r) => `\`${r.guess}\``).join(", ")}`);
}

out.push("", "## Not in the catalog — candidates for a new brand or template", "");
out.push(`Check against the generic templates too: ${genericTemplates.join(", ")}`, "");
for (const r of notInCatalog) out.push(`- **${r.business_name ?? "?"}** ← "${clip(r.prompt)}"`);

out.push("", "## Template came from the screen, not the prompt", "");
out.push("Mostly fine. Look for prompts naming a different business (\"Krispy Kreme\" built as Shell).", "");
for (const r of wrongBrand) out.push(`- \`${r.template}\` ← "${clip(r.prompt)}" (AI wrote: ${r.business_name})`);

out.push("", "## All prompts", "");
for (const r of rows)
  out.push(`- ${r.created_at.slice(0, 10)} ${r.user_id.slice(0, 6)}${r.pro ? " (Pro)" : ""} · ${r.template ?? "—"} · ${r.business_name ?? ""} · "${clip(r.prompt, 200)}"`);

console.log(out.join("\n"));
