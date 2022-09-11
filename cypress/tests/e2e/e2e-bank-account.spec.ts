import { User } from "../../../src/models";

const newAccount = {
  bankName: "Test Bank",
  routingNumber: "123456789",
  accountNumber: "1234567890"
}
describe("Bank Account", function () {
  beforeEach(function () {
    cy.task("db:seed");
    cy.database("find", "users").then((user: User) => {
      cy.loginByXstate(user.username);
    });
  });

  it("Creates a new bank account", function () {
    cy.getBySel("sidenav-bankaccounts").click();
    cy.getBySel("bankaccount-new").click()

    cy.getBySel("bankaccount-submit").should("be.visible");

    cy.getBySel("bankaccount-bankName-input").should("be.visible").type(newAccount.bankName)
    cy.getBySel("bankaccount-routingNumber-input").should("be.visible").type(newAccount.routingNumber)
    cy.getBySel("bankaccount-accountNumber-input").should("be.visible").type(newAccount.accountNumber)
    cy.getBySel("bankaccount-submit").should("be.visible").click()

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
