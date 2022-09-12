class BankAccountPage {

    newBankAccountButton() {
        return cy.getBySel("bankaccount-new")
    }
    
    submitButton() {
        return cy.getBySel("bankaccount-submit")
    }

    bankNameInput() {
        return cy.getBySel("bankaccount-bankName-input")
    }
    // cy.getBySel("bankaccount-bankName-input").should("be.visible").type(newAccount.bankName)

    routingNumberInput() {
        return cy.getBySel("bankaccount-routingNumber-input")
    }
    // cy.getBySel("bankaccount-routingNumber-input").should("be.visible").type(newAccount.routingNumber)

    accountNumber() {
        return cy.getBySel("bankaccount-accountNumber-input")
    }
    // cy.getBySel("bankaccount-accountNumber-input").should("be.visible").type(newAccount.accountNumber)
    // cy.getBySel("bankaccount-submit").should("be.visible").click()
}
export default BankAccountPage