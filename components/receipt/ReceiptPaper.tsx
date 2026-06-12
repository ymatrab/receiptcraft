import type { ReceiptData } from "@/lib/types";
import { calcTotals, formatMoney, formatDisplayDate } from "@/lib/format";
import Barcode from "./Barcode";

interface Props {
  data: ReceiptData;
}

/**
 * Renders the receipt itself. This exact DOM is exported to PNG/PDF,
 * so it uses fixed widths and self-contained styling.
 */
export default function ReceiptPaper({ data }: Props) {
  const totals = calcTotals(data);
  const money = (n: number) => formatMoney(n, data.currency);

  const isThermal = data.paperStyle === "thermal";
  const isMinimal = data.paperStyle === "minimal";

  const fontClass = isThermal ? "font-mono" : "font-sans";
  const divider = isThermal ? (
    <div className="my-2 border-t border-dashed border-slate-400" />
  ) : (
    <div className="my-2.5 border-t border-slate-200" />
  );

  return (
    <div className={`w-95 max-w-full ${fontClass}`}>
      <div className="receipt-tear-top" />
      <div className="bg-paper px-6 py-5 text-[13px] leading-relaxed text-slate-800">
        {/* Business header */}
        <div className="text-center">
          <p
            className={
              isThermal
                ? "text-base font-bold uppercase tracking-wide"
                : "text-lg font-bold tracking-tight"
            }
          >
            {data.businessName || "Business Name"}
          </p>
          {data.addressLine1 && <p className="text-slate-600">{data.addressLine1}</p>}
          {data.addressLine2 && <p className="text-slate-600">{data.addressLine2}</p>}
          {data.phone && <p className="text-slate-600">{data.phone}</p>}
          {data.website && <p className="text-slate-600">{data.website}</p>}
        </div>

        {divider}

        {/* Meta row */}
        <div className={`flex flex-wrap justify-between gap-x-4 text-xs text-slate-600 ${isMinimal ? "justify-center gap-x-6" : ""}`}>
          <span>{formatDisplayDate(data.date)} {data.time}</span>
          {data.receiptNumber && <span>Receipt #{data.receiptNumber}</span>}
        </div>
        {(data.cashier || data.register) && (
          <div className="mt-0.5 flex flex-wrap justify-between gap-x-4 text-xs text-slate-600">
            {data.cashier && <span>{data.cashier}</span>}
            {data.register && <span>{data.register}</span>}
          </div>
        )}

        {divider}

        {/* Items */}
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
            {data.items.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="max-w-40 break-words py-0.5 pr-2">
                  {item.name || "—"}
                </td>
                <td className="py-0.5 text-center text-slate-600">{item.quantity}</td>
                <td className="py-0.5 text-right text-slate-600">{money(item.price)}</td>
                <td className="py-0.5 text-right font-medium">
                  {money(item.quantity * item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {divider}

        {/* Totals */}
        <div className="space-y-1">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{money(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>Discount</span>
              <span>-{money(totals.discount)}</span>
            </div>
          )}
          {data.taxRate > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>
                {data.taxLabel || "Tax"} ({data.taxRate}%)
              </span>
              <span>{money(totals.tax)}</span>
            </div>
          )}
          {totals.tip > 0 && (
            <div className="flex justify-between text-slate-600">
              <span>Tip</span>
              <span>{money(totals.tip)}</span>
            </div>
          )}
          <div
            className={`flex justify-between pt-1 text-base font-bold ${
              isThermal ? "border-t border-dashed border-slate-400" : "border-t border-slate-300"
            }`}
          >
            <span>TOTAL</span>
            <span>{money(totals.total)}</span>
          </div>
        </div>

        {/* Payment */}
        <div className="mt-3 space-y-1 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Payment Method</span>
            <span className="font-medium text-slate-800">
              {data.paymentMethod}
              {data.paymentMethod !== "Cash" && data.cardLastFour
                ? ` •••• ${data.cardLastFour}`
                : ""}
            </span>
          </div>
          {data.paymentMethod === "Cash" && data.amountTendered > totals.total && (
            <>
              <div className="flex justify-between">
                <span>Amount Tendered</span>
                <span>{money(data.amountTendered)}</span>
              </div>
              <div className="flex justify-between">
                <span>Change</span>
                <span>{money(totals.change)}</span>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {(data.footerMessage || data.showBarcode) && (
          <div className="mt-4 text-center">
            {data.footerMessage && (
              <p className={`text-xs text-slate-600 ${isThermal ? "uppercase tracking-wide" : ""}`}>
                {data.footerMessage}
              </p>
            )}
            {data.showBarcode && (
              <div className="mt-3 flex flex-col items-center">
                <Barcode seed={data.receiptNumber} />
                <p className="mt-1 text-[10px] tracking-[0.3em] text-slate-500">
                  {data.receiptNumber}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="receipt-tear-bottom" />
    </div>
  );
}
