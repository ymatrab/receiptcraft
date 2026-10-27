"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type {
  FontFamily,
  FontScale,
  LetterSpacingPreset,
  LineItem,
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
  blankDocSeed,
  docFromReceiptData,
  itemsTotals,
  newDocId,
  newSection,
  presetDoc,
  PRESETS,
  RECEIPT_LABELS,
  SECTION_LABEL,
  SPACING_DEFAULTS,
  WIDTH_PRESETS,
  type ReceiptLabelKey,
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
import { receiptFromAi, type AiReceiptResult } from "@/lib/ai-receipt";
import { downloadPng, downloadJpg, downloadPdf, exportFilename } from "@/lib/download";
import { analytics, eventIdentity } from "@/lib/analytics";
import ReviewPrompt, { reviewAlreadyAsked } from "./ReviewPrompt";
import { useAccount } from "@/lib/useAccount";
import { FREE_LIMITS, FREE_FONTS, FREE_PAPER_STYLE, PLANS, formatPlanPrice } from "@/lib/plans";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/config";
import Link from "next/link";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import Watermark from "@/components/receipt/Watermark";
import AddSectionModal from "./AddSectionModal";
import Modal from "@/components/Modal";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  GripIcon,
  SpinnerIcon,
  TagIcon,
  WarningIcon,
} from "@/components/Icons";
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
/**
 * Narrow a set of style options to the free tier, without breaking a template.
 *
 * The gate is on *switching*, not on rendering. Brand templates carry their own
 * `fontFamily` and paper finish — 107 of the 348 set a style explicitly — so
 * forcing a free user's Starbucks receipt onto a different face would break the
 * one thing the brand pages exist to provide. The value the template chose is
 * always kept in the list so the select shows it correctly; the free user simply
 * cannot pick a *different* premium one.
 */
function gateOptions<T extends { value: string; label: string }>(
  all: readonly T[],
  allowed: readonly string[],
  current: string | undefined,
  isPro: boolean
): T[] {
  if (isPro) return [...all];
  return all.filter((o) => allowed.includes(o.value) || o.value === current);
}

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

/**
 * "Add Beef 2.20, Extra Cheese 0.75" → priced add-ons. A trailing number is the
 * price; an entry without one is a free add-on that still prints.
 */
function parseAddons(text: string): LineItem["addons"] {
  const list = text
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const m = /^(.*?)\s+\$?(-?\d+(?:\.\d+)?)$/.exec(p);
      return m ? { name: m[1], price: parseFloat(m[2]) } : { name: p, price: 0 };
    });
  return list.length ? list : undefined;
}

export default function SectionBuilder() {
  // Seed with a deterministic blank doc so the server and client render
  // identical HTML (no hydration mismatch / #418). The mount effect below swaps
  // in a real blankDoc() — with today's date and a random receipt number — once
  // we're on the client, unless a draft/template/AI/receipt takes over.
  const [doc, setDoc] = useState<ReceiptDoc>(blankDocSeed);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [itemDetails, setItemDetails] = useState<Record<string, boolean>>({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [exporting, setExporting] = useState<ExportKind | null>(null);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [activeTemplate, setActiveTemplate] = useState("");
  /** A ?template= slug waiting for the account to resolve before it is applied. */
  const [pendingTemplate, setPendingTemplate] = useState<string | null>(null);
  const dragIndex = useRef<number | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  /** Receipt id that has already fired receipt_completed, so it fires once. */
  const completedRef = useRef<string | null>(null);
  const { account, loading: accountLoading } = useAccount();
  // Usage state from /api/downloads, for a logged-in free account. Downloads
  // need nothing here: Pro is always clean and everyone else is watermarked.
  const [dl, setDl] = useState<{
    /** AI generations left this month; null until known, and for Pro (unlimited). */
    aiRemaining: number | null;
  }>({ aiRemaining: null });
  // Pins the watermark during a capture so the exported image matches the
  // choice made in the paywall exactly; null means "follow the preview".
  const [captureWatermark, setCaptureWatermark] = useState<boolean | null>(null);
  // Every non-Pro visitor sees the watermark in the preview, logged in or not,
  // because that is exactly what their download will carry. Held back while the
  // account loads so a paying Pro user is not shown one on every page load.
  const previewWatermark = !account.isPro && !accountLoading;
  const renderWatermark = captureWatermark ?? previewWatermark;
  // Brand name for the lawful-use notice by the download buttons, or null for
  // the generic templates, which imitate nobody and need no attribution.
  // Brand-ness is "known to getTemplate but not one of the generic TEMPLATES".
  const activeBrandName =
    activeTemplate && !TEMPLATES.some((t) => t.slug === activeTemplate)
      ? getTemplate(activeTemplate)?.shortName ?? null
      : null;
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiNeedsAuth, setAiNeedsAuth] = useState(false);
  // Set by a successful generation, for the one-line "now download it" nudge.
  const [aiMade, setAiMade] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  // The download paywall: the export a non-Pro visitor asked for, held while
  // they choose between the pass and a watermarked copy.
  const [pendingExport, setPendingExport] = useState<ExportKind | null>(null);
  // After returning from checkout as Pro with a pending export, offer to finish
  // it in one tap (a real click keeps the browser download reliable).
  const [resumeExport, setResumeExport] = useState<ExportKind | null>(null);
  // The post-download review ask. Raised only by a clean download — see the
  // conditions in handleExport and the reasoning in ReviewPrompt.tsx.
  const [showReview, setShowReview] = useState(false);
  // Transient status message. Replaces the window.alert() calls this used to
  // make: a native dialog blocks the page, can't be styled, is easy to miss on
  // mobile, and says nothing to assistive tech until dismissed. Rendered in a
  // live region so screen readers announce failures without stealing focus.
  const [toast, setToast] = useState<{ kind: "error" | "info" | "success"; message: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notify = (kind: "error" | "info" | "success", message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ kind, message });
    // Errors linger; confirmations clear themselves.
    toastTimer.current = setTimeout(() => setToast(null), kind === "error" ? 8000 : 4000);
  };
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

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
        // { receipt, template } since the generator became brand-aware; a bare
        // receipt from a tab opened before that deploy still loads.
        const parsed = JSON.parse(handoff) as { receipt?: AiReceiptResult; template?: string | null } & AiReceiptResult;
        if (parsed.receipt) applyAi(parsed.receipt, parsed.template);
        else applyAi(parsed);
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
      // Deferred, not applied here: at mount `account.isPro` is still false
      // while /api/me is in flight, so gating now would show a paying
      // subscriber the upgrade wall on every arrival from a brand page.
      setPendingTemplate(slug);
      analytics.builderOpened("template");
      return;
    }
    // Nothing requested explicitly — restore the last autosaved draft, if any.
    const saved = loadAutosave();
    if (saved) {
      setDoc(saved);
      analytics.builderOpened("draft");
    } else {
      // No draft/template/AI — replace the deterministic SSR seed with a real
      // blank doc (fills today's date, time and a random receipt number
      // client-side, after hydration).
      setDoc({ ...blankDoc(), origin: "blank" });
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

  // Coming back from checkout (or /pricing, or signing in to the account a
  // guest purchase went to) with a download waiting. The draft is already
  // restored from localStorage above; once the account says Pro, offer a
  // one-tap clean export. A visitor who came back without paying — they
  // cancelled checkout — just has the stale request cleared.
  useEffect(() => {
    if (accountLoading) return;
    let pending: string | null = null;
    try {
      pending = localStorage.getItem("rc_pending_export");
      if (pending) localStorage.removeItem("rc_pending_export");
    } catch {
      /* localStorage unavailable — nothing to resume */
    }
    if (pending && account.isPro) setResumeExport(pending as ExportKind);
  }, [accountLoading, account.isPro]);

  // AI allowance for a logged-in free account (the badge on the AI box). The
  // download side needs no fetch: a non-Pro download is always watermarked.
  useEffect(() => {
    if (account.isPro || !account.isLoggedIn) return;
    let active = true;
    fetch("/api/downloads", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (active && s) setDl({ aiRemaining: s.aiRemaining ?? null });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [account.isLoggedIn, account.isPro]);

  // Apply the ?template= slug once the account is known. No template is gated
  // any more; the deferral is kept so styling gates (fonts, paper) read a
  // resolved account when the template lands.
  useEffect(() => {
    if (!pendingTemplate || accountLoading) return;
    applyTemplate(pendingTemplate);
    setPendingTemplate(null);
    // applyTemplate is stable enough for this one-shot; re-running on every
    // render would re-apply the template and discard the user's edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingTemplate, accountLoading]);

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
      notify("error", "Couldn't save your receipt. Check you're still logged in, then try again.");
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

  // Reshaping the CURRENT working receipt — picking a template, regenerating
  // with AI, or applying a preset — keeps the same receipt id, so a free user
  // refining one receipt only ever spends one download credit against it. A new
  // credit is spent only when they explicitly start over (reset) or open a
  // different saved receipt. `keepId` carries the working id onto the new doc.
  const keepId = (next: ReceiptDoc) => (d: ReceiptDoc) => ({ ...next, id: d.id });

  /**
   * Load a template into the builder. Every template, brand or generic, is free
   * to build and preview; only the watermark-free download is paid.
   */
  const applyTemplate = (slug: string) => {
    const t = getTemplate(slug);
    if (!t) return;
    setDoc(keepId({ ...docFromReceiptData(receiptFromTemplate(t)), origin: "template" }));
    setActiveTemplate(slug);
    setCollapsed({});
    analytics.selectTemplate(slug);
  };

  const reset = () => {
    // Explicit "start over" — a genuinely new receipt gets a fresh id (and thus
    // its own download credit).
    setDoc({ ...blankDoc(), id: newDocId(), origin: "blank" });
    setActiveTemplate("");
  };

  // ---- local "save as template" -----------------------------------------
  const saveAsTemplate = () => {
    // Saving your own layouts is a Pro feature. Saved *receipts* are not — those
    // stay free on every plan, and the pricing page says so.
    if (!account.isPro) {
      analytics.upgradeClick("builder_save_template");
      window.location.assign("/pricing");
      return;
    }
    const header = doc.sections.find((s) => s.type === "header") as HeaderSection | undefined;
    const name = window.prompt("Save this layout as a template. Name it:", header?.storeName || "My template");
    if (!name?.trim()) return;
    setMyTemplates(saveTemplate(name.trim(), doc));
    analytics.saveReceipt("template");
  };
  const loadMyTemplate = (t: SavedTemplate) => {
    setDoc(keepId(t.doc));
    setActiveTemplate("");
    setCollapsed({});
  };
  const removeMyTemplate = (id: string) => setMyTemplates(deleteTemplate(id));

  // Load an AI result into the builder — on top of the template it was made
  // for, when the server matched one (the prompt named a brand, or this page
  // is a brand's). Brand look from the template, transaction from the AI.
  const applyAi = (r: AiReceiptResult, slug?: string | null) => {
    const t = slug ? getTemplate(slug) : undefined;
    const data = receiptFromAi(r, t ? receiptFromTemplate(t) : undefined);
    setDoc(keepId({ ...docFromReceiptData(data), origin: "ai" }));
    setActiveTemplate(t ? t.slug : "");
    setCollapsed({});
  };

  const generateAi = async () => {
    if (!aiPrompt.trim() || aiLoading) return;
    setAiLoading(true);
    setAiError(null);
    setAiNeedsAuth(false);
    setAiMade(false);
    analytics.aiGenerate("start", activeTemplate || undefined);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, template: activeTemplate || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        analytics.aiGenerate("error", activeTemplate || undefined);
        if (res.status === 401 || data.needsAuth) setAiNeedsAuth(true);
        setAiError(data.error ?? "Generation failed.");
        return;
      }
      analytics.aiGenerate("success", data.template || activeTemplate || undefined);
      // Spend one from the visible allowance. The status effect only refetches
      // when the receipt or the account changes, and a generation changes
      // neither — so without this the counter would still read "3 of 3" after
      // using one, which is worse than showing no number at all.
      setDl((d) => (d.aiRemaining === null ? d : { ...d, aiRemaining: Math.max(0, d.aiRemaining - 1) }));
      applyAi(data.receipt as AiReceiptResult, data.template);
      setAiPrompt("");
      setAiMade(true);
    } catch {
      analytics.aiGenerate("error", activeTemplate || undefined);
      setAiError("Generation failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const applyPreset = (id: PresetId) => {
    setDoc(keepId({ ...presetDoc(id), origin: "preset" }));
    setActiveTemplate("");
    setCollapsed({});
  };

  const handleFile = (file: File | undefined, apply: (dataUrl: string) => void) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      return notify("error", "That file isn't an image. Pick a PNG, JPG or SVG.");
    }
    if (file.size > 2 * 1024 * 1024) {
      return notify("error", "That image is over the 2 MB limit — try a smaller version.");
    }
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
      // Record the download server-side for the admin per-member count —
      // signed in or not: a guest's row carries the browser id, which
      // /admin/members ties to the account once they sign in. Fire-and-forget
      // so it never blocks or fails the export. keepalive because on a phone
      // the download itself can navigate the page and cancel a plain fetch,
      // which is how a paid download left no record (2026-10-25).
      void fetch("/api/downloads/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          format: kind === "pdf-print" ? "pdf" : kind,
          watermark: useWatermark,
          // Which receipt, which template, and whose session — so a second
          // download can be told apart from a second *receipt*, and a brand
          // page's traffic can be followed to a finished file.
          receiptKey: doc.id,
          template: activeTemplate || undefined,
          origin: doc.origin,
          ...eventIdentity(),
        }),
      }).catch(() => {});
      // Ask for a public review — but only off a clean download by a logged-in
      // free user, and only once. Pro is excluded by the owner's call: don't
      // nag people who already pay. Since 2026-10-24 a free download is never
      // clean, so this is dormant until the owner picks a new moment to ask.
      // Renders nothing until SITE.reviewUrl is set either way.
      if (
        SITE.reviewUrl &&
        account.isLoggedIn &&
        !account.isPro &&
        !useWatermark &&
        !reviewAlreadyAsked()
      ) {
        setShowReview(true);
      }
    } catch {
      analytics.downloadFailed(kind === "pdf-print" ? "pdf" : kind, account.isPro);
      notify("error", "The download failed. Your receipt is safe — press Download to try again.");
    } finally {
      setExporting(null);
      setCaptureWatermark(null);
    }
  };

  // Download flow (since 2026-10-24): Pro exports clean; everyone else, logged
  // in or not, gets the paywall — buy the $3 pass straight to checkout, or
  // download with the watermark. No account is needed for either, and there is
  // no free watermark-free allowance to check.
  const requestExport = async (kind: ExportKind) => {
    if (exporting) return;

    // Download intent — fires once per click, before the paywall, so the funnel
    // captures preview → download-attempt and where it drops.
    analytics.downloadClick(
      kind === "pdf-print" ? "pdf" : kind,
      account.isPro ? "pro" : account.isLoggedIn ? "free" : "anon"
    );

    if (account.isPro) return handleExport(kind, false);

    const fmt = kind === "pdf-print" ? "pdf" : kind;
    analytics.paywallShown(fmt, account.isLoggedIn ? "free" : "anon", doc.id || undefined, doc.origin);
    analytics.watermarkPrompt(fmt);
    setPendingExport(kind);
  };

  /**
   * Before leaving for checkout or /pricing: flush the draft (the autosave is
   * debounced) and remember which export they wanted, so /create can finish it
   * clean once they are back as Pro. Read by the resume effect above.
   */
  const rememberPendingExport = (kind: ExportKind | null) => {
    saveAutosave(doc);
    try {
      if (kind) localStorage.setItem("rc_pending_export", kind);
    } catch {
      /* localStorage unavailable — the draft autosave still applies */
    }
  };

  const grandTotal = doc.sections.reduce(
    (sum, s) => (s.type === "items" ? sum + itemsTotals(s).total : sum),
    0
  );

  /**
   * The first moment this receipt is genuinely finished.
   *
   * builder_opened and edit_started both fire for someone who typed one
   * character into a blank template and closed the tab, so neither can be the
   * denominator for "what share of receipts get downloaded" — the answer comes
   * out looking like a catastrophe because most of the numerator never existed.
   * Completion is the three things a receipt has to have to be worth anything:
   * a merchant, something priced on it, and a total.
   *
   * Gated on editTracked, the same "this was a person, not a template load"
   * signal edit_started uses — and the whole reason this needs a gate. A brand
   * template arrives with a merchant, priced items and a total already on it,
   * so without this the event would fire the instant a Starbucks template
   * loaded and "finished a receipt" would just be a slower way of counting
   * template opens.
   *
   * Once per receipt id, held in a ref rather than state so re-firing cannot
   * cause a render. Editing on after completion does not fire it again;
   * starting a *different* receipt does, which is what makes a second distinct
   * receipt countable.
   */
  useEffect(() => {
    if (!doc.id || !editTracked.current || completedRef.current === doc.id) return;
    const header = doc.sections.find((s) => s.type === "header") as HeaderSection | undefined;
    const named = Boolean(header?.storeName?.trim());
    const priced = doc.sections.some(
      (s) => s.type === "items" && s.items.some((i) => (i.price || 0) > 0)
    );
    if (!named || !priced || grandTotal <= 0) return;
    completedRef.current = doc.id;
    analytics.receiptCompleted(doc.id, activeTemplate || undefined);
  }, [doc, grandTotal, activeTemplate]);

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
            <TextField label="Document heading (optional)" defaultValue={s.title ?? ""} onChange={(v) => patchSection(s.id, { title: v || undefined })} placeholder="e.g. INVOICE, PURCHASE ORDER, QUOTE" />
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
                <button type="button" aria-label="Remove line" onClick={() => patchSection(s.id, { rows: s.rows.filter((_, j) => j !== i) })} className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"><CloseIcon className="h-4 w-4" /></button>
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
                  <button type="button" aria-label="Remove item" onClick={() => patchSection(s.id, { items: s.items.filter((x) => x.id !== it.id) })} className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"><CloseIcon className="h-4 w-4" /></button>
                </div>
                {itemDetails[it.id] && (
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <input className={inputClass} defaultValue={it.sku ?? ""} placeholder="SKU" onChange={(e) => updateItem(s, it.id, { sku: e.target.value || undefined })} aria-label="SKU" />
                    <input className={inputClass} defaultValue={it.unit ?? ""} placeholder="Unit (kg, hr…)" onChange={(e) => updateItem(s, it.id, { unit: e.target.value || undefined })} aria-label="Unit" />
                    <input className={inputClass} type="number" step="0.01" defaultValue={it.discount ?? ""} placeholder="− Disc $" onChange={(e) => updateItem(s, it.id, { discount: parseFloat(e.target.value) || undefined })} aria-label="Item discount" />
                    <input className={inputClass} defaultValue={it.category ?? ""} placeholder="Category" onChange={(e) => updateItem(s, it.id, { category: e.target.value || undefined })} aria-label="Category" />
                    <input className={inputClass} defaultValue={it.taxCategory ?? ""} placeholder="Tax category" onChange={(e) => updateItem(s, it.id, { taxCategory: e.target.value || undefined })} aria-label="Tax category" />
                    <input className={`${inputClass} col-span-2 sm:col-span-1`} defaultValue={(it.modifiers ?? []).join(", ")} placeholder="Modifiers (comma-sep)" onChange={(e) => updateItem(s, it.id, { modifiers: e.target.value.split(",").map((m) => m.trim()).filter(Boolean) })} aria-label="Modifiers" />
                    {/* Real grocery tills tax the soap and not the milk, and
                        print a flag after each price saying which is which. */}
                    {/* "Add Beef 2.20, Extra Cheese 0.75": each priced extra prints
                        indented under the item and is added to its total. */}
                    <input className={`${inputClass} col-span-2 sm:col-span-3`} defaultValue={(it.addons ?? []).map((a) => (a.price ? `${a.name} ${a.price}` : a.name)).join(", ")} placeholder="Priced add-ons, e.g. Add Beef 2.20, Extra Cheese 0.75" onChange={(e) => updateItem(s, it.id, { addons: parseAddons(e.target.value) })} aria-label="Priced add-ons" />
                    <input className={inputClass} defaultValue={it.taxFlag ?? ""} placeholder="Tax flag (F, T, N…)" maxLength={4} onChange={(e) => updateItem(s, it.id, { taxFlag: e.target.value || undefined })} aria-label="Tax flag printed after the price" />
                    <label className="flex min-h-11 items-center gap-2 text-xs text-slate-600">
                      <input type="checkbox" defaultChecked={!!it.notTaxed} onChange={(e) => updateItem(s, it.id, { notTaxed: e.target.checked || undefined })} className="h-4 w-4" />
                      Not taxed
                    </label>
                  </div>
                )}
                <button type="button" onClick={() => setItemDetails((m) => ({ ...m, [it.id]: !m[it.id] }))} className="mt-1.5 text-[11px] font-medium text-indigo-500 hover:text-indigo-700">
                  {itemDetails[it.id] ? "− Hide details" : "+ SKU, unit, modifiers, add-ons, discount, tax"}
                </button>
              </div>
            ))}
            <SelectField label="Item layout" defaultValue={s.itemStyle ?? "table"} onChange={(v) => patchSection(s.id, { itemStyle: v })} options={ITEM_STYLES} />
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Print the SKU / UPC before each item name</span>
              <Toggle checked={!!s.skuFirst} onChange={(c) => patchSection(s.id, { skuFirst: c || undefined })} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Show “You saved” after the total</span>
              <Toggle checked={!!s.showSavings} onChange={(c) => patchSection(s.id, { showSavings: c || undefined })} />
            </div>
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
                    <button type="button" aria-label="Remove tax line" onClick={() => patchSection(s.id, { taxLines: s.taxLines!.filter((_, j) => j !== i) })} className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"><CloseIcon className="h-4 w-4" /></button>
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

            {/* The terminal's own lines, in the receipt's wording. */}
            <div className="rounded-lg bg-slate-50 p-2">
              <span className="text-xs font-medium text-slate-600">Card terminal lines (APPROVAL #, AID, TC…)</span>
              {(s.extraRows ?? []).map((r, i) => (
                <div key={i} className="mt-2 flex items-center gap-2">
                  <input className={inputClass} defaultValue={r.label ?? ""} placeholder="Label, e.g. APPROVAL #" onChange={(e) => patchSection(s.id, { extraRows: (s.extraRows ?? []).map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })} aria-label="Terminal line label" />
                  <input className={inputClass} defaultValue={r.value} placeholder="Value" onChange={(e) => patchSection(s.id, { extraRows: (s.extraRows ?? []).map((x, j) => (j === i ? { ...x, value: e.target.value } : x)) })} aria-label="Terminal line value" />
                  <button type="button" aria-label="Remove terminal line" onClick={() => patchSection(s.id, { extraRows: (s.extraRows ?? []).filter((_, j) => j !== i) })} className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"><CloseIcon className="h-4 w-4" /></button>
                </div>
              ))}
              <button type="button" onClick={() => patchSection(s.id, { extraRows: [...(s.extraRows ?? []), { label: "", value: "" }] })} className="mt-2 text-xs font-semibold text-indigo-600">+ Add terminal line</button>
            </div>

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
                  <button type="button" aria-label="Remove split" onClick={() => patchSection(s.id, { splits: splits.filter((_, j) => j !== i) })} className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"><CloseIcon className="h-4 w-4" /></button>
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
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Large text (e.g. ORDER 47)</span>
              <Toggle checked={s.size === "large"} onChange={(c) => patchSection(s.id, { size: c ? "large" : undefined })} />
            </div>
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
          {/* The download credits were always counted out loud; the AI
              allowance said only "limited per month", so the only way to learn
              how many were left was to run out and read the error. */}
          {!account.isPro && (
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                account.isLoggedIn && dl.aiRemaining === 0
                  ? "bg-amber-100 text-amber-800"
                  : "bg-white text-indigo-600"
              }`}
            >
              {!account.isLoggedIn
                ? "Free to try"
                : dl.aiRemaining === null
                  ? `${FREE_LIMITS.aiGenerationsPerMonth} a month free`
                  : dl.aiRemaining === 0
                    ? "None left this month"
                    : `${dl.aiRemaining} of ${FREE_LIMITS.aiGenerationsPerMonth} left this month`}
            </span>
          )}
          {!account.isPro && account.isLoggedIn && dl.aiRemaining === 0 && (
            // Straight to checkout: the 11 accounts that hit the cap by
            // October were sent to /pricing and none of them bought.
            <a
              href="/api/checkout?plan=pro_weekly"
              rel="nofollow"
              onClick={() => {
                rememberPendingExport(null);
                analytics.upgradeClick("builder_ai_counter");
                analytics.beginCheckout("weekly", "builder_ai_counter");
              }}
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Unlimited for {formatPlanPrice(PLANS.pro_weekly)}
            </a>
          )}
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateAi()}
            aria-label="Describe the receipt you want"
            aria-invalid={aiError ? true : undefined}
            aria-describedby={aiError ? "ai-error" : undefined}
            placeholder="e.g. Starbucks receipt, 2 lattes and a muffin, this morning"
            className={`min-w-0 flex-1 ${inputClass}`}
          />
          <button
            type="button"
            onClick={generateAi}
            disabled={aiLoading || !aiPrompt.trim()}
            aria-busy={aiLoading}
            className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {aiLoading && <SpinnerIcon className="h-4 w-4" />}
            {aiLoading ? "Generating…" : "Generate"}
          </button>
        </div>
        {aiError && (
          <p id="ai-error" role="alert" className="mt-2 text-xs font-medium text-red-700">
            {aiError}{" "}
            {/* Signed-out visitors get offered the free step first: AI needs an
                account, and that step costs them nothing. Driven by the route's
                needsAuth flag, so rewording the message cannot drop the link. */}
            {aiNeedsAuth ? (
              <Link href="/login?next=/create&signup=1" className="font-semibold underline">
                Create a free account
              </Link>
            ) : aiError.includes("Upgrade") || aiError.includes("upgrade") ? (
              <a
                href="/api/checkout?plan=pro_weekly"
                rel="nofollow"
                onClick={() => {
                  rememberPendingExport(null);
                  analytics.upgradeClick("builder_ai_limit");
                  analytics.beginCheckout("weekly", "builder_ai_limit");
                }}
                className="font-semibold underline"
              >
                Get unlimited AI — {formatPlanPrice(PLANS.pro_weekly)} for 7 days
              </a>
            ) : null}
          </p>
        )}
        {/* Most people who generated a receipt never downloaded it (77 of 124
            accounts by October). Say what the next step is, and what it costs,
            while the receipt is on screen. */}
        {aiMade && !aiError && !account.isPro && (
          <p className="mt-2 text-xs text-slate-600">
            Your receipt is ready. Edit anything, then download it free with a watermark, or{" "}
            <a
              href="/api/checkout?plan=pro_weekly"
              rel="nofollow"
              onClick={() => {
                rememberPendingExport(null);
                analytics.upgradeClick("builder_ai_ready");
                analytics.beginCheckout("weekly", "builder_ai_ready");
              }}
              className="font-semibold underline"
            >
              watermark-free for {formatPlanPrice(PLANS.pro_weekly)}
            </a>
            .
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
              className="group inline-flex items-center rounded-full border border-amber-200 bg-amber-50 pl-1 pr-0.5 text-xs font-medium text-amber-900"
            >
              <button
                type="button"
                onClick={() => loadMyTemplate(t)}
                className="cursor-pointer rounded-full px-2 py-2.5 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                title="Load this template"
              >
                {t.name}
              </button>
              <button
                type="button"
                onClick={() => removeMyTemplate(t.id)}
                aria-label={`Delete template ${t.name}`}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-amber-700 transition-colors hover:bg-amber-100 hover:text-amber-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
              >
                <CloseIcon className="h-3.5 w-3.5" />
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
                  <SelectField label="Font family" defaultValue={doc.settings.font} onChange={(v) => patchSettings({ font: v as FontFamily })} options={gateOptions(FONTS, FREE_FONTS, doc.settings.font, account.isPro)} />
                  <SelectField label="Currency" defaultValue={doc.settings.currency} onChange={(v) => patchSettings({ currency: v })} options={CURRENCIES.map((c) => ({ value: c.code, label: c.label }))} />
                  <SelectField label="Font size" defaultValue={doc.settings.fontScale ?? "normal"} onChange={(v) => patchSettings({ fontScale: v as FontScale })} options={FONT_SCALES} />
                  <SelectField label="Line height" defaultValue={doc.settings.lineSpacing ?? "normal"} onChange={(v) => patchSettings({ lineSpacing: v as LineSpacing })} options={LINE_SPACINGS} />
                  <SelectField label="Letter spacing" defaultValue={doc.settings.letterSpacing ?? "normal"} onChange={(v) => patchSettings({ letterSpacing: v as LetterSpacingPreset })} options={LETTER_SPACINGS} />
                  <SelectField label="Text weight" defaultValue={doc.settings.weight ?? "normal"} onChange={(v) => patchSettings({ weight: v as TextWeight })} options={TEXT_WEIGHTS} />
                  <SelectField label="Paper style" defaultValue={doc.settings.paper ?? "thermal"} onChange={(v) => patchSettings({ paper: v as PaperFinish })} options={gateOptions(PAPER_FINISHES, [FREE_PAPER_STYLE], doc.settings.paper, account.isPro)} />
                  <label className="block text-xs font-medium text-slate-600">
                    Accent color
                    <input type="color" defaultValue={doc.settings.accent} onChange={(e) => patchSettings({ accent: e.target.value })} className="mt-1 block h-9 w-full rounded-lg border border-slate-300" />
                  </label>
                </div>
                {!account.isPro && (
                  <p className="text-xs text-slate-500">
                    Free includes {FREE_FONTS.length} fonts and one paper style.{" "}
                    <Link
                      href="/pricing"
                      onClick={() => analytics.upgradeClick("builder_styling_limit")}
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      Pro unlocks all 32 fonts and every paper style
                    </Link>
                    .
                  </p>
                )}
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
                {/* Every word the receipt prints on its own. Free on every plan:
                    matching the real receipt is the product, and the paywall
                    is on the clean download alone. */}
                <details className="rounded-lg border border-slate-100 p-3">
                  <summary className="cursor-pointer text-xs font-semibold text-slate-700">
                    Receipt wording — rename Subtotal, Change, card lines…
                  </summary>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-slate-700">Show the rate after each tax line, e.g. “Tax (9.5%)”</span>
                    <Toggle checked={doc.settings.showTaxRate !== false} onChange={(c) => patchSettings({ showTaxRate: c })} />
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {(Object.keys(RECEIPT_LABELS) as ReceiptLabelKey[]).map((k) => (
                      <TextField
                        key={k}
                        label={RECEIPT_LABELS[k]}
                        defaultValue={doc.settings.labels?.[k] ?? ""}
                        placeholder={RECEIPT_LABELS[k]}
                        onChange={(v) => patchSettings({ labels: { ...doc.settings.labels, [k]: v || undefined } })}
                      />
                    ))}
                  </div>
                </details>
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
                  className="hidden cursor-grab select-none px-1 text-slate-500 sm:inline"
                  aria-label="Drag to reorder"
                >
                  <GripIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900">{SECTION_LABEL[s.type]}</span>
                <button type="button" onClick={() => reorder(i, i - 1)} disabled={i === 0} className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Move up"><ArrowUpIcon className="h-4 w-4" /></button>
                <button type="button" onClick={() => reorder(i, i + 1)} disabled={i === doc.sections.length - 1} className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Move down"><ArrowDownIcon className="h-4 w-4" /></button>
                <button type="button" onClick={() => setCollapsed((c) => ({ ...c, [s.id]: !c[s.id] }))} aria-expanded={!collapsed[s.id]} className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" aria-label={collapsed[s.id] ? "Expand section" : "Collapse section"}><ChevronDownIcon className={`h-4 w-4 transition-transform ${collapsed[s.id] ? "" : "rotate-180"}`} /></button>
                <button type="button" onClick={() => removeSection(s.id)} className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500" aria-label="Remove section"><CloseIcon className="h-4 w-4" /></button>
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
                <button type="button" onClick={saveAsTemplate} className="rounded-lg px-2 py-2.5 hover:text-slate-700">
                  ★ Save as template{!account.isPro && " (Pro)"}
                </button>
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
              ) : (
                <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-500">
                  Free downloads include a small watermark · no account needed ·{" "}
                  <Link
                    href="/pricing"
                    onClick={() => analytics.upgradeClick("builder_download_note")}
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Remove it from {formatPlanPrice(PLANS.pro_weekly)}
                  </Link>
                </p>
              )}

              {/* Lawful-use notice, at the download step.
                  The brand pages already carry a non-affiliation line beside
                  their CTA, but nothing said it here — which is the moment the
                  file is actually produced, and the only moment that matters
                  for a template loaded straight from /create?template=. Names
                  the brand when one is loaded, because a generic disclaimer is
                  the one people read past. */}
              <p className="mt-4 border-t border-slate-200 pt-3 text-center text-[11px] leading-relaxed text-slate-500">
                {activeBrandName
                  ? `Independent, customizable template — not issued by or affiliated with ${activeBrandName}. `
                  : "Independent, customizable template. "}
                For lawful records, mockups and authorized use only — not valid
                as proof of purchase.
              </p>
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

      {/* Download paywall: every non-Pro download, logged in or not. */}
      {pendingExport && (
        <Modal
          onClose={() => setPendingExport(null)}
          labelledBy="paywall-title"
          panelClassName="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
        >
          <div>
            <TagIcon className="h-8 w-8 text-indigo-600" />
            <h3 id="paywall-title" className="mt-3 text-xl font-bold text-slate-900">
              Download without the watermark?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Free downloads carry a small <strong>{SITE.name}</strong> watermark. Pro removes it
              from every download, with HD exports and unlimited AI receipts. One-time payment, no
              account needed, never renews.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="/api/checkout?plan=pro_weekly"
                // Matches the pricing CTAs: never hand crawlers a checkout URL.
                rel="nofollow"
                onClick={() => {
                  // Straight to checkout, not via /pricing: the plans page
                  // loses most of the people who click upgrade. The draft and
                  // the export they wanted survive the trip — see the resume
                  // effect above.
                  rememberPendingExport(pendingExport);
                  analytics.upgradeClick("download_paywall");
                  analytics.beginCheckout("weekly", "download_paywall");
                }}
                className="rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Remove the watermark — {formatPlanPrice(PLANS.pro_weekly)} for 7 days
              </a>
              <button
                type="button"
                onClick={() => {
                  const kind = pendingExport;
                  setPendingExport(null);
                  if (kind) handleExport(kind, true);
                }}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Download with watermark ({pendingExport === "pdf-print" ? "PDF" : pendingExport.toUpperCase()})
              </button>
              <Link
                href="/pricing"
                onClick={() => {
                  rememberPendingExport(pendingExport);
                  analytics.upgradeClick("download_paywall_plans");
                }}
                className="rounded-full px-5 py-2.5 text-center text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                See all plans
              </Link>
            </div>
          </div>
        </Modal>
      )}

      {/* Resume banner: back from checkout as Pro with a download waiting — one tap to finish. */}
      {resumeExport && (
        // Sits above the mobile Edit/Preview bar rather than on top of it: that
        // bar is fixed at bottom-0 with z-40, so a bottom-4 banner at z-50 was
        // covering the only way to switch tabs on a phone. Stacks to two rows
        // on narrow screens — the copy plus two buttons never fitted on 375px.
        <div
          // Underscores are Tailwind's escape for spaces in arbitrary values —
          // `calc(4.5rem+env(…))` without them is invalid CSS and gets dropped.
          className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(4.5rem_+_env(safe-area-inset-bottom))] lg:pb-6"
          role="status"
        >
          <div className="flex w-full max-w-md flex-col gap-3 rounded-2xl border border-indigo-200 bg-white p-4 shadow-2xl sm:max-w-xl sm:flex-row sm:items-center sm:rounded-full sm:py-3 sm:pl-5 sm:pr-3">
            <span className="flex-1 text-sm font-medium text-slate-700">
              Pro is active and your receipt is right here. Download it without the watermark:
            </span>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  const kind = resumeExport;
                  setResumeExport(null);
                  if (kind) void requestExport(kind);
                }}
                className="flex-1 cursor-pointer rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:flex-none"
              >
                Download
              </button>
              <button
                type="button"
                onClick={() => setResumeExport(null)}
                aria-label="Dismiss"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {showReview && <ReviewPrompt onClose={() => setShowReview(false)} />}

      {/* Status messages. Anchored top-centre because the bottom of the screen
          already carries the mobile tab bar and the resume banner. role=alert
          for failures (announced immediately), role=status for confirmations
          (announced at the next pause) — neither steals focus. */}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center px-4">
          <div
            role={toast.kind === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex w-full max-w-lg items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg ${
              toast.kind === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : toast.kind === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            {toast.kind === "error" ? (
              <WarningIcon className="mt-0.5 h-5 w-5 shrink-0" />
            ) : toast.kind === "success" ? (
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0" />
            ) : null}
            <p className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</p>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss message"
              className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
