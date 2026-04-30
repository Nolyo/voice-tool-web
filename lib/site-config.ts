export const siteConfig = {
  /**
   * Public site URL. Set NEXT_PUBLIC_SITE_URL in env.
   * Falls back to localhost in dev so previews work without env setup.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
  name: "Voice Tool",
  defaultLocale: "en",
  locales: ["en", "fr"] as const,
  githubRepo:
    process.env.NEXT_PUBLIC_GITHUB_REPO ??
    "https://github.com/Nolyo/voice-tool",
} as const

export type Locale = (typeof siteConfig.locales)[number]
