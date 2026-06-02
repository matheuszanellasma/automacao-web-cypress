/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

const telas = [
    { dispositivo: 'macbook-13', preset: 'macbook-13' },
    { dispositivo: 'iphone-6', preset: 'iphone-6' },
    { dispositivo: 'samsung-s10', preset: 'samsung-s10' }
]

telas.forEach((tela) => {

    describe(`Testes da página de login [${tela.dispositivo}]`, () => {

        beforeEach(() => {
            cy.viewport(tela.preset)
            cy.visit('/login');
        })


        it("Login com credenciais válidas", () => {
            cy.get('#user').type(faker.internet.email());
            cy.get('#password').type(faker.internet.password({ length: 6 }));
            cy.get('#btnLogin').click();
            cy.get('#swal2-title')
                .should('be.visible')
                .and('contain.text', 'Login realizado')
            cy.get('.swal2-confirm.swal2-styled').click();
            cy.url()
                .should('equal', 'https://www.automationpratice.com.br/my-account')
        })


        it("Login com 'Lembrar de mim' selecionado", () => {
            const email = faker.internet.email()
            cy.get('#user').type(email);
            cy.get('#password').type(faker.internet.password({ length: 6 }));
            cy.get('#materialUnchecked').check()
            cy.get('#btnLogin').click();
            cy.get('#swal2-title')
                .should('be.visible')
                .and('contain.text', 'Login realizado')
            cy.visit('https://www.automationpratice.com.br/login');
            cy.get('#user')
                .should('have.value', email);

        })


        describe(`Validação de campos de login`, () => {

            const cenarios_login = [
                { email: 'testegmail.com', senha: faker.internet.password({ length: 6 }), teste: 'email sem @', seletor: '#user', msg_erro: 'E-mail inválido.' },
                { email: 'teste@', senha: faker.internet.password({ length: 6 }), teste: 'email sem domínio', seletor: '#user', msg_erro: 'E-mail inválido.' },
                { email: '{backspace}', senha: faker.internet.password({ length: 6 }), teste: 'email em branco', seletor: '#user', msg_erro: 'E-mail inválido.' },
                { email: faker.internet.email(), senha: '{backspace}', teste: 'senha em branco', seletor: '#password', msg_erro: 'Senha inválida.' },
                { email: faker.internet.email(), senha: faker.internet.password({ length: 3 }), teste: 'senha curta', seletor: '#password', msg_erro: 'Senha inválida.' }
            ]

            cenarios_login.forEach((cenario, index) => {
                it(' Login mal sucedido com ' + cenario.teste, () => {
                    cy.get('#user').type(cenario.email);
                    cy.get('#password').type(cenario.senha);
                    cy.get('#btnLogin').click();
                    cy.get('.invalid_input')
                        .should('contain.text', cenario.msg_erro)
                        .and('be.visible')
                })
            })
        })


        describe(`Testes de seguranca da senha na tela`, () => {
            it('Teste de mascaramento da senha', () => {
                cy.viewport(tela.preset)
                cy.visit('/login')
                cy.get('#password')
                    .should('have.attr', 'type', 'password')
            })
        })

        describe(`Testes de links do login na tela `, () => {
            it('Teste de redirecionamento do link "ainda não tem conta?"', () => {
                cy.viewport(tela.preset)
                cy.visit('/login')
                cy.get('#createAccount').click()
                cy.url()
                    .should('equal', 'https://www.automationpratice.com.br/register')
                cy.get('.account_form > h3')
                    .should('be.visible')
                    .and('include.text', 'Cadastro de usuário')
            })
        })
    })
})



