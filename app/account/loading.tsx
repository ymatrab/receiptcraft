/**
 * Shown while the account page runs its queries.
 *
 * The page is force-dynamic and waits on auth plus three counts, so navigating
 * to it previously showed nothing at all until the server answered. The shape
 * below matches the real layout — header, plan card, three stat tiles, list —
 * so the content lands in place rather than pushing the page around.
 */
function Block({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />;
}

export default function AccountLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6" aria-busy="true">
      <span className="sr-only" role="status">
        Loading your account
      </span>

      <Block className="h-9 w-56" />
      <Block className="mt-3 h-4 w-72" />

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="w-full">
            <Block className="h-4 w-24" />
            <Block className="mt-2 h-7 w-32" />
            <Block className="mt-2 h-4 w-24" />
          </div>
          <Block className="h-6 w-20 rounded-full" />
        </div>
        <div className="mt-6 flex gap-3">
          <Block className="h-10 w-36 rounded-full" />
          <Block className="h-10 w-32 rounded-full" />
        </div>
      </div>

      <Block className="mt-10 h-6 w-28" />
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Block className="h-4 w-28" />
            <Block className="mt-2 h-8 w-20" />
            <Block className="mt-2 h-3 w-32" />
          </div>
        ))}
      </div>

      <Block className="mt-10 h-6 w-36" />
      <div className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between px-5 py-4">
            <div>
              <Block className="h-4 w-40" />
              <Block className="mt-2 h-3 w-28" />
            </div>
            <Block className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}
