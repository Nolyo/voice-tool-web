import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"
import { MediaWithCaption } from "@/components/layout/media-with-caption"
import { AppFrameMock } from "@/components/distinctive/app-frame-mock"
import { ArrowRight } from "lucide-react"

export function FlagshipFeatures() {
  const t = useTranslations("home.flagship")

  return (
    <Section spacing="lg" className="border-t border-[var(--vt-border)]">
      <Container size="lg">
        <div className="mb-14 max-w-2xl space-y-3">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="vt-display text-[32px] sm:text-[40px] font-semibold tracking-[-0.015em] leading-[1.1] text-[var(--vt-fg)]">
            {t("heading")}
          </h2>
          <p className="text-[15px] leading-[1.6] text-[var(--vt-fg-2)]">
            {t("subhead")}
          </p>
        </div>

        <div className="space-y-20 lg:space-y-28">
          <MediaWithCaption
            eyebrow={
              <Eyebrow tone="ok" withDot>
                {t("items.local.eyebrow")}
              </Eyebrow>
            }
            title={t("items.local.title")}
            body={t("items.local.body")}
            facts={
              <>
                <span>{t("items.local.factA")}</span>
                <span className="text-[var(--vt-border-strong)]">·</span>
                <span>{t("items.local.factB")}</span>
                <span className="text-[var(--vt-border-strong)]">·</span>
                <span>{t("items.local.factC")}</span>
              </>
            }
            media={<LocalMock />}
          />
          <MediaWithCaption
            reverse
            eyebrow={
              <Eyebrow tone="violet" withDot>
                {t("items.ai.eyebrow")}
              </Eyebrow>
            }
            title={t("items.ai.title")}
            body={t("items.ai.body")}
            facts={
              <>
                <span>{t("items.ai.factA")}</span>
                <span className="text-[var(--vt-border-strong)]">·</span>
                <span>{t("items.ai.factB")}</span>
                <span className="text-[var(--vt-border-strong)]">·</span>
                <span>{t("items.ai.factC")}</span>
              </>
            }
            media={<AiMock />}
          />
          <MediaWithCaption
            eyebrow={
              <Eyebrow tone="accent" withDot>
                {t("items.notes.eyebrow")}
              </Eyebrow>
            }
            title={t("items.notes.title")}
            body={t("items.notes.body")}
            facts={
              <>
                <span>{t("items.notes.factA")}</span>
                <span className="text-[var(--vt-border-strong)]">·</span>
                <span>{t("items.notes.factB")}</span>
                <span className="text-[var(--vt-border-strong)]">·</span>
                <span>{t("items.notes.factC")}</span>
              </>
            }
            media={<AppFrameMock className="" />}
          />
          <MediaWithCaption
            reverse
            eyebrow={
              <Eyebrow tone="warn" withDot>
                {t("items.profiles.eyebrow")}
              </Eyebrow>
            }
            title={t("items.profiles.title")}
            body={t("items.profiles.body")}
            facts={
              <>
                <span>{t("items.profiles.factA")}</span>
                <span className="text-[var(--vt-border-strong)]">·</span>
                <span>{t("items.profiles.factB")}</span>
                <span className="text-[var(--vt-border-strong)]">·</span>
                <span>{t("items.profiles.factC")}</span>
              </>
            }
            media={<ProfilesMock />}
          />
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 vt-mono text-[12px] uppercase tracking-[0.08em] text-[var(--vt-accent-2)] hover:text-[var(--vt-fg)] transition-colors"
          >
            {t("ctaLabel")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </Section>
  )
}

function LocalMock() {
  return (
    <div
      className="rounded-[16px] border border-[var(--vt-border)] p-8 sm:p-10"
      style={{
        background: "var(--vt-panel-2)",
        boxShadow: "var(--vt-shadow-elevated)",
      }}
    >
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[12px] border border-[var(--vt-border)] bg-[var(--vt-border)]">
        {[
          { label: "Coût mensuel", value: "0 €", tone: "ok" },
          { label: "Latence", value: "0,3 s", tone: "ok" },
          { label: "Données externes", value: "—", tone: "fg-4" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 p-5"
            style={{ background: "var(--vt-panel)" }}
          >
            <span className="vt-mono text-[10px] uppercase tracking-[0.1em] text-[var(--vt-fg-4)]">
              {stat.label}
            </span>
            <span
              className="vt-mono text-[28px] font-semibold tabular-nums"
              style={{
                color: stat.tone === "ok" ? "var(--vt-ok)" : "var(--vt-fg-2)",
              }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        {["Vulkan · GPU", "CPU fallback", "Modèle large multilingue"].map(
          (line, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[13px]">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--vt-ok)" }}
              />
              <span className="text-[var(--vt-fg-2)]">{line}</span>
            </div>
          ),
        )}
      </div>
    </div>
  )
}

function AiMock() {
  return (
    <div
      className="rounded-[16px] border border-[var(--vt-border)] overflow-hidden"
      style={{
        background: "var(--vt-panel-2)",
        boxShadow: "var(--vt-shadow-elevated)",
      }}
    >
      <div
        className="flex items-center gap-2.5 px-5 py-3 border-b border-[var(--vt-border)]"
        style={{ background: "var(--vt-panel)" }}
      >
        <span className="vt-mono text-[10.5px] uppercase tracking-[0.1em] text-[var(--vt-fg-4)]">
          Post-process · Mode mail
        </span>
        <span
          className="vt-mono ml-auto text-[10.5px] tabular-nums text-[var(--vt-fg-4)]"
        >
          $0.0021 · 12s
        </span>
      </div>
      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--vt-border)]">
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="vt-mono text-[10px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
              Brut
            </span>
          </div>
          <p className="text-[13px] leading-[1.6] text-[var(--vt-fg-3)]">
            « euh oui Marc je voulais te dire que le truc dont on a parlé hier
            c&apos;est ok pour moi on peut y aller dis-moi quand »
          </p>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span
              className="vt-mono text-[10px] uppercase tracking-[0.08em]"
              style={{ color: "var(--vt-violet)" }}
            >
              Reformulé
            </span>
          </div>
          <p className="text-[13px] leading-[1.65] text-[var(--vt-fg)]">
            Bonjour Marc, je donne mon accord sur le sujet évoqué hier.
            Indique-moi quand tu souhaites avancer.
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-2 px-5 py-3 border-t border-[var(--vt-border)]"
        style={{ background: "var(--vt-panel)" }}
      >
        {["Auto", "Mail", "Formel", "Casual", "Liste", "Résumé"].map((m, i) => (
          <span
            key={i}
            className="vt-mono inline-flex items-center rounded-full border px-2 py-[2px] text-[10px]"
            style={{
              background:
                m === "Mail"
                  ? "var(--vt-violet-soft)"
                  : "var(--vt-hover)",
              color:
                m === "Mail"
                  ? "var(--vt-violet)"
                  : "var(--vt-fg-3)",
              borderColor:
                m === "Mail"
                  ? "oklch(from var(--vt-violet) l c h / 0.4)"
                  : "var(--vt-border)",
            }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProfilesMock() {
  return (
    <div
      className="rounded-[16px] border border-[var(--vt-border)] p-7"
      style={{
        background: "var(--vt-panel-2)",
        boxShadow: "var(--vt-shadow-elevated)",
      }}
    >
      <div className="flex flex-col gap-3">
        <ProfileRow
          tag="Perso"
          tone="warn"
          notes={42}
          today="3 dictées · 18 min"
          active={false}
        />
        <ProfileRow
          tag="Pro"
          tone="accent"
          notes={184}
          today="12 dictées · 1h 04 min"
          active
        />
      </div>
      <div
        className="mt-6 flex items-center gap-2 vt-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)] border-t border-[var(--vt-border)] pt-4"
      >
        <span
          className="inline-flex items-center gap-1 rounded-[4px] border border-[var(--vt-border)] border-b-2 bg-[var(--vt-hover)] px-1.5 py-[2px] text-[10px] text-[var(--vt-fg-2)]"
        >
          Ctrl
        </span>
        <span>+</span>
        <span
          className="inline-flex items-center gap-1 rounded-[4px] border border-[var(--vt-border)] border-b-2 bg-[var(--vt-hover)] px-1.5 py-[2px] text-[10px] text-[var(--vt-fg-2)]"
        >
          Shift
        </span>
        <span>+</span>
        <span
          className="inline-flex items-center gap-1 rounded-[4px] border border-[var(--vt-border)] border-b-2 bg-[var(--vt-hover)] px-1.5 py-[2px] text-[10px] text-[var(--vt-fg-2)]"
        >
          P
        </span>
        <span className="ml-2">Bascule profil</span>
      </div>
    </div>
  )
}

function ProfileRow({
  tag,
  tone,
  notes,
  today,
  active,
}: {
  tag: string
  tone: "warn" | "accent"
  notes: number
  today: string
  active: boolean
}) {
  const colorVar = tone === "warn" ? "--vt-warn" : "--vt-accent"
  // Brighter foreground for text-on-soft-tint to clear WCAG AA.
  const fgVar = tone === "warn" ? "--vt-warn" : "--vt-accent-2"
  return (
    <div
      className="flex items-center gap-3 rounded-[10px] border p-4 transition-colors"
      style={{
        background: active
          ? `oklch(from var(${colorVar}) l c h / 0.09)`
          : "var(--vt-panel)",
        borderColor: active
          ? `oklch(from var(${colorVar}) l c h / 0.45)`
          : "var(--vt-border)",
        boxShadow: active
          ? `inset 0 0 0 1px oklch(from var(${colorVar}) l c h / 0.25)`
          : undefined,
      }}
    >
      <span
        className="grid h-9 w-9 place-items-center rounded-[10px] vt-mono text-[12px] font-semibold"
        style={{
          background: `oklch(from var(${colorVar}) l c h / 0.16)`,
          color: `var(${fgVar})`,
          border: `1px solid oklch(from var(${colorVar}) l c h / 0.4)`,
        }}
      >
        {tag[0]}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-medium text-[var(--vt-fg)]">
          {tag}
        </div>
        <div className="vt-mono text-[10.5px] tabular-nums text-[var(--vt-fg-4)]">
          {notes} notes · {today}
        </div>
      </div>
      {active ? (
        <span
          className="vt-mono inline-flex items-center gap-1.5 rounded-full border px-2 py-[2px] text-[10px]"
          style={{
            background: `oklch(from var(${colorVar}) l c h / 0.16)`,
            color: `var(${fgVar})`,
            borderColor: `oklch(from var(${colorVar}) l c h / 0.4)`,
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: `var(${colorVar})` }}
          />
          actif
        </span>
      ) : (
        <span className="vt-mono text-[10px] uppercase tracking-[0.08em] text-[var(--vt-fg-4)]">
          dormant
        </span>
      )}
    </div>
  )
}
