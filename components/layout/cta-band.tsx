import { cn } from "@/lib/utils"

interface CTABandProps {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  body?: React.ReactNode
  primary?: React.ReactNode
  secondary?: React.ReactNode
  className?: string
}

export function CTABand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  className,
}: CTABandProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[16px] border border-[var(--vt-border)] bg-[var(--vt-panel-2)]",
        "px-6 sm:px-12 py-12 sm:py-16",
        className,
      )}
      style={{ boxShadow: "var(--vt-shadow-elevated)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(420px 220px at 80% 0%, oklch(0.7 0.17 264 / 0.16), transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-3">
          {eyebrow ? <div>{eyebrow}</div> : null}
          <h2 className="vt-display text-[28px] sm:text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-[var(--vt-fg)]">
            {title}
          </h2>
          {body ? (
            <p className="text-[15px] leading-[1.65] text-[var(--vt-fg-2)] max-w-xl">
              {body}
            </p>
          ) : null}
        </div>
        {(primary || secondary) ? (
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {primary}
            {secondary}
          </div>
        ) : null}
      </div>
    </div>
  )
}
