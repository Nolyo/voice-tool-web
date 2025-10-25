"use client"

import Link from "next/link"
import { Mic } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Mic className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">Voice Tool</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t("product.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("product.features")}
                </Link>
              </li>
              <li>
                <Link href="#download" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("product.download")}
                </Link>
              </li>
              <li>
                <Link href="https://github.com/Nolyo/voice-tool/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("product.changelog")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t("resources.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#docs" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("resources.documentation")}
                </Link>
              </li>
              <li>
                <Link href="https://github.com/Nolyo/voice-tool" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("resources.github")}
                </Link>
              </li>
              <li>
                <Link href="https://github.com/Nolyo/voice-tool/issues" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("resources.support")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t("legal.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://github.com/Nolyo/voice-tool/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("legal.license")}
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("legal.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t("legal.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
