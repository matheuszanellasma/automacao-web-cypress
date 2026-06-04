import { faker } from '@faker-js/faker';
import cadastro_usuario_page from '../support/pages/cadastro_usuario_page';
import { dispositivos } from '../support/constants/dispositivos';

dispositivos.forEach((dispositivo) => {

    describe(`Testes de cadastro [${dispositivo.nome}]`, () => {


        beforeEach(() => {
            cy.iniciar_sessao(dispositivo.preset, '/register')
        })


        it("Cadastro com credenciais válidas", () => {
            cadastro_usuario_page.preencher_nome()
            cadastro_usuario_page.preencher_email()
            cadastro_usuario_page.preencher_senha()
            cadastro_usuario_page.cadastrar()
            cadastro_usuario_page.confirmar_sucesso('Cadastro realizado')
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

            cenarios_cadastro.forEach((cenario) => {
                it(`Cadastro mal sucedido com ${cenario.teste}`, () => {
                    cadastro_usuario_page.preencher_nome(cenario.nome)
                    cadastro_usuario_page.preencher_email(cenario.email)
                    cadastro_usuario_page.preencher_senha(cenario.senha)
                    cadastro_usuario_page.cadastrar()
                    cadastro_usuario_page.validar_msg_erro(cenario.seletor, cenario.msg_erro)
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

