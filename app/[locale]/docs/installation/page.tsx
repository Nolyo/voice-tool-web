import { useTranslations } from "next-intl"

export default function InstallationPage() {
  const t = useTranslations("docs.installation")

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
      <p>Hello World</p>
    </div>
  )
}
