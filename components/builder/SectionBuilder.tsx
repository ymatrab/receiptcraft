"use client";

import { useEffect, useRef, useState } from "react";
import type { FontFamily } from "@/lib/types";
import type {
  HeaderSection,
  ItemsSection,
  ReceiptDoc,
  Section,
  SectionType,
  TwoColSection,
} from "@/lib/sections";
import type { PresetId } from "@/lib/sections";
import {
  blankDoc,
  docFromReceiptData,
  itemsTotals,
  newSection,
  presetDoc,
  PRESETS,
  SECTION_LABEL,
} from "@/lib/sections";
import { getTemplate, TEMPLATES } from "@/lib/templates";
import { receiptFromTemplate } from "@/lib/receipt";
import { CURRENCIES, formatMoney, uid } from "@/lib/format";
import type { ReceiptData } from "@/lib/types";
import type { AiReceiptResult } from "@/lib/ai-receipt";
import { downloadPng, downloadPdf, exportFilename } from "@/lib/download";
import { useAccount } from "@/lib/useAccount";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/config";
import Link from "next/link";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import Watermark from "@/components/receipt/Watermark";
import AddSectionModal from "./AddSectionModal";
import {
  AlignToggle,
  DividerRow,
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
  Toggle,
  inputClass,
} from "./fields";

const FONTS: { value: FontFamily; label: string }[] = [
  { value: "mono", label: "Monospace (thermal)" },
  { value: "sans", label: "Sans-serif (modern)" },
  { value: "serif", label: "Serif (elegant)" },
  { value: "courier", label: "Courier (classic receipt)" },
  { value: "oswald", label: "Oswald (bold condensed)" },
  { value: "playfair", label: "Playfair (luxury serif)" },
];
const ITEM_STYLES = [
  { value: "table", label: "Table (Item / Qty / Price / Total)" },
  { value: "qtycol", label: "Qty + name + total" },
  { value: "lined", label: "Name + total" },
  { value: "stacked", label: "Stacked (qty @ price)" },
  { value: "equals", label: "Qty name = total" },
];
const CARD_TYPES = ["Credit", "Debit", "Mobile Payment", "Gift Card"];
const DEFAULT_COLS = { item: "Item", qty: "Qty", price: "Price", total: "Total" };
const COLS = ["item", "qty", "price", "total"] as const;

function getQueryTemplate(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("template") ?? "";
}

export default function SectionBuilder() {
  const [doc, setDoc] = useState<ReceiptDoc>(blankDoc);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [exporting, setExporting] = useState<"png" | "pdf" | null>(null);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [activeTemplate, setActiveTemplate] = useState("");
  const dragIndex = useRef<number | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const { account } = useAccount();
  // Free / anonymous users export with a watermark; Pro removes it.
  const watermark = !account.isPro;
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [exportFormat, setExportFormat] = useState<"pdf" | "png">("pdf");

  useEffect(() => {
    // A receipt generated from the homepage AI box, handed off via sessionStorage.
    const handoff = sessionStorage.getItem("rc_ai_receipt");
    if (handoff) {
      sessionStorage.removeItem("rc_ai_receipt");
      try {
        applyAi(JSON.parse(handoff) as AiReceiptResult);
        return;
      } catch {
        /* fall through to template/receipt handling */
      }
    }
    const params = new URLSearchParams(window.location.search);
    const receiptId = params.get("receipt");
    if (receiptId && supabaseConfigured) {
      loadReceipt(receiptId);
      return;
    }
    const slug = getQueryTemplate();
    if (slug) applyTemplate(slug);
  }, []);

  const loadReceipt = async (id: string) => {
    const supabase = createClient();
    const { data } = await supabase.from("receipts").select("data").eq("id", id).maybeSingle();
    if (data?.data) setDoc(data.data as ReceiptDoc);
  };

  const saveReceipt = async () => {
    if (saveState === "saving") return;
    setSaveState("saving");
    const supabase = createClient();
    const header = doc.sections.find((s) => s.type === "header") as HeaderSection | undefined;
    const { error } = await supabase.from("receipts").insert({
      user_id: account.userId,
      title: header?.storeName || "Untitled receipt",
      data: doc,
    });
    if (error) {
      setSaveState("idle");
      alert("Couldn't save. Make sure you're logged in.");
      return;
    }
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2000);
  };

  // ---- mutations ----
  const patchSettings = (p: Partial<ReceiptDoc["settings"]>) =>
    setDoc((d) => ({ ...d, settings: { ...d.settings, ...p } }));

  const patchSection = (id: string, patch: Record<string, unknown>) =>
    setDoc((d) => ({
      ...d,
      sections: d.sections.map((s) => (s.id === id ? ({ ...s, ...patch } as Section) : s)),
    }));

  const removeSection = (id: string) =>
    setDoc((d) => ({ ...d, sections: d.sections.filter((s) => s.id !== id) }));

  const addSection = (type: SectionType) => {
    setDoc((d) => ({ ...d, sections: [...d.sections, newSection(type, d.settings.currency)] }));
    setShowAdd(false);
  };

  const reorder = (from: number, to: number) =>
    setDoc((d) => {
      if (from === to || from < 0 || to < 0) return d;
      const next = [...d.sections];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return { ...d, sections: next };
    });

  const applyTemplate = (slug: string) => {
    const t = getTemplate(slug);
    if (!t) return;
    setDoc(docFromReceiptData(receiptFromTemplate(t)));
    setActiveTemplate(slug);
    setCollapsed({});
  };

  const reset = () => {
    setDoc(blankDoc());
    setActiveTemplate("");
  };

  // Convert the AI result into a full ReceiptData and load it into the builder.
  const applyAi = (r: AiReceiptResult) => {
    const data: ReceiptData = {
      businessName: r.businessName,
      logoDataUrl: "",
      addressLine1: r.addressLine1,
      addressLine2: r.addressLine2,
      phone: r.phone,
      website: r.website,
      receiptNumber: r.receiptNumber,
      date: r.date,
      time: r.time,
      cashier: "",
      register: "",
      items: r.items.map((it) => ({ id: uid(), name: it.name, quantity: it.quantity, price: it.price })),
      currency: r.currency || "USD",
      taxLabel: r.taxLabel || "Sales Tax",
      taxRate: r.taxRate || 0,
      discount: 0,
      tip: 0,
      paymentMethod: (r.paymentMethod as ReceiptData["paymentMethod"]) || "Credit Card",
      cardLastFour: "",
      amountTendered: 0,
      footerMessage: r.footerMessage,
      showBarcode: true,
      paperStyle: "thermal",
    };
    setDoc(docFromReceiptData(data));
    setActiveTemplate("");
    setCollapsed({});
  };

  const generateAi = async () => {
    if (!aiPrompt.trim() || aiLoading) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error ?? "Generation failed.");
        return;
      }
      applyAi(data.receipt as AiReceiptResult);
      setAiPrompt("");
    } catch {
      setAiError("Generation failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const applyPreset = (id: PresetId) => {
    setDoc(presetDoc(id));
    setActiveTemplate("");
    setCollapsed({});
  };

  const handleFile = (file: File | undefined, apply: (dataUrl: string) => void) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Please choose an image file.");
    if (file.size > 2 * 1024 * 1024) return alert("Image too large (max 2 MB).");
    const reader = new FileReader();
    reader.onload = () => apply(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleExport = async (kind: "png" | "pdf") => {
    if (!receiptRef.current || exporting) return;
    setExporting(kind);
    try {
      const header = doc.sections.find((s) => s.type === "header") as HeaderSection | undefined;
      const dt = doc.sections.find((s) => s.type === "datetime");
      const filename = exportFilename(
        header?.storeName ?? "receipt",
        (dt && "receiptNumber" in dt && dt.receiptNumber) || "0000"
      );
      if (kind === "png") await downloadPng(receiptRef.current, filename);
      else await downloadPdf(receiptRef.current, filename);
    } catch {
      alert("Sorry, the export failed. Please try again.");
    } finally {
      setExporting(null);
    }
  };

  const grandTotal = doc.sections.reduce(
    (sum, s) => (s.type === "items" ? sum + itemsTotals(s).total : sum),
    0
  );

  // ---- per-section item helpers ----
  const updateItem = (sec: ItemsSection, itemId: string, patch: Record<string, unknown>) =>
    patchSection(sec.id, {
      items: sec.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)),
    });
  const updateRow = (sec: TwoColSection, idx: number, patch: Record<string, unknown>) =>
    patchSection(sec.id, { rows: sec.rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)) });

  function sectionBody(s: Section) {
    switch (s.type) {
      case "header":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Alignment</span>
              <AlignToggle value={s.align ?? "center"} onChange={(v) => patchSection(s.id, { align: v })} />
            </div>
            <div>
              <span className="mb-1.5 block text-xs font-medium text-slate-600">Logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0], (u) => patchSection(s.id, { logoDataUrl: u }))}
                className="text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-indigo-700"
              />
            </div>
            <TextField label="Big logo text (optional)" defaultValue={s.logoText ?? ""} onChange={(v) => patchSection(s.id, { logoText: v || undefined })} placeholder="e.g. ACME" />
            <TextField label="Store name" defaultValue={s.storeName} onChange={(v) => patchSection(s.id, { storeName: v })} />
            <TextAreaField label="Address" defaultValue={s.address} onChange={(v) => patchSection(s.id, { address: v })} placeholder={"123 Main St\nCity, ST 00000"} />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Phone" defaultValue={s.phone ?? ""} onChange={(v) => patchSection(s.id, { phone: v })} />
              <TextField label="Website / Email" defaultValue={s.website ?? ""} onChange={(v) => patchSection(s.id, { website: v })} />
            </div>
          </div>
        );
      case "datetime":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Alignment</span>
              <AlignToggle value={s.align ?? "left"} onChange={(v) => patchSection(s.id, { align: v })} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Date" type="date" defaultValue={s.date} onChange={(v) => patchSection(s.id, { date: v })} />
              <TextField label="Time" type="time" defaultValue={s.time} onChange={(v) => patchSection(s.id, { time: v })} />
            </div>
            <TextField label="Receipt number" defaultValue={s.receiptNumber ?? ""} onChange={(v) => patchSection(s.id, { receiptNumber: v })} />
          </div>
        );
      case "twocol":
        return (
          <div className="space-y-3">
            <TextField label="Title (optional)" defaultValue={s.title ?? ""} onChange={(v) => patchSection(s.id, { title: v || undefined })} />
            {s.rows.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <input className={inputClass} defaultValue={r.label ?? ""} placeholder="Label" onChange={(e) => updateRow(s, i, { label: e.target.value })} />
                <input className={inputClass} defaultValue={r.value} placeholder="Value" onChange={(e) => updateRow(s, i, { value: e.target.value })} />
                <button type="button" aria-label="Remove line" onClick={() => patchSection(s.id, { rows: s.rows.filter((_, j) => j !== i) })} className="text-red-500 hover:text-red-600">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => patchSection(s.id, { rows: [...s.rows, { label: "", value: "" }] })} className="w-full rounded-lg border border-dashed border-slate-300 py-2 text-sm font-medium text-slate-500 hover:border-indigo-400 hover:text-indigo-600">+ Add line</button>
          </div>
        );
      case "items":
        return (
          <div className="space-y-3">
            <div className="flex justify-end">
              <button type="button" onClick={() => patchSection(s.id, { items: [...s.items, { id: uid(), name: "", quantity: 1, price: 0 }] })} className="text-sm font-semibold text-indigo-600">+ Add item</button>
            </div>
            {s.items.map((it) => (
              <div key={it.id} className="grid grid-cols-[52px_1fr_80px_28px] items-center gap-2">
                <input className={inputClass} type="number" defaultValue={it.quantity} onChange={(e) => updateItem(s, it.id, { quantity: parseFloat(e.target.value) || 0 })} aria-label="Qty" />
                <input className={inputClass} defaultValue={it.name} placeholder="Item name" onChange={(e) => updateItem(s, it.id, { name: e.target.value })} aria-label="Name" />
                <input className={inputClass} type="number" step="0.01" defaultValue={it.price} onChange={(e) => updateItem(s, it.id, { price: parseFloat(e.target.value) || 0 })} aria-label="Price" />
                <button type="button" aria-label="Remove item" onClick={() => patchSection(s.id, { items: s.items.filter((x) => x.id !== it.id) })} className="text-red-500 hover:text-red-600">✕</button>
              </div>
            ))}
            <SelectField label="Item layout" defaultValue={s.itemStyle ?? "table"} onChange={(v) => patchSection(s.id, { itemStyle: v })} options={ITEM_STYLES} />
            {(s.itemStyle ?? "table") === "table" && (
              <div>
                <span className="mb-1.5 block text-xs font-medium text-slate-600">Column names</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {COLS.map((k) => (
                    <input
                      key={k}
                      className={inputClass}
                      defaultValue={(s.columns ?? DEFAULT_COLS)[k]}
                      onChange={(e) =>
                        patchSection(s.id, { columns: { ...DEFAULT_COLS, ...s.columns, [k]: e.target.value } })
                      }
                      aria-label={`${k} column name`}
                    />
                  ))}
                </div>
              </div>
            )}
            {s.itemStyle === "lined" && (
              <div className="grid grid-cols-2 gap-2">
                <input className={inputClass} placeholder="Left header" defaultValue={s.itemHeader?.left ?? ""} onChange={(e) => patchSection(s.id, { itemHeader: { left: e.target.value, right: s.itemHeader?.right ?? "" } })} aria-label="Left header" />
                <input className={inputClass} placeholder="Right header" defaultValue={s.itemHeader?.right ?? ""} onChange={(e) => patchSection(s.id, { itemHeader: { left: s.itemHeader?.left ?? "", right: e.target.value } })} aria-label="Right header" />
              </div>
            )}
            <div className="grid items-start gap-3 sm:grid-cols-3">
              <NumberField label="Tax rate (%)" defaultValue={s.taxRate} onChange={(v) => patchSection(s.id, { taxRate: v })} />
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-600">
                    Discount {s.discountPercent ? "(%)" : "($)"}
                  </span>
                  <div className="inline-flex overflow-hidden rounded-md border border-slate-200 text-xs">
                    <button type="button" onClick={() => patchSection(s.id, { discountPercent: false })} className={`px-2 py-0.5 ${!s.discountPercent ? "bg-indigo-50 text-indigo-700" : "text-slate-500"}`}>$</button>
                    <button type="button" onClick={() => patchSection(s.id, { discountPercent: true })} className={`px-2 py-0.5 ${s.discountPercent ? "bg-indigo-50 text-indigo-700" : "text-slate-500"}`}>%</button>
                  </div>
                </div>
                <input type="number" step="0.01" className={inputClass} defaultValue={s.discount || ""} placeholder="0" onChange={(e) => patchSection(s.id, { discount: parseFloat(e.target.value) || 0 })} aria-label="Discount" />
              </div>
              <NumberField label="Tip" defaultValue={s.tip} onChange={(v) => patchSection(s.id, { tip: v })} />
            </div>
            <TextField label="Total label" defaultValue={s.grandTotalLabel ?? ""} onChange={(v) => patchSection(s.id, { grandTotalLabel: v || undefined })} placeholder="TOTAL" />
            <DividerRow label="Divider after totals" value={s.totalsDivider ?? "none"} onChange={(v) => patchSection(s.id, { totalsDivider: v })} />
          </div>
        );
      case "payment":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
              {(["Cash", "Card"] as const).map((m) => (
                <button key={m} type="button" onClick={() => patchSection(s.id, { method: m })} className={`rounded-md py-2 text-sm font-medium ${s.method === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{m}</button>
              ))}
            </div>
            {s.method === "Card" ? (
              <>
                <SelectField label="Card type" defaultValue={s.cardType ?? "Credit"} onChange={(v) => patchSection(s.id, { cardType: v })} options={CARD_TYPES.map((c) => ({ value: c, label: c }))} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField label="Card last 4" defaultValue={s.cardLastFour ?? ""} onChange={(v) => patchSection(s.id, { cardLastFour: v.replace(/\D/g, "").slice(0, 4) })} placeholder="1234" />
                  <TextField label="Auth code" defaultValue={s.authCode ?? ""} onChange={(v) => patchSection(s.id, { authCode: v })} placeholder="123456" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Show card authorisation block</span>
                  <Toggle checked={!!s.showCardAuth} onChange={(c) => patchSection(s.id, { showCardAuth: c })} />
                </div>
              </>
            ) : (
              <NumberField label="Amount tendered (for change)" defaultValue={s.amountTendered ?? 0} onChange={(v) => patchSection(s.id, { amountTendered: v })} />
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Inline payment line</span>
              <Toggle checked={!!s.inline} onChange={(c) => patchSection(s.id, { inline: c })} />
            </div>
          </div>
        );
      case "message":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Alignment</span>
              <AlignToggle value={s.align ?? "center"} onChange={(v) => patchSection(s.id, { align: v })} />
            </div>
            <TextAreaField label="Message" defaultValue={s.text} onChange={(v) => patchSection(s.id, { text: v })} />
          </div>
        );
      case "barcode":
        return (
          <div className="space-y-3">
            <TextField label="Value" defaultValue={s.value} onChange={(v) => patchSection(s.id, { value: v })} />
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Show value text</span>
              <Toggle checked={s.showText ?? true} onChange={(c) => patchSection(s.id, { showText: c })} />
            </div>
          </div>
        );
      case "qr":
        return <TextField label="Value" defaultValue={s.value} onChange={(v) => patchSection(s.id, { value: v })} />;
      case "image":
        return (
          <div className="space-y-3">
            <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0], (u) => patchSection(s.id, { src: u }))} className="text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-indigo-700" />
            <label className="block text-xs font-medium text-slate-600">
              Width: {s.widthPct ?? 50}%
              <input type="range" min={20} max={100} defaultValue={s.widthPct ?? 50} onChange={(e) => patchSection(s.id, { widthPct: parseInt(e.target.value) })} className="mt-1 w-full" />
            </label>
          </div>
        );
      case "signature":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Alignment</span>
              <AlignToggle value={s.align ?? "center"} onChange={(v) => patchSection(s.id, { align: v })} />
            </div>
            <TextField label="Label" defaultValue={s.label} onChange={(v) => patchSection(s.id, { label: v })} />
          </div>
        );
      case "spacer":
        return (
          <label className="block text-xs font-medium text-slate-600">
            Height: {s.size ?? 24}px
            <input type="range" min={8} max={96} defaultValue={s.size ?? 24} onChange={(e) => patchSection(s.id, { size: parseInt(e.target.value) })} className="mt-1 w-full" />
          </label>
        );
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="sticky top-16 z-30 -mx-4 mb-1 flex items-center justify-end gap-2 border-b border-slate-200 bg-slate-50/80 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {/* Format toggle */}
        <div className="inline-flex overflow-hidden rounded-lg border border-slate-300 bg-white text-xs font-medium">
          {(["pdf", "png"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setExportFormat(f)}
              className={`px-3 py-1.5 uppercase ${exportFormat === f ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Primary download */}
        <button
          type="button"
          onClick={() => handleExport(exportFormat)}
          disabled={!!exporting}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
        >
          {exporting ? "Preparing…" : `⬇ Download`}
        </button>

        {account.isLoggedIn && (
          <button
            type="button"
            onClick={saveReceipt}
            disabled={saveState === "saving"}
            title="Save to your account"
            className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-60"
          >
            {saveState === "saving" ? "…" : saveState === "saved" ? "✓" : "💾"}
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          title="Reset"
          className="rounded-lg px-2.5 py-1.5 text-sm text-slate-400 hover:text-slate-700"
        >
          ↺
        </button>
      </div>

      {/* AI generator */}
      <div className="mt-4 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-4">
        <div className="flex items-center gap-2">
          <span aria-hidden="true">✨</span>
          <span className="text-sm font-semibold text-slate-900">Generate with AI</span>
          {!account.isPro && (
            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-indigo-600">
              {account.isLoggedIn ? "Free: limited per day" : "Free to try"}
            </span>
          )}
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateAi()}
            placeholder="e.g. Starbucks receipt, 2 lattes and a muffin, this morning"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={generateAi}
            disabled={aiLoading || !aiPrompt.trim()}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {aiLoading ? "Generating…" : "Generate"}
          </button>
        </div>
        {aiError && (
          <p className="mt-2 text-xs text-red-600">
            {aiError}{" "}
            {aiError.includes("Upgrade") || aiError.includes("upgrade") ? (
              <Link href="/pricing" className="font-semibold underline">
                See plans
              </Link>
            ) : null}
          </p>
        )}
      </div>

      {/* Start-from-scratch presets */}
      <div className="flex flex-wrap items-center gap-2 pt-4">
        <span className="text-xs font-medium text-slate-500">Start from scratch:</span>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyPreset(p.id)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-indigo-300 hover:text-indigo-700"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Template quick-switch */}
      <div className="-mx-4 overflow-x-auto px-4 pb-4 pt-3 sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          {TEMPLATES.map((t) => (
            <button key={t.slug} type="button" onClick={() => applyTemplate(t.slug)} className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${activeTemplate === t.slug ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"}`}>
              <span aria-hidden="true">{t.icon}</span>
              {t.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-slate-100 p-1 lg:hidden">
        {(["edit", "preview"] as const).map((tab) => (
          <button key={tab} type="button" onClick={() => setMobileTab(tab)} className={`rounded-full py-2 text-sm font-semibold capitalize ${mobileTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{tab === "edit" ? "✏️ Edit" : "🧾 Preview"}</button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px]">
        {/* EDITOR */}
        <div className={`space-y-4 ${mobileTab === "edit" ? "" : "hidden"} lg:block`}>
          {/* Settings */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <button type="button" onClick={() => setSettingsOpen((o) => !o)} className="flex w-full items-center justify-between p-4 text-sm font-semibold text-slate-900">
              <span>⚙️ Settings</span>
              <span>{settingsOpen ? "▴" : "▾"}</span>
            </button>
            {settingsOpen && (
              <div className="grid gap-3 border-t border-slate-100 p-4 sm:grid-cols-2">
                <SelectField label="Font" defaultValue={doc.settings.font} onChange={(v) => patchSettings({ font: v as FontFamily })} options={FONTS} />
                <SelectField label="Currency" defaultValue={doc.settings.currency} onChange={(v) => patchSettings({ currency: v })} options={CURRENCIES.map((c) => ({ value: c.code, label: c.label }))} />
                <label className="block text-xs font-medium text-slate-600">
                  Paper width: {doc.settings.widthPx}px
                  <input type="range" min={300} max={460} defaultValue={doc.settings.widthPx} onChange={(e) => patchSettings({ widthPx: parseInt(e.target.value) })} className="mt-1 w-full" />
                </label>
                <label className="block text-xs font-medium text-slate-600">
                  Accent color
                  <input type="color" defaultValue={doc.settings.accent} onChange={(e) => patchSettings({ accent: e.target.value })} className="mt-1 block h-9 w-full rounded-lg border border-slate-300" />
                </label>
              </div>
            )}
          </div>

          {/* Section cards */}
          {doc.sections.map((s, i) => (
            <div
              key={s.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIndex.current !== null) reorder(dragIndex.current, i);
                dragIndex.current = null;
              }}
            >
              <div className="flex items-center gap-2 border-b border-slate-100 p-4">
                <span
                  draggable
                  onDragStart={() => (dragIndex.current = i)}
                  className="cursor-grab select-none text-slate-300"
                  aria-label="Drag to reorder"
                >
                  ⠿
                </span>
                <span className="flex-1 text-sm font-semibold text-slate-900">{SECTION_LABEL[s.type]}</span>
                <button type="button" onClick={() => reorder(i, i - 1)} disabled={i === 0} className="text-slate-400 hover:text-slate-600 disabled:opacity-30" aria-label="Move up">↑</button>
                <button type="button" onClick={() => reorder(i, i + 1)} disabled={i === doc.sections.length - 1} className="text-slate-400 hover:text-slate-600 disabled:opacity-30" aria-label="Move down">↓</button>
                <button type="button" onClick={() => setCollapsed((c) => ({ ...c, [s.id]: !c[s.id] }))} className="text-slate-400 hover:text-slate-600" aria-label="Collapse">{collapsed[s.id] ? "▾" : "▴"}</button>
                <button type="button" onClick={() => removeSection(s.id)} className="text-red-400 hover:text-red-600" aria-label="Remove section">✕</button>
              </div>
              {!collapsed[s.id] && (
                <div className="space-y-4 p-4">
                  {sectionBody(s)}
                  {s.type !== "items" && (
                    <DividerRow value={s.divider ?? "none"} onChange={(v) => patchSection(s.id, { divider: v })} />
                  )}
                  {s.type === "items" && (
                    <DividerRow label="Divider after items" value={s.divider ?? "none"} onChange={(v) => patchSection(s.id, { divider: v })} />
                  )}
                </div>
              )}
            </div>
          ))}

          <button type="button" onClick={() => setShowAdd(true)} className="w-full rounded-2xl border border-dashed border-slate-300 py-3.5 text-sm font-semibold text-slate-500 hover:border-indigo-400 hover:text-indigo-600">+ Add Section</button>
        </div>

        {/* PREVIEW */}
        <div className={`${mobileTab === "preview" ? "" : "hidden"} lg:block`}>
          <div className="lg:sticky lg:top-20">
            <div className="rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200/60 p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-700">Live Preview</h2>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Total: {formatMoney(grandTotal, doc.settings.currency)}</span>
              </div>
              <div className="flex justify-center">
                <div ref={receiptRef} className="relative">
                  <ReceiptDocPaper doc={doc} />
                  {watermark && <Watermark />}
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => handleExport("pdf")} disabled={!!exporting} className="flex-1 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60">{exporting === "pdf" ? "Preparing PDF…" : "Download PDF"}</button>
                <button type="button" onClick={() => handleExport("png")} disabled={!!exporting} className="flex-1 rounded-full border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-60">{exporting === "png" ? "Preparing PNG…" : "Download PNG"}</button>
              </div>
              {watermark ? (
                <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
                  Free download · includes a small watermark ·{" "}
                  <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-700">
                    Upgrade to remove
                  </Link>
                </p>
              ) : (
                <p className="mt-3 text-center text-[11px] leading-relaxed text-emerald-600">
                  ✓ Pro · watermark-free HD downloads
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAdd && <AddSectionModal onPick={addSection} onClose={() => setShowAdd(false)} />}
    </div>
  );
}
