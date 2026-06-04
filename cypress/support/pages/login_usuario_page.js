import { faker } from "@faker-js/faker";

export default {
    acessar_login() {
        cy.visit('/login')
    },

    preencher_email(email = faker.internet.email()) {
        cy.preencher_campo('#user', email)
    },

    preencher_senha(senha = faker.internet.password({ length: 6 })) {
        cy.preencher_campo('#password', senha)
    },

    logar() {
        cy.get('#btnLogin').click();
    },

    marcar_lembrar_de_mim() {
        cy.get('#materialUnchecked').check()
    },

    confirmar_sucesso(mensagem) {
        cy.get('#swal2-title')
            .should('be.visible')
            .and('contain.text', mensagem);
        cy.get('.swal2-confirm.swal2-styled').click();
    },
 
    validar_msg_erro(mensagem) {
        cy.get('.invalid_input')
            .should('be.visible')
            .and('contain.text', mensagem)
    },

    ir_para_cadastro() {
        cy.get('#createAccount').click()
    },

    validar_email_preenchido(emailEsperado) {
        cy.get('#user')
            .should('be.visible')
            .and('have.value', emailEsperado)
    },

    logar_usuario(email = faker.internet.email(), senha = faker.internet.password()) {
        cy.visit('/login')
        cy.preencher_campo('#user', email)
        cy.preencher_campo('#password', senha)
        cy.get('#btnLogin').click();
    }
}