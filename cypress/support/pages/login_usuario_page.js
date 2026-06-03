import { faker } from "@faker-js/faker";

function acessar_login() {
    cy.visit('/login')
}

function preenche_email(email = faker.internet.email()) {
    cy.get('#user').type(email)
}

function preenche_senha(email = faker.internet.password({ length: 6 })) {
    cy.get('#password').type(email)
}

function logar() {
    cy.get('#btnLogin').click();
}

function marcar_lembrar_de_mim() {
    cy.get('#materialUnchecked').check()
}

function confirmar_sucesso(mensagem) {

    cy.get('#swal2-title')
        .should('be.visible')
        .and('contain.text', mensagem);


    cy.get('.swal2-confirm.swal2-styled').click();
}


function logar_usuario(email = faker.internet.email(), senha = faker.internet.password()) {
    cy.acessar_login()
    cy.preenche_email(email)
    cy.preenche_senha(senha)
    cy.logar()
}

function validar_msg_erro(mensagem) {
    cy.get('.invalid_input')
        .should('be.visible')
        .and('contain.text', mensagem);
}


function ir_para_cadastro() {
    cy.get('#createAccount').click();
}


export default {
    acessar_login,
    preenche_email,
    preenche_senha,
    logar,
    logar_usuario,
    marcar_lembrar_de_mim,
    confirmar_sucesso,
    validar_msg_erro,
    ir_para_cadastro
}