const EXPORT_OPTIONS = {
  pixelRatio: 3,
  cacheBust: true,
  // 2026-11-18: an image that fails to load (a logo the proxy could not fetch,
  // a dead upload URL) used to reject the whole export, because html-to-image
  // gives the cloned <img> an empty src and its onerror rejects. A transparent
  // pixel keeps the download going with the image left blank. GA4 showed
  // download_failed for ~1 in 20 downloaders, mostly on logo-bearing brand pages.
  imagePlaceholder:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
};

// iOS Safari refuses canvases over 16,777,216 px (4096²), and phones run out of
// memory well before desktop does. A long receipt at 3x crosses that, and the
// export then fails or comes back blank. Scale down just enough to fit.
const MAX_CANVAS_AREA = 16_000_000;

function pixelRatioFor(node: HTMLElement, wanted: number): number {
  const area = node.offsetWidth * node.offsetHeight;
  if (!area) return wanted;
  const fit = Math.sqrt(MAX_CANVAS_AREA / area);
  return Math.max(1, Math.min(wanted, Math.floor(fit * 100) / 100));
}

type CaptureOptions = { backgroundColor?: string; quality?: number };

/**
 * Renders the node to a data URL. If the first attempt throws, retries once at
 * 2x without web-font embedding: font CSS that cannot be read or fetched and
 * memory pressure at 3x are the other ways html-to-image fails in the field.
 */
async function capture(
  node: HTMLElement,
  format: "png" | "jpeg",
  extra: CaptureOptions = {}
): Promise<string> {
  const lib = await import("html-to-image");
  const render = format === "png" ? lib.toPng : lib.toJpeg;
  const opts = { ...EXPORT_OPTIONS, ...extra, pixelRatio: pixelRatioFor(node, EXPORT_OPTIONS.pixelRatio) };
  try {
    return await render(node, opts);
  } catch (first) {
    console.error("Receipt export failed, retrying at lower quality", first);
    return await render(node, { ...opts, pixelRatio: pixelRatioFor(node, 2), skipFonts: true });
  }
}

/** A short, loggable reason for a failed export (GA4 caps parameter values at 100 chars). */
export function exportErrorReason(err: unknown): string {
  if (err instanceof Error) return `${err.name}: ${err.message}`.slice(0, 100);
  if (typeof Event !== "undefined" && err instanceof Event) {
    const t = err.target as { src?: string; tagName?: string } | null;
    return `event:${err.type}${t?.tagName ? ` on ${t.tagName}` : ""}${t?.src ? ` ${t.src.slice(0, 60)}` : ""}`.slice(0, 100);
  }
  return String(err).slice(0, 100);
}

// The watermark (for free users) is rendered into the preview DOM itself
// (components/receipt/Watermark.tsx), so html-to-image captures it here without
// any extra work. Pro users don't render it, so their exports are clean.

function triggerDownload(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function downloadPng(node: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await capture(node, "png");
  triggerDownload(dataUrl, `${filename}.png`);
}

export async function downloadJpg(node: HTMLElement, filename: string): Promise<void> {
  // JPG has no alpha — force a white background so it isn't black.
  const dataUrl = await capture(node, "jpeg", { quality: 0.95, backgroundColor: "#ffffff" });
  triggerDownload(dataUrl, `${filename}.jpg`);
}

/**
 * PDF export. By default the page hugs the receipt (good for thermal widths).
 * `printReady` instead places the receipt, centered and scaled, on a standard
 * A4 portrait page so it prints cleanly on a normal office printer.
 */
export async function downloadPdf(
  node: HTMLElement,
  filename: string,
  opts: { printReady?: boolean } = {}
): Promise<void> {
  const [{ jsPDF }, dataUrl] = await Promise.all([
    import("jspdf"),
    capture(node, "png", { backgroundColor: "#ffffff" }),
  ]);

  const width = node.offsetWidth;
  const height = node.offsetHeight;

  if (opts.printReady) {
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageW = 210;
    const pageH = 297;
    const margin = 15;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    const ratio = height / width;
    let w = maxW;
    let h = w * ratio;
    if (h > maxH) {
      h = maxH;
      w = h / ratio;
    }
    pdf.addImage(dataUrl, "PNG", (pageW - w) / 2, margin, w, h);
    pdf.save(`${filename}.pdf`);
    return;
  }

  // Tight page that matches the receipt dimensions plus a small margin.
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
