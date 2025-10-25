"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Monitor } from "lucide-react"
import { useTranslations } from "next-intl"
import { useReleases } from "@/hooks/use-releases"

export default function DownloadPage() {
  const t = useTranslations("download")
  const { latest, isLoading, error } = useReleases()

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-6 text-balance">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground text-balance">
              {t("hero.description")}
            </p>
          </div>

          {/* Loading / Error States */}
          {isLoading && (
            <div className="mx-auto max-w-5xl text-center py-12">
              <p className="text-muted-foreground">{t("loading")}</p>
            </div>
          )}

          {error && (
            <div className="mx-auto max-w-5xl">
              <Card className="p-6 bg-destructive/10 border-destructive">
                <p className="text-destructive text-center">{t("error")}</p>
              </Card>
            </div>
          )}

          {/* Download Cards */}
          {!isLoading && !error && latest && (
            <>
              <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3 mb-16">
                {/* NSIS Installer */}
                {latest.windows?.nsis && (
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Monitor className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {t("windows.installers.nsis")}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {t("windows.requirement")}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          {latest.version} • {latest.windows.nsis.size_human}
                        </p>
                      </div>
                      <Button className="w-full" size="lg" asChild>
                        <a href={latest.windows.nsis.url} download>
                          <Download className="mr-2 h-4 w-4" />
                          {t("button")}
                        </a>
                      </Button>
                    </div>
                  </Card>
                )}

                {/* MSI Installer */}
                {latest.windows?.msi && (
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Monitor className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {t("windows.installers.msi")}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {t("windows.requirement")}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          {latest.version} • {latest.windows.msi.size_human}
                        </p>
                      </div>
                      <Button className="w-full" size="lg" asChild>
                        <a href={latest.windows.msi.url} download>
                          <Download className="mr-2 h-4 w-4" />
                          {t("button")}
                        </a>
                      </Button>
                    </div>
                  </Card>
                )}

                {/* Portable */}
                {latest.windows?.portable && (
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Monitor className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {t("windows.installers.portable")}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {t("windows.requirement")}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          {latest.version} • {latest.windows.portable.size_human}
                        </p>
                      </div>
                      <Button className="w-full" size="lg" asChild>
                        <a href={latest.windows.portable.url} download>
                          <Download className="mr-2 h-4 w-4" />
                          {t("button")}
                        </a>
                      </Button>
                    </div>
                  </Card>
                )}
              </div>

              {/* Installation Instructions */}
              <div className="mx-auto max-w-3xl mt-16">
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                  <h2 className="text-2xl font-bold mb-6">{t("installation.title")}</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          {t("installation.step1.title")}
                        </p>
                        <p className="text-sm">{t("installation.step1.description")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          {t("installation.step2.title")}
                        </p>
                        <p className="text-sm">{t("installation.step2.description")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">
                          {t("installation.step3.title")}
                        </p>
                        <p className="text-sm">{t("installation.step3.description")}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
