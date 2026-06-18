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

  get emailPreenchido() { return cy.get(seletores.campoEmail); },
  get alertaSucesso() { return cy.get(seletores.tituloSucesso); },
  get msgErro() { return cy.get(seletores.alertaErro); },

  acessar_login() { cy.visit(ROTA_LOGIN); },

  preencher_email(email = faker.internet.email()) {
    cy.preencher_campo(seletores.campoEmail, email);
  },

  preencher_senha(senha = faker.internet.password()) {
    cy.preencher_campo(seletores.campoSenha, senha);
  },

  logar() { cy.get(seletores.botaoLogar).click(); },

  marcar_lembrar_de_mim() { cy.get(seletores.checkboxLembrar).check(); },

  ir_para_cadastro() { cy.get(seletores.linkCriarConta).click(); },

  logar_usuario({ email = faker.internet.email(), senha = faker.internet.password() } = {}) {
    cy.visit(ROTA_LOGIN);
    cy.preencher_campo(seletores.campoEmail, email);
    cy.preencher_campo(seletores.campoSenha, senha);
    cy.get(seletores.botaoLogar).click();
  }
};