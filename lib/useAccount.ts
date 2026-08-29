"use client";

import { useEffect, useState } from "react";
import type { AccountStatus } from "@/lib/auth";

const ANON: AccountStatus = {
  userId: null,
  email: null,
  isLoggedIn: false,
  isPro: false,
  isAdmin: false,
  plan: null,
};

/**
 * How long a resolved status is reused before the next mount refetches it.
 * Short enough that a plan change still surfaces without a reload, long enough
 * that one page view costs one request.
 */
const TTL_MS = 30_000;

let cached: { value: AccountStatus; at: number } | null = null;
let inflight: Promise<AccountStatus> | null = null;

/**
 * Resolve the account status, at most one request at a time.
 *
 * Header and ChatWidget both sit in the root layout, and the builder and the
 * pricing CTA mount alongside them, so every consumer used to fire its own
 * fetch: two /api/me requests on an ordinary page, three on /create and
 * /pricing. That route is force-dynamic and no-store, and each call re-runs
 * auth.getUser() plus two queries, so the duplicates were pure latency on
 * every page view. Callers now share one request and its result.
 */
function load(): Promise<AccountStatus> {
  if (cached !== null && Date.now() - cached.at < TTL_MS) {
    return Promise.resolve(cached.value);
  }
  if (inflight) return inflight;
  inflight = fetch("/api/me")
    .then((r) => (r.ok ? r.json() : ANON))
    .catch(() => ANON)
    .then((value: AccountStatus) => {
      cached = { value, at: Date.now() };
      return value;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/**
 * Client hook that reads the current account status. Defaults to anonymous
 * (watermarked, free limits) until resolved, so gating fails safe.
 */
export function useAccount(): { account: AccountStatus; loading: boolean } {
  const [account, setAccount] = useState<AccountStatus>(ANON);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void load().then((value) => {
      if (!active) return;
      setAccount(value);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return { account, loading };
}
