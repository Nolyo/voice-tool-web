import { cn } from "@/lib/utils"

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Optional accent dot prefix. */
  withDot?: boolean
  /** Override text color, e.g. for a colored eyebrow. */
  tone?: "default" | "accent" | "violet" | "warn" | "ok"
}

const toneMap = {
  default: "text-[var(--vt-fg-4)]",
  accent: "text-[var(--vt-accent-2)]",
  violet: "text-[var(--vt-violet)]",
  warn: "text-[var(--vt-warn)]",
  ok: "text-[var(--vt-ok)]",
}

const dotColorMap = {
  default: "bg-[var(--vt-fg-4)]",
  accent: "bg-[var(--vt-accent)]",
  violet: "bg-[var(--vt-violet)]",
  warn: "bg-[var(--vt-warn)]",
  ok: "bg-[var(--vt-ok)]",
}

export function Eyebrow({
  withDot = false,
  tone = "default",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
        toneMap[tone],
        className,
      )}
      {...props}
    >
      {withDot ? (
        <span
          aria-hidden
          className={cn("inline-block h-1.5 w-1.5 rounded-full", dotColorMap[tone])}
        />
      ) : null}
      {children}
    </span>
  )
}
