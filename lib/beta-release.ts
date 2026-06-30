import type { Release } from "@/types/releases"

export const BETA_PROMOTED = false

export const BETA_RELEASE: Release = {
  version: "3.0.0-beta.9",
  tag: "v3.0.0-beta.9",
  published_at: "2026-05-12T10:14:37Z",
  changelog_url: "https://github.com/Nolyo/lexena/releases/tag/v3.0.0-beta.9",
  release_notes:
    "Pre-release for public testing. See the changelog for full details.",
  prerelease: true,
  windows: {
    nsis_installer: {
      filename: "lexena-v3.0.0-beta.9-setup.exe",
      url: "https://github.com/Nolyo/lexena/releases/download/v3.0.0-beta.9/lexena-v3.0.0-beta.9-setup.exe",
      size_bytes: 8902111,
      size_human: "8.5 MB",
      sha256:
        "8de28f04241a12d63bb42021dc558a7e5b32d3001747af2abcf346d4bf426fe5",
      download_count: 0,
    },
    portable: {
      filename: "lexena-v3.0.0-beta.9-portable.exe",
      url: "https://github.com/Nolyo/lexena/releases/download/v3.0.0-beta.9/lexena-v3.0.0-beta.9-portable.exe",
      size_bytes: 42792960,
      size_human: "40.8 MB",
      sha256:
        "4ba63e3d7ee4f687b958d148da30c1286ca1d251afda112ff549f30e83c0ea14",
      download_count: 0,
    },
  },
}
