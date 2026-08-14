import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { SITE } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";

// Bare /login is indexable on purpose: downloads require an account now, so
// "makecepeit login" is a real branded query and Bing flags the page as
// important. But the header appends ?next=<current-path> to the log-in link on
// every page, so Googlebot discovers an endless supply of /login?next=… URLs
// that are pure duplicates of /login with no standalone value — exactly what
// Search Console flags as "Duplicate without user-selected canonical". We
// noindex those variants (canonical still points at /login, so link equity
// lands on the one page we want indexed) while keeping bare /login in the index.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}): Promise<Metadata> {
  const { next } = await searchParams;
  const hasNext = typeof next === "string" && next.length > 0;
  return {
    title: "Log in",
    description: `Log in to ${SITE.name} to download your receipts, manage your Pro subscription and saved templates, and get support. New here? An account takes seconds to create.`,
    alternates: { canonical: "/login" },
    ...(hasNext ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  // Already signed in? There's nothing to log into — send them on. Honour a
  // safe internal `next` if present, otherwise drop them into the builder.
  if (await getCurrentUser()) {
    const { next } = await searchParams;
    const dest =
      next && next.startsWith("/") && !next.startsWith("/login") ? next : "/create";
    redirect(dest);
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Welcome to {SITE.name}</h1>
        <p className="mt-2 text-sm text-slate-500">
          Log in to go Pro, manage billing, and save your receipts. The free
          builder works without an account.
        </p>
        <Suspense fallback={<div className="mt-8 h-12 animate-pulse rounded-full bg-slate-100" />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
