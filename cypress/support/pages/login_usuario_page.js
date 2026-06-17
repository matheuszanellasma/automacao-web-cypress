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

// 🛠️ SEU OBJETO LITERAL PRINCIPAL
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

  confirmar_sucesso(mensagem) { 
    cy.get(seletores.tituloSucesso)
      .should('be.visible')
      .and('contain.text', mensagem); 
    cy.get(seletores.botaoConfirmarSucesso).click(); 
  },

  validar_msg_erro(mensagem) { 
    cy.get(seletores.alertaErro)
      .should('be.visible')
      .and('contain.text', mensagem); 
  },

  ir_para_cadastro() { 
    cy.get(seletores.linkCriarConta).click(); 
  },

  validar_email_preenchido(emailEsperado) { 
    cy.get(seletores.campoEmail)
      .should('be.visible')
      .and('have.value', emailEsperado); 
  },

  logar_usuario(email = faker.internet.email(), senha = faker.internet.password()) { 
    cy.visit(ROTA_LOGIN);
    cy.preencher_campo(seletores.campoEmail, email);
    cy.preencher_campo(seletores.campoSenha, senha);
    cy.get(seletores.botaoLogar).click(); 
  }
};