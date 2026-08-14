/**
 * The mark: a receipt with a torn bottom edge, printed lines knocked out.
 *
 * One `currentColor` path with `evenodd` fill — the three line rects are
 * subpaths, so they punch through as real holes. No `<mask>`, therefore no
 * element ids to collide when the mark renders twice (header + footer), and
 * the lines show whatever surface sits behind them.
 */
export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M6 3h20v26l-2.5-1.8-2.5 1.8-2.5-1.8-2.5 1.8-2.5-1.8-2.5 1.8-2.5-1.8-2.5 1.8V3z
           M9.5 8h13v2.2h-13z
           M9.5 13h13v2.2h-13z
           M9.5 18h7.5v2.2h-7.5z"
      />
    </svg>
  );
}
