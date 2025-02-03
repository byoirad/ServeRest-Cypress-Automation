export const Home = {
    isVisible: function() {
        cy.get('section[class="row espacamento"]', { timeout: 10000 }).should('be.visible')
    }
}