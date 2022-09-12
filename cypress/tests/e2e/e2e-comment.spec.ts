import {getUserAndLogin} from "./helpers";
import HomePage from "./Pages/home-page";
import TransactionDetailPage from "./Pages/detail-page";
import BasePage from "./Pages/base-page";

describe("Comments tests", function () {
  const homePage = new HomePage()
  const detailPage = new TransactionDetailPage()
  const basePage = new BasePage()

  beforeEach(function () {
    cy.task("db:seed");
    getUserAndLogin()
  });

  it("Comment a transaction",  () => {
    homePage.transactionItem().first().invoke('attr', 'data-test')
      .then(transactionId => {
        homePage.transactionCommentCount(transactionId as string).contains("0")
        homePage.transactionItem().first().click()

        detailPage.transactionCommentInput().invoke('attr', 'placeholder')
          .should('include', 'Write a comment...')
        
        detailPage.commentsTitle().should('not.exist');
        detailPage.transactionCommentInput().type('Test comment 1{enter}')

        detailPage.commentsTitle().should("be.visible");
        detailPage.commentListItem().should("be.visible").should('have.length', 1)
        detailPage.transactionCommentInput().type('Test comment 2{enter}')
        detailPage.commentListItem().should("be.visible").should('have.length', 2)
        cy.visualSnapshot("Comments on a Transaction Detail page");

        basePage.navBarHomeItem().click()
        homePage.transactionCommentCount(transactionId as string).contains("2")
        })
        cy.visualSnapshot("Comments on a Transaction List page");
});
});
 