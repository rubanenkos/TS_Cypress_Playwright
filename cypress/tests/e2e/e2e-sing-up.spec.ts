import { isMobile } from "../../support/utils";

const urlSignUp = "/signup";
const newUser = {
    firstName: 'TestFName',
    lastname: 'TestLName',
    userName: 'test_user',
    password: 's3cret'
};

describe("SignUp tests", function () {

  beforeEach(function () {
    cy.task("db:seed");
  });

    if (isMobile()) {
      cy.getBySel("sidenav-toggle").click();
    }

  it("SignUp succesfully", function () {
    cy.visit(urlSignUp, { log: false })
    cy.getBySel("signup-title").should("be.visible");

    cy.get("[data-test*=signup-first-name]").should("be.visible").type(newUser.firstName);
    cy.get("[data-test*=signup-last-name]").should("be.visible").type(newUser.lastname);
    cy.get("[data-test*=signup-username]").should("be.visible").type(newUser.userName);
    cy.get("[data-test*=signup-password").should("be.visible").type(newUser.password);
    cy.get("[data-test*=signup-confirmPassword").should("be.visible").type(newUser.password);   

    cy.get("[data-test*=signup-submit]").should("be.visible").click();
    cy.getBySel("signin-submit").should("be.visible");

    cy.database("find", "users", { username: newUser.userName })
      .its("username")
      .should("equal", newUser.userName);
  });
});
