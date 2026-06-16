"use client";

import type { RuleStyle } from "@/lib/types";
import type { SectionAlign } from "@/lib/sections";

export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

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

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-indigo-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
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
