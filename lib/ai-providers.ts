import Anthropic from "@anthropic-ai/sdk";
import type { AiConfig } from "@/lib/settings";

/**
 * A provider call that failed, carrying enough detail for an admin to act on.
 *
 * The public generate route deliberately shows users a generic message, so this
 * is the only place the real cause survives — /admin/ai renders `message` and
 * the failover logic branches on `status`.
 */
export class AiProviderError extends Error {
  readonly status: number | null;
  /** Seconds until this provider is worth trying again, when it told us. */
  readonly retryAfterSeconds: number | null;
  constructor(message: string, status: number | null = null, retryAfterSeconds: number | null = null) {
    super(message);
    this.name = "AiProviderError";
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
  /** Whether trying the same provider again shortly could plausibly work. */
  get isTransient(): boolean {
    if (this.status === 429) return true;
    if (this.status !== null && this.status >= 500) return true;
    return /overload|timeout|temporarily/i.test(this.message);
  }
  /** A spent quota rather than a broken key — the provider is fine, we're out. */
  get isQuotaExhausted(): boolean {
    return this.status === 429 || /quota|resource_exhausted|rate.?limit/i.test(this.message);
  }
  /**
   * How long to stop routing to this provider.
   *
   * Free tiers cap per minute *and* per day, and the two want very different
   * waits: a minute limit clears almost immediately, a daily one not until the
   * quota window rolls. Guessing short on a daily limit means every request for
   * the rest of the day pays a wasted round-trip before failing over, so when
   * the provider names a day we wait for the next UTC midnight.
   */
  cooldownUntil(now = new Date()): Date {
    if (this.retryAfterSeconds !== null) {
      return new Date(now.getTime() + Math.min(this.retryAfterSeconds, 86_400) * 1000);
    }
    if (/per ?day|daily|PerDay|requests per day/i.test(this.message)) {
      const midnight = new Date(now);
      midnight.setUTCHours(24, 0, 0, 0);
      return midnight;
    }
    return new Date(now.getTime() + 5 * 60 * 1000);
  }
}

/** Trim a provider's error body to something readable in an admin table. */
function short(body: string): string {
  const text = body.trim().replace(/\s+/g, " ");
  return text.length > 300 ? `${text.slice(0, 300)}…` : text;
}

/**
 * Seconds to wait, from a `Retry-After` header (Groq and OpenAI send one) or a
 * `retryDelay: "37s"` field in Google's error body. Null when unstated.
 */
function retryAfterFrom(res: Response, body: string): number | null {
  const header = res.headers.get("retry-after");
  if (header) {
    const secs = Number(header);
    if (Number.isFinite(secs)) return secs;
    const at = Date.parse(header);
    if (!Number.isNaN(at)) return Math.max(0, Math.round((at - Date.now()) / 1000));
  }
  const delay = body.match(/"retryDelay"\s*:\s*"(\d+(?:\.\d+)?)s"/);
  if (delay) return Math.ceil(Number(delay[1]));
  return null;
}

/**
 * Generate structured JSON from a prompt using the configured provider. Returns
 * the parsed object. Each provider is asked to return JSON matching `schema`.
 */
export async function generateJson(
  config: AiConfig,
  system: string,
  prompt: string,
  schema: object
): Promise<unknown> {
  switch (config.provider) {
    case "google":
      return generateGoogle(config, system, prompt, schema);
    case "openai":
      return generateOpenai(config, system, prompt, schema);
    case "xai":
      return generateXai(config, system, prompt, schema);
    case "groq":
      return generateGroq(config, system, prompt, schema);
    case "huggingface":
      return generateHuggingface(config, system, prompt, schema);
    case "cloudflare":
      return generateCloudflare(config, system, prompt, schema);
    case "anthropic":
    default:
      return generateAnthropic(config, system, prompt, schema);
  }
}

/** Parse a provider's text payload, failing loudly with the offending output. */
function parseJson(text: string, provider: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    throw new AiProviderError(`${provider} returned text that is not JSON: ${short(text)}`);
  }
}

// --- Anthropic (Claude) -----------------------------------------------------
async function generateAnthropic(config: AiConfig, system: string, prompt: string, schema: object) {
  const client = new Anthropic({ apiKey: config.apiKey });
  let message;
  try {
    message = await client.messages.create({
      model: config.model,
      // Thinking is on by default on Opus 5 and counts against max_tokens, so
      // this needs headroom above the ~400 tokens the receipt itself takes.
      max_tokens: 4000,
      output_config: { effort: "low", format: { type: "json_schema", schema } },
      system,
      messages: [{ role: "user", content: prompt }],
    });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      throw new AiProviderError(`Anthropic ${err.status}: ${short(err.message)}`, err.status ?? null);
    }
    throw err;
  }
  // Widened: "refusal" is a newer stop reason and may not be in this SDK
  // version's union yet, which would make a direct comparison a type error.
  if ((message.stop_reason as string | null) === "refusal") {
    throw new AiProviderError("Anthropic declined to generate that receipt.");
  }
  const text = message.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") throw new AiProviderError("Empty Anthropic response");
  return parseJson(text.text, "Anthropic");
}

// --- OpenAI-compatible (OpenAI, xAI) ----------------------------------------
/**
 * OpenAI and xAI speak the same chat-completions dialect, including the
 * `json_schema` response format, so one implementation serves both.
 */
async function generateOpenaiCompatible(
  label: string,
  url: string,
  config: AiConfig,
  system: string,
  prompt: string,
  schema: object,
  /** Provider-specific body fields, e.g. Groq's reasoning_effort. */
  extra: Record<string, unknown> = {}
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "receipt", strict: true, schema },
      },
      ...extra,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new AiProviderError(`${label} ${res.status}: ${short(body)}`, res.status, retryAfterFrom(res, body));
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new AiProviderError(`Empty ${label} response`);
  return parseJson(content, label);
}

async function generateOpenai(config: AiConfig, system: string, prompt: string, schema: object) {
  return generateOpenaiCompatible(
    "OpenAI",
    "https://api.openai.com/v1/chat/completions",
    config,
    system,
    prompt,
    schema
  );
}

async function generateXai(config: AiConfig, system: string, prompt: string, schema: object) {
  return generateOpenaiCompatible(
    "xAI",
    "https://api.x.ai/v1/chat/completions",
    config,
    system,
    prompt,
    schema
  );
}

/**
 * Groq speaks the OpenAI chat-completions dialect, including the
 * {name, strict, schema} json_schema envelope — but strict structured output
 * is only available on a subset of models (e.g. openai/gpt-oss-20b), so the
 * configured model must be one of those. See DEFAULT_MODELS.groq.
 */
async function generateGroq(config: AiConfig, system: string, prompt: string, schema: object) {
  // gpt-oss are reasoning models, and on a receipt they spend most of their
  // output budget thinking about a task that needs almost none. Measured across
  // six receipts (US, FR, JP, GB) on 2026-08-28: default effort averaged 2,356
  // tokens and 4.5s, "low" averaged 1,026 tokens and 1.8s with 6/6 still
  // schema-clean and every currency correct. On a 200k tokens/day free tier
  // that is ~85 receipts/day versus ~194 — so low effort roughly doubles the
  // free allowance for no measurable quality cost.
  const extra = /gpt-oss/.test(config.model) ? { reasoning_effort: "low" } : {};
  return generateOpenaiCompatible(
    "Groq",
    "https://api.groq.com/openai/v1/chat/completions",
    config,
    system,
    prompt,
    schema,
    extra
  );
}

/**
 * Hugging Face's router is a drop-in OpenAI-compatible proxy in front of many
 * partner providers. Because it forwards to whichever partner is fastest for
 * the model, `response_format` support follows that partner rather than Hugging
 * Face itself — so the model has to be one that honours strict schemas
 * everywhere it is served. See DEFAULT_MODELS.huggingface.
 */
async function generateHuggingface(config: AiConfig, system: string, prompt: string, schema: object) {
  return generateOpenaiCompatible(
    "Hugging Face",
    "https://router.huggingface.co/v1/chat/completions",
    config,
    system,
    prompt,
    schema
  );
}

// --- Cloudflare Workers AI --------------------------------------------------
/**
 * Workers AI takes the bare JSON Schema as `json_schema` (not OpenAI's
 * {name, strict, schema} envelope) and returns the model output nested at
 * `result.response`, which arrives already parsed on some models and as a JSON
 * string on others.
 */
async function generateCloudflare(config: AiConfig, system: string, prompt: string, schema: object) {
  if (!config.accountId) {
    throw new AiProviderError("Cloudflare needs an account ID as well as an API token.");
  }
  const url = `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/ai/run/${config.model}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_schema", json_schema: schema },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new AiProviderError(`Cloudflare ${res.status}: ${short(body)}`, res.status, retryAfterFrom(res, body));
  }
  const data = await res.json();
  // Workers AI answers 200 with success:false for model-level errors.
  if (data.success === false) {
    const detail = (data.errors ?? []).map((e: { message?: string }) => e.message).join("; ");
    throw new AiProviderError(`Cloudflare: ${short(detail || JSON.stringify(data.errors ?? []))}`);
  }
  const out = data.result?.response;
  if (out == null) throw new AiProviderError("Empty Cloudflare response");
  return typeof out === "string" ? parseJson(out, "Cloudflare") : out;
}

// --- Google (Gemini) --------------------------------------------------------
/** Gemini's responseSchema doesn't accept additionalProperties — strip it. */
function toGeminiSchema(schema: unknown): unknown {
  if (Array.isArray(schema)) return schema.map(toGeminiSchema);
  if (schema && typeof schema === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(schema as Record<string, unknown>)) {
      if (k === "additionalProperties") continue;
      out[k] = toGeminiSchema(v);
    }
    return out;
  }
  return schema;
}

async function generateGoogle(config: AiConfig, system: string, prompt: string, schema: object) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    // The key rides in a header rather than the query string so it cannot leak
    // into request logs or error messages that quote the URL.
    headers: { "Content-Type": "application/json", "x-goog-api-key": config.apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: toGeminiSchema(schema),
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new AiProviderError(`Gemini ${res.status}: ${short(body)}`, res.status, retryAfterFrom(res, body));
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new AiProviderError("Empty Gemini response");
  return parseJson(text, "Gemini");
}
