import type { ReceiptDoc } from "./sections";
import { uid } from "./format";

/**
 * Browser-local persistence for the builder:
 *  - autosave: the current work-in-progress receipt, restored on next visit.
 *  - templates: named receipts the user explicitly saves to reuse later.
 *
 * Everything lives in localStorage (no account needed) and fails silently if
 * storage is unavailable (private mode, quota, SSR).
 */

const AUTOSAVE_KEY = "rc_autosave_v1";
const TEMPLATES_KEY = "rc_templates_v1";

export interface SavedTemplate {
  id: string;
  name: string;
  savedAt: number;
  doc: ReceiptDoc;
}

function canUse(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

// ---- autosave -----------------------------------------------------------

export function saveAutosave(doc: ReceiptDoc): void {
  if (!canUse()) return;
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(doc));
  } catch {
    /* quota / private mode — ignore */
  }
}

export function loadAutosave(): ReceiptDoc | null {
  if (!canUse()) return null;
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    if (!raw) return null;
    const doc = JSON.parse(raw) as ReceiptDoc;
    // Minimal shape check so a stale/corrupt value can't crash the builder.
    if (doc && Array.isArray(doc.sections) && doc.settings) return doc;
    return null;
  } catch {
    return null;
  }
}

export function clearAutosave(): void {
  if (!canUse()) return;
  try {
    localStorage.removeItem(AUTOSAVE_KEY);
  } catch {
    /* ignore */
  }
}

// ---- named templates ----------------------------------------------------

export function listTemplates(): SavedTemplate[] {
  if (!canUse()) return [];
  try {
    const raw = localStorage.getItem(TEMPLATES_KEY);
    const arr = raw ? (JSON.parse(raw) as SavedTemplate[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeTemplates(list: SavedTemplate[]): SavedTemplate[] {
  if (canUse()) {
    try {
      localStorage.setItem(TEMPLATES_KEY, JSON.stringify(list));
    } catch {
      /* ignore */
    }
  }
  return list;
}

/** Save (or overwrite by name) a named template. Returns the updated list. */
export function saveTemplate(name: string, doc: ReceiptDoc): SavedTemplate[] {
  const list = listTemplates();
  const entry: SavedTemplate = { id: uid(), name, savedAt: Date.now(), doc };
  // Overwrite an existing template with the same name (case-insensitive).
  const without = list.filter((t) => t.name.toLowerCase() !== name.toLowerCase());
  return writeTemplates([entry, ...without].slice(0, 50));
}

export function deleteTemplate(id: string): SavedTemplate[] {
  return writeTemplates(listTemplates().filter((t) => t.id !== id));
}
