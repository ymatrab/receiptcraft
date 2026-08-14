/**
 * A section label set like a receipt's printed column header — mono, uppercase,
 * wide-tracked, preceded by a short rule. Marks what a section *is*, so it
 * carries the same information a field label on the product's output does.
 */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-ink-soft ${className}`}
    >
      <span aria-hidden="true" className="h-px w-6 bg-ink-soft/50" />
      {children}
    </p>
  );
}
