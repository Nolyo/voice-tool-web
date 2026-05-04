"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"
import { AnimatedCaret } from "@/components/distinctive/animated-caret"
import { WaveformLive } from "@/components/distinctive/waveform-live"
import { HotkeyChord } from "@/components/distinctive/hotkey-chord"
import { ArrowRight, Download, Github } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function HeroHome() {
  const t = useTranslations("home.hero")
  const phrases = t.raw("phrases") as string[]

  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24"
      id="main"
    >
      {/* Editorial side rule + faint grid texture, no big radial gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px]"
        style={{ background: "var(--vt-border)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-32 hidden lg:block opacity-[0.07]"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(closest-side, oklch(from var(--vt-accent) l c h / 0.5), transparent 70%)",
        }}
      />

      <Container size="lg">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
          {/* Left — copy */}
          <div className="space-y-7 max-w-xl">
            <Eyebrow withDot tone="accent">
              {t("eyebrow")}
            </Eyebrow>

            <h1 className="vt-display text-[44px] sm:text-[58px] lg:text-[68px] font-semibold leading-[1.02] tracking-[-0.025em] text-[var(--vt-fg)]">
              {t("titleLead")}
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(95deg, var(--vt-accent), var(--vt-accent-2))",
                }}
              >
                {t("titleAccent")}
              </span>
            </h1>

            <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[var(--vt-fg-2)] max-w-lg">
              {t("subhead")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-[10px] px-5 text-[14px] font-medium gap-2 bg-transparent border-[var(--vt-border)] text-[var(--vt-fg)] hover:bg-[var(--vt-hover)] hover:text-[var(--vt-fg)]"
              >
                <Link href="/features">
                  {t("ctaSecondary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="vt-mono pt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--vt-ok)" }}
                />
                {t("factA")}
              </span>
              <span className="text-[var(--vt-border-strong)]">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Github className="h-3 w-3" />
                {t("factB")}
              </span>
              <span className="text-[var(--vt-border-strong)]">·</span>
              <span>{t("factC")}</span>
              <span className="text-[var(--vt-border-strong)]">·</span>
              <a
                href={siteConfig.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-[var(--vt-fg-2)] hover:underline"
              >
                MIT licensed
              </a>
            </div>
          </div>

          {/* Right — interactive demo */}
          <DemoCard phrases={phrases} />
        </div>
      </Container>
    </section>
  )
}

function DemoCard({ phrases }: { phrases: string[] }) {
  const t = useTranslations("home.hero")
  return (
    <div
      className="vt-anim-fade-up relative rounded-[16px] border border-[var(--vt-border)] overflow-hidden"
      style={{
        background: "var(--vt-panel-2)",
        boxShadow: "var(--vt-shadow-elevated)",
      }}
    >
      {/* Top bar — fake window chrome with target app label */}
      <div
        className="flex items-center gap-2.5 border-b border-[var(--vt-border)] px-4 py-2.5"
        style={{ background: "var(--vt-panel)" }}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.55_0.13_25)] opacity-70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.14_75)] opacity-70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.74_0.14_150)] opacity-70" />
        </div>
        <div className="flex-1 truncate">
          <span className="vt-mono text-[11px] text-[var(--vt-fg-4)]">
            {t("demoTargetLabel")}
          </span>
        </div>
        <span
          className="vt-mono inline-flex items-center gap-1.5 rounded-full border px-2 py-[2px] text-[10px]"
          style={{
            background: "oklch(from var(--vt-danger) l c h / 0.16)",
            color: "var(--vt-danger)",
            borderColor: "oklch(from var(--vt-danger) l c h / 0.4)",
          }}
        >
          <span
            className="vt-anim-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--vt-danger)" }}
          />
          {t("demoStatusRec")}
        </span>
      </div>

      {/* Editor body — caret typing */}
      <div className="px-6 py-7 sm:px-8 sm:py-9 min-h-[180px]">
        <div className="vt-display text-[18px] sm:text-[20px] leading-[1.55] text-[var(--vt-fg-2)] tracking-[-0.005em]">
          <AnimatedCaret
            phrases={phrases}
            textClassName="text-[var(--vt-fg)]"
          />
        </div>
      </div>

      {/* Bottom bar — hotkey + waveform */}
      <div
        className="flex items-center gap-4 border-t border-[var(--vt-border)] px-4 py-3"
        style={{ background: "var(--vt-panel)" }}
      >
        <HotkeyChord keys={["Hold", "F8"]} />
        <div className="flex-1 h-7 overflow-hidden">
          <WaveformLive bars={36} className="h-full" />
        </div>
        <span className="vt-mono text-[10.5px] tabular-nums text-[var(--vt-fg-4)]">
          00:12
        </span>
      </div>

      {/* Caption under card */}
      <span className="absolute -bottom-7 left-0 right-0 text-center vt-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--vt-fg-4)]">
        {t("demoCaption")}
      </span>
    </div>
  )
}
