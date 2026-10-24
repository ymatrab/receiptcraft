"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { AI_RESUME_PATH } from "@/lib/new-account";
import { SparkleIcon, SpinnerIcon } from "@/components/Icons";
import AiDemo from "@/components/AiDemo";

/** Key used to hand the generated receipt to the builder on /create. */
export const AI_HANDOFF_KEY = "rc_ai_receipt";

/**
 * Holds the prompt across a sign-in round trip.
 *
 * AI generation needs an account, and the person who hits that wall has just
 * typed the one sentence describing exactly what they want. Making them retype
 * it after logging in is how the highest-intent moment in the funnel becomes an
 * abandoned one.
 */
const AI_PROMPT_KEY = "rc_ai_prompt";

/**
 * How long a kept prompt stays worth generating. localStorage rather than
 * sessionStorage, because the sign-up can end in another tab (an email link)
 * and sessionStorage does not cross tabs; the time limit stops a prompt typed
 * last week from firing on an unrelated visit.
 */
const PROMPT_TTL_MS = 60 * 60 * 1000;

function keepPrompt(prompt: string) {
  try {
    localStorage.setItem(AI_PROMPT_KEY, JSON.stringify({ prompt, at: Date.now() }));
  } catch {
    // Not fatal: what's on screen stays, it just won't survive the sign-in.
  }
}

/** The kept prompt, if one is fresh, removed so it is used at most once. */
function takePrompt(): string | null {
  try {
    const raw = localStorage.getItem(AI_PROMPT_KEY);
    localStorage.removeItem(AI_PROMPT_KEY);
    // Prompts kept by the previous version of this component.
    const legacy = sessionStorage.getItem(AI_PROMPT_KEY);
    sessionStorage.removeItem(AI_PROMPT_KEY);
    if (raw) {
      const kept = JSON.parse(raw) as { prompt?: unknown; at?: unknown };
      if (
        typeof kept.prompt === "string" &&
        typeof kept.at === "number" &&
        Date.now() - kept.at < PROMPT_TTL_MS
      ) {
        return kept.prompt;
      }
    }
    return legacy || null;
  } catch {
    // Private-mode storage throws; not worth breaking the hero over.
    return null;
  }
}

/**
 * Homepage AI receipt generator. On success it stashes the result and sends the
 * user to the builder, which hydrates it. Mirrors the in-builder generator but
 * acts as a conversion entry point from the hero.
 */
export default function HomeAiGenerator() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Back from signing up (AI_RESUME_PATH): restore the prompt they typed and
  // generate it straight away, which is the whole point of the round trip. On
  // any other visit a kept prompt is only restored, never sent.
  useEffect(() => {
    const saved = takePrompt();
    if (!saved) return;
    setPrompt(saved);
    const params = new URLSearchParams(window.location.search);
    if (params.get("ai") === "1") {
      // Drop only the marker: the auth callback can add ev/ev_method to the
      // same URL for AuthEventBeacon, which still has to read them.
      params.delete("ai");
      const rest = params.toString();
      window.history.replaceState(null, "", rest ? `/?${rest}` : "/");
      void generate(saved);
    }
    // generate is stable enough for a once-on-mount call; re-running this on
    // every render would resend the prompt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function generate(text: string = prompt) {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    analytics.aiGenerate("start");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await res.json();
      if (!res.ok) {
        analytics.aiGenerate("error");
        if (res.status === 401 || data.needsAuth) {
          // Signed out: straight to sign-up, which says why and comes back
          // here (AI_RESUME_PATH) to generate the kept prompt. An error line
          // with a link was tried first — 12 of 334 clicked it — and an
          // in-page panel after that; the owner chose a full sign-up page.
          keepPrompt(text);
          analytics.upgradeClick("home_ai_signup");
          router.push(`/login?signup=1&next=${encodeURIComponent(AI_RESUME_PATH)}`);
          return;
        }
        setError(data.error ?? "Generation failed.");
        return;
      }
      analytics.aiGenerate("success");
      sessionStorage.setItem(AI_HANDOFF_KEY, JSON.stringify(data.receipt));
      router.push("/create");
    } catch {
      analytics.aiGenerate("error");
      setError("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 max-w-xl">
      {/* The ring lives on the wrapper via focus-within: the input itself is
          transparent and borderless, so styling focus on the input alone left
          keyboard users with no visible indicator at all. */}
      <div className="flex items-center gap-2 rounded-2xl border border-indigo-200 bg-white/80 p-2 shadow-sm backdrop-blur transition-shadow focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/30">
        <SparkleIcon className="ml-2 h-5 w-5 shrink-0 text-indigo-500" />
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="Describe a receipt — e.g. 'Uber ride downtown, $18.40'"
          className="min-h-11 min-w-0 flex-1 bg-transparent px-1 py-2 text-base text-slate-800 placeholder:text-slate-500 focus:outline-none sm:text-sm"
          aria-label="Describe your receipt"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "home-ai-error" : undefined}
        />
        <button
          type="button"
          onClick={() => generate()}
          disabled={loading || !prompt.trim()}
          aria-busy={loading}
          className="flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <SpinnerIcon className="h-4 w-4" />}
          {loading ? "Generating…" : "Generate"}
        </button>
      </div>
      {error ? (
        <p id="home-ai-error" role="alert" className="mt-2 text-xs font-medium text-red-700">
          {error}{" "}
          {/upgrade|limit/i.test(error) && (
            <Link
              href="/pricing"
              onClick={() => analytics.upgradeClick("home_ai_limit")}
              className="font-semibold underline"
            >
              See plans
            </Link>
          )}
        </p>
      ) : (
        <p className="mt-2 text-xs text-slate-500">Generate with AI, then fine-tune everything in the editor.</p>
      )}
      <AiDemo />
    </div>
  );
}
