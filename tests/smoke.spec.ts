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
