import { expect, test } from "@playwright/test"

// Public note-sharing page (/s/<slug>). The happy-path test is gated on
// SHARE_TEST_SLUG so the suite never couples to a revocable production slug;
// the not-found / invalid / header tests are always stable.

test.describe("public share page", () => {
  test("invalid slug renders the neutral not-found state", async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (e) => errors.push(e.message))
    const res = await page.goto("/s/short")
    expect(res?.status()).toBe(200)
    await expect(
      page.getByText(/existe plus ou a été désactivé/i)
    ).toBeVisible()
    expect(errors).toEqual([])
  })

  test("well-formed but unknown slug renders the not-found state", async ({
    page,
  }) => {
    await page.goto("/s/zzzzzzzzzzzzzzzz")
    await expect(
      page.getByText(/existe plus ou a été désactivé/i)
    ).toBeVisible()
  })

  test("sends hardening headers (CSP, noindex, no-store)", async ({ page }) => {
    const res = await page.goto("/s/zzzzzzzzzzzzzzzz")
    const headers = res?.headers() ?? {}
    expect(headers["content-security-policy"]).toContain("default-src 'self'")
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'")
    expect(headers["x-robots-tag"]).toContain("noindex")
    expect(headers["cache-control"]).toContain("no-store")
  })

  const slug = process.env.SHARE_TEST_SLUG
  test.describe("happy path", () => {
    test.skip(!slug, "set SHARE_TEST_SLUG to an active share to run")
    test("renders the shared note body client-side", async ({ page }) => {
      const errors: string[] = []
      page.on("pageerror", (e) => errors.push(e.message))
      await page.goto(`/s/${slug}`)
      // Body is injected + sanitized in the browser after mount.
      const body = page.locator(".note-body")
      await expect(body).toHaveAttribute("aria-busy", "false")
      await expect(body).not.toBeEmpty()
      // Footer CTA and a title are always present on success.
      await expect(page.getByText("Créé avec Lexena")).toBeVisible()
      await expect(page.locator("h1.share-note-title")).toBeVisible()
      expect(errors).toEqual([])
    })
  })
})
