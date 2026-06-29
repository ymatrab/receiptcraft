import type { CSSProperties } from "react";
import type { FontFamily } from "@/lib/types";
import type { ReceiptDoc, Section, SectionAlign } from "@/lib/sections";
import { itemsTotals, SPACING_DEFAULTS } from "@/lib/sections";
import { formatMoney, formatDisplayDate } from "@/lib/format";
import Barcode from "./Barcode";
import Qr from "./Qr";
import { CardAuth, Items, KeyValueRows, LogoImg, Rule } from "./parts";

const MONO_FB = ", ui-monospace, monospace";
const SANS_FB = ", ui-sans-serif, system-ui, sans-serif";

const FONT_STACK: Record<FontFamily, string> = {
  // Original set
  mono: "var(--font-geist-mono)" + MONO_FB,
  sans: "var(--font-geist-sans)" + SANS_FB,
  serif: "ui-serif, Georgia, serif",
  courier: "var(--font-courier)" + MONO_FB,
  oswald: "var(--font-oswald)" + SANS_FB,
  playfair: "var(--font-playfair), ui-serif, Georgia, serif",
  // Monospace receipt fonts
  "roboto-mono": "var(--font-roboto-mono)" + MONO_FB,
  "ibm-plex-mono": "var(--font-ibm-plex-mono)" + MONO_FB,
  "space-mono": "var(--font-space-mono)" + MONO_FB,
  inconsolata: "var(--font-inconsolata)" + MONO_FB,
  "source-code-pro": "var(--font-source-code-pro)" + MONO_FB,
  "noto-sans-mono": "var(--font-noto-sans-mono)" + MONO_FB,
  "anonymous-pro": "var(--font-anonymous-pro)" + MONO_FB,
  "cutive-mono": "var(--font-cutive-mono)" + MONO_FB,
  "fira-mono": "var(--font-fira-mono)" + MONO_FB,
  "ubuntu-mono": "var(--font-ubuntu-mono)" + MONO_FB,
  "dm-mono": "var(--font-dm-mono)" + MONO_FB,
  "oxygen-mono": "var(--font-oxygen-mono)" + MONO_FB,
  "share-tech-mono": "var(--font-share-tech-mono)" + MONO_FB,
  vt323: "var(--font-vt323)" + MONO_FB,
  // Sans / display fonts
  inter: "var(--font-inter)" + SANS_FB,
  roboto: "var(--font-roboto)" + SANS_FB,
  "open-sans": "var(--font-open-sans)" + SANS_FB,
  lato: "var(--font-lato)" + SANS_FB,
  "noto-sans": "var(--font-noto-sans)" + SANS_FB,
  "work-sans": "var(--font-work-sans)" + SANS_FB,
  montserrat: "var(--font-montserrat)" + SANS_FB,
  mulish: "var(--font-mulish)" + SANS_FB,
};

const FONT_SCALE_PX = { small: 12, normal: 13, large: 15 } as const;
const LINE_HEIGHT = { compact: 1.3, normal: 1.55, airy: 1.85 } as const;
const LETTER_SPACING = { tight: "-0.01em", normal: "0", wide: "0.05em" } as const;
const TEXT_WEIGHT = { normal: 400, medium: 500, bold: 700 } as const;

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
            {(s.taxId || s.branch || s.cashier || s.registerId) && (
              <div className="mt-1 text-[11px] text-slate-500">
                {s.taxId && <p>Tax ID: {s.taxId}</p>}
                {(s.branch || s.registerId || s.cashier) && (
                  <p>
                    {[
                      s.branch ? `Branch ${s.branch}` : "",
                      s.registerId ? `Reg ${s.registerId}` : "",
                      s.cashier ? `Cashier: ${s.cashier}` : "",
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </div>
            )}
          </>
        );
      case "datetime": {
        const ids: { label: string; value?: string }[] = [
          { label: "Order", value: s.orderId },
          { label: "Txn", value: s.transactionId },
          { label: "Invoice", value: s.invoiceId },
          { label: "Customer", value: s.customerId },
        ].filter((x) => x.value);
        return (
          <div className="text-xs text-slate-600">
            <p>
              {formatDisplayDate(s.date)} {s.time}
              {s.timezone ? ` ${s.timezone}` : ""}
              {s.receiptNumber ? ` · Receipt #${s.receiptNumber}` : ""}
            </p>
            {ids.length > 0 && (
              <div className="mt-0.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-slate-500">
                {ids.map((x) => (
                  <span key={x.label}>
                    {x.label}: {x.value}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      }
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
              gap={doc.settings.itemGap}
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
              {t.itemDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Item discounts</span>
                  <span>-{money(t.itemDiscount)}</span>
                </div>
              )}
              {t.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount{s.discountPercent ? ` (${s.discount}%)` : ""}</span>
                  <span>-{money(t.discount)}</span>
                </div>
              )}
              {t.taxLines.map((l, i) => (
                <div key={i} className="flex justify-between">
                  <span>
                    {l.label} ({l.rate}%)
                  </span>
                  <span>{money(l.amount)}</span>
                </div>
              ))}
              {t.serviceFee > 0 && (
                <div className="flex justify-between">
                  <span>Service fee{s.serviceFeePercent ? ` (${s.serviceFee}%)` : ""}</span>
                  <span>{money(t.serviceFee)}</span>
                </div>
              )}
              {t.deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span>{money(t.deliveryFee)}</span>
                </div>
              )}
              {t.tip > 0 && (
                <div className="flex justify-between">
                  <span>Tip</span>
                  <span>{money(t.tip)}</span>
                </div>
              )}
              {t.rounding !== 0 && (
                <div className="flex justify-between">
                  <span>Rounding</span>
                  <span>
                    {t.rounding > 0 ? "+" : "-"}
                    {money(Math.abs(t.rounding))}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-400 pt-1 text-base font-bold">
                <span>{s.grandTotalLabel ?? "TOTAL"}</span>
                <span style={{ color: accent }}>{money(t.total)}</span>
              </div>
              {t.amountPaid > 0 && (
                <>
                  <div className="flex justify-between">
                    <span>Amount paid</span>
                    <span>{money(t.amountPaid)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Change</span>
                    <span>{money(t.change)}</span>
                  </div>
                </>
              )}
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
        const methodLabel = s.method === "Card" ? s.cardType || "Card" : s.method;
        const showLast4 = (s.method === "Card" || s.method === "Gift Card") && s.cardLastFour;
        const splits = s.splits?.filter((p) => p.method || p.amount) ?? [];
        return (
          <div className="space-y-1 text-xs text-slate-600">
            {s.inline ? (
              <p className="text-slate-700">
                Payment Method: {methodLabel}
                {showLast4 ? ` •••• ${s.cardLastFour}` : ""}
              </p>
            ) : (
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-medium text-slate-800">
                  {methodLabel}
                  {showLast4 ? ` •••• ${s.cardLastFour}` : ""}
                </span>
              </div>
            )}
            {s.method === "Card" && s.entryMode && !s.showCardAuth && (
              <div className="flex justify-between">
                <span>Card entry</span>
                <span>{s.entryMode}</span>
              </div>
            )}
            {splits.length > 0 && (
              <div className="mt-1 border-t border-dashed border-slate-300 pt-1">
                <p className="text-[11px] uppercase tracking-wide text-slate-500">Split payment</p>
                {splits.map((p, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{p.method || "Payment"}</span>
                    <span>{money(p.amount || 0)}</span>
                  </div>
                ))}
              </div>
            )}
            {s.showCardAuth && (
              <CardAuth
                last4={s.cardLastFour}
                cardType={s.cardType}
                refCode={s.authCode}
                entry={s.entryMode}
              />
            )}
          </div>
        );
      }
      case "message":
        return <p className="whitespace-pre-line text-xs leading-relaxed text-slate-600">{s.text}</p>;
      case "footer":
        return (
          <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-500">
            {s.loyaltyPoints && <p className="font-medium text-slate-600">★ {s.loyaltyPoints}</p>}
            {s.returnPolicy && <p className="whitespace-pre-line">{s.returnPolicy}</p>}
            {s.warranty && <p className="whitespace-pre-line">{s.warranty}</p>}
            {s.surveyUrl && (
              <p>
                We value your feedback: <span className="text-slate-700">{s.surveyUrl}</span>
              </p>
            )}
          </div>
        );
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

  const cp = doc.settings.contentPadding ?? SPACING_DEFAULTS.contentPadding;
  const sectionGap = doc.settings.sectionGap ?? SPACING_DEFAULTS.sectionGap;
  const body = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: sectionGap,
        paddingLeft: cp,
        paddingRight: cp,
        paddingTop: Math.round(cp * 0.8),
        paddingBottom: Math.round(cp * 0.8),
      }}
    >
      {doc.sections.map((s) => (
        <div key={s.id}>
          <div className={alignClass(s.align)}>{renderSection(s)}</div>
          {s.divider && s.divider !== "none" && <Rule rule={s.divider} />}
        </div>
      ))}
    </div>
  );

  const { settings } = doc;
  const fontStack = FONT_STACK[settings.font] ?? FONT_STACK.mono;
  const wrapperStyle: CSSProperties = {
    width: settings.widthPx,
    fontFamily: fontStack,
    fontSize: FONT_SCALE_PX[settings.fontScale ?? "normal"],
    lineHeight: LINE_HEIGHT[settings.lineSpacing ?? "normal"],
    letterSpacing: LETTER_SPACING[settings.letterSpacing ?? "normal"],
    fontWeight: TEXT_WEIGHT[settings.weight ?? "normal"],
  };

  // The finish controls the paper chrome. Digital "card" receipts default to a
  // clean white card with an accent bar; everything else defaults to thermal.
  const finish = settings.paper ?? (card ? "email" : "thermal");

  if (finish === "thermal") {
    return (
      <div className="max-w-full" style={wrapperStyle}>
        <div className="receipt-tear-top" />
        <div className="overflow-hidden bg-paper text-slate-800">{body}</div>
        <div className="receipt-tear-bottom" />
      </div>
    );
  }

  const finishClass =
    finish === "clean"
      ? "rounded-xl border border-slate-200 bg-white"
      : finish === "invoice"
        ? "border border-slate-300 bg-white"
        : "rounded-2xl border border-slate-200 bg-white shadow-sm"; // email

  return (
    <div className="max-w-full" style={wrapperStyle}>
      <div className={`overflow-hidden text-slate-800 ${finishClass}`}>
        {card && <div className="h-2" style={{ backgroundColor: accent }} />}
        {body}
      </div>
    </div>
  );
}
