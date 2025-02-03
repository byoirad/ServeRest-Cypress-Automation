export const Admin = {
    isVisible: function(text) {
        cy.get('h1', { timeout: 10000 })
            .should('contain', text)
        cy.get('.lead')
            .should('have.text', 'Este é seu sistema para administrar seu ecommerce.')
    },
}