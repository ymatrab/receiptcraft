"use client";

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
