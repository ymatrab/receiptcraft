"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { AccountStatus } from "@/lib/auth";
import { analytics } from "@/lib/analytics";
import { SITE } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";
import { SpinnerIcon } from "@/components/Icons";

/**
 * Post-purchase landing page. Stripe's success_url (and Shopify's thank-you
 * URL) point here.
 *
 * Three ways in:
 *  - a signed-in Stripe buyer: the server already granted the pass; this polls
 *    /api/me until Pro shows.
 *  - a guest Stripe buyer (paid without an account): this POSTs to
 *    /pro-activating/claim, which grants the pass to the account for the
 *    checkout email and, when that account was created by this purchase,
 *    signs the browser in to it.
 *  - Shopify: Pro is granted by hand, so the copy promises no duration.
 *
 * Every branch ends somewhere concrete: nobody who has just been charged is
 * left guessing.
 */

// Poll briskly at first in case the grant is already in, then back off rather
// than hammering /api/me forever on a tab someone left open.
const FAST_INTERVAL_MS = 3000;
const SLOW_INTERVAL_MS = 15000;
const FAST_WINDOW_MS = 60000;
/** When to stop asking someone to sit and watch, and hand them a way out. */
const PATIENCE_MS = 45000;
/** Guest claims answer "pending" while a delayed payment clears. */
const CLAIM_RETRIES = 10;

type Phase = "waiting" | "active" | "slow" | "signed-out" | "existing";

const planLabel = (plan: string | null) =>
  plan ? plan.replace("pro_", "").replace(/^\w/, (c) => c.toUpperCase()) : null;

/**
 * `sessionId` is set when Stripe sent the buyer here; `guest` when that
 * checkout was opened without an account.
 */
export default function ProActivating({ sessionId, guest = false }: { sessionId?: string; guest?: boolean }) {
  const automatic = Boolean(sessionId);
  const [phase, setPhase] = useState<Phase>("waiting");
  const [plan, setPlan] = useState<string | null>(null);
  /** The guest claim created and signed in to a new account — offer a password. */
  const [newAccount, setNewAccount] = useState(false);
  /** The guest claim could not grant here; the webhook will. */
  const [claimFailed, setClaimFailed] = useState(false);
  const startedAt = useRef(Date.now());
  const reported = useRef(false);

  const markActive = (p: string | null) => {
    setPlan(p);
    setPhase("active");
    if (!reported.current) {
      reported.current = true;
      analytics.proActivated(Math.round((Date.now() - startedAt.current) / 1000));
    }
  };

  useEffect(() => {
    analytics.purchaseLanded();

    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    async function claim(attempt: number) {
      if (!active) return;
      try {
        const res = await fetch("/pro-activating/claim", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = (await res.json().catch(() => null)) as
          | { status?: string; plan?: string; newAccount?: boolean }
          | null;
        if (!active) return;

        if (data?.status === "signed_in") {
          setNewAccount(Boolean(data.newAccount));
          markActive(data.plan ?? null);
          return;
        }
        if (data?.status === "existing_account") {
          setPlan(data.plan ?? null);
          setPhase("existing");
          return;
        }
        if (data?.status === "pending" && attempt < CLAIM_RETRIES) {
          timer = setTimeout(() => claim(attempt + 1), FAST_INTERVAL_MS);
          return;
        }
      } catch {
        if (!active) return;
        if (attempt < CLAIM_RETRIES) {
          timer = setTimeout(() => claim(attempt + 1), FAST_INTERVAL_MS);
          return;
        }
      }
      // Could not grant from here. The payment is safe and the webhook grants
      // it to the account for the checkout email.
      setClaimFailed(true);
      setPhase("existing");
    }

    async function check() {
      if (!active) return;
      const elapsed = Date.now() - startedAt.current;

      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const data: AccountStatus | null = res.ok ? await res.json() : null;

        if (!active) return;

        if (data?.isPro) {
          markActive(data.plan);
          return; // stop polling
        }

        // Signed out is its own problem: the grant attaches to an account, so
        // there is nothing to wait for until they sign in.
        if (data && !data.isLoggedIn) {
          setPhase("signed-out");
          return;
        }

        setPhase(elapsed > PATIENCE_MS ? "slow" : "waiting");
      } catch {
        // A failed poll is not a failed purchase — keep waiting quietly.
      }

      if (!active) return;
      timer = setTimeout(check, elapsed > FAST_WINDOW_MS ? SLOW_INTERVAL_MS : FAST_INTERVAL_MS);
    }

    if (guest && sessionId) claim(0);
    else check();
    return () => {
      active = false;
      clearTimeout(timer);
    };
    // Runs once per landing; markActive only touches state and refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "active") {
    const label = planLabel(plan);
    return (
      <Card
        tone="success"
        title="Pro is active"
        body={
          label
            ? `Your ${label} pass is on. Downloads are watermark-free from now on.`
            : "Downloads are watermark-free from now on."
        }
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {/* The builder restored the autosaved draft and picks up the export
              left waiting in rc_pending_export, so this lands on their receipt.
              A full load, not a client navigation: a guest was signed in a
              moment ago and the header should render with that session. */}
          <a
            href="/create"
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to your receipt
          </a>
          <Link
            href="/account"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            View your account
          </Link>
        </div>
        {newAccount && <SetPassword />}
      </Card>
    );
  }

  if (phase === "existing") {
    const label = planLabel(plan);
    return (
      <Card
        tone="warn"
        title="Thanks — your payment went through"
        body={
          claimFailed
            ? "Pro is being added to the account for the email you paid with. Sign in with that email to download without the watermark — if you have never set a password, use “Forgot password” or continue with Google."
            : `${label ? `Your ${label} pass` : "Pro"} was added to the account for the email you paid with. Sign in to it to download without the watermark — if you have never set a password, use “Forgot password” or continue with Google.`
        }
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/login?next=/create"
            rel="nofollow"
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Sign in
          </Link>
        </div>
        <SupportNote />
      </Card>
    );
  }

  if (phase === "signed-out") {
    return (
      <Card
        tone="warn"
        title="Thanks — your payment went through"
        body={
          automatic
            ? "Pro attaches to the account you were signed in with when you paid. Sign in to it and Pro will be there."
            : "Pro attaches to your account, so sign in with the email you used at checkout and it will appear."
        }
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`/login?next=${encodeURIComponent(
              sessionId ? `/pro-activating?session_id=${sessionId}` : "/pro-activating"
            )}`}
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Sign in
          </Link>
        </div>
        <SupportNote />
      </Card>
    );
  }

  if (phase === "slow") {
    return (
      <Card
        tone="warn"
        title="Your payment went through — Pro is being switched on"
        body={
          automatic
            ? "This is taking longer than usual. Your payment is safe and recorded, and Pro attaches to your account as soon as Stripe confirms it — there is no need to keep this page open."
            : "Our team activates each purchase by hand, so this can take a little while. Your payment is safe and recorded, and Pro attaches to your account the moment it is on — there is no need to keep this page open."
        }
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/account"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Check your account
          </Link>
        </div>
        <SupportNote />
      </Card>
    );
  }

  return (
    <Card
      tone="waiting"
      title="Thanks — setting up your Pro access"
      body={
        automatic
          ? "Confirming your payment with Stripe — this usually takes a few seconds."
          : "Our team switches each purchase on by hand. This page updates on its own if it lands while you're here, and your account keeps the access either way."
      }
    >
      <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500">
        <SpinnerIcon className="h-4 w-4" />
        Waiting for confirmation…
      </p>
    </Card>
  );
}

/**
 * Optional: keep access to the account a guest checkout just created.
 *
 * The account has no password, so without one the buyer can only come back
 * through Google (same email) or "Forgot password". The browser is signed in
 * at this point, so updateUser sets it directly.
 */
function SetPassword() {
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "saving") return;
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    setError(null);
    setState("saving");
    const { error: updateError } = await createClient().auth.updateUser({ password });
    if (updateError) {
      setState("idle");
      setError(updateError.message || "Couldn't save the password. Try again.");
      return;
    }
    setState("saved");
    setPassword("");
  }

  return (
    <div className="mx-auto mt-8 max-w-sm border-t border-emerald-100 pt-6 text-left">
      <h2 className="text-sm font-semibold text-slate-900">Keep access: set a password</h2>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">
        Optional. Your account uses the email you paid with. You can also sign in later with
        Google using the same email, or with “Forgot password”.
      </p>
      {state === "saved" ? (
        <p role="status" className="mt-3 text-sm font-medium text-emerald-700">
          Password saved.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="new-password" className="sr-only">
            New password
          </label>
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "new-password-error" : undefined}
            placeholder="At least 8 characters"
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <button
            type="submit"
            disabled={state === "saving"}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {state === "saving" ? "Saving…" : "Save password"}
          </button>
        </form>
      )}
      {error && (
        <p id="new-password-error" role="alert" className="mt-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function SupportNote() {
  return (
    <p className="mt-6 border-t border-slate-100 pt-5 text-sm text-slate-500">
      Still nothing? Email{" "}
      <a
        href={`mailto:${SITE.email}`}
        className="font-medium text-indigo-600 hover:underline"
      >
        {SITE.email}
      </a>{" "}
      with the email you paid with and we&apos;ll sort it within one business day.
    </p>
  );
}

function Card({
  tone,
  title,
  body,
  children,
}: {
  tone: "waiting" | "success" | "warn";
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  const ring =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50/40"
      : tone === "warn"
        ? "border-amber-200 bg-amber-50/40"
        : "border-slate-200 bg-white";

  return (
    <div className={`rounded-3xl border ${ring} p-8 text-center shadow-sm sm:p-10`}>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-slate-600">{body}</p>
      {children}
    </div>
  );
}
