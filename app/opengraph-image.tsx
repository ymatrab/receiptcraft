import { ImageResponse } from "next/og";

export const alt = "Makecepeit — Free Receipt Maker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "white",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            🧾 Makecepeit
          </div>
          <div
            style={{
              marginTop: 36,
              color: "white",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            Make a receipt in 60 seconds
          </div>
          <div style={{ marginTop: 28, color: "#c7d2fe", fontSize: 30, lineHeight: 1.4 }}>
            Free · No sign-up · No watermark · PDF & PNG download
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#fffefb",
            borderRadius: 12,
            padding: "36px 32px",
            width: 320,
            boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
            color: "#1e293b",
            fontSize: 18,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, margin: "0 auto" }}>DAILY GRIND CO.</div>
          <div style={{ color: "#64748b", fontSize: 15, margin: "6px auto 0" }}>
            412 Oak Street, Austin TX
          </div>
          <div style={{ borderTop: "2px dashed #cbd5e1", margin: "20px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Caffe Latte</span>
            <span>$5.25</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <span>Croissant ×2</span>
            <span>$7.50</span>
          </div>
          <div style={{ borderTop: "2px dashed #cbd5e1", margin: "20px 0" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            <span>TOTAL</span>
            <span>$13.80</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
