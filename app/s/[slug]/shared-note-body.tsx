"use client"

import { useEffect, useRef } from "react"

/**
 * Renders the shared note's HTML. Sanitization happens in the BROWSER via
 * `renderSharedNoteHtml` (DOMParser + DOMPurify) — the XSS boundary. The server
 * passes the raw HTML as a prop and never injects it into the DOM itself.
 *
 * `render-html` is imported dynamically inside the effect so its module (which
 * registers a DOMPurify hook at load and needs a real DOM) is evaluated only in
 * the browser, never during SSR module evaluation of this client component.
 */
export function SharedNoteBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    import("@/lib/sharing/render-html").then(({ renderSharedNoteHtml }) => {
      if (cancelled) return
      const el = ref.current
      if (el) {
        el.innerHTML = renderSharedNoteHtml(html)
        el.setAttribute("aria-busy", "false")
      }
    })
    return () => {
      cancelled = true
    }
  }, [html])

  return (
    <div ref={ref} className="note-body" aria-busy suppressHydrationWarning />
  )
}
