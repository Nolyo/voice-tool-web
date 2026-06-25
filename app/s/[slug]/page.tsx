import type { Metadata } from "next"
import Image from "next/image"
import { fetchSharedNote } from "@/lib/sharing/share-view"
import { SharedNoteBody } from "./shared-note-body"

export const dynamic = "force-dynamic"

const HOME_URL = "https://lexena.app"

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(d)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const result = await fetchSharedNote(slug)
  const title =
    result.status === "ok" && result.note.title.trim()
      ? result.note.title.trim()
      : "Note partagée"
  return {
    title: `${title} · Lexena`,
    robots: { index: false, follow: false },
  }
}

function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="share-page">
      <header className="share-topbar">
        <a className="share-brand" href={HOME_URL} aria-label="Lexena — accueil">
          <Image
            src="/lexena-monogram.png"
            alt=""
            width={28}
            height={28}
            className="share-brand-logo"
          />
          <span className="share-brand-name">Lexena</span>
        </a>
      </header>
      <main id="main" className="share-main">
        {children}
      </main>
      <footer className="share-footer">
        <a className="share-footer-cta" href={HOME_URL}>
          Créé avec Lexena
        </a>
      </footer>
    </div>
  )
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = await fetchSharedNote(slug)

  if (result.status === "not_found") {
    return (
      <Chrome>
        <div className="share-state">
          <h1 className="share-state-title">Ce lien n&apos;existe plus ou a été désactivé.</h1>
          <p className="share-state-body">
            La personne qui l&apos;a partagé a peut-être arrêté le partage.
          </p>
        </div>
      </Chrome>
    )
  }

  if (result.status === "error") {
    return (
      <Chrome>
        <div className="share-state">
          <h1 className="share-state-title">Impossible de charger ce contenu.</h1>
          <p className="share-state-body">Réessayez plus tard.</p>
        </div>
      </Chrome>
    )
  }

  const { note } = result
  const updated = formatDate(note.updatedAt)

  return (
    <Chrome>
      <article className="share-note">
        <h1 className="share-note-title">{note.title.trim() || "Note sans titre"}</h1>
        {updated ? (
          <p className="share-note-meta">Dernière mise à jour le {updated}</p>
        ) : null}
        <SharedNoteBody html={note.contentHtml} />
      </article>
    </Chrome>
  )
}
