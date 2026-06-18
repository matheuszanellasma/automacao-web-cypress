import { faker } from "@faker-js/faker";

const ROTA_CADASTRO = '/register';

const seletores = {
  tituloCadastro: '.account_form > h3',
  campoNome: '#user',
  campoEmail: '#email',
  campoSenha: '#password',
  botaoRegistrar: '#btnRegister',
  tituloSucesso: '#swal2-title',
  botaoConfirmarSucesso: '.swal2-confirm.swal2-styled'
};

const seletor_campo = {
  nome: seletores.campoNome,
  email: seletores.campoEmail,
  senha: seletores.campoSenha
};

export default {

  acessar_cadastro() { 
    cy.visit(ROTA_CADASTRO);
  },

  preencher_nome(nome = faker.person.fullName()) {
    cy.preencher_campo(seletores.campoNome, nome);
  },

  preencher_email(email = faker.internet.email()) {
    cy.preencher_campo(seletores.campoEmail, email);
  },

  preencher_senha(senha = faker.internet.password({ length: 6 })) {
    cy.preencher_campo(seletores.campoSenha, senha);
  },

  cadastrar() { 
    cy.get(seletores.botaoRegistrar).click();
  },

  obter_alerta_sucesso() {
    return cy.get(seletores.tituloSucesso);
  },

  obter_erro_do_campo(nomeCampo) {
    return cy.get(seletor_campo[nomeCampo]).next();
  },

  obter_titulo_cadastro() {
    return cy.get(seletores.tituloCadastro);
  },

  cadastrar_usuario({
    nome = faker.person.fullName(),
    email = faker.internet.email(),
    senha = faker.internet.password({ length: 6 })
  } = {}) {
    cy.visit(ROTA_CADASTRO);
    cy.preencher_campo(seletores.campoNome, nome);
    cy.preencher_campo(seletores.campoEmail, email);
    cy.preencher_campo(seletores.campoSenha, senha);
    cy.get(seletores.botaoRegistrar).click();
  }
};