"use client";

import { useState } from "react";
import { analytics } from "@/lib/analytics";
import { CheckIcon, SpinnerIcon } from "@/components/Icons";

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
      <p
        role="status"
        className={`flex items-start gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900 ${className}`}
      >
        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
        You&apos;re on the list — receipt tips and new templates, straight to your inbox.
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
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `newsletter-${source}-error` : undefined}
          className="w-full min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 sm:text-sm"
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
          aria-busy={state === "busy"}
          className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "busy" && <SpinnerIcon className="h-4 w-4" />}
          {state === "busy" ? "Joining…" : "Subscribe"}
        </button>
      </div>
      {error && (
        <p id={`newsletter-${source}-error`} role="alert" className="mt-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
      <p className="mt-2 text-xs text-slate-500">
        Receipt tips, new templates and product updates. No spam, unsubscribe anytime.
      </p>
    </form>
  );
}
