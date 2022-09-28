import { test, expect } from "@playwright/test";
import { testData } from "../testdata";
import LoginPage from "./pages/login-page";
import HomePage from "./pages/home-page";

test.describe("Login tests", () => {

  test("Login", async ({ page }) => {
    const login = new LoginPage(page)
    const homePage = new HomePage(page)
    await login.gotoLoginPage()
    await login.fillLoginForm(testData.username, testData.password)
    await expect(homePage.userName).toContainText(testData.username)
  });
});
