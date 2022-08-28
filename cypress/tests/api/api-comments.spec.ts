import { User, Transaction } from "../../../src/models";

const apiComments = `${Cypress.env("apiUrl")}/comments`;
const apiTransaction = `${Cypress.env("apiUrl")}/transactions`;

type TestNotificationsCtx = {
  authenticatedUser?: User;
  transactionId?: string;
};

describe("Users API", function () {
  let ctx: TestNotificationsCtx = {};

  beforeEach(function () {
    cy.task("db:seed");

    cy.database("filter", "users").then((users: User[]) => {
        ctx.authenticatedUser = users[0];
        return cy.loginByApi(ctx.authenticatedUser.username);
    });

    cy.database("find", "transactions").then((transaction: Transaction) => {
        ctx.transactionId = transaction.id;
      });
  });

    context("GET /transactions/:transactionId", function () {
    it("Get transaction by id", function () {
      cy.request("GET", `${apiTransaction}/${ctx.transactionId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.transaction.id).to.be.eq(ctx.transactionId);
      });
    });
  });

  context("POST /comments/:transactionId, fields : content", function () {
    it("Create a new comment for a transaction", function () {
        cy.request("POST", `${apiComments}/${ctx.transactionId}`, {content:  `Test comment by ${Date().toString()}`}).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.eq("OK")
      });
    });
  });

  });
