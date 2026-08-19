import { FEATURE_ROWS, type Cells, type CellState } from "@/lib/comparisons";

export interface ComparisonColumn {
  name: string;
  cells: Cells;
  /** Emphasize this column (used for the Makecepeit "us" column). */
  highlight?: boolean;
}

const ICON: Record<CellState, { glyph: string; className: string; label: string }> = {
  yes: { glyph: "✓", className: "bg-emerald-100 text-emerald-700", label: "Yes" },
  partial: { glyph: "~", className: "bg-amber-100 text-amber-700", label: "Partial" },
  no: { glyph: "✕", className: "bg-slate-100 text-slate-500", label: "No" },
};

function CellView({ cell }: { cell?: Cells[string] }) {
  if (!cell) return <span className="text-slate-500">—</span>;
  const icon = ICON[cell.state];
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold ${icon.className}`}
        aria-label={icon.label}
      >
        {icon.glyph}
      </span>
      {cell.note && (
        <span className="text-xs leading-tight text-slate-500">{cell.note}</span>
      )}
    </div>
  );
}

/**
 * Feature matrix shared by /compare/[slug] (2 columns) and /alternatives
 * (multi-column). Rows come from FEATURE_ROWS so every table stays consistent.
 * Horizontally scrollable on small screens so the page body never overflows.
 */
export default function ComparisonTable({
  columns,
  caption,
}: {
  columns: ComparisonColumn[];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th scope="col" className="p-4 text-left font-semibold text-slate-900">
              Feature
            </th>
            {columns.map((col) => (
              <th
                key={col.name}
                scope="col"
                className={`p-4 text-center font-semibold ${
                  col.highlight ? "bg-indigo-50 text-indigo-700" : "text-slate-900"
                }`}
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURE_ROWS.map((row, i) => (
            <tr key={row.id} className={i % 2 ? "bg-white" : "bg-slate-50/40"}>
              <th
                scope="row"
                className="p-4 text-left font-medium text-slate-700"
              >
                {row.label}
              </th>
              {columns.map((col) => (
                <td
                  key={col.name}
                  className={`p-4 text-center align-top ${
                    col.highlight ? "bg-indigo-50/50" : ""
                  }`}
                >
                  <CellView cell={col.cells[row.id]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
