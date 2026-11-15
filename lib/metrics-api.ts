import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { supabaseConfigured } from "@/lib/supabase/config";
import { PLANS, isPaidPlan } from "@/lib/plans";

/**
 * Daily business metrics for Command Center's "API source" contract.
 *
 *   GET /api/metrics/<metric>?from=YYYY-MM-DD&to=YYYY-MM-DD
 *   x-api-key: <METRICS_API_KEY>
 *   200 {"metric": "<metric>", "data": [{"date": "YYYY-MM-DD", "value": n}, …]}
 *
 * Days are UTC calendar days, the same days the /admin charts use
 * (lib/admin-traffic.ts isoDay). Every day of the range gets a row, zeros
 * included, so a missing day always means "not asked for", never "nothing".
 *
 * Only dates and numbers leave this module: no ids, emails or plans.
 *
 * Definitions, kept in step with /admin:
 *
 * - signups   — accounts made that day: profiles.created_at. The same count as
 *               the Sign-ups chart on /admin. Includes accounts the checkout
 *               makes for guest buyers (lib/stripe-passes.ts resolveGuestBuyer),
 *               because those are profiles too.
 * - purchases — paid passes granted that day: subscriptions rows whose id is a
 *               live Checkout Session (`cs_live_…`, one row per pass, see
 *               fulfillPassCheckout) or a legacy Stripe subscription (`sub_…`).
 *               Manual grants (`manual_…`) are not sales, as in
 *               lib/admin-traffic.ts paidUserIds; admin sandbox purchases
 *               (`cs_test_…`) are not money. A pass refunded later still counts
 *               on the day it was bought — revenue nets the refund instead.
 * - customers — accounts whose FIRST purchase (as defined above) was that day.
 *               Guests are included: a guest buyer gets an account at checkout.
 * - revenue   — USD: the amount Stripe charged for each purchase that day
 *               (pass_purchased.amount, recorded by fulfillPassCheckout; the
 *               plan's list price when the event is missing), minus the amount
 *               of every pass ended by a full refund or a chargeback, on the day
 *               it was ended. Stripe fees are not subtracted; partial refunds
 *               (which keep the pass, see endRefundedPass) are not visible here.
 */

export const METRICS = ["signups", "customers", "revenue", "purchases"] as const;
export type Metric = (typeof METRICS)[number];

/** Longest range one request may ask for, in days (inclusive). */
const MAX_DAYS = 400;
const DAY = 864e5;
const PAGE = 1000;
/** Ceiling on rows read per table, so a bad query can never run unbounded. */
const ROW_CAP = 200000;

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

type Row = { date: string; value: number };
type Range = { from: string; to: string; startIso: string; endIso: string };

const noStore = { "Cache-Control": "no-store" };

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: noStore });
}

const isoDay = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** A real calendar date in YYYY-MM-DD form, as a UTC midnight timestamp, or null. */
function parseDay(value: string | null): number | null {
  if (!value || !ISO_DAY.test(value)) return null;
  const t = Date.parse(`${value}T00:00:00Z`);
  return Number.isNaN(t) || isoDay(t) !== value ? null : t;
}

/** Constant-time comparison; hashing first makes the lengths equal. */
function sameSecret(given: string, expected: string): boolean {
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Every day of the range, oldest first. */
function eachDay(range: Range): string[] {
  const out: string[] = [];
  const end = Date.parse(`${range.to}T00:00:00Z`);
  for (let t = Date.parse(`${range.from}T00:00:00Z`); t <= end; t += DAY) out.push(isoDay(t));
  return out;
}

/** One row per day of the range, zeros included. Money is rounded to cents. */
function toRows(range: Range, totals: Map<string, number>, money = false): Row[] {
  return eachDay(range).map((date) => {
    const v = totals.get(date) ?? 0;
    return { date, value: money ? Math.round(v * 100) / 100 : v };
  });
}

function add(totals: Map<string, number>, iso: string, amount: number, range: Range) {
  const day = isoDay(Date.parse(iso));
  if (day < range.from || day > range.to) return;
  totals.set(day, (totals.get(day) ?? 0) + amount);
}

type Admin = ReturnType<typeof createAdminClient>;

/**
 * Reads every page of a query. Supabase caps one response at 1,000 rows, and a
 * short read would silently undercount (see lib/admin-traffic.ts).
 */
async function paged<T>(
  label: string,
  page: (from: number, to: number) => PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>
): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; from < ROW_CAP; from += PAGE) {
    const { data, error } = await page(from, from + PAGE - 1);
    if (error) throw new Error(`${label}: ${error.message}`);
    const rows = (data ?? []) as T[];
    out.push(...rows);
    if (rows.length < PAGE) return out;
  }
  throw new Error(`${label}: more than ${ROW_CAP} rows`);
}

/** A sale, not a manual grant or a sandbox purchase. */
const isSale = (id: string) => id.startsWith("cs_live_") || id.startsWith("sub_");

async function signups(admin: Admin, range: Range): Promise<Row[]> {
  const rows = await paged<{ created_at: string }>("profiles", (a, b) =>
    admin
      .from("profiles")
      .select("created_at")
      .gte("created_at", range.startIso)
      .lt("created_at", range.endIso)
      .order("created_at", { ascending: true })
      .range(a, b)
  );
  const totals = new Map<string, number>();
  for (const r of rows) add(totals, r.created_at, 1, range);
  return toRows(range, totals);
}

type SaleRow = { id: string; user_id: string; plan: string | null; status: string; created_at: string; updated_at: string };

/** Sale rows, optionally only those created before `beforeIso`. */
async function sales(admin: Admin, beforeIso?: string): Promise<SaleRow[]> {
  const rows = await paged<SaleRow>("subscriptions", (a, b) => {
    let q = admin
      .from("subscriptions")
      .select("id, user_id, plan, status, created_at, updated_at")
      .or("id.like.cs_live_%,id.like.sub_%");
    if (beforeIso) q = q.lt("created_at", beforeIso);
    return q.order("created_at", { ascending: true }).order("id", { ascending: true }).range(a, b);
  });
  return rows.filter((r) => isSale(r.id));
}

async function purchases(admin: Admin, range: Range): Promise<Row[]> {
  const totals = new Map<string, number>();
  for (const s of await sales(admin, range.endIso)) add(totals, s.created_at, 1, range);
  return toRows(range, totals);
}

async function customers(admin: Admin, range: Range): Promise<Row[]> {
  // The whole history up to the end of the range, so "first purchase" is
  // judged against everything before the range too.
  const first = new Map<string, string>();
  for (const s of await sales(admin, range.endIso)) {
    const seen = first.get(s.user_id);
    if (!seen || Date.parse(s.created_at) < Date.parse(seen)) first.set(s.user_id, s.created_at);
  }
  const totals = new Map<string, number>();
  for (const at of first.values()) add(totals, at, 1, range);
  return toRows(range, totals);
}

/** The plan's list price, for a sale with no recorded amount. */
function listPrice(plan: string | null): number {
  return isPaidPlan(plan) ? PLANS[plan].price : 0;
}

async function revenue(admin: Admin, range: Range): Promise<Row[]> {
  // A refund can land on any later day, so every sale up to the end of the
  // range is read, not only those bought inside it.
  const rows = await sales(admin, range.endIso);

  // What Stripe actually charged, by Checkout Session id.
  const events = await paged<{ session: string | null; amount: string | null; livemode: string | null }>(
    "events",
    (a, b) =>
      admin
        .from("events")
        .select("session:props->>session, amount:props->>amount, livemode:props->>livemode")
        .eq("name", "pass_purchased")
        .lt("created_at", range.endIso)
        .order("id", { ascending: true })
        .range(a, b)
  );
  const charged = new Map<string, number>();
  for (const e of events) {
    const cents = Number(e.amount);
    if (e.session && e.livemode !== "false" && Number.isFinite(cents) && e.amount !== null) {
      charged.set(e.session, cents / 100);
    }
  }

  const totals = new Map<string, number>();
  for (const s of rows) {
    const amount = charged.get(s.id) ?? listPrice(s.plan);
    add(totals, s.created_at, amount, range);
    // A pass sold here is only ever set to "canceled" by a full refund or a
    // chargeback (endPassForPayment), so its update time is when the money
    // went back. Legacy `sub_` rows cancel when a subscription ends, which
    // refunds nothing.
    if (s.id.startsWith("cs_live_") && s.status === "canceled") add(totals, s.updated_at, -amount, range);
  }
  return toRows(range, totals, true);
}

const COUNTERS: Record<Metric, (admin: Admin, range: Range) => Promise<Row[]>> = {
  signups,
  customers,
  revenue,
  purchases,
};

/** The GET handler for one metric's route. */
export function metricHandler(metric: Metric) {
  return async function GET(req: NextRequest) {
    const expected = process.env.METRICS_API_KEY;
    if (!expected) return json({ error: "METRICS_API_KEY is not configured" }, 503);
    if (!supabaseConfigured || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return json({ error: "database is not configured" }, 503);
    }
    if (!sameSecret(req.headers.get("x-api-key") ?? "", expected)) {
      return json({ error: "unauthorized" }, 401);
    }

    const params = req.nextUrl.searchParams;
    const from = params.get("from");
    const to = params.get("to");
    const start = parseDay(from);
    const end = parseDay(to);
    if (start === null || end === null) {
      return json({ error: "from and to are required, as YYYY-MM-DD dates" }, 400);
    }
    if (start > end) return json({ error: "from must not be after to" }, 400);
    if ((end - start) / DAY + 1 > MAX_DAYS) {
      return json({ error: `at most ${MAX_DAYS} days per request` }, 400);
    }

    const range: Range = {
      from: from!,
      to: to!,
      startIso: new Date(start).toISOString(),
      endIso: new Date(end + DAY).toISOString(),
    };

    try {
      const data = await COUNTERS[metric](createAdminClient(), range);
      return json({ metric, timezone: "UTC", data });
    } catch (err) {
      console.error(`[metrics] ${metric} failed`, err);
      return json({ error: "could not read the metric" }, 502);
    }
  };
}
