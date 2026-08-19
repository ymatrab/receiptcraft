/**
 * Shared styles for the pill-shaped auth forms (login, signup, password reset).
 *
 * Extracted so these forms can't drift apart: they were hand-styled separately,
 * which is how /login ended up with a focus ring while /auth/reset kept a bare
 * `focus:outline-none`, and how one grew a 16px base font (no iOS zoom on
 * focus) while the other stayed at 14px.
 *
 * - text-base on mobile stops iOS Safari auto-zooming when the field is focused;
 *   sm:text-sm restores the compact desktop density.
 * - focus-visible ring, not a border-colour shift: slate-300 → indigo-400 is far
 *   too subtle to be the only focus indicator for keyboard users.
 */
export const authFieldClass =
  "w-full rounded-full border border-slate-300 px-4 py-3 text-base text-slate-900 transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 sm:text-sm";

export const authLabelClass = "mb-1.5 block px-1 text-xs font-medium text-slate-600";

/** Primary submit pill. */
export const authSubmitClass =
  "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

/** Show/hide password toggle sitting inside a field. 44px tap target. */
export const authRevealClass =
  "absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";
