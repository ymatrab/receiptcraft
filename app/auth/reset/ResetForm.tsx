"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/config";

const MIN_PASSWORD = 8;

export default function ResetForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  // Null = still checking; false = no recovery session (link expired/invalid).
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    if (!supabaseConfigured) {
      setHasSession(false);
      return;
    }
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(Boolean(data.session));
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
    // Give the success note a beat, then send them into the app.
    setTimeout(() => window.location.assign("/account"), 1200);
  }

  if (hasSession === null) {
    return <div className="mt-8 h-12 animate-pulse rounded-full bg-slate-100" />;
  }

  if (!hasSession) {
    return (
      <div className="mt-8 space-y-3">
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          This reset link is invalid or has expired. Request a new one from the
          login page.
        </p>
        <a
          href="/login"
          className="block w-full rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to log in
        </a>
      </div>
    );
  }

  if (done) {
    return (
      <p className="mt-8 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Password updated — taking you to your account…
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-2">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          required
          minLength={MIN_PASSWORD}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`New password (${MIN_PASSWORD}+ characters)`}
          className="w-full rounded-full border border-slate-300 px-4 py-3 pr-16 text-sm focus:border-indigo-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {busy ? "Saving…" : "Save new password"}
      </button>
    </form>
  );
}
