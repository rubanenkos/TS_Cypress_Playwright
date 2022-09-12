import { User } from "../../../src/models";
import BasePage from "./Pages/base-page";
import LoginPage from "./Pages/login-page";

const urlSignIn = "/signin";
type LoginCtx = {
    anyUser: User;
  };

describe("Login tests", function () {
    const ctx = {} as LoginCtx;
    const userPassword = "s3cret"
    const loginPage = new LoginPage()
    const basePage = new BasePage()

  beforeEach(function () {
    cy.task("db:seed");

    cy.database("filter", "users").then((users: User[]) => {
        ctx.anyUser = users[0];
    });
  });

  it("Login", function () {
    cy.visit(urlSignIn, { log: true })
    loginPage.signInButton().should("be.visible");

    loginPage.usernameInput().should("be.visible").type(ctx.anyUser.username);
    loginPage.passwordInput().should("be.visible").type(userPassword);
    loginPage.signInButton().should("be.visible").click();

    basePage.navBarUserName().should("be.visible").contains(ctx.anyUser.username);
  });
});
