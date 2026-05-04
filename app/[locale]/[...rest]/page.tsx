import { notFound } from "next/navigation"

// Catch-all so any unknown sub-path under a valid locale renders the
// branded [locale]/not-found.tsx instead of Next.js's framework default.
export default function CatchAllNotFound() {
  notFound()
}
