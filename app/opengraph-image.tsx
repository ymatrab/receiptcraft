import { ImageResponse } from "next/og";

export const alt = "Makecepeit — Free Receipt Maker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Paper & ink palette, matching the site theme. Kept as literals because
// ImageResponse renders outside the app's CSS, so it can't read the tokens.
const INK = "#1b1e1b";
const INK_SOFT = "#6c716b";
const GROUND = "#f5f6f3";
const PAPER = "#fffefb";
const RULE = "#d7d9d2";
const LEDGER = "#14563c";

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
          background: GROUND,
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              color: INK,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            MAKECEPEIT
          </div>

          {/* Two stacked lines rather than an inline span — Satori is happier
              with explicit flex children than with mixed inline content. */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 34 }}>
            <div
              style={{
                color: INK,
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: -2,
              }}
            >
              Make a receipt in
            </div>
            <div
              style={{
                color: LEDGER,
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: -2,
              }}
            >
              60 seconds
            </div>
          </div>

          <div style={{ display: "flex", marginTop: 30, color: INK_SOFT, fontSize: 28 }}>
            Free · No sign-up to start · 100+ templates · PDF &amp; PNG
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: PAPER,
            borderRadius: 3,
            padding: "36px 32px",
            width: 320,
            boxShadow: "0 24px 64px rgba(27,30,27,0.18)",
            color: INK,
            fontSize: 18,
          }}
        >
          <div style={{ display: "flex", fontSize: 22, fontWeight: 700, margin: "0 auto" }}>
            DAILY GRIND CO.
          </div>
          <div style={{ display: "flex", color: INK_SOFT, fontSize: 15, margin: "6px auto 0" }}>
            412 Oak Street, Austin TX
          </div>
          <div style={{ borderTop: `2px dashed ${RULE}`, margin: "20px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Caffe Latte</span>
            <span>$5.25</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <span>Croissant ×2</span>
            <span>$7.50</span>
          </div>
          <div style={{ borderTop: `2px dashed ${RULE}`, margin: "20px 0" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 24,
              fontWeight: 800,
              color: LEDGER,
            }}
          >
            <span>TOTAL</span>
            <span>$13.80</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      // This image exists for social/link unfurls, not Google's image index.
      // noindex clears /opengraph-image from GSC's "Crawled – currently not
      // indexed" list. Social scrapers (facebookexternalhit, Twitterbot) ignore
      // X-Robots-Tag, so link previews are unaffected.
      headers: { "X-Robots-Tag": "noindex" },
    }
  );
}
</content>
