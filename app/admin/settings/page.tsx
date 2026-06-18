import { getAiConfigPublic, getPaymentLinks, DEFAULT_MODELS } from "@/lib/settings";
import { saveAiAction, saveLinksAction } from "./actions";

export const dynamic = "force-dynamic";

const PROVIDERS: { value: string; label: string }[] = [
  { value: "google", label: "Google Gemini (free tier available)" },
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic (Claude)" },
];

const field = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none";
const label = "mb-1 block text-xs font-medium text-slate-600";

export default async function AdminSettings() {
  const [links, ai] = await Promise.all([getPaymentLinks(), getAiConfigPublic()]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

      {/* AI provider */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">AI receipt generator</h2>
        <p className="mt-1 text-sm text-slate-500">
          Choose a provider, model and API key. The key is stored server-side and never shown again.
        </p>
        <form action={saveAiAction} className="mt-4 space-y-4">
          <div>
            <label className={label} htmlFor="provider">Provider</label>
            <select id="provider" name="provider" defaultValue={ai.provider} className={field}>
              {PROVIDERS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="model">Model</label>
            <input id="model" name="model" defaultValue={ai.model} className={field} placeholder="e.g. gemini-2.0-flash" />
            <p className="mt-1 text-[11px] text-slate-400">
              Defaults — Google: {DEFAULT_MODELS.google} · OpenAI: {DEFAULT_MODELS.openai} · Anthropic: {DEFAULT_MODELS.anthropic}
            </p>
          </div>
          <div>
            <label className={label} htmlFor="apiKey">API key</label>
            <input id="apiKey" name="apiKey" type="password" autoComplete="off" className={field}
              placeholder={ai.hasKey ? "•••••••• (a key is configured — leave blank to keep)" : "Paste your API key"} />
          </div>
          <button type="submit" className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
            Save AI settings
          </button>
        </form>
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
