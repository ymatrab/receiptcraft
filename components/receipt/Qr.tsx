// Deterministic decorative QR-style block: the same seed always renders the
// same pattern, with three finder squares so it reads as a QR code. Not a
// scannable code — receipts here are templates/mockups.
function seededBits(seed: string, count: number): boolean[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const bits: boolean[] = [];
  for (let i = 0; i < count; i++) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    bits.push(Math.abs(h) % 2 === 0);
  }
  return bits;
}

const N = 21; // grid size

// Returns true/false for finder-pattern cells, or null for data cells.
function finder(r: number, c: number): boolean | null {
  for (const [r0, c0] of [
    [0, 0],
    [0, N - 7],
    [N - 7, 0],
  ]) {
    if (r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7) {
      const rr = r - r0;
      const cc = c - c0;
      const border = rr === 0 || rr === 6 || cc === 0 || cc === 6;
      const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
      return border || core;
    }
    // 1-cell quiet separator around each finder
    if (r >= r0 - 1 && r <= r0 + 7 && c >= c0 - 1 && c <= c0 + 7) return false;
  }
  return null;
}

export default function Qr({ seed, size = 116 }: { seed: string; size?: number }) {
  const bits = seededBits(seed || "000000", N * N);
  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {Array.from({ length: N * N }, (_, idx) => {
        const r = Math.floor(idx / N);
        const c = idx % N;
        const f = finder(r, c);
        const on = f === null ? bits[idx] : f;
        return on ? (
          <rect key={idx} x={c} y={r} width={1} height={1} fill="#1e293b" />
        ) : null;
      })}
    </svg>
  );
}
