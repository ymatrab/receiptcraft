import type { ItemColumns, ItemStyle, LineItem, ReceiptSection, RuleStyle } from "@/lib/types";
import { receiptLabel, type ReceiptLabelKey, type ReceiptLabels } from "@/lib/sections";
import { itemGross } from "@/lib/format";

// Shared receipt primitives used by both the fixed ReceiptPaper renderer and the
// section-based ReceiptDocPaper renderer, so the two never drift visually.

export function LogoImg({
  src,
  name,
  maxHeight,
}: {
  src: string;
  name: string;
  maxHeight: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name || "Business"} logo`}
      crossOrigin="anonymous"
      // Matte/monochrome so brand logos read as printed ink, not web graphics.
      style={{ filter: "grayscale(1) contrast(1.08)", maxHeight, maxWidth: 210 }}
      className="h-auto w-auto object-contain"
    />
  );
}

export function Rule({ rule }: { rule: RuleStyle }) {
  if (rule === "none") return <div className="my-3" />;
  if (rule === "asterisk" || rule === "colon") {
    return (
      <div className="my-2 overflow-hidden whitespace-nowrap text-slate-400" aria-hidden="true">
        {(rule === "asterisk" ? "*" : ":").repeat(72)}
      </div>
    );
  }
  const cls = {
    dashed: "border-t border-dashed border-slate-400",
    solid: "border-t border-slate-300",
    dotted: "border-t border-dotted border-slate-400",
    double: "border-t-[3px] border-double border-slate-500",
  }[rule];
  return <div className={`my-2 ${cls}`} />;
}

/** Net line total = qty × (price + add-ons) − per-item discount (never below 0). */
function lineNet(i: LineItem): number {
  const gross = itemGross(i);
  return gross - Math.min(Math.max(i.discount || 0, 0), Math.max(gross, 0));
}

/** Line total as printed, with the till's tax flag after it ("3.42 F"). */
function lineTotal(i: LineItem, money: (n: number) => string, hideFlag?: boolean): string {
  return i.taxFlag && !hideFlag ? `${money(lineNet(i))} ${i.taxFlag}` : money(lineNet(i));
}

/** How an item's own details print: whether the SKU leads the name, and the
 *  receipt's wording for a per-item saving ("SC KROGER SAVINGS"). */
interface ItemOpts {
  skuFirst?: boolean;
  discountLabel?: string;
  /** Unit prices at more than cents ($2.799/gal); line totals keep `money`. */
  unitMoney?: (n: number) => string;
  /** Tax flags still pick the rate but are not printed. */
  hideTaxFlags?: boolean;
}

/** A department heading inside the list ("GROCERY"): a label, never a line. */
function ItemHeading({ name }: { name: string }) {
  return <p className="mt-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-700">{name || "—"}</p>;
}

/** The name as printed: "007874235186 GV 2% MLK GAL" when the SKU leads. */
function itemName(item: LineItem, opts: ItemOpts): string {
  const name = item.name || "—";
  return opts.skuFirst && item.sku ? `${item.sku} ${name}` : name;
}

/** Small secondary line under an item name: SKU / unit / category / modifiers /
 *  priced add-ons / per-item discount. Renders nothing when the item has no
 *  extra detail. */
function ItemMeta({ item, money, opts = {} }: { item: LineItem; money: (n: number) => string; opts?: ItemOpts }) {
  const bits: string[] = [];
  if (item.sku && !opts.skuFirst) bits.push(`SKU ${item.sku}`);
  if (item.unit) bits.push(item.unit);
  if (item.category) bits.push(item.category);
  const mods = item.modifiers?.filter(Boolean) ?? [];
  const addons = item.addons?.filter((a) => a.name) ?? [];
  const hasDiscount = !!item.discount && item.discount > 0;
  if (!bits.length && !mods.length && !addons.length && !hasDiscount) return null;
  return (
    <div className="text-[10px] leading-snug text-slate-500">
      {bits.length > 0 && <div>{bits.join(" · ")}</div>}
      {mods.map((m, i) => (
        <div key={i}>+ {m}</div>
      ))}
      {/* Priced extras print indented with their own price, and are already
          in the line total (itemGross). */}
      {addons.map((a, i) => (
        <div key={`a${i}`} className="flex justify-between gap-2 pl-2">
          <span>{a.name}</span>
          {a.price ? <span className="tabular-nums">{money(a.price)}</span> : null}
        </div>
      ))}
      {/* A receipt's own saving line reads label first, amount right —
          "SC RALPHS SAVED YOU 0.80"; the default note stays as it was. */}
      {hasDiscount &&
        (opts.discountLabel ? (
          <div className="flex justify-between gap-2 text-emerald-700">
            <span>{opts.discountLabel}</span>
            <span className="tabular-nums">−{money(item.discount!)}</span>
          </div>
        ) : (
          <div className="text-emerald-700">− {money(item.discount!)} item discount</div>
        ))}
    </div>
  );
}

export function Items({
  items,
  style,
  money,
  header,
  columns,
  gap,
  opts = {},
}: {
  items: LineItem[];
  style: ItemStyle;
  money: (n: number) => string;
  header?: { left: string; right: string };
  columns?: ItemColumns;
  gap?: number; // px vertical spacing between items (per-style default when omitted)
  opts?: ItemOpts;
}) {
  if (style === "qtycol") {
    return (
      <div className="flex flex-col" style={{ rowGap: gap ?? 4 }}>
        {items.map((item) => item.heading ? <ItemHeading key={item.id} name={item.name} /> : (
          <div key={item.id} className="flex items-baseline gap-2">
            <span className="w-4 shrink-0 text-[11px] text-slate-500">{item.quantity}</span>
            <span className="flex-1 break-words">
              {itemName(item, opts)}
              <ItemMeta item={item} money={money} opts={opts} />
            </span>
            <span className="tabular-nums">{lineTotal(item, money, opts.hideTaxFlags)}</span>
          </div>
        ))}
      </div>
    );
  }

  if (style === "lined") {
    return (
      <div>
        {header && (
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>{header.left}</span>
            <span>{header.right}</span>
          </div>
        )}
        <div className="mt-1 flex flex-col" style={{ rowGap: gap ?? 2 }}>
          {items.map((item) => item.heading ? <ItemHeading key={item.id} name={item.name} /> : (
            <div key={item.id} className="flex justify-between gap-2">
              <span className="break-words pr-2">
                {item.quantity !== 1 ? `${item.quantity} ` : ""}
                {itemName(item, opts)}
                <ItemMeta item={item} money={money} opts={opts} />
              </span>
              <span className="tabular-nums">{lineTotal(item, money, opts.hideTaxFlags)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === "equals") {
    return (
      <div className="flex flex-col" style={{ rowGap: gap ?? 2 }}>
        {items.map((item) => item.heading ? <ItemHeading key={item.id} name={item.name} /> : (
          <div key={item.id} className="flex justify-between gap-2">
            <span className="break-words pr-2">
              {item.quantity} {itemName(item, opts)}
              <ItemMeta item={item} money={money} opts={opts} />
            </span>
            <span className="tabular-nums">= {lineTotal(item, money, opts.hideTaxFlags)}</span>
          </div>
        ))}
      </div>
    );
  }

  if (style === "stacked") {
    return (
      <div className="flex flex-col" style={{ rowGap: gap ?? 6 }}>
        {items.map((item) => item.heading ? <ItemHeading key={item.id} name={item.name} /> : (
          <div key={item.id}>
            <div className="flex justify-between gap-2">
              <span className="break-words pr-2">{itemName(item, opts)}</span>
              <span className="font-medium tabular-nums">{lineTotal(item, money, opts.hideTaxFlags)}</span>
            </div>
            {item.quantity !== 1 && (
              <div className="text-[11px] text-slate-500">
                {item.quantity} @ {(opts.unitMoney ?? money)(item.price)}
              </div>
            )}
            <ItemMeta item={item} money={money} opts={opts} />
          </div>
        ))}
      </div>
    );
  }

  const col = columns ?? { item: "Item", qty: "Qty", price: "Price", total: "Total" };
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500">
          <th className="pb-1 font-medium">{col.item}</th>
          <th className="pb-1 text-center font-medium">{col.qty}</th>
          <th className="pb-1 text-right font-medium">{col.price}</th>
          <th className="pb-1 text-right font-medium">{col.total}</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          if (item.heading) {
            return (
              <tr key={item.id}>
                <td colSpan={4} className="pt-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-700">
                  {item.name || "—"}
                </td>
              </tr>
            );
          }
          const pad = { paddingTop: (gap ?? 4) / 2, paddingBottom: (gap ?? 4) / 2 };
          return (
            <tr key={item.id} className="align-top">
              <td className="max-w-40 break-words pr-2" style={pad}>
                {itemName(item, opts)}
                <ItemMeta item={item} money={money} opts={opts} />
              </td>
              <td className="text-center text-slate-600" style={pad}>
                {item.quantity}
                {item.unit ? ` ${item.unit}` : ""}
              </td>
              <td className="text-right text-slate-600" style={pad}>{(opts.unitMoney ?? money)(item.price)}</td>
              <td className="text-right font-medium" style={pad}>{lineTotal(item, money, opts.hideTaxFlags)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function CardAuth({
  last4,
  cardType,
  refCode,
  entry,
  labels,
}: {
  last4?: string;
  cardType?: string;
  refCode?: string;
  entry?: string;
  labels?: ReceiptLabels;
}) {
  const L = (key: ReceiptLabelKey) => receiptLabel(labels, key);
  return (
    <div className="mt-3 space-y-0.5 text-xs text-slate-600">
      <div className="flex justify-between">
        <span>{L("cardNumber")}</span>
        <span>**** **** **** {last4 || "4922"}</span>
      </div>
      <div className="flex justify-between">
        <span>{L("cardType")}</span>
        <span>{cardType || "Credit"}</span>
      </div>
      <div className="flex justify-between">
        <span>{L("cardEntry")}</span>
        <span>{entry || "Chip"}</span>
      </div>
      {refCode && (
        <div className="flex justify-between">
          <span>{L("reference")}</span>
          <span>{refCode}</span>
        </div>
      )}
      <div className="flex justify-between">
        <span>{L("status")}</span>
        <span>{L("approved")}</span>
      </div>
    </div>
  );
}

export function KeyValueRows({
  rows,
  flow,
}: {
  rows: ReceiptSection["rows"];
  flow?: boolean;
}) {
  if (flow) {
    return (
      <div className="flex flex-wrap gap-x-5 gap-y-0.5">
        {rows.map((r, i) => (
          <span key={i}>
            {r.label && <span className="text-slate-500">{r.label} </span>}
            <span className="text-slate-800">{r.value}</span>
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-0.5">
      {rows.map((r, i) =>
        r.label ? (
          <div key={i} className="flex justify-between gap-3">
            <span>{r.label}</span>
            <span className="text-right text-slate-800">{r.value}</span>
          </div>
        ) : (
          <p key={i}>{r.value}</p>
        )
      )}
    </div>
  );
}
