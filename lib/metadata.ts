import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { siteConfig, type Locale } from "./site-config"

interface BuildMetadataOptions {
  /** i18n namespace containing `metaTitle` and `metaDescription` keys. */
  namespace: string
  /** Path under the locale (e.g. "/features"). Use "/" for the home. */
  path: string
  locale: Locale
}

export async function buildMetadata({
  namespace,
  path,
  locale,
}: BuildMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace })

  const title = t("metaTitle")
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

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
