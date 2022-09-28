import { Page, Locator, expect } from "@playwright/test";

export default class SignUpPage {
  readonly signinLink = "http://localhost:3000/signup"

  readonly titleSignUp: Locator;
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputUserName: Locator;
  readonly inputPassword: Locator;
  readonly inputConfirmPassword: Locator;
  readonly buttonSubmitSignUp: Locator;

  constructor(public page: Page) {
    this.titleSignUp = page.locator('[data-test="signup-title"]')
    this.inputFirstName = page.locator('input[id="firstName"]')
    this.inputLastName = page.locator('input[id="lastName"]')
    this.inputUserName = page.locator('input[id="username"]')
    this.inputPassword = page.locator('input[id="password"]')
    this.inputConfirmPassword = page.locator('input[id="confirmPassword"]')
    this.buttonSubmitSignUp = page.locator('button[data-test="signup-submit"]')
    
}

  async gotoSignUpPage() {
    await this.page.goto(this.signinLink);
  }

  async enterFirstName(text: string) {
    await this.inputFirstName.click();
    await this.inputFirstName.fill(text);
  }

  async enterLastName(text: string) {
    await this.inputLastName.click();
    await this.inputLastName.fill(text);
  }

  async enterUserName(text: string) {
    await this.inputUserName.click();
    await this.inputUserName.fill(text);
  }

  async enterPassword(text: string) {
    await this.inputPassword.click();
    await this.inputPassword.fill(text);
  }

  async enterConfirmPassword(text: string) {
    await this.inputConfirmPassword.click();
    await this.inputConfirmPassword.fill(text);
  }
 
  async clickSubmitSignUp() {
    await expect(this.buttonSubmitSignUp).toBeVisible();
    await this.buttonSubmitSignUp.click()
  }
  
  async fillSignUpForm(firstname: string, lastname: string, username: string, password: string) {
    await this.enterFirstName(firstname)
    await this.enterLastName(lastname)
    await this.enterUserName(username)
    await this.enterPassword(password)
    await this.enterConfirmPassword(password)
    await this.clickSubmitSignUp()
  }
    
}
