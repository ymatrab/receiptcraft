// Deterministic pseudo-barcode: same receipt number always renders the same bars.
function seededBars(seed: string, count: number): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    bars.push((Math.abs(h) % 3) + 1);
  }
  return bars;
}

export default function Barcode({ seed }: { seed: string }) {
  const bars = seededBars(seed || "000000", 42);
  const totalUnits = bars.reduce((sum, w) => sum + w + 1, 0);
  let x = 0;

  return (
    <svg
      viewBox={`0 0 ${totalUnits} 30`}
      preserveAspectRatio="none"
      className="h-10 w-full max-w-55"
      aria-hidden="true"
    >
      {bars.map((width, i) => {
        const rect = <rect key={i} x={x} y="0" width={width} height="30" fill="#1e293b" />;
        x += width + 1;
        return rect;
      })}
    </svg>
  );
}
