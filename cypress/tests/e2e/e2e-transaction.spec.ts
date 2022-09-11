import {ctx, getUserAndLogin} from "./helpers";
import HomePage from "./Pages/home-page";
import TransactionDetailPage from "./Pages/detail-page";
import BasePage from "./Pages/base-page";
import NewTransactionPage from "./Pages/new-transaction-page";

describe("Transactions tests", function () {
  const homePage = new HomePage()
  const detailPage = new TransactionDetailPage()
  const basePage = new BasePage()
  const newTransactionPage = new NewTransactionPage()

  beforeEach(function () {
    cy.task("db:seed");
    getUserAndLogin()
  });

  it("Likes a transaction",  () => {

    homePage.firstTransactionLikeCount().contains("0").click({force: true})

    detailPage.transactionLikeButton().should('have.css', 'color').and('eq', 'rgb(63, 81, 181)')
    detailPage.transactionLikeButton().click()

    detailPage.transactionLikeButton().should('have.css', 'color').and('eq', 'rgba(0, 0, 0, 0.26)')
    detailPage.transactionLikeCount().contains("1")
    cy.visualSnapshot("Like on a Transaction Detail page");

    detailPage.transactionItem().invoke('attr', 'data-test').should('include', 'transaction-item-')
        .then(transactionId => checkLikeOnTransactionListPage(transactionId as string))

    function checkLikeOnTransactionListPage(transactionId: string) {
        basePage.navBarHomeItem().click()
        homePage.transactionLikeCount(transactionId).contains("1")
        homePage.transactionCountIcon(transactionId).should('have.css', 'color').and('eq', 'rgb(189, 189, 189)')
        cy.visualSnapshot("Like on a Transaction List page");
    }
});

it("Create new transaction",  () => {
  const payment = {
    amount: "100",
    description: "Payment - Test transaction",
  };

  basePage.newTransactionButton().click();
  newTransactionPage.userSearchList().type(ctx.contact!.firstName, { force: true });
  cy.visualSnapshot("User Search First Name Input");

  newTransactionPage.userListItem().contains(ctx.contact!.firstName).click({ force: true });
  cy.visualSnapshot("User Search First Name List Item");

  newTransactionPage.amountInput().type(payment.amount);
  newTransactionPage.descriptionInput().type(payment.description);
  cy.visualSnapshot("Amount and Description Input");
  newTransactionPage.submitPaymentButton().click();
  
  basePage.alertBarSuccess().should("be.visible").and("have.text", "Transaction Submitted!");

  basePage.logo().find("a").click();

  homePage.navPersonalTab().click().should("have.class", "Mui-selected");
  cy.visualSnapshot("create-another-transaction");

  homePage.transactionList().first().should("contain", payment.description);

  cy.database("find", "users", { id: ctx.contact!.id })
    .its("balance")
    .should("equal", ctx.contact!.balance + parseInt(payment.amount) * 100);

  cy.database("find", "users", { id: ctx.user!.id })
    .its("balance")
    .should("equal", ctx.user!.balance - parseInt(payment.amount) * 100);

  cy.visualSnapshot("Personal List Validate Transaction in List");
})
});
 