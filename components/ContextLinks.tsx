import { CitedText } from "@/components/Sources";
import { contextLinksFor } from "@/lib/contextual-links";

/**
 * The hand-written link sentences for one page (lib/contextual-links.ts).
 * Renders nothing on a page that has none.
 */
export default function ContextLinks({ path, className }: { path: string; className?: string }) {
  const lines = contextLinksFor(path);
  if (lines.length === 0) return null;
  return (
    <div className={className ?? "mt-6 space-y-3"}>
      {lines.map((body) => (
        <CitedText key={body} body={body} className="leading-relaxed text-slate-600" />
      ))}
    </div>
  );
}
