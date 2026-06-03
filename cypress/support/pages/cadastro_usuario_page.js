import { faker } from "@faker-js/faker";

function validar_tela_cadastro(textoEsperado) {
    cy.get('.account_form > h3')
        .should('be.visible')
        .and('include.text', textoEsperado);
}

export default {
    validar_tela_cadastro
}