import type { LayoutVariant, LineItem, ReceiptData, ReceiptProfile } from "@/lib/types";
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

interface VariantStyle {
  font: string;
  align: "center" | "left";
  rule: "dashed" | "solid" | "dotted" | "double" | "none";
  items: "table" | "stacked" | "equals";
  logoMul: number;
  nameClass: string;
  posMeta: boolean; // table / server / check #
  vat: boolean; // registered-business VAT header
  cardAuth: boolean; // card authorisation block
}

// Six distinct paper-receipt templates. Brands are spread across these
// (see lib/receipt.ts) so two stores in the same category never match.
const VARIANT_STYLES: Record<LayoutVariant, VariantStyle> = {
  classic: {
    font: "font-mono",
    align: "center",
    rule: "dashed",
    items: "table",
    logoMul: 1,
    nameClass: "text-base font-bold uppercase tracking-wide",
    posMeta: false,
    vat: false,
    cardAuth: false,
  },
  modern: {
    font: "font-sans",
    align: "center",
    rule: "solid",
    items: "table",
    logoMul: 1.3,
    nameClass: "text-lg font-bold tracking-tight",
    posMeta: false,
    vat: false,
    cardAuth: false,
  },
  pos: {
    font: "font-mono",
    align: "left",
    rule: "solid",
    items: "equals",
    logoMul: 1.1,
    nameClass: "text-sm font-bold uppercase tracking-wide",
    posMeta: true,
    vat: false,
    cardAuth: false,
  },
  euro: {
    font: "font-mono",
    align: "center",
    rule: "double",
    items: "table",
    logoMul: 1.1,
    nameClass: "text-sm font-bold tracking-[0.15em]",
    posMeta: false,
    vat: true,
    cardAuth: false,
  },
  compact: {
    font: "font-mono",
    align: "left",
    rule: "dotted",
    items: "stacked",
    logoMul: 0.95,
    nameClass: "text-sm font-bold uppercase",
    posMeta: false,
    vat: false,
    cardAuth: true,
  },
  elegant: {
    font: "font-serif",
    align: "center",
    rule: "none",
    items: "table",
    logoMul: 1.4,
    nameClass: "text-xl font-semibold tracking-tight",
    posMeta: false,
    vat: false,
    cardAuth: false,
  },
};

const SERVERS = ["Alex", "Jamie", "Taylor", "Morgan", "Riley", "Sam", "Jordan", "Casey"];

function LogoImg({
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

function Rule({ rule }: { rule: VariantStyle["rule"] }) {
  if (rule === "none") return <div className="my-3" />;
  const cls = {
    dashed: "border-t border-dashed border-slate-400",
    solid: "border-t border-slate-300",
    dotted: "border-t border-dotted border-slate-400",
    double: "border-t-[3px] border-double border-slate-500",
  }[rule];
  return <div className={`my-2 ${cls}`} />;
}

function Items({
  items,
  style,
  money,
}: {
  items: LineItem[];
  style: VariantStyle["items"];
  money: (n: number) => string;
}) {
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

export default function ReceiptPaper({ data }: Props) {
  const totals = calcTotals(data);
  const money = (n: number) => formatMoney(n, data.currency);

  const profile = data.receiptProfile ?? "retail";
  const accent = data.brandAccent ?? "#4f46e5";
  const seed = data.layoutSeed ?? 0;
  const logoScale = data.logoScale ?? 1;

  const isService =
    profile === "ride" ||
    profile === "delivery" ||
    profile === "digital" ||
    profile === "travel" ||
    profile === "airline" ||
    profile === "hotel" ||
    profile === "rental";

  const receiptTitle = RECEIPT_TITLE[profile];

  // ---- Digital / service receipts: modern card, unchanged look ----
  if (isService) {
    const logoMaxHeight = Math.round(46 * logoScale);
    return (
      <div className="w-95 max-w-full font-sans">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-paper text-[13px] leading-relaxed text-slate-800 shadow-sm">
          <div className="h-2" style={{ backgroundColor: accent }} />
          <div className="px-6 py-5">
            <div className="text-left">
              {data.logoDataUrl && (
                <div className="mb-3 flex">
                  <LogoImg
                    src={data.logoDataUrl}
                    name={data.businessName}
                    maxHeight={logoMaxHeight}
                  />
                </div>
              )}
              <p
                className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: accent }}
              >
                {receiptTitle}
              </p>
              <p className="text-lg font-bold tracking-tight">
                {data.businessName || "Business Name"}
              </p>
              {data.addressLine1 && <p className="text-slate-600">{data.addressLine1}</p>}
              {data.addressLine2 && <p className="text-slate-600">{data.addressLine2}</p>}
              {data.phone && <p className="text-slate-600">{data.phone}</p>}
              {data.website && <p className="text-slate-600">{data.website}</p>}
            </div>

            <div className="my-3 border-t border-slate-200" />

            <div className="flex flex-wrap justify-between gap-x-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
              <span>
                {formatDisplayDate(data.date)} {data.time}
              </span>
              {data.receiptNumber && <span>Receipt #{data.receiptNumber}</span>}
            </div>
            {(data.cashier || data.register) && (
              <div className="mt-0.5 flex flex-wrap justify-between gap-x-4 text-xs text-slate-600">
                {data.cashier && <span>{data.cashier}</span>}
                {data.register && <span>{data.register}</span>}
              </div>
            )}

            <div className="my-3 border-t border-slate-200" />

            <Items items={data.items} style="table" money={money} />

            <div className="my-3 border-t border-slate-200" />

            <div className="space-y-1 rounded-lg bg-slate-50 p-3">
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
              <div className="flex justify-between border-t border-slate-300 pt-1 text-base font-bold">
                <span>TOTAL</span>
                <span style={{ color: accent }}>{money(totals.total)}</span>
              </div>
            </div>

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
              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-medium text-slate-800">Paid</span>
              </div>
            </div>

            {data.footerMessage && (
              <p className="mt-4 text-center text-xs text-slate-600">{data.footerMessage}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- Paper receipts: one of six templates ----
  const variant = data.layoutVariant ?? "classic";
  const vs = VARIANT_STYLES[variant];
  const isTicket = profile === "restaurant" || profile === "coffee";
  const isFuel = profile === "fuel";
  const isGrocery = profile === "grocery" || profile === "warehouse";
  const isPharmacy = profile === "pharmacy";

  const logoBasePx = isTicket ? 44 : 38;
  const logoMaxHeight = Math.round(logoBasePx * logoScale * vs.logoMul);

  const storeNumber = 100 + (seed % 8900);
  const registerNumber = 1 + (seed % 12);
  const unitsSold = Math.max(1, Math.round(data.items.reduce((n, i) => n + i.quantity, 0)));
  const rxNumber = String(7000000 + ((seed * 137) % 999999));
  const memberNumber = `111${String(100000 + ((seed * 9301) % 899999))}`;
  const taxRegNumber = `${String(10 + (seed % 89))}-${String(1000000 + ((seed * 7) % 8999999))}`;
  const tableNumber = 1 + (seed % 30);
  const guests = 1 + (seed % 6);
  const server = data.cashier || SERVERS[seed % SERVERS.length];
  const checkNumber = data.receiptNumber.slice(-4);
  const showSurvey = seed % 3 === 0;

  const alignClass = vs.align === "center" ? "text-center" : "text-left";

  return (
    <div className={`w-95 max-w-full ${vs.font}`}>
      <div className="receipt-tear-top" />
      <div className="overflow-hidden bg-paper text-[13px] leading-relaxed text-slate-800">
        <div className="px-6 py-5">
          {/* Header */}
          <div className={alignClass}>
            {data.logoDataUrl && (
              <div className={`mb-2 flex ${vs.align === "center" ? "justify-center" : ""}`}>
                <LogoImg
                  src={data.logoDataUrl}
                  name={data.businessName}
                  maxHeight={logoMaxHeight}
                />
              </div>
            )}
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              {receiptTitle}
            </p>
            <p className={vs.nameClass}>{data.businessName || "Business Name"}</p>
            {data.addressLine1 && <p className="text-slate-600">{data.addressLine1}</p>}
            {data.addressLine2 && <p className="text-slate-600">{data.addressLine2}</p>}
            {data.phone && <p className="text-slate-600">{data.phone}</p>}
            {data.website && <p className="text-slate-600">{data.website}</p>}
            {vs.vat && <p className="mt-1 text-[11px] text-slate-600">Tax Reg: {taxRegNumber}</p>}
          </div>

          <Rule rule={vs.rule} />

          {/* Meta */}
          <div className="flex flex-wrap justify-between gap-x-4 text-xs text-slate-600">
            <span>
              {formatDisplayDate(data.date)} {data.time}
            </span>
            {data.receiptNumber && <span>Receipt #{data.receiptNumber}</span>}
          </div>

          {vs.posMeta ? (
            isTicket ? (
              <div className="mt-1 space-y-0.5 text-xs text-slate-600">
                <div className="flex flex-wrap justify-between gap-x-4">
                  <span>Table {tableNumber}</span>
                  <span>Guests: {guests}</span>
                </div>
                <div className="flex flex-wrap justify-between gap-x-4">
                  <span>Server: {server}</span>
                  <span>Check #{checkNumber}</span>
                </div>
              </div>
            ) : (
              <div className="mt-1 space-y-0.5 text-xs text-slate-600">
                <div className="flex flex-wrap justify-between gap-x-4">
                  <span>Cashier: {server}</span>
                  <span>Till {registerNumber}</span>
                </div>
                <div className="flex flex-wrap justify-between gap-x-4">
                  <span>Trans #{checkNumber}</span>
                  <span>Store #{storeNumber}</span>
                </div>
              </div>
            )
          ) : (
            <>
              {(data.cashier || data.register) && (
                <div className="mt-0.5 flex flex-wrap justify-between gap-x-4 text-xs text-slate-600">
                  {data.cashier && <span>{data.cashier}</span>}
                  {data.register && <span>{data.register}</span>}
                </div>
              )}
              {!isTicket && !data.register && (
                <div className="mt-0.5 flex flex-wrap justify-between gap-x-4 text-xs text-slate-600">
                  <span>Store #{storeNumber}</span>
                  <span>Reg {registerNumber}</span>
                </div>
              )}
            </>
          )}
          {profile === "warehouse" && (
            <div className="mt-0.5 text-xs text-slate-600">Member {memberNumber}</div>
          )}

          {isTicket && !vs.posMeta && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[11px] font-bold uppercase tracking-wide">
              <div className="rounded border border-dashed border-slate-300 py-1.5">
                {data.register || "Counter Order"}
              </div>
              <div className="rounded border border-dashed border-slate-300 py-1.5">Paid</div>
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

          <Rule rule={vs.rule} />

          {/* Items */}
          <Items items={data.items} style={vs.items} money={money} />

          {isGrocery && (
            <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">
              Items sold: {unitsSold}
            </p>
          )}

          <Rule rule={vs.rule} />

          {/* Totals */}
          <div className="space-y-1">
            <div className="flex justify-between text-slate-600">
              <span>{vs.vat ? "Net" : "Subtotal"}</span>
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
            <div className="flex justify-between border-t border-slate-400 pt-1 text-base font-bold">
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

          {/* Card authorisation block */}
          {vs.cardAuth && data.paymentMethod !== "Cash" && (
            <div className="mt-2 space-y-0.5 text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span>{data.paymentMethod.toUpperCase()}</span>
                <span>**** **** **** {data.cardLastFour || "0000"}</span>
              </div>
              <div className="flex justify-between">
                <span>AID</span>
                <span>A0000000031010</span>
              </div>
              <div className="flex justify-between">
                <span>TID</span>
                <span>{String(10000000 + ((seed * 31) % 89999999))}</span>
              </div>
              <p className="pt-0.5">APPROVED — THANK YOU</p>
            </div>
          )}

          {/* Footer */}
          {(data.footerMessage || data.showBarcode || showSurvey) && (
            <div className="mt-4 text-center">
              {data.footerMessage && (
                <p className="text-xs uppercase tracking-wide text-slate-600">
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
      <div className="receipt-tear-bottom" />
    </div>
  );
}
