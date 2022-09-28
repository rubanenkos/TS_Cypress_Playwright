import { test } from "@playwright/test";
import { testData } from "../testdata";
import LoginPage from "./pages/login-page";
import HomePage from "./pages/home-page";
  
test.describe("Transactions feeds tests", () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page)
        await login.gotoLoginPage()
        await login.fillLoginForm(testData.username, testData.password)
    })
  test("Paginates all transactions feeds", async ({ page }) => {
    const home = new HomePage(page)
    await home.openHomeSection()
    await home.checkPaginationFeeds()
  });
});
