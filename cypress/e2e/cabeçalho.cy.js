

describe('Testes de cabeçalho', () => {

    it("Teste de redirecionamento botão shop four grid ", () => {

        cy.visit('/');
        cy.get('.mega-menu-sub').contains('Shop Four Grid').click({ force: true })
        cy.url().should('equal', 'https://www.automationpratice.com.br/shop')
    })
   
})