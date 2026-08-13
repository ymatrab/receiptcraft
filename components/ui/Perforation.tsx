/**
 * The tear line between sections. Receipts are separated by perforation, so
 * section breaks use the same device the product does rather than a generic
 * 1px border. Decorative only — hidden from assistive tech.
 */
export default function Perforation({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`perf-rule ${className}`} />;
}
</content>
