import { toPng } from "html-to-image";

const EXPORT_OPTIONS = {
  pixelRatio: 3,
  cacheBust: true,
};

export async function downloadPng(node: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await toPng(node, EXPORT_OPTIONS);
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
}

export async function downloadPdf(node: HTMLElement, filename: string): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const dataUrl = await toPng(node, { ...EXPORT_OPTIONS, backgroundColor: "#ffffff" });

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
