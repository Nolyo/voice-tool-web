import { ImageResponse } from "next/og"
import { siteConfig, type Locale } from "@/lib/site-config"
import enMessages from "@/messages/en.json"
import frMessages from "@/messages/fr.json"

export const runtime = "nodejs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Lexena — voice dictation for Windows"

const MESSAGES: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages as typeof enMessages,
}

// Hex equivalents of the design-system tokens (Satori does not parse oklch).
const TOKENS = {
  bg: "#13161d",
  border: "#2b2f3a",
  fg: "#f3f4f6",
  fg4: "#5a6172",
  accent: "#2eb291",
  accentBorder: "rgba(46, 178, 145, 0.55)",
  accentSoft: "rgba(46, 178, 145, 0.18)",
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = (
    siteConfig.locales as readonly string[]
  ).includes(rawLocale)
    ? (rawLocale as Locale)
    : siteConfig.defaultLocale
  const m = MESSAGES[locale]
  const og = m.home.og
  const eyebrow = m.home.hero.eyebrow

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: TOKENS.bg,
          color: TOKENS.fg,
          padding: "72px 80px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 14,
                background: TOKENS.accent,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 38,
                fontWeight: 700,
              }}
            >
              L
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: TOKENS.fg,
                }}
              >
                Lexena
              </div>
              <div
                style={{
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: TOKENS.fg4,
                  fontFamily: "monospace",
                }}
              >
                {og.subtitle}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              background: TOKENS.accentSoft,
              color: TOKENS.accent,
              border: `1px solid ${TOKENS.accentBorder}`,
              fontSize: 14,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: TOKENS.accent,
              }}
            />
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            marginTop: 80,
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: TOKENS.fg,
            }}
          >
            {og.line1}
          </div>
          <div
            style={{
              fontSize: 100,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: TOKENS.accent,
              marginTop: 4,
            }}
          >
            {og.line2}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: "auto",
            paddingTop: 32,
            borderTop: `1px solid ${TOKENS.border}`,
            color: TOKENS.fg4,
            fontSize: 16,
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <span>{og.factLocal}</span>
          <span>·</span>
          <span>{og.factOpenSource}</span>
          <span>·</span>
          <span>github.com/Nolyo/lexena</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
