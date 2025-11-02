import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export default function GettingStartedPage() {
  const t = useTranslations("docs.gettingStarted")

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground mb-8">
          Commencez à utiliser Voice Tool en quelques minutes seulement. Ce guide vous accompagne pas à pas, du téléchargement à votre première transcription.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Prérequis</h2>
        <ul className="space-y-2 ml-6 list-disc">
          <li><strong>Système d&apos;exploitation</strong> : Windows 10 ou supérieur</li>
          <li><strong>Espace disque</strong> : Au moins 100 MB d&apos;espace libre</li>
          <li><strong>Clé API OpenAI</strong> : Nécessaire pour utiliser la transcription (gratuite jusqu&apos;à un certain quota)</li>
          <li><strong>Microphone</strong> : Un microphone fonctionnel pour enregistrer votre voix</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Étape 1 : Téléchargement</h2>
        <p className="mb-4">
          Rendez-vous sur la <Link href="/download" className="text-primary hover:underline">page de téléchargement</Link> et choisissez le type d&apos;installation qui vous convient :
        </p>
        <div className="grid gap-4 md:grid-cols-2 my-6">
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold mb-2">Installateur NSIS (recommandé)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Installation classique avec assistant, raccourcis automatiques et désinstallation facile.
            </p>
            <ul className="text-sm space-y-1 ml-4 list-disc text-muted-foreground">
              <li>Fichier : <code>Voice-Tool_X.X.X_x64-setup.exe</code></li>
              <li>Taille : ~50-80 MB</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="font-semibold mb-2">Version portable</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Utilisation sans installation, idéale pour clé USB ou ordinateur non-administrateur.
            </p>
            <ul className="text-sm space-y-1 ml-4 list-disc text-muted-foreground">
              <li>Fichier : <code>Voice-Tool_X.X.X_x64.exe</code></li>
              <li>Taille : ~50-80 MB</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Étape 2 : Installation</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Avec l&apos;installateur NSIS</h3>
        <ol className="space-y-3 ml-6 list-decimal">
          <li>Double-cliquez sur le fichier <code>Voice-Tool_X.X.X_x64-setup.exe</code> téléchargé</li>
          <li>Si Windows Defender SmartScreen apparaît, cliquez sur <strong>&quot;Plus d&apos;infos&quot;</strong> puis <strong>&quot;Exécuter quand même&quot;</strong></li>
          <li>Suivez l&apos;assistant d&apos;installation :
            <ul className="ml-6 list-disc mt-2 space-y-1">
              <li>Acceptez les termes de la licence</li>
              <li>Choisissez le dossier d&apos;installation (par défaut : <code>C:\Program Files\Voice Tool</code>)</li>
              <li>Sélectionnez les options souhaitées (raccourci bureau, menu démarrer)</li>
            </ul>
          </li>
          <li>Cliquez sur <strong>&quot;Installer&quot;</strong> et attendez la fin de l&apos;installation</li>
          <li>Cochez <strong>&quot;Lancer Voice Tool&quot;</strong> et cliquez sur <strong>&quot;Terminer&quot;</strong></li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">Avec la version portable</h3>
        <ol className="space-y-3 ml-6 list-decimal">
          <li>Créez un dossier pour Voice Tool (exemple : <code>C:\VoiceTool</code> ou sur votre clé USB)</li>
          <li>Déplacez le fichier <code>Voice-Tool_X.X.X_x64.exe</code> dans ce dossier</li>
          <li>Double-cliquez sur le fichier pour lancer Voice Tool</li>
          <li>Si Windows Defender SmartScreen apparaît, cliquez sur <strong>&quot;Plus d&apos;infos&quot;</strong> puis <strong>&quot;Exécuter quand même&quot;</strong></li>
        </ol>

        <div className="bg-muted/50 border border-border rounded-lg p-4 my-6">
          <p className="text-sm">
            <strong>💡 Astuce :</strong> Pour la version portable, vous pouvez créer un raccourci sur votre bureau en faisant un clic droit sur l&apos;exe → <strong>&quot;Envoyer vers&quot;</strong> → <strong>&quot;Bureau (créer un raccourci)&quot;</strong>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Étape 3 : Configuration de la clé API</h2>
        <p className="mb-4">
          Voice Tool nécessite une clé API OpenAI pour fonctionner. Voici comment l&apos;obtenir et la configurer :
        </p>
        <ol className="space-y-3 ml-6 list-decimal">
          <li>Rendez-vous sur <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com/signup</a> et créez un compte (gratuit)</li>
          <li>Une fois connecté, accédez à <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">API Keys</a></li>
          <li>Cliquez sur <strong>&quot;Create new secret key&quot;</strong></li>
          <li>Donnez un nom à votre clé (exemple : &quot;Voice Tool&quot;) et cliquez sur <strong>&quot;Create secret key&quot;</strong></li>
          <li>Copiez la clé générée (elle commence par <code>sk-...</code>) ⚠️ <em>Vous ne pourrez plus la voir après !</em></li>
          <li>Dans Voice Tool, cliquez sur l&apos;icône <strong>paramètres ⚙️</strong> (en haut à droite)</li>
          <li>Collez votre clé API dans le champ <strong>&quot;OpenAI API Key&quot;</strong></li>
          <li>Cliquez sur <strong>&quot;Sauvegarder&quot;</strong></li>
        </ol>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 my-6">
          <p className="text-sm">
            <strong>⚠️ Important :</strong> Ne partagez jamais votre clé API avec qui que ce soit. Elle donne accès à votre compte OpenAI et peut engendrer des frais si vous dépassez le quota gratuit.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Étape 4 : Premier enregistrement</h2>
        <p className="mb-4">
          Vous êtes maintenant prêt à effectuer votre première transcription !
        </p>
        <ol className="space-y-3 ml-6 list-decimal">
          <li>Vérifiez que votre microphone est bien connecté et configuré dans Windows</li>
          <li>Dans Voice Tool, le raccourci par défaut est <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">Ctrl + Shift + Space</kbd></li>
          <li>Appuyez sur ce raccourci pour <strong>commencer l&apos;enregistrement</strong></li>
          <li>Une mini fenêtre apparaît avec la visualisation audio en temps réel</li>
          <li>Parlez clairement dans votre microphone</li>
          <li>Appuyez à nouveau sur le raccourci pour <strong>arrêter l&apos;enregistrement</strong></li>
          <li>La transcription apparaît automatiquement et le texte est copié dans votre presse-papiers</li>
          <li>Collez le texte transcrit où vous le souhaitez avec <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">Ctrl + V</kbd></li>
        </ol>

        <h2 className="text-2xl font-semibold mt-12 mb-4">Prochaines étapes</h2>
        <div className="grid gap-4 md:grid-cols-2 my-6">
          <Link
            href="/docs/configuration"
            className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-2">⚙️ Configuration avancée</h3>
            <p className="text-sm text-muted-foreground">
              Personnalisez les raccourcis clavier, choisissez le modèle Whisper et ajustez les paramètres de transcription.
            </p>
          </Link>

          <a
            href="#troubleshooting"
            className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <h3 className="font-semibold mb-2">🔧 Dépannage</h3>
            <p className="text-sm text-muted-foreground">
              Solutions aux problèmes courants : microphone non détecté, erreurs API, qualité de transcription.
            </p>
          </a>
        </div>

        <h2 id="troubleshooting" className="text-2xl font-semibold mt-12 mb-4 scroll-mt-20">Problèmes courants</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">❌ &quot;API Key invalide&quot;</h3>
        <ul className="space-y-2 ml-6 list-disc">
          <li>Vérifiez que vous avez bien copié la clé complète (elle commence par <code>sk-...</code>)</li>
          <li>Assurez-vous qu&apos;il n&apos;y a pas d&apos;espaces avant ou après la clé</li>
          <li>Vérifiez que votre clé n&apos;a pas été révoquée sur <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com</a></li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">🎤 Microphone non détecté</h3>
        <ul className="space-y-2 ml-6 list-disc">
          <li>Vérifiez que votre microphone est bien branché</li>
          <li>Dans Windows, allez dans <strong>Paramètres → Système → Son</strong> et sélectionnez le bon microphone</li>
          <li>Testez votre microphone dans Windows pour vérifier qu&apos;il fonctionne</li>
          <li>Redémarrez Voice Tool après avoir changé de microphone</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">📝 Transcription de mauvaise qualité</h3>
        <ul className="space-y-2 ml-6 list-disc">
          <li>Parlez plus lentement et articulez davantage</li>
          <li>Rapprochez-vous du microphone (distance idéale : 15-30 cm)</li>
          <li>Réduisez le bruit ambiant (fermez les fenêtres, éteignez la ventilation)</li>
          <li>Dans les paramètres, essayez un modèle Whisper plus performant (medium ou large)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">⚡ Les raccourcis clavier ne fonctionnent pas</h3>
        <ul className="space-y-2 ml-6 list-disc">
          <li>Vérifiez qu&apos;aucune autre application n&apos;utilise le même raccourci</li>
          <li>Redémarrez Voice Tool en tant qu&apos;administrateur (clic droit → <strong>&quot;Exécuter en tant qu&apos;administrateur&quot;</strong>)</li>
          <li>Changez le raccourci dans les paramètres pour éviter les conflits</li>
        </ul>

        <div className="bg-muted/50 border border-border rounded-lg p-6 my-8">
          <h3 className="font-semibold mb-2">Besoin d&apos;aide ?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Si vous rencontrez d&apos;autres problèmes, consultez notre <Link href="/docs" className="text-primary hover:underline">documentation complète</Link> ou ouvrez une issue sur <a href="https://github.com/Nolyo/voice-tool/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>.
          </p>
        </div>

        {/* Footer navigation */}
        <div className="mt-16 pt-8 border-t">
          <div className="flex justify-between">
            <Link
              href="/docs"
              className="text-primary hover:underline"
            >
              ← Documentation
            </Link>
            <Link
              href="/docs/configuration"
              className="text-primary hover:underline"
            >
              Configuration →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
