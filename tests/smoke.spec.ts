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
