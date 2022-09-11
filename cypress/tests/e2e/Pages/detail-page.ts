class TransactionDetailPage {


    transactionLikeButton() {
        return cy.get('[data-test*=transaction-like-button]')
    }
    transactionLikeCount() {
        return cy.get('[data-test*="transaction-like-count"]')
    }
    transactionItem() {
        return cy.get('[data-test*=transaction-item]')
    }
    
}

 export default TransactionDetailPage