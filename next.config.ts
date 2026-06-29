import type { NextConfig } from "next";

// Security headers applied to every route. HSTS is already injected by Vercel's
// edge; we re-declare it here so the policy is owned by the app and survives a
// platform move. The CSP intentionally only sets `frame-ancestors` (clickjacking
// protection) — a full resource CSP would need to allowlist GA4, Clarity, Stripe,
// Supabase and Sanity and be verified against the live deploy before shipping.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
