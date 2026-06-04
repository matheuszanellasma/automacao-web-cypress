import { faker } from "@faker-js/faker";

export default {
    validar_tela_cadastro(textoEsperado) {
        cy.get('.account_form > h3')
            .should('be.visible')
            .and('include.text', textoEsperado);
    },

    acessar_cadastro() {
        cy.visit('/register')
    },

    preencher_nome(nome = faker.person.fullName()) {
        cy.preencher_campo('#user', nome)
    },

    preencher_email(email = faker.internet.email()) {
        cy.preencher_campo('#email', email)
    },

    preencher_senha(senha = faker.internet.password({ length: 6 })) {
        cy.preencher_campo('#password', senha)
    },

    cadastrar() {
        cy.get('#btnRegister').click();
    },

    validar_msg_erro(seletor, mensagem) {
        cy.get(seletor).next()
            .should('be.visible')
            .and('contain.text', mensagem)
    },

    confirmar_sucesso(mensagem) {
        cy.get('#swal2-title')
            .should('be.visible')
            .and('contain.text', mensagem);
        cy.get('.swal2-confirm.swal2-styled').click();
    },

    cadastrar_usuario({
        nome = faker.person.fullName(),
        email = faker.internet.email(),
        senha = faker.internet.password({ length: 6 })
    } = {}) {
        cy.visit('/register');
        cy.preencher_campo('#user', nome);
        cy.preencher_campo('#email', email);
        cy.preencher_campo('#password', senha);
        cy.get('#btnRegister').click();
    }

}