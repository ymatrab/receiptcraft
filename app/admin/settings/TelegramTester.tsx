"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { testTelegramAction } from "./actions";
import type { TelegramTestResult } from "./types";

function TestButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send test message"}
    </button>
  );
}

/**
 * Sends one real message through the bot and reports what Telegram said.
 *
 * Worth a button rather than a log line: every failure mode here — a typo in
 * the token, a chat id the bot was never introduced to, a bot the user later
 * blocked — looks identical from the outside (nothing arrives), and only
 * Telegram's own description tells them apart.
 */
export default function TelegramTester() {
  const [result, formAction] = useActionState<TelegramTestResult | null, FormData>(
    testTelegramAction,
    null
  );

  return (
    <div className="mt-4">
      <form action={formAction}>
        <TestButton />
      </form>
      {result && (
        <p
          role="status"
          className={`mt-3 max-w-md break-words text-xs ${
            result.ok ? "text-emerald-700" : "text-red-700"
          }`}
        >
          <span className="font-semibold">{result.ok ? "Delivered" : "Failed"}</span>
          <br />
          {result.message}
        </p>
      )}
    </div>
  );
}
