import { expect, test } from "@playwright/test"

const ROUTES = [
  "/",
  "/features",
  "/pricing",
  "/download",
  "/legal/privacy",
  "/legal/terms",
  "/fr",
  "/fr/features",
  "/fr/pricing",
  "/fr/download",
  "/fr/legal/privacy",
  "/fr/legal/terms",
]

for (const path of ROUTES) {
  test(`renders ${path} without errors`, async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (e) => errors.push(e.message))
    const response = await page.goto(path)
    expect(response?.ok()).toBeTruthy()
    await expect(page.locator("body")).toBeVisible()
    await expect(page.locator("text=Lexena").first()).toBeVisible()
    expect(errors).toEqual([])
  })
}

test("loads the Umami tracker once", async ({ page }) => {
  await page.goto("/")

  const tracker = page.locator(
    'script[src="https://umami.yohann-jaffres.fr/script.js"]',
  )
  await expect(tracker).toHaveCount(1)
  await expect(tracker).toHaveAttribute(
    "data-website-id",
    "90968d31-bdc6-4bb1-927f-1cb0aaaa8769",
  )
})

const HOME_ROUTES = ["/", "/fr"]
for (const path of HOME_ROUTES) {
  test(`exposes valid SoftwareApplication JSON-LD on ${path}`, async ({ page }) => {
    await page.goto(path)
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent()
    expect(raw, "JSON-LD script must be present on the home page").toBeTruthy()
    const parsed = JSON.parse(raw as string)
    expect(parsed["@type"]).toBe("SoftwareApplication")
    expect(parsed.name).toBe("Lexena")
    expect(parsed.operatingSystem).toBe("Windows")
    expect(parsed.offers?.price).toBe("0")
  })
}

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true })

  test("opens, navigates, and closes via Escape", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    const menu = page.locator('[role="dialog"][aria-label*="Navigation"]')
    await expect(menu).toHaveAttribute("aria-hidden", "true")

    await page.getByRole("button", { name: /open menu/i }).click()
    await expect(menu).toHaveAttribute("aria-hidden", "false")

    // Drawer panel must cover full viewport height (regression: a parent
    // backdrop-filter creates a containing block that clips position:fixed
    // children — the menu is portaled to body to escape it).
    const panel = menu.locator("> div:nth-child(2)")
    await page.waitForTimeout(300)
    const panelRect = await panel.boundingBox()
    expect(panelRect?.height ?? 0).toBeGreaterThan(700)

    await page.keyboard.press("Escape")
    await expect(menu).toHaveAttribute("aria-hidden", "true")

    await page.getByRole("button", { name: /open menu/i }).click()
    await menu.getByRole("link", { name: /^Features$/i }).click()
    await expect(page).toHaveURL(/\/features$/)
  })
})
