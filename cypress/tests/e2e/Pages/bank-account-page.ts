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

    routingNumberInput() {
        return cy.getBySel("bankaccount-routingNumber-input")
    }

    accountNumber() {
        return cy.getBySel("bankaccount-accountNumber-input")
    }

}
export default BankAccountPage