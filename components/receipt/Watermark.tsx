import { SITE } from "@/lib/site";

/**
 * Tiled diagonal watermark drawn over the receipt for free users. Rendered as a
 * real DOM overlay (inline SVG background) so it appears on screen — deterring
 * screenshots/right-click-save — and is captured by html-to-image on export.
 * Pro users don't render it, so their downloads are clean.
 */
export default function Watermark() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='150'>
    <text x='0' y='95' transform='rotate(-32 120 75)' font-family='-apple-system,Segoe UI,Roboto,sans-serif'
      font-size='20' font-weight='700' fill='rgba(15,23,42,0.16)'>${SITE.name}</text>
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
