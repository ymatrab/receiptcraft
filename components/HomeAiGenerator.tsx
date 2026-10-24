"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { createClient } from "@/lib/supabase/client";
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
  const [needsAuth, setNeedsAuth] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const signupRef = useRef<HTMLDivElement>(null);

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

  // The sign-up panel replaces an error line, a navigation-sized change with
  // no page load, so focus moves to it for keyboard and screen reader users.
  useEffect(() => {
    if (needsAuth) signupRef.current?.focus();
  }, [needsAuth]);

  async function continueWithGoogle() {
    if (googleBusy) return;
    setGoogleBusy(true);
    analytics.loginAttempt("google");
    analytics.upgradeClick("home_ai_google");
    keepPrompt(prompt);
    const { error: oauthError } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
          AI_RESUME_PATH
        )}&signup=1&m=google`,
        queryParams: { prompt: "select_account" },
      },
    });
    if (oauthError) {
      setGoogleBusy(false);
      setError("Google sign-in didn't start. Try again, or sign up with email.");
    }
  }

  async function generate(text: string = prompt) {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    setNeedsAuth(false);
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
          // Not an error to the visitor: the sign-up panel below takes over.
          keepPrompt(text);
          setNeedsAuth(true);
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
          aria-invalid={error && !needsAuth ? true : undefined}
          aria-describedby={error && !needsAuth ? "home-ai-error" : undefined}
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
      {needsAuth ? (
        /* Signed out. This used to be a red error line with a small "Create a
           free account" link: 334 people typed a prompt between Sep 1 and Oct
           22 2026 and 12 clicked it. A free account is the cheapest next step
           (no card), so it is offered as the step itself, with Google first,
           and the prompt is kept and generated the moment they are back. */
        <div
          ref={signupRef}
          tabIndex={-1}
          role="region"
          aria-labelledby="home-ai-signup-heading"
          className="mt-3 rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm focus:outline-none"
        >
          <h2 id="home-ai-signup-heading" className="text-base font-semibold text-slate-900">
            Create a free account to generate this receipt
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            3 AI receipts a month, free. No card. We&apos;ll keep what you typed and make it as
            soon as you&apos;re in.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={continueWithGoogle}
              disabled={googleBusy}
              aria-busy={googleBusy}
              className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {googleBusy && <SpinnerIcon className="h-4 w-4" />}
              Continue with Google
            </button>
            <Link
              href={`/login?signup=1&next=${encodeURIComponent(AI_RESUME_PATH)}`}
              onClick={() => {
                keepPrompt(prompt);
                analytics.upgradeClick("home_ai_signup");
              }}
              className="flex min-h-11 flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Sign up with email
            </Link>
          </div>
          {error && (
            <p role="alert" className="mt-2 text-xs font-medium text-red-700">
              {error}
            </p>
          )}
          <p className="mt-3 text-xs text-slate-500">
            Rather do it by hand?{" "}
            <Link href="/create" className="font-medium text-indigo-700 underline">
              Open the free receipt maker
            </Link>{" "}
            — no account needed.
          </p>
        </div>
      ) : error ? (
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
