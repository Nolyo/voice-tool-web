"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"
import {
  Download,
  Monitor,
  Apple,
  Github,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Sparkles,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useReleases } from "@/hooks/use-releases"
import { siteConfig } from "@/lib/site-config"
import type { Release } from "@/types/releases"

type InstallerKey = string

interface InstallerLike {
  url: string
  size_human?: string
  sha256?: string
}

export default function DownloadPage() {
  const t = useTranslations("download")
  const tc = useTranslations("common")
  const { latest, stableLatest, releases, isLoading, error } = useReleases()
  const [showPrev, setShowPrev] = useState(false)
  const [showStable, setShowStable] = useState(false)
  const [copiedSha, setCopiedSha] = useState<string | null>(null)

  const previous = releases
    .filter(
      (r) =>
        r.version !== latest?.version && r.version !== stableLatest?.version,
    )
    .slice(0, 5)

  const handleCopySha = (sha: string) => {
    navigator.clipboard.writeText(sha).catch(() => {})
    setCopiedSha(sha)
    setTimeout(() => setCopiedSha(null), 1500)
  }

  return (
    <>
      <Header />
      <main id="main" className="pt-24 pb-12">
        <Section spacing="md">
          <Container size="lg">
            <div className="max-w-2xl space-y-4">
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
              <h1 className="vt-display text-[40px] sm:text-[52px] font-semibold tracking-[-0.02em] leading-[1.05] text-[var(--vt-fg)]">
                {t("hero.title")}
              </h1>
              <p className="text-[16px] leading-[1.6] text-[var(--vt-fg-2)]">
                {t("hero.description")}
              </p>
              <div className="vt-mono pt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
                <span>{t("hero.factA")}</span>
                <span className="text-[var(--vt-border-strong)]">·</span>
                <span>{t("hero.factB")}</span>
                <span className="text-[var(--vt-border-strong)]">·</span>
                <span>{t("hero.factC")}</span>
              </div>
            </div>
          </Container>
        </Section>

        <Container size="lg">
          {isLoading ? (
            <div className="rounded-[14px] border border-[var(--vt-border)] bg-[var(--vt-panel-2)] py-16 text-center">
              <p className="vt-mono text-[12px] text-[var(--vt-fg-4)]">
                {t("loading")}
              </p>
            </div>
          ) : error || !latest ? (
            <div
              className="rounded-[14px] border border-[var(--vt-border)] p-8 sm:p-10 max-w-3xl"
              style={{ background: "var(--vt-panel-2)" }}
            >
              <Eyebrow tone="warn">⚠ Erreur</Eyebrow>
              <h2 className="vt-display mt-3 text-[22px] font-semibold text-[var(--vt-fg)]">
                {t("error.title")}
              </h2>
              <p className="mt-3 text-[14px] leading-[1.6] text-[var(--vt-fg-2)]">
                {t("error.body")}
              </p>
              <Button
                asChild
                className="mt-5 h-10 rounded-[10px] px-4 text-[13px] gap-2"
                style={{
                  background: "var(--vt-accent-strong)",
                  color: "white",
                  boxShadow: "var(--vt-shadow-primary-glow)",
                  borderColor: "oklch(from var(--vt-accent) l c h / 0.55)",
                }}
              >
                <a
                  href={siteConfig.githubReleasesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  {t("error.ctaLabel")}
                </a>
              </Button>
            </div>
          ) : (
            <div className="space-y-10 max-w-5xl">
              {latest.prerelease ? (
                <BetaHighlight
                  eyebrow={t("beta.eyebrow")}
                  title={t("beta.title")}
                  description={t("beta.description")}
                  note={t("beta.note")}
                  changelogLabel={t("beta.changelogLabel")}
                  release={latest}
                >
                  <PlatformCardsForRelease
                    release={latest}
                    t={t}
                    copiedSha={copiedSha}
                    onCopySha={handleCopySha}
                  />
                </BetaHighlight>
              ) : (
                <PlatformCardsForRelease
                  release={latest}
                  t={t}
                  copiedSha={copiedSha}
                  onCopySha={handleCopySha}
                />
              )}

              {stableLatest ? (
                <div
                  className="rounded-[14px] border border-[var(--vt-border)] overflow-hidden"
                  style={{ background: "var(--vt-panel-2)" }}
                >
                  <button
                    type="button"
                    onClick={() => setShowStable(!showStable)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                    aria-expanded={showStable}
                  >
                    <div className="flex flex-col gap-1">
                      <Eyebrow>{t("stable.eyebrow")}</Eyebrow>
                      <span className="text-[14px] font-medium text-[var(--vt-fg)]">
                        {t("stable.title", { version: stableLatest.version })}
                      </span>
                    </div>
                    {showStable ? (
                      <ChevronUp className="h-4 w-4 text-[var(--vt-fg-3)]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[var(--vt-fg-3)]" />
                    )}
                  </button>
                  {showStable ? (
                    <div className="border-t border-[var(--vt-border)] p-6 sm:p-7 space-y-6">
                      <p className="text-[13.5px] text-[var(--vt-fg-3)] leading-[1.6] max-w-3xl">
                        {t("stable.description")}
                      </p>
                      <PlatformCardsForRelease
                        release={stableLatest}
                        t={t}
                        copiedSha={copiedSha}
                        onCopySha={handleCopySha}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}

              {previous.length > 0 ? (
                <div
                  className="rounded-[14px] border border-[var(--vt-border)] overflow-hidden"
                  style={{ background: "var(--vt-panel-2)" }}
                >
                  <button
                    type="button"
                    onClick={() => setShowPrev(!showPrev)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="vt-mono text-[11px] uppercase tracking-[0.1em] text-[var(--vt-fg-4)]">
                      {showPrev ? t("buttons.hidePrevious") : t("buttons.showPrevious")}
                    </span>
                    {showPrev ? (
                      <ChevronUp className="h-4 w-4 text-[var(--vt-fg-3)]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[var(--vt-fg-3)]" />
                    )}
                  </button>
                  {showPrev ? (
                    <ul className="border-t border-[var(--vt-border)] divide-y divide-[var(--vt-border)]">
                      {previous.map((rel) => (
                        <PreviousRow key={rel.version} release={rel} />
                      ))}
                      <li className="flex items-center justify-end px-6 py-3">
                        <a
                          href={siteConfig.githubReleasesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="vt-mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-[var(--vt-accent-2)] hover:text-[var(--vt-fg)]"
                        >
                          {t("buttons.openReleases")}
                        </a>
                      </li>
                    </ul>
                  ) : null}
                </div>
              ) : null}

              {/* Installation steps */}
              <div
                className="rounded-[16px] border border-[var(--vt-border)] p-7 sm:p-9"
                style={{ background: "var(--vt-panel-2)" }}
              >
                <h2 className="vt-display text-[20px] font-semibold text-[var(--vt-fg)] tracking-[-0.005em]">
                  {t("installation.title")}
                </h2>
                <ol className="mt-6 space-y-5">
                  <Step
                    n={1}
                    title={t("installation.step1.title")}
                    body={t("installation.step1.description")}
                  />
                  <Step
                    n={2}
                    title={t("installation.step2.title")}
                    body={t("installation.step2.description")}
                  />
                  <Step
                    n={3}
                    title={t("installation.step3.title")}
                    body={t("installation.step3.description")}
                  />
                </ol>
              </div>
            </div>
          )}
          {!isLoading && !error && !latest ? (
            <div
              className="rounded-[14px] border border-[var(--vt-border)] p-8 max-w-3xl"
              style={{ background: "var(--vt-panel-2)" }}
            >
              <Eyebrow>{tc("comingSoon")}</Eyebrow>
              <h2 className="vt-display mt-3 text-[20px] text-[var(--vt-fg)]">
                {t("fallback.title")}
              </h2>
              <p className="mt-2 text-[13.5px] text-[var(--vt-fg-2)] leading-[1.6]">
                {t("fallback.body")}
              </p>
            </div>
          ) : null}
        </Container>
      </main>
      <Footer />
    </>
  )
}

function BetaHighlight({
  eyebrow,
  title,
  description,
  note,
  changelogLabel,
  release,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  note: string
  changelogLabel: string
  release: Release
  children: React.ReactNode
}) {
  return (
    <section
      className="rounded-[18px] border p-6 sm:p-8 space-y-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(from var(--vt-accent) l c h / 0.08) 0%, var(--vt-panel-2) 60%)",
        borderColor: "oklch(from var(--vt-accent) l c h / 0.45)",
        boxShadow: "var(--vt-shadow-primary-glow)",
      }}
      aria-labelledby="beta-heading"
    >
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span
            className="grid h-6 w-6 place-items-center rounded-full"
            style={{
              background: "var(--vt-accent-soft)",
              color: "var(--vt-accent-2)",
              border: "1px solid oklch(from var(--vt-accent) l c h / 0.45)",
            }}
          >
            <Sparkles className="h-3 w-3" aria-hidden />
          </span>
          <Eyebrow tone="accent" withDot>
            {eyebrow}
          </Eyebrow>
        </div>
        <h2
          id="beta-heading"
          className="vt-display text-[24px] sm:text-[28px] font-semibold tracking-[-0.01em] text-[var(--vt-fg)]"
        >
          {title}
        </h2>
        <p className="text-[14.5px] leading-[1.6] text-[var(--vt-fg-2)]">
          {description}
        </p>
        <p
          className="vt-mono text-[11px] uppercase tracking-[0.08em]"
          style={{ color: "var(--vt-accent-2)" }}
        >
          {note}
        </p>
        <a
          href={release.changelog_url}
          target="_blank"
          rel="noopener noreferrer"
          className="vt-mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-[var(--vt-accent-2)] hover:text-[var(--vt-fg)]"
        >
          {changelogLabel} →
        </a>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  )
}

function PlatformCardsForRelease({
  release,
  t,
  copiedSha,
  onCopySha,
}: {
  release: Release
  t: ReturnType<typeof useTranslations>
  copiedSha: string | null
  onCopySha: (sha: string) => void
}) {
  return (
    <>
      <PlatformCard
        icon={Monitor}
        title={t("platforms.windows.title")}
        requirement={t("platforms.windows.requirement")}
        installers={[
          {
            key: "nsis_installer",
            label: t("platforms.windows.installers.nsis"),
            hint: t("platforms.windows.installers.nsisHint"),
            asset: release.windows?.nsis_installer,
          },
          {
            key: "msi_installer",
            label: t("platforms.windows.installers.msi"),
            hint: t("platforms.windows.installers.msiHint"),
            asset: release.windows?.msi_installer,
          },
          {
            key: "portable",
            label: t("platforms.windows.installers.portable"),
            hint: t("platforms.windows.installers.portableHint"),
            asset: release.windows?.portable,
          },
        ]}
        version={release.version}
        copyShaLabel={t("buttons.copySha")}
        copiedLabel={t("buttons.shaCopied")}
        downloadLabel={t("buttons.download")}
        copiedSha={copiedSha}
        onCopySha={onCopySha}
      />

      {release.linux && Object.keys(release.linux).length > 0 ? (
        <PlatformCard
          icon={Monitor}
          title={t("platforms.linux.title")}
          requirement={t("platforms.linux.requirement")}
          installers={[
            {
              key: "deb",
              label: t("platforms.linux.installers.deb"),
              asset: release.linux?.deb,
            },
            {
              key: "rpm",
              label: t("platforms.linux.installers.rpm"),
              asset: release.linux?.rpm,
            },
            {
              key: "appimage",
              label: t("platforms.linux.installers.appimage"),
              asset: release.linux?.appimage,
            },
            {
              key: "tarball",
              label: t("platforms.linux.installers.tarball"),
              asset: release.linux?.tarball,
            },
          ]}
          version={release.version}
          downloadLabel={t("buttons.download")}
          copyShaLabel={t("buttons.copySha")}
          copiedLabel={t("buttons.shaCopied")}
          copiedSha={copiedSha}
          onCopySha={onCopySha}
        />
      ) : null}

      {release.macos && Object.keys(release.macos).length > 0 ? (
        <PlatformCard
          icon={Apple}
          title={t("platforms.macos.title")}
          requirement={t("platforms.macos.requirement")}
          installers={[
            {
              key: "dmg",
              label: t("platforms.macos.installers.dmg"),
              asset: release.macos?.dmg,
            },
            {
              key: "app",
              label: t("platforms.macos.installers.app"),
              asset: release.macos?.app,
            },
          ]}
          version={release.version}
          downloadLabel={t("buttons.download")}
          copyShaLabel={t("buttons.copySha")}
          copiedLabel={t("buttons.shaCopied")}
          copiedSha={copiedSha}
          onCopySha={onCopySha}
        />
      ) : null}
    </>
  )
}

interface InstallerEntry {
  key: InstallerKey
  label: string
  hint?: string
  asset?: InstallerLike
}

function PlatformCard({
  icon: Icon,
  title,
  requirement,
  installers,
  version,
  downloadLabel,
  copyShaLabel,
  copiedLabel,
  copiedSha,
  onCopySha,
}: {
  icon: typeof Monitor
  title: string
  requirement: string
  installers: InstallerEntry[]
  version: string
  downloadLabel: string
  copyShaLabel: string
  copiedLabel: string
  copiedSha: string | null
  onCopySha: (sha: string) => void
}) {
  const present = installers.filter((i) => i.asset)
  if (present.length === 0) return null
  return (
    <article
      className="rounded-[16px] border border-[var(--vt-border)] overflow-hidden"
      style={{
        background: "var(--vt-panel-2)",
        boxShadow: "var(--vt-shadow-elevated)",
      }}
    >
      <header
        className="flex items-center gap-3 border-b border-[var(--vt-border)] px-6 py-4"
        style={{ background: "var(--vt-panel)" }}
      >
        <span
          className="grid h-9 w-9 place-items-center rounded-[10px] border"
          style={{
            background: "var(--vt-accent-soft)",
            color: "var(--vt-accent-2)",
            borderColor: "oklch(from var(--vt-accent) l c h / 0.4)",
          }}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="vt-display text-[18px] font-semibold tracking-[-0.005em] text-[var(--vt-fg)]">
            {title}
          </h2>
          <p className="vt-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)] mt-0.5">
            {requirement}
          </p>
        </div>
      </header>
      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-[var(--vt-border)]">
        {present.map((entry) => {
          const sha = entry.asset?.sha256
          return (
            <div
              key={entry.key}
              className="flex flex-col gap-3 p-5"
              style={{ background: "var(--vt-panel-2)" }}
            >
              <div>
                <h3 className="text-[13.5px] font-medium text-[var(--vt-fg)]">
                  {entry.label}
                </h3>
                {entry.hint ? (
                  <p className="text-[11.5px] text-[var(--vt-fg-3)] mt-0.5">
                    {entry.hint}
                  </p>
                ) : null}
                <p className="vt-mono text-[10.5px] tabular-nums text-[var(--vt-fg-4)] mt-2">
                  v{version}
                  {entry.asset?.size_human ? ` · ${entry.asset.size_human}` : ""}
                </p>
              </div>
              <Button
                asChild
                size="sm"
                className="h-9 rounded-[8px] text-[12.5px] font-medium gap-2"
                style={{
                  background: "var(--vt-accent-strong)",
                  color: "white",
                  boxShadow: "var(--vt-shadow-primary-glow)",
                  borderColor: "oklch(from var(--vt-accent) l c h / 0.55)",
                }}
              >
                <a href={entry.asset?.url} download>
                  <Download className="h-3.5 w-3.5" />
                  {downloadLabel}
                </a>
              </Button>
              {sha ? (
                <button
                  type="button"
                  onClick={() => onCopySha(sha)}
                  className="vt-mono inline-flex items-center justify-between gap-2 rounded-[6px] border border-[var(--vt-border)] bg-[var(--vt-hover)] px-2 py-1.5 text-[10px] tabular-nums text-[var(--vt-fg-4)] hover:bg-[var(--vt-surface)] transition-colors"
                  title={sha}
                  aria-label={copyShaLabel}
                >
                  <span className="truncate">{sha.slice(0, 24)}…</span>
                  {copiedSha === sha ? (
                    <Check
                      className="h-3 w-3 shrink-0"
                      style={{ color: "var(--vt-ok)" }}
                    />
                  ) : (
                    <Copy className="h-3 w-3 shrink-0" />
                  )}
                </button>
              ) : null}
              {copiedSha === sha && sha ? (
                <span
                  className="vt-mono text-[10px] uppercase tracking-[0.08em]"
                  style={{ color: "var(--vt-ok)" }}
                >
                  {copiedLabel}
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
    </article>
  )
}

function PreviousRow({ release }: { release: Release }) {
  return (
    <li
      className="flex items-center justify-between px-6 py-3 text-[13px]"
      style={{ background: "var(--vt-panel)" }}
    >
      <span className="vt-mono tabular-nums text-[var(--vt-fg-2)]">
        v{release.version}
      </span>
      <span className="vt-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
        {release.published_at?.slice(0, 10) ?? "—"}
      </span>
    </li>
  )
}

function Step({
  n,
  title,
  body,
}: {
  n: number
  title: string
  body: string
}) {
  return (
    <li className="flex gap-4">
      <span
        className="vt-mono grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-semibold tabular-nums"
        style={{
          background: "var(--vt-accent-soft)",
          color: "var(--vt-accent-2)",
          border: "1px solid oklch(from var(--vt-accent) l c h / 0.4)",
        }}
      >
        {n}
      </span>
      <div className="flex-1 pt-0.5">
        <h3 className="text-[14px] font-medium text-[var(--vt-fg)]">{title}</h3>
        <p className="text-[13px] text-[var(--vt-fg-3)] leading-[1.6] mt-1">
          {body}
        </p>
      </div>
    </li>
  )
}
