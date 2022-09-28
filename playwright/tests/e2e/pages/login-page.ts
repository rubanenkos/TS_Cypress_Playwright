import { Page, Locator } from "@playwright/test";

export default class LoginPage {
  readonly signinLink = "http://localhost:3000/signin"

  readonly inputUserName: Locator;
  readonly inputPassword: Locator;
  readonly buttonSubmit: Locator;

  constructor(public page: Page) {
    this.inputUserName = page.locator('input[name="username"]');
    this.inputPassword = page.locator('input[name="password"]');
    this.buttonSubmit = page.locator('[data-test="signin-submit"]')
  }

  async gotoLoginPage() {
    await this.page.goto(this.signinLink);
  }

  async enterUserName(text: string) {
    await this.inputUserName.click();
    await this.inputUserName.fill(text);
  }

  async enterPassword(text: string) {
    await this.inputPassword.click();
    await this.inputPassword.fill(text);
  }
 
  async submitLoginForm() {
    await this.buttonSubmit.click()
  }
  
  async fillLoginForm(username: string, password: string) {
    await this.enterUserName(username)
    await this.enterPassword(password)
    await this.submitLoginForm()
  }
    
}
