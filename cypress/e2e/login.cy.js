
import { faker } from '@faker-js/faker';

import login_page from '../support/pages/login_usuario_page'
import cadastro_page from '../support/pages/cadastro_usuario_page';

const { dispositivos } = require('../support/constants/dispositivos');

dispositivos.forEach((dispositivo) => {

    describe(`Testes da página de login [${dispositivo.nome}]`, () => {

        beforeEach(() => {
            cy.iniciar_sessao(dispositivo.preset, '/login')
        })

        it("Login com credenciais válidas", () => {
            login_page.preencher_email()
            login_page.preencher_senha()
            login_page.logar()
            login_page.confirmar_sucesso('Login realizado')
            cy.url()
                .should('equal', 'https://www.automationpratice.com.br/my-account')
        })


        it.skip("Login com 'Lembrar de mim' selecionado", () => {
            const email = faker.internet.email()
            login_page.preencher_email(email)
            login_page.preencher_senha()
            login_page.marcar_lembrar_de_mim()
            login_page.logar()
            login_page.confirmar_sucesso('Login realizado')
            login_page.acessar_login()
            login_page.validar_email_preenchido(email)
        })


        describe(`Validação de campos de login`, () => {

            const cenarios_login = [
                { email: 'testegmail.com', senha: faker.internet.password({ length: 6 }), teste: 'email sem @', msg_erro: 'E-mail inválido.' },
                { email: 'teste@', senha: faker.internet.password({ length: 6 }), teste: 'email sem domínio', msg_erro: 'E-mail inválido.' },
                { email: '{backspace}', senha: faker.internet.password({ length: 6 }), teste: 'email em branco', msg_erro: 'E-mail inválido.' },
                { email: faker.internet.email(), senha: '{backspace}', teste: 'senha em branco', msg_erro: 'Senha inválida.' },
                { email: faker.internet.email(), senha: faker.internet.password({ length: 3 }), teste: 'senha curta', msg_erro: 'Senha inválida.' }
            ]

            cenarios_login.forEach((cenario) => {
                it(` Login mal sucedido com ${cenario.teste}`, () => {
                    login_page.preencher_email(cenario.email)
                    login_page.preencher_senha(cenario.senha)
                    login_page.logar()
                    login_page.validar_msg_erro(cenario.msg_erro)
                })
            })
        })


        describe(`Testes de seguranca da senha na tela`, () => {
            it('Teste de mascaramento da senha', () => {
                cy.get('#password')
                    .should('have.attr', 'type', 'password')
            })
        })

        describe(`Testes de redirecionamento de links `, () => {
            it('Teste de redirecionamento do link "ainda não tem conta?"', () => {
                login_page.ir_para_cadastro()
                cy.url()
                    .should('equal', 'https://www.automationpratice.com.br/register')
                cadastro_page.validar_tela_cadastro('Cadastro de usuário')
            })
        })
    })
})



