import { test } from "@playwright/test";
import { testData } from "../testdata";
import LoginPage from "./pages/login-page";
import HomePage from "./pages/home-page";
import TransactionDetailPage from "./pages/transaction-detail-page";
  
test.describe("Comments tests", () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page)
        await login.gotoLoginPage()
        await login.fillLoginForm(testData.username, testData.password)
    })
  test("Comment a transaction", async ({ page }) => {
    const home = new HomePage(page)
    const detail = new TransactionDetailPage(page)
    const newComment = 'Test comment'
    await home.openHomeSection()
    await home.checkNumberComment('0')
    await home.openFirstAvailableTransaction()
    await detail.createComment(newComment)
    await detail.checkComment(newComment)
    await home.checkNumberComment('1')
    
  });
});
