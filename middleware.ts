import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // `s/` is excluded so the locale-less public share route `/s/<slug>` is served
  // directly (no next-intl locale redirect to `/en/s/...`).
  matcher: ["/", "/(fr|en)/:path*", "/((?!_next|_vercel|s/|.*\\..*).*)"],
}
