import { faker } from '@faker-js/faker';
import cadastro_usuario_page from '../support/pages/cadastro_usuario_page';
import { dispositivos } from '../support/constants/dispositivos';

dispositivos.forEach((dispositivo) => {

    describe(`Testes de cadastro [${dispositivo.nome}]`, () => {

        beforeEach(() => {
            cy.iniciar_sessao(dispositivo.preset, '/register')
        })

        it("Cadastro com credenciais válidas", () => {
            cadastro_usuario_page.cadastrar_usuario()

            cadastro_usuario_page.obter_alerta_sucesso()
                .should('be.visible')
                .and('contain.text', 'Cadastro realizado');

            cy.url()
                .should('equal', 'https://www.automationpratice.com.br/my-account')
        })

        describe(`Validação de campos`, () => {

            const cenarios_cadastro = [
                { nome: '{backspace}', email: faker.internet.email(), senha: faker.internet.password({ length: 6 }), teste: 'nome em branco', msg_erro: 'O campo nome deve ser prenchido', campo_testado: 'nome' },
                { nome: faker.person.fullName(), email: '{backspace}', senha: faker.internet.password({ length: 6 }), teste: 'email em branco', msg_erro: 'O campo e-mail deve ser prenchido corretamente', campo_testado: 'email' },
                { nome: faker.person.fullName(), email: faker.internet.email(), senha: '{backspace}', teste: 'senha em branco', msg_erro: 'O campo senha deve ter pelo menos 6 dígitos', campo_testado: 'senha' },
                { nome: faker.person.fullName(), email: faker.internet.email(), senha: faker.internet.password({ length: 3 }), teste: 'senha curta', msg_erro: 'O campo senha deve ter pelo menos 6 dígitos', campo_testado: 'senha' },
                { nome: faker.person.fullName(), email: 'testedominio.com', senha: faker.internet.password({ length: 6 }), teste: 'email sem domínio', msg_erro: 'O campo e-mail deve ser prenchido corretamente', campo_testado: 'email' },
                { nome: faker.person.fullName(), email: 'teste@', senha: faker.internet.password({ length: 6 }), teste: 'email sem @', msg_erro: 'O campo e-mail deve ser prenchido corretamente', campo_testado: 'email' }
            ]

            cenarios_cadastro.forEach((cenario) => {
                it(`Cadastro mal sucedido com ${cenario.teste}`, () => {

                    cadastro_usuario_page.cadastrar_usuario({
                        nome: cenario.nome,
                        email: cenario.email,
                        senha: cenario.senha
                    });
                        
                    cadastro_usuario_page.obter_erro_do_campo(cenario.campo_testado)
                        .should('be.visible')
                        .and('contain.text', cenario.msg_erro);

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

