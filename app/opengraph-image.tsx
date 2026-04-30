import { ImageResponse } from "next/og"

export const runtime = "nodejs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Voice Tool — voice transcription, anywhere, instantly"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          color: "white",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            🎙️
          </div>
          <div style={{ fontSize: "48px", fontWeight: 600 }}>Voice Tool</div>
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          Your voice becomes text, anywhere, instantly.
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255, 255, 255, 0.7)",
            marginTop: "32px",
          }}
        >
          Local · Cloud · Free · Open source
        </div>
      </div>
    ),
    { ...size }
  )
}
