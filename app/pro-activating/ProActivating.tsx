"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { AccountStatus } from "@/lib/auth";
import { analytics } from "@/lib/analytics";
import { SITE } from "@/lib/site";
import { SpinnerIcon } from "@/components/Icons";

/**
 * Post-purchase landing page. Shopify's thank-you URL points here.
 *
 * The webhook grants Pro within a minute, but "within a minute" is an eternity
 * to someone who has just been charged and can see nothing for it. So this polls
 * rather than asking them to refresh, and every branch ends somewhere concrete —
 * never a dead end that leaves a paying customer guessing.
 */

// Poll briskly while the webhook is most likely to land, then back off rather
// than hammering /api/me forever on a tab someone left open.
const FAST_INTERVAL_MS = 3000;
const SLOW_INTERVAL_MS = 15000;
const FAST_WINDOW_MS = 60000;
/** When to stop promising and start offering a way out. */
const PATIENCE_MS = 90000;

type Phase = "waiting" | "active" | "slow" | "signed-out";

export default function ProActivating() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [plan, setPlan] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const reported = useRef(false);

  useEffect(() => {
    analytics.purchaseLanded();

    let active = true;
    let timer: ReturnType<typeof setTimeout>;

    async function check() {
      if (!active) return;
      const elapsed = Date.now() - startedAt.current;

      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const data: AccountStatus | null = res.ok ? await res.json() : null;

        if (!active) return;

        if (data?.isPro) {
          setPlan(data.plan);
          setPhase("active");
          if (!reported.current) {
            reported.current = true;
            analytics.proActivated(Math.round(elapsed / 1000));
          }
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

    check();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  if (phase === "active") {
    return (
      <Card
        tone="success"
        title="Pro is active — you're all set"
        body={
          plan
            ? `Your ${plan.replace("pro_", "").replace(/^\w/, (c) => c.toUpperCase())} pass is on. Downloads are watermark-free from now on.`
            : "Downloads are watermark-free from now on."
        }
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/create"
            className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Start building
          </Link>
          <Link
            href="/account"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            View your account
          </Link>
        </div>
      </Card>
    );
  }

  if (phase === "signed-out") {
    return (
      <Card
        tone="warn"
        title="Thanks — your payment went through"
        body="Pro attaches to your account, so sign in with the email you used at checkout and it will appear."
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/login?next=/pro-activating"
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
        title="Your payment went through — activation is taking longer than usual"
        body="This is normally under a minute. Your purchase is safe and recorded; it may just need a moment, or a quick hand from us."
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
      body="This usually takes under a minute. The page updates on its own, so there's no need to refresh."
    >
      <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500">
        <SpinnerIcon className="h-4 w-4" />
        Waiting for confirmation…
      </p>
    </Card>
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
