import Link from "next/link";
import { getPaymentLinks } from "@/lib/settings";
import { saveLinksAction } from "./actions";

export const dynamic = "force-dynamic";

const field =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30";
const label = "mb-1 block text-xs font-medium text-slate-600";

export default async function AdminSettings() {
  const links = await getPaymentLinks();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

      {/* AI provider — now a list of failover connections on its own page. */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">AI receipt generator</h2>
        <p className="mt-1 text-sm text-slate-500">
          Providers, models and API keys now live on their own page, where several can be
          stacked so a dead key falls through to the next one.
        </p>
        <Link
          href="/admin/ai"
          className="mt-4 inline-block rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Manage AI connections
        </Link>
      </section>

      {/* Checkout links */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Checkout links</h2>
        <p className="mt-1 text-sm text-slate-500">
          Paste your checkout URLs (Stripe Payment Links or a Shopify product/checkout link).
          The pricing page sends buyers here. With Shopify, grant the buyer Pro from the
          Members tab after their order — it won&apos;t sync automatically.
        </p>
        <form action={saveLinksAction} className="mt-4 space-y-4">
          <div>
            <label className={label} htmlFor="weekly">Weekly link</label>
            <input id="weekly" name="weekly" defaultValue={links.weekly ?? ""} className={field} placeholder="https://buy.stripe.com/..." />
          </div>
          <div>
            <label className={label} htmlFor="monthly">Monthly link</label>
            <input id="monthly" name="monthly" defaultValue={links.monthly ?? ""} className={field} placeholder="https://buy.stripe.com/..." />
          </div>
          <div>
            <label className={label} htmlFor="yearly">Yearly link</label>
            <input id="yearly" name="yearly" defaultValue={links.yearly ?? ""} className={field} placeholder="https://buy.stripe.com/..." />
          </div>
          <button type="submit" className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
            Save payment links
          </button>
        </form>
      </section>
    </div>
  );
}
