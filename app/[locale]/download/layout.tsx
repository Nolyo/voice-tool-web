import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import type { Locale } from "@/lib/site-config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    namespace: "download",
    path: "/download",
    locale: locale as Locale,
  })
}

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
