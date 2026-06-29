import type { ItemColumns, ItemStyle, LineItem, ReceiptSection, RuleStyle } from "@/lib/types";

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

/** Net line total = qty × price − per-item discount (never below 0). */
function lineNet(i: LineItem): number {
  const gross = (i.quantity || 0) * (i.price || 0);
  return gross - Math.min(Math.max(i.discount || 0, 0), Math.max(gross, 0));
}

/** Small secondary line under an item name: SKU / unit / category / modifiers /
 *  per-item discount. Renders nothing when the item has no extra detail. */
function ItemMeta({ item, money }: { item: LineItem; money: (n: number) => string }) {
  const bits: string[] = [];
  if (item.sku) bits.push(`SKU ${item.sku}`);
  if (item.unit) bits.push(item.unit);
  if (item.category) bits.push(item.category);
  const mods = item.modifiers?.filter(Boolean) ?? [];
  const hasDiscount = !!item.discount && item.discount > 0;
  if (!bits.length && !mods.length && !hasDiscount) return null;
  return (
    <div className="text-[10px] leading-snug text-slate-500">
      {bits.length > 0 && <div>{bits.join(" · ")}</div>}
      {mods.map((m, i) => (
        <div key={i}>+ {m}</div>
      ))}
      {hasDiscount && <div className="text-emerald-700">− {money(item.discount!)} item discount</div>}
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
}: {
  items: LineItem[];
  style: ItemStyle;
  money: (n: number) => string;
  header?: { left: string; right: string };
  columns?: ItemColumns;
  gap?: number; // px vertical spacing between items (per-style default when omitted)
}) {
  if (style === "qtycol") {
    return (
      <div className="flex flex-col" style={{ rowGap: gap ?? 4 }}>
        {items.map((item) => (
          <div key={item.id} className="flex items-baseline gap-2">
            <span className="w-4 shrink-0 text-[11px] text-slate-500">{item.quantity}</span>
            <span className="flex-1 break-words">
              {item.name || "—"}
              <ItemMeta item={item} money={money} />
            </span>
            <span className="tabular-nums">{money(lineNet(item))}</span>
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
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-2">
              <span className="break-words pr-2">
                {item.quantity !== 1 ? `${item.quantity} ` : ""}
                {item.name || "—"}
                <ItemMeta item={item} money={money} />
              </span>
              <span className="tabular-nums">{money(lineNet(item))}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === "equals") {
    return (
      <div className="flex flex-col" style={{ rowGap: gap ?? 2 }}>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between gap-2">
            <span className="break-words pr-2">
              {item.quantity} {item.name || "—"}
              <ItemMeta item={item} money={money} />
            </span>
            <span className="tabular-nums">= {money(lineNet(item))}</span>
          </div>
        ))}
      </div>
    );
  }

  if (style === "stacked") {
    return (
      <div className="flex flex-col" style={{ rowGap: gap ?? 6 }}>
        {items.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between gap-2">
              <span className="break-words pr-2">{item.name || "—"}</span>
              <span className="font-medium tabular-nums">{money(lineNet(item))}</span>
            </div>
            {item.quantity !== 1 && (
              <div className="text-[11px] text-slate-500">
                {item.quantity} @ {money(item.price)}
              </div>
            )}
            <ItemMeta item={item} money={money} />
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
          const pad = { paddingTop: (gap ?? 4) / 2, paddingBottom: (gap ?? 4) / 2 };
          return (
            <tr key={item.id} className="align-top">
              <td className="max-w-40 break-words pr-2" style={pad}>
                {item.name || "—"}
                <ItemMeta item={item} money={money} />
              </td>
              <td className="text-center text-slate-600" style={pad}>
                {item.quantity}
                {item.unit ? ` ${item.unit}` : ""}
              </td>
              <td className="text-right text-slate-600" style={pad}>{money(item.price)}</td>
              <td className="text-right font-medium" style={pad}>{money(lineNet(item))}</td>
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
}: {
  last4?: string;
  cardType?: string;
  refCode?: string;
  entry?: string;
}) {
  return (
    <div className="mt-3 space-y-0.5 text-xs text-slate-600">
      <div className="flex justify-between">
        <span>Card number</span>
        <span>**** **** **** {last4 || "4922"}</span>
      </div>
      <div className="flex justify-between">
        <span>Card type</span>
        <span>{cardType || "Credit"}</span>
      </div>
      <div className="flex justify-between">
        <span>Card entry</span>
        <span>{entry || "Chip"}</span>
      </div>
      {refCode && (
        <div className="flex justify-between">
          <span>Reference #</span>
          <span>{refCode}</span>
        </div>
      )}
      <div className="flex justify-between">
        <span>Status</span>
        <span>APPROVED</span>
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
