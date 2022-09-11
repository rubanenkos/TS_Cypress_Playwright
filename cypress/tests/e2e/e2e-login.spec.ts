import { User } from "../../../src/models";

const urlSignIn = "/signin";
type LoginCtx = {
    anyUser: User;
    
  };

describe("Login tests", function () {
    const ctx = {} as LoginCtx;
    const userPassword = "s3cret"

  beforeEach(function () {
    cy.task("db:seed");

    cy.database("filter", "users").then((users: User[]) => {
        ctx.anyUser = users[0];
    });
  });

  it("Login", function () {
    cy.visit(urlSignIn, { log: false })
    cy.getBySel("signin-submit").should("be.visible");

    cy.get("[data-test*=signin-username]").should("be.visible").type(ctx.anyUser.username);
    cy.get("[data-test*=signin-password]").should("be.visible").type(userPassword);
    cy.get("[data-test*=signin-submit]").should("be.visible").click();

    cy.getBySel("sidenav-username").should("be.visible").contains(ctx.anyUser.username);
  });
});
