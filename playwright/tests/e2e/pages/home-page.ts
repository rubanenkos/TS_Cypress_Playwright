import { Page, Locator, expect } from "@playwright/test";
import { colors } from "../helpers/const";
import { getElementPropertyValue } from "../helpers/utils"

export default class HomePage {

  readonly userName: Locator;
  readonly bankAccountMenuItem: Locator;
  readonly homeMenuItem: Locator;
  readonly transactions: Locator 
  readonly newTransaction: Locator
  readonly tabMine: Locator
  readonly tabEveryone: Locator
  readonly tabFriends: Locator
  readonly tabPersonal: Locator
  readonly transactionFilterDate: Locator
  readonly transactionFilterAmountRange: Locator

  constructor(public page: Page) {
    this.userName = page.locator('[data-test="sidenav-username"]');

    this.bankAccountMenuItem = page.locator('[data-test="sidenav-bankaccounts"]')
    this.homeMenuItem = page.locator('[data-test="sidenav-home"]')

    this.newTransaction = page.locator('[data-test="nav-top-new-transaction"]')
    this.transactions = page.locator('xpath=//li[contains(@data-test,"transaction-item-")]')
    
    this.tabEveryone = page.locator('[data-test="nav-public-tab"]')
    this.tabFriends = page.locator('[data-test="nav-contacts-tab"]')
    this.tabMine = page.locator('[data-test="nav-personal-tab"]')

    this.transactionFilterDate = page.locator('[data-test="transaction-list-filter-date-range-button"]')
    this.transactionFilterAmountRange = page.locator('[data-test="transaction-list-filter-amount-range-button"]')
  }

  async transactionSender(transactionId: string) {
    return this.page.locator(`[data-test="transaction-sender-${transactionId}"]`)
  }

  async transactionReceiver(transactionId: string) {
    return this.page.locator(`[data-test="transaction-receiver-${transactionId}"]`)
  }

  async transactionPaymentText(transactionId: string) {
    return this.page.locator(`xpath=//*[@data-test="transaction-item-${transactionId}"]//*[contains(text(),"Payment")]`)
  }

  async transactionAmount(transactionId: string) {
    return this.page.locator(`[data-test="transaction-amount-${transactionId}"]`) 
  }

  async checkPaginationFeeds() {
    
    await expect(this.tabEveryone).toBeVisible()
    await expect(this.tabEveryone).toContainText('Everyone')
    await expect(this.tabEveryone).toHaveAttribute('aria-selected', 'true')

    await expect(this.tabFriends).toBeVisible()
    await expect(this.tabFriends).toContainText('Friends')
    await expect(this.tabFriends).toHaveAttribute('aria-selected', 'false')

    await expect(this.tabMine).toBeVisible()
    await expect(this.tabMine).toContainText('Mine')
    await expect(this.tabMine).toHaveAttribute('aria-selected', 'false')
    
    const tabs = [this.tabEveryone, this.tabFriends, this.tabMine]

    for (const tab of tabs) {
      await tab.click()
      await this.checkTabsFilters()
      await this.checkTransactionItems()
    }
  }

  async checkTransactionItems() {
    await this.page.waitForSelector('[data-test="transaction-list"] li')
    var listTransactionItems = await this.page.$$('[data-test="transaction-list"] li')
    
    let itemsId = []
    for await (const item of listTransactionItems) {
      const datatestItem = await item.getAttribute("data-test")
      const itemId = datatestItem.replace("transaction-item-", "");
      itemsId.push(itemId)
    }
    for (let i = 0; i < 3; i++) { 
      await this.checkTransactionItemDecoration(itemsId[i])
    }
  }

  async checkTransactionItemDecoration(transactionId: string) {
    const sender = await this.transactionSender(transactionId)
    const transactionSenderColor = await getElementPropertyValue(sender, 'color')
    expect(transactionSenderColor).toBe(colors.black263244);
    
    const receiver = await this.transactionReceiver(transactionId)
    const transactionReceiverColor = await getElementPropertyValue(receiver, 'color')
    expect(transactionReceiverColor).toBe(colors.black263244);

    const payment = await this.transactionPaymentText(transactionId)
    const transactionPaymentColor = await getElementPropertyValue(payment, 'color')
    expect(transactionPaymentColor).toBe(colors.grey000054);

    const amount = await this.transactionAmount(transactionId)
    let amountValue = await amount.textContent()
    const transactionAmountColor = await getElementPropertyValue(amount, 'color')
    const amountColor = amountValue[0]==='-' ? colors.red25500 : colors.green7617580;
    expect(transactionAmountColor).toBe(amountColor);
  }

  async checkTabsFilters() {
      await expect(this.transactionFilterDate).toBeVisible()
      await expect(this.transactionFilterDate).toContainText('Date: ALL')
      
      const filterDataColor = await getElementPropertyValue(this.transactionFilterDate, 'color')
      expect(filterDataColor).toBe(colors.blue6381181);

      await expect(this.transactionFilterAmountRange).toBeVisible()
      await expect(this.transactionFilterAmountRange).toContainText('Amount: $0 - $1,000')
      
      const filterAmountColor = await getElementPropertyValue(this.transactionFilterAmountRange, 'color')
      expect(filterAmountColor).toBe(colors.blue6381181);
  }
  
  async openMineTab() {
    await expect(this.tabMine).toBeVisible()
    await this.tabMine.click();
  }

  async clickNewTransaction() {
    await expect(this.newTransaction).toBeVisible()
    await this.newTransaction.click()
  }
  
  async openBankAccountSection() {
    await expect(this.bankAccountMenuItem).toBeVisible()
    await this.bankAccountMenuItem.click();
  }

  async openHomeSection() {
    await expect(this.homeMenuItem).toBeVisible()
    await this.homeMenuItem.click();
  }

  async openFirstAvailableTransaction() {
    await this.transactions.first().click()
  }
   
  async openTransactionAvailableForLike() {
    await this.page.locator('xpath=//li[contains(@data-test,"transaction-item-")]//*[@data-test="transaction-like-count" and contains(text(),"0")]').first().click()
  }

  async checkNumberComment(value: string, lineNumber: number = 1) {
    await expect(this.page.locator(`xpath=(//li[contains(@data-test,"transaction-item-")]//*[@data-test="transaction-comment-count"])[${lineNumber}]`)).toContainText(value)
  }

  async checkTransactionByDescription(text: string) {
    await expect(this.page.locator(`xpath=//li[contains(@data-test,"transaction-item-")]//*[contains(text(), ${text})]`).first()).toContainText(text)
  }
}
