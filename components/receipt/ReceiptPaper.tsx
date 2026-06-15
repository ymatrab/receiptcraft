import type { ReceiptData, ReceiptProfile } from "@/lib/types";
import { calcTotals, formatMoney, formatDisplayDate } from "@/lib/format";
import Barcode from "./Barcode";

interface Props {
  data: ReceiptData;
}

const RECEIPT_TITLE: Record<ReceiptProfile, string> = {
  airline: "E-TICKET RECEIPT",
  auto: "AUTO PARTS RECEIPT",
  beauty: "BEAUTY RECEIPT",
  coffee: "CAFE ORDER",
  delivery: "DELIVERY RECEIPT",
  digital: "DIGITAL INVOICE",
  electronics: "SALES RECEIPT",
  fashion: "STORE RECEIPT",
  fuel: "FUEL RECEIPT",
  grocery: "GROCERY RECEIPT",
  home: "HOME & GARDEN RECEIPT",
  hotel: "GUEST FOLIO",
  pet: "PET STORE RECEIPT",
  pharmacy: "PHARMACY RECEIPT",
  rental: "RENTAL AGREEMENT",
  restaurant: "ORDER RECEIPT",
  retail: "SALES RECEIPT",
  ride: "TRIP RECEIPT",
  sporting: "SPORTING GOODS RECEIPT",
  travel: "BOOKING RECEIPT",
  warehouse: "MEMBER RECEIPT",
};

// Store-type receipts that list items in the classic stacked style (item name
// on one line, "qty @ unit price" beneath) rather than a columnar table.
const STACKED_PROFILES: ReceiptProfile[] = [
  "grocery",
  "warehouse",
  "pharmacy",
  "home",
  "auto",
  "pet",
];

/**
 * Renders the receipt itself. This exact DOM is exported to PNG/PDF,
 * so it uses fixed widths and self-contained styling.
 */
export default function ReceiptPaper({ data }: Props) {
  const totals = calcTotals(data);
  const money = (n: number) => formatMoney(n, data.currency);

  const profile = data.receiptProfile ?? "retail";
  const accent = data.brandAccent ?? "#4f46e5";
  const seed = data.layoutSeed ?? 0;
  const logoScale = data.logoScale ?? 1;
  const isThermal = data.paperStyle === "thermal";
  const isMinimal = data.paperStyle === "minimal";
  const isTicket = profile === "restaurant" || profile === "coffee";
  const isService =
    profile === "ride" ||
    profile === "delivery" ||
    profile === "digital" ||
    profile === "travel" ||
    profile === "airline" ||
    profile === "hotel" ||
    profile === "rental";
  const isFuel = profile === "fuel";
  const isGrocery = profile === "grocery" || profile === "warehouse";
  const isPharmacy = profile === "pharmacy";
  const stackedItems = STACKED_PROFILES.includes(profile);

  const fontClass = isThermal && !isService ? "font-mono" : "font-sans";
  const receiptTitle = RECEIPT_TITLE[profile];

  // Logo height adapts to the receipt type (small printed mark on thermal
  // receipts, larger on modern/digital ones) and to each brand's logoScale.
  const logoBasePx = isService ? 46 : isTicket ? 44 : 38;
  const logoMaxHeight = Math.round(logoBasePx * logoScale);

  // Synthetic identifiers, deterministic per brand so previews stay stable.
  const storeNumber = 100 + (seed % 8900);
  const registerNumber = 1 + (seed % 12);
  const unitsSold = Math.max(1, Math.round(data.items.reduce((n, i) => n + i.quantity, 0)));
  const rxNumber = String(7000000 + ((seed * 137) % 999999));
  const memberNumber = `${111}${String(100000 + ((seed * 9301) % 899999))}`;
  const showSurvey = !isService && seed % 3 === 0;

  const divider = isThermal ? (
    <div className="my-2 border-t border-dashed border-slate-400" />
  ) : (
    <div className="my-2.5 border-t border-slate-200" />
  );
  const sectionDivider = isService ? <div className="my-3 border-t border-slate-200" /> : divider;

  return (
    <div className={`w-95 max-w-full ${fontClass}`}>
      {!isService && <div className="receipt-tear-top" />}
      <div
        className={`overflow-hidden bg-paper text-[13px] leading-relaxed text-slate-800 ${
          isService ? "rounded-xl border border-slate-200 shadow-sm" : ""
        }`}
      >
        {isService && <div className="h-2" style={{ backgroundColor: accent }} />}
        <div className="px-6 py-5">
        {/* Business header */}
        <div className={isService ? "text-left" : "text-center"}>
          {data.logoDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.logoDataUrl}
              alt={`${data.businessName || "Business"} logo`}
              crossOrigin="anonymous"
              // Matte/monochrome so brand logos read as printed ink on the
              // receipt rather than full-colour web graphics.
              style={{
                filter: "grayscale(1) contrast(1.08)",
                maxHeight: logoMaxHeight,
                maxWidth: 210,
              }}
              className={`${isService ? "mb-3" : "mx-auto mb-2"} h-auto w-auto object-contain`}
            />
          )}
          <p
            className={`mb-1 text-[10px] font-bold uppercase tracking-[0.22em] ${
              isService ? "text-slate-500" : "text-slate-400"
            }`}
            style={isService ? { color: accent } : undefined}
          >
            {receiptTitle}
          </p>
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

        {sectionDivider}

        {/* Meta row */}
        <div
          className={`flex flex-wrap justify-between gap-x-4 text-xs text-slate-600 ${
            isMinimal ? "justify-center gap-x-6" : ""
          } ${isService ? "rounded-lg bg-slate-50 p-3" : ""}`}
        >
          <span>{formatDisplayDate(data.date)} {data.time}</span>
          {data.receiptNumber && <span>Receipt #{data.receiptNumber}</span>}
        </div>
        {(data.cashier || data.register) && (
          <div className="mt-0.5 flex flex-wrap justify-between gap-x-4 text-xs text-slate-600">
            {data.cashier && <span>{data.cashier}</span>}
            {data.register && <span>{data.register}</span>}
          </div>
        )}
        {/* Store / register line for in-store thermal receipts */}
        {!isService && !isTicket && !data.register && (
          <div className="mt-0.5 flex flex-wrap justify-between gap-x-4 text-xs text-slate-600">
            <span>Store #{storeNumber}</span>
            <span>Reg {registerNumber}</span>
          </div>
        )}
        {profile === "warehouse" && (
          <div className="mt-0.5 text-xs text-slate-600">Member {memberNumber}</div>
        )}

        {isTicket && (
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[11px] font-bold uppercase tracking-wide">
            <div className="rounded border border-dashed border-slate-300 py-1.5">
              {data.register || "Counter Order"}
            </div>
            <div className="rounded border border-dashed border-slate-300 py-1.5">
              Paid
            </div>
          </div>
        )}

        {isPharmacy && (
          <div className="mt-3 rounded border border-slate-300 p-2 text-[11px]">
            <div className="flex justify-between">
              <span className="font-bold">RX #</span>
              <span>{rxNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Pharmacist</span>
              <span>{data.cashier || "On Duty"}</span>
            </div>
            <div className="flex justify-between">
              <span>Pickup</span>
              <span>Ready</span>
            </div>
          </div>
        )}

        {isFuel && (
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="rounded border border-slate-300 py-1">
              <span className="block font-bold">PUMP</span>
              <span>{data.register?.replace(/[^0-9]/g, "") || "04"}</span>
            </div>
            <div className="rounded border border-slate-300 py-1">
              <span className="block font-bold">GRADE</span>
              <span>UNLEAD</span>
            </div>
            <div className="rounded border border-slate-300 py-1">
              <span className="block font-bold">AUTH</span>
              <span>{data.receiptNumber.slice(-4)}</span>
            </div>
          </div>
        )}

        {sectionDivider}

        {/* Items */}
        {stackedItems ? (
          <div className="space-y-1.5">
            {data.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between gap-2">
                  <span className="break-words pr-2">{item.name || "—"}</span>
                  <span className="font-medium tabular-nums">
                    {money(item.quantity * item.price)}
                  </span>
                </div>
                {item.quantity !== 1 && (
                  <div className="text-[11px] text-slate-500">
                    {item.quantity} @ {money(item.price)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
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
                  <td className="max-w-40 break-words py-0.5 pr-2">{item.name || "—"}</td>
                  <td className="py-0.5 text-center text-slate-600">{item.quantity}</td>
                  <td className="py-0.5 text-right text-slate-600">{money(item.price)}</td>
                  <td className="py-0.5 text-right font-medium">
                    {money(item.quantity * item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isGrocery && (
          <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">
            Items sold: {unitsSold}
          </p>
        )}

        {sectionDivider}

        {/* Totals */}
        <div className={`space-y-1 ${isService ? "rounded-lg bg-slate-50 p-3" : ""}`}>
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{money(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 && (
            <div className="flex justify-between text-emerald-700">
              <span>{isGrocery ? "You saved" : "Discount"}</span>
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
            <span style={{ color: isService ? accent : undefined }}>{money(totals.total)}</span>
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
          {isService && (
            <div className="flex justify-between">
              <span>Status</span>
              <span className="font-medium text-slate-800">Paid</span>
            </div>
          )}
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
        {(data.footerMessage || data.showBarcode || showSurvey) && (
          <div className="mt-4 text-center">
            {data.footerMessage && (
              <p className={`text-xs text-slate-600 ${isThermal ? "uppercase tracking-wide" : ""}`}>
                {data.footerMessage}
              </p>
            )}
            {showSurvey && (
              <p className="mt-1 text-[10px] text-slate-500">
                Tell us how we did · survey #{storeNumber}-{registerNumber}
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
      </div>
      {!isService && <div className="receipt-tear-bottom" />}
    </div>
  );
}
