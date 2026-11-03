import { BRAND_TEMPLATES } from "./brands";
import { getTemplate } from "./templates";
import type { ReceiptTemplate } from "./types";

/**
 * Which brand an AI prompt is about, so the generator can build on that brand's
 * template instead of a blank roll.
 *
 * Server-only on purpose: it walks every brand template, and the result travels
 * back with the receipt. "Walmart groceries $40" and "a receipt from mcdonalds"
 * both name a brand we already have a template for — and until now both came
 * back as an unbranded receipt, which is the version nobody needs to pay for.
 */

/**
 * "McDonald's" → "mcdonalds", "7-Eleven" → "7 eleven": apostrophes vanish,
 * other punctuation becomes a space, and a split "Mc Donald's" closes up, as
 * people type it (seen in the saved prompts, 2026-10-28).
 */
const norm = (s: string) =>
  ` ${s
    .toLowerCase()
    .replace(/['’®™.]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bmc (?=[a-z])/g, "mc")
    .trim()} `;

/**
 * Category words people leave off a brand's name: "dominos" for Domino's
 * Pizza, "panda" for Panda Express, "papa johns" for Papa John's Pizza. A
 * brand also answers to its name without one of these, when what is left is
 * still distinctive (5+ letters, not an everyday word, not another brand).
 */
const GENERIC_TAIL =
  /\s(pizza|coffee|burgers?|grill|express|chicken|steakhouse|stores?|shops|pharmacy|airlines?|market|foods|cafe|bakery|kitchen|bagels|subs|tea leaf|drive in|sporting goods|auto parts|car rental|club)\s$/;

/**
 * Brand names that are also ordinary words. "subway ticket", "a budget hotel"
 * and "zoom lens" are not about the brand, so these match only when the prompt
 * capitalises them the way the brand does. From a brand page the builder sends
 * the template itself, so this only narrows the guess from free text.
 */
const COMMON_WORDS = new Set(
  ["target", "subway", "budget", "enterprise", "max", "steam", "coach", "gap", "boots", "marathon", "notion",
    "slack", "zoom", "bolt", "staples", "checkers", "goat", "equinox", "sonic", "national", "giant"]
);

/** Longest names first, so "Uber Eats" wins over "Uber" and "Sam's Club" over nothing shorter. */
const FULL_NAMES: { slug: string; name: string; display: string }[] = BRAND_TEMPLATES.flatMap((t) =>
  [...new Set([t.shortName, t.name.replace(/\s+Receipt$/i, "")])]
    .map((display) => ({ slug: t.slug, name: norm(display), display }))
    // A one- or two-letter name ("H M" from "H&M") would match inside ordinary prompts.
    .filter((n) => n.name.trim().length >= 3)
);
const TAKEN = new Set(FULL_NAMES.map((n) => n.name));
/** Shortened names that are everyday words or places ("american cheese", "Costa Rica"). */
const NOT_ALONE = new Set([
  "whole", "apple", "microsoft", "american", "united", "southwest", "blaze", "costa", "world",
  "advance", "alaska", "spirit", "frontier", "national",
]);
const SHORT_NAMES = FULL_NAMES.flatMap((n) => {
  const short = n.name.replace(GENERIC_TAIL, " ");
  const bare = short.trim();
  return short !== n.name && bare.length >= 5 && !COMMON_WORDS.has(bare) && !NOT_ALONE.has(bare) && !TAKEN.has(short)
    ? [{ ...n, name: short }]
    : [];
});
const NAMES = [...FULL_NAMES, ...SHORT_NAMES].sort((a, b) => b.name.length - a.name.length);

/**
 * How people actually type brands the names above cannot catch, from the saved
 * prompts (2026-10-27 → 11-03). Tried only after every real name has failed,
 * so "KFC, paid with Apple Pay" stays KFC: an alias never outranks a brand the
 * prompt spells out.
 *
 * Patterns run against the raw prompt where case or punctuation carries the
 * meaning ("Apple" is the company, "apple" the fruit; "7-11" is a shop, "7/11"
 * a date), and against the normalised one otherwise.
 */
const ALIASES: { slug: string; raw?: RegExp; normed?: RegExp }[] = [
  // "Apple receipt airpods pro 3", "Apple proof of purchase" — 5 prompts, 4
  // accounts, all missed: "apple" is in NOT_ALONE because of the fruit.
  { slug: "apple-store", raw: /(?<!Big )\bApple\b(?!\s+(?:Pay|Card|Cash|Music|TV|One|Arcade|Care|Bee)\b)/ },
  { slug: "apple-store", normed: / (?:airpods|iphone|ipad|macbook|imac|apple watch) / },
  { slug: "7-eleven", raw: /(?<![\d/.:,#-])7(?:-11|[- ]?eleven)(?![\d/.:,-])/i },
  // COMMON_WORDS wants "Subway" capitalised; "create subway receipt" is not a ticket.
  { slug: "subway", normed: / subway (?:receipt|sandwich|sub|footlong|order|meal) / },
  { slug: "little-caesars", normed: / little c(?:ae|ea|e|a)s[ae]rs? / },
  { slug: "chick-fil-a", normed: / chick fil / },
];

/** The brand template a prompt names, by whole words, or null. */
export function detectBrand(prompt: string): string | null {
  const p = norm(prompt);
  const hit = NAMES.find(
    (n) =>
      p.includes(n.name) &&
      (!COMMON_WORDS.has(n.name.trim()) || new RegExp(`\\b${n.display}\\b`).test(prompt))
  );
  if (hit) return hit.slug;
  return ALIASES.find((a) => (a.raw ? a.raw.test(prompt) : a.normed!.test(p)))?.slug ?? null;
}

/**
 * Whether the business name the model wrote is the brand's own. Used when the
 * brand came from the template on screen rather than the prompt: someone on the
 * Shell page who types "Krispy Kreme" gets a Krispy Kreme receipt, and it must
 * not then be laid onto Shell's logo and layout.
 */
export function isBrandName(businessName: string, slug: string): boolean {
  const template = getTemplate(slug);
  if (!template) return false;
  return norm(businessName).includes(norm(template.shortName));
}

/**
 * The brand-specific half of the system prompt.
 *
 * The sample items are there for their *style*, not to be copied: a Walmart
 * receipt prints "GV WHOLE MILK 1 GAL", a Starbucks one "Gr Caffe Latte", and a
 * model told only "Walmart" writes "Milk". The detail labels are the template's
 * own rows, so the values come back keyed to rows that actually render.
 */
export function brandPrompt(
  slug: string,
  { fromScreen = false }: { fromScreen?: boolean } = {}
): { template: ReceiptTemplate; text: string } | null {
  const template = getTemplate(slug);
  if (!template) return null;
  const d = template.defaults;
  const examples = d.items
    .slice(0, 4)
    .map((it) => `"${it.name}" (${it.quantity} × ${it.price})`)
    .join(", ");
  const labels = (d.sections ?? []).flatMap((s) => s.rows.map((r) => r.label).filter(Boolean));
  const lines = [
    fromScreen
      ? `The user is working on the ${template.shortName} template. If the description names a different business, the receipt is from that business: use its name and ignore every ${template.shortName} instruction below. Otherwise this receipt is from ${template.shortName}; use exactly "${template.shortName}" as the business name.`
      : `This receipt is from ${template.shortName}. Use exactly "${template.shortName}" as the business name.`,
    d.hideItems
      ? `It is a payment/transaction record, not an itemised receipt: put the single amount as one item.`
      : `Items must be things ${template.shortName} really sells at current prices, written the way its receipts print them — for example ${examples}. Do not reuse these examples; follow their style.`,
    d.addressLine2 ? `If no location is given, use a real-looking ${template.shortName} address in ${d.addressLine2}.` : "",
    labels.length
      ? `Fill \`details\` with one entry for each of these labels, in this order, using the label text exactly: ${labels.join(" | ")}.`
      : "",
  ];
  return { template, text: lines.filter(Boolean).join("\n") };
}
