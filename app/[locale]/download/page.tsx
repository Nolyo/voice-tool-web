"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Monitor, Apple } from "lucide-react"
import { useTranslations } from "next-intl"
import { useReleases } from "@/hooks/use-releases"

export default function DownloadPage() {
  const t = useTranslations("download")
  const { latest, isLoading, error } = useReleases()

  // Check which platforms have installers
  const hasWindows = latest?.windows && Object.keys(latest.windows).length > 0
  const hasLinux = latest?.linux && Object.keys(latest.linux).length > 0
  const hasMacOS = latest?.macos && Object.keys(latest.macos).length > 0

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

          {/* Platform Cards */}
          {!isLoading && !error && latest && (
            <div className="mx-auto max-w-5xl space-y-8">
              {/* Windows Card */}
              {hasWindows && (
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Monitor className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{t("windows.title")}</h2>
                      <p className="text-sm text-muted-foreground">{t("windows.requirement")}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {latest.windows?.nsis_installer && (
                      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 hover:border-primary/50 transition-colors">
                        <div>
                          <h3 className="font-semibold mb-1">
                            {t("windows.installers.nsis")}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {latest.version} • {latest.windows.nsis_installer.size_human}
                          </p>
                        </div>
                        <Button size="sm" className="w-full" asChild>
                          <a href={latest.windows.nsis_installer.url} download>
                            <Download className="mr-2 h-4 w-4" />
                            {t("button")}
                          </a>
                        </Button>
                      </div>
                    )}
                    {latest.windows?.msi_installer && (
                      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 hover:border-primary/50 transition-colors">
                        <div>
                          <h3 className="font-semibold mb-1">
                            {t("windows.installers.msi")}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {latest.version} • {latest.windows.msi_installer.size_human}
                          </p>
                        </div>
                        <Button size="sm" className="w-full" asChild>
                          <a href={latest.windows.msi_installer.url} download>
                            <Download className="mr-2 h-4 w-4" />
                            {t("button")}
                          </a>
                        </Button>
                      </div>
                    )}
                    {latest.windows?.portable && (
                      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 hover:border-primary/50 transition-colors">
                        <div>
                          <h3 className="font-semibold mb-1">
                            {t("windows.installers.portable")}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {latest.version} • {latest.windows.portable.size_human}
                          </p>
                        </div>
                        <Button size="sm" className="w-full" asChild>
                          <a href={latest.windows.portable.url} download>
                            <Download className="mr-2 h-4 w-4" />
                            {t("button")}
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Linux Card */}
              {hasLinux && (
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Monitor className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{t("linux.title")}</h2>
                      <p className="text-sm text-muted-foreground">{t("linux.requirement")}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {latest.linux?.deb && (
                      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 hover:border-primary/50 transition-colors">
                        <div>
                          <h3 className="font-semibold mb-1">
                            {t("linux.installers.deb")}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {latest.version} • {latest.linux.deb.size_human}
                          </p>
                        </div>
                        <Button size="sm" className="w-full" asChild>
                          <a href={latest.linux.deb.url} download>
                            <Download className="mr-2 h-4 w-4" />
                            {t("button")}
                          </a>
                        </Button>
                      </div>
                    )}
                    {latest.linux?.rpm && (
                      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 hover:border-primary/50 transition-colors">
                        <div>
                          <h3 className="font-semibold mb-1">
                            {t("linux.installers.rpm")}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {latest.version} • {latest.linux.rpm.size_human}
                          </p>
                        </div>
                        <Button size="sm" className="w-full" asChild>
                          <a href={latest.linux.rpm.url} download>
                            <Download className="mr-2 h-4 w-4" />
                            {t("button")}
                          </a>
                        </Button>
                      </div>
                    )}
                    {latest.linux?.appimage && (
                      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 hover:border-primary/50 transition-colors">
                        <div>
                          <h3 className="font-semibold mb-1">
                            {t("linux.installers.appimage")}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {latest.version} • {latest.linux.appimage.size_human}
                          </p>
                        </div>
                        <Button size="sm" className="w-full" asChild>
                          <a href={latest.linux.appimage.url} download>
                            <Download className="mr-2 h-4 w-4" />
                            {t("button")}
                          </a>
                        </Button>
                      </div>
                    )}
                    {latest.linux?.tarball && (
                      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 hover:border-primary/50 transition-colors">
                        <div>
                          <h3 className="font-semibold mb-1">
                            {t("linux.installers.tarball")}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {latest.version} • {latest.linux.tarball.size_human}
                          </p>
                        </div>
                        <Button size="sm" className="w-full" asChild>
                          <a href={latest.linux.tarball.url} download>
                            <Download className="mr-2 h-4 w-4" />
                            {t("button")}
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* macOS Card */}
              {hasMacOS && (
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Apple className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{t("macos.title")}</h2>
                      <p className="text-sm text-muted-foreground">{t("macos.requirement")}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {latest.macos?.dmg && (
                      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 hover:border-primary/50 transition-colors">
                        <div>
                          <h3 className="font-semibold mb-1">
                            {t("macos.installers.dmg")}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {latest.version} • {latest.macos.dmg.size_human}
                          </p>
                        </div>
                        <Button size="sm" className="w-full" asChild>
                          <a href={latest.macos.dmg.url} download>
                            <Download className="mr-2 h-4 w-4" />
                            {t("button")}
                          </a>
                        </Button>
                      </div>
                    )}
                    {latest.macos?.app && (
                      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 hover:border-primary/50 transition-colors">
                        <div>
                          <h3 className="font-semibold mb-1">
                            {t("macos.installers.app")}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {latest.version} • {latest.macos.app.size_human}
                          </p>
                        </div>
                        <Button size="sm" className="w-full" asChild>
                          <a href={latest.macos.app.url} download>
                            <Download className="mr-2 h-4 w-4" />
                            {t("button")}
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Installation Instructions */}
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 mt-12">
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
