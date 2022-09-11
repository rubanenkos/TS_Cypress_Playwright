class NewTransactionPage {
    userSearchList() {
        return cy.getBySel("user-list-search-input")
    }
    userListItem() {
        return cy.getBySelLike("user-list-item")
    }

    amountInput() {
        return cy.getBySelLike("amount-input")
    }

    descriptionInput() {
        return cy.getBySelLike("description-input")
    }

    submitPaymentButton() {
        return cy.getBySelLike("submit-payment")
    }

}
export default NewTransactionPage