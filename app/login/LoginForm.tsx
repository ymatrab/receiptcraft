"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/config";
import { analytics } from "@/lib/analytics";
import { EyeIcon, EyeOffIcon, SpinnerIcon } from "@/components/Icons";
import {
  authFieldClass,
  authLabelClass,
  authRevealClass,
  authSubmitClass,
} from "@/lib/form-styles";

type Mode = "login" | "signup" | "forgot";
const MIN_PASSWORD = 8;

// Show "Continue with Google" only once the provider is actually configured in
// Supabase. Flip NEXT_PUBLIC_GOOGLE_AUTH_ENABLED="true" in Vercel to enable it —
// no code change needed. Hidden by default so we never show a dead button.
const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";

/**
 * Turn a Supabase auth error into something a person can act on.
 *
 * Its client stringifies any error body it does not recognise, so a failure can
 * surface as the literal string "{}" — which is what a real signup showed:
 * an empty red box, and the actual reason lost. Never render that. Map the
 * known cases, and when the message is empty or structural, say something
 * useful and put the raw error in the console for whoever debugs it next.
 */
function authErrorMessage(err: { message?: string } | null | undefined): string {
  const raw = (err?.message ?? "").trim();
  // eslint-disable-next-line no-console
  console.error("[auth]", err);

  if (/rate limit|too many requests/i.test(raw)) {
    return "Too many attempts just now. Wait a minute and try again.";
  }
  if (/already registered|already been registered/i.test(raw)) {
    return "That email is already registered. Try logging in instead.";
  }
  if (/invalid.*email|email.*invalid/i.test(raw)) {
    return "That email address was rejected. Check it for typos — double dots and trailing dots are not allowed.";
  }
  if (/signups? not allowed|disabled/i.test(raw)) {
    return "New sign-ups are turned off right now. Please contact support.";
  }
  if (/password/i.test(raw) && /weak|short|least/i.test(raw)) {
    return "That password is too weak — use 8 characters or more.";
  }
  // Empty, "{}", or anything else carrying no actual words.
  if (!/[a-z]/i.test(raw)) {
    return "Sign-up failed, and the server didn't say why. Check your email address for typos, or try Continue with Google.";
  }
  return raw;
}

/**
 * The query params arrive as props from the server page rather than from the
 * client-side search-params hook. That hook forces this component under a
 * <Suspense> boundary, and a suspended boundary is not plain HTML: React
 * ships the form inside a hidden <div> and only swaps it into place from an
 * inline script, scheduled with requestAnimationFrame. Anything that stops
 * that frame from running - a background tab, a blocked inline script, JS
 * turned off - leaves the visitor looking at the loading skeleton with no
 * form at all, for as long as they stay on the page. Reading the params on
 * the server puts the real form in the initial HTML, where it renders before
 * any client JS is involved.
 */
export default function LoginForm({
  next: nextParam = null,
  authError = null,
  authErrorDetail = null,
}: {
  next?: string | null;
  authError?: string | null;
  authErrorDetail?: string | null;
}) {
  // Default back to the builder (not the profile page) so a user who logged in
  // mid-build lands on /create, where their autosaved draft is restored.
  // A ?next= param means the visitor was sent here by a gated action (usually
  // the download wall), so they are far more likely to be new than returning —
  // open on signup to save them a click. The log-in toggle is still one tap away.
  const next = nextParam ?? "/create";
  /**
   * Where a brand-new account lands: their original destination, flagged so the
   * welcome sheet fires once there. Built with URL so a `next` that already
   * carries a query string keeps it instead of being truncated.
   */
  function withWelcome(dest: string): string {
    try {
      const url = new URL(dest, window.location.origin);
      url.searchParams.set("welcome", "1");
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return dest;
    }
  }
  const hadError = authError;
  const errorDetail = authErrorDetail;

  const [mode, setMode] = useState<Mode>(nextParam ? "signup" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [googleBusy, setGoogleBusy] = useState(false);
  const [busy, setBusy] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Field-level messages, rendered under the input they belong to rather than
  // in the shared block above the submit button. The form is noValidate so we
  // own every message — mixing native browser bubbles with inline errors gives
  // the same form two different error presentations.
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  // Set once a verification email is sent — replaces the form with a prompt.
  const [verifyEmail, setVerifyEmail] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const verifyPanelRef = useRef<HTMLDivElement>(null);

  const redirectTo = `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback?next=${encodeURIComponent(next)}`;

  // The verify panel replaces the whole form, which is a navigation-sized
  // change with no page load — move focus to it so screen reader users are
  // told what happened instead of being left on a button that no longer exists.
  useEffect(() => {
    if (verifyEmail) verifyPanelRef.current?.focus();
  }, [verifyEmail]);

  function clearMessages() {
    setError(null);
    setNotice(null);
    setPwError(null);
    setEmailError(null);
  }

  function validateEmail() {
    const value = email.trim();
    if (value.length === 0) {
      setEmailError(null);
      return true;
    }
    // Deliberately loose: the only reliable test of an address is sending to
    // it, so this catches typos (missing @, missing domain) without rejecting
    // valid-but-unusual addresses.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Enter a valid email address, like you@example.com.");
      return false;
    }
    // Consecutive, leading or trailing dots in the local part are invalid per
    // RFC 5322, and the server rejects them — but it did so with an empty body,
    // leaving the user staring at a blank error. Catch the typo here, where we
    // can actually name it.
    const local = value.slice(0, value.lastIndexOf("@"));
    if (local.includes("..") || local.startsWith(".") || local.endsWith(".")) {
      setEmailError("Remove the extra dot — an address can't contain \"..\" or start or end with a dot.");
      return false;
    }
    setEmailError(null);
    return true;
  }

  // Validate on blur, not on every keystroke: flagging "too short" while
  // someone is still typing their password is noise, not help.
  function validatePassword() {
    if (mode === "forgot" || password.length === 0) {
      setPwError(null);
      return true;
    }
    if (password.length < MIN_PASSWORD) {
      setPwError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return false;
    }
    setPwError(null);
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    clearMessages();

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setEmailError("Enter your email address.");
      emailRef.current?.focus();
      return;
    }
    if (!validateEmail()) {
      emailRef.current?.focus();
      return;
    }

    const supabase = createClient();

    // Forgot password — email only, no password field involved.
    if (mode === "forgot") {
      setBusy(true);
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset`,
      });
      setBusy(false);
      if (error) {
        setError(authErrorMessage(error));
        emailRef.current?.focus();
      } else {
        setNotice(`If an account exists for ${cleanEmail}, a reset link is on its way.`);
      }
      return;
    }

    if (password.length < MIN_PASSWORD) {
      setPwError(`Password must be at least ${MIN_PASSWORD} characters.`);
      passwordRef.current?.focus();
      return;
    }

    setBusy(true);

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: { emailRedirectTo: redirectTo },
      });
      setBusy(false);
      if (error) {
        setError(authErrorMessage(error));
        emailRef.current?.focus();
        return;
      }
      // When email confirmation is on, Supabase returns a user with an empty
      // identities array if the email is already registered.
      if (data.user && data.user.identities?.length === 0) {
        setError("That email is already registered. Try logging in instead.");
        setMode("login");
        passwordRef.current?.focus();
        return;
      }
      analytics.signUp("password");
      // With email confirmation disabled in Supabase, signUp returns a live
      // session — the user is already signed in, so showing them a "check your
      // inbox" wall would strand them on a screen they cannot clear.
      if (data.session) {
        window.location.assign(withWelcome(next));
        return;
      }
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
      // Send focus back to the first field the user needs to correct.
      passwordRef.current?.focus();
      return;
    }
    analytics.signIn("password");
    // Hard navigation so the server picks up the freshly-set session cookies.
    window.location.assign(next);
  }

  async function resendVerification() {
    if (!verifyEmail || resendBusy) return;
    setError(null);
    setNotice(null);
    setResendBusy(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: verifyEmail,
      options: { emailRedirectTo: redirectTo },
    });
    setResendBusy(false);
    if (error) setError(authErrorMessage(error));
    else setNotice("Verification email resent.");
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
      setError(`Sign-in failed: ${authErrorMessage(error)}`);
    }
    // On success the browser is redirected to the provider.
  }

  if (!supabaseConfigured) {
    return (
      <p role="alert" className="mt-8 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Login isn&apos;t enabled yet — the backend keys haven&apos;t been added.
      </p>
    );
  }

  // Post-signup: ask the user to confirm their email.
  if (verifyEmail) {
    return (
      <div className="mt-8 space-y-3">
        <div
          ref={verifyPanelRef}
          tabIndex={-1}
          role="status"
          className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          Almost there — we sent a verification link to <strong>{verifyEmail}</strong>.
          Click it and we&apos;ll sign you in automatically — no need to come back here.
          <span className="mt-2 block">
            Open it in <strong>this same browser</strong> so the receipt you were working on
            is still waiting for you.
          </span>
        </div>
        {notice && (
          <p role="status" className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {notice}
          </p>
        )}
        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={resendVerification}
          disabled={resendBusy}
          aria-busy={resendBusy}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {resendBusy && <SpinnerIcon className="h-4 w-4" />}
          {resendBusy ? "Sending…" : "Resend verification email"}
        </button>
        <button
          type="button"
          onClick={() => {
            setVerifyEmail(null);
            setMode("login");
            clearMessages();
          }}
          className="w-full cursor-pointer rounded-full py-2 text-center text-sm font-medium text-indigo-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Back to log in
        </button>
      </div>
    );
  }

  const submitLabel = busy
    ? mode === "signup"
      ? "Creating account…"
      : mode === "forgot"
        ? "Sending…"
        : "Logging in…"
    : mode === "signup"
      ? "Create account"
      : mode === "forgot"
        ? "Send reset link"
        : "Log in";

  return (
    <div className="mt-8 space-y-3">
      {hadError && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Sign-in didn&apos;t complete. Please try again.
          {errorDetail && (
            <span className="mt-1 block text-xs text-red-600">{errorDetail}</span>
          )}
        </p>
      )}

      {/* Email + password */}
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label htmlFor="login-email" className={authLabelClass}>
            Email address
          </label>
          <input
            id="login-email"
            ref={emailRef}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
            onBlur={validateEmail}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? "login-email-error" : undefined}
            placeholder="you@example.com"
            className={authFieldClass}
          />
          {emailError && (
            <p id="login-email-error" role="alert" className="mt-1.5 px-1 text-xs font-medium text-red-700">
              {emailError}
            </p>
          )}
        </div>

        {mode === "forgot" ? (
          <p className="px-1 text-xs text-slate-600">
            Enter your account email and we&apos;ll send you a link to set a new password.
          </p>
        ) : (
          <div>
            <label htmlFor="login-password" className={authLabelClass}>
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                required
                minLength={MIN_PASSWORD}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (pwError) setPwError(null);
                }}
                onBlur={validatePassword}
                aria-invalid={pwError ? true : undefined}
                aria-describedby={
                  pwError ? "login-password-error" : mode === "signup" ? "login-password-hint" : undefined
                }
                placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
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
            {pwError ? (
              <p id="login-password-error" role="alert" className="mt-1.5 px-1 text-xs font-medium text-red-700">
                {pwError}
              </p>
            ) : mode === "signup" ? (
              <p id="login-password-hint" className="mt-1.5 px-1 text-xs text-slate-600">
                Use {MIN_PASSWORD} characters or more.
              </p>
            ) : null}
          </div>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-900">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          className={authSubmitClass}
        >
          {busy && <SpinnerIcon className="h-4 w-4" />}
          {submitLabel}
        </button>
      </form>

      {mode === "forgot" ? (
        <button
          type="button"
          onClick={() => {
            setMode("login");
            clearMessages();
          }}
          className="block w-full cursor-pointer rounded-full py-2 text-center text-sm font-medium text-indigo-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          ← Back to log in
        </button>
      ) : (
        <div className="flex items-center justify-between gap-2 text-sm">
          <button
            type="button"
            onClick={() => {
              setMode((m) => (m === "login" ? "signup" : "login"));
              clearMessages();
            }}
            className="cursor-pointer rounded-full px-1 py-2 font-medium text-indigo-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {mode === "login" ? "New here? Create an account" : "Have an account? Log in"}
          </button>
          {mode === "login" && (
            <button
              type="button"
              onClick={() => {
                setMode("forgot");
                clearMessages();
              }}
              className="cursor-pointer rounded-full px-1 py-2 text-slate-600 hover:text-slate-900 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Forgot password?
            </button>
          )}
        </div>
      )}

      {mode !== "forgot" && (
        <>
          {googleEnabled && (
            <>
              <div className="flex items-center gap-3 py-1">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-xs uppercase tracking-wide text-slate-500">or</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <button
                type="button"
                onClick={signInWithGoogle}
                disabled={googleBusy}
                aria-busy={googleBusy}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {googleBusy ? <SpinnerIcon className="h-5 w-5" /> : <GoogleIcon />}
                {googleBusy ? "Redirecting…" : "Continue with Google"}
              </button>
            </>
          )}
          <p className="pt-2 text-center text-xs leading-relaxed text-slate-600">
            By continuing you agree to our{" "}
            <a href="/terms" className="underline hover:text-slate-900">Terms</a> and{" "}
            <a href="/privacy" className="underline hover:text-slate-900">Privacy Policy</a>.
          </p>
        </>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
