import cadastro_usuario_page from '../support/pages/cadastro_usuario_page';
import login_page from '../support/pages/login_usuario_page';
import checkout_page from '../support/pages/checkout_page';
import { dispositivos } from '../support/constants/dispositivos';

dispositivos.forEach((dispositivo) => {

    describe(`Testes de Smoke [${dispositivo.nome}]`, () => {

        describe(`Testes de Cadastro`, () => {
            beforeEach(() => {
                cy.iniciar_sessao(dispositivo.preset, '/register')
            })

            it("Cadastro com credenciais válidas", () => {
                cadastro_usuario_page.cadastrar_usuario()

                cadastro_usuario_page.alerta_sucesso
                    .should('be.visible')
                    .and('contain.text', 'Cadastro realizado');

                cy.url()
                    .should('equal', 'https://www.automationpratice.com.br/my-account')
            })
        })

        describe(`Testes de Login`, () => {
            beforeEach(() => {
                cy.iniciar_sessao(dispositivo.preset, '/login')
            })

            it("Login com credenciais válidas", () => {
                login_page.logar_usuario()

                login_page.alertaSucesso
                    .should('be.visible')
                    .and('contain.text', 'Login realizado');

                cy.url()
                    .should('equal', 'https://www.automationpratice.com.br/my-account')
            })
        })

        describe(`Testes de Checkout`, () => {
            beforeEach(() => {
                cy.iniciar_sessao(dispositivo.preset, '/checkout-one')
            })

            it("Salvar endereço com sucesso", () => {
                checkout_page.preencher_formulario_completo()
                checkout_page.salvar_endereco()

                checkout_page.msg_endereco
                    .should("be.visible")
                    .and('have.text', 'Billings Information registred with success!');
            })

            const cenarios_checkout_sucesso = [
                { payment: 'Direct Bank Transfer' },
                { payment: 'Mobile Banking' },
                { payment: 'Paypal' }
            ]

            cenarios_checkout_sucesso.forEach((cenario) => {
                it(`Sucesso com pagamento ${cenario.payment}`, () => {
                    checkout_page.preencher_formulario_completo()
                    checkout_page.salvar_endereco()
                    checkout_page.selecionar_pagamento(cenario.payment)
                    checkout_page.realizar_checkout()

                    checkout_page.msg_sucesso
                        .should('be.visible')
                        .and('have.text', 'Order success!');
                })
            })
        })
    })
})
