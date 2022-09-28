import { test, expect } from "@playwright/test";
import LoginPage from "./pages/login-page";
import SignUpPage from "./pages/sign-up-page";

const newUser = {
    firstName: 'TestFName',
    lastname: 'TestLName',
    userName: 'test_user',
    password: 's3cret'
};

test.describe("Sign Up tests", () => {

  test("Sign Up successfully", async ({ page }) => {
    const signup = new SignUpPage(page)
    const login = new LoginPage(page)
    await signup.gotoSignUpPage()
    await signup.fillSignUpForm(newUser.firstName, newUser.lastname, newUser.userName, newUser.password)
    await expect(login.buttonSubmit).toBeVisible()
  });
});
