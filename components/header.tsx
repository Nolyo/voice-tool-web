"use client"

import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Mic } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export function Header() {
  const t = useTranslations("header")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Mic className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">Voice Tool</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t("nav.docs")}
          </Link>
          <Link href="/download" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t("nav.download")}
          </Link>
          <Link href="https://github.com/Nolyo/voice-tool" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {t("nav.github")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button size="sm" asChild>
            <Link href="/download">{t("cta")}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
