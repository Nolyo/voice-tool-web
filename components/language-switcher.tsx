"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "fr" : "en"
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={toggleLocale}
      aria-label={t("ariaLabel")}
      title={locale === "en" ? t("switchToFrench") : t("switchToEnglish")}
    >
      <Languages className="h-4 w-4" />
    </Button>
  )
}
