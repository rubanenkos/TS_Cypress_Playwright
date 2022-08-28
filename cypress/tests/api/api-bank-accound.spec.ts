import { User, BankAccount} from "../../../src/models";

const apiBankAccounts = `${Cypress.env("apiUrl")}/bankaccounts`;

type TestBankAccountCtx = {
  authenticatedUser?: User;
  bankAccount?: BankAccount;
};

describe("Bank Account API", function () {
  let ctx: TestBankAccountCtx = {};

  beforeEach(function () {
    cy.task("db:seed");

    cy.database("filter", "users").then((users: User[]) => {
        ctx.authenticatedUser = users[0];
        return cy.loginByApi(ctx.authenticatedUser.username);
    }).then(()=>{
      cy.database("filter", "bankaccounts", {userId : ctx.authenticatedUser!.id}).then((bankAccount: BankAccount[]) => {
        ctx.bankAccount = bankAccount[0];
    });
    }); 
});

  context("GET /bankaccounts", function () {
    it("Get a list of bank accounts for a user", function () {
      cy.request("GET", `${apiBankAccounts}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.results.length).to.be.greaterThan(0);
      });
    });
  });

  context("DELETE /bankaccounts/:bankAccountId", function () {
    it("Delete a bank account", function () {
      cy.request("DELETE", `${apiBankAccounts}/${ctx.bankAccount?.id}`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
