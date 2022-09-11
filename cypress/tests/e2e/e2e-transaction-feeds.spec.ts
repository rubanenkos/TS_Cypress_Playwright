import {getUserAndLogin} from "./helpers";
import HomePage from "./Pages/home-page";

describe("All transactions feeds tests", function () {

  const homePage = new HomePage()
  
  const likeIcon = 'M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z'
  const commentIcon = 'M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 14H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z'

  beforeEach(function () {
    cy.task("db:seed");
    getUserAndLogin()
  });

  it("Paginations of Transaction feeds",  () => {
    const tabs = [homePage.navPublicTab, homePage.navContactsTab, homePage.navPersonalTab]

    homePage.navTransactionTabs().should("be.visible")

    homePage.navPublicTab().should("be.visible").contains("Everyone")
    homePage.navPublicTab().invoke("attr", "aria-selected").should('eq', 'true')

    homePage.navContactsTab().should("be.visible").contains("Friends")
    homePage.navContactsTab().invoke("attr", "aria-selected").should('eq', 'false')
    
    homePage.navPersonalTab().should("be.visible").contains("Mine")
    homePage.navPersonalTab().invoke("attr", "aria-selected").should('eq', 'false')
    
    for (const tab of tabs) {
        tab().click()
        homePage.transactionItem().each(($el) => {
            let item = $el.attr('data-test')
            checkTransactionItem(item as string)
        })
    }
    
    function checkTransactionItem(transactionId: string) {
        cy.log(transactionId)

        homePage.transactionFilterDate().should("be.visible")
            .should('have.css', 'color').and('eq', 'rgb(63, 81, 181)')
        homePage.transactionFilterDate().contains("Date: ALL")

        homePage.transactionFilterAmountRange().should("be.visible")
            .should('have.css', 'color').and('eq', 'rgb(63, 81, 181)')
        homePage.transactionFilterAmountRange().contains("Amount: $0 - $1,000")

        homePage.transactionSender(transactionId).should('not.be.empty')
            .should('have.css', 'color').and('eq', 'rgb(26, 32, 44)') 
        homePage.transactionAction(transactionId).contains(new RegExp("paid|requested|charged"))
       
        homePage.transactionReceiver(transactionId).should('not.be.empty')
            .should('have.css', 'color').and('eq', 'rgb(26, 32, 44)')  

        homePage.transactionPaymentDetails(transactionId)
            .should('have.css', 'color').and('eq', 'rgba(0, 0, 0, 0.54)')  
    
        homePage.transactionAmount(transactionId).then(function($elem) {
        
            homePage.avatarImg().should("be.visible").should('have.attr', 'src').should('include','svg')
            
            homePage.transactionCommentCount(transactionId).invoke('text').then(parseFloat).should('be.gte', 0)
            homePage.transactionCommentCount(transactionId).should('have.css', 'color').and('eq', 'rgb(189, 189, 189)')  
            homePage.transactionLikeCount(transactionId).invoke('text').then(parseFloat).should('be.gte', 0)
            homePage.transactionLikeCount(transactionId).should('have.css', 'color').and('eq', 'rgb(189, 189, 189)') 
            homePage.itemIcon(transactionId).first().should('have.attr', 'd').should('include', likeIcon)
            homePage.itemIcon(transactionId).last().should('have.attr', 'd').should('include', commentIcon)

            if ($elem.text().includes("-")) {
                homePage.transactionAmount(transactionId)
                    .should('have.css', 'font-size', '24px')
                    .should('have.css', 'color').and('eq', 'rgb(255, 0, 0)')  
            } else {
                homePage.transactionAmount(transactionId)
                    .should('have.css', 'font-size', '24px')
                    .should('have.css', 'color').and('eq', 'rgb(76, 175, 80)')  
            }
       })
    }
});
});
