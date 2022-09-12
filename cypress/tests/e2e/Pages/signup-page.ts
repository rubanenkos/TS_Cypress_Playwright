class SignUpPage {

    title() {
        return cy.getBySel("signup-title")

    }
    firstNameInput() {
        return cy.get("[data-test*=signup-first-name]")
    }

    lastNameInput() {
        return cy.get("[data-test*=signup-last-name]")
    }

    userNameInput() {
        return cy.get("[data-test*=signup-username]")
    }

    passwordInput() {
        return cy.get("[data-test*=signup-password]")
    }

    confirmPasswordInput() {
        return cy.get("[data-test*=signup-confirmPassword")
    }
    
    submitButton() {
        return cy.get("[data-test*=signup-submit]")
    }

}

export default SignUpPage