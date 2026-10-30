"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const BEAT_MS = 30_000;

/**
 * Stamps profiles.last_seen_at while an admin page is open and visible, which
 * is what turns the chat widget's header to "Online now" for visitors. Renders
 * nothing. Fails silently before migration 0009 adds the column.
 */
export default function AdminPresence({ userId }: { userId: string | null }) {
  useEffect(() => {
    if (!userId) return;
    const supabase = createClient();
    const beat = () => {
      if (document.visibilityState !== "visible") return;
      void supabase
        .from("profiles")
        .update({ last_seen_at: new Date().toISOString() })
        .eq("id", userId);
    };
    beat();
    const timer = setInterval(beat, BEAT_MS);
    document.addEventListener("visibilitychange", beat);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", beat);
    };
  }, [userId]);
  return null;
}
