import { faker } from '@faker-js/faker';

export default {
    preencher_primeiro_nome(nome = faker.person.firstName()) {
        cy.preencher_campo('#fname', nome);
    },

    preencher_sobrenome(sobrenome = faker.person.lastName()) {
        cy.preencher_campo('#lname', sobrenome);
    },

    preencher_nome_empresa(empresa = faker.company.name()) {
        cy.preencher_campo('#cname', empresa);
    },

    preencher_email(email = faker.internet.email()) {
        cy.preencher_campo('#email', email);
    },

    selecionar_pais(opcao = faker.number.int({ min: 1, max: 2 })) {
        cy.get('#country')
            .should('be.visible')
            .select(opcao)
    },

    selecionar_cidade(opcao = faker.number.int({ min: 1, max: 2 })) {
        cy.get('#city')
            .should('be.visible')
            .select(opcao)
    },

    preencher_cep(cep = faker.location.zipCode('#####-###')) {
        cy.preencher_campo('#zip', cep);
    },

    preencher_endereco(endereco = faker.location.streetAddress(true)) {
        cy.preencher_campo('#faddress', endereco);
    },

    preencher_mensagem(mensagem = faker.lorem.sentence()) {
        cy.preencher_campo('#messages', mensagem);
    },

    salvar_endereco() {
        cy.get('.checkout-area-bg > .theme-btn-one')
            .should('be.visible')
            .click()
    },

    confirmar_salvar_endereco(mensagem) {
        cy.get('.check-out-form > h3')
            .should("be.visible")
            .and('have.text', mensagem)
    },

    selecionar_pagamento(seletor) {
        cy.get(seletor)
            .should('be.visible')
            .check()
    },

    realizar_checkout() {
        cy.contains('button', 'Place Order')
            .should('be.visible')
            .click()
    },

    validar_msg_erro(seletor, mensagem) {
        cy.get(seletor).next()
            .should('be.visible')
            .and('contain.text', mensagem)
    },

    confirmar_sucesso_checkout(confirmacao1, confirmacao2) {
        cy.get('.offer_modal_left > h2')
            .should('be.visible')
            .and('have.text', confirmacao1)

        cy.get('.offer_modal_left > h3')
            .should('be.visible')
            .and('have.text', confirmacao2)
    },

    validar_msg_erro_checkout(mensagemEsperada) {
        cy.get('.payment_method')
            .find('#errorMessageFirstName')
            .should('be.visible')
            .and('have.text', mensagemEsperada);
    },

    preencher_formulario_completo({
        first_name = faker.person.firstName(),
        last_name = faker.person.lastName(),
        company_name = faker.company.name(),
        email = faker.internet.email(),
        country = faker.number.int({ min: 1, max: 2 }),
        city = faker.number.int({ min: 1, max: 2 }),
        zip = faker.location.zipCode('#####-###'),
        full_adress = faker.location.streetAddress(true),
        additional_notes = faker.lorem.sentence()
    } = {}) {

        cy.preencher_campo('#fname', first_name);
        cy.preencher_campo('#lname', last_name);
        cy.preencher_campo('#cname', company_name);
        cy.preencher_campo('#email', email);

        if (country !== '') {
            cy.get('#country').select(country);
        }
        if (city !== '') {
            cy.get('#city').select(city);
        }

        cy.preencher_campo('#zip', zip);
        cy.preencher_campo('#faddress', full_adress);
        cy.preencher_campo('#messages', additional_notes);
    }


}