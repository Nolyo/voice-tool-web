export const siteConfig = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000",
  name: "Lexena",
  tagline: "Voice dictation for Windows",
  defaultLocale: "en",
  locales: ["en", "fr"] as const,
  githubRepo:
    process.env.NEXT_PUBLIC_GITHUB_REPO ??
    "https://github.com/Nolyo/lexena",
  releasesUrl:
    process.env.NEXT_PUBLIC_RELEASES_URL ??
    "https://raw.githubusercontent.com/Nolyo/lexena/main/docs/releases.json",
  githubReleasesUrl: "https://github.com/Nolyo/lexena/releases",
} as const

export type Locale = (typeof siteConfig.locales)[number]
