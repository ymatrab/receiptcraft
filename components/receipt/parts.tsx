import type { ItemStyle, LineItem, ReceiptSection, RuleStyle } from "@/lib/types";

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

export function Items({
  items,
  style,
  money,
  header,
}: {
  items: LineItem[];
  style: ItemStyle;
  money: (n: number) => string;
  header?: { left: string; right: string };
}) {
  if (style === "qtycol") {
    return (
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-baseline gap-2">
            <span className="w-4 shrink-0 text-[11px] text-slate-500">{item.quantity}</span>
            <span className="flex-1 break-words">{item.name || "—"}</span>
            <span className="tabular-nums">{money(item.quantity * item.price)}</span>
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
        <div className="mt-1 space-y-0.5">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-2">
              <span className="break-words pr-2">
                {item.quantity !== 1 ? `${item.quantity} ` : ""}
                {item.name || "—"}
              </span>
              <span className="tabular-nums">{money(item.quantity * item.price)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (style === "equals") {
    return (
      <div className="space-y-0.5">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between gap-2">
            <span className="break-words pr-2">
              {item.quantity} {item.name || "—"}
            </span>
            <span className="tabular-nums">= {money(item.quantity * item.price)}</span>
          </div>
        ))}
      </div>
    );
  }

  if (style === "stacked") {
    return (
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between gap-2">
              <span className="break-words pr-2">{item.name || "—"}</span>
              <span className="font-medium tabular-nums">{money(item.quantity * item.price)}</span>
            </div>
            {item.quantity !== 1 && (
              <div className="text-[11px] text-slate-500">
                {item.quantity} @ {money(item.price)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500">
          <th className="pb-1 font-medium">Item</th>
          <th className="pb-1 text-center font-medium">Qty</th>
          <th className="pb-1 text-right font-medium">Price</th>
          <th className="pb-1 text-right font-medium">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="align-top">
            <td className="max-w-40 break-words py-0.5 pr-2">{item.name || "—"}</td>
            <td className="py-0.5 text-center text-slate-600">{item.quantity}</td>
            <td className="py-0.5 text-right text-slate-600">{money(item.price)}</td>
            <td className="py-0.5 text-right font-medium">{money(item.quantity * item.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function CardAuth({
  last4,
  cardType,
  refCode,
}: {
  last4?: string;
  cardType?: string;
  refCode?: string;
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
        <span>Chip</span>
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
