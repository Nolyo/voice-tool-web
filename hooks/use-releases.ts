"use client"

import { useState, useEffect } from "react"
import type { ReleasesData, Release } from "@/types/releases"
import { BETA_PROMOTED, BETA_RELEASE } from "@/lib/beta-release"

const RELEASES_URL =
  process.env.NEXT_PUBLIC_RELEASES_URL ??
  "https://raw.githubusercontent.com/Nolyo/voice-tool/main/docs/releases.json"
const CACHE_KEY = "voice-tool-releases"
const CACHE_DURATION = 1000 * 60 * 15 // 15 minutes

interface CachedData {
  data: ReleasesData
  timestamp: number
}

interface UseReleasesReturn {
  data: ReleasesData | null
  latest: Release | null
  stableLatest: Release | null
  releases: Release[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useReleases(): UseReleasesReturn {
  const [data, setData] = useState<ReleasesData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchReleases = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Check cache first
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          try {
            const { data: cachedData, timestamp }: CachedData = JSON.parse(cached)
            const isExpired = Date.now() - timestamp > CACHE_DURATION

            if (!isExpired) {
              setData(cachedData)
              setIsLoading(false)
              return
            }
          } catch {
            // Invalid cache, continue to fetch
            localStorage.removeItem(CACHE_KEY)
          }
        }
      }

      // Fetch fresh data
      const response = await fetch(RELEASES_URL, {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch releases: ${response.statusText}`)
      }

      const releasesData: ReleasesData = await response.json()

      // Validate data structure
      if (!releasesData.latest || !Array.isArray(releasesData.releases)) {
        throw new Error("Invalid releases data structure")
      }

      setData(releasesData)

      // Cache the data
      if (typeof window !== "undefined") {
        const cacheData: CachedData = {
          data: releasesData,
          timestamp: Date.now(),
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error")
      setError(error)
      console.error("Error fetching releases:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReleases()
  }, [])

  const upstreamLatest = data?.latest ?? null
  const upstreamReleases = data?.releases ?? []

  const latest = BETA_PROMOTED ? BETA_RELEASE : upstreamLatest
  const stableLatest = BETA_PROMOTED ? upstreamLatest : null
  const releases = BETA_PROMOTED
    ? [BETA_RELEASE, ...upstreamReleases]
    : upstreamReleases

  return {
    data,
    latest,
    stableLatest,
    releases,
    isLoading,
    error,
    refetch: fetchReleases,
  }
}
