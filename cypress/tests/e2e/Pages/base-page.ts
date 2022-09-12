class BasePage {
    
    navBarUserName() {
        return cy.getBySel("sidenav-username")
    }

    navBarHomeItem() {
        return cy.get('[data-test*=sidenav-home]')
    }
    
    newTransactionButton() {
        return cy.getBySelLike("new-transaction")
    }

    bankAccounts() {
        return cy.getBySel("sidenav-bankaccounts")
    }
    
    alertBarSuccess() {
       return cy.getBySel("alert-bar-success")
    }
    logo() {
        return cy.getBySel("app-name-logo")
    }
}

export default BasePage