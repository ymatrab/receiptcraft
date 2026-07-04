import { requireAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Quote a CSV cell (RFC 4180): wrap in quotes, double any inner quotes. */
function cell(value: string | null | undefined): string {
  const s = value ?? "";
  return `"${s.replace(/"/g, '""')}"`;
}

/**
 * Download the newsletter list as a CSV file. Opens directly in Excel /
 * Google Sheets / Numbers. Admin-only — requireAdmin() redirects otherwise.
 */
export async function GET() {
  await requireAdmin();

  const admin = createAdminClient();
  const { data } = await admin
    .from("newsletter_subscribers")
    .select("email, source, unsubscribed_at, created_at")
    .order("created_at", { ascending: false });

  const rows = data ?? [];
  const header = ["Email", "Source", "Status", "Signed up (UTC)"];
  const lines = [
    header.map(cell).join(","),
    ...rows.map((r) =>
      [
        cell(r.email),
        cell(r.source),
        cell(r.unsubscribed_at ? "unsubscribed" : "subscribed"),
        cell(r.created_at ? new Date(r.created_at).toISOString() : ""),
      ].join(",")
    ),
  ];

  // Prepend a UTF-8 BOM so Excel renders accented characters correctly.
  const csv = "﻿" + lines.join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-subscribers-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
