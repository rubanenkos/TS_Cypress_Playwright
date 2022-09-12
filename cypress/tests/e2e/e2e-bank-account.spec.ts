import {getUserAndLogin} from "./helpers";
import BasePage from "./Pages/base-page";
import BankAccountPage from "./Pages/bank-account-page";

const newAccount = {
  bankName: "Test Bank",
  routingNumber: "123456789",
  accountNumber: "1234567890"
}
describe("Bank Account", function () {
  const basePage = new BasePage()
  const bankAccounts = new BankAccountPage()

  beforeEach(function () {
    cy.task("db:seed");
    getUserAndLogin()
  });

  it("Creates a new bank account", function () {
    basePage.bankAccounts().click();
    bankAccounts.newBankAccountButton().click()

    bankAccounts.submitButton().should("be.visible");

    bankAccounts.bankNameInput().should("be.visible").type(newAccount.bankName)
    bankAccounts.routingNumberInput().should("be.visible").type(newAccount.routingNumber)
    bankAccounts.accountNumber().should("be.visible").type(newAccount.accountNumber)
    bankAccounts.submitButton().should("be.visible").click()

    cy.contains(newAccount.bankName).should("be.visible");

    cy.database("find", "bankaccounts", { 
      bankName: newAccount.bankName, 
      accountNumber: newAccount.accountNumber, 
      routingNumber: newAccount.routingNumber 
    })
      .its("id")
      .should("not.be.empty");

  });
});
