import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Saved receipts",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SavedReceiptsPage() {
  if (!supabaseConfigured) redirect("/account");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account/receipts");

  const { data: receipts } = await supabase
    .from("receipts")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Link href="/account" className="text-sm text-slate-500 hover:text-slate-700">
        ← Account
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Saved receipts</h1>

      {!receipts || receipts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
          <p className="text-slate-500">No saved receipts yet.</p>
          <Link
            href="/create"
            className="mt-4 inline-block rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Create one
          </Link>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {receipts.map((r) => (
            <li key={r.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-slate-800">{r.title ?? "Untitled receipt"}</p>
                <p className="text-xs text-slate-400">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </div>
              <Link
                href={`/create?receipt=${r.id}`}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Open
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
