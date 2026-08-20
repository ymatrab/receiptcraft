import { createAdminClient } from "@/lib/supabase/admin";
import { PLANS } from "@/lib/plans";
import { dismissPendingOrder, fulfilPendingOrder } from "./actions";

export const dynamic = "force-dynamic";

interface PendingOrder {
  id: number;
  shopify_order_id: string;
  order_number: string | null;
  email: string | null;
  plan: string | null;
  reason: string;
  resolved_at: string | null;
  created_at: string;
}

async function getOrders(): Promise<PendingOrder[]> {
  const { data } = await createAdminClient()
    .from("pending_orders")
    .select("id, shopify_order_id, order_number, email, plan, reason, resolved_at, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  return (data ?? []) as PendingOrder[];
}

const PLAN_OPTIONS = (Object.keys(PLANS) as (keyof typeof PLANS)[]).filter((p) => p !== "free");

export default async function AdminOrders() {
  const orders = await getOrders();
  const open = orders.filter((o) => !o.resolved_at);
  const closed = orders.filter((o) => o.resolved_at);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Orders needing attention</h1>
      <p className="mt-1 text-sm text-slate-500">
        Paid Shopify orders the webhook could not attach to an account. These
        people have already been charged — each one is someone waiting for access.
      </p>

      {open.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Nothing waiting. Every paid order matched an account.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-amber-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-amber-50 text-left text-xs uppercase tracking-wide text-amber-800">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Buyer email</th>
                <th className="px-4 py-3">Why it stalled</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Grant access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {open.map((o) => (
                <tr key={o.id}>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {o.order_number ? `#${o.order_number}` : o.shopify_order_id}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{o.email ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{o.reason}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(o.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <form action={fulfilPendingOrder} className="flex flex-wrap items-center gap-1.5">
                      <input type="hidden" name="shopifyOrderId" value={o.shopify_order_id} />
                      <input
                        type="email"
                        name="email"
                        defaultValue={o.email ?? ""}
                        placeholder="account email"
                        required
                        className="w-48 rounded-md border border-slate-300 px-2 py-1 text-xs"
                      />
                      <select
                        name="plan"
                        defaultValue={o.plan ?? "pro_monthly"}
                        className="rounded-md border border-slate-300 px-2 py-1 text-xs"
                      >
                        {PLAN_OPTIONS.map((p) => (
                          <option key={p} value={p}>
                            {PLANS[p].name}
                          </option>
                        ))}
                      </select>
                      <button className="rounded-md border border-emerald-200 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50">
                        Grant
                      </button>
                    </form>
                    <form action={dismissPendingOrder} className="mt-1.5">
                      <input type="hidden" name="shopifyOrderId" value={o.shopify_order_id} />
                      <button className="text-xs font-medium text-slate-400 hover:text-slate-600">
                        Dismiss — no action needed
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {closed.length > 0 && (
        <>
          <h2 className="mt-10 text-lg font-semibold text-slate-900">Resolved</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {closed.map((o) => (
                  <tr key={o.id}>
                    <td className="px-4 py-3 font-medium text-slate-600">
                      {o.order_number ? `#${o.order_number}` : o.shopify_order_id}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{o.email ?? "—"}</td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      {o.resolved_at ? new Date(o.resolved_at).toLocaleDateString() : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
