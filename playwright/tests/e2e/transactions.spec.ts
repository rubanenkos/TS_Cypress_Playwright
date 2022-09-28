import { test } from "@playwright/test";
import { testData } from "../testdata";
import { colors } from "./helpers/const";
import LoginPage from "./pages/login-page";
import HomePage from "./pages/home-page";
import NewTransactionPage from "./pages/new-transaction-page";
import TransactionDetailPage from "./pages/transaction-detail-page";
  
test.describe("Transactions tests", () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page)
        await login.gotoLoginPage()
        await login.fillLoginForm(testData.username, testData.password)
    })
  test("Create a new transaction", async ({ page }) => {
    const payment = {
        amount: '100',
        description: 'Payment by check'
    }
    
    const home = new HomePage(page)
    const newTransaction = new NewTransactionPage(page)

    await home.openHomeSection()
    await home.clickNewTransaction()
    await newTransaction.pickFirstAvailableUser()
    await newTransaction.createPayment(payment.amount, payment.description)
    await newTransaction.returnToTransaction()
    await home.openMineTab()
    await home.checkTransactionByDescription(payment.description)
  });

  test("Like a transaction", async ({ page }) => {
    
    const home = new HomePage(page)
    const detail = new TransactionDetailPage(page)

    await home.openHomeSection()
    await home.openTransactionAvailableForLike()
    await detail.checkLikeIcon(colors.blue6381181)
    await detail.checkCountTransactionLike('0') 
    await detail.clickLikeTransaction()
    await detail.checkLikeIcon(colors.grey000026)
    await detail.checkCountTransactionLike('1') 
  });
});
