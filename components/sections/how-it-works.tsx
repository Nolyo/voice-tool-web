import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"

interface Step {
  kicker: string
  title: string
  body: string
}

export function HowItWorks() {
  const t = useTranslations("home.steps")
  const items = t.raw("items") as Step[]

  return (
    <Section spacing="lg" className="border-t border-[var(--vt-border)]">
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div className="space-y-4">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="vt-display text-[32px] sm:text-[40px] font-semibold tracking-[-0.015em] leading-[1.1] text-[var(--vt-fg)]">
              {t("heading")}
            </h2>
            <p className="text-[15px] leading-[1.6] text-[var(--vt-fg-2)] max-w-md">
              {t("subhead")}
            </p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[14px] border border-[var(--vt-border)] sm:grid-cols-3 bg-[var(--vt-border)]">
            {items.map((step, i) => (
              <li
                key={i}
                className="flex flex-col gap-4 p-6 sm:p-7"
                style={{ background: "var(--vt-panel-2)" }}
              >
                <span
                  className="vt-mono text-[14px] font-semibold tabular-nums"
                  style={{ color: "var(--vt-accent-2)" }}
                >
                  0{step.kicker}
                  <span
                    className="vt-mono ml-2 text-[10.5px] uppercase tracking-[0.1em]"
                    style={{ color: "var(--vt-fg-4)" }}
                  >
                    /
                    {String(items.length).padStart(2, "0")}
                  </span>
                </span>
                <h3 className="vt-display text-[17px] sm:text-[19px] font-semibold leading-[1.25] tracking-[-0.005em] text-[var(--vt-fg)]">
                  {step.title}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-[var(--vt-fg-3)]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
