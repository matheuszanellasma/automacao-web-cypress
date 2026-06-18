import { faker } from "@faker-js/faker";

const ROTA_LOGIN = '/login';

const seletores = {
  campoEmail: '#user',
  campoSenha: '#password',
  botaoLogar: '#btnLogin',
  checkboxLembrar: '#materialUnchecked',
  tituloSucesso: '#swal2-title',
  botaoConfirmarSucesso: '.swal2-confirm.swal2-styled',
  alertaErro: '.invalid_input',
  linkCriarConta: '#createAccount'
};

export default {
  acessar_login() {
    cy.visit(ROTA_LOGIN);
  },

  preencher_email(email = faker.internet.email()) {
    cy.preencher_campo(seletores.campoEmail, email);
  },

  preencher_senha(senha = faker.internet.password({ length: 6 })) {
    cy.preencher_campo(seletores.campoSenha, senha);
  },

  logar() {
    cy.get(seletores.botaoLogar).click();
  },

  marcar_lembrar_de_mim() {
    cy.get(seletores.checkboxLembrar).check();
  },

  ir_para_cadastro() {
    cy.get(seletores.linkCriarConta).click();
  },

  obter_email_preenchido() {
    return cy.get(seletores.campoEmail)
  },

  obter_alerta_sucesso() {
    return cy.get(seletores.tituloSucesso);
  },

  obter_msg_erro() {
    return cy.get('.invalid_input')
  },

  logar_usuario({ email = faker.internet.email(), senha = faker.internet.password() } = {}) {
    cy.visit(ROTA_LOGIN);
    cy.preencher_campo(seletores.campoEmail, email);
    cy.preencher_campo(seletores.campoSenha, senha);
    cy.get(seletores.botaoLogar).click();
  }
};