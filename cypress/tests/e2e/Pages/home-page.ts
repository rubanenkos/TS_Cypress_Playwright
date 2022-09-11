class HomePage {

    navTransactionTabs() {
        return cy.get('[data-test="nav-transaction-tabs"]')
    }
    
    navPublicTab() {
        return cy.get('[data-test="nav-public-tab"]')
    }

    navContactsTab() {
        return cy.get('[data-test="nav-contacts-tab"]')
    }

    navPersonalTab() {
        return cy.get('[data-test="nav-personal-tab"]')
    }
    
    transactionFilterDate() {
        return cy.get('[data-test="transaction-list-filter-date-range-button"]')
    }

    transactionFilterAmountRange() {
        return cy.get('[data-test="transaction-list-filter-amount-range-button"]')
    }
    
    transactionList() {
        return cy.getBySel("transaction-list")
    }

    transactionItem() {
        return cy.get('[data-test*=transaction-item]')
    }
    transactionAmount(transactionId: string) {
        return cy.get(`[data-test='${transactionId}'] [data-test*=transaction-amount]`)
    }

    transactionCommentCount(transactionId: string) {
        return cy.get(`[data-test='${transactionId}'] p[data-test='transaction-comment-count']`)
    }
    
    transactionLikeCount(transactionId: string) {
        return cy.get(`[data-test='${transactionId}'] p[data-test='transaction-like-count']`)
    }

    firstTransactionLikeCount() {
        return cy.get('[data-test="transaction-like-count"]')
    }

    firstTransactionLikeButton() {
        return cy.get('[data-test="transaction-like-button"]')
    }

    itemIcon(transactionId: string) {
        return cy.get(`[data-test='${transactionId}'] .MuiSvgIcon-root path`)
    }

    transactionCountIcon(transactionId: string) {
        return cy.get(`[data-test='${transactionId}'] [class*=countIcons]`)
    }
    transactionSender(transactionId: string) {
        return cy.get(`[data-test='${transactionId}'] [data-test*=transaction-sender]`)
    }

    transactionAction(transactionId: string) {
        return cy.get(`[data-test='${transactionId}'] [data-test*=transaction-action]`)
    }

    transactionReceiver(transactionId: string) {
        return cy.get(`[data-test='${transactionId}'] [data-test*=transaction-receiver]`)
    }

    transactionPaymentDetails(transactionId:string) {
        return cy.get(`[data-test='${transactionId}'] [class*='MuiTypography-root MuiTypography-body2']`)
    }

    avatarImg() {
        return cy.get('.MuiAvatar-img')
    }
}

 export default HomePage