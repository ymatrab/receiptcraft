"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics";

interface Props {
  /** Where this form is rendered (footer, blog, ...) — stored for attribution. */
  source?: string;
  className?: string;
}

/**
 * Email capture form. Posts to /api/newsletter; the honeypot `website` field
 * stays hidden from real users and filters out naive bots.
 */
export default function NewsletterSignup({ source = "footer", className = "" }: Props) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state !== "idle" || !email.trim()) return;
    setState("busy");
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong — please try again.");
        setState("idle");
        return;
      }
      analytics.newsletterSignup(source);
      setState("done");
    } catch {
      setError("Something went wrong — please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <p className={`rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ${className}`}>
        ✓ You&apos;re on the list — receipt tips and new templates, straight to your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={className}>
      <div className="flex gap-2">
        <label htmlFor={`newsletter-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-${source}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-base focus:border-indigo-400 focus:outline-none sm:text-sm"
        />
        {/* Honeypot — hidden from real users, tempting for bots. */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={state === "busy"}
          className="shrink-0 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {state === "busy" ? "Joining…" : "Subscribe"}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <p className="mt-2 text-xs text-slate-400">
        Receipt tips, new templates and product updates. No spam, unsubscribe anytime.
      </p>
    </form>
  );
}
