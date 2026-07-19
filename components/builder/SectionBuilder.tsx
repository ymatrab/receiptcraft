"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type {
  FontFamily,
  FontScale,
  LetterSpacingPreset,
  LineSpacing,
  PaperFinish,
  TextWeight,
} from "@/lib/types";
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
  newDocId,
  newSection,
  presetDoc,
  PRESETS,
  SECTION_LABEL,
  SPACING_DEFAULTS,
  WIDTH_PRESETS,
} from "@/lib/sections";
import { getTemplate, TEMPLATES } from "@/lib/templates";
import { receiptFromTemplate } from "@/lib/receipt";
import {
  deleteTemplate,
  listTemplates,
  loadAutosave,
  saveAutosave,
  saveTemplate,
  type SavedTemplate,
} from "@/lib/local-templates";
import { CURRENCIES, formatMoney, uid } from "@/lib/format";
import { SITE } from "@/lib/site";
import type { ReceiptData } from "@/lib/types";
import type { AiReceiptResult } from "@/lib/ai-receipt";
import { downloadPng, downloadJpg, downloadPdf, exportFilename } from "@/lib/download";
import { analytics } from "@/lib/analytics";
import { useAccount } from "@/lib/useAccount";
import { FREE_LIMITS } from "@/lib/plans";
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
  // System / classic
  { value: "mono", label: "Monospace (thermal)" },
  { value: "sans", label: "Sans-serif (modern)" },
  { value: "serif", label: "Serif (elegant)" },
  { value: "courier", label: "Courier Prime (classic receipt)" },
  { value: "oswald", label: "Oswald (bold condensed)" },
  { value: "playfair", label: "Playfair (luxury serif)" },
  // Monospace — thermal / POS look
  { value: "roboto-mono", label: "Roboto Mono (clean modern)" },
  { value: "ibm-plex-mono", label: "IBM Plex Mono (professional)" },
  { value: "space-mono", label: "Space Mono (stylish)" },
  { value: "inconsolata", label: "Inconsolata (compact thermal)" },
  { value: "source-code-pro", label: "Source Code Pro (clean columns)" },
  { value: "noto-sans-mono", label: "Noto Sans Mono (multilingual)" },
  { value: "anonymous-pro", label: "Anonymous Pro (classic POS)" },
  { value: "cutive-mono", label: "Cutive Mono (vintage)" },
  { value: "fira-mono", label: "Fira Mono (modern technical)" },
  { value: "ubuntu-mono", label: "Ubuntu Mono (rounded)" },
  { value: "dm-mono", label: "DM Mono (minimal digital)" },
  { value: "oxygen-mono", label: "Oxygen Mono (simple thermal)" },
  { value: "share-tech-mono", label: "Share Tech Mono (terminal/POS)" },
  { value: "vt323", label: "VT323 (retro dot-matrix)" },
  // Sans / email & invoice look
  { value: "inter", label: "Inter (modern SaaS/email)" },
  { value: "roboto", label: "Roboto (simple digital)" },
  { value: "open-sans", label: "Open Sans (readable, neutral)" },
  { value: "lato", label: "Lato (friendly small business)" },
  { value: "noto-sans", label: "Noto Sans (international)" },
  { value: "work-sans", label: "Work Sans (receipt/invoice)" },
  { value: "montserrat", label: "Montserrat (premium brand)" },
  { value: "mulish", label: "Mulish (clean mobile)" },
];
const FONT_SCALES = [
  { value: "small", label: "Small" },
  { value: "normal", label: "Normal" },
  { value: "large", label: "Large" },
];
const LINE_SPACINGS = [
  { value: "compact", label: "Compact" },
  { value: "normal", label: "Normal" },
  { value: "airy", label: "Airy" },
];
const LETTER_SPACINGS = [
  { value: "tight", label: "Compressed" },
  { value: "normal", label: "Normal" },
  { value: "wide", label: "Expanded" },
];
const TEXT_WEIGHTS = [
  { value: "normal", label: "Normal" },
  { value: "medium", label: "Medium" },
  { value: "bold", label: "Bold" },
];
const PAPER_FINISHES = [
  { value: "thermal", label: "Thermal (torn paper)" },
  { value: "clean", label: "Clean white" },
  { value: "invoice", label: "Invoice" },
  { value: "email", label: "Digital / email" },
];
const ITEM_STYLES = [
  { value: "table", label: "Table (Item / Qty / Price / Total)" },
  { value: "qtycol", label: "Qty + name + total" },
  { value: "lined", label: "Name + total" },
  { value: "stacked", label: "Stacked (qty @ price)" },
  { value: "equals", label: "Qty name = total" },
];
const CARD_TYPES = ["Credit", "Debit", "Mobile Payment", "Gift Card"];
const PAYMENT_METHODS = ["Cash", "Card", "Mobile", "Gift Card"] as const;
const ENTRY_MODES = [
  { value: "Chip", label: "Chip" },
  { value: "Tap", label: "Tap / contactless" },
  { value: "Swipe", label: "Swipe" },
  { value: "Manual", label: "Manual / keyed" },
];
const DEFAULT_COLS = { item: "Item", qty: "Qty", price: "Price", total: "Total" };
const COLS = ["item", "qty", "price", "total"] as const;
type ExportKind = "png" | "jpg" | "pdf" | "pdf-print";

function getQueryTemplate(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("template") ?? "";
}

export default function SectionBuilder() {
  const [doc, setDoc] = useState<ReceiptDoc>(blankDoc);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [itemDetails, setItemDetails] = useState<Record<string, boolean>>({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [exporting, setExporting] = useState<ExportKind | null>(null);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [activeTemplate, setActiveTemplate] = useState("");
  const dragIndex = useRef<number | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const { account } = useAccount();
  // Download-quota state (from /api/downloads). A logged-in free account gets
  // FREE_LIMITS.freeReceiptDownloads clean receipts, then downloads are
  // watermarked. Pro is always clean; anonymous users must log in to download.
  const [dl, setDl] = useState<{ loggedIn: boolean; willWatermark: boolean; remaining: number | null }>({
    loggedIn: false,
    willWatermark: false,
    remaining: FREE_LIMITS.freeReceiptDownloads,
  });
  // Pins the watermark during a capture so the exported image matches the
  // claim result exactly; null means "follow the preview".
  const [captureWatermark, setCaptureWatermark] = useState<boolean | null>(null);
  // The preview shows the watermark only when THIS receipt would export
  // watermarked (logged-in free user who is out of, or hasn't claimed, credits).
  const previewWatermark = !account.isPro && account.isLoggedIn && dl.willWatermark;
  const renderWatermark = captureWatermark ?? previewWatermark;
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  // Shown when an out-of-credits free user downloads (watermark fallback).
  const [pendingExport, setPendingExport] = useState<ExportKind | null>(null);
  // Shown when an anonymous user tries to download (login is required).
  const [loginPrompt, setLoginPrompt] = useState(false);
  // Local (no-account) named templates + autosave.
  const [myTemplates, setMyTemplates] = useState<SavedTemplate[]>([]);
  const [autosaveOn, setAutosaveOn] = useState(true);
  const hydrated = useRef(false);
  // Fires `edit_started` once, on the user's first real edit (not template/AI loads).
  const editTracked = useRef(false);
  const markEdited = () => {
    if (editTracked.current) return;
    editTracked.current = true;
    analytics.editStarted(activeTemplate || undefined);
  };

  useEffect(() => {
    setMyTemplates(listTemplates());
    // A receipt generated from the homepage AI box, handed off via sessionStorage.
    const handoff = sessionStorage.getItem("rc_ai_receipt");
    if (handoff) {
      sessionStorage.removeItem("rc_ai_receipt");
      try {
        applyAi(JSON.parse(handoff) as AiReceiptResult);
        analytics.builderOpened("ai");
        return;
      } catch {
        /* fall through to template/receipt handling */
      }
    }
    const params = new URLSearchParams(window.location.search);
    const receiptId = params.get("receipt");
    if (receiptId && supabaseConfigured) {
      loadReceipt(receiptId);
      analytics.builderOpened("receipt");
      return;
    }
    const slug = getQueryTemplate();
    if (slug) {
      applyTemplate(slug);
      analytics.builderOpened("template");
      return;
    }
    // Nothing requested explicitly — restore the last autosaved draft, if any.
    const saved = loadAutosave();
    if (saved) {
      setDoc(saved);
      analytics.builderOpened("draft");
    } else {
      analytics.builderOpened("blank");
    }
  }, []);

  // Debounced autosave of the working draft to localStorage. The first run
  // (initial blank/mount state) is skipped so we don't clobber a restore.
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    if (!autosaveOn) return;
    const t = setTimeout(() => saveAutosave(doc), 600);
    return () => clearTimeout(t);
  }, [doc, autosaveOn]);

  // Every working receipt needs a stable id for download-quota accounting.
  // New docs (blank, preset, template, AI) arrive without one; assign lazily.
  useEffect(() => {
    if (!doc.id) setDoc((d) => ({ ...d, id: newDocId() }));
  }, [doc.id]);

  // Fetch this receipt's download status (clean vs. watermarked + remaining
  // credits) for the current logged-in free user, refetching when the receipt
  // identity or account changes.
  useEffect(() => {
    if (account.isPro || !account.isLoggedIn || !doc.id) return;
    let active = true;
    fetch(`/api/downloads?receiptKey=${encodeURIComponent(doc.id)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (active && s) {
          setDl({ loggedIn: Boolean(s.loggedIn), willWatermark: Boolean(s.willWatermark), remaining: s.remaining ?? null });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [doc.id, account.isLoggedIn, account.isPro]);

  const loadReceipt = async (id: string) => {
    const supabase = createClient();
    const { data } = await supabase.from("receipts").select("data").eq("id", id).maybeSingle();
    if (data?.data) {
      const loaded = data.data as ReceiptDoc;
      // Reuse the saved receipt's own id, or fall back to its DB id, so
      // re-downloading a saved receipt reuses the same download credit.
      setDoc({ ...loaded, id: loaded.id ?? id });
    }
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
    analytics.saveReceipt("account");
    setTimeout(() => setSaveState("idle"), 2000);
  };

  // ---- mutations ---- (each marks the first edit for the funnel)
  const patchSettings = (p: Partial<ReceiptDoc["settings"]>) => {
    markEdited();
    setDoc((d) => ({ ...d, settings: { ...d.settings, ...p } }));
  };

  const patchSection = (id: string, patch: Record<string, unknown>) => {
    markEdited();
    setDoc((d) => ({
      ...d,
      sections: d.sections.map((s) => (s.id === id ? ({ ...s, ...patch } as Section) : s)),
    }));
  };

  const removeSection = (id: string) => {
    markEdited();
    setDoc((d) => ({ ...d, sections: d.sections.filter((s) => s.id !== id) }));
  };

  const addSection = (type: SectionType) => {
    markEdited();
    setDoc((d) => ({ ...d, sections: [...d.sections, newSection(type, d.settings.currency)] }));
    setShowAdd(false);
  };

  const reorder = (from: number, to: number) => {
    markEdited();
    setDoc((d) => {
      if (from === to || from < 0 || to < 0) return d;
      const next = [...d.sections];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return { ...d, sections: next };
    });
  };

  const applyTemplate = (slug: string) => {
    const t = getTemplate(slug);
    if (!t) return;
    setDoc(docFromReceiptData(receiptFromTemplate(t)));
    setActiveTemplate(slug);
    setCollapsed({});
    analytics.selectTemplate(slug);
  };

  const reset = () => {
    setDoc(blankDoc());
    setActiveTemplate("");
  };

  // ---- local "save as template" -----------------------------------------
  const saveAsTemplate = () => {
    const header = doc.sections.find((s) => s.type === "header") as HeaderSection | undefined;
    const name = window.prompt("Save this layout as a template. Name it:", header?.storeName || "My template");
    if (!name?.trim()) return;
    setMyTemplates(saveTemplate(name.trim(), doc));
    analytics.saveReceipt("template");
  };
  const loadMyTemplate = (t: SavedTemplate) => {
    setDoc(t.doc);
    setActiveTemplate("");
    setCollapsed({});
  };
  const removeMyTemplate = (id: string) => setMyTemplates(deleteTemplate(id));

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
    analytics.aiGenerate("start", activeTemplate || undefined);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        analytics.aiGenerate("error", activeTemplate || undefined);
        setAiError(data.error ?? "Generation failed.");
        return;
      }
      analytics.aiGenerate("success", activeTemplate || undefined);
      applyAi(data.receipt as AiReceiptResult);
      setAiPrompt("");
    } catch {
      analytics.aiGenerate("error", activeTemplate || undefined);
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

  const handleExport = async (kind: ExportKind, useWatermark: boolean) => {
    if (!receiptRef.current || exporting) return;
    // Pin the watermark to the intended state and flush so the captured DOM
    // matches exactly (clean for free credits / Pro, watermarked otherwise).
    flushSync(() => setCaptureWatermark(useWatermark));
    setExporting(kind);
    try {
      const header = doc.sections.find((s) => s.type === "header") as HeaderSection | undefined;
      const dt = doc.sections.find((s) => s.type === "datetime");
      const filename = exportFilename(
        header?.storeName ?? "receipt",
        (dt && "receiptNumber" in dt && dt.receiptNumber) || "0000"
      );
      if (kind === "png") await downloadPng(receiptRef.current, filename);
      else if (kind === "jpg") await downloadJpg(receiptRef.current, filename);
      else if (kind === "pdf-print") await downloadPdf(receiptRef.current, filename, { printReady: true });
      else await downloadPdf(receiptRef.current, filename);
      analytics.receiptDownloaded(kind === "pdf-print" ? "pdf" : kind, activeTemplate || undefined, account.isPro);
      // Record the download server-side for the admin per-member count. Only
      // logged-in downloads can be attributed; fire-and-forget so it never
      // blocks or fails the export.
      if (account.isLoggedIn) {
        void fetch("/api/downloads/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            format: kind === "pdf-print" ? "pdf" : kind,
            watermark: useWatermark,
          }),
        }).catch(() => {});
      }
    } catch {
      alert("Sorry, the export failed. Please try again.");
    } finally {
      setExporting(null);
      setCaptureWatermark(null);
    }
  };

  // Download flow: Pro exports clean; anonymous users are prompted to log in;
  // logged-in free users claim a free receipt (clean while credits remain, then
  // watermarked — counted per unique receipt so re-downloads stay free).
  const requestExport = async (kind: ExportKind) => {
    if (exporting) return;

    if (account.isPro) return handleExport(kind, false);

    if (!account.isLoggedIn) {
      setLoginPrompt(true);
      return;
    }

    // Ensure the receipt has a stable id before claiming a credit against it.
    let key = doc.id;
    if (!key) {
      key = newDocId();
      setDoc((d) => ({ ...d, id: key! }));
    }

    let clean = false;
    let remaining: number | null = dl.remaining;
    try {
      const res = await fetch("/api/downloads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiptKey: key }),
      });
      if (res.status === 401) {
        setLoginPrompt(true);
        return;
      }
      const data = await res.json().catch(() => ({}));
      clean = Boolean(data.clean);
      remaining = data.remaining ?? null;
    } catch {
      // Network/API failure → fail safe to watermarked (don't give away clean).
      clean = false;
    }

    setDl((d) => ({ ...d, loggedIn: true, remaining, willWatermark: !clean }));

    if (clean) {
      handleExport(kind, false);
    } else {
      analytics.watermarkPrompt(kind === "pdf-print" ? "pdf" : kind);
      setPendingExport(kind);
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
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Tax ID / VAT / GST" defaultValue={s.taxId ?? ""} onChange={(v) => patchSection(s.id, { taxId: v || undefined })} placeholder="e.g. VAT GB123456789" />
              <TextField label="Branch / store #" defaultValue={s.branch ?? ""} onChange={(v) => patchSection(s.id, { branch: v || undefined })} />
              <TextField label="Cashier" defaultValue={s.cashier ?? ""} onChange={(v) => patchSection(s.id, { cashier: v || undefined })} />
              <TextField label="Register ID" defaultValue={s.registerId ?? ""} onChange={(v) => patchSection(s.id, { registerId: v || undefined })} />
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
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField label="Receipt number" defaultValue={s.receiptNumber ?? ""} onChange={(v) => patchSection(s.id, { receiptNumber: v })} />
              <TextField label="Timezone" defaultValue={s.timezone ?? ""} onChange={(v) => patchSection(s.id, { timezone: v || undefined })} placeholder="e.g. EST" />
              <TextField label="Order ID" defaultValue={s.orderId ?? ""} onChange={(v) => patchSection(s.id, { orderId: v || undefined })} />
              <TextField label="Transaction ID" defaultValue={s.transactionId ?? ""} onChange={(v) => patchSection(s.id, { transactionId: v || undefined })} />
              <TextField label="Invoice ID" defaultValue={s.invoiceId ?? ""} onChange={(v) => patchSection(s.id, { invoiceId: v || undefined })} />
              <TextField label="Customer ID" defaultValue={s.customerId ?? ""} onChange={(v) => patchSection(s.id, { customerId: v || undefined })} />
            </div>
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
                <button type="button" aria-label="Remove line" onClick={() => patchSection(s.id, { rows: s.rows.filter((_, j) => j !== i) })} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600">✕</button>
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
              <div key={it.id} className="rounded-lg border border-slate-100 bg-slate-50/50 p-2">
                <div className="grid grid-cols-[48px_1fr_72px_40px] items-center gap-2">
                  <input className={inputClass} type="number" defaultValue={it.quantity} onChange={(e) => updateItem(s, it.id, { quantity: parseFloat(e.target.value) || 0 })} aria-label="Qty" />
                  <input className={inputClass} defaultValue={it.name} placeholder="Item name" onChange={(e) => updateItem(s, it.id, { name: e.target.value })} aria-label="Name" />
                  <input className={inputClass} type="number" step="0.01" defaultValue={it.price} onChange={(e) => updateItem(s, it.id, { price: parseFloat(e.target.value) || 0 })} aria-label="Price" />
                  <button type="button" aria-label="Remove item" onClick={() => patchSection(s.id, { items: s.items.filter((x) => x.id !== it.id) })} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600">✕</button>
                </div>
                {itemDetails[it.id] && (
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <input className={inputClass} defaultValue={it.sku ?? ""} placeholder="SKU" onChange={(e) => updateItem(s, it.id, { sku: e.target.value || undefined })} aria-label="SKU" />
                    <input className={inputClass} defaultValue={it.unit ?? ""} placeholder="Unit (kg, hr…)" onChange={(e) => updateItem(s, it.id, { unit: e.target.value || undefined })} aria-label="Unit" />
                    <input className={inputClass} type="number" step="0.01" defaultValue={it.discount ?? ""} placeholder="− Disc $" onChange={(e) => updateItem(s, it.id, { discount: parseFloat(e.target.value) || undefined })} aria-label="Item discount" />
                    <input className={inputClass} defaultValue={it.category ?? ""} placeholder="Category" onChange={(e) => updateItem(s, it.id, { category: e.target.value || undefined })} aria-label="Category" />
                    <input className={inputClass} defaultValue={it.taxCategory ?? ""} placeholder="Tax category" onChange={(e) => updateItem(s, it.id, { taxCategory: e.target.value || undefined })} aria-label="Tax category" />
                    <input className={`${inputClass} col-span-2 sm:col-span-1`} defaultValue={(it.modifiers ?? []).join(", ")} placeholder="Modifiers (comma-sep)" onChange={(e) => updateItem(s, it.id, { modifiers: e.target.value.split(",").map((m) => m.trim()).filter(Boolean) })} aria-label="Modifiers" />
                  </div>
                )}
                <button type="button" onClick={() => setItemDetails((m) => ({ ...m, [it.id]: !m[it.id] }))} className="mt-1.5 text-[11px] font-medium text-indigo-500 hover:text-indigo-700">
                  {itemDetails[it.id] ? "− Hide details" : "+ SKU, unit, modifiers, discount"}
                </button>
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

            {/* Extra tax lines (override the single rate above when present) */}
            {s.taxLines && s.taxLines.length > 0 && (
              <div className="space-y-2 rounded-lg bg-slate-50 p-2">
                <p className="text-[11px] font-medium text-slate-500">Tax lines (replace the single rate above)</p>
                {s.taxLines.map((tl, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input className={inputClass} defaultValue={tl.label} placeholder="Label (e.g. GST)" onChange={(e) => patchSection(s.id, { taxLines: s.taxLines!.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })} aria-label="Tax label" />
                    <input className={`${inputClass} w-24`} type="number" step="0.01" defaultValue={tl.rate} placeholder="%" onChange={(e) => patchSection(s.id, { taxLines: s.taxLines!.map((x, j) => (j === i ? { ...x, rate: parseFloat(e.target.value) || 0 } : x)) })} aria-label="Tax rate" />
                    <button type="button" aria-label="Remove tax line" onClick={() => patchSection(s.id, { taxLines: s.taxLines!.filter((_, j) => j !== i) })} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600">✕</button>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => patchSection(s.id, { taxLines: [...(s.taxLines ?? (s.taxRate > 0 ? [{ label: s.taxLabel || "Tax", rate: s.taxRate }] : [])), { label: "Tax", rate: 0 }] })}
              className="text-xs font-semibold text-indigo-600"
            >
              + Add tax line
            </button>

            <div className="grid items-start gap-3 sm:grid-cols-3">
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-600">Service fee {s.serviceFeePercent ? "(%)" : "($)"}</span>
                  <div className="inline-flex overflow-hidden rounded-md border border-slate-200 text-xs">
                    <button type="button" onClick={() => patchSection(s.id, { serviceFeePercent: false })} className={`px-2 py-0.5 ${!s.serviceFeePercent ? "bg-indigo-50 text-indigo-700" : "text-slate-500"}`}>$</button>
                    <button type="button" onClick={() => patchSection(s.id, { serviceFeePercent: true })} className={`px-2 py-0.5 ${s.serviceFeePercent ? "bg-indigo-50 text-indigo-700" : "text-slate-500"}`}>%</button>
                  </div>
                </div>
                <input type="number" step="0.01" className={inputClass} defaultValue={s.serviceFee || ""} placeholder="0" onChange={(e) => patchSection(s.id, { serviceFee: parseFloat(e.target.value) || 0 })} aria-label="Service fee" />
              </div>
              <NumberField label="Delivery fee" defaultValue={s.deliveryFee ?? 0} onChange={(v) => patchSection(s.id, { deliveryFee: v })} />
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-600">Rounding (+/−)</span>
                <input type="number" step="0.01" className={inputClass} defaultValue={s.rounding || ""} placeholder="0.00" onChange={(e) => patchSection(s.id, { rounding: parseFloat(e.target.value) || 0 })} aria-label="Rounding" />
              </label>
            </div>
            <NumberField label="Amount paid (shows change)" defaultValue={s.amountPaid ?? 0} onChange={(v) => patchSection(s.id, { amountPaid: v })} />

            <TextField label="Total label" defaultValue={s.grandTotalLabel ?? ""} onChange={(v) => patchSection(s.id, { grandTotalLabel: v || undefined })} placeholder="TOTAL" />
            <DividerRow label="Divider after totals" value={s.totalsDivider ?? "none"} onChange={(v) => patchSection(s.id, { totalsDivider: v })} />
          </div>
        );
      case "payment": {
        const splits = s.splits ?? [];
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-1 rounded-lg bg-slate-100 p-1">
              {PAYMENT_METHODS.map((m) => (
                <button key={m} type="button" onClick={() => patchSection(s.id, { method: m })} className={`rounded-md py-2 text-xs font-medium ${s.method === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{m}</button>
              ))}
            </div>
            {s.method === "Card" && (
              <>
                <SelectField label="Card type" defaultValue={s.cardType ?? "Credit"} onChange={(v) => patchSection(s.id, { cardType: v })} options={CARD_TYPES.map((c) => ({ value: c, label: c }))} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField label="Card last 4" defaultValue={s.cardLastFour ?? ""} onChange={(v) => patchSection(s.id, { cardLastFour: v.replace(/\D/g, "").slice(0, 4) })} placeholder="1234" />
                  <TextField label="Auth code" defaultValue={s.authCode ?? ""} onChange={(v) => patchSection(s.id, { authCode: v })} placeholder="123456" />
                </div>
                <SelectField label="Card entry" defaultValue={s.entryMode ?? "Chip"} onChange={(v) => patchSection(s.id, { entryMode: v as "Chip" | "Tap" | "Swipe" | "Manual" })} options={ENTRY_MODES} />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">Show card authorisation block</span>
                  <Toggle checked={!!s.showCardAuth} onChange={(c) => patchSection(s.id, { showCardAuth: c })} />
                </div>
              </>
            )}
            {s.method === "Gift Card" && (
              <TextField label="Gift card last 4" defaultValue={s.cardLastFour ?? ""} onChange={(v) => patchSection(s.id, { cardLastFour: v.replace(/\D/g, "").slice(0, 4) })} placeholder="1234" />
            )}
            {s.method === "Cash" && (
              <NumberField label="Amount tendered (for change)" defaultValue={s.amountTendered ?? 0} onChange={(v) => patchSection(s.id, { amountTendered: v })} />
            )}
            {s.method === "Mobile" && (
              <p className="text-xs text-slate-500">Shows “Mobile Payment” on the receipt (e.g. Apple Pay, Google Pay).</p>
            )}

            {/* Split payment */}
            <div className="rounded-lg bg-slate-50 p-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Split payment</span>
                <button type="button" onClick={() => patchSection(s.id, { splits: [...splits, { method: "Cash", amount: 0 }] })} className="text-xs font-semibold text-indigo-600">+ Add split</button>
              </div>
              {splits.map((p, i) => (
                <div key={i} className="mt-2 flex items-center gap-2">
                  <input className={inputClass} defaultValue={p.method} placeholder="Method" onChange={(e) => patchSection(s.id, { splits: splits.map((x, j) => (j === i ? { ...x, method: e.target.value } : x)) })} aria-label="Split method" />
                  <input className={`${inputClass} w-28`} type="number" step="0.01" defaultValue={p.amount || ""} placeholder="Amount" onChange={(e) => patchSection(s.id, { splits: splits.map((x, j) => (j === i ? { ...x, amount: parseFloat(e.target.value) || 0 } : x)) })} aria-label="Split amount" />
                  <button type="button" aria-label="Remove split" onClick={() => patchSection(s.id, { splits: splits.filter((_, j) => j !== i) })} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600">✕</button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Inline payment line</span>
              <Toggle checked={!!s.inline} onChange={(c) => patchSection(s.id, { inline: c })} />
            </div>
          </div>
        );
      }
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
      case "footer":
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Alignment</span>
              <AlignToggle value={s.align ?? "center"} onChange={(v) => patchSection(s.id, { align: v })} />
            </div>
            <TextAreaField label="Return policy" defaultValue={s.returnPolicy ?? ""} onChange={(v) => patchSection(s.id, { returnPolicy: v || undefined })} placeholder="Returns accepted within 30 days with receipt." />
            <TextAreaField label="Warranty text" defaultValue={s.warranty ?? ""} onChange={(v) => patchSection(s.id, { warranty: v || undefined })} placeholder="1-year limited warranty on all products." />
            <TextField label="Loyalty points" defaultValue={s.loyaltyPoints ?? ""} onChange={(v) => patchSection(s.id, { loyaltyPoints: v || undefined })} placeholder="You earned 120 points · Balance 2,430" />
            <TextField label="Survey / feedback link" defaultValue={s.surveyUrl ?? ""} onChange={(v) => patchSection(s.id, { surveyUrl: v || undefined })} placeholder="survey.mystore.com/abc" />
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
    <div className="mx-auto max-w-7xl px-4 pb-32 pt-4 sm:px-6 lg:px-8 lg:pb-20">
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
            className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base focus:border-indigo-400 focus:outline-none sm:py-2 sm:text-sm"
          />
          <button
            type="button"
            onClick={generateAi}
            disabled={aiLoading || !aiPrompt.trim()}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {aiLoading ? "Generating…" : "Generate"}
          </button>
        </div>
        {aiError && (
          <p className="mt-2 text-xs text-red-600">
            {aiError}{" "}
            {aiError.includes("Upgrade") || aiError.includes("upgrade") ? (
              <Link
                href="/pricing"
                onClick={() => analytics.upgradeClick("builder_ai_limit")}
                className="font-semibold underline"
              >
                See plans
              </Link>
            ) : null}
          </p>
        )}
      </div>

      {/* Start-from-scratch presets */}
      <div className="flex flex-wrap items-center gap-2 pt-4">
        <span className="text-xs font-medium text-slate-500">Receipt type:</span>
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

      {/* My saved templates (browser-local, no account needed) */}
      {myTemplates.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-medium text-slate-500">★ My templates:</span>
          {myTemplates.map((t) => (
            <span
              key={t.id}
              className="group inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 py-1 pl-3 pr-1.5 text-xs font-medium text-amber-800"
            >
              <button type="button" onClick={() => loadMyTemplate(t)} className="hover:underline" title="Load this template">
                {t.name}
              </button>
              <button
                type="button"
                onClick={() => removeMyTemplate(t.id)}
                aria-label={`Delete template ${t.name}`}
                className="rounded-full px-1 text-amber-400 hover:bg-amber-100 hover:text-amber-700"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Template quick-switch (core set; full list lives on /templates) */}
      <div className="-mx-4 overflow-x-auto px-4 pb-4 pt-3 sm:mx-0 sm:px-0">
        <div className="flex gap-2">
          {TEMPLATES.slice(0, 14).map((t) => (
            <button key={t.slug} type="button" onClick={() => applyTemplate(t.slug)} className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${activeTemplate === t.slug ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"}`}>
              <span aria-hidden="true">{t.icon}</span>
              {t.shortName}
            </button>
          ))}
          <Link href="/templates" className="flex shrink-0 items-center gap-1.5 rounded-full border border-dashed border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-500 hover:border-indigo-300 hover:text-indigo-600">
            All templates →
          </Link>
        </div>
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
              <div className="space-y-4 border-t border-slate-100 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <SelectField label="Font family" defaultValue={doc.settings.font} onChange={(v) => patchSettings({ font: v as FontFamily })} options={FONTS} />
                  <SelectField label="Currency" defaultValue={doc.settings.currency} onChange={(v) => patchSettings({ currency: v })} options={CURRENCIES.map((c) => ({ value: c.code, label: c.label }))} />
                  <SelectField label="Font size" defaultValue={doc.settings.fontScale ?? "normal"} onChange={(v) => patchSettings({ fontScale: v as FontScale })} options={FONT_SCALES} />
                  <SelectField label="Line height" defaultValue={doc.settings.lineSpacing ?? "normal"} onChange={(v) => patchSettings({ lineSpacing: v as LineSpacing })} options={LINE_SPACINGS} />
                  <SelectField label="Letter spacing" defaultValue={doc.settings.letterSpacing ?? "normal"} onChange={(v) => patchSettings({ letterSpacing: v as LetterSpacingPreset })} options={LETTER_SPACINGS} />
                  <SelectField label="Text weight" defaultValue={doc.settings.weight ?? "normal"} onChange={(v) => patchSettings({ weight: v as TextWeight })} options={TEXT_WEIGHTS} />
                  <SelectField label="Paper style" defaultValue={doc.settings.paper ?? "thermal"} onChange={(v) => patchSettings({ paper: v as PaperFinish })} options={PAPER_FINISHES} />
                  <label className="block text-xs font-medium text-slate-600">
                    Accent color
                    <input type="color" defaultValue={doc.settings.accent} onChange={(e) => patchSettings({ accent: e.target.value })} className="mt-1 block h-9 w-full rounded-lg border border-slate-300" />
                  </label>
                </div>
                <div>
                  <span className="mb-1.5 block text-xs font-medium text-slate-600">Receipt width: {doc.settings.widthPx}px</span>
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {WIDTH_PRESETS.map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => patchSettings({ widthPx: w.px })}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                          doc.settings.widthPx === w.px
                            ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                            : "border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                  <input type="range" min={200} max={820} value={doc.settings.widthPx} onChange={(e) => patchSettings({ widthPx: parseInt(e.target.value) })} className="w-full" />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="block text-xs font-medium text-slate-600">
                    Section padding: {doc.settings.contentPadding ?? SPACING_DEFAULTS.contentPadding}px
                    <input type="range" min={8} max={48} value={doc.settings.contentPadding ?? SPACING_DEFAULTS.contentPadding} onChange={(e) => patchSettings({ contentPadding: parseInt(e.target.value) })} className="mt-1 w-full" />
                  </label>
                  <label className="block text-xs font-medium text-slate-600">
                    Section spacing: {doc.settings.sectionGap ?? SPACING_DEFAULTS.sectionGap}px
                    <input type="range" min={0} max={40} value={doc.settings.sectionGap ?? SPACING_DEFAULTS.sectionGap} onChange={(e) => patchSettings({ sectionGap: parseInt(e.target.value) })} className="mt-1 w-full" />
                  </label>
                  <label className="block text-xs font-medium text-slate-600">
                    Item spacing: {doc.settings.itemGap ?? SPACING_DEFAULTS.itemGap}px
                    <input type="range" min={0} max={20} value={doc.settings.itemGap ?? SPACING_DEFAULTS.itemGap} onChange={(e) => patchSettings({ itemGap: parseInt(e.target.value) })} className="mt-1 w-full" />
                  </label>
                </div>
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
              <div className="flex items-center gap-0.5 border-b border-slate-100 py-2 pl-4 pr-2 sm:gap-1 sm:p-3">
                {/* HTML5 drag doesn't fire on touch — hide the handle on mobile,
                    where the ↑/↓ buttons are the reorder mechanism. */}
                <span
                  draggable
                  onDragStart={() => (dragIndex.current = i)}
                  className="hidden cursor-grab select-none px-1 text-slate-300 sm:inline"
                  aria-label="Drag to reorder"
                >
                  ⠿
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900">{SECTION_LABEL[s.type]}</span>
                <button type="button" onClick={() => reorder(i, i - 1)} disabled={i === 0} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-30" aria-label="Move up">↑</button>
                <button type="button" onClick={() => reorder(i, i + 1)} disabled={i === doc.sections.length - 1} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 disabled:opacity-30" aria-label="Move down">↓</button>
                <button type="button" onClick={() => setCollapsed((c) => ({ ...c, [s.id]: !c[s.id] }))} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600" aria-label={collapsed[s.id] ? "Expand section" : "Collapse section"}>{collapsed[s.id] ? "▾" : "▴"}</button>
                <button type="button" onClick={() => removeSection(s.id)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600" aria-label="Remove section">✕</button>
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
                  {renderWatermark && <Watermark />}
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => requestExport("pdf")} disabled={!!exporting} className="flex-1 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60">{exporting === "pdf" ? "Preparing PDF…" : "Download PDF"}</button>
                <button type="button" onClick={() => requestExport("png")} disabled={!!exporting} className="flex-1 rounded-full border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 disabled:opacity-60">{exporting === "png" ? "Preparing PNG…" : "Download PNG"}</button>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => requestExport("jpg")} disabled={!!exporting} className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60">{exporting === "jpg" ? "Preparing JPG…" : "Download JPG"}</button>
                <button type="button" onClick={() => requestExport("pdf-print")} disabled={!!exporting} className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60" title="A4 page, centered — prints cleanly on an office printer">{exporting === "pdf-print" ? "Preparing…" : "Print-ready PDF (A4)"}</button>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-0 text-xs font-medium text-slate-500">
                {account.isLoggedIn && (
                  <button type="button" onClick={saveReceipt} disabled={saveState === "saving"} className="rounded-lg px-2 py-2.5 hover:text-slate-700 disabled:opacity-60">
                    {saveState === "saving" ? "Saving…" : saveState === "saved" ? "✓ Saved to account" : "💾 Save to account"}
                  </button>
                )}
                <button type="button" onClick={saveAsTemplate} className="rounded-lg px-2 py-2.5 hover:text-slate-700">★ Save as template</button>
                <button type="button" onClick={reset} className="rounded-lg px-2 py-2.5 hover:text-slate-700">↺ Reset</button>
                <button
                  type="button"
                  onClick={() => setAutosaveOn((v) => !v)}
                  className="rounded-lg px-2 py-2.5 hover:text-slate-700"
                  title="Autosave keeps your draft in this browser"
                >
                  {autosaveOn ? "🟢 Autosave on" : "⚪ Autosave off"}
                </button>
              </div>
              {account.isPro ? (
                <p className="mt-3 text-center text-[11px] leading-relaxed text-emerald-600">
                  ✓ Pro · watermark-free HD downloads
                </p>
              ) : !account.isLoggedIn ? (
                <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
                  Log in to download ·{" "}
                  <span className="font-semibold text-slate-600">
                    {FREE_LIMITS.freeReceiptDownloads} free HD receipts per account
                  </span>
                </p>
              ) : (dl.remaining ?? 0) > 0 ? (
                <p className="mt-3 text-center text-[11px] leading-relaxed text-emerald-600">
                  ✓ {dl.remaining} of {FREE_LIMITS.freeReceiptDownloads} free HD receipts left
                </p>
              ) : (
                <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
                  Free receipts used · downloads now include a watermark ·{" "}
                  <Link
                    href="/pricing"
                    onClick={() => analytics.upgradeClick("builder_download_note")}
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Upgrade to remove
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar: Edit/Preview switch kept in thumb reach, with the
          live total visible while editing. Desktop uses the two-column layout. */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pt-2 backdrop-blur-lg lg:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto grid max-w-md grid-cols-2 gap-1 rounded-full bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setMobileTab("edit");
              window.scrollTo({ top: 0 });
            }}
            className={`rounded-full py-2.5 text-sm font-semibold ${mobileTab === "edit" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileTab("preview");
              window.scrollTo({ top: 0 });
            }}
            className={`rounded-full py-2.5 text-sm font-semibold ${mobileTab === "preview" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
          >
            Preview · {formatMoney(grandTotal, doc.settings.currency)}
          </button>
        </div>
      </div>

      {showAdd && <AddSectionModal onPick={addSection} onClose={() => setShowAdd(false)} />}

      {/* Watermark fallback (logged-in free user who is out of free receipts) */}
      {pendingExport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setPendingExport(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-3xl">🏷️</div>
            <h3 className="mt-3 text-xl font-bold text-slate-900">
              You&apos;ve used your {FREE_LIMITS.freeReceiptDownloads} free receipts
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              This download will include a small <strong>{SITE.name}</strong> watermark. Go Pro for
              clean, watermark-free HD receipts, unlimited AI generation and saved history.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/pricing"
                onClick={() => analytics.upgradeClick("watermark_modal")}
                className="rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Upgrade to remove watermark
              </Link>
              <button
                type="button"
                onClick={() => {
                  const kind = pendingExport;
                  setPendingExport(null);
                  if (kind) handleExport(kind, true);
                }}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Download with watermark ({pendingExport.toUpperCase()})
              </button>
              <button
                type="button"
                onClick={() => setPendingExport(null)}
                className="px-5 py-2 text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login required to download (anonymous users) */}
      {loginPrompt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setLoginPrompt(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-3xl">🔐</div>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Log in to download</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Create a free account to download your receipt. Every free account includes{" "}
              <strong>{FREE_LIMITS.freeReceiptDownloads} watermark-free HD receipts</strong> — no
              payment required. Your current draft is saved in this browser.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href="/login?next=/create"
                onClick={() => analytics.upgradeClick("login_to_download")}
                className="rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Log in / Sign up free
              </Link>
              <button
                type="button"
                onClick={() => setLoginPrompt(false)}
                className="px-5 py-2 text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
