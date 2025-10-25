# useReleases Hook

Hook React pour récupérer et gérer les releases de Voice Tool avec cache automatique.

## Source de données

Les releases proviennent de :
```
https://github.com/Nolyo/voice-tool/blob/main/docs/releases.json
```

Ce fichier est généré automatiquement par la CI/CD du projet Voice Tool à chaque release.

## Installation

Le hook est déjà configuré dans le projet. Il suffit de l'importer :

```typescript
import { useReleases } from "@/hooks/use-releases"
```

## Utilisation basique

```typescript
"use client"

import { useReleases } from "@/hooks/use-releases"

export function MyComponent() {
  const { latest, releases, isLoading, error } = useReleases()

  if (isLoading) return <div>Chargement...</div>
  if (error) return <div>Erreur : {error.message}</div>

  return (
    <div>
      <h2>Dernière version : {latest?.version}</h2>
      <p>Date : {new Date(latest?.published_at).toLocaleDateString()}</p>
    </div>
  )
}
```

## API du hook

### Valeurs retournées

```typescript
const {
  data,        // ReleasesData | null - Données complètes
  latest,      // Release | null - Dernière version
  releases,    // Release[] - Liste de toutes les releases
  isLoading,   // boolean - État de chargement
  error,       // Error | null - Erreur éventuelle
  refetch      // () => Promise<void> - Forcer le rechargement
} = useReleases()
```

### Types TypeScript

```typescript
interface Release {
  version: string              // Ex: "v-2.1.1"
  tag: string                  // Ex: "v-2.1.1"
  published_at: string         // ISO date
  changelog_url: string        // URL vers CHANGELOG.md
  release_notes: string        // Notes de version (markdown)
  windows?: WindowsInstallers  // Installateurs Windows (optionnel)
}

interface WindowsInstallers {
  nsis?: Installer      // Installateur NSIS
  msi?: Installer       // Installateur MSI
  portable?: Installer  // Version portable
}

interface Installer {
  filename: string       // Nom du fichier
  url: string           // URL de téléchargement direct
  size_bytes: number    // Taille en octets
  size_human: string    // Taille lisible (ex: "17.3 MB")
  sha256: string        // Checksum pour vérification
  download_count: number // Nombre de téléchargements
}
```

## Exemples d'utilisation

### Afficher la dernière version

```typescript
export function LatestVersion() {
  const { latest } = useReleases()

  return (
    <div>
      <h3>Dernière version</h3>
      <p className="font-mono">{latest?.version}</p>
    </div>
  )
}
```

### Afficher les liens de téléchargement

```typescript
export function DownloadLinks() {
  const { latest, isLoading } = useReleases()

  if (isLoading) return <p>Chargement...</p>

  const windows = latest?.windows

  return (
    <div>
      <h3>Télécharger Voice Tool {latest?.version}</h3>
      <ul>
        {windows?.nsis && (
          <li>
            <a href={windows.nsis.url}>
              Windows NSIS ({windows.nsis.size_human})
            </a>
          </li>
        )}
        {windows?.msi && (
          <li>
            <a href={windows.msi.url}>
              Windows MSI ({windows.msi.size_human})
            </a>
          </li>
        )}
        {windows?.portable && (
          <li>
            <a href={windows.portable.url}>
              Portable ({windows.portable.size_human})
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
```

### Lister toutes les versions

```typescript
export function ReleasesList() {
  const { releases } = useReleases()

  return (
    <div>
      <h3>Historique des versions</h3>
      <ul>
        {releases.map((release) => (
          <li key={release.tag}>
            <strong>{release.version}</strong> -{" "}
            {new Date(release.published_at).toLocaleDateString()}
            <br />
            <a href={release.changelog_url}>Voir le changelog</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Forcer le rechargement

```typescript
export function RefreshButton() {
  const { refetch, isLoading } = useReleases()

  return (
    <button
      onClick={() => refetch()}
      disabled={isLoading}
    >
      {isLoading ? "Chargement..." : "Actualiser les releases"}
    </button>
  )
}
```

### Badge de version dans le header

```typescript
export function VersionBadge() {
  const { latest } = useReleases()

  if (!latest) return null

  return (
    <span className="rounded bg-primary px-2 py-1 text-xs font-mono">
      {latest.version}
    </span>
  )
}
```

## Cache

Le hook utilise un cache localStorage avec les caractéristiques suivantes :

- **Durée** : 15 minutes
- **Clé** : `voice-tool-releases`
- **Comportement** :
  - Premier appel : Fetch depuis GitHub
  - Appels suivants : Données du cache (si < 15 min)
  - Après expiration : Nouveau fetch automatique

### Vider le cache manuellement

```typescript
// Dans le navigateur (console dev)
localStorage.removeItem('voice-tool-releases')

// Ou utiliser refetch() pour forcer un nouveau fetch
const { refetch } = useReleases()
await refetch()
```

## Gestion des erreurs

```typescript
export function ReleaseInfo() {
  const { latest, isLoading, error } = useReleases()

  if (isLoading) {
    return <div className="spinner">Chargement...</div>
  }

  if (error) {
    return (
      <div className="error">
        <p>Impossible de charger les releases</p>
        <p className="text-sm">{error.message}</p>
      </div>
    )
  }

  if (!latest) {
    return <div>Aucune release disponible</div>
  }

  return <div>{/* Contenu normal */}</div>
}
```

## Notes importantes

- ⚠️ Le hook doit être utilisé dans un composant **client** (`"use client"`)
- ⚠️ Le fetch se fait côté client (pas de SSR)
- ⚠️ Le cache est stocké dans localStorage (navigateur uniquement)
- ✅ Le hook gère automatiquement le loading et les erreurs
- ✅ Les données sont validées avant d'être stockées en cache
- ✅ Le cache expire automatiquement après 15 minutes

## Intégration avec i18n

Pour afficher les dates dans la langue de l'utilisateur :

```typescript
import { useLocale } from "next-intl"

export function LocalizedDate() {
  const { latest } = useReleases()
  const locale = useLocale()

  return (
    <time>
      {new Date(latest?.published_at).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric"
      })}
    </time>
  )
}
```

## Fichiers du système

- **Hook** : `/hooks/use-releases.ts`
- **Types** : `/types/releases.ts`
- **Source** : `https://github.com/Nolyo/voice-tool/blob/main/docs/releases.json`
