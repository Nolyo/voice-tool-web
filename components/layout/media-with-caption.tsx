import { cn } from "@/lib/utils"

interface MediaWithCaptionProps {
  media: React.ReactNode
  /** Optional eyebrow over the title. */
  eyebrow?: React.ReactNode
  title: React.ReactNode
  body: React.ReactNode
  /** Reverse → media on the right, copy on the left. */
  reverse?: boolean
  /** Optional fact strip below the body (e.g. "Ctrl+Alt+Space · 0.3s · local"). */
  facts?: React.ReactNode
  className?: string
}

export function MediaWithCaption({
  media,
  eyebrow,
  title,
  body,
  reverse = false,
  facts,
  className,
}: MediaWithCaptionProps) {
  return (
    <div
      className={cn(
        "grid gap-10 lg:gap-16 items-center",
        "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
        reverse ? "lg:[&>*:first-child]:order-2" : "",
        className,
      )}
    >
      <div className="space-y-5 max-w-xl">
        {eyebrow ? <div>{eyebrow}</div> : null}
        <h3 className="vt-display text-[28px] sm:text-[32px] font-semibold leading-[1.15] tracking-[-0.01em] text-[var(--vt-fg)]">
          {title}
        </h3>
        <div className="text-[15px] leading-[1.65] text-[var(--vt-fg-2)]">
          {body}
        </div>
        {facts ? (
          <div className="vt-mono text-[11.5px] text-[var(--vt-fg-4)] flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1">
            {facts}
          </div>
        ) : null}
      </div>
      <div className="relative">{media}</div>
    </div>
  )
}
