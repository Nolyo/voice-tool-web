import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Inter, JetBrains_Mono } from "next/font/google"
import "../globals.css"
import "./share.css"

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})

// Standalone root layout for the public share page. It lives OUTSIDE the
// `[locale]` segment (the share URL `lexena.app/s/<slug>` carries no locale),
// so it provides its own <html>/<body> and does not depend on next-intl.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ShareLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${geist.variable} ${inter.variable} ${jetbrainsMono.variable} vt-app antialiased`}
      >
        <Script
          defer
          data-website-id="90968d31-bdc6-4bb1-927f-1cb0aaaa8769"
          src="https://umami.yohann-jaffres.fr/script.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  )
}
