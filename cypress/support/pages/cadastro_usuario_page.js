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

export default {
  validar_tela_cadastro(textoEsperado) { 
    cy.get(seletores.tituloCadastro)
      .should('be.visible')
      .and('include.text', textoEsperado); 
  },

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

  validar_msg_erro(seletor, mensagem) { 
    // Mantém o seletor dinâmico que vem do teste para validar o erro de cada campo
    cy.get(seletor).next()
      .should('be.visible')
      .and('contain.text', mensagem); 
  },

  confirmar_sucesso(mensagem) { 
    cy.get(seletores.tituloSucesso)
      .should('be.visible')
      .and('contain.text', mensagem); 
    cy.get(seletores.botaoConfirmarSucesso).click(); 
  },

  cadastrar_usuario({ 
    nome = faker.person.fullName(), 
    email = faker.internet.email(), 
    senha = faker.internet.password({ length: 6 }) 
  } = {}) {
    this.acessar_cadastro();
    cy.preencher_campo(seletores.campoNome, nome);
    cy.preencher_campo(seletores.campoEmail, email);
    cy.preencher_campo(seletores.campoSenha, senha);
    this.cadastrar();
  }
};