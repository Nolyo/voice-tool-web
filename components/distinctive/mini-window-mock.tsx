import { cn } from "@/lib/utils"
import { WaveformLive } from "./waveform-live"

interface MiniWindowMockProps {
  /** Timer string, e.g. "00:14". */
  time?: string
  /** Show post-process pill. */
  postProcess?: boolean
  className?: string
}

/**
 * Recreation of Lexena's frameless floating HUD.
 * Pure markup — no audio. The waveform animates via CSS.
 */
export function MiniWindowMock({
  time = "00:14",
  postProcess = true,
  className,
}: MiniWindowMockProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-[14px] backdrop-blur-md",
        "border border-white/[0.06] px-3.5 py-2.5",
        className,
      )}
      style={{
        background: "rgba(22, 24, 30, 0.92)",
        boxShadow: "var(--vt-shadow-mini)",
      }}
    >
      {/* Recording dot */}
      <span className="relative inline-flex h-2.5 w-2.5">
        <span
          className="vt-anim-pulse-dot absolute inline-flex h-full w-full rounded-full"
          style={{
            background: "var(--vt-danger)",
            boxShadow: "0 0 10px var(--vt-danger)",
          }}
        />
      </span>
      {/* Timer */}
      <span className="vt-mono text-[12px] text-[var(--vt-fg-2)] tabular-nums">
        {time}
      </span>
      {/* Waveform */}
      <div className="h-5 w-32 sm:w-40">
        <WaveformLive bars={20} className="h-full" />
      </div>
      {/* Post-process chip */}
      {postProcess ? (
        <span
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full border px-2 py-[3px] text-[10.5px]"
          style={{
            background: "var(--vt-violet-soft)",
            color: "var(--vt-violet)",
            borderColor: "oklch(from var(--vt-violet) l c h / 0.4)",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.9 5.8L4 11l5.8 1.9L12 19l1.9-5.8L20 11l-5.8-1.9z" />
          </svg>
          AI
        </span>
      ) : null}
    </div>
  )
}
