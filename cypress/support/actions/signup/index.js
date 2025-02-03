export const Signup = {
    isVisible: function() {
        cy.get('.form').should('be.visible')
    },

    fillform: function(user) {
        cy.get('#nome').type(user.name)
        cy.get('#email').type(user.email)
        cy.get('#password').type(user.password)
        if (user.adm === "true") cy.get('#administrador').click()
    },

    submit: function(){
        cy.get('button[type="submit"]').click()
    },
}