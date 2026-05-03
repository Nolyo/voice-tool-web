import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

const nextConfig: NextConfig = {
  // Standalone output is required for the Dockerfile / Dokploy deploy.
  // Skipped by default so `pnpm build` works on Windows (symlink EPERM).
  // Set NEXT_OUTPUT_STANDALONE=1 in CI / Docker to enable.
  output: process.env.NEXT_OUTPUT_STANDALONE === "1" ? "standalone" : undefined,
}

export default withNextIntl(nextConfig)
