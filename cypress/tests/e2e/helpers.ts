import { User } from "../../../src/models";

type NewTransactionTestCtx = {
  allUsers?: User[];
  user?: User;
  contact?: User;
};

const ctx: NewTransactionTestCtx = {};

function getUserAndLogin(){
  cy.database("filter", "users").then((users: User[]) => {
    ctx.user = users[0];
    ctx.contact = users[1];
    return cy.loginByXstate(ctx.user.username);
  });
}

export  {ctx, getUserAndLogin};
