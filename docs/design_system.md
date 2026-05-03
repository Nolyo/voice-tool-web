# Design system source

Latest Claude Design hand-off URL (gzip-compressed tar archive — fetch with curl,
decompress with gzip, extract the tar):

```
https://api.anthropic.com/v1/design/h/_4dH1mZzlI8NZewTxUyXiA
```

The bundle ships under the old project name (`voice-tool-design-system`) but its
visual structure (Inter / Geist / JetBrains Mono, dark-first, editorial restraint,
Lucide icons, sentence-case copy, middle-dot separators) is the foundation used
for **Lexena**.

Lexena's actual brand assets — green monogram `L`, dark navy app icon — live in
the lexena repo under `src-tauri/icons/`. They override the periwinkle accent of
the original Claude Design hand-off:

- Accent (replaces periwinkle): `oklch(0.68 0.14 162)` — Lexena green (≈ `#2eb291`)
- Background hue shift (264 → 230): a slightly cooler navy than the original DS

When a refreshed Claude Design pack arrives in Lexena green, replace the
oklch values in `app/globals.css` (`.vt-app` scope) and update this file's URL.

See `docs/superpowers/specs/2026-05-03-lexena-launch-overnight-design.md` for
the full decisions log of the overnight build.
