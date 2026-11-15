import { metricHandler } from "@/lib/metrics-api";

// Reads the service-role client and node:crypto; never cached, never static.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/metrics/signups?from=YYYY-MM-DD&to=YYYY-MM-DD — see lib/metrics-api.ts. */
export const GET = metricHandler("signups");
