import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  const t = useTranslations("notFound")

  return (
    <>
      <Header />
      <main
        id="main"
        className="flex min-h-[70vh] items-center py-20 sm:py-28"
      >
        <Container size="md">
          <div className="flex flex-col items-start gap-6">
            <div
              aria-hidden
              className="font-mono text-[14px] uppercase tracking-[0.18em] text-[var(--vt-accent)]"
            >
              {t("code")}
            </div>
            <h1 className="text-[44px] sm:text-[56px] font-semibold leading-[1.05] tracking-tight text-[var(--vt-fg)]">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-[17px] leading-[1.55] text-[var(--vt-fg-2)]">
              {t("body")}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-[10px] px-5 text-[14px] font-medium gap-2"
                style={{
                  background: "var(--vt-accent-strong)",
                  color: "white",
                  borderColor: "oklch(from var(--vt-accent) l c h / 0.55)",
                  boxShadow: "var(--vt-shadow-primary-glow)",
                }}
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  {t("primaryCta")}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-[10px] px-5 text-[14px] font-medium gap-2 bg-transparent border-[var(--vt-border)] text-[var(--vt-fg)] hover:bg-[var(--vt-hover)] hover:text-[var(--vt-fg)]"
              >
                <Link href="/features">
                  {t("secondaryCta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
