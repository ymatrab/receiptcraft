"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/config";
import { EyeIcon, EyeOffIcon, SpinnerIcon } from "@/components/Icons";
import {
  authFieldClass,
  authLabelClass,
  authRevealClass,
  authSubmitClass,
} from "@/lib/form-styles";

const MIN_PASSWORD = 8;

export default function ResetForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  // Null = still checking; false = no recovery session (link expired/invalid).
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  const passwordRef = useRef<HTMLInputElement>(null);

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

  // Validate on blur rather than per keystroke — flagging "too short" while
  // someone is still typing is noise, not help.
  function validatePassword() {
    if (password.length === 0) {
      setError(null);
      return true;
    }
    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return false;
    }
    setError(null);
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      passwordRef.current?.focus();
      return;
    }
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      setError(error.message);
      passwordRef.current?.focus();
      return;
    }
    setDone(true);
    // Give the success note a beat, then send them into the app.
    setTimeout(() => window.location.assign("/account"), 1200);
  }

  if (hasSession === null) {
    // Mirrors the real form's height (label + field + submit) so the card
    // doesn't jump when the session check resolves.
    return (
      <div className="mt-8 animate-pulse space-y-3" aria-hidden="true">
        <div className="space-y-1.5">
          <div className="h-3 w-28 rounded bg-slate-100" />
          <div className="h-12 rounded-full bg-slate-100" />
        </div>
        <div className="h-12 rounded-full bg-slate-200" />
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="mt-8 space-y-3">
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          This reset link is invalid or has expired. Request a new one from the
          login page.
        </p>
        <a
          href="/login"
          className="block w-full rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Back to log in
        </a>
      </div>
    );
  }

  if (done) {
    return (
      <p role="status" className="mt-8 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        Password updated — taking you to your account…
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-3" noValidate>
      <div>
        <label htmlFor="reset-password" className={authLabelClass}>
          New password
        </label>
        <div className="relative">
          <input
            id="reset-password"
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            required
            minLength={MIN_PASSWORD}
            autoComplete="new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            onBlur={validatePassword}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "reset-password-error" : "reset-password-hint"}
            placeholder="At least 8 characters"
            className={`${authFieldClass} pr-14`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className={authRevealClass}
          >
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        {error ? (
          <p id="reset-password-error" role="alert" className="mt-1.5 px-1 text-xs font-medium text-red-700">
            {error}
          </p>
        ) : (
          <p id="reset-password-hint" className="mt-1.5 px-1 text-xs text-slate-600">
            Use {MIN_PASSWORD} characters or more.
          </p>
        )}
      </div>

      <button type="submit" disabled={busy} aria-busy={busy} className={authSubmitClass}>
        {busy && <SpinnerIcon className="h-4 w-4" />}
        {busy ? "Saving…" : "Save new password"}
      </button>
    </form>
  );
}
