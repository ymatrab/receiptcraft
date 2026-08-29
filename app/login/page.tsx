import type { Metadata } from "next";
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
// noindex those variants while keeping bare /login in the index.
//
// The variants self-canonicalise rather than pointing at /login: pairing
// noindex with a canonical aimed at a *different* URL is a conflicting signal,
// and Google may resolve it by carrying the noindex over to the canonical
// target — /login itself, the one page we want indexed. Note we must set the
// canonical explicitly; metadata merges shallowly, so dropping `alternates`
// here would inherit the root layout's canonical of "/" and point every
// variant at the homepage. Nothing is lost by not consolidating: link equity
// from a log-in link is worth nothing, and /login is indexed off its own
// sitemap entry.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}): Promise<Metadata> {
  const { next } = await searchParams;
  const nextParam = typeof next === "string" && next.length > 0 ? next : null;
  const canonical = nextParam
    ? `/login?next=${encodeURIComponent(nextParam)}`
    : "/login";
  return {
    title: "Log in",
    description: `Log in to ${SITE.name} to download your receipts, manage your Pro subscription and saved templates, and get support. New here? An account takes seconds to create.`,
    alternates: { canonical },
    ...(nextParam ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    next?: string;
    error?: string;
    error_description?: string;
  }>;
}) {
  // Already signed in? There's nothing to log into — send them on. Honour a
  // safe internal `next` if present, otherwise drop them into the builder.
  const { next, error, error_description: errorDetail } = await searchParams;

  if (await getCurrentUser()) {
    const dest =
      next && next.startsWith("/") && !next.startsWith("/login") ? next : "/create";
    redirect(dest);
  }

  // Visitors arriving with ?next= were stopped by a gate (almost always the
  // download wall), so lead with what they were trying to do rather than with
  // "log in" — LoginForm opens on signup for exactly the same reason.
  const fromGate = Boolean(next);

  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          {fromGate ? "Create your free account" : `Welcome to ${SITE.name}`}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {fromGate
            ? "It takes about ten seconds, and your receipt is saved right where you left it. Your first 3 HD downloads are watermark-free."
            : "Log in to save your receipts and pick up where you left off. The free builder works without an account."}
        </p>
        <LoginForm
          next={typeof next === "string" && next.length > 0 ? next : null}
          authError={typeof error === "string" ? error : null}
          authErrorDetail={typeof errorDetail === "string" ? errorDetail : null}
        />
      </div>
    </main>
  );
}
