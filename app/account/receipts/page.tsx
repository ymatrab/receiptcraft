import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";
import LocalDate from "@/components/LocalDate";
import { deleteReceiptAction } from "../actions";

export const metadata: Metadata = {
  title: "Saved receipts",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Cap on rows fetched in one go. The query had no limit at all, so an account
 * with hundreds of receipts pulled and rendered every one of them.
 */
const PAGE_SIZE = 50;

export default async function SavedReceiptsPage() {
  if (!supabaseConfigured) redirect("/account");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account/receipts");

  const { data: receipts, count } = await supabase
    .from("receipts")
    .select("id, title, created_at", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  const total = count ?? receipts?.length ?? 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Link
        href="/account"
        className="inline-flex h-11 items-center text-sm text-slate-600 hover:text-slate-900"
      >
        ← Account
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Saved receipts</h1>
      {total > 0 && (
        <p className="mt-1 text-slate-600">
          {total === 1 ? "1 receipt" : `${total} receipts`}
          {total > PAGE_SIZE && ` · showing the ${PAGE_SIZE} most recent`}
        </p>
      )}

      {!receipts || receipts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
          <p className="text-slate-600">No saved receipts yet.</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
            Save a receipt from the builder and it will appear here, ready to reopen or
            re-download.
          </p>
          <Link
            href="/create"
            className="mt-5 inline-block rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Create one
          </Link>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {receipts.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-800">
                  {r.title ?? "Untitled receipt"}
                </p>
                <LocalDate iso={r.created_at} withTime className="text-xs text-slate-500" />
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Link
                  href={`/create?receipt=${r.id}`}
                  className="flex h-11 items-center rounded-full px-4 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
                >
                  Open
                </Link>
                <form action={deleteReceiptAction}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="flex h-11 cursor-pointer items-center rounded-full px-4 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
