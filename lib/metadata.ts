import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { siteConfig, type Locale } from "./site-config"

interface BuildMetadataOptions {
  /** i18n namespace containing `metaTitle`, `metaDescription`, and (for non-home pages) `pageTitle`. */
  namespace: string
  /** Path under the locale (e.g. "/features"). Use "/" for the home. */
  path: string
  locale: Locale
  /**
   * If true, the title is emitted as `{ default, template }` so child pages can
   * inherit the `%s — Lexena` template via Next.js metadata merging. Use this on
   * the locale layout. Pages should leave it false (default).
   */
  isLayoutDefault?: boolean
}

export async function buildMetadata({
  namespace,
  path,
  locale,
  isLayoutDefault = false,
}: BuildMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace })

  const fullTitle = t("metaTitle")
  const description = t("metaDescription")
  const localizedPath =
    locale === siteConfig.defaultLocale ? path : `/${locale}${path}`
  const canonical = `${siteConfig.url}${localizedPath}`

  const languages: Record<string, string> = {}
  for (const altLocale of siteConfig.locales) {
    const altPath =
      altLocale === siteConfig.defaultLocale ? path : `/${altLocale}${path}`
    languages[altLocale] = `${siteConfig.url}${altPath}`
  }
  languages["x-default"] = `${siteConfig.url}${path}`

  const title: Metadata["title"] = isLayoutDefault
    ? { default: fullTitle, template: `%s — ${siteConfig.name}` }
    : t("pageTitle")

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  }
}
