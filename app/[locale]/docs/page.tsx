// import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export default function DocsPage() {
  // const t = useTranslations("docs")

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Documentation Voice Tool</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-8">
          Bienvenue dans la documentation de Voice Tool. Transcription vocale en temps réel avec l&apos;IA.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Démarrage rapide</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/download"
            className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-2">Installation</h3>
            <p className="text-sm text-muted-foreground">
              Téléchargez et installez Voice Tool sur Windows, Linux ou macOS
            </p>
          </Link>

          <div className="block p-6 rounded-lg border border-border">
            <h3 className="font-semibold mb-2">Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Configurez votre clé API OpenAI et vos raccourcis clavier
            </p>
          </div>

          <div className="block p-6 rounded-lg border border-border">
            <h3 className="font-semibold mb-2">Utilisation</h3>
            <p className="text-sm text-muted-foreground">
              Enregistrez votre voix et obtenez une transcription instantanée
            </p>
          </div>

          <div className="block p-6 rounded-lg border border-border">
            <h3 className="font-semibold mb-2">API Reference</h3>
            <p className="text-sm text-muted-foreground">
              Documentation technique pour les développeurs
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Fonctionnalités</h2>
        <ul className="space-y-2">
          <li>✅ Transcription vocale en temps réel avec OpenAI Whisper</li>
          <li>✅ Visualisation audio en direct</li>
          <li>✅ Raccourcis clavier globaux</li>
          <li>✅ Collage automatique du texte transcrit</li>
          <li>✅ Historique complet des transcriptions</li>
          <li>✅ Interface moderne avec Tauri + React</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Configuration requise</h2>
        <ul className="space-y-2">
          <li><strong>Windows</strong> : Windows 10 ou supérieur</li>
          <li><strong>Linux</strong> : Distribution moderne (à venir)</li>
          <li><strong>macOS</strong> : macOS 11 ou supérieur (à venir)</li>
          <li><strong>Clé API</strong> : Clé API OpenAI pour Whisper</li>
        </ul>
      </div>
    </div>
  )
}
