import { cache } from "react"

export interface SharedNote {
  title: string
  contentHtml: string
  updatedAt: string
}

export type ShareViewResult =
  | { status: "ok"; note: SharedNote }
  | { status: "not_found" }
  | { status: "error" }

const SLUG_RE = /^[0-9A-Za-z]{16}$/

export function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug)
}

/**
 * Server-side fetch of a shared note via the Supabase `share-view` Edge Function.
 * Runs on the server (not the browser) so it is not subject to the function's
 * CORS allow-list — that matters for local dev on :3000. The publishable key is
 * a public client key by design; it is read from a server-only env var.
 *
 * Wrapped in React `cache()` so `generateMetadata` and the page render share a
 * single network call per request.
 */
export const fetchSharedNote = cache(
  async (slug: string): Promise<ShareViewResult> => {
    // Format validation is independent of the backend — a malformed slug is
    // "not found" whether or not Supabase is reachable. Checked first so this
    // path stays deterministic without env (e.g. in CI).
    if (!isValidSlug(slug)) return { status: "not_found" }

    const base = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_PUBLISHABLE_KEY
    if (!base || !key) {
      console.error(
        "[share-view] missing SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY env var"
      )
      return { status: "error" }
    }

    try {
      const res = await fetch(
        `${base.replace(/\/$/, "")}/functions/v1/share-view?s=${encodeURIComponent(slug)}`,
        { headers: { apikey: key }, cache: "no-store" }
      )
      if (res.status === 200) {
        const note = (await res.json()) as SharedNote
        return { status: "ok", note }
      }
      // 400 (invalid slug) and 404 (unknown/revoked/deleted) are both a neutral
      // "not found" to the visitor — no oracle for enumeration.
      if (res.status === 400 || res.status === 404) return { status: "not_found" }
      return { status: "error" }
    } catch (e) {
      console.error("[share-view] fetch failed", e)
      return { status: "error" }
    }
  }
)
