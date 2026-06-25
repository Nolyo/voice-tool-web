import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

// Public share page hardening. The real XSS boundary is DOMPurify in
// `renderSharedNoteHtml` (the injected note HTML is sanitized client-side);
// this CSP is defense-in-depth. `script-src` allows 'unsafe-inline' because
// Next.js App Router emits inline bootstrap/flight scripts — note content can
// never reach script execution (DOMPurify strips <script>/handlers and
// innerHTML does not execute inline scripts).
const SHARE_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join("; ")

const nextConfig: NextConfig = {
  // Standalone output is required for the Dockerfile / Dokploy deploy.
  // Skipped by default so `pnpm build` works on Windows (symlink EPERM).
  // Set NEXT_OUTPUT_STANDALONE=1 in CI / Docker to enable.
  output: process.env.NEXT_OUTPUT_STANDALONE === "1" ? "standalone" : undefined,
  async headers() {
    return [
      {
        source: "/s/:slug*",
        headers: [
          { key: "Content-Security-Policy", value: SHARE_CSP },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
          // Revoked links must die promptly — do not cache shared content.
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
