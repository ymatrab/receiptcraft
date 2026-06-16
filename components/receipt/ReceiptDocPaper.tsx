import type { ReceiptDoc, Section, SectionAlign } from "@/lib/sections";
import { itemsTotals } from "@/lib/sections";
import { formatMoney, formatDisplayDate } from "@/lib/format";
import Barcode from "./Barcode";
import Qr from "./Qr";
import { CardAuth, Items, KeyValueRows, LogoImg, Rule } from "./parts";

const FONT_CLASS = { mono: "font-mono", sans: "font-sans", serif: "font-serif" };

function alignClass(a?: SectionAlign): string {
  return a === "left" ? "text-left" : a === "right" ? "text-right" : "text-center";
}

interface Props {
  doc: ReceiptDoc;
}

/** Renders a section-based receipt document. Shares primitives with ReceiptPaper. */
export default function ReceiptDocPaper({ doc }: Props) {
  const money = (n: number) => formatMoney(n, doc.settings.currency);
  const accent = doc.settings.accent || "#4f46e5";
  const card = doc.settings.style === "card";

  // Grand total across all item sections (used for cash change).
  const grandTotal = doc.sections.reduce(
    (sum, s) => (s.type === "items" ? sum + itemsTotals(s).total : sum),
    0
  );

  function renderSection(s: Section) {
    switch (s.type) {
      case "header":
        return (
          <>
            {s.logoText ? (
              <p className="mb-3 font-sans text-[2.6rem] font-black leading-none tracking-tight text-slate-900">
                {s.logoText}
              </p>
            ) : s.logoDataUrl ? (
              <div className="mb-2 inline-block">
                <LogoImg src={s.logoDataUrl} name={s.storeName} maxHeight={56} />
              </div>
            ) : null}
            {s.title && (
              <p
                className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400"
                style={card ? { color: accent } : undefined}
              >
                {s.title}
              </p>
            )}
            {s.storeName && <p className="text-base font-bold">{s.storeName}</p>}
            {s.address &&
              s.address.split("\n").map((line, i) => (
                <p key={i} className="text-slate-600">
                  {line}
                </p>
              ))}
            {s.phone && <p className="text-slate-600">{s.phone}</p>}
            {s.website && <p className="text-slate-600">{s.website}</p>}
          </>
        );
      case "datetime":
        return (
          <p className="text-xs text-slate-600">
            {formatDisplayDate(s.date)} {s.time}
            {s.receiptNumber ? ` · Receipt #${s.receiptNumber}` : ""}
          </p>
        );
      case "twocol":
        return (
          <div className="text-xs text-slate-600">
            {s.title && (
              <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                {s.title}
              </p>
            )}
            <KeyValueRows rows={s.rows} flow={s.flow} />
          </div>
        );
      case "items": {
        const t = itemsTotals(s);
        return (
          <>
            <Items
              items={s.items}
              style={s.itemStyle ?? "table"}
              money={money}
              header={s.itemHeader}
              columns={s.columns}
            />
            {s.showItemsSold && (
              <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">
                Items sold: {Math.max(1, Math.round(s.items.reduce((n, i) => n + i.quantity, 0)))}
              </p>
            )}
            {s.totalsDivider && s.totalsDivider !== "none" && <Rule rule={s.totalsDivider} />}
            <div className="space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{money(t.subtotal)}</span>
              </div>
              {t.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount{s.discountPercent ? ` (${s.discount}%)` : ""}</span>
                  <span>-{money(t.discount)}</span>
                </div>
              )}
              {s.taxRate > 0 && (
                <div className="flex justify-between">
                  <span>
                    {s.taxLabel || "Tax"} ({s.taxRate}%)
                  </span>
                  <span>{money(t.tax)}</span>
                </div>
              )}
              {t.tip > 0 && (
                <div className="flex justify-between">
                  <span>Tip</span>
                  <span>{money(t.tip)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-400 pt-1 text-base font-bold">
                <span>{s.grandTotalLabel ?? "TOTAL"}</span>
                <span style={{ color: accent }}>{money(t.total)}</span>
              </div>
            </div>
          </>
        );
      }
      case "payment": {
        if (s.method === "Cash") {
          const change = (s.amountTendered ?? 0) > grandTotal ? (s.amountTendered ?? 0) - grandTotal : 0;
          return (
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-medium text-slate-800">Cash</span>
              </div>
              {(s.amountTendered ?? 0) > 0 && (
                <>
                  <div className="flex justify-between">
                    <span>Amount Tendered</span>
                    <span>{money(s.amountTendered ?? 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Change</span>
                    <span>{money(change)}</span>
                  </div>
                </>
              )}
            </div>
          );
        }
        return (
          <div className="space-y-1 text-xs text-slate-600">
            {s.inline ? (
              <p className="text-slate-700">
                Payment Method: {s.cardType || "Card"}
                {s.cardLastFour ? ` •••• ${s.cardLastFour}` : ""}
              </p>
            ) : (
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-medium text-slate-800">
                  {s.cardType || "Card"}
                  {s.cardLastFour ? ` •••• ${s.cardLastFour}` : ""}
                </span>
              </div>
            )}
            {s.showCardAuth && (
              <CardAuth last4={s.cardLastFour} cardType={s.cardType} refCode={s.authCode} />
            )}
          </div>
        );
      }
      case "message":
        return <p className="whitespace-pre-line text-xs leading-relaxed text-slate-600">{s.text}</p>;
      case "barcode":
        return (
          <div className="flex flex-col items-center">
            <Barcode seed={s.value} />
            {s.showText && (
              <p className="mt-1 text-[10px] tracking-[0.3em] text-slate-500">{s.value}</p>
            )}
          </div>
        );
      case "qr":
        return (
          <div className="flex justify-center">
            <Qr value={s.value} />
          </div>
        );
      case "image":
        return s.src ? (
          <div className="inline-block" style={{ width: `${s.widthPct ?? 50}%` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt="" className="h-auto w-full object-contain" />
          </div>
        ) : (
          <p className="text-[11px] text-slate-400">No image chosen</p>
        );
      case "signature":
        return (
          <div className="pt-6">
            <div className="mx-auto w-56 border-t border-slate-500" />
            <p className="mt-1 text-[11px] text-slate-500">{s.label}</p>
          </div>
        );
      case "spacer":
        return <div style={{ height: s.size ?? 24 }} />;
    }
  }

  const body = (
    <div className="px-6 py-5">
      {doc.sections.map((s) => (
        <div key={s.id}>
          <div className={alignClass(s.align)}>{renderSection(s)}</div>
          {s.divider && s.divider !== "none" && <Rule rule={s.divider} />}
        </div>
      ))}
    </div>
  );

  if (card) {
    return (
      <div className={`max-w-full ${FONT_CLASS[doc.settings.font]}`} style={{ width: doc.settings.widthPx }}>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-paper text-[13px] leading-relaxed text-slate-800 shadow-sm">
          <div className="h-2" style={{ backgroundColor: accent }} />
          {body}
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-full ${FONT_CLASS[doc.settings.font]}`} style={{ width: doc.settings.widthPx }}>
      <div className="receipt-tear-top" />
      <div className="overflow-hidden bg-paper text-[13px] leading-relaxed text-slate-800">{body}</div>
      <div className="receipt-tear-bottom" />
    </div>
  );
}
