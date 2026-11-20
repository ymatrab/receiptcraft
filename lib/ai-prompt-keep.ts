/**
 * Holds an AI prompt across a sign-up round trip.
 *
 * AI generation needs an account, and the person who hits that wall has just
 * typed the one sentence describing exactly what they want. Making them retype
 * it after signing up is how the highest-intent moment in the funnel becomes an
 * abandoned one.
 *
 * Shared by the homepage AI box and the builder's AI box. Both send a
 * signed-out visitor to sign up with next=AI_RESUME_PATH; the homepage then
 * takes the prompt back, generates it and hands the receipt to /create.
 *
 * `template` is the store the builder had open (a visitor who came from the
 * Walmart page and typed "2 gallons of milk"), so the receipt comes back on
 * that store's layout rather than on whatever the prompt alone suggests.
 */

const AI_PROMPT_KEY = "rc_ai_prompt";

/**
 * How long a kept prompt stays worth generating. localStorage rather than
 * sessionStorage, because the sign-up can end in another tab (an email link)
 * and sessionStorage does not cross tabs; the time limit stops a prompt typed
 * last week from firing on an unrelated visit.
 */
const PROMPT_TTL_MS = 60 * 60 * 1000;

export type KeptPrompt = { prompt: string; template: string | null };

export function keepAiPrompt(prompt: string, template?: string | null): void {
  try {
    localStorage.setItem(
      AI_PROMPT_KEY,
      JSON.stringify({ prompt, template: template || null, at: Date.now() })
    );
  } catch {
    // Not fatal: what's on screen stays, it just won't survive the sign-in.
  }
}

/** The kept prompt, if one is fresh, removed so it is used at most once. */
export function takeAiPrompt(): KeptPrompt | null {
  try {
    const raw = localStorage.getItem(AI_PROMPT_KEY);
    localStorage.removeItem(AI_PROMPT_KEY);
    // Prompts kept by the version before localStorage.
    const legacy = sessionStorage.getItem(AI_PROMPT_KEY);
    sessionStorage.removeItem(AI_PROMPT_KEY);
    if (raw) {
      const kept = JSON.parse(raw) as { prompt?: unknown; template?: unknown; at?: unknown };
      if (
        typeof kept.prompt === "string" &&
        typeof kept.at === "number" &&
        Date.now() - kept.at < PROMPT_TTL_MS
      ) {
        return {
          prompt: kept.prompt,
          template: typeof kept.template === "string" && kept.template ? kept.template : null,
        };
      }
    }
    return legacy ? { prompt: legacy, template: null } : null;
  } catch {
    // Private-mode storage throws; not worth breaking the page over.
    return null;
  }
}
