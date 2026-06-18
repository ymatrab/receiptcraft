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
 * Client hook that fetches the current account status from /api/me. Defaults to
 * anonymous (watermarked, free limits) until resolved, so gating fails safe.
 */
export function useAccount(): { account: AccountStatus; loading: boolean } {
  const [account, setAccount] = useState<AccountStatus>(ANON);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : ANON))
      .then((data: AccountStatus) => {
        if (active) setAccount(data);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { account, loading };
}
