import { User } from "../../../src/models";

const apiUsers = `${Cypress.env("apiUrl")}/users`;

type TestNotificationsCtx = {
  authenticatedUser?: User;
};

describe("Users API", function () {
  let ctx: TestNotificationsCtx = {};

  beforeEach(function () {
    cy.task("db:seed");

    cy.database("filter", "users").then((users: User[]) => {
        ctx.authenticatedUser = users[0];
        return cy.loginByApi(ctx.authenticatedUser.username);
    });
  });

  context("GET /users", function () {
    it("Get a list of users", function () {
      cy.request("GET", `${apiUsers}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.results.length).to.be.greaterThan(0);
      });
    });
  });

  context("GET /users/profile/:username", function () {
    it("Get a user profile by username", function () {
      cy.request("GET", `${apiUsers}/profile/${ctx.authenticatedUser!.username}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.user).not.to.be.empty
      });
    });
  });

  });
