import { getTranslations } from "next-intl/server"
import { siteConfig, type Locale } from "@/lib/site-config"

interface Props {
  locale: Locale
}

/**
 * Renders schema.org SoftwareApplication JSON-LD on the home page.
 * Helps Google show the rich app boîtier in SERPs (name, OS, price).
 */
export async function SoftwareApplicationJsonLd({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home" })
  const url = `${siteConfig.url}${locale === siteConfig.defaultLocale ? "" : `/${locale}`}`

  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "ProductivityApplication",
    applicationSubCategory: "Voice dictation",
    operatingSystem: "Windows",
    url,
    description: t("metaDescription"),
    downloadUrl: `${siteConfig.url}${locale === siteConfig.defaultLocale ? "" : `/${locale}`}/download`,
    softwareVersion: "3.0",
    inLanguage: siteConfig.locales as unknown as string[],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
