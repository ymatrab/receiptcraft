"use client";

import { useEffect, useState } from "react";
import ReceiptDocPaper from "@/components/receipt/ReceiptDocPaper";
import { docFromReceiptData } from "@/lib/sections";
import type { ReceiptData } from "@/lib/types";

/**
 * The sample receipt inside SideOfferCard, fetched in the browser from
 * /api/template (edge-cached) rather than rendered on the server.
 *
 * Loaded with next/dynamic only on screens 1280px and wider, so phones never
 * download it, and kept out of the server HTML so ~1,400 guide pages do not
 * gain a sample receipt's address and items as page text (the same reason
 * HandoffRow draws its picture).
 */
export default function SideReceiptPreview({ slug }: { slug: string }) {
  const [data, setData] = useState<ReceiptData | null>(null);

  useEffect(() => {
    let live = true;
    fetch(`/api/template?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (live && j?.data) setData(j.data as ReceiptData);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [slug]);

  if (!data) return <div className="h-[330px]" />;
  const doc = docFromReceiptData(data);
  // 0.62 for a standard receipt; less for wide layouts, so every one fits the
  // 230px the card leaves inside its padding.
  const zoom = Math.min(0.62, 230 / (doc.settings.widthPx || 380));
  return (
    <div className="receipt-shadow" style={{ zoom }}>
      <ReceiptDocPaper doc={doc} />
    </div>
  );
}
