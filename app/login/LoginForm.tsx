"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/config";
import { analytics } from "@/lib/analytics";

type Provider = "google";

export default function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/account";
  const hadError = params.get("error");
  const errorDetail = params.get("error_description");
  const [busy, setBusy] = useState<Provider | null>(null);
  const [email, setEmail] = useState("");
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (emailBusy || !email.trim()) return;
    setEmailBusy(true);
    const supabase = createClient();
    const emailRedirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo },
    });
    setEmailBusy(false);
    if (error) {
      alert(`Couldn't send link: ${error.message}`);
      return;
    }
    analytics.signIn("email");
    setEmailSent(true);
  }

  async function signIn(provider: Provider) {
    if (busy) return;
    setBusy(provider);
    analytics.signIn(provider);
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        // Always show the Google account chooser so a wrong cached account
        // doesn't silently fail the flow.
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      setBusy(null);
      alert(`Sign-in failed: ${error.message}`);
    }
    // On success the browser is redirected to the provider.
  }

  if (!supabaseConfigured) {
    return (
      <p className="mt-8 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Login isn&apos;t enabled yet — the backend keys haven&apos;t been added.
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-3">
      {hadError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Sign-in didn&apos;t complete. Please try again.
          {errorDetail && (
            <span className="mt-1 block text-xs text-red-500">{errorDetail}</span>
          )}
        </p>
      )}

      {/* Email magic link — works without any OAuth provider setup */}
      {emailSent ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Check your inbox — we emailed a sign-in link to <strong>{email}</strong>.
        </p>
      ) : (
        <form onSubmit={sendMagicLink} className="space-y-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={emailBusy || !email.trim()}
            className="w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {emailBusy ? "Sending…" : "Email me a sign-in link"}
          </button>
        </form>
      )}

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] uppercase tracking-wide text-slate-400">or</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={() => signIn("google")}
        disabled={!!busy}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
      >
        <GoogleIcon />
        {busy === "google" ? "Redirecting…" : "Continue with Google"}
      </button>
      <p className="pt-2 text-center text-[11px] leading-relaxed text-slate-400">
        By continuing you agree to our{" "}
        <a href="/terms" className="underline">Terms</a> and{" "}
        <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
