/**
 * A `label ......... value` line, the way a printed receipt aligns an item
 * against its price. Used wherever the page states a fact that has a value —
 * it makes the page read as the same kind of document the product produces.
 */
export default function LeaderRow({
  label,
  value,
  className = "",
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`leader ${className}`}>
      <span>{label}</span>
      <span className="font-data tabular-nums">{value}</span>
    </div>
  );
}
</content>
