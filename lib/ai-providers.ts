import Anthropic from "@anthropic-ai/sdk";
import type { AiConfig } from "@/lib/settings";

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
    case "anthropic":
    default:
      return generateAnthropic(config, system, prompt, schema);
  }
}

// --- Anthropic (Claude) -----------------------------------------------------
async function generateAnthropic(config: AiConfig, system: string, prompt: string, schema: object) {
  const client = new Anthropic({ apiKey: config.apiKey });
  const message = await client.messages.create({
    model: config.model,
    max_tokens: 1500,
    output_config: { effort: "low", format: { type: "json_schema", schema } },
    system,
    messages: [{ role: "user", content: prompt }],
  });
  const text = message.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") throw new Error("Empty Anthropic response");
  return JSON.parse(text.text);
}

// --- OpenAI -----------------------------------------------------------------
async function generateOpenai(config: AiConfig, system: string, prompt: string, schema: object) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
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
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty OpenAI response");
  return JSON.parse(content);
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
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: toGeminiSchema(schema),
      },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");
  return JSON.parse(text);
}
