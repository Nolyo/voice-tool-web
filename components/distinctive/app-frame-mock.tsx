/**
 * Schematic of the Lexena dashboard surface (sidebar / header / content / detail rail).
 * Built from the design system's spacing reference. Used to illustrate the
 * "Notes & second brain" feature without embedding a screenshot.
 */
import { cn } from "@/lib/utils"

interface AppFrameMockProps {
  className?: string
}

export function AppFrameMock({ className }: AppFrameMockProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-[14px]",
        "border border-[var(--vt-border)]",
        className,
      )}
      style={{
        background: "var(--vt-bg)",
        boxShadow: "var(--vt-shadow-elevated)",
      }}
      aria-hidden
    >
      {/* Sidebar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[60px] sm:w-[80px] border-r"
        style={{
          background: "var(--vt-panel)",
          borderColor: "var(--vt-border)",
        }}
      >
        <div className="flex flex-col gap-2 p-2 sm:p-3">
          <div className="h-7 w-7 rounded-md bg-[var(--vt-accent-soft)] border border-[oklch(from_var(--vt-accent)_l_c_h_/_0.4)]" />
          <div className="h-6 w-6 rounded-md bg-[var(--vt-surface)] mt-2" />
          <div className="h-6 w-6 rounded-md bg-[var(--vt-surface)]" />
          <div className="h-6 w-6 rounded-md bg-[var(--vt-surface)]" />
          <div className="h-6 w-6 rounded-md bg-[var(--vt-surface)]" />
        </div>
      </div>

      {/* Header */}
      <div
        className="absolute left-[60px] sm:left-[80px] right-0 top-0 h-[44px] sm:h-[52px] border-b backdrop-blur-sm flex items-center px-4 gap-3"
        style={{
          background: "color-mix(in oklch, var(--vt-panel), transparent 50%)",
          borderColor: "var(--vt-border)",
        }}
      >
        <div className="h-2 w-28 rounded-full bg-[var(--vt-surface-hi)]" />
        <div className="ml-auto flex items-center gap-2">
          <span
            className="vt-mono text-[10px] inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 border"
            style={{
              background: "oklch(from var(--vt-danger) l c h / 0.16)",
              color: "var(--vt-danger)",
              borderColor: "oklch(from var(--vt-danger) l c h / 0.4)",
            }}
          >
            <span
              className="vt-anim-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--vt-danger)" }}
            />
            REC · 00:14
          </span>
        </div>
      </div>

      {/* List rows */}
      <div className="absolute left-[60px] sm:left-[80px] right-[110px] sm:right-[150px] top-[44px] sm:top-[52px] bottom-0 p-3 sm:p-4 space-y-2">
        {/* Day label */}
        <div
          className="vt-mono uppercase tracking-[0.1em] text-[9.5px] text-[var(--vt-fg-4)] pb-1"
        >
          Aujourd&apos;hui
        </div>
        <Row selected />
        <Row violet />
        <Row />
        <Row />
        <div className="vt-mono uppercase tracking-[0.1em] text-[9.5px] text-[var(--vt-fg-4)] pt-2 pb-1">
          Hier
        </div>
        <Row dim />
        <Row dim />
      </div>

      {/* Detail rail */}
      <div
        className="absolute right-0 top-[44px] sm:top-[52px] bottom-0 w-[110px] sm:w-[150px] border-l p-3 sm:p-4 space-y-2.5"
        style={{
          background: "var(--vt-panel)",
          borderColor: "var(--vt-border)",
        }}
      >
        <div
          className="vt-mono text-[9px] uppercase tracking-[0.1em] text-[var(--vt-fg-4)]"
        >
          Detail
        </div>
        <div className="rounded-md bg-[var(--vt-surface)] h-12 sm:h-16" />
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-[var(--vt-surface)]" />
          <div className="h-1.5 w-4/5 rounded-full bg-[var(--vt-surface)]" />
          <div className="h-1.5 w-2/3 rounded-full bg-[var(--vt-surface)]" />
        </div>
        <div className="flex gap-1.5 pt-1.5">
          <div className="h-5 w-10 rounded-md bg-[var(--vt-accent-soft)]" />
          <div className="h-5 w-8 rounded-md bg-[var(--vt-surface)]" />
        </div>
      </div>
    </div>
  )
}

function Row({
  selected = false,
  violet = false,
  dim = false,
}: {
  selected?: boolean
  violet?: boolean
  dim?: boolean
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-[8px] px-2.5 py-2"
      style={{
        background: selected
          ? "oklch(from var(--vt-accent) l c h / 0.09)"
          : "transparent",
        boxShadow: selected
          ? "inset 0 0 0 1px oklch(from var(--vt-accent) l c h / 0.3)"
          : undefined,
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
        style={{
          background: violet
            ? "var(--vt-violet)"
            : selected
              ? "var(--vt-accent)"
              : "var(--vt-fg-4)",
        }}
      />
      <div className="flex-1 space-y-1.5 min-w-0">
        <div
          className="h-1.5 rounded-full"
          style={{
            width: dim ? "55%" : selected ? "85%" : "70%",
            background: dim
              ? "var(--vt-surface)"
              : selected
                ? "var(--vt-fg-2)"
                : "var(--vt-surface-hi)",
            opacity: dim ? 0.6 : 1,
          }}
        />
        <div
          className="h-1 w-1/3 rounded-full bg-[var(--vt-surface)]"
          style={{ opacity: dim ? 0.5 : 1 }}
        />
      </div>
      <span
        className="vt-mono text-[9.5px] text-[var(--vt-fg-4)] shrink-0"
      >
        {selected ? "1m 02s" : violet ? "12s" : "—"}
      </span>
    </div>
  )
}
