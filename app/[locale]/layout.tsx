import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Inter, JetBrains_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { buildMetadata } from "@/lib/metadata"
import type { Locale } from "@/lib/site-config"
import "../globals.css"

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    namespace: "home",
    path: "/",
    locale: locale as Locale,
    isLayoutDefault: true,
  })
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${geist.variable} ${inter.variable} ${jetbrainsMono.variable} vt-app antialiased`}
      >
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        <Script
          defer
          data-website-id="90968d31-bdc6-4bb1-927f-1cb0aaaa8769"
          src="https://umami.yohann-jaffres.fr/script.js"
          strategy="afterInteractive"
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
