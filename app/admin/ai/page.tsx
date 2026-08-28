import {
  getAiCooldowns,
  getAiConnectionsPublic,
  DEFAULT_MODELS,
  PROVIDER_LABELS,
  type AiProvider,
  type AiConnectionPublic,
} from "@/lib/settings";
import { FREE_LIMITS } from "@/lib/plans";
import ConnectionTester from "./ConnectionTester";
import {
  saveConnectionAction,
  deleteConnectionAction,
  moveConnectionAction,
} from "./actions";

export const dynamic = "force-dynamic";

const PROVIDERS = Object.keys(PROVIDER_LABELS) as AiProvider[];

const field =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30";
const label = "mb-1 block text-xs font-medium text-slate-600";
const ghostBtn =
  "cursor-pointer rounded-lg border border-slate-300 px-2 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40";

/** Setup hints per provider — what to paste, and where to get it. */
const PROVIDER_HELP: Record<AiProvider, string> = {
  cloudflare:
    "Account ID + API token, from dash.cloudflare.com. 10,000 free neurons a day ≈ 100 receipts on Llama 3.3 70B, then ~$0.001 each.",
  google:
    "API key from Google AI Studio. Google no longer publishes free-tier limits — check your own at aistudio.google.com/rate-limit. This is the tier that expired in August 2026.",
  groq:
    "API key from console.groq.com. Free tier caps at 200k tokens/day — about 200 receipts, since the daily token limit binds long before the 1,000-request one. Needs a model with strict structured outputs: openai/gpt-oss-20b or -120b. Groq's Llama models do not support them.",
  huggingface:
    "Fine-grained token from huggingface.co/settings/tokens with “Make calls to Inference Providers”. Free monthly credits; routes to whichever partner serves the model fastest.",
  xai: "API key from console.x.ai. OpenAI-compatible, so no account ID needed.",
  openai: "API key from platform.openai.com.",
  anthropic:
    "API key from console.anthropic.com. Also picked up from ANTHROPIC_API_KEY if one is set in Vercel.",
};

function ConnectionForm({
  connection,
  index,
  total,
  coolingUntil,
}: {
  connection?: AiConnectionPublic;
  index?: number;
  total?: number;
  /** Set when this provider reported an exhausted quota and is being skipped. */
  coolingUntil?: Date;
}) {
  const isNew = !connection;
  const provider = connection?.provider ?? "cloudflare";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      {!isNew && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {(index ?? 0) + 1}
            </span>
            <span className="text-sm font-semibold text-slate-900">{connection.label}</span>
            {!connection.enabled && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                disabled
              </span>
            )}
            {!connection.hasKey && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-800">
                no key
              </span>
            )}
            {coolingUntil && (
              <span
                title={`Quota spent. Skipped until ${coolingUntil.toISOString()}`}
                className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold text-sky-800"
              >
                resting until{" "}
                {coolingUntil.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })}{" "}
                UTC
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ConnectionTester id={connection.id} />
            <form action={moveConnectionAction}>
              <input type="hidden" name="id" value={connection.id} />
              <input type="hidden" name="delta" value="up" />
              <button type="submit" className={ghostBtn} disabled={index === 0} aria-label="Move up">
                ↑
              </button>
            </form>
            <form action={moveConnectionAction}>
              <input type="hidden" name="id" value={connection.id} />
              <input type="hidden" name="delta" value="down" />
              <button
                type="submit"
                className={ghostBtn}
                disabled={index === (total ?? 1) - 1}
                aria-label="Move down"
              >
                ↓
              </button>
            </form>
            <form action={deleteConnectionAction}>
              <input type="hidden" name="id" value={connection.id} />
              <button
                type="submit"
                className="cursor-pointer rounded-lg border border-red-200 px-2 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      )}

      <form action={saveConnectionAction} className="space-y-4">
        <input type="hidden" name="id" value={connection?.id ?? ""} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor={`label-${connection?.id ?? "new"}`}>
              Name
            </label>
            <input
              id={`label-${connection?.id ?? "new"}`}
              name="label"
              defaultValue={connection?.label ?? ""}
              className={field}
              placeholder="e.g. Cloudflare Llama (free)"
            />
          </div>
          <div>
            <label className={label} htmlFor={`provider-${connection?.id ?? "new"}`}>
              Provider
            </label>
            <select
              id={`provider-${connection?.id ?? "new"}`}
              name="provider"
              defaultValue={provider}
              className={field}
            >
              {PROVIDERS.map((p) => (
                <option key={p} value={p}>
                  {PROVIDER_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor={`model-${connection?.id ?? "new"}`}>
              Model
            </label>
            <input
              id={`model-${connection?.id ?? "new"}`}
              name="model"
              defaultValue={connection?.model ?? ""}
              className={field}
              placeholder={DEFAULT_MODELS[provider]}
            />
          </div>
          <div>
            <label className={label} htmlFor={`accountId-${connection?.id ?? "new"}`}>
              Account ID <span className="font-normal text-slate-400">(Cloudflare only)</span>
            </label>
            <input
              id={`accountId-${connection?.id ?? "new"}`}
              name="accountId"
              defaultValue={connection?.accountId ?? ""}
              className={field}
              placeholder="Cloudflare account ID"
            />
          </div>
        </div>

        <div>
          <label className={label} htmlFor={`apiKey-${connection?.id ?? "new"}`}>
            API key
          </label>
          <input
            id={`apiKey-${connection?.id ?? "new"}`}
            name="apiKey"
            type="password"
            autoComplete="off"
            className={field}
            placeholder={
              connection?.hasKey
                ? "•••••••• (saved — leave blank to keep)"
                : "Paste the API key or token"
            }
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="enabled"
              defaultChecked={connection?.enabled ?? true}
              className="h-4 w-4 rounded border-slate-300"
            />
            Use this connection
          </label>
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            {isNew ? "Add connection" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default async function AdminAiPage() {
  const [connections, cooldowns] = await Promise.all([
    getAiConnectionsPublic(),
    getAiCooldowns(),
  ]);
  const live = connections.filter((c) => c.enabled && c.hasKey);
  const now = Date.now();
  const coolingFor = (id: string) => {
    const until = cooldowns[id];
    return until && Date.parse(until) > now ? new Date(until) : undefined;
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">AI connections</h1>
      <p className="mt-2 text-sm text-slate-600">
        The receipt generator tries these in order and uses the first one that answers, so a
        dead key falls through to the next provider instead of taking the feature offline. When a
        provider reports a spent quota it is skipped until the quota resets, which is what lets
        several free tiers add up instead of each one costing a wasted call once it runs dry. Use{" "}
        <strong>Test</strong> to run a real generation and see the provider&apos;s own error.
      </p>

      {live.length === 0 ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          No usable connection — <code>/api/ai/generate</code> is returning 503 and every AI claim
          on the site is currently false. Add one below.
        </p>
      ) : (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {live.length} connection{live.length === 1 ? "" : "s"} in rotation. Free visitors get{" "}
          {FREE_LIMITS.aiGenerationsPerDayAnon} generation a day, free accounts{" "}
          {FREE_LIMITS.aiGenerationsPerDay}, Pro unlimited.
        </p>
      )}

      <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium text-slate-700">
          Where each provider&apos;s credentials come from
        </summary>
        <dl className="mt-3 space-y-2">
          {PROVIDERS.map((p) => (
            <div key={p} className="text-xs">
              <dt className="font-semibold text-slate-800">{PROVIDER_LABELS[p]}</dt>
              <dd className="text-slate-600">
                {PROVIDER_HELP[p]} Default model: <code>{DEFAULT_MODELS[p]}</code>
              </dd>
            </div>
          ))}
        </dl>
      </details>

      <div className="mt-6 space-y-4">
        {connections.map((c, i) => (
          <ConnectionForm
            key={c.id}
            connection={c}
            index={i}
            total={connections.length}
            coolingUntil={coolingFor(c.id)}
          />
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">Add a connection</h2>
      <div className="mt-3">
        <ConnectionForm />
      </div>
    </div>
  );
}
