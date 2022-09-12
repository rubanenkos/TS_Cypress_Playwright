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
    transactionCommentInput() {
        return cy.get('[data-test*=transaction-comment-input]')
    }
    commentList() {
        return cy.get('[data-test="comments-list"]')
    }

    commentListItem() {
        return cy.get('[data-test*="comment-list-item"]')
    }
    
    commentsTitle() {
        return cy.contains("Comments")
    }
}

 export default TransactionDetailPage