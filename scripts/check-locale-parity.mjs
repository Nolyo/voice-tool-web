#!/usr/bin/env node
// Verifies that every translation key present in one locale exists in all
// others. Run as part of the build pipeline so a copy edit on one locale
// cannot ship a `MISSING_MESSAGE` runtime error to production.

import { readFileSync, readdirSync } from "node:fs"
import { join, dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const messagesDir = resolve(here, "..", "messages")

function flatten(obj, prefix = "") {
  const out = new Map()
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const [k, v] of flatten(value, path)) out.set(k, v)
    } else {
      out.set(path, value)
    }
  }
  return out
}

const files = readdirSync(messagesDir)
  .filter((f) => f.endsWith(".json"))
  .sort()

if (files.length < 2) {
  console.log(`[i18n] only ${files.length} locale file(s) found, nothing to compare`)
  process.exit(0)
}

const locales = files.map((file) => {
  const locale = file.replace(/\.json$/, "")
  const data = JSON.parse(readFileSync(join(messagesDir, file), "utf8"))
  return { locale, file, keys: flatten(data) }
})

const reference = locales[0]
let driftCount = 0

for (let i = 1; i < locales.length; i++) {
  const other = locales[i]
  const missingInOther = []
  const missingInRef = []

  for (const key of reference.keys.keys()) {
    if (!other.keys.has(key)) missingInOther.push(key)
  }
  for (const key of other.keys.keys()) {
    if (!reference.keys.has(key)) missingInRef.push(key)
  }

  if (missingInOther.length === 0 && missingInRef.length === 0) {
    console.log(`[i18n] ${reference.locale} ↔ ${other.locale}: ✔ ${reference.keys.size} keys aligned`)
    continue
  }

  driftCount += missingInOther.length + missingInRef.length

  if (missingInOther.length > 0) {
    console.error(`\n[i18n] ${missingInOther.length} key(s) present in ${reference.file} but missing in ${other.file}:`)
    for (const k of missingInOther) console.error(`  - ${k}`)
  }
  if (missingInRef.length > 0) {
    console.error(`\n[i18n] ${missingInRef.length} key(s) present in ${other.file} but missing in ${reference.file}:`)
    for (const k of missingInRef) console.error(`  - ${k}`)
  }
}

if (driftCount > 0) {
  console.error(`\n[i18n] FAIL — ${driftCount} key(s) out of sync across locales`)
  process.exit(1)
}

console.log(`\n[i18n] OK — all locales aligned`)
