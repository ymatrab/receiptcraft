"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/config";
import { analytics } from "@/lib/analytics";

type Mode = "login" | "signup";
const MIN_PASSWORD = 8;

export default function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/account";
  const hadError = params.get("error");
  const errorDetail = params.get("error_description");

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [googleBusy, setGoogleBusy] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  // Set once a verification email is sent — replaces the form with a prompt.
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);

  const redirectTo = `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback?next=${encodeURIComponent(next)}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setNotice(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) return;
    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }

    setBusy(true);
    const supabase = createClient();

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: { emailRedirectTo: redirectTo },
      });
      setBusy(false);
      if (error) {
        setError(error.message);
        return;
      }
      // When email confirmation is on, Supabase returns a user with an empty
      // identities array if the email is already registered.
      if (data.user && data.user.identities?.length === 0) {
        setError("That email is already registered. Try logging in instead.");
        setMode("login");
        return;
      }
      analytics.signIn("password");
      setVerifyEmail(cleanEmail);
      return;
    }

    // Login
    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });
    setBusy(false);
    if (error) {
      if (/email not confirmed/i.test(error.message)) {
        setError("Please verify your email first — check your inbox for the link.");
      } else {
        setError("Wrong email or password.");
      }
      return;
    }
    analytics.signIn("password");
    // Hard navigation so the server picks up the freshly-set session cookies.
    window.location.assign(next);
  }

  async function resendVerification() {
    if (!verifyEmail) return;
    setError(null);
    setNotice(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: verifyEmail,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) setError(error.message);
    else setNotice("Verification email resent.");
  }

  async function forgotPassword() {
    setError(null);
    setNotice(null);
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError("Enter your email above first, then tap “Forgot password?”.");
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset`,
    });
    if (error) setError(error.message);
    else setNotice(`If an account exists for ${cleanEmail}, a reset link is on its way.`);
  }

  async function signInWithGoogle() {
    if (googleBusy) return;
    setGoogleBusy(true);
    setError(null);
    analytics.signIn("google");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        // Always show the Google account chooser so a wrong cached account
        // doesn't silently fail the flow.
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      setGoogleBusy(false);
      setError(`Sign-in failed: ${error.message}`);
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

  // Post-signup: ask the user to confirm their email.
  if (verifyEmail) {
    return (
      <div className="mt-8 space-y-3">
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Almost there — we sent a verification link to <strong>{verifyEmail}</strong>.
          Click it to activate your account, then come back and log in.
        </div>
        {notice && (
          <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">{notice}</p>
        )}
        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}
        <button
          type="button"
          onClick={resendVerification}
          className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Resend verification email
        </button>
        <button
          type="button"
          onClick={() => {
            setVerifyEmail(null);
            setMode("login");
            setNotice(null);
            setError(null);
          }}
          className="w-full text-center text-sm font-medium text-indigo-600 hover:underline"
        >
          Back to log in
        </button>
      </div>
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

      {/* Email + password */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            minLength={MIN_PASSWORD}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "signup" ? `Create a password (${MIN_PASSWORD}+ characters)` : "Password"}
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
        {notice && (
          <p className="rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">{notice}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {busy
            ? mode === "signup"
              ? "Creating account…"
              : "Logging in…"
            : mode === "signup"
              ? "Create account"
              : "Log in"}
        </button>
      </form>

      <div className="flex items-center justify-between pt-0.5 text-sm">
        <button
          type="button"
          onClick={() => {
            setMode((m) => (m === "login" ? "signup" : "login"));
            setError(null);
            setNotice(null);
          }}
          className="font-medium text-indigo-600 hover:underline"
        >
          {mode === "login" ? "New here? Create an account" : "Have an account? Log in"}
        </button>
        {mode === "login" && (
          <button
            type="button"
            onClick={forgotPassword}
            className="text-slate-400 hover:text-slate-600"
          >
            Forgot password?
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 py-1">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-[11px] uppercase tracking-wide text-slate-400">or</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={googleBusy}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
      >
        <GoogleIcon />
        {googleBusy ? "Redirecting…" : "Continue with Google"}
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
