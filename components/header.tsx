"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { Github } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function Header() {
  const t = useTranslations("nav")
  const tc = useTranslations("common")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--vt-border)]"
      style={{
        background: "color-mix(in oklch, var(--vt-bg), transparent 30%)",
        backdropFilter: "saturate(140%) blur(10px)",
        WebkitBackdropFilter: "saturate(140%) blur(10px)",
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-[var(--vt-panel-2)] focus:px-3 focus:py-2 focus:text-[var(--vt-fg)] focus:ring-2 focus:ring-[var(--vt-accent)]"
      >
        {t("skipToContent")}
      </a>

      <div className="mx-auto flex h-[56px] w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label={`${siteConfig.name} — accueil`}
        >
          <Image
            src="/lexena-monogram.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-[7px]"
            priority
          />
          <span className="vt-display text-[15px] font-semibold tracking-[-0.01em] text-[var(--vt-fg)]">
            {siteConfig.name}
          </span>
          <span
            className="vt-mono ml-1 hidden sm:inline-flex items-center gap-1 rounded-full border px-2 py-[2px] text-[9.5px] uppercase tracking-[0.08em]"
            style={{
              background: "var(--vt-accent-soft)",
              color: "var(--vt-accent-2)",
              borderColor: "oklch(from var(--vt-accent) l c h / 0.4)",
            }}
          >
            <span
              className="vt-anim-pulse-dot inline-block h-1 w-1 rounded-full"
              style={{ background: "var(--vt-accent)" }}
            />
            {tc("currentVersion")}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1.5">
          <NavLink href="/features">{t("features")}</NavLink>
          <NavLink href="/pricing">{t("pricing")}</NavLink>
          <NavLink href="/download">{t("download")}</NavLink>
          <a
            href={siteConfig.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] text-[var(--vt-fg-3)] hover:bg-[var(--vt-hover)] hover:text-[var(--vt-fg)] transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span>{t("github")}</span>
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher
            currentLocale={locale}
            onSwitch={(l) =>
              router.replace(pathname || "/", { locale: l as "en" | "fr" })
            }
          />
          <Button
            asChild
            size="sm"
            className="h-8 rounded-[10px] px-3.5 text-[12.5px] font-medium"
            style={{
              background: "var(--vt-accent)",
              color: "white",
              boxShadow: "var(--vt-shadow-primary-glow)",
              borderColor: "oklch(from var(--vt-accent) l c h / 0.55)",
            }}
          >
            <Link href="/download">{t("download")}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function NavLink({
  href,
  children,
}: {
  href: "/features" | "/pricing" | "/download"
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-1.5 text-[13px] text-[var(--vt-fg-3)] transition-colors hover:bg-[var(--vt-hover)] hover:text-[var(--vt-fg)]"
    >
      {children}
    </Link>
  )
}

function LocaleSwitcher({
  currentLocale,
  onSwitch,
}: {
  currentLocale: string
  onSwitch: (l: string) => void
}) {
  return (
    <div
      className="hidden sm:inline-flex items-center rounded-full border border-[var(--vt-border)] p-[2px] vt-mono text-[10.5px]"
      role="group"
      aria-label="Locale"
    >
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onSwitch(l)}
          aria-pressed={currentLocale === l}
          className={cn(
            "h-5 w-7 rounded-full transition-colors uppercase",
            currentLocale === l
              ? "bg-[var(--vt-surface-hi)] text-[var(--vt-fg)]"
              : "text-[var(--vt-fg-4)] hover:text-[var(--vt-fg-2)]",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
