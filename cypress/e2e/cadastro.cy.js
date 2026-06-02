/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

const telas = [
    { dispositivo: 'macbook-13', preset: 'macbook-13' },
    { dispositivo: 'iphone-6', preset: 'iphone-6' },
    { dispositivo: 'samsung-s10', preset: 'samsung-s10' }
]


telas.forEach((tela) => {


    describe(`Testes de cadastro [${tela.dispositivo}]`, () => {

        beforeEach(() => {
            cy.viewport(tela.preset)
            cy.visit('/register')
        })

        
        it("Cadastro com credenciais válidas", () => {

            cy.get('#user').type(faker.person.fullName())
            cy.get('#email').type(faker.internet.email())
            cy.get('#password').type(faker.internet.password({ length: 6 }))
            cy.get('#btnRegister').click()
            cy.get('#swal2-title')
                .should('be.visible')
                .and('contain.text', 'Cadastro realizado')
            cy.get('.swal2-confirm.swal2-styled').click()
            cy.url()
                .should('equal', 'https://www.automationpratice.com.br/my-account')
        })

        describe(`Validação de campos`, () => {

            const cenarios_cadastro = [
                { nome: '{backspace}', email: faker.internet.email(), senha: faker.internet.password({ length: 6 }), teste: 'nome em branco', seletor: '#user', msg_erro: 'O campo nome deve ser prenchido' },
                { nome: faker.person.fullName(), email: '{backspace}', senha: faker.internet.password({ length: 6 }), teste: 'email em branco', seletor: '#email', msg_erro: 'O campo e-mail deve ser prenchido corretamente' },
                { nome: faker.person.fullName(), email: faker.internet.email(), senha: '{backspace}', teste: 'senha em branco', seletor: '#password', msg_erro: 'O campo senha deve ter pelo menos 6 dígitos' },
                { nome: faker.person.fullName(), email: faker.internet.email(), senha: faker.internet.password({ length: 3 }), teste: 'senha curta', seletor: '#password', msg_erro: 'O campo senha deve ter pelo menos 6 dígitos' },
                { nome: faker.person.fullName(), email: 'testedominio.com', senha: faker.internet.password({ length: 6 }), teste: 'email sem domínio', seletor: '#email', msg_erro: 'O campo e-mail deve ser prenchido corretamente' },
                { nome: faker.person.fullName(), email: 'teste@', senha: faker.internet.password({ length: 6 }), teste: 'email sem @', seletor: '#email', msg_erro: 'O campo e-mail deve ser prenchido corretamente' }
            ]

            cenarios_cadastro.forEach((cenario, index) => {
                it(' Cadastro mal sucedido com ' + cenario.teste, () => {

                    cy.get('#user').type(cenario.nome)
                    cy.get('#email').type(cenario.email)
                    cy.get('#password').type(cenario.senha)
                    cy.get('#btnRegister').click()

                    cy.get(cenario.seletor).next()
                        .should('be.visible')
                        .and('contain.text', cenario.msg_erro)
                })
            })
        })

        describe(`Testes de seguranca da senha `, () => {
            it('Teste de mascaramento da senha', () => {
                cy.get('#password')
                    .should('have.attr', 'type', 'password')
            })
        })
    })
})

