import { faker } from '@faker-js/faker';

const seletores = {
  campoPrimeiroNome: '#fname',
  campoSobrenome: '#lname',
  campoNomeEmpresa: '#cname',
  campoEmail: '#email',
  selectPais: '#country',
  selectCidade: '#city',
  campoCep: '#zip',
  campoEndereco: '#faddress',
  campoMensagem: '#messages',
  botaoSalvarEndereco: '.checkout-area-bg > .theme-btn-one',
  tituloConfirmacaoEndereco: '.check-out-form > h3',
  tituloSucessoCheckout: '.offer_modal_left > h2',
  subtituloSucessoCheckout: '.offer_modal_left > h3',
  containerPagamento: '.payment_method',
  erroFirstNameCheckout: '#errorMessageFirstName',
  botaoPlaceOrderTexto: 'Place Order'
};

const tipos_pagamento = {
  'Direct Bank Transfer': '#headingOne #html',
  'Mobile Banking': '#headingTwo #javascript',
  'Paypal': '#headingThree #css'
};

const seletores_campos = {
  'first name': seletores.campoPrimeiroNome,
  'last name': seletores.campoSobrenome,
  'company name': seletores.campoNomeEmpresa,
  'email address': seletores.campoEmail,
  'country': seletores.selectPais,
  'city': seletores.selectCidade,
  'zip code': seletores.campoCep,
  'full address': seletores.campoEndereco,
  'additional notes': seletores.campoMensagem
};

export default {
  preencher_primeiro_nome(nome = faker.person.firstName()) {
    cy.preencher_campo(seletores.campoPrimeiroNome, nome);
  },

  preencher_sobrenome(sobrenome = faker.person.lastName()) {
    cy.preencher_campo(seletores.campoSobrenome, sobrenome);
  },

  preencher_nome_empresa(empresa = faker.company.name()) {
    cy.preencher_campo(seletores.campoNomeEmpresa, empresa);
  },

  preencher_email(email = faker.internet.email()) {
    cy.preencher_campo(seletores.campoEmail, email);
  },

  selecionar_pais(opcao = faker.number.int({ min: 1, max: 2 })) {
    cy.get(seletores.selectPais)
      .should('be.visible')
      .select(opcao);
  },

  selecionar_cidade(opcao = faker.number.int({ min: 1, max: 2 })) {
    cy.get(seletores.selectCidade)
      .should('be.visible')
      .select(opcao);
  },

  preencher_cep(cep = faker.location.zipCode('#####-###')) {
    cy.preencher_campo(seletores.campoCep, cep);
  },

  preencher_endereco(endereco = faker.location.streetAddress(true)) {
    cy.preencher_campo(seletores.campoEndereco, endereco);
  },

  preencher_mensagem(mensagem = faker.lorem.sentence()) {
    cy.preencher_campo(seletores.campoMensagem, mensagem);
  },

  salvar_endereco() {
    cy.get(seletores.botaoSalvarEndereco)
      .should('be.visible')
      .click();
  },

  limpar_campo(nome_campo) {
    return cy.get(seletores_campos[nome_campo]).clear()
  },

  obter_msg_endereco() {
    return cy.get(seletores.tituloConfirmacaoEndereco)
  },


  selecionar_pagamento(formaPagamento) {
    cy.get(tipos_pagamento[formaPagamento])
      .should('be.visible')
      .click();
  },

  realizar_checkout() {
    cy.contains('button', seletores.botaoPlaceOrderTexto)
      .should('be.visible')
      .click();
  },


  obter_msg_erro_endereco(nome_campo) {
    return cy.get(seletores_campos[nome_campo]).next()
  },

  obter_msg_sucesso() {
    return cy.get(seletores.tituloSucessoCheckout)
  },

  obter_msg_erro_checkout() {
    return cy.get(seletores.containerPagamento).find(seletores.erroFirstNameCheckout)
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
    cy.preencher_campo(seletores.campoPrimeiroNome, first_name);
    cy.preencher_campo(seletores.campoSobrenome, last_name);
    cy.preencher_campo(seletores.campoNomeEmpresa, company_name);
    cy.preencher_campo(seletores.campoEmail, email);

    if (country !== '') {
      cy.get(seletores.selectPais).select(country);
    }
    if (city !== '') {
      cy.get(seletores.selectCidade).select(city);
    }

    cy.preencher_campo(seletores.campoCep, zip);
    cy.preencher_campo(seletores.campoEndereco, full_adress);
    cy.preencher_campo(seletores.campoMensagem, additional_notes);
  }
};