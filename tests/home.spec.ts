import { test, expect } from "@playwright/test";

test.describe("Home page with no auth", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("customer-auth.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("check sign in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("check title of page", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("check the count of items", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
  });

  test("Search the thor hammer", async ({ page }) => {
    await page.locator('[data-test="search-query"]').click();
    await page.locator('[data-test="search-query"]').fill("thor hammer");
    await page.locator('[data-test="search-submit"]').click();
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });

});

test.describe("home page customer 01 auth", () => {

  test.use({ storageState: ".auth/customer01.json" });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visualization test authorized", async ({ page }) => {
   // await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-customer-auth.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("check customer01 is signed in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  });

});