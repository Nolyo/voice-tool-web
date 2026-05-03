import { cn } from "@/lib/utils"

interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 2 | 3 | 4
}

const colsMap = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}

export function FeatureGrid({
  cols = 3,
  className,
  children,
  ...props
}: FeatureGridProps) {
  return (
    <div
      className={cn("grid gap-px bg-[var(--vt-border)] overflow-hidden rounded-[14px] border border-[var(--vt-border)]", colsMap[cols], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function FeatureCell({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-[var(--vt-panel-2)] p-6 sm:p-7 transition-colors hover:bg-[var(--vt-surface)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
