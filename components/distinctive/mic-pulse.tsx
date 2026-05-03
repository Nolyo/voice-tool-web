import { cn } from "@/lib/utils"

interface MicPulseProps {
  /** Diameter in px. */
  size?: number
  /** State — "rec" (red), "idle" (accent). */
  state?: "rec" | "idle"
  className?: string
}

export function MicPulse({ size = 88, state = "rec", className }: MicPulseProps) {
  const isRec = state === "rec"
  const colorVar = isRec ? "--vt-danger" : "--vt-accent"
  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size + 56, height: size + 56 }}
      aria-hidden
    >
      {/* Outer pulse ring */}
      <span
        className="vt-anim-pulse-ring absolute rounded-full border-2"
        style={{
          width: size,
          height: size,
          borderColor: `oklch(from var(${colorVar}) l c h / 0.5)`,
        }}
      />
      {/* Glow halo */}
      <span
        className="absolute rounded-full"
        style={{
          width: size + 24,
          height: size + 24,
          background: `radial-gradient(closest-side, oklch(from var(${colorVar}) l c h / 0.18), transparent 70%)`,
        }}
      />
      {/* Mic button */}
      <span
        className="relative grid place-items-center rounded-full border"
        style={{
          width: size,
          height: size,
          background: `oklch(from var(${colorVar}) l c h / 0.16)`,
          color: `var(${colorVar})`,
          borderColor: `oklch(from var(${colorVar}) l c h / 0.55)`,
          boxShadow: `0 0 32px oklch(from var(${colorVar}) l c h / 0.35)`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          width={size * 0.4}
          height={size * 0.4}
        >
          <rect x="9" y="2" width="6" height="13" rx="3" />
          <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
          <path d="M12 19v3" />
        </svg>
      </span>
    </div>
  )
}
