import { toPng } from "html-to-image";
import { SITE } from "@/lib/site";

const EXPORT_OPTIONS = {
  pixelRatio: 3,
  cacheBust: true,
};

/**
 * Tiled diagonal watermark applied to free-tier exports. Rendered as an inline
 * SVG background so html-to-image captures it reliably (DOM text overlays can be
 * flaky across the canvas). Pro users export without it.
 */
function makeWatermarkOverlay(): HTMLDivElement {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='150'>
    <text x='0' y='95' transform='rotate(-32 120 75)' font-family='-apple-system,Segoe UI,Roboto,sans-serif'
      font-size='20' font-weight='700' fill='rgba(15,23,42,0.14)'>${SITE.name}</text>
  </svg>`;
  const url = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "absolute",
    inset: "0",
    pointerEvents: "none",
    backgroundImage: `url("${url}")`,
    backgroundRepeat: "repeat",
    zIndex: "50",
  } as CSSStyleDeclaration);
  el.setAttribute("data-watermark", "true");
  return el;
}

/** Run an export with a temporary watermark overlay injected into `node`. */
async function withWatermark<T>(
  node: HTMLElement,
  watermark: boolean,
  fn: () => Promise<T>
): Promise<T> {
  if (!watermark) return fn();
  const prevPosition = node.style.position;
  if (!prevPosition) node.style.position = "relative";
  const overlay = makeWatermarkOverlay();
  node.appendChild(overlay);
  try {
    return await fn();
  } finally {
    overlay.remove();
    node.style.position = prevPosition;
  }
}

export async function downloadPng(
  node: HTMLElement,
  filename: string,
  watermark = false
): Promise<void> {
  const dataUrl = await withWatermark(node, watermark, () => toPng(node, EXPORT_OPTIONS));
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
}

export async function downloadPdf(
  node: HTMLElement,
  filename: string,
  watermark = false
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const dataUrl = await withWatermark(node, watermark, () =>
    toPng(node, { ...EXPORT_OPTIONS, backgroundColor: "#ffffff" })
  );

  const width = node.offsetWidth;
  const height = node.offsetHeight;
  // PDF page matches the receipt dimensions plus a small margin.
  const margin = 24;
  const pdf = new jsPDF({
    orientation: height > width ? "portrait" : "landscape",
    unit: "px",
    format: [width + margin * 2, height + margin * 2],
  });
  pdf.addImage(dataUrl, "PNG", margin, margin, width, height);
  pdf.save(`${filename}.pdf`);
}

export function exportFilename(businessName: string, receiptNumber: string): string {
  const safe = (businessName || "receipt")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${safe || "receipt"}-${receiptNumber || "0000"}`;
}
