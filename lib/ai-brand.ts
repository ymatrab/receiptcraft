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

/** "McDonald's" → "mcdonalds", "7-Eleven" → "7 eleven": apostrophes vanish, other punctuation becomes a space. */
const norm = (s: string) =>
  ` ${s
    .toLowerCase()
    .replace(/['’®™.]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()} `;

/**
 * Brand names that are also ordinary words. "subway ticket", "a budget hotel"
 * and "zoom lens" are not about the brand, so these match only when the prompt
 * capitalises them the way the brand does. From a brand page the builder sends
 * the template itself, so this only narrows the guess from free text.
 */
const COMMON_WORDS = new Set(
  ["target", "subway", "budget", "enterprise", "max", "steam", "coach", "gap", "boots", "marathon", "notion",
    "slack", "zoom", "bolt", "staples", "checkers", "goat", "equinox", "sonic", "shell", "national", "giant"]
);

/** Longest names first, so "Uber Eats" wins over "Uber" and "Sam's Club" over nothing shorter. */
const NAMES: { slug: string; name: string; display: string }[] = BRAND_TEMPLATES.flatMap((t) =>
  [...new Set([t.shortName, t.name.replace(/\s+Receipt$/i, "")])]
    .map((display) => ({ slug: t.slug, name: norm(display), display }))
    // A one- or two-letter name ("H M" from "H&M") would match inside ordinary prompts.
    .filter((n) => n.name.trim().length >= 3)
).sort((a, b) => b.name.length - a.name.length);

/** The brand template a prompt names, by whole words, or null. */
export function detectBrand(prompt: string): string | null {
  const p = norm(prompt);
  const hit = NAMES.find(
    (n) =>
      p.includes(n.name) &&
      (!COMMON_WORDS.has(n.name.trim()) || new RegExp(`\\b${n.display}\\b`).test(prompt))
  );
  return hit?.slug ?? null;
}

/**
 * The brand-specific half of the system prompt.
 *
 * The sample items are there for their *style*, not to be copied: a Walmart
 * receipt prints "GV WHOLE MILK 1 GAL", a Starbucks one "Gr Caffe Latte", and a
 * model told only "Walmart" writes "Milk". The detail labels are the template's
 * own rows, so the values come back keyed to rows that actually render.
 */
export function brandPrompt(slug: string): { template: ReceiptTemplate; text: string } | null {
  const template = getTemplate(slug);
  if (!template) return null;
  const d = template.defaults;
  const examples = d.items
    .slice(0, 4)
    .map((it) => `"${it.name}" (${it.quantity} × ${it.price})`)
    .join(", ");
  const labels = (d.sections ?? []).flatMap((s) => s.rows.map((r) => r.label).filter(Boolean));
  const lines = [
    `This receipt is from ${template.shortName}. Use exactly "${template.shortName}" as the business name.`,
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
