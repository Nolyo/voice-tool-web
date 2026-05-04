import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"
import { CTABand } from "@/components/layout/cta-band"
import { Download, Github } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function FinalCta() {
  const t = useTranslations("home.finalCta")

  return (
    <Section spacing="lg" className="border-t border-[var(--vt-border)]">
      <Container size="lg">
        <CTABand
          eyebrow={<Eyebrow withDot tone="accent">{t("eyebrow")}</Eyebrow>}
          title={t("title")}
          body={t("subhead")}
          primary={
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
              <Link href="/download">
                <Download className="h-4 w-4" />
                {t("ctaPrimary")}
              </Link>
            </Button>
          }
          secondary={
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-[10px] px-5 text-[14px] font-medium gap-2 bg-transparent border-[var(--vt-border)] text-[var(--vt-fg)] hover:bg-[var(--vt-hover)] hover:text-[var(--vt-fg)]"
            >
              <a
                href={siteConfig.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                {t("ctaSecondary")}
              </a>
            </Button>
          }
        />
      </Container>
    </Section>
  )
}
