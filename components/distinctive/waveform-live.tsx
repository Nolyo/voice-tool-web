import { cn } from "@/lib/utils"

interface WaveformLiveProps {
  /** Number of bars. Defaults to 32. */
  bars?: number
  /** Static silhouette (used implicitly for prefers-reduced-motion). */
  className?: string
  /** Bar color via CSS var name, e.g. "--vt-accent" */
  colorVar?: string
}

/**
 * CSS-only waveform — staggered scaleY animation per bar.
 * Heights are deterministic (sine-derived) so SSR matches.
 */
export function WaveformLive({
  bars = 32,
  className,
  colorVar = "--vt-accent",
}: WaveformLiveProps) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const t = i / Math.max(bars - 1, 1)
    const base = 0.45 + 0.55 * Math.abs(Math.sin(t * Math.PI * 2.3))
    return Math.round(base * 100)
  })

  return (
    <div
      className={cn(
        "flex items-center gap-[3px] h-16",
        className,
      )}
      aria-hidden
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className="vt-anim-wave-bar inline-block w-[3px] rounded-full"
          style={{
            height: `${h}%`,
            background: `var(${colorVar})`,
            animationDelay: `${(i % 8) * 80 + (i % 3) * 30}ms`,
            animationDuration: `${900 + (i % 5) * 110}ms`,
          }}
        />
      ))}
    </div>
  )
}
