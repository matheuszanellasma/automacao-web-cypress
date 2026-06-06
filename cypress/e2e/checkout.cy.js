import checkout_page from '../support/pages/checkout_page';

const { dispositivos } = require('../support/constants/dispositivos');

dispositivos.forEach((dispositivo) => {

    describe(`Testes de checkout [${dispositivo.nome}]`, () => {

        beforeEach(() => {
            cy.iniciar_sessao(dispositivo.preset, '/checkout-one')
        })

        describe(`Casos de sucesso`, () => {
            it("Salvar endereço com sucesso", () => {
                checkout_page.preencher_primeiro_nome();
                checkout_page.preencher_sobrenome();
                checkout_page.preencher_nome_empresa();
                checkout_page.preencher_email();
                checkout_page.selecionar_pais();
                checkout_page.selecionar_cidade();
                checkout_page.preencher_cep();
                checkout_page.preencher_endereco();
                checkout_page.preencher_mensagem();
                checkout_page.salvar_endereco()
                checkout_page.confirmar_salvar_endereco(
                    'Billings Information registred with success!'
                )
            })

            const cenarios_checkout_sucesso = [
                { payment: 'Direct Bank Transfer', seletor: '#headingOne #html' },
                { payment: 'Mobile Banking', seletor: '#headingTwo #javascript' },
                { payment: 'Paypal', seletor: '#headingThree #css' }
            ]

            cenarios_checkout_sucesso.forEach((cenario) => {
                it(`Sucesso com pagamento ${cenario.payment}`, () => {
                    checkout_page.preencher_formulario_completo()
                    checkout_page.salvar_endereco()
                    checkout_page.selecionar_pagamento(cenario.seletor)
                    checkout_page.realizar_checkout()
                    checkout_page.confirmar_sucesso_checkout(
                        'Order success!',
                        'Congrats! Your order was created with sucess!'
                    )
                })
            })

        })

        describe(`Validação de campos`, () => {

            const cenarios_vazios = [
                { campo: 'first name', seletor: '#fname', msg: 'O campo First Name deve ser prenchido', tipo: 'input' },
                { campo: 'last name', seletor: '#lname', msg: 'O campo Last Name deve ser prenchido', tipo: 'input' },
                { campo: 'company name', seletor: '#cname', msg: 'O campo Company deve ser prenchido', tipo: 'input' },
                { campo: 'email address', seletor: '#email', msg: 'O campo E-mail deve ser prenchido ou é inválido', tipo: 'input' },
                { campo: 'country', seletor: '#country', msg: 'O campo Country deve ser prenchido', tipo: 'select' },
                { campo: 'city', seletor: '#city', msg: 'O campo City deve ser prenchido', tipo: 'select' },
                { campo: 'zip code', seletor: '#zip', msg: 'O campo Zip Code deve ser prenchido', tipo: 'input' },
                { campo: 'full address', seletor: '#faddress', msg: 'O campo Address deve ser prenchido', tipo: 'input' },
                { campo: 'additional notes', seletor: '#messages', msg: 'O campo Additional Notes deve ser prenchido', tipo: 'input' }
            ]

            cenarios_vazios.forEach((cenario) => {
                it(`Validação do campo ${cenario.campo} vazio`, () => {
                    if (cenario.tipo === 'select') {
                        checkout_page.preencher_formulario_completo({ [cenario.campo]: '' })
                    } else {
                        checkout_page.preencher_formulario_completo()
                        cy.get(cenario.seletor).clear()
                    }
                    checkout_page.salvar_endereco()
                    checkout_page.validar_msg_erro(cenario.seletor, cenario.msg)
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
                    checkout_page.validar_msg_erro('#email', 'O campo E-mail deve ser prenchido ou é inválido')
                })
            })
        })

        describe(`Teste de ordem sem endereço salvo`, () => {
            it("Falha ao gerar a ordem sem endereço salvo", () => {
                checkout_page.realizar_checkout()
                checkout_page.validar_msg_erro_checkout('Preencha os dados de pagamento!')
            })
        })
    })


})








