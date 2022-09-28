import { Page, Locator, expect } from "@playwright/test";
import { getElementPropertyValue } from "../helpers/utils"

export default class TransactionDetailPage {

  readonly userName: Locator;
  readonly bankAccountMenuItem: Locator;
  readonly homeMenuItem: Locator;
  readonly transactions: Locator
  readonly inputComment: Locator; 
  readonly headerLabel: Locator
  readonly buttonTransactionLike: Locator
  readonly countTransactionLike: Locator

  constructor(public page: Page) {
    this.userName = page.locator('[data-test="sidenav-username"]');
    this.bankAccountMenuItem = page.locator('[data-test="sidenav-bankaccounts"]')
    this.homeMenuItem = page.locator('[data-test="sidenav-home"]')
    this.transactions = page.locator('xpath=//li[contains(@data-test,"transaction-item-")]')
    this.inputComment = page.locator('input[name="content"]')
    this.headerLabel = page.locator('text=Transaction Detail')
    this.buttonTransactionLike = page.locator('xpath=//button[contains(@data-test,"transaction-like-button")]')
    this.countTransactionLike = page.locator('xpath=//div[contains(@data-test,"transaction-like-count-")]')
  }
  async createComment(comment: string) {
    await expect(this.headerLabel).toBeVisible()
    await this.inputComment.click()
    await this.inputComment.fill(comment)
    await this.page.keyboard.press('Enter');
  }

  async checkComment(comment: string) {
    await expect(this.page.locator(`text=${comment}`)).toBeVisible()
  }

  async checkLikeIcon(expectedColor: string) {
    await expect(this.buttonTransactionLike).toBeVisible()
    const likeButtonColor = await getElementPropertyValue(this.buttonTransactionLike, 'color')
    expect(likeButtonColor).toBe(expectedColor);
  }
  
  async checkCountTransactionLike(amount: string) {
    await expect(this.countTransactionLike).toBeVisible()
    await expect(this.countTransactionLike).toContainText(amount)
  }

  async clickLikeTransaction() {
    await this.buttonTransactionLike.click()
  }

}