import { SITE } from "@/lib/site";

/**
 * Tiled diagonal watermark drawn over the receipt for free users. Rendered as a
 * real DOM overlay (inline SVG background) so it appears on screen — deterring
 * screenshots/right-click-save — and is captured by html-to-image on export.
 * Pro users don't render it, so their downloads are clean.
 *
 * 2026-10-22: strengthened. It was one 16%-opacity mark per 240×150 tile, light
 * enough that a screenshot of the preview was a usable receipt, which made the
 * free preview a substitute for the paid download. Now two marks per tile in a
 * brick offset (no clear gaps to crop between), at 30%, with a faint light halo
 * so the mark still reads over dark logos and bars. The receipt underneath stays
 * legible, because people have to check their figures before they pay.
 */
export default function Watermark() {
  const text = (x: number, y: number) =>
    `<text x='${x}' y='${y}' transform='rotate(-32 ${x + 70} ${y - 8})' font-family='-apple-system,Segoe UI,Roboto,sans-serif'
      font-size='22' font-weight='800' fill='rgba(15,23,42,0.30)' stroke='rgba(255,255,255,0.35)' stroke-width='0.8'
      paint-order='stroke'>${SITE.name}</text>`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='130'>
    ${text(0, 50)}
    ${text(100, 115)}
  </svg>`;
  const url = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
      style={{ backgroundImage: `url("${url}")`, backgroundRepeat: "repeat" }}
    />
  );
}
