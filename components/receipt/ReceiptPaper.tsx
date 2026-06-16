import type {
  FontFamily,
  ItemStyle,
  LayoutVariant,
  ReceiptData,
  ReceiptProfile,
  ReceiptSection,
  RuleStyle,
} from "@/lib/types";
import { calcTotals, formatMoney, formatDisplayDate } from "@/lib/format";
import Barcode from "./Barcode";
import Qr from "./Qr";
import { CardAuth, Items, KeyValueRows, LogoImg, Rule } from "./parts";

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
  rule: RuleStyle;
  items: ItemStyle;
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

const FONT_CLASS: Record<FontFamily, string> = {
  mono: "font-mono",
  sans: "font-sans",
  serif: "font-serif",
};

function Section({ section, flow }: { section: ReceiptSection; flow?: boolean }) {
  return (
    <div className="mt-3 text-xs text-slate-600">
      {section.title && (
        <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">
          {section.title}
        </p>
      )}
      <KeyValueRows rows={section.rows} flow={flow} />
    </div>
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
    !data.forcePaper &&
    (profile === "ride" ||
      profile === "delivery" ||
      profile === "digital" ||
      profile === "travel" ||
      profile === "airline" ||
      profile === "hotel" ||
      profile === "rental");

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

  // ---- Paper receipts: one of six templates, with optional per-brand overrides ----
  const variant = data.layoutVariant ?? "classic";
  const vs = VARIANT_STYLES[variant];
  const font = data.fontFamily ? FONT_CLASS[data.fontFamily] : vs.font;
  const align = data.headerAlign ?? vs.align;
  const rule = data.ruleStyle ?? vs.rule;
  const itemStyle = data.itemStyle ?? vs.items;
  const minimal = data.dividers === "minimal";
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

  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`w-95 max-w-full ${font}`}>
      <div className="receipt-tear-top" />
      <div className="overflow-hidden bg-paper text-[13px] leading-relaxed text-slate-800">
        <div className="px-6 py-5">
          {/* Header */}
          <div className={alignClass}>
            {data.logoText ? (
              <p className="mb-3 font-sans text-[2.6rem] font-black leading-none tracking-tight text-slate-900">
                {data.logoText}
              </p>
            ) : data.logoDataUrl ? (
              <div className={`mb-2 flex ${align === "center" ? "justify-center" : ""}`}>
                <LogoImg
                  src={data.logoDataUrl}
                  name={data.businessName}
                  maxHeight={logoMaxHeight}
                />
              </div>
            ) : null}
            {!data.greeting && (
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                {receiptTitle}
              </p>
            )}
            {(data.businessName || !data.logoText) && (
              <p className={vs.nameClass}>{data.businessName || "Business Name"}</p>
            )}
            {data.addressLine1 && <p className="text-slate-600">{data.addressLine1}</p>}
            {data.addressLine2 && <p className="text-slate-600">{data.addressLine2}</p>}
            {data.phone && <p className="text-slate-600">{data.phone}</p>}
            {data.website && <p className="text-slate-600">{data.website}</p>}
            {vs.vat && <p className="mt-1 text-[11px] text-slate-600">Tax Reg: {taxRegNumber}</p>}
            {data.greeting && <p className="mt-2 text-slate-700">{data.greeting}</p>}
          </div>

          {!minimal && <Rule rule={rule} />}

          {data.topBarcode && (
            <div className="mb-1 flex flex-col items-center">
              <Barcode seed={data.receiptNumber} />
              <p className="mt-1 text-[10px] tracking-[0.3em] text-slate-500">
                {data.receiptNumber}
              </p>
            </div>
          )}

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
              {!isTicket && !data.register && !data.hideStoreLine && (
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

          {isTicket && !vs.posMeta && !data.sections?.length && (
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

          {data.sections?.map((s, i) => (
            <Section key={i} section={s} flow={data.sectionStyle === "flow"} />
          ))}

          {!data.hideItems && (
            <>
              {!minimal && <Rule rule={rule} />}
              {minimal && <div className="mt-3" />}

              {/* Items */}
              <Items
                items={data.items}
                style={itemStyle}
                money={money}
                header={data.itemHeader}
              />

              {isGrocery && (
                <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">
                  Items sold: {unitsSold}
                </p>
              )}
            </>
          )}

          {!data.hideTotals && (
            <>
              {!minimal && <Rule rule={rule} />}
              {minimal && <div className="mt-3" />}

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
                  <span>{data.grandTotalLabel ?? "TOTAL"}</span>
                  <span>{money(totals.total)}</span>
                </div>
              </div>

              {minimal && <Rule rule={rule} />}

              {/* Payment */}
              <div className="mt-3 space-y-1 text-xs text-slate-600">
                {data.paymentInline ? (
                  <p className="text-slate-700">
                    Payment Method: {data.paymentMethod}
                    {data.paymentMethod !== "Cash" && data.cardLastFour
                      ? ` •••• ${data.cardLastFour}`
                      : ""}
                  </p>
                ) : (
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="font-medium text-slate-800">
                      {data.paymentMethod}
                      {data.paymentMethod !== "Cash" && data.cardLastFour
                        ? ` •••• ${data.cardLastFour}`
                        : ""}
                    </span>
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
            </>
          )}

          {/* Card authorisation block */}
          {(vs.cardAuth || data.showCardAuth) && data.paymentMethod !== "Cash" && (
            <CardAuth
              last4={data.cardLastFour}
              cardType={
                data.paymentMethod === "Credit Card"
                  ? "Credit"
                  : data.paymentMethod === "Debit Card"
                    ? "Debit"
                    : data.paymentMethod
              }
              refCode={`${String(60000000 + ((seed * 9301) % 89999999))}${String.fromCharCode(
                65 + (seed % 26)
              )}`}
            />
          )}

          {/* Slogan / thank-you line */}
          {data.footerMessage && (
            <p className="mt-4 text-center text-xs text-slate-600">{data.footerMessage}</p>
          )}

          {/* Fine print */}
          {data.policyText && (
            <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
              {data.policyText}
            </p>
          )}
          {data.manager && (
            <p className="mt-3 text-center text-[11px] text-slate-600">{data.manager}</p>
          )}

          {/* Survey + barcode/QR */}
          {(showSurvey || data.showBarcode) && (
            <div className="mt-4 text-center">
              {showSurvey && (
                <p className="text-[10px] text-slate-500">
                  Tell us how we did · survey #{storeNumber}-{registerNumber}
                </p>
              )}
              {data.showBarcode &&
                (data.qrCode ? (
                  <div className="mt-3 flex justify-center">
                    <Qr seed={data.receiptNumber} />
                  </div>
                ) : (
                  <div className="mt-3 flex flex-col items-center">
                    <Barcode seed={data.receiptNumber} />
                    <p className="mt-1 text-[10px] tracking-[0.3em] text-slate-500">
                      {data.receiptNumber}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="receipt-tear-bottom" />
    </div>
  );
}
