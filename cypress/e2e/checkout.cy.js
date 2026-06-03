import { faker } from '@faker-js/faker';

const { dispositivos } = require('../support/constants/dispositivos');

dispositivos.forEach((dispositivo) => {

    describe(`Testes de checkout [${dispositivo.nome}]`, () => {

        beforeEach(() => {
            cy.iniciar_sessao(dispositivo.preset, '/checkout-one')
        })


        describe(`Casos de sucesso`, () => {

            it("Salvar endereço com sucesso", () => {
                cy.get('#fname').type(faker.person.firstName())
                cy.get('#lname').type(faker.person.lastName())
                cy.get('#cname').type(faker.company.name())
                cy.get('#email').type(faker.internet.email())
                cy.get('#country').select(faker.number.int({ min: 1, max: 2 }))
                cy.get('#city').select(faker.number.int({ min: 1, max: 2 }))
                cy.get('#zip').type(faker.location.zipCode('#####-###'))
                cy.get('#faddress').type(faker.location.streetAddress(true))
                cy.get('#messages').type(faker.lorem.sentence())

                cy.get('.checkout-area-bg > .theme-btn-one').click()
                cy.get('.check-out-form > h3')
                    .should("be.visible")
                    .and('have.text', 'Billings Information registred with success!')
            })


            const cenarios_checkout_sucesso = [
                { payment: 'Direct Bank Transfer', seletor: '#headingOne > div > #html' },
                { payment: 'Mobile Banking', seletor: '#headingTwo > div > #javascript' },
                { payment: 'Paypal', seletor: '#headingThree > div > #css' }
            ]

            cenarios_checkout_sucesso.forEach((cenario) => {

                it(`Sucesso com pagamento ${cenario.payment}`, () => {

                    cy.get('#fname').type(faker.person.firstName())
                    cy.get('#lname').type(faker.person.lastName())
                    cy.get('#cname').type(faker.company.name())
                    cy.get('#email').type(faker.internet.email())
                    cy.get('#country').select(faker.number.int({ min: 1, max: 2 }))
                    cy.get('#city').select(faker.number.int({ min: 1, max: 2 }))
                    cy.get('#zip').type(faker.location.zipCode('#####-###'))
                    cy.get('#faddress').type(faker.location.streetAddress(true))
                    cy.get('#messages').type(faker.lorem.sentence())

                    cy.get('.checkout-area-bg > .theme-btn-one').click()
                    cy.get(cenario.seletor).check()
                    cy.contains('button', 'Place Order').click()

                    cy.get('.offer_modal_left > h2')
                        .should('be.visible')
                        .and('have.text', 'Order success!')

                    cy.get('.offer_modal_left > h3')
                        .should('be.visible')
                        .and('have.text', 'Congrats! Your order was created with sucess!')
                })
            })

        })

        describe(`Validação de campos`, () => {

            const cenarios_vazios = [
                { campo: 'first name', seletor: '#fname', msg: 'O campo First Name deve ser prenchido' },
                { campo: 'last name', seletor: '#lname', msg: 'O campo Last Name deve ser prenchido' },
                { campo: 'company name', seletor: '#cname', msg: 'O campo Company deve ser prenchido' },
                { campo: 'email address', seletor: '#email', msg: 'O campo E-mail deve ser prenchido ou é inválido' },
                { campo: 'country', seletor: '#country', msg: 'O campo Country deve ser prenchido' },
                { campo: 'state/city', seletor: '#city', msg: 'O campo City deve ser prenchido' },
                { campo: 'zip code', seletor: '#zip', msg: 'O campo Zip Code deve ser prenchido' },
                { campo: 'full address', seletor: '#faddress', msg: 'O campo Address deve ser prenchido' },
                { campo: 'additional notes', seletor: '#messages', msg: 'O campo Additional Notes deve ser prenchido' }
            ]

            cenarios_vazios.forEach((cenario) => {
                it(`Validação do campo ${cenario.campo} vazio`, () => {
                    cy.get('.checkout-area-bg > .theme-btn-one').click()
                    cy.get(cenario.seletor).next()
                        .should('be.visible')
                        .and('contain.text', cenario.msg)
                })
            })

            const cenarios_email = [
                { campo: 'email sem @', seletor: '#email', email: 'testedominio.com', msg: 'O campo E-mail deve ser prenchido ou é inválido' },
                { campo: 'email sem domínio', seletor: '#email', email: 'teste@', msg: 'O campo E-mail deve ser prenchido ou é inválido' }
            ]

            cenarios_email.forEach((cenario) => {
                it(`Validação do campo ${cenario.campo}`, () => {
                    cy.get('#email').type(cenario.email)
                    cy.get('.checkout-area-bg > .theme-btn-one').click()
                    cy.get(cenario.seletor).next()
                        .should('be.visible')
                        .and('contain.text', cenario.msg)
                })
            })
        })

        describe(`Teste de ordem sem endereço salvo`, () => {
            it("Falha ao gerar a ordem sem endereço salvo", () => {
                cy.contains('button', 'Place Order').click()

                cy.get('.payment_method').find('#errorMessageFirstName')
                    .should('be.visible')
                    .and('have.text', 'Preencha os dados de pagamento!')
            })
        })
    })


})








