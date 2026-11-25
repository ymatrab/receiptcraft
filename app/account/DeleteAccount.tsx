"use client";

import { useActionState, useEffect, useState } from "react";
import { eventIdentity } from "@/lib/analytics";
import { deleteAccountAction, type DeleteAccountState } from "./actions";

/**
 * "Delete my account", folded away at the bottom of /account.
 *
 * One deliberate step — type DELETE — rather than a dialog chain: it has to be
 * hard to do by accident and easy to do on purpose. The browser's anonymous
 * analytics id rides along so the events recorded before sign-in go too.
 */
export default function DeleteAccount({ hasPro }: { hasPro: boolean }) {
  const [state, formAction, pending] = useActionState<DeleteAccountState, FormData>(
    deleteAccountAction,
    null
  );
  const [open, setOpen] = useState(false);
  const [anonymousId, setAnonymousId] = useState("");

  useEffect(() => {
    try {
      setAnonymousId(eventIdentity().anonymous_id);
    } catch {
      /* storage unavailable — signed-out events simply stay anonymous */
    }
  }, []);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 cursor-pointer items-center rounded-full px-4 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        Delete my account
      </button>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl border border-red-200 bg-red-50/60 p-5">
      <h3 className="text-base font-semibold text-red-900">Delete your account</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-900">
        <li>Your saved receipts, chat history, usage and newsletter subscription are deleted.</li>
        {hasPro && <li>Your Pro access ends now and nothing is charged again. Unused time is not refunded.</li>}
        <li>Payment records stay with Stripe, as tax law requires.</li>
        <li>This cannot be undone.</li>
      </ul>
      <input type="hidden" name="anonymous_id" value={anonymousId} />
      <label htmlFor="delete-confirm" className="mt-4 block text-sm font-medium text-red-900">
        Type DELETE to confirm
      </label>
      <input
        id="delete-confirm"
        name="confirm"
        autoComplete="off"
        className="mt-1.5 w-full max-w-xs rounded-full border border-red-300 bg-white px-4 py-2.5 text-base text-slate-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm"
      />
      {state?.error && (
        <p role="alert" className="mt-2 text-sm font-medium text-red-800">
          {state.error}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer rounded-full bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Deleting…" : "Delete my account"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Keep my account
        </button>
      </div>
    </form>
  );
}
