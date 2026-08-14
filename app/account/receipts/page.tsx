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
      <Link href="/account" className="text-sm text-ink-soft hover:text-ink">
        ← Account
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-ink">Saved receipts</h1>

      {!receipts || receipts.length === 0 ? (
        <div className="mt-8 rounded-[3px] border border-dashed border-rule p-10 text-center">
          <p className="text-ink-soft">No saved receipts yet.</p>
          <Link
            href="/create"
            className="mt-4 inline-block rounded-full bg-ledger px-5 py-2.5 text-sm font-semibold text-white hover:bg-ledger-deep"
          >
            Create one
          </Link>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-rule overflow-hidden rounded-[3px] border border-rule bg-card">
          {receipts.map((r) => (
            <li key={r.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-ink">{r.title ?? "Untitled receipt"}</p>
                <p className="text-xs text-ink-soft/70">
                  {new Date(r.created_at).toLocaleString()}
                </p>
              </div>
              <Link
                href={`/create?receipt=${r.id}`}
                className="text-sm font-semibold text-ledger hover:text-ledger-deep"
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
