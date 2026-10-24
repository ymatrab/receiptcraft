"use client";

import { useState } from "react";
import type { RuleStyle } from "@/lib/types";
import type { SectionAlign } from "@/lib/sections";
import { ChevronDownIcon } from "@/components/Icons";

// text-base on mobile (16px) prevents iOS Safari's auto-zoom on focus;
// sm:text-sm restores the compact desktop density.
export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:py-2 sm:text-sm";

interface TextFieldProps {
  label: string;
  defaultValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "date" | "time";
}

export function TextField({ label, defaultValue, onChange, placeholder, type = "text" }: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-600">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </label>
  );
}

interface NumberFieldProps {
  label: string;
  defaultValue: number;
  onChange: (value: number) => void;
  min?: number;
  step?: string;
  placeholder?: string;
}

export function NumberField({
  label,
  defaultValue,
  onChange,
  min = 0,
  step = "0.01",
  placeholder = "0.00",
}: NumberFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-600">{label}</span>
      <input
        type="number"
        // Decimal keypad on phones instead of the full keyboard.
        inputMode="decimal"
        defaultValue={defaultValue || ""}
        min={min}
        step={step}
        placeholder={placeholder}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className={inputClass}
      />
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  defaultValue: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
}

export function SelectField({ label, defaultValue, onChange, options }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-600">{label}</span>
      <select
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

export function TextAreaField({
  label,
  defaultValue,
  onChange,
  placeholder,
  rows = 2,
}: {
  label: string;
  defaultValue: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-600">{label}</span>
      <textarea
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} resize-y`}
      />
    </label>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-1 ${
        checked ? "bg-indigo-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-[0_1px_2px_rgba(15,23,42,0.25)] ring-1 ring-black/5 transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

const ALIGN_OPTS: { value: SectionAlign; bars: string }[] = [
  { value: "left", bars: "M3 5h12M3 10h8M3 15h12" },
  { value: "center", bars: "M4 5h12M6 10h8M4 15h12" },
  { value: "right", bars: "M5 5h12M9 10h8M5 15h12" },
];

export function AlignToggle({
  value,
  onChange,
}: {
  value: SectionAlign;
  onChange: (v: SectionAlign) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 p-0.5">
      {ALIGN_OPTS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-label={`Align ${opt.value}`}
          onClick={() => onChange(opt.value)}
          className={`rounded-md px-2.5 py-1.5 ${
            value === opt.value ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" d={opt.bars} />
          </svg>
        </button>
      ))}
    </div>
  );
}

const DIVIDER_OPTS: { value: RuleStyle; label: string }[] = [
  { value: "dashed", label: "–––" },
  { value: "double", label: "===" },
  { value: "dotted", label: "· · ·" },
  { value: "colon", label: ": : :" },
  { value: "asterisk", label: "***" },
  { value: "none", label: "None" },
];

export function DividerPicker({
  value,
  onChange,
}: {
  value: RuleStyle;
  onChange: (v: RuleStyle) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1 sm:grid-cols-6">
      {DIVIDER_OPTS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-md border py-1.5 text-xs transition-colors ${
            value === opt.value
              ? "border-indigo-300 bg-indigo-50 text-indigo-700"
              : "border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function DividerRow({
  value,
  onChange,
  label = "Divider at bottom",
}: {
  value: RuleStyle;
  onChange: (v: RuleStyle) => void;
  label?: string;
}) {
  const on = value !== "none";
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-700">{label}</span>
        <Toggle checked={on} onChange={(c) => onChange(c ? "dashed" : "none")} />
      </div>
      {on && <DividerPicker value={value} onChange={onChange} />}
    </div>
  );
}

/**
 * The rarely-used fields of a section, folded away.
 *
 * Most receipts need a store name, items and a date; showing all forty-odd
 * fields at once is what made the builder read as hard, worst of all on a
 * phone, where the header section alone was two screens tall. A native
 * <details> keeps its children mounted while closed, so the uncontrolled
 * inputs inside keep their values. `inUse` counts the fields already filled
 * (a brand template fills several), so nothing on the receipt is hidden
 * without a hint that it is there.
 */
export function MoreOptions({
  hint,
  inUse = 0,
  defaultOpen = false,
  children,
}: {
  hint: string;
  inUse?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <details
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      className="group rounded-xl border border-slate-200 bg-slate-50/60"
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          More options
          <span className="font-normal text-slate-500">
            {" "}
            · {inUse > 0 ? `${inUse} in use` : hint}
          </span>
        </span>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-3 border-t border-slate-200 p-3">{children}</div>
    </details>
  );
}

/** How many of these optional values are actually set. */
export function countFilled(...values: unknown[]): number {
  return values.filter((v) => v !== undefined && v !== null && v !== "" && v !== 0).length;
}
