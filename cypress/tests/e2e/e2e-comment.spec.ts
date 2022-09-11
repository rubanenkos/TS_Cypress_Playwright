import { User } from "../../../src/models";

type NewCommentTestCtx = {
  user?: User;
};

describe("Comments tests", function () {
  const ctx: NewCommentTestCtx = {};

  beforeEach(function () {
    cy.task("db:seed");

    cy.database("filter", "users").then((users: User[]) => {
      ctx.user = users[0];
      return cy.loginByXstate(ctx.user.username);
    });
  });

  it("Comment a transaction",  () => {
    cy.get('[data-test*=transaction-item]')
      .first()
      .invoke('attr', 'data-test')
      .then(transactionId => {
        cy.get(`[data-test='${transactionId}'] p[data-test='transaction-comment-count']`).contains("0")
        cy.get('[data-test*="transaction-item"]').first().click()

        cy.get('[data-test*=transaction-comment-input]')
          .invoke('attr', 'placeholder')
          .should('include', 'Write a comment...')
        
        cy.contains("Comments").should('not.exist');
        cy.get('[data-test*=transaction-comment-input]').type('Test comment 1{enter}')

        cy.contains("Comments").should("be.visible");
        cy.get('[data-test="comments-list"]').should("be.visible")
        cy.get('[data-test*="comment-list-"]').should('have.length', 1)
        cy.get('[data-test*=transaction-comment-input]').type('Test comment 2{enter}')
        cy.get('[data-test*="comment-list-"]').should('have.length', 2)
        cy.visualSnapshot("Comments on a Transaction Detail page");

        cy.get('[data-test*=sidenav-home]').click()
        cy.get(`[data-test='${transactionId}'] p[data-test='transaction-comment-count']`).contains("2")
        })
        cy.visualSnapshot("Comments on a Transaction List page");
});
});
 