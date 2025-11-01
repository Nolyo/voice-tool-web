import { Link } from "@/i18n/routing"

export default function DocsPage() {
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

              <a
                href="#configuration"
                className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <h3 className="font-semibold mb-2">Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Configurez votre clé API OpenAI et vos raccourcis clavier
                </p>
              </a>

              <a
                href="#usage"
                className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <h3 className="font-semibold mb-2">Utilisation</h3>
                <p className="text-sm text-muted-foreground">
                  Enregistrez votre voix et obtenez une transcription instantanée
                </p>
              </a>

              <a
                href="#api-reference"
                className="block p-6 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <h3 className="font-semibold mb-2">API Reference</h3>
                <p className="text-sm text-muted-foreground">
                  Documentation technique pour les développeurs
                </p>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mt-12 mb-4">Fonctionnalités</h2>
                <ul className="space-y-2">
                  <li>✅ Transcription vocale en temps réel avec OpenAI Whisper</li>
                  <li>✅ Visualisation audio en direct</li>
                  <li>✅ Raccourcis clavier globaux</li>
                  <li>✅ Collage automatique du texte transcrit</li>
                  <li>✅ Historique complet des transcriptions</li>
                  <li>✅ Interface moderne avec Tauri + React</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mt-12 mb-4">Configuration requise</h2>
                <ul className="space-y-2">
                  <li><strong>Windows</strong> : Windows 10 ou supérieur</li>
                  <li><strong>Linux</strong> : Distribution moderne <span className="font-bold underline">(à venir)</span></li>
                  <li><strong>macOS</strong> : macOS 11 ou supérieur <span className="font-bold underline">(à venir)</span></li>
                  <li><strong>Clé API</strong> : Clé API OpenAI pour Whisper</li>
                </ul>
              </div>
            </div>



            {/* Configuration Section */}
            <div id="configuration" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mt-16 mb-6 border-t pt-16">Configuration</h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Clé API OpenAI</h3>
              <p className="mb-4">
                Pour utiliser Voice Tool, vous devez configurer une clé API OpenAI Whisper. Voici comment procéder :
              </p>
              <ol className="space-y-2 ml-6 list-decimal">
                <li>Créez un compte sur <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">platform.openai.com</a></li>
                <li>Accédez à la section API keys</li>
                <li>Créez une nouvelle clé API</li>
                <li>Copiez la clé générée</li>
                <li>Dans Voice Tool, ouvrez les paramètres</li>
                <li>Collez votre clé API dans le champ prévu à cet effet</li>
                <li>Sauvegardez les paramètres</li>
              </ol>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Raccourcis clavier</h3>
              <p className="mb-4">
                Voice Tool offre plusieurs modes d&apos;enregistrement avec des raccourcis personnalisables :
              </p>
              <ul className="space-y-3 ml-6 list-disc">
                <li><strong>Toggle Mode</strong> : Appuyez une fois pour commencer, appuyez à nouveau pour arrêter</li>
                <li><strong>Push-to-Talk</strong> : Maintenez la touche enfoncée pour enregistrer, relâchez pour arrêter</li>
              </ul>
              <p className="mt-4">
                Pour personnaliser vos raccourcis :
              </p>
              <ol className="space-y-2 ml-6 list-decimal mt-2">
                <li>Ouvrez les paramètres de Voice Tool</li>
                <li>Accédez à la section Raccourcis clavier</li>
                <li>Cliquez sur le champ du raccourci à modifier</li>
                <li>Appuyez sur la combinaison de touches souhaitée</li>
                <li>Sauvegardez vos modifications</li>
              </ol>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Paramètres de transcription</h3>
              <p className="mb-4">
                Ajustez les paramètres de transcription selon vos besoins :
              </p>
              <ul className="space-y-3 ml-6 list-disc">
                <li><strong>Langue</strong> : Détection automatique ou sélection manuelle de la langue</li>
                <li><strong>Modèle</strong> : Choisissez entre différents modèles Whisper (tiny, base, small, medium, large)</li>
                <li><strong>Auto-paste</strong> : Activez/désactivez le collage automatique du texte transcrit</li>
                <li><strong>Format de sortie</strong> : Texte brut, JSON, ou SRT</li>
              </ul>
            </div>

            {/* Usage Section */}
            <div id="usage" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mt-16 mb-6 border-t pt-16">Utilisation</h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Premier enregistrement</h3>
              <ol className="space-y-3 ml-6 list-decimal">
                <li>Lancez Voice Tool depuis le menu démarrer ou la barre système</li>
                <li>Vérifiez que votre microphone est correctement configuré</li>
                <li>Utilisez votre raccourci clavier pour commencer l&apos;enregistrement</li>
                <li>Parlez clairement dans votre microphone</li>
                <li>Utilisez à nouveau votre raccourci pour arrêter l&apos;enregistrement</li>
                <li>La transcription s&apos;affiche automatiquement</li>
              </ol>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Visualisation audio</h3>
              <p className="mb-4">
                Pendant l&apos;enregistrement, une mini fenêtre flottante affiche :
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Les niveaux audio en temps réel</li>
                <li>Un indicateur visuel d&apos;enregistrement</li>
                <li>La durée de l&apos;enregistrement</li>
                <li>Le statut de la connexion API</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Historique des transcriptions</h3>
              <p className="mb-4">
                Accédez à toutes vos transcriptions passées :
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Ouvrez la fenêtre principale de Voice Tool</li>
                <li>Consultez la liste de vos enregistrements</li>
                <li>Recherchez par date, texte ou durée</li>
                <li>Rejouez l&apos;audio original</li>
                <li>Copiez ou exportez le texte transcrit</li>
                <li>Supprimez les enregistrements obsolètes</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Bonnes pratiques</h3>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong>Qualité audio</strong> : Utilisez un microphone de qualité dans un environnement calme</li>
                <li><strong>Débit de parole</strong> : Parlez à un rythme normal, ni trop vite ni trop lent</li>
                <li><strong>Articulation</strong> : Articulez clairement pour une meilleure précision</li>
                <li><strong>Pause</strong> : Faites de courtes pauses entre les phrases</li>
                <li><strong>Langue</strong> : Si vous mélangez plusieurs langues, activez la détection automatique</li>
              </ul>
            </div>

            {/* API Reference Section */}
            <div id="api-reference" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mt-16 mb-6 border-t pt-16">API Reference</h2>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Architecture</h3>
              <p className="mb-4">
                Voice Tool est construit avec :
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong>Tauri</strong> : Framework pour applications desktop multi-plateformes</li>
                <li><strong>React</strong> : Interface utilisateur moderne et réactive</li>
                <li><strong>Rust</strong> : Backend performant pour la gestion audio</li>
                <li><strong>OpenAI Whisper API</strong> : Moteur de transcription IA</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Commandes Tauri</h3>
              <p className="mb-4">
                Si vous souhaitez intégrer Voice Tool dans votre application, voici les commandes principales :
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                {`// Start recording
invoke('start_recording', { deviceId: 'default' })

// Stop recording
invoke('stop_recording')

// Get transcription
invoke('get_transcription', { audioData: base64Audio })

// Get recording history
invoke('get_history', { limit: 50, offset: 0 })

// Update settings
invoke('update_settings', { settings: {...} })`}
              </pre>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Format de données</h3>
              <p className="mb-4">
                Structure des objets de transcription :
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                {`{
  "id": "uuid-v4",
  "timestamp": "2025-01-28T10:30:00Z",
  "text": "Transcription text",
  "language": "fr",
  "duration": 5.2,
  "audioPath": "/path/to/audio.wav",
  "model": "whisper-1",
  "confidence": 0.95
}`}
              </pre>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Événements</h3>
              <p className="mb-4">
                Voice Tool émet plusieurs événements que vous pouvez écouter :
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                {`// Listen to recording state changes
listen('recording-started', (event) => {
  console.log('Recording started')
})

listen('recording-stopped', (event) => {
  console.log('Recording stopped', event.payload)
})

listen('transcription-completed', (event) => {
  console.log('Transcription:', event.payload.text)
})

listen('error', (event) => {
  console.error('Error:', event.payload.message)
})`}
              </pre>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Configuration système</h3>
              <p className="mb-4">
                Fichiers de configuration :
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li><strong>Windows</strong> : <code>%APPDATA%\VoiceTool\config.json</code></li>
                <li><strong>Linux</strong> : <code>~/.config/voice-tool/config.json</code></li>
                <li><strong>macOS</strong> : <code>~/Library/Application Support/VoiceTool/config.json</code></li>
              </ul>
            </div>

            {/* Footer navigation */}
            <div className="mt-16 pt-8 border-t">
              <div className="flex justify-between">
                <Link
                  href="/"
                  className="text-primary hover:underline"
                >
                  ← Retour à l&apos;accueil
                </Link>
                <Link
                  href="/download"
                  className="text-primary hover:underline"
                >
                  Télécharger Voice Tool →
                </Link>
              </div>
            </div>
          </div>
        </div>
  )
}
