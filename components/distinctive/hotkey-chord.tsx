import { cn } from "@/lib/utils"

interface HotkeyChordProps {
  /** Keys to render, e.g. ["Ctrl", "Alt", "Space"] */
  keys: string[]
  /** Optional small leading label. */
  label?: string
  size?: "sm" | "md"
  className?: string
}

export function HotkeyChord({
  keys,
  label,
  size = "md",
  className,
}: HotkeyChordProps) {
  const sizeClass =
    size === "sm" ? "text-[10px] px-1.5 py-[2px]" : "text-[11px] px-2 py-[3px]"
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 vt-mono", className)}
    >
      {label ? (
        <span className="text-[var(--vt-fg-3)] not-italic font-sans text-[12px] mr-1">
          {label}
        </span>
      ) : null}
      {keys.map((k, i) => (
        <span key={`${k}-${i}`} className="inline-flex items-center gap-1.5">
          <kbd
            className={cn(
              "rounded-[4px] border border-[var(--vt-border)] border-b-2 bg-[var(--vt-hover)] text-[var(--vt-fg-2)] leading-none",
              sizeClass,
            )}
          >
            {k}
          </kbd>
          {i < keys.length - 1 ? (
            <span className="text-[var(--vt-fg-4)] text-[10px]">+</span>
          ) : null}
        </span>
      ))}
    </span>
  )
}
