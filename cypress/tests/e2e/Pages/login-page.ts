class LoginPage {
    signInButton() {
        return cy.getBySel("signin-submit")
    }
    
    usernameInput() {
        return cy.get("[data-test*=signin-username]")
    }

    passwordInput() {
        return cy.get("[data-test*=signin-password]")
    }

}

export default LoginPage