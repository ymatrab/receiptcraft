#!/usr/bin/env node
/**
 * Register our event parameters as GA4 custom dimensions and metrics.
 *
 *   node scripts/ga4-setup.mjs            # show what would change
 *   node scripts/ga4-setup.mjs --apply    # create the missing ones
 *
 * Why this is needed at all. Every event in lib/analytics.ts already reaches
 * GA4 — track() calls gtag on each one, and has for months. What does *not*
 * happen automatically is reporting on their parameters: GA4 drops any custom
 * parameter that has not been registered as a custom dimension, so
 * `download_blocked` shows up as a number with no way to ask "blocked by what?".
 * The events look present and the analysis is impossible. Registering them is a
 * one-time property setting, and this does it in one pass instead of twenty
 * hand-filled forms in the GA4 UI.
 *
 * Registration is not retroactive: GA4 starts collecting a dimension from the
 * moment it exists, so this is worth running before the data you want to read.
 *
 * Auth uses the existing service-account key in local/. It needs Editor on the
 * GA4 property — if it does not have it yet, the script says exactly what to
 * grant and to whom, and changes nothing.
 */
import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";

const KEY_PATH = process.env.GA4_KEY_PATH ?? "local/gsc-credentials.json";
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-LD43YK0L5B";
const APPLY = process.argv.includes("--apply");

/**
 * Event-scoped dimensions, one per parameter lib/analytics.ts actually sends.
 *
 * `receipt_id` is deliberately absent. It is unique per receipt, and a custom
 * dimension with a new value on every event exceeds GA4's cardinality ceiling —
 * Google then buckets the overflow into a row labelled "(other)" at the
 * property level, which degrades unrelated reports. It stays first-party, where
 * it is an indexed column. See FIRST_PARTY_ONLY in lib/analytics.ts.
 */
const DIMENSIONS = [
  ["ai_source", "Which AI assistant referred the session (chatgpt, perplexity, …)"],
  ["source", "How the builder or the plans were reached"],
  ["template", "Brand or generic template slug"],
  ["template_type", "brand or generic"],
  ["format", "Export format: pdf, png, jpg"],
  ["reason", "Why a download was blocked, or why auth failed"],
  ["entry", "Where a sign-up started: download_gate, ai_gate, cta"],
  ["location", "Where an upgrade click happened"],
  ["plan", "Plan chosen at checkout"],
  ["state", "Account state at the moment of the event: pro, free, anon"],
  ["status", "AI generation outcome: start, success, error"],
  ["method", "Auth method, or manual vs AI creation"],
  ["target", "What a receipt was saved to"],
  ["dest", "Where someone went after declining the plans"],
  ["example", "Which worked example was opened"],
  ["pro", "Whether the actor held Pro at the time"],
];

/** Numeric parameters. Metrics, not dimensions — these get summed and averaged. */
const METRICS = [
  ["seconds", "Seconds from payment to Pro actually activating", "STANDARD"],
  ["percent", "Scroll depth reached", "STANDARD"],
];

/**
 * Events worth marking as key events (what GA4 used to call conversions).
 * Printed as a reminder — the Admin API cannot set this on a v1beta property,
 * so it stays a two-click job in the UI.
 */
const KEY_EVENTS = [
  ["receipt_completed", "the first event that means a real receipt exists"],
  ["sign_up", "confirmed account, not an attempt"],
  ["begin_checkout", "chose a plan and left for the provider"],
  ["pro_activated", "entitlement actually appeared"],
];

const b64url = (buf) =>
  Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function accessToken() {
  let key;
  try {
    key = JSON.parse(readFileSync(KEY_PATH, "utf8"));
  } catch {
    console.error(`Cannot read the service-account key at ${KEY_PATH}.`);
    console.error("Set GA4_KEY_PATH if it lives somewhere else.");
    process.exit(2);
  }
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: "https://www.googleapis.com/auth/analytics.edit",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const jwt = `${header}.${claims}.${b64url(signer.sign(key.private_key))}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const json = await res.json();
  if (!json.access_token) {
    console.error("Could not mint a token:", JSON.stringify(json));
    process.exit(2);
  }
  return { token: json.access_token, email: key.client_email };
}

const api = async (token, path, init = {}) => {
  const res = await fetch(`https://analyticsadmin.googleapis.com/v1beta/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  return { ok: res.ok, status: res.status, body: await res.json().catch(() => ({})) };
};

/** Find the property whose web stream carries our measurement id. */
async function findProperty(token, email) {
  const summaries = await api(token, "accountSummaries");
  const props = (summaries.body.accountSummaries ?? []).flatMap((a) => a.propertySummaries ?? []);

  for (const p of props) {
    const streams = await api(token, `${p.property}/dataStreams`);
    for (const s of streams.body.dataStreams ?? []) {
      if (s.webStreamData?.measurementId === MEASUREMENT_ID) {
        return { name: p.property, label: p.displayName };
      }
    }
  }

  console.error(`\nNo property reachable by this service account carries ${MEASUREMENT_ID}.`);
  console.error(`It can currently see: ${props.map((p) => p.displayName).join(", ") || "nothing"}\n`);
  console.error("To fix, in Google Analytics → Admin → Property access management → +:");
  console.error(`  add   ${email}`);
  console.error("  role  Editor");
  console.error("Then re-run this script. Nothing was changed.");
  process.exit(1);
}

const { token, email } = await accessToken();
const property = await findProperty(token, email);
console.log(`Property: ${property.label} (${property.name})  ·  ${MEASUREMENT_ID}\n`);

const existingDims = new Set(
  ((await api(token, `${property.name}/customDimensions`)).body.customDimensions ?? []).map(
    (d) => d.parameterName
  )
);
const existingMets = new Set(
  ((await api(token, `${property.name}/customMetrics`)).body.customMetrics ?? []).map(
    (m) => m.parameterName
  )
);

const missingDims = DIMENSIONS.filter(([p]) => !existingDims.has(p));
const missingMets = METRICS.filter(([p]) => !existingMets.has(p));

for (const [p, d] of DIMENSIONS) {
  console.log(`  ${existingDims.has(p) ? "have" : " ADD"}  dimension  ${p.padEnd(15)} ${d}`);
}
for (const [p, d] of METRICS) {
  console.log(`  ${existingMets.has(p) ? "have" : " ADD"}  metric     ${p.padEnd(15)} ${d}`);
}

console.log(
  `\n${missingDims.length} dimensions and ${missingMets.length} metrics to create.`
);

if (!missingDims.length && !missingMets.length) {
  console.log("Nothing to do.");
} else if (!APPLY) {
  console.log("DRY RUN — nothing written. Re-run with --apply");
} else {
  let failed = 0;
  for (const [parameterName, description] of missingDims) {
    const r = await api(token, `${property.name}/customDimensions`, {
      method: "POST",
      body: JSON.stringify({
        parameterName,
        // Title-cased so the GA4 report picker reads as English rather than as
        // a list of snake_case parameter names.
        displayName: parameterName.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description,
        scope: "EVENT",
      }),
    });
    console.log(r.ok ? `created dimension ${parameterName}` : `FAILED ${parameterName}: ${JSON.stringify(r.body)}`);
    if (!r.ok) failed++;
  }
  for (const [parameterName, description, unit] of missingMets) {
    const r = await api(token, `${property.name}/customMetrics`, {
      method: "POST",
      body: JSON.stringify({
        parameterName,
        displayName: parameterName.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        description,
        scope: "EVENT",
        measurementUnit: unit,
      }),
    });
    console.log(r.ok ? `created metric ${parameterName}` : `FAILED ${parameterName}: ${JSON.stringify(r.body)}`);
    if (!r.ok) failed++;
  }
  if (failed) process.exit(1);
}

console.log("\nStill to do by hand — Admin → Events → mark as key event:");
for (const [name, why] of KEY_EVENTS) console.log(`  ${name.padEnd(20)} ${why}`);
