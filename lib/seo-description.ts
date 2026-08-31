// Central meta-description length normalizer.
//
// Bing Webmaster (and Google's SERP snippet) treat descriptions outside the
// ~150–160 char window as "too short" / "too long". Every section builds its
// own description string; each one passes the result through fitSeoDescription
// so the whole site lands in range from a single implementation.
//
// Short descriptions get one or more graded filler sentences appended (the one
// that lands closest to the target without overflowing). Long descriptions are
// trimmed to the last word boundary and given an ellipsis. Because the shortest
// pad is <= (MAX - MIN) chars, there is no "unpaddable" gap: any description
// below MIN has at least MAX-MIN+1 chars of headroom, so a pad always fits.

export const DESC_MIN = 150;
export const DESC_MAX = 160;
const DESC_TARGET = 155;

// Receipt-oriented filler, ordered short→long, spanning ~9 to ~86 chars so the
// greedy fitter can always land inside [MIN, MAX] (usually in a single append).
// No pad may claim "no sign-up". Building and previewing are free without an
// account, but downloading is not — so a bare "Free — no sign-up." tail promised
// something the product does not do, on 231 of the 348 brand pages. The two
// offending pads are replaced (not deleted) by accurate strings of the same
// length, because the fitter relies on this array spanning ~9→86 chars evenly,
// and the shortest entry must stay <= DESC_MAX - DESC_MIN for padShort's
// "a pad always fits" guarantee to hold.
export const RECEIPT_PADS: readonly string[] = [
  "Editable.",
  "Free to use.",
  "Fully editable.",
  "Free to customize.",
  "Every item is editable.",
  "Free to build & preview.",
  "Every item and total is editable.",
  "Adjust the items, tax and totals to match.",
  "Edit the store details, items, prices and totals.",
  "Customize the items, prices, tax and totals in a few clicks.",
  "Great for expense reports, records and replacing lost receipts.",
  "Every detail is editable — items, prices, date, tax, totals and store info.",
  "Handy for expense reports, reimbursements, bookkeeping and replacing lost receipts.",
];

// Editorial-neutral filler for blog/CMS copy, where receipt-maker phrasing would
// read wrong.
/**
 * Pads for Pro-only brand pages.
 *
 * Receipt-flavoured like RECEIPT_PADS, but none of them claims the page is
 * free — three of those do ("Free to use.", "Free to customize.", "Free to
 * build & preview."), and on a template that needs Pro to open they turn a
 * correct description into a false one at the padding step, after every other
 * check has passed. That is how "Create a realistic Target receipt online…"
 * shipped with "…for free" appended to it.
 *
 * Same 9→86 char spread as RECEIPT_PADS so padShort's "a pad always fits"
 * guarantee still holds.
 */
export const PRO_PADS: readonly string[] = [
  "Editable.",
  "Fully editable.",
  "Every field is editable.",
  "Edit every line and total.",
  "Every item and total is editable.",
  "Edit the items, totals and tax rate.",
  "Every item, total and tax rate is editable.",
  "Set the store details, items and totals, then export.",
  "Edit every line, total and tax rate, then export as a PDF or PNG.",
  "Change the store details, items, totals and date, then export a print-ready file.",
] as const;

export const NEUTRAL_PADS: readonly string[] = [
  "Read on.",
  "See more.",
  "Learn more.",
  "Full details.",
  "Read the full guide.",
  "Here's the practical breakdown.",
  "Read on for the full breakdown with examples.",
  "Here's what to know, with clear steps and examples.",
  "A clear, practical guide with steps, examples and tips.",
  "Everything you need to know, explained simply with clear examples.",
];

function trimLong(desc: string): string {
  if (desc.length <= DESC_MAX) return desc;
  // Leave one char for the ellipsis so the final string is <= DESC_MAX.
  let cut = desc.slice(0, DESC_MAX - 1);
  const lastSpace = cut.lastIndexOf(" ");
  // Prefer a clean word boundary, but only if it doesn't drop us below MIN.
  if (lastSpace >= DESC_MIN - 1) cut = cut.slice(0, lastSpace);
  cut = cut.replace(/[\s.,;:!?—–-]+$/, "");
  return `${cut}…`;
}

function padShort(desc: string, pads: readonly string[]): string {
  let out = desc;
  // Ensure terminal punctuation before appending a filler sentence.
  if (!/[.!?…]$/.test(out)) out += ".";
  // Greedy: each round append the pad that lands closest to the target without
  // exceeding MAX. Capped at 4 rounds (more than enough for any real input).
  for (let round = 0; round < 4 && out.length < DESC_MIN; round++) {
    let best: string | null = null;
    for (const p of pads) {
      const cand = `${out} ${p}`;
      if (cand.length > DESC_MAX) continue;
      if (best === null || Math.abs(cand.length - DESC_TARGET) < Math.abs(best.length - DESC_TARGET)) {
        best = cand;
      }
    }
    if (best === null) break; // nothing fits under MAX (shouldn't happen)
    out = best;
  }
  return out;
}

/**
 * Fit any meta description into the [150, 160] char window.
 *
 * Pass `neutral: true` for editorial/blog copy to use non-receipt filler.
 *
 * Pass `preformatted: true` for copy that was already composed to length — it
 * will be trimmed if it somehow overflows, but never padded. Filler earns its
 * place only when the alternative is a stub; appending "Editable." to a finished
 * sentence spends SERP characters saying nothing, and it was landing on real
 * pages ("…recreate a Sephora receipt in seconds. Editable."). A 145-character
 * description that reads well beats a 152-character one with a filler tail.
 */
export function fitSeoDescription(
  input: string,
  opts: { neutral?: boolean; pro?: boolean; preformatted?: boolean } = {},
): string {
  const desc = input.replace(/\s+/g, " ").trim();
  if (desc.length > DESC_MAX) return trimLong(desc);
  if (opts.preformatted) return desc;
  if (desc.length < DESC_MIN) {
    const pads = opts.pro ? PRO_PADS : opts.neutral ? NEUTRAL_PADS : RECEIPT_PADS;
    return padShort(desc, pads);
  }
  return desc;
}
