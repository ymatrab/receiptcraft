"use client";

import { useRef, useState, useEffect } from "react";
import type { ReceiptData, LineItem, PaymentMethod, PaperStyle } from "@/lib/types";
import { TEMPLATES, getTemplate } from "@/lib/templates";
import { receiptFromTemplate } from "@/lib/receipt";
import { CURRENCIES, calcTotals, formatMoney, uid } from "@/lib/format";
import { downloadPng, downloadPdf, exportFilename } from "@/lib/download";
import ReceiptPaper from "@/components/receipt/ReceiptPaper";
import { TextField, NumberField, SelectField, FormSection, inputClass } from "./fields";

const PAYMENT_METHODS: PaymentMethod[] = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "Mobile Payment",
  "Gift Card",
  "Check",
];

const PAPER_STYLES: { value: PaperStyle; label: string }[] = [
  { value: "thermal", label: "Thermal" },
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" },
];

interface Props {
  initialData: ReceiptData;
  initialTemplate?: string;
}

function getQueryTemplate(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("template") ?? "";
}

export default function BuilderApp({ initialData, initialTemplate }: Props) {
  const [data, setData] = useState<ReceiptData>(initialData);
  const [activeTemplate, setActiveTemplate] = useState(initialTemplate ?? "");
  const [formKey, setFormKey] = useState(0);
  const [exporting, setExporting] = useState<"png" | "pdf" | null>(null);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const receiptRef = useRef<HTMLDivElement>(null);

  // Apply ?template= query param client-side (works on Cloudflare/Vercel edge SSR)
  useEffect(() => {
    const slug = getQueryTemplate();
    if (slug && slug !== activeTemplate) {
      applyTemplate(slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const patch = (partial: Partial<ReceiptData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const handleLogoUpload = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file (PNG, JPG or SVG).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Logo is too large. Please use an image under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => patch({ logoDataUrl: String(reader.result) });
    reader.readAsDataURL(file);
  };

  const patchItem = (id: string, partial: Partial<LineItem>) =>
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...partial } : item)),
    }));

  const addItem = () =>
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: uid(), name: "", quantity: 1, price: 0 }],
    }));

  const removeItem = (id: string) =>
    setData((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items,
    }));

  const applyTemplate = (slug: string) => {
    const template = getTemplate(slug);
    if (!template) return;
    setData(receiptFromTemplate(template));
    setActiveTemplate(slug);
    setFormKey((k) => k + 1); // remount form inputs with new defaults
  };

  const handleExport = async (kind: "png" | "pdf") => {
    if (!receiptRef.current || exporting) return;
    setExporting(kind);
    try {
      const filename = exportFilename(data.businessName, data.receiptNumber);
      if (kind === "png") await downloadPng(receiptRef.current, filename);
      else await downloadPdf(receiptRef.current, filename);
    } catch {
      alert("Sorry, the export failed. Please try again.");
    } finally {
      setExporting(null);
    }
  };

  const totals = calcTotals(data);

  const downloadButtons = (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => handleExport("pdf")}
        disabled={exporting !== null}
        className="flex-1 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md disabled:opacity-60"
      >
        {exporting === "pdf" ? "Preparing PDF…" : "Download PDF"}
      </button>
      <button
        type="button"
        onClick={() => handleExport("png")}
        disabled={exporting !== null}
        className="flex-1 rounded-full border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 disabled:opacity-60"
      >
        {exporting === "png" ? "Preparing PNG…" : "Download PNG"}
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Template quick-switch */}
      <div className="-mx-4 overflow-x-auto px-4 py-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => applyTemplate(t.slug)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeTemplate === t.slug
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              <span aria-hidden="true">{t.icon}</span>
              {t.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile tab switch */}
      <div className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-slate-100 p-1 lg:hidden">
        {(["edit", "preview"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMobileTab(tab)}
            className={`rounded-full py-2 text-sm font-semibold capitalize transition-colors ${
              mobileTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            {tab === "edit" ? "✏️ Edit" : "🧾 Preview"}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px]">
        {/* ====== FORM ====== */}
        <div
          key={formKey}
          className={`space-y-5 ${mobileTab === "edit" ? "" : "hidden"} lg:block`}
        >
          <FormSection title="Business Details">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-medium text-slate-600">
                  Your Logo (optional)
                </span>
                <div className="flex items-center gap-3">
                  {data.logoDataUrl ? (
                    <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={data.logoDataUrl}
                        alt="Logo preview"
                        className="max-h-12 w-auto object-contain"
                      />
                    </span>
                  ) : (
                    <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-slate-300 text-slate-300">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </span>
                  )}
                  <div className="flex flex-col gap-1.5">
                    <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                      {data.logoDataUrl ? "Change logo" : "Upload logo"}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml,image/webp"
                        className="hidden"
                        onChange={(e) => handleLogoUpload(e.target.files?.[0])}
                      />
                    </label>
                    {data.logoDataUrl && (
                      <button
                        type="button"
                        onClick={() => patch({ logoDataUrl: "" })}
                        className="text-left text-xs font-medium text-red-600 hover:text-red-700"
                      >
                        Remove logo
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <TextField
                  label="Business Name"
                  defaultValue={data.businessName}
                  onChange={(v) => patch({ businessName: v })}
                  placeholder="e.g. Daily Grind Coffee Co."
                />
              </div>
              <TextField
                label="Address Line 1"
                defaultValue={data.addressLine1}
                onChange={(v) => patch({ addressLine1: v })}
                placeholder="Street address"
              />
              <TextField
                label="Address Line 2"
                defaultValue={data.addressLine2}
                onChange={(v) => patch({ addressLine2: v })}
                placeholder="City, State ZIP"
              />
              <TextField
                label="Phone"
                defaultValue={data.phone}
                onChange={(v) => patch({ phone: v })}
                placeholder="(555) 000-0000"
              />
              <TextField
                label="Website (optional)"
                defaultValue={data.website}
                onChange={(v) => patch({ website: v })}
                placeholder="www.example.com"
              />
            </div>
          </FormSection>

          <FormSection title="Receipt Details">
            <div className="grid gap-4 sm:grid-cols-3">
              <TextField
                label="Date"
                type="date"
                defaultValue={data.date}
                onChange={(v) => patch({ date: v })}
              />
              <TextField
                label="Time"
                type="time"
                defaultValue={data.time}
                onChange={(v) => patch({ time: v })}
              />
              <TextField
                label="Receipt Number"
                defaultValue={data.receiptNumber}
                onChange={(v) => patch({ receiptNumber: v })}
              />
              <TextField
                label="Cashier / Server (optional)"
                defaultValue={data.cashier}
                onChange={(v) => patch({ cashier: v })}
                placeholder="e.g. Cashier: Sam"
              />
              <TextField
                label="Register / Table (optional)"
                defaultValue={data.register}
                onChange={(v) => patch({ register: v })}
                placeholder="e.g. Register 3"
              />
              <SelectField
                label="Currency"
                defaultValue={data.currency}
                onChange={(v) => patch({ currency: v })}
                options={CURRENCIES.map((c) => ({ value: c.code, label: c.label }))}
              />
            </div>
          </FormSection>

          <FormSection title="Items">
            <div className="space-y-3">
              <div className="hidden grid-cols-[1fr_72px_96px_32px] gap-2 text-[11px] font-medium uppercase tracking-wider text-slate-400 sm:grid">
                <span>Item name</span>
                <span>Qty</span>
                <span>Unit price</span>
                <span />
              </div>
              {data.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_60px_80px_32px] gap-2 sm:grid-cols-[1fr_72px_96px_32px]"
                >
                  <input
                    type="text"
                    defaultValue={item.name}
                    placeholder="Item name"
                    onChange={(e) => patchItem(item.id, { name: e.target.value })}
                    className={inputClass}
                    aria-label="Item name"
                  />
                  <input
                    type="number"
                    defaultValue={item.quantity || ""}
                    min={0}
                    step="any"
                    placeholder="1"
                    onChange={(e) =>
                      patchItem(item.id, { quantity: parseFloat(e.target.value) || 0 })
                    }
                    className={inputClass}
                    aria-label="Quantity"
                  />
                  <input
                    type="number"
                    defaultValue={item.price || ""}
                    min={0}
                    step="0.01"
                    placeholder="0.00"
                    onChange={(e) =>
                      patchItem(item.id, { price: parseFloat(e.target.value) || 0 })
                    }
                    className={inputClass}
                    aria-label="Unit price"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="flex items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addItem}
                className="w-full rounded-lg border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:border-indigo-400 hover:text-indigo-600"
              >
                + Add Item
              </button>
            </div>
          </FormSection>

          <FormSection title="Tax, Discount & Tip">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Tax Label"
                defaultValue={data.taxLabel}
                onChange={(v) => patch({ taxLabel: v })}
                placeholder="Sales Tax / VAT / GST"
              />
              <NumberField
                label="Tax Rate (%)"
                defaultValue={data.taxRate}
                onChange={(v) => patch({ taxRate: v })}
                step="0.01"
                placeholder="e.g. 8.25"
              />
              <NumberField
                label="Discount Amount"
                defaultValue={data.discount}
                onChange={(v) => patch({ discount: v })}
              />
              <NumberField
                label="Tip / Gratuity"
                defaultValue={data.tip}
                onChange={(v) => patch({ tip: v })}
              />
            </div>
          </FormSection>

          <FormSection title="Payment">
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Payment Method"
                defaultValue={data.paymentMethod}
                onChange={(v) => patch({ paymentMethod: v as PaymentMethod })}
                options={PAYMENT_METHODS.map((m) => ({ value: m, label: m }))}
              />
              {data.paymentMethod === "Cash" ? (
                <NumberField
                  label="Amount Tendered (for change)"
                  defaultValue={data.amountTendered}
                  onChange={(v) => patch({ amountTendered: v })}
                />
              ) : (
                <TextField
                  label="Card Last 4 Digits"
                  defaultValue={data.cardLastFour}
                  onChange={(v) => patch({ cardLastFour: v.replace(/\D/g, "").slice(0, 4) })}
                  placeholder="4821"
                />
              )}
            </div>
          </FormSection>

          <FormSection title="Style & Footer">
            <div className="space-y-4">
              <div>
                <span className="mb-1.5 block text-xs font-medium text-slate-600">Receipt Style</span>
                <div className="grid grid-cols-3 gap-1 rounded-full bg-slate-100 p-1">
                  {PAPER_STYLES.map((style) => (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => patch({ paperStyle: style.value })}
                      className={`rounded-full py-2 text-sm font-medium transition-colors ${
                        data.paperStyle === style.value
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
              <TextField
                label="Footer Message"
                defaultValue={data.footerMessage}
                onChange={(v) => patch({ footerMessage: v })}
                placeholder="Thank you for your business!"
              />
              <label className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  defaultChecked={data.showBarcode}
                  onChange={(e) => patch({ showBarcode: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-700">Show barcode</span>
              </label>
            </div>
          </FormSection>
        </div>

        {/* ====== PREVIEW ====== */}
        <div className={`${mobileTab === "preview" ? "" : "hidden"} lg:block`}>
          <div className="lg:sticky lg:top-20">
            <div className="rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200/60 p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-700">Live Preview</h2>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  Total: {formatMoney(totals.total, data.currency)}
                </span>
              </div>
              <div className="flex justify-center">
                <div ref={receiptRef}>
                  <ReceiptPaper data={data} />
                </div>
              </div>
              <div className="mt-6">{downloadButtons}</div>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400">
                Free download · No watermark · No sign-up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
