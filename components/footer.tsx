import Image from "next/image"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { siteConfig } from "@/lib/site-config"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer
      className="border-t border-[var(--vt-border)]"
      style={{ background: "var(--vt-panel)" }}
    >
      <Container size="lg" className="py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src="/lexena-monogram.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 rounded-[7px]"
              />
              <span className="vt-display text-[15px] font-semibold tracking-[-0.01em] text-[var(--vt-fg)]">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-[13.5px] leading-[1.55] text-[var(--vt-fg-3)] max-w-xs">
              {t("tagline")}
            </p>
            <p className="vt-mono mt-5 text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
              {t("buildNote")}
            </p>
          </div>

          <FooterColumn label={t("product.title")}>
            <FooterLink href="/features">{t("product.features")}</FooterLink>
            <FooterLink href="/pricing">{t("product.pricing")}</FooterLink>
            <FooterLink href="/download">{t("product.download")}</FooterLink>
            <FooterLinkExternal
              href={`${siteConfig.githubRepo}/blob/main/CHANGELOG.md`}
            >
              {t("product.changelog")}
            </FooterLinkExternal>
          </FooterColumn>

          <FooterColumn label={t("resources.title")}>
            <FooterLinkExternal href={siteConfig.githubRepo}>
              {t("resources.github")}
            </FooterLinkExternal>
            <FooterLinkExternal href={`${siteConfig.githubRepo}/issues`}>
              {t("resources.issues")}
            </FooterLinkExternal>
            <FooterLinkExternal href={siteConfig.githubReleasesUrl}>
              {t("resources.releases")}
            </FooterLinkExternal>
          </FooterColumn>

          <FooterColumn label={t("legal.title")}>
            <FooterLinkExternal
              href={`${siteConfig.githubRepo}/blob/main/LICENSE`}
            >
              {t("legal.license")}
            </FooterLinkExternal>
            <FooterLink href="/legal/privacy">{t("legal.privacy")}</FooterLink>
            <FooterLink href="/legal/terms">{t("legal.terms")}</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--vt-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-[var(--vt-fg-4)]">{t("copyright")}</p>
          <p className="vt-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
            github.com/nolyo/lexena
          </p>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <Eyebrow className="mb-4">{label}</Eyebrow>
      <ul className="space-y-2.5 text-[13px]">{children}</ul>
    </div>
  )
}

function FooterLink({
  href,
  children,
}: {
  href: "/features" | "/pricing" | "/download" | "/legal/privacy" | "/legal/terms"
  children: React.ReactNode
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-[var(--vt-fg-3)] transition-colors hover:text-[var(--vt-fg)]"
      >
        {children}
      </Link>
    </li>
  )
}

function FooterLinkExternal({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--vt-fg-3)] transition-colors hover:text-[var(--vt-fg)]"
      >
        {children}
      </a>
    </li>
  )
}
