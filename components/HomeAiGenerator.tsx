"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { analytics } from "@/lib/analytics";

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
      <div className="flex items-center gap-2 rounded-[3px] border border-rule bg-card p-2 shadow-sm focus-within:border-ledger/50">
        <span
          aria-hidden="true"
          className="shrink-0 pl-2 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft"
        >
          AI
        </span>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="Describe a receipt — e.g. 'Uber ride downtown, $18.40'"
          className="min-w-0 flex-1 bg-transparent px-1 py-2 text-base text-ink placeholder:text-ink-soft/70 focus:outline-none sm:text-sm"
          aria-label="Describe your receipt"
        />
        <button
          type="button"
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="shrink-0 rounded-[3px] bg-ledger px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ledger-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate"}
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-xs text-red-600">
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
        <p className="mt-2 font-data text-xs text-ink-soft">
          Generate with AI, then fine-tune everything in the editor.
        </p>
      )}
    </div>
  );
}
