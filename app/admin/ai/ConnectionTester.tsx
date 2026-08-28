"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { testConnectionAction } from "./actions";
import type { TestResult } from "./types";

function TestButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Testing…" : "Test"}
    </button>
  );
}

/**
 * Runs a real generation against one connection and shows the outcome, provider
 * error text included. This is the only surface where a failing key explains
 * itself — the public route replaces every provider error with a generic
 * message so it can't leak configuration to visitors.
 */
export default function ConnectionTester({ id }: { id: string }) {
  const [result, formAction] = useActionState<TestResult | null, FormData>(
    testConnectionAction,
    null
  );

  return (
    <div>
      <form action={formAction}>
        <input type="hidden" name="id" value={id} />
        <TestButton />
      </form>
      {result && (
        <p
          role="status"
          className={`mt-2 max-w-md break-words text-xs ${
            result.ok ? "text-emerald-700" : "text-red-700"
          }`}
        >
          <span className="font-semibold">{result.ok ? "Working" : "Failed"}</span>
          {result.ms > 0 && <span className="text-slate-500"> · {result.ms} ms</span>}
          <br />
          {result.message}
        </p>
      )}
    </div>
  );
}
