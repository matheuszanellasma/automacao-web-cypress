import checkout_page from '../support/pages/checkout_page';

const { dispositivos } = require('../support/constants/dispositivos');

dispositivos.forEach((dispositivo) => {

    describe(`Testes de checkout [${dispositivo.nome}]`, () => {

        beforeEach(() => {
            cy.iniciar_sessao(dispositivo.preset, '/checkout-one')
        })

        describe(`Casos de sucesso`, () => {
            it("Salvar endereço com sucesso", {tags: ['@smoke']} , () => {
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
                it(`Sucesso com pagamento ${cenario.payment}`, {tags: ['@smoke']} , () => {
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

        describe(`Validação de campos`, () => {

            const cenarios_vazios = [
                { campo: 'first name', msg: 'O campo First Name deve ser prenchido', tipo: 'input' },
                { campo: 'last name', msg: 'O campo Last Name deve ser prenchido', tipo: 'input' },
                { campo: 'company name', msg: 'O campo Company deve ser prenchido', tipo: 'input' },
                { campo: 'email address', msg: 'O campo E-mail deve ser prenchido ou é inválido', tipo: 'input' },
                { campo: 'country', msg: 'O campo Country deve ser prenchido', tipo: 'select' },
                { campo: 'city', msg: 'O campo City deve ser prenchido', tipo: 'select' },
                { campo: 'zip code', msg: 'O campo Zip Code deve ser prenchido', tipo: 'input' },
                { campo: 'full address', msg: 'O campo Address deve ser prenchido', tipo: 'input' },
                { campo: 'additional notes', msg: 'O campo Additional Notes deve ser prenchido', tipo: 'input' }
            ]

            cenarios_vazios.forEach((cenario) => {
                it(`Validação do campo ${cenario.campo} vazio`, () => {
                    if (cenario.tipo === 'select') {
                        checkout_page.preencher_formulario_completo({ [cenario.campo]: '' })
                    } else {
                        checkout_page.preencher_formulario_completo()
                        checkout_page.limpar_campo(cenario.campo)

                    }
                    checkout_page.salvar_endereco()

                    checkout_page.obter_msg_erro_endereco(cenario.campo)
                        .should('be.visible')
                        .and('contain.text', cenario.msg);
                })
            })

            const cenarios_email = [
                { campo: 'email sem @', email: 'testedominio.com' },
                { campo: 'email sem domínio', email: 'teste@' }
            ]

            cenarios_email.forEach((cenario) => {
                it(`Validação do campo ${cenario.campo}`, () => {
                    checkout_page.preencher_formulario_completo({ email: cenario.email })
                    checkout_page.salvar_endereco()
                    checkout_page.obter_msg_erro_endereco('email address')
                        .should('be.visible')
                        .and('contain.text', 'O campo E-mail deve ser prenchido ou é inválido');

                })
            })
        })

        describe(`Teste de ordem sem endereço salvo`, () => {
            it("Falha ao gerar a ordem sem endereço salvo", () => {
                checkout_page.realizar_checkout()

                checkout_page.msg_erro_checkout
                    .should('be.visible')
                    .and('have.text', 'Preencha os dados de pagamento!');
            })
        })
    })


})








