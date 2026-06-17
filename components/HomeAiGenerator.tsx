"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Generation failed.");
        return;
      }
      sessionStorage.setItem(AI_HANDOFF_KEY, JSON.stringify(data.receipt));
      router.push("/create");
    } catch {
      setError("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 max-w-xl">
      <div className="flex items-center gap-2 rounded-2xl border border-indigo-200 bg-white/80 p-2 shadow-sm backdrop-blur">
        <span className="pl-2 text-lg" aria-hidden="true">✨</span>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="Describe a receipt — e.g. 'Uber ride downtown, $18.40'"
          className="flex-1 bg-transparent px-1 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          aria-label="Describe your receipt"
        />
        <button
          type="button"
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Generating…" : "Generate"}
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-xs text-red-600">
          {error}{" "}
          {/upgrade|limit/i.test(error) && (
            <Link href="/pricing" className="font-semibold underline">See plans</Link>
          )}
        </p>
      ) : (
        <p className="mt-2 text-xs text-slate-500">Generate with AI, then fine-tune everything in the editor.</p>
      )}
    </div>
  );
}
