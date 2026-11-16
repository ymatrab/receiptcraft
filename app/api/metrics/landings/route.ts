import { landingsHandler } from "@/lib/landing-metrics";

// Reads the service-role client and node:crypto; never cached, never static.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/metrics/landings?from=YYYY-MM-DD&to=YYYY-MM-DD — see lib/landing-metrics.ts. */
export const GET = landingsHandler;
