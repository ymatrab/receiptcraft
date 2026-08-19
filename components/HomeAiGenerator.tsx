"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { SparkleIcon, SpinnerIcon } from "@/components/Icons";

/** Key used to hand the generated receipt to the builder on /create. */
export const AI_HANDOFF_KEY = "rc_ai_receipt";

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

  async function generate() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    analytics.aiGenerate("start");
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        analytics.aiGenerate("error");
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
          className="min-w-0 flex-1 bg-transparent px-1 py-2 text-base text-slate-800 placeholder:text-slate-500 focus:outline-none sm:text-sm"
          aria-label="Describe your receipt"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "home-ai-error" : undefined}
        />
        <button
          type="button"
          onClick={generate}
          disabled={loading || !prompt.trim()}
          aria-busy={loading}
          className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
    </div>
  );
}
