"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCaretProps {
  phrases: string[]
  /** ms per character while typing. */
  typeSpeed?: number
  /** ms to hold the full phrase before clearing. */
  holdMs?: number
  /** ms per character while deleting. */
  deleteSpeed?: number
  className?: string
  /** Wraps text styling — defaults to "vt-display" for subtle marketing tone. */
  textClassName?: string
}

/**
 * Loops through phrases with a typing animation + blinking caret.
 * Reduced-motion users see a static phrase (the longest one).
 */
export function AnimatedCaret({
  phrases,
  typeSpeed = 55,
  holdMs = 1500,
  deleteSpeed = 28,
  className,
  textClassName,
}: AnimatedCaretProps) {
  const [reduced, setReduced] = useState(false)
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = () => setReduced(mq.matches)
    handler()
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (reduced) return
    const phrase = phrases[phraseIdx] ?? ""
    let timer: ReturnType<typeof setTimeout> | null = null

    if (phase === "typing") {
      if (charIdx < phrase.length) {
        timer = setTimeout(() => setCharIdx((c) => c + 1), typeSpeed)
      } else {
        timer = setTimeout(() => setPhase("holding"), 50)
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), holdMs)
    } else if (phase === "deleting") {
      if (charIdx > 0) {
        timer = setTimeout(() => setCharIdx((c) => c - 1), deleteSpeed)
      } else {
        timer = setTimeout(() => {
          setPhraseIdx((i) => (i + 1) % phrases.length)
          setPhase("typing")
        }, 200)
      }
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [charIdx, phase, phraseIdx, phrases, typeSpeed, holdMs, deleteSpeed, reduced])

  const longest = phrases.reduce(
    (acc, p) => (p.length > acc.length ? p : acc),
    "",
  )
  const visible = reduced ? longest : phrases[phraseIdx]?.slice(0, charIdx) ?? ""

  return (
    <span className={cn("inline", className)}>
      <span className={cn("text-[var(--vt-fg)]", textClassName)}>
        {visible || " "}
      </span>
      <span className="vt-anim-caret" aria-hidden />
    </span>
  )
}
