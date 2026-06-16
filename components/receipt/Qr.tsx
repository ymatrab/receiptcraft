import qrcode from "qrcode-generator";

// Real, scannable QR code generated from the given value (error-correction
// level M). Rendered as inline SVG so it exports cleanly to PNG/PDF.
export default function Qr({ value, size = 116 }: { value: string; size?: number }) {
  const qr = qrcode(0, "M");
  qr.addData(value || " ");
  qr.make();
  const count = qr.getModuleCount();
  const margin = 2; // quiet zone (required for scanners)
  const dim = count + margin * 2;

  const rects: React.ReactNode[] = [];
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        rects.push(
          <rect key={`${r}-${c}`} x={c + margin} y={r + margin} width={1} height={1} fill="#1e293b" />
        );
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${dim} ${dim}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      role="img"
      aria-label="QR code"
    >
      <rect width={dim} height={dim} fill="#ffffff" />
      {rects}
    </svg>
  );
}
