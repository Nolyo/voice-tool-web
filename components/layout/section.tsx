import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical rhythm — defaults to "lg" (~6rem). */
  spacing?: "sm" | "md" | "lg"
  /** Optional surface tint via vt-panel for visual rhythm between sections. */
  variant?: "transparent" | "panel" | "flat"
}

const spacingMap = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
}

export function Section({
  spacing = "lg",
  variant = "transparent",
  className,
  children,
  ...props
}: SectionProps) {
  const variantClass =
    variant === "panel"
      ? "bg-[var(--vt-panel)] border-y border-[var(--vt-border)]"
      : variant === "flat"
      ? "border-y border-[var(--vt-border)]"
      : ""
  return (
    <section
      className={cn("relative", spacingMap[spacing], variantClass, className)}
      {...props}
    >
      {children}
    </section>
  )
}
