class BasePage {

    navBarHomeItem() {
        return cy.get('[data-test*=sidenav-home]')
    }
    
    newTransactionButton() {
        return cy.getBySelLike("new-transaction")
    }

    alertBarSuccess() {
       return cy.getBySel("alert-bar-success")
    }
    logo() {
        return cy.getBySel("app-name-logo")
    }
}

export default BasePage