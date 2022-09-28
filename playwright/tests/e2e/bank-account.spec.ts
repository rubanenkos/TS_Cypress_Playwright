import { test } from "@playwright/test";
import { testData } from "../testdata";
import LoginPage from "./pages/login-page";
import HomePage from "./pages/home-page";
import BankAccountPage from "./pages/bank-accounts-page";

const newAccount = {
    bankName: "Test Bank",
    routingNumber: "123456789",
    accountNumber: "1234567890"
  }
  
test.describe("Bank Account tests", () => {

  test("Create a new bank account", async ({ page }) => {
    const login = new LoginPage(page)
    const home = new HomePage(page)
    const bankaccount = new BankAccountPage(page)
    await login.gotoLoginPage()
    await login.fillLoginForm(testData.username, testData.password)
    await home.openBankAccountSection()
    await bankaccount.createBankAccount(newAccount.bankName, newAccount.routingNumber, newAccount.accountNumber) 
    await bankaccount.checkAccountDisplayed(newAccount.bankName)
  });
});
