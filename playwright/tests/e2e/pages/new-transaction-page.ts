import { Page, Locator, expect } from "@playwright/test";

export default class newTransactionPage {

  readonly user: Locator;
  readonly inputAmount : Locator
  readonly inputDescription: Locator
  readonly buttonPay: Locator
  readonly buttonReturnToTransaction: Locator

  constructor(public page: Page) {
        this.user = page.locator('xpath=//li[contains(@data-test,"user-list-item-")]')
        this.inputAmount = page.locator('input[id="amount"]')
        this.inputDescription = page.locator('input[id="transaction-create-description-input"]')
        this.buttonPay = page.locator('[data-test="transaction-create-submit-payment"]')
        this.buttonReturnToTransaction = page.locator('[data-test="new-transaction-return-to-transactions"]')
  }

  async pickFirstAvailableUser() {
      await this.user.first().click()
  }

  async enterAmount(value: string) {
    await expect(this.inputAmount).toBeVisible()
    await this.inputAmount.click();
    await this.inputAmount.fill(value);
  }

  async enterDescriptions(text: string) {
    await expect(this.inputDescription).toBeVisible()
    await this.inputDescription.click();
    await this.inputDescription.fill(text);
  }

  async createPayment(amount: string, description: string) {
      await this.enterAmount(amount)
      await this.enterDescriptions(description)
      await expect(this.buttonPay).toBeEnabled()
      await this.buttonPay.click()
  }

  async returnToTransaction() {
      await expect(this.buttonReturnToTransaction).toBeVisible()
      await this.buttonReturnToTransaction.click()
  }
}
