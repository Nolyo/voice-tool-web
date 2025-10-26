export interface Installer {
  filename: string
  url: string
  size_bytes: number
  size_human: string
  sha256: string
  download_count: number
}

export interface WindowsInstallers {
  nsis_installer?: Installer
  msi_installer?: Installer
  portable?: Installer
}

export interface Release {
  version: string
  tag: string
  published_at: string
  changelog_url: string
  release_notes: string
  windows?: WindowsInstallers
}

export interface ReleasesData {
  schema_version: string
  app_name: string
  repository: string
  generated_at: string
  latest: Release
  releases: Release[]
}
