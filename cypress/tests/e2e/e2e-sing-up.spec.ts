import LoginPage from "./Pages/login-page";
import SignUpPage from "./Pages/signup-page";

const urlSignUp = "/signup";
const newUser = {
    firstName: 'TestFName',
    lastname: 'TestLName',
    userName: 'test_user',
    password: 's3cret'
};

describe("SignUp tests", function () {
  const signUpPage = new SignUpPage()
  const loginPage = new LoginPage()
  beforeEach(function () {
    cy.task("db:seed");
  });

  it("SignUp succesfully", function () {
    cy.visit(urlSignUp, { log: true })
    signUpPage.title().should("be.visible");

    signUpPage.firstNameInput().should("be.visible").type(newUser.firstName);
    signUpPage.lastNameInput().should("be.visible").type(newUser.lastname);
    signUpPage.userNameInput().should("be.visible").type(newUser.userName);
    signUpPage.passwordInput().should("be.visible").type(newUser.password);
    signUpPage.confirmPasswordInput().should("be.visible").type(newUser.password);   

    signUpPage.submitButton().should("be.visible").click();
    loginPage.signInButton().should("be.visible");

    cy.database("find", "users", { username: newUser.userName })
      .its("username")
      .should("equal", newUser.userName);
  });
})

