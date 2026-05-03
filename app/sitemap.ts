import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

const ROUTES = ["/", "/features", "/download", "/pricing", "/legal/privacy", "/legal/terms"]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return ROUTES.flatMap((path) =>
    siteConfig.locales.map((locale) => {
      const url =
        locale === siteConfig.defaultLocale
          ? `${siteConfig.url}${path}`
          : `${siteConfig.url}/${locale}${path}`
      return {
        url,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: path === "/" ? 1.0 : 0.7,
      }
    })
  )
}
