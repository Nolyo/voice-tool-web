import { expect, test } from "@playwright/test"

const ROUTES = [
  "/",
  "/download",
  "/fr",
  "/fr/download",
]

for (const path of ROUTES) {
  test(`renders ${path} without errors`, async ({ page }) => {
    const errors: string[] = []
    page.on("pageerror", (e) => errors.push(e.message))
    const response = await page.goto(path)
    expect(response?.ok()).toBeTruthy()
    await expect(page.locator("body")).toBeVisible()
    expect(errors).toEqual([])
  })
}
