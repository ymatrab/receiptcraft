import { toPng, toJpeg } from "html-to-image";

const EXPORT_OPTIONS = {
  pixelRatio: 3,
  cacheBust: true,
};

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
  const dataUrl = await toPng(node, EXPORT_OPTIONS);
  triggerDownload(dataUrl, `${filename}.png`);
}

export async function downloadJpg(node: HTMLElement, filename: string): Promise<void> {
  // JPG has no alpha — force a white background so it isn't black.
  const dataUrl = await toJpeg(node, { ...EXPORT_OPTIONS, quality: 0.95, backgroundColor: "#ffffff" });
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
  const { jsPDF } = await import("jspdf");
  const dataUrl = await toPng(node, { ...EXPORT_OPTIONS, backgroundColor: "#ffffff" });

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
