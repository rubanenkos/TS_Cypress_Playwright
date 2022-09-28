import { Page, Locator, expect } from "@playwright/test";

export default class BankAccountPage {

  readonly buttonCreateBankAccount: Locator;
  readonly buttonSubmitBankAccount: Locator
  readonly createForm: Locator
  readonly bankName: Locator
  readonly routingNumber: Locator
  readonly accountNumber: Locator

  constructor(public page: Page) {
    this.buttonCreateBankAccount = page.locator('[data-test="bankaccount-new"]')
    this.createForm = page.locator('[data-test="bankaccount-form"]')
    this.bankName = page.locator('input[id="bankaccount-bankName-input"]')
    this.routingNumber = page.locator('[id="bankaccount-routingNumber-input"]')
    this.accountNumber = page.locator('[id="bankaccount-accountNumber-input"]')
    this.buttonSubmitBankAccount = page.locator('button[data-test="bankaccount-submit"]')
  }

  async createBankAccount(bankName: string, routingNumber: string, accountNumber: string) {
    await expect(this.buttonCreateBankAccount).toBeVisible()
    await this.buttonCreateBankAccount.click()
    await expect(this.createForm).toBeVisible()
    await this.enterBankName(bankName)
    await this.enterRoutingNumber(routingNumber)
    await this.enterAccountNumber(accountNumber)
    await expect(this.buttonSubmitBankAccount).toBeEnabled()
    await this.buttonSubmitBankAccount.click()
  }
  async checkAccountDisplayed(bankName: string) {
    await expect(this.page.locator(`'${bankName}'`).last()).toBeVisible()
  }

  async enterBankName(text: string) {
    await this.bankName.click();
    await this.bankName.fill(text);
  }

  async enterRoutingNumber(text: string) {
    await this.routingNumber.click();
    await this.routingNumber.fill(text);
  }

  async enterAccountNumber(text: string) {
    await this.accountNumber.click();
    await this.accountNumber.fill(text);
  }
    
}
